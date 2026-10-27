# Situs LANJUT (Vite + React, prerender statis)

Redesign mengikuti `docs/PRD-landpage.md`, `docs/DESIGN-landpage.md`, dan
`docs/AGENTS-landpage.md`. Semua teks situs berstatus **DRAF** (label di atas setiap halaman)
dan semua halaman `noindex` sampai PM memutuskan situs dibuka untuk publik.

## Halaman

Setiap rute di `src/rute.ts` dirender menjadi `dist/<jalur>/index.html` saat build, jadi bisa
dibuka langsung dari alamatnya dan di-refresh di hosting statis mana pun.

| Alamat | Isi |
|---|---|
| `/` | Beranda (tujuh adegan storyboard DESIGN §6 + roadmap ringkas) |
| `/docs/` dan `/docs/...` | Dokumentasi publik: produk, bisnis, teknis, bantuan (termasuk `/docs/testing/`, panduan uji) |
| `/ai/` | AI LANJUT: arah dan batasan; status Dalam Pengembangan |
| `/download/` | Unduhan APK dari metadata rilis; "Unduhan belum tersedia" bila belum ada rilis |
| `/download/<versi>/` | Detail satu rilis (dibuat otomatis dari metadata) |
| `/privacy/` dan `/privacy/app/` | Privasi situs; kebijakan privasi aplikasi (DRAF) |
| `404.html` | Halaman tidak ditemukan (aset beralamat mutlak `/`) |
| `google-kembali.html` | Penerus masuk Google ke app. **Nama dan perilakunya tidak boleh berubah** (terdaftar di Google Cloud Console). |
| `panduan-uji.html`, `kebijakan-privasi.html` | Alamat lama, dialihkan ke `/docs/testing/` dan `/privacy/app/` |

## Perintah (di folder `landing/`)

```powershell
npm install          # sekali saja; hanya paket di package.json
npm run build        # scripts/bangun.mjs: build klien + SSR + prerender ke dist/
npm run preview      # pratinjau dist/ (meniru hosting: /a → /a/, 404.html)
npm test             # tes build, rute, noindex, CSP, tautan, metadata rilis, status fitur, dll.
npm run periksa-tipe # TypeScript (memakai TypeScript milik LANJUT_App)
npm run dev          # server pengembangan Vite (tanpa CSP; halaman dipilih dari alamat)
npm run hitung-apk -- <berkas.apk>   # ukuran dan SHA-256 untuk metadata rilis
```

Build **gagal** bila metadata rilis tidak sah atau ada tautan/berkas internal yang rusak.

## Di mana mengubah apa

- Isi dokumentasi: `src/konten/docs.ts` (penanda sebaris: `**tebal**`, `[label](/jalur)`, `` `kode` ``).
- Glosarium: `src/konten/glosarium.ts`. Definisi paling banyak dua kalimat. Istilah aturan
  seleksi (kelompok `seleksi`) wajib punya sumber resmi, tanggal `dicek`, dan tahun `ketentuan`;
  periksa ulang setiap SNPMB atau Kemendikdasmen menerbitkan ketentuan tahun baru.
- Fitur dan statusnya (beranda, dokumentasi, glosarium, roadmap memakai sumber yang sama): `src/konten/fitur.ts`.
  Status hanya `Tersedia`, `Dalam Pengembangan`, atau `Direncanakan`.
- Warna, huruf, jarak, gerak: token di `src/gaya/token.css` (DESIGN-landpage §0, revisi
  27 Okt 2026). Gaya dibagi: `dasar.css`, `komponen.css`, `kerangka.css`, `beranda.css`,
  `docs.css`, `halaman.css`.
- Teks beranda (judul ≤ 8 kata, isi satu kalimat; tes memeriksanya): `src/konten/beranda.ts`.
- `Kerangka` punya dua permukaan: `varian="merek"` (beranda, gradasi biru dan teks putih) dan
  `varian="terang"` (halaman lain, hanya kepalanya bergradasi).
