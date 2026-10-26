import { useAlamat } from './Situs';

// Bingkai HP untuk tangkapan layar aplikasi versi uji (public/gambar/app/, 360 × 780 px CSS,
// dipotret dari app sungguhan dengan data uji). Bukan mockup: keterangannya selalu jujur.

export const KETERANGAN_TANGKAPAN = 'Tangkapan layar aplikasi versi uji';

type PropsPonsel = {
  berkas: string;
  alt: string;
  /** Gambar di atas lipatan: dimuat segera. Selain itu lazy. */
  segera?: boolean;
  keterangan?: string;
  className?: string;
};

export function Ponsel({ berkas, alt, segera = false, keterangan = KETERANGAN_TANGKAPAN, className = '' }: PropsPonsel) {
  const ubah = useAlamat();
  return (
    <figure className={`ponsel ${className}`.trim()}>
      <div className="ponsel__bingkai">
        <img
          src={ubah(`/gambar/app/${berkas}`)}
          alt={alt}
          width={360}
          height={780}
          loading={segera ? 'eager' : 'lazy'}
          decoding="async"
          {...(segera ? { fetchPriority: 'high' as const } : {})}
        />
      </div>
      {keterangan ? <figcaption className="ponsel__keterangan">{keterangan}</figcaption> : null}
    </figure>
  );
}
