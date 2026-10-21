import { useEffect, useState } from 'react';

import { BERKAS_APK, apkTersedia } from '../lib/apk';

export type StatusApk = 'memeriksa' | 'ada' | 'belum';

// Teks DRAF (docs/salinan-teks-lanjut.md, LANJUT_083b), belum disetujui PM.
export const TEKS_APK_DISIAPKAN = 'APK sedang disiapkan. Coba lagi nanti.';

/**
 * Tombol "Unduh APK" selalu tampil. Hanya menjadi tautan bila lanjut-demo.apk memang ada;
 * selama diperiksa atau bila belum ada, tombolnya nonaktif (bukan tautan rusak), dan saat
 * belum ada diberi keterangan.
 */
export function TombolApk({ status }: { status: StatusApk }) {
  if (status === 'ada') {
    return (
      <p>
        <a className="tombol tombol--penuh" href={BERKAS_APK} download>
          Unduh APK
        </a>
      </p>
    );
  }
  return (
    <>
      <p>
        <button
          type="button"
          className="tombol tombol--penuh"
          disabled
          aria-describedby={status === 'belum' ? 'status-apk' : undefined}
        >
          Unduh APK
        </button>
      </p>
      {status === 'belum' ? (
        <p className="kecil" id="status-apk" role="status">
          {TEKS_APK_DISIAPKAN}
        </p>
      ) : null}
    </>
  );
}

export function useStatusApk(cek: () => Promise<boolean> = apkTersedia): StatusApk {
  const [status, setStatus] = useState<StatusApk>('memeriksa');
  useEffect(() => {
    let batal = false;
    cek().then((ada) => {
      if (!batal) setStatus(ada ? 'ada' : 'belum');
    });
    return () => {
      batal = true;
    };
  }, [cek]);
  return status;
}
