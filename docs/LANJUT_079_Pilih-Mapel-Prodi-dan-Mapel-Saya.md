# TASK: LANJUT_079 — Pilih Mapel per Prodi Favorit (Kelas 12) dan Mapel Saya (Kelas 7–11)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi. Tidak memanggil OpenRouter.
Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`.

## Konteks

LANJUT_078 sudah di-commit (`1fc3dd6`). Ngobrol sudah menjadi penghubung fitur,
tetapi saklar AI masih mati dan belum boleh dinyalakan (lihat syarat di bawah).

PM meminta pilihan mapel yang lebih banyak, tetapi tampilannya tidak menampilkan
semua mapel sekaligus. Mapel dikelompokkan berdasarkan **prodi favorit**. Ini
hanya untuk kelas 12. Untuk kelas 7–11 tidak ada prodi. Mereka memakai
**Mapel Saya**, yaitu daftar pendek mapel yang mereka sukai atau ingin
diperdalam.

Data yang sudah ada dan tidak boleh diubah:
- `minat_rumpun` (migrasi 019, maks. 5 nilai): Ekonomi & Bisnis, Kesehatan,
  Sosial & Humaniora, Teknologi & Rekayasa.
- Sumber pemetaan rumpun ke prodi (`MVP-PWA/data/prodi.json`, tabel `prodi.rumpun`)
  **belum terverifikasi** (0 dari 19 prodi). Jangan menampilkan pemetaan itu
  sebagai fakta kepada siswa. Pemetaan hanya boleh dipakai sebagai pengelompokan
  internal dan ditandai di laporan.

## Yang Diminta

### A. Kelas 12: Pilih Mapel per prodi favorit
1. Di Daftar Periksa atau halaman Jalur Saya kelas 12, siswa memilih **satu sampai
   tiga** rumpun favorit dari daftar 4 nilai di atas. Pilihan ini disimpan lewat
   `minat_rumpun` yang sudah ada. Tidak ada kolom baru.
2. Setelah rumpun dipilih, layar "Pilih Mapel" menampilkan **hanya** mapel yang
   relevan untuk rumpun itu, dikelompokkan per rumpun. Daftar lengkap semua mapel
   tidak ditampilkan sekaligus.
3. Siswa boleh memilih mapel dari kelompok rumpun favoritnya. Maksimal 5 mapel
   dipilih. Pilihan disimpan di kolom JSON baru `pengguna.mapel_pilihan`, dengan
   migrasi idempoten `022_mapel_pilihan.sql`.
4. Jika belum memilih rumpun, layar menampilkan ajakan memilih rumpun dulu. Tidak
   ada daftar panjang mapel.
5. Teks ajakan dan judul kelompok baru masuk DRAF di `docs/salinan-teks-lanjut.md`
   dan lembar review.

### B. Kelas 7–11: Mapel Saya
6. Untuk kelas 7–11, layar "Mapel Saya" berisi maksimal 5 mapel dari daftar mapel
   sekolah. Tidak ada rumpun dan tidak ada prodi.
7. Pilihan disimpan di `pengguna.mapel_pilihan` yang sama. Kolomnya tidak dibedakan
   per kelas.
8. Mapel Saya dipakai sebagai urutan tampil di Arsip dan Latihan (mapel pilihan
   tampil lebih dulu). Tidak ada perubahan lain di Arsip atau Latihan.
9. Teks layar Mapel Saya masuk DRAF di salinan dan lembar review.

### C. Server
10. `GET /pengguna/saya` dan `PATCH /pengguna/saya` mendukung `mapel_pilihan`.
    Validasi:
    - array berisi ID mapel yang ada;
    - maksimal 5 untuk semua kelas;
    - untuk kelas 12, mapel harus termasuk rumpun yang dipilih di `minat_rumpun`.
      Jika tidak, 400 `VALIDASI_GAGAL` dengan `medan: "mapel_pilihan"`.
11. Akun kelas 7–11 yang mengirim `minat_rumpun` tetap ditolak seperti sekarang.
12. Urutan cek: login → validasi → kepemilikan. Tidak ada gerbang AI.
13. Galat tetap memakai kunci `galat` dengan `kode`, `pesan`, dan `medan`.

### D. Teks dan kebijakan
14. Kebijakan privasi tidak diubah. Tulis DRAF kalimat untuk `mapel_pilihan` di
    salinan dan lembar review, dan tandai **menunggu tinjauan hukum**.
15. Pemetaan rumpun ke mapel ditulis sebagai catatan internal di laporan,
    bukan sebagai teks yang tampil di app.

## Di luar task ini
- Mengaktifkan `ai_aktif` atau `event_sekolah_aktif`.
- Mengubah kebijakan privasi atau versinya.
- Memverifikasi pemetaan `prodi.json` (ini pekerjaan tim konten).
- Menambah rumpun baru di luar 4 nilai.
- Chatbot yang memakai `mapel_pilihan` (ditunda sampai PM mengizinkan).
- Mengubah Latihan Level-In selain urutan tampil mapel pilihan.

## Definition of Done

- [ ] Migrasi `022_mapel_pilihan.sql` idempoten; dijalankan dua kali tanpa error
- [ ] Kelas 12: rumpun dipilih lebih dulu; mapel tampil per rumpun; tidak ada daftar penuh sekaligus; ada tes
- [ ] Kelas 12: maksimal 3 rumpun dan 5 mapel; mapel di luar rumpun ditolak; ada tes
- [ ] Kelas 7–11: Mapel Saya maksimal 5; tanpa rumpun; ada tes
- [ ] Kelas 7–11 yang mengirim `minat_rumpun` tetap ditolak; ada tes
- [ ] Mapel pilihan tampil lebih dulu di Arsip dan Latihan; ada tes
- [ ] Tes server minimal 12 kasus lulus
- [ ] Mutasi, gagal lalu lulus: (a) izinkan mapel di luar rumpun untuk kelas 12, (b) hapus batas 5 mapel, (c) tampilkan daftar mapel penuh untuk kelas 12
- [ ] Teks DRAF tercatat di salinan dan lembar review; kebijakan privasi tidak berubah
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` bernilai `0` (dicek di database)
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_079`

## Bukti 360 px
- Akun kelas 12 tanpa rumpun: ajakan memilih rumpun dulu
- Akun kelas 12 dengan dua rumpun: mapel per rumpun, bukan daftar penuh
- Akun kelas 7: Mapel Saya
- Simpan di `scratchpad/bukti-079/`. Tidak ada tangkapan layar di repo.

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Isi migrasi 022 dan bukti idempoten
- Pemetaan rumpun ke mapel yang dipakai, dan bahwa sumbernya belum terverifikasi
- Hasil tes dan tiga mutasi
- Nilai saklar dari database
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Teks baru berstatus DRAF sampai disetujui.
