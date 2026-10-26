// Situs LANJUT (redesign PRD-landpage). Dua masukan HTML: index.html (templat semua halaman
// yang diprerender oleh scripts/bangun.mjs) dan google-kembali.html, yang alamatnya
// didaftarkan di Google Cloud Console sehingga nama dan perilakunya tidak boleh berubah.
import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const AKAR = fileURLToPath(new URL('.', import.meta.url));

// Jalur berkas (bukan halaman). Sama dengan BERKAS di src/lib/situs.ts: halaman versi seperti
// /download/1.2.0 berakhiran ".0" tetapi tetap halaman.
const BERKAS = /\.(png|webp|jpe?g|svg|ico|json|txt|xml|apk|html?|css|m?js|woff2?|pdf)$/i;

export const HALAMAN = ['index', 'google-kembali'] as const;

// Hanya berkas sendiri. Tanpa 'unsafe-inline' untuk skrip maupun gaya (atribut style pun ditolak).
export const CSP =
  "default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self'; font-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'";

// CSP hanya disisipkan saat build: server dev Vite memakai skrip sebaris (React Refresh)
// yang memang akan ditolak CSP ini.
function cspSaatBuild(): Plugin {
  return {
    name: 'lanjut-csp-saat-build',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<meta charset="utf-8">',
        `<meta charset="utf-8">\n    <meta http-equiv="Content-Security-Policy" content="${CSP}">`
      );
    },
  };
}

// Server dev: alamat halaman (/docs/faq/, /download) dilayani dari index.html; entri klien
// memilih halamannya dari alamat. Berkas (ada ekstensinya) dan modul Vite tidak disentuh.
function ruteDev(): Plugin {
  return {
    name: 'lanjut-rute-dev',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, _res, next) => {
        const [jalur] = (req.url ?? '/').split('?');
        const halaman = req.method === 'GET' && jalur !== '/' && !/^\/(@|src\/|node_modules\/)/.test(jalur) && !BERKAS.test(jalur) && !/\.(tsx?|map)$/.test(jalur);
        if (halaman) req.url = '/index.html';
        next();
      });
    },
  };
}

// `npm run preview` meniru hosting statis umum: /docs/faq → /docs/faq/ (301) bila foldernya ada,
// dan alamat yang tidak ada dijawab dist/404.html dengan status 404.
function pratinjauSepertiHosting(): Plugin {
  return {
    name: 'lanjut-pratinjau',
    configurePreviewServer(server) {
      const dist = resolve(AKAR, server.config.build.outDir);
      const berkasAda = (jalur: string) => {
        try {
          return existsSync(join(dist, decodeURIComponent(jalur)));
        } catch {
          return false;
        }
      };
      server.middlewares.use((req, res, next) => {
        const [jalur] = (req.url ?? '/').split('?');
        if (!jalur.endsWith('/') && !BERKAS.test(jalur) && berkasAda(`${jalur}/index.html`)) {
          res.writeHead(301, { Location: `${jalur}/` }).end();
          return;
        }
        next();
      });
      return () => {
        server.middlewares.use((req, res, next) => {
          const [jalur] = (req.url ?? '/').split('?');
          const ada = berkasAda(jalur.endsWith('/') ? `${jalur}index.html` : jalur);
          if (ada || !berkasAda('404.html')) return next();
          res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' }).end(readFileSync(join(dist, '404.html')));
        });
      };
    },
  };
}

export default defineConfig({
  // Relatif: dist/ bisa diunggah ke folder mana pun di domain. Halaman bersarang memakai
  // awalan ../ yang dihitung saat prerender.
  base: './',
  // Berkas yang tidak ada dijawab 404, bukan index.html.
  appType: 'mpa',
  plugins: [react(), cspSaatBuild(), ruteDev(), pratinjauSepertiHosting()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Gambar dan huruf tidak dijadikan data: URI (CSP img-src/font-src 'self').
    assetsInlineLimit: 0,
    // Dibaca scripts/bangun.mjs untuk modulepreload per halaman, lalu dihapus dari dist.
    manifest: true,
    rolldownOptions: {
      input: Object.fromEntries(HALAMAN.map((h) => [h, resolve(AKAR, `${h}.html`)])),
    },
  },
});
