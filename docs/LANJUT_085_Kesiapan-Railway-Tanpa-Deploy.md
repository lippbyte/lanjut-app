# TASK: LANJUT_085 — Kesiapan Server untuk Railway (Tanpa Deploy)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM (22 Oktober): hosting backend
publik memakai **Railway**. Akun dan deploy dilakukan PM, bukan eksekutor.

Batasan yang tetap berlaku:
- **Tidak ada deploy, tidak ada login ke Railway, tidak ada push.** Eksekutor
  hanya menyiapkan berkas dan memeriksa kode.
- Tidak menambah paket baru. Tidak mengubah firewall.
- Tidak mengirim email sungguhan. Tidak memanggil OpenRouter.
- `ai_aktif` tetap `0`. `event_sekolah_aktif` tetap `0`. Dicek di database.
- Kunci dan sandi tidak dicetak, tidak masuk repo, dan tidak masuk berkas konfigurasi.

## Konteks

Backend LANJUT (Express + MySQL di `server/`) sekarang hanya jalan di laptop.
APK untuk guru harus bisa menghubungi server dari luar Wi-Fi. Railway butuh:
- service Node untuk `server/`;
- service MySQL (atau database lain yang didukung dengan koneksi dari luar);
- variabel lingkungan yang diambil dari Railway, bukan dari `.env` di repo.

## Yang Diminta

### A. Periksa konfigurasi server
1. Pastikan server membaca port dari `process.env.PORT` (Railway mengisi ini),
   dengan nilai bawaan lokal jika tidak ada.
2. Pastikan koneksi database membaca variabel dari lingkungan, dengan nama yang
   jelas (misalnya `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`).
   Jika Railway memberi `MYSQL_URL` atau variabel sejenis, catat nama persisnya
   di laporan; jangan menebaknya.
3. Pastikan CORS mengizinkan asal yang dipakai APK dan landing. Daftar asal
   dibaca dari variabel lingkungan, bukan ditulis mati.
4. Pastikan `trust proxy` diatur, karena Railway berjalan di belakang proxy.
   Batas permintaan auth (10 per 15 menit per IP) harus memakai IP asli
   dari header proxy yang dipercaya, bukan IP proxy Railway.
5. Pastikan migrasi bisa dijalankan saat start atau lewat perintah terpisah.
   Pilih satu cara, catat alasannya.

### B. Berkas konfigurasi Railway (tanpa deploy)
6. Tambah `server/railway.json` atau `server/railway.toml` dengan perintah start
   dan health check (`GET /kesehatan` atau endpoint yang sudah ada).
   Jangan tambah Dockerfile kecuali kamu menjelaskan alasannya di laporan.
7. Buat `server/.env.railway.contoh` yang berisi **hanya nama variabel dan
   komentar**, tanpa nilai. Daftar variabel: port, database, SMTP, Google Client
   ID, OpenRouter, origin CORS, dan `NODE_ENV`.
8. Jangan menulis nilai rahasia di berkas mana pun. Periksa dengan `grep` bahwa
   tidak ada nilai dari `.env` lokal yang masuk ke repo.

### C. Tes
9. Tambah tes minimal 4 kasus: server membaca `PORT`; CORS membaca daftar dari
   lingkungan; `trust proxy` aktif; batas auth memakai IP klien dari proxy
   tepercaya.
10. Mutasi, gagal lalu lulus: (a) hapus pembacaan `PORT`, (b) hapus `trust proxy`,
    (c) tulis origin CORS mati di kode.
11. `npm test` (server), `npm run periksa-sql`, dan `npx tsc --noEmit` (app) lulus.

### D. Daftar untuk PM
12. Di laporan, tulis langkah yang dilakukan PM di Railway, berurutan: buat
    project, tambah service MySQL, tambah service Node dari repo, isi variabel
    dari `.env.railway.contoh`, jalankan migrasi, lalu salin URL publik ke
    konfigurasi APK (`EXPO_PUBLIC_API_URL`).

## Di luar task ini
- Login atau deploy ke Railway.
- Membuat akun Railway atau mengisi variabel asli.
- Mengubah APK atau landing.
- Mengubah kebijakan privasi.

## Definition of Done

- [ ] Port, database, dan CORS dibaca dari lingkungan; ada tes
- [ ] `trust proxy` dan batas auth memakai IP klien; ada tes
- [ ] `railway.json` atau `railway.toml` ada, dengan start dan health check
- [ ] `.env.railway.contoh` berisi nama variabel saja; tidak ada nilai rahasia
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Langkah PM di Railway dituliskan di laporan
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] `ai_aktif = 0` dan `event_sekolah_aktif = 0` (dicek di database)
- [ ] Commit kecil, pesan commit menyebut `LANJUT_085`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Nama variabel database yang dipakai, dan apakah Railway memberi `MYSQL_URL`
- Hasil tes dan tiga mutasi
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
