# Peta Kelengkapan LANJUT — 9 Oktober 2026

> Disusun di LANJUT_059, **baca saja**: tidak ada kode, konfigurasi, atau
> basis data yang diubah, dan tidak ada panggilan jaringan keluar. Bukti
> diambil dari repo di `main` (commit `feab2bc`), riwayat git, tes, dan
> basis data lokal `lanjut_test` yang dibaca dengan SELECT saja. **Server
> produksi belum ada**, jadi angka konten di bawah adalah angka benih yang
> sama yang akan dipakai produksi.
>
> Pasangannya: [`kesiapan-rilis-uji.md`](kesiapan-rilis-uji.md) (urutan
> deploy, tabel konfigurasi, daftar periksa keselamatan).

## Ringkasan untuk keputusan

### Hitungan butir per status

| Status | Jumlah |
|---|---|
| Selesai, terbukti | 26 |
| Selesai kode, belum terbukti | 3 |
| Sebagian | 14 |
| Belum dibangun | 13 |
| Menunggu manusia | 46 |
| **Jumlah butir** | **102** |

Artinya: hampir semua **kode** yang direncanakan untuk rilis uji sudah ada dan
teruji (task 033–058: 22 dari 26 selesai dan terbukti). Yang menahan rilis
uji adalah **pekerjaan manusia**: server produksi, dasar hukum data anak,
verifikasi konten, uji di HP, dan review keselamatan. Fitur yang belum
dibangun hampir semuanya memang di luar rilis awal (F8 berbayar, F9 mitra, P2,
Generate Soal) atau menunggu keputusan.

### Lima hal yang paling menghambat rilis uji (urut keparahan)

| # | Penghambat | Kenapa menghambat | Penanggung jawab | Besar |
|---|---|---|---|---|
| 1 | **Belum ada server produksi; APK masih menunjuk IP LAN** | Tanpa server yang bisa dijangkau dari HP siswa, app tidak bisa dipakai di sekolah sama sekali. Profil `preview` di `LANJUT_App/eas.json` masih `http://10.141.5.75:4000/api/v1`; catatan terakhir domain `edilakso.my.id` NXDOMAIN (`docs/keputusan-topologi-hosting.md`, tidak dicek ulang karena task ini tanpa jaringan). | Khalifa | Sedang (langkahnya sudah tertulis: `LANJUT_024`, `server/README.md` §6) |
| 2 | **Dasar hukum data anak belum siap** | Kebijakan privasi v2 masih DRAF dengan 29 `[ISI]`, belum ditinjau orang yang paham UU PDP, nomor versinya belum dinaikkan, dan belum diputuskan apakah akun dasar (tanpa AI) juga butuh persetujuan orang tua/wali. Surat orang tua/wali belum bisa dicetak. | Peninjau hukum + Khalifa | Besar |
| 3 | **Konten belum diverifikasi** | 3 dari 84 butir konten terverifikasi (hanya 3 tahapan TKA). F4 Cerita Alumni 0 cerita nyata; F6 Arsip 0 kartu kurasi terverifikasi (siswa baru melihat arsip kosong); F10 0 dari 18 profil tampil; Linimasa tanpa SNBP/SNBT. | Tim konten | Besar |
| 4 | **Fitur 039–058 belum pernah diuji di HP Android** | Semua uji sejak F6 Arsip dilakukan di web 360 px dan tes server. Dev client di HP dibuat sebelum `expo-document-picker` masuk (`cc023e4` 27 Sep vs `9488647` 3 Okt), jadi unggah modul belum bisa dicoba di HP tanpa build ulang. 134 teks DRAF juga belum disetujui. | Khalifa | Sedang |
| 5 | **Keselamatan AI belum siap untuk siswa sungguhan** | Daftar tanda bahaya belum ditinjau guru BK (A06 "diancam sebar foto" dan A07 "pengen hilang aja" masih terlewat), SAPA 129 belum dicek, pesan akut ikut terkirim di riwayat berikutnya, evaluasi lapis 2 dengan model sungguhan belum dijalankan, retensi penyedia dan batas kredit belum dicek. **Tidak menghambat rilis uji tanpa AI**: AI hanya aktif untuk akun dengan persetujuan orang tua/wali yang dicatat, dan `ai_aktif` bisa dimatikan. | Guru BK + Khalifa | Sedang |

Tindakan kecil yang sebaiknya segera: **77 commit lokal belum di-push** ke
`origin/main` (terakhir di remote: `85a7ff0`). Bila laptop rusak, pekerjaan
LANJUT_030–058 hilang. Keputusan push ada di Khalifa.

### Yang menunggu manusia, per orang (siap dibagikan)

