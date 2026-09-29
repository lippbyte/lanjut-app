# TASK: Fix Label Sumber & Logika Tenggat di Beranda/Cek Posisi

## Konteks

Dari LANJUT_020, ditemukan 2 masalah tampilan setelah data TKA resmi masuk:

1. **Label sumber hardcode "SNPMB"** di `LinimasaScreen.tsx:127`, padahal sumber sebenarnya bisa beda-beda per item (TKA dari Kemendikdasmen, bukan SNPMB). Layar Khusus SMK sudah benar — menentukan label dari alamat sumber data, bukan hardcode.
2. **Tenggat pelaksanaan dihitung ke tanggal SELESAI**, padahal untuk event yang punya rentang tanggal (pelaksanaan TKA 26 Okt–8 Nov), yang lebih berguna buat siswa adalah hitungan ke tanggal **MULAI**. Untuk pendaftaran (yang memang cuma py deadline tunggal), hitung ke tanggal tutup itu sudah benar.

**Jangan ubah apapun di `server/`.**

## Langkah 1 — Audit dulu

1. Cek `LinimasaScreen.tsx` dan cara Khusus SMK menentukan label sumber dari alamat — pahami polanya, reuse kalau bisa (jangan duplikasi logic).
2. Cek struktur data Linimasa dari `GET /konten/linimasa` — apakah ada field yang membedakan jenis event (misal "pendaftaran" vs "pelaksanaan"), atau cuma ada tanggal mulai+selesai tanpa kategori eksplisit?
3. Kalau tidak ada field kategori eksplisit: tentukan heuristik yang masuk akal (misal: kalau ada tanggal mulai DAN selesai yang beda → hitung ke tanggal mulai; kalau cuma py satu tanggal/deadline tunggal → hitung ke situ). Konfirmasi ini masuk akal dengan melihat 2-3 contoh data yang ada.

## Langkah 2 — Fix label sumber

1. Ganti hardcode "SNPMB" di `LinimasaScreen.tsx` dengan logic yang sama seperti Khusus SMK — tentukan label dari alamat sumber sebenarnya.
2. Test dengan data TKA (sumber Kemendikdasmen) — label harus tampil benar, bukan "SNPMB".

## Langkah 3 — Fix logika tenggat

1. Terapkan heuristik dari Langkah 1: pelaksanaan/event dengan rentang tanggal → hitung mundur ke tanggal MULAI, bukan selesai.
2. Ini harus konsisten di **kedua tempat**: Beranda (`LinimasaScreen.tsx`) dan Cek Posisi Gue (`lib/cekPosisi.ts`, dari LANJUT_013) — jangan cuma benerin satu, keduanya reuse fungsi yang sama (`turunkanLinimasa`), pastikan tetap begitu.
3. Test dengan data TKA:
   - Sebelum 26 Okt: harus tampil "X hari menuju **Pelaksanaan TKA dimulai**, 26 Oktober" (bukan "ditutup, 8 November")
   - Setelah 26 Okt tapi sebelum 8 Nov: perlu diputuskan — apakah tampil "sedang berlangsung" atau hitung mundur ke tanggal selesai? Putuskan yang masuk akal, laporkan keputusannya.
4. Pastikan pendaftaran (`daftar-akun-tka`) TIDAK terpengaruh — itu tetap hitung ke tanggal tutup seperti sebelumnya.

## Langkah 4 — Test manual

- [ ] Ubah jam sistem/browser ke sebelum 26 Okt → Beranda & Cek Posisi tampil "menuju dimulai, 26 Oktober" dengan hitungan hari benar
- [ ] Label sumber tampil "Kemendikdasmen" (atau sejenisnya, bukan "SNPMB") untuk item TKA
- [ ] Pendaftaran TKA (kalau masih ada test data sebelum tutup) tetap hitung ke tanggal tutup, tidak berubah
- [ ] TypeScript typecheck: 0 error

## Langkah 5 — Commit

- Commit terpisah: fix label sumber, lalu fix logika tenggat

## Definition of Done

- [ ] Label sumber dinamis dari data, tidak ada lagi hardcode "SNPMB"
- [ ] Tenggat event dengan rentang tanggal hitung ke tanggal MULAI, konsisten di Beranda dan Cek Posisi Gue
- [ ] Pendaftaran/deadline tunggal tetap hitung ke tanggal tutup (tidak regresi)
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `server/`

## Laporkan di akhir

- Heuristik yang dipakai untuk bedain "hitung ke mulai" vs "hitung ke selesai" (field data atau logic apa persisnya)
- Keputusan untuk kondisi "sedang berlangsung" (26 Okt–8 Nov) — tampil apa
- Screenshot sebelum/sesudah fix, untuk kedua masalah
- Commit hash
