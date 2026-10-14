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
  *(Tahapan yang belum dimulai dihitung ke tanggal mulai; yang sudah berjalan — termasuk pada hari pertamanya — ke tanggal tutup. Berlaku sama di Beranda dan Jalur Saya `/cek-posisi`, LANJUT_021.)*
- **Sesudah lewat:** Sudah lewat. Tenggat berikutnya ada di bawah.
- **Penanda sumber:** Diperbarui dari laman resmi SNPMB · dicek 6 Agustus 2026
  *(Nama lembaga mengikuti `url_sumber` tiap tahapan, mis. "laman resmi Kemendikdasmen" untuk TKA — lihat `LANJUT_App/lib/sumber.ts`.)*

> **Catatan:** hitungan mundur ditampilkan sebagai angka biasa, bukan hitungan detik yang berdetak. Tenggat perlu diketahui, bukan dijadikan tekanan.

**LANJUT_App (LANJUT_065) — Beranda: Kartu "Mulai dari Sini", Progres Sederhana, dan Grid Menu (draf LANJUT_065, belum disetujui Khalifa):**

- **Kartu "Mulai dari Sini" (tampil untuk akun baru / belum ada kemajuan):**
  - **SMP (kelas 7–9):**
    - Judul: Mulai dari Sini
    - Penjelas: Kenali minat, cara belajar, dan pilihan jenjang berikutnya pelan-pelan.
    - Tombol: Buka Jenjang Saya (ke `/jenjang-saya`)
  - **Kelas 10–11:**
    - Judul: Mulai dari Sini
    - Penjelas: Lihat mata pelajaran pendukung yang cocok untuk jurusan incaranmu.
    - Tombol: Pilih Mapel (ke `/pilih-mapel`)
  - **Kelas 12:**
    - Judul: Mulai dari Sini
    - Penjelas: Cek posisi persiapanmu sekarang dan langkah yang perlu diambil.
    - Tombol: Jalur Saya (ke `/cek-posisi`; nama sejak LANJUT_074)
  - **Tanpa kelas / umum:**
    - Judul: Mulai dari Sini
    - Penjelas: Mulai kenali pilihan jenjang dan arah langkahmu.
    - Tombol: Buka Jenjang Saya (ke `/jenjang-saya`)

- **Progres Sederhana (draf LANJUT_067, belum disetujui Khalifa):**
  - Format: `[X] dari [Y] langkah selesai` (misal: "0 dari 3 langkah selesai")
  - Total langkah: 3 (langkah `isi_kelas` dihapus di LANJUT_067 karena pengguna baru wajib mengisi kelas saat onboarding, sehingga selalu mulai dari 1 dari 4 dan menyesatkan).
  - Langkah yang dihitung (3 langkah dari data server yang benar-benar bisa diubah oleh pengguna):
    1. Isi prodi impian (`pengguna.prodi_impian`)
    2. Centang Daftar Periksa (minimal 1 butir tercentang di `/kemajuan` **atau** di butir pribadi `/butir-pribadi`, sejak LANJUT_070. Siswa kelas 7–11 hanya mencentang butir pribadi.)
    3. Coba Latihan (minimal 1 sesi di `/sesi-latihan`)
  - *Catatan LANJUT_070:* hanya definisi langkah yang berubah; bunyi teks progres tetap. Aturan yang sama menentukan kartu "Mulai dari Sini" (hilang bila ada centang, latihan, atau kartu).
  - *Catatan:* Langkah "buka Arsip" tidak dihitung karena server tidak memiliki pencatatan telemetri pembukaan layar.

- **Grid Menu Launcher (label pendek):**
  - Eksplorasi Kampus (`/eksplorasi-tujuan`; dulu "Eksplorasi Tujuan", LANJUT_075)
  - Gaya Belajar
  - Arsip Belajar
  - Level-In
  - ~~Ngobrol Bareng~~ — dihapus dari grid semua jenjang sejak LANJUT_075b (Ngobrol ada di tab tengah navigasi)
  - Cerita Alumni
  - Jalur Saya (`/cek-posisi`; nama sejak LANJUT_074)
  - Pilih Mapel
  - Daftar Periksa

- **Kartu "Info Penting" dari Data Terverifikasi (draf LANJUT_066, belum disetujui Khalifa):**
  - **Seksi Judul:** Info Penting
  - **Tampilan kartu (maksimal 3 kartu, diurutkan tanggal terdekat):**
    - Judul tahapan (misal: "Pelaksanaan TKA")
    - Tanggal / Rentang tanggal (misal: "26 Oktober – 8 November 2026")
    - Label Sumber: `Sumber: [nama lembaga sumber]` (misal: "Sumber: laman resmi Kemendikdasmen")
    - Tanggal Periksa: `Diperiksa pada [tanggal]` (misal: "Diperiksa pada 27 September 2026")
    - Tautan Sumber: `Buka sumber resmi ↗` (tautan langsung ke `url_sumber`)
  - **Aturan keterlihatan:** Hanya kartu dengan `status_verifikasi = terverifikasi` yang tampil. Bila tidak ada data terverifikasi yang relevan, seksi ini hilang sama sekali (tanpa kartu kosong atau teks "belum ada info").

**LANJUT_App (LANJUT_072) — Sapaan Beranda. DRAF, belum disetujui Khalifa.** Tampil paling
atas Beranda (`lib/beranda.ts` `teksSapaan`); nama panjang dipotong di baris kedua dengan "…".
Urutan Beranda yang dulu ditetapkan di sini (susunan "berkelompok" LANJUT_072) sudah diganti
LANJUT_074 — lihat blok LANJUT_074 di bawah. Bunyi sapaan tetap.

- **Sapaan:** Halo, [nama tampilan] (bila nama tampilan kosong: Halo, [nama pengguna]; bila keduanya kosong: Halo, tanpa koma)

**LANJUT_App (LANJUT_072b) — Info Penting tanpa tahapan yang sudah lewat. DRAF, belum
disetujui Khalifa.** Info Penting di Beranda tidak menampilkan tahapan yang tanggal selesainya
sudah lewat menurut tanggal hari ini di Asia/Jakarta (WIB). Tahapan yang selesai hari ini tetap
tampil sampai akhir hari; tahapan tanpa tanggal selesai tetap tampil walau tanggal mulainya
sudah lewat. Kartu tenggat (sejak LANJUT_074 kartu hero) dan Jalur Saya `/cek-posisi` memakai "hari ini" yang sama (`hariIniWib` di
`lib/linimasa.ts`). Data tidak dihapus. Bila tidak ada data terverifikasi sama sekali, seksi
tetap hilang (aturan LANJUT_066); kalimat di bawah hanya tampil bila semua tahapan
terverifikasi sudah lewat, di bawah judul seksi "Info Penting".

- **Info Penting kosong (semua tahapan terverifikasi sudah lewat):** Belum ada info penting untuk saat ini.

**LANJUT_App (LANJUT_073) — Banner Beranda. DRAF, belum disetujui Khalifa.** Banner
pengumuman dari `server/config/banner-beranda.json` lewat `GET /api/v1/konten/banner`. Sejak
LANJUT_074 tampil sebagai carousel: paling banyak tiga banner terverifikasi yang berlaku hari
ini (WIB), `tanggal_mulai` paling baru dulu, digeser ke samping, dengan titik penanda bila
lebih dari satu; letaknya di bawah Info Penting (kelas 12) atau di bawah grid (kelas lain).
Di LANJUT_073 hanya satu kartu, tepat di bawah sapaan. Judul, isi, dan nama sumber berasal
dari berkas itu (dikurasi tim, bukan berita dari internet) dan wajib dicek manusia ke sumber
resmi sebelum `status_verifikasi` diubah menjadi `terverifikasi`. Tanpa banner, atau bila
endpoint gagal, carousel tidak tampil sama sekali, tanpa teks pengganti. Tidak ada judul
seksi dan tidak ada tombol tutup. Kartu tidak bisa ditekan; hanya tautan sumber.

