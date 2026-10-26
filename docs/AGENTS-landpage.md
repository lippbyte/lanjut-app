# AGENTS.md — Instruksi Agent untuk Website LANJUT

Dokumen ini adalah aturan kerja lintas tugas untuk semua coding agent yang bekerja di repository **website LANJUT**. Baca `PRD.md` untuk kebutuhan produk dan `DESIGN.md` untuk arahan visual sebelum mengubah kode.

## 1. Prioritas Sumber Kebenaran

Jika ada konflik, gunakan urutan berikut:
1. Instruksi eksplisit terbaru dari pemilik proyek.
2. `AGENTS.md` untuk aturan kerja dan batasan.
3. `PRD.md` untuk scope, perilaku produk, dan acceptance criteria.
4. `DESIGN.md` untuk tampilan, layout, animasi, dan interaksi.
5. Implementasi yang sudah ada, selama tidak bertentangan dengan dokumen di atas.

Jangan mengubah keputusan produk secara diam-diam. Jika kebutuhan belum jelas dan berpengaruh besar, jelaskan asumsi atau ajukan pertanyaan singkat.

## 2. Konteks Proyek

- Repository ini khusus **website LANJUT**.
- Aplikasi Android/mobile LANJUT dibuat dengan Expo di repository terpisah.
- Website berfungsi sebagai landing page, dokumentasi publik, pengenalan AI LANJUT, serta distribusi APK dan changelog.
- Dokumentasi website bersifat publik.
- Fokus audiens awal adalah siswa kelas XII SMK; arah produk jangka panjang dapat mencakup SMA, SMP, dan konsultasi AI.
- Jangan menganggap rencana roadmap sebagai fitur yang sudah aktif.

## 3. Sebelum Mulai Bekerja

1. Periksa struktur repository, `package.json`, konfigurasi build, routing, dan pola kode yang sudah ada.
2. Baca `PRD.md` dan `DESIGN.md`.
3. Identifikasi halaman, komponen, dan data yang terdampak.
4. Buat rencana singkat untuk perubahan yang mencakup beberapa file atau halaman.
5. Pertahankan perubahan dalam scope permintaan; jangan melakukan rewrite besar tanpa alasan.
6. Jangan mengasumsikan framework/dependency tertentu telah terpasang sebelum memeriksa repository.

## 4. Prinsip Implementasi

- Utamakan solusi sederhana, terawat, dan mudah dipahami.
- Gunakan TypeScript secara konsisten jika repository menggunakan TypeScript.
- Reuse komponen dan design tokens; hindari duplikasi struktur atau nilai visual.
- Pecah komponen berdasarkan tanggung jawab, bukan membuat satu file besar untuk seluruh halaman.
- Pisahkan konten dokumentasi dan metadata rilis dari presentasi UI bila memungkinkan.
- Jangan menambah dependency hanya untuk efek kecil yang bisa dibuat dengan CSS.
- Jangan menambahkan backend, database, auth, atau dashboard admin kecuali diminta secara eksplisit.
- Jangan mengubah repository aplikasi Expo atau menganggap website harus berbagi siklus build dengan aplikasi.
- Jangan membuat tombol atau link dekoratif yang tampak berfungsi tetapi tidak melakukan aksi yang dijanjikan.
- Untuk state loading, empty, dan error, berikan tampilan yang jelas.

## 5. Akurasi Konten dan Status Fitur

- Jangan mengarang statistik, angka dampak, testimoni, dukungan institusi, logo mitra, tanggal rilis, atau klaim hasil.
- Jangan menyebut fitur “tersedia” kecuali sudah diverifikasi.
- Gunakan status yang jelas: `Tersedia`, `Dalam Pengembangan`, atau `Direncanakan`.
- Jika menampilkan mockup atau contoh percakapan AI, tandai sebagai `Konsep`, `Prototype`, atau `Contoh`.
- Jangan menampilkan simulasi chat seolah-olah terhubung ke model AI sungguhan jika tidak ada integrasi.
- Detail bisnis yang belum disepakati harus dinyatakan sebagai hipotesis atau rencana.
- Informasi seleksi pendidikan yang dapat berubah harus ditulis hati-hati dan, jika dipublikasikan sebagai panduan faktual, menyertakan sumber resmi serta tanggal pembaruan.
- Jangan memublikasikan data pribadi alumni tanpa izin yang sesuai.

## 6. Download dan Metadata Rilis

- Gunakan metadata rilis terstruktur, misalnya JSON statis, untuk daftar versi.
- Jangan mengarang `apkUrl`, ukuran file, minimum Android, SHA-256, tanggal, atau changelog.
- Pastikan link unduh mengarah ke APK publik yang benar, bukan AAB, repository privat, atau halaman yang memerlukan akses khusus.
- Validasi bahwa versi terbaru cocok dengan rilis yang ditandai sebagai terbaru.
- Jika metadata tidak tersedia atau link rusak, tampilkan error/empty state dan jangan membuat unduhan palsu.
- Jangan pernah memasukkan token GitHub, API key, atau secret lain ke kode frontend, file publik, atau environment variable berawalan public yang akan dibundel.
- Untuk checksum, hitung dari APK yang benar-benar dirilis; jangan menyalin checksum versi lain.
- Pertahankan riwayat versi lama jika aset dan datanya memang masih tersedia.

