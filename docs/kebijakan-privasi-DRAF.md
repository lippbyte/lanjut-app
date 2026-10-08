# Kebijakan Privasi LANJUT

> **DRAF — wajib direview ahli hukum sebelum dipakai.**
> Disusun LANJUT_047 (3 Oktober 2026) sebagai bahan review, bukan dokumen
> yang berlaku. Bagian bertanda `[ISI: ...]` menunggu keputusan Khalifa. Nama
> badan, alamat, kontak, penyedia, dan masa simpan sengaja tidak diisi.

## Catatan untuk peninjau (bukan bagian kebijakan)

- **Untuk siapa teks ini.** Kebijakan ditulis untuk dibaca siswa SMP, SMA,
  SMK, dan MA (banyak yang di bawah 18 tahun), dengan bahasa sehari-hari.
  Surat untuk orang tua atau wali ada terpisah di
  [`surat-persetujuan-ortu-wali-DRAF.md`](surat-persetujuan-ortu-wali-DRAF.md).
- **Teks ini sama persis dengan yang tampil di app.** Bagian "Isi kebijakan"
  di bawah ditulis otomatis dari `LANJUT_App/lib/kebijakan-privasi.json`, yaitu
  sumber teks yang dipakai app (ringkasan di layar Daftar dan halaman
  Kebijakan Privasi). Perubahan dikerjakan di berkas JSON itu, lalu dokumen ini
  diperbarui dengan `npm run dokumen-kebijakan` (folder `LANJUT_App/server`).
  Tes menolak bila keduanya berbeda.
- **Versi.** Setiap persetujuan dicatat bersama nomor versi kebijakan.
  Menaikkan versi = teks baru di JSON + migrasi server yang menaikkan
  `persetujuan_versi_kebijakan`. Persetujuan untuk versi lama tidak membuka
  fitur AI.
- **Isi data diambil dari kode, bukan perkiraan.** Daftar data di kebijakan
  dicocokkan dengan skema basis data dan kode app per 3 Oktober 2026 (Lampiran
  A). Kalau ada fitur baru yang menyimpan data, kebijakan dan lampiran ini
  wajib diperbarui.

## Isi kebijakan

<!-- KEBIJAKAN:MULAI -->
**DRAF — belum berlaku. Wajib direview ahli hukum sebelum dipakai.**

**Versi 1**

### Ringkasan (tampil di layar Daftar)

- Kami menyimpan data akunmu (nama pengguna, kelas, jenis sekolah, prodi impian, gaya belajar, dan email kalau kamu isi) dan yang kamu buat di LANJUT (centang Daftar Periksa, kartu, modul yang kamu unggah, dan hasil latihan) supaya kemajuanmu tidak hilang.
- Kata sandimu disimpan dalam bentuk acak, bukan teks aslinya.
- Obrolan di Ngobrol Bareng LANJUT belum dikirim ke mana pun. Fitur AI sungguhan nanti memakai penyedia pihak ketiga yang mungkin berada di luar negeri, dan baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah.
- Kamu dan orang tua atau walimu berhak melihat, membetulkan, dan meminta penghapusan datamu, serta mencabut persetujuan.

### Tentang kebijakan ini

Kebijakan ini menjelaskan data apa yang dikumpulkan LANJUT, untuk apa, siapa yang bisa melihatnya, dan apa hakmu serta hak orang tua atau walimu.

LANJUT dikelola oleh [ISI: nama badan pengelola dan alamatnya].

### Data yang kami simpan di server

