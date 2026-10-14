# TASK: LANJUT_077b — Kembalikan Saklar AI, Hapus Pintu Kelas 12 dari Jalur Saya SMP, dan Teks Level-In

Baca dulu `docs/AGEN-ATURAN-TETAP.md`. Tidak ada deploy, push, `eas build`,
atau panggilan ke layanan luar. Tidak ada perubahan firewall. Tidak menambah
paket baru. Tidak menaikkan versi kebijakan privasi. Tidak memanggil OpenRouter.

## Konteks

LANJUT_077 sudah di-commit (`aab10bb`). Laporannya diterima bersyarat. Tiga hal
harus dibereskan sebelum 078:

1. **Saklar `ai_aktif` di `lanjut_test` bernilai `1`.** Spesifikasi 077 meminta
   `0`. Laporan menulis nilai itu sudah `1` sebelum 077. Tidak ada yang tahu siapa
   yang menyalakannya, jadi nilai ini harus dikembalikan ke bawaan `0`.
2. **Pintu "Jalur Saya" di Data Akun untuk SMP masih membuka `/cek-posisi`, dan
   layar itu berisi placeholder "Bagian ini untuk kelas 12".** Teks seperti ini
   sudah diminta dihapus dari halaman SMP di 076b. Pintu itu harus tidak tampil
   untuk kelas 7–9, atau diganti dengan teks netral DRAF.
3. **Teks Level-In lama (058) berbunyi "Mulai dari 5 kartu saja."** Ini angka
   tetap dalam teks. Ambang sekarang dibaca dari `konfigurasi_levelin`.

## Yang Diminta

### A. Saklar AI
1. Catat nilai `ai_aktif` di `lanjut_test` sebelum dan sesudah. Targetnya `0`.
2. Tambahkan tes yang mengunci nilai bawaan `ai_aktif = 0` di konfigurasi.
3. Tes lain yang mengubah saklar harus memulihkan nilai awalnya di blok `finally`.
   Laporkan tes mana yang sudah dicek.

### B. Pintu Jalur Saya untuk SMP
4. Di Data Akun untuk akun kelas 7–9, pintu "Jalur Saya" tidak membuka halaman
   yang berisi "Bagian ini untuk kelas 12". Pilih salah satu dan laporkan:
   - sembunyikan pintu untuk SMP, atau
   - tampilkan pintu dengan teks netral DRAF di layar `/cek-posisi` untuk SMP.
5. Tes: halaman yang bisa dibuka dari Data Akun SMP tidak memuat "Bagian ini untuk
   kelas 12" atau "Versi untuk kelas 7".
6. Kelas 10–12 tidak berubah.

### C. Teks Level-In
7. Ganti "Mulai dari 5 kartu saja." dengan teks DRAF tanpa angka tetap. Contoh:
   "Mulai dari sedikit kartu dulu saja." Catat di `docs/salinan-teks-lanjut.md` dan
   lembar review.
8. Tes: tidak ada teks yang memuat angka ambang tetap di layar Latihan.

### D. Bukti server
9. Jika server port 4000 berjalan saat task ini dikerjakan, lampirkan keluaran
   mentah (`curl -s -i`) untuk `GET /konten/banner` dan `GET /saran-harian` dengan
   token akun uji. Catat PID, jam mulai, dan direktori proses. Jika proses sudah
   berjalan sebelum task dibaca, tulis itu apa adanya. Jangan menyalakan server.
10. Jika server belum berjalan, laporkan "belum berjalan" dan lewati poin ini.

## Di luar task ini
- Menyalakan `ai_aktif` untuk pengujian. Itu dilakukan di 078, dengan izin Khalifa.
- Mengubah `kebijakan-privasi.json`.
- Menghapus event akun kelas 10–11 yang tersimpan dari 076 (keputusan PM: dibiarkan).
- Mengubah kartu Eksplorasi Kampus kelas 12 (tetap menunggu PM).

## Definition of Done

- [ ] `ai_aktif = 0` di `lanjut_test` (dicek di database), dengan nilai sebelum dan sesudah
- [ ] Tes mengunci bawaan `ai_aktif = 0`; tes yang mengubah saklar memulihkan di `finally`
- [ ] Pintu Jalur Saya untuk SMP tidak memuat "kelas 12"; ada tes
- [ ] Teks "Mulai dari 5 kartu saja." diganti DRAF tanpa angka; tercatat di salinan teks dan lembar review
- [ ] Tes angka ambang di layar Latihan lulus
- [ ] Bukti server dilaporkan jujur (mentah, atau "belum berjalan")
- [ ] `npm test`, `npm run periksa-sql`, `npx tsc --noEmit` lolos
- [ ] Tidak ada panggilan ke luar localhost; tidak ada paket baru
- [ ] Commit kecil, pesan commit menyebut `LANJUT_077b`

## Laporkan
- Hash commit (`git log -1 --format=%H`) dan `git show --stat`
- Nilai `ai_aktif` sebelum dan sesudah, dari database
- Pilihan untuk pintu Jalur Saya (sembunyikan atau teks netral) dan alasannya
- Hasil tes dan mutasi: (a) kembalikan teks "Bagian ini untuk kelas 12" untuk SMP, tes harus gagal
- Keluaran mentah server, atau "belum berjalan"
- Keputusan yang kamu ambil sendiri
- Catatan jujur: apakah ada perubahan di luar daftar "Yang Diminta"

## Batasan keamanan
- Jangan mencetak atau meminta kunci API.
- Jangan menulis ulang riwayat git dan jangan jalankan `npm audit fix` di folder app.
- Akun uji hanya di DB lokal. Jangan menyentuh akun nyata.
- Tangkapan layar tidak masuk repo.
