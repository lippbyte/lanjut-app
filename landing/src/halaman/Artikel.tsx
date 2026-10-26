import { BlokDocs } from '../komponen/BlokDocs';
import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { NavDocs } from '../komponen/NavDocs';
import { Tautan } from '../komponen/Situs';
import { Label } from '../komponen/Status';
import { ARTIKEL, KATEGORI, artikel as cariArtikel } from '../konten/docs';
import { formatTanggal } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Artikel dokumentasi (PRD-landpage §8.2): sidebar kategori, remah roti, daftar isi, tanggal
// pembaruan, label status untuk rencana/hipotesis, dan tautan ke artikel sebelum/sesudahnya.

function DaftarIsi({ bagian, id }: { bagian: { id: string; judul: string }[]; id: string }) {
  return (
    <ol className="daftar-isi" id={id}>
      {bagian.map((b) => (
        <li key={b.id}>
          <a href={`#${b.id}`}>{b.judul}</a>
        </li>
      ))}
    </ol>
  );
}

export default function Artikel({ jalur, akar }: PropsHalaman) {
  const a = cariArtikel(jalur);
  if (!a) throw new Error(`artikel tidak dikenal: ${jalur}`);
  const kategori = KATEGORI.find((k) => k.id === a.kategori)!;
  const i = ARTIKEL.indexOf(a);
  const sebelum = ARTIKEL[i - 1];
  const sesudah = ARTIKEL[i + 1];
  const panjang = a.bagian.length >= 3;

  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="wadah docs">
        <NavDocs />
        <article className="docs__artikel" aria-labelledby="judul-artikel">
          <nav className="remah" aria-label="Remah roti">
            <ol>
              <li>
                <Tautan ke="/docs">Dokumentasi</Tautan>
              </li>
              <li>{kategori.judul}</li>
              <li aria-current="page">{a.judul}</li>
            </ol>
          </nav>
          <header className="docs__kepala">
            <h1 id="judul-artikel">{a.judul}</h1>
            {a.label ? (
              <p className="docs__label">
                <Label nada="hangat">{a.label}</Label>
                <span>{a.label === 'Hipotesis' ? 'Belum diputuskan. Bukan rencana final.' : 'Bisa berubah. Tanpa tanggal rilis.'}</span>
              </p>
            ) : null}
            <p className="docs__ringkasan">{a.ringkasan}</p>
            <p className="meta">
              Diperbarui <time dateTime={a.diperbarui}>{formatTanggal(a.diperbarui)}</time>
            </p>
          </header>

          {panjang ? (
            <details className="docs__isi-hp">
              <summary>Di halaman ini</summary>
              <DaftarIsi bagian={a.bagian} id="daftar-isi-hp" />
            </details>
          ) : null}

          <div className="prosa">
            {a.bagian.map((b) => (
              <section key={b.id} id={b.id} aria-labelledby={`judul-${b.id}`}>
                <h2 id={`judul-${b.id}`}>{b.judul}</h2>
                {b.blok.map((blok, j) => (
                  <BlokDocs key={j} blok={blok} />
                ))}
              </section>
            ))}
          </div>

          <nav className="docs__sebelah" aria-label="Artikel lain">
            {sebelum ? (
              <Tautan ke={`/${sebelum.jalur}`} className="docs__sebelah-tautan" rel="prev">
                <span className="meta">
                  <Ikon nama="kembali" /> Sebelumnya
                </span>
                {sebelum.judul}
              </Tautan>
            ) : (
              <span />
            )}
            {sesudah ? (
              <Tautan ke={`/${sesudah.jalur}`} className="docs__sebelah-tautan docs__sebelah-tautan--sesudah" rel="next">
                <span className="meta">
                  Berikutnya <Ikon nama="panah" />
                </span>
                {sesudah.judul}
              </Tautan>
            ) : null}
          </nav>
        </article>
        {panjang ? (
          <nav className="docs__toc" aria-label="Di halaman ini">
            <p className="docs__toc-judul">Di halaman ini</p>
            <DaftarIsi bagian={a.bagian} id="daftar-isi" />
          </nav>
        ) : null}
      </div>
    </Kerangka>
  );
}
