# TASK: LANJUT_071 — Perbaikan Kecil Setelah LANJUT_069

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall.

## Konteks

LANJUT_069 dan 070 sudah selesai. Dua temuan dari laporan 069 sudah diputuskan
PM, dan satu catatan letak di lembar review perlu diperbaiki. Task ini kecil dan
tidak mengubah konten resmi.

Keputusan PM:
- Tombol "Mulai eksplorasi" di kartu pembuka SMP (A1) **tidak lagi membuka
  Eksplorasi Tujuan**. Ia membuka **Gaya Belajar** (A3), karena Gaya Belajar
  tidak bergantung pada profil prodi yang belum terverifikasi.
- Opsi "rangkuman umum" di Pilih Mapel **disembunyikan untuk kelas 10–11**,
  karena ia mencentang butir `mapel-tka` yang hanya dipakai kelas 12.

## Yang Diminta

### A. Tombol kartu pembuka SMP
- Cari di kode bagaimana tombol "Mulai eksplorasi" menentukan tujuannya
  (kemungkinan di `JenjangSayaScreen.tsx` atau `lib/jenjangSaya.ts`).
  Laporkan temuanmu sebelum mengubah.
- Ubah tujuan tombol menjadi layar Gaya Belajar. Teks tombol tidak berubah.
- Eksplorasi Tujuan tetap bisa dibuka dari kartu A2 dan dari kartu pintu.
  Jangan menghapus akses itu.
- Catat keputusan ini di `docs/salinan-teks-lanjut.md` sebagai catatan, dengan
  nomor task 071.

### B. Pilih Mapel untuk kelas 10–11
- Sembunyikan opsi "rangkuman umum" (yang mencentang `mapel-tka`) untuk akun
  kelas 10 dan 11. Kelas 12 tetap melihat opsi itu.
- Pastikan sisi server juga tidak menyimpan centang `mapel-tka` untuk kelas
  10–11 bila permintaan datang dari klien lama. Bila tidak bisa dijaga di
  server tanpa mengubah kontrak API, tulis di laporan dan jangan mengubah API.

### C. Keterangan letak di lembar review
- Lembar review (`lembar-review-teks.js`) menyebut letak pesan
  "Bagian ini untuk kelas 12" sebagai "Beranda (bagian tenggat)". Letak itu
  tidak akurat.
- Cari letak pesan itu di kode yang sebenarnya, perbaiki keterangannya di
  lembar review, dan laporkan letak yang benar.
- Jangan mengubah teks pesan itu sendiri.

### D. Tes
- Tes otomatis: akun kelas 7 yang menekan "Mulai eksplorasi" dibawa ke Gaya
  Belajar, bukan Eksplorasi Tujuan.
- Tes otomatis: akun kelas 10 tidak melihat opsi "rangkuman umum" di Pilih
  Mapel. Akun kelas 12 tetap melihatnya.
- Mutasi: cabut sementara penjaga di kedua perubahan, jalankan tes, kembalikan.
  Laporkan hasil gagal lalu lulus.
- `npm test` (server), `npm run periksa-sql`, `npx tsc --noEmit` bersih.

## Di luar task ini
- Mengubah teks konten, status verifikasi, atau isi tabel konten.
- Mengubah kartu, urutan kartu, atau tampilan lain.
- Mengubah Eksplorasi Tujuan, termasuk label "Perkiraan".
- Mengubah kontrak API.

## Definition of Done

- [ ] Letak tombol "Mulai eksplorasi" SMP dilaporkan sebelum diubah
- [ ] Tombol SMP membuka Gaya Belajar; Eksplorasi Tujuan tetap bisa dibuka dari kartu lain
- [ ] "Rangkuman umum" tidak tampil untuk kelas 10–11; tampil untuk kelas 12
- [ ] Keterangan letak di lembar review sudah benar
- [ ] Tes lulus; mutasi gagal lalu lulus untuk kedua perubahan
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Keputusan dicatat di `salinan-teks-lanjut.md`
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Letak kode tombol "Mulai eksplorasi" dan letak pesan "Bagian ini untuk kelas 12" yang sebenarnya
- Hasil tes dan mutasi untuk A dan B
- Apakah server ikut menyaring `mapel-tka` untuk kelas 10–11, atau hanya klien
- Keputusan yang kamu ambil sendiri
