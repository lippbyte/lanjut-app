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

// F5 — kelas & jalur untuk menyaring Daftar Periksa. Disimpan di perangkat
// karena akun belum punya medan jalur; kelas dari akun dipakai sebagai awalan.
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
