import { Fragment } from 'react';

import kebijakan from '../data/kebijakan-privasi.json';
import { Kaki, Kepala, LabelDraf } from '../komponen/Kerangka';

type Bagian = { judul: string; paragraf?: string[]; butir?: string[] };

// Kebijakan privasi. Data ditulis `npm run landing-kebijakan` (folder LANJUT_App/server) dari
// teks kebijakan yang sama dengan app; susunan sama dengan halaman 083. Status DRAF dari datanya.
export function KebijakanPrivasi() {
  const isi = kebijakan.isi as Bagian[];
  return (
    <>
      <LabelDraf>{kebijakan.status}</LabelDraf>
      <Kepala />
      <main>
        <div className="bungkus">
          <h1>Kebijakan Privasi</h1>
          <p className="kecil">Versi {kebijakan.versi} · DRAF, belum berlaku.</p>
          <div className="peringatan" role="note">
            <p>
              <strong>Ringkasan</strong>
            </p>
            <ul className="butir">
              {kebijakan.ringkasan.map((t, i) => (
                <li key={i}>{t}</li>
              ))}
            </ul>
            <p>Masuk dengan kode email dan masuk dengan Google belum dibahas di kebijakan ini. Keduanya sedang ditinjau.</p>
          </div>
          {/* Isi statis yang tidak pernah diurut ulang: indeks sebagai key. */}
          {isi.map((b, i) => (
            <Fragment key={i}>
              <h2>{b.judul}</h2>
              {(b.paragraf ?? []).map((p, j) => (
                <p key={j}>{p}</p>
              ))}
              {b.butir ? (
                <ul className="butir">
                  {b.butir.map((t, j) => (
                    <li key={j}>{t}</li>
                  ))}
                </ul>
              ) : null}
            </Fragment>
          ))}
        </div>
      </main>
      <Kaki
        tautan={[
          { href: './', label: 'Halaman utama' },
          { href: 'panduan-uji.html', label: 'Panduan uji' },
        ]}
      />
    </>
  );
}
