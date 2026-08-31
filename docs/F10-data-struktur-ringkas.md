# F10 Eksplorasi Tujuan — Data Struktur Ringkas
**Generated from:** riset-top-prodi-lengkap.md + eksplorasi-tujuan-instruksi.md  
**Purpose:** Quick reference untuk SDD & implementasi

---

## Schema: profil-prodi.json

```json
{
  "prodi": [
    {
      "id": "k3-d4",
      "nama": "Keselamatan dan Kesehatan Kerja (K3)",
      "jenjang": "D4",
      "badge_relevan_smk": true,
      "peminat": {
        "jumlah": 5582,
        "kampus": "UNS",
        "tahun": 2026,
        "jalur": "SNBT",
        "sumber": "SNPMB",
        "status_sumber": "TERVERIFIKASI",
        "diperiksa_pada": "2026-08-30"
      },
      "diterima": 43,
      "mata_kuliah": [
        "Higiene Industri",
        "Keselamatan Kerja",
        "K3 Lingkungan",
        "Pengendalian Proses",
        "Instrumentasi",
        "Pertolongan Pertama"
      ],
      "profesi": [
        {
          "nama": "Safety Officer / HSE Officer",
          "deskripsi": "Mengelola program keselamatan kerja di perusahaan"
        },
        {
          "nama": "Safety Inspector",
          "deskripsi": "Melakukan inspeksi keselamatan di lokasi kerja"
        },
        {
          "nama": "Auditor K3 / Environmental Specialist",
          "deskripsi": "Audit & verifikasi sistem K3"
        }
      ],
      "kampus": [
        {
          "nama": "PPNS (Politeknik Perkapalan Negeri Surabaya)",
          "jenis": "PTN Vokasi",
          "jalur_masuk": ["SNBT", "Mandiri"],
          "status_sumber": "TERVERIFIKASI"
        },
        {
          "nama": "UNS (Universitas Sebelas Maret)",
          "jenis": "PTN Akademik",
          "jalur_masuk": ["SNBP", "SNBT"],
          "status_sumber": "TERVERIFIKASI"
        },
        {
          "nama": "UNAIR (Universitas Airlangga)",
          "jenis": "PTN Akademik",
          "jalur_masuk": ["SNBP", "SNBT"],
          "status_sumber": "TERVERIFIKASI"
        }
      ],
      "gaji": null,
      "sertifikasi": "Ahli K3 Umum (Kemnaker/BNSP)"
    }
  ]
}
```

---

## 18 Prodi Daftar (Metadata untuk Quick Map)

| No | Prodi | Jenjang | SMK? | Peminat (Terverifikasi) | Diterima | Status Data |
|---|---|---|---|---|---|---|
| 1 | K3 | D4 | ✔ | 5.582 | 43 | TERVERIFIKASI |
| 2 | Administrasi Bisnis | D3 | — | 5.059 | 116 | TERVERIFIKASI |
| 3 | Teknik Informatika | D3/D4 | ✔ | 2.796 | 45 | TERVERIFIKASI |
| 4 | Teknik Mesin | D3 | ✔ | 2.383 | 48 | TERVERIFIKASI |
| 5 | Keperawatan | D3 | — | 5.216 | 60 | TERVERIFIKASI |
| 6 | Perpajakan | D3 | — | 4.570 | 60 | TERVERIFIKASI |
| 7 | Keperawatan Anestesiologi | D4 | — | 4.766 | 23 | TERVERIFIKASI |
| 8 | Humas & Komunikasi Digital | D4 | — | 4.346 | 45 | TERVERIFIKASI |
| 9 | Manajemen Bisnis | D4 | — | 2.521 | 69 | TERVERIFIKASI |
| 10 | Informatika | S1 | ✔ | 1.157 | — | TERVERIFIKASI |
| 11 | Manajemen | S1 | — | 1.590 | — | TERVERIFIKASI |
| 12 | Ilmu Hukum | S1 | — | 4.685 | 287 | TERVERIFIKASI |
| 13 | Teknik Pertambangan | S1 | — | 4.789 | 115 | TERVERIFIKASI |
| 14 | Kedokteran | S1+profesi | — | 1.943 | 60 | TERVERIFIKASI |
| 15 | Farmasi | S1+profesi | — | 1.621 | 50 | TERVERIFIKASI |
| 16 | Ilmu Keperawatan | S1+Ners | — | 1.603 | 58 | TERVERIFIKASI |
| 17 | Ilmu Komunikasi | S1 | — | 1.465 | 20 | TERVERIFIKASI |
| 18 | Akuntansi | S1 | — | 1.206 | — | TERVERIFIKASI |

