// Tes landing (LANJUT_083b; menggantikan pemeriksaan HTML statis 083 di
// LANJUT_App/server/tests/landing.test.js). Tanpa paket tambahan: node --test, Vite, React.
//
// before(): (1) build sungguhan dengan vite.config.ts yang sama dengan `npm run build`, ke
// .uji-build/; (2) build SSR kecil (tests/ssr-entri.tsx) supaya komponen halaman bisa dirender
// di Node untuk memeriksa isinya.

import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { before, test } from 'node:test';
import { fileURLToPath, pathToFileURL } from 'node:url';

import react from '@vitejs/plugin-react';
import { build } from 'vite';

const AKAR = fileURLToPath(new URL('..', import.meta.url));
const DIST = path.join(AKAR, '.uji-build');
const KELUAR_SSR = path.join(AKAR, '.uji-ssr');
const HALAMAN = ['index.html', 'panduan-uji.html', 'kebijakan-privasi.html', 'google-kembali.html'];
const PAKET_DIIZINKAN = ['vite', 'react', 'react-dom', '@vitejs/plugin-react', '@types/react', '@types/react-dom'];

let ssr;

before(async () => {
  await build({ root: AKAR, logLevel: 'silent', build: { outDir: DIST } });
  await build({
    root: AKAR,
    configFile: false,
    logLevel: 'silent',
    plugins: [react()],
    build: {
      ssr: path.join(AKAR, 'tests', 'ssr-entri.tsx'),
      outDir: KELUAR_SSR,
      emptyOutDir: true,
      rolldownOptions: { output: { entryFileNames: 'ssr.mjs' } },
    },
  });
  ssr = await import(pathToFileURL(path.join(KELUAR_SSR, 'ssr.mjs')).href);
});

function semuaBerkas(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? semuaBerkas(p) : [p];
  });
}

const bacaDist = (nama) => fs.readFileSync(path.join(DIST, nama), 'utf8');
const teksDist = () =>
  semuaBerkas(DIST)
    .filter((f) => /\.(html|js|css)$/.test(f))
    .map((f) => ({ nama: path.relative(DIST, f).split(path.sep).join('/'), isi: fs.readFileSync(f, 'utf8') }));

