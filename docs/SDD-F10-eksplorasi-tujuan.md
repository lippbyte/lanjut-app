# SDD — F10 Eksplorasi Tujuan (v1.1)

**Status:** rancangan siap dikerjakan (backend-engineer + ui-engineer)
**Tanggal:** 31 Agu 2026
**Sumber kebenaran fungsional:** `docs/eksplorasi-tujuan-instruksi.md` (spec F10) dan `docs/prd-sdd-lanjut.md` (PRD/SDD induk).
**Sumber data:** `docs/riset-top-prodi-lengkap.md` (laporan riset 18 prodi, SNBP/SNBT 2025–2026).
**Referensi desain:** `LANJUT UI mockups/F10-eksplorasi-tujuan-DESIGN.md`.

> Dokumen ini **tidak mengubah requirement**. Kalau ada yang butuh keputusan tapi datanya ambigu, keputusannya diambil dengan opsi paling aman dan dicatat di §10 Pertanyaan Terbuka.

---

## A. Ringkasan Pendekatan Teknis

F10 adalah **satu halaman statis baru** (`app/eksplorasi-tujuan.html`) plus **satu berkas data baru** (`app/data/profil-prodi.json`), disambungkan lewat **satu fungsi baru** di `app/assets/app.js` (`pasangEksplorasiTujuan()`), memakai pola yang sudah dipakai 13 layar v1: markup contoh hidup di HTML + `muatData()` + `gantiIsi()`/`isiSlot()` + `data-keadaan` untuk keadaan kosong/galat.

Empat hal yang menentukan rancangan ini:

1. **Tanpa pertanyaan cabang baru.** F10 selalu masuk membawa satu prodi (spec §2). Prodi dibaca dari parameter URL `?prodi=<id>` (dipasang CTA di `pilih-mapel.html`), dengan cadangan `LANJUT.profil.baca().prodi_impian` dari `localStorage` kunci `lanjut.profil.v1`.
2. **Data per kelompok punya status sendiri.** `status_sumber` bukan satu string per prodi, melainkan objek `{peminat, mata_kuliah, profesi, kampus}` — konsisten dengan cara laporan riset menandai Terverifikasi/Perkiraan (spec §3 baris 45).
3. **Tidak ada field gaji, tidak ada angka yang ditambal.** Kalau daftar mata kuliah cuma dapat 2 butir dari sumber, yang tampil 2 butir bertanda "Perkiraan" — bukan 4 butir hasil karangan.
4. **Opsi A dipakai** (spec §4): `data/prodi.json` diselaraskan menjadi persis 18 prodi ini, supaya setiap hasil F3 punya lanjutan yang lengkap. Fallback tetap dibangun sebagai jaring pengaman, bukan sebagai jalan utama.

**Yang bukan bagian F10:** endpoint API baru, tabel basis data baru yang aktif, service worker, dan tes bakat-minat (spec §8).

---

## B. Tech Stack Final (konfirmasi, bukan keputusan baru)

| Lapis | Keputusan | Alasan |
|---|---|---|
| Klien | HTML statis + CSS token + JavaScript murni (tanpa framework), satu berkas `assets/app.js` | PRD §8 sudah mengunci PWA satu basis kode; F10 tidak punya kebutuhan yang membenarkan penambahan alat baru |
| Data F10 | Berkas JSON statis `app/data/profil-prodi.json`, dimuat lewat `LANJUT.muatData('profil-prodi')` | Spec §8: bukan integrasi PDDikti real-time; data diperbarui manual per siklus penerimaan |
| Penyimpanan pengguna | `localStorage` — kunci `lanjut.profil.v1`, `lanjut.checklist.progres.v1`, `lanjut.checklist.tambahan.v1` | Kunci yang **sudah ada**; F10 tidak menambah kunci baru sama sekali |
| Gaya | `assets/tokens.css` (token) + `assets/app.css` (komponen) | Uji `test-desain.js` mengunci keutuhan token dan larangan warna merah/oranye |
| Backend | **Tidak dipakai di F10.** `server/` tetap seperti sekarang | F10 murni konten statis; menambah endpoint hanya menambah permukaan galat tanpa nilai baru |
| Uji | `app/tools/check.js`, `test-app.js`, `test-desain.js` (lewat `validasi.js`) | Ketiganya memindai seluruh `*.html` otomatis, jadi halaman baru langsung ikut teraudit |

**Konsekuensi yang diterima:** data 18 prodi harus di-*refresh* manual tiap tahun penerimaan. Mitigasi: `diperiksa_pada` di kepala berkas + disclaimer wajib tampil (lihat §9).

---

## C. Rancangan Data

### C.1 Skema `app/data/profil-prodi.json`

Kepala berkas mengikuti kaidah PRD §12 yang sudah dipakai seluruh berkas `data/*.json`.

| Field (kepala berkas) | Tipe | Nilai untuk F10 | Catatan |
|---|---|---|---|
| `_catatan` | string | penjelasan entitas | pola sama dengan `prodi.json` |
| `sumber` | string | `"resmi"` | PRD §12 |
| `pemilik` | string | `"tim"` | PRD §12 |
| `diperiksa_pada` | string | `"2026-08-31"` | tanggal laporan riset disusun; **boleh diisi** karena `status` ≠ `belum_diverifikasi` (lihat §8.3) |
| `url_sumber` | string | `"https://snpmb.bppp.kemdikbud.go.id/"` | rujukan utama angka peminat |
| `status` | string | `"terverifikasi_sebagian"` | nilai baru; alasannya di §8.3 |
| `asal` | string | `"riset"` | bukan `"mockup"` — isinya benar-benar dari laporan riset |
| `data` | array | 18 entri | **wajib bernama `data`** supaya helper `larik()` di `app.js` mengenalinya |

| Field (per entri) | Tipe | Wajib | Aturan |
|---|---|---|---|
| `id` | string (slug) | ya | unik; **sama persis** dengan `id` di `prodi.json` |
| `nama` | string | ya | nama tampil; **sama persis** dengan `nama` di `prodi.json` |
| `jenjang` | string | ya | `"D3"` \| `"D4"` \| `"D3/D4"` \| `"S1"` \| `"S1 + profesi"` \| `"S1 + Ners"` |
| `rumpun` | string | ya | salah satu dari 4 rumpun (§C.3); dipakai untuk mengelompokkan daftar di layar fallback |
| `badge_relevan_smk` | boolean | ya | `true` hanya untuk 3 prodi (spec §5 catatan kaki) |
| `peminat` | objek | ya | `{ jumlah:int, kampus:string, tahun:int, jalur:"SNBP"\|"SNBT", sumber:"SNPMB" }` |
| `diterima` | int \| null | ya | `null` bila laporan riset tidak punya pasangan angka diterima |
| `mata_kuliah` | array string | ya | 1–6 butir. **Jangan ditambal** supaya genap; kalau kosong, layar memakai teks "masih kami siapkan" |
| `profesi` | array string | ya | 2–4 butir; string saja, tanpa deskripsi (deskripsi tidak terverifikasi — lihat §8.2) |
| `kampus` | array objek | ya | 1–5 butir `{ nama, jenis, jalur_masuk[] }`; urutan diatur aturan §C.4 |
| `kampus[].jenis` | string | ya | `"PTN Akademik"` \| `"PTN Vokasi"` \| `"PTS"` \| `"Kedinasan"` |
| `kampus[].jalur_masuk` | array string | ya | `"SNBP"` \| `"SNBT"` \| `"Mandiri"` \| `"RPL"` |
| `status_sumber` | objek | ya | `{ peminat, mata_kuliah, profesi, kampus }`, tiap nilai `"Terverifikasi"` \| `"Perkiraan"` |
| `catatan_studi` | string \| null | ya (boleh null) | **tampil di layar**, di bawah daftar mata kuliah (mis. tahap profesi/koas, syarat STR) |
| `_catatan_data` | string \| null | ya (boleh null) | **tidak dirender**; catatan keterbatasan data untuk tim |

**Field yang sengaja TIDAK ADA:** `gaji` (spec §3 & §8), `sertifikasi` (hanya tersedia untuk 1 dari 18 prodi — data timpang, ditunda), `rasio_keketatan` (dihitung saat render, lihat §E.4), dan `deskripsi` pada `profesi`.

**Aturan turunan yang wajib dipegang penulis data:**
- `status_sumber.*` = `"Perkiraan"` bila sumbernya campuran atau sekunder. Konservatif menang: ragu → `"Perkiraan"`.
- Kalau `mata_kuliah` diisi gambaran umum (bukan kurikulum resmi satu kampus), `status_sumber.mata_kuliah` **wajib** `"Perkiraan"`.
- `_catatan_data` wajib diisi untuk tiap prodi yang kampusnya < 3 atau `diterima` null.

### C.2 Draf JSON lengkap 18 entri

