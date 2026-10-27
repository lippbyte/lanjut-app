import { StrictMode, type ComponentType } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import Ai from '../halaman/Ai';
import Artikel from '../halaman/Artikel';
import Beranda from '../halaman/Beranda';
import DetailRilis, { IsiRilis } from '../halaman/DetailRilis';
import Docs from '../halaman/Docs';
import Glosarium from '../halaman/Glosarium';
import { GoogleKembali } from '../halaman/GoogleKembali';
import type { IdHalaman, PropsHalaman } from '../halaman/jenis';
import KebijakanPrivasi from '../halaman/KebijakanPrivasi';
import Privasi from '../halaman/Privasi';
import TidakDitemukan from '../halaman/TidakDitemukan';
import Unduh, { IsiUnduh } from '../halaman/Unduh';
import { Kerangka } from '../komponen/Kerangka';
import { akarDari } from '../lib/situs';
import type { DataRilis } from '../lib/rilis';

// Entri Node untuk prerender (scripts/bangun.mjs) dan tes. Dibangun Vite sebagai modul SSR;
// tidak ikut terbit di dist/.

export { default as dataRilis } from '../data/releases.json';
export { default as dataKebijakan } from '../data/kebijakan-privasi.json';
export { ALIHAN, RUTE, RUTE_404, cariRute } from '../rute';
export { ARTIKEL, KATEGORI } from '../konten/docs';
export { ISTILAH, SUMBER, cocok as cocokIstilah } from '../konten/glosarium';
export { FITUR, LABEL_STATUS, TOPIK_KHUSUS_SMK } from '../konten/fitur';
export { POLA_TEKS } from '../komponen/TeksKaya';
export { TEKS_DRAF } from '../komponen/Kerangka';
export { TEKS_BELUM_ADA } from '../halaman/Unduh';
export { CONTOH_ARAH, CONTOH_TANYA } from '../komponen/ObrolanKonsep';
export { AJAKAN, FAQ, FITUR_BERANDA, HERO, KENAPA_SMK, LANGKAH, MASALAH, PENUTUP, SOLUSI, TENTANG } from '../konten/beranda';
export { BAGIAN_BERANDA } from '../komponen/NavUtama';
export { BELUM_DIVERIFIKASI } from '../komponen/Rilis';
export { bandingVersi, formatTanggal, formatUkuran, hariIniWib, masalahApkUrl, periksaDataRilis, rilisTerbaru, urutRilis } from '../lib/rilis';
export { akarDari, alamat } from '../lib/situs';
export { tujuanPenerus } from '../lib/penerus';

/**
 * Modul sumber tiap halaman, untuk mencari potongan skripnya di manifest Vite (modulepreload).
 * Harus sama dengan import() di entri/klien.tsx; bangun.mjs gagal bila ada yang tidak ketemu.
 */
export const BERKAS_HALAMAN: Record<IdHalaman, string> = {
  beranda: 'src/halaman/Beranda.tsx',
  docs: 'src/halaman/Docs.tsx',
  artikel: 'src/halaman/Artikel.tsx',
  glosarium: 'src/halaman/Glosarium.tsx',
  ai: 'src/halaman/Ai.tsx',
  unduh: 'src/halaman/Unduh.tsx',
  rilis: 'src/halaman/DetailRilis.tsx',
  privasi: 'src/halaman/Privasi.tsx',
  'privasi-aplikasi': 'src/halaman/KebijakanPrivasi.tsx',
  'tidak-ditemukan': 'src/halaman/TidakDitemukan.tsx',
};

const HALAMAN: Record<IdHalaman, ComponentType<PropsHalaman>> = {
  beranda: Beranda,
  docs: Docs,
  artikel: Artikel,
  glosarium: Glosarium,
  ai: Ai,
  unduh: Unduh,
  rilis: DetailRilis,
  privasi: Privasi,
  'privasi-aplikasi': KebijakanPrivasi,
  'tidak-ditemukan': TidakDitemukan,
};

/** HTML isi #root untuk satu halaman. Sama persis dengan hasil render pertama di peramban. */
export function render(halaman: IdHalaman, jalur: string, akar: string = akarDari(jalur)): string {
  const Halaman = HALAMAN[halaman];
  return renderToString(
    <StrictMode>
      <Halaman jalur={jalur} akar={akar} />
    </StrictMode>
  );
}

/** Untuk tes: halaman unduhan dengan metadata rilis tiruan. */
export function renderUnduh(data: DataRilis): string {
  return renderToStaticMarkup(
    <Kerangka jalur="download" akar="../">
      <IsiUnduh data={data} />
    </Kerangka>
  );
}

/** Untuk tes: halaman detail satu rilis dengan metadata tiruan. */
export function renderRilis(data: DataRilis, versi: string): string {
  return renderToStaticMarkup(
    <Kerangka jalur={`download/${versi}`} akar="../../">
      <IsiRilis data={data} versi={versi} />
    </Kerangka>
  );
}

export const renderGoogleKembali = (tujuan: string | null): string => renderToStaticMarkup(<GoogleKembali tujuan={tujuan} />);
