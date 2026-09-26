// Rute `kemajuan` — F5, seluruhnya wajib login (§4.5).

const express = require('express');
const wajibLogin = require('../../middleware/wajibLogin');
const repo = require('./kemajuan.repo');
const { sukses, galat } = require('../../util/respons');
const { sekarangUntukDb, keIso } = require('../../util/waktu');

const router = express.Router();

router.use(wajibLogin);

router.get('/', async (req, res, next) => {
  try {
    const baris = await repo.ambilMilikSendiri(req.pengguna.id);
    sukses(
      res,
      baris.map((b) => ({ butir_id: b.butir_id, selesai_pada: keIso(b.selesai_pada) }))
    );
  } catch (err) {
    next(err);
  }
});

router.put('/:butirId', async (req, res, next) => {
  try {
    const ada = await repo.butirAda(req.params.butirId);
    if (!ada) return galat(res, 'TIDAK_DITEMUKAN', 'Butir daftar periksa tidak ditemukan.');
    const selesaiPada = sekarangUntukDb();
    await repo.tandaiSelesai(req.pengguna.id, req.params.butirId, selesaiPada);
    sukses(res, { butir_id: req.params.butirId, selesai_pada: keIso(selesaiPada) });
  } catch (err) {
    next(err);
  }
});

router.delete('/:butirId', async (req, res, next) => {
  try {
    await repo.batalkanSelesai(req.pengguna.id, req.params.butirId);
    sukses(res, { butir_id: req.params.butirId, selesai_pada: null });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
