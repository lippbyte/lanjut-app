# LANJUT_App — Aplikasi mobile LANJUT (Expo)

**Status:** jalur pengembangan utama LANJUT sejak 18 Sep 2026. Expo dipilih menggantikan rencana Flutter, dan aplikasi ini adalah penerus PWA v1. `MVP-PWA/` sekarang berstatus arsip dan menjadi acuan UI; aplikasi Expo ini harus tampil sama dengannya.

**Sudah jalan:**
- Lima layar P0: Beranda/Linimasa, Khusus SMK, Pilih Mapel, Cerita Alumni, Daftar Periksa. Datanya diambil dari backend lewat React Query.
- Masuk, Daftar, Akun + Keluar, dan perlindungan rute berbasis token.
- Centang Daftar Periksa tersimpan ke akun (`/kemajuan`), jadi ikut pindah ke HP lain.
- **Jalur Saya** (v1.1, di layar Akun `/akun`): nama tampilan, kelas, target prodi, dan ringkasan "X dari Y langkah Daftar Periksa selesai". Nama, kelas, dan prodi bisa diubah; disimpan ke akun lewat `PATCH /pengguna/saya`.
- **Cek Posisi Gue** (v1.1, `/cek-posisi`, pintu dari Beranda dan Jalur Saya): tahap siswa (Eksplorasi → Pemantapan Awal → Persiapan Aktif → Menjelang Pendaftaran), fokus sekarang, dan tombol langkah berikutnya. Tahap dihitung rule-based di `lib/cekPosisi.ts` dari data yang sudah ada — prodi impian, centang `mapel-tka`, dan persen Daftar Periksa — tanpa kuis. Satu pertanyaan opsional ("apa yang paling bikin bingung") hanya menambah kalimat fokus dan tidak disimpan.
- Tampilan disamakan dengan `MVP-PWA/` (lihat bagian **Tampilan**).

**Catatan historis:** `docs/prd-sdd-lanjut.md` Bagian 8 dulu menolak React Native untuk v1. Keputusan itu berlaku untuk rilis PWA v1, bukan untuk arah proyek saat ini.

## Menjalankan

```bash
# 1. Backend (butuh MySQL jalan, konfigurasi di server/.env)
cd LANJUT_App/server && npm start          # http://localhost:4000

# 2. Aplikasi (terminal lain)
cd LANJUT_App && npm run web               # http://localhost:8081
npm run android                            # emulator/device Android
```

`npm run web` harus berjalan di port **8081**, karena hanya port ini yang diizinkan CORS di `server/.env` (`ASAL_DIIZINKAN`). Base URL API diatur di `app.config.ts`: `localhost` untuk web, `10.0.2.2` untuk emulator Android. Device fisik perlu `EXPO_PUBLIC_API_URL_DEV_ANDROID` berisi IP LAN komputer.

## APK Android (EAS Build)

APK dibangun di cloud Expo, jadi tidak butuh Android Studio atau SDK lokal.

- Proyek EAS: `lippbyte/lanjut` (projectId ada di `app.config.ts`)
- Package Android: `com.edilakso.lanjut`

```bash
cd LANJUT_App
npx eas-cli build --platform android --profile preview   # hasil: .apk (bukan .aab)
```

- **URL API** diatur lewat `EXPO_PUBLIC_API_URL` di `eas.json` → `build.preview.env`. Saat ini isinya IP LAN komputer backend. Kalau IP komputer berubah, ganti nilai itu lalu build ulang; kode tidak perlu diubah.
- **Kalau `EXPO_PUBLIC_API_URL` diisi,** nilainya dipakai di semua platform dan mengalahkan pemilihan otomatis (`localhost` untuk web / `10.0.2.2` untuk emulator / URL produksi).
- **HTTP polos** (`usesCleartextTraffic`) hanya diizinkan kalau URL-nya berawalan `http://`. Build ke backend `https://` otomatis kembali aman.
- **Syarat di HP:** HP harus berada di WiFi yang sama dengan komputer backend, dan backend harus jalan (`cd server && npm start`). Backend sudah listen di `0.0.0.0:4000`.
- **Penyimpanan APK:** simpan unduhan di `LANJUT_App/build/`. Folder ini diabaikan git.
- **Aturan abaikan untuk EAS wajib di `.gitignore` root repo.** Saat mengemas proyek, EAS hanya membaca `.gitignore` root; aturan di `LANJUT_App/.gitignore` tidak berlaku untuk upload EAS (tanpa aturan root, APK di `build/` ikut terunggah dan arsip jadi ±220 MB). Cek isi arsip tanpa upload: `npx eas-cli build:inspect -p android -s archive -e preview -o <folder> --force`.

