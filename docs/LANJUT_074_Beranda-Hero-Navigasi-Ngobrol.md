# TASK: LANJUT_074 — Beranda Gaya Hero, Banner Promosi, dan Navigasi dengan Tombol Tengah Ngobrol

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru tanpa melaporkan nama paket, versi, dan alasannya lebih dulu.

## Konteks

Khalifa minta Beranda dan navigasi diubah dengan referensi dua aplikasi yang
sudah dikenal pengguna Indonesia (GoPay dan DANA). Yang diambil hanya POLA
susunannya, bukan logo, warna merek, ikon, atau aset mereka. Warna dan komponen
tetap memakai token LANJUT yang sudah ada di `tokens.ts`.

Keputusan Khalifa untuk task ini:
1. **Kartu tenggat jadi kartu hero di paling atas**, di bawah sapaan, dengan
   latar berwarna sendiri (seperti kartu saldo GoPay). Ini menggantikan urutan
   yang diusulkan di LANJUT_072. Susunan itu sekarang dinyatakan tidak berlaku.
2. **Bagian di bawah hero** (urutan dari atas):
   a. Baris progres ("X dari 3 langkah") — ditempatkan di bawah kartu hero
   b. Grid ikon fitur
   c. Kartu Info Penting
   d. Banner promosi berbentuk carousel (seperti DANA), bukan satu banner
3. **Navigasi bawah**: 5 tab. Tab tengah lebih besar dan sedikit menonjol ke
   atas (seperti tombol QRIS di DANA). Tab tengah adalah **Ngobrol Bareng**
   (chatbot LANJUT) dengan ikon kelinci LANJUT.
4. **Cek Posisi Gue diganti nama menjadi "Jalur Saya".**
5. **Input suara (speech-to-text)** di chatbot: ya.
6. Persetujuan orang tua sudah termasuk dalam syarat di awal daftar akun.
   Task ini TIDAK mengubah alur daftar. Task terpisah akan menyusulnya setelah
   tinjauan hukum (lihat catatan di bawah).

Catatan perubahan terhadap task sebelumnya:
- **LANJUT_072** (urutan Beranda): urutan yang berlaku sekarang adalah yang
  tertulis di task ini. Sapaan tetap di paling atas.
- **LANJUT_073** (banner): sebelumnya satu banner di bawah sapaan. Sekarang
  banner menjadi carousel di bawah Info Penting. Aturan verifikasi dan tanggal
  dari 073 tetap berlaku, dan kebijakan "gagal-tertutup" dari 073 tidak diubah.

## Yang Diminta

### A. Kartu hero tenggat (di bawah sapaan)
1. Kartu tenggat terdekat dibuat menjadi kartu hero: latar berwarna penuh
   memakai token yang sudah ada (pilih satu warna utama dari `tokens.ts`), teks
   putih atau kontras tinggi, ukuran lebih besar dari kartu lain.