## 7. Design dan Animasi

- Ikuti `DESIGN.md` sebagai acuan visual utama.
- Hindari pola berulang berupa teks di kiri dan tumpukan kartu di kanan pada setiap section.
- Gunakan animasi untuk menjelaskan hubungan, urutan, atau perubahan, bukan sekadar dekorasi.
- Utamakan animasi `transform` dan `opacity` untuk performa.
- Hormati `prefers-reduced-motion`; konten dan fungsi inti harus tetap tersedia tanpa animasi.
- Jangan mengambil alih scroll, menyembunyikan konten penting di balik animasi, atau menambahkan animasi loop tanpa alasan.
- Jangan mengganti logo, font, palet, atau bahasa visual secara luas tanpa memperbarui `DESIGN.md` atau mendapat persetujuan.
- Gunakan aset aplikasi nyata jika tersedia. Jangan membuat screenshot palsu yang diklaim sebagai UI final.
- Pastikan desain mobile dirancang, bukan sekadar desktop yang diperkecil.

## 8. Aksesibilitas, SEO, dan Performa

- Gunakan elemen HTML semantik dan heading yang berurutan.
- Pastikan fokus keyboard terlihat dan kontrol inti dapat digunakan tanpa mouse.
- Beri alt text pada gambar informatif; tandai gambar dekoratif dengan tepat.
- Jaga kontras teks dan ukuran area sentuh.
- Tambahkan title dan meta description yang sesuai untuk halaman penting.
- Pastikan routing bekerja saat URL dibuka langsung atau di-refresh pada hosting target.
- Optimalkan gambar, font, dan bundle; lazy-load media yang tidak langsung dibutuhkan.
- Hindari horizontal overflow dan layout shift yang tidak perlu.
- Jangan mengorbankan aksesibilitas/performa demi animasi.

## 9. Keamanan dan Privasi

- Jangan commit `.env`, token, API key, credential, private URL, atau data pribadi.
- Jangan mengumpulkan data pengguna tanpa kebutuhan yang jelas.
- Jangan menambahkan analytics atau tracker tanpa permintaan/keputusan proyek.
- Jangan merender HTML mentah dari sumber yang tidak tepercaya.
- Periksa sumber dan lisensi aset eksternal yang ditambahkan.

## 10. Testing dan Verifikasi

Setelah perubahan, jalankan perintah yang tersedia di repository, minimal:
- lint, jika dikonfigurasi;
- typecheck, jika dikonfigurasi;
- test, jika tersedia;
- production build.

Jangan mengklaim tes berhasil jika belum dijalankan. Jika suatu perintah gagal:
1. Tampilkan penyebab yang relevan.
2. Perbaiki jika masih dalam scope dan aman.
3. Jika tidak bisa diperbaiki, laporkan sebagai blocker.

Periksa secara manual:
- desktop dan mobile;
- navigasi dan CTA;
- direct URL dan refresh;
- empty/loading/error state;
- reduced motion;
- link eksternal dan unduhan;
- konsistensi status fitur.

## 11. Aturan Git dan Perubahan

- Jangan melakukan commit, push, publish, atau deploy kecuali diminta secara eksplisit.
- Jangan mengubah branch atau history Git tanpa persetujuan.
- Jangan menghapus file atau konten yang tidak terkait dengan tugas.
- Jangan melakukan `git reset --hard`, force push, atau operasi destruktif tanpa persetujuan eksplisit.
- Jangan menimpa perubahan lokal pengguna; periksa `git status` sebelum perubahan besar.
- Buat perubahan sekecil mungkin untuk menyelesaikan tugas.

## 12. Definisi Selesai

Sebelum menyatakan tugas selesai:
- Perubahan sesuai permintaan dan dokumen.
- Konten akurat dan status fitur jujur.
- UI konsisten dengan `DESIGN.md`.
- Tidak ada link/tombol palsu.
- Perintah pemeriksaan yang relevan sudah dijalankan atau keterbatasannya disebutkan.
- Tidak ada secret atau data sensitif baru.
- Ringkas file yang diubah, keputusan penting, tes yang dijalankan, dan pekerjaan yang masih tertunda.

## 13. Saat Dokumen Berubah

Jika implementasi membutuhkan perubahan scope, aturan visual, atau keputusan arsitektur:
- Jangan diam-diam menyimpang dari `PRD.md` atau `DESIGN.md`.
- Ajukan perubahan dokumen terkait dalam patch yang sama bila perubahan tersebut sudah disetujui.
- Jika belum disetujui, gunakan solusi paling konservatif dan jelaskan asumsi di ringkasan.
