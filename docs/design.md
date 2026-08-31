# design.md — Identitas Visual LANJUT

**Produk:** LANJUT (Layanan Navigasi Jalur Kuliah untuk Siswa SMK)
**Kelompok:** EDILAKSO GROUP
**Status:** dokumentasi eksplorasi logo & identitas visual — v1

---

## 1. Konsep dasar

Maskot: **kelinci wisudawan** — kelinci berdiri memakai topi toga, dengan ikon jam kecil di dekat kaki.

**Makna simbolik:**
- **Kelinci** → gerak cepat, lincah, "melompat maju" — selaras dengan nama "LANJUT"
- **Topi toga** → tujuan akhir: lulus dan masuk perguruan tinggi
- **Ikon jam** → elemen waktu/tenggat — mengingatkan bahwa jalur TKA/SNBP/SNBT terikat jadwal ketat, sejalan dengan fitur inti Linimasa dan Penolong Pilih Mapel

Maskot ini menjadi elemen pembeda visual utama, karena kompetitor (bimbel, sumber SMA) tidak punya identitas yang secara spesifik bicara ke anak SMK.

---

## 2. Wordmark / Logotype

**Tulisan:** "Lanjut" — huruf **L** kapital diperbesar dan diberi warna aksen, sisanya huruf kecil dengan warna kontras (putih di atas biru, atau gelap di atas terang).

**Detail khas:**
- Huruf **L** dibentuk melengkung menyerupai coretan/goresan pena — kesan personal, bukan huruf cetak kaku
- Titik di atas huruf **j** diganti ikon **topi toga kecil** — detail yang mengaitkan wordmark langsung ke tema akademik tanpa perlu maskot penuh
- Elemen kelinci kecil ditambahkan di ujung kanan sebagai penutup logo pada varian lengkap

**Dua varian layout wordmark:**
1. **Horizontal dengan badge** — teks "Lanjut" di dalam kotak membulat (rounded rectangle) warna biru, cocok untuk header aplikasi atau watermark
2. **Standalone** — teks putih tanpa latar, untuk ditumpuk di atas foto/warna gelap

---

## 3. Palet warna

| Warna | Kegunaan |
|---|---|
| **Biru muda (light blue)** | Warna utama — latar ikon, badge wordmark, elemen playful |
| **Biru sedang (medium blue)** | Aksen huruf L, elemen gradasi tengah |
| **Biru tua (steel blue)** | Bagian gradasi paling gelap, kontras teks |
| **Putih** | Wordmark di atas latar biru; latar ikon versi "clean" |
| **Hitam / garis gelap** | Versi outline maskot untuk kebutuhan mono/cetak |

**Gradasi 3-tingkat** (terlihat di swatch kiri atas) dipakai sebagai latar splash screen atau elemen dekoratif — dari biru muda ke biru sedang.

**Filosofi warna:** biru dipilih karena kesan tenang, dapat dipercaya, dan "akademik" tanpa terasa kaku/korporat — sesuai kebutuhan menenangkan kecemasan siswa SMK soal jalur kuliah (bukan menambah tekanan).

---

## 4. Ikon aplikasi (App Icon)

**Bentuk dasar:** rounded square (squircle), standar ikon iOS/Android modern.

**Isi ikon:** maskot kelinci bertopi toga + ikon jam kecil di sudut, tanpa teks — mengikuti prinsip ikon aplikasi yang harus dikenali dalam ukuran kecil.

**Varian yang dieksplorasi:**

| Varian | Latar | Garis maskot | Kegunaan disarankan |
|---|---|---|---|
| A — Gradasi biru penuh | Gradasi biru muda→sedang | Putih outline | **Ikon utama** — kontras baik di homescreen |
| B — Gradasi biru (rounded lebih kecil) | Sama seperti A, sudut lebih halus | Putih outline | Alternatif proporsi, untuk platform berbeda |
| C — Putih/terang | Putih–abu sangat muda | Biru muda outline | Mode terang / versi "clean", cocok untuk favicon |
| D (baris bawah, 3 kotak kecil) | Biru muda flat | Putih, biru, hitam (3 variasi garis) | Uji kontras — untuk menentukan warna garis final |
| E (deret garis saja) | Transparan | Biru, putih, hitam | Versi line-art lepas dari latar — untuk ilustrasi pendukung, bukan ikon aplikasi |

---

## 5. Rekomendasi penggunaan

**Ikon aplikasi final:** varian **A** (gradasi biru, outline putih) — kontrasnya paling stabil di berbagai latar homescreen (terang maupun gelap).

**Favicon / ukuran sangat kecil:** varian **C** (latar putih) — detail topi toga dan jam lebih mudah terbaca saat ukuran diperkecil drastis, dibanding versi gradasi yang detailnya melebur.

**Wordmark:**
- Header aplikasi & splash screen → varian badge biru dengan teks putih
- Dokumen resmi (proposal, laporan, slide) → varian standalone, disesuaikan warna latar dokumen

**Elemen line-art kelinci (tanpa latar)** cocok dipakai berulang sebagai motif dekoratif di halaman kosong (empty state), bukan sebagai logo utama — karena tanpa latar warna, elemen ini kehilangan kekuatan sebagai penanda identitas (brand recognition).

---

## 6. Yang belum diputuskan (perlu ditentukan sebelum dipakai final)

1. **Font wordmark resmi** — apakah huruf pada logo dipakai juga sebagai typeface UI aplikasi, atau logo berdiri sendiri dengan font UI terpisah (disarankan: font UI terpisah, sans-serif netral, supaya keterbacaan konten tetap tinggi).
2. **Kode warna HEX pasti** — palet di atas masih deskriptif, perlu diambil kode HEX presisi dari file sumber sebelum dipakai di Figma/kode produk.
3. **Ukuran minimum ikon** yang masih terbaca (uji cetak/tampil di ukuran 16px, 32px, 48px).
4. **Konsistensi antara maskot dan tone produk** — maskot kelinci terkesan playful/ringan; perlu dicek apakah ini selaras dengan positioning "bukti bahwa siswa SMK bisa tembus PTN" yang lebih serius, atau justru sengaja dipakai untuk melunakkan kecemasan pengguna soal topik seleksi PTN yang menegangkan.
