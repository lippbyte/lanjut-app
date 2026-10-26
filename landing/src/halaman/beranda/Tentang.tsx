import { Kartu } from '../../komponen/Kartu';
import { LogoSebaris } from '../../komponen/Logo';
import { TENTANG } from '../../konten/beranda';

// "Inilah LANJUT cocok buat kamu si siswa bingung": pill sorotan tumbuh dari 0,9 ke 1, lalu
// tiga kartu naik bergiliran (miring ringan saat diarahkan kursor).

const RATA = ['kiri', 'tengah', 'kanan'] as const;

export function Tentang() {
  return (
    <section className="tentang" id="tentang" aria-labelledby="judul-tentang">
      <div className="wadah">
        <h2 id="judul-tentang" className="tentang__judul">
          <span className="tentang__baris">
            {TENTANG.judulAwal} <LogoSebaris className="tentang__logo" />
          </span>{' '}
          <span className="tentang__baris">
            {TENTANG.judulTengah}{' '}
            <span className="sorot" data-gerak="skala">
              {TENTANG.sorot}
            </span>
          </span>
        </h2>
        <div className="tentang__kartu" data-gerak="naik-urut">
          {TENTANG.kartu.map((k, i) => (
            <Kartu key={k.judul} judul={k.judul} rata={RATA[i]}>
              <p>{k.isi}</p>
            </Kartu>
          ))}
        </div>
      </div>
    </section>
  );
}
