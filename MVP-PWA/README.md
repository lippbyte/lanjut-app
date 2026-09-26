# LANJUT — aplikasi (PWA)

Kerangka aplikasi LANJUT. Sesuai Keputusan §8 di `docs/prd-sdd-lanjut.md`:
**HTML/CSS/JS murni, tanpa kerangka kerja luar, multi-halaman statis (bukan SPA).**

Tidak ada build step, tidak ada npm, tidak ada dependensi. Satu-satunya berkas
dari luar adalah Poppins dari Google Fonts — sama seperti landing page.

## Menjalankan

`fetch()` tidak jalan lewat `file://`, jadi buka lewat server statis apa pun:

```
cd app
python -m http.server 8080      # atau: npx serve .
```

Lalu buka <http://localhost:8080>.

Membuka `index.html` langsung dari Explorer tetap menampilkan seluruh halaman
dan navigasinya — yang tidak jalan cuma pemuatan `data/*.json`, dan itu memang
belum dipakai halaman mana pun.

## Isi

```
index.html            splash → onboarding.html (profil belum ada)
                              → beranda.html    (profil sudah ada)
onboarding.html       4 layar cerita + 2 pertanyaan → tulis profil
beranda.html          tenggat terdekat, linimasa, pintu ke arsip & alumni
khusus-smk.html       6 butir "apa yang beda" + "apa yang bisa dilakukan"
pilih-mapel.html      prodi → mapel pendukung → saran 2 mapel TKA
checklist.html        11 butir, 3 kategori
alumni.html           2 cerita contoh  ← TIDAK ada di navigasi bawah
arsip.html            daftar mapel + kartu
arsip-detail.html     kartu satu mapel, tab Semua/Catatan/Soal
arsip-tambah.html     formulir kartu baru
latihan.html          satu kartu, lihat jawaban, benar/salah
latihan-selesai.html  hasil sesi per mapel
bank-soal.html        soal mitra, identitas penyedia wajib tampil

assets/tokens.css     token — Bagian 1 salinan persis landing page
assets/app.css        kelas komponen bersama
assets/app.js         profil localStorage, splash, langkah onboarding
assets/levelin.css    styling Level-In (FL1–FL6) — lihat catatan di bawah
assets/img/           maskot & wordmark (dari bundle mockup)
data/*.json           data contoh sesuai skema §13
manifest.webmanifest  manifes PWA
```

### Level-In (fitur P1, confidence gap tracker)

`assets/levelin.css` berisi styling untuk lima komponen (§7 di
`docs/SDD-LevelIn.md`): pemilih keyakinan, strip pembanding gap, ringkasan
kalibrasi akhir sesi, kartu CTA "Latihan Hari Ini", dan penanda status per
mapel. Markup-nya sudah ditambahkan ke `beranda.html`, `latihan.html`, dan
`latihan-selesai.html` — semuanya mulai `[hidden]` dan menunggu
`assets/levelin.js` (logika, belum dibuat) untuk membuka & mengisinya.
Kontrak `data-*` yang dipakai levelin.js dijelaskan lewat komentar di setiap
titik pemasangan.

`arsip.html` **sengaja tidak** mendapat penanda status kalibrasi (§7.6):
keputusan §10.2 no. 3 SDD-LevelIn.md (gratis/berbayar) belum diambil, dan
komponen itu tidak boleh dirender sampai keputusannya ada. Kelas CSS-nya
(`.levelin-status-badge`) sudah siap dipakai begitu keputusan itu turun.

Teks Level-In ada di `docs/salinan-teks-lanjut.md` §4.8, ditulis lebih dulu
sesuai SDD §7.7 — jangan menulis kalimat Level-In baru langsung di HTML/JS.

## Navigasi bawah — empat ikon, tidak pernah lebih

Beranda · Khusus SMK · Pilih Mapel · Checklist.

`alumni.html` sengaja **tidak** mendapat ikon; satu-satunya jalan ke sana adalah
tautan di `beranda.html`. Halaman cabang (`arsip*`, `latihan*`, `bank-soal`)
memakai navigasi yang sama tetapi menandai **Beranda** sebagai tab aktif.

## Profil pengguna

Ditulis `onboarding.html`, dibaca `pilih-mapel.html` di sesi berikutnya.

```js
localStorage['lanjut.profil.v1'] = {
  kelas:        "10" | "11" | "12",
  prodi_impian: "<id prodi>" | "belum",
  dibuat_pada:  "2026-08-20T04:12:33.000Z"
}
```

`prodi_impian: "belum"` adalah jawaban sah, bukan keadaan rusak — PRD F3
mewajibkan jalur "belum tahu prodi" tetap menghasilkan keluaran berguna.

Catatan model data: §13 menamai kolom ini `prodi_tujuan`. Pemetaan
`prodi_impian → prodi_tujuan` dilakukan di satu tempat saja saat lapisan API
dibuat, jangan diganti nama di seluruh halaman.

## Yang BELUM ada

Ini kerangka. Yang sengaja belum dikerjakan:

