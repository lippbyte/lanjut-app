# LANJUT_App — Aplikasi mobile LANJUT (Expo)

**Status:** jalur pengembangan utama LANJUT sejak 18 Sep 2026. Expo dipilih menggantikan rencana Flutter, dan aplikasi ini adalah penerus PWA v1. `MVP-PWA/` sekarang berstatus arsip dan menjadi acuan UI; aplikasi Expo ini harus tampil sama dengannya.

**Sudah jalan:**
- Lima layar P0: Linimasa, Khusus SMK, Pilih Mapel, Cerita Alumni, Daftar Periksa. Datanya diambil dari backend lewat React Query.
- Masuk, Daftar, Keluar, dan perlindungan rute berbasis token.

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
  _layout.tsx          provider: QueryProvider + AuthProvider
  index.tsx            → /linimasa
  (auth)/_layout.tsx   khusus yang belum masuk; sudah masuk → /linimasa
  (auth)/masuk.tsx, daftar.tsx
  (app)/_layout.tsx    khusus yang sudah masuk; belum masuk → /masuk. Membungkus AppShell
  (app)/linimasa.tsx … lima layar P0
api/                   client.ts (apiFetch, ApiError), auth.ts (layanan auth), types.ts
providers/             QueryProvider, AuthProvider (status sesi: memuat | masuk | keluar)
hooks/                 useAuth + hook data per fitur
components/            layout/ (AppShell, AppNavBar), screens/ (per fitur, auth/)
server/                backend Express + MySQL (lihat server/README.md)
```

## Keputusan struktur (satu kalimat per keputusan)

- **Perlindungan rute memakai grup Expo Router `(auth)` & `(app)` yang masing-masing punya `_layout.tsx` penjaga, bukan `RootNavigator` ala React Navigation** — proyek ini memakai routing berbasis file, jadi penjagaan diletakkan di layout grup dan URL tetap bersih (`/masuk`, `/linimasa`).
- **Setelah login/daftar tidak ada `router.push` manual** — penjaga di `(auth)/_layout.tsx` otomatis pindah ke `/linimasa` begitu status sesi berubah jadi `masuk`, jadi hanya ada satu sumber kebenaran untuk navigasi.
- **Kedua layout grup memakai `<Slot/>`, bukan `<Stack/>` atau `<Tabs/>`** — kelima halaman P0 setara (bukan hierarki induk-anak).
- **`@expo/html-elements` untuk `Header`, `Nav`, `Main`, `Footer`, `Article`, `Section`, `H1`** — di web menghasilkan tag HTML semantik asli, di native menjadi `View`/`Text`.
- **`AppNavBar` memakai `<Link asChild>`** — supaya di web jadi `<a href>` sungguhan, bukan navigasi yang hanya jalan lewat klik.
- **`theme/tokens.ts` menyalin nilai HEX dari `MVP-PWA/assets/tokens.css`** — nilai produksi PWA v1, bukan deskripsi kualitatif `docs/design.md`.
- **`typography.fontBody` sengaja `undefined`** — nama font UI resmi belum dikonfirmasi (`design.md` Bagian 6 poin 1).

## Yang belum ada

- Profil lokal (`useProfilLokal`) dan kemajuan lokal (`useKemajuanLokal`) di Daftar Periksa masih tersimpan per perangkat, belum disambungkan ke akun (`pengguna.kelas`, `GET /kemajuan`), meskipun login sekarang wajib.
- Lupa sandi dan ubah sandi.
