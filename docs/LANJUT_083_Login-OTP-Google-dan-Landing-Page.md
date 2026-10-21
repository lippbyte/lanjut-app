# TASK: LANJUT_083 — Login OTP Email, Login Google, Landing Page, dan APK untuk Pengumpulan

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM untuk task ini:
- OTP lewat **email**.
- Landing page di **domain milik PM**, dan juga dikumpulkan ke **domain guru**.
- Pengumpulan proyek akhir **kurang dari 1 minggu**.

Batasan yang berlaku:
- Tidak ada deploy, unggah, atau push oleh eksekutor. Eksekutor menyiapkan
  berkas. PM yang mengunggah ke domain dan mengirim APK ke guru.
- Tidak ada `eas build`. APK dibuild lokal dengan Gradle.
- Tidak ada perubahan firewall. Tidak ada paket baru tanpa izin PM. Tidak ada
  perubahan saklar `event_sekolah_aktif` (tetap `0`). `ai_aktif` tetap `0`.
- Tidak mengirim email sungguhan ke alamat siapa pun selama tes. Semua tes
  memakai pengirim tiruan. Satu kali kirim sungguhan hanya dengan izin PM.
- Kredensial SMTP dan Google Client ID hanya di `.env`. Tidak dicetak, tidak
  masuk repo, tidak masuk laporan.
- Kebijakan privasi tidak dinaikkan versinya. Teks baru berstatus DRAF.
- Tidak ada data anak sungguhan. Akun uji memakai awalan `uji083_`.

## Konteks

Dari laporan terakhir: login saat ini memakai kata sandi. Login OTP dan Google
belum ada. Landing page belum ada. APK belum dipastikan terpasang di HP.

Hal yang belum tersedia dan harus diisi PM sebelum langkah tertentu:
1. Nama domain landing page, dan syarat pengumpulan dari domain guru.
2. Akun pengirim email (SMTP) untuk OTP, diisi di `.env`.
3. Google OAuth Client ID untuk login Google, diisi di `.env` dan di konfigurasi
   app.
4. Tempat backend di-host. APK untuk guru perlu bisa menghubungi server dari luar
   jaringan. Tanpa backend publik, APK hanya bisa dipakai di Wi-Fi yang sama.
   Ini keputusan PM terpisah.

## Yang Diminta

### A. Login OTP lewat email (dikerjakan pertama)
1. Endpoint `POST /auth/otp/kirim` menerima email, membuat kode 6 digit, dan
   mengirimnya lewat SMTP. Kode berlaku 5 menit.
2. Kode disimpan dalam bentuk hash, tidak dalam teks biasa. Kode tidak pernah
   dicatat di log.
3. Endpoint `POST /auth/otp/verifikasi` menerima email dan kode. Setelah benar,
   server mengembalikan token sesi yang sama dengan login kata sandi.
4. Batas: maksimal 5 percobaan salah per kode, lalu kode hangus. Maksimal 3 kode
   dikirim per email per 15 menit. Pembatasan ini memakai penyimpanan yang sudah
   ada.
5. Login kata sandi tetap berfungsi. OTP menjadi tambahan, bukan pengganti.
6. Galat memakai kunci `galat` dengan `kode`, `pesan`, dan `medan`. Pesan
   tidak memberi tahu apakah email terdaftar (mencegah penebakan akun).
7. Pengiriman email dibungkus dalam fungsi yang bisa ditiru di tes. Semua tes
   memakai tiruan.
8. Tes server minimal 12 kasus: kode benar, kode salah, kode kedaluwarsa, lima
   percobaan salah, batas pengiriman, kode tidak tercatat di log, email yang
   tidak terdaftar tidak bocor, login kata sandi tetap jalan.

### B. Login Google
9. Endpoint `POST /auth/google` menerima ID token dari Google. Server memverifikasi
   token dengan Client ID dari `.env` (tanpa memanggil layanan luar dalam tes;
   verifikasi memakai tiruan).