> Salin apa adanya ke `app/data/profil-prodi.json`. Angka dan status sudah dicocokkan ke laporan riset; jangan diubah tanpa membuka `docs/riset-top-prodi-lengkap.md`.

```json
{
  "_catatan": "Entitas `profil_prodi` (F10, di luar PRD/SDD §13 — lihat SDD-F10-eksplorasi-tujuan.md §C.5). Satu entri = satu prodi yang sudah diriset mendalam. `id` dan `nama` WAJIB sama persis dengan data/prodi.json supaya hasil F3 selalu bisa dilanjutkan ke F10. TIDAK ADA field gaji: untuk hampir semua prodi angkanya berstatus TIDAK DITEMUKAN di laporan riset, jadi bawaannya adalah tidak menampilkan angka sama sekali, bukan mengarang kisaran.",
  "_status_sumber": "Objek per kelompok data, bukan satu status untuk seluruh entri: peminat, mata_kuliah, profesi, kampus dinilai sendiri-sendiri. 'Terverifikasi' = sumber resmi (SNPMB, dokumen kurikulum resmi kampus). 'Perkiraan' = sumber sekunder atau gambaran umum.",
  "sumber": "resmi",
  "pemilik": "tim",
  "diperiksa_pada": "2026-08-31",
  "url_sumber": "https://snpmb.bppp.kemdikbud.go.id/",
  "status": "terverifikasi_sebagian",
  "asal": "riset",
  "_asal": "Isi berkas ini berasal dari docs/riset-top-prodi-lengkap.md (data SNBP 2025/2026 & SNBT 2026 dari SNPMB, ditambah dokumen kurikulum dan laman resmi kampus). Bagian yang tidak ditemukan di sumber resmi ditandai 'Perkiraan' pada status_sumber, bukan dinaikkan diam-diam jadi 'Terverifikasi'.",
  "data": [
    {
      "id": "k3",
      "nama": "Keselamatan dan Kesehatan Kerja (K3)",
      "jenjang": "D4",
      "rumpun": "Teknologi & Rekayasa",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 5582, "kampus": "UNS", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 43,
      "mata_kuliah": [
        "Higiene Industri",
        "Keselamatan Kerja",
        "K3 Lingkungan",
        "Pengendalian Proses",
        "Instrumentasi",
        "Pertolongan Pertama"
      ],
      "profesi": [
        "Safety Officer / HSE Officer",
        "Safety Inspector",
        "Environmental Specialist",
        "Auditor K3"
      ],
      "kampus": [
        { "nama": "UNS", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "PPNS (Politeknik Perkapalan Negeri Surabaya)", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "UNAIR", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "Universitas Binawan", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Prodi peminat terbanyak SNBT 2026 di PTN akademik. Daftar mata kuliah dari sumber sekunder (belum dokumen kurikulum resmi)."
    },
    {
      "id": "administrasi-bisnis",
      "nama": "Administrasi Bisnis",
      "jenjang": "D3",
      "rumpun": "Ekonomi & Bisnis",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 5059, "kampus": "UB", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 116,
      "mata_kuliah": [
        "Korespondensi Bisnis",
        "Administrasi Perkantoran Digital (E-Office)",
        "Digital Marketing",
        "Manajemen SDM",
        "Komunikasi Organisasi"
      ],
      "profesi": [
        "Administration Officer",
        "Digital Marketer",
        "Asisten Manajer",
        "Wirausaha"
      ],
      "kampus": [
        { "nama": "UB", "jenis": "PTN Akademik", "jalur_masuk": ["SNBT"] },
        { "nama": "Polban", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "PNJ", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "Polmed", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "Politeknik LP3I Bandung", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Mata kuliah gabungan sumber kampus (Polines) dan sumber sekunder (LP3I) — ditandai Perkiraan."
    },
    {
      "id": "teknik-informatika",
      "nama": "Teknik Informatika",
      "jenjang": "D3/D4",
      "rumpun": "Teknologi & Rekayasa",
      "badge_relevan_smk": true,
      "peminat": { "jumlah": 2796, "kampus": "PNJ", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 45,
      "mata_kuliah": [
        "Dasar Pemrograman & Praktikum",
        "Algoritma dan Struktur Data",
        "Basis Data & Basis Data Lanjut",
        "Pemrograman Web & Framework",
        "Pemrograman Mobile",
        "Rekayasa Perangkat Lunak"
      ],
      "profesi": [
        "Software Engineer / Programmer",
        "Database Administrator",
        "System Analyst",
        "QA / Software Tester"
      ],
      "kampus": [
        { "nama": "PNJ", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "Polban", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "Polinema", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Terverifikasi", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": "Jenjang D4 berbobot 144 SKS dan bergelar S.Tr.Kom / S.ST.",
      "_catatan_data": "Semua kampus rekomendasi berjenis PTN Vokasi — laporan riset tidak menemukan padanan PTN akademik untuk D3/D4 Teknik Informatika. Ini pengecualian yang disengaja terhadap aturan diversifikasi, bukan data yang kurang. Mata kuliah dari Dokumen Kurikulum D4 TI Polinema 2021 (resmi)."
    },
    {
      "id": "teknik-mesin",
      "nama": "Teknik Mesin",
      "jenjang": "D3",
      "rumpun": "Teknologi & Rekayasa",
      "badge_relevan_smk": true,
      "peminat": { "jumlah": 2383, "kampus": "Polban", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 48,
      "mata_kuliah": [
        "Gambar Teknik",
        "Proses Manufaktur (Konvensional & CNC)",
        "Material Teknik & Pengujian Bahan",
        "Elemen Mesin",
        "Perawatan & Perbaikan Mesin",
        "Otomasi Industri"
      ],
      "profesi": [
        "Supervisor / Teknisi Pemesinan",
        "Teknisi Perawatan Mesin",
        "Operator CNC",
        "Quality Control Manufaktur"
      ],
      "kampus": [
        { "nama": "Polban", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "PNJ", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "Polibatam", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] },
        { "nama": "ITPLN", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Tidak ada padanan PTN akademik untuk D3 Teknik Mesin di laporan riset — pengecualian diversifikasi yang sama seperti Teknik Informatika."
    },
    {
      "id": "keperawatan",
      "nama": "Keperawatan",
      "jenjang": "D3",
      "rumpun": "Kesehatan",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 5216, "kampus": "UNAIR", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 60,
      "mata_kuliah": [
        "Anatomi & Fisiologi",
        "Keperawatan Dasar",
        "Keperawatan Medikal Bedah (KMB)",
        "Keperawatan Gawat Darurat"
      ],
      "profesi": [
        "Perawat pelaksana rumah sakit",
        "Perawat klinik",
        "Perawat puskesmas"
      ],
      "kampus": [
        { "nama": "UNAIR", "jenis": "PTN Akademik", "jalur_masuk": ["SNBT"] },
        { "nama": "Poltekkes Kemenkes", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT", "Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Perkiraan", "kampus": "Terverifikasi" },
      "catatan_studi": "Perlu lulus uji kompetensi dan punya STR sebelum praktik penuh.",
      "_catatan_data": "Kurikulum resmi satu kampus tidak ditemukan di laporan riset; mata kuliah memakai gambaran umum. Hanya 2 kampus yang bisa dipastikan — di bawah target 3-5."
    },
    {
      "id": "perpajakan",
      "nama": "Perpajakan",
      "jenjang": "D3",
      "rumpun": "Ekonomi & Bisnis",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 4570, "kampus": "UNAIR", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 60,
      "mata_kuliah": [
        "Pengantar Pajak",
        "PPh I & PPh II",
        "PPN",
        "Akuntansi Keuangan",
        "Akuntansi Biaya",
        "Hukum Pajak"
      ],
      "profesi": [
        "Staf / Konsultan Pajak",
        "Pegawai Ditjen Pajak atau Bea Cukai",
        "Tax Officer perusahaan"
      ],
      "kampus": [
        { "nama": "UNAIR (Fakultas Vokasi)", "jenis": "PTN Akademik", "jalur_masuk": ["SNBT"] },
        { "nama": "ULM", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "Universitas Pancasila", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Tidak ada politeknik negeri di daftar riset; program vokasi di sini ditempuh lewat Fakultas Vokasi UNAIR — jenis kampus tetap ditulis PTN Akademik karena yang dinilai adalah jenis institusinya."
    },
    {
      "id": "keperawatan-anestesiologi",
      "nama": "Keperawatan Anestesiologi",
      "jenjang": "D4",
      "rumpun": "Kesehatan",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 4766, "kampus": "UNS", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 23,
      "mata_kuliah": [
        "Keperawatan Anestesi",
        "Keselamatan Pasien"
      ],
      "profesi": [
        "Penata anestesi rumah sakit",
        "Asisten anestesi kamar operasi"
      ],
      "kampus": [
        { "nama": "UNS", "jenis": "PTN Akademik", "jalur_masuk": ["SNBT"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Perkiraan", "kampus": "Terverifikasi" },
      "catatan_studi": "Perlu registrasi profesi penata anestesi sebelum praktik.",
      "_catatan_data": "Keketatan tertinggi di daftar ini. Kurikulum resmi tidak ditemukan — hanya 2 topik umum yang bisa disebut, sengaja tidak ditambal sampai 4. Hanya 1 kampus terverifikasi; perlu riset lanjutan untuk melengkapi 3-5 kampus."
    },
    {
      "id": "humas-komunikasi-digital",
      "nama": "Humas & Komunikasi Digital",
      "jenjang": "D4",
      "rumpun": "Sosial & Humaniora",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 4346, "kampus": "UNJ", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 45,
      "mata_kuliah": [
        "Kehumasan (Public Relations)",
        "Media Digital",
        "Manajemen Media Sosial"
      ],
      "profesi": [
        "Public Relations",
        "Digital Content Specialist",
        "Social Media Officer",
        "Media Relations"
      ],
      "kampus": [
        { "nama": "UNJ", "jenis": "PTN Akademik", "jalur_masuk": ["SNBT"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Perkiraan", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Kurikulum resmi UNJ tidak ditemukan di laporan riset. Hanya 1 kampus terverifikasi — perlu riset lanjutan."
    },
    {
      "id": "manajemen-bisnis",
      "nama": "Manajemen Bisnis",
      "jenjang": "D4",
      "rumpun": "Ekonomi & Bisnis",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 2521, "kampus": "Polmed", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 69,
      "mata_kuliah": [
        "Manajemen Operasional",
        "Manajemen Keuangan",
        "Manajemen Pemasaran",
        "Administrasi & Korespondensi Bisnis"
      ],
      "profesi": [
        "Staf / Asisten Manajer Bisnis",
        "Business Development",
        "Wirausaha"
      ],
      "kampus": [
        { "nama": "Polmed", "jenis": "PTN Vokasi", "jalur_masuk": ["SNBT"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Perkiraan", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Kurikulum resmi spesifik tidak ditemukan; mata kuliah disusun dari kemiripan dengan Administrasi Bisnis, ditandai Perkiraan. Hanya 1 kampus terverifikasi."
    },
    {
      "id": "informatika",
      "nama": "Informatika",
      "jenjang": "S1",
      "rumpun": "Teknologi & Rekayasa",
      "badge_relevan_smk": true,
      "peminat": { "jumlah": 1157, "kampus": "UNS", "tahun": 2025, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": null,
      "mata_kuliah": [
        "Algoritma & Pemrograman",
        "Struktur Data",
        "Basis Data",
        "Jaringan Komputer",
        "Kecerdasan Buatan",
        "Rekayasa Perangkat Lunak"
      ],
      "profesi": [
        "Software Developer / Programmer",
        "Data Scientist",
        "Cyber Security Analyst",
        "IT Consultant"
      ],
      "kampus": [
        { "nama": "UNS", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "ITB", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UPI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "Telkom University", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Angka diterima untuk pasangan peminat ini tidak tersedia di laporan riset, jadi rasio keketatan tidak bisa dihitung dan ditampilkan sebagai tanda pisah. Prospek kerja berbasis tracer study Telkom University (masa tunggu 1,8 bulan, kesesuaian bidang 89%)."
    },
    {
      "id": "manajemen",
      "nama": "Manajemen",
      "jenjang": "S1",
      "rumpun": "Ekonomi & Bisnis",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 1590, "kampus": "UNS", "tahun": 2025, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": null,
      "mata_kuliah": [
        "Manajemen SDM",
        "Manajemen Keuangan",
        "Manajemen Pemasaran",
        "Manajemen Operasional",
        "Manajemen Strategi",
        "Kewirausahaan"
      ],
      "profesi": [
        "Staf / Manajer HRD",
        "Marketing",
        "Business Development",
        "Analis Keuangan"
      ],
      "kampus": [
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UGM", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "Telkom University", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Perkiraan", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Angka diterima tidak tersedia. Tidak ada padanan PTN vokasi — diversifikasi memakai PTN + PTS. Kampus sumber angka peminat (UNS) tidak masuk daftar rekomendasi karena laporan riset menyebut kampus lain sebagai rujukan prodi ini."
    },
    {
      "id": "ilmu-hukum",
      "nama": "Ilmu Hukum",
      "jenjang": "S1",
      "rumpun": "Sosial & Humaniora",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 4685, "kampus": "UNDIP", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 287,
      "mata_kuliah": [
        "Pengantar Ilmu Hukum",
        "Pengantar Hukum Indonesia",
        "Hukum Pidana",
        "Hukum Perdata",
        "Hukum Tata Negara",
        "Hukum Administrasi Negara"
      ],
      "profesi": [
        "Advokat (perlu PKPA)",
        "Hakim atau Jaksa (lewat pendidikan khusus)",
        "Legal Officer perusahaan",
        "PNS Kemenkumham atau Kejaksaan"
      ],
      "kampus": [
        { "nama": "UNDIP", "jenis": "PTN Akademik", "jalur_masuk": ["SNBT"] },
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UK Parahyangan", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Terverifikasi", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Tidak ada padanan PTN vokasi — diversifikasi memakai PTN + PTS."
    },
    {
      "id": "teknik-pertambangan",
      "nama": "Teknik Pertambangan & Perminyakan",
      "jenjang": "S1",
      "rumpun": "Teknologi & Rekayasa",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 4789, "kampus": "ITB", "tahun": 2026, "jalur": "SNBT", "sumber": "SNPMB" },
      "diterima": 115,
      "mata_kuliah": [
        "Geologi Pertambangan",
        "Teknik Pengeboran & Peledakan",
        "Desain Tambang",
        "Pemrosesan Mineral",
        "Ekonomi Pertambangan",
        "K3 Pertambangan"
      ],
      "profesi": [
        "Mine Plan Engineer",
        "Ahli Geologi / Hidrogeologi Tambang",
        "Konsultan Tambang",
        "Karyawan BUMN tambang"
      ],
      "kampus": [
        { "nama": "ITB", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UPN Veteran Yogyakarta", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "Universitas Trisakti", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Peminat nomor satu nasional SNBP 2026 juga (2.022 pendaftar, 95 diterima, keketatan sekitar 4,7%). Angka yang ditampilkan memakai jalur SNBT 2026 supaya satu prodi memakai satu pasangan angka. Tidak ada padanan PTN vokasi."
    },
    {
      "id": "kedokteran",
      "nama": "Kedokteran (Pendidikan Dokter)",
      "jenjang": "S1 + profesi",
      "rumpun": "Kesehatan",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 1943, "kampus": "UI", "tahun": 2026, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": 60,
      "mata_kuliah": [
        "Ilmu Kedokteran Dasar (anatomi, fisiologi, biokimia)",
        "Patologi & Farmakologi",
        "Ilmu Penyakit Dalam",
        "Ilmu Bedah",
        "Kepaniteraan Klinik (koas)"
      ],
      "profesi": [
        "Dokter umum (setelah UKMPPD & STR)",
        "Dokter layanan primer",
        "Dosen atau peneliti kedokteran"
      ],
      "kampus": [
        { "nama": "UI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UGM", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UK Maranatha", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": "Tahap akademik sekitar 3,5 tahun (kurikulum berbasis kompetensi/SKDI), lalu tahap profesi (koas) sekitar 2 tahun. Wajib lulus UKMPPD sebelum praktik.",
      "_catatan_data": "Laporan riset memverifikasi STRUKTUR studi (SKDI, koas, UKMPPD), bukan daftar mata kuliah per semester — daftar di sini gambaran umum, ditandai Perkiraan. Kedokteran UGM sebagai pembanding: 1.899 pendaftar, 53 diterima."
    },
    {
      "id": "farmasi",
      "nama": "Farmasi",
      "jenjang": "S1 + profesi",
      "rumpun": "Kesehatan",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 1621, "kampus": "UNPAD", "tahun": 2026, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": 50,
      "mata_kuliah": [
        "Kimia Organik",
        "Biokimia",
        "Analisis Obat",
        "Farmakologi",
        "Farmasetika",
        "Praktek Belajar Lapangan"
      ],
      "profesi": [
        "Apoteker (setelah pendidikan profesi)",
        "Tenaga Teknis Kefarmasian",
        "QA / QC industri farmasi",
        "PNS BPOM atau Kemenkes"
      ],
      "kampus": [
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UNSOED", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UGM", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "IIK Bhakti Wiyata", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Terverifikasi", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": "Lulus S1 dulu (S.Farm.), baru lanjut pendidikan profesi Apoteker.",
      "_catatan_data": "Mata kuliah dari kurikulum S1 Farmasi UNSOED (145 SKS). Tidak ada padanan PTN vokasi."
    },
    {
      "id": "ilmu-keperawatan",
      "nama": "Ilmu Keperawatan",
      "jenjang": "S1 + Ners",
      "rumpun": "Kesehatan",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 1603, "kampus": "UNPAD", "tahun": 2026, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": 58,
      "mata_kuliah": [
        "Anatomi & Fisiologi",
        "Ilmu Biomedik",
        "Keperawatan Medikal Bedah",
        "Manajemen Keperawatan",
        "Etika Keperawatan",
        "Praktik Klinik"
      ],
      "profesi": [
        "Perawat profesional (setelah profesi Ners & STR)",
        "Perawat rumah sakit, ICU, atau IGD",
        "Perawat home care",
        "Dosen atau instruktur klinis"
      ],
      "kampus": [
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UGM", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": "S1 Keperawatan dilanjutkan pendidikan profesi Ners; perlu STR untuk praktik.",
      "_catatan_data": "Pembanding agregat: USK SNBP 2025 sebanyak 1.343 peminat. Tidak ada padanan PTN vokasi dan belum ada PTS di daftar riset — baru 3 kampus."
    },
    {
      "id": "ilmu-komunikasi",
      "nama": "Ilmu Komunikasi",
      "jenjang": "S1",
      "rumpun": "Sosial & Humaniora",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 1465, "kampus": "UPI", "tahun": 2025, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": 20,
      "mata_kuliah": [
        "Pengantar Ilmu Komunikasi",
        "Teori Komunikasi",
        "Psikologi Komunikasi",
        "Komunikasi Massa dan Media",
        "Komunikasi Digital",
        "Perencanaan Komunikasi"
      ],
      "profesi": [
        "Public Relations / Digital PR",
        "Jurnalis",
        "Content Creator / Social Media Specialist",
        "Produser atau kru broadcasting"
      ],
      "kampus": [
        { "nama": "UPI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP", "SNBT"] },
        { "nama": "UNS", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "Telkom University", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Terverifikasi", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Peminat terbanyak ke-2 nasional SNBP 2025. Mata kuliah dari kurikulum resmi UNPAD (144 SKS). Tidak ada padanan PTN vokasi."
    },
    {
      "id": "akuntansi",
      "nama": "Akuntansi",
      "jenjang": "S1",
      "rumpun": "Ekonomi & Bisnis",
      "badge_relevan_smk": false,
      "peminat": { "jumlah": 1206, "kampus": "UNS", "tahun": 2025, "jalur": "SNBP", "sumber": "SNPMB" },
      "diterima": null,
      "mata_kuliah": [
        "Akuntansi Keuangan Menengah",
        "Akuntansi Biaya",
        "Perpajakan",
        "Auditing",
        "Sistem Informasi Akuntansi",
        "Anggaran Perusahaan"
      ],
      "profesi": [
        "Akuntan Publik",
        "Auditor Internal",
        "Konsultan Pajak",
        "Analis Keuangan"
      ],
      "kampus": [
        { "nama": "UNPAD", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UI", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "UGM", "jenis": "PTN Akademik", "jalur_masuk": ["SNBP"] },
        { "nama": "Telkom University", "jenis": "PTS", "jalur_masuk": ["Mandiri"] }
      ],
      "status_sumber": { "peminat": "Terverifikasi", "mata_kuliah": "Perkiraan", "profesi": "Terverifikasi", "kampus": "Terverifikasi" },
      "catatan_studi": null,
      "_catatan_data": "Angka diterima tidak tersedia. Profesi 'PNS Kemenkeu/DJP/BPKP' ada di laporan riset tapi dipangkas supaya daftar tetap 3-4 butir sesuai spec. Tidak ada padanan PTN vokasi."
    }
  ]
}
```

