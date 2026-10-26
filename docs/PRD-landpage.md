# LANJUT Website — Product Requirements Document

**Dokumen:** `PRD.md`  
**Versi:** 1.0  
**Status:** Draft untuk implementasi  
**Produk:** Website publik LANJUT  
**Bahasa utama:** Bahasa Indonesia

---

## 1. Ringkasan Produk

LANJUT (*Layanan Navigasi Jalur Untuk Kuliah*) membantu siswa memahami pilihan pendidikan setelah sekolah dan menavigasi jalur menuju perguruan tinggi. Fokus awal LANJUT adalah siswa kelas XII SMK, karena informasi seleksi dan eksplorasi kampus sering terasa lebih dekat dengan konteks SMA daripada kebutuhan siswa SMK.

Website ini adalah pintu masuk publik untuk memperkenalkan produk, menjelaskan fitur dan arah pengembangan, menerbitkan dokumentasi publik, serta menyediakan unduhan APK Android dan riwayat rilis.

Website **berbeda repositori** dari aplikasi mobile LANJUT yang dibangun dengan Expo. Website harus dapat dikembangkan, dibangun, dan dirilis secara independen dari aplikasi mobile.

## 2. Visi dan Prinsip

### Visi
Membantu pelajar melihat bahwa masa depan mereka memiliki banyak jalur, lalu memberi informasi yang lebih relevan agar mereka bisa memilih dengan sadar.

### Prinsip produk
1. **SMK-first, bukan SMK-only.** Prioritaskan kebutuhan siswa SMK sekarang, tanpa menutup kemungkinan untuk SMA dan SMP.
2. **Informasi yang jujur.** Bedakan fitur tersedia, sedang dikembangkan, dan masih direncanakan.
3. **Akses informasi terbuka.** Dokumentasi utama dapat dibaca publik tanpa login.
4. **Konten lebih penting daripada efek.** Animasi menarik perhatian, tetapi tidak boleh menghambat pemahaman atau akses.
5. **Bisa dipercaya.** Jangan mengarang statistik, testimoni, dukungan institusi, model bisnis, atau kemampuan AI.
6. **Bertumbuh bertahap.** Website MVP tidak perlu backend khusus jika konten statis dan metadata rilis sudah mencukupi.

## 3. Masalah yang Ingin Diselesaikan

- Siswa SMK kesulitan menghubungkan jurusan keahlian dengan program studi yang relevan.
- Informasi jalur seleksi, pilihan mata pelajaran, TKA, dan kampus tidak selalu disajikan sesuai konteks SMK.
- Siswa membutuhkan satu tempat untuk memahami fitur, perkembangan, dan tujuan LANJUT.
- Pengguna membutuhkan sumber unduhan APK yang jelas dan catatan perubahan setiap versi.
- Pengembang, pendidik, calon mitra, dan publik memerlukan dokumentasi produk, bisnis, dan teknis yang bisa diakses tanpa akun.

## 4. Tujuan dan Ukuran Keberhasilan

### Tujuan MVP
- Menjelaskan LANJUT dalam beberapa detik setelah pengguna membuka homepage.
- Menunjukkan mengapa LANJUT memprioritaskan siswa SMK.
- Memperkenalkan fitur aplikasi dan roadmap secara akurat.
- Menyediakan dokumentasi publik yang terstruktur.
- Memungkinkan pengguna menemukan APK terbaru dan riwayat rilis.
- Menyediakan halaman pengenalan AI LANJUT tanpa berpura-pura bahwa chatbot sudah aktif jika belum tersedia.

### Indikator yang dapat diukur
- Pengguna dapat menemukan tombol unduh dari homepage dengan mudah.
- Semua halaman inti dapat dibuka langsung melalui URL dan saat di-refresh.
- Tautan APK aktif dan mengarah ke file yang benar.
- Setiap rilis memiliki versi, tanggal, changelog, dan tautan yang valid.
- Tidak ada fitur yang belum tersedia dipresentasikan sebagai fitur aktif.
- Pengalaman tetap dapat digunakan di mobile, keyboard, dan pengaturan reduced motion.
- Target Lighthouse ≥90 untuk kategori utama merupakan sasaran optimasi, bukan jaminan.

