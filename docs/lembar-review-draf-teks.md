# Lembar Review Draf Teks LANJUT

Disusun otomatis dengan `npm run lembar-review-teks` (folder `LANJUT_App/server`) dari `docs/salinan-teks-lanjut.md` (sidik `4bdc88fdc032`). Lembar ini **hanya bacaan**: mengisinya tidak mengubah teks apa pun di app. Bunyi teks disalin persis dari berkas sumber.

**67 butir** dari 12 blok DRAF menunggu keputusan. 4 baris lain di blok DRAF tidak dijadikan butir karena sudah disetujui atau bukan teks yang tampil (lihat Lampiran).

## Cara memakai lembar ini

1. Untuk setiap butir, centang **satu** keputusan (ganti `[ ]` menjadi `[x]`): **Setuju**, **Ubah**, atau **Tolak**.
2. Kalau memilih **Ubah**, tulis bunyi barunya di kolom Revisi. Kalau memilih **Tolak**, tulis alasannya di Catatan.
3. `[kelas]`, `[mapel]`, `[nama prodi]`, `[n]`, dan sejenisnya adalah isian yang diganti app saat tampil.
4. Butir bertanda ⚠ menyentuh klaim faktual. Daftarnya ada di bagian berikut; periksa juga sumbernya.
5. Setelah diputuskan, perubahan dikerjakan sebagai task terpisah: `salinan-teks-lanjut.md` dan kode app diperbarui, lalu lembar ini dibuat ulang. Butir yang disetujui tidak muncul lagi di lembar berikutnya.

## Butir yang menyentuh klaim faktual

Butir ini menyatakan sesuatu tentang aturan seleksi, data kampus, atau proses pengecekan. Butir seperti ini perlu perhatian ekstra, dan kemungkinan perlu dicek ke sumbernya sebelum disetujui.

| No | Butir | Klaim | Sumber yang mungkin |
|---|---|---|---|
| 28 | Kartu "SMA, SMK, atau MA?" (§4.2, LANJUT_037) | Perbedaan SMA/MA (lebih banyak teori sebagai bekal kuliah) dan SMK (keahlian lewat praktik dan PKL), serta bahwa lulusan SMK tetap bisa kuliah. | Kemendikdasmen (struktur kurikulum SMA dan SMK), Kemenag (MA), SNPMB (syarat pendaftar SNBP/SNBT untuk lulusan SMK). |
| 29 | Kartu "Belum perlu mikirin jadwal daftar" (§4.2, LANJUT_037) | Saran bahwa jadwal pendaftaran belum perlu dipikirkan di kelas 10–11, dan bahwa nilai mapel pendukung perlu dijaga sejak sekarang (bergantung pada aturan SNBP yang memakai nilai rapor). | SNPMB (ketentuan SNBP: semester rapor yang dipakai dan mapel pendukung). |
| 31 | Pembuka seksi SMK kelas 10–11 (§4.2, LANJUT_037) | Bahwa butir yang tampil untuk kelas 10–11 (portofolio dan mapel pilihan TKA yang tidak ada di SMK) sudah bisa disiapkan dari sekarang. Isi kedua butir itu sendiri belum terverifikasi (lembar verifikasi konten, bagian Khusus SMK). | SNPMB dan Direktorat SMK, sesuai sumber kedua butir Khusus SMK itu. |
| 32 | Pengganti kelas 7–11 — judul (§4.11, LANJUT_035) | Bersama isi di bawahnya: jadwal dan persiapan SNBP, SNBT, dan TKA hanya untuk kelas 12. | Kemendikdasmen (TKA: jenjang yang diikutkan), SNPMB (SNBP/SNBT). Perlu dipastikan apakah ada TKA untuk jenjang lain yang relevan bagi siswa kelas 7–9. |
| 33 | Pengganti kelas 7–11 — isi (§4.11, LANJUT_035) | Isi bagian ini adalah jadwal dan persiapan SNBP, SNBT, dan TKA (lihat butir judul di atasnya). | Sama dengan butir judul di atasnya. |
| 38 | Butir dari Pilih Mapel (§4.4, LANJUT_034) | Dua mapel yang disebut sebagai mapel TKA untuk prodi itu, diambil dari pemetaan prodi → mapel bobot 3 yang masih berasal dari mockup (lembar verifikasi konten, bagian Prodi). | SNPMB (mapel pendukung program studi), Kemendikdasmen (mapel pilihan TKA). |
| 43 | Belum ada profil — isi (§4.9, LANJUT_031) | Janji bahwa isi profil baru tampil setelah dicek ke sumber resmi. Benar menurut kode (server hanya mengirim profil terverifikasi), tetapi bergantung pada standar pemeriksaan tim konten. | Standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046). |
| 45 | Lencana "Relevan untuk RPL/TKJ/Teknik" (§4.9, LANJUT_031) | Prodi ini relevan untuk jurusan SMK RPL, TKJ, atau Teknik (kolom badge_relevan_smk di profil-prodi.json). Dasar penilaiannya perlu dipastikan. | Kurikulum prodi (dokumen resmi kampus) dibandingkan dengan program keahlian SMK (Kemendikdasmen). |
| 46 | Baris sumber angka pendaftar (§4.9, LANJUT_031) | Angka pendaftar berasal dari SNPMB untuk jalur, tahun, dan kampus yang disebut. | SNPMB (daya tampung & peminat); angka per profil dicek di lembar verifikasi konten. |
| 47 | Penjelas label "Perkiraan" (§4.9, LANJUT_044) | Bagian berlabel "Perkiraan" disusun dari sumber umum, belum dari sumber resmi. | Definisi di kepala profil-prodi.json ("Perkiraan" = sumber sekunder atau gambaran umum). |
| 48 | Kaki halaman — semua bagian terverifikasi (§4.9, LANJUT_045) | Janji ke siswa bahwa isi profil "dicek ke sumber resmi" pada tanggal itu. | Hanya benar bila pemeriksa mengikuti standar pemeriksaan di lembar verifikasi konten (DRAF, LANJUT_046). |
| 49 | Kaki halaman — ada bagian Perkiraan (§4.9, LANJUT_045) | Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi"; bagian Perkiraan belum. | Sama dengan butir di atasnya. |
| 50 | Kaki halaman — ada bagian tanpa status (§4.9, LANJUT_045) | Janji bahwa bagian bertanda Terverifikasi "dicek ke sumber resmi". | Sama dengan butir di atasnya. |

