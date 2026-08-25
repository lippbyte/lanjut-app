/* =========================================================================
   API.JS — lapisan jaringan LANJUT (akun & sesi)
   =========================================================================
   Menyambungkan klien statis ini ke server yang SUDAH ADA di server/src.
   Kontrak di bawah diambil dari kode server yang berjalan, BUKAN dari
   ringkasan tugas — lihat catatan "PENYIMPANGAN YANG DISENGAJA" di bawah.

     - Base path server : /api/v1               (server/src/app.js)
     - Daftar           : POST /api/v1/auth/daftar
                           body { nama_pengguna, kata_sandi, email?,
                                  nama_tampilan?, kelas?, prodi_impian? }
     - Masuk            : POST /api/v1/auth/masuk
                           body { nama_pengguna, kata_sandi }
     - Keluar           : POST /api/v1/auth/keluar      (Authorization: Bearer)
     - Profil sendiri   : GET  /api/v1/auth/saya         (Authorization: Bearer)
     - Ubah profil      : PATCH /api/v1/pengguna/saya    (Authorization: Bearer)
     - Daftar prodi     : GET  /api/v1/konten/prodi      (publik, tanpa login)

   Bentuk respons — docs/SDD-Backend-Foundation.md §4.2 (server/src/util/respons.js):
     sukses : { ok: true,  data: {...} }
     galat  : { ok: false, galat: { kode, pesan, medan? } }
   Kode galat yang dikenal server: VALIDASI_GAGAL, KREDENSIAL_SALAH,
   TIDAK_MASUK, SESI_KEDALUWARSA, TIDAK_BERHAK, TIDAK_DITEMUKAN,
   NAMA_PENGGUNA_DIPAKAI, TERLALU_SERING, GALAT_SERVER.

   ---------------------------------------------------------------------
   PENYIMPANGAN YANG DISENGAJA dari ringkasan tugas B8 — dilaporkan ke PM,
   bukan diputuskan diam-diam:

   1. Jalur & nama medan. Ringkasan tugas menyebut `/api/daftar`,
      `/api/daftar-masuk`, medan `username`/`password`/`email` wajib.
      Server yang SUNGGUH berjalan (server/src/modul/auth/*) memakai
      `/api/v1/auth/daftar` & `/api/v1/auth/masuk`, medan `nama_pengguna`
      & `kata_sandi`, dan `email` OPSIONAL (SDD §5.2 — surel sengaja tidak
      wajib supaya siswa tanpa surel tetap bisa daftar). Berkas ini
      mengikuti server yang nyata, karena mengikuti ringkasan tugas di
      titik ini membuat setiap panggilan gagal 404/400.
   2. Kunci localStorage. Ringkasan tugas minta `lanjut_token`. Dipakai di
      sini: `lanjut.auth.v1` (menyimpan { token, kedaluwarsa_pada, pengguna })
      — mengikuti pola penamaan yang SUDAH ada di app.js (`lanjut.profil.v1`)
      supaya konvensi kunci penyimpanan tetap satu gaya di seluruh aplikasi.
   3. Perilaku saat 401. SDD §6.5 (B-K1) MELARANG memaksa pengguna ke layar
      masuk saat sesi habis/tidak sah — aplikasi harus turun ke "mode tamu"
      dan tetap jalan dari data lokal. Karena itu `request()` di bawah HANYA
      menghapus token tersimpan saat 401, TIDAK PERNAH memanggil
      location.href. Halaman yang butuh redirect (mis. akun.html) memutuskan
      sendiri berdasarkan `isLoggedIn()`, bukan dipaksa dari sini.
   4. Alur daftar → masuk. Server sebenarnya membuat sesi otomatis saat
      daftar berhasil (SDD §5.4: "langsung masuk, satu langkah lebih
      sedikit"). daftar.html di proyek ini SENGAJA tidak memakai token itu
      dan tetap mengarahkan ke masuk.html, mengikuti rencana pengujian QA
      (skenario B8-1) apa adanya. Fungsi `daftar()` di bawah karena itu
      TIDAK menyimpan sesi secara otomatis — dibiarkan eksplisit lewat
      `simpanSesi()` supaya halaman lain bisa memilih jalan pintas itu nanti
      kalau PM memutuskan mengikuti SDD sepenuhnya.

   Lihat laporan ui-engineer ke PM untuk detail penuh & rekomendasi.
   ========================================================================= */
