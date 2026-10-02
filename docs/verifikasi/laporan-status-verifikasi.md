# Laporan Status Verifikasi Konten & Kesenjangan Profil (LANJUT_043)

Per 3 Oktober 2026. Sumbernya basis data lokal `lanjut_test` (dibaca dengan
SELECT saja) dan berkas `MVP-PWA/data/*.json`. **Basis data produksi terpisah**:
tanda verifikasi di sini tidak ikut ke server (lihat
`docs/LANJUT_024_Checklist-Hari-Deploy.md`).

"Terverifikasi" memakai definisi yang sama dengan server dan skrip
`verifikasi-konten`: `status_verifikasi = 'terverifikasi'` **dan**
`diperiksa_pada` terisi.

Lembar kerja untuk tim konten ada di
[`lembar-review-konten.md`](lembar-review-konten.md). Lembar itu berisi semua
butir di bawah, lengkap dengan isinya, sumber, perintah menandai, dan kolom
catatan.

## 1. Ringkasan angka

| Jenis konten | `--jenis` | Total | Terverifikasi | Belum | Yang dilihat siswa sekarang |
|---|---|---|---|---|---|
| Profil prodi (F10 Eksplorasi Tujuan) | `eksplorasi-tujuan` | 18 | 0 | 18 | Tidak ada satu pun; layar menampilkan "Profil prodi sedang kami cek". |
| Kartu kurasi (F6 Arsip, F7 Latihan) | `kartu` | 12 | 0 | 12 | Tidak ada; disaring server sejak LANJUT_040. |
| Prodi (F3 Pilih Mapel) | `prodi` | 19 | 0 | 19 | Tampil, dengan penafian F3. |
| Mapel (F3 Pilih Mapel) | `mapel` | 10 | 0 | 10 | Tampil, dengan penafian F3. |
| Khusus SMK (F2) | `khusus-smk` | 6 | 0 | 6 | Tampil, berlabel "belum diverifikasi". |
| Daftar Periksa (F5) | `checklist` | 11 | 0 | 11 | Tampil, berlabel "belum diverifikasi". |
| Linimasa (F1 Beranda) | `linimasa` | 6 | 3 | 3 | Hanya 3 tahapan TKA yang terverifikasi. |
| Cerita Alumni (F4) | `cerita-alumni` | 2 | 0 | 2 | Tidak ada; keduanya contoh fiktif tanpa izin tayang. |
| **Jumlah** | | **84** | **3** | **81** | |

Selain 18 profil di atas, **1 prodi belum punya profil sama sekali**:
`teknik-elektro` (lihat bagian 4.1).

Data lain yang tidak punya kolom status verifikasi, jadi tidak bisa ditandai
lewat skrip:

- **Pemetaan prodi → mapel** (`prodi_mapel`, 76 baris, bobot 1–3). Asalnya
  mockup. Baris ini ikut dicek bersama butir prodi di lembar review.
- **Ambang Level-In** (`konfigurasi_levelin`, 11 kunci). Kepala berkas
  `levelin-konfig.json` menyebutnya "perkiraan, belum diuji dengan data
  pemakaian nyata". Angka ini bukan konten yang dicek ke sumber; tinjau ulang
  setelah ada data pemakaian.
- **Kartu buatan pengguna** di tabel `kartu`. Ini bukan konten tim dan tidak
  pernah diverifikasi.

## 2. Daftar per jenis

### 2.1 Profil prodi — `eksplorasi-tujuan` (0 dari 18 terverifikasi)

Asal semua profil adalah `riset` (docs/riset-top-prodi-lengkap.md, disusun
31 Agustus 2026). Kolom ketiga menyebut bagian yang berlabel "Perkiraan" di
`status_sumber` (tampil ke siswa sebagai lencana per bagian) dan angka yang
masih kosong.

