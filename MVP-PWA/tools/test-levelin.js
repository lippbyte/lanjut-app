/* Menguji fungsi murni Level-In: gapNumerik, klasifikasiKartu, agregatPerMapel,
   ringkasSesi, saranHarian. SDD-LevelIn.md §5.4.

   Tanpa jsdom: levelin.js dijalankan dengan shim window seminimal mungkin.
   Yang diuji logikanya saja — klasifikasi, agregasi, saran, dan error handling. */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = process.argv[2];
let gagal = 0;
const cek = (nama, syarat, detail) => {
  if (syarat) { console.log('   ok   ' + nama); }
  else { console.log('   GAGAL ' + nama + (detail ? ' — ' + detail : '')); gagal++; }
};

/* ---------- shim window seminimal mungkin ---------- */
function bikinWindow() {
  const simpanan = new Map();
  const storage = {
    getItem: (k) => (simpanan.has(k) ? simpanan.get(k) : null),
    setItem: (k, v) => simpanan.set(k, String(v)),
    removeItem: (k) => simpanan.delete(k),
    clear: () => simpanan.clear(),
  };
  const win = {
    localStorage: storage,
    sessionStorage: storage,
    crypto: { randomUUID: () => null },
    location: { href: '', replace(u) { this.href = u; } },
    setTimeout: () => 0,
    clearTimeout: () => {},
    Math: global.Math,
  };
  win.window = win;
  win.document = {
    readyState: 'complete',
    body: { getAttribute: () => null },
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
  };
  return win;
}

const kode = fs.readFileSync(path.join(ROOT, 'assets/levelin.js'), 'utf8');
function muat() {
  const win = bikinWindow();
  vm.createContext(win);
  vm.runInContext(kode, win);
  return win;
}

/* ========== UNJI FUNGSI ========== */

console.log('\nG. gapNumerik — transformasi keyakinan & benar → gap');
(() => {
  const win = muat();
  const fn = win.LANJUT_LEVELIN.gapNumerik;

  cek('keyakinan 1, benar: gap = -1', fn(1, true) === -1);
  cek('keyakinan 5, benar: gap = 0', fn(5, true) === 0);
  cek('keyakinan 3, salah: gap = 0.5', fn(3, false) === 0.5);
  cek('keyakinan 2, salah: gap = 0.25', fn(2, false) === 0.25);
  cek('keyakinan null: null (tidak dihitung)', fn(null, true) === null);
})();

console.log('\nH. klasifikasiKartu — 5 kelas (OC/UC/selaras/netral)');
(() => {
  const win = muat();
  const fn = win.LANJUT_LEVELIN.klasifikasiKartu;
  const cfg = win.LANJUT_LEVELIN.KONFIG_BAWAAN;

  /* Keyakinan 1-2, benar -> underconfident. */
  cek('K=1, benar: underconfident', fn(1, true, cfg) === 'underconfident');
  cek('K=2, benar: underconfident', fn(2, true, cfg) === 'underconfident');

  /* Keyakinan 4-5, salah -> overconfident. */
  cek('K=4, salah: overconfident', fn(4, false, cfg) === 'overconfident');
  cek('K=5, salah: overconfident', fn(5, false, cfg) === 'overconfident');

  /* Keyakinan 3 -> netral (apa pun). */
  cek('K=3, benar: netral', fn(3, true, cfg) === 'netral');
  cek('K=3, salah: netral', fn(3, false, cfg) === 'netral');

  /* Selaras: sisanya. Kombinasi lengkap 1-5 x benar/salah (10 kombinasi) —
     sebelumnya K=5,benar dan K=2,salah belum diuji sama sekali (8/10). */
  cek('K=1, salah: selaras', fn(1, false, cfg) === 'selaras');
  cek('K=2, salah: selaras', fn(2, false, cfg) === 'selaras');
  cek('K=4, benar: selaras', fn(4, true, cfg) === 'selaras');
  cek('K=5, benar: selaras', fn(5, true, cfg) === 'selaras');

  /* Null -> null. */
  cek('K=null: null', fn(null, true, cfg) === null);
})();

