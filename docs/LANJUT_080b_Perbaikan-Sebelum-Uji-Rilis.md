# TASK: LANJUT_080b — Perbaikan Kecil Sebelum Uji Rilis

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi. Tidak memanggil OpenRouter.
Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`.

## Konteks

LANJUT_080 sudah di-commit (`d4e2708`). Inventaris menemukan tiga hal kecil yang
harus dibereskan sebelum uji rilis. Ketiganya tidak butuh keputusan baru dari PM.

1. **Pesan galat app yang tidak benar.** Pesan "Yang sudah pernah dibuka masih bisa
   dilihat" kemungkinan tidak benar setelah app ditutup (peta 059, A15). Tampilan
   yang menjanjikan sesuatu yang tidak terjadi tidak boleh ada di uji rilis.
2. **Mikrofon Ngobrol.** Pengenal suara peramban (Web Speech API) di Chrome
   mengirim audio ke layanan penyedia peramban. Ini belum tercantum di kebijakan
   yang berlaku. Untuk uji rilis, mikrofon disembunyikan. Keputusan ini bisa
   dibalik setelah tinjauan hukum.
3. **Galat `minat_rumpun.0`.** Galat tipe per butir untuk `minat_rumpun` masih
   memakai `minat_rumpun.0`, bukan bentuk `medan` yang seragam seperti
   `mapel_pilihan` di 079b.

## Yang Diminta

### A. Pesan galat yang tidak benar
1. Cari setiap teks app yang menjanjikan "masih bisa dilihat" atau sejenisnya
   untuk konten yang sudah dibuka sebelumnya. Dokumentasikan letaknya.
2. Jika fitur itu memang tidak ada, ganti teksnya menjadi pernyataan yang benar,
   atau hapus teksnya. Pilih yang paling sederhana dan jujur. Teks baru berstatus
   DRAF.
3. Tes: teks lama tidak lagi ada di app.

### B. Sembunyikan mikrofon untuk uji rilis
4. Tombol mikrofon di layar Ngobrol tidak tampil. Input teks tetap bekerja.
5. Pengaturan ini dibuat sebagai konfigurasi, bukan dihapus dari kode, supaya
   bisa dinyalakan kembali. Nilai bawaan untuk uji rilis: mati.
6. Tes: mikrofon tidak tampil dalam kondisi bawaan; input teks tetap ada.
7. Laporkan di inventaris bahwa keputusan ini menunggu tinjauan hukum.

### C. Galat `minat_rumpun`
8. Galat tipe per butir `minat_rumpun` memakai bentuk `medan: { minat_rumpun: "…" }`,
   sama seperti aturan di `mapel_pilihan`.
9. Tes: id rumpun yang tidak valid, tipe yang salah, dan lebih dari 4 nilai
   menghasilkan `medan` yang sama bentuknya.

### D. Gerbang
10. `npm test` (server), `npm run periksa-sql`, `npx tsc --noEmit` di `LANJUT_App`.
    Semua harus lulus.
11. Mutasi, gagal lalu lulus: (a) kembalikan teks galat lama, (b) tampilkan
    mikrofon kembali, (c) kembalikan bentuk galat per butir untuk `minat_rumpun`.

## Di luar task ini
- Deploy, hosting, atau build APK.
- Menambah mapel atau mengubah konten terverifikasi.
- Mengubah kebijakan privasi.
- Mengubah saklar AI atau event.
- Keputusan hosting (menunggu PM).

## Definition of Done

- [ ] Teks galat "masih bisa dilihat" tidak ada, atau diganti dengan yang benar; ada tes
- [ ] Mikrofon tidak tampil dalam kondisi bawaan; input teks tetap bekerja; ada tes
- [ ] Galat `minat_rumpun` memakai bentuk `medan` yang seragam; ada tes
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` bernilai `0` (dicek di database)
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_080b`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Letak teks galat yang diubah, dan teks sebelum dan sesudahnya
- Letak konfigurasi mikrofon
- Hasil gerbang dan tiga mutasi
- Nilai saklar dari database
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Teks baru berstatus DRAF sampai disetujui.
