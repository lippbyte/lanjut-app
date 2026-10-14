# TASK: LANJUT_075 — Eksplorasi Kampus untuk Semua Jenjang (SMP sampai SMA/SMK/MA)

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru tanpa melaporkan nama paket, versi, dan alasannya lebih dulu.

## Konteks

Khalifa minta Eksplorasi Kampus bisa diakses semua kelas, dari SMP sampai
SMA/SMK/MA, karena fokus LANJUT adalah membantu siswa menentukan arah dan jalur
sesuai cita-cita. Sekarang Eksplorasi Tujuan (F10) hanya lengkap untuk kelas 12.
Siswa SMP dan kelas 10–11 belum punya layar yang sesuai dengan tahap mereka.

Prinsip yang tidak boleh dilanggar:
- **Data prodi yang belum terverifikasi tidak tampil.** Sekarang status verifikasi
  profil F10 masih 0/18. Jadi, profil prodi detail TIDAK tampil untuk kelas
  mana pun sampai tim konten memverifikasinya. Ini juga berlaku untuk kelas 12.
- **Label "Perkiraan" tetap tampil** untuk bagian yang belum dicek (aturan 044
  dan 2 Okt).
- **Untuk siswa di bawah 18 tahun**, app hanya menyimpan bidang minat (rumpun),
  bukan daftar prodi lengkap, dan hanya bila persetujuan akun sudah ada.
- Tidak ada angka biaya, daya tampung, peluang diterima, atau nilai minimal
  yang tidak bersumber resmi.

Keputusan Khalifa yang dipakai di task ini: Eksplorasi Kampus dibuka ke semua
jenjang. Isinya berbeda per jenjang (lihat "Yang Diminta").

## Yang Diminta

### A. Tiga versi per jenjang
Layar Eksplorasi Kampus (`/eksplorasi-tujuan`) menampilkan isi yang berbeda
sesuai jenjang akun. Jenjang dibaca dari `kelompokJenjang(kelas)` yang sudah ada.

1. **SMP (kelas 7–9): "Kenali Minatmu"**
   - Pilihan bidang minat (rumpun), maks. 5 pilihan.
   - Tiap bidang punya penjelasan singkat umum (apa yang dipelajari, contoh
     pekerjaan secara umum). Teks ini DRAF dan belum boleh memuat nama prodi.
   - Tombol "Simpan minatku" menyimpan rumpun saja.
   - Tidak ada daftar prodi, tidak ada jalur masuk, tidak ada tanggal.
   - Kalimat penutup: "Ini baru gambaran awal. Kamu masih punya waktu untuk menentukan."

2. **Kelas 10–11: "Jalur dan Bidangmu"**
   - Penjelasan jalur masuk perguruan tinggi secara umum (SNBP, SNBT, mandiri),
     tanpa tanggal. Tanggal hanya dari data terverifikasi (Linimasa).
   - Pilihan bidang minat (rumpun), maks. 3 pilihan.
   - Tombol "Simpan bidangku" menyimpan rumpun.
   - Daftar prodi detail TIDAK tampil. Tampilkan satu kalimat:
     "Daftar prodi dan syaratnya akan muncul setelah dicek ke sumber resmi."
   - Penanda "Perkiraan" tetap ada bila ada bagian yang belum dicek.

3. **Kelas 12: layar F10 yang sudah ada**
   - Tidak diubah di task ini. Profil prodi tetap tidak tampil bila belum
     terverifikasi (aturan 043/044 tetap berlaku).

### B. Data dan endpoint
4. Rumpun bidang diambil dari data yang sudah ada (`berlaku_untuk_rumpun` dan
   daftar rumpun di `checklist.json` atau tabel rumpun yang ada). Jangan
   membuat daftar rumpun baru tanpa melapor.
5. Simpan bidang minat ke field yang baru di akun (`minat_rumpun`, JSON array,
   maks. 5 item). Migrasi wajib idempotent dan tercatat di `server/migrasi`.
   Field ini tidak mengubah `prodi_impian`.
6. Endpoint: `PATCH /pengguna/saya` sudah ada. Tambahkan `minat_rumpun` di
   dalamnya dengan validasi: array string, hanya nilai dari daftar rumpun yang
   sah, maks. 5. Nilai di luar daftar ditolak dengan `galat: "RUMPUN_TIDAK_SAH"`.
