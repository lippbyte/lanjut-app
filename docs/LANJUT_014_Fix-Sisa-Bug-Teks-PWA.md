# TASK: Perbaiki Sisa Bug Teks di MVP-PWA

## Konteks

Dari laporan awal (sebelum pivot ke Expo), ada 3 bug teks kecil di PWA yang **belum pernah dikonfirmasi selesai**:

1. Lencana kartu buatan pengguna masih bertuliskan `'Buatan sendiri'` — seharusnya "Diunggah pengguna — belum diverifikasi tim" (cari di `MVP-PWA/assets/app.js`, sekitar area render kartu)
2. Mockup landing page lama masih menulis "Buka lanjut.app di HP" — tapi `landing-page/index.html` yang dipakai production kemungkinan sudah bersih. **Konfirmasi ulang** apakah file mockup yang bermasalah itu masih ada dan dipakai, atau cuma referensi lama yang tidak di-load user manapun (kalau cuma referensi, tidak perlu diperbaiki, cukup dicatat)
3. `latihan-selesai.html` diduga masih ada teks tetap "9 benar dari 12" — cek apakah ada JS yang menggantikannya sesuai hasil sungguhan, atau memang hardcoded

**Jangan ubah apapun di `LANJUT_App/` atau `LANJUT_App/server/`** — ini murni `MVP-PWA/` dan `LandingPage/` (nama folder baru pasca restrukturisasi).

## Langkah 1 — Audit & perbaiki

Untuk masing-masing dari 3 poin di atas:
1. Cari file & baris yang dimaksud (path mungkin sudah berubah sejak restrukturisasi — cari ulang, jangan asumsi path lama)
2. Kalau memang masih bermasalah: perbaiki teksnya
3. Kalau ternyata sudah tidak relevan (file tidak dipakai, atau sudah diperbaiki entah kapan): catat di laporan akhir, tidak perlu dipaksa "diperbaiki"

## Langkah 2 — Test manual

- [ ] Buka PWA (`MVP-PWA/`) di browser, cek ketiga area itu langsung (bukan cuma baca kode)
- [ ] Kalau ada JS terkait skor latihan: coba selesaikan 1 sesi latihan, konfirmasi angka yang tampil sesuai hasil sungguhan (bukan hardcode)

## Langkah 3 — Commit

- Commit terpisah per perbaikan (bukan digabung jadi satu commit besar)

## Definition of Done

- [ ] Ketiga poin dikonfirmasi statusnya (diperbaiki ATAU dikonfirmasi tidak relevan lagi)
- [ ] Tidak ada perubahan di `LANJUT_App/`
- [ ] Test manual di browser, bukan cuma baca kode

## Laporkan di akhir

- Status masing-masing 3 poin: diperbaiki / sudah tidak relevan / masih perlu keputusan lebih lanjut
- Commit hash (kalau ada perubahan)