| ID | Nama | Bagian "Perkiraan" / kosong | Status |
|---|---|---|---|
| `k3` | Keselamatan dan Kesehatan Kerja (K3) | mata kuliah | belum |
| `administrasi-bisnis` | Administrasi Bisnis | mata kuliah | belum |
| `teknik-informatika` | Teknik Informatika | — | belum |
| `teknik-mesin` | Teknik Mesin | mata kuliah | belum |
| `keperawatan` | Keperawatan | mata kuliah, profesi | belum |
| `perpajakan` | Perpajakan | mata kuliah | belum |
| `keperawatan-anestesiologi` | Keperawatan Anestesiologi | mata kuliah, profesi | belum |
| `humas-komunikasi-digital` | Humas & Komunikasi Digital | mata kuliah, profesi | belum |
| `manajemen-bisnis` | Manajemen Bisnis | mata kuliah, profesi | belum |
| `informatika` | Informatika | mata kuliah; angka diterima kosong | belum |
| `manajemen` | Manajemen | mata kuliah, profesi; angka diterima kosong | belum |
| `ilmu-hukum` | Ilmu Hukum | — | belum |
| `teknik-pertambangan` | Teknik Pertambangan & Perminyakan | mata kuliah | belum |
| `kedokteran` | Kedokteran (Pendidikan Dokter) | mata kuliah | belum |
| `farmasi` | Farmasi | — | belum |
| `ilmu-keperawatan` | Ilmu Keperawatan | mata kuliah | belum |
| `ilmu-komunikasi` | Ilmu Komunikasi | — | belum |
| `akuntansi` | Akuntansi | mata kuliah; angka diterima kosong | belum |

### 2.2 Kartu kurasi — `kartu` (0 dari 12 terverifikasi)

Asal semuanya `contoh` (isi contoh tulisan tim, belum ditinjau). Tidak ada
`url_sumber`. Hanya 3 dari 10 mapel yang punya kartu kurasi.

| ID | Mapel | Judul | Status |
|---|---|---|---|
| `k-ing-1` | Bahasa Inggris | Simple present | belum |
| `k-ing-2` | Bahasa Inggris | Sinonim | belum |
| `k-ing-3` | Bahasa Inggris | Past tense | belum |
| `k-ing-4` | Bahasa Inggris | Preposisi waktu | belum |
| `k-inf-1` | Informatika | Struktur data dasar | belum |
| `k-inf-2` | Informatika | Sistem bilangan | belum |
| `k-inf-3` | Informatika | Basis data | belum |
| `k-inf-4` | Informatika | Algoritma | belum |
| `k-mtk-1` | Matematika | Turunan fungsi aljabar | belum |
| `k-mtk-2` | Matematika | Logaritma dasar | belum |
| `k-mtk-3` | Matematika | Deret aritmetika | belum |
| `k-mtk-4` | Matematika | Akar persamaan kuadrat | belum |

### 2.3 Prodi — `prodi` (0 dari 19 terverifikasi)

Asal semuanya `mockup`.

| ID | Nama | Rumpun | Status |
|---|---|---|---|
| `administrasi-bisnis` | Administrasi Bisnis | Ekonomi & Bisnis | belum |
| `akuntansi` | Akuntansi | Ekonomi & Bisnis | belum |
| `manajemen` | Manajemen | Ekonomi & Bisnis | belum |
| `manajemen-bisnis` | Manajemen Bisnis | Ekonomi & Bisnis | belum |
| `perpajakan` | Perpajakan | Ekonomi & Bisnis | belum |
| `farmasi` | Farmasi | Kesehatan | belum |
| `ilmu-keperawatan` | Ilmu Keperawatan | Kesehatan | belum |
| `kedokteran` | Kedokteran (Pendidikan Dokter) | Kesehatan | belum |
| `keperawatan` | Keperawatan | Kesehatan | belum |
| `keperawatan-anestesiologi` | Keperawatan Anestesiologi | Kesehatan | belum |
| `humas-komunikasi-digital` | Humas & Komunikasi Digital | Sosial & Humaniora | belum |
| `ilmu-hukum` | Ilmu Hukum | Sosial & Humaniora | belum |
| `ilmu-komunikasi` | Ilmu Komunikasi | Sosial & Humaniora | belum |
| `informatika` | Informatika | Teknologi & Rekayasa | belum |
| `k3` | Keselamatan dan Kesehatan Kerja (K3) | Teknologi & Rekayasa | belum |
| `teknik-elektro` | Teknik Elektro | Teknologi & Rekayasa | belum (tanpa profil F10) |
| `teknik-informatika` | Teknik Informatika | Teknologi & Rekayasa | belum |
| `teknik-mesin` | Teknik Mesin | Teknologi & Rekayasa | belum |
| `teknik-pertambangan` | Teknik Pertambangan & Perminyakan | Teknologi & Rekayasa | belum |

