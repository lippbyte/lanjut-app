import { Fragment } from 'react';

import { AJAKAN } from '../../konten/beranda';

// "Apa yang harus dilakukan mulai sekarang?": muncul kata demi kata. Kalimatnya tetap utuh di
// HTML (spasi di antara kata), jadi pembaca layar membacanya sebagai satu kalimat.

export function Ajakan() {
  const kata = AJAKAN.split(' ');
  return (
    <section className="ajakan" aria-labelledby="judul-ajakan">
      <div className="wadah">
        <h2 id="judul-ajakan" className="judul-seksi judul-seksi--tengah ajakan__judul" data-gerak="kata">
          {kata.map((k, i) => (
            <Fragment key={i}>
              {i ? ' ' : null}
              <span className="kata">{k}</span>
            </Fragment>
          ))}
        </h2>
      </div>
    </section>
  );
}
