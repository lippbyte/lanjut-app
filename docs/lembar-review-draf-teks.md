# Lembar Review Draf Teks LANJUT

Disusun otomatis dengan `npm run lembar-review-teks` (folder `LANJUT_App/server`) dari `docs/salinan-teks-lanjut.md` (sidik `d9fb352bbe32`). Lembar ini **hanya bacaan**: mengisinya tidak mengubah teks apa pun di app. Bunyi teks disalin persis dari berkas sumber.

**134 butir** dari 19 blok DRAF menunggu keputusan. 4 baris lain di blok DRAF tidak dijadikan butir karena sudah disetujui atau bukan teks yang tampil (lihat Lampiran).

## Cara memakai lembar ini

1. Untuk setiap butir, centang **satu** keputusan (ganti `[ ]` menjadi `[x]`): **Setuju**, **Ubah**, atau **Tolak**.
2. Kalau memilih **Ubah**, tulis bunyi barunya di kolom Revisi. Kalau memilih **Tolak**, tulis alasannya di Catatan.
3. `[kelas]`, `[mapel]`, `[nama prodi]`, `[n]`, dan sejenisnya adalah isian yang diganti app saat tampil.
4. Butir bertanda ⚠ menyentuh klaim faktual. Daftarnya ada di bagian berikut; periksa juga sumbernya.
5. Setelah diputuskan, perubahan dikerjakan sebagai task terpisah: `salinan-teks-lanjut.md` dan kode app diperbarui, lalu lembar ini dibuat ulang. Butir yang disetujui tidak muncul lagi di lembar berikutnya.

## Butir yang menyentuh klaim faktual

Butir ini menyatakan sesuatu tentang aturan seleksi, data kampus, atau proses pengecekan. Butir seperti ini perlu perhatian ekstra, dan kemungkinan perlu dicek ke sumbernya sebelum disetujui.

| No | Butir | Klaim | Sumber yang mungkin |
|---|---|---|---|
| 6 | Kebijakan — ringkasan 1 (§4.13, LANJUT_047) | Daftar data yang disimpan (akun, jalur, Daftar Periksa, kartu, latihan) dan tujuannya. | Inventaris data di docs/kebijakan-privasi-DRAF.md (Lampiran A), bukti per klaim di docs/kebijakan-v2-klaim-vs-kode.md, dan review ahli hukum (UU PDP). |
| 7 | Kebijakan — ringkasan 2 (§4.13, LANJUT_047) | Kata sandi disimpan dalam bentuk acak (hash). | Inventaris data di docs/kebijakan-privasi-DRAF.md (Lampiran A), bukti per klaim di docs/kebijakan-v2-klaim-vs-kode.md, dan review ahli hukum (UU PDP). |
| 8 | Kebijakan — ringkasan 3 (§4.13, LANJUT_047) | Fitur AI mengirim pesan, riwayat, profil belajar, dan (pertanyaan pelajaran) potongan modul ke penyedia AI pihak ketiga yang dapat memproses di luar Indonesia; tanpa nama, nama pengguna, email; isi obrolan tidak disimpan server; aktif setelah persetujuan orang tua/wali (draf v2, LANJUT_056). | Inventaris data di docs/kebijakan-privasi-DRAF.md (Lampiran A), bukti per klaim di docs/kebijakan-v2-klaim-vs-kode.md, dan review ahli hukum (UU PDP). |
| 9 | Kebijakan — ringkasan 4 (§4.13, LANJUT_047) | Hak siswa dan orang tua/wali: melihat, membetulkan, meminta penghapusan, mencabut persetujuan. | Inventaris data di docs/kebijakan-privasi-DRAF.md (Lampiran A), bukti per klaim di docs/kebijakan-v2-klaim-vs-kode.md, dan review ahli hukum (UU PDP). |
| 27 | Penjelas persetujuan (§4.13, LANJUT_047) | Persetujuan diberikan lewat surat dari sekolah, dibutuhkan untuk fitur AI, dan fitur lain tidak diblokir. | Keputusan Khalifa & ahli hukum soal persetujuan untuk fitur dasar (pertanyaan terbuka LANJUT_047). |
| 31 | Pengantar — belum pernah menerima (§4.14, LANJUT_048) | Semua fitur tetap bisa dipakai tanpa menerima; penerimaan dibutuhkan untuk fitur AI. | Keputusan Khalifa & ahli hukum soal persetujuan untuk fitur dasar (pertanyaan terbuka LANJUT_047). |
| 40 | Catatan AI di atas obrolan (§4.15, LANJUT_051) | LANJUT tidak menyimpan obrolan; obrolan hilang saat aplikasi ditutup. | Kode server (tidak ada tabel obrolan, isi tidak dicatat di log; tests/ngobrol.test.js). Penyimpanan di sisi OpenRouter/penyedia model mengikuti kebijakan mereka. |
| 42 | Layar terkunci — penjelasan (§4.15, LANJUT_051) | AI dari penyedia pihak ketiga; aktif setelah persetujuan orang tua/wali lewat sekolah dan kebijakan diterima. | Gerbang bolehPakaiAi (server/README.md bagian 2b) dan keputusan Khalifa soal penyedia AI. |
| 46 | Balasan tetap saat tanda bahaya akut (§4.16, LANJUT_053) | Ajakan menghubungi layanan bantuan dan orang dewasa tepercaya; isi kartu dari kartu-bantuan.json (hanya yang terverifikasi). | Review guru BK; verifikasi nomor layanan (Healing119 dicek Khalifa, 112 nomor darurat nasional, SAPA 129 belum dicek). |
| 56 | Catatan: materi & modul dikirim ke penyedia AI (§4.17, LANJUT_055) | Pertanyaan materi dan potongan modul yang berkaitan dikirim ke penyedia AI. | Kode server (ngobrol.layanan.js, LANJUT_055) dan docs/alur-data-ai-materi.md; perlu masuk kebijakan privasi v2. |
| 60 | Kartu bantuan gagal dimuat (§4.16, LANJUT_053) | 112 sebagai nomor darurat. | Nomor darurat nasional (terverifikasi di kartu-bantuan.json). |
| 73 | Kartu "SMA, SMK, atau MA?" (§4.2, LANJUT_037) | Perbedaan SMA/MA (lebih banyak teori sebagai bekal kuliah) dan SMK (keahlian lewat praktik dan PKL), serta bahwa lulusan SMK tetap bisa kuliah. | Kemendikdasmen (struktur kurikulum SMA dan SMK), Kemenag (MA), SNPMB (syarat pendaftar SNBP/SNBT untuk lulusan SMK). |
| 74 | Kartu "Belum perlu mikirin jadwal daftar" (§4.2, LANJUT_037) | Saran bahwa jadwal pendaftaran belum perlu dipikirkan di kelas 10–11, dan bahwa nilai mapel pendukung perlu dijaga sejak sekarang (bergantung pada aturan SNBP yang memakai nilai rapor). | SNPMB (ketentuan SNBP: semester rapor yang dipakai dan mapel pendukung). |
| 76 | Pembuka seksi SMK kelas 10–11 (§4.2, LANJUT_037) | Bahwa butir yang tampil untuk kelas 10–11 (portofolio dan mapel pilihan TKA yang tidak ada di SMK) sudah bisa disiapkan dari sekarang. Isi kedua butir itu sendiri belum terverifikasi (lembar verifikasi konten, bagian Khusus SMK). | SNPMB dan Direktorat SMK, sesuai sumber kedua butir Khusus SMK itu. |
| 77 | Pengganti kelas 7–11 — judul (§4.11, LANJUT_035) | Bersama isi di bawahnya: jadwal dan persiapan SNBP, SNBT, dan TKA hanya untuk kelas 12. | Kemendikdasmen (TKA: jenjang yang diikutkan), SNPMB (SNBP/SNBT). Perlu dipastikan apakah ada TKA untuk jenjang lain yang relevan bagi siswa kelas 7–9. |
| 78 | Pengganti kelas 7–11 — isi (§4.11, LANJUT_035) | Isi bagian ini adalah jadwal dan persiapan SNBP, SNBT, dan TKA (lihat butir judul di atasnya). | Sama dengan butir judul di atasnya. |
| 83 | Butir dari Pilih Mapel (§4.4, LANJUT_034) | Dua mapel yang disebut sebagai mapel TKA untuk prodi itu, diambil dari pemetaan prodi → mapel bobot 3 yang masih berasal dari mockup (lembar verifikasi konten, bagian Prodi). | SNPMB (mapel pendukung program studi), Kemendikdasmen (mapel pilihan TKA). |
| 88 | Belum ada profil — isi (§4.9, LANJUT_031) | Janji bahwa isi profil baru tampil setelah dicek ke sumber resmi. Benar menurut kode (server hanya mengirim profil terverifikasi), tetapi bergantung pada standar pemeriksaan tim konten. | Standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046). |
| 90 | Lencana "Relevan untuk RPL/TKJ/Teknik" (§4.9, LANJUT_031) | Prodi ini relevan untuk jurusan SMK RPL, TKJ, atau Teknik (kolom badge_relevan_smk di profil-prodi.json). Dasar penilaiannya perlu dipastikan. | Kurikulum prodi (dokumen resmi kampus) dibandingkan dengan program keahlian SMK (Kemendikdasmen). |
| 91 | Baris sumber angka pendaftar (§4.9, LANJUT_031) | Angka pendaftar berasal dari SNPMB untuk jalur, tahun, dan kampus yang disebut. | SNPMB (daya tampung & peminat); angka per profil dicek di lembar verifikasi konten. |
| 92 | Penjelas label "Perkiraan" (§4.9, LANJUT_044) | Bagian berlabel "Perkiraan" disusun dari sumber umum, belum dari sumber resmi. | Definisi di kepala profil-prodi.json ("Perkiraan" = sumber sekunder atau gambaran umum). |
| 93 | Kaki halaman — semua bagian terverifikasi (§4.9, LANJUT_045) | Janji ke siswa bahwa isi profil "dicek ke sumber resmi" pada tanggal itu. | Hanya benar bila pemeriksa mengikuti standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046). |
| 94 | Kaki halaman — ada bagian Perkiraan (§4.9, LANJUT_045) | Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi"; bagian Perkiraan belum. | Sama dengan butir di atasnya. |
| 95 | Kaki halaman — ada bagian tanpa status (§4.9, LANJUT_045) | Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi". | Sama dengan butir di atasnya. |
| 110 | Peringatan sebelum unggah (§4.5, LANJUT_049) | Yang disimpan hanya teks, bukan berkas asli; modul bisa dihapus permanen. Juga larangan mengunggah data pribadi dan materi yang tidak boleh dipakai (hak cipta). | Perilaku server (LANJUT_049: berkas tidak ditulis ke disk, hapus permanen + perapian indeks); aspek hak cipta perlu ditinjau ahli hukum. |
| 131 | Level dan artinya (§4.18, LANJUT_058) | Arti level menyebut batas persen jawaban benar. | Konfigurasi Level-In (level_batas_bawah, level_batas_atas; tabel fallback LANJUT_042) dan levelAkurasiPerMapel di server. |
| 133 | Keyakinan (§4.18, LANJUT_058) | Terlalu yakin = sering memilih "Yakin" tapi jawabannya salah. | Pola kalibrasi server (agregatPerMapel, salinan PWA; ambang_overconfident, minimum_kartu). |