### 2.4 Mapel — `mapel` (0 dari 10 terverifikasi)

Asal semuanya `mockup`. Nilai "tersedia di SMK" adalah Pertanyaan Terbuka
PRD §11 yang memblokir F3.

| ID | Nama | Status |
|---|---|---|
| `bahasa-indonesia` | Bahasa Indonesia | belum |
| `bahasa-inggris` | Bahasa Inggris | belum |
| `biologi` | Biologi | belum |
| `ekonomi` | Ekonomi | belum |
| `fisika` | Fisika | belum |
| `geografi` | Geografi | belum |
| `informatika` | Informatika | belum |
| `kimia` | Kimia | belum |
| `matematika` | Matematika | belum |
| `sosiologi` | Sosiologi | belum |

### 2.5 Khusus SMK — `khusus-smk` (0 dari 6 terverifikasi)

Asal semuanya `mockup`.

| ID | Judul | Status |
|---|---|---|
| `nilai-rapor` | Nilai rapor mapel pendukung SNBP | belum |
| `portofolio` | Sertifikat kompetensi keahlian dan PKL | belum |
| `kuota-eligible` | Kuota siswa eligible SNBP | belum |
| `jalur-vokasi` | Jalur vokasi Politeknik (D3/D4) | belum |
| `mapel-tka-tidak-ada` | Mapel pilihan TKA yang tidak diajarkan di SMK | belum |
| `jadwal-pkl` | Jadwal PKL berdekatan dengan pendaftaran | belum |

### 2.6 Daftar Periksa — `checklist` (0 dari 11 terverifikasi)

Asal semuanya `mockup`.

| ID | Judul | Status |
|---|---|---|
| `ktp` | Siapkan KTP | belum |
| `kk` | Siapkan Kartu Keluarga | belum |
| `rapor` | Kumpulkan rapor semua semester | belum |
| `foto` | Siapkan pas foto formal | belum |
| `akun-snpmb` | Buat akun SNPMB | belum |
| `pdss` | Pastikan PDSS diisi sekolah | belum |
| `mapel-tka` | Pilih 2 mapel pilihan TKA | belum |
| `akun-tka` | Daftar akun TKA | belum |
| `kip-kuliah` | Cek syarat KIP Kuliah | belum |
| `beasiswa` | Cari beasiswa di kampus tujuan | belum |
| `ukt` | Cek info keringanan UKT di kampus tujuan | belum |

### 2.7 Linimasa — `linimasa` (3 dari 6 terverifikasi)

| ID | Judul | Asal | Status |
|---|---|---|---|
| `sosialisasi` | Sosialisasi jalur TKA/SNBP/SNBT di sekolah | mockup | belum |
| `daftar-akun-tka` | Pendaftaran akun TKA | resmi | terverifikasi (dicek 27 Sep 2026) |
| `pelaksanaan-tka` | Pelaksanaan TKA | resmi | terverifikasi (dicek 27 Sep 2026) |
| `susulan-tka` | Pelaksanaan susulan TKA | resmi | terverifikasi (dicek 27 Sep 2026) |
| `pdss` | Pengisian PDSS oleh sekolah | mockup | belum |
| `daftar-snbp` | Pendaftaran SNBP | mockup | belum |

Tiga tahapan TKA ditandai pada 27 September 2026 **oleh Claude** (LANJUT_020),
berdasar siaran pers Kemendikdasmen 561/sipers/A6/VII/2026, bukan oleh orang
tim konten. Lembar review mencantumkannya di bagian "mohon konfirmasi ulang".