### C.3 Rumpun yang dipakai (4 rumpun)

| Rumpun | Sudah ada di `prodi.json`? | Prodi |
|---|---|---|
| Teknologi & Rekayasa | ya | k3, teknik-informatika, teknik-mesin, informatika, teknik-pertambangan |
| Kesehatan | ya | keperawatan, keperawatan-anestesiologi, kedokteran, farmasi, ilmu-keperawatan |
| Ekonomi & Bisnis | ya | administrasi-bisnis, perpajakan, manajemen-bisnis, manajemen, akuntansi |
| Sosial & Humaniora | **baru** | ilmu-hukum, ilmu-komunikasi, humas-komunikasi-digital |

K3 ditempatkan di Teknologi & Rekayasa karena profesinya (HSE/safety officer industri) — bukan di Kesehatan. Keputusan redaksional, bukan data; lihat §10.

### C.4 Aturan urutan kartu kampus (mengikat)

Spec §6 melarang kampus vokasi diletakkan paling bawah. Urutannya dikunci **di dalam data**, bukan di kode:

1. Kampus sumber angka peminat lebih dulu (supaya angka di atas layar dan kartu di bawahnya bercerita hal yang sama).
2. Kalau ada PTN Vokasi, ia menempati posisi ke-1 atau ke-2.
3. PTS/Kedinasan selalu terakhir.

