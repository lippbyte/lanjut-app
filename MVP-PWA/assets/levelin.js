/* =========================================================================
   LEVELIN.JS — Confidence Gap Tracker (Level-In)
   =========================================================================
   Modul Level-In untuk LANJUT PWA. SDD-LevelIn.md §5.2, §6.

   Empat lapisan:
     1. KONFIGURASI — muatKonfig(), KONFIG_BAWAAN
     2. KEPUTUSAN (murni) — gapNumerik(), klasifikasiKartu(), dll
     3. PENYIMPANAN — Kalibrasi.baca/catat/pangkas, Sesi.mulai/baca/simpan/tutup
     4. PEMASANGAN UI — pasangKeyakinan(), pasangPembandingGap(), dll

   Ekspor global: LANJUT_LEVELIN = { gapNumerik, klasifikasiKartu, ... }
   Lapisan 3 & 4 tidak diekspor (internal only) — KECUALI gabungKonfigPerKunci,
   lihat catatan di Lapisan 1 di bawah untuk alasannya (penyimpangan kecil dari
   daftar ekspor SDD §5.2, dilaporkan ke PM).

   ========================================================================
   KONTRAK EVENT untuk penyambungan UI (dipakai ui-engineer di latihan.html /
   latihan-selesai.html). Level-In v1 SENGAJA tidak memasang listener klik
   sendiri ke tombol Benar/Salah (keduanya masih <a href="latihan-selesai.html">
   statis di markup — itu wilayah ui-engineer). Tiga event kustom di bawah
   adalah satu-satunya jalan masuk ke siklus hidup sesi/kalibrasi:

   1. window.dispatchEvent(new CustomEvent('levelin:kartu-baru', {
        detail: { kartu_id, mapel_id }   // opsional, untuk antrian multi-kartu
      }))
      Kapan: setiap kali kartu BERIKUTNYA ditampilkan dalam sesi yang sama.
      Efek: mengosongkan kembali pemilihan keyakinan (chip + baris arti +
      tombol "Lihat jawaban" kembali tertahan). Kalau belum ada sesi berjalan
      atau sesi sebelumnya sudah ditutup, sesi baru otomatis dimulai lebih
      dulu (lihat mulaiSesiDariHalaman()).

   2. window.dispatchEvent(new CustomEvent('levelin:jawaban-dicatat', {
        detail: { kartu_id, mapel_id, keyakinan, benar }
      }))
      Kapan: TEPAT setelah pengguna menekan tombol "Benar" atau "Salah".
        - kartu_id, mapel_id: string, identitas kartu yang baru dijawab.
        - keyakinan: 1..5. Boleh dihilangkan (levelin.js akan memakai nilai
          yang sudah tersimpan dari klik chip keyakinan sebagai cadangan).
        - benar: boolean — true untuk "Benar", false untuk "Salah".
      Efek: mencatat satu baris ke localStorage (Kalibrasi.catat), memangkas
      jendela per mapel, dan menyiapkan umpan balik untuk strip pembanding
      gap yang muncul di kartu berikutnya / latihan-selesai.html.

   3. Sesi ditutup OTOMATIS saat latihan-selesai.html dimuat (DOMContentLoaded
      -> pasangRingkasanSesi() -> Sesi.tutup()) — TIDAK perlu event terpisah
      untuk alur normal. Untuk kasus lain (mis. sesi diakhiri lebih awal dari
      halaman lain), tersedia juga:
        window.dispatchEvent(new CustomEvent('levelin:sesi-selesai'))
      yang cukup memanggil Sesi.tutup() tanpa efek lain.

   Detail lengkap ada di laporan tugas (levelin.js), bagian "Kontrak event
   untuk ui-engineer".
   ========================================================================= */
