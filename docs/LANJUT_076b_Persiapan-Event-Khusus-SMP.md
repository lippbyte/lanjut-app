# TASK: LANJUT_076b — Persiapan Event Khusus SMP, Teks Kelas 12 Dihapus, dan Materi dari Sumber Resmi

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada scraping, unduhan otomatis, atau
pengambilan soal dari situs mana pun. Tidak ada perubahan firewall. Tidak
menambah paket baru. Tidak menaikkan versi kebijakan privasi. Saklar
`event_sekolah_aktif` tetap `0`.

## Konteks

LANJUT_076 sudah di-commit (`160650b`). PM memutuskan lima hal berikut.

1. **Persiapan Event hanya untuk SMP (kelas 7–9).** Kelas 10–11 tidak mendapat
   Persiapan Event. Pengingat Beranda juga hanya untuk SMP.
2. **Teks "Bagian ini untuk kelas 12 … Versi untuk kelas 7 sedang kami siapkan."
   dihapus** dari halaman Daftar Periksa untuk siswa SMP. Halaman itu harus berisi
   konten yang sesuai untuk SMP, bukan kalimat tentang kelas 12.
3. **Jenis event disesuaikan untuk SMP:** UTS, UAS/PAS, Ulangan Harian, TKA
   (untuk kelas 9), dan Lainnya.
4. **Materi boleh berasal dari sumber resmi**, misalnya bahan dari situs
   Kemendikdasmen. Pengambilannya dilakukan manual oleh tim konten, bukan oleh
   app. App hanya menampilkan kartu yang sudah diverifikasi dan dilengkapi sumber.
5. **Data yang sudah ada dibiarkan.** Tidak ada migrasi atau penghapusan data
   yang sudah tersimpan.

Keputusan PM yang belum dijawab dan diberi nilai bawaan dalam task ini:
- **Tautan materi yang sudah mati:** tampilkan "Materi ini sudah tidak tersedia"
  tanpa tombol. Data tidak diubah.
- **Event lama akun yang naik ke kelas 12:** tetap tersimpan dan tidak tampil,
  sampai akun dihapus. Tidak ada penghapusan otomatis di task ini.

## Yang Diminta

### A. Batasi ke SMP
1. Persiapan Event (isian, daftar, tombol "Tambah event", dan kartu Beranda
   "Persiapan Terdekat") hanya tampil untuk kelas 7–9.
2. Kelas 10–11 dan kelas 12 melihat Daftar Periksa seperti sebelum 076.
3. Di server, `POST`, `PATCH`, `DELETE`, dan `GET /pengguna/event` menjawab
   403 `KELAS_TIDAK_DIDUKUNG` untuk akun di luar kelas 7–9. Urutan cek menjadi:
   login → saklar → kebijakan → kelas → isi.

### B. Hapus teks kelas 12 dari halaman SMP
4. Cari setiap kalimat yang menyebut "kelas 12" atau "Versi untuk kelas 7" di
   halaman Daftar Periksa yang dilihat siswa SMP. Hapus dari tampilan SMP.
   Teks itu tetap ada untuk kelas 12 bila memang dibutuhkan di sana.
5. Ganti dengan teks DRAF netral untuk SMP, misalnya:
   "Catat ujian dan ulangan yang akan datang, supaya kamu bisa menyiapkan diri
   lebih awal." Tandai DRAF dan catat di salinan teks.
6. Tes: halaman Daftar Periksa untuk akun kelas 7–9 tidak memuat kata "kelas 12"
   atau "Versi untuk kelas 7".

### C. Jenis event untuk SMP
7. Pilihan `jenis` menjadi: UTS, UAS/PAS, Ulangan Harian, TKA, Lainnya.
   Nilai lama (misalnya "UAS" tanpa "/PAS") tetap sah dan tidak dimigrasi.
   Tambahkan `PAS` sebagai nilai sah bila belum ada.
8. Tes: jenis di luar daftar ditolak dengan `VALIDASI_GAGAL`.

### D. Materi dari sumber resmi
9. `kartu_id` pada event boleh mengarah ke dua jenis kartu:
   - kartu Arsip milik akun itu sendiri (aturan 076), atau
   - kartu kurasi yang berstatus `terverifikasi` dan memiliki `sumber` serta
     `url_sumber` (https).
10. Kartu kurasi yang belum terverifikasi tidak boleh dihubungkan. Pemilihan
    `kartu_id` dari sisi app hanya menampilkan kedua jenis kartu yang sah.
11. Di layar event, kartu kurasi tampil dengan teks "Sumber: [nama sumber]" dan
    tombol "Buka materi". Kartu milik akun sendiri tetap seperti 076.
12. Tidak ada endpoint baru untuk mengambil materi dari internet. Tidak ada
    kode yang mengambil berkas dari situs resmi.
