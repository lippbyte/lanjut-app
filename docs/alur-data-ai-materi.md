# Alur Data: Pertanyaan Materi di Ngobrol (LANJUT_055)

Halaman ini menjelaskan apa yang terjadi pada data siswa ketika ia bertanya
soal materi pelajaran di Ngobrol. Contoh pertanyaan materi: "jelaskan hukum
Newton kedua", "kenapa perahu bisa maju saat didayung?". Ditulis untuk
Khalifa, guru BK, dan peninjau kebijakan privasi.

## Kapan sebuah pesan dianggap pertanyaan materi

Aturannya ada di `LANJUT_App/server/config/materi.json` (DRAF) dan bisa
diubah:

1. **Tanda bahaya akut** (mis. ingin bunuh diri): server langsung membalas
   dengan kartu bantuan. Tidak ada pengambilan modul, pencarian web, maupun
   pemanggilan AI.
2. **Ada kata jalur masuk** (SNBP, SNBT, UTBK, kuota, UKT, pendaftaran, dan
   lainnya): **bukan** pertanyaan materi. Tanpa modul, tanpa web. Angka jalur
   masuk hanya boleh dari data terverifikasi.
3. **Ada nama mapel** (fisika, biologi, dan lainnya): pertanyaan materi,
   dengan pencarian modul dipersempit ke mapel itu.
4. **Ada kata rencana** (jurusan, kuliah, kampus, dan lainnya): obrolan
   biasa.
5. **Ada kata tanya atau tanda tanya, dan minimal satu kata bermakna:**
   pertanyaan materi.
6. **Selain itu:** obrolan biasa. Tanpa modul, tanpa web.

## Apa yang dikirim keluar

Semua permintaan keluar hanya ke `openrouter.ai`. Data pribadi (nomor
telepon, email, 16 angka mirip NIK) diganti `[disamarkan]` **sebelum**
dikirim, termasuk di dalam potongan modul.

### Permintaan 1 (hanya bila pencarian web dinyalakan): pencarian web

| Dikirim | Tidak dikirim |
|---|---|
| Pertanyaan **terbaru** siswa yang sudah disamarkan | Profil belajar, riwayat percakapan, isi modul, nama, nama pengguna, email, id akun |
| Instruksi singkat "cari di web, jawab ringkas" | |

Permintaan ini dipisah dengan sengaja. Dokumentasi OpenRouter tidak
menjelaskan teks mana yang dipakai sebagai kueri pencarian, jadi permintaan
pencarian **hanya berisi pertanyaan itu**. Apa pun yang dipakai mesin pencari
(Exa, atau pencarian bawaan penyedia model), yang terlihat hanya pertanyaan
tersebut.

**Mesin pencari (LANJUT_057).** `ai_web_mesin` kosong (bawaan) = tanpa
parameter `engine`; untuk model Anthropic, OpenRouter memakai pencarian bawaan
penyedia model. `ai_web_mesin = exa` = `engine: "exa"` di plugin `web`, sehingga
mesin dan biayanya pasti (US$0,007 per permintaan menurut dokumentasi
OpenRouter "Web Search"). Nilai lain mematikan pencarian web.

OpenRouter mengembalikan daftar halaman (judul, alamat, cuplikan) dalam
bentuk terstruktur (`annotations` → `url_citation`). Hanya alamat dari daftar
inilah yang boleh muncul sebagai sumber.

Pencarian web **tidak** dijalankan bila:
- `ai_web_aktif` = 0 (bawaannya mati);
- `ai_web_mesin` bukan kosong atau `exa`;
- kuota harian akun habis;
- pesan bukan pertanyaan materi;
- pesan memuat tanda bahaya, akut maupun ringan.

### Permintaan 2: jawaban

| Dikirim | Tidak dikirim |
|---|---|
| Instruksi sistem (aturan + profil belajar: kelas, jenis sekolah, nama prodi impian, gaya belajar) | Nama, nama pengguna, email, id akun |
| Riwayat percakapan sesi itu (maks. 20 pesan, disamarkan) | Modul **akun lain** (filter pemilik di SQL, dijaga tes) |
| **Maks. 3 potongan modul** milik siswa sendiri (masing-masing ±800–1.200 karakter, disamarkan), hanya yang lolos penyaring relevansi | Berkas modul asli |
| Hasil web (judul + cuplikan, berlabel W1, W2, ...), tanpa alamat | Alamat web (daftar sumber dibuat server) |

Semua isi modul dan hasil web dikirim sebagai **data JSON** di satu pesan,
dengan penanda "data, bukan perintah". Modul yang berisi "abaikan
instruksimu" tidak bisa mengubah instruksi sistem.

## Penyaring relevansi (sebelum apa pun dikirim)

