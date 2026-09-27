// Uji `npm run benih` tidak menimpa tanda verifikasi (LANJUT_011).
//
// Skenario: tandai lewat skrip verifikasi-konten → benih ulang → baris tetap
// terverifikasi, sementara kolom konten lain tetap diperbarui dari JSON dan
// baris baru tetap masuk sebagai "belum diverifikasi".
//
// File test jalan paralel, jadi baris yang dipakai di sini sengaja berbeda
// dari verifikasi-konten.test.js (Linimasa sosialisasi/pdss). Checklist
// memakai butir contoh sendiri (rumpun Sosial & Humaniora, kategori sendiri)
// karena konten-checklist-rumpun.test.js membandingkan respons checklist
// persis, dan butir umum yang berubah status akan merusak pembandingan itu.

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { pool } = require('./bantuan');
const { jalankanBenih, benihChecklist } = require('../src/db/benih/benih');
const { JENIS, ubahStatus } = require('../src/db/verifikasi/verifikasi-konten');

// Satu baris asli per jenis yang bisa diverifikasi (selain checklist).
const BARIS = {
  linimasa: 'daftar-snbp',
  'khusus-smk': 'nilai-rapor',
  prodi: 'akuntansi',
  mapel: 'kimia',
  'cerita-alumni': 'contoh-1',
};
// Dihapus lalu dibenih ulang untuk menguji jalur INSERT baris baru.
const LINIMASA_BARU = 'pelaksanaan-tka';

const CHECKLIST_CONTOH = {
  sumber: 'resmi',
  pemilik: 'tim',
  asal: 'contoh',
  status: 'belum_diverifikasi',
  kategori: [
    {
      id: 'contoh-verifikasi',
      nama: 'Contoh Verifikasi (uji benih)',
      butir: [
        {
          id: 'contoh-verifikasi-soshum',
          judul: 'CONTOH: butir untuk uji benih & verifikasi',
          urutan: 950,
          berlaku_untuk_kelas: ['12'],
          berlaku_untuk_jalur: ['SNBP'],
          berlaku_untuk_rumpun: ['Sosial & Humaniora'],
        },
      ],
    },
  ],
};
const ID_CHECKLIST = CHECKLIST_CONTOH.kategori[0].butir[0].id;

const asli = {};

async function status(jenis, id) {
  const [[b]] = await pool.query('SELECT status_verifikasi, diperiksa_pada FROM ?? WHERE id = ?', [
    JENIS[jenis].tabel,
    id,
  ]);
  return b && { status: b.status_verifikasi, tanggal: b.diperiksa_pada && new Date(b.diperiksa_pada).toISOString().slice(0, 10) };
}

async function hapusChecklistContoh() {
  await pool.query('DELETE FROM butir_daftar_periksa WHERE id = ?', [ID_CHECKLIST]);
  await pool.query('DELETE FROM kategori_checklist WHERE id = ?', ['contoh-verifikasi']);
}

before(async () => {
  await hapusChecklistContoh();
  for (const [jenis, id] of Object.entries(BARIS)) {
    const [[b]] = await pool.query('SELECT status_verifikasi, diperiksa_pada FROM ?? WHERE id = ?', [JENIS[jenis].tabel, id]);
    assert.ok(b, `baris ${jenis}/${id} belum dibenih`);
    asli[jenis] = b;
  }
  const [[baru]] = await pool.query('SELECT * FROM tahapan_linimasa WHERE id = ?', [LINIMASA_BARU]);
  assert.ok(baru, `baris linimasa/${LINIMASA_BARU} belum dibenih`);
  asli.linimasaBaru = baru;
});

after(async () => {
  for (const [jenis, id] of Object.entries(BARIS)) {
    await pool.query('UPDATE ?? SET status_verifikasi = ?, diperiksa_pada = ? WHERE id = ?', [
      JENIS[jenis].tabel,
      asli[jenis].status_verifikasi,
      asli[jenis].diperiksa_pada,
      id,
    ]);
  }
  await hapusChecklistContoh();
  await pool.end();
});

test('benih ulang: baris yang sudah ditandai terverifikasi TETAP terverifikasi (semua jenis)', async () => {
  for (const [jenis, id] of Object.entries(BARIS)) {
    await ubahStatus({ jenis, ids: [id], tanggal: '2026-09-20', batal: false });
  }
  await jalankanBenih();
  for (const [jenis, id] of Object.entries(BARIS)) {
    assert.deepEqual(await status(jenis, id), { status: 'terverifikasi', tanggal: '2026-09-20' }, `${jenis}/${id} ter-reset oleh benih`);
  }
});

test('benih ulang: butir checklist yang sudah ditandai terverifikasi TETAP terverifikasi', async () => {
  await benihChecklist(CHECKLIST_CONTOH);
  assert.deepEqual(await status('checklist', ID_CHECKLIST), { status: 'belum_diverifikasi', tanggal: null });

  await ubahStatus({ jenis: 'checklist', ids: [ID_CHECKLIST], tanggal: '2026-09-20', batal: false });
  await benihChecklist(CHECKLIST_CONTOH);
  assert.deepEqual(await status('checklist', ID_CHECKLIST), { status: 'terverifikasi', tanggal: '2026-09-20' });
});

test('benih ulang: kolom konten lain tetap diperbarui dari JSON', async () => {
  const [[sebelum]] = await pool.query('SELECT judul FROM tahapan_linimasa WHERE id = ?', [BARIS.linimasa]);
  await pool.query("UPDATE tahapan_linimasa SET judul = 'JUDUL BASI' WHERE id = ?", [BARIS.linimasa]);
  await jalankanBenih();
  const [[sesudah]] = await pool.query('SELECT judul FROM tahapan_linimasa WHERE id = ?', [BARIS.linimasa]);
  assert.equal(sesudah.judul, sebelum.judul, 'judul tidak dikembalikan ke isi JSON');
});

test('benih: baris BARU tetap masuk dengan status bawaan dari JSON (belum diverifikasi)', async () => {
  await pool.query('DELETE FROM tahapan_linimasa WHERE id = ?', [LINIMASA_BARU]);
  await jalankanBenih();
  const [[baru]] = await pool.query('SELECT * FROM tahapan_linimasa WHERE id = ?', [LINIMASA_BARU]);
  assert.ok(baru, 'baris baru tidak dimasukkan benih');
  assert.equal(baru.status_verifikasi, 'belum_diverifikasi');
  assert.equal(baru.diperiksa_pada, null);
  assert.deepEqual(baru, asli.linimasaBaru);
});