13. Dokumen panduan untuk tim konten (satu halaman) ditulis di
    `docs/verifikasi/panduan-materi-sumber-resmi.md`, isinya:
    - hanya ambil dari situs resmi pemerintah, dan catat URL dan tanggal akses;
    - soal ujian nasional atau TKA yang tidak dipublikasikan tidak boleh diunggah;
      hanya contoh soal atau materi ajar yang dipublikasikan secara resmi;
    - cek syarat penggunaan situs dan hak cipta sebelum mengunggah;
    - setelah unggah, tim konten mengisi status verifikasi lewat skrip yang ada,
      dengan `--ya`;
    - jika ragu apakah boleh dipakai, tanyakan PM, jangan dipasang.

### E. Tautan materi yang sudah mati
14. Jika kartu yang terhubung sudah dihapus atau statusnya bukan terverifikasi
    (untuk kartu kurasi), tampilkan "Materi ini sudah tidak tersedia" tanpa
    tombol "Buka materi". `kartu_id` tidak diubah.
15. Tes: kartu yang dihapus menampilkan teks itu dan tidak ada tombol.

### F. Pengingat Beranda
16. Kartu "Persiapan Terdekat" hanya tampil untuk akun kelas 7–9 dengan saklar aktif.
    Logika 7 hari sebelum sampai hari H tidak berubah.
17. Untuk kelas 10–12, kartu ini tidak tampil dan tidak ada ruang kosong.

### G. Data
18. Event yang sudah tersimpan untuk akun kelas 10–12 tidak dihapus dan tidak
    tampil. Tidak ada migrasi.

### H. Teks
19. Semua teks baru dan yang diubah masuk `docs/salinan-teks-lanjut.md` sebagai
    DRAF dan lembar review. Hapus dari lembar review teks kelas 12 yang sudah
    tidak dipakai di SMP, dengan catatan.

## Di luar task ini
- Mengambil atau memasang soal ujian dari situs resmi (ditangani tim konten secara manual).
- Bank soal dan F9. F9 tetap terblokir sampai ada mitra.
- Mengaktifkan saklar `event_sekolah_aktif`.
- Notifikasi push, integrasi AI, atau perubahan kebijakan privasi.
- Migrasi, penghapusan data, atau penghapusan otomatis event kelas 10–12.
- Mengubah persyaratan TKA kelas 12.

## Definition of Done

- [ ] Persiapan Event dan kartu Beranda hanya untuk kelas 7–9 (app dan server)
- [ ] Server menjawab 403 `KELAS_TIDAK_DIDUKUNG` untuk kelas 10–12; urutan cek benar; ada tes
- [ ] Halaman SMP tidak memuat "kelas 12" atau "Versi untuk kelas 7"; ada tes
- [ ] Jenis event SMP: UTS, UAS/PAS, Ulangan Harian, TKA, Lainnya; ada tes
- [ ] `kartu_id` ke kartu kurasi belum terverifikasi ditolak; ke kartu milik akun lain ditolak
- [ ] Kartu kurasi terverifikasi tampil dengan "Sumber: …" dan tombol "Buka materi"
- [ ] Kartu yang sudah dihapus menampilkan "Materi ini sudah tidak tersedia" tanpa tombol; ada tes
- [ ] Tidak ada kode yang mengambil berkas dari internet; dibuktikan dengan pencarian kode (`fetch`, `http`, `curl` di luar localhost)
- [ ] Panduan `panduan-materi-sumber-resmi.md` ada dan isinya sesuai poin 13
- [ ] Event kelas 10–12 yang sudah ada tidak berubah (dicek di database)
- [ ] Migrasi tidak ditambahkan; migrasi 020 tetap idempoten
- [ ] Saklar `event_sekolah_aktif` bernilai `0` setelah task selesai (dicek di database)
- [ ] Tes server baru minimal 10 kasus untuk poin di atas
- [ ] Mutasi, gagal lalu lulus: (a) hapus pembatasan kelas di server, (b) izinkan kartu kurasi belum terverifikasi, (c) tampilkan teks kelas 12 kembali untuk SMP
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Teks DRAF tercatat di salinan teks dan lembar review
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_076b`

## Bukti 360 px (dengan saklar aktif hanya di database uji, lalu dikembalikan ke `0`)
- Akun kelas 7: Daftar Periksa SMP dengan teks baru, tanpa kata "kelas 12"
- Akun kelas 7: event dengan kartu kurasi terverifikasi dan "Sumber: …"
- Akun kelas 7: event dengan kartu yang dihapus, menampilkan "tidak tersedia"
- Akun kelas 10: Daftar Periksa seperti sebelum 076, tanpa Persiapan Event
- Simpan di `scratchpad/`, bukan di repo

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar kalimat kelas 12 yang dihapus dari tampilan SMP, dan letaknya di kode
- Hasil tes dan tiga mutasi (gagal lalu lulus)
- Nilai saklar sebelum dan sesudah, dibuktikan dari database
- Hasil pencarian kode untuk pengambilan berkas dari internet
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
