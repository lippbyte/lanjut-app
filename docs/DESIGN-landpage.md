# DESIGN.md — Visual & Interaction Direction LANJUT Website

**Versi:** 1.0  
**Status:** Design direction awal; token final dapat disesuaikan setelah aset brand dikonfirmasi.

Dokumen ini adalah acuan visual untuk seluruh halaman website LANJUT. Tujuannya menjaga identitas tetap konsisten meskipun implementasi dikerjakan bertahap atau oleh agent berbeda.

## 0. Revisi 27 Oktober 2026 — sistem visual mengikuti acuan landing

**Status:** pilihan percakapan, belum disetujui PM. Bagian ini **menggantikan** palet (§2),
tipografi (§3), dan sebagian aturan gerak (§7) di bawah. Aturan lain (struktur, status fitur,
kejujuran konten, aksesibilitas) tetap berlaku.

- **Acuan visual:** `design/reference-landing.png`. **Sumber token:** design system resmi LANJUT
  (`LandingPage/lanjut-landing-page-mockup/…/tokens/*.css`, sama dengan `LANJUT_App/theme/tokens.ts`).
  Implementasi: `landing/src/gaya/token.css`.
- **Palet:** biru resmi `blue-100 #E4F3F7`, `blue-200 #B4E1EB`, `blue-300 #95BDD7`, `blue-400 #78A4CB`,
  `blue-500 #5E88AF`, `blue-600 #456A8C`, ditambah turunan gelap untuk teks putih: `blue-700 #4F7AA1`
  (putih 4,53:1), `blue-800 #3F6283` (6,39:1), `blue-900 #2E4A66` (9,2:1), `blue-950 #22384E`.
  Tanpa merah/oranye (aturan design system); status: hijau tenang, biru, abu-abu.
- **Kontras (keputusan percakapan):** acuan memakai teks putih di `#97C1D5` (1,7–1,9:1, gagal WCAG AA).
  Karena itu latar halaman merek memakai gradasi vertikal `blue-700 → blue-800` dengan teks putih;
  tombol utama berupa pill terang (putih → `blue-100`) dengan teks `blue-900`.
- **Gradasi:** selalu vertikal, terang ke gelap — latar halaman, tombol utama, kepala kartu
  (`blue-600 → blue-900`), CTA penutup dan kaki (bergeser sangat pelan).
- **Huruf:** Poppins saja (400/500/600/700, disimpan bersama situs, SIL OFL 1.1), menggantikan Inter.
- **Bentuk:** pill untuk navbar, tombol, dan sorotan; kartu bersudut 24–28 px.
- **Logo dan maskot:** wordmark resmi dan maskot garis putih dipakai apa adanya, tidak digambar ulang.
- **Navbar (semua halaman):** Unduh · Tentang · Kenapa SMK? · Solusi · Fitur · FAQ · Dokumentasi · logo.
  Di luar beranda, tautan bagian mengarah ke beranda.
- **Gerak:** CSS + IntersectionObserver, tanpa pustaka. Setiap seksi beranda punya jenis gerak sendiri.
  Dua loop yang diizinkan, keduanya sangat tipis, hanya berjalan saat terlihat, dan mati saat
  "kurangi gerakan": maskot hero melayang dan gradasi CTA penutup/kaki yang bergeser.
- **Copy beranda:** judul ≤ 8 kata, isi satu kalimat; penjelasan panjang pindah ke dokumentasi.
- **Huruf kapital judul:** sentence case, bukan Title Case — contoh "Mau lanjut kuliah, mulai dari
  mana?". Huruf besar hanya di awal judul, singkatan (LANJUT, SMK, PKL), dan nama diri (nama fitur
  seperti "Jalur Saya", "Play Store"). Berlaku untuk semua judul h1–h3, judul kartu, dan judul tab
  halaman. Label status resmi (`Tersedia`, `Dalam Pengembangan`, `Direncanakan`) tetap seperti
  ditetapkan PRD karena berupa label, bukan judul. (Pilihan percakapan 27 Okt 2026, belum
  disetujui PM.)

## 1. Arah Kreatif

### Karakter
- **Optimistis:** membantu pengguna merasa punya pilihan dan langkah berikutnya.
- **Dekat dengan pelajar:** modern, jelas, tidak kaku seperti portal birokrasi.
- **Terpercaya:** informasi terstruktur dan status fitur jujur.
- **Berorientasi masa depan:** terasa digital dan progresif tanpa terlihat seperti dashboard SaaS generik.
- **Hangat dan manusiawi:** berfokus pada keputusan hidup pelajar, bukan teknologi semata.

### Kata kunci visual
`clear pathways`, `guided discovery`, `editorial storytelling`, `warm technology`, `confident typography`, `purposeful motion`.

