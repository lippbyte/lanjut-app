// Titik masuk: baca env → nyalakan port → penutupan halus. docs/SDD-Backend-Foundation.md §9.2.

const env = require('./config/env');
const app = require('./app');
const pool = require('./db/koneksi');

const server = app.listen(env.PORT, () => {
  console.log(`[server] LANJUT API berjalan di port ${env.PORT} (${env.NODE_ENV})`);
});

let sedangMenutup = false;

function tutupHalus(sinyal) {
  if (sedangMenutup) return;
  sedangMenutup = true;
  console.log(`[server] Menerima sinyal ${sinyal}, memulai penutupan halus...`);

  // Batas waktu pemaksaan berhenti (10 detik) jika permintaan menggantung
  const timeoutPaksa = setTimeout(() => {
    console.error('[server] Batas waktu penutupan halus (10 detik) terlampaui, keluar paksa.');
    process.exit(1);
  }, 10000);
  timeoutPaksa.unref();

  server.close(async (err) => {
    if (err) {
      console.error('[server] Galat saat menutup server HTTP:', err.message);
    } else {
      console.log('[server] Koneksi HTTP selesai ditutup.');
    }

    try {
      await pool.end();
      console.log('[server] Pool basis data berhasil ditutup.');
      process.exit(0);
    } catch (dbErr) {
      console.error('[server] Galat saat menutup pool basis data:', dbErr.message);
      process.exit(1);
    }
  });
}

process.on('SIGTERM', () => tutupHalus('SIGTERM'));
process.on('SIGINT', () => tutupHalus('SIGINT'));

module.exports = server;
