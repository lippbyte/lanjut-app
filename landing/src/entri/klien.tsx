import { StrictMode, type ComponentType } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';

import '../gaya/semua.css';
import type { IdHalaman, PropsHalaman } from '../halaman/jenis';

// Entri peramban untuk semua halaman yang diprerender. HTML-nya sudah lengkap sebelum skrip ini
// jalan; di sini React hanya "menghidupkan" (hidrasi) halaman yang namanya tertulis di
// #root[data-halaman]. Setiap halaman jadi potongan skrip sendiri (dimuat sesuai kebutuhan).

const MUAT: Record<IdHalaman, () => Promise<{ default: ComponentType<PropsHalaman> }>> = {
  beranda: () => import('../halaman/Beranda'),
  docs: () => import('../halaman/Docs'),
  artikel: () => import('../halaman/Artikel'),
  glosarium: () => import('../halaman/Glosarium'),
  ai: () => import('../halaman/Ai'),
  unduh: () => import('../halaman/Unduh'),
  rilis: () => import('../halaman/DetailRilis'),
  privasi: () => import('../halaman/Privasi'),
  'privasi-aplikasi': () => import('../halaman/KebijakanPrivasi'),
  'tidak-ditemukan': () => import('../halaman/TidakDitemukan'),
};

// Penanda untuk CSS: tata letak yang butuh JavaScript (mis. panggung fitur) hanya dipakai bila ini ada.
document.documentElement.setAttribute('data-js', '');

async function mulai(): Promise<void> {
  const akar = document.getElementById('root')!;
  const { halaman, jalur = '', akar: akarSitus = './' } = akar.dataset;

  if (halaman && halaman in MUAT) {
    const { default: Halaman } = await MUAT[halaman as IdHalaman]();
    hydrateRoot(
      akar,
      <StrictMode>
        <Halaman jalur={jalur} akar={akarSitus} />
      </StrictMode>
    );
    return;
  }

  // Server dev Vite (`npm run dev`): belum ada HTML prerender, halaman dipilih dari alamat.
  const { cariRute, RUTE_404 } = await import('../rute');
  const dicari = decodeURIComponent(window.location.pathname).replace(/index\.html$/, '').replace(/^\/+|\/+$/g, '');
  const rute = cariRute(dicari) ?? RUTE_404;
  const { default: Halaman } = await MUAT[rute.halaman]();
  document.title = rute.judul;
  createRoot(akar).render(
    <StrictMode>
      <Halaman jalur={rute === RUTE_404 ? '404' : rute.jalur} akar="/" />
    </StrictMode>
  );
}

void mulai();
