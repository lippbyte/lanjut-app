# Surat Persetujuan Orang Tua/Wali — LANJUT

> **DRAF — wajib direview ahli hukum sebelum dipakai.** Disusun LANJUT_047
> (3 Oktober 2026), diperbarui menjadi **draf v2** di LANJUT_056 (8 Oktober
> 2026) karena fitur AI sudah dibangun. Bukan nasihat hukum; tetap perlu
> ditinjau orang yang paham UU PDP. Bagian `[ISI: ...]` menunggu diisi
> (pengisinya di `docs/kebijakan-v2-klaim-vs-kode.md`). Hapus kotak ini,
> catatan untuk peninjau, dan bagian petugas sebelum dicetak untuk orang
> tua/wali.

## Catatan untuk peninjau (tidak ikut dicetak)

- **Cara pakai.** Sekolah mencetak dan membagikan surat ini. Orang tua/wali
  menandatangani, lalu sekolah mengumpulkannya. Petugas mencatat persetujuan
  ke akun siswa dengan `npm run persetujuan-ortu` (folder
  `LANJUT_App/server`), memakai nomor/tanggal surat sebagai `--catatan`.
  Tanpa `--ya` skrip hanya menampilkan pratinjau.
- **Satu persetujuan, satu versi.** Surat ini merujuk ke kebijakan privasi
  versi yang dirilis bersama teks draf v2. Nomornya belum ada (`[ISI: nomor
  versi saat dirilis]`) karena versi di konfigurasi baru dinaikkan setelah
  app dengan teks v2 dirilis. Jangan mencetak surat sebelum nomor itu diisi.
  Yang dicatat di sistem adalah satu persetujuan orang tua/wali untuk versi
  itu. Fitur AI hanya aktif bila persetujuan ini ada dan tidak dicabut,
  **dan** siswa sudah menerima kebijakan versi yang berlaku.
- **Setiap kalimat tentang data dicocokkan dengan kode** di
  `docs/kebijakan-v2-klaim-vs-kode.md`. Ubah kalimat di surat ini hanya
  bersama kebijakan dan tabel itu.
- **Data di surat sengaja sedikit.** Nama, hubungan, dan tanda tangan orang
  tua/wali, plus nomor HP yang boleh dikosongkan, tidak dimasukkan ke LANJUT.
  Yang masuk sistem hanya status persetujuan dan nomor/tanggal surat.
- **Perlu keputusan.** (a) Apakah akun dasar (tanpa AI) juga butuh
  persetujuan orang tua/wali; draf ini hanya meminta persetujuan untuk fitur
  AI, karena hanya itu yang dipagari sistem. (b) Apakah persetujuan untuk
  pengiriman potongan modul dan pencarian web perlu dipisah dari persetujuan
  fitur AI; sistem saat ini mencatat satu persetujuan.

---

[ISI: kop surat sekolah]

**Nomor:** ............................................

**Perihal:** Persetujuan Orang Tua/Wali untuk Fitur AI di Aplikasi LANJUT

Yth. Bapak/Ibu Orang Tua/Wali Siswa,

LANJUT adalah aplikasi yang membantu siswa menyiapkan jalan ke kuliah:
jadwal pendaftaran, daftar persiapan, catatan belajar, latihan soal, dan
teman tanya-jawab berbasis AI. LANJUT dikelola oleh [ISI: nama badan
pengelola]. Fitur AI baru bisa dipakai anak Bapak/Ibu setelah ada
persetujuan Bapak/Ibu lewat surat ini.

**Data yang disimpan LANJUT:** data akun (nama pengguna, email bila diisi,
kelas, jenis sekolah, prodi impian, gaya belajar), centang daftar persiapan,
kartu catatan, hasil latihan, modul pelajaran yang diunggah anak (hanya
teksnya; bisa dihapus permanen oleh anak), dan catatan keamanan akun. Kata
sandi disimpan dalam bentuk acak. LANJUT tidak mengumpulkan lokasi, kontak,
foto, nomor HP, usia, atau nama sekolah.

**Fitur AI (Ngobrol Bareng LANJUT).** Balasan dibuat AI dari penyedia pihak
ketiga: OpenRouter, yang meneruskan permintaan ke perusahaan yang menjalankan
model AI ([ISI: penyedia model yang dipakai]). Data dapat diproses di luar
Indonesia ([ISI: negara atau wilayah]). Setiap kali anak mengirim pesan,
server LANJUT mengirimkan:

