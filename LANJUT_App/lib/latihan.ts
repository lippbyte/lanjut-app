import type { Kartu } from '../api/types';

/**
 * F7 Latihan (LANJUT_041) — antrian sederhana TANPA Level-In: kartu milik
 * sendiri (Arsip Belajar), diacak, dipotong ke batas sesi. Tidak ada spaced
 * repetition atau skor kesulitan. LANJUT_058: tiap kartu boleh diberi
 * keyakinan (bahan kalibrasi Level-In di server). Logika murni, pola lib/arsip.ts.
 */

/**
 * Keyakinan (LANJUT_058) — tiga pilihan, dipetakan ke skala 1–5 yang sudah
 * dipakai server dan PWA (levelin.skema.js, keputusan.js). Angka mengikuti
 * label PWA (MVP-PWA/latihan.html): 4 "Yakin", 2 "Ragu", 1 "Ragu banget".
 * Dengan ambang bawaan (tinggi ≥ 4, rendah ≤ 2): yakin lalu salah = terlalu
 * yakin; ragu/tebak lalu benar = terlalu ragu. Boleh dilewati (tidak dikirim).
 * Salinan teks §4.18 — DRAF.
 */
export const KEYAKINAN = [
  { kode: 'yakin', label: 'Yakin', nilai: 4 },
  { kode: 'ragu', label: 'Ragu', nilai: 2 },
  { kode: 'tebak', label: 'Tebak', nilai: 1 },
] as const;
export type KodeKeyakinan = (typeof KEYAKINAN)[number]['kode'];

export const TEKS_KEYAKINAN = {
  tanya: 'Seberapa yakin kamu?',
  petunjuk: 'Pilih sebelum membuka jawaban. Boleh dilewati.',
  terpilih: (label: string) => `Keyakinanmu: ${label}.`,
  dilewati: 'Keyakinan dilewati.',
};

/** Kode pilihan → nilai skala server; `null` (dilewati) → tidak dikirim. */
export function nilaiKeyakinan(kode: KodeKeyakinan | null): number | undefined {
  return KEYAKINAN.find((k) => k.kode === kode)?.nilai;
}

// Salinan §4.7 (disetujui): "12 kartu, kira-kira 8 menit" dan "Lagi padat?
// Ambil 5 kartu saja." — jadi satu sesi paling banyak 12 kartu, pilihan
// singkat 5. Kartu yang tersedia lebih sedikit → semuanya dipakai.
export const BATAS_SESI = 12;
export const BATAS_SINGKAT = 5;

/** Kira-kira 40 detik per kartu: 12 kartu ≈ 8 menit, sama dengan salinan §4.7. */
export function perkiraanMenit(jumlahKartu: number): number {
  return Math.max(1, Math.round((jumlahKartu * 40) / 60));
}

/** Fisher–Yates; `acak` bisa diganti di tes supaya hasilnya pasti. Masukan tidak diubah. */
export function kocok<T>(daftar: readonly T[], acak: () => number = Math.random): T[] {
  const hasil = [...daftar];
  for (let i = hasil.length - 1; i > 0; i--) {
    const j = Math.floor(acak() * (i + 1));
    [hasil[i], hasil[j]] = [hasil[j], hasil[i]];
  }
  return hasil;
}

/** Kartu yang bisa dilatih: milik sendiri saja (kurasi tidak pernah ikut), opsional satu mapel. */
export function kartuUntukLatihan(kartu: Kartu[], mapelId: string | null): Kartu[] {
  return kartu.filter((k) => k.sumber === 'pengguna' && (!mapelId || k.mapel_id === mapelId));
}

export function susunAntrian(kartu: Kartu[], mapelId: string | null, batas: number, acak?: () => number): Kartu[] {
  return kocok(kartuUntukLatihan(kartu, mapelId), acak).slice(0, batas);
}

/**
 * Id buatan klien untuk sesi & catatan (idempotensi kirim ulang, B-K3).
 * Bukan rahasia — server tetap memeriksa kepemilikan. Pakai randomUUID bila
 * tersedia; selain itu UUID v4 dari Math.random.
 */
export function buatId(): string {
  const c = (globalThis as { crypto?: { randomUUID?: () => string } }).crypto;
  if (c?.randomUUID) return c.randomUUID();
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (h) => {
    const r = Math.floor(Math.random() * 16);
    return (h === 'x' ? r : (r & 0x3) | 0x8).toString(16);
  });
}

/** "2 Oktober 2026, 19.30" — waktu lokal perangkat (sesi bisa larut malam WIB). */
export function formatWaktuSesi(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  try {
    return new Intl.DateTimeFormat('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}