### Hindari
- Layout semua section berupa teks di kiri dan kartu di kanan.
- Card grid untuk setiap jenis konten.
- Gradien neon, glow, blur, dan glassmorphism berlebihan.
- Terlalu banyak bentuk dekoratif yang tidak menyampaikan makna.
- Ilustrasi stok generik yang tidak berkaitan dengan kehidupan pelajar.
- Tampilan seperti dashboard admin atau template SaaS.
- Motion yang membuat halaman terasa seperti presentasi yang tidak bisa dikontrol.

## 2. Palet Warna

Gunakan warna sebagai token agar mudah disesuaikan setelah logo/brand asset final tersedia. Nilai berikut adalah titik awal, bukan klaim bahwa warna ini sudah menjadi standar resmi brand.

| Token | Nilai awal | Penggunaan |
|---|---|---|
| `--color-ink` | `#142B3A` | Headline dan teks utama |
| `--color-primary` | `#176B87` | CTA utama, link, elemen navigasi |
| `--color-primary-dark` | `#104B61` | Hover/active dan kontras |
| `--color-teal` | `#55B8A8` | Aksen jalur, progres, detail visual |
| `--color-sky` | `#DDF2F5` | Latar section informatif |
| `--color-paper` | `#F7F8F4` | Latar utama hangat |
| `--color-white` | `#FFFFFF` | Surface konten |
| `--color-muted` | `#5C6D76` | Teks sekunder |
| `--color-border` | `#DCE5E5` | Garis dan pemisah |
| `--color-accent` | `#E8B86D` | Aksen kecil untuk penekanan |
| `--color-danger` | `#B74747` | Error/warning penting |

Aturan:
- Gunakan latar terang sebagai default agar dokumentasi mudah dibaca.
- Primary dipakai untuk tindakan utama, bukan semua elemen.
- Teal digunakan untuk menggambarkan jalur, koneksi, atau progres.
- Accent hangat dipakai hemat, bukan sebagai warna CTA kedua di semua section.
- Status harus dapat dibedakan melalui teks dan bentuk, bukan warna saja.
- Pastikan rasio kontras sesuai kebutuhan aksesibilitas.

## 3. Tipografi

Gunakan font sans-serif yang jelas dan mudah dibaca. Pilihan awal: **Inter** atau font sans-serif modern yang tersedia dan stabil. Jika self-hosting, gunakan subset dan bobot yang benar-benar diperlukan.

Skala tipografi awal:
- Hero headline: `clamp(2.8rem, 6vw, 5.8rem)`, line-height rapat, lebar baris terkontrol.
- H1 halaman: `clamp(2.3rem, 4.5vw, 4.2rem)`.
- H2 section: `clamp(1.8rem, 3vw, 3rem)`.
- H3: `1.2rem–1.5rem`.
- Body utama: `1rem–1.125rem`, line-height sekitar `1.6–1.75`.
- Caption/metadata: minimum sekitar `0.8rem`, dengan kontras yang tetap memadai.

Aturan:
- Headline besar dan ekspresif boleh digunakan, tetapi jangan mengorbankan keterbacaan.
- Hindari terlalu banyak ukuran font dalam satu viewport.
- Batasi lebar paragraf panjang agar nyaman dibaca.
- Gunakan bold untuk hierarki, bukan memberi bold pada setiap frasa.
- Jangan gunakan uppercase panjang untuk paragraf atau navigasi utama.

## 4. Layout dan Spacing

- Gunakan grid responsif dan sistem spacing konsisten berbasis kelipatan 4 atau 8.
- Konten utama desktop: lebar maksimum sekitar `1200–1320px`.
- Lebar bacaan dokumentasi: sekitar `680–780px`; navigasi samping boleh menambah kolom pada layar lebar.
- Section homepage punya ruang napas yang cukup; jangan semua konten dimasukkan ke panel/card.
- Gunakan komposisi yang bervariasi: full-bleed visual, editorial split, diagram jalur, timeline, horizontal feature strip, dan UI showcase.
- Radius awal: kecil-menengah untuk komponen; jangan membulatkan semua elemen secara ekstrem.
- Border tipis lebih diutamakan daripada shadow besar.
- Shadow digunakan hanya untuk memberi kedalaman pada elemen yang memang melayang.

## 5. Komponen UI

### Navigasi
- Logo/nama LANJUT di kiri.
- Link utama: Beranda, Dokumentasi, AI LANJUT.
- CTA “Download LANJUT” paling menonjol.
- Navigasi sticky boleh digunakan jika tidak mengurangi ruang konten.
- Mobile: menu sederhana, jelas, bisa diakses keyboard, dan tertutup setelah pengguna memilih link.

