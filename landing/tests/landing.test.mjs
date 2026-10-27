// Tes situs LANJUT (PRD-landpage/AGENTS-landpage + redesign visual acuan design/reference-landing.png).
// Tanpa paket tambahan: node --test, Vite, React. before() menjalankan pipeline build yang sama
// dengan `npm run build` (scripts/bangun.mjs: build klien + SSR + prerender) ke folder .uji-build/,
// lalu memakai modul SSR-nya (src/entri/server.tsx) untuk merender halaman dengan data rilis tiruan.

import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { before, test } from 'node:test';
import { fileURLToPath } from 'node:url';

import { bangun, tautanRusak } from '../scripts/bangun.mjs';

const AKAR = fileURLToPath(new URL('..', import.meta.url));
const DIST = path.join(AKAR, '.uji-build');
const DIST_SITUS = path.join(AKAR, '.uji-build', '..', '.uji-build-situs');
const PAKET_DIIZINKAN = ['vite', 'react', 'react-dom', '@vitejs/plugin-react', '@types/react', '@types/react-dom'];
const HARI_INI = '2026-10-26';

let s;

before(async () => {
  ({ ssr: s } = await bangun({ dist: DIST, ssr: path.join(AKAR, '.uji-ssr'), diam: true, hariIni: HARI_INI, situsUrl: '' }));
});

function semuaBerkas(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? semuaBerkas(p) : [p];
  });
}

const relatif = (f, dasar = DIST) => path.relative(dasar, f).split(path.sep).join('/');
const htmlDist = () => semuaBerkas(DIST).filter((f) => f.endsWith('.html'));
const teksDist = () =>
  semuaBerkas(DIST)
    .filter((f) => /\.(html|js|css|json|txt)$/.test(f))
    .map((f) => ({ nama: relatif(f), isi: fs.readFileSync(f, 'utf8') }));
const halaman = (jalur) => fs.readFileSync(path.join(DIST, ...jalur.split('/').filter(Boolean), 'index.html'), 'utf8');

const dekode = (t) =>
  t.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const tanpaTag = (t) => dekode(t.replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const isiRoot = (html) => /<div id="root"[^>]*>([\s\S]*)<\/div>\s*<\/body>/.exec(html)?.[1] ?? '';

// Rilis tiruan untuk menguji halaman unduhan (bukan data sungguhan, tidak pernah ditulis ke repo).
const rilisTiruan = (ubah = {}) => ({
  version: '1.2.0',
  releaseDate: '2026-10-20',
  channel: 'stable',
  title: 'Perbaikan masuk',
  summary: 'Perbaikan alur masuk dan Daftar Periksa.',
  apkUrl: 'https://github.com/contoh-pemilik/lanjut-rilis/releases/download/v1.2.0/lanjut-1.2.0.apk',
  fileSizeBytes: 25_480_000,
  minAndroidVersion: null,
  sha256: 'a'.repeat(64),
  changes: ['Masuk dengan kode email lebih cepat.'],
  knownIssues: [],
  ...ubah,
});
const dataTiruan = () => ({
  latestVersion: '1.2.0',
  releases: [
    rilisTiruan(),
    rilisTiruan({ version: '1.1.0', releaseDate: '2026-09-30', title: 'Rilis uji kedua', apkUrl: 'unduh/lanjut-1.1.0.apk', sha256: null, fileSizeBytes: null }),
  ],
});

test('build: setiap rute peta situs jadi HTML prerender sendiri, lengkap dengan judul dan deskripsi unik', () => {
  const judul = new Set();
  const deskripsi = new Set();
  for (const r of s.RUTE) {
    const html = halaman(r.jalur);
    assert.match(html, new RegExp(`<div id="root" data-halaman="${r.halaman}" data-jalur="${r.jalur}" data-akar="${s.akarDari(r.jalur).replace(/\./g, '\\.')}">`), r.jalur);
    assert.ok(tanpaTag(isiRoot(html)).length > 200, `${r.jalur || '/'}: isi prerender kosong`);
    assert.ok(html.includes(`<title>${r.judul.replace(/&/g, '&amp;')}</title>`), `${r.jalur}: judul`);
    assert.match(html, /<meta name="description" content="[^"]{30,}">/, `${r.jalur}: deskripsi`);
    assert.match(html, /<meta property="og:title" content="[^"]+">/);
    judul.add(r.judul);
    deskripsi.add(r.deskripsi);
  }
  assert.equal(judul.size, s.RUTE.length, 'judul halaman harus unik');
  assert.equal(deskripsi.size, s.RUTE.length, 'deskripsi halaman harus unik');
  // Peta situs PRD-landpage §7 (download/:version mengikuti metadata; sekarang belum ada rilis).
  for (const jalur of [
    '',
    'docs',
    'docs/product/overview',
    'docs/product/problem',
    'docs/product/features',
    'docs/product/roadmap',
    'docs/business/model',
    'docs/business/sustainability',
    'docs/technical/architecture',
    'docs/technical/stack',
    'docs/technical/releases',
    'docs/faq',
    'ai',
    'download',
    'privacy',
  ]) {
    assert.ok(s.RUTE.some((r) => r.jalur === jalur), `rute PRD hilang: /${jalur}`);
  }
  assert.ok(fs.existsSync(path.join(DIST, '404.html')));
  assert.ok(!fs.existsSync(path.join(DIST, '.vite')), 'manifest Vite tidak boleh ikut terbit');
});

test('noindex, bahasa id, status DRAF, dan viewport di semua halaman HTML', () => {
  for (const f of htmlDist()) {
    const html = fs.readFileSync(f, 'utf8');
    const nama = relatif(f);
    assert.match(html, /<meta name="robots" content="noindex">/, nama);
    assert.match(html, /<html lang="id" data-status="draf">/, nama);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/, nama);
  }
  // Label DRAF terlihat di setiap halaman, bukan hanya atribut data-status.
  for (const r of s.RUTE) assert.ok(isiRoot(halaman(r.jalur)).includes(`<p class="draf">${s.TEKS_DRAF}</p>`), `${r.jalur || '/'}: label DRAF`);
  assert.match(fs.readFileSync(path.join(DIST, 'robots.txt'), 'utf8'), /noindex/);
  assert.ok(!fs.existsSync(path.join(DIST, 'sitemap.xml')), 'tanpa domain resmi tidak ada sitemap');
  assert.doesNotMatch(htmlDist().map((f) => fs.readFileSync(f, 'utf8')).join(''), /rel="canonical"|og:url/);
});

