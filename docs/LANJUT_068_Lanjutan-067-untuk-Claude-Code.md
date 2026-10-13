# TASK: LANJUT_068 — Lanjutan LANJUT_067 (Claude Code)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
`eas update`, atau panggilan ke layanan luar. Tidak ada perubahan firewall.

## Konteks

LANJUT_067 (perbaikan progres Beranda dan bukti visual 065–066) sudah
dikirim ke Antigravity pada 11 Oktober. Sampai sekarang laporannya belum
diterima PM. Eksekutor sekarang kembali ke Claude Code, dan task ini
melanjutkan 067 dari kondisi repo yang ada, bukan dari awal.

Cara kerja task ini:
1. **Periksa dulu apa yang sudah ada.** Jalankan `git log --oneline -20`
   dan `git status`. Cari commit atau perubahan terkait 067 (progres 3
   langkah, berkas tangkapan layar, mutasi 066).
2. **Jangan mengulang yang sudah benar.** Bila satu bagian sudah selesai
   dan tesnya lolos, catat hash-nya dan lanjut ke bagian berikutnya.
3. **Bila ada perubahan belum commit dari Antigravity,** tinjau dulu.
   Pertahankan yang sesuai 067, buang yang bertentangan dengan aturan,
   dan catat keputusanmu di laporan.
4. Jangan menulis ulang riwayat git.

## Yang Diminta (sama dengan 067)

### A. Progres Beranda: 3 langkah
- Hapus `isi_kelas` dari langkah progres. Langkah yang tersisa:
  - `isi_prodi_impian`: `prodi_impian` terisi
  - `centang_daftar_periksa`: minimal 1 butir terselesaikan
  - `coba_latihan`: minimal 1 sesi latihan tercatat
- Total 3. Teks progres "X dari 3". Teks baru berstatus DRAF di
  `docs/salinan-teks-lanjut.md`.
- Pengguna baru tampil "0 dari 3".
- Tes: 0/3, 1/3, 2/3, 3/3 sesuai langkah yang terpenuhi. Tes lintas akun:
  progres akun A tidak berubah oleh akun B.
- **Mutasi:** cabut sementara tes atau penjaga langkah `coba_latihan`,
  jalankan, kembalikan. Laporkan hasilnya (gagal lalu lulus).

### B. Bukti visual 360 px
- Bangun web (`npm run build:web` dengan `EXPO_PUBLIC_API_URL` lokal) atau
  jalankan `npx expo start --web`, lalu buka Beranda di lebar 360 px.
- Ambil tiga tangkapan layar: akun kelas 7, kelas 10, dan kelas 12. Setiap
  tangkapan menunjukkan grid, progres, dan kartu "Mulai dari Sini" bila
  tampil.
- Simpan tangkapan di luar repo (mis. `scratchpad/bukti-067/`) dan hanya
  pakai akun uji. **Jangan commit tangkapan layar ke repo.**
- Di laporan, tulis lokasi berkas dan temuan tampilan, termasuk teks
  terpotong atau tumpang tindih. Bila browser tidak bisa dijalankan,
  tulis alasannya.

### C. Mutasi 066
- Cabut sementara filter status verifikasi di `infoPentingLinimasa` atau
  penjaga setaranya, jalankan `info-penting-terverifikasi.test.js`,
  lalu kembalikan. Laporkan hasil gagal lalu lulus.

### D. Konsistensi
- `docs/AGEN-ATURAN-TETAP.md` harus ada. Bila masih bernama
  `AGEN_Aturan-Tetap-LANJUT.md`, ganti namanya dan perbarui tautan yang
  merujuknya.

## Di luar task ini
- Konten baru, termasuk teks "Jenjang Saya" untuk SMP dan kelas 10–11.
  Draf itu belum disetujui.
- Fitur baru, poles warna, atau perubahan Tenggat dan Linimasa selain
  yang diperlukan untuk progres.
- Mengubah status verifikasi konten di database.

## Definition of Done

- [ ] Riwayat 067 yang sudah ada diperiksa; hash commit terkait dicatat
- [ ] Progres 3 langkah; pengguna baru "0 dari 3"; tes lintas akun ada
- [ ] Mutasi progres lulus terbukti (gagal lalu lulus)
- [ ] Mutasi 066 lulus terbukti (gagal lalu lulus)
- [ ] Tiga tangkapan layar 360 px tersimpan di luar repo, lokasinya dilaporkan
- [ ] `docs/AGEN-ATURAN-TETAP.md` ada dan tautannya benar
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` bersih (server dan app)
- [ ] Tidak ada tangkapan layar atau data nyata di repo
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Apa yang sudah ada dari 067 sebelum task ini, dan apa yang kamu lanjutkan
- Hasil tiga skenario progres (0, 1, 2, 3 dari 3)
- Hasil mutasi progres dan mutasi 066
- Lokasi tiga tangkapan layar dan temuan tampilan
- Apakah build web dan tampilan 360 px berhasil diuji, atau alasan gagal
- Keputusan yang kamu ambil sendiri