### 2.8 Cerita Alumni — `cerita-alumni` (0 dari 2 terverifikasi)

| ID | Nama | Asal | Status |
|---|---|---|---|
| `contoh-1` | Alumni contoh A | contoh | belum |
| `contoh-2` | Alumni contoh B | contoh | belum |

Keduanya **fiktif**. Jangan ditandai; yang dibutuhkan adalah cerita nyata
(bagian 4.7).

## 3. Yang berubah sejak LANJUT_033

**Status verifikasi: tidak ada yang berubah.** Angkanya sama dengan audit
LANJUT_033: 0/18 profil, 0/12 kartu kurasi, 0/19 prodi, 0/10 mapel, dan
Linimasa 3/6 (tiga tahapan TKA sejak LANJUT_020).

- **Log verifikasi** (`LANJUT_App/server/verifikasi-konten.log`, hanya ada di
  komputer ini) mencatat tanda sementara untuk uji E2E pada
  `eksplorasi-tujuan/teknik-informatika` di LANJUT_034, 036, 037, 038, dan 039
  (1–2 Oktober 2026). Setiap tanda itu dibatalkan kurang dari 1,5 menit
  kemudian. Tes otomatis memakai baris fixture sendiri atau mengembalikan
  status aslinya.
- **Cara server menyaring kartu kurasi** berubah. Sejak LANJUT_040 server
  tidak lagi mengirim kartu kurasi yang belum terverifikasi. Sebelumnya
  `GET /kartu` tanpa parameter masih mengirim ke-12 kartu itu; layar Arsip
  tidak menampilkannya hanya karena aplikasi meminta `?sumber=pengguna`. Sejak
  LANJUT_041 Latihan juga hanya memakai kartu sendiri dan kurasi
  terverifikasi.
- **Alatnya berubah di task ini** (LANJUT_043):
  - `verifikasi-konten` mengenal jenis `kartu`, hanya untuk kartu kurasi tim.
    ID kartu buatan siswa atau kartu yang sudah dihapus dianggap "tidak
    ditemukan".
  - **Setiap perubahan status, termasuk `--batal`, wajib diakhiri `--ya`.**
    Tanpa itu skrip hanya menampilkan pratinjau dan tidak mengubah apa pun.
  - `npm run benih` kini mempertahankan tanda kartu kurasi selama isi
    kartunya tidak berubah. Sebelumnya setiap benih menghapus tanda itu, jadi
    menandai kartu tidak akan bertahan.
  - Baru: `npm run lembar-review`, yang menyusun lembar review dari basis
    data.

## 4. Kesenjangan dan kebutuhan tim konten

Bagian ini **tidak mengisi isi apa pun**. Isinya hanya apa yang kurang dan
sumber yang dibutuhkan untuk melengkapinya.

### 4.1 Prodi tanpa profil: `teknik-elektro`

Hanya satu prodi yang belum punya profil F10: **Teknik Elektro** (rumpun
Teknologi & Rekayasa). Prodi ini tetap muncul di F3 dengan 4 mapel
(matematika 3, fisika 3, informatika 2, kimia 1). Siswa yang memilihnya akan
selalu melihat "Profil prodi sedang kami cek" di F10, walaupun profil lain
nanti sudah ditandai.

**Keputusan yang masih terbuka** (SDD-F10 §D.4, pertanyaan P1; saat ini
"dibiarkan dulu"):

1. **Hapus** dari `prodi.json` dan `prodi-mapel.json`. Catatan: `npm run benih`
   tidak pernah menghapus baris, jadi penghapusan di basis data perlu langkah
   tersendiri. Pengguna yang sudah memilih prodi ini akan kehilangan
   pilihannya, karena FK `pengguna.prodi_tujuan` memakai `ON DELETE SET NULL`.
2. **Biarkan tanpa profil**, seperti sekarang.
3. **Riset susulan** sampai menjadi profil ke-19. Kalau pilihan ini diambil,
   tim konten perlu menyiapkan satu entri di `MVP-PWA/data/profil-prodi.json`
   dengan bentuk yang sama seperti 18 entri lain:

