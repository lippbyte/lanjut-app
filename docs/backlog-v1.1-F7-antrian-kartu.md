# Backlog v1.1 — F7: Antrian Multi-Kartu Latihan Harian

## Status
**Belum pernah diimplementasikan.** Bukan regresi dari Level-In — ini adalah gap desain v1
original yang baru terlihat sekarang karena UI (`latihan.html`) sudah lebih dulu menjanjikan
pengalaman multi-kartu ("Kartu 1 dari 12") sebelum logikanya ada.

## Bukti

1. **`app/assets/app.js` baris 10-13** (komentar kepala berkas, ditulis sejak awal berkas ini
   dibuat):
   > "Logika fitur (F1 Linimasa, F3 Penolong Pilih Mapel, F5 Daftar Periksa, F6 Arsip, **F7
   > Latihan**) BELUM ada di sini. Halaman masih memakai isi contoh yang ditulis langsung di
   > HTML; berkas di /data/*.json sudah disiapkan supaya nanti tinggal disambungkan lewat
   > LANJUT.muatData()."

2. **`pasangLatihan()` di `app/assets/app.js` (baris ~1144-1198)** hanya memasang event
   listener pada SATU elemen `.kartu-latihan` yang sudah statis di markup HTML (dibaca lewat
   `data-kartu-id` / `data-mapel`). Tidak ada:
   - fungsi `mulaiLatihan()`, `loadQueue()`, atau sejenisnya,
   - state index kartu (`currentIndex`/`cardIndex`),
   - logika memuat kartu berikutnya setelah Benar/Salah ditekan.
   Sesi latihan berakhir langsung ke `latihan-selesai.html` setelah 1 kartu dinilai.

3. **`app/data/arsip.json`** — struktur data cuma array flat `data: [...]` berisi kartu
   individual (id, mapel_id, judul, isi, jawaban, sumber, dibuat_pada). Tidak ada field
   `antrian`, `queue`, atau pengelompokan sesi/urutan kartu per hari.

4. **Git history**: repo hanya punya 6 commit di `git log --all`, dan seluruh direktori
   `app/` (termasuk `app.js`, `app/data/*.json`) berstatus **untracked** (`??`) di
   `git status` saat pemeriksaan ini dilakukan — belum pernah di-commit sama sekali.
   Pencarian `git log --all --grep` untuk kata kunci "queue", "antrian", "multi-kartu", "F7"
   tidak menemukan hasil apa pun. Tidak ada jejak versi sebelumnya yang pernah punya fitur ini.

## Kesimpulan
F7 Latihan saat ini adalah **kerangka satu-kartu**: UI dan salinan teks (§4.7 SDD/PRD) sudah
dirancang untuk sesi 12 kartu (~8 menit), tapi implementasi baru sampai tahap "tampilkan 1
kartu contoh dari HTML, catat nilai Level-In, lalu selesai." Ini bukan bug/regresi — memang
belum sampai ke situ dalam roadmap implementasi.

## Tindak lanjut sementara (sudah dilakukan)
- Teks di `app/latihan.html` diubah dari "Kartu 1 dari 12 · kira-kira 8 menit" menjadi
  "Kartu latihan · kira-kira 8 menit" agar tidak menjanjikan jumlah kartu yang belum bisa
  dipenuhi sistem.

## Cakupan pekerjaan v1.1 (usulan, belum di-scope resmi)
- Desain struktur data antrian harian (mis. field baru di `arsip.json` atau tabel terpisah:
  urutan kartu per pengguna per hari, status "sudah dikerjakan hari ini").
- Fungsi `mulaiLatihan()`/`loadQueue()` di `app.js`: ambil N kartu dari `arsip.json` (atau API
  backend bila sudah ada), render satu per satu, lanjut ke kartu berikutnya setelah nilai
  dicatat, baru ke `latihan-selesai.html` setelah antrian habis.
  Menggantikan `.kartu-latihan` statis di HTML dengan render dinamis.
- Perbarui `latihan.html` untuk menampilkan progres asli ("Kartu X dari Y") setelah antrian
  tersambung — teks netral saat ini adalah solusi sementara, bukan solusi akhir.
- Koordinasi dengan integrasi Level-In (`assets/levelin.js`) agar keyakinan per kartu tetap
  tercatat dengan benar untuk tiap kartu dalam antrian, bukan cuma kartu tunggal.

## Prioritas
Diusulkan **P1 untuk v1.1** (bukan P0) karena sesi 1-kartu saat ini masih berfungsi tanpa
error/crash setelah perbaikan teks di atas — hanya kurang lengkap dibanding janji PRD asli.
Perlu konfirmasi PM soal urgensi terhadap tanggal rilis.
