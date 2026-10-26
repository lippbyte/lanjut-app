// Build situs LANJUT (npm run build):
//   1. build klien dengan vite.config.ts (index.html sebagai templat + google-kembali.html);
//   2. build SSR kecil dari src/entri/server.tsx (hanya untuk proses ini, tidak terbit);
//   3. periksa metadata rilis; build gagal bila tidak sah (tidak ada unduhan palsu);
//   4. prerender setiap rute ke dist/<jalur>/index.html, plus 404.html, halaman alihan alamat
//      lama, releases/releases.json, dan robots.txt;
//   5. periksa semua tautan dan berkas internal di dist; build gagal bila ada yang rusak.
//
// Opsional: SITUS_URL=https://domain-resmi (tanpa / di akhir) menambah tautan kanonis,
// og:url, dan sitemap.xml. Selama domain belum ditetapkan, biarkan kosong.
// bangun() juga dipakai tests/landing.test.mjs dengan folder keluaran sendiri.

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import react from '@vitejs/plugin-react';
import { build } from 'vite';

const AKAR = fileURLToPath(new URL('..', import.meta.url));

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const sha256 = (buf) => crypto.createHash('sha256').update(buf).digest('hex');

function semuaBerkas(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? semuaBerkas(p) : [p];
  });
}

/** APK yang di-host bersama situs (apkUrl relatif) harus ada di public/ dan cocok dengan metadatanya. */
function periksaApkLokal(data) {
  for (const r of data.releases) {
    if (/^https:/i.test(r.apkUrl)) continue;
    const berkas = path.join(AKAR, 'public', ...r.apkUrl.split('/'));
    if (!fs.existsSync(berkas)) throw new Error(`APK ${r.version} tidak ada di public/${r.apkUrl}`);
    const isi = fs.readFileSync(berkas);
    if (r.fileSizeBytes !== null && isi.length !== r.fileSizeBytes)
      throw new Error(`APK ${r.version}: fileSizeBytes ${r.fileSizeBytes}, berkasnya ${isi.length} byte`);
    if (r.sha256 !== null && sha256(isi) !== r.sha256) throw new Error(`APK ${r.version}: sha256 tidak cocok dengan berkasnya`);
  }
}

/**
 * Tautan/berkas internal yang tidak ada di dist, atau tautan ke halaman (folder) tanpa garis
 * miring di akhir (alamat relatif di halaman tujuan bergantung padanya). Alamat luar, jangkar,
 * dan lanjut:// dilewati.
 */
