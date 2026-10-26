// Ikon garis kecil (SVG sebaris, tanpa berkas atau pustaka). Selalu dekoratif: makna
// disampaikan oleh teks di sebelahnya, jadi aria-hidden.

const JALUR = {
  panah: 'M5 12h14M13 6l6 6-6 6',
  unduh: 'M12 4v11M7 10l5 5 5-5M5 20h14',
  luar: 'M14 5h5v5M19 5l-8 8M17 14v5H5V7h5',
  kembali: 'M19 12H5M11 6l-6 6 6 6',
  menu: 'M4 7h16M4 12h16M4 17h16',
  info: 'M12 11v6M12 7.5v.5M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z',
  awas: 'M12 9v4M12 16.5v.5M10.3 4.2 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 4.2a2 2 0 0 0-3.4 0z',
} as const;

export type NamaIkon = keyof typeof JALUR;

export function Ikon({ nama, className = 'ikon' }: { nama: NamaIkon; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
      <path d={JALUR[nama]} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
