import React from 'react';
import { Redirect, Slot } from 'expo-router';

import { AppShell } from '../../components/layout/AppShell';
import { LayarMemuat } from '../../components/layout/LayarMemuat';
import { useSesi } from '../../providers/AuthProvider';
import { ObrolanProvider } from '../../providers/ObrolanProvider';

// Pelindung rute: lima layar P0 hanya untuk pengguna yang sudah masuk.
export default function AppLayout() {
  const { status, pengguna } = useSesi();
  if (status === 'memuat') return <LayarMemuat />;
  if (status === 'keluar') return <Redirect href="/masuk" />;
  return (
    // key: riwayat obrolan (hanya di memori) tidak terbawa ke akun lain dan
    // hilang saat keluar — layout ini tidak dirender lagi saat status 'keluar'.
    <ObrolanProvider key={pengguna?.id} namaTampilan={pengguna?.nama_tampilan}>
      <AppShell>
        <Slot />
      </AppShell>
    </ObrolanProvider>
  );
}
