import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AppShell } from '../components/layout/AppShell';
import { DataLayerProbe } from '../dev/DataLayerProbe';
import { QueryProvider } from '../providers/QueryProvider';

/**
 * Root layout pakai <Slot/> (bukan <Stack/>) supaya AppShell — Header+Nav
 * di atas, Footer di bawah — tetap sama di kelima rute P0; berpindah halaman
 * hanya mengganti isi <Main>, bukan memicu transisi layar ala Stack yang
 * tidak relevan untuk kerangka navigasi datar seperti ini.
 *
 * `<DataLayerProbe/>` hanya dipasang saat `__DEV__` — ia tidak merender apa
 * pun (return null), tugasnya cuma console.log data dari kedelapan hook
 * lapisan data untuk verifikasi, dan tidak relevan sama sekali di build
 * produksi.
 */
export default function RootLayout() {
  return (
    <QueryProvider>
      <AppShell>
        <StatusBar style="dark" />
        {__DEV__ && <DataLayerProbe />}
        <Slot />
      </AppShell>
    </QueryProvider>
  );
}
