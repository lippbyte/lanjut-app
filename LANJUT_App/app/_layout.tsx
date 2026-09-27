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

  // Ikon status bar gelap sejak render pertama (termasuk saat memuat huruf),
  // supaya jam & baterai terbaca di atas app bar yang berwarna terang.
  const statusBar = <StatusBar style="dark" />;

  // Galat muat huruf tidak boleh mengunci aplikasi — jatuh ke huruf sistem.
  if (!hurufSiap && !galatHuruf) {
    return (
      <>
        {statusBar}
        <LayarMemuat />
      </>
    );
  }

  return (
    <SafeAreaProvider>
      <QueryProvider>
        <AuthProvider>
          {statusBar}
          <Slot />
        </AuthProvider>
      </QueryProvider>
    </SafeAreaProvider>
  );
}
