// Aturan Persiapan Event (LANJUT_076). Tidak ada SQL di sini — hanya repositori.
//
// Urutan pemeriksaan setiap permintaan (dijaga rute):
//   1. login (wajibLogin, 401)
//   2. saklar event_sekolah_aktif (403 FITUR_BELUM_AKTIF)
//   3. kebijakan privasi versi berlaku sudah diterima (403 AI_BELUM_DIIZINKAN,
//      gerbang yang sama dengan minat_rumpun LANJUT_075)
//   4. isi (skema zod, lalu batas tanggal / mapel / kartu di sini)
//
// Tidak ada log berisi materi_teks, tanggal, atau mapel_id: layanan ini tidak
// mencatat apa pun, dan log akses hanya memuat metode, jalur (id event), status.

const { GalatApi } = require('../../util/respons');
const { buatUuid } = require('../../util/id');
const { sekarangUntukDb, keIso, keTanggal } = require('../../util/waktu');
const { hariIniWib, uraiTanggal } = require('../../util/linimasa');
const persetujuanLayanan = require('../persetujuan/persetujuan.layanan');
const repo = require('./event-sekolah.repo');

/** Gerbang: saklar dulu, lalu kebijakan. Dipanggil sebelum isi permintaan dibaca. */
async function pastikanBoleh(penggunaId) {
  if (!(await repo.saklarAktif())) {
    throw new GalatApi('FITUR_BELUM_AKTIF', 'Fitur ini belum aktif.');
  }
  if (!(await persetujuanLayanan.kebijakanDiterima(penggunaId))) {
    throw new GalatApi('AI_BELUM_DIIZINKAN', 'Terima kebijakan privasi dulu supaya fitur ini bisa dipakai.');
  }
}

/** Tanggal event paling jauh: tanggal yang sama dua tahun sesudah hari ini (WIB). */
function batasTanggal(hariIniMs = hariIniWib()) {
  const d = new Date(hariIniMs);
  return Date.UTC(d.getUTCFullYear() + 2, d.getUTCMonth(), d.getUTCDate());
}

/** Isian yang bergantung pada data: tanggal ≤ batas, mapel ada, kartu milik sendiri. */
async function pastikanIsiSah(penggunaId, { tanggal, mapel_id, kartu_id }) {
  if (tanggal !== undefined && uraiTanggal(tanggal) > batasTanggal()) {
    throw new GalatApi('VALIDASI_GAGAL', 'Data yang dikirim tidak valid.', { tanggal: 'Tanggal paling jauh 2 tahun dari hari ini.' });
  }
  if (mapel_id && !(await repo.mapelAda(mapel_id))) {
    throw new GalatApi('VALIDASI_GAGAL', 'Data yang dikirim tidak valid.', { mapel_id: 'Mapel tidak dikenal.' });
  }
  if (kartu_id && !(await repo.kartuMilikSendiri(penggunaId, kartu_id))) {
    throw new GalatApi('KARTU_TIDAK_SAH', 'Kartu ini bukan kartu Arsip milikmu.', { kartu_id: 'bukan kartu milikmu' });
  }
}

function bentukEvent(b) {
  return {
    id: b.id,
    jenis: b.jenis,
    tanggal: keTanggal(b.tanggal),
    mapel_id: b.mapel_id ?? null,
    materi_teks: b.materi_teks ?? null,
    kartu_id: b.kartu_id ?? null,
    dibuat_pada: keIso(b.dibuat_pada),
    diubah_pada: keIso(b.diubah_pada),
  };
}

const tidakDitemukan = () => new GalatApi('TIDAK_DITEMUKAN', 'Event tidak ditemukan.');

async function daftar(penggunaId) {
  return (await repo.daftarMilikSendiri(penggunaId)).map(bentukEvent);
}

async function buat(penggunaId, isi) {
  await pastikanIsiSah(penggunaId, isi);
  const id = buatUuid();
  await repo.buat({
    id,
    penggunaId,
    jenis: isi.jenis,
    tanggal: isi.tanggal,
    mapelId: isi.mapel_id ?? null,
    materiTeks: isi.materi_teks ?? null,
    kartuId: isi.kartu_id ?? null,
    waktu: sekarangUntukDb(),
  });
  return bentukEvent(await repo.ambilMilikSendiri(penggunaId, id));
}

async function ubah(penggunaId, eventId, isi) {
  // Milik akun lain = 404 yang sama dengan id yang tidak ada, sebelum isi diperiksa.
  if (!(await repo.ambilMilikSendiri(penggunaId, eventId))) throw tidakDitemukan();
  await pastikanIsiSah(penggunaId, isi);
  const berubah = await repo.ubahMilikSendiri(
    penggunaId,
    eventId,
    { jenis: isi.jenis, tanggal: isi.tanggal, mapelId: isi.mapel_id, materiTeks: isi.materi_teks, kartuId: isi.kartu_id },
    sekarangUntukDb()
  );
  if (!berubah) throw tidakDitemukan();
  return bentukEvent(await repo.ambilMilikSendiri(penggunaId, eventId));
}

async function hapus(penggunaId, eventId) {
  if (!(await repo.hapusMilikSendiri(penggunaId, eventId))) throw tidakDitemukan();
}

module.exports = { pastikanBoleh, batasTanggal, daftar, buat, ubah, hapus };
