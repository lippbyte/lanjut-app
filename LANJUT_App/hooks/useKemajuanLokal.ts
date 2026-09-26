import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const KUNCI = 'lanjut.kemajuan.lokal.v1';

/** butir_id -> selesai_pada (ISO), bentuk yang sama seperti entitas `kemajuan` (§13) minus pengguna_id. */
export type KemajuanLokal = Record<string, string>;

async function bacaKemajuanLokal(): Promise<KemajuanLokal> {
  try {
    const mentah = await AsyncStorage.getItem(KUNCI);
    return mentah ? JSON.parse(mentah) : {};
  } catch {
    return {};
  }
}

async function simpanKemajuanLokal(data: KemajuanLokal): Promise<void> {
  await AsyncStorage.setItem(KUNCI, JSON.stringify(data));
}

/**
 * F5 — progres centang Daftar Periksa. Disimpan device-local lewat
 * AsyncStorage, BUKAN ke tabel `kemajuan` di server lewat `/kemajuan`.
 *
 * Deviasi ini disengaja, bukan lupa: endpoint `/kemajuan` dijaga
 * `wajibLogin` (server/src/middleware/autentikasi.js) dan LANJUT_App belum
 * punya alur login/token sesi sama sekali — lihat hooks/useKemajuan.ts
 * (parameter `token` sudah lebih dulu ditulis eksplisit sebagai "belum ada
 * alur login" sebelum F5 dikerjakan) dan hooks/useProfilLokal.ts (catatan
 * yang sama untuk kelas/jalur).
 *
 * Konsekuensi: progres ini HANYA bertahan di satu device/browser (bertahan
 * lintas tutup-buka aplikasi lewat AsyncStorage, TIDAK lintas device) —
 * bagian dari kriteria penerimaan F5 yang belum terpenuhi sampai ada alur
 * login. AC F5 ("kemajuan bertahan setelah aplikasi ditutup") tetap
 * terpenuhi untuk satu device.
 */
export function useKemajuanLokal() {
  return useQuery({
    queryKey: ['kemajuan_lokal'],
    queryFn: bacaKemajuanLokal,
  });
}

/** Toggle satu butir — optimistic update (React Query cache) lalu ditulis ke AsyncStorage. */
export function useToggleKemajuanLokal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (butirId: string) => {
      const sekarang = await bacaKemajuanLokal();
      const berikutnya = { ...sekarang };
      if (butirId in berikutnya) delete berikutnya[butirId];
      else berikutnya[butirId] = new Date().toISOString();
      await simpanKemajuanLokal(berikutnya);
      return berikutnya;
    },
    onMutate: async (butirId) => {
      await queryClient.cancelQueries({ queryKey: ['kemajuan_lokal'] });
      const sebelumnya = queryClient.getQueryData<KemajuanLokal>(['kemajuan_lokal']) ?? {};
      const optimis = { ...sebelumnya };
      if (butirId in optimis) delete optimis[butirId];
      else optimis[butirId] = new Date().toISOString();
      queryClient.setQueryData(['kemajuan_lokal'], optimis);
      return { sebelumnya };
    },
    onError: (_err, _butirId, context) => {
      if (context) queryClient.setQueryData(['kemajuan_lokal'], context.sebelumnya);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['kemajuan_lokal'] });
    },
  });
}
