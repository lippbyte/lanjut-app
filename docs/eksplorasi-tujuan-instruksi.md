# F10 — Eksplorasi Tujuan (lanjutan dari Penolong Pilih Mapel)

**Status:** v1.1 — bukan blocker rilis 3 September. Dirancang sekarang supaya siap dibangun begitu 13 layar v1 (F1–F9) sudah jalan dan diaudit (lihat `todo-verifikasi-v1.md`).
**Dasar:** hasil riset "Top Prodi Paling Diminati" (18 prodi, data SNBP/SNBT 2025–2026) + rekomendasi Tahap 1 dari riset itu.
**Kode fitur:** F10 (F1–F9 sudah dipakai di `prd-sdd-lanjut.md`). Kalau disetujui, tambahkan baris F10 ke Bagian 6 PRD dan satu baris di Bagian 16 Catatan Perubahan.

---

## 1. Job-to-be-Done

> "Setelah tahu mapel pendukung yang perlu kukuasai, saya ingin membayangkan **jadinya kuliah di mana dan ngapain** — supaya prodi yang kupilih bukan cuma nama di kertas, tapi sesuatu yang bisa kubayangkan hidupnya."

Ini beda dari F3. F3 menjawab **"apa yang harus kupelajari sekarang."** F10 menjawab **"kalau aku ambil ini, hidupnya kayak apa, dan aku bisa kuliah di mana."**

## 2. Keputusan Struktur — Kenapa TIDAK Mengulang Pertanyaan F3

Deskripsi awal fitur ini menyebut "2 opsi: sudah punya cita-cita atau belum" — pertanyaan ini **persis sama** dengan cabang di F3 ("Sudah tahu prodi tujuan?"). Supaya siswa tidak ditanya hal yang sama dua kali dengan kata-kata berbeda, F10 **tidak punya pertanyaan cabang sendiri**. Sebagai gantinya:

- **F10 selalu dimulai dari prodi yang sudah ada** — baik dari hasil F3 (siswa sudah pilih/dapat prodi), maupun dari profil pengguna yang sudah tersimpan.
- **Kalau siswa belum pernah ke F3 sama sekali:** F10 diakses lewat F3 dulu (CTA di F3 mengarahkan ke F10), bukan berdiri sendiri dengan alur terpisah. Ini menjaga satu jalur cerita, bukan dua pintu masuk yang membingungkan.
- **Bakat-minat "penelitian lebih lanjut"** yang disebut di deskripsi awal **memakai mekanisme yang sudah ada di F3 cabang (b)** — pemilihan rumpun minat — bukan dibangun ulang sebagai tes baru. Riset sebelumnya sudah memperingatkan: tes bakat-minat yang tervalidasi adalah proyek riset sendiri, bukan sesuatu yang bisa diselesaikan sebagai bagian dari fitur ini. Yang berubah bukan cara bertanya, tapi **kedalaman jawaban di ujungnya** — dari sekadar nama prodi (F3) menjadi profil lengkap (F10).

**Alurnya jadi begini:**

```
F3 Pilih Mapel
  └─ hasil: prodi X + mapel pendukung + saran 2 mapel TKA + disclaimer
       └─ CTA baru: "Lihat prospek & kampus untuk [prodi X]" ──→ F10
                                                                    │
                                                          Layar Profil Prodi
                                                     (jenjang, peminat, mata kuliah,
                                                      prospek kerja, kampus rekomendasi)
```

## 3. Kebutuhan Fungsional

