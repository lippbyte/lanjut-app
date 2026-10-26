import type { ReactNode } from 'react';

import { Ikon } from './Ikon';

/** Kotak catatan di dalam teks (callout). `penting` untuk peringatan yang tidak boleh terlewat. */
export function Catatan({ judul, nada = 'info', children }: { judul?: string; nada?: 'info' | 'penting'; children: ReactNode }) {
  return (
    <aside className={`catatan catatan--${nada}`} aria-label={judul ?? (nada === 'penting' ? 'Penting' : 'Catatan')}>
      <Ikon nama={nada === 'penting' ? 'awas' : 'info'} className="catatan__ikon" />
      <div className="catatan__isi">
        {judul ? <p className="catatan__judul">{judul}</p> : null}
        {children}
      </div>
    </aside>
  );
}