## Ringkasan per layar

| Layar / fitur | Butir | Nomor |
|---|---|---|
| Daftar akun & gerbang awal | 23 | 1–23 |
| Jalur Saya (halaman akun) | 6 | 24–29 |
| Terima kebijakan privasi (jendela setelah login & halaman /terima-kebijakan) | 9 | 30–38 |
| Ngobrol Bareng LANJUT | 22 | 39–60 |
| Jenjang Saya (tab "Jenjang") | 16 | 61–76 |
| Bagian khusus kelas 12 (Beranda, Daftar Periksa, Cek Posisi) — pengganti untuk kelas lain | 6 | 77–82 |
| Daftar Periksa | 4 | 83–86 |
| Eksplorasi Tujuan (F10) | 9 | 87–95 |
| Arsip Belajar | 8 | 96–103 |
| Arsip Belajar — Modul (materi unggahan) | 10 | 104–113 |
| Latihan | 12 | 114–125 |
| Level-In | 9 | 126–134 |

## Daftar akun & gerbang awal

### 1. Medan Kelas

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_035 · baris 428
- **Tampil di:** Layar Daftar (buat akun), medan Kelas.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Label:** Kelas · **petunjuk:** SMP kelas 7–9, SMA/SMK kelas 10–12. · **pilihan:** Kelas 7 … Kelas 12

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 2. Galat medan Kelas

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_035 · baris 429
- **Tampil di:** Layar Daftar, saat menekan Daftar tanpa memilih kelas.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Galat:** Pilih kelasmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 3. Medan Jenis sekolah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 435
- **Tampil di:** Layar Daftar, muncul sesudah kelas 10–12 dipilih.
- **Dilihat oleh:** Pendaftar kelas 10–12 (kelas 7–9 tidak ditanya).

**Bunyi teks (persis dari berkas):**

> **Label:** Jenis sekolah · **pilihan:** SMA · SMK · MA (Madrasah Aliyah)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 4. Galat medan Jenis sekolah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 436
- **Tampil di:** Layar Daftar, kelas 10–12 tanpa jenis sekolah.
- **Dilihat oleh:** Pendaftar kelas 10–12.

**Bunyi teks (persis dari berkas):**

> **Galat:** Pilih jenis sekolahmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 5. Kebijakan — judul blok

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 487
- **Tampil di:** Layar Daftar, blok kebijakan privasi di atas tombol Daftar.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Layar Daftar — judul blok kebijakan:** Kebijakan privasi (ringkas)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 6. Kebijakan — ringkasan 1 ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 488
- **Tampil di:** Layar Daftar, blok kebijakan privasi (dari lib/kebijakan-privasi.json).
- **Dilihat oleh:** Semua pendaftar baru.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ringkasan 1:** Kami menyimpan data akunmu (nama pengguna, kelas, jenis sekolah, prodi impian, gaya belajar, dan email kalau kamu isi) dan yang kamu buat di LANJUT (centang Daftar Periksa, kartu, modul yang kamu unggah, dan hasil latihan) supaya kemajuanmu tidak hilang.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 7. Kebijakan — ringkasan 2 ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 489
- **Tampil di:** Layar Daftar, blok kebijakan privasi (dari lib/kebijakan-privasi.json).
- **Dilihat oleh:** Semua pendaftar baru.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ringkasan 2:** Kata sandimu disimpan dalam bentuk acak, bukan teks aslinya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 8. Kebijakan — ringkasan 3 ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 490
- **Tampil di:** Layar Daftar, blok kebijakan privasi (dari lib/kebijakan-privasi.json).
- **Dilihat oleh:** Semua pendaftar baru.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ringkasan 3:** Fitur AI di Ngobrol Bareng LANJUT mengirim pesanmu, riwayat obrolan, dan profil belajarmu (kelas, jenis sekolah, prodi impian, gaya belajar) ke penyedia AI pihak ketiga yang dapat memproses data di luar Indonesia. Untuk pertanyaan pelajaran, potongan modulmu yang berkaitan bisa ikut dikirim. Nama, nama pengguna, dan email dari akunmu tidak ikut dikirim, dan isi obrolan tidak disimpan di server LANJUT. Fitur AI baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 9. Kebijakan — ringkasan 4 ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 491
- **Tampil di:** Layar Daftar, blok kebijakan privasi (dari lib/kebijakan-privasi.json).
- **Dilihat oleh:** Semua pendaftar baru.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ringkasan 4:** Kamu dan orang tua atau walimu berhak melihat, membetulkan, dan meminta penghapusan datamu, serta mencabut persetujuan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 10. Kebijakan — tautan lengkap

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 492
- **Tampil di:** Layar Daftar, membuka kebijakan lengkap sebagai modal.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Tautan ke kebijakan lengkap:** Baca kebijakan privasi lengkap

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 11. Kebijakan — kotak centang

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 493
- **Tampil di:** Layar Daftar; tombol Daftar baru aktif setelah dicentang.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Kotak centang:** Saya sudah membaca kebijakan privasi LANJUT.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 12. Kebijakan — petunjuk belum dicentang

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 494
- **Tampil di:** Layar Daftar, di bawah tombol Daftar selama kotak belum dicentang.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Petunjuk selama belum dicentang (tombol Daftar nonaktif):** Centang kotak kebijakan privasi di atas dulu supaya bisa mendaftar.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 13. Kebijakan — galat versi usang

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 495
- **Tampil di:** Layar Daftar, bila versi kebijakan di app bukan versi yang berlaku di server.
- **Dilihat oleh:** Pendaftar yang memakai versi app lama.

