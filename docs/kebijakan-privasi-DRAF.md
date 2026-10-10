# Kebijakan Privasi LANJUT

> **DRAF — wajib direview ahli hukum sebelum dipakai.**
> Disusun LANJUT_047 (3 Oktober 2026), diperbarui menjadi **draf v2** di
> LANJUT_056 (8 Oktober 2026) karena fitur AI, modul, dan pencarian web sudah
> dibangun. Bahan review, bukan dokumen yang berlaku, dan bukan nasihat hukum:
> tetap perlu ditinjau orang yang paham UU PDP. Bagian bertanda `[ISI: ...]`
> menunggu diisi; siapa pengisinya ada di
> [`kebijakan-v2-klaim-vs-kode.md`](kebijakan-v2-klaim-vs-kode.md). Nama
> badan, alamat, kontak, negara pemrosesan, dan masa simpan sengaja tidak
> diisi.

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
- **Isi v2, nomor versi masih 1.** Teks di bawah adalah draf v2, tetapi
  `versi` di JSON **sengaja belum dinaikkan** (LANJUT_056 hanya teks). App
  mengirim nomor versinya saat daftar, dan server menolak nomor yang tidak
  sama dengan `persetujuan_versi_kebijakan`; menaikkan salah satunya saja
  membuat pendaftaran gagal. Urutan rilis: app dengan teks ini dirilis dulu,
  lalu nomor di JSON dan di server dinaikkan bersama (migrasi baru), lalu
  surat orang tua/wali diisi nomor versi itu.
- **Isi data diambil dari kode, bukan perkiraan.** Daftar data di kebijakan
  dicocokkan dengan skema basis data dan kode app per 8 Oktober 2026 (Lampiran
  A). Setiap klaim tentang data punya bukti berkas:baris atau tes di
  [`kebijakan-v2-klaim-vs-kode.md`](kebijakan-v2-klaim-vs-kode.md). Kalau ada
  fitur baru yang menyimpan atau mengirim data, kebijakan, lampiran ini, dan
  tabel klaim wajib diperbarui.

## Isi kebijakan

<!-- KEBIJAKAN:MULAI -->
**DRAF — belum berlaku. Wajib direview ahli hukum sebelum dipakai.**

**Versi 1**

### Ringkasan (tampil di layar Daftar)

- Kami menyimpan data akunmu (nama pengguna, kelas, jenis sekolah, prodi impian, gaya belajar, dan email kalau kamu isi) dan yang kamu buat di LANJUT (centang Daftar Periksa, kartu, modul yang kamu unggah, dan hasil latihan) supaya kemajuanmu tidak hilang.
- Kata sandimu disimpan dalam bentuk acak, bukan teks aslinya.
- Fitur AI di Ngobrol Bareng LANJUT mengirim pesanmu, riwayat obrolan, dan profil belajarmu (kelas, jenis sekolah, prodi impian, gaya belajar) ke penyedia AI pihak ketiga yang dapat memproses data di luar Indonesia. Untuk pertanyaan pelajaran, potongan modulmu yang berkaitan bisa ikut dikirim. Nama, nama pengguna, dan email dari akunmu tidak ikut dikirim, dan isi obrolan tidak disimpan di server LANJUT. Fitur AI baru aktif setelah orang tua atau walimu memberi persetujuan lewat sekolah.
- Kamu dan orang tua atau walimu berhak melihat, membetulkan, dan meminta penghapusan datamu, serta mencabut persetujuan.

### Tentang kebijakan ini

Kebijakan ini menjelaskan data apa yang dikumpulkan LANJUT, untuk apa, ke mana data itu dikirim, siapa yang bisa melihatnya, dan apa hakmu serta hak orang tua atau walimu.

LANJUT dikelola oleh [ISI: nama badan pengelola dan alamatnya].

### Data yang kami simpan di server