- **Banner — label sumber:** Sumber: [sumber] (tautan ke `url_sumber`, satu-satunya bagian banner yang bisa ditekan; sama di tiap kartu carousel)

**LANJUT_App (LANJUT_074) — Beranda gaya hero, tab bar lima tab, nama "Jalur Saya" dan
"Data Akun". DRAF, belum disetujui Khalifa.** Urutan Beranda dari atas (keputusan Khalifa
di LANJUT_074, `lib/beranda.ts` `urutanBeranda`): sapaan, kartu hero tenggat (kelas 12),
baris progres, grid menu, Info Penting (kelas 12), carousel banner. Kalimat K1 dan kartu
"Mulai dari Sini" (akun baru) tidak disebut di task, jadi ditaruh paling bawah dengan urutan
lama (pilihan di percakapan, belum disetujui PM). Kartu hero memakai teks kartu tenggat yang
sama ("[n] hari" · "menuju [tahapan] dimulai/ditutup, [tanggal].") tanpa teks baru; selama
memuat atau bila gagal, kartu tidak tampil, tanpa pesan. Sapaan dan kartu hero menyatu
dengan app bar dalam satu kepala bergradasi warna kartu tenggat lama (blue200 → blue300,
teks gelap), seperti header GoPay; bagian lain ada di lembar putih bersudut bulat di
bawahnya (pilihan di percakapan, belum disetujui PM). Carousel tanpa judul seksi. Teks
yang menunjuk ke halaman akun ikut diganti di butir masing-masing (§4.2, §4.10–§4.14),
kecuali isi kebijakan privasi (`lib/kebijakan-privasi.json`) yang menunggu review hukum.

- **Tab tengah — label:** Ngobrol (tab ketiga dari lima, di antara Jenjang Saya dan Pilih Mapel; lingkaran lebih besar berisi huruf "L" sampai aset ikon kelinci dari Khalifa tersedia; membuka Ngobrol Bareng LANJUT)
- **Nama fitur `/cek-posisi`:** Jalur Saya (judul bilah halaman dan kartu pintu di Data Akun, serta — khusus kelas 12 — label grid Beranda, tombol kartu "Mulai dari Sini", dan pintu Jenjang Saya; menggantikan nama lama). Sejak LANJUT_077b kartu pintu Data Akun tidak tampil untuk kelas 7–9.
- **Nama halaman akun `/akun`:** Data Akun (judul bilah halaman dan judul bagian di kartu akun; isi bagiannya tidak berubah)
- **Data Akun — judul form ubah:** Ubah Data Akun

### 4.2 Khusus SMK → Jenjang Saya

**Judul:** Khusus SMK
**Kalimat pendamping:** Hal-hal yang memang beda buat kita.

**Pembuka halaman:**
> Sebagian aturan seleksi menganggap semua pendaftar berasal dari SMA. Halaman ini merangkum bagian yang tidak berlaku sama untuk kita — dan apa yang bisa dilakukan.

**LANJUT_App (LANJUT_037, LANJUT_064) — halaman jadi "Jenjang Saya" (`/jenjang-saya`,
tab "Jenjang Saya" — draf LANJUT_064, sebelumnya "Jenjang"; `/khusus-smk` dialihkan). Teks di bawah DRAF, belum
disetujui Khalifa**, kecuali pembuka SMK kelas 12 yang memakai pembuka lama
di atas apa adanya. Isi menurut kelas akun (`components/screens/JenjangSayaScreen.tsx`,
sejak LANJUT_069 `lib/jenjangSaya.ts`). Sejak LANJUT_069, kartu pembuka, pintu, dan
kartu catatan kelas 7–9 dan 10–11 memakai blok LANJUT_069 di bawah; pintu dan kartu
lama 037 untuk kedua kelompok itu (Gaya Belajar, kartu "SMA, SMK, atau MA?" lama,
kartu "Belum perlu mikirin jadwal daftar") tidak dipakai lagi dan dihapus dari daftar ini:

- **Judul:** Jenjang Saya
- **Pendamping kelas 7–9:** Kelas [kelas] SMP: waktunya kenalan sama minat dan bakatmu.
- **Pendamping kelas 10–11:** Kelas [kelas]: mulai kenalan sama jurusan yang kamu incar.
- **Pendamping kelas 12:** Kelas 12: yang perlu kamu siapkan sebelum daftar kuliah.
- **Pendamping tanpa kelas:** Isi kelasmu di Data Akun supaya isi halaman ini pas buat kamu.
- **Seksi pintu:** Mulai dari sini
  - Ngobrol Bareng LANJUT — Cerita soal yang kamu suka, nanti dibantu cari arahnya. (tanpa kelas)
  - Eksplorasi Tujuan — Intip prodi kuliah: belajar apa dan lulusannya kerja di mana. (tanpa kelas)
  - Pilih Mapel — Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu. (tanpa kelas)
  - Jalur Saya — Lihat kamu lagi di tahap mana dan langkah berikutnya. (kelas 12; nama sejak LANJUT_074)
  - Daftar Periksa — Satu per satu, tidak perlu sekaligus. (kelas 12)
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

**LANJUT_App (LANJUT_069) — isi Jenjang Saya kelas 7–9 dan 10–11. DRAF, belum disetujui Khalifa**
dan belum ditinjau tim konten. Teks dari `docs/DRAF-Konten-Jenjang-Saya-SMP-dan-10-11.md`
(A1–A5, B1–B6) dan keputusan PM di `docs/Tambahan-069-Keputusan-PM.md`; isi di
`lib/jenjangSaya.ts`. Urutan di layar: pengantar 037, kartu pembuka, seksi "Mulai dari
sini" (kartu pintu), lalu kartu catatan. Kartu pintu tidak punya tombol teks "Buka":
seluruh kartu adalah tautan dengan ikon panah (`KartuPintu`). Kelas 12 dan akun tanpa
kelas tidak berubah.

- **A1 Kartu pembuka kelas 7–9:** judul "Kamu lagi di tahap mana?" · teks "Sebelum memilih apa pun, kenali dulu dirimu. LANJUT bisa membantu kamu mulai dari hal yang paling dekat: minat dan cara belajarmu." · tombol "Mulai eksplorasi" (ke `/gaya-belajar`) — catatan LANJUT_071: tujuan tombol diubah dari `/eksplorasi-tujuan` ke Gaya Belajar (keputusan PM) karena Gaya Belajar tidak bergantung pada profil prodi yang belum terverifikasi; bunyi tombol tetap, dan Eksplorasi Tujuan tetap terbuka dari pintu A2.
- **A2 Pintu Eksplorasi Tujuan kelas 7–9:** judul "Eksplorasi Tujuan" · teks "Coba cari tahu apa yang kamu suka, lalu lihat bidang apa saja yang bisa dipelajari dari situ."
- **A3 Pintu Gaya Belajar kelas 7–9:** judul "Gaya Belajar" · teks "Setiap orang belajar dengan cara yang berbeda. Kenali caramu supaya belajar terasa lebih mudah."
- **A4 Kartu catatan kelas 7–9:** judul "SMA, SMK, atau MA?" · teks "Ketiganya adalah jenjang setelah SMP, dengan fokus yang berbeda." · "SMA (Sekolah Menengah Atas): pendidikan umum dengan banyak pilihan mata pelajaran." · "SMK (Sekolah Menengah Kejuruan): pendidikan umum sekaligus keterampilan untuk bidang kerja tertentu." · "MA (Madrasah Aliyah): pendidikan umum dengan muatan keagamaan yang lebih kuat." · catatan "Keterangan ini sedang kami cek ulang." (Tambahan-069 no. 4)
- **A5 Pintu Ngobrol kelas 7–9:** judul "Ngobrol Bareng LANJUT" · teks "Tanya apa saja tentang minat, cara belajar, atau rencana sekolahmu. Fitur ini butuh persetujuan orang tua/wali dulu." (gerbang persetujuan tetap di layar Ngobrol dan di server)
- **B1 Kartu pembuka kelas 10–11:** judul "Yuk, siapkan langkahmu" · teks "Kelas 10 dan 11 adalah waktu yang tepat untuk mulai memilih mata pelajaran dan memahami jalur masuk perguruan tinggi." · tombol "Pilih mapel" (ke `/pilih-mapel`)
- **B2 Pintu Pilih Mapel kelas 10–11:** judul "Pilih Mapel" · teks "Pilihan mata pelajaranmu bisa membuka beberapa bidang studi. Coba lihat mana yang paling dekat dengan minatmu."
- **B3 Pintu Eksplorasi Tujuan kelas 10–11:** judul "Eksplorasi Tujuan" · teks "Lihat gambaran program studi dan profesi yang berkaitan dengan minatmu. Informasi ini masih dalam tahap pengecekan." (label "Perkiraan" tetap hanya di layar Eksplorasi Tujuan, Tambahan-069 no. 3)
- **B4 Pintu Arsip Belajar kelas 10–11:** judul "Arsip Belajar" · teks "Simpan catatan dan soal latihanmu per mata pelajaran."
- **B5 Pintu Level-In kelas 10–11:** judul "Level-In" · teks "Lihat seberapa kuat kamu di tiap mata pelajaran, dari latihanmu."
- **B6 Pintu Daftar Periksa kelas 10–11:** judul "Daftar Periksa" · teks "Catat langkah-langkahmu supaya tidak ada yang terlewat."
- **Daftar Periksa kelas 10–11, pengganti pesan "Bagian ini untuk kelas 12":** "Catat langkah-langkahmu supaya tidak ada yang terlewat." (Tambahan-069 no. 2; butir pribadi tetap tampil di bawahnya)

