# TASK: LANJUT_049 — Unggah Modul di Arsip Belajar

## Konteks

Keputusan Khalifa untuk AI Ngobrol (spek, Keputusan 1): AI boleh
menjelaskan materi mapel dengan sumber utama **modul di Arsip Belajar
yang diunggah siswa**, dibandingkan dengan pencarian web dan penalaran
AI. Sekarang Arsip hanya menyimpan kartu teks (F6) dan belum bisa
mengunggah modul. Task ini membangun fitur unggah modul itu.

Task ini **tidak bergantung pada AI** dan berguna sendiri: siswa bisa
menyimpan dan mencari materinya di LANJUT.

**Batasan keras yang TETAP berlaku:**
- Tidak ada panggilan ke layanan AI, OCR, embedding, atau API luar mana
  pun. Ekstraksi teks dan pencarian dilakukan sepenuhnya di server
  sendiri.
- Isi modul tidak dikirim ke luar sistem dengan cara apa pun.
- Pengambilan potongan untuk dijawab AI TIDAK dibangun di sini; itu
  bagian task backend AI nanti. Task ini hanya menyiapkan datanya.

**Prioritas tetap: fungsi dulu.** Tampilan sederhana, teks baru DRAF.

**Nilai awal yang dipakai (konservatif, bisa diubah Khalifa lewat
konfigurasi tanpa mengubah kode):**
- Format: `.txt`, `.md`, dan PDF yang berisi teks. PDF hasil pindai
  (tanpa teks) ditolak dengan pesan jelas; tanpa OCR di versi ini.
- Ukuran berkas maksimal 5 MB, teks hasil ekstraksi maksimal 200.000
  karakter, maksimal 10 modul per akun.
- Yang disimpan hanya teks hasil ekstraksi, **bukan berkas aslinya**.
  Berkas dibuang setelah diekstrak.

## Yang Diminta

### 1. Data (server)
Migrasi baru, mengikuti pola `kartu` dan `butir_pribadi`:
- Tabel modul per akun: judul, `mapel_id` (pakai 10 mapel yang sudah
  ada, wajib dipilih), teks hasil ekstraksi, jumlah karakter, nama
  berkas asli (hanya untuk tampilan), waktu unggah.
- Tabel potongan teks per modul (sekitar 800 sampai 1.200 karakter per
  potongan, dibelah di batas kalimat atau paragraf kalau bisa) dengan
  indeks **FULLTEXT MySQL**. Jangan memakai layanan embedding eksternal;
  pencarian semantik berbasis pihak ketiga ditolak karena akan
  mengirim isi modul ke luar.
- Batas (ukuran, karakter, jumlah modul) disimpan di tabel konfigurasi
  yang sudah ada, bukan ditulis di kode. Pastikan kunci-kunci ini tidak
  ikut terkirim di endpoint konfigurasi publik (seperti pada kunci
  persetujuan).

### 2. Endpoint (semua wajib login, hanya milik sendiri)
- Unggah modul (berkas atau teks yang ditempel), dengan judul dan mapel.
- Daftar modul sendiri (tanpa isi lengkap).
- Lihat satu modul (isi lengkap, untuk dibaca siswa).
- Cari di modul sendiri: `GET /modul/cari?q=...` mengembalikan potongan
  yang cocok beserta judul modul. Ini dipakai untuk menguji relevansi
  dan nanti dipakai backend AI; pencarian hanya di data akun itu.
- **Hapus modul secara permanen** (bukan hapus lunak): teks dan semua
  potongannya benar-benar hilang dari basis data. Sediakan juga
  "hapus semua modul saya".

### 3. Keamanan unggahan
- Periksa tipe berkas yang sebenarnya (bukan hanya ekstensi), tolak
  yang tidak cocok.
- Batas ukuran ditegakkan di server, bukan hanya di app.
- Ekstraksi PDF memakai pustaka lokal tanpa akses jaringan, dengan
  batas waktu. Tolak PDF terenkripsi atau yang tidak menghasilkan teks,
  dengan pesan yang jelas bagi siswa.
