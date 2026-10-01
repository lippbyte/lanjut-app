# TASK: LANJUT_036 — Wajib Isi Kelas untuk Akun Lama

## Konteks

Dari LANJUT_035: 939 dari 1082 akun lokal tidak punya `kelas` tersimpan
di akun (termasuk kemungkinan besar siswa kelas 12 yang dulu cuma pilih
kelas lewat tombol di Daftar Periksa, bukan di akun). Placeholder pasif
("Isi kelasmu dulu" + tombol ke Jalur Saya) sudah ada di 3 layar, tapi
siswa bisa abaikan dan tetap pakai fitur lain tanpa pernah mengisi.

Khalifa memutuskan: **wajib ada pesan/notifikasi yang memaksa** akun lama
mengisi kelas — bukan cuma placeholder pasif yang bisa dilewati.

**Prioritas tetap: fungsi dulu.** Buat mekanisme pemaksaannya jalan
dulu; kalimat/desain visual persisnya boleh draf sementara (tandai DRAF,
ikuti pola §4.10/§4.11).

## Yang Diminta

1. **Gerbang wajib isi kelas**, mirip pola gerbang auth yang sudah ada
   (RootNavigator): kalau pengguna login dan `kelas` kosong, arahkan ke
   layar "Isi Kelas" sebelum bisa ke Beranda atau layar lain mana pun.
   - Pengecualian: layar Akun/Jalur Saya sendiri (tempat isi kelasnya)
     dan tombol logout harus tetap bisa diakses dari situ.
   - Setelah kelas terisi dan disimpan, lanjut ke Beranda seperti biasa.
2. **Jangan bikin dead-end**: kalau pengguna menutup app di tengah gerbang
   ini lalu buka lagi, harus kembali ke gerbang yang sama (bukan error
   atau logout paksa).
3. **Satu kali per sesi, bukan berulang-ulang**: begitu kelas terisi,
   gerbang ini tidak muncul lagi untuk akun itu, kecuali kelas
   dikosongkan lagi secara manual (kalau itu mungkin terjadi — cek dulu
   apakah Jalur Saya mengizinkan mengosongkan kelas; kalau iya, putuskan
   apakah itu wajar atau perlu dicegah, laporkan pilihanmu).
4. Pastikan ini tidak bentrok dengan gerbang kelas-12-vs-placeholder dari
   LANJUT_035 — urutannya: gerbang auth → gerbang isi-kelas (kalau kosong)
   → baru masuk ke app dengan logic kelas-12-vs-non-12 yang sudah ada.

## Test

- [ ] Akun lama tanpa kelas, login → langsung ke gerbang isi kelas, tidak bisa ke Beranda
- [ ] Isi kelas di gerbang → lanjut ke Beranda normal
- [ ] Tutup app di tengah gerbang, buka lagi → kembali ke gerbang (bukan ke Beranda)
- [ ] Akun yang kelasnya sudah terisi (baik dari LANJUT_035 atau sudah diisi) → tidak pernah melihat gerbang ini
- [ ] Dari gerbang, tombol logout tetap berfungsi
- [ ] Typecheck 0 error, tidak ada regresi tes yang sudah ada

## Definition of Done

- [ ] Gerbang wajib isi kelas berfungsi untuk akun tanpa kelas
- [ ] Tidak ada cara untuk melewati gerbang selain mengisi kelas atau logout
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Konfirmasi: apakah Jalur Saya mengizinkan kelas dikosongkan lagi, dan keputusan yang kamu ambil soal itu
- Screenshot/deskripsi gerbang
