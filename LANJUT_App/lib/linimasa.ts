import type { TahapanLinimasa } from '../api/types';

export type StatusTahapan = 'done' | 'soon' | 'idle';

export type TahapanTurunan = TahapanLinimasa & { status: StatusTahapan };

export type LinimasaTerkini = {
  butir: TahapanTurunan[];
  terdekat: TahapanTurunan | null;
  /** null kalau tidak ada tahapan mendatang — bukan angka negatif. */
  sisaHari: number | null;
};

function uraiTanggal(iso: string | null | undefined): number {
  if (typeof iso !== 'string') return NaN;
  const bagian = iso.slice(0, 10).split('-').map(Number);
  if (bagian.length !== 3 || bagian.some((n) => Number.isNaN(n))) return NaN;
  const [tahun, bulan, tanggal] = bagian;
  return Date.UTC(tahun, bulan - 1, tanggal);
}

function hariIniUtc(): number {
  const kini = new Date();
  return Date.UTC(kini.getFullYear(), kini.getMonth(), kini.getDate());
}

function tanggalTeks(ms: number, opsi: Intl.DateTimeFormatOptions): string {
  try {
    return new Intl.DateTimeFormat('id-ID', { ...opsi, timeZone: 'UTC' }).format(new Date(ms));
  } catch {
    return '';
  }
}

/** "27 September 2026" — tanggal per butir & tanggal pengecekan (diperiksa_pada). */
export function formatTanggal(iso: string | null | undefined): string {
  const t = uraiTanggal(iso);
  return Number.isNaN(t) ? '' : tanggalTeks(t, { day: 'numeric', month: 'long', year: 'numeric' });
}

/** "27 September" (tanpa tahun) — dipakai di kartu tenggat terdekat, mengikuti
 * contoh persis salinan-teks-lanjut.md §4.1: "…tutup 27 September". */
export function formatTanggalRingkas(iso: string | null | undefined): string {
  const t = uraiTanggal(iso);
  return Number.isNaN(t) ? '' : tanggalTeks(t, { day: 'numeric', month: 'long' });
}

/** "1 – 31 Juli 2026" / "1 Oktober – 30 November 2026" — rentang mulai/selesai. */
export function formatRentang(mulai: string, selesai: string): string {
  const a = uraiTanggal(mulai);
  const b = uraiTanggal(selesai);
  if (Number.isNaN(a)) return Number.isNaN(b) ? '' : formatTanggal(selesai);
  if (Number.isNaN(b)) return formatTanggal(mulai);
  const da = new Date(a);
  const db = new Date(b);
  if (da.getUTCFullYear() === db.getUTCFullYear() && da.getUTCMonth() === db.getUTCMonth()) {
    return `${tanggalTeks(a, { day: 'numeric' })} – ${formatTanggal(selesai)}`;
  }
  return `${tanggalTeks(a, { day: 'numeric', month: 'long' })} – ${formatTanggal(selesai)}`;
}

/**
 * Cermin `linimasaTerkini` di app/assets/app.js (PWA v1) — logika penentuan
 * status & tenggat terdekat sengaja diduplikasi, bukan diimpor lintas
 * proyek, karena LANJUT_App adalah eksplorasi terpisah yang harus bisa
 * dihapus tanpa menyentuh satu baris pun PWA (lihat LANJUT_App/README.md).
 *
 * Penyaringan `diperiksa_pada == null` terjadi DI SINI, di lapisan data,
 * bukan di lapisan tampilan — PRD F1 melarang menampilkan tanggal yang
 * belum diverifikasi dari laman resmi sama sekali, jadi butir semacam itu
 * tidak boleh pernah sampai ke komponen layar.
 */
export function turunkanLinimasa(
  data: TahapanLinimasa[],
  hariIniMs: number = hariIniUtc()
): LinimasaTerkini {
  const terverifikasi = data.filter((t) => t.diperiksa_pada != null);

  const butir: TahapanTurunan[] = terverifikasi
    .slice()
    .sort((a, b) => uraiTanggal(a.tanggal_mulai) - uraiTanggal(b.tanggal_mulai))
    .map((t) => ({ ...t, status: 'idle' as StatusTahapan }));

  let terdekat: TahapanTurunan | null = null;
  for (const b of butir) {
    const selesai = uraiTanggal(b.tanggal_selesai);
    if (Number.isNaN(selesai)) continue;
    if (selesai < hariIniMs) {
      b.status = 'done';
      continue;
    }
    if (!terdekat || selesai < uraiTanggal(terdekat.tanggal_selesai)) terdekat = b;
  }
  if (terdekat) terdekat.status = 'soon';

  return {
    butir,
    terdekat,
    sisaHari: terdekat ? Math.round((uraiTanggal(terdekat.tanggal_selesai) - hariIniMs) / 86400000) : null,
  };
}
