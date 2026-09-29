# TASK: Daftar Periksa Personal Berdasarkan Target Prodi — v1.1 Personalization

## Konteks

Daftar Periksa sudah personal berdasarkan `kelas` (dari LANJUT_001/003). Sekarang tambahkan personalisasi berdasarkan `prodi_impian` (target prodi, dari Jalur Saya/LANJUT_004) — supaya butir checklist makin relevan, bukan generik untuk semua siswa.

Contoh dari brief (section 6.5): "Tentukan target prodi, Riset PTN, Tentukan jalur, Persiapkan dokumen, Persiapkan TKA, Registrasi" — sebagian butir ini **bergantung pada prodi** (misal dokumen portofolio untuk DKV, beda dengan syarat administratif Informatika).

**Jangan ubah apapun di `LANJUT_App/server/`** kecuali sekadar baca data yang sudah ada — kalau ternyata butuh field/endpoint baru untuk mapping prodi→butir checklist, **laporkan dulu, jangan buat sendiri**.

## Langkah 0 — Audit dulu (wajib)

1. Cek struktur data checklist saat ini: `GET /konten/checklist?kelas=&jalur=` — apakah butir-butirnya statis per kelas/jalur, atau ada struktur yang memungkinkan filter tambahan by prodi?
2. Cek apakah backend punya cara mengelompokkan prodi ke rumpun/kategori (disebut di LANJUT_003: "3 langkah: pintu masuk → prodi per rumpun → hasil" di Pilih Mapel) — kalau ada, itu bisa dipakai untuk mapping checklist juga tanpa perlu hardcode.
3. Cek apakah ada butir checklist yang **memang sama untuk semua prodi** (generik, misal "buat akun SNPMB") vs yang **spesifik** (misal "siapkan portofolio" cuma relevan untuk prodi seni/desain).
4. **Kalau backend belum punya cara untuk membedakan butir per prodi** (semua checklist statis, tidak ada mapping): **STOP, jangan hardcode logic mapping prodi→butir di frontend**. Ini keputusan konten/data yang lebih baik diselesaikan di backend/database dulu, supaya konsisten dan gampang di-maintain tim konten (bukan ketanam di kode Expo). Laporkan temuan ini sebagai kandidat task backend terpisah.

## Langkah 1 — (Kalau data mendukung) Implementasi filter tambahan

Kalau dari Langkah 0 ternyata backend sudah punya struktur yang mendukung (misal field `rumpun_prodi` atau semacamnya yang bisa dipetakan dari `prodi_impian`):

1. Ambil `prodi_impian` dari profil (sudah ada, dipakai di Jalur Saya)
2. Kirim sebagai parameter tambahan ke endpoint checklist (kalau backend sudah mendukung) atau filter di client (kalau data yang diterima sudah lengkap dan filtering cukup di sisi Expo)
3. Butir yang tidak relevan untuk prodi tersebut: **jangan dihilangkan total**, tapi bisa dikelompokkan/ditandai beda (misal section terpisah "Khusus untuk prodi kamu") — supaya siswa yang belum pasti prodinya (banyak siswa masih di tahap Eksplorasi per LANJUT_005) tetap lihat checklist umum

## Langkah 2 — Kalau `prodi_impian` kosong

Sesuai temuan LANJUT_005: banyak siswa masih di tahap "Eksplorasi" tanpa `prodi_impian` terisi. Pastikan:
- Checklist tetap tampil normal (butir umum), tidak ada section kosong aneh
- Mungkin ada ajakan halus untuk isi `prodi_impian` di Jalur Saya (konsisten dengan pola "suggest, don't dictate")

## Langkah 3 — Test manual

- [ ] Akun dengan `prodi_impian` terisi → butir relevan/khusus tampil (kalau ada)
- [ ] Akun dengan `prodi_impian` kosong → checklist umum tampil normal, tidak crash
- [ ] Progress percentage (dipakai juga di Cek Posisi Gue dan Jalur Saya) tetap akurat — jangan sampai perubahan ini bikin hitungan di 3 tempat itu jadi tidak sinkron lagi (ingat: LANJUT_004 sudah bikin shared hook untuk ini, pastikan tetap dipakai)
- [ ] TypeScript typecheck: 0 error

## Langkah 4 — Commit & dokumentasi

- Commit terpisah per unit kerja
- Update `LANJUT_App/README.md`

## Definition of Done

- [ ] Personalisasi checklist by prodi berjalan (KALAU data backend mendukung — kalau tidak, laporan jelas kenapa di-skip dan jadi task backend terpisah)
- [ ] Shared hook progress (dari LANJUT_004) tetap konsisten dipakai di semua tempat (Jalur Saya, Cek Posisi Gue, Daftar Periksa)
- [ ] Tidak ada hardcode mapping prodi→butir di kode Expo tanpa dasar data dari backend
- [ ] Kasus `prodi_impian` kosong ditangani dengan baik
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `LANJUT_App/server/` tanpa laporan

## Laporkan di akhir

- Apakah backend sudah punya struktur untuk mapping prodi→butir checklist, atau ini perlu jadi task backend terpisah (LANJUT_007 kemungkinan)
- Kalau diimplementasikan: screenshot before/after untuk minimal 2 prodi berbeda
- Konfirmasi: progress percentage masih konsisten di 3 tempat (Jalur Saya, Cek Posisi Gue, Daftar Periksa)
- Commit hash
