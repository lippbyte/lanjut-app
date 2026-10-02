// Aturan bisnis Level-In. Tidak ada SQL di sini — hanya memanggil repositori
// dan fungsi keputusan murni (keputusan.js). docs/SDD-Backend-Foundation.md §4.6.
//
// CATATAN: agregasiPerMapelUntukPengguna() dan saranHarianUntukPengguna() akan
// melempar error selama keputusan.js belum diisi (lihat komentar di kepala
// berkas itu) — ini disengaja, bukan bug: server tidak boleh mengarang angka
// kalibrasi dari interpretasi sendiri (RB5).

const { GalatApi } = require('../../util/respons');
const { keIso, keDbDariKlien } = require('../../util/waktu');
const repo = require('./levelin.repo');
const kartuRepo = require('../kartu/kartu.repo');
const keputusan = require('./keputusan');

async function mulaiSesi(penggunaId, body) {
  // LANJUT_041: mapel tak dikenal dulu jatuh ke pelanggaran FK (500).
  if (body.mapel_fokus_id && !(await repo.mapelAda(body.mapel_fokus_id))) {
    throw new GalatApi('VALIDASI_GAGAL', 'Mapel tidak ditemukan.', { mapel_fokus_id: 'tidak ditemukan' });
  }
  await repo.buatSesiLatihan({
    id: body.id,
    penggunaId,
    dimulaiPada: keDbDariKlien(body.dimulai_pada),
    jumlahKartuDirencanakan: body.jumlah_kartu_direncanakan,
    mapelFokusId: body.mapel_fokus_id,
    asalMula: body.asal_mula,
  });
  // Idempoten per id (ON DUPLICATE KEY) — tetapi id milik akun LAIN tidak
  // boleh dijawab "berhasil": barisnya tetap milik akun itu dan tidak berubah.
  if (!(await repo.sesiMilikSendiri(penggunaId, body.id))) {
    throw new GalatApi('VALIDASI_GAGAL', 'Id sesi sudah dipakai.', { id: 'sudah dipakai' });
  }
  return { id: body.id };
}

/** Riwayat Latihan (LANJUT_041) — sesi milik sendiri dengan hitungan jawaban. */
async function daftarSesi(penggunaId) {
  const baris = await repo.daftarSesiMilikSendiri(penggunaId);
  return baris.map((b) => ({
    id: b.id,
    dimulai_pada: keIso(b.dimulai_pada),
    selesai_pada: keIso(b.selesai_pada),
    mapel_fokus_id: b.mapel_fokus_id,
    asal_mula: b.asal_mula,
    jumlah_kartu_direncanakan: b.jumlah_kartu_direncanakan,
    jumlah_dijawab: Number(b.jumlah_dijawab),
    jumlah_benar: Number(b.jumlah_benar),
  }));
}

/**
 * Periksa semua rujukan SEBELUM menulis apa pun (LANJUT_041), supaya satu
 * catatan salah tidak meninggalkan simpanan setengah jadi:
 *   - sesi_id harus sesi milik sendiri (404, bukan 403 — §8.4);
 *   - kartu_id harus kartu sendiri atau kurasi terverifikasi (404), dan
 *     mapel_id diambil dari kartunya, bukan dari kiriman klien;
 *   - tanpa kartu_id, mapel_id (bila ada) harus mapel yang dikenal (400).
 * Sebelumnya rujukan tak dikenal jatuh ke pelanggaran FK (500), dan akun B
 * bisa menautkan catatannya ke sesi/kartu milik akun A.
 */
