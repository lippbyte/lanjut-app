# TASK: LANJUT_041 — F7 Latihan

## Konteks

Dari audit LANJUT_033: endpoint `POST/PATCH /sesi-latihan` dan
`POST /riwayat-latihan` sudah ada tapi 0 tes. Belum ada desain antrian
kartu maupun layar Expo. F6 Arsip Belajar (sumber kartu) sudah selesai
(LANJUT_039).

**Keputusan yang diambil untuk task ini (bukan ditanyakan lagi ke
Khalifa, karena sudah jelas dari temuan sebelumnya):** Level-In masih
rusak (`keputusan.js` stub melempar galat) dan butuh 3 keputusan produk
yang belum diambil (gratis/berbayar, dihitung di server/klien, ambang
perkiraan). **Versi pertama F7 TIDAK memakai Level-In.** Pakai antrian
sederhana dulu (lihat poin 2). Kalau Khalifa tidak setuju dengan asumsi
ini, bisa dikoreksi di laporan balik sebelum lanjut ke task berikutnya
yang bergantung pada F7.

**Prioritas tetap: fungsi dulu.** Antrian sederhana itu final untuk
versi ini, bukan sementara menunggu Level-In — jangan dibuat setengah
hati dengan asumsi "nanti diganti".

## Yang Diminta

### 1. Sumber kartu latihan
- Kartu yang dipakai: kartu milik siswa sendiri dari Arsip Belajar
  (LANJUT_039). Kartu kurasi tetap tidak ikut (konsisten dengan
  LANJUT_039/040).
- Siswa bisa pilih mapel mana yang mau dilatih (pakai saringan mapel
  yang sama seperti di Arsip).

### 2. Antrian kartu — sederhana, tanpa Level-In
- Urutan acak dari kartu yang dipilih (mapel tertentu atau semua).
- Tidak perlu spaced repetition, tidak perlu skor kesulitan — itu
  wilayah Level-In yang sengaja ditunda.
- Satu sesi = sejumlah kartu (misal semua kartu di mapel itu, atau
  dibatasi angka tertentu — putuskan yang masuk akal, laporkan
  pilihanmu).

### 3. Endpoint — tambahkan tes
- Uji `POST /sesi-latihan` (mulai sesi) dan `PATCH /sesi-latihan`
  (update progress/selesai).
- Uji `POST /riwayat-latihan` (catat hasil).
- **Tes lintas akun** (pola yang sama seperti LANJUT_034/039): akun lain
  tidak bisa lihat/ubah sesi atau riwayat latihan akun pertama.

### 4. Layar Expo
- Mulai sesi: pilih mapel (atau semua), mulai.
- Selama sesi: tampilkan kartu satu per satu, tombol lihat jawaban,
  tombol "berikutnya". Progress sederhana (misal "3 dari 10").
- Akhir sesi: ringkasan (berapa kartu selesai), tombol kembali/ulangi.
- Riwayat latihan: daftar sesi yang sudah dilakukan, tanggal, mapel,
  jumlah kartu (ikuti pola layar riwayat lain yang sudah ada kalau ada).

### 5. Navigasi
- Sambungkan dari tempat yang masuk akal (kemungkinan dari Arsip
  Belajar atau Beranda) — ikuti pola navigasi yang sudah ada.

## Test

- [ ] Mulai sesi latihan dengan mapel tertentu → kartu yang muncul sesuai mapel itu
- [ ] Selesaikan sesi → riwayat tercatat
- [ ] Akun lain tidak bisa lihat/ubah sesi atau riwayat akun pertama (tes lintas akun eksplisit)
- [ ] Kartu kurasi tidak pernah muncul di sesi latihan
- [ ] Tidak ada regresi di tes yang sudah ada
- [ ] Typecheck 0 error

## Definition of Done

- [ ] Endpoint `/sesi-latihan` dan `/riwayat-latihan` punya tes, termasuk lintas akun
- [ ] Layar mulai sesi, selama sesi, dan ringkasan selesai berfungsi
- [ ] Layar riwayat latihan menampilkan sesi-sesi sebelumnya
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Aturan jumlah kartu per sesi yang kamu pilih, dan alasannya
- Konfirmasi: apakah asumsi "tidak pakai Level-In untuk versi ini" sudah sesuai, atau ada kendala yang membuatmu perlu menyentuh Level-In juga
- Screenshot layar mulai sesi, selama sesi, dan riwayat