- Akun: nama pengguna, nama tampilan, email (kalau kamu isi), dan kata sandi. Kata sandi disimpan dalam bentuk acak (hash), jadi tidak bisa dibaca, termasuk oleh tim LANJUT.
- Jalur belajarmu: kelas, jenis sekolah (SMP, SMA, SMK, atau MA), prodi impian, dan gaya belajar yang kamu pilih.
- Kemajuan: butir Daftar Periksa yang kamu centang, dan butir yang kamu simpan dari Pilih Mapel atau Eksplorasi Tujuan.
- Arsip Belajar: kartu yang kamu tulis (mapel, judul, isi, dan jawaban). Isinya teks bebas, jadi sebaiknya jangan menulis data pribadi di kartu.
- Modul: teks materi pelajaran yang kamu unggah ke Arsip Belajar (dari berkas .txt, .md, atau PDF, atau yang kamu tempel), beserta judul, mapel, nama berkas, dan waktu unggah. Berkas aslinya tidak disimpan, hanya teksnya. Teks itu juga dibelah menjadi potongan supaya bisa kamu cari. Modul bisa kamu hapus permanen kapan saja; teks dan semua potongannya ikut terhapus.
- Latihan: kapan sesi latihan dimulai dan selesai, mapel yang dilatih, kartu yang kamu jawab, benar atau salahnya jawabanmu, dan seberapa yakin kamu (kalau kamu mengisinya).
- Persetujuan: kapan kamu membaca kebijakan ini (dan versinya), serta kapan orang tua atau walimu memberi atau mencabut persetujuan lewat sekolah, termasuk nomor atau tanggal suratnya.
- Keamanan akun: kapan akun dibuat, kapan terakhir kamu masuk, status akun (aktif atau nonaktif), sesi masuk yang masih aktif, dan jumlah percobaan masuk yang gagal (supaya akun bisa dikunci sementara kalau ada yang mencoba menebak kata sandi).
- Catatan teknis server: setiap permintaan ke server mencatat fitur yang dibuka, hasilnya, lama prosesnya, dan ID akunmu (bukan namamu). Alamat IP perangkatmu dipakai sementara untuk membatasi permintaan yang terlalu sering, dan tidak disimpan di basis data. [ISI: berapa lama catatan teknis disimpan oleh server dan penyedianya.]
- Kartu atau butir Daftar Periksa yang kamu hapus disembunyikan dari aplikasi, tetapi saat ini masih tersimpan di server (modul tidak termasuk: modul dihapus permanen). [ISI: kapan data yang dihapus benar-benar dihapus permanen.]

### Data yang hanya ada di HP atau browsermu

- Tanda masuk dan salinan data akunmu, supaya kamu tidak perlu masuk ulang setiap membuka aplikasi.
- Kelas dan jalur yang kamu pilih di Daftar Periksa.
- Obrolan di Ngobrol Bareng LANJUT: hanya ada selama aplikasi terbuka, lalu hilang saat aplikasi ditutup atau kamu keluar. Obrolan ini tidak dikirim ke server LANJUT maupun ke pihak lain.

### Yang tidak kami kumpulkan

- Lokasi, kontak, foto, rekaman suara, nomor HP, nama sekolah, dan nama lengkap aslimu (kecuali kalau kamu sendiri menulisnya sebagai nama tampilan, di kartu, atau di modul).
- Saat ini LANJUT tidak memakai layanan analitik atau iklan dari pihak ketiga.

### Untuk apa datanya dipakai

- Menampilkan isi yang sesuai kelas dan jenis sekolahmu, misalnya jadwal SNBP, SNBT, dan TKA hanya untuk kelas 12.
- Menyimpan kemajuan, kartu, dan hasil latihanmu supaya tidak hilang saat ganti HP.
- Memberi saran mapel dan latihan dari prodi impian dan hasil latihanmu.
- Menjaga keamanan akun.
- [ISI: tujuan lain kalau ada, misalnya penelitian atau laporan ke sekolah. Kalau tidak ada, hapus butir ini.]

### Siapa yang bisa melihat datamu

- Kamu sendiri, lewat aplikasi. Akun lain tidak bisa melihat datamu.
- Tim pengelola LANJUT yang mengurus server. [ISI: siapa saja dan untuk keperluan apa.]
- Penyedia server dan basis data tempat LANJUT berjalan. [ISI: nama penyedia dan lokasi servernya.]
- Sekolah hanya mencatat persetujuan orang tua atau wali ke akunmu. Saat ini tidak ada fitur bagi sekolah atau guru untuk melihat data siswa. [ISI: konfirmasi apakah ini akan berubah.]

