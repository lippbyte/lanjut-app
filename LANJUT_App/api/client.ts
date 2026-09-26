import Constants from 'expo-constants';
import { Platform } from 'react-native';

/**
 * Base URL API diambil dari app.config.ts (field `extra.apiUrl*`) lewat
 * expo-constants, bukan di-hardcode di sini. Tiga kandidat URL sudah
 * disiapkan app.config.ts; PEMILIHANNYA terjadi di sini (runtime), bukan di
 * sana (config-time), karena hanya di sini `__DEV__` dan `Platform.OS`
 * benar-benar tersedia — dev-web (browser di komputer yang sama dengan
 * backend, "localhost" benar) dan dev-android (emulator/device, "localhost"
 * merujuk ke perangkat itu sendiri, bukan komputer) butuh nilai berbeda.
 */
const extra = Constants.expoConfig?.extra as
  | { apiUrlProd?: string; apiUrlDevAndroid?: string; apiUrlDevWeb?: string }
  | undefined;

const BASE_URL = __DEV__
  ? Platform.OS === 'web'
    ? extra?.apiUrlDevWeb
    : extra?.apiUrlDevAndroid
  : extra?.apiUrlProd;

if (!BASE_URL) {
  // Gagal cepat & jelas saat startup, daripada tiap hook diam-diam gagal
  // dengan "Network request failed" tanpa penjelasan dari mana asalnya.
  throw new Error(
    `[api/client] Base URL tidak ditemukan untuk __DEV__=${String(__DEV__)} Platform.OS=${Platform.OS} — cek app.config.ts.`
  );
}

// Bentuk respons Express persis server/src/util/respons.js `sukses`/`galat` —
// tipe ini SENGAJA disamakan literal dengan implementasi backend supaya
// perubahan bentuk di sana ketahuan lewat error TypeScript di sini, bukan
// gagal diam-diam saat runtime.
type ResponsSukses<T> = { ok: true; data: T; meta?: unknown };
type ResponsGalat = { ok: false; galat: { kode: string; pesan: string; medan?: unknown } };

export class ApiError extends Error {
  status: number;
  kode?: string;

  constructor(status: number, message: string, kode?: string) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.kode = kode;
  }
}

type ApiFetchOpsi = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: unknown;
  /** Token sesi mentah — dikirim sebagai `Authorization: Bearer <token>`.
   *  Wajib diisi untuk rute yang dijaga `wajibLogin` (mis. /kemajuan) —
   *  lihat server/src/middleware/autentikasi.js. */
  token?: string;
  query?: Record<string, string | undefined>;
};

/**
 * Satu fungsi fetch generik untuk seluruh API — tiap hook memanggil ini
 * dengan path relatif (mis. "/konten/linimasa"), bukan menyusun `fetch()`
 * sendiri-sendiri, supaya base URL & penanganan galat konsisten di satu
 * tempat (SDD Bagian 12: klien bicara ke "LAPISAN API" lewat satu jalur).
 */
export async function apiFetch<T>(path: string, opsi: ApiFetchOpsi = {}): Promise<T> {
  const url = new URL(BASE_URL!.replace(/\/$/, '') + path);
  if (opsi.query) {
    for (const [key, value] of Object.entries(opsi.query)) {
      if (value !== undefined) url.searchParams.set(key, value);
    }
  }

  let res: Response;
  try {
    res = await fetch(url.toString(), {
      method: opsi.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...(opsi.token ? { Authorization: `Bearer ${opsi.token}` } : {}),
      },
      body: opsi.body ? JSON.stringify(opsi.body) : undefined,
    });
  } catch (err) {
    // Network-level failure (server mati, salah IP, dsb) — bukan galat API
    // terstruktur, jadi dibungkus supaya tetap dikenali sebagai ApiError
    // oleh pemanggil (React Query `isError`) alih-alih TypeError mentah.
    throw new ApiError(0, `Gagal menghubungi ${url.origin}: ${(err as Error).message}`);
  }

  let json: ResponsSukses<T> | ResponsGalat;
  try {
    json = await res.json();
  } catch {
    throw new ApiError(res.status, `Respons bukan JSON (status ${res.status}) dari ${url.pathname}`);
  }

  if (!json.ok) {
    throw new ApiError(res.status, json.galat.pesan, json.galat.kode);
  }
  return json.data;
}
