# TASK: Perbaiki `npm run benih` Menimpa Kolom Verifikasi

## Konteks

Ditemukan di LANJUT_010: `npm run benih` menimpa `status_verifikasi` dan `diperiksa_pada` setiap kali dijalankan, dengan nilai dari file JSON (yang selalu "belum diverifikasi"). Ini menghapus kerja tim konten yang sudah menandai konten terverifikasi lewat skrip `verifikasi-konten` (LANJUT_010), setiap kali `benih` dijalankan ulang (misal untuk menambah prodi baru).

**Prioritas tinggi** — ini harus beres sebelum tim konten mulai proses verifikasi sungguhan, supaya kerja mereka tidak hilang kalau ada yang menjalankan `benih` lagi untuk keperluan lain.

## Solusi yang diminta

Ubah logic `benih` (`LANJUT_App/server/src/db/benih/benih.js`) supaya:
- **Saat insert baris BARU** (belum ada di database): isi `status_verifikasi` dan `diperiksa_pada` dengan nilai default dari JSON (biasanya "belum diverifikasi"/kosong) — behavior ini tidak berubah.
- **Saat baris SUDAH ADA** (upsert/update baris yang sudah pernah di-seed): **JANGAN sentuh** kedua kolom itu — biarkan nilai yang ada di database (baik itu hasil verifikasi manual atau masih default) tetap seperti apa adanya.

Semua kolom lain (judul, tanggal, dll dari konten) tetap di-update seperti biasa — cuma dua kolom verifikasi ini yang dikecualikan dari overwrite.

## Langkah 1 — Implementasi

1. Cari bagian upsert/insert di `benih.js` untuk keenam jenis konten yang bisa diverifikasi (Linimasa, Khusus SMK, Daftar Periksa, prodi, mapel, Cerita Alumni).
2. Ubah query/logic supaya `status_verifikasi` dan `diperiksa_pada` hanya diisi saat `INSERT` baris baru, dikecualikan dari klausa `UPDATE`/`ON DUPLICATE KEY UPDATE` (atau pola serupa tergantung cara benih ini ditulis).

## Langkah 2 — Test

1. Test baru: tandai satu baris (pakai skrip verifikasi) → jalankan `npm run benih` lagi → konfirmasi baris itu **tetap terverifikasi**, tidak ke-reset.
2. Test lama tetap harus lolos: baris baru yang belum pernah ada tetap masuk dengan status default "belum diverifikasi".
3. `npm test` di `server/` — pastikan tetap lolos semua (56/56 sebelumnya, plus test baru untuk ini).

## Langkah 3 — Dokumentasi

Update catatan peringatan yang sudah ditulis di `server/README.md` (dari LANJUT_010) — ganti dari "benih menghapus tanda cek" jadi konfirmasi bahwa ini sudah diperbaiki, aman dijalankan ulang kapan saja.

## Langkah 4 — Commit

- Commit terpisah untuk fix ini

## Definition of Done

- [ ] Baris yang sudah ditandai terverifikasi TETAP terverifikasi setelah `npm run benih` dijalankan ulang
- [ ] Baris baru tetap masuk dengan default "belum diverifikasi" seperti biasa
- [ ] Semua konten lain (bukan kolom verifikasi) tetap ter-update normal oleh benih
- [ ] `npm test` tetap lolos semua
- [ ] README diupdate mengonfirmasi perbaikan ini
- [ ] Tidak ada perubahan di `LANJUT_App/` (Expo) — ini backend-only

## Laporkan di akhir

- Konfirmasi test skenario "verifikasi → benih ulang → tetap terverifikasi" lolos
- Commit hash
