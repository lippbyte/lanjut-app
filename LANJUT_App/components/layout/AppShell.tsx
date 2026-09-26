import React from 'react';
import { Footer, Header, Main } from '@expo/html-elements';
import { StyleSheet, Text } from 'react-native';

import { color, spacing } from '../../theme/tokens';
import { AppNavBar } from './AppNavBar';

type Props = { children: React.ReactNode };

/**
 * Kerangka halaman bersama untuk kelima rute P0: <Header><Nav/></Header>,
 * <Main>{children}</Main>, <Footer/>. Dipisah dari app/_layout.tsx supaya
 * berkas layout Expo Router tetap fokus pada konfigurasi navigasi, bukan
 * markup — AppShell yang menanggung "jangan pakai View polos" dari instruksi.
 */
export function AppShell({ children }: Props) {
  return (
    <>
      <Header style={styles.header}>
        <AppNavBar />
      </Header>
      <Main style={styles.main}>{children}</Main>
      <Footer style={styles.footer}>
        <Text style={styles.footerText}>
          LANJUT — eksplorasi Expo, bukan rilis v1 (lihat LANJUT_App/README.md)
        </Text>
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
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.gutter,
    backgroundColor: color.surfacePage,
    borderTopWidth: 1,
    borderTopColor: color.borderHairline,
  },
  footerText: {
    color: color.textSubtle,
    fontSize: 12,
  },
});
