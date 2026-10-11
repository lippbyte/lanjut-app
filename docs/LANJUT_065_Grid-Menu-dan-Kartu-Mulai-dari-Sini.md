# TASK: LANJUT_065 — Grid Menu Beranda dan Kartu "Mulai dari Sini"

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan pada firewall.

## Konteks

LANJUT_064 sudah selesai (ec7d2e34). Beranda sekarang menampilkan kartu
per jenjang, tetapi masih berupa daftar kartu panjang yang terasa seperti
halaman web, bukan aplikasi. Khalifa ingin Beranda terasa seperti
launcher aplikasi: ikon kecil dalam grid, dan kartu besar hanya untuk
hal yang penting. Keputusan yang sudah diambil untuk task ini:

- Nama tab: "Daftar Periksa" dan "Jenjang Saya" diterima (DRAF).
- Kartu SMP yang belum punya konten sungguhan tetap disembunyikan.
- Ukuran font tab bawah 11px dipertahankan.

Prinsip: fungsi dulu, tampilan belakangan. Task ini hanya tampilan dan
pengelompokan. Tidak ada logika bisnis baru dan tidak ada konten baru.

## Yang Diminta

### A. Grid menu
- Ganti daftar kartu kecil di Beranda dengan grid 4 kolom (atau 3 kolom
  bila lebar layar di bawah 360 px), berisi ikon dan label pendek.
- Isi grid mengikuti kartu yang tampil untuk jenjang akun (hasil 064).
  Tidak ada item yang ditambah atau dihapus selain yang tidak tampil
  untuk jenjang itu.
- Label pendek maksimal dua baris dan tidak terpotong di 360 px.
- Ikon: pakai ikon yang sudah ada di proyek. Jika belum ada yang cocok,
  pakai ikon generik dari pustaka ikon yang sudah dipakai app. Jangan
  membuat ikon baru atau mengunduh ikon dari internet.
- Setiap item grid mengarah ke rute yang sama seperti kartu sekarang.
  Uji ini untuk tiap jenjang.

### B. Kartu "Mulai dari Sini"
- Tampilkan satu kartu besar di atas grid untuk pengguna yang baru
  mendaftar atau belum punya kemajuan (misalnya belum ada butir Daftar
  Periksa yang dicentang dan belum ada latihan).
- Isi kartu: satu kalimat penjelas dan satu tombol ke langkah pertama
  sesuai jenjang. Contoh: kelas 7 ke "Jenjang Saya", kelas 10–11 ke
  "Pilih Mapel", kelas 12 ke "Cek Posisi Gue".
- Teks baru ditandai DRAF dan dicatat di `docs/salinan-teks-lanjut.md`.
- Kartu hilang setelah pengguna punya kemajuan. Kriteria yang dipakai
  harus ada di kode dan diuji.

### C. Progres sederhana
- Tampilkan satu baris progres di atas grid, misalnya "2 dari 5 langkah",
  dengan langkah yang sudah ada di app (misalnya: isi kelas, isi prodi
  impian, centang Daftar Periksa, buka Arsip, coba Latihan).
- Jumlah langkah dan definisinya ditulis di kode, bukan dikarang di
  teks. Bila ada langkah yang datanya belum tersedia, jangan dihitung dan
  tulis di laporan.
- Hitungan dihitung dari data yang sudah ada di server. Tidak ada tabel
  baru dan tidak ada migrasi.

### D. Tes dan verifikasi
- Tes otomatis untuk kriteria "Mulai dari Sini" dan hitungan progres.
- Tes lintas akun: progres akun A tidak terpengaruh oleh akun B.
- `npm test` (server), `npm run periksa-sql`, `tsc` untuk server dan app
  bersih.
- Uji web 360 px untuk akun kelas 7, 10, dan 12. Laporkan per akun:
  jumlah item grid, apakah "Mulai dari Sini" tampil, dan angka progres.
  Lampirkan teks, bukan tangkapan layar yang memuat data nyata.
- Bila bukti E2E tidak bisa dilampirkan, tulis dengan jelas.

## Di luar task ini
- Kartu "Info Penting" (itu LANJUT_066).
- Konten baru untuk jenjang mana pun.
- Ikon baru, animasi, atau poles warna lebih dari yang diperlukan.
- Perubahan pada logika kelas, jenjang, atau konten 064.

## Definition of Done

- [ ] Grid menu tampil di Beranda untuk kelas 7, 10, dan 12, tanpa label terpotong di 360 px
- [ ] Setiap item grid membuka rute yang benar
- [ ] "Mulai dari Sini" tampil untuk akun baru dan hilang setelah ada kemajuan; kriteria diuji
- [ ] Progres sederhana dihitung dari data server; tes lintas akun ada
- [ ] Teks baru tercatat sebagai DRAF di `salinan-teks-lanjut.md`
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Jumlah item grid per jenjang
- Definisi "Mulai dari Sini" dan langkah progres yang dipakai
- Langkah progres yang tidak dihitung karena datanya belum ada
- Bukti E2E 360 px per akun, atau pernyataan belum diuji
- Keputusan yang kamu ambil sendiri
