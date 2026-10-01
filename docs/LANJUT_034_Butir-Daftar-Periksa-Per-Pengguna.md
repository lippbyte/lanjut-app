# TASK: LANJUT_034 — Butir Daftar Periksa Milik Pengguna

## Konteks

Dari audit LANJUT_033: F3 Pilih Mapel dan F10 Eksplorasi Tujuan punya
tombol/aksi "Simpan ke Daftar Periksa", tapi saat ini Daftar Periksa cuma
mencentang butir umum (`mapel-tka`) yang sama untuk semua pengguna — belum
ada baris yang spesifik per siswa (misal "pelajari profil Teknik Elektro"
hasil dari F10).

Khalifa sudah konfirmasi: fitur ini dibutuhkan. Tanpa ini, "Simpan" di F3
dan F10 tidak ada efek nyata ke akun siswa.

**Prioritas tetap:** fungsi dulu. Jangan kerjakan polish tampilan Daftar
Periksa yang sudah ada — fokus ke kemampuan menyimpan butir baru per akun.

## Yang Diminta

1. Tabel baru (atau kolom/relasi baru) untuk menyimpan butir Daftar
   Periksa milik satu akun — bukan butir global/shared. Ikuti pola migrasi
   yang sudah ada (lihat migrasi sebelumnya, mis. 007/008).
2. Endpoint untuk:
   - Menambah butir baru ke Daftar Periksa milik pengguna yang sedang
     login (dipicu dari aksi "Simpan" di F3 dan F10)
   - Mengambil semua butir milik pengguna (termasuk yang general + yang
     personal, kalau keduanya perlu tampil bersamaan — cek dulu struktur
     Daftar Periksa yang sudah ada sebelum memutuskan)
   - Menghapus/un-check butir personal (ikuti pola DELETE yang sudah ada
     di endpoint kemajuan — kosongkan `selesai_pada`, bukan hapus baris,
     kalau itu pola yang dipakai sekarang)
3. **WAJIB tes lintas akun**: pastikan butir personal akun A tidak pernah
   bocor/terlihat di akun B (ini pernah jadi bug nyata sebelumnya di
   proyek ini — lihat catatan "checklist ke-cache global" di LANJUT_004).
4. Sambungkan tombol "Simpan" yang sudah ada di F3 (`PilihMapelScreen.tsx`)
   dan F10 ke endpoint baru ini.
5. Jangan ubah struktur butir Daftar Periksa umum yang sudah ada — ini
   penambahan, bukan migrasi ulang data lama.

## Test

- [ ] Simpan dari F3 → muncul di Daftar Periksa akun yang sama
- [ ] Simpan dari F10 → muncul di Daftar Periksa akun yang sama
- [ ] Akun lain tidak melihat butir personal akun pertama
- [ ] Un-check/hapus butir personal berfungsi
- [ ] Tidak ada regresi di tes Daftar Periksa yang sudah ada
- [ ] Typecheck 0 error

## Definition of Done

- [ ] Migrasi baru dibuat dan diuji idempotent (ikuti pola benih/migrasi
      yang sudah ada)
- [ ] Endpoint baru + tes otomatis lolos
- [ ] Tombol Simpan F3 dan F10 benar-benar menyimpan ke akun
- [ ] Tes lintas akun eksplisit ditulis dan lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Ringkasan struktur tabel/endpoint baru
- Konfirmasi hasil tes lintas akun
