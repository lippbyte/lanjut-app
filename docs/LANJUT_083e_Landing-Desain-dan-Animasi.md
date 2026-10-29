# TASK: LANJUT_083e — Desain dan Animasi Landing Page

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Baca juga, sebagai rujukan utama:
- `design.md` (panduan desain LANJUT v3.1): palet, tipografi, aturan anti-pattern.
- `salinan-teks-lanjut.md`: teks dan nada suara.

Keputusan PM untuk task ini:
- Palet dari `design.md`: biru muda `#B4E1EB`, biru sedang `#95BDD7`, biru tua
  `#78A4CB`, putih, dan `#1A1A1A` untuk teks body. Tidak ada oranye, tidak ada krem.
- Font: **Poppins** untuk judul dan tombol, **Source Sans 3** untuk body dan caption.
  Keduanya SIL OFL.
- Struktur halaman, teks, dan gaya mengikuti spesifikasi di bawah. Gaya visual
  dari referensi luar (Miranda, Outcrowd, CoreShift) hanya dipakai untuk pola,
  bukan warna, font, atau teks.

Batasan yang tetap berlaku:
- **Hanya folder `landing/`.** Tidak menyentuh `server/`, `LANJUT_App/`, atau
  `docs/` selain catatan di laporan.
- **Tidak ada paket baru** di `landing/package.json`, termasuk library animasi.
  Animasi memakai CSS keyframes dan React biasa.
- **Tidak ada deploy, unggah, push, atau `eas build`.**
- **Tidak ada CDN, tidak ada font dari Google Fonts saat runtime.** CSP tetap
  `default-src 'self'`. Font dihosting di `landing/public/fonts/` sebagai berkas
  `.woff2`.
- **File font diunduh dari sumber resmi** (Google Fonts, zip resmi, atau
  fontsource yang diunduh tanpa dipasang sebagai dependensi). Tidak menambah
  dependensi npm untuk font.
- Teks berstatus DRAF sampai PM menyetujui. Tidak mengubah kebijakan privasi.
- `ai_aktif` tetap `0`. `event_sekolah_aktif` tetap `0`. Dicek di database.
- Tidak ada testimoni, logo klien, angka statistik, atau penghargaan yang dibuat
  sendiri. Bagian cerita alumni tetap memakai teks "Cerita pertama sedang kami
  kumpulkan".

## Konteks

Landing dari 083b sudah berupa Vite + React multi-page di `landing/`. Yang
berubah di task ini hanya tampilan dan gerak. Konten, nama halaman, dan
`google-kembali.html` tetap seperti semula.

## Yang Diminta

### A. Font
1. Tambah `landing/public/fonts/` dengan Poppins (Bold 700, SemiBold 600, Medium 500)
   dan Source Sans 3 (Regular 400, SemiBold 600), format `.woff2`.
2. Deklarasi `@font-face` di CSS dengan `font-display: swap`, memakai path
   relatif.
3. Simpan berkas lisensi (`OFL.txt`) di `landing/public/fonts/`.

### B. Struktur halaman (`index.html`)
4. **Hero:**
   - Judul besar: "Anak SMK juga bisa kuliah." (Poppins Bold).
   - Baris pendukung: "Ini caranya, dari awal." (Source Sans 3).
   - Satu tombol utama "Unduh APK" dan satu tautan kecil "Lihat cara pasang".
   - Maskot kelinci wisudawan dari aset yang sudah ada di `landing/public/`. Kalau
     aset belum ada, pakai ruang kosong yang jelas, jangan membuat ilustrasi baru.
5. **Masalah:** tiga kartu.
   - "Mapel pendukungnya beda"
   - "Tenggatnya mudah terlewat"
   - "Waktunya paling sedikit"
   Isi kartu mengikuti `salinan-teks-lanjut.md` dan `deck-pengenalan-lanjut.md`.
   Bingkainya informasi tersebar, bukan sekolah lalai.
6. **Yang didapat:** empat poin dengan judul pendek, sesuai onboarding layar 3:
   Linimasa, Khusus SMK, Cerita alumni, Latihan harian 15 menit.
7. **Cara mulai:** tiga langkah vertikal, "Pilih kelas → Lihat Linimasa → Centang
   Daftar Periksa". Ada garis penghubung antarlangkah.
8. **Pasang APK:** cara mengizinkan sumber tidak dikenal di Android, dalam
   tiga langkah pendek.
9. **Footer:** tautan panduan uji, kebijakan privasi, dan keterangan "Versi uji".

