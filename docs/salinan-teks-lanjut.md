# Salinan Teks (Copywriting) — LANJUT

**Produk:** LANJUT (Layanan Navigasi Jalur Kuliah untuk Siswa SMK)
**Kelompok:** EDILAKSO GROUP
**Status:** v1 — kandidat teks, sebagian masih perlu diuji ke pengguna
**Dokumen pendamping:** Spesifikasi Produk LANJUT v1, design.md

---

## 0. Prinsip Penulisan

Empat kaidah yang mengikat seluruh teks di dokumen ini.

**1. Dua lapis kalimat, bukan satu.**
Kalimat *masuk* bertugas membuat orang percaya dan memasang aplikasi — dipakai sekali, di luar aplikasi. Kalimat *kembali* bertugas menjawab "hari ini aku ngapain?" — dipakai berulang, di dalam aplikasi. Satu kalimat tidak bisa memikul dua tugas sekaligus.

**2. Nada menenangkan, isi serius.**
Pengguna adalah siswa kelas 12 yang sudah cemas tanpa bantuan aplikasi. Teks yang menakut-nakuti akan bekerja selama dua minggu, lalu aplikasinya dihapus persis di bulan paling genting. Tenggat boleh ditampilkan; tenggat tidak boleh dijadikan alat tekanan.

**3. Jangan menyalahkan sekolah.**
Bingkai masalahnya adalah *informasi yang tersebar dan tidak dirangkum*, bukan *sekolah yang lalai*. Selain lebih jujur, ini juga menjaga hubungan dengan guru dan BK — pihak yang dibutuhkan tim untuk data dan penyebaran.

**4. Janji kecil yang ditepati mengalahkan janji besar.**
"Tahu harus ngapain hari ini" bisa ditepati setiap hari. "Wujudkan mimpimu masuk PTN" tidak bisa ditepati sama sekali.

**Kata yang dihindari:** *raih*, *wujudkan*, *gapai*, *mimpimu*, *jangan sampai menyesal*, *sudah terlambat*, *kalah dari anak SMA*.

---

## 1. Kalimat Masuk (Luar Aplikasi)

Dipakai di: landing page, poster, bio Instagram, slide pitching, badan email.

### 1.1 Kandidat utama

| Kode | Kalimat | Mesin yang dipakai |
|---|---|---|
| **M1** | Anak SMK juga bisa kuliah. Ini caranya. | Bukti + identitas |
| **M2** | Jalur kuliah untuk anak SMK, dijelaskan dari awal. | Kejelasan |
| **M3** | Urutannya biar kami yang mikirin. | Meringankan beban |
| **M4** | Bukan cuma tahu bisa kuliah — tahu langkahnya. | Bukti + navigasi |

> **Rekomendasi:** M1 sebagai kalimat utama, M2 sebagai kalimat pendukung di bawahnya.
> **Wajib diuji** sebelum dikunci — lihat Bagian 9.

### 1.2 Deskripsi pendukung (di bawah kalimat utama)

> SNBP, SNBT, dan TKA hampir selalu dijelaskan dengan contoh anak SMA. LANJUT menyusun ulang penjelasannya untuk siswa SMK — lengkap dengan linimasa, daftar periksa, dan cerita alumni SMK yang sudah lebih dulu lewat jalur ini.

### 1.3 Versi sangat pendek (bio, ikon, watermark)

- Navigasi jalur kuliah untuk anak SMK
- Jalur kuliah, versi anak SMK

---

## 2. Kalimat Kembali (Dalam Aplikasi)

Dipakai di: beranda, notifikasi, layar kosong.

| Kode | Kalimat | Letak |
|---|---|---|
| **K1** | Tahu harus ngapain hari ini. | Beranda |
| **K2** | Maju sedikit, tiap hari. | Beranda alternatif / sesi latihan |
| **K3** | Hari ini ada satu langkah buat kamu. | Notifikasi |

> **Rekomendasi:** K1 sebagai kalimat tetap di beranda. Nadanya kecil, bisa ditepati setiap hari, dan langsung terhubung ke Linimasa serta Daftar Periksa.

---

## 3. Onboarding

