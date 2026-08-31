# PRD + SDD — LANJUT v1

**Produk:** LANJUT (Layanan Navigasi Jalur Kuliah untuk Siswa SMK)
**Perusahaan:** EDILAKSO GROUP
**Status:** v1 — sumber kebenaran tunggal
**Tanggal:** 6 Agustus 2026

> **Aturan pakai dokumen ini.** Seluruh slide, kode, dan dokumen lain mengambil angka, nama fitur, dan definisi dari sini. Kalau ada perbedaan antara dokumen ini dan slide mana pun, **dokumen ini yang benar**. Setiap perubahan dicatat di Bagian 12.

---

# BAGIAN I — PRD (Product Requirements Document)

## 1. Pernyataan Masalah

Siswa SMK kelas 12 yang ingin melanjutkan ke perguruan tinggi menghadapi **asimetri informasi**, bukan kekurangan kemauan. Seluruh penjelasan tentang TKA, SNBP, dan SNBT disusun dengan asumsi pendaftar berasal dari SMA — mapel pendukung, jadwal, dan strategi yang disarankan tidak berlaku sama untuk siswa SMK.

**Siapa yang terdampak:** siswa SMK kelas 12 (utama) dan kelas 11 (sekunder) yang berencana kuliah. Di satu sekolah, perkiraan puluhan orang per angkatan — **angka pasti wajib diambil dari BK sebelum dokumen final.**

**Biaya bila tidak diselesaikan:** kerugiannya permanen dan tidak bisa diperbaiki. Salah memilih 2 mapel pilihan TKA, atau melewatkan tenggat pendaftaran, tidak bisa dibatalkan setelah tanggalnya lewat. Siswa kehilangan kesempatan bukan karena tidak mampu, tetapi karena tidak tahu aturannya.

**Dasar bukti saat ini:** pengalaman langsung anggota tim sebagai bagian dari segmen, percakapan dengan teman seangkatan, dan penelusuran informasi publik. **Statusnya masih dugaan.** Uji termurah: sebar halaman linimasa ke grup angkatan, ambang lolos ≥15 orang membalas dengan pertanyaan spesifik dalam 3 hari.

## 2. Tujuan

| # | Tujuan | Ukuran keberhasilan |
|---|---|---|
| T1 | Siswa SMK tahu apa yang jatuh tempo dan kapan | ≥80% pengguna baru membuka Linimasa di sesi pertama |
| T2 | Siswa mengambil keputusan belajar yang benar sebelum berlatih | ≥50% pengguna menyelesaikan Penolong Pilih Mapel |
| T3 | Produk terpakai berulang, bukan sekali baca | ≥30% pengguna kembali di hari ke-7 |
| T4 | Terbukti ada orang yang bersedia membayar | ≥1 pembayar nyata **atau** ≥1 surat minat mitra |
| T5 | Memenuhi syarat penilaian KIK | ≥50 pengguna nyata sebelum 23 Oktober |

Catatan: T4 sengaja ditulis rendah. Yang bernilai bagi penilai bukan besarnya pendapatan, melainkan bukti bahwa mekanismenya berjalan.

## 3. Bukan Tujuan (Non-Goals)

| Yang tidak dikerjakan | Alasan |
|---|---|
| Menjadi bimbel / menyediakan materi lengkap | Biaya konten tak terhingga; tim bukan guru mapel |
| Prediksi kelulusan atau skor SNBT | Tidak ada data untuk memvalidasi; salah prediksi merusak kepercayaan permanen |
| Melayani siswa SMA | Segmen itu sudah dilayani banyak pihak; melayaninya menghapus pembeda LANJUT |
| Media sosial / forum antar pengguna | Butuh moderasi yang tidak sanggup ditangani tim, dan risiko konten |
| Aplikasi native Android/iOS di v1 | Lihat Bagian 8 — memperlambat perolehan pengguna |
| Konten mitra dicampur ke halaman resmi | Menghapus posisi netral LANJUT, yang merupakan keunggulan utamanya |

## 4. Pengguna & Jobs-to-be-Done

**P1 — Siswa SMK kelas 12 yang sudah ingin kuliah (utama).**
> "Ketika saya sadar ingin kuliah tapi sekolah saya menyiapkan saya untuk bekerja, saya ingin tahu apa yang harus saya lakukan dan dalam urutan apa, supaya saya tidak kehilangan kesempatan hanya karena tidak tahu aturannya."

