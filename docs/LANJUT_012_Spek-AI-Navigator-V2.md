# Spesifikasi Awal: LANJUT AI Navigator (V2)

**Status: Dokumen perencanaan.** Belum ada kode yang boleh ditulis dari dokumen ini sampai keputusan di Bagian 3 diambil eksplisit oleh Khalifa/tim.

## 1. Kenapa dokumen ini ada duluan, bukan langsung task Claude Code

Fitur AI di LANJUT berbeda dari fitur lain yang sudah dikerjakan (Cek Posisi Gue, Jalur Saya, dst) karena tiga alasan:
1. **Ada biaya berjalan** (tiap request ke model AI = uang), bukan sekali build lalu selesai
2. **Ada risiko keselamatan nyata** — brief eksplisit menyebut siswa bisa cerita soal takut gagal, tekanan orang tua, dan AI *tidak boleh* memposisikan diri sebagai pengganti guru BK/psikolog
3. **Keputusan produk (model, biaya, batasan) mengubah cara kode ditulis** — kalau ini ditulis dulu sebagai task teknis, Claude Code akan terpaksa menebak, dan tebakan soal biaya/keselamatan bukan hal yang boleh ditebak

## 2. Prinsip yang tidak boleh dilanggar (dari brief, non-negotiable)

- **"Suggest, don't dictate"** — AI tidak pernah bilang "kamu harus jadi X" atau "pilihan terbaikmu adalah Y"
- **AI bukan produk utama** — jangan posisikan LANJUT sebagai "chatbot AI", AI adalah lapisan bantu di atas fitur yang sudah ada
- **AI tidak boleh menggantikan profesional** — kalau siswa cerita hal yang mengarah ke kondisi serius (tertekan berat, menyakiti diri, dll — bukan cuma "bingung milih jurusan"), sistem harus **mengarahkan ke bantuan manusia**, bukan mencoba menyelesaikan sendiri
- **AI mengarahkan ke fitur produk**, bukan menyelesaikan semuanya lewat chat — misal AI Planner harus bilang "kamu bisa mulai dari fitur Pilih Mapel" bukan menjelaskan semuanya sendiri di chat

## 3. Keputusan yang HARUS diambil sebelum implementasi apapun

Ini bukan detail teknis kecil — ini keputusan produk yang menentukan biaya dan risiko:

| # | Keputusan | Pilihan | Catatan |
|---|---|---|---|
| 1 | Model AI apa | (belum diputuskan) | Biaya per-request beda jauh antar model; siapa yang bayar tagihan API? |
| 2 | Batasan topik | (belum diputuskan) | Apakah AI cuma boleh bahas pendidikan/karir, atau boleh melebar? |
| 3 | Protokol eskalasi | (belum diputuskan) | Kalau siswa cerita hal serius (self-harm, dll) — sistem harus tahu kalimat/kondisi apa yang memicu redirect ke bantuan manusia, dan redirect ke mana (guru BK sekolah? hotline nasional?) |
| 4 | Siapa yang moderasi | (belum diputuskan) | Kalau AI menjawab hal yang salah/berbahaya, siapa yang review log percakapan? |
| 5 | Berapa siswa pilot | (belum diputuskan) | Jangan langsung buka ke semua 50 pengguna — mulai dari beberapa orang dulu untuk lihat pola percakapan nyata |

**Task Claude Code apapun soal AI tidak boleh dibuat sebelum kelima ini punya jawaban.**

## 4. Empat peran AI (dari brief) — urutan implementasi disarankan

Brief mendefinisikan 4 peran. Saya urutkan dari risiko paling rendah ke paling tinggi — **bukan berarti harus dikerjakan sekaligus**, ini panduan fase kalau nanti waktunya tiba:

### Fase 1 (paling aman): AI Navigator
- Jawab "gue harus ngapain sekarang?" berdasar data yang SUDAH ADA (kelas, prodi_impian, progress checklist)
- **Catatan penting:** ini overlap besar dengan Cek Posisi Gue yang sudah ada dan rule-based (tanpa AI). Pertimbangkan: apakah AI Navigator benar-benar perlu model AI, atau cukup diperkaya dari logic yang sudah ada di `lib/cekPosisi.ts`? Jangan pakai AI kalau rule-based sudah cukup — itu lebih murah dan lebih predictable.

### Fase 2: AI Explorer
- Guided reflection untuk siswa yang belum tahu minat (pertanyaan terbuka: apa yang disukai, aktivitas yang menarik, dst)
- Risiko lebih tinggi dari Navigator karena percakapan lebih terbuka/tidak terstruktur
- Output harus tetap berupa **area untuk dieksplorasi** (Teknologi/Desain/Data/dst), bukan keputusan final

### Fase 3: AI Planner
- Memetakan Current State → Goal → Route → Next Steps dalam percakapan
- Harus terintegrasi dengan fitur existing (contoh dari brief: "kamu bisa mulai dari fitur Pilih Mapel")

### Fase 4 (paling hati-hati): AI Companion
- Ruang refleksi untuk siswa yang belum nyaman cerita ke orang lain (takut gagal, tekanan ortu, dll)
- **Ini yang paling butuh guardrail matang** — brief eksplisit soal ini. Jangan mulai dari sini. Fase ini butuh:
  - Protokol eskalasi yang jelas dan teruji (lihat Bagian 3, keputusan #3)
  - Bahasa yang tidak pernah mendiagnosis atau memberi label kondisi mental
  - Kalimat siap pakai untuk redirect ke bantuan manusia, bukan dikarang on-the-fly oleh model

## 5. Yang TIDAK termasuk scope V2 awal

- Chat bebas topik apapun (harus tetap dalam koridor pendidikan/karir)
- Menggantikan Cek Posisi Gue yang sudah rule-based dan sudah jalan — AI cuma menambah, bukan mengganti fitur yang sudah terbukti bekerja
- Fitur Future Simulation (brief section 10) dan Personal Education Path detail (section 11) — ini nice-to-have yang bisa nyusul jauh setelah 4 peran dasar jalan

## 6. Prasyarat sebelum V2 dimulai (dari roadmap v1.1/v1.2 yang sudah dikerjakan)

- [x] Tier 0 (verifikasi konten, izin alumni, APK) — **harus 100% beres dulu**, bukan cuma "sudah alatnya siap"
- [x] v1.1 Personalization — sudah selesai, data (`prodi_impian`, progress checklist, hasil Cek Posisi Gue) sudah tersedia sebagai konteks kalau nanti AI butuh personalisasi
- [ ] Kelima keputusan di Bagian 3 — **ini yang masih kosong**

## 7. Langkah berikutnya yang disarankan

1. Khalifa isi tabel Bagian 3 (bisa didiskusikan bareng tim JHIC/EDILAKSO)
2. Setelah itu, mulai dari **Fase 1 (Navigator)** dengan pertanyaan eksplisit dulu: apakah ini benar-benar butuh model AI, atau cukup perluasan dari Cek Posisi Gue yang sudah ada
3. Fase 4 (Companion) ditunda paling akhir, dan sebaiknya direview lagi lebih detail (termasuk kemungkinan konsultasi ke guru BK asli soal bagaimana redirect yang baik) sebelum ada kode ditulis untuk itu
