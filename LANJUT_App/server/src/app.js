// Merakit Express: helmet, cors, rate limit, rute, galat.
// docs/SDD-Backend-Foundation.md §9.2.

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const env = require('./config/env');
const autentikasi = require('./middleware/autentikasi');
const { batasGlobal } = require('./middleware/batasLaju');
const penangananGalat = require('./middleware/penangananGalat');
const { sukses } = require('./util/respons');

const authRute = require('./modul/auth/auth.rute');
const penggunaRute = require('./modul/pengguna/pengguna.rute');
const kontenRute = require('./modul/konten/konten.rute');
const kemajuanRute = require('./modul/kemajuan/kemajuan.rute');
const kartuRute = require('./modul/kartu/kartu.rute');
const levelinRute = require('./modul/levelin/levelin.rute');
const sinkronRute = require('./modul/sinkron/sinkron.rute');

const app = express();

app.disable('x-powered-by');
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"], // melarang skrip sebaris (§5.3)
      },
    },
  })
);
app.use(
  cors({
    origin: env.ASAL_DIIZINKAN,
    credentials: false,
  })
);
app.use(express.json({ limit: '1mb' }));

// Log akses minimal: metode, jalur, status, durasi — TANPA badan permintaan
// (§8.5 — rahasia tidak pernah masuk log).
app.use((req, res, next) => {
  const mulai = Date.now();
  res.on('finish', () => {
    const durasi = Date.now() - mulai;
    const penggunaId = req.pengguna ? req.pengguna.id : '-';
    console.log(`${req.method} ${req.originalUrl} ${res.statusCode} ${durasi}ms pengguna=${penggunaId}`);
  });
  next();
});

app.use(batasGlobal);
app.use(autentikasi);

app.get('/api/v1/sehat', (req, res) => {
  sukses(res, { status: 'ok', waktu: new Date().toISOString() });
});

app.use('/api/v1/auth', authRute);
app.use('/api/v1/pengguna', penggunaRute);
app.use('/api/v1/konten', kontenRute);
app.use('/api/v1/kemajuan', kemajuanRute);
app.use('/api/v1/kartu', kartuRute);
app.use('/api/v1', levelinRute); // sesi-latihan, riwayat-latihan, kalibrasi, saran-harian, konfigurasi
app.use('/api/v1/sinkron', sinkronRute);

app.use((req, res) => {
  const { galat } = require('./util/respons');
  galat(res, 'TIDAK_DITEMUKAN', 'Jalur tidak ditemukan.');
});

app.use(penangananGalat);

module.exports = app;