Ciri: waktu sangat terbatas (tugas, proyek, PKL, lomba). Waktu belajar realistis **15–25 menit/hari, tidak setiap hari**. Ini bukan halangan, ini **spesifikasi produk**.

**P2 — Siswa SMK kelas 11 (sekunder).**
> "Ketika saya mulai menimbang mau kerja atau kuliah, saya ingin tahu konsekuensi tiap pilihan sejak sekarang, supaya nanti tidak mengulang semuanya dari nol."

**P3 — Guru BK (bukan pengguna aplikasi, tetapi penentu penyebaran).**
> "Ketika siswa bertanya soal jalur kuliah, saya ingin merujuk ke satu sumber yang benar dan terkini, supaya saya tidak menjelaskan hal yang sama berulang kali."

**P4 — Mitra bimbel (pembayar, bukan pengguna harian).**
> "Ketika saya ingin menjangkau siswa SMK yang selama ini tidak tersentuh materi saya, saya ingin akses ke segmen itu dengan nama lembaga saya tercantum."

## 5. Cerita Pengguna

**Prioritas P0**

1. Sebagai siswa kelas 12, saya ingin melihat tenggat terdekat begitu membuka aplikasi, supaya saya tahu apa yang paling mendesak tanpa mencari.
2. Sebagai siswa kelas 12, saya ingin tahu ketentuan mana yang berbeda untuk anak SMK, supaya saya tidak mengikuti saran yang tidak berlaku untuk saya.
3. Sebagai siswa kelas 12, saya ingin dibantu memilih 2 mapel pilihan TKA berdasarkan prodi tujuan saya, supaya waktu latihan saya tidak terbuang ke materi yang tidak dihitung.
4. Sebagai siswa kelas 12, saya ingin membaca cerita alumni SMK yang tembus PTN, supaya saya percaya ini mungkin dan tahu langkah nyatanya.
5. Sebagai siswa kelas 12, saya ingin mencentang langkah persiapan satu per satu, supaya saya melihat kemajuan dan tidak merasa kewalahan.

**Prioritas P1**

6. Sebagai siswa kelas 12, saya ingin sesi latihan singkat yang bisa diselesaikan 15 menit, supaya tetap jalan di hari yang padat.
7. Sebagai siswa kelas 12, saya ingin kartu yang sering saya salah muncul lebih sering, supaya waktu saya terpakai pada kelemahan saya.
8. Sebagai siswa kelas 10–11, saya ingin menabung catatan dan soal sejak sekarang, supaya kelas 12 tidak mengulang dari nol.

**Keadaan tepi (wajib dirancang, sering dilupakan)**

9. Sebagai pengguna baru, saya ingin sesi pertama tetap berguna walau saya belum menambahkan apa pun.
10. Sebagai pengguna yang berhenti seminggu, saya ingin kembali tanpa merasa dihakimi.
11. Sebagai pengguna tanpa koneksi, saya ingin tetap melihat yang sudah pernah dibuka.

## 6. Kebutuhan Fungsional

### P0 — Wajib ada, tanpa ini produk tidak menyelesaikan masalah inti

**F1 — Linimasa**
Daftar tahapan TKA/SNBP/SNBT berurutan waktu, dengan penanda tenggat terdekat dan tanggal pembaruan sumber.
- [ ] Tenggat terdekat tampil paling atas, tanpa perlu gulir
- [ ] Setiap butir mencantumkan sumber resmi dan tanggal pengecekan
- [ ] Tahapan yang sudah lewat ditandai, tidak dihapus
- [ ] Hitungan mundur ditampilkan sebagai angka hari, **bukan** detik berdetak
- [ ] Tidak menampilkan tanggal apa pun yang belum diverifikasi dari laman resmi

**F2 — Khusus SMK**
Halaman berisi ketentuan yang berbeda penerapannya bagi siswa SMK.
- [ ] Minimal 5 butir terisi saat rilis
- [ ] Tiap butir berpasangan: "apa yang berbeda" + "apa yang bisa dilakukan"
- [ ] Tidak memuat kalimat yang menyalahkan sekolah