10. Akun dibuat jika email belum ada. Jika email sudah ada, akun itu dipakai.
    Email yang belum diverifikasi Google ditolak.
11. Tombol "Masuk dengan Google" muncul di layar login app. Tidak tampil jika
    Client ID belum diisi.
12. Tes: token tidak sah ditolak, email tidak terverifikasi ditolak, akun baru
    dibuat, akun lama dipakai.

### C. Landing page
13. Buat folder `landing/` di repo (statis, HTML dan CSS, tanpa framework baru).
    Isi:
    - nama LANJUT dan penjelasan singkat untuk siswa SMP, SMA/SMK, dan MA;
    - tombol "Unduh APK" yang mengarah ke berkas `lanjut-demo.apk` atau tautannya;
    - cara memasang APK di Android, termasuk izin sumber tidak dikenal;
    - tautan ke panduan uji dan ke kebijakan privasi;
    - keterangan bahwa aplikasi masih versi uji.
14. Landing page tampil baik di 360 px tanpa scroll horizontal.
15. Teks landing page berstatus DRAF sampai PM menyetujui.
16. Tidak ada skrip pihak ketiga, pelacak, atau font dari luar, kecuali PM setuju.
17. Tidak ada tautan ke `LANJUT_App` yang membocorkan kunci atau alamat server
    internal.

### D. APK untuk dikumpulkan
18. Build APK lokal dengan Gradle. Konfigurasi API mengikuti `<URL-BACKEND-PM>`
    yang diisi PM. Jika PM belum mengisi, pakai placeholder dan laporkan bahwa APK
    belum siap dikumpulkan.
19. Pastikan build rilis tidak memuat kunci OpenRouter, SMTP, atau Google secret.
    Hanya Client ID Google (publik) yang boleh masuk app.
20. Simpan APK di `scratchpad/apk-kumpul/`. Laporkan ukuran dan SHA-256.

### E. Yang dibuktikan
21. Tes server: minimal 12 kasus OTP dan 4 kasus Google (lihat A dan B).
22. Mutasi, gagal lalu lulus: (a) hapus batas 5 percobaan, (b) log memuat kode,
    (c) hapus pengecekan `email_verified`.
23. `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus.

### F. Langkah yang dilakukan PM (bukan eksekutor)
- Mengisi `.env`: SMTP dan Google Client ID.
- Mengunggah `landing/` ke domain, dan menyerahkan APK ke domain guru.
- Memutuskan tempat backend (lihat Konteks poin 4).

## Di luar task ini
- Deploy, unggah, atau push oleh eksekutor.
- `eas build`, `eas submit`, atau toko aplikasi.
- Kebijakan privasi v2 final (menunggu tinjauan hukum; catatan email dan Google
  harus masuk daftar tinjauan).
- Persiapan Event, AI, dan mikrofon (tetap mati).
- Login dengan nomor telepon.

## Definition of Done

- [ ] OTP email: kirim, verifikasi, kedaluwarsa, batas percobaan, batas pengiriman; ada tes
- [ ] Kode OTP tidak tercatat di log dan tidak tersimpan dalam teks biasa; ada tes
- [ ] Login kata sandi tetap berfungsi; ada tes
- [ ] Login Google: token tidak sah ditolak; akun dibuat atau dipakai; ada tes
- [ ] Tombol Google tidak tampil bila Client ID kosong
- [ ] Landing page di `landing/` tampil di 360 px tanpa scroll horizontal (bukti)
- [ ] Teks landing page berstatus DRAF
- [ ] APK rilis tidak memuat rahasia; ukuran dan SHA-256 dilaporkan
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`
- [ ] Tidak ada email sungguhan terkirim selama tes (dibuktikan)
- [ ] Commit kecil, pesan commit menyebut `LANJUT_083`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar langkah yang masih menunggu PM (dari Konteks dan bagian F)
- Hasil tes dan tiga mutasi
- Bukti tidak ada rahasia di APK dan di landing page
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci, kata sandi SMTP, atau Client Secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tangkapan layar tidak masuk repo.