**Khalifa**
- Server produksi & DNS `edilakso.my.id`; isi `EXPO_PUBLIC_API_URL` produksi di `eas.json` lalu build APK; build ulang dev client (kode diunggah ke Expo, butuh persetujuan); uji di HP Android; push 77 commit.
- Setujui atau koreksi 134 teks DRAF di `docs/lembar-review-draf-teks.md`.
- Keputusan produk: onboarding cerita di Expo; penghitung hari beruntun & pengulangan kartu yang sering salah (F7); F8 berbayar; F9 mitra; panel admin; memperbarui PRD untuk segmen SMP–SMA–SMK–MA; layar terkunci vs balasan uji coba untuk akun tanpa persetujuan (J01); kata topik tanpa tanda tanya; tiga catatan kalibrasi Level-In; profil `teknik-elektro`; status verifikasi `prodi_mapel`; tinjau ambang Level-In setelah ada data.
- AI: siapa menanggung biaya dan batas kredit bulanan; jumlah siswa pilot; siapa memoderasi; menyalakan web atau tidak, mesinnya, dan batas hariannya; Generate Soal (hak cipta, label "dibuat AI", biaya); periksa retensi OpenRouter & penyedia model; jalankan evaluasi lapis 2.
- `[ISI]` milik Khalifa di kebijakan v2 (daftar lengkap: `docs/kebijakan-v2-klaim-vs-kode.md`); uji oleh minimal 1 orang di luar tim; landing page di `/tentang`.

**Tim konten**
- Verifikasi 81 butir yang belum dicek: 18 profil prodi, 12 kartu kurasi, 19 prodi, 10 mapel (termasuk "tersedia di SMK"), 6 Khusus SMK, 11 Daftar Periksa, 3 tahapan Linimasa; konfirmasi ulang 3 tahapan TKA yang ditandai Claude (`docs/verifikasi/lembar-review-konten.md`).
- Tanggal SNBP/SNBT 2027 setelah rilis resmi; minimal 3 cerita alumni nyata berizin tertulis; kartu kurasi untuk 7 mapel yang masih kosong; riset profil `teknik-elektro` bila diputuskan.

**Guru BK**
- Tinjau `server/config/tanda-bahaya.json` (usulan tambahan untuk A06 dan A07 di `tests/skenario-ai/skenario.json`) dan `server/config/kartu-bantuan.json`.
- Putuskan apakah pesan bertanda bahaya akut dibuang dari riwayat yang dikirim ke AI.
- Nilai hasil evaluasi lapis 2 (`docs/skenario-ai.md`).

**Peninjau hukum (paham UU PDP)**
- Kebijakan privasi v2 dan surat orang tua/wali; dasar pengiriman data ke luar negeri; hak cipta modul yang dikirim ke penyedia AI; apakah akun dasar butuh persetujuan orang tua/wali; aturan untuk siswa yang sudah 18 tahun; hapus lunak, masa simpan, dan riwayat persetujuan saat akun dihapus; tenggat menanggapi permintaan.

**Sekolah (lewat Khalifa)**
- Kop surat, penandatangan, dan siapa yang menyimpan surat asli persetujuan.

## Acuan yang dipakai dan yang tidak ditemukan

**Dipakai:**
- `docs/prd-sdd-lanjut.md` — PRD + SDD v1 (F1–F10, P2, Definisi Selesai §15). Disebut "sumber kebenaran tunggal".
- `docs/PRD-LevelIn.md`, `docs/SDD-LevelIn.md`, `docs/SDD-Backend-Foundation.md`, `docs/SDD-F10-eksplorasi-tujuan.md`.
- `docs/LANJUT_012_Spek-AI-Navigator-V2.md` dan `LANJUT_012a` (keputusan AI), `docs/audit-051-vs-spek.md`.
- `docs/koordinasi-pm-v1.1.md` (rilis v1.1 = F10 + Level-In), `docs/LANJUT_029_Audit-Kesenjangan-Fitur.md`, `docs/todo-verifikasi-v1.md`, `docs/tiga-utang-terakhir.md`, `docs/keputusan-topologi-hosting.md`.
- Dokumen task `docs/LANJUT_033`–`058`, riwayat git, dan kode.

**Tidak ditemukan di repo** (tidak dikarang isinya):
1. **"Brief"** yang dirujuk `LANJUT_012` (prinsip AI, empat peran AI, bagian 10 Future Simulation, bagian 11 Personal Education Path). Hanya kutipannya yang ada di `LANJUT_012`.
2. **Dokumen "Tier 0".** Hanya disebut satu baris di `LANJUT_012` §6: verifikasi konten, izin alumni, APK. Baris itu bertanda [x], tetapi data menunjukkan ketiganya belum beres (B1–B3).
3. **Roadmap v1.2 dan V2 sebagai dokumen.** Hanya ada sebagai judul task (`LANJUT_009` "v1.2 Decision Support", `LANJUT_012` "V2").
4. **Dokumen task LANJUT_051.** Task itu diminta langsung di percakapan (chatbot OpenRouter); acuannya adalah `audit-051-vs-spek.md` dan commit `bfb7f29`.
5. **Hasil audit LANJUT_033.** Dilaporkan di percakapan, tidak disimpan sebagai berkas.

