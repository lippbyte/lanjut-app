# design.md — Panduan Desain LANJUT

**Produk:** LANJUT (Layanan Navigasi Jalur Kuliah untuk Siswa SMK)
**Kelompok:** EDILAKSO GROUP
**Status:** v3.1 — warna & font terkunci (font body diperbarui 22 Oktober 2026), sebagian tata letak masih 🔴 **perlu diisi**
**Dokumen terkait:** `salinan-teks-lanjut.md` (nada suara & teks UI)

> **Cara pakai dokumen ini:** ini bukan katalog aset, tapi kontrak visual. Setiap kali membuat aset baru (slide, ilustrasi, komponen UI), dokumen ini yang jadi rujukan pertama — termasuk untuk AI supaya hasilnya konsisten tanpa perlu dijelaskan ulang tiap kali.

---

## 1. Prinsip Desain

*(2–4 kalimat filosofi, bukan daftar warna. Ini yang menentukan keputusan desain saat situasinya belum diatur eksplisit di bawah.)*

Sudah didapat dari pembahasan sebelumnya:
> Tenang, dapat dipercaya, "akademik" tanpa kaku/korporat. Desain menenangkan kecemasan siswa SMK soal jalur kuliah — tenggat boleh ditampilkan, tapi tidak dijadikan alat tekanan.

🔴 **Perlu dikunci tim:** apakah maskot kelinci yang playful ini disengaja untuk melunakkan topik yang menegangkan (seleksi PTN), atau perlu dijaga agar tidak terkesan meremehkan keseriusan topik? *(lihat catatan di Bagian 8)*

**Referensi pembanding** *(membantu AI/tim membayangkan tanpa kata abstrak):*
🔴 Contoh format: "Mirip [nama app] dari sisi [aspek], tapi lebih [beda]nya di mana."

---

## 2. Warna

### 2.1 Palet inti

| Nama | Kegunaan | Kode HEX |
|---|---|---|
| Biru muda (light blue) | Warna utama — latar ikon, badge wordmark, elemen playful | `#B4E1EB` |
| Biru sedang (medium blue) | Aksen huruf L, elemen gradasi tengah | `#95BDD7` |
| Biru tua (steel blue) | Bagian gradasi paling gelap, kontras teks | `#78A4CB` |
| Putih | Wordmark di atas latar biru; latar ikon versi "clean" | `#FFFFFF` |
| Hitam / garis gelap | Versi outline maskot, teks body | 🔴 *(belum diambil dari file sumber — sarankan sementara `#1A1A1A`, bukan `#000000` murni, supaya tidak terlalu keras di atas biru muda)* |

**Status:** terkunci dari file sumber logo (lihat referensi swatch), kecuali warna hitam/garis gelap.

### 2.2 Warna fungsional (belum ada — 🔴 perlu ditentukan)

| Fungsi | Warna | Kode HEX |
|---|---|---|
| Sukses / selesai | 🔴 belum ada di palet inti — perlu warna baru (mis. hijau lembut) supaya berbeda jelas dari biru brand | 🔴 |
| Peringatan tenggat mendekat | Biru tua (dari palet inti, bukan warna baru — lihat Bagian 2.3) | `#78A4CB` (versi lebih tegas: pertimbangkan diberi bobot font lebih tebal, bukan warna baru) |
| Error / gagal | 🔴 belum ada di palet inti — perlu satu warna non-biru untuk kasus gagal murni (lihat larangan di 2.3) | 🔴 |
| Teks body di atas latar terang | Hitam/garis gelap | `#1A1A1A` *(sementara, sama seperti di 2.1)* |

**Catatan:** palet inti murni bernuansa biru, sehingga "peringatan" sebaiknya dibedakan lewat *bobot* (tebal/ukuran) dan bukan warna baru, supaya tetap sejalan dengan prinsip "tenggat ditampilkan, bukan ditekankan". Warna sukses & error tetap perlu ditambahkan di luar palet inti — 🔴 pilih saat sudah ada layar yang membutuhkannya, jangan menebak sekarang.

### 2.3 Larangan warna (anti-pattern)

- **Hindari merah/oranye terang** untuk elemen apa pun kecuali error murni — kesannya alarm/urgensi, bertentangan dengan prinsip "tenggat ditampilkan, bukan ditekankan".
- **Jangan pakai hitam pekat (`#000000`)** untuk teks body — gunakan `#1A1A1A` supaya kontrasnya tidak terlalu keras di atas biru muda `#B4E1EB`.
- **Jangan campur warna di luar tiga tingkat biru** (`#B4E1EB` / `#95BDD7` / `#78A4CB`) untuk elemen dekoratif — variasi tambahan hanya untuk warna fungsional (sukses/error) yang scope-nya sempit dan jelas.

