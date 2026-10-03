// Kebijakan privasi LANJUT (LANJUT_047) — DRAF, wajib direview ahli hukum
// sebelum dipakai. Teksnya ada di kebijakan-privasi.json (satu sumber untuk
// ringkasan di layar Daftar dan halaman lengkap /kebijakan-privasi); berkas
// ini hanya memberi tipe.
//
// VERSI_KEBIJAKAN dikirim saat daftar sebagai `versi_kebijakan` = versi teks
// yang dibaca dan dicentang siswa. Server menolaknya (409 KEBIJAKAN_USANG)
// bila bukan versi yang berlaku di konfigurasi server.

import data from './kebijakan-privasi.json';

export type BagianKebijakan = { judul: string; paragraf?: string[]; butir?: string[] };

export const VERSI_KEBIJAKAN: number = data.versi;
export const STATUS_KEBIJAKAN: string = data.status;
export const RINGKASAN_KEBIJAKAN: string[] = data.ringkasan;
export const ISI_KEBIJAKAN: BagianKebijakan[] = data.isi;
