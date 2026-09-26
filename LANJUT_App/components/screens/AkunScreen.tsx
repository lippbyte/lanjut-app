import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import type { Pengguna } from '../../api/auth';
import { useSesi } from '../../providers/AuthProvider';
import { useProdi } from '../../hooks/useProdi';
import { useProgresDaftarPeriksa, useSaringDaftarPeriksa } from '../../hooks/useProgresDaftarPeriksa';
import { color, font, spacing, teks } from '../../theme/tokens';
import { BilahProgres, Kartu, Memuat, Penafian, SeksiJudul, Tombol, gaya } from '../ui';

// "Jalur Saya" (v1.1, LANJUT_004) di atas padanan MVP-PWA/akun.html
// (keadaan "sudah masuk"). Keadaan tamu tidak ada di sini karena layar ini
// hanya bisa dibuka setelah login. Semua isi dibaca dari `pengguna` di
// AuthProvider — hasil GET /auth/saya milik akun yang sedang masuk.
export function AkunScreen() {
  const { pengguna, keluar } = useSesi();
  const [proses, setProses] = useState(false);

  const onKeluar = async () => {
    setProses(true);
    await keluar();
  };

  if (!pengguna) return null;

  return (
    <View style={gaya.layarIsiRapat}>
      <KartuJalur pengguna={pengguna} />

      <SeksiJudul>Kemajuan</SeksiJudul>
      <RingkasanKemajuan />

      <SeksiJudul>Akun</SeksiJudul>
      <Kartu>
        <View style={s.daftar}>
          <Baris label="Nama pengguna" nilai={pengguna.nama_pengguna} />
          <Baris label="Email" nilai={pengguna.email || '—'} />
        </View>
      </Kartu>
      <Penafian>Catatan yang sudah tersimpan ke akunmu tetap ada setelah keluar.</Penafian>
      <Tombol label={proses ? 'Mengeluarkan…' : 'Keluar'} varian="garis" besar penuh proses={proses} onPress={onKeluar} />
    </View>
  );
}

function KartuJalur({ pengguna }: { pengguna: Pengguna }) {
  const { data: daftarProdi } = useProdi();
  const namaProdi = pengguna.prodi_impian
    ? (daftarProdi?.find((p) => p.id === pengguna.prodi_impian)?.nama ?? pengguna.prodi_impian)
    : null;

  return (
    <Kartu>
      <Text style={s.eyebrow}>Jalur Saya</Text>
      <Text style={s.nama}>{pengguna.nama_tampilan}</Text>
      <View style={s.daftar}>
        <Baris label="Kelas" nilai={pengguna.kelas ? `Kelas ${pengguna.kelas}` : null} />
        <Baris label="Target prodi" nilai={namaProdi} />
      </View>
    </Kartu>
  );
}

// X dari Y memakai saringan & hitungan yang sama dengan layar Daftar
// Periksa (useProgresDaftarPeriksa), jadi angkanya selalu cocok.
function RingkasanKemajuan() {
  const router = useRouter();
  const { kelas, jalur, isPending: saringMemuat } = useSaringDaftarPeriksa();
  const hasil = useProgresDaftarPeriksa(kelas, jalur);
  const bukaDaftarPeriksa = () => router.push('/daftar-periksa');

  let isi: React.ReactNode;
  if (saringMemuat || hasil.isPending) {
    isi = <Memuat />;
  } else if (!hasil.siap) {
    isi = <Text style={gaya.teksKecil}>Pilih kelas dan jalurmu di Daftar Periksa untuk melihat kemajuanmu.</Text>;
  } else if (hasil.isError || !hasil.data) {
    isi = <Text style={gaya.teksKecil}>Kemajuan belum bisa dimuat. Coba lagi sebentar lagi.</Text>;
  } else {
    const { selesai, total } = hasil.data.progres;
    isi = (
      <>
        <Text style={s.angka}>
          {selesai} dari {total} langkah Daftar Periksa selesai
        </Text>
        <BilahProgres selesai={selesai} total={total} label="Kemajuan daftar periksa" />
        <Text style={s.label}>
          Kelas {kelas} · {jalur}
        </Text>
      </>
    );
  }

  return (
    <Kartu style={s.kemajuan}>
      {isi}
      <Tombol label="Buka Daftar Periksa" varian="sekunder" kecil onPress={bukaDaftarPeriksa} />
    </Kartu>
  );
}

/** `nilai` null → "Belum diisi" dengan gaya redup, bukan teks kosong. */
function Baris({ label, nilai }: { label: string; nilai: string | null }) {
  return (
    <View style={s.baris}>
      <Text style={s.label}>{label}</Text>
      <Text style={nilai ? s.nilai : s.nilaiKosong} numberOfLines={2}>
        {nilai ?? 'Belum diisi'}
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
  kemajuan: { gap: spacing.s3 },
  angka: { ...teks.body, fontFamily: font.semibold, color: color.textBody },
  nilaiKosong:{ ...teks.bodySm, fontStyle: 'italic', color: color.textMuted, flexShrink: 1, textAlign: 'right' },
});
