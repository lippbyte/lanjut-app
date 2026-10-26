import type { KelompokFitur } from './fitur';

// Dokumentasi publik (PRD-landpage §8.2). Isi dipisah dari tampilan: halaman Artikel merender
// blok di bawah. Teks sebaris memakai penanda TeksKaya (**tebal**, [label](/jalur), `kode`).
// Semua teks DRAF, belum disetujui PM. Klaim bisnis ditulis sebagai hipotesis; status fitur
// diambil dari konten/fitur.ts supaya tidak berbeda dengan beranda.

export type IdKategori = 'produk' | 'bisnis' | 'teknis' | 'bantuan';

export const KATEGORI: { id: IdKategori; judul: string; ringkas: string }[] = [
  { id: 'produk', judul: 'Produk', ringkas: 'Apa itu LANJUT, masalah yang ingin diselesaikan, fitur, dan arah pengembangannya.' },
  { id: 'bisnis', judul: 'Bisnis', ringkas: 'Hipotesis model bisnis dan apa yang dibutuhkan agar LANJUT bisa terus berjalan.' },
  { id: 'teknis', judul: 'Teknis', ringkas: 'Arsitektur, teknologi yang dipakai, dan cara APK dirilis.' },
  { id: 'bantuan', judul: 'Bantuan', ringkas: 'Pertanyaan umum dan panduan untuk penguji.' },
];

export type Blok =
  | { jenis: 'p'; teks: string }
  | { jenis: 'daftar'; butir: string[]; urut?: boolean }
  | { jenis: 'catatan'; teks: string; judul?: string; nada?: 'info' | 'penting' }
  | { jenis: 'tabel'; judul: string; kepala: string[]; baris: string[][] }
  | { jenis: 'fitur'; kelompok: (KelompokFitur | 'lain')[] }
  | { jenis: 'arti-status' };

export type Bagian = { id: string; judul: string; blok: Blok[] };

export type Artikel = {
  jalur: string;
  kategori: IdKategori;
  judul: string;
  /** Kalimat pembuka di bawah judul. */
  ringkasan: string;
  /** Meta description. */
  deskripsi: string;
  diperbarui: string;
  /** Status isi seluruh artikel bila bukan fakta final. */
  label?: 'Hipotesis' | 'Rencana';
  bagian: Bagian[];
};

const DIPERBARUI = '2026-10-26';

