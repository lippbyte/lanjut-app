# SDD — Level-In (Confidence Gap Tracker)

**Produk:** LANJUT — fitur tambahan di atas Arsip Belajar
**Prioritas:** P1 (dibangun setelah v1 rilis 3 September 2026)
**Status:** Final — disetujui PM, siap implementasi
**Sumber kebenaran requirement:** `docs/PRD-LevelIn.md` (final, disetujui)

> **Catatan status (mengapa dokumen ini boleh disebut final).**
> Satu-satunya keputusan bisnis yang tadinya memblokir implementasi —
> **FL6 gratis atau berbayar** — sudah diambil PM: **FL6 gratis untuk v1**
> (§10.1). Dengan itu FL1–FL6 seluruhnya punya jalur implementasi yang pasti.
>
> Masih ada **satu** keputusan terbuka: `akses.tampilan_agregat_mapel`, yaitu
> apakah *tampilan* penanda kalibrasi per mapel di Arsip Belajar (§7.6) gratis
> atau berbayar. **Itu keputusan terpisah dari FL6 dan tidak memblokir apa
> pun**, karena K6 (§1) memisahkan mesin agregasi dari tampilannya: perhitungan
> FL3 tetap berjalan penuh dan tetap menyalakan FL4 (must-have) terlepas dari
> keputusan itu. Yang menunggu hanyalah komponen tampilan opsional §7.6, yang
> memang berstatus nice-to-have dan tidak masuk daftar must-have PRD §4.1.
> Pertanyaannya dipindahkan ke §10.2 sebagai poin terbuka non-pemblokir.

> **Aturan pakai dokumen ini.** Dokumen ini **hanya merancang cara membangun**
> apa yang sudah dikunci di `docs/PRD-LevelIn.md`. SDD ini tidak menambah,
> mengurangi, atau menafsir ulang requirement. Urutan kewenangan dokumen:
>
> 1. `docs/prd-sdd-lanjut.md` (v1 — sumber kebenaran tunggal; Keputusan
>    Teknologi §8, model data §13, cakupan P0 F1–F5, nav 4 ikon)
> 2. `docs/rancangan-arsip-latihan-banksoal.md` (kelas kepercayaan kartu §1,
>    pembagian gratis/berbayar §2.2)
> 3. `docs/PRD-LevelIn.md` (requirement Level-In)
> 4. dokumen ini
>
> Bila dokumen ini tampak bertentangan dengan salah satu di atasnya, **yang di
> atas yang menang** dan dokumen ini yang direvisi.

---

## 1. Ringkasan Pendekatan Teknis

Level-In menambahkan satu bidang data pada langkah yang sudah ada di sesi
latihan — **nilai keyakinan 1–5 sebelum jawaban dibuka** — lalu memakai
pasangan `(keyakinan, benar/salah)` untuk tiga keluaran: umpan balik per kartu
(FL2), ringkasan per sesi (FL6), dan saran mapel harian di Beranda (FL4).

Enam keputusan yang membentuk seluruh rancangan di bawah:

| # | Keputusan | Alasan |
|---|---|---|
| K1 | **Tidak ada teknologi baru.** Tetap PWA multi-halaman, HTML/CSS/JS murni, tanpa build step, tanpa dependensi, sesuai §8 `prd-sdd-lanjut.md` dan `app/README.md`. | Level-In P1 tidak boleh menjadi alasan mengubah tumpukan teknologi yang sudah dikunci untuk rilis v1. |
| K2 | **Simpan mentah, turunkan saat dibaca.** Yang dipersistensi hanya fakta yang tidak bisa dihitung ulang: `kartu_id`, `mapel_id`, `keyakinan`, `benar`, `waktu`. Klasifikasi *overconfident*, *rate*, status "belum cukup data", dan saran harian **selalu dihitung ulang** dari data mentah lewat fungsi murni. | PRD §7.1 mewajibkan ambang 40%/5 dikalibrasi ulang pasca-rilis. Kalau hasil klasifikasi ikut disimpan, mengubah ambang berarti migrasi data. Dengan menyimpan mentah, mengubah ambang cukup mengganti satu berkas konfigurasi. |
| K3 | **Ambang dan aturan klasifikasi hidup di satu berkas konfigurasi**, bukan angka tertanam di banyak tempat (AC FL3). | Memenuhi AC FL3 secara harfiah, dan membuat peninjauan ulang pasca-rilis jadi pekerjaan menit, bukan hari. |
| K4 | **Jendela per mapel, bukan akumulasi seumur hidup.** Agregasi dihitung dari maksimal `N` kartu terakhir per mapel (bawaan 50). | Menjawab cerita pengguna §3 no. 6 ("kembali tanpa merasa dihakimi oleh riwayat gap lama") secara struktural, bukan lewat pilihan kata saja. Sekaligus membatasi ukuran penyimpanan tanpa perlu pemangkasan yang merusak agregat. |
| K5 | **Level-In berdiri di berkas terpisah** (`assets/levelin.js`), bukan disisipkan ke `assets/app.js`. Semua pemasangannya dibungkus `try/catch`, dan tiap permukaan UI punya isi cadangan statis di HTML. | Halaman `beranda.html` adalah P0. Fitur P1 yang gagal memuat tidak boleh membuat halaman P0 kosong. |
| K6 | **Pemisahan tegas: mesin agregasi (selalu jalan) vs tampilan statistik (bisa digerbang).** Perhitungan agregat yang menyalakan FL4 tidak pernah digerbang; yang bisa digerbang hanya *tampilan* angka kalibrasi ke pengguna. | Membuat keputusan bisnis FL6/FL3 (§10.1, §10.2) bisa diambil ke arah mana pun **tanpa** mematikan FL4 yang berstatus must-have. Inilah yang membuat keputusan FL6 (sudah selesai) dan keputusan tampilan agregat (masih terbuka) benar-benar independen satu sama lain. |

**Yang tidak disentuh sama sekali:** F1–F5, `onboarding.html`, `khusus-smk.html`,
`pilih-mapel.html`, `checklist.html`, `alumni.html`, isi `assets/tokens.css`
Bagian 1, dan susunan navigasi bawah. Daftar berkas yang boleh berubah ada di
§9.2.

---

## 2. Tech Stack Final

### 2.1 Tumpukan yang dipakai

| Lapisan | Keputusan | Alasan |
|---|---|---|
| **Jenis aplikasi** | PWA, mobile-first, satu basis kode | Diwarisi §8 `prd-sdd-lanjut.md`. Perolehan pengguna lebih menentukan penilaian daripada keunggulan native; tautan bisa langsung dibuka. **Ditolak ulang di sini: React Native dan native Android** — bukan hanya untuk v1, tapi juga untuk Level-In, karena memindahkan satu fitur P1 ke tumpukan lain berarti dua basis kode untuk tim yang sedang terpencar PKL. |
| **Bahasa** | HTML5, CSS3, JavaScript ES5-kompatibel (gaya `var` + `function`, seperti `app.js` yang ada) | Konsisten dengan berkas yang sudah berjalan, dan tidak menuntut transpiler. Menambah sintaks modern berarti menambah build step yang secara eksplisit tidak ada (`app/README.md`). |
| **Kerangka kerja (framework)** | **Tidak ada.** Multi-halaman statis, bukan SPA | Sama seperti di atas. Level-In tidak butuh routing klien, tidak butuh reaktivitas — yang dibutuhkan cuma tiga fungsi murni dan tiga permukaan render. |
| **Penyimpanan sisi klien (basis data v1)** | `localStorage` untuk riwayat kalibrasi; `sessionStorage` untuk keadaan sesi berjalan | Riwayat wajib bertahan setelah aplikasi ditutup (AC FL3, sama seperti syarat F5). Keadaan sesi **tidak** boleh bertahan antar tab/hari — `sessionStorage` memberi masa hidup yang persis benar tanpa kode pembersih. IndexedDB ditolak: volumenya ≤ 500 catatan (§3.5), API asinkronnya menambah kerumitan tanpa manfaat. |
| **Berkas konfigurasi** | `app/data/levelin-konfig.json`, dimuat lewat `LANJUT.muatData()` yang sudah ada, dengan nilai bawaan tertanam sebagai cadangan | Memenuhi AC FL3 ("nilai yang mudah diubah"). Cadangan tertanam wajib karena `fetch()` tidak jalan lewat `file://` (`app/README.md`). |
| **Basis data server** | **Belum ada di Level-In v1.** Skema yang dituju dirancang di §3 dan diikat ke §13 `prd-sdd-lanjut.md` | Lapisan API memang belum dibangun (`app/README.md` — "Yang BELUM ada"). Merancang skemanya sekarang mengikuti kaidah yang sama yang membuat kolom `sumber`/`pemilik` diputuskan sebelum koding. Fondasi backend untuk seluruh aplikasi kini dirancang terpisah di `docs/SDD-Backend-Foundation.md`; lihat catatan batas di §4.1. |
| **Hosting** | Tidak berubah: hosting statis paket gratis, seperti asumsi biaya di `rancangan-arsip-latihan-banksoal.md` §3.2 | Level-In tidak menambah kebutuhan server, tidak menambah proses build, dan tidak menambah biaya. |
| **Font & aset** | Poppins (Google Fonts) dan token `assets/tokens.css` yang sudah ada | Batas desain PRD §6. Level-In **tidak** memperkenalkan warna baru; kode HEX presisi memang belum dikunci di `design.md` §6, dan itu status resmi dokumen desain — implementasi memakai token yang sudah berjalan. |
| **Pengujian** | Node tanpa dependensi, lewat `app/tools/validasi.js` yang sudah ada; ditambah `tools/test-levelin.js` | Fungsi keputusan Level-In dirancang murni (tanpa DOM, tanpa jam, tanpa storage) supaya bisa diuji langsung — pola yang sama dengan `linimasaTerkini()`. |

### 2.2 Yang sengaja tidak dipakai

