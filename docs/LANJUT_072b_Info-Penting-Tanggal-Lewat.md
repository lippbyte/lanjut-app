# TASK: LANJUT_072b — Info Penting Tidak Menampilkan Tanggal yang Sudah Lewat

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall.

## Konteks

LANJUT_072 sudah di-commit (`8b957ec`). Setelah itu Info Penting tampil tepat di
bawah grid ikon dan kartu "Mulai dari Sini". Pada laporan 072, Info Penting untuk
kelas 12 masih menampilkan "Pendaftaran akun TKA, 27 Juli – 27 September 2026"
padahal hari ini 13 Oktober 2026. Sebelumnya info ini tersembunyi di bawah,
sehingga masalahnya kecil. Sekarang masalahnya terlihat jelas, jadi harus
diperbaiki sebelum rilis uji.

Task ini hanya memfilter Info Penting berdasarkan tanggal. Tidak mengubah data
tanggal, teks, atau urutan Beranda.

## Yang Diminta

1. **Cari dulu, laporkan sebelum mengubah.** Temukan di kode bagaimana Info Penting
   mengambil datanya (kemungkinan dari endpoint yang sama dengan kartu tenggat, lalu
   dipakai ulang di `lib/beranda.ts`). Laporkan letaknya.

2. **Aturan filter:** sebuah item Info Penting tidak ditampilkan jika tanggal
   selesainya sudah lewat dibanding waktu sekarang (zona waktu Asia/Jakarta).
   - Item tanpa tanggal selesai tetap tampil.
   - Item yang sedang berjalan (mulai sudah lewat, selesai belum lewat) tetap tampil.
   - Tanggal "hari ini" tetap tampil sampai akhir hari itu.

3. **Filter di satu tempat.** Pakai fungsi yang sudah ada di `lib/beranda.ts`. Jangan
   menulis logika tanggal kedua di layar Beranda. Kalau kartu tenggat memakai logika
   waktu yang sama (LANJUT_021), pastikan keduanya memakai fungsi yang sama.

4. **Jangan menghapus data.** Item yang sudah lewat tetap ada di database dan tetap
   bisa dilihat dari layar lain. Yang berubah hanya Info Penting di Beranda.

5. **Kalau Info Penting kosong setelah filter,** tampilkan kalimat netral satu baris:
   "Belum ada info penting untuk saat ini." Teks ini masuk `salinan-teks-lanjut.md`
   sebagai DRAF. Jangan tampilkan bagian kosong sama sekali.

## Di luar task ini

- Mengubah tanggal di database atau data JSON.
- Mengubah urutan Beranda atau susunan kartu.
- Mengubah kartu tenggat selain menyamakan logika tanggal (kalau memang berbeda).
- Menambah banner atau item baru (itu LANJUT_073).
- Mengubah kontrak API.

## Definition of Done

- [ ] Letak kode Info Penting dilaporkan sebelum diubah
- [ ] Item Info Penting dengan tanggal selesai yang sudah lewat tidak tampil
- [ ] Item tanpa tanggal dan item yang sedang berjalan tetap tampil
- [ ] Tes otomatis: item tanggal lewat disaring; item tanpa tanggal dan item berjalan tidak
- [ ] Tes otomatis: kalau semua item tersaring, muncul kalimat "Belum ada info penting untuk saat ini."
- [ ] Mutasi: nonaktifkan filter, tes harus gagal; kembalikan, tes harus lulus. Laporkan hasilnya.
- [ ] `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] `npm test` (server) lolos jika ada perubahan di server; kalau tidak, laporkan bahwa server tidak disentuh
- [ ] Teks DRAF tercatat di `salinan-teks-lanjut.md`
- [ ] Commit kecil, pesan commit menyebut `LANJUT_072b`
- [ ] Bukti 360 px untuk akun kelas 12 disimpan di `scratchpad/`, bukan di repo

## Laporkan

- Letak kode Info Penting (sebelum mengubah)
- Hash commit (`git log -1 --format=%H`) dan hasil `git show --stat`
- Hasil tes dan mutasi (gagal lalu lulus)
- Gambar 360 px untuk akun kelas 12 (dan kelas 10 jika Info Penting tampil untuk kelas itu)
- Keputusan yang kamu ambil sendiri, misalnya cara menangani item yang tanggal selesainya kosong tetapi tanggal mulainya sudah lewat
- Catatan jujur: pada LANJUT_072, susunan baris judul dan progres di atas grid
  diambil sendiri dan tidak ada di spesifikasi. Tulis di laporan sebagai keputusan
  yang kamu ambil, bukan persetujuan PM.
