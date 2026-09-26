import React from 'react';
import { Article } from '@expo/html-elements';
import { StyleSheet, Text } from 'react-native';

import { color, radius, spacing, typography } from '../../theme/tokens';

/**
 * Keadaan galat & kosong yang dipakai lebih dari satu layar (F1 Linimasa,
 * F3 Penolong Pilih Mapel, dst.) — ditarik ke satu tempat supaya tidak ada
 * pola baru ditulis ulang untuk hal yang PRD/salinan-teks-lanjut.md sudah
 * punya kalimatnya (DoD PRD §15: "teksnya diambil dari
 * salinan-teks-lanjut.md, bukan ditulis ulang di kode").
 */

// Keadaan galat (gagal fetch API) — teks salinan-teks-lanjut.md §6 "Belum
// ada koneksi internet", pola yang sama dipakai PWA v1 untuk kegagalan
// pemuatan data (lihat app/beranda.html, blok ".peringatan").
export function KeadaanGalat() {
  return (
    <Article style={styles.keadaan}>
      <Text style={styles.keadaanTeks}>
        Sedang tidak tersambung. Yang sudah pernah dibuka masih bisa dilihat.
      </Text>
    </Article>
  );
}

// Keadaan kosong (belum ada data) — teks salinan-teks-lanjut.md §6 "Belum ada data".
export function KeadaanKosong() {
  return (
    <Article style={styles.keadaan}>
      <Text style={styles.keadaanTeks}>
        Bagian ini masih kami siapkan. Kalau kamu punya bahannya, kirim ke kami.
      </Text>
    </Article>
  );
}

const styles = StyleSheet.create({
  keadaan: {
    padding: spacing.s5,
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
  },
  keadaanTeks: {
    color: color.textMuted,
    fontSize: typography.size.body,
    lineHeight: 22,
  },
});
