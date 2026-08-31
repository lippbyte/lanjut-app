# Briefing untuk Tester Eksternal (Antigravity) — LANJUT

**Peran kamu:** independent tester. Tugasmu mencari hal yang **belum diketahui tim**, bukan menegaskan ulang yang sudah tercatat di bawah. Kalau nemu sesuatu di daftar "Sudah Diketahui", cukup catat status konsistennya (masih ada/sudah hilang), bukan lapor sebagai temuan baru.

## Apa itu LANJUT

PWA (bukan native app) buatan tim siswa SMK untuk membantu siswa SMK kelas 12 menavigasi jalur masuk kuliah (TKA/SNBP/SNBT) — termasuk jalur vokasi yang sering tidak disorot penjelasan berbasis SMA. Tumpukan teknologi: HTML/CSS/JS vanilla, mobile-first, tanpa framework.

## Status Saat Ini

- **v1 core (F1-F9):** lolos audit internal, semua P0 fungsional (Linimasa, Khusus SMK, Pilih Mapel, Alumni, Daftar Periksa) + P1 (Arsip Belajar, Latihan, Bank Soal).
- **F10 Eksplorasi Tujuan:** SDD selesai, sedang/baru selesai diimplementasikan backend+UI paralel.
- **Level-In (kalibrasi keyakinan):** lolos QA manual lengkap, siap rilis.

## Lingkup yang Perlu Diuji (SEMUA client-side, tanpa backend)

Alur yang bisa dijangkau lewat navigasi normal dari `index.html`:

```
Splash → Onboarding → Beranda (hub)
  → Khusus SMK
  → Pilih Mapel → hasil → Eksplorasi Tujuan (kalau sudah selesai diimplementasi)
  → Checklist (Daftar Periksa)
  → Alumni (lewat kartu di Beranda)
  → Arsip Belajar → Detail Mapel → Tambah Kartu
  → Latihan Harian → Latihan Selesai (dengan Level-In: chip keyakinan, strip gap)
  → Bank Soal Mitra
```

Data disimpan di `localStorage`/`sessionStorage` browser — tidak ada backend yang perlu hidup untuk alur ini berfungsi.

## DI LUAR Lingkup — Jangan Dilaporkan sebagai Bug

| Yang mungkin kamu temukan                                      | Kenapa bukan bug                                                                                                                                                                               |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `daftar.html`, `masuk.html`, `akun.html` gagal / API error     | Halaman ini manggil backend asli (`/api/v1/auth/...`) yang sengaja belum terhubung ke alur utama — kerjaan paralel v1.1, bukan bagian dari v1. Tidak ada link ke halaman ini dari nav manapun. |
| Tidak ada dukungan offline penuh saat internet dimatikan total | Belum ada service worker — sudah tercatat sebagai backlog v1.1, bukan cacat v1.                                                                                                                |
| Cerita Alumni kosong / cuma 1-2 contoh berlabel "CONTOH"       | Disengaja — kondisi kosong adalah kondisi utama yang memang dirancang begitu, bukan data yang lupa diisi.                                                                                      |
| Bank Soal Mitra kosong/minim                                   | Disengaja, sama alasannya — belum ada mitra riil bergabung.                                                                                                                                    |

## Sudah Diketahui — Sedang/Segera Ditindaklanjuti (bukan temuan baru)

1. **Latihan Harian:** UI sempat menjanjikan "Kartu 1 dari 12" tapi sesi berakhir setelah 1 kartu — kemungkinan gap lama di F7 (queue multi-kartu), sedang diklarifikasi apakah ini regresi atau scope v1.1.
2. **Level-In:** sudah lolos 6/6 checklist manual + auto-test, tapi verifikasi visual (kontras warna, layar 360-375px) belum dicek mata manusia secara formal — kalau kamu bisa cek ini, itu genuinely berguna.
3. **F10 Eksplorasi Tujuan:** beberapa prodi datanya tidak lengkap secara sengaja (1-2 kampus saja untuk 3 prodi, bukan 3-5) — ditandai `status_sumber: "Perkiraan"` di data, bukan bug.

## Yang PALING Berguna Buat Dicari (fokus di sini)

- Bug interaksi yang belum pernah diuji manual (selain 6 checklist Level-In di atas)
- Elemen yang terlihat aktif tapi diam saat diklik, di luar yang sudah tercatat
- Masalah tampilan di lebar layar selain 360px/375px yang sudah dicek (mis. 320px, tablet)
- Inkonsistensi antar halaman (nav, style, copy) yang lolos dari audit internal
- Apa pun yang terasa membingungkan dari sudut pandang siswa SMK yang baru pertama kali pakai — bukan cuma dari sudut pandang teknis

## Cara Deploy untuk Demo (kalau perlu dijalankan sendiri)

Folder `app/` bisa langsung di-deploy sebagai static site (Vercel, Netlify, GitHub Pages, dll) — semua path relatif, tidak ada domain di-hardcode. **Jangan** deploy `server/` ke platform yang sama kecuali memang mau menguji fitur akun (di luar lingkup saat ini).
