# TASK: LANJUT_076 — Daftar Periksa Dua Mode (Kelas 12: Persyaratan; Kelas 7–11: Persiapan Event)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi.

## Konteks

Daftar Periksa sekarang menyimpan preferensi dan langkah pengguna, termasuk
persyaratan TKA untuk kelas 12. Untuk kelas 7–11, Khalifa minta Daftar Periksa
berubah menjadi persiapan event sekolah: pengguna mencatat ujian atau ulangan
(misalnya UTS), mapelnya, dan materinya. Materi bisa dihubungkan ke Arsip Belajar,
dan pengingatnya tampil di Beranda.

Ini menyentuh data anak di bawah 18 tahun (tanggal ujian dan mapel). Karena itu:
- Fitur dibangun lengkap, tetapi **dimatikan secara default** lewat saklar
  `event_sekolah_aktif` (bawaan `0`), sama seperti pola `ai_aktif`.
- Dengan saklar mati, pengguna tidak melihat fitur ini dan endpointnya menjawab
  403 `FITUR_BELUM_AKTIF`.
- Saklar baru dinyalakan setelah kebijakan privasi versi 2 ditinjau dan kebijakan
  dirilis. Task ini tidak mengubah saklar itu.

Kelas 12 tidak berubah. Persyaratan TKA tetap seperti sekarang.

## Yang Diminta

### A. Kelas 12: tidak berubah
1. Daftar Periksa kelas 12 tetap seperti sekarang, termasuk penyisipan dan
   penyimpanan persyaratan TKA. Tidak ada perubahan tampilan atau data untuk kelas 12.

### B. Kelas 7–11: Persiapan Event (hanya bila saklar aktif)
2. Saat saklar mati, Daftar Periksa kelas 7–11 tampil seperti sebelumnya
   (tanpa perubahan). Tidak ada tombol atau teks baru.
3. Saat saklar aktif, Daftar Periksa kelas 7–11 menampilkan daftar "Persiapan Event"
   dan tombol "Tambah event".
4. Isian satu event:
   - `jenis`: UTS, UAS, Ulangan, atau Lainnya (wajib)
   - `tanggal`: format `YYYY-MM-DD`, zona WIB, wajib, tidak boleh lebih dari 2 tahun ke depan
   - `mapel_id`: pilih dari daftar mapel yang sudah ada (opsional)
   - `materi_teks`: maks. 200 karakter, opsional, tanpa nama sekolah atau data
     pribadi lain (tidak ada pemeriksaan otomatis; ada kalimat petunjuk)
   - `kartu_id`: hubungkan ke satu kartu Arsip milik akun itu sendiri (opsional)
5. Pengguna bisa mengubah dan menghapus event. Hapus bersifat permanen (baris
   benar-benar dihapus, bukan dilembutkan).
6. Event yang sudah lewat tidak tampil di daftar utama, tetapi tetap ada sampai
   pengguna menghapusnya sendiri. Tidak ada penghapusan otomatis di task ini.

### C. Data dan endpoint (server)
7. Migrasi idempotent `020_event_sekolah.sql`: tabel `event_sekolah` dengan kolom
   `id`, `pengguna_id` (FK, hapus berjenjang), `jenis`, `tanggal`, `mapel_id`
   (nullable), `materi_teks` (nullable), `kartu_id` (nullable), `dibuat_pada`,
   `diubah_pada`. Indeks pada `(pengguna_id, tanggal)`.
8. Saklar `event_sekolah_aktif` disimpan di tabel `konfigurasi_levelin` atau
   tabel konfigurasi yang sudah ada, bukan berkas baru. Bawaan `0`.
9. Endpoint (hanya milik akun sendiri):
   - `GET /pengguna/event`: daftar event akun, diurutkan `tanggal` naik.
   - `POST /pengguna/event`: buat event. Validasi semua isian. `kartu_id` harus
     milik akun yang sama, selain itu 400 `KARTU_TIDAK_SAH`.
   - `PATCH /pengguna/event/:id`: ubah event milik akun sendiri. Lainnya 404.
   - `DELETE /pengguna/event/:id`: hapus permanen. Lainnya 404.
10. Semua endpoint menolak dengan 403 `FITUR_BELUM_AKTIF` bila saklar mati, dan
    dengan 403 `AI_BELUM_DIIZINKAN` (sama seperti gerbang kebijakan 075) bila akun
    belum menerima kebijakan privasi yang berlaku. Urutan cek: saklar dulu, lalu
    kebijakan, baru isi.
11. Kunci galat tetap `galat` dengan `kode`, `pesan`, dan `medan`.
12. Log server tidak memuat `materi_teks`, `tanggal`, atau `mapel_id`. Cukup ID
    dan kode galat.