### Fitur AI (belum aktif)

Ngobrol Bareng LANJUT sekarang masih versi uji coba: balasannya contoh, bukan dari AI sungguhan.

Nanti, balasan AI sungguhan memakai penyedia AI pihak ketiga [ISI: nama penyedia AI]. Pesan yang kamu tulis, potongan modul di Arsip Belajarmu yang berkaitan dengan pertanyaanmu, dan [ISI: data akun lain yang ikut dikirim, misalnya kelas dan gaya belajar], akan dikirim ke penyedia itu untuk dibuatkan balasan. Penyedia itu kemungkinan memproses datanya di luar negeri [ISI: negara atau wilayahnya, dan dasar pengirimannya].

Fitur AI hanya aktif kalau orang tua atau walimu sudah memberi persetujuan lewat sekolah, dan kamu sudah membaca kebijakan versi yang berlaku. Tanpa itu, data akunmu tidak dikirim ke penyedia AI.

[ISI: apakah isi obrolan dengan AI disimpan, di mana, dan berapa lama.]

### Persetujuan orang tua atau wali

Banyak pengguna LANJUT berusia di bawah 18 tahun. Untuk data anak, persetujuan harus datang dari orang tua atau wali, bukan dari centang di aplikasi.

Orang tua atau wali memberi persetujuan lewat surat yang dibagikan sekolah. Sekolah lalu mencatatnya ke akunmu. Status persetujuannya bisa kamu lihat di Jalur Saya.

[ISI: apakah membuat akun dan memakai fitur dasar juga butuh persetujuan orang tua atau wali lebih dulu. Menunggu keputusan pengelola dan ahli hukum.]

### Hak kamu dan orang tua atau walimu

- Melihat data apa saja yang tersimpan tentangmu.
- Membetulkan data yang salah. Nama tampilan, kelas, jenis sekolah, prodi impian, dan gaya belajar bisa kamu ubah sendiri di Jalur Saya.
- Meminta datamu dihapus. Modul bisa kamu hapus sendiri secara permanen di Arsip Belajar. Untuk data lain, fitur hapus akun di aplikasi belum ada, jadi ajukan lewat kontak di bawah.
- Mencabut persetujuan. Setelah persetujuan orang tua atau wali dicabut, fitur AI langsung tertutup untuk akunmu. Pencabutan diajukan lewat sekolah atau kontak di bawah.
- [ISI: berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.]

### Berapa lama data disimpan

[ISI: masa simpan data akun, data latihan, catatan persetujuan, dan catatan teknis server, serta apa yang terjadi pada data akun yang lama tidak dipakai.]

### Keamanan

Kata sandi dan tanda masuk disimpan dalam bentuk acak (hash). Setiap akun hanya bisa membuka datanya sendiri.

[ISI: perlindungan lain di server yang dipakai sungguhan, misalnya koneksi terenkripsi (HTTPS) dan pencadangan.]

### Perubahan kebijakan

Kalau kebijakan ini berubah, nomor versinya naik. Persetujuan untuk versi lama tidak dianggap berlaku untuk fitur yang membutuhkan versi baru, termasuk fitur AI.

[ISI: cara memberi tahu pengguna dan orang tua atau wali saat kebijakan berubah.]

### Kontak

[ISI: nama pengelola, alamat, email, dan nomor yang bisa dihubungi, termasuk petugas pelindungan data pribadi bila ada.]
<!-- KEBIJAKAN:SELESAI -->

## Lampiran A — Inventaris data teknis (untuk peninjau)

Sumber: migrasi `LANJUT_App/server/src/db/migrasi/001`–`012` dan kode app.
"Siswa" = pemilik akun.

### Di server (basis data MySQL)

