import AsyncStorage from '@react-native-async-storage/async-storage';

import type { JenisSekolah, Kelas } from '../lib/jenjang';
import { ApiError, apiFetch } from './client';

export const KUNCI_TOKEN = 'auth_token';
const KUNCI_PENGGUNA = 'auth_pengguna';

// Bentuk persis `bentukProfil` di server/src/modul/auth/auth.layanan.js.
export type Pengguna = {
  id: string;
  nama_pengguna: string;
  nama_tampilan: string;
  email: string | null;
  peran: string;
  status: string;
  kelas: Kelas | null;
  // Opsional di tipe: sesi yang tersimpan sebelum LANJUT_038 belum punya medan ini.
  jenis_sekolah?: JenisSekolah | null;
  prodi_impian: string | null;
  // Opsional di tipe: sesi yang tersimpan sebelum LANJUT_032 belum punya medan ini.
  gaya_belajar?: GayaBelajar | null;
  // LANJUT_075: nama rumpun (bidang minat), [] = belum memilih. Opsional di tipe:
  // sesi yang tersimpan sebelum LANJUT_075 belum punya medan ini.
  minat_rumpun?: string[];
  // LANJUT_079: id mapel pilihan (kelas 12: Pilih Mapel per rumpun; 7–11: Mapel Saya),
  // [] = belum memilih. Opsional di tipe: sesi sebelum LANJUT_079 belum punya medan ini.
  mapel_pilihan?: string[];
  dibuat_pada: string | null;
  terakhir_masuk_pada: string | null;
};

// Nilai sama persis dengan ENUM di server/src/db/migrasi/007_gaya_belajar.sql.
export type GayaBelajar = 'visual' | 'auditori' | 'kinestetik' | 'baca_tulis';

export type Sesi = { token: string; kedaluwarsa_pada: string; pengguna: Pengguna };

// Medan opsional mengikuti `daftarSkema` di server/src/modul/auth/auth.skema.js.
export type DataDaftar = {
  nama_pengguna: string;
  kata_sandi: string;
  email?: string;
  nama_tampilan?: string;
  kelas?: Kelas;
  // Hanya untuk kelas 10–12; kelas 7–9 diisi SMP oleh server (LANJUT_038).
  jenis_sekolah?: JenisSekolah;
  prodi_impian?: string;
  // LANJUT_047: versi kebijakan privasi yang dibaca & dicentang (lib/kebijakanPrivasi.ts).
  versi_kebijakan?: number;
};

export async function masuk(nama_pengguna: string, kata_sandi: string): Promise<Sesi> {
  const sesi = await apiFetch<Sesi>('/auth/masuk', {
    method: 'POST',
    body: { nama_pengguna, kata_sandi },
  });
  await simpanSesi(sesi);
  return sesi;
}

export async function daftar(data: DataDaftar): Promise<Sesi> {
  const sesi = await apiFetch<Sesi>('/auth/daftar', { method: 'POST', body: data });
  await simpanSesi(sesi);
  return sesi;
}

export async function keluar(token: string): Promise<void> {
  try {
    await apiFetch('/auth/keluar', { method: 'POST', token });
  } catch {
    // Sesi di server tetap kedaluwarsa sendiri; logout lokal tidak boleh
    // gagal hanya karena server tak terjangkau.
  }
  await hapusSesiLokal();
}

export async function saya(token: string): Promise<Pengguna> {
  return apiFetch<Pengguna>('/auth/saya', { token });
}

// Medan mengikuti `ubahProfilSkema` di server/src/modul/pengguna/pengguna.skema.js.
// Medan yang tidak dikirim tidak diubah; `null` mengosongkannya.
export type DataUbahProfil = {
  nama_tampilan?: string;
  kelas?: Kelas | null;
  jenis_sekolah?: JenisSekolah | null;
  prodi_impian?: string | null;
  gaya_belajar?: GayaBelajar | null;
  // LANJUT_075: [] mengosongkan. Server menolak nilai di luar daftar rumpun
  // (RUMPUN_TIDAK_SAH) dan akun yang belum menerima kebijakan (AI_BELUM_DIIZINKAN).
  minat_rumpun?: string[];
  // LANJUT_079: [] mengosongkan. Maks. 5; kelas 12 hanya mapel dari rumpun favoritnya
  // (400 VALIDASI_GAGAL, medan mapel_pilihan).
  mapel_pilihan?: string[];
};

/** PATCH /pengguna/saya — mengembalikan profil terbaru (bentuk sama dengan /auth/saya). */
export async function ubahProfil(token: string, data: DataUbahProfil): Promise<Pengguna> {
  return apiFetch<Pengguna>('/pengguna/saya', { method: 'PATCH', body: data, token });
}

async function simpanSesi(sesi: Sesi) {
  await AsyncStorage.multiSet([
    [KUNCI_TOKEN, sesi.token],
    [KUNCI_PENGGUNA, JSON.stringify(sesi.pengguna)],
  ]);
}

export async function bacaSesiTersimpan(): Promise<{ token: string; pengguna: Pengguna | null } | null> {
  const [[, token], [, pengguna]] = await AsyncStorage.multiGet([KUNCI_TOKEN, KUNCI_PENGGUNA]);
  if (!token) return null;
  return { token, pengguna: pengguna ? (JSON.parse(pengguna) as Pengguna) : null };
}

export async function simpanPengguna(pengguna: Pengguna) {
  await AsyncStorage.setItem(KUNCI_PENGGUNA, JSON.stringify(pengguna));
}

export async function hapusSesiLokal() {
  await AsyncStorage.multiRemove([KUNCI_TOKEN, KUNCI_PENGGUNA]);
}

// Kalimat disalin dari PESAN_GALAT di MVP-PWA/assets/api.js supaya kedua
// klien bicara dengan suara yang sama; `pesan` mentah dari server tidak
// ditampilkan (SDD §4.2).
const PESAN_GALAT: Record<string, string> = {
  VALIDASI_GAGAL: 'Ada isian yang belum sesuai. Coba periksa lagi.',
  KREDENSIAL_SALAH: 'Nama pengguna atau kata sandi belum cocok.',
  NAMA_PENGGUNA_DIPAKAI: 'Nama pengguna ini sudah dipakai. Coba nama lain.',
  EMAIL_DIPAKAI: 'Email ini sudah dipakai akun lain. Coba email lain, atau masuk dengan akunmu.',
  TERLALU_SERING: 'Terlalu banyak percobaan gagal. Tunggu beberapa menit, lalu coba lagi.',
  TIDAK_MASUK: 'Kamu perlu masuk dulu untuk membuka ini.',
  SESI_KEDALUWARSA: 'Sesi kamu sudah berakhir. Masuk lagi untuk melanjutkan.',
  TIDAK_DITEMUKAN: 'Tidak ditemukan.',
  TIDAK_BERHAK: 'Kamu tidak punya akses ke ini.',
  GALAT_SERVER: 'Sedang ada gangguan di server. Coba lagi sebentar lagi.',
  JARINGAN: 'Tidak bisa menghubungi server. Periksa koneksimu.',
};

/** Ditampilkan di layar Masuk setelah sesi ditolak server (401) kapan pun. */
export const PESAN_SESI_BERAKHIR = PESAN_GALAT.SESI_KEDALUWARSA;

export function pesanUntuk(err: unknown): string {
  const kode = err instanceof ApiError ? err.kode : undefined;
  return (kode && PESAN_GALAT[kode]) || PESAN_GALAT.GALAT_SERVER;
}
