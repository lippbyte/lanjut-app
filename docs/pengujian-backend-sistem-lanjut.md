# Pengujian Backend & Sistem — LANJUT

**Kelompok:** EDILAKSO GROUP
**Sumber kebenaran:** `prd-sdd-lanjut.md` — setiap kasus uji di bawah diturunkan langsung dari kriteria penerimaan (Bagian 6), model data (Bagian 13), alur pengguna (Bagian 14), dan Definisi Selesai (Bagian 15) di dokumen itu. Kalau ada perbedaan, `prd-sdd-lanjut.md` yang benar — dokumen ini hanya menerjemahkannya jadi kasus uji.

**Cakupan:** lapisan backend & sistem (API, basis data, logika bisnis). Pengujian tampilan/UI ada di dokumen terpisah (`tabel-pengujian-lanjut.docx`).

---

## Cara pakai (instruksi untuk penguji / Claude Code — qa-reviewer)

1. Jalankan setiap kasus uji terhadap kode dan basis data yang sudah diimplementasikan — bukan terhadap desain atau asumsi.
2. Tandai setiap baris: `✅ Lolos` / `❌ Gagal` / `⚠️ Perlu klarifikasi`, dengan catatan singkat kalau gagal (nama file, query, atau endpoint yang jadi bukti).
3. Rujuk nama tabel/kolom persis dari Bagian 13 `prd-sdd-lanjut.md`. Jangan menebak nama field yang tidak ada di skema.
4. Kasus uji di bawah **P0** adalah syarat rilis. Satu kegagalan P0 = status fitur itu **BLOCKER**, laporkan ke PM sebelum lanjut ke fitur lain.
5. Setelah semua bagian dijalankan, isi **Ringkasan Akhir** di bagian paling bawah sebagai laporan ke PM.

---

## 1. Model Data & Skema Basis Data

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 1.1 | Tabel `prodi_mapel` adalah penghubung many-to-many: ada ≥1 `prodi_id` dengan ≥2 `mapel_id` terkait, dan ≥1 `mapel_id` yang terkait ke ≥2 `prodi_id` | | |
| 1.2 | Kolom `kartu.sumber` ada dan bisa membedakan minimal 1 kelas kepercayaan (resmi/pengguna/mitra), meski v1 baru memakai kelas "resmi" | | |
| 1.3 | Tabel `riwayat_latihan` menyimpan satu baris per jawaban (bukan hanya skor akhir per sesi) | | |
| 1.4 | Setiap tabel konten (`tahapan_linimasa`, `butir_khusus_smk`, `cerita_alumni`) punya kolom `url_sumber` dan `diperiksa_pada` sejak skema pertama — bukan ditambahkan belakangan | | |
| 1.5 | Tabel `kemajuan` menyimpan `pengguna_id`, `butir_id`, `selesai_pada` — dan bertahan lintas sesi (query ulang setelah logout-login mengembalikan data yang sama) | | |

---

## 2. F1 — Linimasa *(P0)*

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 2.1 | Endpoint mengembalikan tahapan terurut sehingga tenggat terdekat ada di posisi pertama, tanpa memerlukan sorting tambahan di frontend | | |
| 2.2 | Setiap record wajib punya `url_sumber` dan `diperiksa_pada` terisi (tidak `null`/kosong) — endpoint menolak atau menyaring record yang tidak lengkap | | |
| 2.3 | Tahapan yang `tanggal_selesai`-nya sudah lewat tetap ada di data (tidak di-`DELETE`), cukup ditandai statusnya | | |
| 2.4 | Nilai yang dikirim API untuk tenggat adalah jumlah hari (integer), bukan timestamp/detik yang di-hitung-mundur di frontend | | |

---

## 3. F2 — Khusus SMK *(P0)*

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 3.1 | Minimal 5 baris `butir_khusus_smk` tersedia di basis data sebelum rilis | | |
| 3.2 | Setiap baris punya `apa_yang_beda` DAN `apa_yang_bisa_dilakukan` terisi (bukan string kosong/placeholder) | | |

---