### 2.4 Gradasi

Gradasi 3-tingkat (biru muda → biru sedang) dipakai sebagai latar splash screen atau elemen dekoratif.

**Urutan warna (dari terang ke gelap):** `#B4E1EB` → `#95BDD7` → `#78A4CB`.

🔴 Arah gradasi (diagonal/vertikal/radial) belum ditentukan — dari referensi swatch terlihat vertikal (atas ke bawah), disarankan dipertahankan konsisten di seluruh aset.

---

## 3. Tipografi

**Dua font terkunci:**
- **Poppins** — untuk judul/heading (geometris, tegas, mudah dikenali di ukuran besar). Lisensi SIL Open Font License.
- **Source Sans 3** — untuk body text/isi (netral dan mudah dibaca untuk teks panjang seperti linimasa dan materi). Lisensi SIL Open Font License. Dipilih 22 Oktober 2026 sebagai pengganti "Ahoka", yang tidak ditemukan sebagai font open-license. Font "Ahkio" sempat dipertimbangkan tetapi berbayar (lisensi web dan aplikasi belum dibeli). Keputusan ini diambil PM.

Kedua font dihosting sendiri di `landing/` dan `LANJUT_App/` (tidak memakai CDN, sesuai CSP `default-src 'self'`).

| Elemen | Font | Ukuran | Berat |
|---|---|---|---|
| Judul halaman (H1) | Poppins | 🔴 | 🔴 *(sarankan Bold/SemiBold)* |
| Subjudul (H2) | Poppins | 🔴 | 🔴 *(sarankan Medium)* |
| Body text | Source Sans 3 | 🔴 | 🔴 *(sarankan Regular)* |
| Caption / label kecil | Source Sans 3 | 🔴 | 🔴 |
| Tombol (button) | Poppins | 🔴 | 🔴 *(sarankan SemiBold)* |

🔴 Ukuran pasti (px/sp) belum ditentukan — baru bisa dikunci setelah dicoba di satu layar prototipe nyata, supaya proporsinya teruji, bukan ditebak di atas kertas.

**Font wordmark vs font UI:** tetap terpisah — huruf pada logo (melengkung, personal) tidak dipakai sebagai typeface UI aplikasi. Poppins & Source Sans 3 berlaku untuk UI aplikasi saja, bukan logo.

---

## 4. Tata Letak & Komponen

🔴 **Bagian ini juga kosong — perlu diisi sebelum mulai membangun UI.**

| Aturan | Nilai |
|---|---|
| Radius sudut standar (card, tombol) | 🔴 |
| Radius ikon aplikasi (squircle) | 🔴 |
| Padding standar antar elemen | 🔴 |
| Grid dasar / satuan spasi (contoh: kelipatan 8px) | 🔴 |
| Ukuran ikon inline (mis. ikon jam kecil) | 🔴 |

---

## 5. Konsep Maskot & Ikonografi

Maskot: **kelinci wisudawan** — kelinci berdiri memakai topi toga, dengan ikon jam kecil di dekat kaki.

**Makna simbolik:**
- **Kelinci** → gerak cepat, lincah, "melompat maju" — selaras dengan nama "LANJUT"
- **Topi toga** → tujuan akhir: lulus dan masuk perguruan tinggi
- **Ikon jam** → elemen waktu/tenggat — selaras dengan fitur inti Linimasa dan Penolong Pilih Mapel

Maskot ini elemen pembeda visual utama, karena kompetitor (bimbel, sumber SMA) tidak punya identitas yang secara spesifik bicara ke anak SMK.

**Aturan pemakaian maskot** *(supaya tidak dipakai sembarangan di semua tempat):*

| Konteks | Boleh pakai maskot penuh? | Bentuk yang dipakai |
|---|---|---|
| Onboarding & splash screen | Ya | Maskot penuh berwarna |
| App icon | Ya | Maskot dalam squircle (lihat Bagian 6) |
| Empty state (halaman kosong) | Ya | Line-art tanpa latar |
| Tombol / ikon kecil berulang | 🔴 *perlu diputuskan — disarankan tidak, agar maskot tetap terasa istimewa* | — |
| Notifikasi | 🔴 | — |

---

## 6. Wordmark / Logotype

**Tulisan:** "Lanjut" — huruf **L** kapital diperbesar dan diberi warna aksen, sisanya huruf kecil dengan warna kontras (putih di atas biru, atau gelap di atas terang).

**Detail khas:**
- Huruf **L** dibentuk melengkung menyerupai coretan/goresan pena — kesan personal, bukan huruf cetak kaku
- Titik di atas huruf **j** diganti ikon **topi toga kecil**
- Elemen kelinci kecil ditambahkan di ujung kanan sebagai penutup logo pada varian lengkap