## Tampilan

Tampilan meniru `MVP-PWA/` (port, bukan desain ulang):

- **Token desain:** `theme/tokens.ts`. Warna, huruf, jarak, radius, bayangan, dan gradasi disalin dari `MVP-PWA/assets/tokens.css`. Komponen tidak menulis HEX atau ukuran huruf mentah.
- **Huruf:** Poppins 400/500/600, sama dengan PWA. Dimuat di `app/_layout.tsx` lewat `@expo-google-fonts/poppins`.
- **Komponen dasar:** `components/ui/` berisi padanan kelas CSS PWA: `Kartu` (`.kartu`, `--soft`, `--outline`, `--brand`), `KartuPintu`, `Lencana`, `Peringatan`, `Kosong`, `Tombol`, `Kepala`, `SeksiJudul`, `Sumber`/`Penafian`, dan `Ikon` (SVG garis yang sama dengan PWA).
- **Navigasi:** app bar (maskot, wordmark, ikon profil), tab bar bawah empat ikon (Beranda, Khusus SMK, Pilih Mapel, Checklist), dan page bar dengan tombol kembali untuk halaman anak (Cerita Alumni, Jalur Saya). Semuanya ada di `components/layout/AppShell.tsx`.

Perbedaan yang disengaja dari PWA:

| Layar | Beda | Alasan |
|---|---|---|
| Beranda | Tahapan tanpa `diperiksa_pada` tidak ditampilkan (PWA menampilkannya dengan peringatan "Contoh"). Layar kosongnya mengarah ke laman resmi SNPMB. | PRD F1; keputusan PM 26 Sep 2026. |
| Beranda | Tidak ada kartu "Latihan Hari Ini" dan pintu "Latihan & Arsip Belajar". | Fitur Latihan/Arsip belum ada di Expo. |
| Khusus SMK | Semua kartu tertutup saat layar dibuka (PWA membuka kartu pertama). | Kartu pertama yang terbuka menutupi judul lain di layar HP; permintaan user 27 Sep 2026. |
| Pilih Mapel | Tidak ada kartu "Lihat prospek & kampus" (F10). "Simpan ke Daftar Periksa" mencentang butir `mapel-tka` di akun, tidak membuat butir baru. | F10 belum ada di Expo; backend belum mendukung butir buatan pengguna. |
| Pilih Mapel | Rangkuman umum memakai `GET /konten/mapel/agregasi-lintas-prodi` (jumlah prodi), PWA menjumlah bobot di klien. | Endpoint backend sudah ada. |
| Daftar Periksa | Ada keping Kelas & Jalur untuk menyaring butir. Centang disimpan ke akun. | AC F5 di PRD (PWA belum menyaring). Jalur disimpan di perangkat karena akun belum punya medan jalur. |

## Autentikasi

| Hal | Nilai |
|---|---|
| Masuk | `POST /auth/masuk` — `nama_pengguna`, `kata_sandi` |
| Daftar | `POST /auth/daftar` — wajib: `nama_pengguna` (3–32 karakter `a-z 0-9 . _`, disimpan huruf kecil) dan `kata_sandi` (8–200 karakter, sandi umum ditolak). Opsional: `email`, `nama_tampilan` (≤60), `kelas` (`'10' \| '11' \| '12'`), `prodi_impian` (id prodi). Sumber: `server/src/modul/auth/auth.skema.js`. |
| Hasil sukses | `{ ok: true, data: { token, kedaluwarsa_pada, pengguna } }`. Daftar mengembalikan 201 dan langsung login. |
| Hasil gagal | `{ ok: false, galat: { kode, pesan, medan? } }`. Kuncinya **`galat`**, bukan `error`. |
| Penyimpanan | AsyncStorage `auth_token` (token) dan `auth_pengguna` (profil). Di web tersimpan di `localStorage`. |

