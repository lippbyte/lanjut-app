# Lembar Review Draf Teks LANJUT

Disusun otomatis dengan `npm run lembar-review-teks` (folder `LANJUT_App/server`) dari `docs/salinan-teks-lanjut.md` (sidik `d2902c10b78a`). Lembar ini **hanya bacaan**: mengisinya tidak mengubah teks apa pun di app. Bunyi teks disalin persis dari berkas sumber.

**241 butir** dari 38 blok DRAF menunggu keputusan. 4 baris lain di blok DRAF tidak dijadikan butir karena sudah disetujui atau bukan teks yang tampil (lihat Lampiran).

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
| 26 | Banner Beranda — label sumber (§4.1, LANJUT_073) | Isi banner (judul, isi, sumber, url_sumber, tanggal) berasal dari server/config/banner-beranda.json — dikurasi tim, bukan berita dari internet. Saat LANJUT_073 berkas itu masih kosong. | Isi banner WAJIB dicek manusia ke sumber resmi (url_sumber) sebelum status_verifikasi diubah menjadi terverifikasi; diperiksa_pada diisi tanggal pengecekan itu, bukan tanggal sumber. |
| 28 | Galat muat (pengganti "Yang sudah pernah dibuka masih bisa dilihat") (§6, LANJUT_080b) | Tidak menjanjikan apa pun yang tersimpan; hanya meminta memeriksa sambungan dan mencoba lagi. | providers/QueryProvider.tsx (cache hanya di memori, tanpa persistensi); peta 059 A15. |
| 37 | Penjelas persetujuan (§4.13, LANJUT_047) | Persetujuan diberikan lewat surat dari sekolah, dibutuhkan untuk fitur AI, dan fitur lain tidak diblokir. | Keputusan Khalifa & ahli hukum soal persetujuan untuk fitur dasar (pertanyaan terbuka LANJUT_047). |
| 40 | Usulan: bidang minat (minat_rumpun) di kebijakan privasi (§4.13, LANJUT_075b) | Bidang minat disimpan untuk menampilkan Eksplorasi Kampus; tidak ikut dikirim ke penyedia AI di Ngobrol; bisa diubah atau dikosongkan kapan saja. | Kode server: pengguna.layanan.js (simpan & kosongkan lewat PATCH /pengguna/saya) dan ngobrol.layanan.js pesanSistem (profil yang dikirim ke AI tanpa minat_rumpun), dijaga tests/eksplorasi-kampus.test.js. Tinjauan ahli hukum (UU PDP) sebelum masuk kebijakan. |
| 41 | Usulan: ringkasan latihan, ujian, dan satu modul yang dikirim ke penyedia AI (menunggu tinjauan hukum) (§4.13, LANJUT_078) | Ringkasan saran latihan (mapel, jenis saran) atau satu ujian terdekat (jenis, tanggal, mapel), dan satu ringkasan modul ≤600 karakter yang disamarkan, dikirim ke OpenRouter; catatan materi ujian, jawaban per kartu, modul lain tidak dikirim; jawaban AI tidak disimpan. | Kode server: konteks.js, ngobrol.layanan.js (kumpulkanKonteks, ambilPotongan), dijaga tests/ngobrol-penghubung.test.js. Tinjauan ahli hukum (UU PDP) sebelum masuk kebijakan. |
| 42 | Usulan: pengganti butir "data lain di akunmu" (menunggu tinjauan hukum) (§4.13, LANJUT_078) | Isi kartu, jawaban latihan per kartu, centang Daftar Periksa, dan catatan materi ujian tidak dikirim; hanya ringkasan singkat yang bisa ikut. | Kode server: konteks.js ringkasanKonteks (hanya kolom yang tercantum), dijaga tests/ngobrol-penghubung.test.js. Tinjauan ahli hukum (UU PDP). |
| 43 | Usulan: mapel pilihan (mapel_pilihan) di kebijakan privasi (menunggu tinjauan hukum) (§4.13, LANJUT_079) | Paling banyak lima mapel pilihan disimpan untuk urutan tampil di Arsip dan Latihan; tidak dikirim ke penyedia AI; bisa diubah atau dikosongkan. | Kode server: pengguna.skema.js (maks. 5), pengguna.layanan.js, ngobrol.layanan.js pesanSistem (tanpa mapel_pilihan), dijaga tests/mapel-pilihan.test.js. Tinjauan ahli hukum (UU PDP). |
| 45 | Pengantar — belum pernah menerima (§4.14, LANJUT_048) | Semua fitur tetap bisa dipakai tanpa menerima; penerimaan dibutuhkan untuk fitur AI. | Keputusan Khalifa & ahli hukum soal persetujuan untuk fitur dasar (pertanyaan terbuka LANJUT_047). |
| 54 | Catatan AI di atas obrolan (§4.15, LANJUT_051) | LANJUT tidak menyimpan obrolan; obrolan hilang saat aplikasi ditutup. | Kode server (tidak ada tabel obrolan, isi tidak dicatat di log; tests/ngobrol.test.js). Penyimpanan di sisi OpenRouter/penyedia model mengikuti kebijakan mereka. |
| 56 | Layar terkunci — penjelasan (§4.15, LANJUT_051) | AI dari penyedia pihak ketiga; aktif setelah persetujuan orang tua/wali lewat sekolah dan kebijakan diterima. | Gerbang bolehPakaiAi (server/README.md bagian 2b) dan keputusan Khalifa soal penyedia AI. |
| 60 | Balasan tetap saat tanda bahaya akut (§4.16, LANJUT_053) | Ajakan menghubungi layanan bantuan dan orang dewasa tepercaya; isi kartu dari kartu-bantuan.json (hanya yang terverifikasi). | Review guru BK; verifikasi nomor layanan (Healing119 dicek Khalifa, 112 nomor darurat nasional, SAPA 129 belum dicek). |
| 70 | Catatan: materi & modul dikirim ke penyedia AI (§4.17, LANJUT_055) | Pertanyaan materi dan potongan modul yang berkaitan dikirim ke penyedia AI. | Kode server (ngobrol.layanan.js, LANJUT_055) dan docs/alur-data-ai-materi.md; perlu masuk kebijakan privasi v2. |
| 74 | Kartu bantuan gagal dimuat (§4.16, LANJUT_053) | 112 sebagai nomor darurat. | Nomor darurat nasional (terverifikasi di kartu-bantuan.json). |
| 78 | Catatan: ringkasan latihan/ujian dikirim ke penyedia AI (§4.15, LANJUT_078) | Untuk pertanyaan latihan/ujian, ringkasan (nama mapel, jenis ujian, tanggal) dikirim ke penyedia AI; catatan materi ujian tidak dikirim. | Kode server: konteks.js ringkasanKonteks dan ngobrol.layanan.js kumpulkanKonteks, dijaga tests/ngobrol-penghubung.test.js. Belum ada di kebijakan privasi (usulan kalimat §4.13 LANJUT_078, menunggu tinjauan hukum). |
| 94 | Pembuka seksi SMK kelas 10–11 (§4.2, LANJUT_037) | Bahwa butir yang tampil untuk kelas 10–11 (portofolio dan mapel pilihan TKA yang tidak ada di SMK) sudah bisa disiapkan dari sekarang. Isi kedua butir itu sendiri belum terverifikasi (lembar verifikasi konten, bagian Khusus SMK). | SNPMB dan Direktorat SMK, sesuai sumber kedua butir Khusus SMK itu. |
| 98 | Kartu "SMA, SMK, atau MA?" (LANJUT_069) (§4.2, LANJUT_069) | Deskripsi SMA (pendidikan umum, banyak pilihan mapel), SMK (pendidikan umum dan keterampilan bidang kerja), dan MA (pendidikan umum dengan muatan keagamaan lebih kuat). | Kemendikdasmen (SMA, SMK) dan Kemenag (MA). Di layar sudah ada catatan "Keterangan ini sedang kami cek ulang." |
| 99 | Pintu Ngobrol Bareng LANJUT kelas 7–9 (§4.2, LANJUT_069) | Fitur Ngobrol butuh persetujuan orang tua/wali. | Gerbang bolehPakaiAi di server (403 AI_BELUM_DIIZINKAN, tests/ngobrol.test.js) dan surat persetujuan orang tua/wali DRAF. |
| 107 | Pengganti kelas 7–11 — judul (§4.11, LANJUT_035) | Bersama isi di bawahnya: jadwal dan persiapan SNBP, SNBT, dan TKA hanya untuk kelas 12. | Kemendikdasmen (TKA: jenjang yang diikutkan), SNPMB (SNBP/SNBT). Perlu dipastikan apakah ada TKA untuk jenjang lain yang relevan bagi siswa kelas 7–9. |
| 108 | Pengganti kelas 7–11 — isi (§4.11, LANJUT_035) | Isi bagian ini adalah jadwal dan persiapan SNBP, SNBT, dan TKA (lihat butir judul di atasnya). | Sama dengan butir judul di atasnya. |
| 113 | Butir dari Pilih Mapel (§4.4, LANJUT_034) | Dua mapel yang disebut sebagai mapel TKA untuk prodi itu, diambil dari pemetaan prodi → mapel bobot 3 yang masih berasal dari mockup (lembar verifikasi konten, bagian Prodi). | SNPMB (mapel pendukung program studi), Kemendikdasmen (mapel pilihan TKA). |
| 142 | Belum ada profil — isi (§4.9, LANJUT_031) | Janji bahwa isi profil baru tampil setelah dicek ke sumber resmi. Benar menurut kode (server hanya mengirim profil terverifikasi), tetapi bergantung pada standar pemeriksaan tim konten. | Standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046). |
| 144 | Lencana "Relevan untuk RPL/TKJ/Teknik" (§4.9, LANJUT_031) | Prodi ini relevan untuk jurusan SMK RPL, TKJ, atau Teknik (kolom badge_relevan_smk di profil-prodi.json). Dasar penilaiannya perlu dipastikan. | Kurikulum prodi (dokumen resmi kampus) dibandingkan dengan program keahlian SMK (Kemendikdasmen). |
| 145 | Baris sumber angka pendaftar (§4.9, LANJUT_031) | Angka pendaftar berasal dari SNPMB untuk jalur, tahun, dan kampus yang disebut. | SNPMB (daya tampung & peminat); angka per profil dicek di lembar verifikasi konten. |
| 146 | Penjelas label "Perkiraan" (§4.9, LANJUT_044) | Bagian berlabel "Perkiraan" disusun dari sumber umum, belum dari sumber resmi. | Definisi di kepala profil-prodi.json ("Perkiraan" = sumber sekunder atau gambaran umum). |
| 147 | Kaki halaman — semua bagian terverifikasi (§4.9, LANJUT_045) | Janji ke siswa bahwa isi profil "dicek ke sumber resmi" pada tanggal itu. | Hanya benar bila pemeriksa mengikuti standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046). |
| 148 | Kaki halaman — ada bagian Perkiraan (§4.9, LANJUT_045) | Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi"; bagian Perkiraan belum. | Sama dengan butir di atasnya. |
| 149 | Kaki halaman — ada bagian tanpa status (§4.9, LANJUT_045) | Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi". | Sama dengan butir di atasnya. |
| 153 | Catatan: pengelompokan belum dicek ke sumber resmi (diubah LANJUT_079b) (§4.19, LANJUT_079) | Pengelompokan rumpun → mapel bersifat sementara dan belum dicek ke sumber resmi. | konten.repo.js ambilMapelPerRumpun (prodi_mapel bobot ≥ 2 dari data benih MVP-PWA/data/prodi*.json, 0 dari 19 prodi terverifikasi). Verifikasi oleh tim konten. |
| 166 | Butir "Ikut simulasi atau gladi TKA kalau sekolahmu mengadakannya" (§4.20, (tidak disebut)) | Ada sekolah yang mengadakan simulasi atau gladi TKA sebelum hari pelaksanaan (bunyinya bersyarat, tanpa tanggal). | Laman resmi TKA Kemendikdasmen dan pengumuman sekolah. Belum dicek. |
| 185 | Penjelasan jalur SNBP (§4.9, LANJUT_075) | Dinilai dari nilai rapor dan prestasi, tanpa tes tertulis; sekolah menentukan siapa yang bisa ikut. | Laman resmi SNPMB (SNBP, SNBT) dan laman seleksi mandiri PTN. Bagian ini berlabel "Perkiraan" sampai dicek. |
| 186 | Penjelasan jalur SNBT (§4.9, LANJUT_075) | Dinilai dari hasil tes tertulis berbasis komputer. | Laman resmi SNPMB (SNBP, SNBT) dan laman seleksi mandiri PTN. Bagian ini berlabel "Perkiraan" sampai dicek. |
| 187 | Penjelasan jalur seleksi mandiri (§4.9, LANJUT_075) | Diadakan sendiri oleh tiap perguruan tinggi negeri; caranya berbeda di tiap kampus. | Laman resmi SNPMB (SNBP, SNBT) dan laman seleksi mandiri PTN. Bagian ini berlabel "Perkiraan" sampai dicek. |
| 190 | Penjelasan bidang Ekonomi & Bisnis (§4.9, LANJUT_075) | Gambaran umum yang dipelajari dan contoh pekerjaan (tanpa nama prodi, angka, atau gaji). | Tinjauan Khalifa/guru BK; bila perlu dicocokkan dengan deskripsi rumpun ilmu resmi. Berlabel "Perkiraan". |
| 191 | Penjelasan bidang Kesehatan (§4.9, LANJUT_075) | Gambaran umum yang dipelajari dan contoh pekerjaan (tanpa nama prodi, angka, atau gaji). | Tinjauan Khalifa/guru BK; bila perlu dicocokkan dengan deskripsi rumpun ilmu resmi. Berlabel "Perkiraan". |
| 192 | Penjelasan bidang Sosial & Humaniora (§4.9, LANJUT_075) | Gambaran umum yang dipelajari dan contoh pekerjaan (tanpa nama prodi, angka, atau gaji). | Tinjauan Khalifa/guru BK; bila perlu dicocokkan dengan deskripsi rumpun ilmu resmi. Berlabel "Perkiraan". |
| 193 | Penjelasan bidang Teknologi & Rekayasa (§4.9, LANJUT_075) | Gambaran umum yang dipelajari dan contoh pekerjaan (tanpa nama prodi, angka, atau gaji). | Tinjauan Khalifa/guru BK; bila perlu dicocokkan dengan deskripsi rumpun ilmu resmi. Berlabel "Perkiraan". |
| 216 | Peringatan sebelum unggah (§4.5, LANJUT_049) | Yang disimpan hanya teks, bukan berkas asli; modul bisa dihapus permanen. Juga larangan mengunggah data pribadi dan materi yang tidak boleh dipakai (hak cipta). | Perilaku server (LANJUT_049: berkas tidak ditulis ke disk, hapus permanen + perapian indeks); aspek hak cipta perlu ditinjau ahli hukum. |
| 238 | Level dan artinya (§4.18, LANJUT_058) | Arti level menyebut batas persen jawaban benar. | Konfigurasi Level-In (level_batas_bawah, level_batas_atas; tabel fallback LANJUT_042) dan levelAkurasiPerMapel di server. |
| 240 | Keyakinan (§4.18, LANJUT_058) | Terlalu yakin = sering memilih "Yakin" tapi jawabannya salah. | Pola kalibrasi server (agregatPerMapel, salinan PWA; ambang_overconfident, minimum_kartu). |