- **Logika fitur.** Isi halaman masih ditulis langsung di HTML; `data/*.json`
  sudah siap tapi belum disambungkan. Pemuatnya sudah ada: `LANJUT.muatData()`.
- **Penyimpanan kemajuan checklist** (entitas `kemajuan`, §13).
- **Service worker.** Tanpa ini aplikasi belum bisa dipasang penuh dan belum
  jalan luring. Mode luring penuh memang P2 (§6), tapi service worker minimal
  perlu ada sebelum disebut PWA yang bisa dipasang.
- **Ikon PWA ukuran 192 & 512.** Manifes sementara menunjuk satu berkas 1048px.

## Aturan data: tidak ada yang diverifikasi

**Tidak ada satu pun data di `data/` yang berasal dari sumber resmi.** Semuanya
disalin dari mockup desain atau ditulis sebagai contoh. Karena itu setiap
berkas membawa:

```json
"status": "belum_diverifikasi",
"asal":   "mockup" | "contoh",
"diperiksa_pada": null
```

`diperiksa_pada` **null di mana-mana, dan memang disengaja** — belum ada
manusia yang membuka sumbernya dan mencocokkan. `url_sumber` artinya *tempat
memverifikasi*, bukan tempat data ini diambil.

Tiga aturan yang mengikat selama status itu belum berubah:

1. **Jangan mengarang atau mengganti tanggal.** Tanggal mockup dibiarkan apa
   adanya sebagai contoh; ia tidak boleh "diperbaiki" jadi tebakan yang
   terdengar lebih meyakinkan.

2. **Jangan menulis "Sumber: Laman resmi SNPMB" di antarmuka.** Itu klaim yang
   tidak benar. Yang dipakai: `Perlu dicek ke laman resmi SNPMB · belum
   diverifikasi`.

3. **Peringatan wajib terbaca sebelum datanya.** Di `beranda.html` itu berarti
   blok `.peringatan` di atas kartu linimasa, lencana `Contoh · belum
   diverifikasi` di kartu tenggat, dan `data-verifikasi="belum"` di tiap butir.

Cara melepasnya: buka `url_sumber`, cocokkan tiap nilai, isi `diperiksa_pada`,
ubah `asal` jadi `"resmi"` dan `status` jadi `"terverifikasi"` — baru setelah
itu peringatannya boleh dihapus.

Ini bukan kehati-hatian berlebihan: PRD F1 melarang menampilkan tanggal yang
belum diverifikasi, dan §10 mencatat informasi seleksi yang keliru sebagai
risiko fatal yang tidak bisa diperbaiki setelah tenggat lewat.

**Cerita alumni** punya aturan sendiri: kedua cerita di `data/cerita-alumni.json`
bertanda `sumber: "contoh"`, `izin_tayang: false`, `tayang: false`. PRD F4
mewajibkan izin tertulis sebelum tayang, dan rilis butuh minimal 3 cerita nyata.

## Memeriksa kerangka

Tanpa dependensi, tanpa build. Jalankan sebelum commit:

```
node tools/validasi.js
```

Tiga suite, 60+ pemeriksaan:

| Suite | Berkas | Yang dijaga |
|---|---|---|
| Struktur & aturan data | `tools/check.js` | tautan mati, aset hilang, jangkar, token tak terdefinisi, tag berpasangan, satu `<h1>` per halaman, `alt` di tiap gambar, **nav tepat 4 ikon**, **alumni tanpa ikon nav**, **klaim verifikasi palsu**, **peringatan linimasa tampil selama data belum diverifikasi** |
| Logika `app.js` | `tools/test-app.js` | profil simpan/baca/gabung/hapus, `prodi_impian: "belum"` sah, localStorage rusak atau ditolak tidak melempar, dan **kontrak selector**: tiap hook yang dicari app.js benar-benar ada di HTML-nya |
| Tata letak & desain | `tools/test-desain.js` | tidak ada lebar tetap yang meluap di 360px, Bagian 1 tokens.css identik dengan landing page, Bagian 2 tidak menimpa, teks ada di dokumen sumber, tanpa merah/oranye, tanpa `#000`, fokus tidak pernah dihapus, sasaran sentuh 44px |

Tiga di antaranya menjaga aturan data secara khusus: begitu ada yang menulis
`dicek 6 Agustus 2026`, `Sumber: Laman resmi`, atau mengisi `diperiksa_pada`
di berkas berstatus `belum_diverifikasi`, suite pertama langsung gagal.

## Aturan yang mengikat berkas di folder ini

- Teks diambil dari `docs/salinan-teks-lanjut.md`, tidak ditulis ulang di kode.
- Tidak ada merah atau oranye, termasuk untuk galat dan peringatan. Mendesak
  diwakili biru tua.
- Tiap data resmi mencantumkan sumber dan tanggal pengecekan.
- Tiap layar punya layar kosong yang ditulis, bukan halaman putih.
- Jalan di layar 360px tanpa gulir mendatar.
- Token warna/ukuran tidak ditulis sebagai angka di `app.css` — selalu lewat
  `var(--token)`.
