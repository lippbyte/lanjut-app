# Keputusan Topologi Hosting — Final

**Keputusan:** App (`app/`) tetap di root (`edilakso.my.id/`), sesuai Skenario A yang sudah dikunci dan sudah ada panduan deployment lengkap untuknya. Landing page dipindah ke subpath, BUKAN sebaliknya.

**Kenapa bukan Opsi A (landing di root, app di `/app/`):** akan menulis ulang `DEPLOYMENT-RUMAHWEB.md`, config cPanel Application root, dan proxy `.htaccess` yang sudah jadi — kerja besar untuk masalah yang solusinya jauh lebih murah dari sisi lain. Landing page statis, gampang dipindah; app + backend yang sudah dikonfigurasi, mahal dipindah.

---

## Dua pekerjaan paralel

### A. DNS/domain (blocker independen — kejar duluan, jangan tunggu B)

```
edilakso.my.id belum resolve (NXDOMAIN). Cek di panel Rumahweb:
1. Apakah domain sudah ditambahkan & di-assign ke akun cPanel?
2. Apakah nameserver domain (.my.id) sudah diarahkan ke Rumahweb?
3. Kalau baru diubah, propagasi DNS bisa makan waktu — cek pakai
   `dig edilakso.my.id` atau whatsmydns.net dari beberapa lokasi.
Laporkan status sungguhan, bukan asumsi "biasanya beres sendiri."
```

### B. Reposisi landing page

```
1. Konfirmasi app/ tetap di Application root cPanel sesuai
   DEPLOYMENT-RUMAHWEB.md — tidak ada perubahan di sini.

2. Pindahkan landing-page/ jadi subfolder yang disajikan statis di
   /tentang (edilakso.my.id/tentang), BUKAN di root. Ini cukup naruh
   folder landing-page/ di public_html/tentang/ — tidak butuh proses
   Node terpisah, cuma HTML/CSS statis.

3. 4 tombol di landing-page/index.html yang barusan diubah ke
   "https://edilakso.my.id/" TIDAK PERLU diubah lagi — itu sudah benar
   untuk topologi ini (root = app).

4. Setelah DNS di atas resolve, klik beneran dari
   edilakso.my.id/tentang, pastikan 4 tombol "Mulai Sekarang" mendarat
   di aplikasi (edilakso.my.id/, yang menjalankan Splash → Onboarding/
   Beranda), bukan 404.

5. Setelah ini beres, lanjut ke dua item terakhir yang masih tertunda:
   badge text fix dan investigasi Latihan Harian "Kartu X dari Y"
   (instruksi sudah ada di tiga-utang-terakhir.md, item 1 & 2).
```