console.log('\nI. agregatPerMapel — rate & status_data & pola');
(() => {
  const win = muat();
  const fn = win.LANJUT_LEVELIN.agregatPerMapel;
  const cfg = win.LANJUT_LEVELIN.KONFIG_BAWAAN;

  /* Uji 1: 5 kartu, 2 OC -> rate 0.40, status cukup_data, pola OC. */
  const data1 = [
    { mapel_id: 'mtk', keyakinan: 4, benar: false },
    { mapel_id: 'mtk', keyakinan: 4, benar: false },
    { mapel_id: 'mtk', keyakinan: 2, benar: true },
    { mapel_id: 'mtk', keyakinan: 3, benar: true },
    { mapel_id: 'mtk', keyakinan: 1, benar: false },
  ];
  const agg1 = fn(data1, cfg);
  cek('rate = 2/5 = 0.40 (boundary)', agg1.mtk.rate_overconfident === 0.4);
  cek('status_data = cukup_data', agg1.mtk.status_data === 'cukup_data');
  cek('pola = overconfident (rate >= ambang)', agg1.mtk.pola === 'overconfident');

  /* Uji 2: 5 kartu, 1 OC -> rate 0.20 < 0.40, pola selaras. */
  const data2 = [
    { mapel_id: 'bing', keyakinan: 4, benar: false },
    { mapel_id: 'bing', keyakinan: 2, benar: true },
    { mapel_id: 'bing', keyakinan: 5, benar: true },
    { mapel_id: 'bing', keyakinan: 1, benar: false },
    { mapel_id: 'bing', keyakinan: 3, benar: true },
  ];
  const agg2 = fn(data2, cfg);
  cek('rate < ambang -> pola selaras', agg2.bing.pola === 'selaras');

  /* Uji 3: 4 kartu (< minimum 5) -> belum_cukup_data. */
  const data3 = [
    { mapel_id: 'ind', keyakinan: 4, benar: false },
    { mapel_id: 'ind', keyakinan: 4, benar: false },
    { mapel_id: 'ind', keyakinan: 2, benar: true },
    { mapel_id: 'ind', keyakinan: 1, benar: false },
  ];
  const agg3 = fn(data3, cfg);
  cek('4 kartu < 5 minimum -> belum_cukup_data', agg3.ind.status_data === 'belum_cukup_data');
  cek('pola belum_cukup_data', agg3.ind.pola === 'belum_cukup_data');

  /* Uji 4: keyakinan null tidak dihitung. */
  const data4 = [
    { mapel_id: 'fis', keyakinan: 4, benar: false },
    { mapel_id: 'fis', keyakinan: null, benar: true },  // tidak dihitung
    { mapel_id: 'fis', keyakinan: 4, benar: false },
    { mapel_id: 'fis', keyakinan: 2, benar: true },
    { mapel_id: 'fis', keyakinan: 1, benar: false },
  ];
  const agg4 = fn(data4, cfg);
  cek('keyakinan null tidak ikut kartu_dikerjakan', agg4.fis.kartu_dikerjakan === 4);

  /* Uji 5: rate 3/5 = 0.60 (> 0.40) -> pola overconfident. Kasus tambahan,
     bukan kasus batas 0.399 (lihat Uji 6 di bawah untuk itu). */
  const data5 = [
    { mapel_id: 'kim', keyakinan: 4, benar: false },  // OC
    { mapel_id: 'kim', keyakinan: 4, benar: false },  // OC
    { mapel_id: 'kim', keyakinan: 4, benar: false },  // OC
    { mapel_id: 'kim', keyakinan: 2, benar: true },   // UC
    { mapel_id: 'kim', keyakinan: 1, benar: false },  // Selaras
  ];
  const agg5 = fn(data5, cfg);
  cek('rate 3/5 = 0.60 -> pola overconfident', agg5.kim.pola === 'overconfident');

  /* Uji 6: rate TEPAT 0.399 (< 0.40) -> selaras, bukan overconfident. Dengan
     jendela bawaan (50) mustahil membuat rate persis 0.399 (butuh
     penyebut kelipatan 1000: 399/1000), jadi jendela_per_mapel dilonggarkan
     KHUSUS untuk kasus uji batas ini lewat cfg turunan — bukan mengubah
     KONFIG_BAWAAN. Perbandingan yang diuji (`>=` bukan `>`) sama persis
     dengan yang dipakai produksi. */
  const cfgJendelaBesar = JSON.parse(JSON.stringify(cfg));
  cfgJendelaBesar.ambang.jendela_per_mapel = 1000;
  const data6 = [];
  for (let i = 0; i < 399; i++) data6.push({ mapel_id: 'bio', keyakinan: 4, benar: false }); // OC
  for (let i = 0; i < 601; i++) data6.push({ mapel_id: 'bio', keyakinan: 1, benar: false }); // selaras
  const agg6 = fn(data6, cfgJendelaBesar);
  cek('rate tepat 0.399 (399/1000)', Math.abs(agg6.bio.rate_overconfident - 0.399) < 1e-9,
      'rate=' + agg6.bio.rate_overconfident);
  cek('rate 0.399 < ambang 0.40 -> pola selaras (bukan overconfident)',
      agg6.bio.pola === 'selaras');

  /* Uji 7: mapel tanpa peristiwa sama sekali TETAP muncul di keluaran
     (SDD §6.1c, AC FL3) — sebelumnya mapel seperti ini hilang total dari
     objek hasil `agregatPerMapel()`. */
  const data7 = [
    { mapel_id: 'mtk', keyakinan: 4, benar: false },
  ];
  const agg7 = fn(data7, cfg, ['mtk', 'bing', 'kosong-total']);
  cek('mapel tanpa peristiwa tetap ada di keluaran', !!agg7['kosong-total']);
  cek('status_data belum_cukup_data untuk mapel tanpa peristiwa',
      agg7['kosong-total'] && agg7['kosong-total'].status_data === 'belum_cukup_data');
  cek('rate_overconfident null (bukan 0) untuk mapel tanpa peristiwa',
      agg7['kosong-total'] && agg7['kosong-total'].rate_overconfident === null);
  cek('kartu_dikerjakan 0 untuk mapel tanpa peristiwa',
      agg7['kosong-total'] && agg7['kosong-total'].kartu_dikerjakan === 0);
  cek('mapel dengan peristiwa (mtk) tidak ikut dianggap kosong',
      agg7.mtk && agg7.mtk.kartu_dikerjakan === 1);

  /* Uji 8: window pruning murni (fungsi agregatPerMapel saja, tanpa
     storage) — jendela_per_mapel membatasi berapa banyak peristiwa TERAKHIR
     per mapel yang ikut dihitung, walau peristiwa mentahnya lebih banyak. */
  const cfgJendelaKecil = JSON.parse(JSON.stringify(cfg));
  cfgJendelaKecil.ambang.jendela_per_mapel = 5;
  const data8 = [];
  for (let i = 0; i < 20; i++) data8.push({ mapel_id: 'geo', keyakinan: 4, benar: false }); // 20 OC
  data8.push({ mapel_id: 'geo', keyakinan: 1, benar: false }); // 1 selaras TERAKHIR
  const agg8 = fn(data8, cfgJendelaKecil);
  cek('hanya 5 peristiwa terakhir yang dihitung (jendela=5)',
      agg8.geo.kartu_dikerjakan === 5, 'kartu_dikerjakan=' + agg8.geo.kartu_dikerjakan);
  cek('peristiwa terakhir (selaras) ikut jendela, menurunkan rate OC dari 1.00',
      agg8.geo.rate_overconfident === 0.8, 'rate=' + agg8.geo.rate_overconfident);
})();

console.log('\nJ. ringkasSesi — hitung per-kelas dalam satu sesi');
(() => {
  const win = muat();
  const fn = win.LANJUT_LEVELIN.ringkasSesi;

  const sesi = [
    { keyakinan: 4, benar: false },  // OC
    { keyakinan: 1, benar: true },   // UC
    { keyakinan: 3, benar: true },   // netral
    { keyakinan: 5, benar: true },   // selaras
    { keyakinan: 2, benar: false },  // selaras
  ];
  const ringkas = fn(sesi);

  cek('total = 5', ringkas.total === 5);
  cek('benar = 3', ringkas.benar === 3);
  cek('overconfident = 1', ringkas.overconfident === 1);
  cek('underconfident = 1', ringkas.underconfident === 1);
  cek('netral = 1', ringkas.netral === 1);
  cek('selaras = 2', ringkas.selaras === 2);
})();

