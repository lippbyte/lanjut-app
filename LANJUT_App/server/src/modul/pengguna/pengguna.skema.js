const { z } = require('zod');
const { KELAS, JENIS_SEKOLAH } = require('../../util/kelas');

// LANJUT_075 — bidang minat (rumpun) untuk Eksplorasi Kampus. Batas jumlah di
// sini; isinya (harus ada di daftar rumpun prodi) dicek di pengguna.layanan.js.
const MAKS_MINAT_RUMPUN = 5;

const ubahProfilSkema = z.object({
  kelas: z.enum(KELAS).nullable().optional(),
  // LANJUT_038 — diselaraskan dengan kelas di util/kelas.js tentukanJenisSekolah.
  jenis_sekolah: z.enum(JENIS_SEKOLAH).nullable().optional(),
  prodi_impian: z.string().trim().max(64).nullable().optional(),
  nama_tampilan: z.string().trim().min(1).max(60).nullable().optional(),
  // LANJUT_032 — null mengosongkan pilihan.
  gaya_belajar: z.enum(['visual', 'auditori', 'kinestetik', 'baca_tulis']).nullable().optional(),
  // [] mengosongkan pilihan.
  minat_rumpun: z
    .array(z.string().trim().min(1).max(60))
    .max(MAKS_MINAT_RUMPUN, `Bidang minat paling banyak ${MAKS_MINAT_RUMPUN}.`)
    .refine((daftar) => new Set(daftar).size === daftar.length, 'Bidang minat tidak boleh ganda.')
    .optional(),
});

module.exports = { ubahProfilSkema, MAKS_MINAT_RUMPUN };
