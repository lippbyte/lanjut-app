# TASK: LANJUT_042 — Perbaiki Level-In + Audit Keamanan `/sinkron/klaim`

Task ini punya DUA bagian yang tidak saling bergantung secara teknis,
tapi digabung jadi satu task atas permintaan Khalifa. Kerjakan Bagian A
dulu, baru Bagian B — laporkan keduanya di akhir.

---

## BAGIAN A — Perbaiki Level-In

### Konteks
Dari audit LANJUT_033: `keputusan.js` masih stub yang melempar galat,
jadi `/kalibrasi/ringkasan` dan `/saran-harian` balas 500.
`konfigurasi_levelin` kosong. Tanda tangan fungsi server beda dari PWA.

Keputusan Khalifa:
- **Gratis** (bukan fitur berbayar).
- **Dihitung di server**, bukan di klien.
- **Threshold**: cari dulu apakah PWA punya logika kalibrasi level yang
  sudah jalan di produksi (kemungkinan besar ada, cuma beda format
  tanda tangan fungsi dari yang di server Expo). Kalau ketemu, PAKAI
  angka/logika itu — jangan bikin threshold baru dari nol. Kalau
  benar-benar tidak ada logika yang jelas di PWA, pakai fallback ini:

  | Kondisi | Hasil |
  |---|---|
  | Kartu dijawab di mapel itu < 10 | "Belum cukup data" — jangan kasih level |
  | Benar < 50% (dari ≥10 kartu) | "Perlu penguatan dasar" |
  | Benar 50–75% | "Cukup, lanjut latihan" |
  | Benar > 75% | "Udah kuat di mapel ini" |

### Yang Diminta
1. **Cari logika kalibrasi di kode PWA** (`MVP-PWA/` atau sejenisnya) —
   cek apakah ada fungsi yang menghitung level/kalibrasi dari riwayat
   jawaban. Laporkan apa yang ditemukan sebelum melanjutkan ke poin 2.
2. Perbaiki `keputusan.js` di server supaya tidak lagi melempar galat:
   - Pakai logika/threshold dari PWA kalau ditemukan di poin 1.
   - Kalau tidak ada, pakai tabel fallback di atas.
   - Sumber data: riwayat latihan dari F7 (LANJUT_041) — jumlah
     dijawab dan jumlah benar per mapel, per akun.
3. Isi `konfigurasi_levelin` (yang sekarang kosong) sesuai threshold
   final yang dipakai — jangan hardcode angka langsung di kode kalau
   tabel ini memang dirancang untuk menyimpan nilai yang bisa diubah.
4. Perbaiki `/kalibrasi/ringkasan` dan `/saran-harian` supaya tidak
   lagi 500 — balas hasil kalibrasi yang sesuai (atau "belum cukup
   data" sesuai aturan di atas).
5. **Jangan bangun UI/layar baru untuk ini di task ini** — scope-nya
   cuma benerin logika server dulu. Layar yang menampilkan hasilnya
   bisa task terpisah setelah ini dikonfirmasi jalan benar.

### Test — Bagian A
- [ ] `/kalibrasi/ringkasan` tidak lagi balas 500
- [ ] `/saran-harian` tidak lagi balas 500
- [ ] Akun dengan <10 jawaban di suatu mapel → "belum cukup data"
- [ ] Akun dengan riwayat jawaban cukup → hasil kalibrasi sesuai threshold yang dipakai
- [ ] Tidak ada regresi di tes F7 (LANJUT_041) yang sudah ada
- [ ] Typecheck 0 error

---

## BAGIAN B — Audit Keamanan `/sinkron/klaim`

### Konteks
Dari laporan LANJUT_041: endpoint lama `/sesi-latihan` dan
`/riwayat-latihan` punya celah lintas akun (sudah diperbaiki di
LANJUT_041). Ditemukan juga: `/sinkron/klaim` (klaim data tamu dari
PWA) menulis ke tabel riwayat latihan yang sama, tapi **belum diperiksa
apakah rentan celah serupa**.

### Yang Diminta
1. Periksa `/sinkron/klaim`: apakah ada cara bagi satu akun untuk
   mengklaim/menautkan data riwayat latihan milik akun lain, atau
   menautkan ke sesi/kartu yang bukan miliknya?
2. Kalau ditemukan celah serupa (rujukan tidak diperiksa kepemilikannya
   sebelum disimpan), perbaiki dengan pola yang sama seperti
   LANJUT_041 (periksa semua rujukan sebelum menyimpan).
3. Tambahkan tes lintas akun eksplisit untuk `/sinkron/klaim`, mengikuti
   pola tes yang sudah ada di LANJUT_034/039/041.
4. Kalau ternyata TIDAK ada celah (misal karena desain klaim data tamu
   memang berbeda dan sudah aman), laporkan temuannya dan kenapa aman —
   tidak perlu memaksakan perubahan kalau memang tidak diperlukan.

### Test — Bagian B
- [ ] Tes lintas akun eksplisit untuk `/sinkron/klaim` ditulis dan lolos
- [ ] Kalau ada perbaikan: tidak ada regresi di tes `/sinkron/klaim` yang sudah ada
- [ ] Typecheck 0 error

---

## Definition of Done (keduanya)
- [ ] Bagian A: Level-In tidak lagi 500, threshold terpakai dan sumbernya jelas
- [ ] Bagian B: `/sinkron/klaim` sudah diaudit, diperbaiki kalau perlu, dan punya tes lintas akun
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan (boleh commit terpisah untuk A dan B)

## Laporkan di akhir
- Bagian A: apa yang ditemukan di PWA soal logika kalibrasi, threshold final yang dipakai dan sumbernya
- Bagian A: konfirmasi `/kalibrasi/ringkasan` dan `/saran-harian` sudah tidak 500
- Bagian B: hasil audit `/sinkron/klaim` — ada celah atau tidak, dan apa yang diperbaiki kalau ada
- Commit hash untuk masing-masing bagian
