# TASK: LANJUT_079b — Perbaikan Pilih Mapel: Rumpun Lama, Catatan Pemetaan, dan Uji Galat

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi. Tidak memanggil OpenRouter.
Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`.

## Konteks

LANJUT_079 sudah di-commit (`a747765`) dan diterima bersyarat. PM memutuskan:

1. **Pengelompokan rumpun → mapel tetap tampil di app** dengan catatan
   "Belum dicek ke sumber resmi." Ini pilihan A. Keputusan ini mengganti aturan
   di task 079 yang melarang pemetaan tampil sebagai teks di app.
2. **Mapel SMP tidak ditambah** untuk uji ini. Daftar Mapel Saya untuk kelas 7–9
   tetap memakai 10 mapel yang ada. Catatan ini dibawa ke laporan uji rilis.

Tiga temuan dari laporan 079 yang harus diperbaiki sekarang:
- Akun kelas 12 lama yang menyimpan 4 rumpun tidak bisa menyimpan apa pun di app
  sampai pilihannya dikurangi, karena server menolak lebih dari 3.
- Kalimat catatan pemetaan di app belum terverifikasi dan harus memakai teks yang
  sudah disetujui sebagai DRAF.
- Galat tipe per butir dari zod (`mapel_pilihan.0`) belum seragam dengan kunci
  `medan` yang dipakai rute lain. Ini bagian dari aturan galat yang sudah berlaku.

## Yang Diminta

### A. Akun kelas 12 dengan lebih dari 3 rumpun
1. Di layar Pilih Mapel dan Jalur Saya, akun yang menyimpan 4 rumpun tetap
   bisa melihat pilihannya dan bisa menyimpan dengan cara mengurangi pilihan.
   Tombol Simpan muncul dengan pilihan yang sudah benar, tanpa harus menekan
   "Ubah rumpun favorit" dulu.
2. Di server, `PATCH /pengguna/saya` tetap menolak lebih dari 3 rumpun. Aturan
   ini tidak dilonggarkan.
3. Tambahkan tes: akun dengan 4 rumpun di database menerima `GET` tanpa galat,
   dan `PATCH` dengan 3 rumpun berhasil.
4. Tes app: tombol Simpan tampil sesudah pilihan dikurangi menjadi 3.

### B. Catatan pemetaan di app
5. Setiap kelompok rumpun di layar Pilih Mapel menampilkan catatan
   "Belum dicek ke sumber resmi." Teks ini berstatus DRAF di `docs/salinan-teks-lanjut.md`
   dan lembar review.
6. Catatan tampil di setiap kelompok, bukan hanya sekali di atas. Tidak ada
   kelompok yang tampil tanpa catatan.
7. Tes: setiap kelompok rumpun memuat catatan itu.

### C. Mapel SMP
8. Tidak ada mapel baru. Tidak ada perubahan pada tabel mapel.
9. Laporkan daftar mapel yang tampil untuk kelas 7–9 apa adanya, termasuk mapel
   yang hanya ada di SMA. Ini dicatat sebagai catatan uji rilis, bukan
   diperbaiki di task ini.

### D. Galat seragam
10. Galat tipe per butir `mapel_pilihan.N` diubah menjadi `medan: { mapel_pilihan: "…" }`
    sesuai aturan semua rute lain. Kunci galat tetap `galat` dengan `kode`, `pesan`, dan `medan`.
11. Tes: id mapel yang tidak valid, tipe yang salah, dan lebih dari 5 mapel
    semuanya menghasilkan `medan` yang sama bentuknya.

### E. Mutasi
12. Mutasi, gagal lalu lulus: (a) kembalikan batas 3 rumpun untuk akun lama
    menjadi galat tanpa cara menyimpan, (b) hapus catatan pemetaan dari satu
    kelompok, (c) kembalikan bentuk galat per butir.

## Di luar task ini
- Menambah mapel SMP.
- Memverifikasi pemetaan `prodi.json`.
- Mengubah kebijakan privasi.
- Chatbot, event, atau AI.
- Deploy, hosting, atau build untuk uji rilis (itu task 080).

## Definition of Done

- [ ] Akun kelas 12 dengan 4 rumpun di DB: `GET` tanpa galat; `PATCH` 3 rumpun berhasil; ada tes
- [ ] Tombol Simpan di app muncul sesudah pilihan menjadi 3; ada tes
- [ ] Setiap kelompok rumpun memuat catatan "Belum dicek ke sumber resmi."; ada tes
- [ ] Teks catatan DRAF tercatat di salinan dan lembar review
- [ ] Galat `mapel_pilihan` memakai bentuk `medan` yang seragam; ada tes
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Tidak ada mapel baru; daftar mapel SMP dilaporkan apa adanya
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` bernilai `0` (dicek di database)
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_079b`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar mapel yang tampil untuk kelas 7–9 (catatan uji rilis)
- Hasil tes dan tiga mutasi
- Nilai saklar dari database
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
