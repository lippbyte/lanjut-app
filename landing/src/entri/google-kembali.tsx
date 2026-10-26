import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../gaya/semua.css';
import { GoogleKembali } from '../halaman/GoogleKembali';
import { tujuanPenerus } from '../lib/penerus';

// Fragmen dibaca sekali saat halaman dibuka, lalu dibuang dari bilah alamat dan riwayat
// peramban sebelum apa pun dirender: token tidak tertinggal di sana.
const tujuan = tujuanPenerus(window.location.hash);
window.history.replaceState(null, '', window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GoogleKembali tujuan={tujuan} />
  </StrictMode>
);

if (tujuan) window.location.replace(tujuan);
