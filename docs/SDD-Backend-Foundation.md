# SDD — Fondasi Backend LANJUT (Akun, API, Basis Data)

**Produk:** LANJUT (Layanan Navigasi Jalur Kuliah untuk Siswa SMK)
**Cakupan:** fondasi backend untuk **seluruh aplikasi** (P0 F1–F5 + P1 Arsip/Latihan/Level-In) — bukan hanya Level-In
**Status:** **Draf SDD — dua keputusan PM memblokir dimulainya implementasi** (§11.1: B1 jadwal/P0, B2 hosting & biaya)
**Tanggal:** 22 Agustus 2026

> **Diperbarui 27 Sep 2026:** prinsip **B-K2** (§1.2) dan bagian yang diturunkan darinya (§6.1, §6.3, §6.4, §7.3, RB2, RB8, §11.3, §12) tidak berlaku untuk LANJUT_App (Expo), yang didesain online-first. Teks lama dicoret dan diberi catatan di tempatnya, tidak dihapus (LANJUT_016).

> **Aturan pakai dokumen ini.** Dokumen ini merancang **cara membangun** lapisan
> server yang sudah digambarkan di §12 `docs/prd-sdd-lanjut.md`. Ia **tidak**
> menambah, mengurangi, atau menafsir ulang requirement produk. Urutan
> kewenangan dokumen:
>
> 1. `docs/prd-sdd-lanjut.md` (v1 — sumber kebenaran tunggal: arsitektur §12,
>    model data §13, cakupan P0 F1–F5, keputusan teknologi §8, DoD §15)
> 2. `docs/rancangan-arsip-latihan-banksoal.md` (kelas kepercayaan kartu §1,
>    pembagian gratis/berbayar §2.2, batas privasi arsip §2.1)
> 3. `docs/PRD-LevelIn.md` → `docs/SDD-LevelIn.md` (untuk semua hal Level-In)
> 4. dokumen ini
>
> Bila dokumen ini tampak bertentangan dengan salah satu di atasnya, **yang di
> atas yang menang** dan dokumen ini yang direvisi.

> **Batas tegas terhadap Level-In.** Skema Level-In (`riwayat_latihan` yang
> diperluas, `sesi_latihan`, `kalibrasi_mapel`, `konfigurasi_levelin`) dan
> garis besar endpoint-nya **sudah dirancang** di `docs/SDD-LevelIn.md` §3.2 dan
> §4.2. Dokumen ini **memakainya apa adanya sebagai titik awal** dan hanya
> mengintegrasikannya ke skema/API yang lebih besar. **Tidak ada satu pun
> keputusan Level-In yang dirancang ulang di sini.** Bila kelak ada perbedaan,
> `SDD-LevelIn.md` yang menang untuk hal-hal Level-In.

> **Batas tegas terhadap klien Level-In v1.** `SDD-LevelIn.md` §4.1 dan §10.3
> sudah mengunci bahwa Level-In v1 berjalan **client-only** (`localStorage` +
> `sessionStorage`, tanpa akun). Keputusan cakupan backend di dokumen ini
> **tidak mengubahnya**. Penyambungan Level-In ke backend adalah pekerjaan
> terpisah yang mengikuti §4.2/§4.3 dokumen itu, tanpa mengubah bentuk data
> klien.

---

## 1. Ringkasan Pendekatan Teknis

### 1.1 Apa yang sebenarnya berubah

Yang berubah **bukan** arsitektur. §12 `prd-sdd-lanjut.md` sejak awal
menggambarkan tiga lapisan — Klien PWA → Lapisan API → Basis Data — ditambah
Panel Admin. Yang selama ini ada hanyalah lapisan pertama; dua lapisan bawahnya
digambar tapi belum dibangun (`app/README.md`, "Yang BELUM ada").

Yang benar-benar **baru** dari keputusan PM/user kali ini ada dua:

1. **Akun & login.** Entitas `pengguna` di §13 selama ini hanya menyimpan
   `kelas` dan `prodi_tujuan`, tanpa satu pun kolom identitas atau kredensial —
   karena v1 memang tidak punya akun. Sekarang `pengguna` menjadi entitas yang
   bisa masuk/keluar, dan seluruh data pribadi (kemajuan checklist, kartu
   pengguna, riwayat latihan, kalibrasi Level-In) mendapat pemilik yang nyata.
2. **Data pindah dari perangkat ke server.** Sebelumnya semua data pribadi
   hidup di `localStorage` satu peramban. Sekarang ada tempat kedua yang
   bertahan lintas perangkat — dan itu membawa kewajiban keamanan dan privasi
   yang sebelumnya tidak ada (§8, RB4 di §10).

### 1.2 Enam keputusan yang membentuk seluruh rancangan di bawah

| # | Keputusan | Alasan |
|---|---|---|
| B-K1 | **Klien tetap berfungsi penuh tanpa server.** Backend bersifat **aditif**: ia menambah sinkronisasi & multi-perangkat, tidak menjadi syarat agar aplikasi jalan. Mode tamu (tanpa akun) tetap menjadi mode bawaan. | Ini yang menjaga agar keputusan backend tidak menyandera P0. Kalau server mati, macet, atau belum siap, F1–F5 tetap tayang seperti sekarang. Sekaligus menjaga T5 (≥50 pengguna nyata sebelum 23 Oktober): memaksa daftar akun di layar pertama adalah cara tercepat kehilangan pengguna yang justru sedang dihitung untuk penilaian. |
| B-K2 | ~~**`localStorage` tetap sumber kebenaran untuk penulisan; server adalah cadangan & penyatu perangkat.** Klien menulis lokal dulu, lalu mengirim ke server.~~ → **Diperbarui 27 Sep 2026:** tidak berlaku untuk LANJUT_App (Expo). App menulis langsung ke server dengan optimistic UI + rollback, didesain online-first (app mewajibkan login). B-K2 masih relevan **hanya** untuk MVP-PWA yang tetap memakai localStorage, dan di sana pun baru separuh: PWA menulis ke localStorage, tetapi tidak pernah mengirim kemajuan atau latihan ke server (PWA hanya memanggil auth, profil, dan `/konten/prodi`). **Keputusan:** LANJUT_App tidak akan disesuaikan ke B-K2; kalau offline support dibutuhkan di masa depan, perlu desain baru, bukan revert ke prinsip ini (LANJUT_016). | Menghindari kelas bug paling mahal di aplikasi seperti ini: layar yang menunggu jaringan. Siswa memakai HP dengan koneksi tidak menentu; sesi latihan tidak boleh berhenti karena satu permintaan gagal. |
| B-K3 | **Catatan pribadi bersifat append-only dan ber-`id` buatan klien.** `riwayat_latihan`, `sesi_latihan`, dan `kemajuan` disinkronkan secara idempoten berdasarkan `id`/kunci gabungan. | Aturan ini sudah dikunci `SDD-LevelIn.md` §4.3 no. 1. Karena catatannya adalah fakta yang tidak pernah diubah, penyatuan dua perangkat menjadi operasi gabungan (*union*) yang bebas konflik — bukan negosiasi versi. |
| B-K4 | **Otorisasi berbasis kepemilikan, diperiksa di lapisan repositori, bukan di rute.** Setiap query data pribadi **wajib** membawa `pengguna_id` di klausa `WHERE`, bukan mengandalkan pemeriksaan terpisah setelah baris terambil. | Cara paling umum kartu pribadi bocor adalah `SELECT ... WHERE id = ?` lalu lupa membandingkan pemiliknya. Dengan `WHERE id = ? AND pemilik_id = ?`, kelalaian itu menghasilkan "tidak ditemukan", bukan kebocoran. |
| B-K5 | **SQL ditulis eksplisit dan hanya hidup di berkas `*.repo.js`.** Tidak ada ORM yang menyembunyikan skema (§2.2). | Dua alasan sekaligus: skema di §3 dokumen ini adalah yang dipresentasikan untuk penilaian **Basis Data** (§8 dokumen induk menyebut nilai lintas mapel), dan tim pemula lebih aman memperbaiki SQL yang bisa dibaca daripada menebak SQL yang dihasilkan pustaka. |
| B-K6 | **Fungsi keputusan Level-In tidak digandakan dengan bebas.** Server memakai salinan lapisan 2 `assets/levelin.js` (fungsi murni), dan **kedua sisi diuji dengan berkas kasus uji yang sama**. | `SDD-LevelIn.md` §4.3 no. 2 melarang dua sumber kebenaran untuk angka yang sama. Dua implementasi yang menyimpang diam-diam adalah bug yang tidak menimbulkan galat, hanya angka salah (RB5). |

### 1.3 Yang **tidak** dikerjakan oleh fondasi ini

| Di luar cakupan | Alasan |
|---|---|
| Panel Admin (§12 dokumen induk) | Digambar di arsitektur, tetapi bukan bagian fondasi ini. Untuk v1, pengisian konten tetap lewat `app/data/*.json` + benih (§3.6). Status: pertanyaan terbuka B7 (§11.1). |
| Mekanisme pembayaran (Jalan A) | `rancangan-arsip-latihan-banksoal.md` §5 menempatkannya setelah arsip dipakai nyata. Kolom `pengguna.paket` **tidak** ditambahkan sekarang; lihat catatan §3.4. |
| Bank Soal Mitra (F9) & antarmuka unggah mitra (P2) | Skema menyediakan tempatnya (`kartu.sumber='mitra'`, `kartu.penyedia`), tetapi tidak ada endpoint yang dibangun. |
| Notifikasi dorong, mode luring penuh (P2) | Tetap P2. Service worker tetap pekerjaan sisi klien. |
| Lupa kata sandi mandiri lewat surel | Diputuskan **di luar cakupan v1 backend** dengan alasan tertulis di §5.5. Butuh konfirmasi PM (B4). |

---

## 2. Tech Stack Final

### 2.1 Tumpukan yang dipakai

Express.js (Node.js) + MySQL **sudah ditentukan PM** dan tidak diusulkan ulang.
Yang diputuskan di sini adalah semua hal di sekitarnya.

| Lapisan | Keputusan | Alasan |
|---|---|---|
| **Runtime** | **Node.js 20 LTS**, modul **CommonJS** (`require`), bukan ESM | LTS berarti dukungan keamanan sampai 2026 akhir. CommonJS dipilih karena tim sudah menulis `app.js` bergaya `var`/`function` tanpa build step; mencampur ESM/CJS adalah sumber galat impor yang tidak sebanding manfaatnya untuk proyek sebesar ini. |
| **Kerangka kerja server** | **Express 4** | Ditentukan PM. Catatan teknis: Express 4 (bukan 5) karena seluruh pustaka pendamping di bawah sudah stabil di 4, dan dokumentasi/pertanyaan daring yang akan dicari tim pemula hampir semuanya untuk 4. |
| **Basis data** | **MySQL 8**, `utf8mb4` / `utf8mb4_unicode_ci` | Ditentukan PM. `utf8mb4` wajib, bukan opsional: judul kartu dan catatan siswa akan berisi emoji dan tanda kutip miring; `utf8mb3` akan menolaknya dengan galat yang membingungkan. |
| **Akses basis data** | **`mysql2/promise` + SQL ditulis tangan**, disimpan di lapisan repositori. **Bukan ORM.** Alasan & penolakan lengkap di §2.2 | Lihat B-K5. Ringkasnya: skema di dokumen ini yang dipresentasikan untuk nilai Basis Data, dan SQL yang terlihat lebih mudah diperbaiki tim pemula daripada SQL yang disembunyikan. |
| **Migrasi skema** | Berkas SQL bernomor (`001_*.sql`, `002_*.sql`, …) + **pelari migrasi ± 60 baris** buatan sendiri, dengan tabel `_migrasi` sebagai catatan yang sudah dijalankan | Menjaga satu-satunya definisi skema tetap SQL murni yang identik dengan §3 dokumen ini. Pelarinya sengaja kecil dan bisa dibaca habis dalam satu layar. Bila kelak terasa kurang (rollback, seeding bercabang), Knex adalah jalan keluar yang tidak menuntut penulisan ulang SQL. |
| **Hash kata sandi** | **`bcryptjs` (JavaScript murni), cost 12** | Lihat §8.1. Ringkasnya: argon2id lebih kuat di atas kertas, tetapi menuntut kompilasi native (`node-gyp`) yang di Windows sering gagal untuk tim pemula — dan hash yang tidak pernah berhasil dipasang bernilai nol. Kolom hash disimpan sebagai string bertanda algoritme, jadi naik ke `bcrypt` native atau `argon2` kelak adalah penggantian pustaka, bukan migrasi data. |
| **Autentikasi** | **Token sesi acak buram (opaque) di tabel `sesi_pengguna`**, dikirim lewat header `Authorization: Bearer <token>`. **Bukan JWT, bukan cookie sesi.** Alasan lengkap §5.3 | Ringkasnya: token buram bisa dicabut seketika (JWT tidak), dan header tidak tersandung pemblokiran kuki pihak ketiga saat frontend statis dan API berada di domain berbeda (kuki tersandung). |
| **Validasi masukan** | **`zod`** — satu skema per endpoint, dipasang sebagai middleware | Validasi tulis tangan pada tim pemula selalu berakhir tidak lengkap di satu-dua endpoint, dan endpoint itulah yang jebol. `zod` kecil, tanpa build step, dan pesan galatnya bisa dipetakan langsung ke `medan` di format galat §4.2. |
| **Pembatasan laju** | **`express-rate-limit`** (per IP) + penghitung per akun di tabel `percobaan_masuk` | Dua lapis karena keduanya menjaga hal berbeda: per IP menahan banjir permintaan, per akun menahan tebak kata sandi satu orang dari banyak IP. Lihat §8.2. |
| **Header keamanan & CORS** | **`helmet`** + **`cors`** dengan daftar asal (origin) yang diizinkan **eksplisit**, bukan `*` | `cors` dengan `*` akan tampak "berhasil" saat dicoba dan menjadi lubang saat tayang. Daftar asal ditaruh di variabel lingkungan. |
| **Konfigurasi** | **`dotenv`** + berkas `src/config/env.js` yang **memvalidasi dan gagal cepat** saat variabel wajib kosong | Server yang menyala dengan `DB_PASSWORD` kosong lalu gagal pada permintaan pertama jauh lebih sulit didiagnosis daripada server yang menolak menyala dengan pesan jelas. |
| **Pengujian** | Node test runner bawaan (`node --test`), tanpa Jest/Mocha | Konsisten dengan `app/tools/validasi.js` yang sudah berjalan tanpa dependensi. Nol pustaka uji baru. |
| **Hosting** | **Belum diputuskan — memblokir (B2, §11.1)** | Asumsi biaya `rancangan-arsip-latihan-banksoal.md` §3.2 menulis **Hosting Rp 0** karena yang di-hosting hanya berkas statis. Node + MySQL yang menyala terus **tidak gratis** pada tingkat layanan yang layak. Ini konsekuensi anggaran nyata, bukan detail teknis. Lihat RB2. |

