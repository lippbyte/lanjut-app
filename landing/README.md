# Landing LANJUT (Vite + React)

Sejak LANJUT_083b. Empat halaman, masing-masing berkas HTML sendiri (tanpa router):
`index.html`, `panduan-uji.html`, `kebijakan-privasi.html`, dan `google-kembali.html`.
Nama `google-kembali.html` tidak boleh diubah: alamatnya didaftarkan di Google Cloud Console.
Semua teks berstatus DRAF (`docs/salinan-teks-lanjut.md` §4.21).

## Perintah (di folder `landing/`)

```powershell
npm install          # sekali saja; hanya paket di package.json
npm run build        # hasil di dist/ — folder inilah yang diunggah
npm run preview      # pratinjau dist/ di peramban lokal
npm test             # tes build, noindex, CSP, tanpa skrip/font luar, penerus Google, tombol APK
npm run periksa-tipe # TypeScript (memakai TypeScript milik LANJUT_App)
```

Hasil build memakai alamat relatif, jadi isi `dist/` bisa diunggah ke folder mana pun di
domain. Membuka `dist/index.html` dengan klik ganda tidak jalan (peramban menolak skrip modul
dari `file://`); pakai `npm run preview`.

## APK

Taruh `lanjut-demo.apk` di `public/` sebelum `npm run build`, atau unggah langsung di sebelah
`index.html` di domain. Halaman memeriksa berkas itu saat dibuka: bila belum ada, tombol
Unduh APK nonaktif dengan keterangan "APK sedang disiapkan". Berkas APK tidak di-commit.

## Kebijakan privasi

Teksnya dari `LANJUT_App/lib/kebijakan-privasi.json`. Setelah JSON itu berubah:
`npm run landing-kebijakan` di folder `LANJUT_App/server`, lalu `npm run build` di sini.
