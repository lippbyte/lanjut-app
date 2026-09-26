import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import { useAuth } from '../../../hooks/useAuth';
import { AuthLayout, Field, Input, PesanGalat, TautanBawah, TombolUtama, authStyles } from './AuthUI';

// Salinan teks disamakan dengan MVP-PWA/masuk.html. Setelah sukses tidak ada
// navigasi manual — penjaga di app/(auth)/_layout.tsx yang memindahkan
// pengguna begitu status sesi berubah jadi "masuk".
export function LoginScreen() {
  const router = useRouter();
  const { login, loading, error, medan } = useAuth();
  const [namaPengguna, setNamaPengguna] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [galatLokal, setGalatLokal] = useState<string | null>(null);

  const kirim = () => {
    if (!namaPengguna.trim() || !kataSandi) {
      setGalatLokal('Isi nama pengguna dan kata sandi dulu.');
      return;
    }
    setGalatLokal(null);
    login(namaPengguna.trim(), kataSandi);
  };

  return (
    <AuthLayout judul="Masuk" pengantar="Lanjutkan dengan akun yang sudah kamu buat.">
      <View style={authStyles.form}>
        <Field label="Nama pengguna" galat={medan.nama_pengguna}>
          <Input
            value={namaPengguna}
            onChangeText={setNamaPengguna}
            placeholder="Nama penggunamu"
            autoComplete="username"
            textContentType="username"
            autoFocus
            returnKeyType="next"
          />
        </Field>
        <Field label="Kata sandi" galat={medan.kata_sandi}>
          <Input
            value={kataSandi}
            onChangeText={setKataSandi}
            placeholder="Kata sandimu"
            secureTextEntry
            autoComplete="current-password"
            textContentType="password"
            returnKeyType="go"
            onSubmitEditing={kirim}
          />
        </Field>
        <PesanGalat teks={galatLokal ?? error} />
        <TombolUtama label="Masuk" labelProses="Memeriksa…" proses={loading} onPress={kirim} />
        <TautanBawah teks="Belum punya akun?" tautan="Daftar" onPress={() => router.replace('/daftar')} />
      </View>
    </AuthLayout>
  );
}
