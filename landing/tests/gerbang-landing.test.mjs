// Penjaga sebelum situs terbit (LANJUT_017b). Semua kasus memakai folder tiruan, jadi tes ini tidak
// bergantung pada apakah isian sungguhan sudah lengkap.

import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { periksa } from '../scripts/periksa-gerbang-landing.mjs';

const AKAR = fileURLToPath(new URL('..', import.meta.url));
const ALAT = path.join(AKAR, 'scripts', 'periksa-gerbang-landing.mjs');
const folder = [];

afterEach(() => {
  while (folder.length) fs.rmSync(folder.pop(), { recursive: true, force: true });
});

function tiruan() {
  const akar = fs.mkdtempSync(path.join(os.tmpdir(), 'lanjut-gerbang-landing-'));
  folder.push(akar);
  const landing = path.join(akar, 'landing');
  const jsonAplikasi = path.join(akar, 'aplikasi.json');
  const tulis = (rel, isi) => {
    const p = path.join(landing, rel);
    fs.mkdirSync(path.dirname(p), { recursive: true });
    fs.writeFileSync(p, typeof isi === 'string' ? isi : JSON.stringify(isi));
  };
  const kebijakan = { status: 'Berlaku.', versi: 1, ringkasan: ['Ringkas.'], isi: [{ judul: 'Kontak', butir: ['Hubungi kami.'] }] };
  tulis('src/data/kebijakan-privasi.json', kebijakan);
  tulis('src/konten/fitur.ts', "export const a = 'Teks';\n");
  tulis('index.html', '<p>Halo</p>');
  fs.writeFileSync(jsonAplikasi, JSON.stringify({ _catatan: 'Catatan pengembang [ISI].', ...kebijakan }));
  return { landing, jsonAplikasi, tulis, kebijakan };
}

const jenis = (t, lain = {}) => periksa({ landing: t.landing, jsonAplikasi: t.jsonAplikasi, ...lain }).map((m) => m.jenis);
const cli = (...argumen) => spawnSync(process.execPath, [ALAT, ...argumen], { encoding: 'utf8', timeout: 30000 });

test('gerbang landing: keadaan bersih lolos, walau _catatan aplikasi memuat penanda', () => {
  const t = tiruan();
  assert.deepEqual(jenis(t), []);
  const r = cli(`--landing=${t.landing}`, `--aplikasi=${t.jsonAplikasi}`);
  assert.equal(r.status, 0, r.stdout);
  assert.match(r.stdout, /LOLOS/);
});

test('gerbang landing: [ISI di data kebijakan tertangkap', () => {
  const t = tiruan();
  const isi = { ...t.kebijakan, ringkasan: ['[ISI: kontak]'] };
  t.tulis('src/data/kebijakan-privasi.json', isi);
  fs.writeFileSync(t.jsonAplikasi, JSON.stringify(isi));
  assert.deepEqual(periksa({ landing: t.landing, jsonAplikasi: t.jsonAplikasi }), [{ jenis: 'isian', pesan: 'src/data/kebijakan-privasi.json: 1 isian masih kosong.' }]);
  const r = cli(`--landing=${t.landing}`, `--aplikasi=${t.jsonAplikasi}`);
  assert.equal(r.status, 1);
  assert.match(r.stdout, /BELUM BOLEH TERBIT/);
});

test('gerbang landing: [ISI di teks situs lain, public, dan halaman akar tertangkap', () => {
  for (const rel of ['src/konten/docs.ts', 'public/catatan.txt', 'google-kembali.html']) {
    const t = tiruan();
    t.tulis(rel, 'Teks [ISI: sesuatu]');
    assert.deepEqual(jenis(t), ['isian'], rel);
  }
});

test('gerbang landing: berkas biner tidak dipindai', () => {
  const t = tiruan();
  t.tulis('public/gambar/a.webp', '[ISI');
  assert.deepEqual(jenis(t), []);
});

test('gerbang landing: salinan yang berbeda tertangkap, per bagian', () => {
  for (const [kunci, nilai] of [['status', 'Lain.'], ['versi', 2], ['ringkasan', ['Beda.']], ['isi', []]]) {
    const t = tiruan();
    t.tulis('src/data/kebijakan-privasi.json', { ...t.kebijakan, [kunci]: nilai });
    assert.deepEqual(jenis(t), ['salinan'], kunci);
  }
});

test('gerbang landing: bagian asing di salinan tertangkap', () => {
  const t = tiruan();
  t.tulis('src/data/kebijakan-privasi.json', { ...t.kebijakan, tambahan: 'x' });
  assert.deepEqual(jenis(t), ['salinan']);
});

test('gerbang landing: berkas aplikasi hilang tidak dianggap lolos', () => {
  const t = tiruan();
  fs.rmSync(t.jsonAplikasi);
  assert.deepEqual(jenis(t), ['salinan']);
});

test('gerbang landing: --hanya-isian melewati pembandingan, tetapi tetap menangkap [ISI', () => {
  const t = tiruan();
  fs.rmSync(t.jsonAplikasi);
  assert.deepEqual(jenis(t, { hanyaIsian: true }), []);
  t.tulis('src/konten/docs.ts', '[ISI');
  assert.deepEqual(jenis(t, { hanyaIsian: true }), ['isian']);
});

test('gerbang landing: argumen tak dikenal ditolak', () => {
  assert.equal(cli('--apa').status, 2);
});

test('gerbang landing: terpasang sebagai skrip, di luar npm test dan npm run build', () => {
  const { scripts } = JSON.parse(fs.readFileSync(path.join(AKAR, 'package.json'), 'utf8'));
  assert.ok(scripts['periksa-gerbang-landing']);
  for (const k of ['test', 'build']) assert.ok(!scripts[k].includes('periksa-gerbang-landing'), k);
});
