# Rancangan Fitur & Model Pendapatan
## Arsip Belajar · Latihan · Bank Soal — LANJUT

**Status:** rancangan P1 — dibangun setelah P0 tayang, tetapi **keputusan struktur datanya diambil sekarang**
**Tim:** EDILAKSO GROUP · Dokumen pendamping Spesifikasi Produk LANJUT v1
**Model pendapatan:** Kombinasi A + C

---

## 1. Mengapa Dirancang Sekarang Padahal Dibangun Nanti

Sebagian besar fitur bisa ditambahkan belakangan tanpa masalah. Fitur ini tidak, karena satu alasan: **kartu di LANJUT akan punya tiga kelas kepercayaan yang berbeda**, dan struktur datanya harus menampung ketiganya sejak baris kode pertama.

| Kelas | Sumber | Status verifikasi | Contoh |
|---|---|---|---|
| **Resmi** | Tim, dari Kemendikdasmen/SNPMB | Diverifikasi tim, bersumber resmi | Linimasa, halaman Khusus SMK |
| **Pengguna** | Diunggah pengguna sendiri | **Tidak diverifikasi siapa pun** | Kartu catatan & soal di Arsip Belajar |
| **Mitra** | Bimbel/guru mitra | Diverifikasi mitra, bukan tim | Bank Soal bersponsor |

Kalau ketiga kelas ini tidak dibedakan sejak awal, konsekuensinya bukan sekadar merapikan tampilan nanti — melainkan menulis ulang model data, dan itu pekerjaan yang jatuh persis di bulan Oktober saat tim sedang menghadapi TKA.

**Keputusan yang diambil sekarang:** setiap kartu di basis data wajib punya kolom `sumber` (resmi/pengguna/mitra) dan `pemilik`, sejak versi pertama, meskipun pada v1 hanya kelas "resmi" yang terpakai.

---

## 2. Rancangan Fitur

### 2.1 Arsip Belajar (gratis, milik pengguna)

Tim menyediakan **kerangka**, pengguna mengisi **isinya**.

- Kategori mengikuti struktur mata uji TKA: 3 mapel wajib + 2 mapel pilihan yang dipilih pengguna sendiri.
- Pengguna menambah kartu: judul, isi (catatan atau soal), jawaban bila berupa soal.
- Arsip **privat** — tidak dibagikan ke pengguna lain pada tahap ini. Ini sekaligus pengaman HAKI: tanpa penyebaran, risiko hukumnya jauh lebih kecil.
- Setiap kartu menampilkan penanda tetap yang tidak dapat disembunyikan: *"Diunggah pengguna — belum diverifikasi tim."*
- Kartu pertama langsung dapat dipakai berlatih. Tidak ada ambang minimum jumlah kartu.

### 2.2 Latihan Harian (gratis dasar, lanjutan berbayar)

| Fungsi | Gratis | Berbayar (Jalan A) |
|---|---|---|
| Sesi kartu acak dari arsip sendiri | ✓ | ✓ |
| Penghitung hari berturut-turut berlatih | ✓ | ✓ |
| Ringkasan akhir sesi | ✓ | ✓ |
| **Mode ujian bertimer** (meniru kondisi TKA) | — | ✓ |
| **Statistik kemajuan per mata pelajaran** | — | ✓ |
| **Pengulangan berjarak otomatis** (kartu yang sering salah muncul lebih sering) | — | ✓ |
| **Ekspor arsip** (PDF/cetak untuk belajar luring) | — | ✓ |

Pembagian ini disusun dengan satu kaidah: **yang gratis harus tetap berguna utuh.** Fitur berbayar mempercepat dan mempertajam, tetapi tidak menyandera fungsi dasarnya. Produk yang melumpuhkan diri sendiri untuk memaksa pembayaran akan kehilangan pengguna — dan pengguna adalah syarat penilaian KIK.

### 2.3 Bank Soal Mitra (Jalan C — mitra yang mengisi dan membayar)

Berbeda dari Arsip Belajar. Ini kumpulan soal yang **disediakan mitra**, dapat diakses semua pengguna.

- Setiap kumpulan soal menampilkan identitas penyedianya secara terbuka: *"Disediakan oleh [nama bimbel] — soal dan pembahasan menjadi tanggung jawab penyedia."*
- Ditempatkan di tab terpisah dari Arsip Belajar pribadi, tidak dicampur.
- Mitra memperoleh: nama tercantum, tautan ke kanal mereka, dan laporan jumlah pengguna yang mengerjakan soalnya.
- Tim memperoleh: konten berkualitas tanpa biaya produksi, ditambah pendapatan.

---

## 3. Model Pendapatan A + C

### 3.1 Kenapa dua jalur sekaligus

| | Jalan A | Jalan C |
|---|---|---|
| Siapa yang membayar | Pengguna (siswa) | Bimbel/lembaga mitra |
| Nilai yang dibeli | Kemampuan lanjutan | Akses ke segmen siswa SMK |
| Besaran realistis | Kecil | Jauh lebih besar |
| Kecepatan terwujud | Cepat — bisa dijalankan begitu fitur jadi | Lambat — butuh angka pengguna dulu |
| Fungsinya bagi tim | **Bukti mekanisme pembayaran berjalan** | **Sumber pendapatan sesungguhnya** |

Kejujuran yang perlu ditulis apa adanya di Business Plan: **Jalan A tidak akan menghasilkan uang berarti pada skala sekolah.** Pelajar punya daya beli rendah, dan tingkat konversi ke berbayar untuk produk pelajar realistis di kisaran beberapa persen saja. Nilainya bukan pada nominal, melainkan pada pembuktian bahwa ada orang yang bersedia membayar sama sekali — itu data yang jauh lebih berharga daripada proyeksi mana pun.

