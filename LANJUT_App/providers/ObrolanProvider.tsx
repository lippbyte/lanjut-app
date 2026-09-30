import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

import type { GayaBelajar } from '../api/auth';
import { dapatkanBalasanBot, type BalasanBot } from '../lib/chatStub';

export type Pesan = { id: number; dari: 'pengguna' | 'bot' } & BalasanBot;

// Jeda kecil sebelum balasan tampil, supaya terasa seperti percakapan.
const JEDA_BALASAN_MS = 700;

type NilaiObrolan = {
  pesan: Pesan[];
  mengetik: boolean;
  kirim: (isi: string, gayaBelajar: GayaBelajar | null) => void;
};

const Konteks = createContext<NilaiObrolan | null>(null);

/**
 * Riwayat Ngobrol Bareng LANJUT (LANJUT_032) — HANYA di memori.
 *
 * Tidak dikirim ke server, tidak ditulis ke AsyncStorage. Provider ini
 * dipasang di layout (app) dengan key = id pengguna, jadi riwayat bertahan
 * saat pindah layar (mis. ke Gaya Belajar lalu kembali), tetapi hilang saat
 * keluar akun, ganti akun, atau aplikasi ditutup. Keputusan menyimpan riwayat
 * lebih lama menyentuh data anak (UU PDP Pasal 25) dan menunggu Khalifa.
 */
export function ObrolanProvider({ namaTampilan, children }: { namaTampilan?: string; children: React.ReactNode }) {
  const penghitung = useRef(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mengetik, setMengetik] = useState(false);
  const [pesan, setPesan] = useState<Pesan[]>(() => [
    {
      id: 0,
      dari: 'bot',
      teks: `Hai${namaTampilan ? `, ${namaTampilan}` : ''}! Aku teman ngobrolmu di LANJUT. Mau cerita soal minat, cara belajar, atau rencana kuliahmu?`,
    },
  ]);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const kirim = useCallback(
    (isi: string, gayaBelajar: GayaBelajar | null) => {
      if (mengetik) return;
      setPesan((p) => [...p, { id: penghitung.current++, dari: 'pengguna', teks: isi }]);
      setMengetik(true);
      timer.current = setTimeout(() => {
        // STUB, bukan AI — lihat lib/chatStub.ts. Tidak ada panggilan jaringan.
        const balasan = dapatkanBalasanBot(isi, gayaBelajar);
        setPesan((p) => [...p, { id: penghitung.current++, dari: 'bot', ...balasan }]);
        setMengetik(false);
      }, JEDA_BALASAN_MS);
    },
    [mengetik]
  );

  return <Konteks.Provider value={{ pesan, mengetik, kirim }}>{children}</Konteks.Provider>;
}

export function useObrolan(): NilaiObrolan {
  const nilai = useContext(Konteks);
  if (!nilai) throw new Error('useObrolan() harus dipakai di dalam <ObrolanProvider>.');
  return nilai;
}
