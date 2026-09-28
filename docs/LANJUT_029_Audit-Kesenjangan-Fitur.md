# LAPORAN: Audit Kesenjangan Fitur MVP-PWA vs LANJUT_App

**Status Dokumen:** Laporan Audit Final (LANJUT_029)  
**Tanggal Audit:** 28 September 2026  
**Basis Kode Diperiksa:** `EDILAKSO-LANJUT-repo` pada commit `af98618`  
**Prinsip Audit:** Berdasarkan pemeriksaan langsung terhadap kode sumber, pengujian otomatis (`npm test` di backend: 69/69 lolos, `tsc --noEmit`: 0 error, `node tools/test-levelin.js .`: lolos), dan skema basis data MySQL. Tanpa asumsi atau tebakan.

---

## Ringkasan Eksekutif

Pertanyaan Khalifa: *"Apakah LANJUT_App sudah setara dengan MVP-PWA?"*

**Jawaban:** **Belum setara penuh secara fitur, tetapi LANJUT_App sudah jauh lebih matang untuk cakupan P0 (core value) dan infrastruktur produksi.**

1. **Apa yang sudah setara & bahkan melebihi PWA:**
   - **5 Layar P0** (Beranda/Linimasa, Khusus SMK, Pilih Mapel, Cerita Alumni, Daftar Periksa) sudah berfungsi penuh dengan data riil dari backend Express + MySQL.
   - **Fitur Baru v1.1 di Expo yang tidak ada di PWA:** **Jalur Saya** (`/akun`) dan **Cek Posisi Gue** (`/cek-posisi`, rule-based tanpa AI), serta filter rumpun prodi pada Checklist dan sinkronisasi centang antar-perangkat berbasis akun.
   - **Aksesibilitas & Kontras:** Expo sudah diaudit dan memenuhi rasio kontras WCAG (LANJUT_026 & LANJUT_027).

2. **Kesenjangan yang belum ada di Expo:**
   - **Eksplorasi Tujuan (F10):** Data JSON lengkap di PWA (`profil-prodi.json`), namun backend belum memiliki tabel/endpoint, dan belum ada layar di Expo.
   - **Level-In (Confidence Gap Tracker):** Logika murni klien selesai di PWA (`levelin.js`), namun backend `keputusan.js` masih stub `TODO` (melempar error bila dipanggil), dan UI Expo belum mengintegrasikannya.
   - **Arsip Belajar (F6), Latihan Hari Ini (F7), dan Bank Soal (F9):** Backend memiliki skema tabel dan CRUD dasar untuk `kartu`, namun antarmuka flashcard/latihan belum di-port ke Expo. Bank Soal di PWA sendiri masih berupa mockup statis tanpa mitra nyata.
   - **Onboarding Cerita:** Di PWA ada 4 slide cerita + 2 pertanyaan. Di Expo, alur onboarding ditiadakan; 2 pertanyaannya (kelas & prodi impian) dipindahkan langsung ke formulir pendaftaran akun.

---

## Langkah 1 — Inventaris Fitur MVP-PWA

Daftar seluruh fitur dan halaman pada repositori acuan `MVP-PWA/`:

| No | Kode / Nama Fitur | Halaman & Berkas Utama PWA | Sumber Data PWA | Keterangan Fungsional di PWA |
|:---|:---|:---|:---|:---|
| 1 | **F1 — Linimasa** | `beranda.html`, `assets/app.js` | `data/linimasa.json` | Hitung mundur tenggat resmi TKA/SNBP/SNBT, pengelompokan tanggal, penanda contoh/resmi. |
| 2 | **F2 — Khusus SMK** | `khusus-smk.html`, `assets/app.js` | `data/khusus-smk.json` | 6 butir perbandingan "apa yang beda" & "apa yang bisa dilakukan". Bawaan PWA: kartu pertama terbuka. |
| 3 | **F3 — Penolong Pilih Mapel** | `pilih-mapel.html`, `assets/app.js` | `data/prodi.json`, `data/mapel.json`, `data/prodi-mapel.json` | Pilihan prodi → mapel pendukung TKA → rekomendasi 2 mapel. Agregasi bobot dihitung client-side. |
| 4 | **F4 — Cerita Alumni SMK** | `alumni.html`, `assets/app.js` | `data/cerita-alumni.json` | Kartu pengalaman alumni SMK tembus PTN (saat ini 2 cerita contoh bertanda izin belum terverifikasi). |
| 5 | **F5 — Daftar Periksa (Checklist)** | `checklist.html`, `assets/app.js` | `data/checklist.json`, `localStorage` | 11 butir persiapan dalam 3 kategori. Penyaringan kelas/jalur belum jalan di PWA, centang lokal. |
| 6 | **F6 — Arsip Belajar** | `arsip.html`, `arsip-detail.html`, `arsip-tambah.html`, `assets/app.js` | `data/arsip.json`, `data/mapel.json`, `localStorage` | Manajemen kartu catatan dan soal per mapel. Tambah kartu manual, filter Semua/Catatan/Soal. |
| 7 | **F7 — Latihan Hari Ini** | `latihan.html`, `latihan-selesai.html`, `assets/app.js`, `assets/levelin.js` | `data/arsip.json`, `sessionStorage`, `localStorage` | Sesi 12 kartu flashcard acak (~8 menit), balik kartu, tombol Benar/Salah, skor sesi. |
| 8 | **Level-In (CGT - P1)** | `assets/levelin.js`, `assets/levelin.css`, `beranda.html`, `latihan.html`, `latihan-selesai.html` | `data/levelin-konfig.json`, `localStorage` | Confidence Gap Tracker: chip keyakinan 1-5, strip pembanding gap (over/underconfident/selaras/netral), saran latihan di beranda. |
| 9 | **F8 — Fitur Berbayar** | *(Belum ada halaman)* | - | Hanya dicatat di PRD §6 (timer, statistik per mapel, spaced repetition). Belum dibangun di PWA. |
| 10 | **F9 — Bank Soal Mitra** | `bank-soal.html` | Statis di markup HTML | Mockup kartu paket soal bertuliskan "[nama mitra]" dan tampilan kosong fallback bila belum ada mitra. |
| 11 | **F10 — Eksplorasi Tujuan** | `eksplorasi-tujuan.html`, `assets/app.js` | `data/profil-prodi.json` | Profil detail prodi: jenjang, rasio peminat/daya tampung resmi, matkul inti, prospek karir, kampus vokasi & akademik. |
| 12 | **Onboarding** | `onboarding.html`, `assets/app.js` | `localStorage['lanjut.profil.v1']` | 4 layar cerita pengantar + 2 pertanyaan (kelas dan target prodi). Mengarahkan ke beranda. |
| 13 | **Splash / Entry Router** | `index.html`, `assets/app.js` | `localStorage['lanjut.profil.v1']` | Deteksi profil awal: ada profil → `beranda.html`, belum ada → `onboarding.html`. |
| 14 | **Autentikasi & Akun** | `masuk.html`, `daftar.html`, `akun.html`, `assets/api.js` | Backend API REST (`/auth/*`, `/sinkron/klaim`) | Formulir login/register dan klaim migrasi data tamu lokal ke akun server. |

---

## Langkah 2 — Status di LANJUT_App

Tabel komparasi status implementasi di `LANJUT_App/` (React Native Expo) dan kesiapan backend:

| Fitur | Status di Expo | Komponen / Layar Expo | Kesiapan Backend | Ketergantungan Konten / Izin |
|:---|:---:|:---|:---|:---|
| **F1 Linimasa** | **Ada** | `app/(app)/linimasa.tsx`, `LinimasaScreen.tsx` | **Siap & Teruji.** `GET /konten/linimasa`. 3 tahapan TKA 2026 diverifikasi resmi. | Menunggu pengumuman resmi Kemendikdasmen untuk jadwal SNBP/SNBT 2027. Tanggal tanpa verifikasi otomatis disembunyikan. |
| **F2 Khusus SMK** | **Ada** | `app/(app)/khusus-smk.tsx`, `KhususSmkScreen.tsx` | **Siap & Teruji.** `GET /konten/khusus-smk`. 6 butir tersimpan di DB via benih. | Konten naratif internal kurasi tim, tidak ada ketergantungan pihak ketiga. Default kartu tertutup (permintaan user). |
| **F3 Pilih Mapel** | **Ada** | `app/(app)/pilih-mapel.tsx`, `PilihMapelScreen.tsx` | **Siap & Teruji.** `GET /konten/prodi`, `/prodi/:id/mapel`, `/mapel/agregasi-lintas-prodi`. | Data resmi 19 prodi dan 10 mapel TKA. Penafian resmi aktif. |
| **F4 Cerita Alumni** | **Ada (UI)** | `app/(app)/cerita-alumni.tsx`, `CeritaAlumniScreen.tsx` | **Siap & Teruji.** `GET /konten/cerita-alumni` (query menyaring `tayang = 1 AND izin_tayang = 1`). | **TERBLOCKIR KONTEN.** 2 data contoh di DB disetel `izin_tayang = 0`, sehingga layar Expo menampilkan keadaan kosong yang benar. Butuh izin tertulis narasumber. |
| **F5 Daftar Periksa** | **Ada (Unggul)** | `app/(app)/daftar-periksa.tsx`, `DaftarPeriksaScreen.tsx` | **Siap & Teruji.** `GET /konten/checklist` (mendukung filter `kelas`, `jalur`, dan `rumpun`). `POST/DELETE /kemajuan/:id`. | Tersedia 11 butir umum + dukungan butir khusus rumpun. Kemajuan tersimpan ke akun di database. |
| **Jalur Saya (v1.1)** | **Ada (Baru)** | `app/(app)/akun.tsx`, `AkunScreen.tsx` | **Siap & Teruji.** `PATCH /pengguna/saya` (`nama_tampilan`, `kelas`, `prodi_impian`). | Mandiri (data profil siswa). |
| **Cek Posisi Gue (v1.1)** | **Ada (Baru)** | `app/(app)/cek-posisi.tsx`, `CekPosisiScreen.tsx`, `lib/cekPosisi.ts` | **Tidak butuh backend khusus.** Berjalan murni rule-based dari profil & centang checklist yang sudah dimuat. | Mandiri. Tanpa AI, tanpa biaya berjalan, responsif instan. |
| **F6 Arsip Belajar** | **Tidak Ada** | Belum ada layar / komponen | **Sebagian.** Tabel `kartu` ada (migrasi 004). Rute CRUD `server/src/modul/kartu` lengkap & diuji (`kartu-otorisasi.test.js`). 12 kartu bawaan ada di `benih.js`. | Kartu bawaan dari `arsip.json` sudah ada, namun belum diverifikasi kurikulum formal. |
| **F7 Latihan Hari Ini** | **Tidak Ada** | Belum ada layar / komponen | **Sebagian.** Tabel `sesi_latihan` dan `riwayat_latihan` ada (migrasi 005). Endpoint `POST/PATCH /sesi-latihan` ada. Logika pemilihan kartu acak belum ada di server. | Ketergantungan pada kartu F6. |
| **Level-In (CGT)** | **Tidak Ada** | Belum ada layar / komponen | **Macet / TODO.** Tabel `konfigurasi_levelin` ada tapi kosong (belum dibenih). File `server/src/modul/levelin/keputusan.js` sengaja masih berstatus TODO dan melempar error bila dipanggil. | Logika acuan ada di `MVP-PWA/assets/levelin.js` dan sudah lolos 100% tes klien, belum disalin ke backend. |
| **F8 Fitur Berbayar** | **Tidak Ada** | - | **Tidak Ada.** Tidak ada tabel/endpoint. | Perlu keputusan model bisnis dan payment gateway. |
| **F9 Bank Soal Mitra** | **Tidak Ada** | Belum ada layar / komponen | **Tidak Ada.** Tabel `kartu` mendukung kolom `sumber='mitra'`, namun endpoint katalog paket mitra belum ada. | Belum ada mitra bimbel resmi yang MoU/bergabung. |
| **F10 Eksplorasi Tujuan** | **Tidak Ada** | Belum ada layar / komponen | **Tidak Ada.** Data ada di `MVP-PWA/data/profil-prodi.json` (25 KB). Backend sama sekali belum punya tabel `profil_prodi` atau endpoint `GET /konten/prodi/:id/profil`. | Data riset prodi sudah ada di file JSON, tetapi belum diverifikasi ke sumber PDDIKTI / SNPMB terbaru. |
| **Onboarding** | **Tidak Ada (Pindah)** | Alur cerita tidak ada. Pertanyaan diintegrasikan ke `DaftarScreen.tsx`. | **Siap & Teruji.** Pendaftaran langsung menerima `kelas` dan `prodi_impian`. | Alur cerita dihilangkan demi mengurangi friksi registrasi pengguna. |
| **Autentikasi & Sesi** | **Ada (Unggul)** | `app/(auth)/masuk.tsx`, `daftar.tsx`, `providers/AuthProvider.tsx` | **Siap & Teruji.** `POST /auth/masuk`, `POST /auth/daftar`, `GET /auth/saya`. Auto redirect 401 aktif, offline fallback aman. | Sesuai regulasi data pribadi siswa (LANJUT_025). |