### 4.3 Cerita Alumni

**Judul:** Cerita Alumni (draf LANJUT_064, dinetralkan untuk semua jenjang dari sebelumnya "Cerita Alumni SMK")  
**Kalimat pendamping:** Mereka sudah lewat jalan ini.

- **Layar kosong:** Cerita pertama sedang kami kumpulkan. Kenal alumni SMK yang tembus PTN? `[ Hubungkan kami ]`
- **Ajakan di akhir cerita:** Kamu juga akan punya cerita seperti ini. Simpan langkahmu di Daftar Periksa.

### 4.4 Daftar Periksa

**Judul:** Daftar Periksa  
**Label tab:** Daftar Periksa (LANJUT_064, menggantikan "Checklist" di tab bar agar konsisten)  
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

*Catatan LANJUT_071 (keputusan PM, tanpa teks baru):* opsi Pilih Mapel "Masih belum tahu,
tampilkan rangkuman umum" disembunyikan untuk kelas 10–11, karena "Simpan ke Daftar Periksa"
di rangkuman umum mencentang butir umum `mapel-tka` yang hanya dipakai kelas 12. Kelas 12
(dan kelas lain) tetap melihatnya. Server ikut menolak centang `mapel-tka` dari akun kelas
10–11 (404 `TIDAK_DITEMUKAN`, kode yang sudah dipakai rute itu). Bunyi teks opsi tidak berubah.

**LANJUT_App (LANJUT_076) — Persiapan Event, sejak LANJUT_076b hanya untuk SMP (kelas
7–9). DRAF, belum disetujui Khalifa.** Teks di `lib/eventSekolah.ts` (`TEKS_EVENT`).
Hanya tampil bila saklar `event_sekolah_aktif` menyala; bawaannya mati, jadi saat ini
tidak ada akun yang melihatnya. Kelas 10–12 tidak pernah melihatnya. Pesan server
"Fitur ini belum aktif." (403 `FITUR_BELUM_AKTIF`) dan "Fitur ini hanya untuk kelas
7–9." (403 `KELAS_TIDAK_DIDUKUNG`) tidak pernah ditampilkan app: layar tidak
menampilkan apa pun. Butir bertanda LANJUT_076b diubah di task itu.

- **Judul seksi:** Persiapan Event
- **Pengantar:** Catat ujian dan ulangan yang akan datang, supaya kamu bisa menyiapkan diri lebih awal. (LANJUT_076b, contoh kalimat PM; sebelumnya "Catat ujian atau ulangan yang akan datang, lengkap dengan mapel dan materinya.")
- **Tombol tambah:** Tambah event
- **Daftar kosong:** Belum ada event yang akan datang.
- **Label isian:** Jenis · Tanggal · Mapel (opsional) · Materi (opsional) · Kartu materi (opsional) (LANJUT_076b; sebelumnya "Kartu Arsip")
- **Pilihan jenis:** UTS · UAS/PAS · Ulangan Harian · TKA · Lainnya — TKA hanya tampil untuk kelas 9 (LANJUT_076b; sebelumnya UTS · UAS · Ulangan · Lainnya). Label yang sama dipakai di kartu event dan kartu Beranda; event lama "UAS" tampil sebagai "UAS/PAS", "Ulangan" sebagai "Ulangan Harian".
- **Petunjuk tanggal:** Contoh: 2026-11-03 (tahun-bulan-tanggal).
- **Petunjuk materi (wajib tampil di layar isian):** Tulis materinya singkat saja. Jangan tulis nama atau data pribadi.
- **Kartu materi kosong:** Belum ada kartu materi untuk pilihan ini. (LANJUT_076b; sebelumnya "Belum ada kartu Arsip untuk pilihan ini.")
- **Tombol isian:** Simpan event · Batal
- **Tombol di tiap event:** Buka materi (hanya bila kartu yang terhubung masih tersedia) · Ubah · Hapus
- **Konfirmasi hapus:** Hapus event ini? Event yang dihapus tidak bisa dikembalikan. · tombol: Ya, hapus · Batal
- **Event yang sudah lewat:** Lihat event yang sudah lewat ([n]) · Sembunyikan event yang sudah lewat · label di kartu event: Sudah lewat
- **Hitung mundur:** Hari ini · [n] hari lagi
- **Galat jenis:** Pilih jenis event.
- **Galat tanggal:** Isi tanggal dengan format tahun-bulan-tanggal, misalnya 2026-11-03. · Tanggal ini tidak ada di kalender. · Tanggal paling jauh 2 tahun dari hari ini.
- **Galat materi:** Materi paling panjang 200 karakter.
- **Galat kartu materi (server menolak, `KARTU_TIDAK_SAH`):** Kartu ini tidak bisa dipakai. Pilih kartu materi lain. (LANJUT_076b; sebelumnya "… Pilih kartu lain dari Arsip-mu.")
- **Gagal menyimpan atau menghapus:** Belum tersimpan. Coba lagi sebentar lagi.
- **Beranda — kartu Persiapan Terdekat:** label: Persiapan Terdekat · isi: [jenis] · [mapel] (mapel hanya bila diisi) · hitung mundur: [n] hari lagi / Hari ini — sejak LANJUT_076b hanya kelas 7–9

