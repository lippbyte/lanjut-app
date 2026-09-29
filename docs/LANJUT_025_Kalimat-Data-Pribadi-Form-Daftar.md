# TASK: Pasang Kalimat Data Pribadi di Form Daftar

## Konteks

Pengguna LANJUT adalah siswa, banyak yang di bawah 18 tahun, dan form Daftar sekarang tidak menjelaskan data apa yang disimpan. Kalimat di bawah sudah disetujui Khalifa. **Pakai persis apa adanya, jangan diubah, dipersingkat, atau diperbaiki kata-katanya.**

Teks final:

> Kami menyimpan nama pengguna, nama tampilan, email (kalau kamu isi), kelas, prodi impian, dan centang Daftar Periksamu untuk menjalankan LANJUT, yaitu menampilkan jalur dan kemajuanmu.

Kalimat ini sengaja hanya menyebut yang memang dilakukan app sekarang. **Jangan menambahkan janji apa pun** (misalnya "tidak dibagikan ke pihak mana pun", "aman", "terenkripsi") dan jangan menambahkan klaim hukum.

**Jangan ubah apapun di `LANJUT_App/server/`.** Jangan ubah `MVP-PWA/` (lihat catatan di Langkah 3).

## Langkah 1 — Form Daftar di Expo

1. Di `RegisterScreen` (cari komponennya di `LANJUT_App/components/screens/auth/`), tambahkan kalimat itu di **bawah tombol Daftar**, sebagai teks keterangan kecil.
2. Gunakan token tema yang sudah ada (`theme/tokens.ts`) untuk ukuran dan warna teks keterangan, ikuti pola teks keterangan lain di app. Jangan membuat warna atau ukuran baru.
3. Teks harus terbaca di layar sempit (320 px): tidak terpotong, tidak menabrak tombol, tidak menimbulkan gulir ke samping.
4. Pastikan pembaca layar membacanya sebagai teks biasa di dekat tombol (tidak perlu komponen khusus).

## Langkah 2 — Katalog salinan teks

1. Tambahkan kalimat yang sama ke `docs/salinan-teks-lanjut.md` sebagai entri baru, mengikuti format entri yang sudah ada (nomor bagian, konteks, status). Cari bagian yang paling cocok (kemungkinan dekat teks layar Daftar/akun); kalau tidak ada bagian yang cocok, buat entri baru di akhir dengan nomor berikutnya.
2. Catat di entri itu: teks disetujui Khalifa (28 Sep 2026), berlaku untuk LANJUT_App, dan **perlu ditinjau ulang kalau ada fitur AI, analitik, atau perubahan penyimpanan data**.

## Langkah 3 — Laporkan soal PWA (jangan ubah)

MVP-PWA masih punya form Daftar sendiri (`daftar.html`) dan masih hidup. **Jangan diubah di task ini.** Laporkan saja: apakah `daftar.html` menyimpan data yang sama, apa teks yang tampil di sana sekarang, dan apakah perubahan di sana akan tersangkut aturan gerbang validasi PWA (`node tools/validasi.js`). Khalifa yang memutuskan apakah PWA ikut diberi kalimat yang sama.

## Langkah 4 — Test

- [ ] Kalimat tampil di bawah tombol Daftar, persis sama dengan teks final (bandingkan karakter per karakter)
- [ ] Tampil rapi di lebar 320 px dan 360 px, tanpa gulir ke samping
- [ ] Alur Daftar tetap berjalan normal (daftar akun baru → masuk)
- [ ] TypeScript typecheck: 0 error
- [ ] Tidak ada perubahan di `server/` dan `MVP-PWA/`

## Langkah 5 — Commit

Commit terpisah: layar Daftar, lalu dokumen salinan teks.

## Definition of Done

- [ ] Kalimat final tampil di form Daftar Expo, tidak diubah satu kata pun
- [ ] Tercatat di `docs/salinan-teks-lanjut.md` dengan catatan tinjau ulang
- [ ] Tidak ada tambahan janji atau klaim hukum
- [ ] Layar sempit rapi, typecheck 0 error

## Laporkan di akhir

- Screenshot form Daftar di 320 px dan lebar normal
- Temuan tentang `daftar.html` di PWA (Langkah 3)
- Commit hash
