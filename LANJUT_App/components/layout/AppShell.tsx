import React from 'react';
import { Footer, Header, Main } from '@expo/html-elements';
import { Pressable, StyleSheet, Text } from 'react-native';

import { useSesi } from '../../providers/AuthProvider';
import { color, radius, spacing } from '../../theme/tokens';
import { AppNavBar } from './AppNavBar';

type Props = { children: React.ReactNode };

/**
 * Kerangka halaman bersama untuk kelima rute P0: <Header><Nav/></Header>,
 * <Main>{children}</Main>, <Footer/>. Dipisah dari app/_layout.tsx supaya
 * berkas layout Expo Router tetap fokus pada konfigurasi navigasi, bukan
 * markup — AppShell yang menanggung "jangan pakai View polos" dari instruksi.
 */
export function AppShell({ children }: Props) {
  const { pengguna, keluar } = useSesi();
  return (
    <>
      <Header style={styles.header}>
        <AppNavBar />
      </Header>
      <Main style={styles.main}>{children}</Main>
      <Footer style={styles.footer}>
        <Text style={styles.footerText} numberOfLines={1}>
          Masuk sebagai {pengguna?.nama_tampilan ?? pengguna?.nama_pengguna ?? '…'}
        </Text>
        <Pressable onPress={keluar} accessibilityRole="button" style={styles.tombolKeluar}>
          <Text style={styles.tombolKeluarTeks}>Keluar</Text>
        </Pressable>
      </Footer>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.blue600,
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.gutter,
  },
  main: {
    flex: 1,
    backgroundColor: color.surfacePage,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.s3,
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.gutter,
    backgroundColor: color.surfacePage,
    borderTopWidth: 1,
    borderTopColor: color.borderHairline,
  },
  footerText: {
    flexShrink: 1,
    color: color.textMuted,
    fontSize: 13,
  },
  tombolKeluar: {
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.borderSoft,
    backgroundColor: color.white,
  },
  tombolKeluarTeks: {
    color: color.blue600,
    fontSize: 13,
    fontWeight: '600',
  },
});
