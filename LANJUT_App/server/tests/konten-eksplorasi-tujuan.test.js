// Uji F10 Eksplorasi Tujuan (LANJUT_031): GET /konten/eksplorasi-tujuan[/:id].
//
// Aturan: hanya profil TERVERIFIKASI (status 'terverifikasi' DAN
// diperiksa_pada terisi) yang keluar. Profil belum terverifikasi → tidak ada
// di daftar, dan detailnya 404 yang sama dengan id yang tidak ada.
//
// Fixture: SATU baris profil_prodi ber-asal 'uji-031', dipasang ke prodi
// asli yang BELUM punya profil (bukan prodi fixture — tes agregasi yang
// berjalan paralel membaca seluruh /konten/prodi, dan menghapus prodi di
// tengah bacaannya bisa membuat tes itu goyah). Hanya bila semua prodi
// sudah berprofil, prodi fixture dibuat sebagai cadangan. Semua tes F10 ada
// di berkas ini supaya tidak berebut baris yang sama antar-proses.

const { test, before, after, mock } = require('node:test');
const assert = require('node:assert/strict');
const { nyalakanServer, urlDari, pool } = require('./bantuan');
const kontenRepo = require('../src/modul/konten/konten.repo');

const ASAL_UJI = 'uji-031';
const ID_PRODI_CADANGAN = 'uji-031-prodi';

const KUNCI = [
  'id', 'nama', 'rumpun', 'jenjang', 'badge_relevan_smk', 'peminat', 'diterima', 'mata_kuliah',
  'profesi', 'kampus', 'status_sumber', 'catatan_studi',
  'sumber', 'pemilik', 'status_verifikasi', 'asal', 'url_sumber', 'diperiksa_pada',
].sort();

const ISI = {
  jenjang: 'D4',
  mata_kuliah: ['Mata kuliah B', 'Mata kuliah A', 'Mata kuliah C'], // urutan berkas dipertahankan
  profesi: ['Profesi uji'],
  kampus: [
    { nama: 'Politeknik Uji', jenis: 'PTN Vokasi', jalur_masuk: ['SNBT'] },
    { nama: 'Universitas Uji', jenis: 'PTN Akademik', jalur_masuk: ['SNBP', 'SNBT'] },
  ],
  status_sumber: { peminat: 'Terverifikasi', mata_kuliah: 'Perkiraan', profesi: 'Terverifikasi', kampus: 'Terverifikasi' },
};

let server;
let baseUrl;
let prodi; // { id, nama, rumpun } — pemilik fixture
let prodiCadangan = false;

async function ambil(path) {
  const res = await fetch(`${baseUrl}/api/v1${path}`);
  return { status: res.status, json: await res.json() };
}

async function tandai(status, diperiksa) {
  await pool.query('UPDATE profil_prodi SET status_verifikasi = ?, diperiksa_pada = ? WHERE id = ? AND asal = ?', [
    status, diperiksa, prodi.id, ASAL_UJI,
  ]);
}

