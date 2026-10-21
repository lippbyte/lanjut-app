// Dipakai tests/landing.test.mjs saja: dibangun Vite sebagai modul SSR supaya komponen halaman
// bisa dirender di Node (react-dom/server) tanpa peramban dan tanpa paket tambahan.
import { renderToStaticMarkup } from 'react-dom/server';

import { Beranda } from '../src/halaman/Beranda';
import { GoogleKembali } from '../src/halaman/GoogleKembali';
import { KebijakanPrivasi } from '../src/halaman/KebijakanPrivasi';
import { PanduanUji } from '../src/halaman/PanduanUji';
import { TombolApk, type StatusApk } from '../src/komponen/TombolApk';

export { default as dataKebijakan } from '../src/data/kebijakan-privasi.json';
export { BERKAS_APK, apkTersedia } from '../src/lib/apk';
export { tujuanPenerus } from '../src/lib/penerus';
export { TEKS_APK_DISIAPKAN } from '../src/komponen/TombolApk';

export const render = {
  beranda: () => renderToStaticMarkup(<Beranda />),
  panduanUji: () => renderToStaticMarkup(<PanduanUji />),
  kebijakan: () => renderToStaticMarkup(<KebijakanPrivasi />),
  googleKembali: (tujuan: string | null) => renderToStaticMarkup(<GoogleKembali tujuan={tujuan} />),
  tombolApk: (status: StatusApk) => renderToStaticMarkup(<TombolApk status={status} />),
};
