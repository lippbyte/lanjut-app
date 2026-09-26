import React from 'react';
import { Article, H1, Section } from '@expo/html-elements';
import { ActivityIndicator, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

import type { TahapanLinimasa } from '../../api/types';
import { useTahapanLinimasa } from '../../hooks/useTahapanLinimasa';
import {
  formatRentang,
  formatTanggal,
  formatTanggalRingkas,
  turunkanLinimasa,
  type TahapanTurunan,
} from '../../lib/linimasa';
import { color, radius, spacing, typography } from '../../theme/tokens';
import { KeadaanGalat, KeadaanKosong } from './KeadaanBersama';

/**
 * F1 — Linimasa (docs/prd-sdd-lanjut.md Bagian 6 & 13; teks statis persis
 * docs/salinan-teks-lanjut.md §4.1 — tidak ada kalimat yang ditulis ulang
 * di sini). Butir tanpa `diperiksa_pada` sudah disaring di lib/linimasa.ts
 * sebelum sampai ke komponen ini, bukan di sini.
 */
export function LinimasaScreen() {
  const { data, isPending, isError } = useTahapanLinimasa();

  return (
    <Section style={styles.halaman}>
      <H1 style={styles.judul}>Linimasa</H1>
      <Text style={styles.pendamping}>Apa yang jatuh tempo, dan kapan.</Text>

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

function Isi({ data }: { data: TahapanLinimasa[] | undefined }) {
  const hasil = turunkanLinimasa(data ?? []);

  if (!hasil.butir.length) return <KeadaanKosong />;

  return (
    <>
      <KartuTenggat terdekat={hasil.terdekat} sisaHari={hasil.sisaHari} />
      {hasil.butir.map((butir) => (
        <ButirLinimasa key={butir.id} butir={butir} />
      ))}
    </>
  );
}

// Tenggat terdekat, diletakkan tepat di bawah judul supaya terlihat tanpa
// gulir (kriteria penerimaan F1). Hitungan mundur berupa angka hari biasa,
// BUKAN detik berdetak (salinan-teks-lanjut.md §4.1, catatan).
function KartuTenggat({
  terdekat,
  sisaHari,
}: {
  terdekat: TahapanTurunan | null;
  sisaHari: number | null;
}) {
  const adaTenggat = terdekat && sisaHari !== null && sisaHari >= 0;

  return (
    <Section style={styles.kartuTenggat}>
      {adaTenggat ? (
        <>
          <Text style={styles.tenggatAngka}>{sisaHari} hari</Text>
          <Text style={styles.tenggatTeks}>
            Berikutnya: {terdekat!.judul} — tutup {formatTanggalRingkas(terdekat!.tanggal_selesai)}
          </Text>
        </>
      ) : (
        <Text style={styles.tenggatTeks}>Sudah lewat. Tenggat berikutnya ada di bawah.</Text>
      )}
    </Section>
  );
}

// Tahapan yang sudah lewat ditandai secara visual — opacity berkurang +
// coretan judul + titik hijau redam (BUKAN merah/oranye, lihat catatan di
// theme/tokens.ts `statusOk`), tidak pernah dihapus dari daftar.
function ButirLinimasa({ butir }: { butir: TahapanTurunan }) {
  const lewat = butir.status === 'done';
  const titikStyle =
    butir.status === 'done'
      ? styles.titikLewat
      : butir.status === 'soon'
        ? styles.titikSoon
        : styles.titikIdle;

  return (
    <Article style={[styles.butir, lewat && styles.butirLewat]}>
      <View style={styles.butirBaris}>
        <View style={[styles.titik, titikStyle]} />
        <Text style={styles.jalur}>{butir.jalur}</Text>
      </View>
      <Text style={[styles.butirJudul, lewat && styles.butirJudulLewat]}>{butir.judul}</Text>
      <Text style={styles.butirTanggal}>{formatRentang(butir.tanggal_mulai, butir.tanggal_selesai)}</Text>
      <Pressable onPress={() => Linking.openURL(butir.url_sumber)}>
        <Text style={styles.sumberTautan} numberOfLines={1} ellipsizeMode="tail">
          {butir.url_sumber}
        </Text>
      </Pressable>
      <Text style={styles.sumberTeks}>
        Diperbarui dari laman resmi SNPMB · dicek {formatTanggal(butir.diperiksa_pada)}
      </Text>
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
  kartuTenggat: {
    padding: spacing.s5,
    borderRadius: radius.lg,
    backgroundColor: color.blue600,
    gap: spacing.s1,
  },
  tenggatAngka: {
    color: color.textOnBrand,
    fontSize: typography.size.h1,
    fontWeight: typography.weight.bold,
  },
  tenggatTeks: {
    color: color.textOnBrand,
    fontSize: typography.size.body,
    lineHeight: 22,
  },
  butir: {
    padding: spacing.s4,
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    gap: spacing.s1,
  },
  butirLewat: {
    opacity: 0.55,
  },
  butirBaris: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },
  titik: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
  },
  titikLewat: {
    backgroundColor: color.statusOk,
  },
  titikSoon: {
    backgroundColor: color.blue500,
  },
  titikIdle: {
    backgroundColor: color.ink300,
  },
  jalur: {
    color: color.textSubtle,
    fontSize: typography.size.label,
    fontWeight: typography.weight.bold,
    letterSpacing: 1,
  },
  butirJudul: {
    color: color.textBody,
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  butirJudulLewat: {
    textDecorationLine: 'line-through',
  },
  butirTanggal: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
  },
  sumberTautan: {
    color: color.textLink,
    fontSize: typography.size.caption,
    textDecorationLine: 'underline',
  },
  sumberTeks: {
    color: color.textSubtle,
    fontSize: typography.size.caption,
  },
});
