import React from 'react';
import { H1, H2 } from '@expo/html-elements';
import { LinearGradient } from 'expo-linear-gradient';
import {
  ActivityIndicator,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from 'react-native';

import { color, gradient, radius, shadow, spacing, teks } from '../../theme/tokens';
import { Ikon, type NamaIkon } from './Ikon';

export { Ikon } from './Ikon';

// Padanan komponen di MVP-PWA/assets/app.css — nama kelas CSS dicantumkan
// per komponen supaya mudah dicocokkan.

/** .kepala — judul layar + kalimat pendamping. */
export function Kepala({ judul, pengantar }: { judul: string; pengantar?: string }) {
  return (
    <View>
      <H1 style={s.kepalaJudul}>{judul}</H1>
      {pengantar ? <Text style={s.kepalaPengantar}>{pengantar}</Text> : null}
    </View>
  );
}

/** .seksi__judul */
export function SeksiJudul({ children }: { children: string }) {
  return <H2 style={s.seksiJudul}>{children}</H2>;
}

type VarianKartu = 'biasa' | 'soft' | 'outline' | 'brand';

/** .kartu, .kartu--soft, .kartu--outline, .kartu--brand (gradasi tile). */
export function Kartu({
  varian = 'biasa',
  style,
  children,
}: {
  varian?: VarianKartu;
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}) {
  if (varian === 'brand') {
    return (
      <LinearGradient
        colors={gradient.tile.colors}
        start={gradient.tile.start}
        end={gradient.tile.end}
        style={StyleSheet.flatten([s.kartu, s.kartuBrand, style])}
      >
        {children}
      </LinearGradient>
    );
  }
  return (
    <View
      style={StyleSheet.flatten([
        s.kartu,
        varian === 'soft' && s.kartuSoft,
        varian === 'outline' && s.kartuOutline,
        style,
      ])}
    >
      {children}
    </View>
  );
}

/** .kartu yang bisa ditekan (pintu ke layar lain) berisi .baris ikon–teks–panah. */
export function KartuPintu({
  ikon,
  judul,
  keterangan,
  varian = 'soft',
  onPress,
}: {
  ikon: NamaIkon;
  judul: string;
  keterangan: string;
  varian?: Exclude<VarianKartu, 'brand'>;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="link"
      style={({ pressed }) => (pressed ? s.ditekan : undefined)}
    >
      <Kartu varian={varian}>
        <View style={s.baris}>
          <Ikon nama={ikon} />
          <View style={s.barisIsi}>
            <Text style={s.barisJudul}>{judul}</Text>
            <Text style={s.barisKet}>{keterangan}</Text>
          </View>
          <Ikon nama="panah" ukuran={18} warna={color.ink500} />
        </View>
      </Kartu>
    </Pressable>
  );
}

type VarianLencana = 'biasa' | 'neutral' | 'solid' | 'ondark' | 'resmi';

/** .lencana */
export function Lencana({ varian = 'biasa', children }: { varian?: VarianLencana; children: React.ReactNode }) {
  const v = LENCANA[varian];
  return (
    <View style={[s.lencana, { backgroundColor: v.bg }]}>
      <Text style={[s.lencanaTeks, { color: v.fg }]}>{children}</Text>
    </View>
  );
}

const LENCANA: Record<VarianLencana, { bg: string; fg: string }> = {
  biasa: { bg: color.blue200, fg: color.blue600 },
  neutral: { bg: color.ink100, fg: color.ink700 },
  solid: { bg: color.blue400, fg: color.white },
  ondark: { bg: color.onDarkSoft, fg: color.white },
  resmi: { bg: color.blue100, fg: color.blue600 },
};

/** .peringatan — kotak pemberitahuan biru tua (sistem ini tidak punya merah). */
export function Peringatan({ judul, children }: { judul?: string; children: React.ReactNode }) {
  return (
    <View style={s.peringatan} role="note">
      <View style={s.peringatanIkon}>
        <Ikon nama="info" ukuran={18} />
      </View>
      <View style={s.peringatanIsi}>
        {judul ? <Text style={s.peringatanJudul}>{judul}</Text> : null}
        {typeof children === 'string' ? <Text style={s.peringatanTeks}>{children}</Text> : children}
      </View>
    </View>
  );
}

/** .kosong — layar kosong: maskot + judul + kalimat + aksi opsional. */
export function Kosong({
  judul,
  teks: isi,
  aksi,
}: {
  judul: string;
  teks?: string;
  aksi?: React.ReactNode;
}) {
  return (
    <View style={s.kosong}>
      <Image source={require('../../assets/mascot-blue.png')} style={s.kosongMaskot} resizeMode="contain" />
      <Text style={s.kosongJudul}>{judul}</Text>
      {isi ? <Text style={s.kosongTeks}>{isi}</Text> : null}
      {aksi}
    </View>
  );
}

/** .btn / .btn--secondary / .btn--lg / .btn--penuh */
export function Tombol({
  label,
  onPress,
  varian = 'utama',
  besar = false,
  penuh = false,
  proses = false,
}: {
  label: string;
  onPress: () => void;
  varian?: 'utama' | 'sekunder' | 'garis';
  besar?: boolean;
  penuh?: boolean;
  proses?: boolean;
}) {
  const v = TOMBOL[varian];
  return (
    <Pressable
      onPress={onPress}
      disabled={proses}
      accessibilityRole="button"
      style={({ pressed }) =>
        StyleSheet.flatten([
          s.tombol,
          { backgroundColor: pressed ? v.bgTekan : v.bg, borderColor: v.garis },
          varian === 'utama' && { boxShadow: shadow.s2 },
          besar && s.tombolBesar,
          penuh ? s.tombolPenuh : s.tombolPas,
          pressed && s.ditekan,
          proses && s.tombolProses,
        ])
      }
    >
      {proses ? <ActivityIndicator color={v.fg} /> : null}
      <Text style={[besar ? s.tombolTeksBesar : s.tombolTeks, { color: v.fg }]}>{label}</Text>
    </Pressable>
  );
}

const TOMBOL = {
  utama: { bg: color.blue400, bgTekan: color.blue500, fg: color.white, garis: 'transparent' },
  sekunder: { bg: color.blue200, bgTekan: '#A8D6E3', fg: color.blue600, garis: 'transparent' },
  garis: { bg: color.white, bgTekan: color.blue100, fg: color.blue600, garis: color.borderBrand },
} as const;

/** .sumber — baris sumber data kecil & redup. */
export function Sumber({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[s.sumber, style]}>{children}</Text>;
}

/** .penafian */
export function Penafian({ children }: { children: React.ReactNode }) {
  return <Text style={s.sumber}>{children}</Text>;
}

export function Memuat() {
  return <ActivityIndicator style={s.memuat} color={color.blue500} />;
}

/** Keadaan galat pemuatan (salinan-teks-lanjut.md §6). */
export function KeadaanGalat() {
  return <Peringatan>Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat.</Peringatan>;
}

export const gaya = StyleSheet.create({
  /** .layar__isi */
  layarIsi: {
    padding: spacing.gutter,
    gap: spacing.s5,
  },
  /** .layar__isi--rapat */
  layarIsiRapat: {
    padding: spacing.gutter,
    gap: spacing.s4,
  },
  teksBody: { ...teks.body, color: color.ink700 },
  teksKecil: { ...teks.bodySm, color: color.ink700 },
  tebal: { fontFamily: teks.h3.fontFamily },
  tautan: { color: color.textLink, textDecorationLine: 'underline', fontFamily: teks.title.fontFamily },
});

const s = StyleSheet.create({
  kepalaJudul: { ...teks.h2, color: color.textBody, marginVertical: 0 },
  kepalaPengantar: { ...teks.bodySm, color: color.textMuted, marginTop: spacing.s1 },
  seksiJudul: { ...teks.label, fontSize: 14, color: color.textMuted, marginVertical: 0 },
  kartu: {
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    borderRadius: radius.lg,
    padding: spacing.s5,
    boxShadow: shadow.s1,
  },
  kartuSoft: { backgroundColor: color.surfaceSoft, borderColor: color.borderSoft },
  kartuOutline: { backgroundColor: color.white, borderColor: color.borderBrand },
  kartuBrand: { borderColor: 'transparent', overflow: 'hidden' },
  baris: { flexDirection: 'row', alignItems: 'center', gap: spacing.s3 },
  barisIsi: { flex: 1, minWidth: 0 },
  barisJudul: { ...teks.title, fontFamily: teks.h1.fontFamily, color: color.textBody },
  barisKet: { ...teks.bodySm, color: color.ink700, marginTop: 2 },
  ditekan: { transform: [{ scale: 0.97 }], opacity: 0.95 },
  lencana: {
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: radius.pill,
  },
  lencanaTeks: { ...teks.caption, fontFamily: teks.title.fontFamily },
  peringatan: {
    flexDirection: 'row',
    gap: spacing.s3,
    alignItems: 'flex-start',
    backgroundColor: color.statusAttentionBg,
    borderWidth: 1,
    borderColor: color.borderSoft,
    borderRadius: radius.md,
    padding: spacing.s3,
  },
  peringatanIkon: { marginTop: 2 },
  peringatanIsi: { flex: 1, minWidth: 0 },
  peringatanJudul: { ...teks.label, fontSize: 13, color: color.blue600, marginBottom: spacing.s1 },
  peringatanTeks: { ...teks.bodySm, color: color.ink700 },
  kosong: {
    alignItems: 'center',
    gap: spacing.s3,
    paddingVertical: spacing.s10,
    paddingHorizontal: spacing.s6,
  },
  kosongMaskot: { width: 96, height: 96, opacity: 0.9 },
  kosongJudul: { ...teks.h3, color: color.textBody, textAlign: 'center' },
  kosongTeks: { ...teks.bodySm, color: color.textMuted, textAlign: 'center', maxWidth: 320 },
  tombol: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.s2,
    minHeight: 44,
    paddingVertical: spacing.s3,
    paddingHorizontal: 22,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  tombolBesar: { minHeight: 52, paddingVertical: spacing.s4, paddingHorizontal: 28 },
  tombolPenuh: { alignSelf: 'stretch' },
  tombolPas: { alignSelf: 'center' },
  tombolProses: { opacity: 0.7 },
  tombolTeks: { fontFamily: teks.h1.fontFamily, fontSize: 16, lineHeight: 22 },
  tombolTeksBesar: { fontFamily: teks.h1.fontFamily, fontSize: 18, lineHeight: 24 },
  sumber: { ...teks.caption, color: color.textSubtle },
  memuat: { marginVertical: spacing.s8 },
});
