import { useMutation } from '@tanstack/react-query';

import * as authApi from '../api/auth';
import type { DataUbahProfil } from '../api/auth';
import { useSesi } from '../providers/AuthProvider';

// Jalur Saya — PATCH /pengguna/saya (pengguna.rute.js, dijaga wajibLogin).
// Tampilan hanya berubah setelah server menjawab sukses: yang tampil selalu
// yang benar-benar tersimpan, tidak ada pembaruan optimistis.
export function useUbahProfil() {
  const { token, perbaruiPengguna } = useSesi();
  return useMutation({
    mutationFn: (data: DataUbahProfil) => authApi.ubahProfil(token!, data),
    onSuccess: (profil) => perbaruiPengguna(profil),
  });
}
