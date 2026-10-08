# TASK: LANJUT_056 — Kebijakan Privasi dan Surat Orang Tua/Wali v2 (Draf)

## Konteks

Draf kebijakan privasi dan surat persetujuan orang tua/wali yang dibuat di
LANJUT_047–049 menyebut obrolan "tidak dikirim ke mana pun". Itu tidak
benar lagi sejak LANJUT_051: pesan siswa dikirim ke penyedia AI pihak
ketiga (OpenRouter dan penyedia model di baliknya). Audit LANJUT_052
mencatatnya sebagai celah 9. LANJUT_055 menambah hal baru lagi (potongan
modul, pencarian web).

Kebijakan harus menggambarkan perilaku **yang sebenarnya**. Setiap kalimat
yang berupa klaim tentang data harus bisa dibuktikan dari kode.

Task ini hanya teks dan pencocokannya dengan kode. Task ini **tidak
menaikkan versi kebijakan** di konfigurasi (aturan urutan rilis: app
dengan teks baru dirilis lebih dulu, baru versi dinaikkan; lihat LANJUT_049).

Jalankan task ini **setelah** LANJUT_055 selesai, supaya teks sesuai
perilaku akhir. Kalau 055 belum selesai, tandai kalimat yang bergantung
padanya.

## Aturan keras

- Hanya mengubah dokumen teks dan sumber JSON/teks kebijakan yang dibaca
  app. Jangan mengubah logika server atau menaikkan versi di konfigurasi.
- Jangan mengarang fakta yang tidak ada di kode. Fakta yang belum diketahui
  ditulis sebagai `[ISI: ...]`, bukan ditebak.
- Semua teks ditandai DRAF. Ini bukan nasihat hukum; tetap perlu ditinjau
  orang yang paham UU PDP.

## Masukan dari LANJUT_055 (wajib masuk, sumber: `docs/alur-data-ai-materi.md` dan Lampiran C butir 12)

LANJUT_055 sudah selesai (commit d5b4447). Perilaku akhirnya, yang harus
tergambar di teks:
1. Untuk pertanyaan materi, pertanyaan dan **hingga 3 potongan modul**
   siswa (sudah disamarkan) dikirim ke penyedia AI di luar negeri.
2. Pencarian web adalah **permintaan terpisah** yang hanya berisi
   pertanyaan terbaru yang sudah disamarkan (tanpa profil, riwayat, atau
   modul). Pertanyaan itu dikirim ke **mesin pencari pihak ketiga** lewat
   OpenRouter (Exa atau pencarian bawaan penyedia model). Fitur ini
   **mati secara bawaan** (`ai_web_aktif=0`); tulis sebagai "bila fitur
   diaktifkan". Ada batas pemakaian harian per akun.
3. Tautan sumber web membuka situs pihak ketiga di luar LANJUT.
4. Riwayat percakapan (maks. 20 pesan) dan profil belajar ikut dikirim.
   Ini sudah terjadi sejak LANJUT_051 tetapi belum tertulis di kebijakan.
5. Tidak ada yang disimpan; log hanya mencatat jumlah. Hitungan kuota web
   hanya ada di memori server.
6. Hak cipta modul yang dikirim ke penyedia luar tetap pertanyaan terbuka
   (`[ISI: ...]`).
7. Belum diketahui apakah pencarian bawaan penyedia tunduk pada
   `data_collection: deny` dan mesin pencari mana yang menerima kueri.
   Tulis sebagai `[ISI: hasil pengecekan Khalifa]`, jangan dijanjikan.

## Yang Diminta

### 1. Perbarui kebijakan privasi (v2, DRAF)
Cakup, dengan bahasa yang bisa dipahami siswa SMP/SMA/SMK dan dibaca orang tua:
- **Penyedia AI pihak ketiga**: disebut namanya (OpenRouter dan penyedia
  model yang dipakai), tujuan (menjawab pertanyaan siswa), dan bahwa data
  dapat diproses di luar negeri.
- **Apa yang dikirim**: pesan siswa yang sudah disamarkan data
  pribadinya, riwayat percakapan dalam sesi, jenjang/kelas/jenis sekolah,
  prodi impian, gaya belajar. **Apa yang tidak dikirim**: nama, nama
  pengguna, email, id akun, nama sekolah (buktikan dari
  `docs/audit-051-vs-spek.md` Lampiran 1 dan kode 053).
- **Hal dari LANJUT_055**: potongan modul yang relevan dengan pertanyaan,
  dan kueri pencarian web. Tandai kalimatnya "berlaku bila fitur aktif".
