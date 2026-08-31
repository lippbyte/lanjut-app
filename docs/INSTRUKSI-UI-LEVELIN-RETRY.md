# Instruksi Retry: ui-engineer → Level-In UI Implementation

**Agent:** ui-engineer
**Task:** Implementasi Level-In UI (5 komponen)
**Status:** Retry (agent stalled 600s, no progress)
**Timeline:** Paralel dengan QA e2e testing (minggu 4 akhir - minggu 5)
**Constraint:** Jangan touch P0 files — hanya tambah Level-In

---

## ⚠️ Debug: Mengapa Agent Stalled?

Kemungkinan penyebab stall sebelumnya:
1. Agent mencoba parse SDD terlalu detail (overthinking planning)
2. Wireframe path tidak ditemukan
3. Infinite loop di dependency resolution

**Retry strategy:**
- ✅ Skip planning, langsung ke action
- ✅ Gunakan concrete wireframe reference (bukan harus cari file)
- ✅ Modular: satu komponen selesai, commit, lanjut

---

## 1. Context Singkat (Baca, Jangan Terpikir Lama)

### Level-In adalah fitur P1 (priority 2)
- Rilis v1 (3 Sept): **TIDAK perlu Level-In** — P0 saja
- Minggu 5-7: Level-In bisa dikerjakan santai
- Fitur ini: confidence gap tracker = sebelum jawab soal, user rate keyakinan 1-5, lalu compare dengan hasil

### Architecture (dari SDD-LevelIn.md §5)
```
app/
  assets/
    levelin.js      ← Logika Level-In (BACKEND-ENGINEER akan handle, ui-engineer skip)
    levelin.css     ← Styling Level-In komponen saja (UI-ENGINEER buat ini)
  beranda.html      ← Tambahin 1 kartu CTA "Latihan Hari Ini" (update saja, jangan rewrite)
  latihan.html      ← Tambahin alur keyakinan + pembanding gap (update saja)
  latihan-selesai.html ← Tambahin ringkasan kalibrasi (update saja)
  arsip.html        ← Tambahin penanda status mapel (optional, pending decision §10.1)
```

**JANGAN TOUCH:** Bagian P0 dari file-file itu — hanya tambah blok Level-In di slot yang sudah disiapkan.

---

## 2. Tasks Konkret (Urutan Eksekusi)

### Task 1: Buat `app/assets/levelin.css`
**Reference:** SDD-LevelIn.md §7 (komponen wireframe)
**Input:** Token dari `design.md` (palet biru, Poppins, spacing scale)

**Komponen yang perlu styling:**

| Komponen | Referensi SDD | Kelas CSS | Isi |
|---|---|---|---|
| **Chip keyakinan (1-5)** | §7.2 | `.levelin-confidence-chip` | 5 tombol, chip shape, hover state, selected state (highlight biru, text putih) |
| **Strip pembanding gap** | §7.3 | `.levelin-gap-strip` | Alert box (netral warna, bukan merah), teks kecil, tidak pernah di-render sebagai warning |
| **Ringkasan kalibrasi sesi** | §7.4 | `.levelin-summary-block` | Card dengan 2 varian (full & locked), heading + number, link (jika berbayar) |
| **Kartu CTA "Latihan Hari Ini"** | §7.5 | `.levelin-cta-card` | Card yang mirip `.kartu` yang sudah ada, bisa berisi 5 varian teks (lihat §6.1f) |
| **Penanda status mapel** | §7.6 | `.levelin-status-badge` | Badge kecil per baris mapel (3 state: belum data, selaras, overconfident), icon atau label |

**Output:**
- `app/assets/levelin.css` ← berisi 5 kelas di atas, **semua value pakai `var(--token)` dari `tokens.css`**, tidak ada hardcode color/size
- **Constraint:** Tidak boleh perkenalkan warna baru — gunakan token yang ada

