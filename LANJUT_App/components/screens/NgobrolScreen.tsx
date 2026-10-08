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

import type { KartuBantuan } from '../../api/types';
import { useKartuBantuan } from '../../hooks/useKartuBantuan';
import { usePersetujuan } from '../../hooks/usePersetujuan';
import { labelGayaBelajar } from '../../lib/gayaBelajar';
import { keadaanKebijakan } from '../../lib/kebijakanPrivasi';
import { PANJANG_PESAN_MAKS, TEKS_NGOBROL } from '../../lib/ngobrol';
import { useSesi } from '../../providers/AuthProvider';
import { useObrolan } from '../../providers/ObrolanProvider';
import { color, font, layout, radius, spacing, teks } from '../../theme/tokens';
import { Ikon, Memuat, Peringatan, Tombol } from '../ui';

// Salinan teks §4.14 (LANJUT_048) — DRAF. Tampil di layar terkunci bila kebijakan belum diterima.
const AJAKAN_KEBIJAKAN = 'Terima kebijakan privasi dulu supaya fitur AI bisa diaktifkan nanti.';

/**
 * Ngobrol Bareng LANJUT (LANJUT_032; AI lewat server sejak LANJUT_051).
 *
 * Balasan dari POST /ngobrol (server → OpenRouter). Boleh-tidaknya AI dipakai
 * SELALU diputuskan server (bolehPakaiAi); `boleh_pakai_ai` di sini hanya
 * untuk memilih tampilan: obrolan, atau penjelasan kenapa fitur belum aktif.
 * Riwayat hanya di memori (ObrolanProvider), tidak disimpan di perangkat
 * maupun server.
 */
export function NgobrolScreen() {
  const { data: persetujuan, isPending, isError } = usePersetujuan();

  if (isPending) return <Memuat />;
  if (isError || !persetujuan) {
    return (
      <View style={s.terkunci}>
        <Peringatan>{TEKS_NGOBROL.belumBisaDimuat}</Peringatan>
      </View>
    );
  }
  if (!persetujuan.boleh_pakai_ai) return <Terkunci />;
  return <Obrolan />;
}

/** Fitur AI belum aktif: jelaskan syaratnya, tanpa kotak tulis. Kartu bantuan tetap bisa dibuka. */
function Terkunci() {
  const router = useRouter();
  const { data: persetujuan } = usePersetujuan();
  const keadaan = persetujuan ? keadaanKebijakan(persetujuan) : null;
  const ajakKebijakan = keadaan === 'bisa_diterima' || keadaan === 'versi_app_berbeda';
  return (
    <ScrollView contentContainerStyle={s.terkunci}>
      <Peringatan judul={TEKS_NGOBROL.terkunciJudul}>{TEKS_NGOBROL.terkunciIsi}</Peringatan>
      {ajakKebijakan ? (
        <Pressable onPress={() => router.push('/terima-kebijakan')} style={s.gaya} accessibilityRole="link">
          <Text style={s.gayaTeks}>
            {AJAKAN_KEBIJAKAN} <Text style={s.gayaTautan}>Baca dan terima</Text>
          </Text>
        </Pressable>
      ) : null}
      <PanelBantuan />
    </ScrollView>
  );
}

/** Kartu layanan bantuan dari server (LANJUT_053). Isinya tidak pernah ditulis AI. */
function KartuBantuanView({ kartu }: { kartu: KartuBantuan }) {
  return (
    <View style={s.kartu} role="note" aria-label={kartu.judul}>
      <Text style={s.kartuJudul}>{kartu.judul}</Text>
      {kartu.layanan.map((l) => (
        <View key={l.nama} style={s.kartuLayanan}>
          <Text style={s.kartuNama}>{l.nama}</Text>
          <Text style={s.kartuNomor} selectable>
            {l.nomor_atau_alamat}
          </Text>
          <Text style={s.kartuKeterangan}>{l.keterangan}</Text>
        </View>
      ))}
      <Text style={s.kartuKeterangan}>{kartu.penutup}</Text>
    </View>
  );
}

/** Tautan "Butuh bicara dengan orang?" yang selalu ada; kartu dimuat dari server saat dibuka. */
function PanelBantuan() {
  const [buka, setBuka] = useState(false);
  const { data: kartu, isError } = useKartuBantuan(buka);
  return (
    <View style={s.panelBantuan}>
      <Pressable onPress={() => setBuka((b) => !b)} style={s.gaya} accessibilityRole="button" aria-expanded={buka}>
        <Text style={s.gayaTeks}>
          <Text style={s.gayaTautan}>{buka ? TEKS_NGOBROL.sembunyikanBantuan : TEKS_NGOBROL.tautanBantuan}</Text>
        </Text>
      </Pressable>
      {buka ? kartu ? <KartuBantuanView kartu={kartu} /> : isError ? <Peringatan>{TEKS_NGOBROL.kartuGagalDimuat}</Peringatan> : <Memuat /> : null}
    </View>
  );
}

