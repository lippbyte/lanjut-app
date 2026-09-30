import type { GayaBelajar } from '../api/auth';

// =============================================================================
// STUB — belum terhubung ke AI sungguhan. Menunggu kepastian izin data anak
// (UU PDP Pasal 25) dari Khalifa. Jangan sambungkan ke API eksternal tanpa
// konfirmasi eksplisit.
// =============================================================================
//
// LANJUT_032: berkas ini SENGAJA tidak mengimpor apa pun selain tipe, tidak
// memanggil fetch/apiFetch, dan tidak menyimpan pesan ke mana pun. Balasan
// dipilih dari aturan kata kunci sederhana + kalimat yang ditulis manual.
// Isi chat hanya hidup di state layar (NgobrolScreen) dan hilang saat layar
// ditutup — keputusan penyimpanan riwayat juga menunggu Khalifa.

/** Rute yang boleh dituju tombol di bawah balasan bot. */
export type RutePintu = '/linimasa' | '/khusus-smk' | '/pilih-mapel' | '/daftar-periksa' | '/cek-posisi' | '/gaya-belajar';

export type BalasanBot = {
  teks: string;
  tautan?: { label: string; href: RutePintu };
};

const ADA = (pola: RegExp, teks: string) => pola.test(teks);

const TIPS_GAYA: Record<GayaBelajar, string> = {
  visual:
    'Coba ubah materinya jadi peta pikiran atau diagram berwarna. Buat kamu yang paling nyambung lewat visual, catatan bergambar biasanya lebih nempel daripada baca ulang.',
  auditori:
    'Coba jelasin materinya dengan suara keras, ke diri sendiri atau ke teman. Bisa juga rekam lalu dengerin lagi. Buat kamu yang auditori, ngobrolin materi sering lebih nempel.',
  kinestetik:
    'Coba belajar sambil praktik: langsung kerjain soal, pakai contoh benda nyata, atau belajar 25 menit lalu gerak sebentar.',
  baca_tulis:
    'Coba rangkum materinya pakai kata-katamu sendiri, lalu tulis ulang poin pentingnya tanpa lihat catatan.',
};

// Bidang minat → dipakai di kalimat "Kedengarannya kamu tertarik ke bidang …".
const BIDANG: { nama: string; pola: RegExp }[] = [
  { nama: 'teknologi', pola: /(coding|ngoding|program|komputer|game|aplikasi|website|jaringan|robot|elektro|listrik|mesin|otomotif|informatika)/ },
  { nama: 'kesehatan', pola: /(dokter|perawat|kesehatan|farmasi|obat|rumah sakit|bidan|gizi)/ },
  { nama: 'ekonomi dan bisnis', pola: /(bisnis|jualan|dagang|usaha|akuntansi|keuangan|manajemen|pajak|marketing)/ },
  { nama: 'kreatif dan komunikasi', pola: /(desain|gambar|konten|film|foto|video|menulis|nulis|komunikasi|musik)/ },
];

// Balasan umum — dirotasi bila tidak ada kata kunci yang cocok.
const UMUM = [
  'Menarik! Ceritain lebih lanjut soal itu.',
  'Oke, aku dengerin. Kalau boleh tahu, apa yang bikin kamu kepikiran soal itu?',
  'Boleh kasih contoh yang lebih spesifik? Biar aku lebih nangkep maksudmu.',
  'Kalau kamu bayangin setahun dari sekarang, kamu pengen udah ada di mana?',
  'Dari yang kamu ceritain, bagian mana yang paling pengen kamu beresin duluan?',
];

/**
 * Balasan bot untuk satu pesan. STUB — lihat komentar di kepala berkas.
 * Tidak memanggil API apa pun. `acak` hanya untuk memilih kalimat umum
 * (bisa diganti di tes supaya hasilnya pasti).
 */