| Data | Tabel dan kolom | Diisi oleh / kapan | Catatan |
|---|---|---|---|
| Nama pengguna | `pengguna.nama_pengguna` | Siswa, saat daftar | Wajib, unik. Juga tercatat di `percobaan_masuk` saat masuk gagal. |
| Nama tampilan | `pengguna.nama_tampilan` | Siswa, di Jalur Saya | Opsional. Form Daftar app tidak menanyakannya. |
| Email | `pengguna.email` | Siswa, saat daftar | Opsional, unik. |
| Kata sandi | `pengguna.kata_sandi_hash` | Siswa, saat daftar / ubah sandi | Hash bcrypt (cost 12), bukan teks asli. |
| Peran & status akun | `pengguna.peran`, `pengguna.status` | Server | `siswa`/`tim`; `aktif`/`nonaktif`. |
| Kelas | `pengguna.kelas` | Siswa: daftar, gerbang isi kelas, Jalur Saya | Kelas 7–12. Wajib di form Daftar app. |
| Jenis sekolah | `pengguna.jenis_sekolah` | Siswa (kelas 10–12); server mengisi SMP untuk kelas 7–9 | SMP/SMA/SMK/MA. |
| Prodi impian | `pengguna.prodi_tujuan` | Siswa: daftar, Jalur Saya | Opsional ("belum"). |
| Gaya belajar | `pengguna.gaya_belajar` | Siswa, layar Gaya Belajar | Opsional. |
| Waktu akun | `pengguna.dibuat_pada`, `terakhir_masuk_pada` | Server | |
| Setel ulang sandi oleh tim | `pengguna.disetel_ulang_oleh`, `disetel_ulang_pada` | — | Kolom ada di skema, **belum diisi kode mana pun**. Tidak disebut di kebijakan sampai fiturnya ada. |
| Sesi masuk | `sesi_pengguna` (token_hash, dibuat/kedaluwarsa/terakhir_dipakai/dicabut_pada, perangkat) | Server, saat masuk | Token disimpan sebagai hash SHA-256. Kolom `perangkat` saat ini selalu kosong. Umur sesi 90 hari (bawaan). |
| Percobaan masuk gagal | `percobaan_masuk` (nama_pengguna, jumlah_gagal, terkunci_sampai, terakhir_gagal_pada) | Server | Dicatat juga untuk nama yang tidak terdaftar. |
| Centang Daftar Periksa | `kemajuan` (butir_id, selesai_pada) | Siswa | |
| Butir Daftar Periksa milik akun | `butir_pribadi` (jenis, prodi_id, judul, selesai/dibuat/diubah/dihapus_pada) | Siswa, dari Pilih Mapel & Eksplorasi Tujuan | Hapus lunak: baris tetap ada, `dihapus_pada` terisi. |
| Kartu Arsip Belajar | `kartu` (mapel_id, judul, isi, jawaban, dibuat/diubah/dihapus_pada) | Siswa | Teks bebas. Hapus lunak. |
| Modul (materi unggahan) | `modul` (mapel_id, judul, isi = teks hasil ekstraksi, jumlah_karakter, jenis txt/md/pdf/tempel, nama_berkas, diunggah_pada) | Siswa (LANJUT_049) | Berkas asli **tidak** disimpan (diterima di memori, diekstrak, dibuang). Teks bisa memuat apa pun yang ada di materi. **Hapus permanen**, bukan hapus lunak. |
| Potongan modul | `potongan_modul` (modul_id, urutan, isi ±800–1.200 karakter) + indeks FULLTEXT | Server, dari teks modul | Untuk pencarian di modul sendiri. Ikut terhapus permanen bersama modulnya; indeks FULLTEXT dirapikan (`OPTIMIZE TABLE`) ±30 detik sesudah penghapusan supaya kata dari modul yang dihapus tidak tertinggal di berkas indeks. |
| Sesi latihan | `sesi_latihan` (dimulai/selesai_pada, jumlah kartu, mapel fokus, asal) | Siswa | |
| Riwayat latihan | `riwayat_latihan` (kartu_id, benar, dijawab_pada, sesi_id, keyakinan, mapel_id, gap_numerik, kelas_gap, aturan_versi) | Siswa; dua kolom terakhir dihitung server | `keyakinan` hanya terisi dari data tamu PWA lama; app Expo tidak menanyakannya. |
| Persetujuan | `persetujuan` (jenis, versi, status, sumber, catatan, dicatat_pada) | Siswa (kebijakan, `mandiri`); petugas lewat skrip `persetujuan-ortu` (orang tua/wali, `surat_sekolah`/`admin`) | Riwayat tidak ditimpa; `catatan` berisi nomor/tanggal surat. |