---

## Langkah 3 — Analisis Fitur yang Belum Ada / Sebagian

Berikut rincian teknis, risiko, estimasi ukuran relatif, dan keputusan yang dibutuhkan untuk fitur yang belum ada di `LANJUT_App`:

### 1. Eksplorasi Tujuan (F10)
- **Pekerjaan yang Dibutuhkan:**
  - *Data & Backend:* Buat migrasi tabel `profil_prodi` (atau simpan JSON di server/assets), perbarui `benih.js` untuk membaca `profil-prodi.json`, buat modul `server/src/modul/konten` endpoint `GET /konten/prodi/:id/profil` beserta tesnya.
  - *Expo:* Buat layar `app/(app)/eksplorasi-tujuan.tsx`, hook `useProfilProdi(id)`, komponen tampilan rasio keketatan, daftar kampus vokasi vs akademik, dan prospek karir. Sambungkan tombol "Lihat prospek & kampus" di hasil `PilihMapelScreen.tsx`.
- **Ketergantungan & Risiko:** Data `profil-prodi.json` (25 KB, memuat 19 prodi) disusun pada masa riset awal. Risiko: angka daya tampung dan rasio peminat bisa dianggap usang jika siswa mencocokkan dengan web SNPMB terbaru.
- **Ukuran Relatif:** **Sedang.** UI-nya murni presentasional (read-only), tidak ada mutasi state rumit. Backend hanya butuh 1 endpoint `GET`.
- **Keputusan Khalifa:** Apakah data keketatan & kampus di `profil-prodi.json` saat ini sudah layak tayang ke publik, atau harus diaudit ulang satu per satu oleh tim riset sebelum dibuka?

### 2. Level-In (Confidence Gap Tracker)
- **Pekerjaan yang Dibutuhkan:**
  - *Backend:* Salin logika Lapisan 2 dari `MVP-PWA/assets/levelin.js` ke `server/src/modul/levelin/keputusan.js` (sesuai instruksi B-K6 di dokumen SDD). Salin test suite `MVP-PWA/tools/test-levelin.js` ke `server/tests/levelin-keputusan.test.js`. Buat benih data default untuk `konfigurasi_levelin`.
  - *Expo:* Bangun komponen UI: pemilih keyakinan 1-5 (chips), strip perbandingan gap (`LevelinGapStrip`), ringkasan kalibrasi sesi, dan widget saran latihan di Beranda.
