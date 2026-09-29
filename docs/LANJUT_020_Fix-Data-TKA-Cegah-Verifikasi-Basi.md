# TASK: Perbaiki Data TKA & Cegah Status Verifikasi Jadi Basi

## Konteks

Dari LANJUT_019: data TKA di `MVP-PWA/data/linimasa.json` (mockup) berbeda dari tanggal resmi yang sudah dikonfirmasi. Selain itu, ditemukan **celah desain**: `npm run benih` bisa mengubah tanggal konten tanpa menghapus tanda "sudah terverifikasi" — kalau ini tidak diperbaiki dulu, item yang ditandai terverifikasi nanti bisa jadi basi diam-diam kalau ada yang edit JSON lagi di masa depan.

**Urutan penting: Langkah 1 (cegah basi) HARUS selesai sebelum Langkah 2 (isi data benar + tandai).**

**Jangan ubah apapun di `LANJUT_App/` (Expo).**

## Langkah 1 — Cegah status verifikasi jadi basi

1. Di `benih.js` (yang sudah diubah di LANJUT_008 dan LANJUT_011), tambahkan logic: saat upsert baris yang **sudah ada**, bandingkan field konten (judul, tanggal, deskripsi — field yang BUKAN kolom verifikasi) dari JSON dengan yang ada di database.
2. **Kalau ada field konten yang berbeda** (JSON mau update sesuatu): reset `status_verifikasi` dan `diperiksa_pada` ke default "belum diverifikasi" — karena verifikasi lama tidak lagi valid untuk konten yang baru.
3. **Kalau field konten SAMA PERSIS** (tidak ada perubahan): kolom verifikasi tetap dibiarkan seperti apa adanya (perilaku LANJUT_011 tetap berlaku).
4. Test: tandai 1 baris terverifikasi → ubah judulnya di JSON → jalankan benih → baris itu harus **kembali jadi belum terverifikasi**. Lalu: tandai 1 baris lagi → jalankan benih TANPA ubah apapun di JSON → baris itu harus **tetap terverifikasi** (regresi dari LANJUT_011 tidak boleh rusak).
5. `npm test` harus tetap lolos semua.

## Langkah 2 — Perbaiki data TKA di JSON

Di `MVP-PWA/data/linimasa.json`:
1. `daftar-akun-tka`: ubah ke mulai **27 Juli 2026** (bukan 1 Agustus)
2. `pelaksanaan-tka`: ubah ke **26 Oktober – 8 November 2026** (bukan 1 Okt–30 Nov)
3. Tambah baris baru: **"Pelaksanaan susulan TKA"**, 16–29 November 2026
4. Perbaiki alamat sumber di ketiganya: arahkan ke siaran pers Kemendikdasmen (bukan `snpmb.bppp.kemdikbud.go.id` yang sertifikatnya kedaluwarsa dan salah instansi — TKA itu domain Kemendikdasmen, bukan SNPMB). Gunakan salah satu dari:
   - `https://www.kemendikdasmen.go.id/siaran-pers/15707-kemendikdasmen-tetapkan-pendaftaran-tka-2026-dimulai-pada-27-juli-2026`
   - `https://tka.kemendikdasmen.go.id/` (portal resmi)

## Langkah 3 — Jalankan benih & tandai

1. `npm run benih` — konfirmasi tanggal di database sekarang sesuai JSON yang baru.
2. Tandai ketiga item (termasuk baris baru susulan) terverifikasi:
   ```
   npm run verifikasi-konten -- --jenis=linimasa --id=daftar-akun-tka --oleh="[nama]" --tanggal=[HARI INI, tanggal pengecekan]
   ```
   Ulangi untuk `pelaksanaan-tka` dan baris susulan yang baru.
   **`--tanggal` = tanggal kamu menjalankan verifikasi ini (hari ini), BUKAN tanggal siaran pers.**

## Langkah 4 — Verifikasi hasil

- [ ] `GET /konten/linimasa` menampilkan ketiga item dengan tanggal yang benar dan `status_verifikasi: terverifikasi`
- [ ] Beranda menampilkan tenggat TKA yang benar (26 Oktober terdekat)
- [ ] Cek Posisi Gue menampilkan kalimat tenggat yang sesuai

## Langkah 5 — Commit

- Commit terpisah: fix cegah-basi (Langkah 1), lalu data JSON (Langkah 2)

## Definition of Done

- [ ] Benih tidak lagi bisa membuat status verifikasi jadi basi diam-diam
- [ ] Data TKA di JSON sudah benar sesuai sumber resmi
- [ ] Ketiga item ditandai terverifikasi dengan `--tanggal` = tanggal pengecekan (hari ini)
- [ ] `npm test` tetap lolos semua
- [ ] Beranda & Cek Posisi Gue tampil benar

## Laporkan di akhir

- Konfirmasi test skenario "ubah JSON → benih → status ke-reset" dan "JSON sama → benih → status tetap" keduanya lolos
- Screenshot Beranda & Cek Posisi Gue dengan tanggal TKA yang benar
- Commit hash
