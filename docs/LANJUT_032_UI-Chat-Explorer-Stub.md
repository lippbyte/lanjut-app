# TASK: UI Chat AI Explorer (Testing UX) — Respons Model di-Stub

## Konteks

Khalifa ingin fitur chatbot yang bantu siswa menggali bakat/minat/cita-cita, mengatasi masalah belajar, dan mengarahkan ke fitur LANJUT yang relevan (setara "Explorer" di brief, bukan cuma Navigator). Tujuan sekarang: **testing UX di HP**, bukan rilis fitur AI sungguhan.

**PENTING — batasan keras:** panggilan sungguhan ke API AI pihak ketiga (Haiku/Anthropic) **BELUM boleh dibuat** di task ini. Alasan: data siswa (termasuk preferensi belajar, isi chat) yang dikirim ke API pihak ketiga tunduk pada UU PDP Pasal 25 (data pribadi anak), dan proses kepastian/izinnya belum selesai di sisi Khalifa. Ini bukan soal UI dilarang dibangun — UI boleh dan diminta dibangun sekarang. Yang digerbang cuma titik pengiriman data ke API eksternal.

**Jangan hubungkan ke `api.anthropic.com` atau layanan AI pihak ketiga mana pun.** Jangan kirim data pengguna (nama, preferensi, isi chat) ke luar sistem sendiri dengan cara apa pun.

## Langkah 1 — Layar preferensi belajar

1. Buat layar sederhana: pilih gaya belajar (misal Visual / Auditori / Kinestetik / Baca-Tulis — sesuaikan kalau ada referensi lain).
2. Simpan preferensi ke akun (tabel baru atau kolom baru di tabel pengguna — buat migrasi kecil kalau perlu, ikuti pola tabel lain).
3. Bisa diedit ulang dari halaman Akun/Jalur Saya.

## Langkah 2 — Layar chat

1. Buat antarmuka chat standar: bubble pesan pengguna dan bot, input teks di bawah, riwayat percakapan tampil scroll ke atas.
2. Riwayat percakapan **disimpan di local state saja untuk sekarang** (tidak perlu disimpan ke server/database) — supaya kalau nanti backend AI disambungkan, keputusan penyimpanan riwayat bisa diputuskan terpisah (ini juga menyentuh isu data anak, jangan diputuskan sendiri di task ini).

## Langkah 3 — Respons stub (WAJIB, ini pengganti AI sungguhan)

1. Buat fungsi `dapatkanBalasanBot(pesanPengguna, preferensiBelajar)` yang **tidak memanggil API apa pun**. Untuk sekarang, kembalikan salah satu dari beberapa balasan contoh yang ditulis manual (rotasi acak atau berdasar kata kunci sederhana), MISALNYA:
   - "Menarik! Ceritain lebih lanjut soal itu."
   - "Kedengarannya kamu tertarik ke bidang [X]. Mau coba lihat Pilih Mapel buat lihat mapel yang relevan?"
   - dst — buat 5-8 variasi contoh yang natural, bukan robotik.
2. **Beri komentar kode yang jelas dan mencolok** di fungsi ini: `// STUB — belum terhubung ke AI sungguhan. Menunggu kepastian izin data anak (UU PDP Pasal 25) dari Khalifa. Jangan sambungkan ke API eksternal tanpa konfirmasi eksplisit.`
3. Beri label kecil di UI chat: "Versi uji coba — balasan belum dari AI sungguhan" atau serupa, supaya siapa pun yang testing tahu ini bukan produk final.

## Langkah 4 — Navigasi

Hubungkan fitur ini dari tempat yang masuk akal (Beranda atau tab baru — putuskan yang paling sesuai pola navigasi yang sudah ada, jangan bikin pola navigasi baru).

## Langkah 5 — Test

- [ ] Alur pilih preferensi belajar → tersimpan → bisa dilihat lagi di Akun
- [ ] Chat UI berfungsi: kirim pesan, balasan stub muncul, scroll berfungsi
- [ ] Label "versi uji coba" terlihat jelas
- [ ] Tidak ada request ke domain eksternal AI (cek network tab/log — pastikan benar-benar tidak ada panggilan keluar)
- [ ] Typecheck 0 error
- [ ] Tidak ada perubahan di `server/` yang menyentuh integrasi AI (migrasi preferensi belajar boleh, itu bukan integrasi AI)

## Definition of Done

- [ ] Layar preferensi belajar berfungsi dan tersimpan
- [ ] Layar chat berfungsi penuh secara UI dengan respons stub
- [ ] TIDAK ADA panggilan ke API AI pihak ketiga di kode ini
- [ ] Kode stub diberi komentar jelas soal alasan dan status menunggu
- [ ] Bisa dites di HP fisik untuk keperluan UX

## Laporkan di akhir

- Screenshot layar preferensi dan layar chat di HP/emulator
- Konfirmasi eksplisit: tidak ada kode yang memanggil API eksternal (tunjukkan di mana fungsi stub berada)
- Commit hash
