# 🚀 INSTRUKSI EKSEKUSI FINAL — Countdown Rilis v1

**Status:** Keputusan PM Final ✅
**Timeline:** 7-14 hari ke rilis 3 September
**Urgensi:** CRITICAL — mulai hari ini

---

## 📋 Keputusan PM yang Terkunci

| No | Keputusan | Jawaban | Status |
|---|---|---|---|
| Q1 | Field name prodi | `prodi_impian` (bukan prodi_tujuan) | ✅ |
| Q2 | Fix C-2 validasi prodi | **Sekarang** (sebelum rilis) | ✅ |
| Q3 | B8 (daftar/login/akun) kapan? | **Opsi I: Sekarang** (paralel dengan C-1/C-2 fix) | ✅ |

Setelah keputusan ini, roadmap jelas: **Backend fix bugs + UI mulai B8 hari ini**.

---

## 🔄 Alur Paralel (3 Agent, Eksekusi Serentak)

```
Hari 0 (hari ini):
  ├─ backend-engineer: Fix C-1 & C-2 (1-2 hari)
  ├─ ui-engineer: Mulai B8 — daftar.html, masuk.html, akun.html, api.js (3-5 hari)
  └─ qa-reviewer: Standby, siap re-test saat backend fix selesai

Hari 1-2:
  ├─ backend: Fix C-1 & C-2 + commit
  └─ ui-engineer: Continue B8 (tidak blocked, paralel)

Hari 3:
  ├─ qa-reviewer: Re-run test Blok A & C setelah backend fix
  ├─ ui-engineer: Continue B8
  └─ backend: Standby untuk debugging jika ada issue QA

Hari 4-5:
  ├─ ui-engineer: Selesaikan B8 (3-5 hari total dari hari 0)
  ├─ qa-reviewer: Mulai E2E testing B8 (login → data save → logout)
  └─ backend: Support debugging jika ada issue

Hari 6-7:
  ├─ qa-reviewer: Final smoke test, sign-off
  └─ Backend + UI + QA: Ready to release 3 Sept
```

---

## 📝 Instruksi Per-Agent

### AGENT 1: backend-engineer

**Status sebelumnya:** ✅ 29/29 unit tests passing, security excellent
**Tugas baru:** Fix C-1 & C-2, kemudian standby untuk debug B8

---

#### Task 1.1: Fix C-1 — Field Name `prodi_impian`

**File:** `server/src/modul/pengguna/pengguna.skema.js`

**Apa yang sudah ada:**
```javascript
// Current (harus diubah)
const schemaDaftar = {
  prodi_tujuan: { ... }  // ❌ Ini tidak sesuai dengan database yang pakai prodi_impian
}
```

**Apa yang perlu diubah:**
```javascript
// Target
const schemaDaftar = {
  prodi_impian: { ... }  // ✅ Sesuai database dan keputusan PM Q1
}
```

**Juga update:**
- `server/src/modul/pengguna/pengguna.model.js` — pastikan query insert pakai `prodi_impian`
- `prd-sdd-lanjut.md` §4.3 — dokumentasi jadi "prodi_impian" (PM atau tech lead kerjakan)

**Test:** Run unit test pengguna.model → harus 100% pass
**Commit message:** `fix(pengguna): field name prodi_tujuan → prodi_impian`

---

#### Task 1.2: Fix C-2 — Validasi Prodi (CRITICAL)

**File:** `server/src/modul/auth/auth.layanan.js` atau endpoint daftar yang ada

**Masalah saat ini:**
- User daftar: `POST /api/daftar { prodi_impian: 'ti' }` (tidak ada di tabel prodi)
- Response: **HTTP 500** (database constraint error)
- Seharusnya: **HTTP 400** dengan pesan validasi

**Solusi:**
1. Sebelum insert ke database, query tabel `prodi` untuk validasi
2. Jika `prodi_impian` tidak ada di tabel `prodi` → return 400 VALIDASI_GAGAL

