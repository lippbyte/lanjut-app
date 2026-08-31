# Instruksi QA: End-to-End Testing (Backend + P0 UI)

**Agent:** qa-reviewer  
**Scope:** Validasi backend + P0 UI connection (Login, Content Load, Data Sync)  
**Timeline:** Minggu 4 akhir (paralel dengan ui-engineer Level-In)  
**Target:** Temukan & dokumentasikan integration issues sebelum rilis v1 (3 Sept)

---

## 🚀 Setup & Prerequisites

### Persyaratan Environment
- **Database:** MySQL 8.0+ (lokal atau remote staging)
- **Backend:** Node.js 18+, Express (dari `server/` folder)
- **Frontend:** Browser modern (Chrome/Firefox), mobile emulator 360px
- **Network:** Backend & frontend bisa saling reach (localhost:3000 + localhost:8080)

### Quick Start (Development)

```bash
# Terminal 1: Database + Backend
cd server
npm install
# Setup .env (copy dari .env.example)
npm run migrasi
npm run benih
npm start
# Expected: Server berjalan di http://localhost:3000

# Terminal 2: Frontend (static server)
cd app
python -m http.server 8080
# Expected: App berjalan di http://localhost:8080
```

### Validasi Koneksi
```bash
# Terminal 3: Test API
curl http://localhost:3000/api/v1/sehat
# Expected response: {"ok":true}

curl http://localhost:8080/index.html
# Expected: Halaman terbuka di browser
```

---

## 📋 Test Scenarios (15 Scenarios + Regression)

### **BLOK A: Authentication (4 scenarios)**

#### A1. Daftar Akun Baru
**Precondition:** Aplikasi terbuka di `http://localhost:8080`, belum login

**Steps:**
1. Buka halaman Onboarding (auto-redirect jika belum ada profil)
2. Isi 2 pertanyaan: Kelas (12) + Prodi (Teknik Informatika)
3. Klik "Lanjut" → halaman Beranda
4. Cari menu/tombol "Daftar Akun" atau "Login"
5. Klik daftar, isi form:
   - Email: `test.user@lanjut.local` (gunakan prefix test_ untuk testing)
   - Nama: `Test User`
   - Password: `TestPassword123!`
   - Konfirmasi password
6. Klik "Daftar"

**Expected:**
- Form dikirim ke `POST /api/v1/daftar`
- Response: `{"id": "...", "token": "...", "pesan": "Berhasil didaftar"}`
- Session token tersimpan di localStorage
- Halaman redirect ke Beranda (sudah authenticated)
- Tombol profil menunjukkan nama "Test User"

**Validation:**
- [ ] Database: pengguna ada di tabel `pengguna`, password ter-hash
- [ ] Token: tersimpan di localStorage, format opaque (bukan JWT)
- [ ] Tidak ada error di browser console

**Regression:**
- [ ] P0 UI Beranda masih render normal (tidak ada JavaScript error)

---

#### A2. Login dengan Akun Lama
**Precondition:** Akun dari A1 sudah terdaftar, localStorage dikosongkan (logout)

**Steps:**
1. Buka halaman (auto-redirect ke Onboarding karena localStorage kosong)
2. Isi profil lagi (Kelas 12 + Prodi sama)
3. Cari tombol "Sudah punya akun? Login"
4. Isi form login:
   - Email: `test.user@lanjut.local`
   - Password: `TestPassword123!`
5. Klik "Masuk"

**Expected:**
- Form dikirim ke `POST /api/v1/masuk`
- Response: `{"id": "...", "token": "...", "pesan": "Berhasil masuk"}`
- Session token tersimpan (mungkin token baru, atau sama)
- Halaman redirect ke Beranda
- Nama pengguna tampil di profil

**Validation:**
- [ ] Token baru diterima & tersimpan
- [ ] Database query: `SELECT * FROM sesi_pengguna WHERE pengguna_id=?` ada record aktif
- [ ] Tidak ada percobaan login gagal tercatat di database

---

#### A3. Login dengan Password Salah (Rate Limit)
**Precondition:** Akun dari A1 ada

**Steps:**
1. Masuk login form
2. Email: `test.user@lanjut.local`
3. Password: `WrongPassword123!` (salah sengaja)
4. Klik "Masuk"
5. Ulangi 5x dengan password salah

**Expected (attempts 1-5):**
- Response: `{"error": "Password salah", "code": "PASSWORD_SALAH"}`
- Form reset, user bisa coba lagi
- Browser console: tidak ada token tersimpan

**Expected (attempt 6):**
- Response: `{"error": "Terlalu banyak percobaan, coba lagi nanti", "code": "AKUN_TERKUNCI_SEMENTARA"}`
- Tombol "Masuk" di-disable atau form di-hide
- Waktu tunggu: 15 menit (atau sesuai SDD §3.3 `batas_laju_login`)