## Ringkasan per layar

| Layar / fitur | Butir | Nomor |
|---|---|---|
| Daftar akun & gerbang awal | 13 | 1–13 |
| Jalur Saya (halaman akun) | 2 | 14–15 |
| Jenjang Saya (tab "Jenjang") | 16 | 16–31 |
| Bagian khusus kelas 12 (Beranda, Daftar Periksa, Cek Posisi) — pengganti untuk kelas lain | 6 | 32–37 |
| Daftar Periksa | 4 | 38–41 |
| Eksplorasi Tujuan (F10) | 9 | 42–50 |
| Arsip Belajar | 8 | 51–58 |
| Latihan | 9 | 59–67 |

## Daftar akun & gerbang awal

### 1. Medan Kelas

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_035 · baris 359
- **Tampil di:** Layar Daftar (buat akun), medan Kelas.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Label:** Kelas · **petunjuk:** SMP kelas 7–9, SMA/SMK kelas 10–12. · **pilihan:** Kelas 7 … Kelas 12

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 2. Galat medan Kelas

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_035 · baris 360
- **Tampil di:** Layar Daftar, saat menekan Daftar tanpa memilih kelas.
- **Dilihat oleh:** Semua pendaftar baru.

**Bunyi teks (persis dari berkas):**

> **Galat:** Pilih kelasmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 3. Medan Jenis sekolah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 366
- **Tampil di:** Layar Daftar, muncul sesudah kelas 10–12 dipilih.
- **Dilihat oleh:** Pendaftar kelas 10–12 (kelas 7–9 tidak ditanya).

**Bunyi teks (persis dari berkas):**

> **Label:** Jenis sekolah · **pilihan:** SMA · SMK · MA (Madrasah Aliyah)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 4. Galat medan Jenis sekolah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 367
- **Tampil di:** Layar Daftar, kelas 10–12 tanpa jenis sekolah.
- **Dilihat oleh:** Pendaftar kelas 10–12.