**Pseudocode:**
```javascript
async function daftar(req, res) {
  const { email, username, password, prodi_impian } = req.body;
  
  // Validasi: apakah prodi_impian ada di tabel prodi?
  const prodiAda = await db.query('SELECT id FROM prodi WHERE id = ?', [prodi_impian]);
  
  if (!prodiAda) {
    return res.status(400).json({
      kode: 'VALIDASI_GAGAL',
      pesan: 'Prodi tidak dikenali',
      detail: {
        field: 'prodi_impian',
        nilai_diterima: prodi_impian,
        nilai_valid: ['ti', 'elektro', ...] // list yang ada di database
      }
    });
  }
  
  // Lanjut ke insert jika valid
  // ...
}
```

**Test:** 
- Test case 1: Daftar dengan prodi valid (`prodi_impian: 'ti'`) → 201 Created ✅
- Test case 2: Daftar dengan prodi tidak valid (`prodi_impian: 'tidak-ada'`) → 400 VALIDASI_GAGAL ✅
- Run: `npm test` — kedua test case harus pass

**Commit message:** `fix(auth): validasi prodi_impian sebelum insert (C-2)`

---

#### Task 1.3: Push & Wait for QA Re-test

**Setelah fix C-1 & C-2 selesai:**
1. Commit keduanya (bisa satu commit atau dua, sesuai preference)
2. Push ke repository
3. Notify QA-reviewer: "C-1 & C-2 sudah fix, siap di-test"
4. **Standby** untuk debug jika QA menemukan issue

**Tidak ada task lain untuk backend sampai B8 siap** (ui-engineer selesai 3-5 hari nanti), kecuali ada bug report dari QA atau ui-engineer.

---

### AGENT 2: ui-engineer

**Status sebelumnya:** ✅ Level-In UI selesai, no regression
**Tugas baru:** B8 — daftar.html, masuk.html, akun.html, assets/api.js

**Timeline:** 3-5 hari (hari 0 sampai hari 4-5)
**Blocking:** Rilis v1 — jika selesai tepat waktu, v1 bisa rilis penuh dengan akun

---

#### Task 2.1: Setup & Planning (Day 0 — 1 jam)

**File yang akan dibuat/diubah:**
- `app/daftar.html` (NEW)
- `app/masuk.html` (NEW)
- `app/akun.html` (NEW)
- `app/assets/api.js` (NEW)
- `app/assets/app.js` (MINOR: init api.js)
- `app/index.html` (MINOR: redirect ke masuk.html jika belum login)

**Tidak boleh touch:**
- Level-In UI yang sudah selesai
- P0 halaman (beranda, khusus-smk, pilih-mapel, checklist, alumni) — merge kode API nanti saja

**Contract dengan backend:**
- `POST /api/daftar` — body: `{ email, username, password, prodi_impian }`
- `POST /api/daftar-masuk` — body: `{ username, password }`
- `POST /api/keluar` — header: `Authorization: Bearer <token>`
- Session token tersimpan di `localStorage` dengan key `lanjut_token`

---

#### Task 2.2: Buat `app/assets/api.js` (Day 0-1 — 1-2 jam)

**Fungsi yang dibutuhkan:**

```javascript
// 1. daftar(email, username, password, prodi_impian)
//    → POST /api/daftar → return { token, pengguna: { id, email, ... } }

// 2. masuk(username, password)
//    → POST /api/daftar-masuk → return { token, pengguna: { ... } }

// 3. keluar()
//    → POST /api/keluar + remove token dari localStorage

// 4. getToken()
//    → return token dari localStorage (atau null jika tidak ada)

// 5. isLoggedIn()
//    → return true jika token ada & valid (belum expired)

// 6. fetch(endpoint, options)
//    → Wrapper fetch yang auto-inject Authorization header
//    → Jika 401 → redirect ke masuk.html

// 7. profil()
//    → GET /api/profil → return pengguna data

// 8. updateProfil(data)
//    → PUT /api/profil → update profil pengguna
```

