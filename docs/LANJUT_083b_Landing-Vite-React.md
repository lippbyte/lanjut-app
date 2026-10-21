# TASK: LANJUT_083b — Landing Page dengan Vite + React

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Keputusan PM untuk task ini:
- Landing page dibangun ulang dengan **Vite + React** (menggantikan HTML statis
  dari 083).
- Paket baru yang diizinkan: `vite`, `react`, `react-dom`, `@vitejs/plugin-react`,
  dan tipe TypeScript untuk React. **Tidak ada paket lain** (tanpa router, tanpa
  UI kit, tanpa pelacak, tanpa font dari luar).

Batasan yang tetap berlaku:
- Tidak ada deploy, unggah, atau push. Build dilakukan lokal. PM yang mengunggah
  hasil build ke domain.
- Tidak ada `eas build`. Tidak ada perubahan firewall.
- Tidak menaikkan versi kebijakan privasi. Teks baru berstatus DRAF.
- Saklar `ai_aktif` dan `event_sekolah_aktif` tidak disentuh task ini.
  **Catatan:** laporan 083 menemukan `ai_aktif = 1`. Itu di luar task ini dan
  menunggu keputusan PM.
- Tidak ada email sungguhan. Tidak ada kunci atau kata sandi di landing.

## Konteks

Landing dari 083 berisi halaman utama, panduan uji, kebijakan privasi, dan
halaman penerus Google (`google-kembali.html`). Halaman-halaman itu HTML dan CSS
biasa. Kebijakan dibuat otomatis dari JSON yang sama dengan app lewat
`npm run landing-kebijakan`. Semua teks berstatus DRAF.

Halaman penerus Google harus tetap berupa berkas statis dengan nama yang sama,
karena URL-nya sudah didaftarkan di Google Cloud Console.

## Yang Diminta

### A. Struktur proyek
1. Buat proyek Vite + React di folder `landing/` (menggantikan isi lama). Gunakan
   TypeScript.
2. Pakai **Vite multi-page**: tiap halaman punya titik masuk HTML sendiri
   (`index.html`, `panduan-uji.html`, `kebijakan-privasi.html`, dan
   `google-kembali.html`). Jangan pakai router sisi klien, karena halaman penerus
   Google harus bisa dibuka langsung dari URL.
3. Konten semua halaman tetap sama dengan versi 083 (kata dan urutan). Yang
   berubah hanya cara membangunnya.
4. Kebijakan privasi tetap dibuat dari JSON yang sama. Skrip
   `npm run landing-kebijakan` tetap berfungsi dan hasilnya sama dengan
   versi 083.

### B. Tampilan dan aturan 083 yang tetap berlaku
5. Tampil baik di 360 px tanpa gulir mendatar.
6. `noindex` tetap ada di semua halaman.
7. Tidak ada skrip, font, atau pelacak dari luar. Tidak ada inline script yang
   melanggar CSP. CSP tetap `default-src 'self'`.
8. Tombol "Unduh APK" mengarah ke `lanjut-demo.apk` di folder `public/`. Berkas
   APK belum ada. Tombol tetap tampil, dan bila berkas belum ada, halaman
   menampilkan keterangan "APK sedang disiapkan" (bukan tautan rusak).
9. Teks baru atau yang berubah tercatat di salinan teks dan lembar review sebagai
   DRAF.

### C. Build dan bukti
10. `npm run build` menghasilkan `landing/dist/`. Folder `dist/` tidak di-commit.
11. Bukti build: daftar keluaran, dan pemeriksaan isi `dist/` menunjukkan tidak
    ada permintaan ke domain lain (cari `http://`, `https://` selain tautan
    yang memang disengaja, dan lapor hasilnya).
12. Tangkapan layar 360 px untuk keempat halaman, disimpan di
    `scratchpad/bukti-083b/`, bukan di repo.
13. Dalam `package.json` landing, tidak ada paket di luar daftar izin.

### D. Tes dan mutasi
14. Tes otomatis minimal 4 kasus: build berhasil; `noindex` ada di keempat
    halaman; tidak ada tautan skrip atau font dari luar; halaman penerus Google
    ada sebagai berkas statis di `dist/`.
15. Mutasi, gagal lalu lulus: (a) hapus `noindex`, (b) tambahkan skrip dari luar,
    (c) ganti nama `google-kembali.html`.
16. `npm test` (server), `npm run periksa-sql`, dan `npx tsc --noEmit` (app) tidak
    boleh rusak oleh perubahan ini.

## Di luar task ini
- Verifikasi email saat daftar (akan dibuat sebagai 083c).
- Mengunggah atau men-deploy apa pun.
- Membuat APK. Bagian itu menunggu Android SDK dan tempat backend.
- Halaman fitur baru (3D dan misi pemecahan masalah).
- Mengubah saklar atau `ai_aktif`.

## Definition of Done

- [ ] `landing/` memakai Vite + React + TypeScript, multi-page
- [ ] Konten keempat halaman sama dengan versi 083
- [ ] `npm run landing-kebijakan` berfungsi; hasilnya sama
- [ ] Tampil baik di 360 px tanpa gulir mendatar (bukti)
- [ ] `noindex` ada di keempat halaman; ada tes
- [ ] Tidak ada skrip atau font dari luar; ada tes
- [ ] Halaman penerus Google `google-kembali.html` ada sebagai berkas statis di `dist/`; ada tes
- [ ] Tombol APK menampilkan keterangan bila berkas belum ada
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] Hanya paket yang diizinkan yang ditambahkan (daftar di laporan)
- [ ] `dist/` tidak di-commit
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` tetap lulus
- [ ] Commit kecil, pesan commit menyebut `LANJUT_083b`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar paket baru beserta versinya
- Keluaran `npm run build` dan hasil pemeriksaan permintaan keluar
- Hasil tes dan tiga mutasi
- Nilai saklar dari database (`ai_aktif` dan `event_sekolah_aktif`), dilaporkan apa adanya
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API, SMTP, atau Google secret.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Tangkapan layar tidak masuk repo.