**LANJUT_App (LANJUT_076b) — Daftar Periksa SMP tanpa teks kelas 12, dan materi dari
sumber resmi. DRAF, belum disetujui Khalifa.** Halaman Daftar Periksa kelas 7–9 tidak
lagi memuat placeholder §4.11 ("Bagian ini untuk kelas 12. … Versi untuk kelas [kelas]
sedang kami siapkan." dan tombol "Buka Jenjang Saya"); placeholder itu masih dipakai
di layar `/cek-posisi` (Jalur Saya) dan untuk akun tanpa kelas. Kalimat pengganti SMP memakai
kalimat netral LANJUT_069 kelas 10–11 (§4.2), berlaku juga saat saklar mati — pilihan
percakapan, belum disetujui PM. Materi event bisa kartu Arsip milik sendiri atau kartu
kurasi tim yang terverifikasi dengan sumber resmi (`penyedia` + `url_sumber` https).

- **Daftar Periksa SMP — pengganti "Bagian ini untuk kelas 12":** Catat langkah-langkahmu supaya tidak ada yang terlewat.
- **Kartu event — sumber kartu kurasi:** Sumber: [nama sumber]
- **Kartu event — kartu sudah dihapus atau tidak terverifikasi lagi (tanpa tombol Buka materi):** Materi ini sudah tidak tersedia.
- **Kartu event — tombol panel materi kurasi:** Buka materi · Tutup materi (panel berisi judul dan isi kartu kurasi)
- **Isian — pilihan kartu kurasi:** [judul kartu] · Sumber: [nama sumber]

### 4.5 Arsip Belajar

**Judul:** Arsip Belajar
**Kalimat pendamping:** Yang kamu simpan hari ini, kepakai nanti.

- **Layar kosong:** Belum ada kartu. Mulai dari satu saja — catatan hari ini juga boleh.
- **Untuk kelas 10–11:** Kelas 12 nanti tidak akan sempat mengulang semuanya dari nol. Yang kamu tabung sekarang, itu yang dipakai nanti.
- **Penanda kartu pengguna (tetap, tidak bisa disembunyikan):** Diunggah pengguna — belum diverifikasi tim.

**LANJUT_App (LANJUT_039) — DRAF belum disetujui Khalifa**, kecuali judul,
pendamping, layar kosong, dan penanda di atas yang dipakai apa adanya. Label
formulir mengikuti `MVP-PWA/arsip-tambah.html`. Kartu kurasi tim belum
ditampilkan sampai terverifikasi.

- **Pintu di Beranda:** Arsip Belajar — Catatan dan soal buatanmu, disimpan per mapel.
- **Daftar:** tombol Tambah kartu · saringan Semua (n) / [mapel] (n) · lencana [mapel] dan Soal/Catatan (Soal = ada jawaban)
- **Judul halaman (page bar):** Arsip Belajar · Kartu · Tulis Kartu
- **Formulir:** Tambah kartu baru / Ubah kartu · Mapel · Judul (mis. Turunan fungsi aljabar) · Isi (Tulis di sini...) · Jawaban (boleh dikosongkan; Jawaban atau pembahasan singkat...; Isi bila kartunya berbentuk soal.) · Kartu ini akan bertanda Diunggah pengguna — belum diverifikasi tim. · Simpan kartu
- **Galat formulir:** Pilih mapelnya. · Judul belum diisi. · Isi belum diisi.
- **Lihat kartu:** Lihat jawaban · Jawaban · Ubah kartu · Hapus kartu
- **Konfirmasi hapus:** Hapus kartu ini? Kartu yang dihapus tidak bisa dikembalikan dari app. · Batal · Ya, hapus
- **Kartu tidak ditemukan:** Kartu ini tidak ditemukan. · Mungkin sudah dihapus. · Kembali ke Arsip

**LANJUT_049 — Modul (materi unggahan), DRAF belum disetujui Khalifa.**
Bagian "Modul" di bawah kartu di layar Arsip Belajar, halaman satu modul
(`/arsip-modul`), dan formulir unggah (`/arsip-modul-unggah`). Server hanya
menyimpan teks hasil ekstraksi; berkas asli tidak disimpan. Teks ada di
`LANJUT_App/lib/modul.ts`. `[n]`, `[mapel]`, `[tanggal]` = isian; angka batas
dari konfigurasi server.

- **Bagian Modul di Arsip:** Modul · Simpan materi pelajaranmu (.txt, .md, atau PDF berisi teks) supaya mudah dibaca dan dicari lagi. · tombol Unggah modul · kosong: Belum ada modul. Unggah materi pelajaran yang ingin kamu simpan.
- **Daftar modul:** [judul] · lencana [mapel] dan TXT / MD / PDF / Teks tempel · Diunggah [tanggal]
- **Cari di modul:** Cari di modulmu (minimal 3 huruf) · Cari · Hasil di modulmu · kosong: Tidak ada bagian yang cocok. Coba kata lain. · terlalu pendek: Ketik minimal 3 huruf.
- **Hapus semua modul:** Hapus semua modul · Hapus semua modulmu? Teks dan semua potongannya dihapus permanen dan tidak bisa dikembalikan. · Batal · Ya, hapus semua
- **Lihat modul:** Diunggah [tanggal] · [nama berkas] · [n] karakter · Hapus modul · Hapus modul ini? Teksnya dihapus permanen dari LANJUT dan tidak bisa dikembalikan. · Batal · Ya, hapus · galat: Belum terhapus. Coba lagi sebentar lagi.
- **Modul tidak ditemukan:** Modul ini tidak ditemukan. · Mungkin sudah dihapus. · Kembali ke Arsip
- **Peringatan sebelum unggah:** Sebelum mengunggah · Unggah hanya materi pelajaran. · Jangan unggah dokumen berisi data pribadi: nama lengkap, nomor (NIK, NISN, HP), rapor, atau foto identitas. · Unggah hanya materi yang boleh kamu pakai untuk belajar pribadi. · Yang disimpan hanya teksnya, bukan berkas aslinya. Modul bisa kamu hapus permanen kapan saja.
- **Formulir unggah:** judul Unggah modul · pilihan Pilih berkas / Tempel teks · Berkas (petunjuk: .txt, .md, atau PDF yang berisi teks.) · Pilih berkas / Ganti berkas · Teks materi (Tempel teks materi di sini...) · Judul (mis. Fotosintesis bab 2) · Mapel · tombol Unggah modul (proses: Mengunggah…) · pemilih berkas belum ada di versi app: Memilih berkas belum tersedia di versi aplikasi ini. Tempel teksnya saja.
- **Galat formulir:** Pilih mapelnya. · Judul belum diisi. · Pilih berkasnya dulu. · Teks belum diisi.
- **Galat unggah dari server (per kode):** tipe: Berkas ini tidak bisa dipakai. Unggah berkas .txt, .md, atau PDF yang berisi teks. · ukuran: Berkasnya terlalu besar. Ukuran maksimal [n] MB. · karakter: Teksnya terlalu panjang untuk satu modul (maksimal [n] karakter). Bagi menjadi beberapa modul. · jumlah: Kamu sudah punya [n] modul, batas maksimalnya. Hapus salah satu dulu untuk mengunggah yang baru. · PDF pindai: PDF ini tidak berisi teks yang bisa dibaca, mungkin hasil pindai atau foto. Unggah PDF yang teksnya bisa diblok, atau tempel teksnya langsung. · PDF terkunci: PDF ini dikunci dengan kata sandi atau perlindungan. Buka kuncinya dulu, atau tempel teksnya langsung. · PDF rusak: PDF ini tidak bisa dibaca. Coba simpan ulang sebagai PDF, atau tempel teksnya langsung.

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

**LANJUT_App (LANJUT_041) — F7 tanpa Level-In. DRAF belum disetujui Khalifa**,
kecuali judul, pendamping, "Ketika waktu mepet", dan "Beres. [n] benar dari
[m]." yang dipakai apa adanya. Bagian "Yang salah akan muncul lagi lusa"
**tidak dipakai**: versi ini tidak punya pengulangan berjadwal, jadi itu
janji yang tidak bisa dipenuhi. Satu sesi maks. 12 kartu (pilihan singkat 5),
kartu milik sendiri, diacak.

- **Sebelum mulai:** [n] kartu, kira-kira [m] menit. (12 kartu → 8 menit) · Mapel: Semua ([n]) / [mapel] ([n]) · tombol Mulai · Ambil 5 kartu · Riwayat latihan
- **Arsip kosong:** Belum ada kartu untuk dilatih. · Latihan memakai kartu buatanmu di Arsip Belajar. Tambah satu dulu. · Tambah kartu
- **Pintu di Arsip Belajar:** Mulai latihan
- **Selama sesi:** Kartu [i] dari [n] · [mapel] · Soal/Catatan · Lihat jawaban / Lihat isi · Coba ingat isi catatan ini dulu. · Jawaban / Isi catatan · Jawabanmu tadi? Salah · Benar / Kamu ingat? Belum ingat · Sudah ingat · Pilih dulu hasilnya, baru lanjut. · Berikutnya / Lihat hasil · Selesai sekarang
- **Sesudah selesai:** Latihan Selesai · [i] dari [n] kartu · Beres. [b] benar dari [i]. · (berhenti lebih awal) Berhenti sebelum selesai — tidak apa-apa. [b] benar dari [i]. · (tidak ada jawaban) Belum ada kartu yang dijawab.
- **Penyimpanan:** Menyimpan hasil… · Tersimpan di Riwayat Latihan. · Hasil latihan belum tersimpan. · Coba lagi
- **Tombol akhir:** Ulangi · Lihat riwayat latihan · Kembali ke Arsip
- **Galat mulai:** Latihan belum bisa dimulai. Coba lagi sebentar lagi.
- **Riwayat Latihan:** [mapel] / Semua mapel · [tanggal, jam] · [i] dari [n] kartu · [b] benar · lencana Tidak selesai · kosong: Belum ada sesi latihan. Sesi yang sudah kamu kerjakan muncul di sini. · Mulai latihan

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

**LANJUT_044 — penjelas label "Perkiraan", DRAF belum disetujui Khalifa.**
Khalifa (2 Okt 2026) membolehkan profil yang sebagian isinya berlabel
"Perkiraan" ditandai terverifikasi, asalkan label itu benar-benar terlihat
siswa. Lencana "Perkiraan" saja tidak menjelaskan artinya, dan kaki halaman
"dicek [tanggal]" berlaku untuk seluruh profil. Karena itu kalimat ini tampil
tepat di bawah lencana pada setiap kelompok data yang berlabel "Perkiraan"
(peminat, mata kuliah, profesi, atau kampus), dan tidak tampil pada kelompok
yang "Terverifikasi":

- **Penjelas Perkiraan:** Perkiraan artinya bagian ini disusun dari sumber umum, belum dari sumber resmi, jadi cek lagi ke kampus tujuanmu.

**LANJUT_045 — kaki halaman profil per bagian, DRAF belum disetujui Khalifa.**
Menggantikan kaki lama "Diperbarui dari [lembaga] · dicek [tanggal]", yang
berlaku untuk seluruh profil sehingga bisa dibaca seolah bagian "Perkiraan"
juga sudah dicek. Frasa "[lembaga]" (selalu "laman resmi SNPMB" karena
`url_sumber` profil satu untuk seluruh berkas) ikut dilepas: bagian yang
terverifikasi dicek ke sumber resmi yang berbeda-beda (kepala
`profil-prodi.json`: SNPMB, dokumen kurikulum resmi kampus, laman resmi
kampus), bukan semuanya ke SNPMB. Sumber per bagian tetap terlihat di
baris "Sumber: SNPMB …" pada kartu peminat dan di penafian.
`[tanggal]` = `diperiksa_pada`, mis. "3 Oktober 2026".

- **Keempat bagian "Terverifikasi":** Isi profil ini dicek ke sumber resmi pada [tanggal].
- **Ada bagian "Perkiraan":** Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal]. Bagian bertanda Perkiraan belum dicek ke sumber resmi.
- **Ada bagian tanpa status di data** (tidak terjadi di data sekarang; aman-gagal): Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal].