**Bunyi teks (persis dari berkas):**

> **Galat:** Pilih jenis sekolahmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 5. Gerbang isi kelas — judul

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 394
- **Tampil di:** Gerbang isi kelas, menggantikan seluruh app sampai kelas disimpan.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Judul:** Kamu kelas berapa sekarang?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 6. Gerbang isi kelas — pengantar

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 395
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Isi sekali ini saja supaya LANJUT menampilkan yang sesuai buat kamu. Nanti bisa diubah di Jalur Saya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 7. Gerbang isi kelas — medan

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 396
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Medan:** Kelas · petunjuk: SMP kelas 7–9, SMA/SMK kelas 10–12. · galat: Pilih kelasmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 8. Gerbang isi kelas — usulan dari perangkat

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 397
- **Tampil di:** Gerbang isi kelas, bila di perangkat ini tersimpan kelas yang pernah dipilih di Daftar Periksa dan siswa belum memilih ulang.
- **Dilihat oleh:** Akun tanpa kelas yang punya pilihan kelas tersimpan di perangkat.

**Bunyi teks (persis dari berkas):**

> **Bila kelas pernah dipilih di Daftar Periksa (perangkat ini):** Terpilih dari pilihanmu sebelumnya di Daftar Periksa. Cek lagi sebelum menyimpan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 9. Gerbang isi kelas — tombol

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_036 · baris 398
- **Tampil di:** Gerbang isi kelas.
- **Dilihat oleh:** Akun lama yang belum punya kelas.

**Bunyi teks (persis dari berkas):**

> **Tombol:** Simpan dan lanjut (proses: Menyimpan…) · Buka Jalur Saya · Keluar

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 10. Gerbang jenis sekolah — judul

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 404
- **Tampil di:** Gerbang langkah 2, sesudah kelas tersimpan (tidak pernah satu layar dengan langkah kelas).
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Judul:** Kamu sekolah di mana?

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 11. Gerbang jenis sekolah — pengantar

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 405
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Pengantar:** Kelas [kelas]: pilih jenis sekolahmu supaya isi LANJUT pas buat kamu. Nanti bisa diubah di Jalur Saya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 12. Gerbang jenis sekolah — medan

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 406
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Medan:** Jenis sekolah · pilihan: SMA · SMK · MA (Madrasah Aliyah) · galat: Pilih jenis sekolahmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 13. Gerbang jenis sekolah — tombol

- **Asal:** §4.12 Gerbang wajib isi kelas · LANJUT_038 · baris 407
- **Tampil di:** Gerbang langkah 2.
- **Dilihat oleh:** Kelas 10–12 yang belum memilih jenis sekolah.

**Bunyi teks (persis dari berkas):**

> **Tombol:** sama dengan langkah 1.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Jalur Saya (halaman akun)

### 14. Baris Sekolah & medan di form Ubah

- **Asal:** §4.10 Daftar (buat akun) · LANJUT_038 · baris 368
- **Tampil di:** Jalur Saya: baris "Sekolah" di kartu akun (berisi "Belum diisi" bila kosong); medan Jenis sekolah di form Ubah.
- **Dilihat oleh:** Baris: semua akun (kelas 7–9 tampil SMP). Medan di form Ubah: kelas 10–12.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya:** baris "Sekolah" di kartu; medan yang sama di form Ubah, hanya untuk kelas 10–12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 15. Kartu Kemajuan bukan kelas 12

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 383
- **Tampil di:** Jalur Saya, kartu Kemajuan (kelas 12 melihat ringkasan kemajuan).
- **Dilihat oleh:** Kelas 7–11 dan akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Jalur Saya, kartu Kemajuan:** Kemajuan persiapan SNBP, SNBT, dan TKA tampil di sini saat kamu kelas 12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Jenjang Saya (tab "Jenjang")