- Akun: nama pengguna, nama tampilan, email (kalau kamu isi), dan kata sandi. Kata sandi disimpan dalam bentuk acak (hash), jadi tidak bisa dibaca, termasuk oleh tim LANJUT.
- Jalur belajarmu: kelas, jenis sekolah (SMP, SMA, SMK, atau MA), prodi impian, dan gaya belajar yang kamu pilih.
- Kemajuan: butir Daftar Periksa yang kamu centang, dan butir yang kamu simpan dari Pilih Mapel atau Eksplorasi Tujuan.
- Arsip Belajar: kartu yang kamu tulis (mapel, judul, isi, dan jawaban). Isinya teks bebas, jadi sebaiknya jangan menulis data pribadi di kartu.
- Modul: teks materi pelajaran yang kamu unggah ke Arsip Belajar (dari berkas .txt, .md, atau PDF, atau yang kamu tempel), beserta judul, mapel, nama berkas, dan waktu unggah. Berkas aslinya tidak disimpan, hanya teksnya. Teks itu juga dibelah menjadi potongan supaya bisa kamu cari dan supaya potongan yang berkaitan bisa dipakai fitur AI. Modul bisa kamu hapus permanen kapan saja; teks dan semua potongannya ikut terhapus.
- Latihan: kapan sesi latihan dimulai dan selesai, mapel yang dilatih, kartu yang kamu jawab, benar atau salahnya jawabanmu, dan seberapa yakin kamu (kalau kamu mengisinya).
- Persetujuan: kapan kamu membaca kebijakan ini (dan versinya), serta kapan orang tua atau walimu memberi atau mencabut persetujuan lewat sekolah, termasuk nomor atau tanggal suratnya.
- Keamanan akun: kapan akun dibuat, kapan terakhir kamu masuk, status akun (aktif atau nonaktif), sesi masuk yang masih aktif, dan jumlah percobaan masuk yang gagal (supaya akun bisa dikunci sementara kalau ada yang mencoba menebak kata sandi).
- Catatan teknis server: setiap permintaan ke server mencatat fitur yang dibuka, hasilnya, lama prosesnya, dan ID akunmu (bukan namamu). Alamat IP perangkatmu dipakai sementara untuk membatasi permintaan yang terlalu sering, dan tidak disimpan di basis data. [ISI: berapa lama catatan teknis disimpan oleh server dan penyedianya.]
- Kartu atau butir Daftar Periksa yang kamu hapus disembunyikan dari aplikasi, tetapi saat ini masih tersimpan di server (modul tidak termasuk: modul dihapus permanen). [ISI: kapan data yang dihapus benar-benar dihapus permanen.]

### Data yang hanya ada di HP atau browsermu

- Tanda masuk dan salinan data akunmu, supaya kamu tidak perlu masuk ulang setiap membuka aplikasi.
- Kelas dan jalur yang kamu pilih di Daftar Periksa.
- Riwayat obrolan di Ngobrol Bareng LANJUT: hanya ada di memori aplikasi selama aplikasi terbuka, lalu hilang saat aplikasi ditutup, kamu keluar, atau berganti akun. Riwayat ini tidak disimpan di HP-mu maupun di server LANJUT. Tetapi setiap kali kamu mengirim pesan, riwayat ini ikut dikirim ke penyedia AI (lihat bagian Fitur AI).

### Yang tidak kami kumpulkan

- Lokasi, kontak, foto, rekaman suara, nomor HP, tanggal lahir atau usia, nama sekolah, dan nama lengkap aslimu (kecuali kalau kamu sendiri menulisnya sebagai nama tampilan, di kartu, di modul, atau di pesan Ngobrol).
- Saat ini LANJUT tidak memakai layanan analitik atau iklan dari pihak ketiga.

### Untuk apa datanya dipakai

- Menampilkan isi yang sesuai kelas dan jenis sekolahmu, misalnya jadwal SNBP, SNBT, dan TKA hanya untuk kelas 12.
- Menyimpan kemajuan, kartu, dan hasil latihanmu supaya tidak hilang saat ganti HP.
- Memberi saran mapel dan latihan dari prodi impian dan hasil latihanmu.
- Menjawab pesanmu di Ngobrol Bareng LANJUT lewat penyedia AI (lihat bagian Fitur AI).
- Menjaga keamanan akun.
- [ISI: tujuan lain kalau ada, misalnya penelitian atau laporan ke sekolah. Kalau tidak ada, hapus butir ini.]

### Siapa yang bisa melihat datamu

- Kamu sendiri, lewat aplikasi. Akun lain tidak bisa melihat datamu, termasuk modulmu.
- Tim pengelola LANJUT yang mengurus server. [ISI: siapa saja dan untuk keperluan apa.]
- Penyedia server dan basis data tempat LANJUT berjalan. [ISI: nama penyedia dan lokasi servernya.]
- Penyedia AI pihak ketiga, tetapi hanya data yang dikirim untuk fitur AI (lihat bagian Fitur AI).
- Sekolah hanya mencatat persetujuan orang tua atau wali ke akunmu. Saat ini tidak ada fitur bagi sekolah atau guru untuk melihat data siswa. [ISI: konfirmasi apakah ini akan berubah.]

### Fitur AI: siapa penyedianya

Balasan di Ngobrol Bareng LANJUT dibuat oleh AI, bukan oleh manusia, dan bisa keliru.

