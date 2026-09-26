import React from 'react';
import { Article, H1, Section } from '@expo/html-elements';
import { StyleSheet, Text } from 'react-native';

import { color, spacing, typography } from '../../theme/tokens';

type Props = {
  /** Kode fitur persis dari docs/prd-sdd-lanjut.md Bagian 6, mis. "F1". */
  featureCode: string;
  title: string;
  children?: React.ReactNode;
};

/**
 * Pembungkus tiap layar P0: <Article><Section><h1/>…</Section></Article>.
 * <H1> dipakai (bukan sekadar <Text> berukuran besar) supaya tiap rute tetap
 * punya satu judul dokumen yang valid secara semantik di keluaran web —
 * konsisten dengan instruksi "jangan pakai View polos untuk struktur halaman".
 */
export function ScreenSection({ featureCode, title, children }: Props) {
  return (
    <Article style={styles.article}>
      <Section style={styles.section}>
        <Text style={styles.eyebrow}>{featureCode}</Text>
        <H1 style={styles.title}>{title}</H1>
        {children ?? (
          <Text style={styles.placeholder}>
            Kerangka halaman — logika &amp; data belum dihubungkan (lihat LANJUT_App/README.md).
          </Text>
        )}
      </Section>
    </Article>
  );
}

const styles = StyleSheet.create({
  article: {
    flex: 1,
  },
  section: {
    padding: spacing.gutter,
    gap: spacing.s2,
  },
  eyebrow: {
    color: color.blue500,
    fontWeight: typography.weight.bold,
    fontSize: typography.size.label,
    letterSpacing: 1,
  },
  title: {
    color: color.textBody,
    fontSize: typography.size.h2,
    fontWeight: typography.weight.semibold,
    marginTop: 0,
    marginBottom: spacing.s1,
  },
  placeholder: {
    color: color.textMuted,
    fontSize: typography.size.body,
    lineHeight: 22,
  },
});
