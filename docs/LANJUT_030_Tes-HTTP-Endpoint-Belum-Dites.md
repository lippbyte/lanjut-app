# TASK: Tes HTTP untuk Endpoint yang Belum Dites

## Konteks

Dari audit LANJUT_029: endpoint `linimasa`, `khusus-smk`, `cerita-alumni`, dan `kemajuan` jalan normal tapi **belum punya tes HTTP** — beda dari `checklist` dan `auth` yang sudah dites lengkap sejak LANJUT_007/001. Ini celah nyata: kalau ada yang mengubah kode di endpoint-endpoint itu nanti, tidak ada yang otomatis memberi tahu kalau rusak.

**Ini BUKAN fitur baru.** Ini memperkuat yang sudah ada, sejalan dengan rekomendasi "jangan tambah fitur sebelum 4 Oktober, fokus stabilitas".

**Jangan ubah kode endpoint itu sendiri.** Tugas ini murni menambah tes. Kalau saat menulis tes kamu menemukan endpoint benar-benar salah (bukan cuma belum dites), **berhenti dan laporkan**, jangan diam-diam diperbaiki di task ini.

## Langkah 1 — Audit dulu

Untuk tiap dari 4 endpoint, baca kodenya dan tentukan:
1. Parameter yang diterima (query, body)
2. Bentuk respons sukses
3. Kasus error yang mungkin (data kosong, ID tidak ada, tidak login kalau perlu auth)
4. Apakah ada filter verifikasi (seperti Linimasa yang cuma tampilkan yang terverifikasi) yang perlu diuji eksplisit

## Langkah 2 — Tulis tes

Untuk tiap endpoint, minimal tes:
- [ ] Respons sukses dengan data normal (bentuk data benar)
- [ ] Kondisi kosong (misal tidak ada Linimasa terverifikasi) — tidak error, balas struktur kosong yang benar
- [ ] Parameter salah/tidak valid (kalau ada) — balas error yang jelas, bukan 500
- [ ] Untuk `cerita-alumni`: konfirmasi cerita yang belum diizinkan tayang tidak ikut muncul di respons publik (kalau memang begitu aturannya — cek dulu di Langkah 1, jangan diasumsikan)
- [ ] Untuk `kemajuan`: konfirmasi data milik akun lain tidak ikut terbawa (uji dengan 2 akun, mirip pola tes checklist yang sudah ada)

## Langkah 3 — Jalankan

- [ ] `npm test` di `server/` — pastikan semua tes lama tetap lolos plus tes baru
- [ ] Jalankan 2x untuk pastikan tidak ada tes yang goyah (flaky), sama seperti pola LANJUT_011

## Langkah 4 — Commit

Commit terpisah per endpoint atau digabung, sesuai yang lebih rapi — jelaskan pilihannya di laporan.

## Definition of Done

- [ ] Keempat endpoint punya tes yang mencakup kondisi sukses, kosong, dan error
- [ ] `npm test` lolos semua, dijalankan 2x
- [ ] Tidak ada perubahan kode endpoint (kecuali ditemukan bug nyata, dan itu dilaporkan bukan langsung diperbaiki)
- [ ] Tidak ada perubahan di `LANJUT_App/` (Expo)

## Laporkan di akhir

- Jumlah tes baru per endpoint
- Kalau ditemukan bug nyata (bukan cuma belum dites): jelaskan, jangan diperbaiki di task ini
- Jumlah total tes sekarang (sebelum vs sesudah)
- Commit hash
