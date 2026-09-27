/* Menguji dua hal yang tidak tersentuh pemeriksa struktur:
     A. logika profil di app.js (baca/simpan/hapus/lengkap)
     B. kontrak selector — tiap hook yang dicari app.js harus ada di HTML-nya

   Tanpa jsdom: app.js dijalankan di atas shim window seminimal mungkin.
   Yang diuji logikanya, bukan rendernya.

   Seluruh isi berkas ini dibungkus satu fungsi async (main() di paling
   bawah) supaya Bagian D (pasangChecklist() dengan DOM tiruan) bisa
   `await` promise dari muatData()/fetch tiruannya sebelum bagian
   berikutnya (B, C) dan ringkasan akhir jalan — tanpa itu process.exit()
   di baris terakhir akan lebih dulu jalan daripada assertion Bagian D
   sempat diperiksa. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.argv[2];
let gagal = 0;
const cek = (nama, syarat, detail) => {
  if (syarat) { console.log('   ok   ' + nama); }
  else { console.log('   GAGAL ' + nama + (detail ? ' — ' + detail : '')); gagal++; }
};

/* ---------- shim window seminimal mungkin (Bagian A/A2/A3) ---------- */
function bikinWindow() {
  const simpanan = new Map();
  const win = {
    localStorage: {
      getItem: (k) => (simpanan.has(k) ? simpanan.get(k) : null),
      setItem: (k, v) => simpanan.set(k, String(v)),
      removeItem: (k) => simpanan.delete(k),
    },
    location: { href: '', replace(u) { this.href = u; } },
    setTimeout: () => 0,
    clearTimeout: () => {},
  };
  win.window = win;
  /* app.js memasang listener lewat document; di sini cukup yang tidak dipakai
     jalur profil, jadi dikembalikan kosong. */
  win.document = {
    readyState: 'complete',
    body: { getAttribute: () => null },
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  return win;
}

const kode = fs.readFileSync(path.join(ROOT, 'assets/app.js'), 'utf8');
function muat() {
  const win = bikinWindow();
  vm.createContext(win);
  vm.runInContext(kode, win);
  return win;
}

/* ---------- DOM tiruan minimal untuk Bagian D (pasangChecklist) ----------
   Bukan jsdom: cuma cukup untuk menjalankan satu fungsi (pasangChecklist)
   sampai selesai — querySelector/querySelectorAll dengan dukungan selector
   terbatas ([attr="val"], [attr], .kelas, tag), cloneNode dangkal+dalam,
   replaceChildren, addEventListener yang benar-benar menyimpan listener
   (dipakai untuk memicu 'DOMContentLoaded' secara manual, sama seperti
   browser memicunya setelah skrip defer selesai). */
function elBuat(tag) {
  const el = {
    tagName: tag || '',
    attrs: {},
    children: [],
    hidden: false,
    checked: false,
    textContent: '',
    _listeners: {},
    setAttribute(k, v) { el.attrs[k] = String(v); },
    getAttribute(k) { return Object.prototype.hasOwnProperty.call(el.attrs, k) ? el.attrs[k] : null; },
    removeAttribute(k) { delete el.attrs[k]; },
    appendChild(c) { el.children.push(c); return c; },
    replaceChildren(frag) { el.children = (frag && frag.children ? frag.children.slice() : []); },
    cloneNode(deep) {
      const c = elBuat(el.tagName);
      c.attrs = Object.assign({}, el.attrs);
      c.textContent = el.textContent;
      if (deep) c.children = el.children.map((k) => k.cloneNode(true));
      return c;
    },
    addEventListener(type, fn) { (el._listeners[type] = el._listeners[type] || []).push(fn); },
    querySelector(sel) { return cariSemua(el, sel)[0] || null; },
    querySelectorAll(sel) { return cariSemua(el, sel); },
  };
  Object.defineProperty(el, 'firstElementChild', { get: () => el.children[0] || null });
  return el;
}

function cocokSelector(el, sel) {
  const m = sel.match(/^([a-zA-Z0-9_-]*)((?:\.[a-zA-Z0-9_-]+)*)((?:\[[^\]]+\])*)$/);
  if (!m) return false;
  const tag = m[1];
  if (tag && el.tagName !== tag) return false;
  const classes = (m[2].match(/\.[a-zA-Z0-9_-]+/g) || []).map((c) => c.slice(1));
  for (const c of classes) {
    const cl = (el.attrs.class || '').split(/\s+/);
    if (cl.indexOf(c) === -1) return false;
  }
  const attrParts = (m[3].match(/\[[^\]]+\]/g) || []);
  for (const ap of attrParts) {
    const am = ap.slice(1, -1).match(/^([a-zA-Z0-9_-]+)(?:="([^"]*)")?$/);
    if (!am) return false;
    const attr = am[1];
    const val = am[2];
    if (!(attr in el.attrs)) return false;
    if (val !== undefined && el.attrs[attr] !== val) return false;
  }
  return true;
}

