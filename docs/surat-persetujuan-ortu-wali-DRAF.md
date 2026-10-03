# Surat Persetujuan Orang Tua/Wali — LANJUT

> **DRAF — wajib direview ahli hukum sebelum dipakai.** Disusun LANJUT_047
> (3 Oktober 2026). Bagian `[ISI: ...]` menunggu keputusan Khalifa. Hapus
> kotak ini, catatan untuk peninjau, dan bagian petugas sebelum dicetak untuk
> orang tua/wali.

## Catatan untuk peninjau (tidak ikut dicetak)

- **Cara pakai.** Sekolah mencetak dan membagikan surat ini. Orang tua/wali
  menandatangani, lalu sekolah mengumpulkannya. Petugas mencatat persetujuan
  ke akun siswa dengan `npm run persetujuan-ortu` (folder
  `LANJUT_App/server`), memakai nomor/tanggal surat sebagai `--catatan`.
  Tanpa `--ya` skrip hanya menampilkan pratinjau.
- **Satu persetujuan, satu versi.** Surat ini merujuk ke kebijakan privasi
  **versi 1** (`docs/kebijakan-privasi-DRAF.md`). Yang dicatat di sistem adalah
  satu persetujuan orang tua/wali untuk versi itu. Fitur AI hanya aktif bila
  persetujuan ini ada dan tidak dicabut, **dan** siswa sudah membaca kebijakan
  versi yang berlaku.
- **Data di surat sengaja sedikit.** Nama, hubungan, dan tanda tangan orang
  tua/wali, plus nomor HP yang boleh dikosongkan, tidak dimasukkan ke LANJUT.
  Yang masuk sistem hanya status persetujuan dan nomor/tanggal surat.
- **Perlu keputusan.** Apakah persetujuan untuk akun dasar dan untuk fitur AI
  perlu dipisah menjadi dua pilihan. Draf ini memakai satu pernyataan, karena
  sistem saat ini mencatat satu persetujuan (lihat Lampiran C kebijakan).

---

[ISI: kop surat sekolah]

**Nomor:** ............................................

**Perihal:** Persetujuan Orang Tua/Wali untuk Penggunaan Data Siswa di Aplikasi LANJUT

Yth. Bapak/Ibu Orang Tua/Wali Siswa,

LANJUT adalah aplikasi yang membantu siswa menyiapkan jalan ke kuliah:
jadwal pendaftaran, daftar persiapan, catatan belajar, dan latihan soal.
LANJUT dikelola oleh [ISI: nama badan pengelola]. Karena banyak siswa masih
di bawah 18 tahun, sebagian fitur LANJUT membutuhkan persetujuan Bapak/Ibu.

**Data yang disimpan LANJUT tentang anak Bapak/Ibu:**

- data akun: nama pengguna, email (kalau diisi), kelas, jenis sekolah, prodi
  impian, dan gaya belajar;
- yang dibuat anak di aplikasi: centang daftar persiapan, kartu catatan, dan
  hasil latihan soal;
- catatan keamanan akun, misalnya kapan terakhir masuk.

Kata sandi disimpan dalam bentuk acak sehingga tidak bisa dibaca siapa pun.
LANJUT tidak mengumpulkan lokasi, kontak, foto, atau nomor HP anak.

**Fitur AI (belum aktif).** Nanti LANJUT punya fitur tanya-jawab dengan AI.
Pesan yang ditulis anak, dan [ISI: data akun yang ikut dikirim], akan dikirim
ke penyedia AI pihak ketiga, yaitu [ISI: nama penyedia AI], yang kemungkinan
memprosesnya di luar negeri, di [ISI: negara/wilayah]. Fitur ini hanya aktif
untuk anak Bapak/Ibu bila Bapak/Ibu menyetujuinya lewat surat ini.

**Hak Bapak/Ibu:** melihat data anak yang tersimpan, meminta perbaikan atau
penghapusan, dan **mencabut persetujuan kapan saja**. Setelah dicabut, fitur
AI langsung ditutup untuk akun anak. Pencabutan disampaikan lewat sekolah atau
ke [ISI: kontak pengelola LANJUT].

Kebijakan privasi lengkap (versi 1) dapat dibaca di aplikasi LANJUT (menu
Jalur Saya → Baca kebijakan privasi) atau diminta ke sekolah dalam bentuk
cetak.

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

☐ **menyetujui** data anak saya diproses oleh LANJUT sesuai kebijakan privasi
versi 1, termasuk pengiriman pesan ke penyedia AI pihak ketiga yang
kemungkinan memproses data di luar negeri, ketika fitur AI diaktifkan.

☐ **tidak menyetujui.**

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
