import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { useSesi } from '../../providers/AuthProvider';
import { useProdi } from '../../hooks/useProdi';
import { color, font, spacing, teks } from '../../theme/tokens';
import { Kartu, Penafian, Tombol, gaya } from '../ui';

// Padanan MVP-PWA/akun.html (keadaan "sudah masuk"). Keadaan tamu tidak
// ada di sini karena layar ini hanya bisa dibuka setelah login.
export function AkunScreen() {
  const { pengguna, keluar } = useSesi();
  const { data: daftarProdi } = useProdi();
  const [proses, setProses] = useState(false);

  const namaProdi = pengguna?.prodi_impian
    ? (daftarProdi?.find((p) => p.id === pengguna.prodi_impian)?.nama ?? pengguna.prodi_impian)
    : 'Belum ditentukan';

  const onKeluar = async () => {
    setProses(true);
    await keluar();
  };

  return (
    <View style={gaya.layarIsiRapat}>
      <Kartu>
        <Text style={s.eyebrow}>Masuk sebagai</Text>
        <Text style={s.nama}>{pengguna?.nama_pengguna ?? '—'}</Text>
        <View style={s.daftar}>
          <Baris label="Email" nilai={pengguna?.email || '—'} />
          <Baris label="Kelas" nilai={pengguna?.kelas ? `Kelas ${pengguna.kelas}` : '—'} />
          <Baris label="Prodi impian" nilai={namaProdi} />
        </View>
      </Kartu>
      <Penafian>Catatan yang sudah tersimpan ke akunmu tetap ada setelah keluar.</Penafian>
      <Tombol label={proses ? 'Mengeluarkan…' : 'Keluar'} varian="garis" besar penuh proses={proses} onPress={onKeluar} />
    </View>
  );
}

function Baris({ label, nilai }: { label: string; nilai: string }) {
  return (
    <View style={s.baris}>
      <Text style={s.label}>{label}</Text>
      <Text style={s.nilai} numberOfLines={2}>
        {nilai}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  // .eyebrow
  eyebrow: { ...teks.label, color: color.blue600 },
  nama: { ...teks.h3, color: color.textBody, marginTop: spacing.s1 },
  daftar: { gap: spacing.s3, marginTop: spacing.s4 },
  baris: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.s3 },
  label: { ...teks.caption, color: color.textMuted },
  nilai: { ...teks.bodySm, fontFamily: font.medium, color: color.textBody, flexShrink: 1, textAlign: 'right' },
});
