# TASK: LANJUT_067 — Perbaikan Progres Beranda dan Bukti Visual 065–066

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Bila berkas itu belum ada di
`docs/`, pindahkan atau ganti nama `docs/AGEN_Aturan-Tetap-LANJUT.md`
menjadi `docs/AGEN-ATURAN-TETAP.md` dan perbarui tautan yang merujuknya.
Tidak ada deploy, push, `eas build`, atau panggilan ke layanan luar.

## Konteks

Dua hal dari laporan 065 dan 066 perlu dibereskan sebelum tester masuk:

1. **Progres selalu mulai dari "1 dari 4".** Langkah "isi kelas" selalu
   terisi karena onboarding memaksa kelas diisi. Akibatnya setiap
   pengguna baru tampak sudah berjalan sebagian. Ini menyesatkan.
2. **Belum ada bukti visual.** Uji browser 360 px di 065 gagal (503 dari
   layanan model), dan 066 tidak melampirkan tangkapan layar atau log.
   Tiga bagian Beranda (grid, "Mulai dari Sini", "Info Penting") belum
   pernah dilihat dalam bentuk yang bisa diperiksa.

Prinsip: fungsi dulu, tampilan belakangan. Task ini tidak menambah
fitur dan tidak mengubah konten.

## Yang Diminta

### A. Perbaiki progres
- Hapus "isi_kelas" dari daftar langkah progres. Langkah yang tersisa
  dihitung dari data yang benar-benar bisa berubah oleh pengguna:
  - `isi_prodi_impian`: `prodi_impian` terisi
  - `centang_daftar_periksa`: minimal 1 butir terselesaikan
  - `coba_latihan`: minimal 1 sesi latihan tercatat
- Total langkah menjadi 3. Teks progres diubah dari "X dari 4" menjadi
  "X dari 3". Tulis teks baru sebagai DRAF di `salinan-teks-lanjut.md`.
- Pastikan pengguna baru tampil "0 dari 3" dan bukan "1 dari 4".
- Tes: pengguna baru = 0 dari 3; setelah mengisi prodi impian = 1 dari 3;
  setelah centang = 2 dari 3; setelah latihan = 3 dari 3. Tes lintas
  akun: progres akun A tidak berubah oleh akun B.
- Mutasi: tes harus gagal bila langkah "coba_latihan" dihapus sementara.
  Cabut, jalankan, kembalikan, lalu laporkan hasilnya.

### B. Bukti visual 360 px
- Jalankan web build (`npm run build:web` dengan `EXPO_PUBLIC_API_URL`
  lokal) dan buka Beranda di lebar 360 px dengan akun uji. Jika browser
  headless gagal, coba jalankan `npx expo start --web` lalu buka di
  browser dengan lebar 360 px. Bila tetap gagal, tulis alasannya.
- Ambil tiga tangkapan layar: (1) akun kelas 7, (2) akun kelas 10, (3)
  akun kelas 12. Setiap tangkapan memperlihatkan grid, progres, dan
  kartu "Mulai dari Sini" bila tampil.
- Simpan tangkapan di luar repo (mis. `scratchpad/bukti-067/`), dan
  pakai hanya akun uji. Jangan commit tangkapan layar ke repo.
- Di laporan, tulis lokasi berkas dan apa yang terlihat. Jika ada
  elemen yang terpotong atau tumpang tindih, catat itu sebagai temuan.

### C. Verifikasi 066 yang belum terbukti
- Tulis hasil uji mutasi 066 (tes gagal saat filter status dicabut
  sementara), dengan perintah dan hasilnya. Kembalikan filter setelahnya.

## Di luar task ini
- Fitur baru, konten baru, grid tambahan, atau poles warna.
- Mengubah logika Tenggat atau Linimasa selain yang diperlukan untuk
  progres.
- Mengubah status verifikasi konten.

## Definition of Done

- [ ] Progres 3 langkah; pengguna baru "0 dari 3"; tes lintas akun ada
- [ ] Mutasi progres dan mutasi 066 terbukti gagal bila penjaga dicabut, lalu dikembalikan
- [ ] Tiga tangkapan layar 360 px (kelas 7, 10, 12) tersimpan di luar repo, lokasinya dilaporkan
- [ ] Teks progres baru tercatat sebagai DRAF
- [ ] `docs/AGEN-ATURAN-TETAP.md` ada dan tautannya benar
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Database uji tidak diubah selain yang diperlukan untuk tes
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Hasil tiga skenario progres (0, 1, 2, 3 dari 3)
- Hasil mutasi progres dan mutasi 066
- Lokasi tiga tangkapan layar dan temuan tampilan
- Apakah build web dan tampilan 360 px berhasil diuji, atau alasan gagal
- Keputusan yang kamu ambil sendiri
