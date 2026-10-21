import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '../gaya.css';
import { KebijakanPrivasi } from '../halaman/KebijakanPrivasi';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <KebijakanPrivasi />
  </StrictMode>
);
