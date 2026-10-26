import type { ReactNode } from 'react';

// Kartu gaya acuan: kepala bergradasi biru (teks putih besar) dan isi di bawahnya tanpa latar.
// `rata` mengikuti acuan: kartu kiri rata kiri, tengah rata tengah, kanan rata kanan (di layar
// lebar; di HP selalu rata kiri supaya mudah dibaca).

type PropsKartu = {
  judul: string;
  rata?: 'kiri' | 'tengah' | 'kanan';
  className?: string;
  children: ReactNode;
};

export function Kartu({ judul, rata = 'kiri', className = '', children }: PropsKartu) {
  return (
    <article className={`kartu kartu--${rata} ${className}`.trim()}>
      <div className="kartu__kepala">
        <h3 className="kartu__judul">{judul}</h3>
      </div>
      <div className="kartu__isi">{children}</div>
    </article>
  );
}
