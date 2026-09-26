# TASK: Samakan Tampilan & Isi LANJUT_App dengan MVP-PWA

## Konteks

Auth sudah jalan (LANJUT_001). Setelah login, 5 layar P0 (Linimasa, Khusus SMK, Pilih Mapel, Cerita Alumni, Daftar Periksa) sudah ada sebagai kerangka, tapi tampilan dan isinya belum disamakan dengan `MVP-PWA/` — masih terlihat sangat polos (lihat screenshot terlampir: header biru datar, konten placeholder "Bagian ini masih kami siapkan").

**Tujuan task ini:** setiap dari 5 layar tersebut, secara visual dan konten, mencerminkan `MVP-PWA/` — bukan reimplementasi ulang dari nol, tapi **port** desain dan isi yang sudah terbukti bekerja di PWA ke komponen React Native/Expo.

**Jangan ubah apapun di `LANJUT_App/server/`.**

## ⚠️ Soal layar Linimasa kosong — JANGAN dihack

Linimasa menampilkan kosong karena backend cuma menampilkan konten yang **sudah ditandai terverifikasi**, dan data seed saat ini belum ditandai begitu. Ini bukan bug kode.

**Jangan:**
- Mengubah logika filter verifikasi di backend supaya konten tidak terverifikasi ikut tampil
- Membuat data dummy/hardcode di Expo untuk "mengisi" tampilan seolah-olah datanya ada

**Lakukan:**
- Tetap tampilkan state kosong itu, tapi buat **tampilannya lebih baik** (ilustrasi/empty-state yang sesuai style MVP-PWA, bukan cuma teks polos) — cek apakah PWA punya pola empty-state serupa untuk kondisi data kosong, ikuti pola itu
- Catat di laporan akhir bahwa data seed perlu ditandai terverifikasi oleh tim konten — ini keputusan/kerja terpisah, bukan bagian dari task ini

## Langkah 0 — Audit MVP-PWA (wajib sebelum ngoding)

Untuk masing-masing dari 5 layar, buka file PWA yang sesuai (kemungkinan di `MVP-PWA/`, cari nama file HTML yang cocok — misalnya `linimasa.html`, atau semuanya dalam satu SPA dengan router JS, cek dulu strukturnya):

1. **Linimasa** — layout, jenis konten yang ditampilkan (kartu/timeline?), sumber data (endpoint API mana yang dipanggil PWA untuk ini?)
2. **Khusus SMK** — sama seperti di atas
3. **Pilih Mapel** — termasuk cek apakah ada logic khusus (misal endpoint `agregasi-lintas-prodi` yang disebut di dokumen backend — apakah dipakai di sini untuk jalur "belum tahu prodi"?)
4. **Cerita Alumni** — layout kartu/list, ada gambar/foto alumni?
5. **Daftar Periksa** — form/checklist interaktif, bagaimana PWA menyimpan progress-nya (localStorage dulu, sekarang harusnya lewat API karena sudah ada auth)

Untuk tiap layar, catat di laporan akhir:
- Endpoint API yang dipanggil (kalau ada)
- Warna, font, spacing utama yang dipakai (cek CSS variables/class di PWA)
- Komponen visual khusus (badge, ikon, ilustrasi) yang perlu di-port

## Langkah 1 — Ekstrak design tokens dari MVP-PWA

Cari file CSS utama PWA (kemungkinan di `MVP-PWA/assets/` atau sejenis). Catat:
- Palet warna (primary, secondary, background, text) — bandingkan dengan yang dipakai Expo sekarang (header biru datar di screenshot terlihat beda dari kemungkinan desain PWA aslinya)
- Font family & ukuran
- Spacing/radius yang konsisten dipakai (card, button, dll)

Buat file tema terpusat di Expo kalau belum ada, misal `LANJUT_App/src/theme/tokens.ts`, supaya kelima layar konsisten dan mudah di-maintain, bukan warna di-hardcode di tiap komponen.

## Langkah 2 — Implementasi per layar (satu-satu, jangan digabung)

Untuk tiap layar:
1. Bandingkan versi Expo saat ini vs versi PWA — identifikasi gap konten & visual
2. Update komponen Expo: struktur, styling (pakai design tokens dari Langkah 1), sumber data (pastikan fetch dari endpoint yang benar via `services/`, bukan hardcode)
3. Test manual: buka layar itu di `npm run web`, bandingkan sebelah-sebelahan dengan PWA (buka PWA juga di tab lain) — screenshot kalau perlu untuk laporan akhir
4. Commit terpisah per layar

**Urutan pengerjaan yang disarankan:** Linimasa dulu (paling terlihat di screenshot), lalu Cerita Alumni & Pilih Mapel (kemungkinan paling banyak konten), baru Khusus SMK & Daftar Periksa.

## Langkah 3 — Konsistensi navigasi/header

Screenshot menunjukkan tab navigasi atas (Linimasa, Khusus SMK, Pilih Mapel | Cerita Alumni, Daftar Periksa) dan footer ("Masuk sebagai [nama]" + tombol Keluar). Cek apakah pola ini juga konsisten dengan MVP-PWA atau ini murni buatan Expo — kalau PWA punya pola navigasi berbeda yang lebih baik (misal bottom tab bar khas mobile, bukan top tab), pertimbangkan port itu juga. Laporkan rekomendasi kalau ada perbedaan pendekatan, jangan ubah struktur navigasi besar-besaran tanpa dilaporkan dulu.

## Langkah 4 — Test manual menyeluruh

- [ ] Semua 5 layar dibandingkan visual dengan PWA — dicatat kemiripan/perbedaan yang disengaja
- [ ] Tidak ada data hardcode/dummy yang menggantikan pemanggilan API asli
- [ ] Empty state (seperti Linimasa) tampil dengan baik, bukan cuma teks polos
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada console error di browser

## Langkah 5 — Commit & dokumentasi

- Commit terpisah per layar (5 commit minimal, plus 1 untuk design tokens)
- Update `LANJUT_App/README.md`: catat bahwa tampilan sudah disamakan dengan MVP-PWA, sertakan referensi ke file tema

## Definition of Done

- [ ] Design tokens terpusat, tidak ada warna/font hardcode tersebar
- [ ] 5 layar sudah di-port kontennya (bukan cuma layout kosong)
- [ ] Endpoint API yang benar dipakai tiap layar (bukan asumsi/hardcode)
- [ ] Empty state Linimasa diperbaiki tampilannya, tapi tidak menyembunyikan fakta bahwa datanya memang belum terverifikasi
- [ ] Tidak ada perubahan logika verifikasi konten di backend
- [ ] Commit terpisah, rapi per layar

## Laporkan di akhir

- Untuk tiap layar: endpoint API yang dipakai, apa saja yang di-port dari PWA, apa yang sengaja beda (dan alasannya)
- Konfirmasi: data seed Linimasa (dan layar lain kalau ada masalah sama) perlu ditandai terverifikasi oleh siapa/tim mana — ini untuk saya teruskan ke Khalifa sebagai keputusan terpisah
- Screenshot before/after tiap layar kalau memungkinkan
- Rekomendasi soal pola navigasi (top tabs vs bottom tabs) kalau PWA punya pendekatan berbeda
- Commit hash untuk tiap layar
