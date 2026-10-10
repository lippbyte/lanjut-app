# TASK: LANJUT_062 — Build Web Produksi dan Perbaikan Pasca-061

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Aturan tetap berlaku: tidak ada
deploy, push, `eas build`, atau panggilan ke layanan luar.

## Konteks

Waktu sempit. Jalur tercepat dan paling terbukti untuk rilis uji adalah
**versi web (PWA) dari app yang sama**, bukan APK:
- Semua E2E selama ini dijalankan di web 360 px, jadi itulah yang paling
  teruji.
- Tidak butuh `eas build`, akun Expo, atau build ulang dev client. Pemilih
  berkas modul di web memakai pemilih browser biasa.
- Siswa cukup membuka tautan.
- Dilayani dari server yang sama dengan API, CORS tidak perlu untuk web.

LANJUT_061 sudah menyiapkan sisi server dan EAS. Task ini menyiapkan
build web, dan memperbaiki tiga hal kecil yang ditemukan saat meninjau
laporan 061.

## Yang Diminta (urut prioritas)

### A. Pastikan penjaga placeholder tidak merusak pengembangan
061 menambah galat jika URL API masih berisi `GANTI-DOMAIN`, di
`app.config.ts` dan saat inisialisasi `api/client.ts`.
- Periksa: apakah `npx expo start --web` dan server dev lokal tanpa
  `EXPO_PUBLIC_API_URL` masih berjalan seperti sebelumnya? Perilaku yang
  diinginkan: **mode pengembangan** memakai bawaan lokal
  (`http://localhost:4000/api/v1` untuk web); **build produksi atau
  `eas build`** dengan placeholder gagal cepat dengan pesan jelas.
- Perbaiki bila penjaga ikut memblokir pengembangan. Buktikan keduanya:
  (1) dev web berjalan, (2) `expo export` dengan placeholder gagal dengan
  pesan jelas, (3) `expo export` dengan URL nyata (mis.
  `https://contoh.test/api/v1`) berhasil.
- E2E di repo memakai alamat lokal; pastikan tidak terpengaruh.

### B. Uji asap tidak boleh menyentuh basis data lokal saat menargetkan alamat lain
`npm run smoke -- --url=...` membersihkan akun uji lewat basis data
(`DELETE FROM pengguna`). Bila dijalankan terhadap URL produksi dari
laptop, pembersihan akan menyasar basis data lokal, bukan server itu, dan
akun uji tertinggal di produksi.
- Periksa apakah ada endpoint hapus akun milik sendiri (hak hapus data).
  Bila ada, pakai itu untuk pembersihan.
- Bila tidak ada: untuk `--url` selain localhost, **jangan** sentuh
  basis data; cetak nama akun uji dan petunjuk pembersihan manual, dan
  beri peringatan jelas. Untuk localhost, perilaku sekarang tetap.
- Tes untuk cabang yang diubah. Perbarui `docs/deploy-produksi.md`.

### C. Tes J01 (satu-satunya `todo` tersisa)
J01 mengharapkan balasan stub bagi akun tanpa persetujuan, sedangkan
perilaku sejak 053 adalah `403 AI_BELUM_DIIZINKAN` dan app menampilkan
layar terkunci dengan tautan bantuan. **Keputusan PM: perilaku sekarang
(layar terkunci) yang berlaku.**
- Pastikan di app: akun tanpa persetujuan melihat layar terkunci yang
  jelas dengan tautan "Butuh bicara dengan orang?" tetap ada, dan tidak
  ada galat mentah. Bila ada yang janggal, laporkan.
- Ubah J01 menjadi tes aktif yang memeriksa perilaku sekarang (403 dengan
  kode benar, penyedia tidak dipanggil). Catat di `docs/skenario-ai.md`
  bahwa spek awal menyebut stub dan mengapa kini layar terkunci.
