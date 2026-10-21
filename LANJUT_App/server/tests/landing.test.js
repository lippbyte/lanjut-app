// LANJUT_083 — landing page statis di folder landing/ (akar repo).
// Pemeriksaan isi berkas; bukti tampilan 360 px dibuat terpisah (Edge headless).

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const { hasilkan, HALAMAN } = require('../tools/landing-kebijakan');

const DIR = path.resolve(__dirname, '..', '..', '..', 'landing');
const HTML = ['index.html', 'panduan-uji.html', 'kebijakan-privasi.html', 'google-kembali.html'];
const SEMUA = fs.readdirSync(DIR);
const baca = (nama) => fs.readFileSync(path.join(DIR, nama), 'utf8');
const TEKS = SEMUA.filter((n) => /\.(html|css|js)$/.test(n));

test('halaman kebijakan privasi landing sama dengan lib/kebijakan-privasi.json (tidak basi)', () => {
  assert.equal(fs.readFileSync(HALAMAN, 'utf8').replace(/\r\n/g, '\n'), hasilkan());
});

test('isi wajib: penjelasan per jenjang, tombol Unduh APK, cara pasang, tautan panduan & kebijakan, versi uji', () => {
  const index = baca('index.html');
  for (const jenjang of ['SMP', 'SMA', 'SMK', 'MA']) assert.match(index, new RegExp(`\\b${jenjang}\\b`));
  assert.match(index, /<a [^>]*href="lanjut-demo\.apk"[^>]*>Unduh APK<\/a>/);
  assert.match(index, /sumber ini/i);
  assert.match(index, /Instal aplikasi tak dikenal/);
  assert.match(index, /href="panduan-uji\.html"/);
  assert.match(index, /href="kebijakan-privasi\.html"/);
  assert.match(index, /versi uji/i);
});

test('semua halaman berstatus DRAF dan punya viewport untuk layar HP', () => {
  for (const nama of HTML) {
    const isi = baca(nama);
    assert.match(isi, /data-status="draf"/, nama);
    assert.match(isi, /DRAF/, nama);
    assert.match(isi, /<meta name="viewport" content="width=device-width, initial-scale=1">/, nama);
  }
});

test('tanpa skrip pihak ketiga, pelacak, atau font dari luar; CSP membatasi ke berkas sendiri', () => {
  for (const nama of TEKS) {
    const isi = baca(nama);
    assert.doesNotMatch(isi, /<script[^>]+src="(https?:)?\/\//i, nama);
    assert.doesNotMatch(isi, /<link[^>]+href="(https?:)?\/\//i, nama);
    assert.doesNotMatch(isi, /@import|url\(\s*['"]?(https?:)?\/\//i, nama);
    assert.doesNotMatch(isi, /googleapis|gstatic|googletagmanager|gtag\(|analytics|facebook|fbq\(|hotjar|cdn\./i, nama);
  }
  for (const nama of HTML) assert.match(baca(nama), /Content-Security-Policy" content="default-src 'self'/, nama);
  // Satu-satunya skrip: penerus Google milik sendiri, tanpa jaringan & penyimpanan.
  const skrip = TEKS.filter((n) => n.endsWith('.js'));
  assert.deepEqual(skrip, ['google-kembali.js']);
  assert.doesNotMatch(baca('google-kembali.js'), /fetch|XMLHttpRequest|localStorage|sessionStorage|cookie|sendBeacon/);
});

test('tidak membocorkan kunci, alamat server internal, atau isi LANJUT_App', () => {
  for (const nama of TEKS) {
    const isi = baca(nama);
    assert.doesNotMatch(isi, /localhost|127\.0\.0\.1|\b10\.\d+\.\d+\.\d+|\b192\.168\.|\b172\.(1[6-9]|2\d|3[01])\./, nama);
    assert.doesNotMatch(isi, /\/api\/v1|:4000|:8081|GANTI-DOMAIN/, nama);
    assert.doesNotMatch(isi, /sk-or-|client_secret/i, nama);
    // Nama variabel rahasia (huruf besar persis). "OpenRouter" sebagai nama perusahaan di kebijakan boleh.
    assert.doesNotMatch(isi, /OPENROUTER_|SMTP_|GOOGLE_CLIENT|\.env\b|LANJUT_App/, nama);
    assert.doesNotMatch(isi, /http:\/\//, nama);
  }
});

test('tautan lokal di setiap halaman mengarah ke berkas yang ada (kecuali APK yang diunggah PM)', () => {
  for (const nama of HTML) {
    const tautan = [...baca(nama).matchAll(/(?:href|src)="([^"#:]+)"/g)].map((m) => m[1]);
    for (const t of tautan) {
      if (t === './' || t === 'lanjut-demo.apk') continue;
      assert.ok(SEMUA.includes(t), `${nama} → ${t} tidak ada di landing/`);
    }
  }
});
