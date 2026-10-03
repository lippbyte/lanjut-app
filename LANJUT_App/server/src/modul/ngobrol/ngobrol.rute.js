// Rute `ngobrol` — Ngobrol Bareng LANJUT dengan AI (LANJUT_051).
//
//   POST /   { pesan: [{ peran: 'pengguna' | 'bot', teks }] } → { balasan }
//
// Wajib login. Gerbang persetujuan (bolehPakaiAi) diperiksa di layanan,
// SEBELUM apa pun dikirim ke penyedia AI. Batas pemakaian per akun (bukan per
// IP) dibaca dari konfigurasi tiap permintaan, jadi bisa diubah tanpa restart.

const express = require('express');
const rateLimit = require('express-rate-limit');
const wajibLogin = require('../../middleware/wajibLogin');
const { validasiBody } = require('../../middleware/validasi');
const { galat, sukses } = require('../../util/respons');
const { kirimSkema } = require('./ngobrol.skema');
const layanan = require('./ngobrol.layanan');

const router = express.Router();

router.use(wajibLogin);

function batasPerAkun(windowMs, kunci) {
  return rateLimit({
    windowMs,
    limit: async () => (await layanan.batas())[kunci],
    keyGenerator: (req) => `pengguna:${req.pengguna.id}`,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => galat(res, 'TERLALU_SERING', 'Pesanmu sudah banyak. Istirahat sebentar, lalu coba lagi.'),
  });
}

router.post(
  '/',
  validasiBody(kirimSkema),
  batasPerAkun(5 * 60 * 1000, 'per5Menit'),
  batasPerAkun(24 * 60 * 60 * 1000, 'per24Jam'),
  async (req, res, next) => {
    try {
      sukses(res, await layanan.balas(req.pengguna.id, req.body.pesan));
    } catch (e) {
      next(e);
    }
  }
);

module.exports = router;
