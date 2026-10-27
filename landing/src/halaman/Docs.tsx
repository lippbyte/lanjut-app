import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { PitaHalaman } from '../komponen/PitaHalaman';
import { Tautan } from '../komponen/Situs';
import { Label } from '../komponen/Status';
import { KATEGORI, artikelKategori } from '../konten/docs';
import type { PropsHalaman } from './jenis';

// Halaman indeks /docs: pita judul dengan pintasan kategori, lalu satu kartu per kategori
// (kepala bergradasi seperti kartu beranda) yang berisi daftar artikelnya.
export default function Docs({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <PitaHalaman
        idJudul="judul-docs"
        judul="Semua yang perlu kamu tahu tentang LANJUT"
        lebar="penuh"
        atas={<p className="eyebrow eyebrow--terang">Dokumentasi</p>}
      >
        <p className="pita__pengantar">Produk, bisnis, teknis, dan bantuan, terbuka untuk siapa saja tanpa akun.</p>
        <p className="pita__catatan">Rencana dan hipotesis diberi label agar tidak terbaca sebagai fakta final.</p>
        <nav aria-label="Pintasan dokumentasi">
          <ul className="pita__pintas">
            {KATEGORI.map((k) => (
              <li key={k.id}>
                <a href={`#kategori-${k.id}`} className="pita__pil">
                  {k.judul}
                </a>
              </li>
            ))}
            <li>
              <Tautan ke="/docs/glossary" className="pita__pil pita__pil--halaman">
                Glosarium
                <Ikon nama="panah" />
              </Tautan>
            </li>
          </ul>
        </nav>
      </PitaHalaman>

      <div className="wadah docs-indeks">
        {KATEGORI.map((k, i) => (
          <section key={k.id} id={`kategori-${k.id}`} className="kartu-docs" aria-labelledby={`judul-kategori-${k.id}`} data-gerak="naik">
            <div className="kartu-docs__kepala">
              <p className="kartu-docs__nomor" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </p>
              <h2 id={`judul-kategori-${k.id}`}>{k.judul}</h2>
              <p className="kartu-docs__ringkas">{k.ringkas}</p>
            </div>
            <ul className="kartu-docs__daftar">
              {artikelKategori(k.id).map((a) => (
                <li key={a.jalur}>
                  <Tautan ke={`/${a.jalur}`}>
                    <span className="kartu-docs__judul">
                      {a.judul}
                      {a.label ? <Label nada="hangat">{a.label}</Label> : null}
                      <Ikon nama="panah" />
                    </span>
                    <span className="kartu-docs__deskripsi">{a.deskripsi}</span>
                  </Tautan>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Kerangka>
  );
}
