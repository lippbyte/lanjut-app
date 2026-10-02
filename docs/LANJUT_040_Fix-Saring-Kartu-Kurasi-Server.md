# TASK: LANJUT_040 — Penyaringan Kartu Kurasi di Server

## Konteks

Dari LANJUT_039: `GET /kartu` tanpa parameter `?sumber=pengguna` masih
mengirim kartu kurasi yang belum terverifikasi. Sekarang amannya cuma
karena app selalu mengirim parameter itu. Kalau ada klien lain (web
lama, API langsung, bug di versi app depan) yang lupa kirim parameter,
kartu kurasi yang belum dicek tim konten bisa bocor ke siswa.

Endpoint konten lain (`/konten/eksplorasi-tujuan`, F10) sudah filter
status verifikasi di server secara default — `/kartu` perlu konsisten
dengan pola itu.

Khalifa memutuskan: perbaiki sekarang, jangan ditunda.

**Prioritas tetap: fungsi dulu.** Ini perbaikan keamanan/konsistensi,
bukan fitur baru — scope-nya kecil, jangan melebar ke hal lain.

## Yang Diminta

1. **Default `GET /kartu` (tanpa parameter apapun) harus aman**:
   - Kartu milik pengguna sendiri: selalu tampil (baik draf maupun
     sudah "jadi", sesuai aturan yang sudah ada).
   - Kartu kurasi: HANYA tampil kalau statusnya sudah `terverifikasi`.
     Karena saat ini 0 dari kartu kurasi yang terverifikasi, secara
     praktis defaultnya harus mengembalikan kartu kurasi kosong sampai
     ada yang diverifikasi.
2. **Parameter `?sumber=pengguna` tetap boleh ada** (app sudah pakai
   ini), tapi sekarang jadi filter tambahan di atas aturan default yang
   sudah aman — bukan satu-satunya garis pertahanan.
3. Jangan ubah struktur response atau bentuk data yang sudah dipakai
   app — ini perbaikan logic filter di server, bukan perubahan kontrak
   API yang terlihat dari sisi app (app seharusnya tidak perlu diubah
   sama sekali).
4. Tambahkan tes eksplisit: `GET /kartu` TANPA parameter apapun tidak
   boleh mengembalikan kartu kurasi yang belum terverifikasi.

## Test

- [ ] `GET /kartu` tanpa parameter → tidak ada kartu kurasi belum terverifikasi dalam hasil
- [ ] `GET /kartu?sumber=pengguna` → tetap berfungsi seperti sebelumnya
- [ ] Kartu milik pengguna sendiri tetap selalu tampil di kedua kasus di atas
- [ ] Tidak ada regresi di tes `/kartu` yang sudah ada (LANJUT_039 dan sebelumnya)
- [ ] Typecheck 0 error

## Definition of Done

- [ ] Filter verifikasi kartu kurasi ada di server, bukan cuma di parameter/app
- [ ] Tes eksplisit untuk kasus ini lolos
- [ ] Tidak ada perubahan yang dibutuhkan di app
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Konfirmasi: app benar-benar tidak perlu diubah (atau kalau ternyata perlu, jelaskan kenapa)
