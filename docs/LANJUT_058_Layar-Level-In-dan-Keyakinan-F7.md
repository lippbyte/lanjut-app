# TASK: LANJUT_058 — Layar Level-In dan Pertanyaan Keyakinan di Latihan (F7)

## Konteks

Dua hal yang sampai sekarang belum punya wajah di app, padahal sisi
servernya sudah ada:

1. **Level-In.** LANJUT_042 memperbaiki `/kalibrasi/ringkasan` dan
   `/saran-harian` (tidak lagi 500) dan mengisi `konfigurasi_levelin`.
   Task itu sengaja tidak membangun layar: "layar yang menampilkan hasilnya
   bisa task terpisah". Ini task itu.
2. **Pertanyaan keyakinan di F7 (Latihan).** Logika kalibrasi dari PWA
   membandingkan seberapa yakin siswa dengan benar-tidaknya jawaban. Supaya
   Level-In punya bahan kalibrasi, Latihan perlu menanyakan keyakinan.

Level-In gratis, dihitung di server, dan berlaku untuk semua jenjang
(SMP, SMA, SMK), bukan hanya kelas 12.

**Prioritas tetap: fungsi dulu.** Tampilan boleh sederhana. Poles layout
dikerjakan pada tahap poles terpisah. Teks di layar ditandai DRAF dan
dicatat di `salinan-teks-lanjut.md`.

## Aturan keras

- Jangan mengubah logika atau ambang Level-In di server kecuali yang
  diminta di bagian 1. Ambang tetap di `konfigurasi_levelin`.
- Semua endpoint tetap per akun dan tidak boleh membuka data akun lain;
  tambah tes lintas akun untuk apa pun yang baru.
- Jangan menyentuh jalur AI (051–057) dan jangan menyentuh kunci API.

## Yang Diminta

### 1. Periksa dulu kontrak server, laporkan sebelum membangun
Baca kode server dan dokumen LANJUT_041/042, lalu catat di laporan:
- Bentuk respons `/kalibrasi/ringkasan` dan `/saran-harian`.
- Apakah jawaban Latihan (endpoint F7) sudah punya kolom/isian
  **keyakinan**. Bila belum, tambahkan lewat migrasi bernomor berikutnya
  (nilai sempit: misalnya `yakin`, `ragu`, `tebak`; boleh kosong untuk
  data lama), validasi di skema, dan pertahankan kompatibilitas dengan
  app lama (isian opsional).
- Cara logika kalibrasi PWA dulu memakai keyakinan (LANJUT_042 sudah
  menelusurinya). Server memakai keyakinan itu hanya bila sudah ada di
  riwayat; bila belum ada data keyakinan, hasil tetap valid dari
  akurasi saja dan tidak melempar galat.

### 2. Pertanyaan keyakinan di Latihan
- Pada tiap kartu latihan, sebelum jawaban dibuka, tanyakan "Seberapa
  yakin kamu?" dengan tiga pilihan sederhana (yakin / ragu / tebak).
- Boleh dilewati. Melewati tidak menghalangi lanjut ke kartu berikutnya.
- Keyakinan ikut terkirim bersama jawaban ke server. Bila sedang luring
  atau memakai antrean sinkron yang sudah ada, ikuti mekanisme yang
  sama dan pastikan keyakinan ikut tersinkron.
- Berlaku di web dan Android.

### 3. Layar Level-In
Satu layar, dapat dicapai dari navigasi yang sudah ada (tentukan tempat
yang paling wajar dan laporkan). Isi:
- Per mapel yang sudah dilatih: levelnya (sesuai respons server), jumlah
  kartu yang sudah dijawab, dan penjelasan satu kalimat arti level itu
  (teks DRAF).
- Mapel dengan data kurang tampil sebagai "Belum cukup data" beserta
  berapa kartu lagi yang dibutuhkan (ambil angka dari konfigurasi/respons
  server, jangan di-hardcode di app).
- Kalibrasi keyakinan bila datanya cukup: ringkasan sederhana, misalnya
  "Kamu cenderung terlalu yakin / terlalu ragu / pas" sesuai hasil server.
  Tanpa data keyakinan, bagian ini disembunyikan atau berisi ajakan
  mengisi keyakinan saat latihan.
- Saran harian dari `/saran-harian` ditampilkan sebagai kartu terpisah,
  dengan tombol menuju latihan mapel yang disarankan.
- Keadaan kosong (belum pernah latihan): ajakan memulai Latihan.
- Keadaan galat/luring: pesan jelas, tidak menampilkan layar kosong.
- Semua jenjang (7–12) bisa membukanya. Tidak ada gerbang "kelas 12".

### 4. Tes
- Server: keyakinan tersimpan, opsional, tervalidasi; nilai di luar
  daftar ditolak; data lama tanpa keyakinan tetap terbaca; lintas akun
  tertutup; `/kalibrasi/ringkasan` tetap tidak 500 pada akun tanpa
  keyakinan.
- App/E2E (360 px): menjawab kartu dengan dan tanpa keyakinan;
  keyakinan tersimpan; layar Level-In menampilkan keadaan kosong,
  "Belum cukup data", dan satu mapel dengan level untuk akun yang
  disiapkan fixture; akun kelas 9 dan kelas 12 sama-sama bisa membuka.
- `npm test`, `periksa-sql`, `tsc` bersih; lapis 1 skenario AI tetap lolos.

### 5. Dokumen
- Tambahkan teks baru ke `salinan-teks-lanjut.md` (DRAF).
- Perbarui README dan kontrak API yang mencatat endpoint F7.

## Di luar task ini
- Mengubah ambang atau rumus level.
- Riwayat benar/salah sebagai konteks untuk AI (Keputusan 2, nanti).
- Poles tampilan.

## Definition of Done

- [ ] Laporan pemeriksaan kontrak server ditulis sebelum membangun
- [ ] Keyakinan tersimpan di server (opsional, tervalidasi, kompatibel dengan app lama)
- [ ] Latihan menanyakan keyakinan; bisa dilewati; ikut tersinkron
- [ ] Layar Level-In menampilkan level per mapel, "Belum cukup data", kalibrasi, saran harian, dan keadaan kosong/galat
- [ ] Semua jenjang 7–12 dapat membukanya
- [ ] Tes server dan E2E lolos; tes lintas akun untuk yang baru
- [ ] Teks baru ada di `salinan-teks-lanjut.md` sebagai DRAF
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Temuan pemeriksaan kontrak (bagian 1) dan migrasi yang ditambahkan, bila ada
- Letak layar Level-In di navigasi dan alasannya
- Screenshot layar Level-In (kosong, belum cukup data, ada level) dan pertanyaan keyakinan
- Hal yang menurut Anda masih janggal di logika kalibrasi, bila ada