- [ ] F10 dibuka lewat CTA di layar hasil F3 — **tidak ada pertanyaan baru**, prodi terbawa otomatis dari F3.
- [ ] Menampilkan jenjang prodi (S1/D3/D4) sebagai badge yang jelas.
- [ ] Prodi vokasi yang relevan untuk lulusan RPL/TKJ/Teknik mendapat badge terpisah **"Relevan untuk RPL/TKJ/Teknik"** — ini nilai jual utama fitur untuk pengguna SMK, jangan sampai tenggelam di tampilan.
- [ ] Menampilkan dua metrik bersama, tidak boleh salah satu saja: **jumlah peminat** dan **rasio keketatan** (diterima ÷ pendaftar), plus tahun & sumber data datanya diambil dari mana.
- [ ] Menampilkan 4–6 mata kuliah inti yang representatif (bukan daftar lengkap semua semester).
- [ ] Menampilkan 3–4 peran/profesi kerja yang umum disebut sumber tepercaya untuk lulusan prodi ini.
- [ ] **Tidak menampilkan angka gaji** kecuali ada sumber resmi yang jelas — untuk 18 prodi hasil riset, hampir semua angka gaji berstatus TIDAK DITEMUKAN, jadi defaultnya adalah tidak menampilkan angka sama sekali, bukan mengarang kisaran.
- [ ] Menampilkan 3–5 kampus rekomendasi, **didiversifikasi**: minimal ada satu PTN akademik, satu PTN vokasi/politeknik negeri, dan boleh tambah PTS/kedinasan bila relevan. Tiap kampus menyebutkan jalur masuknya (SNBP/SNBT/Mandiri/RPL).
- [ ] Setiap kelompok data (peminat, mata kuliah, prospek kerja, kampus) diberi penanda status sumber: **Terverifikasi** atau **Perkiraan** — sama seperti kaidah `sumber` + `diperiksa_pada` yang sudah berlaku di seluruh konten resmi LANJUT (PRD §12).
- [ ] Disclaimer tetap tampil, sama semangatnya dengan disclaimer F3: "Data ini rangkuman dari SNPMB/BAN-PT per [tanggal], bisa berubah. Cek laman resmi untuk info terkini."
- [ ] Tombol "Simpan ke Daftar Periksa" — menambahkan langkah "Cari tahu lebih lanjut soal [prodi]" ke F5, konsisten dengan pola F3.
- [ ] **Kondisi prodi belum ada di data (fallback wajib):** kalau prodi hasil F3 tidak termasuk 18 prodi yang sudah diriset, F10 TIDAK boleh menampilkan halaman kosong/rusak. Tampilkan: "Profil lengkap untuk [prodi] belum kami siapkan. Yang sudah tersedia: [daftar 18 prodi, bisa difilter per rumpun]." — lihat Bagian 4 soal keputusan cakupan data.

## 4. Keputusan Cakupan Data — Selaraskan dengan Data F3

Data prodi yang dipakai F3 (`data/prodi.json`, dari Sesi 1 Prompt B) kemungkinan lebih luas daripada 18 prodi yang sudah diriset mendalam untuk F10. Ada dua opsi:

- **Opsi A (disarankan untuk v1.1):** batasi `data/prodi.json` yang dipakai F3 supaya isinya persis 18 prodi (atau subset yang relevan untuk siswa SMK) yang sudah punya profil F10 lengkap. Konsekuensinya: F3 jadi sedikit kurang luas, tapi setiap hasil F3 dijamin bisa lanjut ke F10 tanpa fallback kosong.
- **Opsi B:** biarkan `data/prodi.json` F3 tetap luas, dan andalkan fallback di atas untuk prodi yang belum ada profilnya.

**Rekomendasi: Opsi A.** Lebih baik F3 menjanjikan lebih sedikit prodi tapi semuanya bisa ditindaklanjuti dengan detail di F10, daripada F3 terasa lengkap tapi separuh hasilnya berujung fallback "belum tersedia" — itu pengalaman yang mengecewakan persis di titik paling penting (hasil akhir fitur pembeda utama produk).

## 5. Data Seed — 18 Prodi (dari riset)

Tabel ini ringkasan siap-konversi ke JSON. Detail lengkap (mata kuliah, deskripsi prospek, semua kampus) ada di laporan riset "Top Prodi Paling Diminati" — **lampirkan laporan riset itu** saat menjalankan Sesi 7 di Bagian 7, supaya Claude Code punya sumber lengkap, bukan cuma ringkasan tabel ini.

