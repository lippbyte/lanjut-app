# Lembar Review Konten LANJUT

Dibuat otomatis 2026-10-03 dengan `npm run lembar-review` (folder `LANJUT_App/server`) dari basis data `lanjut_test` dan berkas `MVP-PWA/data/`. Lembar ini **hanya bacaan**: membuat atau mengisinya tidak mengubah apa pun di aplikasi.

## Cara memakai lembar ini

1. Kerjakan dari atas. Bagian 1 (profil prodi) paling mendesak: layar Eksplorasi Tujuan sudah jadi, tetapi kosong untuk semua siswa sampai profilnya ditandai. Bagian 2 (kartu kurasi) menyusul untuk alasan yang sama.
2. Untuk setiap butir: buka sumber yang tercatat, cocokkan dengan isi yang (akan) tampil ke siswa, centang **satu** keputusan (ganti `[ ]` menjadi `[x]`), lalu isi nama, tanggal, dan catatan.
3. Butir baru berstatus terverifikasi setelah orang yang berwenang menjalankan perintah di butir itu dari folder `LANJUT_App/server`. Tanpa `--ya` perintah hanya menampilkan pratinjau dan **tidak mengubah apa pun**; ulangi dengan `--ya` di akhir untuk benar-benar menandai. Tambahkan `--tanggal=TAHUN-BULAN-TANGGAL` bila tanggal pengecekan berbeda dari hari perintah dijalankan.
4. Kalau isinya perlu diperbaiki: ubah berkas data di `MVP-PWA/data/`, jalankan `npm run benih`, lalu buat ulang lembar ini. Isi yang berubah otomatis kembali ke "belum terverifikasi", termasuk yang sudah pernah ditandai.
5. Jangan menandai butir yang sumbernya tidak bisa dibuka atau tidak cocok. Pilih "Tidak bisa dicek" dan tulis alasannya. Jangan mengisi kekosongan dengan perkiraan sendiri.

## Ringkasan

| No | Bagian | `--jenis` | Total | Sudah ditandai | Belum | Di lembar |
|---|---|---|---|---|---|---|
| 1 | Profil prodi — Eksplorasi Tujuan (F10) | `eksplorasi-tujuan` | 18 | 0 | 18 | 18 |
| 2 | Kartu kurasi — Arsip Belajar & Latihan (F6/F7) | `kartu` | 12 | 0 | 12 | 12 |
| 3 | Prodi — daftar prodi & pemetaan mapel (F3 Penolong Pilih Mapel) | `prodi` | 19 | 0 | 19 | 19 |
| 4 | Mapel — ketersediaan di SMK (F3) | `mapel` | 10 | 0 | 10 | 10 |
| 5 | Khusus SMK (F2) | `khusus-smk` | 6 | 0 | 6 | 6 |
| 6 | Daftar Periksa (F5) | `checklist` | 11 | 0 | 11 | 11 |
| 7 | Linimasa (Beranda, F1) | `linimasa` | 6 | 3 | 3 | 3 (+3 konfirmasi ulang) |
| 8 | Cerita Alumni (F4) | `cerita-alumni` | 2 | 0 | 2 | 2 |

## 1. Profil prodi — Eksplorasi Tujuan (F10) — 18 belum terverifikasi

> Di aplikasi sekarang: profil yang belum ditandai **tidak dikirim server sama sekali**. Semua siswa melihat "Profil prodi sedang kami cek", padahal layarnya sudah jadi. Profil yang ditandai langsung tampil.
>
> Satu profil = satu tanda, berlaku untuk **seluruh** isinya (angka, mata kuliah, profesi, kampus). Kalau ada bagian yang salah, perbaiki dulu di `MVP-PWA/data/profil-prodi.json` → `npm run benih` → baru tandai.
>
> Label status data ("Terverifikasi"/"Perkiraan") tampil ke siswa sebagai lencana di tiap bagian. Menandai profil **tidak** mengubah label itu. Yang dicek: isi cocok dengan sumber, dan label "Perkiraan" memang dipasang pada bagian yang belum bersumber resmi.
>
> Kepala berkas profil-prodi.json: asal "riset", status berkas "terverifikasi_sebagian", diriset 31 Agustus 2026. Isi berkas ini berasal dari docs/riset-top-prodi-lengkap.md (data SNBP 2025/2026 & SNBT 2026 dari SNPMB, ditambah dokumen kurikulum dan laman resmi kampus). Bagian yang tidak ditemukan di sumber resmi ditandai 'Perkiraan' pada status_sumber, bukan dinaikkan diam-diam jadi 'Terverifikasi'.
>
> Prodi yang **belum punya profil** (tidak ada isi untuk direview, lihat laporan kesenjangan LANJUT_043): `teknik-elektro` (Teknik Elektro, Teknologi & Rekayasa).

### 1.1 Keselamatan dan Kesehatan Kerja (K3)

