# TASK: Perbaiki Skrip Seed (`npm run benih`)

## Konteks

Dari laporan LANJUT_007: skrip `npm run benih` di `LANJUT_App/server/` rusak sejak restrukturisasi repo (26 Sep) — masih mencari data di path lama `LANJUT_App/app/data/`, padahal sekarang datanya ada di `MVP-PWA/data/`. Skrip ini juga belum membaca kolom baru `berlaku_untuk_rumpun` (ditambahkan di LANJUT_007).

**Kenapa ini penting:** begitu tim konten menentukan butir checklist khusus per rumpun (kerja terpisah, bukan bagian task ini), mereka butuh cara masuk data yang tidak ribet — idealnya edit file JSON/data lalu jalankan `npm run benih`, bukan tulis SQL manual.

**Jangan ubah struktur data/skrip lebih dari yang perlu** — task ini perbaikan, bukan desain ulang.

## Langkah 0 — Audit dulu

1. Baca skrip `npm run benih` (cari file-nya, kemungkinan di `server/src/db/` atau `server/scripts/`) — pahami alur kerjanya: baca file apa, insert ke tabel apa.
2. Cek isi `MVP-PWA/data/` — apakah strukturnya sama persis dengan yang dulu ada di `LANJUT_App/app/data/`, atau ada perbedaan format yang perlu disesuaikan di skrip (bukan cuma ganti path)?
3. Cek apakah ada data lain (selain checklist) yang mungkin juga kena masalah path yang sama — laporkan kalau nemu, tapi jangan perbaiki di luar scope task ini kecuali kecil dan jelas terkait.

## Langkah 1 — Perbaiki path

1. Update path referensi dari `LANJUT_App/app/data/` ke `MVP-PWA/data/` di skrip seed.
2. Jalankan `npm run benih` di database test lokal, konfirmasi tidak ada error dan data yang masuk sesuai ekspektasi (bandingkan jumlah baris/isi dengan yang ada di file sumber).

## Langkah 2 — Tambah dukungan kolom `berlaku_untuk_rumpun`

1. Update skrip supaya bisa membaca field rumpun dari file sumber data (kalau formatnya belum mendukung field ini, tambahkan cara untuk itu — misal field opsional `rumpun` di JSON, default kosong/null kalau tidak ada).
2. Jalankan ulang `npm run benih` — pastikan butir yang **tidak punya field rumpun** tetap masuk dengan `berlaku_untuk_rumpun = null` (berlaku umum), TIDAK berubah dari behavior sebelumnya.
3. Buat 1 contoh data butir dengan rumpun di file sumber (data dummy/placeholder yang jelas ditandai sebagai contoh, BUKAN data final dari tim konten) untuk membuktikan skrip bisa handle kasus ini — tapi jangan biarkan data dummy ini ikut ke database test yang dipakai untuk hal lain; hapus lagi setelah dikonfirmasi jalan, atau taruh di file terpisah yang jelas-jelas "contoh".

## Langkah 3 — Test

1. Jalankan `npm test` di `server/` — pastikan tetap 48/48 lolos (tidak boleh ada regresi dari perbaikan skrip ini).
2. Test manual: jalankan `npm run benih` dari kondisi database kosong → semua data (termasuk checklist) masuk dengan benar, sama seperti sebelum path rusak.

## Langkah 4 — Commit & dokumentasi

- Commit terpisah: fix path, lalu dukungan kolom rumpun
- Update `server/README.md` (atau dokumen serupa) kalau ada instruksi cara pakai `npm run benih` yang menyebut path lama

## Definition of Done

- [ ] `npm run benih` jalan tanpa error, path sudah benar (`MVP-PWA/data/`)
- [ ] Skrip mendukung field rumpun opsional, default null kalau tidak ada
- [ ] Data lama (tanpa rumpun) tetap masuk dengan benar seperti sebelumnya
- [ ] `npm test` tetap 48/48 (atau lebih tinggi kalau ada test baru untuk skrip ini)
- [ ] Tidak ada perubahan di `LANJUT_App/` (Expo) — ini backend-only

## Laporkan di akhir

- File skrip yang diperbaiki (path lengkap)
- Konfirmasi jumlah data yang berhasil masuk setelah `npm run benih` dijalankan dari kondisi kosong
- Apakah ada data lain (selain checklist) yang kena masalah path sama, dan apakah itu ikut diperbaiki atau perlu task terpisah
- Commit hash
