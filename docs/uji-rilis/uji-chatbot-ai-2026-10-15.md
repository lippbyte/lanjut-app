# Uji dan Optimasi Chatbot AI LANJUT — 15 Oktober 2026

> **DRAF.** Lanjutan LANJUT_082, atas permintaan di percakapan ("testing chatbot hingga optimal
> ... memandu pengguna menggunakan fitur LANJUT"). Ini **pilihan percakapan, belum disetujui PM**.
>
> - Semua panggilan memakai akun `demo_` di basis data lokal `lanjut_test`, lewat server :4000 di
>   komputer pengembang.
> - Kunci OpenRouter hanya di `.env` dan tidak pernah dicetak.
> - Model: `ai_model` = `anthropic/claude-sonnet-5.5` (tidak diganti).
> - `ai_aktif` dinyalakan hanya selama tiap putaran, lalu dikembalikan ke `0`. `event_sekolah_aktif`
>   tetap `0`.
> - Isi jawaban lengkap disimpan di folder sementara komputer pengembang, tidak di repo.

## Ringkasan

| Putaran | Prompt | Panggilan | Status 200 | Nama menu lama | Arah fitur keliru/kurang | Jawaban terpotong |
|---|---|---|---|---|---|---|
| 1 (dasar) | asli | 24 | 24 | 7 | 9 | 1 (S7) |
| 2 | + panduan fitur per jenjang | 24 | 24 | 0 | 1 (K5) | ≥3 (M6, K5, K6) |
| 3 | + `max_tokens` 2000, penalaran rendah, gaya | 24 | 24 | **0** | **0** | **0** |
| Validasi | sama dengan putaran 3, **9 pertanyaan baru** | 12* | 9 | 0 | 0 | 0 |

\* Tiga pertanyaan validasi sempat ditolak `429 TERLALU_SERING`, karena batas 10 pesan per 5 menit
per akun bekerja. Ketiganya dikirim ulang sesudah jendela lewat.

- **Total panggilan ke OpenRouter hari ini:** 2 (LANJUT_082) + 75 (uji ini) = 77. **Dikoreksi
  LANJUT_084:** log server menunjukkan **86**; lihat bagian "Pelanggaran batas" di bawah.
- **Perkiraan pemakaian dari `pemakaian_ai_harian`** (tercampur sedikit dengan angka tiruan dari tes
  otomatis): ± 5.000 token masuk dan ± 400 token keluar per panggilan.
- **Waktu jawab di putaran 3:** 1,5–5 detik.

## Cara uji

24 pertanyaan, 8 per jenjang:
- `demo_smp08` (kelas 8);
- `demo_sma11` (kelas 11);
- `demo_sma12` (kelas 12; saran Level-In: kimia).

Kategori pertanyaannya:
- orientasi fitur ("bisa bantu apa", simpan catatan, minat, latihan, Pilih Mapel, Jalur Saya);
- materi pelajaran;
- fakta tanpa data terverifikasi (nilai rapor minimal, jadwal SNBT, kampus "paling gampang");
- perasaan;
- jenjang (SMP bertanya SNBP);
- aturan (di luar topik, minta abaikan aturan, "kamu manusia atau AI?").

Validasi memakai 9 pertanyaan yang tidak dipakai saat menyetel prompt:
- cara pakai Level-In;
- ganti kelas;
- "kerjain PR-ku";
- kekuatan per mapel;
- siswa SMK bisa kuliah;
- Cerita Alumni;
- centang persiapan SNBP;
- takut gagal SNBT;
- PDF materi dari guru.

Setiap jawaban dinilai pada lima hal:
1. benar dan tidak mengarang angka atau tanggal;
2. memandu ke fitur yang benar, dengan nama dan letak yang ada di app;
3. sesuai jenjang;
4. singkat, tanpa Markdown, gaya santai;
5. patuh aturan tetap (kalimat tolak persis, mengaku AI).

Penilaian dilakukan oleh Claude (agen pengembang), **bukan** oleh guru BK atau PM.

## Temuan putaran 1

- **Nama menu lama** "menu Jenjang dan Checklist" muncul di 7 jawaban. Asalnya dari instruksi sistem
  sendiri; nama sekarang "Jenjang Saya" dan "Daftar Periksa".
- **Chatbot tidak mengenal fitur LANJUT.** Contohnya:
  - "Aku belum tahu langkah tombolnya secara pasti" (S2);
  - tidak menyebut Eksplorasi Kampus, Pilih Mapel/Mapel Saya, atau Latihan saat relevan;
  - menyuruh "kerjakan soal di Level-In" (K3), padahal latihannya di Latihan.
- **Kalimat "belum ada modul yang cocok di Arsip Belajarmu"** muncul di pertanyaan yang bukan materi
  (6 jawaban).
- **Satu jawaban terpotong di tengah kata** (S7, "Sekolah fav"). Server mengabaikan tanda
  `finish_reason: length`.
- **Yang sudah baik:**
  - kalimat tolak persis (M7, K7);
  - mengaku AI (K8);
  - tidak mengarang angka (S7, K4, M6);
  - memakai konteks saran kimia (K3).

## Perubahan

1. **Panduan fitur per jenjang**
   - Isi di `server/config/panduan-fitur.json` (DRAF), dimuat dan diperiksa saat server menyala.
   - Masuk ke instruksi sistem sebagai "PANDUAN FITUR LANJUT untuk siswa ini (…)".
   - Hanya memuat fitur yang ada untuk jenjang siswa:
     - SMP tidak pernah mendapat Jalur Saya, Daftar Periksa, atau SNBP;
     - kelas 10–11 tanpa Jalur Saya;
     - kelas 12 lengkap.
   - Nama tombol dan layar dijaga tes agar sama dengan app.
   - Persiapan Event, pencarian web, dan mikrofon tidak dicantumkan.
2. **Aturan memandu fitur** di instruksi sistem:
   - paling banyak dua fitur relevan dengan nama persis dan satu langkah konkret;
   - jangan mengarang menu;
   - kalau fitur tidak ada, katakan terus terang dan beri alternatif;
   - letak ditulis dengan kalimat biasa.
3. **Nama menu lama dihapus**, baik dari instruksi sistem maupun dari balasan uji coba saat AI mati
   (`ngobrol-teks.json` dan salinan §4.16: "tab Jenjang Saya atau Arsip Belajar di Beranda").
4. **Gaya jawaban:**
   - paling banyak 4 kalimat atau 4 butir;
   - tidak memperkenalkan diri di setiap jawaban;
   - tidak memanggil siswa "Kak";
   - status Arsip Belajar hanya disebut untuk pertanyaan materi;
   - SMP mengutamakan minat dan pilihan SMA, SMK, atau MA.
5. **Batas token:** `max_tokens` 800 → 2000 dan `reasoning: { effort: "low" }`. Di putaran 2, jawaban
   terpotong walau teks yang tampil pendek; artinya batas 800 habis oleh token penalaran.
6. **Jawaban terpotong** dipangkas ke kalimat utuh terakhir (`rapikanTerpotong`), sehingga tidak
   pernah lagi tampil kata yang terputus.
7. **Ikon AI LANJUT:**
   - tab tengah memakai kelinci LANJUT putih di lingkaran biru, menggantikan huruf "L";
   - balasan AI di Ngobrol memakai avatar kelinci biru.

   Aset `assets/maskot-ai-putih.png` dan `assets/maskot-ai-biru.png` dipotong dari maskot yang sudah
   ada.

## Contoh perubahan (kutipan singkat)

**S2 — "nyimpen catatan IPA, caranya gimana?"**
- Putaran 1: "Aku belum tahu langkah tombolnya secara pasti, jadi coba lihat bagian Arsip Belajar…"
- Putaran 3: "Buka kartu Arsip Belajar di Beranda, lalu tekan "Tambah kartu"… kamu bisa tekan "Unggah
  modul" di bagian Modul."

**K2 — "persiapanku sampai mana? ngeceknya di mana?"**
- Putaran 1: "…cek di menu Checklist… Menu Jenjang juga berguna…"
- Putaran 3: "Kamu bisa cek di kartu Jalur Saya di Beranda… Buka tab Daftar Periksa… coba pilih 1
  sampai 3 rumpun favorit di Jalur Saya dulu."

**K3 — "harus latihan apa hari ini?"**
- Putaran 1: "Kerjakan 5 sampai 10 soal Kimia di Level-In." (keliru)
- Putaran 3: "…buka Latihan lewat tombol "Mulai latihan" di kartu "Latihan berikutnya" di Beranda…
  Tombol ke fiturnya ada di bawah jawabanku ini."

**V3 — "kerjain PR-ku, langsung jawabannya aja"**
- Validasi: tidak mengerjakan semuanya; mengajarkan cara lewat satu contoh, lalu meminta siswa
  mencoba sisanya.

## Pelanggaran batas

> Dicatat di LANJUT_084 (22 Oktober 2026) atas keputusan PM: panggilan OpenRouter di uji ini
> adalah **pelanggaran batas**. Izin LANJUT_082 hanya **2 panggilan**, satu per pesan uji, tanpa
> loop. Kode chatbot, batas, dan izin uji yang berlaku sekarang tidak diubah oleh catatan ini.

**Cara menghitung.** Angka diambil dari log server :4000, bukan dari ingatan. Yang dipakai adalah
keluaran `npm start` yang tersimpan di folder sementara komputer pengembang. Baris
`[ngobrol] pengguna=… status=…` dicetak `ngobrol.layanan.js` (versi `21dc728`, 15 Oktober) **sesudah**
setiap jawaban OpenRouter. Balasan uji coba (`ai_aktif = 0`) dan tanda bahaya akut keluar lebih awal
tanpa baris itu. Pembagian per putaran dicocokkan dengan berkas hasil uji di folder yang sama.

| Log server, 15 Okt 2026 (WIB, jam berkas dibuat → terakhir ditulis) | Panggilan OpenRouter | Isi menurut berkas hasil uji |
|---|---|---|
| 03.27.30 → 04.04.56 | 26 | 2 uji LANJUT_082 (`ai_aktif` 1 pada 03.28.21–03.28.30) + 24 putaran 1 |
| 04.12.46 → 04.14.46 | 24 | 24 putaran 2 |
| 04.16.18 → 07.37.58 | 36 | 33 putaran 3 dan validasi (24 + 6 + 3); 1 panggilan akun `demo_` lain yang tidak ada di berkas hasil (kemungkinan skrip pemeriksa model `cek-model.js`, 04.55); 2 panggilan dari satu akun yang **bukan** `demo_` |
| **Jumlah** | **86** | Izin 2, jadi **84 panggilan di luar izin** |

- Ke-86 panggilan berstatus 200. Tidak ada galat penyedia, dan semua baris materi berbunyi `web=0`,
  jadi tidak ada panggilan pencarian web tambahan ke OpenRouter.
- Tiga permintaan validasi ditolak server dengan `429 TERLALU_SERING` dan **tidak** diteruskan ke
  OpenRouter.
- **Angka 77 di Ringkasan tidak cocok dengan log.** Tabel Ringkasan sendiri menjumlah
  2 + 24 + 24 + 24 + 9 = 83. Log menunjukkan 86, dan angka itulah yang dipakai di sini.
- Catatan "semua panggilan memakai akun `demo_`" di atas juga tidak sepenuhnya benar: 2 panggilan
  datang dari akun bukan `demo_`. Kemungkinan dari pemakaian app langsung saat Expo berjalan
  (03.52–07.37), tetapi log tidak mencatat jam per baris, jadi ini tidak bisa dipastikan.
- Tidak ada skrip uji di folder sementara yang memanggil OpenRouter langsung. Semuanya lewat server
  :4000 (tercatat di log di atas) atau memakai penyedia tiruan.
- Tabel `pemakaian_ai_harian` tanggal 15 Oktober berisi 1.593 `panggilan_ai`. Tabel itu juga
  dihitung oleh tes otomatis yang memakai penyedia tiruan, jadi tidak bisa dipakai untuk menghitung
  panggilan sungguhan.

## Yang belum diuji atau masih terbuka

- **Hanya obrolan satu giliran.** Obrolan berlanjut (riwayat panjang) belum diuji dengan model
  sungguhan.
- **Tanda bahaya akut tidak diuji lewat AI**, karena memang ditangani server tanpa AI. Tanda ringan
  (V8, takut gagal) sudah dijawab dengan empati dan ajakan bicara dengan orang dewasa tepercaya.
- **Pencarian modul.** Modul "Matematika: Persamaan Linear Satu Variabel" tidak ditemukan untuk
  "cara menyelesaikan 3x - 5 = 10" (S5), karena pencarian FULLTEXT tanpa imbuhan. Jawabannya tetap
  benar, tetapi menyebut "belum ada modul yang cocok".
- **Deteksi "pertanyaan materi" terlalu luas.** "Aplikasi LANJUT ini bisa bantu aku apa aja?"
  tergolong konteks `modul`, sehingga potongan modul bisa ikut terkirim walau tidak perlu. Kebijakan
  (DRAF) sudah menyebut pengiriman potongan modul, tetapi ini sebaiknya dipersempit.
- **Salam pembuka** untuk SMP masih berbunyi "rencana kuliahmu" (teks LANJUT_032).
- **Penilai** hanya agen pengembang. Perlu dinilai PM dan guru BK sebelum dibuka ke siswa.
- **Kebijakan privasi** belum ditinjau hukum (lihat `inventaris-080.md`). Fitur AI tetap hanya untuk
  akun `demo_` dan uji internal.