## Ringkasan per layar

| Layar / fitur | Butir | Nomor |
|---|---|---|
| Daftar akun & gerbang awal | 23 | 1–23 |
| Beranda | 4 | 24–27 |
| Pesan umum di semua layar | 1 | 28–28 |
| Navigasi & nama halaman | 4 | 29–32 |
| Data Akun (halaman akun; sebelum LANJUT_074 bernama Jalur Saya) | 7 | 33–39 |
| Kebijakan privasi — usulan kalimat (belum tampil) | 4 | 40–43 |
| Terima kebijakan privasi (jendela setelah login & halaman /terima-kebijakan) | 9 | 44–52 |
| Ngobrol Bareng LANJUT | 29 | 53–81 |
| Jenjang Saya (tab "Jenjang") | 25 | 82–106 |
| Bagian khusus kelas 12 (Jalur Saya /cek-posisi, Daftar Periksa) — pengganti untuk kelas lain | 6 | 107–112 |
| Daftar Periksa | 4 | 113–116 |
| Daftar Periksa — Persiapan Event (SMP kelas 7–9, saklar bawaan mati) | 24 | 117–140 |
| Eksplorasi Tujuan (F10) | 9 | 141–149 |
| Pilih Mapel per rumpun (kelas 12) & Mapel Saya (kelas 7–11) | 11 | 150–160 |
| Persiapan Ujian (Daftar Periksa) & Kesiapan Ujian (Jalur Saya) | 18 | 161–178 |
| Eksplorasi Kampus (SMP & kelas 10–11) | 23 | 179–201 |
| Arsip Belajar | 8 | 202–209 |
| Arsip Belajar — Modul (materi unggahan) | 10 | 210–219 |
| Latihan | 12 | 220–231 |
| Level-In | 10 | 232–241 |

## Daftar akun & gerbang awal

### 1. Medan Kelas

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_035 · baris 596
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

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_035 · baris 597
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

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 603
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

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 604
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 674
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 675
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 676
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 677
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 678
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 679
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 680
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 681
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 682
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

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 683
- **Tampil di:** Modal di layar Daftar, dan halaman /kebijakan-privasi (dari Data Akun). Isi kebijakan sendiri direview di docs/kebijakan-privasi-DRAF.md.
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

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 650
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

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 651
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Isi sekali ini saja supaya LANJUT menampilkan yang sesuai buat kamu. Nanti bisa diubah di Data Akun.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 17. Gerbang isi kelas — medan

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 652
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

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 653
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

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 654
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Tombol:** Simpan dan lanjut (proses: Menyimpan…) · Buka Data Akun · Keluar

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 20. Gerbang jenis sekolah — judul

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 660
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

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 661
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Kelas [kelas]: pilih jenis sekolahmu supaya isi LANJUT pas buat kamu. Nanti bisa diubah di Data Akun.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 22. Gerbang jenis sekolah — medan

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 662
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

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 663
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

## Beranda

### 24. Sapaan Beranda

- **Asal:** §4.1 Linimasa · LANJUT_072 · baris 173
- **Tampil di:** Beranda, baris paling atas (sejak LANJUT_074 di atas kartu hero tenggat untuk kelas 12, atau di atas baris progres untuk kelas lain).
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Sapaan:** Halo, [nama tampilan] (bila nama tampilan kosong: Halo, [nama pengguna]; bila keduanya kosong: Halo, tanpa koma)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 25. Info Penting kosong

- **Asal:** §4.1 Linimasa · LANJUT_072b · baris 184
- **Tampil di:** Beranda, seksi Info Penting, di bawah judul seksi — hanya bila semua tahapan terverifikasi sudah lewat (WIB).
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Info Penting kosong (semua tahapan terverifikasi sudah lewat):** Belum ada info penting untuk saat ini.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 26. Banner Beranda — label sumber ⚠

- **Asal:** §4.1 Linimasa · LANJUT_073 · baris 197
- **Tampil di:** Beranda, tiap kartu carousel banner (paling banyak tiga, sejak LANJUT_074), di bawah Info Penting (kelas 12) atau di bawah grid (kelas lain); hanya banner terverifikasi yang berlaku hari ini (WIB).
- **Dilihat oleh:** Semua akun.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Banner — label sumber:** Sumber: [sumber] (tautan ke `url_sumber`, satu-satunya bagian banner yang bisa ditekan; sama di tiap kartu carousel)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 27. Kartu Persiapan Terdekat

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 337
- **Tampil di:** Beranda, tepat sesudah baris progres dan sebelum grid ikon; satu event terdekat dalam 7 hari sebelum s.d. hari H (WIB). Tekan → Daftar Periksa.
- **Dilihat oleh:** Kelas 7–9 (sejak LANJUT_076b; sebelumnya 7–11), hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Beranda — kartu Persiapan Terdekat:** label: Persiapan Terdekat · isi: [jenis] · [mapel] (mapel hanya bila diisi) · hitung mundur: [n] hari lagi / Hari ini — sejak LANJUT_076b hanya kelas 7–9

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Pesan umum di semua layar

### 28. Galat muat (pengganti "Yang sudah pernah dibuka masih bisa dilihat") ⚠

- **Asal:** §6 Layar Kosong Umum · LANJUT_080b · baris 947
- **Tampil di:** Semua layar yang memuat data dari server, saat permintaan gagal (tidak tersambung atau server bermasalah).
- **Dilihat oleh:** Semua akun.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Belum bisa dimuat (semua layar):** Belum bisa dimuat. Periksa sambungan internetmu, lalu coba lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Navigasi & nama halaman

### 29. Tab tengah Ngobrol

