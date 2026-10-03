// Membaca dan MEMVALIDASI variabel lingkungan. Gagal cepat (melempar dan
// menghentikan proses) bila ada variabel wajib yang kosong — lebih baik
// server menolak menyala daripada menyala lalu gagal di permintaan pertama.
// Lihat docs/SDD-Backend-Foundation.md §2.1 baris "Konfigurasi".

require('dotenv').config();

function wajib(nama) {
  const nilai = process.env[nama];
  if (nilai === undefined || nilai === null || String(nilai).trim() === '') {
    throw new Error(
      `Variabel lingkungan wajib "${nama}" kosong. Salin server/.env.example ` +
        'menjadi server/.env dan isi nilainya sebelum menyalakan server.'
    );
  }
  return String(nilai).trim();
}

function opsional(nama, bawaan) {
  const nilai = process.env[nama];
  if (nilai === undefined || nilai === null || String(nilai).trim() === '') {
    return bawaan;
  }
  return String(nilai).trim();
}

function angka(nama, bawaan) {
  const mentah = opsional(nama, null);
  if (mentah === null) return bawaan;
  const n = Number(mentah);
  if (!Number.isFinite(n)) {
    throw new Error(`Variabel lingkungan "${nama}" harus berupa angka, dapat: "${mentah}".`);
  }
  return n;
}

const NODE_ENV = opsional('NODE_ENV', 'development');

const env = {
  NODE_ENV,
  PORT: angka('PORT', 3000),
  DB_HOST: wajib('DB_HOST'),
  DB_PORT: angka('DB_PORT', 3306),
  DB_USER: wajib('DB_USER'),
  // Kata sandi basis data BOLEH kosong hanya di lingkungan lokal tanpa sandi
  // root — tetap wajib didefinisikan (walau string kosong) agar tidak
  // tersandung `undefined`.
  DB_PASSWORD: process.env.DB_PASSWORD !== undefined ? process.env.DB_PASSWORD : '',
  DB_NAME: wajib('DB_NAME'),
  ASAL_DIIZINKAN: wajib('ASAL_DIIZINKAN')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean),
  SESI_UMUR_HARI: angka('SESI_UMUR_HARI', 90),
  // Jumlah reverse proxy tepercaya di depan Node (cPanel/Passenger, Railway,
  // dst.). 0 = tidak ada (lokal). Tanpa ini di belakang proxy, semua
  // pengguna terlihat ber-IP sama (IP proxy) dan batas laju per-IP (§8.2)
  // berlaku untuk SEMUA orang sekaligus. Jangan diisi lebih besar dari
  // jumlah proxy sebenarnya: header X-Forwarded-For bisa dipalsukan klien.
  JUMLAH_PROXY: angka('JUMLAH_PROXY', 0),
  // Folder berisi *.json konten untuk `npm run benih` (LANJUT_023). Kosong =
  // bawaan ../../MVP-PWA/data dari folder server/. Absolut, atau relatif
  // terhadap folder server/. Hanya dipakai benih, bukan oleh API.
  LOKASI_DATA_KONTEN: opsional('LOKASI_DATA_KONTEN', null),
  // Ngobrol Bareng LANJUT (LANJUT_051): AI lewat OpenRouter. Kunci KOSONG =
  // fitur AI mati (503 AI_TIDAK_TERSEDIA), server tetap menyala. Kunci hanya
  // ada di server: tidak pernah dikirim ke app dan tidak dicatat di log.
  OPENROUTER_API_KEY: opsional('OPENROUTER_API_KEY', null),
  OPENROUTER_MODEL: opsional('OPENROUTER_MODEL', 'anthropic/claude-sonnet-5.5'),
  // Hanya diganti untuk uji (server tiruan di localhost).
  OPENROUTER_BASE_URL: opsional('OPENROUTER_BASE_URL', 'https://openrouter.ai/api/v1').replace(/\/$/, ''),
};

// Kunci API tidak boleh terkirim lewat HTTP polos, kecuali ke server tiruan lokal.
if (!/^https:\/\/|^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?(\/|$)/.test(env.OPENROUTER_BASE_URL)) {
  throw new Error(`OPENROUTER_BASE_URL harus https:// (atau http://localhost untuk uji), dapat: "${env.OPENROUTER_BASE_URL}".`);
}

if (!Number.isInteger(env.JUMLAH_PROXY) || env.JUMLAH_PROXY < 0) {
  throw new Error(`JUMLAH_PROXY harus bilangan bulat ≥ 0, dapat: "${env.JUMLAH_PROXY}".`);
}

if (env.ASAL_DIIZINKAN.includes('*')) {
  throw new Error(
    'ASAL_DIIZINKAN tidak boleh berisi "*" (docs/SDD-Backend-Foundation.md §8.5). ' +
      'Sebutkan asal secara eksplisit, dipisah koma.'
  );
}

module.exports = env;
