// Halaman kebijakan privasi untuk landing page (LANJUT_083).
//
// Teks kebijakan tetap hanya ada di SATU tempat: LANJUT_App/lib/kebijakan-privasi.json
// (sama dengan app dan docs/kebijakan-privasi-DRAF.md). Alat ini menulis teks yang sama
// ke landing/kebijakan-privasi.html. tests/landing.test.js menolak bila keduanya berbeda.
//
// Pemakaian (dari folder LANJUT_App/server):
//   npm run landing-kebijakan              → tulis ulang landing/kebijakan-privasi.html
//   npm run landing-kebijakan -- --periksa → hanya periksa, keluar 1 bila basi

const fs = require('fs');
const path = require('path');

const AKAR = path.join(__dirname, '..', '..', '..');
const SUMBER = path.join(AKAR, 'LANJUT_App', 'lib', 'kebijakan-privasi.json');
const HALAMAN = path.join(AKAR, 'landing', 'kebijakan-privasi.html');

const bacaSumber = () => JSON.parse(fs.readFileSync(SUMBER, 'utf8'));

function esc(teks) {
  return String(teks)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function renderHalaman(k) {
  const isi = [];
  for (const b of k.isi) {
    isi.push(`      <h2>${esc(b.judul)}</h2>`);
    for (const p of b.paragraf ?? []) isi.push(`      <p>${esc(p)}</p>`);
    if (b.butir) {
      isi.push('      <ul class="butir">');
      for (const t of b.butir) isi.push(`        <li>${esc(t)}</li>`);
      isi.push('      </ul>');
    }
  }
  const ringkasan = k.ringkasan.map((t) => `          <li>${esc(t)}</li>`).join('\n');
  return `<!doctype html>
<!-- Ditulis otomatis dari sumber teks kebijakan yang sama dengan app
     (npm run landing-kebijakan). Jangan diedit tangan. -->
<html lang="id" data-status="draf">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src 'self'; style-src 'self'; script-src 'none'; object-src 'none'; base-uri 'none'; form-action 'none'">
  <meta name="referrer" content="no-referrer">
  <meta name="robots" content="noindex">
  <title>Kebijakan Privasi LANJUT (DRAF)</title>
  <link rel="icon" href="favicon.png">
  <link rel="stylesheet" href="gaya.css">
</head>
<body>
  <p class="draf">${esc(k.status)}</p>

  <header class="kepala">
    <div class="bungkus">
      <img src="maskot.png" alt="" width="40" height="40">
      <a class="merek" href="./">LANJUT</a>
      <span class="lencana">Versi uji</span>
    </div>
  </header>

  <main>
    <div class="bungkus">
      <h1>Kebijakan Privasi</h1>
      <p class="kecil">Versi ${esc(k.versi)} · DRAF, belum berlaku.</p>
      <div class="peringatan" role="note">
        <p><strong>Ringkasan</strong></p>
        <ul class="butir">
${ringkasan}
        </ul>
        <p>Masuk dengan kode email dan masuk dengan Google belum dibahas di kebijakan ini. Keduanya sedang ditinjau.</p>
      </div>
${isi.join('\n')}
    </div>
  </main>

  <footer class="kaki">
    <div class="bungkus">
      <nav aria-label="Tautan">
        <a href="./">Halaman utama</a>
        <a href="panduan-uji.html">Panduan uji</a>
      </nav>
      <p class="kecil">LANJUT oleh EDILAKSO Group · versi uji 2026 · Teks halaman ini DRAF.</p>
    </div>
  </footer>
</body>
</html>
`;
}

function hasilkan() {
  return renderHalaman(bacaSumber());
}

if (require.main === module) {
  const isi = hasilkan();
  if (process.argv.includes('--periksa')) {
    const ada = fs.existsSync(HALAMAN) ? fs.readFileSync(HALAMAN, 'utf8').replace(/\r\n/g, '\n') : null;
    if (ada !== isi) {
      console.error('[landing-kebijakan] landing/kebijakan-privasi.html basi. Jalankan: npm run landing-kebijakan');
      process.exit(1);
    }
    console.log('[landing-kebijakan] sesuai dengan lib/kebijakan-privasi.json.');
  } else {
    fs.writeFileSync(HALAMAN, isi, 'utf8');
    console.log('[landing-kebijakan] ditulis: landing/kebijakan-privasi.html');
  }
}

module.exports = { hasilkan, renderHalaman, HALAMAN, SUMBER };