Server juga punya endpoint klaim data tamu (`POST /sinkron/klaim`) untuk
memindahkan data PWA yang tersimpan di perangkat ke akun. App Expo saat ini
tidak memakainya.

### Di luar basis data

| Data | Tempat | Catatan |
|---|---|---|
| Log permintaan | Keluaran konsol server | Metode, alamat endpoint, kode status, lama proses, dan ID akun. Tidak ada alamat IP, isi permintaan, atau nama. Masa simpan tergantung penyedia server. |
| Alamat IP | Memori proses server (pembatas laju `express-rate-limit`) | Tidak ditulis ke basis data. Hilang setelah jendela 15–60 menit atau saat server dinyalakan ulang. |
| Token & salinan profil | Perangkat siswa (AsyncStorage; `localStorage` di web) | Kunci `auth_token`, `auth_pengguna`. |
| Kelas & jalur Daftar Periksa | Perangkat siswa | Kunci `lanjut.profil.lokal.v1:<id akun>`. |
| Riwayat Ngobrol | Memori app saja | Tidak dikirim ke server, tidak ditulis ke perangkat. |

### Yang tidak dikumpulkan app

Lokasi, kontak, kamera/foto, mikrofon, nomor HP, tanggal lahir/usia, nama
sekolah, dan nama lengkap (kecuali siswa menulisnya sendiri). App tidak
memakai SDK analitik, iklan, atau pelaporan galat pihak ketiga (dependensi
`LANJUT_App/package.json` per 3 Oktober 2026). Huruf Poppins dibundel di app,
tidak diunduh dari Google saat app berjalan.

## Lampiran B — Bagian `[ISI: ...]` yang menunggu keputusan

<!-- ISI:MULAI -->
17 bagian menunggu keputusan Khalifa:

1. **Tentang kebijakan ini** — nama badan pengelola dan alamatnya
2. **Data yang kami simpan di server** — berapa lama catatan teknis disimpan oleh server dan penyedianya.
3. **Data yang kami simpan di server** — kapan data yang dihapus benar-benar dihapus permanen.
4. **Untuk apa datanya dipakai** — tujuan lain kalau ada, misalnya penelitian atau laporan ke sekolah. Kalau tidak ada, hapus butir ini.
5. **Siapa yang bisa melihat datamu** — siapa saja dan untuk keperluan apa.
6. **Siapa yang bisa melihat datamu** — nama penyedia dan lokasi servernya.
7. **Siapa yang bisa melihat datamu** — konfirmasi apakah ini akan berubah.
8. **Fitur AI (belum aktif)** — nama penyedia AI
9. **Fitur AI (belum aktif)** — data akun lain yang ikut dikirim, misalnya kelas dan gaya belajar
10. **Fitur AI (belum aktif)** — negara atau wilayahnya, dan dasar pengirimannya
11. **Fitur AI (belum aktif)** — apakah isi obrolan dengan AI disimpan, di mana, dan berapa lama.
12. **Persetujuan orang tua atau wali** — apakah membuat akun dan memakai fitur dasar juga butuh persetujuan orang tua atau wali lebih dulu. Menunggu keputusan pengelola dan ahli hukum.
13. **Hak kamu dan orang tua atau walimu** — berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.
14. **Berapa lama data disimpan** — masa simpan data akun, data latihan, catatan persetujuan, dan catatan teknis server, serta apa yang terjadi pada data akun yang lama tidak dipakai.
15. **Keamanan** — perlindungan lain di server yang dipakai sungguhan, misalnya koneksi terenkripsi (HTTPS) dan pencadangan.
16. **Perubahan kebijakan** — cara memberi tahu pengguna dan orang tua atau wali saat kebijakan berubah.
17. **Kontak** — nama pengelola, alamat, email, dan nomor yang bisa dihubungi, termasuk petugas pelindungan data pribadi bila ada.
<!-- ISI:SELESAI -->