Untuk membuat balasan itu, server LANJUT mengirim data ke OpenRouter, layanan perantara pihak ketiga yang meneruskan permintaan ke perusahaan yang menjalankan model AI. Model AI yang dipakai saat ini buatan Anthropic. Perusahaan yang menjalankan model itu dipilih oleh OpenRouter, dan pilihan ini bisa dibatasi lewat pengaturan di server LANJUT. [ISI: penyedia model yang benar-benar menerima data menurut pengaturan di server, dan lokasinya.]

Penyedia AI itu dapat memproses datamu di luar Indonesia. [ISI: negara atau wilayah pemrosesan, dan dasar pengirimannya ke luar negeri.]

Kami mengirim data ke penyedia AI hanya untuk dibuatkan balasan atas pesanmu.

### Fitur AI: apa yang dikirim

Setiap kali kamu mengirim pesan di Ngobrol Bareng LANJUT, yang dikirim ke penyedia AI adalah:

- Pesan terbarumu, setelah sebagian data pribadi disamarkan (lihat bagian berikut).
- Riwayat obrolan di sesi itu, hingga 20 pesan terakhir, termasuk balasan sebelumnya. Riwayat juga disamarkan dulu. Salam pembuka yang memuat nama tampilanmu tidak ikut dikirim.
- Profil belajarmu dari akun: kelas, jenis sekolah, nama prodi impian, dan gaya belajar (kalau sudah kamu isi).
- Untuk pertanyaan materi pelajaran: potongan modul yang berkaitan, dan hasil pencarian web bila fitur itu diaktifkan (lihat bagian Pertanyaan pelajaran).

### Fitur AI: apa yang tidak dikirim

- Nama tampilan, nama pengguna, email, kata sandi, dan ID akunmu.
- Nama sekolahmu, karena LANJUT memang tidak menyimpannya.
- Data lain di akunmu, seperti kartu, hasil latihan, dan centang Daftar Periksa.
- Tetapi apa pun yang kamu tulis sendiri di pesan ikut terkirim, termasuk nama, alamat, atau nama sekolah, kecuali bagian yang disamarkan. Karena itu, jangan menulis data pribadimu atau data orang lain di Ngobrol.

### Data pribadi disamarkan

Sebelum dikirim, server LANJUT mengganti nomor telepon, alamat email, dan deretan 16 angka seperti NIK dengan tulisan [disamarkan]. Ini berlaku untuk pesanmu, riwayat obrolan, potongan modul, dan hasil pencarian web. Kalau ada yang disamarkan di pesanmu, aplikasi memberi tahu kamu.

Penyamaran ini otomatis dan tidak sempurna. Nama, alamat rumah, nama sekolah, dan data pribadi lain yang bukan nomor atau email tidak disamarkan.

### Pertanyaan pelajaran: modul dan pencarian web

- Kalau pesanmu dikenali sebagai pertanyaan materi pelajaran, server mencari potongan yang berkaitan di modul milikmu sendiri. Saat ini paling banyak 3 potongan, masing-masing sekitar 800–1.200 karakter, ikut dikirim ke penyedia AI setelah disamarkan. Modul milik akun lain tidak pernah dipakai. [ISI: aturan untuk modul dari guru atau penerbit (hak cipta) yang potongannya dikirim ke penyedia AI.]
- Pencarian web, berlaku bila fitur ini diaktifkan (bawaannya mati): untuk pertanyaan materi, server mengirim permintaan terpisah yang hanya berisi pertanyaan terbarumu yang sudah disamarkan, tanpa profil, riwayat, atau modul. OpenRouter meneruskannya ke mesin pencari pihak ketiga. Ada batas jumlah pencarian web per akun per hari. [ISI: hasil pengecekan Khalifa: mesin pencari mana yang menerima pertanyaan, dan apakah permintaan agar data tidak dikumpulkan juga berlaku di sana.]
- Tautan sumber web di bawah jawaban membuka situs pihak ketiga di luar LANJUT. Kebijakan ini tidak berlaku di situs itu.
- Obrolan biasa dan pertanyaan tentang jalur masuk kuliah tidak memakai modul maupun pencarian web.

### Apa yang disimpan dari obrolanmu

