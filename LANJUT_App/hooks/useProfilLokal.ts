import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const KUNCI = 'lanjut.profil.lokal.v1';

export type ProfilLokal = { kelas: string | null; jalur: string | null };

const PROFIL_KOSONG: ProfilLokal = { kelas: null, jalur: null };

async function bacaProfilLokal(): Promise<ProfilLokal> {
  try {
    const mentah = await AsyncStorage.getItem(KUNCI);
    return mentah ? { ...PROFIL_KOSONG, ...JSON.parse(mentah) } : PROFIL_KOSONG;
  } catch {
    return PROFIL_KOSONG;
  }
}

/**
 * F5 — kelas & jalur pengguna, dipakai untuk menyaring `butir_daftar_periksa`
 * (docs/prd-sdd-lanjut.md §6 F5 & §13). PWA v1 punya mekanisme sungguhan
 * untuk ini lewat sesi login (app/assets/api.js: token + `pengguna.kelas`
 * di localStorage `lanjut.auth.v1`) — TAPI LANJUT_App belum punya alur
 * login sama sekali (lihat hooks/useKemajuan.ts, sudah ditulis sebelum F5:
 * `token` sengaja parameter eksternal karena "belum ada alur login").
 *
 * Keputusan disepakati sebelum F5 dibangun: profil ini SENGAJA device-local
 * lewat AsyncStorage, bukan dari akun — bukan "cara baru" untuk kebutuhan
 * yang sudah ada, melainkan pengganti sementara untuk kebutuhan (mengetahui
 * kelas/jalur) yang sebelum ini tidak punya mekanisme sama sekali di
 * LANJUT_App. Lihat catatan yang sama di hooks/useKemajuanLokal.ts.
 */
export function useProfilLokal() {
  return useQuery({
    queryKey: ['profil_lokal'],
    queryFn: bacaProfilLokal,
  });
}

export function useSetProfilLokal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (profil: ProfilLokal) => {
      await AsyncStorage.setItem(KUNCI, JSON.stringify(profil));
      return profil;
    },
    onSuccess: (profil) => {
      queryClient.setQueryData(['profil_lokal'], profil);
    },
  });
}
