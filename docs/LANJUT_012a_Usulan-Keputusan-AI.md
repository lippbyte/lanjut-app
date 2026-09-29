# Usulan Jawaban Keputusan AI (pendamping LANJUT_012)

**Status: usulan untuk diputuskan Khalifa/tim — bukan keputusan.** Dokumen ini hanya menyiapkan bahan untuk tabel Bagian 3 di `LANJUT_012_Spek-AI-Navigator-V2.md`. Belum ada kode AI yang ditulis, dan memang belum boleh.

---

## Ringkasan (baca ini dulu)

1. **Fase 1 (AI Navigator) tidak butuh model AI.** Cek Posisi Gue sudah menjawab "gue harus ngapain sekarang?" secara rule-based. Yang kurang bisa ditambal dengan aturan, lebih murah dan lebih bisa ditebak (lihat Bagian A).
2. **Karena itu, lima keputusan di Bagian 3 baru *mendesak* sebelum Fase 2 (AI Explorer)**, fase pertama yang menerima teks bebas dari siswa. Fase 1 bisa jalan sekarang tanpa menunggu kelimanya.
3. **Biaya bukan risiko terbesarnya.** Pilot 10 siswa diperkirakan cuma sekitar $3–$10 per bulan (Bagian B.1). Risiko sebenarnya ada di keselamatan dan data anak di bawah umur.
4. **Ada satu keputusan yang belum ada di tabel:** izin dan perlindungan data siswa di bawah umur (usulan keputusan #6, Bagian B.6).

---

## A. Apakah Navigator (Fase 1) butuh AI?

**Usulan: tidak.** Rincian di bawah dibaca dari kode yang ada sekarang (`LANJUT_App/lib/cekPosisi.ts`).

Yang **sudah** dikerjakan Cek Posisi tanpa AI:

| Kebutuhan Navigator | Sudah ada? | Dari mana |
|---|---|---|
| Tahu posisi siswa (4 tahap) | Ya | `prodi_impian` + persen Daftar Periksa |
| Saran fokus sekarang | Ya | 2–3 kalimat per tahap, bahasa "menawarkan" |
| Mengarahkan ke fitur, bukan menjelaskan sendiri | Ya | Satu tombol "Langkah Berikutnya" ke Pilih Mapel / Daftar Periksa / Linimasa / Cerita Alumni |
| Menanggapi kebingungan siswa | Sebagian | 4 pilihan tetap (kampus, mapel, takut, mulai) |
| Tidak mendikte | Ya | Semua kalimat sudah ditulis dan direview manusia |

Yang **belum** ada dan bisa ditambah **dengan aturan** (tanpa AI):

- **Tenggat terdekat.** Linimasa sudah punya tanggal. "Pendaftaran SNBP tinggal 12 hari" adalah sinyal paling kuat untuk "ngapain sekarang", dan sama sekali tidak butuh AI.
- **Checklist per rumpun.** Backend sudah mendukungnya (LANJUT_007/008). Begitu tim konten mengisi butir per rumpun, saran bisa menyebut langkah yang relevan untuk rumpun prodi siswa.
- **Pilihan kebingungan tambahan.** Kalau pilot memperlihatkan siswa sering memilih "Lainnya", catat jawabannya dan tambahkan sebagai pilihan tetap baru.

Satu-satunya hal yang *memang* butuh AI adalah **memahami kebingungan yang ditulis bebas**. Itu sudah percakapan terbuka, jadi masuk wilayah risiko Fase 2, bukan Fase 1.

**Usulan langkah:** jadikan "Cek Posisi + tenggat + rumpun" sebagai Fase 1. Tunda model AI sampai Fase 2.

---

## B. Usulan untuk lima keputusan (+1)

### B.1 Model AI dan siapa yang bayar (keputusan #1)

Harga resmi Anthropic per 1 juta token (data 24 Juni 2026; cek ulang sebelum memutuskan):

| Model | Input | Output | Catatan |
|---|---|---|---|
| Claude Haiku 4.5 | $1 | $5 | Paling murah dan cepat |
| Claude Sonnet 5 | $2 | $10 | Tengah |
| Claude Opus 5.5 | $4 | $20 | Lebih mampu; "berpikir" selalu aktif, jadi token output bisa lebih banyak |

Perkiraan **per sesi** percakapan pendek: 6 giliran, sekitar 15.000 token input (instruksi keselamatan + konteks siswa + riwayat) dan sekitar 1.200 token output. Kurs dianggap Rp16.500/USD.

| Model | Per sesi | Pilot: 10 siswa × 3 sesi/minggu × 4 minggu (120 sesi) |
|---|---|---|
| Haiku 4.5 | ≈ $0,02 (±Rp350) | ≈ $2,5 |
| Sonnet 5 | ≈ $0,04 (±Rp700) | ≈ $5 |
| Opus 5.5 | ≈ $0,08 (±Rp1.400)* | ≈ $10* |

\* Belum termasuk token "berpikir", yang ditagih sebagai output. Dengan tingkat usaha rendah biasanya kecil, tapi perlu diukur saat pilot.

**Usulan:**
- **Untuk pilot, pilih berdasarkan kualitas dan keselamatan, bukan harga.** Selisih biaya antar model di skala pilot hanya beberapa dolar per bulan, sedangkan percakapan dengan remaja soal takut gagal atau tekanan orang tua butuh model yang paling bisa diandalkan menahan diri. Mulai dengan model yang lebih mampu, lalu ukur. Turun ke model lebih murah hanya kalau hasil uji di percakapan nyata sama baiknya.
- **Siapa yang bayar:** tentukan satu akun penagihan (EDILAKSO?) dan pasang **batas pengeluaran bulanan** di konsol API sejak hari pertama.
- **Kunci API hanya boleh ada di backend** (server Rumahweb), **tidak pernah** di dalam APK. APK bisa dibongkar siapa saja.

### B.2 Batasan topik (keputusan #2)

**Usulan:** hanya pendidikan lanjutan dan karier (jurusan, kampus, jalur masuk, mapel, persiapan, dan perasaan yang terkait dengan itu).
- Di luar topik → AI menjawab dengan kalimat tetap yang ditulis tim, misalnya "Aku cuma bisa bantu soal rencana kuliah dan karier. Mau lanjut bahas itu?", lalu tidak melanjutkan topik lain.
- Perasaan yang terkait dengan persiapan (cemas, takut ditolak) tetap boleh dibahas, dengan batas di B.3.

### B.3 Protokol eskalasi (keputusan #3) — paling penting

**Usulan prinsip:**
1. **Kalimat eskalasi ditulis dan direview manusia, bukan dikarang model.** Model hanya menandai "ini perlu eskalasi"; aplikasi yang menampilkan teks tetap dan kontak bantuan. Ini sesuai dengan dokumen 012 Bagian 4 Fase 4.
2. **Pemicu** (usulan awal, perlu direview guru BK): menyebut ingin menyakiti diri atau mengakhiri hidup; kekerasan atau ancaman dari orang lain; putus asa berat yang berulang ("nggak ada gunanya hidup"). "Bingung pilih jurusan" atau "takut nggak keterima" **bukan** pemicu.
3. **Setelah eskalasi:** AI berhenti mencoba "menyelesaikan". Tampilkan kontak, tawarkan kembali ke fitur hanya kalau siswa sendiri yang memintanya.
4. **Tujuan redirect, berlapis:**
   - **Guru BK sekolah siswa.** Karena pilot lewat sekolah, ini orang yang paling dekat dan bisa bertindak. Perlu kesepakatan dengan sekolah pilot.
   - **Layanan nasional:** kandidat seperti layanan kesehatan jiwa Kemenkes (119) dan layanan pengaduan anak KemenPPPA (SAPA 129). **Nomor dan jam layanan wajib diverifikasi tim ke sumber resmi sebelum dipakai.** Dokumen ini tidak menjamin nomornya masih berlaku.
   - Darurat: 112.
5. **Uji sebelum pilot:** buat 20–30 contoh kalimat siswa (yang harus memicu dan yang tidak), lalu pastikan sistem menanganinya dengan benar. Bagian ini sebaiknya direview guru BK asli.

### B.4 Siapa yang moderasi (keputusan #4)

**Usulan:**
- **Satu penanggung jawab bernama** (bukan "tim"), plus satu cadangan.
- Setiap **eskalasi** direview dalam 1×24 jam. Sampel acak percakapan biasa, misalnya 10%, direview mingguan selama pilot.
- Log disimpan **terbatas** (misalnya 90 hari), bisa diakses hanya oleh penanggung jawab, lalu dihapus. Tidak dipakai untuk hal lain.
- Jalur cepat: kalau ditemukan jawaban berbahaya, fitur AI bisa **dimatikan dari server** tanpa build ulang APK.

### B.5 Berapa siswa pilot (keputusan #5)

**Usulan:** 5–10 siswa, dari 1 sekolah, selama 4 minggu, dengan izin tertulis (lihat B.6) dan guru BK yang tahu pilot sedang berjalan. Buka lebih luas hanya setelah review log pilot tidak menemukan masalah keselamatan.

### B.6 (Usulan keputusan baru) Izin dan data siswa di bawah umur

Belum ada di tabel 012, tapi menurut saya wajib diputuskan sebelum Fase 2:
- Sebagian besar pengguna LANJUT adalah siswa SMK, **banyak yang di bawah 18 tahun**. Percakapan mereka akan dikirim ke penyedia AI pihak ketiga.
- UU No. 27/2022 tentang Pelindungan Data Pribadi mengatur pemrosesan data anak secara khusus, termasuk persetujuan orang tua/wali. **Perlu dicek ke pihak yang paham hukum**; ini bukan nasihat hukum.
- **Usulan minimal untuk pilot:** formulir persetujuan orang tua/wali dan sekolah; penjelasan dengan bahasa siswa bahwa percakapan dengan AI dibaca mesin dan bisa direview tim; dan **jangan kirim** nama asli, sekolah, atau data identitas ke model. Konteks yang dikirim cukup tahap, rumpun prodi, dan progres.

---

## C. Tabel Bagian 3 dengan usulan

| # | Keputusan | Usulan | Siapa memutuskan |
|---|---|---|---|
| 1 | Model AI & pembayar | Pilot dengan model yang lebih mampu (biaya ±$5–$10/bulan), lalu ukur; satu akun penagihan dengan batas bulanan; kunci API hanya di backend | Khalifa + pemegang anggaran |
| 2 | Batasan topik | Hanya pendidikan lanjutan & karier; di luar itu kalimat tetap | Tim produk |
| 3 | Protokol eskalasi | Kalimat & pemicu ditulis manusia; redirect ke guru BK + layanan nasional (nomor diverifikasi) + 112; diuji 20–30 contoh | Tim + **guru BK** |
| 4 | Moderasi | 1 penanggung jawab bernama; eskalasi direview ≤24 jam; log 90 hari; tombol mati dari server | Khalifa |
| 5 | Jumlah pilot | 5–10 siswa, 1 sekolah, 4 minggu | Tim + sekolah |
| 6 | Izin & data anak *(baru)* | Persetujuan ortu/wali + sekolah; tanpa data identitas ke model; cek UU PDP | Khalifa + penasihat hukum |

## D. Langkah berikutnya yang diusulkan

1. Khalifa/tim menyetujui atau mengubah tabel C.
2. **Terpisah dan bisa langsung jalan:** task Fase 1 tanpa AI (Cek Posisi + tenggat Linimasa + checklist per rumpun).
3. Setelah C disetujui: rapat singkat dengan guru BK sekolah pilot untuk B.3.
4. Baru setelah itu task teknis Fase 2 (Explorer) ditulis.
