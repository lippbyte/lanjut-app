import { Status } from '../../komponen/Status';
import { SOLUSI } from '../../konten/beranda';

// "Dari masalah ke langkah nyata": setiap masalah dipasangkan dengan fitur yang membantu dan
// statusnya yang sebenarnya. Per baris: masalah tampil, panah tumbuh, lalu solusinya masuk.

export function Solusi() {
  return (
    <section className="solusi" id="solusi" aria-labelledby="judul-solusi">
      <div className="wadah">
        <h2 id="judul-solusi" className="judul-seksi judul-seksi--tengah">
          {SOLUSI.judul}
        </h2>
        <ul className="solusi__daftar">
          {SOLUSI.baris.map((b) => (
            <li key={b.masalah} className="solusi__baris" data-gerak="sambung">
              <p className="solusi__masalah">{b.masalah}</p>
              <span className="solusi__panah" aria-hidden="true" />
              <div className="solusi__jawab">
                <p className="solusi__fitur">
                  <span className="sr-only">Dibantu oleh: </span>
                  {b.fitur} <Status status={b.status} />
                </p>
                <p className="solusi__isi">{b.isi}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