console.log('\nK. saranHarian — rantai fallback 5 tingkat');
(() => {
  const win = muat();
  const fn = win.LANJUT_LEVELIN.saranHarian;
  const cfg = win.LANJUT_LEVELIN.KONFIG_BAWAAN;

  /* Fallback 1: arsip kosong. */
  const saran1 = fn({}, {}, cfg);
  cek('fallback 1: arsip_kosong', saran1.jenis === 'arsip_kosong');

  /* Fallback 2: ada overconfident. */
  const agregat2 = {
    mtk: { pola: 'overconfident', rate_overconfident: 0.5, kartu_dikerjakan: 10 },
    bing: { pola: 'selaras', rate_overconfident: 0.2, kartu_dikerjakan: 5 },
  };
  const ketersediaan2 = { mtk: 5, bing: 3 };
  const saran2 = fn(agregat2, ketersediaan2, cfg);
  cek('fallback 2: saran dengan mapel_id', saran2.jenis === 'saran' && saran2.mapel_id === 'mtk');

  /* Fallback 3: ada mapel cukup_data, tapi tidak ada yang overconfident
     -> kalibrasi_selaras. Sebelumnya belum diuji sama sekali. */
  const agregat3 = {
    mtk: { pola: 'selaras', status_data: 'cukup_data', rate_overconfident: 0.1, kartu_dikerjakan: 8 },
  };
  const ketersediaan3 = { mtk: 5 };
  const saran3 = fn(agregat3, ketersediaan3, cfg);
  cek('fallback 3: kalibrasi_selaras', saran3.jenis === 'kalibrasi_selaras');

  /* Fallback 4: ada riwayat, tapi SEMUA mapel belum_cukup_data
     -> belum_cukup_data, dengan mapel dipilih dari kartu_dikerjakan
     terbanyak. Sebelumnya belum diuji sama sekali. */
  const agregat4 = {
    mtk: { pola: 'belum_cukup_data', status_data: 'belum_cukup_data', rate_overconfident: null, kartu_dikerjakan: 2 },
    bing: { pola: 'belum_cukup_data', status_data: 'belum_cukup_data', rate_overconfident: null, kartu_dikerjakan: 4 },
  };
  const ketersediaan4 = { mtk: 5, bing: 5 };
  const saran4 = fn(agregat4, ketersediaan4, cfg);
  cek('fallback 4: belum_cukup_data', saran4.jenis === 'belum_cukup_data');
  cek('fallback 4: mapel dgn kartu_dikerjakan terbanyak (bing=4 > mtk=2)',
      saran4.mapel_id === 'bing');

  /* Fallback 5: pengguna baru (no history). */
  const ketersediaan5 = { mtk: 5, bing: 3 };
  const saran5 = fn({}, ketersediaan5, cfg);
  cek('fallback 5: pengguna_baru', saran5.jenis === 'pengguna_baru');
})();

console.log('\nL. Tie-break saran — konsistensi urutan');
(() => {
  const win = muat();
  const fn = win.LANJUT_LEVELIN.saranHarian;
  const cfg = win.LANJUT_LEVELIN.KONFIG_BAWAAN;

  /* Dua mapel dengan rate sama -> urutan mapel_id ASC. */
  const agregat = {
    bing: { pola: 'overconfident', rate_overconfident: 0.5, kartu_dikerjakan: 5 },
    mtk: { pola: 'overconfident', rate_overconfident: 0.5, kartu_dikerjakan: 5 },
  };
  const ketersediaan = { mtk: 5, bing: 3 };
  const saran = fn(agregat, ketersediaan, cfg);
  cek('rate sama -> mapel_id ASC (bing < mtk)', saran.mapel_id === 'bing');
})();

/* ---------- shim window dengan dukungan event window + body[data-peran] ----------
   Dipakai Lapisan 3/4 (Kalibrasi/Sesi/pasangX) yang SENGAJA tidak diekspor
   (SDD §5.2) — diuji secara TIDAK LANGSUNG lewat kontrak DOM/event publiknya
   sendiri (dispatch 'levelin:jawaban-dicatat' dkk, lalu periksa efek sampingnya
   di localStorage/sessionStorage), bukan dengan mengekspornya secara paksa. */
function bikinWindowPeran(peran, elemenTambahan) {
  const win = bikinWindow();
  const pendengar = {};

  win.addEventListener = (tipe, fn) => { (pendengar[tipe] = pendengar[tipe] || []).push(fn); };
  win.dispatchEvent = (evt) => { (pendengar[evt.type] || []).forEach((fn) => fn(evt)); };
  win.window = win;

  /* bikinWindow() menyetel crypto.randomUUID() supaya SELALU mengembalikan
     null (dipakai G-L untuk memastikan levelin.js tidak melempar walau
     crypto "ada tapi rusak"). buatId() memakai nilai itu apa adanya sebagai
     id — cocok untuk tes G-L yang tidak pernah memeriksa isi id, tapi salah
     untuk tes N/O di bawah yang justru memeriksa id sungguhan (sesi_id,
     kartu_id tersimpan). Di sini crypto dihapus supaya buatId() jatuh ke
     jalur cadangan (prefiks + Date.now() + acak) yang SDD §3.4 memang
     rancang untuk kasus randomUUID tidak tersedia. */
  delete win.crypto;

  const elemen = elemenTambahan || {};
  win.document = {
    readyState: 'complete',
    referrer: '',
    body: { getAttribute: (k) => (k === 'data-peran' ? peran : null) },
    addEventListener: () => {},
    querySelector: (sel) => (Object.prototype.hasOwnProperty.call(elemen, sel) ? elemen[sel] : null),
    querySelectorAll: (sel) => (Object.prototype.hasOwnProperty.call(elemen, sel) ? elemen[sel] : []),
  };
  return win;
}