function Obrolan() {
  const { pengguna } = useSesi();
  const { pesan, mengetik, kirim: kirimPesan, cobaLagi } = useObrolan();
  const router = useRouter();
  const gulir = useRef<ScrollView>(null);
  const [draf, setDraf] = useState('');
  const [fokus, setFokus] = useState(false);

  const labelGaya = labelGayaBelajar(pengguna?.gaya_belajar ?? null);

  const kirim = () => {
    const isi = draf.trim();
    if (!isi || mengetik) return;
    setDraf('');
    kirimPesan(isi);
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
  const terakhir = pesan[pesan.length - 1];

  return (
    <KeyboardAvoidingView style={s.akar} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        ref={gulir}
        style={s.daftar}
        contentContainerStyle={s.daftarIsi}
        keyboardShouldPersistTaps="handled"
        onContentSizeChange={() => gulir.current?.scrollToEnd({ animated: true })}
        aria-live="polite"
      >
        <Text style={s.catatan}>{TEKS_NGOBROL.catatanAi}</Text>
        <Text style={s.catatan}>{TEKS_NGOBROL.peringatanDataPribadi}</Text>

        <PanelBantuan />

        <Pressable onPress={() => router.push('/gaya-belajar')} style={s.gaya} accessibilityRole="link">
          <Text style={s.gayaTeks}>
            {labelGaya ? `Gaya belajarmu: ${labelGaya}` : 'Gaya belajarmu belum dipilih'} ·{' '}
            <Text style={s.gayaTautan}>{labelGaya ? 'Ubah' : 'Atur'}</Text>
          </Text>
        </Pressable>

        {pesan.map((m) =>
          m.dari === 'galat' ? (
            <View key={m.id} style={s.barisKiri} role="alert">
              <View style={s.gelembungGalat}>
                <Text style={s.teksGalat}>{m.teks}</Text>
              </View>
              {m === terakhir && !mengetik ? (
                <View style={s.tautan}>
                  <Tombol label={TEKS_NGOBROL.cobaLagi} varian="garis" kecil onPress={cobaLagi} />
                </View>
              ) : null}
            </View>
          ) : (
            <View key={m.id} style={m.dari === 'pengguna' ? s.barisKanan : s.barisKiri}>
              {m.ujiCoba ? <Text style={s.labelUjiCoba}>{TEKS_NGOBROL.labelUjiCoba}</Text> : null}
              <View style={m.dari === 'pengguna' ? s.gelembungPengguna : s.gelembungBot}>
                <Text style={m.dari === 'pengguna' ? s.teksPengguna : s.teksBot} selectable>
                  {m.teks}
                </Text>
              </View>
              {m.disamarkan ? <Text style={s.disamarkan}>{TEKS_NGOBROL.dataDisamarkan}</Text> : null}
              {m.kartu ? <KartuBantuanView kartu={m.kartu} /> : null}
            </View>
          )
        )}

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
          placeholder={TEKS_NGOBROL.placeholder}
          placeholderTextColor={color.textSubtle}
          onFocus={() => setFokus(true)}
          onBlur={() => setFokus(false)}
          multiline
          numberOfLines={1}
          maxLength={PANJANG_PESAN_MAKS}
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
  terkunci: { padding: spacing.gutter, gap: spacing.s3 },
  catatan: { ...teks.caption, color: color.textMuted, textAlign: 'center' },
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
  gelembungGalat: {
    maxWidth: '85%',
    paddingVertical: spacing.s3,
    paddingHorizontal: spacing.s4,
    borderRadius: radius.md,
    borderTopLeftRadius: spacing.s1,
    borderWidth: 1,
    borderColor: color.borderSoft,
    backgroundColor: color.statusIdleBg,
  },
  // LANJUT_053 — kartu bantuan, label uji coba, penanda disamarkan.
  panelBantuan: { gap: spacing.s2 },
  kartu: {
    width: '100%',
    gap: spacing.s3,
    padding: spacing.s4,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.borderBrand,
    backgroundColor: color.white,
  },
  kartuJudul: { ...teks.bodySm, fontFamily: font.semibold, color: color.ink900 },
  kartuLayanan: { gap: 2 },
  kartuNama: { ...teks.bodySm, fontFamily: font.semibold, color: color.textBody },
  kartuNomor: { ...teks.bodySm, color: color.textLink, fontFamily: font.semibold },
  kartuKeterangan: { ...teks.caption, color: color.textMuted },
  labelUjiCoba: { ...teks.caption, color: color.textMuted, fontFamily: font.semibold },
  disamarkan: { ...teks.caption, color: color.textMuted, maxWidth: '85%', textAlign: 'right' },
  teksBot: { ...teks.bodySm, color: color.textBody },
  teksPengguna: { ...teks.bodySm, color: color.white },
  teksGalat: { ...teks.bodySm, color: color.textMuted },
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
