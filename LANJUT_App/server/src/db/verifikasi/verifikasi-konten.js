// Verifikasi konten (LANJUT_010): menandai baris konten sudah dicek ke
// sumber resmi, tanpa menulis SQL. Hanya dua kolom yang pernah disentuh:
// `status_verifikasi` dan `diperiksa_pada`. Tidak ada INSERT/DELETE, dan
// isi konten (judul, tanggal, teks) tidak pernah diubah.
//
// Skrip ini hanya ALAT. Keputusan baris mana yang boleh ditandai tetap di
// tim konten, berdasar sumber resmi.
//
// `pemilik` sengaja TIDAK diubah: kolom itu berarti siapa yang mengkurasi
// ("tim" atau nama mitra, docs/SDD-Backend-Foundation.md §3.4), bukan siapa
// yang memverifikasi. Nama verifikator (`--oleh`) dicatat ke berkas log.
//
// Pemakaian (dari folder LANJUT_App/server):
//   npm run verifikasi-konten -- --list [--jenis=linimasa]
//   npm run verifikasi-konten -- --jenis=linimasa --id=snbp-daftar --oleh="Nama"
//   npm run verifikasi-konten -- --jenis=linimasa --id=a,b --tanggal=2026-09-27
//   npm run verifikasi-konten -- --jenis=linimasa --id=snbp-daftar --batal

const fs = require('fs');
const path = require('path');
const pool = require('../koneksi');
const { sekarangIso } = require('../../util/waktu');

// Daftar tetap jenis → tabel. Nama tabel/kolom HANYA diambil dari sini,
// tidak pernah dari masukan pengguna. `kartu` sengaja tidak ada: berisi
// kartu buatan pengguna, dan Latihan belum dipakai aplikasi.
const JENIS = {
  linimasa: { tabel: 'tahapan_linimasa', judul: 'judul', label: 'Linimasa (Beranda)' },
  'khusus-smk': { tabel: 'butir_khusus_smk', judul: 'judul', label: 'Khusus SMK' },
  checklist: { tabel: 'butir_daftar_periksa', judul: 'judul', label: 'Daftar Periksa' },
  prodi: { tabel: 'prodi', judul: 'nama', label: 'Prodi' },
  mapel: { tabel: 'mapel', judul: 'nama', label: 'Mapel' },
  'cerita-alumni': { tabel: 'cerita_alumni', judul: 'nama', label: 'Cerita Alumni' },
};

const BERKAS_LOG = path.join(__dirname, '..', '..', '..', 'verifikasi-konten.log');

class GalatPakai extends Error {}

function ambilJenis(jenis) {
  const j = JENIS[jenis];
  if (!j) {
    throw new GalatPakai(`Jenis "${jenis ?? ''}" tidak dikenal. Pilihan: ${Object.keys(JENIS).join(', ')}.`);
  }
  return j;
}

/** "YYYY-MM-DD" yang benar-benar ada di kalender, atau galat. */
function periksaTanggal(tanggal) {
  const cocok = /^\d{4}-\d{2}-\d{2}$/.test(tanggal) && new Date(`${tanggal}T00:00:00Z`).toISOString().startsWith(tanggal);
  if (!cocok) throw new GalatPakai(`Tanggal "${tanggal}" tidak valid. Pakai format TAHUN-BULAN-TANGGAL, mis. 2026-09-27.`);
  return tanggal;
}

/** Baris yang belum terverifikasi, per jenis (semua jenis kalau `jenis` kosong). */
async function daftarBelum(jenis) {
  const semua = jenis ? [jenis] : Object.keys(JENIS);
  const hasil = [];
  for (const nama of semua) {
    const j = ambilJenis(nama);
    const [baris] = await pool.query(
      `SELECT id, ?? AS judul, asal, status_verifikasi, diperiksa_pada
         FROM ??
        WHERE status_verifikasi <> 'terverifikasi' OR diperiksa_pada IS NULL
        ORDER BY id`,
      [j.judul, j.tabel]
    );
    hasil.push({ jenis: nama, label: j.label, baris });
  }
  return hasil;
}

/**
 * Tandai (atau batalkan) verifikasi. Semua ID diperiksa dulu di dalam satu
 * transaksi; kalau ada satu saja yang tidak ditemukan, TIDAK ADA yang diubah.
 */
