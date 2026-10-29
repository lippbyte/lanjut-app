import type { ReactNode } from 'react';

import dataRilisJson from '../data/releases.json';
import { Catatan } from '../komponen/Catatan';
import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { MetaRilis, TandaBelum, TombolUnduh } from '../komponen/Rilis';
import { PitaHalaman } from '../komponen/PitaHalaman';
import { Tautan } from '../komponen/Situs';
import { formatTanggal, formatUkuran, rilisTerbaru, urutRilis, type DataRilis, type Rilis } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Halaman unduhan (PRD-landpage §8.4). Datanya dari src/data/releases.json yang sudah lolos
// periksaDataRilis() saat build. Tanpa rilis publik: "Unduhan belum tersedia", tanpa tombol.
// Pola kartu sama dengan Dokumentasi: kepala bergradasi, isi putih.

export const TEKS_BELUM_ADA = 'Unduhan belum tersedia';

/** Langkah memasang APK. Nama menu bisa sedikit berbeda di tiap merek HP. */
export const LANGKAH_PASANG: { judul: string; isi: ReactNode }[] = [
  { judul: 'Unduh berkasnya', isi: 'Ketuk tombol unduh di halaman ini, lalu tunggu sampai unduhan selesai.' },
  { judul: 'Buka berkas APK', isi: 'Buka dari notifikasi unduhan atau dari aplikasi File di HP-mu.' },
  {
    judul: 'Izinkan sekali',
    isi: (
      <>
        Kalau HP menolak, ketuk <strong>Setelan</strong> lalu aktifkan <strong>Izinkan dari sumber ini</strong> untuk aplikasi
        yang membuka berkasnya, misalnya Chrome atau File.
      </>
    ),
  },
  {
    judul: 'Pasang',
    isi: (
      <>
        Kembali ke layar sebelumnya, lalu ketuk <strong>Pasang</strong>.
      </>
    ),
  },
  {
    judul: 'Kalau Play Protect memberi peringatan',
    isi: 'Itu karena LANJUT belum ada di Play Store, jadi lanjutkan hanya kalau berkasnya kamu unduh dari halaman resmi ini.',
  },
  {
    judul: 'Matikan lagi izinnya',
    isi: (
      <>
        Buka <strong>Setelan → Aplikasi → Akses aplikasi khusus → Instal aplikasi tak dikenal</strong>, lalu matikan izin tadi.
      </>
    ),
  },
];

