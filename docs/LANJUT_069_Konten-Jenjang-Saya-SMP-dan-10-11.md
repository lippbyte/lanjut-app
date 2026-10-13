# TASK: LANJUT_069 — Konten "Jenjang Saya" untuk SMP dan Kelas 10–11

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall.

## Konteks

Beranda sudah menampilkan kartu per jenjang (LANJUT_064 dan 065), tetapi
layar "Jenjang Saya" untuk SMP dan kelas 10–11 masih berisi kartu yang
belum jelas isinya. Draf teks sudah disiapkan PM di:
`DRAF-Konten-Jenjang-Saya-SMP-dan-10-11.md` (salinan ada di repo bila sudah
ditaruh di `docs/`; bila belum, minta ke PM lewat laporan dan jangan
mengarang teks sendiri).

Keputusan yang diambil untuk task ini:
- Teks boleh tampil ke siswa **dengan label DRAF** di salinan teks, sesuai
  aturan tetap. Ini uji coba, bukan rilis.
- Kartu tanpa isi tidak ditampilkan. Jangan membuat kartu kosong.
- Tidak ada endpoint baru, tidak ada tabel baru, tidak ada tanggal atau
  angka resmi yang ditulis di layar.

Prinsip: fungsi dulu, tampilan belakangan.

## Yang Diminta

### A. Isi layar Jenjang Saya
- Cari dulu di kode bagaimana layar "Jenjang Saya" menentukan kartunya
  (kemungkinan di `JenjangSayaScreen.tsx` dan `lib/jenjang.ts`).
  Laporkan temuanmu sebelum mengubah.
- **SMP (kelas 7–9):** isi kartu sesuai draf A1–A5. Eksplorasi Tujuan,
  Gaya Belajar, kartu "SMA, SMK, atau MA?", dan Ngobrol. Kartu
  "Ngobrol" tetap berada di balik gerbang persetujuan orang tua.
- **Kelas 10–11:** isi kartu sesuai draf B1–B6. Pilih Mapel, Eksplorasi
  Tujuan, Arsip, Level-In, dan Daftar Periksa.
- Teks di layar sama persis dengan draf. Bila ada yang tidak muat, potong
  dengan memperpendek kalimat, bukan dengan mengubah makna.

### B. Label dan catatan
- Setiap teks baru dicatat di `docs/salinan-teks-lanjut.md` dengan status
  DRAF dan nomor task LANJUT_069.
- Kartu "SMA, SMK, atau MA?" diberi catatan di layar bahwa keterangan ini
  masih dalam pengecekan. Bila tidak ada tempat untuk catatan itu tanpa
  mengubah tata letak, tulis di laporan dan di salinan teks saja.
- Eksplorasi Tujuan untuk kelas 10–11: label "Perkiraan" harus tetap
  tampil. Jangan menghapus label itu.

### C. Tes
- Tes otomatis: akun kelas 7 melihat set kartu SMP, akun kelas 10 melihat
  set kartu 10–11, tidak ada kartu kosong, dan teks sesuai salinan.
- Tes lintas akun: akun kelas 7 tidak melihat kartu kelas 12 di layar ini.
- `npm test` (server), `npm run periksa-sql`, `npx tsc --noEmit` bersih.
- Uji web 360 px untuk akun kelas 7 dan kelas 10. Laporkan daftar kartu per
  akun. Lampirkan tangkapan layar di luar repo, hanya akun uji, dan
  jangan di-commit.

## Di luar task ini
- Mengisi konten tahapan resmi (tanggal, prodi, aturan seleksi).
- Mengubah profil F10 atau status verifikasi konten di database.
- Menghapus atau mengubah kartu kelas 12.
- Poles warna, animasi, atau grid baru.

## Definition of Done

- [ ] Cara layar Jenjang Saya menentukan kartu sudah dilaporkan sebelum diubah
- [ ] Kartu SMP dan kelas 10–11 sesuai draf, tanpa kartu kosong
- [ ] Label "Perkiraan" tetap tampil di Eksplorasi Tujuan kelas 10–11
- [ ] Tiap teks baru tercatat di `salinan-teks-lanjut.md` dengan status DRAF dan nomor 069
- [ ] Tes otomatis dan tes lintas akun ada dan lulus
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Tangkapan layar tersimpan di luar repo, lokasinya dilaporkan
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Cara kartu Jenjang Saya dipilih, sebelum dan sesudah perubahan
- Daftar kartu per akun (kelas 7, 10, 12) dan hasil tes
- Teks yang terpotong atau perlu disesuaikan di layar
- Keputusan yang kamu ambil sendiri
