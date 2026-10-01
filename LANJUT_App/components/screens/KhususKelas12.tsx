import React from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { untukKelas12 } from '../../lib/jenjang';
import { useSesi } from '../../providers/AuthProvider';
import { spacing } from '../../theme/tokens';
import { Kartu, Kosong, Tombol } from '../ui';

/** true kalau kelas akun = 12 (lib/jenjang.ts). Berubah langsung saat kelas diubah di Jalur Saya. */
export function useUntukKelas12(): boolean {
  const { pengguna } = useSesi();
  return untukKelas12(pengguna?.kelas);
}

/**
 * Gerbang LANJUT_035 untuk Linimasa, Daftar Periksa, dan Cek Posisi: kelas 12
 * → `children` apa adanya (tidak berubah dari sebelumnya); selain itu →
 * placeholder. `children` tidak dirender sama sekali untuk non-12, jadi
 * tanggal/hitungan SNBP-SNBT-TKA di dalamnya tidak pernah diambil maupun tampil.
 */
export function KhususKelas12({ children }: { children: React.ReactNode }) {
  return useUntukKelas12() ? <>{children}</> : <BukanKelas12 />;
}

/**
 * Placeholder fungsional — TEKS DRAF, belum disetujui Khalifa (salinan §4.11).
 * Konten pengganti untuk kelas 7–11 belum didesain; tombolnya menuju halaman
 * Khusus SMK yang nanti digeneralisasi jadi hub semua jenjang.
 */
export function BukanKelas12() {
  const router = useRouter();
  const { pengguna } = useSesi();
  const kelas = pengguna?.kelas ?? null;
  const keKhusus = () => router.push('/khusus-smk');

  return (
    <Kartu>
      {kelas ? (
        <Kosong
          judul="Bagian ini untuk kelas 12."
          teks={`Isinya jadwal dan persiapan SNBP, SNBT, dan TKA. Versi untuk kelas ${kelas} sedang kami siapkan.`}
          aksi={<Tombol label="Buka Khusus SMK" varian="sekunder" onPress={keKhusus} />}
        />
      ) : (
        <Kosong
          judul="Isi kelasmu dulu."
          teks="Isi bagian ini menyesuaikan kelasmu. Isi kelas di Jalur Saya, ya."
          aksi={
            <View style={s.aksi}>
              <Tombol label="Isi kelas di Jalur Saya" varian="sekunder" onPress={() => router.push('/akun')} />
              <Tombol label="Buka Khusus SMK" varian="hantu" onPress={keKhusus} />
            </View>
          }
        />
      )}
    </Kartu>
  );
}

const s = StyleSheet.create({
  aksi: { gap: spacing.s2, alignItems: 'center' },
});
