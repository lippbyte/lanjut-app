/* Menjalankan seluruh gerbang validasi kerangka LANJUT PWA.
   Tanpa dependensi — cukup: node tools/validasi.js

   1-10  struktur & aturan data  (check.js)
   A-B   logika profil & kontrak selector app.js  (test-app.js)
   C-F   tata letak, token, teks, sistem desain  (test-desain.js) */
const { execFileSync } = require('child_process');
const path = require('path');

const APP = path.join(__dirname, '..');
const REPO = path.join(APP, '..');
const suite = [
  ['Struktur & aturan data', 'check.js',       [APP]],
  ['Logika app.js',          'test-app.js',    [APP]],
  ['Logika Level-In',        'test-levelin.js', [APP]],
  ['Tata letak & desain',    'test-desain.js', [APP, path.join(REPO, 'docs'),
                                                path.join(REPO, 'landing-page', 'index.html')]],
];

let gagal = 0;
for (const [nama, berkas, arg] of suite) {
  console.log('\n' + '='.repeat(60) + '\n  ' + nama + '\n' + '='.repeat(60));
  try {
    process.stdout.write(execFileSync(process.execPath, [path.join(__dirname, berkas), ...arg],
      { encoding: 'utf8' }));
  } catch (e) {
    process.stdout.write(e.stdout || '');
    process.stderr.write(e.stderr || '');
    gagal++;
  }
}

console.log('\n' + '='.repeat(60));
console.log(gagal === 0 ? '  SELURUH GERBANG LOLOS' : '  ' + gagal + ' SUITE GAGAL');
console.log('='.repeat(60));
process.exit(gagal === 0 ? 0 : 1);
