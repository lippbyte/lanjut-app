import { hitungProgres } from '../lib/daftarPeriksa';
import { useSesi } from '../providers/AuthProvider';
import { useButirDaftarPeriksa } from './useButirDaftarPeriksa';
import { useKemajuan } from './useKemajuan';
import { useProfilLokal, useSetProfilLokal } from './useProfilLokal';

/**
 * Kelas & jalur yang menyaring Daftar Periksa. Kelas pilihan di perangkat
 * mengalahkan kelas akun; jalur hanya ada di perangkat. Dipakai layar Daftar
 * Periksa dan ringkasan di Jalur Saya supaya keduanya menyaring sama persis.
 */
export function useSaringDaftarPeriksa() {
  const { pengguna } = useSesi();
  const profilQuery = useProfilLokal();
  const { mutate: simpanProfil } = useSetProfilLokal();

  const kelas = profilQuery.data?.kelas ?? pengguna?.kelas ?? null;
  const jalur = profilQuery.data?.jalur ?? null;
  const pilih = (ubah: { kelas?: string | null; jalur?: string | null }) => simpanProfil({ kelas, jalur, ...ubah });

  return { kelas, jalur, pilih, isPending: profilQuery.isPending };
}

/**
 * Butir tersaring + centang akun + X/Y — satu-satunya tempat ketiganya
 * digabung. Tanpa kelas/jalur, query butir tidak dijalankan.
 */
export function useProgresDaftarPeriksa(kelas: string | null, jalur: string | null) {
  const siap = !!kelas && !!jalur;
  const butirQuery = useButirDaftarPeriksa({ kelas: kelas ?? undefined, jalur: jalur ?? undefined }, siap);
  const kemajuanQuery = useKemajuan();

  const isPending = siap && (butirQuery.isPending || kemajuanQuery.isPending);
  const isError = siap && (butirQuery.isError || kemajuanQuery.isError);
  if (!siap || !butirQuery.data || !kemajuanQuery.data) {
    return { siap, isPending, isError, data: null };
  }

  const kategori = butirQuery.data.kategori.filter((k) => k.butir.length);
  // DELETE /kemajuan tidak menghapus baris, hanya mengosongkan selesai_pada.
  const selesai = new Set(kemajuanQuery.data.filter((k) => k.selesai_pada).map((k) => k.butir_id));
  return { siap, isPending, isError, data: { kategori, selesai, progres: hitungProgres(kategori, selesai) } };
}
