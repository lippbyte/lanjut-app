// tests/pembuka-kelinci.test.js
// Animasi pembuka app dengan kelinci LANJUT (15 Okt 2026 — pilihan percakapan, belum disetujui PM).
// Aturan waktu (lib/pembuka.ts) dijalankan langsung lewat muat-ts-app.js; komponen dan
// root layout dicek dari sumbernya.

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { muatModulApp } = require('./muat-ts-app');

const AKAR_APP = path.join(__dirname, '..', '..');
const baca = (...p) => fs.readFileSync(path.join(AKAR_APP, ...p), 'utf8');

const pembuka = muatModulApp('lib/pembuka');
const { MIN_TAMPIL_MS, MAKS_TAMPIL_MS, bolehTutup, sisaSebelumTutup } = pembuka;

describe('aturan waktu layar pembuka', () => {
  test('app siap: menunggu waktu tampil minimum dulu, lalu boleh tutup', () => {
    assert.equal(bolehTutup(true, 0), false);
    assert.equal(bolehTutup(true, MIN_TAMPIL_MS - 1), false);
    assert.equal(bolehTutup(true, MIN_TAMPIL_MS), true);
    assert.equal(sisaSebelumTutup(true, 300), MIN_TAMPIL_MS - 300);
    assert.equal(sisaSebelumTutup(true, MIN_TAMPIL_MS + 50), 0);
  });

  test('app belum siap: tetap tampil melewati minimum, tidak menutup sebelum waktunya', () => {
    for (const ms of [0, MIN_TAMPIL_MS, MIN_TAMPIL_MS + 500, MAKS_TAMPIL_MS - 1]) {
      assert.equal(bolehTutup(false, ms), false, `belum siap, ${ms} ms`);
    }
    assert.equal(sisaSebelumTutup(false, 300), MAKS_TAMPIL_MS - 300);
  });

  test('pengaman: paling lama MAKS_TAMPIL_MS walau app belum siap', () => {
    assert.equal(bolehTutup(false, MAKS_TAMPIL_MS), true);
    assert.equal(bolehTutup(false, MAKS_TAMPIL_MS + 10_000), true);
    assert.equal(sisaSebelumTutup(false, MAKS_TAMPIL_MS), 0);
  });

  test('sisa waktu tidak pernah negatif dan tidak melebihi batas atas', () => {
    for (const siap of [true, false]) {
      for (let ms = 0; ms <= MAKS_TAMPIL_MS + 1000; ms += 50) {
        const sisa = sisaSebelumTutup(siap, ms);
        assert.ok(sisa >= 0 && sisa <= MAKS_TAMPIL_MS, `siap=${siap}, ${ms} ms → ${sisa}`);
        assert.equal(sisa === 0, bolehTutup(siap, ms), `siap=${siap}, ${ms} ms`);
      }
    }
  });

  test('"tipis": singkat dan gerakannya kecil', () => {
    assert.ok(MAKS_TAMPIL_MS <= 4000, 'tidak menahan app lebih dari 4 detik');
    assert.ok(MIN_TAMPIL_MS <= 1000, 'minimum tampil paling lama 1 detik');
    assert.ok(MIN_TAMPIL_MS < MAKS_TAMPIL_MS);
    assert.ok(pembuka.DURASI_MASUK_MS < MIN_TAMPIL_MS, 'animasi masuk selesai sebelum boleh tutup');
    assert.ok(pembuka.DURASI_KELUAR_MS <= 400);
    assert.ok(pembuka.DURASI_KELUAR_TANPA_GERAK_MS < pembuka.DURASI_KELUAR_MS);
    assert.ok(pembuka.SKALA_AWAL >= 0.85 && pembuka.SKALA_AWAL < 1);
    assert.ok(pembuka.GESER_AWAL_PX > 0 && pembuka.GESER_AWAL_PX <= 12);
    assert.ok(pembuka.AMBANG_MENGAMBANG_PX > 0 && pembuka.AMBANG_MENGAMBANG_PX <= 6);
  });
});

describe('komponen PembukaKelinci', () => {
  const sumber = baca('components', 'layout', 'PembukaKelinci.tsx');

  test('memakai kelinci LANJUT (berkas ada) dan wordmark', () => {
    assert.match(sumber, /require\('\.\.\/\.\.\/assets\/maskot-ai-biru\.png'\)/);
    assert.match(sumber, /require\('\.\.\/\.\.\/assets\/lanjut-wordmark\.png'\)/);
    assert.ok(fs.existsSync(path.join(AKAR_APP, 'assets', 'maskot-ai-biru.png')));
    assert.ok(fs.existsSync(path.join(AKAR_APP, 'assets', 'lanjut-wordmark.png')));
  });

  test('hiasan saja: tidak menangkap sentuhan dan tersembunyi dari pembaca layar', () => {
    assert.match(sumber, /pointerEvents="none"/);
    assert.match(sumber, /aria-hidden/);
    assert.match(sumber, /importantForAccessibility="no-hide-descendants"/);
  });

  test('menghormati "kurangi gerakan" di perangkat', () => {
    assert.match(sumber, /AccessibilityInfo\.isReduceMotionEnabled\?\.\(\)/);
    assert.match(sumber, /if \(tanpaGerak\) \{/);
  });

  test('jadwal tutup memakai aturan lib/pembuka dan dilepas sesudah selesai', () => {
    assert.match(sumber, /sisaSebelumTutup\(siap, Date\.now\(\) - mulai\)/);
    assert.match(sumber, /if \(selesai\) return null;/);
  });

  test('tanpa paket baru: hanya react, react-native, dan berkas lokal', () => {
    const impor = [...sumber.matchAll(/from '([^']+)'/g)].map((m) => m[1]);
    for (const asal of impor) {
      assert.ok(asal === 'react' || asal === 'react-native' || asal.startsWith('.'), `impor ${asal}`);
    }
  });
});

describe('root layout memasang pembuka sekali', () => {
  const sumber = baca('app', '_layout.tsx');

  test('menunggu huruf DAN sesi, dipasang sesudah isi (di atasnya)', () => {
    assert.match(sumber, /<PembukaKelinci siap=\{hurufBeres && sesiSiap\} \/>\r?\n\s*<\/View>/);
    assert.match(sumber, /<Slot \/>\r?\n\s*<TandaSesiSiap onSiap=\{setSesiSiap\} \/>\r?\n\s*<\/AuthProvider>/);
  });

  test('galat muat huruf tetap tidak mengunci app', () => {
    assert.match(sumber, /const hurufBeres = hurufSiap \|\| !!galatHuruf;/);
  });
});
