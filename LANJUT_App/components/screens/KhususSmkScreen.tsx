import React from 'react';
import { Article, H1, Section } from '@expo/html-elements';
import { ActivityIndicator, StyleSheet, Text } from 'react-native';

import type { ButirKhususSmk } from '../../api/types';
import { useButirKhususSmk } from '../../hooks/useButirKhususSmk';
import { butirBerpasangan } from '../../lib/khususSmk';
import { color, radius, spacing, typography } from '../../theme/tokens';
import { KeadaanGalat, KeadaanKosong } from './KeadaanBersama';

/**
 * F2 — Khusus SMK (docs/prd-sdd-lanjut.md Bagian 6 & 13; teks statis persis
 * docs/salinan-teks-lanjut.md §4.2 — tidak ada kalimat baru ditulis di
 * sini). Butir tanpa pasangan lengkap disaring di lib/khususSmk.ts, bukan
 * di komponen ini.
 */
export function KhususSmkScreen() {
  const { data, isPending, isError } = useButirKhususSmk();

  return (
    <Section style={styles.halaman}>
      <H1 style={styles.judul}>Khusus SMK</H1>
      <Text style={styles.pendamping}>Hal-hal yang memang beda buat kita.</Text>
      <Text style={styles.pembuka}>
        Sebagian aturan seleksi menganggap semua pendaftar berasal dari SMA. Halaman ini
        merangkum bagian yang tidak berlaku sama untuk kita — dan apa yang bisa dilakukan.
      </Text>

      {isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : isError ? (
        <KeadaanGalat />
      ) : (
        <Isi data={data} />
      )}
    </Section>
  );
}

function Isi({ data }: { data: ButirKhususSmk[] | undefined }) {
  const butir = butirBerpasangan(data ?? []);

  if (!butir.length) return <KeadaanKosong />;

  return (
    <>
      {butir.map((b) => (
        <ButirKhususSmkKartu key={b.id} butir={b} />
      ))}
    </>
  );
}

function ButirKhususSmkKartu({ butir }: { butir: ButirKhususSmk }) {
  return (
    <Article style={styles.kartu}>
      <Text style={styles.kartuJudul}>{butir.judul}</Text>

      <Section style={styles.blokBeda}>
        <Text style={styles.labelBeda}>Apa yang berbeda</Text>
        <Text style={styles.isiBlok}>{butir.apa_yang_beda}</Text>
      </Section>

      <Section style={styles.blokBisa}>
        <Text style={styles.labelBisa}>Apa yang bisa dilakukan</Text>
        <Text style={styles.isiBlok}>{butir.apa_yang_bisa_dilakukan}</Text>
      </Section>
    </Article>
  );
}

const styles = StyleSheet.create({
  halaman: {
    padding: spacing.gutter,
    gap: spacing.s4,
  },
  judul: {
    color: color.textBody,
    fontSize: typography.size.h2,
    fontWeight: typography.weight.semibold,
    marginTop: 0,
    marginBottom: 0,
  },
  pendamping: {
    color: color.textMuted,
    fontSize: typography.size.body,
    marginTop: -spacing.s3,
  },
  pembuka: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
    lineHeight: 20,
  },
  muat: {
    marginTop: spacing.s4,
  },
  kartu: {
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    padding: spacing.s4,
    gap: spacing.s3,
  },
  kartuJudul: {
    color: color.textBody,
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  blokBeda: {
    borderRadius: radius.sm,
    backgroundColor: color.statusAttentionBg,
    padding: spacing.s3,
    gap: spacing.s1,
  },
  blokBisa: {
    borderRadius: radius.sm,
    backgroundColor: color.statusOkBg,
    padding: spacing.s3,
    gap: spacing.s1,
  },
  labelBeda: {
    color: color.blue600,
    fontSize: typography.size.label,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  labelBisa: {
    color: color.statusOkFg,
    fontSize: typography.size.label,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  isiBlok: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
    lineHeight: 20,
  },
});
