// Nilai `pengguna.kelas` yang sah (migrasi 010, LANJUT_035): SMP 7–9 dan
// SMA/SMK 10–12. Satu daftar untuk semua skema zod (daftar, ubah profil,
// klaim sinkron) supaya tidak ada yang tertinggal saat daftar ini berubah.
// Harus sama dengan ENUM di 010_kelas_smp.sql dan `KELAS_OPSI` di
// LANJUT_App/lib/jenjang.ts.

const KELAS = ['7', '8', '9', '10', '11', '12'];

module.exports = { KELAS };