**DoD (Definition of Done):**
- [ ] Semua 5 kelas ada
- [ ] Semua value token-based (no hardcode)
- [ ] Responsive 360px-480px (mobile), tidak meluap
- [ ] Selector tidak konflik dengan P0 CSS

---

### Task 2: Update `app/beranda.html` — Tambah Kartu CTA FL4

**Reference:** SDD-LevelIn.md §7.5, wireframe Beranda

**Lokasi:** Bawah kartu linimasa/tenggat, sebelum nav bawah

**HTML struktur:**
```html
<!-- Baru: Kartu CTA Level-In (FL4) -->
<div class="levelin-cta-card" data-isi="saran-harian" hidden>
  <h3>Latihan Hari Ini</h3>
  <p data-teks="cta-saran"></p>
  <button class="tombol-utama">Mulai</button>
</div>
```

**Penjelasan:**
- `data-isi="saran-harian"` ← hook untuk JavaScript nanti (levelin.js) pasang teks dinamis
- `data-teks="cta-saran"` ← placeholder, nanti di-replace pake teks dari `salinan-teks-lanjut.md` §4.8
- `hidden` ← awal-nya hidden, JavaScript akan remove `hidden` kalau ada data
- Content (h3, p, button) **harus ada** di HTML, jangan di-generate JavaScript (constraint app.js)

**Jangan:** Jangan rewrite seluruh Beranda, cuma tambah div ini saja.

**DoD:**
- [ ] Kartu CTA ada di HTML (setelah linimasa)
- [ ] `data-isi` dan `data-teks` attributes ada
- [ ] Styling pakai `.levelin-cta-card` dari levelin.css
- [ ] Tidak ada perubahan ke element P0 lainnya (F1 countdown, cerita alumni card, etc)

---

### Task 3: Update `app/latihan.html` — Tambah Alur Keyakinan (FL1) + Strip Pembanding (FL2)

**Reference:** SDD-LevelIn.md §7.2 (input keyakinan), §7.3 (pembanding), wireframe latihan.html

**Lokasi & struktur:**

```html
<!-- Existing: Kartu soal (JANGAN DIUBAH) -->
<div class="kartu soal-card">
  <p class="soal-text">Turunan dari f(x) = 3x²...</p>
</div>

<!-- BARU: Blok keyakinan (sebelum answer reveal) -->
<div class="levelin-confidence-section" data-peran="latihan" data-step="keyakinan">
  <p>Seberapa yakin kamu bisa jawab ini?</p>
  <div class="levelin-confidence-chips">
    <button class="levelin-confidence-chip" data-value="1">1</button>
    <button class="levelin-confidence-chip" data-value="2">2</button>
    <button class="levelin-confidence-chip" data-value="3">3</button>
    <button class="levelin-confidence-chip" data-value="4">4</button>
    <button class="levelin-confidence-chip" data-value="5">5</button>
  </div>
  <div class="scale-labels">
    <span>Ragu</span>
    <span>Yakin banget</span>
  </div>
</div>

<!-- Existing: Answer reveal (JANGAN DIUBAH) -->
<div class="answer-section" hidden>
  <p class="answer-text">f'(x) = 6x − 5</p>
</div>

<!-- BARU: Strip pembanding (muncul setelah answer reveal) -->
<div class="levelin-gap-strip" hidden>
  <p data-isi="gap-feedback"></p>
  <!-- Isi: "Kamu pilih yakin 4/5, tapi jawabanmu meleset. Ini masuk pola gap kamu di Matematika." -->
</div>
```

**Penjelasan:**
- `.levelin-confidence-section` ← alur pilih keyakinan, hidden sampai answer-section di-reveal
- `.levelin-confidence-chips` ← kontainer 5 tombol
- Setelah answer dibuka → show `.levelin-gap-strip` (strip pembanding)
- **Jangan:** Jangan ubah `.answer-section` yang sudah ada, cuma tambah `.levelin-gap-strip` sesudahnya

