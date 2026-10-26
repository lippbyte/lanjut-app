import { useAlamat } from './Situs';

// Maskot kelinci bertoga, garis putih (LANJUT_App/assets/mascot-white.png, hanya dipotong margin
// transparannya). Dekoratif: makna halaman tidak bergantung padanya, jadi alt kosong. Sesuai
// design system, maskot hanya muncul di pembuka dan penutup.

type PropsMaskot = {
  className?: string;
  /** Melayang pelan (loop) selama terlihat di layar; mati bila "kurangi gerakan". */
  melayang?: boolean;
  /** Di atas lipatan: dimuat segera. */
  segera?: boolean;
};

export function Maskot({ className = '', melayang = false, segera = false }: PropsMaskot) {
  const ubah = useAlamat();
  return (
    <div className={`maskot ${melayang ? 'maskot--melayang' : ''} ${className}`.replace(/\s+/g, ' ').trim()} data-loop={melayang ? '' : undefined}>
      <img
        src={ubah('/gambar/maskot-putih.webp')}
        alt=""
        width={441}
        height={674}
        decoding="async"
        loading={segera ? 'eager' : 'lazy'}
      />
    </div>
  );
}
