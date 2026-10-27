// Jenis bersama untuk semua halaman yang diprerender (bukan google-kembali.html).

export type IdHalaman =
  | 'beranda'
  | 'docs'
  | 'artikel'
  | 'glosarium'
  | 'ai'
  | 'unduh'
  | 'rilis'
  | 'privasi'
  | 'privasi-aplikasi'
  | 'tidak-ditemukan';

/**
 * `jalur`: alamat halaman tanpa garis miring awal/akhir ('' untuk beranda).
 * `akar`: awalan relatif ke akar situs ('./', '../', …); '/' untuk 404.html dan server dev.
 */
export type PropsHalaman = { jalur: string; akar: string };
