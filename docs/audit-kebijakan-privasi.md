# Audit kebijakan privasi terhadap produk

**Task:** LANJUT_012 seri v2 (T15).
**Dasar:** repo induk `873bf20`, repo `lanjut_app` `dfea689`.
**Sifat:** pencocokan pernyataan dengan dokumen dan kode. Bukan nasihat hukum, dan draf ini belum ditinjau pihak berwenang.

Singkatan bukti, semuanya di repo `lanjut_app`:

- **A9** = `docs/audit-hapus-akun-ekspor.md`
- **A10** = `docs/audit-portofolio-server.md`
- **A11** = `docs/audit-portofolio-aplikasi.md`
- **AM** = `docs/audit-model-data-v2.md`
- **KD** = `docs/kontrak-data-v2.md`
- **PK** = `docs/peta-modul-v2.md`

**KV** = `docs/kebijakan-v2-klaim-vs-kode.md` di repo induk.

K18, K23, K25, dan T16 dirujuk dari teks task LANJUT_012. Salinan rencana yang tersedia (`task/rencana-implementasi-lanjut-v2.md`) hanya memuat K1–K9 dan T1–T4, dan folder `claude/` tidak ada, jadi rumusan aslinya tidak bisa dibaca.

## 1. Temuan struktural

Bagian "Isi kebijakan" dan Lampiran B berada di antara penanda otomatis. Isinya dihasilkan dari `LANJUT_App/lib/kebijakan-privasi.json` oleh `npm run dokumen-kebijakan`, dan JSON itu yang dibaca aplikasi dan landing.

Task ini meminta perubahan di dalam bagian itu, tetapi melarang perubahan pada `lanjut_app` dan `landing/`. Akibatnya:

- Draf kini lebih baru dari JSON. Hal ini dicatat di "Catatan untuk peninjau" pada draf.
- Satu tes di `lanjut_app` gagal sampai JSON diselaraskan (bagian 8).
- Aplikasi dan landing masih menampilkan teks lama. Teks lama itu tetap benar selama saklarnya mati.
- Menjalankan `npm run dokumen-kebijakan` sekarang akan menimpa perubahan ini.

## 2. Peta pernyataan

Nomor baris mengacu ke draf sebelum perubahan.