- **Ketergantungan & Risiko:** Risiko desinkronisasi perhitungan kalibrasi klien vs server (RB5). Jika pengguna mengerjakan latihan saat koneksi putus lalu sinkronisasi belakangan, ada risiko konflik riwayat.
- **Ukuran Relatif:** **Besar.** Melibatkan sinkronisasi state lokal dan server, perhitungan kalibrasi matematika, serta perubahan layout Beranda dan alur latihan.
- **Keputusan Khalifa:** Konfirmasi keputusan produk §10.2 SDD-LevelIn: apakah metrik kalibrasi Level-In akan menjadi fitur gratis untuk seluruh siswa, atau dibatasi sebagai fitur berbayar/premium di masa depan?

### 3. Arsip Belajar (F6) & Latihan Hari Ini (F7)
- **Pekerjaan yang Dibutuhkan:**
  - *Backend:* Endpoint backend untuk kartu sebenarnya sudah ada (`/kartu`), tetapi butuh penambahan endpoint agregasi kartu per mapel dan generator antrian latihan harian (misal: 12 kartu per sesi dari mapel fokus).
  - *Expo:* Porting total dari PWA ke komponen React Native:
    - Layar katalog arsip per mapel (`/arsip`).
    - Layar daftar kartu dalam satu mapel (`/arsip/[mapelId]`).
    - Layar tambah/edit kartu (`/arsip/tambah`).
    - Layar sesi latihan flashcard beranimasi flip/putar kartu (`/latihan`).
    - Layar rangkuman latihan selesai (`/latihan/selesai`).
- **Ketergantungan & Risiko:** Membutuhkan animasi sentuh flip kartu di React Native (`react-native-reanimated` atau CSS transform). Memerlukan manajemen sesi latihan di memori/storage lokal agar tidak hilang bila app tertutup tidak sengaja.
- **Ukuran Relatif:** **Sangat Besar.** Ini merupakan sub-aplikasi tersendiri (alat belajar interaktif).
- **Keputusan Khalifa:** Apakah v1 ditargetkan murni sebagai *panduan keputusan jalur* (decision guide: Linimasa, Mapel, Posisi, Checklist), atau wajib memiliki modul latihan soal flashcard saat rilis awal?

### 4. Bank Soal Mitra (F9)
- **Pekerjaan yang Dibutuhkan:** Backend membutuhkan tabel mitra dan paket soal. Expo membutuhkan layar direktori mitra.
- **Ketergantungan & Risiko:** Risiko hukum dan reputasi jika menampilkan nama lembaga bimbel tanpa kesepakatan kerjasama tertulis (MoU).
- **Ukuran Relatif:** **Kecil secara teknis, tetapi terhenti total di sisi kemitraan/bisnis.**
- **Keputusan Khalifa:** Belum ada mitra. Halaman ini sebaiknya tetap dinonaktifkan/disembunyikan dari aplikasi sampai ada mitra resmi.

### 5. Cerita Alumni SMK (F4) — Status Penerbitan
- **Pekerjaan yang Dibutuhkan:** Komponen Expo (`CeritaAlumniScreen.tsx`) dan backend (`/konten/cerita-alumni`) **sudah 100% siap**. Pekerjaan yang tersisa adalah **persetujuan data**.
- **Ketergantungan & Risiko:** 2 cerita yang ada saat ini berstatus dummy/contoh (`izin_tayang = 0`). Menayangkan cerita personal tanpa izin tertulis melanggar etika dan privasi.
- **Ukuran Relatif:** **Sangat Kecil (Non-Koding).** Cukup ubah `izin_tayang = 1` dan `tayang = 1` di database bila surat izin sudah ditandatangani.
- **Keputusan Khalifa:** Apakah tim EDILAKSO Group memiliki kontak alumni SMK nyata yang bersedia diwawancarai dan memberikan izin rilis sebelum peluncuran?

---

## Langkah 4 — Rekomendasi Urutan Pengerjaan

