import React, { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputKeyPressEventData,
} from 'react-native';

import { usePersetujuan } from '../../hooks/usePersetujuan';
import { labelGayaBelajar } from '../../lib/gayaBelajar';
import { keadaanKebijakan } from '../../lib/kebijakanPrivasi';
import { useSesi } from '../../providers/AuthProvider';
import { useObrolan } from '../../providers/ObrolanProvider';
import { color, font, layout, radius, spacing, teks } from '../../theme/tokens';
import { Ikon, Tombol } from '../ui';

const PANJANG_MAKS = 500;

// Salinan teks §4.13 (LANJUT_047) — DRAF belum disetujui Khalifa. Info saja:
// stub tetap jalan untuk semua akun; gerbang AI sungguhan ada di server
// (bolehPakaiAi), bukan di layar ini.
const INFO_PERSETUJUAN_AI = 'Balasan AI sungguhan nanti aktif setelah orang tua atau walimu memberi persetujuan.';
// Salinan teks §4.14 (LANJUT_048) — DRAF. Hanya ajakan; stub tidak berubah.
const AJAKAN_KEBIJAKAN = 'Terima kebijakan privasi dulu supaya fitur AI bisa diaktifkan nanti.';

/**
 * Ngobrol Bareng LANJUT (LANJUT_032) — UI chat untuk uji UX.
 *
 * Balasan datang dari `dapatkanBalasanBot` (lib/chatStub.ts), STUB tanpa AI
 * dan tanpa panggilan jaringan. Riwayat hanya di memori (ObrolanProvider):
 * tidak dikirim ke server, tidak disimpan di perangkat, hilang saat keluar
 * akun atau aplikasi ditutup. Keputusan penyimpanan riwayat menunggu Khalifa
 * (data anak, UU PDP Pasal 25).
 */
