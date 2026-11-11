// Penjaga sebelum situs terbit (LANJUT_017b): npm run periksa-gerbang-landing. Sengaja di luar
// `npm test` dan `npm run build`, supaya isian yang belum lengkap tidak mematahkan pekerjaan lain.
// Hanya membaca berkas.
//
// Gagal bila:
//   1. data kebijakan atau teks situs lain masih memuat penanda [ISI;
//   2. salinan kebijakan tidak sama dengan LANJUT_App/lib/kebijakan-privasi.json (kecuali _catatan).
//
//   --aplikasi=<berkas>  letak JSON aplikasi, bila bukan ../LANJUT_App/lib/kebijakan-privasi.json
//   --landing=<folder>   letak folder landing, untuk pengujian
//   --hanya-isian        lewati pembandingan, untuk tempat build yang tidak punya repo aplikasi

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AKAR = fileURLToPath(new URL('..', import.meta.url));
const JENIS_TEKS = new Set(['.ts', '.tsx', '.js', '.mjs', '.json', '.css', '.html', '.txt', '.md', '.xml']);
const BERKAS_DATA = path.join('src', 'data', 'kebijakan-privasi.json');
const BAGIAN_TAMPIL = ['status', 'versi', 'ringkasan', 'isi'];

function semuaBerkas(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? semuaBerkas(p) : [p];
  });
}

function periksaIsian(landing) {
  const berkas = [
    ...semuaBerkas(path.join(landing, 'src')),
    ...semuaBerkas(path.join(landing, 'public')),
    ...fs.readdirSync(landing).filter((n) => n.endsWith('.html')).map((n) => path.join(landing, n)),
  ].filter((p) => JENIS_TEKS.has(path.extname(p)));
  return berkas.flatMap((p) => {
    const jumlah = fs.readFileSync(p, 'utf8').split('[ISI').length - 1;
    return jumlah ? [{ jenis: 'isian', pesan: `${path.relative(landing, p).replace(/\\/g, '/')}: ${jumlah} isian masih kosong.` }] : [];
  });
}

function periksaSalinan(landing, jsonAplikasi) {
  if (!fs.existsSync(jsonAplikasi)) return [{ jenis: 'salinan', pesan: `Berkas aplikasi tidak ditemukan: ${jsonAplikasi}` }];
  const aplikasi = JSON.parse(fs.readFileSync(jsonAplikasi, 'utf8'));
  const data = JSON.parse(fs.readFileSync(path.join(landing, BERKAS_DATA), 'utf8'));
  const berbeda = BAGIAN_TAMPIL.filter((k) => JSON.stringify(aplikasi[k]) !== JSON.stringify(data[k]));
  const asing = Object.keys(data).filter((k) => !BAGIAN_TAMPIL.includes(k));
  return [
    ...berbeda.map((k) => ({ jenis: 'salinan', pesan: `Bagian "${k}" berbeda dari aplikasi. Jalankan npm run landing-kebijakan di LANJUT_App/server.` })),
    ...asing.map((k) => ({ jenis: 'salinan', pesan: `Bagian "${k}" tidak ada di aplikasi.` })),
  ];
}

/** Daftar masalah. Kosong berarti lolos. */
export function periksa({ landing = AKAR, jsonAplikasi = path.join(AKAR, '..', 'LANJUT_App', 'lib', 'kebijakan-privasi.json'), hanyaIsian = false } = {}) {
  return [...periksaIsian(landing), ...(hanyaIsian ? [] : periksaSalinan(landing, jsonAplikasi))];
}

function jalankan(argv) {
  const opsi = {};
  for (const a of argv) {
    if (a === '--hanya-isian') opsi.hanyaIsian = true;
    else if (a.startsWith('--aplikasi=')) opsi.jsonAplikasi = path.resolve(a.slice('--aplikasi='.length));
    else if (a.startsWith('--landing=')) opsi.landing = path.resolve(a.slice('--landing='.length));
    else throw new Error(`Argumen "${a}" tidak dikenal. Pilihan: --aplikasi=<berkas>, --landing=<folder>, --hanya-isian`);
  }
  const masalah = periksa(opsi);
  if (masalah.length === 0) {
    console.log('[periksa-gerbang-landing] LOLOS. Situs boleh terbit.');
    return 0;
  }
  console.log(`[periksa-gerbang-landing] BELUM BOLEH TERBIT. Ada ${masalah.length} hal yang harus dibereskan.`);
  masalah.forEach((m, i) => console.log(`  ${i + 1}. ${m.pesan}`));
  return 1;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    process.exitCode = jalankan(process.argv.slice(2));
  } catch (galat) {
    console.error(`[periksa-gerbang-landing] ${galat.message}`);
    process.exitCode = 2;
  }
}
