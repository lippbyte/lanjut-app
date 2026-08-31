// Repositori tabel `pengguna`. SATU-SATUNYA tempat SQL untuk tabel ini.
// docs/SDD-Backend-Foundation.md §8.1: dua fungsi terpisah untuk mengambil
// data — cariUntukMasuk() (memuat hash, HANYA dipanggil layanan auth) dan
// cariProfil() (TIDAK PERNAH memuat hash) — supaya kebocoran hash tidak bisa
// terjadi karena lupa menghapus satu kolom di suatu tempat.

const pool = require('../../db/koneksi');

/** HANYA dipakai layanan auth untuk memverifikasi kata sandi saat login. */
async function cariUntukMasuk(namaPengguna) {
  const [baris] = await pool.execute(
    `SELECT id, nama_pengguna, kata_sandi_hash, peran, status
       FROM pengguna
      WHERE nama_pengguna = ?
      LIMIT 1`,
    [namaPengguna]
  );
  return baris[0] || null;
}

/** Profil publik pengguna berjalan — TIDAK PERNAH memuat kata_sandi_hash. */
async function cariProfil(penggunaId) {
  const [baris] = await pool.execute(
    `SELECT id, nama_pengguna, nama_tampilan, email, peran, status,
            kelas, prodi_tujuan, dibuat_pada, terakhir_masuk_pada
       FROM pengguna
      WHERE id = ?
      LIMIT 1`,
    [penggunaId]
  );
  return baris[0] || null;
}

async function cekNamaPenggunaDipakai(namaPengguna) {
  const [baris] = await pool.execute(
    'SELECT id FROM pengguna WHERE nama_pengguna = ? LIMIT 1',
    [namaPengguna]
  );
  return baris.length > 0;
}

/** C-3: cek email sebelum INSERT, supaya pelanggaran uq_pengguna_email tidak
 * bocor sebagai 500 — email opsional, jadi hanya dicek bila diisi. */
async function emailSudahAda(email) {
  const [baris] = await pool.execute('SELECT id FROM pengguna WHERE email = ? LIMIT 1', [email]);
  return baris.length > 0;
}

async function buatPengguna({
  id,
  namaPengguna,
  namaTampilan,
  email,
  kataSandiHash,
  kelas,
  prodiTujuan,
  dibuatPada,
}) {
  await pool.execute(
    `INSERT INTO pengguna
       (id, nama_pengguna, nama_tampilan, email, kata_sandi_hash, peran, status,
        kelas, prodi_tujuan, dibuat_pada)
     VALUES (?, ?, ?, ?, ?, 'siswa', 'aktif', ?, ?, ?)`,
    [
      id,
      namaPengguna,
      namaTampilan || null,
      email || null,
      kataSandiHash,
      kelas || null,
      prodiTujuan || null,
      dibuatPada,
    ]
  );
}

async function tandaiTerakhirMasuk(penggunaId, waktu) {
  await pool.execute('UPDATE pengguna SET terakhir_masuk_pada = ? WHERE id = ?', [
    waktu,
    penggunaId,
  ]);
}

async function updateKataSandiHash(penggunaId, kataSandiHashBaru) {
  await pool.execute('UPDATE pengguna SET kata_sandi_hash = ? WHERE id = ?', [
    kataSandiHashBaru,
    penggunaId,
  ]);
}

/**
 * PATCH /pengguna/saya — hanya kelas, prodi_tujuan, nama_tampilan (§4.3).
 * SQL statis: medan yang tidak dikirim (`undefined`) memakai flag CASE WHEN
 * supaya tidak perlu merakit klausa SET secara dinamis (§2.2 aturan 2).
 */
async function updateProfil(penggunaId, { kelas, prodiTujuan, namaTampilan }) {
  const ubahKelas = kelas !== undefined;
  const ubahProdi = prodiTujuan !== undefined;
  const ubahNama = namaTampilan !== undefined;
  if (!ubahKelas && !ubahProdi && !ubahNama) return;

  await pool.execute(
    `UPDATE pengguna
        SET kelas = CASE WHEN ? THEN ? ELSE kelas END,
            prodi_tujuan = CASE WHEN ? THEN ? ELSE prodi_tujuan END,
            nama_tampilan = CASE WHEN ? THEN ? ELSE nama_tampilan END
      WHERE id = ?`,
    [
      ubahKelas, kelas || null,
      ubahProdi, prodiTujuan || null,
      ubahNama, namaTampilan || null,
      penggunaId,
    ]
  );
}

module.exports = {
  cariUntukMasuk,
  cariProfil,
  cekNamaPenggunaDipakai,
  emailSudahAda,
  buatPengguna,
  tandaiTerakhirMasuk,
  updateKataSandiHash,
  updateProfil,
};
