// Alamat di dalam situs. Tautan internal ditulis sebagai jalur situs ('/docs/faq',
// '/download#riwayat', '/gambar/lanjut-wordmark.png') lalu diubah menjadi alamat relatif terhadap
// halaman yang sedang dibuka. Dengan begitu isi dist/ tetap bisa diunggah ke folder mana pun
// di domain, sama seperti landing sebelumnya (base './').

/** Jalur halaman tanpa garis miring di awal dan akhir: '' untuk beranda, 'docs/faq', dst. */
export type Jalur = string;

/** Awalan relatif dari halaman `jalur` ke akar situs: './' untuk beranda, '../../' untuk 'docs/faq'. */
export function akarDari(jalur: Jalur): string {
  return jalur ? '../'.repeat(jalur.split('/').length) : './';
}

/**
 * Jalur yang menunjuk berkas, bukan halaman. Daftar eksplisit: halaman versi seperti
 * 'download/1.2.0' juga berakhiran ".0" tetapi tetap halaman (folder).
 * Sama dengan BERKAS di vite.config.ts.
 */
export const BERKAS = /\.(png|webp|jpe?g|svg|ico|json|txt|xml|apk|html?|css|m?js|woff2?|pdf)$/i;

/**
 * Alamat untuk atribut href/src. `tujuan` berupa jalur situs berawalan '/', boleh diikuti
 * #bagian. Halaman jadi folder ('docs/faq/'); berkas (lihat BERKAS) tetap berkas. Tautan
 * luar dan jangkar di halaman yang sama dikembalikan apa adanya.
 */
export function alamat(akar: string, tujuan: string): string {
  if (!tujuan.startsWith('/')) return tujuan;
  const [jalur, bagian] = tujuan.slice(1).split('#');
  const isi = !jalur ? '' : BERKAS.test(jalur) ? jalur : `${jalur.replace(/\/$/, '')}/`;
  const dasar = akar + isi;
  return bagian ? `${dasar}#${bagian}` : dasar;
}

/** Jalur situs ('/docs/faq') → Jalur halaman ('docs/faq'). */
export const jalurDari = (tujuan: string): Jalur => tujuan.split('#')[0].replace(/^\/+|\/+$/g, '');