---

## Integration Points

### 1. pilih-mapel.html (F3)
- **Add CTA after result display:**
  ```html
  <a href="eksplorasi-tujuan.html?prodi={{selectedProdi}}" class="btn btn--primary">
    Lihat prospek & kampus untuk {{selectedProdiName}}
  </a>
  ```
- **Pass via:** URL param `?prodi=` OR localStorage `selectedProdi`

### 2. esplorasi-tujuan.html (F10) — NEW FILE
- **Read:** `selectedProdi` from URL param / localStorage
- **Load:** Match prodi ID → fetch data dari `data/profil-prodi.json`
- **Render:** Main state (9 sections) OR fallback state
- **Save:** "Simpan ke Daftar Periksa" button → add item to localStorage checklist

### 3. checklist.html (F5)
- **New category:** "Riset Kampus" (alongside existing: "Berkas", "Pendaftaran", "Jalur Pembiayaan")
- **Item format:** `{ kategori: "Riset Kampus", teks: "Cari tahu lebih lanjut soal [Prodi Name]", status: false }`

---

## Data Alignment Decision: prodi.json (F3)

**Current state:** Unknown (need to check)

**Decision needed:**
- **Option A (Recommended):** Batasi `data/prodi.json` ke 18 prodi riset saja
  - Pro: Setiap hasil F3 punya profil F10 lengkap (no empty fallback)
  - Con: F3 jadi lebih terbatas
  
- **Option B:** Biarkan prodi.json luas, andalkan fallback F10
  - Pro: F3 tetap comprehensive
  - Con: Banyak hasil F3 berakhir fallback "belum tersedia"

**Rekomendasi:** Option A (sesuai spec §4)

---

## Status Sumber Consistency

Setiap section data (peminat, mata kuliah, profesi, kampus) diberi penanda:

```json
"status_sumber": "TERVERIFIKASI" | "PERKIRAAN",
"diperiksa_pada": "YYYY-MM-DD"
```

**Pedoman:**
- **TERVERIFIKASI:** Data dari sumber resmi (SNPMB, portal kampus resmi, dokumen kurikulum resmi)
- **PERKIRAAN:** Data dari sumber sekunder (artikel edukasi, alumni tracer, portal agregat)
- **TIDAK DITEMUKAN:** Field tidak ada (mis. gaji — intentional omit per spec)

---

## Display Rules (dari spec F10 §3)

- ✅ Jenjang badge (S1/D3/D4)
- ✅ SMK relevance badge (hanya jika `badge_relevan_smk: true`)
- ✅ Jumlah peminat + rasio keketatan (diterima ÷ peminat)
- ✅ 4-6 mata kuliah (array, display berurut)
- ✅ 3-4 profesi (array, display kartu)
- ✅ 3-5 kampus diversifikasi (PTN akademik, PTN vokasi minimal ada 1)
- ✅ Setiap section: status_sumber badge
- ✅ Disclaimer: "Data ini rangkuman dari SNPMB/BAN-PT per [tahun], bisa berubah..."
- ✅ Tombol "Simpan ke Daftar Periksa"
- ❌ NO gaji field anywhere (sengaja omit)

---

## File Checklist

- [ ] `data/profil-prodi.json` — 18 entry (template: schema di atas)
- [ ] `data/prodi.json` — alignment check & possible update (Opsi A: batasi 18)
- [ ] `app/eksplorasi-tujuan.html` — main page (fetch prodi, render sections, fallback)
- [ ] Update `app/pilih-mapel.html` — add CTA "Lihat prospek..."
- [ ] Update `app/checklist.html` — add "Riset Kampus" category
- [ ] CSS: match existing design tokens (sudah di `app/assets/tokens.css`)

---

## Notes for Implementation

1. **LocalStorage keys:**
   - `selectedProdi` — set by pilih-mapel.html, read by eksplorasi-tujuan.html
   - `checklist` — append "Riset Kampus" item by esplorasi-tujuan.html save button

2. **Fallback logic:** If `selectedProdi` not in profil-prodi.json:
   - Show: "Profil lengkap untuk [prodi] belum kami siapkan"
   - List: Available 18 prodi, grouped by rumpun
   - CTA: "Pilih prodi lain" or "Kembali ke Pilih Mapel"

3. **Responsive:** All screens 360px viewport (match v1 screens)

4. **Design tokens used:** Blue palette, Poppins font, 8/12/16px spacing (dari tokens.css)
