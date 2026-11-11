# Audit rujukan v2 di repo induk

**Task:** LANJUT_015 seri v2.
**Dasar:** repo induk commit `145859d`, `lanjut_app` commit `d323006`.
**Sifat:** catatan pencarian teks, bukan tinjauan hukum.

## 1. Semua kemunculan "Jalur Saya"

Di luar `LANJUT_App` dan `MVP-PWA` ada 160 baris. Nomor baris mengikuti commit dasar. Baris 878 di `docs/salinan-teks-lanjut.md` memuat dua kemunculan dengan golongan berbeda, lihat bagian 3.

| Berkas | Baris | Menunjuk | Tindakan |
|---|---|---|---|
| `docs/DESIGN-landpage.md` | 53 | Layar `/cek-posisi` | Diubah ke "Profil Saya" |
| `docs/LANJUT_004_Jalur-Saya-Profil.md` | 1, 5, 18, 34, 43, 58 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_005_Cek-Posisi-Gue.md` | 7, 21, 51 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_006_Checklist-Personal-Prodi.md` | 5, 22, 30, 36, 47, 57 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_009_Audit-Pilih-Mapel-Decision-Support.md` | 21 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_012_Spek-AI-Navigator-V2.md` | 7 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_013_Cek-Posisi-Tenggat-Rumpun.md` | 27, 35 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_028_Kerangka-Studi-Kasus-Portofolio.md` | 27, 101 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_029_Audit-Kesenjangan-Fitur.md` | 19, 62, 64 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_032_UI-Chat-Explorer-Stub.md` | 15 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_035_Dukungan-Jenjang-SMP.md` | 42 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_036_Wajib-Isi-Kelas.md` | 8, 23, 32, 57 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_047_Kerangka-Persetujuan-dan-Kebijakan-Privasi.md` | 70, 121 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_048_Layar-Terima-Kebijakan-Akun-Lama.md` | 40, 57, 76 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_074_Beranda-Hero-Navigasi-Ngobrol.md` | 26, 86, 88, 90, 131, 134 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_077b_Saklar-AI-dan-Sisa-Teks-Kelas-12.md` | 1, 15, 30, 31, 62, 73 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_079_Pilih-Mapel-Prodi-dan-Mapel-Saya.md` | 30 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_079b_Perbaikan-Mapel-Pilihan.md` | 29 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_080_Persiapan-Uji-Rilis.md` | 43 | Sejarah: berkas task lama | Dibiarkan |
| `docs/LANJUT_081_APK-Demo-Lokal-dan-Uji-HP.md` | 70 | Sejarah: berkas task lama | Dibiarkan |
| `docs/audit-kebijakan-privasi.md` | 58, 60, 105, 141 | Sejarah: audit atau peta bertanggal | Dibiarkan |
| `docs/kebijakan-privasi-DRAF.md` | 440 | Layar Data Akun | Diubah ke "Data Akun" |
| `docs/kebijakan-v2-klaim-vs-kode.md` | 144, 148 | Layar Data Akun | Diubah ke "Data Akun" |
| `docs/lembar-review-draf-teks.md` | 80, 85, 90, 754, 762, 779, 820, 2118, 2126, 2473, 2478, 2479, 2501, 2502, 2524, 2525, 2546, 3575, 3580, 3641, 3682, 3686, 3708, 3730, 3752, 3774, 3796, 3819, 3820, 3841, 3842, 3863, 3864, 3885, 3886, 3907, 3908, 3929, 3930, 3951, 3952, 3973, 3974, 3995, 3996, 4017, 4018, 4039, 4040, 4059, 4061, 4062, 4067, 6118 | Hasil alat lembar review | Dibangun ulang, lihat bagian 5 |
| `docs/peta-kelengkapan-2026-10-09.md` | 126 | Sejarah: audit atau peta bertanggal | Dibiarkan |
| `docs/salinan-teks-lanjut.md` | 110, 131, 154, 179, 343, 611, 617, 621, 865, 878, 884, 892, 893 | Layar `/cek-posisi` | Diubah ke "Profil Saya" |
| `docs/salinan-teks-lanjut.md` | 199 | Sejarah: judul blok LANJUT_074 | Dibiarkan |
| `docs/salinan-teks-lanjut.md` | 214, 244, 915 | Layar `/cek-posisi`, terkunci oleh `lanjut_app` | Dibiarkan, lihat bagian 3 |
| `docs/surat-persetujuan-ortu-wali-DRAF.md` | 91 | Layar Data Akun | Diubah ke "Data Akun" |
| `docs/uji-rilis/inventaris-080.md` | 108 | Sejarah: rekaman uji masa lalu | Dibiarkan |
| `docs/uji-rilis/rencana-uji-rilis.md` | 15, 112, 128, 135, 136, 140 | Layar `/cek-posisi`, di panduan uji yang masih dipakai | Diubah ke "Profil Saya" |
| `docs/uji-rilis/skenario-demo.md` | 34, 53, 90, 91, 96, 125, 151, 165, 172 | Layar `/cek-posisi`, di panduan uji yang masih dipakai | Diubah ke "Profil Saya" |
| `docs/uji-rilis/uji-chatbot-ai-2026-10-15.md` | 40, 91, 92, 129, 130 | Sejarah: rekaman uji masa lalu | Dibiarkan |
| `landing/src/konten/beranda.ts` | 46, 69 | Layar `/cek-posisi` | Diubah ke "Profil Saya" |
| `landing/src/konten/docs.ts` | 278, 717, 815 | Layar `/cek-posisi` | Diubah ke "Profil Saya" |
| `landing/src/konten/fitur.ts` | 108, 114 | Layar `/cek-posisi` | Diubah ke "Profil Saya" |

`landing/src/data/kebijakan-privasi.json` tidak lagi memuat nama itu sejak LANJUT_014b.

**Kata "jalur" untuk SNBP, SNBT, dan Mandiri tidak diubah (T6).** Pencarian ini hanya mencocokkan frasa "Jalur Saya". Kalimat seperti "Pahami jalur dan mapelnya" dan "Tidak tahu jalur yang tepat" di `landing/src/konten/beranda.ts` tetap utuh. Pengenal `jalur-saya` dan berkas `jalur-saya.webp` juga tetap, karena bukan teks yang tampil.

`docs/uji-rilis/rencana-uji-rilis.md` dan `skenario-demo.md` berisi langkah uji, bukan hasil, jadi diperlakukan sebagai panduan yang masih dipakai. Keduanya diberi catatan bahwa APK 1.0.0 masih menampilkan nama lama.

## 2. Pernyataan tentang pengumpulan foto dan data

| Berkas dan baris | Bunyi | Golongan | Tindakan |
|---|---|---|---|
| `docs/surat-persetujuan-ortu-wali-DRAF.md` 57–58 | Tidak mengumpulkan lokasi, kontak, foto | Aktif, salah begitu Portofolio menyala | Diubah |
| `docs/kebijakan-v2-klaim-vs-kode.md` N1 dan bagian 8 | Tidak mengumpulkan foto | Aktif | Diubah |
| `docs/kebijakan-v2-klaim-vs-kode.md` H3 | Fitur hapus akun belum ada | Aktif | Diubah |
| `docs/kebijakan-privasi-DRAF.md`, `landing/src/data/kebijakan-privasi.json` | Foto dan hapus akun | Aktif, sudah benar sejak LANJUT_014b | Tidak diubah |
| `docs/audit-kebijakan-privasi.md` 51, 61, 88, 136, 137, 139, 140, 144, 175 | Mengutip kalimat lama | Sejarah | Dibiarkan |
| `docs/peta-kelengkapan-2026-10-09.md` 217 | Hapus akun belum ada | Sejarah, catatan bertanggal | Dibiarkan |
| `docs/uji-rilis/rencana-uji-rilis.md` 81 | App belum punya fitur hapus akun | Panduan, tetapi bukan rujukan layar | Dibiarkan. Akun uji memang dihapus tim |
| `docs/PRD-landpage.md` 223 | Larangan mengklaim tidak mengumpulkan data | Aktif, sudah benar | Tidak diubah |
| `docs/SDD-Backend-Foundation.md` 1065 | Risiko menyimpan data siswa | Sejarah desain | Dibiarkan |
| `landing/src/halaman/Privasi.tsx` 8, 60 | Tentang situs landing, bukan aplikasi | Aktif, sudah benar | Tidak diubah |

## 3. Baris yang terkunci oleh `lanjut_app`

LANJUT_015 tidak boleh mengubah `lanjut_app`, sedangkan empat tempat di `docs/salinan-teks-lanjut.md` dipakai sebagai penanda di sana. Mengubahnya mematahkan tes, jadi dibiarkan dan dicatat di akhir berkas salinan.

| Baris | Bunyi awal | Dikunci oleh |
|---|---|---|
| 214 | `**Nama fitur \`/cek-posisi\`:** Jalur Saya` | `server/tests/beranda-hero-navigasi.test.js:434` |
| 244 | `Jalur Saya — Lihat kamu lagi...` | `server/tools/lembar-review-teks.js:512` |
| 878 (label saja) | `**Rumpun favorit (Jalur Saya` | `server/tools/lembar-review-teks.js:794` |
| 915 | `**Penafian Jalur Saya (diubah):**` | `server/tools/lembar-review-teks.js:842` |

