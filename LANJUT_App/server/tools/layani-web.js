// tools/layani-web.js
// Server statis lokal sederhana untuk menguji berkas dist/ (SPA) hasil build web.
// Menyediakan SPA fallback: semua rute yang tidak memiliki berkas fisik diarahkan ke index.html.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.WEB_PORT || 5500;
const DIST_DIR = path.resolve(__dirname, '..', '..', 'dist');

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const server = http.createServer((req, res) => {
  const urlPath = req.url.split('?')[0];
  let filePath = path.join(DIST_DIR, urlPath === '/' ? 'index.html' : urlPath);

  // Periksa apakah berkas ada
  fs.stat(filePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(filePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, { 'Content-Type': contentType });
      return fs.createReadStream(filePath).pipe(res);
    }

    // SPA Fallback: arahkan ke dist/index.html
    const fallbackPath = path.join(DIST_DIR, 'index.html');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.createReadStream(fallbackPath).pipe(res);
  });
});

if (require.main === module) {
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`[layani-web] Web SPA LANJUT berjalan di http://localhost:${PORT}`);
    console.log(`[layani-web] Melayani berkas dari: ${DIST_DIR}`);
  });
}

module.exports = server;
