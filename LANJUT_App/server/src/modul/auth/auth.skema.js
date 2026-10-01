// Skema zod untuk endpoint auth. docs/SDD-Backend-Foundation.md §5.2, §8.3.
// Daftar putih: medan yang tidak disebut di sini dibuang otomatis oleh zod
// (mode default, bukan .passthrough()) — menutup mass assignment.

const { z } = require('zod');
const { KELAS, JENIS_SEKOLAH } = require('../../util/kelas');

// 3–32 karakter, a-z 0-9 . _ ; disimpan huruf kecil semua.
const NAMA_PENGGUNA_REGEX = /^[a-z0-9._]{3,32}$/;

// Sandi paling umum yang ditolak (§5.2) — bukan aturan komposisi, cuma
// menyaring tebakan pertama yang paling jelas.
const SANDI_TERLARANG = new Set([
  '12345678',
  '123456789',
  'password',
  'qwerty123',
  'lanjutlanjut',
  'lanjut123',
  '11111111',
  '00000000',
]);

const namaPenggunaSkema = z
  .string()
  .trim()
  .toLowerCase()
  .refine((v) => NAMA_PENGGUNA_REGEX.test(v), {
    message: '3–32 karakter, hanya huruf kecil, angka, titik, dan garis bawah.',
  });

const kataSandiSkema = z
  .string()
  .min(8, 'Kata sandi minimal 8 karakter.')
  .max(200, 'Kata sandi terlalu panjang.')
  .refine((v) => !SANDI_TERLARANG.has(v.toLowerCase()), {
    message: 'Kata sandi ini terlalu umum, pilih yang lain.',
  });

// Opsional di server: APK lama (sebelum LANJUT_035) mendaftar tanpa kelas.
// Form Daftar di app terbaru yang mewajibkannya.
const kelasSkema = z.enum(KELAS).optional();

const daftarSkema = z.object({
  nama_pengguna: namaPenggunaSkema,
  kata_sandi: kataSandiSkema,
  nama_tampilan: z.string().trim().min(1).max(60).optional(),
  email: z.string().trim().toLowerCase().email().max(190).optional(),
  kelas: kelasSkema,
  // LANJUT_038: hanya untuk kelas 10–12; kelas 7–9 diisi SMP oleh server.
  jenis_sekolah: z.enum(JENIS_SEKOLAH).optional(),
  prodi_impian: z.string().trim().max(64).optional(),
});

const masukSkema = z.object({
  nama_pengguna: z.string().trim().toLowerCase().min(1).max(32),
  kata_sandi: z.string().min(1).max(200),
});

const ubahSandiSkema = z.object({
  kata_sandi_lama: z.string().min(1).max(200),
  kata_sandi_baru: kataSandiSkema,
});

module.exports = { daftarSkema, masukSkema, ubahSandiSkema, NAMA_PENGGUNA_REGEX };
