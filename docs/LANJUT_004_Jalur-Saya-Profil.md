# TASK: Layar "Jalur Saya" (Profil) — v1.1 Personalization

## Konteks

Ini task pertama dari fase v1.1 (Personalization), setelah auth + UI parity selesai. Brief produk (`LANJUT_Product_Brief.txt`) menyebut fitur ini sebagai **"Jalur Saya"** — tempat siswa melihat posisi mereka sendiri: kelas, target prodi, dan progress.

**Kabar baik:** sebagian besar datanya **sudah ada** di database sejak registrasi (LANJUT_001) — `kelas`, `prodi_impian`, `nama_tampilan`, `email`. Task ini murni **menampilkan** data yang sudah ada + kemungkinan **mengedit** sebagian field, bukan membangun sistem baru dari nol.

**Jangan ubah apapun di `LANJUT_App/server/`** kecuali sekadar mengonfirmasi endpoint yang sudah ada — kalau ternyata butuh endpoint baru (misal update profil), **laporkan, jangan buat sendiri**.

## Langkah 0 — Audit dulu (wajib)

1. Cek response `GET /auth/saya` (dipakai untuk cek sesi saat app dibuka) — field apa saja yang dikembalikan di `pengguna`? Konfirmasi `kelas`, `prodi_impian`, `nama_tampilan`, `email` semua ada.
2. Cari apakah sudah ada endpoint untuk **update profil** (misal `PUT /auth/saya` atau `PATCH /pengguna/:id` atau semacamnya) di `LANJUT_App/server/`. Kalau tidak ada, catat di laporan akhir — jangan bikin baru sendiri di backend.
3. Cek halaman **Akun** yang sudah dibuat di LANJUT_003 (tempat tombol Keluar sekarang berada). Task ini kemungkinan **memperluas halaman itu**, bukan bikin tab/layar baru — konfirmasi dulu strukturnya di `LANJUT_App/app/(app)/` atau di mana pun halaman Akun berada.
4. Cek endpoint kemajuan/checklist (`GET /kemajuan` dari LANJUT_003) — bisa dipakai untuk hitung ringkasan progress (misal "3 dari 8 langkah selesai").

## Langkah 1 — Desain halaman "Jalur Saya"

Perluas halaman Akun yang sudah ada dengan bagian baru, atau buat sub-halaman kalau memang lebih rapi secara struktur (keputusan ada di kamu, sesuaikan pola navigasi MVP kalau ada acuannya). Isi minimal:

- **Nama tampilan** (read-only atau editable, sesuai hasil Langkah 0)
- **Kelas** (misal "Kelas 12 RPL" — gabungkan `kelas` dengan jurusan kalau datanya ada terpisah)
- **Target prodi** (`prodi_impian`) — kalau kosong (user tidak isi saat daftar), tampilkan state "Belum diisi" + tombol untuk isi (kalau ada endpoint update)
- **Ringkasan progress**: "X dari Y langkah Daftar Periksa selesai" — reuse logic/endpoint yang sudah ada dari Daftar Periksa, jangan duplikasi logic penghitungan

## Langkah 2 — Kemampuan edit (kondisional)

- **Kalau ada endpoint update** (hasil Langkah 0): buat form sederhana untuk edit `prodi_impian` (dan `nama_tampilan` kalau masuk akal). Validasi minimal di sisi client, andalkan validasi backend untuk sisanya.
- **Kalau TIDAK ada endpoint update**: jangan buat fake/local-only edit yang tidak tersimpan ke server (itu menyesatkan user — keliatan tersimpan padahal hilang saat refresh). Tampilkan data sebagai read-only, dan catat di laporan akhir bahwa endpoint update profil perlu dibuat backend sebagai task terpisah.

## Langkah 3 — Test manual

- [ ] Buka halaman "Jalur Saya" setelah login → data (kelas, prodi_impian, nama) tampil benar sesuai akun yang sedang login
- [ ] Kalau `prodi_impian` kosong → state "belum diisi" tampil dengan baik, bukan crash atau teks kosong aneh
- [ ] Ringkasan progress checklist akurat (cocokkan manual dengan centang yang ada di Daftar Periksa)
- [ ] Kalau ada fitur edit: ubah data → refresh → perubahan tersimpan (bukan cuma di state lokal)
- [ ] Logout lalu login dengan akun lain → data yang tampil benar milik akun yang sedang login (bukan akun sebelumnya — ingat bug data antar-akun yang pernah ditemukan di LANJUT_003, pastikan itu tidak muncul lagi di sini)

## Langkah 4 — Commit & dokumentasi

- Commit terpisah: desain/komponen halaman, lalu logic data-fetching, lalu (kalau ada) fitur edit
- Update `LANJUT_App/README.md` singkat: tambahkan "Jalur Saya" ke daftar fitur yang sudah ada

## Definition of Done

- [ ] Data profil (kelas, prodi_impian, nama) tampil akurat dari akun yang login
- [ ] Ringkasan progress checklist tampil dan akurat
- [ ] Tidak ada data palsu/fake-edit yang tidak benar-benar tersimpan ke server
- [ ] Tidak ada kebocoran data antar-akun
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `LANJUT_App/server/` tanpa laporan

## Laporkan di akhir

- Field apa saja yang tersedia dari `GET /auth/saya`
- Apakah endpoint update profil sudah ada atau perlu dibuat (kalau perlu, ini jadi task backend terpisah — LANJUT_005 kemungkinan)
- Screenshot halaman "Jalur Saya"
- Commit hash