**Catatan:** PRD v1 masih menyebut segmen siswa SMK kelas 11–12, dan "melayani
siswa SMA" sebagai bukan tujuan (§3, §4). Sejak LANJUT_033/035/038, app
melayani kelas 7–12 dan SMP/SMA/SMK/MA. PRD belum diperbarui (A20).

## Peta

**Status:** ST = Selesai, terbukti · SK = Selesai kode, belum terbukti · SB =
Sebagian · BD = Belum dibangun · MM = Menunggu manusia.

"Terbukti" di sini = ada commit dan tes otomatis atau E2E web 360 px. Uji di
HP Android dicatat terpisah (G4) karena belum pernah dilakukan untuk fitur
sejak LANJUT_039.

### A. Fitur PRD v1 (`prd-sdd-lanjut.md`)

| # | Butir | Sumber | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|---|
| A1 | F1 Linimasa | PRD §6 F1 | MM | `c78c9ca`, `fa69bb5`, `ee77ac0`; `tests/konten-linimasa.test.js` (`862851f`); app menyaring tahapan tanpa `diperiksa_pada`. DB: 3/6 terverifikasi | Tanggal SNBP/SNBT 2027 (belum dirilis); 3 tahapan mockup; konfirmasi ulang 3 TKA yang ditandai Claude (LANJUT_020) | Tim konten |
| A2 | F2 Khusus SMK → Jenjang Saya per jenjang | PRD §6 F2; LANJUT_037 | MM | `36e1bd7`, `0b82dd0`; `tests/konten-khusus-smk.test.js`. DB: 0/6 terverifikasi (tampil berlabel "belum diverifikasi") | Verifikasi 6 butir; isi SMP/SMA/MA masih teks DRAF | Tim konten, Khalifa |
| A3 | F3 Penolong Pilih Mapel | PRD §6 F3 | MM | `c976e71`, `8bc3188`, `39bb5bc`, `162b2d2`; peringatan mapel tak ada di SMK `components/screens/PilihMapelScreen.tsx:260`; `tests/konten-agregasi.test.js`. DB: 0/19 prodi, 0/10 mapel, 76 relasi mockup | Verifikasi prodi, mapel, bobot, "tersedia di SMK" (PRD §11: memblokir F3) | Tim konten |
| A4 | F4 Cerita Alumni | PRD §6 F4 | MM | `fc09053`; saringan izin `tests/konten-cerita-alumni.test.js` (`080c26d`). DB: 0 tayang, 2 contoh fiktif | Minimal 3 cerita nyata dengan izin tertulis | Tim konten |
| A5 | F5 Daftar Periksa | PRD §6 F5 | MM | `0341ff6`, `9ff7b84`, `81e6354`; `tests/kemajuan.test.js`, `tests/butir-pribadi.test.js`, `tests/konten-checklist-rumpun.test.js`. DB: 0/11 terverifikasi | Verifikasi 11 butir | Tim konten |
| A6 | F6 Arsip Belajar | PRD §6 F6 | SB | `30c7c98`, `0653a9b`, `9488647` (modul); `tests/kartu-arsip.test.js`, `tests/modul.test.js` | Keputusan wajib PRD "arsip sudah berisi kartu kurasi tim" belum terpenuhi: 0/12 kurasi terverifikasi (server menyaringnya, LANJUT_040), hanya 3/10 mapel punya kartu | Tim konten |
| A7 | F7 Latihan Hari Ini | PRD §6 F7, cerita 6–7 | SB | `c233cd4`, `5de6faf`, `fad7193`; `tests/latihan.test.js`; E2E 058 | Penghitung hari berturut-turut belum dibangun (tidak ada kode di app); "kartu yang sering salah muncul lebih sering" belum (antrian acak, keputusan LANJUT_041) | Khalifa (putuskan) |
| A8 | F8 Fitur berbayar | PRD §6 F8 | BD | Tidak ada kode; rancangan di `docs/rancangan-arsip-latihan-banksoal.md` §2.2 | Keputusan model bisnis | Khalifa |
| A9 | F9 Bank Soal Mitra | PRD §6 F9 | BD | Hanya `MVP-PWA/bank-soal.html` statis; tidak ada tabel/endpoint/layar Expo (LANJUT_029 §4.7) | Mitra dan perjanjian tertulis lebih dulu | Khalifa |
| A10 | F10 Eksplorasi Tujuan | PRD §6 F10 (v1.1) | MM | `8e5db80`, `edd42be`, `c82c711`, `f43ce3d`, `2e39d83`; `tests/konten-eksplorasi-tujuan.test.js`. DB: 0/18 profil terverifikasi → siswa melihat "Profil prodi sedang kami cek" | Verifikasi 18 profil; keputusan `teknik-elektro` (F17) | Tim konten, Khalifa |
| A11 | Login wajib, splash, 401 kembali ke Masuk | LANJUT_001, 018 | ST | `c39ac1d`, `1914e12`, `c99a1f3`; `tests/auth.test.js` | — | — |
| A12 | Onboarding cerita (4 layar + tanya kelas & prodi) | PRD §14 Alur A; LANJUT_029 §4.2 | BD | Tidak ada rute onboarding di `LANJUT_App/app/`. Kelas & prodi ditanya di form Daftar sejak LANJUT_035 | Putuskan perlu atau tidak | Khalifa |
| A13 | Panel admin tim | SDD §12, §14 Alur C | BD | `prd-sdd-lanjut.md` §12 catatan 27 Sep; konten lewat `MVP-PWA/data/*.json` + `npm run benih` | Keputusan; bukan syarat rilis uji | Khalifa |
| A14 | P2 Notifikasi dorong | PRD §6 P2 | BD | Tidak ada kode (P2, memang tidak dibangun) | — | — |
| A15 | P2 Mode luring penuh (cerita 11) | PRD §6 P2, §5 cerita 11 | SB | Cache React Query hanya di memori (`providers/QueryProvider.tsx` tanpa persistensi); `KeadaanGalat` menjanjikan "yang sudah pernah dibuka masih bisa dilihat", hanya benar selama app belum ditutup | P2; kalimat galat perlu dicek kebenarannya | Khalifa |
| A16 | P2 Antarmuka mitra, perbandingan sekolah | PRD §6 P2 | BD | Tidak ada kode (P2) | — | — |
| A17 | Definisi Selesai §15: 360 px, layar kosong, keadaan galat | PRD §15 | SB | E2E 360 px dijalankan per task (036–058) dan dilaporkan, tetapi **skrip & tangkapan tidak ada di repo** (F22) | Simpan skrip E2E di repo atau jalankan ulang sebelum rilis | Khalifa |
| A18 | Definisi Selesai §15: teks dari `salinan-teks-lanjut.md` | PRD §15 | MM | `docs/lembar-review-draf-teks.md`: 134 butir DRAF dari 19 blok (dibuat ulang LANJUT_058) | Persetujuan teks | Khalifa |
| A19 | Definisi Selesai §15: dicoba ≥1 orang di luar tim | PRD §15 | MM | Tidak ada catatan uji pengguna luar tim di repo (penguji "Antigravity" di `briefing-antigravity-tester.md` adalah agen, bukan orang) | Uji dengan siswa/guru | Khalifa |
| A20 | Segmen pengguna: PRD SMK 11–12 vs app kelas 7–12 SMP/SMA/SMK/MA | PRD §3, §4; LANJUT_033/035/038 | MM | `0a990a5`, `50e6e76`, `6413eff`, `ea9b467`; PRD tidak diperbarui | Perbarui PRD (catatan perubahan §16) | Khalifa |
| A21 | Tujuan T5: ≥50 pengguna nyata sebelum 23 Okt | PRD §2 | MM | Belum ada server produksi | Bergantung G1, G2 | Khalifa |
| A22 | Cek Posisi Gue | LANJUT_005, 013 | ST | `2ab82da`, `79ea171`, `cf7994e`, `fc5bea3` | — | — |
| A23 | Jalur Saya | LANJUT_004 | ST | `8f9a06e`, `011118c`, `43f3a1e`; `tests/pengguna.test.js` | — | — |

