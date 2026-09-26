// Bantuan bersama untuk tests/*.test.js. Uji ini adalah uji INTEGRASI —
// butuh MySQL nyata (bukan mock) sesuai server/.env, dengan migrasi §3.6
// sudah dijalankan. Lihat server/README.md bagian "Menjalankan test".

const app = require('../src/app');
const pool = require('../src/db/koneksi');

function acak() {
  return Math.random().toString(36).slice(2, 10);
}

async function nyalakanServer() {
  return new Promise((resolve) => {
    const server = app.listen(0, () => resolve(server));
  });
}

function urlDari(server) {
  const { port } = server.address();
  return `http://127.0.0.1:${port}`;
}

async function daftarPenggunaBaru(baseUrl, override) {
  const namaPengguna = `uji_${acak()}`;
  const body = Object.assign(
    { nama_pengguna: namaPengguna, kata_sandi: 'sandiujiaman1' },
    override || {}
  );
  const res = await fetch(`${baseUrl}/api/v1/auth/daftar`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  return { status: res.status, json, namaPengguna, kataSandi: body.kata_sandi };
}

module.exports = { acak, nyalakanServer, urlDari, daftarPenggunaBaru, pool };
