import { MASALAH } from '../../konten/beranda';

// "Memilih masa depan tidak selalu mudah": judul muncul dari kabur ke tajam, lalu lima masalah
// zigzag masuk bergantian dari kiri dan kanan (masing-masing saat terlihat).

export function Masalah() {
  return (
    <section className="masalah" id="masalah" aria-labelledby="judul-masalah">
      <div className="wadah">
        <h2 id="judul-masalah" className="judul-seksi judul-seksi--tengah masalah__judul" data-gerak="kabur">
          {MASALAH.judul}
        </h2>
        <ol className="masalah__daftar">
          {MASALAH.butir.map((b, i) => {
            const sisi = i % 2 ? 'kanan' : 'kiri';
            return (
              <li key={b.judul} className={`masalah__butir masalah__butir--${sisi}`} data-gerak={`dari-${sisi}`}>
                <h3>{b.judul}</h3>
                <p>{b.isi}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
