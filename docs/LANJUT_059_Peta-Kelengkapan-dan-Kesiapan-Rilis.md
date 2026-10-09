# TASK: LANJUT_059 — Peta Kelengkapan terhadap Brief dan Kesiapan Rilis Uji (Baca Saja)

## Konteks

Task 033–058 menutup hampir semua pekerjaan kode yang sudah kita lacak:
jenjang SMP–SMK, gerbang kelas, F6 Arsip, F7 Latihan, Level-In, unggah
modul, kerangka persetujuan, AI via OpenRouter beserta pengamanannya,
materi + web + sitasi, dan layar Level-In. Sebelum melangkah ke tahap
berikutnya (rilis uji ke sekolah, lalu poles UX), perlu satu gambaran
jujur: **apa yang sudah benar-benar selesai, apa yang belum, dan apa yang
menunggu manusia.** Khalifa sebelumnya menanyakan "masih berapa jauh hingga
seluruh brief selesai dibangun"; task ini menjawabnya dengan data, bukan
dugaan.

**Task ini murni baca dan tulis dokumen.** Aturan keras:
- Jangan mengubah kode, konfigurasi, atau basis data.
- Jangan menyentuh kunci API dan jangan memanggil layanan luar.
- Jangan menjalankan `eas build`, deploy, atau push. Semua itu keputusan Khalifa.
- Setiap status "Selesai" harus menunjuk commit, berkas, atau tes. Bila
  dokumen brief/PRD/roadmap tidak ada di repo, katakan terus terang dan
  gunakan dokumen task LANJUT_xxx serta kode sebagai acuan; jangan
  mengarang isi brief.

## Yang Diminta

### 1. Peta kelengkapan
Berkas `docs/peta-kelengkapan-<tanggal>.md` berisi tabel:
**Butir | Sumber butir (brief/roadmap/task) | Status | Bukti | Sisa kerja | Penanggung jawab**

Status hanya salah satu dari:
- **Selesai, terbukti** (ada commit/tes/E2E)
- **Selesai kode, belum terbukti** (belum diuji di HP, belum dijalankan dengan kunci, dan sejenisnya)
- **Sebagian**
- **Belum dibangun**
- **Menunggu manusia** (konten, keputusan, verifikasi, izin)

Cakup: semua fitur F1–F10 yang disebut di dokumen repo, kebutuhan "tier 0"
dan roadmap v1.1/v1.2/V2 bila dokumennya ada, semua task 033–058, dan
temuan yang masih terbuka dari laporan-laporan sebelumnya (mis. perilaku
yang dicatat tetapi tidak diubah).

### 2. Kesiapan rilis uji ke sekolah
Berkas `docs/kesiapan-rilis-uji.md`:
- **Urutan deploy** yang benar: migrasi 001–017 (dan seterusnya) lewat
  `npm run migrasi`, variabel lingkungan yang wajib, tabel semua kunci
  `konfigurasi_levelin` (nama, bawaan, arti, cara mengubah) termasuk
  `ai_aktif`, `ai_web_aktif`, `ai_web_mesin`, `ai_web_batas_harian`,
  `ai_model`, dan batas modul.
- **Urutan rilis kebijakan**: app dengan teks baru dirilis dulu, baru versi
  kebijakan di konfigurasi dinaikkan; tulis langkahnya dan risikonya.
- **Daftar periksa keselamatan sebelum siswa sungguhan**: review guru BK
  atas `tanda-bahaya.json` dan kartu bantuan, SAPA 129 terverifikasi atau
  tetap disembunyikan, kebijakan v2 diisi `[ISI]`-nya, surat orang tua
  siap, retensi penyedia dicek, saklar `ai_aktif` teruji, batas kredit
  penyedia terpasang.
- **Hal teknis terbuka**: IP lama di `eas.json`, build ulang dev client
  untuk pemilih berkas (butuh persetujuan Khalifa karena kode diunggah ke
  Expo), uji di HP Android yang belum pernah dijalankan, kerentanan app
  yang sengaja ditinggal (jangan `npm audit fix` di folder app), jumlah
  commit yang belum di-push.
- **Rencana pemantauan minimal**: apa yang bisa dilihat tim saat pilot
  tanpa menyimpan isi chat (jumlah panggilan, penanda keselamatan, galat
  penyedia, biaya), dan bila belum ada, tandai sebagai celah.

### 3. Ringkasan untuk keputusan
Di bagian atas `peta-kelengkapan`:
- Hitungan butir per status.
- **Lima hal yang paling menghambat rilis uji**, urut keparahan, masing-
  masing dengan penanggung jawab dan perkiraan besar (kecil/sedang/besar).
- Daftar butir yang menunggu manusia, dikelompokkan menurut orang (Khalifa,
  tim konten, guru BK, peninjau hukum), supaya bisa langsung dibagikan.

## Di luar task ini
- Memperbaiki apa pun yang ditemukan. Semuanya dilaporkan, bukan diubah.
- Poles UX.

## Definition of Done

- [ ] `docs/peta-kelengkapan-<tanggal>.md` terisi, tiap status punya bukti
- [ ] `docs/kesiapan-rilis-uji.md` terisi, termasuk tabel konfigurasi
- [ ] Ringkasan di bagian atas: hitungan status dan lima penghambat utama
- [ ] Tidak ada perubahan kode/konfigurasi/basis data (cek diff dan status git)
- [ ] Tidak ada panggilan jaringan keluar, tidak ada build/push/deploy
- [ ] Commit hash untuk kedua berkas dilaporkan

## Laporkan di akhir

- Commit hash
- Hitungan butir per status
- Lima penghambat utama rilis uji
- Dokumen brief/PRD/roadmap yang tidak ditemukan di repo, bila ada
