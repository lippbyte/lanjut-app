# Inventaris Kesiapan Uji Rilis — LANJUT_080

> **DRAF**, disusun 14 Oktober 2026 dari `main` di commit `90cd679` (LANJUT_079b).
> **Baca saja.** Tidak ada kode, konfigurasi, saklar, atau konten yang diubah.
> Tidak ada deploy, push, `eas build`, atau panggilan ke luar localhost.
> Basis data yang dibaca adalah `lanjut_test` di komputer pengembang, hanya dengan SELECT.
> Server produksi belum ada, jadi angka konten di bawah sama dengan angka benih
> yang akan dipakai produksi.
>
> Acuan sebelumnya: [`peta-kelengkapan-2026-10-09.md`](../peta-kelengkapan-2026-10-09.md) (LANJUT_059).
> Rencana uji: [`rencana-uji-rilis.md`](rencana-uji-rilis.md).

## Ringkasan

| Hitungan | Jumlah |
|---|---|
| Blocker selesai | **0** |
| Blocker sebagian | **1** (no. 2: konfigurasi APK) |
| Blocker belum | **7** |

Kode untuk fitur 072–079b selesai dan teruji: 734 tes server lulus. Yang menahan
uji rilis adalah pekerjaan di luar kode:
- server yang bisa dijangkau penguji;
- tinjauan hukum;
- verifikasi konten;
- persetujuan teks;
- uji di HP.

## 1. Delapan blocker

| # | Blocker | Status 14 Okt | Bukti (berkas atau perintah) | Yang memutuskan |
|---|---|---|---|---|
| 1 | **Hosting backend belum ada** (rencana: Railway, root `LANJUT_App/server`) | **Belum** | Tidak ada URL produksi di repo: `LANJUT_App/app.config.ts` baris 26–30 dan `LANJUT_App/eas.json` masih `https://api.GANTI-DOMAIN/api/v1`. Bahannya sudah siap: `LANJUT_App/server/Dockerfile`, `docs/deploy-produksi.md` (Jalur A kontainer untuk Railway/Coolify; Jalur B VPS + PM2 + Nginx), `docs/deploy-web.md`. Domain `edilakso.my.id` terakhir tercatat NXDOMAIN (`docs/keputusan-topologi-hosting.md`; tidak dicek ulang karena task ini tanpa jaringan). Skema belum pernah diuji di MariaDB (peta 059, F20). | Khalifa |
| 2 | **APK menunjuk IP LAN, bukan server produksi** | **Sebagian** | Konfigurasi tidak lagi menunjuk IP LAN: profil `preview` dan `production` di `eas.json` berisi placeholder `GANTI-DOMAIN`. `app.config.ts` baris 42–47 sengaja menggagalkan build selama placeholder masih ada, sehingga `npm run build:web` di task ini gagal dengan pesan itu (lihat §3). Belum ada URL produksi. Belum ada APK yang dibangun dari kode terbaru; build terakhir yang tercatat adalah dev client `cc023e4` (27 Sep), sebelum fitur 039–079b. | Khalifa |
| 3 | **Konten terverifikasi masih sedikit** | **Belum** — tetap **3 dari 84**, sama seperti 9 Okt | Hasil SELECT `status_verifikasi` di bawah tabel ini. | Tim konten |
| 4 | **Lebih dari 200 butir teks masih DRAF** | **Belum** — **222 butir** dari 36 blok DRAF (9 Okt: 134) | `npm run lembar-review-teks` → `docs/lembar-review-draf-teks.md` ("222 butir dari 36 blok DRAF"). Belum ada butir yang ditandai Setuju. | Khalifa |
| 5 | **Fitur AI belum diuji dengan OpenRouter sungguhan** | **Belum** | `ai_aktif = 0` di DB. Semua tes Ngobrol memakai penyedia tiruan, misalnya `tests/ngobrol-penghubung.test.js` (LANJUT_078). Belum ada izin tertulis PM untuk memakai kunci sungguhan. Slug model `anthropic/claude-sonnet-5.5` (`ai_model`, migrasi 015) belum diverifikasi. Evaluasi AI lapis 2 belum dijalankan (peta 059, G9). | Khalifa (+ guru BK untuk keselamatan) |
| 6 | **Belum ada uji di HP Android atau iPhone (Expo Go)** | **Belum dites** | Tidak ada catatan uji HP sejak LANJUT_039. Semua bukti visual memakai web 360 px (Edge headless). Expo Go tidak dicoba di task ini karena membutuhkan perangkat (task 080 §C.7). Panduan sudah ada: `docs/uji-di-hp-lewat-wifi.md`. | Khalifa |
| 7 | **Kebijakan privasi v2 belum ditinjau hukum dan belum lengkap** | **Belum** | `LANJUT_App/lib/kebijakan-privasi.json` dirinci di bawah tabel ini. Usulan kalimat DRAF bertanda "menunggu tinjauan hukum" ada di `docs/salinan-teks-lanjut.md` §4.13 (LANJUT_075b, 078, 079). | Peninjau hukum (UU PDP) + Khalifa |
| 8 | **Mapel SMP berisi mapel SMA** | **Belum** (diterima PM untuk uji ini, tidak ditambah) | Mapel Saya kelas 7–9 menampilkan 10 mapel tabel `mapel` dan dijaga `tests/mapel-pilihan.test.js`. Rinciannya di bawah tabel ini. | Khalifa (+ tim konten) |

