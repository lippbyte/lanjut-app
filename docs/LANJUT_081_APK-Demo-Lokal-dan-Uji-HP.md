# TASK: LANJUT_081 — APK Demo Lokal untuk Uji di HP (Tanpa Deploy)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM: **tidak ada deploy.** Uji
dilakukan dengan server yang berjalan di komputer PM, dan HP terhubung ke
jaringan Wi-Fi yang sama. Tidak ada hosting, tidak ada push, tidak ada domain.

Batasan keamanan yang tetap berlaku:
- Tidak ada perubahan firewall. Bila port 4000 perlu dibuka, PM yang membukanya.
- Tidak mengunggah kode ke layanan luar. Build dilakukan **lokal** dengan Gradle
  di komputer. Jangan memakai `eas build`, karena itu mengirim kode ke server Expo.
  Bila build lokal tidak memungkinkan, berhenti dan laporkan. Jangan beralih ke
  layanan luar tanpa izin tertulis PM.
- Tidak memanggil OpenRouter. Tidak mencetak kunci API.
- Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`. Mikrofon Ngobrol mati
  (080b).
- Tidak menaikkan versi kebijakan privasi. Tidak menambah paket baru.
- Akun uji hanya di DB lokal `lanjut_test`, dengan awalan `demo_`. Tidak ada akun
  siswa sungguhan.

## Konteks

PM ingin APK untuk demo dan uji di HP. Untuk demo, cukup APK yang:
- menghubungi server di komputer PM melalui IP LAN, misalnya `http://192.168.x.x:4000`;
- memakai akun `demo_` yang sudah disiapkan;
- tidak memakai AI, event, atau mikrofon.

Catatan dari 080: `eas.json` memakai placeholder `GANTI-DOMAIN`. Untuk demo,
placeholder itu diganti dengan IP LAN lewat variabel build, bukan dengan
mengubah `eas.json` yang dipakai untuk deploy.

## Yang Diminta

### A. Persiapan
1. Catat IP LAN komputer dan versi Java, Android SDK, dan Gradle yang terpasang.
   Jika ada yang belum terpasang, laporkan. Jangan memasang paket baru tanpa izin.
2. Pastikan server berjalan di port 4000 dan bisa diakses dari IP LAN. Tes dari
   komputer sendiri dengan `curl` ke IP LAN. Jika tidak bisa diakses, laporkan
   apakah penyebabnya firewall. Jangan mengubah firewall.
3. Siapkan akun `demo_` di DB lokal untuk tiga jenjang: SMP (kelas 8), SMA/SMK
   kelas 11, dan kelas 12. Catat ID dan kelasnya. Jangan mencetak token.

### B. Konfigurasi build demo
4. Atur variabel build: `EXPO_PUBLIC_API_URL=http://<IP LAN>:4000/api/v1`.
   Jangan mengubah `eas.json` yang berlaku untuk rilis.
5. Izinkan HTTP ke IP LAN untuk Android. Gunakan konfigurasi `usesCleartextTraffic`
   yang hanya berlaku untuk build demo, bukan untuk semua build.
6. Pastikan `ai_aktif`, `event_sekolah_aktif`, dan mikrofon mati di build demo.
7. Tes: build demo tidak menyertakan URL `GANTI-DOMAIN` dan tidak menyertakan
   kunci API.

### C. Build APK lokal
8. Build APK dengan Gradle secara lokal (perintah `expo prebuild` untuk Android,
   lalu `gradlew assembleRelease` atau `assembleDebug`). Catat perintah yang
   dipakai.
9. Gunakan keystore debug untuk demo. Jangan membuat keystore rilis di task ini.
10. Simpan APK di folder `scratchpad/apk-demo/`, bukan di repo.
11. Catat ukuran dan hash SHA-256 APK.

### D. Pemeriksaan sebelum dikirim ke HP
12. Di komputer, jalankan `npm test` (server), `npm run periksa-sql`, dan
    `npx tsc --noEmit`. Semua harus lulus.
13. Lakukan pemeriksaan jaringan: pastikan APK tidak menghubungi alamat selain
    IP LAN dan `localhost`. Catat hasilnya.

### E. Panduan uji untuk PM
14. Tulis `docs/uji-rilis/panduan-demo-hp.md` (DRAF), berisi:
    - cara memasang APK di HP Android (izinkan pemasangan dari sumber tidak dikenal);
    - syarat: HP dan komputer di Wi-Fi yang sama, server sudah berjalan;
    - akun `demo_` yang dipakai untuk setiap jenjang;
    - urutan demo yang disarankan: login, Beranda, Jalur Saya, Eksplorasi Kampus,
      Pilih Mapel (kelas 12 dan 7), Latihan, Ngobrol tanpa AI;
    - hal yang sengaja tidak ada: AI, event sekolah, mikrofon, dan konten
      terverifikasi yang masih sedikit;
    - apa yang dilakukan bila aplikasi tidak bisa tersambung.
15. Jangan mencatat IP LAN di repo. Tulis sebagai `<IP-LAN-PM>` di panduan.

## Di luar task ini
- Deploy, hosting, atau domain publik.
- `eas build`, `eas submit`, atau unggah apa pun ke layanan luar.
- Keystore rilis atau penandatanganan untuk toko aplikasi.
- Mengubah kebijakan privasi, saklar, atau konten terverifikasi.
- Memperbaiki temuan dari uji HP (itu task berikutnya).

## Definition of Done

- [ ] IP LAN, versi toolchain, dan hasil uji `curl` dari IP LAN dilaporkan
- [ ] Akun `demo_` untuk tiga jenjang ada di `lanjut_test`; ID dan kelas dilaporkan
- [ ] APK demo terbentuk secara lokal; ukuran dan SHA-256 dilaporkan
- [ ] Build demo tidak memuat `GANTI-DOMAIN` atau kunci API
- [ ] AI, event, dan mikrofon mati di build demo; dibuktikan
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] Panduan `panduan-demo-hp.md` ada; IP LAN tidak tertulis di repo
- [ ] Tidak ada `eas`, unggah, atau panggilan ke luar localhost/LAN; dibuktikan
- [ ] Tidak ada perubahan firewall
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` bernilai `0` (dicek di database)
- [ ] Commit kecil, pesan commit menyebut `LANJUT_081` (hanya perubahan konfigurasi dan dokumen)

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Perintah build lengkap yang dipakai
- Hasil `curl` dari IP LAN, atau penyebab bila gagal
- Ukuran dan SHA-256 APK
- Hasil pemeriksaan jaringan APK
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API. Kunci OpenRouter hanya di `.env` lokal.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tangkapan layar tidak masuk repo.
