# TASK: Fitur "Cek Posisi Gue" — v1.1 Personalization

## Konteks

Brief produk (section 12) mendeskripsikan "Cek Posisi Gue" sebagai implementasi langsung dari metafora GPS: user tahu **posisi mereka sekarang**, **fokus yang harus dikerjakan**, dan **langkah berikutnya**.

**Penyesuaian dari brief mentah:** brief menyarankan user menjawab kuis manual (jenjang, kelas, jurusan, target, dll). Tapi app ini cuma melayani satu segmen (siswa SMK kelas 12), dan sebagian besar data itu **sudah ada** dari fitur Jalur Saya (LANJUT_004): `prodi_impian` (target sudah ada atau belum), progress Daftar Periksa. **Jangan bikin user isi ulang data yang app-nya sendiri sudah tahu.**

Pendekatan: **hitung posisi secara otomatis** (rule-based, BUKAN AI) dari data yang sudah ada, plus (opsional) satu pertanyaan kualitatif tambahan: "hal yang paling bikin bingung sekarang" — untuk personalisasi pesan, bukan untuk menentukan logika utama.

**Jangan ubah apapun di `LANJUT_App/server/`** kecuali sekadar baca data yang sudah ada.

## Prinsip penting dari brief (WAJIB dipatuhi)

> "Suggest, don't dictate." — LANJUT membantu pengguna melihat pilihan, bukan menentukan keputusan.

Jangan pernah pakai bahasa seperti "Kamu harus...", "Pilihan terbaikmu adalah...". Pakai bahasa yang tentatif dan membantu: "Sepertinya kamu masih di tahap...", "Ini bisa jadi langkah yang cocok buat kamu sekarang..."

## Langkah 0 — Audit data yang tersedia (wajib sebelum desain logic)

1. Dari fitur Jalur Saya (LANJUT_004): field apa saja yang bisa dipakai untuk menentukan "posisi" siswa? (`prodi_impian` kosong/terisi, `kelas` kosong/terisi)
2. Dari Daftar Periksa: berapa persen progress yang tersedia (misal dari hook shared yang sudah dibuat di LANJUT_004)?
3. Dari Pilih Mapel: apakah ada indikator "sudah pilih mapel TKA atau belum" yang bisa diakses (disebut di LANJUT_003: "Simpan mencentang butir Pilih 2 mapel pilihan TKA di akun")?
4. Catat semua sinyal yang tersedia di laporan akhir sebelum lanjut ke Langkah 1.

## Langkah 1 — Rancang logic "tahap" (rule-based, sederhana)

Contoh kerangka (sesuaikan dengan data riil dari Langkah 0, ini cuma starting point — diskusikan/catat kalau perlu disesuaikan):

| Kondisi | Tahap | Fokus Sekarang | Langkah Berikutnya |
|---|---|---|---|
| `prodi_impian` kosong | **Eksplorasi** | Kenali bidang yang diminati, jangan dulu kunci keputusan | Arahkan ke Pilih Mapel / Cerita Alumni |
| `prodi_impian` terisi, progress checklist < 30% | **Pemantapan Awal** | Mulai riset PTN & jalur masuk untuk target prodi | Arahkan ke Daftar Periksa |
| `prodi_impian` terisi, progress 30-70% | **Persiapan Aktif** | Lanjutkan checklist, cek linimasa untuk tenggat penting | Arahkan ke Linimasa |
| progress ≥ 70% | **Menjelang Pendaftaran** | Pastikan dokumen & jalur sudah fix | Arahkan ke Daftar Periksa (sisa item) |

Ini bukan aturan final — kalau dari Langkah 0 ternyata ada sinyal lain yang lebih akurat (misal dari Pilih Mapel), boleh disesuaikan, catat perubahannya di laporan akhir.

## Langkah 2 — (Opsional) satu pertanyaan kualitatif

Tambahkan satu pertanyaan ringan: "Apa yang paling bikin kamu bingung sekarang?" dengan beberapa pilihan (bukan free-text, biar bisa dipetakan ke rekomendasi):
- "Belum tahu mau kuliah di mana"
- "Bingung milih mapel TKA"
- "Takut nggak keterima"
- "Nggak tahu harus mulai dari mana"

Jawaban ini **tidak mengubah logika tahap utama** (itu tetap dari data yang sudah ada), tapi bisa menyesuaikan kalimat "Fokus Sekarang" jadi lebih personal.

## Langkah 3 — Bangun layar/komponen

- Bisa jadi entry point dari halaman Akun (dekat Jalur Saya) atau kartu di Beranda — pilih yang paling natural secara alur, cek dulu apakah ada tempat yang sudah disiapkan untuk ini
- Tampilkan 3 bagian sesuai brief: **Posisi Kamu** (nama tahap) → **Fokus Sekarang** (1-3 poin) → **Langkah Berikutnya** (tombol yang langsung navigate ke fitur terkait)
- Kalau ada Langkah 2 (pertanyaan kualitatif): tampilkan dulu sebelum hasil, simpan jawabannya (opsional — cek apakah ada endpoint untuk simpan preferensi semacam ini, kalau tidak ada cukup dipakai sekali untuk personalisasi tampilan saat itu saja, tidak perlu persist ke server)

## Langkah 4 — Test manual

- [ ] Akun dengan `prodi_impian` kosong → tahap "Eksplorasi" tampil
- [ ] Akun dengan `prodi_impian` terisi + checklist rendah → tahap "Pemantapan Awal"
- [ ] Akun dengan checklist tinggi → tahap "Menjelang Pendaftaran"
- [ ] Tombol "Langkah Berikutnya" benar-benar navigate ke layar yang relevan
- [ ] Bahasa yang dipakai tidak terkesan mendikte (cek ulang semua teks terhadap prinsip "suggest, don't dictate")
- [ ] Tidak ada crash kalau data kosong semua (user baru banget daftar)

## Langkah 5 — Commit & dokumentasi

- Commit terpisah: logic tahap, lalu UI/komponen, lalu (kalau ada) pertanyaan kualitatif
- Update `LANJUT_App/README.md`: tambahkan "Cek Posisi Gue" ke daftar fitur

## Definition of Done

- [ ] Logic tahap berjalan otomatis dari data yang sudah ada (tidak nanya ulang hal yang sudah diketahui app)
- [ ] Semua teks konsisten dengan prinsip "suggest, don't dictate"
- [ ] Tombol rekomendasi berfungsi (navigate ke fitur yang tepat)
- [ ] Tidak crash untuk kasus data kosong (user baru)
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `LANJUT_App/server/`

## Laporkan di akhir

- Logic rule final yang dipakai (kalau beda dari tabel starting point di atas, jelaskan kenapa)
- Screenshot untuk masing-masing tahap (minimal 2 kondisi berbeda)
- Apakah pertanyaan kualitatif (Langkah 2) jadi dibuat atau di-skip, dan alasannya
- Commit hash
