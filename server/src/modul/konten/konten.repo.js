// Repositori konten publik hanya-baca (F1–F5). SATU-SATUNYA tempat SQL untuk
// tabel-tabel ini. docs/SDD-Backend-Foundation.md §4.4.
// Tabel-tabel di sini adalah konten kurasi tim (bukan data pribadi), jadi
// TIDAK memfilter pengguna_id/pemilik_id — itu memang tidak relevan di sini.

const pool = require('../../db/koneksi');

async function ambilLinimasa() {
  const [baris] = await pool.query(
    `SELECT id, judul, tanggal_mulai, tanggal_selesai, jalur,
            sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada
       FROM tahapan_linimasa
      ORDER BY tanggal_mulai ASC`
  );
  return baris;
}

async function ambilKhususSmk() {
  const [baris] = await pool.query(
    `SELECT id, judul, apa_yang_beda, apa_yang_bisa_dilakukan, urutan,
            sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada
       FROM butir_khusus_smk
      ORDER BY urutan ASC, id ASC`
  );
  return baris;
}

async function ambilProdi() {
  const [baris] = await pool.query(
    `SELECT id, nama, rumpun,
            sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada
       FROM prodi
      ORDER BY nama ASC`
  );
  return baris;
}

async function ambilMapel() {
  const [baris] = await pool.query(
    `SELECT id, nama, tersedia_di_smk,
            sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada
       FROM mapel
      ORDER BY nama ASC`
  );
  return baris;
}

async function ambilMapelUntukProdi(prodiId) {
  const [baris] = await pool.execute(
    `SELECT m.id, m.nama, m.tersedia_di_smk, pm.bobot
       FROM prodi_mapel pm
       JOIN mapel m ON m.id = pm.mapel_id
      WHERE pm.prodi_id = ?
      ORDER BY pm.bobot DESC, m.nama ASC`,
    [prodiId]
  );
  return baris;
}

/**
 * F3 — jalur "belum tahu prodi": per mapel, berapa banyak prodi yang
 * membutuhkannya (COUNT DISTINCT prodi_id lewat JOIN + GROUP BY mapel_id).
 * SATU query, bukan diagregasi di klien lewat panggilan `/prodi/:id/mapel`
 * berulang — lihat mobile-app/hooks/useAgregasiMapelLintasProdi.ts.
 * INNER JOIN sengaja dipakai (bukan LEFT JOIN): mapel yang tidak menjadi
 * syarat mapel_id di baris manapun otomatis tidak ikut, sama seperti
 * perilaku agregasi lama yang hanya melihat mapel yang benar-benar muncul
 * di hasil `/prodi/:id/mapel`.
 */
async function ambilAgregasiMapelLintasProdi() {
  const [baris] = await pool.query(
    `SELECT m.id, m.nama, m.tersedia_di_smk, COUNT(DISTINCT pm.prodi_id) AS jumlah_prodi
       FROM mapel m
       JOIN prodi_mapel pm ON pm.mapel_id = m.id
      GROUP BY m.id, m.nama, m.tersedia_di_smk
      ORDER BY jumlah_prodi DESC, m.nama ASC`
  );
  return baris;
}

async function prodiAda(prodiId) {
  const [baris] = await pool.execute('SELECT id FROM prodi WHERE id = ? LIMIT 1', [prodiId]);
  return baris.length > 0;
}

/** F4 — WAJIB menyaring izin_tayang=1 AND tayang=1 (§4.4). Disaring di sini,
 * bukan di rute, supaya tidak bisa terlewat. */
async function ambilCeritaAlumniTayang() {
  const [baris] = await pool.query(
    `SELECT id, nama, asal_smk, jurusan_smk, ptn, prodi, jalur, hambatan, yang_dilakukan,
            sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada
       FROM cerita_alumni
      WHERE izin_tayang = 1 AND tayang = 1
      ORDER BY id ASC`
  );
  return baris;
}

/**
 * F5 — checklist, dikelompokkan per kategori, dapat disaring ?kelas=&jalur=.
 * SQL statis: filter opsional ditulis `(? IS NULL OR FIND_IN_SET(...) > 0)`,
 * bukan merakit klausa WHERE secara dinamis (§2.2 aturan 2).
 */
async function ambilChecklist({ kelas, jalur }) {
  const [baris] = await pool.execute(
    `SELECT b.id, b.judul, b.urutan, b.berlaku_untuk_kelas, b.berlaku_untuk_jalur,
            b.sumber, b.pemilik, b.status_verifikasi, b.asal, b.url_sumber, b.diperiksa_pada,
            k.id AS kategori_id, k.nama AS kategori_nama, k.urutan AS kategori_urutan
       FROM butir_daftar_periksa b
       JOIN kategori_checklist k ON k.id = b.kategori_id
      WHERE (? IS NULL OR FIND_IN_SET(?, b.berlaku_untuk_kelas) > 0)
        AND (? IS NULL OR FIND_IN_SET(?, b.berlaku_untuk_jalur) > 0)
      ORDER BY k.urutan ASC, b.urutan ASC`,
    [kelas || null, kelas || null, jalur || null, jalur || null]
  );
  return baris;
}

module.exports = {
  ambilLinimasa,
  ambilKhususSmk,
  ambilProdi,
  ambilMapel,
  ambilMapelUntukProdi,
  ambilAgregasiMapelLintasProdi,
  prodiAda,
  ambilCeritaAlumniTayang,
  ambilChecklist,
};
