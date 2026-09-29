# TASK: Tandai Prinsip B-K1 Usang di SDD-Backend-Foundation.md

## Konteks

Sama seperti B-K2 (LANJUT_016), prinsip **B-K1** ("klien tetap berfungsi tanpa server; mode tamu adalah bawaan; akun opsional") **bertentangan dengan Expo**.

**Ini bukan keputusan baru** — login wajib di Expo sudah diputuskan sebelumnya (mode tamu dihapus, diterima sebagai trade-off produk). Task ini murni **menandai dokumen supaya konsisten dengan kenyataan**, sama seperti pola B-K2.

**Jangan ubah kode apapun.**

## Langkah 1 — Update dokumen

Ikuti pola yang sama persis seperti LANJUT_016 (coret + anotasi, jangan hapus histori):

1. Cari prinsip **B-K1** di `SDD-Backend-Foundation.md` — coret, beri anotasi: *"Diperbarui 27 Sep 2026: tidak berlaku untuk LANJUT_App (Expo) — login diwajibkan (keputusan produk, mode tamu dihapus). B-K1 masih relevan untuk MVP-PWA yang tidak mewajibkan akun."*
2. **§6.2** — anotasi serupa, spesifik ke bagian yang menjelaskan alur tanpa akun
3. **§6.5** ("401 → mode tamu, jangan paksa ke layar login") — coret, anotasi: *"Untuk LANJUT_App: 401 justru mengembalikan ke layar Masuk (perilaku yang disengaja, bukan bug). Berlaku untuk PWA saja."*
4. **B5** — cek isinya, beri anotasi konsisten kalau relevan ke prinsip yang sama

## Langkah 2 — Update catatan kepala dokumen

Tambahkan B-K1 dan bagian turunannya ke daftar ringkas di kepala dokumen yang sudah dibuat di LANJUT_016 (yang menyebut B-K2) — supaya satu tempat merangkum semua prinsip yang sudah dianotasi.

## Langkah 3 — Commit

- Satu commit untuk semua anotasi B-K1 ini

## Definition of Done

- [ ] B-K1, §6.2, §6.5, B5 dianotasi konsisten dengan pola B-K2
- [ ] Catatan kepala dokumen diperbarui mencakup B-K1
- [ ] Tidak ada teks lama dihapus, tidak ada perubahan kode

## Laporkan di akhir

- Bagian mana saja yang dianotasi
- Commit hash
