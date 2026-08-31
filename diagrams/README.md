# Diagram UML LANJUT — Mermaid

Folder ini menggantikan alur kerja diagram lewat draw.io. Semua diagram sekarang
ditulis sebagai teks (`.mmd`), jadi bisa di-*diff*, di-*review*, dan dirender ulang
kapan saja tanpa membuka aplikasi apa pun.

Berkas draw.io lama di folder `EDILAKSO Group/` **tidak dihapus** — masih tersimpan
sebagai rujukan versi sebelumnya.

Sumber kebenaran isi diagram: [`prd-sdd-lanjut.md`](../prd-sdd-lanjut.md)
(Bagian 6 untuk fitur, Bagian 13 untuk model data).

---

## Daftar berkas

| Berkas | Diagram | Hasil render | Ukuran PNG |
|---|---|---|---|
| `usecase.mmd` | Use Case — 3 aktor, 10 use case, relasi include & extend | `usecase.png` | 1446 × 2206 |
| `activity.mmd` | Activity — alur F3 Penolong Pilih Mapel (sudut pandang siswa) | `activity.png` | 1114 × 3510 |
| `class.mmd` | Class — 10 kelas beserta atribut, method, dan multiplisitas | `class.png` | 3378 × 1310 |
| `erd-a.mmd` | ERD Bagian A — entitas milik Pengguna + pemetaan Prodi–Mapel | `erd-a.png` | 2724 × 1520 |
| `erd-b.mmd` | ERD Bagian B — konten resmi yang dikelola Admin | `erd-b.png` | 1966 × 1440 |

Semua PNG di atas sudah tersimpan di folder ini dan sudah diperiksa satu per satu:
tidak ada teks terpotong atau bertumpuk, dan seluruh label serta relasi sesuai
spesifikasi.

**ERD sengaja dipecah dua.** Versi satu berkas berisi sepuluh tabel sekaligus
menghasilkan gambar 2330 px yang sangat melebar (rasio 1:0.34); begitu dimuat ke
dokumen A4, tulisannya turun ke sekitar 3 pt dan tidak terbaca. Bagian A dan B
memakai potongan yang sama seperti versi draw.io lama, dan keduanya tetap terbaca
saat dicetak.

---

## Cara render

