# TASK: LANJUT_066 — Kartu "Info Penting" dari Data Terverifikasi

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan pada firewall.

## Konteks

Khalifa ingin Beranda memuat informasi yang penting dan menarik, seperti
portal informasi. Saran PM: berita dari internet tidak dipakai di
prototipe, karena belum ada jaminan akurasi dan konten belum diverifikasi
(saat ini 3 dari 84 terverifikasi). Yang dipakai adalah data yang sudah
ada dan punya status verifikasi di basis data: Linimasa (tanggal resmi
TKA, SNPMB, dan tahapan lain) dengan kolom `status_verifikasi`,
`diperiksa_pada`, dan `url_sumber`.

Prinsip: hanya data yang sudah terverifikasi yang tampil. Tidak ada
berita baru, tidak ada poster baru, dan tidak ada pengambilan data dari
internet.

## Yang Diminta

### A. Kartu "Info Penting" di Beranda
- Tampilkan paling banyak tiga kartu "Info Penting", diurutkan dari
  tanggal terdekat yang relevan dengan jenjang akun.
- Hanya kartu dengan `status_verifikasi = terverifikasi` yang tampil.
  Data belum terverifikasi tidak boleh tampil, bahkan dengan label.
- Kartu menampilkan: judul, tanggal (atau rentang tanggal), label
  "Sumber: [nama sumber]", dan "Diperiksa pada [tanggal]". Tautan ke
  `url_sumber` ada di kartu.
- Bila tidak ada data terverifikasi yang relevan, kartu tidak tampil.
  Jangan menampilkan kartu kosong atau kalimat "belum ada info".
- Relevansi jenjang: pakai aturan yang sudah ada di server (`kelompokJenjang`
  dan turunkanLinimasa). Jika belum cukup, tulis di laporan. Jangan
  membuat aturan baru yang belum diminta.

### B. Konsistensi dengan Linimasa
- Filter status dan urutan tanggal harus sama dengan halaman Linimasa.
  Pakai fungsi yang sama, jangan menulis ulang logika.
- Tes: data belum terverifikasi tidak muncul di Info Penting, dan
  datanya tetap tidak muncul setelah diuji dengan data simulasi yang
  dihapus lagi. Mutasi: bila filter status dicabut sementara, tes harus
  gagal.

### C. Tes dan verifikasi
- Tes otomatis: kartu tidak tampil untuk data belum terverifikasi, tampil
  untuk data terverifikasi, dan urutannya benar.
- Tes lintas akun: data tidak tergantung akun, tetapi tes memastikan
  endpoint tidak membocorkan data akun lain.
- `npm test` (server), `npm run periksa-sql`, `tsc` untuk server dan app
  bersih.
- Uji web 360 px: kondisi tanpa data terverifikasi (kartu tidak tampil),
  dan kondisi dengan satu data terverifikasi yang ditandai dengan
  `verifikasi-konten --ya` di database uji, lalu dibatalkan kembali
  dengan `--batal`. Laporkan kedua kondisi.

## Di luar task ini
- Berita atau artikel dari internet, pencarian web, atau pengambilan data
  otomatis dari situs lain.
- Mengubah status verifikasi konten yang sudah ada, atau menandai data
  sebagai terverifikasi selain untuk uji di database lokal.
- Poster, gambar baru, atau poles tampilan.
- Grid menu dan kartu "Mulai dari Sini" (itu LANJUT_065).

## Definition of Done

- [ ] Info Penting hanya menampilkan data terverifikasi; kartu hilang bila tidak ada
- [ ] Setiap kartu menampilkan sumber, tanggal periksa, dan tautan sumber
- [ ] Urutan dan filter sama dengan Linimasa, dengan fungsi yang dipakai bersama
- [ ] Tes: data belum terverifikasi tidak tampil; tes gagal bila filter dicabut sementara
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Database uji dikembalikan ke keadaan semula setelah uji
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Aturan relevansi jenjang yang dipakai, dan bagian yang belum tercakup
- Bukti dua kondisi uji (tanpa dan dengan data terverifikasi)
- Status database uji setelah pembersihan
- Keputusan yang kamu ambil sendiri
