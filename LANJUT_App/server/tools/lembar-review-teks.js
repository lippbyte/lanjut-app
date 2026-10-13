// Lembar review draf teks (LANJUT_046). Mengumpulkan SEMUA butir yang masih
// DRAF di docs/salinan-teks-lanjut.md ke satu berkas Markdown supaya Khalifa
// bisa memutuskan setiap butir dalam satu sesi (pola lembar verifikasi konten,
// LANJUT_043).
//
// HANYA MEMBACA salinan-teks-lanjut.md; satu-satunya yang ditulis adalah
// berkas lembar. Bunyi teks disalin persis (baris sumber apa adanya), tidak
// pernah diubah, dan status DRAF tidak pernah disentuh.
//
// Cara membaca berkas sumber: blok DRAF = paragraf yang memuat kata "DRAF"
// (mis. "**LANJUT_App (LANJUT_039) — DRAF belum disetujui Khalifa**"), lalu
// semua butir daftar ("- ...", termasuk sub-butir) sesudahnya sampai judul
// berikutnya, garis "---", atau paragraf baru. Task asal = LANJUT_xxx pertama
// di paragraf itu. Butir yang di kepala bloknya dinyatakan sudah disetujui,
// atau yang hanya catatan perilaku tanpa teks tampil, ada di PENGECUALIAN dan
// tetap dicantumkan di lampiran lembar (tidak hilang diam-diam).
//
// Letak teks di app, pembaca, dan klaim faktual tidak bisa dibaca dari berkas
// sumber, jadi dicatat di PETA di bawah (diperiksa ke kode app, LANJUT_046).
// Butir DRAF baru yang belum ada di PETA tetap masuk lembar, di bagian
// "Belum dipetakan" — lengkapi PETA lalu buat ulang.
//
// Pemakaian (dari folder LANJUT_App/server):
//   npm run lembar-review-teks                        → docs/lembar-review-draf-teks.md
//   npm run lembar-review-teks -- --keluar=lembar.md  → berkas lain

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const AKAR = path.join(__dirname, '..', '..', '..');
const SALINAN = path.join(AKAR, 'docs', 'salinan-teks-lanjut.md');
const KELUARAN_BAWAAN = path.join(AKAR, 'docs', 'lembar-review-draf-teks.md');

// --- membaca blok DRAF ------------------------------------------------------

/**
 * Semua blok DRAF dan butirnya, urut berkas.
 * Butir: { bagian, judulBagian, task, baris (nomor baris), teks (baris sumber
 * tanpa "- "), sambungan (baris lanjutan, apa adanya), tingkat (indentasi) }.
 */
function bacaBlokDraf(isi) {
  const baris = isi.split(/\r?\n/);
  const blok = [];
  let bagian = null;
  let judulBagian = null;
  let aktif = null; // blok DRAF yang sedang dibaca
  let paragraf = []; // baris paragraf non-butir yang sedang berjalan
  let butirTerakhir = null;

  baris.forEach((b, i) => {
    const judul = /^#{2,3} (\d+(?:\.\d+)?)\.? (.*)$/.exec(b);
    if (/^#/.test(b) || /^---\s*$/.test(b)) {
      if (judul) [bagian, judulBagian] = [judul[1], judul[2]];
      aktif = null;
      paragraf = [];
      butirTerakhir = null;
      return;
    }
    const butir = /^(\s*)- (.*)$/.exec(b);
    if (butir) {
      paragraf = [];
      butirTerakhir = null;
      if (aktif) {
        butirTerakhir = { bagian, judulBagian, task: aktif.task, baris: i + 1, teks: butir[2], sambungan: [], tingkat: butir[1].length };
        aktif.butir.push(butirTerakhir);
      }
      return;
    }
    if (b.trim() === '') {
      paragraf = [];
      butirTerakhir = null;
      return;
    }
    if (/^\s+\S/.test(b) && butirTerakhir) {
      butirTerakhir.sambungan.push(b);
      return;
    }
    // Paragraf baru sesudah butir menutup blok yang sedang berjalan.
    if (paragraf.length === 0 && aktif && aktif.butir.length) aktif = null;
    paragraf.push(b);
    const isiParagraf = paragraf.join(' ');
    if (!aktif && /\bDRAF\b/.test(isiParagraf)) {
      const task = (/LANJUT_\d{3}/.exec(isiParagraf) || ['(tidak disebut)'])[0];
      aktif = { bagian, judulBagian, task, baris: i + 1 - (paragraf.length - 1), kepala: isiParagraf, butir: [] };
      blok.push(aktif);
    }
  });
  return blok;
}

// --- yang tidak dijadikan butir keputusan -------------------------------------

const PENGECUALIAN = [
  {
    task: 'LANJUT_037',
    awal: '**Pembuka kelas 12:**',
    alasan: 'Memakai pembuka lama §4.2 yang bukan DRAF; kepala blok menyebutnya dikecualikan.',
  },
  {
    task: 'LANJUT_037',
    awal: '**Butir SMK per kelas:**',
    alasan:
      'Aturan butir Khusus SMK mana yang tampil per kelas, bukan teks yang tampil. Isi butirnya sendiri diperiksa di lembar verifikasi konten (bagian Khusus SMK).',
  },
  { task: 'LANJUT_037', awal: '**Sejak LANJUT_038:**', alasan: 'Catatan perilaku (siapa yang melihat seksi SMK), bukan teks yang tampil.' },
  {
    task: 'LANJUT_031',
    awal: 'Tombol **Simpan ke Daftar Periksa** ada di Expo',
    alasan: 'Catatan bahwa tombol memakai teks PWA §4.9 yang bukan DRAF; tidak ada teks baru.',
  },
];

// --- letak, pembaca, klaim faktual (diperiksa ke kode app) --------------------

