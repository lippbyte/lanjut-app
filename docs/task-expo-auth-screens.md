# TASK: Implementasi Login & Register di Expo App

## Konteks

Backend sudah siap dan sudah diverifikasi manual (26 Sep). **Jangan ubah apapun di `LANJUT_App/server/`** — endpoint, field, dan format respons di bawah ini sudah dipakai PWA (`MVP-PWA/`) dan ke-40 tes backend yang lolos. Tugasmu murni di `LANJUT_App/`: buat layar Login & Register yang menyesuaikan diri ke kontrak backend yang sudah ada.

## Kontrak API (sudah diverifikasi via curl, 26 Sep)

| Hal | Nilai |
|---|---|
| Base URL | `http://localhost:4000/api/v1` |
| Endpoint login | `POST /auth/masuk` |
| Endpoint register | `POST /auth/daftar` |
| Field login | `nama_pengguna`, `kata_sandi` |
| Field register | `nama_pengguna`, `kata_sandi` — **verifikasi ulang field lain sebelum coding** (lihat Langkah 0) |
| Respons sukses | `{ ok: true, data: { token, kedaluwarsa_pada, pengguna: { id, nama_pengguna, nama_tampilan, email, ... } } }` |
| Respons gagal | `{ ok: false, error: { kode: "KREDENSIAL_SALAH", ... } }` (401 untuk salah sandi) |
| Register sukses | `201`, langsung mengembalikan token (auto-login, tidak perlu login terpisah setelah daftar) |
| CORS | Sudah mengizinkan origin `localhost:8081` (Expo Web SDK 57), `19006`, `19000`. Kalau masih kena CORS error, cek `LANJUT_App/server/.env` bagian `ASAL_DIIZINKAN` — **jangan ubah file itu**, laporkan saja ke tim backend. |

## ⚠️ Langkah 0 — Wajib sebelum menulis kode apapun

Field register (`email` opsional? ada `nama_tampilan` terpisah dari `nama_pengguna`? ada validasi panjang kata sandi?) **belum 100% dikonfirmasi**. Sebelum membuat `RegisterScreen`:

1. Baca kode validasi di endpoint `/auth/daftar` (kemungkinan di `LANJUT_App/server/routes/auth.js` atau `LANJUT_App/server/controllers/auth.js` — cari nama file sebenarnya dulu).
2. Baca test file yang sudah lolos (kemungkinan `LANJUT_App/server/tests/auth.test.js`) untuk melihat contoh request body yang valid untuk daftar.
3. Catat temuan field yang **sebenarnya** di ringkasan akhir tugas ini — jangan asumsi dari tabel di atas kalau ternyata beda.

Jangan lanjut ke langkah berikutnya kalau field register belum jelas.

## Langkah 1 — Setup struktur folder

Di `LANJUT_App/`, buat (kalau belum ada):

```
LANJUT_App/src/
├── services/
│   ├── client.ts       # sudah ada? cek dulu — mungkin sudah ada unwrap logic
│   └── auth.ts         # fungsi masuk() dan daftar()
├── hooks/
│   └── useAuth.ts
├── screens/
│   └── auth/
│       ├── LoginScreen.tsx
│       └── RegisterScreen.tsx
└── navigation/
    └── RootNavigator.tsx
```

**Cek dulu apakah `client.ts` atau `apiFetch` sudah ada** (disebut sudah ada di catatan tim backend, dipakai untuk unwrap `data`). Jangan bikin ulang kalau sudah ada — pakai yang ada.

## Langkah 2 — Auth service layer (`src/services/auth.ts`)

- Fungsi `masuk(nama_pengguna, kata_sandi)` → panggil `POST /auth/masuk`, kembalikan `pengguna` + `token` setelah unwrap `data`.
- Fungsi `daftar(...)` → sesuaikan parameter dengan hasil Langkah 0.
- Setelah sukses (login maupun daftar): simpan `token` ke `AsyncStorage` dengan key `auth_token`.
- Tangani error: kalau `ok: false`, lempar error dengan pesan dari `error.kode` (map ke bahasa manusia, misal `KREDENSIAL_SALAH` → "Nama pengguna atau kata sandi salah").

## Langkah 3 — `useAuth` hook

- State: `loading`, `error`.
- Fungsi `login()` dan `register()` yang memanggil service layer di atas, dengan try/catch.
- Return `{ login, register, loading, error }`.

## Langkah 4 — `LoginScreen.tsx`

- Form: input `nama_pengguna`, input `kata_sandi` (secureTextEntry).
- Tombol submit → panggil `useAuth().login()`.
- Tampilkan loading spinner saat submit, tampilkan pesan error kalau gagal.
- Sukses → navigate ke layar utama (Home / Linimasa).
- Link ke `RegisterScreen` untuk yang belum punya akun.

## Langkah 5 — `RegisterScreen.tsx`

- Form sesuai field yang dikonfirmasi di Langkah 0.
- Sukses → langsung dianggap login (token sudah didapat dari respons daftar), navigate ke Home.

## Langkah 6 — `RootNavigator.tsx`

- Saat app start: cek `AsyncStorage.getItem('auth_token')`.
- Ada token → langsung ke Home (5 layar P0: Linimasa, Khusus SMK, Pilih Mapel, Cerita Alumni, Daftar Periksa).
- Tidak ada token → tampilkan `LoginScreen`.
- Tambahkan tombol/aksi logout di salah satu layar (hapus token dari `AsyncStorage`, kembali ke Login).

## Langkah 7 — Test manual

1. `cd LANJUT_App && npm run web` (bukan `expo start` polos — pastikan port yang dipakai memang ada di daftar CORS: `8081`).
2. Coba daftar akun baru → harus langsung masuk ke Home.
3. Logout, lalu login pakai akun yang sama → harus berhasil.
4. Login dengan kata sandi salah → harus muncul pesan error yang jelas (bukan crash atau silent fail).
5. Refresh browser → harus tetap login (token persist).

## Langkah 8 — Commit

- Jangan gabung dengan perubahan `LANJUT_App/server/`.
- Commit terpisah per unit kerja yang jelas, contoh:
  - `feat(LANJUT_App): tambah auth service layer (masuk/daftar)`
  - `feat(LANJUT_App): tambah LoginScreen dan RegisterScreen`
  - `feat(LANJUT_App): route protection berdasarkan token`
- Update `LANJUT_App/README.md`: field register yang benar (hasil Langkah 0), cara jalanin (`npm run web`), status auth (selesai).

## Definition of Done

- [ ] Field register sudah diverifikasi dari kode backend, bukan tebakan
- [ ] Daftar akun baru → auto-login → masuk ke Home
- [ ] Login dengan akun yang ada → masuk ke Home
- [ ] Login salah sandi → pesan error jelas, bukan crash
- [ ] Refresh browser → tetap login (AsyncStorage persist)
- [ ] Logout berfungsi
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `LANJUT_App/server/`
- [ ] README `LANJUT_App/` diperbarui dengan info akurat

## Laporkan di akhir

- Field register yang sebenarnya ditemukan di Langkah 0 (kalau beda dari tabel di atas)
- Apakah ada masalah CORS yang butuh perubahan di `LANJUT_App/server/.env` (laporkan, jangan ubah sendiri)
- Hasil test manual Langkah 7 (mana yang lolos, mana yang tidak)
- Nama file yang dibuat/diubah + commit hash
