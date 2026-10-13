# TASK: LANJUT_070 — Progres Beranda Juga Menghitung Butir Pribadi

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall.

## Konteks

Langkah `centang_daftar_periksa` di progres Beranda (LANJUT_065) hanya
menghitung baris di tabel `kemajuan`. Untuk siswa kelas 7–11, Daftar
Periksa memakai butir pribadi (LANJUT_034–035), dan centangnya tersimpan
lewat `/butir-pribadi/:id/selesai`, bukan di `kemajuan`. Akibatnya siswa
non-kelas 12 tidak bisa mencapai "3 dari 3" lewat app, dan penanda
"sudah punya kemajuan" yang menentukan kartu "Mulai dari Sini" juga salah.
Tes 068 tidak menangkapnya karena memakai `PUT /kemajuan` langsung.

**Keputusan PM:** langkah `centang_daftar_periksa` terpenuhi bila ada
minimal 1 butir terselesaikan di `kemajuan` ATAU di butir pribadi milik
akun itu. Keputusan ini diambil sendiri oleh PM.

## Yang Diminta

### A. Hitungan progres dan penanda kemajuan
- Di server (sumber kebenaran), ubah perhitungan `centang_daftar_periksa`
  dan penanda "sudah punya kemajuan" agar membaca kedua sumber, dengan
  filter per akun.
- Pastikan logika ini hanya ada di satu tempat (fungsi bersama), dan
  cermin klien di `lib/beranda.ts` memakai aturan yang sama. Jika ada
  duplikasi yang tidak bisa dihindari, tes harus membandingkan keduanya.
- Pengguna baru tetap "0 dari 3".

### B. Tes
- Tes lewat jalur butir pribadi: centang satu butir pribadi lewat
  `/butir-pribadi/:id/selesai` (bukan `PUT /kemajuan`), lalu progres harus
  naik ke 2 dari 3 dan kartu "Mulai dari Sini" hilang bila langkah lain
  juga terpenuhi.
- Tes lewat jalur `kemajuan` tetap ada dan lulus.
- Tes lintas akun: butir pribadi akun A tidak menaikkan progres akun B.
- Mutasi: cabut sementara penjaga yang membaca butir pribadi, jalankan
  tes, kembalikan. Laporkan hasil gagal lalu lulus.
- `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` bersih.

### C. Dokumen
- Catat di `docs/salinan-teks-lanjut.md` bahwa definisi langkah progres
  sekarang mencakup butir pribadi. Teks tidak berubah, hanya catatan.
- Di laporan, tulis hash commit 065 dan 068 yang terpengaruh, dan jelaskan
  bahwa tes 068 hanya membuktikan jalur API `kemajuan`.

## Di luar task ini
- Mengubah jumlah langkah progres atau teksnya.
- Mengubah Daftar Periksa, butir pribadi, atau gerbang kelas.
- Konten, kartu, atau tampilan lain.

## Definition of Done

- [ ] Hitungan centang dan penanda kemajuan membaca `kemajuan` dan butir pribadi, per akun
- [ ] Tes jalur butir pribadi lulus; tes jalur `kemajuan` tetap lulus
- [ ] Tes lintas akun untuk butir pribadi ada dan lulus
- [ ] Mutasi lulus terbukti (gagal lalu lulus)
- [ ] Akun kelas 10 bisa mencapai 3 dari 3 hanya lewat app (dijelaskan di laporan; uji web bila tersedia)
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Hash commit 065 dan 068 yang terpengaruh
- Hasil tes jalur butir pribadi dan mutasi
- Apakah 3 dari 3 bisa dicapai lewat app untuk akun kelas 10, dengan langkah yang dipakai
- Keputusan yang kamu ambil sendiri
