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
};

if (env.ASAL_DIIZINKAN.includes('*')) {
  throw new Error(
    'ASAL_DIIZINKAN tidak boleh berisi "*" (docs/SDD-Backend-Foundation.md §8.5). ' +
      'Sebutkan asal secara eksplisit, dipisah koma.'
  );
}

module.exports = env;