**Validation:**
- [ ] Database `percobaan_masuk`: 6 record untuk pengguna ini dalam 15 menit terakhir
- [ ] Field `terkunci_sampai` terisi dengan waktu future (15 menit dari sekarang)

---

#### A4. Logout & Keluar Semua Sesi
**Precondition:** Sudah login (dari A2)

**Steps:**
1. Buka halaman Profil (tombol profil di header Beranda)
2. Cari tombol "Keluar" atau "Logout"
3. Klik "Keluar"

**Expected:**
- Form dikirim ke `POST /api/v1/keluar`
- Session token dihapus dari localStorage
- Halaman redirect ke Onboarding
- Profil kembali kosong

**Validation:**
- [ ] Database `sesi_pengguna`: record untuk user ini ter-mark `aktif=0` atau dihapus
- [ ] localStorage kosong atau tidak ada token
- [ ] Profil form muncul lagi (bukan Beranda)

---

### **BLOK B: Content Load (4 scenarios)**

#### B1. Linimasa Load dari Database
**Precondition:** Sudah login (A2), di halaman Beranda

**Steps:**
1. Inspect Network tab (F12 → Network)
2. Lihat halaman Beranda
3. Cari kartu "Tenggat Terdekat" atau "Tahapan Berikutnya"
4. Check network tab: ada request ke `/api/v1/linimasa`?

**Expected:**
- Network request: `GET /api/v1/linimasa`
- Response: `{"data": [...], "status": "terverifikasi" atau "belum_diverifikasi"}`
- Array `data` berisi ≥5 tahapan (dari `data/linimasa.json` atau database)
- Setiap tahapan punya fields: `judul`, `tanggal_mulai`, `tanggal_selesai`, `jalur` (TKA/SNBP/SNBT), `url_sumber`, `diperiksa_pada`

**UI Validation:**
- [ ] Kartu tenggat menunjukkan nama tahapan yang benar dari API response
- [ ] Hitungan hari benar (perhitungan dari `tanggal_selesai` hari ini)
- [ ] Tidak ada data hardcoded di HTML (data berasal dari API, bukan mockdata)

**Validation:**
- [ ] Response time < 200ms (API cepat)
- [ ] Status code: 200 OK
- [ ] Tidak ada error di console

---

#### B2. Khusus SMK Load dari Database
**Precondition:** Sudah login, di halaman Beranda atau menu "Khusus SMK"

**Steps:**
1. Buka halaman Khusus SMK (dari navigasi bawah)
2. Inspect Network tab
3. Cari request ke `/api/v1/khusus-smk`

**Expected:**
- Network request: `GET /api/v1/khusus-smk`
- Response: array ≥6 butir, setiap butir punya: `judul`, `apa_yang_beda`, `apa_yang_bisa_dilakukan`, `url_sumber`
- Data berasal dari database atau `data/khusus-smk.json`

**UI Validation:**
- [ ] 6 butir tampil (bukan hardcoded)
- [ ] Setiap butir menunjukkan "Apa yang beda" + "Apa yang bisa dilakukan"

---

#### B3. Cerita Alumni Load dari Database
**Precondition:** Sudah login, akses halaman Alumni (dari Beranda)

**Steps:**
1. Dari halaman Beranda, cari tautan "Mereka sudah lewat jalan ini" atau klik tombol Alumni
2. Halaman Alumni terbuka
3. Inspect Network: cari request `/api/v1/cerita-alumni`

**Expected:**
- Network request: `GET /api/v1/cerita-alumni`
- Response: array cerita dengan filter `izin_tayang=1 AND tayang=1`
- Jika belum ada cerita nyata yang ditayang: response array kosong atau array dengan contoh cerita bertanda `izin_tayang=false` (tidak tampil di UI)

**UI Validation:**
- [ ] Halaman kosong atau menampilkan pesan "Cerita pertama sedang kami kumpulkan" (sesuai SDD)
- [ ] Tidak ada cerita yang `izin_tayang=false` tampil di halaman

**Validation:**
- [ ] Status code 200
- [ ] Response structure sesuai SDD §3.5 schema `cerita_alumni`

---

#### B4. Prodi & Mapel Load (Pilih Mapel Feature)
**Precondition:** Sudah login, akses halaman "Pilih Mapel"

**Steps:**
1. Dari navigasi bawah, klik "Pilih Mapel"
2. Halaman Pilih Mapel terbuka
3. Inspect Network: cari requests ke `/api/v1/prodi`, `/api/v1/mapel`, `/api/v1/prodi/{id}/mapel`
4. Klik dropdown Prodi, pilih satu prodi (misal "Teknik Informatika")

