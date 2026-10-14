# TASK: LANJUT_077 — Rekomendasi Latihan Level-In di Beranda, dan Dua Perbaikan dari 076b

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada scraping atau pengambilan berkas dari
internet. Tidak ada perubahan firewall. Tidak menambah paket baru. Tidak
menaikkan versi kebijakan privasi. Tidak memanggil AI (OpenRouter) dari fitur ini.
Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`.

## Konteks

LANJUT_076b sudah di-commit (`d462638`) dan diterima bersyarat. PM menjawab
keputusan yang menunggu dengan **sesuai rekomendasi**, sehingga keputusan berikut
berlaku sekarang:

1. **Migrasi `021_event_sekolah_jenis_smp.sql` diterima.** Alasannya ENUM `jenis`
   tidak bisa diperluas tanpa DDL. Migrasi hanya menambah nilai di akhir dan tidak
   mengubah data.
2. **Di app, TKA hanya tampil untuk kelas 9.** Server tetap menerima TKA dari semua
   akun SMP. Pembatasan ini diterima. Tes server tidak diubah.
3. **"Buka materi" membuka panel di dalam kartu event**, bukan membuka Arsip. Diterima.
4. **Benih kartu kurasi** (yang sebelumnya selalu menulis `penyedia` dan `url_sumber`
   NULL) sudah diperbaiki. Diterima.
5. **Tautan materi yang mati** memakai nilai bawaan: "Materi ini sudah tidak tersedia",
   tanpa tombol. Diterima.
6. **Event lama akun yang naik ke kelas 12** tetap tersimpan dan tidak tampil. Tidak
   ada penghapusan otomatis. Diterima.
7. **Kartu tambahan "Eksplorasi Kampus" untuk kelas 12** dipertahankan. Tidak diubah
   di task ini.
8. **Server 4000 dan 8081**: belum ada jawaban siapa yang memulainya. Pertanyaan ini
   tidak menghalangi 077. Verifikasi server tetap tercatat sebagai belum dilakukan.
   Eksekutor tidak menyalakan server. Khalifa yang menjalankan `npm start` bila perlu.

Dua hal dari laporan 076b yang harus dibereskan di task ini:
- Teks Data Akun untuk SMP masih berbunyi "… tampil di sini saat kamu kelas 12.".
  Ini jenis teks yang sama dengan yang sudah diminta dihapus dari halaman SMP.
- Akun uji kelas 10 masih punya satu event sisa dari tes yang gagal di tengah.

Level-In sudah dibangun di 042. Metriknya: kalibrasi keyakinan (disalin dari PWA)
dan level akurasi (tabel fallback). Ambangnya ada di `konfigurasi_levelin`: 5
jawaban untuk kalibrasi, 10 untuk level. Saran harian hanya dibuat dari jawaban
yang diberi tingkat keyakinan. Ragu dan Tebak diperlakukan sama.

## Yang Diminta

### A. Kartu "Latihan Berikutnya" di Beranda
1. Tambahkan satu kartu di Beranda untuk akun yang punya akses Latihan (semua jenjang).
   Judul kartu DRAF: "Latihan berikutnya". Isi kartu: satu mapel atau modul latihan
   dan tombol "Mulai latihan".
2. Sumber data hanya dari tabel hasil latihan yang sudah ada dan fungsi saran harian
   dari 042. Tidak ada tabel baru dan tidak ada pengumpulan data baru.
3. Ambang tetap dibaca dari `konfigurasi_levelin`. Tidak ada angka yang ditulis
   tetap di kode.
4. Jika data belum cukup, kartu tidak tampil dan tidak ada ruang kosong.
5. Jika data gagal dimuat, kartu tidak tampil (aturan 072).
6. Tekan "Mulai latihan" membuka layar Latihan dengan mapel atau modul yang sama.
7. Posisi kartu: **tepat setelah grid ikon, sebelum Info Penting.** Ini rekomendasi
   eksekutor. Laporkan bila ada alasan teknis untuk posisi lain.
8. Logika saran tidak memanggil AI. Perhitungan dilakukan server secara deterministik.
   Endpoint hanya membaca data akun sendiri (`GET`). Akun lain menerima 404 atau
   respons kosong, bukan data orang lain.
9. Tanggal atau hari ini memakai `hariIniWib` bila ada. Tidak ada logika tanggal baru.
10. Teks baru (judul, tombol, dan teks kosong bila ada) masuk
    `docs/salinan-teks-lanjut.md` sebagai DRAF dan lembar review.

### B. Perbaiki teks Data Akun untuk SMP
11. Ganti "… tampil di sini saat kamu kelas 12." di layar Data Akun untuk akun SMP
    dengan teks netral DRAF. Contoh: "Riwayat dan data akunmu ada di sini."
    Tandai DRAF dan catat di salinan teks.
12. Tes: halaman Data Akun untuk akun kelas 7–9 tidak memuat kata "kelas 12".
    Akun kelas 10–12 tidak berubah.

### C. Bersihkan event sisa akun uji kelas 10
13. Di database lokal, cari event milik akun uji kelas 10 (`uji...`). Hapus satu
    event sisa lewat endpoint `DELETE /pengguna/event/:id` milik akun itu sendiri.
    Jangan menghapus event akun lain.
14. Laporkan ID event, isi sebelum dan sesudah (jumlah baris), dan bukti dari
    database bahwa akun itu sekarang tidak punya event.
15. Pastikan akun yang dibersihkan memang akun uji (awalan `uji`, hanya di DB
    lokal). Jika tidak yakin, hentikan poin ini dan laporkan.

### D. Tes dan mutasi
16. Tambahkan tes server minimal 8 kasus: kartu tidak tampil di bawah ambang, tampil
    setelah ambang, data akun lain tidak ikut, gagal dimuat tidak menampilkan kartu,
    tidak ada panggilan AI, dan ambang dibaca dari `konfigurasi_levelin`.
17. Mutasi, gagal lalu lulus: (a) turunkan ambang ke 0 (kartu tampil tanpa data
    cukup), (b) izinkan data akun lain, (c) kembalikan teks Data Akun lama untuk SMP.

## Di luar task ini
- Mengubah kebijakan privasi, `kebijakan-privasi.json`, atau versinya.
- Chatbot dan AI (ini 078).
- Pilih Mapel per prodi dan "Mapel Saya" (ini 079).
- Menyalakan server atau saklar apa pun.
- Penyelidikan `modul.test.js` (tetap terbuka sampai ada bukti).
- Kartu kelas 12 untuk Eksplorasi Kampus (menunggu PM, tetap seperti 075b).
- Migrasi baru, penghapusan otomatis, atau perubahan data akun nyata.

## Definition of Done

- [ ] Kartu "Latihan berikutnya" tampil di posisi yang dilaporkan; hilang bila data kurang
- [ ] Ambang dibaca dari `konfigurasi_levelin`; tidak ada angka tetap di kode
- [ ] Tidak ada pemanggilan AI; tidak ada tabel atau migrasi baru
- [ ] Kartu hanya membaca data akun sendiri; ada tes
- [ ] Data Akun SMP tidak memuat "kelas 12"; ada tes
- [ ] Event sisa akun uji kelas 10 dibersihkan; ID dan jumlah baris dilaporkan
- [ ] Tes server minimal 8 kasus lulus
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Teks DRAF tercatat di salinan teks dan lembar review
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` bernilai `0` (dicek di database)
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_077`

## Bukti 360 px
- Akun kelas 7 dengan data latihan cukup: kartu "Latihan berikutnya" tampil
- Akun kelas 7 dengan data kurang: tidak ada kartu dan tidak ada ruang kosong
- Akun kelas 7: Data Akun tanpa kata "kelas 12"
- Simpan di `scratchpad/bukti-077/`, bukan di repo. Tidak ada tangkapan layar di repo.

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Posisi kartu di Beranda, dan alasannya bila berbeda dari rekomendasi
- Teks Data Akun sebelum dan sesudah
- ID event yang dihapus, jumlah baris sebelum dan sesudah, dan bukti dari database
- Hasil tes dan tiga mutasi
- Nilai saklar dari database
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API. Kunci OpenRouter hanya ada di `.env` lokal.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Jangan menaikkan versi kebijakan privasi sebelum app dengan teks baru dirilis.
- Teks baru berstatus DRAF sampai disetujui.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