- Rute, judul, dan deskripsi halaman: `src/rute.ts`.

## Merilis APK

1. Bangun APK rilis, lalu hitung ukuran dan SHA-256 dari **berkas yang dibagikan**:
   `npm run hitung-apk -- C:\jalur\lanjut-1.0.0.apk`.
2. Unggah APK ke tempat yang bisa diakses publik tanpa login (https), **atau** taruh di
   `public/unduh/` (berkas `.apk` tidak di-commit).
3. Tambahkan entri di `src/data/releases.json` dan ubah `latestVersion`:

   ```json
   {
     "latestVersion": "1.0.0",
     "releases": [
       {
         "version": "1.0.0",
         "releaseDate": "2026-11-01",
         "channel": "stable",
         "title": "…",
         "summary": "…",
         "apkUrl": "https://…/lanjut-1.0.0.apk",
         "fileSizeBytes": null,
         "minAndroidVersion": null,
         "sha256": null,
         "changes": ["…"],
         "knownIssues": []
       }
     ]
   }
   ```

   Nilai yang belum diverifikasi diisi `null` (tampil "Belum diverifikasi"). `apkUrl` harus
   https ke berkas `.apk` tanpa query (bukan AAB, bukan tautan bertanda tangan), atau jalur
   relatif seperti `unduh/lanjut-1.0.0.apk`. Untuk berkas di `public/`, build mencocokkan
   ukuran dan SHA-256-nya dengan metadata. Contoh dari PRD (`example.com`, `YYYY-MM-DD`,
   kalimat contoh) ditolak.
4. `npm run build`, lalu unggah isi `dist/`. Website dirilis terpisah dari aplikasi.

## Hosting

- Unggah **isi** `dist/`. Alamat aset relatif, jadi bisa di akar domain maupun subfolder.
- Tautan internal selalu berakhiran `/`. Hosting statis umum (Apache, Nginx, Netlify, GitHub Pages,
  Vercel) mengalihkan `/docs/faq` ke `/docs/faq/` sendiri.
- Arahkan halaman 404 hosting ke `404.html` (Apache: `ErrorDocument 404 /404.html`).
  `404.html` memakai alamat mutlak `/`, jadi tampil penuh bila situs ada di akar domain.
- Setelah domain resmi ditetapkan: `SITUS_URL=https://domain npm run build` menambah tautan
  kanonis, `og:url`, dan `sitemap.xml`. `noindex` tetap sampai PM memutuskan.
- Situs tidak memakai cookie, analytics, maupun skrip/huruf/gambar pihak lain (CSP `default-src 'self'`).

## Aset

- Huruf: Poppins 400/500/600/700 (subset latin, `@fontsource/poppins` 5.3.0), SIL OFL 1.1,
  lisensi di `public/lisensi/poppins-OFL.txt`.
- `public/gambar/lanjut-wordmark.png`: wordmark resmi, salinan apa adanya dari
  `LandingPage/lanjut-landing-page-mockup/project/assets/lanjut-wordmark-trimmed.png`.
- `public/gambar/maskot-putih.webp`: `LANJUT_App/assets/mascot-white.png`, tepi transparan
  dipangkas lalu diubah ke WebP beralfa. Bentuk dan warnanya tidak diubah.
- `public/gambar/app/*.webp`: tangkapan layar **aplikasi versi uji** (build web commit `d6f2dd8`,
  akun dan DB uji, 360 × 780 px @2x, 26 Okt 2026). Potret ulang bila tampilan app berubah.
  Hanya fitur yang memang terlihat di layarnya yang diberi tangkapan layar.

## Kebijakan privasi aplikasi

Teksnya dari `LANJUT_App/lib/kebijakan-privasi.json`. Setelah JSON itu berubah:
`npm run landing-kebijakan` di folder `LANJUT_App/server`, lalu `npm run build` di sini.
