# TASK: Env untuk Lokasi Folder Data Konten (Benih di Server)

## Konteks

Dari LANJUT_022: `npm run benih` membaca data dari `../../MVP-PWA/data`, yaitu di luar folder `server/`. Kalau di hosting yang diunggah hanya folder `server/`, benih gagal dan database produksi kosong.

**Solusi yang sudah diputuskan:** tambah satu env variable untuk menentukan lokasi folder data, dengan **nilai bawaan tetap `../../MVP-PWA/data`** supaya perilaku di laptop tidak berubah sama sekali.

**Jangan ubah logika benih, skema database, atau isi data.** Jangan pindahkan folder data. Jangan deploy ke mana pun.

## Langkah 1 — Implementasi

1. Di `benih.js` (dan file lain yang membaca folder data itu, cek juga skrip `verifikasi-konten` dan yang lainnya kalau ada), ganti path tetap dengan nilai dari env, misalnya `LOKASI_DATA_KONTEN`.
2. Bawaan: `../../MVP-PWA/data` (relatif seperti sebelumnya). Kalau env diisi, pakai nilai itu; boleh path absolut maupun relatif terhadap folder kerja server.
3. Tambahkan pemeriksaan awal: kalau folder tidak ditemukan, benih berhenti dengan pesan yang jelas menyebut path yang dicari dan menyarankan cek env `LOKASI_DATA_KONTEN`. Jangan gagal dengan error samar.
4. Cek juga apakah ada tempat lain di `server/` yang membaca ke luar folder `server/` (misalnya validasi rumpun dari file prodi). Kalau ada, gunakan env yang sama dan laporkan.

## Langkah 2 — Dokumentasi

1. Tambahkan `LOKASI_DATA_KONTEN` ke `.env.example` dengan komentar singkat.
2. Update bagian "Deployment" di `server/README.md` (dari LANJUT_022): jelaskan bahwa di server, folder `data` dari `MVP-PWA/data` perlu disalin (misalnya ke `server/data-konten/`) lalu `LOKASI_DATA_KONTEN` diarahkan ke situ. Tulis langkahnya dengan bahasa yang bisa diikuti orang non-programmer.

## Langkah 3 — Test

- [ ] `npm test` tetap lolos semua (66/66 atau lebih)
- [ ] Tanpa env: `npm run benih` di database kosong bekerja persis seperti sebelumnya (jumlah baris per tabel sama)
- [ ] Dengan env: salin folder data ke lokasi sementara di luar repo, set `LOKASI_DATA_KONTEN` ke sana, jalankan benih di database kosong → hasil sama persis. Hapus lokasi sementara dan database sementara setelahnya.
- [ ] Env diisi path yang salah → pesan galat jelas, tidak ada data yang tertulis

## Langkah 4 — Commit

- Commit terpisah: kode, lalu dokumentasi

## Definition of Done

- [ ] Benih bisa dijalankan dari folder data di lokasi mana pun lewat env
- [ ] Perilaku bawaan di laptop tidak berubah
- [ ] Path salah menghasilkan pesan yang jelas
- [ ] README dan `.env.example` diperbarui
- [ ] `npm test` lolos semua

## Laporkan di akhir

- Daftar file yang diubah
- Apakah ada bagian lain di `server/` yang juga membaca ke luar folder `server/`
- Konfirmasi tiga skenario test (tanpa env, dengan env, path salah)
- Commit hash
