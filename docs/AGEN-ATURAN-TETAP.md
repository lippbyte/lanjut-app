# Aturan Tetap Agen — Proyek LANJUT

Baca berkas ini **sebelum mengerjakan task apa pun**. Berlaku untuk semua
agen (Claude Code, Antigravity, atau lainnya). Taruh di repo sebagai
`docs/AGEN-ATURAN-TETAP.md`. Bila agen mendukung berkas aturan proyek,
jadikan berkas ini aturan proyek juga. Bahasa kerja: Indonesia.

## 1. Batas keras (tanpa izin tertulis Khalifa di task, jangan dilanggar)

- Jangan mengisi, meminta, mencetak, atau meng-commit `OPENROUTER_API_KEY`
  atau rahasia apa pun. `.env` tidak boleh ikut commit.
- Jangan memanggil layanan luar. Satu-satunya pengecualian: membaca
  dokumentasi publik untuk memastikan nama parameter atau pustaka.
- Jangan `git push`, deploy, `eas build`, `eas update`, atau apa pun yang
  mengunggah kode ke luar komputer. Itu keputusan Khalifa.
- Jangan menjalankan `npm audit fix` di folder app (Expo SDK 57; perbaikan
  otomatis akan menarik SDK 58 dan merusak app).
- Jangan menulis ulang atau menghapus riwayat git.
- Jangan menghapus, melewati (`.skip`), atau melonggarkan tes supaya lulus.
  `todo` yang sudah tercatat boleh tetap `todo` dan harus disebut di laporan.
- Jangan mengubah ambang Level-In, daftar kartu bantuan terverifikasi, atau
  mematikan penjaga keselamatan kecuali task meminta persis itu.

## 2. Keselamatan dan privasi tidak boleh mundur

- Isi chat, kueri pencarian, dan potongan modul tidak boleh disimpan di
  server atau masuk log. Log dan tabel pemantauan hanya angka/penanda.
- Deteksi tanda bahaya akut berjalan **sebelum** batas laju, gerbang
  persetujuan, dan saklar. Pesan akut dijawab server tanpa AI dan tidak
  boleh dikirim ke penyedia, termasuk lewat riwayat.
- Kartu bantuan hanya dari `server/config/kartu-bantuan.json`, hanya entri
  `terverifikasi: true`. SAPA 129 tetap tersembunyi sampai Khalifa
  memverifikasinya.
- `ai_aktif` bawaan aman (0) di produksi. Nilai di instalasi yang sudah ada
  tidak diubah diam-diam.
- Semua endpoint bersifat per akun. Hal baru yang menyentuh data akun
  wajib punya tes lintas akun.

## 3. Cara kerja

1. Baca seluruh task sampai selesai, lalu baca kode terkait sebelum mengubah.
2. Bila ada yang ambigu, pilih tafsir paling aman dan catat sebagai
   "keputusan yang saya ambil sendiri" di laporan. Jangan berhenti hanya
   untuk bertanya hal kecil.
3. Perubahan basis data hanya lewat migrasi bernomor berikutnya. Jangan
   mengedit migrasi lama.
4. Setiap perubahan perilaku punya tes otomatis. Tes keselamatan harus
   terbukti gagal bila penjaganya dicabut sementara (cabut, jalankan, kembalikan).
5. Sebelum commit: `npm test` (server), `npm run periksa-sql`, dan `tsc`
   untuk server dan app. Commit kecil dengan pesan jelas. Jangan
   meng-commit data siswa atau tangkapan layar yang memuat data nyata.
6. Fungsi dulu, tampilan belakangan. Teks baru yang tampil ke siswa ditandai
   DRAF dan dicatat di `salinan-teks-lanjut.md`.

## 4. Kejujuran laporan

- "Selesai" hanya untuk yang benar-benar dijalankan. Sertakan angka hasil
  (mis. "380 tes, 377 lolos, 3 todo").
- Tandai terang-terangan yang tidak sempat atau tidak bisa diuji
  (mis. belum dicoba di HP Android).
- Jangan mengarang nomor baris, hasil, atau bukti. Bila tidak yakin, katakan.
- Bila tes gagal, laporkan gagalnya. Jangan disembunyikan.

## 5. Format laporan akhir

1. Commit hash
2. Yang berubah (ringkas)
3. Hasil tes (angka) dan perintah yang dijalankan
4. Yang belum atau tidak diuji
5. Keputusan yang saya ambil sendiri
6. Temuan baru yang tidak diperbaiki

## 6. Bila terhenti

Berhenti dan laporkan apa yang terjadi. Jangan mengakali batas keras di
atas, jangan mengubah tujuan task, dan jangan mengerjakan hal lain sebagai
gantinya tanpa menyebutkannya.