async function periksaRujukan(penggunaId, daftarCatatan) {
  const sesiSah = new Set();
  const mapelKartu = new Map();
  for (const c of daftarCatatan) {
    if (c.sesi_id && !sesiSah.has(c.sesi_id)) {
      if (!(await repo.sesiMilikSendiri(penggunaId, c.sesi_id))) {
        throw new GalatApi('TIDAK_DITEMUKAN', 'Sesi latihan tidak ditemukan.');
      }
      sesiSah.add(c.sesi_id);
    }
    if (c.kartu_id && !mapelKartu.has(c.kartu_id)) {
      const kartu = await kartuRepo.ambilUntukDijawab(penggunaId, c.kartu_id);
      if (!kartu) throw new GalatApi('TIDAK_DITEMUKAN', 'Kartu tidak ditemukan.');
      mapelKartu.set(c.kartu_id, kartu.mapel_id);
    }
    if (!c.kartu_id && c.mapel_id && !(await repo.mapelAda(c.mapel_id))) {
      throw new GalatApi('VALIDASI_GAGAL', 'Mapel tidak ditemukan.', { mapel_id: 'tidak ditemukan' });
    }
  }
  return mapelKartu;
}

async function tutupSesi(penggunaId, sesiId, body) {
  const selesaiPadaDb = keDbDariKlien(body.selesai_pada);
  const berhasil = await repo.tutupSesiLatihan(penggunaId, sesiId, selesaiPadaDb);
  if (!berhasil) {
    throw new GalatApi('TIDAK_DITEMUKAN', 'Sesi latihan tidak ditemukan.');
  }
  return { id: sesiId, selesai_pada: keIso(selesaiPadaDb) };
}

async function simpanRiwayatBorongan(penggunaId, daftarCatatan) {
  const mapelKartu = await periksaRujukan(penggunaId, daftarCatatan);
  for (const catatan of daftarCatatan) {
    let gapNumerik = null;
    let kelasGap = null;
    if (catatan.keyakinan !== null && catatan.keyakinan !== undefined) {
      // Dihitung SERVER, tidak pernah diterima dari klien (§4.6 aturan 2).
      gapNumerik = keputusan.gapNumerik(catatan.keyakinan, catatan.benar);
      kelasGap = keputusan.klasifikasiKartu(catatan.keyakinan, catatan.benar);
    }
    await repo.simpanSatuRiwayat(penggunaId, {
      id: catatan.id,
      kartuId: catatan.kartu_id,
      benar: catatan.benar,
      dijawabPada: keDbDariKlien(catatan.waktu), // pemetaan waktu → dijawab_pada (§4.6 aturan 4)
      sesiId: catatan.sesi_id,
      keyakinan: catatan.keyakinan,
      mapelId: catatan.kartu_id ? mapelKartu.get(catatan.kartu_id) : catatan.mapel_id,
      gapNumerik,
      kelasGap,
      aturanVersi: catatan.aturan_versi,
    });
  }
  return { disimpan: daftarCatatan.length };
}

async function ringkasanKalibrasi(penggunaId, jendela) {
  const jendelaPerMapel = jendela || 50;
  const [baris, mapelDenganRiwayat, ketersediaan] = await Promise.all([
    repo.ambilRiwayatUntukAgregasi(penggunaId, jendelaPerMapel),
    repo.ambilMapelDenganRiwayat(penggunaId),
    repo.ambilKetersediaanKartuPerMapel(penggunaId),
  ]);
  return keputusan.agregatPerMapel(baris, mapelDenganRiwayat, ketersediaan, jendelaPerMapel);
}

async function saranHarian(penggunaId) {
  const [ringkasan, ketersediaan, adaRiwayat] = await Promise.all([
    ringkasanKalibrasi(penggunaId, 50),
    repo.ambilKetersediaanKartuPerMapel(penggunaId),
    repo.adaRiwayatSamaSekali(penggunaId),
  ]);
  return keputusan.saranHarian(ringkasan, ketersediaan, adaRiwayat);
}

async function konfigurasi() {
  const baris = await repo.ambilSemuaKonfigurasi();
  const hasil = {};
  for (const b of baris) {
    hasil[b.kunci] = {
      nilai: b.nilai,
      versi: b.versi,
      dasar: b.dasar,
      diubah_pada: keIso(b.diubah_pada),
    };
  }
  return hasil;
}

module.exports = {
  mulaiSesi,
  daftarSesi,
  tutupSesi,
  simpanRiwayatBorongan,
  ringkasanKalibrasi,
  saranHarian,
  konfigurasi,
};
