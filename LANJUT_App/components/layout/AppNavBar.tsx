import React from 'react';
import { Nav } from '@expo/html-elements';
import { Link, usePathname } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { color, spacing } from '../../theme/tokens';

// Urutan & label 5 rute P0 disalin persis dari docs/prd-sdd-lanjut.md Bagian 6
// (F1–F5), bukan disusun ulang — supaya siapa pun bisa mencocokkan langsung ke PRD.
const ROUTES = [
  { href: '/linimasa', label: 'Linimasa' },
  { href: '/khusus-smk', label: 'Khusus SMK' },
  { href: '/pilih-mapel', label: 'Pilih Mapel' },
  { href: '/cerita-alumni', label: 'Cerita Alumni' },
  { href: '/daftar-periksa', label: 'Daftar Periksa' },
] as const;

/**
 * Nav lima-halaman P0. Dipakai `<Link asChild>` dari expo-router (bukan
 * onPress + router.push manual) supaya keluaran di web betul-betul jadi
 * elemen <a href> yang bisa dibuka di tab baru / disalin tautannya, bukan
 * navigasi JavaScript yang hanya jalan lewat klik.
 */
export function AppNavBar() {
  const pathname = usePathname();

  return (
    <Nav style={styles.nav}>
      {ROUTES.map((route) => {
        const aktif = pathname === route.href;
        return (
          <Link key={route.href} href={route.href} asChild>
            {/* expo-router clona <Slot>/<Link asChild> tidak menerima array
                style (lihat galat "You are passing an array of styles to a
                child of <Slot>") — di-flatten di sini, bukan diubah jadi
                objek tunggal di styles, supaya kombinasi kondisional
                aktif/tidak tetap terbaca sebagai dua token terpisah. */}
            <Pressable style={StyleSheet.flatten([styles.tautan, aktif && styles.tautanAktif])}>
              <Text style={StyleSheet.flatten([styles.label, aktif && styles.labelAktif])}>{route.label}</Text>
            </Pressable>
          </Link>
        );
      })}
    </Nav>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s1,
  },
  tautan: {
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s3,
    borderRadius: 999,
  },
  tautanAktif: {
    backgroundColor: color.blue400,
  },
  label: {
    color: color.white,
    fontSize: 13,
  },
  labelAktif: {
    fontWeight: '700',
  },
});