**Layar 1 — Pembuka**
> ### Anak SMK juga bisa kuliah.
> Ini caranya, dari awal.

**Layar 2 — Masalah**
> ### Penjelasan yang ada dibuat untuk anak SMA.
> Mapel pendukungnya beda, jadwalnya beda, saranya beda. Kami susun ulang untuk kamu.

**Layar 3 — Yang didapat**
> ### Yang bisa kamu pakai di sini
> — Linimasa: apa yang jatuh tempo, dan kapan
> — Khusus SMK: hal yang berbeda buat kita
> — Cerita alumni: mereka sudah lewat jalan ini
> — Latihan harian: 15 menit, bukan semalam suntuk

**Layar 4 — Ajakan**
> ### Mulai dari mana kamu sekarang.
> Belum tahu mau ke mana pun tidak apa-apa. Nanti kita cari sama-sama.
>
> `[ Mulai ]`

**Pertanyaan pembuka (setelah onboarding)**
> Biar kami bisa menyaring yang perlu kamu lihat saja:
> — Kamu kelas berapa?
> — Sudah ada bayangan prodi? (Boleh dijawab "belum")

---

## 4. Teks Per Halaman

### 4.1 Linimasa

**Judul:** Linimasa
**Kalimat pendamping:** Apa yang jatuh tempo, dan kapan.

- **Tenggat terdekat:** Berikutnya: pendaftaran TKA — tutup 27 September
- **Tenggat terdekat yang belum dimulai:** Berikutnya: pelaksanaan TKA — mulai 26 Oktober
  *(Tahapan yang belum dimulai dihitung ke tanggal mulai; yang sudah berjalan — termasuk pada hari pertamanya — ke tanggal tutup. Berlaku sama di Beranda dan Cek Posisi Gue, LANJUT_021.)*
- **Sesudah lewat:** Sudah lewat. Tenggat berikutnya ada di bawah.
- **Penanda sumber:** Diperbarui dari laman resmi SNPMB · dicek 6 Agustus 2026
  *(Nama lembaga mengikuti `url_sumber` tiap tahapan, mis. "laman resmi Kemendikdasmen" untuk TKA — lihat `LANJUT_App/lib/sumber.ts`.)*

> **Catatan:** hitungan mundur ditampilkan sebagai angka biasa, bukan hitungan detik yang berdetak. Tenggat perlu diketahui, bukan dijadikan tekanan.

### 4.2 Khusus SMK → Jenjang Saya

**Judul:** Khusus SMK
**Kalimat pendamping:** Hal-hal yang memang beda buat kita.

**Pembuka halaman:**
> Sebagian aturan seleksi menganggap semua pendaftar berasal dari SMA. Halaman ini merangkum bagian yang tidak berlaku sama untuk kita — dan apa yang bisa dilakukan.

**LANJUT_App (LANJUT_037) — halaman jadi "Jenjang Saya" (`/jenjang-saya`,
tab "Jenjang" — "Jenjang Saya" terpotong di 360 px; `/khusus-smk` dialihkan). Teks di bawah DRAF, belum
disetujui Khalifa**, kecuali pembuka SMK kelas 12 yang memakai pembuka lama
di atas apa adanya. Isi menurut kelas akun (`components/screens/JenjangSayaScreen.tsx`):

- **Judul:** Jenjang Saya
- **Pendamping kelas 7–9:** Kelas [kelas] SMP: waktunya kenalan sama minat dan bakatmu.
- **Pendamping kelas 10–11:** Kelas [kelas]: mulai kenalan sama jurusan yang kamu incar.
- **Pendamping kelas 12:** Kelas 12: yang perlu kamu siapkan sebelum daftar kuliah.
- **Pendamping tanpa kelas:** Isi kelasmu di Jalur Saya supaya isi halaman ini pas buat kamu.
- **Seksi pintu:** Mulai dari sini
  - Ngobrol Bareng LANJUT — Cerita soal yang kamu suka, nanti dibantu cari arahnya. (kelas 7–9)
  - Gaya Belajar — Kenali cara belajar yang paling nyambung buat kamu. (kelas 7–11)
  - Eksplorasi Tujuan — Intip prodi kuliah: belajar apa dan lulusannya kerja di mana. (kelas 7–11)
  - Pilih Mapel — Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu. (kelas 10–11)
  - Cek Posisi Gue — Lihat kamu lagi di tahap mana dan langkah berikutnya. (kelas 12)
  - Daftar Periksa — Satu per satu, tidak perlu sekaligus. (kelas 12)