Untuk merapikannya perlu satu PR kecil di `lanjut_app`: satu baris tes, tiga penanda, dan label di alat lembar.

## 4. Sinkronisasi landing

`landing/src/data/kebijakan-privasi.json` dibentuk oleh `npm run landing-kebijakan` (folder `LANJUT_App/server`). Sesudah LANJUT_014 tidak ada perubahan yang perlu ditulis. Bagian `status`, `versi`, `ringkasan`, dan `isi` identik dengan `lib/kebijakan-privasi.json`. Satu-satunya perbedaan adalah `_catatan`, catatan pengembang yang memang tidak disalin.

## 5. Lembar review

Sebelum dibangun ulang, `docs/lembar-review-draf-teks.md` kosong: 266 butir, tidak ada kotak tercentang, semua kolom Revisi dan Catatan kosong, dan isinya sama persis dengan hasil alat dari salinan lama. Sesudahnya tetap 266 butir, nomor tidak bergeser, dan tidak ada yang hilang.

Sisa "Jalur Saya" di lembar berasal dari dua sumber: label yang tertulis di `server/tools/lembar-review-teks.js`, dan bunyi baris yang terkunci di bagian 3.

## 6. Keputusan untuk Khalifa

1. Isian surat yang masih kosong: kop surat sekolah, nama badan pengelola, penyedia model, negara atau wilayah, hasil pengecekan kebijakan OpenRouter dan penyedia model, kontak resmi tim LANJUT, nomor versi saat dirilis, dan wali kelas atau kepala sekolah.
2. Apakah Portofolio perlu persetujuan orang tua atau wali sendiri. Surat hanya memberi tahu, dan butir ini perlu ditinjau pihak berwenang.
3. Gambar `landing/public/gambar/app/jalur-saya.webp` masih menampilkan judul lama dan perlu diambil ulang.
4. Landing memakai nama baru, sedangkan APK 1.0.0 masih menampilkan nama lama sampai APK v2 terbit.
5. PR kecil di `lanjut_app` untuk baris di bagian 3.