**Constraint:**
- Semua error handling harus tangkap 4xx/5xx dari backend → tampilkan pesan user-friendly (bukan raw error)
- Token management di localStorage (simple, tidak perlu encryption)
- Auto-redirect ke masuk.html jika token hilang/expired (401)
- Tidak boleh hardcode URL API — gunakan config `const API_BASE = '/api'`

**Test (lokal saja, bukan automated):**
- `api.daftar()` call successfully
- `api.masuk()` call successfully
- Token tersimpan & bisa dipakai header

---

#### Task 2.3: Buat `app/daftar.html` (Day 1 — 2 jam)

**Layout:**
- Form daftar: email, username, password, prodi_impian (select dropdown)
- Submit button
- Link ke "Sudah punya akun? Masuk"
- Loading state saat submit
- Error message (jika daftar gagal)
- Success redirect ke masuk.html setelah daftar berhasil

**Form fields:**

| Field | Type | Validasi Client | Kontrak API |
|---|---|---|---|
| email | email | required, valid email format | `email` |
| username | text | required, min 3 char | `username` |
| password | password | required, min 8 char | `password` |
| prodi_impian | select | required | `prodi_impian` |

**Prodi dropdown:** Query dari backend `/api/prodi` → cache di localStorage → populate select

**Styling:** Pakai token dari `design.md`, ikuti pattern form yang sudah ada (Penolong Pilih Mapel form, dsb)

**Script:** Call `api.daftar()` saat form submit → handle 201 (redirect masuk) / 400 (show error) / 500 (show error)

---

#### Task 2.4: Buat `app/masuk.html` (Day 1-2 — 1.5 jam)

**Layout:**
- Form masuk: username, password
- Submit button
- Link ke "Belum punya akun? Daftar"
- Loading state saat submit
- Error message (username/password salah, atau lockout)
- Success redirect ke beranda.html setelah login berhasil

**Form fields:**

| Field | Type | Validasi Client | Kontrak API |
|---|---|---|---|
| username | text | required | `username` |
| password | password | required | `password` |

**Styling & UX:**
- Ikuti pattern daftar.html (konsistensi visual)
- Error message untuk lockout: "Terlalu banyak gagal, tunggu 5 menit" (SDD §5.2, rate limiting)
- Focus ke username field saat halaman load

**Script:** Call `api.masuk()` saat form submit → handle 200 (redirect beranda) / 401 (show error) / 429 (lockout message)

---

#### Task 2.5: Buat `app/akun.html` (Day 2-3 — 2 jam)

**Layout:**
- Profil user: email, username, prodi_impian (tampilan saja, tidak bisa edit sekarang)
- Password change form (opsional, bisa di-defer ke v1.1)
- Logout button
- Back button ke beranda

**Profile section:**
- Display: email, username, prodi_impian (dari `/api/profil`)
- Status: "Terverifikasi" atau "Belum verifikasi" (sesuai skema DB)

**Logout button:** Call `api.keluar()` → redirect ke masuk.html

**Styling:** Card layout, consistent dengan desain

**Script:**
- Load profil saat halaman mount: `api.profil()` → populate display
- Logout handler: `api.keluar()` → redirect
- Error handling: 401 → redirect masuk.html

---

#### Task 2.6: Update `app/assets/app.js` (Day 3 — 30 min)

**Minor changes:**
1. Import `api.js` di awal
2. Add init function: check `api.isLoggedIn()` → jika tidak login & di halaman gated (beranda, pilih-mapel, dsb) → redirect ke masuk.html
3. Add logout handler ke nav (atau di akun.html)

**Tidak perlu rewrite yang sudah ada.** Hanya tambah flow login check.

---

#### Task 2.7: Test & Validation (Day 3-4 — 1 jam)

