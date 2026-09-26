// PLACEHOLDER — lihat src/modul/levelin/keputusan.js.
//
// docs/SDD-Backend-Foundation.md §9.4 mensyaratkan berkas ini menjalankan
// BERKAS KASUS UJI YANG SAMA dengan `app/tools/test-levelin.js` di klien
// (mitigasi RB5). Itu baru bisa dilakukan setelah `app/assets/levelin.js`
// (dan kasus ujinya) ada — lihat catatan lengkap di kepala
// `src/modul/levelin/keputusan.js`.
//
// Untuk sekarang, uji ini hanya memastikan placeholder GAGAL DENGAN JELAS
// (bukan diam-diam mengembalikan angka salah) — supaya siapa pun yang lupa
// mengisi berkas itu langsung tahu dari test yang merah, bukan dari bug
// produksi.

const { test } = require('node:test');
const assert = require('node:assert/strict');
const keputusan = require('../src/modul/levelin/keputusan');

for (const nama of ['gapNumerik', 'klasifikasiKartu', 'agregatPerMapel', 'ringkasSesi', 'saranHarian']) {
  test(`keputusan.${nama}() melempar galat yang jelas selama belum diisi (TODO)`, () => {
    assert.throws(() => keputusan[nama](), /belum diisi/);
  });
}