**Daftar dependensi lengkap — delapan, dan tidak lebih tanpa alasan tertulis:**
`express`, `mysql2`, `bcryptjs`, `zod`, `express-rate-limit`, `helmet`, `cors`,
`dotenv`. Setiap penambahan berikutnya wajib dicatat alasannya di
`server/README.md`.

### 2.2 ORM / query builder — trade-off dan satu rekomendasi

Ini keputusan yang paling mahal untuk dibalik, jadi ditulis lengkap.

| Pilihan | Untung | Rugi | Putusan |
|---|---|---|---|
| **`mysql2` + SQL tertulis** (di repositori) | Skema di dokumen ini = skema di kode, tanpa lapisan penerjemah. Galat SQL bisa disalin-tempel ke mesin pencari apa adanya. Nol codegen, nol build step. Langsung bisa ditunjukkan untuk nilai Basis Data. | Migrasi harus disiapkan sendiri (± 60 baris). Query berulang ditulis tangan. Risiko injeksi bila ada yang menyambung string. | ✅ **DIPILIH** |
| **Prisma** | Migrasi & tipe otomatis, DX terbaik di kelasnya. | Menambah **DSL skema kedua** (`schema.prisma`) yang menjadi sumber kebenaran tandingan terhadap §3 dokumen ini; menambah langkah `prisma generate` (build step, yang budaya proyek ini justru hindari); SQL yang dieksekusi tersembunyi — persis yang perlu ditunjukkan untuk nilai Basis Data. | ❌ Ditolak |
| **Sequelize** | Matang, banyak contoh berbahasa Indonesia. | API asosiasi (`hasMany`/`belongsToMany`, `include`) adalah sumber kebingungan nomor satu bagi pemula, dan menghasilkan query yang sulit ditebak. Menyembunyikan skema tanpa memberi keunggulan migrasi sebesar Prisma. | ❌ Ditolak |
| **Knex** | Migrasi & seed yang rapi, tetap dekat ke SQL. | Menambah satu dialek lagi yang harus dipelajari (`.where().join()`) di atas SQL yang tetap perlu dipahami. | ⚠️ **Cadangan resmi.** Bila pelari migrasi buatan sendiri terbukti merepotkan, pindah ke Knex **hanya untuk migrasi**, query tetap SQL. |

**Tiga aturan yang membuat pilihan ini aman**, dan ketiganya dijaga gerbang
(§9.4):

1. **Tidak ada SQL di luar berkas `*.repo.js`.** Rute dan layanan tidak boleh
   memuat kata `SELECT`/`INSERT`/`UPDATE`/`DELETE`.
2. **Tidak ada penyambungan string ke dalam SQL.** Semua nilai lewat placeholder
   `?` (`connection.execute`). Template literal berisi `${...}` di dalam string
   SQL menggagalkan gerbang.
3. **Setiap query atas data pribadi wajib memuat `pengguna_id`/`pemilik_id` di
   `WHERE`** (B-K4).

---

## 3. Rancangan Basis Data Gabungan

MySQL 8. Seluruh tabel `ENGINE=InnoDB DEFAULT CHARSET=utf8mb4
COLLATE=utf8mb4_unicode_ci`.

### 3.1 Cara membaca bagian ini

Kolom **Asal** menandai dari mana tiap tabel berasal:

| Tanda | Arti |
|---|---|
| **§13** | Sudah ada di model data `prd-sdd-lanjut.md` §13 — **bentuknya tidak diubah**, hanya diberi tipe MySQL dan kunci. |
| **§13+** | Sudah ada di §13, **diperluas** oleh fondasi backend ini (kolom baru ditandai jelas). |
| **LI** | Sudah dirancang di `SDD-LevelIn.md` §3.2 — **dipakai apa adanya**, tidak dirancang ulang. |
| **BARU** | Benar-benar baru, diperkenalkan oleh fondasi backend ini. |

**Konvensi id.** Dua jenis, sengaja dibedakan:

- **Konten kurasi tim** (`mapel`, `prodi`, `kartu` resmi, butir checklist, dst.)
  memakai **slug `VARCHAR(64)`** persis seperti yang sudah ada di
  `app/data/*.json` (`"matematika"`, `"k-mtk-1"`). Dengan begitu benih (§3.6)
  adalah penyalinan langsung, bukan pemetaan ulang, dan tautan/anchor di HTML
  yang sudah memakai slug tidak perlu diubah.
- **Baris milik pengguna** (`pengguna`, kartu buatan pengguna, sesi, riwayat)
  memakai **`CHAR(36)` UUID buatan klien** — syarat idempotensi
  `SDD-LevelIn.md` §4.3 no. 1.

### 3.2 Peta tabel

| Tabel | Asal | Guna |
|---|---|---|
| `pengguna` | **§13+** | Identitas, kredensial, profil (kelas, prodi tujuan) |
| `sesi_pengguna` | **BARU** | Token sesi aktif (login) |
| `percobaan_masuk` | **BARU** | Penghitung gagal login per akun (§8.2) |
| `tahapan_linimasa` | §13 | F1 |
| `butir_khusus_smk` | §13 | F2 |
| `prodi` | §13 | F3 |
| `mapel` | §13 | F3, dan pengelompokan arsip |
| `prodi_mapel` | §13 | F3 — tabel penghubung many-to-many |
| `cerita_alumni` | §13 | F4 |
| `butir_daftar_periksa` | §13 | F5 |
| `kemajuan` | §13 | F5 — centang per pengguna |
| `kartu` | **§13+** | F6 Arsip Belajar |
| `sesi_latihan` | **LI** | F7 / FL6 |
| `riwayat_latihan` | **§13+ / LI** | F7 + seluruh kalibrasi Level-In |
| `konfigurasi_levelin` | **LI** | Ambang FL3 yang bisa diubah tanpa rilis ulang |
| `kalibrasi_mapel` | **LI** | Turunan — **tidak dibuat sebagai tabel**, lihat §3.5 |
| `_migrasi` | **BARU** | Catatan migrasi yang sudah dijalankan |

### 3.3 Akun & sesi (bagian yang benar-benar baru)

#### `pengguna` — **§13+** (diperluas)

| Kolom | Tipe | Wajib | Asal | Keterangan |
|---|---|---|---|---|
| `id` | CHAR(36) PK | ya | §13 | UUID. |
| `nama_pengguna` | VARCHAR(32) **UNIQUE** | ya | **BARU** | Identitas login utama. Huruf kecil, angka, titik, garis bawah; 3–32 karakter; disimpan **huruf kecil semua** agar "Budi" dan "budi" tidak menjadi dua akun. |
| `nama_tampilan` | VARCHAR(60) | tidak | **BARU** | Untuk sapaan di Beranda. Boleh kosong → jatuh ke `nama_pengguna`. |
| `email` | VARCHAR(190) **UNIQUE**, NULL | tidak | **BARU** | **Sengaja opsional** — lihat §5.2. `NULL` diperbolehkan berkali-kali di MySQL, jadi unique tetap sah untuk yang mengisi. Panjang 190 agar muat di indeks `utf8mb4`. |
| `kata_sandi_hash` | VARCHAR(255) | ya | **BARU** | String bertanda algoritme (`$2a$12$…`). Panjang 255 supaya argon2id kelak muat tanpa migrasi. |
| `peran` | ENUM('siswa','tim') | ya | **BARU** | Bawaan `'siswa'`. `'tim'` dipakai untuk endpoint admin & setel ulang sandi (§5.5). Tidak ada tabel peran terpisah — dua peran tidak butuh tabel. |
| `status` | ENUM('aktif','nonaktif') | ya | **BARU** | Menonaktifkan tanpa menghapus data. |
| `kelas` | ENUM('10','11','12') | tidak | §13 | Sudah ada di §13. Nullable karena onboarding boleh dilewati. |
| `prodi_tujuan` | VARCHAR(64) FK → `prodi.id`, NULL | tidak | §13 | Sudah ada di §13. **Catatan pemetaan:** klien menamainya `prodi_impian` dan memakai nilai `"belum"` sebagai jawaban sah (`app/README.md`). Pemetaan `prodi_impian → prodi_tujuan` dan `"belum" → NULL` dilakukan **di satu tempat saja**, yaitu `pengguna.layanan.js`. |
| `dibuat_pada` | DATETIME | ya | §13 | UTC. |
| `terakhir_masuk_pada` | DATETIME | tidak | **BARU** | Untuk indikator awal §9 dokumen induk (pengguna aktif), bukan untuk ditampilkan ke pengguna. |
| `disetel_ulang_oleh` | CHAR(36) FK → `pengguna.id`, NULL | tidak | **BARU** | Jejak audit setel ulang sandi oleh tim (§5.5). Tanpa ini, "kok sandiku berubah" tidak bisa ditelusuri. |
| `disetel_ulang_pada` | DATETIME | tidak | **BARU** | — |

Indeks: `UNIQUE(nama_pengguna)`, `UNIQUE(email)`, `INDEX(peran, status)`.

#### `sesi_pengguna` — **BARU**

| Kolom | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | CHAR(36) PK | ya | — |
| `pengguna_id` | CHAR(36) FK → `pengguna.id` ON DELETE CASCADE | ya | — |
| `token_hash` | CHAR(64) **UNIQUE** | ya | **SHA-256 dari token**, bukan tokennya. Token asli hanya pernah ada di respons login dan di perangkat pengguna. Bila basis data bocor, isinya tidak bisa dipakai masuk. |
| `dibuat_pada` | DATETIME | ya | — |
| `kedaluwarsa_pada` | DATETIME | ya | Bawaan **+90 hari**, diperpanjang setiap pemakaian (*sliding*). Angka ini perlu konfirmasi PM (B8). |
| `terakhir_dipakai_pada` | DATETIME | ya | Dipakai untuk perpanjangan bergulir dan untuk mencabut sesi mati. |
| `dicabut_pada` | DATETIME, NULL | tidak | Diisi saat keluar. Sesi tidak dihapus supaya jejaknya tetap ada. |
| `perangkat` | VARCHAR(120), NULL | tidak | Potongan `User-Agent`, dipendekkan. Hanya untuk daftar "perangkat yang masuk" bila kelak dibuat. |

Indeks: `UNIQUE(token_hash)`, `INDEX(pengguna_id, dicabut_pada)`.

> **Catatan hash token:** SHA-256 polos **cukup dan benar di sini** — berbeda
> dengan kata sandi. Token adalah 32 byte acak dari `crypto.randomBytes`, jadi
> tidak bisa ditebak dengan kamus; yang dibutuhkan hanya fungsi searah yang
> cepat. Memakai bcrypt untuk token justru salah: ia akan memperlambat **setiap
> permintaan**, bukan hanya login.

#### `percobaan_masuk` — **BARU**