- Server LANJUT tidak menyimpan isi obrolan, potongan modul yang dikirim, maupun pertanyaan pencarian web, dan tidak mencatatnya di catatan teknis server.
- Yang tercatat di catatan teknis server hanya: permintaan ke Ngobrol (seperti fitur lain: hasil, lama proses, dan ID akun), jumlah potongan modul dan hasil web yang dipakai, jenis gangguan bila penyedia AI gagal, serta tingkat tanda bahaya beserta waktunya, tanpa isi pesan.
- Untuk membatasi pemakaian, server menghitung jumlah pesan dan pencarian web per akun. Hitungan ini hanya ada di memori server dan hilang saat server dinyalakan ulang.
- Untuk memantau biaya dan keselamatan, server menyimpan hitungan harian gabungan untuk semua pengguna, misalnya jumlah permintaan ke penyedia AI, jumlah token, jumlah tanda bahaya, dan jumlah gangguan. Hitungan ini tidak memuat ID akun maupun isi pesan.
- Di sisi penyedia AI: kami meminta OpenRouter hanya memakai penyedia model yang tidak mengumpulkan data pengguna (pengaturan data_collection: deny). Apa yang tetap disimpan OpenRouter dan penyedia model, dan berapa lama, mengikuti kebijakan mereka. [ISI: hasil pengecekan Khalifa terhadap kebijakan OpenRouter dan penyedia model: apa yang disimpan dan berapa lama.]

### Keselamatan

Server LANJUT memeriksa setiap pesan terbarumu untuk tanda bahaya, misalnya keinginan menyakiti diri atau mengalami kekerasan. Pemeriksaan ini dilakukan di server LANJUT, bukan oleh penyedia AI.

Kalau tanda bahayanya serius, pesan itu tidak diteruskan ke penyedia AI. Server langsung membalas dengan pesan tetap dan kartu layanan bantuan yang sudah dicek, juga saat fitur AI sedang dimatikan. Kalau kamu lalu melanjutkan obrolan, isi pesan itu tetap tidak ikut terkirim: setiap kali riwayat obrolan dikirim ke penyedia AI, server memeriksa ulang pesan-pesanmu, dan pesan yang tanda bahayanya serius diganti catatan singkat dari aplikasi bahwa kamu menyampaikan hal yang sangat berat dan kartu bantuan sudah ditampilkan. Balasan aplikasi untuk pesan itu tetap ada di riwayat.

Untuk tanda tekanan yang lebih ringan, misalnya cemas atau capek belajar, pesan tetap dikirim ke penyedia AI, disertai catatan dari aplikasi agar AI menanggapi perasaanmu lebih dulu. AI juga bisa menilai bahwa kamu mungkin butuh bantuan; aplikasi lalu menampilkan kartu layanan bantuan.

Daftar tanda bahaya masih draf yang menunggu tinjauan guru BK, dan daftar kartu bantuan juga masih draf. Pemeriksaan otomatis bisa keliru. Kalau kamu dalam bahaya, segera hubungi orang dewasa yang kamu percaya.

### Fitur AI bisa dimatikan dan ada batasnya

- Tim LANJUT bisa mematikan fitur AI kapan saja. Selama mati, Ngobrol membalas dengan pesan uji coba yang ditandai, dan pesanmu tidak dikirim ke penyedia AI.
- Pemakaian modul dan pencarian web juga bisa dimatikan secara terpisah.
- Ada batas jumlah pesan per akun dalam 5 menit dan dalam 24 jam, serta batas pencarian web per akun per hari.

### Persetujuan orang tua atau wali

Banyak pengguna LANJUT berusia di bawah 18 tahun. Untuk data anak, persetujuan harus datang dari orang tua atau wali, bukan dari centang di aplikasi.

Orang tua atau wali memberi persetujuan lewat surat yang dibagikan sekolah. Setelah surat dikumpulkan, persetujuan itu dicatat ke akunmu. Statusnya bisa kamu lihat di Jalur Saya.

Fitur AI hanya aktif kalau persetujuan orang tua atau wali sudah tercatat dan tidak dicabut, dan kamu sudah menerima kebijakan privasi versi yang berlaku. Karena LANJUT tidak menanyakan usia, aturan ini berlaku untuk semua akun.

Tanpa persetujuan itu, layar Ngobrol terkunci dan tidak ada data akunmu yang dikirim ke penyedia AI. Fitur LANJUT lainnya tetap bisa kamu pakai.

[ISI: apakah akun dasar (tanpa AI) juga butuh persetujuan orang tua atau wali; menunggu tinjauan hukum.]

### Hak kamu dan orang tua atau walimu

