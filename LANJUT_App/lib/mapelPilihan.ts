import { kelompokJenjang, type Kelas } from './jenjang';

/**
 * LANJUT_079 — Pilih Mapel per rumpun favorit (kelas 12) dan Mapel Saya
 * (kelas 7–11). Logika murni (tanpa React) supaya bisa dites langsung dari
 * server/tests. Daftar mapel dan kelompok rumpun selalu dari server
 * (GET /pengguna/saya/pilihan-mapel); app tidak menyusun pemetaan sendiri.
 *
 * TEKS DRAF, belum disetujui Khalifa — salinan-teks-lanjut.md §4.19 (LANJUT_079).
 */

/** Sama dengan server (pengguna/mapel-pilihan.js). Server tetap penentu. */
export const MAKS_MAPEL_PILIHAN = 5;
export const MAKS_RUMPUN_KELAS12 = 3;

export type BagianPilihMapel = 'rumpun' | 'mapel_saya' | 'f3';

/**
 * Isi tab Pilih Mapel per kelas (pilihan percakapan LANJUT_079, belum disetujui PM):
 *   - kelas 12  → Pilih Mapel per rumpun favorit di atas, alur F3 (prodi → TKA) tetap di bawah;
 *   - kelas 10–11 → Mapel Saya di atas, F3 tetap di bawah (keputusan LANJUT_071);
 *   - kelas 7–9 → Mapel Saya saja, tanpa prodi;
 *   - tanpa kelas → F3 seperti sebelumnya (biasanya tertahan di gerbang isi kelas).
 */
export function bagianPilihMapel(kelas: Kelas | null | undefined): BagianPilihMapel[] {
  switch (kelompokJenjang(kelas)) {
    case 'kelas12':
      return ['rumpun', 'f3'];
    case 'kelas10_11':
      return ['mapel_saya', 'f3'];
    case 'smp':
      return ['mapel_saya'];
    default:
      return ['f3'];
  }
}

/**
 * Urutan tampil mapel di Arsip dan Latihan: mapel pilihan lebih dulu (urut
 * pilihan), sisanya tetap urutan asal. Id pilihan yang tidak ada di daftar
 * diabaikan; daftar tidak bertambah atau berkurang.
 */
export function urutkanMapelPilihan<T extends { id: string }>(mapel: readonly T[], pilihan: readonly string[] | null | undefined): T[] {
  const p = pilihan ?? [];
  const dipilih = p.map((id) => mapel.find((m) => m.id === id)).filter((m): m is T => !!m);
  return [...dipilih, ...mapel.filter((m) => !p.includes(m.id))];
}

/** Centang/lepas satu id; batas tercapai → tidak bertambah. */
export function ubahPilihanMapel(pilihan: readonly string[], id: string, maks: number = MAKS_MAPEL_PILIHAN): string[] {
  if (pilihan.includes(id)) return pilihan.filter((x) => x !== id);
  return pilihan.length >= maks ? [...pilihan] : [...pilihan, id];
}

export const TEKS_MAPEL_PILIHAN = {
  kelas12: {
    judul: 'Mapel pilihanmu',
    pengantar: 'Pilih paling banyak 5 mapel dari rumpun favoritmu. Mapel ini tampil lebih dulu di Arsip dan Latihan.',
    ajakanJudul: 'Pilih rumpun favoritmu dulu',
    ajakanTeks: 'Pilih satu sampai tiga rumpun yang paling kamu minati. Setelah itu, mapel di sini dikelompokkan per rumpun.',
    catatanKelompok: 'Pengelompokan ini sementara, untuk memudahkan memilih. Belum dicek ke sumber resmi.',
    // Membuka pilihan rumpun di layar yang sama (pilihan yang sama juga ada di layar Jalur Saya).
    ubahRumpun: 'Ubah rumpun favorit',
  },
  mapelSaya: {
    judul: 'Mapel Saya',
    pengantar: 'Pilih paling banyak 5 mapel yang kamu sukai atau ingin kamu perdalam. Mapel ini tampil lebih dulu di Arsip dan Latihan.',
  },
  rumpun: {
    judul: 'Rumpun favorit',
    petunjuk: 'Pilih satu sampai tiga rumpun yang paling kamu minati.',
    tombol: 'Simpan rumpun',
  },
  hitung: (n: number, maks: number) => `${n} dari ${maks} dipilih`,
  penuh: (maks: number) => `Paling banyak ${maks}. Lepas satu dulu untuk memilih yang lain.`,
  tombol: 'Simpan mapel',
};
