// LANJUT_083b — apakah lanjut-demo.apk sudah ada di sebelah halaman ini?
// Dicek saat halaman dibuka (bukan saat build), supaya APK yang diunggah PM belakangan
// langsung terdeteksi tanpa build ulang. Hanya ke alamat sendiri (CSP default-src 'self').

export const BERKAS_APK = 'lanjut-demo.apk';

function adalahApk(res: Response): boolean {
  if (!res.ok) return false;
  // Server yang menjawab berkas tak ada dengan halaman HTML (fallback/404 kustom) bukan APK.
  return !(res.headers.get('content-type') ?? '').toLowerCase().includes('text/html');
}

export async function apkTersedia(url: string = BERKAS_APK, ambil: typeof fetch = fetch): Promise<boolean> {
  try {
    const res = await ambil(url, { method: 'HEAD', cache: 'no-store' });
    if (res.status !== 405 && res.status !== 501) return adalahApk(res);
    // Hosting tanpa HEAD: minta 1 byte saja, lalu hentikan unduhan.
    const sebagian = await ambil(url, { headers: { Range: 'bytes=0-0' }, cache: 'no-store' });
    await sebagian.body?.cancel().catch(() => {});
    return adalahApk(sebagian);
  } catch {
    return false;
  }
}