Halaman `panduan-uji.html`, `kebijakan-privasi.html`, dan `google-kembali.html`
tetap sama isinya. Yang disesuaikan hanya font dan warna dari `design.md`.

### C. Gaya dan tampilan
10. Latar halaman putih atau biru sangat muda, dengan blok hero biru muda
    `#B4E1EB`. Teks body `#1A1A1A`. Tidak ada gradasi kecuali gradasi 3-tingkat
    biru yang diizinkan di `design.md` §2.4.
11. Tidak ada bayangan kecuali sangat tipis untuk kartu. Radius kartu dan tombol
    dibuat konsisten, dan nilainya dicatat di laporan karena `design.md` §4
    masih kosong.
12. Judul bagian memakai Poppins. Kalimat isi rata kiri, tidak rata tengah
    lebih dari dua baris.
13. Tombol utama memakai biru tua `#78A4CB` dengan teks `#1A1A1A`. Tidak memakai
    oranye atau merah.
14. Tampil baik di 360 px tanpa gulir mendatar. Judul besar memakai `clamp()`,
    bukan ukuran tetap.

### D. Animasi
15. **Hero:** judul dan baris pendukung muncul bertahap saat halaman dibuka.
    Durasi 600 ms, dengan jeda 150 ms. Pakai `opacity` dan `transform`.
16. **Kartu masalah:** naik sedikit dan memudar saat masuk layar. Pakai satu
    IntersectionObserver kecil. Tanpa library.
17. **Garis "Cara mulai":** tergambar dari atas ke bawah saat terlihat.
18. **`prefers-reduced-motion: reduce`:** semua animasi dinonaktifkan, dan semua
    elemen tampil langsung.
19. Tidak ada animasi yang membuat elemen melebar keluar layar atau memicu gulir
    mendatar.
20. Tidak ada animasi yang berulang terus-menerus (tidak ada loop tanpa henti),
    supaya halaman tidak mengganggu.

### E. Tes dan mutasi
21. Tes otomatis minimal 6 kasus:
    - build berhasil;
    - `noindex` ada di semua halaman;
    - tidak ada tautan skrip atau font dari luar (cari `http://`, `https://`
      selain tautan yang disengaja);
    - `@font-face` memakai berkas lokal dan berkas `.woff2` ada di `dist/`;
    - `prefers-reduced-motion` ada di CSS;
    - halaman penerus Google (`google-kembali.html`) ada di `dist/`.
22. Mutasi, gagal lalu lulus: (a) hapus `noindex`, (b) tambahkan tautan font
    dari Google Fonts, (c) hapus blok `prefers-reduced-motion`.
23. `npm test` (server), `npm run periksa-sql`, dan `npx tsc --noEmit` (app)
    tetap lulus. Tidak boleh rusak oleh perubahan ini.

### F. Bukti
24. Tangkapan layar 360 px untuk keempat halaman, disimpan di
    `scratchpad/bukti-083e/`, bukan di repo.
25. Daftar paket di `landing/package.json` tidak berubah dibanding 083b.
26. Ukuran total `dist/` dilaporkan.

## Di luar task ini
- Membuat APK atau mengisi tautan APK. Itu task 084.
- Mengisi URL backend atau Railway.
- Fitur 3D dan MissionClass.
- Mengubah teks menjadi final.
- Mengubah `design.md` atau `salinan-teks-lanjut.md`.

## Definition of Done

- [ ] Font Poppins dan Source Sans 3 ada di `landing/public/fonts/`, dengan `OFL.txt`
- [ ] Hero, masalah, yang didapat, cara mulai, pasang APK, dan footer ada di `index.html`
- [ ] Palet dan font sesuai `design.md`; tidak ada oranye atau krem
- [ ] Animasi hero, kartu, dan garis berjalan; reduced motion mematikannya; ada tes
- [ ] Tampil baik di 360 px tanpa gulir mendatar (bukti)
- [ ] Tes minimal 6 kasus lulus
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Tidak ada paket baru; tidak ada tautan font dari luar
- [ ] `dist/` tidak di-commit
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lulus
- [ ] Commit kecil, pesan commit menyebut `LANJUT_083e`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Sumber dan versi file font yang diunduh, beserta hash SHA-256
- Nilai radius kartu dan tombol yang dipakai (untuk diisi ke `design.md` §4)
- Hasil tes dan tiga mutasi
- Ukuran `dist/`
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, sandi SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder landing,
  dan jangan menulis ulang riwayat git.
- Tangkapan layar tidak masuk repo.
- Jalankan di git worktree atau branch terpisah, karena task 084 berjalan
  bersamaan. Commit hanya menyentuh `landing/`.
