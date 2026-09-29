# TASK: Redirect ke Layar Masuk untuk 401 Kapanpun

## Konteks

Dari audit LANJUT_017: sekarang, kalau server merespons 401 **saat aplikasi pertama dibuka** (cek sesi), user diarahkan ke layar Masuk — ini benar. Tapi kalau 401 terjadi **di tengah pemakaian** (misal sesi dicabut, token expired), yang tampil cuma **error state di layar itu saja** — user tidak diarahkan ke Masuk, dan tidak jelas kalau solusinya adalah login ulang.

**Efeknya:** user bisa mengira app-nya rusak/error, padahal cuma perlu login lagi.

**Jangan ubah apapun di `server/`.**

## Langkah 1 — Audit dulu

1. Cari tempat 401 ditangani sekarang (kemungkinan di `services/client.ts` atau interceptor sejenis, dan di masing-masing layar yang fetch data).
2. Konfirmasi: apakah ada satu tempat terpusat (interceptor di level HTTP client) yang bisa menangani semua 401 sekaligus, atau apakah tiap layar handle error-nya sendiri-sendiri? Ini menentukan seberapa besar perubahan yang dibutuhkan.

## Langkah 2 — Implementasi

1. Idealnya: tangani 401 di **satu tempat terpusat** (interceptor/wrapper HTTP client), bukan di tiap layar terpisah.
2. Kalau menerima 401 dari server (kapanpun, bukan cuma saat cek sesi awal): hapus token dari penyimpanan, lalu redirect ke layar Masuk.
3. Tampilkan pesan singkat yang menjelaskan kenapa (misal: "Sesi kamu berakhir, silakan masuk lagi") — bukan cuma diam-diam redirect tanpa penjelasan, supaya user tidak bingung kenapa tiba-tiba di layar Masuk.
4. Pastikan ini tidak mengganggu alur normal (bukan 401) — error lain (500, network error, dll) tetap ditangani seperti biasa, jangan ikut redirect ke Masuk.

## Langkah 3 — Test manual

- [ ] Simulasikan 401 di tengah pemakaian (bisa manipulasi token jadi invalid di storage lalu coba fetch data) → redirect ke Masuk dengan pesan jelas
- [ ] Error lain (matikan backend sebentar untuk simulasi network error) → TIDAK ikut redirect ke Masuk, tetap tampil error state seperti biasa
- [ ] Alur normal (401 saat cek sesi awal, sudah ada sebelumnya) → tetap berfungsi seperti semula
- [ ] TypeScript typecheck: 0 error

## Langkah 4 — Update dokumen

Update anotasi §6.5 di `SDD-Backend-Foundation.md` (dari LANJUT_017) — ganti dari "hanya redirect saat cek sesi awal" jadi "redirect ke Masuk untuk 401 kapanpun, dengan pesan penjelasan", karena sekarang sudah konsisten.

## Definition of Done

- [ ] 401 kapanpun (bukan cuma cek sesi awal) → redirect ke Masuk + pesan jelas
- [ ] Error non-401 tidak terpengaruh
- [ ] TypeScript typecheck: 0 error
- [ ] Anotasi §6.5 diperbarui
- [ ] Tidak ada perubahan di `server/`

## Laporkan di akhir

- Di mana logic ini ditempatkan (terpusat atau per-layar, dan kenapa)
- Hasil test manual ketiga skenario di atas
- Commit hash
