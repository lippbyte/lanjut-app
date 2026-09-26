import AsyncStorage from '@react-native-async-storage/async-storage';

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
  kelas: '10' | '11' | '12' | null;
  prodi_impian: string | null;
  dibuat_pada: string | null;
  terakhir_masuk_pada: string | null;
};

export type Sesi = { token: string; kedaluwarsa_pada: string; pengguna: Pengguna };

// Medan opsional mengikuti `daftarSkema` di server/src/modul/auth/auth.skema.js.
export type DataDaftar = {
  nama_pengguna: string;
  kata_sandi: string;
  email?: string;
  nama_tampilan?: string;
  kelas?: '10' | '11' | '12';
  prodi_impian?: string;
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

export function pesanUntuk(err: unknown): string {
  const kode = err instanceof ApiError ? err.kode : undefined;
  return (kode && PESAN_GALAT[kode]) || PESAN_GALAT.GALAT_SERVER;
}
