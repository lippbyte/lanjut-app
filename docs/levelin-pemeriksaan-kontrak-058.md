# Pemeriksaan kontrak server Level-In & keyakinan F7 (LANJUT_058, bagian 1)

> Ditulis 9 Oktober 2026 **sebelum** membangun layar, dari kode server di
> `main` sesudah LANJUT_057. Sumber: `server/src/modul/levelin/*`,
> `docs/LANJUT_041_F7-Latihan.md`, `docs/LANJUT_042_Level-In-dan-Audit-Sinkron-Klaim.md`,
> `MVP-PWA/latihan.html`, `MVP-PWA/assets/levelin.js`.

## Ringkasan

- **Keyakinan sudah ada di server. Tidak perlu migrasi.** Kolom
  `riwayat_latihan.keyakinan` ada sejak migrasi 005, dan `POST
  /riwayat-latihan` menerimanya sebagai bilangan bulat **1–5**, opsional dan
  boleh `null` (`levelin.skema.js:25`). Nilai di luar 1–5, pecahan, atau teks
  ditolak 400 oleh zod. App lama yang tidak mengirim keyakinan tetap sah.
- Skala 1–5 adalah skala PWA. App menanyakan tiga pilihan (yakin / ragu /
  tebak) lalu memetakannya ke skala itu (lihat "Pemetaan" di bawah). Tidak ada
  ambang atau rumus yang diubah.
- Tanpa data keyakinan, `/kalibrasi/ringkasan` tetap 200: kalibrasi
  `belum_cukup_data`, dan `level_akurasi` dihitung dari benar/salah saja.
  Sudah diuji di `tests/levelin-kalibrasi.test.js` (LANJUT_042).

## `GET /kalibrasi/ringkasan?jendela=` (wajib login)

Larik, **satu baris per mapel yang dikenal** (semua mapel, termasuk yang
belum pernah dilatih), diurutkan menurut `mapel_id`:

| Kolom | Arti | Sumber |
|---|---|---|
| `mapel_id` | id mapel | tabel `mapel` |
| `kartu_dikerjakan` | jawaban **berkeyakinan** di jendela | `agregatPerMapel` (salinan PWA) |
| `n_overconfident`, `n_underconfident`, `n_selaras`, `n_netral`, `n_benar` | hitungan kelas kartu | idem |
| `rate_overconfident` | `n_overconfident / kartu_dikerjakan`, `null` bila 0 | idem |
| `status_data` | `cukup_data` bila `kartu_dikerjakan ≥ minimum_kartu` (5), selain itu `belum_cukup_data` | idem |
| `pola` | `overconfident` (rate ≥ `ambang_overconfident` 0,40), `selaras`, atau `belum_cukup_data` | idem |
| `level_akurasi` | `{ kartu_dijawab, n_benar, rate_benar, level }`, dari **semua** jawaban (dengan atau tanpa keyakinan) | `levelAkurasiPerMapel` (khusus server, LANJUT_042) |
| `level_akurasi.level` | `belum_cukup_data` (< `level_minimum_kartu` 10), `perlu_penguatan_dasar` (< 50%), `cukup_lanjut_latihan` (50–75%), `sudah_kuat` (> 75%) | `konfigurasi_levelin` |
| `dihitung_pada`, `konfig_versi` | waktu hitung (ISO) dan versi konfigurasi | server |

Jendela: `jendela_per_mapel` (50) jawaban terbaru per mapel; `?jendela=`
1–200 menimpanya untuk satu panggilan.

**Angka "berapa kartu lagi"** tidak ada di respons ini. Ambangnya ada di
endpoint publik `GET /konfigurasi/levelin` (`level_minimum_kartu`,
`minimum_kartu`, berbentuk `{ nilai, versi, dasar, diubah_pada }`). Layar
Level-In mengambil angka dari sana, bukan menuliskannya di app.

## `GET /saran-harian` (wajib login)

`{ jenis, mapel_id, alasan }`, rantai fallback PWA §6.1f, dihitung dari
kalibrasi **keyakinan**:

| `jenis` | Kapan | `mapel_id` | `alasan` |
|---|---|---|---|
| `arsip_kosong` | tidak ada kartu yang boleh dipakai akun (milik sendiri + kurasi terverifikasi) | `null` | `null` |
| `saran` | ada mapel ber-pola `overconfident` yang punya kartu | mapel dengan rate tertinggi | `{ rate_overconfident, kartu_dikerjakan }` |
| `kalibrasi_selaras` | ada mapel `cukup_data` yang tidak overconfident | `null` | `null` |
| `belum_cukup_data` | ada jawaban berkeyakinan, tetapi belum cukup di mapel mana pun | mapel berkartu dengan jawaban berkeyakinan terbanyak | `null` |
| `pengguna_baru` | belum ada jawaban berkeyakinan sama sekali | mapel berkartu pertama menurut abjad | `null` |

## Bagaimana PWA memakai keyakinan

- `MVP-PWA/latihan.html`: sebelum jawaban dibuka, "Seberapa yakin kamu bisa
  jawab ini?" dengan lima tombol: 1 "Ragu banget", 2 "Ragu", 3 "Lumayan
  yakin", 4 "Yakin", 5 "Yakin banget". Di PWA **wajib** dipilih sebelum
  jawaban terbuka.
- `klasifikasiKartu` (salinan persis di `keputusan.js`): 3 = `netral`;
  ≥ `keyakinan_tinggi_minimal` (4) dan salah = `overconfident`; ≤
  `keyakinan_rendah_maksimal` (2) dan benar = `underconfident`; selain itu
  `selaras`.
- `gapNumerik = (keyakinan − 1) / 4 − (benar ? 1 : 0)`, dihitung server dan
  disimpan bersama `kelas_gap` dan `aturan_versi`; kiriman klien untuk kolom
  itu dibuang zod.
- Jawaban **tanpa** keyakinan tidak ikut agregat kalibrasi
  (`ambilRiwayatUntukAgregasi`: `keyakinan IS NOT NULL`), tetapi ikut
  `level_akurasi`.

## Pemetaan tiga pilihan app → skala 1–5

Mengikuti label PWA, bukan angka baru:

| Pilihan di app | Nilai | Label PWA untuk nilai itu |
|---|---|---|
| Yakin | 4 | "Yakin" |
| Ragu | 2 | "Ragu" |
| Tebak | 1 | "Ragu banget" |
| (dilewati) | tidak dikirim | — |

Dengan ambang bawaan, "yakin" lalu salah = terlalu yakin; "ragu" atau
"tebak" lalu benar = terlalu ragu. Nilai 3 (netral) dan 5 tidak ditawarkan.
Pemetaan ada di satu tempat: `LANJUT_App/lib/latihan.ts`.

## Kirim & sinkron

F7 tidak punya antrean luring terpisah. Jawaban sesi dikirim sekaligus di
akhir sesi (`POST /riwayat-latihan`, lalu `PATCH /sesi-latihan/:id`); bila
gagal, tombol "Coba lagi" mengirim ulang catatan yang sama (id dibuat klien,
idempoten). Keyakinan ikut di catatan itu, jadi ikut terkirim ulang.

## Hal yang janggal (dicatat, tidak diubah di task ini)

1. **Tidak ada pola "terlalu ragu".** `agregatPerMapel` menghitung
   `n_underconfident`, tetapi `pola` hanya `overconfident` atau `selaras`.
   Layar hanya bisa menampilkan "terlalu yakin" atau "pas", bukan "terlalu
   ragu", tanpa mengarang aturan baru.
2. **Saran harian hanya dari keyakinan.** Siswa yang rajin latihan tanpa
   mengisi keyakinan tetap mendapat `pengguna_baru` ("mulai dari ...").
3. **Ketersediaan kartu saran ≠ kartu Latihan.** Saran menghitung kartu milik
   sendiri + kurasi terverifikasi, sedangkan Latihan (LANJUT_041) hanya
   memakai kartu milik sendiri. Saran bisa menunjuk mapel yang di Latihan
   tidak punya kartu (saat ini kurasi terverifikasi belum ada).
4. **Dua "minimum" berbeda.** Kalibrasi butuh 5 jawaban berkeyakinan
   (`minimum_kartu`), level butuh 10 jawaban (`level_minimum_kartu`).
5. **"Ragu" dan "tebak" diperlakukan sama oleh klasifikasi** (keduanya ≤ 2);
   bedanya hanya di `gap_numerik`.
