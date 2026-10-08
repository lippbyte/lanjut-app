import { ApiError } from '../api/client';

// Ngobrol Bareng LANJUT dengan AI (LANJUT_051).
// Salinan teks §4.15 — DRAF belum disetujui Khalifa.
export const TEKS_NGOBROL = {
  catatanAi: 'Dijawab AI, jadi bisa keliru. Cek lagi info penting ke sumber resmi. LANJUT tidak menyimpan obrolan ini; obrolan hilang saat aplikasi ditutup.',
  terkunciJudul: 'Fitur AI belum aktif untuk akunmu',
  terkunciIsi:
    'Ngobrol Bareng LANJUT dijawab AI dari penyedia pihak ketiga. Fitur ini baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah, dan kamu sudah menerima kebijakan privasi.',
  belumBisaDimuat: 'Status fitur AI belum bisa dimuat. Coba lagi sebentar lagi.',
  cobaLagi: 'Coba lagi',
  placeholder: 'Tulis pesanmu…',
  // Salinan teks §4.16 (LANJUT_053) — DRAF belum disetujui Khalifa.
  labelUjiCoba: 'Uji coba, bukan jawaban AI',
  peringatanDataPribadi: 'Jangan tulis nama lengkap, nomor HP, alamat, atau data pribadi lain di sini.',
  tautanBantuan: 'Butuh bicara dengan orang?',
  sembunyikanBantuan: 'Sembunyikan',
  dataDisamarkan: 'Data pribadi di pesanmu disamarkan sebelum dikirim ke AI.',
  kartuGagalDimuat: 'Kartu bantuan belum bisa dimuat. Kalau kamu dalam bahaya, hubungi 112 atau orang dewasa yang kamu percaya.',
};

// Batas di app = batas server (ngobrol.skema.js).
export const PANJANG_PESAN_MAKS = 1000;
export const RIWAYAT_MAKS = 20;

/** Pesan ramah per kode galat server. Pesan mentah server tidak pernah ditampilkan. */
export function pesanGalatNgobrol(err: unknown): string {
  if (err instanceof ApiError) {
    switch (err.kode) {
      case 'AI_BELUM_DIIZINKAN':
        return 'Fitur AI belum aktif untuk akunmu.';
      case 'AI_TIDAK_TERSEDIA':
        return 'Fitur AI sedang belum bisa dipakai. Coba lagi nanti.';
      case 'AI_GAGAL':
        return 'Maaf, aku belum bisa menjawab sekarang. Coba kirim lagi sebentar lagi.';
      case 'TERLALU_SERING':
        return 'Pesanmu sudah banyak. Istirahat sebentar, lalu coba lagi.';
      case 'JARINGAN':
        return 'Pesanmu belum terkirim karena tidak tersambung. Coba lagi.';
    }
  }
  return 'Ada yang tidak beres. Coba kirim lagi.';
}