- **Kartu kelas 7–9 — SMA, SMK, atau MA?:** Habis SMP, kamu bisa lanjut ke SMA, SMK, atau MA. SMA dan MA lebih banyak belajar teori sebagai bekal kuliah. SMK langsung belajar keahlian lewat praktik dan PKL, dan lulusannya tetap bisa kuliah. Pilih yang paling cocok sama minatmu, bukan cuma ikut teman.
- **Kartu kelas 10–11 — Belum perlu mikirin jadwal daftar:** Jadwal pendaftaran kuliah belum perlu dipikirkan sekarang. Fokus dulu cari jurusan yang cocok, lalu jaga nilai mapel yang mendukungnya.
- **Seksi SMK (kelas 10–12 dengan jenis sekolah SMK, LANJUT_038):** Kalau kamu anak SMK
  - **Pembuka kelas 10–11:** Beberapa hal memang beda buat anak SMK. Yang ini sudah bisa kamu siapkan dari sekarang.
  - **Pembuka kelas 12:** pembuka lama di atas.
- **Butir SMK per kelas:** kelas 12 melihat keenam butir. Kelas 10–11 hanya
  butir tanpa SNBP/PDSS/UTBK/kuota/periode pendaftaran: `portofolio` dan
  `mapel-tka-tidak-ada` (daftar izin di `lib/khususSmk.ts`). Empat butir lain
  disembunyikan, tidak ditulis ulang, supaya tidak ada klaim baru tanpa sumber.
  Kelas 7–9 tidak melihat bagian SMK.
- **Sejak LANJUT_038:** akun punya `jenis_sekolah`, jadi seksi SMK hanya tampil
  untuk siswa SMK. Siswa SMA/MA kelas 10–12 tidak melihatnya.

### 4.3 Cerita Alumni

**Judul:** Cerita Alumni SMK
**Kalimat pendamping:** Mereka sudah lewat jalan ini.

- **Layar kosong:** Cerita pertama sedang kami kumpulkan. Kenal alumni SMK yang tembus PTN? `[ Hubungkan kami ]`
- **Ajakan di akhir cerita:** Kamu juga akan punya cerita seperti ini. Simpan langkahmu di Daftar Periksa.

### 4.4 Daftar Periksa

**Judul:** Daftar Periksa
**Kalimat pendamping:** Satu per satu, tidak perlu sekaligus.

- **Layar kosong:** Belum ada yang dicentang — itu wajar kalau baru mulai. Ambil satu yang paling gampang dulu.
- **Kemajuan:** 3 dari 11 beres. Jalan terus.
- **Selesai semua:** Bagian persiapannya beres. Sisanya tinggal latihan.

**LANJUT_App (LANJUT_034) — butir milik akun, DRAF belum disetujui Khalifa.**
Kalimat butirnya sama dengan PWA dan disusun server (`butir-pribadi.layanan.js`):

- **Dari Pilih Mapel (kategori Pendaftaran, langsung tercentang):** Pilih [mapel] & [mapel] sebagai mapel TKA — untuk [nama prodi]
- **Dari Eksplorasi Tujuan (kategori Riset Kampus, belum tercentang):** Cari tahu lebih lanjut soal [nama prodi]
- **Tombol di butir milik akun:** Hapus
- **Galat centang/hapus:** Perubahan terakhir belum tersimpan. Coba lagi. (sebelumnya "Centang terakhir belum tersimpan. Coba lagi.", diganti karena kini juga berlaku untuk hapus)

### 4.5 Arsip Belajar

**Judul:** Arsip Belajar
**Kalimat pendamping:** Yang kamu simpan hari ini, kepakai nanti.

- **Layar kosong:** Belum ada kartu. Mulai dari satu saja — catatan hari ini juga boleh.
- **Untuk kelas 10–11:** Kelas 12 nanti tidak akan sempat mengulang semuanya dari nol. Yang kamu tabung sekarang, itu yang dipakai nanti.
- **Penanda kartu pengguna (tetap, tidak bisa disembunyikan):** Diunggah pengguna — belum diverifikasi tim.