- Melihat data apa saja yang tersimpan tentangmu.
- Membetulkan data yang salah. Nama tampilan, kelas, jenis sekolah, prodi impian, dan gaya belajar bisa kamu ubah sendiri di Jalur Saya.
- Meminta datamu dihapus. Modul bisa kamu hapus sendiri secara permanen di Arsip Belajar, satu per satu atau semuanya sekaligus. Untuk data lain, fitur hapus akun di aplikasi belum ada, jadi ajukan lewat kontak di bawah.
- Isi obrolan tidak perlu dihapus dari server LANJUT karena memang tidak disimpan di sana. Untuk data yang sudah dikirim ke penyedia AI: [ISI: cara meminta penghapusan di OpenRouter dan penyedia model, bila ada.]
- Mencabut persetujuan. Orang tua atau wali cukup memberi tahu sekolah atau kontak di bawah bahwa persetujuannya dicabut. Setelah pencabutan dicatat, fitur AI tertutup untuk akunmu mulai pesan berikutnya, dan fitur lain tetap bisa dipakai. Pencabutan tidak menghapus data yang sudah pernah dikirim ke penyedia AI.
- [ISI: berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.]

### Berapa lama data disimpan

[ISI: masa simpan data akun, data latihan, catatan persetujuan, dan catatan teknis server, serta apa yang terjadi pada data akun yang lama tidak dipakai.]

[ISI: masa simpan modul bila akunnya lama tidak dipakai.]

### Keamanan

Kata sandi dan tanda masuk disimpan dalam bentuk acak (hash). Setiap akun hanya bisa membuka datanya sendiri.

Data untuk fitur AI dikirim ke penyedia AI oleh server LANJUT, bukan langsung dari HP-mu, lewat koneksi terenkripsi (HTTPS). Kunci akses ke penyedia AI hanya ada di server.

[ISI: perlindungan lain di server yang dipakai sungguhan, misalnya koneksi terenkripsi (HTTPS) antara aplikasi dan server, dan pencadangan.]

### Perubahan kebijakan

Kalau kebijakan ini berubah, nomor versinya naik. Persetujuan untuk versi lama tidak dianggap berlaku untuk fitur yang membutuhkan versi baru, termasuk fitur AI.

Saat versinya naik, aplikasi memintamu membaca ringkasan versi baru lalu menerimanya. Kamu boleh memilih "Nanti saja" dan tetap memakai fitur lain, tetapi fitur AI tertutup sampai kamu menerima versi yang berlaku.

Sistem juga bisa mewajibkan persetujuan orang tua atau wali yang baru setelah kebijakan berubah. [ISI: kapan persetujuan orang tua atau wali perlu diminta ulang saat kebijakan berubah.]

[ISI: cara memberi tahu pengguna dan orang tua atau wali saat kebijakan berubah.]

### Kontak

[ISI: kontak resmi tim LANJUT: nama pengelola, alamat, email, dan nomor yang bisa dihubungi, termasuk petugas pelindungan data pribadi bila ada.]
<!-- KEBIJAKAN:SELESAI -->

## Lampiran A — Inventaris data teknis (untuk peninjau)

Sumber: migrasi `LANJUT_App/server/src/db/migrasi/001`–`018` dan kode app
(diperbarui LANJUT_056, 8 Oktober 2026; LANJUT_060, 9 Oktober 2026). "Siswa" = pemilik akun. Bukti per
klaim ada di [`kebijakan-v2-klaim-vs-kode.md`](kebijakan-v2-klaim-vs-kode.md).

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
| Riwayat latihan | `riwayat_latihan` (kartu_id, benar, dijawab_pada, sesi_id, keyakinan, mapel_id, gap_numerik, kelas_gap, aturan_versi) | Siswa; dua kolom terakhir dihitung server | `keyakinan` (1–5) terisi bila siswa memilih "Seberapa yakin kamu?" di Latihan (LANJUT_058: yakin 4, ragu 2, tebak 1; boleh dilewati) atau dari data tamu PWA lama. Dipakai Level-In di server; tidak dikirim ke penyedia AI. |
| Persetujuan | `persetujuan` (jenis, versi, status, sumber, catatan, dicatat_pada) | Siswa (kebijakan, `mandiri`); petugas lewat skrip `persetujuan-ortu` (orang tua/wali, `surat_sekolah`/`admin`) | Riwayat tidak ditimpa; `catatan` berisi nomor/tanggal surat. |
| Hitungan pemakaian AI harian | `pemakaian_ai_harian` (tanggal WIB, panggilan_ai, token_masuk, token_keluar, balasan_stub, tanda_akut, tanda_ringan, tanda_model, galat_penyedia, web_dipakai, web_kuota_habis, modul_dipakai) | Server, setiap `POST /ngobrol` (LANJUT_060) | **Bukan data pribadi:** satu baris per tanggal untuk semua pengguna digabung. Tidak ada ID akun, isi pesan, kueri, potongan, atau alamat web. Token diambil dari `usage` jawaban penyedia (0 bila tidak ada). Dibaca tim lewat `npm run pemakaian-ai`. Masa simpan belum ditetapkan (ikut `[ISI]` di bagian "Berapa lama data disimpan"). |

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
| Riwayat Ngobrol | Memori app saja (`providers/ObrolanProvider.tsx`) | Tidak ditulis ke perangkat dan tidak disimpan server. **Dikirim** ke server di setiap `POST /ngobrol` (maks. 20 pesan terakhir) dan diteruskan ke penyedia AI bila akun lolos gerbang (lihat tabel berikut). |
| Log Ngobrol & keselamatan | Keluaran konsol server | `[ngobrol] materi modul=<n> web=<n> [web_habis]`, jenis galat penyedia, `[keselamatan] tingkat=<akut/ringan/model> waktu=<…>`, `[pemakaian] gagal dicatat (<kode galat>)` bila hitungan harian gagal ditulis. Tanpa isi pesan, potongan, kueri, atau alamat web. Baris keselamatan tidak memuat ID akun, tetapi baris log akses permintaan yang sama memuatnya, jadi keduanya bisa dikaitkan lewat waktu. |
| Hitungan batas Ngobrol & kuota web | Memori proses server | Per ID akun: jumlah pesan per 5 menit / 24 jam (`express-rate-limit`) dan jumlah pencarian web per tanggal WIB. Hilang saat server dinyalakan ulang. |

