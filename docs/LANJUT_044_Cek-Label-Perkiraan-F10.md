# TASK: LANJUT_044 — Pastikan Label "Perkiraan" Terlihat di Layar F10

## Konteks

Dari laporan LANJUT_043: ada 14 profil prodi F10 dengan mata kuliah
berlabel "Perkiraan" dan 5 profil dengan profesi berlabel "Perkiraan".

Keputusan Khalifa (2 Okt): profil yang sebagian isinya berlabel
"Perkiraan" **boleh** ditandai terverifikasi oleh tim konten, dengan dua
syarat:
1. Bagian yang bukan perkiraan sudah dicek ke sumbernya (ini kerja tim
   konten, bukan task ini).
2. **Label "Perkiraan" benar-benar terlihat oleh siswa di layar.**

Task ini memastikan syarat nomor 2. Penggunanya anak sekolah, jadi
siswa tidak boleh mengira angka atau daftar perkiraan sebagai fakta
terverifikasi.

Ini perbaikan kejujuran isi, bukan polish tampilan, jadi tetap sesuai
prioritas "fungsi dulu". Cukup perubahan minimal agar label terlihat
jelas; jangan mendesain ulang layar.

## Yang Diminta

1. **Periksa jalur data**: apakah penanda "Perkiraan" per field
   (mata kuliah, profesi, dan field lain kalau ada) ikut terkirim oleh
   `GET /konten/eksplorasi-tujuan`, atau hilang di server. Laporkan
   field mana saja yang punya penanda perkiraan.
2. **Periksa layar Eksplorasi Tujuan di app**: apakah penanda itu
   tampil ke siswa, di dekat field yang bersangkutan, dengan kata yang
   jelas dan mudah terlihat (bukan teks kecil yang mudah terlewat).
3. **Kalau ada yang hilang atau tidak jelas**, perbaiki secara minimal:
   - Bawa penanda lewat server kalau belum terkirim.
   - Tampilkan label "Perkiraan" di samping field terkait, dan satu
     kalimat penjelas singkat di layar (teks ditandai DRAF di
     `salinan-teks-lanjut.md`).
4. **Kalau sudah terlihat dengan baik**, jangan ubah apa pun; cukup
   laporkan buktinya.
5. **Pengecekan di layar butuh profil yang tampil.** Karena 0/18
   terverifikasi, tandai SATU profil yang punya field "Perkiraan"
   (misal `teknik-informatika`) hanya di basis data lokal `lanjut_test`
   untuk keperluan uji, lalu **batalkan lagi** setelah selesai.
   Pastikan status akhir kembali 0/18 dan laporkan hasil pengecekan
   sebelum dan sesudah. Jangan menandai profil lain, dan jangan
   mengubah isi profil.

## Test

- [ ] Field "Perkiraan" ikut terkirim di respons endpoint (ada tesnya)
- [ ] Label "Perkiraan" terlihat di layar untuk mata kuliah dan profesi yang berlabel itu
- [ ] Profil tanpa field perkiraan tidak menampilkan label itu
- [ ] Status verifikasi di akhir task sama dengan di awal (0/18), dicek sebelum dan sesudah
- [ ] Tes server tetap lolos, typecheck 0 error

## Definition of Done

- [ ] Penanda "Perkiraan" terbukti sampai ke layar siswa
- [ ] Kalau ada perbaikan: teks baru ditandai DRAF
- [ ] Tidak ada profil yang tertinggal berstatus terverifikasi
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Hasil pemeriksaan jalur data (server) dan layar (app), termasuk apa yang sudah benar sejak awal
- Screenshot profil dengan label "Perkiraan" terlihat
- Konfirmasi status verifikasi kembali ke 0/18
