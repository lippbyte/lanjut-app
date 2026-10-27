import { FITUR, type StatusFitur } from './fitur';

// Glosarium /docs/glossary. Semua teks DRAF, belum disetujui PM. Setiap definisi paling banyak
// dua kalimat. Istilah yang menyangkut aturan seleksi (kelompok 'seleksi') wajib punya sumber
// resmi, tanggal dicek, dan tahun ketentuan yang dirujuk: aturan seleksi bisa berubah tiap tahun.
// Istilah aplikasi diambil dari konten/fitur.ts supaya status fiturnya tidak berbeda.

export type KelompokIstilah = 'seleksi' | 'kuliah' | 'sekolah' | 'aplikasi';

export const LABEL_KELOMPOK: Record<KelompokIstilah, string> = {
  seleksi: 'Masuk kuliah',
  kuliah: 'Perguruan tinggi',
  sekolah: 'Sekolah',
  aplikasi: 'Aplikasi LANJUT',
};

export type Sumber = { label: string; url: string };

export type Istilah = {
  id: string;
  istilah: string;
  /** Kepanjangan singkatan, hanya bila tertulis di sumber resmi atau baku. */
  panjang?: string;
  kelompok: KelompokIstilah;
  definisi: string;
  /** Wajib untuk kelompok 'seleksi'. */
  sumber?: Sumber[];
  /** Tanggal sumber dibuka dan dicocokkan (YYYY-MM-DD). */
  dicek?: string;
  /** Tahun ketentuan yang dirujuk sumbernya. */
  ketentuan?: string;
  status?: StatusFitur;
  terkait?: string[];
};

const DICEK = '2026-10-27';

/** Sumber resmi yang dirujuk. Hanya domain penyelenggara (snpmb.id dan *.go.id). */
export const SUMBER = {
  snbp: { label: 'SNPMB · Informasi Umum SNBP', url: 'https://snpmb.id/snbp/informasi-umum' },
  snbt: { label: 'SNPMB · Informasi Umum UTBK-SNBT', url: 'https://snpmb.id/utbk-snbt/informasi-umum' },
  snpmb: { label: 'SNPMB · Tentang SNPMB', url: 'https://snpmb.id/snpmb' },
  faq: { label: 'SNPMB · FAQ', url: 'https://snpmb.id/faq' },
  materi: { label: 'Halo SNPMB · Materi tes SNBT', url: 'https://halo.snpmb.id/helpdesk/id/blog/apa-saja-materi-yang-diujikan-untuk-snbt' },
  tka: { label: 'Kemendikdasmen · Portal TKA', url: 'https://tka.kemendikdasmen.go.id/' },
  kip: { label: 'Kemdiktisaintek · Panduan KIP Kuliah', url: 'https://kip-kuliah.kemdiktisaintek.go.id/panduan' },
} satisfies Record<string, Sumber>;

const seleksi = (x: Omit<Istilah, 'kelompok' | 'dicek' | 'ketentuan'> & { ketentuan?: string }): Istilah => ({
  kelompok: 'seleksi',
  dicek: DICEK,
  ketentuan: x.ketentuan ?? 'SNPMB 2026',
  ...x,
});