const dekode = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#x27;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
const tanpaTag = (s) => dekode(s.replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();

test('build berhasil: keempat halaman jadi berkas HTML di dist, masing-masing dengan skrip modulnya sendiri', () => {
  for (const nama of HALAMAN) {
    const html = bacaDist(nama);
    assert.match(html, /<div id="root"><\/div>/, nama);
    const skrip = [...html.matchAll(/<script type="module" crossorigin src="([^"]+)"><\/script>/g)].map((m) => m[1]);
    assert.equal(skrip.length, 1, `${nama}: satu skrip modul`);
    for (const rujukan of [...html.matchAll(/(?:src|href)="(\.\/[^"]+)"/g)].map((m) => m[1])) {
      assert.ok(fs.existsSync(path.join(DIST, rujukan)), `${nama} → ${rujukan} tidak ada di dist`);
    }
  }
});

test('noindex ada di keempat halaman (juga DRAF, viewport, dan bahasa id)', () => {
  for (const nama of HALAMAN) {
    const html = bacaDist(nama);
    assert.match(html, /<meta name="robots" content="noindex">/, nama);
    assert.match(html, /<html lang="id" data-status="draf">/, nama);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1">/, nama);
  }
});

test('tanpa skrip, font, atau pelacak dari luar; CSP default-src self tanpa unsafe-inline; tanpa skrip sebaris', () => {
  for (const nama of HALAMAN) {
    const html = bacaDist(nama);
    const csp = /<meta http-equiv="Content-Security-Policy" content="([^"]+)">/.exec(html);
    assert.ok(csp, `${nama}: CSP`);
    assert.match(csp[1], /^default-src 'self';/);
    assert.match(csp[1], /script-src 'self'/);
    assert.doesNotMatch(csp[1], /unsafe-inline|unsafe-eval|https?:|\*/);
    for (const tag of html.match(/<script\b[^>]*>/g) || []) {
      assert.match(tag, /\ssrc="\.\//, `${nama}: skrip harus berkas sendiri (relatif): ${tag}`);
    }
    assert.doesNotMatch(html, /<script\b(?![^>]*\ssrc=)[^>]*>/, `${nama}: ada skrip sebaris`);
    for (const tag of html.match(/<link\b[^>]*>/g) || []) {
      assert.match(tag, /\shref="\.\//, `${nama}: tautan harus berkas sendiri (relatif): ${tag}`);
    }
  }
  for (const { nama, isi } of teksDist()) {
    if (nama.endsWith('.css')) assert.doesNotMatch(isi, /@import|@font-face|url\(\s*['"]?(https?:)?\/\//i, nama);
    assert.doesNotMatch(isi, /googletagmanager|gtag\(|google-analytics|fonts\.googleapis|gstatic|facebook|fbq\(|hotjar/i, nama);
  }
});

test('halaman penerus Google: google-kembali.html berkas statis di dist, dan logika penerusnya ikut', () => {
  assert.ok(fs.statSync(path.join(DIST, 'google-kembali.html')).isFile());
  const html = bacaDist('google-kembali.html');
  const skrip = /<script type="module" crossorigin src="\.\/([^"]+)">/.exec(html)[1];
  assert.match(fs.readFileSync(path.join(DIST, skrip), 'utf8'), /lanjut:\/\/masuk-google/);

  assert.equal(ssr.tujuanPenerus('#state=abc&id_token=aaa.bbb.ccc&authuser=0&prompt=none'), 'lanjut://masuk-google?state=abc&id_token=aaa.bbb.ccc');
  assert.equal(ssr.tujuanPenerus('#error=access_denied&state=abc'), 'lanjut://masuk-google?error=access_denied&state=abc');
  assert.equal(ssr.tujuanPenerus(''), null);
  assert.equal(ssr.tujuanPenerus('#authuser=0'), null);
  assert.match(ssr.render.googleKembali(null), /Tidak ada data masuk dari Google/);
  assert.match(ssr.render.googleKembali('lanjut://masuk-google?state=a'), /href="lanjut:\/\/masuk-google\?state=a"/);
  // Penerus tidak menghubungi jaringan dan tidak menyimpan apa pun (sama dengan 083).
  for (const sumber of ['src/lib/penerus.ts', 'src/entri/google-kembali.tsx', 'src/halaman/GoogleKembali.tsx']) {
    assert.doesNotMatch(
      fs.readFileSync(path.join(AKAR, sumber), 'utf8'),
      /fetch|XMLHttpRequest|localStorage|sessionStorage|cookie|sendBeacon/,
      sumber
    );
  }
});

test('URL http(s) di dist hanya string yang tidak memicu permintaan (namespace w3.org, tautan galat React)', () => {
  const DISENGAJA = [/^http:\/\/www\.w3\.org\/(1998\/Math\/MathML|1999\/xhtml|1999\/xlink|2000\/svg|XML\/1998\/namespace)$/, /^https:\/\/react\.dev\/errors\/$/];
  const ditemukan = new Set();
  for (const { isi } of teksDist()) for (const m of isi.matchAll(/https?:\/\/[^\s"'`)<>\\]+/g)) ditemukan.add(m[0]);
  const lain = [...ditemukan].filter((u) => !DISENGAJA.some((re) => re.test(u)));
  assert.deepEqual(lain, [], `URL tak terduga: ${lain.join(', ')}`);
});

test('tidak ada kunci, kata sandi, atau alamat server internal di dist', () => {
  for (const { nama, isi } of teksDist()) {
    assert.doesNotMatch(isi, /localhost|127\.0\.0\.1|\b10\.\d+\.\d+\.\d+|\b192\.168\.|\b172\.(1[6-9]|2\d|3[01])\./, nama);
    assert.doesNotMatch(isi, /\/api\/v1|:4000|:8081|GANTI-DOMAIN/, nama);
    assert.doesNotMatch(isi, /sk-or-|client_secret/i, nama);
    assert.doesNotMatch(isi, /OPENROUTER_|SMTP_|GOOGLE_CLIENT|\.env\b|LANJUT_App/, nama);
  }
});

test('isi wajib halaman utama: per jenjang, Unduh APK, cara pasang, tautan panduan & kebijakan, versi uji', () => {
  const html = ssr.render.beranda();
  const teks = tanpaTag(html);
  for (const jenjang of ['SMP', 'SMA', 'SMK', 'MA']) assert.match(teks, new RegExp(`\\b${jenjang}\\b`));
  assert.match(teks, /Unduh APK/);
  assert.match(teks, /Izinkan dari sumber ini/);
  assert.match(teks, /Instal aplikasi tak dikenal/);
  assert.match(html, /href="panduan-uji\.html"/);
  assert.match(html, /href="kebijakan-privasi\.html"/);
  assert.match(teks, /versi uji/i);
  assert.match(teks, /DRAF — teks halaman ini belum disetujui\./);
});

test('tombol APK: tautan hanya bila berkas ada; bila belum ada, keterangan "APK sedang disiapkan" tanpa tautan', () => {
  const ada = ssr.render.tombolApk('ada');
  assert.match(ada, /<a class="tombol tombol--penuh" href="lanjut-demo\.apk" download="">Unduh APK<\/a>/);
  assert.doesNotMatch(ada, /sedang disiapkan/);

  const belum = ssr.render.tombolApk('belum');
  assert.match(belum, /<button[^>]*disabled=""[^>]*>Unduh APK<\/button>/);
  assert.match(belum, /APK sedang disiapkan\./);
  assert.doesNotMatch(belum, /href=/);

  const memeriksa = ssr.render.tombolApk('memeriksa');
  assert.match(memeriksa, /<button[^>]*disabled=""[^>]*>Unduh APK<\/button>/);
  assert.doesNotMatch(memeriksa, /href=|sedang disiapkan/);
  // Render awal halaman utama (sebelum pengecekan) tidak pernah memuat tautan APK.
  assert.doesNotMatch(ssr.render.beranda(), /href="lanjut-demo\.apk"/);
});

test('apkTersedia: hanya ke berkas sendiri; 200 non-HTML = ada; 404, HTML, galat = belum; tanpa HEAD pakai Range', async () => {
  const jawab = (status, jenis) => new Response(status === 200 || status === 206 ? 'x' : null, { status, headers: jenis ? { 'content-type': jenis } : {} });
  const tiruan = (...urutan) => {
    const panggilan = [];
    const ambil = async (url, opsi) => {
      panggilan.push({ url, opsi });
      const berikut = urutan.shift();
      if (berikut instanceof Error) throw berikut;
      return berikut;
    };
    return { ambil, panggilan };
  };

  let t = tiruan(jawab(200, 'application/vnd.android.package-archive'));
  assert.equal(await ssr.apkTersedia(undefined, t.ambil), true);
  assert.deepEqual([t.panggilan[0].url, t.panggilan[0].opsi.method], ['lanjut-demo.apk', 'HEAD']);
  assert.equal(await ssr.apkTersedia(undefined, tiruan(jawab(200, 'application/octet-stream')).ambil), true);
  assert.equal(await ssr.apkTersedia(undefined, tiruan(jawab(404)).ambil), false);
  assert.equal(await ssr.apkTersedia(undefined, tiruan(jawab(200, 'text/html; charset=utf-8')).ambil), false);
  assert.equal(await ssr.apkTersedia(undefined, tiruan(new TypeError('jaringan putus')).ambil), false);

  t = tiruan(jawab(405), jawab(206, 'application/vnd.android.package-archive'));
  assert.equal(await ssr.apkTersedia(undefined, t.ambil), true);
  assert.equal(t.panggilan[1].opsi.headers.Range, 'bytes=0-0');
  assert.equal(t.panggilan[1].opsi.method, undefined);
  assert.equal(await ssr.apkTersedia(undefined, tiruan(jawab(405), jawab(404)).ambil), false);
});

test('kebijakan privasi dirender persis dari datanya, urut, dengan status DRAF (susunan 083)', () => {
  const k = ssr.dataKebijakan;
  const html = ssr.render.kebijakan();
  const urutan = [...html.matchAll(/<(h1|h2|p|li)\b[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => tanpaTag(m[2]));
  const harapan = [
    k.status,
    'Kebijakan Privasi',
    `Versi ${k.versi} · DRAF, belum berlaku.`,
    'Ringkasan',
    ...k.ringkasan,
    'Masuk dengan kode email dan masuk dengan Google belum dibahas di kebijakan ini. Keduanya sedang ditinjau.',
    ...k.isi.flatMap((b) => [b.judul, ...(b.paragraf ?? []), ...(b.butir ?? [])]),
    'LANJUT oleh EDILAKSO Group · versi uji 2026 · Teks halaman ini DRAF.',
  ];
  assert.deepEqual(urutan, harapan);
  assert.match(k.status, /DRAF/);
});

test('package.json landing hanya memuat paket yang diizinkan, dengan versi persis', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(AKAR, 'package.json'), 'utf8'));
  const semua = { ...pkg.dependencies, ...pkg.devDependencies };
  for (const [nama, versi] of Object.entries(semua)) {
    assert.ok(PAKET_DIIZINKAN.includes(nama), `paket di luar izin: ${nama}`);
    assert.match(versi, /^\d+\.\d+\.\d+$/, `${nama}: versi harus persis, dapat ${versi}`);
  }
});

test('tautan antarhalaman menunjuk berkas yang ada di dist (APK diletakkan PM, dicek saat dibuka)', () => {
  const html = [ssr.render.beranda(), ssr.render.panduanUji(), ssr.render.kebijakan()].join('\n');
  for (const href of new Set([...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1]))) {
    if (href === ssr.BERKAS_APK) continue;
    const berkas = href === './' ? 'index.html' : href;
    assert.ok(fs.existsSync(path.join(DIST, berkas)), `${href} tidak ada di dist`);
  }
});