Butuh Node.js dan [mermaid-cli](https://github.com/mermaid-js/mermaid-cli):

```bash
npm install -g @mermaid-js/mermaid-cli
```

Lalu jalankan dari root project (`LandingPage/`):

```bash
mmdc -i diagrams/usecase.mmd  -o diagrams/usecase.png  -c diagrams/mermaid-config.json -b white --scale 2 -w 3000
mmdc -i diagrams/activity.mmd -o diagrams/activity.png -c diagrams/mermaid-config.json -b white --scale 2 -w 3000
mmdc -i diagrams/class.mmd    -o diagrams/class.png    -c diagrams/mermaid-config.json -b white --scale 2 -w 3000
mmdc -i diagrams/erd-a.mmd    -o diagrams/erd-a.png    -c diagrams/mermaid-config.json -b white --scale 2 -w 3000
mmdc -i diagrams/erd-b.mmd    -o diagrams/erd-b.png    -c diagrams/mermaid-config.json -b white --scale 2 -w 3000
```

### Kenapa ada `-w 3000`

`mmdc` memakai lebar viewport 800 px secara bawaan. Diagram yang lebih lebar dari
itu akan dikecilkan agar muat, dan tulisannya ikut mengecil sampai sulit dibaca —
ini yang membuat Class Diagram dan ERD terlihat "gepeng" pada percobaan pertama.
`-w 3000` hanya memperbesar viewport; ukuran akhir gambar tetap mengikuti ukuran
alami diagram, jadi flag ini aman dipakai untuk kelima berkas.

### Kalau puppeteer tidak menemukan browser

mermaid-cli merender lewat Chrome/Chromium. Bila di komputer hanya ada Microsoft
Edge, buat berkas `puppeteer.json`:

```json
{
  "executablePath": "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe",
  "args": ["--no-sandbox"]
}
```

lalu tambahkan `-p puppeteer.json` pada perintah `mmdc` di atas. Cara ini juga
menghindari unduhan Chromium ±150 MB.

### Pratinjau cepat tanpa render

- VS Code: ekstensi *Markdown Preview Mermaid Support* atau *Mermaid Preview*
- Peramban: tempel isi `.mmd` ke <https://mermaid.live>

---

## Theming

Keempat jenis diagram memakai `mermaid-config.json` yang sama, mengikuti palet dan
font produk (biru `#B4E1EB` → `#78A4CB`, teks `#1A1A1A`, Poppins). Jangan menaruh
warna langsung di berkas `.mmd` selain `classDef` yang sudah ada di `usecase.mmd`
dan `activity.mmd` — supaya pergantian palet cukup dilakukan di satu tempat.

Catatan: Poppins dipakai bila terpasang di sistem perender; kalau tidak, Mermaid
jatuh ke Arial sesuai urutan `fontFamily`. Ini hanya memengaruhi tampilan huruf,
bukan tata letak.

Blok `config:` di bagian atas tiap `.mmd` hanya mengatur tata letak (jarak antar
node, arah, `useMaxWidth`) — tidak menimpa warna dari `mermaid-config.json`.

---

## Penyelarasan nama dengan `prd-sdd-lanjut.md`

Nama kelas/tabel pada diagram ini mengikuti penamaan yang diminta untuk deliverable
UML, sementara PRD/SDD Bagian 13 memakai penamaan lain untuk entitas yang sama.
Tabel berikut menjembatani keduanya — pakai saat menulis skema basis data supaya
tidak ada entitas yang terhitung dua kali:

| Diagram (kelas / tabel) | PRD-SDD Bagian 13 | Catatan |
|---|---|---|
| `Pengguna` / `pengguna` | `pengguna` | PRD memakai `prodi_tujuan`, diagram memakai `prodi_impian` |
| `TahapanSeleksi` / `tahapan_seleksi` | `tahapan_linimasa` | Sumber fitur F1 Linimasa |
| `InfoKhususSMK` / `info_khusus_smk` | `butir_khusus_smk` | PRD memecah isi jadi `apa_yang_beda` + `apa_yang_bisa_dilakukan` |
| `Prodi` / `prodi` | `prodi` | sama |
| `MataPelajaran` / `mata_pelajaran` | `mapel` | sama, beda nama |
| `ProdiMapel` / `prodi_mapel` | `prodi_mapel` | PRD memakai `bobot`, diagram memakai `tingkat_kepentingan` |
| `CeritaAlumni` / `cerita_alumni` | `cerita_alumni` | PRD punya tambahan kolom `tayang` |
| `ItemDaftarPeriksa` / `item_daftar_periksa` | `butir_daftar_periksa` + `kemajuan` | PRD memisah definisi butir dari kemajuan per pengguna |
| `KartuArsip` / `kartu_arsip` | `kartu` | F6 Arsip Belajar (P1) |
| `Admin` / `admin` | — | Belum ada di Bagian 13; di Bagian 12 baru disebut sebagai Panel Admin Tim |

Pemetaan use case ke fitur PRD: F1 → *Lihat Linimasa TKA/SNBP/SNBT*, F2 → *Lihat
Info Khusus SMK*, F3 → *Gunakan Penolong Pilih Mapel*, F4 → *Baca Cerita Alumni*,
F5 → *Kelola Daftar Periksa*, F9 → *Kelola Bank Soal Mitra*.

Relasi `include` ke *Verifikasi Sumber & Tanggal Cek* adalah bentuk diagram dari
aturan pengikat di PRD Bagian 12: setiap potongan konten wajib punya `sumber`,
`pemilik`, dan `diperiksa_pada` sejak versi pertama.

### Dua hal yang sengaja belum dimodelkan

1. **`kemajuan` dan `riwayat_latihan`** (PRD Bagian 13) belum muncul sebagai entitas
   tersendiri. `riwayat_latihan` baru dibutuhkan saat F7 Latihan Hari Ini dikerjakan.
2. **Kolom FK ke `admin`** belum ada di `tahapan_seleksi`, `info_khusus_smk`, dan
   `cerita_alumni`, padahal relasinya digambar. Daftar atribut dikunci agar sama
   persis antara Class Diagram dan ERD, jadi penambahan kolom (`admin_id` atau
   `diverifikasi_oleh`) perlu diputuskan lebih dulu sebelum ditambahkan ke kedua
   berkas sekaligus.
