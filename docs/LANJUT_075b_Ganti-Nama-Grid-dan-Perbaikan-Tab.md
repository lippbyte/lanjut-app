# TASK: LANJUT_075b — Ganti Nama Kartu Grid, Hapus Pintu Ngobrol di Grid, dan Perbaikan Tab

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi.

## Konteks

LANJUT_075 sudah di-commit (`c842d0a`). Laporannya menulis bahwa penggantian
nama kartu untuk SMP dan kelas 10–11 adalah "pilihan Anda di percakapan". Itu
tidak tepat. Keputusan itu baru disetujui PM pada 14 Oktober, dan spesifikasi
awalnya meminta kartu baru. Keputusan PM yang berlaku sekarang:

1. **Kartu yang sudah ada diganti namanya** menjadi "Eksplorasi Kampus" untuk
   SMP dan kelas 10–11. Kartu itu TIDAK ditambah kartu baru di grid mereka.
2. **Kartu "Ngobrol Bareng" dihapus dari grid Beranda** untuk semua jenjang,
   karena Ngobrol sudah ada di tab tengah navigasi. Akses Ngobrol dari
   Jenjang Saya tidak diubah.
3. **Kartu tambahan "Eksplorasi Kampus" untuk kelas 12**: belum diputuskan PM.
   Pertahankan dulu (sesuai hasil 075), dan tandai di laporan sebagai menunggu
   keputusan.

Tiga hal dari laporan 075 yang harus dibereskan sekarang juga:
- Tab aktif di `/eksplorasi-tujuan` masih menyala di Pilih Mapel. Tab yang aktif
  harus sesuai dengan layar asal atau tidak ada tab yang menyala, sesuai aturan
  F10 yang berlaku untuk jenjang tersebut.
- Kalimat di kebijakan privasi belum menyebut `minat_rumpun`. Jangan ubah
  `lib/kebijakan-privasi.json` dan jangan naikkan versinya. Cukup tulis DRAF
  kalimat baru di lembar review.
- Tes `modul.test.js` ("kunci modul_* tidak ikut terkirim…") pernah gagal sekali
  di run penuh pada 074. Selidiki penyebabnya dan laporkan apakah tes itu
  bergantung pada urutan atau waktu.

## Yang Diminta

### A. Ganti nama kartu (SMP dan kelas 10–11)
1. Untuk akun SMP dan kelas 10–11, kartu grid yang ke `/eksplorasi-tujuan`
   berlabel "Eksplorasi Kampus". Ikonnya tetap.
2. Judul bilah halaman mengikuti jenjang (sudah ada, tidak diubah).
3. Jumlah kartu SMP dan kelas 10–11 tidak bertambah.

### B. Hapus kartu "Ngobrol Bareng" dari grid Beranda
4. Hapus kartu Ngobrol dari grid untuk semua jenjang. Isi grid lain tidak
   berubah, dan urutannya tetap.
5. Tab tengah tetap membuka Ngobrol, dan gerbang persetujuan tetap berlaku.
6. Pintu Ngobrol dari Jenjang Saya tetap ada. Laporkan jumlah pintu Ngobrol
   yang tersisa setelah perubahan.
7. Lapor jumlah kartu grid untuk setiap jenjang sesudah perubahan.

### C. Perbaiki tab aktif
8. Di `/eksplorasi-tujuan`, tab yang aktif tidak boleh Pilih Mapel untuk akun
   SMP. Perbaiki sesuai aturan yang berlaku, dan laporkan aturan apa yang
   dipakai.
9. Tambahkan tes: pada `/eksplorasi-tujuan` untuk SMP, tab Pilih Mapel tidak aktif.

### D. Kebijakan privasi (DRAF saja)
10. Tulis DRAF kalimat untuk `minat_rumpun` di `docs/salinan-teks-lanjut.md`
    dan lembar review. Contoh isi: "Kami menyimpan bidang minat yang kamu pilih
    untuk menampilkan Eksplorasi Kampus." Tandai sebagai DRAF, jangan dipakai
    di layar, dan jangan ubah `kebijakan-privasi.json`.