export function CaraPasang() {
  return (
    <section className="cara-pasang" id="cara-pasang" aria-labelledby="judul-cara-pasang">
      <div className="judul-blok">
        <h2 id="judul-cara-pasang">Cara memasang APK di Android</h2>
        <p>LANJUT belum ada di Play Store, jadi HP-mu perlu izin sekali untuk memasangnya. Nama menunya bisa sedikit berbeda di tiap merek HP.</p>
      </div>
      <ol className="langkah-pasang">
        {LANGKAH_PASANG.map((l, i) => (
          <li key={l.judul} className="langkah-pasang__kartu" data-gerak="naik">
            <span className="langkah-pasang__nomor" aria-hidden="true">
              {i + 1}
            </span>
            <h3>{l.judul}</h3>
            <p>{l.isi}</p>
          </li>
        ))}
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

type Syarat = { label: string; nilai: string | null; catatan?: string };

/** Syarat perangkat. Yang belum diuji di HP sungguhan bernilai null dan tampil "Belum diverifikasi". */
export function daftarSyarat(terbaru: Rilis | null): Syarat[] {
  return [
    { label: 'Sistem operasi', nilai: 'Android', catatan: 'Dipasang dari berkas APK.' },
    { label: 'Versi Android minimum', nilai: terbaru?.minAndroidVersion ? `Android ${terbaru.minAndroidVersion}` : null },
    { label: 'Ukuran berkas APK', nilai: terbaru?.fileSizeBytes ? formatUkuran(terbaru.fileSizeBytes) : null },
    { label: 'Ruang penyimpanan kosong', nilai: null },
    { label: 'Memori (RAM)', nilai: null },
    // Masuk ke akun lewat server LANJUT (kode email atau Google); pemakaian tanpa internet belum diuji.
    { label: 'Koneksi internet', nilai: 'Diperlukan untuk masuk', catatan: 'Pemakaian tanpa internet belum diverifikasi.' },
    { label: 'iPhone (iOS)', nilai: 'Belum tersedia' },
  ];
}

export function SyaratPerangkat({ terbaru }: { terbaru: Rilis | null }) {
  return (
    <section className="kartu-docs syarat" id="syarat" aria-labelledby="judul-syarat">
      <div className="kartu-docs__kepala">
        <h2 id="judul-syarat">Syarat perangkat</h2>
        <p className="kartu-docs__ringkas">Angka syarat diisi setelah diuji di HP sungguhan; sampai saat itu tidak kami tebak.</p>
      </div>
      <dl className="syarat__daftar">
        {daftarSyarat(terbaru).map((s) => (
          <div key={s.label} className="syarat__butir">
            <dt>{s.label}</dt>
            <dd>
              {s.nilai ?? <TandaBelum />}
              {s.catatan ? <span className="syarat__catatan">{s.catatan}</span> : null}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function KartuTerbaru({ rilis }: { rilis: Rilis }) {
  return (
    <section className="kartu-docs rilis-terbaru" aria-labelledby="judul-terbaru">
      <div className="kartu-docs__kepala rilis-terbaru__kepala">
        <p className="kartu-docs__nomor">Versi terbaru · {rilis.channel === 'beta' ? 'Beta' : 'Stabil'}</p>
        <h2 id="judul-terbaru">
          LANJUT {rilis.version}
          <span className="rilis-terbaru__judul">{rilis.title}</span>
        </h2>
      </div>
      <div className="rilis-terbaru__isi">
        <p className="rilis-terbaru__ringkas">{rilis.summary}</p>
        <div className="rilis-terbaru__aksi">
          <TombolUnduh rilis={rilis} />
          <Tautan ke={`/download/${rilis.version}`} className="tautan-panah">
            Detail rilis dan SHA-256 <Ikon nama="panah" />
          </Tautan>
        </div>
        <MetaRilis rilis={rilis} />
        <div className="rilis-terbaru__perubahan">
          <h3>Yang baru</h3>
          <ul>
            {rilis.changes.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
          {rilis.knownIssues.length ? (
            <>
              <h3>Masalah yang diketahui</h3>
              <ul>
                {rilis.knownIssues.map((c, i) => (
                  <li key={i}>{c}</li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      </div>
    </section>
  );
}

function KartuKosong() {
  return (
    <section className="kartu-docs unduh-kosong" aria-labelledby="judul-kosong">
      <div className="kartu-docs__kepala">
        <h2 id="judul-kosong">{TEKS_BELUM_ADA}</h2>
        <p className="kartu-docs__ringkas">Belum ada rilis APK publik.</p>
      </div>
      <div className="unduh-kosong__isi">
        <p>
          Saat ini LANJUT diuji terbatas oleh penguji dari tim. Versi terbaru akan tampil di sini, lengkap dengan tanggal,
          ukuran, dan catatan perubahannya, setelah rilis publik pertama.
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
  );
}

export function IsiUnduh({ data }: { data: DataRilis }) {
  const terbaru = rilisTerbaru(data);
  const lama = urutRilis(data).filter((r) => r.version !== terbaru?.version);

  return (
    <>
      <div className="unduh__versi" id="versi">
        {terbaru ? <KartuTerbaru rilis={terbaru} /> : <KartuKosong />}
      </div>

      {lama.length ? (
        <section className="riwayat" id="riwayat" aria-labelledby="judul-riwayat">
          <div className="judul-blok">
            <h2 id="judul-riwayat">Riwayat versi</h2>
          </div>
          <ol className="riwayat__daftar">
            {lama.map((r) => (
              <li key={r.version}>
                <Tautan ke={`/download/${r.version}`} className="kartu-versi">
                  <span className="kartu-versi__kepala">
                    <span className="kartu-versi__nomor">v{r.version}</span>
                    <span className="kartu-versi__kanal">{r.channel === 'beta' ? 'Beta' : 'Stabil'}</span>
                  </span>
                  <span className="kartu-versi__isi">
                    <span className="kartu-versi__judul">{r.title}</span>
                    <time className="meta" dateTime={r.releaseDate}>
                      {formatTanggal(r.releaseDate)}
                    </time>
                    <span className="kartu-versi__lanjut">
                      Detail rilis <Ikon nama="panah" />
                    </span>
                  </span>
                </Tautan>
              </li>
            ))}
          </ol>
        </section>
      ) : null}

      <SyaratPerangkat terbaru={terbaru} />
    </>
  );
}

/** Isi halaman unduhan untuk metadata apa pun (dipakai halaman sungguhan dan tes rilis tiruan). */
export function HalamanUnduh({ data }: { data: DataRilis }) {
  return (
    <>
      <PitaHalaman idJudul="judul-unduh" judul="Download LANJUT" lebar="penuh" atas={<p className="eyebrow eyebrow--terang">Download</p>}>
        <p className="pita__pengantar">Aplikasi Android LANJUT, langsung dari sumber resmi.</p>
        <p className="pita__catatan">Belum tersedia di Play Store dan belum ada versi iPhone.</p>
        <nav aria-label="Pintasan halaman unduhan">
          <ul className="pita__pintas">
            <li>
              <a href="#versi" className="pita__pil">
                Versi
              </a>
            </li>
            <li>
              <a href="#syarat" className="pita__pil">
                Syarat perangkat
              </a>
            </li>
            <li>
              <a href="#cara-pasang" className="pita__pil">
                Cara pasang
              </a>
            </li>
          </ul>
        </nav>
      </PitaHalaman>
      <div className="wadah unduh">
        <IsiUnduh data={data} />
        <CaraPasang />
      </div>
    </>
  );
}

export default function Unduh({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <HalamanUnduh data={dataRilisJson as DataRilis} />
    </Kerangka>
  );
}
