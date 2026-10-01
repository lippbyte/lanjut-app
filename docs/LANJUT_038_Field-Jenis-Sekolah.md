# TASK: LANJUT_038 — Field Jenis Sekolah (SMP/SMA/SMK/MA)

## Konteks

Dari LANJUT_037: tabel pengguna cuma punya `kelas` (7-12), tidak ada
field jenis sekolah. Akibatnya konten "Kalau kamu anak SMK" di Jenjang
Saya tampil ke semua siswa kelas 10-12, termasuk yang sekolahnya SMA —
padahal kontennya (sertifikat UKK/PKL) cuma relevan buat SMK.

Khalifa memutuskan: tambah field ini sekarang.

**Catatan penting — kelas 7-9 TIDAK perlu ditanya:** siswa kelas 7-9
pasti SMP, tidak ada ambiguitas. Yang perlu ditanya cuma siswa kelas
10-12: SMA, SMK, atau MA. Jangan tambah pertanyaan yang nggak perlu buat
siswa SMP.

**Prioritas tetap: fungsi dulu.** Teks pertanyaan boleh draf sementara
(tandai DRAF, pola §4.x yang sudah ada).

## Yang Diminta

### 1. Field baru
- Tabel pengguna: kolom baru (misal `jenis_sekolah`, nullable), nilai:
  `SMP` | `SMA` | `SMK` | `MA`.
- Migrasi baru (jangan ubah migrasi 001/010 yang sudah jalan).
- **Backfill otomatis untuk kelas 7-9**: migrasi langsung set
  `jenis_sekolah = 'SMP'` untuk semua akun yang `kelas` antara 7-9 (tidak
  ada ambiguitas, tidak perlu nunggu user isi manual).
- Akun kelas 10-12 dibiarkan `NULL` dulu — ini yang perlu diisi lewat
  gerbang (poin 2).

### 2. Perluas gerbang wajib isi (dari LANJUT_036)
Gerbang yang sudah ada (wajib isi kelas) sekarang juga harus menahan
akun kalau:
- `kelas` kosong (perilaku lama, tidak berubah) — tanya kelas dulu.
- `kelas` terisi 10-12 TAPI `jenis_sekolah` masih kosong — tanya jenis
  sekolah (SMA/SMK/MA).
- Akun kelas 7-9 tidak pernah ditahan gerbang ini untuk jenis sekolah
  (karena sudah di-backfill otomatis di migrasi).

Kalau keduanya kosong (akun benar-benar baru lewat API lama atau
semacamnya), gerbang tanya kelas dulu, baru lanjut tanya jenis sekolah
kalau kelasnya 10-12 — jangan tanya dua-duanya di satu layar yang
membingungkan, boleh dua langkah berurutan.

### 3. Form Daftar
Tambahkan pertanyaan jenis sekolah di form Daftar juga, tapi HANYA
muncul/wajib kalau kelas yang dipilih 10-12 (sembunyikan untuk 7-9,
auto-set SMP di server).

### 4. Pakai di Jenjang Saya
Ganti logic "Kalau kamu anak SMK" dari "tampil ke semua kelas 10-12"
jadi "tampil kalau `jenis_sekolah === 'SMK'`". Siswa SMA/MA kelas 10-12
tidak lagi melihat bagian ini.

### 5. Jangan sentuh hal lain
- Jangan ubah logic kelas 12 vs non-12 dari LANJUT_035.
- Jangan ubah struktur Jenjang Saya yang sudah ada selain poin 4.

## Test

- [ ] Migrasi: akun kelas 7-9 lama otomatis dapat `jenis_sekolah = 'SMP'`, tanpa gerbang
- [ ] Akun kelas 11 lama (tanpa jenis_sekolah) → login, masuk gerbang isi kelas dulu (kalau kelas juga kosong) baru gerbang jenis sekolah, atau langsung gerbang jenis sekolah kalau kelas sudah ada
- [ ] Isi jenis sekolah = SMK → Jenjang Saya tampilkan bagian "anak SMK"
- [ ] Isi jenis sekolah = SMA → Jenjang Saya TIDAK tampilkan bagian "anak SMK"
- [ ] Daftar akun baru kelas 8 → tidak ditanya jenis sekolah sama sekali, otomatis SMP
- [ ] Daftar akun baru kelas 11 → wajib pilih jenis sekolah
- [ ] Tidak ada regresi di tes LANJUT_034/035/036/037 yang sudah ada
- [ ] Typecheck 0 error

## Definition of Done

- [ ] Field jenis sekolah ada, kelas 7-9 ter-backfill otomatis
- [ ] Gerbang menahan akun kelas 10-12 tanpa jenis sekolah
- [ ] Form Daftar menanyakan jenis sekolah untuk kelas 10-12
- [ ] Jenjang Saya pakai jenis_sekolah, bukan rentang kelas, untuk bagian SMK
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Berapa akun (DB lokal) yang ter-backfill otomatis vs yang akan kena gerbang baru
- Screenshot gerbang jenis sekolah dan Jenjang Saya untuk SMA vs SMK