function fakeEl(overrides) {
  const attrs = {};
  return Object.assign({
    hidden: true,
    getAttribute: (n) => (attrs[n] !== undefined ? attrs[n] : null),
    setAttribute: (n, v) => { attrs[n] = String(v); },
    removeAttribute: (n) => { delete attrs[n]; },
    addEventListener: () => {},
    querySelector: () => null,
    querySelectorAll: () => [],
  }, overrides || {});
}

console.log('\nM. Error handling — localStorage/sessionStorage rusak atau ditolak tidak melempar');
(() => {
  /* M1: getItem selalu throw (mis. akses ditolak browser). */
  const win1 = bikinWindowPeran('latihan');
  win1.localStorage.getItem = () => { throw new Error('SecurityError'); };
  win1.sessionStorage.getItem = () => { throw new Error('SecurityError'); };
  vm.createContext(win1);
  cek('getItem selalu throw -> vm.runInContext tidak melempar', (() => {
    try { vm.runInContext(kode, win1); return true; } catch (e) { return false; }
  })());
  cek('dispatch jawaban-dicatat tetap tidak melempar walau getItem throw', (() => {
    try {
      win1.dispatchEvent({ type: 'levelin:jawaban-dicatat',
        detail: { kartu_id: 'k1', mapel_id: 'mtk', keyakinan: 4, benar: false } });
      return true;
    } catch (e) { return false; }
  })());

  /* M2: setItem selalu throw (kuota penuh / mode penyamaran). */
  const win2 = bikinWindowPeran('latihan');
  win2.localStorage.setItem = () => { throw new Error('QuotaExceededError'); };
  vm.createContext(win2);
  vm.runInContext(kode, win2);
  cek('dispatch jawaban-dicatat tidak melempar walau setItem (localStorage) penuh', (() => {
    try {
      win2.dispatchEvent({ type: 'levelin:jawaban-dicatat',
        detail: { kartu_id: 'k1', mapel_id: 'mtk', keyakinan: 4, benar: false } });
      return true;
    } catch (e) { return false; }
  })());

  /* M3: JSON riwayat rusak (bukan hasil getItem yang throw, tapi ISI-nya
     korup) -> diperlakukan sebagai kosong (SDD §6.6), lalu SEMBUH SENDIRI
     begitu ada penulisan berikutnya (bukan ditimpa diam-diam sebelum itu). */
  const win3 = bikinWindowPeran('latihan');
  vm.createContext(win3);
  vm.runInContext(kode, win3);
  const KUNCI_RIWAYAT = win3.LANJUT_LEVELIN.KUNCI_RIWAYAT;
  win3.localStorage.setItem(KUNCI_RIWAYAT, '{bukan json valid');
  let tidakMelempar = true;
  try {
    win3.dispatchEvent({ type: 'levelin:jawaban-dicatat',
      detail: { kartu_id: 'k1', mapel_id: 'mtk', keyakinan: 4, benar: false } });
  } catch (e) { tidakMelempar = false; }
  cek('JSON riwayat korup -> dispatch tidak melempar', tidakMelempar);
  const setelahTulis = JSON.parse(win3.localStorage.getItem(KUNCI_RIWAYAT));
  cek('setelah penulisan berikutnya, riwayat sembuh jadi JSON sah dgn 1 peristiwa',
      Array.isArray(setelahTulis.peristiwa) && setelahTulis.peristiwa.length === 1,
      JSON.stringify(setelahTulis));
})();

