import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { Tautan } from '../komponen/Situs';
import { KATEGORI, artikelKategori } from '../konten/docs';
import type { PropsHalaman } from './jenis';

// Halaman indeks /docs: semua kategori dan artikel dalam satu pandangan (tanpa kartu berlapis).
export default function Docs({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="wadah docs-indeks">
        <header className="docs-indeks__kepala">
          <p className="eyebrow">Dokumentasi</p>
          <h1>Semua yang perlu kamu tahu tentang LANJUT</h1>
          <p className="pengantar">
            Produk, bisnis, teknis, dan bantuan. Terbuka untuk siapa saja tanpa akun. Rencana dan hipotesis diberi label
            agar tidak terbaca sebagai fakta final.
          </p>
        </header>
        <div className="docs-indeks__isi">
          {KATEGORI.map((k, i) => (
            <section key={k.id} className="docs-indeks__kategori" aria-labelledby={`kategori-${k.id}`} data-gerak="naik">
              <p className="docs-indeks__nomor" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <div>
                <h2 id={`kategori-${k.id}`}>{k.judul}</h2>
                <p className="docs-indeks__ringkas">{k.ringkas}</p>
              </div>
              <ul className="docs-indeks__artikel">
                {artikelKategori(k.id).map((a) => (
                  <li key={a.jalur}>
                    <Tautan ke={`/${a.jalur}`}>
                      <span className="docs-indeks__judul">
                        {a.judul}
                        <Ikon nama="panah" />
                      </span>
                      <span className="docs-indeks__deskripsi">{a.deskripsi}</span>
                    </Tautan>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </Kerangka>
  );
}