**F3 — Penolong Pilih Mapel** *(inti pembeda — lihat Bagian 7)*
Alat yang memetakan prodi tujuan → mapel pendukung → apakah tersedia di SMK.
- [ ] Pengguna memilih prodi (atau menjawab "belum tahu")
- [ ] Sistem menampilkan mapel pendukung dan status ketersediaannya di SMK
- [ ] Menampilkan saran 2 mapel pilihan TKA
- [ ] Menampilkan peringatan bila prodi menuntut mapel yang tidak diambil di SMK
- [ ] Wajib menampilkan: "Ini rangkuman, bukan keputusan resmi. Cek laman SNPMB."
- [ ] "Belum tahu prodi" tetap menghasilkan keluaran berguna

**F4 — Cerita Alumni SMK**
Kumpulan cerita alumni SMK yang diterima PTN.
- [ ] Minimal 3 cerita saat rilis
- [ ] Format seragam: asal SMK & jurusan, PTN & prodi, jalur, hambatan, yang dilakukan
- [ ] Ada izin tertulis dari narasumber sebelum tayang
- [ ] Layar kosong mengajak pengguna menghubungkan tim ke alumni

**F5 — Daftar Periksa**
Langkah persiapan yang bisa dicentang, kemajuan tersimpan.
- [ ] Kemajuan bertahan setelah aplikasi ditutup
- [ ] Butir tersaring berdasarkan kelas dan jalur yang dipilih
- [ ] Tidak ada penalti atau nada menghakimi saat kosong

### P1 — Meningkatkan produk, bukan syarat rilis

**F6 — Arsip Belajar** — kartu catatan/soal milik pengguna, privat, berpenanda "belum diverifikasi tim".
> **Keputusan wajib:** arsip harus **sudah berisi kartu kurasi tim** sebelum pengguna menambah apa pun. Rancangan "kerangka kosong yang diisi pengguna" akan tetap kosong.

**F7 — Latihan Hari Ini** — sesi kartu acak, target 15 menit, penghitung hari berturut-turut.
> **Ukuran keberhasilan bukan panjang beruntun**, melainkan jumlah kartu yang berpindah dari "sering salah" ke "dikuasai".

**F8 — Fitur berbayar** — mode bertimer, statistik per mapel, pengulangan berjarak, ekspor arsip.

**F9 — Bank Soal Mitra** — soal dari mitra, tab terpisah, identitas penyedia wajib tampil.

**F10 — Eksplorasi Tujuan** *(v1.1 — di luar lingkup rilis awal; bukan P0 maupun P1)* — lanjutan layar hasil F3: profil prodi berisi jenjang, jumlah peminat + rasio keketatan (dengan tahun & sumber), mata kuliah inti, prospek kerja, dan kampus rekomendasi yang wajib memuat PTN vokasi, tanpa angka gaji. Dibangun setelah v1 (F1–F9) lolos audit. Rinciannya di `eksplorasi-tujuan-instruksi.md` dan `SDD-F10-eksplorasi-tujuan.md`.

### P2 — Tidak dibangun, tetapi arsitektur harus menampungnya

- Notifikasi dorong
- Mode luring penuh
- Antarmuka mitra untuk mengunggah soal sendiri
- Perbandingan antar sekolah

## 7. Pembeda Utama

> **Kami tidak menjual lebih banyak soal. Kami menjual keputusan belajar yang benar — untuk siswa yang waktunya paling sedikit.**

Bank soal adalah komoditas; ratusan aplikasi punya. Yang tidak dimiliki siapa pun adalah **peta mapel SMK → prodi** (F3) dan **cerita alumni SMK** (F4). Keduanya adalah hasil kerja riset, bukan hasil koding — artinya bisa dikerjakan paralel dengan pembangunan aplikasi, dan tidak terganggu bila anggota tim berangkat PKL.

Dua siswa berlatih 30 menit sehari selama 3 bulan. Yang satu melatih topik yang keluar 8 soal, yang satu melatih topik yang keluar 1 soal. Jam belajarnya identik; hasilnya berbeda jauh. **Selisih itu ditentukan pada minggu pertama, bukan pada jam ke-100.**

## 8. Keputusan Teknologi

**Keputusan: web-first (PWA), mobile-first, satu basis kode.**

| Pertimbangan | Alasan |
|---|---|
| Perolehan pengguna | Tautan bisa dibuka langsung; APK menuntut pemasangan dari sumber tidak dikenal, dan sebagian besar siswa akan berhenti di situ |
| Kecepatan iterasi | Perbaikan langsung tayang, tidak perlu distribusi ulang |
| Nilai lintas mapel | Satu produk sekaligus memenuhi penilaian Pemrograman Web, Basis Data, dan UI/UX Mobile |
| Waktu tim | 4 minggu tidak cukup untuk membangun native sekaligus mengisi konten |