- **Asal:** §4.1 Linimasa · LANJUT_074 · baris 213
- **Tampil di:** Tab bar bawah, tab ketiga dari lima (lingkaran biru berisi ikon kelinci LANJUT sejak 15 Okt 2026, menggantikan huruf "L"); membuka Ngobrol Bareng LANJUT.
- **Dilihat oleh:** Semua akun (akun tanpa persetujuan orang tua/wali atau tanpa kebijakan diterima melihat layar terkunci).

**Bunyi teks (persis dari berkas):**

> **Tab tengah — label:** Ngobrol (tab ketiga dari lima, di antara Jenjang Saya dan Pilih Mapel; lingkaran lebih besar berisi ikon kelinci LANJUT putih — sejak 15 Okt 2026 menggantikan huruf "L", pilihan percakapan, belum disetujui PM; ikon yang sama versi biru menjadi avatar balasan AI di Ngobrol; membuka Ngobrol Bareng LANJUT)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 30. Nama "Jalur Saya" untuk /cek-posisi

- **Asal:** §4.1 Linimasa · LANJUT_074 · baris 214
- **Tampil di:** Judul bilah halaman /cek-posisi dan kartu pintu di Data Akun; label grid Beranda, tombol "Mulai dari Sini", dan pintu Jenjang Saya.
- **Dilihat oleh:** Bilah halaman & kartu pintu di Data Akun: semua akun kecuali kartu pintu untuk kelas 7–9 (disembunyikan sejak LANJUT_077b; kelas 10–11 melihat pengganti kelas 12). Grid, "Mulai dari Sini", pintu Jenjang Saya: kelas 12.

**Bunyi teks (persis dari berkas):**

> **Nama fitur `/cek-posisi`:** Jalur Saya (judul bilah halaman dan kartu pintu di Data Akun, serta — khusus kelas 12 — label grid Beranda, tombol kartu "Mulai dari Sini", dan pintu Jenjang Saya; menggantikan nama lama). Sejak LANJUT_077b kartu pintu Data Akun tidak tampil untuk kelas 7–9.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 31. Nama "Data Akun" untuk halaman akun

- **Asal:** §4.1 Linimasa · LANJUT_074 · baris 215
- **Tampil di:** Judul bilah halaman /akun dan judul bagian di kartu akun (sebelumnya "Jalur Saya").
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Nama halaman akun `/akun`:** Data Akun (judul bilah halaman dan judul bagian di kartu akun; isi bagiannya tidak berubah)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 32. Judul form ubah

- **Asal:** §4.1 Linimasa · LANJUT_074 · baris 216
- **Tampil di:** Data Akun, sesudah menekan "Ubah" atau "Lengkapi jalurmu".
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Data Akun — judul form ubah:** Ubah Data Akun

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Data Akun (halaman akun; sebelum LANJUT_074 bernama Jalur Saya)

### 33. Baris Sekolah & medan di form Ubah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 605
- **Tampil di:** Data Akun: baris "Sekolah" di kartu akun (berisi "Belum diisi" bila kosong); medan Jenis sekolah di form Ubah.
- **Dilihat oleh:** Baris: semua akun (kelas 7–9 tampil SMP). Medan di form Ubah: kelas 10–12.

**Bunyi teks (persis dari berkas):**

> **Data Akun:** baris "Sekolah" di kartu; medan yang sama di form Ubah, hanya untuk kelas 10–12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 34. Kartu Kemajuan bukan kelas 12

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 630
- **Tampil di:** Data Akun, kartu Kemajuan (kelas 12 melihat ringkasan kemajuan).
- **Dilihat oleh:** Kelas 10–11 dan akun tanpa kelas (kelas 7–9 sejak LANJUT_077 memakai kalimat di bawah).

**Bunyi teks (persis dari berkas):**

> **Data Akun, kartu Kemajuan:** Kemajuan persiapan SNBP, SNBT, dan TKA tampil di sini saat kamu kelas 12. (sejak LANJUT_077 hanya kelas 10–11 dan akun tanpa kelas; SMP lihat di bawah)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 35. Kartu Kemajuan SMP (tanpa kalimat kelas 12)

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_077 · baris 642
- **Tampil di:** Data Akun, kartu Kemajuan, di atas tombol "Buka Daftar Periksa".
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **Data Akun, kartu Kemajuan — SMP (kelas 7–9):** Langkah yang kamu catat ada di Daftar Periksa.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 36. Baris persetujuan orang tua/wali

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 684
- **Tampil di:** Data Akun, kartu Akun (hanya baca).
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Data Akun — baris:** Persetujuan orang tua/wali · nilai: Sudah / Belum (Belum bisa dimuat bila gagal)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 37. Penjelas persetujuan ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 685
- **Tampil di:** Data Akun, kartu Akun, di bawah baris persetujuan.
- **Dilihat oleh:** Semua akun.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Data Akun — penjelas:** Orang tua atau walimu memberi persetujuan lewat surat dari sekolah. Persetujuan ini dibutuhkan untuk fitur AI nanti; fitur lain tetap bisa kamu pakai seperti biasa.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 38. Tautan kebijakan privasi

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_047 · baris 686
- **Tampil di:** Data Akun, kartu Akun.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Data Akun — tautan:** Baca kebijakan privasi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 39. Baris kebijakan privasi & tombol

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 736
- **Tampil di:** Data Akun, kartu Akun, di atas baris persetujuan orang tua/wali; tombol hanya selama belum diterima.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Data Akun — baris:** Kebijakan privasi · nilai: Diterima (versi [n]) / Perlu diterima ulang / Belum diterima (Belum bisa dimuat bila gagal) · tombol: Baca dan terima

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Kebijakan privasi — usulan kalimat (belum tampil)

### 40. Usulan: bidang minat (minat_rumpun) di kebijakan privasi ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_075b · baris 695
- **Tampil di:** Belum tampil di layar mana pun. Usulan untuk kebijakan privasi versi berikutnya (ringkasan "data yang disimpan" dan kebijakan lengkap).
- **Dilihat oleh:** Semua akun, setelah versi kebijakan baru disetujui dan dirilis.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Usulan — bidang minat yang disimpan:** Kami menyimpan bidang minat yang kamu pilih, misalnya Kesehatan atau Teknologi & Rekayasa, untuk menampilkan Eksplorasi Kampus yang sesuai jenjangmu. Bidang minat tidak ikut dikirim ke penyedia AI di Ngobrol Bareng LANJUT, dan bisa kamu ubah atau kosongkan kapan saja.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 41. Usulan: ringkasan latihan, ujian, dan satu modul yang dikirim ke penyedia AI (menunggu tinjauan hukum) ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_078 · baris 707
- **Tampil di:** Belum tampil di layar mana pun. Usulan untuk kebijakan privasi versi berikutnya (Ringkasan 3 dan bagian "Fitur AI: apa yang dikirim").
- **Dilihat oleh:** Semua akun, setelah versi kebijakan baru disetujui dan dirilis.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Usulan — ringkasan fitur yang dikirim ke penyedia AI:** Kalau pertanyaanmu di Ngobrol Bareng LANJUT menyangkut latihan atau ujian, server LANJUT ikut mengirim ringkasan singkat dari akunmu ke OpenRouter dan penyedia model AI: nama mapel dan jenis saran latihanmu (dihitung dari hasil latihanmu), atau jenis, tanggal, dan mapel satu ujian terdekat yang kamu catat di Persiapan Event. Untuk pertanyaan pelajaran, yang ikut dikirim adalah judul dan ringkasan satu modul milikmu yang paling berkaitan, paling panjang 600 karakter, setelah disamarkan. Catatan materi ujianmu, jawaban latihan per kartu, dan modul lainmu tidak ikut dikirim. Jawaban AI tidak disimpan di server LANJUT.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 42. Usulan: pengganti butir "data lain di akunmu" (menunggu tinjauan hukum) ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_078 · baris 708
- **Tampil di:** Belum tampil di layar mana pun. Menggantikan butir ketiga bagian "Fitur AI: apa yang tidak dikirim" di kebijakan lengkap versi berikutnya.
- **Dilihat oleh:** Semua akun, setelah versi kebijakan baru disetujui dan dirilis.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Usulan — pengganti butir "data lain di akunmu" (bagian Fitur AI: apa yang tidak dikirim):** Data lain di akunmu, seperti isi kartu, jawaban latihan per kartu, centang Daftar Periksa, dan catatan materi ujian. Ringkasan singkat di atas adalah satu-satunya bagian dari data latihan dan Persiapan Event yang bisa ikut dikirim.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 43. Usulan: mapel pilihan (mapel_pilihan) di kebijakan privasi (menunggu tinjauan hukum) ⚠

- **Asal:** §4.13 Kebijakan privasi & persetujuan orang tua/wali · LANJUT_079 · baris 716
- **Tampil di:** Belum tampil di layar mana pun. Usulan untuk kebijakan privasi versi berikutnya (data yang disimpan).
- **Dilihat oleh:** Semua akun, setelah versi kebijakan baru disetujui dan dirilis.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Usulan — mapel pilihan yang disimpan:** Kami menyimpan paling banyak lima mapel yang kamu pilih di Pilih Mapel atau Mapel Saya, untuk menampilkan mapel itu lebih dulu di Arsip Belajar dan Latihan. Mapel pilihan tidak ikut dikirim ke penyedia AI di Ngobrol Bareng LANJUT, dan bisa kamu ubah atau kosongkan kapan saja.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Terima kebijakan privasi (jendela setelah login & halaman /terima-kebijakan)

### 44. Judul

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 727
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

### 45. Pengantar — belum pernah menerima ⚠

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 728
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

### 46. Pengantar — perlu menerima ulang

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 729
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

### 47. Versi di aplikasi berbeda

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 730
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

### 48. Tautan buka/tutup kebijakan lengkap

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 731
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

### 49. Tombol Terima / Nanti saja / Kembali

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 732
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

### 50. Galat simpan

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 733
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

### 51. Sudah diterima

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 734
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

### 52. Belum bisa dimuat

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 735
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

### 53. Ajakan menerima kebijakan

- **Asal:** §4.14 Terima kebijakan privasi (akun lama & terima ulang) · LANJUT_048 · baris 737
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

### 54. Catatan AI di atas obrolan ⚠

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 747
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

### 55. Layar terkunci — judul

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 748
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

### 56. Layar terkunci — penjelasan ⚠

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 749
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

### 57. Status AI belum bisa dimuat

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 750
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

### 58. Pesan gagal kirim

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 751
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

### 59. Kartu Ngobrol di Beranda

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_051 · baris 752
- **Tampil di:** Tidak tampil lagi: kartu Ngobrol dihapus dari grid Beranda (LANJUT_075b); sejak grid LANJUT_065 keterangan kartu pun tidak ditampilkan. Ngobrol dibuka dari tab tengah.
- **Dilihat oleh:** Tidak ada (teks tidak dipakai).

