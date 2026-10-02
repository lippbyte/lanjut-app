import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { apiFetch } from '../api/client';
import type { CatatanLatihan, SesiLatihan } from '../api/types';
import { useSesi } from '../providers/AuthProvider';

// Data milik akun: AuthProvider membuang kunci ini saat keluar/ganti akun.
const KUNCI = ['sesi_latihan'] as const;

/** Riwayat Latihan — GET /sesi-latihan (sesi milik sendiri, 50 terakhir). */
export function useRiwayatLatihan() {
  const { token } = useSesi();
  return useQuery({
    queryKey: KUNCI,
    queryFn: () => apiFetch<SesiLatihan[]>('/sesi-latihan', { token: token! }),
    enabled: !!token,
  });
}

type MulaiSesi = { id: string; mapel_fokus_id: string | null; jumlah_kartu_direncanakan: number };

/** POST /sesi-latihan — id buatan klien, jadi aman dikirim ulang. */
export function useMulaiSesi() {
  const { token } = useSesi();
  return useMutation({
    mutationFn: (sesi: MulaiSesi) =>
      apiFetch<{ id: string }>('/sesi-latihan', {
        method: 'POST',
        body: { ...sesi, dimulai_pada: new Date().toISOString(), asal_mula: 'arsip' },
        token: token!,
      }),
  });
}

/**
 * Akhir sesi: POST /riwayat-latihan (semua jawaban sekaligus — bukan per
 * kartu, SDD §6.4) lalu PATCH /sesi-latihan/:id (selesai_pada). Id catatan
 * buatan klien, jadi "Coba lagi" tidak menggandakan apa pun.
 */
export function useSimpanHasilSesi() {
  const { token } = useSesi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ sesiId, catatan }: { sesiId: string; catatan: CatatanLatihan[] }) => {
      if (catatan.length) {
        await apiFetch('/riwayat-latihan', { method: 'POST', body: catatan, token: token! });
      }
      await apiFetch(`/sesi-latihan/${encodeURIComponent(sesiId)}`, {
        method: 'PATCH',
        body: { selesai_pada: new Date().toISOString() },
        token: token!,
      });
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: KUNCI }),
  });
}