| Ditolak | Alasan |
|---|---|
| Kerangka kerja UI (React/Vue/Svelte) | Melanggar §8 dokumen induk dan membutuhkan build step yang tidak ada. |
| IndexedDB / SQLite WASM | Volume data ≤ 500 catatan; API asinkron menambah jalur galat tanpa manfaat. |
| Pustaka statistik/grafik | Seluruh perhitungan Level-In adalah penjumlahan dan satu pembagian. Grafik tren adalah FL7 (nice-to-have), bukan Level-In v1. |
| Backend/akun pengguna untuk Level-In v1 | Akun belum ada di v1. Menambahkannya demi Level-In akan menyentuh cakupan di luar P1 ini. Konsekuensinya diterima dan dicatat sebagai risiko R3 (§8). **Tetap berlaku** meski fondasi backend kini dirancang terpisah (`docs/SDD-Backend-Foundation.md`) — lihat §4.1. |
| `crypto.randomUUID()` sebagai satu-satunya sumber id | Tidak tersedia di konteks tidak aman (`file://`, http non-localhost). Dipakai bila ada, dengan cadangan `waktu + acak` (§3.4). |

---

## 3. Rancangan Data

### 3.1 Prinsip yang mengikat

1. **Tidak ada restrukturisasi model data §13.** Level-In hanya **menambah
   kolom opsional** pada `riwayat_latihan` dan menambah tabel turunan. Kolom
   `kartu.sumber` dan `kartu.pemilik` dipakai apa adanya — persis skenario yang
   sudah diantisipasi `rancangan-arsip-latihan-banksoal.md` §1 (FL5).
2. **`keyakinan` boleh kosong, dan kosong bukan nol.** Baris riwayat tanpa
   keyakinan (mis. sesi sebelum Level-In tayang, atau sesi yang datanya rusak)
   **tidak ikut** dihitung sebagai kartu dikerjakan untuk kalibrasi. Ini yang
   membuat status "belum cukup data" jujur, bukan gap nol yang menyesatkan
   (AC FL3).
3. **Tidak ada kolom hasil klasifikasi yang dipersistensi sebagai kebenaran.**
   Kolom `kelas_gap` di §3.2 boleh ada sebagai kolom turunan/cache di server,
   tetapi harus dapat dihitung ulang penuh dari `keyakinan` + `benar`
   (keputusan K2).
4. **Level-In tidak menulis apa pun ke tabel `kartu`.** Tidak ada perubahan
   status verifikasi, visibilitas, atau kepemilikan kartu (batas privasi PRD §6,
   AC FL5).

### 3.2 Skema basis data yang dituju (saat lapisan API dibangun)

Tiga tabel disentuh: satu diperluas, dua baru.

#### `riwayat_latihan` — **diperluas**, tidak ditulis ulang

| Kolom | Tipe | Wajib | Baru? | Keterangan |
|---|---|---|---|---|
| `id` | UUID/TEXT | ya | — | Dibuat **di klien**, bukan server. Menjadi kunci idempoten saat sinkronisasi (§4.3). |
| `pengguna_id` | FK → `pengguna.id` | ya | — | Sudah ada di §13. |
| `kartu_id` | FK → `kartu.id` | ya | — | Sudah ada di §13. |
| `benar` | BOOLEAN | ya | — | Sudah ada di §13. Hasil aktual yang ditandai pengguna. |
| `dijawab_pada` | TIMESTAMP (UTC) | ya | — | Sudah ada di §13. |
| `sesi_id` | FK → `sesi_latihan.id` | tidak | **ya** | Nullable supaya baris lama tetap sah. Dipakai FL6 untuk merangkum satu sesi. |
| `keyakinan` | SMALLINT `CHECK (keyakinan BETWEEN 1 AND 5)` | tidak | **ya** | **NULL = kartu ini tidak punya data kalibrasi**, bukan keyakinan terendah. Inti FL1. |
| `mapel_id` | FK → `mapel.id` | tidak | **ya** | Denormalisasi sengaja: menyalin `kartu.mapel_id` saat menjawab. Kartu bisa dihapus/dipindah pemiliknya; agregasi kalibrasi tidak boleh ikut hilang atau berpindah mapel secara retroaktif. |
| `gap_numerik` | NUMERIC(3,2) | tidak | **ya** | Turunan, boleh di-cache (§3.3). Rentang −1.00…+1.00. |
| `kelas_gap` | TEXT `CHECK IN ('overconfident','underconfident','selaras','netral')` | tidak | **ya** | Turunan, boleh di-cache. **Bukan** sumber kebenaran. |
| `aturan_versi` | SMALLINT | tidak | **ya** | Versi aturan klasifikasi yang berlaku saat baris dibuat. Membuat kalibrasi ulang ambang (PRD §7.1) bisa dilacak, bukan diam-diam. |

Indeks yang dibutuhkan: `(pengguna_id, mapel_id, dijawab_pada DESC)` untuk
mengambil jendela N kartu terakhir per mapel, dan `(sesi_id)` untuk FL6.

#### `sesi_latihan` — **baru**

| Kolom | Tipe | Wajib | Keterangan |
|---|---|---|---|
| `id` | UUID/TEXT | ya | Dibuat di klien saat sesi dimulai. |
| `pengguna_id` | FK → `pengguna.id` | ya | — |
| `dimulai_pada` | TIMESTAMP (UTC) | ya | — |
| `selesai_pada` | TIMESTAMP (UTC) | tidak | NULL = sesi ditinggalkan. Baris riwayatnya tetap sah dan tetap dihitung. |
| `jumlah_kartu_direncanakan` | SMALLINT | ya | 12 bawaan, 5 untuk keadaan "waktu mepet" yang sudah ada di markup. |
| `mapel_fokus_id` | FK → `mapel.id` | tidak | Diisi bila sesi dimulai dari CTA saran FL4. NULL untuk sesi campuran. |
| `asal_mula` | TEXT `CHECK IN ('beranda_saran','arsip','arsip_detail')` | ya | Dipakai menjawab pertanyaan terbuka PRD §7.2 (kapan CTA layak naik jadi ikon nav) dengan data, bukan tebakan. |

#### `kalibrasi_mapel` — **baru, turunan** (VIEW, atau tabel ringkas yang dibangun ulang)

Tabel ini **tidak pernah ditulis langsung**. Ia dihitung dari `riwayat_latihan`
dengan aturan dan ambang dari konfigurasi yang berlaku.

| Kolom | Tipe | Keterangan |
|---|---|---|
| `pengguna_id` | FK | Bagian dari kunci gabungan. |
| `mapel_id` | FK | Bagian dari kunci gabungan. |
| `kartu_dikerjakan` | INTEGER | Jumlah baris dalam jendela dengan `keyakinan IS NOT NULL`. Penyebut *rate*. |
| `n_overconfident` | INTEGER | Pembilang *rate*. |
| `n_underconfident` | INTEGER | Untuk FL6 dan tampilan agregat. |
| `n_selaras` | INTEGER | — |
| `n_netral` | INTEGER | Kartu berkeyakinan 3 — dihitung sebagai dikerjakan, tidak dihitung ke arah mana pun. |
| `n_benar` | INTEGER | Agar skor benar/salah existing tidak perlu query kedua. |
| `rate_overconfident` | NUMERIC(4,3) | `n_overconfident / kartu_dikerjakan`. NULL bila penyebut 0. |
| `status_data` | TEXT `('cukup_data','belum_cukup_data')` | `belum_cukup_data` bila `kartu_dikerjakan < minimum_kartu`. |
| `pola` | TEXT `('overconfident','selaras','belum_cukup_data')` | `overconfident` hanya bila `status_data='cukup_data'` **dan** `rate_overconfident >= ambang`. |
| `dihitung_pada` | TIMESTAMP | Kapan turunan ini dibangun. |
| `konfig_versi` | SMALLINT | Versi konfigurasi ambang yang dipakai. Tanpa ini, angka lama dan baru tidak bisa dibedakan setelah ambang diubah. |

#### `konfigurasi_levelin` — **baru** (server), cerminan `data/levelin-konfig.json` (klien)

| Kolom | Tipe | Keterangan |
|---|---|---|
| `kunci` | TEXT (PK) | mis. `ambang_overconfident`, `minimum_kartu`. |
| `nilai` | TEXT/NUMERIC | Nilai berlaku. |
| `versi` | SMALLINT | Naik setiap kali diubah. |
| `dasar` | TEXT | Wajib diisi: dari mana angka ini berasal. Untuk v1 isinya **"perkiraan awal, belum diuji dengan data pemakaian"** (PRD FL3 & §7.1). |
| `diubah_pada` | TIMESTAMP | — |

#### Relasi

```
pengguna 1 ──< sesi_latihan 1 ──< riwayat_latihan >── 1 kartu >── 1 mapel
                                        │                            │
                                        └──── mapel_id (salinan) ────┘
                                        │
                          (agregasi, bukan FK)
                                        ▼
                                 kalibrasi_mapel
```

- `kartu ↔ mapel`: many-to-one, tidak berubah.
- `riwayat_latihan.mapel_id` sengaja **bukan** sekadar lewat `kartu` — lihat
  alasan denormalisasi di tabel §3.2.
- `kalibrasi_mapel` adalah agregat, bukan entitas independen. Tidak ada satu pun
  fitur yang boleh menulis ke sana secara langsung.

### 3.3 Bentuk penyimpanan di klien (yang benar-benar dibangun di Level-In v1)

**Kunci 1 — riwayat kalibrasi (bertahan, `localStorage`)**

```
localStorage['lanjut.levelin.v1'] = {
  versi: 1,
  aturan_versi: 1,
  peristiwa: [
    {
      id:        "lv-1755840000000-8f3a",   // = riwayat_latihan.id
      sesi_id:   "ls-1755839000000-2b1c",
      kartu_id:  "k-mtk-4",
      mapel_id:  "matematika",
      keyakinan: 4,                          // 1..5, wajib ada di catatan ini
      benar:     false,
      waktu:     "2026-09-12T04:12:33.000Z", // UTC, seperti dibuat_pada
      aturan_versi: 1
    }
  ],
  diperbarui_pada: "2026-09-12T04:12:33.000Z"
}
```

**Kunci 2 — keadaan sesi berjalan (tidak bertahan, `sessionStorage`)**

