# LAPORAN LANJUT_029 — Audit Kesenjangan Fitur MVP-PWA vs LANJUT_App

**Tanggal:** 29 September 2026 (bukti dikumpulkan 28–29 Sep)
**Kode yang diperiksa:** commit `ee68a93` (kode aplikasi sama dengan `c51a980`; `ee68a93` hanya berisi dokumen)
**Menggantikan:** versi laporan di commit `ee68a93`. Beberapa klaimnya tidak cocok dengan kode; daftar koreksinya ada di Bagian 7.

**Cara audit.** Tidak ada kode, data, atau konfigurasi yang diubah.
- Membaca kode `MVP-PWA/`, `LANJUT_App/`, dan `LANJUT_App/server/`.
- Tes: `npm test` backend **69/69 lolos**; `node tools/validasi.js` PWA **semua gerbang lolos**, termasuk `test-levelin.js` (**96 cek**).
- PWA dibuka di Chrome 360 px (server statis lokal): onboarding, arsip, arsip-detail, latihan → latihan-selesai, beranda, bank-soal, eksplorasi-tujuan (Teknik Informatika & Teknik Elektro). **0 galat JS.**
- API backend dipanggil dengan akun uji, **hanya GET** (tidak menulis data).
- Isi basis data dibaca saja (jumlah baris & status verifikasi). Yang dibaca adalah DB lokal **`lanjut_test`**, bukan produksi (produksi belum ada).
- Layar Expo terakhir dijalankan di web 360 px pada 28 Sep (skrip uji LANJUT_027); tidak diulang untuk audit ini.

---

## 1. Jawaban singkat

**Belum setara.** Lima layar P0 (F1–F5) ada di Expo, ditambah dua fitur yang tidak ada di PWA (Jalur Saya, Cek Posisi Gue). Yang belum ada:

| Tidak ada di Expo | Sebagian di Expo | Tidak ada di keduanya |
|---|---|---|
| Onboarding cerita, F6 Arsip Belajar, F7 Latihan, Level-In, F9 Bank Soal, F10 Eksplorasi Tujuan | F3 Pilih Mapel (tanpa pintu ke F10; simpan ke checklist lebih umum), F5 Daftar Periksa (tanpa butir tambahan dari F3/F10), Beranda (tanpa pintu Arsip/Latihan dan kartu saran Level-In) | F8 Fitur berbayar |

**Temuan paling penting:** endpoint Level-In di backend **gagal saat dipanggil**. `GET /kalibrasi/ringkasan` dan `GET /saran-harian` membalas **500** (dijalankan), karena `keputusan.js` masih stub. Expo belum memanggil endpoint ini, jadi pengguna v1 tidak terdampak. Tetapi Level-In **tidak bisa** diselesaikan dengan "menyalin fungsi dari PWA" saja (lihat 4.4).

---

## 2. Inventaris fitur MVP-PWA (Langkah 1)

