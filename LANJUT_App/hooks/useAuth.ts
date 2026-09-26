import { useCallback, useState } from 'react';

import * as authApi from '../api/auth';
import type { DataDaftar } from '../api/auth';
import { ApiError } from '../api/client';
import { useSesi } from '../providers/AuthProvider';

export function useAuth() {
  const { terapkanSesi, keluar, pengguna, status } = useSesi();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [medan, setMedan] = useState<Record<string, string>>({});

  const jalankan = useCallback(
    async (aksi: () => Promise<authApi.Sesi>) => {
      setLoading(true);
      setError(null);
      setMedan({});
      try {
        terapkanSesi(await aksi());
        return true;
      } catch (err) {
        setError(authApi.pesanUntuk(err));
        if (err instanceof ApiError && err.medan) setMedan(err.medan);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [terapkanSesi]
  );

  const login = useCallback(
    (nama_pengguna: string, kata_sandi: string) =>
      jalankan(() => authApi.masuk(nama_pengguna, kata_sandi)),
    [jalankan]
  );

  const register = useCallback(
    (data: DataDaftar) => jalankan(() => authApi.daftar(data)),
    [jalankan]
  );

  return { login, register, logout: keluar, loading, error, medan, pengguna, status };
}
