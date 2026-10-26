import type { ReactNode } from 'react';

import { Tautan } from './Situs';

// Penanda sebaris untuk konten dokumentasi: **tebal**, [label](/jalur-situs atau https://…),
// dan `kode`. Hasilnya elemen React biasa (teks selalu di-escape), bukan HTML mentah.
export const POLA_TEKS = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)|`([^`]+)`/g;

export function uraiTeks(teks: string): ReactNode[] {
  const hasil: ReactNode[] = [];
  let posisi = 0;
  for (const m of teks.matchAll(POLA_TEKS)) {
    const i = m.index ?? 0;
    if (i > posisi) hasil.push(teks.slice(posisi, i));
    const k = hasil.length;
    if (m[1] !== undefined) hasil.push(<strong key={k}>{m[1]}</strong>);
    else if (m[2] !== undefined) {
      const luar = /^https?:/i.test(m[3]);
      hasil.push(
        <Tautan key={k} ke={m[3]} className={luar ? 'tautan-luar' : undefined}>
          {m[2]}
          {luar ? <span className="sr-only"> (situs luar)</span> : null}
        </Tautan>
      );
    } else hasil.push(<code key={k}>{m[4]}</code>);
    posisi = i + m[0].length;
  }
  if (posisi < teks.length) hasil.push(teks.slice(posisi));
  return hasil;
}

export function TeksKaya({ teks }: { teks: string }) {
  return <>{uraiTeks(teks)}</>;
}