| Field | Yang dibutuhkan | Sumber yang disarankan | Catatan |
|---|---|---|---|
| `id`, `nama`, `rumpun` | Harus persis `teknik-elektro` / "Teknik Elektro" / "Teknologi & Rekayasa" | `prodi.json` | Benih menolak nama atau rumpun yang berbeda. |
| `jenjang` | Satu jenjang (mis. S1 atau D3/D4) | PDDikti, laman resmi kampus | Teknik Elektro ada di PTN akademik maupun politeknik. Pilih satu agar angka peminat dan daftar kampus konsisten. |
| `badge_relevan_smk` | ya / tidak | Keputusan tim | Lencana di layar berbunyi "Relevan untuk RPL/TKJ/Teknik". |
| `peminat` | `jumlah`, `kampus` (satu PTN), `tahun`, `jalur` (SNBP/SNBT), `sumber` | Data daya tampung & peminat SNPMB | Pakai satu kampus, tahun, dan jalur, seperti profil lain. |
| `diterima` | Jumlah diterima di kampus, tahun, dan jalur yang sama | SNPMB | Boleh kosong (`null`); layar lalu menampilkan "—". Jangan diperkirakan. |
| `mata_kuliah` | 5–6 nama mata kuliah | Dokumen kurikulum resmi prodi di kampus tersebut | Dari sumber sekunder → `status_sumber.mata_kuliah = "Perkiraan"`. |
| `profesi` | 4 profesi lulusan | Profil lulusan di dokumen kurikulum atau laman resmi prodi | Dari sumber sekunder → "Perkiraan". |
| `kampus` | 4–5 kampus: `nama`, `jenis` (PTN Akademik / PTN Vokasi / PTS), `jalur_masuk` | PDDikti (prodi aktif), daya tampung SNPMB (SNBP/SNBT), laman PMB kampus (Mandiri) | Urutan di berkas = urutan tampil. |
| `status_sumber` | "Terverifikasi" atau "Perkiraan" untuk peminat, mata kuliah, profesi, kampus | — | Tampil ke siswa sebagai lencana. |
| `catatan_studi` | Opsional (mis. syarat tes kesehatan/buta warna) | Laman PMB kampus | Hanya kalau ada sumbernya. |
| `_catatan_data` | Catatan asal data untuk tim (tidak tampil) | — | Tulis sumber setiap bagian. |

Tidak ada field gaji, sama seperti profil lain (spec F10 §3). Alurnya: isi
berkas → `node tools/validasi.js` (MVP-PWA) → `npm run benih` →
`npm run lembar-review` → dicek orang → `npm run verifikasi-konten --
--jenis=eksplorasi-tujuan --id=teknik-elektro --ya`.

### 4.2 Profil yang sudah ada (18)

- **Keputusan yang dibutuhkan (paling menghambat F10):** apakah profil yang
  sebagian isinya berlabel "Perkiraan" boleh ditandai terverifikasi?
  Lencana "Perkiraan" tetap tampil ke siswa per bagian. Kalau jawabannya
  "tidak", hanya 4 profil yang seluruh bagiannya "Terverifikasi"
  (`teknik-informatika`, `ilmu-hukum`, `farmasi`, `ilmu-komunikasi`), dan ke-4
  profil itu pun tetap harus dicek ke sumbernya.
- **Mata kuliah "Perkiraan" di 14 profil** butuh dokumen kurikulum resmi
  kampus agar bisa dinaikkan ke "Terverifikasi".
- **Profesi "Perkiraan" di 5 profil** (`keperawatan`,
  `keperawatan-anestesiologi`, `humas-komunikasi-digital`, `manajemen-bisnis`,
  `manajemen`) butuh profil lulusan resmi.
- **Angka diterima kosong di 3 profil** (`informatika`, `manajemen`,
  `akuntansi`); layar menampilkan "—". Butuh data SNPMB untuk kampus, tahun,
  dan jalur yang sama dengan angka peminatnya.
- **Tahun dan jalur angka peminat bercampur** (SNBT 2026, SNBP 2025, SNBP
  2026). Ini tidak salah, karena setiap profil menyebut sumbernya sendiri.
  Pastikan saja setiap angka cocok dengan tahun dan jalur yang tertulis.

