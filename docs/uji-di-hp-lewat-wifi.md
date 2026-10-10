# Panduan Uji Web di HP Fisik Lewat Wi-Fi Lokal

> Disusun pada LANJUT_063 (10 Oktober 2026).  
> Panduan langkah demi langkah untuk menguji aplikasi Web SPA / PWA LANJUT di perangkat ponsel fisik (Android & iOS) melalui jaringan Wi-Fi lokal yang sama tanpa server produksi atau layanan cloud luar.

---

## 1. Prinsip Keamanan & Prasyarat
- **HANYA Jaringan Wi-Fi Pribadi/Lokal:** Jangan pernah menjalankan pengujian ini di jaringan Wi-Fi publik terbuka (misalnya kafe, hotel, atau hotspot tanpa enkripsi WPA2/WPA3).
- **Mode Non-Produksi:** Pengujian ini menggunakan mode `development` (bukan `NODE_ENV=production`) agar backend Express mengizinkan origin HTTP LAN (`http://<IP-LAN>:5500`) tanpa memaksakan protokol HTTPS wajib produksi. **JANGAN gunakan berkas `.env.production`** untuk pengujian lokal ini.
- **Firewall Sementara:** Port yang dibuka di firewall komputer hanya untuk profil jaringan *Private* dan **wajib dicabut kembali** segera setelah pengujian selesai.
- **Tanpa Panggilan Luar:** Seluruh komunikasi berjalan lokal antara ponsel dan komputer pengembangan.

---

## 2. Langkah Pengujian Langkah Demi Langkah

### Langkah 1: Dapatkan Alamat IP LAN Komputer
Buka terminal PowerShell pada komputer pengembangan:
```powershell
ipconfig
```
Cari bagian **Wireless LAN adapter Wi-Fi** dan catat nilai **IPv4 Address** (misalnya `192.168.1.50` atau `10.209.116.58`).  
Pastikan HP Anda terhubung ke jaringan Wi-Fi yang sama dengan komputer ini.

*(Catatan: Anda juga bisa menjalankan `node server/tools/layani-web.js --lan` untuk melihat IP LAN yang terdeteksi otomatis).*

---

### Langkah 2: Bangun Bundel Web dengan Alamat API LAN
Di direktori `LANJUT_App/`, jalankan perintah build dengan menyuntikkan `EXPO_PUBLIC_API_URL` mengarah ke port API komputer Anda (port 4000):

**PowerShell (Windows):**
```powershell
$env:EXPO_PUBLIC_API_URL="http://<IP-LAN>:4000/api/v1"
npm run build:web
```
*(Ganti `<IP-LAN>` dengan alamat IP komputer Anda dari Langkah 1, contoh: `http://192.168.1.50:4000/api/v1`).*

Proses ini mengompilasi bundel statis ke `LANJUT_App/dist/` dengan alamat API yang dapat dijangkau oleh peramban di HP Anda.

---

### Langkah 3: Jalankan Server API Backend
Buka terminal baru di direktori `LANJUT_App/server/`.  
Pastikan variabel lingkungan `CORS_ORIGINS` memuat origin web HP Anda (`http://<IP-LAN>:5500`):

**PowerShell (Windows):**
```powershell
$env:PORT="4000"
$env:NODE_ENV="development"
$env:CORS_ORIGINS="http://localhost:5500,http://<IP-LAN>:5500"
npm start
```

Periksa terminal untuk memastikan server menyala:
```text
[server] LANJUT API berjalan di port 4000 (development)
```

---

### Langkah 4: Jalankan Server Web Statis dalam Mode LAN
Buka terminal terpisah di direktori `LANJUT_App/server/`:
```powershell
node tools/layani-web.js --lan
```

Keluaran terminal akan menampilkan informasi akses:
```text
=======================================================
[layani-web] MODE LAN AKTIF — mendengarkan di 0.0.0.0:5500
[PERINGATAN] Server terbuka untuk perangkat di jaringan yang sama.
Gunakan HANYA di Wi-Fi / jaringan pribadi yang tepercaya.
-------------------------------------------------------
Akses dari HP (Chrome / Safari):
  http://<IP-LAN>:5500
Akses lokal dari komputer ini:
  http://localhost:5500
Melayani berkas dari: .../LANJUT_App/dist
=======================================================
```

---

### Langkah 5: Izinkan Port di Windows Firewall (Jaringan Private Saja)
Agar HP dapat menghubungi port 4000 (API) dan port 5500 (Web), Windows Defender Firewall perlu mengizinkan koneksi masuk (*Inbound*) untuk jaringan *Private*.

