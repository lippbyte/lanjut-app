// LANJUT_083 (dipindah dari google-kembali.js di LANJUT_083b) — meneruskan hasil masuk Google
// (fragmen #id_token=…&state=…) ke app lewat lanjut://masuk-google?… Hanya parameter yang
// dibutuhkan app yang diteruskan. Tidak ada permintaan jaringan dan tidak ada penyimpanan.

const IZIN = ['id_token', 'state', 'error'];

/** Alamat app tujuan, atau null bila fragmen tidak membawa data masuk dari Google. */
export function tujuanPenerus(fragmen: string): string | null {
  const bagian = fragmen
    .replace(/^#/, '')
    .split('&')
    .filter((b) => IZIN.includes(b.split('=')[0]));
  return bagian.length ? `lanjut://masuk-google?${bagian.join('&')}` : null;
}
