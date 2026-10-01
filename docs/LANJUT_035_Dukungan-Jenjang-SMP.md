# TASK: LANJUT_035 — Dukungan Jenjang SMP + Tampilan Kondisional Kelas 12

## Konteks

Keputusan Khalifa (1 Okt):
- SMP dan SMA/SMK sama-sama memakai LANJUT dengan fitur yang sama (bukan
  versi terbatas untuk SMP).
- Linimasa, Daftar Periksa, dan Cek Posisi Gue isinya SNBP/SNBT/TKA —
  murni untuk kelas 12. Keputusan: **kalau kelas pengguna = 12, tampilan
  tetap seperti sekarang. Kalau bukan 12 (termasuk semua kelas SMP),
  tampilan berbeda.**
- Konten pengganti untuk non-12 **belum didesain**. Task ini HANYA
  mengerjakan bagian fungsional (routing/logic kondisional + placeholder
  sederhana), BUKAN desain konten final. Itu keputusan terpisah nanti.
- Personalisasi per jenjang rencananya ada di halaman yang sekarang
  bernama "Khusus SMK" (akan digeneralisasi jadi hub semua jenjang —
  tapi redesain halaman itu sendiri BUKAN bagian task ini, cukup
  jadikan tujuan placeholder/tautan).

**Prioritas tetap: fungsi dulu.** Jangan desain ulang tampilan "Khusus
SMK" atau bikin konten SMP yang detail — itu nanti, setelah ada
keputusan konten terpisah.

## Yang Diminta

### 1. Perluas enum kelas
Nilai `kelas` saat ini dikunci `'10' | '11' | '12'` di tiga tempat (temuan
LANJUT_033):
- Migrasi DB (ENUM, migrasi 001)
- Validasi server (`auth.skema.js:39`)
- Tipe di app (`api/auth.ts:16`)

Tambahkan nilai SMP: `'7' | '8' | '9'`. Buat migrasi baru (jangan ubah
migrasi 001 yang sudah jalan di produksi/lokal). Pastikan data lama
(kelas 10/11/12 yang sudah ada) tidak rusak.

### 2. Onboarding — tanya kelas saat daftar
Form Daftar (LANJUT_025) saat ini hanya menanyakan prodi impian, tidak
menanyakan kelas (backend sudah menerima field `kelas`, tapi form belum
mengirimnya — cek ulang, mungkin sudah berubah sejak LANJUT_029/033).
- Tambahkan pertanyaan kelas (7–12) di form Daftar, wajib diisi.
- Bisa diedit lagi dari Akun/Jalur Saya (pola yang sama seperti
  `gaya_belajar` di LANJUT_032).
- **Jangan ubah kalimat data pribadi di form Daftar sendiri** — itu
  sudah disetujui Khalifa dan menyangkut field lain juga (lihat catatan
  LANJUT_032). Cukup tambahkan field barunya; teks kalimat biarkan,
  laporkan di akhir kalau menurutmu perlu disesuaikan.

### 3. Tampilan kondisional di tiga layar
Di Linimasa, Daftar Periksa, dan Cek Posisi Gue:
- **Kelas = 12** → tidak berubah sama sekali dari sekarang.
- **Kelas ≠ 12** → tampilkan placeholder fungsional, bukan konten
  SNBP/SNBT/TKA. Placeholder minimal: pesan singkat (boleh teks
  sementara, tandai jelas sebagai draf) + tombol/tautan ke halaman
  "Khusus SMK" (pakai nama/rute yang sudah ada, jangan rename dulu).
- Jangan sampai siswa non-12 tetap bisa lihat angka/tenggat SNBP/SNBT/TKA
  di manapun selama transisi ini (cek juga notifikasi/badge kalau ada
  yang menampilkan hitungan mundur di luar tiga layar ini).

### 4. Tidak boleh regresi
- Siswa kelas 12 yang sudah ada datanya (akun lama) harus tetap bisa
  pakai app seperti biasa — jangan sampai perubahan enum/onboarding
  bikin akun lama error saat login.
- Akun lama yang `kelas`-nya kosong (kalau ada) — putuskan fallback yang
  aman (anggap bukan-12 sampai user isi, jangan asumsikan 12).

## Test

- [ ] Daftar akun baru kelas 7 → berhasil, `kelas` tersimpan benar
- [ ] Daftar akun baru kelas 12 → berhasil, tampilan 3 layar seperti sebelumnya
- [ ] Akun kelas 9 → 3 layar menampilkan placeholder, bukan konten SNBP/SNBT/TKA
- [ ] Akun kelas 12 lama (dibuat sebelum task ini) → tetap login & tampil normal
- [ ] Ubah kelas dari Akun → tampilan 3 layar berubah sesuai kelas baru
- [ ] Typecheck 0 error
- [ ] Tidak ada regresi di tes yang sudah ada

## Definition of Done

- [ ] Enum kelas mendukung 7–12 di DB, server, dan app
- [ ] Form Daftar menanyakan kelas, bisa diedit dari Akun
- [ ] 3 layar menampilkan versi berbeda sesuai kelas, placeholder untuk non-12
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Daftar tempat kode yang disentuh (biar gampang di-review)
- Screenshot atau deskripsi placeholder non-12 di 3 layar
- Catatan kalau ada asumsi yang kamu ambil sendiri (terutama soal fallback akun lama)