// Kelompok = layar/fitur di app, urut alur siswa. Butir dicocokkan lewat
// task + awal teks.
const PETA = [
  {
    kelompok: 'Daftar akun & gerbang awal',
    butir: [
      { task: 'LANJUT_035', awal: '**Label:** Kelas', nama: 'Medan Kelas', di: 'Layar Daftar (buat akun), medan Kelas.', oleh: 'Semua pendaftar baru.' },
      { task: 'LANJUT_035', awal: '**Galat:** Pilih kelasmu.', nama: 'Galat medan Kelas', di: 'Layar Daftar, saat menekan Daftar tanpa memilih kelas.', oleh: 'Semua pendaftar baru.' },
      { task: 'LANJUT_038', awal: '**Label:** Jenis sekolah', nama: 'Medan Jenis sekolah', di: 'Layar Daftar, muncul sesudah kelas 10–12 dipilih.', oleh: 'Pendaftar kelas 10–12 (kelas 7–9 tidak ditanya).' },
      { task: 'LANJUT_038', awal: '**Galat:** Pilih jenis sekolahmu.', nama: 'Galat medan Jenis sekolah', di: 'Layar Daftar, kelas 10–12 tanpa jenis sekolah.', oleh: 'Pendaftar kelas 10–12.' },
      { task: 'LANJUT_047', awal: '**Layar Daftar — judul blok kebijakan:**', nama: 'Kebijakan — judul blok', di: 'Layar Daftar, blok kebijakan privasi di atas tombol Daftar.', oleh: 'Semua pendaftar baru.' },
      ...[1, 2, 3, 4].map((i) => ({
        task: 'LANJUT_047',
        awal: `**Ringkasan ${i}:**`,
        nama: `Kebijakan — ringkasan ${i}`,
        di: 'Layar Daftar, blok kebijakan privasi (dari lib/kebijakan-privasi.json).',
        oleh: 'Semua pendaftar baru.',
        faktual: {
          klaim: [
            'Daftar data yang disimpan (akun, jalur, Daftar Periksa, kartu, latihan) dan tujuannya.',
            'Kata sandi disimpan dalam bentuk acak (hash).',
            'Fitur AI mengirim pesan, riwayat, profil belajar, dan (pertanyaan pelajaran) potongan modul ke penyedia AI pihak ketiga yang dapat memproses di luar Indonesia; tanpa nama, nama pengguna, email; isi obrolan tidak disimpan server; aktif setelah persetujuan orang tua/wali (draf v2, LANJUT_056).',
            'Hak siswa dan orang tua/wali: melihat, membetulkan, meminta penghapusan, mencabut persetujuan.',
          ][i - 1],
          sumber: 'Inventaris data di docs/kebijakan-privasi-DRAF.md (Lampiran A), bukti per klaim di docs/kebijakan-v2-klaim-vs-kode.md, dan review ahli hukum (UU PDP).',
        },
      })),
      { task: 'LANJUT_047', awal: '**Tautan ke kebijakan lengkap:**', nama: 'Kebijakan — tautan lengkap', di: 'Layar Daftar, membuka kebijakan lengkap sebagai modal.', oleh: 'Semua pendaftar baru.' },
      { task: 'LANJUT_047', awal: '**Kotak centang:**', nama: 'Kebijakan — kotak centang', di: 'Layar Daftar; tombol Daftar baru aktif setelah dicentang.', oleh: 'Semua pendaftar baru.' },
      { task: 'LANJUT_047', awal: '**Petunjuk selama belum dicentang', nama: 'Kebijakan — petunjuk belum dicentang', di: 'Layar Daftar, di bawah tombol Daftar selama kotak belum dicentang.', oleh: 'Semua pendaftar baru.' },
      { task: 'LANJUT_047', awal: '**Galat versi kebijakan usang', nama: 'Kebijakan — galat versi usang', di: 'Layar Daftar, bila versi kebijakan di app bukan versi yang berlaku di server.', oleh: 'Pendaftar yang memakai versi app lama.' },
      {
        task: 'LANJUT_047',
        awal: '**Kebijakan lengkap',
        nama: 'Kebijakan lengkap — bingkai',
        di: 'Modal di layar Daftar, dan halaman /kebijakan-privasi (dari Jalur Saya). Isi kebijakan sendiri direview di docs/kebijakan-privasi-DRAF.md.',
        oleh: 'Semua pendaftar dan semua akun.',
      },
      { task: 'LANJUT_036', awal: '**Judul:** Kamu kelas berapa sekarang?', nama: 'Gerbang isi kelas — judul', di: 'Gerbang isi kelas, menggantikan seluruh app sampai kelas disimpan.', oleh: 'Akun lama yang belum punya kelas.' },
      { task: 'LANJUT_036', awal: '**Pengantar:** Isi sekali ini saja', nama: 'Gerbang isi kelas — pengantar', di: 'Gerbang isi kelas.', oleh: 'Akun lama yang belum punya kelas.' },
      { task: 'LANJUT_036', awal: '**Medan:** Kelas', nama: 'Gerbang isi kelas — medan', di: 'Gerbang isi kelas.', oleh: 'Akun lama yang belum punya kelas.' },
      {
        task: 'LANJUT_036',
        awal: '**Bila kelas pernah dipilih di Daftar Periksa',
        nama: 'Gerbang isi kelas — usulan dari perangkat',
        di: 'Gerbang isi kelas, bila di perangkat ini tersimpan kelas yang pernah dipilih di Daftar Periksa dan siswa belum memilih ulang.',
        oleh: 'Akun tanpa kelas yang punya pilihan kelas tersimpan di perangkat.',
      },
      { task: 'LANJUT_036', awal: '**Tombol:** Simpan dan lanjut', nama: 'Gerbang isi kelas — tombol', di: 'Gerbang isi kelas.', oleh: 'Akun lama yang belum punya kelas.' },
      { task: 'LANJUT_038', awal: '**Judul:** Kamu sekolah di mana?', nama: 'Gerbang jenis sekolah — judul', di: 'Gerbang langkah 2, sesudah kelas tersimpan (tidak pernah satu layar dengan langkah kelas).', oleh: 'Kelas 10–12 yang belum memilih jenis sekolah.' },
      { task: 'LANJUT_038', awal: '**Pengantar:** Kelas [kelas]: pilih jenis sekolahmu', nama: 'Gerbang jenis sekolah — pengantar', di: 'Gerbang langkah 2.', oleh: 'Kelas 10–12 yang belum memilih jenis sekolah.' },
      { task: 'LANJUT_038', awal: '**Medan:** Jenis sekolah', nama: 'Gerbang jenis sekolah — medan', di: 'Gerbang langkah 2.', oleh: 'Kelas 10–12 yang belum memilih jenis sekolah.' },
      { task: 'LANJUT_038', awal: '**Tombol:** sama dengan langkah 1.', nama: 'Gerbang jenis sekolah — tombol', di: 'Gerbang langkah 2.', oleh: 'Kelas 10–12 yang belum memilih jenis sekolah.' },
    ],
  },
  {
    kelompok: 'Beranda',
    butir: [
      {
        task: 'LANJUT_072',
        awal: '**Sapaan:**',
        nama: 'Sapaan Beranda',
        di: 'Beranda, baris paling atas (di atas kalimat "Tahu harus ngapain hari ini.").',
        oleh: 'Semua akun.',
      },
    ],
  },
  {
    kelompok: 'Jalur Saya (halaman akun)',
    butir: [
      {
        task: 'LANJUT_038',
        awal: '**Jalur Saya:**',
        nama: 'Baris Sekolah & medan di form Ubah',
        di: 'Jalur Saya: baris "Sekolah" di kartu akun (berisi "Belum diisi" bila kosong); medan Jenis sekolah di form Ubah.',
        oleh: 'Baris: semua akun (kelas 7–9 tampil SMP). Medan di form Ubah: kelas 10–12.',
      },
      { task: 'LANJUT_035', awal: '**Jalur Saya, kartu Kemajuan:**', nama: 'Kartu Kemajuan bukan kelas 12', di: 'Jalur Saya, kartu Kemajuan (kelas 12 melihat ringkasan kemajuan).', oleh: 'Kelas 7–11 dan akun tanpa kelas.' },
      { task: 'LANJUT_047', awal: '**Jalur Saya — baris:**', nama: 'Baris persetujuan orang tua/wali', di: 'Jalur Saya, kartu Akun (hanya baca).', oleh: 'Semua akun.' },
      {
        task: 'LANJUT_047',
        awal: '**Jalur Saya — penjelas:**',
        nama: 'Penjelas persetujuan',
        di: 'Jalur Saya, kartu Akun, di bawah baris persetujuan.',
        oleh: 'Semua akun.',
        faktual: {
          klaim: 'Persetujuan diberikan lewat surat dari sekolah, dibutuhkan untuk fitur AI, dan fitur lain tidak diblokir.',
          sumber: 'Keputusan Khalifa & ahli hukum soal persetujuan untuk fitur dasar (pertanyaan terbuka LANJUT_047).',
        },
      },
      { task: 'LANJUT_047', awal: '**Jalur Saya — tautan:**', nama: 'Tautan kebijakan privasi', di: 'Jalur Saya, kartu Akun.', oleh: 'Semua akun.' },
      {
        task: 'LANJUT_048',
        awal: '**Jalur Saya — baris:**',
        nama: 'Baris kebijakan privasi & tombol',
        di: 'Jalur Saya, kartu Akun, di atas baris persetujuan orang tua/wali; tombol hanya selama belum diterima.',
        oleh: 'Semua akun.',
      },
    ],
  },
  {
    kelompok: 'Terima kebijakan privasi (jendela setelah login & halaman /terima-kebijakan)',
    butir: [
      { task: 'LANJUT_048', awal: '**Judul (jendela & halaman):**', nama: 'Judul', di: 'Jendela setelah login dan halaman /terima-kebijakan.', oleh: 'Akun yang belum menerima kebijakan versi berlaku.' },
      {
        task: 'LANJUT_048',
        awal: '**Pengantar, belum pernah menerima:**',
        nama: 'Pengantar — belum pernah menerima',
        di: 'Jendela setelah login (sekali per sesi, sesudah gerbang kelas & jenis sekolah) dan halaman /terima-kebijakan.',
        oleh: 'Akun yang belum pernah menerima kebijakan (akun lama sebelum LANJUT_047).',
        faktual: {
          klaim: 'Semua fitur tetap bisa dipakai tanpa menerima; penerimaan dibutuhkan untuk fitur AI.',
          sumber: 'Keputusan Khalifa & ahli hukum soal persetujuan untuk fitur dasar (pertanyaan terbuka LANJUT_047).',
        },
      },
      { task: 'LANJUT_048', awal: '**Pengantar, perlu menerima ulang:**', nama: 'Pengantar — perlu menerima ulang', di: 'Jendela setelah login dan halaman /terima-kebijakan, bila versi naik.', oleh: 'Akun yang pernah menerima versi lama.' },
      { task: 'LANJUT_048', awal: '**Versi di aplikasi berbeda', nama: 'Versi di aplikasi berbeda', di: 'Jendela setelah login dan halaman /terima-kebijakan, bila versi berlaku di server bukan versi teks di aplikasi (tombol Terima tidak tampil).', oleh: 'Akun yang memakai aplikasi versi lama saat kebijakan naik.' },
      { task: 'LANJUT_048', awal: '**Tautan kebijakan lengkap:**', nama: 'Tautan buka/tutup kebijakan lengkap', di: 'Jendela dan halaman penerimaan.', oleh: 'Akun yang belum menerima kebijakan.' },
      { task: 'LANJUT_048', awal: '**Tombol:** Terima', nama: 'Tombol Terima / Nanti saja / Kembali', di: 'Jendela dan halaman penerimaan.', oleh: 'Akun yang belum menerima kebijakan.' },
      { task: 'LANJUT_048', awal: '**Galat simpan:**', nama: 'Galat simpan', di: 'Jendela dan halaman penerimaan, bila Terima gagal tersimpan.', oleh: 'Akun yang menekan Terima.' },
      { task: 'LANJUT_048', awal: '**Sudah diterima (halaman):**', nama: 'Sudah diterima', di: 'Halaman /terima-kebijakan setelah diterima.', oleh: 'Akun yang sudah menerima.' },
      { task: 'LANJUT_048', awal: '**Belum bisa dimuat:**', nama: 'Belum bisa dimuat', di: 'Halaman /terima-kebijakan bila versi berlaku belum ada di server.', oleh: 'Jarang; konfigurasi server belum lengkap.' },
    ],
  },
  {
    kelompok: 'Ngobrol Bareng LANJUT',
    butir: [
      { task: 'LANJUT_048', awal: '**Ngobrol — ajakan:**', nama: 'Ajakan menerima kebijakan', di: 'Ngobrol Bareng LANJUT, layar terkunci, di bawah penjelasan; hanya selama kebijakan belum diterima.', oleh: 'Akun yang belum menerima kebijakan versi berlaku.' },
      {
        task: 'LANJUT_051',
        awal: '**Ngobrol — catatan AI:**',
        nama: 'Catatan AI di atas obrolan',
        di: 'Ngobrol Bareng LANJUT, paling atas daftar pesan.',
        oleh: 'Akun dengan persetujuan orang tua/wali dan kebijakan diterima.',
        faktual: {
          klaim: 'LANJUT tidak menyimpan obrolan; obrolan hilang saat aplikasi ditutup.',
          sumber: 'Kode server (tidak ada tabel obrolan, isi tidak dicatat di log; tests/ngobrol.test.js). Penyimpanan di sisi OpenRouter/penyedia model mengikuti kebijakan mereka.',
        },
      },
      { task: 'LANJUT_051', awal: '**Ngobrol terkunci — judul:**', nama: 'Layar terkunci — judul', di: 'Ngobrol Bareng LANJUT, bila fitur AI belum aktif.', oleh: 'Akun tanpa persetujuan orang tua/wali atau tanpa kebijakan diterima.' },
      {
        task: 'LANJUT_051',
        awal: '**Ngobrol terkunci — isi:**',
        nama: 'Layar terkunci — penjelasan',
        di: 'Ngobrol Bareng LANJUT, bila fitur AI belum aktif.',
        oleh: 'Akun tanpa persetujuan orang tua/wali atau tanpa kebijakan diterima.',
        faktual: {
          klaim: 'AI dari penyedia pihak ketiga; aktif setelah persetujuan orang tua/wali lewat sekolah dan kebijakan diterima.',
          sumber: 'Gerbang bolehPakaiAi (server/README.md bagian 2b) dan keputusan Khalifa soal penyedia AI.',
        },
      },
      { task: 'LANJUT_051', awal: '**Ngobrol — status belum bisa dimuat:**', nama: 'Status AI belum bisa dimuat', di: 'Ngobrol Bareng LANJUT, bila status persetujuan gagal dimuat.', oleh: 'Semua akun, saat tidak tersambung.' },
      { task: 'LANJUT_051', awal: '**Ngobrol — galat kirim:**', nama: 'Pesan gagal kirim', di: 'Ngobrol Bareng LANJUT, gelembung abu-abu di bawah pesan siswa, dengan tombol Coba lagi.', oleh: 'Akun dengan fitur AI aktif, saat pesan gagal dijawab.' },
      { task: 'LANJUT_051', awal: '**Beranda — kartu Ngobrol:**', nama: 'Kartu Ngobrol di Beranda', di: 'Beranda, kartu pintu Ngobrol Bareng LANJUT.', oleh: 'Semua akun.' },
      {
        task: 'LANJUT_053',
        awal: '**Balasan tanda bahaya akut (server):**',
        nama: 'Balasan tetap saat tanda bahaya akut',
        di: 'Ngobrol, sebagai balasan bot, diikuti kartu bantuan. Dibuat server; AI tidak dipanggil.',
        oleh: 'Siswa yang pesannya cocok daftar tanda bahaya akut (server/config/tanda-bahaya.json, DRAF review guru BK).',
        faktual: {
          klaim: 'Ajakan menghubungi layanan bantuan dan orang dewasa tepercaya; isi kartu dari kartu-bantuan.json (hanya yang terverifikasi).',
          sumber: 'Review guru BK; verifikasi nomor layanan (Healing119 dicek Khalifa, 112 nomor darurat nasional, SAPA 129 belum dicek).',
        },
      },
      { task: 'LANJUT_053', awal: '**Kartu bantuan — judul (server):**', nama: 'Kartu bantuan — judul', di: 'Ngobrol, kartu bantuan (di balasan tanda bahaya dan di panel "Butuh bicara dengan orang?").', oleh: 'Akun yang membuka Ngobrol.' },
      { task: 'LANJUT_053', awal: '**Kartu bantuan — penutup (server):**', nama: 'Kartu bantuan — penutup', di: 'Ngobrol, di bawah daftar layanan pada kartu bantuan.', oleh: 'Akun yang membuka Ngobrol.' },
      { task: 'LANJUT_053', awal: '**Tolak di luar topik', nama: 'Kalimat tetap: di luar topik', di: 'Ngobrol, diucapkan AI persis saat siswa meminta hal di luar topik.', oleh: 'Akun dengan fitur AI aktif.' },
      { task: 'LANJUT_053', awal: '**Tolak abaikan aturan', nama: 'Kalimat tetap: menolak mengabaikan aturan', di: 'Ngobrol, diucapkan AI persis saat diminta mengabaikan/menampilkan aturannya.', oleh: 'Akun dengan fitur AI aktif.' },
      { task: 'LANJUT_053', awal: '**Balasan saat AI dimatikan (server):**', nama: 'Balasan uji coba saat AI dimatikan', di: 'Ngobrol, sebagai balasan bot berlabel uji coba, saat ai_aktif = 0.', oleh: 'Semua akun dengan fitur AI aktif, selama saklar mati.' },
      { task: 'LANJUT_053', awal: '**Ngobrol — label balasan uji coba:**', nama: 'Label balasan uji coba', di: 'Ngobrol, di atas gelembung balasan saat AI dimatikan.', oleh: 'Semua akun dengan fitur AI aktif, selama saklar mati.' },
      { task: 'LANJUT_053', awal: '**Ngobrol — peringatan data pribadi:**', nama: 'Peringatan data pribadi', di: 'Ngobrol, paling atas daftar pesan.', oleh: 'Akun dengan fitur AI aktif.' },
      { task: 'LANJUT_053', awal: '**Ngobrol — tautan kartu bantuan:**', nama: 'Tautan "Butuh bicara dengan orang?"', di: 'Ngobrol, selalu tampil di atas obrolan dan di layar terkunci.', oleh: 'Semua akun yang membuka Ngobrol.' },
      { task: 'LANJUT_053', awal: '**Ngobrol — penanda data disamarkan:**', nama: 'Penanda data disamarkan', di: 'Ngobrol, di bawah pesan siswa yang data pribadinya disamarkan.', oleh: 'Akun dengan fitur AI aktif.' },
      {
        task: 'LANJUT_055',
        awal: '**Ngobrol — catatan materi:**',
        nama: 'Catatan: materi & modul dikirim ke penyedia AI',
        di: 'Ngobrol, catatan di atas obrolan.',
        oleh: 'Akun dengan fitur AI aktif.',
        faktual: {
          klaim: 'Pertanyaan materi dan potongan modul yang berkaitan dikirim ke penyedia AI.',
          sumber: 'Kode server (ngobrol.layanan.js, LANJUT_055) dan docs/alur-data-ai-materi.md; perlu masuk kebijakan privasi v2.',
        },
      },
      { task: 'LANJUT_055', awal: '**Ngobrol — judul sumber modul:**', nama: 'Bagian "Dari modulmu"', di: 'Ngobrol, di bawah balasan yang memakai modul.', oleh: 'Akun dengan fitur AI aktif yang punya modul.' },
      { task: 'LANJUT_055', awal: '**Ngobrol — judul sumber web:**', nama: 'Bagian "Dari web"', di: 'Ngobrol, di bawah balasan yang memakai hasil web (saat pencarian web aktif).', oleh: 'Akun dengan fitur AI aktif.' },
      { task: 'LANJUT_055', awal: '**Ngobrol — kuota web habis:**', nama: 'Kuota pencarian web habis', di: 'Ngobrol, di bawah balasan saat kuota web harian akun habis.', oleh: 'Akun dengan fitur AI aktif, saat pencarian web aktif.' },
      {
        task: 'LANJUT_053',
        awal: '**Ngobrol — kartu bantuan belum bisa dimuat:**',
        nama: 'Kartu bantuan gagal dimuat',
        di: 'Ngobrol, panel "Butuh bicara dengan orang?" saat server tidak bisa dihubungi.',
        oleh: 'Akun yang membuka panel saat tidak tersambung.',
        faktual: { klaim: '112 sebagai nomor darurat.', sumber: 'Nomor darurat nasional (terverifikasi di kartu-bantuan.json).' },
      },
    ],
  },
  {
    kelompok: 'Jenjang Saya (tab "Jenjang")',
    butir: [
      { task: 'LANJUT_037', awal: '**Judul:** Jenjang Saya', nama: 'Judul halaman', di: 'Jenjang Saya.', oleh: 'Semua akun.' },
      { task: 'LANJUT_037', awal: '**Pendamping kelas 7–9:**', nama: 'Pendamping kelas 7–9', di: 'Jenjang Saya, di bawah judul.', oleh: 'Kelas 7–9.' },
      { task: 'LANJUT_037', awal: '**Pendamping kelas 10–11:**', nama: 'Pendamping kelas 10–11', di: 'Jenjang Saya, di bawah judul.', oleh: 'Kelas 10–11.' },
      { task: 'LANJUT_037', awal: '**Pendamping kelas 12:**', nama: 'Pendamping kelas 12', di: 'Jenjang Saya, di bawah judul.', oleh: 'Kelas 12.' },
      { task: 'LANJUT_037', awal: '**Pendamping tanpa kelas:**', nama: 'Pendamping tanpa kelas', di: 'Jenjang Saya, di bawah judul (jaring pengaman; akun tanpa kelas biasanya tertahan di gerbang dulu).', oleh: 'Akun tanpa kelas.' },
      { task: 'LANJUT_037', awal: '**Seksi pintu:** Mulai dari sini', nama: 'Judul seksi pintu', di: 'Jenjang Saya, seksi pintu.', oleh: 'Semua akun.' },
      // LANJUT_069: tiga pintu 037 di bawah kini hanya untuk akun tanpa kelas; Gaya Belajar 037 dan
      // kedua kartu catatan 037 tidak dipakai lagi (diganti blok LANJUT_069).
      { task: 'LANJUT_037', awal: 'Ngobrol Bareng LANJUT', nama: 'Pintu Ngobrol Bareng LANJUT (tanpa kelas)', di: 'Jenjang Saya, seksi pintu.', oleh: 'Akun tanpa kelas.' },
      { task: 'LANJUT_037', awal: 'Eksplorasi Tujuan', nama: 'Pintu Eksplorasi Tujuan (tanpa kelas)', di: 'Jenjang Saya, seksi pintu.', oleh: 'Akun tanpa kelas.' },
      { task: 'LANJUT_037', awal: 'Pilih Mapel', nama: 'Pintu Pilih Mapel (tanpa kelas)', di: 'Jenjang Saya, seksi pintu.', oleh: 'Akun tanpa kelas.' },
      { task: 'LANJUT_037', awal: 'Cek Posisi Gue', nama: 'Pintu Cek Posisi Gue', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 12.' },
      { task: 'LANJUT_037', awal: 'Daftar Periksa', nama: 'Pintu Daftar Periksa', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 12.' },
      { task: 'LANJUT_037', awal: '**Seksi SMK', nama: 'Judul seksi SMK', di: 'Jenjang Saya, seksi SMK.', oleh: 'Kelas 10–12 dengan jenis sekolah SMK.' },
      {
        task: 'LANJUT_037',
        awal: '**Pembuka kelas 10–11:**',
        nama: 'Pembuka seksi SMK kelas 10–11',
        di: 'Jenjang Saya, seksi SMK, di atas butir Khusus SMK.',
        oleh: 'Kelas 10–11 SMK.',
        faktual: {
          klaim: 'Bahwa butir yang tampil untuk kelas 10–11 (portofolio dan mapel pilihan TKA yang tidak ada di SMK) sudah bisa disiapkan dari sekarang. Isi kedua butir itu sendiri belum terverifikasi (lembar verifikasi konten, bagian Khusus SMK).',
          sumber: 'SNPMB dan Direktorat SMK, sesuai sumber kedua butir Khusus SMK itu.',
        },
      },
      // LANJUT_069 — isi kelas 7–9 dan 10–11 (lib/jenjangSaya.ts).
      { task: 'LANJUT_069', awal: '**A1 Kartu pembuka', nama: 'Kartu pembuka kelas 7–9', di: 'Jenjang Saya, kartu di bawah judul, dengan tombol ke Gaya Belajar (sejak LANJUT_071; sebelumnya Eksplorasi Tujuan).', oleh: 'Kelas 7–9.' },
      { task: 'LANJUT_069', awal: '**A2 Pintu Eksplorasi', nama: 'Pintu Eksplorasi Tujuan kelas 7–9', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 7–9.' },
      { task: 'LANJUT_069', awal: '**A3 Pintu Gaya Belajar', nama: 'Pintu Gaya Belajar kelas 7–9', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 7–9.' },
      {
        task: 'LANJUT_069',
        awal: '**A4 Kartu catatan',
        nama: 'Kartu "SMA, SMK, atau MA?" (LANJUT_069)',
        di: 'Jenjang Saya, kartu catatan di bawah seksi pintu.',
        oleh: 'Kelas 7–9.',
        faktual: {
          klaim: 'Deskripsi SMA (pendidikan umum, banyak pilihan mapel), SMK (pendidikan umum dan keterampilan bidang kerja), dan MA (pendidikan umum dengan muatan keagamaan lebih kuat).',
          sumber: 'Kemendikdasmen (SMA, SMK) dan Kemenag (MA). Di layar sudah ada catatan "Keterangan ini sedang kami cek ulang."',
        },
      },
      {
        task: 'LANJUT_069',
        awal: '**A5 Pintu Ngobrol',
        nama: 'Pintu Ngobrol Bareng LANJUT kelas 7–9',
        di: 'Jenjang Saya, seksi pintu; membuka Ngobrol (terkunci tanpa persetujuan).',
        oleh: 'Kelas 7–9 (juga perlu dilihat guru BK).',
        faktual: {
          klaim: 'Fitur Ngobrol butuh persetujuan orang tua/wali.',
          sumber: 'Gerbang bolehPakaiAi di server (403 AI_BELUM_DIIZINKAN, tests/ngobrol.test.js) dan surat persetujuan orang tua/wali DRAF.',
        },
      },
      { task: 'LANJUT_069', awal: '**B1 Kartu pembuka', nama: 'Kartu pembuka kelas 10–11', di: 'Jenjang Saya, kartu di bawah judul, dengan tombol ke Pilih Mapel.', oleh: 'Kelas 10–11.' },
      { task: 'LANJUT_069', awal: '**B2 Pintu Pilih Mapel', nama: 'Pintu Pilih Mapel kelas 10–11', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 10–11.' },
      { task: 'LANJUT_069', awal: '**B3 Pintu Eksplorasi', nama: 'Pintu Eksplorasi Tujuan kelas 10–11', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 10–11.' },
      { task: 'LANJUT_069', awal: '**B4 Pintu Arsip', nama: 'Pintu Arsip Belajar kelas 10–11', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 10–11.' },
      { task: 'LANJUT_069', awal: '**B5 Pintu Level-In', nama: 'Pintu Level-In kelas 10–11', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 10–11.' },
      { task: 'LANJUT_069', awal: '**B6 Pintu Daftar Periksa', nama: 'Pintu Daftar Periksa kelas 10–11', di: 'Jenjang Saya, seksi pintu.', oleh: 'Kelas 10–11.' },
      {
        task: 'LANJUT_069',
        awal: '**Daftar Periksa kelas 10–11',
        nama: 'Kalimat netral Daftar Periksa kelas 10–11',
        di: 'Daftar Periksa, di bawah judul, menggantikan pesan "Bagian ini untuk kelas 12"; butir pribadi tampil di bawahnya.',
        oleh: 'Kelas 10–11.',
      },
    ],
  },
  {
    // LANJUT_071: letak diperiksa ke kode. Komponen BukanKelas12
    // (components/screens/KhususKelas12.tsx) hanya dirender di CekPosisiScreen
    // dan DaftarPeriksaScreen. Beranda tidak memakainya: sejak LANJUT_064 bagian
    // tenggat hanya dirender untuk kelas 12, untuk kelas lain tidak ada apa pun.
    kelompok: 'Bagian khusus kelas 12 (Cek Posisi, Daftar Periksa) — pengganti untuk kelas lain',
    butir: [
      {
        task: 'LANJUT_035',
        awal: '**Kelas 7–11 — judul:**',
        nama: 'Pengganti kelas 7–11 — judul',
        di: 'Cek Posisi Gue (kelas 7–11) dan Daftar Periksa (kelas 7–9 saja; kelas 10–11 sejak LANJUT_069 melihat kalimat netral), menggantikan isinya. Tidak tampil di Beranda.',
        oleh: 'Kelas 7–11 (di Daftar Periksa hanya kelas 7–9).',
        faktual: {
          klaim: 'Bersama isi di bawahnya: jadwal dan persiapan SNBP, SNBT, dan TKA hanya untuk kelas 12.',
          sumber: 'Kemendikdasmen (TKA: jenjang yang diikutkan), SNPMB (SNBP/SNBT). Perlu dipastikan apakah ada TKA untuk jenjang lain yang relevan bagi siswa kelas 7–9.',
        },
      },
      {
        task: 'LANJUT_035',
        awal: '**Kelas 7–11 — isi:**',
        nama: 'Pengganti kelas 7–11 — isi',
        di: 'Sama dengan butir judul di atasnya: Cek Posisi Gue (kelas 7–11) dan Daftar Periksa (kelas 7–9).',
        oleh: 'Kelas 7–11 (di Daftar Periksa hanya kelas 7–9).',
        faktual: {
          klaim: 'Isi bagian ini adalah jadwal dan persiapan SNBP, SNBT, dan TKA (lihat butir judul di atasnya).',
          sumber: 'Sama dengan butir judul di atasnya.',
        },
      },
      { task: 'LANJUT_035', awal: '**Kelas 7–11 — tombol:**', nama: 'Pengganti kelas 7–11 — tombol', di: 'Sama dengan butir judul di atasnya: Cek Posisi Gue (kelas 7–11) dan Daftar Periksa (kelas 7–9).', oleh: 'Kelas 7–11 (di Daftar Periksa hanya kelas 7–9).' },
      { task: 'LANJUT_035', awal: '**Kelas kosong — judul:**', nama: 'Pengganti tanpa kelas — judul', di: 'Cek Posisi Gue dan Daftar Periksa (jaring pengaman; biasanya tertahan di gerbang isi kelas dulu). Tidak tampil di Beranda.', oleh: 'Akun tanpa kelas.' },
      { task: 'LANJUT_035', awal: '**Kelas kosong — isi:**', nama: 'Pengganti tanpa kelas — isi', di: 'Sama dengan butir di atasnya.', oleh: 'Akun tanpa kelas.' },
      { task: 'LANJUT_035', awal: '**Kelas kosong — tombol:**', nama: 'Pengganti tanpa kelas — tombol', di: 'Sama dengan butir di atasnya.', oleh: 'Akun tanpa kelas.' },
    ],
  },
  {
    kelompok: 'Daftar Periksa',
    butir: [
      {
        task: 'LANJUT_034',
        awal: '**Dari Pilih Mapel',
        nama: 'Butir dari Pilih Mapel',
        di: 'Dibuat saat menekan "Simpan ke Daftar Periksa" di hasil Pilih Mapel (dengan prodi); tampil di Daftar Periksa, kategori Pendaftaran, langsung tercentang.',
        oleh: 'Daftar Periksa hanya tampil untuk kelas 12; butirnya bisa dibuat dari kelas mana pun lewat Pilih Mapel.',
        faktual: {
          klaim: 'Dua mapel yang disebut sebagai mapel TKA untuk prodi itu, diambil dari pemetaan prodi → mapel bobot 3 yang masih berasal dari mockup (lembar verifikasi konten, bagian Prodi).',
          sumber: 'SNPMB (mapel pendukung program studi), Kemendikdasmen (mapel pilihan TKA).',
        },
      },
      {
        task: 'LANJUT_034',
        awal: '**Dari Eksplorasi Tujuan',
        nama: 'Butir dari Eksplorasi Tujuan',
        di: 'Dibuat saat menekan "Simpan ke Daftar Periksa" di profil Eksplorasi Tujuan; tampil di Daftar Periksa, kategori Riset Kampus, belum tercentang.',
        oleh: 'Daftar Periksa hanya tampil untuk kelas 12.',
      },
      { task: 'LANJUT_034', awal: '**Tombol di butir milik akun:**', nama: 'Tombol Hapus', di: 'Daftar Periksa, pada butir milik akun.', oleh: 'Kelas 12.' },
      { task: 'LANJUT_034', awal: '**Galat centang/hapus:**', nama: 'Galat centang/hapus', di: 'Daftar Periksa, saat centang atau hapus gagal tersimpan.', oleh: 'Kelas 12.' },
    ],
  },
  {
    kelompok: 'Eksplorasi Tujuan (F10)',
    butir: [
      {
        task: 'LANJUT_031',
        awal: '**Belum ada profil terverifikasi — judul:**',
        nama: 'Belum ada profil — judul',
        di: 'Eksplorasi Tujuan, selama belum ada satu pun profil terverifikasi (keadaan semua siswa saat ini).',
        oleh: 'Semua akun yang membuka Eksplorasi Tujuan (pintu kelas 7–11 di Jenjang Saya, atau dari hasil Pilih Mapel).',
      },
      {
        task: 'LANJUT_031',
        awal: '**Belum ada profil terverifikasi — isi:**',
        nama: 'Belum ada profil — isi',
        di: 'Sama dengan butir di atasnya.',
        oleh: 'Sama dengan butir di atasnya.',
        faktual: {
          klaim: 'Janji bahwa isi profil baru tampil setelah dicek ke sumber resmi. Benar menurut kode (server hanya mengirim profil terverifikasi), tetapi bergantung pada standar pemeriksaan tim konten.',
          sumber: 'Standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046).',
        },
      },
      { task: 'LANJUT_031', awal: '**Tombol:** Kembali ke Pilih Mapel', nama: 'Tombol kembali & prodi lain', di: 'Eksplorasi Tujuan: di keadaan kosong, dan di bawah profil.', oleh: 'Semua akun yang membuka Eksplorasi Tujuan.' },
      {
        task: 'LANJUT_031',
        awal: '**Lencana SMK:**',
        nama: 'Lencana "Relevan untuk RPL/TKJ/Teknik"',
        di: 'Profil Eksplorasi Tujuan, di bawah nama prodi, hanya untuk profil yang ditandai relevan.',
        oleh: 'Semua akun yang membuka profil itu.',
        faktual: {
          klaim: 'Prodi ini relevan untuk jurusan SMK RPL, TKJ, atau Teknik (kolom badge_relevan_smk di profil-prodi.json). Dasar penilaiannya perlu dipastikan.',
          sumber: 'Kurikulum prodi (dokumen resmi kampus) dibandingkan dengan program keahlian SMK (Kemendikdasmen).',
        },
      },
      {
        task: 'LANJUT_031',
        awal: '**Baris sumber peminat:**',
        nama: 'Baris sumber angka pendaftar',
        di: 'Profil Eksplorasi Tujuan, kartu angka pendaftar.',
        oleh: 'Semua akun yang membuka profil.',
        faktual: {
          klaim: 'Angka pendaftar berasal dari SNPMB untuk jalur, tahun, dan kampus yang disebut.',
          sumber: 'SNPMB (daya tampung & peminat); angka per profil dicek di lembar verifikasi konten.',
        },
      },
      {
        task: 'LANJUT_044',
        awal: '**Penjelas Perkiraan:**',
        nama: 'Penjelas label "Perkiraan"',
        di: 'Profil Eksplorasi Tujuan, tepat di bawah lencana "Perkiraan" pada setiap bagian yang berlabel itu (saat ini mata kuliah dan profesi).',
        oleh: 'Semua akun yang membuka profil dengan bagian "Perkiraan".',
        faktual: {
          klaim: 'Bagian berlabel "Perkiraan" disusun dari sumber umum, belum dari sumber resmi.',
          sumber: 'Definisi di kepala profil-prodi.json ("Perkiraan" = sumber sekunder atau gambaran umum).',
        },
      },
      {
        task: 'LANJUT_045',
        awal: '**Keempat bagian "Terverifikasi":**',
        nama: 'Kaki halaman — semua bagian terverifikasi',
        di: 'Profil Eksplorasi Tujuan, kaki halaman, bila keempat bagian "Terverifikasi".',
        oleh: 'Semua akun yang membuka profil seperti itu (saat ini 4 dari 18 profil).',
        faktual: {
          klaim: 'Janji ke siswa bahwa isi profil "dicek ke sumber resmi" pada tanggal itu.',
          sumber: 'Hanya benar bila pemeriksa mengikuti standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046).',
        },
      },
      {
        task: 'LANJUT_045',
        awal: '**Ada bagian "Perkiraan":**',
        nama: 'Kaki halaman — ada bagian Perkiraan',
        di: 'Profil Eksplorasi Tujuan, kaki halaman, bila ada bagian "Perkiraan".',
        oleh: 'Semua akun yang membuka profil seperti itu (saat ini 14 dari 18 profil).',
        faktual: {
          klaim: 'Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi"; bagian Perkiraan belum.',
          sumber: 'Sama dengan butir di atasnya.',
        },
      },
      {
        task: 'LANJUT_045',
        awal: '**Ada bagian tanpa status di data**',
        nama: 'Kaki halaman — ada bagian tanpa status',
        di: 'Profil Eksplorasi Tujuan, kaki halaman, bila ada bagian tanpa status di data (tidak terjadi di data saat ini).',
        oleh: 'Saat ini tidak ada.',
        faktual: {
          klaim: 'Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi".',
          sumber: 'Sama dengan butir di atasnya.',
        },
      },
    ],
  },
  {
    kelompok: 'Arsip Belajar',
    butir: [
      { task: 'LANJUT_039', awal: '**Pintu di Beranda:**', nama: 'Pintu di Beranda', di: 'Beranda (Linimasa), kartu pintu.', oleh: 'Semua kelas.' },
      { task: 'LANJUT_039', awal: '**Daftar:**', nama: 'Daftar kartu', di: 'Arsip Belajar, daftar kartu.', oleh: 'Semua akun.' },
      { task: 'LANJUT_039', awal: '**Judul halaman (page bar):**', nama: 'Judul halaman', di: 'Arsip Belajar, bilah judul tiap halaman.', oleh: 'Semua akun.' },
      { task: 'LANJUT_039', awal: '**Formulir:**', nama: 'Formulir kartu', di: 'Arsip Belajar, tulis/ubah kartu.', oleh: 'Semua akun.' },
      { task: 'LANJUT_039', awal: '**Galat formulir:**', nama: 'Galat formulir', di: 'Arsip Belajar, saat menyimpan kartu yang belum lengkap.', oleh: 'Semua akun.' },
      { task: 'LANJUT_039', awal: '**Lihat kartu:**', nama: 'Lihat kartu', di: 'Arsip Belajar, halaman satu kartu.', oleh: 'Semua akun.' },
      { task: 'LANJUT_039', awal: '**Konfirmasi hapus:**', nama: 'Konfirmasi hapus', di: 'Arsip Belajar, sebelum kartu dihapus.', oleh: 'Semua akun.' },
      { task: 'LANJUT_039', awal: '**Kartu tidak ditemukan:**', nama: 'Kartu tidak ditemukan', di: 'Arsip Belajar, membuka kartu yang sudah tidak ada.', oleh: 'Semua akun.' },
    ],
  },
  {
    kelompok: 'Arsip Belajar — Modul (materi unggahan)',
    butir: [
      { task: 'LANJUT_049', awal: '**Bagian Modul di Arsip:**', nama: 'Bagian Modul', di: 'Arsip Belajar, di bawah daftar kartu.', oleh: 'Semua akun.' },
      { task: 'LANJUT_049', awal: '**Daftar modul:**', nama: 'Daftar modul', di: 'Arsip Belajar, bagian Modul.', oleh: 'Akun yang punya modul.' },
      { task: 'LANJUT_049', awal: '**Cari di modul:**', nama: 'Cari di modul', di: 'Arsip Belajar, bagian Modul (hanya modul sendiri).', oleh: 'Akun yang punya modul.' },
      { task: 'LANJUT_049', awal: '**Hapus semua modul:**', nama: 'Hapus semua modul', di: 'Arsip Belajar, bagian Modul; konfirmasi dua langkah.', oleh: 'Akun yang punya modul.' },
      { task: 'LANJUT_049', awal: '**Lihat modul:**', nama: 'Lihat & hapus modul', di: 'Halaman satu modul (/arsip-modul).', oleh: 'Pemilik modul.' },
      { task: 'LANJUT_049', awal: '**Modul tidak ditemukan:**', nama: 'Modul tidak ditemukan', di: 'Halaman satu modul, bila modul sudah dihapus atau milik akun lain.', oleh: 'Semua akun.' },
      {
        task: 'LANJUT_049',
        awal: '**Peringatan sebelum unggah:**',
        nama: 'Peringatan sebelum unggah',
        di: 'Formulir unggah modul, paling atas.',
        oleh: 'Semua akun yang mengunggah modul.',
        faktual: {
          klaim: 'Yang disimpan hanya teks, bukan berkas asli; modul bisa dihapus permanen. Juga larangan mengunggah data pribadi dan materi yang tidak boleh dipakai (hak cipta).',
          sumber: 'Perilaku server (LANJUT_049: berkas tidak ditulis ke disk, hapus permanen + perapian indeks); aspek hak cipta perlu ditinjau ahli hukum.',
        },
      },
      { task: 'LANJUT_049', awal: '**Formulir unggah:**', nama: 'Formulir unggah', di: 'Formulir unggah modul (/arsip-modul-unggah).', oleh: 'Semua akun yang mengunggah modul.' },
      { task: 'LANJUT_049', awal: '**Galat formulir:**', nama: 'Galat formulir', di: 'Formulir unggah, sebelum dikirim.', oleh: 'Semua akun yang mengunggah modul.' },
      { task: 'LANJUT_049', awal: '**Galat unggah dari server', nama: 'Galat unggah (tipe, ukuran, karakter, jumlah, PDF)', di: 'Formulir unggah, bila server menolak.', oleh: 'Semua akun yang mengunggah modul.' },
    ],
  },
  {
    kelompok: 'Latihan',
    butir: [
      { task: 'LANJUT_041', awal: '**Pintu di Arsip Belajar:**', nama: 'Pintu di Arsip Belajar', di: 'Arsip Belajar, tombol menuju Latihan.', oleh: 'Semua akun.' },
      { task: 'LANJUT_041', awal: '**Sebelum mulai:**', nama: 'Sebelum mulai', di: 'Latihan, sebelum sesi dimulai.', oleh: 'Semua akun yang punya kartu.' },
      { task: 'LANJUT_041', awal: '**Arsip kosong:**', nama: 'Arsip kosong', di: 'Latihan, bila belum ada kartu sama sekali.', oleh: 'Akun tanpa kartu.' },
      { task: 'LANJUT_041', awal: '**Selama sesi:**', nama: 'Selama sesi', di: 'Latihan, kartu satu per satu.', oleh: 'Semua akun yang berlatih.' },
      {
        task: 'LANJUT_041',
        awal: '**Sesudah selesai:**',
        nama: 'Sesudah selesai',
        di: 'Latihan, ringkasan akhir sesi.',
        oleh: 'Semua akun yang berlatih.',
        catatan: 'Potongan "Beres. [b] benar dari [i]." sudah disetujui (kepala blok); yang diputuskan adalah bagian lain di butir ini.',
      },
      { task: 'LANJUT_041', awal: '**Penyimpanan:**', nama: 'Penyimpanan hasil', di: 'Latihan, ringkasan akhir sesi.', oleh: 'Semua akun yang berlatih.' },
      { task: 'LANJUT_041', awal: '**Tombol akhir:**', nama: 'Tombol akhir', di: 'Latihan, ringkasan akhir sesi.', oleh: 'Semua akun yang berlatih.' },
      { task: 'LANJUT_041', awal: '**Galat mulai:**', nama: 'Galat mulai', di: 'Latihan, bila sesi gagal dimulai.', oleh: 'Semua akun.' },
      { task: 'LANJUT_041', awal: '**Riwayat Latihan:**', nama: 'Riwayat Latihan', di: 'Riwayat Latihan.', oleh: 'Semua akun.' },
      { task: 'LANJUT_058', awal: '**Latihan — pertanyaan keyakinan:**', nama: 'Pertanyaan keyakinan', di: 'Latihan, tiap kartu sebelum jawaban dibuka.', oleh: 'Semua akun yang berlatih.' },
      { task: 'LANJUT_058', awal: '**Latihan — setelah jawaban dibuka:**', nama: 'Keyakinan setelah jawaban dibuka', di: 'Latihan, di atas jawaban.', oleh: 'Semua akun yang berlatih.' },
      { task: 'LANJUT_058', awal: '**Latihan — tombol ke Level-In:**', nama: 'Tombol ke Level-In', di: 'Latihan, sebelum mulai dan ringkasan akhir sesi.', oleh: 'Semua akun.' },
    ],
  },
  {
    kelompok: 'Level-In',
    butir: [
      { task: 'LANJUT_058', awal: '**Beranda — pintu Level-In:**', nama: 'Pintu di Beranda', di: 'Beranda, di bawah Arsip Belajar.', oleh: 'Semua akun (kelas 7–12).' },
      { task: 'LANJUT_058', awal: '**Level-In — judul & pengantar:**', nama: 'Judul & pengantar', di: 'Level-In (/level-in).', oleh: 'Semua akun.' },
      { task: 'LANJUT_058', awal: '**Level-In — belum pernah latihan:**', nama: 'Belum pernah latihan', di: 'Level-In, akun tanpa jawaban latihan.', oleh: 'Akun yang belum pernah berlatih.' },
      { task: 'LANJUT_058', awal: '**Level-In — galat:**', nama: 'Galat', di: 'Level-In, bila server tidak bisa dihubungi.', oleh: 'Semua akun.' },
      { task: 'LANJUT_058', awal: '**Level-In — per mapel:**', nama: 'Per mapel', di: 'Level-In, satu kartu per mapel yang sudah dilatih.', oleh: 'Akun yang sudah berlatih.' },
      {
        task: 'LANJUT_058',
        awal: '**Level-In — level dan artinya:**',
        nama: 'Level dan artinya',
        di: 'Level-In, kartu mapel dengan level.',
        oleh: 'Akun dengan jawaban cukup di satu mapel.',
        faktual: {
          klaim: 'Arti level menyebut batas persen jawaban benar.',
          sumber: 'Konfigurasi Level-In (level_batas_bawah, level_batas_atas; tabel fallback LANJUT_042) dan levelAkurasiPerMapel di server.',
        },
      },
      { task: 'LANJUT_058', awal: '**Level-In — belum cukup data:**', nama: 'Belum cukup data', di: 'Level-In, kartu mapel tanpa level.', oleh: 'Akun dengan jawaban sedikit di satu mapel.' },
      {
        task: 'LANJUT_058',
        awal: '**Level-In — keyakinan:**',
        nama: 'Keyakinan',
        di: 'Level-In, seksi Keyakinanmu.',
        oleh: 'Akun yang sudah berlatih.',
        faktual: {
          klaim: 'Terlalu yakin = sering memilih "Yakin" tapi jawabannya salah.',
          sumber: 'Pola kalibrasi server (agregatPerMapel, salinan PWA; ambang_overconfident, minimum_kartu).',
        },
      },
      { task: 'LANJUT_058', awal: '**Level-In — saran hari ini:**', nama: 'Saran hari ini', di: 'Level-In, kartu saran.', oleh: 'Akun yang sudah berlatih.' },
    ],
  },
];

const cocok = (b, aturan) => b.task === aturan.task && b.teks.startsWith(aturan.awal);

/** Butir per kelompok PETA + pengecualian + yang belum dipetakan. */
function susunButir(blok) {
  const semua = blok.flatMap((k) => k.butir);
  const dikecualikan = [];
  const kelompok = PETA.map((g) => ({ kelompok: g.kelompok, butir: [] }));
  const belumDipetakan = [];
  for (const b of semua) {
    const p = PENGECUALIAN.find((a) => cocok(b, a));
    if (p) {
      dikecualikan.push({ ...b, alasan: p.alasan });
      continue;
    }
    let ketemu = false;
    PETA.forEach((g, gi) => {
      const meta = !ketemu && g.butir.find((a) => cocok(b, a));
      if (meta) {
        kelompok[gi].butir.push({ ...b, meta });
        ketemu = true;
      }
    });
    if (!ketemu) belumDipetakan.push(b);
  }
  // Urutan dalam kelompok = urutan PETA (alur di app), bukan urutan berkas.
  PETA.forEach((g, gi) => {
    kelompok[gi].butir.sort((x, y) => g.butir.indexOf(x.meta) - g.butir.indexOf(y.meta));
  });
  return { semua, dikecualikan, kelompok: kelompok.filter((g) => g.butir.length), belumDipetakan };
}

// --- menyusun Markdown --------------------------------------------------------

/** Baris sumber (dan sambungannya) sebagai kutipan, apa adanya. */
const kutipan = (b) => [`> ${b.teks}`, ...b.sambungan.map((s) => `> ${s.trim()}`)].join('\n');
const asal = (b) => `§${b.bagian} ${b.judulBagian} · ${b.task} · baris ${b.baris}`;

function susunMarkdown(isi) {
  const blok = bacaBlokDraf(isi);
  const { semua, dikecualikan, kelompok, belumDipetakan } = susunButir(blok);
  const sidik = crypto.createHash('sha256').update(isi).digest('hex').slice(0, 12);
  const nomor = new Map();
  let n = 0;
  for (const g of kelompok) for (const b of g.butir) nomor.set(b, ++n);
  for (const b of belumDipetakan) nomor.set(b, ++n);
  const jumlahButir = n;

  const out = [
    '# Lembar Review Draf Teks LANJUT',
    '',
    `Disusun otomatis dengan \`npm run lembar-review-teks\` (folder \`LANJUT_App/server\`) dari \`docs/salinan-teks-lanjut.md\` (sidik \`${sidik}\`). Lembar ini **hanya bacaan**: mengisinya tidak mengubah teks apa pun di app. Bunyi teks disalin persis dari berkas sumber.`,
    '',
    `**${jumlahButir} butir** dari ${blok.length} blok DRAF menunggu keputusan. ${dikecualikan.length} baris lain di blok DRAF tidak dijadikan butir karena sudah disetujui atau bukan teks yang tampil (lihat Lampiran).`,
    '',
    '## Cara memakai lembar ini',
    '',
    '1. Untuk setiap butir, centang **satu** keputusan (ganti `[ ]` menjadi `[x]`): **Setuju**, **Ubah**, atau **Tolak**.',
    '2. Kalau memilih **Ubah**, tulis bunyi barunya di kolom Revisi. Kalau memilih **Tolak**, tulis alasannya di Catatan.',
    '3. `[kelas]`, `[mapel]`, `[nama prodi]`, `[n]`, dan sejenisnya adalah isian yang diganti app saat tampil.',
    '4. Butir bertanda ⚠ menyentuh klaim faktual. Daftarnya ada di bagian berikut; periksa juga sumbernya.',
    '5. Setelah diputuskan, perubahan dikerjakan sebagai task terpisah: `salinan-teks-lanjut.md` dan kode app diperbarui, lalu lembar ini dibuat ulang. Butir yang disetujui tidak muncul lagi di lembar berikutnya.',
    '',
    '## Butir yang menyentuh klaim faktual',
    '',
    'Butir ini menyatakan sesuatu tentang aturan seleksi, data kampus, atau proses pengecekan. Butir seperti ini perlu perhatian ekstra, dan kemungkinan perlu dicek ke sumbernya sebelum disetujui.',
    '',
    '| No | Butir | Klaim | Sumber yang mungkin |',
    '|---|---|---|---|',
  ];
  for (const g of kelompok) {
    for (const b of g.butir) {
      if (!b.meta.faktual) continue;
      out.push(`| ${nomor.get(b)} | ${b.meta.nama} (§${b.bagian}, ${b.task}) | ${b.meta.faktual.klaim} | ${b.meta.faktual.sumber} |`);
    }
  }
  out.push('', '## Ringkasan per layar', '', '| Layar / fitur | Butir | Nomor |', '|---|---|---|');
  for (const g of kelompok) {
    const no = g.butir.map((b) => nomor.get(b));
    out.push(`| ${g.kelompok} | ${g.butir.length} | ${no[0]}–${no[no.length - 1]} |`);
  }
  if (belumDipetakan.length) out.push(`| **Belum dipetakan** | ${belumDipetakan.length} | — |`);
  out.push('');

  const blokButir = (b, meta) => {
    const baris = [`### ${nomor.get(b)}. ${meta ? meta.nama : b.teks.slice(0, 60)}${meta && meta.faktual ? ' ⚠' : ''}`, ''];
    baris.push(`- **Asal:** ${asal(b)}`);
    baris.push(`- **Tampil di:** ${meta ? meta.di : '**BELUM DIPETAKAN** — lengkapi PETA di tools/lembar-review-teks.js.'}`);
    baris.push(`- **Dilihat oleh:** ${meta ? meta.oleh : '—'}`);
    if (meta && meta.faktual) baris.push('- **⚠ Klaim faktual:** lihat daftar di awal lembar.');
    if (meta && meta.catatan) baris.push(`- **Catatan:** ${meta.catatan}`);
    baris.push('', '**Bunyi teks (persis dari berkas):**', '', kutipan(b), '');
    baris.push('**Keputusan:**', '', '- [ ] Setuju', '- [ ] Ubah', '- [ ] Tolak', '');
    baris.push('**Revisi (kalau Ubah):** ……', '', '**Catatan:** ……', '', '---', '');
    return baris.join('\n');
  };

  for (const g of kelompok) {
    out.push(`## ${g.kelompok}`, '');
    for (const b of g.butir) out.push(blokButir(b, b.meta));
  }
  if (belumDipetakan.length) {
    out.push('## Belum dipetakan', '', 'Butir DRAF baru yang letak dan pembacanya belum dicatat di PETA.', '');
    for (const b of belumDipetakan) out.push(blokButir(b, null));
  }

  out.push('## Lampiran: baris di blok DRAF yang tidak dijadikan butir', '');
  for (const b of dikecualikan) out.push(`- ${asal(b)} — ${b.alasan}`, '', kutipan(b), '');
  out.push(
    '## Lampiran: blok DRAF di berkas sumber',
    '',
    '| Bagian | Task | Baris | Butir di blok |',
    '|---|---|---|---|',
    ...blok.map((k) => `| §${k.bagian} ${k.judulBagian} | ${k.task} | ${k.baris} | ${k.butir.length} |`),
    `| **Jumlah** | | | **${semua.length}** (${jumlahButir} butir keputusan + ${dikecualikan.length} di lampiran) |`,
    ''
  );
  return { md: out.join('\n'), blok, jumlahButir, dikecualikan, belumDipetakan, kelompok };
}

function susunLembarTeks() {
  return susunMarkdown(fs.readFileSync(SALINAN, 'utf8'));
}

function jalankan(argv) {
  let keluaran = KELUARAN_BAWAAN;
  for (const a of argv) {
    const m = /^--keluar=(.+)$/.exec(a);
    if (!m) throw new Error(`Argumen "${a}" tidak dikenal. Pilihan: --keluar=berkas.md`);
    keluaran = path.resolve(m[1]);
  }
  const hasil = susunLembarTeks();
  fs.mkdirSync(path.dirname(keluaran), { recursive: true });
  fs.writeFileSync(keluaran, hasil.md, 'utf8');
  console.log(
    `[lembar-review-teks] ${hasil.jumlahButir} butir dari ${hasil.blok.length} blok DRAF` +
      (hasil.belumDipetakan.length ? ` (${hasil.belumDipetakan.length} BELUM DIPETAKAN)` : '') +
      ` → ${keluaran}`
  );
  return hasil;
}

if (require.main === module) {
  try {
    jalankan(process.argv.slice(2));
  } catch (galat) {
    console.error(`[lembar-review-teks] GAGAL: ${galat.message}`);
    process.exit(1);
  }
}

module.exports = { bacaBlokDraf, susunMarkdown, susunLembarTeks, jalankan, SALINAN, KELUARAN_BAWAAN, PETA, PENGECUALIAN };
