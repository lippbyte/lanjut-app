import { Maskot } from '../../komponen/Maskot';
import { Tombol } from '../../komponen/Tombol';
import { PENUTUP } from '../../konten/beranda';
import type { Rilis } from '../../lib/rilis';

// CTA penutup: gradasi latar bergeser sangat pelan selama terlihat (mati bila "kurangi gerakan").
// Maskot muncul lagi di penutup, sesuai aturan design system (pembuka dan penutup saja).

export function Penutup({ terbaru }: { terbaru: Rilis | null }) {
  return (
    <section className="penutup" aria-labelledby="judul-penutup" data-loop="">
      <div className="wadah penutup__tata">
        <div className="penutup__teks">
          <h2 id="judul-penutup" className="judul-seksi">
            {PENUTUP.judul}
          </h2>
          <p className="penutup__sub">{PENUTUP.sub}</p>
          <div className="penutup__aksi">
            <Tombol ke="/download" ikon="unduh" ukuran="besar">
              Unduh LANJUT
            </Tombol>
            <Tombol ke="/docs" varian="kedua" ukuran="besar">
              Lihat Dokumentasi
            </Tombol>
          </div>
          <p className="penutup__status">
            {terbaru ? `Versi terbaru: ${terbaru.version}.` : 'Rilis publik belum tersedia, statusnya ada di halaman Unduh.'}
          </p>
        </div>
        <Maskot className="penutup__maskot" />
      </div>
    </section>
  );
}