console.log('\nN. Siklus hidup sesi — Sesi.mulai/Kalibrasi.catat/Sesi.tutup benar-benar menyala');
(() => {
  /* N1: landing di halaman peran "latihan" (chip + section tersedia di DOM)
     otomatis MEMULAI sesi — sebelumnya pasangKeyakinan() early-return kalau
     belum ada sesi, jadi Sesi.mulai() tidak pernah terpanggil sama sekali. */
  const chip1 = fakeEl();
  const elemenLatihan = {
    '.levelin-confidence-chip': [chip1],
    '.levelin-confidence-arti': fakeEl({ querySelectorAll: () => [] }),
    '[data-aksi="lihat-jawaban"]': fakeEl(),
    '.levelin-confidence-hint': fakeEl(),
    '.levelin-confidence-section': fakeEl(),
    '.levelin-gap-strip': null,
  };
  const win1 = bikinWindowPeran('latihan', elemenLatihan);
  vm.createContext(win1);
  vm.runInContext(kode, win1);
  const KUNCI_SESI = win1.LANJUT_LEVELIN.KUNCI_SESI;
  const sesiAwal = JSON.parse(win1.sessionStorage.getItem(KUNCI_SESI) || 'null');
  cek('Sesi otomatis dimulai saat halaman latihan.html dimuat (tanpa event apa pun)',
      !!(sesiAwal && sesiAwal.sesi_id));

  /* N2: event 'levelin:kartu-baru' saat TIDAK ADA sesi aktif (mis. sesi lama
     sudah usai/sessionStorage dibersihkan) benar-benar memanggil
     Sesi.mulai() lewat sesiAktifAtauBaru() — bukan diam-diam gagal karena
     mengakses properti sesi yang null. */
  win1.sessionStorage.removeItem(KUNCI_SESI);
  cek('sessionStorage kosong sebelum dispatch kartu-baru',
      win1.sessionStorage.getItem(KUNCI_SESI) === null);
  let tidakMelemparKartuBaru = true;
  try {
    win1.dispatchEvent({ type: 'levelin:kartu-baru', detail: {} });
  } catch (e) { tidakMelemparKartuBaru = false; }
  cek('dispatch levelin:kartu-baru tanpa sesi aktif tidak melempar', tidakMelemparKartuBaru);
  const sesiSetelahKartuBaru = JSON.parse(win1.sessionStorage.getItem(KUNCI_SESI) || 'null');
  cek('levelin:kartu-baru memanggil Sesi.mulai() saat belum ada sesi aktif',
      !!(sesiSetelahKartuBaru && sesiSetelahKartuBaru.sesi_id));

  /* N3: 'levelin:jawaban-dicatat' benar-benar memanggil Kalibrasi.catat()
     (localStorage bertambah) DAN memperbarui sesi.jawaban/umpan_balik_tertunda. */
  const win2 = bikinWindowPeran('latihan');
  vm.createContext(win2);
  vm.runInContext(kode, win2);
  const KUNCI_RIWAYAT2 = win2.LANJUT_LEVELIN.KUNCI_RIWAYAT;
  const KUNCI_SESI2 = win2.LANJUT_LEVELIN.KUNCI_SESI;
  win2.dispatchEvent({ type: 'levelin:jawaban-dicatat',
    detail: { kartu_id: 'k-mtk-1', mapel_id: 'matematika', keyakinan: 4, benar: false } });
  const riwayat2 = JSON.parse(win2.localStorage.getItem(KUNCI_RIWAYAT2));
  cek('Kalibrasi.catat() menulis satu peristiwa ke localStorage',
      riwayat2.peristiwa.length === 1 && riwayat2.peristiwa[0].mapel_id === 'matematika');
  const sesi2 = JSON.parse(win2.sessionStorage.getItem(KUNCI_SESI2));
  cek('sesi.jawaban bertambah satu', sesi2.jawaban.length === 1);
  cek('sesi.umpan_balik_tertunda terisi sesuai jawaban terakhir',
      sesi2.umpan_balik_tertunda.keyakinan === 4 && sesi2.umpan_balik_tertunda.benar === false);

  /* N4: peran "latihan-selesai" menutup sesi OTOMATIS saat halaman dimuat
     (tanpa event apa pun) — Sesi.tutup() sebelumnya tidak pernah dipanggil
     sama sekali di mana pun. */
  const blokPenuh = fakeEl({ querySelector: () => null });
  const blokKosong = fakeEl();
  const elemenSelesai = {
    '.levelin-summary-block[data-varian="penuh"]': blokPenuh,
    '.levelin-summary-block[data-varian="kosong"]': blokKosong,
    '.levelin-gap-strip': null,
  };
  const win3 = bikinWindowPeran('latihan-selesai', elemenSelesai);
  /* Tanam sesi aktif (belum ditutup) sebelum halaman "dimuat". */
  const sesiSebelum = {
    sesi_id: 'ls-uji', dimulai_pada: new Date().toISOString(), asal_mula: 'arsip',
    mapel_fokus: null, antrian: [], indeks: 0, keyakinan_kartu_ini: null,
    jawaban: [{ kartu_id: 'k1', mapel_id: 'mtk', keyakinan: 4, benar: false }],
    umpan_balik_tertunda: null,
  };
  win3.sessionStorage.setItem('lanjut.levelin.sesi.v1', JSON.stringify(sesiSebelum));
  vm.createContext(win3);
  vm.runInContext(kode, win3);
  const sesiSesudah = JSON.parse(win3.sessionStorage.getItem('lanjut.levelin.sesi.v1'));
  cek('Sesi.tutup() otomatis terpanggil saat latihan-selesai.html dimuat (selesai_pada terisi)',
      !!sesiSesudah.selesai_pada);
  cek('data sesi (jawaban) TIDAK dihapus saat ditutup (SDD §6.3)',
      sesiSesudah.jawaban.length === 1);

  /* N5: sesi yang SUDAH ditutup (selesai_pada terisi) tidak dipakai ulang
     begitu pengguna kembali ke latihan.html — mencegah jawaban sesi baru
     menumpuk ke sesi lama yang sudah selesai. */
  const win4 = bikinWindowPeran('latihan');
  vm.createContext(win4);
  vm.runInContext(kode, win4);
  const sesiUsang = {
    sesi_id: 'ls-usang', dimulai_pada: new Date().toISOString(), selesai_pada: new Date().toISOString(),
    asal_mula: 'arsip', mapel_fokus: null, antrian: [], indeks: 0, keyakinan_kartu_ini: null,
    jawaban: [{ kartu_id: 'k-lama', mapel_id: 'mtk', keyakinan: 1, benar: true }],
    umpan_balik_tertunda: null,
  };
  win4.sessionStorage.setItem('lanjut.levelin.sesi.v1', JSON.stringify(sesiUsang));
  win4.dispatchEvent({ type: 'levelin:jawaban-dicatat',
    detail: { kartu_id: 'k-baru', mapel_id: 'bing', keyakinan: 5, benar: true } });
  const sesiBaru = JSON.parse(win4.sessionStorage.getItem('lanjut.levelin.sesi.v1'));
  cek('sesi basi (sudah selesai_pada) tidak dipakai ulang -> sesi_id berganti',
      sesiBaru.sesi_id !== 'ls-usang');
  cek('jawaban sesi baru tidak tercampur dengan jawaban sesi lama yang sudah selesai',
      sesiBaru.jawaban.length === 1 && sesiBaru.jawaban[0].kartu_id === 'k-baru');
})();

console.log('\nO. Pemangkasan jendela_per_mapel lewat siklus penyimpanan sungguhan');
(() => {
  /* Berbeda dari Uji 8 di blok I (agregatPerMapel murni): ini menguji
     Kalibrasi.catat()/.pangkas() — jalur PENYIMPANAN sungguhan yang
     sebelumnya tidak pernah diuji sama sekali ("belum ada sama sekali",
     lihat laporan QA). jendela_per_mapel BAWAAN (50) dipakai apa adanya. */
  const win = bikinWindowPeran('latihan');
  vm.createContext(win);
  vm.runInContext(kode, win);
  const KUNCI_RIWAYAT = win.LANJUT_LEVELIN.KUNCI_RIWAYAT;
  const JENDELA = win.LANJUT_LEVELIN.KONFIG_BAWAAN.ambang.jendela_per_mapel;

  for (let i = 0; i < JENDELA + 10; i++) {
    win.dispatchEvent({ type: 'levelin:jawaban-dicatat',
      detail: { kartu_id: 'k-' + i, mapel_id: 'matematika', keyakinan: (i % 5) + 1, benar: i % 2 === 0 } });
  }
  const riwayat = JSON.parse(win.localStorage.getItem(KUNCI_RIWAYAT));
  const punyaMatematika = riwayat.peristiwa.filter((p) => p.mapel_id === 'matematika');
  cek('jumlah peristiwa tersimpan dipangkas tepat ke jendela_per_mapel (' + JENDELA + ')',
      punyaMatematika.length === JENDELA, 'tersimpan=' + punyaMatematika.length);
  cek('yang tersisa adalah peristiwa TERBARU (kartu_id terakhir tetap ada)',
      punyaMatematika.some((p) => p.kartu_id === 'k-' + (JENDELA + 9)));
  cek('yang paling lama sudah terbuang (kartu_id pertama tidak ada lagi)',
      !punyaMatematika.some((p) => p.kartu_id === 'k-0'));

  /* Mapel lain tidak ikut terpangkas oleh jendela mapel yang berbeda. */
  win.dispatchEvent({ type: 'levelin:jawaban-dicatat',
    detail: { kartu_id: 'k-ing-1', mapel_id: 'bahasa-inggris', keyakinan: 3, benar: true } });
  const riwayat2 = JSON.parse(win.localStorage.getItem(KUNCI_RIWAYAT));
  cek('jendela per mapel tidak memangkas mapel lain',
      riwayat2.peristiwa.filter((p) => p.mapel_id === 'bahasa-inggris').length === 1);
})();

