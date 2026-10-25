# TASK: LANJUT_086 — Keystore Rilis, Cabut Sesi Akun Bertenggat, dan Preview Landing

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM (26 Oktober):
- Sesi lama di 10 akun bertenggat **dicabut** saat tenggat lewat.
- Keystore rilis **dibuat** sekarang.
- Deadline pengumpulan: **29 Oktober 2026**. Tenggat 10 akun: **29 Oktober 2026 pukul 20.07.38 WIB**.

Batasan yang tetap berlaku:
- **Tidak ada deploy, unggah ke hosting, push, `eas build`, atau `eas submit`.**
- Tidak mengirim email. Tidak memanggil OpenRouter.
- Tidak menambah paket baru di `package.json` mana pun.
- `ai_aktif` tetap `0`. `event_sekolah_aktif` tetap `0`. Dicek di database.
- Tes memakai DB sendiri. Jangan memakai `lanjut_test`, `lanjut_test_083f`, atau `lanjut_test_085`
  yang dipakai task lain. Buat DB baru (misalnya `lanjut_test_086`) dan laporkan namanya.
- Kunci, sandi keystore, dan Google secret **tidak dicetak, tidak masuk repo, tidak masuk APK**.

## Konteks

APK yang sekarang (`lanjut-release-084.apk`) ditandatangani keystore debug. Kalau
dibagikan, update berikutnya tidak bisa dipasang di atas versi ini. Keystore rilis
harus dibuat sekali, dipakai untuk semua versi, dan dicadangkan di luar repo.

Dari laporan 084: 10 akun lama bertenggat tetap punya sesi aktif sampai kedaluwarsa
(90 hari). Keputusan PM: sesi itu dicabut saat tenggat lewat.

## Yang Diminta

### A. Keystore rilis
1. Buat keystore rilis dengan `keytool` di folder **di luar repo**, misalnya
   `C:\Users\Public\lj\keystore\`. Nama alias: `lanjut-rilis`. Algoritma RSA 2048,
   masa berlaku 30 tahun.
2. Sandi keystore dan alias dibuat acak. **Jangan dicetak di laporan.** Simpan di
   berkas `keystore.properties` di folder yang sama dengan keystore, dengan izin
   hanya untuk pengguna sendiri.
3. Hitung SHA-256 sertifikat dan laporkan. Jangan laporkan sandinya.
4. Konfigurasi `signingConfigs.release` di `LANJUT_App/android/app/build.gradle`
   membaca `keystore.properties` dari luar repo (lewat variabel lingkungan
   `LANJUT_KEYSTORE_PROPS`). Kalau berkas tidak ada, build rilis **gagal**, tidak
   jatuh ke debug key.
5. Tambahkan tes atau pemeriksaan skrip yang membuktikan build rilis tidak memakai
   `debug.keystore`.

### B. APK rilis bertanda tangan
6. Build APK rilis dengan `./gradlew assembleRelease`. `EXPO_PUBLIC_API_URL` diisi
   dengan nilai dari PM, **bila sudah ada**. Kalau belum, pakai placeholder
   `https://BELUM-DIISI.invalid` dan tandai APK sebagai **belum siap dibagikan**.
7. `versionName` = `1.0` untuk build ini. `versionCode` = `1`. Catat keduanya.
8. Verifikasi tanda tangan dengan `apksigner verify --print-certs`. Laporkan
   SHA-256 sertifikat dan SHA-256 APK. Pastikan sertifikat adalah `CN=` milik
   keystore rilis, bukan `Android Debug`.
9. Simpan APK di `scratchpad/apk-rilis-086/`, bukan di repo.
10. Ulangi pencarian rahasia seperti 084: `SMTP`, `GOOGLE_CLIENT_SECRET`, `sk-or-`,
    dan nilai `.env` server. Laporkan hasilnya.

### C. Cabut sesi akun bertenggat
11. Buat skrip `server/tools/cabut-sesi-tenggat.js`. Skrip ini:
    - hanya mengambil akun dengan `batas_verifikasi` yang sudah lewat **dan**
      `email_terverifikasi = 0`;
    - menghapus semua sesi milik akun itu;
    - **tidak** mengubah kolom lain, tidak mengirim email, tidak menghapus akun;
    - mencetak jumlah akun dan jumlah sesi yang dicabut. Tidak mencetak ID akun
      yang tidak perlu.
12. Skrip punya mode `--simulasi` (hanya menghitung, tidak menghapus). Mode
    simulasi adalah default. Mode sungguhan hanya jalan dengan `--jalankan`.
13. Tes skrip minimal 4 kasus:
    - akun bertenggat lewat dicabut sesinya;
    - akun dalam tenggat tidak terpengaruh;
    - akun terverifikasi tidak terpengaruh;
    - mode simulasi tidak menghapus apa pun.
14. Jalankan skrip dalam mode simulasi di `lanjut_test_086` dan laporkan jumlahnya.
    **Jangan jalankan mode `--jalankan`.** PM yang menjalankannya setelah
    29 Oktober 20.07 WIB.

### D. Preview landing (tanpa merge)
15. Dari branch `lanjut-083f`, jalankan `npm run build` di `landing/`.
16. Jalankan preview lokal (`npm run preview`) dan ambil screenshot keempat halaman
    di 360 px dan desktop. Simpan di `scratchpad/preview-086/`.
17. Simpan salinan `dist/` sebagai zip di `scratchpad/preview-086/landing-dist.zip`,
    dengan SHA-256.
18. **Jangan merge** `lanjut-083f` ke `main`. Keputusan merge di PM.

## Di luar task ini
- Mengisi URL backend final. Itu menunggu server sekolah atau VPS.
- Mengunggah APK atau landing ke hosting.
- Menjalankan skrip cabut sesi dengan `--jalankan`.
- Mengirim email pemberitahuan ke pemilik akun.
- Mengubah kebijakan privasi.

## Definition of Done

- [ ] Keystore rilis dibuat di luar repo; SHA-256 sertifikat dilaporkan; sandi tidak dicetak
- [ ] Build rilis gagal bila `keystore.properties` tidak ada; ada pemeriksaan
- [ ] `apksigner verify` lulus; sertifikat bukan `Android Debug`
- [ ] APK rilis `versionName` 1.0, `versionCode` 1; SHA-256 APK dilaporkan
- [ ] Pencarian rahasia di APK bersih; hasil dilaporkan
- [ ] Skrip cabut sesi ada; tes 4 kasus lulus
- [ ] Simulasi dijalankan di DB tes; jumlah dilaporkan; mode `--jalankan` tidak dijalankan
- [ ] Preview landing 4 halaman di 360 px dan desktop; zip dan SHA-256 dilaporkan
- [ ] `lanjut-083f` tidak di-merge
- [ ] `npm test` (server, DB tes baru), `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] `ai_aktif = 0` dan `event_sekolah_aktif = 0` (dicek di database)
- [ ] Commit kecil, pesan commit menyebut `LANJUT_086`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Alias keystore, masa berlaku, SHA-256 sertifikat (tanpa sandi)
- Hasil `apksigner verify` dan SHA-256 APK
- Jumlah akun dan sesi dari simulasi
- Hasil tes skrip dan tiga mutasi (hapus cek tenggat, izinkan hapus akun dalam tenggat, jalankan tanpa `--simulasi`)
- Lokasi preview dan zip landing
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta sandi keystore, kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix`, dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB tes. Jangan menyentuh `lanjut_test` atau akun nyata.
- Tangkapan layar dan APK tidak masuk repo.