(function (global) {
  'use strict';

  var KUNCI_AUTH = 'lanjut.auth.v1';
  var KUNCI_CACHE_PRODI = 'lanjut.prodi-cache.v1';

  /* -----------------------------------------------------------------------
     ALAMAT SERVER
     Keputusan PM (Skenario A — deployment Rumahweb satu origin): app/ dan
     server/ disajikan dari domain yang sama, jadi path RELATIF "/api/v1"
     dipakai sebagai bawaan. Nilainya masih BISA ditimpa tanpa mengedit
     berkas ini lewat:

       <meta name="lanjut-api-base" content="https://api.contoh-domain.id/api/v1">

     di <head> tiap halaman yang memakai api.js — berguna untuk pengembangan
     lokal bila app/ dan server/ dijalankan di dua origin berbeda (mis. app
     di :8080 lewat `python -m http.server`, server di :3000).
     ----------------------------------------------------------------------- */
  function alamatDasar() {
    try {
      var meta = document.querySelector('meta[name="lanjut-api-base"]');
      if (meta && meta.content) return meta.content.replace(/\/+$/, '');
    } catch (e) { /* document tidak ada (dites di luar DOM) */ }
    return '/api/v1';
  }

  /* -----------------------------------------------------------------------
     SESI TERSIMPAN
     ----------------------------------------------------------------------- */
  var Sesi = {
    baca: function () {
      try {
        var mentah = global.localStorage.getItem(KUNCI_AUTH);
        if (!mentah) return null;
        var objek = JSON.parse(mentah);
        return (objek && typeof objek === 'object') ? objek : null;
      } catch (e) {
        return null;
      }
    },
    simpan: function (sesi) {
      try { global.localStorage.setItem(KUNCI_AUTH, JSON.stringify(sesi)); }
      catch (e) { /* penyimpanan penuh/ditolak — sesi tetap jalan di memori tab ini */ }
    },
    hapus: function () {
      try { global.localStorage.removeItem(KUNCI_AUTH); } catch (e) {}
    }
  };

  function getToken() {
    var sesi = Sesi.baca();
    return sesi && sesi.token ? sesi.token : null;
  }

  function isLoggedIn() {
    return !!getToken();
  }

  function penggunaTersimpan() {
    var sesi = Sesi.baca();
    return sesi && sesi.pengguna ? sesi.pengguna : null;
  }

  function simpanSesi(hasil) {
    Sesi.simpan({
      token: hasil.token,
      kedaluwarsa_pada: hasil.kedaluwarsa_pada,
      pengguna: hasil.pengguna
    });
    return hasil;
  }

  /* -----------------------------------------------------------------------
     PEMBUNGKUS FETCH
     Menyuntik header Authorization otomatis, mengurai bentuk respons
     seragam server (§4.2), dan MENOLAK dengan objek galat yang sudah
     dinormalkan: { kode, pesan, medan, statusHttp }.

     Tidak pernah melempar string mentah dari server ke pemanggil — pesan
     yang boleh ditampilkan ke pengguna WAJIB lewat pesanUntuk() di bawah,
     bukan `err.pesan` dari server (SDD §4.2, catatan "mengikat klien").
     ----------------------------------------------------------------------- */
  function request(jalur, opsi) {
    opsi = opsi || {};
    var headers = { 'Content-Type': 'application/json' };
    var token = getToken();
    if (token) headers.Authorization = 'Bearer ' + token;

    var init = {
      method: opsi.method || 'GET',
      headers: headers
    };
    if (opsi.body !== undefined) init.body = JSON.stringify(opsi.body);

    return global.fetch(alamatDasar() + jalur, init).then(
      function (res) {
        return res.json().catch(function () { return null; }).then(function (badan) {
          var berhasil = res.ok && badan && badan.ok !== false;
          if (berhasil) return badan.data;

          var galatServer = (badan && badan.galat) || {};
          var kode = galatServer.kode || 'GALAT_SERVER';

          /* SDD §6.5 / B-K1: sesi tidak sah TIDAK memaksa navigasi ke mana
             pun dari sini. Klien turun ke mode tamu dengan sendirinya
             begitu getToken() kembali null pada panggilan berikutnya. */
          if (res.status === 401) Sesi.hapus();

          var err = new Error(galatServer.pesan || kode);
          err.kode = kode;
          err.medan = galatServer.medan;
          err.statusHttp = res.status;
          throw err;
        });
      },
      function () {
        var err = new Error('Tidak bisa menghubungi server.');
        err.kode = 'JARINGAN';
        throw err;
      }
    );
  }

  /* -----------------------------------------------------------------------
     AKUN
     ----------------------------------------------------------------------- */

  /* data: { namaPengguna, kataSandi, email?, namaTampilan?, kelas?, prodiImpian? }
     Mengembalikan { token, kedaluwarsa_pada, pengguna } TANPA menyimpannya —
     lihat catatan "PENYIMPANGAN #4" di kepala berkas. Panggil simpanSesi()
     sendiri kalau ingin langsung masuk. */
  function daftar(data) {
    data = data || {};
    var body = {
      nama_pengguna: data.namaPengguna,
      kata_sandi: data.kataSandi
    };
    if (data.email) body.email = data.email;
    if (data.namaTampilan) body.nama_tampilan = data.namaTampilan;
    if (data.kelas) body.kelas = data.kelas;
    if (data.prodiImpian) body.prodi_impian = data.prodiImpian;
    return request('/auth/daftar', { method: 'POST', body: body });
  }

  /* Berhasil masuk SELALU menyimpan sesi — beda dengan daftar(). */
  function masuk(namaPengguna, kataSandi) {
    return request('/auth/masuk', {
      method: 'POST',
      body: { nama_pengguna: namaPengguna, kata_sandi: kataSandi }
    }).then(simpanSesi);
  }

  /* Selalu menghapus sesi lokal, bahkan kalau permintaan ke server gagal
     (server mati, jaringan putus) — pengguna tidak boleh terkunci "masih
     kelihatan masuk" di HP-nya sendiri hanya karena satu permintaan gagal. */
  function keluar() {
    var permintaan = isLoggedIn()
      ? request('/auth/keluar', { method: 'POST' }).catch(function () {})
      : Promise.resolve();
    return permintaan.then(function () { Sesi.hapus(); });
  }

  function profil() {
    return request('/auth/saya');
  }

  /* data boleh berisi kelas, prodi_tujuan, nama_tampilan (§4.3). */
  function updateProfil(data) {
    return request('/pengguna/saya', { method: 'PATCH', body: data });
  }

  /* -----------------------------------------------------------------------
     PRODI — untuk mengisi dropdown daftar.html
     Coba API dulu (data terkini); gagal → singgahan lokal; gagal juga →
     data/prodi.json bawaan klien (LANJUT.muatData, sudah ada di app.js).
     Ini penerapan B-K1: formulir tetap bisa diisi walau server mati.
     ----------------------------------------------------------------------- */
  function ambilProdi() {
    return request('/konten/prodi').then(function (daftarProdi) {
      try { global.localStorage.setItem(KUNCI_CACHE_PRODI, JSON.stringify(daftarProdi)); }
      catch (e) {}
      return daftarProdi;
    }).catch(function () {
      try {
        var singgahan = global.localStorage.getItem(KUNCI_CACHE_PRODI);
        if (singgahan) return JSON.parse(singgahan);
      } catch (e) {}
      if (global.LANJUT && typeof global.LANJUT.muatData === 'function') {
        return global.LANJUT.muatData('prodi').then(function (berkas) {
          return (berkas && Array.isArray(berkas.data)) ? berkas.data : [];
        }, function () { return []; });
      }
      return [];
    });
  }

  /* -----------------------------------------------------------------------
     PESAN GALAT UNTUK PENGGUNA
     -----------------------------------------------------------------------
     SDD §4.2 melarang menampilkan `galat.pesan` mentah dari server. Idealnya
     kalimat berikut hidup di docs/salinan-teks-lanjut.md seperti teks lain
     di aplikasi ini — BELUM ada entri untuk alur akun di dokumen itu saat
     berkas ini ditulis (lihat laporan ui-engineer ke PM). Kalimat di bawah
     dipakai sementara, ditulis mengikuti nada & aturan §0 (sapaan "kamu",
     tanpa kata yang dilarang), dan wajib dipindah/diselaraskan begitu
     copywriter menambahkannya ke dokumen salinan teks.
     ----------------------------------------------------------------------- */
  var PESAN_GALAT = {
    VALIDASI_GAGAL: 'Ada isian yang belum sesuai. Coba periksa lagi.',
    KREDENSIAL_SALAH: 'Nama pengguna atau kata sandi belum cocok.',
    NAMA_PENGGUNA_DIPAKAI: 'Nama pengguna ini sudah dipakai. Coba nama lain.',
    /* QA Phase 2 (bug U-3): kode galat ini dikirim server saat email yang
       didaftarkan sudah terpakai akun lain, tapi belum ada entrinya di
       peta ini — akibatnya jatuh ke GALAT_SERVER ("Sedang ada gangguan di
       server...") yang menyesatkan, padahal bukan gangguan server. */
    EMAIL_DIPAKAI: 'Email ini sudah dipakai akun lain. Coba email lain, atau masuk dengan akunmu.',
    /* Bukan selalu "5 menit" — kunci sementara bisa 5 atau 30 menit
       tergantung jumlah percobaan (server/src/modul/auth/percobaanMasuk.repo.js),
       ditambah batas per-IP terpisah. Kalimatnya sengaja tidak menyebut
       angka supaya tidak menjanjikan waktu yang kadang salah. */
    TERLALU_SERING: 'Terlalu banyak percobaan gagal. Tunggu beberapa menit, lalu coba lagi.',
    TIDAK_MASUK: 'Kamu perlu masuk dulu untuk membuka ini.',
    SESI_KEDALUWARSA: 'Sesi kamu sudah berakhir. Masuk lagi untuk melanjutkan.',
    TIDAK_DITEMUKAN: 'Tidak ditemukan.',
    TIDAK_BERHAK: 'Kamu tidak punya akses ke ini.',
    GALAT_SERVER: 'Sedang ada gangguan di server. Coba lagi sebentar lagi.',
    JARINGAN: 'Tidak bisa menghubungi server. Periksa koneksimu.'
  };

  function pesanUntuk(err) {
    if (!err || !err.kode) return PESAN_GALAT.GALAT_SERVER;
    return PESAN_GALAT[err.kode] || PESAN_GALAT.GALAT_SERVER;
  }

  /* -----------------------------------------------------------------------
     EKSPOR — menempel ke LANJUT global yang sudah dibuat app.js. Berkas ini
     dipasang setelah app.js di tiap halaman, jadi LANJUT sudah ada; dijaga
     tetap aman kalau urutan kelak dibalik.
     ----------------------------------------------------------------------- */
  global.LANJUT = global.LANJUT || {};
  global.LANJUT.api = {
    KUNCI_AUTH: KUNCI_AUTH,
    daftar: daftar,
    masuk: masuk,
    keluar: keluar,
    profil: profil,
    updateProfil: updateProfil,
    ambilProdi: ambilProdi,
    getToken: getToken,
    isLoggedIn: isLoggedIn,
    penggunaTersimpan: penggunaTersimpan,
    simpanSesi: simpanSesi,
    pesanUntuk: pesanUntuk,
    /* Diekspos untuk pengujian (tools/test-app.js gaya sama seperti
       LANJUT.profil) dan untuk halaman yang butuh panggilan mentah. */
    request: request
  };
})(window);