Analytics bersifat opsional. Jika digunakan, minimalkan data yang dikumpulkan dan jelaskan penggunaannya. Klik unduh bukan bukti bahwa APK berhasil dipasang.

## 5. Target Pengguna

### Primer
- Siswa kelas XII SMK yang sedang mempertimbangkan kuliah atau jalur setelah lulus.
- Siswa SMK yang membutuhkan informasi relevan dengan jurusan dan pilihan mata pelajaran.

### Sekunder
- Siswa SMA dan SMP sebagai audiens ekspansi.
- Orang tua, guru BK, pendidik, dan komunitas pendidikan.
- Developer, kontributor, calon mitra, serta pihak yang ingin memahami produk.

## 6. Ruang Lingkup MVP

### Termasuk
- Homepage dengan storytelling dan animasi yang terarah.
- Penjelasan fokus SMK dan alasan LANJUT dibuat.
- Showcase fitur aplikasi dengan status yang jelas.
- Bagian roadmap untuk ekspansi SMA, SMP, dan AI LANJUT.
- Halaman pengenalan AI LANJUT.
- Dokumentasi publik: produk, masalah, fitur, roadmap, bisnis, teknis, FAQ.
- Halaman unduhan APK terbaru.
- Riwayat versi dan changelog.
- Responsive layout, SEO dasar, aksesibilitas, dan penanganan error.
- Website dibangun dan dirilis terpisah dari aplikasi Expo.

### Tidak termasuk dalam MVP
- Backend khusus atau dashboard admin.
- Login dan akun pengguna website.
- Chatbot AI interaktif yang benar-benar menjawab pertanyaan.
- Sistem pembayaran atau monetisasi aktif.
- Update otomatis APK di perangkat pengguna.
- Klaim kompatibilitas yang belum diuji.
- Pengumpulan data personal yang tidak diperlukan.

Fitur di luar MVP dapat ditambahkan jika kebutuhan nyata sudah tervalidasi.

## 7. Arsitektur Informasi dan Sitemap

```text
/
├── /docs
│   ├── /docs/product/overview
│   ├── /docs/product/problem
│   ├── /docs/product/features
│   ├── /docs/product/roadmap
│   ├── /docs/business/model
│   ├── /docs/business/sustainability
│   ├── /docs/technical/architecture
│   ├── /docs/technical/stack
│   ├── /docs/technical/releases
│   └── /docs/faq
├── /ai
├── /download
├── /download/:version
└── /privacy
```

### Navigasi utama
- Beranda
- Dokumentasi
- AI LANJUT
- Download LANJUT (CTA utama)

Pada layar kecil, navigasi harus mudah diakses dan tidak menutupi konten.

## 8. Persyaratan Halaman

### 8.1 Homepage `/`

Urutan narasi yang disarankan:

1. **Hero**
   - Headline: “Masa depanmu punya banyak jalur. Temukan milikmu.”
   - Subheadline menjelaskan LANJUT secara konkret dan ringkas.
   - CTA utama: “Download LANJUT”.
   - CTA sekunder: “Kenali LANJUT” atau “Baca dokumentasi”.
   - Visual utama berupa UI aplikasi yang nyata atau mockup yang jelas ditandai sebagai konsep.

2. **Masalah**
   - Jelaskan kebingungan memilih program studi, jalur masuk, dan relevansi jurusan SMK.
   - Gunakan bahasa yang dekat dengan siswa, tanpa menakut-nakuti.

3. **Mengapa mulai dari SMK?**
   - Jelaskan konteks SMK secara spesifik.
   - Jangan menyiratkan bahwa siswa SMA/SMP tidak penting.