### 16. Judul halaman

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 130
- **Tampil di:** Jenjang Saya.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Judul:** Jenjang Saya

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 17. Pendamping kelas 7–9

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 131
- **Tampil di:** Jenjang Saya, di bawah judul.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> **Pendamping kelas 7–9:** Kelas [kelas] SMP: waktunya kenalan sama minat dan bakatmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 18. Pendamping kelas 10–11

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 132
- **Tampil di:** Jenjang Saya, di bawah judul.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> **Pendamping kelas 10–11:** Kelas [kelas]: mulai kenalan sama jurusan yang kamu incar.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 19. Pendamping kelas 12

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 133
- **Tampil di:** Jenjang Saya, di bawah judul.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Pendamping kelas 12:** Kelas 12: yang perlu kamu siapkan sebelum daftar kuliah.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 20. Pendamping tanpa kelas

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 134
- **Tampil di:** Jenjang Saya, di bawah judul (jaring pengaman; akun tanpa kelas biasanya tertahan di gerbang dulu).
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Pendamping tanpa kelas:** Isi kelasmu di Jalur Saya supaya isi halaman ini pas buat kamu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 21. Judul seksi pintu

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 135
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Seksi pintu:** Mulai dari sini

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 22. Pintu Ngobrol Bareng LANJUT

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 136
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–9.

**Bunyi teks (persis dari berkas):**

