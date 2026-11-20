# Ringkasan teknis untuk peninjau hukum

**Status: bahan untuk diperiksa Khalifa. Kebijakan belum final dan belum ditinjau hukum.** Diperiksa 19 November 2026 terhadap `lippbyte/lanjut_app` commit `e8a9839`. Rujukan `server/` dan `docs/audit-*` ada di repo aplikasi; dokumen `docs/` lain di repo induk. Pengguna adalah siswa kelas 7–12, sebagian besar di bawah 18 tahun. Aplikasi tidak menanyakan usia.

## 1. Data yang dikumpulkan

| Data | Untuk apa | Rujukan |
|---|---|---|
| Akun: nama pengguna, nama tampilan, email bila diisi, kata sandi sebagai hash satu arah | Masuk | `server/src/modul/auth/` |
| Kelas, jenis sekolah, prodi impian, gaya belajar, bidang minat, mapel pilihan, kesiapan ujian | Menyesuaikan isi dan saran | `server/src/modul/pengguna/` |
| Centang, kartu, hasil latihan | Menyimpan kemajuan | `server/src/modul/kemajuan/`, `kartu/`, `levelin/` |
| Teks modul; berkas asli tidak disimpan | Belajar dan pencarian | `server/src/modul/modul/` |
| Catatan dan foto Portofolio (hanya build pilot); EXIF dan lokasi dibuang | Catatan karya | `server/src/modul/butir-bukti/` |
| Ujian yang dicatat; saklar bawaan mati | Persiapan ujian | `server/src/modul/event-sekolah/` |
| Catatan persetujuan | Bukti persetujuan | `server/src/modul/persetujuan/` |
| Sesi, hitungan gagal masuk, kode email; token dan kode disimpan sebagai hash | Keamanan akun | `server/src/modul/auth/` |
| Catatan teknis: alamat permintaan (termasuk kata yang dicari di Arsip Belajar), hasil, lama proses, ID akun | Operasional | `server/src/app.js` |

Server aplikasi tidak menyimpan alamat IP. Log di luar aplikasi, misalnya proxy server, tidak diperiksa. Daftar kolom: `docs/kebijakan-privasi-DRAF.md` Lampiran A.

## 2. Data yang keluar dari aplikasi

**Dengan `ai_aktif = 0`:** tidak ada data ke penyedia AI atau mesin pencari (`server/tests/pilot-tanpa-ai.test.js`, `docs/audit-pilot-tanpa-ai.md`). Yang tetap keluar:

- email dan kode, ke penyedia email, saat kode diminta (`server/src/util/surel.js`);
- masuk dengan Google, bila dinyalakan: siswa masuk langsung di Google; server hanya mengambil kunci publik Google (`server/src/modul/auth/tokenGoogle.js`);
- kunjungan ke situs luar, saat siswa menekan tautan.

**Bila AI dinyalakan,** server mengirim ke OpenRouter, yang meneruskan ke penjalan model (`server/src/modul/ngobrol/penyedia-ai.js`):

- pesan dan riwayat sesi, sesudah email, nomor mirip NIK dan telepon, tanggal lahir, alamat, dan nama sekolah disamarkan;
- kelas, jenis sekolah, prodi impian, gaya belajar;
- satu ringkasan fitur: modul, saran latihan, atau ujian terdekat (`server/src/modul/ngobrol/konteks.js`);
- untuk pertanyaan pelajaran, potongan teks modul milik siswa yang cocok;
- pertanyaan terbaru ke mesin pencari, bila pencarian web dinyalakan.

Nama, nama pengguna, email, dan ID akun tidak dikirim. Model dan penyedia di produksi: [ISI: menunggu Khalifa].

## 3. Siapa yang bisa mengakses

| Data | Lewat aplikasi | Lewat server |
|---|---|---|
| Foto Portofolio | Hanya akun pemiliknya (`server/tests/portofolio.test.js`) | Pengelola secara teknis bisa mengakses penyimpanannya |
| Data akun lain | Hanya pemiliknya; setiap kueri data pribadi memeriksa pemilik (`server/tools/periksa-sql.js`) | Siapa pun yang memegang akses basis data |
| Hitungan pemakaian | Tidak ada | Alat tim: angka, ID akun hanya bila diminta, tanpa isi (`server/tools/metrik-portofolio.js`) |