async function ubahStatus({ jenis, ids, tanggal, batal }) {
  const j = ambilJenis(jenis);
  const daftarId = [...new Set(ids.map((i) => i.trim()).filter(Boolean))];
  if (!daftarId.length) throw new GalatPakai('ID belum diisi. Contoh: --id=snbp-daftar');

  const koneksi = await pool.getConnection();
  try {
    await koneksi.beginTransaction();
    const [ada] = await koneksi.query(
      'SELECT id, ?? AS judul, status_verifikasi, diperiksa_pada FROM ?? WHERE id IN (?) FOR UPDATE',
      [j.judul, j.tabel, daftarId]
    );
    const ditemukan = new Set(ada.map((b) => b.id));
    const hilang = daftarId.filter((id) => !ditemukan.has(id));
    if (hilang.length) {
      throw new GalatPakai(
        `ID tidak ditemukan di ${j.label}: ${hilang.join(', ')}. Tidak ada yang diubah. ` +
          `Lihat ID yang benar dengan: npm run verifikasi-konten -- --list --jenis=${jenis}`
      );
    }

    if (batal) {
      await koneksi.query(
        "UPDATE ?? SET status_verifikasi = 'belum_diverifikasi', diperiksa_pada = NULL WHERE id IN (?)",
        [j.tabel, daftarId]
      );
    } else {
      await koneksi.query(
        "UPDATE ?? SET status_verifikasi = 'terverifikasi', diperiksa_pada = ? WHERE id IN (?)",
        [j.tabel, tanggal, daftarId]
      );
    }
    await koneksi.commit();
    return ada;
  } catch (galat) {
    await koneksi.rollback();
    throw galat;
  } finally {
    koneksi.release();
  }
}

function catatLog(baris) {
  try {
    fs.appendFileSync(BERKAS_LOG, baris + '\n', 'utf8');
  } catch (galat) {
    console.warn(`[verifikasi] catatan log gagal ditulis (${galat.message}); perubahan di basis data tetap tersimpan.`);
  }
}

const OPSI = ['list', 'jenis', 'id', 'oleh', 'tanggal', 'batal'];

function bacaArgumen(argv) {
  const arg = {};
  for (const a of argv) {
    const m = /^--([a-z]+)(?:=(.*))?$/.exec(a);
    if (!m || !OPSI.includes(m[1])) {
      throw new GalatPakai(`Argumen "${a}" tidak dikenal. Pilihan: ${OPSI.map((o) => '--' + o).join(', ')}.`);
    }
    arg[m[1]] = m[2] === undefined ? true : m[2];
  }
  return arg;
}

function formatTanggal(nilai) {
  if (!nilai) return '-';
  return nilai instanceof Date ? nilai.toISOString().slice(0, 10) : String(nilai).slice(0, 10);
}

async function cetakDaftar(jenis) {
  const kelompok = await daftarBelum(jenis);
  let total = 0;
  for (const k of kelompok) {
    console.log(`\n== ${k.label}  (--jenis=${k.jenis})  ${k.baris.length} belum terverifikasi`);
    for (const b of k.baris) console.log(`   ${b.id.padEnd(28)} ${b.judul}  [asal: ${b.asal}]`);
    total += k.baris.length;
  }
  console.log(`\nTotal ${total} baris belum terverifikasi.`);
}

async function jalankan(argv) {
  const arg = bacaArgumen(argv);

  if (arg.list) return cetakDaftar(typeof arg.jenis === 'string' ? arg.jenis : undefined);

  if (typeof arg.jenis !== 'string') throw new GalatPakai('Isi --jenis, atau pakai --list untuk melihat daftarnya.');
  if (typeof arg.id !== 'string') throw new GalatPakai('Isi --id (boleh beberapa, dipisah koma).');
  const oleh = typeof arg.oleh === 'string' && arg.oleh.trim() ? arg.oleh.trim() : '(tidak diisi)';
  const batal = arg.batal === true;
  const tanggal = batal ? null : periksaTanggal(typeof arg.tanggal === 'string' ? arg.tanggal : sekarangIso().slice(0, 10));

  const sebelum = await ubahStatus({ jenis: arg.jenis, ids: arg.id.split(','), tanggal, batal });

  const aksi = batal ? 'DIBATALKAN' : `TERVERIFIKASI (dicek ${tanggal})`;
  for (const b of sebelum) {
    const lama = b.status_verifikasi === 'terverifikasi' ? ` — sebelumnya sudah terverifikasi, dicek ${formatTanggal(b.diperiksa_pada)}` : '';
    console.log(`[verifikasi] ${arg.jenis}/${b.id} "${b.judul}" → ${aksi}${lama}`);
  }
  catatLog(`${sekarangIso()}\t${batal ? 'batal' : 'tandai'}\t${arg.jenis}\t${sebelum.map((b) => b.id).join(',')}\t${tanggal ?? '-'}\t${oleh}`);
}

if (require.main === module) {
  jalankan(process.argv.slice(2))
    .then(() => pool.end())
    .then(() => process.exit(0))
    .catch(async (galat) => {
      console.error(galat instanceof GalatPakai ? `[verifikasi] ${galat.message}` : `[verifikasi] GAGAL: ${galat.message}`);
      await pool.end().catch(() => {});
      process.exit(1);
    });
}

module.exports = { JENIS, daftarBelum, ubahStatus, GalatPakai };
