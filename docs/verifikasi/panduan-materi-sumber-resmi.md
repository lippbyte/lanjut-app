# Panduan Tim Konten: Materi dari Sumber Resmi (Persiapan Event SMP)

LANJUT_076b. Untuk tim konten yang memasang kartu materi kurasi, misalnya rangkuman
atau contoh soal dari situs Kemendikdasmen, supaya bisa dihubungkan siswa SMP ke
event ujian mereka. **App tidak pernah mengambil apa pun dari situs mana pun.** Semua
bahan dipasang manual oleh tim. App hanya menampilkan kartu yang sudah terverifikasi
dan punya nama sumber serta tautan sumber `https://`.

## Boleh dan tidak boleh

1. **Hanya dari situs resmi pemerintah** (misalnya domain `*.go.id` milik
   kementerian atau lembaga). Untuk setiap bahan, catat **URL** halaman asalnya dan
   **tanggal akses**.
2. **Soal ujian nasional atau TKA yang tidak dipublikasikan tidak boleh diunggah.**
   Yang boleh hanya contoh soal atau materi ajar yang **dipublikasikan secara resmi**
   untuk umum.
3. **Cek syarat penggunaan situs dan hak cipta sebelum mengunggah.** Bila situs
   melarang penggunaan ulang atau tidak menjelaskannya, jangan dipasang.
4. **Jika ragu apakah boleh dipakai, tanyakan PM. Jangan dipasang dulu.**

## Cara memasang

1. Tambahkan satu kartu ke `MVP-PWA/data/arsip.json` (bagian `data`):

   ```json
   {
     "id": "k-smp-ipa-1",
     "mapel_id": "biologi",
     "judul": "Sistem pencernaan manusia",
     "isi": "Ringkasan singkat yang ditulis ulang dari bahan resmi.",
     "sumber": "resmi",
     "penyedia": "Kemendikdasmen",
     "url_sumber": "https://alamat-halaman-resmi.go.id/…",
     "dibuat_pada": "2026-10-14"
   }
   ```

   - `penyedia` tampil di app sebagai **"Sumber: [penyedia]"**. Wajib diisi.
   - `url_sumber` wajib diawali `https://`. Tanpa itu, kartu tidak bisa dipilih siswa.
   - Bila `isi`, `penyedia`, atau `url_sumber` diubah kemudian, tanda verifikasi
     otomatis hilang. Kartu harus diverifikasi ulang.
2. Jalankan benih dari folder `LANJUT_App/server`: `npm run benih`. Kartu baru masuk
   dengan status **belum diverifikasi** dan belum terlihat siswa.
3. Cocokkan isi kartu dengan halaman di `url_sumber`.
4. Isi status verifikasi lewat skrip yang sudah ada. Pakai `--tanggal` dengan tanggal
   akses atau pemeriksaan:

   ```
   npm run verifikasi-konten -- --jenis=kartu --id=k-smp-ipa-1 --oleh="Nama Pemeriksa" --tanggal=2026-10-14
   npm run verifikasi-konten -- --jenis=kartu --id=k-smp-ipa-1 --oleh="Nama Pemeriksa" --tanggal=2026-10-14 --ya
   ```

   Perintah pertama hanya menampilkan pratinjau. Perintah dengan **`--ya`** yang
   benar-benar menandai. Nama pemeriksa tercatat di `verifikasi-konten.log`.
5. Mencabut verifikasi: tambahkan `--batal --ya`. Event siswa yang sudah terhubung ke
   kartu itu menampilkan "Materi ini sudah tidak tersedia" tanpa tombol. Data event
   siswa tidak diubah.

## Yang dilihat siswa

- Hanya siswa kelas 7–9, dan hanya bila saklar `event_sekolah_aktif` menyala.
- Di pilihan "Kartu materi": kartu Arsip milik siswa sendiri, dan kartu kurasi yang
  terverifikasi, punya `penyedia`, dan punya `url_sumber` https.
- Di kartu event: "Sumber: [penyedia]" dan tombol "Buka materi" untuk membuka judul
  dan isi kartu di dalam app.
