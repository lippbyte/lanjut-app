# Kesiapan Rilis Uji ke Sekolah

> Disusun di LANJUT_059 (9 Oktober 2026), **baca saja**: tidak ada kode,
> konfigurasi, atau basis data yang diubah, dan tidak ada build, deploy,
> atau push. Semua langkah di bawah adalah **keputusan dan pekerjaan
> Khalifa**. Status tiap butir dan buktinya ada di
> [`peta-kelengkapan-2026-10-09.md`](peta-kelengkapan-2026-10-09.md).
>
> **Diperbarui LANJUT_060 (9 Oktober 2026)** sesudah perubahan kode:
> bawaan `ai_aktif` 0 untuk instalasi baru (1.3, 1.4), migrasi 018 dan dua
> kunci tarif (1.3, 1.4), daftar periksa keselamatan (3), hal teknis yang
> sudah beres (4), dan pemantauan dengan tabel `pemakaian_ai_harian` (5).
>
> Acuan teknis yang lebih rinci: `LANJUT_App/server/README.md` §6
> (Deployment), `LANJUT_App/server/DEPLOYMENT-RUMAHWEB.md`,
> `docs/LANJUT_024_Checklist-Hari-Deploy.md`.

## 1. Urutan deploy

### 1.1 Prasyarat

- **Node.js 20+** (`server/package.json` → `engines`).
- **MySQL 8** dengan basis data kosong `utf8mb4`. Skema **belum pernah diuji
  di MariaDB**, padahal hosting cPanel sering memakai MariaDB. Yang paling
  berisiko: `ROW_NUMBER() OVER` (Level-In), `CHECK`, indeks FULLTEXT (modul),
  dan `OPTIMIZE TABLE`. Uji `npm run migrasi` dan `npm test` di versi basis
  data hosting sebelum dipakai siswa.
- Folder `server/config/` ikut terunggah: `kartu-bantuan.json`,
  `tanda-bahaya.json`, `ngobrol-teks.json`, `materi.json`. Keempatnya dibaca
  saat server menyala; berkas yang rusak membuat server **menolak menyala**.
  Mengubahnya butuh restart.

### 1.2 Variabel lingkungan (`server/src/config/env.js`)

| Variabel | Wajib | Bawaan | Isi untuk produksi |
|---|---|---|---|
| `DB_HOST` | **ya** | — | host MySQL (cPanel: `localhost`) |
| `DB_PORT` | tidak | `3306` | |
| `DB_USER` | **ya** | — | biasanya berawalan nama akun cPanel |
| `DB_PASSWORD` | ya (boleh kosong hanya di lokal) | `''` | rahasia, hanya di `.env` server |
| `DB_NAME` | **ya** | — | |
| `ASAL_DIIZINKAN` | **ya** | — | asal web, mis. `https://edilakso.my.id`; **tidak boleh** `*` (server menolak) |
| `NODE_ENV` | disarankan | `development` | `production` (batas laju asli); jangan `test` |
| `PORT` | tidak | `3000` | biarkan hosting menentukan |
| `SESI_UMUR_HARI` | tidak | `90` | |
| `JUMLAH_PROXY` | tidak | `0` | biasanya `1` di belakang proxy cPanel; jangan lebih dari jumlah proxy sebenarnya |
| `LOKASI_DATA_KONTEN` | tidak | `../../MVP-PWA/data` | `data-konten` bila hanya folder `server/` yang diunggah |
| `OPENROUTER_API_KEY` | tidak | kosong = AI mati (503) | **biarkan kosong** sampai daftar periksa keselamatan (bagian 3) beres |
| `OPENROUTER_BASE_URL` | tidak | `https://openrouter.ai/api/v1` | jangan diubah (hanya untuk uji); selain `https://` ditolak |

Tabel env di `server/README.md` §6 sudah mencantumkan `OPENROUTER_API_KEY`
(LANJUT_060).

### 1.3 Langkah di server baru (dari folder `server/`)

