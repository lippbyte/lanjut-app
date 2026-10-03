# TASK: LANJUT_048 — Layar Terima Kebijakan untuk Akun Lama dan Terima Ulang

## Konteks

Dari laporan LANJUT_047: akun yang dibuat sebelum kerangka persetujuan
tidak punya catatan penerimaan kebijakan privasi, dan belum ada layar
untuk menerimanya setelah daftar. Akibatnya akun lama tidak akan pernah
lolos gerbang AI `bolehPakaiAi` (yang mensyaratkan kebijakan versi
berlaku sudah diterima). Belum ada juga cara menerima ulang saat versi
kebijakan naik.

Tujuan Khalifa: AI chatbot untuk siswa harus bisa berfungsi penuh dan
tidak tertahan urusan izin. Task ini menutup celah itu untuk akun yang
sudah ada.

**Batasan keras yang TETAP berlaku:** tidak ada panggilan ke layanan AI
atau API luar mana pun. **Fitur dasar tidak boleh diblokir** oleh
penerimaan kebijakan di task ini (pertanyaan hukum soal akun dasar masih
terbuka). Hanya aktivasi AI sungguhan nanti yang bergantung pada
penerimaan ini.

**Prioritas tetap: fungsi dulu.** Tampilan sederhana; semua teks baru
DRAF.

## Yang Diminta

1. **Prompt penerimaan kebijakan setelah login.** Kalau akun belum
   menerima kebijakan versi yang berlaku (belum pernah, atau versinya
   lebih lama), tampilkan layar/jendela "Kebijakan privasi" yang memuat
   ringkasan dan tautan ke versi lengkap (pakai komponen kebijakan dari
   LANJUT_047, jangan menulis ulang), dengan dua tombol: **Terima** dan
   **Nanti saja**.
   - **Terima:** catat persetujuan jenis `kebijakan_privasi`, sumber
     `mandiri`, versi yang berlaku (lewat endpoint yang sudah ada).
   - **Nanti saja:** tutup tanpa mencatat apa pun; tidak memblokir
     navigasi. Prompt muncul lagi paling banyak sekali per sesi login.
2. **Urutan gerbang:** gerbang isi kelas dan jenis sekolah tetap
   didahulukan. Prompt kebijakan muncul setelah itu, bukan menggantikan
   atau menumpuk di atasnya.
3. **Jalur Saya:** tambahkan baris "Kebijakan privasi: diterima (versi
   X) / belum diterima" dengan tombol untuk membaca dan menerima.
   Letakkan dekat baris status persetujuan orang tua/wali yang sudah
   ada.
4. **Layar Ngobrol:** kalau kebijakan belum diterima, tampilkan satu
   kalimat ajakan menerima kebijakan (DRAF) dengan tautan ke layar
   penerimaan. Jangan mengubah perilaku stub.
5. **Terima ulang saat versi naik:** karena versi berlaku disimpan di
   konfigurasi, menaikkan versi di sana otomatis membuat prompt muncul
   lagi untuk semua akun. Uji ini.
6. Siswa hanya bisa mencatat persetujuan `kebijakan_privasi` untuk
   dirinya (aturan LANJUT_047 tidak berubah). Jangan membuka jalan
   apa pun bagi akun siswa untuk membuat catatan `ortu_wali`.

## Test

- [ ] Akun lama tanpa catatan: prompt muncul setelah login (dan setelah gerbang kelas/jenis sekolah, kalau ada)
- [ ] Terima: catatan tercatat, status di Jalur Saya berubah, prompt tidak muncul lagi
- [ ] Nanti saja: tidak ada catatan baru, navigasi ke semua layar tetap bebas, prompt tidak muncul lagi di sesi yang sama
- [ ] Versi kebijakan dinaikkan di konfigurasi: akun yang sudah menerima versi lama diminta menerima ulang
- [ ] Akun A menerima kebijakan, akun B tidak terpengaruh (tes lintas akun)
- [ ] Akun siswa tetap tidak bisa membuat catatan `ortu_wali`
- [ ] Tidak ada request ke domain eksternal (cek log jaringan)
- [ ] Tidak ada regresi di tes lama; typecheck 0 error

## Definition of Done

- [ ] Akun lama bisa menerima kebijakan, dan akun yang sudah menerima versi lama diminta ulang saat versi naik
- [ ] Tidak ada fitur dasar yang diblokir
- [ ] Teks baru ditandai DRAF di `salinan-teks-lanjut.md`
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Alur yang dialami akun lama (urutan layar setelah login)
- Screenshot prompt, baris di Jalur Saya, dan info di layar Ngobrol
- Konfirmasi: tidak ada panggilan ke API eksternal