| Baris | Pernyataan | Masih benar? | Bukti | Tindakan |
|---|---|---|---|---|
| 3–11 | Kepala draf | Ya | | Ubah: tambah tanggal tinjauan |
| 19–24 | Teks sama persis dengan app | Tidak lagi, akibat task ini | Bagian 1 | Ubah |
| 25–35 | Versi, nomor masih 1 | Ya | `lib/kebijakan-privasi.json` | Tetap |
| 36–41 | Isi data diambil dari kode | Ya, sebagian | Bagian 5 | Ubah: tunjuk audit ini |
| 52 | Ringkasan 1: data yang disimpan | Benar selama Portofolio mati, lalu kurang lengkap | KD §4 | Tetap. Mengubahnya juga menyentuh `salinan-teks-lanjut.md` §4.13 dan lembar review, yang dilarang di task ini. Lihat bagian 6 |
| 53–55 | Ringkasan 2–4 | Ya | KV R2–R4 | Tetap |
| 61 | Badan pengelola | `[ISI]` | | Tetap |
| 65 | Akun | Ya, kurang lengkap | Bagian 5 | Tetap |
| 66 | Jalur belajar | Ya, kurang lengkap | Bagian 5 | Tetap |
| 67–72 | Kemajuan, kartu, modul, latihan, persetujuan, keamanan | Ya | KV D1–D2, Lampiran A | Tetap |
| 73 | Catatan teknis server | Ya | A9 §3 | Tetap |
| 74 | Kartu dan butir yang dihapus masih tersimpan | Ya, kurang lengkap | A9 §1, §3 | Ubah: hapus akun menghapus permanen |
| Baru | Portofolio dan foto | | KD §1, §4; A10 | Tambah |
| 78–80 | Data di HP | Ya | KV HP1–HP3 | Tetap. Foto sementara dicatat di Lampiran A |
| 84 | Tidak mengumpulkan foto | **Tidak, begitu Portofolio menyala** | KD §4; A11 §3 | Ubah |
| 85 | Tanpa analitik dan iklan | Ya | KV N2; A11 §3 | Tetap |
| 89–94 | Untuk apa datanya dipakai | Kurang lengkap | KD §4 (`metrik-portofolio`) | Tambah dua butir |
| 98 | Akun lain tidak bisa melihat | Ya | KV V1; tes isolasi LANJUT_010 | Tambah: tidak ada fitur berbagi |
| 99–102 | Tim, penyedia, AI, sekolah | Ya, `[ISI]` | KV V2 | Tetap |
| 106–165 | Seluruh bagian Fitur AI, penyamaran, materi, obrolan, keselamatan | Ya | KV A, T, PS, M, W, S, K, B. Tidak ada commit seri v2 yang menyentuh `server/src/modul/ngobrol` | Tetap |
| 169, 173–177 | Persetujuan orang tua | Ya | KV P2–P4 | Tetap (Langkah 2 butir 8) |
| 171 | Status terlihat di Jalur Saya | **Tidak.** Barisnya ada di Data Akun | `components/layout/AppShell.tsx` (`/akun`), `components/screens/AkunScreen.tsx` (`BarisPersetujuan`) | Ubah nama layar |
| 181 | Hak melihat data | Ya, kurang lengkap | KD §3 | Tambah: unduh data |
| 182 | Ubah data di Jalur Saya | **Tidak.** Formulirnya di Data Akun | `AkunScreen.tsx` (`FormJalur`) | Ubah nama layar |
| 183 | Fitur hapus akun belum ada | **Tidak** | KD §3; A9 §2–3 | Ubah |
| Baru | Yang tidak bisa dihapus aplikasi | | A9 §1, §4 | Tambah |
| 184–186 | Obrolan, pencabutan, `[ISI]` | Ya | KV H4–H6 | Tetap |
| 190–192 | Masa simpan | `[ISI]` | Bagian 7 | Tetap, tidak diisi |
| Baru | Cadangan | | A9 §1; A10 §4; K23 | Tambah |
| 196–200 | Keamanan | Ya | KV KM1–KM2 | Tetap |
| 204 | Versi naik | Ya | KV PB1 | Tetap |
| 206 | "Nanti saja", fitur lain tetap jalan | Kurang tepat untuk Portofolio | A10 §1 | Tambah satu kalimat |
| 208–214 | Perubahan, kontak | `[ISI]` | | Tetap |
| 219 | Sumber Lampiran A | Kurang lengkap | KD | Ubah |
| 227–248 | Tabel data | Ya, kecuali nama layar | Bagian 3 | Ubah nama layar di tiga baris |
| Baru | Lima tabel v2 | | KD §1, §4 | Tambah |
| 250–252 | Endpoint klaim data tamu | **Tidak** | A9 §3; PK D7 | Hapus |
| 256–264 | Di luar basis data | Ya, kurang lengkap | A9, A10, A11 | Tambah empat baris |
| 268–279 | Dikirim ke penyedia AI | Ya | KV | Tetap |
| 283–287 | Yang tidak dikumpulkan | **Tidak, begitu Portofolio menyala** | A11 §3 | Ubah |
| 289–320 | Lampiran B | Ya, 21 isian | | Tetap |
| 324–425 | Lampiran C butir 1–14 | Ya | A9 §4 untuk butir 4 | Tetap |
| 442–447 | Butir 15(d): email saat Daftar belum diverifikasi | Perlu dicek. Migrasi 026 dan 027 tampaknya menanganinya | `server/src/db/migrasi/026`, `027`; A9 §2 | Tetap, dilaporkan |
| Baru | Butir 16 | | Bagian 4 | Tambah |

## 3. Perubahan, sebelum dan sesudah

Kolom **JSON** menandai kalimat di bagian otomatis, yang harus dipindahkan ke `lib/kebijakan-privasi.json` saat diselaraskan.

