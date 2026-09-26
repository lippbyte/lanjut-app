# LANJUT_App — Eksplorasi Expo LANJUT (BUKAN rilis v1)

**Status:** kerangka routing saja, tanpa logika fitur maupun koneksi API.
**Hubungan dengan PWA (`MVP-PWA/`):** proyek **terpisah**, bukan pengganti. `docs/prd-sdd-lanjut.md` Bagian 8 secara eksplisit menolak React Native/Native Android untuk v1 — PWA di `MVP-PWA/` tetap jadi rilis utama. Folder ini adalah eksplorasi arah v2, dikonfirmasi dengan pemilik produk sebelum dikerjakan.

## Menjalankan

```bash
cd LANJUT_App
npm run android   # Android (butuh emulator/device + Android Studio)
npm run web       # Web (Metro bundler bawaan Expo SDK 57)
```

## Keputusan struktur (satu kalimat per keputusan)

- **Direktori `LANJUT_App/` sejajar `MVP-PWA/`, `LandingPage/`** (backend `server/` kini ada di dalam `LANJUT_App/server/`) — supaya proyek Expo ini bisa dihapus kapan saja tanpa menyentuh satu baris pun kode PWA v1 yang sudah lolos audit.
- **Expo Router dengan `<Slot/>` di `app/_layout.tsx`, bukan `<Stack/>` atau `<Tabs/>`** — kelima halaman P0 setara (bukan hierarki induk-anak), jadi tidak ada alasan memakai transisi/animasi Stack yang menyiratkan urutan drill-down.
- **`AppShell` dipisah dari `app/_layout.tsx`** — `_layout.tsx` Expo Router sebaiknya hanya berisi konfigurasi navigasi, sementara markup Header/Main/Footer lebih mudah diuji dan dibaca sebagai komponen biasa di `components/layout/`.
- **`@expo/html-elements` dipakai untuk `Header`, `Nav`, `Main`, `Footer`, `Article`, `Section`, dan `H1`** — elemen-elemen ini merender tag HTML asli (`<header>`, `<nav>`, dst.) di web dan `View`/`Text` setara di native, jadi satu baris kode menghasilkan HTML semantik tanpa cabang kode khusus platform; `H1` ditambahkan di luar daftar instruksi karena tanpa itu tiap halaman tidak akan punya judul dokumen yang valid secara semantik.
- **`app/index.tsx` me-redirect ke `/linimasa`, bukan berisi konten sendiri** — SDD Bagian 14 "Alur A" menyebut Linimasa sebagai nilai pertama yang wajib terlihat begitu pengguna baru masuk, jadi rute akar tidak boleh punya konten yang bersaing dengan itu.
- **`AppNavBar` memakai `<Link asChild>` dari expo-router dibungkus `Pressable`, bukan `TouchableOpacity` + `router.push()` manual** — supaya keluaran di web tetap elemen `<a href>` sungguhan (bisa dibuka tab baru/disalin tautan), bukan navigasi JavaScript yang hanya berfungsi lewat klik.
- **`theme/tokens.ts` menyalin nilai HEX dari `MVP-PWA/assets/tokens.css`, bukan menebak ulang dari `docs/design.md`** — `design.md` Bagian 6 sendiri menyatakan kode HEX di sana masih deskriptif/belum final, sementara `tokens.css` sudah jadi nilai produksi yang dipakai PWA v1.
- **`typography.fontBody` sengaja `undefined`, bukan diisi "Ahoka" atau "Poppins"** — nama font UI resmi belum dikonfirmasi (`design.md` Bagian 6 poin 1), jadi React Native jatuh ke font sistem (`fontFallback: 'System'`) sampai ada keputusan tertulis.
- **Tiap file rute (`app/<nama>.tsx`) hanya memanggil `ScreenSection` dengan `featureCode` dan `title`** — supaya pemetaan rute → nomor fitur PRD (F1–F5) terlihat langsung di kode tanpa perlu membuka dokumen lain.

## Yang belum ada (di luar lingkup kerangka ini)

Tidak ada state management, tidak ada `fetch`/panggilan API, tidak ada penyimpanan lokal, dan tidak ada validasi input — kelima halaman murni placeholder yang menunjukkan rute dan judul saja, menunggu keputusan lanjutan sebelum diisi logika sungguhan.