export const ARTIKEL: Artikel[] = [
  {
    jalur: 'docs/product/overview',
    kategori: 'produk',
    judul: 'Gambaran umum',
    ringkasan: 'LANJUT membantu siswa memahami jalur menuju kuliah dan langkah persiapannya, dimulai dari siswa kelas XII SMK.',
    deskripsi: 'Apa itu LANJUT, untuk siapa, cara kerjanya, dan statusnya saat ini.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'apa-itu',
        judul: 'Apa itu LANJUT',
        blok: [
          {
            jenis: 'p',
            teks: 'LANJUT (Layanan Navigasi Jalur Untuk Kuliah) adalah aplikasi Android yang merangkum informasi seleksi masuk perguruan tinggi menjadi langkah kecil yang bisa dikerjakan: apa yang jatuh tempo, mapel apa yang mendukung prodi incaran, dan apa yang perlu disiapkan berikutnya.',
          },
          {
            jenis: 'p',
            teks: 'LANJUT tidak menggantikan guru BK, guru, atau laman resmi seleksi. LANJUT membantu kamu tahu apa yang perlu ditanyakan dan dicek, dan kapan.',
          },
        ],
      },
      {
        id: 'untuk-siapa',
        judul: 'Untuk siapa',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              '**Siswa SMK kelas XII** yang sedang menimbang kuliah. Ini fokus utama kami sekarang.',
              '**Siswa SMK kelas X–XI** yang mulai menimbang kuliah atau kerja dan ingin tahu konsekuensinya sejak awal.',
              '**Siswa SMA, MA, dan SMP.** Aplikasi versi uji sudah bisa dipakai untuk sebagian fitur. Dukungan yang lebih dalam ada di [roadmap](/docs/product/roadmap).',
              '**Guru BK, guru, dan orang tua/wali** yang ingin merujuk siswa ke satu tempat.',
            ],
          },
        ],
      },
      {
        id: 'cara-kerja',
        judul: 'Cara kerjanya',
        blok: [
          {
            jenis: 'daftar',
            urut: true,
            butir: [
              'Kamu memilih kelas, dan untuk kelas 10–12 juga jenis sekolah (SMA, SMK, atau MA).',
              'Beranda menampilkan yang paling relevan untuk kelasmu. Di kelas 12, tenggat terdekat yang tanggalnya sudah dicek tampil paling atas.',
              'Fitur seperti [Pilih Mapel](/docs/product/features#fitur-utama) dan Daftar Periksa membantumu memutuskan dan mencentang langkah satu per satu.',
              'Informasi seleksi dirujuk ke sumber resmi. Butir yang belum dicek ditandai di aplikasi.',
            ],
          },
        ],
      },
      {
        id: 'status',
        judul: 'Status saat ini',
        blok: [
          {
            jenis: 'catatan',
            nada: 'penting',
            judul: 'Masih versi uji',
            teks: 'Aplikasi LANJUT baru dipakai terbatas oleh penguji dari tim. Belum ada rilis APK publik, belum ada di Play Store, dan belum tersedia untuk iPhone. Status unduhan selalu ada di halaman [Download](/download).',
          },
          { jenis: 'p', teks: 'Status setiap fitur ada di [Fitur dan statusnya](/docs/product/features).' },
        ],
      },
      {
        id: 'prinsip',
        judul: 'Prinsip yang kami pegang',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              '**Jujur soal status.** Fitur dibedakan menjadi Tersedia, Dalam Pengembangan, dan Direncanakan.',
              '**Sumber resmi lebih dulu.** Informasi seleksi merujuk ke laman resmi, dan butir yang belum dicek diberi tanda.',
              '**Netral.** Halaman resmi seperti Linimasa dan Khusus SMK tidak dicampur dengan konten pihak lain.',
              '**Data seperlunya.** Aplikasi hanya meminta data yang dibutuhkan untuk berfungsi.',
            ],
          },
          { jenis: 'p', teks: 'LANJUT dikembangkan oleh EDILAKSO Group.' },
        ],
      },
    ],
  },
  {
    jalur: 'docs/product/problem',
    kategori: 'produk',
    judul: 'Masalah yang ingin diselesaikan',
    ringkasan: 'Siswa SMK yang ingin kuliah lebih sering kekurangan informasi yang sesuai konteksnya, bukan kekurangan kemauan.',
    deskripsi: 'Mengapa siswa SMK butuh informasi seleksi yang sesuai konteksnya, dan apa yang bukan tujuan LANJUT.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'asimetri-informasi',
        judul: 'Informasinya ada, tapi tidak untuk semua',
        blok: [
          {
            jenis: 'p',
            teks: 'Banyak penjelasan tentang TKA, SNBP, dan SNBT disusun dengan asumsi pendaftarnya lulusan SMA. Mapel pendukung, jadwal, dan strategi yang disarankan tidak selalu berlaku sama untuk siswa SMK.',
          },
          {
            jenis: 'p',
            teks: 'Akibatnya, siswa SMK bisa melewatkan kesempatan bukan karena tidak mampu, tetapi karena tidak tahu aturannya. Sebagian keputusan, seperti memilih mapel pilihan TKA atau mengejar tenggat pendaftaran, tidak bisa diulang setelah tanggalnya lewat.',
          },
        ],
      },
      {
        id: 'contoh-situasi',
        judul: 'Contoh situasi yang sering muncul',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Mapel pendukung prodi incaran tidak ada di struktur kurikulum SMK.',
              'Mapel pilihan TKA yang cocok untuk prodi incaran tidak diajarkan di sekolah.',
              'Jadwal PKL berdekatan dengan masa pendaftaran.',
              'Sertifikat kompetensi dan pengalaman PKL ada, tetapi belum jelas di mana bisa berguna.',
              'Jalur vokasi seperti politeknik (D3/D4) jarang dibahas berdampingan dengan S1.',
            ],
          },
          {
            jenis: 'catatan',
            teks: 'Topik-topik ini sedang disusun di bagian Khusus SMK aplikasi. Isinya masih dicek ke sumber resmi, jadi belum bisa dipakai sebagai panduan faktual.',
          },
        ],
      },
      {
        id: 'mengapa-smk',
        judul: 'Mengapa mulai dari SMK',
        blok: [
          {
            jenis: 'p',
            teks: 'Waktu siswa SMK kelas XII sangat terbatas: tugas, proyek, PKL, dan lomba berjalan bersamaan. LANJUT dirancang untuk keadaan itu, yaitu langkah kecil dan informasi yang relevan tanpa harus membaca semuanya sekaligus.',
          },
          {
            jenis: 'p',
            teks: 'Fokus ini titik awal, bukan batas. Siswa SMA, MA, dan SMP sudah bisa memakai sebagian fitur versi uji. Rencana dukungan untuk mereka ada di [roadmap](/docs/product/roadmap).',
          },
        ],
      },
      {
        id: 'dasar-bukti',
        judul: 'Dasar dan batasannya',
        blok: [
          {
            jenis: 'p',
            teks: 'Pemahaman masalah ini berasal dari pengalaman langsung anggota tim sebagai siswa SMK, percakapan dengan teman seangkatan, dan penelusuran informasi publik.',
          },
          {
            jenis: 'catatan',
            nada: 'penting',
            teks: 'Statusnya masih dugaan yang sedang diuji. Kami belum mempunyai data survei atau statistik yang bisa dipublikasikan, jadi halaman ini sengaja tidak memuat angka.',
          },
        ],
      },
      {
        id: 'bukan-tujuan',
        judul: 'Yang bukan tujuan LANJUT',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Menjadi bimbingan belajar atau menyediakan materi pelajaran lengkap.',
              'Memprediksi kelulusan atau skor seleksi.',
              'Menjadi media sosial atau forum antarpengguna.',
              'Menggantikan guru BK, guru, atau sumber resmi.',
            ],
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/product/features',
    kategori: 'produk',
    judul: 'Fitur dan statusnya',
    ringkasan: 'Fitur aplikasi LANJUT versi uji beserta statusnya. Halaman ini diperbarui setiap kali status fitur berubah.',
    deskripsi: 'Daftar fitur aplikasi LANJUT dengan status Tersedia, Dalam Pengembangan, atau Direncanakan.',
    diperbarui: DIPERBARUI,
    bagian: [
      { id: 'arti-status', judul: 'Arti status', blok: [{ jenis: 'arti-status' }] },
      { id: 'fitur-utama', judul: 'Fitur utama', blok: [{ jenis: 'fitur', kelompok: ['tahu', 'pilih', 'siap'] }] },
      { id: 'fitur-lain', judul: 'Fitur belajar dan lainnya', blok: [{ jenis: 'fitur', kelompok: ['lain'] }] },
      {
        id: 'ketepatan-isi',
        judul: 'Tentang ketepatan isi',
        blok: [
          {
            jenis: 'p',
            teks: 'Status Tersedia berarti fiturnya sudah ada, belum tentu seluruh isinya sudah dicek. Tanggal pendaftaran, profil prodi, dan butir Khusus SMK masih dicek ke sumber resmi. Aplikasi menandai butir yang belum dicek.',
          },
          { jenis: 'p', teks: 'Informasi seleksi selalu perlu dicocokkan dengan laman resminya dan dengan guru BK sebelum kamu memutuskan.' },
        ],
      },
      {
        id: 'belum-aktif',
        judul: 'Yang sengaja belum aktif',
        blok: [
          {
            jenis: 'daftar',
            butir: ['Jawaban AI di layar Ngobrol. Lihat [AI LANJUT](/ai).', 'Persiapan Event sekolah.'],
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/product/roadmap',
    kategori: 'produk',
    judul: 'Roadmap',
    ringkasan: 'Arah pengembangan LANJUT, disusun menurut status dan bukan tanggal.',
    deskripsi: 'Apa yang sudah ada di versi uji, apa yang sedang dikembangkan, dan apa yang direncanakan untuk LANJUT.',
    diperbarui: DIPERBARUI,
    label: 'Rencana',
    bagian: [
      {
        id: 'cara-membaca',
        judul: 'Cara membaca roadmap',
        blok: [
          {
            jenis: 'p',
            teks: 'Roadmap ini disusun menurut status. Kami tidak mencantumkan tanggal rilis sampai tanggalnya pasti, dan rencana bisa berubah setelah uji coba.',
          },
        ],
      },
      {
        id: 'sekarang',
        judul: 'Sekarang: versi uji',
        blok: [
          {
            jenis: 'p',
            teks: 'Berstatus **Tersedia** dan dipakai terbatas oleh penguji dari tim: Linimasa, Khusus SMK, Pilih Mapel, Eksplorasi Kampus, Jalur Saya, Daftar Periksa, Arsip Belajar, Latihan, Level-In, dan Gaya Belajar.',
          },
        ],
      },
      {
        id: 'dikembangkan',
        judul: 'Sedang dikembangkan',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              '**AI LANJUT.** Layar Ngobrol sudah ada, tetapi jawaban AI belum aktif. Lihat [AI LANJUT](/ai).',
              '**Cerita Alumni.** Halamannya sudah ada. Cerita dikumpulkan dan hanya ditayangkan dengan izin pemiliknya.',
              '**Pengecekan isi ke sumber resmi** untuk tanggal seleksi, profil prodi, dan butir Khusus SMK.',
              '**Rilis APK publik pertama** beserta halaman unduhan dan riwayat versinya.',
            ],
          },
        ],
      },
      {
        id: 'direncanakan',
        judul: 'Direncanakan',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              '**Dukungan yang lebih dalam untuk siswa SMA dan MA**, di luar fitur umum yang sudah bisa mereka pakai.',
              '**Dukungan yang lebih dalam untuk siswa SMP.**',
            ],
          },
          { jenis: 'catatan', teks: 'Cakupan dan urutan kedua rencana ini belum diputuskan.' },
        ],
      },
      {
        id: 'gagasan',
        judul: 'Masih berupa gagasan',
        blok: [
          {
            jenis: 'p',
            teks: 'Beberapa hal masih dipertimbangkan dan belum masuk roadmap, misalnya fitur latihan lanjutan dan kemitraan bank soal. Keduanya bagian dari [hipotesis model bisnis](/docs/business/model).',
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/business/model',
    kategori: 'bisnis',
    judul: 'Model bisnis',
    ringkasan: 'Model bisnis LANJUT belum diputuskan. Halaman ini memuat hipotesis yang sedang dipertimbangkan, bukan rencana final.',
    deskripsi: 'Hipotesis model bisnis LANJUT dan prinsip yang dipegang. Belum ada keputusan final dan belum ada sistem pembayaran.',
    diperbarui: DIPERBARUI,
    label: 'Hipotesis',
    bagian: [
      {
        id: 'status',
        judul: 'Status',
        blok: [
          {
            jenis: 'catatan',
            nada: 'penting',
            teks: 'Semua isi halaman ini berstatus hipotesis. Belum ada sistem pembayaran di aplikasi, dan versi uji dipakai tanpa biaya.',
          },
        ],
      },
      {
        id: 'prinsip',
        judul: 'Prinsip yang dipegang',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Fitur dasar harus tetap berguna utuh tanpa membayar. Fitur berbayar, bila nanti ada, hanya mempercepat atau mempertajam.',
              'Konten mitra tidak pernah dicampur ke halaman resmi seperti Linimasa dan Khusus SMK.',
              'Identitas penyedia konten mitra selalu ditampilkan terbuka.',
              'Tidak ada skema "bayar untuk menghilangkan sponsor".',
            ],
          },
        ],
      },
      {
        id: 'hipotesis-1',
        judul: 'Hipotesis 1: fitur latihan lanjutan',
        blok: [
          {
            jenis: 'p',
            teks: 'Siswa membayar untuk kemampuan tambahan pada latihan, misalnya mode ujian bertimer, statistik kemajuan per mapel, pengulangan berjarak otomatis, dan ekspor arsip. Latihan dasar dan Arsip Belajar tetap gratis.',
          },
          {
            jenis: 'p',
            teks: 'Yang ingin dibuktikan adalah ada orang yang bersedia membayar, bukan besarnya pendapatan. Harga belum ditetapkan, dan fitur-fitur ini belum dibangun.',
          },
        ],
      },
      {
        id: 'hipotesis-2',
        judul: 'Hipotesis 2: kemitraan bank soal',
        blok: [
          {
            jenis: 'p',
            teks: 'Lembaga bimbingan belajar atau guru mitra menyediakan kumpulan soal di tab terpisah dari Arsip Belajar, dengan nama penyedia tercantum. Isi soal dan pembahasannya menjadi tanggung jawab penyedia.',
          },
          { jenis: 'p', teks: 'Kemitraan baru masuk akal setelah ada pengguna nyata. Belum ada mitra yang diumumkan.' },
        ],
      },
      {
        id: 'belum-diputuskan',
        judul: 'Yang belum diputuskan',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Apakah dan kapan fitur berbayar dibangun.',
              'Harga dan cara pembayaran.',
              'Pembagian rinci antara fitur gratis dan berbayar.',
              'Syarat dan bentuk kemitraan.',
            ],
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/business/sustainability',
    kategori: 'bisnis',
    judul: 'Keberlanjutan',
    ringkasan: 'Apa yang dibutuhkan agar LANJUT bisa terus berjalan dan tetap dipercaya.',
    deskripsi: 'Biaya yang perlu ditanggung, perawatan konten seleksi, dan risiko yang dijaga agar LANJUT tetap dipercaya.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'biaya',
        judul: 'Biaya yang perlu ditanggung',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Server aplikasi dan basis data yang menyala terus.',
              'Domain dan hosting website.',
              'Waktu tim untuk mengecek dan memperbarui konten seleksi.',
              'Penyedia AI pihak ketiga, bila AI LANJUT diaktifkan.',
            ],
          },
          { jenis: 'p', teks: 'Angka biaya belum kami publikasikan.' },
        ],
      },
      {
        id: 'kepercayaan',
        judul: 'Kepercayaan sebagai aset',
        blok: [
          {
            jenis: 'p',
            teks: 'Nilai LANJUT bergantung pada informasi yang benar dan posisi yang netral. Karena itu setiap butir seleksi merujuk ke sumber resmi dengan status pengecekannya, konten pihak lain dipisahkan dari halaman resmi, dan data pengguna dikumpulkan seperlunya.',
          },
        ],
      },
      {
        id: 'perawatan-konten',
        judul: 'Perawatan konten',
        blok: [
          {
            jenis: 'p',
            teks: 'Jadwal dan ketentuan seleksi bisa berubah setiap tahun. Konten seleksi perlu dicek ulang ke laman resmi setiap ada pengumuman baru, dan butir yang belum dicek tetap ditandai di aplikasi.',
          },
        ],
      },
      {
        id: 'risiko',
        judul: 'Risiko yang dijaga',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              '**Informasi seleksi keliru.** Dampaknya besar bagi siswa. Penanganannya: hanya sumber resmi, status pengecekan tampil, dan penafian di Pilih Mapel.',
              '**Cerita alumni tidak terkumpul.** Cerita Alumni tetap kosong. Penanganannya: cerita dikumpulkan dengan izin pemiliknya sebelum tayang.',
              '**Waktu tim terbatas.** Konten bisa basi. Penanganannya: butir yang belum dicek selalu ditandai, bukan disembunyikan.',
            ],
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/technical/architecture',
    kategori: 'teknis',
    judul: 'Arsitektur',
    ringkasan: 'Tiga bagian LANJUT, bagaimana mereka terhubung, dan mengapa website dirilis terpisah dari aplikasi.',
    deskripsi: 'Arsitektur LANJUT: aplikasi Android, server API, dan website statis yang dirilis terpisah.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'komponen',
        judul: 'Tiga bagian terpisah',
        blok: [
          {
            jenis: 'tabel',
            judul: 'Bagian-bagian LANJUT',
            kepala: ['Bagian', 'Isi', 'Cara rilis'],
            baris: [
              ['Aplikasi', 'Expo (React Native) untuk Android. Basis kode yang sama juga bisa dibangun untuk web.', 'APK'],
              ['Server API', 'Node.js dan Express dengan basis data MySQL. Menyimpan akun, kemajuan, dan konten.', 'Terpisah dari aplikasi'],
              ['Website', 'Situs statis ini: Vite dan React, dirender menjadi HTML saat build.', 'Terpisah dari aplikasi'],
            ],
          },
        ],
      },
      {
        id: 'alur-data',
        judul: 'Alur data',
        blok: [
          {
            jenis: 'daftar',
            urut: true,
            butir: [
              'Aplikasi mengambil konten dan menyimpan kemajuan pengguna lewat server API. Sebagian besar layar butuh internet.',
              'Konten seleksi (Linimasa, Khusus SMK, profil prodi) disimpan di server bersama status pengecekannya.',
              'Fitur AI, bila aktif, dipanggil dari server ke penyedia AI pihak ketiga. Aplikasi tidak menghubungi penyedia AI secara langsung, dan fitur itu bisa dimatikan dari server.',
            ],
          },
        ],
      },
      {
        id: 'rilis-terpisah',
        judul: 'Website dan aplikasi dirilis terpisah',
        blok: [
          {
            jenis: 'p',
            teks: 'Website tidak berbagi siklus build dengan aplikasi. Daftar unduhan dibaca dari berkas metadata rilis, jadi APK baru cukup ditambahkan ke metadata lalu website dibangun ulang, tanpa membangun ulang aplikasi. Rinciannya di [Proses rilis](/docs/technical/releases).',
          },
        ],
      },
      {
        id: 'keamanan',
        judul: 'Keamanan website',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Website tidak memuat skrip, huruf, atau gambar dari pihak lain. Content Security Policy-nya hanya mengizinkan berkas sendiri.',
              'Tidak ada kunci API atau rahasia di kode website.',
              'Halaman penerus masuk Google meneruskan data masuk ke aplikasi tanpa mengirimnya ke server mana pun dan tanpa menyimpannya.',
            ],
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/technical/stack',
    kategori: 'teknis',
    judul: 'Stack teknologi',
    ringkasan: 'Teknologi yang dipakai untuk website, aplikasi, dan server LANJUT.',
    deskripsi: 'Teknologi website, aplikasi Android, dan server LANJUT.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'website',
        judul: 'Website',
        blok: [
          {
            jenis: 'tabel',
            judul: 'Teknologi website',
            kepala: ['Bagian', 'Pilihan', 'Catatan'],
            baris: [
              ['Bahasa', 'TypeScript', ''],
              ['Antarmuka', 'React 19', ''],
              ['Build', 'Vite 8', 'Setiap halaman dirender menjadi HTML statis saat build, jadi bisa dibuka langsung dari alamatnya.'],
              ['Gaya', 'CSS dengan design tokens', 'Tanpa kerangka CSS tambahan.'],
              ['Gerak', 'CSS dan IntersectionObserver', 'Mengikuti pengaturan kurangi gerakan di perangkat.'],
              ['Huruf', 'Inter (SIL Open Font License 1.1)', 'Disimpan bersama situs, tidak dimuat dari layanan luar.'],
              ['Tes', '`node:test`', 'Memeriksa build, tautan, metadata rilis, dan aturan keamanan.'],
            ],
          },
        ],
      },
      {
        id: 'aplikasi',
        judul: 'Aplikasi',
        blok: [
          {
            jenis: 'tabel',
            judul: 'Teknologi aplikasi',
            kepala: ['Bagian', 'Pilihan'],
            baris: [
              ['Kerangka', 'Expo SDK 57 dan React Native 0.86'],
              ['Navigasi', 'Expo Router'],
              ['Platform', 'Android (APK). Versi iPhone belum dibangun.'],
            ],
          },
        ],
      },
      {
        id: 'server',
        judul: 'Server',
        blok: [
          {
            jenis: 'tabel',
            judul: 'Teknologi server',
            kepala: ['Bagian', 'Pilihan'],
            baris: [
              ['Runtime', 'Node.js'],
              ['API', 'Express'],
              ['Basis data', 'MySQL'],
              ['Validasi dan keamanan', 'zod, helmet, pembatas laju permintaan'],
            ],
          },
        ],
      },
      {
        id: 'alasan',
        judul: 'Mengapa sesederhana ini',
        blok: [
          {
            jenis: 'p',
            teks: 'Website sengaja memakai sedikit dependensi: React, React DOM, dan Vite. Efek visual dibuat dengan CSS supaya halaman tetap ringan di HP kelas menengah.',
          },
        ],
      },
    ],
  },
  {
    jalur: 'docs/technical/releases',
    kategori: 'teknis',
    judul: 'Proses rilis',
    ringkasan: 'Bagaimana APK LANJUT dirilis, dan bagaimana kamu bisa memeriksa bahwa berkas yang kamu unduh asli.',
    deskripsi: 'Proses rilis APK LANJUT, metadata rilis, dan cara memeriksa checksum SHA-256.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'status',
        judul: 'Status sekarang',
        blok: [
          {
            jenis: 'catatan',
            nada: 'penting',
            teks: 'Belum ada rilis APK publik. Halaman [Download](/download) akan menampilkan versi terbaru setelah rilis publik pertama.',
          },
        ],
      },
      {
        id: 'langkah',
        judul: 'Langkah rilis',
        blok: [
          {
            jenis: 'daftar',
            urut: true,
            butir: [
              'APK dibangun dan ditandatangani dengan kunci rilis LANJUT. Kunci itu tidak pernah disimpan di repository.',
              'Ukuran berkas dan checksum SHA-256 dihitung dari berkas APK yang akan dibagikan, bukan disalin dari versi lain.',
              'APK diunggah ke penyimpanan yang bisa diakses publik tanpa login.',
              'Satu entri ditambahkan ke metadata rilis website: versi, tanggal, ringkasan, daftar perubahan, tautan APK, dan data teknis yang sudah diverifikasi.',
              'Website dibangun ulang. Build gagal bila metadata tidak lengkap, masih berisi contoh, atau tautannya tidak sah.',
              'Website diterbitkan, terpisah dari aplikasi.',
            ],
          },
        ],
      },
      {
        id: 'metadata',
        judul: 'Metadata rilis',
        blok: [
          {
            jenis: 'p',
            teks: 'Metadata disimpan sebagai JSON statis dan ikut diterbitkan di `releases/releases.json`. Kolom yang belum diverifikasi diisi `null` dan tampil sebagai "Belum diverifikasi", bukan diisi nilai perkiraan.',
          },
          {
            jenis: 'tabel',
            judul: 'Kolom metadata rilis',
            kepala: ['Kolom', 'Isi'],
            baris: [
              ['`version`', 'Nomor versi X.Y.Z, unik.'],
              ['`releaseDate`', 'Tanggal rilis (YYYY-MM-DD).'],
              ['`channel`', '`stable` atau `beta`.'],
              ['`title`, `summary`', 'Judul dan ringkasan rilis.'],
              ['`apkUrl`', 'Tautan https ke berkas .apk publik, atau berkas .apk di situs ini.'],
              ['`fileSizeBytes`', 'Ukuran berkas dalam byte, dihitung dari berkasnya.'],
              ['`minAndroidVersion`', 'Versi Android minimum, hanya bila sudah diuji.'],
              ['`sha256`', 'Checksum SHA-256 berkas APK.'],
              ['`changes`, `knownIssues`', 'Daftar perubahan dan masalah yang diketahui.'],
            ],
          },
        ],
      },
      {
        id: 'periksa-apk',
        judul: 'Memeriksa APK yang kamu unduh',
        blok: [
          { jenis: 'p', teks: 'Bila halaman rilis mencantumkan SHA-256, cocokkan dengan checksum berkas yang kamu unduh di komputer:' },
          {
            jenis: 'daftar',
            butir: ['Windows (PowerShell): `Get-FileHash lanjut.apk -Algorithm SHA256`', 'macOS atau Linux: `shasum -a 256 lanjut.apk`'],
          },
          { jenis: 'p', teks: 'Ganti `lanjut.apk` dengan nama berkas yang kamu unduh. Bila hasilnya tidak sama, jangan pasang berkas itu.' },
        ],
      },
      {
        id: 'versi-lama',
        judul: 'Versi lama',
        blok: [{ jenis: 'p', teks: 'Versi lama tetap tercantum di riwayat selama berkas dan datanya masih tersedia.' }],
      },
    ],
  },
  {
    jalur: 'docs/faq',
    kategori: 'bantuan',
    judul: 'Pertanyaan umum',
    ringkasan: 'Jawaban singkat untuk pertanyaan yang paling sering muncul tentang LANJUT.',
    deskripsi: 'Pertanyaan umum tentang LANJUT: biaya, jenjang, unduhan APK, AI, dan data.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'apa-itu',
        judul: 'Apa itu LANJUT?',
        blok: [
          {
            jenis: 'p',
            teks: 'Aplikasi Android yang membantu siswa memahami jalur menuju kuliah dan langkah persiapannya. Lihat [Gambaran umum](/docs/product/overview).',
          },
        ],
      },
      {
        id: 'biaya',
        judul: 'Apakah LANJUT berbayar?',
        blok: [
          {
            jenis: 'p',
            teks: 'Versi uji dipakai tanpa biaya, dan belum ada sistem pembayaran di aplikasi. Model bisnis ke depan masih [hipotesis](/docs/business/model).',
          },
        ],
      },
      {
        id: 'jenjang',
        judul: 'Apakah hanya untuk siswa SMK?',
        blok: [
          {
            jenis: 'p',
            teks: 'Fokus awal kami siswa SMK kelas XII. Siswa SMA, MA, dan SMP sudah bisa memakai sebagian fitur versi uji. Fitur kelas 12 seperti Linimasa dan Jalur Saya juga berlaku untuk siswa SMA dan MA kelas 12.',
          },
        ],
      },
      {
        id: 'unduh',
        judul: 'Di mana saya bisa mengunduh LANJUT?',
        blok: [
          {
            jenis: 'p',
            teks: 'Hanya dari halaman [Download](/download) di situs ini. Saat ini belum ada rilis publik.',
          },
        ],
      },
      {
        id: 'play-store',
        judul: 'Apakah ada di Play Store atau iPhone?',
        blok: [{ jenis: 'p', teks: 'Belum. LANJUT saat ini hanya untuk Android dalam bentuk APK, dan versi iPhone belum dibangun.' }],
      },
      {
        id: 'peringatan-apk',
        judul: 'Kenapa HP memberi peringatan saat memasang APK?',
        blok: [
          {
            jenis: 'p',
            teks: 'Android memperingatkan setiap aplikasi yang tidak dipasang dari Play Store. Lanjutkan hanya bila berkasnya kamu unduh dari halaman resmi LANJUT, dan cocokkan SHA-256 bila tersedia. Langkahnya ada di [cara memasang](/download#cara-pasang).',
          },
        ],
      },
      {
        id: 'ai',
        judul: 'Apakah AI LANJUT sudah bisa dipakai?',
        blok: [{ jenis: 'p', teks: 'Belum. Layar Ngobrol ada di aplikasi, tetapi jawaban AI belum aktif. Lihat [AI LANJUT](/ai).' }],
      },
      {
        id: 'ketepatan',
        judul: 'Apakah informasi di LANJUT pasti benar?',
        blok: [
          {
            jenis: 'p',
            teks: 'LANJUT merujuk sumber resmi dan menandai butir yang belum dicek. Tetap cocokkan informasi seleksi dengan laman resminya dan dengan guru BK sebelum memutuskan.',
          },
        ],
      },
      {
        id: 'data',
        judul: 'Data apa yang disimpan?',
        blok: [
          {
            jenis: 'p',
            teks: 'Aplikasi menyimpan data akun dan kemajuanmu. Rinciannya ada di [kebijakan privasi aplikasi](/privacy/app), yang masih DRAF. Website ini tidak memakai cookie atau pelacak. Lihat [Privasi situs](/privacy).',
          },
        ],
      },
      {
        id: 'menguji',
        judul: 'Bagaimana cara ikut menguji atau melaporkan masalah?',
        blok: [{ jenis: 'p', teks: 'Baca [Panduan uji](/docs/testing).' }],
      },
      {
        id: 'pembuat',
        judul: 'Siapa yang membuat LANJUT?',
        blok: [{ jenis: 'p', teks: 'LANJUT dikembangkan oleh EDILAKSO Group.' }],
      },
    ],
  },
  {
    jalur: 'docs/testing',
    kategori: 'bantuan',
    judul: 'Panduan uji',
    ringkasan: 'Terima kasih sudah mau mencoba LANJUT. Urutan di bawah butuh sekitar 15 menit.',
    deskripsi: 'Urutan yang dicoba saat menguji aplikasi LANJUT versi uji dan cara melaporkan masalah.',
    diperbarui: DIPERBARUI,
    bagian: [
      {
        id: 'sebelum-mulai',
        judul: 'Sebelum mulai',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'HP Android dengan internet. Cara memasang APK ada di [halaman Download](/download#cara-pasang).',
              'Pakai akun uji yang diberikan tim. Jangan memakai nama lengkap, nomor HP, atau data pribadi lain yang tidak diminta.',
              'Kalau diminta, kamu bisa masuk dengan kata sandi, dengan kode yang dikirim ke email akun, atau dengan Google bila tombolnya tampil.',
            ],
          },
        ],
      },
      {
        id: 'urutan',
        judul: 'Urutan yang dicoba',
        blok: [
          {
            jenis: 'daftar',
            urut: true,
            butir: [
              '**Masuk** dengan akun uji. Pastikan kamu sampai di Beranda.',
              '**Beranda**: lihat apakah isinya cocok dengan kelasmu.',
              '**Jalur Saya** (kelas 12): jawab pertanyaannya, lalu lihat tahap dan langkah berikutnya.',
              '**Eksplorasi Kampus**: pilih bidang yang kamu minati, lalu simpan.',
              '**Pilih Mapel** (kelas 12) atau **Mapel Saya** (kelas 7–11): pilih mapel, lalu simpan.',
              '**Arsip Belajar**: tulis dua atau tiga kartu catatan atau soal.',
              '**Latihan**: kerjakan beberapa kartu, lalu buka Level-In.',
              '**Ngobrol**: buka layarnya. Fitur AI memang belum aktif di versi uji.',
              '**Keluar** dari akun, lalu masuk lagi.',
            ],
          },
        ],
      },
      {
        id: 'belum-ada',
        judul: 'Yang sengaja belum ada',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Jawaban AI di Ngobrol.',
              'Persiapan Event sekolah.',
              'Tombol mikrofon.',
              'Sebagian besar konten yang sudah dicek ke sumber resmi. Yang belum dicek ditandai di aplikasi.',
            ],
          },
        ],
      },
      {
        id: 'tidak-tersambung',
        judul: 'Kalau aplikasi tidak tersambung',
        blok: [
          {
            jenis: 'daftar',
            butir: [
              'Pastikan internetmu menyala, lalu tutup dan buka lagi aplikasinya.',
              'Server uji bisa saja sedang dimatikan. Tunggu sebentar, lalu coba lagi.',
              'Kalau tetap tidak bisa, beri tahu tim atau gurumu beserta jam kejadiannya.',
            ],
          },
        ],
      },
      {
        id: 'lapor',
        judul: 'Melaporkan masalah',
        blok: [
          {
            jenis: 'p',
            teks: 'Catat apa yang kamu lakukan, apa yang terjadi, serta merek dan tipe HP-mu. Kirim ke tim LANJUT atau gurumu. Tangkapan layar boleh, asal tidak memuat data pribadi.',
          },
        ],
      },
    ],
  },
];

export const artikel = (jalur: string): Artikel | undefined => ARTIKEL.find((a) => a.jalur === jalur);

export const artikelKategori = (id: IdKategori): Artikel[] => ARTIKEL.filter((a) => a.kategori === id);