**Bunyi teks (persis dari berkas):**

> **Beranda — kartu Ngobrol:** Cerita soal minat, cara belajar, atau rencana kuliahmu. (dulu diakhiri "Versi uji coba.") — tidak tampil lagi: kartu Ngobrol dihapus dari grid Beranda sejak LANJUT_075b

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 60. Balasan tetap saat tanda bahaya akut ⚠

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 797
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

### 61. Kartu bantuan — judul

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 798
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

### 62. Kartu bantuan — penutup

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 799
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

### 63. Kalimat tetap: di luar topik

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 800
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

### 64. Kalimat tetap: menolak mengabaikan aturan

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 801
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

### 65. Balasan uji coba saat AI dimatikan

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 802
- **Tampil di:** Ngobrol, sebagai balasan bot berlabel uji coba, saat ai_aktif = 0.
- **Dilihat oleh:** Semua akun dengan fitur AI aktif, selama saklar mati.

**Bunyi teks (persis dari berkas):**

> **Balasan saat AI dimatikan (server):** Fitur AI sedang dimatikan sementara, jadi aku belum bisa menjawab pesanmu. Sambil menunggu, kamu bisa buka tab Jenjang Saya atau Arsip Belajar di Beranda. (optimasi chatbot 15 Okt 2026: nama menu lama "menu Jenjang, Checklist" diganti; pilihan percakapan, belum disetujui PM)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 66. Label balasan uji coba

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 803
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

### 67. Peringatan data pribadi

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 804
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

### 68. Tautan "Butuh bicara dengan orang?"

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 805
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

### 69. Penanda data disamarkan

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 806
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

### 70. Catatan: materi & modul dikirim ke penyedia AI ⚠

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 817
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

### 71. Bagian "Dari modulmu"

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 818
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

### 72. Bagian "Dari web"

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 819
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

### 73. Kuota pencarian web habis

- **Asal:** §4.17 Ngobrol: materi dari modul Arsip dan web · LANJUT_055 · baris 820
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

### 74. Kartu bantuan gagal dimuat ⚠

- **Asal:** §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi · LANJUT_053 · baris 807
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

### 75. Tombol mikrofon (label pembaca layar)

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_074 · baris 767
- **Tampil di:** Ngobrol, di samping kotak pesan; hanya di peramban yang punya pengenal suara (tidak ada di Android/iOS). Sejak LANJUT_080b TERSEMBUNYI kecuali build dengan EXPO_PUBLIC_MIKROFON_NGOBROL=1 (menunggu tinjauan hukum).
- **Dilihat oleh:** Tidak ada selama tersembunyi (bawaan uji rilis); bila dinyalakan: akun dengan fitur AI aktif, labelnya dibacakan pembaca layar.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — tombol mikrofon (label pembaca layar):** Ucapkan pesan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 76. Petunjuk saat mendengarkan

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_074 · baris 768
- **Tampil di:** Ngobrol, teks samar di kotak pesan yang masih kosong, selama mikrofon hidup. Tidak tampil selama mikrofon tersembunyi (LANJUT_080b).
- **Dilihat oleh:** Tidak ada selama tersembunyi (bawaan uji rilis); bila dinyalakan: akun dengan fitur AI aktif, di peramban yang punya pengenal suara.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — petunjuk di kotak pesan saat mendengarkan:** Mendengarkan…

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 77. Petunjuk: tanya soal modul, latihan, persiapan ujian

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_078 · baris 782
- **Tampil di:** Ngobrol, catatan di atas obrolan (sesudah catatan materi); hanya bila GET /ngobrol/status menyatakan AI aktif.
- **Dilihat oleh:** Akun dengan fitur AI aktif, selama saklar ai_aktif menyala (bawaan mati).

**Bunyi teks (persis dari berkas):**

> **Ngobrol — petunjuk saat AI aktif:** Tanya apa saja tentang materi di modulmu, latihanmu, atau persiapan ujianmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 78. Catatan: ringkasan latihan/ujian dikirim ke penyedia AI ⚠

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_078 · baris 783
- **Tampil di:** Ngobrol, catatan di atas obrolan, tepat sebelum petunjuk; hanya bila saklar ai_aktif menyala.
- **Dilihat oleh:** Akun dengan fitur AI aktif, selama saklar ai_aktif menyala.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — catatan konteks:** Kalau pertanyaanmu tentang latihan atau ujian, ringkasan singkatnya (nama mapel, jenis ujian, dan tanggalnya) ikut dikirim ke penyedia AI. Catatan materi ujianmu tidak ikut dikirim.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 79. Kartu tautan "Modul di Arsip"

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_078 · baris 784
- **Tampil di:** Ngobrol, di bawah balasan AI yang memakai modul; tombol membuka modul itu di Arsip Belajar.
- **Dilihat oleh:** Akun dengan fitur AI aktif yang punya modul, selama saklar ai_aktif menyala.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — kartu tautan modul:** label: Modul di Arsip · isi: [judul modul] · tombol: Buka modul (membuka modul itu di Arsip Belajar)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 80. Kartu tautan "Latihan"

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_078 · baris 785
- **Tampil di:** Ngobrol, di bawah balasan AI untuk pertanyaan tentang latihan; tombol membuka Latihan dengan mapel dari saran harian.
- **Dilihat oleh:** Akun dengan fitur AI aktif yang saran hariannya memilih satu mapel, selama saklar ai_aktif menyala.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — kartu tautan latihan:** label: Latihan · isi: [nama mapel] · tombol: Mulai latihan (membuka Latihan dengan mapel itu)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 81. Kartu tautan "Persiapan Event"

- **Asal:** §4.15 Ngobrol Bareng LANJUT dengan AI · LANJUT_078 · baris 786
- **Tampil di:** Ngobrol, di bawah balasan AI untuk pertanyaan tentang ujian; tombol membuka Daftar Periksa.
- **Dilihat oleh:** Kelas 7–9 dengan fitur AI aktif yang punya event mendatang, selama saklar ai_aktif dan event_sekolah_aktif menyala.

**Bunyi teks (persis dari berkas):**

> **Ngobrol — kartu tautan event:** label: Persiapan Event · isi: [jenis] · [mapel] (mapel hanya bila diisi) · tombol: Buka Daftar Periksa

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Jenjang Saya (tab "Jenjang")

### 82. Judul halaman

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 235
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

### 83. Pendamping kelas 7–9

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 236
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

### 84. Pendamping kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 237
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

### 85. Pendamping kelas 12

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 238
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

### 86. Pendamping tanpa kelas

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 239
- **Tampil di:** Jenjang Saya, di bawah judul (jaring pengaman; akun tanpa kelas biasanya tertahan di gerbang dulu).
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Pendamping tanpa kelas:** Isi kelasmu di Data Akun supaya isi halaman ini pas buat kamu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 87. Judul seksi pintu

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 240
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

### 88. Pintu Ngobrol Bareng LANJUT (tanpa kelas)

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 241
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> Ngobrol Bareng LANJUT — Cerita soal yang kamu suka, nanti dibantu cari arahnya. (tanpa kelas)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 89. Pintu Eksplorasi Tujuan (tanpa kelas)

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 242
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> Eksplorasi Tujuan — Intip prodi kuliah: belajar apa dan lulusannya kerja di mana. (tanpa kelas)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 90. Pintu Pilih Mapel (tanpa kelas)

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 243
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> Pilih Mapel — Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu. (tanpa kelas)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 91. Pintu Jalur Saya (/cek-posisi; nama sejak LANJUT_074)

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 244
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> Jalur Saya — Lihat kamu lagi di tahap mana dan langkah berikutnya. (kelas 12; nama sejak LANJUT_074)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 92. Pintu Daftar Periksa

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 245
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

### 93. Judul seksi SMK

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 246
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

### 94. Pembuka seksi SMK kelas 10–11 ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 247
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

### 95. Kartu pembuka kelas 7–9

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 265
- **Tampil di:** Jenjang Saya, kartu di bawah judul, dengan tombol ke Gaya Belajar (sejak LANJUT_071; sebelumnya Eksplorasi Tujuan).
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **A1 Kartu pembuka kelas 7–9:** judul "Kamu lagi di tahap mana?" · teks "Sebelum memilih apa pun, kenali dulu dirimu. LANJUT bisa membantu kamu mulai dari hal yang paling dekat: minat dan cara belajarmu." · tombol "Mulai eksplorasi" (ke `/gaya-belajar`) — catatan LANJUT_071: tujuan tombol diubah dari `/eksplorasi-tujuan` ke Gaya Belajar (keputusan PM) karena Gaya Belajar tidak bergantung pada profil prodi yang belum terverifikasi; bunyi tombol tetap, dan Eksplorasi Tujuan tetap terbuka dari pintu A2.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 96. Pintu Eksplorasi Tujuan kelas 7–9

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 266
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **A2 Pintu Eksplorasi Tujuan kelas 7–9:** judul "Eksplorasi Tujuan" · teks "Coba cari tahu apa yang kamu suka, lalu lihat bidang apa saja yang bisa dipelajari dari situ."

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 97. Pintu Gaya Belajar kelas 7–9

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 267
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **A3 Pintu Gaya Belajar kelas 7–9:** judul "Gaya Belajar" · teks "Setiap orang belajar dengan cara yang berbeda. Kenali caramu supaya belajar terasa lebih mudah."

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 98. Kartu "SMA, SMK, atau MA?" (LANJUT_069) ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 268
- **Tampil di:** Jenjang Saya, kartu catatan di bawah seksi pintu.
- **Dilihat oleh:** Kelas 7–9.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **A4 Kartu catatan kelas 7–9:** judul "SMA, SMK, atau MA?" · teks "Ketiganya adalah jenjang setelah SMP, dengan fokus yang berbeda." · "SMA (Sekolah Menengah Atas): pendidikan umum dengan banyak pilihan mata pelajaran." · "SMK (Sekolah Menengah Kejuruan): pendidikan umum sekaligus keterampilan untuk bidang kerja tertentu." · "MA (Madrasah Aliyah): pendidikan umum dengan muatan keagamaan yang lebih kuat." · catatan "Keterangan ini sedang kami cek ulang." (Tambahan-069 no. 4)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 99. Pintu Ngobrol Bareng LANJUT kelas 7–9 ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 269
- **Tampil di:** Jenjang Saya, seksi pintu; membuka Ngobrol (terkunci tanpa persetujuan).
- **Dilihat oleh:** Kelas 7–9 (juga perlu dilihat guru BK).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **A5 Pintu Ngobrol kelas 7–9:** judul "Ngobrol Bareng LANJUT" · teks "Tanya apa saja tentang minat, cara belajar, atau rencana sekolahmu. Fitur ini butuh persetujuan orang tua/wali dulu." (gerbang persetujuan tetap di layar Ngobrol dan di server)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 100. Kartu pembuka kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 270
- **Tampil di:** Jenjang Saya, kartu di bawah judul, dengan tombol ke Pilih Mapel.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **B1 Kartu pembuka kelas 10–11:** judul "Yuk, siapkan langkahmu" · teks "Kelas 10 dan 11 adalah waktu yang tepat untuk mulai memilih mata pelajaran dan memahami jalur masuk perguruan tinggi." · tombol "Pilih mapel" (ke `/pilih-mapel`)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 101. Pintu Pilih Mapel kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 271
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **B2 Pintu Pilih Mapel kelas 10–11:** judul "Pilih Mapel" · teks "Pilihan mata pelajaranmu bisa membuka beberapa bidang studi. Coba lihat mana yang paling dekat dengan minatmu."

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 102. Pintu Eksplorasi Tujuan kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 272
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **B3 Pintu Eksplorasi Tujuan kelas 10–11:** judul "Eksplorasi Tujuan" · teks "Lihat gambaran program studi dan profesi yang berkaitan dengan minatmu. Informasi ini masih dalam tahap pengecekan." (label "Perkiraan" tetap hanya di layar Eksplorasi Tujuan, Tambahan-069 no. 3)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 103. Pintu Arsip Belajar kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 273
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **B4 Pintu Arsip Belajar kelas 10–11:** judul "Arsip Belajar" · teks "Simpan catatan dan soal latihanmu per mata pelajaran."

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 104. Pintu Level-In kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 274
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **B5 Pintu Level-In kelas 10–11:** judul "Level-In" · teks "Lihat seberapa kuat kamu di tiap mata pelajaran, dari latihanmu."

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 105. Pintu Daftar Periksa kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 275
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **B6 Pintu Daftar Periksa kelas 10–11:** judul "Daftar Periksa" · teks "Catat langkah-langkahmu supaya tidak ada yang terlewat."

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 106. Kalimat netral Daftar Periksa kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_069 · baris 276
- **Tampil di:** Daftar Periksa, di bawah judul, menggantikan pesan "Bagian ini untuk kelas 12"; butir pribadi tampil di bawahnya. Sejak LANJUT_076b dipakai juga untuk kelas 7–9 (butir terpisah di kelompok Persiapan Event).
- **Dilihat oleh:** Kelas 10–11 (kelas 7–9 juga, sejak LANJUT_076b).