### 4.3 Kartu kurasi (12)

- Yang dicek adalah kebenaran soal dan jawaban. Sebaiknya dicek orang yang
  menguasai mapelnya.
- `url_sumber` kosong. Kolomnya sudah ada di basis data, tetapi benih selalu
  mengisinya kosong. Mencatat rujukan materi per kartu membutuhkan perubahan
  kecil di benih (task terpisah).
- Hanya Matematika, Bahasa Inggris, dan Informatika yang punya kartu. PRD F6
  meminta arsip sudah berisi kartu kurasi tim, jadi 7 mapel lain masih
  kosong.

### 4.4 Prodi, mapel, dan pemetaan prodi → mapel

- Semuanya berasal dari mockup.
- Untuk bobot mapel penentu (bobot 3) dan mapel pendukung, sumbernya adalah
  ketentuan mapel pendukung program studi dari SNPMB.
- Untuk "tersedia di SMK", sumbernya adalah struktur kurikulum SMK yang
  berlaku.
- `prodi_mapel` tidak punya kolom status. Kalau pemetaan perlu ditandai
  terpisah dari prodinya, dibutuhkan migrasi. Ini keputusan tim; untuk
  sekarang pemetaan dicek bersama butir prodi.

### 4.5 Khusus SMK (6) dan Daftar Periksa (11)

Semuanya mockup. Setiap butir perlu dicocokkan ke `url_sumber`-nya (SNPMB
atau Direktorat SMK). Khusus SMK juga perlu dicek nadanya: tidak menyalahkan
sekolah (salinan teks §0 kaidah 3).

### 4.6 Linimasa (3 belum, 3 perlu konfirmasi ulang)

- `sosialisasi`, `pdss`, dan `daftar-snbp` masih memakai tanggal mockup.
  Tanggal resmi SNBP/SNBT 2027 belum dirilis per 27 September 2026. Tanggal
  itu harus diganti di `linimasa.json` setelah ada pengumuman resmi; tahapan
  ini tidak bisa ditandai dengan tanggal yang sekarang.
- `sosialisasi` adalah kegiatan di sekolah. Tim perlu memutuskan apakah ada
  sumber resmi nasional untuk tanggalnya.
- Tiga tahapan TKA perlu dikonfirmasi oleh orang tim konten (lihat 2.7).

### 4.7 Cerita Alumni

Belum ada cerita nyata. PRD F4 meminta minimal 3 cerita nyata dengan izin
tertulis dari narasumber sebelum tayang. Dua cerita contoh tidak boleh
ditandai atau ditayangkan.

## 5. Bukti task ini tidak mengubah status

Sidik setiap tabel adalah hash SHA-256 dari semua baris
`id | status_verifikasi | diperiksa_pada`, disingkat 12 karakter. Sidik ini
diambil lima kali: di awal task, setelah `npm run benih`, setelah uji mutasi,
setelah MySQL dinyalakan ulang, dan di akhir task (setelah dua kali
`npm test` penuh). **Kelima hasilnya identik:**

| Tabel | Total | Terverifikasi | Sidik |
|---|---|---|---|
| `profil_prodi` | 18 | 0 | `bdb94acb139e` |
| `prodi` | 19 | 0 | `5521dbb990e8` |
| `mapel` | 10 | 0 | `01ffad6c35ad` |
| `tahapan_linimasa` | 6 | 3 | `207b51c0d87c` |
| `butir_khusus_smk` | 6 | 0 | `40272c31a931` |
| `butir_daftar_periksa` | 11 | 0 | `cc0c279dce88` |
| `cerita_alumni` | 2 | 0 | `7d1411708a64` |
| `kartu` (kurasi aktif) | 12 | 0 | `c78edc295529` |

`verifikasi-konten.log` juga tidak bertambah (22 baris, isinya sama). Tes
untuk jenis `kartu` memakai kartu fixture sendiri yang dihapus lagi; ke-12
kartu kurasi asli tidak pernah ditandai.
