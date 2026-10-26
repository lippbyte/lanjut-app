import { Tautan, useAlamat } from './Situs';

// Wordmark resmi LANJUT (LandingPage/lanjut-landing-page-mockup/project/assets/lanjut-wordmark-trimmed.png),
// dipakai apa adanya: huruf putih, "L" biru, topi toga di atas "j". Menurut design system,
// wordmark putih harus berada di atas biru tua, jadi hanya dipakai di permukaan merek.

const UKURAN = { lebar: 452, tinggi: 160 };

/** Logo yang menautkan ke beranda (kepala dan kaki). */
export function Logo({ className = '' }: { className?: string }) {
  const ubah = useAlamat();
  return (
    <Tautan ke="/" className={`logo ${className}`.trim()} aria-label="LANJUT, ke beranda">
      <img src={ubah('/gambar/lanjut-wordmark.png')} alt="" width={UKURAN.lebar} height={UKURAN.tinggi} />
    </Tautan>
  );
}

/** Wordmark di dalam kalimat (mis. judul "Inilah LANJUT"): gambar dengan teks alternatif. */
export function LogoSebaris({ className = '' }: { className?: string }) {
  const ubah = useAlamat();
  return (
    <img
      className={`logo-sebaris ${className}`.trim()}
      src={ubah('/gambar/lanjut-wordmark.png')}
      alt="LANJUT"
      width={UKURAN.lebar}
      height={UKURAN.tinggi}
      loading="lazy"
      decoding="async"
    />
  );
}