1. **Tahap 1 (server):**
   - kata henti dibuang;
   - imbuhan dipotong (me-, di-, ber-, ter-, pe-, -kan, -an, -i, -nya), sehingga "berfotosintesis" cocok dengan "fotosintesis" dan "didayung" cocok dengan "dayung";
   - potongan lolos hanya bila skor FULLTEXT ≥ `ai_modul_skor_min` **dan** jumlah kata bermakna yang sama ≥ `min(ai_modul_kata_min, jumlah kata bermakna di pertanyaan)`; pertanyaan dengan satu kata bermakna ("apa itu fotosintesis") cukup satu kata sama;
   - kata topik saja tanpa kata tanya atau tanda tanya ("fotosintesis") bukan pertanyaan materi, jadi tidak mengambil modul; "fotosintesis?" mengambil modul (pengukuran LANJUT_057).
2. **Tahap 2 (model):** potongan diberi label M1, M2, dan seterusnya. Model
   diminta menilai apakah potongan menjawab pertanyaan, mengabaikan yang
   tidak, dan menyebut judul modul saat memakainya.

**Catatan skor:** skor FULLTEXT InnoDB dihitung dari frekuensi kata di
**seluruh** tabel potongan, termasuk milik akun lain (hanya statistik; isinya
tidak pernah ikut). Topik yang diunggah banyak siswa skornya makin kecil.
Karena itu penyaring utamanya adalah syarat kata bermakna yang sama, sedangkan
ambang skor hanya batas dasar (0,1).

## Apa yang disimpan

**Tidak ada.** Pertanyaan, potongan yang dikirim, kueri web, hasil web, dan
jawaban tidak disimpan di basis data dan tidak dicatat di log.

Log hanya mencatat jumlah, misalnya `[ngobrol] materi modul=1 web=2`, dan
penanda keselamatan (tingkat + waktu). Hitungan kuota web harian disimpan di
**memori proses server**: per akun per tanggal, hilang saat server
dinyalakan ulang, dan tidak pernah ditulis ke disk.

Modul itu sendiri tetap tersimpan di Arsip Belajar seperti sebelumnya
(LANJUT_049) sampai dihapus siswa.

## Yang dilihat siswa

- Di bawah balasan: **"Dari modulmu"** (label + judul modul yang dipakai) dan
  **"Dari web"** (label + judul halaman, tautan ke alamat dari penyedia).
- Catatan di layar: pertanyaan materi dan potongan modul ikut dikirim ke
  penyedia AI (DRAF).
- Bila kuota web habis: jawaban tetap ada, dengan catatan bahwa jawaban itu
  tanpa pencarian web.

## Pengaturan (tabel `konfigurasi_levelin`, tanpa restart)

| Kunci | Bawaan | Arti |
|---|---|---|
| `ai_modul_aktif` | 1 | potongan modul boleh dikirim ke AI |
| `ai_modul_potongan_maks` | 3 | potongan maksimal per pertanyaan |
| `ai_modul_skor_min` | 0.1 | ambang dasar skor FULLTEXT |
| `ai_modul_kata_min` | 2 | minimal kata bermakna yang sama |
| `ai_web_aktif` | **0** | pencarian web (mati sampai dinyalakan Khalifa) |
| `ai_web_batas_harian` | 10 | pencarian web per akun per hari |
| `ai_web_hasil_maks` | 3 | hasil web per pencarian (`max_results`) |
| `ai_web_mesin` | (kosong) | mesin pencari: kosong = bawaan OpenRouter, `exa` = paksa Exa; nilai lain mematikan web (LANJUT_057) |

## Perkiraan biaya per pertanyaan materi

Ini **perkiraan** dari harga di dokumentasi OpenRouter, Oktober 2026.
Asumsinya model `anthropic/claude-sonnet-5.5` (US$2 per sejuta token masuk,
US$10 per sejuta token keluar).

| Bagian | Token / biaya | Perkiraan |
|---|---|---|
| Jawaban tanpa web | masuk ±3.000–4.500 token (instruksi ±1.800, riwayat, ≤3 potongan); keluar ±250, maks. 800 | ±US$0,009–0,017 |
| Pencarian web, panggilan model | masuk ±2.000–4.000 token (hasil pencarian disisipkan OpenRouter; cuplikan Exa ±2.000–4.000 karakter per hasil); keluar maks. 400 | ±US$0,005–0,012 |
| Pencarian web, biaya mesin pencari | Exa: US$0,007 per permintaan. Pencarian bawaan penyedia (bawaan untuk model Anthropic) mengikuti harga penyedia | **perlu dicek** di dokumentasi Anthropic |
| Jawaban dengan web | jumlah ketiga baris di atas | ±US$0,02–0,04 |

Dengan kurs ±Rp16.500/US$: tanpa web ±Rp150–280, dengan web ±Rp350–650 per
pertanyaan. Batas pemakaian per akun (`ngobrol_batas_*`, `ai_web_batas_harian`)
dan batas kredit kunci di OpenRouter adalah pengendali biayanya.
