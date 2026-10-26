import { LANGKAH } from '../../konten/beranda';

// "Langkah kecil untuk menemukan arahmu": garis penghubung tergambar (stroke-dashoffset), lalu
// langkah muncul berurutan. Garis mendatar di layar lebar, tegak di HP.

export function Langkah() {
  return (
    <section className="langkah" id="langkah" aria-labelledby="judul-langkah">
      <div className="wadah">
        <h2 id="judul-langkah" className="judul-seksi judul-seksi--kanan langkah__judul">
          {LANGKAH.judul}
        </h2>
        <div className="langkah__alur" data-gerak="garis">
          <svg className="langkah__garis langkah__garis--datar" viewBox="0 0 100 2" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <line x1="0" y1="1" x2="100" y2="1" pathLength={1} />
          </svg>
          <svg className="langkah__garis langkah__garis--tegak" viewBox="0 0 2 100" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <line x1="1" y1="0" x2="1" y2="100" pathLength={1} />
          </svg>
          <ol className="langkah__daftar">
            {LANGKAH.butir.map((b, i) => (
              <li key={b.judul} className="langkah__butir">
                <span className="langkah__nomor" aria-hidden="true">
                  {i + 1}
                </span>
                <h3>{b.judul}</h3>
                <p>{b.isi}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