| # | Sebelum | Sesudah | Bukti | JSON |
|---|---|---|---|---|
| 1 | Untuk data lain, fitur hapus akun di aplikasi belum ada, jadi ajukan lewat kontak di bawah. | Akun dan semua datanya bisa kamu hapus sendiri di Data Akun, kalau fiturnya sudah dibuka untukmu. Kamu perlu memastikan bahwa ini benar-benar kamu, dengan kata sandi atau kode email. Penghapusan berlaku seketika dan tidak bisa dibatalkan. Selama fiturnya belum dibuka untukmu, ajukan lewat kontak di bawah. | KD §3; A9 §2–3 | Ya |
| 2 | Server juga punya endpoint klaim data tamu … | Dihapus | A9 §3; PK D7 | Tidak |
| 3a | (tidak ada) | Lima baris tabel: `pengguna_jalur_minat`, `tujuan`, `butir_bukti`, `lampiran_butir_bukti`, `berkas_tertunda_hapus` | KD §1, §4 | Tidak |
| 3b | (tidak ada) | Portofolio, kalau fiturnya sudah dibuka untukmu: catatan yang kamu buat (judul, jenis, cerita singkat, tautan, dan tanggal karya) beserta fotonya. Satu catatan paling banyak 3 foto, satu akun paling banyak 30 foto, dan satu foto paling besar 5 MB. Sebelum disimpan, keterangan tersembunyi di foto, termasuk lokasi, dihapus. Foto disimpan privat di server. Catatan dan foto yang kamu hapus dihapus permanen; kalau berkas fotonya gagal terhapus saat itu, server mencatat nama berkasnya (tanpa ID akun) supaya bisa dihapus lagi. | KD §4 | Ya |
| 3c | Lokasi, kontak, foto, rekaman suara, … di kartu, di modul, atau di pesan Ngobrol). | Lokasi, kontak, rekaman suara, … di kartu, di modul, di catatan portofolio, atau di pesan Ngobrol). Ditambah butir: Foto, kecuali foto yang kamu pilih atau ambil sendiri untuk Portofolio. | KD §4; A11 §3 | Ya |
| 3d | Lokasi, kontak, kamera/foto, mikrofon, … | Kamera dan foto hanya dipakai Portofolio, untuk foto yang dipilih atau diambil siswa sendiri (LANJUT_011). | A11 §3 | Tidak |
| 3e | (tidak ada) | Baris "Berkas foto", "Foto yang sedang diproses", "Foto yang sedang ditampilkan" | KD §4; A10 §4; A11 §4 | Tidak |
| 4 | (tidak ada) | Cadangan basis data tidak bisa disunting per akun, jadi cadangan lama masih memuat akun yang sudah dihapus sampai cadangan itu tergantikan. Kalau cadangan lama dipulihkan, akun yang pernah dihapus harus dihapus lagi. Foto disimpan terpisah dari basis data, jadi tidak ikut cadangan basis data. | A9 §1, §4; K23; A10 §4 | Ya |
| 5 | Melihat data apa saja yang tersimpan tentangmu. | Ditambah: Kalau fiturnya sudah dibuka untukmu, kamu bisa mengunduh salinan data akunmu di Data Akun. Salinan itu memuat keterangan fotomu (jenis, ukuran, dan nama berkas), bukan isi fotonya. Isi foto bisa kamu lihat di aplikasi. | KD §3, §4 | Ya |
| 6 | (tidak ada) | Yang tidak bisa dihapus dari aplikasi: salinan cadangan basis data (lihat bagian Berapa lama data disimpan), catatan teknis server yang memuat ID akun tetapi bukan nama, pesan yang sudah pernah dikirim ke penyedia AI, dan email yang sudah terkirim. | A9 §1, §4 | Ya |
| 7 | (tidak ada) | Catatan portofolio dan fotomu hanya terlihat olehmu di aplikasi. Saat ini tidak ada fitur berbagi, dan foto tidak punya alamat yang bisa dibuka umum. | KD §4, §5; A10 | Ya |
| 8 | Bagian persetujuan orang tua | Tidak diubah. Lihat bagian 9 | | |
| 9 | `[ISI]` masa simpan | Tidak diisi. Lihat bagian 7 | | |
| 10 | … masih tersimpan di server (modul tidak termasuk: modul dihapus permanen). | Ditambah: Saat akunmu dihapus, semuanya ikut terhapus permanen. | A9 §1 | Ya |
| 11 | (tidak ada) | Menyimpan catatan portofolio dan fotomu supaya bisa kamu lihat lagi. | KD §4 | Ya |
| 12 | (tidak ada) | Menghitung berapa siswa yang sudah mengisi Portofolio, untuk menilai apakah fiturnya berguna. Hasilnya berupa jumlah, dan ID akun bila diminta tim, tanpa isi catatan. | KD §4 | Ya |
| 13 | … tetapi fitur AI tertutup sampai kamu menerima versi yang berlaku. | Ditambah: Portofolio juga baru bisa dipakai setelah kamu menerima versi yang berlaku. | A10 §1; KD §4 | Ya |
| 14 | Jalur Saya (baris 171, 182, dan tiga baris Lampiran A) | Data Akun | `AppShell.tsx`, `AkunScreen.tsx` | Dua baris pertama |
| 15 | Kepala, catatan peninjau, sumber Lampiran A, Lampiran C butir 16 | Lihat draf | Bagian 1, 4 | Tidak |