**Expected:**
- Network request 1: `GET /api/v1/prodi` → array prodi (6+ item)
- Network request 2: `GET /api/v1/mapel` → array mapel (5+ item)
- Network request 3 (setelah pilih prodi): `GET /api/v1/prodi/[id]/mapel` → array relasi prodi-mapel

**UI Validation:**
- [ ] Dropdown Prodi berisi pilihan dari API, bukan hardcoded
- [ ] Saat pilih Prodi → mapel pendukung tampil dengan benar
- [ ] Saran 2 mapel TKA muncul

**Validation:**
- [ ] Semua 3 request berhasil (status 200)
- [ ] Response time < 200ms setiap request

---

### **BLOK C: State & Data Persistence (3 scenarios)**

#### C1. Profil Tersimpan di Server (Bukan Hanya localStorage)
**Precondition:** Sudah login (A2), sudah isi profil (kelas + prodi)

**Steps:**
1. Buka halaman Profil (tombol profil di header)
2. Lihat data kelas + prodi yang sudah diisi
3. Buka database MySQL, query: `SELECT kelas, prodi_tujuan FROM pengguna WHERE id='[user_id]'`
4. Bandingkan dengan nilai di halaman

**Expected:**
- Database memiliki kelas & prodi_tujuan terisi
- Nilai di halaman cocok dengan database

**Validation:**
- [ ] Database: `pengguna.kelas` = "12", `pengguna.prodi_tujuan` = ID prodi yang dipilih
- [ ] Tidak ada data hanya di localStorage

---

#### C2. Kemajuan Checklist Tersimpan & Ter-sync
**Precondition:** Sudah login, di halaman Daftar Periksa

**Steps:**
1. Buka halaman Daftar Periksa
2. Centang 3 butir checklist
3. Refresh halaman (F5)
4. Lihat apakah 3 butir masih ter-centang

**Expected:**
- Sebelum refresh: 3 butir ter-centang
- Setelah refresh: 3 butir **tetap ter-centang** (tersimpan di server, bukan hanya localStorage)

**Validation (via Database):**
- Query: `SELECT * FROM kemajuan WHERE pengguna_id='[user_id]'`
- Hasil: 3 record untuk 3 butir checklist yang di-centang
- Field `selesai_pada` terisi dengan timestamp

**Validation (via API):**
- Sebelum centang: `GET /api/v1/kemajuan` → array kosong
- Setelah centang & refresh: `GET /api/v1/kemajuan` → array 3 item

---

#### C3. Data Recover saat Login di Device Baru
**Precondition:** Sudah login & isi data di device A (localhost:8080)

**Steps:**
1. Di device A: login, isi checklist, lihat prodi pilihan → kemajuan tersimpan
2. Buka localStorage, delete token
3. Simulasi device baru: refresh halaman, localStorage kosong
4. Login ulang dengan email & password yang sama
5. Buka halaman Daftar Periksa → apakah checklist yang tadi masih ada?

**Expected:**
- Device baru login → dapat token baru
- Buka Daftar Periksa → 3 butir **masih ter-centang** (data ter-recover dari server)
- Prodi pilihan juga **tetap ada** (dari database `pengguna.prodi_tujuan`)

**Validation:**
- [ ] Token baru ≠ token lama (session baru)
- [ ] Kemajuan checklist ter-recover (database query `SELECT * FROM kemajuan WHERE pengguna_id=?` punya data)
- [ ] Prodi tetap sesuai

---

### **BLOK D: Security & Error Handling (3 scenarios)**

#### D1. Akses Resource Orang Lain (Ownership Check)
**Precondition:** Sudah login sebagai user A, ada data Arsip/Kartu dari user B

**Steps:**
1. Login sebagai User A (email: `user.a@test.local`)
2. Inspect kartu Arsip milik User A, catat ID-nya
3. Buka Dev Tools Network tab
4. Attempt akses API: `GET /api/v1/kartu/[id_kartu_user_b]`
   - Ganti ID dengan kartu milik user lain (atau construct URL)
5. Lihat response

**Expected:**
- Response: `{"error": "Kartu tidak ditemukan", "code": "TIDAK_KETEMU"}` (HTTP 404, bukan 403)
- User A tidak bisa lihat/edit/hapus kartu user B
- Database: tidak ada query yang return data user B

**Validation:**
- [ ] HTTP Status: 404 (bukan 200 atau 403)
- [ ] Response error message konsisten dengan SDD §4.5 (uniform "tidak ketemu", bukan "tidak punya akses")

---

#### D2. API Tanpa Token (Unauthenticated)
**Precondition:** Tidak ada token di localStorage (logout sebelumnya)

**Steps:**
1. Logout (atau delete localStorage token)
2. Buka Dev Tools Network
3. Attempt request: `GET /api/v1/kemajuan` (tanpa token)
4. Atau: `POST /api/v1/kemajuan` (tanpa token)

