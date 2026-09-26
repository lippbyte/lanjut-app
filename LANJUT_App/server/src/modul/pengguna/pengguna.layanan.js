const { GalatApi } = require('../../util/respons');
const penggunaRepo = require('./pengguna.repo');
const {
  petakanProdiTujuan,
  pastikanProdiValid,
  bentukProfil,
} = require('../auth/auth.layanan');

async function ubahProfil(penggunaId, { kelas, prodi_impian, nama_tampilan }) {
  const perubahan = {};
  if (kelas !== undefined) perubahan.kelas = kelas;
  if (prodi_impian !== undefined) {
    perubahan.prodiTujuan = petakanProdiTujuan(prodi_impian);
    // C-2b: validasi keberadaan prodi juga di jalur PATCH /pengguna/saya,
    // supaya prodi yang tidak dikenal tidak jatuh ke pelanggaran FK (500).
    await pastikanProdiValid(perubahan.prodiTujuan);
  }
  if (nama_tampilan !== undefined) perubahan.namaTampilan = nama_tampilan;

  await penggunaRepo.updateProfil(penggunaId, perubahan);

  const profil = await penggunaRepo.cariProfil(penggunaId);
  if (!profil) throw new GalatApi('TIDAK_DITEMUKAN', 'Pengguna tidak ditemukan.');
  return bentukProfil(profil);
}

module.exports = { ubahProfil };
