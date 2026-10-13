import type { Kelas } from './jenjang';
import { kelompokJenjang } from './jenjang';
import type { NamaIkon } from '../components/ui/Ikon';

export type KartuBeranda = {
  id: string;
  judul: string;
  labelPendek?: string;
  keterangan: string;
  ikon: NamaIkon;
  href: string;
  varian?: 'biasa' | 'soft' | 'outline';
};

/**
 * Kartu pintu Beranda (LANJUT_064, LANJUT_065).
 * Judul netral "Cerita Alumni" menggantikan "Cerita Alumni SMK".
 * labelPendek digunakan pada tampilan grid launcher Beranda (LANJUT_065).
 */
export const KARTU_ARSIP: KartuBeranda = {
  id: 'arsip',
  judul: 'Arsip Belajar',
  labelPendek: 'Arsip Belajar',
  keterangan: 'Catatan dan soal buatanmu, disimpan per mapel.',
  ikon: 'mapel',
  href: '/arsip',
};

export const KARTU_LEVEL_IN: KartuBeranda = {
  id: 'level-in',
  judul: 'Level-In',
  labelPendek: 'Level-In',
  keterangan: 'Seberapa kuat kamu di tiap mapel, dari latihanmu.',
  ikon: 'ok',
  href: '/level-in',
};

export const KARTU_NGOBROL: KartuBeranda = {
  id: 'ngobrol',
  judul: 'Ngobrol Bareng LANJUT',
  labelPendek: 'Ngobrol Bareng',
  keterangan: 'Cerita soal minat, cara belajar, atau rencana kuliahmu.',
  ikon: 'obrolan',
  href: '/ngobrol',
};

export const KARTU_CERITA_ALUMNI: KartuBeranda = {
  id: 'cerita-alumni',
  judul: 'Cerita Alumni',
  labelPendek: 'Cerita Alumni',
  keterangan: 'Mereka sudah lewat jalan ini.',
  ikon: 'alumni',
  href: '/cerita-alumni',
  varian: 'outline',
};

export const KARTU_CEK_POSISI: KartuBeranda = {
  id: 'cek-posisi',
  judul: 'Cek Posisi Gue',
  labelPendek: 'Cek Posisi',
  keterangan: 'Lihat kamu lagi di tahap mana dan langkah yang cocok berikutnya.',
  ikon: 'posisi',
  href: '/cek-posisi',
};

export const KARTU_PILIH_MAPEL: KartuBeranda = {
  id: 'pilih-mapel',
  judul: 'Pilih Mapel',
  labelPendek: 'Pilih Mapel',
  keterangan: 'Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu.',
  ikon: 'mapel',
  href: '/pilih-mapel',
};

export const KARTU_EKSPLORASI_TUJUAN: KartuBeranda = {
  id: 'eksplorasi-tujuan',
  judul: 'Eksplorasi Tujuan',
  labelPendek: 'Eksplorasi Tujuan',
  keterangan: 'Intip prodi kuliah: belajar apa dan lulusannya kerja di mana.',
  ikon: 'posisi',
  href: '/eksplorasi-tujuan',
};

export const KARTU_GAYA_BELAJAR: KartuBeranda = {
  id: 'gaya-belajar',
  judul: 'Gaya Belajar',
  labelPendek: 'Gaya Belajar',
  keterangan: 'Kenali cara belajar yang paling nyambung buat kamu.',
  ikon: 'info',
  href: '/gaya-belajar',
};

