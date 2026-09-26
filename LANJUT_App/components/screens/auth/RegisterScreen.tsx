import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import type { DataDaftar } from '../../../api/auth';
import { useAuth } from '../../../hooks/useAuth';
import {
  AuthLayout,
  BELUM,
  Field,
  Input,
  PesanGalat,
  PilihProdi,
  TautanBawah,
  TombolUtama,
  authStyles,
} from './AuthUI';

// Aturan disalin dari server/src/modul/auth/auth.skema.js supaya kesalahan
// umum tertangkap sebelum dikirim; server tetap sumber kebenaran.
const NAMA_PENGGUNA_REGEX = /^[a-z0-9._]{3,32}$/;

// Medan & salinan teks mengikuti MVP-PWA/daftar.html: nama pengguna, email
// (opsional), kata sandi, prodi impian (wajib, "belum" jawaban sah).
export function RegisterScreen() {
  const router = useRouter();
  const { register, loading, error, medan } = useAuth();

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
          <PilihProdi nilai={prodi} onPilih={setProdi} />
        </Field>
        <PesanGalat teks={error} />
        <TombolUtama label="Daftar" labelProses="Mendaftarkan…" proses={loading} onPress={kirim} />
        <TautanBawah teks="Sudah punya akun?" tautan="Masuk" onPress={() => router.replace('/masuk')} />
      </View>
    </AuthLayout>
  );
}
