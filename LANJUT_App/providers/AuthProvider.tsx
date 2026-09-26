import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import * as authApi from '../api/auth';
import type { Pengguna, Sesi } from '../api/auth';
import { ApiError } from '../api/client';

type StatusSesi = 'memuat' | 'masuk' | 'tamu';

type NilaiAuth = {
  status: StatusSesi;
  token: string | null;
  pengguna: Pengguna | null;
  terapkanSesi: (sesi: Sesi) => void;
  keluar: () => Promise<void>;
};

const AuthContext = createContext<NilaiAuth | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<StatusSesi>('memuat');
  const [token, setToken] = useState<string | null>(null);
  const [pengguna, setPengguna] = useState<Pengguna | null>(null);

  useEffect(() => {
    let batal = false;
    (async () => {
      const tersimpan = await authApi.bacaSesiTersimpan().catch(() => null);
      if (batal) return;
      if (!tersimpan) {
        setStatus('tamu');
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
          setStatus('tamu');
        }
      }
    })();
    return () => {
      batal = true;
    };
  }, []);

  const terapkanSesi = useCallback((sesi: Sesi) => {
    setToken(sesi.token);
    setPengguna(sesi.pengguna);
    setStatus('masuk');
  }, []);

  const keluar = useCallback(async () => {
    if (token) await authApi.keluar(token);
    else await authApi.hapusSesiLokal();
    setToken(null);
    setPengguna(null);
    setStatus('tamu');
  }, [token]);

  const nilai = useMemo(
    () => ({ status, token, pengguna, terapkanSesi, keluar }),
    [status, token, pengguna, terapkanSesi, keluar]
  );

  return <AuthContext.Provider value={nilai}>{children}</AuthContext.Provider>;
}

export function useSesi(): NilaiAuth {
  const nilai = useContext(AuthContext);
  if (!nilai) throw new Error('useSesi harus dipakai di dalam <AuthProvider>');
  return nilai;
}
