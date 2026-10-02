// Uji F7 Latihan (LANJUT_041): POST/GET/PATCH /sesi-latihan dan
// POST /riwayat-latihan — tanpa Level-In (catatan dikirim tanpa keyakinan).
//
// Aturan yang diuji:
//   - semuanya wajib login; sesi & riwayat hanya milik sendiri (404, §8.4);
//   - rujukan dicek sebelum menulis: sesi milik sendiri, kartu milik sendiri
//     atau kurasi terverifikasi, mapel dikenal — dulu jatuh ke FK (500);
//   - mapel_id riwayat diambil dari kartunya;
//   - id buatan klien idempoten, tetapi id milik akun lain tidak "berhasil".
// Pola lintas akun mengikuti butir-pribadi.test.js / kartu-arsip.test.js.

const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('crypto');
const { nyalakanServer, urlDari, daftarPenggunaBaru, pool } = require('./bantuan');

let server;
let baseUrl;
let kurasiBelumTerverifikasi; // id kartu resmi dari benih

const ISO = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?Z$/;
const id = () => crypto.randomUUID();
const kini = () => new Date().toISOString();

before(async () => {
  server = await nyalakanServer();
  baseUrl = urlDari(server);
  const [baris] = await pool.execute(
    "SELECT id FROM kartu WHERE sumber = 'resmi' AND status_verifikasi <> 'terverifikasi' LIMIT 1"
  );
  assert.ok(baris.length, 'butuh kartu kurasi belum terverifikasi dari benih (npm run benih)');
  kurasiBelumTerverifikasi = baris[0].id;
});

after(async () => {
  await new Promise((resolve) => server.close(resolve));
  await pool.end();
});

async function panggil(metode, path, token, body) {
  const res = await fetch(`${baseUrl}/api/v1${path}`, {
    method: metode,
    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}), ...(body !== undefined ? { 'Content-Type': 'application/json' } : {}) },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });
  return { status: res.status, json: await res.json() };
}

async function akunBaru() {
  const { status, json } = await daftarPenggunaBaru(baseUrl);
  assert.equal(status, 201);
  return json.data.token;
}

async function kartu(token, mapel_id = 'fisika', judul = 'Kartu latihan') {
  const { status, json } = await panggil('POST', '/kartu', token, { mapel_id, judul, isi: 'Soal?', jawaban: 'Jawab' });
  assert.equal(status, 201);
  return json.data.id;
}

async function mulai(token, override) {
  const body = { id: id(), dimulai_pada: kini(), mapel_fokus_id: 'fisika', asal_mula: 'arsip', jumlah_kartu_direncanakan: 2, ...override };
  const res = await panggil('POST', '/sesi-latihan', token, body);
  return { ...res, body };
}

const catatan = (override) => ({ id: id(), benar: true, waktu: kini(), ...override });

async function daftarSesi(token) {
  const { status, json } = await panggil('GET', '/sesi-latihan', token);
  assert.equal(status, 200);
  return json.data;
}
const sesi = async (token, sesiId) => (await daftarSesi(token)).find((s) => s.id === sesiId);

test('tanpa token → 401 TIDAK_MASUK di semua rute latihan', async () => {
  for (const [metode, path, body] of [
    ['GET', '/sesi-latihan'],
    ['POST', '/sesi-latihan', {}],
    ['PATCH', '/sesi-latihan/x', { selesai_pada: kini() }],
    ['POST', '/riwayat-latihan', [catatan()]],
  ]) {
    const { status, json } = await panggil(metode, path, null, body);
    assert.equal(status, 401, `${metode} ${path}`);
    assert.equal(json.galat.kode, 'TIDAK_MASUK');
  }
});