**Konsekuensi yang diterima:** notifikasi dorong terbatas, dan tidak ada ikon di Play Store. Keduanya dapat ditambahkan setelah ada pengguna. **Ditolak:** React Native dan Native Android untuk v1 — bukan karena lebih buruk, tetapi karena memperlambat hal yang paling menentukan penilaian, yaitu perolehan pengguna nyata.

## 9. Ukuran Keberhasilan

**Indikator awal (mingguan)**
- Jumlah pengguna unik
- % menyelesaikan onboarding
- % menyelesaikan Penolong Pilih Mapel
- Kembali di hari ke-7
- Jumlah cerita alumni terkumpul

**Indikator lambat (bulanan)**
- Kembali di hari ke-30
- Jumlah pembayar / surat minat mitra
- Jumlah rujukan dari BK atau guru

## 10. Risiko

| Risiko | Dampak | Penanganan |
|---|---|---|
| **Informasi seleksi keliru** | Fatal, merugikan pengguna dan tidak bisa diperbaiki setelah tenggat | Hanya sumber resmi; tanggal pengecekan tampil; penafian di F3 |
| **Konten alumni tidak terkumpul** | F4 kosong, klaim inti runtuh | Mulai kejar minggu ini via pesan tertulis; ambang minimum 3 cerita |
| **Arsip tetap kosong** | F6 mati, latihan harian tidak jalan | Kartu kurasi tim wajib ada lebih dulu |
| **Anggota tim berangkat PKL** | Tim tersebar, tempo turun | Pekerjaan riset (F3, F4) dirancang bisa jalan tersebar |
| **Tenggat 27 September lewat** | Nilai inti produk anjlok setelah masa pendaftaran | Rilis v1 paling lambat 3 September |

## 11. Pertanyaan Terbuka

| Pertanyaan | Penjawab | Menghambat? |
|---|---|---|
| Berapa pendaftar SNBP/SNBT angkatan sebelumnya? | BK | Ya — menentukan ukuran pasar di Business Plan |
| Tanggal resmi TKA/SNBP/SNBT 2026/2027 | Laman Kemendikdasmen & SNPMB | **Ya — memblokir F1** |
| Daftar mapel pendukung per prodi | Laman SNPMB | **Ya — memblokir F3** |
| Siapa alumni SMK yang tembus PTN, dan kontaknya | Wali kelas / BK / alumni | Ya — memblokir F4 |
| Tema sudah disetujui guru KIK? | Guru KIK | Ya |
| Nama domain final | Tim | Tidak |

---

# BAGIAN II — SDD (Software Design Document)

## 12. Arsitektur Sistem

```
┌─────────────────────────────────────────────┐
│  KLIEN — PWA (mobile-first)                 │
│  Halaman: Linimasa · Khusus SMK · Pilih     │
│  Mapel · Cerita Alumni · Daftar Periksa     │
│  Penyimpanan lokal: kemajuan daftar periksa │
└────────────────────┬────────────────────────┘
                     │ HTTPS
┌────────────────────▼────────────────────────┐
│  LAPISAN API                                │
│  Baca: konten · Tulis: kemajuan, cerita     │
└────────────────────┬────────────────────────┘
                     │
┌────────────────────▼────────────────────────┐
│  BASIS DATA                                 │
│  konten · kartu · pengguna · kemajuan       │
└─────────────────────────────────────────────┘
                     ▲
          ┌──────────┴──────────┐
          │  PANEL ADMIN TIM    │
          │  Isi konten & cerita│
          └─────────────────────┘
```

**Prinsip yang mengikat:** setiap potongan konten wajib punya kolom `sumber` (resmi/pengguna/mitra), `pemilik`, dan `diperiksa_pada` **sejak versi pertama**, meskipun v1 hanya memakai kelas "resmi". Menambahkannya belakangan berarti menulis ulang model data pada Oktober — persis saat tim menghadapi TKA.

## 13. Model Data

**Entitas inti**

