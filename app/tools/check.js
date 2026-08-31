/* Pemeriksa kerangka: tautan mati, aset hilang, token yang tidak terdefinisi,
   dan aturan-aturan yang dijanjikan (nav 4 ikon, alumni tanpa ikon nav). */
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];
let gagal = 0;
const salah = (m) => { console.log('  GAGAL: ' + m); gagal++; };

const halaman = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));
console.log('Halaman ditemukan: ' + halaman.length + '\n');

/* --- 1. tautan href/src menunjuk ke berkas yang ada -------------------- */
console.log('1. Tautan dan aset');
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const ref = [...html.matchAll(/(?:href|src)="([^"]+)"/g)].map((m) => m[1]);
  ref.forEach((r) => {
    if (/^(https?:|#|mailto:|data:)/.test(r)) return;
    const target = r.split('#')[0];
    if (!target) return;
    if (!fs.existsSync(path.join(ROOT, target))) salah(f + ' -> ' + target + ' tidak ada');
  });
});
console.log('   selesai\n');

/* --- 2. jangkar #id ada di halamannya ---------------------------------- */
console.log('2. Jangkar dalam halaman');
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  [...html.matchAll(/href="#([^"]+)"/g)].forEach((m) => {
    if (!new RegExp('id="' + m[1] + '"').test(html)) salah(f + ' -> #' + m[1] + ' tidak ada');
  });
});
console.log('   selesai\n');

/* --- 3. tiap var(--token) terdefinisi di tokens.css -------------------- */
console.log('3. Token CSS');
const tokens = fs.readFileSync(path.join(ROOT, 'assets/tokens.css'), 'utf8');
const didefinisikan = new Set([...tokens.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]));
const sumberCss = ['assets/app.css', ...halaman].map((f) => fs.readFileSync(path.join(ROOT, f), 'utf8')).join('\n');
const dipakai = new Set([...sumberCss.matchAll(/var\((--[a-z0-9-]+)/g)].map((m) => m[1]));
[...dipakai].sort().forEach((t) => { if (!didefinisikan.has(t)) salah('token ' + t + ' dipakai tapi tidak terdefinisi'); });
console.log('   ' + didefinisikan.size + ' token terdefinisi, ' + dipakai.size + ' dipakai\n');

/* --- 4. navigasi bawah: tepat 4 ikon, alumni tidak termasuk ------------ */
console.log('4. Navigasi bawah');
/* daftar.html/masuk.html sejenis dengan onboarding.html: layar pra-akun
   sebelum tab Beranda dkk. relevan (B8, docs/SDD-Backend-Foundation.md §5.4).
   akun.html BUKAN pengecualian - ia halaman cabang seperti arsip-tambah atau
   alumni, jadi tetap wajib nav 4 ikon dengan Beranda aktif. */
const halTanpaNav = ['index.html', 'onboarding.html', 'daftar.html', 'masuk.html'];
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const nav = html.match(/<nav class="tabbar"[\s\S]*?<\/nav>/);
  if (halTanpaNav.includes(f)) {
    if (nav) salah(f + ' seharusnya tanpa navigasi bawah');
    return;
  }
  if (!nav) { salah(f + ' tidak punya navigasi bawah'); return; }
  const tautan = [...nav[0].matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  if (tautan.length !== 4) salah(f + ' punya ' + tautan.length + ' ikon nav, harus 4');
  if (nav[0].includes('alumni.html')) salah(f + ' menaruh alumni.html di navigasi bawah');
  const aktif = [...nav[0].matchAll(/aria-current="page"/g)].length;
  if (aktif !== 1) salah(f + ' punya ' + aktif + ' tab aktif, harus 1');
});
console.log('   selesai\n');

/* --- 5. alumni.html dijangkau dari beranda ----------------------------- */
console.log('5. Jalan ke alumni.html');
const beranda = fs.readFileSync(path.join(ROOT, 'beranda.html'), 'utf8');
if (!beranda.includes('href="alumni.html"')) salah('beranda.html tidak menautkan alumni.html');
const perujuk = halaman.filter((f) => fs.readFileSync(path.join(ROOT, f), 'utf8').includes('href="alumni.html"'));
console.log('   dirujuk dari: ' + perujuk.join(', ') + '\n');

