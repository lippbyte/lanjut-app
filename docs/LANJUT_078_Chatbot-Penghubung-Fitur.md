# TASK: LANJUT_078 — Chatbot Ngobrol sebagai Penghubung Fitur (OpenRouter, Dibatasi)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau perubahan firewall. Tidak menambah paket baru kecuali disebut di bawah
dan disetujui PM. Tidak menaikkan versi kebijakan privasi.

**Tidak ada panggilan ke OpenRouter atau layanan luar dari task ini.** Semua tes
memakai tiruan (mock) untuk respons OpenRouter. Pengujian dengan kunci sungguhan
dilakukan hanya setelah PM memberi izin tertulis di percakapan.

## Konteks

LANJUT_077b sudah di-commit (`8a74cc6`) dan diterima. Saklar `ai_aktif` di
`lanjut_test` sudah `0`. Sekarang Ngobrol akan dibuat menjadi penghubung semua
fitur, sesuai arahan PM: chatbot LANJUT menghubungkan fitur lain dan memakai
API OpenRouter.

Prinsip yang tidak boleh berubah:
- Saklar `ai_aktif` bawaan `0`. Tanpa saklar aktif, Ngobrol tidak memanggil AI.
- Kebijakan privasi berlaku. Akun yang belum menerima kebijakan versi berlaku
  menerima 403 `AI_BELUM_DIIZINKAN`.
- Deteksi tanda bahaya tetap dijalankan **sebelum** pesan masuk ke AI. Bila
  terdeteksi, server membalas dengan respons tetap dari `server/config/tanda-bahaya*`
  dan tidak memanggil AI.
- Server memilih sendiri data apa yang dikirim ke OpenRouter. App tidak pernah
  mengirim data akun mentah.
- Kunci API hanya di `.env` lokal. Kunci tidak dicetak, tidak masuk log, tidak
  masuk laporan, dan tidak masuk berkas task.

Model yang tertulis di konfigurasi adalah `anthropic/claude-sonnet-5.5` dengan
`data_collection: deny`. Slug ini **belum diverifikasi**. Simpan sebagai nilai
konfigurasi, tandai di laporan sebagai belum diverifikasi, dan jangan
memverifikasinya dengan panggilan ke luar.

## Yang Diminta

### A. Penghubung fitur di server
1. Ngobrol menerima pertanyaan siswa dan memilih **satu konteks** dari daftar
   tetap: modul Arsip (`modul`), latihan Level-In (`saran`), atau Persiapan
   Event (`event`). Jika tidak ada yang cocok, konteks kosong.
2. Untuk tiap konteks, server menyusun **ringkasan terbatas**, misalnya:
   - Arsip: judul dan ringkasan satu modul, bukan isi lengkap.
   - Latihan: nama mapel dan jenis saran, bukan riwayat jawaban.
   - Event: jenis, tanggal, dan mapel satu event terdekat. Materi bebas tidak
     dikirim.
   Tidak ada tanggal lahir, nama sekolah, nomor, email, atau alamat yang dikirim.
3. Hasil dari server, misalnya tautan ke modul atau ke latihan, ditampilkan
   sebagai kartu di app dengan tombol. Tombol membuka layar yang sudah ada.
   Chatbot tidak membuka layar sendiri.
4. Jawaban AI disimpan maksimal 1 riwayat per percakapan dan dihapus setelah
   24 jam. Jangan simpan lebih lama tanpa persetujuan PM.
5. Log server tidak memuat isi pesan siswa, isi ringkasan, atau kunci. Cukup ID
   akun, jenis konteks, kode status, dan lama respons.
6. Batas panjang pesan siswa: 500 karakter. Lebih dari itu ditolak dengan
   400 `VALIDASI_GAGAL`.
7. Panggilan ke OpenRouter: batas waktu 20 detik. Jika gagal atau waktu habis,
   balas 503 `AI_SEMENTARA_GAGAL` dengan pesan netral. Jangan menampilkan galat
   mentah dari OpenRouter.
8. Urutan cek endpoint: login → saklar `ai_aktif` → kebijakan (`bolehPakaiAi`)
   → tanda bahaya → isi. Sama seperti pola yang sudah ada di `ngobrol`.

### B. Penghubung fitur di app
9. Di layar Ngobrol, saat AI aktif, tampilkan maksimal tiga kartu tautan di bawah
   jawaban (modul, latihan, event). Jika tidak ada konteks, tidak ada kartu.