**Bunyi teks (persis dari berkas):**

> **Galat versi kebijakan usang (dari server):** Kebijakan privasi sudah diperbarui. Muat ulang aplikasi, lalu baca dan centang versi terbaru.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 14. Kebijakan lengkap — bingkai

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 496
- **Tampil di:** Modal di layar Daftar, dan halaman /kebijakan-privasi (dari Jalur Saya). Isi kebijakan sendiri direview di docs/kebijakan-privasi-DRAF.md.
- **Dilihat oleh:** Semua pendaftar dan semua akun.

**Bunyi teks (persis dari berkas):**

> **Kebijakan lengkap (modal di Daftar & halaman /kebijakan-privasi):** judul Kebijakan Privasi · pengantar halaman: Data apa yang disimpan LANJUT, untuk apa, dan apa hakmu. · penanda: DRAF — belum berlaku. Wajib direview ahli hukum sebelum dipakai. · Versi [n] · tombol Tutup (modal) / Kembali (halaman)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 15. Gerbang isi kelas — judul

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 463
- **Tampil di:** Gerbang isi kelas, menggantikan seluruh app sampai kelas disimpan.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Judul:** Kamu kelas berapa sekarang?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 16. Gerbang isi kelas — pengantar

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 464
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Isi sekali ini saja supaya LANJUT menampilkan yang sesuai buat kamu. Nanti bisa diubah di Jalur Saya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 17. Gerbang isi kelas — medan

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 465
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Medan:** Kelas · petunjuk: SMP kelas 7–9, SMA/SMK kelas 10–12. · galat: Pilih kelasmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 18. Gerbang isi kelas — usulan dari perangkat

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 466
- **Tampil di:** Gerbang isi kelas, bila di perangkat ini tersimpan kelas yang pernah dipilih di Daftar Periksa dan siswa belum memilih ulang.
- **Dilihat oleh:** Akun tanpa kelas yang punya pilihan kelas tersimpan di perangkat.

**Bunyi teks (persis dari berkas):**

> **Bila kelas pernah dipilih di Daftar Periksa (perangkat ini):** Terpilih dari pilihanmu sebelumnya di Daftar Periksa. Cek lagi sebelum menyimpan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 19. Gerbang isi kelas — tombol

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 467
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Tombol:** Simpan dan lanjut (proses: Menyimpan…) · Buka Jalur Saya · Keluar

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 20. Gerbang jenis sekolah — judul

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 473
- **Tampil di:** Gerbang langkah 2, sesudah kelas tersimpan (tidak pernah satu layar dengan langkah kelas).
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Judul:** Kamu sekolah di mana?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 21. Gerbang jenis sekolah — pengantar

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 474
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Kelas [kelas]: pilih jenis sekolahmu supaya isi LANJUT pas buat kamu. Nanti bisa diubah di Jalur Saya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 22. Gerbang jenis sekolah — medan

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 475
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Medan:** Jenis sekolah · pilihan: SMA · SMK · MA (Madrasah Aliyah) · galat: Pilih jenis sekolahmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 23. Gerbang jenis sekolah — tombol

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 476
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Tombol:** sama dengan langkah 1.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Jalur Saya (halaman akun)

### 24. Baris Sekolah & medan di form Ubah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 437
- **Tampil di:** Jalur Saya: baris "Sekolah" di kartu akun (berisi "Belum diisi" bila kosong); medan Jenis sekolah di form Ubah.
- **Dilihat oleh:** Baris: semua akun (kelas 7–9 tampil SMP). Medan di form Ubah: kelas 10–12.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya:** baris "Sekolah" di kartu; medan yang sama di form Ubah, hanya untuk kelas 10–12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 25. Kartu Kemajuan bukan kelas 12

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 452
- **Tampil di:** Jalur Saya, kartu Kemajuan (kelas 12 melihat ringkasan kemajuan).
- **Dilihat oleh:** Kelas 7–11 dan akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya, kartu Kemajuan:** Kemajuan persiapan SNBP, SNBT, dan TKA tampil di sini saat kamu kelas 12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 26. Baris persetujuan orang tua/wali

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 497
- **Tampil di:** Jalur Saya, kartu Akun (hanya baca).
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya — baris:** Persetujuan orang tua/wali · nilai: Sudah / Belum (Belum bisa dimuat bila gagal)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 27. Penjelas persetujuan ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 498
- **Tampil di:** Jalur Saya, kartu Akun, di bawah baris persetujuan.
- **Dilihat oleh:** Semua akun.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya — penjelas:** Orang tua atau walimu memberi persetujuan lewat surat dari sekolah. Persetujuan ini dibutuhkan untuk fitur AI nanti; fitur lain tetap bisa kamu pakai seperti biasa.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 28. Tautan kebijakan privasi

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 499
- **Tampil di:** Jalur Saya, kartu Akun.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya — tautan:** Baca kebijakan privasi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 29. Baris kebijakan privasi & tombol

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 519
- **Tampil di:** Jalur Saya, kartu Akun, di atas baris persetujuan orang tua/wali; tombol hanya selama belum diterima.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya — baris:** Kebijakan privasi · nilai: Diterima (versi [n]) / Perlu diterima ulang / Belum diterima (Belum bisa dimuat bila gagal) · tombol: Baca dan terima

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Terima kebijakan privasi (jendela setelah login & halaman /terima-kebijakan)

### 30. Judul

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 510
- **Tampil di:** Jendela setelah login dan halaman /terima-kebijakan.
- **Dilihat oleh:** Akun yang belum menerima kebijakan versi berlaku.

**Bunyi teks (persis dari berkas):**

> **Judul (jendela & halaman):** Kebijakan privasi · judul bilah halaman /terima-kebijakan: Kebijakan Privasi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 31. Pengantar — belum pernah menerima ⚠

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 511
- **Tampil di:** Jendela setelah login (sekali per sesi, sesudah gerbang kelas & jenis sekolah) dan halaman /terima-kebijakan.
- **Dilihat oleh:** Akun yang belum pernah menerima kebijakan (akun lama sebelum LANJUT_047).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Pengantar, belum pernah menerima:** Baca ringkasan kebijakan privasi LANJUT di bawah, lalu terima. Semua fitur tetap bisa kamu pakai; penerimaan ini dibutuhkan untuk fitur AI nanti.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 32. Pengantar — perlu menerima ulang

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 512
- **Tampil di:** Jendela setelah login dan halaman /terima-kebijakan, bila versi naik.
- **Dilihat oleh:** Akun yang pernah menerima versi lama.

**Bunyi teks (persis dari berkas):**

> **Pengantar, perlu menerima ulang:** Kebijakan privasi LANJUT diperbarui ke versi [n]. Baca ringkasannya, lalu terima versi terbaru.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 33. Versi di aplikasi berbeda

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 513
- **Tampil di:** Jendela setelah login dan halaman /terima-kebijakan, bila versi berlaku di server bukan versi teks di aplikasi (tombol Terima tidak tampil).
- **Dilihat oleh:** Akun yang memakai aplikasi versi lama saat kebijakan naik.

**Bunyi teks (persis dari berkas):**

> **Versi di aplikasi berbeda dengan yang berlaku:** Versi terbaru kebijakan privasi (versi [n]) belum ada di aplikasimu. Muat ulang atau perbarui aplikasi, lalu terima versi terbaru.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 34. Tautan buka/tutup kebijakan lengkap

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 514
- **Tampil di:** Jendela dan halaman penerimaan.
- **Dilihat oleh:** Akun yang belum menerima kebijakan.

**Bunyi teks (persis dari berkas):**

> **Tautan kebijakan lengkap:** Baca kebijakan privasi lengkap · setelah dibuka: Sembunyikan kebijakan lengkap

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 35. Tombol Terima / Nanti saja / Kembali

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 515
- **Tampil di:** Jendela dan halaman penerimaan.
- **Dilihat oleh:** Akun yang belum menerima kebijakan.

