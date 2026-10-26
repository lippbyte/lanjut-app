import { LABEL_STATUS, type StatusFitur } from '../konten/fitur';

/**
 * Label status fitur. Maknanya ada di teks (Tersedia / Dalam Pengembangan / Direncanakan);
 * bentuk ikon (penuh, setengah, garis putus) dan warna hanya pendukung.
 */
export function Status({ status }: { status: StatusFitur }) {
  return (
    <span className={`status status--${status}`}>
      <span className="status__ikon" aria-hidden="true" />
      {LABEL_STATUS[status]}
    </span>
  );
}

/** Label kejujuran untuk contoh dan tangkapan layar: "Contoh konsep", "Hipotesis", dst. */
export function Label({ children, nada = 'netral' }: { children: string; nada?: 'netral' | 'hangat' }) {
  return <span className={`label label--${nada}`}>{children}</span>;
}
