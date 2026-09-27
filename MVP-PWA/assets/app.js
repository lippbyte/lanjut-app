/* =========================================================================
   APP.JS — perekat kerangka LANJUT PWA
   =========================================================================
   Berkas ini SENGAJA kecil. Di tahap kerangka, tugasnya cuma tiga:

     1. menyimpan & membaca profil pengguna di localStorage
     2. mengalihkan splash ke onboarding atau beranda
     3. menyalakan langkah onboarding dan menulis jawabannya ke profil

   Logika fitur (F1 Linimasa, F3 Penolong Pilih Mapel, F5 Daftar Periksa,
   F6 Arsip, F7 Latihan) BELUM ada di sini. Halaman masih memakai isi contoh
   yang ditulis langsung di HTML; berkas di /data/*.json sudah disiapkan
   supaya nanti tinggal disambungkan lewat LANJUT.muatData().

   Tidak ada kerangka kerja luar. JavaScript murni, satu berkas, dipanggil
   dengan `defer` dari semua halaman.
   ========================================================================= */
(function (global) {
  'use strict';

  /* -----------------------------------------------------------------------
     KUNCI PENYIMPANAN
     Diberi akhiran versi supaya kalau bentuk objeknya berubah nanti, data
     lama tidak dibaca sebagai data baru dan bikin galat diam-diam.
     ----------------------------------------------------------------------- */
  var KUNCI_PROFIL = 'lanjut.profil.v1';

  /* Kemajuan Daftar Periksa (F5). Peta datar { butir_id: true }: butir yang
     dicentang ada sebagai kunci bernilai true, butir yang tidak dicentang
     TIDAK muncul sama sekali (dihapus, bukan disetel false) — supaya ukuran
     objeknya tidak tumbuh mengikuti jumlah butir yang tidak pernah disentuh
     pengguna. Diberi akhiran versi dengan alasan yang sama seperti
     KUNCI_PROFIL. */
  var KUNCI_CHECKLIST = 'lanjut.checklist.progres.v1';

  /* Butir Daftar Periksa yang DITAMBAHKAN pengguna sendiri (mis. lewat
     "Simpan ke Daftar Periksa" di Penolong Pilih Mapel), terpisah dari
     data/checklist.json karena berkas itu milik tim (§13: butir_daftar_periksa
     berasal dari data resmi/mockup), bukan tempat menulis butir bikinan
     runtime. Larik objek { id, kategori, teks, berlaku_untuk_kelas }. */
  var KUNCI_CHECKLIST_TAMBAHAN = 'lanjut.checklist.tambahan.v1';

  /* Kartu Arsip Belajar yang DITAMBAHKAN pengguna sendiri (lewat formulir
     di arsip-tambah.html), terpisah dari data/arsip.json (kurasi resmi tim).
     Larik objek { id, pemilik_id: 'pengguna', mapel_id, kategori, judul, isi,
     jawaban, sumber: 'buatan_sendiri', dibuat_pada }. */
  var KUNCI_ARSIP_TAMBAHAN = 'lanjut.arsip.tambahan.v1';

  /* Halaman yang dituju setelah splash, tergantung profil sudah ada belum. */
  var HAL_ONBOARDING = 'onboarding.html';
  var HAL_BERANDA = 'beranda.html';

  /* Lama splash tampil sebelum berpindah sendiri (SDD §14 alur A). */
  var JEDA_SPLASH = 1600;

  /* -----------------------------------------------------------------------
     PROFIL PENGGUNA
     -----------------------------------------------------------------------
     Bentuk objeknya:

       {
         kelas:        "10" | "11" | "12",
         prodi_impian: "<id prodi>" | "belum",
         dibuat_pada:  "2026-08-20T04:12:33.000Z"
       }

     Catatan model data: PRD/SDD §13 menamai kolom ini `prodi_tujuan` pada
     entitas `pengguna`. Di klien namanya `prodi_impian` sesuai permintaan.
     Saat lapisan API dibuat, petakan prodi_impian -> prodi_tujuan di satu
     tempat saja (fungsi kirim), jangan ganti nama di seluruh halaman.

     `prodi_impian` boleh bernilai "belum" — dan itu bukan keadaan rusak.
     PRD F3 mewajibkan jawaban "belum tahu" tetap menghasilkan keluaran
     berguna, jadi jangan pernah memaksa nilai ini terisi id prodi.
     ----------------------------------------------------------------------- */
  var Profil = {
    /* Membaca profil. Mengembalikan null kalau belum ada atau isinya rusak.
       Dibungkus try/catch karena localStorage bisa dimatikan browser
       (mode penyamaran, izin ditolak) — halaman tetap harus jalan. */
    baca: function () {
      try {
        var mentah = global.localStorage.getItem(KUNCI_PROFIL);
        if (!mentah) return null;
        var objek = JSON.parse(mentah);
        if (!objek || typeof objek !== 'object') return null;
        return objek;
      } catch (e) {
        return null;
      }
    },

    /* Menulis profil. Menerima objek sebagian, digabung dengan yang lama,
       supaya halaman lain bisa menambah kolom tanpa menghapus kolom orang. */
    simpan: function (sebagian) {
      var lama = Profil.baca() || {};
      var baru = {
        kelas: sebagian.kelas !== undefined ? sebagian.kelas : lama.kelas || null,
        prodi_impian: sebagian.prodi_impian !== undefined
          ? sebagian.prodi_impian
          : lama.prodi_impian || null,
        dibuat_pada: lama.dibuat_pada || new Date().toISOString()
      };
      try {
        global.localStorage.setItem(KUNCI_PROFIL, JSON.stringify(baru));
      } catch (e) {
        /* Penyimpanan penuh atau ditolak. Tidak fatal: sesi ini tetap jalan,
           cuma pilihannya tidak terbawa ke sesi berikutnya. */
      }
      return baru;
    },

    hapus: function () {
      try { global.localStorage.removeItem(KUNCI_PROFIL); } catch (e) {}
    },

    /* Sudah lengkap kalau kelas terisi DAN prodi_impian sudah dijawab —
       termasuk kalau jawabannya "belum". */
    lengkap: function () {
      var p = Profil.baca();
      return !!(p && p.kelas && p.prodi_impian);
    }
  };

  /* -----------------------------------------------------------------------
     KEMAJUAN DAFTAR PERIKSA (F5)
     -----------------------------------------------------------------------
     PRD F5: "Kemajuan bertahan setelah aplikasi ditutup." Sengaja dipisah
     dari objek Profil karena bentuk datanya beda (peta id -> boolean, bukan
     objek profil tunggal) dan pemiliknya beda entitas (§13: `kemajuan`,
     bukan `pengguna`). Dibungkus try/catch dengan alasan yang sama seperti
     Profil.baca/simpan — localStorage bisa dimatikan browser, halaman tetap
     harus jalan walau kemajuannya tidak tersimpan sama sekali. */
  var ChecklistProgres = {
    baca: function () {
      try {
        var mentah = global.localStorage.getItem(KUNCI_CHECKLIST);
        if (!mentah) return {};
        var objek = JSON.parse(mentah);
        return (objek && typeof objek === 'object' && !Array.isArray(objek)) ? objek : {};
      } catch (e) {
        return {};
      }
    },
    simpan: function (peta) {
      try {
        global.localStorage.setItem(KUNCI_CHECKLIST, JSON.stringify(peta || {}));
      } catch (e) { /* penyimpanan penuh/ditolak — sesi ini tetap jalan */ }
    },
    /* Menandai satu butir selesai/belum, membaca-ubah-simpan dalam satu
       langkah supaya pemanggil (pilih-mapel.html, checklist.html) tidak
       perlu tahu bentuk penyimpanannya. */
    tandai: function (butirId, selesai) {
      if (!butirId) return;
      var peta = ChecklistProgres.baca();
      if (selesai) peta[butirId] = true; else delete peta[butirId];
      ChecklistProgres.simpan(peta);
      return peta;
    }
  };

  /* -----------------------------------------------------------------------
     BUTIR DAFTAR PERIKSA TAMBAHAN (dibuat pengguna sendiri)
     -----------------------------------------------------------------------
     Dipakai oleh "Simpan ke Daftar Periksa" di Penolong Pilih Mapel: hasil
     eksplorasi prodi (nama prodi + 2 saran mapel TKA) BUKAN sekadar mencentang
     butir generik yang sudah ada, melainkan butir baru yang menyebut prodi
     dan mapel yang bersangkutan secara eksplisit — supaya isi Daftar Periksa
     mencerminkan pilihan pengguna, bukan kalimat umum yang sama untuk semua
     orang. Disimpan terpisah dari ChecklistProgres (peta centang) karena
     bentuknya beda: ini daftar BUTIR (dengan teksnya sendiri), bukan status
     centang atas butir yang sudah ada. */
  var ChecklistTambahan = {
    baca: function () {
      try {
        var mentah = global.localStorage.getItem(KUNCI_CHECKLIST_TAMBAHAN);
        if (!mentah) return [];
        var larik = JSON.parse(mentah);
        return Array.isArray(larik) ? larik : [];
      } catch (e) {
        return [];
      }
    },
    simpan: function (daftar) {
      try {
        global.localStorage.setItem(KUNCI_CHECKLIST_TAMBAHAN, JSON.stringify(daftar || []));
      } catch (e) { /* penyimpanan penuh/ditolak — sesi ini tetap jalan */ }
    },
    /* Menambah satu butir baru, atau MENIMPA butir lama berid sama (mis.
       pengguna menekan "Simpan" dua kali untuk prodi yang sama) supaya
       Daftar Periksa tidak menumpuk baris kembar. */
    tambah: function (butir) {
      if (!butir || !butir.id) return;
      var daftar = ChecklistTambahan.baca().filter(function (b) { return b.id !== butir.id; });
      daftar.push(butir);
      ChecklistTambahan.simpan(daftar);
      return daftar;
    }
  };

  /* -----------------------------------------------------------------------
     KARTU ARSIP BELAJAR TAMBAHAN (dibuat pengguna sendiri)
     -----------------------------------------------------------------------
     Dipakai oleh "Simpan kartu" di Tambah Kartu Baru (arsip-tambah.html).
     Kartu ini bertanda sumber: "buatan_sendiri" (PRD F6) dan disimpan di
     localStorage terpisah dari data/arsip.json. */
  var ArsipTambahan = {
    baca: function () {
      try {
        var mentah = global.localStorage.getItem(KUNCI_ARSIP_TAMBAHAN);
        if (!mentah) return [];
        var larik = JSON.parse(mentah);
        return Array.isArray(larik) ? larik : [];
      } catch (e) {
        return [];
      }
    },
    simpan: function (daftar) {
      try {
        global.localStorage.setItem(KUNCI_ARSIP_TAMBAHAN, JSON.stringify(daftar || []));
      } catch (e) { /* penyimpanan penuh/ditolak — sesi ini tetap jalan */ }
    },
    tambah: function (kartu) {
      if (!kartu || !kartu.id) return;
      var daftar = ArsipTambahan.baca().filter(function (k) { return k.id !== kartu.id; });
      daftar.push(kartu);
      ArsipTambahan.simpan(daftar);
      return daftar;
    }
  };

  /* -----------------------------------------------------------------------
     PEMUAT DATA
     Belum dipakai halaman mana pun; disiapkan supaya penyambungan nanti
     tidak perlu menulis fetch di tiap halaman.

     PERHATIAN: fetch tidak jalan lewat protokol file://. Buka lewat server
     lokal (lihat README aplikasi).
     ----------------------------------------------------------------------- */
  var singgahan = {};

  function muatData(nama) {
    if (singgahan[nama]) return singgahan[nama];
    singgahan[nama] = fetch('data/' + nama + '.json')
      .then(function (r) {
        if (!r.ok) throw new Error('Gagal memuat data/' + nama + '.json');
        return r.json();
      })
      .catch(function (e) {
        delete singgahan[nama];
        throw e;
      });
    return singgahan[nama];
  }

  /* -----------------------------------------------------------------------
     LINIMASA — turunan status & tenggat terdekat
     -----------------------------------------------------------------------
     Murni dan sinkron: tanpa DOM, tanpa fetch, tanpa membaca jam. `hariIni`
     WAJIB diberikan pemanggil — kalau fungsi ini memanggil new Date() sendiri,
     tesnya ikut berubah tiap hari dan bugnya baru ketahuan tahun depan.

     Penanda "belum diverifikasi" DITURUNKAN dari data (diperiksa_pada === null),
     bukan diwarisi dari markup contoh. PRD F1 melarang menampilkan tanggal yang
     belum dicek ke laman resmi tanpa penanda, jadi penanda itu tidak boleh
     bergantung pada apa yang kebetulan tertulis di HTML.
     ----------------------------------------------------------------------- */
  function linimasaTerkini(dataLinimasa, hariIni) {
    var batas = keHari(hariIni);
    var butir = larik(dataLinimasa).map(function (t) {
      return {
        id: t.id,
        judul: t.judul,
        jalur: t.jalur,
        tanggal_mulai: t.tanggal_mulai,
        tanggal_selesai: t.tanggal_selesai,
        /* diperiksa_pada masih null di seluruh berkas data hari ini. */
        verifikasi: t.diperiksa_pada === null ? 'belum' : null,
        /* Dibawa apa adanya (bukan diturunkan) supaya lapisan render bisa
           menampilkan tanggal pengecekan sungguhan begitu datanya terisi,
           tanpa perlu mengarang tanggal di app.js. */
        diperiksa_pada: t.diperiksa_pada,
        status: 'idle'
      };
    });

    /* Tahapan yang sudah lewat ditandai, tidak dihapus (PRD F1), dan tidak
       pernah ikut jadi kandidat tenggat terdekat. */
    var kandidat = null;
    butir.forEach(function (b) {
      var selesai = uraiTanggal(b.tanggal_selesai);
      if (isNaN(selesai) || isNaN(batas)) return;
      if (selesai < batas) { b.status = 'done'; return; }
      if (!kandidat || selesai < uraiTanggal(kandidat.tanggal_selesai)) kandidat = b;
    });
    if (kandidat) kandidat.status = 'soon';

    return {
      butir: butir,
      terdekat: kandidat,
      /* Tidak ada tahapan mendatang -> null, bukan angka negatif. */
      sisaHari: kandidat ? hitungSisaHari(batas, kandidat.tanggal_selesai) : null
    };
  }

  /* -----------------------------------------------------------------------
     PEMBANTU RENDER
     -----------------------------------------------------------------------
     Aturan yang dipegang seluruh lapisan render di bawah ini:

       1. JS tidak pernah mengarang kalimat. Yang boleh dihasilkan JS hanya
          angka, tanggal (lewat Intl id-ID), dan pengalihan hidden/atribut.
          Seluruh kata tetap tinggal di HTML — itu juga yang membuat gerbang
          teks (tools/test-desain.js) masih bisa melihatnya.
       2. Menulis isi hanya lewat textContent. Merakit markup dari teks —
          apa pun nama jalannya — tidak dipakai di berkas ini, sekalipun
          untuk mengosongkan wadah. Isi berkas data bisa berubah menjadi
          kiriman pengguna (cerita alumni, kartu arsip) tanpa satu baris pun
          di sini ikut ditinjau ulang, jadi larangannya mutlak, bukan
          menunggu ada data yang berbahaya dulu.
       3. Anak elemen hanya boleh diganti pada wadah bertanda [data-daftar],
          lewat satu replaceChildren. Isi contoh di luar wadah itu tidak
          pernah disentuh — itulah yang menjaga isi cadangan file:// dan
          kalimat wajib tetap utuh.
     ----------------------------------------------------------------------- */

  /* Isi berkas data selalu berbentuk { data: [...] } atau { kategori: [...] };
     dibaca lewat satu pintu supaya berkas cacat tidak melempar di tengah render. */
  function larik(nilai) {
    if (Array.isArray(nilai)) return nilai;
    if (nilai && Array.isArray(nilai.data)) return nilai.data;
    return [];
  }

  /* Anak pertama sebuah wadah [data-daftar] adalah contoh hidup: ia sekaligus
     isi cadangan tanpa JS dan cetakan untuk baris berikutnya. Klon WAJIB
     diambil sinkron, sebelum fetch — sesudah wadah diganti, contohnya hilang. */
  function ambilPrototipe(wadah) {
    if (!wadah || !wadah.firstElementChild) return null;
    return wadah.firstElementChild.cloneNode(true);
  }

  /* Mengisi satu slot [data-isi="nama"] di dalam akar. Mengembalikan slotnya
     supaya pemanggil bisa menyetel atribut lain kalau perlu. */
  function isiSlot(akar, nama, teks) {
    if (!akar) return null;
    var slot = akar.querySelector('[data-isi="' + nama + '"]');
    if (slot) slot.textContent = teks === null || teks === undefined ? '' : String(teks);
    return slot;
  }

  /* Blok keadaan (kosong, galat, dan varian di dalam baris) mulai hidden di
     HTML; yang berubah hanya atributnya, tidak pernah isinya. */
  function pasangKeadaan(akar, nama, tampil) {
    var blok = (akar || document).querySelector('[data-keadaan="' + nama + '"]');
    if (blok) blok.hidden = tampil === false;
    return blok;
  }

  /* Satu-satunya titik penghapusan anak di seluruh berkas ini. */
  function gantiIsi(wadah, simpul) {
    if (!wadah) return;
    var kantong = document.createDocumentFragment();
    simpul.forEach(function (el) { kantong.appendChild(el); });
    wadah.replaceChildren(kantong);
  }

  /* Menggabungkan beberapa nilai data dengan titik tengah. Bukan kalimat
     baru — hanya tanda baca; nilai kosong dilewati supaya tidak ada pemisah
     yatim di layar. */
  function gabung(bagian) {
    return bagian.filter(function (t) { return t; }).join(' · ');
  }

  /* Tanggal di data selalu "YYYY-MM-DD". Diurai sebagai hari UTC supaya
     hasilnya sama di zona waktu mana pun — selisih hari tidak boleh berubah
     hanya karena jam berapa halaman dibuka. */
  function uraiTanggal(iso) {
    if (typeof iso !== 'string') return NaN;
    var p = iso.slice(0, 10).split('-');
    if (p.length !== 3) return NaN;
    return Date.UTC(Number(p[0]), Number(p[1]) - 1, Number(p[2]));
  }

  /* Menerima Date maupun "YYYY-MM-DD". Sengaja tidak memakai instanceof:
     tes menjalankan berkas ini di dalam vm, jadi Date-nya beda realm. */
  function keHari(nilai) {
    if (typeof nilai === 'number') return nilai;
    if (nilai && typeof nilai.getUTCFullYear === 'function') {
      return Date.UTC(nilai.getUTCFullYear(), nilai.getUTCMonth(), nilai.getUTCDate());
    }
    return uraiTanggal(nilai);
  }

  function tanggalTeks(ms, opsi) {
    opsi.timeZone = 'UTC';
    try {
      return new Intl.DateTimeFormat('id-ID', opsi).format(new Date(ms));
    } catch (e) {
      return '';
    }
  }

  function formatTanggal(iso) {
    var t = uraiTanggal(iso);
    return isNaN(t) ? '' : tanggalTeks(t, { day: 'numeric', month: 'long', year: 'numeric' });
  }

  /* Rentang tanggal, sependek mungkin tanpa kehilangan kejelasan:
     "1 – 31 Juli 2026", "1 Oktober – 30 November 2026". */
  function formatRentang(mulai, selesai) {
    var a = uraiTanggal(mulai);
    var b = uraiTanggal(selesai);
    if (isNaN(a)) return isNaN(b) ? '' : formatTanggal(selesai);
    if (isNaN(b)) return formatTanggal(mulai);
    var da = new Date(a);
    var db = new Date(b);
    if (da.getUTCFullYear() === db.getUTCFullYear() && da.getUTCMonth() === db.getUTCMonth()) {
      return tanggalTeks(a, { day: 'numeric' }) + ' – ' + formatTanggal(selesai);
    }
    if (da.getUTCFullYear() === db.getUTCFullYear()) {
      return tanggalTeks(a, { day: 'numeric', month: 'long' }) + ' – ' + formatTanggal(selesai);
    }
    return formatTanggal(mulai) + ' – ' + formatTanggal(selesai);
  }

  /* Ribuan dengan titik sebagai pemisah (mis. 5582 -> "5.582"). Murni dan
     sinkron — dibuka lewat global.LANJUT (SDD F10 §E.4) supaya bisa diuji
     tools/test-app.js tanpa DOM. Bilangan bukan angka -> string kosong,
     bukan "NaN" yang bisa lolos ke layar. */
  function angkaRibuan(n) {
    if (typeof n !== 'number' || isNaN(n)) return '';
    var negatif = n < 0;
    var digit = String(Math.round(Math.abs(n)));
    var hasil = '';
    for (var i = 0; i < digit.length; i++) {
      if (i > 0 && (digit.length - i) % 3 === 0) hasil += '.';
      hasil += digit.charAt(i);
    }
    return (negatif ? '-' : '') + hasil;
  }

  /* Rasio keketatan = diterima / peminat.jumlah x 100, satu angka desimal,
     koma sebagai pemisah desimal (SDD F10 §E.4). diterima null ATAU
     peminatJumlah kosong/0 -> tanda pisah "—", TIDAK PERNAH "0" atau string
     kosong — angka 0% terbaca seolah tidak ada yang diterima sama sekali,
     padahal artinya datanya belum tersedia. */
  function rasioKeketatan(diterima, peminatJumlah) {
    if (diterima === null || diterima === undefined || !peminatJumlah) return '—';
    var persen = (diterima / peminatJumlah) * 100;
    var satuDesimal = (Math.round(persen * 10) / 10).toFixed(1);
    return satuDesimal.replace('.', ',') + '%';
  }

  /* Selisih hari penuh. null kalau salah satu tanggalnya tidak terbaca. */
  function hitungSisaHari(dari, ke) {
    var a = keHari(dari);
    var b = keHari(ke);
    if (isNaN(a) || isNaN(b)) return null;
    return Math.round((b - a) / 86400000);
  }

  /* Hari ini menurut kalender pembaca, dinormalkan ke tengah malam UTC.
     Satu-satunya tempat jam dibaca di lapisan render. */
  function hariIniLokal() {
    var kini = new Date();
    return new Date(Date.UTC(kini.getFullYear(), kini.getMonth(), kini.getDate()));
  }

  /* Kegagalan memuat data: markup statis dibiarkan apa adanya, cukup blok
     galat yang sudah tertulis di halaman dimunculkan. */
  function tampilkanGalat() {
    pasangKeadaan(document, 'galat', true);
  }

  /* -----------------------------------------------------------------------
     SPLASH
     Dipasang lewat <body data-peran="splash">. Layar bisa diketuk untuk
     melompat lebih awal — tidak ada yang suka menunggu splash.
     ----------------------------------------------------------------------- */
  function pasangSplash() {
    var tujuan = Profil.lengkap() ? HAL_BERANDA : HAL_ONBOARDING;
    var sudah = false;

    function pergi() {
      if (sudah) return;
      sudah = true;
      global.location.replace(tujuan);
    }

    var timer = global.setTimeout(pergi, JEDA_SPLASH);
    document.addEventListener('click', function () {
      global.clearTimeout(timer);
      pergi();
    });

    /* Tautan cadangan di dalam <noscript> tetap ada di HTML, jadi halaman
       ini tidak pernah menjadi jalan buntu kalau JS mati. */
  }

  /* -----------------------------------------------------------------------
     ONBOARDING
     Empat layar cerita, lalu satu layar pertanyaan. Semua layar ada di satu
     dokumen; yang tidak aktif disembunyikan dengan atribut [hidden] supaya
     pembaca layar juga ikut melewatinya.
     ----------------------------------------------------------------------- */
  function pasangOnboarding() {
    var slides = [].slice.call(document.querySelectorAll('[data-slide]'));
    var titik = [].slice.call(document.querySelectorAll('.langkah-titik span'));
    var tombolLanjut = document.querySelector('[data-aksi="lanjut"]');
    var layarTanya = document.querySelector('[data-slide="tanya"]');
    var indeks = 0;

    function tampilkan(i) {
      indeks = i;
      slides.forEach(function (el, n) { el.hidden = n !== i; });
      titik.forEach(function (el, n) {
        el.setAttribute('data-aktif', String(n === i));
      });
      /* Titik langkah hanya untuk empat layar cerita, bukan layar tanya. */
      var diCerita = i < titik.length;
      var appContainer = document.querySelector('.app');
      if (appContainer) {
        if (!diCerita) {
          appContainer.setAttribute('data-mode', 'tanya');
        } else {
          appContainer.removeAttribute('data-mode');
        }
      }
      var wadahTitik = document.querySelector('.langkah-titik');
      if (wadahTitik) wadahTitik.hidden = !diCerita;
      if (tombolLanjut) {
        tombolLanjut.hidden = !diCerita;
        tombolLanjut.textContent = i < titik.length - 1 ? 'Lanjut' : 'Mulai';
      }
      var lewati = document.querySelector('[data-aksi="lewati"]');
      if (lewati) lewati.hidden = !diCerita;
    }

    if (tombolLanjut) {
      tombolLanjut.addEventListener('click', function () {
        tampilkan(Math.min(indeks + 1, slides.length - 1));
      });
    }

    var lewati = document.querySelector('[data-aksi="lewati"]');
    if (lewati && layarTanya) {
      lewati.addEventListener('click', function () {
        tampilkan(slides.indexOf(layarTanya));
      });
    }

    /* --- Keping kelas & prodi: satu terpilih, sisanya lepas ------------- */
    function pasangKeping(namaGrup, saatPilih) {
      document.addEventListener('click', function (ev) {
        var el = ev.target;
        if (!el.classList.contains('keping') || el.getAttribute('data-grup') !== namaGrup) {
          return;
        }
        /* Clear SEMUA chips di grup ini, termasuk yang di luar scope sempat di-query sebelumnya */
        var semuaChips = document.querySelectorAll('[data-grup="' + namaGrup + '"]');
        semuaChips.forEach(function (chip) {
          chip.setAttribute('aria-pressed', 'false');
        });
        /* Set hanya yang diklik jadi true */
        el.setAttribute('aria-pressed', 'true');
        saatPilih(el.getAttribute('data-nilai'));
      });
    }

    var profilLama = Profil.baca();
    var pilihan = {
      kelas: (profilLama && profilLama.kelas) || null,
      prodi_impian: (profilLama && profilLama.prodi_impian) || null
    };

    /* Pre-select keping jika sudah ada nilai tersimpan di profil */
    if (pilihan.kelas) {
      var kepingKelas = [].slice.call(document.querySelectorAll('[data-grup="kelas"]'));
      kepingKelas.forEach(function (el) {
        el.setAttribute('aria-pressed', String(el.getAttribute('data-nilai') === pilihan.kelas));
      });
    }
    if (pilihan.prodi_impian) {
      var kepingProdi = [].slice.call(document.querySelectorAll('[data-grup="prodi"]'));
      kepingProdi.forEach(function (el) {
        el.setAttribute('aria-pressed', String(el.getAttribute('data-nilai') === pilihan.prodi_impian));
      });
    }

    pasangKeping('kelas', function (nilai) { pilihan.kelas = nilai; });
    pasangKeping('prodi', function (nilai) { pilihan.prodi_impian = nilai; });

    /* --- Simpan & masuk ------------------------------------------------- */
    var tombolMulai = document.querySelector('[data-aksi="simpan-profil"]');
    if (tombolMulai) {
      tombolMulai.addEventListener('click', function (ev) {
        ev.preventDefault();
        Profil.simpan({
          /* Kelas 12 adalah pengguna utama (PRD §4 P1); dipakai sebagai
             nilai bawaan kalau pengguna melewati pertanyaan ini. */
          kelas: pilihan.kelas || '12',
          /* "belum" adalah jawaban sah, bukan kekosongan. */
          prodi_impian: pilihan.prodi_impian || 'belum'
        });
        global.location.href = HAL_BERANDA;
      });
    }

    /* Pengguna yang SUDAH punya profil (membuka lewat ikon profil header atau
       ubah profil) langsung menuju layar pertanyaan tanpa menonton ulang 4
       slide cerita pembuka. Pengguna baru (belum lengkap) mulai dari slide 0. */
    if (Profil.lengkap() && layarTanya) {
      tampilkan(slides.indexOf(layarTanya));
    } else {
      tampilkan(0);
    }
  }

  /* -----------------------------------------------------------------------
     PILIH MAPEL — F3, Penolong Pilih Mapel
     -----------------------------------------------------------------------
     Tiga langkah, satu yang aktif setiap saat (ditandai [data-langkah],
     dikendalikan lewat atribut hidden — pola yang sama dengan slide
     onboarding):

       masuk   — "sudah tahu prodi?" / "belum, bantu eksplorasi" (dua tombol
                 pintu masuk; keduanya menuju daftar prodi yang sama, karena
                 data yang tersedia baru mengelompokkan prodi per rumpun,
                 belum per minat — lihat catatan ke PM di laporan tugas)
       daftar  — daftar prodi dikelompokkan per rumpun (data/prodi.json),
                 diklon dari prototipe ganda (rumpun -> prodi), sama seperti
                 pola kategori -> butir di pasangChecklist()
       hasil   — mapel pendukung + status ketersediaan di SMK
                 (data/prodi-mapel.json x data/mapel.json) untuk SATU prodi,
                 atau rangkuman umum kalau pengguna menjawab "belum tahu"

     Aturan lama "kalau profil sudah punya prodi_impian, lompat langsung ke
     langkah hasil" dipenuhi lewat cek profil di awal fungsi. Jawaban "belum"
     tidak dianggap sebagai prodi yang sudah dipilih (F3: "belum tahu prodi"
     bukan kekosongan) — pengguna tetap disambut langkah "masuk" supaya bisa
     memilih prodi kapan pun ia sudah lebih yakin.
     ----------------------------------------------------------------------- */
  function pasangPilihMapel() {
    var profil = Profil.baca();

    var wadahProfil = document.querySelector('[data-profil-tersimpan]');
    var langkahMasuk = document.querySelector('[data-langkah="masuk"]');
    var langkahDaftar = document.querySelector('[data-langkah="daftar"]');
    var langkahHasil = document.querySelector('[data-langkah="hasil"]');
    var wadahRumpun = document.querySelector('[data-daftar="rumpun"]');
    var protoRumpun = ambilPrototipe(wadahRumpun);
    var protoProdi = protoRumpun ? ambilPrototipe(protoRumpun.querySelector('[data-daftar="prodi"]')) : null;
    var wadahMapel = document.querySelector('[data-daftar="mapel"]');
    var protoMapel = ambilPrototipe(wadahMapel);

    /* Kartu "dari jawaban kamu sebelumnya" — murni informatif, independen
       dari langkah mana yang sedang tampil. */
    if (wadahProfil) {
      if (profil && profil.prodi_impian) {
        wadahProfil.hidden = false;
        isiSlot(wadahProfil, 'kelas', profil.kelas || '—');
        isiSlot(wadahProfil, 'prodi', profil.prodi_impian === 'belum' ? 'belum ditentukan' : profil.prodi_impian);
      } else {
        wadahProfil.hidden = true;
      }
    }

    function tampilkanLangkah(nama) {
      if (langkahMasuk) langkahMasuk.hidden = nama !== 'masuk';
      if (langkahDaftar) langkahDaftar.hidden = nama !== 'daftar';
      if (langkahHasil) langkahHasil.hidden = nama !== 'hasil';
    }

    /* --- Tombol langkah "masuk" -------------------------------------------
       "Ya, sudah tahu" dan "Belum, bantu aku eksplorasi" menuju daftar prodi
       yang SAMA: satu-satunya taksonomi minat yang ada di data hari ini
       adalah pengelompokan prodi per rumpun (data/prodi.json), belum ada
       daftar minat terpisah untuk dijelajah lebih dulu. Dilaporkan ke PM
       sebagai keterbatasan data, bukan diputuskan sendiri untuk mengarang
       taksonomi minat baru.

       KOREKSI (QA blocker B-1): listener ini WAJIB dipasang di LUAR
       Promise.all(...).then() di bawah. tampilkanLangkah() murni DOM, tidak
       butuh data/prodi.json dkk sama sekali — sebelumnya kedua tombol ini
       cuma jalan kalau ketiga berkas data berhasil dimuat, jadi begitu fetch
       gagal (mis. dibuka lewat file://, atau benar-benar putus jaringan),
       tombolnya kelihatan aktif tapi diam total saat diklik: jalan buntu.
       Sekarang pengguna tetap bisa melangkah ke daftar prodi (yang memang
       kosong kalau data gagal dimuat) walau ada galat, ditemani pesan
       "Sedang tidak tersambung" dari tampilkanGalat() di cabang .catch(). */
    var btnTahu = document.querySelector('[data-aksi="mulai-tahu"]');
    var btnEksplor = document.querySelector('[data-aksi="mulai-eksplor"]');
    if (btnTahu) btnTahu.addEventListener('click', function () { tampilkanLangkah('daftar'); });
    if (btnEksplor) btnEksplor.addEventListener('click', function () { tampilkanLangkah('daftar'); });

    /* Diisi tampilkanHasil() di bawah setiap kali langkah "hasil" dirender,
       dibaca "Simpan ke Daftar Periksa" supaya tahu prodi + saran mapel APA
       yang sedang tampil saat diklik (lihat blocker B-2 di bawah). */
    var prodiAktifId = null;
    var prodiAktifNama = null;
    var mapelSaranAktif = [];

    Promise.all([muatData('prodi'), muatData('mapel'), muatData('prodi-mapel')]).then(function (semua) {
      var daftarProdi = larik(semua[0]);
      var daftarMapel = larik(semua[1]);
      var relasi = larik(semua[2]);

      var namaProdi = {};
      daftarProdi.forEach(function (p) { if (p && p.id) namaProdi[p.id] = p.nama || p.id; });
      var mapelById = {};
      daftarMapel.forEach(function (m) { if (m && m.id) mapelById[m.id] = m; });

      /* Baris mapel untuk SATU prodi, diurutkan bobot tertinggi dulu (bobot
         3 = penentu, PRD/SDD §13) — urutan inilah yang membuat dua bobot
         teratas valid dijadikan "saran 2 mapel pilihan TKA". */
      function barisUntukProdi(prodiId) {
        return relasi
          .filter(function (r) { return r.prodi_id === prodiId; })
          .map(function (r) {
            var m = mapelById[r.mapel_id] || {};
            return { id: r.mapel_id, nama: m.nama || r.mapel_id, tersedia: !!m.tersedia_di_smk, bobot: r.bobot || 0 };
          })
          .sort(function (a, b) { return b.bobot - a.bobot; });
      }

      /* "Belum tahu prodi" WAJIB tetap menghasilkan keluaran berguna (PRD
         F3). Tanpa satu prodi tertentu untuk dijadikan acuan, rangkumannya
         dihitung dari total bobot mapel itu di SELURUH prodi yang ada —
         mapel yang paling sering jadi penentu di banyak prodi sekaligus
         yang naik ke atas. Ini rangkuman umum, bukan hasil per prodi. */
      function barisUmum() {
        var totalBobot = {};
        relasi.forEach(function (r) {
          totalBobot[r.mapel_id] = (totalBobot[r.mapel_id] || 0) + (r.bobot || 0);
        });
        return Object.keys(totalBobot).map(function (id) {
          var m = mapelById[id] || {};
          return { id: id, nama: m.nama || id, tersedia: !!m.tersedia_di_smk, bobot: totalBobot[id] };
        }).sort(function (a, b) { return b.bobot - a.bobot; });
      }

      function tampilkanHasil(prodiId) {
        var belumTahu = !prodiId || prodiId === 'belum';
        var baris = belumTahu ? barisUmum() : barisUntukProdi(prodiId);
        if (!baris.length) return;

        if (protoMapel && wadahMapel) {
          gantiIsi(wadahMapel, baris.map(function (b) {
            var el = protoMapel.cloneNode(true);
            isiSlot(el, 'nama', b.nama);
            /* Dua ikon dan dua keterangan sudah tertulis lengkap di
               prototipe (baris__ikon--ok/--warn, caption-ok/-warn); di sini
               cuma memilih pasangan mana yang tampil sesuai b.tersedia,
               bukan mengarang teks baru. */
            var ikonOk = el.querySelector('[data-slot="ikon-ok"]');
            var ikonWarn = el.querySelector('[data-slot="ikon-warn"]');
            var capOk = el.querySelector('[data-slot="caption-ok"]');
            var capWarn = el.querySelector('[data-slot="caption-warn"]');
            if (ikonOk) ikonOk.hidden = !b.tersedia;
            if (ikonWarn) ikonWarn.hidden = b.tersedia;
            if (capOk) capOk.hidden = !b.tersedia;
            if (capWarn) capWarn.hidden = b.tersedia;
            return el;
          }));
        }

        /* Saran 2 mapel pilihan TKA: dua bobot teratas. Bukan kalimat baru —
           cuma menggabungkan dua nama mapel yang sudah ada di data, sama
           semangatnya dengan gabung() yang dipakai halaman lain. Disimpan ke
           closure luar (bukan cuma ditulis ke DOM) supaya "Simpan ke Daftar
           Periksa" bisa merakit teks butir baru dari nilai yang SAMA persis
           dengan yang sedang tampil, tanpa membaca ulang dari textContent. */
        var duaTeratas = baris.slice(0, 2).map(function (b) { return b.nama; });
        isiSlot(document, 'saran-mapel', duaTeratas.join(' & ') || '—');
        isiSlot(document, 'prodi-nama', belumTahu ? 'Rangkuman umum' : (namaProdi[prodiId] || prodiId));

        mapelSaranAktif = duaTeratas;
        prodiAktifId = belumTahu ? null : prodiId;
        prodiAktifNama = belumTahu ? null : (namaProdi[prodiId] || prodiId);

        /* Peringatan mapel yang tidak tersedia di SMK sudah tampil di level
           baris lewat ikon+keterangan "Cek alternatif" di atas — PRD F3
           tidak menuntut bentuk lain selain itu ditampilkan ke pengguna. */

        /* CTA F10 "Lihat prospek & kampus untuk [prodi]" (SDD-F10 §G.1).
           F10 selalu butuh SATU prodi tertentu, jadi disembunyikan total saat
           hasil yang tampil adalah rangkuman umum ("belum tahu prodi").
           isiSlot() di sini DISENGAJA diberi akar `ctaEksplorasi` (bukan
           `document`) supaya hanya mengisi slot [data-isi="prodi-nama"] MILIK
           kartu CTA ini — nama slot yang sama juga dipakai <h2> judul langkah
           "hasil" di atas (diisi lewat isiSlot(document, 'prodi-nama', ...)
           beberapa baris ke atas); tanpa akar yang dipersempit, querySelector
           global akan selalu mengenai <h2> itu duluan dan kartu CTA tidak
           pernah terisi. */
        var ctaEksplorasi = document.querySelector('[data-aksi="lihat-eksplorasi"]');
        if (ctaEksplorasi) {
          if (belumTahu) {
            ctaEksplorasi.hidden = true;
          } else {
            ctaEksplorasi.hidden = false;
            ctaEksplorasi.setAttribute('href', 'eksplorasi-tujuan.html?prodi=' + encodeURIComponent(prodiId));
            isiSlot(ctaEksplorasi, 'prodi-nama', namaProdi[prodiId] || prodiId);
          }
        }

        if (langkahHasil) {
          langkahHasil.hidden = false;
          langkahHasil.setAttribute('data-prodi-aktif', prodiId || 'belum');
        }
        tampilkanLangkah('hasil');
      }

      /* Daftar prodi per rumpun — dua wadah bersarang, sama pola dengan
         kategori/butir di pasangChecklist(): prototipe rumpun diambil
         sinkron sebelum wadah luar diganti. */
      if (wadahRumpun && protoRumpun && protoProdi) {
        var perRumpun = {};
        var urutanRumpun = [];
        daftarProdi.forEach(function (p) {
          if (!p || !p.rumpun) return;
          if (!perRumpun[p.rumpun]) { perRumpun[p.rumpun] = []; urutanRumpun.push(p.rumpun); }
          perRumpun[p.rumpun].push(p);
        });
        gantiIsi(wadahRumpun, urutanRumpun.map(function (namaRumpun) {
          var elRumpun = protoRumpun.cloneNode(true);
          isiSlot(elRumpun, 'rumpun', namaRumpun);
          gantiIsi(elRumpun.querySelector('[data-daftar="prodi"]'), perRumpun[namaRumpun].map(function (p) {
            var elProdi = protoProdi.cloneNode(true);
            elProdi.setAttribute('data-prodi-id', p.id);
            isiSlot(elProdi, 'nama', p.nama);
            elProdi.addEventListener('click', function () {
              Profil.simpan({ prodi_impian: p.id });
              tampilkanHasil(p.id);
            });
            return elProdi;
          }));
          return elRumpun;
        }));
      }

      var btnBelumTahu = document.querySelector('[data-aksi="belum-tahu-prodi"]');
      if (btnBelumTahu) {
        btnBelumTahu.addEventListener('click', function () {
          Profil.simpan({ prodi_impian: 'belum' });
          tampilkanHasil('belum');
        });
      }

      /* "Ubah prodi" (di dalam langkah hasil) — kembali ke daftar prodi
         tanpa mengulang pertanyaan kelas di onboarding.html. Tombol
         terpisah "Ubah profil" di kartu ringkasan tetap menuju
         onboarding.html untuk mengubah kelas maupun prodi sekaligus. */
      var btnUbah = document.querySelector('[data-aksi="ubah-prodi"]');
      if (btnUbah) btnUbah.addEventListener('click', function () { tampilkanLangkah('daftar'); });

      /* "Simpan ke Daftar Periksa" (QA blocker B-2, Opsi 1) — kalau hasil yang
         sedang tampil punya prodi TERTENTU (bukan rangkuman umum "belum
         tahu"), tombol ini menambah SATU BUTIR BARU ke Daftar Periksa lewat
         ChecklistTambahan, menyebut prodi dan dua mapel saran itu secara
         eksplisit, lalu langsung mencentangnya lewat ChecklistProgres —
         bukan lagi cuma mencentang butir generik "Pilih 2 mapel pilihan
         TKA" yang sama untuk semua orang tanpa menambah apa pun.

         id butir dibuat dari prodiAktifId (sudah berbentuk slug, mis.
         "farmasi", "teknik-informatika" — lihat data/prodi.json) supaya
         menekan "Simpan" dua kali untuk prodi yang sama MENIMPA butir lama
         (ChecklistTambahan.tambah menghapus id kembar), bukan menggandakan
         baris di checklist.html.

         Kalau prodi belum diketahui (rangkuman umum), tidak ada satu prodi
         untuk disebut di kalimat butir baru — fallback ke perilaku lama:
         mencentang butir generik `mapel-tka` yang memang sudah ada di
         data/checklist.json untuk kasus itu. */
      var btnSimpan = document.querySelector('[data-aksi="simpan-checklist"]');
      if (btnSimpan) {
        btnSimpan.addEventListener('click', function () {
          if (prodiAktifId && mapelSaranAktif.length) {
            var idBaru = 'mapel-tka-' + prodiAktifId;
            ChecklistTambahan.tambah({
              id: idBaru,
              kategori: 'Pendaftaran',
              teks: 'Pilih ' + mapelSaranAktif.join(' & ') + ' sebagai mapel TKA — untuk ' + prodiAktifNama,
              berlaku_untuk_kelas: ['10', '11', '12']
            });
            ChecklistProgres.tandai(idBaru, true);
          } else {
            ChecklistProgres.tandai('mapel-tka', true);
          }
          global.location.href = 'checklist.html';
        });
      }

      /* --- Rute awal ---------------------------------------------------
         PENJAGA (SDD-F10 §D.4/§J risiko R3): prodi_impian tersimpan boleh
         jadi id yang sudah tidak ada lagi di data/prodi.json (mis. pernah
         dihapus dari daftar 18 prodi F10 di masa depan). Tanpa penjaga ini,
         tampilkanHasil() akan lolos sampai baris kosong lalu `return` diam-
         diam SEBELUM sempat memanggil tampilkanLangkah('hasil') MAUPUN
         tampilkanLangkah('masuk') — pengguna melihat layar yang tidak
         menampilkan langkah apa pun sama sekali. Jadi id yang tidak dikenal
         (tidak ada di namaProdi) diperlakukan SAMA seperti belum punya
         prodi_impian: kembali ke langkah "masuk", bukan lompat ke "hasil". */
      if (profil && profil.prodi_impian && profil.prodi_impian !== 'belum' && namaProdi[profil.prodi_impian]) {
        tampilkanHasil(profil.prodi_impian);
      } else {
        tampilkanLangkah('masuk');
      }
    }, function () {
      tampilkanGalat();
      /* Data gagal dimuat: tidak ada apa pun untuk dihitung, tapi langkah
         "masuk" tetap ditampilkan supaya halaman tidak terasa buntu total. */
      tampilkanLangkah('masuk');
    });
  }

  /* -----------------------------------------------------------------------
     EKSPLORASI TUJUAN — F10, kelanjutan langsung dari F3
     -----------------------------------------------------------------------
     Satu prodi, tiga keadaan (SDD-F10-eksplorasi-tujuan.md §E.3):

       profil  — id ketemu di data/profil-prodi.json -> seluruh blok detail
       kosong  — tidak ada id / id="belum" / id tidak ketemu -> daftar 18
                 prodi dikelompokkan per rumpun, sumbernya profil-prodi.json
                 SENDIRI (bukan data/prodi.json — §E.3), supaya yang
                 ditawarkan dijamin punya profil
       galat   — muatData('profil-prodi') gagal (luring/file://) ->
                 tampilkanGalat(), isi contoh statis di HTML tetap berdiri

     Urutan baca id prodi (§E.2): ?prodi=<id> di URL lebih dulu, baru
     cadangan Profil.baca().prodi_impian. Nilai ?prodi= HANYA dipakai untuk
     MENCARI entri di array data — tidak pernah dimasukkan ke innerHTML
     mentah dan tidak pernah digemakan ke pesan kalau id-nya tidak ketemu
     (R7 di SDD). Seluruh isi ditulis lewat isiSlot()/gantiIsi() yang sudah
     memakai textContent, sama seperti fungsi pasangX lain di berkas ini.

     F10 TIDAK PERNAH menulis ke lanjut.profil.v1 — memilih prodi lain dari
     layar "kosong" hanya mengganti ?prodi= di URL, prodi_impian resmi tetap
     milik F3 (Penolong Pilih Mapel). */
  function pasangEksplorasiTujuan() {
    function idDariUrl() {
      try {
        return new URLSearchParams(global.location.search).get('prodi');
      } catch (e) {
        /* URLSearchParams tidak ada / location tidak biasa saat diuji */
        return null;
      }
    }

    var idDiminta = idDariUrl();
    if (!idDiminta) {
      var profil = Profil.baca();
      if (profil && profil.prodi_impian && profil.prodi_impian !== 'belum') {
        idDiminta = profil.prodi_impian;
      }
    }

    muatData('profil-prodi').then(function (berkas) {
      var daftar = larik(berkas);
      var entri = null;
      if (idDiminta) {
        for (var i = 0; i < daftar.length; i++) {
          if (daftar[i] && daftar[i].id === idDiminta) { entri = daftar[i]; break; }
        }
      }
      if (entri) {
        renderProfilProdi(entri, berkas);
      } else {
        renderFallbackProdi(daftar);
      }
    }, function () {
      tampilkanGalat();
    });
  }

  /* Keadaan "profil": seluruh blok detail satu prodi. Nama data-isi/
     data-daftar/data-slot/data-keadaan di bawah ini adalah KONTRAK dengan
     eksplorasi-tujuan.html — dicocokkan langsung ke markup yang sudah
     ditulis ui-engineer (bukan lagi tebakan awal), didokumentasikan lengkap
     di laporan tugas backend-engineer. */
  function renderProfilProdi(prodi, berkas) {
    pasangKeadaan(document, 'kosong', false);
    pasangKeadaan(document, 'profil', true);

    isiSlot(document, 'nama-prodi', prodi.nama);
    isiSlot(document, 'jenjang', prodi.jenjang);
    /* Lencana solid "Relevan untuk RPL/TKJ/Teknik" — hanya 3 dari 18 prodi
       (spec §5), sengaja TIDAK ditenggelamkan jadi lencana netral biasa.
       Markupnya [data-slot="badge-smk"] (bukan [data-keadaan=...]) — cuma
       togel hidden, teksnya sudah tertulis lengkap di HTML. */
    var slotBadgeSmk = document.querySelector('[data-slot="badge-smk"]');
    if (slotBadgeSmk) slotBadgeSmk.hidden = !prodi.badge_relevan_smk;

    var peminatJumlah = prodi.peminat && prodi.peminat.jumlah;
    isiSlot(document, 'peminat-jumlah', angkaRibuan(peminatJumlah));
    var rasio = rasioKeketatan(prodi.diterima, peminatJumlah);
    isiSlot(document, 'rasio-keketatan', rasio);
    /* Keterangan kecil "Angka diterima belum tersedia." (salinan teks §4.9)
       cuma tampil saat rasionya benar-benar tidak bisa dihitung. Kalimatnya
       sudah tertulis lengkap di HTML ([data-isi="rasio-catatan"], hidden
       bawaan) — di sini cuma togel hidden-nya, TIDAK menimpa textContent-nya
       (aturan 1 pembantu render: JS tidak mengarang kalimat). */
    var slotRasioCatatan = document.querySelector('[data-isi="rasio-catatan"]');
    if (slotRasioCatatan) slotRasioCatatan.hidden = rasio !== '—';

    /* Baris sumber, SATU slot berisi kalimat utuh: "Sumber: SNPMB <jalur>
       <tahun> · diperiksa <tanggal berkas>" (§E.5) — templatnya sendiri
       dikunci SDD (bukan kalimat baru bikinan berkas ini), bagian yang
       berubah cuma nilainya. Tanggal diambil dari kepala berkas
       (diperiksa_pada), TIDAK dipaku di HTML (R9). */
    var jalurTahun = [prodi.peminat && prodi.peminat.jalur, prodi.peminat && prodi.peminat.tahun]
      .filter(function (v) { return v; }).join(' ');
    var tanggalDiperiksa = formatTanggal(berkas && berkas.diperiksa_pada);
    isiSlot(document, 'sumber-baris', gabung(['Sumber: SNPMB ' + jalurTahun, tanggalDiperiksa ? 'diperiksa ' + tanggalDiperiksa : '']));
    isiSlot(document, 'status-peminat', prodi.status_sumber && prodi.status_sumber.peminat);

    /* "Yang akan kamu pelajari" — 1-6 butir APA ADANYA, tidak pernah
       ditambal supaya genap (R5). Prototipe <li> di HTML TIDAK punya slot
       [data-isi] bersarang (teksnya langsung jadi textContent <li> itu
       sendiri), jadi diisi langsung, bukan lewat isiSlot(). */
    isiSlot(document, 'status-mata-kuliah', prodi.status_sumber && prodi.status_sumber.mata_kuliah);
    var wadahMataKuliah = document.querySelector('[data-daftar="mata-kuliah"]');
    var protoMataKuliah = ambilPrototipe(wadahMataKuliah);
    var mataKuliah = Array.isArray(prodi.mata_kuliah) ? prodi.mata_kuliah : [];
    if (protoMataKuliah && wadahMataKuliah) {
      gantiIsi(wadahMataKuliah, mataKuliah.map(function (nama) {
        var el = protoMataKuliah.cloneNode(true);
        el.textContent = nama;
        return el;
      }));
    }
    /* Belum ada markup "seksi kosong" khusus di eksplorasi-tujuan.html untuk
       kasus mata_kuliah/profesi/kampus benar-benar 0 butir (tidak terjadi di
       18 entri profil-prodi.json hari ini — minimum 2/2/1). Panggilan di
       bawah aman (no-op) selama elemennya belum ada; dilaporkan ke PM supaya
       ui-engineer bisa menambahkan [data-keadaan="mata-kuliah-kosong"] dkk.
       kalau mau menutup celah ini untuk data masa depan. */
    pasangKeadaan(document, 'mata-kuliah-kosong', mataKuliah.length === 0);

    var slotCatatanStudi = isiSlot(document, 'catatan-studi', prodi.catatan_studi || '');
    if (slotCatatanStudi) slotCatatanStudi.hidden = !prodi.catatan_studi;

    /* "Ke mana lulusannya" — 2-4 butir, string saja (tanpa gaji/deskripsi,
       §C.1), pola <li> yang sama seperti mata kuliah. */
    isiSlot(document, 'status-profesi', prodi.status_sumber && prodi.status_sumber.profesi);
    var wadahProfesi = document.querySelector('[data-daftar="profesi"]');
    var protoProfesi = ambilPrototipe(wadahProfesi);
    var profesi = Array.isArray(prodi.profesi) ? prodi.profesi : [];
    if (protoProfesi && wadahProfesi) {
      gantiIsi(wadahProfesi, profesi.map(function (nama) {
        var el = protoProfesi.cloneNode(true);
        el.textContent = nama;
        return el;
      }));
    }
    pasangKeadaan(document, 'profesi-kosong', profesi.length === 0);

    /* "Kampus yang cocok" — urutan array DIBAWA APA ADANYA (§C.4 aturan
       mengikat): renderer TIDAK BOLEH mengurutkan ulang. Kartu kampus TIDAK
       punya slot [data-isi] bersarang di markup (lihat eksplorasi-tujuan.html):
       strukturnya <div class="kartu"> > <p>nama</p> + <p>daftar .pil</p>,
       jadi diisi lewat posisi anak (children[0]/[1]) dan .pil pertama
       dipakai sebagai mini-prototipe untuk jenis+tiap jalur_masuk. Kampus
       PTN Vokasi ditandai kartu--outline supaya setara menonjol dengan PTN
       akademik. */
    isiSlot(document, 'status-kampus', prodi.status_sumber && prodi.status_sumber.kampus);
    var wadahKampus = document.querySelector('[data-daftar="kampus"]');
    var protoKampus = ambilPrototipe(wadahKampus);
    var kampus = Array.isArray(prodi.kampus) ? prodi.kampus : [];
    if (protoKampus && wadahKampus) {
      gantiIsi(wadahKampus, kampus.map(function (k) {
        var el = protoKampus.cloneNode(true);
        if (el.children[0]) el.children[0].textContent = k.nama;
        if (k.jenis === 'PTN Vokasi') el.classList.add('kartu--outline');
        else el.classList.remove('kartu--outline');
        var protoPil = el.querySelector('.pil');
        var wadahPil = protoPil ? protoPil.parentNode : null;
        if (protoPil && wadahPil) {
          var jalurMasuk = Array.isArray(k.jalur_masuk) ? k.jalur_masuk : [];
          var nilaiPil = [k.jenis].concat(jalurMasuk);
          gantiIsi(wadahPil, nilaiPil.map(function (teks) {
            var pil = protoPil.cloneNode(true);
            pil.textContent = teks;
            return pil;
          }));
        }
        return el;
      }));
    }
    pasangKeadaan(document, 'kampus-kosong', kampus.length === 0);

    /* Tombol "Simpan ke Daftar Periksa" -> kategori "Riset Kampus" (§G.2).
       Markupnya [data-aksi="simpan-checklist"] dengan [data-keadaan="idle"]
       DI ATAS tombol itu sendiri, dan [data-keadaan="tersimpan"] di elemen
       SAUDARA terpisah (bukan bersarang) — pasangKeadaan() tetap cocok
       karena ia mencari lewat document, bukan lewat anak tombol. Butir ini
       TIDAK otomatis dicentang — beda dengan F3, "cari tahu lebih lanjut"
       adalah pekerjaan yang belum dikerjakan. Bergantung pada perbaikan
       pasangChecklist() di atas supaya kategori baru ini benar-benar
       terlihat di checklist.html, bukan cuma tersimpan diam-diam. */
    var tombolSimpan = document.querySelector('[data-aksi="simpan-checklist"]');
    if (tombolSimpan) {
      tombolSimpan.addEventListener('click', function () {
        ChecklistTambahan.tambah({
          id: 'riset-kampus-' + prodi.id,
          kategori: 'Riset Kampus',
          teks: 'Cari tahu lebih lanjut soal ' + prodi.nama,
          berlaku_untuk_kelas: ['10', '11', '12']
        });
        pasangKeadaan(document, 'idle', false);
        pasangKeadaan(document, 'tersimpan', true);
      });
    }
  }

  /* Keadaan "kosong" (fallback): daftar 18 prodi dikelompokkan per rumpun,
     dibangun dari profil-prodi.json SENDIRI (bukan data/prodi.json — §E.3)
     supaya yang ditawarkan di sini dijamin punya profil F10.

     BEDA dari pola rumpun->prodi di pasangPilihMapel(): markup
     eksplorasi-tujuan.html TIDAK menyediakan prototipe untuk diklon di sini
     — [data-daftar="fallback-daftar"] SENGAJA kosong total di HTML (lihat
     komentarnya di eksplorasi-tujuan.html). Jadi seksi per rumpun dan kartu
     per prodi dibangun dari NOL lewat document.createElement(), bukan
     cloneNode() — tetap memakai textContent (bukan innerHTML) untuk tiap
     nilai data, konsisten dengan aturan pembantu render di atas. Nama kelas
     CSS yang dipakai (seksi, seksi__judul, tumpuk, kartu, kartu--rapat,
     baris__judul, baris__ket) meniru pola kartu link yang sama persis
     dipakai pilih-mapel.html. */
  function renderFallbackProdi(daftarProfil) {
    pasangKeadaan(document, 'profil', false);
    pasangKeadaan(document, 'kosong', true);

    var wadah = document.querySelector('[data-daftar="fallback-daftar"]');
    if (!wadah) return;

    var perRumpun = {};
    var urutanRumpun = [];
    daftarProfil.forEach(function (p) {
      if (!p || !p.rumpun) return;
      if (!perRumpun[p.rumpun]) { perRumpun[p.rumpun] = []; urutanRumpun.push(p.rumpun); }
      perRumpun[p.rumpun].push(p);
    });

    gantiIsi(wadah, urutanRumpun.map(function (namaRumpun) {
      var seksi = document.createElement('section');
      seksi.className = 'seksi';

      var judul = document.createElement('h2');
      judul.className = 'seksi__judul';
      judul.textContent = namaRumpun;
      seksi.appendChild(judul);

      var daftar = document.createElement('div');
      daftar.className = 'tumpuk';
      perRumpun[namaRumpun].forEach(function (p) {
        var a = document.createElement('a');
        a.className = 'kartu kartu--rapat';
        /* id prodi dari data ini sendiri (bukan dari ?prodi= yang mungkin
           tidak ketemu) — aman dipakai di href karena berasal dari berkas
           JSON tim, bukan masukan pengguna. */
        a.setAttribute('href', 'eksplorasi-tujuan.html?prodi=' + encodeURIComponent(p.id));

        var judulProdi = document.createElement('span');
        judulProdi.className = 'baris__judul';
        judulProdi.textContent = p.nama;
        a.appendChild(judulProdi);

        if (p.jenjang) {
          var ketProdi = document.createElement('span');
          ketProdi.className = 'baris__ket';
          ketProdi.textContent = p.jenjang;
          a.appendChild(ketProdi);
        }

        daftar.appendChild(a);
      });
      seksi.appendChild(daftar);

      return seksi;
    }));
  }

  /* -----------------------------------------------------------------------
     BERANDA — kartu tenggat terdekat + butir linimasa
     -----------------------------------------------------------------------
     Dua mode sekaligus: kartu tenggat diisi per slot (bentuknya sudah
     dikurasi markup), butir linimasa dibangun ulang dari data.

     Yang tidak boleh hilang saat render: blok .peringatan, lencana "Contoh"
     di kartu tenggat, dan penanda data-verifikasi di tiap butir. Dua yang
     pertama berada di luar wadah [data-daftar], jadi tidak pernah tersentuh;
     yang ketiga disetel ulang dari data pada tiap butir hasil klon.
     ----------------------------------------------------------------------- */
  function pasangBeranda() {
    var wadah = document.querySelector('[data-daftar="linimasa"]');
    var prototipe = ambilPrototipe(wadah);
    var hariIni = hariIniLokal();

    muatData('linimasa').then(function (berkas) {
      var hasil = linimasaTerkini(berkas, hariIni);

      /* Layar kosong (salinan teks §6): "Belum ada data" — beda dari
         kegagalan pemuatan (tampilkanGalat). Sebelumnya fungsi ini cuma
         `return` di sini, jadi kalau data/linimasa.json benar-benar kosong,
         markup contoh yang tertinggal di HTML tampil seolah itu data
         sungguhan. Sekarang keadaan kosongnya ditulis dan ditandai. */
      if (!hasil.butir.length) {
        pasangKeadaan(document, 'kosong', true);
        return;
      }
      pasangKeadaan(document, 'kosong', false);

      if (prototipe) {
        gantiIsi(wadah, hasil.butir.map(function (b, i) {
          var el = prototipe.cloneNode(true);
          el.setAttribute('data-status', b.status);
          if (b.verifikasi === 'belum') el.setAttribute('data-verifikasi', 'belum');
          else el.removeAttribute('data-verifikasi');
          isiSlot(el, 'tanggal', formatRentang(b.tanggal_mulai, b.tanggal_selesai));
          isiSlot(el, 'judul', b.judul);

          /* Baris sumber — DITURUNKAN dari data butir ini, bukan diwarisi
             dari teks yang kebetulan tertulis di prototipe (bug lama:
             gantiIsi() mengganti SELURUH anak wadah dengan klon prototipe
             butir pertama, jadi baris sumber butir 2-5 yang tadinya beda
             kata-katanya ikut tertimpa jadi sama seperti butir pertama).
             Kedua kalimat di bawah sudah tertulis lengkap di HTML (lihat
             prototipe di beranda.html); di sini cuma memilih yang mana yang
             tampil, tidak mengarang kalimat baru. */
          var sBelum = el.querySelector('[data-sumber-isi="belum"]');
          var sResmi = el.querySelector('[data-sumber-isi="resmi"]');
          if (b.verifikasi === 'belum') {
            if (sBelum) sBelum.hidden = false;
            if (sResmi) sResmi.hidden = true;
          } else {
            if (sBelum) sBelum.hidden = true;
            if (sResmi) {
              sResmi.hidden = false;
              isiSlot(sResmi, 'sumber-tanggal', formatTanggal(b.diperiksa_pada));
            }
          }

          /* Garis penghubung berhenti di butir terakhir. */
          if (i === hasil.butir.length - 1) {
            var garis = el.querySelector('.linimasa__garis');
            if (garis && garis.parentNode) garis.parentNode.removeChild(garis);
          }
          return el;
        }));
      }

      /* Tidak ada tahapan mendatang -> kartu tenggat dibiarkan apa adanya.
         Lebih baik isi contoh yang jelas ditandai contoh daripada angka
         negatif yang terbaca seperti fakta. */
      if (hasil.terdekat && hasil.sisaHari !== null && hasil.sisaHari >= 0) {
        isiSlot(document, 'tenggat-sisa', hasil.sisaHari);
        isiSlot(document, 'tenggat-tahapan', hasil.terdekat.judul);
        isiSlot(document, 'tenggat-tanggal', formatTanggal(hasil.terdekat.tanggal_selesai));
      }
    }, tampilkanGalat);
  }

  /* -----------------------------------------------------------------------
     KHUSUS SMK — enam butir "apa yang beda / apa yang bisa dilakukan"
     -----------------------------------------------------------------------
     Mode daftar. Jumlah butir selalu ikut data/khusus-smk.json; angka 6 yang
     kebetulan ada hari ini tidak dipaku di mana pun. PRD F2 mewajibkan tiap
     butir berpasangan, jadi butir yang salah satu sisinya kosong tidak
     dirender sama sekali — menjelaskan masalah tanpa langkah lanjutan justru
     yang tidak boleh tayang.
     ----------------------------------------------------------------------- */
  function pasangKhususSmk() {
    var wadah = document.querySelector('[data-daftar="butir"]');
    var prototipe = ambilPrototipe(wadah);
    if (!prototipe) return;

    muatData('khusus-smk').then(function (berkas) {
      var butir = larik(berkas).filter(function (b) {
        return b && b.judul && b.apa_yang_beda && b.apa_yang_bisa_dilakukan;
      });
      if (!butir.length) return;

      gantiIsi(wadah, butir.map(function (b, i) {
        var el = prototipe.cloneNode(true);
        /* Hanya butir pertama yang terbuka; sisanya tidak boleh ikut membawa
           atribut open milik prototipe. */
        if (i === 0) el.setAttribute('open', '');
        else el.removeAttribute('open');
        isiSlot(el, 'judul', b.judul);
        isiSlot(el, 'apa_yang_beda', b.apa_yang_beda);
        isiSlot(el, 'apa_yang_bisa_dilakukan', b.apa_yang_bisa_dilakukan);

        /* Baris sumber — DITURUNKAN dari url_sumber butir ini, bukan
           diwarisi dari prototipe (bug lama: setiap butir hasil klon
           membawa baris sumber butir PERTAMA apa adanya, jadi butir yang
           semestinya menunjuk ke Direktorat SMK ikut menampilkan "laman
           resmi SNPMB" milik butir pertama). Kedua kalimat sudah tertulis
           lengkap di prototipe (lihat khusus-smk.html); di sini cuma
           memilih yang cocok dengan domain url_sumber datanya. */
        var domain = typeof b.url_sumber === 'string' && b.url_sumber.indexOf('vokasi.kemdikbud.go.id') !== -1
          ? 'vokasi' : 'snpmb';
        var sSnpmb = el.querySelector('[data-sumber-isi="snpmb"]');
        var sVokasi = el.querySelector('[data-sumber-isi="vokasi"]');
        if (sSnpmb) sSnpmb.hidden = domain !== 'snpmb';
        if (sVokasi) sVokasi.hidden = domain !== 'vokasi';

        return el;
      }));
    }, tampilkanGalat);
  }

  /* -----------------------------------------------------------------------
     DAFTAR PERIKSA — 11 butir bawaan (data/checklist.json) dalam tiga
     kategori, PLUS butir yang ditambahkan pengguna sendiri (ChecklistTambahan)
     -----------------------------------------------------------------------
     Dua wadah bersarang: kategori diklon dari seksi pertama, butir diklon
     dari <li> pertama di dalamnya. Kedua prototipe diambil sinkron, sebelum
     fetch — sesudah wadah luar diganti, contohnya sudah tidak ada lagi.

     Kemajuan centang milik entitas `kemajuan` (PRD §13), disimpan lewat
     ChecklistProgres di localStorage (kunci KUNCI_CHECKLIST) berupa peta
     datar { butir_id: true }. Dibaca sekali saat merender supaya centang
     yang tersimpan sesi lalu langsung terlihat, dan ditulis ulang tiap kali
     ada [change] supaya menutup tab tidak menghapus kemajuan.

     Totalnya (dipakai teks §4.4 "X dari Y beres") SELALU dihitung dari
     JUMLAH BUTIR SAAT RUNTIME (data/checklist.json + ChecklistTambahan),
     tidak pernah angka 11 yang dipaku di kode — angka 11 di judul komentar
     ini cuma menyebut isi data/checklist.json hari ini, bukan konstanta yang
     dipakai untuk menghitung. Begitu pengguna menambah butir lewat "Simpan
     ke Daftar Periksa" di Penolong Pilih Mapel (QA blocker B-2), Y bertambah
     ikut jumlah butir tambahan itu. */
  function pasangChecklist() {
    var wadah = document.querySelector('[data-daftar="kategori"]');
    var protoKategori = ambilPrototipe(wadah);
    if (!protoKategori) return;
    var protoButir = ambilPrototipe(protoKategori.querySelector('[data-daftar="butir"]'));
    if (!protoButir) return;

    muatData('checklist').then(function (berkas) {
      var kategori = berkas && Array.isArray(berkas.kategori) ? berkas.kategori : [];
      var progres = ChecklistProgres.baca();
      var total = 0;

      /* Sisipkan butir tambahan (kalau ada) ke KATEGORI YANG SESUAI namanya
         (mis. "Pendaftaran"), tanpa mengubah objek asli hasil fetch — dibuat
         salinan dangkal per kategori supaya singgahan muatData('checklist')
         tidak ikut ketumpuk butir tambahan kalau halaman ini dirender ulang
         dalam sesi yang sama. Butir tambahan memakai field `teks` (bukan
         `judul`, lihat ChecklistTambahan) sehingga dipetakan ke bentuk yang
         sama dengan butir bawaan sebelum dirender. */
      var tambahan = ChecklistTambahan.baca();
      if (tambahan.length) {
        var namaKategoriAsli = {};
        kategori.forEach(function (k) { namaKategoriAsli[k.nama] = true; });

        kategori = kategori.map(function (k) {
          var milikKategoriIni = tambahan.filter(function (t) { return t.kategori === k.nama; });
          if (!milikKategoriIni.length) return k;
          var salinan = {};
          for (var kunci in k) { if (Object.prototype.hasOwnProperty.call(k, kunci)) salinan[kunci] = k[kunci]; }
          salinan.butir = larik(k.butir).concat(milikKategoriIni.map(function (t) {
            return { id: t.id, judul: t.teks, berlaku_untuk_kelas: t.berlaku_untuk_kelas };
          }));
          return salinan;
        });

        /* KOREKSI (SDD F10 §G.2, Risiko R1): butir tambahan yang kategorinya
           tidak cocok dengan kategori mana pun di checklist.json (mis.
           "Riset Kampus" dari tombol Simpan di F10 Eksplorasi Tujuan) dulu
           tersimpan di localStorage tapi TIDAK PERNAH dirender — hilang diam-
           diam. Sekarang dikelompokkan jadi seksi RUNTIME baru per nama
           kategori, ditambahkan di AKHIR daftar, memakai bentuk kategori yang
           sama (protoKategori dipakai ulang lewat kategori.map() di bawah)
           supaya tampil identik dengan seksi bawaan dan ikut dihitung ke
           `total`. checklist.json sendiri TIDAK diberi kategori kosong untuk
           ini — lihat _kategori_runtime di berkas itu untuk alasannya. */
        var sisa = tambahan.filter(function (t) { return t && t.kategori && !namaKategoriAsli[t.kategori]; });
        var perKategoriBaru = {};
        var urutanKategoriBaru = [];
        sisa.forEach(function (t) {
          if (!perKategoriBaru[t.kategori]) {
            perKategoriBaru[t.kategori] = [];
            urutanKategoriBaru.push(t.kategori);
          }
          perKategoriBaru[t.kategori].push({ id: t.id, judul: t.teks, berlaku_untuk_kelas: t.berlaku_untuk_kelas });
        });
        urutanKategoriBaru.forEach(function (namaBaru) {
          kategori = kategori.concat([{ id: 'runtime-' + namaBaru, nama: namaBaru, butir: perKategoriBaru[namaBaru] }]);
        });
      }

      var seksi = kategori.map(function (k) {
        var el = protoKategori.cloneNode(true);
        isiSlot(el, 'nama', k.nama);
        var butir = larik(k.butir);
        total += butir.length;
        gantiIsi(el.querySelector('[data-daftar="butir"]'), butir.map(function (b) {
          var li = protoButir.cloneNode(true);
          var kotak = li.querySelector('input[type="checkbox"]');
          if (kotak) {
            var sudahBeres = !!progres[b.id];
            kotak.checked = sudahBeres;
            if (sudahBeres) kotak.setAttribute('checked', ''); else kotak.removeAttribute('checked');
            /* Dibaca balik oleh listener [change] di bawah untuk tahu butir
               mana yang harus ditulis ke localStorage. */
            kotak.setAttribute('data-butir-id', b.id);
          }
          isiSlot(li, 'judul', b.judul);
          return li;
        }));
        return el;
      });
      if (!total) return;

      gantiIsi(wadah, seksi);
      hitungKemajuan(wadah, total);

      /* Satu listener di wadah: menyimpan status centang butir yang berubah,
         lalu menghitung ulang angka kemajuan supaya keduanya tidak pernah
         tidak sinkron. */
      wadah.addEventListener('change', function (ev) {
        var kotak = ev.target;
        var butirId = kotak && kotak.getAttribute && kotak.getAttribute('data-butir-id');
        if (butirId) ChecklistProgres.tandai(butirId, kotak.checked);
        hitungKemajuan(wadah, total);
      });
    }, tampilkanGalat);
  }

  /* Tiga keadaan teks kemajuan (salinan teks §4.4), semuanya sudah tertulis
     lengkap di checklist.html — fungsi ini cuma memilih yang mana yang
     tampil dan mengisi dua angkanya, tidak pernah mengarang kalimat baru:
       kosong  (beres === 0)          -> "Belum ada yang dicentang…"
       jalan   (0 < beres < total)    -> "X dari Y beres. Jalan terus."
       selesai (beres === total > 0)  -> "Bagian persiapannya beres…" */
  function hitungKemajuan(wadah, total) {
    var beres = wadah.querySelectorAll('input[type="checkbox"]:checked').length;
    isiSlot(document, 'kemajuan-jumlah', beres);
    isiSlot(document, 'kemajuan-total', total);

    pasangKeadaan(document, 'progres-kosong', beres === 0);
    pasangKeadaan(document, 'progres-jalan', beres > 0 && beres < total);
    pasangKeadaan(document, 'progres-selesai', total > 0 && beres === total);

    var bar = document.querySelector('[role="progressbar"]');
    if (!bar) return;
    bar.setAttribute('aria-valuenow', beres);
    bar.setAttribute('aria-valuemax', total);
    var isi = bar.querySelector('.progress__isi');
    if (isi) isi.style.width = (total ? Math.round((beres / total) * 100) : 0) + '%';
  }

  /* -----------------------------------------------------------------------
     CERITA ALUMNI — hanya yang benar-benar boleh tayang
     -----------------------------------------------------------------------
     Saringannya `tayang === true`, bukan sekadar bernilai benar dan bukan
     `izin_tayang`: ini cerita orang, dan PRD F4 menuntut izin tertulis lebih
     dulu. Dengan data hari ini kedua cerita bertanda tayang:false, jadi hasil
     yang benar adalah layar kosong yang sudah ditulis di halaman — bukan dua
     kartu contoh yang kebetulan ada di markup.
     ----------------------------------------------------------------------- */
  function pasangAlumni() {
    var wadah = document.querySelector('[data-daftar="cerita"]');
    var prototipe = ambilPrototipe(wadah);
    if (!prototipe) return;

    muatData('cerita-alumni').then(function (berkas) {
      var cerita = larik(berkas).filter(function (c) { return c && c.tayang === true; });

      if (!cerita.length) {
        gantiIsi(wadah, []);
        wadah.hidden = true;
        pasangKeadaan(document, 'kosong', true);
        return;
      }

      gantiIsi(wadah, cerita.map(function (c) {
        var el = prototipe.cloneNode(true);
        isiSlot(el, 'asal', gabung([c.asal_smk, c.jurusan_smk]));
        isiSlot(el, 'tujuan', gabung([c.ptn, c.prodi]));
        isiSlot(el, 'jalur', c.jalur);
        isiSlot(el, 'hambatan', c.hambatan);
        isiSlot(el, 'yang_dilakukan', c.yang_dilakukan);
        /* Lencana "CONTOH" ikut datanya: cerita nyata tidak boleh membawanya,
           cerita contoh tidak boleh kehilangannya. */
        var lencana = el.querySelector('.lencana--neutral');
        if (lencana) lencana.hidden = c.sumber !== 'contoh';
        return el;
      }));
      wadah.hidden = false;
      pasangKeadaan(document, 'kosong', false);
    }, tampilkanGalat);
  }

  /* -----------------------------------------------------------------------
     ARSIP — daftar mapel dengan jumlah kartunya
     -----------------------------------------------------------------------
     Mode isi-slot, bukan mode daftar: barisnya tidak dibangun ulang. Pembagian
     "Wajib TKA" dan "Pilihan" tidak ada di data/mapel.json, jadi taksonomi itu
     tetap milik markup; yang diikat cuma nama mapel dan jumlah kartunya.

     Tujuan tautan baru dipasang di sini, tidak pernah di sumber HTML —
     tools/check.js:22 memeriksa keberadaan berkas tanpa membuang query
     string, jadi href ber-query di HTML akan langsung menggagalkan gerbang.
     ----------------------------------------------------------------------- */
  function pasangArsip() {
    var baris = [].slice.call(document.querySelectorAll('[data-mapel]'));
    if (!baris.length) return;

    Promise.all([muatData('mapel'), muatData('arsip')]).then(function (hasil) {
      var nama = {};
      larik(hasil[0]).forEach(function (m) { if (m && m.id) nama[m.id] = m.nama; });
      var jumlah = hitungPerMapel(hasil[1]);

      baris.forEach(function (a) {
        var id = a.getAttribute('data-mapel');
        var n = jumlah[id] || 0;
        a.setAttribute('href', 'arsip-detail.html?mapel=' + encodeURIComponent(id));
        /* Mapel yang tidak ada di data dibiarkan memakai nama di markup —
           lebih baik nama contoh daripada baris kosong. */
        if (nama[id]) isiSlot(a, 'nama', nama[id]);
        /* Dua kalimat jumlah sudah tertulis di baris; yang berubah hanya
           mana yang tampil, dan angkanya. */
        var slot = isiSlot(a, 'jumlah', n);
        if (slot && slot.parentNode) slot.parentNode.hidden = n === 0;
        pasangKeadaan(a, 'kosong', n === 0);
      });
    }, tampilkanGalat);
  }

  function hitungPerMapel(berkasArsip) {
    var jumlah = {};
    larik(berkasArsip).forEach(function (k) {
      if (!k || !k.mapel_id) return;
      jumlah[k.mapel_id] = (jumlah[k.mapel_id] || 0) + 1;
    });
    var kartuPengguna = ArsipTambahan.baca();
    kartuPengguna.forEach(function (k) {
      if (!k || !k.mapel_id) return;
      jumlah[k.mapel_id] = (jumlah[k.mapel_id] || 0) + 1;
    });
    return jumlah;
  }

  /* -----------------------------------------------------------------------
     ARSIP DETAIL — kartu satu mapel, tab penyaring Semua/Catatan/Soal
     ----------------------------------------------------------------------- */
  function pasangArsipDetail() {
    function mapelDariUrl() {
      try {
        return new URLSearchParams(global.location.search).get('mapel');
      } catch (e) {
        return null;
      }
    }

    var mapelId = mapelDariUrl() || 'matematika';
    var wadah = document.querySelector('[data-daftar="kartu"]') || document.querySelector('.kisi-2');
    var protoKartu = ambilPrototipe(wadah);
    var tabList = document.querySelector('.segmen[role="tablist"]');
    var tabSemua = tabList ? tabList.querySelectorAll('button[role="tab"]') : [];
    var btnTambah = document.querySelector('a[href^="arsip-tambah.html"]');

    if (btnTambah) {
      btnTambah.setAttribute('href', 'arsip-tambah.html?mapel=' + encodeURIComponent(mapelId));
    }

    Promise.all([muatData('mapel'), muatData('arsip')]).then(function (hasil) {
      var daftarMapel = larik(hasil[0]);
      var namaMapel = mapelId;
      daftarMapel.forEach(function (m) {
        if (m && m.id === mapelId) namaMapel = m.nama || namaMapel;
      });

      var pagebarH1 = document.querySelector('.pagebar h1');
      if (pagebarH1) pagebarH1.textContent = namaMapel;
      document.title = namaMapel + ' · LANJUT';

      var kartuResmi = larik(hasil[1]).filter(function (k) {
        return k && k.mapel_id === mapelId;
      }).map(function (k) {
        var kat = k.kategori || (k.jawaban ? 'soal' : 'catatan');
        return {
          id: k.id,
          mapel_id: k.mapel_id,
          judul: k.judul,
          kategori: kat,
          sumber: k.sumber || 'resmi'
        };
      });

      var kartuPengguna = ArsipTambahan.baca().filter(function (k) {
        return k && k.mapel_id === mapelId;
      }).map(function (k) {
        return {
          id: k.id,
          mapel_id: k.mapel_id,
          judul: k.judul,
          kategori: k.kategori || (k.jawaban ? 'soal' : 'catatan'),
          sumber: 'buatan_sendiri'
        };
      });

      var semuaKartu = kartuResmi.concat(kartuPengguna);

      if (!semuaKartu.length) {
        if (wadah) wadah.hidden = true;
        if (tabList) tabList.hidden = true;
        pasangKeadaan(document, 'kosong', true);
        return;
      }

      pasangKeadaan(document, 'kosong', false);
      if (wadah) wadah.hidden = false;
      if (tabList) tabList.hidden = false;

      var elemenKartu = [];
      if (protoKartu && wadah) {
        elemenKartu = semuaKartu.map(function (k) {
          var el = protoKartu.cloneNode(true);
          var kat = (k.kategori || 'catatan').toLowerCase();
          el.setAttribute('data-kategori', kat);
          el.hidden = false;

          var lencana = el.querySelector('.lencana');
          if (lencana) {
            if (k.sumber === 'buatan_sendiri') {
              lencana.className = 'lencana lencana--neutral lencana--panjang';
              /* Salinan teks §4.5 — penanda tetap kartu pengguna, apa adanya. */
              lencana.textContent = 'Diunggah pengguna — belum diverifikasi tim';
            } else {
              lencana.className = 'lencana lencana--resmi';
              lencana.textContent = 'Resmi';
            }
          }

          var elJudul = el.querySelector('.kartu-arsip__judul') || el.querySelector('[data-isi="judul"]');
          if (elJudul) elJudul.textContent = k.judul;

          var elKat = el.querySelector('.caption') || el.querySelector('[data-isi="kategori"]');
          if (elKat) elKat.textContent = kat === 'soal' ? 'Soal' : 'Catatan';

          return el;
        });

        gantiIsi(wadah, elemenKartu);
      }

      /* Filter tab Semua / Catatan / Soal */
      function terapkanFilter(kategoriTerpilih) {
        if (!elemenKartu.length) return;
        elemenKartu.forEach(function (el) {
          var k = el.getAttribute('data-kategori');
          if (!kategoriTerpilih || kategoriTerpilih === 'semua') {
            el.hidden = false;
          } else {
            el.hidden = (k !== kategoriTerpilih);
          }
        });
      }

      if (tabSemua.length) {
        tabSemua.forEach(function (tab) {
          tab.addEventListener('click', function () {
            tabSemua.forEach(function (t) {
              t.setAttribute('aria-selected', String(t === tab));
            });
            var teksTab = (tab.getAttribute('data-tab') || tab.textContent || '').trim().toLowerCase();
            var kategori = 'semua';
            if (teksTab.indexOf('catatan') !== -1) kategori = 'catatan';
            else if (teksTab.indexOf('soal') !== -1) kategori = 'soal';
            terapkanFilter(kategori);
          });
        });
      }
    }, tampilkanGalat);
  }

  /* -----------------------------------------------------------------------
     ARSIP TAMBAH — formulir penambahan kartu baru oleh pengguna
     ----------------------------------------------------------------------- */
  function pasangArsipTambah() {
    var form = document.querySelector('form') || document.querySelector('[data-form="arsip-tambah"]');
    if (!form) return;

    function mapelDariUrl() {
      try {
        return new URLSearchParams(global.location.search).get('mapel');
      } catch (e) {
        return null;
      }
    }

    var mapelParam = mapelDariUrl();
    var selectMapel = form.querySelector('#mapel');
    var selectKategori = form.querySelector('#kategori');
    var inputJudul = form.querySelector('#judul');
    var inputIsi = form.querySelector('#isi');
    var inputJawaban = form.querySelector('#jawaban');

    if (selectMapel && mapelParam) {
      selectMapel.value = mapelParam;
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();

      var mapel = (selectMapel ? selectMapel.value : '').trim();
      var kategori = (selectKategori ? selectKategori.value : 'catatan').trim().toLowerCase();
      var judul = (inputJudul ? inputJudul.value : '').trim();
      var isi = (inputIsi ? inputIsi.value : '').trim();
      var jawaban = (inputJawaban ? inputJawaban.value : '').trim();

      /* Validasi dasar: tidak bisa simpan kartu kosong */
      if (!judul) {
        if (inputJudul) {
          inputJudul.focus();
        }
        return;
      }
      if (!isi) {
        if (inputIsi) {
          inputIsi.focus();
        }
        return;
      }

      var idKartu = 'k-user-' + Date.now();
      var kartuBaru = {
        id: idKartu,
        pemilik_id: 'pengguna',
        mapel_id: mapel || 'matematika',
        kategori: kategori,
        judul: judul,
        isi: isi,
        jawaban: jawaban || null,
        sumber: 'buatan_sendiri',
        dibuat_pada: new Date().toISOString()
      };

      ArsipTambahan.tambah(kartuBaru);

      global.location.href = 'arsip-detail.html?mapel=' + encodeURIComponent(kartuBaru.mapel_id);
    });
  }

  /* -----------------------------------------------------------------------
     LATIHAN — tombol "Lihat jawaban" + pencatatan Level-In
     -----------------------------------------------------------------------
     Lingkup fungsi ini SEMPIT DENGAN SENGAJA. Dua tanggung jawab:

     1. Membuka jawaban setelah keyakinan dipilih dan "Lihat jawaban" ditekan
        (F1-F5 lama, sudah ada sebelum Level-In).
     2. Men-dispatch kontrak event 'levelin:jawaban-dicatat' tepat sebelum
        navigasi ke latihan-selesai.html saat tombol Benar/Salah ditekan
        (lihat KONTRAK EVENT di kepala assets/levelin.js) — Level-In v1
        sengaja tidak memasang listener klik sendiri di tombol itu, jadi
        pemicunya wilayah berkas ini.

     PENYEDERHANAAN (laporan tugas ui-engineer, konflik "handler ganda"):
     Sebelumnya fungsi ini JUGA memasang listener klik sendiri ke chip
     keyakinan (.levelin-confidence-chip / [data-grup="keyakinan"]) dan ke
     tombol "Lihat jawaban" untuk kasus "belum pilih", dengan status pilihan
     disimpan di variabel lokal `terpilih`. assets/levelin.js
     (pasangKeyakinan()) memasang listener SERUPA ke elemen YANG SAMA dengan
     status tersimpan di sessionStorage — dua sumber kebenaran untuk satu
     pilihan siswa, dan urutan pemasangannya tidak terjamin (levelin.js
     menunggu fetch konfigurasi async, app.js menunggu DOMContentLoaded).
     Diputuskan (sesuai rekomendasi backend-engineer): levelin.js SATU-
     SATUNYA pemilik logika chip + status "belum pilih" pada tombol "Lihat
     jawaban", karena levelin.js memang butuh nilai keyakinan untuk mencatat
     kalibrasi. Fungsi ini sekarang HANYA membaca `aria-disabled` yang
     dikelola levelin.js untuk tahu kapan boleh membuka jawaban — tidak lagi
     memasang listener atau menyimpan state sendiri di chip/tombol itu. */
  function pasangLatihan() {
    var tombolLihat = document.querySelector('[data-aksi="lihat-jawaban"]');
    var jawaban = document.querySelector('[data-jawaban]');
    var blokNilai = document.querySelector('[data-tahap="nilai"]');
    var kartuLatihan = document.querySelector('.kartu-latihan');

    if (tombolLihat) {
      tombolLihat.addEventListener('click', function () {
        /* Status "sudah pilih keyakinan?" dibaca dari aria-disabled yang
           dikelola assets/levelin.js (pasangKeyakinan()), bukan dari state
           lokal berkas ini. Kalau masih tertahan, levelin.js sendiri yang
           menampilkan petunjuk "Pilih dulu seberapa yakin kamu..." lewat
           listener klik miliknya pada tombol yang sama — tidak ada yang
           perlu dilakukan berkas ini untuk kasus itu. */
        if (tombolLihat.getAttribute('aria-disabled') === 'true') return;
        if (jawaban) jawaban.hidden = false;
        tombolLihat.hidden = true;
        if (blokNilai) blokNilai.hidden = false;
      });
    }

    /* Tombol Benar/Salah (SDD-LevelIn.md §6.2 langkah 3). Dispatch bersifat
       sinkron sehingga selesai sebelum browser memproses navigasi <a href>
       yang menyertainya — tidak perlu preventDefault. */
    var tombolNilai = blokNilai
      ? [].slice.call(blokNilai.querySelectorAll('[data-nilai-jawaban]'))
      : [];
    tombolNilai.forEach(function (tombol) {
      tombol.addEventListener('click', function () {
        try {
          var kartuId = kartuLatihan ? kartuLatihan.getAttribute('data-kartu-id') : null;
          var mapelId = kartuLatihan ? kartuLatihan.getAttribute('data-mapel') : null;
          /* Nilai keyakinan dibaca langsung dari chip aria-pressed=true di
             DOM (dikelola levelin.js). Boleh tidak ketemu (undefined) —
             kontrak levelin.js akan memakai cadangan dari
             sesi.keyakinan_kartu_ini di sessionStorage (lihat kepala
             assets/levelin.js, bagian KONTRAK EVENT poin 2). */
          var chipTerpilih = document.querySelector('.levelin-confidence-chip[aria-pressed="true"]');
          var detail = {
            kartu_id: kartuId,
            mapel_id: mapelId,
            benar: tombol.getAttribute('data-nilai-jawaban') === 'benar'
          };
          if (chipTerpilih) {
            var nilaiKeyakinan = parseInt(chipTerpilih.getAttribute('data-nilai'), 10);
            if (!isNaN(nilaiKeyakinan)) detail.keyakinan = nilaiKeyakinan;
          }
          window.dispatchEvent(new CustomEvent('levelin:jawaban-dicatat', { detail: detail }));
        } catch (e) {
          /* Level-In P1 tidak boleh menghambat navigasi F1-F5 yang sudah
             ada (K5, SDD-LevelIn.md §1) — kegagalan di sini dibiarkan diam. */
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     DAFTAR / MASUK / AKUN — B8, penyambungan ke assets/api.js
     -----------------------------------------------------------------------
     Tiga fungsi di bawah HANYA memasang formulir dan memindahkan hasilnya
     ke slot [data-isi]/[data-keadaan] yang sudah ada di HTML — sama seperti
     seluruh fungsi pasangX lain di berkas ini. Panggilan jaringan yang
     sesungguhnya (bentuk permintaan, header, penguraian galat) hidup di
     assets/api.js, bukan di sini (pemisahan lapisan render vs jaringan).

     assets/api.js dimuat SETELAH berkas ini di tiap halaman (lihat urutan
     <script> di daftar.html/masuk.html/akun.html), tapi itu aman: fungsi di
     bawah baru benar-benar memanggil LANJUT.api.* di dalam event handler
     (submit/klik), bukan saat dipasang — dan pada saat itu api.js sudah
     selesai dimuat.

     Catatan penting soal perilaku 401/sesi habis dan alur daftar→masuk ada
     di kepala assets/api.js ("PENYIMPANGAN YANG DISENGAJA") — dilaporkan ke
     PM, tidak diputuskan diam-diam. Baca di sana sebelum mengubah alur ini.
     ----------------------------------------------------------------------- */

  function pasangDaftar() {
    var form = document.querySelector('[data-form="daftar"]');
    if (!form) return;
    var api = global.LANJUT && global.LANJUT.api;
    var selectProdi = form.querySelector('#prodi_impian');
    var tombol = form.querySelector('[data-tombol="submit"]');
    var errUmum = document.querySelector('[data-isi="galat-daftar"]');

    /* Isi dropdown prodi dari server (atau cadangannya) — lihat
       ambilProdi() di api.js untuk urutan fallback lengkap (B-K1). Opsi
       "belum" yang sudah ada di markup dibiarkan, opsi baru disisipkan
       sebelum opsi itu supaya "belum" tetap paling akhir. */
    if (selectProdi && api && typeof api.ambilProdi === 'function') {
      api.ambilProdi().then(function (daftarProdi) {
        var opsiBelum = selectProdi.querySelector('option[value="belum"]');
        var frag = document.createDocumentFragment();
        larik(daftarProdi).forEach(function (p) {
          if (!p || !p.id) return;
          var opt = document.createElement('option');
          opt.value = p.id;
          opt.textContent = p.nama || p.id;
          frag.appendChild(opt);
        });
        if (opsiBelum) selectProdi.insertBefore(frag, opsiBelum);
        else selectProdi.appendChild(frag);
      }, function () { /* opsi "belum" saja tetap membuat formulir bisa dikirim */ });
    }

    function tampilGalat(pesan) {
      if (!errUmum) return;
      errUmum.textContent = pesan || '';
      errUmum.hidden = !pesan;
    }

    function setProses(proses) {
      if (tombol) tombol.disabled = proses;
      pasangKeadaan(tombol, 'idle', !proses);
      pasangKeadaan(tombol, 'proses', proses);
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      tampilGalat('');
      if (!api) { tampilGalat(''); return; }

      var fd = new FormData(form);
      var namaPengguna = String(fd.get('nama_pengguna') || '').trim().toLowerCase();
      var email = String(fd.get('email') || '').trim();
      var kataSandi = String(fd.get('kata_sandi') || '');
      var prodiImpian = String(fd.get('prodi_impian') || '');

      setProses(true);
      api.daftar({
        namaPengguna: namaPengguna,
        kataSandi: kataSandi,
        email: email || undefined,
        prodiImpian: prodiImpian || undefined
      }).then(function () {
        /* Diarahkan ke masuk.html, bukan langsung masuk — lihat catatan
           "PENYIMPANGAN #4" di kepala assets/api.js. */
        global.location.href = 'masuk.html?daftar=selesai';
      }, function (err) {
        setProses(false);
        tampilGalat(api.pesanUntuk(err));
      });
    });
  }

  function pasangMasuk() {
    var form = document.querySelector('[data-form="masuk"]');
    if (!form) return;
    var api = global.LANJUT && global.LANJUT.api;
    var tombol = form.querySelector('[data-tombol="submit"]');
    var errUmum = document.querySelector('[data-isi="galat-masuk"]');
    var namaField = form.querySelector('#nama_pengguna');

    /* Datang dari daftar.html?daftar=selesai -> buka kartu ajakan yang
       sudah ada di markup, mulai hidden. */
    try {
      if (new URLSearchParams(global.location.search).get('daftar') === 'selesai') {
        pasangKeadaan(document, 'baru-daftar', true);
      }
    } catch (e) { /* URLSearchParams tidak ada / location tidak biasa saat diuji */ }

    /* Fokus ke nama pengguna saat halaman dibuka (permintaan tugas 2.4). */
    if (namaField && typeof namaField.focus === 'function') namaField.focus();

    function tampilGalat(pesan) {
      if (!errUmum) return;
      errUmum.textContent = pesan || '';
      errUmum.hidden = !pesan;
    }

    function setProses(proses) {
      if (tombol) tombol.disabled = proses;
      pasangKeadaan(tombol, 'idle', !proses);
      pasangKeadaan(tombol, 'proses', proses);
    }

    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      tampilGalat('');
      if (!api) return;

      var fd = new FormData(form);
      var namaPengguna = String(fd.get('nama_pengguna') || '').trim().toLowerCase();
      var kataSandi = String(fd.get('kata_sandi') || '');

      setProses(true);
      api.masuk(namaPengguna, kataSandi).then(function () {
        global.location.href = 'beranda.html';
      }, function (err) {
        setProses(false);
        tampilGalat(api.pesanUntuk(err));
      });
    });
  }

  function pasangAkun() {
    var blokMasuk = document.querySelector('[data-keadaan="masuk"]');
    var blokTamu = document.querySelector('[data-keadaan="tamu"]');
    if (!blokMasuk || !blokTamu) return;
    var api = global.LANJUT && global.LANJUT.api;

    function tampilkanTamu() {
      blokMasuk.hidden = true;
      blokTamu.hidden = false;
    }

    if (!api || !api.isLoggedIn()) { tampilkanTamu(); return; }

    api.profil().then(function (pengguna) {
      blokTamu.hidden = true;
      blokMasuk.hidden = false;
      isiSlot(blokMasuk, 'nama_pengguna', pengguna.nama_tampilan || pengguna.nama_pengguna);
      isiSlot(blokMasuk, 'email', pengguna.email || 'Belum diisi');
      isiSlot(blokMasuk, 'kelas', pengguna.kelas || 'Belum diisi');
      /* Kontrak API memakai nama `prodi_impian` (bentukProfil() di
         server/src/modul/auth/auth.layanan.js, sudah C-1). Nilainya id
         prodi (mis. "teknik-informatika"), bukan nama yang enak dibaca —
         halaman ini belum mengambil daftar nama prodi untuk
         menerjemahkannya, ditampilkan apa adanya untuk saat ini, lihat
         laporan ke PM. */
      isiSlot(blokMasuk, 'prodi', pengguna.prodi_impian || 'Belum ditentukan');
    }, function (err) {
      /* 401/SESI_KEDALUWARSA: assets/api.js sudah menghapus token sebelum
         promise ini ditolak. TIDAK redirect (SDD §6.5, B-K1) — turun ke
         keadaan tamu, persis seperti belum pernah masuk. */
      if (err && (err.kode === 'TIDAK_MASUK' || err.kode === 'SESI_KEDALUWARSA')) {
        tampilkanTamu();
        return;
      }
      pasangKeadaan(document, 'galat', true);
      tampilkanTamu();
    });

    var tombolKeluar = document.querySelector('[data-aksi="keluar"]');
    if (tombolKeluar) {
      tombolKeluar.addEventListener('click', function () {
        tombolKeluar.disabled = true;
        pasangKeadaan(tombolKeluar, 'idle', false);
        pasangKeadaan(tombolKeluar, 'proses', true);
        api.keluar().then(function () {
          global.location.href = 'masuk.html';
        });
      });
    }
  }

  /* -----------------------------------------------------------------------
     PEMASANGAN OTOMATIS
     Setiap halaman menandai dirinya lewat <body data-peran="...">. Tidak ada
     halaman yang perlu memanggil apa pun secara manual.
     ----------------------------------------------------------------------- */
  var HALAMAN = {
    'splash': pasangSplash,
    'onboarding': pasangOnboarding,
    'pilih-mapel': pasangPilihMapel,
    'eksplorasi-tujuan': pasangEksplorasiTujuan,
    'beranda': pasangBeranda,
    'khusus-smk': pasangKhususSmk,
    'checklist': pasangChecklist,
    'alumni': pasangAlumni,
    'arsip': pasangArsip,
    'arsip-detail': pasangArsipDetail,
    'arsip-tambah': pasangArsipTambah,
    'latihan': pasangLatihan,
    'daftar': pasangDaftar,
    'masuk': pasangMasuk,
    'akun': pasangAkun
  };

  function inisialisasiStickyBar() {
    var appbar = document.querySelector('.appbar');
    if (!appbar) return;
    function perbaruiScroll() {
      var y = window.scrollY || document.documentElement.scrollTop || 0;
      if (y > 8) {
        appbar.classList.add('appbar--scrolled');
      } else {
        appbar.classList.remove('appbar--scrolled');
      }
    }
    window.addEventListener('scroll', perbaruiScroll, { passive: true });
    perbaruiScroll();
  }

  function mulai() {
    inisialisasiStickyBar();
    var peran = document.body.getAttribute('data-peran');
    var f = HALAMAN[peran];
    if (!f) return;
    try {
      f();
    } catch (e) {
      /* Batas galat terakhir. Isi contoh yang sudah ada di HTML tetap tampil,
         jadi satu halaman yang bermasalah tidak pernah jadi layar kosong. */
    }
  }

  /* Dibuka ke global supaya halaman lain bisa memakainya nanti tanpa impor.
     WAJIB ditulis SEBELUM mulai() dipanggil di bawah, dan WAJIB DIGABUNG
     (bukan menimpa) `global.LANJUT` yang mungkin sudah ada — sama seperti
     pola yang dipakai assets/api.js (baris "global.LANJUT = global.LANJUT
     || {}"). Kalau baris ini menimpa objeknya sekaligus (`global.LANJUT =
     {...}` tanpa merge), properti yang sudah ditempel skrip lain (mis.
     `LANJUT.api` dari api.js, kalau urutan <script> pernah dibalik atau
     berkas ini pernah dimuat ulang secara dinamis) hilang seketika dan
     seluruh alur akun (pasangDaftar/pasangMasuk/pasangAkun, yang membaca
     `global.LANJUT.api`) mati tanpa galat yang kelihatan. */
  global.LANJUT = global.LANJUT || {};
  global.LANJUT.profil = Profil;
  global.LANJUT.checklistProgres = ChecklistProgres;
  global.LANJUT.checklistTambahan = ChecklistTambahan;
  global.LANJUT.arsipTambahan = ArsipTambahan;
  global.LANJUT.muatData = muatData;
  global.LANJUT.KUNCI_PROFIL = KUNCI_PROFIL;
  global.LANJUT.KUNCI_CHECKLIST = KUNCI_CHECKLIST;
  global.LANJUT.KUNCI_CHECKLIST_TAMBAHAN = KUNCI_CHECKLIST_TAMBAHAN;
  global.LANJUT.KUNCI_ARSIP_TAMBAHAN = KUNCI_ARSIP_TAMBAHAN;
  /* Fungsi-fungsi murni: logika keputusan yang kalau salah menyesatkan siswa,
     jadi harus bisa diuji langsung tanpa DOM. Sisanya — registry peran,
     seluruh pasangX, pembantu render — sengaja tetap privat. */
  global.LANJUT.linimasaTerkini = linimasaTerkini;
  global.LANJUT.angkaRibuan = angkaRibuan;
  global.LANJUT.rasioKeketatan = rasioKeketatan;

  /* KOREKSI (QA Phase 2, bug U-2): komentar lama di sini menyatakan
     pasangDaftar/pasangMasuk/pasangAkun hanya membaca `global.LANJUT.api`
     DI DALAM event handler submit/klik — itu KELIRU. pasangDaftar() (dan
     serupa di pasangMasuk/pasangAkun) menyimpan `global.LANJUT.api` ke
     variabel lokal `api` SEKALI saat fungsi itu dipanggil (bukan di dalam
     handler-nya), lalu handler submit memakai closure `api` itu. Kalau
     mulai() terlanjur jalan sebelum assets/api.js selesai mengeksekusi dan
     menempel `LANJUT.api`, closure tsb membeku sebagai `undefined`
     SELAMANYA — akibatnya setiap submit form diam-diam tidak berbuat apa
     apa (lihat `if (!api) { tampilGalat(''); return; }` di pasangDaftar).
     Karena app.js dan api.js sama-sama dimuat `defer`, keduanya dijamin
     jalan sebelum DOMContentLoaded tapi TIDAK dijamin salah satu sudah
     selesai sebelum yang lain — jadi memanggil mulai() langsung di sini
     (readyState "interactive") berisiko mendahului api.js. Satu-satunya
     titik yang aman ditunggu adalah DOMContentLoaded, karena event itu
     baru menyala setelah SEMUA skrip defer (app.js maupun api.js) selesai
     dieksekusi berurutan. Maka SELALU tunggu event ini, tanpa cabang
     "jalankan langsung". */
  document.addEventListener('DOMContentLoaded', mulai);
})(window);