1. `npm ci`
2. Isi `.env` dari `.env.production.example` (atau lewat pengaturan env hosting).
3. `npm run migrasi` — menjalankan migrasi yang belum pernah jalan, urut nama:

   | Migrasi | Isi |
   |---|---|
   | 001 | pengguna, sesi, percobaan masuk |
   | 002 | konten P0 (Linimasa, Khusus SMK, prodi, mapel, alumni, Daftar Periksa) |
   | 003 | kemajuan Daftar Periksa |
   | 004 | kartu |
   | 005 | Level-In: sesi & riwayat latihan, `konfigurasi_levelin` |
   | 006 | rumpun di Daftar Periksa |
   | 007 | gaya belajar |
   | 008 | profil prodi (F10) |
   | 009 | butir Daftar Periksa milik akun |
   | 010 | kelas 7–9 |
   | 011 | jenis sekolah |
   | 012 | persetujuan + `persetujuan_*` |
   | 013 | modul + `modul_*` |
   | 014 | `ngobrol_*` (batas pesan) |
   | 015 | `ai_aktif` (bawaan `0` sejak LANJUT_060), `ai_model`, `ai_data_collection`, `ai_zdr`, `ai_penyedia_only` |
   | 016 | `ai_modul_*`, `ai_web_*` |
   | 017 | `ai_web_mesin` |
   | 018 | tabel `pemakaian_ai_harian` (hitungan harian gabungan, tanpa id akun/isi), `ai_tarif_masuk_per_juta`, `ai_tarif_keluar_per_juta` |

   Migrasi berikutnya (019 dst.) mengikuti pola yang sama; `npm run migrasi`
   aman diulang.
4. `npm run benih` — mengisi konten dan **11 kunci Level-In** dari berkas JSON.
5. `npm run verifikasi-konten` — **hanya** untuk konten yang benar-benar sudah
   dicek orang. Tanda verifikasi di komputer pengembang **tidak ikut** ke
   server baru; harus ditandai ulang di produksi. Tanpa `--ya` hanya pratinjau.
6. **Sebelum siswa mendaftar**, atur konfigurasi pilot (bagian 1.4). Di
   server baru `ai_aktif` sudah `0` sejak LANJUT_060; **jangan** dinyalakan
   sebelum daftar periksa bagian 3 beres. Cek dengan
   `SELECT nilai FROM konfigurasi_levelin WHERE kunci = 'ai_aktif';`.
7. `npm start`, lalu cek:
   - `GET /health` (membalas `{ ok: true }` dan ping basis data ringan, tanpa data sensitif; LANJUT_061);
   - `GET /api/v1/sehat` (proses hidup, kompatibilitas);
   - `GET /api/v1/konten/prodi` (basis data & benih);
   - `GET /api/v1/konfigurasi/levelin` (harus 11 kunci);
   - `npm run smoke -- --url=<alamat>` (uji asap pasca-deploy otomatis; LANJUT_061).

**App:**
- **APK/AAB:** `LANJUT_App/eas.json` telah dibersihkan dari IP LAN `10.141.5.75` (LANJUT_061). Profil `preview` dan `production` kini memakai placeholder `https://api.GANTI-DOMAIN/api/v1`. Khalifa mengganti placeholder tersebut ke URL domain produksi sebelum menjalankan `eas build` (lihat panduan `docs/deploy-produksi.md`). Proteksi build gagal-cepat di `app.config.ts` akan menolak build bila placeholder belum diganti.
- **Web:** ikuti `DEPLOYMENT-RUMAHWEB.md` dan `docs/deploy-produksi.md` (app di root, landing page di `/tentang`).

### 1.4 Tabel konfigurasi `konfigurasi_levelin` (33 kunci)

Semua kunci dibaca **tiap permintaan**, jadi berlaku tanpa restart.

Cara mengubah:
- **Kunci Level-In** (11 kunci, tandai L): ubah di `MVP-PWA/data/levelin-konfig.json` (atau `data-konten/` di server), lalu `npm run benih`. **Jangan** mengubahnya dengan SQL: setiap `npm run benih` menimpa nilainya dari JSON (`server/src/db/benih/benih.js`, `benihKonfigurasiLevelin`). Hanya 11 kunci ini yang dikirim endpoint publik `/konfigurasi/levelin`.
- **Kunci lain** (dari migrasi): ubah dengan SQL, mis. `UPDATE konfigurasi_levelin SET nilai = '0' WHERE kunci = 'ai_aktif';`. Benih dan migrasi ulang tidak menimpanya.
- **Nilai tidak sah membuat fiturnya mati** (gagal-tertutup) untuk kunci `ai_*`, `ai_web_*`, dan `persetujuan_*`. Pengecualian: `ngobrol_batas_*` yang tidak sah membuat Ngobrol galat 500.