| Fitur | Halaman / file utama | Data yang dipakai | Yang benar-benar dikerjakan kodenya |
|---|---|---|---|
| Splash | `index.html`, `pasangSplash()` di `assets/app.js` | `localStorage lanjut.profil.v1` | Profil ada → Beranda, belum → Onboarding |
| Onboarding | `onboarding.html`, `pasangOnboarding()` | `localStorage lanjut.profil.v1` | 4 layar cerita + 1 layar tanya (kelas, prodi impian). Layar ke-3 menjanjikan "Latihan harian: 15 menit" |
| F1 Beranda / Linimasa | `beranda.html`, `pasangBeranda()` | `data/linimasa.json` | Tenggat terdekat + linimasa. Beranda juga berisi pintu "Latihan & Arsip Belajar", pintu Cerita Alumni, dan kartu saran Level-In (`pasangSaranBeranda()` di `levelin.js`) |
| F2 Khusus SMK | `khusus-smk.html`, `pasangKhususSmk()` | `data/khusus-smk.json` | 6 butir berpasangan |
| F3 Pilih Mapel | `pilih-mapel.html`, `pasangPilihMapel()` | `prodi.json`, `mapel.json`, `prodi-mapel.json`, profil lokal | Prodi → mapel pendukung + ketersediaan → saran 2 mapel. Tombol ke F10. "Simpan ke Daftar Periksa" **menambah butir khusus prodi** ("Pilih X & Y sebagai mapel TKA — untuk [prodi]") lalu mencentangnya |
| F4 Cerita Alumni | `alumni.html`, `pasangAlumni()` | `data/cerita-alumni.json` | 2 cerita **contoh**, `izin_tayang: false` |
| F5 Checklist | `checklist.html`, `pasangChecklist()` | `checklist.json`, `localStorage` (progres + butir tambahan) | 11 butir, 3 kategori, centang lokal, ditambah butir dari F3/F10. **Tidak ada** saringan kelas/jalur di layar (0 keping kelas/jalur) |
| F6 Arsip Belajar | `arsip.html`, `arsip-detail.html`, `arsip-tambah.html` | `arsip.json` (12 kartu kurasi) + kartu pengguna di `localStorage` | Daftar mapel + jumlah kartu, tab Semua/Catatan/Soal, formulir kartu baru. Kartu kurasi diberi lencana **"Resmi"** |
| F7 Latihan | `latihan.html`, `latihan-selesai.html`, `pasangLatihan()` | **Satu kartu statis di HTML** (`k-mtk-1`), tidak membaca `arsip.json` | Pilih keyakinan → lihat jawaban → Benar/Salah → selesai. Di browser: 1 kartu, skor "0/1". `docs/backlog-v1.1-F7-antrian-kartu.md` menyatakan antrian multi-kartu **belum pernah diimplementasikan** |
| Level-In | `assets/levelin.js` (1039 baris), `levelin.css`; dipasang di beranda, latihan, latihan-selesai | `levelin-konfig.json`, `localStorage lanjut.levelin.v1`, `sessionStorage` | Chip keyakinan 1–5, strip gap, ringkasan kalibrasi, saran harian. Lapisan keputusan murni lolos 96 cek |
| F9 Bank Soal | `bank-soal.html` (tanpa logika JS) | Markup statis | 2 kartu "[nama mitra]" + keadaan kosong. Belum ada mitra |
| F10 Eksplorasi Tujuan | `eksplorasi-tujuan.html`, `pasangEksplorasiTujuan()` | `data/profil-prodi.json` | Profil prodi (peminat, mata kuliah, profesi, kampus). Prodi tanpa profil → daftar cadangan. "Simpan ke Daftar Periksa" menambah butir "Riset Kampus" |
| Daftar / Masuk / Akun | `daftar.html`, `masuk.html`, `akun.html`, `assets/api.js` | API `/auth/*`, `/pengguna/saya`, `/konten/prodi` | Akun opsional; tanpa akun tampil keadaan tamu. PWA **tidak** memanggil `/sinkron/klaim` |
| F8 Fitur berbayar | — | — | Hanya ada di PRD; tidak dibangun |

---

## 3. Status di LANJUT_App dan kesiapan backend (Langkah 2)

Tabel utama (format "Laporkan di akhir"). Ukuran relatif hanya diisi untuk fitur yang belum ada atau sebagian; alasannya ada di Bagian 4.