- Saat `ai_aktif=0` (saklar mati), balasan stub berlabel uji coba tetap
  berlaku; pastikan ada tes untuk ini dan tidak tertukar dengan J01.

### D. Build web produksi
- Periksa konfigurasi web di `app.config.ts`/`app.json` (mode keluaran
  statis atau SPA) dan skrip yang sudah ada. Tambahkan skrip
  `npm run build:web` di folder app yang menjalankan `expo export
  --platform web` ke `dist/`, dengan `EXPO_PUBLIC_API_URL` diambil dari
  lingkungan saat build.
- Uji lokal: bangun dengan alamat API lokal, layani `dist/` dengan server
  statis sederhana (mis. `npx serve`, tanpa unggah ke mana pun), jalankan
  server API lokal, lalu jalankan alur inti di build itu: daftar, masuk,
  Latihan dengan pertanyaan keyakinan, Level-In, Arsip + unggah modul
  (pemilih berkas web), Ngobrol (stub), keluar. Gunakan skrip E2E yang
  sudah ada di `e2e/` bila bisa diarahkan ke alamat lain; bila tidak, buat
  versi parameter.
- **Rute dalam (deep link) dan muat ulang:** pastikan `index.html`
  dipakai sebagai cadangan untuk rute yang tidak ada berkas fisiknya.
  Sediakan bagian untuk ini di `nginx.conf.example` (sebelah lokasi API,
  satu domain: web di `/`, API di `/api/`), dan contoh aturan cadangan
  untuk hosting statis umum sebagai teks saja, tanpa memilih penyedia.
- **Kesiapan PWA:** periksa apakah manifest, ikon, dan service worker ada
  dan berfungsi (bisa dipasang ke layar utama). Laporkan apa adanya;
  jangan membangun fitur offline baru.
- **Cache:** panduan header (berkas ber-hash boleh di-cache lama,
  `index.html` jangan).
- **Penyimpanan token di web:** laporkan di mana token masuk disimpan di
  web (localStorage/cookie/lainnya) dan konsekuensi keamanannya; periksa
  CSP dari helmet (061) tidak memblokir app yang dibangun (skrip,
  gaya, font, sambungan ke API). Perbaiki CSP bila memblokir; jangan
  mengendurkannya lebih dari perlu.
- Tulis `docs/deploy-web.md`: build, tempat menaruh `dist/`, satu domain
  vs dua domain (dan konsekuensi `CORS_ORIGINS`), cara memperbarui versi,
  rollback (simpan `dist` sebelumnya).
- Perbarui `docs/kesiapan-rilis-uji.md`: jalur web sebagai jalur rilis
  uji tercepat dan apa yang belum diuji di dalamnya.

## Di luar task ini
- Deploy, domain, sertifikat, `eas build`, push.
- Fitur baru, fitur offline baru, poles tampilan.

## Definition of Done

- [ ] Dev web tetap jalan; build produksi dengan placeholder gagal jelas; dengan URL nyata berhasil
- [ ] Smoke test tidak menyentuh basis data lokal untuk URL selain localhost; ada tes
- [ ] J01 menjadi tes aktif sesuai keputusan; tes saklar `ai_aktif=0` ada; tidak ada `todo` tersisa dari skenario AI
- [ ] `npm run build:web` menghasilkan `dist/` yang lolos alur inti di server statis lokal
- [ ] Cadangan rute (index.html) tercatat di Nginx contoh dan di `docs/deploy-web.md`
- [ ] Laporan: kesiapan PWA, penyimpanan token web, hasil CSP
- [ ] `npm test`, `periksa-sql`, `tsc` bersih (server dan app)
- [ ] Tidak ada panggilan luar, push, deploy
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Hasil tiga skenario build di bagian A
- Alur inti yang lolos di build web dan yang gagal/tidak sempat
- Status PWA (bisa dipasang atau tidak) dan lokasi penyimpanan token web
- Ukuran `dist/` dan berkas terbesar
