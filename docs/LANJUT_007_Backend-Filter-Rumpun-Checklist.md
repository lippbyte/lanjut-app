# TASK: Tambah Dukungan Filter Rumpun di Checklist — Backend

## Konteks

Dari audit LANJUT_006: tabel `butir_daftar_periksa` cuma punya `berlaku_untuk_kelas` dan `berlaku_untuk_jalur`, belum ada cara mengaitkan butir ke rumpun prodi (Ekonomi & Bisnis, Kesehatan, Sosial & Humaniora, Teknologi & Rekayasa — sudah ada di data 19 prodi).

Task ini **backend-only, additive** — tidak boleh mengubah perilaku 11 butir checklist yang sudah ada dan sudah dipakai production/testing.

**Ini BUKAN task untuk menulis konten butir khusus prodi** — itu kerja tim konten terpisah (lihat "Di luar scope" di bawah). Task ini cuma menyiapkan **kemampuan** filter-nya di database & API.

## Langkah 1 — Migrasi database (additive, aman)

1. Tambah kolom baru `berlaku_untuk_rumpun` di tabel `butir_daftar_periksa` (nullable, format sama seperti `berlaku_untuk_kelas`/`berlaku_untuk_jalur` — cek pola yang sudah ada di `server/src/db/migrasi/002_konten_p0.sql`).
2. **Nilai default/kosong = berlaku untuk semua rumpun.** Konfirmasi: ke-11 butir yang sudah ada TIDAK PERLU diubah nilainya — biarkan kosong, otomatis tetap tampil untuk semua orang seperti sekarang.
3. Buat file migrasi baru (jangan edit file migrasi lama yang sudah jalan di production/testing) — ikuti pola penomoran migrasi yang sudah ada.
4. Jalankan migrasi di database test lokal, konfirmasi tidak ada error dan data lama tidak berubah.

## Langkah 2 — Update endpoint

1. `GET /konten/checklist` sekarang terima `?kelas=&jalur=` — tambah parameter opsional `?rumpun=`.
2. Logic filter: kalau `rumpun` dikirim, tampilkan butir yang `berlaku_untuk_rumpun` kosong (semua) ATAU cocok dengan rumpun yang dikirim.
3. Kalau `rumpun` **tidak dikirim** (backward compatible): behavior harus identik dengan sekarang — jangan sampai request lama yang tidak kirim `rumpun` jadi rusak.

## Langkah 3 — Test

1. Jalankan test suite yang sudah ada (`npm test` di `server/`) — **harus tetap 40/40 lolos** (atau berapapun jumlah sekarang). Kalau ada yang gagal karena perubahan ini, itu tandanya perubahan tidak benar-benar backward compatible — perbaiki, jangan skip test.
2. Tambah test baru khusus untuk parameter `rumpun`:
   - Request tanpa `rumpun` → hasil sama seperti sebelum ada kolom ini
   - Request dengan `rumpun` tertentu → butir umum (kosong) + butir khusus rumpun itu muncul
   - Request dengan `rumpun` yang tidak match butir manapun → cuma butir umum yang muncul (tidak error)

## Langkah 4 — Commit

- Commit terpisah: migrasi database, lalu update endpoint + test
- Update dokumentasi API kalau ada (`backend-expo-readiness.md` di project saya akan saya update sendiri setelah dapat laporan)

## Definition of Done

- [ ] Kolom `berlaku_untuk_rumpun` ditambahkan, nullable, tidak mengubah 11 butir yang sudah ada
- [ ] Endpoint `GET /konten/checklist?rumpun=` berfungsi, backward compatible (tanpa param = behavior lama persis)
- [ ] Semua test lama tetap lolos + test baru untuk `rumpun` ditambahkan dan lolos
- [ ] Tidak ada perubahan di `LANJUT_App/` (Expo) — ini backend-only

## Di luar scope (jangan dikerjakan di task ini)

- **Menentukan butir checklist apa saja yang khusus per rumpun** — ini kerja tim konten (Khalifa akan koordinasikan), harus berdasar sumber resmi per prodi, bukan dikarang
- **UI Expo untuk menampilkan butir khusus** — nyusul jadi task terpisah begitu tim konten sudah kasih daftar butirnya, supaya tidak bangun UI untuk data yang masih kosong

## Laporkan di akhir

- Nama migrasi yang dibuat
- Konfirmasi test lama masih 100% lolos (sertakan jumlah before/after)
- Contoh response `GET /konten/checklist?rumpun=Teknologi%20%26%20Rekayasa` (atau format rumpun yang sebenarnya dipakai di tabel prodi)
- Commit hash
