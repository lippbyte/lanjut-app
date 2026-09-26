import React from 'react';

import { LinimasaScreen } from '../components/screens/LinimasaScreen';

// F1 — Linimasa (docs/prd-sdd-lanjut.md Bagian 6): daftar tahapan
// TKA/SNBP/SNBT berurutan waktu dengan tenggat terdekat di posisi pertama.
// Markup & logika sungguhan ada di components/screens/LinimasaScreen.tsx —
// satu-satunya rute P0 yang sudah diisi (empat lainnya masih ScreenSection
// placeholder, lihat LANJUT_App/README.md).
export default function LinimasaRoute() {
  return <LinimasaScreen />;
}