| Entitas | Kolom penting |
|---|---|
| `pengguna` | id, kelas, prodi_tujuan (nullable), dibuat_pada |
| `tahapan_linimasa` | id, judul, tanggal_mulai, tanggal_selesai, jalur (TKA/SNBP/SNBT), url_sumber, diperiksa_pada |
| `butir_khusus_smk` | id, judul, apa_yang_beda, apa_yang_bisa_dilakukan, url_sumber, diperiksa_pada |
| `prodi` | id, nama, rumpun |
| `mapel` | id, nama, tersedia_di_smk (boolean) |
| `prodi_mapel` | prodi_id, mapel_id, bobot *(tabel penghubung — jantung F3)* |
| `cerita_alumni` | id, nama, asal_smk, jurusan_smk, ptn, prodi, jalur, hambatan, yang_dilakukan, izin_tayang, tayang |
| `butir_daftar_periksa` | id, judul, urutan, berlaku_untuk_kelas, berlaku_untuk_jalur |
| `kemajuan` | pengguna_id, butir_id, selesai_pada |
| `kartu` | id, pemilik_id, mapel_id, judul, isi, jawaban, **sumber**, dibuat_pada |
| `riwayat_latihan` | id, pengguna_id, kartu_id, benar (bool), dijawab_pada |

**Catatan relasi untuk deck Basis Data:**
- `prodi ↔ mapel` adalah **many-to-many**, karena satu prodi butuh beberapa mapel dan satu mapel mendukung banyak prodi. Ini contoh normalisasi paling bagus untuk dipresentasikan.
- `kartu.sumber` adalah kolom yang membedakan tiga kelas kepercayaan. Jelaskan ini di deck; penguji akan menghargai bahwa keputusannya diambil sebelum koding.
- `riwayat_latihan` menyimpan tiap jawaban, bukan hanya skor akhir — inilah yang memungkinkan pengulangan berjarak nanti (P1) tanpa mengubah skema.

## 14. Alur Pengguna Utama

**Alur A — Pengguna baru (target ≤3 menit sampai nilai pertama)**
```
Buka tautan → Onboarding 4 layar → Tanya kelas & prodi
→ Linimasa (tenggat terdekat langsung terlihat)  ← NILAI PERTAMA
→ Ajakan: "Cek mapel pilihanmu" → Penolong Pilih Mapel
```

**Alur B — Pengguna kembali (target ≤15 detik)**
```
Buka → Beranda: tenggat terdekat + 1 langkah berikutnya
→ Daftar Periksa atau Latihan Hari Ini
```

**Alur C — Tim mengisi konten**
```
Panel admin → Tambah tahapan/butir/cerita
→ Wajib isi url_sumber & diperiksa_pada → Tayang
```

## 15. Definisi Selesai (Definition of Done)

Sebuah fitur disebut selesai bila:
- [ ] Berjalan di layar 360px tanpa gulir horizontal
- [ ] Punya layar kosong yang ditulis, bukan halaman putih
- [ ] Punya keadaan galat yang ditulis
- [ ] Teksnya diambil dari `salinan-teks-lanjut.md`, bukan ditulis ulang di kode
- [ ] Data resmi mencantumkan sumber dan tanggal pengecekan
- [ ] Sudah dicoba oleh minimal 1 orang di luar tim

## 16. Catatan Perubahan

| Tanggal | Perubahan | Alasan |
|---|---|---|
| 6 Agu 2026 | Dokumen dibuat | — |
| 6 Agu 2026 | Tumpukan teknologi: PWA, bukan React Native | Perolehan pengguna lebih menentukan penilaian daripada keunggulan native |
| 6 Agu 2026 | F3 Penolong Pilih Mapel naik ke P0 | Ini pembeda inti; tanpa ini LANJUT hanya kumpulan informasi |
| 6 Agu 2026 | F6 Arsip wajib berisi kartu kurasi lebih dulu | Mencegah pola "kerangka kosong yang tidak pernah diisi" |
| 31 Agu 2026 | F10 Eksplorasi Tujuan masuk Bagian 6 sebagai lingkup **v1.1** (bukan syarat rilis awal), dan data prodi F3 disempitkan ke 18 prodi hasil riset (Opsi A) | Hasil F3 dijamin bisa dilanjutkan ke profil prodi yang lengkap, bukan berujung layar "belum tersedia". Rinciannya di `eksplorasi-tujuan-instruksi.md` dan `SDD-F10-eksplorasi-tujuan.md` |
