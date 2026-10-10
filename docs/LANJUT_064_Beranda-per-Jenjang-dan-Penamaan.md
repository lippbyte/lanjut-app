# TASK: LANJUT_064 — Beranda per Jenjang dan Penamaan Konsisten

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan pada firewall.

## Konteks

Prototipe sudah jalan di HP dan alur inti sudah ada. Sebelum diuji oleh
beberapa siswa dan guru BK, ada tiga masalah yang terlihat di layar Beranda:

1. Kartu di Beranda sama untuk semua jenjang. Isi kartu "Cek Posisi Gue"
   dan "Cerita Alumni SMK" hanya relevan untuk kelas 12 atau siswa SMK.
   Siswa SMP dan SMA melihat hal yang belum relevan bagi mereka.
2. Nama tidak konsisten. Tab bawah memakai "Checklist", sedangkan dokumen
   dan `salinan-teks-lanjut.md` memakai "Daftar Periksa". Tab "Jenjang"
   juga belum jelas artinya bagi siswa baru.
3. Judul "Cerita Alumni SMK" tampil untuk semua siswa, termasuk SMP dan SMA.

Mekanisme jenjang sudah ada (field `kelas` dan jenis sekolah dari
LANJUT_035 dan LANJUT_038, serta konten per jenjang di "Jenjang Saya").
Task ini hanya menyesuaikan Beranda memakai mekanisme itu. Tidak ada
konten baru yang dikarang.

Prinsip yang berlaku: fungsi dulu, tampilan belakangan. Task ini tidak
memakai grid ikon atau kartu baru (itu LANJUT_065).

## Yang Diminta (urut prioritas)

### A. Beranda menyesuaikan jenjang
- Kartu Beranda ditentukan oleh jenjang akun yang login:
  - SMP (kelas 7–9): tampilkan "Cek Posisi Gue"? **Tidak.** Ganti dengan
    kartu yang sudah ada isinya untuk SMP, yaitu konten "Jenjang Saya"
    untuk SMP. Bila isinya belum ada, kartu itu tidak tampil (jangan
    tampilkan kartu kosong).
  - Kelas 10–11: tampilkan kartu dari konten "Jenjang Saya" untuk 10–11,
    plus kartu umum (Arsip, Level-In, Ngobrol, Pilih Mapel, Daftar
    Periksa).
  - Kelas 12: tampilan seperti sekarang, tidak berubah.
- Aturan umum: kartu yang isinya belum ada untuk jenjang itu **disembunyikan**,
  bukan ditampilkan kosong. Jika semua kartu khusus jenjang tidak ada,
  Beranda tetap menampilkan kartu umum tanpa galat.
- Tes otomatis untuk tiap jenjang: akun kelas 7, 10, dan 12 melihat set
  kartu yang benar. Tes lintas akun wajib: akun kelas 7 tidak melihat data
  kelas 12 lewat endpoint Beranda.

### B. Judul "Cerita Alumni"
- Ganti "Cerita Alumni SMK" menjadi "Cerita Alumni" untuk semua jenjang.
- Jika ada filter jenis sekolah yang sudah tersedia di endpoint cerita
  alumni, pakai filter itu. Jika belum tersedia, **jangan** membuat filter
  baru. Tulis di laporan bahwa filter per jenjang belum ada.
- Judul ini DRAF. Catat di `docs/salinan-teks-lanjut.md`.

### C. Penamaan konsisten
- Pilih satu nama untuk tab checklist dan pakai di seluruh app. Usulan
  default: **"Daftar Periksa"** (sesuai dokumen). Ubah label tab bawah dan
  teks lain yang menyebut "Checklist". Catat keputusan di laporan.
- Tab "Jenjang": ganti label menjadi **"Jenjang Saya"** (sesuai nama
  layar yang sudah ada). Label ini DRAF.
- Cari teks lain yang memakai nama yang sama dengan `rg` atau sejenisnya
  dan samakan. Jangan mengubah teks di luar app ini (misalnya PWA lama di
  `MVP-PWA/`) kecuali jelas merupakan nama yang sama.

### D. Tes dan verifikasi
- Tes otomatis untuk A dan B (lihat di atas).
- `npm test` (server), `npm run periksa-sql`, `tsc` untuk server dan app
  bersih.
- E2E web (360 px): buka Beranda sebagai akun kelas 7, 10, dan 12, lalu
  catat kartu yang tampil. Lampirkan daftar kartu per akun di laporan
  (teks, bukan tangkapan layar yang memuat data nyata).
- Bila ada perubahan yang tidak terbukti di web, tandai.

## Di luar task ini
- Grid ikon, kartu "Info Penting", kartu "Mulai dari sini", progres
  (itu LANJUT_065 dan LANJUT_066).
- Konten baru untuk jenjang mana pun. Bila isi "Jenjang Saya" untuk SMP
  belum ada, biarkan kosong dan tulis di laporan.
- Filter cerita alumni di server (bila belum ada, cukup dicatat).
- Poles warna, ukuran, atau tata letak.
- Mengubah data verifikasi konten.

## Definition of Done

- [ ] Kartu Beranda berbeda untuk kelas 7, 10, dan 12 sesuai aturan A; kartu kosong tidak tampil
- [ ] Tes lintas akun untuk Beranda per jenjang ada dan lolos
- [ ] "Cerita Alumni" netral; DRAF tercatat di `docs/salinan-teks-lanjut.md`
- [ ] Satu nama untuk Daftar Periksa dan "Jenjang Saya" dipakai di seluruh app; keputusan tercatat
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Daftar kartu per akun (kelas 7, 10, 12) dilaporkan
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Daftar kartu Beranda per jenjang (sebelum dan sesudah)
- Teks yang diubah dan statusnya DRAF
- Konten "Jenjang Saya" untuk SMP yang masih kosong (bila ada)
- Filter cerita alumni per jenjang: ada atau belum
- Keputusan penamaan yang kamu ambil sendiri, dan alasannya
- Hal yang belum diuji di HP fisik
