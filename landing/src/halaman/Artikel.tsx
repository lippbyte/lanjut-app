import { useEffect, useState } from 'react';

import { BlokDocs } from '../komponen/BlokDocs';
import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { NavDocs } from '../komponen/NavDocs';
import { PitaHalaman } from '../komponen/PitaHalaman';
import { Tautan } from '../komponen/Situs';
import { Label } from '../komponen/Status';
import { ARTIKEL, KATEGORI, artikel as cariArtikel } from '../konten/docs';
import { formatTanggal } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Artikel dokumentasi (PRD-landpage §8.2): pita judul dengan remah roti, sidebar kategori, daftar
// isi yang menandai bagian yang sedang dibaca, tanggal pembaruan, label status untuk
// rencana/hipotesis, blok kode gelap, dan tautan ke artikel sebelum/sesudahnya.

/** Bagian terakhir yang judulnya sudah melewati bagian atas layar. Null sebelum JS jalan. */
function useBagianAktif(ids: string[]): string | null {
  const [aktif, setAktif] = useState<string | null>(null);
  const kunci = ids.join(' ');
  useEffect(() => {
    const daftar = kunci.split(' ');
    let bingkai = 0;
    const periksa = () => {
      bingkai = 0;
      let hasil: string | null = null;
      for (const id of daftar) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) hasil = id;
      }
      setAktif(hasil);
    };
    const saatGulir = () => {
      if (!bingkai) bingkai = window.requestAnimationFrame(periksa);
    };
    periksa();
    window.addEventListener('scroll', saatGulir, { passive: true });
    window.addEventListener('resize', saatGulir);
    return () => {
      window.removeEventListener('scroll', saatGulir);
      window.removeEventListener('resize', saatGulir);
      if (bingkai) window.cancelAnimationFrame(bingkai);
    };
  }, [kunci]);
  return aktif;
}

function DaftarIsi({ bagian, id, aktif }: { bagian: { id: string; judul: string }[]; id: string; aktif: string | null }) {
  return (
    <ol className="daftar-isi" id={id}>
      {bagian.map((b) => (
        <li key={b.id}>
          <a href={`#${b.id}`} aria-current={b.id === aktif ? 'true' : undefined}>
            {b.judul}
          </a>
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
  const aktif = useBagianAktif(a.bagian.map((b) => b.id));

  return (
    <Kerangka jalur={jalur} akar={akar}>
      <PitaHalaman
        idJudul="judul-artikel"
        judul={a.judul}
        atas={
          <nav className="remah" aria-label="Remah roti">
            <ol>
              <li>
                <Tautan ke="/docs">Dokumentasi</Tautan>
              </li>
              <li>
                <Tautan ke={`/docs#kategori-${kategori.id}`}>{kategori.judul}</Tautan>
              </li>
              <li aria-current="page">{a.judul}</li>
            </ol>
          </nav>
        }
      >
        {a.label ? (
          <p className="pita__label">
            <Label nada="hangat">{a.label}</Label>
            <span>{a.label === 'Hipotesis' ? 'Belum diputuskan. Bukan rencana final.' : 'Bisa berubah. Tanpa tanggal rilis.'}</span>
          </p>
        ) : null}
        <p className="pita__pengantar">{a.ringkasan}</p>
        <p className="pita__meta">
          Diperbarui <time dateTime={a.diperbarui}>{formatTanggal(a.diperbarui)}</time>
        </p>
      </PitaHalaman>

      <div className="wadah docs">
        <NavDocs />
        <article className="docs__artikel" aria-labelledby="judul-artikel">
          {panjang ? (
            <details className="docs__isi-hp">
              <summary>Di halaman ini</summary>
              <DaftarIsi bagian={a.bagian} id="daftar-isi-hp" aktif={aktif} />
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
                <span className="docs__sebelah-arah">
                  <Ikon nama="kembali" /> Sebelumnya
                </span>
                {sebelum.judul}
              </Tautan>
            ) : (
              <span />
            )}
            {sesudah ? (
              <Tautan ke={`/${sesudah.jalur}`} className="docs__sebelah-tautan docs__sebelah-tautan--sesudah" rel="next">
                <span className="docs__sebelah-arah">
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
            <DaftarIsi bagian={a.bagian} id="daftar-isi" aktif={aktif} />
          </nav>
        ) : null}
      </div>
    </Kerangka>
  );
}
