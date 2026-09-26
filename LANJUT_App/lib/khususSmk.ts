import type { ButirKhususSmk } from '../api/types';

/**
 * F2 — Khusus SMK (docs/prd-sdd-lanjut.md Bagian 6). AC: tiap butir WAJIB
 * berpasangan "apa yang beda" + "apa yang bisa dilakukan" — butir yang
 * hanya punya salah satu tidak boleh tayang sama sekali, bukan ditampilkan
 * dengan bagian yang kosong.
 */
export function butirBerpasangan(daftar: ButirKhususSmk[]): ButirKhususSmk[] {
  return daftar
    .filter((b) => !!b.apa_yang_beda && !!b.apa_yang_bisa_dilakukan)
    .slice()
    .sort((a, b) => a.urutan - b.urutan);
}
