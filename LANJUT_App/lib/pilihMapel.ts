import type { MapelUntukProdi } from '../api/types';

/**
 * F3 — Penolong Pilih Mapel (docs/prd-sdd-lanjut.md Bagian 6 & 13). Logika
 * murni dipisah dari komponen, mengikuti pola lib/linimasa.ts, supaya bisa
 * dites tanpa render.
 */

export type MapelAgregat = {
  id: string;
  nama: string;
  tersedia_di_smk: boolean;
  jumlahProdi: number;
};

/**
 * Jalur "belum tahu prodi" — AC F3: "tunjukkan mapel yang paling sering
 * jadi syarat lintas prodi (dari agregasi prodi_mapel)".
 *
 * TIDAK LAGI dipakai jalur produksi — `useAgregasiMapelLintasProdi` sekarang
 * memanggil `GET /konten/mapel/agregasi-lintas-prodi`, yang menghitung ini
 * di backend lewat satu query SQL (JOIN prodi_mapel + GROUP BY mapel_id),
 * bukan dengan memanggil `/konten/prodi/:id/mapel` untuk SETIAP prodi lalu
 * menjumlahkannya di sini. Fungsi ini dipertahankan sebagai fallback/util
 * tes — dipakai untuk memverifikasi hasil endpoint baru identik dengan
 * agregasi client-side lama (lihat server/tests untuk pembandingnya).
 */
export function agregasiMapelLintasProdi(semuaMapelPerProdi: MapelUntukProdi[][]): MapelAgregat[] {
  const map = new Map<string, MapelAgregat>();

  for (const daftarMapel of semuaMapelPerProdi) {
    for (const m of daftarMapel) {
      const ada = map.get(m.id);
      if (ada) {
        ada.jumlahProdi += 1;
      } else {
        map.set(m.id, { id: m.id, nama: m.nama, tersedia_di_smk: m.tersedia_di_smk, jumlahProdi: 1 });
      }
    }
  }

  return Array.from(map.values()).sort((a, b) => b.jumlahProdi - a.jumlahProdi);
}