- Jangan pernah mengeksekusi atau menyajikan ulang berkas asli. Isi
  disimpan dan ditampilkan sebagai teks biasa.
- Laporkan pustaka ekstraksi yang dipilih, lisensinya, dan alasannya.

### 4. Layar Expo
- Di Arsip Belajar: bagian "Modul" dengan tombol Unggah, daftar modul
  (judul, mapel, tanggal), lihat isi, dan hapus dengan konfirmasi.
- Form unggah: pilih berkas (atau tempel teks), judul, mapel.
- **Peringatan sebelum unggah (DRAF):** unggah hanya materi pelajaran;
  jangan unggah dokumen berisi data pribadi (nama lengkap, nomor, rapor,
  foto identitas); unggah hanya materi yang boleh kamu pakai untuk
  belajar pribadi. Ikuti pola teks DRAF di `salinan-teks-lanjut.md`.
- Pesan galat ramah untuk setiap penolakan (tipe, ukuran, batas jumlah,
  PDF tanpa teks).
- Cache modul dibuang saat ganti akun (seperti cache kartu dan butir).

### 5. Dokumen privasi
- Tambahkan "teks modul yang diunggah siswa" ke daftar data pribadi di
  draf kebijakan privasi (`docs/`), termasuk bahwa berkas asli tidak
  disimpan dan modul bisa dihapus permanen oleh siswa.
- **Jangan menaikkan versi kebijakan sendiri.** Laporkan bahwa
  penambahan data ini kemungkinan perlu versi baru, dan ingatkan aturan
  rilis: app dengan teks baru dulu, baru naikkan versi.

### 6. Jangan sentuh
- Jangan memblokir fitur lain berdasarkan persetujuan di task ini.
- Jangan mengubah endpoint dan layar kartu F6 selain yang diperlukan
  untuk menaruh bagian "Modul" di Arsip.
- Jangan membangun pemanggilan AI atau pengambilan konteks untuk AI.

## Test

- [ ] Unggah `.txt` dan `.md`: tersimpan, teks dan potongan terbentuk
- [ ] Unggah PDF berisi teks: teks terekstrak benar
- [ ] PDF pindai atau tanpa teks, PDF terenkripsi: ditolak dengan pesan jelas
- [ ] Berkas dengan ekstensi `.pdf` tapi isi bukan PDF: ditolak
- [ ] Berkas melebihi batas ukuran, teks melebihi batas karakter, dan modul ke-11: ditolak
- [ ] Mengubah batas di konfigurasi langsung berlaku tanpa mengubah kode
- [ ] Pencarian mengembalikan potongan yang relevan dari modul sendiri
- [ ] **Lintas akun:** akun B tidak bisa melihat, mencari, mengambil, atau menghapus modul akun A; hasil pencarian B tidak pernah memuat potongan A
- [ ] Hapus modul: baris modul dan semua potongannya hilang dari basis data (cek dengan SELECT); "hapus semua" juga
- [ ] Berkas asli tidak tersimpan di disk server setelah ekstraksi
- [ ] Tidak ada request ke domain eksternal (cek log jaringan dan pencarian kode untuk nama layanan luar)
- [ ] Tes lama tetap lolos; typecheck 0 error; periksa-sql lulus

## Definition of Done

- [ ] Siswa bisa mengunggah, melihat, mencari, dan menghapus permanen modul miliknya
- [ ] Batas disimpan di konfigurasi dan tidak bocor ke endpoint publik
- [ ] Tidak ada panggilan jaringan keluar dan tidak ada layanan eksternal
- [ ] Teks baru DRAF dan draf kebijakan privasi diperbarui
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Struktur tabel dan endpoint baru
- Pustaka ekstraksi PDF yang dipilih, lisensi, dan alasannya
- Nilai batas default dan di mana mengubahnya
- Hasil uji relevansi pencarian (contoh pertanyaan dan potongan yang kembali), termasuk keterbatasan pencarian kata kunci dibanding pencarian makna
- Bagian draf kebijakan yang diubah, dan catatan soal versi kebijakan
- Screenshot layar Modul, form unggah, dan pesan penolakan
- Konfirmasi: tidak ada kode yang memanggil API eksternal
