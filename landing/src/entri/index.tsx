import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../gaya.css';
import { Beranda } from '../halaman/Beranda';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Beranda />
  </StrictMode>
);
