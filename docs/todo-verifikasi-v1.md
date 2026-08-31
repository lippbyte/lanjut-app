# Todo List Verifikasi v1 — untuk Agent PM

**Tujuan:** memastikan 13 layar v1 (F1–F9, P0 + P1) benar-benar berhasil diimplementasikan sesuai keputusan yang sudah dikunci — bukan cuma "ada filenya", tapi memenuhi kriteria penerimaan tiap fitur.
**Cara pakai:** tempel seluruh isi file ini sebagai satu prompt ke sesi Claude Code yang **punya akses ke folder kode hasil build** (setelah Sesi 1–6 di `lanjut-prototype-prompts.md` selesai dijalankan). Lampirkan juga `prd-sdd-lanjut.md`. Agent akan menjawab tiap butir dengan status, bukan cuma membaca daftar ini.
**Bukan cakupan file ini:** F10 Eksplorasi Tujuan (v1.1, belum dibangun saat ini) — audit itu ada di langkah terakhir `eksplorasi-tujuan-instruksi.md` sendiri, setelah v1 lolos di sini.

---

## Instruksi untuk agent

```
Kamu bertindak sebagai PM yang mengaudit hasil build. Kamu punya akses
ke folder kode. Untuk SETIAP butir bertanda [ ] di bawah, periksa kode
sungguhan (bukan menebak dari nama file), lalu jawab dengan salah satu:

✅ SELESAI — kriteria terpenuhi, sebutkan file/baris singkat sebagai bukti
⚠️ SEBAGIAN — ada tapi tidak lengkap, jelaskan spesifik apa yang kurang
❌ BELUM — tidak ditemukan sama sekali di kode

Di akhir, susun satu tabel ringkasan (Layar | Status | Catatan), lalu
daftar terpisah "Yang menghambat rilis" — urutkan dari yang paling
kritis (menyangkut kriteria wajib F1-F5) ke yang paling ringan (P1).
Jangan menandai SELESAI kalau kamu tidak benar-benar membuka dan
membaca kodenya.
```

---

## A. P0 — Wajib ada sebelum rilis (F1–F5)

### Splash
- [ ] Tampil sebentar lalu redirect otomatis ke onboarding (pengguna baru) atau beranda (pengguna kembali)

### Onboarding
- [ ] 4 layar + 1 layar pertanyaan, teksnya diambil persis dari `salinan-teks-lanjut.md` §3 (bukan ditulis ulang)
- [ ] Dua jawaban (kelas, prodi impian) disimpan ke localStorage sebagai "profil pengguna"
- [ ] Profil pengguna ini benar-benar terbaca ulang oleh `pilih-mapel.html` (bukan cuma tersimpan lalu tidak dipakai)

### Beranda (F1 — Linimasa)
- [ ] Tenggat terdekat tampil paling atas tanpa perlu gulir
- [ ] Setiap tahapan mencantumkan baris "Sumber: ... · diperiksa [tanggal]"
- [ ] Hitungan mundur berupa angka hari statis — **bukan** detik yang berdetak
- [ ] Tahapan yang sudah lewat tetap tampil, ditandai beda, tidak dihapus
- [ ] Ada layar kosong dan keadaan galat, teksnya dari `salinan-teks-lanjut.md` §6
- [ ] Ada kartu/bagian yang mengarah ke `alumni.html`
- [ ] Nav bawah tampil dengan 4 ikon: Beranda, Khusus SMK, Pilih Mapel, Checklist (Alumni **tidak** ada ikon sendiri)

### Khusus SMK (F2)
- [ ] Minimal 5 butir terisi
- [ ] Tiap butir berpasangan "apa yang beda" + "apa yang bisa dilakukan" — cek ini benar-benar dua bagian terpisah, bukan satu paragraf gabungan
- [ ] Tidak ada kalimat yang bisa dibaca sebagai menyalahkan sekolah

### Pilih Mapel (F3 — cek paling teliti, ini fitur pembeda utama)
- [ ] Kalau profil pengguna sudah punya prodi_impian: langsung ke hasil, dengan tombol "Ubah prodi" yang benar-benar berfungsi
- [ ] Kalau profil belum ada prodi: alur "belum tahu" berjalan sampai tuntas ke daftar prodi — **bukan jalan buntu**
- [ ] Status ketersediaan tiap mapel pendukung di SMK ditampilkan (bukan cuma daftar nama mapel polos)
- [ ] Saran 2 mapel pilihan TKA muncul
- [ ] Disclaimer "Ini rangkuman, bukan keputusan resmi. Cek laman SNPMB." tampil di **setiap** hasil, coba beberapa prodi berbeda untuk pastikan tidak hilang di salah satu jalur
- [ ] Tombol "Simpan ke Daftar Periksa" benar-benar menambahkan item yang muncul di `checklist.html`