**LANJUT_App (LANJUT_075) — Eksplorasi Kampus untuk SMP dan kelas 10–11. DRAF, belum
disetujui Khalifa.** Rute `/eksplorasi-tujuan` kini berisi layar per jenjang
(`lib/eksplorasiKampus.ts`): SMP "Kenali Minatmu" (bidang minat saja), kelas 10–11
"Jalur dan Bidangmu" (jalur masuk umum + bidang minat); kelas 12 dan akun tanpa
kelas tetap layar F10 di atas, tidak berubah. Bidang = rumpun yang sudah ada di data
prodi (Ekonomi & Bisnis, Kesehatan, Sosial & Humaniora, Teknologi & Rekayasa); yang
disimpan ke akun hanya nama rumpun (`minat_rumpun`), dan hanya bila kebijakan privasi
versi berlaku sudah diterima. Tidak ada daftar prodi, tanggal, biaya, daya tampung,
atau peluang. Seksi bidang dan jalur berlabel "Perkiraan" dengan penjelas LANJUT_044
di atas. LANJUT_075b: penggantian nama kartu SMP dan kelas 10–11 menjadi "Eksplorasi
Kampus" disetujui PM pada 14 Oktober, dan judul bilah halaman per jenjang dipertahankan;
kartu tambahan di grid kelas 12 masih menunggu keputusan PM.

- **Kartu grid Beranda:** Eksplorasi Kampus (ke `/eksplorasi-tujuan`; label kartu yang sama di grid SMP dan 10–11, sebelumnya "Eksplorasi Tujuan"; kartu baru di grid kelas 12)
- **Judul bilah halaman SMP:** Kenali Minatmu
- **Judul bilah halaman kelas 10–11:** Jalur dan Bidangmu
- **SMP — pengantar:** Pilih bidang yang menarik buatmu. Tidak ada pilihan yang salah, dan pilihanmu bisa diubah kapan saja.
- **Kelas 10–11 — pengantar:** Kenali cara masuk perguruan tinggi dan bidang yang ingin kamu dalami.
- **Kelas 10–11 — judul seksi jalur:** Jalur masuk perguruan tinggi · lencana: Perkiraan
- **Jalur SNBP:** Seleksi Nasional Berdasarkan Prestasi. Dinilai dari nilai rapor dan prestasi, tanpa tes tertulis. Sekolah menentukan siapa yang bisa ikut.
- **Jalur SNBT:** Seleksi Nasional Berdasarkan Tes. Dinilai dari hasil tes tertulis berbasis komputer.
- **Jalur seleksi mandiri:** Seleksi yang diadakan sendiri oleh tiap perguruan tinggi negeri. Caranya bisa berbeda di tiap kampus.
- **Judul seksi bidang:** Bidang minat · lencana: Perkiraan
- **Petunjuk jumlah:** Pilih sampai [n] bidang. ([n] = 5 untuk SMP, 3 untuk kelas 10–11)
- **Bidang Ekonomi & Bisnis:** Belajar tentang uang, usaha, dan cara sebuah organisasi berjalan. · Contoh pekerjaan: mengurus keuangan, menjalankan usaha, atau membantu perusahaan merencanakan kegiatannya.
- **Bidang Kesehatan:** Belajar tentang tubuh manusia, penyakit, dan cara menjaga kesehatan. · Contoh pekerjaan: merawat orang sakit, membantu pemulihan, atau menjaga kesehatan masyarakat.
- **Bidang Sosial & Humaniora:** Belajar tentang manusia, masyarakat, bahasa, dan aturan dalam kehidupan bersama. · Contoh pekerjaan: menyampaikan informasi, mendampingi masyarakat, atau membantu menyelesaikan urusan aturan.
- **Bidang Teknologi & Rekayasa:** Belajar tentang cara kerja alat, listrik, dan komputer, serta cara merancang sesuatu yang berguna. · Contoh pekerjaan: merancang, membangun, atau merawat alat, bangunan, dan sistem komputer.
- **Tombol simpan:** Simpan minatku (SMP) · Simpan bidangku (kelas 10–11)
- **Sesudah tersimpan:** Pilihanmu sudah tersimpan.
- **Belum menerima kebijakan privasi (server menolak menyimpan):** Terima kebijakan privasi dulu supaya pilihanmu bisa disimpan. · tautan: Baca dan terima
- **Gagal menyimpan:** Belum tersimpan. Coba lagi sebentar lagi.
- **Daftar bidang gagal dimuat:** Daftar bidang belum bisa dimuat. Coba lagi sebentar lagi.
- **SMP — kalimat penutup:** Ini baru gambaran awal. Kamu masih punya waktu untuk menentukan.
- **Kelas 10–11 — pengganti daftar prodi:** Daftar prodi dan syaratnya akan muncul setelah dicek ke sumber resmi.