Tidak ada layar atau rute bagi tim, sekolah, atau guru untuk membuka data siswa (`server/src/middleware/wajibTim.js` tidak dipasang).

## 4. Penyimpanan dan penghapusan

- Akun disimpan sampai pemiliknya menghapus, tanpa hapus otomatis (K27).
- Hapus akun langsung menghapus data terkait (`docs/audit-hapus-akun-ekspor.md`). Foto yang gagal dihapus dicoba ulang dengan `npm run bersihkan-berkas`; kata modul tersisa di indeks pencarian sekitar 30 detik. Layarnya bersaklar build dan mati di APK sekolah; rute servernya selalu ada.
- Kartu dan butir pribadi yang dihapus tetap tersimpan sampai akun dihapus. Modul, Portofolio, dan event dihapus permanen.
- Kode email dihapus sesudah 24 jam, saat kode berikutnya diminta. Data daftar sementara berlaku 30 menit, dibersihkan tiap 5 menit.

**Tidak bisa dihapus dari aplikasi:** cadangan sampai tergantikan, catatan teknis berisi ID akun, data yang sudah dikirim ke penyedia AI, dan email terkirim.

## 5. Belum tercakup di kebijakan privasi

Fitur berikut di balik saklar mati, hanya dicoba di lingkungan pengembangan dengan data dummy, dan **belum dipakai siswa nyata**:

- **Discover:** refleksi bebas per kartu (dua isian, masing-masing paling panjang 280 karakter) dan Profil Eksplorasi (salinan refleksi dan pilihan siswa, catatan paling panjang 500 karakter), dengan versi lama tetap tersimpan.
- **Jalur & Tujuan:** pilihan jalur dan riwayat jedanya, serta tujuan dengan versinya.

Keduanya ikut diunduh dan ikut terhapus bersama akun. Keterbatasan yang terbukti:

- Memulihkan cadangan tabel Discover dapat menghidupkan lagi data akun yang sudah dihapus; prosedurnya kini memuat langkah pembersihan (K43).
- Memulihkan cadangan penuh menghidupkan lagi akun yang dihapus sesudahnya, dan belum ada alat untuk menghapusnya ulang (T20).

## 6. Fakta dan pertanyaan tentang AI

- `ai_aktif = 0` di produksi, dinyatakan diperiksa 12 November 2026. [ISI: bukti pemeriksaan.]
- Tes pilot tanpa AI ada dan lolos.
- `ai_zdr` bawaannya `0`; nilai produksi [ISI].
- Pemegang akun OpenRouter wajib berusia 18 tahun ke atas (`docs/hasil-pengisian-fakta.md`). Relevan bila AI dinyalakan.

## 7. Yang belum diketahui

Lengkapnya di `docs/lembar-isian-fakta.md`: badan pengelola dan kontak resmi; penyedia, lokasi server, lama log, dan jadwal cadangan; penyedia email; pengaturan AI dan akun OpenRouter di produksi; siapa yang memegang akses server.

## 8. Pertanyaan terbuka untuk peninjau

Belum dijawab. Butir 1–6 dikutip apa adanya dari penanda `[ISI]` di kebijakan privasi; di `docs/lembar-isian-fakta.md` keenamnya butir 3, 10, 11, 14, 16, dan 18.

1. apakah konfirmasi orang tua atau wali di aplikasi diterima sebagai persetujuan; menunggu tinjauan hukum.
2. negara atau wilayah pemrosesan, dan dasar pengirimannya ke luar negeri.
3. aturan untuk modul dari guru atau penerbit (hak cipta) yang potongannya dikirim ke penyedia AI.
4. apakah akun dasar (tanpa AI) juga butuh persetujuan orang tua atau wali; menunggu tinjauan hukum.
5. berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.
6. kapan persetujuan orang tua atau wali perlu diminta ulang saat kebijakan berubah.
7. Apakah Portofolio dan refleksi Discover perlu persetujuan orang tua atau wali tersendiri? Portofolio kini hanya mensyaratkan siswa menerima kebijakan, dan fotonya bisa memuat wajah.
8. Berapa lama bukti persetujuan orang tua atau wali disimpan?