Dengan mempertimbangkan tenggat waktu rilis awal (target deploy backend 2–3 Oktober 2026 dan uji coba $\ge 50$ siswa sebelum 23 Oktober 2026), **menambah fitur interaktif baru (seperti Latihan/Flashcard) sekarang adalah risiko bunuh diri teknis (high regression risk).**

Oleh karena itu, alur pengerjaan dibagi menjadi dua horizon waktu:

```
                  28 Sep - 4 Okt 2026                  Pasca 4 Okt - 23 Okt 2026
             [Fokus Deploy & Stabilitas v1]              [Iterasi Fitur v1.1+]
             
┌──────────────────────────────────────────────────┐   ┌─────────────────────────────────┐
│ 1. Deploy Backend Publik (Rumahweb/Railway)     │   │ 5. Aktifkan F10 (Eksplorasi)   │
│ 2. Verifikasi Konten Resmi & Seed DB Server      │──>│ 6. Selesaikan keputusan.js      │
│ 3. Build Ulang APK Android (EAS) dgn URL HTTPS   │   │    (Level-In Backend)           │
│ 4. Smoke Test E2E di 2 HP Fisik (Data Seluler)  │   │ 7. Porting Arsip & Latihan (F6-F7)│
└──────────────────────────────────────────────────┘   └─────────────────────────────────┘
```

### A. Sebelum 4 Oktober 2026 (Wajib Selesai untuk Rilis v1)
*Prinsip: Feature Freeze. Nol fitur besar baru. Prioritas 100% pada deployment dan stabilitas rilis.*

1. **Deploy Backend ke Server Hosting Publik (2–3 Oktober):**
   - Setup Node.js 20+ & MySQL/MariaDB di Rumahweb (atau Railway).
   - Pastikan konfigurasi `.env` produksi: `JUMLAH_PROXY`, `LOKASI_DATA_KONTEN`, `ASAL_DIIZINKAN`.
2. **Eksekusi Verifikasi Konten di Database Server:**
   - Jalankan migrasi dan benih di server produksi.
   - Jalankan `npm run verifikasi-konten` untuk menandai 3 tahapan resmi TKA Kemendikdasmen di DB produksi.
3. **Build Ulang APK Android Preview (EAS):**
   - Ubah `EXPO_PUBLIC_API_URL` di `LANJUT_App/eas.json` dari IP LAN ke URL HTTPS backend publik.
   - Jalankan EAS build (`npx eas-cli build -p android --profile preview`).
4. **Pengujian Lapangan (Uji 2 HP Fisik Berbeda):**
   - Uji registrasi, login, checklist persisten, dan pergantian akun menggunakan jaringan seluler (4G/5G).

### B. Sesudah 4 Oktober 2026 (Ekspansi Fitur v1.1+)
*Prinsip: Dibangun setelah aplikasi v1 terbukti stabil di tangan 50 siswa SMK.*

1. **Prioritas 1: Eksplorasi Tujuan (F10) — Ukuran: Sedang**
   - Alasan: Layar informatif read-only yang melengkapi *Pilih Mapel*. Resiko bug rendah karena tidak memiliki interaksi state yang rumit. Cukup buat 1 endpoint backend dan 1 layar di Expo.
2. **Prioritas 2: Selesaikan Backend Level-In (`keputusan.js`) — Ukuran: Kecil-Sedang**
   - Alasan: Kode logika murni sudah teruji di `MVP-PWA/assets/levelin.js`. Salin fungsinya ke `server/src/modul/levelin/keputusan.js` agar endpoint `/kalibrasi/ringkasan` dan `/saran-harian` tidak lagi melempar error TODO.
3. **Prioritas 3: Arsip Belajar (F6) & Sesi Latihan Hari Ini (F7) — Ukuran: Sangat Besar**
   - Alasan: Membutuhkan perancangan UI flashcard yang nyaman di HP, animasi interaktif, dan integrasi Level-In client-side. Kerjakan setelah umpan balik v1 terkumpul dari siswa.
