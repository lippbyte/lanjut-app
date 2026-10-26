import type { AnchorHTMLAttributes, ReactNode } from 'react';

import { Ikon, type NamaIkon } from './Ikon';
import { Tautan } from './Situs';

// Tombol pill. Selalu tautan (<a>) karena semua aksinya berpindah halaman atau bagian.
// "utama": pill terang bergradasi dengan teks biru tua (keputusan kontras opsi a).
// "kedua": garis putih di atas permukaan merek.

type PropsTombol = {
  ke: string;
  varian?: 'utama' | 'kedua';
  ukuran?: 'kecil' | 'besar';
  ikon?: NamaIkon;
  children: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

export function Tombol({ ke, varian = 'utama', ukuran, ikon, children, className = '', ...lain }: PropsTombol) {
  const kelas = ['tombol', `tombol--${varian}`, ukuran ? `tombol--${ukuran}` : '', className].filter(Boolean).join(' ');
  return (
    <Tautan ke={ke} className={kelas} {...lain}>
      {ikon ? <Ikon nama={ikon} /> : null}
      {children}
    </Tautan>
  );
}
