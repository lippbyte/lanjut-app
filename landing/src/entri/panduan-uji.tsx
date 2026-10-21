import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../gaya.css';
import { PanduanUji } from '../halaman/PanduanUji';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <PanduanUji />
  </StrictMode>
);