function cariSemua(root, sel) {
  const hasil = [];
  (function jelajah(node) {
    node.children.forEach((c) => {
      if (cocokSelector(c, sel)) hasil.push(c);
      jelajah(c);
    });
  })(root);
  return hasil;
}

async function main() {
  /* ================= A. logika profil ================= */
  console.log('\nA. Logika profil (app.js)');
  {
    const w = muat();
    const P = w.LANJUT.profil;

    cek('kunci berversi', w.LANJUT.KUNCI_PROFIL === 'lanjut.profil.v1', w.LANJUT.KUNCI_PROFIL);
    cek('profil kosong -> baca() null', P.baca() === null);
    cek('profil kosong -> lengkap() false', P.lengkap() === false);

    /* Alur onboarding: kelas 12 + prodi teknik-informatika */
    const p1 = P.simpan({ kelas: '12', prodi_impian: 'teknik-informatika' });
    cek('simpan mengembalikan objek utuh',
        p1.kelas === '12' && p1.prodi_impian === 'teknik-informatika' && !!p1.dibuat_pada);
    cek('dibuat_pada format ISO', !Number.isNaN(Date.parse(p1.dibuat_pada)), p1.dibuat_pada);

    /* Inilah yang diminta: dibaca ulang di sesi berikutnya */
    const dibaca = P.baca();
    cek('bertahan lintas baca', dibaca.kelas === '12' && dibaca.prodi_impian === 'teknik-informatika');
    cek('lengkap() true setelah dua jawaban', P.lengkap() === true);

    /* Simpan sebagian tidak boleh menghapus kolom lain */
    P.simpan({ kelas: '11' });
    cek('simpan sebagian mempertahankan prodi_impian',
        P.baca().prodi_impian === 'teknik-informatika', JSON.stringify(P.baca()));
    cek('dibuat_pada tidak ditulis ulang', P.baca().dibuat_pada === p1.dibuat_pada);

    /* "belum" adalah jawaban sah (PRD F3), bukan kekosongan */
    P.simpan({ prodi_impian: 'belum' });
    cek('prodi_impian "belum" dianggap lengkap', P.lengkap() === true);
    cek('prodi_impian "belum" tersimpan apa adanya', P.baca().prodi_impian === 'belum');

    P.hapus();
    cek('hapus mengosongkan', P.baca() === null && P.lengkap() === false);
  }

  /* localStorage rusak / dimatikan tidak boleh melempar */
  console.log('\nA2. localStorage bermasalah');
  {
    const w = muat();
    w.localStorage.getItem = () => '{bukan json';
    cek('JSON rusak -> baca() null, tidak melempar', (() => {
      try { return w.LANJUT.profil.baca() === null; } catch (e) { return false; }
    })());

    const w2 = muat();
    w2.localStorage.setItem = () => { throw new Error('QuotaExceeded'); };
    cek('setItem gagal -> simpan() tidak melempar', (() => {
      try { w2.LANJUT.profil.simpan({ kelas: '12', prodi_impian: 'belum' }); return true; }
      catch (e) { return false; }
    })());

    const w3 = muat();
    w3.localStorage.getItem = () => { throw new Error('SecurityError'); };
    cek('getItem ditolak -> baca() null, tidak melempar', (() => {
      try { return w3.LANJUT.profil.baca() === null; } catch (e) { return false; }
    })());
  }

  /* ================= A3. Helper murni F10 (angkaRibuan, rasioKeketatan) ================= */
  console.log('\nA3. Helper murni F10 (SDD-F10-eksplorasi-tujuan.md §E.4)');
  {
    const w = muat();
    const angkaRibuan = w.LANJUT.angkaRibuan;
    const rasioKeketatan = w.LANJUT.rasioKeketatan;

    cek('angkaRibuan dibuka lewat LANJUT', typeof angkaRibuan === 'function');
    cek('angkaRibuan(5582) -> "5.582"', angkaRibuan(5582) === '5.582', angkaRibuan(5582));
    cek('angkaRibuan(43) -> "43" (tanpa titik)', angkaRibuan(43) === '43', angkaRibuan(43));
    cek('angkaRibuan(1000000) -> "1.000.000"', angkaRibuan(1000000) === '1.000.000', angkaRibuan(1000000));

    cek('rasioKeketatan dibuka lewat LANJUT', typeof rasioKeketatan === 'function');
    /* Kasus wajib: diterima null -> tanda pisah, BUKAN "0" atau string kosong
       (spec §3, DoD F10). */
    cek('rasioKeketatan(null, 1157) -> "—"', rasioKeketatan(null, 1157) === '—', rasioKeketatan(null, 1157));
    cek('rasioKeketatan(50, 0) -> "—" (peminat 0)', rasioKeketatan(50, 0) === '—', rasioKeketatan(50, 0));
    cek('rasioKeketatan(50, undefined) -> "—" (peminat kosong)', rasioKeketatan(50, undefined) === '—', rasioKeketatan(50, undefined));
    /* Kasus pembulatan satu desimal: 43/5582*100 = 0,77.. -> "0,8%" (data K3,
       SDD §C.2). */
    cek('rasioKeketatan(43, 5582) -> "0,8%"', rasioKeketatan(43, 5582) === '0,8%', rasioKeketatan(43, 5582));
    /* Data Ilmu Hukum: 287/4685*100 = 6,125..% -> dibulatkan "6,1%". */
    cek('rasioKeketatan(287, 4685) -> "6,1%"', rasioKeketatan(287, 4685) === '6,1%', rasioKeketatan(287, 4685));
  }

  /* ================= D. pasangChecklist() — kategori runtime (F10 §G.2, R1) ================= */
  console.log('\nD. pasangChecklist() — kategori runtime dari butir tambahan (SDD-F10-eksplorasi-tujuan.md §G.2, risiko R1)');
  {
    /* Markup checklist.html minimal, pola sama dengan berkas asli: wadah
       [data-daftar="kategori"] > prototipe kategori (h2[data-isi="nama"] +
       [data-daftar="butir"] > prototipe butir (input[type=checkbox] +
       [data-isi="judul"])). */
    const wadahKategori = elBuat('div');
    wadahKategori.setAttribute('data-daftar', 'kategori');
    const protoKategori = elBuat('section');
    const judulKategori = elBuat('h2');
    judulKategori.setAttribute('data-isi', 'nama');
    protoKategori.appendChild(judulKategori);
    const wadahButir = elBuat('div');
    wadahButir.setAttribute('data-daftar', 'butir');
    const protoButir = elBuat('li');
    const kotak = elBuat('input');
    kotak.setAttribute('type', 'checkbox');
    const judulButir = elBuat('span');
    judulButir.setAttribute('data-isi', 'judul');
    protoButir.appendChild(kotak);
    protoButir.appendChild(judulButir);
    wadahButir.appendChild(protoButir);
    protoKategori.appendChild(wadahButir);
    wadahKategori.appendChild(protoKategori);

    const slotJumlah = elBuat('span'); slotJumlah.setAttribute('data-isi', 'kemajuan-jumlah');
    const slotTotal = elBuat('span'); slotTotal.setAttribute('data-isi', 'kemajuan-total');
    const progresKosong = elBuat('p'); progresKosong.setAttribute('data-keadaan', 'progres-kosong'); progresKosong.hidden = true;
    const progresJalan = elBuat('p'); progresJalan.setAttribute('data-keadaan', 'progres-jalan'); progresJalan.hidden = true;
    const progresSelesai = elBuat('p'); progresSelesai.setAttribute('data-keadaan', 'progres-selesai'); progresSelesai.hidden = true;
    const bar = elBuat('div'); bar.setAttribute('role', 'progressbar');
    const isiBar = elBuat('div'); isiBar.attrs.class = 'progress__isi'; isiBar.style = {};
    bar.appendChild(isiBar);
    const galat = elBuat('div'); galat.setAttribute('data-keadaan', 'galat'); galat.hidden = true;

    const docRoot = elBuat('#document');
    [wadahKategori, slotJumlah, slotTotal, progresKosong, progresJalan, progresSelesai, bar, galat]
      .forEach((el) => docRoot.appendChild(el));
    docRoot.createDocumentFragment = () => elBuat('#fragment');
    docRoot.body = { getAttribute: (k) => (k === 'data-peran' ? 'checklist' : null) };

    /* Data checklist.json SUNGGUHAN (bukan tiruan) — supaya total_butir yang
       diuji cocok dengan isi berkas yang sesungguhnya dipakai halaman. */
    const checklistData = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/checklist.json'), 'utf8'));

    const win = {
      localStorage: (() => {
        const simpanan = new Map();
        return {
          getItem: (k) => (simpanan.has(k) ? simpanan.get(k) : null),
          setItem: (k, v) => simpanan.set(k, String(v)),
          removeItem: (k) => simpanan.delete(k),
        };
      })(),
      location: { href: '', search: '', replace(u) { this.href = u; } },
      setTimeout: () => 0,
      clearTimeout: () => {},
      fetch: () => Promise.resolve({ ok: true, json: () => Promise.resolve(checklistData) }),
    };
    win.window = win;
    win.document = docRoot;

    vm.createContext(win);
    vm.runInContext(kode, win);

    /* Simpan butir "Riset Kampus" SEBELUM halaman dirender — meniru tombol
       "Simpan ke Daftar Periksa" di F10 yang sudah ditekan pengguna di sesi
       sebelumnya (ChecklistTambahan, kunci lanjut.checklist.tambahan.v1). */
    win.LANJUT.checklistTambahan.tambah({
      id: 'riset-kampus-farmasi',
      kategori: 'Riset Kampus',
      teks: 'Cari tahu lebih lanjut soal Farmasi',
      berlaku_untuk_kelas: ['10', '11', '12'],
    });

    /* Picu 'DOMContentLoaded' yang didaftarkan app.js di baris terakhirnya —
       sama seperti browser sungguhan memanggilnya setelah skrip defer
       selesai — supaya mulai() -> pasangChecklist() benar-benar berjalan. */
    const pendengar = docRoot._listeners.DOMContentLoaded || [];
    pendengar.forEach((fn) => fn());

    /* pasangChecklist() memanggil muatData('checklist'), yang mengantre
       beberapa microtask berantai (fetch -> .then -> .json() -> .then -> ...)
       sebelum akhirnya me-render. Menunggu satu giliran macrotask (setImmediate)
       menjamin SELURUH microtask yang tertunda sudah selesai diproses lebih
       dulu — beda dengan menunggu satu/dua Promise.resolve() yang jumlah
       giliran mikronya gampang meleset kalau rantai .then() di muatData()
       berubah panjangnya nanti. */
    await new Promise((resolve) => { setImmediate(resolve); });

    const totalButirAsli = checklistData.kategori.reduce((n, k) => n + k.butir.length, 0);

    const seksiRuntime = wadahKategori.children.filter((k) => {
      const j = k.querySelector('[data-isi="nama"]');
      return j && j.textContent === 'Riset Kampus';
    });
    cek('kategori runtime "Riset Kampus" dirender sebagai seksi baru di akhir daftar',
        seksiRuntime.length === 1, 'ditemukan ' + seksiRuntime.length);

    if (seksiRuntime.length === 1) {
      const butirRuntime = seksiRuntime[0].querySelectorAll('[data-isi="judul"]');
      cek('seksi "Riset Kampus" berisi 1 butir', butirRuntime.length === 1, 'ditemukan ' + butirRuntime.length);
      cek('teks butir sesuai ChecklistTambahan.tambah()',
          !!butirRuntime[0] && butirRuntime[0].textContent === 'Cari tahu lebih lanjut soal Farmasi',
          butirRuntime[0] && butirRuntime[0].textContent);
    }

    cek('total kemajuan ("X dari Y beres") ikut bertambah 1 — kategori runtime terhitung',
        slotTotal.textContent === String(totalButirAsli + 1),
        'kemajuan-total=' + slotTotal.textContent + ', harusnya ' + (totalButirAsli + 1));
  }

  /* ================= B. kontrak selector ================= */
  console.log('\nB. Kontrak selector app.js <-> HTML');
  {
    const html = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

    /* app.js mencabang lewat <body data-peran>. Tiap peran yang ditangani
       harus benar-benar dipakai oleh satu halaman. */
    const peranDitangani = ['splash', 'onboarding', 'pilih-mapel', 'eksplorasi-tujuan'];
    const peranDiHalaman = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'))
      .map((f) => ({ f, p: (html(f).match(/data-peran="([^"]+)"/) || [])[1] }));
    peranDitangani.forEach((p) => {
      const ada = peranDiHalaman.find((x) => x.p === p);
      cek('peran "' + p + '" dipakai satu halaman', !!ada, 'tidak ada halaman dengan data-peran="' + p + '"');
    });

    /* onboarding.html harus punya seluruh hook yang app.js cari */
    const ob = html('onboarding.html');
    [['[data-slide]', /data-slide="/],
     ['[data-aksi="lanjut"]', /data-aksi="lanjut"/],
     ['[data-aksi="lewati"]', /data-aksi="lewati"/],
     ['[data-aksi="simpan-profil"]', /data-aksi="simpan-profil"/],
     ['[data-slide="tanya"]', /data-slide="tanya"/],
     ['.langkah-titik span', /class="langkah-titik"/],
     ['[data-grup="kelas"]', /data-grup="kelas"/],
     ['[data-grup="prodi"]', /data-grup="prodi"/],
    ].forEach(([nama, re]) => cek('onboarding.html punya ' + nama, re.test(ob)));

    /* jumlah titik langkah harus sama dengan jumlah layar cerita */
    const layarCerita = (ob.match(/data-slide="\d"/g) || []).length;
    const titik = ((ob.match(/<div class="langkah-titik"[^>]*>([\s\S]*?)<\/div>/) || [])[1] || '')
      .match(/<span/g) || [];
    cek('titik langkah = layar cerita (' + titik.length + ' vs ' + layarCerita + ')',
        titik.length === layarCerita);

    /* tiap data-nilai prodi di onboarding harus id yang ada di prodi.json,
       atau "belum" */
    const prodi = JSON.parse(html('data/prodi.json'));
    const idSah = new Set([...prodi.data.map((p) => p.id), 'belum']);
    const dipakai = [...ob.matchAll(/data-grup="prodi" data-nilai="([^"]+)"/g)].map((m) => m[1]);
    const asing = dipakai.filter((v) => !idSah.has(v));
    cek('semua data-nilai prodi cocok dengan prodi.json (' + dipakai.length + ' keping)',
        asing.length === 0, asing.join(', '));

    const kelas = [...ob.matchAll(/data-grup="kelas" data-nilai="([^"]+)"/g)].map((m) => m[1]);
    cek('keping kelas = 10/11/12', JSON.stringify(kelas) === '["10","11","12"]', kelas.join(','));

    /* pilih-mapel.html harus punya wadah + dua slot yang diisi app.js */
    const pm = html('pilih-mapel.html');
    cek('pilih-mapel.html punya [data-profil-tersimpan]', /data-profil-tersimpan/.test(pm));
    cek('pilih-mapel.html punya [data-isi="kelas"]', /data-isi="kelas"/.test(pm));
    cek('pilih-mapel.html punya [data-isi="prodi"]', /data-isi="prodi"/.test(pm));
    cek('wadah profil mulai hidden', /data-profil-tersimpan hidden/.test(pm));

    /* CTA F10 "Lihat prospek & kampus untuk [prodi]" (SDD-F10 §G.1) — diisi
       tampilkanHasil() lewat [data-aksi="lihat-eksplorasi"] + [data-isi="prodi-nama"]
       DI DALAM kartu itu. Kalau ui-engineer belum menambahkan CTA-nya, ini
       gagal dengan pesan yang jelas (bukan diam-diam tidak terhubung). */
    cek('pilih-mapel.html punya [data-aksi="lihat-eksplorasi"] (CTA F10)',
        /data-aksi="lihat-eksplorasi"/.test(pm));

    /* Konsistensi silang data F10 (SDD §I DoD): tiap id di prodi.json
       (kecuali teknik-elektro yang sengaja dibiarkan tanpa profil F10 —
       SDD §D.4) harus ada di profil-prodi.json dengan nama yang sama
       persis; tiap prodi_id di prodi-mapel.json harus ada di prodi.json. */
    const profilProdi = JSON.parse(html('data/profil-prodi.json'));
    const prodiMapel = JSON.parse(html('data/prodi-mapel.json'));
    const profilById = {};
    profilProdi.data.forEach((p) => { profilById[p.id] = p; });
    const prodiIds = new Set(prodi.data.map((p) => p.id));

    const tanpaProfil = prodi.data.filter((p) => p.id !== 'teknik-elektro' && !profilById[p.id]);
    cek('semua prodi (kecuali teknik-elektro) punya profil di profil-prodi.json',
        tanpaProfil.length === 0, tanpaProfil.map((p) => p.id).join(', '));

    const namaBeda = prodi.data.filter((p) => profilById[p.id] && profilById[p.id].nama !== p.nama);
    cek('nama prodi sama persis antara prodi.json dan profil-prodi.json',
        namaBeda.length === 0, namaBeda.map((p) => p.id).join(', '));

    const prodiIdAsing = prodiMapel.data.filter((r) => !prodiIds.has(r.prodi_id));
    cek('semua prodi_id di prodi-mapel.json ada di prodi.json',
        prodiIdAsing.length === 0, [...new Set(prodiIdAsing.map((r) => r.prodi_id))].join(', '));

    const prodiTanpaMapel = prodi.data.filter((p) => !prodiMapel.data.some((r) => r.prodi_id === p.id));
    cek('semua prodi di prodi.json punya baris di prodi-mapel.json (R2)',
        prodiTanpaMapel.length === 0, prodiTanpaMapel.map((p) => p.id).join(', '));
  }

  /* ================= C. kontrak selector levelin.js <-> HTML ================= */
  console.log('\nC. Kontrak selector levelin.js <-> HTML (SDD-LevelIn.md §5.4)');
  {
    const html = (f) => fs.readFileSync(path.join(ROOT, f), 'utf8');

    /* latihan.html — pemilih keyakinan (FL1) + strip pembanding gap (FL2),
       hook yang benar-benar dicari pasangKeyakinan()/pasangPembandingGap().
       Komentar dibuang lebih dulu supaya hitungan chip tidak ikut menghitung
       penyebutan nama kelas di dalam komentar kontrak levelin.js. */
    const lat = html('latihan.html').replace(/<!--[\s\S]*?-->/g, '');
    [
      ['.levelin-confidence-section', /class="[^"]*levelin-confidence-section/],
      ['.levelin-confidence-chip (5 buah)', /class="[^"]*\blevelin-confidence-chip\b/g, 5],
      ['.levelin-confidence-arti', /class="[^"]*levelin-confidence-arti/],
      ['.levelin-confidence-hint', /class="[^"]*levelin-confidence-hint/],
      ['[data-aksi="lihat-jawaban"]', /data-aksi="lihat-jawaban"/],
      ['.levelin-gap-strip', /class="[^"]*levelin-gap-strip/],
      ['[data-varian-isi="overconfident"]', /data-varian-isi="overconfident"/],
      ['[data-varian-isi="underconfident"]', /data-varian-isi="underconfident"/],
      ['[data-varian-isi="selaras"]', /data-varian-isi="selaras"/],
      ['[data-varian-isi="netral"]', /data-varian-isi="netral"/],
      ['[data-isi="gap-oc-tingkat"]', /data-isi="gap-oc-tingkat"/],
      ['[data-isi="gap-oc-mapel"]', /data-isi="gap-oc-mapel"/],
      ['[data-isi="gap-uc-tingkat"]', /data-isi="gap-uc-tingkat"/],
      ['[data-isi="gap-sl-tingkat"]', /data-isi="gap-sl-tingkat"/],
    ].forEach(([nama, re, jumlah]) => {
      if (jumlah) {
        const n = (lat.match(re) || []).length;
        cek('latihan.html punya ' + nama, n === jumlah, 'ditemukan ' + n);
      } else {
        cek('latihan.html punya ' + nama, re.test(lat));
      }
    });

    /* latihan-selesai.html — strip pembanding gap (kartu terakhir sesi) +
       ringkasan kalibrasi (FL6), hook yang dicari pasangRingkasanSesi(). */
    const selesai = html('latihan-selesai.html');
    [
      ['.levelin-gap-strip', /class="[^"]*levelin-gap-strip/],
      ['.levelin-summary-block[data-varian="penuh"]', /levelin-summary-block" data-varian="penuh"/],
      ['.levelin-summary-block[data-varian="kosong"]', /levelin-summary-block" data-varian="kosong"/],
      ['[data-isi="ringkasan-overconfident"]', /data-isi="ringkasan-overconfident"/],
      ['[data-isi="ringkasan-underconfident"]', /data-isi="ringkasan-underconfident"/],
      /* Skor sesi (LANJUT_014) — slot yang diisi pasangSkorSesi(). */
      ['[data-isi="skor-total"]', /data-isi="skor-total"/],
      ['[data-isi="skor-benar"]', /data-isi="skor-benar"/],
      ['[data-daftar="skor-mapel"]', /data-daftar="skor-mapel"/],
      ['[data-proto="skor-mapel"]', /data-proto="skor-mapel"/],
    ].forEach(([nama, re]) => cek('latihan-selesai.html punya ' + nama, re.test(selesai)));

    /* Skor contoh dulu tertulis tetap di markup ("12", "9 benar dari 12",
       "5/6") dan tampil apa pun hasil sesinya. Di luar komentar, angka skor
       hanya boleh datang dari levelin.js. */
    const selesaiTanpaKomentar = selesai.replace(/<!--[\s\S]*?-->/g, '');
    cek('latihan-selesai.html tidak menulis skor tetap ("N benar dari M")',
        !/\d+\s+benar dari\s+\d+/.test(selesaiTanpaKomentar));

    /* beranda.html — kartu CTA "Latihan Hari Ini" (FL4), hook yang dicari
       pasangSaranBeranda()/renderSaranBeranda(). */
    const brd = html('beranda.html');
    [
      ['.levelin-cta-card', /class="levelin-cta-card"/],
      ['[data-jenis-isi="saran"]', /data-jenis-isi="saran"/],
      ['[data-jenis-isi="kalibrasi_selaras"]', /data-jenis-isi="kalibrasi_selaras"/],
      ['[data-jenis-isi="belum_cukup_data"]', /data-jenis-isi="belum_cukup_data"/],
      ['[data-jenis-isi="pengguna_baru"]', /data-jenis-isi="pengguna_baru"/],
      ['[data-jenis-isi="arsip_kosong"]', /data-jenis-isi="arsip_kosong"/],
      ['[data-isi="cta-saran-mapel"]', /data-isi="cta-saran-mapel"/],
      ['[data-jenis-tombol="mulai"]', /data-jenis-tombol="mulai"/],
      ['[data-jenis-tombol="arsip"]', /data-jenis-tombol="arsip"/],
    ].forEach(([nama, re]) => cek('beranda.html punya ' + nama, re.test(brd)));

    /* Keempat halaman yang SDD-LevelIn.md §5.3 rancang untuk memuat
       assets/levelin.js wajib benar-benar memuatnya (defer, setelah app.js). */
    ['beranda.html', 'latihan.html', 'latihan-selesai.html', 'arsip.html'].forEach((f) => {
      cek(f + ' memuat assets/levelin.js', /assets\/levelin\.js/.test(html(f)));
    });
  }

  console.log('\n' + (gagal === 0 ? 'SEMUA LOLOS' : gagal + ' MASALAH'));
  process.exit(gagal === 0 ? 0 : 1);
}

main();
