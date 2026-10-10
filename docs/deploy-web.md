# Panduan Deploy Web Produksi LANJUT

> Dokumen ini disusun pada LANJUT_062 (10 Oktober 2026).  
> Dokumen ini menjelaskan tata cara membangun (build), menyajikan, dan memelihara versi Web SPA dari aplikasi LANJUT untuk lingkungan produksi sekolah.

---

## 1. Ikhtisar & Keunggulan Jalur Web

Jalur Web adalah **jalur rilis uji tercepat** untuk program percontohan (pilot) di sekolah karena:
1. **Tanpa Biaya & Kuota Build:** Tidak memerlukan kredit EAS Build atau antrean cloud Expo.
2. **Tanpa Kendala Distribusi:** Siswa dan guru tidak perlu mengunduh file `.apk` (sideloading) atau menunggu persetujuan toko aplikasi (Google Play Store / Apple App Store).
3. **Pembaruan Instan:** Pembaruan kode dapat langsung diterima pengguna begitu berkas statis diperbarui di server.
4. **Dukungan Perangkat Luas:** Dapat diakses langsung dari peramban (browser) di Chromebook, laptop lab sekolah, tablet, maupun ponsel Android/iOS.

---

## 2. Cara Build Produksi (`npm run build:web`)

Di direktori `LANJUT_App/`, perintah build menggunakan Expo CLI:

```bash
npm run build:web
```

Skrip ini menjalankan `expo export --platform web` yang mengompilasi seluruh kode React Native / Expo ke bundel web statis di folder `LANJUT_App/dist/`.

### 2.1 Menentukan Alamat API (`EXPO_PUBLIC_API_URL`)

Variabel lingkungan `EXPO_PUBLIC_API_URL` **wajib** ditentukan saat proses build berjalan (karena di-injeksi secara statis ke dalam bundel JavaScript klien).

**Pencegahan Gagal-Cepat (Placeholder Guard):**  
Di `LANJUT_App/app.config.ts`, build web produksi akan **langsung digagalkan** jika `EXPO_PUBLIC_API_URL` masih bernilai kosong atau masih menggunakan placeholder `https://api.GANTI-DOMAIN/api/v1`.

#### Contoh Build di Lingkungan Linux / Bash:
```bash
# Topologi Dua Domain (API di domain terpisah)
EXPO_PUBLIC_API_URL="https://api.sekolah.sch.id/api/v1" npm run build:web

# Topologi Satu Domain (API di sub-path /api/v1)
EXPO_PUBLIC_API_URL="https://lanjut.sekolah.sch.id/api/v1" npm run build:web
```

#### Contoh Build di Lingkungan Windows (PowerShell):
```powershell
$env:EXPO_PUBLIC_API_URL="https://lanjut.sekolah.sch.id/api/v1"
npm run build:web
```

### 2.2 Karakteristik Hasil Build (`dist/`)
Berdasarkan metrik build Expo SDK 57:
- **Jumlah Berkas:** ~42 berkas (termasuk font Poppins berbagai varian, aset gambar, dan chunk JS).
- **Total Ukuran Direktori:** ~4.78 MB.
- **Berkas Terbesar:**
  1. `entry-[hash].js` (~1.51 MB) — Berisi React Native Web runtime, Expo Router, dan modul pustaka inti.
  2. Aset grafis maskot & wordmark (~200–224 KB per file PNG).
  3. Font TTF Poppins (~140–187 KB per varian font).

---

## 3. Topologi Penempatan: Satu Domain vs. Dua Domain

### Opsi A: Topologi Satu Domain (Direkomendasikan)
Seluruh aplikasi web dan API disajikan di balik satu nama host yang sama, misalnya:
- Aplikasi Web: `https://lanjut.sekolah.sch.id/`
- API Backend: `https://lanjut.sekolah.sch.id/api/v1`
- Health Check: `https://lanjut.sekolah.sch.id/health`

**Keuntungan:**
- **Bebas Masalah CORS:** Peramban menganggap panggilan API berada pada origin yang sama (*same-origin*). Tidak ada overhead permintaan pra-pemeriksaan (`OPTIONS` preflight request).
- **Konfigurasi Sederhana:** Nilai `ASAL_DIIZINKAN` di backend cukup diisi `https://lanjut.sekolah.sch.id`.

