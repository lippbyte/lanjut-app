# Panduan Deployment — Rumahweb (Skenario A)

Skenario A yang dikunci PM: **satu domain, same-origin**. Frontend statis
(`app/`) dan backend (`server/`) dilayani dari domain yang sama, backend di
bawah path `/api/v1`. Karena same-origin, CORS antar-domain **tidak
dibutuhkan** secara fungsional — tapi `ASAL_DIIZINKAN` tetap wajib diisi
karena `src/config/env.js` menolak menyala bila variabel itu kosong (§8.5
`docs/SDD-Backend-Foundation.md`).

Baca juga `server/README.md` untuk cara menjalankan server secara umum —
berkas ini hanya menambahkan hal spesifik Rumahweb.

## Arsitektur

```
https://<domain-anda>/          -> app/ (HTML/CSS/JS statis, tanpa build step)
https://<domain-anda>/api/v1/*  -> proses Node (Express) di server/, port lokal
```

## Prasyarat

- Akses cPanel Rumahweb dengan fitur **"Setup Node.js App"** (Node.js
  Selector).
- Node.js 20+ tersedia di Node.js Selector (samakan dengan versi yang dipakai
  saat pengembangan — lihat `server/README.md` §Dependensi).
- MySQL 8 tersedia via cPanel "MySQL Databases".
- Domain/subdomain sudah aktif di cPanel dan mengarah ke `public_html`
  (atau `public_html/<subfolder>` bila memakai addon domain).

## Langkah Deploy

### 1. Basis data (cPanel MySQL Databases)

Rumahweb mengharuskan nama basis data & pengguna MySQL diawali prefix akun
cPanel (mis. `namaakun_lanjut_v1`), bukan nama polos seperti `lanjut_v1`.
Buat lewat menu cPanel (bukan `CREATE DATABASE` manual via SSH, kecuali
Anda punya akses shell):

1. cPanel → **MySQL Databases** → buat basis data baru.
2. Buat pengguna MySQL baru, set sandi kuat.
3. **Add User to Database**, beri **ALL PRIVILEGES**.
4. Catat tiga nilai ini: nama basis data lengkap (dengan prefix), nama
   pengguna lengkap (dengan prefix), sandi — dipakai di langkah 2.

Setelah kredensial siap dan kode `server/` sudah ada di server (langkah 3),
jalankan migrasi & benih dari terminal cPanel/SSH:

```bash
cd server
npm run migrasi   # menjalankan src/db/migrasi/001..00N yang belum pernah jalan
npm run benih     # mengisi konten dari ../../MVP-PWA/data/*.json — aman diulang
```

Migrasi membaca kredensial dari `.env` (lihat langkah 2) — pastikan `.env`
sudah terisi **sebelum** menjalankan `npm run migrasi`. Skrip ini **tidak**
menerima argumen `--env`; lingkungan ditentukan sepenuhnya oleh isi `.env`
di direktori `server/` saat perintah dijalankan (via `dotenv`, lihat
`src/config/env.js`).

### 2. Berkas lingkungan (`.env`)

```bash
cd server
cp .env.production.example .env
```

Edit `.env` dan isi nilai sungguhan (nama variabel **tidak boleh diubah**,
lihat komentar di `.env.production.example` untuk arti tiap variabel):

| Variabel | Isi dengan |
|---|---|
| `PORT` | Port yang ditugaskan cPanel Node.js Selector untuk aplikasi ini |
| `NODE_ENV` | `production` (jangan `test` — itu melonggarkan rate limit, §8.2) |
| `DB_HOST` | Biasanya `localhost` di Rumahweb |
| `DB_PORT` | Biasanya `3306` |
| `DB_USER` | Pengguna MySQL dari langkah 1 (dengan prefix akun cPanel) |
| `DB_PASSWORD` | Sandi pengguna MySQL dari langkah 1 |
| `DB_NAME` | Basis data dari langkah 1 (dengan prefix akun cPanel) |
| `ASAL_DIIZINKAN` | `https://<domain-anda>` — domain final Rumahweb Anda |
| `SESI_UMUR_HARI` | `90` (usulan SDD §5.3), bisa disesuaikan kebijakan |
| `JUMLAH_PROXY` | Jumlah reverse proxy di depan Node — kemungkinan `1` di cPanel/Passenger, **pastikan ke Rumahweb**. Tanpa ini batas laju per-IP berlaku untuk semua pengguna sekaligus (lihat `README.md` §6) |

**Jangan pernah commit `.env` berisi nilai sungguhan ke git** — sudah
dikunci di `server/.gitignore`, tapi tetap periksa manual sebelum push
(RB9, `docs/SDD-Backend-Foundation.md` §baris RB9: rahasia yang pernah
ter-commit dianggap bocor dan **harus diganti**, bukan sekadar dihapus dari
commit berikutnya).

### 3. Backend (Node.js Selector)

Di cPanel → **Setup Node.js App**:

