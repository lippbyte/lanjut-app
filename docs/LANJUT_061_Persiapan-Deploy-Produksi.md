# TASK: LANJUT_061 — Persiapan Deploy Produksi (Tanpa Deploy)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`.

## Konteks

Penghambat rilis uji nomor 1 (LANJUT_059): belum ada server produksi dan
APK masih menunjuk IP LAN `10.141.5.75`. Tempat hosting belum diputuskan
Khalifa. Task ini menyiapkan **semua yang bisa disiapkan tanpa memilih
hosting dan tanpa mengeluarkan biaya**, supaya begitu server tersedia,
deploy bisa selesai dalam hitungan jam.

Aturan keras tambahan untuk task ini:
- Jangan deploy, jangan `eas build`, jangan push, jangan membuat akun atau
  sumber daya di layanan luar.
- Jangan menebak nama domain. Pakai placeholder `GANTI-DOMAIN`.
- Jangan mengubah perilaku fitur. Ini konfigurasi, pengemasan, dan dokumen.

## Yang Diminta (urut prioritas)

### 1. Tidak ada alamat yang di-hardcode
- Telusuri server dan app untuk `localhost`, IP LAN, port, dan alamat API
  yang tertanam. Laporkan daftarnya.
- Server: semuanya dari variabel lingkungan: `PORT`, `NODE_ENV`, `DB_*`,
  `CORS_ORIGINS` (daftar dipisah koma, ketat di produksi), `TRUST_PROXY`.
- App: alamat API dari `EXPO_PUBLIC_API_URL` (atau mekanisme yang sudah ada
  di proyek), tanpa nilai bawaan yang menunjuk IP LAN di build produksi.
- `eas.json`: hapus `10.141.5.75`. Buat profil `development` (alamat dari
  env lokal), `preview`, dan `production` dengan `https://api.GANTI-DOMAIN`
  sebagai placeholder yang jelas. Build dengan placeholder harus gagal
  dengan pesan yang jelas, bukan diam-diam memakai alamat salah.

### 2. Endpoint kesehatan
- `GET /health`: balas `{ ok: true }` dan ping basis data ringan. Tanpa
  data sensitif, tanpa versi paket, tanpa stack. Bila sudah ada, laporkan
  dan pastikan memenuhi syarat ini.

### 3. Pengerasan dasar produksi
- Header keamanan standar (mis. helmet) bila belum ada.
- Batas laju dan alamat klien benar di belakang proxy balik (`trust proxy`
  dari env), supaya batas laju tidak menghitung semua siswa sebagai satu
  alamat.
- Batas ukuran body tetap, penangan galat produksi tidak mengirim stack ke
  klien dan tidak mencatat isi permintaan.
- Penutupan halus saat sinyal berhenti (selesaikan permintaan, tutup koneksi DB).
- Tes untuk hal yang diubah (khususnya CORS ketat dan galat tanpa stack).

### 4. Pengemasan
- `server/.env.example` lengkap (semua variabel, tanpa nilai rahasia,
  komentar singkat tiap variabel, `OPENROUTER_API_KEY` kosong).
- Jalur A: `Dockerfile` server + `docker-compose.yml` (server + MariaDB/MySQL)
  untuk uji lokal. Jalankan hanya bila Docker tersedia; bila tidak,
  tandai belum diuji.
- Jalur B (tanpa Docker): panduan Node 20 + PM2 + Nginx proxy balik +
  sertifikat Let's Encrypt + MariaDB/MySQL di satu VPS Linux, termasuk
  contoh berkas konfigurasi Nginx dan PM2 (placeholder domain).

### 5. Basis data
- Urutan yang benar di server baru: buat basis data dan pengguna dengan hak
  minimum, `npm run migrasi`, `npm run benih`. Tegaskan bahwa
  `npm run benih` menimpa kunci Level-In dari `levelin-konfig.json`.
- Skrip cadangan harian (`mysqldump`, dengan rotasi sederhana, tanpa
  menyimpan kata sandi di skrip) dan langkah pemulihan. Uji cadangan dan
  pemulihan pada basis data lokal.
- Catatan jujur MariaDB vs MySQL: uji MariaDB belum terbukti (LANJUT_059).
  Bila MariaDB tersedia di mesin ini, jalankan tes server di atasnya dan
  laporkan; bila tidak, tandai belum diuji.

### 6. Uji asap pasca-deploy
- `npm run smoke -- --url=<alamat>`: memeriksa `/health`, lalu daftar akun
  uji sementara, masuk, baca profil, keluar, dan menghapus akun uji itu.
  Bawaan hanya `http://localhost:4000`; alamat lain hanya jika
  `--url` diberikan eksplisit. Skrip tidak memanggil AI. Cetak lulus/gagal
  per langkah.

### 7. Dokumen `docs/deploy-produksi.md`
- Langkah dari server kosong sampai app terhubung (jalur A dan B).
- Daftar periksa go-live: `ai_aktif=0`, `ai_web_aktif=0`, `CORS_ORIGINS`
  benar, HTTPS aktif, cadangan terjadwal, smoke test lulus, `OPENROUTER_API_KEY`
  kosong sampai keselamatan AI disetujui.
- Rollback: cara kembali ke versi sebelumnya dan memulihkan basis data.
- Langkah build APK/AAB untuk Khalifa (`eas build` dengan profil
  `production`) dan apa yang perlu ia putuskan sebelumnya (akun Expo, nama
  paket, penandatanganan). **Jangan dijalankan.**
- Perbarui `docs/kesiapan-rilis-uji.md` bagian terkait.

## Definition of Done

- [ ] Tidak ada alamat/IP tertanam di build produksi; `eas.json` bersih dari `10.141.5.75`
- [ ] `/health` ada dan aman
- [ ] Pengerasan dasar + tes; `npm test`, `periksa-sql`, `tsc` bersih
- [ ] `.env.example` lengkap; Dockerfile/compose (atau ditandai belum diuji) dan panduan non-Docker
- [ ] Skrip cadangan dan pemulihan teruji di basis data lokal
- [ ] `npm run smoke` berfungsi terhadap localhost
- [ ] `docs/deploy-produksi.md` selesai
- [ ] Tidak ada deploy, push, build, atau panggilan luar
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Daftar alamat yang sebelumnya tertanam dan perbaikannya
- Apa yang tidak bisa diuji di mesin ini (Docker, MariaDB, HTTPS)
- Keputusan yang masih harus diambil Khalifa sebelum deploy
