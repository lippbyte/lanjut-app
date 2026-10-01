const { z } = require('zod');
const { KELAS, JENIS_SEKOLAH } = require('../../util/kelas');

const ubahProfilSkema = z.object({
  kelas: z.enum(KELAS).nullable().optional(),
  // LANJUT_038 — diselaraskan dengan kelas di util/kelas.js tentukanJenisSekolah.
  jenis_sekolah: z.enum(JENIS_SEKOLAH).nullable().optional(),
  prodi_impian: z.string().trim().max(64).nullable().optional(),
  nama_tampilan: z.string().trim().min(1).max(60).nullable().optional(),
  // LANJUT_032 — null mengosongkan pilihan.
  gaya_belajar: z.enum(['visual', 'auditori', 'kinestetik', 'baca_tulis']).nullable().optional(),
});

module.exports = { ubahProfilSkema };
