import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { StatusPersetujuan } from '../api/types';
import { VERSI_KEBIJAKAN } from '../lib/kebijakanPrivasi';
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

/**
 * LANJUT_048 — siswa menerima kebijakan untuk dirinya: POST /persetujuan
 * (endpoint LANJUT_047). Versi yang dikirim = versi TEKS yang ditampilkan app,
 * bukan versi dari server; server menolak (409) bila bukan versi berlaku.
 * Hanya jenis kebijakan_privasi — app tidak punya jalan ke ortu_wali.
 */
export function useTerimaKebijakan() {
  const { token } = useSesi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () =>
      apiFetch<StatusPersetujuan>('/persetujuan', {
        method: 'POST',
        body: { jenis: 'kebijakan_privasi', versi: VERSI_KEBIJAKAN },
        token: token!,
      }),
    onSuccess: (status) => queryClient.setQueryData(KUNCI_PERSETUJUAN, status),
  });
}