**Manual test (lokal 360px mobile view):**
- [ ] Buka `daftar.html` → form load
- [ ] Submit daftar dengan data valid → redirect ke masuk.html
- [ ] Buka `masuk.html` → form load
- [ ] Submit login dengan username/password yang baru daftar → redirect ke beranda.html
- [ ] Token tersimpan di localStorage
- [ ] Buka `akun.html` → profil user tampil
- [ ] Logout → redirect ke masuk.html, token dihapus
- [ ] Buka beranda.html langsung → check apakah ada redirect ke masuk.html (jika belum login)

**No regression:**
- Level-In UI masih intact
- P0 halaman tidak berubah

**Commit message:** `feat(auth-ui): daftar, masuk, akun, api.js (B8 implementation)`

---

### AGENT 3: qa-reviewer

**Status sebelumnya:** ✅ 12/15 backend scenarios pass, 9 blocked karena UI
**Tugas baru:** Re-test C-1/C-2 fix, kemudian E2E testing B8

**Timeline:** 3-5 hari (dengan fokus pada blok A & C dulu, lalu B8 E2E)

---

#### Task 3.1: Re-test Blok A & C setelah Backend Fix (Day 2-3 — 2 jam)

**Background:** C-1 & C-2 sudah fix oleh backend-engineer

**Scenario yang perlu di-test ulang:**

| Scenario | Before Fix | After Fix Expected | Test |
|---|---|---|---|
| **A1 — Daftar** | HTTP 500 (C-2 no validation) | HTTP 201 (daftar sukses) | Daftar dengan prodi valid → 201 ✅ |
| **A1 — Daftar invalid prodi** | HTTP 500 | HTTP 400 VALIDASI_GAGAL | Daftar dengan prodi tidak valid → 400 ✅ |
| **C1 — Profil** | prodi_tujuan hilang (C-1 field name) | prodi_impian muncul (field name diperbaiki) | Profil fetch, cek field `prodi_impian` ada ✅ |

**Test execution:**
1. Setup: fresh database, seed prodi list
2. Run A1 (valid prodi): POST /api/daftar dengan `prodi_impian: 'ti'` → expect 201
3. Run A1 (invalid prodi): POST /api/daftar dengan `prodi_impian: 'tidak-ada'` → expect 400 + error message
4. Run C1: GET /api/profil → check field `prodi_impian` ada (bukan `prodi_tujuan`)
5. Document hasil: pass/fail untuk ketiga scenario

**Commit hasil:** Test report diupdate di `docs/INSTRUKSI-QA-E2E-TESTING.md` atau file laporan baru

---

#### Task 3.2: E2E Testing B8 (Day 4-6)

**Scope:** Frontend (daftar.html, masuk.html, akun.html) ↔ Backend API

**Prerequisite:**
- ui-engineer sudah selesai B8 (estimasi hari 4-5)
- Backend running, database clean
- Frontend running di port yang CORS-allowed (atau di localhost)

**E2E Scenarios:**

| Scenario | Steps | Expected Result |
|---|---|---|
| **B8-1: User Journey Daftar → Login → Profil → Logout** | 1. Buka daftar.html 2. Isi form (email, username, password, prodi) 3. Submit daftar 4. Redirect ke masuk.html 5. Isi username/password 6. Submit login 7. Redirect ke beranda (token ada di localStorage) 8. Buka akun.html 9. Profil tampil sesuai data daftar 10. Logout 11. Redirect ke masuk.html, localStorage kosong | Seluruh flow berjalan tanpa error, token management benar |
| **B8-2: Validasi Form Daftar (Client)** | 1. Buka daftar.html 2. Coba submit dengan email invalid 3. Coba submit dengan password < 8 char 4. Check browser tidak kirim request (client-side validation) | Browser block submit, tidak ada request ke API |
| **B8-3: Handling Backend Error** | 1. Daftar dengan email yang sudah ada (duplicate) 2. Check response 400/409 dengan error message | UI menampilkan error message: "Email sudah terdaftar" |
| **B8-4: Lockout (Rate Limiting)** | 1. Login 5x dengan password salah 2. 6x attempt → expect 429 Terlalu Banyak Request 3. Check UI tampilkan message: "Terlalu banyak gagal, tunggu 5 menit" | Lockout berfungsi, user tidak bisa login selama 5 menit |
| **B8-5: Session Persistence** | 1. Login → token tersimpan di localStorage 2. Reload halaman 3. Check apakah tetap login (tidak redirect ke masuk.html) | Reload tidak logout, token persist |
| **B8-6: Akses Halaman Gated Tanpa Login** | 1. Clear localStorage (hapus token) 2. Buka beranda.html langsung (URL bar) 3. Check automatic redirect ke masuk.html | Tidak bisa akses beranda tanpa token, auto-redirect |