Butir 1–9 mengikuti nomor Langkah 2 task. Butir 10–15 tambahan yang terbukti perlu.

## 4. Dua kalimat yang menyimpang atau belum didukung

**Foto "juga dicadangkan" tidak ditulis.** Task meminta kalimat itu, tetapi A10 §4 dan KD §4 hanya menyatakan volume foto *perlu* dicadangkan tersendiri, dan tidak ada dokumen yang menunjukkan cadangannya sudah ada. Draf menulis yang terbukti: foto terpisah dan tidak ikut cadangan basis data. Bila cadangan volume sudah disiapkan, kalimatnya bisa diperbarui.

**"Akun yang pernah dihapus harus dihapus lagi" ditulis sesuai K23, tetapi belum ada alatnya.** `server/tools/pulihkan-db.js` hanya memuat berkas cadangan, dan server tidak menyimpan daftar akun yang pernah dihapus. Satu-satunya jejak adalah baris log `DELETE /api/v1/pengguna/saya` yang memuat ID, dan masa simpannya tidak diketahui. Ini tercatat di Lampiran C butir 16(a).

## 5. Data yang belum masuk inventaris

Sudah ada sebelum task ini dan di luar sembilan butir, jadi dilaporkan tanpa diubah.

| Data | Migrasi | Catatan |
|---|---|---|
| `pengguna.minat_rumpun` | 019 | |
| `event_sekolah` | 020, 021 | Ikut hapus akun dan ekspor (A9 §1) |
| `pengguna.mapel_pilihan` | 022 | |
| Kesiapan ujian | 023 | |
| Konfirmasi persetujuan di aplikasi | 024 | |
| `kode_otp_email` | 025, 031 | Sebagian disinggung Lampiran C butir 15 |
| Verifikasi email, `pendaftaran_tertunda` | 026 | |
| Wajib buat sandi, batas verifikasi | 027, 028 | |

## 6. Pernyataan di tempat lain (hanya dilaporkan)

| Tempat | Pernyataan | Keadaan |
|---|---|---|
| `LANJUT_App/lib/kebijakan-privasi.json` | Semua kalimat bertanda JSON di bagian 3 | Masih teks lama. Sumber yang dibaca aplikasi |
| `landing/src/data/kebijakan-privasi.json:157` | "fitur hapus akun di aplikasi belum ada" | Tayang di `/privacy/app`. Benar selama saklar mati |
| `docs/surat-persetujuan-ortu-wali-DRAF.md:57–58` | "tidak mengumpulkan lokasi, kontak, foto" | **Tidak benar begitu Portofolio menyala** |
| `docs/surat-persetujuan-ortu-wali-DRAF.md:84` | Hak meminta penghapusan | Benar, belum menyebut hapus akun |
| `docs/kebijakan-v2-klaim-vs-kode.md` H3 | "Fitur hapus akun di app belum ada" | Basi |
| `docs/kebijakan-v2-klaim-vs-kode.md` N1, baris 166 | Tidak mengumpulkan foto | Basi begitu Portofolio menyala |
| `docs/kebijakan-v2-klaim-vs-kode.md` P1, H1 | Jalur Saya | Basi |
| `docs/salinan-teks-lanjut.md:679` | Ringkasan 4: hak penghapusan | Benar. §4.13 belum menyebut Portofolio |
| `docs/lembar-review-draf-teks.md:24, 292` | Ringkasan 4 | Benar |
| `docs/peta-kelengkapan-2026-10-09.md:217` | F28: hapus akun belum ada | Catatan bertanggal |
| `docs/uji-rilis/rencana-uji-rilis.md:81` | App belum punya fitur hapus akun | Catatan bertanggal |
| `docs/kesiapan-rilis-uji.md:332` | Masa simpan belum ditetapkan | Masih benar |
| `docs/SDD-Backend-Foundation.md:621, 845, 1065` | Klaim data tamu | Rancangan lama |
| `docs/SDD-Backend-Foundation.md:1137` | Cadangan wajib sebelum pengguna nyata masuk | Relevan dengan bagian 7 |
| `landing/src/halaman/KebijakanPrivasi.tsx:34` | Kode email dan Google belum dibahas | Masih benar |
| `landing/src/konten/docs.ts:767` | Aplikasi menyimpan data akun dan kemajuan | Benar, ringkas |
| `landing/src/halaman/Ai.tsx:32` | Isi obrolan tidak disimpan | Benar |
| `LANJUT_App/lib/portofolio.ts` (`privasiFoto`) dan `docs/draf-teks-portofolio.md` | "Hanya kamu yang bisa melihat foto ini." | **Terlalu mutlak.** Tim yang mengurus server secara teknis bisa mengakses berkasnya (draf baris 99). Draf kebijakan menulis "hanya terlihat olehmu di aplikasi" |