Renderer **tidak boleh** mengurutkan ulang array `kampus`.

### C.5 Pemetaan ke model data PRD §13 (untuk saat basis data dibuat)

F10 belum menyentuh basis data. Kalau nanti dimigrasikan, bentuknya:

| Tabel | Kolom penting | Relasi |
|---|---|---|
| `profil_prodi` | prodi_id (FK → `prodi.id`, PK), jenjang, badge_relevan_smk, peminat_jumlah, peminat_kampus, peminat_tahun, peminat_jalur, diterima (nullable), catatan_studi, sumber, pemilik, diperiksa_pada | 1–1 dengan `prodi` |
| `profil_prodi_mata_kuliah` | prodi_id (FK), urutan, nama | 1–N |
| `profil_prodi_profesi` | prodi_id (FK), urutan, nama | 1–N |
| `profil_prodi_kampus` | prodi_id (FK), urutan, nama, jenis, jalur_masuk (JSON/tabel anak) | 1–N |
| `profil_prodi_status_sumber` | prodi_id (FK), kelompok (peminat/mata_kuliah/profesi/kampus), status | 1–4 baris per prodi |

`rasio_keketatan` **tidak jadi kolom** — kolom turunan yang bisa basi terhadap `diterima`/`peminat_jumlah`. Dihitung di lapisan tampilan (atau `VIEW`).

---

## D. Penyelarasan `data/prodi.json` (Opsi A)

### D.1 Perbandingan isi lama vs 18 prodi F10

