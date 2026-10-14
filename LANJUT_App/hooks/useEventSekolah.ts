import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { ApiError, apiFetch } from '../api/client';
import type { EventSekolah, IsiEvent } from '../api/types';
import { useSesi } from '../providers/AuthProvider';

// Data milik akun: AuthProvider membuang kunci ini saat keluar/ganti akun.
export const KUNCI_EVENT = ['event_sekolah'] as const;

/**
 * LANJUT_076 — GET /pengguna/event (hanya milik akun sendiri). `aktif` = akun kelas
 * 7–11 (lib/eventSekolah.ts). Saklar mati / kebijakan belum diterima → 403; 403
 * tidak diulang, dan layar memperlakukan galat apa pun sebagai "fitur tidak tampil".
 */
export function useEventSekolah(aktif: boolean) {
  const { token } = useSesi();
  return useQuery({
    queryKey: KUNCI_EVENT,
    queryFn: () => apiFetch<EventSekolah[]>('/pengguna/event', { token: token! }),
    enabled: !!token && aktif,
    retry: (kali, err) => !(err instanceof ApiError && err.status === 403) && kali < 1,
  });
}

/** Buat (tanpa `id`) atau ubah (dengan `id`) event milik sendiri. */
export function useSimpanEvent() {
  const { token } = useSesi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, isi }: { id?: string; isi: IsiEvent }) =>
      id
        ? apiFetch<EventSekolah>(`/pengguna/event/${encodeURIComponent(id)}`, { method: 'PATCH', body: isi, token: token! })
        : apiFetch<EventSekolah>('/pengguna/event', { method: 'POST', body: isi, token: token! }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: KUNCI_EVENT }),
  });
}

/** Hapus PERMANEN. */
export function useHapusEvent() {
  const { token } = useSesi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) =>
      apiFetch<{ dihapus: true }>(`/pengguna/event/${encodeURIComponent(id)}`, { method: 'DELETE', token: token! }),
    onSettled: () => queryClient.invalidateQueries({ queryKey: KUNCI_EVENT }),
  });
}