**Bunyi teks (persis dari berkas):**

> **Daftar Periksa kelas 10–11, pengganti pesan "Bagian ini untuk kelas 12":** "Catat langkah-langkahmu supaya tidak ada yang terlewat." (Tambahan-069 no. 2; butir pribadi tetap tampil di bawahnya)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Bagian khusus kelas 12 (Jalur Saya /cek-posisi, Daftar Periksa) — pengganti untuk kelas lain

### 107. Pengganti kelas 7–11 — judul ⚠

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 624
- **Tampil di:** Jalur Saya /cek-posisi (kelas 7–11), menggantikan isinya. Tidak lagi di Daftar Periksa: kelas 10–11 sejak LANJUT_069 dan kelas 7–9 sejak LANJUT_076b melihat kalimat netral. Tidak tampil di Beranda.
- **Dilihat oleh:** Kelas 10–11, hanya di layar /cek-posisi (Jalur Saya); kelas 7–9 tidak bisa membuka layar itu dari app sejak LANJUT_077b.
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

### 108. Pengganti kelas 7–11 — isi ⚠

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 625
- **Tampil di:** Sama dengan butir judul di atasnya: hanya Jalur Saya /cek-posisi (kelas 7–11); sejak LANJUT_076b tidak lagi di Daftar Periksa.
- **Dilihat oleh:** Kelas 10–11, hanya di layar /cek-posisi (Jalur Saya); kelas 7–9 tidak bisa membuka layar itu dari app sejak LANJUT_077b.
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

### 109. Pengganti kelas 7–11 — tombol

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 626
- **Tampil di:** Sama dengan butir judul di atasnya: hanya Jalur Saya /cek-posisi (kelas 7–11); sejak LANJUT_076b tidak lagi di Daftar Periksa.
- **Dilihat oleh:** Kelas 10–11, hanya di layar /cek-posisi (Jalur Saya); kelas 7–9 tidak bisa membuka layar itu dari app sejak LANJUT_077b.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — tombol:** Buka Jenjang Saya (sebelum LANJUT_037: Buka Khusus SMK)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 110. Pengganti tanpa kelas — judul

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 627
- **Tampil di:** Jalur Saya /cek-posisi dan Daftar Periksa (jaring pengaman; biasanya tertahan di gerbang isi kelas dulu). Tidak tampil di Beranda.
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

### 111. Pengganti tanpa kelas — isi

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 628
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — isi:** Isi bagian ini menyesuaikan kelasmu. Isi kelas di Data Akun, ya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 112. Pengganti tanpa kelas — tombol

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 629
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — tombol:** Isi kelas di Data Akun · Buka Jenjang Saya

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Daftar Periksa

### 113. Butir dari Pilih Mapel ⚠

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 299
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

### 114. Butir dari Eksplorasi Tujuan

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 300
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

### 115. Tombol Hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 301
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

### 116. Galat centang/hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 302
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

## Daftar Periksa — Persiapan Event (SMP kelas 7–9, saklar bawaan mati)

### 117. Judul seksi

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 318
- **Tampil di:** Daftar Periksa, di bawah kalimat netral, di atas butir milik akun.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Judul seksi:** Persiapan Event

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 118. Pengantar (diubah LANJUT_076b)

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 319
- **Tampil di:** Di bawah judul seksi Persiapan Event.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Catat ujian dan ulangan yang akan datang, supaya kamu bisa menyiapkan diri lebih awal. (LANJUT_076b, contoh kalimat PM; sebelumnya "Catat ujian atau ulangan yang akan datang, lengkap dengan mapel dan materinya.")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 119. Tombol Tambah event

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 320
- **Tampil di:** Di bawah pengantar; membuka isian event di tempat.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Tombol tambah:** Tambah event

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 120. Daftar kosong

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 321
- **Tampil di:** Pengganti daftar event bila tidak ada event hari ini atau sesudahnya.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Daftar kosong:** Belum ada event yang akan datang.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 121. Label isian (diubah LANJUT_076b)

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 322
- **Tampil di:** Isian tambah/ubah event.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Label isian:** Jenis · Tanggal · Mapel (opsional) · Materi (opsional) · Kartu materi (opsional) (LANJUT_076b; sebelumnya "Kartu Arsip")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 122. Pilihan jenis (diubah LANJUT_076b)

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 323
- **Tampil di:** Isian event, medan Jenis; labelnya juga di kartu event dan kartu Beranda. TKA hanya kelas 9.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Pilihan jenis:** UTS · UAS/PAS · Ulangan Harian · TKA · Lainnya — TKA hanya tampil untuk kelas 9 (LANJUT_076b; sebelumnya UTS · UAS · Ulangan · Lainnya). Label yang sama dipakai di kartu event dan kartu Beranda; event lama "UAS" tampil sebagai "UAS/PAS", "Ulangan" sebagai "Ulangan Harian".

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 123. Petunjuk tanggal

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 324
- **Tampil di:** Isian event, di bawah medan Tanggal (diganti galat tanggal bila ada).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Petunjuk tanggal:** Contoh: 2026-11-03 (tahun-bulan-tanggal).

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 124. Petunjuk materi

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 325
- **Tampil di:** Isian event, di atas medan Materi; selalu tampil, juga saat ada galat.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Petunjuk materi (wajib tampil di layar isian):** Tulis materinya singkat saja. Jangan tulis nama atau data pribadi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 125. Kartu materi kosong (diubah LANJUT_076b)

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 326
- **Tampil di:** Isian event, medan Kartu materi, bila tidak ada kartu milik sendiri atau kartu kurasi sah (untuk mapel yang dipilih).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Kartu materi kosong:** Belum ada kartu materi untuk pilihan ini. (LANJUT_076b; sebelumnya "Belum ada kartu Arsip untuk pilihan ini.")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 126. Tombol isian

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 327
- **Tampil di:** Isian event, paling bawah.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Tombol isian:** Simpan event · Batal

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 127. Tombol di tiap event

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 328
- **Tampil di:** Kartu event; "Buka materi" membuka kartu Arsip milik sendiri, atau panel materi untuk kartu kurasi.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Tombol di tiap event:** Buka materi (hanya bila kartu yang terhubung masih tersedia) · Ubah · Hapus

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 128. Konfirmasi hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 329
- **Tampil di:** Kartu event, sesudah menekan Hapus; hapus permanen.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Konfirmasi hapus:** Hapus event ini? Event yang dihapus tidak bisa dikembalikan. · tombol: Ya, hapus · Batal

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 129. Event yang sudah lewat

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 330
- **Tampil di:** Di bawah daftar event, hanya bila ada event yang tanggalnya sudah lewat (WIB).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Event yang sudah lewat:** Lihat event yang sudah lewat ([n]) · Sembunyikan event yang sudah lewat · label di kartu event: Sudah lewat

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 130. Hitung mundur

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 331
- **Tampil di:** Kartu event dan kartu Persiapan Terdekat di Beranda (hariIniWib).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Hitung mundur:** Hari ini · [n] hari lagi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 131. Galat jenis

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 332
- **Tampil di:** Isian event, saat Simpan tanpa jenis.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Galat jenis:** Pilih jenis event.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 132. Galat tanggal

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 333
- **Tampil di:** Isian event, medan Tanggal (format, kalender, lebih dari 2 tahun).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Galat tanggal:** Isi tanggal dengan format tahun-bulan-tanggal, misalnya 2026-11-03. · Tanggal ini tidak ada di kalender. · Tanggal paling jauh 2 tahun dari hari ini.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 133. Galat materi

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 334
- **Tampil di:** Isian event, materi lebih dari 200 karakter.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Galat materi:** Materi paling panjang 200 karakter.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 134. Galat kartu materi (diubah LANJUT_076b)

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 335
- **Tampil di:** Isian event, medan Kartu materi, bila server menolak (400 KARTU_TIDAK_SAH).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Galat kartu materi (server menolak, `KARTU_TIDAK_SAH`):** Kartu ini tidak bisa dipakai. Pilih kartu materi lain. (LANJUT_076b; sebelumnya "… Pilih kartu lain dari Arsip-mu.")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 135. Gagal menyimpan/menghapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_076 · baris 336
- **Tampil di:** Isian event atau konfirmasi hapus, bila server gagal.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Gagal menyimpan atau menghapus:** Belum tersimpan. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 136. Kalimat netral Daftar Periksa SMP