**Expected:**
- Response: `{"error": "Token tidak valid", "code": "TOKEN_TIDAK_VALID"}` (HTTP 401)
- Data tidak kembali
- Halaman UI auto-redirect ke login

**Validation:**
- [ ] HTTP Status 401
- [ ] Browser auto-redirect ke halaman login/onboarding

---

#### D3. Network Error Graceful Handling
**Precondition:** Backend sedang berjalan, kemudian dibunuh / jaringan disconnect

**Steps:**
1. Login, buka halaman Beranda (linimasa sudah load)
2. Stop backend server (Ctrl+C di terminal backend)
3. Di halaman Beranda, tunggu 5 detik
4. Coba klik "Refresh" atau navigasi ke halaman lain
5. Lihat error handling

**Expected:**
- Halaman **tidak crash** (bukan blank page / infinite spinner)
- Pesan error tampil (sesuai SDD §2 penanganan galat): "Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat."
- Data yang sudah ter-load tetap tampil (dari cache / localStorage)
- Tombol retry tersedia

**Validation:**
- [ ] Halaman tetap fungsional (bukan white screen)
- [ ] Error message jelas & user-friendly
- [ ] Data lokal (linimasa, konten) tetap tampil

---

### **BLOK E: Performance & Regression (1 scenario)**

#### E1. Performance Baseline & Regression Check
**Precondition:** Setup environment sesuai Quick Start

**Steps:**
1. Buka halaman dengan Network tab monitoring
2. Measure response time untuk 5 key API endpoints:
   - `GET /api/v1/linimasa`
   - `GET /api/v1/khusus-smk`
   - `GET /api/v1/cerita-alumni`
   - `POST /api/v1/masuk`
   - `GET /api/v1/kemajuan`
3. Catat setiap response time
4. Reload 3x, ambil rata-rata

**Expected:**
- Setiap endpoint < 200ms (development server lokal)
- Staging (Vercel/Railway): < 500ms
- Tidak ada timeout (30s+)

**Regression Check:**
- [ ] P0 UI (Beranda, Khusus SMK, Alumni, Pilih Mapel, Checklist) tetap render dengan benar
- [ ] Tidak ada JavaScript error di console
- [ ] Navigasi antar halaman smooth (bukan lag/freeze)
- [ ] Mobile responsiveness (360px test): semua tombol clickable, teks terbaca

---

## 📝 Test Report Format

Setelah menjalankan semua 15 scenarios, buat report dengan format:

```markdown
# E2E Test Report — Backend + P0 UI

**Date:** [tanggal test]  
**Environment:** Development / Staging  
**Tester:** [nama]

## Summary
- **Total Scenarios:** 15
- **Passed:** [X]
- **Failed:** [Y]
- **Skipped:** [Z]
- **Overall:** [PASS / FAIL]

## Per-Scenario Results

| Blok | Scenario | Status | Notes |
|------|----------|--------|-------|
| A | A1 — Daftar Akun | ✅ PASS | Login berhasil, data tersimpan |
| A | A2 — Login | ✅ PASS | |
| ... | ... | ... | ... |

## Critical Issues Found
[Jika ada, list di sini dengan severity HIGH/MEDIUM/LOW]

## Recommendations
[Saran untuk backend-engineer, ui-engineer, atau architectural changes]

## Blockers for v1 Release
[Apakah ada yang harus diperbaiki sebelum 3 September?]

## Sign-off
- [ ] QA-reviewer approved untuk lanjut ke Level-In implementation
- [ ] Backend-engineer acknowledged issues
```

---

## 🚨 Escalation Path

Jika menemukan issue:

1. **Critical (Blocker v1 rilis):**
   - Contoh: login tidak jalan, data tidak tersimpan, 500 error
   - Action: Stop testing, report langsung ke PM & backend-engineer
   - Prioritas: fix dalam 24 jam

2. **High (Penting, tapi tidak blocker):**
   - Contoh: response time > 500ms, error message tidak jelas
   - Action: Dokumentasikan di report, prioritaskan untuk fix sebelum staging

3. **Low (Nice to have):**
   - Contoh: styling minor, micro-optimization
   - Action: Log di report, bisa handle di sprint berikutnya

---

## ✅ Definition of Done (QA E2E)

E2E testing selesai ketika:
- [ ] 15/15 scenarios selesai (atau skipped dengan alasan jelas)
- [ ] Report dibuat & di-share ke PM + backend-engineer
- [ ] Critical issues ditentukan & roadmap fix disepakati
- [ ] Approval: "Siap untuk Level-In implementation & staging deploy"

---

**Ready?** Jalankan test sekarang, report hasil ke PM.
