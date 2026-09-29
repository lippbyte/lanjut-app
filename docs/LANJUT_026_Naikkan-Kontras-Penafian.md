# TASK: Naikkan Kontras Teks Penafian & Catatan Kecil (Expo)

## Konteks

Dari LANJUT_025: gaya teks `Penafian` di LANJUT_App memakai warna dengan kontras hanya **2,1:1** terhadap latar, di bawah batas keterbacaan **4,5:1** untuk teks kecil. Gaya ini dipakai di teks yang dianggap wajib dibaca, misalnya "Ini rangkuman, bukan keputusan resmi" (Pilih Mapel) dan label "Diperbarui dari …". Pengguna adalah remaja, sebagian memakai HP murah dengan layar redup, jadi teks seperti ini praktis tidak terbaca.

Warna itu kemungkinan terbawa dari `tokens.css` MVP-PWA saat port. **Task ini sengaja menyimpang dari kesamaan tampilan dengan MVP demi keterbacaan.** Keputusan ada di Khalifa; jalankan hanya kalau ia setuju.

**Aturan:**
1. **Hanya pakai token warna yang sudah ada** di `theme/tokens.ts` (misalnya `textMuted`, kontras 9,1:1 seperti yang dipakai di LANJUT_025). Jangan membuat warna baru.
2. **Jangan ubah ukuran huruf, jarak, atau tata letak.** Yang berubah hanya warna teks.
3. **Jangan ubah `server/` dan `MVP-PWA/`.**

## Langkah 0 — Audit

1. Cari semua tempat gaya `Penafian` dan warna samar yang sama dipakai. Buat daftar: file, teks yang terkena, dan pasangan warna teks/latar.
2. Hitung rasio kontras tiap pasangan yang dipakai untuk **teks kecil** (di bawah 18 px, atau di bawah 14 px tebal). Tulis angkanya.
3. Cek juga token teks sekunder lain yang mungkin bermasalah (misalnya label kecil, placeholder, teks di atas latar berwarna) dan hitung kontrasnya. Ini hanya dilaporkan, bukan diubah, kecuali termasuk gaya `Penafian`.
4. Cek apakah ada teks samar yang **sengaja** dibuat samar (misalnya keadaan nonaktif, dekorasi murni). Yang begitu tidak diubah, cukup dicatat.

## Langkah 1 — Perbaiki

1. Ubah warna gaya `Penafian` ke token yang kontrasnya minimal 4,5:1. Idealnya cukup satu perubahan di definisi gayanya, bukan di tiap layar.
2. Kalau ada teks lain yang memakai warna samar yang sama tanpa lewat gaya `Penafian`, arahkan ke gaya/token yang sama dan laporkan.
3. Jaga hierarki tampilan: teks penafian tetap boleh terlihat sekunder dibanding isi utama (lewat ukuran dan posisi), hanya tidak boleh sampai tak terbaca.

## Langkah 2 — Test

- [ ] Hitung ulang kontras semua teks yang diubah: minimal 4,5:1
- [ ] Bandingkan visual sebelum/sesudah di layar Pilih Mapel, Beranda (label "Diperbarui dari …"), dan layar lain yang terkena, di lebar 360 px
- [ ] Tidak ada teks yang bergeser, terpotong, atau berganti ukuran
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `server/` dan `MVP-PWA/`

## Langkah 3 — Laporkan soal PWA (jangan ubah)

Cek apakah `MVP-PWA/` (`tokens.css` dan kelas yang setara `Penafian`) punya masalah kontras yang sama, dan tuliskan angkanya. Jangan mengubah apa pun di PWA; Khalifa yang memutuskan.

## Langkah 4 — Commit

Satu commit untuk perubahan kontras.

## Definition of Done

- [ ] Semua teks bergaya `Penafian` punya kontras minimal 4,5:1
- [ ] Hanya token yang sudah ada dipakai, tidak ada warna baru
- [ ] Tidak ada perubahan tata letak atau ukuran
- [ ] Temuan PWA dan teks samar lain dilaporkan, tidak diubah

## Laporkan di akhir

- Daftar tempat yang terkena, dengan kontras sebelum dan sesudah
- Teks samar lain yang ditemukan tapi tidak diubah (dan alasannya)
- Temuan kontras di PWA
- Screenshot sebelum/sesudah
- Commit hash
