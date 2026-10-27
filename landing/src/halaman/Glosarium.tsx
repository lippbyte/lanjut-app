import { useEffect, useMemo, useState, type MouseEvent } from 'react';

import { Kerangka } from '../komponen/Kerangka';
import { PitaHalaman } from '../komponen/PitaHalaman';
import { Tautan } from '../komponen/Situs';
import { Label, Status } from '../komponen/Status';
import { ABJAD, ISTILAH, LABEL_KELOMPOK, cocok, hurufAwal, type Istilah } from '../konten/glosarium';
import { kurangiGerak } from '../lib/gerak';
import { formatTanggal } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Glosarium: kartu per huruf awal (pola kartu Dokumentasi), pencarian, dan filter huruf. Tanpa
// pustaka tambahan: React state saja, butir yang tidak cocok diberi atribut hidden. HTML awal
// (prerender) memuat semua istilah, jadi tanpa JavaScript glosarium tetap utuh dan alat
// pencariannya disembunyikan lewat CSS.

const NAMA = new Map(ISTILAH.map((i) => [i.id, i.istilah]));

const GRUP: [string, Istilah[]][] = ABJAD.map((h): [string, Istilah[]] => [h, ISTILAH.filter((i) => hurufAwal(i) === h)]).filter(
  ([, d]) => d.length > 0
);

const HURUF_ADA = new Set(GRUP.map(([h]) => h));

function Butir({ i, keTerkait }: { i: Istilah; keTerkait: (e: MouseEvent<HTMLAnchorElement>, id: string) => void }) {
  return (
    <>
      <dt>
        <span className="glosarium__istilah">{i.istilah}</span>
        {i.panjang ? <span className="glosarium__panjang">{i.panjang}</span> : null}
      </dt>
      <dd>
        <p className="glosarium__tanda">
          <Label>{LABEL_KELOMPOK[i.kelompok]}</Label>
          {i.status ? <Status status={i.status} /> : null}
        </p>
        <p className="glosarium__definisi">{i.definisi}</p>
        {i.sumber ? (
          <p className="glosarium__sumber">
            Sumber:{' '}
            {i.sumber.map((s, k) => (
              <span key={s.url}>
                {k ? ', ' : null}
                <Tautan ke={s.url} className="tautan-luar">
                  {s.label}
                  <span className="sr-only"> (situs luar)</span>
                </Tautan>
              </span>
            ))}
            {i.dicek ? (
              <>
                . Dicek <time dateTime={i.dicek}>{formatTanggal(i.dicek)}</time>
                {i.ketentuan ? `, ketentuan ${i.ketentuan}` : null}.
              </>
            ) : null}
          </p>
        ) : null}
        {i.terkait?.length ? (
          <p className="glosarium__terkait">
            <span>Lihat juga:</span>
            {i.terkait.map((t) => (
              <a key={t} href={`#${t}`} className="glosarium__chip" onClick={(e) => keTerkait(e, t)}>
                {NAMA.get(t)}
              </a>
            ))}
          </p>
        ) : null}
      </dd>
    </>
  );
}

