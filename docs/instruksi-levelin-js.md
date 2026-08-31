# Instruksi: Bangun `app/assets/levelin.js`

**Status sebelum ini:** CSS dan markup HTML Level-In sudah lengkap (termasuk komentar "Kontrak untuk levelin.js" di tiap file). SDD sudah final. Satu-satunya yang hilang adalah file logikanya sendiri.
**Bukan tugas sesi ini:** menyambungkan ke backend (`server/src/modul/levelin/*.js`). SDD-LevelIn.md §10.3 menegaskan Level-In v1 **client-only** — backend itu untuk fase sinkronisasi nanti, di luar cakupan sesi ini.
**Tidak boleh disentuh:** `app.js`, `app.css`, `tokens.css`, file P0 (`onboarding.html`, `khusus-smk.html`, `pilih-mapel.html`, `checklist.html`, `alumni.html`), struktur nav 4 ikon.

---

## Prompt untuk Claude Code

Lampirkan: `docs/SDD-LevelIn.md` (lengkap), `docs/PRD-LevelIn.md`, dan seluruh isi `app/` (untuk membaca komentar kontrak yang sudah tertanam di HTML).

```
Bangun app/assets/levelin.js. Ini SATU-SATUNYA file yang hilang — CSS dan
markup HTML sudah lengkap di beranda.html, latihan.html,
latihan-selesai.html, arsip.html. Baca komentar "Kontrak untuk levelin.js"
di tiap file itu dulu — itu spesifikasi yang wajib dipenuhi persis, bukan
saran.

JANGAN sentuh app.js, app.css, tokens.css, atau file P0 (onboarding,
khusus-smk, pilih-mapel, checklist, alumni). JANGAN sambungkan ke
server/src/modul/levelin/* — itu di luar cakupan, SDD-LevelIn.md §10.3
menegaskan v1 client-only.

Ikuti SDD-LevelIn.md persis pada bagian berikut (jangan menafsir ulang):

1. STRUKTUR MODUL (§5.2) — satu file, IIFE, pola sama seperti app.js:
   (function(global){ ... })(window). Empat lapisan:
   - Konfigurasi: KONFIG_BAWAAN, muatKonfig()
   - Keputusan (murni, tanpa DOM/jam/storage): gapNumerik(), klasifikasiKartu(),
     agregatPerMapel(), ringkasSesi(), saranHarian()
   - Penyimpanan: Kalibrasi.baca()/.catat()/.pangkas(), Sesi.mulai()/.baca()/
     .simpan()/.tutup() — semua dibungkus try/catch, storage rusak/mati
     mengembalikan keadaan kosong, tidak pernah melempar
   - Pemasangan UI: pasangKeyakinan(), pasangPembandingGap(),
     pasangRingkasanSesi(), pasangSaranBeranda() — hanya mengisi slot
     [data-isi] dan toggle [hidden], TIDAK PERNAH merakit markup dari teks
   Ekspor hanya lapisan Keputusan ke global.LANJUT_LEVELIN (§5.2) — lapisan
   Penyimpanan dan Pemasangan UI tidak diekspor, sama seperti app.js.

2. RUMUS PERSIS (§6.1) — implementasikan tanpa modifikasi:
   - gapNumerik: p_yakin = (keyakinan-1)/4, gap = p_yakin - (benar?1:0)
   - klasifikasiKartu: 5 kelas (overconfident/underconfident/netral/selaras)
     sesuai tabel §6.1b, ambang dari config bukan hardcode
   - agregatPerMapel: jendela N kartu terakhir per mapel (K4, bawaan 50),
     perbandingan pakai >= bukan >, mapel dengan 0 kartu tetap muncul
     dengan status_data='belum_cukup_data' dan rate=null (bukan 0)
   - saranHarian: rantai fallback 5 tingkat persis urutan §6.1f
     (arsip_kosong → saran → kalibrasi_selaras → belum_cukup_data →
     pengguna_baru), dengan tie-break rate DESC → kartu_dikerjakan DESC →
     mapel_id ASC (supaya saran tidak berubah-ubah tiap reload)

3. SKEMA PENYIMPANAN (§3.3) — DUA kunci persis ini, jangan diubah namanya:
   - localStorage['lanjut.levelin.v1'] — riwayat kalibrasi permanen
   - sessionStorage['lanjut.levelin.sesi.v1'] — keadaan sesi berjalan
   Struktur objek persis seperti contoh di §3.3. ID pakai
   crypto.randomUUID() dengan cadangan prefiks+Date.now()+acak4() (§3.4,
   crypto.randomUUID tidak tersedia di file://).

4. ALUR TAP (§6.2) — PENTING, ini kontrak UX yang sudah dikunci:
   tepat SATU tap tambahan per kartu (pilih keyakinan), bukan dua. Strip
   pembanding gap TIDAK BOLEH menuntut tap tambahan — muncul otomatis di
   kartu berikutnya lewat sesi.umpan_balik_tertunda, dengan aria-live="polite".
   Jangan implementasikan varian "tombol lanjut" — itu sudah ditolak
   eksplisit di §6.2 karena melebihi anggaran tap.

5. PEMUATAN SKRIP (§5.3) — tambahkan
   <script src="assets/levelin.js" defer></script>
   di beranda.html, latihan.html, latihan-selesai.html, arsip.html — SETELAH
   tag app.js (urutan defer bergantung pada urutan tulis). Setiap pasangX()
   dibungkus try/catch di titik masuknya sendiri: kalau levelin.js gagal
   sepenuhnya, halaman P0 tetap tampil normal dengan isi cadangan statis
   yang sudah ada di HTML.

6. FL6 SUDAH FINAL GRATIS (§6.3, §10.1) — jangan bangun percabangan
   akses berbayar. Baca kunci konfigurasi akses.ringkasan_kalibrasi_sesi
   dari config (bukan hardcode "selalu tampil"), tapi hanya jalur 'gratis'
   yang perlu benar-benar berfungsi dan diuji.

7. arsip.html Task 5 (badge status per mapel) — LEWATI. Ini menunggu
   keputusan §10.2 poin 3 yang belum final. Jangan render badge apa pun
   di arsip.html sampai ada keputusan eksplisit.

Setelah selesai, buat tools/test-levelin.js sesuai §5.4: uji klasifikasi
tiap kombinasi 1-5 × benar/salah, batas rate tepat di 0.40 dan 0.399,
kartu_dikerjakan tepat 4 vs 5, keyakinan:null tidak ikut dihitung, urutan
tie-break saran tetap konsisten, localStorage rusak tidak melempar error.
Daftarkan suite ini ke tools/validasi.js yang sudah ada.

Test manual wajib sebelum commit: buka latihan.html, pilih keyakinan,
pastikan tombol "Lihat jawaban" tertahan sampai keyakinan dipilih, tandai
Benar/Salah, cek localStorage['lanjut.levelin.v1'] benar-benar terisi,
reload halaman beranda, cek kartu CTA "Latihan Hari Ini" muncul dengan
variant yang sesuai.
```

---

## Setelah levelin.js selesai

Jalankan verifikasi independen (bukan dari sesi yang sama yang membangun) — sama prinsipnya seperti `todo-verifikasi-v1.md` untuk F1-F9:

- [ ] Chip keyakinan 1-5 di `latihan.html` benar-benar mengubah state, bukan dekorasi
- [ ] Tombol "Lihat jawaban" tertahan sampai keyakinan dipilih (cek dengan devtools, coba klik sebelum pilih keyakinan)
- [ ] `localStorage['lanjut.levelin.v1']` terisi setelah menjawab kartu, bertahan setelah reload
- [ ] Kartu CTA di Beranda menampilkan salah satu dari 5 varian yang benar sesuai kondisi data
- [ ] Sesi latihan tetap 3 tap per kartu (bukan 4) — hitung manual sekali
- [ ] Tidak ada elemen P0 (nav 4 ikon, kartu tenggat F1) yang berubah styling/posisi