const ISTILAH_TULIS: Istilah[] = [
  // ---- Masuk kuliah (sumber resmi wajib) ----
  seleksi({
    id: 'snpmb',
    istilah: 'SNPMB',
    panjang: 'Seleksi Nasional Penerimaan Mahasiswa Baru',
    definisi:
      'Panitia yang dibentuk Mendiktisaintek bersama MRPTNI untuk menyiapkan dan melaksanakan tes masuk PTN. SNPMB mengelola jalur SNBP dan SNBT, sedangkan jalur mandiri diselenggarakan PTN.',
    sumber: [SUMBER.snpmb, SUMBER.faq],
    terkait: ['snbp', 'snbt', 'seleksi-mandiri'],
  }),
  seleksi({
    id: 'snbp',
    istilah: 'SNBP',
    panjang: 'Seleksi Nasional Berdasarkan Prestasi',
    definisi:
      'Jalur masuk PTN berdasarkan penelusuran prestasi akademik memakai rapor. Pada 2026 pesertanya siswa SMA, SMK, atau MA kelas terakhir yang berprestasi unggul dan punya nilai TKA.',
    sumber: [SUMBER.snbp],
    terkait: ['siswa-eligible', 'pdss', 'tka', 'mapel-pendukung'],
  }),
  seleksi({
    id: 'snbt',
    istilah: 'SNBT',
    definisi:
      'Jalur masuk PTN berdasarkan hasil UTBK. Pada 2026 jalur ini terbuka untuk siswa kelas terakhir serta lulusan SMA, SMK, MA, atau sederajat tahun 2024 dan 2025.',
    sumber: [SUMBER.snbt],
    terkait: ['utbk', 'tps'],
  }),
  seleksi({
    id: 'utbk',
    istilah: 'UTBK',
    panjang: 'Ujian Tulis Berbasis Komputer',
    definisi:
      'Tes yang dilaksanakan SNPMB, terdiri dari Tes Potensi Skolastik dan Tes Literasi, yang hasilnya menjadi dasar seleksi SNBT. Pada 2026 setiap peserta hanya boleh mengikuti UTBK satu kali.',
    sumber: [SUMBER.snpmb, SUMBER.snbt],
    terkait: ['snbt', 'tps'],
  }),
  seleksi({
    id: 'tps',
    istilah: 'TPS',
    panjang: 'Tes Potensi Skolastik',
    definisi:
      'Salah satu materi tes SNBT, bersama Penalaran Matematika, Literasi dalam Bahasa Indonesia, dan Literasi dalam Bahasa Inggris.',
    sumber: [SUMBER.materi, SUMBER.snbt],
    terkait: ['utbk'],
  }),
  seleksi({
    id: 'tka',
    istilah: 'TKA',
    panjang: 'Tes Kemampuan Akademik',
    definisi:
      'Penilaian terstandar dari Kemendikdasmen untuk melaporkan capaian akademik setiap murid. Nilai TKA menjadi salah satu syarat SNBP 2026.',
    sumber: [SUMBER.tka, SUMBER.snbp],
    terkait: ['snbp'],
  }),
  seleksi({
    id: 'pdss',
    istilah: 'PDSS',
    panjang: 'Pangkalan Data Sekolah dan Siswa',
    definisi:
      'Tempat sekolah mengisi rapor siswa eligible untuk SNBP. Kebenaran data siswa di PDSS menjadi tanggung jawab kepala sekolah.',
    sumber: [SUMBER.snbp],
    terkait: ['siswa-eligible', 'snbp'],
  }),
  seleksi({
    id: 'siswa-eligible',
    istilah: 'Siswa eligible',
    definisi:
      'Siswa yang masuk pemeringkatan sekolah sesuai kuota akreditasi sekolah, sehingga bisa mendaftar SNBP. Pemeringkatannya memakai rerata nilai rapor semester 1 sampai 5.',
    sumber: [SUMBER.faq],
    terkait: ['pdss', 'snbp'],
  }),
  seleksi({
    id: 'nisn',
    istilah: 'NISN',
    panjang: 'Nomor Induk Siswa Nasional',
    definisi: 'Nomor identitas setiap siswa. Untuk mendaftar SNBP 2026, siswa wajib punya NISN dan terdaftar di PDSS.',
    sumber: [SUMBER.snbp],
    terkait: ['pdss'],
  }),
  seleksi({
    id: 'mapel-pendukung',
    istilah: 'Mapel pendukung',
    definisi:
      'Mata pelajaran yang mendukung program studi tujuan. Di SNBP 2026, nilai rapor paling banyak dua mapel pendukung ikut dihitung, dengan bobot yang ditetapkan tiap PTN.',
    sumber: [SUMBER.snbp],
    terkait: ['prodi', 'snbp'],
  }),
  seleksi({
    id: 'prodi',
    istilah: 'Prodi',
    panjang: 'Program studi',
    definisi:
      'Bidang ilmu yang kamu pilih saat mendaftar kuliah. Di SNBP 2026 kamu bisa memilih dua prodi dari satu atau dua PTN, dan bila memilih dua, salah satunya harus di provinsi sekolahmu.',
    sumber: [SUMBER.snbp],
    terkait: ['mapel-pendukung', 'portofolio'],
  }),
  seleksi({
    id: 'portofolio',
    istilah: 'Portofolio',
    definisi:
      'Berkas karya yang wajib diunggah pendaftar prodi bidang Seni dan Olahraga di SNBP dan UTBK-SNBT 2026. Format dan cara pengisiannya mengikuti ketentuan tiap prodi.',
    sumber: [SUMBER.snbp, SUMBER.faq],
    terkait: ['prodi'],
  }),
  seleksi({
    id: 'seleksi-mandiri',
    istilah: 'Seleksi mandiri',
    definisi:
      'Jalur masuk yang diselenggarakan oleh satu PTN atau beberapa PTN, di luar SNBP dan SNBT. Ketentuannya ditetapkan tiap PTN, jadi cek laman resmi kampus tujuanmu.',
    sumber: [SUMBER.faq],
    terkait: ['snpmb', 'ptn'],
  }),
  seleksi({
    id: 'ptn',
    istilah: 'PTN',
    panjang: 'Perguruan Tinggi Negeri',
    definisi: 'Perguruan tinggi yang diselenggarakan pemerintah. SNBP dan SNBT adalah jalur seleksi nasional untuk masuk PTN.',
    sumber: [SUMBER.snpmb],
    terkait: ['snbp', 'snbt', 'seleksi-mandiri'],
  }),
  seleksi({
    id: 'kip-kuliah',
    istilah: 'KIP Kuliah',
    panjang: 'Kartu Indonesia Pintar Kuliah',
    definisi:
      'Bantuan biaya pendidikan dari pemerintah bagi lulusan SMA atau sederajat yang berpotensi akademik baik tetapi terkendala ekonomi. KIP Kuliah bukan jalur masuk: penerimanya tetap harus lulus seleksi masuk perguruan tinggi.',
    sumber: [SUMBER.kip, SUMBER.faq],
    ketentuan: 'KIP Kuliah 2026',
  }),

  // ---- Perguruan tinggi dan sekolah (istilah umum, bukan aturan seleksi) ----
  {
    id: 'pts',
    istilah: 'PTS',
    panjang: 'Perguruan Tinggi Swasta',
    kelompok: 'kuliah',
    definisi: 'Perguruan tinggi yang diselenggarakan masyarakat, misalnya melalui yayasan.',
    terkait: ['ptn'],
  },
  {
    id: 's1',
    istilah: 'S1',
    panjang: 'Sarjana',
    kelompok: 'kuliah',
    definisi: 'Program pendidikan akademik jenjang sarjana di perguruan tinggi.',
    terkait: ['d4'],
  },
  {
    id: 'pendidikan-vokasi',
    istilah: 'Pendidikan vokasi',
    kelompok: 'kuliah',
    definisi: 'Pendidikan tinggi yang menyiapkan keahlian terapan untuk dunia kerja, misalnya program diploma di politeknik.',
    terkait: ['politeknik', 'd3', 'd4'],
  },
  {
    id: 'politeknik',
    istilah: 'Politeknik',
    kelompok: 'kuliah',
    definisi: 'Perguruan tinggi yang menyelenggarakan pendidikan vokasi, misalnya program D3 dan D4.',
    terkait: ['pendidikan-vokasi', 'd3', 'd4'],
  },
  {
    id: 'd3',
    istilah: 'D3',
    panjang: 'Diploma Tiga',
    kelompok: 'kuliah',
    definisi: 'Program pendidikan vokasi jenjang diploma tiga.',
    terkait: ['d4', 'politeknik'],
  },
  {
    id: 'd4',
    istilah: 'D4',
    panjang: 'Diploma Empat atau Sarjana Terapan',
    kelompok: 'kuliah',
    definisi: 'Program pendidikan vokasi jenjang sarjana terapan.',
    terkait: ['d3', 's1', 'politeknik'],
  },
  {
    id: 'pkl',
    istilah: 'PKL',
    panjang: 'Praktik Kerja Lapangan',
    kelompok: 'sekolah',
    definisi: 'Kegiatan belajar siswa SMK langsung di tempat kerja, misalnya di perusahaan atau industri.',
    terkait: ['sertifikat-kompetensi'],
  },
  {
    id: 'sertifikat-kompetensi',
    istilah: 'Sertifikat kompetensi',
    kelompok: 'sekolah',
    definisi: 'Bukti tertulis bahwa kamu sudah lulus uji keahlian di bidang tertentu.',
    terkait: ['pkl'],
  },
];

