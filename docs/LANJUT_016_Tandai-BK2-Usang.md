# TASK: Tandai Prinsip B-K2 Usang di SDD-Backend-Foundation.md

## Konteks

Dari audit LANJUT_015: prinsip **B-K2** di `SDD-Backend-Foundation.md` ("localStorage tetap sumber kebenaran untuk penulisan; server hanya cadangan") **bertentangan dengan implementasi Expo aktual** (tulis langsung ke server, optimistic UI dengan rollback kalau gagal, tidak didesain untuk offline).

**Keputusan yang sudah diambil (27 Sep):** Expo **tetap pakai desain online-first sekarang** (yang sudah diimplementasikan) — bukan B-K2 yang diikuti. Alasan: app sudah wajib login (asumsi user online), dan tidak ada requirement eksplisit soal harus bisa dipakai offline. Ini keputusan final untuk MVP, bukan technical debt yang harus "diperbaiki" nanti — kalau suatu saat offline support benar-benar dibutuhkan, itu perlu didesain ulang dari awal (bukan sekadar "kembali ke B-K2").

**Task ini murni dokumentasi.** Jangan ubah kode apapun.

## Langkah 1 — Update dokumen

Ikuti pola yang sama seperti LANJUT_015 (coret + anotasi, jangan hapus histori):

1. Cari prinsip B-K2 di `SDD-Backend-Foundation.md`.
2. Coret pernyataannya, beri catatan: *"Diperbarui 27 Sep 2026: tidak berlaku untuk LANJUT_App (Expo) — app menulis langsung ke server dengan optimistic UI + rollback, didesain online-first (app mewajibkan login). B-K2 masih relevan HANYA untuk MVP-PWA yang tetap memakai localStorage. Keputusan: LANJUT_App tidak akan disesuaikan ke B-K2; kalau offline support dibutuhkan di masa depan, perlu desain baru, bukan revert ke prinsip ini."*
3. Kalau ada bagian lain di dokumen yang menurunkan logic dari B-K2 (misal alur sync, konflik data) dan itu juga cuma berlaku untuk PWA — beri anotasi serupa, jangan dihapus.

## Langkah 2 — Cek dokumen terkait

Cek apakah ada dokumen SDD/arsitektur lain yang mereferensikan B-K2 secara langsung (bukan cuma menyebut localStorage secara umum) — kalau ada, beri anotasi konsisten di situ juga.

## Langkah 3 — Commit

- Satu commit untuk semua anotasi ini

## Definition of Done

- [ ] B-K2 dicoret + dianotasi, bukan dihapus
- [ ] Anotasi jelas membedakan MVP-PWA (masih B-K2) vs LANJUT_App (online-first, keputusan final)
- [ ] Tidak ada perubahan kode

## Laporkan di akhir

- Bagian mana saja yang dianotasi
- Commit hash