export function NgobrolScreen() {
  const { pengguna } = useSesi();
  const { pesan, mengetik, kirim: kirimPesan } = useObrolan();
  const router = useRouter();
  const gulir = useRef<ScrollView>(null);
  const [draf, setDraf] = useState('');
  const [fokus, setFokus] = useState(false);
  const { data: persetujuan } = usePersetujuan();
  const keadaan = persetujuan ? keadaanKebijakan(persetujuan) : null;
  const ajakKebijakan = keadaan === 'bisa_diterima' || keadaan === 'versi_app_berbeda';

  const gayaBelajar = pengguna?.gaya_belajar ?? null;
  const labelGaya = labelGayaBelajar(gayaBelajar);

  const kirim = () => {
    const isi = draf.trim();
    if (!isi || mengetik) return;
    setDraf('');
    kirimPesan(isi, gayaBelajar);
  };

  // Web: Enter mengirim, Shift+Enter baris baru. Di HP tombol kirim yang dipakai.
  const tekanTombol = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const ev = e.nativeEvent as TextInputKeyPressEventData & { shiftKey?: boolean };
    if (Platform.OS === 'web' && ev.key === 'Enter' && !ev.shiftKey) {
      e.preventDefault();
      kirim();
    }
  };

  const bisaKirim = draf.trim().length > 0 && !mengetik;

  return (
    <KeyboardAvoidingView style={s.akar} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={s.uji} role="note">
        <Ikon nama="info" ukuran={18} />
        <Text style={s.ujiTeks}>
          <Text style={s.ujiTebal}>Versi uji coba.</Text> Balasan belum dari AI sungguhan, dan obrolan ini tidak
          disimpan. {INFO_PERSETUJUAN_AI}
        </Text>
      </View>

      <ScrollView
        ref={gulir}
        style={s.daftar}
        contentContainerStyle={s.daftarIsi}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => gulir.current?.scrollToEnd({ animated: true })}
        aria-live="polite"
      >
        <Pressable onPress={() => router.push('/gaya-belajar')} style={s.gaya} accessibilityRole="link">
          <Text style={s.gayaTeks}>
            {labelGaya ? `Gaya belajarmu: ${labelGaya}` : 'Gaya belajarmu belum dipilih'} ·{' '}
            <Text style={s.gayaTautan}>{labelGaya ? 'Ubah' : 'Atur'}</Text>
          </Text>
        </Pressable>

        {ajakKebijakan ? (
          <Pressable onPress={() => router.push('/terima-kebijakan')} style={s.gaya} accessibilityRole="link">
            <Text style={s.gayaTeks}>
              {AJAKAN_KEBIJAKAN} <Text style={s.gayaTautan}>Baca dan terima</Text>
            </Text>
          </Pressable>
        ) : null}

        {pesan.map((m) => (
          <View key={m.id} style={m.dari === 'pengguna' ? s.barisKanan : s.barisKiri}>
            <View style={m.dari === 'pengguna' ? s.gelembungPengguna : s.gelembungBot}>
              <Text style={m.dari === 'pengguna' ? s.teksPengguna : s.teksBot}>{m.teks}</Text>
            </View>
            {m.tautan ? (
              <View style={s.tautan}>
                <Tombol label={m.tautan.label} varian="garis" kecil onPress={() => router.push(m.tautan!.href)} />
              </View>
            ) : null}
          </View>
        ))}

        {mengetik ? (
          <View style={s.barisKiri}>
            <View style={s.gelembungBot}>
              <Text style={s.mengetik}>LANJUT sedang mengetik…</Text>
            </View>
          </View>
        ) : null}
      </ScrollView>

      <View style={s.masukan}>
        <TextInput
          value={draf}
          onChangeText={setDraf}
          onKeyPress={tekanTombol}
          placeholder="Tulis pesanmu…"
          placeholderTextColor={color.textSubtle}
          onFocus={() => setFokus(true)}
          onBlur={() => setFokus(false)}
          multiline
          numberOfLines={1}
          maxLength={PANJANG_MAKS}
          style={StyleSheet.flatten([s.input, fokus && s.inputFokus])}
          accessibilityLabel="Pesan"
        />
        <Pressable
          onPress={kirim}
          disabled={!bisaKirim}
          accessibilityRole="button"
          accessibilityLabel="Kirim"
          aria-disabled={!bisaKirim}
          style={({ pressed }) =>
            StyleSheet.flatten([s.kirim, !bisaKirim && s.kirimMati, pressed && bisaKirim && s.kirimTekan])
          }
        >
          <Ikon nama="panah" ukuran={22} warna={color.white} tebal={2.5} />
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const s = StyleSheet.create({
  akar: { flex: 1 },
  uji: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.s2,
    marginHorizontal: spacing.gutter,
    marginTop: spacing.s3,
    padding: spacing.s3,
    borderRadius: radius.sm,
    backgroundColor: color.blue100,
  },
  ujiTeks: { ...teks.bodySm, color: color.textBody, flex: 1 },
  ujiTebal: { fontFamily: font.semibold },
  daftar: { flex: 1 },
  daftarIsi: { padding: spacing.gutter, gap: spacing.s3 },
  gaya: { alignSelf: 'center', paddingVertical: spacing.s1, minHeight: 44, justifyContent: 'center' },
  gayaTeks: { ...teks.caption, color: color.textMuted, textAlign: 'center' },
  gayaTautan: { color: color.textLink, fontFamily: font.semibold, textDecorationLine: 'underline' },
  barisKiri: { alignItems: 'flex-start', gap: spacing.s2 },
  barisKanan: { alignItems: 'flex-end' },
  gelembungBot: {
    maxWidth: '85%',
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s4,
    borderRadius: radius.md,
    borderTopLeftRadius: spacing.s1,
    backgroundColor: color.surfaceSoft,
  },
  gelembungPengguna: {
    maxWidth: '85%',
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s4,
    borderRadius: radius.md,
    borderTopRightRadius: spacing.s1,
    backgroundColor: color.blue600,
  },
  teksBot: { ...teks.bodySm, color: color.textBody },
  teksPengguna: { ...teks.bodySm, color: color.white },
  mengetik: { ...teks.bodySm, color: color.textMuted, fontStyle: 'italic' },
  tautan: { flexDirection: 'row' },
  masukan: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.s2,
    paddingHorizontal: spacing.gutter,
    paddingVertical: spacing.s3,
    borderTopWidth: 1,
    borderTopColor: color.borderHairline,
    backgroundColor: color.white,
    width: '100%',
    maxWidth: layout.lebarMaks,
    alignSelf: 'center',
  },
  input: {
    flex: 1,
    minHeight: 44,
    maxHeight: 120,
    paddingHorizontal: spacing.s4,
    paddingVertical: 10,
    fontFamily: font.regular,
    fontSize: 16,
    lineHeight: 22,
    color: color.ink900,
    backgroundColor: color.white,
    borderWidth: 1,
    borderColor: color.borderSoft,
    borderRadius: radius.lg,
    outlineWidth: 0,
  },
  // Sama dengan `inputFokus` di auth/AuthUI.tsx (padanan .input:focus di PWA).
  inputFokus: { borderColor: color.blue400, outlineWidth: 3, outlineStyle: 'solid', outlineColor: color.focusRing },
  kirim: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    backgroundColor: color.blue600,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kirimMati: { backgroundColor: color.ink300 },
  kirimTekan: { backgroundColor: color.textMuted },
});
