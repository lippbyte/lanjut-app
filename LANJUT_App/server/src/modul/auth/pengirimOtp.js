// Pengirim email kode masuk (LANJUT_083). Satu objek dengan dua fungsi supaya tes
// bisa menggantinya dengan tiruan (`pengirimOtp.kirim = async (...) => ...`) tanpa
// menyentuh SMTP. Kode tidak pernah dicatat di log, juga saat pengiriman gagal.

const env = require('../../config/env');
const { kirimSurel } = require('../../util/surel');

const SUBJEK = 'Kode masuk LANJUT';

// Teks DRAF (docs/salinan-teks-lanjut.md, LANJUT_083), belum disetujui PM.
function teksEmail(kode) {
  return [
    'Halo,',
    '',
    'Ini kode masuk LANJUT kamu:',
    '',
    `    ${kode}`,
    '',
    'Kode berlaku 5 menit dan hanya bisa dipakai sekali.',
    'Jangan berikan kode ini kepada siapa pun, termasuk yang mengaku dari LANJUT.',
    '',
    'Kalau kamu tidak sedang masuk ke LANJUT, abaikan email ini. Akunmu tetap aman.',
    '',
    'LANJUT (versi uji)',
  ].join('\n');
}

const pengirimOtp = {
  /** SMTP sudah diisi di .env? Kalau belum, fitur kode email mati (503). */
  siap() {
    return Boolean(env.SMTP_HOST && env.SMTP_FROM);
  },

  async kirim(email, kode) {
    await kirimSurel(
      { ke: email, subjek: SUBJEK, teks: teksEmail(kode) },
      {
        host: env.SMTP_HOST,
        port: env.SMTP_PORT,
        secure: env.SMTP_SECURE,
        user: env.SMTP_USER,
        password: env.SMTP_PASSWORD,
        from: env.SMTP_FROM,
      }
    );
  },
};

module.exports = pengirimOtp;
module.exports.teksEmail = teksEmail;
module.exports.SUBJEK = SUBJEK;