Formulir Daftar mengikuti `MVP-PWA/daftar.html`: nama pengguna, email (boleh kosong), kata sandi, dan prodi impian ("Belum, aku belum tahu" juga jawaban yang sah dan tidak dikirim ke server). Kalimat galat disalin dari `PESAN_GALAT` di `MVP-PWA/assets/api.js`.

Saat aplikasi dibuka:
1. `AuthProvider` membaca token.
2. Token diperiksa ke `GET /auth/saya`.
   - Jawaban 401 → token dibuang dan pengguna kembali ke layar Masuk.
   - Galat jaringan → pengguna tetap dianggap masuk (bisa dipakai offline).

## Struktur

```
app/
  _layout.tsx          provider (SafeArea, Query, Auth) + muat huruf Poppins
  index.tsx            → /linimasa
  (auth)/_layout.tsx   khusus yang belum masuk; sudah masuk → /linimasa
  (auth)/masuk.tsx, daftar.tsx
  (app)/_layout.tsx    khusus yang sudah masuk; belum masuk → /masuk. Membungkus AppShell
  (app)/linimasa.tsx … lima layar P0, (app)/akun.tsx
api/                   client.ts (apiFetch, ApiError), auth.ts (layanan auth), types.ts
providers/             QueryProvider, AuthProvider (status sesi: memuat | masuk | keluar)
hooks/                 useAuth, useKemajuan (baca + centang), hook data per fitur
theme/tokens.ts        token desain dari MVP-PWA
components/            ui/ (komponen dasar), layout/ (AppShell), screens/ (per fitur, auth/)
server/                backend Express + MySQL (lihat server/README.md)
```

## Keputusan struktur (satu kalimat per keputusan)

- **Perlindungan rute memakai grup Expo Router `(auth)` & `(app)` yang masing-masing punya `_layout.tsx` penjaga, bukan `RootNavigator` ala React Navigation** — proyek ini memakai routing berbasis file, jadi penjagaan diletakkan di layout grup dan URL tetap bersih (`/masuk`, `/linimasa`).
- **Setelah login/daftar tidak ada `router.push` manual** — penjaga di `(auth)/_layout.tsx` otomatis pindah ke `/linimasa` begitu status sesi berubah jadi `masuk`, jadi hanya ada satu sumber kebenaran untuk navigasi.
- **Kedua layout grup memakai `<Slot/>`, bukan `<Stack/>` atau `<Tabs/>`** — tab bar & page bar digambar sendiri di `AppShell` supaya sama persis dengan PWA.
- **`@expo/html-elements` untuk `Header`, `Nav`, `Main`, `Footer`, `Article`, `Section`, `H1`** — di web menghasilkan tag HTML semantik asli, di native menjadi `View`/`Text`.
- **Tab bar memakai `<Link asChild>`** — supaya di web jadi `<a href>` sungguhan, bukan navigasi yang hanya jalan lewat klik.
- **Status centang/pilihan/buka memakai atribut `aria-*`** (`aria-checked`, `aria-expanded`, `aria-current`), bukan `accessibilityState` — react-native-web tidak menerjemahkan `accessibilityState` ke atribut ARIA.
- **Ringkasan kemajuan di Jalur Saya memakai `hooks/useProgresDaftarPeriksa`, hook yang sama dengan layar Daftar Periksa** — saringan kelas/jalur dan hitungan X/Y hanya ada di satu tempat, jadi angkanya selalu cocok.
- **Pilihan kelas/jalur di perangkat disimpan per akun** (`lanjut.profil.lokal.v1:<id pengguna>`) — HP yang dipakai bergantian tidak membawa saringan akun lain.
- **`DELETE /kemajuan/:id` tidak menghapus baris**, hanya mengosongkan `selesai_pada`; klien menganggap butir tercentang hanya kalau `selesai_pada` terisi.

## Yang belum ada

- Pilihan jalur di Daftar Periksa masih tersimpan per perangkat (`useProfilLokal`), karena akun belum punya medan jalur.
- Latihan, Arsip Belajar, dan Eksplorasi Tujuan (F10).
- Data konten (Linimasa, Khusus SMK, dll.) masih data contoh (`asal: mockup`, `diperiksa_pada: null`) dan perlu diverifikasi tim konten.
- Lupa sandi dan ubah sandi.
