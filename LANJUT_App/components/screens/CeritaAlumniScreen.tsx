import React from 'react';
import { Article, H1, Section } from '@expo/html-elements';
import { Link } from 'expo-router';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import type { CeritaAlumni } from '../../api/types';
import { useCeritaAlumni } from '../../hooks/useCeritaAlumni';
import { color, radius, spacing, typography } from '../../theme/tokens';
import { KeadaanGalat } from './KeadaanBersama';

// PWA v1 (app/alumni.html, layar kosong): mailto nyata yang sudah dipakai
// production — disalin persis, bukan ditulis baru, supaya "Hubungkan kami"
// benar-benar berfungsi alih-alih jadi tombol mati.
const TAUTAN_HUBUNGKAN =
  'mailto:edilaksogroup@gmail.com?subject=Cerita%20Alumni%20SMK%20untuk%20LANJUT';

/**
 * F4 — Cerita Alumni SMK (docs/prd-sdd-lanjut.md Bagian 6 & 13; teks statis
 * persis docs/salinan-teks-lanjut.md §4.3 — tidak ada kalimat baru ditulis
 * di sini). Hanya cerita `tayang=true` yang pernah sampai ke sini —
 * disaring server-side (konten.repo.js `ambilCeritaAlumniTayang`), bukan
 * di klien (lihat hooks/useCeritaAlumni.ts).
 */
export function CeritaAlumniScreen() {
  const { data, isPending, isError } = useCeritaAlumni();

  return (
    <Section style={styles.halaman}>
      <H1 style={styles.judul}>Cerita Alumni SMK</H1>
      <Text style={styles.pendamping}>Mereka sudah lewat jalan ini.</Text>

      {isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : isError ? (
        <KeadaanGalat />
      ) : !data?.length ? (
        <KeadaanKosongAlumni />
      ) : (
        <>
          {data.map((cerita) => (
            <KartuCerita key={cerita.id} cerita={cerita} />
          ))}
        </>
      )}
    </Section>
  );
}

// Layar kosong F4 — teks persis salinan-teks-lanjut.md §4.3. BUKAN keadaan
// kosong generik dari KeadaanBersama.tsx: §4.3 punya kalimat & ajakan
// sendiri untuk keadaan ini, jadi yang generik tidak dipakai di sini.
function KeadaanKosongAlumni() {
  return (
    <Article style={styles.keadaan}>
      <Text style={styles.keadaanJudul}>Cerita pertama sedang kami kumpulkan.</Text>
      <Text style={styles.keadaanTeks}>Kenal alumni SMK yang tembus PTN?</Text>
      <Pressable onPress={() => Linking.openURL(TAUTAN_HUBUNGKAN)} style={styles.tombolHubungkan}>
        <Text style={styles.tombolHubungkanTeks}>Hubungkan kami</Text>
      </Pressable>
    </Article>
  );
}

// Format seragam persis PRD §13: asal SMK & jurusan, PTN & prodi, jalur,
// hambatan, yang dilakukan — plus ajakan §4.3 di akhir tiap cerita.
function KartuCerita({ cerita }: { cerita: CeritaAlumni }) {
  return (
    <Article style={styles.kartu}>
      <Text style={styles.asal}>
        {cerita.asal_smk} · {cerita.jurusan_smk}
      </Text>
      <Text style={styles.tujuan}>
        → {cerita.ptn} · {cerita.prodi}
      </Text>

      <View style={styles.lencana}>
        <Text style={styles.lencanaTeks}>Jalur {cerita.jalur}</Text>
      </View>

      <Text style={styles.baris}>
        <Text style={styles.barisLabel}>Hambatan: </Text>
        {cerita.hambatan}
      </Text>
      <Text style={styles.baris}>
        <Text style={styles.barisLabel}>Yang dilakukan: </Text>
        {cerita.yang_dilakukan}
      </Text>

      <View style={styles.ajakan}>
        <Text style={styles.ajakanTeks}>Kamu juga akan punya cerita seperti ini.</Text>
        <Link href="/daftar-periksa" asChild>
          <Pressable>
            <Text style={styles.ajakanTautan}>Simpan langkahmu di Daftar Periksa.</Text>
          </Pressable>
        </Link>
      </View>
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
  muat: {
    marginTop: spacing.s4,
  },
  keadaan: {
    padding: spacing.s5,
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    gap: spacing.s2,
    alignItems: 'flex-start',
  },
  keadaanJudul: {
    color: color.textBody,
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  keadaanTeks: {
    color: color.textMuted,
    fontSize: typography.size.body,
  },
  tombolHubungkan: {
    marginTop: spacing.s2,
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.blue500,
  },
  tombolHubungkanTeks: {
    color: color.blue600,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.semibold,
  },
  kartu: {
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    padding: spacing.s4,
    gap: spacing.s2,
  },
  asal: {
    color: color.textBody,
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  tujuan: {
    color: color.blue600,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.medium,
    marginTop: -spacing.s1,
  },
  lencana: {
    alignSelf: 'flex-start',
    paddingVertical: spacing.s1,
    paddingHorizontal: spacing.s3,
    borderRadius: radius.pill,
    backgroundColor: color.surfaceSoft,
  },
  lencanaTeks: {
    color: color.blue600,
    fontSize: typography.size.caption,
    fontWeight: typography.weight.semibold,
  },
  baris: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
    lineHeight: 20,
  },
  barisLabel: {
    color: color.textBody,
    fontWeight: typography.weight.semibold,
  },
  ajakan: {
    marginTop: spacing.s2,
    paddingTop: spacing.s3,
    borderTopWidth: 1,
    borderTopColor: color.borderHairline,
  },
  ajakanTeks: {
    color: color.textSubtle,
    fontSize: typography.size.caption,
  },
  ajakanTautan: {
    color: color.textLink,
    fontSize: typography.size.caption,
    textDecorationLine: 'underline',
  },
});
