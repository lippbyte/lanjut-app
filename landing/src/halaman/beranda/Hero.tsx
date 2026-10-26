import { Maskot } from '../../komponen/Maskot';
import { Tombol } from '../../komponen/Tombol';
import { HERO } from '../../konten/beranda';

// Hero acuan: maskot di kiri, judul + sub + dua tombol di kanan. Masuk bertahap (CSS saat dimuat,
// tanpa JS): judul, sub, lalu tombol. Maskot melayang pelan selama terlihat.

/** Topi toga kecil di atas "j" seperti di wordmark (dekoratif). */
function Toga() {
  return (
    <svg className="toga" viewBox="0 0 64 44" aria-hidden="true" focusable="false">
      <path d="M32 3 61 15 32 27 3 15Z" fill="currentColor" />
      <path d="M15 21v9c0 4.2 7.6 7.5 17 7.5S49 34.2 49 30v-9L32 28Z" fill="currentColor" />
      <path d="M55 18v13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" fill="none" />
      <circle cx="55" cy="33.5" r="3" fill="currentColor" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero" aria-labelledby="judul-hero">
      <div className="wadah hero__tata">
        <Maskot melayang segera className="hero__maskot" />
        <div className="hero__teks">
          <h1 id="judul-hero" className="hero__judul">
            <span className="kata-utuh">
              {HERO.judulAwal}
              <span className="huruf-toga">
                {HERO.judulJ}
                <Toga />
              </span>
              {HERO.judulAkhir.split(' ')[0]}
            </span>{' '}
            {HERO.judulAkhir.split(' ').slice(1).join(' ')}
          </h1>
          <p className="hero__sub">{HERO.sub}</p>
          <div className="hero__aksi">
            <Tombol ke="#tentang">Apa itu LANJUT?</Tombol>
            <Tombol ke="/docs" varian="kedua">
              Lihat Dokumentasi
            </Tombol>
          </div>
          <p className="hero__catatan">{HERO.catatan}</p>
        </div>
      </div>
    </section>
  );
}
