# Panduan Deployment Produksi LANJUT (Tanpa Deploy)

Dokumen ini adalah panduan operasional teknis untuk menggelar (*deploy*) backend
dan menghubungkan aplikasi mobile/web LANJUT ke server produksi begitu hosting
dan domain diputuskan oleh Khalifa.

> **PENTING:** Dokumen ini disusun sesuai mandat **LANJUT_061**.
> Tidak ada panggilan layanan luar, tidak ada `git push`, tidak ada `eas build`,
> dan tidak ada deploy nyata yang dijalankan dalam task ini.
> Seluruh nama domain menggunakan placeholder `GANTI-DOMAIN`.

---

## 1. Ikhtisar & Arsitektur Produksi

Arsitektur produksi LANJUT terdiri atas:
1. **Frontend Klien:**
   - **Aplikasi Mobile (Android/iOS):** Dibangun dengan Expo / React Native. Berkomunikasi ke API melalui `EXPO_PUBLIC_API_URL` (HTTPS wajib di rilis APK/AAB).
   - **PWA / Web:** Antarmuka web yang disajikan lewat web server statis / CDN.
2. **Backend API:**
   - Server Node.js (Express, Node >= 20 LTS).
   - Berjalan di belakang reverse proxy (Nginx atau ingress Docker) dengan `TRUST_PROXY=1`.
   - Header keamanan dikunci oleh `helmet`, pembatasan laju oleh `express-rate-limit`, dan penutupan halus (*graceful shutdown*) pada sinyal `SIGTERM`/`SIGINT`.
   - Endpoint kesehatan: `GET /health` (membalas `{ ok: true }` dengan ping DB ringan `SELECT 1`).
3. **Basis Data:**
   - MySQL 8.0 (atau MariaDB 10.11+).
   - Skema dan data awal dikelola lewat migrasi bernomor (`npm run migrasi`) dan pembenihan terstruktur (`npm run benih`).
   - Pencadangan harian otomatis (`mysqldump`) dengan rotasi retensi 7 hari.

---

## 2. Pilihan Jalur Deployment Backend

### Jalur A: Kontainerisasi (Docker & Docker Compose)

Jalur ini cocok untuk server VPS dengan Docker engine, staging terisolasi, atau platform berbasis kontainer (seperti Railway, Coolify, Portainer).

#### Berkas Terkait:
- `server/Dockerfile` (Node 20 Alpine, multi-stage/slim, unprivileged user `node`, health check bawaan).
- `server/docker-compose.yml` (Server API + MySQL 8.0).

#### Langkah-langkah:
1. **Siapkan Server VPS & Docker:**
   ```bash
   sudo apt update && sudo apt install -y docker.io docker-compose-plugin
   sudo systemctl enable --now docker
   ```
2. **Salin Kode Server:**
   Unggah direktori proyek ke server (misal di `/opt/lanjut/server`).
3. **Konfigurasi Lingkungan (`.env`):**
   Salin dari templat:
   ```bash
   cp .env.example .env
   ```
   Sesuaikan nilai kredensial di `.env`:
   - `PORT=4000`
   - `NODE_ENV=production`
   - `DB_HOST=db` (nama service di compose)
   - `DB_PORT=3306`
   - `DB_USER=lanjut_prod`
   - `DB_PASSWORD=<SandiKuatAcak>`
   - `DB_NAME=lanjut_prod`
   - `CORS_ORIGINS=https://app.GANTI-DOMAIN`
   - `TRUST_PROXY=1`
   - `OPENROUTER_API_KEY=` (kosongkan saat awal rilis)
4. **Jalankan Kontainer:**
   ```bash
   docker compose up -d --build
   ```
5. **Inisialisasi Skema & Data Konten:**
   ```bash
   docker compose exec api npm run migrasi
   docker compose exec api npm run benih
   ```
6. **Periksa Kesehatan:**
   ```bash
   curl -f http://localhost:4000/health
   # Respons: {"ok":true}
   ```

---

### Jalur B: VPS Linux Tradisional (Node 20 + PM2 + Nginx + Let's Encrypt)

Jalur ini adalah standar industri paling efisien untuk satu VPS Linux (Ubuntu 22.04 / 24.04 LTS).

#### Berkas Terkait:
- `server/ecosystem.config.js` (Konfigurasi PM2 cluster, auto-restart, log, memory limit).
- `server/config/nginx.conf.example` (Konfigurasi Nginx SSL, reverse proxy, DDoS rate limit).

#### Langkah 1: Persiapan Server & Dependensi
```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git ufw nginx mysql-server certbot python3-certbot-nginx

# Pasang Node.js 20 LTS
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Pasang PM2 secara global
sudo npm install -g pm2
```

#### Langkah 2: Konfigurasi MySQL
```bash
sudo mysql_secure_installation

# Masuk ke MySQL console
sudo mysql -u root

# Di dalam MySQL console:
CREATE DATABASE lanjut_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'lanjut_user'@'localhost' IDENTIFIED BY '<SandiKuatAcak>';
GRANT ALL PRIVILEGES ON lanjut_db.* TO 'lanjut_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

#### Langkah 3: Unduh Aplikasi & Pasang Dependensi
```bash
cd /var/www
# Klon atau salin folder proyek
cd EDILAKSO-LANJUT-repo/LANJUT_App/server