### Opsi B: Topologi Dua Domain
Aplikasi web dan API menggunakan domain/subdomain berbeda, misalnya:
- Aplikasi Web: `https://lanjut.sekolah.sch.id/`
- API Backend: `https://api.lanjut.sekolah.sch.id/v1`

**Konsekuensi & Kewajiban Teknis:**
1. **Konfigurasi `ASAL_DIIZINKAN` (CORS):**  
   Di berkas `.env` server backend, `ASAL_DIIZINKAN` **wajib** mencantumkan origin aplikasi web:
   ```env
   ASAL_DIIZINKAN="https://lanjut.sekolah.sch.id"
   ```
   Jika tidak, panggilan API dari web akan diblokir oleh peramban dengan galat *CORS Policy*.
2. **Latensi Preflight:**  
   Setiap permintaan `POST` / `PUT` / `DELETE` yang menyertakan header `Authorization: Bearer <token>` akan memicu permintaan HTTP `OPTIONS` terlebih dahulu.

---

## 4. Cadangan Rute Dalam (SPA Fallback / Deep Linking)

Karena LANJUT Web menggunakan *Single Page Application* (Expo Router dengan *HTML5 History API*), rute-rute dalam seperti:
- `/masuk`
- `/daftar`
- `/latihan`
- `/level-in`
- `/arsip`
- `/ngobrol`

**tidak memiliki berkas fisik individual** di folder `dist/`.

Jika pengguna membuka rute-rute tersebut secara langsung melalui tautan, bookmark, atau melakukan *refresh* (F5), web server **wajib mengembalikan `index.html`** agar router JavaScript di klien dapat mengambil alih.