| Kunci | Bawaan | Arti | Catatan untuk pilot |
|---|---|---|---|
| `persetujuan_versi_kebijakan` | `1` | versi kebijakan privasi yang berlaku; harus sama dengan `versi` di `LANJUT_App/lib/kebijakan-privasi.json` | dinaikkan lewat migrasi baru, lihat bagian 2 |
| `persetujuan_versi_min_ortu` | `1` | versi minimum persetujuan orang tua/wali agar AI boleh dipakai | menaikkannya = semua surat harus dikumpulkan ulang |
| `modul_ukuran_maks_byte` | `5242880` | ukuran berkas modul maksimal (5 MB) | |
| `modul_karakter_maks` | `200000` | karakter teks per modul | |
| `modul_jumlah_maks` | `10` | modul per akun | |
| `ngobrol_batas_5_menit` | `10` | pesan Ngobrol per akun per 5 menit | |
| `ngobrol_batas_24_jam` | `50` | pesan per akun per 24 jam (pengendali biaya) | |
| `ai_aktif` | `0` (instalasi baru sejak LANJUT_060) | saklar AI: `0` = semua akun mendapat balasan uji coba, tanpa AI | **biarkan `0` saat rilis awal**; tanda bahaya akut tetap dijawab kartu bantuan. Basis data yang sudah dimigrasi sebelum LANJUT_060 **tetap** memakai nilai lamanya (biasanya `1`); periksa dan ubah sendiri dengan SQL |
| `ai_model` | `anthropic/claude-sonnet-5.5` | model OpenRouter | tidak sah → AI tidak tersedia (503) |
| `ai_data_collection` | `deny` | `provider.data_collection` OpenRouter | |
| `ai_zdr` | `0` | `1` = hanya endpoint tanpa penyimpanan data | putuskan setelah retensi dicek |
| `ai_penyedia_only` | kosong | batasi penyedia model (slug dipisah koma) | putuskan setelah retensi dicek |
| `ai_modul_aktif` | `1` | potongan modul boleh dikirim ke AI | `0` bila hak cipta modul belum diputuskan |
| `ai_modul_potongan_maks` | `3` | potongan per pertanyaan (sah 1–5) | |
| `ai_modul_skor_min` | `0.1` | ambang dasar skor FULLTEXT | |
| `ai_modul_kata_min` | `2` | kata bermakna yang sama (penyaring utama) | |
| `ai_web_aktif` | `0` | pencarian web | **biarkan `0`** sampai kebijakan data mesin pencari dicek |
| `ai_web_batas_harian` | `10` | pencarian web per akun per hari (memori proses) | angka akhir: Khalifa |
| `ai_web_hasil_maks` | `3` | hasil per pencarian | |
| `ai_web_mesin` | kosong | kosong = bawaan OpenRouter; `exa` = paksa Exa (US$0,007/permintaan menurut dok. OpenRouter); nilai lain mematikan web | |
| `ai_tarif_masuk_per_juta` | kosong | tarif token masuk (US$ per 1 juta token), hanya untuk perkiraan biaya di `npm run pemakaian-ai` | isi dari halaman harga model di OpenRouter; kosong = biaya tidak dihitung |
| `ai_tarif_keluar_per_juta` | kosong | tarif token keluar (US$ per 1 juta token) | sama; kedua tarif harus terisi |
| `aturan_versi` (L) | `1` | versi aturan klasifikasi keyakinan | |
| `ambang_overconfident` (L) | `0.4` | rate "yakin tapi salah" untuk pola terlalu yakin | perkiraan |
| `minimum_kartu` (L) | `5` | jawaban berkeyakinan minimal per mapel untuk kalibrasi | |
| `jendela_per_mapel` (L) | `50` | jawaban terbaru per mapel yang dihitung | |
| `keyakinan_tinggi_minimal` (L) | `4` | keyakinan ≥ ini = tinggi | app mengirim yakin=4, ragu=2, tebak=1 |
| `keyakinan_rendah_maksimal` (L) | `2` | keyakinan ≤ ini = rendah | |
| `akses_ringkasan_kalibrasi_sesi` (L) | `gratis` | | |
| `akses_tampilan_agregat_mapel` (L) | `gratis` | keputusan Khalifa 2 Okt 2026 | |
| `level_minimum_kartu` (L) | `10` | jawaban minimal per mapel sebelum level muncul | |
| `level_batas_bawah` (L) | `0.5` | di bawah ini = perlu penguatan dasar | |
| `level_batas_atas` (L) | `0.75` | di atas ini = sudah kuat | |

