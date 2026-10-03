# TASK: LANJUT_047 — Kerangka Persetujuan Orang Tua/Wali dan Kebijakan Privasi

## Konteks

Tujuan Khalifa: AI chatbot LANJUT harus bisa membantu siswa secara
maksimal, dan jangan sampai tertahan hanya karena urusan izin data.
Pengguna LANJUT adalah siswa SMP/SMA/SMK, banyak yang di bawah 18
tahun, sehingga UU PDP Pasal 25 berlaku: pemrosesan data pribadi anak
wajib mendapat persetujuan orang tua dan/atau wali. PP pelaksana UU PDP
dilaporkan berlaku Januari 2027 dan menegaskan bahwa tombol "setuju"
atau pernyataan sendiri dari pengguna tidak cukup; persetujuan harus
benar-benar berasal dari orang tua/wali, dan harus ada mekanisme
(elektronik maupun nonelektronik) untuk memperolehnya.

Kerangka ini adalah biaya satu kali yang membuka jalan agar AI
sungguhan nanti boleh dipakai penuh. Dibangun sekarang supaya tidak
dibongkar ulang.

**Batasan keras yang TETAP berlaku:** task ini TIDAK membuat panggilan
ke `api.anthropic.com` atau layanan AI pihak ketiga mana pun, dan tidak
mengirim data pengguna ke luar sistem sendiri. Integrasi AI sungguhan
adalah task terpisah setelah dokumen spek AI selesai. Task ini hanya
menyiapkan pencatatan persetujuan dan gerbangnya.

**Prioritas tetap: fungsi dulu.** Tampilan boleh sederhana. Semua teks
baru ditandai DRAF.

## Yang Diminta

### 1. Pencatatan persetujuan (server)
Migrasi baru dan endpoint, mengikuti pola tabel pribadi sebelumnya
(`butir_pribadi`, `kartu`):
- Catatan **per akun** berisi: jenis (`kebijakan_privasi` atau
  `ortu_wali`), versi kebijakan, status, waktu dicatat, sumber
  (`mandiri`, `surat_sekolah`, `admin`), dan catatan bebas (misal nomor
  atau tanggal surat).
- **Riwayat tidak ditimpa.** Persetujuan baru atau pencabutan menambah
  baris, supaya ada jejak siapa-kapan-versi berapa.
- **Pencabutan didukung.** Orang tua/wali berhak mencabut; setelah
  dicabut, akun dianggap belum menyetujui.
- Versi kebijakan yang berlaku dan versi minimum persetujuan orang tua
  disimpan di konfigurasi (tabel konfigurasi yang sudah ada), tidak
  ditulis di kode.
- `GET /persetujuan/saya` (wajib login): status akun sendiri saja.
- Siswa hanya bisa mencatat persetujuan jenis `kebijakan_privasi`
  untuk dirinya. Jenis `ortu_wali` TIDAK boleh bisa dibuat oleh akun
  siswa lewat API (itu sama saja siswa menyetujui untuk dirinya).

### 2. Cara persetujuan orang tua dicatat (nonelektronik via sekolah)
- Skrip admin, mengikuti pola `verifikasi-konten`: menandai persetujuan
  orang tua/wali untuk daftar nama pengguna (argumen atau berkas), dengan
  sumber `surat_sekolah` dan catatan referensi surat. Semua perubahan
  wajib diakhiri `--ya`; tanpa itu hanya pratinjau. Sediakan juga
  `--cabut`.
- Jangan membuat panel admin web di task ini.

### 3. Gerbang AI (server)
- Fungsi tunggal, misalnya `bolehPakaiAi(penggunaId)`, bernilai benar
  hanya kalau akun punya persetujuan `ortu_wali` aktif (tidak dicabut)
  dengan versi di atas minimum **dan** sudah menerima kebijakan versi
  yang berlaku.
- Belum ada endpoint AI, jadi cukup fungsi ini dengan tes lengkap.
  Dokumentasikan di README server bahwa setiap endpoint AI di masa depan
  WAJIB memanggil fungsi ini di server, bukan hanya mengandalkan app.

