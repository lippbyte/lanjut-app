import { useEffect, useRef } from 'react';

import { Ikon } from './Ikon';
import { Logo } from './Logo';
import { Tautan, useSitus } from './Situs';
import { Tombol } from './Tombol';

// Navbar acuan (design/reference-landing.png): tombol Unduh, pill navigasi, logo di kanan.
// Sama di semua halaman. Di beranda, tautan bagian berupa jangkar (#tentang); di halaman lain
// tautan yang sama mengarah ke beranda (/#tentang).

export const BAGIAN_BERANDA = [
  { id: 'tentang', label: 'Tentang' },
  { id: 'kenapa-smk', label: 'Kenapa SMK?' },
  { id: 'solusi', label: 'Solusi' },
  { id: 'fitur', label: 'Fitur' },
  { id: 'faq', label: 'FAQ' },
];

function DaftarTautan({ kelas }: { kelas: string }) {
  const { jalur } = useSitus();
  const diBeranda = jalur === '';
  const diDocs = jalur === 'docs' || jalur.startsWith('docs/');
  return (
    <ul className={kelas}>
      {BAGIAN_BERANDA.map((b) => (
        <li key={b.id}>
          <Tautan ke={diBeranda ? `#${b.id}` : `/#${b.id}`} className="nav__tautan">
            {b.label}
          </Tautan>
        </li>
      ))}
      <li>
        <Tautan ke="/docs" className={diDocs ? 'nav__tautan nav__tautan--aktif' : 'nav__tautan'} aria-current={jalur === 'docs' ? 'page' : undefined}>
          Dokumentasi
        </Tautan>
      </li>
    </ul>
  );
}

/** Menu layar kecil: <details>, jadi tetap bisa dibuka tanpa JavaScript dan dengan keyboard. */
function MenuHp() {
  const ref = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    const tekan = (e: KeyboardEvent) => {
      if (e.key !== 'Escape' || !d.open) return;
      d.open = false;
      d.querySelector('summary')?.focus();
    };
    const klik = (e: MouseEvent) => {
      if (!d.open) return;
      const t = e.target as Element;
      // Tertutup saat memilih tautan (termasuk jangkar di halaman yang sama) atau klik di luar.
      if (!d.contains(t) || t.closest('a')) d.open = false;
    };
    document.addEventListener('keydown', tekan);
    document.addEventListener('click', klik);
    return () => {
      document.removeEventListener('keydown', tekan);
      document.removeEventListener('click', klik);
    };
  }, []);
  return (
    <details className="menu-hp" ref={ref}>
      <summary className="menu-hp__tombol">
        <Ikon nama="menu" />
        <span>Menu</span>
      </summary>
      <div className="menu-hp__panel">
        <nav aria-label="Utama">
          <DaftarTautan kelas="menu-hp__daftar" />
        </nav>
      </div>
    </details>
  );
}

export function NavUtama() {
  const { jalur } = useSitus();
  return (
    <header className="kepala">
      <div className="wadah kepala__baris">
        <Tombol ke="/download" ukuran="kecil" className="kepala__unduh" aria-current={jalur === 'download' ? 'page' : undefined}>
          Unduh
        </Tombol>
        <nav className="nav" aria-label="Utama">
          <DaftarTautan kelas="nav__daftar" />
        </nav>
        <MenuHp />
        <Logo className="kepala__logo" />
      </div>
    </header>
  );
}