**DoD:**
- [ ] Blok keyakinan ada sebelum answer reveal
- [ ] 5 chip ada, styling dari `.levelin-confidence-chip`
- [ ] Strip pembanding ada sesudah answer (hidden awal)
- [ ] Selector sesuai untuk JavaScript hook (`data-perol`, `data-step`, `data-value`, `data-isi`)

---

### Task 4: Update `app/latihan-selesai.html` — Tambah Ringkasan Kalibrasi (FL6)

**Reference:** SDD-LevelIn.md §7.4, keputusan §10.1 (dua varian tampil)

**Lokasi:** Bawah skor benar/salah yang sudah ada, sebelum nav bawah

**HTML struktur (dua varian):**

```html
<!-- Existing: Skor benar/salah (JANGAN DIUBAH) -->
<div class="score-section">
  <h2>Skor: <span id="score">12/15</span></h2>
  <!-- ... existing content ... -->
</div>

<!-- BARU: Ringkasan kalibrasi (varian penuh) -->
<div class="levelin-summary-block" data-variant="penuh" hidden>
  <h3>Ringkasan Kalibrasi</h3>
  <p data-isi="summary-text"></p>
  <!-- Isi contoh: "Yakin tapi meleset: 3 soal. Ternyata bisa: 1 soal." -->
</div>

<!-- BARU: Ringkasan kalibrasi (varian terkunci) -->
<div class="levelin-summary-block" data-variant="locked" hidden>
  <p>Lihat ringkasan kalibrasi sesi kamu...</p>
  <button class="tombol-upgrade">Upgrade ke premium</button>
</div>
```

**Penjelasan:**
- Kedua div hidden awal — JavaScript akan show salah satu sesuai keputusan akses (gratis/berbayar)
- Jangan hard-code isi ringkasan — gunakan `data-isi="summary-text"` placeholder, JavaScript yang isi
- Varian "locked" jangan "menyandera" skor benar/salah — cuma ajakan samping

**Catatan penting:** SDD-LevelIn.md §10.1 belum final keputusan apakah FL6 gratis/berbayar. Asumsikan dua-duanya perlu didesain (jangan assum gratis saja atau berbayar saja).

**DoD:**
- [ ] Dua varian ringkasan ada
- [ ] Tidak menutupi atau mereplexe skor benar/salah
- [ ] Styling dari `.levelin-summary-block`
- [ ] Selector untuk JavaScript hook (`data-variant`, `data-isi`)

---

### Task 5: Update `app/arsip.html` — Tambah Penanda Status Mapel (FL3/§7.6) — OPTIONAL

**Status:** Optional, pending decision §10.1 (tampilan agregat mungkin jadi berbayar)

**Jika dikerjakan:**
- Update setiap baris `<li class="mapel-item">` dengan penanda status kecil
- Tiga state: `.badge-status-belum-data`, `.badge-status-selaras`, `.badge-status-overconfident`
- Jangan ubah struktur mapel list, cuma inject badge CSS

**Jika tidak dikerjakan:**
- Tulis catatan: "FL3 pending — Lihat SDD §10.1 keputusan akses"

**DoD (jika dikerjakan):**
- [ ] Badge ada per mapel
- [ ] 3 state ada styling-nya
- [ ] Constraint §10.1 point 6: "Kalau agregat berbayar, pengguna non-pembayar tidak lihat badge — tidak ada blok "locked" per baris"

---

## 3. File-File yang Boleh/Tidak Boleh Diubah

### ✅ BOLEH diubah
- `app/assets/levelin.css` (NEW)
- `app/beranda.html` (append saja, jangan rewrite)
- `app/latihan.html` (append saja)
- `app/latihan-selesai.html` (append saja)
- `app/arsip.html` (optional, append saja)
- `app/README.md` (update catatan jika perlu)

### ❌ TIDAK BOLEH diubah
- `app/assets/app.js` (jangan sentuh, Level-In logic ada di `levelin.js` yang backend-engineer buat)
- `app/assets/app.css` (token saja yang dipakai, jangan rewrite)
- `app/assets/tokens.css` (jangan tambahin warna baru)
- `app/onboarding.html`, `khusus-smk.html`, `pilih-mapel.html`, `checklist.html`, `alumni.html` (P0 files)
- Struktur navigasi bawah (tetap 4 ikon)