console.log('\nP. muatKonfig — benar-benar membaca data/levelin-konfig.json lewat LANJUT.muatData');
(() => {
  const win = bikinWindow();
  let dipanggilDengan = null;
  win.LANJUT = {
    muatData: (nama) => {
      dipanggilDengan = nama;
      return Promise.resolve({ ambang: { ambang_overconfident: 0.55 } });
    },
  };
  vm.createContext(win);
  vm.runInContext(kode, win);
  cek('muatKonfig() memanggil LANJUT.muatData("levelin-konfig"), bukan sekadar clone KONFIG_BAWAAN',
      dipanggilDengan === 'levelin-konfig', String(dipanggilDengan));
})();

console.log('\nQ. gabungKonfigPerKunci — kunci yang hilang di JSON tetap pakai KONFIG_BAWAAN');
(() => {
  const win = muat();
  const gabung = win.LANJUT_LEVELIN.gabungKonfigPerKunci;
  const dasar = JSON.parse(JSON.stringify(win.LANJUT_LEVELIN.KONFIG_BAWAAN));

  /* Berkas JSON contoh HANYA menyebut satu kunci di dalam `ambang` — kunci
     lain (minimum_kartu, jendela_per_mapel) dan seluruh `klasifikasi`
     TIDAK disebut sama sekali, mensimulasikan berkas konfigurasi yang
     tidak lengkap (AC FL3: "berkas yang tidak lengkap tidak menghapus
     nilai lain"). */
  const hasil = gabung(dasar, { ambang: { ambang_overconfident: 0.55 } });

  cek('kunci yang DISEBUT di JSON menimpa default (ambang_overconfident=0.55)',
      hasil.ambang.ambang_overconfident === 0.55);
  cek('kunci yang TIDAK disebut di JSON tetap pakai default (minimum_kartu=5)',
      hasil.ambang.minimum_kartu === 5);
  cek('kunci yang TIDAK disebut di JSON tetap pakai default (jendela_per_mapel=50)',
      hasil.ambang.jendela_per_mapel === 50);
  cek('bagian objek yang sama sekali tidak disebut JSON (klasifikasi) tidak tersentuh',
      hasil.klasifikasi.keyakinan_tinggi_minimal === 4 && hasil.klasifikasi.keyakinan_rendah_maksimal === 2);
})();

/* ---------- shim kartu CTA Beranda (.levelin-cta-card) untuk section R ----------
   pasangSaranBeranda()/renderSaranBeranda() SENGAJA tidak diekspor (SDD §5.2)
   — diuji lewat kontrak DOM publiknya sendiri, sama semangatnya dengan
   bikinWindowPeran() di atas untuk peran "latihan"/"latihan-selesai". Struktur
   node dibangun meniru markup nyata beranda.html baris 203-211 persis: lima
   <p data-jenis-isi>, satu <span data-isi="cta-saran-mapel"> di dalam
   <p data-jenis-isi="saran">, dan dua tombol <a data-jenis-tombol>.

   PENTING: renderSaranBeranda() memanggil ctaCard.querySelector(...) LANGSUNG
   di ctaCard (bukan di elemen <p>-nya) untuk slot mapel maupun tombol "mulai"
   — persis seperti browser sungguhan mencari turunan lewat querySelector di
   induknya. Shim ini meniru itu: ctaCard.querySelector menjawab KEDUA
   selector itu langsung, bukan didelegasikan ke elemen anak. */
function buatKartuCTA() {
  const slotMapel = { textContent: '' };

  const pSaran = fakeEl(); pSaran.setAttribute('data-jenis-isi', 'saran');
  const pSelaras = fakeEl(); pSelaras.setAttribute('data-jenis-isi', 'kalibrasi_selaras');
  const pBelumCukup = fakeEl(); pBelumCukup.setAttribute('data-jenis-isi', 'belum_cukup_data');
  const pBaru = fakeEl(); pBaru.setAttribute('data-jenis-isi', 'pengguna_baru');
  const pArsipKosong = fakeEl(); pArsipKosong.setAttribute('data-jenis-isi', 'arsip_kosong');
  const semuaP = [pSaran, pSelaras, pBelumCukup, pBaru, pArsipKosong];

  /* Tombol "Mulai" TIDAK punya atribut hidden di markup asli (hanya kartu
     induknya yang [hidden] sebelum saran ditentukan) — beda dari tombol
     "arsip" yang memang [hidden] sejak awal (beranda.html baris 210-211). */
  const tombolMulai = fakeEl({ hidden: false });
  tombolMulai.setAttribute('data-jenis-tombol', 'mulai');
  tombolMulai.href = 'latihan.html';
  const tombolArsip = fakeEl({ hidden: true });
  tombolArsip.setAttribute('data-jenis-tombol', 'arsip');
  tombolArsip.href = 'arsip-tambah.html';
  const semuaTombol = [tombolMulai, tombolArsip];

  const ctaCard = fakeEl({
    querySelectorAll: (sel) => {
      if (sel === '[data-jenis-isi]') return semuaP;
      if (sel === '[data-jenis-tombol]') return semuaTombol;
      return [];
    },
    querySelector: (sel) => {
      if (sel === '[data-jenis-tombol="mulai"]') return tombolMulai;
      if (sel === '[data-isi="cta-saran-mapel"]') return slotMapel;
      return null;
    },
  });

  return { ctaCard, pSaran, pSelaras, pBelumCukup, pBaru, pArsipKosong, tombolMulai, tombolArsip, slotMapel };
}