### Dikirim ke luar sistem: penyedia AI (LANJUT_051, 053, 055)

Hanya `src/modul/ngobrol/penyedia-ai.js` yang mengirim data ke luar, ke
OpenRouter (`OPENROUTER_BASE_URL`, wajib `https://`), dan hanya sesudah gerbang
persetujuan, saklar `ai_aktif`, dan penyamaran.

| Data | Kapan | Catatan |
|---|---|---|
| Pesan terbaru + riwayat sesi (maks. 20) | Setiap pesan dari akun yang lolos gerbang, saklar `ai_aktif=1` (bawaan **0** untuk instalasi baru sejak LANJUT_060) | Disamarkan (telepon, email, 16 angka mirip NIK). Salam pembuka bot (memuat nama tampilan) dibuang. Pesan bertanda bahaya **akut** tidak diteruskan saat itu. Sejak LANJUT_060, setiap pesan siswa di riwayat diperiksa ulang dengan daftar tanda bahaya yang berlaku, dan yang tergolong akut diganti penanda netral `[siswa menyampaikan hal yang sangat berat; aplikasi sudah menampilkan kartu bantuan]` sebelum disamarkan dan dikirim (`tanpaPesanAkut`). Balasan aplikasi untuk pesan itu tetap ada di riwayat. Modul dan pencarian web juga tidak memakai pesan akut. |
| Profil belajar | Sama | Kelas, jenis sekolah, nama prodi impian, gaya belajar. |
| Potongan modul (maks. `ai_modul_potongan_maks`, bawaan 3) | Pertanyaan materi, `ai_modul_aktif=1` (bawaan) | Hanya milik akun penanya; disamarkan. |
| Pertanyaan terbaru (permintaan web terpisah) | Pertanyaan materi, `ai_web_aktif=1` (bawaan **0**), kuota harian tersisa, tanpa tanda bahaya | Hanya pertanyaan tersamarkan, tanpa profil/riwayat/modul; diteruskan OpenRouter ke mesin pencari pihak ketiga. |
| Pengaturan `provider` | Setiap permintaan | `data_collection` (bawaan `deny`), `zdr` (bawaan mati), `only` (bawaan kosong). |
| **Tidak dikirim** | — | Nama tampilan, nama pengguna, email, kata sandi, ID akun, kartu, hasil latihan, kemajuan. Nama sekolah tidak disimpan LANJUT. |

### Yang tidak dikumpulkan app

Lokasi, kontak, kamera/foto, mikrofon, nomor HP, tanggal lahir/usia, nama
sekolah, dan nama lengkap (kecuali siswa menulisnya sendiri). App tidak
memakai SDK analitik, iklan, atau pelaporan galat pihak ketiga (dependensi
`LANJUT_App/package.json` per 3 Oktober 2026). Huruf Poppins dibundel di app,
tidak diunduh dari Google saat app berjalan.

## Lampiran B — Bagian `[ISI: ...]` yang menunggu keputusan

Daftar ini dibuat otomatis dari JSON. Siapa yang mengisi tiap butir (Khalifa,
guru BK, atau peninjau hukum), termasuk `[ISI]` di surat orang tua/wali, ada
di [`kebijakan-v2-klaim-vs-kode.md`](kebijakan-v2-klaim-vs-kode.md) bagian
"Yang harus dilengkapi manusia".

