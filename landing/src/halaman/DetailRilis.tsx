import dataRilisJson from '../data/releases.json';
import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { MetaRilis, TombolUnduh } from '../komponen/Rilis';
import { PitaHalaman } from '../komponen/PitaHalaman';
import { Tautan } from '../komponen/Situs';
import type { DataRilis } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Detail satu rilis (PRD-landpage §8.5): /download/<versi>. Hanya dibuat untuk versi yang ada
// di metadata; versi lain dijawab 404.html oleh hosting. Judul dan tombol unduh di pita, isinya
// kartu putih seperti halaman Download.

export function IsiRilis({ data, versi }: { data: DataRilis; versi: string }) {
  const r = data.releases.find((x) => x.version === versi);
  if (!r) throw new Error(`rilis tidak dikenal: ${versi}`);
  const terbaru = data.latestVersion === r.version;
  return (
    <>
      <PitaHalaman
        idJudul="judul-rilis"
        judul={`LANJUT ${r.version}`}
        atas={
          <nav className="remah" aria-label="Remah roti">
            <ol>
              <li>
                <Tautan ke="/download">Download</Tautan>
              </li>
              <li aria-current="page">Versi {r.version}</li>
            </ol>
          </nav>
        }
      >
        <p className="pita__label">
          <span className="label label--hangat">{terbaru ? 'Versi terbaru' : 'Versi lama'}</span>
        </p>
        <p className="pita__pengantar">
          <strong>{r.title}.</strong> {r.summary}
        </p>
        <div className="pita__aksi">
          <TombolUnduh rilis={r} />
        </div>
      </PitaHalaman>

      <article className="wadah wadah--baca rilis-detail" aria-labelledby="judul-rilis">
        <MetaRilis rilis={r} lengkap />
        <section className="rilis-detail__kartu" aria-labelledby="judul-perubahan">
          <h2 id="judul-perubahan">Perubahan</h2>
          <ul>
            {r.changes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </section>
        <section className="rilis-detail__kartu" aria-labelledby="judul-masalah">
          <h2 id="judul-masalah">Masalah yang diketahui</h2>
          {r.knownIssues.length ? (
            <ul>
              {r.knownIssues.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
          ) : (
            <p>Tidak ada masalah yang dicatat untuk versi ini.</p>
          )}
        </section>
        <section className="rilis-detail__kartu" aria-labelledby="judul-periksa">
          <h2 id="judul-periksa">Memeriksa berkas</h2>
          <p>
            {r.sha256
              ? 'Cocokkan SHA-256 di atas dengan checksum berkas yang kamu unduh sebelum memasang.'
              : 'SHA-256 untuk versi ini belum diverifikasi, jadi belum bisa dicocokkan.'}{' '}
            <Tautan ke="/docs/technical/releases#periksa-apk">Cara memeriksa checksum</Tautan>.
          </p>
        </section>
        <p>
          <Tautan ke="/download" className="tautan-panah tautan-panah--kembali">
            <Ikon nama="kembali" /> Kembali ke daftar rilis
          </Tautan>
        </p>
      </article>
    </>
  );
}

export default function DetailRilis({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <IsiRilis data={dataRilisJson as DataRilis} versi={jalur.split('/')[1]} />
    </Kerangka>
  );
}
