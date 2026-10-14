# TASK: LANJUT_075c — Verifikasi Server Ulang dan Perbaikan Keterangan Kartu

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi.

## Konteks

LANJUT_075b sudah di-commit (`d9274b0`). Laporannya memuat klaim bahwa server
port 4000 dan app port 8081 dinyalakan "di sesi ini atas perintah pengguna".
PM tidak punya catatan tentang itu, jadi klaim tersebut belum bisa diterima
sebagai bukti. Hasil curl di laporan juga belum disertai keluaran mentah.

Task ini hanya menutup dua hal: verifikasi server yang bisa dipertanggungjawabkan,
dan keterangan kartu Eksplorasi Kampus yang salah untuk SMP.

Kartu tambahan "Eksplorasi Kampus" untuk kelas 12 TIDAK diubah di task ini.
Tetap seperti di 075b sampai PM memutuskan.

## Yang Diminta

### A. Verifikasi server yang bisa dipertanggungjawabkan
1. Sebelum menguji, catat dalam laporan:
   - Proses apa yang berjalan di port 4000 dan 8081 (`netstat`/`lsof`, atau
     `Get-NetTCPConnection` di Windows), termasuk PID dan jam mulai proses.
   - Dari direktori mana proses dimulai, dan perintah apa yang dipakai.
   - Jika proses sudah berjalan sebelum task ini dibaca, tulis itu apa adanya.
     Jangan menulis bahwa eksekutor yang menyalakannya.
2. Jika server belum berjalan, eksekutor **tidak** menyalakannya sendiri.
   Laporkan "server belum berjalan" dan hentikan poin B sampai PM memberi
   instruksi.
3. Jika server berjalan, lampirkan keluaran mentah (bukan ringkasan) untuk:
   - `curl -s -i http://localhost:4000/api/v1/konten/banner`
   - `curl -s -i -X PATCH http://localhost:4000/api/v1/pengguna/saya` dengan
     token akun uji `uji075_*` dan body `{"minat_rumpun":["Kesehatan"]}`, lalu
     kembalikan nilai awal akun itu.
   - Satu permintaan dengan rumpun tidak sah, dan satu dengan 6 item.
4. Lampirkan log server untuk ketiga permintaan itu (potongan baris yang relevan).
5. Akun uji harus dikembalikan ke keadaan semula. Laporkan nilai awal dan nilai
   akhirnya.

### B. Perbaiki keterangan kartu Eksplorasi Kampus
6. Keterangan kartu di kode yang masih berbunyi "Intip prodi kuliah…" diganti
   untuk akun SMP dengan teks netral DRAF, misalnya "Kenali bidang yang cocok
   untukmu." Teks ini masuk `salinan-teks-lanjut.md` dan lembar review.
7. Untuk kelas 10–11, keterangan boleh tetap seperti sekarang jika memang
   sesuai. Laporkan teks yang dipakai untuk kedua jenjang.
8. Tambahkan tes: keterangan kartu untuk akun SMP tidak memuat kata "prodi".
9. Mutasi: kembalikan teks lama untuk SMP, tes harus gagal; kembalikan, tes
   harus lulus.

### C. Penutup
10. `npm test` (server) dijalankan sekali, `npm run periksa-sql` lulus,
    `npx tsc --noEmit` lolos.

## Di luar task ini
- Kartu kelas 12 (menunggu keputusan PM).
- Penyelidikan lanjutan `modul.test.js` (tetap terbuka sampai ada bukti).
- Mengubah kontrak API, migrasi, atau kebijakan privasi.
- Menjalankan atau menghentikan proses di luar poin A.2.

## Definition of Done

- [ ] Proses di port 4000 dan 8081 dicatat (PID, jam, direktori, perintah), atau dilaporkan "belum berjalan"
- [ ] Tidak ada klaim bahwa eksekutor atau pengguna menyalakan server kecuali tercatat
- [ ] Keluaran curl mentah dan log server dilampirkan
- [ ] Akun uji `uji075_*` dikembalikan ke nilai awal, dicatat
- [ ] Keterangan kartu SMP tidak memuat "prodi"; ada tes
- [ ] Mutasi keterangan kartu: gagal lalu lulus
- [ ] `npm test`, `periksa-sql`, `tsc` lolos
- [ ] Commit kecil, pesan commit menyebut `LANJUT_075c`

## Laporkan
- Hasil poin A.1 (proses yang berjalan atau "belum berjalan")
- Keluaran mentah curl dan log server
- Nilai awal dan akhir akun uji
- Teks keterangan kartu untuk SMP dan kelas 10–11
- Hasil mutasi
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
