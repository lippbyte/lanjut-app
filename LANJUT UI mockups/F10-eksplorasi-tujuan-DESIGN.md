# F10 Eksplorasi Tujuan — Design Reference

**Status:** ✅ Design complete & published  
**Link:** https://claude.ai/code/artifact/43869c14-5979-4d33-868e-5028805525f4  
**Artboards:** 2 (Main State + Fallback)  
**Created:** 31 Agu 2026

---

## Artboards Overview

### 1. Main State — Profil Prodi
Program profile screen showing:
- Program name + badges (degree level S1/D3/D4, SMK relevance)
- Metrics: applicant count + competition ratio
- Section "Yang akan kamu pelajari" — 4-6 courses
- Section "Ke mana lulusannya" — 3-4 career role cards
- Section "Kampus yang cocok" — 3-5 university cards (diversified type & pathways)
- Disclaimer + "Simpan ke Daftar Periksa" button

**Design system matched:**
- LANJUT color tokens (blues #78A4CB, neutrals)
- Poppins typography with semantic sizing
- 8/12/16/20px spacing rhythm
- Cards with shadows & rounded corners
- Responsive 360px viewport

### 2. Fallback State — Program Not Found
Graceful degradation when program profile not yet available:
- Friendly message + icon
- List of available programs for discovery
- Consistent with "layar kosong" pattern from existing screens

---

## Implementation Notes

### Data Structure Needs
- `data/profil-prodi.json` — 18 prodi entries with:
  - name, degree (S1/D3/D4), badge_relevan_smk (boolean)
  - peminat {jumlah, tahun, sumber}
  - diterima (acceptance count for ratio calc)
  - mata_kuliah (4-6 strings)
  - profesi (3-4 strings)
  - kampus (array with name, type, pathways)
  - status_sumber (Terverifikasi/Perkiraan)
  - **NO salary data field** (intentionally omitted per spec)

### Integration Points
1. **pilih-mapel.html** → Add CTA "Lihat prospek & kampus untuk [prodi]"
2. **eksplorasi-tujuan.html** → Read prodi from localStorage (from pilih-mapel result)
3. **checklist.html** → Accept new category "Riset Kampus" from save button

### Design Tokens Used
```css
--blue-400: #78A4CB (primary)
--blue-100: #E4F3F7 (soft background)
--blue-600: #456A8C (text link)
--ink-900: #1A1A1A (body text)
--ink-700: #3D4450 (muted text)
--border-soft: #D6E5EE
--radius-lg: 24px
--radius-md: 16px
--space-4: 16px (base spacing)
```

---

## Screenshots
(User provided screenshots 31 Agu 2026 — see artifact link for latest interactive canvas)

---

## Next Steps
→ SDD phase: Finalize data schema & implement HTML
