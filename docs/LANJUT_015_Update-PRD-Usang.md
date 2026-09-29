# TASK: Update Dokumen PRD yang Sudah Usang

## Konteks

Beberapa bagian dokumen `docs/prd-sdd-lanjut.md` (atau nama file sejenis di `docs/`) sudah tidak sesuai kenyataan setelah keputusan-keputusan yang diambil sejak 18-27 Sep:

1. **Bagian yang menolak app native/React Native untuk v1** — sudah tidak berlaku sejak keputusan pivot ke Expo (18 Sep)
2. **Entri 18 Sep soal "kemajuan 100% localStorage"** — sudah tidak berlaku, sekarang kemajuan tersimpan ke akun via backend (sejak LANJUT_001)
3. **Kemungkinan bagian lain** yang menyebut arsitektur lama (`app/`, `mobile-app/`, `server/` sebagai path, bukan `MVP-PWA/`, `LANJUT_App/`) — ini dokumen **historis/sejarah keputusan**, jadi path lama di teks naratif TIDAK PERLU diubah (itu catatan sejarah). Yang perlu diperbaiki HANYA bagian yang menyatakan sesuatu sebagai *keputusan yang masih berlaku* padahal sudah tidak.

**Jangan ubah apapun di kode** — ini murni dokumen.

## Langkah 1 — Audit

1. Baca `docs/prd-sdd-lanjut.md` (dan file terkait lain di `docs/` kalau ada yang serupa) secara menyeluruh
2. Identifikasi bagian yang menyatakan keputusan yang **sudah terbukti berubah** (bukan cuma path folder, tapi keputusan produk/teknis)
3. Bedakan: **catatan sejarah** ("pada 18 Sep diputuskan X") boleh dibiarkan apa adanya sebagai log — vs **pernyataan status saat ini** yang keliru kalau tidak diupdate

## Langkah 2 — Update

Untuk tiap bagian yang perlu diperbaiki:
- Tambahkan catatan koreksi (bukan hapus histori), contoh pola: *"~~[teks lama]~~ → Diperbarui [tanggal]: [status sekarang], lihat [referensi task/commit terkait]"*
- Jangan menulis ulang seluruh dokumen — cukup tandai bagian yang usang dengan jelas

## Langkah 3 — Commit

- Satu commit untuk update dokumentasi ini

## Definition of Done

- [ ] Bagian yang menolak app native sudah dikoreksi (menyebut keputusan Expo 18 Sep)
- [ ] Entri "kemajuan 100% localStorage" sudah dikoreksi
- [ ] Histori/catatan sejarah lain TIDAK dihapus, cuma ditandai kalau statusnya berubah
- [ ] Tidak ada perubahan kode

## Laporkan di akhir

- Daftar bagian yang dikoreksi
- Commit hash
