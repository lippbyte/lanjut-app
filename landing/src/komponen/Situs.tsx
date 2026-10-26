import { createContext, useContext, type AnchorHTMLAttributes, type ReactNode } from 'react';

import { alamat } from '../lib/situs';

// Halaman yang sedang dirender: dipakai semua tautan internal untuk menghitung alamat relatif.
type Situs = { akar: string; jalur: string };

const SitusKonteks = createContext<Situs>({ akar: './', jalur: '' });

export const PenyediaSitus = SitusKonteks.Provider;

export const useSitus = () => useContext(SitusKonteks);

/** Pengubah jalur situs ('/docs/faq', '/gambar/x.png') menjadi alamat relatif halaman ini. */
export function useAlamat(): (tujuan: string) => string {
  const { akar } = useSitus();
  return (tujuan) => alamat(akar, tujuan);
}

type PropsTautan = { ke: string; children: ReactNode } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>;

/** Tautan ke jalur situs atau alamat luar (https:). Tautan luar tidak membawa referrer. */
export function Tautan({ ke, children, ...lain }: PropsTautan) {
  const ubah = useAlamat();
  const luar = /^https?:/i.test(ke);
  return (
    <a href={ubah(ke)} {...(luar ? { rel: 'noopener noreferrer' } : {})} {...lain}>
      {children}
    </a>
  );
}
