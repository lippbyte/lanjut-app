# TASK: LANJUT_050 — Perbaiki Kerentanan `npm audit`

## Konteks

Dari laporan LANJUT_049: `npm audit` melaporkan 3 kerentanan tingkat
sedang di `qs`, `express`, dan `body-parser`. Itu sudah ada sebelum
LANJUT_049. Sebelum deploy produksi, kerentanan ini perlu diselesaikan
atau dinilai dengan jelas.

Tujuan task: kerentanan yang bisa diperbaiki dengan aman diperbaiki,
yang tidak bisa dijelaskan alasannya, tanpa mengubah perilaku server
atau app.

**Prioritas tetap: stabilitas dulu.** Ini task pemeliharaan, bukan
fitur. Jangan menambah fitur atau refaktor di luar kebutuhan perbaikan.

## Yang Diminta

1. **Catat kondisi awal.** Jalankan `npm audit` di `LANJUT_App/server`
   dan di `LANJUT_App` (app Expo), masing-masing lengkap dan dengan
   `--omit=dev`. Catat setiap temuan: paket, tingkat keparahan, nomor
   advisori, versi terpasang, versi perbaikan, dan apakah paket itu
   dependensi produksi atau hanya pengembangan.
2. **Perbaiki dengan perubahan paling kecil.**
   - Mulai dari pembaruan yang kompatibel (`npm audit fix` tanpa
     `--force`), lalu periksa diff `package.json` dan `package-lock.json`.
   - **Jangan memakai `--force` dan jangan menaikkan versi mayor**
     (misalnya express ke versi mayor baru) tanpa melaporkan dulu.
     Kalau satu-satunya perbaikan adalah kenaikan mayor, jangan
     lakukan; jelaskan pilihannya di laporan.
   - Kalau ada paket bertingkat (transitif) yang bisa diperbaiki dengan
     `overrides`, boleh dipakai, dengan catatan alasannya di README.
3. **Jaga yang sudah diputuskan:**
   - `pdfjs-dist` tetap di versi yang dipin (4.10.38) dan larangan
     memuat modul native gambar di worker PDF tetap berlaku.
   - Server tetap kompatibel dengan Node 20+.
   - Jangan menambah dependensi baru kecuali benar-benar diperlukan
     untuk perbaikan.
4. **Nilai sisa temuan.** Untuk setiap kerentanan yang tidak bisa
   diperbaiki aman, tulis: apakah jalur kode yang rentan benar-benar
   dipakai oleh LANJUT (misalnya fitur parsing tertentu), seberapa
   mungkin dieksploitasi lewat endpoint kita, dan apa langkah
   mitigasinya atau kapan sebaiknya naik versi mayor.
5. **Uji penuh** sesudah perubahan (lihat di bawah). Perubahan
   dependensi bisa mengubah perilaku diam-diam.

## Test

- [ ] `npm audit` (server dan app) sebelum dan sesudah: tabel perbandingan lengkap
- [ ] Tes server lolos penuh, periksa-sql lulus, typecheck 0 error di app
- [ ] E2E yang menyentuh jalur sensitif lolos: unggah modul dan PDF (LANJUT_049), persetujuan dan penerimaan kebijakan (LANJUT_047 dan 048), serta alur masuk dan daftar
- [ ] Ekstraksi PDF berturut-turut tetap bersih (tes beban LANJUT_049) dan penjaga modul native masih bekerja
- [ ] Preflight CORS dan penolakan origin asing tetap seperti sebelumnya
- [ ] Server dan app tetap berjalan di Node 20 (sebutkan versi Node yang dipakai uji)
- [ ] Tidak ada permintaan jaringan baru ke domain luar selain registri npm saat instalasi

## Definition of Done

- [ ] Semua kerentanan yang bisa diperbaiki aman sudah diperbaiki
- [ ] Sisa temuan dijelaskan satu per satu dengan penilaian risiko
- [ ] Lockfile ikut di-commit, tidak ada perubahan perilaku
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Tabel `npm audit` sebelum dan sesudah (paket, keparahan, advisori, status)
- Daftar paket yang naik versi (dari, ke) dan apakah ada yang mayor
- Temuan yang tidak diperbaiki beserta penilaian risiko dan rekomendasi
- Hasil semua uji di atas