1. Buat aplikasi baru, **Application root** menunjuk ke folder tempat kode
   `server/` di-upload (mis. `lanjut-backend`), **Application startup file**
   = `src/index.js`.

   > **Penting (LANJUT_022):** `npm run benih` membaca data dari
   > `../../MVP-PWA/data/` relatif terhadap folder `server/`. Kalau yang
   > di-upload hanya isi folder `server/`, benih gagal ("no such file or
   > directory"). Upload dengan struktur repo utuh (mis. `git clone` lalu
   > Application root = `…/LANJUT_App/server`), atau jalankan benih dari
   > komputer lain yang tersambung ke basis data Rumahweb.
2. **Application mode**: Production.
3. Masuk ke terminal aplikasi (tombol "Enter to virtual environment" di
   cPanel) lalu jalankan:
   ```bash
   npm install --omit=dev
   npm run migrasi
   npm run benih
   ```
4. Klik **Restart** pada aplikasi Node di cPanel.
5. cPanel Node.js Selector otomatis menjalankan proses dan memasangnya di
   port internal — **tidak perlu** `npm start` manual, dan **tidak perlu**
   PM2/systemd terpisah karena Node.js Selector sudah mengelola proses
   (auto-restart bila crash, log terpusat).

### 4. Frontend (`app/`)

Frontend adalah HTML/CSS/JS statis tanpa build step — cukup unggah apa
adanya:

1. Unggah seluruh isi folder `app/` ke `public_html/` (atau
   `public_html/<subfolder>` bila domain final memakai addon domain/
   subdomain).
2. Tidak ada konfigurasi tambahan di sisi frontend untuk API — pastikan
   kode klien (`app/assets/*.js`) memanggil path **relatif** `/api/v1/...`
   (bukan URL absolut ke domain/port lain), supaya same-origin benar-benar
   berlaku dan CORS tidak pernah tersentuh di jalur normal.

### 5. Proxy `/api/v1` (cPanel)

Rumahweb Node.js Selector umumnya sudah otomatis membuat rule proxy lewat
`.htaccess` di **Application root** saat aplikasi Node dibuat (bagian
"passenger" di `.htaccess`). Untuk memetakan path `/api/v1` di domain
publik ke aplikasi Node tersebut, biasanya perlu menambah `.htaccess` di
`public_html/` (dokumen root frontend) yang mem-proxy prefix `/api/v1` ke
aplikasi Node — **detail rule ini bergantung pada versi cPanel/Passenger
Rumahweb yang aktif; konfirmasikan langsung ke support Rumahweb atau ikuti
panduan Node.js Selector resmi mereka**, karena tidak ada satu sintaks
`.htaccess` yang pasti berlaku di semua paket hosting.

Verifikasi setelah proxy aktif:

```bash
curl -s https://<domain-anda>/api/v1/sehat
# harus balas: { "ok": true, "data": { "status": "ok", "waktu": "..." } }
```

## Troubleshooting

- **502/503 dari `/api/v1/...`**: proses Node belum jalan atau crash —
  cek log aplikasi di cPanel Node.js Selector.
- **Server menolak menyala, pesan "Variabel lingkungan wajib ... kosong"**:
  ada variabel wajib di `.env` yang belum diisi — lihat pesan galat, isi
  variabel yang disebut (lihat `src/config/env.js`).
- **`ASAL_DIIZINKAN tidak boleh berisi "*"`**: jangan pernah isi `*` di
  variabel ini walau same-origin — sebutkan domain eksplisit (dikunci
  keras di `src/config/env.js`, §8.5 SDD).
- **Error koneksi DB (`ECONNREFUSED`/`ER_ACCESS_DENIED_ERROR`)**: cek
  `DB_HOST`/`DB_USER`/`DB_PASSWORD`/`DB_NAME` di `.env` — di Rumahweb nama
  DB & user harus pakai prefix akun cPanel.
- **Rate limit terasa terlalu ketat saat migrasi/testing manual di server
  tayang**: itu memang perilaku produksi yang benar (§8.2 SDD) — jangan
  mengakali dengan mengganti `NODE_ENV` jadi `test` di server tayang, itu
  melonggarkan proteksi brute-force login secara nyata.

## Monitoring & cadangan

- Log aplikasi: dilihat dari panel **Setup Node.js App** di cPanel (tombol
  log), lokasi berkas persisnya bergantung konfigurasi Rumahweb — cek
  dokumentasi/tanyakan support Rumahweb untuk path pasti bila perlu
  diarsipkan otomatis.
- Manajemen proses: ditangani otomatis oleh cPanel Node.js Selector
  (Passenger) — tidak perlu PM2/systemd manual di paket hosting shared.
- **Cadangan basis data wajib dijadwalkan sebelum pengguna nyata masuk**
  (RB10, `docs/SDD-Backend-Foundation.md`) — pakai fitur **Backup** bawaan
  cPanel (terjadwal) untuk basis data MySQL, di luar cakupan berkas ini
  untuk mengatur jadwalnya.