test('CSP hanya berkas sendiri; tanpa skrip sebaris, atribut style, atau skrip/gaya/huruf dari luar', () => {
  for (const f of htmlDist()) {
    const html = fs.readFileSync(f, 'utf8');
    const nama = relatif(f);
    const csp = /<meta http-equiv="Content-Security-Policy" content="([^"]+)">/.exec(html);
    assert.ok(csp, `${nama}: CSP`);
    assert.match(csp[1], /^default-src 'self';/);
    assert.doesNotMatch(csp[1], /unsafe-inline|unsafe-eval|https?:|\*/);
    assert.doesNotMatch(html, /<script\b(?![^>]*\ssrc=)[^>]*>/, `${nama}: skrip sebaris`);
    assert.doesNotMatch(html, /\sstyle="/, `${nama}: atribut style ditolak CSP style-src 'self'`);
    assert.doesNotMatch(html, /<style\b/, `${nama}: <style> sebaris`);
    const mutlak = nama === '404.html';
    for (const [, nilai] of html.matchAll(/<(?:script|link)\b[^>]*\s(?:src|href)="([^"]+)"/g)) {
      assert.match(nilai, mutlak ? /^\/[^/]/ : /^(\.\/|\.\.\/)/, `${nama}: aset harus berkas sendiri: ${nilai}`);
    }
  }
  for (const { nama, isi } of teksDist()) {
    if (nama.endsWith('.css')) {
      assert.doesNotMatch(isi, /@import|url\(\s*['"]?(https?:)?\/\//i, nama);
      for (const [, u] of isi.matchAll(/url\(\s*['"]?([^'")]+)/g)) assert.ok(fs.existsSync(path.join(DIST, 'assets', u)), `${nama}: ${u}`);
    }
    assert.doesNotMatch(isi, /googletagmanager|gtag\(|google-analytics|fonts\.googleapis|gstatic|facebook|fbq\(|hotjar|plausible|umami/i, nama);
  }
});

test('URL http(s) di dist hanya string yang tidak memicu permintaan (namespace, tautan galat React, sumber resmi glosarium)', () => {
  // Sumber resmi glosarium hanya tautan <a> yang diklik pembaca, bukan permintaan; domainnya
  // dibatasi ke penyelenggara seleksi (snpmb.id dan *.go.id).
  const sumber = Object.values(s.SUMBER).map((x) => x.url);
  for (const u of sumber) assert.match(new URL(u).hostname, /(^|\.)snpmb\.id$|\.go\.id$/, u);
  const DISENGAJA = [
    /^http:\/\/www\.w3\.org\/(1998\/Math\/MathML|1999\/xhtml|1999\/xlink|2000\/svg|XML\/1998\/namespace)$/,
    /^https:\/\/react\.dev\/errors\/$/,
    ...sumber.map((u) => new RegExp(`^${u.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}$`)),
  ];
  const ditemukan = new Set();
  // lisensi/: teks lisensi huruf (OFL) memuat alamat situs lisensinya; itu bukan permintaan.
  for (const { isi } of teksDist().filter((t) => !t.nama.startsWith('lisensi/'))) {
    for (const m of isi.matchAll(/https?:\/\/[^\s"'`)<>\\]+/g)) ditemukan.add(m[0]);
  }
  const lain = [...ditemukan].filter((u) => !DISENGAJA.some((re) => re.test(u)));
  assert.deepEqual(lain, [], `URL tak terduga: ${lain.join(', ')}`);
});

test('tidak ada kunci, kata sandi, atau alamat server internal di dist', () => {
  for (const { nama, isi } of teksDist()) {
    assert.doesNotMatch(isi, /localhost|127\.0\.0\.1|\b10\.\d+\.\d+\.\d+|\b192\.168\.|\b172\.(1[6-9]|2\d|3[01])\./, nama);
    assert.doesNotMatch(isi, /\/api\/v1|:4000|:4100|GANTI-DOMAIN/, nama);
    assert.doesNotMatch(isi, /sk-or-|client_secret|BEGIN [A-Z ]*PRIVATE KEY/i, nama);
    assert.doesNotMatch(isi, /OPENROUTER_|SMTP_|GOOGLE_CLIENT|\.env\b|LANJUT_App|keystore/i, nama);
  }
});

test('situs tidak menyimpan apa pun dan tidak menghubungi jaringan (sesuai halaman Privasi situs)', () => {
  const sumber = semuaBerkas(path.join(AKAR, 'src')).filter((f) => /\.(ts|tsx)$/.test(f));
  for (const f of sumber) {
    const isi = fs.readFileSync(f, 'utf8');
    assert.doesNotMatch(isi, /localStorage|sessionStorage|document\.cookie|indexedDB|sendBeacon|navigator\.geolocation/, relatif(f, AKAR));
    assert.doesNotMatch(isi, /\bfetch\(|XMLHttpRequest|WebSocket/, relatif(f, AKAR));
  }
  const privasi = tanpaTag(halaman('privacy'));
  assert.match(privasi, /Tanpa cookie/);
  assert.match(privasi, /Tanpa analytics, iklan, atau pelacak/);
  // PRD-landpage §8.6: jangan mengklaim tidak mengumpulkan data apa pun; log hosting tetap ada.
  assert.match(privasi, /server hosting dapat mencatat log akses standar, misalnya alamat IP/);
  assert.doesNotMatch(privasi, /tidak (mengumpulkan|mencatat|menyimpan) (data )?apa pun(?! di penyimpanan peramban)/i);
});

test('tautan dan berkas internal di semua halaman menunjuk berkas yang ada', () => {
  assert.deepEqual(tautanRusak(DIST), []);
  // Semua gambar punya alt (dekoratif: alt="").
  for (const f of htmlDist()) {
    for (const tag of fs.readFileSync(f, 'utf8').match(/<img\b[^>]*>/g) ?? []) assert.match(tag, /\salt="[^"]*"/, `${relatif(f)}: ${tag}`);
  }
});

test('struktur judul: tepat satu h1 per halaman dan tidak meloncat tingkat', () => {
  for (const f of htmlDist().filter((x) => !/(panduan-uji|kebijakan-privasi)\.html$/.test(x))) {
    const html = f.endsWith('google-kembali.html') ? null : isiRoot(fs.readFileSync(f, 'utf8'));
    if (html === null) continue;
    const tingkat = [...html.matchAll(/<h([1-6])\b/g)].map((m) => Number(m[1]));
    assert.equal(tingkat.filter((n) => n === 1).length, 1, `${relatif(f)}: h1`);
    tingkat.forEach((n, i) => i && assert.ok(n - tingkat[i - 1] <= 1, `${relatif(f)}: loncat h${tingkat[i - 1]} → h${n}`));
  }
});

test('alamat lama dialihkan; 404.html beralamat mutlak; releases.json ikut terbit apa adanya', () => {
  for (const a of s.ALIHAN) {
    const html = fs.readFileSync(path.join(DIST, a.berkas), 'utf8');
    const ke = s.alamat('./', a.ke);
    assert.match(html, new RegExp(`<meta http-equiv="refresh" content="0; url=${ke.replace(/\./g, '\\.')}">`));
    assert.match(html, new RegExp(`<a href="${ke.replace(/\./g, '\\.')}">`));
    assert.ok(fs.existsSync(path.join(DIST, ke, 'index.html')), a.berkas);
  }
  assert.deepEqual(s.ALIHAN.map((a) => [a.berkas, a.ke]), [
    ['panduan-uji.html', '/docs/testing'],
    ['kebijakan-privasi.html', '/privacy/app'],
  ]);
  const h404 = fs.readFileSync(path.join(DIST, '404.html'), 'utf8');
  assert.match(h404, /data-akar="\/"/);
  assert.match(h404, /href="\/docs\/"/);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(DIST, 'releases', 'releases.json'), 'utf8')), s.dataRilis);
});

test('halaman penerus Google: nama berkas tetap, logika penerus sama, tanpa jaringan dan penyimpanan', () => {
  const html = fs.readFileSync(path.join(DIST, 'google-kembali.html'), 'utf8');
  const skrip = /<script type="module" crossorigin src="\.\/([^"]+)">/.exec(html)[1];
  assert.match(fs.readFileSync(path.join(DIST, skrip), 'utf8'), /lanjut:\/\/masuk-google/);
  assert.match(html, /<div id="root"><\/div>/, 'penerus dirender di peramban, bukan diprerender');

  assert.equal(s.tujuanPenerus('#state=abc&id_token=aaa.bbb.ccc&authuser=0&prompt=none'), 'lanjut://masuk-google?state=abc&id_token=aaa.bbb.ccc');
  assert.equal(s.tujuanPenerus('#error=access_denied&state=abc'), 'lanjut://masuk-google?error=access_denied&state=abc');
  assert.equal(s.tujuanPenerus(''), null);
  assert.equal(s.tujuanPenerus('#authuser=0'), null);
  assert.match(s.renderGoogleKembali(null), /Tidak ada data masuk dari Google/);
  assert.match(s.renderGoogleKembali('lanjut://masuk-google?state=a'), /href="lanjut:\/\/masuk-google\?state=a"/);
  for (const sumber of ['src/lib/penerus.ts', 'src/entri/google-kembali.tsx', 'src/halaman/GoogleKembali.tsx']) {
    assert.doesNotMatch(fs.readFileSync(path.join(AKAR, sumber), 'utf8'), /fetch|XMLHttpRequest|localStorage|sessionStorage|cookie|sendBeacon/, sumber);
  }
});

test('metadata rilis sekarang sah dan kosong: "Unduhan belum tersedia", tanpa tombol atau tautan APK', () => {
  assert.deepEqual(s.periksaDataRilis(s.dataRilis, HARI_INI), []);
  assert.deepEqual(s.dataRilis, { latestVersion: null, releases: [] });
  for (const jalur of ['download', '']) {
    const html = isiRoot(halaman(jalur));
    assert.doesNotMatch(html, /\.apk"|\sdownload=""|Unduh APK v/, `/${jalur}: tidak boleh ada unduhan palsu`);
  }
  const unduh = tanpaTag(halaman('download'));
  assert.match(unduh, new RegExp(s.TEKS_BELUM_ADA));
  assert.match(unduh, /Izinkan dari sumber ini/);
  assert.match(unduh, /hanya dari halaman ini/i);
  assert.match(tanpaTag(halaman('')), /Rilis publik belum tersedia/);
  assert.ok(!fs.existsSync(path.join(DIST, 'download', '1.0.0')), 'tanpa rilis tidak ada halaman versi');
});

test('periksaDataRilis menerima metadata yang benar dan menolak nilai contoh, tautan palsu, dan versi kacau', () => {
  assert.deepEqual(s.periksaDataRilis(dataTiruan(), HARI_INI), []);
  const tolak = (ubah, pola) => {
    const d = dataTiruan();
    ubah(d);
    const masalah = s.periksaDataRilis(d, HARI_INI);
    assert.ok(masalah.some((m) => pola.test(m)), `harus ditolak (${pola}): ${JSON.stringify(masalah)}`);
  };
  tolak((d) => (d.releases[0].apkUrl = 'https://example.com/lanjut.apk'), /host apkUrl/);
  tolak((d) => (d.releases[0].apkUrl = 'http://unduh.lanjut.id/lanjut.apk'), /https/);
  tolak((d) => (d.releases[0].apkUrl = 'https://github.com/a/b/releases/download/v1/lanjut.aab'), /\.apk/);
  tolak((d) => (d.releases[0].apkUrl = 'https://storage.contoh.id/lanjut.apk?X-Amz-Signature=abc'), /query/);
  tolak((d) => (d.releases[0].apkUrl = 'https://user:sandi@github.com/lanjut.apk'), /kredensial/);
  tolak((d) => (d.releases[0].apkUrl = 'https://192.168.1.5/lanjut.apk'), /host apkUrl/);
  tolak((d) => (d.releases[1].apkUrl = '../rahasia/lanjut.apk'), /relatif/);
  tolak((d) => (d.releases[0].releaseDate = 'YYYY-MM-DD'), /releaseDate/);
  tolak((d) => (d.releases[0].releaseDate = '2026-02-30'), /releaseDate/);
  tolak((d) => (d.releases[0].releaseDate = '2026-12-01'), /belum terjadi/);
  tolak((d) => (d.releases[0].summary = 'Ringkasan singkat rilis.'), /teks contoh/);
  tolak((d) => (d.releases[0].changes = ['Fitur atau perubahan yang benar-benar tersedia.']), /teks contoh/);
  tolak((d) => (d.releases[0].changes = []), /changes/);
  tolak((d) => (d.releases[0].sha256 = 'A'.repeat(64)), /sha256/);
  tolak((d) => (d.releases[0].fileSizeBytes = 0), /fileSizeBytes/);
  tolak((d) => (d.releases[0].fileSizeBytes = 12.5), /fileSizeBytes/);
  tolak((d) => (d.releases[0].minAndroidVersion = 'Android 8'), /minAndroidVersion/);
  tolak((d) => (d.releases[0].channel = 'nightly'), /channel/);
  tolak((d) => delete d.releases[0].sha256, /sha256 wajib ada/);
  tolak((d) => (d.releases[0].unduhan = 999), /kunci tak dikenal/);
  tolak((d) => (d.releases[1].version = '1.2.0'), /ganda/);
  tolak((d) => (d.latestVersion = '9.9.9'), /latestVersion/);
  tolak((d) => (d.latestVersion = '1.1.0'), /bukan versi tertinggi/);
  tolak((d) => (d.releases[1].releaseDate = '2026-10-25'), /lebih baru daripada/);
  tolak((d) => (d.releases = []), /latestVersion harus null/);
  assert.deepEqual(s.periksaDataRilis({ latestVersion: null, releases: [] }, HARI_INI), []);
  assert.equal(s.bandingVersi('1.10.0', '1.9.3') > 0, true);
  assert.equal(s.bandingVersi('1.0.0', '1.0.0-beta.2') > 0, true);
});

test('halaman unduhan dengan rilis tiruan: versi terbaru, data teknis jujur, riwayat, dan detail rilis', () => {
  const html = s.renderUnduh(dataTiruan());
  const teks = tanpaTag(html);
  assert.match(html, /<a class="tombol tombol--utama tombol--besar" href="https:\/\/github\.com\/contoh-pemilik\/lanjut-rilis\/releases\/download\/v1\.2\.0\/lanjut-1\.2\.0\.apk" rel="noopener noreferrer">/);
  assert.match(teks, /Unduh APK v1\.2\.0/);
  assert.match(teks, /20 Oktober 2026/);
  assert.match(teks, /24,3 MB/);
  assert.match(teks, new RegExp(`Android minimum ${s.BELUM_DIVERIFIKASI}`));
  assert.match(html, /href="\.\.\/download\/1\.1\.0\/"/, 'riwayat menautkan detail versi lama');
  assert.doesNotMatch(teks, new RegExp(s.TEKS_BELUM_ADA));

  const lama = s.renderRilis(dataTiruan(), '1.1.0');
  assert.match(lama, /href="\.\.\/\.\.\/unduh\/lanjut-1\.1\.0\.apk" download=""/, 'APK di situs sendiri: tautan relatif');
  assert.match(tanpaTag(lama), new RegExp(`SHA-256 ${s.BELUM_DIVERIFIKASI}`));
  assert.match(tanpaTag(lama), new RegExp(`Ukuran berkas ${s.BELUM_DIVERIFIKASI}`));
  assert.match(lama, /href="\.\.\/\.\.\/download\/"/, 'tautan kembali ke daftar rilis');
  const baru = s.renderRilis(dataTiruan(), '1.2.0');
  assert.match(baru, new RegExp(`<code class="checksum">${'a'.repeat(64)}</code>`));
  assert.match(tanpaTag(baru), /Tidak ada masalah yang dicatat/);
  assert.equal(s.formatUkuran(1024 * 1024 * 3), '3,0 MB');
  assert.equal(s.formatTanggal('2026-01-05'), '5 Januari 2026');
  // Halaman versi berakhiran ".0" tetap halaman (folder), bukan berkas.
  assert.equal(s.alamat('../', '/download/1.2.0'), '../download/1.2.0/');
  assert.equal(s.alamat('./', '/unduh/lanjut-1.2.0.apk'), './unduh/lanjut-1.2.0.apk');
  assert.equal(s.alamat('../../', '/docs/faq#data'), '../../docs/faq/#data');
});

test('status fitur jujur dan konsisten: label resmi saja, AI dan Cerita Alumni belum disebut tersedia', () => {
  const label = Object.values(s.LABEL_STATUS);
  assert.deepEqual(label, ['Tersedia', 'Dalam Pengembangan', 'Direncanakan']);
  const status = Object.fromEntries(s.FITUR.map((f) => [f.id, f.status]));
  assert.equal(status['ai-lanjut'], 'pengembangan');
  assert.equal(status['cerita-alumni'], 'pengembangan');
  for (const id of ['linimasa', 'khusus-smk', 'pilih-mapel', 'daftar-periksa', 'eksplorasi-kampus']) assert.equal(status[id], 'tersedia', id);

  const beranda = halaman('');
  for (const [, t] of beranda.matchAll(/<span class="status status--[a-z]+"><span class="status__ikon" aria-hidden="true"><\/span>([^<]+)<\/span>/g)) {
    assert.ok(label.includes(t), `status tak dikenal: ${t}`);
  }
  // Kartu fitur beranda: nama lalu status dari sumber yang sama (konten/fitur.ts).
  const kartu = [...beranda.matchAll(/<li class="fitur__kartu"><div class="fitur__kartu-kepala"><h3>([^<]+)<\/h3><span class="status status--([a-z]+)">/g)];
  assert.ok(kartu.length >= 8, 'kartu fitur beranda');
  for (const [, nama, st] of kartu) assert.equal(st, s.FITUR.find((f) => f.nama === nama)?.status, `${nama} di beranda`);
  // Baris solusi: status sama dengan konten (AI LANJUT tetap Dalam Pengembangan).
  for (const b of s.SOLUSI.baris) {
    const blok = new RegExp(`${b.fitur.replace(/[()]/g, '\\$&')}(<!-- -->)? <span class="status status--${b.status}"`);
    assert.match(beranda, blok, `solusi ${b.masalah}`);
  }
  assert.equal(s.SOLUSI.baris.find((b) => /AI LANJUT/.test(b.fitur)).status, 'pengembangan');
  const fitur = tanpaTag(halaman('docs/product/features'));
  for (const f of s.FITUR) assert.ok(fitur.includes(f.nama), `docs fitur tanpa ${f.nama}`);
  // SMK-first, bukan SMK-only: jenjang lain disebut bisa memakai sebagian fitur, bukan semuanya.
  assert.match(tanpaTag(beranda), /Siswa SMA, MA, dan SMP juga bisa memakai sebagian fitur/);
});

test('AI LANJUT: label "Contoh konsep", tanpa kolom obrolan palsu, batasan dan status tertulis', () => {
  const beranda = isiRoot(halaman(''));
  assert.match(tanpaTag(beranda), /AI LANJUT \(Ngobrol\) Dalam Pengembangan/);
  assert.match(tanpaTag(beranda), /jawaban AI belum aktif/);
  for (const jalur of ['', 'ai']) {
    assert.doesNotMatch(isiRoot(halaman(jalur)), /<(input|textarea|form|button)\b/, `/${jalur}: tidak boleh ada kolom obrolan yang tampak berfungsi`);
  }
  const html = isiRoot(halaman('ai'));
  const teks = tanpaTag(html);
  assert.match(teks, /Contoh konsep · bukan AI sungguhan/i);
  assert.match(teks, /Belum aktif di aplikasi versi uji/);
  assert.match(teks, /Dalam Pengembangan/);
  assert.ok(teks.includes(s.CONTOH_ARAH.slice(0, 40)), 'jawaban contoh ditulis sebagai arah rancangan');
  const ai = tanpaTag(halaman('ai'));
  assert.match(ai, /Bukan pengganti guru BK/);
  assert.match(ai, /bisa keliru/);
  assert.match(ai, /112/);
});

test('bisnis ditulis sebagai hipotesis; roadmap tanpa tanggal; tanpa angka atau klaim yang dikarang', () => {
  const bisnis = tanpaTag(halaman('docs/business/model'));
  assert.match(bisnis, /Hipotesis/);
  assert.match(bisnis, /Belum ada sistem pembayaran/);
  assert.match(bisnis, /Belum ada mitra yang diumumkan/);
  assert.doesNotMatch(bisnis, /Rp\s?\d|%|\d+\s?(pengguna|siswa|sekolah|mitra)\b/i, 'tanpa harga, persentase, atau jumlah pengguna');
  const halamanRoadmap = halaman('docs/product/roadmap');
  assert.match(tanpaTag(halamanRoadmap), /Rencana/);
  // Hanya isi artikel: meta "Diperbarui …" dan kaki memang memuat tanggal/tahun.
  const isiRoadmap = tanpaTag(/<div class="prosa">([\s\S]*?)<\/div><nav class="docs__sebelah"/.exec(halamanRoadmap)[1]);
  assert.doesNotMatch(
    isiRoadmap,
    /\b20\d\d\b|Januari|Februari|Maret|April|Mei|Juni|Juli|Agustus|September|Oktober|November|Desember|kuartal|semester|Q[1-4]\b/,
    'roadmap tanpa tanggal'
  );
  for (const r of s.RUTE.filter((x) => x.halaman !== 'privasi-aplikasi')) {
    const teks = tanpaTag(isiRoot(halaman(r.jalur)));
    assert.doesNotMatch(teks, /\d+(\.\d+)?\s?(%|ribu|juta) (siswa|pengguna|unduhan)|testimoni|didukung oleh (Kemendikdasmen|Kemendikbud)/i, r.jalur);
  }
});

test('dokumentasi: kategori, daftar isi, tanggal pembaruan, remah roti, dan tautan antarartikel', () => {
  for (const a of s.ARTIKEL) {
    const html = halaman(a.jalur);
    assert.match(a.diperbarui, /^\d{4}-\d{2}-\d{2}$/);
    assert.match(html, new RegExp(`<time dateTime="${a.diperbarui}">|<time datetime="${a.diperbarui}">`, 'i'), a.jalur);
    assert.match(html, /aria-label="Remah roti"/, a.jalur);
    assert.match(html, /aria-label="Dokumentasi"/, a.jalur);
    if (a.bagian.length >= 3) assert.match(html, /aria-label="Di halaman ini"/, `${a.jalur}: daftar isi`);
    for (const b of a.bagian) assert.ok(html.includes(`id="${b.id}"`), `${a.jalur}#${b.id}`);
  }
  // Tautan sebaris di isi dokumentasi hanya ke halaman yang ada (jangkar boleh).
  const jalurAda = new Set(s.RUTE.map((r) => r.jalur));
  for (const a of s.ARTIKEL) {
    const teks = JSON.stringify(a.bagian);
    for (const m of teks.matchAll(/\]\((\/[^)\s]*)\)/g)) {
      const [jalur, bagian] = m[1].slice(1).split('#');
      assert.ok(jalurAda.has(jalur.replace(/\/$/, '')), `${a.jalur}: tautan ke /${jalur} tidak ada`);
      if (bagian && jalur.startsWith('docs/')) {
        const tuju = s.ARTIKEL.find((x) => x.jalur === jalur);
        assert.ok(tuju.bagian.some((b) => b.id === bagian), `${a.jalur}: jangkar #${bagian} tidak ada di /${jalur}`);
      }
    }
  }
  assert.deepEqual(s.KATEGORI.map((k) => k.id), ['produk', 'bisnis', 'teknis', 'bantuan']);
});

test('tampilan dokumentasi: pita judul, sidebar dengan artikel aktif, kartu kategori, blok kode gelap', () => {
  // Indeks: pintasan ke setiap kartu kategori, dan kartunya memang ada.
  const indeks = isiRoot(halaman('docs'));
  assert.match(indeks, /<header class="pita pita--penuh">[\s\S]*?<h1 id="judul-docs"/);
  for (const k of s.KATEGORI) {
    assert.ok(indeks.includes(`href="#kategori-${k.id}"`), `pintasan ${k.id}`);
    assert.match(indeks, new RegExp(`<section id="kategori-${k.id}" class="kartu-docs"`), `kartu ${k.id}`);
  }
  // Artikel: judul di pita, tepat satu artikel aktif di sidebar (desktop dan menu HP).
  for (const a of s.ARTIKEL) {
    const html = isiRoot(halaman(a.jalur));
    assert.match(html, /<header class="pita pita--baca">[\s\S]*?aria-label="Remah roti"[\s\S]*?<h1 id="judul-artikel"/, a.jalur);
    assert.equal((html.match(/aria-current="page" href=|href="[^"]*" aria-current="page"/g) ?? []).length, 2, `${a.jalur}: artikel aktif di sidebar dan menu HP`);
  }
  // Blok kode: gelap, bisa difokus untuk digulir, dan isi releases.json persis datanya.
  const rilis = isiRoot(halaman('docs/technical/releases'));
  const blok = [...rilis.matchAll(/<figure class="kode" aria-label="([^"]+)">[\s\S]*?<div class="kode__gulir" role="region" aria-label="[^"]+" tabindex="0"><pre><code>([\s\S]*?)<\/code><\/pre><\/div><\/figure>/g)];
  assert.deepEqual(
    blok.map((m) => m[1]),
    ['Isi releases.json saat ini', 'Perintah checksum di Windows', 'Perintah checksum di macOS atau Linux']
  );
  assert.equal(dekode(blok[0][2]), JSON.stringify(s.dataRilis, null, 2));
  assert.equal(dekode(blok[1][2]), 'Get-FileHash lanjut.apk -Algorithm SHA256');
  // Tanpa JS tombol Salin tidak dirender (baru muncul bila clipboard tersedia).
  assert.doesNotMatch(rilis, /kode__salin/);
  const css = fs.readFileSync(path.join(AKAR, 'src', 'gaya', 'docs.css'), 'utf8');
  assert.match(css, /\.kode \{[^}]*background: var\(--blue-950\)/);
  assert.doesNotMatch(css, /border-left/, 'tanpa garis aksen kiri (aturan design system)');
});

test('glosarium: definisi ≤ 2 kalimat, istilah seleksi bersumber resmi, kartu per huruf, alat cari dan huruf', () => {
  const kalimat = (t) => (t.match(/[.!?](\s|$)/g) ?? []).length;
  const ids = new Set(s.ISTILAH.map((i) => i.id));
  assert.equal(ids.size, s.ISTILAH.length, 'id istilah unik');
  // Urut abjad, seperti yang dibaca orang.
  const urut = [...s.ISTILAH].sort((a, b) => a.istilah.localeCompare(b.istilah, 'id', { sensitivity: 'base' }));
  assert.deepEqual(s.ISTILAH.map((i) => i.id), urut.map((i) => i.id));
  for (const i of s.ISTILAH) {
    assert.ok(kalimat(i.definisi) >= 1 && kalimat(i.definisi) <= 2, `${i.istilah}: definisi 1–2 kalimat (${kalimat(i.definisi)})`);
    for (const t of i.terkait ?? []) assert.ok(ids.has(t), `${i.istilah}: istilah terkait ${t} tidak ada`);
    if (i.kelompok === 'seleksi') {
      assert.ok(i.sumber?.length, `${i.istilah}: istilah seleksi wajib bersumber resmi`);
      assert.match(i.dicek ?? '', /^\d{4}-\d{2}-\d{2}$/, `${i.istilah}: tanggal dicek`);
      assert.ok(i.dicek <= HARI_INI || i.dicek <= s.hariIniWib(), `${i.istilah}: tanggal dicek di masa depan`);
      assert.match(i.ketentuan ?? '', /\b20\d\d\b/, `${i.istilah}: tahun ketentuan`);
      for (const x of i.sumber) assert.match(new URL(x.url).hostname, /(^|\.)snpmb\.id$|\.go\.id$/, `${i.istilah}: ${x.url} bukan sumber resmi`);
    }
  }
  // Istilah aturan seleksi yang wajib ada, semuanya berkelompok seleksi (jadi bersumber).
  for (const nama of ['SNPMB', 'SNBP', 'SNBT', 'UTBK', 'TKA', 'PDSS', 'KIP Kuliah', 'Seleksi mandiri', 'Siswa eligible']) {
    const i = s.ISTILAH.find((x) => x.istilah === nama);
    assert.ok(i, `istilah ${nama} hilang`);
    assert.equal(i.kelompok, 'seleksi', `${nama} harus berkelompok seleksi`);
  }
  // Istilah aplikasi mengikuti konten/fitur.ts, termasuk statusnya.
  for (const f of s.FITUR) assert.equal(s.ISTILAH.find((i) => i.id === `aplikasi-${f.id}`)?.status, f.status, f.nama);

  const html = isiRoot(halaman('docs/glossary'));
  assert.match(html, /<header class="pita pita--penuh">[\s\S]*?aria-label="Remah roti"[\s\S]*?<h1 id="judul-glosarium"/);
  // Pola kartu dokumentasi: satu kartu per huruf awal, semua istilah tampil di HTML awal.
  const huruf = [...new Set(s.ISTILAH.map((i) => i.istilah[0].toUpperCase()))];
  for (const h of huruf) assert.match(html, new RegExp(`<section id="huruf-${h}" class="kartu-docs glosarium__grup"`), `kartu huruf ${h}`);
  for (const i of s.ISTILAH) assert.ok(html.includes(`id="${i.id}"`), `butir ${i.id}`);
  assert.doesNotMatch(html, /\shidden=""/, 'tanpa JS tidak ada istilah yang tersembunyi');
  // Tautan sumber keluar tanpa referrer, dengan keterangan situs luar untuk pembaca layar.
  for (const u of Object.values(s.SUMBER).map((x) => x.url)) {
    assert.ok(html.includes(`href="${u}" rel="noopener noreferrer" class="tautan-luar"`), `tautan sumber ${u}`);
  }
  // Alat: kolom cari berlabel, tombol huruf A–Z (yang tanpa istilah dinonaktifkan), jumlah hasil diumumkan.
  assert.match(html, /<label for="cari-istilah"[^>]*>Cari istilah<\/label><input id="cari-istilah"[^>]*type="search"/);
  for (const h of 'ABCDEFGHIJKLMNOPQRSTUVWXYZ') {
    const tombol = new RegExp(`<button type="button" class="glosarium__tombol-huruf" aria-pressed="false"( disabled="")?>${h}</button>`).exec(html);
    assert.ok(tombol, `tombol huruf ${h}`);
    assert.equal(Boolean(tombol[1]), !huruf.includes(h), `tombol ${h}: nonaktif hanya bila tanpa istilah`);
  }
  assert.match(html, /<p class="glosarium__jumlah" aria-live="polite">\d+ istilah<\/p>/);
  const css = semuaBerkas(path.join(DIST, 'assets')).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(f, 'utf8')).join('');
  assert.match(css, /html:not\(\[data-js\]\) \.glosarium__alat\{display:none\}/, 'alat cari disembunyikan tanpa JS');
  // Pencarian: istilah, kepanjangan, dan definisi; tanpa beda huruf besar/kecil.
  const snbp = s.ISTILAH.find((i) => i.id === 'snbp');
  assert.ok(s.cocokIstilah(snbp, 'snbp') && s.cocokIstilah(snbp, 'PRESTASI') && s.cocokIstilah(snbp, '  rapor '));
  assert.ok(!s.cocokIstilah(snbp, 'politeknik'));
  // Bisa dicapai dari dokumentasi dan kaki situs.
  assert.match(isiRoot(halaman('docs')), /href="\.\.\/docs\/glossary\/"/);
  assert.match(isiRoot(halaman('docs/faq')), /href="\.\.\/\.\.\/docs\/glossary\/"/);
});

test('kebijakan privasi aplikasi dirender persis dari datanya, urut, dengan status DRAF', () => {
  const k = s.dataKebijakan;
  const html = isiRoot(halaman('privacy/app'));
  const artikel = /<article[\s\S]*<\/article>/.exec(html)[0];
  const urutan = [...artikel.matchAll(/<(h1|h2|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => tanpaTag(m[2])).filter(Boolean);
  const harapan = [
    'Privasi',
    'Kebijakan Privasi Aplikasi',
    `Versi ${k.versi} · DRAF, belum berlaku.`,
    k.status,
    'Ringkasan',
    ...k.ringkasan,
    'Masuk dengan kode email dan masuk dengan Google belum dibahas di kebijakan ini. Keduanya sedang ditinjau.',
    ...k.isi.flatMap((b) => [b.judul, ...(b.paragraf ?? []), ...(b.butir ?? [])]),
    'Privasi website ini dijelaskan terpisah di Privasi situs .',
  ];
  assert.deepEqual(urutan, harapan);
  assert.match(k.status, /DRAF/);
});

test('gerak: hormati kurangi gerakan; tidak ada isi yang tersembunyi di HTML awal', () => {
  const css = semuaBerkas(path.join(DIST, 'assets')).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(f, 'utf8')).join('');
  assert.match(css, /@media \(prefers-reduced-motion:\s?reduce\)\{[^}]*animation-duration:\.01ms!important/);
  assert.match(css, /transition-duration:\.01ms!important/);
  for (const f of htmlDist()) assert.doesNotMatch(fs.readFileSync(f, 'utf8'), /data-tampak=/, `${relatif(f)}: elemen disembunyikan sejak awal`);
  const gerak = fs.readFileSync(path.join(AKAR, 'src', 'lib', 'gerak.ts'), 'utf8');
  assert.match(gerak, /prefers-reduced-motion: reduce/);
  assert.match(gerak, /if \(kurangiGerak\(\) \|\| !\('IntersectionObserver' in window\)\) return;/);
  // Loop (maskot melayang, gradasi bergeser) hanya di dalam @media (prefers-reduced-motion: no-preference)
  // dan hanya selama terlihat (data-terlihat=ya).
  const tanpaBlokBoleh = buangBlokMedia(css, /@media\s*\(prefers-reduced-motion:\s?no-preference\)/);
  assert.doesNotMatch(tanpaBlokBoleh, /infinite/, 'animasi loop di luar no-preference');
  const loop = [...css.matchAll(/([^{}]+)\{[^{}]*infinite[^{}]*\}/g)].map((m) => m[1]);
  assert.ok(loop.length >= 2, 'maskot dan gradasi bergeser');
  for (const sel of loop) assert.match(sel, /data-terlihat=["']?ya/, `loop tanpa syarat terlihat: ${sel}`);
});

/** Hapus blok @media yang cocok (kurung kurawal berimbang) dari CSS ter-minify. */
function buangBlokMedia(css, pola) {
  let hasil = css;
  for (let m = pola.exec(hasil); m; m = pola.exec(hasil)) {
    let i = hasil.indexOf('{', m.index);
    let dalam = 0;
    let j = i;
    for (; j < hasil.length; j++) {
      if (hasil[j] === '{') dalam++;
      else if (hasil[j] === '}' && --dalam === 0) break;
    }
    hasil = hasil.slice(0, m.index) + hasil.slice(j + 1);
  }
  return hasil;
}

test('huruf Poppins disimpan sendiri dengan lisensinya; aset gambar app ada dan berukuran wajar', () => {
  const huruf = fs.readdirSync(path.join(DIST, 'assets')).filter((f) => f.endsWith('.woff2')).sort();
  assert.deepEqual(
    huruf.map((f) => f.replace(/-[A-Za-z0-9_-]{8}\.woff2$/, '')),
    ['poppins-latin-400-normal', 'poppins-latin-500-normal', 'poppins-latin-600-normal', 'poppins-latin-700-normal']
  );
  assert.match(fs.readFileSync(path.join(DIST, 'lisensi', 'poppins-OFL.txt'), 'utf8'), /SIL Open Font License, Version 1\.1/);
  assert.match(halaman(''), /<link rel="preload" href="\.\/assets\/poppins-latin-700-normal-[^"]+\.woff2" as="font"/);
  for (const f of s.FITUR.filter((x) => x.gambar)) {
    const p = path.join(DIST, 'gambar', 'app', f.gambar.berkas);
    assert.ok(fs.existsSync(p), f.gambar.berkas);
    assert.ok(fs.statSync(p).size < 150_000, `${f.gambar.berkas} terlalu besar`);
    assert.ok(f.gambar.alt.length > 20, `${f.id}: alt tangkapan layar`);
  }
  assert.match(tanpaTag(halaman('')), /Tangkapan layar aplikasi versi uji/);
});

test('navbar sama di semua halaman; di luar beranda tautan bagian mengarah ke beranda', () => {
  const beranda = halaman('');
  for (const b of s.BAGIAN_BERANDA) assert.ok(beranda.includes(`id="${b.id}"`), `beranda tanpa bagian #${b.id}`);
  const halamanSemua = [...s.RUTE.map((r) => ({ jalur: r.jalur, html: halaman(r.jalur), akar: s.akarDari(r.jalur) })), { jalur: '404', html: fs.readFileSync(path.join(DIST, '404.html'), 'utf8'), akar: '/' }];
  for (const { jalur, html, akar } of halamanSemua) {
    const kepala = /<header class="kepala">[\s\S]*?<\/header>/.exec(html)?.[0];
    assert.ok(kepala, `/${jalur}: navbar`);
    const teks = tanpaTag(kepala);
    for (const label of ['Unduh', ...s.BAGIAN_BERANDA.map((b) => b.label), 'Dokumentasi']) assert.ok(teks.includes(label), `/${jalur}: navbar tanpa ${label}`);
    for (const b of s.BAGIAN_BERANDA) {
      const harap = jalur === '' ? `#${b.id}` : `${akar}#${b.id}`;
      assert.ok(kepala.includes(`href="${harap}"`), `/${jalur}: ${b.label} → ${harap}`);
    }
    assert.ok(kepala.includes(`href="${s.alamat(akar, '/download')}"`), `/${jalur}: tombol Unduh`);
  }
});

test('aturan copy beranda: judul paling banyak 8 kata dan sentence case, isi satu kalimat pendek', () => {
  const kata = (t) => t.trim().split(/\s+/).length;
  const kalimat = (t) => (t.match(/[.!?](\s|$)/g) ?? []).length;
  const judul = [
    `${s.HERO.judulAwal}${s.HERO.judulJ}${s.HERO.judulAkhir}`,
    s.MASALAH.judul,
    ...s.MASALAH.butir.map((b) => b.judul),
    s.AJAKAN,
    `${s.TENTANG.judulAwal} LANJUT ${s.TENTANG.judulTengah} ${s.TENTANG.sorot}`,
    ...s.TENTANG.kartu.map((k) => k.judul),
    s.LANGKAH.judul,
    s.KENAPA_SMK.judul,
    s.SOLUSI.judul,
    s.FAQ.judul,
    ...s.FAQ.butir.map((b) => b.tanya),
    s.PENUTUP.judul,
    s.FITUR_BERANDA.judul,
    ...s.LANGKAH.butir.map((b) => b.judul),
    ...s.KENAPA_SMK.butir.map((b) => b.judul),
    ...s.SOLUSI.baris.map((b) => b.masalah),
  ];
  for (const j of judul) assert.ok(kata(j) <= 8, `judul terlalu panjang: ${j}`);
  // Sentence case (pilihan percakapan 27 Okt 2026): huruf besar hanya di awal judul, singkatan
  // (LANJUT, SMK, PKL, …), dan nama diri yang terdaftar.
  const NAMA_DIRI = new Set(['Play', 'Store']);
  for (const j of judul) {
    assert.match(j, /^[A-Z]/, `judul harus diawali huruf besar: ${j}`);
    for (const w of j.split(/\s+/).slice(1).map((x) => x.replace(/[^\p{L}]/gu, ''))) {
      if (/^[A-Z]/.test(w)) assert.ok(/^[A-Z]{2,}$/.test(w) || NAMA_DIRI.has(w), `bukan sentence case ("${w}"): ${j}`);
    }
  }
  const isi = [
    s.HERO.sub,
    ...s.MASALAH.butir.map((b) => b.isi),
    ...s.TENTANG.kartu.map((k) => k.isi),
    ...s.LANGKAH.butir.map((b) => b.isi),
    s.KENAPA_SMK.pengantar,
    ...s.KENAPA_SMK.butir.map((b) => b.isi),
    ...s.KENAPA_SMK.catatan,
    ...s.SOLUSI.baris.map((b) => b.isi),
    ...s.FAQ.butir.map((b) => b.jawab),
    s.PENUTUP.sub,
    ...s.FITUR.map((f) => f.singkat),
  ];
  for (const t of isi) {
    assert.ok(kalimat(t) <= 1, `lebih dari satu kalimat: ${t}`);
    assert.ok(kata(t) <= 20, `isi terlalu panjang (${kata(t)} kata): ${t}`);
  }
});

test('token: palet resmi LANJUT, gradasi terpasang, dan pasangan teks/latar lolos WCAG AA', () => {
  const token = fs.readFileSync(path.join(AKAR, 'src', 'gaya', 'token.css'), 'utf8');
  const nilai = Object.fromEntries([...token.matchAll(/(--[a-z0-9-]+):\s*(#[0-9a-f]{6})\b/gi)].map((m) => [m[1], m[2]]));
  // Palet resmi (LandingPage/…/tokens/colors.css) tidak diubah.
  assert.deepEqual(
    ['--blue-100', '--blue-200', '--blue-300', '--blue-400', '--blue-500', '--blue-600'].map((k) => nilai[k].toUpperCase()),
    ['#E4F3F7', '#B4E1EB', '#95BDD7', '#78A4CB', '#5E88AF', '#456A8C']
  );
  const lum = (hex) => {
    const [r, g, b] = [1, 3, 5].map((i) => {
      const v = parseInt(hex.slice(i, i + 2), 16) / 255;
      return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const kontras = (a, b) => {
    const [t, r] = [lum(nilai[a] ?? a), lum(nilai[b] ?? b)].sort((x, y) => y - x);
    return (t + 0.05) / (r + 0.05);
  };
  const PASANGAN = [
    ['--white', '--blue-700'], // teks putih di titik latar paling terang
    ['--white', '--blue-800'],
    ['--white', '--blue-900'],
    ['--white', '--blue-950'],
    ['--white', '--blue-600'], // kepala kartu, gelembung obrolan
    ['--blue-900', '--white'], // tombol utama (pill terang)
    ['--blue-900', '--blue-100'],
    ['--blue-900', '--blue-200'],
    ['--status-ok-fg', '--status-ok-bg'],
    ['--status-attention-fg', '--status-attention-bg'],
    ['--status-idle-fg', '--status-idle-bg'],
    ['--blue-600', '--white'], // tautan di permukaan terang
    ['--ink-900', '--ink-050'],
    ['--blue-100', '--blue-950'], // isi blok kode dokumentasi
    ['--blue-200', '--blue-900'], // label bahasa blok kode
    ['--blue-100', '--blue-600'], // nomor kategori di kepala kartu dokumentasi
    ['--ink-700', '--white'], // deskripsi artikel di kartu
    ['--ink-700', '--ink-050'], // judul daftar isi di latar halaman
  ];
  for (const [a, b] of PASANGAN) assert.ok(kontras(a, b) >= 4.5, `${a} di ${b}: ${kontras(a, b).toFixed(2)}:1`);
  assert.match(token, /--gradasi-halaman: linear-gradient\(180deg, var\(--blue-700\) 0%, var\(--blue-800\) 100%\)/);
  const css = semuaBerkas(path.join(DIST, 'assets')).filter((f) => f.endsWith('.css')).map((f) => fs.readFileSync(f, 'utf8')).join('');
  for (const [pemilih, gradasi] of [
    ['.situs--merek', '--gradasi-halaman'],
    ['.tombol--utama', '--gradasi-tombol'],
    ['.kartu__kepala', '--gradasi-kartu'],
    ['.fitur__kartu', '--gradasi-kartu'],
    ['.penutup', '--gradasi-geser'],
    ['.kaki', '--gradasi-kaki'],
    ['.pita', '--gradasi-pita-lanjut'],
    ['.kartu-docs__kepala', '--gradasi-kartu'],
  ]) {
    assert.match(css, new RegExp(`${pemilih.replace('.', '\\.')}\\{[^}]*background:var\\(${gradasi}\\)`), `${pemilih} tanpa ${gradasi}`);
  }
});

test('beranda: tiap seksi punya jenis gerak sendiri; logo resmi tidak diubah; FAQ berupa akordeon', () => {
  const beranda = isiRoot(halaman(''));
  const seksi = (id) => new RegExp(`<section[^>]*id="${id}"[\\s\\S]*?</section>`).exec(beranda)?.[0] ?? '';
  const HARAPAN = {
    masalah: ['kabur', 'dari-kiri', 'dari-kanan'],
    tentang: ['skala', 'naik-urut'],
    langkah: ['garis'],
    'kenapa-smk': ['sapu'],
    solusi: ['sambung'],
    fitur: ['balik'],
  };
  const dipakai = new Map();
  for (const [id, jenis] of Object.entries(HARAPAN)) {
    const html = seksi(id);
    for (const j of jenis) {
      assert.ok(html.includes(`data-gerak="${j}"`), `#${id} tanpa gerak ${j}`);
      assert.ok(!dipakai.has(j), `gerak ${j} dipakai lagi di #${id}`);
      dipakai.set(j, id);
    }
  }
  assert.match(beranda, /<h2 id="judul-ajakan"[^>]*data-gerak="kata"/);
  assert.match(beranda, /class="hero"[\s\S]*class="maskot maskot--melayang hero__maskot" data-loop=""/);
  assert.match(beranda, /<section class="penutup"[^>]*data-loop=""/);
  const faq = seksi('faq');
  assert.equal([...faq.matchAll(/<details class="akordeon__butir">/g)].length, s.FAQ.butir.length);
  // Wordmark persis berkas resmi; maskot dekoratif (alt kosong).
  const sha = (p) => crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex');
  const resmi = path.join(AKAR, '..', 'LandingPage', 'lanjut-landing-page-mockup', 'project', 'assets', 'lanjut-wordmark-trimmed.png');
  assert.equal(sha(path.join(DIST, 'gambar', 'lanjut-wordmark.png')), sha(resmi));
  for (const tag of beranda.match(/<img[^>]*maskot-putih\.webp[^>]*>/g) ?? []) assert.match(tag, /alt=""/);
  assert.match(beranda, /<img[^>]*lanjut-wordmark\.png"[^>]*alt="LANJUT"|<img[^>]*alt="LANJUT"[^>]*lanjut-wordmark\.png/);
});

test('package.json landing hanya memuat paket yang diizinkan, dengan versi persis', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(AKAR, 'package.json'), 'utf8'));
  const semua = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const [nama, versi] of Object.entries(semua)) {
    assert.ok(PAKET_DIIZINKAN.includes(nama), `paket di luar izin: ${nama}`);
    assert.match(versi, /^\d+\.\d+\.\d+$/, `${nama}: versi harus persis, dapat ${versi}`);
  }
});

test('dengan SITUS_URL (domain resmi nanti): tautan kanonis, og:url, dan sitemap berisi semua rute', async () => {
  await bangun({ dist: DIST_SITUS, ssr: path.join(AKAR, '.uji-ssr'), diam: true, hariIni: HARI_INI, situsUrl: 'https://lanjut.contoh.id' });
  const html = fs.readFileSync(path.join(DIST_SITUS, 'docs', 'faq', 'index.html'), 'utf8');
  assert.match(html, /<link rel="canonical" href="https:\/\/lanjut\.contoh\.id\/docs\/faq\/">/);
  assert.match(html, /<meta property="og:url" content="https:\/\/lanjut\.contoh\.id\/docs\/faq\/">/);
  const peta = fs.readFileSync(path.join(DIST_SITUS, 'sitemap.xml'), 'utf8');
  assert.equal([...peta.matchAll(/<loc>/g)].length, s.RUTE.length);
  assert.match(fs.readFileSync(path.join(DIST_SITUS, 'robots.txt'), 'utf8'), /Sitemap: https:\/\/lanjut\.contoh\.id\/sitemap\.xml/);
  assert.doesNotMatch(fs.readFileSync(path.join(DIST_SITUS, '404.html'), 'utf8'), /rel="canonical"/);
  await assert.rejects(() => bangun({ dist: DIST_SITUS, ssr: path.join(AKAR, '.uji-ssr'), diam: true, situsUrl: 'http://lanjut.contoh.id/' }), /SITUS_URL/);
  fs.rmSync(DIST_SITUS, { recursive: true, force: true });
});
