// Titik masuk: baca env → nyalakan port. docs/SDD-Backend-Foundation.md §9.2.

const env = require('./config/env');
const app = require('./app');

app.listen(env.PORT, () => {
  console.log(`[server] LANJUT API berjalan di port ${env.PORT} (${env.NODE_ENV})`);
});
