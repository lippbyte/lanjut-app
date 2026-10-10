# TASK: LANJUT_060 — Celah Keselamatan Sisa dan Pemantauan Pilot

## Konteks

LANJUT_059 (`docs/peta-kelengkapan-2026-10-09.md`) menemukan beberapa
hal yang bisa ditutup lewat kode dan belum ditutup oleh 053–058:

1. Dua skenario keselamatan masih lolos dari deteksi: **A06** ("diancam
   sebar foto") dan **A07** ("pengen hilang aja"). Keduanya masih `todo`
   di lapis 1 skenario AI.
2. **Pesan bertanda bahaya akut ikut terkirim ke penyedia AI** lewat
   riwayat pada pesan berikutnya. Server menjawab pesan akut sendiri tanpa
   AI (053), tetapi bila siswa menulis lagi, riwayat yang memuat pesan itu
   ikut dikirim. Ini bertentangan dengan klaim di kebijakan v2 (056) bahwa
   pesan yang memicu tanda bahaya tidak dikirim ke penyedia.
3. Bawaan `ai_aktif` adalah `1`, padahal untuk rilis awal sebaiknya `0`
   (gagal-aman).
4. Server belum mencatat token atau biaya, sehingga pilot tidak bisa
   dipantau. Yang boleh dicatat hanya angka agregat tanpa isi pesan.
5. `OPENROUTER_API_KEY` belum ada di tabel variabel lingkungan README server.
6. Kalimat di app "yang sudah pernah dibuka masih bisa dilihat" hanya benar
   selama app belum ditutup (cache hanya di memori).
7. Skrip dan tangkapan layar E2E tidak tersimpan di repo, sehingga uji
   360 px tidak bisa diulang.

Aturan keras tetap: jangan mengisi atau meminta kunci API, tidak ada
panggilan jaringan keluar, semua uji memakai penyedia tiruan. Daftar kata
tanda bahaya adalah DRAF yang tetap harus ditinjau guru BK.

## Yang Diminta

### 1. Tutup A06 dan A07
- Perluas `server/config/tanda-bahaya.json` dan/atau logika pencocokan
  supaya "diancam sebar foto" dan "pengen hilang aja" terdeteksi akut,
  termasuk variasi umum: urutan kata berbeda ("fotoku mau disebar dia
  ancam"), ejaan gaul, dan bentuk "mau/pengen/pgn + hilang/menghilang".
  Pertimbangkan pencocokan kombinasi kata kunci (mis. ancam + sebar/
  viral/upload + foto/video) di samping frasa utuh.
- Ubah A06 dan A07 dari `todo` menjadi tes aktif yang lolos.
- Tambahkan paling sedikit 6 variasi kalimat tambahan per skenario ke
  `skenario.json` (kategori A) dan pastikan lolos.
- Dokumentasikan positif palsu baru yang muncul, apa adanya, untuk guru BK.
  Prinsip tetap: lebih baik terlalu sering menampilkan kartu daripada
  terlewat.

### 2. Pesan akut tidak lagi bocor lewat riwayat
- Sebelum riwayat dikirim ke penyedia, server memeriksa setiap pesan
  siswa dengan deteksi yang sama. Pesan yang akut diganti dengan penanda
  netral, misalnya "[siswa menyampaikan hal yang sangat berat; aplikasi
  sudah menampilkan kartu bantuan]". Isi aslinya tidak dikirim.
- Balasan tetap dari server (kalimat empati + kartu) boleh tetap ada di
  riwayat.
- Ini berlaku juga bila pesan akut tidak terdeteksi pada saat dikirim
  tetapi terdeteksi saat menjadi riwayat (mis. setelah daftar kata
  diperbarui).
- Pencarian modul dan kueri web (055) tidak boleh memakai pesan akut.
- Tes: percakapan dua giliran; pada giliran kedua, isi permintaan di mock
  penyedia **tidak memuat** teks pesan akut giliran pertama, tetapi memuat
  penanda netral. Tes harus gagal bila penjaga dicabut (buktikan).
- Perbarui `docs/kebijakan-v2-klaim-vs-kode.md`: klaim tentang pesan akut
  kini punya bukti baru (berkas:baris dan tes).

### 3. Bawaan gagal-aman
- Bawaan `ai_aktif` menjadi `0` di benih/migrasi konfigurasi. Tes yang
  membutuhkan AI aktif menyalakannya secara eksplisit.
- Tulis di `server/README.md`: untuk uji lokal dengan kunci, nyalakan
  `ai_aktif=1` lewat perintah SQL yang sudah ada; dan peringatan bahwa di
  produksi `ai_aktif` tetap `0` sampai daftar periksa keselamatan di
  `docs/kesiapan-rilis-uji.md` terpenuhi.
- Bila ada deployment lama yang sudah bernilai `1`, migrasi tidak boleh
  mengubahnya diam-diam; cukup bawaan untuk instalasi baru. Jelaskan
  perilakunya di laporan.

### 4. Pemantauan agregat untuk pilot (tanpa isi, tanpa identitas)
- Tabel baru lewat migrasi bernomor berikutnya, mis. `pemakaian_ai_harian`:
  `tanggal`, `panggilan_ai`, `token_masuk`, `token_keluar`,
  `balasan_stub`, `tanda_akut`, `tanda_ringan`, `galat_penyedia`,
  `web_dipakai`, `web_kuota_habis`, `modul_dipakai`. **Tanpa id akun,
  tanpa isi pesan, tanpa kueri.**
- Token diambil dari kolom penggunaan (usage) dalam respons penyedia;
  bila respons tidak memuatnya, catat 0 dan jangan melempar galat.
- Penambahan atomik (`INSERT ... ON DUPLICATE KEY UPDATE`), tidak boleh
  memperlambat atau menggagalkan jawaban bila pencatatan gagal.
- Skrip baca sederhana `npm run pemakaian-ai -- --hari=7` yang mencetak
  tabel ringkas dan perkiraan biaya bila tarif diatur di konfigurasi
  (`ai_tarif_masuk_per_juta`, `ai_tarif_keluar_per_juta`, kosong =
  tidak menghitung biaya).
- Tes: penambahan harian benar; tidak ada kolom yang bisa memuat isi;
  kegagalan pencatatan tidak mengganggu respons; skema tidak punya id akun.
- Perbarui `docs/kesiapan-rilis-uji.md` bagian pemantauan dan Lampiran A
  kebijakan privasi (tabel baru, tanpa data pribadi).

### 5. Perbaikan kecil
- Tambahkan `OPENROUTER_API_KEY` (opsional, kosong = AI memakai stub)
  ke tabel variabel lingkungan README server.
- Perbaiki kalimat cache di app agar jujur (mis. "yang baru saja dibuka
  masih bisa dilihat selama app belum ditutup"), catat sebagai DRAF di
  `salinan-teks-lanjut.md`. Jangan membangun penyimpanan cache baru di
  task ini.
- Simpan skrip E2E yang saat ini ada di scratchpad ke dalam repo
  (mis. `e2e/`), dengan README singkat cara menjalankannya. Tangkapan
  layar tidak perlu ikut ter-commit; simpan hanya skripnya dan data
  fixture yang dibutuhkan. Jangan menjalankan ulang seluruhnya kecuali
  perlu untuk memastikan skrip masih jalan.

## Di luar task ini
- Review guru BK, verifikasi SAPA 129, cek retensi penyedia.
- Server produksi dan deploy.
- Peringatan otomatis dan jalur moderasi (cukup dicatat sebagai celah
  di `kesiapan-rilis-uji.md` bila belum ada).

## Definition of Done

- [ ] A06 dan A07 lolos sebagai tes aktif; variasi tambahan lolos; positif palsu baru didokumentasikan
- [ ] Pesan akut tidak ikut terkirim lewat riwayat; tes terbukti gagal tanpa penjaga
- [ ] Klaim kebijakan tentang pesan akut diperbarui dengan bukti
- [ ] Bawaan `ai_aktif` = 0 untuk instalasi baru; instalasi lama tidak diubah diam-diam; README diperbarui
- [ ] `pemakaian_ai_harian` + skrip `pemakaian-ai`, tanpa id akun dan tanpa isi
- [ ] `OPENROUTER_API_KEY` ada di README; kalimat cache dikoreksi; skrip E2E ada di repo
- [ ] `npm test`, `periksa-sql`, `tsc` bersih; lapis 1 skenario AI lolos tanpa `todo` untuk A06/A07
- [ ] Tidak ada panggilan jaringan keluar, kunci API tidak disentuh
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Daftar kalimat/variasi baru yang kini terdeteksi dan positif palsu yang muncul (untuk guru BK)
- Perilaku `ai_aktif` pada instalasi lama vs baru
- Contoh keluaran `npm run pemakaian-ai` dengan data uji
- Bagian `kesiapan-rilis-uji.md` yang berubah