**Dua varian layout:**
1. **Horizontal dengan badge** — teks "Lanjut" di dalam rounded rectangle biru — untuk header aplikasi/watermark
2. **Standalone** — teks putih tanpa latar — untuk ditumpuk di atas foto/warna gelap

---

## 7. Ikon Aplikasi (App Icon)

**Bentuk dasar:** rounded square (squircle), standar ikon iOS/Android modern.

**Isi ikon:** maskot kelinci bertopi toga + ikon jam kecil di sudut, tanpa teks.

**Varian yang dieksplorasi:**

| Varian | Latar | Garis maskot | Kegunaan |
|---|---|---|---|
| A — Gradasi biru penuh | Gradasi biru muda→sedang | Putih outline | **Ikon utama** |
| B — Gradasi biru (rounded lebih kecil) | Sama seperti A | Putih outline | Alternatif proporsi platform lain |
| C — Putih/terang | Putih–abu sangat muda | Biru muda outline | Favicon / ukuran sangat kecil |
| D — uji kontras garis | Biru muda flat | Putih/biru/hitam | Menentukan warna garis final |
| E — line-art lepas | Transparan | Biru/putih/hitam | Ilustrasi pendukung, bukan app icon |

**Rekomendasi final:** varian **A** untuk ikon utama (kontras stabil di homescreen), varian **C** untuk favicon (detail tetap terbaca di ukuran sangat kecil).

🔴 Ukuran minimum ikon yang masih terbaca belum diuji cetak (perlu dicek di 16px, 32px, 48px).

---

## 8. Anti-pattern (Yang Harus Dihindari)

*(Bagian paling sering dilewatkan tapi paling membantu AI memahami batas — tidak cukup tahu apa yang boleh, harus tahu apa yang dilarang.)*

- **Jangan** pakai warna merah/oranye terang untuk elemen tenggat — bertentangan dengan prinsip "tenggat ditampilkan, bukan ditekankan" (lihat `salinan-teks-lanjut.md` Bagian 0: nada menenangkan, isi serius).
- **Jangan** tampilkan hitungan mundur berdetak (detik berjalan real-time) — sesuai keputusan di `salinan-teks-lanjut.md` §4.1, tenggat ditampilkan sebagai angka biasa.
- **Jangan** pakai maskot kelinci di setiap tombol/notifikasi — akan mengikis kekuatannya sebagai penanda identitas.
- **Jangan** pakai font berlisensi berbayar tanpa bukti lisensi web dan aplikasi yang sudah dibeli.
- 🔴 *Tambahkan anti-pattern lain seiring desain berkembang.*

---

## 9. Rujukan Silang

- **Nada suara & teks UI** → lihat `salinan-teks-lanjut.md` (kaidah penulisan, kalimat masuk vs kalimat kembali, teks per halaman)
- **Struktur fitur & data** → lihat `rancangan-arsip-latihan-banksoal.md` untuk konteks kelas kepercayaan konten (resmi/pengguna/mitra) yang perlu tercermin di penanda visual

---

## 10. Status & Yang Belum Diputuskan

| # | Item | Prioritas |
|---|---|---|
| 1 | ~~Konfirmasi nama font "Ahoka"~~ — **diselesaikan 22 Oktober 2026:** diganti Source Sans 3 (open-license) | ✅ Selesai |
| 2 | Ukuran & berat font per elemen (px, Bold/Regular/dst) | 🔴 Tinggi — blocker untuk mulai desain layar |
| 3 | Aturan spasi/radius komponen | 🔴 Tinggi — blocker untuk konsistensi antar layar |
| 4 | Warna hitam/garis gelap presisi (masih dipakai `#1A1A1A` sementara) | 🔴 Sedang |
| 5 | Warna fungsional baru: sukses & error (di luar palet biru) | 🔴 Sedang |
| 6 | Arah gradasi presisi (diagonal/vertikal/radial) | 🔴 Rendah — sudah ada asumsi vertikal |
| 7 | Ukuran minimum ikon (uji cetak 16/32/48px) | 🔴 Rendah |
| 8 | Kesesuaian nada maskot (playful) vs positioning (serius) | 🔴 Sedang — perlu diskusi tim, bukan sekadar teknis |
| 9 | Aturan pemakaian maskot di tombol/notifikasi | 🔴 Sedang |

**Sudah terkunci:** palet warna inti (4 dari 5 warna), font heading (Poppins), dan font body (Source Sans 3).

**Versi berikutnya (v4) sebaiknya ditulis setelah:** ukuran/berat font sudah diuji coba di minimal satu layar prototipe nyata.