| Kolom | Tipe | Keterangan |
|---|---|---|
| `nama_pengguna` | VARCHAR(32) PK | Disimpan apa adanya walau akunnya tidak ada — supaya penyerang tidak bisa membedakan akun ada/tidak dari perilaku pembatasan. |
| `jumlah_gagal` | SMALLINT | Direset ke 0 saat berhasil masuk. |
| `terkunci_sampai` | DATETIME, NULL | Diisi setelah ambang tercapai (§8.2). Selalu **sementara** — tidak ada penguncian permanen. |
| `terakhir_gagal_pada` | DATETIME | — |

### 3.4 Tabel P0 — dari §13, bentuknya tidak berubah

Semuanya sudah ada di §13 `prd-sdd-lanjut.md`. Yang ditambahkan di sini hanya
**tipe MySQL, kunci, dan kolom metadata sumber** yang memang **sudah
diwajibkan** oleh prinsip §12 dokumen induk ("setiap potongan konten wajib
punya kolom `sumber`, `pemilik`, dan `diperiksa_pada` sejak versi pertama") dan
oleh aturan data di `app/README.md`.

**Kolom metadata sumber yang melekat pada semua tabel konten** (`tahapan_linimasa`,
`butir_khusus_smk`, `mapel`, `prodi`, `cerita_alumni`, `butir_daftar_periksa`,
`kartu`):

| Kolom | Tipe | Keterangan |
|---|---|---|
| `sumber` | ENUM('resmi','pengguna','mitra') | Kelas kepercayaan — `rancangan-arsip-latihan-banksoal.md` §1. |
| `pemilik` | VARCHAR(64) | Siapa yang mengkurasi (`"tim"`, nama mitra). Untuk kartu pengguna, lihat `pemilik_id`. |
| `status_verifikasi` | ENUM('belum_diverifikasi','terverifikasi') | Bawaan `'belum_diverifikasi'`. |
| `asal` | VARCHAR(32) | `'mockup'`, `'contoh'`, `'resmi'` — sama seperti berkas JSON sekarang. |
| `url_sumber` | VARCHAR(500), NULL | Artinya **tempat memverifikasi**, bukan tempat data diambil (`app/README.md`). |
| `diperiksa_pada` | DATE, NULL | **NULL sampai ada manusia yang benar-benar mencocokkan.** Aturan `app/README.md` berlaku penuh di basis data: mengisi kolom ini tanpa verifikasi nyata adalah pelanggaran, bukan kerapian. |

| Tabel | Kolom kunci | Catatan |
|---|---|---|
| `tahapan_linimasa` | `id` VARCHAR(64) PK, `judul` VARCHAR(200), `tanggal_mulai` DATE, `tanggal_selesai` DATE NULL, `jalur` ENUM('TKA','SNBP','SNBT') | + metadata sumber. Indeks `(tanggal_mulai)` untuk "tenggat terdekat" F1. |
| `butir_khusus_smk` | `id` VARCHAR(64) PK, `judul`, `apa_yang_beda` TEXT, `apa_yang_bisa_dilakukan` TEXT, `urutan` SMALLINT | + metadata sumber. |
| `prodi` | `id` VARCHAR(64) PK, `nama` VARCHAR(120), `rumpun` VARCHAR(60) | — |
| `mapel` | `id` VARCHAR(64) PK, `nama` VARCHAR(120), `tersedia_di_smk` TINYINT(1) | `tersedia_di_smk` adalah inti F3. |
| `prodi_mapel` | PK gabungan `(prodi_id, mapel_id)`, `bobot` TINYINT | **Jantung F3** dan contoh many-to-many terbaik untuk deck Basis Data (§13 dokumen induk menyebutnya eksplisit). FK ke keduanya, `ON DELETE CASCADE`. |
| `cerita_alumni` | `id` VARCHAR(64) PK, `nama`, `asal_smk`, `jurusan_smk`, `ptn`, `prodi`, `jalur`, `hambatan` TEXT, `yang_dilakukan` TEXT, `izin_tayang` TINYINT(1), `tayang` TINYINT(1) | **`izin_tayang` bawaan 0.** PRD F4 mewajibkan izin tertulis sebelum tayang; endpoint publik **wajib** menyaring `izin_tayang=1 AND tayang=1` (§4.4). |
| `butir_daftar_periksa` | `id` VARCHAR(64) PK, `judul`, `urutan` SMALLINT, `berlaku_untuk_kelas` VARCHAR(20), `berlaku_untuk_jalur` VARCHAR(30) | Penyaringan dilakukan di server agar cocok dengan AC F5. |
| `kemajuan` | PK gabungan `(pengguna_id, butir_id)`, `selesai_pada` DATETIME NULL | Baris ada = pernah dicentang; `selesai_pada` NULL = dicentang lalu dibatalkan. Menyimpan barisnya (bukan menghapus) membuat penyatuan dua perangkat deterministik (§6.4). |

#### `kartu` — **§13+**

| Kolom | Tipe | Wajib | Asal | Keterangan |
|---|---|---|---|---|
| `id` | VARCHAR(64) PK | ya | §13 | Slug untuk kartu resmi (`k-mtk-1`), UUID untuk kartu pengguna. |
| `pemilik_id` | CHAR(36) FK → `pengguna.id`, NULL | tidak | §13 | **NULL untuk kartu resmi/mitra** (persis seperti `arsip.json` sekarang). Terisi untuk kartu pengguna — **inilah pagar privasi**, lihat §8.4. |
| `mapel_id` | VARCHAR(64) FK → `mapel.id` | ya | §13 | — |
| `judul` | VARCHAR(200) | ya | §13 | — |
| `isi` | TEXT | ya | §13 | — |
| `jawaban` | TEXT, NULL | tidak | §13 | NULL = kartu catatan, bukan soal. |
| `sumber` | ENUM('resmi','pengguna','mitra') | ya | §13 | — |
| `penyedia` | VARCHAR(120), NULL | tidak | **BARU** | Hanya untuk `sumber='mitra'` (F9: identitas penyedia wajib tampil). Disiapkan, tidak dipakai v1. |
| `dibuat_pada` | DATETIME | ya | §13 | — |
| `diubah_pada` | DATETIME | ya | **BARU** | Dibutuhkan penyelesaian konflik sinkronisasi (§6.4): kartu **bisa** disunting, jadi tidak bisa disatukan seperti catatan append-only. |
| `dihapus_pada` | DATETIME, NULL | tidak | **BARU** | **Hapus lunak.** Tanpa ini, kartu yang dihapus di HP A akan "hidup lagi" saat HP B menyinkronkan. |

Indeks: `(pemilik_id, mapel_id)`, `(sumber, mapel_id)`, `(pemilik_id, dihapus_pada)`.

> **Catatan yang sengaja tidak dilakukan.** Kolom `pengguna.paket`/`berlangganan`
> **tidak** ditambahkan sekarang, walaupun terlihat "sekalian saja". Alasannya
> sama dengan alasan `kartu.sumber` justru **ditambahkan** lebih dulu: kolom
> ditambahkan sejak awal hanya bila menambahkannya belakangan akan menuntut
> **penulisan ulang model data**. Menambah satu kolom paket ke `pengguna`
> kelak adalah satu `ALTER TABLE` tanpa data yang perlu diisi ulang — beda
> dengan `kartu.sumber` yang menentukan bagaimana **setiap baris** dibaca.
> Konsisten dengan `SDD-LevelIn.md` §10.1: `hakAkses()` tidak dibangun di v1.

### 3.5 Tabel Level-In — dari `SDD-LevelIn.md` §3.2, dipakai apa adanya

**Tidak ada satu pun keputusan di bawah yang dibuat oleh dokumen ini.** Yang
ditambahkan hanya pemetaan ke tipe MySQL dan penempatan kunci asing.

#### `riwayat_latihan` — **§13+ / LI**

Bentuk final = §13 (`id`, `pengguna_id`, `kartu_id`, `benar`, `dijawab_pada`)
**ditambah** perluasan `SDD-LevelIn.md` §3.2:

| Kolom | Tipe MySQL | Wajib | Asal |
|---|---|---|---|
| `id` | CHAR(36) PK | ya | §13 — **dibuat klien**, kunci idempotensi |
| `pengguna_id` | CHAR(36) FK → `pengguna.id` | ya | §13 |
| `kartu_id` | VARCHAR(64) FK → `kartu.id` **ON DELETE SET NULL**, NULL | tidak | §13 (dilonggarkan) |
| `benar` | TINYINT(1) | ya | §13 |
| `dijawab_pada` | DATETIME | ya | §13 |
| `sesi_id` | CHAR(36) FK → `sesi_latihan.id`, NULL | tidak | LI |
| `keyakinan` | TINYINT `CHECK (keyakinan BETWEEN 1 AND 5)`, NULL | tidak | LI — **NULL = tanpa data kalibrasi**, bukan keyakinan terendah |
| `mapel_id` | VARCHAR(64) FK → `mapel.id`, NULL | tidak | LI — denormalisasi disengaja |
| `gap_numerik` | DECIMAL(3,2), NULL | tidak | LI — turunan, boleh di-cache |
| `kelas_gap` | ENUM('overconfident','underconfident','selaras','netral'), NULL | tidak | LI — turunan, **bukan** sumber kebenaran |
| `aturan_versi` | SMALLINT, NULL | tidak | LI |

Indeks (persis yang diminta `SDD-LevelIn.md` §3.2):
`(pengguna_id, mapel_id, dijawab_pada DESC)` dan `(sesi_id)`.

> **Kenapa `kartu_id` menjadi `ON DELETE SET NULL` dan nullable.** Karena
> `SDD-LevelIn.md` §6.6 mensyaratkan: "Kartu dihapus setelah dijawab → catatan
> tetap ada karena `mapel_id` sudah disalin." FK yang kaku (`RESTRICT` atau
> `CASCADE`) akan melanggar syarat itu — `CASCADE` menghapus riwayatnya,
> `RESTRICT` membuat pengguna tidak bisa menghapus kartunya sendiri. Ini
> **penerapan** keputusan yang sudah ada, bukan keputusan baru.

#### `sesi_latihan` — **LI**

| Kolom | Tipe MySQL | Wajib |
|---|---|---|
| `id` | CHAR(36) PK | ya |
| `pengguna_id` | CHAR(36) FK → `pengguna.id` | ya |
| `dimulai_pada` | DATETIME | ya |
| `selesai_pada` | DATETIME, NULL | tidak (NULL = sesi ditinggalkan, **sah**) |
| `jumlah_kartu_direncanakan` | SMALLINT | ya |
| `mapel_fokus_id` | VARCHAR(64) FK → `mapel.id`, NULL | tidak |
| `asal_mula` | ENUM('beranda_saran','arsip','arsip_detail') | ya |

#### `konfigurasi_levelin` — **LI**

| Kolom | Tipe MySQL |
|---|---|
| `kunci` | VARCHAR(64) PK |
| `nilai` | VARCHAR(120) |
| `versi` | SMALLINT |
| `dasar` | TEXT (wajib diisi) |
| `diubah_pada` | DATETIME |

#### `kalibrasi_mapel` — **LI, turunan — TIDAK dibuat sebagai tabel**

`SDD-LevelIn.md` §3.2 mengizinkan bentuk VIEW **atau** tabel ringkas yang
dibangun ulang. Untuk fondasi ini dipilih **dihitung saat diminta**, bukan
disimpan:

- Volumenya sangat kecil (jendela 50 catatan × ≤ 10 mapel per pengguna).
- Menyimpannya berarti punya cache yang bisa basi persis pada saat ambang
  dikalibrasi ulang — hal yang keputusan K2 `SDD-LevelIn.md` justru hindari.
- Ambang berasal dari `konfigurasi_levelin` yang bisa berubah kapan saja; nilai
  turunan yang tersimpan akan mencampur dua versi ambang tanpa gejala.

Bila kelak terbukti lambat (tidak diharapkan pada skala puluhan–ratusan
pengguna), ia dinaikkan menjadi tabel ringkas berkolom `konfig_versi` persis
seperti yang sudah dirancang di `SDD-LevelIn.md` §3.2 — tanpa perubahan bentuk
keluaran API.

### 3.6 Migrasi & benih

```
server/src/db/migrasi/
  001_pengguna_dan_sesi.sql     pengguna, sesi_pengguna, percobaan_masuk, _migrasi
  002_konten_p0.sql             tahapan_linimasa, butir_khusus_smk, prodi, mapel,
                                prodi_mapel, cerita_alumni, butir_daftar_periksa
  003_kemajuan.sql              kemajuan  (F5)
  004_kartu.sql                 kartu     (F6)
  005_levelin.sql               sesi_latihan, riwayat_latihan, konfigurasi_levelin
server/src/db/benih/
  benih.js                      membaca app/data/*.json → INSERT ... ON DUPLICATE KEY UPDATE
```

Tiga aturan yang mengikat:

1. **Migrasi hanya maju, tidak pernah disunting setelah dijalankan di server
   tayang.** Perbaikan = berkas baru bernomor lebih tinggi.
