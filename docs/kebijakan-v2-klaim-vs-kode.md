# Kebijakan privasi v2 — klaim vs kode (LANJUT_056)

> **DRAF — bahan review, bukan nasihat hukum.** Tetap perlu ditinjau orang
> yang paham UU PDP. Disusun 8 Oktober 2026 terhadap kode di `main` sesudah
> LANJUT_055 (commit `d5b4447`).

Dokumen ini mencocokkan setiap kalimat tentang data di
[`kebijakan-privasi-DRAF.md`](kebijakan-privasi-DRAF.md) (sumber teks:
`LANJUT_App/lib/kebijakan-privasi.json`) dan
[`surat-persetujuan-ortu-wali-DRAF.md`](surat-persetujuan-ortu-wali-DRAF.md)
dengan kode atau tes. Kalimat yang tidak punya bukti tidak dipakai; yang
diganti atau dihapus tercatat di bagian "Klaim yang diganti atau dihapus".

**Singkatan jalur.** `srv/` = `LANJUT_App/server/src/` · `mig/` =
`LANJUT_App/server/src/db/migrasi/` · `cfg/` = `LANJUT_App/server/config/` ·
`tes/` = `LANJUT_App/server/tests/` · `app/` = `LANJUT_App/` (app Expo).
Nomor baris per 8 Oktober 2026, yaitu commit `b20db57`. Bila kode sudah
berubah (mis. LANJUT_057 menambah baris di `ngobrol.layanan.js`), buka
versi itu dengan `git show b20db57:<berkas>`.

**Status.**
- **terbukti**: kode dan/atau tes otomatis menunjukkan perilaku itu.
- **terbukti · 055**: terbukti, dan perilakunya berasal dari LANJUT_055
  (sudah selesai, `d5b4447`). Bila kode 055 berubah, baris ini wajib dicek
  ulang.
- **perlu dicek manusia**: bergantung pada pihak luar (OpenRouter, penyedia
  model) atau pada nilai konfigurasi di server sungguhan. Kalimatnya ditulis
  tanpa janji, dan fakta yang belum diketahui ditulis `[ISI: ...]`.

Pengaturan yang dirujuk (tabel `konfigurasi_levelin`, bisa diubah tanpa
restart): `ai_aktif` (bawaan 1), `ai_model` (bawaan
`anthropic/claude-sonnet-5.5`), `ai_data_collection` (bawaan `deny`),
`ai_zdr` (0), `ai_penyedia_only` (kosong), `ai_modul_aktif` (1),
`ai_modul_potongan_maks` (3), `ai_web_aktif` (**0**), `ai_web_batas_harian`
(10), `ngobrol_batas_5_menit` (10), `ngobrol_batas_24_jam` (50). Kalimat
kebijakan yang bergantung pada nilai ini memakai "saat ini", "bawaannya",
atau "bila diaktifkan".

## 1. Ringkasan (layar Daftar)

| # | Klaim | Bukti | Status |
|---|---|---|---|
| R1 | Menyimpan data akun dan yang dibuat siswa (Daftar Periksa, kartu, modul, latihan). | Lampiran A kebijakan; `tes/kebijakan-privasi.test.js` (tes "setiap kelompok data yang disimpan disebut") | terbukti |
| R2 | Kata sandi disimpan dalam bentuk acak. | `srv/util/kata-sandi.js:13` (bcrypt) | terbukti |
| R3a | Fitur AI mengirim pesan, riwayat obrolan, dan profil belajar (kelas, jenis sekolah, prodi impian, gaya belajar) ke penyedia AI pihak ketiga. | lihat A6–A9 | terbukti |
| R3b | Penyedia itu dapat memproses data di luar Indonesia. | lihat A3 | perlu dicek manusia |
| R3c | Untuk pertanyaan pelajaran, potongan modul yang berkaitan bisa ikut dikirim. | lihat M1 | terbukti · 055 |
| R3d | Nama, nama pengguna, dan email dari akun tidak ikut dikirim. | lihat T1 | terbukti |
| R3e | Isi obrolan tidak disimpan di server LANJUT. | lihat S1 | terbukti |
| R3f | Fitur AI baru aktif setelah persetujuan orang tua/wali. | lihat P2 | terbukti |
| R4 | Hak melihat, membetulkan, meminta penghapusan, mencabut persetujuan. | lihat H1–H5 | terbukti (sebagai hak); cara memenuhinya sebagian `[ISI]` |

## 2. Data di server, di HP, dan yang tidak dikumpulkan

Kalimat bagian "Data yang kami simpan di server" tidak berubah dari draf
LANJUT_047/049 kecuali satu tambahan (D1). Buktinya ada di Lampiran A
kebijakan (dicocokkan dengan migrasi 001–016) dan di tes kebijakan.

