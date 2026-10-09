# TASK: LANJUT_057 — Perbaikan Kecil Pasca-055

## Konteks

Laporan LANJUT_055 melaporkan 7/7 benar dan 0 positif palsu pada delapan
pertanyaan uji. Penyaring relevansinya mensyaratkan **minimal 2 kata
bermakna yang sama** dengan potongan modul. Ada kemungkinan penyaring ini
terlalu ketat untuk pertanyaan yang hanya punya satu kata bermakna,
misalnya "apa itu fotosintesis", "jelaskan inflasi", atau "newton?".
Siswa sering bertanya sesingkat itu. Selain itu ada dua catatan kecil dari
laporan 055.

Aturan keras tetap: tidak mengisi atau meminta kunci API, tidak ada
panggilan jaringan keluar, semua uji memakai penyedia tiruan.

## Yang Diminta

### 1. Periksa dulu, jangan berasumsi: pertanyaan satu kata bermakna
- Ukur perilaku sekarang pada fixture tiga modul (Biologi, Fisika,
  Ekonomi) untuk: "fotosintesis", "apa itu fotosintesis", "jelaskan
  inflasi", "newton", "energi", "apa itu hukum newton".
- Laporkan tabel hasil sekarang: potongan mana yang lolos, atau tidak ada.
- **Hanya jika** pertanyaan satu kata yang spesifik (kata ada di modul
  dan jelas topiknya) ternyata tidak menemukan modulnya, perbaiki dengan
  aturan: jumlah kata sama yang disyaratkan = `min(2, jumlah kata bermakna
  pada kueri)`. Kata bermakna dihitung setelah kata henti dibuang dan
  imbuhan dipotong, seperti sekarang.
- Syarat tidak boleh mundur: delapan pertanyaan uji LANJUT_049/055 tetap
  7/7 benar dan **0 positif palsu**, khususnya "hukum kekekalan energi"
  (topik tidak ada) tidak boleh mengirim potongan apa pun.
- Catat kompromi di laporan: kata tunggal yang umum (misalnya "energi")
  bisa meloloskan potongan dari lebih dari satu mapel; penilaian model
  (tahap 2) yang menyaring. Tentukan apakah perlu batas tambahan (misalnya
  kata tunggal harus muncul ≥2 kali di potongan) dan jelaskan alasannya.
- Tambah tes untuk tiap pertanyaan di atas dengan penyedia tiruan.
  Isolasi antarakun tetap lulus.

### 2. Sisa kalimat setelah tautan karangan dibuang
Setelah server membuang tautan yang ditulis model di luar anotasi,
kadang tersisa potongan seperti "Lihat juga". Rapikan: bila tautan
dibuang dari kalimat pengantar atau daftar, buang juga kata pengantarnya
yang kini menggantung. Tambah tes dengan beberapa contoh.

### 3. Mesin pencari web bisa diatur
- Kunci konfigurasi `ai_web_mesin` dengan nilai yang sah: kosong
  (bawaan penyedia, perilaku sekarang) atau `exa`. Nilai lain ditolak dan
  membuat web tidak dipakai (bukan diabaikan), seperti pola 053.
- Bila `exa`, parameter `engine` ikut dikirim di permintaan web. Gunakan
  nama parameter yang tertulis di dokumentasi OpenRouter terkini; jangan
  menebak. Catat sumbernya.
- Tujuan: Khalifa bisa memaksa mesin yang biayanya jelas (US$0,007 per
  permintaan menurut dokumentasi) dan yang kebijakan datanya dicek,
  alih-alih pencarian bawaan yang belum diketahui.
- Tulis di `server/README.md`: cara mengatur dan peringatan bahwa
  `ai_web_aktif` sebaiknya tetap 0 sampai kebijakan data mesin pencari
  dicek.
- Tes: nilai sah mengubah isi permintaan web di mock; nilai tidak sah
  menonaktifkan web.

## Di luar task ini
- Menyalakan `ai_web_aktif`.
- Teks kebijakan (LANJUT_056, jalan terpisah).

## Definition of Done

- [ ] Tabel perilaku sekarang untuk enam pertanyaan, sebelum diubah
- [ ] Perbaikan hanya jika terbukti perlu; 7/7 benar dan 0 positif palsu tetap
- [ ] Sisa kalimat setelah tautan dibuang dirapikan, ada tes
- [ ] `ai_web_mesin` bekerja tanpa restart, nilai tidak sah mematikan web
- [ ] `npm test`, `periksa-sql`, `tsc` bersih; lapis 1 skenario AI (054) tetap lolos
- [ ] Tidak ada panggilan jaringan keluar, kunci API tidak disentuh
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Tabel perilaku sebelum dan sesudah untuk enam pertanyaan
- Keputusan tentang batas tambahan untuk kata tunggal, beserta alasannya
- Parameter `engine` yang dipakai dan sumber dokumentasinya
