import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import type { DataDaftar } from '../../../api/auth';
import { useAuth } from '../../../hooks/useAuth';
import { useProdi } from '../../../hooks/useProdi';
import { color, radius, spacing, typography } from '../../../theme/tokens';
import { AuthLayout, Field, Input, PesanGalat, TautanBawah, TombolUtama, authStyles } from './AuthUI';

// Aturan disalin dari server/src/modul/auth/auth.skema.js supaya kesalahan
// umum tertangkap sebelum dikirim; server tetap sumber kebenaran.
const NAMA_PENGGUNA_REGEX = /^[a-z0-9._]{3,32}$/;
const BELUM = 'belum';

// Medan & salinan teks mengikuti MVP-PWA/daftar.html: nama pengguna, email
// (opsional), kata sandi, prodi impian (wajib, "belum" jawaban sah).
export function RegisterScreen() {
  const router = useRouter();
  const { register, loading, error, medan } = useAuth();
  const prodiQuery = useProdi();

  const [namaPengguna, setNamaPengguna] = useState('');
  const [email, setEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [prodi, setProdi] = useState<string | null>(null);
  const [galatLokal, setGalatLokal] = useState<Record<string, string>>({});

  const kirim = () => {
    const nama = namaPengguna.trim().toLowerCase();
    const cek: Record<string, string> = {};
    if (!NAMA_PENGGUNA_REGEX.test(nama)) {
      cek.nama_pengguna = '3–32 karakter, hanya huruf kecil, angka, titik, dan garis bawah.';
    }
    if (kataSandi.length < 8) cek.kata_sandi = 'Kata sandi minimal 8 karakter.';
    if (!prodi) cek.prodi_impian = 'Pilih prodi, atau "Belum, aku belum tahu".';
    setGalatLokal(cek);
    if (Object.keys(cek).length) return;

    const data: DataDaftar = { nama_pengguna: nama, kata_sandi: kataSandi };
    if (email.trim()) data.email = email.trim();
    if (prodi && prodi !== BELUM) data.prodi_impian = prodi;
    register(data);
  };

  const galat = (kunci: string) => galatLokal[kunci] ?? medan[kunci];

  return (
    <AuthLayout judul="Buat akun" pengantar="Simpan kemajuanmu supaya tidak hilang saat ganti HP.">
      <View style={authStyles.form}>
        <Field
          label="Nama pengguna"
          hint="3–32 karakter: huruf, angka, titik, atau garis bawah."
          galat={galat('nama_pengguna')}
        >
          <Input
            value={namaPengguna}
            onChangeText={setNamaPengguna}
            placeholder="mis. budi.smk12"
            autoComplete="username"
            textContentType="username"
            maxLength={32}
          />
        </Field>
        <Field label="Email" labelTambahan="(boleh dikosongkan)" galat={galat('email')}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="nama@contoh.com"
            keyboardType="email-address"
            autoComplete="email"
            textContentType="emailAddress"
          />
        </Field>
        <Field label="Kata sandi" hint="Minimal 8 karakter." galat={galat('kata_sandi')}>
          <Input
            value={kataSandi}
            onChangeText={setKataSandi}
            placeholder="Minimal 8 karakter"
            secureTextEntry
            autoComplete="new-password"
            textContentType="newPassword"
          />
        </Field>
        <Field label="Prodi impian" hint="Boleh dijawab “belum”." galat={galat('prodi_impian')}>
          <View style={styles.opsiDaftar}>
            <OpsiProdi label="Belum, aku belum tahu" aktif={prodi === BELUM} onPress={() => setProdi(BELUM)} />
            {prodiQuery.isPending ? (
              <ActivityIndicator color={color.blue500} />
            ) : prodiQuery.isError ? (
              <Text style={styles.catatan}>Daftar prodi belum bisa dimuat. Kamu tetap bisa memilih “belum”.</Text>
            ) : (
              prodiQuery.data.map((p) => (
                <OpsiProdi key={p.id} label={p.nama} aktif={prodi === p.id} onPress={() => setProdi(p.id)} />
              ))
            )}
          </View>
        </Field>
        <PesanGalat teks={error} />
        <TombolUtama label="Daftar" labelProses="Mendaftarkan…" proses={loading} onPress={kirim} />
        <TautanBawah teks="Sudah punya akun?" tautan="Masuk" onPress={() => router.replace('/masuk')} />
      </View>
    </AuthLayout>
  );
}

function OpsiProdi({ label, aktif, onPress }: { label: string; aktif: boolean; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ checked: aktif }}
      style={StyleSheet.flatten([styles.opsi, aktif && styles.opsiAktif])}
    >
      <Text style={StyleSheet.flatten([styles.opsiTeks, aktif && styles.opsiTeksAktif])}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  opsiDaftar: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.s2 },
  opsi: {
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s3,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.borderSoft,
    backgroundColor: color.white,
  },
  opsiAktif: { backgroundColor: color.blue400, borderColor: color.blue400 },
  opsiTeks: { fontSize: typography.size.bodySm, color: color.ink700 },
  opsiTeksAktif: { color: color.white, fontWeight: typography.weight.semibold },
  catatan: { fontSize: typography.size.caption, color: color.textMuted },
});