**ID:** `k3` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D4 · **Rumpun:** Teknologi & Rekayasa · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 5.582 · **Diterima dari pendaftar:** 0,8% (43 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UNS" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Higiene Industri; Keselamatan Kerja; K3 Lingkungan; Pengendalian Proses; Instrumentasi; Pertolongan Pertama
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Safety Officer / HSE Officer; Safety Inspector; Environmental Specialist; Auditor K3
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNS (PTN Akademik; jalur SNBP, SNBT); PPNS (Politeknik Perkapalan Negeri Surabaya) (PTN Vokasi; jalur SNBT); UNAIR (PTN Akademik; jalur SNBP, SNBT); Universitas Binawan (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Prodi peminat terbanyak SNBT 2026 di PTN akademik. Daftar mata kuliah dari sumber sekunder (belum dokumen kurikulum resmi).

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=k3 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.2 Administrasi Bisnis

**ID:** `administrasi-bisnis` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D3 · **Rumpun:** Ekonomi & Bisnis · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 5.059 · **Diterima dari pendaftar:** 2,3% (116 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UB" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Korespondensi Bisnis; Administrasi Perkantoran Digital (E-Office); Digital Marketing; Manajemen SDM; Komunikasi Organisasi
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Administration Officer; Digital Marketer; Asisten Manajer; Wirausaha
- **Kampus yang cocok** _(status data: Terverifikasi)_: UB (PTN Akademik; jalur SNBT); Polban (PTN Vokasi; jalur SNBT); PNJ (PTN Vokasi; jalur SNBT); Polmed (PTN Vokasi; jalur SNBT); Politeknik LP3I Bandung (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Mata kuliah gabungan sumber kampus (Polines) dan sumber sekunder (LP3I) — ditandai Perkiraan.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=administrasi-bisnis --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.3 Teknik Informatika

**ID:** `teknik-informatika` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D3/D4 · **Rumpun:** Teknologi & Rekayasa · **Lencana "Relevan untuk RPL/TKJ/Teknik":** ya
- **Pendaftar:** 2.796 · **Diterima dari pendaftar:** 1,6% (45 diterima) · tertulis "Sumber: SNPMB SNBT 2026, PNJ" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Terverifikasi)_: Dasar Pemrograman & Praktikum; Algoritma dan Struktur Data; Basis Data & Basis Data Lanjut; Pemrograman Web & Framework; Pemrograman Mobile; Rekayasa Perangkat Lunak
- **Catatan studi:** Jenjang D4 berbobot 144 SKS dan bergelar S.Tr.Kom / S.ST.
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Software Engineer / Programmer; Database Administrator; System Analyst; QA / Software Tester
- **Kampus yang cocok** _(status data: Terverifikasi)_: PNJ (PTN Vokasi; jalur SNBT); Polban (PTN Vokasi; jalur SNBT); Polinema (PTN Vokasi; jalur SNBT)
- **Kaki halaman:** "Isi profil ini dicek ke sumber resmi pada [tanggal saat ditandai]."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Semua kampus rekomendasi berjenis PTN Vokasi — laporan riset tidak menemukan padanan PTN akademik untuk D3/D4 Teknik Informatika. Ini pengecualian yang disengaja terhadap aturan diversifikasi, bukan data yang kurang. Mata kuliah dari Dokumen Kurikulum D4 TI Polinema 2021 (resmi).

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=teknik-informatika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.4 Teknik Mesin

**ID:** `teknik-mesin` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D3 · **Rumpun:** Teknologi & Rekayasa · **Lencana "Relevan untuk RPL/TKJ/Teknik":** ya
- **Pendaftar:** 2.383 · **Diterima dari pendaftar:** 2,0% (48 diterima) · tertulis "Sumber: SNPMB SNBT 2026, Polban" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Gambar Teknik; Proses Manufaktur (Konvensional & CNC); Material Teknik & Pengujian Bahan; Elemen Mesin; Perawatan & Perbaikan Mesin; Otomasi Industri
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Supervisor / Teknisi Pemesinan; Teknisi Perawatan Mesin; Operator CNC; Quality Control Manufaktur
- **Kampus yang cocok** _(status data: Terverifikasi)_: Polban (PTN Vokasi; jalur SNBT); PNJ (PTN Vokasi; jalur SNBT); Polibatam (PTN Vokasi; jalur SNBT); ITPLN (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Tidak ada padanan PTN akademik untuk D3 Teknik Mesin di laporan riset — pengecualian diversifikasi yang sama seperti Teknik Informatika.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=teknik-mesin --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.5 Keperawatan

**ID:** `keperawatan` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D3 · **Rumpun:** Kesehatan · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 5.216 · **Diterima dari pendaftar:** 1,2% (60 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UNAIR" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Anatomi & Fisiologi; Keperawatan Dasar; Keperawatan Medikal Bedah (KMB); Keperawatan Gawat Darurat
- **Catatan studi:** Perlu lulus uji kompetensi dan punya STR sebelum praktik penuh.
- **Ke mana lulusannya** _(status data: Perkiraan)_: Perawat pelaksana rumah sakit; Perawat klinik; Perawat puskesmas
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNAIR (PTN Akademik; jalur SNBT); Poltekkes Kemenkes (PTN Vokasi; jalur SNBT, Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Kurikulum resmi satu kampus tidak ditemukan di laporan riset; mata kuliah memakai gambaran umum. Hanya 2 kampus yang bisa dipastikan — di bawah target 3-5.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=keperawatan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.6 Perpajakan

**ID:** `perpajakan` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D3 · **Rumpun:** Ekonomi & Bisnis · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 4.570 · **Diterima dari pendaftar:** 1,3% (60 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UNAIR" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Pengantar Pajak; PPh I & PPh II; PPN; Akuntansi Keuangan; Akuntansi Biaya; Hukum Pajak
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Staf / Konsultan Pajak; Pegawai Ditjen Pajak atau Bea Cukai; Tax Officer perusahaan
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNAIR (Fakultas Vokasi) (PTN Akademik; jalur SNBT); ULM (PTN Akademik; jalur SNBP, SNBT); Universitas Pancasila (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Tidak ada politeknik negeri di daftar riset; program vokasi di sini ditempuh lewat Fakultas Vokasi UNAIR — jenis kampus tetap ditulis PTN Akademik karena yang dinilai adalah jenis institusinya.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=perpajakan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.7 Keperawatan Anestesiologi

**ID:** `keperawatan-anestesiologi` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D4 · **Rumpun:** Kesehatan · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 4.766 · **Diterima dari pendaftar:** 0,5% (23 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UNS" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Keperawatan Anestesi; Keselamatan Pasien
- **Catatan studi:** Perlu registrasi profesi penata anestesi sebelum praktik.
- **Ke mana lulusannya** _(status data: Perkiraan)_: Penata anestesi rumah sakit; Asisten anestesi kamar operasi
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNS (PTN Akademik; jalur SNBT)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Keketatan tertinggi di daftar ini. Kurikulum resmi tidak ditemukan — hanya 2 topik umum yang bisa disebut, sengaja tidak ditambal sampai 4. Hanya 1 kampus terverifikasi; perlu riset lanjutan untuk melengkapi 3-5 kampus.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=keperawatan-anestesiologi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.8 Humas & Komunikasi Digital

**ID:** `humas-komunikasi-digital` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D4 · **Rumpun:** Sosial & Humaniora · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 4.346 · **Diterima dari pendaftar:** 1,0% (45 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UNJ" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Kehumasan (Public Relations); Media Digital; Manajemen Media Sosial
- **Ke mana lulusannya** _(status data: Perkiraan)_: Public Relations; Digital Content Specialist; Social Media Officer; Media Relations
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNJ (PTN Akademik; jalur SNBT)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Kurikulum resmi UNJ tidak ditemukan di laporan riset. Hanya 1 kampus terverifikasi — perlu riset lanjutan.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=humas-komunikasi-digital --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.9 Manajemen Bisnis

**ID:** `manajemen-bisnis` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** D4 · **Rumpun:** Ekonomi & Bisnis · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 2.521 · **Diterima dari pendaftar:** 2,7% (69 diterima) · tertulis "Sumber: SNPMB SNBT 2026, Polmed" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Manajemen Operasional; Manajemen Keuangan; Manajemen Pemasaran; Administrasi & Korespondensi Bisnis
- **Ke mana lulusannya** _(status data: Perkiraan)_: Staf / Asisten Manajer Bisnis; Business Development; Wirausaha
- **Kampus yang cocok** _(status data: Terverifikasi)_: Polmed (PTN Vokasi; jalur SNBT)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Kurikulum resmi spesifik tidak ditemukan; mata kuliah disusun dari kemiripan dengan Administrasi Bisnis, ditandai Perkiraan. Hanya 1 kampus terverifikasi.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=manajemen-bisnis --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.10 Informatika

**ID:** `informatika` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 · **Rumpun:** Teknologi & Rekayasa · **Lencana "Relevan untuk RPL/TKJ/Teknik":** ya
- **Pendaftar:** 1.157 · **Diterima dari pendaftar:** — (angka diterima belum ada) · tertulis "Sumber: SNPMB SNBP 2025, UNS" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Algoritma & Pemrograman; Struktur Data; Basis Data; Jaringan Komputer; Kecerdasan Buatan; Rekayasa Perangkat Lunak
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Software Developer / Programmer; Data Scientist; Cyber Security Analyst; IT Consultant
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNS (PTN Akademik; jalur SNBP); ITB (PTN Akademik; jalur SNBP, SNBT); UPI (PTN Akademik; jalur SNBP, SNBT); Telkom University (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Angka diterima untuk pasangan peminat ini tidak tersedia di laporan riset, jadi rasio keketatan tidak bisa dihitung dan ditampilkan sebagai tanda pisah. Prospek kerja berbasis tracer study Telkom University (masa tunggu 1,8 bulan, kesesuaian bidang 89%).

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=informatika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.11 Manajemen

**ID:** `manajemen` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 · **Rumpun:** Ekonomi & Bisnis · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 1.590 · **Diterima dari pendaftar:** — (angka diterima belum ada) · tertulis "Sumber: SNPMB SNBP 2025, UNS" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Manajemen SDM; Manajemen Keuangan; Manajemen Pemasaran; Manajemen Operasional; Manajemen Strategi; Kewirausahaan
- **Ke mana lulusannya** _(status data: Perkiraan)_: Staf / Manajer HRD; Marketing; Business Development; Analis Keuangan
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNPAD (PTN Akademik; jalur SNBP, SNBT); UI (PTN Akademik; jalur SNBP, SNBT); UGM (PTN Akademik; jalur SNBP, SNBT); Telkom University (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Angka diterima tidak tersedia. Tidak ada padanan PTN vokasi — diversifikasi memakai PTN + PTS. Kampus sumber angka peminat (UNS) tidak masuk daftar rekomendasi karena laporan riset menyebut kampus lain sebagai rujukan prodi ini.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=manajemen --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.12 Ilmu Hukum

**ID:** `ilmu-hukum` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 · **Rumpun:** Sosial & Humaniora · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 4.685 · **Diterima dari pendaftar:** 6,1% (287 diterima) · tertulis "Sumber: SNPMB SNBT 2026, UNDIP" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Terverifikasi)_: Pengantar Ilmu Hukum; Pengantar Hukum Indonesia; Hukum Pidana; Hukum Perdata; Hukum Tata Negara; Hukum Administrasi Negara
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Advokat (perlu PKPA); Hakim atau Jaksa (lewat pendidikan khusus); Legal Officer perusahaan; PNS Kemenkumham atau Kejaksaan
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNDIP (PTN Akademik; jalur SNBT); UNPAD (PTN Akademik; jalur SNBP, SNBT); UI (PTN Akademik; jalur SNBP, SNBT); UK Parahyangan (PTS; jalur Mandiri)
- **Kaki halaman:** "Isi profil ini dicek ke sumber resmi pada [tanggal saat ditandai]."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Tidak ada padanan PTN vokasi — diversifikasi memakai PTN + PTS.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=ilmu-hukum --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.13 Teknik Pertambangan & Perminyakan

**ID:** `teknik-pertambangan` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 · **Rumpun:** Teknologi & Rekayasa · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 4.789 · **Diterima dari pendaftar:** 2,4% (115 diterima) · tertulis "Sumber: SNPMB SNBT 2026, ITB" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Geologi Pertambangan; Teknik Pengeboran & Peledakan; Desain Tambang; Pemrosesan Mineral; Ekonomi Pertambangan; K3 Pertambangan
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Mine Plan Engineer; Ahli Geologi / Hidrogeologi Tambang; Konsultan Tambang; Karyawan BUMN tambang
- **Kampus yang cocok** _(status data: Terverifikasi)_: ITB (PTN Akademik; jalur SNBP, SNBT); UPN Veteran Yogyakarta (PTN Akademik; jalur SNBP, SNBT); Universitas Trisakti (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Peminat nomor satu nasional SNBP 2026 juga (2.022 pendaftar, 95 diterima, keketatan sekitar 4,7%). Angka yang ditampilkan memakai jalur SNBT 2026 supaya satu prodi memakai satu pasangan angka. Tidak ada padanan PTN vokasi.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=teknik-pertambangan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.14 Kedokteran (Pendidikan Dokter)

**ID:** `kedokteran` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 + profesi · **Rumpun:** Kesehatan · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 1.943 · **Diterima dari pendaftar:** 3,1% (60 diterima) · tertulis "Sumber: SNPMB SNBP 2026, UI" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Ilmu Kedokteran Dasar (anatomi, fisiologi, biokimia); Patologi & Farmakologi; Ilmu Penyakit Dalam; Ilmu Bedah; Kepaniteraan Klinik (koas)
- **Catatan studi:** Tahap akademik sekitar 3,5 tahun (kurikulum berbasis kompetensi/SKDI), lalu tahap profesi (koas) sekitar 2 tahun. Wajib lulus UKMPPD sebelum praktik.
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Dokter umum (setelah UKMPPD & STR); Dokter layanan primer; Dosen atau peneliti kedokteran
- **Kampus yang cocok** _(status data: Terverifikasi)_: UI (PTN Akademik; jalur SNBP); UNPAD (PTN Akademik; jalur SNBP, SNBT); UGM (PTN Akademik; jalur SNBP); UK Maranatha (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Laporan riset memverifikasi STRUKTUR studi (SKDI, koas, UKMPPD), bukan daftar mata kuliah per semester — daftar di sini gambaran umum, ditandai Perkiraan. Kedokteran UGM sebagai pembanding: 1.899 pendaftar, 53 diterima.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=kedokteran --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.15 Farmasi

**ID:** `farmasi` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 + profesi · **Rumpun:** Kesehatan · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 1.621 · **Diterima dari pendaftar:** 3,1% (50 diterima) · tertulis "Sumber: SNPMB SNBP 2026, UNPAD" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Terverifikasi)_: Kimia Organik; Biokimia; Analisis Obat; Farmakologi; Farmasetika; Praktek Belajar Lapangan
- **Catatan studi:** Lulus S1 dulu (S.Farm.), baru lanjut pendidikan profesi Apoteker.
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Apoteker (setelah pendidikan profesi); Tenaga Teknis Kefarmasian; QA / QC industri farmasi; PNS BPOM atau Kemenkes
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNPAD (PTN Akademik; jalur SNBP); UNSOED (PTN Akademik; jalur SNBP, SNBT); UGM (PTN Akademik; jalur SNBP); IIK Bhakti Wiyata (PTS; jalur Mandiri)
- **Kaki halaman:** "Isi profil ini dicek ke sumber resmi pada [tanggal saat ditandai]."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Mata kuliah dari kurikulum S1 Farmasi UNSOED (145 SKS). Tidak ada padanan PTN vokasi.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=farmasi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.16 Ilmu Keperawatan

**ID:** `ilmu-keperawatan` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 + Ners · **Rumpun:** Kesehatan · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 1.603 · **Diterima dari pendaftar:** 3,6% (58 diterima) · tertulis "Sumber: SNPMB SNBP 2026, UNPAD" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Anatomi & Fisiologi; Ilmu Biomedik; Keperawatan Medikal Bedah; Manajemen Keperawatan; Etika Keperawatan; Praktik Klinik
- **Catatan studi:** S1 Keperawatan dilanjutkan pendidikan profesi Ners; perlu STR untuk praktik.
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Perawat profesional (setelah profesi Ners & STR); Perawat rumah sakit, ICU, atau IGD; Perawat home care; Dosen atau instruktur klinis
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNPAD (PTN Akademik; jalur SNBP); UI (PTN Akademik; jalur SNBP); UGM (PTN Akademik; jalur SNBP)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Pembanding agregat: USK SNBP 2025 sebanyak 1.343 peminat. Tidak ada padanan PTN vokasi dan belum ada PTS di daftar riset — baru 3 kampus.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=ilmu-keperawatan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.17 Ilmu Komunikasi

**ID:** `ilmu-komunikasi` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 · **Rumpun:** Sosial & Humaniora · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 1.465 · **Diterima dari pendaftar:** 1,4% (20 diterima) · tertulis "Sumber: SNPMB SNBP 2025, UPI" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Terverifikasi)_: Pengantar Ilmu Komunikasi; Teori Komunikasi; Psikologi Komunikasi; Komunikasi Massa dan Media; Komunikasi Digital; Perencanaan Komunikasi
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Public Relations / Digital PR; Jurnalis; Content Creator / Social Media Specialist; Produser atau kru broadcasting
- **Kampus yang cocok** _(status data: Terverifikasi)_: UPI (PTN Akademik; jalur SNBP); UNPAD (PTN Akademik; jalur SNBP, SNBT); UNS (PTN Akademik; jalur SNBP); Telkom University (PTS; jalur Mandiri)
- **Kaki halaman:** "Isi profil ini dicek ke sumber resmi pada [tanggal saat ditandai]."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Peminat terbanyak ke-2 nasional SNBP 2025. Mata kuliah dari kurikulum resmi UNPAD (144 SKS). Tidak ada padanan PTN vokasi.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=ilmu-komunikasi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 1.18 Akuntansi

**ID:** `akuntansi` · **jenis:** `eksplorasi-tujuan`

**Yang akan tampil ke siswa setelah ditandai:**

- **Jenjang:** S1 · **Rumpun:** Ekonomi & Bisnis · **Lencana "Relevan untuk RPL/TKJ/Teknik":** tidak
- **Pendaftar:** 1.206 · **Diterima dari pendaftar:** — (angka diterima belum ada) · tertulis "Sumber: SNPMB SNBP 2025, UNS" · _status data: Terverifikasi_
- **Yang akan kamu pelajari** _(status data: Perkiraan)_: Akuntansi Keuangan Menengah; Akuntansi Biaya; Perpajakan; Auditing; Sistem Informasi Akuntansi; Anggaran Perusahaan
- **Ke mana lulusannya** _(status data: Terverifikasi)_: Akuntan Publik; Auditor Internal; Konsultan Pajak; Analis Keuangan
- **Kampus yang cocok** _(status data: Terverifikasi)_: UNPAD (PTN Akademik; jalur SNBP); UI (PTN Akademik; jalur SNBP); UGM (PTN Akademik; jalur SNBP); Telkom University (PTS; jalur Mandiri)
- **Kaki halaman:** "Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal saat ditandai]. Bagian bertanda Perkiraan belum dicek ke sumber resmi."

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: riset

**Catatan tim riset di berkas data** (tidak tampil ke siswa): Angka diterima tidak tersedia. Profesi 'PNS Kemenkeu/DJP/BPKP' ada di laporan riset tapi dipangkas supaya daftar tetap 3-4 butir sesuai spec. Tidak ada padanan PTN vokasi.

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=eksplorasi-tujuan --id=akuntansi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 2. Kartu kurasi — Arsip Belajar & Latihan (F6/F7) — 12 belum terverifikasi

> Di aplikasi sekarang: kartu kurasi yang belum ditandai **tidak dikirim server** (LANJUT_040). Arsip dan Latihan hanya berisi kartu buatan siswa sendiri, padahal PRD F6 meminta arsip sudah berisi kartu kurasi tim.
>
> Hanya kartu kurasi tim (sumber "resmi") yang ada di lembar ini. Kartu buatan siswa tidak pernah diverifikasi lewat skrip.
>
> Kepala berkas arsip.json: asal "contoh", yaitu isi contoh yang ditulis tim untuk mengisi kerangka dan belum ditinjau. Tidak ada url_sumber tercatat; yang dicek adalah kebenaran soal & jawabannya terhadap materi resmi mapelnya.

### 2.1 Simple present

**ID:** `k-ing-1` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Bahasa Inggris
- **Judul kartu:** Simple present
- **Isi / pertanyaan:** Choose the correct form: She ___ to school every day.
- **Jawaban:** goes

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-ing-1 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.2 Sinonim

**ID:** `k-ing-2` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Bahasa Inggris
- **Judul kartu:** Sinonim
- **Isi / pertanyaan:** Synonym of 'huge' is...
- **Jawaban:** enormous

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-ing-2 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.3 Past tense

**ID:** `k-ing-3` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Bahasa Inggris
- **Judul kartu:** Past tense
- **Isi / pertanyaan:** Past tense of 'write' is...
- **Jawaban:** wrote

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-ing-3 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.4 Preposisi waktu

**ID:** `k-ing-4` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Bahasa Inggris
- **Judul kartu:** Preposisi waktu
- **Isi / pertanyaan:** Fill in: I have lived here ___ 2019.
- **Jawaban:** since

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-ing-4 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.5 Struktur data dasar

**ID:** `k-inf-1` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Informatika
- **Judul kartu:** Struktur data dasar
- **Isi / pertanyaan:** Struktur data yang bekerja dengan aturan LIFO adalah...
- **Jawaban:** Stack (tumpukan)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-inf-1 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.6 Sistem bilangan

**ID:** `k-inf-2` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Informatika
- **Judul kartu:** Sistem bilangan
- **Isi / pertanyaan:** Bilangan biner 1011 sama dengan berapa dalam desimal?
- **Jawaban:** 11

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-inf-2 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.7 Basis data

**ID:** `k-inf-3` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Informatika
- **Judul kartu:** Basis data
- **Isi / pertanyaan:** Kunci yang menghubungkan satu tabel ke tabel lain disebut...
- **Jawaban:** Foreign key (kunci tamu)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-inf-3 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.8 Algoritma

**ID:** `k-inf-4` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Informatika
- **Judul kartu:** Algoritma
- **Isi / pertanyaan:** Kompleksitas waktu pencarian biner pada data terurut adalah...
- **Jawaban:** O(log n)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-inf-4 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.9 Turunan fungsi aljabar

**ID:** `k-mtk-1` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Matematika
- **Judul kartu:** Turunan fungsi aljabar
- **Isi / pertanyaan:** Turunan dari f(x) = 3x² + 5x adalah...
- **Jawaban:** f'(x) = 6x + 5

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-mtk-1 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.10 Logaritma dasar

**ID:** `k-mtk-2` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Matematika
- **Judul kartu:** Logaritma dasar
- **Isi / pertanyaan:** Nilai dari log₂ 8 adalah...
- **Jawaban:** 3

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-mtk-2 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.11 Deret aritmetika

**ID:** `k-mtk-3` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Matematika
- **Judul kartu:** Deret aritmetika
- **Isi / pertanyaan:** Jumlah 5 suku pertama deret 2, 4, 6, 8, ... adalah...
- **Jawaban:** 30

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-mtk-3 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 2.12 Akar persamaan kuadrat

**ID:** `k-mtk-4` · **jenis:** `kartu`

**Yang akan tampil ke siswa setelah ditandai:**

- **Mapel:** Matematika
- **Judul kartu:** Akar persamaan kuadrat
- **Isi / pertanyaan:** Akar-akar dari x² − 5x + 6 = 0 adalah...
- **Jawaban:** x = 2 atau x = 3

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=kartu --id=k-mtk-4 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 3. Prodi — daftar prodi & pemetaan mapel (F3 Penolong Pilih Mapel) — 19 belum terverifikasi

> Di aplikasi sekarang: daftar prodi dan pemetaan mapelnya **tampil di F3 apa pun statusnya**, dengan penafian. Saran "2 mapel pilihan TKA" diambil dari mapel berbobot 3.
>
> Pemetaan prodi → mapel (bobot 1–3) **tidak punya status verifikasi sendiri** dan hanya ikut dicek di sini. Kepala berkas prodi-mapel.json: asal "mockup", yaitu dari mockup desain, belum dicek ke ketentuan mapel pendukung SNPMB resmi.

### 3.1 Administrasi Bisnis

**ID:** `administrasi-bisnis` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Administrasi Bisnis · **Rumpun:** Ekonomi & Bisnis
- **Mapel pendukung di F3:** Bahasa Inggris (3 = mapel penentu); Ekonomi (3 = mapel penentu); Matematika (2 = mendukung); Sosiologi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=administrasi-bisnis --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.2 Akuntansi

**ID:** `akuntansi` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Akuntansi · **Rumpun:** Ekonomi & Bisnis
- **Mapel pendukung di F3:** Ekonomi (3 = mapel penentu); Matematika (3 = mapel penentu); Bahasa Inggris (2 = mendukung); Sosiologi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=akuntansi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.3 Manajemen

**ID:** `manajemen` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Manajemen · **Rumpun:** Ekonomi & Bisnis
- **Mapel pendukung di F3:** Ekonomi (3 = mapel penentu); Matematika (3 = mapel penentu); Bahasa Inggris (2 = mendukung); Sosiologi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=manajemen --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.4 Manajemen Bisnis

**ID:** `manajemen-bisnis` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Manajemen Bisnis · **Rumpun:** Ekonomi & Bisnis
- **Mapel pendukung di F3:** Ekonomi (3 = mapel penentu); Matematika (3 = mapel penentu); Bahasa Inggris (2 = mendukung); Sosiologi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=manajemen-bisnis --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.5 Perpajakan

**ID:** `perpajakan` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Perpajakan · **Rumpun:** Ekonomi & Bisnis
- **Mapel pendukung di F3:** Ekonomi (3 = mapel penentu); Matematika (3 = mapel penentu); Bahasa Inggris (2 = mendukung); Sosiologi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=perpajakan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.6 Farmasi

**ID:** `farmasi` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Farmasi · **Rumpun:** Kesehatan
- **Mapel pendukung di F3:** Biologi (3 = mapel penentu); Kimia (3 = mapel penentu); Matematika (2 = mendukung); Bahasa Inggris (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=farmasi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.7 Ilmu Keperawatan

**ID:** `ilmu-keperawatan` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Ilmu Keperawatan · **Rumpun:** Kesehatan
- **Mapel pendukung di F3:** Biologi (3 = mapel penentu); Kimia (3 = mapel penentu); Matematika (2 = mendukung); Bahasa Inggris (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=ilmu-keperawatan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.8 Kedokteran (Pendidikan Dokter)

**ID:** `kedokteran` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Kedokteran (Pendidikan Dokter) · **Rumpun:** Kesehatan
- **Mapel pendukung di F3:** Biologi (3 = mapel penentu); Kimia (3 = mapel penentu); Fisika (2 = mendukung); Matematika (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=kedokteran --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.9 Keperawatan

**ID:** `keperawatan` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Keperawatan · **Rumpun:** Kesehatan
- **Mapel pendukung di F3:** Biologi (3 = mapel penentu); Kimia (3 = mapel penentu); Matematika (2 = mendukung); Bahasa Inggris (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=keperawatan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.10 Keperawatan Anestesiologi

**ID:** `keperawatan-anestesiologi` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Keperawatan Anestesiologi · **Rumpun:** Kesehatan
- **Mapel pendukung di F3:** Biologi (3 = mapel penentu); Kimia (3 = mapel penentu); Fisika (2 = mendukung); Matematika (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=keperawatan-anestesiologi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.11 Humas & Komunikasi Digital

**ID:** `humas-komunikasi-digital` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Humas & Komunikasi Digital · **Rumpun:** Sosial & Humaniora
- **Mapel pendukung di F3:** Bahasa Indonesia (3 = mapel penentu); Sosiologi (3 = mapel penentu); Bahasa Inggris (2 = mendukung); Informatika (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=humas-komunikasi-digital --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.12 Ilmu Hukum

**ID:** `ilmu-hukum` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Ilmu Hukum · **Rumpun:** Sosial & Humaniora
- **Mapel pendukung di F3:** Bahasa Indonesia (3 = mapel penentu); Sosiologi (3 = mapel penentu); Ekonomi (2 = mendukung); Geografi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=ilmu-hukum --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.13 Ilmu Komunikasi

**ID:** `ilmu-komunikasi` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Ilmu Komunikasi · **Rumpun:** Sosial & Humaniora
- **Mapel pendukung di F3:** Bahasa Indonesia (3 = mapel penentu); Sosiologi (3 = mapel penentu); Bahasa Inggris (2 = mendukung); Ekonomi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=ilmu-komunikasi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.14 Informatika

**ID:** `informatika` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Informatika · **Rumpun:** Teknologi & Rekayasa
- **Mapel pendukung di F3:** Informatika (3 = mapel penentu); Matematika (3 = mapel penentu); Fisika (2 = mendukung); Bahasa Inggris (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=informatika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.15 Keselamatan dan Kesehatan Kerja (K3)

**ID:** `k3` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Keselamatan dan Kesehatan Kerja (K3) · **Rumpun:** Teknologi & Rekayasa
- **Mapel pendukung di F3:** Fisika (3 = mapel penentu); Kimia (3 = mapel penentu); Matematika (2 = mendukung); Biologi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=k3 --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.16 Teknik Elektro

**ID:** `teknik-elektro` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Teknik Elektro · **Rumpun:** Teknologi & Rekayasa
- **Mapel pendukung di F3:** Fisika (3 = mapel penentu); Matematika (3 = mapel penentu); Informatika (2 = mendukung); Kimia (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=teknik-elektro --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.17 Teknik Informatika

**ID:** `teknik-informatika` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Teknik Informatika · **Rumpun:** Teknologi & Rekayasa
- **Mapel pendukung di F3:** Informatika (3 = mapel penentu); Matematika (3 = mapel penentu); Fisika (2 = mendukung); Kimia (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=teknik-informatika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.18 Teknik Mesin

**ID:** `teknik-mesin` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Teknik Mesin · **Rumpun:** Teknologi & Rekayasa
- **Mapel pendukung di F3:** Fisika (3 = mapel penentu); Matematika (3 = mapel penentu); Informatika (2 = mendukung); Kimia (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=teknik-mesin --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 3.19 Teknik Pertambangan & Perminyakan

**ID:** `teknik-pertambangan` · **jenis:** `prodi`

**Yang tampil ke siswa sekarang:**

- **Nama:** Teknik Pertambangan & Perminyakan · **Rumpun:** Teknologi & Rekayasa
- **Mapel pendukung di F3:** Fisika (3 = mapel penentu); Matematika (3 = mapel penentu); Kimia (2 = mendukung); Geografi (1 = menyinggung)

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=prodi --id=teknik-pertambangan --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 4. Mapel — ketersediaan di SMK (F3) — 10 belum terverifikasi

> Di aplikasi sekarang: daftar mapel **tampil di F3 apa pun statusnya**. Kolom "tersedia di SMK" adalah inti F3: menentukan mapel mana yang perlu dikejar sendiri oleh siswa SMK.
>
> Kepala berkas mapel.json: asal "mockup". Nilai "tersedia di SMK" masih mengikuti mockup dan belum dicek ke struktur kurikulum SMK; ini Pertanyaan Terbuka PRD §11 yang memblokir F3.

### 4.1 Bahasa Indonesia

**ID:** `bahasa-indonesia` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Bahasa Indonesia
- **Tersedia di SMK:** ya
- **Dipakai di pemetaan:** 3 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=bahasa-indonesia --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.2 Bahasa Inggris

**ID:** `bahasa-inggris` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Bahasa Inggris
- **Tersedia di SMK:** ya
- **Dipakai di pemetaan:** 11 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=bahasa-inggris --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.3 Biologi

**ID:** `biologi` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Biologi
- **Tersedia di SMK:** tidak
- **Dipakai di pemetaan:** 6 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=biologi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.4 Ekonomi

**ID:** `ekonomi` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Ekonomi
- **Tersedia di SMK:** tidak
- **Dipakai di pemetaan:** 7 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=ekonomi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.5 Fisika

**ID:** `fisika` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Fisika
- **Tersedia di SMK:** ya
- **Dipakai di pemetaan:** 8 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=fisika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.6 Geografi

**ID:** `geografi` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Geografi
- **Tersedia di SMK:** tidak
- **Dipakai di pemetaan:** 2 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=geografi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.7 Informatika

**ID:** `informatika` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Informatika
- **Tersedia di SMK:** ya
- **Dipakai di pemetaan:** 5 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=informatika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.8 Kimia

**ID:** `kimia` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Kimia
- **Tersedia di SMK:** tidak
- **Dipakai di pemetaan:** 10 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=kimia --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.9 Matematika

**ID:** `matematika` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Matematika
- **Tersedia di SMK:** ya
- **Dipakai di pemetaan:** 16 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=matematika --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 4.10 Sosiologi

**ID:** `sosiologi` · **jenis:** `mapel`

**Yang tampil ke siswa sekarang:**

- **Nama:** Sosiologi
- **Tersedia di SMK:** tidak
- **Dipakai di pemetaan:** 8 prodi

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=mapel --id=sosiologi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 5. Khusus SMK (F2) — 6 belum terverifikasi

> Di aplikasi sekarang: butir **tampil** dengan keterangan "Perlu dicek ke [lembaga] · belum diverifikasi". Setelah ditandai, keterangannya menjadi "Diperbarui dari [lembaga] · dicek [tanggal]".
>
> Nada (kepala berkas khusus-smk.json): Salinan teks §0 kaidah 3: jangan menyalahkan sekolah. Bingkainya informasi yang tersebar, bukan sekolah yang lalai. Periksa ulang tiap kali menambah butir.

### 5.1 Nilai rapor mapel pendukung SNBP

**ID:** `nilai-rapor` · **jenis:** `khusus-smk`

**Yang tampil ke siswa sekarang:**

- **Judul:** Nilai rapor mapel pendukung SNBP
- **Apa yang berbeda:** PDSS menilai rata-rata rapor pada mapel pendukung program studi, sementara sebagian mapel itu memang tidak ada di struktur kurikulum SMK.
- **Apa yang bisa dilakukan:** Cek mapel pengganti yang diakui lewat Penolong Pilih Mapel, lalu konfirmasi ke BK sebelum PDSS diisi.
- **Keterangan sumber di layar:** "Perlu dicek ke laman resmi SNPMB · belum diverifikasi"

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=khusus-smk --id=nilai-rapor --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 5.2 Sertifikat kompetensi keahlian dan PKL

**ID:** `portofolio` · **jenis:** `khusus-smk`

**Yang tampil ke siswa sekarang:**

- **Judul:** Sertifikat kompetensi keahlian dan PKL
- **Apa yang berbeda:** SMK punya Uji Kompetensi Keahlian dan sertifikat industri dari PKL yang tidak dimiliki lulusan SMA.
- **Apa yang bisa dilakukan:** Lampirkan sertifikat UKK dan PKL sebagai nilai tambah di jalur seleksi mandiri kampus.
- **Keterangan sumber di layar:** "Perlu dicek ke Direktorat SMK, Kemendikdasmen · belum diverifikasi"

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://vokasi.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=khusus-smk --id=portofolio --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 5.3 Kuota siswa eligible SNBP

**ID:** `kuota-eligible` · **jenis:** `khusus-smk`

**Yang tampil ke siswa sekarang:**

- **Judul:** Kuota siswa eligible SNBP
- **Apa yang berbeda:** Jumlah siswa yang eligible SNBP dihitung dari akreditasi dan jumlah siswa per sekolah, bukan dari nilai tiap siswa saja.
- **Apa yang bisa dilakukan:** Tanyakan kuota eligible sekolahmu ke BK di awal semester, sebelum menyusun urutan pilihan.
- **Keterangan sumber di layar:** "Perlu dicek ke laman resmi SNPMB · belum diverifikasi"

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=khusus-smk --id=kuota-eligible --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 5.4 Jalur vokasi Politeknik (D3/D4)

**ID:** `jalur-vokasi` · **jenis:** `khusus-smk`

**Yang tampil ke siswa sekarang:**

- **Judul:** Jalur vokasi Politeknik (D3/D4)
- **Apa yang berbeda:** Lulusan SMK punya opsi tambahan lewat jalur vokasi yang menghitung nilai mapel produktif kejuruan secara langsung.
- **Apa yang bisa dilakukan:** Bandingkan pilihan D4 Politeknik dengan S1 sebelum menentukan urutan pilihan SNBP.
- **Keterangan sumber di layar:** "Perlu dicek ke laman resmi SNPMB · belum diverifikasi"

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=khusus-smk --id=jalur-vokasi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 5.5 Mapel pilihan TKA yang tidak diajarkan di SMK

**ID:** `mapel-tka-tidak-ada` · **jenis:** `khusus-smk`

**Yang tampil ke siswa sekarang:**

- **Judul:** Mapel pilihan TKA yang tidak diajarkan di SMK
- **Apa yang berbeda:** Sosiologi, Geografi, dan Antropologi umumnya tidak ada di struktur kurikulum SMK, padahal beberapa prodi memakainya sebagai mapel pendukung.
- **Apa yang bisa dilakukan:** Pilih dua mapel pilihan TKA dari yang benar-benar diajarkan di sekolahmu lewat Penolong Pilih Mapel.
- **Keterangan sumber di layar:** "Perlu dicek ke laman resmi SNPMB · belum diverifikasi"

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=khusus-smk --id=mapel-tka-tidak-ada --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 5.6 Jadwal PKL berdekatan dengan pendaftaran

**ID:** `jadwal-pkl` · **jenis:** `khusus-smk`

**Yang tampil ke siswa sekarang:**

- **Judul:** Jadwal PKL berdekatan dengan pendaftaran
- **Apa yang berbeda:** Praktik Kerja Lapangan kelas 12 kadang berjalan bersamaan dengan periode pendaftaran SNBP dan UTBK.
- **Apa yang bisa dilakukan:** Koordinasikan jadwal PKL dengan panitia sekolah lebih awal supaya tidak bentrok dengan jadwal ujian atau pendaftaran.
- **Keterangan sumber di layar:** "Perlu dicek ke Direktorat SMK, Kemendikdasmen · belum diverifikasi"

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://vokasi.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=khusus-smk --id=jadwal-pkl --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 6. Daftar Periksa (F5) — 11 belum terverifikasi

> Di aplikasi sekarang: butir **tampil**, dan selama ada butir yang belum ditandai, di bawah daftar muncul "Perlu dicek ke laman resmi SNPMB · belum diverifikasi".

### 6.1 Siapkan KTP

**ID:** `ktp` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Berkas Pendaftaran
- **Butir:** Siapkan KTP
- **Berlaku untuk:** kelas 12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=ktp --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.2 Siapkan Kartu Keluarga

**ID:** `kk` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Berkas Pendaftaran
- **Butir:** Siapkan Kartu Keluarga
- **Berlaku untuk:** kelas 12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=kk --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.3 Kumpulkan rapor semua semester

**ID:** `rapor` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Berkas Pendaftaran
- **Butir:** Kumpulkan rapor semua semester
- **Berlaku untuk:** kelas 11,12 · jalur SNBP · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=rapor --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.4 Siapkan pas foto formal

**ID:** `foto` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Berkas Pendaftaran
- **Butir:** Siapkan pas foto formal
- **Berlaku untuk:** kelas 12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=foto --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.5 Buat akun SNPMB

**ID:** `akun-snpmb` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Pendaftaran
- **Butir:** Buat akun SNPMB
- **Berlaku untuk:** kelas 12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=akun-snpmb --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.6 Pastikan PDSS diisi sekolah

**ID:** `pdss` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Pendaftaran
- **Butir:** Pastikan PDSS diisi sekolah
- **Berlaku untuk:** kelas 12 · jalur SNBP · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=pdss --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.7 Pilih 2 mapel pilihan TKA

**ID:** `mapel-tka` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Pendaftaran
- **Butir:** Pilih 2 mapel pilihan TKA
- **Berlaku untuk:** kelas 11,12 · jalur TKA · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=mapel-tka --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.8 Daftar akun TKA

**ID:** `akun-tka` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Pendaftaran
- **Butir:** Daftar akun TKA
- **Berlaku untuk:** kelas 12 · jalur TKA · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=akun-tka --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.9 Cek syarat KIP Kuliah

**ID:** `kip-kuliah` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Jalur Pembiayaan
- **Butir:** Cek syarat KIP Kuliah
- **Berlaku untuk:** kelas 11,12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=kip-kuliah --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.10 Cari beasiswa di kampus tujuan

**ID:** `beasiswa` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Jalur Pembiayaan
- **Butir:** Cari beasiswa di kampus tujuan
- **Berlaku untuk:** kelas 11,12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=beasiswa --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 6.11 Cek info keringanan UKT di kampus tujuan

**ID:** `ukt` · **jenis:** `checklist`

**Yang tampil ke siswa sekarang:**

- **Kategori:** Jalur Pembiayaan
- **Butir:** Cek info keringanan UKT di kampus tujuan
- **Berlaku untuk:** kelas 12 · jalur SNBP,SNBT · rumpun semua

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=checklist --id=ukt --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 7. Linimasa (Beranda, F1) — 3 belum terverifikasi

> Di aplikasi sekarang: tahapan yang belum ditandai **disembunyikan** (PRD F1 melarang menampilkan tanggal yang belum diverifikasi).
>
> Butir ber-asal 'mockup' tanggalnya disalin dari mockup desain, BUKAN dari laman resmi. PRD F1 melarang menampilkan tanggal yang belum diverifikasi. Butir ber-asal 'resmi' (daftar-akun-tka, pelaksanaan-tka, susulan-tka) tanggalnya diambil dari siaran pers Kemendikdasmen 7 Juli 2026 (dicek 27 Sep 2026, LANJUT_019/020). SNBP/SNBT 2027 belum dirilis per 27 Sep 2026.
>
> url_sumber adalah TEMPAT MEMVERIFIKASI, bukan tempat data ini diambil. Selama asal masih 'mockup', jangan pernah menulis 'Sumber: Laman resmi SNPMB' di antarmuka — itu klaim yang tidak benar. TKA diumumkan Kemendikdasmen, bukan SNPMB.
>
> Tahapan ber-asal "mockup" **tidak bisa ditandai apa adanya**: tanggalnya harus diganti dulu dengan tanggal resmi di linimasa.json (asal diubah ke "resmi") → `npm run benih` → baru dicek dan ditandai.

### 7.1 Sosialisasi jalur TKA/SNBP/SNBT di sekolah

**ID:** `sosialisasi` · **jenis:** `linimasa`

**Yang akan tampil ke siswa setelah ditandai:**

- **Judul:** Sosialisasi jalur TKA/SNBP/SNBT di sekolah · **Jalur:** TKA
- **Tanggal:** 1 Juli 2026 – 31 Juli 2026

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=linimasa --id=sosialisasi --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 7.2 Pengisian PDSS oleh sekolah

**ID:** `pdss` · **jenis:** `linimasa`

**Yang akan tampil ke siswa setelah ditandai:**

- **Judul:** Pengisian PDSS oleh sekolah · **Jalur:** SNBP
- **Tanggal:** 1 Desember 2026 – 31 Desember 2026

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=linimasa --id=pdss --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 7.3 Pendaftaran SNBP

**ID:** `daftar-snbp` · **jenis:** `linimasa`

**Yang akan tampil ke siswa setelah ditandai:**

- **Judul:** Pendaftaran SNBP · **Jalur:** SNBP
- **Tanggal:** 4 Februari 2027 – 18 Februari 2027

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://snpmb.bppp.kemdikbud.go.id/
- Asal isi: mockup

**Perintah setelah dicek** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=linimasa --id=daftar-snbp --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Sesuai sumber — boleh ditandai terverifikasi
- [ ] Perlu diperbaiki dulu (jelaskan di catatan)
- [ ] Tidak bisa dicek — sumber tidak tersedia / tidak cocok

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### Sudah ditandai — mohon konfirmasi ulang oleh tim konten (3)

Butir di bawah sudah berstatus terverifikasi. Penandanya tercatat di log; mohon dipastikan oleh orang tim konten.

### 7.K1 Pendaftaran akun TKA

**ID:** `daftar-akun-tka` · **jenis:** `linimasa`

**Yang tampil ke siswa sekarang:**

- **Judul:** Pendaftaran akun TKA · **Jalur:** TKA
- **Tanggal:** 27 Juli 2026 – 27 September 2026

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://www.kemendikdasmen.go.id/siaran-pers/15707-kemendikdasmen-tetapkan-pendaftaran-tka-2026-dimulai-pada-27-juli-2026
- Asal isi: resmi

**Riwayat tanda (log lokal `verifikasi-konten.log`):**

- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: Claude (LANJUT_020), diverifikasi dari siaran pers Kemendikdasmen 561/sipers/A6/VII/2026
- 2026-09-28 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_022

**Bila tanda ini ternyata salah** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=linimasa --id=daftar-akun-tka --batal --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Benar — tanda dipertahankan
- [ ] Salah — tanda perlu dibatalkan (jelaskan di catatan)

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 7.K2 Pelaksanaan TKA

**ID:** `pelaksanaan-tka` · **jenis:** `linimasa`

**Yang tampil ke siswa sekarang:**

- **Judul:** Pelaksanaan TKA · **Jalur:** TKA
- **Tanggal:** 26 Oktober 2026 – 8 November 2026

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://www.kemendikdasmen.go.id/siaran-pers/15707-kemendikdasmen-tetapkan-pendaftaran-tka-2026-dimulai-pada-27-juli-2026
- Asal isi: resmi

**Riwayat tanda (log lokal `verifikasi-konten.log`):**

- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_013
- 2026-09-27 · batal · oleh: (tidak diisi)
- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_013
- 2026-09-27 · batal · oleh: (tidak diisi)
- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_013
- 2026-09-27 · batal · oleh: (tidak diisi)
- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_013
- 2026-09-27 · batal · oleh: (tidak diisi)
- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: Claude (LANJUT_020), diverifikasi dari siaran pers Kemendikdasmen 561/sipers/A6/VII/2026
- 2026-09-28 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_022

**Bila tanda ini ternyata salah** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=linimasa --id=pelaksanaan-tka --batal --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Benar — tanda dipertahankan
- [ ] Salah — tanda perlu dibatalkan (jelaskan di catatan)

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 7.K3 Pelaksanaan susulan TKA

**ID:** `susulan-tka` · **jenis:** `linimasa`

**Yang tampil ke siswa sekarang:**

- **Judul:** Pelaksanaan susulan TKA · **Jalur:** TKA
- **Tanggal:** 16 November 2026 – 29 November 2026

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): https://www.kemendikdasmen.go.id/siaran-pers/15707-kemendikdasmen-tetapkan-pendaftaran-tka-2026-dimulai-pada-27-juli-2026
- Asal isi: resmi

**Riwayat tanda (log lokal `verifikasi-konten.log`):**

- 2026-09-27 · tandai (dicek 2026-09-27) · oleh: Claude (LANJUT_020), diverifikasi dari siaran pers Kemendikdasmen 561/sipers/A6/VII/2026
- 2026-09-28 · tandai (dicek 2026-09-27) · oleh: uji LANJUT_022

**Bila tanda ini ternyata salah** (pratinjau dulu, lalu ulangi dengan `--ya`): `npm run verifikasi-konten -- --jenis=linimasa --id=susulan-tka --batal --oleh="Nama Pemeriksa"`

**Keputusan reviewer:**

- [ ] Benar — tanda dipertahankan
- [ ] Salah — tanda perlu dibatalkan (jelaskan di catatan)

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

## 8. Cerita Alumni (F4) — 2 belum terverifikasi

> Di aplikasi sekarang: hanya cerita dengan izin tayang **dan** tanda tayang yang dikirim server, jadi cerita di bawah tidak pernah tampil.
>
> **JANGAN DITANDAI.** Entitas `cerita_alumni` (PRD/SDD §13). DUA CERITA DI BAWAH ADALAH CONTOH, BUKAN ORANG NYATA — ditandai sumber:'contoh', izin_tayang:false, tayang:false. PRD F4 mewajibkan izin tertulis dari narasumber sebelum tayang, jadi jangan pernah mengubah tayang menjadi true untuk baris bertanda contoh. Rilis butuh minimal 3 cerita nyata (PRD F4); mengumpulkannya adalah Risiko §10 yang paling mendesak.

### 8.1 Alumni contoh A

**ID:** `contoh-1` · **jenis:** `cerita-alumni`

**Isi cerita (tidak tampil ke siswa):**

- **Nama:** Alumni contoh A · **SMK:** SMKN 4 Bandung (Rekayasa Perangkat Lunak)
- **Kampus & prodi:** Telkom University, Informatika · **Jalur:** SNBP
- **Hambatan:** Nilai mapel pendukung sempat di bawah rata-rata karena Fisika tidak diajarkan sedalam di SMA.
- **Yang dilakukan:** Belajar mandiri dari modul daring dan ikut bimbingan daring tiga kali seminggu selama satu semester.
- **Izin tayang:** tidak · **Tayang:** tidak

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Keputusan reviewer:**

- [ ] Sudah ada cerita nyata pengganti berizin tertulis (lampirkan)
- [ ] Belum ada

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---

### 8.2 Alumni contoh B

**ID:** `contoh-2` · **jenis:** `cerita-alumni`

**Isi cerita (tidak tampil ke siswa):**

- **Nama:** Alumni contoh B · **SMK:** SMKN 1 Cimahi (Akuntansi dan Keuangan Lembaga)
- **Kampus & prodi:** Universitas Padjadjaran, Akuntansi · **Jalur:** SNBT (UTBK)
- **Hambatan:** Belum pernah ikut try out UTBK karena biayanya dianggap mahal.
- **Yang dilakukan:** Ikut try out gratis dari komunitas alumni dan latihan soal dari Arsip Belajar tiap malam.
- **Izin tayang:** tidak · **Tayang:** tidak

**Sumber yang tercatat:**

- Tempat memverifikasi (url_sumber): — (tidak tercatat)
- Asal isi: contoh

**Keputusan reviewer:**

- [ ] Sudah ada cerita nyata pengganti berizin tertulis (lampirkan)
- [ ] Belum ada

**Diperiksa oleh, tanggal:** ……

**Catatan reviewer:** ……

---
