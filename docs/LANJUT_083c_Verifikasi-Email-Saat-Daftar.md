# TASK: LANJUT_083c — Verifikasi Email Sebelum Akun Dibuat, dan Matikan `ai_aktif`

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`, atau
perubahan firewall. Tidak menambah paket baru. Tidak menaikkan versi kebijakan
privasi. Tidak mengirim email sungguhan. Semua tes memakai pengirim tiruan.

## Langkah pertama (wajib, sebelum yang lain)

1. Set `ai_aktif = 0` di `lanjut_test`. Atas perintah PM (21 Oktober, 19.12 WIB).
   Catat nilai sebelum dan sesudah dari database.
2. Set `event_sekolah_aktif = 0` bila nilainya bukan `0`. Catat.
3. Jalankan `npm test` (server) sekali. Tes `saklar-bawaan-dan-smp` harus lulus.

Jangan mengubah nilai lain di tabel konfigurasi.

## Konteks

Dari laporan 083: akun baru bisa dibuat dengan email apa pun, tanpa membuktikan
bahwa email itu milik pendaftar. Akibatnya, orang bisa mendaftar memakai email
orang lain. Lalu pemilik email asli yang masuk lewat OTP atau Google bisa
masuk ke akun buatan orang itu.

Perbaikan: akun hanya dibuat setelah email terbukti milik pendaftar lewat kode
OTP yang dikirim ke email itu.

Google tidak ikut terdampak, karena verifikasi `email_verified` dari Google sudah
ada di 083.

## Yang Diminta

### A. Alur daftar baru
1. Daftar dengan email dan kata sandi tidak langsung membuat akun. Server hanya
   menyimpan data pendaftaran sementara (email, hash kata sandi, dan tanggal),
   lalu mengirim kode OTP 6 angka ke email itu.
2. `POST /auth/daftar/kirim-kode` menerima data pendaftaran dan mengirim kode.
3. `POST /auth/daftar/verifikasi` menerima email dan kode. Bila benar, akun
   dibuat dengan `email_terverifikasi = true`, dan server mengembalikan sesi
   yang sama seperti login biasa.
4. Kode memakai aturan OTP yang sudah ada di 083: berlaku 5 menit, hash bcrypt,
   maksimal 5 percobaan salah, batas 3 kirim per email per 15 menit.
5. Data pendaftaran sementara dihapus setelah 30 menit atau setelah akun dibuat.
6. Bila email sudah terdaftar, jawaban server sama dengan email baru (tidak
   membocorkan email yang sudah terdaftar). Email yang sudah terdaftar tidak
   menerima kode dan tidak dibuatkan akun baru.

### B. Akun lama
7. Akun yang sudah ada sebelum 083c tidak dihapus. Akun uji `demo_` dan
   `uji…` ditandai terverifikasi di database lokal, dan itu dicatat di laporan.
8. Akun lama yang emailnya belum terverifikasi tetap bisa login dengan kata
   sandi, tetapi aplikasi menampilkan ajakan verifikasi. Jangan memblokir
   akun lama tanpa keputusan PM. Jumlah akun lama yang belum terverifikasi
   dilaporkan.

### C. App
9. Layar daftar mengikuti dua langkah: isi data, lalu masukkan kode. Pesan
   galat memakai teks DRAF.
10. Kalau kode salah atau kedaluwarsa, ada tombol "Kirim ulang kode" yang tunduk
    pada batas 3 per 15 menit.

### D. Tes dan mutasi
11. Tes server minimal 8 kasus: akun tidak dibuat sebelum kode benar; kode
    benar membuat akun; kode salah dan kedaluwarsa ditolak; lima percobaan salah
    menghanguskan kode; batas kirim; email terdaftar tidak bocor; data sementara
    dihapus; akun lama tetap bisa login dengan kata sandi.
12. Mutasi, gagal lalu lulus: (a) buat akun langsung tanpa kode, (b) akun dengan
    email belum terverifikasi tidak bisa login (dengan sengaja, untuk membuktikan
    tes login ada), (c) pesan daftar membocorkan email yang sudah terdaftar.

### E. Bukti
13. Bukti bahwa tidak ada email sungguhan terkirim selama tes (tiruan dipakai,
    0 koneksi keluar).
14. Bukti tangkapan layar 360 px untuk alur daftar. Disimpan di
    `scratchpad/bukti-083c/`.

## Di luar task ini
- Mengirim email sungguhan. Itu hanya dengan izin tertulis PM.
- Mengubah teks kebijakan privasi atau versinya.
- Mengubah saklar lain, selain langkah pertama.
- Login dengan nomor telepon.
- Memblokir akun lama tanpa keputusan PM.

## Definition of Done

- [ ] `ai_aktif = 0` dicatat sebelum dan sesudah dari database
- [ ] `event_sekolah_aktif = 0` dicatat
- [ ] Akun baru tidak dibuat sebelum kode benar; ada tes
- [ ] Email terdaftar tidak bocor lewat pesan daftar; ada tes
- [ ] Kode mengikuti aturan OTP (berlaku, hash, batas percobaan, batas kirim); ada tes
- [ ] Data pendaftaran sementara dihapus setelah 30 menit atau setelah akun dibuat; ada tes
- [ ] Akun lama tidak dihapus; jumlah akun lama yang belum terverifikasi dilaporkan
- [ ] Tes server minimal 8 kasus lulus
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Tidak ada email sungguhan terkirim; dibuktikan
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] Commit kecil, pesan commit menyebut `LANJUT_083c`

## Laporkan
- Nilai `ai_aktif` dan `event_sekolah_aktif` sebelum dan sesudah
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Hasil tes dan tiga mutasi
- Jumlah akun lama yang belum terverifikasi
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tangkapan layar tidak masuk repo.
