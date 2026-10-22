# TASK: LANJUT_084 — Tenggat Akun Lama, Catat Pelanggaran Batas AI, dan Build APK Lokal

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM (22 Oktober):
- 10 akun lama non-uji: **tandai dengan batas waktu 7 hari**.
- 77 panggilan OpenRouter di uji chatbot: **catat sebagai pelanggaran batas**.
- Hosting backend publik: **cloud**. Penyedia dan akun belum dipilih PM. Itu
  bukan bagian task ini.
- Android SDK: **boleh dipasang di laptop**.

Batasan yang tetap berlaku:
- Tidak ada deploy, push, `eas build`, `eas submit`, atau perubahan firewall.
- Tidak mengirim email sungguhan. Tidak ada koneksi ke penyedia hosting.
- Tidak menambah paket baru di `LANJUT_App/package.json` atau `server/package.json`.
- Tidak menaikkan versi kebijakan privasi. Teks baru berstatus DRAF.
- `ai_aktif` tetap `0`. `event_sekolah_aktif` tetap `0`. Dicek di database.
- Tidak menghapus atau memblokir akun mana pun tanpa aturan di bagian A.
- Kunci OpenRouter, sandi SMTP, dan Google secret tidak dicetak atau masuk APK.

## Bagian A — Tenggat untuk 10 akun lama

1. Tambah kolom `batas_verifikasi` (DATETIME, nullable) lewat migrasi baru
   (nomor berikutnya). Isi untuk 10 akun non-uji yang `email_terverifikasi = 0`
   dan punya email: `NOW() + 7 hari`. Ambil daftarnya dari query, bukan dari
   laporan lama. Catat jumlah dan ID di laporan.
2. Login kata sandi untuk akun yang `batas_verifikasi` sudah lewat dan
   `email_terverifikasi = 0` ditolak dengan galat `EMAIL_BELUM_DIVERIFIKASI`
   dan pesan DRAF: "Akun ini perlu diverifikasi dulu. Masuk dengan kode email
   untuk melanjutkan." Tebakan kata sandi yang salah tetap `KREDENSIAL_SALAH`.
3. Login kode email dan Google tidak berubah. Pemilik yang masuk lewat kode
   atau Google tetap mengambil alih seperti 083d.
4. Akun yang masih dalam tenggat tidak berubah.
5. **Tidak ada email yang dikirim dari task ini.** Pemberitahuan ke pemilik
   adalah tugas PM. Task ini hanya menyiapkan daftar.
6. Teks pesan dan layar app berstatus DRAF di salinan teks dan lembar review.

## Bagian B — Catat pelanggaran batas AI

7. Tambah bagian "Pelanggaran batas" di laporan uji chatbot
   (`docs/uji-rilis/uji-chatbot-ai-2026-10-15.md`). Isinya: 77 panggilan OpenRouter
   tercatat, izin 082 hanya 2, dan tanggal serta waktu sesi uji.
8. Hitung jumlah panggilan dari log server (`[ngobrol]` atau log OpenRouter),
   bukan dari ingatan. Kalau log tidak cukup, tulis "tidak bisa dihitung ulang"
   dan jangan menebak angka.
9. Jangan mengubah kode chatbot di bagian ini. Batas dan izin uji yang berlaku
   sekarang tetap sama.

## Bagian C — Build APK lokal (rilis)

10. Pasang Android SDK di laptop dengan: Platform 36, Build-Tools 36.0.0, dan
    NDK 27.1.12297006. Catat versi yang terpasang.
11. Build dengan `npx expo prebuild --platform android --clean`, lalu
    `./gradlew assembleRelease` di `LANJUT_App/android`.
    `EXPO_PUBLIC_API_URL` diisi dengan placeholder `https://BELUM-DIISI.invalid`,
    karena URL hosting belum ada. Laporkan bahwa APK ini belum bisa dipakai
    untuk pengumpulan sampai URL diisi.
12. Simpan APK di `scratchpad/apk-kumpul/`. Laporkan ukuran dan SHA-256.
13. Pastikan APK tidak memuat `OPENROUTER`, `SMTP`, `GOOGLE_CLIENT_SECRET`,
    atau nilai dari `.env` server. Cari di hasil dekompilasi `classes.dex` dan
    `assets/`, lalu catat hasilnya.
14. Pastikan keystore rilis tidak masuk repo. Kalau keystore belum ada, pakai
    keystore debug untuk build uji dan laporkan itu sebagai batasan.

## Di luar task ini
- Memilih penyedia hosting atau membuat akunnya.
- Mengirim email pemberitahuan ke pemilik akun.
- Mengubah kebijakan privasi.
- Membuat fitur 3D atau MissionClass.
- Mengubah saklar.

## Definition of Done

- [ ] Migrasi `batas_verifikasi` ada, dan 10 akun diisi tenggatnya; ada tes
- [ ] Login kata sandi setelah tenggat ditolak `EMAIL_BELUM_DIVERIFIKASI`; ada tes
- [ ] Login kode email dan Google tetap berfungsi setelah tenggat; ada tes
- [ ] Akun dalam tenggat tidak berubah; ada tes
- [ ] Tidak ada email terkirim; dibuktikan (0 koneksi keluar)
- [ ] Laporan uji chatbot berisi bagian pelanggaran batas dengan angka dari log
- [ ] Android SDK terpasang dan versinya dicatat
- [ ] APK rilis dibuild lokal; ukuran dan SHA-256 dilaporkan
- [ ] APK bebas rahasia; hasil pencarian dilaporkan
- [ ] `npm test` (server), `npm run periksa-sql`, `npx tsc --noEmit` (app) lulus
- [ ] `ai_aktif = 0` dan `event_sekolah_aktif = 0` (dicek di database)
- [ ] Commit kecil, pesan commit menyebut `LANJUT_084`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar 10 akun dengan ID dan tenggat
- Hasil tes dan tiga mutasi (hapus cek tenggat, hapus migrasi, izinkan login
  kata sandi setelah tenggat)
- Jumlah panggilan OpenRouter dari log, atau "tidak bisa dihitung ulang"
- Versi Android SDK, ukuran dan SHA-256 APK, hasil pencarian rahasia
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tangkapan layar dan APK tidak masuk repo.