**LANJUT_App (LANJUT_075c) — keterangan kartu Eksplorasi Kampus untuk SMP dan kelas
10–11. DRAF, belum disetujui Khalifa.** Menggantikan "Intip prodi kuliah: belajar apa
dan lulusannya kerja di mana." untuk kedua jenjang itu, karena layar mereka tidak
menampilkan prodi. Kelas 12 tetap memakai keterangan lama (kartu tambahan kelas 12
menunggu keputusan PM). Saat ini grid Beranda hanya menampilkan label kartu, jadi
keterangan ini belum terlihat di layar.

- **Keterangan kartu Eksplorasi Kampus (SMP & kelas 10–11):** Kenali bidang yang cocok untukmu.

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
- **Data Akun:** baris "Sekolah" di kartu; medan yang sama di form Ubah, hanya untuk kelas 10–12.

### 4.11 Bukan kelas 12 (placeholder sementara)

**LANJUT_035 — DRAF belum disetujui Khalifa.** Linimasa (bagian tenggat &
tahapan), Daftar Periksa, dan Jalur Saya `/cek-posisi` berisi SNBP/SNBT/TKA, jadi hanya
tampil untuk kelas 12. Kelas 7–11 dan akun tanpa kelas melihat placeholder
ini sampai konten per jenjang didesain (`components/screens/KhususKelas12.tsx`).
Pengecualian sejak LANJUT_069: Daftar Periksa kelas 10–11 memakai kalimat netral
di §4.2 (blok LANJUT_069), bukan placeholder ini; sejak LANJUT_076b kelas 7–9 juga
(§4.4 blok LANJUT_076b), jadi di Daftar Periksa placeholder ini tinggal untuk akun
tanpa kelas. Di layar `/cek-posisi` (Jalur Saya) tetap tampil untuk kelas 7–11; sejak
LANJUT_077b kelas 7–9 tidak lagi bisa membuka layar itu dari app (kartu pintunya di Data
Akun disembunyikan untuk SMP), jadi dalam praktik placeholder ini dilihat kelas 10–11
dan akun tanpa kelas. Letak sebenarnya (diperiksa
LANJUT_071): placeholder ini hanya dirender di layar Jalur Saya `/cek-posisi` dan Daftar Periksa;
Beranda (Linimasa) untuk kelas selain 12 sejak LANJUT_064 tidak menampilkan bagian
tenggat maupun placeholder ini.

- **Kelas 7–11 — judul:** Bagian ini untuk kelas 12.
- **Kelas 7–11 — isi:** Isinya jadwal dan persiapan SNBP, SNBT, dan TKA. Versi untuk kelas [kelas] sedang kami siapkan.
- **Kelas 7–11 — tombol:** Buka Jenjang Saya (sebelum LANJUT_037: Buka Khusus SMK)
- **Kelas kosong — judul:** Isi kelasmu dulu.
- **Kelas kosong — isi:** Isi bagian ini menyesuaikan kelasmu. Isi kelas di Data Akun, ya.
- **Kelas kosong — tombol:** Isi kelas di Data Akun · Buka Jenjang Saya
- **Data Akun, kartu Kemajuan:** Kemajuan persiapan SNBP, SNBT, dan TKA tampil di sini saat kamu kelas 12. (sejak LANJUT_077 hanya kelas 10–11 dan akun tanpa kelas; SMP lihat di bawah)

Sejak LANJUT_036, akun tanpa kelas tertahan di gerbang §4.12 dulu, jadi
keadaan "Kelas kosong" di atas hanya jaring pengaman.