### 4.6 Bank Soal

**Judul:** Bank Soal
**Kalimat pendamping:** Soal dari mitra, terbuka untuk semua.

- **Penanda mitra (wajib tampil):** Disediakan oleh [nama mitra] — soal dan pembahasan menjadi tanggung jawab penyedia.
- **Layar kosong:** Belum ada mitra yang bergabung. Sementara ini, latihan bisa dijalankan dari Arsip Belajar kamu sendiri.

### 4.7 Sesi Latihan Harian

**Judul:** Latihan Hari Ini
**Kalimat pendamping:** 15 menit cukup.

- **Sebelum mulai:** 12 kartu, kira-kira 8 menit. `[ Mulai ]`
- **Sesudah selesai:** Beres. 9 benar dari 12. Yang salah akan muncul lagi lusa.
- **Setelah bolong beberapa hari:** Sempat berhenti beberapa hari — tidak apa-apa. Kartunya masih di sini. `[ Lanjut ]`
- **Ketika waktu mepet:** Lagi padat? Ambil 5 kartu saja. Lebih baik sedikit daripada tidak sama sekali.

### 4.8 Level-In / kalibrasi (nama internal — "Level-In" tidak pernah tampil di layar)

Ditulis lebih dulu sesuai SDD-LevelIn.md §7.7, sebelum satu baris kode UI-nya
dibuat. Padanan istilah kode → layar mengikuti tabel yang sama di §7.7:
`overconfident` → "yakin tapi meleset", `underconfident` → "ternyata bisa",
`selaras` → "perkiraanmu pas", `belum_cukup_data` → "belum cukup data".

**Pemilih keyakinan (`latihan.html`, sebelum jawaban dibuka):**

- **Pertanyaan pemicu (dikunci PRD):** Seberapa yakin kamu bisa jawab ini?
- **Arti tiap tingkat**, ditampilkan sebagai satu baris terpisah di bawah barisan chip, mengikuti pilihan:
  1. Ragu banget
  2. Ragu
  3. Lumayan yakin
  4. Yakin
  5. Yakin banget
- **Petunjuk saat "Lihat jawaban" ditekan sebelum memilih:** Pilih dulu seberapa yakin kamu, baru jawabannya kelihatan.

**Strip pembanding gap (`latihan.html`, muncul otomatis di kartu berikutnya — dan di `latihan-selesai.html` untuk kartu terakhir sesi):**

- **`overconfident` (yakin tapi meleset):** Kamu pilih yakin [tingkat]/5, tapi jawabannya meleset. Ini bagian dari pola kamu di [mapel] — coba pelan-pelan lagi di sini.
- **`underconfident` (ternyata bisa):** Kamu pilih ragu [tingkat]/5, ternyata jawabannya benar. Kamu bisa lebih dari yang kamu kira.
- **`selaras` (perkiraanmu pas):** Perkiraanmu pas — [tingkat]/5 dan hasilnya sesuai.
- **`netral`:** Keyakinanmu ada di tengah. Tetap dihitung, lanjut ke kartu berikutnya.

**Ringkasan kalibrasi akhir sesi (`latihan-selesai.html`, tampil penuh — gratis untuk semua pengguna, SDD §10.1):**

- **Judul:** Ringkasan Kalibrasi
- **Isi:** Yakin tapi meleset: [n] soal. Ternyata bisa: [n] soal.
- **Keadaan kosong (dibuka tanpa sesi berjalan):** Sesi latihan ini sudah tidak ada datanya. Mulai sesi baru dari Arsip Belajar. `[ Ke Arsip Belajar ]`

**Kartu CTA "Latihan Hari Ini" (`beranda.html`, lima varian §6.1f):**

