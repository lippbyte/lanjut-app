# TASK: LANJUT_046 — Lembar Review Semua Draf Teks

## Konteks

Sejak LANJUT_034, banyak teks baru yang ditulis dan ditandai DRAF di
`docs/salinan-teks-lanjut.md`, menunggu persetujuan Khalifa. Yang
diketahui sejauh ini: §4.2 (Jenjang Saya), §4.4 (tombol Hapus dan
pesan galat Daftar Periksa), §4.5 (Arsip Belajar), §4.7 (teks baru
Latihan), §4.9 (penjelas "Perkiraan"), §4.10, §4.11, §4.12 (gerbang
isi kelas dan jenis sekolah), serta kalimat kaki F10 dari LANJUT_045.
Teks sudah tersebar dan sulit direview satu per satu.

Task ini membuat satu lembar review supaya Khalifa bisa memutuskan
setiap butir dalam satu sesi, seperti pola lembar review verifikasi
konten (LANJUT_043).

**Batasan keras:** task ini read-only terhadap teks. JANGAN mengubah
bunyi teks apa pun, JANGAN mengubah status DRAF menjadi disetujui, dan
JANGAN menulis teks baru. Hanya mengumpulkan dan menata.

## Yang Diminta

1. Baca `docs/salinan-teks-lanjut.md` dan kumpulkan SEMUA butir yang
   masih berstatus DRAF (jangan hanya yang saya sebut di atas; cek
   seluruh berkas, dan butir yang sudah disetujui jangan ikut).
2. Susun satu berkas Markdown, misalnya
   `docs/lembar-review-draf-teks.md`, dengan satu butir per teks:
   - nomor bagian di `salinan-teks-lanjut.md` dan task asalnya
     (LANJUT_xxx)
   - di mana teks tampil di app (layar dan kondisinya, misal "gerbang
     isi kelas, tampil ke akun tanpa kelas")
   - bunyi teks persis seperti di berkas
   - siapa yang melihatnya (kelompok kelas atau jenjang)
   - kotak keputusan: Setuju / Ubah / Tolak
   - kolom kosong untuk revisi dan catatan
3. Kelompokkan per layar atau fitur, bukan per nomor task, supaya
   butir yang berdampingan di app juga berdampingan di lembar.
4. Tambahkan bagian pendek di awal: daftar butir yang menyentuh klaim
   faktual (misalnya soal SNBP, kuota, atau data kampus), karena itu
   perlu perhatian ekstra dan kemungkinan sumber.
5. Sediakan perintah (misal `npm run lembar-review-teks`) untuk membuat
   ulang lembar, atau cukup catat caranya di README kalau lebih
   sederhana. Perintah hanya boleh membaca.

## Bagian B — Standar Pemeriksaan Sumber di Lembar Verifikasi Konten

Kalimat kaki F10 (LANJUT_045) sekarang menjanjikan ke siswa bahwa bagian
bertanda Terverifikasi "dicek ke sumber resmi". Janji itu hanya benar
kalau pemeriksa konten memang mengecek ke sumber resmi. Supaya standar
itu tertulis, tambahkan satu bagian di awal lembar verifikasi konten
(`docs/verifikasi/lembar-review-konten.md`).

1. Tambahkan bagian "Standar pemeriksaan" di awal lembar, ditandai
   **DRAF — menunggu persetujuan Khalifa**. Isinya usulan awal:
   - Sumber yang dihitung "resmi": SNPMB, laman PMB atau akademik
     kampus yang bersangkutan, PDDikti, dokumen kurikulum resmi prodi,
     dan sumber pemerintah lain yang setara.
   - Yang tidak dihitung: blog, artikel media, video, forum, dan
     ringkasan pihak ketiga.
   - Satu butir hanya boleh ditandai terverifikasi kalau pemeriksa bisa
     menunjuk sumber resminya (cantumkan di kolom catatan).
   - Bagian yang tidak bisa dicek ke sumber resmi tetap "Perkiraan".
2. Bagian ini harus ikut dibuat oleh perintah pembuat lembar
   (`npm run lembar-review`), supaya tidak hilang saat lembar dibuat
   ulang.
3. Ini usulan standar, bukan keputusan. Jangan mengubah status
   verifikasi apa pun dan jangan menambah aturan di luar yang tertulis
   di atas. Kalau menurutmu ada yang kurang, laporkan sebagai saran.

## Test

- [ ] Jumlah butir di lembar sama dengan jumlah butir DRAF di `salinan-teks-lanjut.md` (cek hitung langsung)
- [ ] Bagian "Standar pemeriksaan" muncul di awal lembar verifikasi dan tetap ada setelah lembar dibuat ulang
- [ ] Status verifikasi konten tidak berubah (cek sebelum dan sesudah)
- [ ] Bunyi teks di lembar identik dengan sumber (bandingkan otomatis)
- [ ] Tidak ada perubahan pada `salinan-teks-lanjut.md` maupun kode app (cek diff)
- [ ] Tes server tetap lolos

## Definition of Done

- [ ] Lembar review tersedia dan terbaca non-programmer
- [ ] Butir klaim faktual ditandai di bagian awal
- [ ] Tidak ada teks yang diubah atau disetujui oleh task ini
- [ ] Bagian B: standar pemeriksaan tertulis (DRAF) di awal lembar verifikasi konten
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Lokasi lembar dan jumlah butir total
- Daftar butir yang menyentuh klaim faktual
- Konfirmasi tidak ada teks yang diubah
- Bagian B: bunyi standar pemeriksaan yang ditulis, dan saran tambahan kalau ada
