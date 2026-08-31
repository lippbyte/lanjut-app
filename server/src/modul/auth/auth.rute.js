// Rute auth. Hanya membaca req, memanggil layanan, menyusun respons — tidak
// ada SQL dan tidak ada aturan bisnis di sini (§9.2 batas lapis).

const express = require('express');
const { daftarSkema, masukSkema, ubahSandiSkema } = require('./auth.skema');
const { validasiBody } = require('../../middleware/validasi');
const wajibLogin = require('../../middleware/wajibLogin');
const { batasAuth, batasDaftar } = require('../../middleware/batasLaju');
const { sukses } = require('../../util/respons');
const layanan = require('./auth.layanan');

const router = express.Router();

router.post(
  '/daftar',
  batasDaftar,
  validasiBody(daftarSkema),
  async (req, res, next) => {
    try {
      const hasil = await layanan.daftar(req.body);
      sukses(res, hasil, undefined, 201);
    } catch (err) {
      next(err);
    }
  }
);

router.post('/masuk', batasAuth, validasiBody(masukSkema), async (req, res, next) => {
  try {
    const hasil = await layanan.masuk(req.body);
    sukses(res, hasil);
  } catch (err) {
    next(err);
  }
});

router.post('/keluar', wajibLogin, async (req, res, next) => {
  try {
    await layanan.keluar(req);
    sukses(res, { keluar: true });
  } catch (err) {
    next(err);
  }
});

router.post('/keluar-semua', wajibLogin, async (req, res, next) => {
  try {
    await layanan.keluarSemua(req.pengguna.id);
    sukses(res, { keluar: true });
  } catch (err) {
    next(err);
  }
});

router.get('/saya', wajibLogin, async (req, res, next) => {
  try {
    const profil = await layanan.saya(req.pengguna.id);
    sukses(res, profil);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/ubah-sandi',
  wajibLogin,
  validasiBody(ubahSandiSkema),
  async (req, res, next) => {
    try {
      await layanan.ubahSandi(req.pengguna.id, req.body);
      sukses(res, { diubah: true });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
