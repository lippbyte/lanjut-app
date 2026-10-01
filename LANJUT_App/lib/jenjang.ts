/**
 * Kelas & jenjang (LANJUT_035). SMP (7–9) dan SMA/SMK (10–12) memakai fitur
 * yang sama. Daftar ini harus sama dengan ENUM `pengguna.kelas`
 * (server/src/db/migrasi/010_kelas_smp.sql) dan server/src/util/kelas.js.
 */
export const KELAS_OPSI = ['7', '8', '9', '10', '11', '12'] as const;
export type Kelas = (typeof KELAS_OPSI)[number];

/**
 * Linimasa, Daftar Periksa, dan Cek Posisi berisi SNBP/SNBT/TKA — murni untuk
 * kelas 12 (keputusan Khalifa, 1 Okt 2026). Penentunya kelas AKUN, bukan
 * pilihan kelas di perangkat. Kelas kosong (akun lama) dianggap BUKAN kelas
 * 12 sampai siswa mengisinya — jangan menebak 12.
 */
export function untukKelas12(kelas: Kelas | null | undefined): boolean {
  return kelas === '12';
}
