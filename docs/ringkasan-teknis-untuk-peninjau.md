# Ringkasan teknis untuk peninjau hukum

**Status: bahan untuk diperiksa Khalifa. Kebijakan belum final dan belum ditinjau hukum.** Diperiksa 11 November 2026 terhadap kode LANJUT. Rujukan berkas relatif terhadap repo aplikasi; rujukan `docs/` terhadap repo induk. Banyak pengguna berusia di bawah 18 tahun, dan aplikasi tidak menanyakan usia.

## 1. Data yang dikumpulkan

| Data | Layar | Untuk apa | Rujukan |
|---|---|---|---|
| Akun: nama pengguna, email bila diisi, kata sandi dalam bentuk acak | Daftar, Data Akun | Masuk | `server/src/modul/auth/` |
| Kelas, jenis sekolah, prodi impian, gaya belajar, bidang minat, mapel pilihan, kesiapan ujian | Data Akun, Eksplorasi, Pilih Mapel, Profil Saya | Menyesuaikan isi dan saran | `server/src/modul/pengguna/` |
| Centang, kartu, hasil latihan | Daftar Periksa, Arsip, Latihan | Menyimpan kemajuan | `server/src/modul/kemajuan/`, `kartu/`, `levelin/` |
| Teks modul | Arsip Belajar | Belajar dan pencarian | `server/src/modul/modul/` |
| Catatan dan foto Portofolio | Portofolio, hanya build pilot | Catatan karya | `server/src/modul/butir-bukti/` |
| Ujian yang dicatat, saklar bawaan mati | Persiapan Event | Persiapan ujian | `server/src/modul/event-sekolah/` |
| Catatan persetujuan | Terima kebijakan, surat, layar orang tua | Bukti persetujuan | `server/src/modul/persetujuan/` |
| Sesi, percobaan masuk, kode email dalam bentuk acak | Masuk, Daftar | Keamanan akun | `server/src/modul/auth/` |
| Catatan teknis: fitur, hasil, lama proses, ID akun | Semua | Operasional | `server/src/app.js` |

Daftar kolomnya ada di `docs/kebijakan-privasi-DRAF.md` Lampiran A.

## 2. Data yang keluar dari aplikasi

**Pilot tanpa AI, yaitu `ai_aktif = 0`:** tidak ada data yang dikirim ke penyedia AI atau mesin pencari. Dibuktikan oleh `server/tests/pilot-tanpa-ai.test.js`, rinciannya di `docs/audit-pilot-tanpa-ai.md`. Yang tetap keluar:

- alamat email dan kode, ke penyedia email, saat kode diminta (`server/src/util/surel.js`);
- masuk dengan Google, bila dinyalakan (`server/src/modul/auth/tokenGoogle.js`);
- kunjungan ke situs luar, saat siswa menekan tautan.

**Bila AI dinyalakan,** server mengirim ke OpenRouter, yang meneruskan ke perusahaan penjalan model (`server/src/modul/ngobrol/penyedia-ai.js`):

- pesan dan riwayat sesi, sesudah sebagian data pribadi disamarkan;
- kelas, jenis sekolah, prodi impian, gaya belajar;
- satu ringkasan: modul, saran latihan, atau ujian terdekat (`server/src/modul/ngobrol/konteks.js`);
- pertanyaan terbaru ke mesin pencari, bila pencarian web dinyalakan.

Nama, email, dan ID akun tidak dikirim. Model bawaan tersedia dari beberapa perusahaan di beberapa wilayah ([daftar OpenRouter](https://openrouter.ai/api/v1/models/anthropic/claude-sonnet-5.5/endpoints), diperiksa 11 November 2026).

## 3. Siapa yang bisa mengakses

| Data | Lewat aplikasi | Lewat server |
|---|---|---|
| Foto Portofolio | Hanya akun siswa itu. Siswa lain tidak bisa (`server/tests/portofolio.test.js`) | Pengelola secara teknis bisa mengakses penyimpanannya |
| Data akun lain | Hanya pemiliknya (`server/tests/modul.test.js`) | Siapa pun yang memegang akses basis data |
| Hitungan pemakaian | Tidak ada | Alat tim, tanpa isi (`server/tools/metrik-portofolio.js`) |

Tidak ada layar atau rute bagi tim, sekolah, atau guru untuk membuka data siswa. `server/src/middleware/wajibTim.js` tidak dipasang di rute mana pun.

## 4. Penyimpanan dan penghapusan

- Akun disimpan sampai pemiliknya menghapus, tanpa hapus otomatis (keputusan K27, `docs/kebijakan-privasi-DRAF.md`).
- Hapus akun berlaku seketika dan menghapus data terkait, termasuk foto (`docs/audit-hapus-akun-ekspor.md`, `server/tests/hapus-akun-ekspor.test.js`). Fiturnya bersaklar build.
- Kartu dan butir yang dihapus tetap tersimpan sampai akun dihapus. Modul, foto, dan event dihapus permanen.
- Kode email dibersihkan sesudah 24 jam saat kode berikutnya diminta (`server/src/modul/auth/otp.layanan.js`). Data daftar sementara dihapus dalam 30 menit.

**Tidak bisa dihapus dari aplikasi:** cadangan basis data sampai tergantikan, catatan teknis yang memuat ID akun, data yang sudah dikirim ke penyedia AI, dan email terkirim.

## 5. Yang belum diketahui, diisi Khalifa

Lengkapnya di `docs/lembar-isian-fakta.md`.

- Badan pengelola, alamat, kontak resmi, petugas pelindungan data.
- Penyedia dan lokasi server; lama penyimpanan log; jadwal cadangan.
- Penyedia email dan negaranya.
- Nilai `ai_aktif` di produksi, dan pengaturan akun OpenRouter.
- Siapa yang memegang akses server.

## 6. Enam pertanyaan hukum

Dikutip apa adanya, belum dijawab.

1. apakah konfirmasi orang tua atau wali di aplikasi diterima sebagai persetujuan; menunggu tinjauan hukum.
2. negara atau wilayah pemrosesan, dan dasar pengirimannya ke luar negeri.
3. aturan untuk modul dari guru atau penerbit (hak cipta) yang potongannya dikirim ke penyedia AI.
4. apakah akun dasar (tanpa AI) juga butuh persetujuan orang tua atau wali; menunggu tinjauan hukum.
5. berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.
6. kapan persetujuan orang tua atau wali perlu diminta ulang saat kebijakan berubah.

## 7. Persetujuan orang tua untuk Portofolio

Portofolio hanya mensyaratkan siswa menerima kebijakan (`server/src/modul/butir-bukti/butir-bukti.layanan.js`), dan foto bisa memuat wajah siswa. **Pertanyaan: apakah fitur ini perlu persetujuan orang tua atau wali sendiri?**
