# TASK: Build APK Android untuk LANJUT_App

## Konteks

Auth (LANJUT_001) sudah selesai dan jalan di web (`npm run web`, port 8081). Sekarang saatnya bikin APK yang bisa diinstal di HP Android asli — bukan cuma jalan di browser/Expo Go.

**Constraint penting:** Tidak pakai Android Studio/emulator lokal (sesuai preferensi tim — device testing pakai HP fisik). Gunakan **EAS Build** (layanan cloud Expo, free tier cukup untuk build APK preview) supaya tidak perlu setup Android SDK lokal.

**Jangan ubah apapun di `LANJUT_App/server/`.**

## ⚠️ Masalah yang WAJIB diselesaikan dulu: Backend URL untuk device fisik

Saat ini base URL API kemungkinan `http://localhost:4000/api/v1` (dipakai untuk testing web di komputer yang sama). **Ini tidak akan jalan di HP fisik** — `localhost` di HP merujuk ke HP itu sendiri, bukan ke komputer server.

### Langkah 0 — Cari & catat base URL yang benar

1. Cari di mana `API_BASE_URL` (atau nama env var sejenis) didefinisikan di `LANJUT_App/` (kemungkinan `.env`, `app.config.js`, atau `src/services/client.ts`).
2. Cari LAN IP komputer yang menjalankan backend:
   - Windows: `ipconfig` → cari `IPv4 Address` (biasanya `192.168.x.x`)
3. Cek apakah backend (`LANJUT_App/server/`) listen di `0.0.0.0` (bisa diakses dari device lain) atau cuma `127.0.0.1`/`localhost` (cuma bisa diakses dari komputer itu sendiri).
   - Kalau cuma `localhost` — **laporkan ke saya, jangan ubah sendiri di server/**. Ini kemungkinan perlu diubah di `server/src/index.js` atau file entry point (`app.listen(PORT, '0.0.0.0', ...)`), tapi karena menyentuh `server/`, konfirmasi dulu.
4. Cek firewall Windows tidak memblokir port 4000 untuk koneksi masuk dari jaringan lokal (kalau perlu, laporkan langkah yang dibutuhkan, tidak perlu dieksekusi sendiri kalau butuh admin).
5. Buat cara supaya base URL API **bisa diganti tanpa rebuild kode** untuk keperluan testing — misalnya lewat environment variable `EXPO_PUBLIC_API_URL` yang dibaca saat build. Untuk build APK preview ini, set ke `http://[LAN-IP-komputer]:4000/api/v1`.

**Catatan:** CORS tidak relevan untuk APK native (CORS cuma berlaku untuk request dari browser). Jangan sentuh konfigurasi CORS di backend untuk task ini.

## Langkah 1 — Cek konfigurasi Expo/EAS yang sudah ada

1. Cek `LANJUT_App/app.json` atau `app.config.js`:
   - `android.package` sudah didefinisikan? (format `com.edilakso.lanjut` atau sejenis — kalau belum ada, buat yang masuk akal)
   - `version` dan `android.versionCode` ada?
2. Cek apakah `eas.json` sudah ada di `LANJUT_App/`. Kalau belum, akan dibuat di Langkah 2.
3. Cek apakah `eas-cli` sudah terinstal (`npx eas --version`). Kalau belum: `npm install -g eas-cli` atau pakai `npx eas-cli`.
4. Cek apakah sudah pernah login ke akun Expo (`eas whoami`). **Kalau belum login dan tidak ada kredensial tersedia, STOP dan laporkan ke saya** — perlu akun Expo (bisa dibuat gratis, tapi butuh keputusan pakai akun siapa untuk proyek ini).

## Langkah 2 — Konfigurasi `eas.json`

Buat/update `LANJUT_App/eas.json` dengan profile `preview` yang menghasilkan APK (bukan AAB, karena AAB tidak bisa diinstal langsung — cuma untuk submit ke Play Store):

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      },
      "env": {
        "EXPO_PUBLIC_API_URL": "http://[LAN-IP-komputer]:4000/api/v1"
      }
    }
  }
}
```

Sesuaikan struktur `env` dengan cara `API_BASE_URL` sebenarnya dibaca di kode (hasil Langkah 0).

## Langkah 3 — Jalankan build

```bash
cd LANJUT_App
eas build --platform android --profile preview
```

- Build berjalan di cloud Expo (butuh koneksi internet, tidak butuh Android SDK lokal).
- Proses biasanya 10-20 menit.
- Setelah selesai, EAS memberi link download `.apk`.
- **Kalau build gagal**, catat pesan error lengkap di laporan akhir — jangan coba tebak-tebak fix tanpa pesan error yang jelas dulu.

## Langkah 4 — Download & siapkan untuk instalasi

1. Download APK dari link yang diberikan EAS.
2. Simpan di `LANJUT_App/build/lanjut-preview.apk` (buat folder `build/` kalau belum ada, tambahkan ke `.gitignore` — jangan commit file APK-nya sendiri ke git, terlalu besar).
3. Catat link download EAS di laporan akhir (link ini biasanya valid untuk beberapa waktu, cukup untuk kamu download manual ke HP).

## Langkah 5 — Instruksi instalasi untuk testing manual (BUKAN kamu yang eksekusi, ini untuk Khalifa)

Tulis instruksi singkat di laporan akhir untuk Khalifa:
- Cara transfer APK ke HP (download langsung dari link EAS di browser HP, atau transfer file)
- HP harus di jaringan WiFi yang sama dengan komputer yang menjalankan backend (karena pakai LAN IP)
- HP harus mengizinkan instal dari sumber tidak dikenal (unknown sources) — ini pengaturan Android standar untuk APK di luar Play Store

## Definition of Done

- [ ] Base URL API sudah pakai LAN IP (bukan localhost), lewat env var yang bisa diganti tanpa rebuild
- [ ] Backend dipastikan bisa diakses dari device lain di jaringan yang sama (atau dilaporkan kalau tidak bisa)
- [ ] `eas.json` dikonfigurasi dengan profile `preview` → APK
- [ ] Build EAS berhasil, APK ter-download
- [ ] APK disimpan di `LANJUT_App/build/` (masuk `.gitignore`)
- [ ] Tidak ada perubahan di `LANJUT_App/server/` tanpa laporan
- [ ] Instruksi instalasi manual untuk Khalifa ditulis jelas
- [ ] Commit terpisah untuk config (`eas.json`, `.gitignore`, env handling) — bukan APK-nya

## Laporkan di akhir

- LAN IP yang dipakai + apakah backend perlu diubah supaya bisa diakses dari network (dan apa persisnya perubahan yang dibutuhkan, tanpa mengeksekusinya kalau menyentuh `server/`)
- Link download APK dari EAS
- Hasil build: sukses/gagal, kalau gagal sertakan pesan error lengkap
- Akun Expo yang dipakai untuk build (atau blocker kalau belum ada akun)
- Nama file yang dibuat/diubah + commit hash
- Apakah kamu sempat coba instal & test di device fisik sendiri (kalau ada HP Android tersedia di environment kerja) — kalau tidak, itu wajar, tinggal serahkan ke Khalifa untuk uji manual
