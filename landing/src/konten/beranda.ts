import type { StatusFitur } from './fitur';

// Teks beranda (acuan design/reference-landing.png + brief redesign 26 Okt 2026). Semua DRAF,
// belum disetujui PM. Aturan copy brief: judul ≤ 8 kata, isi satu kalimat (±12–18 kata),
// sapaan "kamu", tanpa angka/testimoni/klaim fitur yang belum ada. Teks acuan yang lebih dari
// satu kalimat sudah dipangkas. Judul memakai sentence case (pilihan percakapan 27 Okt 2026,
// belum disetujui PM); huruf besar hanya untuk nama diri: LANJUT, SMK, nama fitur. Status fitur selalu dari konten/fitur.ts.

export const HERO = {
  judulAwal: 'Mau lan',
  judulJ: 'j',
  judulAkhir: 'ut kuliah, mulai dari mana?',
  sub: 'Kenali pilihanmu, pahami jalurnya, dan mulai persiapkan dirimu.',
  catatan: 'Aplikasi Android · masih versi uji',
};

export const MASALAH = {
  judul: 'Memilih masa depan tidak selalu mudah',
  butir: [
    { judul: 'Bingung menentukan arah', isi: 'Belum mengenali minat, potensi, atau tujuan yang ingin dicapai setelah lulus.' },
    { judul: 'Tidak tahu jalur yang tepat', isi: 'Punya cita-cita, tetapi belum memahami jalur pendidikan dan langkah untuk mencapainya.' },
    { judul: 'Informasi sulit dipahami', isi: 'Informasi kampus, program studi, seleksi, dan persyaratan tersebar di berbagai sumber.' },
    { judul: 'Sulit memulai persiapan', isi: 'Banyak hal yang harus disiapkan, tetapi bingung menentukan prioritas dan langkah pertama.' },
    { judul: 'Butuh ruang untuk bercerita', isi: 'Tekanan akademik dan kekhawatiran tentang masa depan tidak selalu mudah dihadapi sendiri.' },
  ],
};

export const AJAKAN = 'Apa yang harus dilakukan mulai sekarang?';

export const TENTANG = {
  judulAwal: 'Inilah',
  judulTengah: 'cocok buat kamu si',
  sorot: 'siswa bingung',
  kartu: [
    { judul: 'Kenali diri, temukan arah, lanjutkan langkah', isi: 'LANJUT membantu kamu mengenali diri, menjelajahi pilihan, dan menyiapkan langkah setelah lulus.' },
    { judul: 'Setiap perjalanan punya titik awal', isi: 'Kamu nggak harus sudah tahu mau jadi apa, mulai saja dari mengenali dirimu.' },
    { judul: 'Navigasi untuk masa depan yang lebih terarah', isi: 'Dari minat sampai pilihan pendidikan, langkah berikutnya jadi lebih jelas untuk kamu ambil.' },
  ],
};

export const LANGKAH = {
  judul: 'Langkah kecil untuk menemukan arahmu',
  butir: [
    { judul: 'Pilih kelas dan sekolahmu', isi: 'Isi LANJUT menyesuaikan jenjangmu, dari SMP sampai kelas 12.' },
    { judul: 'Kenali minat dan cara belajarmu', isi: 'Eksplorasi Kampus dan Gaya Belajar membantumu mengenali bidang yang cocok.' },
    { judul: 'Pahami jalur dan mapelnya', isi: 'Jalur Saya dan Pilih Mapel menunjukkan posisimu dan mapel pendukung prodi incaran.' },
    { judul: 'Siapkan langkah satu per satu', isi: 'Daftar Periksa memecah persiapan jadi langkah kecil yang bisa dicentang.' },
  ],
};

