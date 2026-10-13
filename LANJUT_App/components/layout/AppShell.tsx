import React from 'react';
import { Header, Main, Nav } from '@expo/html-elements';
import { Link, usePathname, useRouter } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PLACEHOLDER_TAB_TENGAH, TAB_BAWAH, TINGGI_IKON_TAB, UKURAN_TAB_TENGAH, type HrefTab } from '../../lib/navigasi';
import { color, font, layout, radius, shadow, spacing, teks } from '../../theme/tokens';
import { Ikon } from '../ui/Ikon';

// Tab bar bawah: lima tab dari lib/navigasi.ts (LANJUT_074) — Beranda, Jenjang
// Saya, Ngobrol (tab tengah), Pilih Mapel, Daftar Periksa. Cerita Alumni & Akun
// bukan tab: dijangkau dari Beranda / ikon profil, dan saat dibuka tab Beranda
// yang tetap aktif (seperti alumni.html di PWA).

// Halaman anak: dapat .pagebar (tombol kembali + judul) di bawah app bar.
// LANJUT_074: /cek-posisi bernama "Jalur Saya"; halaman akun jadi "Data Akun" (DRAF).
const HALAMAN_ANAK: Record<string, string> = {
  // LANJUT_064: judul netral untuk semua jenjang (DRAF)
  '/cerita-alumni': 'Cerita Alumni',
  '/akun': 'Data Akun',
  '/cek-posisi': 'Jalur Saya',
  '/gaya-belajar': 'Gaya Belajar',
  '/ngobrol': 'Ngobrol Bareng LANJUT',
  '/eksplorasi-tujuan': 'Eksplorasi Tujuan',
  // F6 (LANJUT_039) — dibuka dari Beranda, jadi tab Beranda yang tetap aktif.
  '/arsip': 'Arsip Belajar',
  '/arsip-kartu': 'Kartu',
  '/arsip-tulis': 'Tulis Kartu',
  // LANJUT_049 — modul di Arsip Belajar.
  '/arsip-modul': 'Modul',
  '/arsip-modul-unggah': 'Unggah Modul',
  // F7 (LANJUT_041) — dibuka dari Arsip Belajar.
  '/latihan': 'Latihan',
  '/latihan-riwayat': 'Riwayat Latihan',
  // LANJUT_058 — dari Beranda dan Latihan.
  '/level-in': 'Level-In',
  // LANJUT_048 — dari Data Akun dan Ngobrol.
  '/terima-kebijakan': 'Kebijakan Privasi',
};

// Tab yang tetap aktif untuk halaman anak. Bawaannya Beranda; F10 adalah
// lanjutan langsung Pilih Mapel, jadi tab itu yang menyala (SDD-F10 §E.1).
// Ngobrol tetap punya page bar (judul "Ngobrol Bareng LANJUT"), tetapi sejak
// LANJUT_074 tab tengahnya sendiri yang menyala.
const TAB_INDUK: Record<string, HrefTab> = {
  '/eksplorasi-tujuan': '/pilih-mapel',
  '/ngobrol': '/ngobrol',
};

// Layar yang mengatur gulirnya sendiri (chat: daftar pesan bergulir, kolom
// input tetap di bawah), jadi tidak dibungkus ScrollView halaman.
const TANPA_GULIR_HALAMAN = new Set(['/ngobrol']);

