# TASK: Persiapan Backend untuk Deployment (Netral Hosting)

## Konteks

Backend (`LANJUT_App/server/`) saat ini hanya jalan di laptop. Keputusan hosting (Rumahweb cPanel Node.js atau Railway) belum diambil dan baru dieksekusi sekitar 2-3 Oktober. Task ini menyiapkan backend supaya **siap dipindah ke server manapun** tanpa banyak kejutan — murni audit dan penyesuaian konfigurasi, bukan deploy sungguhan.

**Jangan deploy ke mana pun.** Jangan buat akun layanan hosting apapun. Jangan ubah logika bisnis atau skema database.

## Langkah 0 — Audit kesiapan produksi

Periksa dan catat kondisi tiap poin berikut (belum perlu diperbaiki di langkah ini):

1. **Konfigurasi dari environment variable:** apakah semua nilai yang berubah antar lingkungan (port, kredensial database, secret JWT/sesi, daftar origin CORS) dibaca dari env, bukan hardcode?
2. **Sisa referensi `localhost`/IP lokal** yang tertanam di kode server (bukan di `.env`).
3. **Port:** apakah server membaca port dari `PORT` env (banyak hosting menentukan port sendiri), atau hardcode 4000?
4. **Binding host:** server listen di `0.0.0.0` atau hanya `localhost`? (Hosting biasanya butuh `0.0.0.0`.)
5. **Koneksi database:** apakah bisa dikonfigurasi lewat satu URL koneksi (`DATABASE_URL`-style) atau hanya lewat variabel terpisah? Dua-duanya boleh, tapi catat mana yang dipakai, karena Railway umumnya memberi URL tunggal sedangkan cPanel memberi host/user/password terpisah.
6. **Migrasi & benih:** bagaimana urutan menjalankan migrasi dan `npm run benih` di database kosong di server baru? Apakah sudah terdokumentasi urutannya?
7. **Health check:** apakah ada endpoint ringan (misal `/health`) untuk memastikan server hidup? Banyak hosting memakainya.
8. **Rahasia:** pastikan tidak ada secret/kredensial nyata yang ter-commit di repo (cek `.env`, riwayat file konfigurasi). `.env` harus tetap di luar git.
9. **Logging & error:** apakah error tidak membocorkan stack trace ke klien saat mode produksi (`NODE_ENV=production`)?
10. **Start script:** `npm start` menjalankan server dalam mode produksi dengan benar (bukan mode dev/watch)?

## Langkah 1 — Perbaiki yang kecil dan aman

Untuk temuan yang ringan dan tidak mengubah perilaku di laptop (contoh: baca `PORT` dari env dengan fallback ke 4000, binding `0.0.0.0`, tambah endpoint `/health` yang hanya mengembalikan status ok): perbaiki langsung dan commit terpisah per perbaikan.

Untuk temuan yang lebih besar atau butuh keputusan (contoh: ganti cara konfigurasi database): **jangan diubah**, cukup dicatat di laporan.

## Langkah 2 — Dokumentasi deployment

Tambahkan bagian "Deployment" di `server/README.md` yang berisi:
1. Daftar lengkap environment variable yang dibutuhkan beserta contoh nilai (tanpa nilai rahasia asli) — sinkronkan dengan `.env.example`
2. Urutan langkah di server baru: pasang dependensi → set env → jalankan migrasi → `npm run benih` → (opsional) tandai verifikasi konten → `npm start`
3. Cara memastikan server sehat (`/health`)
4. Catatan bahwa `ASAL_DIIZINKAN` (CORS) harus diisi asal yang benar di server produksi, dan bahwa aplikasi native (APK) tidak terkena CORS

## Langkah 3 — Test

- [ ] `npm test` tetap lolos semua (tidak ada regresi)
- [ ] Server tetap jalan normal di laptop dengan konfigurasi yang sudah ada (jalankan `npm start`, cek `/health` dan satu endpoint konten)
- [ ] Simulasi: jalankan server dengan `PORT=5555` dan `NODE_ENV=production` — pastikan benar-benar memakai port itu dan tidak membocorkan stack trace pada error

## Langkah 4 — Commit

Commit terpisah per perbaikan, plus satu commit dokumentasi.

## Definition of Done

- [ ] Ke-10 poin audit sudah dicatat kondisinya
- [ ] Perbaikan kecil (port env, binding, health check) sudah dilakukan tanpa mengubah perilaku lokal
- [ ] Bagian "Deployment" di README lengkap dan bisa diikuti orang yang belum pernah menjalankan server ini
- [ ] `npm test` lolos semua
- [ ] Tidak ada deploy, tidak ada akun layanan hosting dibuat

## Laporkan di akhir

- Tabel audit: 10 poin, kondisi, dan apakah diperbaiki atau hanya dicatat
- Temuan yang butuh keputusan Khalifa sebelum deploy (jika ada)
- Apakah backend ini sudah cocok dengan cPanel Node.js App (misal: butuh file entry tertentu, versi Node minimum) dan/atau Railway — tulis persyaratan yang kamu ketahui, tandai mana yang kamu yakin dan mana yang perlu dicek ke dokumentasi resmi hostingnya
- Commit hash