- **`saran`:** [Mapel] kelihatannya masih perlu dilatih lagi — beberapa jawabanmu yakin, tapi meleset. `[ Mulai ]`
- **`kalibrasi_selaras`:** Waktunya latihan lagi. Kartu-kartumu sudah menunggu. `[ Mulai ]`
- **`belum_cukup_data`:** Belum cukup data buat menyimpulkan polamu. Latihan sedikit lagi biar kelihatan. `[ Mulai ]`
- **`pengguna_baru`:** Belum pernah latihan di sini. Mulai dari beberapa kartu dulu. `[ Mulai ]`
- **`arsip_kosong`:** Arsip belajarmu masih kosong. Isi dulu satu kartu sebelum mulai latihan. `[ Buka Arsip Belajar ]`

**Penanda status kalibrasi per mapel (`arsip.html`, opsional — menunggu keputusan §10.2 no. 3, belum dirender di v1):**

- **Belum cukup data:** Belum cukup data.
- **Selaras:** Perkiraanmu pas.
- **Sering yakin tapi meleset:** Sering yakin tapi meleset.

### 4.9 Eksplorasi Tujuan

Ditulis sesuai SDD-F10-eksplorasi-tujuan.md §F.3, sebelum markup
`eksplorasi-tujuan.html` dibuat — DoD PRD §15 mewajibkan teks berasal dari
dokumen ini, bukan dikarang ulang di kode.

**Eyebrow:** Eksplorasi Tujuan

**Judul seksi:** Yang akan kamu pelajari · Ke mana lulusannya · Kampus yang cocok

**Label metrik:** Pendaftar · Diterima dari pendaftar

- **Saat rasio tidak bisa dihitung:** Angka diterima belum tersedia.
- **Disclaimer (wajib tampil, tidak boleh disembunyikan di balik tautan):** Data ini rangkuman dari SNPMB/BAN-PT, bisa berubah. Cek laman resmi untuk info terkini.
- **Tombol:** Simpan ke Daftar Periksa → setelah ditekan: Sudah masuk Daftar Periksa. `[ Lihat Daftar Periksa ]`
- **Fallback judul:** Profil lengkap untuk prodi ini belum kami siapkan.
- **Fallback isi:** Yang sudah tersedia:
- **Seksi kosong (per kelompok data, mis. mata kuliah kosong):** Bagian ini masih kami siapkan.
- **Luring:** Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat.
- **CTA di `pilih-mapel.html`:** Lihat prospek & kampus untuk [nama prodi], dengan baris kecil: Peminat, mata kuliah, dan kampus yang cocok.