Jalan C adalah mesin pendapatannya. Tetapi Jalan C **mustahil dijalankan sebelum ada pengguna**, karena yang dijual ke mitra adalah akses ke pengguna. Maka urutannya mengikat: pengguna dulu → Jalan A sebagai bukti mekanisme → Jalan C sebagai pendapatan.

### 3.2 Perkiraan angka untuk Business Plan (M9–M12)

*Seluruh angka di bawah adalah contoh. Wajib diganti dengan angka nyata tim sebelum diserahkan.*

**Biaya tetap per tahun**

| Pos | Perkiraan |
|---|---|
| Domain | Rp 150.000 |
| Hosting | Rp 0 (paket gratis untuk skala ini) |
| Perkakas desain | Rp 0 |
| Nilai waktu perawatan konten (4 jam/bulan × 12 × Rp 25.000) | Rp 1.200.000 |
| **Total** | **Rp 1.350.000** |

**Jalur A — langganan fitur lanjutan**

- Harga: Rp 15.000 per pengguna per semester
- Asumsi konversi: 4% dari pengguna aktif
- Pada 150 pengguna → 6 pembayar → **Rp 90.000 per semester**

**Jalur C — kemitraan bimbel**

- Harga: Rp 500.000 per mitra per semester
- Target: 3 mitra
- → **Rp 1.500.000 per semester**

**BEP gabungan**

> Pendapatan per semester = Rp 90.000 + Rp 1.500.000 = Rp 1.590.000
> Biaya tetap per semester = Rp 675.000
> **BEP tercapai pada 2 mitra bimbel** (2 × 500.000 = Rp 1.000.000 > Rp 675.000)

**ROI pada skenario di atas**

> Laba = 1.590.000 − 675.000 = Rp 915.000
> ROI = 915.000 ÷ 675.000 × 100% = **± 136% per semester**

Angka ini kecil dalam rupiah, dan itu wajar untuk usaha siswa. Yang dinilai penguji bukan besarnya, melainkan apakah tim memahami dari mana setiap angka berasal — termasuk kenapa nilai waktu tim ikut dihitung meski tidak dibayar tunai.

---

## 4. Risiko yang Melekat pada Model Ini

**Risiko kredibilitas — yang paling perlu diperhatikan.**
Seluruh dasar keberadaan LANJUT adalah bahwa lembaga bimbingan belajar menyusun materi dengan asumsi kurikulum SMA dan tidak melayani siswa SMK. Lalu bimbel dijadikan mitra pengisi bank soal. Apakah ini bertentangan?

Tidak — asalkan pembingkaiannya benar. LANJUT bukan menyerah kepada bimbel, melainkan **menjadi jalan bagi bimbel untuk menyesuaikan diri dengan segmen SMK.** Tetapi ini hanya bertahan bila dua syarat dipenuhi: identitas penyedia selalu ditampilkan terbuka, dan konten mitra tidak pernah dicampur ke dalam halaman resmi (Linimasa, Khusus SMK). Begitu batas itu kabur, keunggulan LANJUT sebagai pihak netral ikut hilang.

**Risiko HAKI.**
Kemitraan justru **memperbaiki** posisi HAKI dibanding konten pengguna, karena hak atas soal jelas dimiliki mitra dan dapat diikat perjanjian tertulis. Syaratnya: perjanjian sederhana yang menyatakan mitra menjamin soal adalah karya mereka sendiri, ditandatangani sebelum konten tayang.

**Risiko pengguna merasa diperah.**
Bila pengguna membayar (Jalan A) sekaligus melihat konten bersponsor (Jalan C), bisa timbul kesan produk mengambil dari dua arah. Pengaman: fitur berbayar hanya menyangkut kemampuan pribadi (timer, statistik, ekspor), tidak pernah berupa "bayar untuk menghilangkan sponsor". Kedua jalur tidak bersinggungan di mata pengguna.

**Risiko jadwal.**
Fitur ini P1. Bila pada 23 Oktober belum selesai, **jangan dipaksakan** — presentasikan sebagai rancangan matang yang siap dibangun, lengkap dengan dokumen ini. Rancangan yang dipikirkan dalam-dalam lebih bernilai di mata penguji daripada fitur setengah jadi yang tidak berfungsi.

---

## 5. Urutan Pengerjaan

| Tahap | Kapan | Isi |
|---|---|---|
| Keputusan struktur data | **Sekarang, sebelum koding P0** | Kolom `sumber` dan `pemilik` pada setiap kartu |
| Arsip Belajar + latihan dasar | Setelah P0 tayang (± M12) | Kerangka kategori, tambah kartu, sesi acak |
| Fitur berbayar (Jalan A) | Setelah arsip dipakai nyata | Timer, statistik, ekspor |
| Penjajakan mitra (Jalan C) | Setelah ada angka pengguna | Surat penawaran + satu surat minat sudah cukup untuk KIK |
| Bank Soal Mitra tayang | Bila waktu memungkinkan | Bila tidak, cukup tampilkan rancangan saat pitching |

**Catatan untuk pitching:** untuk keperluan penilaian KIK, tim tidak perlu sudah menerima uang. Satu **surat minat dari bimbel lokal** ditambah angka pengguna nyata sudah menunjukkan model bisnisnya masuk akal — dan itu bukti yang jauh lebih kuat daripada proyeksi pendapatan mana pun.