| Fitur | Ada di Expo? | Kesiapan backend | Ketergantungan konten | Ukuran relatif |
|---|---|---|---|---|
| F1 Linimasa | **Ada** (`LinimasaScreen.tsx`) | `GET /konten/linimasa` jalan; **tidak ada tes HTTP** untuk endpoint ini (yang dites: benih & verifikasi). DB: 6 tahapan, **3 terverifikasi** (TKA), 3 belum. Klien menyaring yang belum dicek | Jadwal SNBP/SNBT 2027 belum dirilis | — |
| Beranda (pintu & kartu saran) | **Sebagian**: pintu Cek Posisi & Alumni ada; pintu Arsip/Latihan dan kartu saran Level-In tidak ada | Mengikuti F6/F7/Level-In | Mengikuti F6/F7/Level-In | ikut F6/F7 |
| F2 Khusus SMK | **Ada** (`KhususSmkScreen.tsx`) | `GET /konten/khusus-smk` jalan, tanpa tes HTTP. DB: 6 butir, **semua `belum_diverifikasi`**. Expo tetap menampilkannya; baris "dicek" hanya muncul bila `diperiksa_pada` terisi | 6 butir perlu diverifikasi tim konten | — |
| F3 Pilih Mapel | **Sebagian** (`PilihMapelScreen.tsx`). Ada: pilih prodi / belum tahu, mapel + ketersediaan + bobot, saran 2 mapel, penafian. Tidak ada: pintu ke F10; "Simpan ke Daftar Periksa" hanya mencentang butir umum `mapel-tka` | `/konten/prodi`, `/konten/prodi/:id/mapel`, `/konten/mapel/agregasi-lintas-prodi` jalan & dites. Tidak ada endpoint butir checklist milik pengguna | DB: 19 prodi, 10 mapel, 76 relasi, **semua `belum_diverifikasi`** | Kecil (pintu F10, setelah F10 ada); sedang untuk butir khusus prodi |
| F4 Cerita Alumni | **Ada** (`CeritaAlumniScreen.tsx`); tampil kosong | `GET /konten/cerita-alumni` menyaring `izin_tayang=1 AND tayang=1` di SQL. **Saringan ini tidak punya tes HTTP** | 2 cerita yang ada adalah **contoh fiktif**, bukan alumni yang menunggu izin. PRD F4: minimal 3 cerita nyata berizin tertulis | — (pekerjaan konten, bukan kode) |
| F5 Daftar Periksa | **Ada, lebih lengkap dari PWA** (centang di server; saring kelas, jalur, rumpun). Tidak ada: butir tambahan dari F3/F10 | `GET /konten/checklist` dites (13 rujukan di tes, termasuk rumpun). `GET/PUT/DELETE /kemajuan` jalan, **tanpa tes HTTP langsung** | DB: 11 butir, **semua `belum_diverifikasi`**; Expo menampilkan pemberitahuan belum dicek | Sedang (butir per pengguna, bersama F3/F10) |
| Daftar / Masuk / Akun | **Ada, lebih lengkap** (Jalur Saya, 401 kapan pun → Masuk) | `/auth/*` (18 tes), `PATCH /pengguna/saya` (dites). `/sinkron/klaim` (5 tes) **tidak dibutuhkan Expo** karena login wajib dan tidak ada data tamu | — | — |
| Cek Posisi Gue | **Ada, hanya di Expo** | Tidak butuh endpoint baru | Tenggat hanya dari tahapan terverifikasi | — |
| Onboarding cerita | **Tidak ada.** Form Daftar (`RegisterScreen.tsx`) menanyakan nama pengguna, email, kata sandi, **prodi impian**; **kelas tidak ditanyakan** (diisi nanti di Jalur Saya atau keping Daftar Periksa) | `POST /auth/daftar` sudah menerima `kelas` (opsional); tidak ada yang kurang di backend | Teks ada di salinan §3; layar ke-3 menyebut latihan harian yang tidak ada di Expo | Kecil |
| F6 Arsip Belajar | **Tidak ada** | `GET/POST/PATCH/DELETE /kartu` ada + **7 tes otorisasi**. 12 kartu kurasi masuk DB lewat benih (`GET /kartu` mengembalikan 12, dijalankan). **Tabel `kartu` tidak punya kolom kategori** (catatan/soal) | 12 kartu (hanya Matematika, Bahasa Inggris, Informatika, masing-masing 4), **semua `belum_diverifikasi`**, padahal PWA melabelinya "Resmi" | Sedang |
| F7 Latihan | **Tidak ada** (PWA sendiri baru 1 kartu statis) | `POST/PATCH /sesi-latihan`, `POST /riwayat-latihan` ada, **tanpa tes**. Pemilihan kartu untuk sesi tidak ada di server maupun PWA. `POST /riwayat-latihan` dengan nilai keyakinan memanggil stub `keputusan.js` → galat (dari kode; lihat Bagian 5) | Butuh kartu F6 | Sedang–besar |
| Level-In | **Tidak ada** | **Rusak/terblokir.** `keputusan.js` stub → `/kalibrasi/ringkasan` & `/saran-harian` **500** (dijalankan). `konfigurasi_levelin` **0 baris** → `GET /konfigurasi/levelin` membalas `{}`. Tes server hanya memastikan stub melempar galat (5 tes) | Ambang di `levelin-konfig.json` berasal "perkiraan", bukan dari data pemakaian | Besar |
| F9 Bank Soal | **Tidak ada** | Tidak ada tabel/endpoint mitra; skema `GET /kartu` hanya mengenal nilai `sumber=mitra` | Belum ada mitra maupun perjanjian | Kecil secara teknis, tetapi terblokir mitra |
| F10 Eksplorasi Tujuan | **Tidak ada** | **Tidak ada tabel maupun endpoint** (`/konten/profil-prodi` dan `/konten/prodi/:id` → 404, dijalankan). Skrip `verifikasi-konten` belum mengenal jenis ini | `profil-prodi.json`: **18 profil** (19 prodi; `teknik-elektro` tanpa profil). Status berkas `terverifikasi_sebagian` (dicek 31 Agu 2026): peminat/profesi/kampus "Terverifikasi", **mata kuliah "Perkiraan"** | Sedang |
| F8 Fitur berbayar | Tidak ada (juga tidak ada di PWA) | Tidak ada | Butuh keputusan model bisnis | Di luar audit |