// ---- Aplikasi LANJUT: dari konten/fitur.ts (nama, kalimat singkat, status) ----
const ISTILAH_APLIKASI: Istilah[] = FITUR.map((f) => ({
  id: `aplikasi-${f.id}`,
  istilah: f.nama,
  kelompok: 'aplikasi',
  definisi: f.catatanSingkat ? `${f.singkat} ${f.catatanSingkat}` : f.singkat,
  status: f.status,
}));

/** Urut abjad (bahasa Indonesia, tanpa beda huruf besar/kecil). */
export const ISTILAH: Istilah[] = [...ISTILAH_TULIS, ...ISTILAH_APLIKASI].sort((a, b) =>
  a.istilah.localeCompare(b.istilah, 'id', { sensitivity: 'base' })
);

/** Huruf pertama untuk pengelompokan dan filter huruf. */
export const hurufAwal = (i: Istilah): string => i.istilah.charAt(0).toLocaleUpperCase('id');

export const ABJAD = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

/** Teks yang dicocokkan pencarian: istilah, kepanjangan, dan definisinya, tanpa beda huruf/aksen. */
export const normalkan = (t: string): string =>
  t
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLocaleLowerCase('id')
    .replace(/\s+/g, ' ')
    .trim();

export const cocok = (i: Istilah, kueri: string): boolean => {
  const q = normalkan(kueri);
  if (!q) return true;
  return normalkan(`${i.istilah} ${i.panjang ?? ''} ${i.definisi}`).includes(q);
};