### B. "Tier 0" (`LANJUT_012` §6; dokumen sendirinya tidak ada)

| # | Butir | Sumber | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|---|
| B1 | Verifikasi konten | LANJUT_012 §6 | MM | Alat siap (`adc8f7f`, `ecd2728`); DB 9 Okt: 3/84 terverifikasi, sama dengan `docs/verifikasi/laporan-status-verifikasi.md` (3 Okt) | 81 butir (lihat A1–A6, A10) | Tim konten |
| B2 | Izin alumni | LANJUT_012 §6 | MM | 0 cerita nyata (A4) | Kumpulkan & minta izin tertulis | Tim konten |
| B3 | APK | LANJUT_012 §6; LANJUT_002 | SB | `c908e84` (EAS preview); `eas.json` preview masih IP LAN; tidak ada catatan build APK sejak fitur 039–058 | URL produksi + build ulang | Khalifa |

### C. Rilis v1.1 (`koordinasi-pm-v1.1.md`)

| # | Butir | Sumber | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|---|
| C1 | F10 + Level-In dirilis bersama sebagai v1.1 ke pengguna | `koordinasi-pm-v1.1.md` §4 | MM | Kodenya ada di Expo (A10; LANJUT_042, 058) | Server produksi + APK (G1, G2) | Khalifa |