export default function Glosarium({ jalur, akar }: PropsHalaman) {
  const [kueri, setKueri] = useState('');
  const [huruf, setHuruf] = useState<string | null>(null);
  const [tujuan, setTujuan] = useState<string | null>(null);

  const tampil = useMemo(() => new Set(ISTILAH.filter((i) => (!huruf || hurufAwal(i) === huruf) && cocok(i, kueri)).map((i) => i.id)), [huruf, kueri]);
  const disaring = Boolean(huruf || kueri.trim());

  // "Lihat juga" ke istilah yang sedang tersaring: kosongkan saringan dulu, lalu gulir ke sana.
  const keTerkait = (e: MouseEvent<HTMLAnchorElement>, id: string) => {
    if (tampil.has(id)) return;
    e.preventDefault();
    setKueri('');
    setHuruf(null);
    setTujuan(id);
  };

  useEffect(() => {
    if (!tujuan) return;
    const el = document.getElementById(tujuan);
    if (el) {
      el.scrollIntoView({ block: 'start', behavior: kurangiGerak() ? 'auto' : 'smooth' });
      el.focus({ preventScroll: true });
      window.history.replaceState(null, '', `#${tujuan}`);
    }
    setTujuan(null);
  }, [tujuan]);

  const hapus = () => {
    setKueri('');
    setHuruf(null);
  };

  return (
    <Kerangka jalur={jalur} akar={akar}>
      <PitaHalaman
        idJudul="judul-glosarium"
        judul="Glosarium"
        lebar="penuh"
        atas={
          <nav className="remah" aria-label="Remah roti">
            <ol>
              <li>
                <Tautan ke="/docs">Dokumentasi</Tautan>
              </li>
              <li aria-current="page">Glosarium</li>
            </ol>
          </nav>
        }
      >
        <p className="pita__pengantar">Istilah seleksi masuk kuliah dan istilah di aplikasi LANJUT, dijelaskan singkat.</p>
        <p className="pita__catatan">Aturan seleksi bisa berubah tiap tahun, jadi istilah seleksi selalu mencantumkan sumber resmi dan tahun ketentuannya.</p>
      </PitaHalaman>

      <div className="wadah glosarium">
        <div className="glosarium__alat" role="search" aria-label="Glosarium">
          <label htmlFor="cari-istilah" className="glosarium__label">
            Cari istilah
          </label>
          <input
            id="cari-istilah"
            className="glosarium__cari"
            type="search"
            value={kueri}
            onChange={(e) => setKueri(e.target.value)}
            placeholder="Misalnya SNBP, rapor, atau politeknik"
            autoComplete="off"
            spellCheck={false}
          />
          <div className="glosarium__huruf" role="group" aria-label="Saring berdasarkan huruf awal">
            <button type="button" className="glosarium__tombol-huruf glosarium__tombol-huruf--semua" aria-pressed={huruf === null} onClick={() => setHuruf(null)}>
              Semua
            </button>
            {ABJAD.map((h) => (
              <button
                key={h}
                type="button"
                className="glosarium__tombol-huruf"
                aria-pressed={huruf === h}
                disabled={!HURUF_ADA.has(h)}
                onClick={() => setHuruf(huruf === h ? null : h)}
              >
                {h}
              </button>
            ))}
          </div>
          <p className="glosarium__jumlah" aria-live="polite">
            {disaring ? `${tampil.size} dari ${ISTILAH.length} istilah` : `${ISTILAH.length} istilah`}
          </p>
        </div>

        {tampil.size === 0 ? (
          <div className="glosarium__kosong">
            <p>{kueri.trim() ? `Belum ada istilah yang cocok dengan "${kueri.trim()}".` : 'Belum ada istilah dengan huruf ini.'}</p>
            <button type="button" className="tombol tombol--utama" onClick={hapus}>
              Hapus pencarian
            </button>
          </div>
        ) : null}

        <div className="glosarium__kisi">
          {GRUP.map(([h, daftar]) => {
            const ada = daftar.filter((i) => tampil.has(i.id));
            return (
              <section key={h} id={`huruf-${h}`} className="kartu-docs glosarium__grup" aria-labelledby={`judul-huruf-${h}`} hidden={ada.length === 0}>
                <div className="kartu-docs__kepala glosarium__kepala">
                  <h2 id={`judul-huruf-${h}`}>{h}</h2>
                  <p className="kartu-docs__ringkas">{daftar.length} istilah</p>
                </div>
                <dl className="glosarium__daftar">
                  {daftar.map((i) => (
                    <div key={i.id} id={i.id} className="glosarium__butir" tabIndex={-1} hidden={!tampil.has(i.id)}>
                      <Butir i={i} keTerkait={keTerkait} />
                    </div>
                  ))}
                </dl>
              </section>
            );
          })}
        </div>
      </div>
    </Kerangka>
  );
}
