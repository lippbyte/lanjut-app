// Fitur aplikasi LANJUT dan statusnya: satu sumber untuk beranda, dokumentasi fitur, dan
// roadmap. Status diperiksa terhadap kode app (LANJUT_App/lib/beranda.ts, jenjang.ts,
// navigasi.ts) dan saklar server per 26 Oktober 2026. "Tersedia" berarti sudah ada di aplikasi
// versi uji, belum berarti isinya sudah dicek ke sumber resmi (lihat `catatan`).

export type StatusFitur = 'tersedia' | 'pengembangan' | 'rencana';

export const LABEL_STATUS: Record<StatusFitur, string> = {
  tersedia: 'Tersedia',
  pengembangan: 'Dalam Pengembangan',
  rencana: 'Direncanakan',
};

export const ARTI_STATUS: Record<StatusFitur, string> = {
  tersedia: 'Sudah ada di aplikasi versi uji. Isi dan tampilannya masih bisa berubah.',
  pengembangan: 'Sedang dibangun atau sudah ada tetapi belum aktif. Belum bisa dipakai penuh.',
  rencana: 'Sudah diputuskan sebagai arah, tetapi belum dibangun. Cakupan dan waktunya belum pasti.',
};

export type KelompokFitur = 'tahu' | 'pilih' | 'siap';

export const KELOMPOK: Record<KelompokFitur, { judul: string; kebutuhan: string }> = {
  tahu: { judul: 'Mencari informasi', kebutuhan: 'Apa yang jatuh tempo, dan apa yang berbeda untuk anak SMK?' },
  pilih: { judul: 'Mengeksplorasi pilihan', kebutuhan: 'Prodi mana yang cocok, dan mapel apa yang mendukungnya?' },
  siap: { judul: 'Mempersiapkan diri', kebutuhan: 'Aku sudah sampai mana, dan langkah berikutnya apa?' },
};

export type Fitur = {
  id: string;
  nama: string;
  status: StatusFitur;
  kelompok: KelompokFitur | 'lain';
  /** Apa yang dilakukan fitur ini (dokumentasi; boleh dua kalimat pendek). */
  ringkas: string;
  /** Untuk kartu beranda: satu kalimat pendek (aturan copy brief redesign). */
  singkat: string;
  /** Untuk siapa di aplikasi versi uji. */
  untuk: string;
  catatan?: string;
  /** Catatan kejujuran versi pendek untuk kartu beranda. */
  catatanSingkat?: string;
  /**
   * Tangkapan layar app versi uji di public/gambar/app/ (build web commit d6f2dd8, akun dan DB
   * uji, 26 Okt 2026). Hanya untuk fitur yang memang terlihat di layarnya.
   */
  gambar?: { berkas: string; alt: string };
};