/* --- 6. tag berpasangan (cek kasar) ----------------------------------- */
console.log('6. Tag berpasangan');
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  ['div', 'section', 'main', 'nav', 'article', 'ul', 'ol', 'li', 'details', 'form', 'fieldset'].forEach((t) => {
    const buka = (html.match(new RegExp('<' + t + '[\\s>]', 'g')) || []).length;
    const tutup = (html.match(new RegExp('</' + t + '>', 'g')) || []).length;
    if (buka !== tutup) salah(f + ': <' + t + '> ' + buka + ' buka vs ' + tutup + ' tutup');
  });
});
console.log('   selesai\n');

/* --- 7. wajib ada: lang, viewport, title, tokens+app css, app.js ------- */
console.log('7. Kepala dokumen');
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  [['<html lang="id">', 'lang'], ['name="viewport"', 'viewport'], ['<title>', 'title'],
   ['assets/tokens.css', 'tokens.css'], ['assets/app.css', 'app.css'],
   ['assets/app.js', 'app.js'], ['manifest.webmanifest', 'manifest']]
    .forEach(([pola, nama]) => { if (!html.includes(pola)) salah(f + ' tidak punya ' + nama); });
  const h1 = (html.replace(/<!--[\s\S]*?-->/g, '').match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) salah(f + ' punya ' + h1 + ' <h1>, harus tepat 1');
});
console.log('   selesai\n');

/* --- 8. tiap img punya alt ------------------------------------------- */
console.log('8. Atribut alt');
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  [...html.matchAll(/<img [^>]*>/g)].forEach((m) => {
    if (!m[0].includes('alt=')) salah(f + ': <img> tanpa alt -> ' + m[0].slice(0, 60));
  });
});
console.log('   selesai\n');


/* --- 9. tidak ada klaim verifikasi palsu ------------------------------- */
console.log('9. Klaim verifikasi');
halaman.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
  /* "dicek 6 Agustus 2026" dsb — menyatakan pengecekan pernah terjadi. */
  const klaim = html.match(/dicek\s+\d/gi);
  if (klaim) salah(f + ' mengklaim tanggal pengecekan: ' + klaim.join(', '));
  /* "Sumber: Laman resmi ..." menyatakan data berasal dari sana. */
  const asal = html.match(/Sumber:\s*Laman resmi/gi);
  if (asal) salah(f + ' mengklaim data berasal dari laman resmi (' + asal.length + 'x)');
});
fs.readdirSync(path.join(ROOT, 'data')).forEach((f) => {
  const d = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', f), 'utf8'));
  const cari = (o) => {
    if (Array.isArray(o)) return o.some(cari);
    if (o && typeof o === 'object')
      return Object.entries(o).some(([k, v]) => (k === 'diperiksa_pada' && v !== null) || cari(v));
    return false;
  };
  if (d.status === 'belum_diverifikasi' && cari(d))
    salah('data/' + f + ' berstatus belum_diverifikasi tapi punya diperiksa_pada terisi');
});
console.log('   selesai\n');

/* --- 10. peringatan linimasa tampil selama data belum diverifikasi ----- */
console.log('10. Peringatan linimasa');
const lini = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/linimasa.json'), 'utf8'));
const brd = fs.readFileSync(path.join(ROOT, 'beranda.html'), 'utf8').replace(/<!--[\s\S]*?-->/g, '');
if (lini.status === 'belum_diverifikasi') {
  if (!brd.includes('class="peringatan"'))
    salah('linimasa belum diverifikasi tapi beranda.html tidak menampilkan .peringatan');
  const li = (brd.match(/<li data-status/g) || []).length;
  const tandai = (brd.match(/data-verifikasi="belum"/g) || []).length;
  if (li !== tandai) salah('hanya ' + tandai + ' dari ' + li + ' butir linimasa ditandai belum diverifikasi');
  if (!brd.includes('lencana--ondark')) salah('kartu tenggat tidak memakai lencana "Contoh"');
  console.log('   status=belum_diverifikasi -> peringatan + ' + tandai + '/' + li + ' butir ditandai + lencana tenggat');
} else {
  console.log('   status=' + lini.status + ' (peringatan boleh dilepas)');
}
console.log('');