## 2. Urutan rilis kebijakan privasi

**Aturan (LANJUT_049, 056):** app dengan teks baru dirilis lebih dulu, baru
versi kebijakan dinaikkan. Teks v2 sudah ada di app, tetapi **nomornya
sengaja masih 1**.

**Kenapa urutannya penting:**
- Saat daftar, app mengirim nomor versinya. Server **menolak 409** bila nomor itu tidak sama dengan `persetujuan_versi_kebijakan` (`server/src/modul/auth/auth.layanan.js:64`). Akun tidak terbuat.
- Akun lama yang menerima versi lama melihat jendela "perbarui aplikasi" (`versi_app_berbeda`), dan **AI tertutup** sampai versi terbaru diterima.
- `tests/persetujuan.test.js` (tes "versi kebijakan di app = versi yang berlaku") mewajibkan nomor di JSON sama dengan nomor yang berlaku di server. Jadi kenaikan nomor di JSON dan migrasinya harus satu commit.

**Langkah:**
1. Isi 29 `[ISI]` (`docs/kebijakan-v2-klaim-vs-kode.md`, bagian "Yang harus dilengkapi manusia") dan minta tinjauan orang yang paham UU PDP.
2. Perbarui teks yang masih menyebut "fitur AI nanti" dan teks yang belum menyebut AI (peta F12). Jalankan `npm run dokumen-kebijakan` dan tes kebijakan.
3. Dalam satu commit: `versi` di `LANJUT_App/lib/kebijakan-privasi.json` naik ke 2, plus migrasi baru yang menaikkan `persetujuan_versi_kebijakan` ke 2. Bila perubahan butuh persetujuan ulang orang tua/wali, naikkan juga `persetujuan_versi_min_ortu`.
4. **Bila belum ada siswa sungguhan** (keadaan sekarang): rilis app baru (web + APK) dan jalankan migrasi di server pada waktu yang sama, **sebelum** app dibagikan ke siswa. Tidak ada pengguna yang terkena jeda.
5. **Bila sudah ada siswa** (perubahan berikutnya):
   - **Web:** deploy app dan jalankan migrasi dalam satu jendela pemeliharaan.
   - **APK:** bagikan APK baru dulu dan minta siswa memperbarui; baru jalankan migrasi.
   - Selama jeda, siswa dengan APK lama tidak bisa daftar (409) dan AI-nya tertutup sampai mereka memperbarui. Inilah risiko yang diterima.
6. Isi `[ISI: nomor versi saat dirilis]` di surat orang tua/wali dengan nomor yang sama, baru cetak.
7. Baru setelah itu catat persetujuan orang tua/wali sungguhan (`npm run persetujuan-ortu`).

**Risiko:**
- Nomor JSON dan server berbeda → pendaftaran gagal 409 dan AI tertutup untuk semua akun.
- Surat mengacu nomor yang salah → persetujuan tidak sah untuk versi yang berlaku.
- Persetujuan orang tua/wali dicatat sebelum kebijakan final → harus dikumpulkan ulang.

## 3. Daftar periksa keselamatan sebelum siswa sungguhan