/* Window peran "beranda" dengan LANJUT.muatData palsu yang melayani tiga nama
   berkas yang benar-benar dipanggil muatKonfig()/pasangSaranBeranda() (SDD
   §2.1): 'levelin-konfig', 'arsip', 'mapel'. */
function bikinWindowBeranda(kartuCTA, arsipData, mapelData) {
  const win = bikinWindowPeran('beranda', { '.levelin-cta-card': kartuCTA.ctaCard });
  win.LANJUT = {
    muatData: (nama) => {
      if (nama === 'levelin-konfig') return Promise.resolve({});
      if (nama === 'arsip') return Promise.resolve(arsipData);
      if (nama === 'mapel') return Promise.resolve(mapelData);
      return Promise.reject(new Error('data tidak dikenal: ' + nama));
    },
  };
  return win;
}

/* Menunggu seluruh microtask (rantai konfigPromise -> Promise.all(arsip,
   mapel) -> .then(render)) selesai sebelum memeriksa DOM. setImmediate()
   adalah macrotask — Node selalu mengosongkan SELURUH antrean microtask
   sebelum masuk ke fase macrotask berikutnya, jadi satu await ini cukup
   berapa pun banyak "hop" Promise di antaranya. */
function tungguRenderSelesai() {
  return new Promise((resolve) => setImmediate(resolve));
}

const KUNCI_RIWAYAT_LITERAL = 'lanjut.levelin.v1';
function tanamRiwayat(win, peristiwa) {
  win.localStorage.setItem(KUNCI_RIWAYAT_LITERAL, JSON.stringify({ versi: 1, aturan_versi: 1, peristiwa }));
}
function buatPeristiwa(n, mapelId, keyakinan, benar) {
  const arr = [];
  for (let i = 0; i < n; i++) {
    arr.push({
      id: 'p-' + mapelId + '-' + i, sesi_id: 's1', kartu_id: 'k-' + mapelId + '-' + i,
      mapel_id: mapelId, keyakinan, benar, waktu: new Date().toISOString(), aturan_versi: 1,
    });
  }
  return arr;
}

