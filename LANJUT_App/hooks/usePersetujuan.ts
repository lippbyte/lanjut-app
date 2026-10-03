import { useQuery } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { StatusPersetujuan } from '../api/types';
import { useSesi } from '../providers/AuthProvider';

// Data milik akun: AuthProvider membuang kunci ini saat keluar/ganti akun.
export const KUNCI_PERSETUJUAN = ['persetujuan'] as const;

// LANJUT_047 — status persetujuan akun sendiri (persetujuan.rute.js, wajibLogin).
// Hanya untuk ditampilkan. Boleh-tidaknya fitur AI SELALU diputuskan server
// (bolehPakaiAi), bukan dari nilai ini.
export function usePersetujuan() {
  const { token } = useSesi();
  return useQuery({
    queryKey: KUNCI_PERSETUJUAN,
    queryFn: () => apiFetch<StatusPersetujuan>('/persetujuan/saya', { token: token! }),
    enabled: !!token,
  });
}
