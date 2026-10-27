import type { ReactNode } from 'react';

import type { PropsHalaman } from '../halaman/jenis';
import { useGerakMuncul, useSaatTerlihat } from '../lib/gerak';
import { Logo } from './Logo';
import { BAGIAN_BERANDA, NavUtama } from './NavUtama';
import { PenyediaSitus, Tautan, useAlamat } from './Situs';

// Bagian yang sama di semua halaman: tautan lewati, label DRAF, navbar, dan kaki.
// varian "merek": seluruh halaman di atas gradasi biru (beranda). "terang": hanya kepala yang
// bergradasi, isi di permukaan terang (dokumentasi, unduh, privasi, …).

export const TEKS_DRAF = 'DRAF — teks situs ini belum disetujui.';

const KAKI: { judul: string; tautan: { ke: string; label: string }[] }[] = [
  {
    judul: 'Halaman',
    tautan: [
      { ke: '/docs', label: 'Dokumentasi' },
      { ke: '/docs/glossary', label: 'Glosarium' },
      { ke: '/ai', label: 'AI LANJUT' },
      { ke: '/download', label: 'Unduh' },
      { ke: '/docs/technical/releases', label: 'Proses rilis' },
    ],
  },
  {
    judul: 'Bantuan & privasi',
    tautan: [
      { ke: '/docs/testing', label: 'Panduan uji' },
      { ke: '/privacy', label: 'Privasi situs' },
      { ke: '/privacy/app', label: 'Kebijakan privasi aplikasi' },
    ],
  },
];

function Kaki() {
  const ubah = useAlamat();
  return (
    <footer className="kaki" data-loop="">
      <div className="wadah kaki__atas">
        <div className="kaki__merek">
          <Logo className="kaki__logo" />
          <p>Layanan Navigasi Jalur Untuk Kuliah.</p>
          <p>Dikembangkan oleh EDILAKSO Group.</p>
        </div>
        <nav className="kaki__kelompok" aria-label="Jelajahi beranda">
          <p className="kaki__judul">Jelajahi</p>
          <ul>
            {BAGIAN_BERANDA.map((b) => (
              <li key={b.id}>
                <Tautan ke={`/#${b.id}`}>{b.label}</Tautan>
              </li>
            ))}
          </ul>
        </nav>
        {KAKI.map((kelompok) => (
          <nav key={kelompok.judul} className="kaki__kelompok" aria-label={kelompok.judul}>
            <p className="kaki__judul">{kelompok.judul}</p>
            <ul>
              {kelompok.tautan.map((t) => (
                <li key={t.ke}>
                  <Tautan ke={t.ke}>{t.label}</Tautan>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="wadah kaki__bawah">
        <p>LANJUT oleh EDILAKSO Group · aplikasi versi uji 2026 · {TEKS_DRAF}</p>
        <p>
          Huruf Poppins, <a href={ubah('/lisensi/poppins-OFL.txt')}>SIL Open Font License 1.1</a>.
        </p>
      </div>
    </footer>
  );
}

function IsiKerangka({ varian, children }: { varian: 'merek' | 'terang'; children: ReactNode }) {
  useGerakMuncul();
  useSaatTerlihat();
  return (
    <div className={`situs situs--${varian}`}>
      <a className="lewati" href="#isi">
        Langsung ke isi
      </a>
      <p className="draf">{TEKS_DRAF}</p>
      <NavUtama />
      <main id="isi" tabIndex={-1}>
        {children}
      </main>
      <Kaki />
    </div>
  );
}

export function Kerangka({ jalur, akar, children, varian = 'terang' }: PropsHalaman & { children: ReactNode; varian?: 'merek' | 'terang' }) {
  return (
    <PenyediaSitus value={{ jalur, akar }}>
      <IsiKerangka varian={varian}>{children}</IsiKerangka>
    </PenyediaSitus>
  );
}
