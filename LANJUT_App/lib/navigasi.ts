import type { NamaIkon } from '../components/ui/Ikon';

/**
 * Tab bar bawah (LANJUT_074): lima tab — dua kiri, tab tengah Ngobrol Bareng,
 * dua kanan. Empat tab lama tetap nama, ikon, dan fungsinya (LANJUT_064).
 * Modul murni supaya urutan & posisi tab tengah bisa diuji tanpa render.
 */
export type HrefTab = '/linimasa' | '/jenjang-saya' | '/ngobrol' | '/pilih-mapel' | '/daftar-periksa';

export type TabBawah = {
  href: HrefTab;
  /** TEKS DRAF — salinan-teks-lanjut.md (label tab). */
  label: string;
  /** Tab biasa memakai ikon garis; tab tengah memakai lingkaran placeholder. */
  ikon?: NamaIkon;
  /** Tab tengah: lingkaran lebih besar, sedikit menonjol ke atas garis tab bar. */
  tengah?: boolean;
};

export const TAB_BAWAH: readonly TabBawah[] = [
  { href: '/linimasa', label: 'Beranda', ikon: 'beranda' },
  { href: '/jenjang-saya', label: 'Jenjang Saya', ikon: 'smk' },
  // Ikon kelinci LANJUT menunggu aset dari Khalifa; sementara lingkaran berisi huruf "L".
  { href: '/ngobrol', label: 'Ngobrol', tengah: true },
  { href: '/pilih-mapel', label: 'Pilih Mapel', ikon: 'mapel' },
  { href: '/daftar-periksa', label: 'Daftar Periksa', ikon: 'checklist' },
];

/** Huruf placeholder di lingkaran tab tengah, sampai aset ikon kelinci tersedia. */
export const PLACEHOLDER_TAB_TENGAH = 'L';

/** Tinggi area ikon tab biasa (px); lebarnya 44. */
export const TINGGI_IKON_TAB = 28;

/**
 * Diameter lingkaran tab tengah (px): lebih besar dari area ikon tab biasa dan
 * di atas batas sentuh 44 px. Lingkaran digeser naik (UKURAN − TINGGI_IKON_TAB)
 * supaya labelnya sejajar label tab lain; akibatnya lingkaran menonjol ±14 px di
 * atas garis tab bar (padding atas tab bar 8 + padding tab 6).
 */
export const UKURAN_TAB_TENGAH = 56;