**Buka PowerShell sebagai Administrator** dan jalankan:
```powershell
# Buka port 4000 (API) dan 5500 (Web SPA) untuk profil Private saja
New-NetFirewallRule -DisplayName "LANJUT-Dev-API-4000" -Direction Inbound -LocalPort 4000 -Protocol TCP -Action Allow -Profile Private
New-NetFirewallRule -DisplayName "LANJUT-Dev-Web-5500" -Direction Inbound -LocalPort 5500 -Protocol TCP -Action Allow -Profile Private
```

⚠️ **PENTING — Cabut Aturan Setelah Selesai Pengujian:**  
Setelah sesi pengujian selesai, segera hapus aturan firewall ini dengan menjalankan:
```powershell
Remove-NetFirewallRule -DisplayName "LANJUT-Dev-API-4000"
Remove-NetFirewallRule -DisplayName "LANJUT-Dev-Web-5500"
```

---

### Langkah 6: Buka Aplikasi di HP (Android & iOS)
1. Buka peramban di HP:
   - **Android:** Buka aplikasi **Google Chrome**.
   - **iPhone / iPad:** Buka aplikasi **Safari**.
2. Masukkan alamat URL:
   `http://<IP-LAN>:5500` (contoh: `http://192.168.1.50:5500`).
3. Aplikasi LANJUT akan langsung termuat.

---

## 3. Daftar Periksa Uji di HP Fisik

Lakukan pengujian berikut secara berurutan di perangkat fisik:

1. [ ] **Pendaftaran & Masuk:**
   - Buka `/daftar`, masukkan nama pengguna baru dan kata sandi.
   - Pilih jenjang dan kelas (mis. Kelas 10 SMA).
   - Centang persetujuan kebijakan privasi, lalu tekan tombol Daftar.
   - Pastikan masuk ke halaman beranda tanpa kendala.
2. [ ] **Latihan & Pemilih Keyakinan:**
   - Buat satu kartu latihan baru di Latihan.
   - Mulai sesi latihan kartu.
   - Uji tombol pilihan keyakinan: **Yakin**, **Ragu**, **Tebak**. Pastikan ukuran tombol nyaman disentuh dengan jempol dan tidak meleset.
   - Buka jawaban dan lakukan evaluasi diri.
3. [ ] **Level-In:**
   - Buka menu `/level-in`.
   - Pastikan visualisasi kartu kompetensi dan status mapel tampil proporsional di layar ponsel.
4. [ ] **Arsip & Pemilih Berkas Mobile:**
   - Buka menu `/arsip`.
   - Buka halaman `/arsip-modul-unggah`.
   - Tekan tombol unggah berkas: pastikan sistem operasi HP membuka dialog pemilihan berkas (*system file picker* / dokumen) dengan benar untuk berkas PDF/TXT.
   - Uji kolom tempel teks modul.
5. [ ] **Ngobrol (Layar Terkunci):**
   - Buka menu `/ngobrol`.
   - Pastikan layar terkunci tampil jelas (HTTP 403 `AI_BELUM_DIIZINKAN`), terdapat penjelasan bahwa izin orang tua/wali diperlukan, dan tautan "Butuh bicara dengan orang?" terlihat jelas.
6. [ ] **Keluar Sesi:**
   - Masuk ke tab `/akun`, tekan tombol Keluar.
   - Pastikan sesi tercabut dan kembali ke layar Masuk.
7. [ ] **Deep Link & Muat Ulang (Refresh F5):**
   - Navigasi ke rute `/latihan` atau `/arsip`.
   - Tarik layar ke bawah atau tekan tombol reload peramban.
   - Pastikan halaman tidak menampilkan galat 404, melainkan memuat kembali halaman dengan benar (SPA fallback).
8. [ ] **Keyboard Virtual & Antarmuka:**
   - Tap kolom input teks di halaman Masuk / Daftar / Tambah Kartu.
   - Periksa apakah kemunculan keyboard virtual mendorong antarmuka dengan wajar dan **tidak menutupi tombol penting** (seperti tombol Simpan atau Masuk).

---

## 4. Tabel Pencatatan Hasil Uji per Perangkat

Gunakan tabel di bawah ini untuk mencatat hasil uji pada berbagai perangkat fisik siswa/guru:

| No | Tipe Perangkat / Model | OS & Versi | Browser & Versi | Daftar / Masuk | Latihan + Keyakinan | Level-In | Unggah Modul (File Picker) | Ngobrol (Terkunci) | Refresh Rute Dalam | Keyboard Virtual OK? | Catatan Kendala / Responsivitas |
|---|---|---|---|:---:|:---:|:---:|:---:|:---:|:---:|:---:|---|
| 1 | *Contoh: Samsung Galaxy A14* | *Android 14* | *Chrome 128* | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| 2 | *Contoh: Xiaomi Redmi Note 12*| *Android 13* | *Chrome 128* | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| 3 | *Contoh: iPhone 11 / 13* | *iOS 17.5* | *Safari 17* | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| 4 | | | | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
| 5 | | | | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | [ ] | |