4. **Prioritas 4: Bank Soal Mitra (F9) & Fitur Berbayar (F8) — Ukuran: Tertunda**
   - Alasan: Bergantung sepenuhnya pada pembicaraan bisnis dengan mitra bimbel luar.

---

## Tabel Ringkasan Audit (Definition of Done)

| Fitur | Ada di Expo? | Kesiapan Backend | Ketergantungan / Blocker | Ukuran Relatif | Target Waktu |
|:---|:---:|:---|:---|:---:|:---:|
| **F1 Linimasa** | **Ada** | Siap & Teruji (69 tes pass) | Menunggu rilis jadwal SNBP/SNBT 2027 | - | Rilis v1 (Sekarang) |
| **F2 Khusus SMK** | **Ada** | Siap & Teruji | Tidak ada (Mandiri) | - | Rilis v1 (Sekarang) |
| **F3 Pilih Mapel** | **Ada** | Siap & Teruji | Tidak ada (Mandiri) | - | Rilis v1 (Sekarang) |
| **F4 Cerita Alumni** | **Ada (UI)** | Siap & Teruji | **Izin tertulis narasumber (konten)** | Sangat Kecil | Pasca Izin |
| **F5 Daftar Periksa** | **Ada** | Siap & Teruji (Multi-device) | Tidak ada (Mandiri) | - | Rilis v1 (Sekarang) |
| **Jalur Saya** | **Ada** | Siap & Teruji | Tidak ada (Mandiri) | - | Rilis v1 (Sekarang) |
| **Cek Posisi Gue** | **Ada** | Mandiri (Rule-based klien) | Tidak ada (Mandiri) | - | Rilis v1 (Sekarang) |
| **F10 Eksplorasi Tujuan** | **Tidak Ada** | Data JSON ada, endpoint/DB belum | Validasi akurasi data prodi | **Sedang** | Target v1.1 (Okt) |
| **Level-In (CGT)** | **Tidak Ada** | Skema DB ada, `keputusan.js` TODO | Salin Lapisan 2 dari `levelin.js` | **Besar** | Target v1.1 (Okt) |
| **F6 Arsip Belajar** | **Tidak Ada** | CRUD DB siap & teruji | Butuh layar mobile UI | **Sedang** | Target v1.2 |
| **F7 Latihan Hari Ini** | **Tidak Ada** | Tabel DB siap, generator antrian belum | Butuh UI flashcard & animasi | **Besar** | Target v1.2 |
| **F9 Bank Soal Mitra** | **Tidak Ada** | Tidak ada | Perjanjian kerjasama mitra | **Kecil** | Ditunda (Hold) |
| **Onboarding Cerita** | **Ditiadakan** | Pertanyaan masuk ke form daftar | Keputusan desain (kurangi friksi) | - | Disengaja |

---

## Hal-Hal yang Memerlukan Keputusan & Pengecekan (Klarifikasi)

1. **Status Izin Cerita Alumni (F4):**
   - Apakah 2 alumni contoh akan diganti dengan alumni riil sekolah binaan EDILAKSO Group sebelum disebarkan ke 50 siswa? Jika belum ada, layar akan menampilkan pesan ajakan menghubungkan tim ke alumni (keadaan kosong yang sah).
2. **Kesesuaian Hosting Rumahweb (Checklist Deploy):**
   - Perlu login ke cPanel Rumahweb untuk memastikan ketersediaan Node.js versi 20+ dan MariaDB/MySQL yang mendukung JSON & sintaks migrasi. Jika tidak ada Node 20+, segera alihkan target ke Railway.
3. **Pemisahan Scope v1 vs v2:**
   - Ditegaskan kembali bahwa **LANJUT v1 adalah aplikasi panduan keputusan (Decision Support System)**, bukan bank soal atau bimbel online. Ketiadaan fitur Latihan dan Bank Soal pada rilis 4 Oktober tidak menggugurkan *value proposition* utama bagi siswa SMK.