2. **Benih membaca `app/data/*.json`, tidak menyalin isinya ke berkas SQL.**
   Dengan begitu berkas JSON tetap menjadi satu-satunya tempat konten diedit
   selama Panel Admin belum ada, dan gerbang aturan data `tools/check.js` yang
   sudah berjalan tetap menjaganya.
3. **Benih membawa metadata apa adanya**, termasuk `status_verifikasi:
   'belum_diverifikasi'` dan `diperiksa_pada: NULL`. Benih **dilarang**
   "merapikan" nilai-nilai itu (`app/README.md`, aturan 1).

### 3.7 Relasi

```
pengguna 1 ──< sesi_pengguna
   │
   ├──< kemajuan >── 1 butir_daftar_periksa
   │
   ├──< kartu (pemilik_id)  ──> 1 mapel
   │
   ├──< sesi_latihan 1 ──< riwayat_latihan >── 1 kartu
   │                              │                │
   │                              └── mapel_id ────┘  (salinan, disengaja)
   │                              │
   │                  (agregasi, dihitung saat diminta — bukan tabel)
   │                              ▼
   │                       kalibrasi_mapel
   │
   └──> 1 prodi (prodi_tujuan)

prodi >──< prodi_mapel >──< mapel      ← many-to-many, jantung F3
```

---

## 4. Rancangan API

### 4.1 Aturan umum

| Hal | Keputusan |
|---|---|
| Base path | **`/api/v1`**. Versi ada sejak hari pertama; menambahkannya belakangan berarti memutus klien yang sudah tayang. |
| Format | JSON masuk & keluar, `Content-Type: application/json`. |
| Waktu | **Selalu UTC ISO-8601** (`2026-09-12T04:12:33.000Z`), tanpa kecuali — sama seperti `dibuat_pada` di klien. |
| Autentikasi | Header `Authorization: Bearer <token>` (§5.3). Tidak ada kuki. |
| CORS | Daftar asal eksplisit dari `ASAL_DIIZINKAN`. Tidak pernah `*`. |
| Idempotensi | `POST` yang membawa `id` buatan klien wajib idempoten (`INSERT ... ON DUPLICATE KEY UPDATE` atau `INSERT IGNORE`) — `SDD-LevelIn.md` §4.3 no. 1. |
| Paginasi | Belum dipakai. Semua daftar di v1 berukuran puluhan baris. Bila nanti perlu, ditambahkan sebagai `?halaman=&per_halaman=` tanpa mengubah bentuk `data`. |

### 4.2 Bentuk respons — sama untuk semua endpoint

**Sukses**

```json
{ "ok": true, "data": { }, "meta": { } }
```

**Galat**

```json
{
  "ok": false,
  "galat": {
    "kode": "KREDENSIAL_SALAH",
    "pesan": "Nama pengguna atau kata sandi tidak cocok.",
    "medan": { "kata_sandi": "wajib diisi" }
  }
}
```

> **Aturan yang mengikat klien, dan mudah dilanggar:** `galat.pesan`
> **tidak boleh ditampilkan langsung ke pengguna.** Klien memetakan
> `galat.kode` → kalimat dari `docs/salinan-teks-lanjut.md`. Alasannya bukan
> gaya: DoD §15 dokumen induk mewajibkan seluruh teks berasal dari dokumen
> salinan teks, dan `tools/test-desain.js` memeriksanya. `pesan` dari server
> adalah untuk log dan pengembang.

Kode galat yang sudah dikunci: `VALIDASI_GAGAL`, `KREDENSIAL_SALAH`,
`TIDAK_MASUK`, `SESI_KEDALUWARSA`, `TIDAK_BERHAK`, `TIDAK_DITEMUKAN`,
`NAMA_PENGGUNA_DIPAKAI`, `TERLALU_SERING`, `GALAT_SERVER`.

Pemetaan status HTTP: `400` validasi · `401` belum/sesi habis · `403` tidak
berhak · `404` tidak ditemukan · `409` bentrok · `429` terlalu sering ·
`500` galat server.

### 4.3 Autentikasi & akun

| Metode & jalur | Auth | Guna | Catatan |
|---|---|---|---|
| `POST /api/v1/auth/daftar` | — | Registrasi | Body: `nama_pengguna`, `kata_sandi`, `nama_tampilan?`, `email?`, `kelas?`, `prodi_impian?`. Mengembalikan token + profil, **langsung masuk** (tidak menyuruh login lagi — satu langkah lebih sedikit di layar terkecil). |
| `POST /api/v1/auth/masuk` | — | Login | Body: `nama_pengguna`, `kata_sandi`. Dibatasi laju berlapis (§8.2). |
| `POST /api/v1/auth/keluar` | ✔ | Logout | Mencabut **token yang dipakai saja**. |
| `POST /api/v1/auth/keluar-semua` | ✔ | Keluar dari semua perangkat | Mencabut seluruh `sesi_pengguna` milik pengguna. Dipakai juga otomatis setelah ganti sandi. |
| `GET /api/v1/auth/saya` | ✔ | Profil pengguna berjalan | Dipanggil klien sekali saat memuat, untuk tahu masih masuk atau tidak. Tidak pernah mengembalikan hash. |
| `PATCH /api/v1/pengguna/saya` | ✔ | Ubah `kelas`, `prodi_tujuan`, `nama_tampilan` | Pintu profil onboarding untuk pengguna berakun. |
| `POST /api/v1/auth/ubah-sandi` | ✔ | Ganti kata sandi | Wajib menyertakan sandi lama. Sukses → seluruh sesi lain dicabut. |
| ~~`POST /api/v1/auth/lupa-sandi`~~ | — | **Tidak dibangun di v1** | Lihat §5.5 dan pertanyaan terbuka B4. |

### 4.4 Konten (publik, hanya baca)

Tidak butuh login — sesuai B-K1, aplikasi harus tetap berguna bagi pengunjung
tanpa akun.

| Metode & jalur | Guna |
|---|---|
| `GET /api/v1/konten/linimasa` | F1. Diurutkan `tanggal_mulai ASC`; server ikut mengirim `diperiksa_pada` dan `status_verifikasi` supaya klien bisa menampilkan peringatan wajib. |
| `GET /api/v1/konten/khusus-smk` | F2 |
| `GET /api/v1/konten/prodi` | F3 |
| `GET /api/v1/konten/mapel` | F3 & pengelompokan arsip |
| `GET /api/v1/konten/prodi/{id}/mapel` | F3 — hasil gabungan `prodi_mapel`, sudah terurut `bobot DESC` |
| `GET /api/v1/konten/cerita-alumni` | F4 — **wajib** menyaring `izin_tayang=1 AND tayang=1`. Penyaringan ini ada di repositori, bukan di rute, supaya tidak bisa terlewat. |
| `GET /api/v1/konten/checklist` | F5 — dapat disaring `?kelas=&jalur=` |

### 4.5 Data pribadi (wajib login)

| Metode & jalur | Guna | Catatan otorisasi |
|---|---|---|
| `GET /api/v1/kemajuan` | F5 — centang milik sendiri | `WHERE pengguna_id = ?` |
| `PUT /api/v1/kemajuan/{butir_id}` | Menandai selesai | Idempoten (`ON DUPLICATE KEY UPDATE`) |
| `DELETE /api/v1/kemajuan/{butir_id}` | Membatalkan centang | Menyetel `selesai_pada = NULL`, **tidak** menghapus baris (§6.4) |
| `GET /api/v1/kartu?mapel=&sumber=` | Daftar kartu | Mengembalikan kartu `sumber='resmi'` **+** kartu milik sendiri. **Tidak pernah** kartu milik orang lain. |
| `POST /api/v1/kartu` | Tambah kartu pengguna | Server **memaksa** `sumber='pengguna'` dan `pemilik_id = pengguna berjalan`. Nilai `sumber` dari body **diabaikan** — bukan divalidasi, tapi diabaikan. |
| `PATCH /api/v1/kartu/{id}` | Sunting kartu sendiri | `WHERE id = ? AND pemilik_id = ?` |
| `DELETE /api/v1/kartu/{id}` | Hapus kartu sendiri | Hapus lunak (`dihapus_pada`) |
| `POST /api/v1/sinkron/klaim` | Mengunggah data mode tamu sekali | §6.3 |

> **Kartu resmi tidak bisa disunting/dihapus lewat API ini sama sekali** — tidak
> ada jalurnya, bukan hanya "tidak diizinkan". Kurasi tim masuk lewat benih
> (§3.6), dan kelak lewat Panel Admin bila PM memutuskan membangunnya (B7).

### 4.6 Level-In — endpoint dari `SDD-LevelIn.md` §4.2, diintegrasikan

Tabel berikut **tidak merancang ulang apa pun**. Kolom "Perubahan" hanya
mencatat penyesuaian agar seragam dengan §4.1–§4.2 dokumen ini.

| Metode & jalur (final) | Asal | Perubahan dari `SDD-LevelIn.md` §4.2 |
|---|---|---|
| `POST /api/v1/sesi-latihan` | LI | Hanya awalan `/api/v1` + wajib `Authorization`. Body, semantik, dan `id` buatan klien **tidak berubah**. |
| `PATCH /api/v1/sesi-latihan/{id}` | LI | Sama. Sesi yang tidak pernah ditutup tetap **sah, bukan galat**. |
| `POST /api/v1/riwayat-latihan` | LI | Sama. Borongan, idempoten per `id`, menerima `keyakinan: null`. |
| `GET /api/v1/kalibrasi/ringkasan?jendela=50` | LI | Sama. Tetap mengembalikan `belum_cukup_data` **secara eksplisit**, tidak pernah menghilangkan mapelnya. |
| `GET /api/v1/saran-harian` | LI | Sama. `jenis` persis lima nilai rantai fallback `SDD-LevelIn.md` §6.1f. |
| `GET /api/v1/konfigurasi/levelin` | LI | Sama. **Boleh diakses tanpa login** — isinya ambang, bukan data pribadi, dan klien mode tamu pun membutuhkannya. |

Empat aturan `SDD-LevelIn.md` §4.3 berlaku penuh dan diulang di sini karena
mudah dilanggar saat implementasi:

1. Idempotensi berdasarkan `riwayat_latihan.id` buatan klien — **wajib**.
2. Server **tidak pernah** menerima `kelas_gap` atau `rate` dari klien. Bila
   badan permintaan memuatnya, nilainya **diabaikan** dan dihitung ulang.
3. **Tidak ada endpoint Level-In yang menyentuh tabel `kartu`.** Level-In tidak
   boleh menjadi jalan verifikasi/publikasi kartu pengguna.
4. Bentuk catatan tidak berubah dari `localStorage`; satu-satunya pemetaan
   (`waktu` → `dijawab_pada`) terjadi di satu tempat.

---

## 5. Akun & Autentikasi

### 5.1 Siapa penggunanya, dan apa artinya untuk rancangan

Siswa SMK kelas 11–12, memakai HP, sering berganti perangkat/berbagi perangkat,
dan **belum tentu punya atau membuka surel**. Tiga konsekuensi langsung:

1. Alur pendaftaran harus muat di satu layar dan selesai dalam belasan detik.
2. Verifikasi surel tidak boleh menjadi syarat masuk — kalau ya, sebagian
   pengguna berhenti di sana, dan T5 (≥50 pengguna nyata) ikut terpukul.
3. Pemulihan akun tidak bisa mengandalkan surel yang tidak ada (§5.5).

### 5.2 Identitas login — rekomendasi

**Rekomendasi: `nama_pengguna` + kata sandi sebagai kredensial utama; `email`
opsional (boleh NULL, unik bila diisi).**

| Pilihan | Untung | Rugi |
|---|---|---|
| **Username** (dipilih) | Nol gesekan; tidak butuh surel; tidak butuh verifikasi; siswa tanpa surel tetap bisa memakai. | Tidak ada jalur pemulihan mandiri (§5.5). Bentrok nama lebih sering. |
| Email wajib | Pemulihan sandi mandiri jadi mungkin. | Butuh layanan pengiriman surel (biaya + kerumitan pengiriman), verifikasi, dan menaikkan gesekan pendaftaran tepat di titik paling rawan ditinggalkan. |
| Tanpa akun / kode perangkat | Nol gesekan mutlak. | Tidak menyelesaikan masalah yang jadi alasan backend ini ada (data hilang saat ganti HP). |

Aturan `nama_pengguna`: 3–32 karakter, `a-z 0-9 . _`, disimpan huruf kecil,
unik. Kata sandi: **minimal 8 karakter**, tanpa aturan "harus ada simbol dan
angka" — aturan komposisi terbukti mendorong sandi yang mudah ditebak dan
ditulis di buku catatan. Yang dipakai justru: panjang minimum + daftar tolak
sandi paling umum (`12345678`, `password`, `qwerty123`, dan nama aplikasi).

### 5.3 Mekanisme sesi — JWT vs kuki vs token buram

