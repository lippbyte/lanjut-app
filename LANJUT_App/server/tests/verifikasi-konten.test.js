// Uji skrip `npm run verifikasi-konten` (LANJUT_010,
// src/db/verifikasi/verifikasi-konten.js). Memakai baris Linimasa
// sungguhan, lalu mengembalikan status aslinya di `after`.

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { pool } = require('./bantuan');
const { daftarBelum, ubahStatus, GalatPakai } = require('../src/db/verifikasi/verifikasi-konten');

const ID = 'sosialisasi';
const ID_KEDUA = 'pdss';
let asli;

async function ambilBaris(ids) {
  const [baris] = await pool.query('SELECT * FROM tahapan_linimasa WHERE id IN (?) ORDER BY id', [ids]);
  return baris;
}

before(async () => {
  asli = await ambilBaris([ID, ID_KEDUA]);
  assert.equal(asli.length, 2, 'baris uji Linimasa belum dibenih');
});

after(async () => {
  for (const b of asli) {
    await pool.query('UPDATE tahapan_linimasa SET status_verifikasi = ?, diperiksa_pada = ? WHERE id = ?', [
      b.status_verifikasi,
      b.diperiksa_pada,
      b.id,
    ]);
  }
  await pool.end();
});

const tanpaVerifikasi = ({ status_verifikasi, diperiksa_pada, ...isi }) => isi;

test('verifikasi-konten: tandai hanya mengubah status_verifikasi & diperiksa_pada', async () => {
  await ubahStatus({ jenis: 'linimasa', ids: [ID], tanggal: '2026-09-27', batal: false });
  const [sesudah] = await ambilBaris([ID]);
  assert.equal(sesudah.status_verifikasi, 'terverifikasi');
  assert.equal(new Date(sesudah.diperiksa_pada).toISOString().slice(0, 10), '2026-09-27');
  assert.deepEqual(tanpaVerifikasi(sesudah), tanpaVerifikasi(asli.find((b) => b.id === ID)));

  const linimasa = (await daftarBelum('linimasa'))[0].baris.map((b) => b.id);
  assert.ok(!linimasa.includes(ID), 'baris terverifikasi masih muncul di --list');
});

test('verifikasi-konten: batal mengosongkan lagi status verifikasi', async () => {
  await ubahStatus({ jenis: 'linimasa', ids: [ID], tanggal: null, batal: true });
  const [sesudah] = await ambilBaris([ID]);
  assert.equal(sesudah.status_verifikasi, 'belum_diverifikasi');
  assert.equal(sesudah.diperiksa_pada, null);
  assert.deepEqual(tanpaVerifikasi(sesudah), tanpaVerifikasi(asli.find((b) => b.id === ID)));
});

test('verifikasi-konten: satu ID salah → galat, dan ID yang benar pun tidak diubah', async () => {
  const sebelum = await ambilBaris([ID_KEDUA]);
  await assert.rejects(
    ubahStatus({ jenis: 'linimasa', ids: [ID_KEDUA, 'tidak-ada-id-ini'], tanggal: '2026-09-27', batal: false }),
    (galat) => galat instanceof GalatPakai && /tidak-ada-id-ini/.test(galat.message)
  );
  assert.deepEqual(await ambilBaris([ID_KEDUA]), sebelum);
});

test('verifikasi-konten: jenis tidak dikenal & ID kosong ditolak', async () => {
  await assert.rejects(ubahStatus({ jenis: 'pengguna', ids: ['x'], tanggal: '2026-09-27' }), GalatPakai);
  await assert.rejects(ubahStatus({ jenis: 'linimasa', ids: [' ', ''], tanggal: '2026-09-27' }), GalatPakai);
  await assert.rejects(daftarBelum('kartu'), GalatPakai);
});