---

## 4. Rincian fitur yang belum ada atau sebagian (Langkah 3)

### 4.1 F10 Eksplorasi Tujuan — sedang
- **Pekerjaan.** Backend: tabel `profil_prodi` (atau kolom JSON), benih dari `profil-prodi.json`, endpoint `GET /konten/prodi/:id/profil`, dukungan di `verifikasi-konten`, tes. Expo: satu layar (isi, keadaan "profil belum ada", galat), pintu dari hasil Pilih Mapel.
- **Kenapa sedang.** Layarnya hanya menampilkan data (tidak ada data milik pengguna) dan datanya sudah ada. Tetapi strukturnya bersarang (peminat, kampus, profesi, status sumber per bagian), sehingga butuh skema DB baru dan pola verifikasi baru.
- **Risiko.** Menampilkan angka peminat dan data "Perkiraan" sebagai fakta. Prinsip proyek: data tanpa sumber tidak tampil.
- **Butuh keputusan Khalifa.** (1) Apakah bagian berstatus "Perkiraan" boleh tampil dengan label, atau disembunyikan? (2) Apakah tombol "Simpan ke Daftar Periksa" (butir Riset Kampus) ikut dibawa? Kalau ya, perlu 4.3.

### 4.2 Onboarding cerita — kecil
- **Pekerjaan.** Hanya Expo: 3–4 layar sebelum Masuk/Daftar, atau sesudah daftar pertama kali. Bisa juga ditambah pertanyaan kelas di form Daftar (backend sudah menerima `kelas`).
- **Kenapa kecil.** Tidak ada backend baru; teksnya sudah ada di salinan §3.
- **Risiko.** Menambah langkah sebelum nilai pertama (Linimasa). Layar ke-3 PWA menjanjikan latihan harian, jadi teks itu harus diubah kalau F7 belum ada.
- **Butuh keputusan Khalifa.** Apakah onboarding memang sengaja dihapus di Expo? Saya tidak menemukan catatan keputusannya (lihat Bagian 5). Apakah kelas perlu ditanyakan saat daftar?