## 7. Masa simpan: fakta teknis

Tidak ada angka yang diisi. Yang terlihat dari repo:

| Data | Perilaku sekarang | Sumber |
|---|---|---|
| Hapus akun | Seketika, tanpa masa tenggang | KD §3; A9 §3 |
| Akun yang lama tidak dipakai | Tidak ada penghapusan otomatis | Tidak ada kode untuk itu |
| Kartu dan butir yang dihapus lunak | Tetap ada sampai akunnya dihapus | A9 §1 |
| Sesi masuk | 90 hari, bergulir | A9 §2 |
| Kode email | Dihapus setelah 24 jam | Lampiran C butir 15(a) |
| Cadangan basis data | `cadangan-db.js` menyimpan 7 berkas terbaru; `cadangan-db.sh` menghapus yang lebih tua dari 7 hari | Kedua alat |
| Jadwal cadangan di Dokploy | **Tidak ada di dokumen.** `docker-compose.yml` tidak punya tugas cadangan, dan `server/Dockerfile` tidak memasang `mysqldump` | `docker-compose.yml`; `server/Dockerfile:5` |
| Cadangan foto | Belum ada | A10 §4 |
| Log server | Tidak ada batas di `docker-compose.yml`. Mengikuti pengaturan host | `docker-compose.yml` |

Usulan pilihannya ada di laporan task.

## 8. Pemeriksaan akhir

- Rujukan ke endpoint klaim di draf: tidak ada. Frasa "data tamu PWA lama" di baris `riwayat_latihan` tetap, karena menjelaskan asal data lama, bukan endpoint.
- "Belum ada" untuk hapus akun: tidak ada.
- `MVP-PWA/data`: tidak ada.
- Isian `[ISI]` di bagian otomatis: tetap 21 dan identik.
- Repo induk hanya punya satu berkas tes di luar `LANJUT_App`, `landing/tests/landing.test.mjs`, dan berkas itu tidak membaca `docs/`.
- `LANJUT_App/server/tests/kebijakan-privasi.test.js` dijalankan pada susunan folder sungguhan (`lanjut_app` `dfea689` bersebelahan dengan `docs/`):
  - Sebelum: 9 dari 9 lolos.
  - Sesudah: 8 dari 9 lolos. Yang gagal: "dokumen DRAF berisi teks kebijakan yang sama persis dengan app". Kegagalan ini akibat langsung bagian 1, dan tesnya tidak diubah.

## 9. Butir keputusan T16

Catatan persetujuan orang tua (`persetujuan`) **ikut terhapus** bersama akun lewat `ON DELETE CASCADE` (A9 §1, §4). Akibatnya, sesudah akun dihapus tidak ada lagi bukti bahwa persetujuan pernah diberikan atau dicabut. Pertanyaannya sudah ada di Lampiran C butir 4. Draf tidak memutuskannya.