| # | Klaim | Bukti | Status |
|---|---|---|---|
| D1 | Potongan modul dipakai untuk pencarian dan supaya potongan yang berkaitan bisa dipakai fitur AI. | `srv/modul/ngobrol/ngobrol.layanan.js:349-358` (`ambilPotongan`), `srv/modul/modul/modul.repo.js:109-123` | terbukti · 055 |
| D2 | Berkas asli modul tidak disimpan; modul bisa dihapus permanen beserta potongannya. | `tes/modul.test.js:274`, `:298`, `:327`; `mig/013_modul.sql:6-10` | terbukti |
| D3 | Catatan teknis server: fitur yang dibuka, hasil, lama proses, ID akun (bukan nama). | `srv/app.js:50-60` (baris log `:57`) | terbukti |
| D4 | Alamat IP dipakai sementara untuk batas laju dan tidak disimpan di basis data. | `srv/middleware/batasLaju.js:20-39` (penyimpanan memori bawaan `express-rate-limit`); `tes/ngobrol.test.js:243` (tidak ada di kolom teks mana pun) | terbukti |
| D5 | Kartu dan butir Daftar Periksa yang dihapus masih tersimpan (hapus lunak). | `srv/modul/kartu/kartu.repo.js:115`, `srv/modul/butir-pribadi/butir-pribadi.repo.js:102` | terbukti |
| HP1 | Riwayat obrolan hanya di memori app; hilang saat app ditutup, keluar, atau ganti akun. | `app/providers/ObrolanProvider.tsx:37-45` (tanpa AsyncStorage; provider berkunci id pengguna) | terbukti |
| HP2 | Riwayat tidak disimpan di HP maupun di server LANJUT. | `app/providers/ObrolanProvider.tsx:40`; `tes/ngobrol.test.js:243` | terbukti |
| HP3 | Setiap kali siswa mengirim pesan, riwayat ikut dikirim ke penyedia AI. | `app/providers/ObrolanProvider.tsx:72-77`; `srv/modul/ngobrol/ngobrol.layanan.js:181`, `:193` | terbukti |
| N1 | Tidak mengumpulkan lokasi, kontak, foto, suara, nomor HP, tanggal lahir/usia, nama sekolah. | Lampiran A "Yang tidak dikumpulkan app" (skema `mig/001`–`016`, dependensi `app/package.json`) | terbukti |
| N2 | Tidak memakai layanan analitik atau iklan pihak ketiga. | Lampiran A (dependensi app per 3 Okt 2026; tidak berubah di 049–055) | terbukti |
| U1 | Data dipakai untuk menjawab pesan di Ngobrol lewat penyedia AI. | `srv/modul/ngobrol/ngobrol.layanan.js:380-434` | terbukti |
| V1 | Akun lain tidak bisa melihat data, termasuk modul. | `tes/modul.test.js:250`; `tes/ngobrol-materi.test.js:131` | terbukti |
| V2 | Penyedia AI pihak ketiga hanya menerima data yang dikirim untuk fitur AI. | `srv/modul/ngobrol/penyedia-ai.js:3-4` (satu-satunya pengirim ke luar); `tes/ngobrol.test.js:560` | terbukti |

## 3. Fitur AI: penyedia, yang dikirim, yang tidak dikirim

