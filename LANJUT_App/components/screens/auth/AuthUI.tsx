import React from 'react';
import { H1, Header, Main } from '@expo/html-elements';
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from 'react-native';

import { color, radius, spacing, typography } from '../../../theme/tokens';

// Kerangka layar Masuk/Daftar — padanan `.appbar` + `.layar__isi` + `.kepala`
// di MVP-PWA/masuk.html & daftar.html.
export function AuthLayout({
  judul,
  pengantar,
  children,
}: {
  judul: string;
  pengantar: string;
  children: React.ReactNode;
}) {
  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Header style={styles.appbar}>
        <Image source={require('../../../assets/mascot-blue.png')} style={styles.mark} />
        <Image
          source={require('../../../assets/lanjut-wordmark.png')}
          style={styles.wordmark}
          accessibilityLabel="LANJUT"
        />
        <View style={styles.mark} />
      </Header>
      <Main style={styles.flex}>
        <ScrollView contentContainerStyle={styles.isi} keyboardShouldPersistTaps="handled">
          <View>
            <H1 style={styles.judul}>{judul}</H1>
            <Text style={styles.pengantar}>{pengantar}</Text>
          </View>
          {children}
        </ScrollView>
      </Main>
    </KeyboardAvoidingView>
  );
}

export function Field({
  label,
  labelTambahan,
  hint,
  galat,
  children,
}: {
  label: string;
  labelTambahan?: string;
  hint?: string;
  galat?: string;
  children: React.ReactNode;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>
        {label}
        {labelTambahan ? <Text style={styles.muted}> {labelTambahan}</Text> : null}
      </Text>
      {children}
      {galat ? (
        <Text style={styles.galat} role="alert">
          {galat}
        </Text>
      ) : hint ? (
        <Text style={styles.hint}>{hint}</Text>
      ) : null}
    </View>
  );
}

export function Input(props: TextInputProps) {
  const [fokus, setFokus] = React.useState(false);
  return (
    <TextInput
      placeholderTextColor={color.ink300}
      autoCapitalize="none"
      autoCorrect={false}
      {...props}
      onFocus={(e) => {
        setFokus(true);
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        setFokus(false);
        props.onBlur?.(e);
      }}
      style={StyleSheet.flatten([styles.input, fokus && styles.inputFokus])}
    />
  );
}

export function PesanGalat({ teks }: { teks: string | null }) {
  if (!teks) return null;
  return (
    <Text style={styles.galat} role="alert">
      {teks}
    </Text>
  );
}

export function TombolUtama({
  label,
  labelProses,
  proses,
  onPress,
}: {
  label: string;
  labelProses: string;
  proses: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={proses}
      accessibilityRole="button"
      style={({ pressed }) =>
        StyleSheet.flatten([styles.tombol, pressed && styles.tombolTekan, proses && styles.tombolProses])
      }
    >
      {proses && <ActivityIndicator color={color.white} />}
      <Text style={styles.tombolTeks}>{proses ? labelProses : label}</Text>
    </Pressable>
  );
}

export function TautanBawah({
  teks,
  tautan,
  onPress,
}: {
  teks: string;
  tautan: string;
  onPress: () => void;
}) {
  return (
    <Text style={styles.tautanBaris}>
      {teks}{' '}
      <Text style={styles.tautan} onPress={onPress} accessibilityRole="link">
        {tautan}
      </Text>
    </Text>
  );
}

export const authStyles = StyleSheet.create({
  form: { gap: spacing.s5 },
  kartuSoft: {
    padding: spacing.s4,
    borderRadius: radius.md,
    backgroundColor: color.surfaceSoft,
    borderWidth: 1,
    borderColor: color.borderSoft,
    color: color.ink700,
    fontSize: typography.size.bodySm,
    lineHeight: 20,
  },
});

const styles = StyleSheet.create({
  flex: { flex: 1, backgroundColor: color.surfacePage },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.gutter,
    backgroundColor: 'rgba(180,225,235,0.9)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(69,106,140,0.16)',
  },
  mark: { width: 32, height: 32, resizeMode: 'contain' },
  wordmark: { height: 32, width: 93, resizeMode: 'contain' },
  isi: {
    padding: spacing.gutter,
    gap: spacing.s5,
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  judul: {
    fontSize: typography.size.h2,
    fontWeight: typography.weight.bold,
    color: color.textBody,
    marginVertical: 0,
  },
  pengantar: {
    marginTop: spacing.s1,
    fontSize: typography.size.bodySm,
    color: color.textMuted,
  },
  field: { gap: spacing.s2 },
  label: {
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.medium,
    color: color.ink700,
  },
  muted: { color: color.textMuted, fontWeight: typography.weight.regular },
  hint: { fontSize: typography.size.caption, color: color.textMuted },
  // Sistem warna LANJUT tidak punya merah — galat pun biru tua (app.css .field__error).
  galat: { fontSize: typography.size.caption, color: color.blue600 },
  input: {
    minHeight: 48,
    paddingVertical: 13,
    paddingHorizontal: spacing.s4,
    fontSize: typography.size.body,
    color: color.ink900,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.borderSoft,
    borderRadius: radius.md,
    outlineWidth: 0,
  },
  // Padanan `.input:focus` + --focus-ring di MVP-PWA/assets/app.css.
  inputFokus: {
    borderColor: color.blue400,
    outlineWidth: 3,
    outlineStyle: 'solid',
    outlineColor: 'rgba(120,164,203,0.35)',
  },
  tombol: {
    flexDirection: 'row',
    gap: spacing.s2,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
    paddingVertical: spacing.s4,
    paddingHorizontal: 28,
    borderRadius: radius.pill,
    backgroundColor: color.blue400,
  },
  tombolTekan: { backgroundColor: color.blue500, transform: [{ scale: 0.97 }] },
  tombolProses: { opacity: 0.7 },
  tombolTeks: { color: color.white, fontSize: typography.size.lead, fontWeight: typography.weight.semibold },
  tautanBaris: { textAlign: 'center', color: color.textBody, fontSize: typography.size.body },
  tautan: { color: color.textLink, fontWeight: typography.weight.semibold, textDecorationLine: 'underline' },
});
