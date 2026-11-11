# Hasil pengisian fakta

**Task:** LANJUT_018 seri v2.
**Dasar:** repo induk commit `d305aae`, `lanjut_app` commit `291e5a6`.
**Diperiksa:** 11 November 2026.
**Sifat:** pencatatan fakta dan sumber. Bukan keputusan hukum, dan belum ditinjau hukum.

Akses ke panel Dokploy, basis data produksi, dan akun OpenRouter tidak tersedia. Nilai bawaan di repo tidak dipakai sebagai fakta tentang server produksi.

**Golongan:** A Dokploy · B bisa ditelusuri dari repo atau dokumentasi resmi · C harus diisi Khalifa · D pertimbangan hukum · E surat.

## 1. Dua puluh tiga butir

Satu butir terjawab oleh keputusan Khalifa (butir 5). Lima butir terisi sebagian, dan sisanya tetap `[ISI]`.

| No | Pertanyaan | Golongan | Status | Bukti |
|---|---|---|---|---|
| 1 | Nama badan pengelola dan alamat | C | `[ISI]` untuk Khalifa | Repo hanya menulis "Kelompok: EDILAKSO GROUP" (`docs/salinan-teks-lanjut.md`) dan paket `com.edilakso.lanjut`. Tidak ada pernyataan badan pengelola atau alamat, jadi tidak disimpulkan |
| 2 | Lama penyimpanan catatan teknis | A | `[ISI]` belum terverifikasi | `docker-compose.yml` tidak mengatur batas log, jadi mengikuti pengaturan host yang tidak terlihat dari repo |
| 3 | Sahkah konfirmasi orang tua di aplikasi | D | `[ISI]` menunggu peninjau | Lihat bagian 5 |
| 4 | Penyedia layanan email dan negaranya | A | `[ISI]` belum terverifikasi | `SMTP_HOST` kosong di `server/.env.example` dan diisi di Dokploy (`docker-compose.yml`) |
| 5 | Tujuan lain pemakaian data | B | terisi (bersumber) | `docs/audit-teks-kebijakan-aplikasi.md` bagian 10 di `lanjut_app`, dan keputusan Khalifa, diperiksa 2026-11-11. Butirnya dihapus dari kebijakan |
| 6 | Siapa yang bisa melihat data | B | terisi sebagian (bersumber) | `server/src/middleware/wajibTim.js` tidak dipasang di rute mana pun; `server/src/db/persetujuan/persetujuan-ortu.js`; `server/tools/metrik-portofolio.js`, diperiksa 2026-11-11. Siapa orangnya tetap `[ISI]`. Lihat bagian 3 |
| 7 | Penyedia server dan lokasinya | A | `[ISI]` belum terverifikasi | `docker-compose.yml` dan `docs/audit-portofolio-server.md` hanya menyebut Dokploy. Lokasi tidak ditebak dari domain |
| 8 | Apakah sekolah atau guru nanti bisa melihat data | C | `[ISI]` untuk Khalifa | Saat ini tidak ada fiturnya. Rencana ke depan adalah keputusan |
| 9 | Penyedia model yang menerima data | B | `[ISI]` belum terverifikasi | Nilai `ai_model` dan `ai_penyedia_only` produksi ada di basis data. Lihat bagian 2 dan 4 |
| 10 | Negara pemrosesan AI dan dasar pengirimannya | D | `[ISI]` menunggu peninjau | Negara bergantung pada penyedia yang belum pasti (bagian 4). Dasar pengiriman adalah pertimbangan hukum |
| 11 | Hak cipta modul guru atau penerbit | D | `[ISI]` menunggu peninjau | `lib/modul.ts` hanya memperingatkan "Unggah hanya materi yang boleh kamu pakai untuk belajar pribadi". Isi tidak diperiksa, dan tidak ada ketentuan lisensi |
| 12 | Mesin pencari | B | terisi sebagian (bersumber) | https://openrouter.ai/docs/guides/features/zdr dan https://openrouter.ai/docs/guides/features/plugins/web-search, diperiksa 2026-11-11. Nilai `ai_web_mesin` produksi tetap `[ISI]`. Lihat bagian 4 |
| 13 | Yang disimpan OpenRouter dan penyedia model | B | terisi sebagian (bersumber) | https://openrouter.ai/docs/guides/privacy/data-collection, diperiksa 2026-11-11. Pengaturan akun dan penyedia model tetap `[ISI]` |
| 14 | Apakah akun dasar butuh persetujuan | D | `[ISI]` menunggu peninjau | Lampiran C draf butir 1 |
| 15 | Cara meminta penghapusan | B | terisi sebagian (bersumber) | https://openrouter.ai/docs/guides/features/input-output-logging dan https://privacy.claude.com/en/articles/7996875-can-you-delete-data-that-i-sent-via-api, diperiksa 2026-11-11. Cara LANJUT meneruskannya tetap `[ISI]` |
| 16 | Waktu tanggapan dan verifikasi pemohon | D | `[ISI]` menunggu peninjau | Tidak ada standar di repo. SLA tidak ditetapkan sendiri |
| 17 | Perlindungan di server | A | terisi sebagian (bersumber) | `app.config.ts:59-66`, `:88`; `docs/rilis/lanjut-1.0.0.md`, diperiksa 2026-11-11. Jadwal cadangan tidak ada di `docker-compose.yml`, jadi tetap `[ISI]` |
| 18 | Kapan persetujuan diminta ulang | D | `[ISI]` menunggu peninjau | Sistem punya `persetujuan_versi_min_ortu`, tetapi kapan dipakai adalah pertimbangan |
| 19 | Cara memberi tahu perubahan kebijakan | C | `[ISI]` untuk Khalifa | Aplikasi meminta siswa menerima ulang (`components/screens/TerimaKebijakan.tsx`). Cara memberi tahu orang tua tidak ada di repo |
| 20 | Kontak resmi dan petugas pelindungan data | C | `[ISI]` untuk Khalifa | Repo hanya memuat alamat email untuk kiriman cerita alumni (`components/screens/CeritaAlumniScreen.tsx:13`), tanpa pernyataan bahwa itu kontak resmi, jadi tidak dipakai |
| 21 | Kop surat sekolah | E | `[ISI]` untuk Khalifa | Tergantung sekolah |
| 22 | Nomor versi di surat | E | `[ISI]` untuk Khalifa | Versi tetap 1 sampai diputuskan. Lihat `docs/audit-teks-kebijakan-aplikasi.md` bagian 8 di `lanjut_app` |
| 23 | Penanda tangan dari sekolah | E | `[ISI]` untuk Khalifa | Tergantung sekolah |