test('mulai sesi: 201, muncul di GET /sesi-latihan dengan bentuk yang benar; id sama dua kali tetap satu sesi', async () => {
  const token = await akunBaru();
  const { status, json, body } = await mulai(token);
  assert.equal(status, 201);
  assert.deepEqual(json.data, { id: body.id });

  const s = await sesi(token, body.id);
  assert.deepEqual(Object.keys(s).sort(), [
    'asal_mula', 'dimulai_pada', 'id', 'jumlah_benar', 'jumlah_dijawab', 'jumlah_kartu_direncanakan', 'mapel_fokus_id', 'selesai_pada',
  ]);
  assert.match(s.dimulai_pada, ISO);
  assert.equal(s.selesai_pada, null);
  assert.equal(s.mapel_fokus_id, 'fisika');
  assert.equal(s.asal_mula, 'arsip');
  assert.equal(s.jumlah_kartu_direncanakan, 2);
  assert.equal(s.jumlah_dijawab, 0);
  assert.equal(s.jumlah_benar, 0);

  const ulang = await panggil('POST', '/sesi-latihan', token, body);
  assert.equal(ulang.status, 201, 'idempoten');
  assert.equal((await daftarSesi(token)).length, 1);
});

test('mulai sesi semua mapel (mapel_fokus_id null) → 201', async () => {
  const token = await akunBaru();
  const { status, body } = await mulai(token, { mapel_fokus_id: null });
  assert.equal(status, 201);
  assert.equal((await sesi(token, body.id)).mapel_fokus_id, null);
});

test('validasi mulai sesi → 400 dan tidak ada sesi tercipta', async () => {
  const token = await akunBaru();
  for (const [override, medan] of [
    [{ mapel_fokus_id: 'astrologi' }, 'mapel_fokus_id'],
    [{ asal_mula: 'entah' }, 'asal_mula'],
    [{ jumlah_kartu_direncanakan: 0 }, 'jumlah_kartu_direncanakan'],
    [{ id: '' }, 'id'],
  ]) {
    const { status, json } = await mulai(token, override);
    assert.equal(status, 400, JSON.stringify(override));
    assert.ok(json.galat.medan[medan], `medan ${medan}: ${JSON.stringify(json.galat)}`);
  }
  assert.deepEqual(await daftarSesi(token), []);
});

test('tutup sesi: 200 dengan selesai_pada; sesi tak dikenal → 404', async () => {
  const token = await akunBaru();
  const { body } = await mulai(token);
  const tutup = await panggil('PATCH', `/sesi-latihan/${body.id}`, token, { selesai_pada: kini() });
  assert.equal(tutup.status, 200);
  assert.equal(tutup.json.data.id, body.id);
  assert.match(tutup.json.data.selesai_pada, ISO);
  assert.match((await sesi(token, body.id)).selesai_pada, ISO);

  const takAda = await panggil('PATCH', `/sesi-latihan/${id()}`, token, { selesai_pada: kini() });
  assert.equal(takAda.status, 404);
  assert.equal(takAda.json.galat.kode, 'TIDAK_DITEMUKAN');
});

test('catat riwayat: 201, terhitung di sesi (dijawab & benar), idempoten per id, mapel diambil dari kartu', async () => {
  const token = await akunBaru();
  const kFisika = await kartu(token, 'fisika');
  const kBio = await kartu(token, 'biologi');
  const { body } = await mulai(token, { mapel_fokus_id: null });

  const batch = [
    catatan({ sesi_id: body.id, kartu_id: kFisika, mapel_id: 'kimia', benar: true }), // mapel kiriman salah
    catatan({ sesi_id: body.id, kartu_id: kBio, benar: false }),
  ];
  const res = await panggil('POST', '/riwayat-latihan', token, batch);
  assert.equal(res.status, 201);
  assert.deepEqual(res.json.data, { disimpan: 2 });

  let s = await sesi(token, body.id);
  assert.equal(s.jumlah_dijawab, 2);
  assert.equal(s.jumlah_benar, 1);

  const ulang = await panggil('POST', '/riwayat-latihan', token, batch);
  assert.equal(ulang.status, 201);
  s = await sesi(token, body.id);
  assert.equal(s.jumlah_dijawab, 2, 'kirim ulang tidak menggandakan');

  const [baris] = await pool.execute('SELECT mapel_id, keyakinan FROM riwayat_latihan WHERE id = ?', [batch[0].id]);
  assert.equal(baris[0].mapel_id, 'fisika', 'mapel dari kartu, bukan dari kiriman');
  assert.equal(baris[0].keyakinan, null, 'tanpa Level-In');
});

