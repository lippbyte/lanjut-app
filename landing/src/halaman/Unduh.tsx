import dataRilisJson from '../data/releases.json';
import { Catatan } from '../komponen/Catatan';
import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { MetaRilis, TombolUnduh } from '../komponen/Rilis';
import { Tautan } from '../komponen/Situs';
import { formatTanggal, rilisTerbaru, urutRilis, type DataRilis } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Halaman unduhan (PRD-landpage §8.4). Datanya dari src/data/releases.json yang sudah lolos
// periksaDataRilis() saat build. Tanpa rilis publik: "Unduhan belum tersedia", tanpa tombol.

export const TEKS_BELUM_ADA = 'Unduhan belum tersedia';

export function CaraPasang() {
  return (
    <section className="cara-pasang" id="cara-pasang" aria-labelledby="judul-cara-pasang">
      <div className="cara-pasang__kepala">
        <h2 id="judul-cara-pasang">Cara memasang APK di Android</h2>
        <p>Karena LANJUT belum ada di Play Store, HP-mu perlu izin sekali untuk memasangnya.</p>
      </div>
      <ol className="langkah-pasang">
        <li>Ketuk tombol unduh, lalu tunggu sampai unduhan selesai.</li>
        <li>Buka berkas APK LANJUT dari notifikasi unduhan atau dari aplikasi File di HP-mu.</li>
        <li>
          Kalau muncul pesan bahwa HP-mu tidak mengizinkan pemasangan dari sumber ini, ketuk <strong>Setelan</strong>,
          lalu aktifkan <strong>Izinkan dari sumber ini</strong> untuk aplikasi yang membuka berkasnya (misalnya Chrome atau
          File). Namanya bisa sedikit berbeda di tiap merek HP.
        </li>
        <li>
          Kembali, lalu ketuk <strong>Pasang</strong>.
        </li>
        <li>
          Kalau Play Protect memberi peringatan, itu karena aplikasi ini belum ada di Play Store. Lanjutkan hanya kalau
          berkasnya kamu unduh dari halaman resmi LANJUT.
        </li>
        <li>
          Sesudah terpasang, matikan lagi izin tadi lewat{' '}
          <strong>Setelan → Aplikasi → Akses aplikasi khusus → Instal aplikasi tak dikenal</strong>.
        </li>
      </ol>
      <Catatan nada="penting" judul="Unduh hanya dari sumber resmi">
        <p>
          Unduh APK LANJUT hanya dari halaman ini atau langsung dari tim LANJUT. APK dari grup chat atau situs lain bisa saja
          sudah diubah orang. Bila SHA-256 tercantum, cocokkan dulu sebelum memasang (
          <Tautan ke="/docs/technical/releases#periksa-apk">caranya</Tautan>).
        </p>
      </Catatan>
      <p className="meta">Kalau ragu, minta bantuan guru atau orang tua/wali.</p>
    </section>
  );
}

export function IsiUnduh({ data }: { data: DataRilis }) {
  const terbaru = rilisTerbaru(data);
  const lama = urutRilis(data).filter((r) => r.version !== terbaru?.version);

  return (
    <>
      {terbaru ? (
        <section className="rilis-terbaru" aria-labelledby="judul-terbaru">
          <p className="eyebrow">Versi terbaru</p>
          <h2 id="judul-terbaru">
            LANJUT {terbaru.version}
            <span className="rilis-terbaru__judul">{terbaru.title}</span>
          </h2>
          <p className="pengantar">{terbaru.summary}</p>
          <div className="rilis-terbaru__aksi">
            <TombolUnduh rilis={terbaru} />
            <Tautan ke={`/download/${terbaru.version}`} className="tautan-panah">
              Detail rilis dan SHA-256 <Ikon nama="panah" />
            </Tautan>
          </div>
          <MetaRilis rilis={terbaru} />
          <div className="rilis-terbaru__perubahan">
            <h3>Yang baru</h3>
            <ul>
              {terbaru.changes.map((c, i) => (
                <li key={i}>{c}</li>
              ))}
            </ul>
            {terbaru.knownIssues.length ? (
              <>
                <h3>Masalah yang diketahui</h3>
                <ul>
                  {terbaru.knownIssues.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </section>
      ) : (
        <section className="unduh-kosong" aria-labelledby="judul-kosong">
          <p className="unduh-kosong__tanda" aria-hidden="true">
            <Ikon nama="info" />
          </p>
          <div>
            <h2 id="judul-kosong">{TEKS_BELUM_ADA}</h2>
            <p>
              Belum ada rilis APK publik. Saat ini LANJUT diuji terbatas oleh penguji dari tim. Versi terbaru akan tampil di
              sini, lengkap dengan tanggal, ukuran, dan catatan perubahannya, setelah rilis publik pertama.
            </p>
            <p>
              Kalau kamu penguji, pakai berkas dan petunjuk dari tim, lalu ikuti <Tautan ke="/docs/testing">Panduan uji</Tautan>.
            </p>
            <p className="unduh-kosong__tautan">
              <Tautan ke="/docs/product/roadmap" className="tautan-panah">
                Lihat roadmap <Ikon nama="panah" />
              </Tautan>
              <Tautan ke="/docs/technical/releases" className="tautan-panah">
                Cara kami merilis APK <Ikon nama="panah" />
              </Tautan>
            </p>
          </div>
        </section>
      )}

      {lama.length ? (
        <section className="riwayat" id="riwayat" aria-labelledby="judul-riwayat">
          <h2 id="judul-riwayat">Riwayat versi</h2>
          <ol className="riwayat__daftar">
            {lama.map((r) => (
              <li key={r.version}>
                <Tautan ke={`/download/${r.version}`}>
                  <span className="riwayat__versi">{r.version}</span>
                  <span className="riwayat__judul">{r.title}</span>
                  <time className="meta" dateTime={r.releaseDate}>
                    {formatTanggal(r.releaseDate)}
                  </time>
                </Tautan>
              </li>
            ))}
          </ol>
        </section>
      ) : null}
    </>
  );
}

export default function Unduh({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="wadah unduh">
        <header className="unduh__kepala">
          <p className="eyebrow">Download</p>
          <h1>Download LANJUT</h1>
          <p className="pengantar">
            Aplikasi Android LANJUT, langsung dari sumber resmi. Belum tersedia di Play Store dan belum ada versi iPhone.
          </p>
        </header>
        <IsiUnduh data={dataRilisJson as DataRilis} />
        <CaraPasang />
      </div>
    </Kerangka>
  );
}