4. **Fitur utama**
   - Linimasa: tenggat dan informasi penting.
   - Khusus SMK: konteks informasi yang relevan bagi siswa SMK.
   - Pilih Mapel: membantu memahami pilihan mata pelajaran yang terkait jalur pendidikan.
   - Cerita Alumni: pengalaman alumni yang dipublikasikan dengan izin.
   - Daftar Periksa: membantu pengguna memantau persiapan.
   - Eksplorasi kampus/prodi: membantu menemukan pilihan yang relevan.
   - Tampilkan hanya fitur yang sudah diverifikasi. Beri label “Dalam Pengembangan” atau “Direncanakan” untuk lainnya.

5. **Banyak jalur setelah ini**
   - Perluasan untuk SMA dan SMP sebagai roadmap, bukan janji fitur yang sudah aktif.

6. **AI LANJUT**
   - Perkenalkan visi konsultasi untuk pelajaran, kehidupan sekolah, minat, tujuan, dan pilihan pendidikan.
   - Tegaskan status aktualnya. Jika belum interaktif, tampilkan sebagai konsep/arah pengembangan.

7. **Roadmap**
   - Tampilkan tahap berdasarkan status dan prioritas yang benar-benar diputuskan.
   - Hindari tanggal rilis spekulatif.

8. **CTA penutup**
   - Arahkan pengguna ke unduhan APK atau dokumentasi.

Homepage tidak boleh menjadi tumpukan section yang semuanya memakai pola “teks kiri, card kanan”. Variasikan komposisi: visual produk besar, timeline, diagram jalur, section editorial, layout horizontal, dan elemen interaktif yang punya fungsi.

### 8.2 Dokumentasi `/docs`

Dokumentasi bersifat publik, mudah dibaca, dan tidak memerlukan login.

Kategori:
- **Produk:** overview, masalah, fitur, roadmap.
- **Bisnis:** model bisnis dan keberlanjutan.
- **Teknis:** arsitektur, stack, proses rilis.
- **Bantuan:** FAQ.

Persyaratan:
- Navigasi kategori dan daftar isi untuk artikel panjang.
- Heading terstruktur dan tautan antarartikel.
- Tanggal pembaruan bila relevan.
- Keterangan status untuk rencana dan hipotesis.
- Jangan menerbitkan secret, token, kredensial, data pribadi, atau informasi internal yang belum disetujui untuk publik.
- Detail bisnis yang belum diputuskan harus ditulis sebagai hipotesis atau opsi, bukan fakta final.

### 8.3 Halaman AI LANJUT `/ai`

- Menjelaskan tujuan dan batasan AI LANJUT.
- Contoh konsultasi dapat ditampilkan sebagai ilustrasi konseptual.
- Jika belum tersedia, contoh wajib diberi label “Contoh konsep”, “Prototype”, atau sejenisnya.
- Jangan membuat chat palsu yang seolah-olah memberikan jawaban AI nyata.
- Jangan menyatakan AI menggantikan guru BK, guru, atau sumber resmi.
- Informasi seleksi yang sensitif terhadap waktu nantinya harus merujuk sumber resmi dan tanggal pembaruan.

### 8.4 Download `/download`

- Menampilkan versi terbaru yang berstatus publik.
- CTA unduh harus mengarah ke APK yang benar dan dapat diakses publik.
- Menampilkan versi, tanggal rilis, ukuran file, persyaratan Android minimum jika sudah diverifikasi, dan ringkasan perubahan.
- Menampilkan riwayat versi sebelumnya.
- Menampilkan catatan bahwa instalasi dari luar Play Store mungkin membutuhkan izin Android yang sesuai.
- Beri peringatan agar APK hanya diunduh dari sumber resmi LANJUT.
- Jangan menampilkan ukuran, kompatibilitas, checksum, atau tanggal yang belum diverifikasi.
- Jika tidak ada rilis publik yang valid, tampilkan status “Unduhan belum tersedia” dan jangan membuat tombol unduh palsu.

### 8.5 Detail rilis `/download/:version`

- Informasi versi lengkap.
- Changelog.
- Known issues jika ada.
- Tautan unduh untuk versi tersebut.
- SHA-256 opsional tetapi disarankan untuk verifikasi integritas.
- Tautan kembali ke daftar rilis.

### 8.6 Privacy `/privacy`

