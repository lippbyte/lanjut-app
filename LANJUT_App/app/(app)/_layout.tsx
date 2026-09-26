import React from 'react';
import { Redirect, Slot } from 'expo-router';

import { AppShell } from '../../components/layout/AppShell';
import { LayarMemuat } from '../../components/layout/LayarMemuat';
import { useSesi } from '../../providers/AuthProvider';

// Pelindung rute: lima layar P0 hanya untuk pengguna yang sudah masuk.
export default function AppLayout() {
  const { status } = useSesi();
  if (status === 'memuat') return <LayarMemuat />;
  if (status === 'keluar') return <Redirect href="/masuk" />;
  return (
    <AppShell>
      <Slot />
    </AppShell>
  );
}