### 4.3 Butir Daftar Periksa milik pengguna (untuk F3 dan F10) — sedang
- **Pekerjaan.** Backend: tabel butir per pengguna + endpoint tambah/hapus + tes. Expo: gabungkan butir itu ke Daftar Periksa, ubah tombol simpan di Pilih Mapel (dan F10 nanti).
- **Kenapa sedang.** Menyentuh data milik pengguna, jadi perlu otorisasi dan tes lintas akun seperti modul kartu.
- **Risiko.** Kebocoran antar-akun. Pola ini sudah dua kali ditemukan di proyek (lihat LANJUT_028 Bagian 6).
- **Butuh keputusan Khalifa.** Apakah perilaku Expo sekarang (mencentang butir umum `mapel-tka`) sudah cukup? Kalau cukup, pekerjaan ini tidak perlu.

### 4.4 Level-In — besar
- **Pekerjaan.**
  - Backend: isi `keputusan.js`. Ini **bukan salin-tempel**: layanan server memanggil `agregatPerMapel(baris, mapelDenganRiwayat, ketersediaan, jendela)` dan `saranHarian(ringkasan, ketersediaan, adaRiwayat)`, sedangkan PWA memakai `agregatPerMapel(peristiwa, konfigObj, semuaMapelId)` dan `saranHarian(agregat, ketersediaanKartu, konfigObj)`. Jadi perlu adaptor atau penulisan ulang layanan, plus uji bersama dengan `MVP-PWA/tools/test-levelin.js` (SDD RB5).
  - Isi benih `konfigurasi_levelin` dan tambahkan tes endpoint.
  - Komentar di kepala `keputusan.js` sudah basi: masih menyebut `levelin.js` "BELUM ADA".
  - Expo: chip keyakinan, strip gap, ringkasan sesi, kartu saran di Beranda.
- **Kenapa besar.** Butuh F7 lebih dulu (tanpa sesi latihan tidak ada data), menyentuh backend dan tiga layar, dan logika keputusannya menentukan saran ke siswa.
- **Risiko.** Dua sumber kebenaran angka kalibrasi (klien dan server) yang diam-diam berbeda. Ambang yang dipakai masih perkiraan.
- **Butuh keputusan Khalifa.** (1) Keputusan §10.2 no. 3 SDD-LevelIn: tampilan agregat gratis atau berbayar (di konfigurasi masih `belum_diputuskan`). (2) Untuk Expo yang wajib login: dihitung di server saja, atau tetap di klien? (3) Apakah ambang perkiraan boleh dipakai saat rilis.

### 4.5 F6 Arsip Belajar — sedang
- **Pekerjaan.** Expo: daftar mapel, daftar kartu per mapel (tab Catatan/Soal), formulir kartu baru, hook ke `/kartu`. Backend: putuskan cara menyimpan kategori catatan/soal (PWA menurunkannya dari ada tidaknya jawaban; tabel tidak punya kolom kategori). Perlu juga tes agar kartu belum terverifikasi tidak berlabel "Resmi".
- **Kenapa sedang.** CRUD dan otorisasi backend sudah ada dan dites; sisanya tiga layar dan satu keputusan skema kecil.
- **Risiko.** Kartu kurasi belum diverifikasi, tetapi di PWA berlabel "Resmi". Arsip baru mencakup 3 dari 10 mapel. Kartu buatan siswa tersimpan di server (data pribadi siswa).
- **Butuh keputusan Khalifa.** Siapa yang memverifikasi 12 kartu kurasi, dan apakah arsip boleh tayang hanya dengan 3 mapel.

