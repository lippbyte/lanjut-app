# Instruksi PM — Koordinasi v1.1 (F10 Eksplorasi Tujuan + Level-In)

**Peran dokumen ini:** yang dipegang PM (atau agent yang berperan sebagai PM) untuk menjalankan dan memverifikasi DUA pekerjaan paralel ini sampai siap jadi rilis v1.1. Bukan instruksi teknis — dua file itu sudah ada terpisah (lihat tabel di bawah).

---

## 1. Dua Alur Kerja Paralel

| | F10 — Eksplorasi Tujuan | Level-In |
|---|---|---|
| **Instruksi teknis** | `eksplorasi-tujuan-instruksi.md` §7 (Sesi 7) | `instruksi-levelin-js.md` |
| **File yang disentuh** | `pilih-mapel.html` (tambah CTA), `data/prodi.json` (diselaraskan), `data/profil-prodi.json` (baru), `eksplorasi-tujuan.html` (baru), `checklist.html` (kategori baru "Riset Kampus") | `assets/levelin.js` (baru), `beranda.html`, `latihan.html`, `latihan-selesai.html` (tambah script tag + tidak ada lagi selain itu) |
| **Bergantung pada** | F3 Pilih Mapel v1 sudah solid (sudah, lolos audit `todo-verifikasi-v1.md`) | Markup + CSS Level-In yang sudah ada (sudah, dikonfirmasi lengkap) |
| **Bergantung pada satu sama lain?** | **Tidak.** Prodi/mapel data terpisah total dari logika kalibrasi. | **Tidak.** |

**Konfirmasi tidak ada file bentrok** (sudah dicek): F10 tidak menyentuh `beranda.html`, `latihan.html`, `latihan-selesai.html`, atau `assets/levelin.js`. Level-In tidak menyentuh `pilih-mapel.html`, `data/prodi.json`, atau file `checklist.html` di luar penambahan kategori (dan bahkan itu pun F10 saja yang mengerjakannya). **Aman dijalankan sebagai dua sesi Claude Code terpisah, bersamaan, tanpa koordinasi commit khusus.**

---

## 2. Instruksi untuk PM (langkah demi langkah)

```
1. Jalankan dua sesi Claude Code SECARA TERPISAH (bukan satu sesi
   mengerjakan dua hal):
   - Sesi A: tempel isi eksplorasi-tujuan-instruksi.md §7
   - Sesi B: tempel isi instruksi-levelin-js.md
   Kedua sesi boleh berjalan hari yang sama, tidak perlu menunggu satu
   selesai dulu.

2. JANGAN percaya klaim "selesai" dari sesi yang sama yang mengerjakan
   pembangunan. Setelah masing-masing sesi commit, jalankan verifikasi
   independen (Bagian 3 di bawah) di sesi baru yang HANYA punya tugas
   memeriksa, bukan memperbaiki.

3. Kalau salah satu sesi selesai lebih dulu, verifikasi sesi itu duluan
   — tidak perlu menunggu keduanya baru mulai cek.

4. Kalau ada laporan bug dari salah satu stream, JANGAN suruh sesi itu
   memperbaiki sekaligus melanjutkan fitur lain di luar cakupannya
   (F10 tidak boleh menyentuh Level-In punya, dan sebaliknya) — ini
   prinsip yang sama dengan kenapa dua stream ini dipisah dari awal.
```

---

## 3. Verifikasi Independen — Sebelum Digabung Jadi v1.1

Tempel ke sesi Claude Code baru yang punya akses ke kode, terpisah dari sesi yang membangun.

```
Verifikasi dua fitur berikut. Untuk SETIAP butir, jawab ✅/⚠️/❌ dengan
bukti file/baris — jangan menandai selesai tanpa membuka kodenya.

=== F10 EKSPLORASI TUJUAN ===
- [ ] CTA "Lihat prospek & kampus" di hasil Pilih Mapel benar-benar
      mengarah ke eksplorasi-tujuan.html dengan prodi terbawa otomatis
      (bukan halaman kosong/statis)
- [ ] Layar Profil Prodi menampilkan: badge jenjang, dua metrik
      (peminat + rasio keketatan), 4-6 mata kuliah, 3-4 peran kerja,
      3-5 kampus terdiversifikasi (bukan cuma satu jenis)
- [ ] TIDAK ADA angka gaji ditampilkan di mana pun pada layar ini
- [ ] Kondisi fallback (prodi belum ada profil) benar-benar tampil,
      bukan halaman rusak — coba akses prodi di luar 18 yang diriset
- [ ] "Simpan ke Daftar Periksa" menambah item ke checklist.html
      dengan kategori "Riset Kampus"
- [ ] prodi.json di pilih-mapel.html sudah diselaraskan jadi subset
      18 prodi (Opsi A) — cek tidak ada hasil Pilih Mapel yang berakhir
      di fallback F10

=== LEVEL-IN ===
- [ ] Chip keyakinan 1-5 di latihan.html mengubah state saat diklik
- [ ] Tombol "Lihat jawaban" tertahan sampai keyakinan dipilih (coba
      klik sebelum pilih keyakinan — harus tidak bisa)
- [ ] localStorage['lanjut.levelin.v1'] benar-benar terisi setelah
      menjawab kartu, bertahan setelah reload
- [ ] Kartu CTA "Latihan Hari Ini" di Beranda menampilkan salah satu
      dari 5 varian sesuai kondisi data (coba dengan data kosong DAN
      data terisi, hasilnya harus beda)
- [ ] Hitung tap manual satu kartu: harus 3 tap (keyakinan → lihat
      jawaban → benar/salah), bukan 4
- [ ] arsip.html TIDAK menampilkan badge status kalibrasi apa pun
      (ini sengaja dilewati, bukan bug — pastikan memang tidak ada)

=== REGRESI — WAJIB DICEK KEDUANYA ===
- [ ] Nav bawah masih tepat 4 ikon di SEMUA halaman (F10 dan Level-In
      sama-sama dilarang menambah ikon ke-5)
- [ ] File P0 v1 (splash, onboarding, khusus-smk, alumni, checklist
      inti) tidak berubah styling/struktur — buka satu per satu,
      bandingkan dengan sebelum sesi F10/Level-In dimulai
- [ ] Kalau assets/levelin.js gagal dimuat (simulasikan dengan
      mematikan sementara), beranda.html tetap tampil normal dengan
      isi cadangan statis — F1 tidak boleh ikut rusak

Di akhir, satu kalimat rekomendasi: keduanya layak digabung jadi rilis
v1.1 sekarang, atau ada yang masih menghambat?
```

---

## 4. Setelah Lolos

Gabungkan sebagai satu rilis **v1.1** (bukan dua rilis terpisah) — supaya user testing berikutnya dapat dua fitur sekaligus, bukan dua kali update berdekatan yang bikin bingung. Update landing page/README rilis untuk menyebut kedua fitur baru ini.