7. Akun SMP dan kelas 10–11 hanya bisa mengirim `minat_rumpun` jika akunnya sudah
   menerima kebijakan privasi versi yang berlaku. Akun tanpa persetujuan menerima
   403 `AI_BELUM_DIIZINKAN` seperti biasa ketika mencoba menyimpan.

   > Catatan: persetujuan orang tua saat ini ada di syarat daftar. Penjaga ini
   > tetap dipasang sampai tinjauan hukum selesai. Jangan dilonggarkan di task ini.

### C. Pintu masuk
8. Kartu "Mulai eksplorasi" di kartu pembuka SMP (sekarang membuka Gaya Belajar,
   keputusan 071) TIDAK berubah.
9. Tambahkan satu kartu "Eksplorasi Kampus" di grid Beranda untuk semua jenjang.
   Jika grid sudah penuh, jangan menambah ikon: tukar isi satu kartu yang sudah
   ada dan laporkan kartu mana yang diganti. Keputusan ini dilaporkan, bukan
   diputuskan sendiri tanpa catatan.
10. Eksplorasi Tujuan tetap bisa dibuka dari kartu A2 (kelas 10–12) dan kartu
    pintu yang sudah ada.

### D. Teks
11. Semua teks baru (judul layar per jenjang, penjelasan bidang, kalimat penutup,
    tombol Simpan, dan kalimat "Daftar prodi… akan muncul…") masuk
    `docs/salinan-teks-lanjut.md` sebagai DRAF dan lembar review.
12. Penjelasan bidang (poin A.1) ditulis sebagai DRAF. Jangan mengarang fakta
    tentang pekerjaan atau gaji. Penjelasan hanya berupa deskripsi umum.

## Di luar task ini
- Mengisi atau memverifikasi profil prodi (tugas tim konten).
- Mengubah layar F10 untuk kelas 12 selain penjaga yang sudah ada.
- Menambah tanggal, biaya, atau daya tampung.
- Pencarian kampus atau prodi dari internet.
- Mengubah alur daftar dan persetujuan.
- Mengubah grid ikon selain satu penukaran yang dilaporkan (poin C.9).
- Mengubah sumber data verifikasi.

## Definition of Done

- [ ] Laporan awal: daftar rumpun yang sudah ada, dan kartu grid Beranda sekarang
- [ ] Tiga versi layar per jenjang: SMP, 10–11, dan 12 (tidak berubah)
- [ ] Tidak ada daftar prodi yang tampil untuk kelas mana pun sebelum terverifikasi
- [ ] SMP tidak melihat jalur masuk dan tanggal apa pun
- [ ] Kelas 10–11 melihat jalur umum tanpa tanggal, dan tanggal hanya dari data terverifikasi
- [ ] Penanda "Perkiraan" tampil bila bagian belum dicek
- [ ] Field `minat_rumpun` dibuat dengan migrasi idempotent
- [ ] Validasi: tolak nilai di luar daftar, tolak lebih dari 5 item, tolak akun tanpa persetujuan
- [ ] Migrasi dijalankan dua kali tanpa error
- [ ] Tes server baru minimal 12 kasus: validasi, batas jumlah, akun lintas, migrasi idempotent, dan isi layar per jenjang
- [ ] Mutasi, gagal lalu lulus: (a) hilangkan validasi rumpun, (b) tampilkan daftar prodi tanpa filter verifikasi, (c) tampilkan jalur dan tanggal ke SMP
- [ ] `npm test` (server) lolos; `npm run periksa-sql` lulus; `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Teks DRAF tercatat di `salinan-teks-lanjut.md` dan lembar review
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_075`

## Bukti 360 px (wajib)
- Akun kelas 7: layar Kenali Minatmu (tanpa jalur, tanpa tanggal, tanpa prodi)
- Akun kelas 10: layar Jalur dan Bidangmu (tanpa daftar prodi, dengan kalimat pengganti)
- Akun kelas 12: layar F10 seperti sebelumnya (profil belum terverifikasi tidak tampil)
- Simpan di `scratchpad/`, bukan di repo

## Laporkan
- Daftar rumpun yang dipakai dan letak datanya
- Kartu grid yang ditukar (jika ada), dan alasannya
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Hasil tes dan tiga mutasi (gagal lalu lulus)
- Nama migrasi dan bukti idempotent
- Keputusan yang kamu ambil sendiri, misalnya cara menampilkan rumpun yang belum punya penjelasan
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