| # | Prodi | Jenjang | Badge RPL/TKJ | Peminat (kampus, tahun) | Rasio keketatan | 3 Kampus rekomendasi |
|---|---|---|---|---|---|---|
| 1 | K3 | D4 | — | 5.582 (UNS, SNBT'26) | ~0,8% | UNS, UNAIR, PPNS |
| 2 | Administrasi Bisnis | D3 | — | 5.059 (UB, SNBT'26) | ~2,3% | UB, Polban, PNJ |
| 3 | Teknik Informatika | D3/D4 | ✔ | 2.796 (PNJ, SNBT'26) | ~1,6% | Polban, PNJ |
| 4 | Teknik Mesin | D3 | ✔ | 2.383 (Polban, SNBT'26) | ~2,0% | Polban, Polibatam |
| 5 | Keperawatan | D3 | — | 5.216 (UNAIR, SNBT'26) | ~1,2% | UNAIR, Poltekkes |
| 6 | Perpajakan | D3 | — | 4.570 (UNAIR, SNBT'26) | ~1,3% | UNAIR, ULM |
| 7 | Keperawatan Anestesiologi | D4 | — | 4.766 (UNS, SNBT'26) | ~0,5% | UNS |
| 8 | Humas & Komunikasi Digital | D4 | — | 4.346 (UNJ, SNBT'26) | ~1,0% | UNJ |
| 9 | Manajemen Bisnis | D4 | — | 2.521 (Polmed, SNBT'26) | ~2,7% | Polmed |
| 10 | Informatika | S1 | ✔ | 1.157 (UNS, SNBP'25) | — | ITB, Telkom U |
| 11 | Manajemen | S1 | — | 1.590 (UNS, SNBP'25) | — | UNPAD, UI |
| 12 | Ilmu Hukum | S1 | — | 4.685 (UNDIP, SNBT'26) | ~6,1% | UNPAD, UI |
| 13 | Teknik Pertambangan | S1 | — | 4.789 (ITB, SNBT'26) | ~2,4% | ITB, UPN Yogya |
| 14 | Kedokteran | S1+profesi | — | 1.943 (UI, SNBP'26) | ~3,1% | UNPAD, UI |
| 15 | Farmasi | S1+profesi | — | 1.621 (UNPAD, SNBP'26) | ~3,1% | UNPAD, UNSOED |
| 16 | Ilmu Keperawatan | S1+Ners | — | 1.603 (UNPAD, SNBP'26) | ~3,6% | UNPAD, UI |
| 17 | Ilmu Komunikasi | S1 | — | 1.465 (UPI, SNBP'25) | ~1,4% | UNPAD, UPI |
| 18 | Akuntansi | S1 | — | 1.206 (UNS, SNBP'25) | — | UNPAD, UGM |

*Badge "✔" = paling relevan untuk lulusan SMK RPL/TKJ/Teknik, sesuai highlight riset. Kalau Opsi A dari Bagian 4 dipakai, prodi yang F3 tawarkan ke siswa RPL/TKJ sebaiknya diprioritaskan dari baris bertanda ✔ ini dulu.*

## 6. Tambahan untuk Prompt A (Claude Design)

Tempel blok ini **setelah** layar 13 (Bank Soal Mitra) di `lanjut-prototype-prompts.md`, sebagai satu sesi terpisah untuk v1.1 — bukan digabung ke sesi 13 layar v1.

```
Tambahkan satu layar baru ke proyek "LANJUT App Mockup": EKSPLORASI TUJUAN
(F10), lanjutan dari Penolong Pilih Mapel. Pakai sistem desain yang sama
persis (token, komponen, aset) seperti 13 layar sebelumnya di proyek ini.

Layar ini TIDAK punya pertanyaan cabang sendiri — selalu masuk membawa
satu prodi dari hasil Pilih Mapel, lewat CTA baru di layar hasil Pilih
Mapel bertuliskan "Lihat prospek & kampus untuk [nama prodi]".

Rancang layar "Profil Prodi" dengan urutan dari atas:
1. Nama prodi + badge jenjang (S1/D3/D4) + badge "Relevan untuk
   RPL/TKJ/Teknik" (tampil hanya untuk prodi yang relevan, jangan
   dipaksakan di semua prodi)
2. Dua angka berdampingan: jumlah peminat dan rasio keketatan, dengan
   baris kecil "Sumber: SNPMB [tahun] · diperiksa [tanggal]" — pola
   penanda sumber yang sama seperti di Beranda dan Khusus SMK
3. Bagian "Yang akan kamu pelajari" — 4-6 mata kuliah inti sebagai
   daftar ringkas, bukan tabel kurikulum penuh
4. Bagian "Ke mana lulusannya" — 3-4 kartu peran kerja kecil. TIDAK
   ADA angka gaji di mana pun pada layar ini.
5. Bagian "Kampus yang cocok" — 3-5 kartu kampus, tiap kartu
   menampilkan jenis (PTN/PTN Vokasi/PTS/Kedinasan) dan jalur masuk
   (SNBP/SNBT/Mandiri/RPL) sebagai badge kecil. Susun urutan kartu
   dengan kampus vokasi tidak diletakkan paling bawah/tersembunyi —
   ini pembeda utama produk, harus terlihat setara dengan PTN akademik.
6. Disclaimer sekunder di bawah: "Data ini rangkuman dari SNPMB/BAN-PT,
   bisa berubah. Cek laman resmi untuk info terkini."
7. Tombol "Simpan ke Daftar Periksa"

Rancang juga KONDISI FALLBACK untuk layar yang sama: kalau prodi belum
punya profil lengkap, tampilkan pesan "Profil lengkap untuk [prodi]
belum kami siapkan" beserta daftar prodi lain yang sudah tersedia,
dikelompokkan per rumpun — desain ini sebagai kondisi yang tetap
berguna, bukan jalan buntu, konsisten dengan prinsip yang sama dipakai
di kondisi kosong Cerita Alumni.
```

## 7. Tambahan untuk Prompt B (Claude Code) — Sesi 7

Jalankan **setelah** Sesi 6 (audit v1) selesai dan sudah dinyatakan lolos lewat `todo-verifikasi-v1.md`. Lampirkan `prd-sdd-lanjut.md`, `salinan-teks-lanjut.md`, bundle Claude Design terbaru, **dan laporan riset "Top Prodi Paling Diminati."**

```
Lampiran: prd-sdd-lanjut.md, salinan-teks-lanjut.md, bundle Claude
Design (termasuk layar Eksplorasi Tujuan yang baru), dan laporan riset
Top Prodi Paling Diminati (18 prodi, data SNBP/SNBT 2025-2026).

Ini fitur v1.1 (F10), dibangun setelah v1 (F1-F9) lolos audit. Baca
dulu keputusan struktur: F10 TIDAK punya pertanyaan cabang sendiri,
selalu masuk membawa prodi dari hasil pilih-mapel.html.

1. Buat data/profil-prodi.json berisi 18 entri prodi dari laporan
   riset terlampir. Tiap entri: nama, jenjang, badge_relevan_smk
   (boolean), peminat {jumlah, tahun, sumber}, diterima, mata_kuliah
   (array 4-6 string), profesi (array 3-4 string), kampus (array of
   {nama, jenis: PTN/PTN Vokasi/PTS/Kedinasan, jalur_masuk}),
   status_sumber (Terverifikasi/Perkiraan per data yang ditandai
   di laporan riset — JANGAN samakan semua jadi Terverifikasi).
   JANGAN isi field gaji sama sekali — field itu sengaja tidak ada
   di skema karena datanya tidak tersedia untuk hampir semua prodi.

2. Selaraskan data/prodi.json yang sudah dipakai pilih-mapel.html:
   pastikan daftar prodi di sana adalah subset dari 18 prodi ini
   (Opsi A di instruksi F10), supaya setiap hasil Pilih Mapel punya
   profil lengkap untuk dilanjutkan ke Eksplorasi Tujuan. Kalau
   prodi.json saat ini punya entri di luar 18 ini, laporkan mana saja
   sebelum menghapus — jangan menghapus data tanpa dicatat.

3. Bangun eksplorasi-tujuan.html: baca prodi terpilih dari localStorage
   (hasil pilih-mapel.html), tampilkan profil sesuai struktur yang
   sudah dirancang di bundle Claude Design. Tambahkan CTA baru di
   pilih-mapel.html yang mengarah ke halaman ini.

4. Bangun kondisi fallback untuk prodi yang tidak ada di
   profil-prodi.json (seharusnya jarang terjadi kalau langkah 2 benar,
   tapi tetap wajib ada sebagai jaring pengaman).

5. Tombol "Simpan ke Daftar Periksa" menambahkan item baru ke
   localStorage yang dibaca checklist.html, dengan kategori "Riset
   Kampus" (kategori baru, di samping "Berkas", "Pendaftaran", dan
   "Jalur Pembiayaan" yang sudah ada).

Setelah selesai, jalankan ulang audit ringkas: apakah layar ini
mengikuti Definisi Selesai §15 (360px, layar kosong tertulis, teks
dari salinan-teks, sumber+tanggal tercantum)?
```

## 8. Non-Goals untuk v1.1 Ini

Supaya lingkupnya tidak melebar lagi (ini persis risiko yang diperingatkan riset sebelumnya):

- **Bukan** tes bakat-minat psikometrik tervalidasi — tetap pakai mekanisme rumpun minat yang sudah ada di F3.
- **Bukan** integrasi PDDikti real-time — data tetap dari seed JSON statis, diperbarui manual per siklus penerimaan.
- **Bukan** menampilkan angka gaji — sampai ada sumber resmi yang kredibel.
- **Bukan** mencakup semua prodi di Indonesia — sengaja dibatasi 18 prodi dulu (Bagian 4, Opsi A), diperluas bertahap.
