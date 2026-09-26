/**
 * theme/tokens.ts — Token desain LANJUT (eksplorasi Expo, terpisah dari PWA v1)
 *
 * Nilai warna & ukuran di bawah DISALIN dari app/assets/tokens.css (sumber
 * kebenaran visual PWA v1 yang sudah dipakai production), bukan ditebak
 * ulang dari deskripsi kualitatif docs/design.md — karena docs/design.md
 * Bagian 6 poin 2 sendiri menyatakan kode HEX di sana "masih deskriptif,
 * belum final". Memakai nilai PWA v1 menjamin dua basis kode ini terlihat
 * sebagai satu identitas merek, bukan dua produk berbeda.
 *
 * FONT BODY BELUM FINAL. docs/design.md Bagian 6 poin 1 belum memutuskan
 * typeface UI resmi (logo vs UI terpisah). Kandidat nama "Ahoka" masih
 * menunggu konfirmasi tim/lisensi — BUKAN keputusan final, jangan
 * diperlakukan seolah sudah dikonfirmasi. `typography.fontBody` sengaja
 * dibiarkan `undefined` (bukan diisi "Ahoka" atau "Poppins") supaya React
 * Native jatuh ke font sistem bawaan sampai ada keputusan tertulis — lihat
 * `typography.fontBody`.
 */

export const color = {
  // Biru merek — tiga tingkat, terang ke gelap (identik app/assets/tokens.css §Bagian 1)
  blue100: '#E4F3F7',
  blue200: '#B4E1EB', // design.md: "Biru muda (light blue)" — puncak gradasi
  blue300: '#95BDD7', // design.md: "Biru sedang (medium blue)" — tengah gradasi
  blue400: '#78A4CB', // dasar gradasi, warna tombol utama di PWA v1
  blue500: '#5E88AF',
  blue600: '#456A8C', // design.md: "Biru tua (steel blue)" — paling gelap

  // Netral — tidak pernah hitam murni (design.md Bagian 3 & Bagian 4 "outline hitam/garis gelap")
  white: '#FFFFFF',
  ink900: '#1A1A1A', // pengganti "hitam" untuk teks & outline mono
  ink700: '#3D4450',
  ink500: '#6B7480',
  ink300: '#A7AEB8',
  ink100: '#E6E9ED',
  ink050: '#F5F7F9',

  // Alias semantik dipakai supaya komponen tidak memanggil blueNNN mentah
  textBody: '#1A1A1A',
  textMuted: '#3D4450',
  textSubtle: '#A7AEB8',
  textOnBrand: '#FFFFFF',
  textLink: '#456A8C',
  surfaceCard: '#FFFFFF',
  surfaceSoft: '#E4F3F7',
  surfacePage: '#F5F7F9',
  borderHairline: '#E6E9ED',
  borderSoft: '#D6E5EE',

  // Status "selesai" (tahapan yang sudah lewat) — app/assets/tokens.css
  // §Bagian 2: "Status — tenang saja, tidak pernah merah atau oranye.
  // Mendesak diwakili biru tua, selesai hijau redam, belum mulai abu."
  // Biru tua & abu sudah ada lewat blue500/ink300 di atas; hanya hijau
  // redam ini yang belum disalin dari tokens.css.
  statusOk: '#4E9C87',
  statusOkBg: '#E6F2EF',
  statusOkFg: '#2F6B5C', // teks di atas statusOkBg (app/assets/tokens.css §Bagian 2)
  statusAttentionBg: '#E4EDF5', // pasangan "apa yang berbeda" (F2) memakai ini di PWA v1
} as const;

// Gradasi 3-tingkat (design.md Bagian 3 "swatch kiri atas"): dipakai splash/hero,
// disimpan sebagai array (bukan string CSS) karena React Native butuh format itu
// untuk expo-linear-gradient / react-native-linear-gradient nantinya.
export const gradient = {
  cover: [color.blue200, color.blue300, color.blue400] as const,
};

export const spacing = {
  s1: 4, s2: 8, s3: 12, s4: 16, s5: 20, s6: 24, s8: 32, s10: 40, s12: 48,
  gutter: 20, // pinggiran layar, setara --gutter-screen PWA v1
} as const;

export const radius = {
  xs: 8, sm: 12, md: 16, lg: 24, xl: 32, pill: 999,
} as const;

export const typography = {
  // Lihat catatan "FONT BODY BELUM FINAL" di kepala berkas ini sebelum mengisi field ini.
  fontBody: undefined as string | undefined, // TODO: isi setelah nama font resmi dikonfirmasi (kandidat: "Ahoka")
  fontFallback: 'System', // font sistem React Native — dipakai selama fontBody masih undefined
  size: {
    h1: 32, h2: 24, h3: 18, lead: 17, title: 20,
    body: 16, bodySm: 14, caption: 13, label: 12,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const theme = { color, gradient, spacing, radius, typography } as const;
export type Theme = typeof theme;