**Rekomendasi: token acak buram (32 byte dari `crypto.randomBytes`, dikirim
base64url), disimpan ter-hash di `sesi_pengguna`, dibawa di header
`Authorization: Bearer`. Klien menyimpannya di `localStorage`.**

| Pilihan | Kenapa tidak / kenapa ya |
|---|---|
| **Token buram + tabel sesi** ✅ | **Bisa dicabut seketika** — "keluar" benar-benar keluar, dan ganti sandi benar-benar memutus perangkat lain. Berjalan lintas domain tanpa menyentuh urusan kuki pihak ketiga. Tidak butuh pustaka, tidak butuh kunci penanda tangan yang bisa bocor. Biayanya satu query indeks unik per permintaan — tidak berarti pada skala puluhan–ratusan pengguna. |
| JWT (`jsonwebtoken`) ❌ | Keunggulan JWT adalah verifikasi **tanpa** menyentuh basis data — nilai yang baru terasa pada skala banyak server. Di sini basis data disentuh setiap permintaan untuk hal lain juga, jadi keunggulannya nol. Yang tersisa justru kerugiannya: **token tidak bisa dicabut** sampai kedaluwarsa, sehingga "keluar" hanya menghapus token di perangkat sambil tokennya tetap sah di tangan siapa pun yang menyalinnya. Menambal itu butuh daftar cabut — yaitu tabel sesi, yang berarti kembali ke pilihan pertama dengan tambahan kerumitan. |
| Kuki sesi (`HttpOnly`) ❌ | Secara keamanan paling baik (kebal pencurian lewat XSS) dan akan **dipilih** bila frontend dan API satu asal. Tetapi rencana yang paling mungkin adalah frontend statis di satu domain dan API di domain lain — dan kuki lintas situs menuntut `SameSite=None; Secure`, terkena pembatasan kuki pihak ketiga peramban modern, serta menambah urusan CSRF. Untuk tim pemula, itu kelas kegagalan yang muncul **hanya saat tayang**, bukan saat dicoba di localhost. |

**Risiko yang diterima secara sadar:** token di `localStorage` bisa dicuri lewat
XSS. Yang menahannya: aturan render yang **sudah** berlaku di `app.js` — JavaScript
hanya boleh mengisi slot `[data-isi]` dan menyalakan/mematikan `[hidden]`,
**tidak pernah merakit markup dari teks**. Selama aturan itu dijaga
(`tools/test-app.js` kontrak selector), permukaan XSS-nya sangat kecil. Ditambah
`helmet` dengan `Content-Security-Policy` yang melarang skrip sebaris.

**Bila kelak frontend dan API disatukan dalam satu asal** (Express menyajikan
`app/` sebagai berkas statis — dan ini disarankan bila hosting memungkinkan,
lihat B2), pindah ke kuki `HttpOnly` adalah perubahan kecil: bentuk tabel
`sesi_pengguna` sama persis, yang berubah hanya cara token dibawa.

**Umur sesi:** kedaluwarsa 90 hari, diperpanjang setiap pemakaian. Alasannya
sesuai pola pakai: siswa memakai aplikasi beberapa kali seminggu selama satu
musim pendaftaran; memaksa login ulang tiap minggu akan mengubah aplikasi
"buka-lihat-tenggat" menjadi aplikasi "buka-login-lihat-tenggat" dan merusak
Alur B (≤15 detik) di §14 dokumen induk. Angka 90 hari perlu konfirmasi PM (B8).

### 5.4 Alur registrasi & login

```
DAFTAR
  klien  → POST /api/v1/auth/daftar { nama_pengguna, kata_sandi, ... }
  server → validasi zod (panjang, format, daftar sandi terlarang)
         → cek nama_pengguna sudah dipakai?  → 409 NAMA_PENGGUNA_DIPAKAI
         → hash = bcryptjs.hash(kata_sandi, 12)
         → INSERT pengguna
         → buat token acak; simpan SHA-256-nya di sesi_pengguna
         → 201 { token, kedaluwarsa_pada, pengguna }
  klien  → simpan token di localStorage['lanjut.auth.v1']
         → tawarkan klaim data tamu (§6.3) bila ada data lokal

MASUK
  klien  → POST /api/v1/auth/masuk { nama_pengguna, kata_sandi }
  server → batas laju per IP  → 429 TERLALU_SERING
         → cek percobaan_masuk.terkunci_sampai → 429
         → ambil pengguna; SELALU jalankan bcrypt.compare
              (juga saat akun tidak ada, terhadap hash boneka —
               supaya lama respons tidak membocorkan akun mana yang ada)
         → cocok?  ya → reset percobaan_masuk, buat sesi, 200 { token, pengguna }
                   tidak → percobaan_masuk++, 401 KREDENSIAL_SALAH
```

### 5.5 Lupa kata sandi — **di luar cakupan v1 backend**

**Keputusan (butuh konfirmasi PM — B4): pemulihan mandiri lewat surel TIDAK
dibangun di v1 backend.** Dinyatakan eksplisit di sini supaya tidak dianggap
kelalaian:

Alasannya: pemulihan lewat surel menuntut layanan pengiriman surel (biaya,
pendaftaran domain pengirim, urusan pesan masuk ke folder spam), tabel token
sekali pakai, dan halaman UI tersendiri — sementara §5.2 justru memutuskan surel
**opsional**, sehingga sebagian pengguna tidak punya alamat untuk dikirimi.

**Gantinya untuk v1 — setel ulang oleh tim:**

- Endpoint `POST /api/v1/admin/pengguna/{id}/setel-ulang-sandi`, hanya untuk
  `peran='tim'`, menghasilkan kata sandi sementara yang disampaikan langsung ke
  siswa.
- Wajib mencatat `disetel_ulang_oleh` dan `disetel_ulang_pada` (§3.3) — tanpa
  jejak ini, kemampuan tim mengganti sandi siswa adalah kewenangan tanpa
  pengawasan.
- Seluruh sesi pengguna itu dicabut otomatis.

**Konsekuensi yang harus disadari PM:** ini menciptakan beban dukungan manual,
dan pada skala 50–150 pengguna itu **masih realistis**. Di atas itu, tidak.
Karena itu B4 di §11.1 meminta keputusan: apakah pemulihan lewat surel
dijadwalkan sebelum penyebaran luas.

---

## 6. Alur Data Utama

### 6.1 Prinsip lintas alur

Klien selalu menjalankan urutan yang sama, dan **urutannya menentukan apakah
aplikasi terasa cepat atau menggantung**:

```
1. Baca/tulis localStorage   → layar terisi SEKARANG
2. Render
3. (bila punya token) panggil API di latar
4. Ada hasil?  → perbarui localStorage → render ulang bagian yang berubah
   Gagal?      → diam. Tidak ada layar galat. Coba lagi nanti.
```

Kegagalan jaringan **tidak pernah** menjadi layar galat di alur normal. Yang
ditampilkan hanyalah penanda status sinkron yang tenang (§7.2).