## 4. F3 — Penolong Pilih Mapel *(P0 — pembeda utama, uji paling ketat)*

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 4.1 | Endpoint menerima `prodi_id` **atau** flag "belum tahu prodi", dan kasus "belum tahu" tetap mengembalikan output yang berguna (bukan array kosong) | | |
| 4.2 | Response mencantumkan status `tersedia_di_smk` untuk setiap mapel pendukung prodi yang dipilih | | |
| 4.3 | Response menyertakan saran 2 mapel pilihan TKA, diambil berdasarkan `prodi_mapel.bobot` tertinggi — bukan urutan acak/alfabetis | | |
| 4.4 | Ada flag/peringatan eksplisit di response ketika prodi menuntut mapel dengan `tersedia_di_smk = false` | | |
| 4.5 | Response menyertakan teks disclaimer wajib: *"Ini rangkuman, bukan keputusan resmi. Cek laman SNPMB."* — bukan hanya ditulis di frontend | | |

---

## 5. F4 — Cerita Alumni SMK *(P0)*

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 5.1 | Minimal 3 baris `cerita_alumni` dengan `izin_tayang = true` tersedia sebelum rilis | | |
| 5.2 | Endpoint publik **tidak pernah** mengembalikan baris dengan `izin_tayang = false` — uji dengan menyisipkan 1 baris `izin_tayang = false` dan pastikan tidak muncul di response | | |
| 5.3 | Baris yang tayang punya seluruh kolom wajib terisi: `asal_smk`, `jurusan_smk`, `ptn`, `prodi`, `jalur`, `hambatan`, `yang_dilakukan` | | |

---

## 6. F5 — Daftar Periksa *(P0)*

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 6.1 | Progres di tabel `kemajuan` bertahan setelah aplikasi/sesi ditutup dan dibuka kembali | | |
| 6.2 | `butir_daftar_periksa` disaring oleh `berlaku_untuk_kelas` dan `berlaku_untuk_jalur` **di level query backend**, bukan hanya disembunyikan di frontend | | |

---

## 7. Alur Sistem End-to-End (SDD Bagian 14)

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 7.1 | **Alur A** (pengguna baru): submit kelas & prodi tersimpan ke tabel `pengguna`, dan Linimasa termuat dari 1 request tanpa perlu memanggil endpoint lain lebih dulu | | |
| 7.2 | **Alur B** (pengguna kembali): 1 request tunggal mengembalikan tenggat terdekat + 1 langkah berikutnya (bukan beberapa round-trip berurutan) | | |
| 7.3 | **Alur C** (admin isi konten): endpoint tulis untuk tahapan/butir/cerita **menolak simpan** kalau `url_sumber` atau `diperiksa_pada` kosong | | |

---

## 8. Keadaan Tepi (PRD Bagian 5 — cerita #9–11)

| # | Kasus uji | Hasil | Catatan |
|---|---|---|---|
| 8.1 | Pengguna baru tanpa data apa pun tetap mendapat response berguna dari tiap endpoint utama (bukan array kosong tanpa fallback berarti) | | |
| 8.2 | Tidak ada logika di backend yang mem-*flag*, mereset, atau memberi penalti pada progres pengguna yang tidak aktif > 7 hari | | |
| 8.3 | Saat koneksi terputus, endpoint/klien tidak gagal total (error 500) — minimal data yang sudah pernah diambil tetap bisa ditampilkan dari cache | | |

---

## 9. Risiko yang Wajib Diuji Eksplisit (PRD Bagian 10)

| # | Risiko | Kasus uji pembuktian | Hasil | Catatan |
|---|---|---|---|---|
| 9.1 | Informasi seleksi keliru (dampak fatal, tidak bisa dibatalkan) | Tidak ada satu pun record `tahapan_linimasa` tanpa `url_sumber` yang lolos ke endpoint publik | | |
| 9.2 | Arsip (F6) berpotensi kosong selamanya | *(P1, cek hanya jika F6 sudah diimplementasikan)* kartu kurasi tim sudah ada di database sebelum pengguna bisa menambah kartu sendiri | | |
| 9.3 | Cerita alumni tidak terkumpul → F4 kosong | Endpoint F4 punya fallback/empty-state yang valid ketika `cerita_alumni` masih < 3 baris (bukan error) | | |