- **Asal:** §4.4 Daftar Periksa · LANJUT_076b · baris 348
- **Tampil di:** Daftar Periksa, di bawah judul, menggantikan "Bagian ini untuk kelas 12. … Versi untuk kelas [kelas] sedang kami siapkan." dan tombol "Buka Jenjang Saya". Kalimat yang sama dengan kelas 10–11 (LANJUT_069). Tampil juga saat saklar mati.
- **Dilihat oleh:** Kelas 7–9 (semua, tidak bergantung saklar).

**Bunyi teks (persis dari berkas):**

> **Daftar Periksa SMP — pengganti "Bagian ini untuk kelas 12":** Catat langkah-langkahmu supaya tidak ada yang terlewat.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 137. Sumber kartu kurasi

- **Asal:** §4.4 Daftar Periksa · LANJUT_076b · baris 349
- **Tampil di:** Kartu event, di bawah materi, bila kartu yang terhubung adalah kartu kurasi terverifikasi.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Kartu event — sumber kartu kurasi:** Sumber: [nama sumber]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 138. Materi sudah tidak tersedia

- **Asal:** §4.4 Daftar Periksa · LANJUT_076b · baris 350
- **Tampil di:** Kartu event, menggantikan tombol "Buka materi", bila kartu yang terhubung sudah dihapus atau (kurasi) tidak terverifikasi lagi.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Kartu event — kartu sudah dihapus atau tidak terverifikasi lagi (tanpa tombol Buka materi):** Materi ini sudah tidak tersedia.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 139. Tombol panel materi kurasi

- **Asal:** §4.4 Daftar Periksa · LANJUT_076b · baris 351
- **Tampil di:** Kartu event; membuka/menutup panel berisi judul dan isi kartu kurasi (tanpa tautan keluar).
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Kartu event — tombol panel materi kurasi:** Buka materi · Tutup materi (panel berisi judul dan isi kartu kurasi)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 140. Pilihan kartu kurasi

- **Asal:** §4.4 Daftar Periksa · LANJUT_076b · baris 352
- **Tampil di:** Isian event, medan Kartu materi.
- **Dilihat oleh:** Kelas 7–9, hanya bila saklar event_sekolah_aktif menyala (bawaan mati: saat ini tidak ada).

**Bunyi teks (persis dari berkas):**

> **Isian — pilihan kartu kurasi:** [judul kartu] · Sumber: [nama sumber]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Eksplorasi Tujuan (F10)

### 141. Belum ada profil — judul

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 501
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

### 142. Belum ada profil — isi ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 502
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

### 143. Tombol kembali & prodi lain

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 503
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

### 144. Lencana "Relevan untuk RPL/TKJ/Teknik" ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 504
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

### 145. Baris sumber angka pendaftar ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 505
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

### 146. Penjelas label "Perkiraan" ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_044 · baris 517
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

### 147. Kaki halaman — semua bagian terverifikasi ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 530
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

### 148. Kaki halaman — ada bagian Perkiraan ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 531
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

### 149. Kaki halaman — ada bagian tanpa status ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 532
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

## Pilih Mapel per rumpun (kelas 12) & Mapel Saya (kelas 7–11)

### 150. Judul seksi "Mapel pilihanmu"

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 871
- **Tampil di:** Tab Pilih Mapel, seksi berbingkai di atas alur prodi (F3).
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Pilih Mapel kelas 12 — judul seksi:** Mapel pilihanmu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 151. Pengantar Pilih Mapel kelas 12

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 872
- **Tampil di:** Tab Pilih Mapel, di bawah judul seksi, setelah rumpun favorit dipilih.
- **Dilihat oleh:** Kelas 12 yang sudah memilih rumpun.

**Bunyi teks (persis dari berkas):**

> **Pilih Mapel kelas 12 — pengantar:** Pilih paling banyak 5 mapel dari rumpun favoritmu. Mapel ini tampil lebih dulu di Arsip dan Latihan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 152. Ajakan memilih rumpun dulu

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 873
- **Tampil di:** Tab Pilih Mapel, seksi atas, selama rumpun favorit belum dipilih; diikuti pilihan rumpun. Tidak ada daftar mapel.
- **Dilihat oleh:** Kelas 12 yang belum memilih rumpun.

**Bunyi teks (persis dari berkas):**

> **Pilih Mapel kelas 12 — ajakan (belum memilih rumpun):** judul: Pilih rumpun favoritmu dulu · teks: Pilih satu sampai tiga rumpun yang paling kamu minati. Setelah itu, mapel di sini dikelompokkan per rumpun.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 153. Catatan: pengelompokan belum dicek ke sumber resmi (diubah LANJUT_079b) ⚠

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 874
- **Tampil di:** Tab Pilih Mapel, di bawah judul SETIAP kelompok rumpun (LANJUT_079b; sebelumnya satu kalimat di atas semua kelompok).
- **Dilihat oleh:** Kelas 12 yang sudah memilih rumpun.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Pilih Mapel kelas 12 — catatan pengelompokan:** Belum dicek ke sumber resmi. (di bawah judul setiap kelompok rumpun; LANJUT_079b, sebelumnya satu kalimat di atas semua kelompok: "Pengelompokan ini sementara, untuk memudahkan memilih. Belum dicek ke sumber resmi.")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 154. Judul kelompok = nama rumpun

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 875
- **Tampil di:** Tab Pilih Mapel, di atas pil mapel tiap rumpun favorit.
- **Dilihat oleh:** Kelas 12 yang sudah memilih rumpun.

**Bunyi teks (persis dari berkas):**

> **Pilih Mapel kelas 12 — judul kelompok:** [nama rumpun] (Ekonomi & Bisnis · Kesehatan · Sosial & Humaniora · Teknologi & Rekayasa)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 155. Tombol "Ubah rumpun favorit"

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 876
- **Tampil di:** Tab Pilih Mapel, bawah seksi; membuka pilihan rumpun di layar yang sama.
- **Dilihat oleh:** Kelas 12 yang sudah memilih rumpun.

**Bunyi teks (persis dari berkas):**

> **Pilih Mapel kelas 12 — tombol ubah rumpun:** Ubah rumpun favorit (membuka pilihan rumpun di layar yang sama)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 156. Pilihan rumpun favorit (1–3)

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 877
- **Tampil di:** Jalur Saya /cek-posisi (sesudah Langkah Berikutnya) dan ajakan di tab Pilih Mapel.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Rumpun favorit (Jalur Saya kelas 12 dan ajakan Pilih Mapel):** judul seksi (Jalur Saya): Rumpun favorit · petunjuk: Pilih satu sampai tiga rumpun yang paling kamu minati. · tombol: Simpan rumpun

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 157. Mapel Saya — judul & pengantar

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 878
- **Tampil di:** Tab Pilih Mapel: judul layar untuk kelas 7–9; judul seksi di atas alur prodi untuk kelas 10–11.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Mapel Saya — judul & pengantar:** Mapel Saya · Pilih paling banyak 5 mapel yang kamu sukai atau ingin kamu perdalam. Mapel ini tampil lebih dulu di Arsip dan Latihan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 158. Hitungan dan batas pilihan

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 879
- **Tampil di:** Tab Pilih Mapel (mapel) dan pilihan rumpun (batas saja).
- **Dilihat oleh:** Kelas 7–12.

**Bunyi teks (persis dari berkas):**

> **Pilihan mapel — hitungan & batas:** [n] dari 5 dipilih · batas tercapai: Paling banyak [maks]. Lepas satu dulu untuk memilih yang lain. (dipakai juga untuk rumpun, maks. 3)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 159. Rumpun lebih dari batas (akun lama, LANJUT_079b)

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 880
- **Tampil di:** Pilihan rumpun favorit (Pilih Mapel, terbuka sendiri; dan Jalur Saya) selama pilihan masih lebih dari 3.
- **Dilihat oleh:** Akun kelas 12 yang menyimpan lebih dari 3 rumpun sebelum batas 3 berlaku.

**Bunyi teks (persis dari berkas):**

> **Rumpun favorit — lebih dari batas (akun lama):** Pilihanmu ada [n], padahal paling banyak [maks]. Kurangi dulu, lalu simpan. (baru LANJUT_079b)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 160. Tombol "Simpan mapel"

- **Asal:** §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya · LANJUT_079 · baris 881
- **Tampil di:** Tab Pilih Mapel, tampil bila pilihan berubah.
- **Dilihat oleh:** Kelas 7–12.

**Bunyi teks (persis dari berkas):**

> **Pilihan mapel — tombol:** Simpan mapel

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Persiapan Ujian (Daftar Periksa) & Kesiapan Ujian (Jalur Saya)

### 161. Judul kategori "Persiapan Ujian"

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 897
- **Tampil di:** Daftar Periksa, kategori keempat sesudah Jalur Pembiayaan.
- **Dilihat oleh:** Kelas 12 dengan jalur TKA atau SNBT.

**Bunyi teks (persis dari berkas):**

> **Kategori Daftar Periksa:** Persiapan Ujian

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 162. Catatan: saran, bukan syarat resmi

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 898
- **Tampil di:** Daftar Periksa, di bawah judul kategori Persiapan Ujian.
- **Dilihat oleh:** Kelas 12 dengan jalur TKA atau SNBT.

**Bunyi teks (persis dari berkas):**

> **Catatan di bawah judul kategori:** Saran dari LANJUT untuk persiapan belajar, bukan syarat resmi pendaftaran.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 163. Butir "Ikut minimal satu tryout TKA"

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 899
- **Tampil di:** Daftar Periksa, kategori Persiapan Ujian.
- **Dilihat oleh:** Kelas 12, jalur TKA.

**Bunyi teks (persis dari berkas):**

> **Butir tryout TKA (kelas 12, jalur TKA):** Ikut minimal satu tryout TKA

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 164. Butir "Cek Level-In untuk mapel pilihan TKA-mu"

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 901
- **Tampil di:** Daftar Periksa, kategori Persiapan Ujian.
- **Dilihat oleh:** Kelas 12 jalur TKA (dan saringan kelas 11 jalur TKA).

**Bunyi teks (persis dari berkas):**

> **Butir Level-In (kelas 11–12, jalur TKA):** Cek Level-In untuk mapel pilihan TKA-mu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 165. Butir "Ikut minimal satu tryout UTBK-SNBT"

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 902
- **Tampil di:** Daftar Periksa, kategori Persiapan Ujian.
- **Dilihat oleh:** Kelas 12, jalur SNBT.