**Test execution:**
1. Setup: database clean, seed prodi
2. Run scenario B8-1 → B8-6 (manual testing, ui-engineer bisa hadir untuk debug)
3. Document hasil: pass/fail, screenshot error jika ada
4. Jika fail: assign ke ui-engineer atau backend-engineer untuk fix

**Success criteria:** Semua 6 scenario pass tanpa error

---

#### Task 3.3: Final Smoke Test (Day 6-7 — 1 jam)

**Sebelum rilis v1, jalankan satu kali full end-to-end:**

1. Fresh database reset
2. Full user flow: Daftar → Login → Browse Linimasa → Lihat checklist → Edit checklist → Logout
3. Check: tidak ada console error, tidak ada 5xx response
4. Check mobile view (360px) tidak ada layout break

**Sign-off:** Jika semua pass → "QA APPROVED FOR RELEASE"

---

## 📅 Timeline Rekapitulasi

| Hari | Backend | UI-Engineer | QA |
|---|---|---|---|
| **Hari 0 (hari ini)** | Fix C-1 & C-2 start | B8 planning + api.js start | Standby |
| **Hari 1-2** | Fix C-1 & C-2 finish, commit | B8 continue (daftar.html, masuk.html) | Re-test C-1 & C-2 |
| **Hari 3** | Standby, debug jika ada issue | B8 continue (akun.html, app.js update) | Re-test C-1 & C-2 finish, start E2E prep |
| **Hari 4-5** | Standby | B8 finish, test lokal | E2E testing B8 scenarios B8-1 → B8-6 |
| **Hari 6-7** | Final check | Support QA debug jika ada issue | Final smoke test, sign-off |
| **Hari 7-14** | Buffer untuk bug fixing jika ada | Buffer | Monitor rilis |
| **3 Sept** | 🚀 RILIS v1 (penuh UI+API, login, data persisten) |

---

## ✅ Success Criteria untuk Rilis v1

Sebelum rilis 3 Sept, **semua ini harus PASS:**

- [ ] C-1 (field name) fixed & tested ✅
- [ ] C-2 (validasi prodi) fixed & tested ✅
- [ ] B8 (daftar.html, masuk.html, akun.html, api.js) selesai & tested ✅
- [ ] E2E scenarios B8-1 → B8-6 semua pass ✅
- [ ] QA final smoke test pass ✅
- [ ] Tidak ada regression di P0 halaman ✅
- [ ] Mobile 360px tested, tidak break ✅

Begitu semua checklist ini green, **v1 READY TO DEPLOY ke production (Rumahweb Small).**

---

## 🎯 Komunikasi Harian

**Setiap hari (utamanya hari 1-7):**
- 10 AM: Standup singkat (backend: progress C-1/C-2; ui-engineer: progress B8; qa: status testing)
- 4 PM: Block-blocker check — ada yang stuck? Siapa yang perlu help?
- Jika ada issue urgent: escalate langsung (tidak perlu tunggu standup)

**Dokumentasi:**
- Backend: commit message + test result
- UI: commit message + mobile screenshot
- QA: test report di file bersama (Google Sheets atau Notion)

---

**MULAI HARI INI. GOOD LUCK! 🚀**
