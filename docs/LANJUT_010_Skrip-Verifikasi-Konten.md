# TASK: Skrip Sederhana untuk Tandai Konten Terverifikasi

## Konteks

Linimasa (dan konten lain) kosong karena data seed belum ditandai terverifikasi (kolom tanggal verifikasi di database, disebut di LANJUT_003). Sekarang cara satu-satunya untuk menandai itu kemungkinan lewat SQL manual — ribet dan riskan buat tim konten yang belum tentu paham SQL.

**Tujuan task ini:** bikin skrip CLI sederhana (pola serupa `npm run benih`) supaya tim konten (atau kamu) bisa tandai konten terverifikasi tanpa nulis SQL, cukup command sederhana.

**Ini BUKAN tugas menentukan konten mana yang boleh ditandai terverifikasi** — itu keputusan tim konten berdasar sumber resmi. Skrip ini cuma alat, bukan validasi kebenaran data.

**Jangan ubah apapun di luar yang diperlukan untuk skrip ini** — tidak perlu bikin UI/admin panel, cukup CLI.

## Langkah 0 — Audit dulu

1. Cari kolom tanggal verifikasi yang disebut di LANJUT_003 (kemungkinan nama seperti `tanggal_verifikasi` atau `diverifikasi_pada`) — di tabel mana saja kolom ini ada? (Linimasa/tahapan, Khusus SMK, prodi/mapel — cek semua yang disebut "masih data contoh" di laporan sebelumnya)
2. Cek apakah ada field `pemilik` (disebut di LANJUT_003: "Pemilik datanya tercatat pemilik: 'tim'") — apakah skrip perlu update field ini juga saat verifikasi (misal ganti jadi nama orang yang verifikasi)?
3. Catat semua tabel/kolom yang relevan sebelum bikin skrip.

## Langkah 1 — Buat skrip CLI

Buat skrip baru (misal `npm run verifikasi-konten`) yang menerima parameter:
- Jenis konten (misal: `linimasa`, `khusus-smk`, `prodi`, dll — sesuaikan dengan tabel yang ditemukan di Langkah 0)
- ID konten yang mau ditandai
- (Opsional) nama/keterangan siapa yang memverifikasi

Contoh pemakaian yang dituju (sesuaikan sintaks sebenarnya dengan konvensi skrip lain di proyek):
```bash
npm run verifikasi-konten -- --jenis=linimasa --id=3 --oleh="Tim Konten EDILAKSO"
```

Skrip ini men-set kolom tanggal verifikasi ke waktu sekarang, dan field `pemilik`/keterangan verifikator kalau ada.

**Tambahkan juga mode "list"** supaya tim konten bisa lihat dulu apa saja yang BELUM terverifikasi sebelum memutuskan mana yang mau ditandai:
```bash
npm run verifikasi-konten -- --list
```
Menampilkan semua baris yang belum terverifikasi, dikelompokkan per jenis konten, dengan ID dan judul/ringkasan singkat supaya mudah diidentifikasi.

## Langkah 2 — Safety check

- Skrip harus menolak/warning kalau ID yang dimasukkan tidak ditemukan (jangan silent fail)
- Skrip tidak boleh bisa menghapus data atau mengubah isi konten — HANYA mengubah status verifikasi
- Test: jalankan di database test lokal, verifikasi 1 baris Linimasa, konfirmasi baris itu sekarang muncul normal lewat `GET /konten/linimasa` (tidak lagi kosong)

## Langkah 3 — Dokumentasi

Tulis instruksi pakai skrip ini di `server/README.md` dengan bahasa yang bisa dipahami non-programmer (tim konten mungkin bukan orang teknis) — termasuk cara menjalankannya dari awal (buka terminal, masuk folder mana, command apa).

## Langkah 4 — Test & Commit

- [ ] `npm test` tetap lolos semua (tidak ada regresi)
- [ ] Commit terpisah: skrip utama, lalu dokumentasi

## Definition of Done

- [ ] Skrip bisa list konten yang belum terverifikasi
- [ ] Skrip bisa tandai satu konten sebagai terverifikasi dengan aman (dengan validasi ID)
- [ ] Setelah ditandai, konten itu benar-benar muncul di endpoint publik (tidak kosong lagi)
- [ ] Dokumentasi cara pakai jelas untuk non-programmer
- [ ] `npm test` tetap lolos semua
- [ ] Tidak ada perubahan di `LANJUT_App/` (Expo) — ini backend-only

## Laporkan di akhir

- Nama command yang sebenarnya (kalau beda dari contoh di atas)
- Contoh output mode "list"
- Konfirmasi 1 baris test berhasil ditandai dan langsung muncul di endpoint publik
- Commit hash
