# TASK: Perkaya Cek Posisi Gue — Tenggat Linimasa & Filter Rumpun (Tanpa AI)

## Konteks

Dari analisis LANJUT_012a: Fase 1 AI Navigator (brief) **tidak butuh model AI sama sekali** — logic yang ada di `lib/cekPosisi.ts` (Cek Posisi Gue, dari LANJUT_005) sudah menentukan tahap siswa, fokus, dan arahan fitur secara rule-based. Dua hal yang bisa memperkaya ini tanpa AI:

1. **Tenggat Linimasa terdekat** — data sudah ada dari `GET /konten/linimasa`, tinggal dipakai di pesan "Fokus Sekarang"
2. **Filter rumpun checklist** — endpoint `GET /konten/checklist?rumpun=` sudah siap sejak LANJUT_007/008, tinggal disambungkan

**Jangan ubah apapun di `server/`.** Ini murni pemanfaatan yang sudah ada.

## Langkah 0 — Audit dulu

1. Baca `lib/cekPosisi.ts` — pahami struktur output saat ini (Posisi/Fokus/Langkah Berikutnya).
2. Cek response `GET /konten/linimasa` — pastikan format tanggal & cara hitung "berapa hari lagi" (kemungkinan sudah ada logic serupa di komponen Linimasa yang ada, reuse jangan bikin ulang).
3. Ingat: sebagian besar item Linimasa **masih belum terverifikasi** (kosong ditampilkan) — kecuali yang sudah ditandai lewat `verifikasi-konten` (LANJUT_010). Task ini harus tetap benar meskipun **belum ada satupun item terverifikasi** (kemungkinan kondisi saat ini).

## Langkah 1 — Tambah info tenggat terdekat

1. Di logic `cekPosisi.ts`, ambil item Linimasa **yang sudah terverifikasi** (endpoint publik seharusnya sudah otomatis cuma kasih yang terverifikasi — konfirmasi ini di audit, jangan asumsi).
2. Cari yang tanggalnya paling dekat dari hari ini (belum lewat).
3. Kalau ada: sisipkan ke "Fokus Sekarang", contoh format: *"[Nama tahapan] tinggal [X] hari lagi"*.
4. **Kalau tidak ada item terverifikasi sama sekali** (kemungkinan kondisi saat ini): jangan tampilkan kalimat kosong/error — fallback ke pesan yang ada sekarang tanpa info tenggat. Ini bukan kondisi error, ini kondisi normal untuk saat ini.

## Langkah 2 — Sambungkan filter rumpun ke checklist

1. Kalau siswa punya `prodi_impian` (dari Jalur Saya), cari `rumpun` prodi itu (dari `/konten/prodi`, sama seperti yang dipakai Pilih Mapel di LANJUT_009).
2. Kirim `rumpun` itu sebagai parameter saat fetch checklist untuk hitung progress di Cek Posisi Gue (dan tempat lain yang pakai shared hook progress dari LANJUT_004 — pastikan konsisten, jangan bikin logic terpisah).
3. **Efek yang diharapkan SEKARANG:** kemungkinan besar tidak ada perubahan angka (karena belum ada butir yang ditandai khusus rumpun tertentu) — itu normal. Yang penting pipa-nya sudah benar, siap dipakai begitu tim konten isi butir khusus rumpun nanti.

## Langkah 3 — Test manual

- [ ] Kondisi sekarang (tidak ada Linimasa terverifikasi): Cek Posisi Gue tetap tampil normal, tanpa info tenggat, tidak crash
- [ ] Simulasikan 1 item Linimasa terverifikasi (pakai `verifikasi-konten` di database test lokal): info tenggat muncul dengan hitungan hari yang benar, lalu batalkan lagi setelah test
- [ ] Progress checklist dengan filter rumpun tetap konsisten dengan Jalur Saya dan Daftar Periksa (tidak ada penyimpangan angka)
- [ ] TypeScript typecheck: 0 error

## Langkah 4 — Commit

- Commit terpisah: info tenggat, lalu filter rumpun

## Definition of Done

- [ ] Info tenggat Linimasa terdekat muncul di Cek Posisi Gue KALAU ada data terverifikasi, fallback rapi kalau tidak ada
- [ ] Filter rumpun tersambung ke checklist, konsisten dengan tempat lain
- [ ] Tidak ada AI/model eksternal yang dipakai — murni logic yang sudah ada
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `server/`

## Laporkan di akhir

- Screenshot kondisi dengan dan tanpa data Linimasa terverifikasi (pakai data simulasi test, bukan data mockup asli)
- Konfirmasi progress checklist tetap konsisten di semua tempat yang pakai shared hook
- Commit hash
