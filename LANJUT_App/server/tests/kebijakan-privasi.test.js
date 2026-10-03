// Uji teks kebijakan privasi (LANJUT_047). Tanpa basis data.
//   - docs/kebijakan-privasi-DRAF.md memuat teks yang SAMA PERSIS dengan
//     LANJUT_App/lib/kebijakan-privasi.json (yang dipakai app);
//   - ringkasan di salinan-teks-lanjut.md §4.13 sama persis dengan JSON;
//   - kedua dokumen bertanda DRAF untuk ahli hukum;
//   - tidak ada kontak/alamat/tautan yang terisi tanpa keputusan ([ISI: ...]);
//   - setiap kelompok data yang disimpan basis data disebut di kebijakan.

const fs = require('fs');
const path = require('path');
const { test } = require('node:test');
const assert = require('node:assert/strict');
const { susunDokumen, daftarIsi, SUMBER, DOKUMEN } = require('../tools/kebijakan-privasi');

const AKAR = path.join(__dirname, '..', '..', '..');
const baca = (p) => fs.readFileSync(p, 'utf8').replace(/\r\n/g, '\n');
const kebijakan = JSON.parse(fs.readFileSync(SUMBER, 'utf8'));
const semuaTeks = [...kebijakan.ringkasan, ...kebijakan.isi.flatMap((b) => [b.judul, ...(b.paragraf ?? []), ...(b.butir ?? [])])];

test('dokumen DRAF berisi teks kebijakan yang sama persis dengan app (npm run dokumen-kebijakan)', () => {
  const dok = baca(DOKUMEN);
  assert.equal(susunDokumen(dok), dok, 'jalankan npm run dokumen-kebijakan');
  for (const t of semuaTeks) assert.ok(dok.includes(t), t.slice(0, 60));
  assert.ok(dok.includes(`${daftarIsi(kebijakan).length} bagian menunggu keputusan Khalifa`));
});

test('ringkasan di salinan-teks-lanjut.md §4.13 sama persis dengan app', () => {
  const salinan = baca(path.join(AKAR, 'docs', 'salinan-teks-lanjut.md'));
  kebijakan.ringkasan.forEach((t, i) => assert.ok(salinan.includes(`- **Ringkasan ${i + 1}:** ${t}\n`), `Ringkasan ${i + 1}`));
});

test('kedua dokumen bertanda DRAF untuk ahli hukum; surat punya tempat nomor dan tanda tangan', () => {
  const surat = baca(path.join(AKAR, 'docs', 'surat-persetujuan-ortu-wali-DRAF.md'));
  for (const dok of [baca(DOKUMEN), surat]) assert.match(dok, /\*\*DRAF — wajib direview ahli hukum sebelum dipakai\.\*\*/);
  assert.match(surat, /\*\*Nomor:\*\* \.{5,}/);
  assert.match(surat, /\(tanda tangan\)/);
  assert.match(surat, /versi 1/);
  assert.equal(kebijakan.versi, 1, 'surat merujuk versi 1 — perbarui surat bila versi naik');
  assert.match(kebijakan.status, /^DRAF/);
});

test('tidak ada kontak, alamat, atau tautan yang diisi tanpa keputusan', () => {
  const teks = semuaTeks.join('\n');
  assert.doesNotMatch(teks, /[\w.+-]+@[\w-]+\.\w/, 'alamat email');
  assert.doesNotMatch(teks, /https?:\/\//, 'tautan');
  assert.doesNotMatch(teks, /(\+62|\b08)\d{6,}/, 'nomor telepon');
  assert.doesNotMatch(teks, /\b(Jl\.|Jalan) /, 'alamat');
  for (const kunci of ['nama badan pengelola', 'nama penyedia AI', 'Kontak']) {
    assert.ok(daftarIsi(kebijakan).some((x) => x.isi.includes(kunci) || x.letak === kunci), `[ISI] ${kunci}`);
  }
});

test('setiap kelompok data yang disimpan disebut di kebijakan', () => {
  const teks = semuaTeks.join('\n').toLowerCase();
  // kolom/tabel pribadi (migrasi 001–012) → kata yang harus ada di kebijakan
  const WAJIB = {
    'pengguna.nama_pengguna': 'nama pengguna',
    'pengguna.nama_tampilan': 'nama tampilan',
    'pengguna.email': 'email',
    'pengguna.kata_sandi_hash': 'kata sandi',
    'pengguna.kelas': 'kelas',
    'pengguna.jenis_sekolah': 'jenis sekolah',
    'pengguna.prodi_tujuan': 'prodi impian',
    'pengguna.gaya_belajar': 'gaya belajar',
    'pengguna.status': 'status akun',
    'pengguna.terakhir_masuk_pada': 'terakhir kamu masuk',
    sesi_pengguna: 'sesi masuk',
    percobaan_masuk: 'percobaan masuk yang gagal',
    kemajuan: 'daftar periksa',
    butir_pribadi: 'pilih mapel atau eksplorasi tujuan',
    kartu: 'kartu',
    sesi_latihan: 'sesi latihan',
    riwayat_latihan: 'seberapa yakin',
    persetujuan: 'mencabut persetujuan',
    modul: 'modul', // LANJUT_049
    'modul.isi (berkas asli tidak disimpan)': 'berkas aslinya tidak disimpan',
    'modul (hapus permanen)': 'hapus permanen',
  };
  for (const [kolom, kata] of Object.entries(WAJIB)) assert.ok(teks.includes(kata), `${kolom} → "${kata}"`);
});