export const KARTU_DAFTAR_PERIKSA: KartuBeranda = {
  id: 'daftar-periksa',
  judul: 'Daftar Periksa',
  labelPendek: 'Daftar Periksa',
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

export type InfoMulaiDariSini = {
  judul: string;
  penjelas: string;
  labelTombol: string;
  href: string;
};

/**
 * Informasi Kartu "Mulai dari Sini" per jenjang (LANJUT_065 §B).
 * Teks berstatus DRAF dan dicatat di docs/salinan-teks-lanjut.md.
 */
export function infoMulaiDariSini(kelas: Kelas | null | undefined): InfoMulaiDariSini {
  const kelompok = kelompokJenjang(kelas);

  if (kelompok === 'smp') {
    return {
      judul: 'Mulai dari Sini',
      penjelas: 'Kenali minat, cara belajar, dan pilihan jenjang berikutnya pelan-pelan.',
      labelTombol: 'Buka Jenjang Saya',
      href: '/jenjang-saya',
    };
  }

  if (kelompok === 'kelas10_11') {
    return {
      judul: 'Mulai dari Sini',
      penjelas: 'Lihat mata pelajaran pendukung yang cocok untuk jurusan incaranmu.',
      labelTombol: 'Pilih Mapel',
      href: '/pilih-mapel',
    };
  }

  if (kelompok === 'kelas12') {
    return {
      judul: 'Mulai dari Sini',
      penjelas: 'Cek posisi persiapanmu sekarang dan langkah yang perlu diambil.',
      labelTombol: 'Cek Posisi Gue',
      href: '/cek-posisi',
    };
  }

  return {
    judul: 'Mulai dari Sini',
    penjelas: 'Mulai kenali pilihan jenjang dan arah langkahmu.',
    labelTombol: 'Buka Jenjang Saya',
    href: '/jenjang-saya',
  };
}

/**
 * Sapaan paling atas Beranda (LANJUT_072, TEKS DRAF — salinan-teks-lanjut.md
 * §4.1): "Halo, {nama_tampilan}", jatuh ke nama_pengguna bila nama tampilan
 * kosong, dan "Halo" saja (tanpa koma) bila keduanya kosong.
 */
export function teksSapaan(
  pengguna: { nama_tampilan?: string | null; nama_pengguna?: string | null } | null | undefined
): string {
  const nama = pengguna?.nama_tampilan?.trim() || pengguna?.nama_pengguna?.trim() || '';
  return nama ? `Halo, ${nama}` : 'Halo';
}

export type BagianBeranda = 'sapaan' | 'judul' | 'progres' | 'grid' | 'mulai_dari_sini' | 'tenggat' | 'info_penting';

/**
 * Urutan bagian Beranda dari atas ke bawah (LANJUT_072; keputusan Khalifa:
 * urutan "berkelompok"). Empat bagian yang disebut task berurutan sapaan →
 * grid → "Mulai dari Sini" → Info Penting; bagian lain ikut bagian terdekatnya:
 * judul K1 di bawah sapaan, baris progres tepat di atas grid (LANJUT_065), dan
 * kartu tenggat menempel di atas Info Penting (keduanya hanya kelas 12, LANJUT_066).
 * Setiap bagian paling banyak muncul sekali.
 */
export function urutanBeranda(data: { kelas?: Kelas | null; tampilMulaiDariSini: boolean }): BagianBeranda[] {
  const urutan: BagianBeranda[] = ['sapaan', 'judul', 'progres', 'grid'];
  if (data.tampilMulaiDariSini) urutan.push('mulai_dari_sini');
  if (kelompokJenjang(data.kelas) === 'kelas12') urutan.push('tenggat', 'info_penting');
  return urutan;
}

type BarisCentang = { selesai_pada: string | null };

/**
 * Jumlah centang Daftar Periksa milik akun (LANJUT_070): butir umum di
 * /kemajuan DITAMBAH butir pribadi di /butir-pribadi. Siswa kelas 7–11 hanya
 * melihat butir pribadi di Daftar Periksa (LANJUT_035), jadi centang mereka
 * tidak pernah masuk /kemajuan. Kedua endpoint sudah memfilter per akun.
 * Satu-satunya tempat aturan ini; dipakai progres dan penanda kemajuan.
 */
export function hitungJumlahCentang(data: {
  kemajuan?: readonly BarisCentang[] | null;
  butirPribadi?: readonly BarisCentang[] | null;
}): number {
  const selesai = (daftar?: readonly BarisCentang[] | null) => (daftar ?? []).filter((b) => b.selesai_pada).length;
  return selesai(data.kemajuan) + selesai(data.butirPribadi);
}

/**
 * Kriteria kemajuan pengguna (LANJUT_065 §B).
 * Kartu "Mulai dari Sini" hilang bila pengguna sudah memiliki kemajuan
 * (ada centang Daftar Periksa, pernah coba latihan, atau ada kartu di arsip).
 * `jumlahCentang` berasal dari hitungJumlahCentang (LANJUT_070).
 */
export function apakahPunyaKemajuan(data: {
  jumlahCentang?: number;
  jumlahLatihan?: number;
  jumlahKartu?: number;
}): boolean {
  return (
    (data.jumlahCentang ?? 0) > 0 ||
    (data.jumlahLatihan ?? 0) > 0 ||
    (data.jumlahKartu ?? 0) > 0
  );
}

export type LangkahProgres = {
  id: string;
  label: string;
  selesai: boolean;
};

export type HasilProgresBeranda = {
  selesai: number;
  total: number;
  langkah: LangkahProgres[];
};

/**
 * Hitungan progres sederhana Beranda (LANJUT_065 §C, diperbaiki LANJUT_067 §A).
 *
 * Langkah "isi_kelas" dihapus pada LANJUT_067 karena onboarding mewajibkan
 * pengisian kelas, sehingga setiap pengguna baru tampak "1 dari 4".
 *
 * Dihitung dari 3 langkah yang benar-benar bisa diubah oleh pengguna:
 * 1. Isi prodi impian: pengguna.prodi_impian terisi di akun
 * 2. Centang Daftar Periksa: minimal 1 butir terselesaikan di /kemajuan atau
 *    di butir pribadi (LANJUT_070, lewat hitungJumlahCentang)
 * 3. Coba Latihan: minimal 1 sesi latihan di /sesi-latihan
 *
 * Catatan penting (LANJUT_065 §C):
 * Langkah "buka Arsip" tidak dihitung karena server tidak memiliki pencatatan
 * pembukaan layar/navigasi (tidak ada tabel pelacakan telemetri buka halaman).
 */
export function hitungProgresBeranda(data: {
  prodiImpian?: string | null;
  jumlahCentang?: number;
  jumlahLatihan?: number;
}): HasilProgresBeranda {
  const langkah: LangkahProgres[] = [
    {
      id: 'isi_prodi_impian',
      label: 'Isi prodi impian',
      selesai: Boolean(data.prodiImpian && data.prodiImpian.trim() !== ''),
    },
    {
      id: 'centang_daftar_periksa',
      label: 'Centang Daftar Periksa',
      selesai: (data.jumlahCentang ?? 0) > 0,
    },
    {
      id: 'coba_latihan',
      label: 'Coba Latihan',
      selesai: (data.jumlahLatihan ?? 0) > 0,
    },
  ];

  const selesai = langkah.filter((l) => l.selesai).length;
  return {
    selesai,
    total: langkah.length,
    langkah,
  };
}
