import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { Kemajuan } from '../api/types';

/**
 * F5 — GET /kemajuan (kemajuan.rute.js baris 13), dijaga `wajibLogin` —
 * BUTUH token sesi Bearer (server/src/middleware/autentikasi.js). Kerangka
 * ini belum punya alur login/simpan-token, jadi `token` sengaja jadi
 * parameter eksplisit yang dipanggil menyediakan dari luar; tanpa token,
 * `enabled: false` mencegah query dikirim sama sekali (bukan dikirim lalu
 * gagal 401 TIDAK_MASUK setiap render).
 */
export function useKemajuan(token: string | undefined) {
  return useQuery({
    queryKey: ['kemajuan'],
    queryFn: () => apiFetch<Kemajuan[]>('/kemajuan', { token }),
    enabled: !!token,
  });
}