export const FITUR: Fitur[] = [
  {
    id: 'linimasa',
    nama: 'Linimasa',
    status: 'tersedia',
    kelompok: 'tahu',
    ringkas: 'Tahapan TKA, SNBP, dan SNBT berurutan waktu. Tenggat terdekat tampil paling atas di Beranda, dihitung dalam hari.',
    singkat: 'Tahapan TKA, SNBP, dan SNBT berurutan, dengan tenggat terdekat paling atas.',
    untuk: 'Kelas 12 (SMA, SMK, MA)',
    catatan: 'Tanggal baru ditampilkan setelah dicek ke sumber resmi.',
    catatanSingkat: 'Tanggal tampil setelah dicek ke sumber resmi.',
  },
  {
    id: 'khusus-smk',
    nama: 'Khusus SMK',
    status: 'tersedia',
    kelompok: 'tahu',
    ringkas: 'Ketentuan yang penerapannya berbeda bagi siswa SMK. Setiap butir berpasangan: apa yang berbeda, lalu apa yang bisa kamu lakukan.',
    singkat: 'Ketentuan yang berbeda untuk siswa SMK, lengkap dengan langkah yang bisa diambil.',
    untuk: 'Siswa SMK',
    catatan: 'Isi keenam topiknya masih dicek ke sumber resmi.',
    catatanSingkat: 'Isinya masih dicek ke sumber resmi.',
    gambar: {
      berkas: 'khusus-smk.webp',
      alt: 'Bagian "Kalau kamu anak SMK" di Jenjang Saya: daftar topik seperti nilai rapor mapel pendukung SNBP dan jalur vokasi politeknik.',
    },
  },
  {
    id: 'pilih-mapel',
    nama: 'Pilih Mapel',
    status: 'tersedia',
    kelompok: 'pilih',
    ringkas: 'Dari prodi incaran ke mapel pendukungnya: mana yang ada di sekolahmu, dan saran dua mapel pilihan TKA.',
    singkat: 'Dari prodi incaran ke mapel pendukung dan saran dua mapel pilihan TKA.',
    untuk: 'Kelas 10–12',
    catatan: 'Hasilnya rangkuman, bukan keputusan resmi. Aplikasi mengarahkan untuk mengecek laman SNPMB.',
    catatanSingkat: 'Rangkuman, bukan keputusan resmi.',
    gambar: {
      berkas: 'pilih-mapel.webp',
      alt: 'Layar Penolong Pilih Mapel: pilihan rumpun favorit, lalu prodi target Teknik Informatika dengan mapel pendukungnya.',
    },
  },
  {
    id: 'eksplorasi-kampus',
    nama: 'Eksplorasi Kampus',
    status: 'tersedia',
    kelompok: 'pilih',
    ringkas: 'Mengenal jalur masuk perguruan tinggi dan bidang yang ingin kamu dalami. Untuk kelas 12, ada profil prodi: belajar apa dan lulusannya bekerja di mana.',
    singkat: 'Kenali jalur masuk perguruan tinggi dan bidang yang ingin kamu dalami.',
    untuk: 'Semua jenjang',
    catatan: 'Profil prodi untuk kelas 12 baru tampil setelah dicek ke sumber resmi.',
    catatanSingkat: 'Profil prodi kelas 12 tampil setelah dicek.',
    gambar: {
      berkas: 'eksplorasi-kampus.webp',
      alt: 'Layar Eksplorasi Kampus untuk kelas 11: penjelasan jalur masuk SNBP, SNBT, dan seleksi mandiri, berlabel Perkiraan.',
    },
  },
  {
    id: 'jalur-saya',
    nama: 'Jalur Saya',
    status: 'tersedia',
    kelompok: 'siap',
    ringkas: 'Menunjukkan kamu sedang di tahap mana dalam persiapan masuk kuliah, lalu langkah yang cocok berikutnya.',
    singkat: 'Lihat tahap persiapanmu sekarang dan langkah yang cocok berikutnya.',
    untuk: 'Kelas 12',
    gambar: { berkas: 'jalur-saya.webp', alt: 'Layar Jalur Saya: posisi Tahap 2 dari 4, Pemantapan Awal, dengan daftar fokus sekarang.' },
  },
  {
    id: 'daftar-periksa',
    nama: 'Daftar Periksa',
    status: 'tersedia',
    kelompok: 'siap',
    ringkas: 'Langkah persiapan yang bisa dicentang satu per satu. Kemajuanmu tersimpan di akun.',
    singkat: 'Langkah persiapan yang bisa dicentang satu per satu dan tersimpan di akunmu.',
    untuk: 'Kelas 10–12',
    gambar: { berkas: 'daftar-periksa.webp', alt: 'Layar Daftar Periksa untuk kelas 12 jalur SNBP: butir berkas pendaftaran yang bisa dicentang.' },
  },
  {
    id: 'cerita-alumni',
    nama: 'Cerita Alumni',
    status: 'pengembangan',
    kelompok: 'siap',
    ringkas: 'Pengalaman alumni yang sudah lewat jalan ini: asal sekolah, jalur, hambatan, dan apa yang mereka lakukan.',
    singkat: 'Pengalaman alumni yang sudah lewat jalan ini, tayang hanya dengan izin.',
    untuk: 'Semua jenjang',
    catatan: 'Halamannya sudah ada, tetapi belum ada cerita yang tayang. Cerita hanya ditayangkan dengan izin pemiliknya.',
    catatanSingkat: 'Belum ada cerita yang tayang.',
    gambar: { berkas: 'cerita-alumni.webp', alt: 'Layar Cerita Alumni yang masih kosong: "Cerita pertama sedang kami kumpulkan."' },
  },
  {
    id: 'arsip-belajar',
    nama: 'Arsip Belajar',
    status: 'tersedia',
    kelompok: 'lain',
    ringkas: 'Catatan dan soal buatanmu sendiri, disimpan per mapel dan hanya bisa dilihat olehmu.',
    singkat: 'Catatan dan soal buatanmu, disimpan per mapel.',
    untuk: 'Semua jenjang',
  },
  {
    id: 'latihan',
    nama: 'Latihan',
    status: 'tersedia',
    kelompok: 'lain',
    ringkas: 'Sesi singkat dari kartu Arsip Belajarmu, untuk hari yang padat.',
    singkat: 'Sesi singkat dari kartu Arsip Belajarmu.',
    untuk: 'Semua jenjang',
  },
  {
    id: 'level-in',
    nama: 'Level-In',
    status: 'tersedia',
    kelompok: 'lain',
    ringkas: 'Seberapa kuat kamu di tiap mapel, dihitung dari latihanmu.',
    singkat: 'Seberapa kuat kamu di tiap mapel, dari latihanmu.',
    untuk: 'Semua jenjang',
  },
  {
    id: 'gaya-belajar',
    nama: 'Gaya Belajar',
    status: 'tersedia',
    kelompok: 'lain',
    ringkas: 'Mengenali cara belajar yang paling nyambung buatmu.',
    singkat: 'Kenali cara belajar yang paling nyambung buatmu.',
    untuk: 'Kelas 7–11',
  },
  {
    id: 'ai-lanjut',
    nama: 'AI LANJUT (Ngobrol)',
    status: 'pengembangan',
    kelompok: 'lain',
    ringkas: 'Teman bertanya soal pelajaran, minat, tujuan, dan pilihan pendidikan.',
    singkat: 'Tempat bertanya soal pelajaran, minat, sampai pilihan kuliah.',
    untuk: '—',
    catatan: 'Layar Ngobrol sudah ada di aplikasi, tetapi jawaban AI belum aktif.',
    catatanSingkat: 'Jawaban AI belum aktif.',
  },
];

export const fitur = (id: string): Fitur => {
  const f = FITUR.find((x) => x.id === id);
  if (!f) throw new Error(`fitur tidak dikenal: ${id}`);
  return f;
};

/** Topik di bagian Khusus SMK aplikasi versi uji (MVP-PWA/data/khusus-smk.json; belum diverifikasi). */
export const TOPIK_KHUSUS_SMK = [
  'Nilai rapor mapel pendukung SNBP',
  'Sertifikat kompetensi keahlian dan PKL',
  'Kuota siswa eligible SNBP',
  'Jalur vokasi Politeknik (D3/D4)',
  'Mapel pilihan TKA yang tidak diajarkan di SMK',
  'Jadwal PKL yang berdekatan dengan pendaftaran',
];