export function tautanRusak(dist) {
  const rusak = [];
  for (const f of semuaBerkas(dist).filter((x) => x.endsWith('.html'))) {
    const html = fs.readFileSync(f, 'utf8');
    for (const [, nilai] of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
      if (/^(https?:|mailto:|lanjut:|#|data:)/i.test(nilai)) continue;
      const bersih = nilai.replace(/[#?].*$/, '');
      if (!bersih) continue;
      const dasar = bersih.startsWith('/') ? path.join(dist, bersih) : path.resolve(path.dirname(f), bersih);
      const tuju = bersih.endsWith('/') ? path.join(dasar, 'index.html') : dasar;
      if (!tuju.startsWith(dist) || !fs.existsSync(tuju)) rusak.push(`${path.relative(dist, f)} → ${nilai}`);
      else if (fs.statSync(tuju).isDirectory()) rusak.push(`${path.relative(dist, f)} → ${nilai} (halaman tanpa / di akhir)`);
    }
  }
  return rusak;
}

export async function bangun({ dist = path.join(AKAR, 'dist'), ssr = path.join(AKAR, '.ssr'), diam = false, hariIni, situsUrl = process.env.SITUS_URL } = {}) {
  const logLevel = diam ? 'silent' : 'warn';
  if (situsUrl && !/^https:\/\/[^/]+$/.test(situsUrl)) throw new Error('SITUS_URL harus https://domain tanpa garis miring di akhir');

  // 1–2. Build klien dan SSR.
  await build({ root: AKAR, logLevel, build: { outDir: dist, emptyOutDir: true } });
  await build({
    root: AKAR,
    configFile: false,
    logLevel,
    plugins: [react()],
    build: {
      ssr: path.join(AKAR, 'src', 'entri', 'server.tsx'),
      outDir: ssr,
      emptyOutDir: true,
      rolldownOptions: { output: { entryFileNames: 'server.mjs' } },
    },
  });
  const s = await import(`${pathToFileURL(path.join(ssr, 'server.mjs')).href}?v=${Date.now()}`);

  // 3. Metadata rilis.
  const masalah = s.periksaDataRilis(s.dataRilis, hariIni);
  if (masalah.length) throw new Error(`Metadata rilis (src/data/releases.json) tidak sah:\n- ${masalah.join('\n- ')}`);
  periksaApkLokal(s.dataRilis);

  // 4. Prerender.
  const fileManifest = path.join(dist, '.vite', 'manifest.json');
  const manifest = JSON.parse(fs.readFileSync(fileManifest, 'utf8'));
  const templat = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
  const csp = /<meta http-equiv="Content-Security-Policy" content="([^"]+)">/.exec(templat)?.[1];
  if (!csp) throw new Error('CSP tidak ada di templat hasil build');
  // Huruf yang dimuat lebih dulu: Poppins 700 (judul) dan 400 (isi). 500/600 dimuat saat dipakai.
  const huruf = fs.readdirSync(path.join(dist, 'assets')).filter((f) => /^poppins-latin-(400|700)-normal-.*\.woff2$/.test(f));
  if (huruf.length !== 2) throw new Error('berkas huruf Poppins 400/700 tidak ada di dist/assets');
  const entri = manifest['index.html']?.file;

  const potonganHalaman = (id) => {
    const kunci = s.BERKAS_HALAMAN[id];
    if (!manifest[kunci]) throw new Error(`halaman ${id} (${kunci}) tidak ada di manifest Vite`);
    const berkas = new Set();
    const kunjungi = (k) => {
      const m = manifest[k];
      if (!m || berkas.has(m.file)) return;
      berkas.add(m.file);
      for (const i of m.imports ?? []) kunjungi(i);
    };
    kunjungi(kunci);
    berkas.delete(entri);
    return [...berkas];
  };

  const tulisHalaman = (rute, akar, keluar) => {
    const jalurUrl = rute.jalur && rute.jalur !== '404' ? `${rute.jalur}/` : '';
    const kepala = [
      `<meta name="description" content="${esc(rute.deskripsi)}">`,
      '<meta property="og:type" content="website">',
      '<meta property="og:site_name" content="LANJUT">',
      '<meta property="og:locale" content="id_ID">',
      `<meta property="og:title" content="${esc(rute.judul)}">`,
      `<meta property="og:description" content="${esc(rute.deskripsi)}">`,
      ...(situsUrl && rute.jalur !== '404'
        ? [`<link rel="canonical" href="${situsUrl}/${jalurUrl}">`, `<meta property="og:url" content="${situsUrl}/${jalurUrl}">`]
        : []),
      ...huruf.map((f) => `<link rel="preload" href="${akar}assets/${f}" as="font" type="font/woff2" crossorigin>`),
      ...potonganHalaman(rute.halaman).map((f) => `<link rel="modulepreload" crossorigin href="${akar}${f}">`),
    ].join('\n    ');
    const isi = s.render(rute.halaman, rute.jalur, akar);
    const html = templat
      // Aset templat (skrip, gaya, ikon) relatif terhadap kedalaman halaman ini.
      .replace(/(\s(?:src|href))="\.\//g, `$1="${akar}`)
      .replace(/^<!--[\s\S]*?-->\n/m, '')
      .replace('<title>LANJUT</title>', `<title>${esc(rute.judul)}</title>`)
      .replace('<!--lanjut:kepala-->', kepala)
      .replace(
        '<div id="root"><!--lanjut:isi--></div>',
        `<div id="root" data-halaman="${rute.halaman}" data-jalur="${esc(rute.jalur)}" data-akar="${akar}">${isi}</div>`
      );
    fs.mkdirSync(path.dirname(keluar), { recursive: true });
    fs.writeFileSync(keluar, html);
  };

  for (const rute of s.RUTE) {
    const akar = s.akarDari(rute.jalur);
    tulisHalaman(rute, akar, path.join(dist, ...rute.jalur.split('/').filter(Boolean), 'index.html'));
  }
  // 404.html bisa disajikan hosting di alamat sedalam apa pun: asetnya beralamat mutlak.
  tulisHalaman(s.RUTE_404, '/', path.join(dist, '404.html'));

  for (const a of s.ALIHAN) {
    const ke = s.alamat('./', a.ke);
    fs.writeFileSync(
      path.join(dist, a.berkas),
      `<!doctype html>
<html lang="id" data-status="draf">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="Content-Security-Policy" content="${csp}">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex">
    <meta http-equiv="refresh" content="0; url=${ke}">
    <title>${esc(a.judul)} · LANJUT</title>
  </head>
  <body>
    <p>Halaman ini sudah pindah ke <a href="${ke}">${esc(a.judul)}</a>.</p>
  </body>
</html>
`
    );
  }

  fs.mkdirSync(path.join(dist, 'releases'), { recursive: true });
  fs.writeFileSync(path.join(dist, 'releases', 'releases.json'), `${JSON.stringify(s.dataRilis, null, 2)}\n`);

  fs.writeFileSync(
    path.join(dist, 'robots.txt'),
    [
      '# Situs LANJUT masih DRAF: semua halaman memakai <meta name="robots" content="noindex">.',
      '# Perayap tetap diizinkan membaca halaman supaya tanda noindex itu terlihat.',
      'User-agent: *',
      'Allow: /',
      ...(situsUrl ? [`Sitemap: ${situsUrl}/sitemap.xml`] : []),
      '',
    ].join('\n')
  );
  if (situsUrl) {
    const url = s.RUTE.map((r) => `  <url><loc>${situsUrl}/${r.jalur ? `${r.jalur}/` : ''}</loc></url>`).join('\n');
    fs.writeFileSync(
      path.join(dist, 'sitemap.xml'),
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${url}\n</urlset>\n`
    );
  }

  fs.rmSync(path.dirname(fileManifest), { recursive: true, force: true });

  // 5. Tautan internal.
  const rusak = tautanRusak(dist);
  if (rusak.length) throw new Error(`Tautan atau berkas internal rusak:\n- ${rusak.join('\n- ')}`);

  return { dist, ssr: s };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  bangun()
    .then(({ dist }) => console.log(`[bangun] selesai: ${path.relative(process.cwd(), dist) || '.'}`))
    .catch((e) => {
      console.error(`[bangun] gagal: ${e.message}`);
      process.exit(1);
    });
}