export const KENAPA_SMK = {
  judul: 'Kenapa mulai dari SMK?',
  pengantar: 'Banyak panduan seleksi ditulis untuk anak SMA, padahal peta anak SMK berbeda.',
  butir: [
    { judul: 'Ada PKL', isi: 'Jadwal PKL bisa berdekatan dengan masa pendaftaran kuliah.' },
    { judul: 'Mapelnya berbeda', isi: 'Sebagian mapel pendukung prodi tidak ada di kurikulum SMK.' },
    { judul: 'Ada sertifikat keahlian', isi: 'Kamu punya sertifikat kompetensi dan pengalaman PKL yang tidak dimiliki lulusan SMA.' },
    { judul: 'Ada jalur vokasi', isi: 'Politeknik (D3/D4) jarang dibahas berdampingan dengan S1.' },
  ],
  catatan: ['Isi bagian Khusus SMK di aplikasi masih dicek ke sumber resmi.', 'Siswa SMA, MA, dan SMP juga bisa memakai sebagian fitur.'],
};

export type BarisSolusi = { masalah: string; fitur: string; status: StatusFitur; isi: string };

export const SOLUSI = {
  judul: 'Dari masalah ke langkah nyata',
  baris: [
    { masalah: 'Bingung menentukan arah', fitur: 'Eksplorasi Kampus · Gaya Belajar', status: 'tersedia', isi: 'Kenali bidang yang cocok dan cara belajarmu.' },
    { masalah: 'Tidak tahu jalur yang tepat', fitur: 'Jalur Saya · Pilih Mapel', status: 'tersedia', isi: 'Lihat posisimu dan mapel yang mendukung prodi incaran.' },
    { masalah: 'Informasi sulit dipahami', fitur: 'Linimasa · Khusus SMK', status: 'tersedia', isi: 'Tenggat dan ketentuan dirangkum, isinya masih dicek ke sumber resmi.' },
    { masalah: 'Sulit memulai persiapan', fitur: 'Daftar Periksa', status: 'tersedia', isi: 'Centang persiapan satu per satu, tidak perlu sekaligus.' },
    { masalah: 'Butuh ruang untuk bercerita', fitur: 'AI LANJUT (Ngobrol)', status: 'pengembangan', isi: 'Layarnya sudah ada, tetapi jawaban AI belum aktif.' },
  ] satisfies BarisSolusi[],
};

export const FITUR_BERANDA = {
  judul: 'Fitur di aplikasi versi uji',
  pengantar: 'Status setiap fitur ditulis apa adanya.',
  /** Tangkapan layar yang dipajang di atas daftar fitur (berkas di public/gambar/app/). */
  pajangan: ['jalur-saya', 'pilih-mapel', 'daftar-periksa'],
};

export const FAQ = {
  judul: 'Pertanyaan yang sering muncul',
  butir: [
    { tanya: 'Apa itu LANJUT?', jawab: 'Aplikasi Android yang membantu siswa memahami jalur menuju kuliah dan langkah persiapannya.' },
    { tanya: 'Apakah LANJUT berbayar?', jawab: 'Versi uji dipakai tanpa biaya, dan belum ada sistem pembayaran di aplikasi.' },
    { tanya: 'Apakah hanya untuk siswa SMK?', jawab: 'Fokus awalnya SMK kelas XII, tetapi siswa SMA, MA, dan SMP sudah bisa memakai sebagian fitur.' },
    { tanya: 'Di mana aku bisa mengunduhnya?', jawab: 'Hanya dari halaman Unduh di situs ini, dan saat ini belum ada rilis publik.' },
    { tanya: 'Apakah ada di Play Store atau iPhone?', jawab: 'Belum, LANJUT saat ini hanya untuk Android dalam bentuk APK.' },
    { tanya: 'Apakah AI LANJUT sudah bisa dipakai?', jawab: 'Belum, layar Ngobrol sudah ada tetapi jawaban AI belum aktif.' },
    { tanya: 'Apakah informasinya pasti benar?', jawab: 'LANJUT merujuk sumber resmi dan menandai yang belum dicek, jadi tetap cocokkan dengan laman resmi dan guru BK.' },
  ],
};

export const PENUTUP = {
  judul: 'Mulai dari satu langkah kecil',
  sub: 'Unduh LANJUT, atau pelajari dulu cara kerjanya di dokumentasi.',
};
