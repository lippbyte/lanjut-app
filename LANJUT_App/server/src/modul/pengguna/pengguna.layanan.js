const { GalatApi } = require('../../util/respons');
const { tentukanJenisSekolah } = require('../../util/kelas');
const penggunaRepo = require('./pengguna.repo');
const {
  petakanProdiTujuan,
  pastikanProdiValid,
  bentukProfil,
} = require('../auth/auth.layanan');

async function ubahProfil(penggunaId, { kelas, jenis_sekolah, prodi_impian, nama_tampilan, gaya_belajar }) {
  const perubahan = {};
  if (kelas !== undefined) perubahan.kelas = kelas;
  // LANJUT_038: jenis sekolah selalu diselaraskan dengan kelas yang berlaku
  // sesudah perubahan (mis. kelas 8 → 11 mengosongkan SMP lama).
  if (kelas !== undefined || jenis_sekolah !== undefined) {
    const lama = await penggunaRepo.cariProfil(penggunaId);
    if (!lama) throw new GalatApi('TIDAK_DITEMUKAN', 'Pengguna tidak ditemukan.');
    const kelasBaru = kelas !== undefined ? kelas : lama.kelas;
    perubahan.jenisSekolah = tentukanJenisSekolah(kelasBaru, jenis_sekolah, lama.jenis_sekolah);
  }
  if (prodi_impian !== undefined) {
    perubahan.prodiTujuan = petakanProdiTujuan(prodi_impian);
    // C-2b: validasi keberadaan prodi juga di jalur PATCH /pengguna/saya,
    // supaya prodi yang tidak dikenal tidak jatuh ke pelanggaran FK (500).
    await pastikanProdiValid(perubahan.prodiTujuan);
  }
  if (nama_tampilan !== undefined) perubahan.namaTampilan = nama_tampilan;
  if (gaya_belajar !== undefined) perubahan.gayaBelajar = gaya_belajar;

  await penggunaRepo.updateProfil(penggunaId, perubahan);

  const profil = await penggunaRepo.cariProfil(penggunaId);
  if (!profil) throw new GalatApi('TIDAK_DITEMUKAN', 'Pengguna tidak ditemukan.');
  return bentukProfil(profil);
}

module.exports = { ubahProfil };
