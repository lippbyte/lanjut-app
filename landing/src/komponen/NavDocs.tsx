import { KATEGORI, artikelKategori } from '../konten/docs';
import { Tautan, useSitus } from './Situs';

/** Daftar kategori dan artikel dokumentasi; dipakai di sidebar (desktop) dan menu docs (HP). */
export function DaftarDocs() {
  const { jalur } = useSitus();
  return (
    <ul className="nav-docs">
      <li>
        <Tautan ke="/docs" className="nav-docs__indeks" aria-current={jalur === 'docs' ? 'page' : undefined}>
          Semua dokumentasi
        </Tautan>
      </li>
      {KATEGORI.map((k) => (
        <li key={k.id}>
          <p className="nav-docs__kategori">{k.judul}</p>
          <ul>
            {artikelKategori(k.id).map((a) => (
              <li key={a.jalur}>
                <Tautan ke={`/${a.jalur}`} aria-current={a.jalur === jalur ? 'page' : undefined}>
                  {a.judul}
                </Tautan>
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

/** Sidebar desktop + menu yang bisa dibuka di layar kecil. */
export function NavDocs() {
  return (
    <>
      <nav className="docs__samping" aria-label="Dokumentasi">
        <DaftarDocs />
      </nav>
      <details className="docs__menu">
        <summary>Menu dokumentasi</summary>
        <nav aria-label="Dokumentasi">
          <DaftarDocs />
        </nav>
      </details>
    </>
  );
}
