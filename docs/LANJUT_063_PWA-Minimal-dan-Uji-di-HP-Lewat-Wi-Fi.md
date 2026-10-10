# TASK: LANJUT_063 — PWA Minimal dan Uji di HP Lewat Wi-Fi

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar.

## Konteks

LANJUT_062 menunjukkan hasil ekspor web adalah SPA biasa: tidak ada
`manifest.json`, ikon aplikasi, atau service worker, sehingga siswa belum
bisa "Pasang ke layar utama". Padahal rilis uji akan lewat web. Selain itu
belum ada uji di HP fisik. Task ini kecil dan harus selesai hari ini.

## Yang Diminta

### 1. PWA minimal (bisa dipasang ke layar utama, tanpa offline)
- Tambahkan `manifest` web: `name`, `short_name` ("LANJUT"), `start_url`
  `/`, `scope` `/`, `display: standalone`, `theme_color`, `background_color`
  (ambil dari warna merek yang sudah dipakai app), `lang: id`, dan ikon
  192×192 dan 512×512 (juga versi *maskable*). Buat ikon dari aset logo
  yang sudah ada di repo; jangan membuat logo baru.
- Tautkan manifest dan tambahkan `theme-color`, `apple-touch-icon`, dan
  meta `apple-mobile-web-app-*` di `<head>` hasil ekspor, memakai
  mekanisme yang didukung Expo/Expo Router untuk versi yang dipakai (cek
  dokumentasi versi itu; jangan menebak). Pastikan berkas statis ikut
  tersalin ke `dist/` saat `npm run build:web`.
- **Jangan** menambahkan service worker atau caching offline di task ini.
  Catat di `docs/deploy-web.md` bahwa kriteria pemasangan tiap browser bisa
  berbeda dan bagian mana yang belum dibuktikan.
- Pastikan CSP dari helmet (061/062) tidak memblokir manifest dan ikon.
- Verifikasi: setelah `npm run build:web` dan `node tools/layani-web.js`,
  `GET /manifest.webmanifest` (atau nama yang dipakai) mengembalikan JSON
  valid dengan tipe konten benar, ikon ada dan ukurannya sesuai,
  `index.html` memuat tautannya. Bila Chromium dengan alat pengembang
  tersedia di mesin ini, laporkan hasil pemeriksaan "installability"-nya;
  bila tidak, tandai belum diuji.

### 2. Uji di HP fisik lewat Wi-Fi yang sama (tanpa server produksi)
- Ubah `server/tools/layani-web.js` agar bisa mendengarkan di semua
  antarmuka jaringan dengan opsi eksplisit (mis. `--lan`), mencetak alamat
  LAN yang bisa dibuka dari HP (mis. `http://192.168.x.x:5500`), dan
  tetap hanya localhost bila opsi itu tidak diberikan. Peringatkan di
  keluaran bahwa ini hanya untuk uji di jaringan pribadi.
- Tulis `docs/uji-di-hp-lewat-wifi.md`, langkah demi langkah:
  1. dapatkan IP LAN komputer;
  2. `EXPO_PUBLIC_API_URL=http://<IP-LAN>:4000/api/v1 npm run build:web`;
  3. jalankan server API dengan `CORS_ORIGINS` yang memuat
     `http://<IP-LAN>:5500` (jelaskan bahwa aturan `https` wajib hanya
     berlaku pada `NODE_ENV=production`; pada uji ini pakai mode non-produksi
     dan **bukan** `.env.production`);
  4. jalankan `layani-web.js --lan`;
  5. izinkan port 4000 dan 5500 di firewall Windows untuk jaringan
     *Private* saja, dan cabut aturannya sesudah uji;
  6. buka alamat di Chrome Android dan Safari iOS pada Wi-Fi yang sama.
- Sertakan daftar periksa uji di HP: daftar/masuk, pilih kelas, Latihan
  beserta keyakinan, Level-In, unggah modul lewat pemilih berkas HP,
  Ngobrol (layar terkunci), keluar, muat ulang di rute dalam, dan keyboard
  virtual tidak menutupi tombol penting. Sediakan tabel kosong untuk
  mencatat hasil per perangkat.
- Jangan membuka port ke internet dan jangan mengubah pengaturan
  firewall sendiri; hanya tulis langkahnya.

### 3. Dokumen
- Perbarui `docs/deploy-web.md` dan `docs/kesiapan-rilis-uji.md` (status
  PWA, apa yang sudah dan belum dibuktikan).

## Di luar task ini
- Service worker, mode offline, notifikasi dorong.
- Poles tampilan dan logo baru.

## Definition of Done

- [ ] Manifest valid, ikon 192/512 (+ maskable) ada di `dist/`, tautan di `index.html`
- [ ] CSP tidak memblokir manifest/ikon; ada tes atau bukti pemeriksaan
- [ ] `layani-web.js --lan` bekerja dan mencetak alamat LAN; tanpa opsi tetap localhost
- [ ] `docs/uji-di-hp-lewat-wifi.md` lengkap dengan daftar periksa dan tabel hasil
- [ ] `npm test`, `periksa-sql`, `tsc` bersih; `npm run build:web` berhasil
- [ ] Tidak ada panggilan luar, push, deploy; tidak ada perubahan firewall
- [ ] Commit hash dilaporkan

## Laporkan (format di AGEN-ATURAN-TETAP.md), ditambah

- Mekanisme Expo yang dipakai untuk manifest dan `<head>`, beserta versinya
- Hasil pemeriksaan installability, atau pernyataan belum diuji
- Hal yang menurut Anda masih menghalangi pemasangan di Android dan iOS