## Lampiran C — Pertanyaan terbuka untuk Khalifa dan ahli hukum

1. **Akun dasar tanpa persetujuan orang tua/wali.** Pendaftaran dan fitur
   dasar (Linimasa, Daftar Periksa, Arsip, Latihan) sudah memproses data anak
   tanpa persetujuan orang tua/wali. Yang dipagari baru fitur AI. Perlukah
   persetujuan untuk fitur dasar juga, dan sejak kapan?
2. **Usia tidak diketahui.** App tidak menanyakan usia atau tanggal lahir,
   jadi gerbang AI meminta persetujuan orang tua/wali untuk **semua** akun,
   termasuk siswa yang sudah 18 tahun. Perlukah aturan berbeda untuk siswa
   dewasa?
3. **Bukti persetujuan.** Surat dikumpulkan sekolah; LANJUT hanya mencatat
   nomor/tanggal surat. Siapa yang menyimpan surat aslinya, berapa lama, dan
   bagaimana memastikan tanda tangan benar dari orang tua/wali?
4. **Riwayat persetujuan saat akun dihapus.** Saat ini catatan persetujuan
   ikut terhapus bila akunnya dihapus (`ON DELETE CASCADE`). Apakah bukti
   persetujuan/pencabutan perlu disimpan lebih lama?
5. **Hapus lunak.** Kartu dan butir yang dihapus siswa masih tersimpan.
   Perlukah penghapusan permanen, dan kapan?
6. **Pengiriman ke luar negeri.** Fitur AI nanti mengirim pesan siswa ke
   penyedia AI pihak ketiga yang kemungkinan memproses di luar negeri. Dasar
   dan syarat pengirimannya perlu ditetapkan sebelum fitur AI aktif.
7. **Kalimat data pribadi di form Daftar** (salinan teks §4.10, disetujui
   28 Sep 2026) belum menyebut jenis sekolah, gaya belajar, kartu, hasil
   latihan, dan modul. Kalimat itu tidak diubah di LANJUT_047/049; perlu
   ditinjau ulang bersama kebijakan ini.
8. **Modul unggahan (LANJUT_049).** Siswa bisa mengunggah materi apa pun
   sebagai teks. Peringatan di formulir meminta tidak mengunggah data pribadi
   dan hanya materi yang boleh dipakai untuk belajar pribadi, tetapi isinya
   tidak diperiksa. Perlu diputuskan: (a) tanggung jawab bila materi
   melanggar hak cipta; (b) apakah data pribadi orang lain yang terbawa di
   materi diperlakukan khusus; (c) masa simpan modul bila akun lama tidak
   dipakai.
9. **Modul dan fitur AI.** Kebijakan ini sudah menyebut bahwa potongan modul
   yang berkaitan dengan pertanyaan akan dikirim ke penyedia AI saat fitur AI
   aktif (sesuai spek AI, Keputusan 1). Rincian data yang dikirim tetap
   `[ISI]` sampai backend AI dirancang.
10. **Versi kebijakan.** Penambahan data modul mengubah isi kebijakan, tetapi
    versinya **sengaja belum dinaikkan** (masih 1) di LANJUT_049. Karena
    seluruh teks masih DRAF dan belum berlaku, keputusan menaikkan versi ada
    di Khalifa. Bila dinaikkan: rilis app dengan teks baru dulu, baru naikkan
    `persetujuan_versi_kebijakan` lewat migrasi.
