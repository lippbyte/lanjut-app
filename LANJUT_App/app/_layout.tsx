import React from 'react';
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  useFonts,
} from '@expo-google-fonts/poppins';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { LayarMemuat } from '../components/layout/LayarMemuat';
import { DataLayerProbe } from '../dev/DataLayerProbe';
import { AuthProvider } from '../providers/AuthProvider';
import { QueryProvider } from '../providers/QueryProvider';

/**
 * Root layout hanya memasang provider dan memuat Poppins (huruf PWA).
 * Penjagaan rute ada di layout grup: app/(auth)/_layout.tsx (Masuk/Daftar,
 * khusus yang belum masuk) dan app/(app)/_layout.tsx (khusus yang sudah masuk).
 */
export default function RootLayout() {
  const [hurufSiap, galatHuruf] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
  });

  // Galat muat huruf tidak boleh mengunci aplikasi — jatuh ke huruf sistem.
  if (!hurufSiap && !galatHuruf) return <LayarMemuat />;

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          <StatusBar style="dark" />
          {__DEV__ && <DataLayerProbe />}
          <Slot />
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
