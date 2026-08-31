# Perbaikan Blocker v1 — Lengkap (sebelum lanjut ke F10)

**Keputusan:** bukan Opsi C, tapi bukan juga "tunggu semua 9 blocker" versi mentah — 7 dari 9 blocker QA dikerjakan sekarang (semuanya yang benar-benar kerjaan kode), 2 sisanya (#6, #7) **bukan** kerjaan ui-engineer dan statusnya tidak berubah oleh keputusan ini.

**Urutan:** file ini → jalankan ulang `todo-verifikasi-v1.md` sampai bersih → baru lanjut `eksplorasi-tujuan-instruksi.md` (Sesi 7).

---

## Yang TIDAK berubah dari sebelumnya

**#6 — Tanggal linimasa belum terverifikasi.** Ini kerjaan verifikasi ke laman SNPMB (±30 menit), bukan kode. Lakukan paralel, bukan menunggu ui-engineer. Jangan pakai "tampilkan + warning" — itu melanggar aturan PRD §12 sendiri. Kalau sampai sesi ini selesai tanggalnya belum sempat dicek, tampilkan placeholder generik ("cek jadwal resmi di SNPMB"), bukan tanggal spesifik yang belum diverifikasi.

**#7 — 0 cerita alumni.** Bukan blocker. Rilis dengan kondisi kosong yang sudah dirancang (`salinan-teks-lanjut.md` §4.3). Pengumpulan cerita jalan paralel, tidak menahan rilis maupun tidak menahan pembangunan F10.

---

## Prompt untuk Claude Code

Lampirkan: `prd-sdd-lanjut.md`, `salinan-teks-lanjut.md`, dan laporan QA audit yang sudah ada.

```
Lampiran: prd-sdd-lanjut.md, salinan-teks-lanjut.md, laporan QA audit
terlampir (skor 3/13 lolos, 9 blocker P0). Perbaiki 7 blocker berikut —
JANGAN sentuh #6 (tanggal linimasa) dan #7 (cerita alumni), keduanya
sengaja ditahan karena bukan masalah kode.

1. PERSISTENSI CHECKLIST (app.js:565)
   Kode sekarang memaksa checkbox.checked = false setiap halaman
   dimuat — itu sebabnya kemajuan tidak pernah tersimpan. Hapus
   paksaan itu. Implementasikan localStorage nyata: simpan status
   centang per butir saat diklik, baca kembali saat halaman dimuat.
   Tes: centang 5 butir, tutup tab, buka lagi — harus tetap 5/11,
   bukan 0/11.

2. PILIH MAPEL — BANGUN SUNGGUHAN, BUKAN MOCKUP (pilih-mapel.html,
   prodi-mapel.json)
   5 tombol prodi sekarang tanpa event listener dan hasilnya hardcode
   ke Informatika. Bangun ulang sesuai kriteria F3 di prd-sdd-lanjut.md
   §6 dan alur yang sudah dirancang: cek profil pengguna dulu, kalau
   sudah ada prodi langsung ke hasil, kalau belum jalankan alur
   rumpun-minat → pilih prodi. Pakai prodi-mapel.json (117 baris) yang
   sudah ada sebagai sumber data sungguhan untuk status ketersediaan
   mapel — jangan diabaikan. Tombol "Ubah prodi" (pilih-mapel.html:131)
   diperbaiki di langkah ini juga, bukan terpisah — dia bagian dari
   alur yang sama.

3. TOMBOL YANG BERBOHONG — semua harus benar-benar berfungsi:
   - "Simpan ke Daftar Periksa" (di hasil Pilih Mapel) → menambah item
     ke localStorage checklist, kategori sesuai yang sudah disepakati
   - "Ubah prodi" → sudah masuk langkah 2
   - "Hubungkan kami" (layar kosong Alumni) → arahkan ke kontak yang
     sudah ada (form/email tim), bukan tombol mati
   - "Lihat jawaban" (Sesi Latihan) → benar-benar menampilkan jawaban
     kartu yang sedang dibuka
   Kalau ada tombol yang belum bisa difungsikan penuh saat ini,
   sembunyikan atau nonaktifkan dengan jelas — jangan biarkan
   terlihat aktif tapi diam saat diklik.

4. BUG ATRIBUSI SUMBER (app.js:471-484, app.js:518-527)
   Fungsi gantiIsi() menimpa baris "Sumber: ... diperiksa ..." saat
   kloning konten di Beranda dan Khusus SMK. Perbaiki logika clone-nya
   supaya baris sumber tetap ikut, bukan tertimpa/hilang.

5. TEKS KOSONG/SELESAI CHECKLIST TIDAK DIRENDER (checklist.html:50-55)
   Render teks sungguhan dari salinan-teks-lanjut.md §4.4 ("Belum ada
   yang dicentang..." dan "Bagian persiapannya beres...") — sekarang
   masih tertinggal sebagai komentar kode, tidak pernah tampil ke
   pengguna.

6. BERANDA TANPA EMPTY STATE (beranda.html)
   Tambahkan blok kondisi kosong/galat sesuai salinan-teks-lanjut.md
   §6, konsisten dengan pola yang sudah dipakai di halaman lain.

Setelah ketujuh langkah selesai, jangan nyatakan sendiri "sudah lolos"
— jalankan ulang todo-verifikasi-v1.md sebagai sesi terpisah untuk
verifikasi independen.
```

---

## Setelah ini lolos audit ulang

Lanjut ke `eksplorasi-tujuan-instruksi.md` Bagian 7 (Sesi 7) — F3 yang sudah solid di sini jadi fondasi yang dipakai F10, jadi tidak perlu bongkar ulang.
