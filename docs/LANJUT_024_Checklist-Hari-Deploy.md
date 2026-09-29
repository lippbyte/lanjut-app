# Checklist Hari Deploy (Backend + APK)

**Target:** dikerjakan sekitar 2-3 Oktober 2026, sisakan buffer sebelum 4 Oktober.
**Status dokumen:** perencanaan untuk Khalifa. Bukan task Claude Code. Beberapa langkah memang hanya bisa dilakukan manusia (login hosting, cek panel).

Tanda: 👤 = kamu sendiri, 🤖 = bisa diserahkan ke Claude Code, ⚠️ = detail hosting yang harus dicek ke dokumentasi resmi, jangan diandalkan dari catatan ini.

---

## A. Sebelum hari-H (bisa dicicil sekarang)

- [ ] 👤 **Cek panel Rumahweb (±10 menit):** ada "Setup Node.js App"? Node 20+ tersedia? Database MySQL 8 atau MariaDB, versi berapa (butuh MariaDB 10.2+)? Ada Remote MySQL / Git Version Control?
- [ ] 👤 **Putuskan hosting:** kalau salah satu jawaban di atas tidak cocok (misalnya tidak ada Node 20+), langsung pilih Railway, jangan memaksa Rumahweb.
- [ ] 👤 `git push origin main`, semua commit sampai LANJUT_023 sudah di remote.
- [ ] 👤 Cek teks di form Daftar: pengguna adalah siswa, banyak yang di bawah 18 tahun, dan app menyimpan nama pengguna, email opsional, kelas, dan prodi impian. Pastikan ada kalimat singkat tentang data apa yang disimpan dan untuk apa. Ini bukan nasihat hukum; kalau ragu, tanyakan ke guru atau pihak sekolah yang paham aturan data pribadi anak.

## B. Hari-H: menyiapkan server

- [ ] 👤 Buat database kosong + user database di hosting. Catat host, nama DB, user, password (simpan di tempat aman, jangan di chat atau repo).
- [ ] 👤 Unggah folder `server/` (tanpa `node_modules`, tanpa `.env`).
- [ ] 👤 Salin folder data konten dari `MVP-PWA/data` menjadi `data-konten` di server (langkahnya di `server/README.md` bagian data konten).
- [ ] 👤 Isi env di server (mengikuti `.env.production.example`): kredensial DB, `LOKASI_DATA_KONTEN=data-konten`, `NODE_ENV=production`.
- [ ] 👤 ⚠️ `JUMLAH_PROXY`: contoh di templat 1, tapi **harus dipastikan** ke dokumentasi/support hosting. Salah angka membuat batas laju tidak efektif atau bisa diakali.
- [ ] 👤 ⚠️ `ASAL_DIIZINKAN` (CORS): APK native tidak terkena CORS, tapi kalau nanti ada versi web, isi dengan asal yang benar. Jangan `*`.
- [ ] 👤 Jalankan sesuai urutan README: `npm install` → migrasi → `npm run benih` → `npm start`.

## C. Hari-H: memastikan server sehat

- [ ] 👤 Buka `https://[domain-backend]/api/v1/sehat` → harus menjawab OK.
- [ ] 👤 Buka `.../api/v1/konten/linimasa` → harus menjawab data.
- [ ] 👤 Daftar satu akun uji lewat curl atau Postman → 201 dan dapat token.
- [ ] 🤖 Tandai verifikasi TKA di server produksi memakai `npm run verifikasi-konten` (data TKA sudah diverifikasi di database lokal; **database server terpisah, tanda itu tidak ikut**). `--tanggal` = tanggal pengecekan, dan cocokkan ulang ke siaran pers Kemendikdasmen sebelum menandai.
- [ ] 👤 Cek Linimasa di endpoint produksi menampilkan tiga tahapan TKA dengan tanggal benar.

## D. Hari-H: build ulang APK ke server publik

- [ ] 🤖 Ubah `EXPO_PUBLIC_API_URL` di `LANJUT_App/eas.json` ke URL publik backend (bukan IP LAN lagi).
- [ ] 🤖 ⚠️ **Pakai `https://`.** Android modern umumnya memblokir lalu lintas `http://` polos dari aplikasi. Kalau hosting belum punya SSL aktif, aktifkan dulu (di cPanel biasanya tersedia sertifikat gratis; di Railway otomatis). Minta Claude Code memastikan bagaimana konfigurasi cleartext di proyek ini sekarang.
- [ ] 🤖 Jalankan Metro/build dengan cache bersih (`--clear`) agar konfigurasi lama tidak menempel (pelajaran dari misteri port 4900).
- [ ] 🤖 `eas build` profil preview. Ingat: pengecekan ukuran paket sudah beres (19 MB), tapi pastikan `LANJUT_App/build/` tetap di `.gitignore` root.
- [ ] 👤 Unduh APK, pasang di **minimal 2 HP fisik**, **pakai data seluler/WiFi berbeda dari laptop** (ini uji sesungguhnya: bukti bahwa app tidak lagi bergantung pada jaringan lokal).

## E. Uji di HP (setelah APK terpasang)

- [ ] Daftar akun baru → langsung masuk
- [ ] Keluar → masuk lagi → sesi bertahan setelah app ditutup dan dibuka
- [ ] Linimasa menampilkan tenggat TKA yang benar
- [ ] Daftar Periksa: centang → tutup app → buka lagi → centang tetap ada; hapus centang → tetap terhapus
- [ ] Ganti akun di HP yang sama → tidak ada data akun sebelumnya yang tersisa
- [ ] Matikan data seluler sebentar → muncul keadaan galat yang jelas (bukan crash), nyalakan lagi → pulih
- [ ] Tidak ada layar yang crash saat dibuka

## F. Rencana mundur (kalau ada yang gagal)

- Deploy server gagal atau tidak stabil → jangan hapus apa pun di lokal, backend laptop tetap bisa dipakai untuk demo internal di jaringan yang sama.
- APK baru bermasalah → APK lama (IP LAN) masih bisa dipakai untuk demo selama laptop dan HP satu jaringan.
- Jangan mengumumkan ke 50 calon pengguna sebelum bagian E lolos di minimal 2 HP.

## G. Setelah rilis: jadwal cek manual

- ~20 Oktober: pastikan jadwal pelaksanaan TKA (26 Okt–8 Nov) tidak berubah.
- Akhir November: cek tanggal pengumuman hasil TKA.
- Awal-pertengahan Desember: cek rilis jadwal SNBP/SNBT 2027 di sumber resmi. Ingat aturan main: hanya sumber resmi, dan waspadai domain tiruan.
- Setiap konten di JSON diubah: timpa `data-konten` di server → `npm run benih` → tandai verifikasi ulang.

## Item terbuka yang belum ada keputusannya

- Nilai `JUMLAH_PROXY` (tergantung hosting)
- MySQL 8 vs MariaDB (tergantung hasil cek panel)
- Mode tamu tetap dihapus (keputusan sebelumnya), artinya semua calon pengguna wajib daftar akun dulu. Pantau apakah ini menghambat: kalau banyak yang berhenti di layar Daftar saat uji dengan siswa, itu sinyal untuk meninjau ulang.
