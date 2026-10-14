const { GalatApi } = require('../../util/respons');
const { tentukanJenisSekolah } = require('../../util/kelas');
const penggunaRepo = require('./pengguna.repo');
const kontenRepo = require('../konten/konten.repo');
const persetujuanLayanan = require('../persetujuan/persetujuan.layanan');
const {
  petakanProdiTujuan,
  pastikanProdiValid,
  bentukProfil,
} = require('../auth/auth.layanan');

/**
 * LANJUT_075: bidang minat hanya disimpan bila akun sudah menerima kebijakan
 * privasi versi yang berlaku (siswa di bawah 18 tahun; berlaku untuk semua
 * kelas). Gerbang dulu, baru isi — akun tanpa persetujuan tidak mendapat
 * petunjuk daftar rumpun yang sah. Nilai harus persis salah satu prodi.rumpun.
 */
async function pastikanMinatRumpunBoleh(penggunaId, minatRumpun) {
  if (!(await persetujuanLayanan.kebijakanDiterima(penggunaId))) {
    throw new GalatApi('AI_BELUM_DIIZINKAN', 'Terima kebijakan privasi dulu supaya bidang minatmu bisa disimpan.');
  }
  const sah = new Set(await kontenRepo.ambilDaftarRumpun());
  if (minatRumpun.some((r) => !sah.has(r))) {
    throw new GalatApi('RUMPUN_TIDAK_SAH', 'Bidang minat tidak dikenal.', { minat_rumpun: 'tidak dikenal' });
  }
}

async function ubahProfil(penggunaId, { kelas, jenis_sekolah, prodi_impian, nama_tampilan, gaya_belajar, minat_rumpun }) {
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
  // Semua pemeriksaan selesai sebelum menulis: permintaan yang ditolak tidak
  // mengubah medan lain yang ikut dikirim.
  if (minat_rumpun !== undefined) {
    await pastikanMinatRumpunBoleh(penggunaId, minat_rumpun);
    perubahan.minatRumpun = minat_rumpun;
  }

  await penggunaRepo.updateProfil(penggunaId, perubahan);

  const profil = await penggunaRepo.cariProfil(penggunaId);
  if (!profil) throw new GalatApi('TIDAK_DITEMUKAN', 'Pengguna tidak ditemukan.');
  return bentukProfil(profil);
}

module.exports = { ubahProfil };
