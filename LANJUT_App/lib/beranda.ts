import type { Kelas } from './jenjang';
import { kelompokJenjang } from './jenjang';
import type { NamaIkon } from '../components/ui/Ikon';

export type KartuBeranda = {
  id: string;
  judul: string;
  keterangan: string;
  ikon: NamaIkon;
  href: string;
  varian?: 'biasa' | 'soft' | 'outline';
};

/**
 * Kartu pintu Beranda (LANJUT_064).
 * Judul netral "Cerita Alumni" menggantikan "Cerita Alumni SMK".
 */
export const KARTU_ARSIP: KartuBeranda = {
  id: 'arsip',
  judul: 'Arsip Belajar',
  keterangan: 'Catatan dan soal buatanmu, disimpan per mapel.',
  ikon: 'mapel',
  href: '/arsip',
};

export const KARTU_LEVEL_IN: KartuBeranda = {
  id: 'level-in',
  judul: 'Level-In',
  keterangan: 'Seberapa kuat kamu di tiap mapel, dari latihanmu.',
  ikon: 'ok',
  href: '/level-in',
};

export const KARTU_NGOBROL: KartuBeranda = {
  id: 'ngobrol',
  judul: 'Ngobrol Bareng LANJUT',
  keterangan: 'Cerita soal minat, cara belajar, atau rencana kuliahmu.',
  ikon: 'obrolan',
  href: '/ngobrol',
};

export const KARTU_CERITA_ALUMNI: KartuBeranda = {
  id: 'cerita-alumni',
  judul: 'Cerita Alumni',
  keterangan: 'Mereka sudah lewat jalan ini.',
  ikon: 'alumni',
  href: '/cerita-alumni',
  varian: 'outline',
};

export const KARTU_CEK_POSISI: KartuBeranda = {
  id: 'cek-posisi',
  judul: 'Cek Posisi Gue',
  keterangan: 'Lihat kamu lagi di tahap mana dan langkah yang cocok berikutnya.',
  ikon: 'posisi',
  href: '/cek-posisi',
};

export const KARTU_PILIH_MAPEL: KartuBeranda = {
  id: 'pilih-mapel',
  judul: 'Pilih Mapel',
  keterangan: 'Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu.',
  ikon: 'mapel',
  href: '/pilih-mapel',
};

export const KARTU_EKSPLORASI_TUJUAN: KartuBeranda = {
  id: 'eksplorasi-tujuan',
  judul: 'Eksplorasi Tujuan',
  keterangan: 'Intip prodi kuliah: belajar apa dan lulusannya kerja di mana.',
  ikon: 'posisi',
  href: '/eksplorasi-tujuan',
};

export const KARTU_GAYA_BELAJAR: KartuBeranda = {
  id: 'gaya-belajar',
  judul: 'Gaya Belajar',
  keterangan: 'Kenali cara belajar yang paling nyambung buat kamu.',
  ikon: 'info',
  href: '/gaya-belajar',
};

export const KARTU_DAFTAR_PERIKSA: KartuBeranda = {
  id: 'daftar-periksa',
  judul: 'Daftar Periksa',
  keterangan: 'Satu per satu, tidak perlu sekaligus.',
  ikon: 'checklist',
  href: '/daftar-periksa',
};

/**
 * Menentukan daftar kartu pintu Beranda berdasarkan kelas akun (LANJUT_064).
 *
 * - SMP (kelas 7–9): TIDAK menampilkan "Cek Posisi Gue". Digantikan dengan kartu
 *   dari "Jenjang Saya" untuk SMP (Eksplorasi Tujuan, Gaya Belajar) plus kartu
 *   umum (Arsip Belajar, Level-In, Ngobrol Bareng LANJUT, Cerita Alumni).
 * - Kelas 10–11: kartu dari "Jenjang Saya" untuk 10–11 (Pilih Mapel, Eksplorasi Tujuan,
 *   Gaya Belajar) plus kartu umum (Arsip Belajar, Level-In, Ngobrol Bareng LANJUT,
 *   Daftar Periksa, Cerita Alumni).
 * - Kelas 12: kartu tetap seperti sebelumnya (Cek Posisi Gue, Arsip Belajar,
 *   Level-In, Ngobrol Bareng LANJUT, Cerita Alumni). Catatan: Tenggat dirender
 *   terpisah di atas kartu-kartu ini hanya untuk kelas 12.
 * - Tanpa kelas / tidak dikenal: fallback ke kartu umum tanpa galat.
 *
 * Aturan umum: kartu tanpa isi tidak pernah ditampilkan kosong.
 */
export function daftarKartuBeranda(kelas: Kelas | null | undefined): KartuBeranda[] {
  const kelompok = kelompokJenjang(kelas);

  if (kelompok === 'smp') {
    return [
      KARTU_EKSPLORASI_TUJUAN,
      KARTU_GAYA_BELAJAR,
      KARTU_ARSIP,
      KARTU_LEVEL_IN,
      KARTU_NGOBROL,
      KARTU_CERITA_ALUMNI,
    ];
  }

  if (kelompok === 'kelas10_11') {
    return [
      KARTU_PILIH_MAPEL,
      KARTU_EKSPLORASI_TUJUAN,
      KARTU_GAYA_BELAJAR,
      KARTU_ARSIP,
      KARTU_LEVEL_IN,
      KARTU_NGOBROL,
      KARTU_DAFTAR_PERIKSA,
      KARTU_CERITA_ALUMNI,
    ];
  }

  if (kelompok === 'kelas12') {
    return [
      KARTU_CEK_POSISI,
      KARTU_ARSIP,
      KARTU_LEVEL_IN,
      KARTU_NGOBROL,
      KARTU_CERITA_ALUMNI,
    ];
  }

  // Fallback tanpa kelas / akun umum
  return [
    KARTU_ARSIP,
    KARTU_LEVEL_IN,
    KARTU_NGOBROL,
    KARTU_CERITA_ALUMNI,
  ];
}