### D. Pengingat di Beranda
13. Untuk kelas 7–11 dengan saklar aktif, Beranda menampilkan **satu** kartu
    "Persiapan Terdekat" bila ada event dalam rentang: 7 hari sebelum tanggal
    sampai tanggal itu sendiri (WIB). Jika ada lebih dari satu, tampilkan yang
    tanggalnya paling dekat.
14. Kartu menampilkan: jenis, mapel (jika ada), dan hitung mundur ("3 hari lagi",
    "Hari ini"). Tekan kartu membuka Daftar Periksa.
15. Posisi kartu: tepat setelah baris progres, sebelum grid ikon. Jika tidak ada
    event, kartu tidak tampil dan tidak ada ruang kosong.
16. Kartu tidak tampil saat data gagal dimuat, sesuai aturan 072.
17. Pengingat di Linimasa: tidak dibuat di task ini (Linimasa dan Beranda sama
    dalam app ini, jadi cukup satu tempat). Laporkan bila ternyata ada layar
    Linimasa terpisah.
18. Saat saklar mati, kartu ini tidak tampil sama sekali.

### E. Hubungan ke Arsip
19. Di setiap event, pilihan "Buka materi" membuka Arsip jika `kartu_id` terisi.
    Jika tidak, tombol tidak tampil.
20. Daftar kartu Arsip untuk pilihan `kartu_id` hanya menampilkan kartu milik akun
    itu, dan bisa difilter berdasarkan `mapel_id` yang dipilih.

### F. Teks
21. Semua teks baru (judul "Persiapan Event", label isian, petunjuk materi, pesan
    hapus, pesan validasi, dan kartu "Persiapan Terdekat") tercatat sebagai DRAF
    di `docs/salinan-teks-lanjut.md` dan lembar review.
22. Petunjuk untuk materi: "Tulis materinya singkat saja. Jangan tulis nama atau
    data pribadi." Teks ini wajib tampil di layar isian.

## Di luar task ini
- Mengaktifkan saklar `event_sekolah_aktif` (keputusan PM setelah review hukum).
- Notifikasi push.
- Mengubah kebijakan privasi atau menaikkan versinya.
- Integrasi AI untuk event atau pengingat.
- Mengubah persyaratan TKA kelas 12.
- Linimasa terpisah (lihat poin D.17).
- Pembersihan otomatis event lama.

## Definition of Done

- [ ] Kelas 12: Daftar Periksa tidak berubah; ada tes yang mengunci ini
- [ ] Saklar mati: kelas 7–11 tidak melihat fitur dan endpoint menjawab 403 `FITUR_BELUM_AKTIF`
- [ ] Saklar aktif: CRUD event bekerja untuk akun sendiri; akun lain menerima 404
- [ ] `kartu_id` milik akun lain ditolak dengan `KARTU_TIDAK_SAH`
- [ ] Urutan cek: saklar, kebijakan, lalu isi; ada tes untuk urutan ini
- [ ] Migrasi `020` dijalankan dua kali tanpa error
- [ ] Hapus benar-benar menghapus baris (dicek di database)
- [ ] Beranda: kartu muncul 7 hari sebelum sampai hari H, tepat satu, yang terdekat; hilang setelah hari H
- [ ] Hitung mundur dan tanggal memakai fungsi WIB yang sudah ada (`hariIniWib`); tidak ada logika tanggal baru di layar
- [ ] Log server tidak memuat `materi_teks`, `tanggal`, atau `mapel_id` (ada tes)
- [ ] Tes server minimal 20 kasus: mode kelas 12, saklar, kebijakan, validasi, lintas akun, pengingat 7 hari, hari H, sudah lewat, `kartu_id` lintas akun, log
- [ ] Mutasi, gagal lalu lulus: (a) hapus pengecekan saklar, (b) hapus pengecekan kepemilikan event, (c) tampilkan pengingat untuk kelas 12 juga
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Teks DRAF tercatat di `salinan-teks-lanjut.md` dan lembar review
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_076`

## Bukti 360 px (dengan saklar aktif hanya di browser uji)
- Akun kelas 12: Daftar Periksa seperti sebelumnya
- Akun kelas 7 dengan saklar mati: tidak ada fitur baru
- Akun kelas 7 dengan saklar aktif: tambah event, kartu "Persiapan Terdekat" di Beranda
- Simpan di `scratchpad/`, bukan di repo
- Saklar di database uji dinyalakan hanya untuk pengujian, lalu dikembalikan ke `0`, dan dilaporkan

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Nilai saklar sebelum dan sesudah pengujian, dan bukti dikembalikan ke `0`
- Hasil tes dan tiga mutasi (gagal lalu lulus)
- Bukti migrasi idempotent
- Letak kode kartu "Persiapan Terdekat" dan letak endpoint
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
