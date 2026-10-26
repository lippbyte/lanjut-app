import { Akordeon } from '../../komponen/Akordeon';
import { Ikon } from '../../komponen/Ikon';
import { Tautan } from '../../komponen/Situs';
import { FAQ } from '../../konten/beranda';

// FAQ: akordeon dengan transisi tinggi yang halus; jawaban satu kalimat, rincian di dokumentasi.

export function Faq() {
  return (
    <section className="faq" id="faq" aria-labelledby="judul-faq">
      <div className="wadah faq__tata">
        <div className="faq__kepala">
          <h2 id="judul-faq" className="judul-seksi">
            {FAQ.judul}
          </h2>
          <p>
            <Tautan ke="/docs/faq" className="tautan-panah">
              Pertanyaan lain di dokumentasi <Ikon nama="panah" />
            </Tautan>
          </p>
        </div>
        <Akordeon butir={FAQ.butir} />
      </div>
    </section>
  );
}