**LANJUT_App (LANJUT_031) — tambahan, DRAF belum disetujui Khalifa.** Expo
hanya menampilkan profil yang sudah ditandai lewat `verifikasi-konten`, jadi
butuh satu keadaan yang tidak ada di PWA (pola sama dengan Beranda "Tanggal
resminya sedang kami cek."):

- **Belum ada profil terverifikasi — judul:** Profil prodi sedang kami cek.
- **Belum ada profil terverifikasi — isi:** Peminat, mata kuliah, dan kampus tiap prodi baru tampil di sini setelah dicek ke sumber resmi. Sementara itu, mapel yang dibutuhkan sudah bisa kamu lihat di Pilih Mapel.
- **Tombol:** Kembali ke Pilih Mapel · di bawah profil: Lihat prodi lain
- **Lencana SMK:** Relevan untuk RPL/TKJ/Teknik (dari SDD-F10 §F.2)
- **Baris sumber peminat:** Sumber: SNPMB [jalur] [tahun], [kampus] — nama kampus disebut karena angka pendaftar adalah angka satu kampus, bukan nasional.
- Tombol **Simpan ke Daftar Periksa** ada di Expo sejak LANJUT_034, memakai teks PWA di atas (butir milik akun; lihat §4.4).

### 4.10 Daftar (buat akun)

Berlaku untuk **LANJUT_App** (layar Daftar Expo, `RegisterScreen`). Belum
dipakai di `MVP-PWA/daftar.html`.

- **Keterangan data pribadi (di bawah tombol Daftar):** Kami menyimpan nama pengguna, nama tampilan, email (kalau kamu isi), kelas, prodi impian, dan centang Daftar Periksamu untuk menjalankan LANJUT, yaitu menampilkan jalur dan kemajuanmu.

> **Status:** disetujui Khalifa, 28 Sep 2026 (LANJUT_025). Dipakai **persis
> apa adanya**: jangan dipersingkat, jangan ditambah janji ("tidak
> dibagikan", "aman", "terenkripsi") atau klaim hukum. Kalimat ini sengaja
> hanya menyebut yang memang dilakukan app sekarang.
>
> **Tinjau ulang** bila ada fitur AI, analitik, atau perubahan penyimpanan
> data — kalimat ini akan menjadi tidak lengkap.

**LANJUT_035 — medan Kelas (wajib), DRAF belum disetujui Khalifa:**

- **Label:** Kelas · **petunjuk:** SMP kelas 7–9, SMA/SMK kelas 10–12. · **pilihan:** Kelas 7 … Kelas 12
- **Galat:** Pilih kelasmu.

**LANJUT_038 — medan Jenis sekolah, DRAF belum disetujui Khalifa.** Hanya
muncul (dan wajib) bila kelas yang dipilih 10–12; kelas 7–9 tidak ditanya
(server mengisi SMP).

- **Label:** Jenis sekolah · **pilihan:** SMA · SMK · MA (Madrasah Aliyah)
- **Galat:** Pilih jenis sekolahmu.
- **Jalur Saya:** baris "Sekolah" di kartu; medan yang sama di form Ubah, hanya untuk kelas 10–12.

### 4.11 Bukan kelas 12 (placeholder sementara)

**LANJUT_035 — DRAF belum disetujui Khalifa.** Linimasa (bagian tenggat &
tahapan), Daftar Periksa, dan Cek Posisi berisi SNBP/SNBT/TKA, jadi hanya
tampil untuk kelas 12. Kelas 7–11 dan akun tanpa kelas melihat placeholder
ini sampai konten per jenjang didesain (`components/screens/KhususKelas12.tsx`).

- **Kelas 7–11 — judul:** Bagian ini untuk kelas 12.
- **Kelas 7–11 — isi:** Isinya jadwal dan persiapan SNBP, SNBT, dan TKA. Versi untuk kelas [kelas] sedang kami siapkan.
- **Kelas 7–11 — tombol:** Buka Jenjang Saya (sebelum LANJUT_037: Buka Khusus SMK)
- **Kelas kosong — judul:** Isi kelasmu dulu.
- **Kelas kosong — isi:** Isi bagian ini menyesuaikan kelasmu. Isi kelas di Jalur Saya, ya.
- **Kelas kosong — tombol:** Isi kelas di Jalur Saya · Buka Jenjang Saya
- **Jalur Saya, kartu Kemajuan:** Kemajuan persiapan SNBP, SNBT, dan TKA tampil di sini saat kamu kelas 12.

Sejak LANJUT_036, akun tanpa kelas tertahan di gerbang §4.12 dulu, jadi
keadaan "Kelas kosong" di atas hanya jaring pengaman.

### 4.12 Gerbang wajib isi kelas

**LANJUT_036 — DRAF belum disetujui Khalifa.** Muncul untuk akun lama yang
belum punya kelas, menggantikan seluruh app sampai kelas disimpan
(`components/screens/IsiKelasScreen.tsx`).

- **Judul:** Kamu kelas berapa sekarang?
- **Pengantar:** Isi sekali ini saja supaya LANJUT menampilkan yang sesuai buat kamu. Nanti bisa diubah di Jalur Saya.
- **Medan:** Kelas · petunjuk: SMP kelas 7–9, SMA/SMK kelas 10–12. · galat: Pilih kelasmu.
- **Bila kelas pernah dipilih di Daftar Periksa (perangkat ini):** Terpilih dari pilihanmu sebelumnya di Daftar Periksa. Cek lagi sebelum menyimpan.
- **Tombol:** Simpan dan lanjut (proses: Menyimpan…) · Buka Jalur Saya · Keluar

**Langkah 2 — jenis sekolah (LANJUT_038), DRAF.** Untuk kelas 10–12 yang
belum memilih jenis sekolah; muncul sesudah langkah kelas, tidak pernah
satu layar dengannya. Kelas 7–9 tidak pernah melihatnya.

- **Judul:** Kamu sekolah di mana?
- **Pengantar:** Kelas [kelas]: pilih jenis sekolahmu supaya isi LANJUT pas buat kamu. Nanti bisa diubah di Jalur Saya.
- **Medan:** Jenis sekolah · pilihan: SMA · SMK · MA (Madrasah Aliyah) · galat: Pilih jenis sekolahmu.
- **Tombol:** sama dengan langkah 1.

---

## 5. Notifikasi

Kaidah: maksimal satu notifikasi per hari, isinya selalu satu tindakan konkret, dan tidak pernah mengandung rasa bersalah.

| Situasi | Teks |
|---|---|
| Latihan harian | Latihan hari ini siap — 12 kartu, 8 menit. |
| Tenggat mendekat (H-7) | Pendaftaran TKA tutup minggu depan. Cek berkasmu. |
| Tenggat mendekat (H-1) | Besok hari terakhir pendaftaran TKA. |
| Cerita alumni baru | Ada cerita baru dari alumni RPL yang masuk Telkom University. |
| Kembali setelah lama | Kartu latihanmu masih tersimpan. Mau lanjut dari yang kemarin? |

**Yang tidak akan pernah dikirim:** "Kamu sudah 5 hari tidak belajar", "Temanmu sudah lebih dulu", "Jangan sampai menyesal", atau bentuk apa pun yang menuduh.

---

## 6. Layar Kosong Umum

- **Belum ada koneksi internet:** Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat.
- **Belum ada data:** Bagian ini masih kami siapkan. Kalau kamu punya bahannya, kirim ke kami.
- **Halaman tidak ditemukan:** Halamannya tidak ketemu. Balik ke Linimasa? `[ Kembali ]`

---

## 7. Teks untuk Dibagikan

Diuji dengan satu pertanyaan: **apakah ada siswa yang mau mengirim ini ke temannya?** Kalau tidak ada, teksnya benar tapi mati.

- Linimasa TKA/SNBP/SNBT versi anak SMK. Gratis. → lanjut.app
- Ternyata nilai mapel pendukung itu ngaruh ke SNBP. Aku baru tahu dari sini.
- Alumni SMK yang tembus PTN cerita gimana caranya. Bukan teori.

---

## 8. Teks untuk Pitching

**Satu kalimat:**
> LANJUT adalah navigasi jalur kuliah untuk siswa SMK — segmen yang selama ini dijelaskan memakai contoh anak SMA.

**Kalimat masalah:**
> Tujuan SMK adalah Bekerja, Melanjutkan, Wirausaha. Tapi pendampingan yang tersedia hampir seluruhnya untuk jalur "Bekerja".

**Kalimat pembeda:**
> Kami bukan menjual lebih banyak materi. Kami menjual keputusan belajar yang benar — untuk siswa yang waktunya paling sedikit.

---

## 9. Yang Wajib Diuji Sebelum Dikunci

Teks tidak dimenangkan lewat perdebatan di rapat.

| Yang diuji | Cara | Ambang lolos |
|---|---|---|
| Kalimat masuk (M1 vs M2 vs M3) | Tiga polling terpisah di grup angkatan / story | Satu kalimat unggul jelas, bukan seri |
| Kalimat kembali (K1 vs K2) | Uji pada layar beranda purwarupa | Pengguna bisa menyebut ulang isinya setelah melihat sekali |
| Teks bagikan | Sebar ke 10 orang | Minimal 2 orang meneruskannya tanpa diminta |
| Nada notifikasi | Tanya langsung ke 5 pengguna awal | Tidak ada yang menyebut kata "nyuruh", "maksa", atau "bikin panik" |

---

## 10. Yang Belum Diputuskan

1. **Sapaan: "kamu" atau "kalian"?** Dokumen ini konsisten memakai *kamu* (satu orang, lebih dekat). Perlu dikunci resmi.
2. **Nama fitur: "Latihan Hari Ini" atau "Sesi Latihan"?** Yang pertama lebih memicu kebiasaan; yang kedua lebih netral untuk pemakaian tidak harian.
3. **Alamat domain final** — seluruh teks bagikan di Bagian 7 memakai `lanjut.app` sebagai contoh sementara.
4. **Apakah hitungan mundur ditampilkan di beranda atau hanya di Linimasa** — menyangkut kaidah nomor 2 di Bagian 0.
