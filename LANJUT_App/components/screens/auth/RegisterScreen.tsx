import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View } from 'react-native';

import type { DataDaftar } from '../../../api/auth';
import { useAuth } from '../../../hooks/useAuth';
import {
  JENIS_SEKOLAH_MENENGAH,
  KELAS_OPSI,
  LABEL_JENIS_SEKOLAH,
  tanyaJenisSekolah,
  type JenisSekolahMenengah,
  type Kelas,
} from '../../../lib/jenjang';
import {
  AuthLayout,
  BELUM,
  DaftarOpsi,
  Field,
  Input,
  Keterangan,
  OpsiPil,
  PesanGalat,
  PilihProdi,
  TautanBawah,
  TombolUtama,
  authStyles,
} from './AuthUI';

// Aturan disalin dari server/src/modul/auth/auth.skema.js supaya kesalahan
// umum tertangkap sebelum dikirim; server tetap sumber kebenaran.
const NAMA_PENGGUNA_REGEX = /^[a-z0-9._]{3,32}$/;

// Disetujui Khalifa 28 Sep 2026 (salinan-teks-lanjut.md §4.10). Pakai persis —
// jangan menambah janji ("tidak dibagikan", "aman") atau klaim hukum. Tinjau
// ulang bila ada fitur AI, analitik, atau perubahan penyimpanan data.
const KALIMAT_DATA_PRIBADI =
  'Kami menyimpan nama pengguna, nama tampilan, email (kalau kamu isi), kelas, prodi impian, dan centang Daftar Periksamu untuk menjalankan LANJUT, yaitu menampilkan jalur dan kemajuanmu.';

// Medan & salinan teks mengikuti MVP-PWA/daftar.html: nama pengguna, email
// (opsional), kata sandi, prodi impian (wajib, "belum" jawaban sah).
// Kelas (LANJUT_035) wajib di form ini: menentukan apakah Linimasa, Daftar
// Periksa, dan Cek Posisi tampil (kelas 12) atau placeholder (7–11).
export function RegisterScreen() {
  const router = useRouter();
  const { register, loading, error, medan } = useAuth();

  const [namaPengguna, setNamaPengguna] = useState('');
  const [email, setEmail] = useState('');
  const [kataSandi, setKataSandi] = useState('');
  const [kelas, setKelas] = useState<Kelas | null>(null);
  // LANJUT_038: hanya ditanya & dikirim untuk kelas 10–12; kelas 7–9 → SMP di server.
  const [jenis, setJenis] = useState<JenisSekolahMenengah | null>(null);
  const tanyaJenis = tanyaJenisSekolah(kelas);
  const [prodi, setProdi] = useState<string | null>(null);
  const [galatLokal, setGalatLokal] = useState<Record<string, string>>({});

  const kirim = () => {
    const nama = namaPengguna.trim().toLowerCase();
    const cek: Record<string, string> = {};
    if (!NAMA_PENGGUNA_REGEX.test(nama)) {
      cek.nama_pengguna = '3–32 karakter, hanya huruf kecil, angka, titik, dan garis bawah.';
    }
    if (kataSandi.length < 8) cek.kata_sandi = 'Kata sandi minimal 8 karakter.';
    if (!kelas) cek.kelas = 'Pilih kelasmu.';
    if (tanyaJenis && !jenis) cek.jenis_sekolah = 'Pilih jenis sekolahmu.';
    if (!prodi) cek.prodi_impian = 'Pilih prodi, atau "Belum, aku belum tahu".';
    setGalatLokal(cek);
    if (Object.keys(cek).length || !kelas) return;

    const data: DataDaftar = { nama_pengguna: nama, kata_sandi: kataSandi, kelas };
    if (tanyaJenis && jenis) data.jenis_sekolah = jenis;
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
        <Field label="Kelas" hint="SMP kelas 7–9, SMA/SMK kelas 10–12." galat={galat('kelas')}>
          <DaftarOpsi>
            {KELAS_OPSI.map((k) => (
              <OpsiPil key={k} label={`Kelas ${k}`} aktif={kelas === k} onPress={() => setKelas(k)} />
            ))}
          </DaftarOpsi>
        </Field>
        {tanyaJenis ? (
          <Field label="Jenis sekolah" galat={galat('jenis_sekolah')}>
            <DaftarOpsi>
              {JENIS_SEKOLAH_MENENGAH.map((j) => (
                <OpsiPil key={j} label={LABEL_JENIS_SEKOLAH[j]} aktif={jenis === j} onPress={() => setJenis(j)} />
              ))}
            </DaftarOpsi>
          </Field>
        ) : null}
        <Field label="Prodi impian" hint="Boleh dijawab “belum”." galat={galat('prodi_impian')}>
          <PilihProdi nilai={prodi} onPilih={setProdi} />
        </Field>
        <PesanGalat teks={error} />
        <TombolUtama label="Daftar" labelProses="Mendaftarkan…" proses={loading} onPress={kirim} />
        <Keterangan>{KALIMAT_DATA_PRIBADI}</Keterangan>
        <TautanBawah teks="Sudah punya akun?" tautan="Masuk" onPress={() => router.replace('/masuk')} />
      </View>
    </AuthLayout>
  );
}