Bagian ini berlaku untuk **menyalakan AI bagi siswa**. Rilis uji tanpa AI
cukup dengan `ai_aktif = 0` dan tidak mencatat persetujuan orang tua/wali.

- [ ] Guru BK meninjau `server/config/tanda-bahaya.json`, termasuk tambahan LANJUT_060 untuk A06 "diancam sebar foto" dan A07 "pengen hilang aja" (kombinasi kata `akut_kombinasi`, frasa "mau hilang", "foto aku disebarin", dll.; A06–A24 di `tests/skenario-ai/skenario.json`) dan **positif palsu** yang tercatat di `positif_palsu_diketahui` (mis. "jerawatku mau hilang", "aku ngancam adikku mau nyebar foto lucunya"). Tim menerima positif palsu itu: lebih baik siswa sesekali mendapat kartu bantuan yang tidak perlu daripada tanda bahaya terlewat.
- [ ] Guru BK meninjau `server/config/kartu-bantuan.json`. **SAPA 129** dicek ke sumber resmi lalu `terverifikasi: true` dan `tanggal_cek` diisi, **atau** tetap tersembunyi (saat ini `false`, tidak pernah tampil). Isi `tanggal_cek` juga untuk Healing119 dan 112 (saat ini `null`).
- [x] Pesan bertanda bahaya akut tidak ikut di riwayat yang dikirim ke AI (peta F4): **dibangun di LANJUT_060**. Server mengganti pesan siswa yang akut dengan penanda netral `[siswa menyampaikan hal yang sangat berat; aplikasi sudah menampilkan kartu bantuan]`. Sisa untuk guru BK: meninjau kalimat penanda itu.
- [ ] Kebijakan privasi v2: semua `[ISI]` terisi, ditinjau hukum, versi dinaikkan (bagian 2).
- [ ] Surat orang tua/wali siap: kop sekolah, penandatangan, nomor versi, cara menyimpan surat asli.
- [ ] Retensi OpenRouter dan penyedia model dicek (`[ISI]` I12); putuskan `ai_zdr` dan `ai_penyedia_only`.
- [ ] Kunci OpenRouter khusus produksi dengan **batas kredit** terpasang di dasbor OpenRouter, hanya di `.env` server.
- [ ] Saklar `ai_aktif` diuji di server produksi: `0` (bawaan instalasi baru) → balasan uji coba; `1` → AI; tanda bahaya akut tetap dijawab kartu bantuan di kedua keadaan.
- [ ] Kedua tarif `ai_tarif_*_per_juta` diisi dari harga model yang dipakai, lalu `npm run pemakaian-ai` dicoba di server produksi (bagian 5).
- [ ] Evaluasi lapis 2 dijalankan (`EVALUASI_AI_IZIN=ya npm run evaluasi-ai -- --ya-panggil-penyedia`) dan dinilai Khalifa & guru BK (`docs/skenario-ai.md`).
- [ ] `ai_web_aktif` tetap `0` sampai kebijakan data mesin pencari dicek (`[ISI]` I11); bila dinyalakan, putuskan `ai_web_mesin` dan `ai_web_batas_harian`.
- [ ] `ai_modul_aktif`: putuskan setelah tinjauan hak cipta modul (`[ISI]` I10).
- [ ] Jumlah siswa pilot dan cara moderasi diputuskan (peta D4, D5).
- [ ] Kontak resmi tim tertulis di kebijakan (`[ISI]` I21) dan bisa dihubungi selama pilot.

## 4. Hal teknis yang masih terbuka

