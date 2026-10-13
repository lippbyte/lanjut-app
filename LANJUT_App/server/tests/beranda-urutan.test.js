// tests/beranda-urutan.test.js
// Pengujian otomatis LANJUT_072 — sapaan dan urutan Beranda. Menjalankan
// lib/beranda.ts milik app langsung (muat-ts-app.js), jadi yang diuji adalah
// aturan yang dipakai LinimasaScreen:
// - teksSapaan: nama tampilan → nama pengguna → "Halo" saja
// - urutanBeranda: sapaan paling atas, Info Penting sesudah grid dan
//   "Mulai dari Sini", tidak ada bagian yang hilang atau ganda
// - sapaan tercatat DRAF di salinan-teks-lanjut.md
// - lintas akun: sapaan tiap akun memakai nama akunnya sendiri

const { test, describe, before, after } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { nyalakanServer, urlDari, daftarPenggunaBaru, pool } = require('./bantuan');
const { muatModulApp } = require('./muat-ts-app');

const { teksSapaan, urutanBeranda } = muatModulApp('lib/beranda');

describe('LANJUT_072: teks sapaan', () => {
  test('Memakai nama tampilan', () => {
    assert.equal(teksSapaan({ nama_tampilan: 'Budi Santoso', nama_pengguna: 'budi.smk12' }), 'Halo, Budi Santoso');
  });

  test('Nama tampilan kosong → nama pengguna', () => {
    for (const nama_tampilan of [null, undefined, '', '   ']) {
      assert.equal(teksSapaan({ nama_tampilan, nama_pengguna: 'budi.smk12' }), 'Halo, budi.smk12', JSON.stringify(nama_tampilan));
    }
  });

  test('Keduanya kosong → "Halo" saja, tanpa koma', () => {
    assert.equal(teksSapaan({ nama_tampilan: '', nama_pengguna: '' }), 'Halo');
    assert.equal(teksSapaan({ nama_tampilan: ' ', nama_pengguna: null }), 'Halo');
    assert.equal(teksSapaan({}), 'Halo');
    assert.equal(teksSapaan(null), 'Halo');
    assert.equal(teksSapaan(undefined), 'Halo');
  });

  test('Spasi di tepi nama dibuang', () => {
    assert.equal(teksSapaan({ nama_tampilan: '  Sari  ' }), 'Halo, Sari');
  });

  test('Sapaan tercatat DRAF di salinan-teks-lanjut.md', () => {
    const sumber = fs.readFileSync(path.join(__dirname, '..', '..', '..', 'docs', 'salinan-teks-lanjut.md'), 'utf8');
    const awal = sumber.indexOf('**LANJUT_App (LANJUT_072)');
    assert.ok(awal >= 0, 'blok LANJUT_072 harus ada');
    const blok = sumber.slice(awal, sumber.indexOf('\n### ', awal));
    assert.match(blok.slice(0, blok.indexOf('\n\n')), /\bDRAF\b/);
    assert.ok(blok.includes('- **Sapaan:** Halo, [nama tampilan]'));
    assert.ok(blok.includes('Halo, [nama pengguna]'));
  });
});