| id lama | nama lama | rumpun lama | Status terhadap 18 prodi F10 | Tindakan |
|---|---|---|---|---|
| `teknik-informatika` | Teknik Informatika | Teknologi & Rekayasa | **cocok** (F10 #3, D3/D4) | dipertahankan, id & nama tidak berubah |
| `keperawatan` | Keperawatan | Kesehatan | **cocok** (F10 #5, D3) | dipertahankan |
| `farmasi` | Farmasi | Kesehatan | **cocok** (F10 #15, S1 + profesi) | dipertahankan |
| `akuntansi` | Akuntansi | Ekonomi & Bisnis | **cocok** (F10 #18, S1) | dipertahankan |
| `teknik-elektro` | Teknik Elektro | Teknologi & Rekayasa | **DI LUAR 18 prodi F10** | **jangan dihapus diam-diam** — lihat §D.4 |

Empat dari lima id lama bertahan apa adanya, jadi profil pengguna lama (`lanjut.profil.v1` → `prodi_impian`) tetap sah tanpa migrasi. Hanya `teknik-elektro` yang bermasalah.

### D.2 Isi akhir `data/prodi.json` (18 entri)

`id` dan `nama` **wajib** sama persis dengan `profil-prodi.json`. Ditambah satu kolom di luar PRD §13, `jenjang`, dengan alasan yang sama seperti kolom `kategori` di `checklist.json`: layar F3 perlu membedakan "Keperawatan (D3)" dari "Ilmu Keperawatan (S1 + Ners)" dalam satu daftar, dan menempelkan jenjang ke dalam `nama` akan memutus kecocokan nama antar berkas. Catat di `_catatan` berkas.

| id | nama | jenjang | rumpun |
|---|---|---|---|
| `k3` | Keselamatan dan Kesehatan Kerja (K3) | D4 | Teknologi & Rekayasa |
| `teknik-informatika` | Teknik Informatika | D3/D4 | Teknologi & Rekayasa |
| `teknik-mesin` | Teknik Mesin | D3 | Teknologi & Rekayasa |
| `informatika` | Informatika | S1 | Teknologi & Rekayasa |
| `teknik-pertambangan` | Teknik Pertambangan & Perminyakan | S1 | Teknologi & Rekayasa |
| `keperawatan` | Keperawatan | D3 | Kesehatan |
| `keperawatan-anestesiologi` | Keperawatan Anestesiologi | D4 | Kesehatan |
| `kedokteran` | Kedokteran (Pendidikan Dokter) | S1 + profesi | Kesehatan |
| `farmasi` | Farmasi | S1 + profesi | Kesehatan |
| `ilmu-keperawatan` | Ilmu Keperawatan | S1 + Ners | Kesehatan |
| `administrasi-bisnis` | Administrasi Bisnis | D3 | Ekonomi & Bisnis |
| `perpajakan` | Perpajakan | D3 | Ekonomi & Bisnis |
| `manajemen-bisnis` | Manajemen Bisnis | D4 | Ekonomi & Bisnis |
| `manajemen` | Manajemen | S1 | Ekonomi & Bisnis |
| `akuntansi` | Akuntansi | S1 | Ekonomi & Bisnis |
| `ilmu-hukum` | Ilmu Hukum | S1 | Sosial & Humaniora |
| `ilmu-komunikasi` | Ilmu Komunikasi | S1 | Sosial & Humaniora |
| `humas-komunikasi-digital` | Humas & Komunikasi Digital | D4 | Sosial & Humaniora |

Kepala berkas `prodi.json` tetap `status: "belum_diverifikasi"`, `asal: "mockup"`, `diperiksa_pada: null` — **jangan diubah**: pemetaan prodi ke rumpun dan ke mapel belum diverifikasi ke sumber resmi, dan `check.js` aturan 9 akan menolak `diperiksa_pada` terisi selama statusnya `belum_diverifikasi`.

### D.3 Konsekuensi ke `data/prodi-mapel.json` (jangan terlewat)

`prodi-mapel.json` adalah jantung F3. Kalau `prodi.json` naik dari 5 ke 18 entri sementara `prodi-mapel.json` tetap 5 prodi, 14 prodi baru akan menghasilkan **layar hasil F3 yang kosong** (`tampilkanHasil()` berhenti saat `!baris.length`). Jadi 14 prodi baru wajib punya barisnya.

Pola yang dipertahankan: 4 baris per prodi dengan bobot 3, 3, 2, 1 (dua bobot 3 = saran 2 mapel TKA). Mapel diambil hanya dari 10 id yang ada di `mapel.json`.

| prodi_id | bobot 3 | bobot 3 | bobot 2 | bobot 1 |
|---|---|---|---|---|
| `k3` | fisika | kimia | matematika | biologi |
| `administrasi-bisnis` | ekonomi | bahasa-inggris | matematika | sosiologi |
| `teknik-informatika` *(sudah ada)* | matematika | informatika | fisika | kimia |
| `teknik-mesin` | matematika | fisika | informatika | kimia |
| `keperawatan` *(sudah ada)* | biologi | kimia | matematika | bahasa-inggris |
| `perpajakan` | ekonomi | matematika | bahasa-inggris | sosiologi |
| `keperawatan-anestesiologi` | biologi | kimia | fisika | matematika |
| `humas-komunikasi-digital` | bahasa-indonesia | sosiologi | bahasa-inggris | informatika |
| `manajemen-bisnis` | ekonomi | matematika | bahasa-inggris | sosiologi |
| `informatika` | matematika | informatika | fisika | bahasa-inggris |
| `manajemen` | ekonomi | matematika | bahasa-inggris | sosiologi |
| `ilmu-hukum` | sosiologi | bahasa-indonesia | ekonomi | geografi |
| `teknik-pertambangan` | matematika | fisika | kimia | geografi |
| `kedokteran` | biologi | kimia | fisika | matematika |
| `farmasi` *(sudah ada)* | kimia | biologi | matematika | bahasa-inggris |
| `ilmu-keperawatan` | biologi | kimia | matematika | bahasa-inggris |
| `ilmu-komunikasi` | bahasa-indonesia | sosiologi | bahasa-inggris | ekonomi |
| `akuntansi` *(sudah ada)* | ekonomi | matematika | bahasa-inggris | sosiologi |

Pemetaan ini **redaksional, belum diverifikasi** ke ketentuan mapel pendukung SNPMB — sama statusnya dengan 5 baris yang sudah ada (`status: "belum_diverifikasi"`). Jangan menaikkan statusnya karena jumlah barisnya bertambah.

### D.4 Laporan wajib: entri lama yang keluar dari daftar

> **Untuk backend-engineer: JANGAN menghapus `teknik-elektro` sebelum keputusan ini dikonfirmasi PM/user.**

- **Yang terdampak:** 1 entri `prodi.json` (`teknik-elektro` — "Teknik Elektro", rumpun Teknologi & Rekayasa) dan **4 baris** `prodi-mapel.json` dengan `prodi_id: "teknik-elektro"` (matematika 3, fisika 3, informatika 2, kimia 1).
- **Kenapa keluar:** Teknik Elektro tidak termasuk 18 prodi hasil riset, jadi tidak punya profil F10. Membiarkannya berarti ada satu jalur F3 yang pasti berakhir di layar fallback — persis yang dihindari Opsi A.
- **Tiga pilihan:**
  1. **Hapus** dari `prodi.json` + `prodi-mapel.json` (konsisten Opsi A, dan disarankan). Risiko: pengguna yang terlanjur menyimpan `prodi_impian: "teknik-elektro"` kehilangan hasil F3-nya.
  2. **Biarkan** sebagai satu-satunya prodi tanpa profil F10, mengandalkan fallback (Opsi B parsial).
  3. **Riset susulan** untuk melengkapi profil Teknik Elektro jadi prodi ke-19.
- **Mitigasi wajib kalau pilihan 1 diambil:** tambahkan penjaga di `pasangPilihMapel()` — kalau `profil.prodi_impian` tidak ditemukan di `prodi.json`, jangan lompat ke langkah hasil yang kosong; tampilkan langkah "masuk" seperti biasa. Tanpa penjaga ini, pengguna lama melihat layar hasil yang diam.

---

## E. Arsitektur `app/eksplorasi-tujuan.html`

### E.1 Kerangka halaman

- `<body data-peran="eksplorasi-tujuan">` → didaftarkan ke `HALAMAN` di `app.js`, ditangani `pasangEksplorasiTujuan()`.
- Wajib memenuhi `check.js` aturan 4 & 7: `<html lang="id">`, viewport, `<title>`, `tokens.css`, `app.css`, `app.js`, `manifest.webmanifest`, **tepat satu `<h1>`**, navigasi bawah 4 ikon dengan **tepat satu** `aria-current="page"`.
- Tab aktif: **Pilih Mapel** (F10 adalah kelanjutan langsung F3, dan Pilih Mapel ada di nav — jadi tidak mengikuti konvensi "halaman cabang menandai Beranda" yang dipakai halaman di luar nav seperti `alumni.html`).
- Isi contoh hidup ditulis penuh di HTML (satu prodi contoh) supaya halaman tetap berarti saat dibuka lewat `file://` atau saat fetch gagal. Kaidah `gantiIsi()` berlaku: JavaScript hanya mengganti anak dari wadah `[data-daftar]` dan mengisi `[data-isi]`/`[data-slot]`.

### E.2 Sumber prodi terpilih (urutan baca)

```
1. URL: ?prodi=<id>            ← dipasang CTA di pilih-mapel.html
2. localStorage 'lanjut.profil.v1' → objek profil → field prodi_impian
3. tidak ada / bernilai "belum" / id tidak dikenal → keadaan FALLBACK
```

**Koreksi terhadap `docs/F10-data-struktur-ringkas.md`:** dokumen itu menyebut kunci `selectedProdi` dan wadah JSON `{"prodi": [...]}`. Keduanya **salah** terhadap kode yang ada. Kunci yang benar adalah `lanjut.profil.v1` (dibaca lewat `LANJUT.profil.baca()`), dan wadah data wajib bernama `data` agar dikenali `larik()`. Dokumen ringkas itu juga menandai `badge_relevan_smk: true` untuk K3 — yang mengikat adalah spec §5 (hanya Teknik Informatika, Teknik Mesin, Informatika S1).

Alasan URL param didahulukan: dari layar fallback, siswa bisa membuka profil prodi lain **tanpa menimpa** `prodi_impian` miliknya. F10 **tidak pernah menulis** ke `lanjut.profil.v1`.

**Keamanan & kebersihan:** nilai `?prodi=` hanya dipakai untuk **mencari** entri di `profil-prodi.json`. Nilainya tidak pernah dimasukkan ke `innerHTML`; kalau id tidak ketemu, kalimat fallback memakai nama dari `prodi.json` (kalau ada) atau kalimat generik tanpa menggemakan isi URL.

### E.3 Tiga keadaan layar

| Keadaan | Pemicu | Isi |
|---|---|---|
| `profil` | id ketemu di `profil-prodi.json` | seluruh blok §F.2 |
| `kosong` (fallback) | tidak ada id, id = `"belum"`, atau id tidak ketemu | pesan + daftar 18 prodi dikelompokkan per rumpun, tiap butir menautkan `eksplorasi-tujuan.html?prodi=<id>` |
| `galat` | `muatData('profil-prodi')` gagal (luring / `file://`) | pesan "Sedang tidak tersambung…" lewat `tampilkanGalat()`, isi contoh di HTML tetap berdiri |

Daftar pada keadaan fallback dibangun **dari `profil-prodi.json` sendiri** (field `rumpun`), bukan dari `prodi.json` — supaya yang ditawarkan dijamin punya profil.

### E.4 Perhitungan rasio keketatan

```
rasio = diterima / peminat.jumlah × 100
```

- Ditampilkan satu angka desimal, koma sebagai pemisah desimal, titik sebagai pemisah ribuan: `5.582` pendaftar, `0,8%`.
- `diterima === null` **atau** `peminat.jumlah` tidak ada/0 → tampilkan `—` (tanda pisah), **bukan** `0`, bukan string kosong. Keterangan kecil di bawahnya: "angka diterima belum tersedia".
- Nilai hasil hitung tidak pernah disimpan balik ke JSON.
- Dua metrik **selalu tampil berpasangan** (spec §3): jumlah peminat tidak boleh berdiri sendiri tanpa pasangannya, walaupun pasangannya berisi `—`.
- Dua fungsi pembantu murni ditambahkan di `app.js` dan dibuka lewat `global.LANJUT` supaya bisa diuji `test-app.js` tanpa DOM: `angkaRibuan(n)` dan `rasioKeketatan(diterima, peminat)`.

### E.5 Baris sumber & disclaimer

- Tiap kelompok data menampilkan lencana status (`Terverifikasi` / `Perkiraan`) dari `status_sumber`.
- Baris sumber di bawah metrik disusun `gabung([...])` (pemisah `·`): `Sumber: SNPMB <jalur> <tahun> · diperiksa <tanggal berkas>`. Tanggal diambil dari `diperiksa_pada` kepala berkas, **tidak dipaku di HTML**.
- Larangan `check.js` aturan 9 yang harus dipatuhi markup statis: jangan menulis frasa `dicek <angka>` dan jangan menulis `Sumber: Laman resmi ...` di HTML.
- Disclaimer wajib tetap tampil (spec §3), tidak boleh disembunyikan di balik tautan.

### E.6 Perubahan di `app/assets/app.js` (ringkas, untuk backend-engineer)

1. Tambah `'eksplorasi-tujuan': pasangEksplorasiTujuan` ke objek `HALAMAN`.
2. `pasangEksplorasiTujuan()`: baca id → `muatData('profil-prodi')` → cari entri → render `profil` atau `kosong`; `.catch` → `tampilkanGalat()`.
3. Tambah helper `angkaRibuan()` dan `rasioKeketatan()`; buka keduanya di `global.LANJUT`.
4. `pasangPilihMapel()`: di dalam `tampilkanHasil()`, isi `href` dan label CTA F10; sembunyikan CTA saat hasil berupa rangkuman umum ("belum tahu"). Tambah penjaga prodi tidak dikenal (§D.4).
5. `pasangChecklist()`: dukung kategori tambahan yang belum ada di `checklist.json` (§G.2) — **tanpa ini tombol simpan F10 tidak terlihat hasilnya**.
6. `app/tools/test-app.js`: tambahkan `'eksplorasi-tujuan'` ke array `peranDitangani`.

---

## F. Kebutuhan Desain UI/UX (untuk ui-engineer)

> **Sifat referensi desain:** `LANJUT UI mockups/F10-eksplorasi-tujuan-DESIGN.md` adalah **dokumen deskriptif**, bukan berkas gambar pixel-exact. Yang mengikat darinya adalah **urutan blok, jenis komponen, dan token**. Untuk detail visual yang tidak disebut di sana (tinggi kartu, jarak antar seksi, gaya ikon), **ikuti pola halaman yang sudah jadi** — `pilih-mapel.html` (kartu hasil), `beranda.html` (baris sumber & lencana), `khusus-smk.html` (seksi bertumpuk), `alumni.html` (layar kosong dengan maskot).

### F.1 Aturan yang mengikat dari uji otomatis

- Lebar isi 360px: **tidak ada** `width: <n>px` tetap > 320px, baik di CSS maupun `style=` inline.
- **Dilarang** `<table>` dan `<pre>` — dua metrik berdampingan dibuat dengan grid/flex.
- **Dilarang** warna merah/oranye (hex dengan R > 150 dan R − max(G,B) > 60). Termasuk untuk lencana "Perkiraan".
- **Dilarang** kata: raih, wujudkan, gapai, mimpimu, "jangan sampai menyesal", "sudah terlambat", "kalah dari anak SMA". Sapaan **"kamu"**, bukan "Anda"/"kalian".
- Semua `var(--token)` yang dipakai wajib sudah terdefinisi di `tokens.css` (jangan menambah token baru; kalau butuh, tambahkan di Bagian 2 `tokens.css` dan jangan menimpa nama Bagian 1).
- Tiap `<img>` wajib punya `alt` (maskot: `alt=""`).

### F.2 Komponen per blok (urutan dari atas)

| # | Blok | Komponen & kelas | Token |
|---|---|---|---|
| 1 | Kepala | tautan kembali ke `pilih-mapel.html` (pola halaman cabang), `.kepala` + `<h1>` nama prodi | `--text-h2`, `--space-5` |
| 1b | Lencana | `.lencana.lencana--neutral` untuk jenjang (D3/D4/S1); `.lencana.lencana--solid` untuk **"Relevan untuk RPL/TKJ/Teknik"** — lencana SMK sengaja yang paling menonjol karena itu pembeda produk (spec §3); dirender hanya bila `badge_relevan_smk` true | `--ink-100`/`--ink-700`, `--blue-400`/`--white`, `--radius-pill` |
| 2 | Dua metrik | satu `.kartu` berisi grid 2 kolom `1fr 1fr` (kelas baru `.metrik-duo`), tiap kolom: angka `font:var(--text-h2)` + label `.caption`. Label: "Pendaftar" dan "Diterima dari pendaftar" | `--space-3`, `--radius-md`, `--border-soft` |
| 2b | Baris sumber | `.sumber` satu baris: `Sumber: SNPMB SNBT 2026 · diperiksa 31 Agu 2026` + `.lencana--resmi` "Terverifikasi" / `.lencana--neutral` "Perkiraan" | `--text-caption`, `--text-subtle` |
| 3 | "Yang akan kamu pelajari" | `.seksi` + `.seksi__judul` + lencana status di kanan judul (`.baris-nilai`); isi `ul.tumpuk > li.kartu.kartu--rapat`, 1–6 butir apa adanya; `catatan_studi` sebagai `.caption` di bawah daftar | `--space-3` |
| 4 | "Ke mana lulusannya" | 2–4 `.kartu.kartu--rapat` bertumpuk vertikal (bukan 2 kolom — nama peran panjang di 360px). **Tidak ada angka gaji di mana pun** | `--radius-md` |
| 5 | "Kampus yang cocok" | 1–5 `.kartu` per kampus: nama (`font:var(--text-h3)`) + `.pil` jenis + `.pil` per jalur masuk. Kartu **PTN Vokasi** memakai `.kartu--outline` (garis `--border-brand`) supaya setara menonjol dengan PTN akademik. Urutan mengikuti array data, jangan diurutkan ulang | `--blue-300`, `--radius-md` |
| 6 | Disclaimer | `.penafian` | `--text-caption`, `--text-subtle` |
| 7 | Aksi | `button.btn.btn--lg.btn--penuh` "Simpan ke Daftar Periksa" dengan dua keadaan (`data-keadaan="idle"` / `"tersimpan"`); saat tersimpan tampil kalimat konfirmasi + tautan ke `checklist.html` | `--space-4` |
| 8 | Fallback | `section.kosong` + maskot `assets/img/mascot-blue.png` (`alt=""`, 96×96) + `<h2>` + `<p>`, lalu satu `.seksi` per rumpun berisi `a.kartu.kartu--rapat` per prodi (nama + jenjang) | pola `alumni.html` |
| 9 | Galat | blok `[data-keadaan="galat"]` dengan teks luring standar | pola halaman lain |
| 10 | Navigasi | `.tabbar` 4 ikon, Pilih Mapel `aria-current="page"` | — |

Keadaan kosong per seksi (mis. `mata_kuliah` kosong): kalimat pendek "Bagian ini masih kami siapkan." (salinan teks §6) — seksinya tetap ada, tidak dihapus dari DOM.

### F.3 Draf salinan teks (butuh persetujuan PM/user sebelum dikunci)

Tambahkan sebagai **§4.9 Eksplorasi Tujuan** di `docs/salinan-teks-lanjut.md`. Definisi Selesai PRD §15 mengharuskan teks berasal dari dokumen, bukan ditulis ulang di kode.

- Eyebrow: **Eksplorasi Tujuan**
- Judul seksi: **Yang akan kamu pelajari** · **Ke mana lulusannya** · **Kampus yang cocok**
- Label metrik: **Pendaftar** · **Diterima dari pendaftar**
- Saat rasio tidak bisa dihitung: **Angka diterima belum tersedia.**
- Disclaimer: **Data ini rangkuman dari SNPMB/BAN-PT, bisa berubah. Cek laman resmi untuk info terkini.**
- Tombol: **Simpan ke Daftar Periksa** → setelah ditekan: **Sudah masuk Daftar Periksa.** `[ Lihat Daftar Periksa ]`
- Fallback judul: **Profil lengkap untuk prodi ini belum kami siapkan.**
- Fallback isi: **Yang sudah tersedia:**
- Seksi kosong: **Bagian ini masih kami siapkan.**
- Luring: **Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat.**
- CTA di `pilih-mapel.html`: **Lihat prospek & kampus untuk [nama prodi]** dengan baris kecil: **Peminat, mata kuliah, dan kampus yang cocok.**

---

## G. Titik Integrasi

### G.1 CTA baru di `pilih-mapel.html`

- **Letak:** di dalam `[data-langkah="hasil"]`, tepat **setelah** `.penafian` dan **sebelum** tumpukan tombol yang sudah ada. Susunan dan gaya dua tombol lama (`Simpan ke Daftar Periksa`, `Lewati`) **tidak diubah** supaya tidak mengusik audit v1 yang sudah lolos.
- **Bentuk:** `a.kartu.kartu--soft` (pola yang sama dengan kartu `data-aksi="mulai-eksplor"` di langkah "masuk"), berisi judul + baris `.caption`.
- **Perilaku:** `href="eksplorasi-tujuan.html?prodi=<prodiAktifId>"` diisi `tampilkanHasil()`; nama prodi diisi lewat `[data-isi="prodi-nama"]`. Bila hasil yang tampil adalah rangkuman umum (`prodi_impian = "belum"`), CTA **disembunyikan** (`hidden`) — F10 selalu butuh satu prodi.
- `check.js` aturan 1 memverifikasi `href` menunjuk berkas yang ada, jadi `eksplorasi-tujuan.html` harus sudah ada saat CTA di-*commit*.

### G.2 Tombol "Simpan ke Daftar Periksa" → kategori "Riset Kampus"

Bentuk butir yang ditulis (memakai `LANJUT.checklistTambahan`, kunci `lanjut.checklist.tambahan.v1`):

```js
LANJUT.checklistTambahan.tambah({
  id: 'riset-kampus-' + prodi.id,           // id kembar akan menimpa, bukan menggandakan
  kategori: 'Riset Kampus',                  // dicocokkan dengan NAMA kategori, bukan id
  teks: 'Cari tahu lebih lanjut soal ' + prodi.nama,
  berlaku_untuk_kelas: ['10', '11', '12']
});
```

**Butir ini TIDAK otomatis dicentang.** Beda dengan F3 (yang menandai `mapel-tka` selesai karena tindakannya baru saja dilakukan), "cari tahu lebih lanjut" adalah pekerjaan yang belum dikerjakan. Menandainya selesai akan berbohong ke angka kemajuan "X dari Y beres".

**Cacat yang wajib diperbaiki lebih dulu — kalau tidak, tombol ini diam-diam tidak berefek:**

`pasangChecklist()` di `app.js` (baris ~956) hanya menyisipkan butir tambahan ke kategori yang **namanya sudah ada** di `checklist.json`:

```js
var milikKategoriIni = tambahan.filter(function (t) { return t.kategori === k.nama; });
```

"Riset Kampus" belum ada di sana, jadi butirnya tersimpan di `localStorage` tapi **tidak pernah muncul** di layar Daftar Periksa.

**Perbaikan yang dipilih:** ubah `pasangChecklist()` supaya butir tambahan yang kategorinya tidak cocok dengan kategori mana pun dikelompokkan jadi **seksi baru yang ditambahkan di akhir daftar**, memakai prototipe kategori yang sama (`protoKategori`), lalu ikut dihitung ke `total`.

**Yang sengaja TIDAK dipilih:** menambahkan kategori kosong `"Riset Kampus"` ke `checklist.json`. Alasannya: kategori itu akan tampil sebagai judul seksi kosong untuk semua pengguna yang belum pernah menyentuh F10, dan `total_butir: 11` di berkas itu dikunci salinan teks §4.4 ("3 dari 11 beres"). Dengan pendekatan yang dipilih, `checklist.json` **tidak berubah** (cukup tambah satu kalimat di `_catatan` bahwa kategori bisa muncul saat runtime), dan `checklist.html` **tidak berubah sama sekali** — koreksi terhadap daftar tugas di `docs/F10-data-struktur-ringkas.md` yang menyebut `checklist.html` perlu diubah.

Angka "X dari Y beres" memang bergerak saat butir baru masuk; itu sudah perilaku yang dirancang (`hitungKemajuan()` menghitung dari jumlah butir runtime, bukan angka 11 yang dipaku).

---

## H. Alur Data Utama

### H.1 Alur normal (F3 → F10 → F5)

```
pilih-mapel.html
  pengguna memilih prodi  → Profil.simpan({prodi_impian: id})   [lanjut.profil.v1]
  tampilkanHasil(id)      → CTA: eksplorasi-tujuan.html?prodi=<id>
        │
        ▼
eksplorasi-tujuan.html   (data-peran="eksplorasi-tujuan")
  1. baca id: URL ?prodi  →  cadangan: Profil.baca().prodi_impian
  2. muatData('profil-prodi')            [fetch data/profil-prodi.json, disinggah]
  3. cari entri ber-id sama
     ├─ ketemu     → render keadaan "profil"
     │                 rasioKeketatan(diterima, peminat.jumlah) → "0,8%" | "—"
     │                 lencana status per kelompok data
     └─ tidak      → render keadaan "kosong" (18 prodi per rumpun)
  4. fetch gagal   → tampilkanGalat() ; isi contoh HTML tetap berdiri
        │
        ▼ tombol "Simpan ke Daftar Periksa"
  ChecklistTambahan.tambah({id:'riset-kampus-<id>', kategori:'Riset Kampus', ...})
                                          [lanjut.checklist.tambahan.v1]
        │
        ▼
checklist.html → pasangChecklist()
  checklist.json + butir tambahan → kategori "Riset Kampus" muncul sebagai seksi baru
  butir belum tercentang; total (Y) bertambah 1
```

### H.2 Alur fallback

```
eksplorasi-tujuan.html tanpa ?prodi dan prodi_impian = "belum"/tidak dikenal
  → keadaan "kosong": pesan + 4 seksi rumpun × daftar prodi
  → pengguna menekan satu prodi → ?prodi=<id> (halaman yang sama, keadaan "profil")
  → lanjut.profil.v1 TIDAK ditulis ulang (pilihan resmi tetap milik F3)
```

### H.3 Alur luring / `file://`

```
fetch gagal → keadaan "galat" tampil, isi contoh di HTML tetap terbaca
           → tidak ada layar putih, tidak ada tombol yang diam saat ditekan
```

---

## I. Definisi Selesai (DoD) F10

Turunan PRD §15 + spec §3 + audit ringkas spec §7.

**Fungsional (spec §3)**
- [ ] Halaman dibuka lewat CTA di layar hasil F3; tidak ada pertanyaan baru; prodi terbawa otomatis.
- [ ] Badge jenjang tampil untuk semua prodi.
- [ ] Badge "Relevan untuk RPL/TKJ/Teknik" tampil **hanya** untuk 3 prodi bertanda, dan tidak tenggelam secara visual.
- [ ] Jumlah peminat **dan** rasio keketatan tampil berpasangan, lengkap dengan tahun & sumber; rasio yang tidak bisa dihitung tampil sebagai `—`.
- [ ] 1–6 mata kuliah tampil; tidak ada daftar yang ditambal agar genap.
- [ ] 2–4 peran kerja tampil.
- [ ] **Tidak ada angka gaji di seluruh layar dan seluruh berkas data** (cari `gaji`, `Rp`, `juta` — harus nihil).
- [ ] Kartu kampus menampilkan jenis + jalur masuk; kampus vokasi tidak berada di posisi terbawah bila ada kampus lain.
- [ ] Tiap kelompok data punya penanda `Terverifikasi`/`Perkiraan` yang benar-benar diambil dari data, bukan dipaku.
- [ ] Disclaimer tampil dan tidak bisa disembunyikan.
- [ ] Tombol "Simpan ke Daftar Periksa" menambah butir kategori "Riset Kampus", **dan butir itu benar-benar terlihat** di `checklist.html` setelah muat ulang.
- [ ] Fallback tampil untuk prodi tanpa profil, berisi 18 prodi per rumpun yang bisa ditekan.

**Definisi Selesai PRD §15**
- [ ] Jalan di layar 360px tanpa gulir mendatar (`node app/tools/validasi.js` bagian C lolos).
- [ ] Layar kosong tertulis (fallback + seksi kosong), bukan halaman putih.
- [ ] Keadaan galat tertulis (luring/`file://`).
- [ ] Teks diambil dari `salinan-teks-lanjut.md` §4.9 (setelah disetujui), bukan dikarang di kode.
- [ ] Data resmi mencantumkan sumber dan tanggal pengecekan (`diperiksa_pada` di kepala `profil-prodi.json`, dirender ke layar).
- [ ] Sudah dicoba minimal 1 orang di luar tim.

**Audit ringkas & regresi**
- [ ] `node app/tools/validasi.js` hijau seluruhnya (check, app, levelin, desain).
- [ ] `test-app.js` diperbarui: peran `eksplorasi-tujuan` terdaftar; helper `rasioKeketatan()` diuji untuk kasus `null` dan pembulatan.
- [ ] Konsistensi silang: setiap `id` di `prodi.json` ada di `profil-prodi.json` dengan `nama` yang sama persis; setiap `prodi_id` di `prodi-mapel.json` ada di `prodi.json`. **Disarankan** ditambahkan sebagai aturan baru di `check.js` supaya tidak melenceng diam-diam.
- [ ] Layar hasil F3 untuk **ke-18 prodi** menghasilkan baris mapel (tidak ada yang kosong).

---

## J. Risiko Teknis & Mitigasi

| # | Risiko | Dampak | Mitigasi |
|---|---|---|---|
| R1 | Butir "Riset Kampus" hilang diam-diam karena kategori tidak cocok di `pasangChecklist()` | Tombol utama F10 terasa rusak; sulit terdeteksi karena tidak ada galat | Perbaikan §G.2 dikerjakan **sebelum** tombolnya dipasang; tambahkan kasus uji di `test-app.js` |
| R2 | `prodi.json` naik ke 18 tapi `prodi-mapel.json` tetap 5 prodi | 14 prodi menghasilkan layar hasil F3 yang diam — regresi pada fitur P0 | Tabel §D.3 wajib dikerjakan satu paket dengan §D.2; ditambah pemeriksaan silang di DoD |
| R3 | `teknik-elektro` dihapus, pengguna lama tersangkut | Layar hasil F3 diam untuk pengguna itu | Penjaga "prodi tidak dikenal → kembali ke langkah masuk" (§D.4); keputusan hapus menunggu konfirmasi |
| R4 | Data 18 prodi basi setelah siklus SNBP/SNBT berikutnya | Angka menyesatkan di keputusan besar siswa | `diperiksa_pada` tampil di layar + disclaimer wajib; catat di catatan rilis bahwa berkas ini di-*refresh* tiap siklus |
| R5 | Godaan menambal `mata_kuliah`/`profesi`/`kampus` supaya jumlahnya "cantik" | Produk mengarang informasi — kerusakan kepercayaan yang tidak sebanding dengan kerapian tampilan | Aturan eksplisit §C.1; `_catatan_data` mencatat setiap kekurangan; lencana "Perkiraan" tampil di layar |
| R6 | Semua status dinaikkan jadi "Terverifikasi" saat menulis JSON | Klaim palsu, melanggar PRD §12 dan semangat `check.js` aturan 9 | Nilai per kelompok sudah dikunci di draf §C.2; peninjau membandingkan ke `docs/riset-top-prodi-lengkap.md` |
| R7 | `?prodi=` dipakai menyuntik teks ke halaman | Celah XSS terpantul | Param hanya untuk pencarian id; render lewat `textContent`; kalimat fallback tidak menggemakan isi URL |
| R8 | Dua metrik berdampingan meluap di 360px (angka 4 digit + label panjang) | Gulir mendatar, gagal DoD | Grid `1fr 1fr`, angka `--text-h2` (bukan `.angka-besar` 48px), label dipendekkan, diuji di 360px |
| R9 | Baris sumber statis di HTML memakai frasa terlarang (`dicek 31 …`) | `check.js` aturan 9 merah | Contoh statis memakai frasa "diperiksa"; tanggal selalu berasal dari data saat JavaScript hidup |
| R10 | Fallback dianggap jalan utama karena Opsi A tidak dikerjakan tuntas | Pengalaman mengecewakan tepat di ujung fitur pembeda | Opsi A (§D) dan pemeriksaan silang id di DoD |

---

## K. Perubahan pada `docs/prd-sdd-lanjut.md`

Sudah diterapkan langsung ke berkasnya:

1. **Bagian 6** — satu baris F10 ditambahkan setelah baris F9, ditandai **v1.1 (di luar lingkup rilis awal, bukan P0/P1)**, merujuk `eksplorasi-tujuan-instruksi.md` dan SDD ini.
2. **Bagian 16 Catatan Perubahan** — satu baris bertanggal 31 Agu 2026 mencatat penambahan F10 sebagai lingkup v1.1 dan penyempitan `prodi.json` ke 18 prodi (Opsi A).

Tidak ada requirement lain di PRD yang diubah.

---

## L. Urutan Kerja yang Disarankan

1. `data/profil-prodi.json` (§C.2) — berdiri sendiri, tidak merusak apa pun.
2. Perbaikan `pasangChecklist()` untuk kategori runtime (§G.2) + kasus uji.
3. `eksplorasi-tujuan.html` + `pasangEksplorasiTujuan()` + helper (§E) — sudah bisa diuji lewat `?prodi=` sebelum CTA ada.
4. CTA di `pilih-mapel.html` (§G.1).
5. **Setelah konfirmasi user soal `teknik-elektro`:** penyelarasan `prodi.json` + `prodi-mapel.json` (§D).
6. `salinan-teks-lanjut.md` §4.9 (§F.3) — disetujui PM sebelum teks dikunci di HTML.
7. `node app/tools/validasi.js` + audit DoD (§I).

Langkah 5 sengaja diletakkan setelah 3–4: F10 bisa diuji penuh (termasuk fallback) tanpa menyentuh data F3, jadi keputusan penghapusan tidak memblokir pekerjaan lain.

---

## M. Pertanyaan Terbuka

| # | Pertanyaan | Keputusan sementara (aman) | Kenapa perlu jawaban user |
|---|---|---|---|
| P1 | `teknik-elektro` dihapus, dibiarkan, atau diriset jadi prodi ke-19? | **Dibiarkan dulu**, penghapusan menunggu konfirmasi | Menghapus data tanpa dicatat dilarang spec §7 langkah 2 |
| P2 | K3 seharusnya dapat badge "Relevan untuk RPL/TKJ/Teknik"? Spec §5 menandai hanya 3 prodi, tapi narasi riset menyebut K3 (dan Teknik K3 PPNS) "sangat relevan bagi siswa SMK" | **Ikut spec §5**: `badge_relevan_smk: false` | Kalau jawabannya "ya", nilai jual utama F10 untuk anak SMK bertambah satu prodi peminat terbanyak |
| P3 | Rumpun untuk K3: Teknologi & Rekayasa atau Kesehatan? | **Teknologi & Rekayasa** (profesinya HSE industri) | Memengaruhi tempat prodi ini muncul di daftar F3 dan fallback F10 |
| P4 | Rumpun baru "Sosial & Humaniora" disetujui? | **Dipakai** untuk 3 prodi | Menambah rumpun berarti menambah satu seksi di daftar F3 |
| P5 | `prodi.json` boleh punya kolom `jenjang` (di luar PRD §13)? | **Boleh**, dengan catatan di berkas — preseden: kolom `kategori` di `checklist.json` | Tanpa itu, "Keperawatan" dan "Ilmu Keperawatan" sulit dibedakan di daftar F3 |
| P6 | `diperiksa_pada` untuk `profil-prodi.json` = 31 Agu 2026? | **Ya** (tanggal laporan riset disusun; laporan tidak memuat tanggal eksplisit) | Tanggal ini tampil ke pengguna sebagai klaim kapan data dicek |
| P7 | 3 prodi hanya punya 1 kampus (Keperawatan Anestesiologi, Humas & Komunikasi Digital, Manajemen Bisnis) dan 1 prodi hanya 2 (Keperawatan D3) — target spec 3–5 | **Tampilkan apa adanya**, catat di `_catatan_data` | Kalau dianggap kurang, perlu riset susulan sebelum F10 tayang |
| P8 | Status berkas `terverifikasi_sebagian` — kosakata baru di luar `belum_diverifikasi`/`resmi` | **Dipakai**, karena isinya memang campuran dan aturan `check.js` melarang `diperiksa_pada` terisi pada `belum_diverifikasi` | Perlu disepakati supaya konsisten untuk berkas data berikutnya |