### 4.6 F7 Latihan — sedang–besar
- **Pekerjaan.** Rancang antrian multi-kartu dulu (belum pernah dibangun, termasuk di PWA): cara memilih kartu, jumlah per sesi, dan urutan. Lalu layar latihan + selesai di Expo, serta tes untuk `/sesi-latihan` dan `/riwayat-latihan`.
- **Kenapa sedang–besar.** Belum ada desain acuan yang berjalan (PWA hanya 1 kartu), jadi ini pekerjaan desain dan bukan porting. Juga bergantung pada F6.
- **Risiko.** `POST /riwayat-latihan` gagal untuk jawaban yang membawa keyakinan selama `keputusan.js` masih stub. F7 tanpa Level-In berarti mengirim tanpa keyakinan, atau mengisi 4.4 lebih dulu.
- **Butuh keputusan Khalifa.** Apakah F7 perlu Level-In sejak versi pertamanya.

### 4.7 F9 Bank Soal — kecil secara teknis, terblokir
- **Pekerjaan.** Layar keadaan kosong itu kecil. Katalog mitra yang sebenarnya butuh tabel dan alur baru.
- **Risiko.** Menampilkan nama lembaga tanpa perjanjian tertulis.
- **Butuh keputusan Khalifa.** Tidak perlu dibawa ke Expo sampai ada mitra. Layar yang isinya hanya "belum ada mitra" tidak menambah nilai.

---

## 5. Hal yang tidak yakin dan apa yang perlu dicek

1. **`POST /riwayat-latihan` gagal bila ada nilai keyakinan.** Ini dari membaca kode (`simpanRiwayatBorongan` memanggil `keputusan.gapNumerik` sebelum menulis). Tidak saya jalankan supaya tidak menulis ke DB. *Cek:* tes HTTP di DB uji.
2. **Alasan onboarding tidak ada di Expo.** Tidak ada catatan keputusan di `docs/` maupun `LANJUT_App/README.md`. *Cek:* tanya Khalifa apakah ini disengaja.
3. **Isi 12 kartu kurasi Arsip.** Belum diverifikasi siapa pun; saya tidak menilai kebenaran materinya.
4. **Label "Terverifikasi" di `profil-prodi.json`.** Tidak saya cocokkan ke sumber aslinya. *Cek:* tim riset.
5. **Kondisi DB produksi.** Yang dibaca adalah `lanjut_test` lokal (berisi 576 pengguna dan 132 kartu buatan tes). Angka konten di atas berasal dari benih yang sama yang akan dipakai produksi.
6. **Layar Expo di HP.** Tidak diulang untuk audit ini. Terakhir diuji di web 360 px pada 28 Sep dan di development build.
7. **Arti tanggal 4 Oktober.** Saya pakai batas di LANJUT_024 (hosting + APK selesai 2–3 Okt, sisakan buffer).

---

## 6. Rekomendasi urutan (Langkah 4)

### Sebelum 4 Oktober 2026: tidak ada fitur baru
Hosting backend dan build APK ulang jatuh di periode yang sama. Setiap fitur baru menambah risiko bug tanpa waktu uji. Semua kesenjangan di atas tidak memblokir v1, karena Expo tidak memanggil endpoint yang rusak.

1. **Hosting backend** sesuai LANJUT_024: migrasi, benih, `verifikasi-konten` untuk 3 tahapan TKA.
2. **Build APK ulang.** Profil `preview` di `LANJUT_App/eas.json` masih `EXPO_PUBLIC_API_URL=http://10.141.5.75:4000/api/v1` (IP LAN).
3. **Verifikasi konten P0 oleh tim konten** (bukan pekerjaan kode, bisa paralel): Khusus SMK 6 butir, Daftar Periksa 11 butir, prodi 19, mapel 10. Semuanya masih `belum_diverifikasi`.
4. **Pencarian cerita alumni nyata** (paralel, non-kode).