### 4.1 Konfigurasi Nginx
Lihat template lengkap di [`LANJUT_App/server/config/nginx.conf.example`](file:///d:/DATA%20ALIF/Project%20-%20Profesional/EDILAKSO%20Group/LANJUT%20-%20Project/EDILAKSO-LANJUT-repo/LANJUT_App/server/config/nginx.conf.example).  
Aturan inti fallback rute SPA:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

### 4.2 Contoh Aturan Cadangan untuk Hosting Statis Lainnya (Teks Referensi)
- **Apache Web Server (`.htaccess`):**
  ```apache
  <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
  </IfModule>
  ```
- **Caddy Server (`Caddyfile`):**
  ```caddy
  try_files {path} {path}/ /index.html
  ```
- **Cloudflare Pages / Layanan Hosting Statis Umum:**
  Biasanya memerlukan berkas konfigurasi pengalihan (misalnya `_redirects` dengan isi `/* /index.html 200`).

---

## 5. Strategi Caching HTTP Header

Untuk performa optimal tanpa risiko pengguna terjebak pada kode lama (*stale code*):

1. **Berkas Entri (`index.html`):**
   - **TIDAK BOLEH DI-CACHE.**
   - Header HTTP: `Cache-Control: no-cache, no-store, must-revalidate`
   - *Alasan:* Berkas ini memuat referensi hash ke bundel JavaScript terbaru. Jika berkas ini di-cache, pengguna tidak akan menerima pembaruan aplikasi ketika versi baru dirilis.
2. **Aset Ber-Hash (`*.js`, `*.css`, font, gambar ber-hash):**
   - **DI-CACHE LAMA SECARA AGRESIF.**
   - Header HTTP: `Cache-Control: public, max-age=31536000, immutable`
   - *Alasan:* Karena nama berkas memuat hash unik (mis. `entry-8827b9cc...js`), konten berkas tidak akan pernah berubah. Memperbarui aplikasi otomatis menghasilkan nama berkas baru.

---

## 6. Prosedur Pembaruan Versi & Rollback

### Struktur Direktori yang Dianjurkan di Server:
```text
/var/www/lanjut-web/
├── releases/
│   ├── 20261010-01/   (dist versi sebelumnya)
│   └── 20261010-02/   (dist versi baru)
└── current -> releases/20261010-02  (symlink ke versi aktif)
```

Nginx diarahkan ke `/var/www/lanjut-web/current`.

### Langkah Rilis Pembaruan:
1. Bangun bundel di mesin pengembang atau CI/CD:
   ```bash
   EXPO_PUBLIC_API_URL="https://lanjut.sekolah.sch.id/api/v1" npm run build:web
   ```
2. Unggah folder `dist/` ke direktori rilis baru:
   `/var/www/lanjut-web/releases/20261010-02`
3. Alihkan symlink secara atomik:
   ```bash
   ln -sfn /var/www/lanjut-web/releases/20261010-02 /var/www/lanjut-web/current
   ```
4. Bersihkan rilis-rilis lama jika sudah melewati batas retensi (simpan minimal 2–3 versi terakhir).

### Prosedur Rollback Instan:
Jika ditemukan galat kritis pada versi baru, kembalikan symlink ke rilis sebelumnya dalam hitungan detik:
```bash
ln -sfn /var/www/lanjut-web/releases/20261010-01 /var/www/lanjut-web/current
```
Karena `index.html` disajikan dengan header `no-cache`, peramban siswa akan memuat bundel rilis sebelumnya segera setelah halaman dimuat ulang.

---

## 7. Keamanan & Kesiapan Teknis Web

### 7.1 Penyimpanan Token Sesi di Web
- **Mekanisme:** `@react-native-async-storage/async-storage` pada target platform Web menggunakan `window.localStorage` peramban.
- **Konsekuensi Keamanan:**
  - Token JWT Bearer disimpan di sisi klien dan rentan dibaca jika terjadi celah *Cross-Site Scripting* (XSS).
  - Mitigasi yang diterapkan pada arsitektur LANJUT:
    1. **Strict Content Security Policy (CSP):** Helmet di `server/src/app.js` membatasi `scriptSrc: ["'self'"]` tanpa `'unsafe-eval'` atau skrip pihak ketiga.
    2. **Validasi Skema Zod:** Seluruh masukan API divalidasi dengan ketat sehingga mencegah injeksi muatan skrip berbahaya.
    3. **Masa Berlaku Sesi:** Sesi dapat dicabut sewaktu-waktu dari server melalui tabel `sesi`.

### 7.2 Penyesuaian CSP (Content Security Policy)
Pada LANJUT_062, konfigurasi CSP Helmet disesuaikan agar kompatibel dengan React Native Web:
- `styleSrc: ["'self'", "'unsafe-inline'"]`  
  *Wajib:* React Native Web menginjeksi reset CSS dan style sheet dinamis secara *inline* ke tag `<head>`. Tanpa `'unsafe-inline'`, antarmuka aplikasi tampil berantakan tanpa gaya.
- `fontSrc: ["'self'", "data:"]`  
  Memungkinkan pemuatan font lokal Poppins dan font ikon base64.
- `imgSrc: ["'self'", "data:"]`  
  Memungkinkan aset gambar lokal dan ikon SVG data URI.
- `connectSrc: ["'self'", ...env.CORS_ORIGINS]`  
  Mengizinkan koneksi AJAX/Fetch ke endpoint API backend.

### 7.3 Status Kesiapan PWA (Progressive Web App)
Hasil audit `expo export --platform web`:
- **Status Saat Ini:** Aplikasi beroperasi sebagai **Single Page Application (SPA) murni**, **belum memenuhi kriteria PWA penuh**.
- **Manifest:** Belum terdapat `manifest.json` bawaan dengan konfigurasi PWA (`short_name`, `theme_color`, `display: standalone`).
- **Service Worker:** Belum ada service worker terdaftar untuk *offline caching* atau *background sync*.
- **Pemasangan ("Add to Home Screen"):** Peramban mobile tidak akan menampilkan banner otomatis "Install App" / pasang ke layar utama sebagai aplikasi mandiri.
- **Kesimpulan:** Siswa dapat mengakses aplikasi dengan lancar melalui peramban web modern, namun aplikasi belum bisa dipasang secara native sebagai PWA tanpa konfigurasi tambahan di masa mendatang.
