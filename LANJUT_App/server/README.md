# LANJUT — Server (Fondasi Backend)

Backend Express + MySQL untuk LANJUT. Dirancang di
`docs/SDD-Backend-Foundation.md` — baca dokumen itu untuk alasan tiap
keputusan. Berkas ini hanya menjelaskan **cara menjalankan**.

Status implementasi & batasan yang perlu diketahui ada di bagian
["Status & yang belum selesai"](#status--yang-belum-selesai) di bawah.

## Dependensi

Persis 8, sesuai §2.1 SDD: `express`, `mysql2`, `bcryptjs`, `zod`,
`express-rate-limit`, `helmet`, `cors`, `dotenv`. Jangan menambah dependensi
baru tanpa mencatat alasannya di sini.

## 1. Menyiapkan lingkungan

Butuh **Node.js 20+** dan **MySQL 8** yang menyala (lokal, atau layanan
staging/produksi apa pun — konfigurasi di bawah tidak mengasumsikan satu
penyedia hosting tertentu, sesuai keputusan PM).

```bash
cd server
npm install
```

Buat basis data kosong (nama bebas, cocokkan dengan `.env`):

```sql
CREATE DATABASE lanjut CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Salin `.env.example` menjadi `.env` dan isi nilainya:

```bash
cp .env.example .env
```

| Variabel | Contoh (lokal) | Keterangan |
|---|---|---|
| `PORT` | `3000` | Port HTTP server |
| `NODE_ENV` | `development` | `development` \| `test` \| `production` |
| `DB_HOST` | `127.0.0.1` | Host MySQL |
| `DB_PORT` | `3306` | Port MySQL |
| `DB_USER` | `root` | — |
| `DB_PASSWORD` | (kosong bila tanpa sandi) | — |
| `DB_NAME` | `lanjut` | Basis data yang sudah dibuat di atas |
| `ASAL_DIIZINKAN` | `http://localhost:5500` | CORS, dipisah koma, **tidak pernah** `*` |
| `SESI_UMUR_HARI` | `90` | Umur sesi login, bergulir (§5.3) |

Server **menolak menyala** (gagal cepat) bila salah satu variabel wajib
kosong — pesan galatnya menyebutkan variabel mana yang kurang.

## 2. Migrasi & benih

```bash
npm run migrasi   # menjalankan server/src/db/migrasi/001..006 yang belum jalan
npm run benih     # mengisi konten dari MVP-PWA/data/*.json (idempoten, aman diulang)
```

Migrasi dicatat di tabel `_migrasi` — hanya berkas yang belum pernah
dijalankan yang dieksekusi. Migrasi **tidak pernah** disunting setelah
dijalankan di server tayang; perbaikan selalu berkas baru bernomor lebih
tinggi (§3.6).

Benih membaca `MVP-PWA/data/*.json` langsung (tidak menyalin isinya ke SQL) dan
memakai `INSERT ... ON DUPLICATE KEY UPDATE` — aman dijalankan berkali-kali.

## 3. Menjalankan server

```bash
npm start
# atau untuk pengembangan dengan auto-restart, pakai `node --watch`:
node --watch src/index.js
```

Cek server hidup:

```bash
curl http://localhost:3000/api/v1/sehat
# { "ok": true, "data": { "status": "ok", "waktu": "..." } }
```

## 4. Menjalankan test

Test di `tests/*.test.js` adalah **uji integrasi** — butuh MySQL nyata dengan
migrasi §3.6 sudah dijalankan (tidak memakai mock). Siapkan **basis data
terpisah untuk test** (jangan pakai basis data pengembangan/produksi, karena
test membuat pengguna & kartu sungguhan):

```bash
# .env yang dipakai server dan tests/ SAMA (via dotenv) — arahkan DB_NAME ke
# basis data khusus test sebelum menjalankan, mis. `lanjut_test`.
npm run migrasi
npm run benih     # opsional, sebagian test kartu memakai mapel/kartu resmi
npm test
```

`NODE_ENV=test` menaikkan batas `express-rate-limit` (§8.2) supaya rangkaian
test yang memanggil endpoint `/auth/*` berkali-kali dari mesin yang sama tidak
saling memblokir — ini **tidak** mengubah angka pembatasan di lingkungan lain.

Gerbang SQL (§9.4):

```bash
npm run periksa-sql
```

Memeriksa: (1) tidak ada kata kunci SQL di luar `*.repo.js` (kecuali
`src/db/` — pelari migrasi & benih), (2) tidak ada `${...}` di dalam string
SQL, (3) setiap query atas tabel pribadi memfilter `pengguna_id`/`pemilik_id`.

## 5. Struktur folder

Lihat §9.2 `docs/SDD-Backend-Foundation.md` untuk rancangan lengkapnya. Tiga
lapis per modul, batasnya tegas:

| Lapis | Berkas | Boleh | Dilarang |
|---|---|---|---|
| Rute | `*.rute.js` | Baca `req`, panggil layanan, susun respons | SQL, aturan bisnis |
| Layanan | `*.layanan.js` | Aturan bisnis, panggil repositori | SQL, sentuh `req`/`res` |
| Repositori | `*.repo.js` | **SQL (satu-satunya tempat)** | Sentuh `req`/`res` |

## Status & yang belum selesai

Ditulis apa adanya supaya tidak dianggap kelalaian. Tahap mengacu ke §9.3
`docs/SDD-Backend-Foundation.md`.

- **B1–B5 selesai penuh**: kerangka server, migrasi 001–005, benih, auth
  (daftar/masuk/keluar/keluar-semua/saya/ubah-sandi), konten publik F1–F5,
  `kemajuan` (F5), `kartu` (F6) dengan uji otorisasi kepemilikan.
- **B6 (Level-In) sebagian**: endpoint, skema, dan repositori sudah lengkap
  dan sudah diuji manual untuk jalur PENULISAN (`POST /sesi-latihan`,
  `PATCH /sesi-latihan/{id}`, `POST /riwayat-latihan`,
  `GET /konfigurasi/levelin`). **Belum bisa dipakai**: `GET
  /kalibrasi/ringkasan` dan `GET /saran-harian` — keduanya bergantung pada
  `src/modul/levelin/keputusan.js`, yang **sengaja dibiarkan sebagai
  placeholder** karena `app/assets/levelin.js` (sumber kebenaran fungsi
  keputusan Level-In, dikerjakan ui-engineer) belum ada di repositori saat
  berkas ini ditulis. Mengisi placeholder dengan tebakan sendiri akan
  melanggar B-K6/RB5 (dua sumber kebenaran untuk angka kalibrasi yang sama).
  **Cara menyelesaikan**: baca komentar di kepala
  `src/modul/levelin/keputusan.js` — langkahnya adalah menyalin persis
  lapisan 2 (`gapNumerik`, `klasifikasiKartu`, `agregatPerMapel`,
  `ringkasSesi`, `saranHarian`) dari `app/assets/levelin.js` setelah berkas
  itu ada, lalu mengisi `tests/levelin-keputusan.test.js` dengan kasus uji
  yang sama dengan `app/tools/test-levelin.js`.
- **B7 selesai**: `POST /sinkron/klaim` — idempoten, menolak baris milik
  pengguna lain (`TIDAK_BERHAK`), tidak pernah memindahkan kepemilikan. Diuji
  di `tests/sinkron.test.js`.
- **B8, B9 tidak dikerjakan** — di luar cakupan tugas ini (penyambungan
  klien `daftar.html`/`masuk.html`/`akun.html`, dan penyiapan tayang/HTTPS/
  cadangan). Lihat §9.3 SDD.

### Penyimpangan kecil dari SDD (dengan alasan)

1. **Tabel `kategori_checklist` ditambahkan** (migrasi 002), di luar daftar
   tabel eksplisit §3.4. `MVP-PWA/data/checklist.json` mengelompokkan butir
   checklist ke dalam kategori tampilan ("Berkas Pendaftaran", dst.), dan
   catatan di berkas JSON itu sendiri menyarankan "kalau nanti masuk basis
   data, kategori sebaiknya jadi tabel sendiri, bukan teks bebas." §3.4 SDD
   backend tidak menyebut tabel ini (kemungkinan luput tercatat saat
   perancangan). Ditambahkan seminimal mungkin (2 kolom + FK dari
   `butir_daftar_periksa.kategori_id`) supaya `GET /konten/checklist` bisa
   mengembalikan pengelompokan yang sama seperti JSON sekarang, tanpa
   mengubah 5 kolom inti `butir_daftar_periksa` yang memang dikunci §3.4.
2. **`percobaanMasuk.repo.js` sebagai berkas terpisah** di `modul/auth/` —
   tidak disebut eksplisit di pohon folder §9.2, tetapi dibutuhkan supaya SQL
   untuk tabel `percobaan_masuk` (§8.2) tetap hanya hidup di berkas
   `*.repo.js` (aturan §2.2), bukan disisipkan ke `sesi.repo.js` yang secara
   semantik untuk tabel berbeda.
3. **Pemetaan medan `cerita-alumni.json`** — item di berkas itu memakai nama
   medan `sumber` untuk nilai `"contoh"`, yang secara semantik cocok dengan
   kolom `asal` (nilai sejenis `"mockup"/"contoh"/"resmi"` di berkas JSON
   lain), bukan dengan kolom `sumber` (kelas kepercayaan
   resmi/pengguna/mitra, `rancangan-arsip-latihan-banksoal.md` §1). Benih
   memetakan: kolom `sumber` = `'resmi'` (dikurasi tim), kolom `asal` = nilai
   asli `item.sumber`. Nilai isi (teks, `izin_tayang`, `tayang`) **tidak**
   diubah — lihat komentar lengkap di `src/db/benih/benih.js`.
4. **`§6.6` (jam perangkat salah) diimplementasikan sebagian.** Waktu yang
   dikirim klien (`dijawab_pada`, `dimulai_pada`, `selesai_pada`,
   `selesai_pada` klaim kemajuan) diterima apa adanya **hanya bila** selisih
   dengan jam server ≤ 24 jam; di luar itu, server memakai jamnya sendiri
   (`src/util/waktu.js#keDbDariKlien`). Ini penerapan literal aturan §6.6,
   tetapi belum ada uji otomatis khusus untuk kasus tepi ini — hanya diuji
   manual.
5. **`PATCH /kartu/{id}` memakai `CASE WHEN ... THEN ... ELSE kolom END`**,
   bukan merakit klausa `SET` secara dinamis dari daftar kolom yang berubah.
   Ini supaya SQL tetap 100% statis (tanpa `${...}` sama sekali di dalam
   string SQL) sesuai larangan literal §2.2 aturan 2, termasuk untuk kolom
   yang diperbarui sebagian.

### Yang belum diuji otomatis (diuji manual saja)

- Endpoint konten publik (F1–F5) — diverifikasi lewat `curl` manual, belum
  punya `tests/konten.test.js` tersendiri.
- `kemajuan` (F5) — diverifikasi manual, belum punya berkas test khusus.
- `POST /sesi-latihan`, `PATCH /sesi-latihan/{id}`, `POST /riwayat-latihan`,
  `GET /konfigurasi/levelin` — diverifikasi manual (lihat log di atas), belum
  punya test otomatis karena menunggu B6 selesai penuh (lihat di atas).

## Cara test manual cepat (tanpa menulis test)

```bash
# Daftar
curl -s -X POST http://localhost:3000/api/v1/auth/daftar \
  -H "Content-Type: application/json" \
  -d '{"nama_pengguna":"budi123","kata_sandi":"sandiaman1"}'

# Simpan token dari respons di atas, lalu:
curl -s http://localhost:3000/api/v1/auth/saya -H "Authorization: Bearer <token>"

# Konten publik, tanpa login:
curl -s http://localhost:3000/api/v1/konten/linimasa
curl -s http://localhost:3000/api/v1/konten/checklist?kelas=12&jalur=SNBP
curl -s "http://localhost:3000/api/v1/konten/checklist?kelas=12&jalur=SNBP&rumpun=Teknologi%20%26%20Rekayasa"
```

### Filter rumpun di checklist (migrasi 006, LANJUT_007)

- Kolom `butir_daftar_periksa.berlaku_untuk_rumpun`: daftar rumpun dipisah
  koma, nilainya sama persis dengan `prodi.rumpun` (mis. `Teknologi & Rekayasa`).
  `NULL` = butir umum, berlaku untuk semua rumpun.
- `GET /konten/checklist?rumpun=` mengembalikan butir umum **ditambah** butir
  khusus rumpun itu. Rumpun yang tidak cocok butir mana pun → hanya butir umum.
- **Beda dari `kelas`/`jalur`:** tanpa `rumpun`, butir khusus rumpun **tidak**
  ikut (bukan "semua"). Klien lama yang belum mengirim `rumpun` tetap mendapat
  hasil persis seperti sebelum kolom ini ada, dan hitungan X/Y-nya tidak
  bertambah oleh butir rumpun lain.
- Tiap butir di respons kini punya `berlaku_untuk_rumpun`: `null` (umum) atau
  array rumpun.
- Butir khusus rumpun belum ada; mengisinya kerja tim konten, lewat
  `MVP-PWA/data/checklist.json` + `npm run benih` (lihat di bawah).

**Menambah butir khusus rumpun (tim konten).** Di `MVP-PWA/data/checklist.json`,
beri butir medan opsional `berlaku_untuk_rumpun` berisi array nama rumpun,
ditulis **persis** seperti `rumpun` di `prodi.json`:

```json
{ "id": "surat-sehat", "judul": "…", "urutan": 12,
  "berlaku_untuk_kelas": ["12"], "berlaku_untuk_jalur": ["SNBP", "SNBT"],
  "berlaku_untuk_rumpun": ["Kesehatan"] }
```

Lalu jalankan `npm run benih`. Butir tanpa medan ini (atau array kosong) tetap
berlaku untuk semua rumpun. Nama rumpun yang tidak dikenal membuat benih
berhenti dengan pesan galat berisi daftar pilihan yang sah, sebelum ada data
checklist yang ditulis. Contoh lengkap: `tests/contoh/checklist-contoh-rumpun.json`.
