import { Fragment } from 'react';

import kebijakan from '../data/kebijakan-privasi.json';
import { Catatan } from '../komponen/Catatan';
import { Kerangka } from '../komponen/Kerangka';
import { Tautan } from '../komponen/Situs';
import type { PropsHalaman } from './jenis';

type Bagian = { judul: string; paragraf?: string[]; butir?: string[] };

// Kebijakan privasi APLIKASI (/privacy/app; alamat lama kebijakan-privasi.html dialihkan ke
// sini). Data ditulis `npm run landing-kebijakan` (folder LANJUT_App/server) dari teks yang sama
// dengan app; isi dan urutannya apa adanya. Status DRAF dari datanya.
export default function KebijakanPrivasi({ jalur, akar }: PropsHalaman) {
  const isi = kebijakan.isi as Bagian[];
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="wadah wadah--baca">
        <article className="prosa halaman-teks" aria-labelledby="judul-kebijakan">
          <header>
            <p className="eyebrow">Privasi</p>
            <h1 id="judul-kebijakan">Kebijakan Privasi Aplikasi</h1>
            <p className="meta">Versi {kebijakan.versi} · DRAF, belum berlaku.</p>
          </header>
          <Catatan nada="penting" judul={kebijakan.status}>
            <p>
              <strong>Ringkasan</strong>
            </p>
            <ul>
              {kebijakan.ringkasan.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <p>Masuk dengan kode email dan masuk dengan Google belum dibahas di kebijakan ini. Keduanya sedang ditinjau.</p>
          </Catatan>
          {/* Isi statis yang tidak pernah diurut ulang: indeks sebagai key. */}
          {isi.map((b, i) => (
            <Fragment key={i}>
              <h2>{b.judul}</h2>
              {(b.paragraf ?? []).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {b.butir ? (
                <ul>
                  {b.butir.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ))}
          <p className="meta">
            Privasi website ini dijelaskan terpisah di <Tautan ke="/privacy">Privasi situs</Tautan>.
          </p>
        </article>
      </div>
    </Kerangka>
  );
}