### Rincian blocker 3: hitungan verifikasi konten

| Tabel | Terverifikasi |
|---|---|
| `tahapan_linimasa` | 3 / 6 |
| `profil_prodi` | 0 / 18 |
| kartu kurasi (`kartu`, `sumber = resmi`) | 0 / 12 |
| `prodi` | 0 / 19 |
| `mapel` | 0 / 10 |
| `butir_khusus_smk` | 0 / 6 |
| `butir_daftar_periksa` | 0 / 11 |
| `cerita_alumni` | 0 / 2 (contoh fiktif, tidak tayang) |
| **Jumlah** | **3 / 84** |

Di luar 84 butir itu:
- kartu bantuan: 2 dari 3 terverifikasi (SAPA 129 belum);
- banner Beranda (`server/config/banner-beranda.json`): 0 banner.

Akibat yang terlihat siswa:
- profil prodi F10 "sedang kami cek";
- Arsip tanpa kartu kurasi;
- Cerita Alumni kosong;
- Linimasa tanpa SNBP/SNBT.

### Rincian blocker 7: kebijakan privasi
- `versi` masih 1 dan `persetujuan_versi_kebijakan = 1`.
- Masih ada 22 `[ISI: …]`.
- Belum menyebut `minat_rumpun` atau `mapel_pilihan` (0 kemunculan).
- OpenRouter **sudah** disebut 7 kali di kebijakan lengkap (bagian "Fitur AI: siapa penyedianya"), tetapi **tidak** di Ringkasan 3 yang tampil di layar Daftar.
- Bagian "apa yang tidak dikirim" masih berbunyi "hasil latihan, dan centang Daftar Periksa". Ini bertentangan dengan konteks saran/event LANJUT_078 bila `ai_aktif` dinyalakan.
- Kebijakan masih menyebut "paling banyak 3 potongan modul"; sejak 078 hanya 1.

### Rincian blocker 8: mapel untuk kelas 7–9
Bahasa Indonesia, Bahasa Inggris, Biologi, Ekonomi, Fisika, Geografi, Informatika, Kimia, Matematika, Sosiologi.

- Enam di antaranya biasanya mapel SMA: Biologi, Fisika, Kimia, Ekonomi, Geografi, Sosiologi. Di SMP setahu kami diajarkan sebagai IPA dan IPS terpadu; ini **belum dicek ke sumber resmi**.
- Mapel SMP seperti IPA, IPS, PPKn, dan Pendidikan Agama tidak ada.

