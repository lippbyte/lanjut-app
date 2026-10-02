# TASK: LANJUT_043 — Persiapan Verifikasi Konten (Tim Konten)

## Konteks

Dari audit LANJUT_033: 0 dari 18 profil prodi F10 terverifikasi, jadi
Eksplorasi Tujuan menampilkan "Profil prodi sedang kami cek" ke semua
siswa. `teknik-elektro` belum punya profil. 12 kartu kurasi Arsip juga
belum terverifikasi, dan skrip `verifikasi-konten` belum mengenal jenis
`kartu` (LANJUT_040). Data 19 prodi dan 10 mapel juga masih
`belum_diverifikasi`.

Verifikasi isi konten adalah pekerjaan tim konten, bukan pekerjaan
kode. Task ini hanya **menyiapkan** supaya tim konten bisa bekerja
cepat dan supaya skripnya siap dipakai.

**Batasan keras:** JANGAN menandai konten apa pun sebagai
`terverifikasi`, dan JANGAN menulis isi profil baru (misal
`teknik-elektro`) — itu klaim tanpa sumber dan keputusan tim
konten/Khalifa. Task ini read-only terhadap status verifikasi.

## Yang Diminta

1. **Laporan status terkini** (baca DB lokal dengan SELECT saja, plus
   file sumber data): jumlah dan daftar item per jenis yang
   `terverifikasi` vs `belum_diverifikasi` — profil prodi (18 + yang
   hilang), prodi (19), mapel (10), kartu kurasi (12), serta jenis
   konten lain yang punya status verifikasi kalau ada. Laporkan juga
   apa yang berubah sejak LANJUT_033.
2. **Lembar review untuk tim konten**: ekspor ke satu berkas yang
   mudah dibaca non-programmer (Markdown atau CSV, pilih yang paling
   praktis dan laporkan alasannya), isinya per item: id, isi yang
   tampil ke siswa, sumber yang tercatat (kalau ada), dan kolom kosong
   untuk catatan reviewer. Urutkan dengan profil prodi F10 di atas
   karena itu yang paling menghambat fitur yang sudah jadi.
3. **Perluas skrip `verifikasi-konten` agar mengenal jenis `kartu`**,
   mengikuti pola jenis lain yang sudah ada, supaya menandai kartu
   kurasi tidak perlu SQL manual. Skrip hanya boleh mengubah status
   atas perintah eksplisit pengguna skrip, bukan otomatis.
4. **Catat kesenjangan**: daftar prodi yang belum punya profil
   (`teknik-elektro` dan lainnya kalau ada) beserta saran konkret apa
   yang dibutuhkan tim konten untuk melengkapinya (sumber apa, field
   apa). Jangan mengarang isinya.

## Test

- [ ] Laporan status cocok dengan hasil query langsung
- [ ] Lembar review memuat semua item yang belum terverifikasi
- [ ] Skrip mengenali jenis `kartu` dan menolak perintah tanpa konfirmasi eksplisit
- [ ] Tidak ada baris yang berubah status verifikasinya selama task ini (cek sebelum dan sesudah)
- [ ] Tes server tetap lolos, typecheck 0 error

## Definition of Done

- [ ] Laporan status terkini tersedia
- [ ] Lembar review siap diberikan ke tim konten
- [ ] Skrip mendukung jenis `kartu`
- [ ] Daftar kesenjangan profil tercatat
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Ringkasan status verifikasi per jenis (angka)
- Lokasi lembar review dan formatnya
- Daftar kesenjangan profil dan kebutuhan tim konten