before(async () => {
  server = await nyalakanServer();
  baseUrl = urlDari(server);
  await pool.query('DELETE FROM profil_prodi WHERE asal = ?', [ASAL_UJI]); // sisa run yang gagal di tengah

  const [kosong] = await pool.query(
    `SELECT p.id, p.nama, p.rumpun FROM prodi p LEFT JOIN profil_prodi pp ON pp.id = p.id
      WHERE pp.id IS NULL AND p.id <> ? ORDER BY p.id LIMIT 1`,
    [ID_PRODI_CADANGAN]
  );
  if (kosong.length) {
    [prodi] = kosong;
  } else {
    prodiCadangan = true;
    prodi = { id: ID_PRODI_CADANGAN, nama: 'Prodi Uji 031', rumpun: 'Teknologi & Rekayasa' };
    await pool.query(
      `INSERT IGNORE INTO prodi (id, nama, rumpun, pemilik, asal) VALUES (?, ?, ?, 'tim', ?)`,
      [prodi.id, prodi.nama, prodi.rumpun, ASAL_UJI]
    );
  }

  await pool.query(
    `INSERT INTO profil_prodi
       (id, nama, urutan, jenjang, badge_relevan_smk, peminat_jumlah, peminat_kampus, peminat_tahun,
        peminat_jalur, peminat_sumber, diterima, mata_kuliah, profesi, kampus, status_sumber,
        catatan_studi, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
     VALUES (?, ?, 999, ?, 1, 5582, 'Universitas Uji', 2026, 'SNBT', 'SNPMB', 43, ?, ?, ?, ?,
             'Catatan studi uji.', 'tim', 'belum_diverifikasi', ?, 'https://contoh.invalid/f10', NULL)`,
    [prodi.id, prodi.nama, ISI.jenjang, JSON.stringify(ISI.mata_kuliah), JSON.stringify(ISI.profesi),
      JSON.stringify(ISI.kampus), JSON.stringify(ISI.status_sumber), ASAL_UJI]
  );
});