10. Saat saklar mati, layar Ngobrol tampil seperti sekarang. Tidak ada teks baru
    tentang AI.
11. Teks baru (judul kartu, petunjuk "Tanya apa saja tentang…", pesan galat) masuk
    `docs/salinan-teks-lanjut.md` dan lembar review, berstatus DRAF.
12. Input suara (dari 074) tetap bekerja. Teks hasil suara diperlakukan sama
    dengan teks ketik.

### C. Tes dan mutasi
13. Tes server minimal 15 kasus, dengan OpenRouter tiruan:
    - saklar mati: tidak ada panggilan ke tiruan;
    - kebijakan belum diterima: 403 `AI_BELUM_DIIZINKAN`;
    - tanda bahaya: respons tetap, tiruan tidak dipanggil;
    - pesan lebih dari 500 karakter: 400;
    - ringkasan tidak memuat tanggal lahir, nomor, atau email (ada tes);
    - log tidak memuat isi pesan atau kunci (ada tes);
    - gagal dan batas waktu: 503 `AI_SEMENTARA_GAGAL`, tanpa galat mentah;
    - konteks tidak dikenal: konteks kosong;
    - akun lain tidak ikut ringkasan.
14. Tes app: kartu tautan maksimal tiga; saklar mati tidak mengubah layar.
15. Mutasi, gagal lalu lulus: (a) kirim ringkasan lengkap akun, (b) lewati
    pengecekan tanda bahaya, (c) hilangkan pengecekan saklar.
16. Tes `saklar-bawaan-dan-smp` (077b) akan gagal bila `ai_aktif` dinyalakan di
    `lanjut_test`. Jangan melonggarkannya. Nyalakan saklar hanya di dalam tes
    dengan `try/finally`, lalu pulihkan ke `0`.

### D. Teks dan kebijakan
17. Kebijakan privasi tidak diubah. Bila fitur ini menambahkan jenis data baru
    yang dikirim ke pihak ketiga (OpenRouter), tulis DRAF kalimat di
    `docs/salinan-teks-lanjut.md` dan lembar review, lalu tandai
    "menunggu tinjauan hukum". Jangan menaikkan versi.
18. Catat di laporan bahwa kebijakan privasi v2 belum memuat OpenRouter sebagai
    penerima data.

## Di luar task ini
- Panggilan sungguhan ke OpenRouter atau layanan luar.
- Menyalakan `ai_aktif` untuk penggunaan oleh siswa.
- Pembuatan kunci, rotasi kunci, atau mengubah `.env`.
- Verifikasi slug model.
- Pilih Mapel dan Mapel Saya (079).
- Notifikasi push.
- Speech-to-text Android.

## Definition of Done

- [ ] Ngobrol memilih satu konteks dari daftar tetap; ringkasan terbatas; ada tes
- [ ] Tidak ada tanggal lahir, nomor, email, atau alamat dalam ringkasan; ada tes
- [ ] Tanda bahaya dicek sebelum tiruan dipanggil; ada tes
- [ ] Saklar mati: tidak ada panggilan ke tiruan; ada tes
- [ ] Tes server minimal 15 kasus lulus
- [ ] Mutasi (a), (b), (c) gagal lalu lulus
- [ ] `saklar-bawaan-dan-smp` tetap lulus; `ai_aktif` di `lanjut_test` = `0` setelah tes
- [ ] Tidak ada panggilan ke OpenRouter atau layanan luar (dibuktikan dengan pencarian kode dan log)
- [ ] Kunci API tidak tercetak, tidak masuk log, tidak masuk laporan
- [ ] Teks DRAF tercatat; kebijakan privasi tidak berubah
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Commit kecil, pesan commit menyebut `LANJUT_078`

## Bukti 360 px
- Layar Ngobrol dengan saklar mati: sama seperti sebelumnya
- Layar Ngobrol dengan respons tiruan dan tiga kartu tautan
- Simpan di `scratchpad/bukti-078/`. Tidak ada tangkapan layar di repo.

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Daftar konteks dan isi ringkasan untuk tiap konteks (tanpa data nyata)
- Bukti tidak ada panggilan keluar (pencarian kode `fetch`, `http`, `https`, `axios`)
- Hasil tes dan tiga mutasi
- Nilai `ai_aktif` sebelum dan sesudah
- Slug model: belum diverifikasi, dan dari mana nilainya diambil
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API. Kunci hanya di `.env` lokal.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Jangan menaikkan versi kebijakan privasi.
- Teks baru berstatus DRAF sampai disetujui.
