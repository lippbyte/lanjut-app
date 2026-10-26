import { useRef, type ReactNode } from 'react';

import { useAkordeon } from '../lib/gerak';

// Daftar tanya-jawab yang bisa dibuka satu per satu (FAQ beranda). Dasarnya <details>, jadi
// bisa dipakai dengan keyboard dan tanpa JavaScript; transisi tingginya tambahan (lib/gerak.ts).

export function Akordeon({ butir }: { butir: { tanya: string; jawab: ReactNode }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  useAkordeon(ref);
  return (
    <div className="akordeon" ref={ref}>
      {butir.map((b) => (
        <details key={b.tanya} className="akordeon__butir">
          <summary className="akordeon__tanya">
            <span>{b.tanya}</span>
            <span className="akordeon__tanda" aria-hidden="true" />
          </summary>
          <div className="akordeon__jawab">
            <p>{b.jawab}</p>
          </div>
        </details>
      ))}
    </div>
  );
}
