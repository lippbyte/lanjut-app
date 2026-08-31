const express = require('express');
const wajibLogin = require('../../middleware/wajibLogin');
const { validasiBody } = require('../../middleware/validasi');
const { ubahProfilSkema } = require('./pengguna.skema');
const { sukses } = require('../../util/respons');
const layanan = require('./pengguna.layanan');

const router = express.Router();

router.patch('/saya', wajibLogin, validasiBody(ubahProfilSkema), async (req, res, next) => {
  try {
    const profil = await layanan.ubahProfil(req.pengguna.id, req.body);
    sukses(res, profil);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