**Bunyi teks (persis dari berkas):**

> **Butir tryout SNBT (kelas 12, jalur SNBT):** Ikut minimal satu tryout UTBK-SNBT

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 166. Butir "Ikut simulasi atau gladi TKA kalau sekolahmu mengadakannya" ⚠

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 900
- **Tampil di:** Daftar Periksa, kategori Persiapan Ujian.
- **Dilihat oleh:** Kelas 12, jalur TKA.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Butir simulasi TKA (kelas 12, jalur TKA):** Ikut simulasi atau gladi TKA kalau sekolahmu mengadakannya

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 167. Judul & pertanyaan Kesiapan Ujian

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 903
- **Tampil di:** Jalur Saya /cek-posisi, sesudah Langkah Berikutnya.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Kesiapan Ujian — judul seksi & pertanyaan:** Kesiapan Ujian · Seberapa siap kamu menghadapi ujianmu (TKA atau UTBK-SNBT)?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 168. Petunjuk Kesiapan Ujian

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 904
- **Tampil di:** Jalur Saya, di bawah pertanyaan.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Kesiapan Ujian — petunjuk:** Jawab jujur saja. Jawabanmu cuma dipakai untuk menyesuaikan saran di sini dan bisa diubah kapan saja.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 169. Empat pilihan kesiapan

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 905
- **Tampil di:** Jalur Saya, pilihan berbentuk pil; ketukan langsung menyimpan.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Kesiapan Ujian — pilihan:** Belum siap, belum mulai latihan soal · Mulai siap, masih banyak materi yang belum kukuasai · Hampir siap, sebagian besar materi sudah kukuasai · Sudah siap, tinggal menjaga ritme

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 170. Status "Menyimpan…"

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 906
- **Tampil di:** Jalur Saya, di bawah pilihan selama menyimpan.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Kesiapan Ujian — saat menyimpan:** Menyimpan…

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 171. Ringkasan langkah Persiapan Ujian

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 907
- **Tampil di:** Jalur Saya, kartu saran; hanya bila jalurnya punya butir Persiapan Ujian.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Kesiapan Ujian — ringkasan:** Persiapan Ujian di Daftar Periksa: [n] dari [total] beres. (hanya bila jalurnya punya butir Persiapan Ujian)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 172. Saran: belum siap

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 908
- **Tampil di:** Jalur Saya, kartu saran.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Saran — belum siap:** Membuat beberapa kartu soal di Arsip Belajar lalu mencobanya di Latihan bisa jadi awal yang ringan. · tombol: Buka Arsip Belajar

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 173. Saran: mulai siap

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 909
- **Tampil di:** Jalur Saya, kartu saran.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Saran — mulai siap:** Level-In bisa menunjukkan mapel mana yang paling perlu dilatih dulu. · tombol: Lihat Level-In

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 174. Saran: belum tryout

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 910
- **Tampil di:** Jalur Saya, kartu saran.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Saran — hampir/sudah siap, belum tryout:** Ikut satu tryout bisa jadi cara menguji rasa siapmu dengan soal yang mirip ujian. · tombol: Lihat Persiapan Ujian

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 175. Saran: belum simulasi/gladi

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 911
- **Tampil di:** Jalur Saya, kartu saran (jalur TKA).
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Saran — hampir/sudah siap, sudah tryout, belum simulasi (jalur TKA):** Kalau sekolahmu mengadakan simulasi atau gladi TKA, ikut bisa bikin hari ujian terasa lebih akrab. · tombol: Lihat Persiapan Ujian

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 176. Saran: hampir siap, langkah beres

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 912
- **Tampil di:** Jalur Saya, kartu saran.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Saran — hampir siap, langkah ujian beres:** Tinggal merapikan mapel yang masih lemah. Level-In bisa bantu memilihnya. · tombol: Lihat Level-In

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 177. Saran: sudah siap, langkah beres

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 913
- **Tampil di:** Jalur Saya, kartu saran (tanpa tombol).
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Saran — sudah siap, langkah ujian beres:** Persiapanmu sudah jalan. Menjaga ritme latihan dan istirahat yang cukup bisa jadi pegangan menjelang ujian. (tanpa tombol)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 178. Penafian Jalur Saya (diubah)

- **Asal:** §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) · (tidak disebut) · baris 914
- **Tampil di:** Jalur Saya, paling bawah.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Penafian Jalur Saya (diubah):** Posisi ini dihitung dari target prodi di Data Akun dan kemajuan Daftar Periksa, termasuk Persiapan Ujian. Jawaban kesiapanmu hanya mengubah saran, bukan tahapmu. Ini cuma gambaran, keputusannya tetap di tanganmu. (sebelumnya tanpa kalimat "termasuk Persiapan Ujian" dan kalimat kedua)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Eksplorasi Kampus (SMP & kelas 10–11)

### 179. Kartu grid "Eksplorasi Kampus"

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 547
- **Tampil di:** Beranda, grid ikon (label pendek di bawah ikon).
- **Dilihat oleh:** Kelas 7–12 (akun tanpa kelas tidak).

**Bunyi teks (persis dari berkas):**