function tabAktif(pathname: string): HrefTab {
  if (pathname in HALAMAN_ANAK) return TAB_INDUK[pathname] ?? '/linimasa';
  return TAB_BAWAH.find((t) => pathname.startsWith(t.href))?.href ?? '/linimasa';
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const judulAnak = HALAMAN_ANAK[pathname];

  return (
    <View style={s.akar}>
      <AppBar tampilkanProfil={pathname !== '/akun'} />
      {judulAnak ? <PageBar judul={judulAnak} /> : null}
      <Main style={s.main}>
        {TANPA_GULIR_HALAMAN.has(pathname) ? (
          <View style={s.kolomPenuh}>{children}</View>
        ) : (
          <ScrollView contentContainerStyle={s.gulir} keyboardShouldPersistTaps="handled">
            <View style={s.kolom}>{children}</View>
          </ScrollView>
        )}
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

/** .tabbar — lima tab; tab tengah (Ngobrol) berupa lingkaran yang menonjol (LANJUT_074). */
function TabBar({ aktif }: { aktif: HrefTab }) {
  const { bottom } = useSafeAreaInsets();
  return (
    <Nav style={StyleSheet.flatten([s.tabbar, { paddingBottom: spacing.s3 + bottom }])}>
      {TAB_BAWAH.map((t) => {
        const sedang = t.href === aktif;
        return (
          // Link asChild tidak meneruskan style berbentuk fungsi di web, jadi statis.
          <Link key={t.href} href={t.href} asChild>
            <Pressable accessibilityRole="link" aria-current={sedang ? 'page' : undefined} style={s.tab}>
              {t.tengah ? (
                // Huruf placeholder disembunyikan dari pembaca layar: nama tab tetap "Ngobrol".
                <View
                  style={StyleSheet.flatten([s.tengah, sedang && s.tengahAktif])}
                  aria-hidden
                  importantForAccessibility="no-hide-descendants"
                >
                  <Text style={s.tengahHuruf}>{PLACEHOLDER_TAB_TENGAH}</Text>
                </View>
              ) : (
                <View style={StyleSheet.flatten([s.tabIkon, sedang && s.tabIkonAktif])}>
                  {t.ikon ? <Ikon nama={t.ikon} warna={sedang ? color.blue600 : color.ink500} /> : null}
                </View>
              )}
              {/* Lima tab di layar 360 px: label panjang (Jenjang Saya, Daftar Periksa) dua baris, tidak terpotong. */}
              <Text style={StyleSheet.flatten([s.tabLabel, sedang && s.tabLabelAktif])} numberOfLines={2}>
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
  kolomPenuh: { flex: 1, width: '100%', maxWidth: layout.lebarMaks, alignSelf: 'center', backgroundColor: color.white },
  tabbar: {
    flexDirection: 'row',
    backgroundColor: color.tabbarBg,
    borderTopWidth: 1,
    borderTopColor: color.borderHairline,
    paddingTop: spacing.s2,
    paddingHorizontal: spacing.s2,
    overflow: 'visible',
    zIndex: 3,
  },
  tab: { flex: 1, alignItems: 'center', gap: spacing.s1, paddingVertical: 6, minHeight: 48, overflow: 'visible' },
  tabIkon: { width: 44, height: TINGGI_IKON_TAB, borderRadius: radius.pill, alignItems: 'center', justifyContent: 'center' },
  tabIkonAktif: { backgroundColor: color.blue100 },
  // LANJUT_074 — tab tengah: lingkaran blue600 (teks putih ±5,7:1), menonjol ke atas
  // garis tab bar; label tetap sejajar label tab lain.
  tengah: {
    width: UKURAN_TAB_TENGAH,
    height: UKURAN_TAB_TENGAH,
    marginTop: -(UKURAN_TAB_TENGAH - TINGGI_IKON_TAB),
    borderRadius: UKURAN_TAB_TENGAH / 2,
    backgroundColor: color.blue600,
    borderWidth: 3,
    borderColor: color.tabbarBg,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadow.s2,
  },
  tengahAktif: { borderColor: color.blue100 },
  tengahHuruf: { fontFamily: font.semibold, fontSize: 24, lineHeight: 30, color: color.white },
  tabLabel: { ...teks.caption, fontSize: 11, lineHeight: 15, color: color.ink500, textAlign: 'center' },
  tabLabelAktif: { color: color.blue600, fontFamily: font.semibold },
  ditekan: { opacity: 0.85, transform: [{ scale: 0.97 }] },
});
