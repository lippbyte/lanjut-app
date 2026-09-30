// Angka F10 Eksplorasi Tujuan (SDD-F10 §E.4). Fungsi murni, tanpa Intl
// (tidak semua mesin JS di HP punya data locale lengkap).

/** 5582 → "5.582" (titik pemisah ribuan). */
export function angkaRibuan(n: number): string {
  return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Rasio keketatan = diterima / pendaftar × 100, satu desimal, koma:
 * 43 dari 5582 → "0,8%". Tidak bisa dihitung (diterima null, pendaftar
 * kosong/0) → null; layar menampilkan "—", bukan "0".
 */
export function rasioKeketatan(diterima: number | null | undefined, pendaftar: number | null | undefined): string | null {
  if (diterima === null || diterima === undefined || !pendaftar) return null;
  const persen = Math.round((diterima / pendaftar) * 1000) / 10;
  return `${persen.toFixed(1).replace('.', ',')}%`;
}