11. **Fitur AI sudah dibangun (LANJUT_051), teks kebijakan belum diubah.**
    Bagian "Fitur AI (belum aktif)" dan Ringkasan 3 sekarang **tidak sesuai**
    dengan kode untuk akun yang lolos gerbang. Fakta teknis untuk mengisi
    `[ISI]` di atas:
    - **Penyedia:** OpenRouter (perantara), yang meneruskan ke penyedia model;
      model bawaan `anthropic/claude-sonnet-5.5` (Anthropic). Keduanya
      perusahaan Amerika Serikat; lokasi pemrosesan mengikuti mereka.
    - **Yang dikirim:** pesan siswa dan balasan AI di sesi itu (maks. 20 pesan
      terakhir), ditambah kelas, jenis sekolah, nama prodi impian, dan gaya
      belajar. **Tidak dikirim:** nama, nama pengguna, email, id akun. Potongan
      modul belum dikirim (belum dibangun).
    - **Penyimpanan:** server LANJUT tidak menyimpan isi obrolan dan tidak
      mencatatnya di log; obrolan hilang saat app ditutup. Permintaan memakai
      `data_collection: deny` (OpenRouter hanya memilih penyedia yang tidak
      memakai data untuk pelatihan). Masa simpan di sisi OpenRouter dan
      penyedia model mengikuti kebijakan mereka dan perlu dicek.
    - **Gerbang:** AI hanya jalan untuk akun dengan persetujuan orang tua/wali
      tercatat dan kebijakan diterima. Selama belum ada persetujuan
      sungguhan, tidak ada siswa yang terkena.

    - **Pembaruan LANJUT_053:** sebelum dikirim, nomor telepon, email, dan
      16 angka mirip NIK di pesan dan riwayat diganti `[disamarkan]`. Pesan
      yang memuat tanda bahaya akut tidak dikirim ke AI sama sekali; server
      menjawab dengan kartu layanan bantuan. Log hanya mencatat tingkat
      tanda bahaya dan waktunya, tanpa isi pesan. Model dan pengaturan
      penyedia (`data_collection`, `zdr`, `only`) bisa diubah di konfigurasi.

    Sebelum mencatat persetujuan orang tua/wali sungguhan: perbarui teks
    kebijakan dan surat orang tua/wali, lalu naikkan versi (lihat butir 10).
12. **Materi, modul, dan pencarian web (LANJUT_055).** Rincian alur data ada
    di `docs/alur-data-ai-materi.md`. Perlu diputuskan:
    - **(a) Hak cipta modul.** Untuk pertanyaan materi, hingga 3 potongan
      modul siswa (±800–1.200 karakter per potongan) dikirim ke penyedia AI
      di luar negeri. Modul bisa berupa materi dari guru atau penerbit.
      Bolehkah dikirim? Perlukah izin, atau pembatasan jenis modul? Saklar
      `ai_modul_aktif` bisa mematikannya.
    - **(b) Batas harian pencarian web.** Bawaannya 10 per akun per hari
      (`ai_web_batas_harian`), dengan `ai_web_aktif` mati sampai
      dinyalakan. Berapa angka akhirnya?
    - **(c) Biaya per pertanyaan.** Perkiraan tanpa web ±US$0,01–0,02, dengan
      web ±US$0,02–0,04, ditambah biaya pencarian bawaan penyedia yang perlu
      dicek. Siapa yang menanggung, dan berapa batas kredit bulanannya?
    - **(d) Mesin pencari pihak ketiga.** Saat web aktif, pertanyaan siswa
      (disamarkan, tanpa profil dan riwayat) dikirim ke mesin pencari lewat
      OpenRouter: Exa, atau pencarian bawaan penyedia model. Ini perlu
      disebut di kebijakan v2.