describe('LANJUT_072: urutan Beranda', () => {
  const SEMUA_KELAS = ['7', '8', '9', '10', '11', '12', null];

  test('Sapaan selalu di indeks pertama', () => {
    for (const kelas of SEMUA_KELAS) {
      for (const tampilMulaiDariSini of [true, false]) {
        assert.equal(urutanBeranda({ kelas, tampilMulaiDariSini })[0], 'sapaan', `kelas ${kelas}`);
      }
    }
  });

  test('Kelas 12: Info Penting sesudah grid dan sesudah "Mulai dari Sini"; tenggat menempel di atasnya', () => {
    const u = urutanBeranda({ kelas: '12', tampilMulaiDariSini: true });
    assert.deepEqual(u, ['sapaan', 'judul', 'progres', 'grid', 'mulai_dari_sini', 'tenggat', 'info_penting']);
    assert.ok(u.indexOf('info_penting') > u.indexOf('grid'));
    assert.ok(u.indexOf('info_penting') > u.indexOf('mulai_dari_sini'));
    assert.ok(u.indexOf('mulai_dari_sini') > u.indexOf('grid'));
    assert.equal(u.indexOf('tenggat') + 1, u.indexOf('info_penting'));
  });

  test('Baris progres tepat di atas grid (LANJUT_065), judul tepat di bawah sapaan', () => {
    for (const kelas of SEMUA_KELAS) {
      const u = urutanBeranda({ kelas, tampilMulaiDariSini: true });
      assert.equal(u.indexOf('progres') + 1, u.indexOf('grid'), `kelas ${kelas}`);
      assert.equal(u.indexOf('judul'), 1, `kelas ${kelas}`);
    }
  });

  test('Kelas 12 tanpa "Mulai dari Sini": Info Penting tetap sesudah grid', () => {
    const u = urutanBeranda({ kelas: '12', tampilMulaiDariSini: false });
    assert.deepEqual(u, ['sapaan', 'judul', 'progres', 'grid', 'tenggat', 'info_penting']);
  });

  test('Bukan kelas 12: tanpa tenggat dan Info Penting', () => {
    for (const kelas of ['7', '8', '9', '10', '11', null]) {
      assert.deepEqual(urutanBeranda({ kelas, tampilMulaiDariSini: true }), ['sapaan', 'judul', 'progres', 'grid', 'mulai_dari_sini']);
      assert.deepEqual(urutanBeranda({ kelas, tampilMulaiDariSini: false }), ['sapaan', 'judul', 'progres', 'grid']);
    }
  });

  test('Tidak ada bagian yang hilang atau ganda', () => {
    for (const kelas of SEMUA_KELAS) {
      for (const tampilMulaiDariSini of [true, false]) {
        const u = urutanBeranda({ kelas, tampilMulaiDariSini });
        assert.equal(new Set(u).size, u.length, `ganda: ${u}`);
        for (const wajib of ['sapaan', 'judul', 'progres', 'grid']) assert.ok(u.includes(wajib), `${wajib} hilang (kelas ${kelas})`);
        assert.equal(u.includes('mulai_dari_sini'), tampilMulaiDariSini);
      }
    }
  });
});

describe('LANJUT_072: lintas akun', () => {
  let server;
  let baseUrl;

  before(async () => {
    server = await nyalakanServer();
    baseUrl = urlDari(server);
  });

  after(async () => {
    await new Promise((resolve) => server.close(resolve));
    await pool.end();
  });

  async function profil(token) {
    const res = await fetch(`${baseUrl}/api/v1/auth/saya`, { headers: { Authorization: `Bearer ${token}` } });
    assert.equal(res.status, 200);
    return (await res.json()).data;
  }

  test('Sapaan tiap akun memakai nama akunnya sendiri', async () => {
    const a = await daftarPenggunaBaru(baseUrl, { kelas: '12', jenis_sekolah: 'SMA', nama_tampilan: 'Akun Satu' });
    const b = await daftarPenggunaBaru(baseUrl, { kelas: '7', nama_tampilan: 'Akun Dua' });
    assert.equal(a.status, 201);
    assert.equal(b.status, 201);
    assert.equal(teksSapaan(await profil(a.json.data.token)), 'Halo, Akun Satu');
    assert.equal(teksSapaan(await profil(b.json.data.token)), 'Halo, Akun Dua');

    // Tanpa nama_tampilan saat daftar: sapaan tetap memakai nama yang ada di akun itu sendiri.
    const c = await daftarPenggunaBaru(baseUrl, { kelas: '10', jenis_sekolah: 'SMA' });
    const pc = await profil(c.json.data.token);
    assert.equal(teksSapaan(pc), `Halo, ${pc.nama_tampilan || pc.nama_pengguna}`);
    assert.ok(teksSapaan(pc).includes(c.namaPengguna) || teksSapaan(pc).includes(pc.nama_tampilan));
  });
});