### D. AI (`LANJUT_012`, `012a`, `LANJUT_033`)

| # | Butir | Sumber | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|---|
| D1 | Keputusan 1: model AI dan siapa membayar | LANJUT_012 §3 | MM | Model bawaan diisi di konfigurasi (`mig/015`: `anthropic/claude-sonnet-5.5`); penanggung biaya belum tertulis | Putuskan penanggung biaya & batas kredit | Khalifa |
| D2 | Keputusan 2: batas topik | LANJUT_012 §3 | ST | Aturan & kalimat tetap di `server/src/modul/ngobrol/ngobrol.layanan.js` (`ATURAN`); `tests/ngobrol-keselamatan.test.js`; skenario lapis 1 kategori C | — | — |
| D3 | Keputusan 3: protokol eskalasi | LANJUT_012 §3 | SB | `a3ac414`: deteksi di server, kartu bantuan, balasan tetap; `tests/ngobrol.test.js`, `tests/ngobrol-keselamatan.test.js` | Review guru BK (F1, F2, F4); SAPA 129 belum dicek | Guru BK |
| D4 | Keputusan 4: siapa memoderasi | LANJUT_012 §3 | MM | Isi obrolan sengaja tidak disimpan (`tests/ngobrol.test.js` "isi obrolan tidak tercatat"); tidak ada jalur moderasi | Putuskan cara moderasi tanpa menyimpan isi (mis. laporan siswa) | Khalifa |
| D5 | Keputusan 5: jumlah siswa pilot | LANJUT_012 §3 | MM | Tidak tertulis | Putuskan | Khalifa |
| D6 | Empat peran AI (Navigator, Explorer, Planner, Companion) | LANJUT_012 §4 | SB | `bfb7f29`: satu "teman ngobrol" untuk minat, cara belajar, rencana; bukan empat peran terpisah | Putuskan perlu dipisah atau tidak | Khalifa |
| D7 | Future Simulation, Personal Education Path | "Brief" §10–11 (lewat LANJUT_012 §5) | BD | Tidak ada kode; di luar V2 awal | — | Khalifa |
| D8 | Generate Soal | LANJUT_033 | BD | Tidak ada kode | Tiga keputusan: hak cipta, label "dibuat AI", biaya | Khalifa |

### E. Task LANJUT_033–058