### 4. Layar di app
- **Sebelum daftar:** layar kebijakan privasi ringkas (DRAF) dengan
  tautan ke versi lengkap, dan kotak "Saya sudah membaca" untuk
  kebijakan. Tombol Daftar baru aktif setelah dicentang.
- **Jalur Saya:** baris status persetujuan, hanya baca (belum atau
  sudah persetujuan orang tua/wali), dengan penjelasan singkat dan
  ramah.
- **Layar Ngobrol:** chat stub tetap berfungsi untuk semua akun seperti
  sekarang. Tambahkan hanya satu kalimat info kecil bahwa balasan AI
  sungguhan aktif setelah orang tua/wali menyetujui (DRAF). Jangan ubah
  perilaku stub.

### 5. Dokumen untuk review ahli hukum (DRAF)
Tulis di `docs/`, ditandai jelas **DRAF — wajib direview ahli hukum
sebelum dipakai**:
- **Draf kebijakan privasi** dalam bahasa yang bisa dipahami siswa.
  Isinya harus sesuai data yang BENAR-BENAR dikumpulkan app: periksa
  kolom di basis data (nama pengguna, nama tampilan, email opsional,
  kelas, jenis sekolah, prodi impian, gaya belajar, progres, kartu,
  riwayat latihan, dll.) dan daftarkan semuanya. Cantumkan tujuan
  penggunaan, bahwa fitur AI memakai penyedia pihak ketiga yang
  kemungkinan memprosesnya di luar negeri, hak orang tua/wali (akses,
  koreksi, penghapusan, pencabutan), dan kontak pengelola. Tandai
  bagian yang butuh keputusan Khalifa dengan `[ISI: ...]`, jangan
  mengarang nama badan, alamat, atau kontak.
- **Draf surat persetujuan orang tua/wali** yang bisa dicetak sekolah,
  dengan tempat nomor surat dan tanda tangan.

### 6. Jangan sentuh
- Jangan memblokir fitur dasar yang sudah ada (Linimasa, Arsip,
  Latihan, dll.) berdasarkan persetujuan di task ini. Pendaftaran akun
  dasar juga memproses data anak; itu pertanyaan terbuka untuk Khalifa
  dan ahli hukum (lihat laporan).
- Jangan menyimpan isi chat, dan jangan menambah panggilan jaringan
  keluar apa pun.

## Test

- [ ] Akun tanpa catatan apa pun: `bolehPakaiAi` salah
- [ ] Hanya kebijakan diterima, tanpa persetujuan orang tua: salah
- [ ] Persetujuan orang tua + kebijakan versi berlaku: benar
- [ ] Setelah `--cabut`: salah lagi
- [ ] Versi persetujuan di bawah minimum (konfigurasi dinaikkan): salah
- [ ] Akun siswa tidak bisa membuat catatan `ortu_wali` lewat API (ditolak)
- [ ] Lintas akun: status akun A tidak terlihat atau berpengaruh ke akun B
- [ ] Skrip admin: tanpa `--ya` hanya pratinjau, tidak mengubah apa pun
- [ ] Layar kebijakan: tombol Daftar nonaktif sampai kotak dicentang
- [ ] Tidak ada request ke domain eksternal (cek log jaringan)
- [ ] Tidak ada regresi di tes lama; typecheck 0 error

## Definition of Done

- [ ] Pencatatan persetujuan berversi dan tidak menimpa riwayat
- [ ] Gerbang AI server berfungsi dan teruji
- [ ] Skrip admin dengan `--ya` dan `--cabut`
- [ ] Layar kebijakan, status di Jalur Saya, dan info di layar Ngobrol
- [ ] Dua dokumen DRAF (kebijakan privasi dan surat persetujuan) tersedia
- [ ] Tidak ada panggilan ke layanan AI eksternal
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Struktur tabel dan endpoint baru
- Daftar data pribadi yang ditemukan di basis data dan masuk ke draf kebijakan
- Bagian `[ISI: ...]` yang menunggu keputusan Khalifa
- Konfirmasi: tidak ada kode yang memanggil API eksternal
- Catatan: hal yang belum tercakup (misal mekanisme permintaan penghapusan atau akses data oleh orang tua) sebagai kandidat task berikutnya
