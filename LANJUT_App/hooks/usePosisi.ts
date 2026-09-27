import { hitungPosisi, type Kebingungan } from '../lib/cekPosisi';
import { BUTIR_MAPEL_TKA } from '../lib/pilihMapel';
import { useSesi } from '../providers/AuthProvider';
import { useKemajuan } from './useKemajuan';
import { useProgresDaftarPeriksa, useSaringDaftarPeriksa } from './useProgresDaftarPeriksa';

/**
 * Cek Posisi Gue — menggabungkan sinyal yang app sudah punya: prodi impian
 * dari akun, centang `mapel-tka`, dan progres Daftar Periksa (hitungan yang
 * sama dengan Jalur Saya). Galat pemuatan tidak menghentikan hasil: sinyal
 * yang gagal dianggap belum ada, jadi user baru tetap dapat tahap awal.
 */
export function usePosisi(kebingungan: Kebingungan | null) {
  const { pengguna } = useSesi();
  const { kelas, jalur, isPending: saringMemuat } = useSaringDaftarPeriksa();
  const hasil = useProgresDaftarPeriksa(kelas, jalur);
  const kemajuanQuery = useKemajuan();

  const isPending = saringMemuat || hasil.isPending || kemajuanQuery.isPending;
  const mapelTkaSelesai = !!kemajuanQuery.data?.some((k) => k.butir_id === BUTIR_MAPEL_TKA && k.selesai_pada);
  const progres = hasil.data ? hasil.data.progres : null;

  const posisi = hitungPosisi({ adaProdi: !!pengguna?.prodi_impian, mapelTkaSelesai, progres }, kebingungan);
  return { isPending, posisi };
}