| # | Task | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|
| E1 | 033 Audit kesenjangan fitur | SB | Instruksi `d6358bd`; hasil audit tidak disimpan sebagai berkas | Bila perlu, simpan hasilnya (peta ini menggantikannya) | — |
| E2 | 034 Butir Daftar Periksa milik akun | ST | `da3f186`, `81e6354`; `tests/butir-pribadi.test.js` (lintas akun) | — | — |
| E3 | 035 Dukungan jenjang SMP (kelas 7–12) | ST | `0a990a5`, `50e6e76`; `tests/pengguna-kelas.test.js` | — | — |
| E4 | 036 Wajib isi kelas | ST | `84f43a2`; E2E 360 px (laporan task) | — | — |
| E5 | 037 Khusus SMK → Jenjang Saya | ST | `0b82dd0` | Isi per jenjang = teks DRAF (A18) | Khalifa |
| E6 | 038 Jenis sekolah | ST | `6413eff`, `ea9b467`; `tests/pengguna-jenis-sekolah.test.js` | — | — |
| E7 | 039 F6 Arsip Belajar | ST | `0653a9b`, `30c7c98`; `tests/kartu-arsip.test.js` | Kartu kurasi (A6) | Tim konten |
| E8 | 040 Saring kartu kurasi di server | ST | `b51cfce`; `tests/kartu-kurasi.test.js` | — | — |
| E9 | 041 F7 Latihan | ST | `c233cd4`, `5de6faf`; `tests/latihan.test.js` | Lihat A7 | Khalifa |
| E10 | 042 Level-In + audit `/sinkron/klaim` | ST | `e849217`, `bb049f6`; `tests/levelin-keputusan.test.js`, `tests/levelin-kalibrasi.test.js`, `tests/sinkron-lintas-akun.test.js` | Ambang perkiraan (F23) | Khalifa |
| E11 | 043 Persiapan verifikasi konten | ST | `ecd2728`; `tests/verifikasi-konten.test.js`, `tests/benih-verifikasi.test.js`, `tests/lembar-review.test.js` | Verifikasinya sendiri (B1) | Tim konten |
| E12 | 044 Label "Perkiraan" F10 | ST | `f43ce3d` | — | — |
| E13 | 045 Kaki halaman F10 | ST | `2e39d83` | — | — |
| E14 | 046 Lembar review draf teks | ST | `db21ad9`; `tests/lembar-review-teks.test.js` | Persetujuan teks (A18) | Khalifa |
| E15 | 047 Kerangka persetujuan & kebijakan privasi | ST | `b3febbb`; `tests/persetujuan.test.js`, `tests/kebijakan-privasi.test.js` | Surat & alur sekolah (G7) | Khalifa, sekolah |
| E16 | 048 Terima kebijakan untuk akun lama | ST | `68b2f09`; `tests/persetujuan.test.js` ("terima ulang") | — | — |
| E17 | 049 Unggah modul Arsip | ST | `9488647`; `tests/modul.test.js`, `tests/modul-potong.test.js` | Pemilih berkas di HP butuh dev client baru (G3) | Khalifa |
| E18 | 050 Kerentanan npm audit | SB | `93b71df` (server); app: 29 temuan sengaja ditinggal (`LANJUT_App/README.md` "Audit dependensi") | Tinjau saat naik Expo SDK 58 | Khalifa |
| E19 | 051 Ngobrol dijawab AI lewat OpenRouter | SK | `bfb7f29`; `tests/ngobrol.test.js` (penyedia tiruan). Belum pernah dijalankan dengan kunci sungguhan; dokumen task tidak ada di repo | Uji dengan kunci + batas kredit (G8, G9) | Khalifa |
| E20 | 052 Audit 051 terhadap spek | ST | `e37bfd2`; `docs/audit-051-vs-spek.md` | Celah yang masih terbuka: F11, D4 | Khalifa |
| E21 | 053 Pengaman AI | ST | `a3ac414`; `tests/ngobrol.test.js`, `tests/ngobrol-keselamatan.test.js` | Review guru BK (D3) | Guru BK |
| E22 | 054 Skenario uji AI | ST | `c99977f`; `tests/skenario-ai.test.js` (lapis 1: 60 skenario, 57 lolos, 3 todo) | Lapis 2 (G9) | Khalifa, guru BK |
| E23 | 055 Materi, modul, web, sitasi | SK | `d5b4447`; `tests/ngobrol-materi.test.js`, `tests/ngobrol-materi-murni.test.js` (penyedia tiruan). Plugin web & anotasi OpenRouter belum pernah dipanggil sungguhan | Uji dengan kunci; keputusan web (F14–F16) | Khalifa |
| E24 | 056 Kebijakan & surat v2 (draf) | ST | `b20db57`; `tests/kebijakan-privasi.test.js`; `docs/kebijakan-v2-klaim-vs-kode.md` (79 klaim) | 29 `[ISI]`, tinjauan hukum (G6) | Peninjau hukum, Khalifa |
| E25 | 057 Perbaikan kecil pasca-055 | ST | `51073e4`; tes LANJUT_057 di `tests/ngobrol-materi*.test.js` | `engine: "exa"` belum pernah dipanggil sungguhan | Khalifa |
| E26 | 058 Layar Level-In & keyakinan F7 | ST | `fad7193`; `tests/latihan.test.js` (keyakinan, lintas akun); E2E 360 px 25/25 | Uji di HP (G4) | Khalifa |

### F. Temuan terbuka dari laporan sebelumnya (dicatat, tidak diubah)