### Tombol
- Primary: solid primary, teks kontras, hover/focus jelas.
- Secondary: outline atau surface netral.
- Tautan teks dipakai untuk aksi sekunder.
- Semua tombol harus punya label aksi yang spesifik, misalnya “Lihat dokumentasi” atau “Unduh APK vX.Y.Z”.
- State hover/focus/disabled/loading harus terlihat jika relevan.
- Jangan gunakan button untuk navigasi jika elemen link lebih tepat.

### Status fitur
- `Tersedia`: tampil tenang dan jelas.
- `Dalam Pengembangan`: label eksplisit.
- `Direncanakan`: label eksplisit dan tidak menyerupai status aktif.
- Status disampaikan dengan teks dan boleh didukung ikon/warna.

### Feature showcase
- Gunakan screenshot aplikasi nyata jika tersedia.
- Satu visual besar dapat lebih kuat daripada banyak kartu kecil.
- Tampilkan konteks dan manfaat fitur, bukan hanya nama.
- Jangan memalsukan UI atau data untuk memberi kesan fitur sudah berjalan.

### Dokumentasi
- Layout berorientasi membaca.
- Sidebar kategori pada desktop; navigasi yang dapat dibuka pada mobile.
- Daftar isi untuk artikel panjang.
- Heading, paragraf, list, code block, tabel, callout, dan breadcrumb punya gaya konsisten.
- Hindari card berlapis untuk artikel biasa.
- Link internal terlihat jelas.

### Download dan rilis
- Versi terbaru menjadi fokus utama.
- Informasi versi, tanggal, ukuran, dan persyaratan teknis disusun rapi.
- Changelog mudah dipindai.
- Rilis lama ditampilkan sebagai daftar yang lebih ringkas.
- Jika informasi belum tersedia, tampilkan “Belum diverifikasi” atau hilangkan field; jangan isi nilai contoh sebagai fakta.

## 6. Storyboard Homepage

### Scene 1 — Hero: “Masa depanmu punya banyak jalur”
**Tujuan:** membuat pengunjung paham bahwa LANJUT membantu navigasi pilihan pendidikan.

Komposisi:
- Headline tegas dan ringkas.
- Penjelasan satu atau dua kalimat.
- CTA download dan CTA dokumentasi.
- Visual produk atau ilustrasi jalur pendidikan yang menjadi fokus, bukan dekorasi kecil di samping teks.

Motion:
- Headline dan subheadline masuk dengan reveal ringan.
- Jalur visual berkembang dari satu titik menjadi beberapa pilihan.
- Hindari animasi intro yang lama atau menghalangi CTA.

### Scene 2 — Kebingungan menjadi lebih terarah
**Tujuan:** menggambarkan masalah memilih jalur setelah sekolah.

Komposisi:
- Pertanyaan nyata yang mungkin muncul pada siswa.
- Potongan informasi yang perlahan terorganisasi menjadi jalur/pilihan.
- Hindari mengarang statistik atau menggunakan fear-based messaging.

Motion:
- Elemen bergerak menuju struktur yang lebih jelas.
- Animasi harus tetap masuk akal ketika scroll cepat atau reduced motion aktif.

### Scene 3 — Mengapa mulai dari SMK?
**Tujuan:** menunjukkan fokus awal secara konkret.

Komposisi:
- Narasi editorial pendek.
- Diagram atau contoh hubungan jurusan SMK dengan opsi program studi/jalur.
- Fokus pada relevansi dan akses informasi, bukan mengklaim semua kasus dapat dijawab otomatis.

### Scene 4 — Fitur yang membantu langkah berikutnya
**Tujuan:** menjelaskan manfaat fitur aplikasi.

Komposisi:
- Gunakan satu showcase UI besar, lalu pindahkan fokus ke fitur secara bertahap.
- Jika jumlah fitur banyak, kelompokkan menurut kebutuhan pengguna: mencari informasi, mempersiapkan diri, mengeksplorasi pilihan.
- Status setiap fitur harus jelas.

Motion:
- UI berganti fokus atau highlight berdasarkan scroll secara ringan.
- Jangan membuat carousel otomatis yang sulit dikendalikan.

### Scene 5 — Banyak jalur, satu langkah awal
**Tujuan:** memperkenalkan rencana ekspansi SMA dan SMP.

Komposisi:
- Visual cabang jalur yang berkembang dari fokus SMK.
- Label SMA dan SMP sebagai roadmap.
- Jangan memberi kesan fitur sudah tersedia jika belum.

### Scene 6 — AI LANJUT
**Tujuan:** memperkenalkan visi konsultasi pendidikan dan kehidupan sekolah.