| # | Klaim | Bukti | Status |
|---|---|---|---|
| A1 | Balasan dibuat AI, bukan manusia, dan bisa keliru. | `srv/modul/ngobrol/ngobrol.layanan.js:80` (aturan "jangan mengaku manusia"); `app/lib/ngobrol.ts:6` | terbukti |
| A2 | Server mengirim data ke OpenRouter, perantara yang meneruskan ke perusahaan yang menjalankan model. | `srv/config/env.js:71` (alamat bawaan `openrouter.ai`); `srv/modul/ngobrol/penyedia-ai.js:56-72` | terbukti (alamat bawaan); peran perantara menurut dokumentasi OpenRouter: perlu dicek manusia |
| A3 | Penyedia AI dapat memproses data di luar Indonesia. | Tidak bisa dibuktikan dari kode. Ditulis "dapat", tanpa nama negara, plus `[ISI: negara atau wilayah ...]` | perlu dicek manusia |
| A4 | Model yang dipakai saat ini buatan Anthropic. | `mig/015_ai_pengaturan.sql:18`; `tes/ngobrol.test.js:177` | terbukti untuk nilai bawaan; nilai di server sungguhan perlu dicek manusia |
| A5 | Perusahaan yang menjalankan model dipilih OpenRouter; pilihan bisa dibatasi di server. | `srv/modul/ngobrol/ngobrol.layanan.js:254-267` (`provider.only`); `mig/015_ai_pengaturan.sql:27` (bawaan kosong) | perlu dicek manusia (cara OpenRouter memilih) |
| A6 | Pesan terbaru dikirim setelah sebagian data pribadi disamarkan. | `srv/modul/ngobrol/ngobrol.layanan.js:181`, `:193`; `tes/ngobrol.test.js:427` | terbukti |
| A7 | Riwayat sesi hingga 20 pesan terakhir, termasuk balasan sebelumnya, ikut dikirim dan disamarkan. | `app/lib/ngobrol.ts:29`; `app/providers/ObrolanProvider.tsx:72-75`; `srv/modul/ngobrol/ngobrol.layanan.js:143`, `:181`; `tes/ngobrol.test.js:150`, `:427` | terbukti (server sendiri menerima maks. 30: `srv/modul/ngobrol/ngobrol.skema.js:6`) |
| A8 | Salam pembuka yang memuat nama tampilan tidak ikut dikirim. | `srv/modul/ngobrol/ngobrol.layanan.js:140-142`; `tes/ngobrol.test.js:176`, `:179` | terbukti |
| A9 | Profil: kelas, jenis sekolah, nama prodi impian, gaya belajar. | `srv/modul/ngobrol/ngobrol.layanan.js:109-130`, `:411-413`; `tes/ngobrol.test.js:173` | terbukti |
| A10 | Data dikirim hanya untuk dibuatkan balasan. | `srv/modul/ngobrol/penyedia-ai.js:3-4`; pemanggil hanya `ngobrol.layanan.js:363` (web untuk jawaban) dan `:418` | terbukti (tujuan di pihak LANJUT; pemakaian di pihak penyedia lihat S4) |
| T1 | Tidak dikirim: nama tampilan, nama pengguna, email, kata sandi, ID akun. | `srv/modul/ngobrol/penyedia-ai.js:63-70` (isi permintaan: model, messages, max_tokens, temperature, provider, plugins; tanpa `user`); `tes/ngobrol.test.js:179` | terbukti |
| T2 | Nama sekolah tidak dikirim karena tidak disimpan LANJUT. | Lampiran A (tidak ada kolom nama sekolah di `mig/001`–`016`) | terbukti |
| T3 | Kartu, hasil latihan, centang Daftar Periksa tidak dikirim. | `srv/modul/ngobrol/ngobrol.layanan.js:380-434` (hanya membaca profil, prodi, dan potongan modul) | terbukti |
| T4 | Yang ditulis siswa sendiri di pesan ikut terkirim, kecuali yang disamarkan. | `srv/modul/ngobrol/samarkan.js:10-17` (hanya tiga pola) | terbukti |
| PS1 | Disamarkan: nomor telepon, email, deretan 16 angka seperti NIK → `[disamarkan]`. | `srv/modul/ngobrol/samarkan.js:10-24`; `tes/ngobrol-keselamatan.test.js:112` | terbukti |
| PS2 | Berlaku untuk pesan, riwayat, potongan modul, hasil web. | `srv/modul/ngobrol/ngobrol.layanan.js:181`, `:185-187`, `:209`; `tes/ngobrol-materi.test.js:218` | terbukti (potongan & web: terbukti · 055) |
| PS3 | App memberi tahu bila pesan siswa disamarkan. | `srv/modul/ngobrol/ngobrol.layanan.js:430`; `app/providers/ObrolanProvider.tsx:81`; `app/components/screens/NgobrolScreen.tsx:216` | terbukti |
| PS4 | Nama, alamat rumah, nama sekolah, dan data lain yang bukan nomor/email tidak disamarkan. | `srv/modul/ngobrol/samarkan.js:10-17` | terbukti |

## 4. Pertanyaan pelajaran: modul dan pencarian web (LANJUT_055)

| # | Klaim | Bukti | Status |
|---|---|---|---|
| M1 | Untuk pertanyaan materi, server mencari potongan berkaitan di modul milik siswa sendiri. | `srv/modul/ngobrol/ngobrol.layanan.js:396-400`; `srv/modul/ngobrol/materi.js:103-115` | terbukti · 055 |
| M2 | Saat ini paling banyak 3 potongan, masing-masing ±800–1.200 karakter, dikirim setelah disamarkan. | `mig/016_ai_materi.sql:18`; `srv/modul/ngobrol/materi.js:133-140`; `srv/modul/modul/potong.js:9-10`; `tes/ngobrol-materi.test.js:193`; `tes/ngobrol-materi-murni.test.js:41` | terbukti · 055 (nilai di server sungguhan perlu dicek manusia; rentang sah 1–5) |
| M3 | Modul milik akun lain tidak pernah dipakai. | `srv/modul/modul/modul.repo.js:115`; `tes/ngobrol-materi.test.js:131` | terbukti · 055 |
| W1 | Pencarian web berlaku bila diaktifkan; bawaannya mati. | `mig/016_ai_materi.sql:27`; `srv/modul/ngobrol/ngobrol.layanan.js:288`, `:403`; `tes/ngobrol-materi.test.js:290` | terbukti · 055 |
| W2 | Permintaan web terpisah, hanya pertanyaan terbaru tersamarkan, tanpa profil, riwayat, modul. | `srv/modul/ngobrol/ngobrol.layanan.js:206-211`, `:361-367`; `tes/ngobrol-materi.test.js:254`; `tes/ngobrol-materi-murni.test.js:88` | terbukti · 055 |
| W3 | OpenRouter meneruskannya ke mesin pencari pihak ketiga. | `srv/modul/ngobrol/ngobrol.layanan.js:365` (`plugins: [{ id: 'web' }]`). Mesin pencari yang sebenarnya tidak terlihat dari kode → `[ISI]` | perlu dicek manusia |
| W4 | Ada batas pencarian web per akun per hari. | `srv/modul/ngobrol/ngobrol.layanan.js:321-329`, `:404`; `mig/016_ai_materi.sql:30`; `tes/ngobrol-materi.test.js:290` | terbukti · 055 |
| W5 | Tautan sumber web membuka situs pihak ketiga di luar LANJUT. | `app/components/screens/NgobrolScreen.tsx:116` (`Linking.openURL`); tautan hanya dari anotasi penyedia: `srv/modul/ngobrol/ngobrol.layanan.js:221-242` | terbukti · 055 |
| W6 | Obrolan biasa dan pertanyaan jalur masuk tidak memakai modul maupun web. | `srv/modul/ngobrol/ngobrol.layanan.js:399`; `srv/modul/ngobrol/materi.js:106`, `:110-114`; `tes/ngobrol-materi.test.js:193`, `:309` | terbukti · 055 |

