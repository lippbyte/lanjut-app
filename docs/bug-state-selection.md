# Dua Bug State Selection — dari Rekaman Uji HP

**Konteks:** ditemukan dari analisis frame-by-frame rekaman video uji manual di HP (bukan tebakan). Ini BUKAN masalah mobile-first/arsitektur CSS — ini bug logika JS state management, lokal dan spesifik.

---

## Bug 1: Pilihan prodi di onboarding.html numpuk, tidak saling meniadakan

**Reproduksi:** buka onboarding.html slide "tanya" → tap "Teknik Informatika" (terpilih, biru) → tap "Belum, aku belum tahu" → **kedua-duanya tetap kelihatan terpilih**, bukan cuma yang terakhir ditekan.

**Kemungkinan akar masalah:** handler tap kemungkinan cuma set `aria-pressed="true"` pada chip yang ditekan, tanpa lebih dulu set `aria-pressed="false"` pada SEMUA chip lain — termasuk lintas grup rumpun (Teknologi & Rekayasa, Kesehatan, Ekonomi & Bisnis, dst — sekarang prodi dikelompokkan per rumpun, beda dari versi lama yang datar). Kemungkinan besar loop "clear semua chip" itu cuma jalan di dalam satu grup rumpun yang sama, tidak menjangkau grup lain + opsi "belum tahu" yang berdiri sendiri di luar grup manapun.

```
Perbaiki handler pemilihan prodi di onboarding.html/app.js: sebelum
set aria-pressed="true" pada chip yang ditekan, set aria-pressed="false"
pada SEMUA chip prodi lain TANPA TERKECUALI — lintas semua grup rumpun
DAN termasuk "Belum, aku belum tahu". Ini harus berperilaku seperti
radio button (satu pilihan aktif dalam seluruh set), bukan checkbox
per grup.

Tes manual wajib: pilih satu prodi dari rumpun A, lalu prodi dari
rumpun B, pastikan rumpun A ikut ter-deselect. Lalu pilih prodi apa
pun, lalu tap "Belum, aku belum tahu", pastikan prodi sebelumnya
ter-deselect juga. Foto/screenshot hasil tes sebagai bukti, bukan
klaim kode saja.
```

---

## Bug 2: Ringkasan profil di Pilih Mapel tidak sinkron saat ganti prodi langsung dari daftar

**Reproduksi:** dari hasil Pilih Mapel, tap "Ubah prodi" → pilih prodi lain langsung dari daftar (mis. K3) → hasil mapel di bawah berubah benar ke K3, TAPI kotak "DARI JAWABAN KAMU SEBELUMNYA" di atas tetap menampilkan prodi lama.

**Ini bukan cuma bug — ada keputusan produk yang perlu diambil dulu sebelum diperbaiki:**

```
PERTANYAAN UNTUK PM (bukan cuma "perbaiki kodenya"):
Ketika pengguna pilih prodi baru langsung dari daftar di Pilih Mapel
(lewat "Ubah prodi"), apakah itu:

(a) MENGGANTI profil resmi pengguna (prodi_impian di lanjut.profil.v1)
    secara permanen — sama seperti kalau diubah lewat onboarding — atau
(b) Cuma "menjelajah" prodi lain sementara, tanpa mengubah profil resmi?

Kalau (a): perbaiki dengan menulis balik ke Profil.simpan() setiap kali
prodi dipilih dari daftar ini, supaya kotak ringkasan selalu sinkron.

Kalau (b): kotak ringkasan JANGAN memakai label yang sama ("DARI
JAWABAN KAMU SEBELUMNYA") untuk dua hal berbeda — pisahkan jadi dua
info: "Profil kamu: [prodi resmi]" (tetap) dan "Sedang melihat:
[prodi yang sedang dijelajah]" (berubah-ubah), supaya tidak
membingungkan.
```

Kalau tidak yakin mana yang benar, defaultkan ke (a) — itu yang paling intuitif buat pengguna (mereka pikir mereka baru saja "mengubah pilihan", bukan "menjelajah").

---

## Yang TIDAK perlu dikerjakan

Jangan rebuild arsitektur, jangan ganti ke desktop-first, jangan sentuh sistem token/CSS breakpoint yang sudah terverifikasi solid di banyak audit sebelumnya. Kedua bug di atas murni logika JS, scope-nya kecil dan lokal.
