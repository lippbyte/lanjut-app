import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { MapelAgregasiLintasProdi } from '../api/types';
import type { MapelAgregat } from '../lib/pilihMapel';

/**
 * F3 — jalur "belum tahu prodi". Agregasi ("berapa prodi yang membutuhkan
 * tiap mapel") dihitung backend lewat SATU query SQL — `GET
 * /konten/mapel/agregasi-lintas-prodi` (konten.repo.js
 * `ambilAgregasiMapelLintasProdi`, JOIN prodi_mapel + GROUP BY mapel_id) —
 * BUKAN lagi dengan memanggil `/konten/prodi/:id/mapel` untuk setiap id di
 * `prodiIds` lalu menjumlahkannya di klien. `lib/pilihMapel.ts`
 * `agregasiMapelLintasProdi` masih ada sebagai fallback/util tes, tapi
 * jalur produksi ini tidak memanggilnya lagi.
 *
 * `prodiIds` dipertahankan sebagai parameter hanya untuk `enabled` — hook
 * ini menahan panggilan sampai daftar prodi (dari useProdi()) benar-benar
 * sudah ada, konsisten dengan pemanggilnya di PilihMapelScreen.
 */
export function useAgregasiMapelLintasProdi(prodiIds: string[] | undefined) {
  const ids = prodiIds ?? [];
  return useQuery({
    queryKey: ['agregasi_mapel_lintas_prodi'],
    queryFn: async () => {
      const baris = await apiFetch<MapelAgregasiLintasProdi[]>(
        '/konten/mapel/agregasi-lintas-prodi'
      );
      return baris.map(
        (b): MapelAgregat => ({
          id: b.id,
          nama: b.nama,
          tersedia_di_smk: b.tersedia_di_smk,
          jumlahProdi: b.jumlah_prodi,
        })
      );
    },
    enabled: ids.length > 0,
  });
}
