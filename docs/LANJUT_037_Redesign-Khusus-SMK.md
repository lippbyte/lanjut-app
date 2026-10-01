# TASK: LANJUT_037 — Redesign "Khusus SMK" Jadi Hub Semua Jenjang

## Konteks

Dari LANJUT_035: siswa non-kelas-12 (termasuk SMP) sekarang diarahkan ke
halaman "Khusus SMK" lewat placeholder, tapi isinya masih murni SMK
(contoh: "Kuota siswa eligible SNBP", "Jadwal PKL berdekatan dengan
pendaftaran"). Siswa SMP yang buka halaman ini akan baca konten yang
tidak relevan sama sekali buat mereka.

Keputusan Khalifa (1 Okt): halaman ini sekarang jadi prioritas
redesign — bukan ditunda — supaya kontennya cocok untuk SMP, SMA, dan
SMK, bukan cuma SMK.

**Catatan soal konten:** struktur dan pembagian bagian di bawah ini
adalah USULAN, bukan keputusan final dari Khalifa. Buat kontennya
sebagai DRAF (ikuti pola §4.10/§4.11 — ditandai jelas draf, masuk
`salinan-teks-lanjut.md`), supaya Khalifa bisa review sebelum dianggap
final. Jangan tunda coding-nya menunggu approval teks — bangun strukturnya
sekarang, teks final menyusul di review terpisah.

## Yang Diminta

1. **Rename halaman** (rute dan label nav) dari "Khusus SMK" jadi nama
   yang netral jenjang — usulan: "Jalur Jenjang" atau "Jenjang Saya"
   (pilih salah satu atau usulkan sendiri, laporkan yang dipakai).
   Jangan ubah rute lama secara tiba-tiba kalau ada deep link/bookmark
   yang bergantung padanya — redirect rute lama ke rute baru kalau perlu.

2. **Pecah konten jadi 3 kelompok berdasarkan jenjang pengguna:**
   - **Kelas 7–9 (SMP):** fokus eksplorasi luas — bakat/minat, kenalan
     jurusan/prodi secara umum (tidak perlu detail SNBP/SNBT/TKA sama
     sekali). Arahkan ke fitur yang relevan: Ngobrol Bareng LANJUT,
     Eksplorasi Tujuan (F10), Gaya Belajar.
   - **Kelas 10–11 (SMA/SMK, belum kelas 12):** mulai kenalan ke
     mapel/jurusan terkait minat (arahkan ke Pilih Mapel dan F10), tapi
     belum perlu konten tenggat pendaftaran.
   - **Kelas 12 non-SMK** *(kalau ada populasi ini)*: cek dulu apakah app
     membedakan SMA vs SMK di data pengguna. Kalau tidak ada field
     jenjang sekolah (cuma `kelas`), laporkan ini sebagai temuan —
     mungkin perlu field terpisah nanti, tapi JANGAN tambahkan field baru
     di task ini tanpa konfirmasi, cukup laporkan.
   - **Konten SMK yang sudah ada** (PKL, dunia kerja/magang) — pertahankan,
     tapi pastikan hanya tampil ke pengguna yang relevan (kalau tidak bisa
     dibedakan SMA/SMK dari data yang ada, tampilkan ke semua non-12
     untuk sekarang dan catat sebagai keterbatasan).

3. **Hapus/revisi referensi SNBP/tenggat** dari konten yang akan dilihat
   non-12 di halaman ini — ini sudah sebagian diminta di LANJUT_035, tapi
   laporan LANJUT_035 mencatat masih ada sisa ("Kuota siswa eligible
   SNBP" tanpa tanggal/hitungan mundur). Putuskan: dihapus total atau
   diubah jadi kalimat umum tanpa menyebut SNBP (draf, tandai DRAF).

4. Siswa kelas 12 yang buka halaman ini secara sukarela (bukan lewat
   placeholder paksa) — pastikan masih bisa akses kalau memang relevan
   buat mereka (misal yang mau baca ulang info SMK), jangan diblokir.

## Test

- [ ] Akun kelas 8 → lihat konten kelompok SMP
- [ ] Akun kelas 11 → lihat konten kelompok 10–11
- [ ] Akun kelas 12 → tetap bisa buka halaman ini (tidak diblokir)
- [ ] Tidak ada lagi referensi SNBP dengan tenggat/kuota spesifik untuk non-12
- [ ] Rute lama (kalau ada yang bookmark) tetap mengarahkan ke halaman baru
- [ ] Typecheck 0 error, tidak ada regresi tes yang sudah ada

## Definition of Done

- [ ] Halaman di-rename dan terstruktur per kelompok jenjang
- [ ] Semua teks baru ditandai DRAF di `salinan-teks-lanjut.md`
- [ ] Semua test di atas lolos
- [ ] Commit hash dilaporkan

## Laporkan di akhir

- Commit hash
- Nama rute/label final yang dipakai
- Konfirmasi: apakah data pengguna bisa membedakan SMA vs SMK (temuan dari poin 2)
- Screenshot tiap kelompok jenjang