---

## 4. Test & Validation Before Commit

### Visual Test (mobile 360px)
- [ ] Chip keyakinan 1-5 muat dalam 360px width (tidak meluap)
- [ ] Strip pembanding tidak dorong soal ke luar screen
- [ ] Ringkasan kalibrasi tidak menutupi skor
- [ ] Penanda status mapel tidak pecah di layar kecil

### HTML Validation
- [ ] `data-*` attributes ada (untuk JavaScript hook)
- [ ] Tidak ada typo selector
- [ ] `[hidden]` attributes untuk conditional show/hide

### CSS Validation
- [ ] Semua color pakai `var(--token)`, tidak hardcode
- [ ] Semua font Poppins (inherit dari `tokens.css`)
- [ ] Semua padding/margin pakai spacing scale (8px, 12px, 16px, 24px)
- [ ] Tidak ada conflict dengan P0 CSS

### No Regression
- [ ] Buka `app/beranda.html` → cek P0 element (countdown, cerita, nav) masih ada & styling sama
- [ ] Buka `app/latihan.html` → cek soal card masih ada & berfungsi
- [ ] Buka `app/latihan-selesai.html` → cek skor masih ada & berfungsi

---

## 5. Deliverable & Success Criteria

### Output
1. `app/assets/levelin.css` — Styling 5 komponen Level-In
2. Updated `app/beranda.html`, `latihan.html`, `latihan-selesai.html`, (optional) `arsip.html`
3. Commit message: "feat(levelin): UI components FL1-FL6"

### Definition of Done
✅ **UI-engineer task selesai** bila:
- [ ] Semua 5 task HTML/CSS selesai (atau 4 task jika skip arsip.html)
- [ ] Tidak ada visual regression — P0 files masih 100% fungsional
- [ ] Tidak ada hardcode warna/ukuran — semua token-based
- [ ] Mobile 360px tested, tidak meluap
- [ ] Commit push, siap untuk backend-engineer integrate levelin.js

✅ **Tidak boleh submit** bila:
- [ ] levelin.css berisi warna baru yang tidak di-token
- [ ] Hardcode font size (bukan pakai token)
- [ ] P0 element atau styling ada yang berubah
- [ ] Mobile test belum dilakukan

---

## 6. Handoff ke Backend-Engineer

Begitu ui-engineer commit, backend-engineer bisa mulai:
1. Implement `app/assets/levelin.js` (logika keputusan, penyimpanan, agregasi)
2. Hook ke HTML elements yang ui-engineer sediakan (selector `data-*`)
3. Test ujung-ujung: click chip keyakinan → strip pembanding muncul → data tersimpan

---

## ⏱️ Time Budget

| Task | Estimated | Actual |
|---|---|---|
| Task 1: levelin.css | 1-2 jam | |
| Task 2: beranda.html CTA | 30 min | |
| Task 3: latihan.html keyakinan+strip | 1 jam | |
| Task 4: latihan-selesai.html ringkasan | 1 jam | |
| Task 5: arsip.html badge (optional) | 30 min | |
| Testing & regression | 1 jam | |
| **Total** | **5-6 jam** | |

Kalau selesai lebih cepat: bisa mulai design frontend "desktop wrapper" (Task 6 di timeline awal).

---

## 🚨 Kalau Stall Lagi

Jika agent stall lagi (600s no progress):
1. **Restart dengan satu task saja** — jangan 5 task sekaligus. Mulai Task 1 (levelin.css) saja.
2. **Pastikan wireframe terang** — screenshot mockup dan attach langsung di instruksi berikutnya (jangan link).
3. **Konkretkan error** — jika ada JavaScript error saat test, copy-paste full error message, jangan ringkas.

---

**Ready?** Lanjut ke Task 1 (levelin.css).