```
sessionStorage['lanjut.levelin.sesi.v1'] = {
  sesi_id:      "ls-1755839000000-2b1c",
  dimulai_pada: "2026-09-12T04:05:00.000Z",
  asal_mula:    "beranda_saran",
  mapel_fokus:  "matematika" | null,
  antrian:      ["k-mtk-1","k-mtk-4","k-ing-2", ...],
  indeks:       2,
  keyakinan_kartu_ini: 4 | null,   // dikosongkan tiap pindah kartu
  jawaban: [
    { kartu_id:"k-mtk-1", mapel_id:"matematika", keyakinan:5, benar:true },
    { kartu_id:"k-mtk-4", mapel_id:"matematika", keyakinan:4, benar:false }
  ],
  umpan_balik_tertunda: { keyakinan:4, benar:false } | null  // dipakai FL2, §6.2
}
```

Catatan penting tentang pembagian dua kunci:

- Catatan kalibrasi ditulis ke `localStorage` **pada saat pengguna menandai
  Benar/Salah**, bukan di akhir sesi. Sesi yang ditinggalkan di tengah tetap
  meninggalkan titik data yang sah (G1: "setiap kartu latihan yang dikerjakan
  menghasilkan satu titik data gap yang tersimpan").
- `latihan-selesai.html` merangkum sesi dengan membaca `sessionStorage`
  (`jawaban[]`). Kalau `sessionStorage` hilang (tab ditutup lalu halaman dibuka
  langsung), halaman jatuh ke keadaan kosong yang sudah ditulis — bukan angka
  karangan. Ini keadaan yang wajib punya teks, lihat §7.4.
- Satu `setItem` per penulisan, satu objek per kunci: tidak ada kondisi di mana
  dua kunci bisa saling tidak sinkron.

### 3.4 Aturan pembuatan id

```
id = (crypto.randomUUID ? crypto.randomUUID()
                        : prefiks + '-' + Date.now() + '-' + acak4())
```

`crypto.randomUUID()` tidak tersedia di konteks tidak aman (`file://`), yang
justru cara paling sering kerangka ini dibuka. Cadangannya wajib, dan idnya
tetap unik-cukup karena hanya perlu unik per pengguna per perangkat sampai
sinkronisasi ada.

### 3.5 Batas ukuran dan pemangkasan

- **Aturan simpan:** setelah setiap penulisan, `peristiwa` dipangkas menjadi
  **maksimal `jendela_per_mapel` catatan terbaru untuk setiap `mapel_id`**
  (bawaan 50).
- Batas atas keseluruhan: 10 mapel × 50 = **500 catatan** ≈ 60 KB JSON — jauh
  di bawah kuota `localStorage` (± 5 MB).
- Karena agregasi memang **hanya** memakai jendela itu (K4), pemangkasan tidak
  pernah merusak angka yang ditampilkan. Ini beda tegas dengan rancangan
  penghitung akumulatif, yang akan salah permanen begitu ada data dibuang.
- Konsekuensi yang diterima: tren jangka panjang (FL7) tidak bisa dihitung dari
  data ini. FL7 memang nice-to-have dan beririsan dengan statistik berbayar —
  bila kelak dibangun, ia menambah ember ringkasan bulanan tersendiri, bukan
  memperbesar jendela ini.

### 3.6 Konfigurasi (`app/data/levelin-konfig.json`)

```json
{
  "_catatan": "Ambang kerja Level-In. PRD FL3 & §7.1: angka di bawah adalah perkiraan awal, BUKAN hasil uji dengan data pemakaian nyata. Wajib ditinjau ulang setelah ada pemakaian pasca-rilis.",
  "versi": 1,
  "aturan_versi": 1,
  "ambang": {
    "ambang_overconfident": 0.40,
    "minimum_kartu": 5,
    "jendela_per_mapel": 50
  },
  "klasifikasi": {
    "keyakinan_tinggi_minimal": 4,
    "keyakinan_rendah_maksimal": 2
  },
  "akses": {
    "ringkasan_kalibrasi_sesi": "gratis",
    "tampilan_agregat_mapel": "belum_diputuskan"
  },
  "sumber": "resmi",
  "pemilik": "tim",
  "diperiksa_pada": null,
  "asal": "perkiraan",
  "status": "belum_diverifikasi",
  "dasar": "Perkiraan awal tim untuk v1. Belum diuji dengan data pemakaian nyata."
}
```

Nilai yang sama ditanam sebagai `KONFIG_BAWAAN` di `assets/levelin.js` sehingga
halaman tetap berfungsi saat `fetch()` gagal (`file://` atau luring). Bila
berkas berhasil dimuat, nilainya menimpa bawaan **per kunci**, bukan
menggantikan seluruh objek — supaya berkas konfigurasi yang tidak lengkap tidak
menghapus nilai lain.

Dua kunci di `akses` sengaja **terpisah dan independen**:

- `akses.ringkasan_kalibrasi_sesi` (FL6) — **sudah final: `"gratis"`**
  (keputusan PM, §10.1).
- `akses.tampilan_agregat_mapel` (tampilan §7.6) — **masih
  `"belum_diputuskan"`**, dan itu memang benar: ini keputusan bisnis
  **terpisah** yang belum diambil PM. Ia tidak boleh disimpulkan ikut "gratis"
  hanya karena FL6 gratis; keduanya memang bisa berbeda (kombinasi "FL6 gratis,
  tampilan agregat berbayar" adalah pembacaan paling harfiah dari
  `rancangan-arsip-latihan-banksoal.md` §2.2). Lihat §10.2 no. 3.

---

## 4. Rancangan API / Endpoint

### 4.1 Status

Lapisan API **belum dibangun** dan **tidak dibangun oleh Level-In v1**. Level-In
v1 sepenuhnya berjalan di klien (§3.3). Bagian ini merancang garis besarnya
supaya penyambungan nanti tidak menuntut perubahan bentuk data di klien —
kaidah yang sama yang membuat kolom `sumber`/`pemilik` diputuskan lebih dulu.

**Batas terhadap keputusan cakupan backend yang baru (penting).** PM/user telah
memutuskan bahwa LANJUT akan punya backend nyata (akun/login + lapisan API),
dirancang terpisah di `docs/SDD-Backend-Foundation.md`. Keputusan itu **tidak
mengubah apa pun pada klien Level-In v1**:

1. **Klien Level-In sudah dikonfirmasi sepenuhnya: client-only, `localStorage`
   + `sessionStorage`, tanpa akun.** Bentuk data §3.3, alur §6, dan komponen §7
   tetap berlaku persis seperti tertulis.
2. Bila/ketika backend itu benar-benar dibangun, penyambungan Level-In
   **mengikuti rancangan §4.2 dan §4.3 di bawah apa adanya** — tanpa perubahan
   bentuk data klien. Nama medan di §3.3 sudah sengaja dibuat identik dengan
   §3.2, dan satu-satunya pemetaan (`waktu` → `dijawab_pada`) tetap dilakukan di
   satu tempat saja.
3. `SDD-Backend-Foundation.md` **memakai** §3.2 dan §4.2 sebagai titik awal dan
   tidak merancang ulang skema/endpoint Level-In. Bila kelak ada perbedaan,
   dokumen inilah yang menang untuk semua hal yang menyangkut Level-In, dan
   dokumen fondasi backend yang direvisi.

### 4.2 Garis besar endpoint

| Metode & jalur | Guna | Catatan rancangan |
|---|---|---|
| `POST /api/sesi-latihan` | Mendaftarkan sesi baru | Body: `id` (dibuat klien), `dimulai_pada`, `mapel_fokus_id`, `asal_mula`, `jumlah_kartu_direncanakan`. Server menerima `id` dari klien supaya sesi luring tetap bisa disinkronkan. |
| `PATCH /api/sesi-latihan/{id}` | Menutup sesi | Body: `selesai_pada`. Sesi yang tidak pernah ditutup **sah**, bukan galat. |
| `POST /api/riwayat-latihan` | Mengirim jawaban, **borongan** | Body: larik catatan §3.3. Idempoten berdasarkan `id`; kiriman ulang tidak menggandakan. Menerima `keyakinan: null` untuk baris tanpa kalibrasi. |
| `GET /api/kalibrasi/ringkasan?jendela=50` | Agregat per mapel | Mengembalikan bentuk `kalibrasi_mapel` (§3.2) termasuk `status_data` dan `pola`. Selalu mengembalikan `belum_cukup_data` secara eksplisit, tidak pernah menghilangkan mapelnya begitu saja. |
| `GET /api/saran-harian` | Saran FL4 | Mengembalikan `{ jenis, mapel_id, alasan }` dengan `jenis` persis seperti §6.4. Server memakai fungsi keputusan yang sama semantiknya dengan klien. |
| `GET /api/konfigurasi/levelin` | Ambang berlaku | Membuat kalibrasi ulang ambang bisa dilakukan tanpa merilis ulang klien. |

### 4.3 Aturan yang mengikat lapisan API kelak

1. **Idempotensi wajib.** `riwayat_latihan.id` dibuat klien dan menjadi kunci
   deduplikasi. Tanpa ini, satu sinkronisasi yang diulang bisa membuat *rate*
   kalibrasi seseorang salah permanen.
2. **Server tidak pernah menerima `kelas_gap` atau `rate` dari klien.** Klien
   mengirim fakta (`keyakinan`, `benar`); server menurunkan sendiri. Dua sumber
   kebenaran untuk angka yang sama adalah bug yang menunggu waktu.
3. **Tidak ada endpoint yang mengubah `kartu`.** Level-In tidak boleh menjadi
   jalan verifikasi/publikasi kartu pengguna (batas privasi PRD §6, AC FL5).
4. **Perpindahan dari localStorage ke API tidak mengubah bentuk catatan.**
   Nama kolom di §3.3 sengaja identik dengan §3.2, kecuali `waktu` → `dijawab_pada`
   yang dipetakan di **satu** tempat saja — mengikuti pola `prodi_impian →
   prodi_tujuan` yang sudah disepakati di `app/README.md`.

---

## 5. Struktur Folder / Modul

### 5.1 Berkas baru

```
app/
  assets/
    levelin.js            BARU — seluruh logika Level-In (lihat §5.2)
    levelin.css           BARU — kelas komponen Level-In saja
                                 (chip keyakinan, strip pembanding, ringkasan)
                                 Semua nilai lewat var(--token), tanpa angka
                                 warna/ukuran mentah.
  data/
    levelin-konfig.json   BARU — ambang, aturan klasifikasi, flag akses (§3.6)
  tools/
    test-levelin.js       BARU — uji fungsi murni, dipanggil dari validasi.js
docs/
  SDD-LevelIn.md          BARU — dokumen ini
  salinan-teks-lanjut.md  DIUBAH — tambah §4.8 teks Level-In (§7.7)
```

### 5.2 Modul di dalam `assets/levelin.js`

Berkas tunggal, IIFE, pola sama persis dengan `app.js` (`(function(global){ ... })(window)`).
Empat lapisan, dan lapisan bawah tidak pernah tahu lapisan atas:

| Lapisan | Isi | Sifat |
|---|---|---|
| **1. Konfigurasi** | `KONFIG_BAWAAN`, `muatKonfig()` (gabung dengan `data/levelin-konfig.json`) | Asinkron sekali di awal, dengan cadangan sinkron. |
| **2. Keputusan (murni)** | `gapNumerik()`, `klasifikasiKartu()`, `agregatPerMapel()`, `ringkasSesi()`, `saranHarian()` | **Tanpa DOM, tanpa jam, tanpa storage.** Seluruh masukan lewat argumen. Diekspor untuk diuji. |
| **3. Penyimpanan** | `Kalibrasi.baca()`, `.catat()`, `.pangkas()`, `Sesi.mulai()`, `.baca()`, `.simpan()`, `.tutup()` | Semua dibungkus `try/catch` seperti `Profil` di `app.js`: `localStorage` yang mati atau rusak mengembalikan keadaan kosong, tidak melempar. |
| **4. Pemasangan UI** | `pasangKeyakinan()`, `pasangPembandingGap()`, `pasangRingkasanSesi()`, `pasangSaranBeranda()` | Dipilih lewat `<body data-peran>` yang sudah ada. Hanya mengisi slot `[data-isi]` dan menyalakan/mematikan `[hidden]` — tidak pernah merakit markup dari teks (aturan render `app.js`). |

Ekspor global:

```js
global.LANJUT_LEVELIN = {
  gapNumerik, klasifikasiKartu, agregatPerMapel, ringkasSesi, saranHarian,
  KUNCI_RIWAYAT, KUNCI_SESI, KONFIG_BAWAAN
};
```

Lapisan 3 dan 4 sengaja **tidak** diekspor — sama seperti `app.js` yang hanya
membuka `linimasaTerkini`. Yang diuji adalah logika yang kalau salah akan
menyesatkan siswa.

### 5.3 Pemuatan skrip

`levelin.js` ditambahkan **hanya** di empat halaman yang memakainya:
`beranda.html`, `latihan.html`, `latihan-selesai.html`, dan `arsip.html`
(untuk memasang tujuan `latihan.html?mapel=…`), dengan `defer`, **setelah**
`app.js`:

```html
<script src="assets/app.js" defer></script>
<script src="assets/levelin.js" defer></script>
```

Urutan ini penting: `levelin.js` memakai `LANJUT.muatData()` dan `LANJUT.profil`.
Karena keduanya `defer`, urutan eksekusi mengikuti urutan tulis.

Setiap `pasangX()` dibungkus `try/catch` di titik masuknya sendiri (K5).
Kalau `levelin.js` gagal dimuat sama sekali, `beranda.html` tetap menampilkan
kartu tenggat F1 dan seluruh isi P0-nya, dan kartu CTA Level-In tetap tampil
dengan isi cadangan statis yang sudah ditulis di HTML.

### 5.4 Gerbang validasi yang harus ikut diperbarui

| Berkas | Yang ditambah |
|---|---|
| `tools/validasi.js` | Memanggil suite baru `test-levelin.js`. |
| `tools/test-levelin.js` | Uji fungsi murni §6: klasifikasi tiap kombinasi 1–5 × benar/salah, batas *rate* tepat di 0.40 dan 0.399, `kartu_dikerjakan` tepat 4 vs 5, `keyakinan: null` tidak ikut dihitung, urutan tie-break saran bersifat tetap, seluruh `jenis` fallback tercapai, dan `localStorage` rusak/ditolak tidak melempar. |
| `tools/test-app.js` (kontrak selector) | Hook baru (`[data-keyakinan]`, `[data-isi="…"]`, `[data-keadaan="…"]`) yang dicari `levelin.js` wajib benar-benar ada di HTML-nya. |
| `tools/test-desain.js` | Kalimat Level-In wajib ada di `docs/salinan-teks-lanjut.md`; tanpa merah/oranye; sasaran sentuh 44px; tidak meluap di 360px (§7.2). |
| `tools/check.js` | Nav tetap **tepat 4 ikon** di keempat halaman yang disentuh; **dan** gerbang rilis akses (lihat catatan di bawah). |

**Gerbang rilis `akses.*` — versi berlaku setelah keputusan FL6.** Gerbang ini
digerbang **per komponen yang benar-benar dirender**, bukan per kunci secara
buta:

- `akses.ringkasan_kalibrasi_sesi` — **wajib** bernilai `"gratis"` atau
  `"berbayar"`. Nilai `"belum_diputuskan"` menggagalkan validasi. Untuk v1
  nilainya `"gratis"` (§10.1), jadi gerbang ini lulus.
- `akses.tampilan_agregat_mapel` — **boleh** tetap `"belum_diputuskan"`
  **selama** komponen §7.6 (penanda status kalibrasi per mapel di `arsip.html`)
  tidak dirender sama sekali di rilis ini. Yang dijaga gerbang: bila ada markup
  penanda §7.6 yang muncul di `arsip.html` sementara kuncinya masih
  `"belum_diputuskan"`, validasi gagal. Dengan begitu tidak mungkin ada build
  yang menayangkan komponen berbayar/gratis tanpa keputusan, tetapi keputusan
  yang belum diambil juga tidak menyandera rilis fitur lain.

---

## 6. Alur Data Utama

### 6.1 Logika perhitungan (definisi lengkap)

**a. Gap numerik per kartu** — disimpan/diturunkan untuk keperluan kalibrasi
ulang ambang kelak, **tidak** ditampilkan sebagai angka ke pengguna.

```
p_yakin = (keyakinan - 1) / 4          // 1→0.00  2→0.25  3→0.50  4→0.75  5→1.00
hasil   = benar ? 1 : 0
gap     = p_yakin - hasil              // rentang -1.00 .. +1.00
```

**b. Klasifikasi per kartu** — inilah yang dipakai FL2/FL3/FL6, karena bisa
dijelaskan ke siswa dalam satu kalimat.

| Keyakinan | Hasil | Kelas | Alasan |
|---|---|---|---|
| ≥ `keyakinan_tinggi_minimal` (4–5) | salah | `overconfident` | "yakin tapi meleset" — persis yang dicari PRD §3 no. 3. |
| ≤ `keyakinan_rendah_maksimal` (1–2) | benar | `underconfident` | "ternyata bisa". |
| = 3 | apa pun | `netral` | Keyakinan tengah tidak mengklaim arah apa pun. **Tetap dihitung** sebagai kartu dikerjakan. |
| 4–5 | benar | `selaras` | — |
| 1–2 | salah | `selaras` | Perkiraan dirinya tepat, walau jawabannya salah. |

Ambang 4 dan 2 berada di konfigurasi (`klasifikasi.*`), bukan tertanam.

**c. Agregasi per mapel (FL3)** — dihitung ulang setiap kali dibaca, atas
**jendela `jendela_per_mapel` catatan terbaru per mapel** (K4):

```
kartu_dikerjakan   = jumlah catatan dalam jendela            // keyakinan selalu terisi
rate_overconfident = n_overconfident / kartu_dikerjakan      // null bila penyebut 0

status_data = kartu_dikerjakan >= minimum_kartu ? 'cukup_data' : 'belum_cukup_data'

pola = status_data === 'belum_cukup_data'                    ? 'belum_cukup_data'
     : rate_overconfident >= ambang_overconfident            ? 'overconfident'
     :                                                         'selaras'
```

Dua hal yang harus dijaga saat implementasi, karena keduanya adalah AC:

- Perbandingan memakai **`>=`**, bukan `>`. `minimum_kartu = 5` berarti 5 kartu
  **sudah cukup**; `ambang = 0.40` berarti tepat 40% **sudah** ditandai. Kedua
  batas ini wajib punya kasus uji.
- Mapel dengan `kartu_dikerjakan = 0` tetap muncul di keluaran dengan
  `status_data = 'belum_cukup_data'` dan `rate = null` — **tidak boleh** hilang
  dan **tidak boleh** disamakan dengan `rate = 0` (AC FL3).

**d. Ringkasan per sesi (FL6)** — dari `jawaban[]` sesi berjalan, bukan dari
riwayat panjang:

```
ringkasSesi(jawaban) = {
  total, benar,
  overconfident, underconfident, selaras, netral
}
```

Tidak ada penghitung hari beruntun di sini — AC FL6 dan F7 dokumen induk
menegaskan ukuran keberhasilan bukan streak.

**e. Saran belajar harian (FL4)**

```
kandidat = mapel yang status_data = 'cukup_data' DAN pola = 'overconfident'
           DAN punya kartu tersedia di arsip

urutkan kandidat:  rate_overconfident DESC
                → kartu_dikerjakan DESC     (bukti lebih banyak menang saat rate seri)
                → mapel_id ASC              (pemutus terakhir, supaya hasilnya tetap)
```

Pemutus terakhir berbasis `mapel_id` bukan hiasan: tanpa itu, saran bisa
berganti-ganti tiap kali halaman dimuat ulang, dan pengguna kehilangan
kepercayaan pada saran yang berubah tanpa sebab.

**f. Rantai fallback (wajib, AC FL4 "tidak menjadi jalan buntu")**

Dievaluasi berurutan; yang pertama cocok dipakai:

| Urutan | Kondisi | `jenis` | Perilaku CTA |
|---|---|---|---|
| 1 | Tidak ada kartu sama sekali di arsip | `arsip_kosong` | CTA mengarah ke `arsip.html`/`arsip-tambah.html`. Tidak menjanjikan sesi yang tidak bisa jalan. |
| 2 | Ada kandidat overconfident | `saran` | Menyebut satu nama mapel; mulai sesi terfokus mapel itu. |
| 3 | Ada mapel `cukup_data`, tidak ada yang overconfident | `kalibrasi_selaras` | CTA latihan biasa tanpa menyebut gap. Nada netral, bukan pujian berlebihan. |
| 4 | Ada riwayat, tapi semua mapel `belum_cukup_data` | `belum_cukup_data` | CTA latihan biasa + penanda eksplisit "belum cukup data". Mapel dipilih: yang punya kartu paling banyak, pemutus `mapel_id ASC`. |
| 5 | Belum ada riwayat sama sekali (pengguna baru) | `pengguna_baru` | CTA latihan biasa, tanpa istilah kalibrasi apa pun. Mapel dipilih dengan aturan sama seperti no. 4. |

Cerita pengguna §3 no. 5 dan 6 terpenuhi oleh baris 4–5: sesi pertama tetap
berguna, dan tidak ada satu pun jalur yang menampilkan angka gap lama sebagai
teguran.

### 6.2 Alur A — Satu kartu latihan (FL1 + FL2)

```
latihan.html  (kartu ke-n)
  │
  ├─ [strip umpan balik kartu sebelumnya]  ← dari sesi.umpan_balik_tertunda
  │   ditampilkan otomatis, tanpa tap tambahan (lihat catatan tap di bawah)
  │
  ├─ 1. Pengguna memilih keyakinan 1–5        ← TAP 1 (satu-satunya tap baru)
  │      → sesi.keyakinan_kartu_ini = nilai
  │      → tombol "Lihat jawaban" dilepas dari keadaan tertahan
  │
  ├─ 2. Pengguna menekan "Lihat jawaban"      ← TAP 2 (sudah ada sebelumnya)
  │      → jawaban [hidden] dilepas
  │
  └─ 3. Pengguna menandai Benar / Salah       ← TAP 3 (sudah ada sebelumnya)
         → catat ke localStorage SEKARANG:
              { id, sesi_id, kartu_id, mapel_id, keyakinan, benar, waktu, aturan_versi }
         → pangkas jendela per mapel
         → sesi.jawaban.push(...)
         → sesi.umpan_balik_tertunda = { keyakinan, benar }
         → sesi.keyakinan_kartu_ini = null
         → indeks++ → render kartu berikutnya
              (atau → latihan-selesai.html bila antrian habis)
```

**Anggaran ketukan (AC FL1).** Alur lama: 2 tap per kartu (Lihat jawaban →
Benar/Salah). Alur baru: 3 tap. **Tepat satu ketukan ekstra**, sesuai AC.

Karena anggaran itu sudah terpakai habis oleh FL1, umpan balik gap FL2
**tidak boleh menuntut ketukan tambahan**. Rancangan yang dipilih: strip
pembanding muncul otomatis di bagian atas kartu berikutnya (dan di
`latihan-selesai.html` untuk kartu terakhir), dengan `aria-live="polite"`
sehingga pembaca layar ikut mendengarnya. Ia muncul seketika setelah ketukan
Benar/Salah — jadi tetap terasa langsung — tanpa menambah langkah.

Dua alternatif yang ditolak, dicatat supaya tidak diusulkan ulang:

| Alternatif | Kenapa ditolak |
|---|---|
| Tahan di kartu yang sama, tampilkan gap, lalu tombol "Kartu berikutnya" | Menjadi 4 tap per kartu (+2) — melewati anggaran AC FL1 dan menggerus target sesi 15–25 menit (G3). |
| Chip keyakinan langsung membuka jawaban (menghapus tombol "Lihat jawaban") | Hemat satu tap, tetapi bertentangan dengan AC FL1 yang secara eksplisit menyebut tombol "Lihat jawaban" tertahan sampai keyakinan dipilih. SDD tidak boleh mengubah requirement. |

Penempatan visual strip ini adalah urusan tahap wireframe (§7); yang dikunci di
sini hanyalah **kapan** ia muncul dan **berapa** ketukan yang boleh dipakai.

### 6.3 Alur B — Akhir sesi (FL6)

**FL6 sudah final: gratis untuk v1** (§10.1). Karena itu alurnya menjadi lurus,
tanpa percabangan hak akses:

```
antrian habis
  → Sesi.tutup(): selesai_pada = sekarang
  → pindah ke latihan-selesai.html

latihan-selesai.html
  → baca sessionStorage['lanjut.levelin.sesi.v1']
  → ringkasSesi(sesi.jawaban)
  → isi slot skor benar/salah & per mapel yang SUDAH ADA (tidak diganti)
  → periksa akses.ringkasan_kalibrasi_sesi:
        'gratis'  → tampilkan blok ringkasan kalibrasi     ← JALUR v1
  → sessionStorage TIDAK dihapus di sini
       (supaya muat ulang halaman tidak mengosongkan hasil sesi;
        dibersihkan saat sesi baru dimulai)
```

**Jalur yang TIDAK aktif untuk v1** (dicatat supaya keputusannya tidak hilang,
bukan supaya dibangun sekarang):

| Nilai `akses.ringkasan_kalibrasi_sesi` | Status di v1 |
|---|---|
| `'gratis'` | **Aktif.** Satu-satunya jalur yang dibangun dan diuji. |
| `'berbayar'` + pengguna berhak | **Tidak aktif di v1.** Kemungkinan masa depan bila FL6 kelak dipindah ke paket berbayar. Tidak ada `hakAkses()` yang dibangun sekarang. |
| `'berbayar'` + pengguna tidak berhak | **Tidak aktif di v1.** Blok terkunci tidak dibangun (§7.4). |
| `'belum_diputuskan'` | **Tidak boleh muncul lagi.** Gerbang rilis (§5.4) menggagalkan build bila kunci ini kembali ke nilai tersebut. |

Implementasinya boleh tetap membaca kunci `akses.ringkasan_kalibrasi_sesi`
(bukan meng-hardcode "selalu tampil"), supaya perpindahan ke `'berbayar'` kelak
cukup mengganti satu nilai konfigurasi plus membangun blok terkunci. Tetapi
percabangan `'berbayar'` **tidak wajib diimplementasikan, tidak wajib diuji,
dan tidak boleh menahan pekerjaan T5.** Bila ditulis, ia ditandai jelas sebagai
jalur tidak aktif di komentar kode.

Bila `sessionStorage` kosong (halaman dibuka langsung tanpa sesi), halaman
memakai keadaan kosong yang ditulis — bukan angka contoh yang terbaca seperti
hasil nyata. Ini mengikuti aturan yang sudah berlaku untuk kemajuan checklist
di `app.js`.

### 6.4 Alur C — Saran harian di Beranda (FL4)

```
beranda.html dimuat
  → app.js merender F1 (kartu tenggat + linimasa)      ← TIDAK DISENTUH
  → levelin.js:
       muatKonfig()  (cadangan bawaan bila gagal)
       Kalibrasi.baca()            → peristiwa[]
       LANJUT.muatData('arsip')    → ketersediaan kartu per mapel
       LANJUT.muatData('mapel')    → nama mapel untuk ditampilkan
         │
         ├─ agregatPerMapel(peristiwa, konfig)
         ├─ saranHarian(agregat, ketersediaan, konfig) → { jenis, mapel_id }
         │
         └─ render kartu CTA "Latihan Hari Ini":
              - isi slot nama mapel (bila jenis = 'saran')
              - nyalakan satu varian [data-keadaan] sesuai jenis
              - pasang href = 'latihan.html?mapel=<id>' DI RUNTIME
```

Tiga hal yang mengikat di alur ini:

1. **Posisi.** Kartu CTA berada **di bawah** kartu tenggat F1 dalam urutan DOM.
   F1 tetap elemen berprioritas visual tertinggi (AC FL4). Kartu CTA tidak
   boleh disisipkan sebelum blok `.peringatan` linimasa.
2. **Query string dipasang di runtime, bukan di HTML.** `tools/check.js`
   memeriksa keberadaan berkas tanpa membuang query string, jadi
   `href="latihan.html?mapel=matematika"` yang ditulis langsung di HTML akan
   menggagalkan gerbang. Pola ini sudah dipakai `pasangArsip()` untuk
   `arsip-detail.html?mapel=`; ikuti persis.
3. **Tidak ada ikon nav baru.** Nav tetap empat: Beranda, Khusus SMK, Pilih
   Mapel, Checklist (AC FL4, batas navigasi PRD §6, dijaga `tools/check.js`).

### 6.5 Alur D — Kartu milik pengguna (FL5)

Level-In membaca `kartu.mapel_id` dan **mengabaikan** `kartu.sumber` sepenuhnya
saat mencatat kalibrasi: kartu "resmi" dan "pengguna" diperlakukan identik.
Yang tidak berubah:

- `kartu.sumber` dan `kartu.pemilik` tidak pernah ditulis oleh Level-In.
- Lencana "Buatan sendiri" / penanda "Diunggah pengguna — belum diverifikasi
  tim" tetap tampil dan tetap tidak bisa disembunyikan.
- `arsip-tambah.html` **tidak** menambah medan isian baru (AC FL5).
- Tidak ada jalur data yang membawa isi kartu pengguna keluar dari perangkat.

### 6.6 Alur E — Keadaan tepi

| Keadaan | Perilaku |
|---|---|
| `localStorage` mati/ditolak (mode penyamaran) | `Kalibrasi.baca()` mengembalikan riwayat kosong; sesi tetap berjalan penuh; saran jatuh ke `jenis: 'pengguna_baru'`. Tidak ada galat yang tampil ke pengguna. |
| JSON riwayat rusak | Ditangkap `try/catch`, diperlakukan sebagai kosong. **Tidak** ditimpa diam-diam sampai ada penulisan berikutnya. |
| `versi` kunci berbeda dari yang dikenal | Data diabaikan (dianggap kosong), tidak dibaca paksa. Ini alasan akhiran `.v1` ada, sama seperti `lanjut.profil.v1`. |
| Kembali setelah berminggu-minggu | Tidak ada perhitungan bolong, tidak ada streak. Blok `data-keadaan="kembali"` yang sudah ada di `latihan.html` dipakai apa adanya. |
| Sesi ditinggalkan di tengah | Catatan kalibrasi yang sudah tertulis tetap sah; `sesi_latihan.selesai_pada` tidak pernah terisi; tidak ada ringkasan yang ditampilkan. |
| Kartu dihapus setelah dijawab | Catatan tetap ada karena `mapel_id` sudah disalin (§3.2). Agregat tidak berubah. |
| Dua perangkat berbeda | Riwayat tidak menyatu (tidak ada akun di Level-In v1). Diterima; lihat risiko R3. |

---

## 7. Kebutuhan Desain UI/UX

> **Bagian ini adalah daftar kebutuhan, bukan desain.** Wireframe dibuat
> terpisah oleh user dengan perkakas desainnya sendiri. Yang ditulis di sini:
> komponen apa yang harus ada, keadaan apa yang harus punya tampilan, dan
> batasan apa yang tidak boleh dilanggar. **Tidak ada wireframe, tata letak,
> ukuran, atau warna final yang ditentukan di sini.**

### 7.1 Batasan yang berlaku untuk semua komponen di bawah

| Batasan | Sumber |
|---|---|
| Tidak ada merah/oranye, termasuk untuk "salah" dan "yakin tapi meleset". Mendesak diwakili biru tua. | `app/README.md` (mengikat), AC FL2 |
| Tidak ada kata "gagal", tidak ada nada menghakimi | AC FL2 |
| Jalan di layar 360px tanpa gulir mendatar | DoD §15 dokumen induk |
| Sasaran sentuh minimum 44px (`--sentuh`) | `tools/test-desain.js` |
| Warna/ukuran hanya lewat `var(--token)` `assets/tokens.css` | `app/README.md` |
| Setiap komponen punya keadaan kosong yang **ditulis**, bukan layar putih | DoD §15 |
| Seluruh kalimat berasal dari `docs/salinan-teks-lanjut.md` | DoD §15 |
| Navigasi bawah tetap 4 ikon; tidak ada ikon Level-In | AC FL4, PRD §6 |
| Maskot kelinci wisudawan, wordmark, dan palet biru tiga-tingkat mengikuti `design.md`; token kerja `tokens.css` | PRD §6 |

### 7.2 Komponen 1 — Pemilih keyakinan (`latihan.html`, sebelum jawaban) — FL1

Yang perlu didesain:

- **Pertanyaan pemicu.** Satu baris, di atas pilihan. Isi pertanyaan sudah
  dikunci PRD: "Seberapa yakin kamu bisa jawab ini?"
- **Lima pilihan diskrit** berbentuk tombol/chip — **final: bukan slider**
  (FL1). Tersusun dalam satu baris.
- **Penanda terpilih** yang terbaca tanpa mengandalkan warna saja (mis. bentuk
  atau bobot huruf), karena satu-satunya palet yang tersedia adalah tiga tingkat
  biru.
- **Baris arti tingkat terpilih.** Perhitungan ruang: pada 360px, lebar isi
  kartu ± 280px; lima chip + empat sela 8px menyisakan ± 49px per chip. Cukup
  untuk angka 1–5, **tidak cukup** untuk label kata di dalam chip. Karena itu
  arti tiap tingkat ditampilkan sebagai **satu baris terpisah di bawah
  barisan chip**, berubah mengikuti pilihan (`aria-live="polite"`), dan tiap
  chip membawa label lengkap di `aria-label` untuk pembaca layar.
- **Keadaan "belum memilih" pada tombol "Lihat jawaban".** Tombol tertahan
  (AC FL1) tetapi **wajib menjelaskan kenapa** — jangan memakai `disabled`
  polos yang menghilangkan tombol dari urutan fokus dan tidak memberi umpan
  balik. Yang perlu didesain: tampilan tombol tertahan + satu baris petunjuk
  yang muncul saat pengguna mencoba menekannya.
- **Keadaan terisi ulang:** saat pindah ke kartu berikutnya, pilihan kembali
  kosong. Perlu jelas secara visual bahwa ini pertanyaan baru, bukan sisa
  jawaban sebelumnya.

### 7.3 Komponen 2 — Strip pembanding gap (`latihan.html`, setelah jawaban dinilai) — FL2

Yang perlu didesain:

- **Satu strip ringkas** berisi dua sisi: apa yang pengguna katakan (tingkat
  keyakinan) dan apa hasilnya. Bukan angka gap, bukan persentase.
- **Empat varian isi** yang semuanya harus punya rancangan: `overconfident`,
  `underconfident`, `selaras`, `netral`.
- **Nada netral.** Varian `overconfident` adalah yang paling rawan terbaca
  sebagai teguran — perlu perhatian khusus, dan tidak boleh memakai warna
  peringatan.
- **Penempatan:** muncul otomatis tanpa ketukan tambahan, di bagian atas kartu
  berikutnya (§6.2). Perlu dipastikan strip ini tidak mendorong soal kartu baru
  keluar layar di 360px.
- **Keadaan tidak ada:** pada kartu pertama sesi, strip ini tidak ada sama
  sekali (bukan strip kosong).

### 7.4 Komponen 3 — Ringkasan kalibrasi akhir sesi (`latihan-selesai.html`) — FL6

**FL6 gratis (final, §10.1).** Konsekuensinya untuk desain: yang **wajib**
didesain di rilis ini hanya versi tampil penuh dan versi keadaan kosong.

Yang perlu didesain (wajib):

- **Blok ringkasan kalibrasi** yang berdampingan dengan skor benar/salah dan
  rincian per mapel yang **sudah ada** — bukan menggantikannya (AC FL6).
- Isi: jumlah kartu "yakin tapi meleset" dan "ternyata bisa" pada sesi itu.
  **Tanpa** penghitung hari beruntun (AC FL6).
- **Tampil penuh** — satu-satunya varian akses yang dibangun di v1, karena FL6
  gratis untuk semua pengguna.
- **Keadaan kosong:** halaman dibuka tanpa sesi berjalan (`sessionStorage`
  hilang) — perlu tampilan yang ditulis, bukan angka contoh.

Yang **tidak lagi wajib** di rilis ini (opsi masa depan, bukan pekerjaan
sekarang):

- **Tampil terkunci** — blok ajakan untuk pengguna tidak berhak. Ini hanya
  relevan bila FL6 kelak dipindahkan ke paket berbayar. Karena keputusan v1
  sudah "gratis", varian ini **tidak wajib didesain dan tidak wajib dibangun**.
  Catatan rancangannya dipertahankan supaya tidak perlu dipikirkan ulang dari
  nol bila kelak dibutuhkan: blok terkunci harus **tidak menutupi** skor
  benar/salah dan rincian per mapel yang sudah ada, mengikuti kaidah
  `rancangan-arsip-latihan-banksoal.md` §2.2 ("yang gratis harus tetap berguna
  utuh").

### 7.5 Komponen 4 — Kartu CTA "Latihan Hari Ini" (`beranda.html`) — FL4

Yang perlu didesain:

- **Satu kartu CTA** berlabel "Latihan Hari Ini", diletakkan **di bawah** kartu
  tenggat terdekat F1. F1 tetap yang paling menonjol; kartu ini tidak boleh
  menyaingi bobot visualnya (AC FL4).
- **Lima varian** sesuai rantai fallback §6.1f, semuanya wajib punya rancangan:

  | Varian | Yang harus tersampaikan |
  |---|---|
  | `saran` | Satu nama mapel + alasan singkat tanpa istilah teknis. |
  | `kalibrasi_selaras` | Ajakan latihan biasa, tanpa menyebut gap. |
  | `belum_cukup_data` | Ajakan latihan + penanda eksplisit bahwa polanya **belum bisa disimpulkan** — bukan "gap kamu 0". |
  | `pengguna_baru` | Ajakan latihan tanpa satu pun istilah kalibrasi. |
  | `arsip_kosong` | Mengarahkan ke Arsip Belajar, tidak menjanjikan sesi. |

- **Tidak ada ikon nav baru.** Kartu ini adalah satu-satunya pintu baru;
  pintu lama dari `arsip.html` tetap ada.
- Hubungan dengan kartu "Latihan & Arsip Belajar" yang sudah ada di Beranda
  perlu diperjelas supaya tidak terbaca sebagai dua pintu yang membingungkan.

### 7.6 Komponen 5 — Penanda status kalibrasi per mapel (opsional, ikut keputusan §10.2 no. 3)

Kebutuhan ini **melekat pada tampilan agregat lintas-sesi**, yaitu satu-satunya
bagian yang statusnya masih belum diputuskan. **Ini keputusan terpisah dari
FL6** — FL6 sudah final gratis, tetapi itu tidak dengan sendirinya menjadikan
tampilan agregat gratis (§3.6).

Yang perlu didesain **hanya bila** keputusan §10.2 no. 3 menempatkannya sebagai
fitur yang tampil:

- Penanda kecil per baris mapel di `arsip.html` dengan tiga keadaan:
  `belum cukup data`, `selaras`, `sering yakin tapi meleset`.
- **Keadaan "belum cukup data" wajib punya rancangan tersendiri** — AC FL3
  melarang menampilkannya seolah gap-nya nol.

Bila keputusan itu menempatkan agregat sebagai berbayar dan pengguna tidak
berhak, baris mapel tampil **tanpa penanda apa pun** — bukan penanda terkunci
di tiap baris, karena itu akan mengubah halaman Arsip yang gratis menjadi
etalase berbayar.

Selama keputusan belum ada, komponen ini **tidak dirender sama sekali**, dan
itu tidak mengurangi satu pun fitur must-have: perhitungan agregat FL3 tetap
berjalan penuh dan tetap menyalakan FL4 (K6).

### 7.7 Teks yang harus ditulis lebih dulu

Sebelum satu baris kode UI ditulis, `docs/salinan-teks-lanjut.md` perlu
bagian baru (usul: **§4.8 Level-In / kalibrasi**) yang memuat:

- pertanyaan keyakinan dan arti tiap tingkat 1–5;
- empat varian kalimat strip pembanding;
- kalimat ringkasan akhir sesi (varian penuh — varian terkunci **tidak
  diperlukan di v1**, lihat §7.4);
- lima varian kalimat kartu CTA Beranda;
- kalimat "belum cukup data";
- kalimat keadaan kosong `latihan-selesai.html` tanpa sesi.

Alasannya mengikat, bukan formalitas: `tools/test-desain.js` memeriksa kalimat
di aplikasi memang ada di dokumen salinan teks, dan aturan render `app.js`
melarang JavaScript mengarang kalimat — yang boleh dihasilkan JS hanya angka,
tanggal, dan pengalihan atribut.

**Istilah internal vs istilah yang dilihat pengguna** (kode boleh memakai kiri,
layar tidak boleh):

| Di kode | Di layar |
|---|---|
| `overconfident` | "yakin tapi meleset" |
| `underconfident` | "ternyata bisa" |
| `selaras` | "perkiraanmu pas" |
| `belum_cukup_data` | "belum cukup data" |
| `rate_overconfident` | tidak pernah ditampilkan sebagai angka |
| "Level-In" | tidak dipakai sebagai label di layar (nama internal fitur) |

---

## 8. Risiko Teknis & Mitigasi

| # | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R1 | **Ambang 40%/5 kartu salah** — PRD sendiri menyatakan ini perkiraan, bukan hasil uji | Saran harian mengarahkan siswa ke mapel yang salah; kepercayaan pada fitur hilang | Simpan mentah, turunkan saat dibaca (K2); ambang di satu berkas konfigurasi (K3); `konfig_versi`/`aturan_versi` melekat di tiap catatan sehingga perubahan bisa dilacak. Mengubah ambang = mengganti satu nilai, **tanpa** migrasi data. Peninjauan ulang tetap wajib dijadwalkan (PRD §7.1, terbuka di §10.2). |
| R2 | **`localStorage` hilang/dimatikan** (mode penyamaran, kuota penuh, pengguna membersihkan data) | Seluruh riwayat kalibrasi lenyap; saran kembali ke nol | Semua akses dibungkus `try/catch` mengikuti pola `Profil` di `app.js`; kegagalan berujung pada `jenis: 'pengguna_baru'` yang memang sudah dirancang berguna, bukan layar galat. Fitur tidak pernah menjadi jalan buntu karena penyimpanan. |
| R3 | **Tidak ada akun di Level-In v1** — riwayat terikat satu peramban di satu perangkat | Pengguna ganti HP/peramban kehilangan kalibrasi | Diterima secara sadar untuk P1: menambah akun menyentuh cakupan di luar Level-In. Skema server (§3.2) dan endpoint (§4.2) sudah dirancang sehingga penyambungan kelak tidak menuntut perubahan bentuk data — dan `docs/SDD-Backend-Foundation.md` memakai keduanya apa adanya sebagai titik awal. Batas ini perlu dinyatakan apa adanya di UI, bukan disembunyikan. |
| R4 | **Menilai keyakinan terasa jadi beban**, sesi melewati 15–25 menit (G3) | Pengguna berhenti memakai latihan sama sekali | Anggaran ketukan dikunci di +1 (§6.2), dua alternatif yang lebih boros ditolak tertulis; chip diskrit bukan slider (lebih cepat, tidak menuntut presisi); tidak ada langkah konfirmasi; tidak ada isian alasan. |
| R5 | **Umpan balik terbaca sebagai teguran** | Bertentangan langsung dengan nada produk dan AC FL2 | Tanpa merah/oranye (dijaga `tools/test-desain.js`); jendela per mapel membuat riwayat lama luruh sendiri (K4); tidak ada streak; teks wajib lewat dokumen salinan teks; istilah teknis tidak pernah muncul di layar (§7.7). |
| R6 | **Fitur P1 merusak halaman P0** — `beranda.html` adalah P0 | Cakupan rilis v1 tersentuh, melanggar G4 | Berkas terpisah `levelin.js` (K5); tiap pemasangan dibungkus `try/catch`; isi cadangan statis di HTML; nav dijaga gerbang "tepat 4 ikon"; daftar berkas yang boleh berubah dikunci di §9.2. |
| R7 | **Sinkronisasi ganda saat API dibangun** | *Rate* kalibrasi salah permanen tanpa gejala yang terlihat | `id` dibuat klien dan menjadi kunci idempoten; server tidak pernah menerima nilai turunan dari klien (§4.3). |
| R8 | **Pengguna "mengakali" skala** (selalu memilih 1 supaya tidak pernah tampak overconfident) | Data kalibrasi tidak mencerminkan kenyataan | Tidak ada skor, lencana, atau ganjaran apa pun yang terikat pada kalibrasi — jadi tidak ada yang bisa dimenangkan dengan mengakalinya. Dicatat sebagai batas metode, bukan bug yang bisa "diperbaiki" secara teknis. |
| R9 | **Keputusan akses datang terlambat** | Blok yang bersangkutan tidak bisa dirilis, atau dirilis dengan asumsi sepihak | **Sebagian sudah tertutup:** FL6 sudah diputuskan gratis (§10.1), sehingga tidak ada lagi pemblokir untuk FL1–FL6. Sisanya (`tampilan_agregat_mapel`) tidak memblokir karena komponennya opsional dan mesin agregasi tidak digerbang (K6). Gerbang rilis §5.4 tetap menjaga: komponen §7.6 tidak boleh tayang selama kuncinya `"belum_diputuskan"`, jadi mustahil ada build yang memilih arah diam-diam. |
| R10 | **Volume data tumbuh diam-diam** | `localStorage` penuh, penulisan gagal senyap | Pemangkasan jendela per mapel di setiap penulisan (§3.5); batas atas terhitung ± 60 KB; kegagalan `setItem` ditangkap dan tidak menghentikan sesi. |
| R11 | **Kalimat baru ditulis langsung di kode** | Melanggar DoD §15 dan menggagalkan gerbang teks | Teks Level-In masuk `salinan-teks-lanjut.md` §4.8 **sebelum** implementasi (§7.7); `tools/test-desain.js` menjaga. |
| R12 | **Cakupan backend baru merembes ke Level-In v1** | Level-In yang seharusnya client-only ikut menunggu backend siap, dan jadwal P1 melar | Batas ditulis tegas di §4.1: klien Level-In v1 **tetap client-only**, dan penyambungan ke backend adalah pekerjaan terpisah yang mengikuti §4.2/§4.3 tanpa mengubah bentuk data klien. Dampak jadwal backend terhadap rilis P0 dibahas di `docs/SDD-Backend-Foundation.md`, bukan di sini. |

---

## 9. Rencana Kerja & Batas

### 9.1 Urutan pengerjaan yang disarankan

| Tahap | Isi | Prasyarat |
|---|---|---|
| T1 | Teks Level-In masuk `docs/salinan-teks-lanjut.md` §4.8 | — |
| T2 | `data/levelin-konfig.json` + lapisan konfigurasi & penyimpanan di `levelin.js` | T1 |
| T3 | Fungsi murni §6.1 + `tools/test-levelin.js` (tanpa UI sama sekali) | T2 |
| T4 | FL1 + FL2 di `latihan.html` | T3, wireframe §7.2–7.3 |
| T5 | FL6 di `latihan-selesai.html` (varian tampil penuh + keadaan kosong) | T4, wireframe §7.4 |
| T6 | FL4 kartu CTA di `beranda.html` | T3, wireframe §7.5 |
| T7 | Perbarui gerbang validasi (§5.4) dan `app/README.md` | T4–T6 |

**Catatan perubahan dari draf sebelumnya.** Tahap **T0 ("Keputusan §10.1 diambil
PM") sudah terpenuhi dan dihapus dari rencana ini.** PM memutuskan FL6 gratis
untuk v1, sehingga:

- T5 **tidak lagi diblokir** oleh keputusan bisnis apa pun; prasyaratnya kini
  hanya T4 dan wireframe §7.4.
- T5 juga menyusut: hanya satu varian akses yang dibangun (tampil penuh),
  bukan dua (§7.4).
- Keputusan yang **masih terbuka** — `akses.tampilan_agregat_mapel` (§7.6,
  §10.2 no. 3) — **tidak memblokir T5 maupun tahap lain mana pun.** Keduanya
  independen karena K6 (§1) memisahkan mesin agregasi dari tampilannya:
  FL6 merangkum satu sesi dari `sessionStorage`, sementara tampilan agregat
  membaca jendela lintas-sesi di `arsip.html`. Tidak ada kode yang dipakai
  bersama yang keputusannya bisa berubah. Selama keputusan itu belum ada,
  komponen §7.6 sekadar tidak dirender.

T3 mendahului seluruh pekerjaan UI dengan sengaja: logika keputusan Level-In
adalah bagian yang kalau salah akan menyesatkan siswa, dan ia bisa diuji penuh
tanpa satu piksel pun dibuat.

### 9.2 Berkas yang boleh berubah (dan yang tidak)

**Boleh berubah:** `app/beranda.html` (penambahan satu kartu CTA di bawah blok
linimasa), `app/latihan.html`, `app/latihan-selesai.html`, `app/arsip.html`
(hanya pemasangan tujuan tautan di runtime), `app/assets/app.css` (bila ada
kelas bersama yang perlu dipakai ulang), `app/tools/*`, `app/README.md`,
`docs/salinan-teks-lanjut.md`.

**Tidak boleh berubah oleh pekerjaan ini:** `onboarding.html`, `khusus-smk.html`,
`pilih-mapel.html`, `checklist.html`, `alumni.html`, `index.html`,
`bank-soal.html`, `arsip-detail.html`, `arsip-tambah.html`, Bagian 1
`assets/tokens.css`, susunan `<nav class="tabbar">` di seluruh halaman, dan
seluruh perilaku F1–F5.

### 9.3 Definisi selesai tambahan untuk Level-In

Di luar DoD §15 dokumen induk, Level-In disebut selesai bila:

- [ ] `node tools/validasi.js` lulus, termasuk suite `test-levelin.js` baru.
- [ ] Nav tetap tepat 4 ikon di seluruh halaman yang disentuh.
- [ ] Sesi latihan bisa diselesaikan penuh dengan JavaScript menyala di 360px
      tanpa gulir mendatar.
- [ ] Mematikan `localStorage` tidak membuat satu halaman pun kosong atau
      melempar galat ke pengguna.
- [ ] Kelima varian kartu CTA §6.1f bisa dipicu dan sudah dicoba.
- [ ] Tidak ada kalimat Level-In di aplikasi yang tidak ada di
      `docs/salinan-teks-lanjut.md`.
- [ ] `akses.ringkasan_kalibrasi_sesi` bernilai `"gratis"` (nilai final v1) —
      **tidak boleh** `"belum_diputuskan"`.
- [ ] `akses.tampilan_agregat_mapel` boleh tetap `"belum_diputuskan"` **selama**
      komponen §7.6 tidak dirender di rilis ini. Bila komponen itu dibangun,
      kuncinya wajib sudah bernilai `"gratis"`/`"berbayar"` lebih dulu (§5.4).

### 9.4 Ketertelusuran ke PRD

| PRD | Dirancang di |
|---|---|
| FL1 — Input keyakinan sebelum jawaban | §6.2 (alur & anggaran ketukan), §7.2 (komponen), §3.3 (`keyakinan`) |
| FL2 — Pembandingan keyakinan vs hasil | §6.1a–b (perhitungan), §6.2 (waktu tampil), §7.3 (komponen) |
| FL3 — Agregasi gap per mapel | §6.1c (rumus, ambang, "belum cukup data"), §3.2–3.6 (persistensi & konfigurasi). **Perhitungannya final dan tidak digerbang**; hanya *tampilan* agregat opsional §7.6 yang masih menunggu keputusan (§10.2 no. 3). |
| FL4 — Saran belajar harian di Beranda | §6.1e–f (urutan & fallback), §6.4 (alur), §7.5 (komponen) |
| FL5 — Integrasi kartu Arsip Belajar | §3.1, §6.5 |
| FL6 — Ringkasan kalibrasi akhir sesi | §6.1d, §6.3, §7.4 — **final: gratis (§10.1)** |
| G4 — P0 tidak tersentuh | K5, §5.3, §9.2, R6 |

---

## 10. Pertanyaan Terbuka

### 10.1 SELESAI — FL6 gratis (v1)

> **Keputusan PM/user: FL6 (ringkasan kalibrasi di akhir sesi) adalah fitur
> GRATIS untuk v1.**
>
> Ini satu-satunya keputusan bisnis yang tadinya memblokir implementasi FL6.
> Dengan keputusan ini, **tidak ada lagi pemblokir untuk FL1–FL6.**

**Yang berubah karena keputusan ini:**

| Bagian | Perubahan |
|---|---|
| §3.6 | `akses.ringkasan_kalibrasi_sesi` = `"gratis"` (sebelumnya `"belum_diputuskan"`). |
| §5.4 | Gerbang rilis untuk kunci ini lulus. Gerbang untuk `tampilan_agregat_mapel` disempitkan: hanya berlaku bila komponen §7.6 benar-benar dirender. |
| §6.3 | Alur akhir sesi menjadi satu jalur. Percabangan `'berbayar' + berhak/tidak berhak` **tidak aktif untuk v1** — dicatat sebagai kemungkinan masa depan, tidak dibangun dan tidak diuji sekarang. |
| §7.4 | Hanya varian **tampil penuh** + keadaan kosong yang wajib didesain. Varian **tampil terkunci** turun status menjadi **opsi masa depan**, tidak wajib di rilis ini. |
| §9.1 | Tahap **T0 dihapus**; T5 tidak lagi diblokir keputusan bisnis. |
| §9.3 | DoD disesuaikan: yang wajib bukan lagi "tidak ada `belum_diputuskan` sama sekali", melainkan "tidak ada `belum_diputuskan` pada kunci yang komponennya dirender". |

**Konsekuensi yang perlu disadari (bukan masalah, tapi dicatat):**

- Tidak ada pekerjaan tambahan. Blok terkunci tidak dipakai; `hakAkses()` tidak
  perlu dibangun di v1, dan tidak ada pengguna yang melihat ajakan berlangganan
  di layar akhir sesi.
- Keputusan ini **tetap dibaca dari konfigurasi**, bukan di-hardcode (§6.3),
  sehingga bila kelak FL6 dipindah ke paket berbayar, yang perlu dikerjakan
  adalah membangun blok terkunci — bukan membongkar alur.
- Keputusan ini **tidak** menyimpulkan apa pun tentang `tampilan_agregat_mapel`.
  Lihat §10.2 no. 3.

### 10.2 Terbuka, tetapi **tidak** memblokir implementasi

Ketiganya soal proses/produk, bukan keputusan teknis, dan tidak menghambat
pengerjaan tahap mana pun di §9.1.

1. **Siapa yang memicu peninjauan ulang ambang 40%/5, dan berdasarkan metrik
   apa** (PRD §7.1). Rancangan ini membuat peninjauannya murah (R1), tetapi
   tidak bisa memutuskan siapa yang menjadwalkannya. Yang bisa disiapkan dari
   sisi teknis: `sesi_latihan.asal_mula` dan `aturan_versi` sudah dicatat,
   sehingga ketika peninjauan dilakukan, datanya sudah tersedia.

2. **Kapan CTA "Latihan Hari Ini" layak naik menjadi ikon bottom nav**
   (PRD §7.2). **Tidak boleh diputuskan tim teknis** karena mengubah keputusan
   nav yang dikunci di `app/README.md`. Sampai ada keputusan, nav tetap empat
   ikon dan gerbang validasi menjaganya.

3. **`akses.tampilan_agregat_mapel` — tampilan agregat kalibrasi per mapel di
   Arsip Belajar (§7.6): gratis atau berbayar?**
   **Menunggu keputusan PM. Ini keputusan yang TERPISAH dari FL6** — keputusan
   §10.1 hanya menyangkut ringkasan per-sesi, dan **tidak** dengan sendirinya
   menjadikan tampilan agregat gratis. SDD ini sengaja **tidak menyimpulkannya**
   karena dampaknya model bisnis, bukan teknis.

   Duduk perkaranya, mengulang PRD §7.3 tanpa menambah tafsir:
   `rancangan-arsip-latihan-banksoal.md` §2.2 menempatkan **"ringkasan akhir
   sesi"** di kolom gratis dan **"statistik kemajuan per mata pelajaran"** di
   kolom berbayar. FL6 berpola seperti yang pertama (sudah diputuskan gratis);
   tampilan agregat lintas-sesi berpola seperti yang kedua. Kombinasi "FL6
   gratis, tampilan agregat berbayar" karena itu **didukung penuh tanpa
   perubahan kode** — tetapi itu catatan kemungkinan, **bukan rekomendasi**.

   **Kenapa ini tidak memblokir apa pun:**
   - Yang digerbang hanyalah tampilan, tidak pernah perhitungan (K6). Mesin
     agregasi yang menyalakan FL4 (must-have) selalu berjalan untuk semua
     pengguna, apa pun keputusannya.
   - Komponen §7.6 berstatus opsional dan tidak ada di daftar must-have PRD
     §4.1. Selama keputusan belum ada, komponen itu tidak dirender — dan tidak
     ada fitur wajib yang hilang karenanya.
   - Gerbang §5.4 menjaga agar komponen itu tidak bisa tayang diam-diam tanpa
     keputusan.

   **Konsekuensi tiap arah — bahan pertimbangan, bukan usulan:**

   | Bila diputuskan | Konsekuensi |
   |---|---|
   | Tampilan agregat **gratis** | Komponen §7.6 masuk daftar wireframe dan implementasi; tidak butuh `hakAkses()`. |
   | Tampilan agregat **berbayar** | Penanda status per mapel di `arsip.html` tidak dirender untuk pengguna tidak berhak. Selama belum ada akun & mekanisme pembayaran, itu berarti **tidak ada** pengguna yang melihatnya — efeknya sama dengan tidak membangunnya dulu. FL4 tetap berjalan normal. |
   | **Ditunda terus** | Sah. Level-In v1 tetap bisa dirilis lengkap tanpa komponen ini. |

### 10.3 Catatan, bukan pertanyaan

- **Klien Level-In sudah dikonfirmasi sepenuhnya: client-only.** Seluruh
  Level-In v1 berjalan di `localStorage` + `sessionStorage` tanpa akun.
  Keputusan cakupan baru dari PM/user untuk membangun backend nyata
  (`docs/SDD-Backend-Foundation.md`) **tidak mengubah bentuk data, alur, atau
  komponen mana pun di dokumen ini untuk v1 Level-In.** Penyambungan ke backend
  itu — bila dan ketika dibangun — mengikuti rancangan §4 (API) yang sudah ada
  di sini, tanpa perubahan bentuk data klien. Lihat batas lengkapnya di §4.1
  dan risiko R12.
- **Kode HEX presisi palet belum dikunci.** Ini status resmi `design.md` §6,
  bukan celah SDD ini. Level-In memakai token `assets/tokens.css` yang sudah
  berjalan dan **tidak memperkenalkan warna baru**, jadi penyelarasan HEX kelak
  tidak menuntut perubahan apa pun di fitur ini.
- **Bank Soal Mitra di luar cakupan.** Level-In v1 hanya berlaku di Arsip
  Belajar (kartu "resmi" + "pengguna") — final di PRD FL11. Kolom `mapel_id`
  dan `kartu_id` pada catatan kalibrasi sudah cukup untuk menampung kartu mitra
  kelak tanpa perubahan skema, tetapi tidak ada satu baris pun yang dibangun
  untuk itu sekarang.
- **FL7 (tren jangka panjang) dan FL8 ("Pilih Cita-cita") tidak dirancang di
  sini.** Keduanya nice-to-have dengan cakupan terpisah; §3.5 mencatat apa yang
  perlu ditambahkan bila FL7 kelak dibangun.

---

*Dokumen ini merancang cara membangun requirement di `docs/PRD-LevelIn.md`, dan
tidak mengubah satu pun di antaranya. Setiap keputusan teknis di sini tunduk
pada `docs/prd-sdd-lanjut.md` sebagai sumber kebenaran tunggal.*