<!-- ISI:MULAI -->
21 bagian menunggu keputusan Khalifa:

1. **Tentang kebijakan ini** — nama badan pengelola dan alamatnya
2. **Data yang kami simpan di server** — berapa lama catatan teknis disimpan oleh server dan penyedianya.
3. **Data yang kami simpan di server** — kapan data yang dihapus benar-benar dihapus permanen.
4. **Untuk apa datanya dipakai** — tujuan lain kalau ada, misalnya penelitian atau laporan ke sekolah. Kalau tidak ada, hapus butir ini.
5. **Siapa yang bisa melihat datamu** — siapa saja dan untuk keperluan apa.
6. **Siapa yang bisa melihat datamu** — nama penyedia dan lokasi servernya.
7. **Siapa yang bisa melihat datamu** — konfirmasi apakah ini akan berubah.
8. **Fitur AI: siapa penyedianya** — penyedia model yang benar-benar menerima data menurut pengaturan di server, dan lokasinya.
9. **Fitur AI: siapa penyedianya** — negara atau wilayah pemrosesan, dan dasar pengirimannya ke luar negeri.
10. **Pertanyaan pelajaran: modul dan pencarian web** — aturan untuk modul dari guru atau penerbit (hak cipta) yang potongannya dikirim ke penyedia AI.
11. **Pertanyaan pelajaran: modul dan pencarian web** — hasil pengecekan Khalifa: mesin pencari mana yang menerima pertanyaan, dan apakah permintaan agar data tidak dikumpulkan juga berlaku di sana.
12. **Apa yang disimpan dari obrolanmu** — hasil pengecekan Khalifa terhadap kebijakan OpenRouter dan penyedia model: apa yang disimpan dan berapa lama.
13. **Persetujuan orang tua atau wali** — apakah akun dasar (tanpa AI) juga butuh persetujuan orang tua atau wali; menunggu tinjauan hukum.
14. **Hak kamu dan orang tua atau walimu** — cara meminta penghapusan di OpenRouter dan penyedia model, bila ada.
15. **Hak kamu dan orang tua atau walimu** — berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.
16. **Berapa lama data disimpan** — masa simpan data akun, data latihan, catatan persetujuan, dan catatan teknis server, serta apa yang terjadi pada data akun yang lama tidak dipakai.
17. **Berapa lama data disimpan** — masa simpan modul bila akunnya lama tidak dipakai.
18. **Keamanan** — perlindungan lain di server yang dipakai sungguhan, misalnya koneksi terenkripsi (HTTPS) antara aplikasi dan server, dan pencadangan.
19. **Perubahan kebijakan** — kapan persetujuan orang tua atau wali perlu diminta ulang saat kebijakan berubah.
20. **Perubahan kebijakan** — cara memberi tahu pengguna dan orang tua atau wali saat kebijakan berubah.
21. **Kontak** — kontak resmi tim LANJUT: nama pengelola, alamat, email, dan nomor yang bisa dihubungi, termasuk petugas pelindungan data pribadi bila ada.
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
6. **Pengiriman ke luar negeri.** Fitur AI (sudah dibangun, LANJUT_051)
   mengirim pesan siswa ke OpenRouter dan penyedia model, yang dapat
   memproses di luar Indonesia. Negara pemrosesan, dasar, dan syarat
   pengirimannya perlu ditetapkan sebelum persetujuan orang tua/wali
   sungguhan dicatat.
7. **Kalimat data pribadi di form Daftar** (salinan teks §4.10, disetujui
   28 Sep 2026) belum menyebut jenis sekolah, gaya belajar, kartu, hasil
   latihan, modul, dan pengiriman ke penyedia AI. Kalimat itu tidak diubah di
   LANJUT_047/049/056; perlu ditinjau ulang bersama kebijakan ini.
8. **Modul unggahan (LANJUT_049).** Siswa bisa mengunggah materi apa pun
   sebagai teks. Peringatan di formulir meminta tidak mengunggah data pribadi
   dan hanya materi yang boleh dipakai untuk belajar pribadi, tetapi isinya
   tidak diperiksa. Perlu diputuskan: (a) tanggung jawab bila materi
   melanggar hak cipta; (b) apakah data pribadi orang lain yang terbawa di
   materi diperlakukan khusus; (c) masa simpan modul bila akun lama tidak
   dipakai.
9. **Modul dan fitur AI.** Sudah dibangun (LANJUT_055) dan sudah dirinci di
   draf v2 (bagian "Pertanyaan pelajaran"). Yang tersisa: hak cipta modul
   (butir 12a) dan masa simpan modul (butir 8c).