- **Penyamaran data pribadi** (HP, email, angka mirip NIK) dan peringatan
  agar tidak menulis data pribadi.
- **Penyimpanan**: isi obrolan tidak disimpan di server kami dan tidak
  masuk log; yang disimpan dan hanya metadata apa (periksa kode, sebut
  persis). Retensi di sisi penyedia: `[ISI: hasil pengecekan Khalifa
  terhadap kebijakan OpenRouter dan penyedia model]`. Sebutkan bahwa kami
  meminta penyedia yang tidak mengumpulkan data (parameter
  `data_collection: deny`) tanpa menjanjikan lebih dari itu.
- **Keselamatan**: kartu bantuan dan deteksi tanda bahaya terjadi di
  server; pesan yang memicunya tidak dikirim ke penyedia AI (periksa
  dan tulis hanya bila benar).
- **Saklar dan batas**: AI bisa dimatikan sewaktu-waktu; ada batas pemakaian.
- **Persetujuan**: untuk siswa di bawah 18 tahun diperlukan persetujuan
  orang tua/wali sebelum fitur AI aktif; tanpa itu app tetap bisa dipakai
  dengan balasan uji coba. `[ISI: apakah akun dasar (tanpa AI) juga
  butuh persetujuan orang tua; menunggu tinjauan hukum]`
- **Hak**: akses, koreksi, hapus akun dan data (termasuk hapus modul), cara
  menghubungi `[ISI: kontak resmi tim]`, cara mencabut persetujuan
  (`npm run persetujuan-ortu -- --cabut` di sisi tim; tulis versi bahasa
  awam).
- **Perubahan kebijakan** dan cara siswa diminta menerima ulang (LANJUT_048).

### 2. Perbarui surat persetujuan orang tua/wali (v2, DRAF)
- Bahasa untuk orang tua, satu halaman bila bisa.
- Jelaskan fitur AI, data yang dikirim, penyedia luar negeri, hak mencabut
  persetujuan, dan kontak. Sertakan kolom tanda tangan dan tanggal
  seperti versi sebelumnya.
- Sebutkan bahwa persetujuan mengacu pada versi kebijakan tertentu
  (`[ISI: nomor versi saat dirilis]`).

### 3. Tabel klaim → bukti
Buat `docs/kebijakan-v2-klaim-vs-kode.md`: untuk tiap klaim tentang data
di kebijakan dan surat, satu baris: klaim | bukti (berkas:baris atau
tes) | status (terbukti / perlu dicek manusia / bergantung 055). Klaim
tanpa bukti tidak boleh tetap di teks; ganti atau hapus.

### 4. Daftar yang harus dilengkapi manusia
Di akhir dokumen, daftar semua `[ISI: ...]` dengan siapa yang mengisi
(Khalifa, guru BK, peninjau hukum), termasuk:
- hasil pengecekan retensi OpenRouter/penyedia model,
- kontak resmi tim,
- akun dasar butuh persetujuan atau tidak,
- masa simpan modul (butir Lampiran C),
- hak cipta modul yang dikirim ke penyedia luar.

### 5. Cek otomatis
- Tes "dokumen kebijakan sesuai JSON" yang sudah ada tetap lulus.
- Tambah pemeriksaan sederhana: kata/kalimat terlarang "tidak dikirim ke
  mana pun" (dan variasinya) tidak muncul lagi di kebijakan, surat, atau
  teks app mana pun. Cari di seluruh repo teks yang tampil ke siswa
  (termasuk layar Ngobrol) dan laporkan temuannya.

## Di luar task ini
- Menaikkan versi kebijakan di konfigurasi (setelah app dirilis).
- Pengiriman surat ke sekolah, penentuan format tanda tangan, tinjauan hukum.

## Definition of Done

- [ ] Kebijakan privasi v2 (DRAF) menggambarkan perilaku sebenarnya, tanpa klaim yang tidak terbukti
- [ ] Surat orang tua/wali v2 (DRAF) selesai
- [ ] `docs/kebijakan-v2-klaim-vs-kode.md` terisi dan tiap klaim punya status
- [ ] Daftar `[ISI: ...]` lengkap dengan penanggung jawabnya
- [ ] Tidak ada lagi teks "tidak dikirim ke mana pun" di seluruh teks siswa
- [ ] Versi di konfigurasi TIDAK dinaikkan
- [ ] Tes dokumen kebijakan dan `tsc` bersih
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Daftar klaim yang tidak bisa dibuktikan dan bagaimana ditangani
- Daftar `[ISI: ...]` yang menunggu manusia
- Semua tempat lain yang menyebut obrolan tidak dikirim keluar, dan perbaikannya
