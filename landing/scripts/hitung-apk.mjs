// Ukuran dan SHA-256 berkas APK yang akan dirilis, untuk diisi ke src/data/releases.json
// (fileSizeBytes, sha256). Hitung dari berkas yang benar-benar dibagikan, jangan disalin
// dari versi lain. Tidak mengubah berkas apa pun.
//
//   npm run hitung-apk -- C:\jalur\ke\lanjut-1.0.0.apk

import crypto from 'node:crypto';
import fs from 'node:fs';

const berkas = process.argv[2];
if (!berkas || !/\.apk$/i.test(berkas) || !fs.existsSync(berkas)) {
  console.error('Pemakaian: npm run hitung-apk -- <berkas.apk>');
  process.exit(1);
}
const isi = fs.readFileSync(berkas);
console.log(JSON.stringify({ fileSizeBytes: isi.length, sha256: crypto.createHash('sha256').update(isi).digest('hex') }, null, 2));