### Sesudah 4 Oktober: urutan usulan
| Urutan | Pekerjaan | Ukuran | Alasan urutan |
|---|---|---|---|
| 1 | F10 Eksplorasi Tujuan | Sedang | Melengkapi F3 (pembeda inti produk), datanya paling siap, hanya menampilkan data. Perlu keputusan soal data "Perkiraan" |
| 2 | Onboarding ringan (+ tanya kelas saat daftar) | Kecil | Murah; hanya kalau Khalifa memutuskan perlu |
| 3 | Butir Daftar Periksa milik pengguna | Sedang | Membuka "simpan" yang spesifik di F3 dan F10. Bisa dilewati kalau perilaku sekarang dianggap cukup |
| 4 | Tes HTTP untuk endpoint yang belum dites (`/kemajuan`, `/konten/cerita-alumni` termasuk saringan izin, `/konten/linimasa`, `/konten/khusus-smk`) | Kecil | Endpoint ini sudah dipakai v1. Saringan izin alumni adalah perlindungan data |
| 5 | F6 Arsip Belajar | Sedang | Backend siap; tunggu keputusan verifikasi kartu kurasi |
| 6 | F7 Latihan (rancang antrian dulu) | Sedang–besar | Butuh F6; desainnya belum ada |
| 7 | Level-In (backend + Expo) | Besar | Butuh F7 dan tiga keputusan produk (4.4) |
| — | F9 Bank Soal, F8 berbayar | — | Hanya bila ada mitra / keputusan bisnis |

---

## 7. Koreksi terhadap versi laporan sebelumnya (commit `ee68a93`)

Versi sebelumnya tidak dibuat di sesi audit ini. Klaim berikut tidak cocok dengan kode atau hasil menjalankan app:

| Klaim versi `ee68a93` | Yang benar (bukti) |
|---|---|
| Pertanyaan onboarding (kelas & prodi) dipindah ke form daftar `DaftarScreen.tsx` | File itu tidak ada. `RegisterScreen.tsx` hanya menanyakan prodi impian; **kelas tidak ditanyakan** |
| Latihan PWA: "sesi 12 kartu flashcard acak (~8 menit)" | Satu kartu statis `k-mtk-1` di HTML (browser: skor 0/1); `backlog-v1.1-F7` menyatakan multi-kartu belum pernah dibangun |
| `profil-prodi.json` memuat 19 prodi, "belum diverifikasi" | 18 profil (`teknik-elektro` tanpa profil); status `terverifikasi_sebagian`, dicek 31 Agu 2026, mata kuliah "Perkiraan" |
| Level-In: cukup salin fungsi dari PWA, ukuran kecil–sedang (di bagian lain "besar") | Tanda tangan fungsi server ≠ PWA; `POST /riwayat-latihan` juga bergantung stub. Besar |
| F3: "data resmi 19 prodi dan 10 mapel" | Di DB, 19/19 prodi dan 10/10 mapel `belum_diverifikasi` |
| F2: tidak ada ketergantungan konten | 6/6 butir `belum_diverifikasi` |
| F4: cukup ubah `izin_tayang = 1` | 2 cerita yang ada adalah contoh fiktif; perlu cerita nyata berizin (minimal 3) |
| Semua endpoint P0 "siap & teruji" | `/konten/linimasa`, `/konten/khusus-smk`, `/konten/cerita-alumni`, `/kemajuan` tidak punya tes HTTP |
| Kemajuan: `POST/DELETE /kemajuan/:id` | `PUT/DELETE /kemajuan/:butirId` |
| Auth "sesuai regulasi data pribadi siswa (LANJUT_025)" | LANJUT_025 sengaja tidak membuat klaim hukum; klaim ini dihapus |
| Onboarding "dihilangkan demi mengurangi friksi" | Alasan tidak ditemukan tertulis; masuk daftar "tidak yakin" |
