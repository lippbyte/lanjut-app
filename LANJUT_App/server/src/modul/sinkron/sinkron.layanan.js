// Aturan bisnis klaim data tamu — docs/SDD-Backend-Foundation.md §6.3.
// Tiga hal yang dikunci di sana dan dijaga di sini:
//   1. Klaim sekali & eksplisit — dipanggil manual oleh klien, bukan otomatis.
//   2. Idempoten — id/kunci gabungan yang sama tidak menggandakan apa pun.
//   3. Baris yang SUDAH dimiliki pengguna lain DITOLAK (TIDAK_BERHAK per baris),
//      TIDAK PERNAH memindahkan kepemilikan.

const { sekarangUntukDb, keDbDariKlien } = require('../../util/waktu');
const penggunaRepo = require('../pengguna/pengguna.repo');
const { petakanProdiTujuan } = require('../auth/auth.layanan');
const kontenRepo = require('../konten/konten.repo');
const kemajuanRepo = require('../kemajuan/kemajuan.repo');
const kartuRepo = require('../kartu/kartu.repo');
const levelinRepo = require('../levelin/levelin.repo');
const keputusan = require('../levelin/keputusan');
const sinkronRepo = require('./sinkron.repo');

async function klaimProfil(penggunaId, profil) {
  if (!profil) return;
  const perubahan = {};
  if (profil.kelas !== undefined) perubahan.kelas = profil.kelas;
  if (profil.prodi_impian !== undefined) {
    const prodiTujuan = petakanProdiTujuan(profil.prodi_impian);
    // C-2b: klaim bersifat "gagal sebagian, bisa dicoba lagi" (§6.3/A4), jadi
    // prodi yang tidak dikenal TIDAK menggagalkan seluruh permintaan klaim
    // (yang bisa memuat kemajuan/peristiwa/kartu lain) — cukup diabaikan
    // diam-diam, bukan 500 karena pelanggaran FK.
    if (!prodiTujuan || (await kontenRepo.prodiAda(prodiTujuan))) {
      perubahan.prodiTujuan = prodiTujuan;
    }
  }
  if (Object.keys(perubahan).length > 0) {
    await penggunaRepo.updateProfil(penggunaId, perubahan);
  }
}

async function klaimKemajuan(penggunaId, daftar) {
  const hasil = { diterima: 0 };
  for (const item of daftar || []) {
    if (item.selesai_pada) {
      await kemajuanRepo.tandaiSelesai(
        penggunaId,
        item.butir_id,
        keDbDariKlien(item.selesai_pada)
      );
    }
    hasil.diterima += 1;
  }
  return hasil;
}

async function klaimPeristiwa(penggunaId, daftar) {
  const hasil = { diterima: 0, ditolak: [] };
  for (const catatan of daftar || []) {
    const pemilikSaatIni = await sinkronRepo.pemilikRiwayat(catatan.id);
    if (pemilikSaatIni !== undefined && pemilikSaatIni !== penggunaId) {
      hasil.ditolak.push({ id: catatan.id, alasan: 'TIDAK_BERHAK' });
      continue;
    }
    let gapNumerik = null;
    let kelasGap = null;
    if (catatan.keyakinan !== null && catatan.keyakinan !== undefined) {
      gapNumerik = keputusan.gapNumerik(catatan.keyakinan, catatan.benar);
      kelasGap = keputusan.klasifikasiKartu(catatan.keyakinan, catatan.benar);
    }
    await levelinRepo.simpanSatuRiwayat(penggunaId, {
      id: catatan.id,
      kartuId: catatan.kartu_id,
      benar: catatan.benar,
      dijawabPada: keDbDariKlien(catatan.waktu),
      sesiId: catatan.sesi_id,
      keyakinan: catatan.keyakinan,
      mapelId: catatan.mapel_id,
      gapNumerik,
      kelasGap,
      aturanVersi: catatan.aturan_versi,
    });
    hasil.diterima += 1;
  }
  return hasil;
}

async function klaimKartu(penggunaId, daftar) {
  const hasil = { diterima: 0, ditolak: [] };
  for (const kartu of daftar || []) {
    const pemilikSaatIni = await sinkronRepo.pemilikKartu(kartu.id);
    if (pemilikSaatIni !== undefined && pemilikSaatIni !== penggunaId) {
      hasil.ditolak.push({ id: kartu.id, alasan: 'TIDAK_BERHAK' });
      continue;
    }
    if (pemilikSaatIni === undefined) {
      const mapelAda = await kartuRepo.mapelAda(kartu.mapel_id);
      if (!mapelAda) {
        hasil.ditolak.push({ id: kartu.id, alasan: 'VALIDASI_GAGAL' });
        continue;
      }
      const waktu = kartu.dibuat_pada ? keDbDariKlien(kartu.dibuat_pada) : sekarangUntukDb();
      await kartuRepo.buatKartu({
        id: kartu.id,
        pemilikId: penggunaId,
        mapelId: kartu.mapel_id,
        judul: kartu.judul,
        isi: kartu.isi,
        jawaban: kartu.jawaban,
        waktu,
      });
    }
    // Sudah ada & milik sendiri → idempoten, tidak ditulis ulang (bukan
    // "tulisan terbaru menang" di sini karena ini klaim satu-kali, bukan
    // sinkronisasi berkelanjutan §6.4).
    hasil.diterima += 1;
  }
  return hasil;
}

async function klaim(penggunaId, body) {
  await klaimProfil(penggunaId, body.profil);
  const kemajuan = await klaimKemajuan(penggunaId, body.kemajuan);
  const peristiwa = await klaimPeristiwa(penggunaId, body.peristiwa);
  const kartu = await klaimKartu(penggunaId, body.kartu);
  return { kemajuan, peristiwa, kartu };
}

module.exports = { klaim };
