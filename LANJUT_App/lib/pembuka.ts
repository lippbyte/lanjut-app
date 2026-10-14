/**
 * Animasi pembuka app dengan kelinci LANJUT (15 Okt 2026 — pilihan percakapan, belum disetujui PM).
 * Modul murni (tanpa React) supaya aturan waktunya bisa dites langsung dari server/tests.
 *
 * Tipis dan tidak menahan app:
 *   - masuk: kelinci memudar masuk sambil sedikit membesar dan naik;
 *   - selama app masih memuat (huruf + sesi), kelinci mengambang pelan;
 *   - keluar: begitu app siap DAN tampil minimal MIN_TAMPIL_MS, layar pembuka memudar keluar;
 *   - pengaman: paling lama MAKS_TAMPIL_MS, walau app belum siap (spinner memuat yang biasa ambil alih).
 * Pengguna dengan "kurangi gerakan" di perangkatnya: tanpa membesar/mengambang, hanya pudar singkat.
 */

export const DURASI_MASUK_MS = 450;
export const DURASI_KELUAR_MS = 280;
/** Waktu tampil minimum supaya animasi masuk sempat terlihat utuh, tidak berkedip. */
export const MIN_TAMPIL_MS = 900;
/** Batas atas: app tidak pernah tertahan layar pembuka lebih lama dari ini. */
export const MAKS_TAMPIL_MS = 4000;
/** Satu putaran mengambang (naik lalu turun). */
export const DURASI_MENGAMBANG_MS = 1400;
/** Skala awal & geser awal: kecil saja ("tipis"). */
export const SKALA_AWAL = 0.9;
export const GESER_AWAL_PX = 8;
export const AMBANG_MENGAMBANG_PX = 4;
/** Saat "kurangi gerakan": tanpa gerakan, pudar keluar lebih singkat. */
export const DURASI_KELUAR_TANPA_GERAK_MS = 150;

/** Layar pembuka boleh mulai memudar keluar? */
export function bolehTutup(siap: boolean, lewatMs: number): boolean {
  return (siap && lewatMs >= MIN_TAMPIL_MS) || lewatMs >= MAKS_TAMPIL_MS;
}

/** Sisa waktu (ms) sebelum boleh menutup, untuk penjadwal; 0 bila sudah boleh. */
export function sisaSebelumTutup(siap: boolean, lewatMs: number): number {
  if (bolehTutup(siap, lewatMs)) return 0;
  return siap ? MIN_TAMPIL_MS - lewatMs : MAKS_TAMPIL_MS - lewatMs;
}
