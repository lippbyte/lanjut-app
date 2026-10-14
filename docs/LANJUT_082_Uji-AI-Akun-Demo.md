# TASK: LANJUT_082 — Uji Satu Kali Chatbot AI untuk Akun Demo (Dibatasi)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Ini satu-satunya task yang boleh memanggil
OpenRouter, dan hanya dengan batasan di bawah. Tidak ada deploy, push, `eas build`,
atau perubahan firewall. Tidak menaikkan versi kebijakan privasi. Tidak menambah
paket baru.

## Izin PM

PM memilih opsi (b) untuk demo: chatbot menjawab dengan AI, **hanya untuk akun
`demo_`** di database lokal `lanjut_test`. Izin ini berlaku untuk **satu putaran
uji** pada task ini. Tidak berlaku untuk penguji umum, siswa, atau deploy.

## Batasan keras

1. **Kunci OpenRouter** hanya dibaca dari `.env` lokal di server. Jangan mencetak
   kunci, jangan menulisnya ke berkas task, log, laporan, atau repo. Jangan
   meminta kunci lewat pesan.
2. Sebelum memanggil OpenRouter, pastikan kunci sudah ada di `.env` dengan cara
   memeriksa **keberadaannya saja** (misalnya panjang karakter atau "ada/tidak").
   Jika tidak ada, berhenti dan laporkan. Jangan membuat kunci baru.
3. **Satu panggilan** ke OpenRouter untuk satu pesan uji. Tidak ada loop, tidak
   ada tes otomatis yang memanggil OpenRouter sungguhan. Semua tes lain tetap
   memakai tiruan.
4. Akun uji hanya awalan `demo_` di `lanjut_test`. Jangan memakai akun lain.
5. Pesan uji diisi oleh eksekutor dan tidak mengandung data pribadi. Contoh:
   "Apa yang bisa kamu bantu untuk persiapan UTS matematika?"
6. Jangan menyalakan saklar untuk akun di luar `demo_`. Saklar `ai_aktif` bersifat
   global, jadi nyalakan hanya selama jendela uji, lalu kembalikan ke `0`.
7. Saklar `event_sekolah_aktif` tetap `0`. Mikrofon tetap mati.
8. Jangan memanggil OpenRouter dengan model lain selain nilai `ai_model` di
   `konfigurasi_levelin`.

## Yang Diminta

### A. Persiapan
1. Periksa `.env` server: ada atau tidak kunci OpenRouter, tanpa mencetak nilainya.
   Laporkan "ada" atau "tidak ada".
2. Pastikan akun `demo_` untuk tiga jenjang masih ada (dari 081). Catat ID dan kelas.
3. Catat nilai `ai_aktif` sekarang (diperkirakan `0`).

### B. Jendela uji
4. PM akan memulai ulang server di komputernya setelah `.env` siap. Eksekutor
   **tidak** menjalankan atau mematikan server kecuali PM memintanya. Setelah
   server baru berjalan, catat PID dan jam mulai (tanpa perintah lengkap yang
   mengandung kunci).
5. Nyalakan `ai_aktif = 1` di `lanjut_test`. Catat jam mulai.
6. Dari sisi server, kirim satu pesan dari akun `demo_` kelas 8 (SMP) dengan konteks
   `modul`, lalu satu pesan dari akun `demo_` kelas 12 dengan konteks `saran`.
   Dua panggilan total, bukan lebih.
7. Catat dari log server: `konteks`, `tautan`, `status`, dan `lama`. Jangan
   mencatat isi pesan atau isi jawaban.
8. Jika OpenRouter menolak (misalnya slug model salah atau kunci tidak sah), catat
   **kode galat** yang dikembalikan server (`AI_SEMENTARA_GAGAL` atau lainnya),
   bukan teks mentah dari OpenRouter.
9. Kembalikan `ai_aktif = 0` setelah dua panggilan selesai atau gagal. Catat jam
   selesai dan nilai akhir dari database.

### C. Yang dibuktikan
10. Bukti bahwa ringkasan yang dikirim tidak memuat tanggal lahir, nomor, email,
    atau nama sekolah. Cukup tunjukkan jenis isi yang dikirim, bukan isi pesannya.
11. Bukti bahwa jawaban AI berlabel dan tidak disimpan di database.
12. Bukti bahwa saklar kembali `0`.

### D. Verifikasi slug model
13. Catat apakah slug `anthropic/claude-sonnet-5.5` diterima OpenRouter. Ini
    satu-satunya cara memverifikasi slug. Laporkan hasilnya sebagai "diterima"
    atau "ditolak dengan kode X". Jangan menulis slug baru tanpa izin PM.

### E. Gerbang
14. Setelah saklar kembali `0`, jalankan `npm test` (server) sekali. Tes
    `saklar-bawaan-dan-smp` harus lulus.

## Di luar task ini
- Penguji umum, siswa, atau akun selain `demo_`.
- Deploy, hosting, atau `eas build`.
- Mengubah kebijakan privasi (DRAF tetap menunggu tinjauan hukum).
- Mengubah kode penghubung fitur (078).
- Mengganti model atau slug.
- Menyimpan jawaban AI.

## Definition of Done

- [ ] Ada atau tidak adanya kunci di `.env` dilaporkan, tanpa nilai kunci
- [ ] Tepat dua panggilan ke OpenRouter; dicatat dari log server
- [ ] Hanya akun `demo_` yang dipakai
- [ ] Kode galat (jika ada) dilaporkan tanpa teks mentah dari OpenRouter
- [ ] Slug model: diterima atau ditolak, dengan kode
- [ ] `ai_aktif` dikembalikan ke `0`; nilai akhir dicek di database
- [ ] `event_sekolah_aktif` tetap `0`
- [ ] Tes `saklar-bawaan-dan-smp` lulus; `npm test` lolos
- [ ] Tidak ada kunci di log, laporan, berkas task, atau repo (pencarian dilakukan dan hasilnya dilaporkan)
- [ ] Tidak ada perubahan kode; hanya data uji dan bukti

## Laporkan
- Ada atau tidak adanya kunci di `.env` (tanpa nilai)
- PID dan jam mulai server baru
- Jam nyala dan jam matikan `ai_aktif`, dengan nilai akhir
- Log dua panggilan: konteks, tautan, status, lama
- Status slug model
- Bukti ringkasan tanpa data pribadi
- Hasil `npm test`
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Kunci OpenRouter tidak boleh tercetak, tertulis, atau dikirim ke mana pun.
- Jangan mengubah firewall, jangan menjalankan `npm audit fix` di folder app,
  dan jangan menulis ulang riwayat git.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tidak ada tangkapan layar di repo.