- Jelaskan apakah website menggunakan analytics atau cookies.
- Jelaskan data apa yang dikumpulkan dan untuk tujuan apa, jika ada.
- Jangan membuat klaim “tidak mengumpulkan data apa pun” sebelum implementasi diperiksa.

## 9. Model Metadata Rilis

Gunakan file JSON statis, misalnya `public/releases/releases.json`, agar MVP tidak memerlukan backend.

Contoh skema:

```json
{
  "latestVersion": "1.0.0",
  "releases": [
    {
      "version": "1.0.0",
      "releaseDate": "YYYY-MM-DD",
      "channel": "stable",
      "title": "Rilis awal",
      "summary": "Ringkasan singkat rilis.",
      "apkUrl": "https://example.com/lanjut.apk",
      "fileSizeBytes": null,
      "minAndroidVersion": null,
      "sha256": null,
      "changes": [
        "Fitur atau perubahan yang benar-benar tersedia."
      ],
      "knownIssues": []
    }
  ]
}
```

Nilai `example.com` dan `YYYY-MM-DD` adalah placeholder dan harus diganti sebelum rilis. Jangan pernah mengarang nilai teknis.

Ketentuan:
- Versi harus konsisten dan unik.
- Rilis terbaru harus sesuai dengan `latestVersion`.
- `apkUrl` harus dapat diakses publik dan mengarah ke APK, bukan AAB atau halaman privat.
- Ukuran dan checksum harus dihitung dari file rilis yang tepat.
- Validasi metadata saat build atau melalui test.
- Metadata boleh dikelola manual pada MVP; otomatisasi GitHub Actions dapat ditambahkan kemudian.
- Jangan menaruh token atau kredensial dalam file frontend.
- Jika APK di-host di GitHub Releases, pastikan repository/release dan asset memang dapat diakses publik.

## 10. Teknologi yang Disarankan

Stack awal:
- React
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Motion for React untuk animasi UI dan storytelling
- Markdown/MDX untuk dokumentasi, jika kebutuhan komponen interaktif membenarkannya
- JSON statis untuk metadata rilis
- GitHub Releases atau storage publik tepercaya untuk APK
- Vercel atau static hosting sejenis untuk website

Ini adalah rekomendasi awal, bukan alasan untuk menambahkan dependency tanpa kebutuhan. Pilih versi stabil yang kompatibel pada saat implementasi. Jika SEO membutuhkan halaman yang lebih mudah diindeks, pertimbangkan prerendering atau strategi static generation.

## 11. Prinsip Animasi dan Interaksi

Animasi adalah bagian dari identitas pengalaman, tetapi bukan pengganti konten.

- Gunakan motion untuk memperjelas perubahan, hubungan, atau urutan cerita.
- Prioritaskan `transform` dan `opacity` untuk menjaga performa.
- Gunakan scroll-triggered animation secara terukur; jangan mengambil alih scroll pengguna.
- Jangan menyembunyikan informasi penting sampai animasi selesai.
- Hindari parallax berat, animasi tak berujung, cursor gimmick, dan efek yang mengganggu membaca.
- Hormati `prefers-reduced-motion`.
- Pastikan CTA, navigasi, dan konten tetap berfungsi jika animasi dinonaktifkan.
- Uji pengalaman pada perangkat mobile kelas menengah.

## 12. Persyaratan Nonfungsional

### Responsivitas
- Layout bekerja pada mobile, tablet, dan desktop.
- Tidak ada horizontal overflow yang tidak disengaja.
- Target area sentuh nyaman untuk pengguna mobile.

### Aksesibilitas
- Struktur heading semantik.
- Kontras warna memadai.
- Fokus keyboard terlihat.
- Kontrol interaktif dapat digunakan tanpa mouse.
- Gambar bermakna memiliki alt text; dekorasi disembunyikan dari pembaca layar.
- Hormati reduced motion.

### Performa
- Batasi ukuran gambar dan font.
- Lazy-load media yang tidak langsung terlihat.
- Hindari dependency animasi berlebihan.
- Tangani loading dan error untuk metadata rilis.
- Gunakan ukuran aset responsif bila memungkinkan.