---

## 10. Definisi Selesai per Fitur (PRD Bagian 15 — sisi backend)

| # | Kriteria | Hasil | Catatan |
|---|---|---|---|
| 10.1 | Setiap fitur punya keadaan galat (error state) yang terdefinisi di API — bukan crash/500 mentah | | |
| 10.2 | Data resmi yang dikembalikan API selalu menyertakan `sumber` dan tanggal pengecekan | | |
| 10.3 | Fitur sudah dicoba end-to-end oleh minimal 1 orang di luar tim pengembang (catat nama & tanggal) | | |

---

## Hasil Uji Otomatis (`server/` — `npm test`)

**Dijalankan:** 26 Sep 2026, commit `12f01ff`, Node v24.13.0, MySQL 8.0.30 (Laragon) dengan basis data `lanjut_test`.
**Hasil:** 40 uji — **40 lolos**, 0 gagal, 0 dibatalkan, 0 dilewati (±13 detik).

Uji ini adalah uji integrasi terhadap MySQL nyata (bukan mock). Kalau MySQL tidak menyala, 32 dari 40 uji gagal dengan `ECONNREFUSED 127.0.0.1:3306` — itu masalah lingkungan, bukan kode.

| Berkas uji | Jumlah | Hasil | Yang diuji |
|---|---|---|---|
| `auth.test.js` | 18 | ✅ 18 lolos | daftar, masuk, keluar, ubah sandi, `/auth/saya`, penguncian setelah 5 kali gagal (429), validasi `prodi_impian` |
| `kartu-otorisasi.test.js` | 7 | ✅ 7 lolos | `sumber=pengguna` dipaksa di server, kartu privat tidak bocor antar pengguna, 404 (bukan 403) untuk kartu milik orang lain, kartu resmi terlihat semua |
| `konten-agregasi.test.js` | 3 | ✅ 3 lolos | endpoint baru `GET /konten/mapel/agregasi-lintas-prodi` (F3 "belum tahu prodi") hasilnya identik dengan agregasi lama di klien, untuk semua prodi |
| `levelin-keputusan.test.js` | 5 | ✅ 5 lolos (lihat catatan) | fungsi `keputusan.*` |
| `pengguna.test.js` | 2 | ✅ 2 lolos | `PATCH /pengguna/saya` untuk `prodi_impian` |
| `sinkron.test.js` | 5 | ✅ 5 lolos | `/sinkron/klaim`: idempoten, kepemilikan kartu tidak berpindah, profil tersimpan, 401 tanpa login |

**Catatan:**
- **Level-In belum diimplementasikan di backend.** Kelima uji `levelin-keputusan.test.js` hanya memastikan `gapNumerik`, `klasifikasiKartu`, `agregatPerMapel`, `ringkasSesi`, dan `saranHarian` *masih melempar galat "belum diisi (TODO)"*. Lolosnya uji ini **tidak** berarti logika Level-In berjalan.
- **`/sinkron/klaim` dan `/kemajuan` lolos uji tapi belum dipanggil klien mana pun** (PWA maupun Expo) — lihat `prd-sdd-lanjut.md` §10 dan §16 (18 Sep 2026).
- Uji otomatis ini **belum** mencakup matriks kasus uji Bagian 1–10 di atas. Kolom "Hasil" di sana masih perlu diisi dengan pemeriksaan terpisah.

---

## Ringkasan Akhir (diisi Claude Code / qa-reviewer untuk laporan ke PM)

- **Total kasus uji:** ___ | **Lolos:** ___ | **Gagal:** ___ | **Perlu klarifikasi:** ___
- **Status fitur P0 (F1–F5):** Lolos semua / Ada BLOCKER (sebutkan yang mana)
- **Blocker yang wajib diperbaiki sebelum rilis:**
  1.
  2.
- **Catatan tambahan untuk PM:**