**Bunyi teks (persis dari berkas):**

> **Tombol:** Terima (proses: Menyimpan…) · Nanti saja (jendela) / Kembali (halaman)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 36. Galat simpan

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 516
- **Tampil di:** Jendela dan halaman penerimaan, bila Terima gagal tersimpan.
- **Dilihat oleh:** Akun yang menekan Terima.

**Bunyi teks (persis dari berkas):**

> **Galat simpan:** Belum tersimpan. Coba lagi sebentar lagi. (atau pesan dari server)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 37. Sudah diterima

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 517
- **Tampil di:** Halaman /terima-kebijakan setelah diterima.
- **Dilihat oleh:** Akun yang sudah menerima.

**Bunyi teks (persis dari berkas):**

> **Sudah diterima (halaman):** Kebijakan privasi versi [n] sudah kamu terima.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 38. Belum bisa dimuat

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 518
- **Tampil di:** Halaman /terima-kebijakan bila versi berlaku belum ada di server.
- **Dilihat oleh:** Jarang; konfigurasi server belum lengkap.

**Bunyi teks (persis dari berkas):**

> **Belum bisa dimuat:** Kebijakan privasi belum bisa dimuat. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Ngobrol Bareng LANJUT

### 39. Ajakan menerima kebijakan

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 520
- **Tampil di:** Ngobrol Bareng LANJUT, layar terkunci, di bawah penjelasan; hanya selama kebijakan belum diterima.
- **Dilihat oleh:** Akun yang belum menerima kebijakan versi berlaku.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — ajakan:** Terima kebijakan privasi dulu supaya fitur AI bisa diaktifkan nanti. · tautan: Baca dan terima

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 40. Catatan AI di atas obrolan ⚠

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 530
- **Tampil di:** Ngobrol Bareng LANJUT, paling atas daftar pesan.
- **Dilihat oleh:** Akun dengan persetujuan orang tua/wali dan kebijakan diterima.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — catatan AI:** Dijawab AI, jadi bisa keliru. Cek lagi info penting ke sumber resmi. LANJUT tidak menyimpan obrolan ini; obrolan hilang saat aplikasi ditutup.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 41. Layar terkunci — judul

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 531
- **Tampil di:** Ngobrol Bareng LANJUT, bila fitur AI belum aktif.
- **Dilihat oleh:** Akun tanpa persetujuan orang tua/wali atau tanpa kebijakan diterima.

**Bunyi teks (persis dari berkas):**

> **Ngobrol terkunci — judul:** Fitur AI belum aktif untuk akunmu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 42. Layar terkunci — penjelasan ⚠

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 532
- **Tampil di:** Ngobrol Bareng LANJUT, bila fitur AI belum aktif.
- **Dilihat oleh:** Akun tanpa persetujuan orang tua/wali atau tanpa kebijakan diterima.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ngobrol terkunci — isi:** Ngobrol Bareng LANJUT dijawab AI dari penyedia pihak ketiga. Fitur ini baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah, dan kamu sudah menerima kebijakan privasi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 43. Status AI belum bisa dimuat

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 533
- **Tampil di:** Ngobrol Bareng LANJUT, bila status persetujuan gagal dimuat.
- **Dilihat oleh:** Semua akun, saat tidak tersambung.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — status belum bisa dimuat:** Status fitur AI belum bisa dimuat. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 44. Pesan gagal kirim

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 534
- **Tampil di:** Ngobrol Bareng LANJUT, gelembung abu-abu di bawah pesan siswa, dengan tombol Coba lagi.
- **Dilihat oleh:** Akun dengan fitur AI aktif, saat pesan gagal dijawab.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — galat kirim:** Fitur AI belum aktif untuk akunmu. / Fitur AI sedang belum bisa dipakai. Coba lagi nanti. / Maaf, aku belum bisa menjawab sekarang. Coba kirim lagi sebentar lagi. / Pesanmu sudah banyak. Istirahat sebentar, lalu coba lagi. / Pesanmu belum terkirim karena tidak tersambung. Coba lagi. / Ada yang tidak beres. Coba kirim lagi. · tombol: Coba lagi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 45. Kartu Ngobrol di Beranda

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 535
- **Tampil di:** Beranda, kartu pintu Ngobrol Bareng LANJUT.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Beranda — kartu Ngobrol:** Cerita soal minat, cara belajar, atau rencana kuliahmu. (dulu diakhiri "Versi uji coba.")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 46. Balasan tetap saat tanda bahaya akut ⚠

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 546
- **Tampil di:** Ngobrol, sebagai balasan bot, diikuti kartu bantuan. Dibuat server; AI tidak dipanggil.
- **Dilihat oleh:** Siswa yang pesannya cocok daftar tanda bahaya akut (server/config/tanda-bahaya.json, DRAF review guru BK).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Balasan tanda bahaya akut (server):** Terima kasih sudah mau cerita. Yang kamu rasakan itu penting, dan kamu tidak harus menghadapinya sendirian. Tolong hubungi salah satu layanan di bawah, atau bicara sekarang dengan orang dewasa yang kamu percaya: orang tua atau wali, guru BK, atau keluarga. Kalau mau, kita tetap bisa lanjut ngobrol di sini.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 47. Kartu bantuan — judul

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 547
- **Tampil di:** Ngobrol, kartu bantuan (di balasan tanda bahaya dan di panel "Butuh bicara dengan orang?").
- **Dilihat oleh:** Akun yang membuka Ngobrol.

**Bunyi teks (persis dari berkas):**

> **Kartu bantuan — judul (server):** Kamu tidak sendirian

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 48. Kartu bantuan — penutup

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 548
- **Tampil di:** Ngobrol, di bawah daftar layanan pada kartu bantuan.
- **Dilihat oleh:** Akun yang membuka Ngobrol.

**Bunyi teks (persis dari berkas):**

> **Kartu bantuan — penutup (server):** Bicara juga dengan orang dewasa yang kamu percaya: orang tua atau wali, guru BK, atau keluarga.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 49. Kalimat tetap: di luar topik

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 549
- **Tampil di:** Ngobrol, diucapkan AI persis saat siswa meminta hal di luar topik.
- **Dilihat oleh:** Akun dengan fitur AI aktif.

**Bunyi teks (persis dari berkas):**

> **Tolak di luar topik (server, diucapkan AI persis):** Aku cuma bisa bantu soal belajar, minat, dan rencana sekolah lanjutan, kuliah, atau karier. Mau lanjut bahas itu?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 50. Kalimat tetap: menolak mengabaikan aturan

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 550
- **Tampil di:** Ngobrol, diucapkan AI persis saat diminta mengabaikan/menampilkan aturannya.
- **Dilihat oleh:** Akun dengan fitur AI aktif.

**Bunyi teks (persis dari berkas):**

> **Tolak abaikan aturan (server, diucapkan AI persis):** Aku tetap pakai aturanku sebagai teman ngobrol LANJUT, jadi permintaan itu tidak bisa aku ikuti. Ada yang mau kamu tanyakan soal rencana sekolah atau kuliahmu?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 51. Balasan uji coba saat AI dimatikan

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 551
- **Tampil di:** Ngobrol, sebagai balasan bot berlabel uji coba, saat ai_aktif = 0.
- **Dilihat oleh:** Semua akun dengan fitur AI aktif, selama saklar mati.

**Bunyi teks (persis dari berkas):**