# Pasang dependensi produksi
npm ci --omit=dev

# Siapkan .env
cp .env.example .env
nano .env
```
Isi `.env` dengan:
```ini
PORT=4000
NODE_ENV=production
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=lanjut_user
DB_PASSWORD=<SandiKuatAcak>
DB_NAME=lanjut_db
CORS_ORIGINS=https://app.GANTI-DOMAIN
TRUST_PROXY=1
SESI_UMUR_HARI=90
OPENROUTER_API_KEY=
```

#### Langkah 4: Migrasi & Pembenihan Awal
```bash
npm run migrasi
npm run benih
```
*(Catatan: `npm run benih` mengisi konten dan 11 kunci konfigurasi Level-In dari `levelin-konfig.json`).*

#### Langkah 5: Nyalakan Proses dengan PM2
```bash
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

#### Langkah 6: Konfigurasi Nginx & Let's Encrypt
1. Salin konfigurasi contoh:
   ```bash
   sudo cp config/nginx.conf.example /etc/nginx/sites-available/api.GANTI-DOMAIN
   ```
2. Edit nama domain:
   ```bash
   sudo nano /etc/nginx/sites-available/api.GANTI-DOMAIN
   # Ganti semua api.GANTI-DOMAIN dengan subdomain API sungguhan (mis. api.lanjut.id)
   ```
3. Aktifkan virtual host:
   ```bash
   sudo ln -s /etc/nginx/sites-available/api.GANTI-DOMAIN /etc/nginx/sites-enabled/
   sudo nginx -t
   sudo systemctl reload nginx
   ```
4. Pasang Sertifikat SSL Let's Encrypt:
   ```bash
   sudo certbot --nginx -d api.GANTI-DOMAIN
   ```

---

## 3. Prosedur Basis Data Produksi

### Urutan Eksekusi di Server Baru:
1. Buat basis data dengan *charset* `utf8mb4` dan *collation* `utf8mb4_unicode_ci`.
2. Buat pengguna basis data dengan hak terbatas hanya pada basis data aplikasi (`GRANT ALL ON lanjut_db.* TO ...`).
3. Jalankan migrasi skema:
   ```bash
   npm run migrasi
   ```
4. Jalankan pembenihan awal:
   ```bash
   npm run benih
   ```
   > **PERINGATAN LEVEL-IN:** `npm run benih` **selalu menimpa** 11 kunci konfigurasi Level-In di tabel `konfigurasi_levelin` dengan nilai dari `MVP-PWA/data/levelin-konfig.json` (atau folder data yang disetel). Jika ada perubahan ambang atau bobot Level-In yang diizinkan Khalifa, lakukan perubahan pada berkas JSON tersebut sebelum menjalankan `npm run benih`, **jangan** mengubahnya langsung lewat SQL karena akan tertimpa saat benih berikutnya.
5. Verifikasi Konten (Manual oleh Kurator / Khalifa):
   ```bash
   npm run verifikasi-konten -- --jenis=semua
   ```

### Skrip Pencadangan Harian (Automated Daily Backup):
Pencadangan menggunakan alat bawaan `mysqldump` tanpa menyimpan password di teks perintah atau argumen proses.

1. **Skrip Bash:** `tools/cadangan-db.sh`
   - Membaca kredensial dari environment variable atau `.env`.
   - Menghasilkan file dump: `cadangan/cadangan_${DB_NAME}_YYYYMMDD_HHMMSS.sql`.
   - Rotasi otomatis: menghapus file cadangan yang lebih tua dari 7 hari.
2. **Pasang di Crontab (Harian setiap pukul 02:00 malam):**
   ```bash
   crontab -e
   # Tambahkan baris:
   0 2 * * * /bin/bash /var/www/EDILAKSO-LANJUT-repo/LANJUT_App/server/tools/cadangan-db.sh >> /var/log/lanjut-cadangan.log 2>&1
   ```
3. **Alternatif Node.js Cross-Platform:**
   ```bash
   npm run cadangan-db
   ```

### Prosedur Pemulihan Basis Data (Restore):
Bila terjadi insiden dan data perlu dipulihkan ke titik tertentu:
```bash
# Jalur Bash:
./tools/pulihkan-db.sh cadangan/cadangan_lanjut_db_YYYYMMDD_HHMMSS.sql

# Atau Jalur Node:
npm run pulihkan-db cadangan/cadangan_lanjut_db_YYYYMMDD_HHMMSS.sql
```

---

## 4. Uji Asap Pasca-Deploy (Smoke Test)

Setelah deployment selesai dan server menyala, jalankan uji asap untuk memverifikasi fungsionalitas end-to-end tanpa melibatkan AI:

```bash
# Pengujian lokal pada host:
npm run smoke

# Pengujian terhadap URL domain produksi:
npm run smoke -- --url=https://api.GANTI-DOMAIN
```

