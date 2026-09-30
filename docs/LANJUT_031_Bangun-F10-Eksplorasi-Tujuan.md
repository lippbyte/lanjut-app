# TASK: Bangun F10 Eksplorasi Tujuan (Backend + Expo)

## Konteks

Dari audit LANJUT_029: F10 (fitur bantu siswa menemukan target prodi/karier lewat eksplorasi minat) **belum ada tabel maupun endpoint sama sekali** di backend. Data sudah ada di `MVP-PWA/data/profil-prodi.json`, belum pernah dibaca server. Ini fitur baru sepenuhnya, sesuai keputusan Khalifa untuk mulai pengembangan sekarang.

**Jangan ubah endpoint/tabel lain yang sudah ada.** Ini penambahan murni.

## Langkah 0 — Audit data & rancang skema

1. Baca `profil-prodi.json` sepenuhnya: field apa saja per prodi (deskripsi, prospek karier, dll — sebutkan semua).
2. Cek juga `F10-data-struktur-ringkas.md` di `docs/` (disebut ada dari LANJUT_015) — ini instruksi struktur data dari era PWA, masih relevan untuk referensi skema.
3. Rancang tabel database untuk data ini, konsisten dengan pola tabel lain (`status_verifikasi`, `diperiksa_pada`, `pemilik` — SEMUA konten F10 wajib punya kolom verifikasi ini, sama seperti tabel lain, supaya masuk ke alur `verifikasi-konten` yang sudah ada).
4. Buat migrasi baru (jangan edit migrasi lama).

## Langkah 1 — Backend

1. Endpoint untuk baca data eksplorasi (misal `GET /konten/eksplorasi-tujuan` atau sesuai pola URL yang ada).
2. Filter hanya tampilkan yang `status_verifikasi: terverifikasi` — SAMA seperti Linimasa dan lainnya. **Karena semua data ini masih dari file JSON lama yang belum pernah dicek ke sumber, ekspektasinya kosong dulu sampai ada yang diverifikasi manual — ini bukan bug, ini prinsip yang sudah dipakai di seluruh app.**
3. Update `benih.js` supaya baca data ini juga (ikuti pola `LOKASI_DATA_KONTEN` yang sudah ada dari LANJUT_023).
4. Update skrip `verifikasi-konten` supaya jenis konten baru ini bisa ditandai (ikuti pola LANJUT_010).
5. Tes: minimal setara pola tes endpoint lain (sukses, kosong, galat) — ikuti standar dari LANJUT_030.

## Langkah 2 — Expo

1. Buat layar Eksplorasi Tujuan baru.
2. Tampilkan data yang terverifikasi; state kosong yang baik (bukan teks polos) kalau belum ada yang diverifikasi — ikuti pola empty-state Linimasa/Cerita Alumni yang sudah ada.
3. Hubungkan dari Pilih Mapel (disebut sebagai gap di LANJUT_029: "belum ada tombol ke F10") dan dari Beranda kalau masuk akal secara alur.
4. Test manual + typecheck 0 error.

## Langkah 3 — Commit

Commit terpisah: migrasi+backend, lalu benih+verifikasi-konten, lalu Expo.

## Definition of Done

- [ ] Tabel dan endpoint F10 ada, konsisten dengan pola verifikasi konten yang sudah ada
- [ ] Data hanya tampil kalau terverifikasi (prinsip yang sama seperti fitur lain)
- [ ] Benih dan verifikasi-konten mendukung jenis konten baru ini
- [ ] Layar Expo ada, terhubung dari Pilih Mapel
- [ ] Test setara standar LANJUT_030
- [ ] Typecheck 0 error

## Laporkan di akhir

- Skema tabel yang dipakai
- Field dari `profil-prodi.json` yang dipetakan ke skema, dan yang tidak dipakai (kalau ada)
- Jumlah baris yang masuk lewat benih, status verifikasi semuanya (harusnya semua "belum diverifikasi" dulu)
- Commit hash