| Hal | Keadaan | Yang perlu dilakukan | Penanggung jawab |
|---|---|---|---|
| IP lama di `eas.json` | **Selesai (LANJUT_061):** dibersihkan dari `10.141.5.75`, profil `preview` & `production` memakai `https://api.GANTI-DOMAIN/api/v1` dengan validasi gagal-cepat | Khalifa mengganti placeholder sebelum `eas build` | Khalifa |
| Dev client untuk pemilih berkas | `expo-document-picker` masuk 3 Okt (`9488647`), sesudah dev client 27 Sep (`cc023e4`) | Build ulang dev client. Kode diunggah ke Expo, butuh persetujuan Khalifa | Khalifa |
| Uji di HP Android | Fitur LANJUT_039–058 hanya diuji di web 360 px dan tes server | Uji di HP fisik: Arsip, modul, Latihan + keyakinan, Level-In, F10, Ngobrol, terima kebijakan | Khalifa |
| Kerentanan app | 29 temuan `npm audit` (4 paket akar) sengaja ditinggal | **Jangan** `npm audit fix` di `LANJUT_App/` (menyelipkan paket SDK 58 atau menurunkan ke Expo 44). Tinjau saat naik SDK 58 | Khalifa |
| Commit belum di-push | **77 commit** di depan `origin/main` (terakhir di remote `85a7ff0`) | Push | Khalifa |
| MariaDB | Belum pernah diuji | Uji migrasi & `npm test` di DB hosting | Khalifa |
| Skrip E2E | **Selesai (LANJUT_060):** tersimpan di `LANJUT_App/e2e/` beserta README cara menjalankan | Jalankan ulang sebelum rilis (butuh Playwright dan export web) | Khalifa |
| README env | **Selesai (LANJUT_060):** `OPENROUTER_API_KEY` ada di tabel env `server/README.md` §6 | — | — |
| Landing page | Tombol ke `https://edilakso.my.id/`; penempatan `/tentang` belum dicek | Cek setelah DNS beres | Khalifa |

## 5. Rencana pemantauan minimal saat pilot

Prinsipnya: **tidak ada isi obrolan yang disimpan atau dicatat** (dijaga
`tests/ngobrol.test.js`, "isi obrolan tidak tercatat di log server"). Tim
bisa melihat dua sumber: hitungan harian di basis data (sejak LANJUT_060) dan
keluaran konsol server (log hosting).

### Hitungan harian tersimpan (LANJUT_060)

Tabel `pemakaian_ai_harian` (migrasi 018) berisi **satu baris per tanggal WIB
untuk semua pengguna digabung**. Tidak ada id akun, isi pesan, kueri, atau
alamat web; tesnya `tests/ngobrol.test.js` ("skema hanya tanggal + angka").
Setiap `POST /ngobrol` menambah hitungannya dengan satu `INSERT … ON
DUPLICATE KEY UPDATE` (atomik). Penulisan **tidak ditunggu**: bila basis data
gagal, siswa tetap mendapat jawaban dan log hanya mencatat
`[pemakaian] gagal dicatat (<kode galat>)`.

| Kolom | Bertambah saat |
|---|---|
| `panggilan_ai` | permintaan ke penyedia AI berhasil (jawaban dan pencarian web dihitung masing-masing) |
| `token_masuk`, `token_keluar` | dari `usage.prompt_tokens` / `usage.completion_tokens` di respons penyedia; 0 bila tidak ada |
| `balasan_stub` | `ai_aktif = 0`, siswa mendapat balasan uji coba |
| `tanda_akut` | tanda bahaya akut (di rute maupun lapis kedua di layanan) |
| `tanda_ringan` | tanda bahaya ringan |
| `tanda_model` | model menilai siswa butuh bantuan (kartu bantuan tampil) |
| `galat_penyedia` | penyedia gagal (jawaban atau pencarian web) |
| `web_dipakai`, `web_kuota_habis` | pencarian web berhasil / kuota harian akun habis |
| `modul_dipakai` | jawaban memakai potongan modul |

Ringkasan dari folder `server/`:

```bash
npm run pemakaian-ai              # 7 hari terakhir (bawaan)
npm run pemakaian-ai -- --hari=30 # 1–366 hari
```

Perkiraan biaya hanya muncul bila `ai_tarif_masuk_per_juta` **dan**
`ai_tarif_keluar_per_juta` terisi (bagian 1.4). Contoh keluaran dengan data
uji (tarif contoh, bukan harga sebenarnya):