> Ngobrol Bareng LANJUT — Cerita soal yang kamu suka, nanti dibantu cari arahnya. (kelas 7–9)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 23. Pintu Gaya Belajar

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 137
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> Gaya Belajar — Kenali cara belajar yang paling nyambung buat kamu. (kelas 7–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 24. Pintu Eksplorasi Tujuan

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 138
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> Eksplorasi Tujuan — Intip prodi kuliah: belajar apa dan lulusannya kerja di mana. (kelas 7–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 25. Pintu Pilih Mapel

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 139
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 10–11.

**Bunyi teks (persis dari berkas):**

> Pilih Mapel — Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu. (kelas 10–11)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 26. Pintu Cek Posisi Gue

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 140
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> Cek Posisi Gue — Lihat kamu lagi di tahap mana dan langkah berikutnya. (kelas 12)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 27. Pintu Daftar Periksa

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 141
- **Tampil di:** Jenjang Saya, seksi pintu.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> Daftar Periksa — Satu per satu, tidak perlu sekaligus. (kelas 12)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 28. Kartu "SMA, SMK, atau MA?" ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 142
- **Tampil di:** Jenjang Saya, kartu informasi.
- **Dilihat oleh:** Kelas 7–9.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kartu kelas 7–9 — SMA, SMK, atau MA?:** Habis SMP, kamu bisa lanjut ke SMA, SMK, atau MA. SMA dan MA lebih banyak belajar teori sebagai bekal kuliah. SMK langsung belajar keahlian lewat praktik dan PKL, dan lulusannya tetap bisa kuliah. Pilih yang paling cocok sama minatmu, bukan cuma ikut teman.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 29. Kartu "Belum perlu mikirin jadwal daftar" ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 143
- **Tampil di:** Jenjang Saya, kartu informasi.
- **Dilihat oleh:** Kelas 10–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kartu kelas 10–11 — Belum perlu mikirin jadwal daftar:** Jadwal pendaftaran kuliah belum perlu dipikirkan sekarang. Fokus dulu cari jurusan yang cocok, lalu jaga nilai mapel yang mendukungnya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 30. Judul seksi SMK

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 144
- **Tampil di:** Jenjang Saya, seksi SMK.
- **Dilihat oleh:** Kelas 10–12 dengan jenis sekolah SMK.

**Bunyi teks (persis dari berkas):**

> **Seksi SMK (kelas 10–12 dengan jenis sekolah SMK, LANJUT_038):** Kalau kamu anak SMK

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 31. Pembuka seksi SMK kelas 10–11 ⚠

- **Asal:** §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 145
- **Tampil di:** Jenjang Saya, seksi SMK, di atas butir Khusus SMK.
- **Dilihat oleh:** Kelas 10–11 SMK.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Pembuka kelas 10–11:** Beberapa hal memang beda buat anak SMK. Yang ini sudah bisa kamu siapkan dari sekarang.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Bagian khusus kelas 12 (Beranda, Daftar Periksa, Cek Posisi) — pengganti untuk kelas lain

### 32. Pengganti kelas 7–11 — judul ⚠

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 377
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue, menggantikan isinya.
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — judul:** Bagian ini untuk kelas 12.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 33. Pengganti kelas 7–11 — isi ⚠

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 378
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue.
- **Dilihat oleh:** Kelas 7–11.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — isi:** Isinya jadwal dan persiapan SNBP, SNBT, dan TKA. Versi untuk kelas [kelas] sedang kami siapkan.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 34. Pengganti kelas 7–11 — tombol

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 379
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue.
- **Dilihat oleh:** Kelas 7–11.

**Bunyi teks (persis dari berkas):**

> **Kelas 7–11 — tombol:** Buka Jenjang Saya (sebelum LANJUT_037: Buka Khusus SMK)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 35. Pengganti tanpa kelas — judul

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 380
- **Tampil di:** Beranda (bagian tenggat), Daftar Periksa, dan Cek Posisi Gue (jaring pengaman; biasanya tertahan di gerbang isi kelas dulu).
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — judul:** Isi kelasmu dulu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 36. Pengganti tanpa kelas — isi

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 381
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — isi:** Isi bagian ini menyesuaikan kelasmu. Isi kelas di Jalur Saya, ya.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 37. Pengganti tanpa kelas — tombol

- **Asal:** §4.11 Bukan kelas 12 (placeholder sementara) · LANJUT_035 · baris 382
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Akun tanpa kelas.

**Bunyi teks (persis dari berkas):**

> **Kelas kosong — tombol:** Isi kelas di Jalur Saya · Buka Jenjang Saya

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Daftar Periksa

### 38. Butir dari Pilih Mapel ⚠

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 175
- **Tampil di:** Dibuat saat menekan "Simpan ke Daftar Periksa" di hasil Pilih Mapel (dengan prodi); tampil di Daftar Periksa, kategori Pendaftaran, langsung tercentang.
- **Dilihat oleh:** Daftar Periksa hanya tampil untuk kelas 12; butirnya bisa dibuat dari kelas mana pun lewat Pilih Mapel.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Dari Pilih Mapel (kategori Pendaftaran, langsung tercentang):** Pilih [mapel] & [mapel] sebagai mapel TKA — untuk [nama prodi]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 39. Butir dari Eksplorasi Tujuan

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 176
- **Tampil di:** Dibuat saat menekan "Simpan ke Daftar Periksa" di profil Eksplorasi Tujuan; tampil di Daftar Periksa, kategori Riset Kampus, belum tercentang.
- **Dilihat oleh:** Daftar Periksa hanya tampil untuk kelas 12.

**Bunyi teks (persis dari berkas):**

> **Dari Eksplorasi Tujuan (kategori Riset Kampus, belum tercentang):** Cari tahu lebih lanjut soal [nama prodi]

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 40. Tombol Hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 177
- **Tampil di:** Daftar Periksa, pada butir milik akun.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Tombol di butir milik akun:** Hapus

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 41. Galat centang/hapus

- **Asal:** §4.4 Daftar Periksa · LANJUT_034 · baris 178
- **Tampil di:** Daftar Periksa, saat centang atau hapus gagal tersimpan.
- **Dilihat oleh:** Kelas 12.

**Bunyi teks (persis dari berkas):**

> **Galat centang/hapus:** Perubahan terakhir belum tersimpan. Coba lagi. (sebelumnya "Centang terakhir belum tersimpan. Coba lagi.", diganti karena kini juga berlaku untuk hapus)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Eksplorasi Tujuan (F10)

### 42. Belum ada profil — judul

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 309
- **Tampil di:** Eksplorasi Tujuan, selama belum ada satu pun profil terverifikasi (keadaan semua siswa saat ini).
- **Dilihat oleh:** Semua akun yang membuka Eksplorasi Tujuan (pintu kelas 7–11 di Jenjang Saya, atau dari hasil Pilih Mapel).

**Bunyi teks (persis dari berkas):**

> **Belum ada profil terverifikasi — judul:** Profil prodi sedang kami cek.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 43. Belum ada profil — isi ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 310
- **Tampil di:** Sama dengan butir di atasnya.
- **Dilihat oleh:** Sama dengan butir di atasnya.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Belum ada profil terverifikasi — isi:** Peminat, mata kuliah, dan kampus tiap prodi baru tampil di sini setelah dicek ke sumber resmi. Sementara itu, mapel yang dibutuhkan sudah bisa kamu lihat di Pilih Mapel.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 44. Tombol kembali & prodi lain

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 311
- **Tampil di:** Eksplorasi Tujuan: di keadaan kosong, dan di bawah profil.
- **Dilihat oleh:** Semua akun yang membuka Eksplorasi Tujuan.

**Bunyi teks (persis dari berkas):**

> **Tombol:** Kembali ke Pilih Mapel · di bawah profil: Lihat prodi lain

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 45. Lencana "Relevan untuk RPL/TKJ/Teknik" ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 312
- **Tampil di:** Profil Eksplorasi Tujuan, di bawah nama prodi, hanya untuk profil yang ditandai relevan.
- **Dilihat oleh:** Semua akun yang membuka profil itu.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Lencana SMK:** Relevan untuk RPL/TKJ/Teknik (dari SDD-F10 §F.2)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 46. Baris sumber angka pendaftar ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 313
- **Tampil di:** Profil Eksplorasi Tujuan, kartu angka pendaftar.
- **Dilihat oleh:** Semua akun yang membuka profil.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Baris sumber peminat:** Sumber: SNPMB [jalur] [tahun], [kampus] — nama kampus disebut karena angka pendaftar adalah angka satu kampus, bukan nasional.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 47. Penjelas label "Perkiraan" ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_044 · baris 325
- **Tampil di:** Profil Eksplorasi Tujuan, tepat di bawah lencana "Perkiraan" pada setiap bagian yang berlabel itu (saat ini mata kuliah dan profesi).
- **Dilihat oleh:** Semua akun yang membuka profil dengan bagian "Perkiraan".
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Penjelas Perkiraan:** Perkiraan artinya bagian ini disusun dari sumber umum, belum dari sumber resmi, jadi cek lagi ke kampus tujuanmu.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 48. Kaki halaman — semua bagian terverifikasi ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 338
- **Tampil di:** Profil Eksplorasi Tujuan, kaki halaman, bila keempat bagian "Terverifikasi".
- **Dilihat oleh:** Semua akun yang membuka profil seperti itu (saat ini 4 dari 18 profil).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Keempat bagian "Terverifikasi":** Isi profil ini dicek ke sumber resmi pada [tanggal].

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 49. Kaki halaman — ada bagian Perkiraan ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 339
- **Tampil di:** Profil Eksplorasi Tujuan, kaki halaman, bila ada bagian "Perkiraan".
- **Dilihat oleh:** Semua akun yang membuka profil seperti itu (saat ini 14 dari 18 profil).
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ada bagian "Perkiraan":** Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal]. Bagian bertanda Perkiraan belum dicek ke sumber resmi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 50. Kaki halaman — ada bagian tanpa status ⚠

- **Asal:** §4.9 Eksplorasi Tujuan · LANJUT_045 · baris 340
- **Tampil di:** Profil Eksplorasi Tujuan, kaki halaman, bila ada bagian tanpa status di data (tidak terjadi di data saat ini).
- **Dilihat oleh:** Saat ini tidak ada.
- **⚠ Klaim faktual:** lihat daftar di awal lembar.

**Bunyi teks (persis dari berkas):**

> **Ada bagian tanpa status di data** (tidak terjadi di data sekarang; aman-gagal): Bagian bertanda Terverifikasi dicek ke sumber resmi pada [tanggal].

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Arsip Belajar

### 51. Pintu di Beranda

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 194
- **Tampil di:** Beranda (Linimasa), kartu pintu.
- **Dilihat oleh:** Semua kelas.

**Bunyi teks (persis dari berkas):**

> **Pintu di Beranda:** Arsip Belajar — Catatan dan soal buatanmu, disimpan per mapel.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 52. Daftar kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 195
- **Tampil di:** Arsip Belajar, daftar kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Daftar:** tombol Tambah kartu · saringan Semua (n) / [mapel] (n) · lencana [mapel] dan Soal/Catatan (Soal = ada jawaban)

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 53. Judul halaman

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 196
- **Tampil di:** Arsip Belajar, bilah judul tiap halaman.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Judul halaman (page bar):** Arsip Belajar · Kartu · Tulis Kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 54. Formulir kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 197
- **Tampil di:** Arsip Belajar, tulis/ubah kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Formulir:** Tambah kartu baru / Ubah kartu · Mapel · Judul (mis. Turunan fungsi aljabar) · Isi (Tulis di sini...) · Jawaban (boleh dikosongkan; Jawaban atau pembahasan singkat...; Isi bila kartunya berbentuk soal.) · Kartu ini akan bertanda Diunggah pengguna — belum diverifikasi tim. · Simpan kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 55. Galat formulir

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 198
- **Tampil di:** Arsip Belajar, saat menyimpan kartu yang belum lengkap.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Galat formulir:** Pilih mapelnya. · Judul belum diisi. · Isi belum diisi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 56. Lihat kartu

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 199
- **Tampil di:** Arsip Belajar, halaman satu kartu.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Lihat kartu:** Lihat jawaban · Jawaban · Ubah kartu · Hapus kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 57. Konfirmasi hapus

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 200
- **Tampil di:** Arsip Belajar, sebelum kartu dihapus.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Konfirmasi hapus:** Hapus kartu ini? Kartu yang dihapus tidak bisa dikembalikan dari app. · Batal · Ya, hapus

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 58. Kartu tidak ditemukan

- **Asal:** §4.5 Arsip Belajar · LANJUT_039 · baris 201
- **Tampil di:** Arsip Belajar, membuka kartu yang sudah tidak ada.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Kartu tidak ditemukan:** Kartu ini tidak ditemukan. · Mungkin sudah dihapus. · Kembali ke Arsip

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Latihan

### 59. Pintu di Arsip Belajar

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 230
- **Tampil di:** Arsip Belajar, tombol menuju Latihan.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Pintu di Arsip Belajar:** Mulai latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 60. Sebelum mulai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 228
- **Tampil di:** Latihan, sebelum sesi dimulai.
- **Dilihat oleh:** Semua akun yang punya kartu.

**Bunyi teks (persis dari berkas):**

> **Sebelum mulai:** [n] kartu, kira-kira [m] menit. (12 kartu → 8 menit) · Mapel: Semua ([n]) / [mapel] ([n]) · tombol Mulai · Ambil 5 kartu · Riwayat latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 61. Arsip kosong

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 229
- **Tampil di:** Latihan, bila belum ada kartu sama sekali.
- **Dilihat oleh:** Akun tanpa kartu.

**Bunyi teks (persis dari berkas):**

> **Arsip kosong:** Belum ada kartu untuk dilatih. · Latihan memakai kartu buatanmu di Arsip Belajar. Tambah satu dulu. · Tambah kartu

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 62. Selama sesi

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 231
- **Tampil di:** Latihan, kartu satu per satu.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Selama sesi:** Kartu [i] dari [n] · [mapel] · Soal/Catatan · Lihat jawaban / Lihat isi · Coba ingat isi catatan ini dulu. · Jawaban / Isi catatan · Jawabanmu tadi? Salah · Benar / Kamu ingat? Belum ingat · Sudah ingat · Pilih dulu hasilnya, baru lanjut. · Berikutnya / Lihat hasil · Selesai sekarang

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 63. Sesudah selesai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 232
- **Tampil di:** Latihan, ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun yang berlatih.
- **Catatan:** Potongan "Beres. [b] benar dari [i]." sudah disetujui (kepala blok); yang diputuskan adalah bagian lain di butir ini.

**Bunyi teks (persis dari berkas):**

> **Sesudah selesai:** Latihan Selesai · [i] dari [n] kartu · Beres. [b] benar dari [i]. · (berhenti lebih awal) Berhenti sebelum selesai — tidak apa-apa. [b] benar dari [i]. · (tidak ada jawaban) Belum ada kartu yang dijawab.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 64. Penyimpanan hasil

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 233
- **Tampil di:** Latihan, ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Penyimpanan:** Menyimpan hasil… · Tersimpan di Riwayat Latihan. · Hasil latihan belum tersimpan. · Coba lagi

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 65. Tombol akhir

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 234
- **Tampil di:** Latihan, ringkasan akhir sesi.
- **Dilihat oleh:** Semua akun yang berlatih.

**Bunyi teks (persis dari berkas):**

> **Tombol akhir:** Ulangi · Lihat riwayat latihan · Kembali ke Arsip

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 66. Galat mulai

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 235
- **Tampil di:** Latihan, bila sesi gagal dimulai.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Galat mulai:** Latihan belum bisa dimulai. Coba lagi sebentar lagi.

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

### 67. Riwayat Latihan

- **Asal:** §4.7 Sesi Latihan Harian · LANJUT_041 · baris 236
- **Tampil di:** Riwayat Latihan.
- **Dilihat oleh:** Semua akun.

**Bunyi teks (persis dari berkas):**

> **Riwayat Latihan:** [mapel] / Semua mapel · [tanggal, jam] · [i] dari [n] kartu · [b] benar · lencana Tidak selesai · kosong: Belum ada sesi latihan. Sesi yang sudah kamu kerjakan muncul di sini. · Mulai latihan

**Keputusan:**

- [ ] Setuju
- [ ] Ubah
- [ ] Tolak

**Revisi (kalau Ubah):** ……

**Catatan:** ……

---

## Lampiran: baris di blok DRAF yang tidak dijadikan butir

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 146 — Memakai pembuka lama §4.2 yang bukan DRAF; kepala blok menyebutnya dikecualikan.

> **Pembuka kelas 12:** pembuka lama di atas.

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 147 — Aturan butir Khusus SMK mana yang tampil per kelas, bukan teks yang tampil. Isi butirnya sendiri diperiksa di lembar verifikasi konten (bagian Khusus SMK).

> **Butir SMK per kelas:** kelas 12 melihat keenam butir. Kelas 10–11 hanya
> butir tanpa SNBP/PDSS/UTBK/kuota/periode pendaftaran: `portofolio` dan
> `mapel-tka-tidak-ada` (daftar izin di `lib/khususSmk.ts`). Empat butir lain
> disembunyikan, tidak ditulis ulang, supaya tidak ada klaim baru tanpa sumber.
> Kelas 7–9 tidak melihat bagian SMK.

- §4.2 Khusus SMK → Jenjang Saya · LANJUT_037 · baris 152 — Catatan perilaku (siapa yang melihat seksi SMK), bukan teks yang tampil.

> **Sejak LANJUT_038:** akun punya `jenis_sekolah`, jadi seksi SMK hanya tampil
> untuk siswa SMK. Siswa SMA/MA kelas 10–12 tidak melihatnya.

- §4.9 Eksplorasi Tujuan · LANJUT_031 · baris 314 — Catatan bahwa tombol memakai teks PWA §4.9 yang bukan DRAF; tidak ada teks baru.

> Tombol **Simpan ke Daftar Periksa** ada di Expo sejak LANJUT_034, memakai teks PWA di atas (butir milik akun; lihat §4.4).

## Lampiran: blok DRAF di berkas sumber

| Bagian | Task | Baris | Butir di blok |
|---|---|---|---|
| §4.2 Khusus SMK → Jenjang Saya | LANJUT_037 | 125 | 19 |
| §4.4 Daftar Periksa | LANJUT_034 | 172 | 4 |
| §4.5 Arsip Belajar | LANJUT_039 | 189 | 8 |
| §4.7 Sesi Latihan Harian | LANJUT_041 | 221 | 9 |
| §4.9 Eksplorasi Tujuan | LANJUT_031 | 304 | 6 |
| §4.9 Eksplorasi Tujuan | LANJUT_044 | 316 | 1 |
| §4.9 Eksplorasi Tujuan | LANJUT_045 | 327 | 3 |
| §4.10 Daftar (buat akun) | LANJUT_035 | 357 | 2 |
| §4.10 Daftar (buat akun) | LANJUT_038 | 362 | 3 |
| §4.11 Bukan kelas 12 (placeholder sementara) | LANJUT_035 | 372 | 7 |
| §4.12 Gerbang wajib isi kelas | LANJUT_036 | 390 | 5 |
| §4.12 Gerbang wajib isi kelas | LANJUT_038 | 400 | 4 |
| **Jumlah** | | | **71** (67 butir keputusan + 4 di lampiran) |