| # | Temuan | Sumber | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|---|
| F1 | "Diancam sebar foto" dalam bahasa sehari-hari tidak terdeteksi akut | LANJUT_054 (A06) | MM | `tests/skenario-ai/skenario.json` A06 `diketahui_gagal` (todo di `npm test`) | Tambah frasa setelah review | Guru BK → Khalifa |
| F2 | "Pengen hilang aja" terdeteksi ringan, bukan akut | LANJUT_054 (A07) | MM | Skenario A07 `diketahui_gagal` | Idem | Guru BK → Khalifa |
| F3 | Akun tanpa persetujuan: 403 + layar terkunci, spek meminta balasan uji coba | LANJUT_052 butir 2, LANJUT_054 J01 | MM | Skenario J01 `diketahui_gagal`; `audit-051-vs-spek.md` celah 11 | Putuskan perilaku | Khalifa |
| F4 | Pesan bertanda bahaya akut ikut terkirim di riwayat pesan berikutnya | LANJUT_056 | MM | `docs/kebijakan-privasi-DRAF.md` Lampiran C butir 13 | Putuskan, lalu task kode bila perlu | Guru BK, Khalifa |
| F5 | Kata topik saja tanpa tanda tanya ("fotosintesis") tidak mengambil modul | LANJUT_057 | MM | `server/README.md` bagian Materi; tes LANJUT_057 | Putuskan (berdampak ke privasi & biaya web) | Khalifa |
| F6 | Kalibrasi tidak punya pola "terlalu ragu" | LANJUT_058 | MM | `docs/levelin-pemeriksaan-kontrak-058.md` janggal 1 | Putuskan (mengubah salinan logika PWA) | Khalifa |
| F7 | Saran harian hanya dari jawaban berkeyakinan | LANJUT_058 | MM | idem janggal 2 | Putuskan | Khalifa |
| F8 | Ketersediaan kartu untuk saran ≠ kartu Latihan | LANJUT_058 | MM | idem janggal 3 | Putuskan | Khalifa |
| F9 | Dua minimum berbeda (5 jawaban berkeyakinan vs 10 jawaban) | LANJUT_058 | MM | idem janggal 4 | Putuskan | Khalifa |
| F10 | Data jalur masuk terverifikasi untuk AI tidak pernah diisi di produksi | LANJUT_053/054 | BD | `ngobrol.layanan.js` `pesanSistem`: "Produksi belum mengisinya (selalu kosong)"; AI menjawab "LANJUT belum punya datanya" | Sumber data terverifikasi untuk AI | Khalifa, tim konten |
| F11 | Log metadata moderasi (jumlah token/`usage`, biaya) tidak dicatat | `audit-051-vs-spek.md` celah 10 | BD | Log Ngobrol hanya jumlah potongan/web, tingkat bahaya, jenis galat | Putuskan apa yang dicatat (lihat rencana pemantauan) | Khalifa |
| F12 | Teks yang belum menyebut AI: peringatan unggah modul, penafian Gaya Belajar, "fitur AI nanti" (§4.13, §4.14) | LANJUT_056 | BD | Lampiran C butir 14 kebijakan | Perbarui bersama rilis teks v2 | Khalifa |
| F13 | Hak cipta modul yang potongannya dikirim ke penyedia luar | LANJUT_055 | MM | Lampiran C 12a; `[ISI]` I10 | Tinjauan | Peninjau hukum |
| F14 | Biaya per pertanyaan, penanggung, batas kredit bulanan | LANJUT_055 | MM | Lampiran C 12c; `docs/alur-data-ai-materi.md` | Putuskan | Khalifa |
| F15 | Batas harian pencarian web final | LANJUT_055 | MM | Lampiran C 12b; bawaan 10 | Putuskan | Khalifa |
| F16 | Mesin pencari web dan berlaku tidaknya `data_collection: deny` di sana | LANJUT_055, 057 | MM | `server/README.md` peringatan `ai_web_mesin`; `[ISI]` I11 | Cek kebijakan Exa/penyedia | Khalifa |
| F17 | Prodi `teknik-elektro` tanpa profil F10 | LANJUT_043 | MM | `laporan-status-verifikasi.md` §4.1 | Hapus / biarkan / riset susulan | Khalifa, tim konten |
| F18 | `url_sumber` kartu kurasi selalu kosong (benih tidak mengisinya) | LANJUT_043 | BD | `laporan-status-verifikasi.md` §4.3 | Perubahan kecil di benih | Khalifa |
| F19 | `prodi_mapel` tidak punya status verifikasi | LANJUT_043 | MM | `laporan-status-verifikasi.md` §4.4 | Putuskan perlu migrasi atau dicek bersama prodi | Khalifa |
| F20 | Skema belum pernah diuji di MariaDB (hosting cPanel sering memakai MariaDB) | `server/README.md` §6 Prasyarat | SK | `ROW_NUMBER() OVER`, `CHECK`, FULLTEXT dipakai; hanya diuji di MySQL 8.0.30 | Uji migrasi + `npm test` di versi DB hosting | Khalifa |
| F21 | Tabel env di README server tidak mencantumkan `OPENROUTER_API_KEY` | LANJUT_059 (temuan baru) | SB | `server/README.md` §6 tabel vs `.env.production.example` baris 53 dan `src/config/env.js:69` | Tambah satu baris | Khalifa |
| F22 | Skrip & tangkapan E2E tidak ada di repo | LANJUT_059 (temuan baru) | SB | E2E 036–058 dijalankan dari folder sementara sesi | Simpan skrip E2E di repo agar bisa diulang sebelum rilis | Khalifa |
| F23 | Ambang Level-In masih perkiraan | LANJUT_042 | MM | `MVP-PWA/data/levelin-konfig.json` `_catatan` | Tinjau setelah ada data pemakaian | Khalifa |
| F24 | §6.6 jam perangkat salah: tanpa tes otomatis | `server/README.md` "Penyimpangan kecil" butir 4 | SB | `src/util/waktu.js` `keDbDariKlien`, diuji manual saja | Tambah tes | Khalifa |
| F25 | Gerbang AI berlaku untuk semua akun, termasuk siswa 18 tahun ke atas | LANJUT_047, 056 | MM | Lampiran C butir 2 | Tinjauan | Peninjau hukum |
| F26 | Hapus lunak kartu/butir dan masa simpan data | LANJUT_047 | MM | Lampiran C butir 5; `[ISI]` I3, I16, I17 | Tinjauan | Peninjau hukum, Khalifa |
| F27 | Riwayat persetujuan ikut terhapus bila akun dihapus | LANJUT_047 | MM | Lampiran C butir 4 (`ON DELETE CASCADE`) | Tinjauan | Peninjau hukum |
| F28 | Fitur hapus akun di app belum ada | LANJUT_056 klaim H3 | BD | Tidak ada rute hapus akun di `server/src/modul/*/*.rute.js` | Lewat kontak dulu; fitur bila diputuskan | Khalifa |
| F29 | Siapa menyimpan surat asli persetujuan dan bagaimana memastikan tanda tangan | LANJUT_047 | MM | Lampiran C butir 3 | Putuskan bersama sekolah | Khalifa, sekolah |