### Di luar delapan blocker (dicatat, tidak diubah)
- **Belum di-push:** `git status -sb` → `main...origin/main [ahead 105]` sebelum commit task ini. Bila laptop rusak, pekerjaan sejak LANJUT_030 hilang. Push adalah keputusan Khalifa.
- **Server lokal :4000** (dinyalakan di sesi pengembangan) masih menjalankan kode sebelum LANJUT_078. Perlu dinyalakan ulang bila dipakai untuk uji. Task ini tidak menyalakan atau mematikan server.
- **Mikrofon Ngobrol (LANJUT_074)** memakai pengenal suara bawaan peramban. App tidak mengirim audio, tetapi di Chrome pengenalan suara umumnya diproses oleh layanan penyedia peramban. Ini perlu dicek dan, bila benar, dicantumkan di kebijakan.
  - **Pembaruan LANJUT_080b:** tombol mikrofon kini **disembunyikan secara bawaan** untuk uji rilis. Kodenya tetap ada, di balik konfigurasi build `EXPO_PUBLIC_MIKROFON_NGOBROL=1` (`LANJUT_App/app.config.ts` → `extra.mikrofonNgobrol` → `lib/fiturApp.ts`). Kotak tulis Ngobrol tetap ada.
  - **Keputusan menyalakannya kembali menunggu tinjauan hukum** (kebijakan privasi belum menyebut pemrosesan suara oleh penyedia peramban).

### Pembaruan LANJUT_080b (perbaikan kecil sebelum uji)
- **Pesan galat muat:** "Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat." diganti di `LANJUT_App/components/ui/index.tsx` (komponen `KeadaanGalat`, 13 layar) menjadi "Belum bisa dimuat. Periksa sambungan internetmu, lalu coba lagi." (DRAF, salinan §6). Janji lama tidak benar: cache React Query hanya di memori dan hilang saat app ditutup (peta 059, A15). MVP-PWA masih memakai kalimat lama; MVP-PWA tidak dipakai di uji rilis.
- **Mikrofon Ngobrol:** disembunyikan secara bawaan (lihat di atas).
- **Galat `minat_rumpun`:** galat tipe per butir kini memakai `medan: { minat_rumpun: "…" }`, sama dengan `mapel_pilihan` (079b).

## 2. Fitur 072–079b

Saklar per 14 Okt: `ai_aktif = 0`, `event_sekolah_aktif = 0`.

| Task | Commit | Isi | Saklar yang berlaku | Bisa diuji tanpa AI & event? |
|---|---|---|---|---|
| 072 | `8b957ec` | Sapaan & urutan Beranda | — | Ya |
| 072b | `f82c2fc` | Info Penting tanpa tahapan yang sudah lewat (kelas 12) | — | Ya. Hanya 3 tahapan TKA yang terverifikasi, jadi isinya sedikit |
| 073 | `870756d` | Banner pengumuman Beranda | — (hanya banner terverifikasi) | Ya. Saat ini 0 banner, jadi yang bisa diuji hanya "tidak ada banner = tidak ada ruang kosong" |
| 074 | `d2ad2d8`, `c9c3cd2` | Beranda hero, carousel, tab tengah Ngobrol, mikrofon | `ai_aktif` (isi Ngobrol) | Ya, kecuali jawaban AI. Mikrofon hanya di peramban yang punya pengenal suara (tidak di Android/iOS native) |
| 075 | `c842d0a` | Eksplorasi Kampus semua jenjang | — | Ya. Menyimpan bidang minat butuh kebijakan diterima |
| 075b | `d9274b0` | Grid tanpa kartu Ngobrol, tab aktif Eksplorasi Kampus | — | Ya |
| 075c | `563002d` | Keterangan kartu Eksplorasi Kampus tanpa "prodi" (SMP, 10–11) | — | Ya |
| 076 | `160650b` | Daftar Periksa dua mode; Persiapan Event | `event_sekolah_aktif` | Daftar Periksa: ya. Persiapan Event: **tidak** (saklar 0) |
| 076b | `d462638` | Persiapan Event khusus SMP, materi kurasi bersumber | `event_sekolah_aktif` | **Tidak**. Yang bisa diuji hanya kalimat netral Daftar Periksa SMP |
| 077 | `aab10bb` | Kartu "Latihan berikutnya" di Beranda; Data Akun SMP tanpa teks kelas 12 | — | Ya. Kartu baru muncul setelah ada cukup jawaban berkeyakinan di satu mapel |
| 077b | `8a74cc6` | `ai_aktif` bawaan 0; pintu Jalur Saya disembunyikan untuk SMP; teks Level-In tanpa angka | `ai_aktif` | Ya |
| 078 | `1fc3dd6` | Ngobrol sebagai penghubung fitur (konteks, kartu tautan) | `ai_aktif` (+ `event_sekolah_aktif` untuk kartu event) | **Tidak**. Dengan saklar 0, Ngobrol hanya memberi balasan uji coba dan layarnya tidak berubah |
| 079 | `a747765` | Pilih Mapel per rumpun (kelas 12), Mapel Saya (7–11) | — | Ya |
| 079b | `90cd679` | Rumpun lama >3, catatan per kelompok, galat seragam | — | Ya |