### Yang Diperiksa Otomatis oleh Uji Asap:
1. `GET /health` → Respons HTTP 200 `{ ok: true }` (basis data terhubung dan sehat).
2. `POST /api/v1/auth/daftar` → Mendaftarkan akun uji sementara unik.
3. `POST /api/v1/auth/masuk` → Melakukan autentikasi dan memvalidasi token sesi.
4. `GET /api/v1/auth/saya` → Membaca profil pengguna menggunakan Bearer token.
5. `POST /api/v1/auth/keluar` → Mengakhiri sesi (logout) dengan aman.
6. Pembersihan DB → Menghapus akun uji sementara dari tabel `pengguna`.

Semua 6 langkah harus mencetak `LULUS`.

---

## 5. Daftar Periksa Go-Live (Checklist Pra-Rilis)

Sebelum membuka aplikasi ke siswa/sekolah, verifikasi hal-hal berikut:

- [ ] **Domain & DNS:** Domain API dan Web aktif dengan HTTPS (SSL Grade A di Qualys SSL Labs).
- [ ] **Variabel Lingkungan (`.env`):**
  - `NODE_ENV=production`
  - `CORS_ORIGINS` hanya memuat domain web resmi (tidak ada wildcard `*`, tidak ada `http://`).
  - `TRUST_PROXY` bernilai `1` (atau sesuai konfigurasi reverse proxy).
  - `OPENROUTER_API_KEY` **kosong** (sampai evaluasi keselamatan disetujui Khalifa).
- [ ] **Pengaturan AI Gagal-Aman:**
  - `ai_aktif = 0` di tabel `konfigurasi_levelin`.
  - `ai_web_aktif = 0` di tabel `konfigurasi_levelin`.
  - Siswa yang membuka fitur AI akan melihat pesan bahwa fitur sedang dalam tahap persiapan.
- [ ] **Pencadangan:** Cron job cadangan harian `cadangan-db.sh` aktif di server.
- [ ] **Uji Asap:** `npm run smoke -- --url=https://...` berhasil lulus seluruh langkah.
- [ ] **Keamanan:** Port MySQL (3306) **tertutup** dari internet luar (hanya mendengarkan 127.0.0.1 atau subnet internal).
- [ ] **Log:** Tidak ada data kredensial atau payload chat masuk ke berkas log server.

---

## 6. Prosedur Rollback

Bila rilis baru mengalami kegagalan kritis di produksi:

### Rollback Kode Aplikasi:
1. **Jalur B (PM2):**
   ```bash
   cd /var/www/EDILAKSO-LANJUT-repo/LANJUT_App/server
   git checkout <TAG_ATAU_COMMIT_SEBELUMNYA>
   npm ci --omit=dev
   pm2 reload lanjut-api
   ```
2. **Jalur A (Docker):**
   ```bash
   docker compose down
   # Checkout commit stabil
   git checkout <TAG_ATAU_COMMIT_SEBELUMNYA>
   docker compose up -d --build
   ```

### Rollback Basis Data:
Jika migrasi terbaru menyebabkan inkonsistensi data:
1. Hentikan aplikasi sementara: `pm2 stop lanjut-api` (atau `docker compose stop api`).
2. Pulihkan cadangan sebelum deployment:
   ```bash
   npm run pulihkan-db cadangan/cadangan_sebelum_deploy.sql
   ```
3. Nyalakan kembali aplikasi: `pm2 start lanjut-api`.

---

## 7. Petunjuk Build APK / AAB untuk Khalifa

> **PERINGATAN:** Instruksi ini adalah **panduan untuk Khalifa**.
> Agen **DILARANG** menjalankan `eas build` atau mengunggah kode ke Expo.

### Keputusan yang Perlu Diambil Khalifa Sebelum Build:
1. **Akun Expo:** Pastikan akun Expo aktif dan memiliki akses ke project ID `cbb2972d-24a7-450e-8604-6360aee3d190` (atau inisialisasi project baru dengan `npx eas init`).
2. **Nama Paket Android:** Bawaan adalah `com.edilakso.lanjut` di `app.config.ts`.
3. **Penandatanganan (Android Keystore):** Biarkan EAS mengelola keystore (`Generate new keystore`) atau unggah keystore resmi EDILAKSO Group.
4. **URL API Produksi:** Ganti placeholder `"https://api.GANTI-DOMAIN/api/v1"` di `LANJUT_App/eas.json` pada profil `production` (dan `preview`) dengan URL server API yang sebenarnya.

### Menjalankan Build (Oleh Khalifa):
```bash
cd LANJUT_App

# 1. Login ke Expo:
npx eas login

# 2. Build APK Internal Testing (Profil Preview):
npx eas build --platform android --profile preview

# 3. Build AAB Google Play Store (Profil Production):
npx eas build --platform android --profile production
```

*Catatan: Konfigurasi `app.config.ts` telah dipasangi proteksi gagal-cepat. Jika Khalifa menjalankan build sementara `EXPO_PUBLIC_API_URL` masih berisi `"GANTI-DOMAIN"`, proses build akan langsung berhenti dengan pesan galat yang jelas.*
