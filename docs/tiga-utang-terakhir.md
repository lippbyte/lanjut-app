# Tiga Utang Terakhir — Sebelum Benar-Benar Optimal

**Konteks:** semua fitur (F1-F9, F10, Level-In) sudah lolos audit internal + independen (Antigravity). Tiga item ini yang bikin statusnya belum bisa disebut tuntas — satu ketahuan barusan (lencana), satu belum dikonfirmasi (F7 queue), satu dari jauh sebelumnya dan sepertinya kelupaan (link landing page).

**Prioritas:** #3 (landing page) paling kritis meski kelihatannya paling sepele — itu titik sentuh PERTAMA pengguna, sebelum mereka sempat pakai aplikasi sama sekali. Bug di dalam aplikasi cuma dilihat orang yang sudah masuk; link yang salah bikin orang nggak pernah sampai masuk.

---

## Prompt untuk agent

```
Kerjakan tiga perbaikan berikut. Untuk tiap item, laporkan status
✅/❌ dengan bukti — jangan klaim selesai tanpa verifikasi manual.

=== 1. TEKS LENCANA KARTU BUATAN PENGGUNA (cepat, ~5 menit) ===
Di app/assets/app.js, lencana kartu arsip buatan pengguna saat ini
bertuliskan "Buatan sendiri". Ganti jadi persis:
"Diunggah pengguna — belum diverifikasi tim"
(sesuai salinan-teks-lanjut.md §4.5, DoD PRD §15 — teks wajib dari
dokumen, bukan ditulis ulang bebas di kode). Cek juga CSS lencana:
teks baru jauh lebih panjang, pastikan tidak terpotong/overflow di
360px dan 320px.

=== 2. LATIHAN HARIAN "Kartu 1 dari 12" (investigasi dulu, baru fix) ===
Cek app/assets/app.js: apakah mekanisme lanjut-ke-kartu-berikutnya
dalam satu sesi latihan (ambil kartu ke-2 dari pool, naikkan counter,
ulang sampai pool habis) BENAR-BENAR ada di kode, atau memang belum
pernah dibangun sama sekali?

Laporkan salah satu dari dua kemungkinan ini secara eksplisit:

  KEMUNGKINAN A — mekanismenya ada tapi ada bug (mis. filter pool
  salah, off-by-one, kartu ke-2 gagal dimuat karena kondisi keliru):
  -> perbaiki bug-nya, lalu verifikasi manual: mulai sesi, jawab kartu
  1, pastikan benar-benar lanjut ke kartu 2 dari total yang dijanjikan
  di angka "X dari Y", sampai sesi habis dengan wajar.

  KEMUNGKINAN B — mekanisme multi-kartu memang belum pernah dibangun,
  hanya UI indikatornya ("Kartu X dari Y") yang sudah ada duluan:
  -> JANGAN coba bangun mekanisme penuh sekarang, ini bukan waktu yang
  tepat untuk fitur baru menjelang rilis. Sebagai gantinya, ubah teks
  jadi tidak menjanjikan angka yang tidak ditepati — hilangkan "dari
  12", ganti dengan sesuatu yang jujur sesuai kondisi sungguhan (mis.
  hanya "Kartu latihan" tanpa hitungan, atau sesuai kartu yang memang
  tersedia). Catat status ini SECARA EKSPLISIT sebagai item backlog
  v1.1 di docs/prd-sdd-lanjut.md Bagian 16 (Catatan Perubahan) — supaya
  tidak hilang lagi seperti sebelumnya (ini sudah dua kali lolos dari
  daftar perbaikan tanpa tercatat resmi di mana pun).

Laporkan yang mana dari A/B yang sebenarnya terjadi — jangan langsung
lompat ke solusi tanpa melaporkan temuannya dulu.

=== 3. LINK LANDING PAGE (paling kritis, cek dulu sebelum ubah) ===
Di folder landing-page/ (bukan app/), cari semua rujukan yang salah:
- Tautan yang mengarah ke "/linimasa" — seharusnya ke path aplikasi
  yang benar sesuai keputusan hosting (edilakso.my.id/lanjut/, cek
  struktur folder deploy sungguhan yang dipakai, jangan asumsi)
- Rujukan ke domain "lanjut.app" — seharusnya edilakso.my.id
Ganti semua kemunculan, lalu KLIK BENERAN dari landing page yang
sudah di-deploy (bukan cuma baca kode) untuk pastikan tombol/link
"Mulai Sekarang" atau sejenisnya benar-benar mendarat di halaman
aplikasi yang hidup, bukan 404 atau halaman kosong.

Setelah tiga ini selesai, jalankan node tools/validasi.js untuk
pastikan tidak ada regresi di gerbang validasi yang sudah ada.
```

---

## Setelah ketiganya lolos

Tidak ada lagi item yang diketahui menggantung — v1 + F10 + Level-In genuinely siap dianggap tuntas, termasuk pintu masuk dari landing page.
