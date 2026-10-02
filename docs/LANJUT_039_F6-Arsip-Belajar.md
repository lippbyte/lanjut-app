# TASK: LANJUT_039 — F6 Arsip Belajar (Layar Expo + Kategori)

## Konteks

Dari audit LANJUT_033: backend F6 sudah siap — CRUD `/kartu` dan 7 tes
otorisasi lolos. Yang belum ada: kolom kategori di tabel `kartu`, dan
layar Expo-nya sama sekali belum dibangun.

Ada 12 kartu kurasi (buatan tim konten, bukan siswa) tapi semuanya masih
`belum_diverifikasi` di 3 mapel saja — belum representatif. Audit
menyarankan: **rilis kartu buatan siswa dulu, sembunyikan kartu kurasi**
sampai terverifikasi. Khalifa belum membatalkan saran ini, jadi ikuti.

**Prioritas tetap: fungsi dulu.** Fokus ke CRUD kartu yang berfungsi
penuh dulu, baru polish visual (misal desain kartu flip, animasi, dll)
ditunda.

## Yang Diminta

### 1. Kolom kategori
- Tambah kolom kategori di tabel `kartu` (migrasi baru, jangan ubah
  migrasi lama).
- **Pakai daftar mapel yang sudah ada** di app (yang dipakai F3 Pilih
  Mapel / data 10 mapel), jangan bikin daftar kategori baru yang beda
  sendiri — biar konsisten di seluruh app. Cek dulu di mana daftar mapel
  itu didefinisikan sebelum menduplikasi.

### 2. Layar Expo — Daftar Arsip
- Tampilkan kartu milik siswa yang sedang login, dikelompokkan/difilter
  per kategori (mapel).
- **Kartu kurasi (12 kartu tim konten) DISEMBUNYIKAN untuk sekarang** —
  jangan ditampilkan ke siswa sampai ada tanda "terverifikasi" yang jelas
  dari sisi data. Kalau endpoint tidak membedakan status verifikasi saat
  mengirim data ke app, filter di app sementara (dan laporkan kalau
  sebaiknya difilter di server, bukan di app, untuk keamanan data).
- Tombol tambah kartu baru.

### 3. Layar Expo — Tambah/Edit Kartu
- Form: judul, isi (depan/belakang, sesuai struktur tabel kartu yang
  sudah ada — cek dulu skemanya), kategori (dropdown dari daftar mapel).
- Simpan ke akun siswa yang sedang login.

### 4. Layar Expo — Lihat/Hapus Kartu
- Buka satu kartu, lihat isinya.
- Hapus kartu milik sendiri (ikuti pola hapus lunak yang sudah ada di
  endpoint, kalau itu pola yang dipakai).

### 5. Navigasi
- Sambungkan dari tempat yang masuk akal (ikuti pola navigasi yang
  sudah ada, jangan bikin pola baru) — kemungkinan dari Beranda atau
  tab yang sudah ada.

### 6. Jangan sentuh
- Jangan ubah endpoint `/kartu` yang sudah ada kecuali untuk
  menambahkan field kategori.
- Jangan verifikasi atau tampilkan 12 kartu kurasi — itu tetap
  menunggu proses verifikasi tim konten.

## Test

- [ ] Tambah kartu baru dengan kategori → tersimpan, tampil di Daftar Arsip
- [ ] Edit kartu sendiri → perubahan tersimpan
- [ ] Hapus kartu sendiri → hilang dari daftar
- [ ] Akun lain tidak bisa lihat/edit/hapus kartu akun pertama (tes lintas akun eksplisit, ikuti pola LANJUT_034)
- [ ] 12 kartu kurasi TIDAK muncul di Daftar Arsip siswa manapun
- [ ] Filter per kategori/mapel berfungsi
- [ ] Tidak ada regresi di 7 tes otorisasi `/kartu` yang sudah ada
- [ ] Typecheck 0 error

## Definition of Done

- [ ] Kolom kategori ditambahkan dan dipakai
- [ ] 3 layar Expo (Daftar, Tambah/Edit, Lihat) berfungsi penuh
- [ ] Kartu kurasi tetap tersembunyi
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Daftar kategori/mapel yang dipakai (dan dari mana sumbernya)
- Konfirmasi kartu kurasi tersembunyi dan di mana letak penyaringannya (app atau server)
- Screenshot 3 layar