```text
Pemakaian AI 7 hari (2026-10-03 s.d. 2026-10-09, WIB). Hitungan gabungan semua akun, tanpa id akun dan tanpa isi.

Tanggal     Panggilan  Token masuk  Token keluar  Uji coba  Akut  Ringan  Model  Galat  Web  Web habis  Modul  Biaya (US$)
2026-10-08         12        24000          3000         0     1       2      0      1    0          0      3       0.0780
2026-10-09          8        16000          2000         4     0       1      1      0    2          1      1       0.0520
--------------------------------------------------------------------------------------------------------------------------
Jumlah             20        40000          5000         4     1       3      1      1    2          1      4       0.1300

Perkiraan biaya: US$0.1300 (tarif masuk US$2/juta, keluar US$10/juta token). Tagihan sebenarnya: dasbor OpenRouter.
Kolom: Panggilan = permintaan ke penyedia yang berhasil (jawaban + web); Uji coba = balasan saat ai_aktif = 0; …
```

Angka ini perkiraan dari token yang dilaporkan penyedia. Biaya pencarian web
(mis. Exa) dan pembulatan penyedia tidak ikut; acuan tagihan tetap dasbor
OpenRouter.

### Yang ada di log

| Yang dipantau | Sumber di log | Contoh baris |
|---|---|---|
| Jumlah panggilan Ngobrol dan hasilnya | log akses (`server/src/app.js`) | `POST /api/v1/ngobrol 200 1234ms pengguna=<id>`; 403 = belum diizinkan, 429 = lewat batas, 502 = penyedia gagal, 503 = AI tidak tersedia |
| Penanda keselamatan | `server/src/modul/ngobrol/keselamatan.js` | `[keselamatan] tingkat=akut waktu=…` (juga `ringan`, `model`) |
| Galat penyedia | `ngobrol.layanan.js` | `[ngobrol] penyedia AI menolak permintaan (HTTP 402)`, `[ngobrol] pencarian web: …`, `[ngobrol] konfigurasi penyedia AI tidak sah …` |
| Pemakaian materi | `ngobrol.layanan.js` | `[ngobrol] materi modul=1 web=0` (`web_habis` bila kuota habis) |
| Hitungan harian gagal ditulis | `server/src/modul/ngobrol/pemakaian.js` | `[pemakaian] gagal dicatat (ECONNRESET)` |

Hitungan cepat dari log (ganti `<log>` dengan berkas log hosting):

```bash
grep -c "POST /api/v1/ngobrol 200" <log>        # balasan berhasil
grep -c "POST /api/v1/ngobrol 50[23]" <log>     # AI gagal / tidak tersedia
grep -c "\[keselamatan\] tingkat=akut" <log>     # tanda bahaya akut
grep -c "\[keselamatan\] tingkat=model" <log>    # model menilai siswa butuh bantuan
```

### Celah

Sudah ditutup di LANJUT_060:

- ~~Tidak ada hitungan tersimpan.~~ Ada `pemakaian_ai_harian` + `npm run pemakaian-ai`. Belum ada dasbor; ringkasan dibaca dari terminal server.
- ~~Tidak ada biaya atau token per hari di server.~~ `usage` dibaca (`penyedia-ai.js`, `bacaToken`) dan dijumlahkan per hari. Pengendali biaya tetap batas kredit kunci dan `ngobrol_batas_*`; angka LANJUT hanya perkiraan.

Masih terbuka:

1. **Tidak ada peringatan otomatis** untuk lonjakan tanda bahaya, galat penyedia, atau 402 (kredit habis). Tim harus menjalankan `npm run pemakaian-ai` sendiri, mis. tiap pagi selama pilot.
2. **Tidak ada jalur moderasi** (peta D4). Karena isi tidak disimpan, tim tidak bisa membaca ulang percakapan; perlu cara lain, mis. siswa melapor.
3. **Baris keselamatan bisa dikaitkan ke akun.** Baris `[keselamatan]` tanpa id akun, tetapi baris log akses permintaan yang sama memuat `pengguna=<id>` pada waktu yang sama (dicatat di Lampiran A kebijakan). Akses ke log harus dibatasi. Tabel `pemakaian_ai_harian` tidak punya masalah ini (hanya per tanggal).
4. **Kuota web dan batas laju hanya di memori.** Hilang saat restart dan tidak dibagi antarproses.
5. **Masa simpan log dan tabel pemakaian belum ditetapkan** (`[ISI]` I2 dan I16).
