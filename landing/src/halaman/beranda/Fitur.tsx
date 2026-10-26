import { Ikon } from '../../komponen/Ikon';
import { Ponsel } from '../../komponen/Ponsel';
import { Tautan } from '../../komponen/Situs';
import { Status } from '../../komponen/Status';
import { FITUR_BERANDA } from '../../konten/beranda';
import { FITUR, fitur } from '../../konten/fitur';

// "Fitur di aplikasi versi uji": tiga tangkapan layar app asli, lalu kartu fitur dengan status
// sebenarnya yang membalik naik bergiliran. Fitur belajar kecil diringkas satu baris.

const UTAMA = ['linimasa', 'khusus-smk', 'pilih-mapel', 'eksplorasi-kampus', 'jalur-saya', 'daftar-periksa', 'cerita-alumni', 'ai-lanjut'];
const LAIN = FITUR.filter((f) => f.kelompok === 'lain' && f.id !== 'ai-lanjut');

export function Fitur() {
  return (
    <section className="fitur" id="fitur" aria-labelledby="judul-fitur">
      <div className="wadah">
        <div className="fitur__kepala">
          <h2 id="judul-fitur" className="judul-seksi">
            {FITUR_BERANDA.judul}
          </h2>
          <p>{FITUR_BERANDA.pengantar}</p>
        </div>

        <div className="fitur__pajangan">
          {FITUR_BERANDA.pajangan.map((id) => {
            const f = fitur(id);
            return f.gambar ? (
              <Ponsel key={id} berkas={f.gambar.berkas} alt={f.gambar.alt} keterangan={`Tangkapan layar aplikasi versi uji · ${f.nama}`} />
            ) : null;
          })}
        </div>

        <ul className="fitur__daftar" data-gerak="balik">
          {UTAMA.map((id) => {
            const f = fitur(id);
            return (
              <li key={id} className="fitur__kartu">
                <div className="fitur__kartu-kepala">
                  <h3>{f.nama}</h3>
                  <Status status={f.status} />
                </div>
                <p>{f.singkat}</p>
                {f.catatanSingkat ? <p className="fitur__catatan">{f.catatanSingkat}</p> : null}
              </li>
            );
          })}
        </ul>

        <p className="fitur__lain">
          Juga di versi uji: {LAIN.map((f) => f.nama).join(', ')}. <Status status="tersedia" />
        </p>
        <p>
          <Tautan ke="/docs/product/features" className="tautan-panah">
            Semua fitur dan statusnya <Ikon nama="panah" />
          </Tautan>
        </p>
      </div>
    </section>
  );
}
