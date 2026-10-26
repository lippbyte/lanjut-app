import { useEffect, type RefObject } from 'react';

// Gerak situs (CSS + IntersectionObserver, tanpa pustaka). HTML hasil prerender selalu tampil
// lengkap; gerak hanya tambahan. Tanpa JavaScript, tanpa IntersectionObserver, atau dengan
// "kurangi gerakan", tidak ada yang disembunyikan dan tidak ada loop yang berjalan.

export const KURANGI_GERAK = '(prefers-reduced-motion: reduce)';

export const kurangiGerak = (): boolean => typeof window !== 'undefined' && window.matchMedia(KURANGI_GERAK).matches;

/**
 * Muncul sekali saat terlihat. Elemen [data-gerak] yang BELUM terlihat ketika halaman siap diberi
 * data-tampak="belum", lalu "ya" saat discroll ke sana. Jenis geraknya (naik, kabur, dari-kiri, …)
 * ditentukan CSS lewat nilai data-gerak.
 */
export function useGerakMuncul(): void {
  useEffect(() => {
    if (kurangiGerak() || !('IntersectionObserver' in window)) return;
    const pengamat = new IntersectionObserver(
      (entri) => {
        for (const e of entri) {
          if (!e.isIntersecting) continue;
          e.target.setAttribute('data-tampak', 'ya');
          pengamat.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.15 }
    );
    for (const el of document.querySelectorAll<HTMLElement>('[data-gerak]')) {
      const r = el.getBoundingClientRect();
      // Yang sudah terlihat dibiarkan: tidak ada isi yang hilang lalu muncul lagi di depan mata.
      if (r.top < window.innerHeight && r.bottom > 0) continue;
      el.setAttribute('data-tampak', 'belum');
      pengamat.observe(el);
    }
    return () => pengamat.disconnect();
  }, []);
}

/**
 * Loop halus (maskot melayang, gradasi yang bergeser) hanya berjalan selama elemennya terlihat:
 * [data-loop] diberi data-terlihat="ya" / "tidak". CSS-nya juga hanya aktif tanpa "kurangi gerakan".
 */
export function useSaatTerlihat(): void {
  useEffect(() => {
    if (kurangiGerak() || !('IntersectionObserver' in window)) return;
    const pengamat = new IntersectionObserver((entri) => {
      for (const e of entri) e.target.setAttribute('data-terlihat', e.isIntersecting ? 'ya' : 'tidak');
    });
    for (const el of document.querySelectorAll<HTMLElement>('[data-loop]')) pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);
}

/**
 * Akordeon dari <details>: buka/tutup dengan transisi tinggi yang halus (Web Animations API).
 * Tetap <details> biasa tanpa JavaScript atau dengan "kurangi gerakan" (buka/tutup langsung).
 */
export function useAkordeon(ref: RefObject<HTMLElement | null>): void {
  useEffect(() => {
    const wadah = ref.current;
    if (!wadah || kurangiGerak() || typeof Element.prototype.animate !== 'function') return;
    const berjalan = new WeakMap<HTMLDetailsElement, Animation>();
    const klik = (e: MouseEvent) => {
      const ringkas = (e.target as Element).closest('summary');
      const butir = ringkas?.parentElement;
      if (!ringkas || !(butir instanceof HTMLDetailsElement) || !wadah.contains(butir)) return;
      e.preventDefault();
      berjalan.get(butir)?.cancel();
      const buka = !butir.open;
      const awal = butir.offsetHeight;
      butir.open = true;
      const tinggiBuka = butir.offsetHeight;
      butir.open = false;
      const tinggiTutup = butir.offsetHeight;
      butir.open = true;
      butir.style.overflow = 'hidden';
      const anim = butir.animate({ height: [`${awal}px`, `${buka ? tinggiBuka : tinggiTutup}px`] }, { duration: 280, easing: 'cubic-bezier(.4,0,.2,1)' });
      berjalan.set(butir, anim);
      anim.onfinish = () => {
        butir.open = buka;
        butir.style.overflow = '';
        berjalan.delete(butir);
      };
      anim.oncancel = () => {
        butir.style.overflow = '';
      };
    };
    wadah.addEventListener('click', klik);
    return () => wadah.removeEventListener('click', klik);
  }, [ref]);
}