## 5. Penyimpanan dan log

| # | Klaim | Bukti | Status |
|---|---|---|---|
| S1 | Server tidak menyimpan isi obrolan, potongan yang dikirim, atau pertanyaan web, dan tidak mencatatnya di log. | `tes/ngobrol.test.js:243` (penanda tidak ada di log maupun di kolom teks mana pun di basis data); `tes/ngobrol-materi.test.js:329`; `tes/ngobrol.test.js:474` (JSON rusak) | terbukti |
| S2 | Yang tercatat hanya: permintaan ke Ngobrol (hasil, lama, ID akun), jumlah potongan dan hasil web, jenis gangguan penyedia, tingkat tanda bahaya + waktu. | `srv/app.js:57`; `srv/modul/ngobrol/ngobrol.layanan.js:374`, `:390`, `:408`, `:421`; `srv/modul/ngobrol/keselamatan.js:153-155`; `srv/middleware/penangananGalat.js:18`; `tes/ngobrol.test.js:330` | terbukti (catatan: baris keselamatan tanpa ID akun, tetapi bisa dikaitkan dengan baris log akses permintaan yang sama lewat waktunya; kebijakan tidak mengklaim anonim) |
| S3 | Hitungan batas pesan dan kuota web per akun hanya di memori, hilang saat server dinyalakan ulang. | `srv/modul/ngobrol/ngobrol.rute.js:26-35` (tanpa `store` = memori); `srv/modul/ngobrol/ngobrol.layanan.js:317` (`Map`) | terbukti |
| S4 | Kami meminta OpenRouter hanya memakai penyedia yang tidak mengumpulkan data pengguna (`data_collection: deny`). | `mig/015_ai_pengaturan.sql:21`; `srv/modul/ngobrol/ngobrol.layanan.js:250-269`; `tes/ngobrol.test.js:177`, `:519`; untuk web: `srv/modul/ngobrol/ngobrol.layanan.js:364` | terbukti bahwa parameternya dikirim; arti dan kepatuhannya di pihak OpenRouter/penyedia: perlu dicek manusia |
| S5 | Apa yang disimpan OpenRouter dan penyedia model, dan berapa lama, mengikuti kebijakan mereka. | Tidak bisa dibuktikan dari kode → `[ISI]` | perlu dicek manusia |

## 6. Keselamatan

| # | Klaim | Bukti | Status |
|---|---|---|---|
| K1 | Server memeriksa pesan terbaru untuk tanda bahaya, di server, bukan oleh penyedia AI. | `srv/modul/ngobrol/ngobrol.rute.js:38-43` (`pesan[pesan.length - 1]`); `srv/modul/ngobrol/keselamatan.js:126-132` | terbukti |
| K2 | Tanda bahaya serius (akut): pesan itu tidak diteruskan ke penyedia AI; server membalas teks tetap + kartu bantuan terverifikasi. | `srv/modul/ngobrol/ngobrol.rute.js:38-43`, `:50`; `srv/modul/ngobrol/keselamatan.js:135-143`; `tes/ngobrol.test.js:296`; `tes/ngobrol-keselamatan.test.js:22` | terbukti |
| K3 | Juga saat fitur AI dimatikan. | `srv/modul/ngobrol/ngobrol.rute.js:50` (sebelum batas laju dan layanan); `tes/ngobrol.test.js:309` | terbukti |
| K4 | Bila obrolan dilanjutkan, pesan akut ikut terkirim sebagai bagian riwayat bersama pesan berikutnya. | `app/providers/ObrolanProvider.tsx:72-75` (riwayat tidak disaring); `srv/modul/ngobrol/ngobrol.rute.js:40` (hanya pesan terbaru diperiksa); `srv/modul/ngobrol/ngobrol.layanan.js:181` | terbukti (temuan LANJUT_056; lihat Lampiran C butir 13 kebijakan) |
| K5 | Tanda ringan: pesan tetap dikirim, dengan catatan agar AI menanggapi perasaan lebih dulu. | `srv/modul/ngobrol/ngobrol.layanan.js:86-87`, `:122`, `:180`; `tes/ngobrol.test.js:344` | terbukti |
| K6 | AI bisa menilai siswa butuh bantuan; app lalu menampilkan kartu bantuan. | `srv/modul/ngobrol/ngobrol.layanan.js:425-429`; `tes/ngobrol.test.js:355` | terbukti |
| K7 | Daftar tanda bahaya masih draf untuk tinjauan guru BK; daftar kartu bantuan juga draf. | `cfg/tanda-bahaya.json:2`; `cfg/kartu-bantuan.json:2`; `tes/ngobrol-keselamatan.test.js:45` | terbukti |

