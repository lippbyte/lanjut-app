// Landing LANJUT (LANJUT_083b): Vite multi-page. Setiap halaman punya berkas HTML sendiri
// supaya bisa dibuka langsung dari URL, termasuk google-kembali.html yang alamatnya
// didaftarkan di Google Cloud Console. Tanpa router sisi klien.
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig, type Plugin } from 'vite';

const AKAR = fileURLToPath(new URL('.', import.meta.url));

export const HALAMAN = ['index', 'panduan-uji', 'kebijakan-privasi', 'google-kembali'] as const;

// Sama dengan 083: hanya berkas sendiri. Tanpa 'unsafe-inline' untuk skrip maupun gaya.
export const CSP =
  "default-src 'self'; img-src 'self'; style-src 'self'; script-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'";

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

export default defineConfig({
  // Relatif: dist/ bisa diunggah ke subfolder mana pun (domain PM maupun domain guru).
  base: './',
  // Berkas yang tidak ada dijawab 404, bukan index.html (penting untuk cek lanjut-demo.apk).
  appType: 'mpa',
  plugins: [react(), cspSaatBuild()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Gambar tidak dijadikan data: URI (CSP img-src 'self').
    assetsInlineLimit: 0,
    rolldownOptions: {
      input: Object.fromEntries(HALAMAN.map((h) => [h, resolve(AKAR, `${h}.html`)])),
    },
  },
});
