# Rencana Uji Rilis LANJUT

> **DRAF**, disusun di LANJUT_080 (14 Oktober 2026). Belum disetujui Khalifa.
> Bagian yang bergantung pada keputusan PM ditandai **[KEPUTUSAN]**; daftar
> lengkapnya ada di §7. Kondisi kesiapan dan buktinya ada di
> [`inventaris-080.md`](inventaris-080.md).
>
> Tidak ada data anak sungguhan di dokumen ini, dan tidak boleh ada selama uji.

## 1. Lingkup uji

**Yang diuji:** fitur yang aktif dengan saklar `ai_aktif = 0` dan `event_sekolah_aktif = 0`:
- Daftar/Masuk, gerbang kelas & jenis sekolah, kebijakan privasi (DRAF);
- Beranda per jenjang;
- Jenjang Saya, Jalur Saya (kelas 12), Eksplorasi Kampus;
- Pilih Mapel / Mapel Saya, Daftar Periksa;
- Arsip Belajar (kartu & unggah modul), Latihan, Level-In;
- Data Akun, Gaya Belajar, Cerita Alumni (kosong);
- Ngobrol **tanpa AI**: layar terkunci, balasan uji coba, kartu bantuan.

**Yang tidak diuji** (kecuali PM memutuskan lain, §7 no. 6–7):
- Jawaban AI di Ngobrol (OpenRouter), termasuk konteks fitur dan kartu tautan LANJUT_078;
- Persiapan Event (LANJUT_076/076b);
- Pencarian web Ngobrol.

Saklar tetap `0` selama uji.

**Platform:**
- web di peramban HP dan laptop, lebar 360 px ke atas;
- APK dan iPhone hanya bila build-nya sudah ada. **[KEPUTUSAN §7 no. 4]**

**Konten yang tampil:**
- benih saat ini, 3 dari 84 butir terverifikasi;
- yang belum terverifikasi sudah berlabel "Perkiraan" / "belum diverifikasi" / "Belum dicek ke sumber resmi.", atau disembunyikan.

Ini **tidak** dianggap kegagalan uji. Yang diuji adalah apakah label itu tampil dan apakah layar kosong tetap jelas.

## 2. Target jumlah penguji

**50 pengguna nyata pada 23 Oktober 2026 tidak mungkin tercapai** dengan blocker yang ada, kecuali PM memutuskan lingkup yang lebih kecil. Alasannya:

1. **Belum ada server yang bisa dijangkau dari luar komputer pengembang** (blocker 1). URL produksi masih placeholder, dan build sengaja gagal karenanya (blocker 2).
2. **Pengguna nyata LANJUT adalah siswa, sebagian besar di bawah 18 tahun.** Mendaftarkan mereka butuh dua hal yang belum ada (blocker 7):
   - kebijakan privasi yang sudah ditinjau hukum;
   - persetujuan orang tua/wali lewat sekolah (surat masih DRAF).
3. **Belum ada satu pun uji di HP** (blocker 6). Masalah tampilan atau perangkat baru akan ketahuan saat uji.
4. **Konten hampir semuanya belum terverifikasi** (3/84, blocker 3). Siswa sungguhan akan melihat banyak layar "sedang kami cek".
5. **Sisa waktu 9 hari kalender**, dengan satu orang yang memutuskan dan mentriase (Khalifa).

**Angka yang realistis:**

| Kondisi | Penguji | Bentuk |
|---|---|---|
| Hosting siap paling lambat **17–18 Okt** | **8–10 penguji dewasa** | 2–3 orang per jenjang (SMP, kelas 10–11 SMA/SMK/MA, kelas 12). Satu putaran ± 2 hari, lalu satu putaran ulang setelah perbaikan. |
| Hosting **tidak** siap sebelum 23 Okt | **3–5 penguji dewasa** | Sesi tatap muka di satu ruangan, Wi-Fi yang sama dengan komputer pengembang (`docs/uji-di-hp-lewat-wifi.md`; butuh aturan firewall sementara oleh Khalifa) |
| Siswa sungguhan | **0 sebelum 23 Okt** | Pilot siswa (mis. 10–20 dari satu sekolah) paling cepat sesudah tinjauan hukum dan surat orang tua/wali siap. Tanggal ditentukan PM. |

