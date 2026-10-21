import maskot from '../aset/maskot.png';

// Bagian yang sama di halaman utama, panduan uji, dan kebijakan (susunan 083).

export const TEKS_DRAF = 'DRAF — teks halaman ini belum disetujui.';

export function LabelDraf({ children = TEKS_DRAF }: { children?: string }) {
  return <p className="draf">{children}</p>;
}

export function Kepala() {
  return (
    <header className="kepala">
      <div className="bungkus">
        <img src={maskot} alt="" width={40} height={40} />
        <a className="merek" href="./">
          LANJUT
        </a>
        <span className="lencana">Versi uji</span>
      </div>
    </header>
  );
}

export type Tautan = { href: string; label: string };

export function Kaki({ tautan }: { tautan: Tautan[] }) {
  return (
    <footer className="kaki">
      <div className="bungkus">
        <nav aria-label="Tautan">
          {tautan.map((t) => (
            <a key={t.href} href={t.href}>
              {t.label}
            </a>
          ))}
        </nav>
        <p className="kecil">LANJUT oleh EDILAKSO Group · versi uji 2026 · Teks halaman ini DRAF.</p>
      </div>
    </footer>
  );
}
