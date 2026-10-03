# TASK: LANJUT_045 — Kalimat Kaki Halaman F10 Per Bagian

## Konteks

Dari laporan LANJUT_044: kaki halaman Eksplorasi Tujuan (F10) berbunyi
"dicek [tanggal]" untuk seluruh profil. Padahal profil yang sebagian
isinya berlabel "Perkiraan" (mata kuliah di 14 profil, profesi di 5
profil) boleh ditandai terverifikasi (keputusan Khalifa, 2 Okt). Siswa
bisa membaca "dicek" lalu mengira seluruh isi sudah dicek, termasuk
bagian yang berlabel "Perkiraan".

Kalimat penjelas "Perkiraan" dari LANJUT_044 mengurangi risikonya, tapi
kalimat kaki halaman perlu jujur soal bagian mana yang dicek.

Ini perbaikan kejujuran isi, bukan polish tampilan. Ubah teksnya saja,
jangan ubah tata letak.

## Yang Diminta

1. Temukan kalimat kaki "dicek [tanggal]" di layar F10 (layar daftar
   dan layar detail, kalau keduanya punya).
2. Ubah supaya mengikuti `status_sumber` profil itu (kunci: `peminat`,
   `mata_kuliah`, `profesi`, `kampus`):
   - Semua bagian "Terverifikasi": kalimat seperti "Isi profil ini
     dicek [tanggal]."
   - Ada bagian "Perkiraan": kalimat seperti "Bagian bertanda
     Terverifikasi dicek [tanggal]. Bagian bertanda Perkiraan belum
     dicek ke sumber resmi."
   Kata-katanya boleh kamu sesuaikan agar natural dan konsisten dengan
   kalimat penjelas LANJUT_044; yang penting maknanya tidak menyiratkan
   bahwa bagian "Perkiraan" sudah dicek.
3. Tandai teks baru sebagai DRAF di `salinan-teks-lanjut.md` (§4.9
   atau bagian yang sesuai), tunggu persetujuan Khalifa.
4. Uji tampilan memakai pola LANJUT_044: tandai SATU profil terverifikasi
   sementara hanya di `lanjut_test` (profil yang punya "Perkiraan",
   misalnya `keperawatan`, dan satu yang semuanya "Terverifikasi" kalau
   ada), lalu batalkan lagi. Status akhir wajib kembali 0/18, dengan
   pembatalan di blok `finally` seperti sebelumnya.

## Test

- [ ] Profil dengan bagian "Perkiraan" menampilkan kalimat kaki versi "Perkiraan"
- [ ] Profil tanpa "Perkiraan" menampilkan kalimat kaki versi biasa (kalau ada profil seperti itu; kalau tidak, uji dengan respons yang diubah di browser seperti di LANJUT_044)
- [ ] Status verifikasi akhir sama dengan awal (0/18), dicek sebelum dan sesudah
- [ ] Tes server tetap lolos, typecheck 0 error

## Definition of Done

- [ ] Kalimat kaki tidak lagi menyiratkan seluruh profil sudah dicek
- [ ] Teks baru ditandai DRAF
- [ ] Tidak ada profil yang tertinggal berstatus terverifikasi
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Bunyi kalimat kaki final untuk tiap kasus
- Screenshot kedua kasus
- Konfirmasi status verifikasi kembali ke 0/18
