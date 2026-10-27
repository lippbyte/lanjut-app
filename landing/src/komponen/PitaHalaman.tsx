import type { ReactNode } from 'react';

// Pita judul halaman di bawah navbar (permukaan terang). Gradasinya menyambung gradasi kepala
// (blue-800 → blue-900), jadi kepala dan pita terbaca sebagai satu bidang; teks putih ≥ 6,39:1.
export function PitaHalaman({
  idJudul,
  judul,
  atas,
  children,
  lebar = 'baca',
}: {
  idJudul: string;
  judul: ReactNode;
  /** Di atas judul: eyebrow atau remah roti. */
  atas?: ReactNode;
  /** Di bawah judul: pengantar, meta, label. */
  children?: ReactNode;
  lebar?: 'baca' | 'penuh';
}) {
  return (
    <header className={`pita pita--${lebar}`}>
      <div className="wadah pita__isi">
        {atas}
        <h1 id={idJudul} className="pita__judul">
          {judul}
        </h1>
        {children}
      </div>
    </header>
  );
}
