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
const keputusan = require('./keputusan');

async function mulaiSesi(penggunaId, body) {
  await repo.buatSesiLatihan({
    id: body.id,
    penggunaId,
    dimulaiPada: keDbDariKlien(body.dimulai_pada),
    jumlahKartuDirencanakan: body.jumlah_kartu_direncanakan,
    mapelFokusId: body.mapel_fokus_id,
    asalMula: body.asal_mula,
  });
  return { id: body.id };
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
      mapelId: catatan.mapel_id,
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
  tutupSesi,
  simpanRiwayatBorongan,
  ringkasanKalibrasi,
  saranHarian,
  konfigurasi,
};
