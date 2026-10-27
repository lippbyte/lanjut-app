import { useEffect, useState } from 'react';

// Blok kode gelap di dokumentasi. Kodenya digulir mendatar di dalam kotaknya sendiri (bisa
// difokus dengan Tab), halamannya tidak. Tombol Salin hanya muncul bila peramban mengizinkan
// clipboard; tanpa JavaScript blok tetap terbaca dan bisa diseleksi biasa.
export function BlokKode({ bahasa, judul, kode }: { bahasa: string; judul: string; kode: string }) {
  const [bisaSalin, setBisaSalin] = useState(false);
  const [pesan, setPesan] = useState('');

  useEffect(() => {
    setBisaSalin(window.isSecureContext && typeof navigator.clipboard?.writeText === 'function');
  }, []);

  useEffect(() => {
    if (!pesan) return;
    const t = window.setTimeout(() => setPesan(''), 2000);
    return () => window.clearTimeout(t);
  }, [pesan]);

  const salin = () => {
    navigator.clipboard.writeText(kode).then(
      () => setPesan('Disalin'),
      () => setPesan('Gagal menyalin')
    );
  };

  return (
    <figure className="kode" aria-label={judul}>
      <div className="kode__kepala">
        <span className="kode__bahasa">{bahasa}</span>
        {bisaSalin ? (
          <button type="button" className="kode__salin" onClick={salin} aria-label={`Salin: ${judul}`}>
            {pesan || 'Salin'}
          </button>
        ) : null}
        <span className="sr-only" aria-live="polite">
          {pesan}
        </span>
      </div>
      <div className="kode__gulir" role="region" aria-label={`${judul} (${bahasa})`} tabIndex={0}>
        <pre>
          <code>{kode}</code>
        </pre>
      </div>
    </figure>
  );
}