/* --- 11. gerbang rilis Level-In: data/levelin-konfig.json akses.* ------ */
console.log('11. Gerbang rilis Level-In — konfigurasi akses.*');
const levelinKonfig = JSON.parse(fs.readFileSync(path.join(ROOT, 'data/levelin-konfig.json'), 'utf8'));
const nilaiSahRingkasan = ['gratis', 'berbayar'];
if (!nilaiSahRingkasan.includes(levelinKonfig.akses.ringkasan_kalibrasi_sesi)) {
  salah('akses.ringkasan_kalibrasi_sesi bernilai "' + levelinKonfig.akses.ringkasan_kalibrasi_sesi +
    '" — wajib "gratis" atau "berbayar" (SDD-LevelIn.md §5.4, tidak boleh "belum_diputuskan")');
} else {
  console.log('   akses.ringkasan_kalibrasi_sesi = "' + levelinKonfig.akses.ringkasan_kalibrasi_sesi + '" (sah)');
}
const nilaiSahAgregat = ['gratis', 'berbayar', 'belum_diputuskan'];
if (!nilaiSahAgregat.includes(levelinKonfig.akses.tampilan_agregat_mapel)) {
  salah('akses.tampilan_agregat_mapel bernilai tidak sah: "' + levelinKonfig.akses.tampilan_agregat_mapel + '"');
}
/* akses.tampilan_agregat_mapel BOLEH tetap "belum_diputuskan" SELAMA komponen
   §7.6 (penanda status kalibrasi per mapel, kelas .levelin-status-badge) tidak
   benar-benar dirender di arsip.html — begitu ada yang merender, kuncinya
   wajib sudah diputuskan (SDD-LevelIn.md §5.4). */
const arsipHtmlUntukGerbang = fs.readFileSync(path.join(ROOT, 'arsip.html'), 'utf8');
const komponenAgregatDirender = /class="[^"]*levelin-status-badge/.test(arsipHtmlUntukGerbang);
if (komponenAgregatDirender && levelinKonfig.akses.tampilan_agregat_mapel === 'belum_diputuskan') {
  salah('arsip.html merender .levelin-status-badge tapi akses.tampilan_agregat_mapel masih "belum_diputuskan"');
} else {
  console.log('   akses.tampilan_agregat_mapel = "' + levelinKonfig.akses.tampilan_agregat_mapel +
    '" (komponen §7.6 ' + (komponenAgregatDirender ? 'DIRENDER' : 'belum dirender') + ')');
}
console.log('');

/* --- 12. halaman yang memuat levelin.js: nav tetap 4 ikon --------------- */
console.log('12. Halaman levelin.js — navigasi tetap 4 ikon');
const halamanLevelin = halaman.filter((f) => fs.readFileSync(path.join(ROOT, f), 'utf8').includes('assets/levelin.js'));
halamanLevelin.forEach((f) => {
  const html = fs.readFileSync(path.join(ROOT, f), 'utf8');
  const nav = html.match(/<nav class="tabbar"[\s\S]*?<\/nav>/);
  if (!nav) { salah(f + ' memuat levelin.js tapi tidak punya navigasi bawah'); return; }
  const tautan = [...nav[0].matchAll(/href="([^"]+)"/g)].map((m) => m[1]);
  if (tautan.length !== 4) salah(f + ' memuat levelin.js dan punya ' + tautan.length + ' ikon nav, harus 4');
});
/* Daftar halaman yang memuat levelin.js dirancang tetap (SDD-LevelIn.md
   §5.3): beranda, latihan, latihan-selesai, arsip. Kalau daftar ini berubah
   diam-diam (halaman baru menambahkannya, atau salah satu berhenti
   memuatnya), itu perlu ditinjau sengaja, bukan lolos tanpa disadari. */
const halamanLevelinDiharapkan = ['arsip.html', 'beranda.html', 'latihan-selesai.html', 'latihan.html'];
const halamanLevelinAktual = [...halamanLevelin].sort();
if (halamanLevelinAktual.join(',') !== [...halamanLevelinDiharapkan].sort().join(',')) {
  salah('daftar halaman yang memuat levelin.js berubah dari rancangan SDD-LevelIn.md §5.3: ' +
    'diharapkan [' + halamanLevelinDiharapkan.join(', ') + '], nyatanya [' + halamanLevelinAktual.join(', ') + ']');
} else {
  console.log('   levelin.js dimuat di: ' + halamanLevelinAktual.join(', '));
}
console.log('');

console.log(gagal === 0 ? 'SEMUA LOLOS' : gagal + ' MASALAH');
process.exit(gagal === 0 ? 0 : 1);