Alasan 8–10 orang:
- setiap jenjang punya alur berbeda, sehingga perlu minimal 2 penguji per jenjang agar temuan tidak bergantung pada satu orang;
- lebih dari itu, satu orang triase tidak sempat menindaklanjuti dalam 9 hari.

## 3. Peserta

- **Hanya orang dewasa (18 tahun ke atas):**
  - tim EDILAKSO;
  - guru atau pendamping yang bersedia;
  - orang tua/wali sukarelawan yang **memerankan** siswa.
- **Tidak ada siswa sungguhan** dan **tidak ada data anak sungguhan** sampai §2 butir 2 terpenuhi.
- **Akun uji** memakai awalan yang jelas: `ujirilis_` + jenjang + nomor, misalnya `ujirilis_smp01`, `ujirilis_sma01`, `ujirilis_smk01`, `ujirilis_k1201`.
  - Nama tampilan: "Penguji 01" dan seterusnya.
  - Email dikosongkan.
  - Kata sandi dibagikan langsung ke tiap penguji. Kata sandi **tidak** ditulis di dokumen, lembar temuan, atau chat grup.
- **Isi yang dimasukkan penguji harus fiktif atau umum:**
  - kartu Arsip dan modul memakai materi pelajaran umum;
  - pesan Ngobrol tidak memuat nama, sekolah, nomor HP, alamat, atau tanggal lahir sungguhan;
  - foto atau dokumen pribadi tidak diunggah.
- **Persetujuan orang tua/wali untuk akun uji:**
  - dicatat tim lewat `npm run persetujuan-ortu` dengan catatan "Uji rilis, bukan surat sungguhan";
  - hanya untuk akun yang menguji Ngobrol;
  - separuh akun sengaja **tanpa** persetujuan, untuk menguji layar terkunci.
- **Sesudah uji:** akun `ujirilis_%` dihapus oleh tim langsung di basis data. App belum punya fitur hapus akun (peta 059, F28).

## 4. Skenario

Setiap skenario dijalankan di layar HP (360–420 px), lalu dicatat "Lulus" atau "Gagal" di lembar temuan (§6). "Kritis" menandai skenario yang, bila gagal, menghentikan uji putaran itu.

Lulus/gagal per skenario ada di kolom tabel. Aturan putaran ada di §5.

### 4.1 Semua jenjang

| ID | Langkah | Lulus bila | Gagal bila |
|---|---|---|---|
| U1 (Kritis) | Buka app → Daftar dengan akun `ujirilis_…`, isi kelas (dan jenis sekolah untuk 10–12), centang kebijakan → Daftar | Akun dibuat dan langsung masuk Beranda; kebijakan berlabel DRAF bisa dibaca | Galat, layar kosong, atau tombol Daftar tidak bisa ditekan setelah kotak dicentang |
| U2 | Keluar, lalu Masuk lagi | Kembali ke Beranda dengan data yang sama | Data hilang, atau diminta mengisi ulang kelas |
| U3 (Kritis) | Dua penguji di jenjang sama membuat kartu Arsip, lalu saling membandingkan layar | Masing-masing hanya melihat kartunya sendiri | Kartu akun lain terlihat |
| U4 | Arsip → Tambah kartu (2–3 mapel) → buka kartu | Kartu tersimpan dan tampil per mapel | Tidak tersimpan atau mapel salah |
| U5 | Arsip → Unggah modul (berkas .txt/.md/PDF berisi teks, materi umum) → buka modul | Modul tampil dan bisa dibaca | Galat tanpa penjelasan, atau isi rusak |
| U6 | Latihan → pilih mapel → jawab 5–12 kartu, isi "Seberapa yakin kamu?" → ringkasan → Lihat Level-In | Ringkasan tersimpan; Level-In menampilkan mapel yang dilatih (atau "Belum cukup data" bila jawabannya masih sedikit) | Hasil hilang, atau Level-In galat |
| U7 | Pilih Mapel / Mapel Saya → pilih mapel → Simpan → buka Arsip & Latihan | Mapel pilihan tampil paling depan di pilihan mapel Arsip & Latihan | Urutan tidak berubah, atau simpan gagal |
| U8 | Ngobrol, akun **tanpa** persetujuan | Layar "Fitur AI belum aktif untuk akunmu"; "Butuh bicara dengan orang?" membuka kartu bantuan berisi layanan terverifikasi | Kotak tulis tampil, atau kartu bantuan kosong/galat |
| U9 | Ngobrol, akun **dengan** persetujuan → kirim pesan biasa | Balasan berlabel "Uji coba, bukan jawaban AI"; tidak ada kartu tautan, petunjuk, atau catatan konteks LANJUT_078 | Muncul jawaban seolah dari AI, kartu tautan, atau galat |
| U10 (Kritis, **hanya tim**) | Ngobrol, akun dengan persetujuan → kirim satu kalimat uji tanda bahaya dari daftar uji (`server/tests/skenario-ai/skenario.json`), bukan curhat sungguhan | Balasan tetap dari server + kartu bantuan | Kartu bantuan tidak muncul |
| U11 | Data Akun → Ubah → nama tampilan; lalu Gaya Belajar → pilih satu gaya | Nama tampil di sapaan Beranda; gaya belajar tampil di Data Akun | Tidak tersimpan |
| U12 | Matikan data/Wi-Fi sebentar, lalu buka layar lain; ulangi sesudah app ditutup dan dibuka lagi | Pesan "Belum bisa dimuat. Periksa sambungan internetmu, lalu coba lagi." tampil (LANJUT_080b), bukan layar putih | Layar putih, pesan teknis mentah, atau kalimat lama "Yang sudah pernah dibuka masih bisa dilihat" |
| U14 | Ngobrol, akun dengan persetujuan | Tidak ada tombol mikrofon (disembunyikan secara bawaan, LANJUT_080b); kotak tulis dan tombol Kirim tetap ada | Tombol mikrofon tampil, atau kotak tulis hilang |
| U13 | Semua layar di HP 360 px | Tidak ada teks terpotong atau gulir ke samping | Ada teks atau tombol keluar layar |