## 7. Saklar, batas, persetujuan, hak, keamanan, perubahan

| # | Klaim | Bukti | Status |
|---|---|---|---|
| B1 | Fitur AI bisa dimatikan; selama mati, balasan uji coba bertanda dan pesan tidak dikirim ke penyedia AI. | `srv/modul/ngobrol/ngobrol.layanan.js:297`, `:385`; `app/components/screens/NgobrolScreen.tsx:210`; `tes/ngobrol.test.js:398` | terbukti |
| B2 | Modul dan web bisa dimatikan terpisah. | `srv/modul/ngobrol/ngobrol.layanan.js:278-290`; `tes/ngobrol-materi.test.js:193`, `:290` | terbukti · 055 |
| B3 | Batas pesan per akun per 5 menit dan per 24 jam; batas web per hari. | `srv/modul/ngobrol/ngobrol.rute.js:51-52`; `mig/014_ngobrol.sql:13`, `:16`; `tes/ngobrol.test.js:262`; W4 | terbukti |
| P1 | Persetujuan orang tua/wali lewat surat; dicatat ke akun; status terlihat di Jalur Saya. | `srv/db/persetujuan/persetujuan-ortu.js:18-20`; `app/components/screens/AkunScreen.tsx:278-279` | terbukti (siapa yang menjalankan skrip pencatatan belum ditetapkan; kalimat v1 "Sekolah lalu mencatatnya" diganti, lihat G7) |
| P2 | AI aktif hanya bila persetujuan ortu/wali tercatat, tidak dicabut, dan kebijakan versi berlaku diterima. | `srv/modul/persetujuan/persetujuan.layanan.js:37-56`; `srv/modul/ngobrol/ngobrol.layanan.js:381-383`; `tes/persetujuan.test.js:91-172`; `tes/ngobrol.test.js:136` | terbukti |
| P3 | Berlaku untuk semua akun karena LANJUT tidak menanyakan usia. | `srv/modul/persetujuan/persetujuan.layanan.js:43-49` (tanpa syarat usia); N1 | terbukti |
| P4 | Tanpa persetujuan: layar Ngobrol terkunci, tidak ada data akun yang dikirim ke penyedia AI, fitur lain tetap jalan. | `app/components/screens/NgobrolScreen.tsx:51`; `srv/modul/ngobrol/ngobrol.layanan.js:381-383` (sebelum apa pun dikirim); `tes/ngobrol.test.js:136` (penyedia tidak dipanggil); gerbang hanya dipakai rute Ngobrol (`tes/ngobrol.test.js:560`) | terbukti |
| H1 | Data profil bisa diubah sendiri di Jalur Saya. | `srv/modul/pengguna/pengguna.rute.js:10` | terbukti (tidak berubah dari v1) |
| H2 | Modul bisa dihapus permanen sendiri, satu per satu atau semuanya. | `app/hooks/useModul.ts:72-90`; `app/components/screens/ModulScreens.tsx:35`, `:57-69`; `tes/modul.test.js:274` | terbukti |
| H3 | Fitur hapus akun di app belum ada. | Daftar rute `srv/modul/*/*.rute.js` (tidak ada rute hapus akun) | terbukti |
| H4 | Isi obrolan tidak perlu dihapus dari server karena tidak disimpan. | S1 | terbukti |
| H5 | Setelah pencabutan dicatat, AI tertutup mulai pesan berikutnya; fitur lain tetap jalan. | `srv/modul/ngobrol/ngobrol.layanan.js:381` (gerbang dicek tiap permintaan); `app/providers/ObrolanProvider.tsx:96-98`; `tes/ngobrol.test.js:136`; `tes/persetujuan.test.js:132` | terbukti |
| H6 | Pencabutan tidak menghapus data yang sudah dikirim ke penyedia AI. | `srv/modul/ngobrol/penyedia-ai.js:50-88` (hanya permintaan chat; tidak ada permintaan hapus ke penyedia) | terbukti |
| KM1 | Data AI dikirim server ke penyedia, bukan langsung dari HP, lewat HTTPS. | `app/providers/ObrolanProvider.tsx:77` (app hanya memanggil `/ngobrol`); `srv/config/env.js:75-77` (selain localhost uji, wajib `https://`) | terbukti |
| KM2 | Kunci akses penyedia AI hanya di server. | `srv/config/env.js:69`; `srv/modul/ngobrol/penyedia-ai.js:6`, `:59` | terbukti |
| PB1 | Versi naik → persetujuan versi lama tidak membuka fitur AI. | `srv/modul/persetujuan/persetujuan.layanan.js:38-41`; `tes/persetujuan.test.js:157` | terbukti |
| PB2 | App meminta terima ulang; "Nanti saja" boleh, fitur lain tetap jalan, AI tertutup sampai diterima. | `app/components/screens/TerimaKebijakan.tsx:19`, `:120-141`; `app/lib/kebijakanPrivasi.ts:32-41`; `tes/persetujuan.test.js:308` | terbukti |
| PB3 | Sistem bisa mewajibkan persetujuan orang tua/wali yang baru. | `srv/modul/persetujuan/persetujuan.layanan.js:43-47` (`persetujuan_versi_min_ortu`); `tes/persetujuan.test.js:146` | terbukti |

