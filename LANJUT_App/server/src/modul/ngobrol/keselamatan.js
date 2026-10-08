// Keselamatan siswa di Ngobrol (LANJUT_053). Tanpa SQL, tanpa jaringan.
//
// - Deteksi tanda bahaya DI SERVER, dari daftar frasa di
//   server/config/tanda-bahaya.json (DRAF untuk review guru BK).
//   Tingkat akut → server membalas sendiri dengan teks tetap + kartu bantuan,
//   AI tidak dipanggil. Tingkat ringan → AI tetap menjawab dengan instruksi
//   menanggapi perasaan siswa lebih dulu.
// - Kartu bantuan dari server/config/kartu-bantuan.json. HANYA entri
//   `terverifikasi: true` yang pernah dikirim ke app.
// - Log hanya tingkat + waktu. Frasa yang cocok dan isi pesan TIDAK dicatat.
// Berkas konfigurasi dibaca dan diperiksa saat server menyala: berkas rusak
// membuat server gagal menyala, bukan diam-diam tanpa pengaman.

const fs = require('fs');
const path = require('path');

const DIR_KONFIG = path.join(__dirname, '..', '..', '..', 'config');
const bacaJson = (nama) => JSON.parse(fs.readFileSync(path.join(DIR_KONFIG, nama), 'utf8'));

const PENANDA_MODEL = /\[\[\s*BANTUAN\s*\]\]/gi;
const ANGKA_KE_HURUF = { 0: 'o', 1: 'i', 3: 'e', 4: 'a', 5: 's', 7: 't' };

function gagal(berkas, pesan) {
  throw new Error(`server/config/${berkas} tidak sah: ${pesan}`);
}

// --- normalisasi ---------------------------------------------------------------

/** Tiga huruf tunggal atau lebih berturut-turut digabung: "b u n u h" → "bunuh". */
function gabungHurufTerpisah(kata) {
  const hasil = [];
  let deret = [];
  const tutup = () => {
    if (deret.length >= 3) hasil.push(deret.join(''));
    else hasil.push(...deret);
    deret = [];
  };
  for (const k of kata) {
    if (/^[a-z]$/.test(k)) deret.push(k);
    else {
      tutup();
      hasil.push(k);
    }
  }
  tutup();
  return hasil;
}

/** Kata dasar: huruf kecil, angka di dalam kata → huruf, tanda baca → spasi, huruf terpisah digabung, huruf berulang diringkas. */
function kataDasar(teks) {
  const kata = String(teks)
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/@/g, 'a')
    .replace(/[^a-z0-9]+/g, ' ')
    .split(' ')
    .filter(Boolean)
    .map((k) => (/[a-z]/.test(k) ? k.replace(/[013457]/g, (d) => ANGKA_KE_HURUF[d]) : k));
  return gabungHurufTerpisah(kata).map((k) => k.replace(/(.)\1+/g, '$1'));
}

function siapkanEjaanGaul(ejaan) {
  if (!ejaan || typeof ejaan !== 'object') gagal('tanda-bahaya.json', 'ejaan_gaul harus objek');
  const peta = new Map();
  for (const [baku, varian] of Object.entries(ejaan)) {
    if (!Array.isArray(varian)) gagal('tanda-bahaya.json', `ejaan_gaul.${baku} harus daftar`);
    const bakuDasar = kataDasar(baku).join(' ');
    for (const v of varian) {
      const vDasar = kataDasar(v);
      if (vDasar.length !== 1) gagal('tanda-bahaya.json', `ejaan_gaul "${v}" harus satu kata`);
      peta.set(vDasar[0], bakuDasar);
    }
  }
  return peta;
}

// --- muat konfigurasi (sekali, saat server menyala) --------------------------------------

const TANDA = bacaJson('tanda-bahaya.json');
const EJAAN_GAUL = siapkanEjaanGaul(TANDA.ejaan_gaul);

/** Teks → bentuk baku untuk dicocokkan: kata dasar, lalu kata gaul diganti bentuk bakunya. */
function normalisasi(teks) {
  return kataDasar(teks)
    .map((k) => EJAAN_GAUL.get(k) || k)
    .join(' ');
}