2. Isi kartu: judul tahapan, hitung mundur hari (contoh: "13 hari menuju
   Pelaksanaan TKA"), dan tanggal. Ini mengikuti isi kartu tenggat yang ada,
   tanpa teks baru.
3. Kartu hanya tampil untuk kelas 12. Untuk kelas lain, kartu hero tidak tampil
   dan bagian di bawahnya naik (tidak ada ruang kosong).
4. Saat tenggat sedang dimuat atau gagal, kartu hero tidak tampil (tidak ada
   pesan galat), sesuai aturan 072.

### B. Baris progres
5. Baris progres diletakkan tepat di bawah kartu hero. Isinya tidak berubah.

### C. Grid ikon, Info Penting, dan banner promosi
6. Grid ikon tetap seperti sekarang (jumlah dan isi ikon tidak berubah).
7. Kartu Info Penting di bawah grid. Aturan 072b tetap berlaku.
8. **Banner promosi carousel** di bawah Info Penting:
   - Tampil maksimal 3 banner sekaligus, digeser horizontal, dengan indikator titik.
   - Sumber data tetap `GET /konten/banner`, tetapi endpoint sekarang
     mengembalikan **sampai 3 banner** (bukan 1), diurutkan dari `tanggal_mulai`
     paling baru. Ubah juga tes 073 yang mengunci angka 1 menjadi 3.
   - Aturan lain dari 073 tetap: hanya yang terverifikasi, hanya yang berlaku
     hari ini (WIB), hanya https, field internal tidak dikirim.
   - Satu banner = kartu dengan judul, isi singkat, dan "Sumber: …" yang
     membuka `url_sumber`. Tidak ada tombol tutup.
   - Kalau kosong, seluruh carousel tidak tampil.

### D. Navigasi bawah (5 tab)
9. Tab sekarang (4 tab) dipertahankan namanya dan fungsinya. Laporkan dulu nama
   dan letak semua tab saat ini sebelum mengubah.
10. Susunan baru: 2 tab di kiri, **tab tengah Ngobrol Bareng**, 2 tab di kanan.
11. Tab tengah:
    - Lingkaran sedikit lebih besar dari tab lain, sedikit menonjol ke atas
      dari garis navigasi.
    - Ikon kelinci LANJUT. **Aset ikon belum ada di repo.** Pakai placeholder
      generik (lingkaran berisi huruf "L") dan tulis di laporan bahwa ikon
      kelinci menunggu aset dari Khalifa. Jangan membuat ikon kelinci sendiri.
    - Label "Ngobrol" di bawah ikon, sama seperti tab lain.
    - Ukuran sentuh minimal 44 px.
12. Tab tengah membuka layar chatbot yang sudah ada (LANJUT_051/053).
    Gerbang persetujuan tetap: akun tanpa persetujuan melihat layar terkunci
    (403), bukan halaman kosong.

### E. Ganti nama "Cek Posisi Gue" menjadi "Jalur Saya"
13. Semua kemunculan label "Cek Posisi Gue" (tab, judul layar, tombol di grid
    dan kartu) diganti "Jalur Saya". Teks di salinan teks dan lembar review ikut
    diubah.
14. **Konflik nama:** di layar Akun sudah ada bagian bernama "Jalur Saya"
    (nama tampilan, kelas, prodi impian). Untuk sementara, **ubah judul bagian
    di Akun menjadi "Data Akun"**, dan laporkan tindakan ini. Jangan menghapus
    isi bagian itu.

### F. Input suara di chatbot (speech-to-text)
15. Di kolom ketik Ngobrol ditambahkan tombol mikrofon.
16. Pengenalan suara dilakukan oleh perangkat (speech-to-text bawaan HP atau
    browser). **Rekaman suara tidak dikirim ke server dan tidak disimpan.**
    Hanya teks hasil pengenalan yang dikirim, sama seperti pesan ketik biasa.
17. Kalau perangkat tidak mendukung pengenalan suara, tombol mikrofon tidak
    tampil. Tidak ada pesan galat.
18. Laporkan pustaka yang dipakai untuk web dan Android, dan apakah pustaka
    itu butuh paket baru. Jangan pasang paket baru sebelum melaporkannya dulu.
19. Tombol mikrofon tidak boleh mengaktifkan mikrofon tanpa tindakan pengguna
    (selalu dengan ketukan).

## Di luar task ini
- Alur daftar akun dan persetujuan orang tua (task terpisah setelah tinjauan hukum).
- Isi banner, konten tenggat, dan data apa pun di database.
- Kartu hero untuk kelas selain 12.
- Layar Eksplorasi Kampus (LANJUT_075, direncanakan).
- Mengubah grid ikon (jumlah dan isi).
- Ikon kelinci: tidak dibuat di task ini.
- Meniru logo, warna merek, atau aset GoPay atau DANA.
- Mengubah kontrak endpoint selain yang disebut di poin C.8.

## Definition of Done

- [ ] Laporan awal berisi nama dan letak semua tab navigasi sekarang sebelum diubah
- [ ] Kartu hero tenggat di bawah sapaan, hanya untuk kelas 12, latar berwarna penuh
- [ ] Baris progres di bawah kartu hero; grid, Info Penting, carousel banner berurutan sesuai poin 2
- [ ] Carousel banner menampilkan maksimal 3 item, dengan indikator titik
- [ ] Endpoint banner mengembalikan maksimal 3; tes 073 yang lama diperbarui dan lulus
- [ ] Navigasi 5 tab: 2 kiri, tab tengah Ngobrol, 2 kanan; tab tengah lebih besar dan menonjol
- [ ] Ikon tengah memakai placeholder "L", dan laporan mencatat ikon kelinci menunggu aset
- [ ] Label "Cek Posisi Gue" tidak tersisa di kode, salinan teks, atau lembar review
- [ ] Judul bagian di Akun berubah menjadi "Data Akun"; isinya tidak berubah
- [ ] Tombol mikrofon tampil hanya bila perangkat mendukung pengenalan suara
- [ ] Rekaman suara tidak dikirim ke server (dibuktikan lewat tes atau pemeriksaan permintaan jaringan)
- [ ] Akun tanpa persetujuan tetap melihat layar terkunci saat menekan tab Ngobrol
- [ ] Tes otomatis: urutan Beranda (hero, progres, grid, Info Penting, carousel); tab tengah di posisi ketiga; label "Jalur Saya"; carousel maksimal 3
- [ ] Mutasi, gagal lalu lulus: (a) hapus batas 3 carousel, (b) pindahkan tab tengah ke posisi lain, (c) kembalikan label "Cek Posisi Gue"
- [ ] `npx tsc --noEmit` lolos di `LANJUT_App`; `npm test` (server) lolos
- [ ] Teks baru (judul carousel jika ada, "Sumber:", "Ngobrol", "Jalur Saya", "Data Akun") tercatat sebagai DRAF di `salinan-teks-lanjut.md` dan lembar review
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru yang dipasang tanpa laporan
- [ ] Commit kecil, pesan commit menyebut `LANJUT_074`

## Bukti 360 px (wajib)
- Akun kelas 12 dengan tenggat: hero di atas, lalu progres, grid, Info Penting, carousel, navigasi lima tab
- Akun kelas 10: tanpa hero, navigasi lima tab
- Akun tanpa persetujuan: tekan tab tengah, muncul layar terkunci
- Tombol mikrofon tampil dan tidak tampil (satu kondisi tiap)
- Simpan di `scratchpad/`, bukan di repo

## Laporkan
- Daftar tab sebelum perubahan (nama dan letak)
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Hasil tes dan tiga mutasi (gagal lalu lulus)
- Pustaka suara yang dipakai untuk web dan Android, dan apakah butuh paket baru
- Letak kode hero, carousel, dan tab tengah
- Keputusan yang kamu ambil sendiri, misalnya warna latar hero dari token mana, dan ukuran tab tengah
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
