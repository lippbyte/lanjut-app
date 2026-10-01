# TASK: LANJUT_033 — Audit Kesenjangan Fitur Terkini

## Konteks

Audit gap terakhir (LANJUT_029, 28 Sep) mencatat status fitur SEBELUM F10
Eksplorasi "siap eksekusi" (LANJUT_031) dan SEBELUM Task 32 (Chat + Gaya
Belajar) selesai. Sudah ada 18 commit sejak itu yang belum di-cross-check.

**Prioritas kerja mulai sekarang:** dahulukan fitur yang BELUM ADA
(functional requirements). Perbaikan UX/layout/polishing ditunda ke tahap
terpisah — JANGAN masukkan item UX/polish ke daftar prioritas ini kecuali
itu blocker fungsional.

## Yang Diminta

1. Cek kondisi kode SEKARANG (bukan dari ingatan/laporan lama) untuk tiap
   fitur berikut, status per LANJUT_029:
   - **F10 Eksplorasi Tujuan** — tercatat "tidak ada tabel/endpoint sama
     sekali", tapi LANJUT_031 sudah dibuat "siap eksekusi". Cek: apakah
     sudah mulai dikerjakan atau masih di titik yang sama?
   - **Onboarding** (tanya kelas saat daftar) — tercatat tidak ada
   - **F3 Pilih Mapel** — sebagian, belum ada tombol ke F10
   - **F6 Arsip** — CRUD siap, belum ada kolom kategori
   - **F7 Latihan** — endpoint ada tanpa tes
   - **Level-In** — tercatat RUSAK (endpoint 500, urutan argumen beda dari
     PWA)
   - **F9 Bank Soal** — terblokir, belum ada mitra
   - **Generate Soal** — 3 keputusan bisnis masih menunggu Khalifa (hak
     cipta, label "dibuat AI", biaya)

2. Untuk tiap fitur, laporkan: status aktual sekarang, apa yang berubah
   sejak LANJUT_029 (kalau ada), dan effort kasar (kecil/sedang/besar)
   kalau mau dikerjakan.

3. Susun jadi daftar terurut berdasarkan:
   - (a) tidak ada blocker keputusan/legal
   - (b) dependency teknis paling sedikit
   - (c) nilai fungsional paling tinggi buat positioning baru (siswa
     SMP/SMA/SMK eksplorasi cita-cita, bukan cuma kelas 12)

4. JANGAN mulai coding fitur apa pun di task ini — ini murni audit/laporan.

## Keluaran

Tabel/daftar fitur dengan kolom:

| Nama fitur | Status sekarang | Berubah dari LANJUT_029? | Blocker (ada/tidak) | Effort kasar | Rekomendasi urutan |
|---|---|---|---|---|---|

Laporkan di sini, Khalifa yang putuskan task berikutnya (LANJUT_034)
berdasarkan hasilnya.