## 3. Gerbang teknis (14 Okt, tanpa deploy)

Tidak ada yang diperbaiki di task ini.

| Perintah | Hasil |
|---|---|
| `npm test` (folder `LANJUT_App/server`) | **Lulus**: 734 tes, 734 lulus, 0 gagal, 0 todo, 82 suite (± 191 detik) |
| `npm run periksa-sql` | **Lulus** ("tidak ada pelanggaran ditemukan") |
| `npx tsc --noEmit` (folder `LANJUT_App`) | **Lulus** (exit 0) |
| `npm run build:web` (folder `LANJUT_App`), persis | **Gagal, exit 1**: "Build dibatalkan: EXPO_PUBLIC_API_URL masih menggunakan placeholder `https://api.GANTI-DOMAIN/api/v1`". Ini penjaga yang disengaja (LANJUT_061/062) dan memang tanda blocker 1–2. |
| Diagnostik, bukan perbaikan: `npm run build:web` dengan `EXPO_PUBLIC_API_URL=http://localhost:4000/api/v1` dan keluaran ke folder sementara di luar repo | **Berhasil**, exit 0. Satu bundel web 1,6 MB. Kode app bisa dibangun begitu URL produksi diisi. `dist/` di repo tidak disentuh. |
| Expo Go / HP Android / iPhone | **Belum dites** (butuh perangkat) |

**Bukti tanpa panggilan keluar dan tanpa deploy**
- Kedua build dijalankan dengan `EXPO_OFFLINE=1` dan `EXPO_NO_TELEMETRY=1`. Folder sementara diarahkan ke luar repo, supaya cache Metro milik dev server yang sedang berjalan tidak tersentuh.
- Selama build, koneksi TCP seluruh pohon proses build dipantau setiap 0,4 detik: **0 koneksi** ke alamat selain loopback.
- Tes server memakai penyedia AI tiruan dan basis data lokal.
- Tidak ada perintah `git push`, `eas`, atau unggah yang dijalankan. `git status -sb` tetap "ahead" dari `origin/main`.

## 4. Belum dites (dicatat terang-terangan)
- Expo Go, APK, dan iPhone untuk semua fitur sejak LANJUT_039.
- Server di hosting mana pun: deploy, HTTPS, CORS produksi, MariaDB.
- Fitur AI dengan OpenRouter sungguhan, termasuk keselamatan lapis 2.
- Persiapan Event dan Ngobrol penghubung fitur dalam keadaan saklar menyala untuk pengguna sungguhan. Selama ini hanya dicoba di tes dengan `try/finally`.
- Beban (banyak pengguna bersamaan) dan pencadangan basis data.
