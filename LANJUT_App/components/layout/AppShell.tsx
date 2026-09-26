import React from 'react';
import { Header, Main, Nav } from '@expo/html-elements';
import { Link, usePathname, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { color, font, layout, radius, shadow, spacing, teks } from '../../theme/tokens';
import { Ikon, type NamaIkon } from '../ui/Ikon';

// Empat tab, tidak pernah lebih — sama dengan .tabbar di MVP-PWA. Cerita
// Alumni & Akun bukan tab: dijangkau dari Beranda / ikon profil, dan saat
// dibuka tab Beranda yang tetap aktif (seperti alumni.html di PWA).
const TAB: { href: '/linimasa' | '/khusus-smk' | '/pilih-mapel' | '/daftar-periksa'; label: string; ikon: NamaIkon }[] = [
  { href: '/linimasa', label: 'Beranda', ikon: 'beranda' },
  { href: '/khusus-smk', label: 'Khusus SMK', ikon: 'smk' },
  { href: '/pilih-mapel', label: 'Pilih Mapel', ikon: 'mapel' },
  { href: '/daftar-periksa', label: 'Checklist', ikon: 'checklist' },
];

// Halaman anak: dapat .pagebar (tombol kembali + judul) di bawah app bar.
const HALAMAN_ANAK: Record<string, string> = {
  '/cerita-alumni': 'Cerita Alumni SMK',
  '/akun': 'Jalur Saya',
};

function tabAktif(pathname: string) {
  if (pathname in HALAMAN_ANAK) return '/linimasa';
  return TAB.find((t) => pathname.startsWith(t.href))?.href ?? '/linimasa';
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const judulAnak = HALAMAN_ANAK[pathname];

  return (
    <View style={s.akar}>
      <AppBar tampilkanProfil={pathname !== '/akun'} />
      {judulAnak ? <PageBar judul={judulAnak} /> : null}
      <Main style={s.main}>
        <ScrollView contentContainerStyle={s.gulir} keyboardShouldPersistTaps="handled">
          <View style={s.kolom}>{children}</View>
        </ScrollView>
      </Main>
      <TabBar aktif={tabAktif(pathname)} />
    </View>
  );
}

/** .appbar — maskot kiri, wordmark tengah, profil kanan. */
function AppBar({ tampilkanProfil }: { tampilkanProfil: boolean }) {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  return (
    <Header style={StyleSheet.flatten([s.appbar, { paddingTop: spacing.s3 + top }])}>
      <Image source={require('../../assets/mascot-blue.png')} style={s.mark} resizeMode="contain" />
      <Image
        source={require('../../assets/lanjut-wordmark.png')}
        style={s.wordmark}
        resizeMode="contain"
        accessibilityLabel="LANJUT"
      />
      {tampilkanProfil ? (
        <Pressable
          onPress={() => router.push('/akun')}
          accessibilityRole="button"
          accessibilityLabel="Profil kamu"
          style={({ pressed }) => StyleSheet.flatten([s.profil, pressed && s.ditekan])}
        >
          <Ikon nama="profil" ukuran={16} />
        </Pressable>
      ) : (
        <View style={s.mark} />
      )}
    </Header>
  );
}

/** .pagebar */
function PageBar({ judul }: { judul: string }) {
  const router = useRouter();
  return (
    <View style={s.pagebar}>
      <Pressable
        onPress={() => (router.canGoBack() ? router.back() : router.replace('/linimasa'))}
        accessibilityRole="button"
        accessibilityLabel="Kembali"
        style={s.kembali}
      >
        <Ikon nama="kembali" ukuran={20} warna={color.ink700} />
      </Pressable>
      <Text style={s.pagebarJudul} role="heading">
        {judul}
      </Text>
    </View>
  );
}

/** .tabbar */
function TabBar({ aktif }: { aktif: string }) {
  const { bottom } = useSafeAreaInsets();
  return (
    <Nav style={StyleSheet.flatten([s.tabbar, { paddingBottom: spacing.s3 + bottom }])}>
      {TAB.map((t) => {
        const sedang = t.href === aktif;
        return (
          // Link asChild tidak meneruskan style berbentuk fungsi di web, jadi statis.
          <Link key={t.href} href={t.href} asChild>
            <Pressable accessibilityRole="link" aria-current={sedang ? 'page' : undefined} style={s.tab}>
              <View style={StyleSheet.flatten([s.tabIkon, sedang && s.tabIkonAktif])}>
                <Ikon nama={t.ikon} warna={sedang ? color.blue600 : color.ink500} />
              </View>
              <Text style={StyleSheet.flatten([s.tabLabel, sedang && s.tabLabelAktif])} numberOfLines={1}>
                {t.label}
              </Text>
            </Pressable>
          </Link>
        );
      })}
    </Nav>
  );
}

const s = StyleSheet.create({
  akar: { flex: 1, backgroundColor: color.surfacePage },
  appbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: spacing.s3,
    paddingHorizontal: spacing.gutter,
    backgroundColor: color.appbarBg,
    borderBottomWidth: 1,
    borderBottomColor: color.appbarBorder,
    boxShadow: shadow.appbar,
    zIndex: 2,
  },
  mark: { width: 32, height: 32 },
  wordmark: { height: 32, width: 93 },
  profil: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadow.s1,
  },
  pagebar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
    paddingVertical: spacing.s1,
    paddingHorizontal: spacing.gutter,
    backgroundColor: color.white,
    borderBottomWidth: 1,
    borderBottomColor: color.borderHairline,
  },
  kembali: { width: 44, height: 44, marginLeft: -spacing.s3, alignItems: 'center', justifyContent: 'center' },
  pagebarJudul: { ...teks.title, color: color.textBody },
  main: { flex: 1 },
  gulir: { flexGrow: 1, backgroundColor: color.white },
  // .app di PWA: kolom putih maksimal 420px, di tengah layar lebar.
  kolom: { width: '100%', maxWidth: layout.lebarMaks, alignSelf: 'center', flexGrow: 1 },
  tabbar: {
    flexDirection: 'row',
    backgroundColor: color.tabbarBg,
    borderTopWidth: 1,
    borderTopColor: color.borderHairline,
    paddingTop: spacing.s2,
    paddingHorizontal: spacing.s2,
  },
  tab: { flex: 1, alignItems: 'center', gap: spacing.s1, paddingVertical: 6, minHeight: 48 },
  tabIkon: { width: 44, height: 28, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  tabIkonAktif: { backgroundColor: color.blue100 },
  tabLabel: { ...teks.caption, color: color.ink500 },
  tabLabelAktif: { color: color.blue600, fontFamily: font.semibold },
  ditekan: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});