Komposisi:
- Contoh pertanyaan: mata pelajaran, minat, target, pilihan pendidikan, atau tantangan sekolah.
- Jika belum terintegrasi, contoh percakapan diberi label konsep.
- CTA menuju halaman penjelasan AI.

### Scene 7 — Penutup dan CTA
**Tujuan:** mengubah ketertarikan menjadi tindakan.

Komposisi:
- Satu headline penutup.
- CTA download utama.
- Link dokumentasi untuk pengunjung yang ingin memahami lebih dalam.

## 7. Motion System

Gunakan Motion for React jika sudah dipilih sebagai dependency; CSS transitions cukup untuk interaksi sederhana.

Prinsip:
- Durasi cepat: `120–200ms`.
- Durasi standar: `200–400ms`.
- Storytelling: sekitar `400–700ms`, hanya saat dibutuhkan.
- Gunakan easing yang natural dan konsisten.
- Prefer transform/opacity daripada animasi layout yang mahal.
- Gunakan viewport/scroll triggers dengan threshold yang masuk akal.
- Pastikan animasi tidak membuat layout meloncat.
- Hormati `prefers-reduced-motion` dengan menonaktifkan atau menyederhanakan gerakan non-esensial.
- Jangan membuat semua elemen bergerak pada setiap scroll.

Motion yang disarankan:
- Reveal headline.
- Garis atau node jalur yang berkembang.
- Highlight fitur saat masuk viewport.
- Perubahan status pada roadmap.
- Feedback hover/focus tombol dan link.

Motion yang dihindari:
- Scroll hijacking.
- Parallax berat.
- Cursor custom yang mengganggu.
- Animasi loop dekoratif terus-menerus.
- Teks yang bergerak sehingga sulit dibaca.
- Transisi yang membuat halaman lambat atau tidak responsif.

## 8. Responsif

### Mobile
- Prioritaskan headline dan CTA utama.
- Tumpuk layout secara natural, bukan memaksa split desktop.
- Kurangi jumlah elemen dekoratif.
- Pastikan visual UI tetap terbaca atau sediakan zoom/detail yang tepat.
- Menu, tombol, dan link mudah disentuh.
- Hindari animasi berat dan video autoplay.

### Tablet
- Gunakan komposisi dua kolom hanya jika ruang mencukupi.
- Jaga ritme spacing dan ukuran teks.

### Desktop
- Manfaatkan ruang untuk storytelling dan visual besar.
- Jangan memperlebar teks sampai sulit dibaca.
- Navigasi dokumentasi dapat memakai sidebar dan daftar isi.

## 9. Aksesibilitas dan States

- Semua interaksi dapat dijalankan dengan keyboard.
- Fokus terlihat dengan jelas.
- Jangan gunakan warna sebagai satu-satunya pembeda status.
- Sediakan alt text yang informatif.
- Hargai pengaturan reduced motion.
- Jangan menyembunyikan informasi inti di hover-only interaction.
- Loading, empty, error, dan success state memiliki pesan yang jelas.
- Tautan eksternal dan unduhan harus mudah dikenali.

## 10. Konsistensi Implementasi

- Simpan warna, radius, spacing, shadow, dan ukuran container sebagai design tokens/CSS variables.
- Gunakan komponen reusable untuk tombol, status, callout, breadcrumb, dan metadata rilis.
- Jika nilai desain berubah, perbarui token, bukan menambal banyak halaman satu per satu.
- Tambahkan komponen baru hanya jika ada pola nyata yang berulang.
- Jangan menambahkan library visual baru tanpa mengecek kebutuhan dan ukuran bundle.
- Jika desain aktual perlu menyimpang dari dokumen, jelaskan alasannya dan perbarui dokumen bila disetujui.

## 11. Checklist Review Desain

- [ ] Homepage tidak memakai layout teks-kiri/card-kanan pada setiap section.
- [ ] Hierarki headline, body, metadata, dan CTA jelas.
- [ ] Fokus SMK terlihat tanpa mengucilkan audiens masa depan.
- [ ] Fitur aktif dan roadmap dibedakan dengan jelas.
- [ ] Mockup dan contoh AI diberi label yang jujur.
- [ ] CTA download mudah ditemukan dan tidak menyesatkan.
- [ ] Dokumentasi nyaman dibaca dalam sesi panjang.
- [ ] Halaman download dan changelog mudah dipindai.
- [ ] Mobile dirancang dengan layout dan motion yang sesuai.
- [ ] Reduced motion tetap memberi pengalaman yang lengkap.
- [ ] Kontras, keyboard focus, dan area sentuh memadai.
- [ ] Tidak ada dekorasi yang mengalahkan isi atau fungsi.
