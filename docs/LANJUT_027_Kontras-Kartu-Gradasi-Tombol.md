# TASK: Perbaiki Kontras Teks di Kartu Gradasi & Tombol Utama (Expo)

## Konteks

Dari LANJUT_026, ditemukan teks utama yang sulit dibaca (bukan gaya penafian, jadi belum disentuh):

| Elemen | Kontras sekarang | Batas minimal |
|---|---|---|
| Teks putih di kartu gradasi biru muda: tenggat Beranda ("28 hari menuju …"), kartu tahap Cek Posisi, saran mapel Pilih Mapel | **1,3–2,0:1** | 4,5:1 (teks kecil), 3:1 (teks besar: ≥18 px, atau ≥14 px tebal) |
| Tombol utama: putih di `blue400` | 2,63:1 | 3:1 (teks besar tebal) / 4,5:1 |
| Keping pilihan yang sedang dipilih (putih di `blue400`, 14 px) | 2,63:1 | 4,5:1 (kecuali tebal, maka 3:1) |
| Tombol sekunder ("Buka Daftar Periksa") | 4,04:1 | 4,5:1 |

Kartu tenggat dan tahap adalah informasi utama untuk siswa, jadi ini prioritas di antara temuan keterbacaan lainnya. Task ini **sengaja menyimpang dari kesamaan tampilan dengan MVP** demi keterbacaan. Jalankan hanya kalau Khalifa setuju.

**Aturan (tidak boleh dilanggar):**
1. **Hanya pakai token warna yang sudah ada** di `theme/tokens.ts`. Jangan membuat warna baru. Kalau tidak ada token yang bisa mencapai target, **berhenti dan laporkan** rasio terbaik yang bisa dicapai, jangan mengarang warna.
2. **Jangan ubah ukuran huruf, jarak, atau tata letak.** Yang boleh berubah hanya warna teks/latar.
3. **Jangan ubah `server/` dan `MVP-PWA/`.**
4. Placeholder isian dan tahapan Linimasa yang sudah lewat **tidak** diubah (sengaja samar).

## Langkah 0 — Audit kartu gradasi

1. Cari komponen kartu gradasi dan catat warna awal, tengah, dan akhir gradasinya.
2. Hitung kontras kandidat warna teks (putih dan token teks gelap yang ada, misalnya `ink900` atau setara) terhadap **titik terburuk** gradasi (bagian teks bisa berada di mana saja, jadi hitung terhadap ujung yang paling merugikan, bukan rata-rata). Tulis tabelnya.
3. Cek teks sekunder di dalam kartu yang sama (misalnya keterangan kecil) dan hitung kontrasnya.

## Langkah 1 — Perbaiki kartu gradasi

Pilih **satu** pendekatan dan terapkan seragam di ketiga kartu, lalu jelaskan alasannya di laporan:
- **A (diutamakan bila lolos):** ganti warna teks ke token gelap yang kontrasnya ≥4,5:1 di seluruh gradasi. Tampilan gradasi tetap.
- **B:** pakai titik gradasi yang lebih gelap dari token yang ada, sehingga teks putih lolos ≥4,5:1 (atau ≥3:1 untuk teks besar).
- Kalau keduanya tidak mungkin dengan token yang ada, berhenti dan laporkan angkanya.

## Langkah 2 — Tombol dan keping

1. Tombol utama dan keping terpilih: pakai token biru yang lebih gelap **yang sudah ada** kalau lolos (≥4,5:1 untuk teks putih, atau ≥3:1 bila teksnya besar dan tebal). Kalau tidak ada token yang lolos, laporkan saja.
2. Tombol sekunder (4,04:1): naikkan ke ≥4,5:1 kalau ada token yang memungkinkan; kalau tidak, laporkan.
3. Pastikan keadaan tombol lain (ditekan, nonaktif) tetap konsisten dengan perubahan ini.

## Langkah 3 — Test

- [ ] Hitung ulang kontras semua elemen yang diubah dan tulis angka sebelum/sesudah
- [ ] Screenshot sebelum/sesudah di lebar 360 px: Beranda (kartu tenggat), Cek Posisi (minimal dua tahap berbeda), Pilih Mapel (kartu saran), satu layar dengan tombol utama dan keping terpilih
- [ ] Tidak ada elemen yang bergeser, terpotong, atau berubah ukuran
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `server/` dan `MVP-PWA/`

## Langkah 4 — Commit

Commit terpisah: kartu gradasi, lalu tombol/keping.

## Definition of Done

- [ ] Teks di ketiga kartu gradasi punya kontras memenuhi batas di seluruh gradasi
- [ ] Tombol utama, keping terpilih, dan tombol sekunder memenuhi batas, atau dilaporkan jelas kenapa tidak bisa dengan token yang ada
- [ ] Tidak ada warna baru, tidak ada perubahan tata letak
- [ ] Placeholder dan tahapan yang sudah lewat tidak diubah

## Laporkan di akhir

- Tabel kontras sebelum/sesudah untuk tiap elemen
- Pendekatan yang dipilih untuk kartu gradasi (A atau B) dan alasannya
- Elemen yang tidak bisa diperbaiki dengan token yang ada (dan rasio terbaik yang bisa dicapai)
- Screenshot sebelum/sesudah
- Commit hash