## 2. Yang terlihat dari repo tentang AI

Nilai ini bawaan migrasi. Nilai produksi bisa berbeda.

| Pengaturan | Bawaan | Letak |
|---|---|---|
| `ai_aktif` | `0` | `server/src/db/migrasi/015_ai_pengaturan.sql` |
| `ai_model` | `anthropic/claude-sonnet-5.5` | sama |
| `ai_data_collection` | `deny` | sama |
| `ai_zdr` | `0` | sama |
| `ai_penyedia_only` | kosong | sama |
| `ai_web_aktif` | `0` | `server/src/db/migrasi/016_ai_materi.sql` |
| `ai_web_mesin` | kosong | `server/src/db/migrasi/017_ai_web_mesin.sql` |

## 3. Siapa yang bisa mengakses, per kategori data

| Data | Lewat aplikasi | Lewat server |
|---|---|---|
| Foto Portofolio | Hanya akun siswa yang bersangkutan. Siswa lain tidak bisa melihatnya (`server/tests/portofolio.test.js`) | Pengelola layanan secara teknis bisa mengakses penyimpanannya (K29) |
| Data akun, kartu, modul, latihan, Persiapan Event | Hanya akun pemilik (`server/tests/modul.test.js`) | Siapa pun yang memegang akses basis data |
| Status persetujuan | Akun pemilik | Petugas lewat `npm run persetujuan-ortu` |
| Hitungan Portofolio | Tidak ada | `npm run metrik-portofolio`: jumlah, dan ID akun bila diminta, tanpa isi |
| Pemakaian AI harian | Tidak ada | `npm run pemakaian-ai`: gabungan, tanpa ID akun |
| Catatan teknis | Tidak ada | Siapa pun yang memegang akses server |
| Isi obrolan | Memori aplikasi siswa | Tidak disimpan di server LANJUT |

Peran `tim` ada di skema, tetapi tidak ada rute yang memakainya.

## 4. Sumber luar

Semua diperiksa 11 November 2026.