10. **Versi kebijakan.** Penambahan data modul mengubah isi kebijakan, tetapi
    versinya **sengaja belum dinaikkan** (masih 1) di LANJUT_049. Karena
    seluruh teks masih DRAF dan belum berlaku, keputusan menaikkan versi ada
    di Khalifa. Bila dinaikkan: rilis app dengan teks baru dulu, baru naikkan
    `persetujuan_versi_kebijakan` lewat migrasi.
11. **Fitur AI sudah dibangun (LANJUT_051); teks diperbarui di draf v2
    (LANJUT_056).** Ringkasan 3, bagian "Data yang hanya ada di HP", dan
    bagian Fitur AI sekarang mengikuti kode; bukti per kalimat ada di
    `kebijakan-v2-klaim-vs-kode.md`. Catatan teknis yang masih relevan:
    - **Penyedia:** OpenRouter (perantara) meneruskan ke penyedia model;
      model bawaan `anthropic/claude-sonnet-5.5` (migrasi 015). Dengan
      `ai_penyedia_only` kosong, OpenRouter bebas memilih perusahaan yang
      menjalankan model itu. Negara kedudukan dan lokasi pemrosesan
      OpenRouter dan penyedia model **belum dicek dari sumber resmi** dan
      ditulis sebagai `[ISI]`.
    - **`data_collection: deny`:** dikirim di setiap permintaan (bawaan).
      Artinya menurut dokumentasi OpenRouter "Provider Routing": hanya
      penyedia yang tidak mengumpulkan data pengguna. Apa yang tetap disimpan
      OpenRouter sendiri dan penyedia model, dan berapa lama, perlu dicek.
    - **Tanda bahaya akut:** pesan itu tidak diteruskan ke AI saat itu. App
      tetap menyimpannya di riwayat sesi dan mengirimnya lagi bersama pesan
      berikutnya, tetapi sejak LANJUT_060 server menggantinya dengan penanda
      netral sebelum riwayat dikirim ke AI (lihat butir 13).

    Sebelum mencatat persetujuan orang tua/wali sungguhan: isi `[ISI]` yang
    tersisa, rilis app dengan teks ini, lalu naikkan versi (lihat butir 10).
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
      OpenRouter: Exa, atau pencarian bawaan penyedia model. Sudah disebut di
      draf v2; mesin pencari yang sebenarnya dan berlaku tidaknya
      `data_collection: deny` di sana tetap `[ISI]`.
13. **Temuan LANJUT_056: pesan bertanda bahaya akut ikut di riwayat
    berikutnya. SELESAI di LANJUT_060.** Dulu `tanganiTandaBahaya` (rute)
    hanya memeriksa pesan terbaru, dan server meneruskan seluruh riwayat
    (disamarkan) bersama pesan berikutnya. Sekarang `susunPermintaan` lebih
    dulu memanggil `tanpaPesanAkut`: setiap pesan **siswa** di riwayat
    diperiksa ulang dengan daftar tanda bahaya yang berlaku, dan yang akut
    diganti penanda netral (AI tetap tahu ada hal berat dan kartu bantuan
    sudah tampil, tanpa isi aslinya). Ini juga menangkap pesan lama yang baru
    tergolong akut setelah daftar kata diperbarui. Balasan empati aplikasi
    tetap di riwayat. Modul dan pencarian web hanya memakai pesan terbaru yang
    sudah pasti tidak akut. Teks kebijakan (bagian Keselamatan) dan surat
    orang tua/wali sudah diperbarui. Kalimat penanda tetap perlu ditinjau
    guru BK bersama daftar tanda bahaya.
14. **Temuan LANJUT_056: teks lain yang belum menyebut AI.** (a) Peringatan
    di formulir unggah modul (`lib/modul.ts`) belum menyebut bahwa potongan
    modul bisa dikirim ke penyedia AI; catatan itu baru ada di layar Ngobrol.
    (b) Salinan teks §4.13 (Jalur Saya) dan §4.14 (jendela terima kebijakan)
    masih menyebut "fitur AI nanti". (c) Penafian layar Gaya Belajar
    ("Disimpan di akunmu dan dipakai untuk menyesuaikan tips belajar di
    LANJUT.") belum menyebut bahwa gaya belajar juga dikirim ke penyedia AI.
    Ketiganya bukan klaim yang salah tentang data, tetapi belum lengkap;
    sebaiknya diperbarui bersama rilis teks v2 (di luar LANJUT_056, yang hanya
    mengubah teks kebijakan).
