import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { pesanUntuk } from '../../api/auth';
import { useProfilLokal } from '../../hooks/useProfilLokal';
import { useSaringDaftarPeriksa } from '../../hooks/useProgresDaftarPeriksa';
import { useUbahProfil } from '../../hooks/useUbahProfil';
import { KELAS_OPSI, type Kelas } from '../../lib/jenjang';
import { useSesi } from '../../providers/AuthProvider';
import { spacing } from '../../theme/tokens';
import { Tombol } from '../ui';
import { AuthLayout, DaftarOpsi, Field, Keterangan, OpsiPil, PesanGalat, TombolUtama, authStyles } from './auth/AuthUI';

const adalahKelas = (k: string | null | undefined): k is Kelas => !!k && (KELAS_OPSI as readonly string[]).includes(k);

/**
 * Gerbang wajib isi kelas (LANJUT_036) — dirender oleh app/(app)/_layout.tsx
 * menggantikan seluruh app selama kelas AKUN kosong (akun lama dari sebelum
 * form Daftar menanyakan kelas). Tidak ada tab bar, jadi tidak ada jalan ke
 * layar lain selain menyimpan kelas, membuka Jalur Saya, atau keluar.
 *
 * Kelas yang dulu dipilih di Daftar Periksa (tersimpan di perangkat) hanya
 * jadi usulan terpilih — siswa tetap harus menekan Simpan sendiri.
 *
 * TEKS DRAF, belum disetujui Khalifa (salinan §4.12).
 */
export function IsiKelasScreen() {
  const router = useRouter();
  const { keluar } = useSesi();
  const simpan = useUbahProfil();
  const { pilih: setSaringan } = useSaringDaftarPeriksa();
  const profilLokal = useProfilLokal();
  const [pilihan, setPilihan] = useState<Kelas | null>(null);
  const [galat, setGalat] = useState<string | null>(null);
  const [mengeluarkan, setMengeluarkan] = useState(false);

  const usulan = adalahKelas(profilLokal.data?.kelas) ? profilLokal.data.kelas : null;
  const kelas = pilihan ?? usulan;

  const kirim = () => {
    if (!kelas) return setGalat('Pilih kelasmu.');
    setGalat(null);
    simpan.mutate(
      { kelas },
      {
        // Pengguna di AuthProvider sudah berkelas → layout melepas gerbang.
        // Kelas di perangkat ikut diganti, sama seperti simpan di Jalur Saya.
        onSuccess: () => {
          setSaringan({ kelas });
          router.replace('/linimasa');
        },
      }
    );
  };

  const onKeluar = async () => {
    setMengeluarkan(true);
    await keluar();
  };

  return (
    <AuthLayout
      judul="Kamu kelas berapa sekarang?"
      pengantar="Isi sekali ini saja supaya LANJUT menampilkan yang sesuai buat kamu. Nanti bisa diubah di Jalur Saya."
    >
      <View style={authStyles.form}>
        <Field label="Kelas" hint="SMP kelas 7–9, SMA/SMK kelas 10–12." galat={galat ?? undefined}>
          <DaftarOpsi>
            {KELAS_OPSI.map((k) => (
              <OpsiPil
                key={k}
                label={`Kelas ${k}`}
                aktif={kelas === k}
                onPress={() => {
                  setPilihan(k);
                  setGalat(null);
                }}
              />
            ))}
          </DaftarOpsi>
        </Field>
        {usulan && !pilihan ? (
          <Keterangan>Terpilih dari pilihanmu sebelumnya di Daftar Periksa. Cek lagi sebelum menyimpan.</Keterangan>
        ) : null}
        <PesanGalat teks={simpan.isError ? pesanUntuk(simpan.error) : null} />
        <TombolUtama label="Simpan dan lanjut" labelProses="Menyimpan…" proses={simpan.isPending} onPress={kirim} />
        <View style={s.lain}>
          <Tombol label="Buka Jalur Saya" varian="hantu" onPress={() => router.push('/akun')} />
          <Tombol label={mengeluarkan ? 'Mengeluarkan…' : 'Keluar'} varian="garis" proses={mengeluarkan} onPress={onKeluar} />
        </View>
      </View>
    </AuthLayout>
  );
}

const s = StyleSheet.create({
  lain: { gap: spacing.s2, alignItems: 'center' },
});
