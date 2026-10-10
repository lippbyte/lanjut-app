// Penentu kartu Beranda per jenjang (LANJUT_064).
// Cermin dari LANJUT_App/lib/beranda.ts untuk pengujian server.

function kelompokJenjang(kelas) {
  if (kelas === '7' || kelas === '8' || kelas === '9') return 'smp';
  if (kelas === '10' || kelas === '11') return 'kelas10_11';
  if (kelas === '12') return 'kelas12';
  return null;
}

const KARTU_ARSIP = {
  id: 'arsip',
  judul: 'Arsip Belajar',
  keterangan: 'Catatan dan soal buatanmu, disimpan per mapel.',
  ikon: 'mapel',
  href: '/arsip',
};

const KARTU_LEVEL_IN = {
  id: 'level-in',
  judul: 'Level-In',
  keterangan: 'Seberapa kuat kamu di tiap mapel, dari latihanmu.',
  ikon: 'ok',
  href: '/level-in',
};

const KARTU_NGOBROL = {
  id: 'ngobrol',
  judul: 'Ngobrol Bareng LANJUT',
  keterangan: 'Cerita soal minat, cara belajar, atau rencana kuliahmu.',
  ikon: 'obrolan',
  href: '/ngobrol',
};

const KARTU_CERITA_ALUMNI = {
  id: 'cerita-alumni',
  judul: 'Cerita Alumni',
  keterangan: 'Mereka sudah lewat jalan ini.',
  ikon: 'alumni',
  href: '/cerita-alumni',
  varian: 'outline',
};

const KARTU_CEK_POSISI = {
  id: 'cek-posisi',
  judul: 'Cek Posisi Gue',
  keterangan: 'Lihat kamu lagi di tahap mana dan langkah yang cocok berikutnya.',
  ikon: 'posisi',
  href: '/cek-posisi',
};

const KARTU_PILIH_MAPEL = {
  id: 'pilih-mapel',
  judul: 'Pilih Mapel',
  keterangan: 'Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu.',
  ikon: 'mapel',
  href: '/pilih-mapel',
};

const KARTU_EKSPLORASI_TUJUAN = {
  id: 'eksplorasi-tujuan',
  judul: 'Eksplorasi Tujuan',
  keterangan: 'Intip prodi kuliah: belajar apa dan lulusannya kerja di mana.',
  ikon: 'posisi',
  href: '/eksplorasi-tujuan',
};

const KARTU_GAYA_BELAJAR = {
  id: 'gaya-belajar',
  judul: 'Gaya Belajar',
  keterangan: 'Kenali cara belajar yang paling nyambung buat kamu.',
  ikon: 'info',
  href: '/gaya-belajar',
};

const KARTU_DAFTAR_PERIKSA = {
  id: 'daftar-periksa',
  judul: 'Daftar Periksa',
  keterangan: 'Satu per satu, tidak perlu sekaligus.',
  ikon: 'checklist',
  href: '/daftar-periksa',
};

function daftarKartuBeranda(kelas) {
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

  return [
    KARTU_ARSIP,
    KARTU_LEVEL_IN,
    KARTU_NGOBROL,
    KARTU_CERITA_ALUMNI,
  ];
}

module.exports = {
  kelompokJenjang,
  daftarKartuBeranda,
  KARTU_ARSIP,
  KARTU_LEVEL_IN,
  KARTU_NGOBROL,
  KARTU_CERITA_ALUMNI,
  KARTU_CEK_POSISI,
  KARTU_PILIH_MAPEL,
  KARTU_EKSPLORASI_TUJUAN,
  KARTU_GAYA_BELAJAR,
  KARTU_DAFTAR_PERIKSA,
};