> **Balasan saat AI dimatikan (server):** Fitur AI sedang dimatikan sementara, jadi aku belum bisa menjawab pesanmu. Sambil menunggu, kamu bisa buka menu Jenjang, Checklist, atau Arsip Belajar.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 52. Label balasan uji coba

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 552
- **Tampil di:** Ngobrol, di atas gelembung balasan saat AI dimatikan.
- **Dilihat oleh:** Semua akun dengan fitur AI aktif, selama saklar mati.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — label balasan uji coba:** Uji coba, bukan jawaban AI

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 53. Peringatan data pribadi

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 553
- **Tampil di:** Ngobrol, paling atas daftar pesan.
- **Dilihat oleh:** Akun dengan fitur AI aktif.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — peringatan data pribadi:** Jangan tulis nama lengkap, nomor HP, alamat, atau data pribadi lain di sini.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 54. Tautan "Butuh bicara dengan orang?"

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 554
- **Tampil di:** Ngobrol, selalu tampil di atas obrolan dan di layar terkunci.
- **Dilihat oleh:** Semua akun yang membuka Ngobrol.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — tautan kartu bantuan:** Butuh bicara dengan orang? · setelah dibuka: Sembunyikan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 55. Penanda data disamarkan

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 555
- **Tampil di:** Ngobrol, di bawah pesan siswa yang data pribadinya disamarkan.
- **Dilihat oleh:** Akun dengan fitur AI aktif.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — penanda data disamarkan:** Data pribadi di pesanmu disamarkan sebelum dikirim ke AI.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 56. Catatan: materi & modul dikirim ke penyedia AI ⚠

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 566
- **Tampil di:** Ngobrol, catatan di atas obrolan.
- **Dilihat oleh:** Akun dengan fitur AI aktif.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — catatan materi:** Kalau kamu bertanya soal materi pelajaran, pertanyaanmu dan potongan modul yang berkaitan dari Arsip Belajarmu ikut dikirim ke penyedia AI.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 57. Bagian "Dari modulmu"

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 567
- **Tampil di:** Ngobrol, di bawah balasan yang memakai modul.
- **Dilihat oleh:** Akun dengan fitur AI aktif yang punya modul.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — judul sumber modul:** Dari modulmu · isi: [label] · [judul modul]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 58. Bagian "Dari web"

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 568
- **Tampil di:** Ngobrol, di bawah balasan yang memakai hasil web (saat pencarian web aktif).
- **Dilihat oleh:** Akun dengan fitur AI aktif.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — judul sumber web:** Dari web · isi: [label] · [judul halaman] (tautan ke alamat dari penyedia)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 59. Kuota pencarian web habis

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 569
- **Tampil di:** Ngobrol, di bawah balasan saat kuota web harian akun habis.
- **Dilihat oleh:** Akun dengan fitur AI aktif, saat pencarian web aktif.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — kuota web habis:** Kuota pencarian web hari ini sudah habis, jadi jawaban ini tanpa pencarian web.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 60. Kartu bantuan gagal dimuat ⚠

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 556
- **Tampil di:** Ngobrol, panel "Butuh bicara dengan orang?" saat server tidak bisa dihubungi.
- **Dilihat oleh:** Akun yang membuka panel saat tidak tersambung.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — kartu bantuan belum bisa dimuat:** Kartu bantuan belum bisa dimuat. Kalau kamu dalam bahaya, hubungi 112 atau orang dewasa yang kamu percaya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Jenjang Saya (tab "Jenjang")

