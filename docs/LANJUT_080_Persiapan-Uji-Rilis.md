# TASK: LANJUT_080 — Persiapan Uji Rilis (Tanpa Deploy)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. **Task ini tidak melakukan deploy, push,
`eas build`, atau panggilan ke layanan luar.** Tidak ada perubahan firewall.
Tidak menambah paket baru. Tidak menaikkan versi kebijakan privasi. Tidak
memanggil OpenRouter. Saklar `ai_aktif` dan `event_sekolah_aktif` tetap `0`.

## Konteks

LANJUT_079b menutup fitur yang direncanakan (072–079). PM memutuskan
langsung menuju uji rilis setelah perbaikan. Task ini menyiapkan uji rilis
tanpa mengirim apa pun ke luar. Tujuannya: PM tahu persis apa yang sudah siap,
apa yang belum, dan apa keputusan yang masih dibutuhkan.

Blocker yang tercatat sejak 059 dan belum selesai:
1. Hosting backend belum ada (rencana: Railway, root `LANJUT_App/server`).
2. APK menunjuk IP LAN, bukan server produksi.
3. Konten terverifikasi masih sedikit (3 dari 84 saat terakhir dicatat).
4. Lebih dari 200 butir teks masih DRAF di lembar review.
5. Fitur AI belum diuji dengan OpenRouter sungguhan.
6. Belum ada uji di HP Android atau iPhone (Expo Go).
7. Kebijakan privasi v2 belum ditinjau hukum dan belum menyebut `minat_rumpun`,
   `mapel_pilihan`, dan penerima OpenRouter secara lengkap.
8. Mapel SMP berisi mapel SMA (catatan dari 079b, tidak ditambah atas keputusan PM).

## Yang Diminta

### A. Inventaris kesiapan (baca saja)
1. Buat berkas `docs/uji-rilis/inventaris-080.md` yang mencatat, untuk setiap
   blocker di atas: status sekarang, bukti (berkas atau perintah), dan siapa
   yang perlu memutuskan.
2. Untuk setiap fitur 072–079, catat satu baris: commit, saklar yang berlaku,
   dan apakah bisa diuji tanpa AI atau event.

### B. Rencana uji rilis
3. Tulis `docs/uji-rilis/rencana-uji-rilis.md` dengan bagian:
   - **Lingkup uji:** fitur yang aktif saat uji rilis tanpa AI dan tanpa event
     sekolah (saklar tetap `0`). Fitur AI dan event tidak ikut uji rilis kecuali
     PM memutuskan lain.
   - **Peserta:** siapa yang boleh ikut. Tidak ada data anak sungguhan. Akun uji
     memakai awalan yang jelas.
   - **Skenario:** daftar langkah uji untuk setiap jenjang (SMP, SMA/SMK/MA, kelas
     12), termasuk Beranda, Jalur Saya, Eksplorasi Kampus, Pilih Mapel, Latihan
     Level-In, dan Ngobrol tanpa AI.
   - **Kriteria lulus dan gagal** untuk tiap skenario.
   - **Cara melapor masalah** dan siapa yang menindaklanjuti.
4. Rencana harus menyebut bahwa 50 pengguna nyata pada 23 Oktober tidak mungkin
   tercapai dengan blocker di atas, kecuali PM memutuskan lingkup lebih kecil.
   Tulis angka yang realistis dan alasannya.

### C. Gerbang teknis (tanpa deploy)
5. Jalankan `npm test` (server), `npm run periksa-sql`, `npx tsc --noEmit`
   (app), dan `npm run build:web` (hanya build lokal, tanpa unggah).
6. Catat hasilnya. Jika ada yang gagal, jangan diperbaiki di task ini. Laporkan
   saja.
7. Tes Expo Go tidak dilakukan (membutuhkan perangkat). Tulis sebagai
   "belum dites" di inventaris.

### D. Keputusan untuk PM
8. Buat daftar keputusan yang harus diambil PM sebelum uji, satu per baris,
   dengan pilihan yang disarankan. Contoh: lingkup uji, apakah mapel SMP
   disembunyikan, apakah fitur AI ikut, siapa penerima uji.

## Di luar task ini
- Deploy, hosting, unggah, atau build untuk APK/iOS (`eas build`).
- Mengubah saklar, kebijakan privasi, atau konten terverifikasi.
- Menjalankan server baru atau mematikan server yang sudah berjalan.
- Memperbaiki temuan dari gerbang teknis.

## Definition of Done

- [ ] `docs/uji-rilis/inventaris-080.md` ada dan memuat delapan blocker dengan status dan bukti
- [ ] `docs/uji-rilis/rencana-uji-rilis.md` ada dengan lima bagian di poin B
- [ ] Angka pengguna realistis ditulis dengan alasan
- [ ] Gerbang teknis dijalankan dan hasilnya dicatat; tidak ada yang diperbaiki di task ini
- [ ] Daftar keputusan PM ada, dengan pilihan yang disarankan
- [ ] Tidak ada deploy, push, atau panggilan ke luar localhost; dibuktikan
- [ ] Saklar `ai_aktif` dan `event_sekolah_aktif` bernilai `0`
- [ ] Commit kecil, pesan commit menyebut `LANJUT_080`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Ringkasan inventaris: berapa blocker selesai, berapa belum
- Hasil gerbang teknis (lulus atau gagal, dan jumlah tes)
- Daftar keputusan PM
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API. Kunci OpenRouter hanya di `.env` lokal.
- Jangan menulis ulang riwayat git dan jangan jalankan `npm audit fix` di folder app.
- Tidak ada data anak sungguhan di mana pun dalam dokumen uji.
- Teks baru berstatus DRAF sampai disetujui.