### 4.2 SMP (kelas 7–9)

| ID | Langkah | Lulus bila | Gagal bila |
|---|---|---|---|
| S1 (Kritis) | Beranda, Jenjang Saya, Daftar Periksa, Data Akun | Tidak ada teks "kelas 12", SNBP, SNBT, atau tenggat kuliah; tidak ada pintu Jalur Saya | Ada teks/pintu kelas 12 |
| S2 | Eksplorasi Kampus ("Kenali Minatmu") → pilih maks. 5 bidang → simpan | Tersimpan; tidak ada daftar prodi | Tersimpan lebih dari 5, atau muncul daftar prodi |
| S3 | Tab Pilih Mapel | Judul "Mapel Saya", maks. 5 mapel, tanpa prodi atau rumpun | Muncul alur prodi (F3) atau rumpun |
| S4 | Daftar Periksa | Kalimat netral "Catat langkah-langkahmu…"; Persiapan Event **tidak** tampil (saklar 0) | Persiapan Event tampil, atau ada placeholder "Bagian ini untuk kelas 12" |
| S5 | Selesaikan U6, lalu buka Beranda | Kartu "Latihan berikutnya" tampil bila saran harian memilih satu mapel; bila data belum cukup, tidak ada ruang kosong | Kartu kosong atau galat |

Catatan diketahui (bukan kegagalan): daftar Mapel Saya berisi mapel SMA (inventaris blocker 8).

### 4.3 SMA/SMK/MA kelas 10–11

| ID | Langkah | Lulus bila | Gagal bila |
|---|---|---|---|
| M1 | Daftar tanpa memilih jenis sekolah | Diminta memilih SMA/SMK/MA | Akun dibuat tanpa jenis sekolah |
| M2 | Beranda & Jenjang Saya | Pintu Pilih Mapel, Eksplorasi Kampus, Gaya Belajar; tanpa tenggat SNBP/SNBT | Ada teks khusus kelas 12 |
| M3 | Eksplorasi Kampus ("Jalur dan Bidangmu") → baca jalur masuk → pilih maks. 3 bidang → simpan | Jalur berlabel "Perkiraan"; tersimpan | Label tidak ada, atau batas jebol |
| M4 | Pilih Mapel → Mapel Saya (atas) → simpan; lalu F3 (bawah): pilih prodi → mapel pendukung → Simpan ke Daftar Periksa | Mapel Saya tersimpan; F3 tanpa "rangkuman umum"; butir pribadi muncul di Daftar Periksa | Rangkuman umum muncul, atau butir tidak tersimpan |
| M5 | Jalur Saya lewat Data Akun | Kartu pengganti untuk kelas 10–11, tanpa tahapan SNBP/SNBT | Tahapan kelas 12 tampil |
| M6 (akun SMK) | Jenjang Saya → bagian khusus SMK | Butir tampil berlabel belum diverifikasi | Tampil tanpa label |

