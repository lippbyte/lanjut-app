# TASK: LANJUT_073 — Banner Pengumuman di Beranda

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar selain yang diizinkan di task ini. Tidak ada
perubahan firewall. Jangan mengambil berita dari internet.

## Konteks

Khalifa minta Beranda punya banner seperti berita atau spanduk, untuk pengumuman
yang dikurasi tim. Aturan dasar app tetap: hanya data yang sudah terverifikasi
yang boleh tampil. Banner TIDAK mengambil berita otomatis dari internet dan
TIDAK menampilkan item yang belum terverifikasi.

Posisi banner: tepat di bawah sapaan, di atas baris progres. Penempatan ini
mengikuti urutan di `lib/beranda.ts` dan tidak mengubah keputusan susunan
LANJUT_072 yang masih menunggu persetujuan PM.

Sumber data banner mengikuti pola `kartu-bantuan.json` (berkas konfigurasi di
server, bukan tabel baru), supaya tidak ada migrasi database.

## Yang Diminta

### A. Berkas data banner (server)
1. Buat `LANJUT_App/server/config/banner-beranda.json` dengan struktur:
   ```json
   {
     "versi": 1,
     "banner": []
   }
   ```
   Isi `banner` dibiarkan kosong. Jangan mengarang banner apa pun.

2. Setiap item banner wajib punya field:
   - `id` (string unik, misal `banner-2026-001`)
   - `judul` (maks. 80 karakter)
   - `isi` (maks. 200 karakter)
   - `tanggal_mulai` dan `tanggal_selesai` (format `YYYY-MM-DD`, zona WIB)
   - `sumber` (nama sumber resmi)
   - `url_sumber` (wajib `https://`)
   - `status_verifikasi` (`belum_diverifikasi` atau `terverifikasi`)
   - `diperiksa_pada` (tanggal pengecekan, bukan tanggal sumber)
   Item tanpa `diperiksa_pada` dianggap belum terverifikasi.

3. Validasi saat server berjalan: JSON rusak atau field wajib kosong membuat
   endpoint banner menjawab kosong (`banner: []`) dan mencatat peringatan di log.
   Server tidak boleh mati karena berkas ini.

### B. Endpoint baru (server)
4. `GET /api/v1/konten/banner`, tanpa login (sama seperti konten publik lain).
   - Hanya mengembalikan item yang `status_verifikasi = terverifikasi`, tanggal
     hari ini (WIB) berada dalam rentang `tanggal_mulai`..`tanggal_selesai`.
   - Maksimal 1 item: yang `tanggal_mulai` paling baru.
   - Respons: `{ ok: true, data: { banner: [...] } }` atau `banner: []`.
   - Kunci galat tetap `galat`.
   - Field yang dikirim hanya: `id`, `judul`, `isi`, `sumber`, `url_sumber`,
     `tanggal_selesai`. Field internal (`diperiksa_pada`, `status_verifikasi`)
     tidak dikirim.

### C. App (Beranda)
5. Tampilkan banner di bawah sapaan, kalau endpoint mengembalikan satu item.
   - Judul, isi, dan sumber tampil. Sumber dan tautannya berupa teks
     "Sumber: {sumber}" yang bisa ditekan dan membuka `url_sumber`.
   - Tekan banner tidak membuka apa-apa selain tautan sumber.
   - Kalau `banner` kosong, seksi banner TIDAK tampil sama sekali. Jangan
     tampilkan "belum ada pengumuman".
   - Kalau endpoint gagal, seksi banner juga tidak tampil. Tidak ada pesan galat.

6. Pemakaian fungsi tanggal: pakai fungsi "hari ini WIB" yang sudah dibuat di
   LANJUT_072b (`lib/linimasa.ts`). Jangan menulis logika tanggal baru di layar.

### D. Lembar review dan salinan teks
7. Teks judul seksi (jika ada) dan teks "Sumber:" masuk `docs/salinan-teks-lanjut.md`
   sebagai DRAF, dan masuk lembar review (`lembar-review-teks.js`).
8. Berkas `banner-beranda.json` diberi catatan di lembar review bahwa isi banner
   wajib dicek manusia sebelum status diubah menjadi `terverifikasi`.

## Di luar task ini
- Mengisi banner dengan konten nyata (itu tugas tim konten setelah task ini).
- Mengambil berita dari internet, web search, atau RSS.
- Notifikasi push untuk banner.
- Banner per jenjang (bisa dibahas nanti).
- Tombol tutup banner atau menyimpan "sudah dibaca".
- Mengubah urutan Beranda selain menyisipkan banner di bawah sapaan.
- Mengubah tabel, migrasi, atau kontrak endpoint yang sudah ada.

## Definition of Done

- [ ] `banner-beranda.json` dibuat dengan `banner: []`, tanpa isi karangan
- [ ] Endpoint `GET /konten/banner` mengembalikan `[]` saat banner kosong
- [ ] Item `belum_diverifikasi` tidak pernah dikirim
- [ ] Item di luar rentang tanggal WIB tidak dikirim
- [ ] Hanya satu item yang dikirim, yang paling baru `tanggal_mulai`
- [ ] Field internal tidak ikut terkirim
- [ ] JSON rusak atau field wajib kosong tidak mematikan server; hasilnya kosong dan ada peringatan di log
- [ ] `url_sumber` non-https ditolak (tidak dikirim)
- [ ] App: seksi banner tidak tampil saat kosong, dan tidak tampil saat endpoint gagal
- [ ] App: banner tampil di bawah sapaan saat ada satu item (uji dengan data fixture, bukan data nyata)
- [ ] Tes server baru: minimal 10 kasus, mencakup poin di atas
- [ ] Mutasi, gagal lalu lulus: (a) hapus filter `terverifikasi`, (b) hapus filter tanggal, (c) izinkan `url_sumber` non-https. Laporkan hasilnya.
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Teks DRAF tercatat di `salinan-teks-lanjut.md` dan lembar review
- [ ] Tidak ada panggilan ke luar localhost
- [ ] Commit kecil, pesan commit menyebut `LANJUT_073`
- [ ] Bukti 360 px (dengan fixture) disimpan di `scratchpad/`, bukan di repo

## Laporkan

- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Hasil `npm test`, `periksa-sql`, `tsc`
- Hasil tiga mutasi (gagal lalu lulus)
- Bukti 360 px: kondisi banner kosong, banner ada satu item, endpoint gagal
- Letak kode endpoint dan letak seksi banner di Beranda
- Keputusan yang kamu ambil sendiri, misalnya cara memotong `isi` yang melebihi batas
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