## 8. Surat orang tua/wali

Kalimat surat adalah ringkasan kalimat kebijakan di atas.

| Kalimat di surat | Baris kebijakan | Status |
|---|---|---|
| Data yang disimpan LANJUT (akun, daftar persiapan, kartu, latihan, modul, keamanan akun); kata sandi acak; tidak mengumpulkan lokasi, kontak, foto, nomor HP, usia, nama sekolah | R1, R2, D2, N1 | terbukti |
| Balasan dari OpenRouter yang meneruskan ke perusahaan penjalan model; dapat diproses di luar Indonesia | A2, A3, A5 | perlu dicek manusia (`[ISI]`) |
| Dikirim: pesan + riwayat (hingga 20), kelas, jenis sekolah, prodi impian, gaya belajar | A6–A9 | terbukti |
| Pertanyaan pelajaran: hingga 3 potongan modul; web bila diaktifkan, hanya pertanyaan | M1–M3, W1–W3 | terbukti · 055 (W3: perlu dicek manusia) |
| Nama, nama pengguna, email, ID akun tidak dikirim; nomor/email/16 angka disamarkan; nama atau alamat yang ditulis anak tetap terkirim | T1, T4, PS1, PS4 | terbukti |
| Isi obrolan tidak disimpan di server LANJUT dan hilang dari app saat ditutup | S1, HP1 | terbukti |
| LANJUT meminta penyedia yang tidak mengumpulkan data; penyimpanan penyedia mengikuti kebijakan mereka | S4, S5 | perlu dicek manusia (`[ISI]`) |
| Tanda bahaya serius tidak diteruskan ke AI; kartu bantuan; ikut di riwayat bila obrolan dilanjutkan | K2, K4 | terbukti |
| Mencabut kapan saja; AI tertutup mulai pesan berikutnya; tidak menghapus data yang sudah dikirim | H5, H6 | terbukti |
| Tanpa persetujuan, fitur AI terkunci | P4 | terbukti |

## Klaim yang diganti atau dihapus

| # | Kalimat lama / usulan task | Masalah | Penanganan |
|---|---|---|---|
| G1 | Ringkasan 3 v1: "Obrolan di Ngobrol Bareng LANJUT belum dikirim ke mana pun." | Salah sejak LANJUT_051. | Diganti Ringkasan 3 v2 (R3a–R3f). |
| G2 | Bagian HP v1: "Obrolan ini tidak dikirim ke server LANJUT maupun ke pihak lain." | Salah: riwayat dikirim ke server dan penyedia AI di setiap pesan. | Diganti HP1–HP3. |
| G3 | Bagian "Fitur AI (belum aktif)" v1: "masih versi uji coba: balasannya contoh". | Balasan uji coba hanya saat saklar `ai_aktif` mati. | Dihapus; diganti B1. |
| G4 | Usulan task: "tanpa persetujuan app tetap bisa dipakai dengan balasan uji coba". | Tidak sesuai kode: tanpa persetujuan layar Ngobrol terkunci (403 `AI_BELUM_DIIZINKAN`), bukan balasan uji coba. | Ditulis sesuai kode (P4); fitur lain tetap jalan. |
| G5 | Usulan task: persetujuan "untuk siswa di bawah 18 tahun". | Gerbang tidak memeriksa usia; berlaku untuk semua akun. | Ditulis sesuai kode (P3); pertanyaan siswa dewasa tetap di Lampiran C butir 2. |
| G6 | Usulan task: "pesan yang memicunya tidak dikirim ke penyedia AI". | Hanya benar untuk tanda **akut**, dan hanya pada permintaan itu: pesan itu ikut di riwayat berikutnya. Tanda **ringan** tetap dikirim. | Ditulis dengan rinciannya (K2, K4, K5). Lampiran C butir 13. |
| G7 | Kebijakan v1: "Sekolah lalu mencatatnya ke akunmu." | Pencatatan memakai skrip server (`npm run persetujuan-ortu`); siapa yang menjalankannya belum ditetapkan. | Diganti "persetujuan itu dicatat ke akunmu" (P1). |
| G8 | Usulan task: "jenjang" ikut dikirim. | Jenjang tidak dikirim terpisah; yang dikirim kelas dan jenis sekolah. | Ditulis "kelas dan jenis sekolah" (A9). |
| G9 | Lampiran C butir 11 (draf lama): "Keduanya perusahaan Amerika Serikat". | Bukan fakta dari kode dan belum dicek dari sumber resmi. | Dihapus; negara pemrosesan menjadi `[ISI]` (A3). |
| G10 | Lampiran C butir 11 (draf lama): "Pesan ... tanda bahaya akut tidak dikirim ke AI sama sekali". | Lihat G6. | Dikoreksi. |
| G11 | Lampiran A: "Riwayat Ngobrol — Tidak dikirim ke server". | Salah sejak LANJUT_051. | Diganti; tabel baru "Dikirim ke luar sistem". |
| G12 | Surat v1: "Fitur AI (belum aktif). Nanti LANJUT punya fitur ...". | Fitur sudah dibangun. | Ditulis ulang (bagian 8). |
| G13 | Usulan task: menyebut model penyedia secara pasti. | Model dan penyedia bisa diubah di konfigurasi; OpenRouter bisa meneruskan ke lebih dari satu perusahaan. | Ditulis "saat ini buatan Anthropic" + `[ISI: penyedia model yang benar-benar menerima data ...]` (A4, A5). |
| G14 | "Kami menjamin penyedia tidak menyimpan data" (tidak dipakai). | Kode hanya mengirim parameter `data_collection: deny`. | Ditulis "kami meminta ..." tanpa janji lebih (S4, S5). |