### 4.4 Kelas 12

| ID | Langkah | Lulus bila | Gagal bila |
|---|---|---|---|
| K1 | Beranda | Kartu hero tenggat, Info Penting hanya tahapan terverifikasi yang belum lewat, grid Jalur Saya / Eksplorasi Kampus / Arsip / Level-In / Cerita Alumni | Tahapan lewat atau belum terverifikasi tampil |
| K2 | Jalur Saya → jawab atau Lewati pertanyaan → hasil → seksi "Rumpun favorit" → pilih 1–3 → Simpan rumpun | Tahap, fokus, dan langkah tampil; rumpun tersimpan; pilihan ke-4 tidak bisa ditambah | Rumpun ke-4 tersimpan, atau simpan gagal |
| K3 (Kritis) | Pilih Mapel **sebelum** memilih rumpun | Ajakan "Pilih rumpun favoritmu dulu" + pilihan rumpun; **tidak ada** daftar mapel | Daftar mapel tampil |
| K4 | Pilih Mapel **sesudah** 2 rumpun → pilih maks. 5 mapel → Simpan mapel | Mapel hanya dari 2 rumpun, dikelompokkan per rumpun, setiap kelompok bercatatan "Belum dicek ke sumber resmi."; pilihan ke-6 tidak bertambah | Ada kelompok tanpa catatan, mapel di luar rumpun, atau daftar penuh |
| K5 | Pilih Mapel → F3 (bawah): pilih prodi → saran 2 mapel TKA → Simpan ke Daftar Periksa → Lihat prospek & kampus | Butir pribadi tercentang di Daftar Periksa; profil prodi menampilkan "sedang kami cek" (0/18 terverifikasi) | Profil yang belum terverifikasi tampil sebagai fakta |
| K6 | Daftar Periksa → centang beberapa butir → kembali ke Jalur Saya | Persentase progres ikut berubah | Progres tidak berubah |
| K7 | Cerita Alumni | Layar kosong yang jelas (0 cerita tayang) | Cerita contoh fiktif tampil |

## 5. Kriteria lulus dan gagal

**Keparahan temuan**

| Tingkat | Contoh |
|---|---|
| **Kritis** | Data akun lain terlihat; app tidak bisa dipakai (layar putih, tidak bisa daftar/masuk); kartu bantuan tidak muncul untuk kalimat tanda bahaya; data pribadi terkirim atau tercatat di tempat yang tidak semestinya |
| **Tinggi** | Fitur inti gagal menyimpan; teks kelas 12 tampil untuk SMP; konten belum terverifikasi tampil sebagai fakta |
| **Sedang** | Tampilan rusak di 360 px; teks membingungkan; galat tanpa penjelasan |
| **Rendah** | Polesan (jarak, warna, kata) |

**Aturan putaran uji**
- Satu skenario **lulus** bila semua penguji yang menjalankannya mencatat "Lulus".
- Satu skenario **gagal** bila ada satu temuan Kritis atau Tinggi.
- Satu putaran **lulus** bila:
  - semua skenario bertanda Kritis lulus;
  - tidak ada temuan Kritis atau Tinggi yang masih terbuka;
  - minimal 90% skenario lulus.
- Bila ada temuan **Kritis**, uji skenario itu dihentikan untuk semua penguji sampai diperbaiki dan dites ulang.
- **Uji rilis selesai** bila satu putaran lulus. Uji rilis bukan izin untuk siswa sungguhan; itu tetap menunggu §2 butir 2.

## 6. Cara melapor masalah dan tindak lanjut

**Lembar temuan bersama.** Satu tabel yang dipegang Khalifa (spreadsheet tim atau `docs/uji-rilis/temuan-uji-rilis.md`). **[KEPUTUSAN §7 no. 10]** Kolomnya:
- ID temuan;
- ID skenario (mis. K4);
- tanggal;
- perangkat, OS, dan peramban;
- nama pengguna akun uji (bukan kata sandi);
- langkah;
- yang diharapkan;
- yang terjadi;
- tangkapan layar;
- keparahan.