> **Kartu grid Beranda:** Eksplorasi Kampus (ke `/eksplorasi-tujuan`; label kartu yang sama di grid SMP dan 10–11, sebelumnya "Eksplorasi Tujuan"; kartu baru di grid kelas 12)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 180. Judul layar SMP

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 548
- **Tampil di:** Bilah halaman /eksplorasi-tujuan.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **Judul bilah halaman SMP:** Kenali Minatmu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 181. Judul layar kelas 10–11

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 549
- **Tampil di:** Bilah halaman /eksplorasi-tujuan.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **Judul bilah halaman kelas 10–11:** Jalur dan Bidangmu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 182. Pengantar SMP

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 550
- **Tampil di:** Kenali Minatmu, paling atas.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **SMP — pengantar:** Pilih bidang yang menarik buatmu. Tidak ada pilihan yang salah, dan pilihanmu bisa diubah kapan saja.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 183. Pengantar kelas 10–11

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 551
- **Tampil di:** Jalur dan Bidangmu, paling atas.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **Kelas 10–11 — pengantar:** Kenali cara masuk perguruan tinggi dan bidang yang ingin kamu dalami.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 184. Judul seksi jalur masuk

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 552
- **Tampil di:** Jalur dan Bidangmu, di atas tiga kartu jalur, dengan lencana dan penjelas Perkiraan.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **Kelas 10–11 — judul seksi jalur:** Jalur masuk perguruan tinggi · lencana: Perkiraan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 185. Penjelasan jalur SNBP ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 553
- **Tampil di:** Jalur dan Bidangmu, kartu jalur masuk (tanpa tanggal).
- **Dilihat oleh:** Kelas 10–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Jalur SNBP:** Seleksi Nasional Berdasarkan Prestasi. Dinilai dari nilai rapor dan prestasi, tanpa tes tertulis. Sekolah menentukan siapa yang bisa ikut.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 186. Penjelasan jalur SNBT ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 554
- **Tampil di:** Jalur dan Bidangmu, kartu jalur masuk (tanpa tanggal).
- **Dilihat oleh:** Kelas 10–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Jalur SNBT:** Seleksi Nasional Berdasarkan Tes. Dinilai dari hasil tes tertulis berbasis komputer.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 187. Penjelasan jalur seleksi mandiri ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 555
- **Tampil di:** Jalur dan Bidangmu, kartu jalur masuk (tanpa tanggal).
- **Dilihat oleh:** Kelas 10–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Jalur seleksi mandiri:** Seleksi yang diadakan sendiri oleh tiap perguruan tinggi negeri. Caranya bisa berbeda di tiap kampus.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 188. Judul seksi bidang minat

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 556
- **Tampil di:** Kenali Minatmu dan Jalur dan Bidangmu, di atas kartu bidang, dengan lencana dan penjelas Perkiraan.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Judul seksi bidang:** Bidang minat · lencana: Perkiraan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 189. Petunjuk jumlah pilihan

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 557
- **Tampil di:** Di bawah judul seksi bidang.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Petunjuk jumlah:** Pilih sampai [n] bidang. ([n] = 5 untuk SMP, 3 untuk kelas 10–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 190. Penjelasan bidang Ekonomi & Bisnis ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 558
- **Tampil di:** Kartu bidang yang bisa dicentang (nama rumpun dari data prodi).
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Bidang Ekonomi & Bisnis:** Belajar tentang uang, usaha, dan cara sebuah organisasi berjalan. · Contoh pekerjaan: mengurus keuangan, menjalankan usaha, atau membantu perusahaan merencanakan kegiatannya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 191. Penjelasan bidang Kesehatan ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 559
- **Tampil di:** Kartu bidang yang bisa dicentang (nama rumpun dari data prodi).
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Bidang Kesehatan:** Belajar tentang tubuh manusia, penyakit, dan cara menjaga kesehatan. · Contoh pekerjaan: merawat orang sakit, membantu pemulihan, atau menjaga kesehatan masyarakat.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 192. Penjelasan bidang Sosial & Humaniora ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 560
- **Tampil di:** Kartu bidang yang bisa dicentang (nama rumpun dari data prodi).
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Bidang Sosial & Humaniora:** Belajar tentang manusia, masyarakat, bahasa, dan aturan dalam kehidupan bersama. · Contoh pekerjaan: menyampaikan informasi, mendampingi masyarakat, atau membantu menyelesaikan urusan aturan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 193. Penjelasan bidang Teknologi & Rekayasa ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 561
- **Tampil di:** Kartu bidang yang bisa dicentang (nama rumpun dari data prodi).
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Bidang Teknologi & Rekayasa:** Belajar tentang cara kerja alat, listrik, dan komputer, serta cara merancang sesuatu yang berguna. · Contoh pekerjaan: merancang, membangun, atau merawat alat, bangunan, dan sistem komputer.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 194. Tombol simpan

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 562
- **Tampil di:** Di bawah kartu bidang, hanya saat pilihan berubah.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Tombol simpan:** Simpan minatku (SMP) · Simpan bidangku (kelas 10–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 195. Konfirmasi tersimpan

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 563
- **Tampil di:** Menggantikan tombol simpan bila pilihan sama dengan yang tersimpan.
- **Dilihat oleh:** Kelas 7–11 yang sudah menyimpan.

**Bunyi teks (persis dari berkas):**

> **Sesudah tersimpan:** Pilihanmu sudah tersimpan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 196. Belum menerima kebijakan

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 564
- **Tampil di:** Di atas tombol simpan, sesudah server menolak (403 AI_BELUM_DIIZINKAN); tautan ke /terima-kebijakan.
- **Dilihat oleh:** Akun kelas 7–11 yang belum menerima kebijakan privasi versi berlaku.

**Bunyi teks (persis dari berkas):**

> **Belum menerima kebijakan privasi (server menolak menyimpan):** Terima kebijakan privasi dulu supaya pilihanmu bisa disimpan. · tautan: Baca dan terima

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 197. Gagal menyimpan

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 565
- **Tampil di:** Di atas tombol simpan, bila simpan gagal karena sebab lain.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Gagal menyimpan:** Belum tersimpan. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 198. Daftar bidang gagal dimuat

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 566
- **Tampil di:** Seksi bidang, bila data prodi tidak bisa dimuat.
- **Dilihat oleh:** Kelas 7–11, saat tidak tersambung.

**Bunyi teks (persis dari berkas):**

> **Daftar bidang gagal dimuat:** Daftar bidang belum bisa dimuat. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 199. Kalimat penutup SMP

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 567
- **Tampil di:** Kenali Minatmu, paling bawah.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **SMP — kalimat penutup:** Ini baru gambaran awal. Kamu masih punya waktu untuk menentukan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 200. Pengganti daftar prodi

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075 · baris 568
- **Tampil di:** Jalur dan Bidangmu, paling bawah.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **Kelas 10–11 — pengganti daftar prodi:** Daftar prodi dan syaratnya akan muncul setelah dicek ke sumber resmi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 201. Keterangan kartu Eksplorasi Kampus (SMP & 10–11)

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_075c · baris 577
- **Tampil di:** Data kartu grid Beranda (lib/beranda.ts). Belum terlihat di layar: grid hanya menampilkan label.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Keterangan kartu Eksplorasi Kampus (SMP & kelas 10–11):** Kenali bidang yang cocok untukmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Arsip Belajar

### 202. Pintu di Beranda

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 368
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

### 203. Daftar kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 369
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

### 204. Judul halaman

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 370
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

### 205. Formulir kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 371
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

### 206. Galat formulir

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 372
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

### 207. Lihat kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 373
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

### 208. Konfirmasi hapus

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 374
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

### 209. Kartu tidak ditemukan

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 375
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

### 210. Bagian Modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 384
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

### 211. Daftar modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 385
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

### 212. Cari di modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 386
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

### 213. Hapus semua modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 387
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

### 214. Lihat & hapus modul

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 388
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

### 215. Modul tidak ditemukan

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 389
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

### 216. Peringatan sebelum unggah ⚠

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 390
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

### 217. Formulir unggah

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 391
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

### 218. Galat formulir

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 392
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

### 219. Galat unggah (tipe, ukuran, karakter, jumlah, PDF)

- **Asal:** §4.5 Arsip Belajar · LANJUT_049 · baris 393
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

### 220. Pintu di Arsip Belajar

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 422
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

### 221. Sebelum mulai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 420
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

### 222. Arsip kosong

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 421
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

### 223. Selama sesi

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 423
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

### 224. Sesudah selesai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 424
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

### 225. Penyimpanan hasil

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 425
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

### 226. Tombol akhir

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 426
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

### 227. Galat mulai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 427
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

### 228. Riwayat Latihan

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 428
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

### 229. Pertanyaan keyakinan

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 830
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

### 230. Keyakinan setelah jawaban dibuka

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 831
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

### 231. Tombol ke Level-In

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 832
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

### 232. Pintu di Beranda

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 833
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

### 233. Kartu "Latihan berikutnya" di Beranda

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_077 · baris 850
- **Tampil di:** Beranda, tepat sesudah grid ikon dan sebelum Info Penting (kelas 12) atau carousel banner; hanya bila saran harian memilih satu mapel dari data yang cukup. Tombol membuka Latihan mapel itu.
- **Dilihat oleh:** Semua akun (kelas 7–12) yang sudah menjawab cukup kartu dengan keyakinan di satu mapel.

**Bunyi teks (persis dari berkas):**

> **Beranda — kartu Latihan berikutnya:** label: Latihan berikutnya · isi: [nama mapel] · tombol: Mulai latihan (membuka Latihan dengan mapel itu)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 234. Judul & pengantar

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 834
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

### 235. Belum pernah latihan (diubah LANJUT_077b, tanpa angka ambang)

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 835
- **Tampil di:** Level-In, akun tanpa jawaban latihan.
- **Dilihat oleh:** Akun yang belum pernah berlatih.

**Bunyi teks (persis dari berkas):**

> **Level-In — belum pernah latihan:** Belum ada latihan. · Level-In muncul setelah kamu menjawab kartu di Latihan. Mulai dari sedikit kartu dulu saja. · tombol: Mulai latihan (LANJUT_077b: kalimat kedua tanpa angka ambang tetap, contoh kalimat PM; sebelumnya "Mulai dari 5 kartu saja.")

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 236. Galat

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 836
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

### 237. Per mapel

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 837
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

### 238. Level dan artinya ⚠

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 838
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

### 239. Belum cukup data

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 839
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

### 240. Keyakinan ⚠

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 840
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

### 241. Saran hari ini

- **Asal:** §4.18 Level-In dan keyakinan di Latihan · LANJUT_058 · baris 841
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

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 248 — Memakai pembuka lama §4.2 yang bukan DRAF; kepala blok menyebutnya dikecualikan.

> **Pembuka kelas 12:** pembuka lama di atas.

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 249 — Aturan butir Khusus SMK mana yang tampil per kelas, bukan teks yang tampil. Isi butirnya sendiri diperiksa di lembar verifikasi konten (bagian Khusus SMK).

> **Butir SMK per kelas:** kelas 12 melihat keenam butir. Kelas 10–11 hanya
> butir tanpa SNBP/PDSS/UTBK/kuota/periode pendaftaran: `portofolio` dan
> `mapel-tka-tidak-ada` (daftar izin di `lib/khususSmk.ts`). Empat butir lain
> disembunyikan, tidak ditulis ulang, supaya tidak ada klaim baru tanpa sumber.
> Kelas 7–9 tidak melihat bagian SMK.

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 254 — Catatan perilaku (siapa yang melihat seksi SMK), bukan teks yang tampil.

> **Sejak LANJUT_038:** akun punya `jenis_sekolah`, jadi seksi SMK hanya tampil
> untuk siswa SMK. Siswa SMA/MA kelas 10–12 tidak melihatnya.

- §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 506 — Catatan bahwa tombol memakai teks PWA §4.9 yang bukan DRAF; tidak ada teks baru.

> Tombol **Simpan ke Daftar Periksa** ada di Expo sejak LANJUT_034, memakai teks PWA di atas (butir milik akun; lihat §4.4).

## Lampiran: blok DRAF di berkas sumber

| Bagian | Task | Baris | Butir di blok |
|---|---|---|---|
| §4.1 Linimasa | LANJUT_072 | 168 | 1 |
| §4.1 Linimasa | LANJUT_072b | 175 | 1 |
| §4.1 Linimasa | LANJUT_073 | 186 | 1 |
| §4.1 Linimasa | LANJUT_074 | 199 | 4 |
| §4.2 Khusus SMK → Jenjang Saya | LANJUT_037 | 226 | 16 |
| §4.2 Khusus SMK → Jenjang Saya | LANJUT_069 | 257 | 12 |
| §4.4 Daftar Periksa | LANJUT_034 | 296 | 4 |
| §4.4 Daftar Periksa | LANJUT_076 | 310 | 20 |
| §4.4 Daftar Periksa | LANJUT_076b | 339 | 5 |
| §4.5 Arsip Belajar | LANJUT_039 | 363 | 8 |
| §4.5 Arsip Belajar | LANJUT_049 | 377 | 10 |
| §4.7 Sesi Latihan Harian | LANJUT_041 | 413 | 9 |
| §4.9 Eksplorasi Tujuan | LANJUT_031 | 496 | 6 |
| §4.9 Eksplorasi Tujuan | LANJUT_044 | 508 | 1 |
| §4.9 Eksplorasi Tujuan | LANJUT_045 | 519 | 3 |
| §4.9 Eksplorasi Tujuan | LANJUT_075 | 534 | 22 |
| §4.9 Eksplorasi Tujuan | LANJUT_075c | 570 | 1 |
| §4.10 Daftar (buat akun) | LANJUT_035 | 594 | 2 |
| §4.10 Daftar (buat akun) | LANJUT_038 | 599 | 3 |
| §4.11 Bukan kelas 12 (placeholder sementara) | LANJUT_035 | 609 | 7 |
| §4.11 Bukan kelas 12 (placeholder sementara) | LANJUT_077 | 635 | 1 |
| §4.12 Gerbang wajib isi kelas | LANJUT_036 | 646 | 5 |
| §4.12 Gerbang wajib isi kelas | LANJUT_038 | 656 | 4 |
| §4.13 Kebijakan privasi & persetujuan orang tua/wali | LANJUT_047 | 667 | 13 |
| §4.13 Kebijakan privasi & persetujuan orang tua/wali | LANJUT_075b | 688 | 1 |
| §4.13 Kebijakan privasi & persetujuan orang tua/wali | LANJUT_078 | 697 | 2 |
| §4.13 Kebijakan privasi & persetujuan orang tua/wali | LANJUT_079 | 710 | 1 |
| §4.14 Terima kebijakan privasi (akun lama & terima ulang) | LANJUT_048 | 720 | 11 |
| §4.15 Ngobrol Bareng LANJUT dengan AI | LANJUT_051 | 741 | 6 |
| §4.15 Ngobrol Bareng LANJUT dengan AI | LANJUT_074 | 754 | 2 |
| §4.15 Ngobrol Bareng LANJUT dengan AI | LANJUT_078 | 770 | 5 |
| §4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi | LANJUT_053 | 790 | 11 |
| §4.17 Ngobrol: materi dari modul Arsip dan web | LANJUT_055 | 811 | 4 |
| §4.18 Level-In dan keyakinan di Latihan | LANJUT_058 | 824 | 12 |
| §4.18 Level-In dan keyakinan di Latihan | LANJUT_077 | 843 | 1 |
| §4.19 Pilih Mapel per rumpun favorit dan Mapel Saya | LANJUT_079 | 854 | 11 |
| §4.20 Persiapan Ujian (Daftar Periksa) dan Kesiapan Ujian (Jalur Saya) | (tidak disebut) | 885 | 18 |
| §6 Layar Kosong Umum | LANJUT_080b | 940 | 1 |
| **Jumlah** | | | **245** (241 butir keputusan + 4 di lampiran) |