function siapkanFrasa(daftar, letak) {
  if (!Array.isArray(daftar) || daftar.length === 0) gagal('tanda-bahaya.json', `${letak} harus daftar berisi`);
  return daftar.map((f) => {
    const n = normalisasi(f);
    if (!n) gagal('tanda-bahaya.json', `frasa kosong di ${letak}`);
    return n;
  });
}

if (!TANDA.akut || typeof TANDA.akut !== 'object' || Object.keys(TANDA.akut).length === 0) {
  gagal('tanda-bahaya.json', 'akut harus objek berisi kategori');
}
const FRASA_AKUT = Object.entries(TANDA.akut).flatMap(([kategori, daftar]) =>
  siapkanFrasa(daftar, `akut.${kategori}`).map((frasa) => ({ frasa, kategori }))
);
const FRASA_RINGAN = siapkanFrasa(TANDA.ringan, 'ringan');

const KARTU = bacaJson('kartu-bantuan.json');
if (!Array.isArray(KARTU.layanan)) gagal('kartu-bantuan.json', 'layanan harus daftar');
for (const [i, l] of KARTU.layanan.entries()) {
  for (const k of ['nama', 'nomor_atau_alamat', 'keterangan', 'sumber']) {
    if (typeof l[k] !== 'string' || !l[k].trim()) gagal('kartu-bantuan.json', `layanan[${i}].${k} kosong`);
  }
  if (typeof l.terverifikasi !== 'boolean') gagal('kartu-bantuan.json', `layanan[${i}].terverifikasi harus true/false`);
  if (!('tanggal_cek' in l)) gagal('kartu-bantuan.json', `layanan[${i}].tanggal_cek wajib ada (boleh null)`);
}
if (!KARTU.layanan.some((l) => l.terverifikasi)) gagal('kartu-bantuan.json', 'minimal satu layanan terverifikasi');

const TEKS = bacaJson('ngobrol-teks.json');
for (const k of ['empati_akut', 'kartu_judul', 'kartu_penutup', 'tolak_luar_topik', 'tolak_abaikan_aturan', 'stub_uji_coba']) {
  if (typeof TEKS[k] !== 'string' || !TEKS[k].trim()) gagal('ngobrol-teks.json', `${k} kosong`);
}

// --- API ---------------------------------------------------------------------------------

/** { tingkat: 'akut' | 'ringan' | null, kategori }. Kategori hanya untuk tes; jangan dicatat. */
function deteksi(teks) {
  const t = ` ${normalisasi(teks)} `;
  const akut = FRASA_AKUT.find(({ frasa }) => t.includes(` ${frasa} `));
  if (akut) return { tingkat: 'akut', kategori: akut.kategori };
  if (FRASA_RINGAN.some((frasa) => t.includes(` ${frasa} `))) return { tingkat: 'ringan', kategori: null };
  return { tingkat: null, kategori: null };
}

/** Kartu bantuan untuk app: HANYA layanan terverifikasi, tanpa kolom internal. */
function kartuBantuan() {
  return {
    judul: TEKS.kartu_judul,
    layanan: KARTU.layanan
      .filter((l) => l.terverifikasi === true)
      .map(({ nama, nomor_atau_alamat, keterangan }) => ({ nama, nomor_atau_alamat, keterangan })),
    penutup: TEKS.kartu_penutup,
  };
}

/** Penanda [[BANTUAN]] dari model: dibuang dari teks; `ada` = model menilai siswa mungkin dalam bahaya. */
function pisahkanPenanda(teks) {
  const ada = PENANDA_MODEL.test(teks);
  PENANDA_MODEL.lastIndex = 0;
  return { teks: teks.replace(PENANDA_MODEL, '').trim(), ada };
}

/** Log keselamatan: tingkat + waktu saja. */
function catat(tingkat) {
  console.log(`[keselamatan] tingkat=${tingkat} waktu=${new Date().toISOString()}`);
}

module.exports = { deteksi, normalisasi, kartuBantuan, pisahkanPenanda, catat, TEKS };
