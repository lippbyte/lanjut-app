# TASK: LANJUT_052 — Audit LANJUT_051 terhadap Spek AI (Baca Saja)

## Konteks

LANJUT_051 menyambungkan Ngobrol ke AI lewat OpenRouter, di balik
gerbang persetujuan. Sebelum kunci API diisi dan pesan pertama dikirim
keluar, perlu dipastikan implementasinya sesuai `LANJUT_Spek-AI-Ngobrol.md`
dan batasan privasi yang sudah diputuskan. Begitu kunci diisi, pesan
siswa (atau pesan uji) meninggalkan sistem kita, jadi pemeriksaan ini
dilakukan SEBELUM uji langsung.

**Task ini murni audit.** Aturan keras:
- JANGAN mengubah kode, konfigurasi, atau basis data.
- JANGAN mengisi atau meminta kunci API, dan JANGAN memanggil OpenRouter
  atau layanan luar mana pun. Kalau perlu melihat isi permintaan,
  gunakan penyedia tiruan (mock) atau mode kering yang tidak
  mengirim apa pun ke jaringan.
- Laporkan apa adanya, termasuk yang belum ada. Jangan mengarang bukti:
  setiap jawaban "Ya" harus menunjuk berkas dan baris atau hasil uji.

## Yang Diminta

Periksa setiap butir di bawah, lalu isi tabel: **Butir | Ya / Sebagian /
Tidak | Bukti (berkas:baris atau hasil uji) | Catatan**.

### A. Gerbang dan akses
1. Endpoint Ngobrol wajib login dan memanggil `bolehPakaiAi` di
   **server** (bukan hanya di app).
2. Akun tanpa persetujuan orang tua/wali, atau tanpa kebijakan versi
   berlaku, ditolak, dan app jatuh ke balasan stub dengan label uji coba.
3. Pembatasan laju per akun, batas panjang pesan, dan batas jumlah
   pesan riwayat yang dikirim.
4. Saklar mati di konfigurasi yang menonaktifkan AI seketika.
5. Fallback ke stub saat penyedia gagal, kena batas, atau waktu habis
   (bukan galat mentah ke siswa).

### B. Data yang dikirim ke penyedia
6. Tampilkan **contoh isi permintaan lengkap** yang akan dikirim
   (dari mock), untuk satu akun uji yang punya nama, nama pengguna,
   email, kelas, dan gaya belajar. Pastikan TIDAK ada nama, nama
   pengguna, email, id akun, nama sekolah, atau metadata penaut
   identitas. Sebutkan persis konteks apa yang ikut (jenjang, gaya
   belajar, dll.).
7. Penyaringan data pribadi (nomor telepon, email, angka mirip NIK) pada
   pesan sebelum dikirim. Tunjukkan uji dengan contoh.
8. Peringatan di layar chat agar tidak menulis data pribadi.
9. Pengaturan penyedia yang dikirim (misalnya preferensi kebijakan data
   atau pengumpulan data di OpenRouter, pemilihan model dan penyedia di
   baliknya). Laporkan apa yang diatur, apa yang tidak, dan model yang
   dipakai. Jangan menebak kebijakan retensi penyedia; tandai sebagai
   "perlu dicek Khalifa di dokumentasi penyedia".
10. Daftar semua host luar yang bisa dihubungi kode saat AI aktif.
    Seharusnya hanya host penyedia AI.

### C. Penyimpanan dan log
11. Server tidak menyimpan isi chat. Periksa tabel basis data dan semua
    jalur log: isi pesan tidak boleh muncul. Log hanya metadata (waktu,
    jumlah token, penanda keselamatan).
12. Galat dari penyedia tidak mencetak isi pesan atau kunci di log.

### D. Keselamatan siswa
13. Deteksi tanda bahaya (kata kunci di server dan/atau penilaian model)
    dan **kartu bantuan dari teks tetap di server**, bukan ditulis
    model. Tampilkan isi kartu yang ada sekarang dan apakah nomornya
    sudah diverifikasi (Healing119 119 ekstensi 8 sudah dicek; SAPA 129
    masih perlu dicek ke sumber resmi KemenPPPA).
14. Aturan tidak mengaku manusia, guru BK, psikolog, atau dokter; tidak
    menyebut cara menyakiti diri; tidak berdebat tentang keinginan itu.
15. Ketahanan terhadap permintaan "abaikan instruksimu" dan pembocoran
    instruksi sistem. Tunjukkan di mana ini ditangani.

### E. Perilaku sesuai spek
16. **Salin instruksi sistem lengkap** apa adanya ke laporan, supaya
    Khalifa bisa mereviunya: peran, gaya bicara, batas topik,
    kejujuran fakta (angka jalur masuk hanya dari data terverifikasi),
    dan perlakuan label "Perkiraan".
17. Keputusan 1 (materi mapel): apakah pengambilan potongan Arsip,
    pencarian web, dan sitasi sudah ada? Kalau belum (dugaan saya
    belum), tandai "Tidak" dan jelaskan bahwa itu task berikutnya.
    Jangan menambahkannya di sini.
18. Penilaian relevansi potongan sebelum dikutip (kelemahan pencarian
    kata kunci yang ditemukan di LANJUT_049). Kalau potongan Arsip belum
    dipakai, catat sebagai prasyarat.

### F. Kunci dan rahasia
19. Kunci API hanya dibaca dari `.env` di server; tidak ada di repo,
    riwayat git, bundel app, atau log. Pastikan `.env` ada di
    `.gitignore` dan tidak pernah ter-commit (periksa riwayat git untuk
    `OPENROUTER_API_KEY` dan pola kunci lain). Laporkan hasilnya.

### G. Pengujian
20. Tes otomatis LANJUT_051: apa yang diuji, dan apakah semua memakai
    penyedia tiruan (tidak ada panggilan nyata).
21. Skenario uji dari spek bagian 10 (40–50 percakapan): sudah ada atau
    belum. Kalau belum, sebutkan itu sebagai task berikutnya.

## Keluaran

1. Berkas `docs/audit-051-vs-spek.md` berisi tabel di atas dan salinan
   instruksi sistem (butir 16).
2. Ringkasan di laporan: jumlah butir Ya / Sebagian / Tidak.
3. **Daftar celah berurutan menurut keparahan**: keselamatan siswa dulu,
   lalu privasi dan data, lalu kualitas jawaban. Untuk tiap celah, saran
   perbaikan satu kalimat dan perkiraan besarnya (kecil, sedang, besar).
4. Rekomendasi tegas: **aman atau belum aman** untuk uji langsung
   dengan akun uji milik sendiri (bukan data siswa sungguhan), dan syarat
   yang harus dipenuhi dulu kalau belum.

## Definition of Done

- [ ] Semua 21 butir terisi dengan bukti, bukan dugaan
- [ ] Tidak ada perubahan pada kode, konfigurasi, atau basis data (cek diff dan status git)
- [ ] Tidak ada panggilan jaringan keluar selama audit
- [ ] Daftar celah berurutan dan rekomendasi aman/belum aman tertulis
- [ ] Commit hash untuk berkas audit dilaporkan

## Laporkan di akhir

- Commit hash dan lokasi `docs/audit-051-vs-spek.md`
- Jumlah butir Ya / Sebagian / Tidak
- Daftar celah teratas dan rekomendasi aman/belum aman
- Salinan instruksi sistem (di dalam berkas audit)
