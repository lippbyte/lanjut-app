# TASK: Ambil & Catat Tanggal Penting Resmi (SNPMB/TKA) — Per Hari Ini

## Konteks

Countdown/tenggat di Beranda-Linimasa dan Cek Posisi Gue **sudah ada** (dari LANJUT_013 dan fitur Linimasa sebelumnya) — tapi cuma tampil kalau datanya ditandai terverifikasi lewat `npm run verifikasi-konten` (LANJUT_010/011). Task ini **BUKAN bikin UI countdown baru**, murni: cari tanggal resmi hari ini, lalu tandai yang valid.

**Prinsip wajib (tidak boleh dilanggar):**
1. **Hanya dari domain resmi** — `kemendikdasmen.go.id`, situs resmi SNPMB (cari domain resminya, biasanya `snpmb.bppp.kemdikbud.go.id` atau sejenis — verifikasi ini domain pemerintah asli, bukan situs pihak ketiga/blog/agregator kayak "aimasukptn", "eduosmo", dll)
2. **Kalau tidak ketemu di sumber resmi, JANGAN dikira-kira atau dipakai dari sumber tidak resmi.** Laporkan "belum ada" itu jawaban valid, bukan kegagalan.
3. **Ini bukan scraper otomatis yang jalan terus.** Ini eksekusi manual 1x hari ini. Jangan bikin cron job/scheduled task apapun.
4. **Setiap tanggal yang mau ditandai wajib disertai: URL sumber persis, dan kutipan singkat teks yang jadi dasar (bukan tebakan).**

## Langkah 0 — Cek kemampuan akses web

Konfirmasi dulu apakah kamu (Claude Code) punya akses web search/fetch di environment ini. **Kalau tidak ada**, STOP dan laporkan — jangan coba-coba pakai data dari memori/training yang bisa basi. Kalau ada, lanjut ke Langkah 1.

## Langkah 1 — Cari tanggal resmi yang berlaku SEKARANG

Cari status terkini (per hari ini) untuk:

1. **TKA 2026** — sudah ada konfirmasi sebelumnya (siaran pers Kemendikdasmen 28 Juli 2026): pendaftaran 27 Juli–27 Sep, pelaksanaan utama 26 Okt–8 Nov, susulan 16–29 Nov. **Verifikasi ulang** apakah masih berlaku sama atau ada perubahan/penundaan resmi terbaru.
2. **SNBP 2027** — cek apakah SNPMB sudah merilis jadwal resmi (per pengecekan terakhir 27 Sep 2026, belum dirilis, perkiraan rilis sekitar Desember 2026). Cek apakah statusnya masih sama atau sudah ada pengumuman baru.
3. **SNBT/UTBK 2027** — sama seperti di atas.
4. **Tanggal penting lain** yang mungkin relevan dan sudah resmi (misal pengumuman hasil TKA, jadwal terkait yang disebutkan di siaran pers resmi yang sama)

## Langkah 2 — Cocokkan dengan data di database

1. Jalankan `npm run verifikasi-konten -- --list` untuk lihat semua item Linimasa yang belum terverifikasi.
2. Cocokkan tiap item di daftar itu dengan hasil pencarian Langkah 1 — mana yang sekarang sudah ada sumber resminya, mana yang belum.

## Langkah 3 — Tandai yang valid

Untuk setiap item yang punya sumber resmi jelas:
```
npm run verifikasi-konten -- --jenis=linimasa --id=[id] --oleh="[nama kamu], diverifikasi dari [nama sumber resmi]" --tanggal=[tanggal siaran pers, BUKAN hari ini]
```

**Catatan penting:** `--tanggal` harus tanggal sumber resminya diterbitkan/berlaku, bukan tanggal kamu menjalankan skrip — kalau field ini artinya "kapan info ini terbit", isi sesuai itu.

**Untuk item yang TIDAK ada sumber resmi (misal SNBP/SNBT 2027 kalau belum dirilis):** JANGAN ditandai. Biarkan tetap kosong.

## Langkah 4 — Verifikasi hasil

1. Cek `GET /konten/linimasa` — konfirmasi item yang baru ditandai sekarang muncul dengan tanggal yang benar.
2. Buka Beranda di Expo web — konfirmasi tampil dengan benar, hitungan hari mundur akurat.
3. Buka Cek Posisi Gue — konfirmasi kalimat tenggat (dari LANJUT_013) juga ikut update.

## Definition of Done

- [ ] Pencarian dilakukan HANYA dari domain resmi pemerintah
- [ ] Setiap item yang ditandai punya URL sumber + kutipan yang bisa diverifikasi ulang
- [ ] Item yang belum ada sumber resmi TIDAK ditandai (bukan ditebak)
- [ ] Tidak ada scraper/automation berjalan terus dibuat — ini eksekusi manual 1x
- [ ] Beranda dan Cek Posisi Gue dikonfirmasi tampil benar setelah penandaan

## Laporkan di akhir

- Daftar lengkap: item apa saja yang ditandai, dengan URL sumber persis untuk masing-masing
- Item apa saja yang DICEK tapi TIDAK ditandai karena belum ada sumber resmi (dan kenapa)
- Screenshot Beranda dan Cek Posisi Gue setelah penandaan
- Rekomendasi: kapan sebaiknya proses ini diulang manual lagi (misal: cek lagi awal Desember untuk SNBP/SNBT 2027)
