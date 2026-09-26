import type { KategoriDaftarPeriksa } from '../api/types';

/**
 * F5 — Daftar Periksa (docs/prd-sdd-lanjut.md Bagian 6 & 13). Logika murni
 * dipisah dari komponen, mengikuti pola lib/linimasa.ts & lib/pilihMapel.ts.
 */

export type StatusProgres = 'kosong' | 'berjalan' | 'selesai';

export type Progres = {
  selesai: number;
  total: number;
  status: StatusProgres;
};

/**
 * X/Y dihitung dari `kategori` (data asli hasil fetch), bukan dari
 * `total_butir` yang dikirim API maupun angka tetap — supaya benar untuk
 * kombinasi kelas/jalur apa pun, termasuk saat berkasnya berubah.
 */
export function hitungProgres(kategori: KategoriDaftarPeriksa[], selesaiIds: ReadonlySet<string>): Progres {
  let total = 0;
  let selesai = 0;

  for (const k of kategori) {
    for (const b of k.butir) {
      total += 1;
      if (selesaiIds.has(b.id)) selesai += 1;
    }
  }

  const status: StatusProgres = total === 0 || selesai === 0 ? 'kosong' : selesai === total ? 'selesai' : 'berjalan';

  return { selesai, total, status };
}
