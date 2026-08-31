# PRD — Level-In (Confidence Gap Tracker)

**Produk:** LANJUT — fitur tambahan di atas Arsip Belajar
**Prioritas:** P1 (setelah v1 rilis 3 September 2026)
**Status:** Final — siap masuk tahap SDD
**Sumber brainstorm:** `.claude/BRAINSTORM_Level-In_CGT.md` (termasuk §9 "Keputusan yang
sudah diambil" dan §10 "Pertanyaan terbuka (masih perlu divalidasi dengan data nyata)")

> **Aturan pakai dokumen ini.** PRD ini adalah **lampiran P1** dari
> `docs/prd-sdd-lanjut.md` (v1, sumber kebenaran tunggal). Kalau ada bagian
> di sini yang tampak bertentangan dengan cakupan P0 (F1–F5) atau dengan
> Keputusan Teknologi §8 di dokumen itu, **dokumen itu yang menang**, dan
> bagian ini harus direvisi — bukan sebaliknya. Level-In **tidak boleh**
> menunda atau mengubah rilis v1 (paling lambat 3 September 2026).

> **Catatan tentang dokumen rujukan brainstorm — sudah selesai.** Draf
> sebelumnya menandai dua berkas rujukan sebagai "tidak ditemukan". Keduanya
> **sudah ada di repo** dan sudah diintegrasikan ke PRD ini:
> - `docs/design.md` — identitas visual resmi LANJUT: maskot **kelinci
>   wisudawan** (topi toga + ikon jam kecil), wordmark "Lanjut" dengan huruf
>   **L** beraksen, dan palet **biru tiga-tingkat** (biru muda/sedang/tua).
>   Dokumen itu sendiri menyatakan **kode HEX presisi belum dikunci** (lihat
>   §6 "Yang belum diputuskan" di `design.md`) — ini status resmi dokumen
>   desain, bukan kekurangan PRD ini. Sampai HEX final diselaraskan, token
>   kerja yang dipakai untuk implementasi tetap `app/assets/tokens.css`
>   (`--blue-200:#B4E1EB`, `--blue-300:#95BDD7`, `--blue-400:#78A4CB`,
>   `--font-core:"Poppins"`).
> - `docs/rancangan-arsip-latihan-banksoal.md` — struktur data kartu (kolom
>   `sumber`: resmi/pengguna/mitra, dan kolom `pemilik`) dan pembagian fitur
>   Latihan Harian gratis vs berbayar. Dipakai sebagai dasar §4–§7 di bawah.

---

## 1. Ringkasan Masalah

LANJUT tidak bisa dan tidak perlu bersaing di jumlah bank soal: tim tidak
punya kapasitas produksi konten sebesar aplikasi belajar besar, AI chatbot,
atau buku fisik, dan data resmi Kemendikdasmen/SNPMB sulit diakses selain
untuk keperluan administratif. Diferensiator LANJUT yang sudah ada (Penolong
Pilih Mapel, Cerita Alumni) adalah fitur navigasi/keputusan, bukan fitur
konten — dari sudut pandang siswa kelas 12 yang skeptis, itu masih terasa
tipis dibanding janji "banyak soal" dari kompetitor.

Dibutuhkan satu mekanisme yang membuat LANJUT unggul **tanpa** harus menang
jumlah konten. **Level-In** menjawab ini dengan memindahkan nilai jual dari
"berapa banyak soal yang tersedia" menjadi **seberapa akurat pengguna menilai
kemampuannya sendiri** (kalibrasi diri) — sesuatu yang tidak diberikan
aplikasi belajar lain (hanya menilai benar/salah), AI chatbot (tidak melacak
riwayat), maupun buku fisik (tidak ada pelacakan sama sekali).

## 2. Tujuan & Target Pengguna

### 2.1 Tujuan

| # | Tujuan | Ukuran keberhasilan (indikatif — sinkronkan dengan §9 `prd-sdd-lanjut.md`) |
|---|---|---|
| G1 | Pengguna mendapat sinyal akurat tentang kalibrasi dirinya (yakin vs hasil aktual) per mata pelajaran | Setiap kartu latihan yang dikerjakan menghasilkan satu titik data gap yang tersimpan |
| G2 | Gap kalibrasi dipakai sebagai dasar saran belajar harian yang personal di Beranda | Beranda menampilkan mapel bersaran yang berubah mengikuti pola gap pengguna, bukan statis |
| G3 | Level-In tidak menambah beban waktu di luar pola pakai existing | Menambahkan langkah menilai keyakinan tidak membuat sesi latihan melewati 15–25 menit |
| G4 | Cakupan P0 v1 (rilis 3 September) tidak tersentuh | Nol perubahan pada F1–F5 dan nav 4 ikon yang sudah dikunci |

### 2.2 Target Pengguna

Siswa SMK kelas 12 (P1 pada `docs/prd-sdd-lanjut.md` §4) yang **sudah mulai
memakai Arsip Belajar/Linimasa** — khususnya yang merasa aplikasi belajar
lain terlalu banyak konten sampai bingung mau mulai dari mana. Waktu belajar
realistis kelompok ini tetap **15–25 menit/hari, tidak setiap hari** — ini
bukan halangan, tapi spesifikasi produk (diwarisi dari P1 di dokumen induk).

## 3. User Stories / Skenario Penggunaan

**Alur inti**

1. Sebagai siswa kelas 12, sebelum jawaban sebuah kartu latihan ditampilkan,
   saya ingin menilai seberapa yakin saya bisa menjawabnya, supaya saya sadar
   apakah rasa percaya diri saya cocok dengan kemampuan nyata.
2. Sebagai siswa kelas 12, setelah menandai jawaban saya benar/salah, saya
   ingin melihat bagaimana keyakinan saya dibandingkan dengan hasil
   sebenarnya, supaya saya tahu apakah saya *overconfident* atau
   *underconfident* pada topik itu.
3. Sebagai siswa kelas 12, saya ingin tahu mata pelajaran mana yang paling
   sering "yakin tapi meleset", supaya prioritas belajar saya tidak
   berdasarkan tebakan sendiri.
4. Sebagai siswa kelas 12, saya ingin Beranda menyarankan satu mata pelajaran
   untuk dilatih hari ini berdasarkan gap kalibrasi terbesar saya, supaya
   saya tidak bingung mulai dari mana dalam waktu terbatas yang saya punya.

**Keadaan tepi (wajib dirancang)**

5. Sebagai pengguna baru yang belum punya riwayat kalibrasi, saya ingin
   tetap mendapat sesi latihan yang berguna, supaya fitur ini tidak menjadi
   jalan buntu di sesi pertama.
6. Sebagai pengguna yang berhenti berminggu-minggu, saya ingin kembali tanpa
   merasa dihakimi oleh riwayat gap lama saya.
7. Sebagai siswa kelas 12, saya ingin proses menilai keyakinan tidak
   menambah beban langkah yang berarti pada sesi latihan saya, supaya sesi
   tetap muat dalam 15–25 menit.
8. Sebagai pemilik kartu Arsip Belajar pribadi (kartu kelas kepercayaan
   "pengguna", belum diverifikasi tim), saya ingin Level-In tetap berjalan
   di kartu saya tanpa kartu itu jadi diverifikasi atau terlihat publik.

## 4. Fitur Wajib (Must-have) vs Opsional (Nice-to-have)

### 4.1 Must-have — Level-In v1 (P1)

| # | Fitur | Ringkasan |
|---|---|---|
| FL1 | **Input keyakinan sebelum jawaban** | Pada kartu latihan (`latihan.html`), sebelum tombol "Lihat jawaban" bisa dipakai, pengguna menilai keyakinannya menjawab lewat **tombol/chip pilihan diskrit skala 1–5** (bukan slider) — keputusan final, lihat §9 brainstorm. |
| FL2 | **Pembandingan keyakinan vs hasil aktual** | Setelah jawaban dibuka dan pengguna menandai Benar/Salah (mekanisme yang sudah ada), sistem menghitung dan mencatat *gap* antara keyakinan dan hasil untuk kartu itu. |
| FL3 | **Agregasi gap per mata pelajaran** | Gap per kartu diakumulasi menjadi pola per mata pelajaran (mis. mapel mana paling sering "yakin tapi meleset"), tersimpan dan bertahan lintas sesi. Ambang kerja **final untuk v1** (lihat §9 brainstorm): mapel ditandai *overconfident* bila **overconfident rate ≥40%** dari kartu yang dikerjakan pada mapel itu, dengan **minimum 5 kartu dikerjakan** dulu sebelum pola dianggap valid; di bawah itu tampil "belum cukup data". **Angka 40%/5 ini adalah perkiraan awal, bukan hasil uji data nyata — wajib dikalibrasi ulang begitu ada pemakaian pasca-rilis** (lihat §7). |
| FL4 | **Saran belajar harian di Beranda** | Beranda menampilkan mata pelajaran dengan gap kalibrasi terbesar (mengikuti ambang FL3) sebagai saran latihan hari ini, lewat **kartu CTA "Latihan Hari Ini"** — final: **bukan** ikon ke-5 di bottom nav (lihat §9 brainstorm). Melengkapi (bukan menggantikan) kartu tenggat terdekat F1. |
| FL5 | **Integrasi ke kartu Arsip Belajar existing** | Level-In berjalan pada kartu kelas kepercayaan "resmi" maupun "pengguna" tanpa mengubah aturan kelas kepercayaan yang sudah ditetapkan lewat kolom **`kartu.sumber`** (resmi/pengguna/mitra) dan **`kartu.pemilik`** di `docs/rancangan-arsip-latihan-banksoal.md` §1 (selaras §13 `prd-sdd-lanjut.md`). Kedua kolom ini memang dirancang sejak awal untuk menampung skenario ini tanpa restrukturisasi data. |
| FL6 | **Ringkasan kalibrasi di akhir sesi** | Layar `latihan-selesai.html` menambahkan ringkasan kalibrasi (mis. jumlah kartu overconfident/underconfident) berdampingan dengan skor benar/salah yang sudah ada. **Catatan model bisnis — belum final, lihat §7:** apakah FL6 termasuk fitur gratis dasar atau bagian paket berbayar belum eksplisit dijawab brainstorm/rancangan. |

### 4.2 Nice-to-have (bisa menyusul setelah Level-In v1 stabil)

| # | Fitur | Catatan |
|---|---|---|
| FL7 | Statistik/tren kalibrasi jangka panjang (mis. "makin akurat menilai diri sendiri dalam sebulan terakhir") | Beririsan dengan "statistik kemajuan per mata pelajaran" (berbayar) di `rancangan-arsip-latihan-banksoal.md` §2.2 — pertimbangkan sebagai bagian dari situ, bukan diduplikasi. |
| FL8 | Reframing "Penolong Pilih Mapel" → "Pilih Cita-cita" | **Keputusan final (§9 brainstorm):** langkah **baru** sebelum Penolong Pilih Mapel yang sudah ada (`pilih-mapel.html`), **bukan pengganti**, dan masuk scope **P1** (bukan bagian rilis v1 3 September). Alasan: menyentuh flow diferensiator utama 9 hari sebelum rilis terlalu berisiko, dan data pemetaan cita-cita→prodi belum ada. Karena data pemetaannya belum ada, fitur ini butuh PRD/scope tersendiri sebelum masuk SDD — tidak digabung ke inti Confidence Gap Tracker. |
| FL9 | ~~Nama publik pengganti "Bank Soal"~~ | **Selesai — final (§9 brainstorm).** Lihat terminologi resmi di §4.3 di bawah; baris ini dipertahankan hanya untuk jejak keputusan. |
| FL10 | ~~Entri "Latihan" di bottom navigation~~ | **Selesai — final (§9 brainstorm).** Akses tetap lewat kartu CTA "Latihan Hari Ini" di Beranda (lihat FL4), bukan ikon ke-5. Pertanyaan turunan (kapan ini layak naik jadi ikon nav) masih terbuka — lihat §7. |
| FL11 | Level-In berlaku juga di Bank Soal Mitra | **Keputusan final (§9 brainstorm):** Level-In v1 hanya berlaku di Arsip Belajar (kartu kelas "resmi" + "pengguna"). Kalibrasi di Bank Soal Mitra **menyusul setelah Bank Soal Mitra sendiri tayang** — jadwal Bank Soal Mitra sendiri "bila waktu memungkinkan" (`rancangan-arsip-latihan-banksoal.md` §5), dan ini **bukan dependency** yang boleh menghambat Level-In v1. |

### 4.3 Terminologi resmi (final, berlaku di seluruh dokumen PRD & SDD)

Keputusan final dari §9 brainstorm — menggantikan penamaan "Bank Soal" untuk
section utama:

| Istilah lama | Istilah final | Cakupan |
|---|---|---|
| "Bank Soal" (umbrella) | **Arsip Belajar** | Section utama, kartu privat milik pengguna (kelas kepercayaan "pengguna" + "resmi") |
| — | **Latihan Hari Ini** | Sesi latihan harian (nama CTA & nama layar sesi) |
| "Bank Soal" (dipertahankan) | **Bank Soal Mitra** | Hanya untuk sub-tab konten mitra (2.3 `rancangan-arsip-latihan-banksoal.md`/F9 `prd-sdd-lanjut.md`) — istilah "Bank Soal" tidak lagi dipakai untuk section utama, guna menghindari perbandingan volume soal yang tidak bisa dimenangkan LANJUT. |

## 5. Kriteria Selesai (Acceptance Criteria) per Fitur

**FL1 — Input keyakinan sebelum jawaban**
- [ ] Sebelum jawaban kartu latihan tampil, muncul pertanyaan "Seberapa yakin
      kamu bisa jawab ini?" dengan 5 tingkat pilihan berbentuk tombol/chip
      diskrit (final — bukan slider, bukan lagi asumsi).
- [ ] Tombol "Lihat jawaban" tidak dapat dilanjutkan sebelum pengguna
      memilih satu tingkat keyakinan.
- [ ] Menambah langkah ini tidak menambah lebih dari satu tap/ketukan ekstra
      dibanding alur latihan yang sudah ada di `latihan.html`.
- [ ] Nilai keyakinan tersimpan bersamaan dengan kartu dan hasil jawabannya
      (selaras dengan entitas `riwayat_latihan` di §13 `prd-sdd-lanjut.md`,
      yang memang sudah dirancang menyimpan tiap jawaban, bukan hanya skor
      akhir).

**FL2 — Pembandingan keyakinan vs hasil aktual**
- [ ] Setelah pengguna menandai Benar/Salah, sistem menghitung gap antara
      keyakinan dan hasil aktual untuk kartu tersebut.
- [ ] Gap ditampilkan dengan bahasa netral, tidak menghakimi — konsisten
      dengan nada existing ("Salah bukan hukuman: kartunya cuma kembali
      lebih cepat", `latihan.html`).
- [ ] Tidak memakai warna merah/oranye atau kata "gagal" — mengikuti aturan
      warna yang sudah mengikat di `app/README.md`.

**FL3 — Agregasi gap per mata pelajaran**
- [ ] Gap per kartu terakumulasi menjadi ringkasan per mata pelajaran.
- [ ] Ringkasan bertahan setelah aplikasi ditutup (persisten), sama seperti
      kemajuan Daftar Periksa (F5) yang sudah mensyaratkan ini.
- [ ] Mata pelajaran dengan **kurang dari 5 kartu dikerjakan** ditandai
      eksplisit "belum cukup data", bukan ditampilkan seolah gap-nya nol.
- [ ] Mata pelajaran ditandai *overconfident* (layak disarankan di FL4) bila
      **overconfident rate ≥40%** dari kartu yang sudah dikerjakan pada
      mapel itu, dan jumlah kartu dikerjakan ≥5.
- [ ] Ambang 40%/5 di atas diimplementasikan sebagai **nilai yang mudah
      diubah** (konfigurasi, bukan angka tertanam permanen di banyak
      tempat), karena wajib dikalibrasi ulang pasca-rilis nyata (lihat §7).

**FL4 — Saran belajar harian di Beranda**
- [ ] Beranda menampilkan satu mata pelajaran dengan gap kalibrasi terbesar
      (mengikuti ambang FL3) sebagai saran latihan hari ini, lewat kartu CTA
      berlabel **"Latihan Hari Ini"**.
- [ ] Untuk pengguna baru/data belum cukup, Beranda tetap menampilkan ajakan
      latihan yang berguna (fallback), tidak kosong dan tidak menjadi jalan
      buntu.
- [ ] Saran ini tampil **di bawah** kartu tenggat terdekat (F1) — F1 tetap
      elemen dengan prioritas visual tertinggi di Beranda, tidak digeser.
- [ ] Tidak ada ikon ke-5 ditambahkan ke bottom navigation untuk mengakses
      Latihan Hari Ini (final — lihat §9 brainstorm & §6 Batasan).

**FL5 — Integrasi ke kartu Arsip Belajar existing**
- [ ] Level-In berjalan sama untuk kartu kelas kepercayaan "resmi" maupun
      "pengguna" (`kartu.sumber`) di `arsip-detail.html`.
- [ ] Tidak ada perubahan pada aturan privasi/visibilitas kartu pengguna:
      kartu privat tetap privat, tetap bertanda "Diunggah pengguna — belum
      diverifikasi tim" (`rancangan-arsip-latihan-banksoal.md` §2.1), dan
      penanda itu tetap tidak bisa disembunyikan.
- [ ] Penambahan kartu baru (`arsip-tambah.html`) tidak mewajibkan pengisian
      data tambahan di luar yang sudah ada, kecuali disepakati lain.

**FL6 — Ringkasan kalibrasi di akhir sesi**
- [ ] `latihan-selesai.html` menambahkan ringkasan kalibrasi berdampingan
      dengan skor benar/salah dan rincian per mapel yang sudah ada.
- [ ] Tidak menghapus informasi existing (skor per mapel, pesan "yang salah
      akan muncul lagi lusa").
- [ ] Ukuran keberhasilan sesi latihan tetap **bukan** panjang beruntun
      (streak) — sejalan dengan catatan F7 di `prd-sdd-lanjut.md` bahwa
      ukuran keberhasilan adalah kartu yang berpindah dari "sering salah" ke
      "dikuasai", bukan streak harian.
- [ ] **Belum boleh dikunci ke tahap SDD:** apakah ringkasan kalibrasi FL6
      tampil untuk semua pengguna (fitur gratis dasar) atau hanya pengguna
      berbayar (bagian "statistik kemajuan per mata pelajaran") — lihat §7.
      Sampai ada keputusan eksplisit, tim SDD **tidak boleh mengasumsikan**
      salah satu tanpa konfirmasi PM.

## 6. Batasan / Asumsi

- **Batas prioritas:** Level-In berstatus P1 (setelah v1 rilis 3 September
  2026). Pengerjaannya **tidak boleh** menyentuh, menunda, atau mengubah
  cakupan P0 (F1–F5) yang sudah dikunci di `docs/prd-sdd-lanjut.md`.
- **Batas waktu pakai:** seluruh alur Level-In, termasuk langkah menilai
  keyakinan, harus tetap muat dalam pola pemakaian 15–25 menit/hari yang
  sudah menjadi spesifikasi produk sejak v1.
- **Batas privasi konten:** kartu Arsip Belajar milik pengguna tetap privat
  dan tidak diverifikasi tim (kelas kepercayaan "pengguna" pada kolom
  `kartu.sumber`, lihat `rancangan-arsip-latihan-banksoal.md` §1 dan §13
  `prd-sdd-lanjut.md`). Level-In tidak boleh menjadi alasan untuk
  memverifikasi, mempublikasikan, atau membagikan kartu pribadi pengguna.
- **Batas navigasi (final, bukan lagi asumsi):** bottom navigation tetap 4
  ikon (Beranda, Khusus SMK, Pilih Mapel, Checklist) sesuai keputusan yang
  sudah dikunci di `app/README.md`. Level-In **tidak** menambah ikon ke-5;
  akses Latihan Hari Ini tetap lewat kartu CTA di Beranda dan dari Arsip
  Belajar — keputusan ini final per §9 brainstorm. Pertanyaan turunan
  "kapan (kalau perlu) ini naik status jadi ikon nav" masih terbuka, lihat
  §7.
- **Batas desain:** mengikuti identitas visual resmi di `docs/design.md`
  (maskot kelinci wisudawan, wordmark "Lanjut", palet biru tiga-tingkat) dan
  token kerja di `app/assets/tokens.css` (font Poppins,
  `--blue-200/300/400`). Kode HEX presisi untuk palet **belum dikunci** —
  ini status resmi `design.md` sendiri (lihat §6 "Yang belum diputuskan" di
  dokumen itu), bukan celah pada PRD ini; implementasi Level-In memakai
  token `tokens.css` yang sudah ada sampai HEX final diselaraskan.
- **Batas struktur data (fondasi sudah ada):** kolom `kartu.sumber`
  (resmi/pengguna/mitra) dan `kartu.pemilik`, yang sudah diputuskan di
  `rancangan-arsip-latihan-banksoal.md` §1 sebagai fondasi sejak awal, cukup
  untuk menampung integrasi Level-In tanpa restrukturisasi data tambahan.
- **Batas model bisnis (belum final untuk FL6/FL3):** `rancangan-arsip-
  latihan-banksoal.md` §2.2 membagi Latihan Harian menjadi gratis (sesi
  kartu acak, penghitung beruntun, ringkasan akhir sesi) vs berbayar (mode
  ujian bertimer, statistik per mapel, pengulangan berjarak otomatis,
  ekspor). Dokumen itu **tidak eksplisit** menempatkan ringkasan kalibrasi
  Level-In (FL6) atau agregasi lintas-sesi per mapel (FL3) pada salah satu
  sisi. PRD ini **tidak mengarang** jawabannya karena berdampak pada model
  bisnis (Jalan A) — lihat §7.
- **Asumsi status implementasi:** kerangka halaman `arsip*.html`,
  `latihan*.html`, dan `bank-soal.html` sudah ada sebagai markup statis
  tanpa logika data tersambung (lihat "Yang BELUM ada" di `app/README.md`).
  PRD ini mengasumsikan Level-In dibangun di atas kerangka yang sama,
  bukan menggantinya — detail penyambungan data adalah urusan tahap SDD.

## 7. Pertanyaan Terbuka

Bagian ini hanya memuat poin yang **benar-benar belum terjawab** setelah
§9 brainstorm. Poin yang sudah final (mekanik input keyakinan, ambang kerja
40%/5 kartu, akses via CTA bukan ikon nav, nama "Arsip Belajar"/"Latihan
Hari Ini", scope "Pilih Cita-cita", urutan kalibrasi Arsip Belajar vs Bank
Soal Mitra) **tidak** diulang di sini — lihat §4 dan §6 untuk keputusan
finalnya.

1. **Kalibrasi ulang ambang 40%/minimum 5 kartu pasca-rilis** — angka ini
   adalah perkiraan awal untuk v1, **bukan** hasil uji dengan data
   pemakaian nyata (lihat §10 brainstorm, disamakan risikonya dengan angka
   BEP di `rancangan-arsip-latihan-banksoal.md`). **Wajib** dijadwalkan
   peninjauan ulang begitu ada data pemakaian pasca-rilis Level-In — perlu
   keputusan siapa yang memicu peninjauan ini dan berdasarkan metrik apa
   (mis. jumlah sesi terkumpul, keluhan pengguna, dsb).

2. **Ambang kapan CTA "Latihan Hari Ini" naik status jadi ikon bottom nav**
   — §10 brainstorm mencatat pertanyaan ini masih terbuka: pola pemakaian
   seperti apa (mis. frekuensi klik CTA, retensi harian) yang akan menjadi
   pemicu keputusan menambah ikon ke-5. Belum ditentukan dan **tidak** boleh
   diputuskan sepihak oleh tim teknis karena mengubah keputusan nav yang
   sudah dikunci di `app/README.md`.

3. **FL6 (ringkasan kalibrasi akhir sesi) — gratis atau berbayar?** Rancangan
   Latihan Harian di `rancangan-arsip-latihan-banksoal.md` §2.2 memisahkan
   "ringkasan akhir sesi" (gratis) dari "statistik kemajuan per mata
   pelajaran" (berbayar), tetapi tidak menyebut kalibrasi Level-In secara
   eksplisit di salah satu sisi. Ada dua pembacaan yang sama-sama masuk
   akal:
   - FL6 (ringkasan **per-sesi**, sekali tampil di `latihan-selesai.html`)
     selaras pola dengan "ringkasan akhir sesi" → **gratis**.
   - FL3 (agregasi **lintas-sesi** per mapel, dipakai berkelanjutan oleh
     FL4) selaras pola dengan "statistik kemajuan per mata pelajaran" →
     **berbayar**.
   PRD ini **tidak memutuskan sendiri** karena berdampak langsung pada
   model bisnis Jalan A (langganan fitur lanjutan) — perlu keputusan
   eksplisit dari PM/SDD-writer sebelum FL3/FL6 masuk implementasi.

---

*Dokumen ini disusun sebagai lampiran P1 dan tidak menggantikan atau
menimpa keputusan apa pun di `docs/prd-sdd-lanjut.md`. Detail implementasi
teknis (struktur data final, state management, penyimpanan riwayat
kalibrasi) sengaja tidak dibahas di sini — itu tahap SDD berikutnya.*
