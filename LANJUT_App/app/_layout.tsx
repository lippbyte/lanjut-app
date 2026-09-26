import React from 'react';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { DataLayerProbe } from '../dev/DataLayerProbe';
import { AuthProvider } from '../providers/AuthProvider';
import { QueryProvider } from '../providers/QueryProvider';

/**
 * Root layout hanya memasang provider. Penjagaan rute ada di layout grup:
 * app/(auth)/_layout.tsx (Masuk/Daftar, khusus yang belum masuk) dan app/(app)/_layout.tsx
 * (lima layar P0 + AppShell, khusus yang sudah masuk).
 */
export default function RootLayout() {
  return (
    <QueryProvider>
      <AuthProvider>
        <StatusBar style="dark" />
        {__DEV__ && <DataLayerProbe />}
        <Slot />
      </AuthProvider>
    </QueryProvider>
  );
}