### 61. Judul halaman

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 180
- **Tampil di:** Jenjang Saya.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Judul:** Jenjang Saya

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 62. Pendamping kelas 7–9

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 181
- **Tampil di:** Jenjang Saya, di bawah judul.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **Pendamping kelas 7–9:** Kelas [kelas] SMP: waktunya kenalan sama minat dan bakatmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 63. Pendamping kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 182
- **Tampil di:** Jenjang Saya, di bawah judul.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **Pendamping kelas 10–11:** Kelas [kelas]: mulai kenalan sama jurusan yang kamu incar.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 64. Pendamping kelas 12

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 183
- **Tampil di:** Jenjang Saya, di bawah judul.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Pendamping kelas 12:** Kelas 12: yang perlu kamu siapkan sebelum daftar kuliah.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 65. Pendamping tanpa kelas

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 184
- **Tampil di:** Jenjang Saya, di bawah judul (jaring pengaman; akun tanpa kelas biasanya tertahan di gerbang dulu).
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Pendamping tanpa kelas:** Isi kelasmu di Jalur Saya supaya isi halaman ini pas buat kamu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 66. Judul seksi pintu

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 185
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Seksi pintu:** Mulai dari sini

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 67. Pintu Ngobrol Bareng LANJUT

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 186
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> Ngobrol Bareng LANJUT — Cerita soal yang kamu suka, nanti dibantu cari arahnya. (kelas 7–9)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 68. Pintu Gaya Belajar

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 187
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> Gaya Belajar — Kenali cara belajar yang paling nyambung buat kamu. (kelas 7–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 69. Pintu Eksplorasi Tujuan

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 188
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> Eksplorasi Tujuan — Intip prodi kuliah: belajar apa dan lulusannya kerja di mana. (kelas 7–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 70. Pintu Pilih Mapel

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 189
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> Pilih Mapel — Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu. (kelas 10–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 71. Pintu Cek Posisi Gue

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 190
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> Cek Posisi Gue — Lihat kamu lagi di tahap mana dan langkah berikutnya. (kelas 12)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 72. Pintu Daftar Periksa

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 191
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> Daftar Periksa — Satu per satu, tidak perlu sekaligus. (kelas 12)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 73. Kartu "SMA, SMK, atau MA?" ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 192
- **Tampil di:** Jenjang Saya, kartu informasi.
- **Dilihat oleh:** Kelas 7–9.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kartu kelas 7–9 — SMA, SMK, atau MA?:** Habis SMP, kamu bisa lanjut ke SMA, SMK, atau MA. SMA dan MA lebih banyak belajar teori sebagai bekal kuliah. SMK langsung belajar keahlian lewat praktik dan PKL, dan lulusannya tetap bisa kuliah. Pilih yang paling cocok sama minatmu, bukan cuma ikut teman.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 74. Kartu "Belum perlu mikirin jadwal daftar" ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 193
- **Tampil di:** Jenjang Saya, kartu informasi.
- **Dilihat oleh:** Kelas 10–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kartu kelas 10–11 — Belum perlu mikirin jadwal daftar:** Jadwal pendaftaran kuliah belum perlu dipikirkan sekarang. Fokus dulu cari jurusan yang cocok, lalu jaga nilai mapel yang mendukungnya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 75. Judul seksi SMK

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 194
- **Tampil di:** Jenjang Saya, seksi SMK.
- **Dilihat oleh:** Kelas 10–12 dengan jenis sekolah SMK.

**Bunyi teks (persis dari berkas):**

> **Seksi SMK (kelas 10–12 dengan jenis sekolah SMK, LANJUT_038):** Kalau kamu anak SMK

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 76. Pembuka seksi SMK kelas 10–11 ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 195
- **Tampil di:** Jenjang Saya, seksi SMK, di atas butir Khusus SMK.
- **Dilihat oleh:** Kelas 10–11 SMK.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Pembuka kelas 10–11:** Beberapa hal memang beda buat anak SMK. Yang ini sudah bisa kamu siapkan dari sekarang.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Bagian khusus kelas 12 (Beranda, Daftar Periksa, Cek Posisi) — pengganti untuk kelas lain

### 77. Pengganti kelas 7–11 — judul ⚠

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 446
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue, menggantikan isinya.
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — judul:** Bagian ini untuk kelas 12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 78. Pengganti kelas 7–11 — isi ⚠

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 447
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue.
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — isi:** Isinya jadwal dan persiapan SNBP, SNBT, dan TKA. Versi untuk kelas [kelas] sedang kami siapkan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 79. Pengganti kelas 7–11 — tombol

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 448
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — tombol:** Buka Jenjang Saya (sebelum LANJUT_037: Buka Khusus SMK)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 80. Pengganti tanpa kelas — judul

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 449
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue (jaring pengaman; biasanya tertahan di gerbang isi kelas dulu).
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — judul:** Isi kelasmu dulu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 81. Pengganti tanpa kelas — isi

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 450
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — isi:** Isi bagian ini menyesuaikan kelasmu. Isi kelas di Jalur Saya, ya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 82. Pengganti tanpa kelas — tombol

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 451
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — tombol:** Isi kelas di Jalur Saya · Buka Jenjang Saya

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Daftar Periksa

### 83. Butir dari Pilih Mapel ⚠

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 226
- **Tampil di:** Dibuat saat menekan "Simpan ke Daftar Periksa" di hasil Pilih Mapel (dengan prodi); tampil di Daftar Periksa, kategori Pendaftaran, langsung tercentang.
- **Dilihat oleh:** Daftar Periksa hanya tampil untuk kelas 12; butirnya bisa dibuat dari kelas mana pun lewat Pilih Mapel.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Dari Pilih Mapel (kategori Pendaftaran, langsung tercentang):** Pilih [mapel] & [mapel] sebagai mapel TKA — untuk [nama prodi]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 84. Butir dari Eksplorasi Tujuan

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 227
- **Tampil di:** Dibuat saat menekan "Simpan ke Daftar Periksa" di profil Eksplorasi Tujuan; tampil di Daftar Periksa, kategori Riset Kampus, belum tercentang.
- **Dilihat oleh:** Daftar Periksa hanya tampil untuk kelas 12.

**Bunyi teks (persis dari berkas):**

> **Dari Eksplorasi Tujuan (kategori Riset Kampus, belum tercentang):** Cari tahu lebih lanjut soal [nama prodi]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 85. Tombol Hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 228
- **Tampil di:** Daftar Periksa, pada butir milik akun.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Tombol di butir milik akun:** Hapus

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 86. Galat centang/hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 229
- **Tampil di:** Daftar Periksa, saat centang atau hapus gagal tersimpan.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Galat centang/hapus:** Perubahan terakhir belum tersimpan. Coba lagi. (sebelumnya "Centang terakhir belum tersimpan. Coba lagi.", diganti karena kini juga berlaku untuk hapus)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Eksplorasi Tujuan (F10)

### 87. Belum ada profil — judul

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 378
- **Tampil di:** Eksplorasi Tujuan, selama belum ada satu pun profil terverifikasi (keadaan semua siswa saat ini).
- **Dilihat oleh:** Semua akun yang membuka Eksplorasi Tujuan (pintu kelas 7–11 di Jenjang Saya, atau dari hasil Pilih Mapel).

**Bunyi teks (persis dari berkas):**

> **Belum ada profil terverifikasi — judul:** Profil prodi sedang kami cek.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 88. Belum ada profil — isi ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 379
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Sama dengan butir di atasnya.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Belum ada profil terverifikasi — isi:** Peminat, mata kuliah, dan kampus tiap prodi baru tampil di sini setelah dicek ke sumber resmi. Sementara itu, mapel yang dibutuhkan sudah bisa kamu lihat di Pilih Mapel.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 89. Tombol kembali & prodi lain

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 380
- **Tampil di:** Eksplorasi Tujuan: di keadaan kosong, dan di bawah profil.
- **Dilihat oleh:** Semua akun yang membuka Eksplorasi Tujuan.

**Bunyi teks (persis dari berkas):**

> **Tombol:** Kembali ke Pilih Mapel · di bawah profil: Lihat prodi lain

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 90. Lencana "Relevan untuk RPL/TKJ/Teknik" ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 381
- **Tampil di:** Profil Eksplorasi Tujuan, di bawah nama prodi, hanya untuk profil yang ditandai relevan.
- **Dilihat oleh:** Semua akun yang membuka profil itu.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Lencana SMK:** Relevan untuk RPL/TKJ/Teknik (dari SDD-F10 §F.2)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 91. Baris sumber angka pendaftar ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 382
- **Tampil di:** Profil Eksplorasi Tujuan, kartu angka pendaftar.
- **Dilihat oleh:** Semua akun yang membuka profil.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Baris sumber peminat:** Sumber: SNPMB [jalur] [tahun], [kampus] — nama kampus disebut karena angka pendaftar adalah angka satu kampus, bukan nasional.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 92. Penjelas label "Perkiraan" ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_044 · baris 394
- **Tampil di:** Profil Eksplorasi Tujuan, tepat di bawah lencana "Perkiraan" pada setiap bagian yang berlabel itu (saat ini mata kuliah dan profesi).
- **Dilihat oleh:** Semua akun yang membuka profil dengan bagian "Perkiraan".
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Penjelas Perkiraan:** Perkiraan artinya bagian ini disusun dari sumber umum, belum dari sumber resmi, jadi cek lagi ke kampus tujuanmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 93. Kaki halaman — semua bagian terverifikasi ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 407
- **Tampil di:** Profil Eksplorasi Tujuan, kaki halaman, bila keempat bagian "Terverifikasi".
- **Dilihat oleh:** Semua akun yang membuka profil seperti itu (saat ini 4 dari 18 profil).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Keempat bagian "Terverifikasi":** Isi profil ini dicek ke sumber resmi pada [tanggal].

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 94. Kaki halaman — ada bagian Perkiraan ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 408
- **Tampil di:** Profil Eksplorasi Tujuan, kaki halaman, bila ada bagian "Perkiraan".
- **Dilihat oleh:** Semua akun yang membuka profil seperti itu (saat ini 14 dari 18 profil).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ada bagian "Perkiraan":** Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal]. Bagian bertanda Perkiraan belum dicek ke sumber resmi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 95. Kaki halaman — ada bagian tanpa status ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 409
- **Tampil di:** Profil Eksplorasi Tujuan, kaki halaman, bila ada bagian tanpa status di data (tidak terjadi di data saat ini).
- **Dilihat oleh:** Saat ini tidak ada.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ada bagian tanpa status di data** (tidak terjadi di data sekarang; aman-gagal): Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal].

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Arsip Belajar

### 96. Pintu di Beranda

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 245
- **Tampil di:** Beranda (Linimasa), kartu pintu.
- **Dilihat oleh:** Semua kelas.

**Bunyi teks (persis dari berkas):**

> **Pintu di Beranda:** Arsip Belajar — Catatan dan soal buatanmu, disimpan per mapel.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 97. Daftar kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 246
- **Tampil di:** Arsip Belajar, daftar kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Daftar:** tombol Tambah kartu · saringan Semua (n) / [mapel] (n) · lencana [mapel] dan Soal/Catatan (Soal = ada jawaban)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 98. Judul halaman

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 247
- **Tampil di:** Arsip Belajar, bilah judul tiap halaman.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Judul halaman (page bar):** Arsip Belajar · Kartu · Tulis Kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 99. Formulir kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 248
- **Tampil di:** Arsip Belajar, tulis/ubah kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Formulir:** Tambah kartu baru / Ubah kartu · Mapel · Judul (mis. Turunan fungsi aljabar) · Isi (Tulis di sini...) · Jawaban (boleh dikosongkan; Jawaban atau pembahasan singkat...; Isi bila kartunya berbentuk soal.) · Kartu ini akan bertanda Diunggah pengguna — belum diverifikasi tim. · Simpan kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 100. Galat formulir

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 249
- **Tampil di:** Arsip Belajar, saat menyimpan kartu yang belum lengkap.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Galat formulir:** Pilih mapelnya. · Judul belum diisi. · Isi belum diisi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 101. Lihat kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 250
- **Tampil di:** Arsip Belajar, halaman satu kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Lihat kartu:** Lihat jawaban · Jawaban · Ubah kartu · Hapus kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 102. Konfirmasi hapus

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 251
- **Tampil di:** Arsip Belajar, sebelum kartu dihapus.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Konfirmasi hapus:** Hapus kartu ini? Kartu yang dihapus tidak bisa dikembalikan dari app. · Batal · Ya, hapus

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 103. Kartu tidak ditemukan

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 252
- **Tampil di:** Arsip Belajar, membuka kartu yang sudah tidak ada.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Kartu tidak ditemukan:** Kartu ini tidak ditemukan. · Mungkin sudah dihapus. · Kembali ke Arsip

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Arsip Belajar — Modul (materi unggahan)

### 104. Bagian Modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 261
- **Tampil di:** Arsip Belajar, di bawah daftar kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Bagian Modul di Arsip:** Modul · Simpan materi pelajaranmu (.txt, .md, atau PDF berisi teks) supaya mudah dibaca dan dicari lagi. · tombol Unggah modul · kosong: Belum ada modul. Unggah materi pelajaran yang ingin kamu simpan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 105. Daftar modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 262
- **Tampil di:** Arsip Belajar, bagian Modul.
- **Dilihat oleh:** Akun yang punya modul.

**Bunyi teks (persis dari berkas):**

> **Daftar modul:** [judul] · lencana [mapel] dan TXT / MD / PDF / Teks tempel · Diunggah [tanggal]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 106. Cari di modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 263
- **Tampil di:** Arsip Belajar, bagian Modul (hanya modul sendiri).
- **Dilihat oleh:** Akun yang punya modul.

**Bunyi teks (persis dari berkas):**

> **Cari di modul:** Cari di modulmu (minimal 3 huruf) · Cari · Hasil di modulmu · kosong: Tidak ada bagian yang cocok. Coba kata lain. · terlalu pendek: Ketik minimal 3 huruf.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 107. Hapus semua modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 264
- **Tampil di:** Arsip Belajar, bagian Modul; konfirmasi dua langkah.
- **Dilihat oleh:** Akun yang punya modul.

**Bunyi teks (persis dari berkas):**

> **Hapus semua modul:** Hapus semua modul · Hapus semua modulmu? Teks dan semua potongannya dihapus permanen dan tidak bisa dikembalikan. · Batal · Ya, hapus semua

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 108. Lihat & hapus modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 265
- **Tampil di:** Halaman satu modul (/arsip-modul).
- **Dilihat oleh:** Pemilik modul.

**Bunyi teks (persis dari berkas):**

> **Lihat modul:** Diunggah [tanggal] · [nama berkas] · [n] karakter · Hapus modul · Hapus modul ini? Teksnya dihapus permanen dari LANJUT dan tidak bisa dikembalikan. · Batal · Ya, hapus · galat: Belum terhapus. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 109. Modul tidak ditemukan

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 266
- **Tampil di:** Halaman satu modul, bila modul sudah dihapus atau milik akun lain.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Modul tidak ditemukan:** Modul ini tidak ditemukan. · Mungkin sudah dihapus. · Kembali ke Arsip

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 110. Peringatan sebelum unggah ⚠

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 267
- **Tampil di:** Formulir unggah modul, paling atas.
- **Dilihat oleh:** Semua akun yang mengunggah modul.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Peringatan sebelum unggah:** Sebelum mengunggah · Unggah hanya materi pelajaran. · Jangan unggah dokumen berisi data pribadi: nama lengkap, nomor (NIK, NISN, HP), rapor, atau foto identitas. · Unggah hanya materi yang boleh kamu pakai untuk belajar pribadi. · Yang disimpan hanya teksnya, bukan berkas aslinya. Modul bisa kamu hapus permanen kapan saja.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 111. Formulir unggah

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 268
- **Tampil di:** Formulir unggah modul (/arsip-modul-unggah).
- **Dilihat oleh:** Semua akun yang mengunggah modul.

**Bunyi teks (persis dari berkas):**

> **Formulir unggah:** judul Unggah modul · pilihan Pilih berkas / Tempel teks · Berkas (petunjuk: .txt, .md, atau PDF yang berisi teks.) · Pilih berkas / Ganti berkas · Teks materi (Tempel teks materi di sini...) · Judul (mis. Fotosintesis bab 2) · Mapel · tombol Unggah modul (proses: Mengunggah…) · pemilih berkas belum ada di versi app: Memilih berkas belum tersedia di versi aplikasi ini. Tempel teksnya saja.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 112. Galat formulir

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 269
- **Tampil di:** Formulir unggah, sebelum dikirim.
- **Dilihat oleh:** Semua akun yang mengunggah modul.

**Bunyi teks (persis dari berkas):**

> **Galat formulir:** Pilih mapelnya. · Judul belum diisi. · Pilih berkasnya dulu. · Teks belum diisi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 113. Galat unggah (tipe, ukuran, karakter, jumlah, PDF)

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 270
- **Tampil di:** Formulir unggah, bila server menolak.
- **Dilihat oleh:** Semua akun yang mengunggah modul.

**Bunyi teks (persis dari berkas):**

> **Galat unggah dari server (per kode):** tipe: Berkas ini tidak bisa dipakai. Unggah berkas .txt, .md, atau PDF yang berisi teks. · ukuran: Berkasnya terlalu besar. Ukuran maksimal [n] MB. · karakter: Teksnya terlalu panjang untuk satu modul (maksimal [n] karakter). Bagi menjadi beberapa modul. · jumlah: Kamu sudah punya [n] modul, batas maksimalnya. Hapus salah satu dulu untuk mengunggah yang baru. · PDF pindai: PDF ini tidak berisi teks yang bisa dibaca, mungkin hasil pindai atau foto. Unggah PDF yang teksnya bisa diblok, atau tempel teksnya langsung. · PDF terkunci: PDF ini dikunci dengan kata sandi atau perlindungan. Buka kuncinya dulu, atau tempel teksnya langsung. · PDF rusak: PDF ini tidak bisa dibaca. Coba simpan ulang sebagai PDF, atau tempel teksnya langsung.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Latihan

### 114. Pintu di Arsip Belajar

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 299
- **Tampil di:** Arsip Belajar, tombol menuju Latihan.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Pintu di Arsip Belajar:** Mulai latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 115. Sebelum mulai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 297
- **Tampil di:** Latihan, sebelum sesi dimulai.
- **Dilihat oleh:** Semua akun yang punya kartu.

**Bunyi teks (persis dari berkas):**

> **Sebelum mulai:** [n] kartu, kira-kira [m] menit. (12 kartu → 8 menit) · Mapel: Semua ([n]) / [mapel] ([n]) · tombol Mulai · Ambil 5 kartu · Riwayat latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 116. Arsip kosong

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 298
- **Tampil di:** Latihan, bila belum ada kartu sama sekali.
- **Dilihat oleh:** Akun tanpa kartu.

**Bunyi teks (persis dari berkas):**

> **Arsip kosong:** Belum ada kartu untuk dilatih. · Latihan memakai kartu buatanmu di Arsip Belajar. Tambah satu dulu. · Tambah kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 117. Selama sesi

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 300
- **Tampil di:** Latihan, kartu satu per satu.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Selama sesi:** Kartu [i] dari [n] · [mapel] · Soal/Catatan · Lihat jawaban / Lihat isi · Coba ingat isi catatan ini dulu. · Jawaban / Isi catatan · Jawabanmu tadi? Salah · Benar / Kamu ingat? Belum ingat · Sudah ingat · Pilih dulu hasilnya, baru lanjut. · Berikutnya / Lihat hasil · Selesai sekarang

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 118. Sesudah selesai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 301
- **Tampil di:** Latihan, ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun yang berlatih.
- **Catatan:** Potongan "Beres. [b] benar dari [i]." sudah disetujui (kepala blok); yang diputuskan adalah bagian lain di butir ini.

**Bunyi teks (persis dari berkas):**

> **Sesudah selesai:** Latihan Selesai · [i] dari [n] kartu · Beres. [b] benar dari [i]. · (berhenti lebih awal) Berhenti sebelum selesai — tidak apa-apa. [b] benar dari [i]. · (tidak ada jawaban) Belum ada kartu yang dijawab.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 119. Penyimpanan hasil

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 302
- **Tampil di:** Latihan, ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Penyimpanan:** Menyimpan hasil… · Tersimpan di Riwayat Latihan. · Hasil latihan belum tersimpan. · Coba lagi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 120. Tombol akhir

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 303
- **Tampil di:** Latihan, ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Tombol akhir:** Ulangi · Lihat riwayat latihan · Kembali ke Arsip

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 121. Galat mulai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 304
- **Tampil di:** Latihan, bila sesi gagal dimulai.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Galat mulai:** Latihan belum bisa dimulai. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 122. Riwayat Latihan

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 305
- **Tampil di:** Riwayat Latihan.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Riwayat Latihan:** [mapel] / Semua mapel · [tanggal, jam] · [i] dari [n] kartu · [b] benar · lencana Tidak selesai · kosong: Belum ada sesi latihan. Sesi yang sudah kamu kerjakan muncul di sini. · Mulai latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 123. Pertanyaan keyakinan

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 579
- **Tampil di:** Latihan, tiap kartu sebelum jawaban dibuka.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Latihan — pertanyaan keyakinan:** Seberapa yakin kamu? · pilihan: Yakin · Ragu · Tebak · petunjuk: Pilih sebelum membuka jawaban. Boleh dilewati.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 124. Keyakinan setelah jawaban dibuka

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 580
- **Tampil di:** Latihan, di atas jawaban.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Latihan — setelah jawaban dibuka:** Keyakinanmu: [pilihan]. · bila dilewati: Keyakinan dilewati.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 125. Tombol ke Level-In

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 581
- **Tampil di:** Latihan, sebelum mulai dan ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Latihan — tombol ke Level-In:** Lihat Level-In (di layar sebelum mulai dan di ringkasan akhir sesi)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Level-In

### 126. Pintu di Beranda

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 582
- **Tampil di:** Beranda, di bawah Arsip Belajar.
- **Dilihat oleh:** Semua akun (kelas 7–12).

**Bunyi teks (persis dari berkas):**

> **Beranda — pintu Level-In:** Level-In · Seberapa kuat kamu di tiap mapel, dari latihanmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 127. Judul & pengantar

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 583
- **Tampil di:** Level-In (/level-in).
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Level-In — judul & pengantar:** Level-In · Seberapa kuat kamu di tiap mapel, dihitung dari latihanmu sendiri.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 128. Belum pernah latihan

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 584
- **Tampil di:** Level-In, akun tanpa jawaban latihan.
- **Dilihat oleh:** Akun yang belum pernah berlatih.

**Bunyi teks (persis dari berkas):**

> **Level-In — belum pernah latihan:** Belum ada latihan. · Level-In muncul setelah kamu menjawab kartu di Latihan. Mulai dari 5 kartu saja. · tombol: Mulai latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 129. Galat

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 585
- **Tampil di:** Level-In, bila server tidak bisa dihubungi.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Level-In — galat:** Level-In belum bisa dimuat. Periksa sambungan internetmu, lalu coba lagi. · tombol: Coba lagi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 130. Per mapel

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 586
- **Tampil di:** Level-In, satu kartu per mapel yang sudah dilatih.
- **Dilihat oleh:** Akun yang sudah berlatih.

**Bunyi teks (persis dari berkas):**

> **Level-In — per mapel:** judul seksi: Per mapel · [n] kartu dijawab

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 131. Level dan artinya ⚠

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 587
- **Tampil di:** Level-In, kartu mapel dengan level.
- **Dilihat oleh:** Akun dengan jawaban cukup di satu mapel.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Level-In — level dan artinya:** Perlu penguatan dasar: Jawaban benarmu masih di bawah [batas bawah]. Ulangi dasar-dasarnya dulu, pelan-pelan saja. · Cukup, lanjut latihan: Jawaban benarmu [batas bawah]–[batas atas]. Terus latihan supaya makin mantap. · Sudah kuat: Jawaban benarmu di atas [batas atas]. Pertahankan, sesekali ulangi. · tanpa angka: Jawaban benarmu masih sedikit. … / Jawaban benarmu sudah lumayan. … / Hampir semua jawabanmu benar. …

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 132. Belum cukup data

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 588
- **Tampil di:** Level-In, kartu mapel tanpa level.
- **Dilihat oleh:** Akun dengan jawaban sedikit di satu mapel.

**Bunyi teks (persis dari berkas):**

> **Level-In — belum cukup data:** Belum cukup data · Jawab [n] kartu lagi di mapel ini supaya levelnya muncul. · tanpa angka: Jawab beberapa kartu lagi di mapel ini supaya levelnya muncul.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 133. Keyakinan ⚠

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 589
- **Tampil di:** Level-In, seksi Keyakinanmu.
- **Dilihat oleh:** Akun yang sudah berlatih.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Level-In — keyakinan:** judul seksi: Keyakinanmu · belum ada data: Saat latihan, pilih "Seberapa yakin kamu?" sebelum membuka jawaban. Dari situ Level-In bisa melihat apakah keyakinanmu sudah pas dengan hasilmu. · kurang: Isi keyakinan di [n] kartu lagi dalam satu mapel supaya polanya kelihatan. · terlalu yakin: Kamu cenderung terlalu yakin di [mapel]: sering yakin, tapi jawabannya salah. · pas: Keyakinanmu sudah pas dengan hasilmu di [mapel].

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 134. Saran hari ini

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 590
- **Tampil di:** Level-In, kartu saran.
- **Dilihat oleh:** Akun yang sudah berlatih.

**Bunyi teks (persis dari berkas):**

> **Level-In — saran hari ini:** judul seksi: Saran hari ini · saran: Latih [mapel] hari ini. Dari [n] kartu terakhir yang kamu isi keyakinannya, [p]% kamu yakin tapi jawabannya salah. (tombol: Latihan [mapel]) · selaras: Keyakinanmu sudah pas dengan hasilmu. Lanjutkan latihan rutin di mapel mana saja. (tombol: Mulai latihan) · belum cukup data: Lanjut latihan [mapel] dan isi keyakinanmu, supaya saran berikutnya lebih tepat. (tombol: Latihan [mapel]) · pengguna baru: Mulai dari [mapel]. Isi juga seberapa yakin kamu di tiap kartu. (tombol: Latihan [mapel]) · arsip kosong: Belum ada kartu untuk dilatih. Tulis kartu dulu di Arsip Belajar. (tombol: Tulis kartu)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Lampiran: baris di blok DRAF yang tidak dijadikan butir

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 196 — Memakai pembuka lama §4.2 yang bukan DRAF; kepala blok menyebutnya dikecualikan.

> **Pembuka kelas 12:** pembuka lama di atas.

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 197 — Aturan butir Khusus SMK mana yang tampil per kelas, bukan teks yang tampil. Isi butirnya sendiri diperiksa di lembar verifikasi konten (bagian Khusus SMK).

> **Butir SMK per kelas:** kelas 12 melihat keenam butir. Kelas 10–11 hanya
> butir tanpa SNBP/PDSS/UTBK/kuota/periode pendaftaran: `portofolio` dan
> `mapel-tka-tidak-ada` (daftar izin di `lib/khususSmk.ts`). Empat butir lain
> disembunyikan, tidak ditulis ulang, supaya tidak ada klaim baru tanpa sumber.
> Kelas 7–9 tidak melihat bagian SMK.

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 202 — Catatan perilaku (siapa yang melihat seksi SMK), bukan teks yang tampil.

> **Sejak LANJUT_038:** akun punya `jenis_sekolah`, jadi seksi SMK hanya tampil
> untuk siswa SMK. Siswa SMA/MA kelas 10–12 tidak melihatnya.

- §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 383 — Catatan bahwa tombol memakai teks PWA §4.9 yang bukan DRAF; tidak ada teks baru.

> Tombol **Simpan ke Daftar Periksa** ada di Expo sejak LANJUT_034, memakai teks PWA di atas (butir milik akun; lihat §4.4).

## Lampiran: blok DRAF di berkas sumber

| Bagian | Task | Baris | Butir di blok |
|---|---|---|---|
| §4.2 Khusus SMK → Jenjang Saya | LANJUT_037 | 175 | 19 |
| §4.4 Daftar Periksa | LANJUT_034 | 223 | 4 |
| §4.5 Arsip Belajar | LANJUT_039 | 240 | 8 |
| §4.5 Arsip Belajar | LANJUT_049 | 254 | 10 |
| §4.7 Sesi Latihan Harian | LANJUT_041 | 290 | 9 |
| §4.9 Eksplorasi Tujuan | LANJUT_031 | 373 | 6 |
| §4.9 Eksplorasi Tujuan | LANJUT_044 | 385 | 1 |
| §4.9 Eksplorasi Tujuan | LANJUT_045 | 396 | 3 |
| §4.10 Daftar (buat akun) | LANJUT_035 | 426 | 2 |
| §4.10 Daftar (buat akun) | LANJUT_038 | 431 | 3 |
| §4.11 Bukan kelas 12 (placeholder sementara) | LANJUT_035 | 441 | 7 |
| §4.12 Gerbang wajib isi kelas | LANJUT_036 | 459 | 5 |
| §4.12 Gerbang wajib isi kelas | LANJUT_038 | 469 | 4 |
| §4.13 Kebijakan privasi & persetujuan orang tua/wali | LANJUT_047 | 480 | 13 |
| §4.14 Terima kebijakan privasi (akun lama & terima ulang) | LANJUT_048 | 503 | 11 |
| §4.15 Ngobrol Bareng LANJUT dengan AI | LANJUT_051 | 524 | 6 |
| §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi | LANJUT_053 | 539 | 11 |
| §4.17 Ngobrol: materi dari modul Arsip dan web | LANJUT_055 | 560 | 4 |
| §4.18 Level-In dan keyakinan di Latihan | LANJUT_058 | 573 | 12 |
| **Jumlah** | | | **138** (134 butir keputusan + 4 di lampiran) |
