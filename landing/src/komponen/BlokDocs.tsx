import type { Blok } from '../konten/docs';
import { ARTI_STATUS, FITUR, type StatusFitur } from '../konten/fitur';
import { BlokKode } from './BlokKode';
import { Catatan } from './Catatan';
import { Status } from './Status';
import { TeksKaya } from './TeksKaya';

// Perender blok isi dokumentasi (konten/docs.ts). Hanya elemen React biasa.

function DaftarFitur({ kelompok }: { kelompok: string[] }) {
  return (
    <ul className="daftar-fitur">
      {FITUR.filter((f) => kelompok.includes(f.kelompok)).map((f) => (
        <li key={f.id} className="daftar-fitur__butir">
          <div className="daftar-fitur__kepala">
            <h3>{f.nama}</h3>
            <Status status={f.status} />
          </div>
          <p>{f.ringkas}</p>
          <p className="meta">Untuk: {f.untuk}</p>
          {f.catatan ? <p className="daftar-fitur__catatan">{f.catatan}</p> : null}
        </li>
      ))}
    </ul>
  );
}

const URUTAN_STATUS: StatusFitur[] = ['tersedia', 'pengembangan', 'rencana'];

export function BlokDocs({ blok }: { blok: Blok }) {
  switch (blok.jenis) {
    case 'p':
      return (
        <p>
          <TeksKaya teks={blok.teks} />
        </p>
      );
    case 'daftar': {
      const Daftar = blok.urut ? 'ol' : 'ul';
      return (
        <Daftar>
          {blok.butir.map((b, i) => (
            <li key={i}>
              <TeksKaya teks={b} />
            </li>
          ))}
        </Daftar>
      );
    }
    case 'catatan':
      return (
        <Catatan judul={blok.judul} nada={blok.nada}>
          <p>
            <TeksKaya teks={blok.teks} />
          </p>
        </Catatan>
      );
    case 'tabel':
      return (
        // Tabel boleh digulir mendatar di dalam kotaknya sendiri; halamannya tidak.
        <div className="tabel-gulir" role="region" aria-label={blok.judul} tabIndex={0}>
          <table>
            <caption className="sr-only">{blok.judul}</caption>
            <thead>
              <tr>
                {blok.kepala.map((k) => (
                  <th key={k} scope="col">
                    {k}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blok.baris.map((baris, i) => (
                <tr key={i}>
                  {baris.map((sel, j) =>
                    j === 0 ? (
                      <th key={j} scope="row">
                        <TeksKaya teks={sel} />
                      </th>
                    ) : (
                      <td key={j}>
                        <TeksKaya teks={sel} />
                      </td>
                    )
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case 'kode':
      return <BlokKode bahasa={blok.bahasa} judul={blok.judul} kode={blok.kode} />;
    case 'fitur':
      return <DaftarFitur kelompok={blok.kelompok} />;
    case 'arti-status':
      return (
        <dl className="arti-status">
          {URUTAN_STATUS.map((s) => (
            <div key={s}>
              <dt>
                <Status status={s} />
              </dt>
              <dd>{ARTI_STATUS[s]}</dd>
            </div>
          ))}
        </dl>
      );
  }
}
