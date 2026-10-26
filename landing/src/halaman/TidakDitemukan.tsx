import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { Tautan } from '../komponen/Situs';
import type { PropsHalaman } from './jenis';

// 404.html. Dirender dengan akar '/' karena hosting bisa menyajikannya di alamat sedalam apa pun.
export default function TidakDitemukan({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="wadah tidak-ditemukan">
        <p className="eyebrow">404</p>
        <h1>Jalur ini tidak ada.</h1>
        <p className="pengantar">Halaman yang kamu cari tidak ditemukan. Mungkin alamatnya salah ketik, atau halamannya sudah pindah.</p>
        <ul className="tidak-ditemukan__tautan">
          <li>
            <Tautan ke="/" className="tombol tombol--utama">
              Ke beranda
            </Tautan>
          </li>
          <li>
            <Tautan ke="/docs" className="tautan-panah">
              Buka dokumentasi <Ikon nama="panah" />
            </Tautan>
          </li>
          <li>
            <Tautan ke="/download" className="tautan-panah">
              Halaman download <Ikon nama="panah" />
            </Tautan>
          </li>
        </ul>
      </div>
    </Kerangka>
  );
}