| Sumber | Yang dinyatakan |
|---|---|
| https://openrouter.ai/docs/guides/privacy/data-collection | Prompt dan balasan tidak disimpan kecuali pencatatan dinyalakan, atau konten ditandai sebagai kemungkinan CSAM. Metadata seperti jumlah token dan latensi tetap disimpan |
| https://openrouter.ai/docs/guides/features/input-output-logging | Log disimpan minimal 3 bulan bila fiturnya dinyalakan. Pemilik akun bisa meminta penghapusan lewat dukungan OpenRouter. Tidak dipakai untuk pelatihan model |
| https://openrouter.ai/docs/guides/features/zdr | ZDR hanya berlaku untuk routing inferensi, tidak untuk plugin dan alat seperti pencarian web |
| https://openrouter.ai/docs/guides/features/plugins/web-search | Tanpa `engine`, dipakai pencarian bawaan penyedia bila ada, selain itu Exa. Pencarian bawaan dipakai untuk model Anthropic. Halaman tidak menyebut `data_collection` |
| https://openrouter.ai/docs/guides/routing/provider-selection | `data_collection: deny` membatasi ke penyedia yang tidak mengumpulkan data. Tanpa `only`, OpenRouter memilih penyedia secara otomatis |
| https://openrouter.ai/api/v1/models/anthropic/claude-sonnet-5.5/endpoints | Model itu punya 10 titik layanan: Google, Amazon Bedrock, Azure, Claude Platform on AWS, dan Anthropic, dengan label global, AS, dan Eropa. Jadi lokasi OpenRouter tidak sama dengan lokasi penyedia model |
| https://openrouter.ai/privacy (terakhir diperbarui 31 Agustus 2026) | Data pribadi bisa dipindahkan ke server di AS dan negara lain. Masa simpan "selama wajar diperlukan". Situs ditujukan bagi pengguna 18 tahun ke atas |
| https://openrouter.ai/terms (terakhir diperbarui 31 Agustus 2026) | Pemegang akun minimal 18 tahun. Tidak ada aturan usia untuk pengguna akhir pelanggan |
| https://privacy.claude.com/en/articles/7996866-how-long-do-you-store-my-organization-s-data (1 Juli 2026) | Masukan dan keluaran API dihapus dalam 30 hari, dengan pengecualian. Pelanggaran kebijakan disimpan sampai 2 tahun |
| https://privacy.claude.com/en/articles/7996868-is-my-data-used-for-model-training (18 Agustus 2026) | Data produk komersial, termasuk API, tidak dipakai melatih model secara bawaan |
| https://privacy.claude.com/en/articles/7996875-can-you-delete-data-that-i-sent-via-api (16 Maret 2026) | Pelanggan API berbayar tidak dilayani penghapusan satu per satu |

Masa simpan Anthropic baru berlaku bila Anthropic yang menjalankan model. Karena penyedianya belum pasti, angka 30 hari tidak ditulis di kebijakan.

`https://openrouter.ai/docs/guides/privacy/provider-logging` menyebut tabel kebijakan per penyedia, tetapi tabelnya tidak terbaca, jadi aturan Google, Amazon, dan Azure belum diperiksa.

Dokumentasi OpenRouter menandai plugin `web` yang dipakai kode sebagai usang, dan menyarankan alat server baru. Kode tidak diubah.

## 5. Untuk peninjau hukum

Enam pertanyaan: butir 3, 10, 11, 14, 16, dan 18 di tabel. Tidak ada yang diubah menjadi klaim kebijakan.

Dua pertanyaan tambahan:

1. **Ringkasan latihan dan ujian ke AI.** Faktanya: server memilih satu konteks per pesan (`server/src/modul/ngobrol/konteks.js`). Dikirim oleh server, sesudah disamarkan, dan hanya bila fitur AI aktif:
   - saran latihan: nama mapel dan jenis saran, dihitung dari hasil latihan, bukan riwayat jawaban;
   - ujian: jenis, tanggal, sisa hari, dan nama mapel satu event terdekat, tanpa catatan materi dan kartu;
   - modul: judul dan ringkasan satu modul, paling panjang 600 karakter.

   Kebijakan sudah menyebut dua yang pertama. Surat belum. **Pertanyaan: perlukah rincian ini masuk surat?** Kebijakan dan surat juga masih menulis "hingga 3 potongan modul", sedangkan kode mengirim satu ringkasan.
2. **Konfirmasi orang tua di aplikasi.** Layar `/persetujuan-ortu` mencatat persetujuan tanpa memeriksa identitas, sedangkan kebijakan menyatakan persetujuan "bukan dari centang di aplikasi". Tidak diputuskan di sini.

Catatan tambahan: syarat OpenRouter menetapkan pemegang akun minimal 18 tahun dan tidak mengatur usia pengguna akhir, sedangkan sebagian siswa di bawah 18 tahun.

## 6. Rekomendasi "tujuan lain"

Audit alur data tidak menemukan tujuan di luar yang sudah tertulis di bagian "Untuk apa datanya dipakai". Tidak ada pengiriman laporan ke sekolah, penelitian, analitik, atau iklan di kode.

**Keputusan Khalifa, 11 November 2026:** tidak ada tujuan tambahan yang direncanakan, jadi butir itu dihapus di LANJUT_019.

## 7. Pertanyaan untuk Khalifa

Dari panel Dokploy dan server:

- Lama penyimpanan log, dan jadwal cadangan database serta volume foto (butir 2, 17).
- Penyedia dan lokasi server (butir 7).
- Nilai `SMTP_HOST` dan penyedianya (butir 4).
- Nilai `ai_aktif`, `ai_model`, `ai_penyedia_only`, `ai_web_aktif`, dan `ai_web_mesin` di basis data produksi (butir 9, 12).

Dari akun OpenRouter:

- Apakah Input & Output Logging dan pemakaian data untuk peningkatan produk mati (butir 13).

Informasi:

- Badan pengelola dan alamat, kontak resmi (butir 1, 20).
- Siapa yang memegang akses server (butir 6).
- Rencana akses sekolah atau guru (butir 8).
- Cara memberi tahu perubahan, dan cara meneruskan permintaan hapus (butir 15, 19).
- Kop surat, nomor versi, dan penanda tangan (butir 21, 22, 23).