**Tangkapan layar** hanya dari akun uji, tanpa notifikasi, nama kontak, atau data pribadi lain di layar HP.

**Kritis:** penguji langsung menghubungi Khalifa saat itu juga, tidak menunggu rekap harian.

**Tindak lanjut:**

| Siapa | Tugas |
|---|---|
| Khalifa | Triase sekali sehari: memberi keparahan, memutuskan diperbaiki sekarang/nanti, membuat task perbaikan bernomor (`LANJUT_08x`) |
| Agen pengembang | Mengerjakan task perbaikan dengan tes otomatis, lalu skenario terkait diuji ulang oleh penguji yang menemukannya |
| Guru BK | Temuan keselamatan (kartu bantuan, tanda bahaya) |
| Tim konten | Temuan isi konten (prodi, mapel, tahapan, kartu kurasi) |
| Peninjau hukum | Temuan kebijakan privasi atau persetujuan |

## 7. Keputusan yang dibutuhkan dari PM sebelum uji

| # | Keputusan | Pilihan yang disarankan | Pilihan lain |
|---|---|---|---|
| 1 | Lingkup uji | **Uji internal dengan penguji dewasa, akun uji fiktif, tanpa AI dan tanpa event** | Pilot siswa sungguhan (belum bisa, §2) |
| 2 | Target jumlah sebelum 23 Okt | **8–10 penguji dewasa** bila hosting siap 17–18 Okt; 3–5 bila tidak. 50 siswa digeser sesudah tinjauan hukum | Tetap 50 (tidak tercapai) |
| 3 | Hosting backend | **Putuskan hari ini.** Jalur A (kontainer, Railway sesuai rencana) dengan subdomain bawaan platform untuk uji, sambil DNS `edilakso.my.id` dibereskan | VPS (Jalur B); atau uji LAN saja |
| 4 | Platform uji | **Web (PWA) dulu**: `npm run build:web` sudah terbukti jalan begitu URL diisi, tanpa toko aplikasi | APK lewat `eas build` (kode diunggah ke Expo, butuh izin); Expo Go |
| 5 | Siapa penguji | **Tim + 2–3 guru/pendamping + orang tua sukarelawan**, semuanya dewasa | Siswa (belum bisa) |
| 6 | Fitur AI ikut uji? | **Tidak** (`ai_aktif = 0`). Uji AI terpisah setelah kunci berbatas kredit, evaluasi lapis 2, dan kebijakan diperbaiki | Ya, hanya untuk akun tim |
| 7 | Persiapan Event ikut uji? | **Tidak** (`event_sekolah_aktif = 0`) | Ya, hanya akun SMP tim |
| 8 | Mapel Saya SMP berisi mapel SMA | **Biarkan dan catat sebagai masalah diketahui** (sesuai keputusan 079b) | Sembunyikan Mapel Saya untuk SMP selama uji; tambah mapel SMP (tim konten) |
| 9 | 222 teks DRAF | **Izinkan tampil untuk uji internal**; tinjau dulu butir ⚠ klaim faktual di awal lembar review | Setujui semua dulu (tidak sempat) |
| 10 | Tempat lembar temuan | **Spreadsheet tim** (mudah diisi dari HP), disalin ke `docs/uji-rilis/` di akhir putaran | Berkas Markdown di repo saja |
| 11 | Push 105+ commit lokal ke `origin` | **Push sebelum uji**, sebagai cadangan | Tunda |
| 12 | Kebijakan privasi untuk uji | **Tampilkan versi DRAF apa adanya** (berlabel "DRAF — belum berlaku") untuk penguji dewasa. Tinjauan hukum wajib sebelum siswa | Tunda uji sampai ditinjau |
| 13 | Mikrofon Ngobrol di peramban | **Sudah dikerjakan di LANJUT_080b:** disembunyikan secara bawaan. Menyalakannya kembali (`EXPO_PUBLIC_MIKROFON_NGOBROL=1`) menunggu tinjauan hukum | Nyalakan untuk akun tim saja |
| 14 | Pembersihan akun uji | **Hapus `ujirilis_%` dari basis data sesudah putaran terakhir** | Simpan untuk putaran berikut |
