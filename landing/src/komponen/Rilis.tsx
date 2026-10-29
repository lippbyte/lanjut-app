import { formatTanggal, formatUkuran, type Rilis } from '../lib/rilis';
import { Ikon } from './Ikon';
import { useAlamat } from './Situs';

// Bagian halaman unduhan yang dipakai di /download dan /download/<versi>. Nilai yang belum
// diverifikasi (null di metadata) tampil sebagai "Belum diverifikasi", tidak pernah ditebak.

export const BELUM_DIVERIFIKASI = 'Belum diverifikasi';

/** Penanda nilai yang belum diverifikasi: pill abu tenang dengan cincin (status idle). */
export function TandaBelum() {
  return (
    <span className="tanda-belum">
      <span className="tanda-belum__ikon" aria-hidden="true" />
      {BELUM_DIVERIFIKASI}
    </span>
  );
}

/** Tombol unduh APK. Hanya dirender bila ada rilis yang lolos periksaDataRilis(). */
export function TombolUnduh({ rilis }: { rilis: Rilis }) {
  const ubah = useAlamat();
  const luar = /^https:/i.test(rilis.apkUrl);
  return (
    <a
      className="tombol tombol--utama tombol--besar"
      href={luar ? rilis.apkUrl : ubah(`/${rilis.apkUrl}`)}
      {...(luar ? { rel: 'noopener noreferrer' } : { download: '' })}
    >
      <Ikon nama="unduh" />
      Unduh APK v{rilis.version}
    </a>
  );
}

export function MetaRilis({ rilis, lengkap = false }: { rilis: Rilis; lengkap?: boolean }) {
  return (
    <dl className="meta-rilis">
      <div>
        <dt>Tanggal rilis</dt>
        <dd>
          <time dateTime={rilis.releaseDate}>{formatTanggal(rilis.releaseDate)}</time>
        </dd>
      </div>
      <div>
        <dt>Ukuran berkas</dt>
        <dd>{rilis.fileSizeBytes === null ? <TandaBelum /> : formatUkuran(rilis.fileSizeBytes)}</dd>
      </div>
      <div>
        <dt>Android minimum</dt>
        <dd>{rilis.minAndroidVersion === null ? <TandaBelum /> : `Android ${rilis.minAndroidVersion}`}</dd>
      </div>
      <div>
        <dt>Kanal</dt>
        <dd>{rilis.channel === 'beta' ? 'Beta' : 'Stabil'}</dd>
      </div>
      {lengkap ? (
        <div className="meta-rilis__penuh">
          <dt>SHA-256</dt>
          <dd>{rilis.sha256 === null ? <TandaBelum /> : <code className="checksum">{rilis.sha256}</code>}</dd>
        </div>
      ) : null}
    </dl>
  );
}