### SEO dan navigasi
- Title dan meta description unik untuk halaman penting.
- Open Graph metadata.
- Sitemap dan robots policy sesuai status publik.
- URL dapat dibuka langsung dan di-refresh tanpa 404.
- Link internal dan eksternal diuji.

### Keamanan
- Tidak ada secret di bundle frontend.
- Validasi semua URL rilis yang ditampilkan.
- Jangan menyisipkan HTML mentah dari konten tak tepercaya.
- Dependency diperiksa dan dijaga seperlunya.

## 13. Fase Implementasi

### Fase 0 — Verifikasi
- Verifikasi fitur aplikasi yang benar-benar tersedia.
- Verifikasi sumber APK, akses publik, versi, ukuran, kompatibilitas, dan changelog.
- Tentukan identitas visual dan domain.
- Tentukan bagian bisnis/teknis yang boleh dipublikasikan.

### Fase 1 — Fondasi
- Setup repository website terpisah.
- Setup routing, design tokens, layout global, navigasi, dan komponen dasar.
- Setup pemeriksaan kualitas dan build.

### Fase 2 — Homepage
- Implementasi storytelling homepage.
- Tambahkan visual aplikasi yang valid.
- Implementasi animasi responsif dan reduced-motion.

### Fase 3 — Dokumentasi
- Buat struktur kategori, sidebar/daftar isi, artikel, dan tautan internal.
- Pastikan semua klaim berstatus jelas.

### Fase 4 — Download dan changelog
- Implementasi metadata rilis.
- Implementasi daftar dan detail rilis.
- Validasi tautan APK dan informasi teknis.

### Fase 5 — QA dan rilis
- Uji responsive, keyboard, reduced motion, routing, SEO, tautan, dan metadata.
- Uji dari perangkat atau viewport nyata.
- Deploy website secara independen dari Expo.

## 14. Acceptance Criteria

MVP dinyatakan siap ketika:
- [ ] Homepage menjelaskan apa itu LANJUT, untuk siapa, dan manfaat utamanya.
- [ ] Fokus awal pada SMK dijelaskan secara spesifik dan tidak eksklusif.
- [ ] Fitur aktif, sedang dikembangkan, dan direncanakan dibedakan jelas.
- [ ] AI LANJUT tidak disajikan sebagai chatbot aktif jika belum ada implementasi.
- [ ] Dokumentasi publik dapat dibaca tanpa login.
- [ ] Halaman download menampilkan rilis terbaru yang tervalidasi.
- [ ] Riwayat rilis menampilkan versi dan changelog yang benar.
- [ ] Link APK bisa diakses publik dan mengarah ke file yang tepat.
- [ ] Halaman dapat dibuka langsung dan di-refresh.
- [ ] Website responsif dan tidak memiliki overflow yang tidak disengaja.
- [ ] Navigasi dan kontrol inti dapat digunakan dengan keyboard.
- [ ] Reduced-motion preference dihormati.
- [ ] Tidak ada token, kredensial, atau data sensitif di repository/bundle.
- [ ] Website dapat dirilis tanpa harus merilis ulang aplikasi Expo.

## 15. Keputusan yang Masih Perlu Diverifikasi

- Domain dan nama resmi website.
- Repository atau lokasi hosting APK.
- Versi APK saat ini, tanggal rilis, ukuran, SHA-256, minimum Android, dan known issues.
- Status aktual masing-masing fitur aplikasi.
- Identitas visual final: logo, warna, tipografi, dan aset.
- Detail bisnis yang aman dan akurat untuk dipublikasikan.
- Apakah dokumentasi memakai Markdown atau MDX.
- Apakah website perlu prerendering untuk SEO.

---

**Prinsip penutup:** website LANJUT harus melakukan tiga hal dengan baik: **menarik perhatian, menjelaskan produk, dan memudahkan tindakan**. Animasi membantu menarik perhatian; dokumentasi membangun pemahaman dan kepercayaan; halaman unduhan memudahkan pengguna mulai mencoba produk.