## Yang sengaja TIDAK dibahas di sini (di luar cakupan tugas ini)

- HTTPS/SSL — Rumahweb umumnya menyediakan AutoSSL gratis via cPanel;
  aktifkan lewat menu **SSL/TLS Status**, tidak spesifik ke aplikasi ini.
- Detail sintaks `.htaccess`/Passenger untuk proxy `/api/v1` — bergantung
  versi panel Rumahweb yang aktif saat deploy, lihat catatan di langkah 5.
- CI/CD otomatis (deploy dari git push) — deployment ini diasumsikan
  manual (upload/`git pull` + restart lewat cPanel).

---

## Update 2026-08-31 — Topologi final: landing page pindah ke `/tentang`

Keputusan topologi hosting final (lihat
`docs/keputusan-topologi-hosting.md`): **`app/` tetap di Application
root/`public_html/` sesuai Skenario A di atas — TIDAK ADA perubahan
konfigurasi untuk `app/` maupun `server/` akibat perubahan ini.** Semua
langkah 1–5 di atas tetap berlaku apa adanya.

Yang berubah hanya **penempatan `LandingPage/`**: folder ini (statis
HTML/CSS/JS, tanpa proses Node/build terpisah, sama seperti `app/`) perlu
diunggah ke subfolder `public_html/tentang/`, sehingga bisa diakses di
`https://edilakso.my.id/tentang`.

### Cara upload `LandingPage/`

1. Lewat cPanel **File Manager** atau klien FTP/SFTP (mis. FileZilla):
   masuk ke `public_html/`, buat folder baru bernama `tentang`.
2. Unggah seluruh isi folder `LandingPage/` (bukan foldernya sendiri,
   isinya langsung) ke `public_html/tentang/`.
3. Tidak ada konfigurasi tambahan — folder ini murni statis, tidak
   menyentuh proses Node.js Selector atau `.htaccess` proxy `/api/v1`
   yang sudah dijelaskan di langkah 5 bagian atas.

### Urutan kerja yang disarankan

1. **Pastikan DNS `edilakso.my.id` sudah resolve dulu** sebelum lanjut ke
   langkah berikutnya (lihat bagian "Status DNS" di bawah — per
   2026-08-31 domain ini **belum resolve**, NXDOMAIN).
2. Upload `app/` ke Application root/`public_html/` (langkah 4 bagian
   atas) — kalau belum dilakukan.
3. Upload `LandingPage/` ke `public_html/tentang/` (lihat langkah di
   atas).
4. **Tes klik manual** (harus dilakukan manusia dengan akses hosting,
   tidak bisa diotomasi dari repo kode ini):
   - Buka `https://edilakso.my.id/tentang` di browser, pastikan landing
     page tampil (bukan 404).
   - Klik tombol "Mulai Sekarang" (atau tombol serupa) di landing page,
     pastikan mendarat di `https://edilakso.my.id/` dan aplikasi
     `app/` berjalan normal (Splash → Onboarding/Beranda) — bukan 404
     atau halaman kosong.

### Status DNS (dicek dari sandbox, 2026-08-31)

Hasil mentah pengecekan DNS untuk `edilakso.my.id` — lihat laporan agen
yang mengerjakan task ini untuk detail lengkap dan output mentah. Ringkas:
domain **NXDOMAIN (belum resolve)** per tanggal pengecekan. Sandbox yang
digunakan terbukti punya akses internet nyata (domain lain berhasil
di-resolve), jadi hasil NXDOMAIN ini bukan karena sandbox tidak ada
jaringan — ini status DNS domain yang sesungguhnya per saat itu. Perlu
dicek ulang manual mendekati waktu deploy sungguhan, karena status ini
bisa berubah kapan saja setelah dua item verifikasi manual di bawah
diselesaikan.

### Dua hal yang WAJIB diverifikasi manual oleh manusia (tidak bisa dicek dari sandbox/repo ini)

1. **Apakah domain `edilakso.my.id` sudah ditambahkan & di-assign ke akun
   cPanel yang benar.** Cara cek: login ke panel Rumahweb → menu
   **Domains** (atau **Zone Editor**) → pastikan `edilakso.my.id`
   terdaftar dan mengarah ke akun cPanel yang dipakai untuk deployment
   ini.
2. **Apakah nameserver domain `.my.id` sudah diarahkan ke Rumahweb.**
   Cara cek: login ke panel registrar tempat domain `.my.id` didaftarkan
   (bukan panel Rumahweb), cek pengaturan nameserver, pastikan mengarah
   ke nameserver Rumahweb (biasanya format `ns1.rumahweb.com`/
   `ns2.rumahweb.com` atau sejenis — konfirmasi nilai persis ke
   support Rumahweb). Kalau baru diubah, propagasi DNS bisa makan waktu
   hingga 24-48 jam — cek ulang dengan `nslookup edilakso.my.id` atau
   situs seperti whatsmydns.net dari beberapa lokasi.