console.log('\nR. Aktivasi variant saran di pasangSaranBeranda() — 5 varian fallback nyata (via DOM+data mock)');
async function jalankanR() {
  const MAPEL = [
    { id: 'matematika', nama: 'Matematika' },
    { id: 'bahasa-inggris', nama: 'Bahasa Inggris' },
  ];
  const ARSIP_ADA_KARTU = [
    { id: 'k1', mapel_id: 'matematika' },
    { id: 'k2', mapel_id: 'bahasa-inggris' },
  ];

  /* R1: pola overconfident (keyakinan tinggi, sering salah) -> varian "saran",
     nama mapel TAMPILAN ("Matematika", bukan id "matematika"), href tombol
     "Mulai" dinamis ke latihan.html?mapel=<mapel_id>. */
  {
    const kartuCTA = buatKartuCTA();
    const win = bikinWindowBeranda(kartuCTA, ARSIP_ADA_KARTU, MAPEL);
    tanamRiwayat(win, buatPeristiwa(5, 'matematika', 5, false));
    vm.createContext(win);
    vm.runInContext(kode, win);
    await tungguRenderSelesai();

    cek('R1 saran: ctaCard data-jenis="saran"', kartuCTA.ctaCard.getAttribute('data-jenis') === 'saran');
    cek('R1 saran: ctaCard tidak lagi [hidden]', kartuCTA.ctaCard.hidden === false);
    cek('R1 saran: paragraf [data-jenis-isi="saran"] tampil', kartuCTA.pSaran.hidden === false);
    cek('R1 saran: 4 paragraf varian lain tetap hidden',
        kartuCTA.pSelaras.hidden && kartuCTA.pBelumCukup.hidden && kartuCTA.pBaru.hidden && kartuCTA.pArsipKosong.hidden);
    cek('R1 saran: slot nama mapel terisi NAMA TAMPILAN ("Matematika"), bukan id',
        kartuCTA.slotMapel.textContent === 'Matematika', kartuCTA.slotMapel.textContent);
    cek('R1 saran: tombol "Mulai" tampil', kartuCTA.tombolMulai.hidden === false);
    cek('R1 saran: tombol "Buka Arsip Belajar" tetap hidden', kartuCTA.tombolArsip.hidden === true);
    cek('R1 saran: href tombol "Mulai" dinamis ke latihan.html?mapel=matematika',
        kartuCTA.tombolMulai.href === 'latihan.html?mapel=matematika', kartuCTA.tombolMulai.href);
  }

  /* R2: 5 kartu (>= minimum_kartu), pola selaras (rate overconfident rendah)
     -> "kalibrasi_selaras", mapel_id: null (CTA generik, tidak menyebut nama
     mapel — SDD §6.1f baris 3). */
  {
    const kartuCTA = buatKartuCTA();
    const win = bikinWindowBeranda(kartuCTA, ARSIP_ADA_KARTU, MAPEL);
    tanamRiwayat(win, buatPeristiwa(5, 'matematika', 1, true)); // keyakinan rendah + benar -> underconfident, rate OC = 0
    vm.createContext(win);
    vm.runInContext(kode, win);
    await tungguRenderSelesai();

    cek('R2 kalibrasi_selaras: ctaCard data-jenis="kalibrasi_selaras"',
        kartuCTA.ctaCard.getAttribute('data-jenis') === 'kalibrasi_selaras');
    cek('R2 kalibrasi_selaras: paragraf yang cocok tampil', kartuCTA.pSelaras.hidden === false);
    cek('R2 kalibrasi_selaras: paragraf "saran" tetap hidden', kartuCTA.pSaran.hidden === true);
    cek('R2 kalibrasi_selaras: tombol "Mulai" tampil, "Buka Arsip Belajar" hidden',
        kartuCTA.tombolMulai.hidden === false && kartuCTA.tombolArsip.hidden === true);
  }

  /* R3: kartu_dikerjakan di bawah minimum_kartu (5), tapi riwayat SUNGGUH ADA
     -> "belum_cukup_data" (SDD §6.1f baris 4). */
  {
    const kartuCTA = buatKartuCTA();
    const win = bikinWindowBeranda(kartuCTA, ARSIP_ADA_KARTU, MAPEL);
    tanamRiwayat(win, buatPeristiwa(2, 'matematika', 4, true)); // baru 2 kartu, di bawah minimum 5
    vm.createContext(win);
    vm.runInContext(kode, win);
    await tungguRenderSelesai();

    cek('R3 belum_cukup_data: ctaCard data-jenis="belum_cukup_data"',
        kartuCTA.ctaCard.getAttribute('data-jenis') === 'belum_cukup_data');
    cek('R3 belum_cukup_data: paragraf yang cocok tampil', kartuCTA.pBelumCukup.hidden === false);
    cek('R3 belum_cukup_data: paragraf "pengguna_baru" tetap hidden (beda kondisi meski CTA sama-sama netral)',
        kartuCTA.pBaru.hidden === true);
    cek('R3 belum_cukup_data: tombol "Mulai" tampil', kartuCTA.tombolMulai.hidden === false);
  }

  /* R4: belum ada riwayat SAMA SEKALI (pengguna baru), tapi arsip SUDAH
     berisi kartu -> "pengguna_baru" (SDD §6.1f baris 5) — BUKAN
     "belum_cukup_data". Ini scenario yang sebelumnya SALAH karena
     agregatPerMapel() selalu mengisi entri untuk tiap mapel di data/mapel.json
     (kartu_dikerjakan=0), sehingga `adaRiwayat` versi lama (yang hanya
     memeriksa "ada entri di agregat") keliru menganggap ini sebagai baris 4.
     Lihat KOREKSI di saranHarian() (levelin.js). */
  {
    const kartuCTA = buatKartuCTA();
    const win = bikinWindowBeranda(kartuCTA, ARSIP_ADA_KARTU, MAPEL);
    /* Sengaja TIDAK tanamRiwayat() -> Kalibrasi.baca() balik { peristiwa: [] }. */
    vm.createContext(win);
    vm.runInContext(kode, win);
    await tungguRenderSelesai();

    cek('R4 pengguna_baru: ctaCard data-jenis="pengguna_baru" (BUKAN belum_cukup_data)',
        kartuCTA.ctaCard.getAttribute('data-jenis') === 'pengguna_baru',
        kartuCTA.ctaCard.getAttribute('data-jenis'));
    cek('R4 pengguna_baru: paragraf yang cocok tampil', kartuCTA.pBaru.hidden === false);
    cek('R4 pengguna_baru: paragraf "belum_cukup_data" tetap hidden', kartuCTA.pBelumCukup.hidden === true);
    cek('R4 pengguna_baru: tombol "Mulai" tampil', kartuCTA.tombolMulai.hidden === false);
  }

  /* R5: arsip BENAR-BENAR kosong (tidak ada satu kartu pun di data/arsip.json)
     -> "arsip_kosong" menang atas riwayat kalibrasi lama apa pun (SDD §6.1f
     baris 1, dievaluasi PALING PERTAMA) — tombol berganti ke
     "Buka Arsip Belajar", bukan "Mulai". */
  {
    const kartuCTA = buatKartuCTA();
    const win = bikinWindowBeranda(kartuCTA, [], MAPEL); // arsip.json kosong
    tanamRiwayat(win, buatPeristiwa(5, 'matematika', 5, false)); // riwayat lama tetap ada, tidak relevan
    vm.createContext(win);
    vm.runInContext(kode, win);
    await tungguRenderSelesai();

    cek('R5 arsip_kosong: ctaCard data-jenis="arsip_kosong" (menang atas riwayat overconfident lama)',
        kartuCTA.ctaCard.getAttribute('data-jenis') === 'arsip_kosong');
    cek('R5 arsip_kosong: paragraf yang cocok tampil', kartuCTA.pArsipKosong.hidden === false);
    cek('R5 arsip_kosong: tombol "Buka Arsip Belajar" tampil', kartuCTA.tombolArsip.hidden === false);
    cek('R5 arsip_kosong: tombol "Mulai" disembunyikan', kartuCTA.tombolMulai.hidden === true);
  }

  /* R6: data/arsip.json atau data/mapel.json gagal dimuat -> tetap jatuh ke
     fallback teraman "pengguna_baru", CTA TIDAK PERNAH kosong/rusak (AC FL4
     "tidak menjadi jalan buntu", SDD §6.6/R2). */
  {
    const kartuCTA = buatKartuCTA();
    const win = bikinWindowPeran('beranda', { '.levelin-cta-card': kartuCTA.ctaCard });
    win.LANJUT = {
      muatData: (nama) => (nama === 'levelin-konfig' ? Promise.resolve({}) : Promise.reject(new Error('gagal muat ' + nama))),
    };
    vm.createContext(win);
    vm.runInContext(kode, win);
    await tungguRenderSelesai();

    cek('R6 data gagal dimuat: tetap jatuh ke "pengguna_baru", tidak melempar/kosong',
        kartuCTA.ctaCard.getAttribute('data-jenis') === 'pengguna_baru');
  }
}

/* ========== LAPORAN ========== */
jalankanR().then(() => {
  console.log('\n' + '='.repeat(60));
  console.log(gagal === 0 ? '  SELURUH GERBANG LOLOS' : '  ' + gagal + ' TEST GAGAL');
  console.log('='.repeat(60));
  process.exit(gagal === 0 ? 0 : 1);
}).catch((e) => {
  console.error('R. GAGAL total (exception tidak tertangani):', (e && e.stack) || e);
  gagal++;
  console.log('\n' + '='.repeat(60));
  console.log('  ' + gagal + ' TEST GAGAL');
  console.log('='.repeat(60));
  process.exit(1);
});
