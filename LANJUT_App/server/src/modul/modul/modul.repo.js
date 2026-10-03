// Repositori `modul` & `potongan_modul` (LANJUT_049). SATU-SATUNYA tempat SQL
// untuk kedua tabel. Tabel pribadi: setiap query memfilter pengguna_id
// (B-K4, §8.4) — id modul orang lain selalu jadi "tidak ditemukan".
//
// Hapus = hapus PERMANEN (baris modul + potongannya), bukan hapus lunak.

const pool = require('../../db/koneksi');

const KUNCI_KONFIG = ['modul_ukuran_maks_byte', 'modul_karakter_maks', 'modul_jumlah_maks'];

async function ambilKonfigurasi() {
  const [baris] = await pool.query('SELECT kunci, nilai FROM konfigurasi_levelin WHERE kunci IN (?)', [KUNCI_KONFIG]);
  return baris;
}

async function mapelAda(mapelId) {
  const [baris] = await pool.execute('SELECT id FROM mapel WHERE id = ? LIMIT 1', [mapelId]);
  return baris.length > 0;
}

async function jumlahMilik(penggunaId) {
  const [[b]] = await pool.execute('SELECT COUNT(*) AS n FROM modul WHERE pengguna_id = ?', [penggunaId]);
  return Number(b.n);
}

/**
 * Simpan modul + potongannya dalam satu transaksi. Batas jumlah dicek ULANG
 * di dalam transaksi dengan baris pengguna dikunci (FOR UPDATE), supaya dua
 * unggahan bersamaan tidak bisa melewati batas. Mengembalikan false bila
 * batas sudah tercapai (tidak ada yang ditulis).
 */
async function simpanDenganBatas({ id, penggunaId, mapelId, judul, isi, jumlahKarakter, jenis, namaBerkas, waktu, potongan }, batasJumlah) {
  const koneksi = await pool.getConnection();
  try {
    await koneksi.beginTransaction();
    await koneksi.query('SELECT id FROM pengguna WHERE id = ? FOR UPDATE', [penggunaId]);
    const [[b]] = await koneksi.query('SELECT COUNT(*) AS n FROM modul WHERE pengguna_id = ?', [penggunaId]);
    if (Number(b.n) >= batasJumlah) {
      await koneksi.rollback();
      return false;
    }
    await koneksi.query(
      `INSERT INTO modul (id, pengguna_id, mapel_id, judul, isi, jumlah_karakter, jenis, nama_berkas, diunggah_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, penggunaId, mapelId, judul, isi, jumlahKarakter, jenis, namaBerkas, waktu]
    );
    if (potongan.length) {
      await koneksi.query('INSERT INTO potongan_modul (modul_id, pengguna_id, urutan, isi) VALUES ?', [
        potongan.map((p, i) => [id, penggunaId, i, p]),
      ]);
    }
    await koneksi.commit();
    return true;
  } catch (galat) {
    await koneksi.rollback();
    throw galat;
  } finally {
    koneksi.release();
  }
}

/** Daftar modul milik sendiri, TANPA isi. */
async function daftarMilik(penggunaId) {
  const [baris] = await pool.execute(
    `SELECT id, mapel_id, judul, jumlah_karakter, jenis, nama_berkas, diunggah_pada
       FROM modul
      WHERE pengguna_id = ?
      ORDER BY diunggah_pada DESC, id`,
    [penggunaId]
  );
  return baris;
}

async function ambilMilik(penggunaId, id) {
  const [baris] = await pool.execute(
    `SELECT id, mapel_id, judul, isi, jumlah_karakter, jenis, nama_berkas, diunggah_pada
       FROM modul
      WHERE id = ? AND pengguna_id = ?
      LIMIT 1`,
    [id, penggunaId]
  );
  return baris[0] || null;
}

/**
 * Cari potongan di modul SENDIRI dengan FULLTEXT MySQL (mode bahasa alami,
 * urut skor). Filter pemilik ada di tabel potongan DAN modul.
 */
async function cariMilik(penggunaId, q, batas) {
  const [baris] = await pool.query(
    `SELECT p.modul_id, m.judul, m.mapel_id, p.urutan, p.isi,
            MATCH(p.isi) AGAINST (? IN NATURAL LANGUAGE MODE) AS skor
       FROM potongan_modul p
       JOIN modul m ON m.id = p.modul_id
      WHERE p.pengguna_id = ? AND m.pengguna_id = ?
        AND MATCH(p.isi) AGAINST (? IN NATURAL LANGUAGE MODE)
      ORDER BY skor DESC, p.modul_id, p.urutan
      LIMIT ?`,
    [q, penggunaId, penggunaId, q, batas]
  );
  return baris;
}

/** Hapus permanen satu modul milik sendiri (potongan dihapus eksplisit, juga ikut CASCADE). */
async function hapusMilik(penggunaId, id) {
  const koneksi = await pool.getConnection();
  try {
    await koneksi.beginTransaction();
    await koneksi.query('DELETE FROM potongan_modul WHERE modul_id = ? AND pengguna_id = ?', [id, penggunaId]);
    const [hasil] = await koneksi.query('DELETE FROM modul WHERE id = ? AND pengguna_id = ?', [id, penggunaId]);
    await koneksi.commit();
    return hasil.affectedRows;
  } catch (galat) {
    await koneksi.rollback();
    throw galat;
  } finally {
    koneksi.release();
  }
}

/** Hapus permanen SEMUA modul milik sendiri. Mengembalikan jumlah modul yang dihapus. */
async function hapusSemuaMilik(penggunaId) {
  const koneksi = await pool.getConnection();
  try {
    await koneksi.beginTransaction();
    await koneksi.query('DELETE FROM potongan_modul WHERE pengguna_id = ?', [penggunaId]);
    const [hasil] = await koneksi.query('DELETE FROM modul WHERE pengguna_id = ?', [penggunaId]);
    await koneksi.commit();
    return hasil.affectedRows;
  } catch (galat) {
    await koneksi.rollback();
    throw galat;
  } finally {
    koneksi.release();
  }
}

/**
 * Indeks FULLTEXT InnoDB menyimpan kata dari baris yang sudah dihapus sampai
 * tabelnya dirapikan. OPTIMIZE TABLE membangun ulang indeks tanpa sisa itu,
 * supaya hapus permanen juga tidak meninggalkan kata modul di berkas indeks.
 * Pemeliharaan seluruh tabel, bukan query data satu akun.
 */
async function rapikanIndeks() {
  await pool.query('OPTIMIZE TABLE potongan_modul');
}

module.exports = {
  ambilKonfigurasi,
  mapelAda,
  jumlahMilik,
  simpanDenganBatas,
  daftarMilik,
  ambilMilik,
  cariMilik,
  hapusMilik,
  hapusSemuaMilik,
  rapikanIndeks,
};