**LANJUT_App (LANJUT_077) — kartu Kemajuan di Data Akun untuk SMP. DRAF, belum disetujui
Khalifa.** Akun kelas 7–9 tidak lagi membaca kalimat tentang kelas 12 di Data Akun
(`lib/jenjangSaya.ts` `teksKemajuanDataAkun`). Kalimatnya menyebut Daftar Periksa karena
kartu ini bertombol "Buka Daftar Periksa"; contoh dari PM ("Riwayat dan data akunmu ada
di sini.") tidak dipakai karena tidak nyambung dengan tombol itu — pilihan eksekutor,
belum disetujui PM. Kelas 10–12 tidak berubah.

- **Data Akun, kartu Kemajuan — SMP (kelas 7–9):** Langkah yang kamu catat ada di Daftar Periksa.

### 4.12 Gerbang wajib isi kelas

**LANJUT_036 — DRAF belum disetujui Khalifa.** Muncul untuk akun lama yang
belum punya kelas, menggantikan seluruh app sampai kelas disimpan
(`components/screens/IsiKelasScreen.tsx`).

- **Judul:** Kamu kelas berapa sekarang?
- **Pengantar:** Isi sekali ini saja supaya LANJUT menampilkan yang sesuai buat kamu. Nanti bisa diubah di Data Akun.
- **Medan:** Kelas · petunjuk: SMP kelas 7–9, SMA/SMK kelas 10–12. · galat: Pilih kelasmu.
- **Bila kelas pernah dipilih di Daftar Periksa (perangkat ini):** Terpilih dari pilihanmu sebelumnya di Daftar Periksa. Cek lagi sebelum menyimpan.
- **Tombol:** Simpan dan lanjut (proses: Menyimpan…) · Buka Data Akun · Keluar

**Langkah 2 — jenis sekolah (LANJUT_038), DRAF.** Untuk kelas 10–12 yang
belum memilih jenis sekolah; muncul sesudah langkah kelas, tidak pernah
satu layar dengannya. Kelas 7–9 tidak pernah melihatnya.

- **Judul:** Kamu sekolah di mana?
- **Pengantar:** Kelas [kelas]: pilih jenis sekolahmu supaya isi LANJUT pas buat kamu. Nanti bisa diubah di Data Akun.
- **Medan:** Jenis sekolah · pilihan: SMA · SMK · MA (Madrasah Aliyah) · galat: Pilih jenis sekolahmu.
- **Tombol:** sama dengan langkah 1.

### 4.13 Kebijakan privasi & persetujuan orang tua/wali

**LANJUT_047 — DRAF belum disetujui Khalifa.** Isi lengkap kebijakan privasi
ada di `docs/kebijakan-privasi-DRAF.md` (DRAF, wajib direview ahli hukum) dan
dipakai app dari `LANJUT_App/lib/kebijakan-privasi.json`. Ringkasan di bawah
sama persis dengan berkas itu (dijaga `server/tests/kebijakan-privasi.test.js`).
Kalimat data pribadi §4.10 yang sudah disetujui tetap tampil apa adanya di
bawah tombol Daftar.

- **Layar Daftar — judul blok kebijakan:** Kebijakan privasi (ringkas)
- **Ringkasan 1:** Kami menyimpan data akunmu (nama pengguna, kelas, jenis sekolah, prodi impian, gaya belajar, dan email kalau kamu isi) dan yang kamu buat di LANJUT (centang Daftar Periksa, kartu, modul yang kamu unggah, dan hasil latihan) supaya kemajuanmu tidak hilang.
- **Ringkasan 2:** Kata sandimu disimpan dalam bentuk acak, bukan teks aslinya.
- **Ringkasan 3:** Fitur AI di Ngobrol Bareng LANJUT mengirim pesanmu, riwayat obrolan, dan profil belajarmu (kelas, jenis sekolah, prodi impian, gaya belajar) ke penyedia AI pihak ketiga yang dapat memproses data di luar Indonesia. Untuk pertanyaan pelajaran, potongan modulmu yang berkaitan bisa ikut dikirim. Nama, nama pengguna, dan email dari akunmu tidak ikut dikirim, dan isi obrolan tidak disimpan di server LANJUT. Fitur AI baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah.
- **Ringkasan 4:** Kamu dan orang tua atau walimu berhak melihat, membetulkan, dan meminta penghapusan datamu, serta mencabut persetujuan.
- **Tautan ke kebijakan lengkap:** Baca kebijakan privasi lengkap
- **Kotak centang:** Saya sudah membaca kebijakan privasi LANJUT.
- **Petunjuk selama belum dicentang (tombol Daftar nonaktif):** Centang kotak kebijakan privasi di atas dulu supaya bisa mendaftar.
- **Galat versi kebijakan usang (dari server):** Kebijakan privasi sudah diperbarui. Muat ulang aplikasi, lalu baca dan centang versi terbaru.
- **Kebijakan lengkap (modal di Daftar & halaman /kebijakan-privasi):** judul Kebijakan Privasi · pengantar halaman: Data apa yang disimpan LANJUT, untuk apa, dan apa hakmu. · penanda: DRAF — belum berlaku. Wajib direview ahli hukum sebelum dipakai. · Versi [n] · tombol Tutup (modal) / Kembali (halaman)
- **Data Akun — baris:** Persetujuan orang tua/wali · nilai: Sudah / Belum (Belum bisa dimuat bila gagal)
- **Data Akun — penjelas:** Orang tua atau walimu memberi persetujuan lewat surat dari sekolah. Persetujuan ini dibutuhkan untuk fitur AI nanti; fitur lain tetap bisa kamu pakai seperti biasa.
- **Data Akun — tautan:** Baca kebijakan privasi

**LANJUT_075b — usulan kalimat kebijakan privasi untuk bidang minat. DRAF, belum
disetujui Khalifa; BELUM dipakai di layar.** Sejak LANJUT_075 akun menyimpan
`minat_rumpun` (bidang minat yang dipilih di Eksplorasi Kampus), tetapi kebijakan
privasi versi berlaku belum menyebutnya. `LANJUT_App/lib/kebijakan-privasi.json` dan
versinya tidak diubah; kalimat ini usulan untuk versi kebijakan berikutnya, sesudah
tinjauan ahli hukum.

- **Usulan — bidang minat yang disimpan:** Kami menyimpan bidang minat yang kamu pilih, misalnya Kesehatan atau Teknologi & Rekayasa, untuk menampilkan Eksplorasi Kampus yang sesuai jenjangmu. Bidang minat tidak ikut dikirim ke penyedia AI di Ngobrol Bareng LANJUT, dan bisa kamu ubah atau kosongkan kapan saja.

### 4.14 Terima kebijakan privasi (akun lama & terima ulang)

**LANJUT_048 — DRAF belum disetujui Khalifa.** Untuk akun yang belum
menerima kebijakan versi yang berlaku (akun lama, atau versinya naik).
Jendela muncul sekali per sesi login, sesudah gerbang isi kelas dan jenis
sekolah; "Nanti saja" tidak mencatat apa pun dan tidak memblokir apa pun.
Ringkasan dan tautan kebijakan lengkap memakai teks §4.13 apa adanya.
`[n]` = nomor versi kebijakan.

- **Judul (jendela & halaman):** Kebijakan privasi · judul bilah halaman /terima-kebijakan: Kebijakan Privasi
- **Pengantar, belum pernah menerima:** Baca ringkasan kebijakan privasi LANJUT di bawah, lalu terima. Semua fitur tetap bisa kamu pakai; penerimaan ini dibutuhkan untuk fitur AI nanti.
- **Pengantar, perlu menerima ulang:** Kebijakan privasi LANJUT diperbarui ke versi [n]. Baca ringkasannya, lalu terima versi terbaru.
- **Versi di aplikasi berbeda dengan yang berlaku:** Versi terbaru kebijakan privasi (versi [n]) belum ada di aplikasimu. Muat ulang atau perbarui aplikasi, lalu terima versi terbaru.
- **Tautan kebijakan lengkap:** Baca kebijakan privasi lengkap · setelah dibuka: Sembunyikan kebijakan lengkap
- **Tombol:** Terima (proses: Menyimpan…) · Nanti saja (jendela) / Kembali (halaman)
- **Galat simpan:** Belum tersimpan. Coba lagi sebentar lagi. (atau pesan dari server)
- **Sudah diterima (halaman):** Kebijakan privasi versi [n] sudah kamu terima.
- **Belum bisa dimuat:** Kebijakan privasi belum bisa dimuat. Coba lagi sebentar lagi.
- **Data Akun — baris:** Kebijakan privasi · nilai: Diterima (versi [n]) / Perlu diterima ulang / Belum diterima (Belum bisa dimuat bila gagal) · tombol: Baca dan terima
- **Ngobrol — ajakan:** Terima kebijakan privasi dulu supaya fitur AI bisa diaktifkan nanti. · tautan: Baca dan terima

### 4.15 Ngobrol Bareng LANJUT dengan AI

**LANJUT_051 — DRAF belum disetujui Khalifa.** Ngobrol kini dijawab AI
(OpenRouter) lewat server, hanya untuk akun dengan persetujuan orang tua/wali
dan kebijakan yang sudah diterima. Akun lain melihat layar "terkunci" tanpa
kotak tulis. Catatan "Versi uji coba" dan info persetujuan lama (§4.13,
LANJUT_047) tidak tampil lagi. Salam pembuka bot tetap teks LANJUT_032.

- **Ngobrol — catatan AI:** Dijawab AI, jadi bisa keliru. Cek lagi info penting ke sumber resmi. LANJUT tidak menyimpan obrolan ini; obrolan hilang saat aplikasi ditutup.
- **Ngobrol terkunci — judul:** Fitur AI belum aktif untuk akunmu
- **Ngobrol terkunci — isi:** Ngobrol Bareng LANJUT dijawab AI dari penyedia pihak ketiga. Fitur ini baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah, dan kamu sudah menerima kebijakan privasi.
- **Ngobrol — status belum bisa dimuat:** Status fitur AI belum bisa dimuat. Coba lagi sebentar lagi.
- **Ngobrol — galat kirim:** Fitur AI belum aktif untuk akunmu. / Fitur AI sedang belum bisa dipakai. Coba lagi nanti. / Maaf, aku belum bisa menjawab sekarang. Coba kirim lagi sebentar lagi. / Pesanmu sudah banyak. Istirahat sebentar, lalu coba lagi. / Pesanmu belum terkirim karena tidak tersambung. Coba lagi. / Ada yang tidak beres. Coba kirim lagi. · tombol: Coba lagi
- **Beranda — kartu Ngobrol:** Cerita soal minat, cara belajar, atau rencana kuliahmu. (dulu diakhiri "Versi uji coba.") — tidak tampil lagi: kartu Ngobrol dihapus dari grid Beranda sejak LANJUT_075b

**LANJUT_App (LANJUT_074) — Ngobrol: tombol mikrofon (ucapan → teks). DRAF, belum
disetujui Khalifa.** Tombol mikrofon di samping kotak pesan, hanya bila peramban punya
pengenal suara (Web Speech API); di Android/iOS dan di peramban tanpa fitur itu tombolnya
tidak ada, tanpa pesan. Mikrofon baru hidup setelah tombol ditekan, dan mati saat tombol
ditekan lagi, saat siswa selesai bicara, atau saat pesan dikirim. Teks hasil pengenalan masuk
ke kotak pesan (tidak terkirim otomatis); app tidak mengirim atau menyimpan audio. Galat
(mis. izin mikrofon ditolak) tidak menampilkan pesan; tombol kembali ke keadaan awal.

- **Ngobrol — tombol mikrofon (label pembaca layar):** Ucapkan pesan
- **Ngobrol — petunjuk di kotak pesan saat mendengarkan:** Mendengarkan…

### 4.16 Pengaman Ngobrol: kartu bantuan, saklar, data pribadi

**LANJUT_053 — DRAF belum disetujui Khalifa.** Teks tetap yang dibuat
server (bukan ditulis AI) ada di `LANJUT_App/server/config/ngobrol-teks.json`
dan harus sama persis dengan butir bertanda (server) di bawah (dijaga
`server/tests/ngobrol-keselamatan.test.js`). Isi kartu bantuan dan daftar
tanda bahaya ada di `server/config/kartu-bantuan.json` dan
`tanda-bahaya.json` (DRAF untuk review guru BK).

- **Balasan tanda bahaya akut (server):** Terima kasih sudah mau cerita. Yang kamu rasakan itu penting, dan kamu tidak harus menghadapinya sendirian. Tolong hubungi salah satu layanan di bawah, atau bicara sekarang dengan orang dewasa yang kamu percaya: orang tua atau wali, guru BK, atau keluarga. Kalau mau, kita tetap bisa lanjut ngobrol di sini.
- **Kartu bantuan — judul (server):** Kamu tidak sendirian
- **Kartu bantuan — penutup (server):** Bicara juga dengan orang dewasa yang kamu percaya: orang tua atau wali, guru BK, atau keluarga.
- **Tolak di luar topik (server, diucapkan AI persis):** Aku cuma bisa bantu soal belajar, minat, dan rencana sekolah lanjutan, kuliah, atau karier. Mau lanjut bahas itu?
- **Tolak abaikan aturan (server, diucapkan AI persis):** Aku tetap pakai aturanku sebagai teman ngobrol LANJUT, jadi permintaan itu tidak bisa aku ikuti. Ada yang mau kamu tanyakan soal rencana sekolah atau kuliahmu?
- **Balasan saat AI dimatikan (server):** Fitur AI sedang dimatikan sementara, jadi aku belum bisa menjawab pesanmu. Sambil menunggu, kamu bisa buka menu Jenjang, Checklist, atau Arsip Belajar.
- **Ngobrol — label balasan uji coba:** Uji coba, bukan jawaban AI
- **Ngobrol — peringatan data pribadi:** Jangan tulis nama lengkap, nomor HP, alamat, atau data pribadi lain di sini.
- **Ngobrol — tautan kartu bantuan:** Butuh bicara dengan orang? · setelah dibuka: Sembunyikan
- **Ngobrol — penanda data disamarkan:** Data pribadi di pesanmu disamarkan sebelum dikirim ke AI.
- **Ngobrol — kartu bantuan belum bisa dimuat:** Kartu bantuan belum bisa dimuat. Kalau kamu dalam bahaya, hubungi 112 atau orang dewasa yang kamu percaya.

### 4.17 Ngobrol: materi dari modul Arsip dan web

**LANJUT_055 — DRAF belum disetujui Khalifa.** Untuk pertanyaan materi
pelajaran, AI memakai potongan modul dari Arsip Belajar siswa sendiri dan,
bila pencarian web dinyalakan, hasil web. Daftar sumber di bawah balasan
disusun server: modul dari label [M1], [M2], dan seterusnya; halaman web dari
anotasi penyedia [W1], [W2], dan seterusnya.

- **Ngobrol — catatan materi:** Kalau kamu bertanya soal materi pelajaran, pertanyaanmu dan potongan modul yang berkaitan dari Arsip Belajarmu ikut dikirim ke penyedia AI.
- **Ngobrol — judul sumber modul:** Dari modulmu · isi: [label] · [judul modul]
- **Ngobrol — judul sumber web:** Dari web · isi: [label] · [judul halaman] (tautan ke alamat dari penyedia)
- **Ngobrol — kuota web habis:** Kuota pencarian web hari ini sudah habis, jadi jawaban ini tanpa pencarian web.

### 4.18 Level-In dan keyakinan di Latihan

**LANJUT_058 — DRAF belum disetujui Khalifa.** Semua angka (level, pola
keyakinan, saran) dihitung server. Ambang yang disebut di teks
([batas bawah], [batas atas], [n] kartu lagi) dibaca dari konfigurasi
Level-In, tidak ditulis di app; bila konfigurasi gagal dimuat, dipakai versi
tanpa angka. Level-In terbuka untuk semua kelas (7–12).

- **Latihan — pertanyaan keyakinan:** Seberapa yakin kamu? · pilihan: Yakin · Ragu · Tebak · petunjuk: Pilih sebelum membuka jawaban. Boleh dilewati.
- **Latihan — setelah jawaban dibuka:** Keyakinanmu: [pilihan]. · bila dilewati: Keyakinan dilewati.
- **Latihan — tombol ke Level-In:** Lihat Level-In (di layar sebelum mulai dan di ringkasan akhir sesi)
- **Beranda — pintu Level-In:** Level-In · Seberapa kuat kamu di tiap mapel, dari latihanmu.
- **Level-In — judul & pengantar:** Level-In · Seberapa kuat kamu di tiap mapel, dihitung dari latihanmu sendiri.
- **Level-In — belum pernah latihan:** Belum ada latihan. · Level-In muncul setelah kamu menjawab kartu di Latihan. Mulai dari sedikit kartu dulu saja. · tombol: Mulai latihan (LANJUT_077b: kalimat kedua tanpa angka ambang tetap, contoh kalimat PM; sebelumnya "Mulai dari 5 kartu saja.")
- **Level-In — galat:** Level-In belum bisa dimuat. Periksa sambungan internetmu, lalu coba lagi. · tombol: Coba lagi
- **Level-In — per mapel:** judul seksi: Per mapel · [n] kartu dijawab
- **Level-In — level dan artinya:** Perlu penguatan dasar: Jawaban benarmu masih di bawah [batas bawah]. Ulangi dasar-dasarnya dulu, pelan-pelan saja. · Cukup, lanjut latihan: Jawaban benarmu [batas bawah]–[batas atas]. Terus latihan supaya makin mantap. · Sudah kuat: Jawaban benarmu di atas [batas atas]. Pertahankan, sesekali ulangi. · tanpa angka: Jawaban benarmu masih sedikit. … / Jawaban benarmu sudah lumayan. … / Hampir semua jawabanmu benar. …
- **Level-In — belum cukup data:** Belum cukup data · Jawab [n] kartu lagi di mapel ini supaya levelnya muncul. · tanpa angka: Jawab beberapa kartu lagi di mapel ini supaya levelnya muncul.
- **Level-In — keyakinan:** judul seksi: Keyakinanmu · belum ada data: Saat latihan, pilih "Seberapa yakin kamu?" sebelum membuka jawaban. Dari situ Level-In bisa melihat apakah keyakinanmu sudah pas dengan hasilmu. · kurang: Isi keyakinan di [n] kartu lagi dalam satu mapel supaya polanya kelihatan. · terlalu yakin: Kamu cenderung terlalu yakin di [mapel]: sering yakin, tapi jawabannya salah. · pas: Keyakinanmu sudah pas dengan hasilmu di [mapel].
- **Level-In — saran hari ini:** judul seksi: Saran hari ini · saran: Latih [mapel] hari ini. Dari [n] kartu terakhir yang kamu isi keyakinannya, [p]% kamu yakin tapi jawabannya salah. (tombol: Latihan [mapel]) · selaras: Keyakinanmu sudah pas dengan hasilmu. Lanjutkan latihan rutin di mapel mana saja. (tombol: Mulai latihan) · belum cukup data: Lanjut latihan [mapel] dan isi keyakinanmu, supaya saran berikutnya lebih tepat. (tombol: Latihan [mapel]) · pengguna baru: Mulai dari [mapel]. Isi juga seberapa yakin kamu di tiap kartu. (tombol: Latihan [mapel]) · arsip kosong: Belum ada kartu untuk dilatih. Tulis kartu dulu di Arsip Belajar. (tombol: Tulis kartu)

**LANJUT_App (LANJUT_077) — kartu "Latihan berikutnya" di Beranda. DRAF, belum disetujui
Khalifa.** Teks di `lib/levelin.ts` (`TEKS_LEVELIN`). Semua jenjang. Isinya dari saran
harian di atas (dihitung server, ambang dari konfigurasi Level-In): kartu hanya tampil
bila saran memilih satu mapel dari data yang sudah cukup ("saran"); data belum cukup,
belum ada, atau gagal dimuat → kartu tidak tampil dan tidak ada teks pengganti.
Letaknya tepat sesudah grid ikon, sebelum Info Penting (kelas 12) atau carousel banner.

- **Beranda — kartu Latihan berikutnya:** label: Latihan berikutnya · isi: [nama mapel] · tombol: Mulai latihan (membuka Latihan dengan mapel itu)

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
