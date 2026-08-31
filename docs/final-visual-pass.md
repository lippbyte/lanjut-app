# Final Visual Pass — Sebelum Rilis

**Konteks:** semua fungsional sudah lolos audit (internal + Antigravity). Sistem token, kontras, dan konsistensi 320-375px sudah terverifikasi solid. Pass ini fokus ke hal yang belum pernah dicek eksplisit — bukan mengulang yang sudah lolos.

Dibagi 3 bagian: (A) bisa langsung dikerjakan ui-engineer, (B) butuh mata manusia — nggak bisa diklaim selesai dari laporan kode doang, (C) keputusan konten, bukan kode.

---

## A. Bisa langsung dikerjakan — prompt untuk ui-engineer

```
Kerjakan lima hal berikut, laporkan tiap satu dengan bukti (file/
screenshot), bukan klaim tanpa verifikasi:

1. IKON PWA — set lengkap, bukan satu file didaur ulang
   manifest.webmanifest saat ini cuma punya 1 entri icon (1048x1048,
   purpose "any"), dipakai ulang juga untuk favicon dan
   apple-touch-icon. Buat set yang benar:
   - 192x192 dan 512x512, purpose "any" (dari mascot-tile-primary.png,
     resize — jangan re-desain dari nol)
   - Minimal 1 varian purpose "maskable": mascot diberi padding aman
     ~20% dari tiap sisi (safe zone), supaya tidak terpotong aneh di
     launcher Android yang pakai adaptive icon shape
   - favicon.ico terpisah 32x32/16x16 untuk tab browser (PNG 1048px
     yang di-downscale otomatis oleh browser suka buram di tab kecil)
   Update <link rel="icon">, <link rel="apple-touch-icon">, dan array
   "icons" di manifest.webmanifest sesuai set baru ini.

2. STATE :active PADA ELEMEN INTERAKTIF
   Cek .tombol-utama, .tombol-garis, .kartu yang bisa diklik/ditekan
   (termasuk chip keyakinan Level-In, tab arsip-detail.html): apakah
   ada umpan balik visual saat DITEKAN (bukan cuma :hover, karena ini
   mobile-first — :hover nggak kepakai di touchscreen)? Kalau tidak
   ada, tambahkan state :active sederhana (mis. sedikit turun skala/
   opacity) konsisten di semua komponen sejenis, pakai token yang
   sudah ada, jangan bikin efek baru yang tidak konsisten satu sama
   lain.

3. TEKS PANJANG / OVERFLOW DI DATA VARIABEL
   F10 (eksplorasi-tujuan.html) punya field panjang-variabel (nama
   kampus, daftar mata kuliah, daftar profesi — beberapa prodi cuma
   1 kampus, beberapa lebih). Uji dengan prodi yang datanya PALING
   PANJANG (cek profil-prodi.json, cari array kampus/mata_kuliah
   terpanjang) di layar 320px — pastikan teks wrap dengan wajar, tidak
   terpotong atau bikin layout pecah.

4. LOADING STATE ANTAR HALAMAN
   Karena tiap halaman fetch() data/*.json sendiri-sendiri, cek apakah
   ada jeda kelihatan "kosong sesaat" sebelum data terisi (flash of
   empty content) terutama di koneksi lambat (throttle ke "Slow 3G" di
   DevTools buat tes). Kalau ada jeda yang mengganggu, tambahkan
   keadaan pemuatan sederhana (skeleton/placeholder ringan) — tidak
   perlu rumit, cukup tidak membingungkan.

5. AUDIT PEMAKAIAN MASKOT
   Prinsip desain yang sudah dikunci: "mascot TIDAK di tiap tombol."
   Karena banyak sesi berbeda menyentuh kode ini, grep semua pemakaian
   mascot-*.png di seluruh app/*.html, laporkan di halaman mana saja
   dipakai — pastikan masih sesuai prinsip (dipakai sedikit dan
   bermakna, mis. splash/onboarding/empty state alumni), bukan
   menyebar tanpa sadar ke tempat yang tidak perlu.
```

---

## B. Butuh mata manusia — jangan diklaim selesai dari laporan kode

Ini nggak bisa diverifikasi dari deskripsi kode, harus benar-benar dilihat:

- [ ] **Device fisik nyata** (bukan cuma DevTools emulation) — minimal satu Android budget dan satu iOS kalau ada aksesnya. Preseden: bug scroll inspect-mode kemarin cuma ketahuan pas dicek manual, bukan dari static check.
- [ ] **Safari iOS khusus** — `env(safe-area-inset-bottom)` sudah dipakai di `.app` padding, itu tanda sudah sadar soal notch/home-indicator, tapi belum ada konfirmasi ini pernah dicoba di Safari sungguhan (beda rendering engine dari Chrome).
- [ ] **Rasa keseluruhan** — buka dari awal (splash sampai selesai satu sesi latihan) di HP sungguhan, dengan mata orang yang belum pernah lihat sebelumnya kalau bisa (bukan tim sendiri yang sudah terlalu familiar).

---

## C. Ini keputusan konten, bukan polish kode — landing page

Sekarang landing page pindah ke `/tentang`, perannya berubah dari "pintu utama buat siswa" jadi "info company buat sekolah/BK/mitra." Desainnya saat ini kemungkinan masih dibuat untuk peran LAMA (funnel siswa langsung ke app). Worth dipikirkan terpisah: apakah kontennya juga perlu disesuaikan ke audiens baru, atau tetap seperti sekarang dulu untuk versi ini? Ini bukan sesuatu yang perlu diputuskan sebelum rilis — bisa v1.1.