### Alumni (F4)
- [ ] Kondisi kosong adalah kondisi utama, teksnya dari `salinan-teks-lanjut.md` §4.3, terasa sebagai kondisi normal bukan kondisi gagal
- [ ] 1-2 cerita contoh tampil dengan label "CONTOH — belum diverifikasi", jelas berbeda dari kondisi kosong asli
- [ ] Halaman diakses lewat kartu di Beranda, ada tombol kembali di header, **tidak** ada di ikon nav bawah

### Daftar Periksa (F5)
- [ ] Progres "X dari Y beres" tampil dan angkanya benar (cocok dengan jumlah butir yang sudah dicentang)
- [ ] Kemajuan bertahan setelah aplikasi ditutup dan dibuka lagi (tes: centang satu, tutup tab, buka lagi, cek masih tercentang)
- [ ] Butir terkelompok per kategori, salah satunya "Jalur Pembiayaan" (KIP Kuliah, beasiswa, keringanan UKT)
- [ ] Butir yang datang dari "Simpan" di Pilih Mapel benar-benar muncul di sini
- [ ] Tidak ada nada menghakimi di kondisi kosong maupun kondisi semua selesai — teks dari `salinan-teks-lanjut.md` §4.4

## B. P1 — Meningkatkan produk, bukan syarat rilis (F6–F9)

### Arsip Belajar
- [ ] Kategori "Mapel Wajib TKA" dan "Mapel Pilihan" tampil sesuai struktur wireframe asli
- [ ] **Sudah berisi kartu kurasi tim sejak awal** — cek `data/arsip.json` bukan array kosong (ini keputusan wajib di PRD §16, bukan opsional)
- [ ] Jumlah kartu per mapel yang ditampilkan cocok dengan isi data sebenarnya (bukan angka statis di UI yang tidak sinkron dengan data)

### Detail Mapel
- [ ] Tab Semua/Catatan/Soal berfungsi, bukan cuma tampilan
- [ ] Kartu kurasi tim dan kartu buatan pengguna sendiri bisa dibedakan lewat penanda visual

### Tambah Kartu Baru
- [ ] Kartu yang ditambahkan lewat form ini benar-benar muncul di halaman Detail Mapel setelahnya (tes langsung, jangan asumsi)
- [ ] Validasi form dasar berjalan (tidak bisa simpan kartu kosong)

### Sesi Latihan Harian
- [ ] Indikator posisi "Kartu X dari Y" tampil dan berubah seiring sesi berjalan

### Latihan Selesai
- [ ] Ringkasan (jumlah dikerjakan, rincian per mapel) menampilkan data dari sesi yang baru saja selesai — bukan angka contoh yang di-hardcode

### Bank Soal Mitra
- [ ] Lencana "Disediakan oleh [mitra]" tampil di tiap kartu yang punya data mitra
- [ ] Kondisi kosong ("Belum ada mitra yang bergabung...") tampil dengan benar kalau belum ada data mitra

## C. Lintas-halaman (Definisi Selesai §15 — cek di SEMUA 13 layar, bukan sampel)

- [ ] Berjalan di lebar 360px tanpa gulir horizontal — cek satu per satu, jangan cuma cek 2-3 layar lalu diasumsikan sama untuk sisanya
- [ ] Setiap layar yang mungkin kosong (belum ada data) punya teks yang ditulis, bukan halaman putih kosong
- [ ] Setiap layar yang mungkin gagal (galat jaringan/data) punya teks yang ditulis
- [ ] Semua teks yang tampil ke pengguna diambil dari `salinan-teks-lanjut.md` — tandai kalau ada teks yang ditulis ulang/diparafrase di kode dan berbeda dari dokumen sumber
- [ ] Semua data resmi (Beranda, Khusus SMK) mencantumkan sumber dan tanggal pengecekan — bukan cuma di sebagian data contoh
- [ ] Sistem token desain (`assets/tokens.css`) dipakai konsisten di 13 file — cek tidak ada warna/radius/font yang di-hardcode beda sendiri di salah satu halaman
- [ ] Header (logo, wordmark, avatar) dan nav bawah (4 ikon) konsisten strukturnya di semua halaman yang seharusnya menampilkannya

## D. Rangkuman akhir yang harus dihasilkan agent

1. Tabel status semua butir di atas (✅/⚠️/❌)
2. Daftar "Yang menghambat rilis" — urutkan dari kriteria P0 yang gagal dulu
3. Satu kalimat rekomendasi: **layak dites ke pengguna nyata sekarang, atau masih ada yang wajib diperbaiki dulu?**
