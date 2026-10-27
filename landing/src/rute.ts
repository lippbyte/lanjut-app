import dataRilis from './data/releases.json';
import { ARTIKEL } from './konten/docs';
import type { IdHalaman } from './halaman/jenis';
import { urutRilis, type DataRilis } from './lib/rilis';

// Peta situs (PRD-landpage §7). Satu sumber untuk prerender (scripts/bangun.mjs), server dev,
// dan tes. Setiap rute menjadi dist/<jalur>/index.html, jadi bisa dibuka langsung dari URL
// dan di-refresh di hosting statis apa pun.

export type Rute = { jalur: string; halaman: IdHalaman; judul: string; deskripsi: string };

const rilis = urutRilis(dataRilis as DataRilis);

export const RUTE: Rute[] = [
  {
    jalur: '',
    halaman: 'beranda',
    judul: 'LANJUT — Mau lanjut kuliah, mulai dari mana?',
    deskripsi: 'LANJUT membantu kamu mengenali pilihan, memahami jalur menuju kuliah, dan menyiapkan langkah berikutnya. Dimulai dari siswa kelas XII SMK.',
  },
  {
    jalur: 'docs',
    halaman: 'docs',
    judul: 'Dokumentasi · LANJUT',
    deskripsi: 'Dokumentasi publik LANJUT: produk, bisnis, teknis, dan bantuan. Bisa dibaca tanpa akun.',
  },
  ...ARTIKEL.map((a): Rute => ({ jalur: a.jalur, halaman: 'artikel', judul: `${a.judul} · Dokumentasi LANJUT`, deskripsi: a.deskripsi })),
  {
    jalur: 'docs/glossary',
    halaman: 'glosarium',
    judul: 'Glosarium · Dokumentasi LANJUT',
    deskripsi: 'Arti istilah seleksi masuk kuliah seperti SNBP, SNBT, UTBK, TKA, dan PDSS dengan sumber resminya, serta istilah di aplikasi LANJUT.',
  },
  {
    jalur: 'ai',
    halaman: 'ai',
    judul: 'AI LANJUT · LANJUT',
    deskripsi: 'AI LANJUT: arah konsultasi untuk pelajaran, minat, tujuan, dan pilihan pendidikan. Masih dalam pengembangan dan belum aktif.',
  },
  {
    jalur: 'download',
    halaman: 'unduh',
    judul: 'Download LANJUT',
    deskripsi: 'Unduh APK LANJUT untuk Android dari sumber resmi, lengkap dengan riwayat versi dan catatan perubahan.',
  },
  ...rilis.map((r): Rute => ({ jalur: `download/${r.version}`, halaman: 'rilis', judul: `LANJUT ${r.version} · Download`, deskripsi: r.summary })),
  {
    jalur: 'privacy',
    halaman: 'privasi',
    judul: 'Privasi situs · LANJUT',
    deskripsi: 'Data apa yang dikumpulkan website LANJUT: tanpa cookie, tanpa analytics, dan tanpa pelacak.',
  },
  {
    jalur: 'privacy/app',
    halaman: 'privasi-aplikasi',
    judul: 'Kebijakan Privasi Aplikasi · LANJUT',
    deskripsi: 'Kebijakan privasi aplikasi LANJUT (DRAF, belum berlaku).',
  },
];

/** dist/404.html: dipakai hosting untuk alamat yang tidak ada. Asetnya beralamat mutlak ('/'). */
export const RUTE_404: Rute = {
  jalur: '404',
  halaman: 'tidak-ditemukan',
  judul: 'Halaman tidak ditemukan · LANJUT',
  deskripsi: 'Halaman yang kamu cari tidak ada di situs LANJUT.',
};

/** Alamat lama landing (LANJUT_083b) yang mungkin sudah dibagikan: dialihkan ke halaman barunya. */
export const ALIHAN: { berkas: string; ke: string; judul: string }[] = [
  { berkas: 'panduan-uji.html', ke: '/docs/testing', judul: 'Panduan uji' },
  { berkas: 'kebijakan-privasi.html', ke: '/privacy/app', judul: 'Kebijakan Privasi Aplikasi' },
];

export const cariRute = (jalur: string): Rute | undefined => RUTE.find((r) => r.jalur === jalur);