test('riwayat dengan rujukan tak sah → 4xx (bukan 500), dan satu catatan salah menggagalkan seluruh kiriman', async () => {
  const token = await akunBaru();
  const k = await kartu(token);
  const { body } = await mulai(token);

  const kasus = [
    [[catatan({ sesi_id: body.id, kartu_id: 'kartu-tidak-ada' })], 404],
    [[catatan({ sesi_id: body.id, kartu_id: kurasiBelumTerverifikasi })], 404],
    [[catatan({ sesi_id: id(), kartu_id: k })], 404],
    [[catatan({ mapel_id: 'astrologi' })], 400],
    [[{ id: id(), waktu: kini() }], 400], // tanpa benar
    [[], 400],
    // Satu sah + satu salah → yang sah pun tidak tersimpan.
    [[catatan({ sesi_id: body.id, kartu_id: k }), catatan({ sesi_id: body.id, kartu_id: 'kartu-tidak-ada' })], 404],
  ];
  for (const [kiriman, status] of kasus) {
    const res = await panggil('POST', '/riwayat-latihan', token, kiriman);
    assert.equal(res.status, status, JSON.stringify(kiriman).slice(0, 120));
  }
  assert.equal((await sesi(token, body.id)).jumlah_dijawab, 0);
});

test('LINTAS AKUN: sesi & riwayat A tidak terbaca, tertutup, tertimpa, maupun tertaut oleh B', async () => {
  const a = await akunBaru();
  const b = await akunBaru();
  const kartuA = await kartu(a, 'fisika', 'Milik A');
  const sesiA = (await mulai(a, { jumlah_kartu_direncanakan: 3 })).body;
  await panggil('POST', '/riwayat-latihan', a, [catatan({ sesi_id: sesiA.id, kartu_id: kartuA, benar: true })]);

  // B tidak melihat sesi A.
  assert.deepEqual(await daftarSesi(b), [], 'sesi A bocor ke GET B');

  // B tidak bisa menutup sesi A.
  const tutup = await panggil('PATCH', `/sesi-latihan/${sesiA.id}`, b, { selesai_pada: kini() });
  assert.equal(tutup.status, 404);

  // B tidak bisa "memulai" sesi dengan id milik A.
  const rebut = await mulai(b, { id: sesiA.id, mapel_fokus_id: 'biologi', jumlah_kartu_direncanakan: 9 });
  assert.equal(rebut.status, 400);
  assert.ok(rebut.json.galat.medan.id);
  assert.deepEqual(await daftarSesi(b), []);

  // B tidak bisa menautkan riwayatnya ke sesi A, atau menjawab kartu A.
  const keSesiA = await panggil('POST', '/riwayat-latihan', b, [catatan({ sesi_id: sesiA.id, benar: false })]);
  assert.equal(keSesiA.status, 404);
  const keKartuA = await panggil('POST', '/riwayat-latihan', b, [catatan({ kartu_id: kartuA, benar: false })]);
  assert.equal(keKartuA.status, 404);

  // B mencatat di sesinya sendiri — tidak ikut terhitung di sesi A.
  const kartuB = await kartu(b);
  const sesiB = (await mulai(b)).body;
  await panggil('POST', '/riwayat-latihan', b, [catatan({ sesi_id: sesiB.id, kartu_id: kartuB, benar: false })]);
  assert.deepEqual((await daftarSesi(b)).map((s) => s.id), [sesiB.id]);

  // Sesi A utuh.
  const s = await sesi(a, sesiA.id);
  assert.equal(s.selesai_pada, null, 'B menutup sesi A');
  assert.equal(s.mapel_fokus_id, 'fisika', 'B menimpa sesi A');
  assert.equal(s.jumlah_kartu_direncanakan, 3);
  assert.equal(s.jumlah_dijawab, 1, 'riwayat B ikut terhitung di sesi A');
  assert.equal(s.jumlah_benar, 1);
  assert.equal((await daftarSesi(a)).some((x) => x.id === sesiB.id), false, 'sesi B bocor ke GET A');
});
