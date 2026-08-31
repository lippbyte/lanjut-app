// Repositori Level-In (`sesi_latihan`, `riwayat_latihan`, `konfigurasi_levelin`).
// SATU-SATUNYA tempat SQL untuk tabel ini. Skema dari docs/SDD-LevelIn.md §3.2,
// dipakai apa adanya (docs/SDD-Backend-Foundation.md §3.5).
// Setiap query atas data milik pengguna WAJIB memfilter pengguna_id (§8.4).
// TIDAK ADA satu pun query di sini yang menyentuh tabel `kartu` untuk MENULIS
// (§4.6 aturan 3, §8.4 no. 4) — hanya baca, untuk validasi keberadaan.

const pool = require('../../db/koneksi');

/** Idempoten berdasarkan id buatan klien (§4.1, §4.6 aturan 1). */
async function buatSesiLatihan({
  id,
  penggunaId,
  dimulaiPada,
  jumlahKartuDirencanakan,
  mapelFokusId,
  asalMula,
}) {
  await pool.execute(
    `INSERT INTO sesi_latihan
       (id, pengguna_id, dimulai_pada, jumlah_kartu_direncanakan, mapel_fokus_id, asal_mula)
     VALUES (?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE id = id`,
    [id, penggunaId, dimulaiPada, jumlahKartuDirencanakan, mapelFokusId || null, asalMula]
  );
}

/** WHERE id = ? AND pengguna_id = ? (§8.4) — sesi yang tidak pernah ditutup SAH. */
async function tutupSesiLatihan(penggunaId, sesiId, selesaiPada) {
  const [hasil] = await pool.execute(
    `UPDATE sesi_latihan SET selesai_pada = ? WHERE id = ? AND pengguna_id = ?`,
    [selesaiPada, sesiId, penggunaId]
  );
  return hasil.affectedRows > 0;
}

/** Idempoten per id. Menerima keyakinan: null (§4.6 aturan). */
async function simpanSatuRiwayat(penggunaId, catatan) {
  await pool.execute(
    `INSERT INTO riwayat_latihan
       (id, pengguna_id, kartu_id, benar, dijawab_pada, sesi_id, keyakinan,
        mapel_id, gap_numerik, kelas_gap, aturan_versi)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
     ON DUPLICATE KEY UPDATE id = id`,
    [
      catatan.id,
      penggunaId,
      catatan.kartuId || null,
      catatan.benar ? 1 : 0,
      catatan.dijawabPada,
      catatan.sesiId || null,
      catatan.keyakinan === undefined ? null : catatan.keyakinan,
      catatan.mapelId || null,
      catatan.gapNumerik === undefined ? null : catatan.gapNumerik,
      catatan.kelasGap || null,
      catatan.aturanVersi === undefined ? null : catatan.aturanVersi,
    ]
  );
}

/** Jendela N catatan terbaru per mapel, milik pengguna, dengan keyakinan terisi (K4). */
async function ambilRiwayatUntukAgregasi(penggunaId, jendelaPerMapel) {
  const [baris] = await pool.execute(
    `SELECT pengguna_id, mapel_id, keyakinan, benar, kelas_gap, dijawab_pada
       FROM (
         SELECT r.*, ROW_NUMBER() OVER (
                  PARTITION BY r.mapel_id ORDER BY r.dijawab_pada DESC
                ) AS urutan
           FROM riwayat_latihan r
          WHERE r.pengguna_id = ? AND r.mapel_id IS NOT NULL AND r.keyakinan IS NOT NULL
       ) t
      WHERE t.urutan <= ?`,
    [penggunaId, jendelaPerMapel]
  );
  return baris;
}

/** Semua mapel_id yang pernah dicatat pengguna (termasuk tanpa keyakinan),
 * dipakai supaya mapel dengan 0 kartu dikerjakan tetap muncul (AC FL3). */
async function ambilMapelDenganRiwayat(penggunaId) {
  const [baris] = await pool.execute(
    `SELECT DISTINCT mapel_id FROM riwayat_latihan
      WHERE pengguna_id = ? AND mapel_id IS NOT NULL`,
    [penggunaId]
  );
  return baris.map((b) => b.mapel_id);
}

async function adaRiwayatSamaSekali(penggunaId) {
  const [baris] = await pool.execute(
    'SELECT id FROM riwayat_latihan WHERE pengguna_id = ? LIMIT 1',
    [penggunaId]
  );
  return baris.length > 0;
}

/** Ketersediaan kartu per mapel (resmi + milik sendiri, belum dihapus) —
 * dipakai saranHarian() untuk memastikan CTA tidak mengarah ke mapel kosong. */
async function ambilKetersediaanKartuPerMapel(penggunaId) {
  const [baris] = await pool.execute(
    `SELECT mapel_id, COUNT(*) AS jumlah
       FROM kartu
      WHERE dihapus_pada IS NULL AND (sumber = 'resmi' OR pemilik_id = ?)
      GROUP BY mapel_id`,
    [penggunaId]
  );
  return baris;
}

async function ambilSemuaKonfigurasi() {
  const [baris] = await pool.query(
    'SELECT kunci, nilai, versi, dasar, diubah_pada FROM konfigurasi_levelin'
  );
  return baris;
}

module.exports = {
  buatSesiLatihan,
  tutupSesiLatihan,
  simpanSatuRiwayat,
  ambilRiwayatUntukAgregasi,
  ambilMapelDenganRiwayat,
  adaRiwayatSamaSekali,
  ambilKetersediaanKartuPerMapel,
  ambilSemuaKonfigurasi,
};
