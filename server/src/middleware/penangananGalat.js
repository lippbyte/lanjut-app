// Penangkap terakhir. Tidak pernah membocorkan jejak tumpukan ke klien,
// selalu mencatatnya di log server. docs/SDD-Backend-Foundation.md §6.5, §8.5.

const { galat, GalatApi } = require('../util/respons');

// eslint-disable-next-line no-unused-vars
function penangananGalat(err, req, res, next) {
  if (err instanceof GalatApi) {
    return galat(res, err.kode, err.message, err.medan);
  }

  // Log server: metode, jalur, status, durasi (ditangani logger akses di
  // app.js), pengguna_id — TIDAK PERNAH kata sandi/token/isi kartu (§8.5).
  console.error('[galat]', req.method, req.originalUrl, '-', err && err.stack);

  return galat(res, 'GALAT_SERVER', 'Terjadi kesalahan pada server.');
}

module.exports = penangananGalat;