> **Diperbarui 27 Sep 2026:** urutan di atas turunan B-K2 dan hanya berlaku
> untuk MVP-PWA. LANJUT_App (Expo) membaca dan menulis langsung ke API: saat
> memuat tampil penanda memuat, dan bila gagal tampil keadaan galat ("Sedang
> tidak tersambung…"). Centang ditulis optimistis lalu dibatalkan bila server
> menolak. Ini keputusan final online-first (LANJUT_016), bukan utang teknis.

### 6.2 Alur A — Pengguna baru tanpa akun (mode tamu, bawaan)

```
Buka tautan → onboarding.html → tulis lanjut.profil.v1 (localStorage)
→ beranda.html: F1 dari data/*.json (atau /api/v1/konten/linimasa bila daring)
→ semua fitur P0 jalan penuh, TANPA satu pun panggilan yang butuh login
```

Tidak ada layar login yang menghalangi. Ajakan membuat akun muncul sebagai satu
baris tenang di halaman Akun dan (opsional) setelah sesi latihan pertama —
**bukan** sebagai pintu masuk.

### 6.3 Alur B — Tamu membuat akun & mengklaim datanya (sekali seumur akun)

```
Pengguna menekan "Simpan & sinkronkan" → daftar.html
  → POST /api/v1/auth/daftar  → token
  → klien memeriksa localStorage:
       lanjut.profil.v1        (kelas, prodi)
       lanjut.checklist.v1     (kemajuan F5)
       lanjut.levelin.v1       (riwayat kalibrasi — SDD-LevelIn §3.3)
       kartu buatan pengguna   (bila ada)
  → ADA data → tampilkan konfirmasi "Bawa catatanmu ke akun ini?"
       ya    → POST /api/v1/sinkron/klaim  { profil, kemajuan[], peristiwa[], kartu[] }
       tidak → mulai bersih; data lokal TIDAK dihapus (masih bisa diklaim nanti)
  → server: seluruhnya idempoten per id/kunci gabungan; menolak baris yang
            sudah dimiliki pengguna lain (TIDAK_BERHAK), tidak pernah memindahkan
            kepemilikan
  → tandai lanjut.auth.v1.klaim_selesai = true
```

Tiga hal yang dikunci di alur ini:

1. **Klaim bersifat sekali dan eksplisit.** Tidak ada penggabungan diam-diam:
   HP yang dipakai bergantian oleh dua siswa tidak boleh membuat riwayat satu
   orang masuk ke akun orang lain.
2. **Data lokal tidak dihapus setelah klaim.** Ia menjadi cadangan sampai
   pengguna benar-benar keluar. Menghapus lebih dulu adalah cara paling cepat
   kehilangan data seseorang karena satu permintaan yang setengah gagal.
3. **Idempoten.** Klaim yang diulang (koneksi putus di tengah) tidak
   menggandakan apa pun — dijamin `id` buatan klien.

> **Diperbarui 27 Sep 2026:** alur klaim ini bergantung pada data yang ditulis
> lokal lebih dulu (B-K2). Tidak berlaku untuk LANJUT_App: tidak ada mode tamu
> dan tidak ada data lokal untuk diklaim, karena semua data langsung ditulis
> ke akun. Di MVP-PWA, `POST /sinkron/klaim` juga belum pernah dipanggil
> (lihat komentar di `MVP-PWA/daftar.html`). Endpoint-nya tetap ada di server.

### 6.4 Alur C — Sinkronisasi berjalan & penyatuan dua perangkat

Tiga jenis data, tiga aturan penyatuan yang berbeda — dan perbedaan ini
disengaja:

| Data | Sifat | Aturan penyatuan |
|---|---|---|
| `riwayat_latihan`, `sesi_latihan` | **Append-only, fakta** | **Gabungan (union) berdasarkan `id`.** Bebas konflik: dua perangkat tidak pernah menghasilkan dua versi berbeda dari catatan yang sama. |
| `kemajuan` (checklist F5) | Kumpulan, bisa dibatalkan | Kunci `(pengguna_id, butir_id)`. `selesai_pada` **paling awal yang bukan NULL** menang; pembatalan menang hanya bila `diubah_pada`-nya lebih baru. Baris tidak pernah dihapus, supaya "belum pernah dicentang" dan "dicentang lalu dibatalkan" tetap bisa dibedakan. |
| `kartu` milik pengguna | Bisa disunting & dihapus | **Tulisan terbaru menang** berdasarkan `diubah_pada`. Penghapusan adalah hapus lunak (`dihapus_pada`), sehingga penghapusan menyebar ke perangkat lain, bukan dibatalkan olehnya. |
| `profil` (kelas, prodi) | Nilai tunggal | Tulisan terbaru menang. |

**Kapan sinkronisasi dijalankan:** saat halaman dimuat (bila ada token), dan
setelah sesi latihan selesai. **Bukan** setiap kartu dijawab — itu akan
mengubah sesi latihan menjadi rentetan permintaan jaringan dan melanggar
B-K2.

> **Diperbarui 27 Sep 2026:** jadwal sinkronisasi di atas hanya relevan untuk
> klien yang menulis lokal lebih dulu (B-K2, MVP-PWA), dan belum ada klien
> yang memanggil `/sinkron`. LANJUT_App menulis tiap perubahan langsung ke
> endpoint-nya (mis. `PUT`/`DELETE /kemajuan/:butirId` per centang), jadi
> tidak ada data lokal yang perlu disatukan. Aturan penyatuan di tabel tetap
> berlaku sebagai perilaku server untuk `/sinkron`.

### 6.5 Alur D — Permintaan terautentikasi (setiap kali)

```
Permintaan masuk
  → helmet, cors, express-rate-limit (global)
  → middleware/autentikasi.js:
        ambil Bearer token → hash SHA-256 → cari di sesi_pengguna
        tidak ada / dicabut / kedaluwarsa → req.pengguna = null
        ada → req.pengguna = { id, peran }
              perbarui terakhir_dipakai_pada + perpanjang kedaluwarsa (bergulir)
  → middleware/wajibLogin.js (hanya di rute pribadi)
        req.pengguna kosong → 401 TIDAK_MASUK / SESI_KEDALUWARSA
  → validasi zod
  → layanan → repositori (SATU-SATUNYA tempat SQL, selalu memfilter pemilik)
  → util/respons.js → bentuk seragam §4.2
  → middleware/penangananGalat.js (penangkap terakhir; tidak pernah membocorkan
       jejak tumpukan ke klien, selalu mencatatnya di log server)
```

**Perilaku klien saat `401`:** **jangan** paksa ke layar login. Klien menghapus
token, kembali ke **mode tamu**, dan aplikasi tetap jalan penuh dari
`localStorage`. Ajakan masuk kembali muncul di halaman Akun. Ini penerapan
langsung B-K1: sesi kedaluwarsa tidak boleh berubah menjadi pintu terkunci di
depan tenggat yang mau dilihat siswa.

### 6.6 Alur E — Keadaan tepi

| Keadaan | Perilaku |
|---|---|
| Server mati / domain API salah | Semua panggilan gagal senyap; aplikasi berjalan sebagai mode tamu. Penanda sinkron menunjukkan "belum tersimpan ke akun". |
| Token kedaluwarsa/dicabut | Seperti §6.5: turun ke mode tamu, tanpa layar terkunci. |
| Dua siswa berbagi satu HP | Karena klaim bersifat eksplisit sekali (§6.3), data siswa A tidak pernah masuk ke akun siswa B secara otomatis. "Keluar" mencabut token; data lokal **dibersihkan** saat keluar — dan tombol keluar wajib menyebutkan itu (§7.2). |
| Kartu dihapus lalu perangkat lain menyinkronkan | Hapus lunak menyebar; kartu tidak hidup lagi. Riwayat latihannya tetap ada (`kartu_id` → NULL, `mapel_id` sudah disalin). |
| `localStorage` mati (mode penyamaran) | Tanpa akun: seperti `SDD-LevelIn.md` §6.6, semua jatuh ke keadaan kosong yang berguna. Dengan akun: token tidak bisa disimpan → pengguna tetap di mode tamu untuk sesi itu. |
| Jam perangkat salah | Server **selalu** menentukan waktu untuk `dibuat_pada`/`dijawab_pada` bila selisihnya lebih dari 24 jam dari jam server. Tanpa aturan ini, satu HP berjam salah bisa mengacak urutan riwayat. |

---

## 7. Kebutuhan Desain UI/UX

> **Bagian ini adalah daftar kebutuhan, bukan desain.** Wireframe dibuat
> terpisah oleh user dengan perkakas desainnya sendiri. Yang ditulis di sini:
> halaman/komponen apa yang harus ada, keadaan apa yang harus punya tampilan,
> dan batasan apa yang tidak boleh dilanggar. **Tidak ada wireframe, tata
> letak, ukuran, atau warna yang ditentukan di sini.**

### 7.1 Batasan yang berlaku untuk semuanya

| Batasan | Sumber |
|---|---|
| Navigasi bawah tetap **4 ikon** — Akun **tidak** menjadi ikon ke-5 | `app/README.md`, dikunci; dijaga `tools/check.js` |
| Tidak ada merah/oranye — termasuk untuk galat login dan "sandi salah" | `app/README.md` (mengikat) |
| Setiap layar punya keadaan kosong & keadaan galat yang **ditulis** | DoD §15 |
| Seluruh kalimat berasal dari `docs/salinan-teks-lanjut.md` (usul bagian baru: **§4.9 Akun & sinkronisasi**) | DoD §15; dijaga `tools/test-desain.js` |
| Jalan di 360px tanpa gulir mendatar; sasaran sentuh ≥44px | DoD §15, `tools/test-desain.js` |
| Warna/ukuran hanya lewat `var(--token)` | `app/README.md` |

**Di mana pintu Akun berada.** Nav tetap empat ikon, jadi `akun.html` masuk
lewat **tautan dari `beranda.html`** — pola yang persis sama dengan
`alumni.html`, yang memang sengaja tidak mendapat ikon nav. Ini **tidak**
mengubah keputusan navigasi mana pun.

### 7.2 Halaman & komponen yang dibutuhkan

| # | Halaman/komponen | Keadaan yang wajib punya rancangan |
|---|---|---|
| A1 | **`daftar.html` — Buat akun** | (a) formulir kosong; (b) sedang mengirim; (c) nama pengguna sudah dipakai; (d) sandi terlalu pendek / termasuk daftar terlarang; (e) tidak ada koneksi; (f) berhasil. Wajib memuat satu baris yang menjelaskan **kenapa akun berguna** (data tidak hilang saat ganti HP) dan satu baris bahwa akun **tidak wajib**. |
| A2 | **`masuk.html` — Masuk** | (a) kosong; (b) mengirim; (c) kredensial salah — **tanpa** memberi tahu bagian mana yang salah; (d) terlalu sering mencoba (`429`) dengan penjelasan bahwa ini sementara; (e) tidak ada koneksi. |
| A3 | **`akun.html` — Akun saya** | (a) **mode tamu** — ajakan tenang + tombol "Simpan & sinkronkan"; (b) sudah masuk — nama, kapan terakhir tersinkron, tombol keluar; (c) sesi kedaluwarsa; (d) luring. |
| A4 | **Dialog klaim data tamu** (§6.3) | (a) ada data lokal — menyebut **apa** yang akan dibawa dalam bahasa manusia ("centang persiapanmu", "catatan latihanmu"), bukan nama tabel; (b) tidak ada data lokal → dialog tidak muncul sama sekali; (c) klaim gagal sebagian — jujur, dan bisa dicoba lagi. |
| A5 | **Penanda status sinkron** (komponen kecil, dipakai di `akun.html` dan opsional di `beranda.html`) | (a) tersimpan di akun; (b) belum tersinkron; (c) mode tamu (bukan galat — ini keadaan normal); (d) sedang menyinkronkan. **Tidak boleh** terlihat seperti peringatan. |
| A6 | **Konfirmasi keluar** | Wajib menyebutkan bahwa data lokal di perangkat ini akan dibersihkan dan tetap aman di akun. Ini konsekuensi nyata (§6.6) dan tidak boleh disembunyikan di balik kata "Keluar" saja. |
| A7 | **Layar "lupa sandi"** (informasi saja, bukan formulir) | Satu halaman/blok yang menjelaskan cara pemulihan v1 (menghubungi tim, §5.5). Nadanya bukan jalan buntu. |
| A8 | **Ubah kata sandi** (di `akun.html`) | (a) formulir; (b) sandi lama salah; (c) berhasil + pemberitahuan bahwa perangkat lain ikut keluar. |
| A9 | **Baris profil pada `akun.html`** | Ubah kelas & prodi tujuan — **memakai ulang** komponen yang sudah ada di onboarding, bukan komponen baru. |

### 7.3 Yang **tidak** dibutuhkan dari desain

- ~~Tidak ada layar pemuatan penuh (*full-page loader*). Data selalu tersedia dari
  `localStorage` lebih dulu (B-K2), jadi tidak pernah ada layar yang menunggu.~~
  → **Diperbarui 27 Sep 2026:** hanya berlaku untuk MVP-PWA. LANJUT_App
  menampilkan penanda memuat saat data diambil dari API (online-first,
  LANJUT_016).
- Tidak ada dinding login (*login wall*) di mana pun.
- Tidak ada layar verifikasi surel — surel opsional dan tidak diverifikasi (§5.2).
- Tidak ada tampilan "sesi/perangkat aktif" di v1; kolomnya sudah ada bila kelak
  dibutuhkan.

---

## 8. Keamanan Dasar

### 8.1 Kata sandi

- **`bcryptjs`, cost 12.** Cost 12 memakan ± 200–300 ms per hash pada server
  kecil — cukup lambat untuk menyulitkan penebakan massal, cukup cepat untuk
  tidak terasa saat login.
- **Kenapa bukan argon2id**, meski secara teori lebih kuat: `argon2` menuntut
  kompilasi native (`node-gyp` + toolchain), yang di lingkungan tim (Windows)
  adalah penyebab gagal-pasang yang umum. Kolom `kata_sandi_hash` menyimpan
  string bertanda algoritme, jadi peningkatan kelak tidak menuntut migrasi
  data: hash lama tetap terverifikasi, hash baru ditulis dengan algoritme baru
  saat pengguna login berikutnya.
- Kata sandi **tidak pernah** masuk log, tidak pernah dikembalikan API, tidak
  pernah ikut di objek `pengguna` mana pun. Repositori pengguna punya dua fungsi
  terpisah: `cariUntukMasuk()` (memuat hash, hanya dipanggil layanan auth) dan
  `cariProfil()` (tidak pernah memuat hash) — supaya kebocoran tidak bisa terjadi
  karena lupa menghapus satu kolom.

### 8.2 Pembatasan laju endpoint auth

| Lapis | Aturan | Alasan |
|---|---|---|
| Per IP (`express-rate-limit`) | `/auth/*`: **10 permintaan / 15 menit**. Seluruh `/api/v1`: 300 / 15 menit. | Menahan banjir permintaan dari satu sumber. |
| Per akun (`percobaan_masuk`) | Setelah **5** gagal berturut-turut: terkunci **5 menit**. Setelah 10: **30 menit**. Direset saat berhasil. | Menahan penebakan satu akun dari banyak IP — yang tidak tertangkap batas per IP. |
| Pendaftaran | 5 pendaftaran / jam per IP | Menahan pembuatan akun massal yang akan mencemari angka pengguna (T5). |

**Dua aturan yang menyertainya:**
1. **Tidak ada penguncian permanen.** Penguncian permanen berarti siapa pun
   bisa mengunci akun orang lain hanya dengan salah menebak sandinya.
2. **Waktu respons login dibuat seragam** untuk akun ada dan tidak ada
   (§5.4) — kalau tidak, daftar nama pengguna yang terdaftar bisa dipetakan
   dari selisih waktu.

### 8.3 Validasi masukan

- Satu skema `zod` per endpoint, dipasang sebagai middleware **sebelum**
  layanan. Badan permintaan yang tidak lolos tidak pernah sampai ke SQL.
- **Daftar putih, bukan daftar hitam.** Medan yang tidak dikenal dibuang, bukan
  diteruskan. Ini yang menutup *mass assignment* — mis. body yang menyertakan
  `peran: "tim"` atau `pemilik_id` orang lain **tidak akan pernah sampai** ke
  query, karena skemanya tidak memuat medan itu.
- Batas panjang eksplisit untuk setiap medan teks (judul 200, isi 5.000,
  jawaban 5.000). Tanpa batas, satu tempelan besar bisa memenuhi basis data.
- `SELECT`/`INSERT` **selalu** memakai placeholder `?` (`execute`), tidak pernah
  penyambungan string (§2.2 aturan 2, dijaga gerbang §9.4).

### 8.4 Otorisasi & privasi kartu pengguna

Ini bagian yang paling langsung menyentuh janji produk:
`rancangan-arsip-latihan-banksoal.md` §2.1 menyatakan arsip **privat**, dan
menyebutnya sekaligus sebagai pengaman HAKI. Karena itu:

1. **Setiap query kartu pribadi memuat `pemilik_id = ?` di `WHERE`** (B-K4).
   Bukan diperiksa setelah baris terambil — disaring saat diambil, sehingga
   kelalaian menghasilkan "tidak ditemukan", bukan kebocoran.
2. **`404`, bukan `403`, untuk kartu milik orang lain.** `403` mengakui bahwa
   kartu dengan id itu ada. Untuk data privat, keberadaannya sendiri sudah
   informasi.
3. **Tidak ada endpoint apa pun yang mengembalikan kartu `sumber='pengguna'`
   milik orang lain** — termasuk untuk peran `'tim'`. Tim mengurasi kartu resmi,
   tidak membaca catatan pribadi siswa. Ini pembatasan yang disengaja, bukan
   celah yang belum ditutup.
4. **Level-In tidak boleh menulis ke `kartu`** — diwarisi `SDD-LevelIn.md` §4.3
   no. 3. Repositori Level-In tidak memuat satu pun `UPDATE kartu`.

### 8.5 Pengerasan lain (murah, wajib)

| Hal | Aturan |
|---|---|
| Rahasia | `.env` **tidak pernah** masuk git. `server/.gitignore` memuat `.env`; `.env.example` berisi nama variabel tanpa nilai. Bila satu rahasia pernah ter-commit, ia dianggap bocor dan diganti — bukan dihapus dari riwayat lalu dipakai lagi. |
| HTTPS | Wajib di lingkungan tayang. Tanpa HTTPS, token Bearer terkirim polos. Ini juga syarat service worker (PWA). |
| `helmet` | Termasuk `Content-Security-Policy` yang melarang skrip sebaris — pertahanan kedua untuk risiko XSS di §5.3. |
| CORS | Daftar asal eksplisit dari variabel lingkungan. Tidak pernah `*`. |
| Galat | Jejak tumpukan tidak pernah dikirim ke klien; selalu dicatat di log server. Respons galat memakai bentuk §4.2. |
| Log | **Tidak boleh** mencatat kata sandi, token, atau isi kartu pengguna. Yang dicatat: metode, jalur, status, durasi, `pengguna_id`. |
| Cadangan (backup) | Basis data wajib punya cadangan terjadwal **sebelum** pengguna nyata masuk. Data yang hanya ada di server tanpa cadangan lebih rapuh daripada data di `localStorage` — pengguna setidaknya masih punya salinannya di perangkat. |

---

## 9. Struktur Folder & Rencana Kerja

### 9.1 Letak di repositori

```
EDILAKSO-LANJUT-repo/
  app/                 PWA (tidak berubah bentuknya oleh dokumen ini)
  LandingPage/
  docs/
  server/              BARU — seluruh backend
```

`server/` berdiri sendiri: punya `package.json`, `node_modules`, dan
`README.md` sendiri. `app/` tetap **tanpa** build step dan **tanpa** npm
(`app/README.md`) — sifat itu tidak boleh ikut hilang karena backend memakai
npm.

### 9.2 Struktur `server/`

```
server/
  package.json
  .env.example                 nama variabel, tanpa nilai
  .gitignore                   .env, node_modules
  README.md                    cara menjalankan, migrasi, benih
  src/
    index.js                   titik masuk: baca env → nyalakan port
    app.js                     rakit Express: helmet, cors, rate limit, rute, galat
    config/
      env.js                   baca + VALIDASI env; gagal cepat bila kurang
    db/
      koneksi.js               SATU-SATUNYA createPool di seluruh proyek
      jalankan-migrasi.js      pelari migrasi (± 60 baris) + tabel _migrasi
      migrasi/                 001_*.sql … 005_*.sql   (§3.6)
      benih/benih.js           membaca app/data/*.json → INSERT idempoten
    middleware/
      autentikasi.js           Bearer → req.pengguna (boleh null)
      wajibLogin.js            401 bila req.pengguna kosong
      wajibTim.js              403 bila peran ≠ 'tim'
      validasi.js              pembungkus zod → 400 VALIDASI_GAGAL + medan
      batasLaju.js             konfigurasi express-rate-limit
      penangananGalat.js       penangkap terakhir, bentuk galat §4.2
    modul/
      auth/        auth.rute.js · auth.layanan.js · auth.skema.js · sesi.repo.js
      pengguna/    pengguna.rute.js · pengguna.layanan.js · pengguna.repo.js
      konten/      konten.rute.js · konten.repo.js       (F1–F5, hanya baca)
      kemajuan/    kemajuan.rute.js · kemajuan.repo.js   (F5)
      kartu/       kartu.rute.js · kartu.layanan.js · kartu.repo.js  (F6)
      levelin/
        levelin.rute.js
        levelin.layanan.js
        levelin.repo.js
        keputusan.js           SALINAN lapisan 2 assets/levelin.js (fungsi murni)
      sinkron/     sinkron.rute.js · sinkron.layanan.js  (§6.3)
    util/
      id.js  waktu.js  respons.js  kata-sandi.js  token.js
  tests/
    auth.test.js  kartu-otorisasi.test.js  levelin-keputusan.test.js  sinkron.test.js
```

**Tiga lapis per modul, dan batasnya tegas:**

| Lapis | Berkas | Boleh | Dilarang |
|---|---|---|---|
| Rute | `*.rute.js` | Membaca `req`, memanggil layanan, menyusun respons | SQL, aturan bisnis |
| Layanan | `*.layanan.js` | Aturan bisnis, memanggil repositori | SQL, menyentuh `req`/`res` |
| Repositori | `*.repo.js` | **SQL (satu-satunya tempat)** | Menyentuh `req`/`res` |

### 9.3 Urutan pengerjaan

| Tahap | Isi | Prasyarat |
|---|---|---|
| **B0** | **Keputusan PM: B1 (jadwal vs P0) dan B2 (hosting & anggaran)** | **Memblokir seluruh tahap di bawah** |
| B1 | Kerangka `server/`: `package.json`, env + validasi, `koneksi.js`, pelari migrasi, satu endpoint `GET /api/v1/sehat` | B0 |
| B2 | Migrasi `001`–`005` (§3.6) + benih dari `app/data/*.json` | B1 |
| B3 | Auth: daftar, masuk, keluar, saya, ubah sandi + `wajibLogin` + pembatasan laju + `tests/auth.test.js` | B2 |
| B4 | Konten hanya-baca (F1–F5) — endpoint publik | B2 |
| B5 | `kemajuan` (F5) + `kartu` (F6) + **uji otorisasi kepemilikan** (`kartu-otorisasi.test.js`) | B3, B4 |
| B6 | Endpoint Level-In (§4.6) + `keputusan.js` diuji dengan **kasus uji yang sama** dengan `tools/test-levelin.js` | B5, Level-In klien selesai |
| B7 | `POST /sinkron/klaim` + penyatuan §6.4 | B5 |
| B8 | Penyambungan klien: `daftar.html`, `masuk.html`, `akun.html`, lapisan `api.js`, penanda sinkron | B3, B7, teks §4.9 salinan teks, wireframe §7.2 |
| B9 | Tayang: HTTPS, cadangan terjadwal, log, `server/README.md`, perbarui `app/README.md` | B8 |

**Sinkronisasi dengan backend-engineer & ui-engineer:**

- **B1–B7 adalah pekerjaan backend-engineer murni.** Tidak satu pun menyentuh
  berkas di `app/`, sehingga bisa berjalan **paralel** dengan pekerjaan UI P0
  tanpa bentrok berkas.
- **Titik temu tunggal adalah B8.** Agar tidak saling menunggu, kontrak §4.2
  (bentuk respons + daftar kode galat) dan §4.3–§4.6 (daftar endpoint)
  dibekukan pada akhir **B3**. Setelah itu ui-engineer bisa membangun
  `daftar/masuk/akun` terhadap kontrak, memakai server tiruan sederhana bila
  backend belum tayang.
- **Teks mendahului UI.** `docs/salinan-teks-lanjut.md` §4.9 (Akun &
  sinkronisasi) wajib ada **sebelum** B8 dimulai — aturan yang sama yang
  berlaku untuk Level-In (`SDD-LevelIn.md` §7.7), karena
  `tools/test-desain.js` memeriksanya.

### 9.4 Gerbang validasi baru

| Gerbang | Yang dijaga |
|---|---|
| `server/tests/*` (`node --test`) | Auth (daftar/masuk/keluar/kedaluwarsa/terkunci), **otorisasi kepemilikan kartu** (pengguna A tidak bisa membaca/menyunting/menghapus kartu pengguna B), idempotensi `POST /riwayat-latihan`, penyatuan `sinkron/klaim` yang diulang. |
| `server/tools/periksa-sql.js` (BARU) | (1) tidak ada kata kunci SQL di luar `*.repo.js`; (2) tidak ada `${` di dalam string SQL; (3) setiap query atas tabel pribadi memuat `pengguna_id`/`pemilik_id` di `WHERE`. |
| `tools/test-levelin.js` + `levelin-keputusan.test.js` | Menjalankan **berkas kasus uji yang sama** di klien dan server. Satu berkas fixture, dua pemanggil — inilah mitigasi RB5. |
| `app/tools/check.js` | Halaman baru (`daftar/masuk/akun.html`) tetap memakai nav **tepat 4 ikon**; `akun.html` **tidak** mendapat ikon nav (pola `alumni.html`). |
| `app/tools/test-desain.js` | Kalimat akun/sinkronisasi ada di `salinan-teks-lanjut.md` §4.9; tanpa merah/oranye di layar galat login. |

---

## 10. Risiko Teknis & Mitigasi

| # | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| **RB1** | **Pekerjaan backend menggeser rilis P0 3 September.** Lihat analisis lengkap §11.2 — ini risiko terpenting di dokumen ini. | P0 (F1–F5) tidak tayang tepat waktu → risiko "Tenggat 27 September lewat" di §10 dokumen induk terwujud → nilai inti produk anjlok. | Rancangan ini dibuat agar backend **bisa** dikerjakan tanpa menyentuh `app/` sampai tahap B8 (B-K1, §9.3). Tetapi **keputusan apakah dikerjakan sekarang atau setelah 3 September adalah keputusan PM (B1), bukan keputusan teknis.** SDD ini tidak mengambilnya. |
| **RB2** | **Biaya & operasi hosting.** `rancangan-arsip-latihan-banksoal.md` §3.2 menulis **Hosting Rp 0** — asumsi itu hanya berlaku untuk berkas statis. | Angka BEP & ROI di Business Plan berubah; atau layanan gratis dengan "tidur otomatis" membuat permintaan pertama menunggu puluhan detik dan Alur B (≤15 detik, §14) gagal. | Diangkat sebagai keputusan PM **B2** (§11.1). Bahan pertimbangan disiapkan di §11.3. ~~Mitigasi teknis bila memakai paket gratis: klien selalu merender dari `localStorage` lebih dulu (B-K2), sehingga server yang lambat bangun tidak pernah terlihat sebagai layar menunggu.~~ → **Diperbarui 27 Sep 2026:** hanya berlaku untuk MVP-PWA. Di LANJUT_App (online-first, LANJUT_016) server yang lambat bangun **terlihat** sebagai penanda memuat, jadi paket hosting yang "tidur otomatis" langsung terasa oleh pengguna. |
| **RB3** | **Akun menaikkan gesekan dan menekan T5** (≥50 pengguna nyata sebelum 23 Oktober) dan T1/T2. | Syarat penilaian KIK justru terancam oleh fitur yang dimaksudkan memperkuatnya. | B-K1: akun **opsional**, mode tamu adalah bawaan, tidak ada dinding login (§6.2, §7.3). Ajakan membuat akun ditempatkan **setelah** pengguna merasakan nilai, bukan sebelum. Perlu konfirmasi PM (B5). |
| **RB4** | **Menyimpan data pribadi siswa (sebagian di bawah umur) di server** menciptakan kewajiban yang tidak ada saat semuanya di `localStorage`: kebijakan privasi, dasar pemrosesan, persetujuan, hak hapus (UU PDP). | Risiko hukum & reputasi; juga pertanyaan penguji yang wajar dan sulit dijawab bila belum dipikirkan. | Minimalkan data sejak rancangan: **tanpa** nama asli wajib, **tanpa** nomor HP, **tanpa** asal sekolah pada akun, surel opsional. Perlu: halaman kebijakan privasi singkat + endpoint hapus akun. **Butuh keputusan PM (B6)** soal siapa penanggung jawab data dan apakah perlu persetujuan wali. |
| **RB5** | **Fungsi keputusan Level-In menyimpang antara klien dan server.** | Angka kalibrasi berbeda antara Beranda dan hasil API, tanpa satu pun galat muncul. | `keputusan.js` server adalah salinan lapisan 2 `assets/levelin.js`, dan **kedua sisi diuji dengan berkas kasus uji yang sama** (§9.4). Aturan `SDD-LevelIn.md` §4.3 no. 2 dipertahankan: server tidak pernah menerima nilai turunan dari klien. |
| **RB6** | **Kesalahan SQL klasik oleh tim pemula**: injeksi lewat penyambungan string, atau lupa menyaring pemilik. | Kebocoran kartu pribadi — melanggar janji privasi `rancangan-arsip-latihan-banksoal.md` §2.1 yang sekaligus menjadi pengaman HAKI. | B-K4 + tiga aturan §2.2, dijaga otomatis oleh `periksa-sql.js` (§9.4) dan uji otorisasi eksplisit (`kartu-otorisasi.test.js`). Pemeriksaan otomatis dipilih justru **karena** timnya pemula: disiplin yang bergantung pada ingatan akan gagal. |
| **RB7** | **Dua sumber kebenaran** (`localStorage` vs server) menghasilkan data yang berbeda di dua perangkat. | Pengguna melihat kemajuan/riwayat yang berbeda dan berhenti percaya. | Aturan penyatuan per jenis data ditulis eksplisit di §6.4, dan mayoritas data dibuat **append-only** sehingga bebas konflik secara struktural (B-K3) — bukan diselesaikan dengan "yang terakhir menang" untuk semuanya. |
| **RB8** | **Server mati membuat seluruh aplikasi mati** — kelas kegagalan yang **tidak ada** sebelum backend. | Aplikasi yang tadinya selalu bisa dibuka menjadi bisa "tumbang". | B-K1 + B-K2: klien merender dari `localStorage`/`data/*.json` lebih dulu; kegagalan API senyap; `401` menurunkan ke mode tamu, bukan ke layar terkunci (§6.5). → **Diperbarui 27 Sep 2026:** mitigasi bagian B-K2 hanya berlaku untuk MVP-PWA. Untuk LANJUT_App (online-first, LANJUT_016) risiko ini **diterima**: server mati berarti data tidak termuat dan layar menampilkan keadaan galat. |
| **RB9** | **Rahasia (`.env`, sandi basis data) ter-commit ke git.** | Basis data bisa diakses siapa pun yang melihat repositori. | `.gitignore` sejak commit pertama `server/`; `.env.example` tanpa nilai; aturan §8.5 bahwa rahasia yang pernah ter-commit dianggap bocor dan **diganti**. |
| **RB10** | **Basis data tanpa cadangan.** | Data pengguna yang hanya ada di server bisa hilang permanen — lebih buruk daripada keadaan `localStorage` sekarang. | Cadangan terjadwal wajib **sebelum** pengguna nyata masuk (§8.5), dan `localStorage` sengaja **tidak** dikosongkan setelah sinkronisasi (§6.3) sehingga perangkat tetap memegang salinan. |
| **RB11** | **Beban dukungan lupa kata sandi** karena tidak ada pemulihan mandiri (§5.5). | Siswa terkunci dari akunnya; tim mengerjakan setel ulang manual. | Realistis pada 50–150 pengguna, **tidak** di atas itu. Diangkat sebagai keputusan PM **B4**. Mitigasi tambahan: mode tamu tetap jalan, jadi terkunci dari akun **tidak** berarti terkunci dari aplikasi. |
| **RB12** | **Cakupan merembes** — Panel Admin, pembayaran, Bank Soal Mitra ikut masuk karena "sekalian sudah ada server". | Fondasi tidak pernah selesai. | Daftar di luar cakupan ditulis eksplisit di §1.3; `pengguna.paket` sengaja **tidak** ditambahkan (§3.4); Panel Admin diangkat sebagai keputusan terpisah **B7**. |

---

## 11. Pertanyaan Terbuka

### 11.1 Butuh keputusan PM — **memblokir dimulainya implementasi**

| # | Pertanyaan | Kenapa SDD ini tidak menjawabnya |
|---|---|---|
| **B1** | **Apakah fondasi backend dikerjakan sebelum atau sesudah rilis P0 3 September 2026?** | Ini keputusan cakupan & jadwal produk, bukan keputusan teknis. Analisis lengkap dan konsekuensi tiap pilihan ada di §11.2 — **tanpa mengambil keputusannya**. |
| **B2** | **Di mana backend di-hosting, berapa anggarannya, dan siapa yang mengelolanya?** | Menyentuh angka Business Plan (§3.2 `rancangan-arsip-latihan-banksoal.md` menulis Hosting Rp 0) dan komitmen operasional pasca-rilis. Bahan pertimbangan di §11.3. |

### 11.2 Bahan untuk keputusan B1 — dampak terhadap cakupan P0 (disampaikan apa adanya)

**Fakta, tanpa tafsir:**

1. **Rilis v1 (P0, F1–F5) dijadwalkan paling lambat 3 September 2026**
   (`prd-sdd-lanjut.md` §10). Dokumen ini ditulis **22 Agustus 2026** — tersisa
   **12 hari kalender**.
2. **P0 sendiri belum selesai.** `app/README.md` mencatat yang belum ada: logika
   fitur (isi halaman masih ditulis di HTML, `data/*.json` belum disambungkan),
   penyimpanan kemajuan checklist (F5 — padahal AC F5 mewajibkan kemajuan
   bertahan), service worker, dan ikon PWA. Selain itu §11 dokumen induk masih
   mencatat dua pertanyaan yang **memblokir F1 dan F3**: tanggal resmi
   TKA/SNBP/SNBT, dan daftar mapel pendukung per prodi.
3. **Backend tidak bertentangan dengan arsitektur yang sudah dikunci.** §12
   dokumen induk sejak awal menggambar Lapisan API + Basis Data + Panel Admin.
   Jadi ini **bukan** perubahan arah; yang berubah adalah **kapan** lapisan itu
   dibangun.
4. **PRD Level-In §6 menyatakan** pengerjaan P1 "tidak boleh menyentuh, menunda,
   atau mengubah cakupan P0". Backend bukan Level-In, tetapi semangat batasan
   itu berlaku sama.
5. **Perkiraan kasar upaya** fondasi ini (B1–B9, §9.3): 12–18 hari kerja untuk
   satu pengembang berpengalaman yang fokus penuh. Untuk tim pemula yang
   sebagian sedang PKL (risiko "Anggota tim berangkat PKL", §10 dokumen induk),
   angka itu realistisnya **lebih besar**, bukan lebih kecil.
6. **Backend juga membawa nilai akademik yang nyata:** §8 dokumen induk menyebut
   satu produk sekaligus memenuhi penilaian **Pemrograman Web, Basis Data, dan
   UI/UX Mobile**. Skema MySQL nyata dengan many-to-many `prodi_mapel` adalah
   bahan terkuat untuk deck Basis Data — dan tenggat KIK adalah **23 Oktober**,
   bukan 3 September.

**Tiga pilihan dan konsekuensinya — bahan pertimbangan, bukan usulan:**

| Pilihan | Konsekuensi |
|---|---|
| **(a) P0 tetap 3 September, murni klien; backend mulai setelahnya** | Tenggat 3 September terjaga; risiko §10 dokumen induk tidak bertambah. Backend punya ± 7 minggu menuju 23 Oktober — cukup untuk B1–B9 tanpa terburu-buru. Konsekuensi: sampai backend tayang, pengguna yang ganti HP tetap kehilangan datanya (risiko yang **sudah** diterima di `SDD-LevelIn.md` R3). |
| **(b) Backend dikerjakan paralel, P0 tetap 3 September** | Mungkin **hanya** bila ada orang yang benar-benar terpisah mengerjakannya (§9.3: B1–B7 tidak menyentuh `app/`). Bila orangnya sama dengan yang menyelesaikan F1–F5, ini bukan paralel — ini pembagian perhatian, dan yang paling mungkin tergeser adalah P0. |
| **(c) P0 mundur agar tayang bersama backend & akun** | Rilis lebih utuh dalam satu langkah. Tetapi §10 dokumen induk secara eksplisit menempatkan 3 September sebagai penanggulangan risiko "Tenggat 27 September lewat" — memundurkannya berarti **menerima risiko yang tanggal itu diciptakan untuk menghindari**, dan menekan waktu mengumpulkan ≥50 pengguna nyata sebelum 23 Oktober (T5). |

> **SDD ini tidak memilih di antara ketiganya.** Yang bisa dinyatakan dari sisi
> teknis: rancangan di dokumen ini **sengaja disusun agar pilihan (a) mungkin
> tanpa pekerjaan terbuang** — tidak ada satu pun keputusan di §3–§6 yang perlu
> diubah bila backend baru dimulai September, karena skemanya sudah mengikuti
> §13 dokumen induk dan `SDD-LevelIn.md` §3.2 yang keduanya sudah final.

### 11.3 Bahan untuk keputusan B2 — hosting

| Yang perlu diputuskan | Catatan |
|---|---|
| Node + MySQL yang menyala terus vs paket gratis "tidur otomatis" | Paket gratis membuat permintaan pertama menunggu puluhan detik. Dengan B-K2 (render dari `localStorage` dulu) itu **tidak terlihat** oleh pengguna pada F1–F5, tetapi **terasa** saat masuk/daftar. → **Diperbarui 27 Sep 2026:** hanya berlaku untuk MVP-PWA. Di LANJUT_App (online-first) penundaan itu terasa di **semua** layar, jadi ini alasan kuat memilih server yang menyala terus. |
| Satu asal atau dua asal | Bila Express sekaligus menyajikan `app/` sebagai berkas statis, urusan CORS hilang dan kuki `HttpOnly` menjadi mungkin (§5.3) — lebih aman **dan** lebih sederhana. Ini disarankan secara teknis bila hostingnya memungkinkan. |
| HTTPS & domain | Wajib (§8.5). Domain sudah dianggarkan Rp 150.000/tahun (§3.2 dokumen rancangan). |
| Cadangan basis data | Wajib sebelum pengguna nyata masuk (RB10). Perlu dipastikan paket yang dipilih menyediakannya atau tim menjadwalkannya sendiri. |
| Siapa yang memegang akun hosting & rahasia | Harus jelas satu orang penanggung jawab. Rahasia tidak dibagikan lewat chat grup. |

### 11.4 Terbuka, **tidak** memblokir

| # | Pertanyaan | Rekomendasi teknis (menunggu konfirmasi) |
|---|---|---|
| **B3** | Identitas login: username saja, atau surel wajib? | **Username + surel opsional** (§5.2). Berdampak ke B4. |
| **B4** | Lupa sandi mandiri lewat surel — dijadwalkan kapan? | **Tidak di v1**; setel ulang oleh tim dengan jejak audit (§5.5). Perlu ditinjau ulang bila pengguna melewati ± 150. |
| **B5** | Akun wajib atau opsional? | **Opsional; mode tamu adalah bawaan** (B-K1). Butuh konfirmasi karena mengubah alur onboarding dan berdampak pada T5 (RB3). |
| **B6** | Kebijakan privasi & data siswa di bawah umur: siapa penanggung jawab, perlukah persetujuan wali? | Rancangan sudah meminimalkan data (RB4). Keputusan kebijakan bukan keputusan teknis. |
| **B7** | Panel Admin (§12 dokumen induk) masuk fondasi ini atau menyusul? | **Menyusul.** Sampai itu, konten diisi lewat `app/data/*.json` + benih (§3.6), dan gerbang aturan data yang sudah ada tetap menjaganya. |
| **B8** | Umur sesi login (usul 90 hari, bergulir)? | 90 hari — agar Alur B (≤15 detik) tidak berubah menjadi "buka-login-lihat". |
| **B9** | Kartu `sumber='resmi'` disajikan dari basis data atau tetap dari `data/*.json`? | **Dari basis data**, dengan `data/*.json` sebagai sumber penyuntingan lewat benih. Klien tetap boleh jatuh ke JSON saat luring — dan itu memang sudah perilakunya sekarang. |
| **B10** | `akses.tampilan_agregat_mapel` (`SDD-LevelIn.md` §10.2 no. 3) | **Tidak dijawab di sini.** Itu keputusan model bisnis milik dokumen Level-In, dan tidak memblokir fondasi backend: endpoint `GET /api/v1/kalibrasi/ringkasan` tetap ada karena FL4 memakainya, apa pun keputusan tampilannya. |

---

## 12. Ketertelusuran

| Sumber | Dipenuhi di |
|---|---|
| `prd-sdd-lanjut.md` §12 (arsitektur tiga lapis) | §1.1, §9.1–§9.2 |
| `prd-sdd-lanjut.md` §12 (wajib `sumber`, `pemilik`, `diperiksa_pada` sejak versi pertama) | §3.4 (metadata sumber di semua tabel konten) |
| `prd-sdd-lanjut.md` §13 (model data) | §3.4, §3.5 — dipetakan tanpa mengubah bentuk |
| `prd-sdd-lanjut.md` §13 (`prodi ↔ mapel` many-to-many) | `prodi_mapel`, §3.4 & §3.7 |
| `prd-sdd-lanjut.md` §14 Alur B (≤15 detik) | ~~B-K2, §6.1,~~ §5.3 (umur sesi) → **Diperbarui 27 Sep 2026:** B-K2 dan §6.1 hanya berlaku untuk MVP-PWA. Di LANJUT_App, target ≤15 detik bergantung pada kecepatan API (online-first, LANJUT_016). |
| `prd-sdd-lanjut.md` §15 (DoD) | §4.2 (kode galat → salinan teks), §7.1–§7.2 |
| `rancangan-arsip-latihan-banksoal.md` §1 (tiga kelas kepercayaan) | `kartu.sumber`, `kartu.pemilik_id`, `kartu.penyedia` — §3.4 |
| `rancangan-arsip-latihan-banksoal.md` §2.1 (arsip privat, pengaman HAKI) | §8.4 (otorisasi kepemilikan, `404` bukan `403`) |
| `rancangan-arsip-latihan-banksoal.md` §2.2 (gratis vs berbayar) | §3.4 (kolom paket sengaja belum ada), §11.4 B10 |
| `SDD-LevelIn.md` §3.2 (skema) | §3.5 — dipakai apa adanya |
| `SDD-LevelIn.md` §4.2 (endpoint) | §4.6 — hanya diberi awalan `/api/v1` + auth |
| `SDD-LevelIn.md` §4.3 (idempotensi, tanpa nilai turunan dari klien, tanpa sentuh `kartu`) | §4.6, §8.4 no. 4, B-K3, B-K6 |
| `SDD-LevelIn.md` §4.1 & §10.3 (klien Level-In v1 client-only) | Catatan batas di kepala dokumen ini |
| `app/README.md` (nav 4 ikon, aturan data, aturan warna & teks) | §7.1, §3.6, §9.4 |

---

*Dokumen ini merancang lapisan server yang sudah digambarkan di §12
`docs/prd-sdd-lanjut.md`, dan tidak mengubah satu pun requirement produk.
Dua keputusan di §11.1 — jadwal terhadap rilis P0, dan hosting/anggaran —
adalah milik PM/user, dan implementasi tidak dimulai sebelum keduanya diambil.*
