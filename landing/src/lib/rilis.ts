// Metadata rilis APK (PRD-landpage §9). Sumbernya src/data/releases.json, dibaca saat build;
// salinannya ikut terbit di dist/releases/releases.json. Build gagal bila isinya tidak lolos
// periksaDataRilis(): situs tidak pernah menampilkan unduhan dari data yang belum benar.

export type Rilis = {
  version: string;
  releaseDate: string;
  channel: 'stable' | 'beta';
  title: string;
  summary: string;
  /** https://… atau jalur relatif terhadap akar situs (mis. 'unduh/lanjut-1.0.0.apk'). */
  apkUrl: string;
  fileSizeBytes: number | null;
  minAndroidVersion: string | null;
  sha256: string | null;
  changes: string[];
  knownIssues: string[];
};

export type DataRilis = { latestVersion: string | null; releases: Rilis[] };

const SEMVER = /^(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?$/;
const KUNCI = ['version', 'releaseDate', 'channel', 'title', 'summary', 'apkUrl', 'fileSizeBytes', 'minAndroidVersion', 'sha256', 'changes', 'knownIssues'];

// Teks contoh dari PRD-landpage §9. Kalau masih ada, metadatanya belum diisi sungguhan.
const TEKS_CONTOH = ['Ringkasan singkat rilis.', 'Fitur atau perubahan yang benar-benar tersedia.'];
const HOST_DILARANG = /(^|\.)(example\.(com|org|net)|localhost|contoh\.test|invalid|test)$/i;
const IP = /^\d{1,3}(\.\d{1,3}){3}$|^\[/;

/** Negatif bila a lebih lama dari b. Versi tanpa label pra-rilis dianggap lebih baru. */
export function bandingVersi(a: string, b: string): number {
  const x = SEMVER.exec(a);
  const y = SEMVER.exec(b);
  if (!x || !y) return a.localeCompare(b);
  for (let i = 1; i <= 3; i++) {
    const d = Number(x[i]) - Number(y[i]);
    if (d) return d;
  }
  if (x[4] === y[4]) return 0;
  if (!x[4]) return 1;
  if (!y[4]) return -1;
  return x[4].localeCompare(y[4], 'en', { numeric: true });
}

/** Rilis dari yang terbaru. */
export const urutRilis = (data: DataRilis): Rilis[] => [...data.releases].sort((a, b) => bandingVersi(b.version, a.version));

export const rilisTerbaru = (data: DataRilis): Rilis | null =>
  data.latestVersion ? data.releases.find((r) => r.version === data.latestVersion) ?? null : null;

function tanggalSah(s: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(s)) return false;
  const t = new Date(`${s}T00:00:00Z`);
  return !Number.isNaN(t.getTime()) && t.toISOString().slice(0, 10) === s;
}

/** Tanggal hari ini di WIB (YYYY-MM-DD). */
export function hariIniWib(sekarang: Date = new Date()): string {
  return new Date(sekarang.getTime() + 7 * 3600_000).toISOString().slice(0, 10);
}

/** Alasan apkUrl ditolak, atau null bila boleh dipakai. */
export function masalahApkUrl(url: unknown): string | null {
  if (typeof url !== 'string' || !url.trim()) return 'apkUrl kosong';
  if (/^[a-z][a-z0-9+.-]*:/i.test(url)) {
    let u: URL;
    try {
      u = new URL(url);
    } catch {
      return 'apkUrl bukan URL yang sah';
    }
    if (u.protocol !== 'https:') return 'apkUrl harus https';
    if (u.username || u.password) return 'apkUrl tidak boleh memuat kredensial';
    if (HOST_DILARANG.test(u.hostname) || IP.test(u.hostname)) return `host apkUrl tidak boleh dipakai (${u.hostname})`;
    if (u.search || u.hash) return 'apkUrl tidak boleh memuat query atau fragmen (tautan bertanda tangan/kedaluwarsa)';
    if (!/\.apk$/i.test(u.pathname)) return 'apkUrl harus menunjuk berkas .apk';
    return null;
  }
  if (url.startsWith('/') || url.split('/').some((b) => b === '..' || b === '.' || b === '')) return 'apkUrl relatif harus di bawah akar situs, tanpa / di awal dan tanpa ..';
  if (!/^[A-Za-z0-9._/-]+\.apk$/.test(url)) return 'apkUrl relatif harus berupa nama berkas .apk (huruf, angka, . _ - /)';
  return null;
}

const teksIsi = (v: unknown): v is string => typeof v === 'string' && v.trim().length > 0;

/**
 * Daftar masalah pada metadata rilis; kosong berarti sah. Tidak mengakses jaringan.
 * `hariIni` (YYYY-MM-DD) menolak tanggal rilis di masa depan.
 */
export function periksaDataRilis(data: unknown, hariIni: string = hariIniWib()): string[] {
  const masalah: string[] = [];
  if (!data || typeof data !== 'object' || Array.isArray(data)) return ['metadata rilis harus berupa objek'];
  const d = data as Record<string, unknown>;
  const lebih = Object.keys(d).filter((k) => k !== 'latestVersion' && k !== 'releases');
  if (lebih.length) masalah.push(`kunci tak dikenal di akar: ${lebih.join(', ')}`);
  if (!Array.isArray(d.releases)) return [...masalah, 'releases harus berupa daftar'];

  const versi = new Set<string>();
  d.releases.forEach((r: unknown, i: number) => {
    const awal = `releases[${i}]`;
    if (!r || typeof r !== 'object' || Array.isArray(r)) {
      masalah.push(`${awal}: harus berupa objek`);
      return;
    }
    const x = r as Record<string, unknown>;
    const nama = typeof x.version === 'string' ? `${awal} (${x.version})` : awal;
    const asing = Object.keys(x).filter((k) => !KUNCI.includes(k));
    if (asing.length) masalah.push(`${nama}: kunci tak dikenal: ${asing.join(', ')}`);
    for (const k of KUNCI) if (!(k in x)) masalah.push(`${nama}: ${k} wajib ada (pakai null bila belum diverifikasi)`);

    if (typeof x.version !== 'string' || !SEMVER.test(x.version)) masalah.push(`${nama}: version harus berbentuk X.Y.Z`);
    else if (versi.has(x.version)) masalah.push(`${nama}: version ganda`);
    else versi.add(x.version);

    if (typeof x.releaseDate !== 'string' || !tanggalSah(x.releaseDate)) masalah.push(`${nama}: releaseDate harus tanggal sungguhan YYYY-MM-DD`);
    else if (x.releaseDate > hariIni) masalah.push(`${nama}: releaseDate ${x.releaseDate} belum terjadi`);

    if (x.channel !== 'stable' && x.channel !== 'beta') masalah.push(`${nama}: channel harus "stable" atau "beta"`);
    for (const k of ['title', 'summary'] as const) if (!teksIsi(x[k])) masalah.push(`${nama}: ${k} wajib diisi`);

    const apk = masalahApkUrl(x.apkUrl);
    if (apk) masalah.push(`${nama}: ${apk}`);

    if (x.fileSizeBytes !== null && !(Number.isInteger(x.fileSizeBytes) && (x.fileSizeBytes as number) > 0))
      masalah.push(`${nama}: fileSizeBytes harus bilangan bulat positif atau null`);
    if (x.minAndroidVersion !== null && !(typeof x.minAndroidVersion === 'string' && /^\d{1,2}(\.\d{1,2})?$/.test(x.minAndroidVersion)))
      masalah.push(`${nama}: minAndroidVersion harus seperti "8.0" atau null`);
    if (x.sha256 !== null && !(typeof x.sha256 === 'string' && /^[0-9a-f]{64}$/.test(x.sha256)))
      masalah.push(`${nama}: sha256 harus 64 karakter heksadesimal huruf kecil atau null`);

    if (!Array.isArray(x.changes) || x.changes.length === 0 || !x.changes.every(teksIsi))
      masalah.push(`${nama}: changes harus daftar perubahan yang tidak kosong`);
    if (!Array.isArray(x.knownIssues) || !x.knownIssues.every(teksIsi)) masalah.push(`${nama}: knownIssues harus daftar teks (boleh kosong)`);

    const semuaTeks = JSON.stringify(x);
    for (const contoh of [...TEKS_CONTOH, 'YYYY-MM-DD']) if (semuaTeks.includes(contoh)) masalah.push(`${nama}: masih memuat teks contoh "${contoh}"`);
  });

  const rilis = d.releases as Rilis[];
  if (rilis.length === 0) {
    if (d.latestVersion !== null) masalah.push('latestVersion harus null selama belum ada rilis');
    return masalah;
  }
  if (typeof d.latestVersion !== 'string' || !rilis.some((r) => r.version === d.latestVersion)) {
    masalah.push('latestVersion harus sama dengan version salah satu rilis');
  } else if (masalah.length === 0) {
    const urut = urutRilis({ latestVersion: d.latestVersion, releases: rilis });
    if (urut[0].version !== d.latestVersion) masalah.push(`latestVersion ${d.latestVersion} bukan versi tertinggi (${urut[0].version})`);
    for (let i = 1; i < urut.length; i++) {
      if (urut[i].releaseDate > urut[i - 1].releaseDate)
        masalah.push(`tanggal ${urut[i].version} (${urut[i].releaseDate}) lebih baru daripada ${urut[i - 1].version} (${urut[i - 1].releaseDate})`);
    }
  }
  return masalah;
}

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

/** '2026-10-26' → '26 Oktober 2026'. */
export function formatTanggal(iso: string): string {
  const [t, b, h] = iso.split('-').map(Number);
  return `${h} ${BULAN[b - 1]} ${t}`;
}

/**
 * 25_431_808 → '24,3 MB' (1 MB = 1024 × 1024 byte). Ditulis manual, bukan toLocaleString:
 * hasil render di Node saat build harus sama persis dengan di peramban (hidrasi).
 */
export function formatUkuran(byte: number): string {
  return `${(byte / (1024 * 1024)).toFixed(1).replace('.', ',')} MB`;
}
