# TASK: LANJUT_083d — Akun Lama dengan Email Belum Terverifikasi: Ambil Alih Lewat Pemilik Asli

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM: **pilihan (a)**.

Batasan yang tetap berlaku:
- Tidak ada deploy, push, `eas build`, atau perubahan firewall.
- Tidak menambah paket baru. Tidak menaikkan versi kebijakan privasi.
- Tidak mengirim email sungguhan. Semua tes memakai pengirim tiruan.
- Saklar `ai_aktif` tetap `0`. `event_sekolah_aktif` tetap `0`.
- Tidak menghapus akun mana pun, dan tidak mengubah data akun selain yang disebut di bawah.

## Konteks

Dari laporan 083c: 10 akun lama non-uji punya email yang belum terverifikasi.
Akun-akun itu masih bisa masuk lewat kode email atau Google. Pemilik email asli
yang masuk lewat kode atau Google bisa berada di akun yang dibuat orang lain
dengan email itu, dan orang itu masih tahu kata sandinya.

Keputusan PM (a): ketika pemilik email membuktikan kepemilikan lewat kode email
atau Google, email itu ditandai terverifikasi, dan kata sandi lama dicabut.
Pengguna harus membuat kata sandi baru sebelum bisa masuk dengan kata sandi lagi.

## Yang Diminta

### A. Login kode email untuk akun belum terverifikasi
1. Saat `POST /auth/otp/verifikasi` (login kode email) berhasil untuk akun dengan
   `email_terverifikasi = 0`:
   - set `email_terverifikasi = 1`;
   - cabut kata sandi lama (kolom hash kata sandi dikosongkan atau diberi tanda
     `wajib_buat_sandi = 1`, sesuai struktur yang sudah ada);
   - cabut semua sesi lain milik akun itu;
   - kembalikan sesi baru dengan tanda `perlu_sandi_baru: true`.
2. Login kata sandi untuk akun dengan `wajib_buat_sandi = 1` ditolak dengan galat
   `SANDI_PERLU_DIBUAT` dan pesan DRAF: "Masuk dengan kode email dulu, lalu buat
   kata sandi baru."
3. Akun dengan `email_terverifikasi = 1` tidak terpengaruh.

### B. Login Google untuk akun belum terverifikasi
4. Saat `POST /auth/google` berhasil dan email Google cocok dengan akun yang
   `email_terverifikasi = 0`, perlakukan seperti poin A.1 dan A.2.
5. Akun baru dari Google tidak berubah (sudah terverifikasi).

### C. Layar buat kata sandi baru (app)
6. Setelah masuk dengan `perlu_sandi_baru: true`, app membuka layar "Buat kata
   sandi baru". Layar ini wajib dilewati sebelum Beranda. Tidak ada tombol lewati.
7. Layar memakai aturan kata sandi yang sudah ada di daftar.
8. Endpoint `POST /auth/sandi/buat` menerima kata sandi baru untuk sesi yang
   sedang aktif dan hanya berlaku bila `wajib_buat_sandi = 1`. Setelah berhasil,
   tanda dicabut.
9. Teks layar dan pesan galat berstatus DRAF di salinan teks dan lembar review.

### D. Akun lama yang tercatat
10. Daftar 10 akun non-uji dicatat di laporan (ID, dan jumlah yang terdampak).
    Tidak mengubah data mereka di luar aturan di atas. Akun-akun ini tidak
    dihapus.
11. Akun uji `uji…` dan `demo_` tetap seperti sekarang.

### E. Tes dan mutasi
12. Tes server minimal 8 kasus: login kode email menandai terverifikasi dan
    mencabut sandi; sesi lain dicabut; login kata sandi ditolak dengan
    `SANDI_PERLU_DIBUAT`; login Google untuk akun belum terverifikasi sama; akun
    terverifikasi tidak terpengaruh; buat sandi baru menghapus tanda; buat sandi
    tanpa sesi ditolak; sandi baru tidak bisa dipakai bila tanda tidak aktif.
13. Mutasi, gagal lalu lulus: (a) lewati pencabutan sandi lama, (b) lewati
    pemeriksaan `wajib_buat_sandi` di login kata sandi, (c) izinkan buat sandi
    tanpa sesi.
14. Tes app: layar "Buat kata sandi baru" wajib, tanpa tombol lewati (satu tes
    kode dan satu bukti 360 px).

### F. Bukti
15. Bukti tidak ada email sungguhan terkirim (0 koneksi keluar).
16. Bukti 360 px untuk layar baru, di `scratchpad/bukti-083d/`.

## Di luar task ini
- Mengirim email sungguhan.
- Menghapus atau memblokir akun lama.
- Mengubah teks kebijakan privasi atau versinya.
- Mengubah saklar.

## Definition of Done

- [ ] Login kode email menandai email terverifikasi dan mencabut sandi lama; ada tes
- [ ] Login Google untuk akun belum terverifikasi berperilaku sama; ada tes
- [ ] Login kata sandi ditolak dengan `SANDI_PERLU_DIBUAT` untuk akun tanda aktif; ada tes
- [ ] Sesi lain dicabut; ada tes
- [ ] Layar "Buat kata sandi baru" wajib dan tidak bisa dilewati; ada tes
- [ ] Tes server minimal 8 kasus lulus
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Daftar 10 akun dilaporkan; tidak ada akun dihapus atau diblokir
- [ ] Tidak ada email sungguhan terkirim; dibuktikan
- [ ] `ai_aktif = 0` dan `event_sekolah_aktif = 0` (dicek di database)
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] Commit kecil, pesan commit menyebut `LANJUT_083d`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar 10 akun (ID) dan jumlah yang terdampak
- Hasil tes dan tiga mutasi
- Nilai saklar dari database
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tangkapan layar tidak masuk repo.