### G. Kesiapan rilis & operasional

Rincian langkahnya di [`kesiapan-rilis-uji.md`](kesiapan-rilis-uji.md).

| # | Butir | Sumber | Status | Bukti | Sisa kerja | Penanggung jawab |
|---|---|---|---|---|---|---|
| G1 | Server produksi & domain | LANJUT_022, 024; `keputusan-topologi-hosting.md` | MM | Tidak ada server produksi (LANJUT_029 §5.5, LANJUT_043); catatan terakhir domain NXDOMAIN | Hosting, DNS, migrasi, benih | Khalifa |
| G2 | APK menunjuk server produksi | LANJUT_002 | MM | `LANJUT_App/eas.json` preview: `http://10.141.5.75:4000/api/v1` | Ganti URL (https), `eas build` | Khalifa |
| G3 | Dev client baru untuk pemilih berkas | LANJUT_049 | MM | `expo-document-picker` masuk `9488647` (3 Okt), setelah `cc023e4` (27 Sep) | Build ulang (kode diunggah ke Expo) | Khalifa |
| G4 | Uji di HP Android untuk fitur 039–058 | LANJUT_059 | MM | Tidak ada catatan uji HP sejak LANJUT_039; semua E2E di web 360 px | Uji di HP fisik | Khalifa |
| G5 | Push ke remote | LANJUT_059 | MM | `git status`: `main...origin/main [ahead 77]` | Push | Khalifa |
| G6 | Kebijakan v2 diisi, ditinjau, versi naik | LANJUT_056 | MM | 29 `[ISI]` (`kebijakan-v2-klaim-vs-kode.md`); `persetujuan_versi_kebijakan` = 1 | Isi, tinjau, rilis app, naikkan versi | Peninjau hukum, Khalifa |
| G7 | Surat orang tua/wali & alur sekolah | LANJUT_047, 056 | MM | `docs/surat-persetujuan-ortu-wali-DRAF.md` (DRAF, `[ISI: nomor versi saat dirilis]`) | Kop, penandatangan, cetak, pencatatan | Khalifa, sekolah |
| G8 | Kunci OpenRouter & batas kredit | LANJUT_051–055 | MM | `OPENROUTER_API_KEY` kosong di templat; `audit-051-vs-spek.md` syarat 1 | Buat kunci berbatas kredit | Khalifa |
| G9 | Evaluasi AI lapis 2 dengan model sungguhan | LANJUT_054 | MM | `tools/evaluasi-ai.js` terkunci; belum dijalankan | Jalankan, lalu dinilai | Khalifa, guru BK |
| G10 | Pemantauan pilot | LANJUT_059 | SB | Log akses + `[ngobrol]` + `[keselamatan]`; tanpa hitungan tersimpan, tanpa biaya/token, tanpa peringatan otomatis | Lihat rencana pemantauan | Khalifa |
| G11 | Kerentanan dependensi app | LANJUT_050 | SB | 29 temuan app (4 paket akar) sengaja ditinggal; jangan `npm audit fix` di folder app | Tinjau di Expo SDK 58 | Khalifa |
| G12 | Landing page di `/tentang` dan tombolnya | `keputusan-topologi-hosting.md` | MM | Tombol `LandingPage/index.html` ke `https://edilakso.my.id/`; mockup lama masih menyebut `lanjut.app` | Tempatkan & klik setelah DNS beres | Khalifa |

## Cara memperbarui peta ini

Ulangi pemeriksaan yang sama (baca saja): riwayat git, `npm test`, hitungan
verifikasi konten dengan SELECT, `git status`. Ganti tanggal di nama berkas,
jangan menimpa versi lama, supaya kemajuannya terlihat.