### E. Selidiki tes yang kadang gagal
11. Jalankan `npm test` tiga kali berturut-turut. Laporkan hasil tiap run.
12. Jika `modul.test.js` gagal lagi, tulis penyebab dan perbaikannya dalam laporan.
    Jangan menghapus atau melonggarkan asersinya.

### F. Verifikasi server
13. Server di port 4000 mati sejak komputer dinyalakan ulang. Eksekutor tidak
    menyalakannya. Khalifa perlu menjalankan `npm start` di `LANJUT_App/server`.
    Eksekutor menunggu sampai itu dilaporkan, lalu menguji:
    - `GET /konten/banner` (harus mengembalikan `banner: []` atau sesuai isi)
    - `PATCH /pengguna/saya` dengan `minat_rumpun` (akun uji `uji075_*`)
    - tab dan grid sesuai hasil poin 4–9
14. Jika server belum dinyalakan saat task ini dikerjakan, laporkan dan lanjutkan
    dengan tes otomatis saja. Jangan mengklaim verifikasi server sudah dilakukan.

### G. Koreksi laporan 075
15. Di laporan 075b, tulis: "Penggantian nama kartu SMP dan kelas 10–11 disetujui
    PM pada 14 Oktober. Pada laporan 075 sebelumnya tertulis sebagai pilihan
    PM di percakapan, dan itu keliru."
16. Catat juga bahwa spesifikasi 075 menyebut "kartu A2 (kelas 10–12)". Itu
    kekeliruan PM. Pintu SMP adalah A2, pintu kelas 10–11 adalah B3, dan kelas
    12 tidak punya pintu Eksplorasi.

## Di luar task ini
- Mengubah isi `kebijakan-privasi.json` atau menaikkan versinya.
- Menambah atau menukar kartu grid selain yang disebut di poin 1–3.
- Mengubah isi layar Eksplorasi Kampus per jenjang.
- Mengubah kontrak API.
- Menghapus kartu kelas 12 tanpa keputusan PM.

## Definition of Done

- [ ] Kartu SMP dan kelas 10–11 berlabel "Eksplorasi Kampus"; jumlah kartu tidak bertambah
- [ ] Kartu Ngobrol Bareng hilang dari grid semua jenjang; pintu Ngobrol di Jenjang Saya tetap
- [ ] Jumlah kartu grid per jenjang dilaporkan
- [ ] Tab Pilih Mapel tidak aktif di `/eksplorasi-tujuan` untuk SMP; ada tes
- [ ] DRAF `minat_rumpun` di salinan teks dan lembar review; `kebijakan-privasi.json` tidak berubah
- [ ] `npm test` dijalankan tiga kali; hasilnya dilaporkan
- [ ] Penyebab tes `modul.test.js` (jika gagal lagi) dilaporkan
- [ ] Mutasi, gagal lalu lulus: (a) kartu Ngobrol kembali ke grid, (b) tab Pilih Mapel aktif kembali, (c) label lama "Eksplorasi Tujuan" kembali untuk SMP
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lolos
- [ ] Verifikasi server (poin 13) dilaporkan jujur, dan tidak diklaim bila belum dilakukan
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_075b`

## Bukti 360 px
- Akun kelas 7: grid tanpa kartu Ngobrol, kartu tengah tab tetap ada
- Akun kelas 10: kartu "Eksplorasi Kampus" di grid
- Akun kelas 12: grid dan kartu tambahan seperti sekarang
- Simpan di `scratchpad/`, bukan di repo

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Jumlah kartu grid per jenjang sebelum dan sesudah
- Aturan tab aktif yang dipakai
- Hasil tiga run `npm test`
- Hasil mutasi (gagal lalu lulus)
- Status verifikasi server: sudah atau belum, dan hasilnya
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"
