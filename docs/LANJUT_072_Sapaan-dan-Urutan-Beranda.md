# TASK: LANJUT_072 — Sapaan dan Urutan Beranda

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall.

## Konteks

Beranda sekarang belum punya sapaan, dan "Info Penting" berada di atas grid fitur.
Khalifa minta: sapaan di bagian paling atas, dan Info Penting dipindah ke bawah grid
ikon fitur. Task ini hanya mengubah sapaan dan urutan. Banner, isi konten, dan layout
per jenjang dikerjakan di task berikutnya.

## Yang Diminta

1. **Sapaan di paling atas Beranda**
   - Tampilan: "Halo, {nama_tampilan}"
   - Nama diambil dari `nama_tampilan` akun. Kalau kosong, pakai `nama_pengguna`.
   - Kalau keduanya kosong, tampilkan "Halo" saja (tanpa koma).
   - Teks ini masuk `docs/salinan-teks-lanjut.md` sebagai DRAF.

2. **Urutan Beranda** (dari atas ke bawah):
   1. Sapaan
   2. Grid menu ikon fitur (sudah ada)
   3. Kartu "Mulai dari Sini" (sudah ada)
   4. Info Penting (dipindah ke sini, dari posisi sekarang)
   5. Sisa kartu yang sudah ada, tanpa perubahan urutan relatif

3. Tidak ada perubahan data, endpoint, atau konten. Hanya tampilan di sisi app.

## Di luar task ini

- Banner atau berita (task berikutnya)
- Perubahan isi grid ikon atau kartu
- Perubahan per jenjang
- Perubahan server dan migrasi
- Teks baru selain sapaan (jangan tambah kalimat lain tanpa lapor)

## Definition of Done

- [ ] Sapaan tampil paling atas dengan nama tampilan; fallback ke nama pengguna dan "Halo" sudah diuji
- [ ] Info Penting berada di bawah grid ikon dan kartu "Mulai dari Sini", dicek di layar 360 px
- [ ] Tidak ada kartu yang hilang atau terduplikasi setelah dipindah
- [ ] `npx tsc --noEmit` lolos di `LANJUT_App`
- [ ] Tes urutan Beranda ditambahkan (minimal: sapaan di indeks pertama, Info Penting setelah grid). Tes harus gagal kalau urutan dikembalikan, dibuktikan dengan mutasi (tukar urutan, lihat tes gagal, kembalikan)
- [ ] Teks sapaan DRAF tercatat di `salinan-teks-lanjut.md`
- [ ] Commit kecil, pesan commit menyebut `LANJUT_072`

## Laporkan

- Hash commit
- Hasil `npx tsc --noEmit` dan tes yang ditambahkan
- Hasil mutasi (gagal lalu lulus)
- Screenshot 360 px disimpan di `scratchpad/`, bukan di repo
- Keputusan yang kamu ambil sendiri, misalnya cara menangani nama panjang yang terpotong
