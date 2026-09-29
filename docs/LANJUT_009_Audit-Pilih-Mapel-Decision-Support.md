# TASK: Audit & Perkuat "Pilih Mapel" — v1.2 Decision Support

## Konteks

Brief (section 6.3) minta Pilih Mapel jadi **decision support**, bukan sekadar pilih dari daftar: "profil siswa + target prodi + aturan resmi → membantu memahami pilihan relevan."

**Batasan penting:** Task ini **HANYA memakai data yang sudah ada** dari endpoint yang sudah ada (`/konten/prodi`, `/konten/prodi/:id/mapel`, `/konten/mapel/agregasi-lintas-prodi`). **Jangan minta/karang konten penjelasan baru** yang belum ada di database — itu ulang masalah yang sama seperti Linimasa (data belum terverifikasi tim konten).

**Jangan ubah apapun di `LANJUT_App/server/`.**

## Langkah 0 — Audit implementasi sekarang vs data yang tersedia

1. Baca response penuh dari ketiga endpoint di atas — field apa saja yang tersedia yang **belum ditampilkan** di UI sekarang? (Misal: ada field deskripsi/alasan yang datanya ada tapi belum dipakai di komponen Expo?)
2. Bandingkan dengan implementasi Pilih Mapel sekarang (dari laporan LANJUT_003: "3 langkah: pintu masuk → prodi per rumpun → hasil", "ikon Tersedia di SMK / Cek alternatif", "kartu saran mapel TKA") — apa yang sudah bagus, apa yang terasa kurang "membantu memahami" dibanding sekadar daftar?
3. Catat temuan: field data yang ADA tapi BELUM ditampilkan (ini yang boleh dikerjakan task ini) vs field/konten yang TIDAK ADA di data (ini di luar scope, laporkan sebagai kebutuhan konten terpisah).

## Langkah 1 — Implementasi (hanya dari data yang sudah ada)

Contoh peningkatan yang mungkin masuk akal (sesuaikan dengan temuan Langkah 0, ini bukan daftar wajib):
- Kalau ada field yang menjelaskan KENAPA suatu mapel relevan untuk prodi tertentu tapi belum ditampilkan — tampilkan
- Kalau siswa punya `prodi_impian` (dari Jalur Saya) — highlight/prioritaskan info yang relevan ke prodi itu di hasil Pilih Mapel, bukan tampilan generik
- Perbaiki kejelasan alur 3 langkah kalau dari audit ternyata ada bagian yang membingungkan (bukan nambah step baru, cukup perjelas yang ada)

**Jangan** menambahkan teks penjelasan yang kamu karang sendiri untuk mengisi kekosongan data.

## Langkah 2 — Test manual

- [ ] Alur 3 langkah tetap berfungsi normal
- [ ] Kalau ada personalisasi baru (misal by `prodi_impian`): test dengan akun yang punya target vs yang belum
- [ ] TypeScript typecheck: 0 error

## Langkah 3 — Commit

- Commit terpisah per peningkatan

## Definition of Done

- [ ] Audit Langkah 0 selesai, temuan dicatat jelas (data ada-tapi-belum-dipakai vs data-tidak-ada)
- [ ] Peningkatan yang diimplementasikan murni dari data yang sudah ada
- [ ] Tidak ada konten baru yang dikarang
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `server/`

## Laporkan di akhir

- Field data yang ada tapi belum dipakai (kalau ada) — dan apakah sudah dimanfaatkan di task ini
- Field/konten yang TIDAK ADA di data dan perlu tim konten isi dulu (daftar ini penting buat saya teruskan)
- Kalau ternyata setelah audit tidak ada peningkatan berarti yang bisa dilakukan tanpa konten baru — itu jawaban yang valid, laporkan saja, jangan dipaksakan
- Commit hash (kalau ada perubahan)