## Tempat lain yang menyebut obrolan atau modul tidak dikirim keluar

Pencarian di seluruh repo (tanpa `node_modules`) untuk "dikirim ke mana
pun", "tidak/belum dikirim ke (server/pihak/luar)", "tidak keluar dari", dan
variasinya, termasuk teks layar Ngobrol (`app/lib/ngobrol.ts`) dan teks tetap
server (`cfg/ngobrol-teks.json`).

| Tempat | Teks lama | Penanganan |
|---|---|---|
| `app/lib/kebijakan-privasi.json` (ringkasan 3, bagian HP, bagian Fitur AI) | "belum dikirim ke mana pun"; "tidak dikirim ke server LANJUT maupun ke pihak lain" | Diganti teks v2 |
| `docs/kebijakan-privasi-DRAF.md` (bagian otomatis, Lampiran A, Lampiran C butir 11) | sama | Dibuat ulang dari JSON; lampiran diperbaiki tangan |
| `docs/salinan-teks-lanjut.md` §4.13 Ringkasan 3 | "belum dikirim ke mana pun" | Disamakan dengan JSON |
| `docs/lembar-review-draf-teks.md` (butir 8 dan kutipan) | sama | Dibuat ulang (`npm run lembar-review-teks`) |
| `LANJUT_App/server/tools/lembar-review-teks.js` (klaim ringkasan 3) | "Obrolan belum dikirim ke mana pun" | Diganti |
| `docs/surat-persetujuan-ortu-wali-DRAF.md` | "Fitur AI (belum aktif)" | Ditulis ulang |
| `app/components/screens/ModulScreens.tsx` (komentar) | "isi modul tidak dikirim ke mana pun selain server LANJUT" | Komentar diperbaiki |
| `LANJUT_App/server/README.md` (bagian Modul dan catatan sebelum siswa memakai AI) | "isi modul tidak dikirim ke mana pun"; kutipan teks lama | Diperbaiki |
| `MVP-PWA/onboarding.html` (PWA lama) | "Jawabanmu disimpan di perangkat ini saja, tidak dikirim ke mana pun." | Tentang jawaban onboarding PWA, bukan obrolan. Kalimat absolut dihapus menjadi "Jawabanmu disimpan di perangkat ini saja." |
| `mig/013_modul.sql:14` (komentar migrasi) | "isi modul tidak pernah keluar dari server" | **Dibiarkan**: migrasi yang sudah dijalankan adalah catatan sejarah dan tidak tampil ke siswa. Perilaku terkini ada di README server dan `docs/alur-data-ai-materi.md`. |
| `docs/LANJUT_049_Unggah-Modul-Arsip.md:18` | "Isi modul tidak dikirim ke luar sistem" | **Dibiarkan**: instruksi task lama (catatan sejarah). |
| `app/lib/ngobrol.ts` (teks layar Ngobrol) | — | Sudah benar: menyebut penyedia pihak ketiga, tidak disimpan, dan modul ikut dikirim. Tidak diubah. |
| `cfg/ngobrol-teks.json` | — | Tidak ada klaim tentang pengiriman data. |