export function dapatkanBalasanBot(
  pesanPengguna: string,
  preferensiBelajar: GayaBelajar | null | undefined,
  acak: () => number = Math.random
): BalasanBot {
  const t = pesanPengguna.toLowerCase();

  // Tanda bahaya lebih dulu. Stub tidak bisa menolong di sini — cukup arahkan
  // ke orang dewasa yang dipercaya, tanpa menebak nomor layanan.
  if (ADA(/(bunuh diri|pengen mati|ingin mati|mau mati|nyakitin diri|menyakiti diri|gak kuat lagi|nggak kuat lagi|ga kuat lagi)/, t)) {
    return {
      teks: 'Makasih udah mau cerita. Yang kamu rasain itu penting, dan kamu nggak harus nanggung ini sendirian. Tolong ceritain juga ke orang dewasa yang kamu percaya, misalnya guru BK, wali kelas, atau keluarga, hari ini juga ya.',
    };
  }

  if (ADA(/(malas|males|susah|sulit|nggak fokus|gak fokus|ga fokus|fokus|lupa|ngantuk|capek|stres|nilai jelek|remedial|nggak paham|gak paham)/, t)) {
    if (!preferensiBelajar) {
      return {
        teks: 'Wajar kok ngerasa gitu, banyak yang ngalamin. Biar tipsnya lebih pas, kamu bisa pilih dulu gaya belajarmu. Mau atur sekarang?',
        tautan: { label: 'Atur gaya belajar', href: '/gaya-belajar' },
      };
    }
    return { teks: `Wajar kok ngerasa gitu, banyak yang ngalamin. ${TIPS_GAYA[preferensiBelajar]}` };
  }

  if (ADA(/(jadwal|tenggat|deadline|kapan|tanggal|snbp|snbt|tka|pendaftaran)/, t)) {
    return {
      teks: 'Soal jadwal, paling aman lihat tanggal yang sudah dicek ke sumber resmi. Semuanya ada di Beranda.',
      tautan: { label: 'Lihat Beranda', href: '/linimasa' },
    };
  }

  if (ADA(/(berkas|dokumen|rapor|persiapan|siapin|checklist|ktp|kartu keluarga)/, t)) {
    return {
      teks: 'Buat persiapan kayak gini, enaknya dicentang satu per satu biar nggak ada yang kelewat. Mau buka Daftar Periksa?',
      tautan: { label: 'Buka Daftar Periksa', href: '/daftar-periksa' },
    };
  }

  if (ADA(/(smk|kejuruan|pkl|anak smk)/, t)) {
    return {
      teks: 'Ada beberapa hal yang memang beda buat anak SMK, dan itu bukan berarti peluangmu lebih kecil. Aku rangkum di Khusus SMK.',
      tautan: { label: 'Buka Khusus SMK', href: '/khusus-smk' },
    };
  }

  const bidang = BIDANG.find((b) => ADA(b.pola, t));
  if (bidang) {
    return {
      teks: `Kedengarannya kamu tertarik ke bidang ${bidang.nama}. Mau coba lihat Pilih Mapel buat lihat mapel yang relevan?`,
      tautan: { label: 'Buka Pilih Mapel', href: '/pilih-mapel' },
    };
  }

  if (ADA(/(cita-cita|cita cita|mau jadi|pengen jadi|ingin jadi|bingung|nggak tahu|gak tahu|belum tahu|kuliah)/, t)) {
    return {
      teks: 'Nggak apa-apa kalau belum yakin, itu normal banget. Coba lihat dulu kamu lagi di tahap mana. Dari situ langkah berikutnya biasanya lebih kelihatan.',
      tautan: { label: 'Cek Posisi Gue', href: '/cek-posisi' },
    };
  }

  if (ADA(/(makasih|terima kasih|thanks|thx)/, t)) {
    return { teks: 'Sama-sama! Kapan pun mau cerita lagi, aku di sini.' };
  }

  if (ADA(/^(hai|halo|hi|hei|hey|pagi|siang|sore|malam|assalamualaikum)\b/, t)) {
    return { teks: 'Hai juga! Lagi kepikiran apa hari ini? Soal minat, cara belajar, atau rencana kuliah, cerita aja.' };
  }

  return { teks: UMUM[Math.floor(acak() * UMUM.length) % UMUM.length] };
}
