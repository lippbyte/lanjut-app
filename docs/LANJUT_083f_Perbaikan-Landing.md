# TASK: LANJUT_083f — Perbaikan Landing setelah Tinjauan 083e

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Task ini mengerjakan ulang branch `lanjut-083e`
(commit `1ca8c80` dan `61af028`). Keputusan PM (22 Oktober, 22.27 WIB):
ikuti rekomendasi reviewer untuk setiap poin di bawah.

Batasan yang tetap berlaku:
- **Tidak ada deploy, unggah, push, atau `eas build`.**
- **Tidak ada paket baru** di `package.json` mana pun.
- **Tidak ada tautan font atau skrip dari luar.** CSP tetap `default-src 'self'`.
- `ai_aktif` tetap `0`. `event_sekolah_aktif` tetap `0`. Dicek di database.
- **Tes memakai DB sendiri.** Jangan memakai `lanjut_test` yang juga dipakai working
  tree. Buat DB terpisah (misalnya `lanjut_test_083f`) dan set lewat variabel
  lingkungan. Laporkan nama DB yang dipakai.
- Kunci dan sandi tidak dicetak atau masuk repo.

## Yang Diminta

### A. Warna sesuai `design.md`
1. Hapus warna turunan `#E4F3F7`, `#D6E5EE`, dan `#456A8C`. Gunakan hanya
   `#B4E1EB`, `#95BDD7`, dan `#78A4CB` untuk elemen dekoratif, sesuai `design.md` §2.3.
2. Untuk teks tautan yang kontrasnya kurang di atas `#B4E1EB`, pakai `#1A1A1A`
   dengan garis bawah. Jangan menambah warna baru. Catat perubahan di laporan.
3. Latar putih dipertahankan untuk area teks. Jangan mengganti latar ke krem atau abu.

### B. Klaim yang belum terverifikasi
4. Hapus kalimat "nilainya jadi syarat pendaftaran" di bagian TKA. Ganti dengan
   kalimat yang tidak mengklaim aturan: "TKA punya tenggat pendaftaran. Cek
   Linimasa untuk jadwalnya."
5. Hapus "15–25 menit sehari" dari kartu masalah dan dari bagian yang didapat.
   Ganti dengan "Latihan harian yang singkat."
6. Periksa semua angka di halaman. Kalau ada angka yang tidak punya sumber resmi,
   hapus atau tandai DRAF dengan jelas.

### C. Hero dan judul halaman
7. Pertahankan hook "Anak SMK juga bisa kuliah." karena itu kalimat M1 yang sudah
   disetujui di salinan teks.
8. Sesuaikan `<title>` dan meta description `index.html` supaya tidak bertentangan
   dengan hero. Gunakan: "LANJUT — Jalur kuliah untuk siswa SMK". Ubah juga meta
   description supaya menyebut SMK sebagai fokus. Jangan menyebut SMP sampai kelas 12
   di tempat ini.
9. Catat di laporan bahwa kalimat "SMP sampai kelas 12" di app adalah cakupan
   fitur, dan landing sengaja mengambil fokus SMK. Itu perlu PM konfirmasi.

### D. Lisensi font
10. Perbaiki `OFL.txt` Source Sans 3. Hak cipta yang benar adalah
    "Copyright 2010-2024 Adobe (http://www.adobe.com/)" sesuai berkas sumber
    upstream. Hapus baris "Google Inc.". Jangan mengubah isi lisensi selain baris
    hak cipta.
11. Catat sumber dan SHA-256 `OFL.txt` yang baru.

### E. Sinkronisasi dokumen (boleh menyentuh `docs/`)
12. Salin `design.md` v3.1 dari proyek ke `docs/design.md` di repo. Versi repo
    (v1) diganti. Isi v3.1 ada di proyek dengan nama `design.md`.
    Jika tidak bisa mengambilnya dari proyek, lapor dan jangan menebak isinya.
13. Tambahkan teks halaman utama yang baru ke `docs/salinan-teks-lanjut.md`
    sebagai bagian baru "Landing (DRAF)". Setiap baris berstatus DRAF.
    Tambahkan juga baris untuk lembar review.
14. Jalankan `npm run lembar-review-teks` jika skripnya ada, lalu laporkan
    hasilnya.

### F. Tes dan bukti
15. Tes landing tetap minimal 17 kasus, dan tambah tes untuk:
    - tidak ada warna di luar tiga biru dan `#1A1A1A`, `#FFFFFF` di CSS;
    - tidak ada klaim "15–25 menit" dan "syarat pendaftaran" di halaman;
    - `<title>` berisi "SMK".
16. Mutasi, gagal lalu lulus: (a) tambah warna `#456A8C`, (b) tulis ulang
    "15–25 menit", (c) hapus blok `prefers-reduced-motion`.
17. `npm test` (server, di DB terpisah), `npm run periksa-sql`, `npx tsc --noEmit`
    (app), dan cek tipe landing lulus.
18. Bukti 360 px untuk keempat halaman, di `scratchpad/bukti-083f/`.

## Di luar task ini
- Membuat APK atau mengubah `LANJUT_App/`.
- Mengubah `server/`.
- Mengubah kebijakan privasi.
- Menghapus folder di luar repo, termasuk `D:\lcx` dan `C:\Users\Public\lj`.
  Itu keputusan PM.

## Definition of Done

- [ ] Hanya tiga biru dan `#1A1A1A`/`#FFFFFF` di CSS; keputusan dicatat
- [ ] Klaim "syarat pendaftaran" dan "15–25 menit" dihapus; ada tes
- [ ] `<title>` dan meta description sesuai fokus SMK; ada tes
- [ ] `OFL.txt` Source Sans 3 memakai hak cipta Adobe; SHA-256 dilaporkan
- [ ] `docs/design.md` sama dengan v3.1 di proyek (atau dilaporkan gagal)
- [ ] Teks landing baru masuk `docs/salinan-teks-lanjut.md` sebagai DRAF
- [ ] Tes landing lulus; mutasi (a), (b), (c) gagal lalu lulus
- [ ] Tes memakai DB terpisah, dan nama DB dilaporkan
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] `ai_aktif = 0` dan `event_sekolah_aktif = 0` (dicek di database)
- [ ] Commit kecil di branch `lanjut-083e` (atau branch baru `lanjut-083f`),
      pesan commit menyebut `LANJUT_083f`

## Laporkan
- Hash commit dan `git show --stat`
- Daftar warna yang dihapus, dan kontras teks tautan yang dipakai
- Teks mana yang diubah dan kenapa
- SHA-256 `OFL.txt` yang baru
- Hasil tes, tiga mutasi, dan nama DB tes
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix`, dan jangan
  menulis ulang riwayat git.
- Akun uji hanya di DB tes terpisah. Jangan menyentuh `lanjut_test`.
- Tangkapan layar tidak masuk repo.