after(async () => {
  mock.restoreAll();
  await pool.query('DELETE FROM profil_prodi WHERE asal = ?', [ASAL_UJI]);
  if (prodiCadangan) await pool.query('DELETE FROM prodi WHERE id = ? AND asal = ?', [ID_PRODI_CADANGAN, ASAL_UJI]);
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

test('eksplorasi-tujuan: profil BELUM terverifikasi tidak ada di daftar, detailnya 404', async () => {
  const daftar = await ambil('/konten/eksplorasi-tujuan');
  assert.equal(daftar.status, 200);
  assert.ok(!daftar.json.data.some((p) => p.id === prodi.id), 'profil belum terverifikasi bocor ke daftar');

  const detail = await ambil(`/konten/eksplorasi-tujuan/${prodi.id}`);
  assert.equal(detail.status, 404);
  assert.equal(detail.json.galat.kode, 'TIDAK_DITEMUKAN');
});

test('eksplorasi-tujuan: status terverifikasi tanpa diperiksa_pada tetap tidak tampil', async () => {
  await tandai('terverifikasi', null);
  const daftar = await ambil('/konten/eksplorasi-tujuan');
  assert.ok(!daftar.json.data.some((p) => p.id === prodi.id));
  assert.equal((await ambil(`/konten/eksplorasi-tujuan/${prodi.id}`)).status, 404);
});

test('eksplorasi-tujuan: profil terverifikasi tampil di daftar & detail dengan bentuk dan isi persis', async () => {
  await tandai('terverifikasi', '2099-01-15');
  const harapan = {
    id: prodi.id,
    nama: prodi.nama,
    rumpun: prodi.rumpun,
    jenjang: 'D4',
    badge_relevan_smk: true,
    peminat: { jumlah: 5582, kampus: 'Universitas Uji', tahun: 2026, jalur: 'SNBT', sumber: 'SNPMB' },
    diterima: 43,
    mata_kuliah: ISI.mata_kuliah,
    profesi: ISI.profesi,
    kampus: ISI.kampus,
    status_sumber: ISI.status_sumber,
    catatan_studi: 'Catatan studi uji.',
    sumber: 'resmi',
    pemilik: 'tim',
    status_verifikasi: 'terverifikasi',
    asal: ASAL_UJI,
    url_sumber: 'https://contoh.invalid/f10',
    diperiksa_pada: '2099-01-15',
  };

  const daftar = await ambil('/konten/eksplorasi-tujuan');
  assert.equal(daftar.status, 200);
  assert.deepEqual(daftar.json.data.find((p) => p.id === prodi.id), harapan);

  const detail = await ambil(`/konten/eksplorasi-tujuan/${encodeURIComponent(prodi.id)}`);
  assert.equal(detail.status, 200);
  assert.deepEqual(detail.json.data, harapan);
});

test('eksplorasi-tujuan: SEMUA isi daftar terverifikasi dan berbentuk sama', async () => {
  const { json } = await ambil('/konten/eksplorasi-tujuan');
  assert.ok(json.data.length >= 1);
  for (const p of json.data) {
    assert.deepEqual(Object.keys(p).sort(), KUNCI, `kunci ${p.id} berbeda`);
    assert.equal(p.status_verifikasi, 'terverifikasi', `${p.id} belum terverifikasi tapi tampil`);
    assert.match(p.diperiksa_pada, /^\d{4}-\d{2}-\d{2}$/);
    for (const k of ['mata_kuliah', 'profesi', 'kampus']) assert.ok(Array.isArray(p[k]), `${p.id}.${k} bukan larik`);
  }
  // Tidak ada kolom gaji di mana pun (spec F10 §3).
  assert.ok(!/gaji/i.test(JSON.stringify(json.data)));
});

test('eksplorasi-tujuan: peminat tanpa angka → peminat null; diterima null diteruskan apa adanya', async () => {
  await pool.query('UPDATE profil_prodi SET peminat_jumlah = NULL, diterima = NULL WHERE id = ? AND asal = ?', [prodi.id, ASAL_UJI]);
  const { json } = await ambil(`/konten/eksplorasi-tujuan/${prodi.id}`);
  assert.equal(json.data.peminat, null);
  assert.equal(json.data.diterima, null);
  await pool.query('UPDATE profil_prodi SET peminat_jumlah = 5582, diterima = 43 WHERE id = ? AND asal = ?', [prodi.id, ASAL_UJI]);
});

test('eksplorasi-tujuan: kueri tak dikenal tidak bisa membuka profil belum terverifikasi', async () => {
  await tandai('belum_diverifikasi', null);
  for (const q of ['?semua=1', '?status_verifikasi=belum_diverifikasi', `?id=${prodi.id}`]) {
    const { status, json } = await ambil(`/konten/eksplorasi-tujuan${q}`);
    assert.equal(status, 200);
    assert.ok(!json.data.some((p) => p.id === prodi.id), `bocor lewat ${q}`);
  }
  await tandai('terverifikasi', '2099-01-15');
});

test('eksplorasi-tujuan/:id: id tidak ada atau aneh → 404 TIDAK_DITEMUKAN, bukan 500', async () => {
  for (const id of ['prodi-yang-tidak-ada', "x' OR '1'='1", 'a'.repeat(200)]) {
    const { status, json } = await ambil(`/konten/eksplorasi-tujuan/${encodeURIComponent(id)}`);
    assert.equal(status, 404, `status untuk "${id.slice(0, 20)}"`);
    assert.equal(json.galat.kode, 'TIDAK_DITEMUKAN');
  }
});

test('eksplorasi-tujuan: belum ada profil terverifikasi → 200 data [] dan detail 404', async (t) => {
  t.mock.method(kontenRepo, 'ambilProfilProdiTerverifikasi', async () => []);
  assert.deepEqual((await ambil('/konten/eksplorasi-tujuan')).json, { ok: true, data: [] });
  assert.equal((await ambil(`/konten/eksplorasi-tujuan/${prodi.id}`)).status, 404);
});

test('eksplorasi-tujuan: galat basis data → 500 GALAT_SERVER tanpa membocorkan detail', async (t) => {
  t.mock.method(kontenRepo, 'ambilProfilProdiTerverifikasi', async () => {
    throw new Error('ER_BAD_FIELD_ERROR: profil_prodi.rahasia');
  });
  t.mock.method(console, 'error', () => {});
  for (const path of ['/konten/eksplorasi-tujuan', `/konten/eksplorasi-tujuan/${prodi.id}`]) {
    const res = await fetch(`${baseUrl}/api/v1${path}`);
    const teks = await res.text();
    assert.equal(res.status, 500);
    assert.equal(JSON.parse(teks).galat.kode, 'GALAT_SERVER');
    assert.ok(!/ER_BAD_FIELD|profil_prodi|rahasia/.test(teks));
  }
});