Pemeriksaan otomatis: `tes/kebijakan-privasi.test.js` (tes "tidak ada kalimat
'tidak dikirim ke mana pun' ...") memindai JSON kebijakan, dokumen
kebijakan, surat, salinan teks, lembar review, semua `.ts/.tsx/.json` app
(`app/`, `components/`, `lib/`, `hooks/`, `providers/`, `api/`), teks
`cfg/*.json`, dan halaman `MVP-PWA/*.html`.

## Yang harus dilengkapi manusia

Semua `[ISI: ...]` di kebijakan (JSON) dan surat. Pengisi: **Khalifa**
(pengelola LANJUT), **guru BK**, **peninjau hukum** (orang yang paham UU
PDP). Tes memastikan setiap `[ISI]` di JSON dan surat ada di tabel ini.

| # | Letak | `[ISI]` | Pengisi |
|---|---|---|---|
| I1 | Kebijakan: Tentang | `[ISI: nama badan pengelola dan alamatnya]` | Khalifa |
| I2 | Kebijakan: Data di server | `[ISI: berapa lama catatan teknis disimpan oleh server dan penyedianya.]` | Khalifa (setelah memilih hosting) |
| I3 | Kebijakan: Data di server | `[ISI: kapan data yang dihapus benar-benar dihapus permanen.]` | Khalifa + peninjau hukum |
| I4 | Kebijakan: Untuk apa | `[ISI: tujuan lain kalau ada, misalnya penelitian atau laporan ke sekolah. Kalau tidak ada, hapus butir ini.]` | Khalifa |
| I5 | Kebijakan: Siapa melihat | `[ISI: siapa saja dan untuk keperluan apa.]` | Khalifa |
| I6 | Kebijakan: Siapa melihat | `[ISI: nama penyedia dan lokasi servernya.]` | Khalifa |
| I7 | Kebijakan: Siapa melihat | `[ISI: konfirmasi apakah ini akan berubah.]` | Khalifa |
| I8 | Kebijakan: Fitur AI penyedia | `[ISI: penyedia model yang benar-benar menerima data menurut pengaturan di server, dan lokasinya.]` | Khalifa (cek `ai_model`, `ai_penyedia_only`, dan halaman model di OpenRouter) |
| I9 | Kebijakan: Fitur AI penyedia | `[ISI: negara atau wilayah pemrosesan, dan dasar pengirimannya ke luar negeri.]` | Khalifa (negara) + peninjau hukum (dasar pengiriman) |
| I10 | Kebijakan: Pertanyaan pelajaran | `[ISI: aturan untuk modul dari guru atau penerbit (hak cipta) yang potongannya dikirim ke penyedia AI.]` | Peninjau hukum + Khalifa (Lampiran C butir 12a) |
| I11 | Kebijakan: Pertanyaan pelajaran | `[ISI: hasil pengecekan Khalifa: mesin pencari mana yang menerima pertanyaan, dan apakah permintaan agar data tidak dikumpulkan juga berlaku di sana.]` | Khalifa |
| I12 | Kebijakan: Apa yang disimpan | `[ISI: hasil pengecekan Khalifa terhadap kebijakan OpenRouter dan penyedia model: apa yang disimpan dan berapa lama.]` | Khalifa (retensi OpenRouter dan penyedia model) |
| I13 | Kebijakan: Persetujuan | `[ISI: apakah akun dasar (tanpa AI) juga butuh persetujuan orang tua atau wali; menunggu tinjauan hukum.]` | Peninjau hukum, lalu Khalifa |
| I14 | Kebijakan: Hak | `[ISI: cara meminta penghapusan di OpenRouter dan penyedia model, bila ada.]` | Khalifa |
| I15 | Kebijakan: Hak | `[ISI: berapa lama permintaan ditanggapi, dan cara memastikan permintaan benar-benar datang dari orang tua atau wali.]` | Khalifa + peninjau hukum |
| I16 | Kebijakan: Berapa lama | `[ISI: masa simpan data akun, data latihan, catatan persetujuan, dan catatan teknis server, serta apa yang terjadi pada data akun yang lama tidak dipakai.]` | Khalifa + peninjau hukum |
| I17 | Kebijakan: Berapa lama | `[ISI: masa simpan modul bila akunnya lama tidak dipakai.]` | Khalifa + peninjau hukum (Lampiran C butir 8c) |
| I18 | Kebijakan: Keamanan | `[ISI: perlindungan lain di server yang dipakai sungguhan, misalnya koneksi terenkripsi (HTTPS) antara aplikasi dan server, dan pencadangan.]` | Khalifa (setelah memilih hosting) |
| I19 | Kebijakan: Perubahan | `[ISI: kapan persetujuan orang tua atau wali perlu diminta ulang saat kebijakan berubah.]` | Peninjau hukum + Khalifa |
| I20 | Kebijakan: Perubahan | `[ISI: cara memberi tahu pengguna dan orang tua atau wali saat kebijakan berubah.]` | Khalifa |
| I21 | Kebijakan: Kontak | `[ISI: kontak resmi tim LANJUT: nama pengelola, alamat, email, dan nomor yang bisa dihubungi, termasuk petugas pelindungan data pribadi bila ada.]` | Khalifa |
| I22 | Surat: kop | `[ISI: kop surat sekolah]` | Sekolah (lewat Khalifa) |
| I23 | Surat: pembuka | `[ISI: nama badan pengelola]` | Khalifa (sama dengan I1) |
| I24 | Surat: Fitur AI | `[ISI: penyedia model yang dipakai]` | Khalifa (sama dengan I8) |
| I25 | Surat: Fitur AI | `[ISI: negara atau wilayah]` | Khalifa (sama dengan I9) |
| I26 | Surat: Fitur AI | `[ISI: hasil pengecekan kebijakan OpenRouter dan penyedia model]` | Khalifa (sama dengan I12) |
| I27 | Surat: Hak | `[ISI: kontak resmi tim LANJUT]` | Khalifa (sama dengan I21) |
| I28 | Surat: versi (dua tempat) dan catatan peninjau | `[ISI: nomor versi saat dirilis]` | Khalifa, saat versi dinaikkan sesudah rilis app |
| I29 | Surat: tanda tangan | `[ISI: wali kelas / kepala sekolah]` | Sekolah (lewat Khalifa) |

Di luar `[ISI]`, yang menunggu **guru BK**: daftar tanda bahaya
(`cfg/tanda-bahaya.json`), kartu bantuan (`cfg/kartu-bantuan.json`), dan
keputusan apakah pesan akut dibuang dari riwayat yang dikirim (Lampiran C
butir 13). Kalimat kebijakan K7 berubah bila tinjauan itu selesai.
