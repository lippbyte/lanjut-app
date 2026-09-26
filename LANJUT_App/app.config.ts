import type { ExpoConfig } from 'expo/config';

/**
 * app.json digantikan app.config.ts (bukan dipakai berdampingan) supaya base
 * URL API bisa dihitung dari kode, bukan nilai statis. Berkas ini HANYA
 * menaruh tiga kandidat URL di `extra` (prod/dev-android/dev-web) — pilihan
 * MANA yang dipakai ditentukan saat runtime di `api/client.ts` lewat
 * `__DEV__` + `Platform.OS`, BUKAN di sini, karena `__DEV__` dan `Platform`
 * adalah global Metro/React Native yang hanya ada di runtime bundel JS,
 * tidak tersedia saat berkas config ini dieksekusi Expo CLI di proses Node
 * biasa (config-time, bukan run-time).
 */
// "Dev Android" dan "dev Web" WAJIB dibedakan: "localhost" di dalam proses
// Android (emulator MAUPUN device fisik) merujuk ke perangkat itu sendiri,
// BUKAN komputer yang menjalankan `npm start` di server/, sedangkan target
// Web berjalan langsung di browser komputer itu sendiri sehingga "localhost"
// justru benar untuknya. 10.0.2.2 adalah alias loopback host khusus emulator
// Android Studio. Untuk device Android FISIK, override lewat env var di bawah
// dengan IP LAN komputer (mis. http://192.168.x.x:4000/api/v1 — pola yang
// sama dipakai saat menguji PWA v1 langsung di HP).
const API_URL_DEV_ANDROID =
  process.env.EXPO_PUBLIC_API_URL_DEV_ANDROID || 'http://10.0.2.2:4000/api/v1';
const API_URL_DEV_WEB =
  process.env.EXPO_PUBLIC_API_URL_DEV_WEB || 'http://localhost:4000/api/v1';

// Placeholder — domain rilis produksi belum ada (docs/prd-sdd-lanjut.md
// Bagian 11 "Nama domain final" masih pertanyaan terbuka, tidak menghambat).
const API_URL_PROD = process.env.EXPO_PUBLIC_API_URL_PROD || 'https://api.lanjut.id/api/v1';

const config: ExpoConfig = {
  name: 'LANJUT (Eksplorasi Expo)',
  slug: 'lanjut-mobile-eksplorasi',
  scheme: 'lanjut',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  plugins: ['expo-router'],
  ios: {
    supportsTablet: true,
  },
  android: {
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  extra: {
    apiUrlProd: API_URL_PROD,
    apiUrlDevAndroid: API_URL_DEV_ANDROID,
    apiUrlDevWeb: API_URL_DEV_WEB,
  },
};

export default config;
