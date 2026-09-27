import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

import * as authApi from '../api/auth';
import type { Pengguna, Sesi } from '../api/auth';
import { ApiError } from '../api/client';

type StatusSesi = 'memuat' | 'masuk' | 'keluar';

type NilaiAuth = {
  status: StatusSesi;
  token: string | null;
  pengguna: Pengguna | null;
  terapkanSesi: (sesi: Sesi) => void;
  perbaruiPengguna: (profil: Pengguna) => Promise<void>;
  keluar: () => Promise<void>;
};

const AuthContext = createContext<NilaiAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<StatusSesi>('memuat');
  const [token, setToken] = useState<string | null>(null);
  const [pengguna, setPengguna] = useState<Pengguna | null>(null);
  const queryClient = useQueryClient();
  // Dibaca oleh perbaruiPengguna, yang bisa dipanggil setelah request
  // selesai — saat itu akun yang masuk mungkin sudah berganti.
  const penggunaIdRef = useRef<string | null>(null);
  penggunaIdRef.current = pengguna?.id ?? null;

  useEffect(() => {
    let batal = false;
    (async () => {
      const tersimpan = await authApi.bacaSesiTersimpan().catch(() => null);
      if (batal) return;
      if (!tersimpan) {
        setStatus('keluar');
        return;
      }
      setToken(tersimpan.token);
      setPengguna(tersimpan.pengguna);
      setStatus('masuk');

      // Token yang ditolak server (dicabut/kedaluwarsa) dibuang; galat
      // jaringan tidak — pengguna tetap masuk selama offline.
      try {
        const profil = await authApi.saya(tersimpan.token);
        if (batal) return;
        setPengguna(profil);
        await authApi.simpanPengguna(profil);
      } catch (err) {
        if (batal) return;
        if (err instanceof ApiError && err.status === 401) {
          await authApi.hapusSesiLokal();
          setToken(null);
          setPengguna(null);
          setStatus('keluar');
        }
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  const terapkanSesi = useCallback((sesi: Sesi) => {
    // Data milik akun (mis. kemajuan) tidak boleh terbawa ke akun lain.
    queryClient.removeQueries({ queryKey: ['kemajuan'] });
    setToken(sesi.token);
    setPengguna(sesi.pengguna);
    setStatus('masuk');
  }, [queryClient]);

  /** Profil terbaru dari server (mis. hasil PATCH /pengguna/saya). Diabaikan
   * kalau sudah keluar atau berganti akun sejak request dikirim. */
  const perbaruiPengguna = useCallback(async (profil: Pengguna) => {
    if (penggunaIdRef.current !== profil.id) return;
    setPengguna(profil);
    await authApi.simpanPengguna(profil);
  }, []);

  const keluar = useCallback(async () => {
    if (token) await authApi.keluar(token);
    else await authApi.hapusSesiLokal();
    queryClient.removeQueries({ queryKey: ['kemajuan'] });
    setToken(null);
    setPengguna(null);
    setStatus('keluar');
  }, [token, queryClient]);

  const nilai = useMemo(
    () => ({ status, token, pengguna, terapkanSesi, perbaruiPengguna, keluar }),
    [status, token, pengguna, terapkanSesi, perbaruiPengguna, keluar]
  );

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}

export function useSesi(): NilaiAuth {
  const nilai = useContext(AuthContext);
  if (!nilai) throw new Error('useSesi harus dipakai di dalam <AuthProvider>');
  return nilai;
}