- pesan anak dan riwayat obrolan sesi itu (hingga 20 pesan terakhir);
- kelas, jenis sekolah, prodi impian, dan gaya belajar anak;
- untuk pertanyaan pelajaran: hingga 3 potongan modul anak yang berkaitan;
  dan, bila fitur pencarian web diaktifkan, pertanyaan anak (tanpa data
  lain) diteruskan ke mesin pencari pihak ketiga.

Nama, nama pengguna, email, dan ID akun anak tidak ikut dikirim. Nomor
telepon, email, dan nomor 16 angka seperti NIK di pesan disamarkan otomatis,
tetapi nama atau alamat yang ditulis anak sendiri tetap terkirim. Isi
obrolan tidak disimpan di server LANJUT dan hilang dari aplikasi saat
ditutup. LANJUT meminta penyedia yang tidak mengumpulkan data pengguna;
apa yang disimpan penyedia dan berapa lama mengikuti kebijakan mereka
([ISI: hasil pengecekan kebijakan OpenRouter dan penyedia model]). Pesan
yang menunjukkan tanda bahaya serius tidak diteruskan ke AI; LANJUT langsung
menampilkan kartu layanan bantuan (bila obrolan dilanjutkan, pesan itu ikut
di riwayat yang dikirim). Jawaban AI bisa keliru.

**Hak Bapak/Ibu:** melihat data anak, meminta perbaikan atau penghapusan,
dan **mencabut persetujuan kapan saja** lewat sekolah atau [ISI: kontak resmi
tim LANJUT]. Setelah pencabutan dicatat, fitur AI tertutup untuk akun anak
mulai pesan berikutnya. Pencabutan tidak menghapus data yang sudah pernah
dikirim ke penyedia AI.

Persetujuan ini mengacu pada kebijakan privasi LANJUT versi [ISI: nomor versi
saat dirilis], yang dapat dibaca lengkap di aplikasi (menu Jalur Saya → Baca
kebijakan privasi) atau diminta ke sekolah dalam bentuk cetak.

### Data siswa

| | |
|---|---|
| Nama siswa | .................................................. |
| Kelas | .................................................. |
| Nama pengguna di LANJUT | .................................................. |

### Pernyataan orang tua/wali

Yang bertanda tangan di bawah ini:

| | |
|---|---|
| Nama orang tua/wali | .................................................. |
| Hubungan dengan siswa | ☐ Ayah ☐ Ibu ☐ Wali: .................................. |
| Nomor HP (boleh dikosongkan) | .................................................. |

menyatakan **telah membaca penjelasan di atas** dan:

☐ **menyetujui** anak saya memakai fitur AI LANJUT, termasuk pengiriman data
yang disebut di atas ke penyedia AI pihak ketiga yang dapat memprosesnya di
luar Indonesia, sesuai kebijakan privasi versi [ISI: nomor versi saat
dirilis].

☐ **tidak menyetujui.** Fitur AI tetap terkunci untuk akun anak saya.

Saya tahu persetujuan ini dapat saya cabut kapan saja lewat sekolah atau
kontak pengelola LANJUT.

&nbsp;

............................., tanggal ........................ 20.....

| Orang tua/wali | Mengetahui, [ISI: wali kelas / kepala sekolah] |
|---|---|
| &nbsp; | &nbsp; |
| &nbsp; | &nbsp; |
| (tanda tangan) | (tanda tangan dan cap sekolah) |
| Nama: ...................................... | Nama: ...................................... |

---

### Untuk petugas sekolah (tidak dibagikan ke orang tua/wali)

| | |
|---|---|
| Diterima tanggal | .................................................. |
| Dicatat ke LANJUT tanggal | .................................................. |
| Oleh | .................................................. |
| Pilihan orang tua/wali | ☐ setuju → dicatat  ☐ tidak setuju → tidak dicatat |
| Perintah | `npm run persetujuan-ortu -- --pengguna=<nama pengguna> --catatan="Surat <nomor>, <tanggal>" --ya` |
| Pencabutan | `npm run persetujuan-ortu -- --pengguna=<nama pengguna> --cabut --catatan="<dasar pencabutan>, <tanggal>" --ya` |