(function (global) {
  'use strict';

  /* -----------------------------------------------------------------------
     1. KONFIGURASI — Lapisan 1
     ----------------------------------------------------------------------- */
  var KONFIG_BAWAAN = {
    versi: 1,
    aturan_versi: 1,
    ambang: {
      ambang_overconfident: 0.40,
      minimum_kartu: 5,
      jendela_per_mapel: 50
    },
    klasifikasi: {
      keyakinan_tinggi_minimal: 4,
      keyakinan_rendah_maksimal: 2
    },
    akses: {
      ringkasan_kalibrasi_sesi: 'gratis',
      tampilan_agregat_mapel: 'belum_diputuskan'
    }
  };

  var konfig = null;
  var konfigPromise = null;

  /* Menggabungkan hasil fetch data/levelin-konfig.json ke atas KONFIG_BAWAAN,
     PER KUNCI (bukan replace total) — supaya berkas konfigurasi yang tidak
     lengkap tidak menghapus kunci lain (SDD §3.6). Rekursif satu tingkat
     untuk objek bersarang (ambang/klasifikasi/akses); nilai bukan-objek
     menimpa langsung.

     Diekspor ke LANJUT_LEVELIN (lihat bagian EKSPOR GLOBAL di bawah) meski
     SDD §5.2 tidak menyebutnya di daftar ekspor Lapisan 1 — penyimpangan
     kecil yang disengaja supaya logika penggabungan per-kunci ini (yang
     kalau salah membuat ambang 40%/5 diam-diam tidak pernah benar-benar
     terpakai) bisa diuji langsung tanpa perlu menunggu Promise fetch
     selesai di lingkungan Node tanpa DOM. Dilaporkan ke PM di laporan
     tugas, bukan diputuskan diam-diam. */
  function gabungKonfigPerKunci(dasar, tambahan) {
    if (!tambahan || typeof tambahan !== 'object') return dasar;
    Object.keys(tambahan).forEach(function (kunci) {
      var nilaiBaru = tambahan[kunci];
      var nilaiLama = dasar[kunci];
      if (nilaiBaru && typeof nilaiBaru === 'object' && !Array.isArray(nilaiBaru) &&
          nilaiLama && typeof nilaiLama === 'object' && !Array.isArray(nilaiLama)) {
        gabungKonfigPerKunci(nilaiLama, nilaiBaru);
      } else if (nilaiBaru !== undefined) {
        dasar[kunci] = nilaiBaru;
      }
    });
    return dasar;
  }

  /* Muat konfigurasi dari data/levelin-konfig.json lewat LANJUT.muatData()
     yang sudah ada (SDD §2.1: "dimuat lewat LANJUT.muatData() yang sudah
     ada", konsisten dengan pola pemuatan data lain di app.js).

     KONFIG_BAWAAN dipasang SEGERA secara sinkron sebagai cadangan (wajib:
     fetch() tidak jalan lewat file://, app/README.md), lalu ditimpa PER
     KUNCI begitu berkas berhasil dimuat. `konfig` adalah SATU objek yang
     sama sepanjang umur halaman (dimutasi di tempat lewat
     gabungKonfigPerKunci, bukan diganti referensinya) — supaya seluruh kode
     yang sudah memegang referensi ini lewat ambilKonfig() ikut melihat
     nilai final begitu fetch selesai, tanpa perlu render ulang manual.

     Sebelum perbaikan ini, fungsi ini HANYA mengembalikan klon
     KONFIG_BAWAAN dan tidak pernah benar-benar membaca berkas JSON-nya
     (lihat laporan QA) — akibatnya ambang 40%/minimum 5 kartu/jendela 50
     tidak bisa diubah cukup dengan mengedit data/levelin-konfig.json,
     bertentangan dengan AC FL3 dan K3 (SDD §1). */
  function muatKonfig() {
    if (konfig) return konfig;
    konfig = JSON.parse(JSON.stringify(KONFIG_BAWAAN));

    if (global.LANJUT && typeof global.LANJUT.muatData === 'function') {
      konfigPromise = global.LANJUT.muatData('levelin-konfig').then(function (berkas) {
        gabungKonfigPerKunci(konfig, berkas);
        return konfig;
      }).catch(function () {
        /* fetch gagal (file://, luring, berkas rusak) -> KONFIG_BAWAAN yang
           sudah dipasang di atas tetap berlaku, tidak ada yang ditimpa. */
        return konfig;
      });
    }

    return konfig;
  }

  function ambilKonfig() {
    if (!konfig) muatKonfig();
    return konfig;
  }

  /* -----------------------------------------------------------------------
     2. KEPUTUSAN (MURNI) — Lapisan 2
     Tanpa DOM, tanpa jam, tanpa storage. Semua masukan lewat argumen.
     ----------------------------------------------------------------------- */

  /* Gap numerik per kartu (SDD §6.1a). */
  function gapNumerik(keyakinan, benar) {
    if (keyakinan === null || keyakinan === undefined) return null;
    var pYakin = (keyakinan - 1) / 4;
    var hasil = benar ? 1 : 0;
    return pYakin - hasil;
  }

  /* Klasifikasi kartu (SDD §6.1b). */
  function klasifikasiKartu(keyakinan, benar, konfigObj) {
    if (keyakinan === null || keyakinan === undefined) return null;
    var cfg = konfigObj || ambilKonfig();
    var tinggiMin = cfg.klasifikasi.keyakinan_tinggi_minimal;
    var rendahMaks = cfg.klasifikasi.keyakinan_rendah_maksimal;

    if (keyakinan === 3) return 'netral';
    if (keyakinan >= tinggiMin && !benar) return 'overconfident';
    if (keyakinan <= rendahMaks && benar) return 'underconfident';
    return 'selaras';
  }

  /* Agregasi per mapel (SDD §6.1c). Menerima peristiwa[] (riwayat mentah)
     dan, opsional, `semuaMapelId` (daftar id mapel yang DIKETAHUI ada,
     mis. dari data/mapel.json). Mengembalikan peta mapel_id -> agregat
     dengan rate, status_data, pola.

     Mapel yang ada di `semuaMapelId` tapi belum punya satu peristiwa pun
     TETAP muncul di keluaran dengan status_data='belum_cukup_data' dan
     rate_overconfident=null — SDD §6.1c & AC FL3 melarang mapel hilang
     begitu saja dari hasil agregasi (sebelumnya mapel tanpa data memang
     hilang total dari objek `hasil`, lihat laporan QA). */
  function agregatPerMapel(peristiwa, konfigObj, semuaMapelId) {
    var cfg = konfigObj || ambilKonfig();
    var jendela = cfg.ambang.jendela_per_mapel;
    var minKartu = cfg.ambang.minimum_kartu;
    var ambangOC = cfg.ambang.ambang_overconfident;

    /* Kelompokkan per mapel, ambil N terakhir per mapel. */
    var perMapel = {};
    (peristiwa || []).forEach(function (ev) {
      var mid = ev.mapel_id;
      if (!perMapel[mid]) perMapel[mid] = [];
      perMapel[mid].push(ev);
    });

    function hitungSatu(daftar) {
      var kartuDikerjakan = 0;
      var nOC = 0, nUC = 0, nSelaras = 0, nNetral = 0, nBenar = 0;

      daftar.forEach(function (ev) {
        if (ev.keyakinan === null || ev.keyakinan === undefined) return;
        kartuDikerjakan++;
        nBenar += ev.benar ? 1 : 0;
        var kelas = klasifikasiKartu(ev.keyakinan, ev.benar, cfg);
        if (kelas === 'overconfident') nOC++;
        else if (kelas === 'underconfident') nUC++;
        else if (kelas === 'selaras') nSelaras++;
        else if (kelas === 'netral') nNetral++;
      });

      var rateOC = kartuDikerjakan > 0 ? nOC / kartuDikerjakan : null;
      var statusData = kartuDikerjakan >= minKartu ? 'cukup_data' : 'belum_cukup_data';
      var pola = statusData === 'belum_cukup_data'
        ? 'belum_cukup_data'
        : (rateOC >= ambangOC ? 'overconfident' : 'selaras');

      return {
        kartu_dikerjakan: kartuDikerjakan,
        n_overconfident: nOC,
        n_underconfident: nUC,
        n_selaras: nSelaras,
        n_netral: nNetral,
        n_benar: nBenar,
        rate_overconfident: rateOC,
        status_data: statusData,
        pola: pola
      };
    }

    var hasil = {};
    Object.keys(perMapel).forEach(function (mapelId) {
      hasil[mapelId] = hitungSatu(perMapel[mapelId].slice(-jendela));
    });

    (semuaMapelId || []).forEach(function (mapelId) {
      if (!mapelId || hasil[mapelId]) return;
      hasil[mapelId] = hitungSatu([]);
    });

    return hasil;
  }

  /* Ringkasan sesi (SDD §6.1d). */
  function ringkasSesi(jawaban) {
    var total = jawaban.length;
    var benar = 0;
    var overconfident = 0, underconfident = 0, selaras = 0, netral = 0;

    jawaban.forEach(function (j) {
      if (j.benar) benar++;
      var kelas = klasifikasiKartu(j.keyakinan, j.benar);
      if (kelas === 'overconfident') overconfident++;
      else if (kelas === 'underconfident') underconfident++;
      else if (kelas === 'selaras') selaras++;
      else if (kelas === 'netral') netral++;
    });

    return {
      total: total,
      benar: benar,
      overconfident: overconfident,
      underconfident: underconfident,
      selaras: selaras,
      netral: netral
    };
  }

  /* Saran belajar harian (SDD §6.1e, §6.1f). */
  function saranHarian(agregat, ketersediaanKartu, konfigObj) {
    var cfg = konfigObj || ambilKonfig();

    /* Helper: hitung jumlah kartu tersedia untuk mapel. */
    function hitungKartuTersedia(mapelId) {
      if (!ketersediaanKartu || !ketersediaanKartu[mapelId]) return 0;
      return ketersediaanKartu[mapelId];
    }

    /* Rantai fallback (SDD §6.1f). */

    /* 1. Arsip kosong? */
    var adaKartuApaAja = false;
    Object.keys(ketersediaanKartu || {}).forEach(function (mid) {
      if (ketersediaanKartu[mid] > 0) adaKartuApaAja = true;
    });
    if (!adaKartuApaAja) {
      return { jenis: 'arsip_kosong', mapel_id: null };
    }

    /* 2. Ada kandidat overconfident? */
    var kandidatOC = [];
    Object.keys(agregat || {}).forEach(function (mapelId) {
      var agg = agregat[mapelId];
      if (agg.pola === 'overconfident' && hitungKartuTersedia(mapelId) > 0) {
        kandidatOC.push(mapelId);
      }
    });

    if (kandidatOC.length > 0) {
      /* Urutkan: rate DESC, kartu_dikerjakan DESC, mapel_id ASC. */
      var terbaik = kandidatOC.sort(function (a, b) {
        var rateA = agregat[a].rate_overconfident || -1;
        var rateB = agregat[b].rate_overconfident || -1;
        if (rateB !== rateA) return rateB - rateA;
        var kartuA = agregat[a].kartu_dikerjakan;
        var kartuB = agregat[b].kartu_dikerjakan;
        if (kartuB !== kartuA) return kartuB - kartuA;
        return a < b ? -1 : (a > b ? 1 : 0);
      })[0];
      return { jenis: 'saran', mapel_id: terbaik };
    }

    /* 3. Ada mapel cukup_data, tapi tidak overconfident? */
    var kandidatSelaras = [];
    Object.keys(agregat || {}).forEach(function (mapelId) {
      var agg = agregat[mapelId];
      if (agg.status_data === 'cukup_data' && agg.pola !== 'overconfident' &&
          hitungKartuTersedia(mapelId) > 0) {
        kandidatSelaras.push(mapelId);
      }
    });

    if (kandidatSelaras.length > 0) {
      return { jenis: 'kalibrasi_selaras', mapel_id: null };
    }

    /* 4. Ada riwayat tapi semua belum_cukup_data? (SDD §6.1f baris 4 vs 5)

       KOREKSI (Fase 2): sebelumnya `adaRiwayat` hanya memeriksa
       `Object.keys(agregat).length > 0` — tapi agregatPerMapel() SELALU
       mengisi entri untuk SETIAP mapel di `semuaMapelId` (SDD §6.1c),
       termasuk yang belum pernah dikerjakan sama sekali (kartu_dikerjakan=0).
       Akibatnya `agregat` nyaris tidak pernah kosong begitu data/mapel.json
       tersedia, sehingga baris 5 ('pengguna_baru') jadi TIDAK PERNAH
       tercapai lewat pasangSaranBeranda() — pengguna baru selalu jatuh ke
       'belum_cukup_data', padahal SDD §6.1f baris 4 secara eksplisit
       mensyaratkan "ADA riwayat" (bukan sekadar "ada entri mapel yang
       diketahui"). Sekarang memeriksa langsung apakah ADA mapel dengan
       kartu_dikerjakan > 0 — itulah definisi "ada riwayat" yang benar. */
    var adaRiwayat = Object.keys(agregat || {}).some(function (mapelId) {
      var agg = agregat[mapelId];
      return !!agg && agg.kartu_dikerjakan > 0;
    });
    if (adaRiwayat) {
      var kandidatBCD = [];
      Object.keys(agregat || {}).forEach(function (mapelId) {
        if (hitungKartuTersedia(mapelId) > 0) {
          kandidatBCD.push(mapelId);
        }
      });
      if (kandidatBCD.length > 0) {
        /* Pilih: yang punya kartu_dikerjakan paling banyak, tie-break mapel_id ASC. */
        var terpilih = kandidatBCD.sort(function (a, b) {
          var ka = agregat[a] ? agregat[a].kartu_dikerjakan : 0;
          var kb = agregat[b] ? agregat[b].kartu_dikerjakan : 0;
          if (kb !== ka) return kb - ka;
          return a < b ? -1 : (a > b ? 1 : 0);
        })[0];
        return { jenis: 'belum_cukup_data', mapel_id: terpilih };
      }
    }

    /* 5. Pengguna baru (belum ada riwayat sama sekali). */
    var semuaMapel = [];
    Object.keys(ketersediaanKartu || {}).forEach(function (mapelId) {
      if (ketersediaanKartu[mapelId] > 0) {
        semuaMapel.push(mapelId);
      }
    });
    if (semuaMapel.length > 0) {
      var terpilihBaru = semuaMapel.sort(function (a, b) {
        var ka = agregat[a] ? agregat[a].kartu_dikerjakan : 0;
        var kb = agregat[b] ? agregat[b].kartu_dikerjakan : 0;
        if (kb !== ka) return kb - ka;
        return a < b ? -1 : (a > b ? 1 : 0);
      })[0];
      return { jenis: 'pengguna_baru', mapel_id: terpilihBaru };
    }

    /* Fallback last resort (tidak seharusnya tercapai). */
    return { jenis: 'pengguna_baru', mapel_id: null };
  }

  /* -----------------------------------------------------------------------
     3. PENYIMPANAN — Lapisan 3
     Semua dibungkus try/catch. Storage rusak/ditolak -> keadaan kosong.
     ----------------------------------------------------------------------- */
  var KUNCI_RIWAYAT = 'lanjut.levelin.v1';
  var KUNCI_SESI = 'lanjut.levelin.sesi.v1';

  /* Helper: generate ID (SDD §3.4). */
  function buatId(prefiks) {
    if (global.crypto && global.crypto.randomUUID) {
      return global.crypto.randomUUID();
    }
    var acak = Math.floor(Math.random() * 10000).toString(16).padStart(4, '0');
    return (prefiks || 'lv') + '-' + Date.now() + '-' + acak;
  }

  var Kalibrasi = {
    /* Membaca riwayat kalibrasi dari localStorage. */
    baca: function () {
      try {
        var mentah = global.localStorage.getItem(KUNCI_RIWAYAT);
        if (!mentah) return { peristiwa: [], versi: 1, aturan_versi: 1 };
        var obj = JSON.parse(mentah);
        if (!obj || typeof obj !== 'object') return { peristiwa: [], versi: 1, aturan_versi: 1 };
        if (obj.versi !== 1) return { peristiwa: [], versi: 1, aturan_versi: 1 };
        return obj;
      } catch (e) {
        return { peristiwa: [], versi: 1, aturan_versi: 1 };
      }
    },

    /* Menulis satu catatan baru dan pangkas jendela per mapel. */
    catat: function (ev) {
      var data = Kalibrasi.baca();
      if (!data.peristiwa) data.peristiwa = [];
      data.peristiwa.push({
        id: ev.id || buatId('lv'),
        sesi_id: ev.sesi_id,
        kartu_id: ev.kartu_id,
        mapel_id: ev.mapel_id,
        keyakinan: ev.keyakinan,
        benar: ev.benar,
        waktu: ev.waktu || new Date().toISOString(),
        aturan_versi: ambilKonfig().aturan_versi
      });
      Kalibrasi.pangkas(data);
      try {
        global.localStorage.setItem(KUNCI_RIWAYAT, JSON.stringify(data));
      } catch (e) { /* penyimpanan penuh/ditolak */ }
      return data;
    },

    /* Pangkas jendela per mapel (SDD §3.5). */
    pangkas: function (data) {
      if (!data || !data.peristiwa) return;
      var jendela = ambilKonfig().ambang.jendela_per_mapel || 50;
      var perMapel = {};

      data.peristiwa.forEach(function (ev) {
        var mid = ev.mapel_id;
        if (!perMapel[mid]) perMapel[mid] = [];
        perMapel[mid].push(ev);
      });

      var hasil = [];
      Object.keys(perMapel).forEach(function (mapelId) {
        var daftar = perMapel[mapelId];
        if (daftar.length > jendela) {
          daftar = daftar.slice(-jendela);
        }
        hasil = hasil.concat(daftar);
      });

      data.peristiwa = hasil;
    }
  };

  var Sesi = {
    /* Membaca keadaan sesi berjalan dari sessionStorage. */
    baca: function () {
      try {
        var mentah = global.sessionStorage.getItem(KUNCI_SESI);
        if (!mentah) return null;
        var obj = JSON.parse(mentah);
        return (obj && typeof obj === 'object') ? obj : null;
      } catch (e) {
        return null;
      }
    },

    /* Mulai sesi baru. */
    mulai: function (opts) {
      opts = opts || {};
      var sesi = {
        sesi_id: opts.sesi_id || buatId('ls'),
        dimulai_pada: new Date().toISOString(),
        asal_mula: opts.asal_mula || 'arsip',
        mapel_fokus: opts.mapel_fokus || null,
        antrian: opts.antrian || [],
        indeks: 0,
        keyakinan_kartu_ini: null,
        jawaban: [],
        umpan_balik_tertunda: null
      };
      Sesi.simpan(sesi);
      return sesi;
    },

    /* Menyimpan keadaan sesi ke sessionStorage. */
    simpan: function (sesi) {
      try {
        global.sessionStorage.setItem(KUNCI_SESI, JSON.stringify(sesi));
      } catch (e) { /* penyimpanan penuh/ditolak */ }
    },

    /* Menutup sesi (set selesai_pada). Aman dipanggil walau belum ada sesi
       (mengembalikan null) atau dipanggil berkali-kali (idempoten cukup —
       hanya menulis ulang selesai_pada, tidak menghapus data sesi). */
    tutup: function () {
      var sesi = Sesi.baca();
      if (sesi) {
        sesi.selesai_pada = new Date().toISOString();
        Sesi.simpan(sesi);
      }
      return sesi;
    }
  };

  /* -----------------------------------------------------------------------
     4. PEMASANGAN UI — Lapisan 4
     Hanya mengisi slot [data-isi] dan toggle [hidden].
     ----------------------------------------------------------------------- */

  /* Bentuk data selalu { data: [...] } atau larik langsung — dibaca lewat
     satu pintu supaya berkas cacat tidak melempar di tengah render. Sama
     semangatnya dengan larik() di app.js (tidak dibagi lintas berkas karena
     app.js sengaja hanya membuka linimasaTerkini ke global — SDD §5.2). */
  function larikData(nilai) {
    if (Array.isArray(nilai)) return nilai;
    if (nilai && Array.isArray(nilai.data)) return nilai.data;
    return [];
  }

  /* Menyalakan sesi baru berdasarkan konteks halaman saat ini (SDD §3.3,
     §6.2). Dipanggil lazy begitu ketahuan belum ada sesi AKTIF — landing di
     latihan.html SECARA DESAIN adalah mulainya sesi (markup v1 tidak punya
     langkah "mulai sesi" terpisah). Sesi yang SUDAH ditutup (selesai_pada
     terisi, mis. peninggalan kunjungan sebelumnya ke latihan.html karena
     sessionStorage tidak dihapus di akhir sesi — SDD §6.3) dianggap basi dan
     TIDAK dipakai ulang, supaya jawaban sesi baru tidak menumpuk ke sesi
     lama yang sudah selesai.

     asal_mula (SDD §3.2 sesi_latihan.asal_mula) diturunkan dari query string
     ?mapel= yang dipasang pasangSaranBeranda() di runtime (SDD §6.4 poin 2):
     ada mapel -> 'beranda_saran'; datang dari arsip-detail.html (document.
     referrer) -> 'arsip_detail'; selainnya -> 'arsip'. URLSearchParams
     dibungkus try/catch mengikuti pola pasangMasuk() di app.js — tidak
     selalu tersedia (mis. saat diuji lewat vm Node tanpa DOM). */
  function mulaiSesiDariHalaman() {
    var mapelFokus = null;
    var asalMula = 'arsip';
    try {
      var params = new URLSearchParams(global.location.search);
      mapelFokus = params.get('mapel');
      if (mapelFokus) asalMula = 'beranda_saran';
    } catch (e) { /* URLSearchParams tidak ada / location tidak biasa (mis. saat diuji) */ }
    if (!mapelFokus && typeof document !== 'undefined' && document.referrer &&
        document.referrer.indexOf('arsip-detail') !== -1) {
      asalMula = 'arsip_detail';
    }
    return Sesi.mulai({ asal_mula: asalMula, mapel_fokus: mapelFokus || null, antrian: [] });
  }

  /* Mengembalikan sesi yang sedang aktif, atau memulai yang baru kalau
     belum ada / sesi sebelumnya sudah ditutup. Dipakai di ketiga titik
     masuk siklus hidup sesi (init pasangKeyakinan, listener kartu-baru,
     listener jawaban-dicatat) supaya aturan "sesi basi tidak dipakai ulang"
     konsisten di ketiganya. */
  function sesiAktifAtauBaru() {
    var sesi = Sesi.baca();
    if (!sesi || sesi.selesai_pada) sesi = mulaiSesiDariHalaman();
    return sesi;
  }

  /* Pasang input keyakinan (FL1) di latihan.html. */
  function pasangKeyakinan() {
    try {
      var chips = document.querySelectorAll('.levelin-confidence-chip');
      var arti = document.querySelector('.levelin-confidence-arti');
      var tombolLihat = document.querySelector('[data-aksi="lihat-jawaban"]');
      var petunjuk = document.querySelector('.levelin-confidence-hint');
      var section = document.querySelector('.levelin-confidence-section');

      if (!chips.length || !section) return;

      /* KOREKSI (laporan QA): sebelumnya baris ini early-return kalau sesi
         belum ada sama sekali, sehingga seluruh pencatatan kalibrasi tidak
         pernah menyala — Sesi.mulai() didefinisikan tapi tidak pernah
         benar-benar dipanggil. Landing di latihan.html SECARA DESAIN adalah
         mulainya sesi (tidak ada tombol "mulai sesi" terpisah di markup v1),
         jadi di sinilah sesi dinyalakan. */
      var sesi = sesiAktifAtauBaru();

      /* Dengarkan klik chip. */
      chips.forEach(function (chip) {
        chip.addEventListener('click', function () {
          try {
            var nilai = parseInt(chip.getAttribute('data-nilai'), 10);
            sesi = Sesi.baca() || sesi;
            sesi.keyakinan_kartu_ini = nilai;
            Sesi.simpan(sesi);

            /* Update aria-pressed. */
            chips.forEach(function (ch) {
              ch.setAttribute('aria-pressed', String(ch === chip));
            });

            /* Tampilkan arti yang cocok. */
            if (arti) {
              var pArti = arti.querySelector('[data-nilai="' + nilai + '"]');
              arti.querySelectorAll('[data-nilai]').forEach(function (p) {
                p.hidden = p !== pArti;
              });
              arti.hidden = false;
            }

            /* Lepas aria-disabled tombol "Lihat jawaban". */
            if (tombolLihat) {
              tombolLihat.removeAttribute('aria-disabled');
              if (petunjuk) petunjuk.hidden = true;
            }
          } catch (e) { console.error('levelin chip click:', e); }
        });

        /* Tangkap Enter untuk submit. */
        chip.addEventListener('keydown', function (ev) {
          if (ev.key === 'Enter' || ev.key === ' ') {
            ev.preventDefault();
            chip.click();
          }
        });
      });

      /* Dengarkan klik tombol "Lihat jawaban" — jika belum pilih keyakinan,
         tampilkan petunjuk. */
      if (tombolLihat) {
        tombolLihat.addEventListener('click', function (ev) {
          if (tombolLihat.getAttribute('aria-disabled') === 'true') {
            ev.preventDefault();
            if (petunjuk) petunjuk.hidden = false;
          }
        });
      }

      /* KONTRAK ui-engineer: dispatch event ini di window setiap kali kartu
         BERIKUTNYA ditampilkan dalam sesi yang sama (lihat kepala berkas
         ini). Tidak wajib membawa detail apa pun untuk v1. */
      window.addEventListener('levelin:kartu-baru', function () {
        try {
          var s = sesiAktifAtauBaru();
          s.keyakinan_kartu_ini = null;
          Sesi.simpan(s);

          chips.forEach(function (ch) {
            ch.setAttribute('aria-pressed', 'false');
          });
          if (arti) arti.hidden = true;
          if (tombolLihat) tombolLihat.setAttribute('aria-disabled', 'true');
          if (petunjuk) petunjuk.hidden = true;
        } catch (e) { console.error('levelin kartu-baru:', e); }
      });

    } catch (e) {
      console.error('pasangKeyakinan:', e);
    }
  }

  /* Mencatat pasangan (keyakinan, benar) ke localStorage begitu siswa
     menandai Benar/Salah (SDD §6.2 langkah 3). Lihat KONTRAK EVENT di kepala
     berkas ini untuk bentuk lengkap 'levelin:jawaban-dicatat'.

     Sengaja TIDAK bergantung pada elemen DOM apa pun (beda dengan pasangX
     lain) — satu-satunya masukannya adalah event kustom, supaya tetap
     berfungsi walau markup kartu latihan berubah bentuk (mis. saat antrian
     multi-kartu sungguhan dibangun). */
  function pasangPencatatanJawaban() {
    try {
      window.addEventListener('levelin:jawaban-dicatat', function (ev) {
        try {
          var detail = (ev && ev.detail) || {};
          var sesi = sesiAktifAtauBaru();

          var keyakinan = (detail.keyakinan !== undefined && detail.keyakinan !== null)
            ? detail.keyakinan
            : sesi.keyakinan_kartu_ini;

          /* Kontrak dilanggar pemanggil (belum ada keyakinan sama sekali,
             baik lewat detail maupun dari chip yang sudah diklik) — tidak
             mencatat data tak lengkap, tapi juga tidak melempar galat. */
          if (keyakinan === null || keyakinan === undefined) return;

          var benar = !!detail.benar;
          var kartuId = detail.kartu_id || null;
          var mapelId = detail.mapel_id || sesi.mapel_fokus || null;

          Kalibrasi.catat({
            sesi_id: sesi.sesi_id,
            kartu_id: kartuId,
            mapel_id: mapelId,
            keyakinan: keyakinan,
            benar: benar
          });

          if (!sesi.jawaban) sesi.jawaban = [];
          sesi.jawaban.push({ kartu_id: kartuId, mapel_id: mapelId, keyakinan: keyakinan, benar: benar });
          sesi.umpan_balik_tertunda = { keyakinan: keyakinan, benar: benar };
          sesi.keyakinan_kartu_ini = null;
          sesi.indeks = (sesi.indeks || 0) + 1;
          Sesi.simpan(sesi);
        } catch (e) {
          console.error('levelin jawaban-dicatat:', e);
        }
      });
    } catch (e) {
      console.error('pasangPencatatanJawaban:', e);
    }
  }

  /* Pasang strip pembanding gap (FL2) di latihan.html & latihan-selesai.html. */
  function pasangPembandingGap() {
    try {
      var strip = document.querySelector('.levelin-gap-strip');
      if (!strip) return;

      var sesi = Sesi.baca();
      if (!sesi || !sesi.umpan_balik_tertunda) {
        strip.hidden = true;
        return;
      }

      var umpan = sesi.umpan_balik_tertunda;
      var kelas = klasifikasiKartu(umpan.keyakinan, umpan.benar);
      if (!kelas) {
        strip.hidden = true;
        return;
      }

      strip.setAttribute('data-varian', kelas);
      strip.hidden = false;

      /* Tampilkan varian yang cocok. */
      var semua = strip.querySelectorAll('[data-varian-isi]');
      semua.forEach(function (p) {
        p.hidden = p.getAttribute('data-varian-isi') !== kelas;
      });

      /* Isi tingkat keyakinan — selalu tersedia dari umpan_balik_tertunda,
         untuk ketiga varian yang membawanya (overconfident/underconfident/
         selaras; varian netral tidak menyebut angka apa pun). */
      var slotTingkat = strip.querySelector('[data-varian-isi="' + kelas + '"] [data-isi$="-tingkat"]');
      if (slotTingkat) slotTingkat.textContent = String(umpan.keyakinan);

      /* Isi nama mapel — hanya varian overconfident yang membutuhkannya
         (salinan teks §4.8: "...pola kamu di [mapel]..."). mapel_id diambil
         dari jawaban TERAKHIR di sesi (umpan_balik_tertunda sengaja hanya
         menyimpan {keyakinan, benar} per SDD §3.3 — mapel_id-nya didapat
         dari sesi.jawaban, bukan menambah medan baru ke umpan_balik_tertunda). */
      if (kelas === 'overconfident') {
        var terakhir = (sesi.jawaban && sesi.jawaban.length) ? sesi.jawaban[sesi.jawaban.length - 1] : null;
        var slotMapel = strip.querySelector('[data-varian-isi="overconfident"] [data-isi="gap-oc-mapel"]');
        if (slotMapel && terakhir && terakhir.mapel_id) {
          if (global.LANJUT && typeof global.LANJUT.muatData === 'function') {
            global.LANJUT.muatData('mapel').then(function (berkas) {
              var nama = terakhir.mapel_id;
              larikData(berkas).forEach(function (m) {
                if (m && m.id === terakhir.mapel_id) nama = m.nama || nama;
              });
              slotMapel.textContent = nama;
            }, function () { slotMapel.textContent = terakhir.mapel_id; });
          } else {
            slotMapel.textContent = terakhir.mapel_id;
          }
        }
      }

    } catch (e) {
      console.error('pasangPembandingGap:', e);
    }
  }

  /* Pasang ringkasan kalibrasi akhir sesi (FL6) di latihan-selesai.html. */
  function pasangRingkasanSesi() {
    try {
      /* Menutup sesi (SDD §6.3: "antrian habis -> Sesi.tutup() -> pindah ke
         latihan-selesai.html"). Level-In v1 tidak memasang navigasi
         terprogram sendiri ke halaman ini (tombol Benar/Salah masih statis
         — lihat KONTRAK EVENT di kepala berkas), jadi DOMContentLoaded di
         halaman inilah penanda "sesi berakhir" yang dipakai. Aman dipanggil
         berkali-kali (mis. muat ulang halaman ini): hanya menulis ulang
         selesai_pada, TIDAK menghapus data sesi (SDD §6.3). */
      Sesi.tutup();

      var blokPenuh = document.querySelector('.levelin-summary-block[data-varian="penuh"]');
      var blokKosong = document.querySelector('.levelin-summary-block[data-varian="kosong"]');

      if (!blokPenuh || !blokKosong) return;

      var sesi = Sesi.baca();
      if (!sesi || !sesi.jawaban || sesi.jawaban.length === 0) {
        blokKosong.hidden = false;
        blokPenuh.hidden = true;
        return;
      }

      var ringkas = ringkasSesi(sesi.jawaban);

      /* Isi slot jumlah. */
      var slotOC = blokPenuh.querySelector('[data-isi="ringkasan-overconfident"]');
      var slotUC = blokPenuh.querySelector('[data-isi="ringkasan-underconfident"]');
      if (slotOC) slotOC.textContent = String(ringkas.overconfident);
      if (slotUC) slotUC.textContent = String(ringkas.underconfident);

      blokPenuh.hidden = false;
      blokKosong.hidden = true;

    } catch (e) {
      console.error('pasangRingkasanSesi:', e);
    }
  }

  /* Menghitung jumlah kartu tersedia per mapel dari data/arsip.json. Sama
     pola dengan hitungPerMapel() di app.js (tidak dibagi lintas berkas
     karena app.js sengaja tidak membuka fungsi privatnya — SDD §5.2). */
  function hitungKetersediaanPerMapel(berkasArsip) {
    var jumlah = {};
    larikData(berkasArsip).forEach(function (k) {
      if (!k || !k.mapel_id) return;
      jumlah[k.mapel_id] = (jumlah[k.mapel_id] || 0) + 1;
    });
    return jumlah;
  }

  /* Merender satu dari lima varian kartu CTA (SDD §6.1f, §6.4). Dipisah dari
     pasangSaranBeranda() supaya bisa dipanggil baik dari jalur data lengkap
     (arsip+mapel berhasil dimuat) maupun jalur cadangan (data gagal dimuat). */
  function renderSaranBeranda(ctaCard, saran, namaMapel) {
    ctaCard.setAttribute('data-jenis', saran.jenis);
    ctaCard.hidden = false;

    /* Tampilkan paragraf yang cocok. */
    var semuaP = ctaCard.querySelectorAll('[data-jenis-isi]');
    semuaP.forEach(function (p) {
      p.hidden = p.getAttribute('data-jenis-isi') !== saran.jenis;
    });

    /* Isi nama mapel untuk varian "saran" — nama TAMPILAN dari
       data/mapel.json (mis. "Matematika"), bukan id mentah ("matematika")
       yang sebelumnya langsung ditampilkan ke siswa (lihat laporan QA). */
    if (saran.jenis === 'saran' && saran.mapel_id) {
      var slotMapel = ctaCard.querySelector('[data-isi="cta-saran-mapel"]');
      if (slotMapel) {
        slotMapel.textContent = (namaMapel && namaMapel[saran.mapel_id]) || saran.mapel_id;
      }
    }

    /* Tampilkan tombol yang cocok. */
    var semuaTombol = ctaCard.querySelectorAll('[data-jenis-tombol]');
    semuaTombol.forEach(function (btn) {
      var jenisTombol = btn.getAttribute('data-jenis-tombol');
      btn.hidden = (saran.jenis === 'arsip_kosong')
        ? (jenisTombol !== 'arsip')
        : (jenisTombol !== 'mulai');
    });

    /* Pasang href runtime untuk mulai latihan dengan mapel terfokus. */
    if (saran.jenis === 'saran' && saran.mapel_id) {
      var tombolMulai = ctaCard.querySelector('[data-jenis-tombol="mulai"]');
      if (tombolMulai && !tombolMulai.hidden) {
        tombolMulai.href = 'latihan.html?mapel=' + encodeURIComponent(saran.mapel_id);
      }
    }
  }

  /* Pasang kartu CTA saran latihan harian (FL4) di beranda.html. */
  function pasangSaranBeranda() {
    try {
      var ctaCard = document.querySelector('.levelin-cta-card');
      if (!ctaCard) return;

      var riwayat = Kalibrasi.baca();

      /* KOREKSI (laporan QA): sebelumnya `ketersediaan` selalu dibiarkan {}
         (blok kosong berkomentar "belum ada penyambungan penuh ke arsip di
         v1"), sehingga saranHarian() SELALU jatuh ke fallback 'arsip_kosong'
         apa pun isi riwayatnya. Sekarang benar-benar memuat data/arsip.json
         (ketersediaan kartu) dan data/mapel.json (nama tampilan + daftar id
         mapel yang diketahui, dipakai agregatPerMapel() supaya mapel tanpa
         peristiwa pun tetap tampil sebagai 'belum_cukup_data' — SDD §6.1c). */
      if (!(global.LANJUT && typeof global.LANJUT.muatData === 'function')) {
        renderSaranBeranda(ctaCard, saranHarian(agregatPerMapel(riwayat.peristiwa || []), {}), {});
        return;
      }

      Promise.all([global.LANJUT.muatData('arsip'), global.LANJUT.muatData('mapel')]).then(function (hasil) {
        var ketersediaan = hitungKetersediaanPerMapel(hasil[0]);
        var daftarMapel = larikData(hasil[1]);
        var semuaMapelId = daftarMapel.map(function (m) { return m && m.id; }).filter(function (v) { return !!v; });
        var namaMapel = {};
        daftarMapel.forEach(function (m) { if (m && m.id) namaMapel[m.id] = m.nama || m.id; });

        var agregat = agregatPerMapel(riwayat.peristiwa || [], null, semuaMapelId);
        var saran = saranHarian(agregat, ketersediaan);

        renderSaranBeranda(ctaCard, saran, namaMapel);
      }, function () {
        /* data/arsip.json atau data/mapel.json gagal dimuat -> tetap
           tampilkan CTA lewat fallback teraman ('pengguna_baru'): tidak
           menjanjikan sesi yang mungkin tidak ada kartunya. */
        renderSaranBeranda(ctaCard, { jenis: 'pengguna_baru', mapel_id: null }, {});
      });

    } catch (e) {
      console.error('pasangSaranBeranda:', e);
    }
  }

  /* Inisialisasi (dipanggil saat halaman siap). */
  function init() {
    muatKonfig();

    /* KONTRAK ui-engineer (opsional, lihat kepala berkas): menutup sesi dari
       halaman mana pun tanpa efek render lain. */
    try {
      window.addEventListener('levelin:sesi-selesai', function () {
        try { Sesi.tutup(); } catch (e) { /* diam — lihat Sesi.tutup() */ }
      });
    } catch (e) { /* addEventListener tidak tersedia di lingkungan ini */ }

    function lanjutkan() {
      var peran = document.body.getAttribute('data-peran');
      if (peran === 'latihan') {
        pasangKeyakinan();
        pasangPembandingGap();
        pasangPencatatanJawaban();
      } else if (peran === 'latihan-selesai') {
        pasangRingkasanSesi();
        pasangPembandingGap();
      } else if (peran === 'beranda') {
        pasangSaranBeranda();
      }
    }

    /* Tunggu konfigurasi selesai dimuat (atau gagal — tetap lanjut dengan
       KONFIG_BAWAAN) sebelum merender, supaya ambang yang dipakai pada
       render pertama sudah nilai final dari data/levelin-konfig.json, bukan
       cadangan bawaan yang mungkin sudah usang. */
    if (konfigPromise && typeof konfigPromise.then === 'function') {
      konfigPromise.then(lanjutkan, lanjutkan);
    } else {
      lanjutkan();
    }
  }

  /* Tunggu DOM siap. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* -----------------------------------------------------------------------
     EKSPOR GLOBAL (Lapisan 2 — keputusan murni — plus gabungKonfigPerKunci,
     lihat catatan penyimpangan di definisinya)
     ----------------------------------------------------------------------- */
  global.LANJUT_LEVELIN = {
    gapNumerik: gapNumerik,
    klasifikasiKartu: klasifikasiKartu,
    agregatPerMapel: agregatPerMapel,
    ringkasSesi: ringkasSesi,
    saranHarian: saranHarian,
    gabungKonfigPerKunci: gabungKonfigPerKunci,
    KUNCI_RIWAYAT: KUNCI_RIWAYAT,
    KUNCI_SESI: KUNCI_SESI,
    KONFIG_BAWAAN: KONFIG_BAWAAN
  };

})(window);
