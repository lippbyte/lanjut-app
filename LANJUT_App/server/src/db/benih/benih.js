// Benih: membaca MVP-PWA/data/*.json → INSERT ... ON DUPLICATE KEY UPDATE.
// docs/SDD-Backend-Foundation.md §3.6. Berkas JSON TIDAK disalin ke SQL —
// dibaca langsung dari sumbernya, dan itu tetap menjadi satu-satunya tempat
// konten diedit selama Panel Admin belum ada.
//
// Aturan yang mengikat (§3.6):
//   1. Metadata dibawa APA ADANYA — termasuk `status_verifikasi:
//      'belum_diverifikasi'` dan `diperiksa_pada: NULL`. Tidak "dirapikan".
//   2. Idempoten — bisa dijalankan berkali-kali dengan aman.
//   3. `status_verifikasi` & `diperiksa_pada` HANYA diisi saat baris baru
//      di-INSERT (LANJUT_011). Untuk baris yang sudah ada, keduanya sengaja
//      tidak ada di ON DUPLICATE KEY UPDATE: nilainya milik tim konten, yang
//      menandainya lewat `npm run verifikasi-konten`, dan benih ulang tidak
//      boleh menghapus kerja itu. Akibatnya, mengubah kedua nilai itu di JSON
//      tidak berpengaruh ke baris yang sudah ada — pakai skrip verifikasi.
//      Kartu (benihArsipKartu) tidak termasuk: bukan konten yang diverifikasi
//      lewat skrip itu.
//   4. ...KECUALI isinya berubah (LANJUT_020). Tanda verifikasi berlaku untuk
//      isi yang dicek, jadi bila ada SATU SAJA kolom non-verifikasi dari JSON
//      yang berbeda dengan baris di basis data, kedua kolom itu di-reset ke
//      'belum_diverifikasi' / NULL dan konten harus dicek & ditandai ulang.
//      Isi sama persis → tanda dibiarkan (aturan 3). Caranya: dua penugasan
//      verifikasi ditaruh PALING DEPAN di ON DUPLICATE KEY UPDATE — MySQL
//      menilai penugasan dari kiri ke kanan, jadi di sana kolom konten masih
//      bernilai LAMA dan bisa dibandingkan dengan VALUES() (`<=>` aman untuk
//      NULL). Semua kolom konten ikut dibandingkan, termasuk urutan/metadata:
//      reset yang tidak perlu hanya berarti cek ulang, sedangkan reset yang
//      terlewat berarti tanggal salah tampil sebagai "sudah dicek".
//
// CATATAN PEMETAAN NAMA MEDAN (bukan perubahan nilai):
// - `cerita-alumni.json` item punya field bernama `sumber` berisi "contoh" —
//   yang secara semantik cocok dengan kolom `asal` (nilai sejenis "mockup"/
//   "contoh"/"resmi" di berkas JSON lain), BUKAN dengan kolom `sumber` (kelas
//   kepercayaan resmi/pengguna/mitra, rancangan-arsip-latihan-banksoal.md §1).
//   Dua cerita di berkas itu ditulis TIM sebagai contoh, jadi kolom `sumber`
//   diisi 'resmi' (dikurasi tim) dan kolom `asal` diisi dari nilai item
//   tersebut ("contoh"). Nilai sebenarnya (izin_tayang, tayang, isi teks)
//   TIDAK diubah sama sekali.
// - `checklist.json` dikelompokkan lewat `kategori[]`; tabel `kategori_checklist`
//   (lihat catatan di migrasi 002) diisi dari situ.

const fs = require('fs');
const path = require('path');
const pool = require('../koneksi');

// server/src/db/benih → naik 5 tingkat ke akar repo. Data konten tinggal di
// MVP-PWA/data sejak restrukturisasi repo (78cfbad); sebelumnya app/data.
const DIR_DATA = path.join(__dirname, '..', '..', '..', '..', '..', 'MVP-PWA', 'data');

function bacaJson(namaBerkas) {
  const isi = fs.readFileSync(path.join(DIR_DATA, namaBerkas), 'utf8');
  return JSON.parse(isi);
}

/** `berkas` bisa diganti (dipakai test dengan berkas fixture); bawaan linimasa.json. */
async function benihLinimasa(berkas = bacaJson('linimasa.json')) {
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO tahapan_linimasa
         (id, judul, tanggal_mulai, tanggal_selesai, jalur,
          sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         status_verifikasi = IF(judul <=> VALUES(judul) AND tanggal_mulai <=> VALUES(tanggal_mulai) AND tanggal_selesai <=> VALUES(tanggal_selesai) AND
            jalur <=> VALUES(jalur) AND sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND
            asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            status_verifikasi, 'belum_diverifikasi'),
         diperiksa_pada = IF(judul <=> VALUES(judul) AND tanggal_mulai <=> VALUES(tanggal_mulai) AND tanggal_selesai <=> VALUES(tanggal_selesai) AND
            jalur <=> VALUES(jalur) AND sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND
            asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            diperiksa_pada, NULL),
         judul=VALUES(judul), tanggal_mulai=VALUES(tanggal_mulai),
         tanggal_selesai=VALUES(tanggal_selesai), jalur=VALUES(jalur),
         sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         asal=VALUES(asal), url_sumber=VALUES(url_sumber)`,
      [
        item.id,
        item.judul,
        item.tanggal_mulai,
        item.tanggal_selesai || null,
        item.jalur,
        berkas.sumber,
        berkas.pemilik,
        berkas.status || 'belum_diverifikasi',
        item.asal || berkas.asal,
        item.url_sumber || berkas.url_sumber || null,
        item.diperiksa_pada || berkas.diperiksa_pada || null,
      ]
    );
  }
  console.log(`[benih] tahapan_linimasa: ${berkas.data.length} baris`);
}

async function benihKhususSmk() {
  const berkas = bacaJson('khusus-smk.json');
  let urutan = 0;
  for (const item of berkas.data) {
    urutan += 1;
    await pool.execute(
      `INSERT INTO butir_khusus_smk
         (id, judul, apa_yang_beda, apa_yang_bisa_dilakukan, urutan,
          sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         status_verifikasi = IF(judul <=> VALUES(judul) AND apa_yang_beda <=> VALUES(apa_yang_beda) AND apa_yang_bisa_dilakukan <=> VALUES(apa_yang_bisa_dilakukan) AND
            urutan <=> VALUES(urutan) AND sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND
            asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            status_verifikasi, 'belum_diverifikasi'),
         diperiksa_pada = IF(judul <=> VALUES(judul) AND apa_yang_beda <=> VALUES(apa_yang_beda) AND apa_yang_bisa_dilakukan <=> VALUES(apa_yang_bisa_dilakukan) AND
            urutan <=> VALUES(urutan) AND sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND
            asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            diperiksa_pada, NULL),
         judul=VALUES(judul), apa_yang_beda=VALUES(apa_yang_beda),
         apa_yang_bisa_dilakukan=VALUES(apa_yang_bisa_dilakukan), urutan=VALUES(urutan),
         sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         asal=VALUES(asal), url_sumber=VALUES(url_sumber)`,
      [
        item.id,
        item.judul,
        item.apa_yang_beda,
        item.apa_yang_bisa_dilakukan,
        urutan,
        berkas.sumber,
        berkas.pemilik,
        berkas.status || 'belum_diverifikasi',
        berkas.asal,
        item.url_sumber || null,
        item.diperiksa_pada || null,
      ]
    );
  }
  console.log(`[benih] butir_khusus_smk: ${berkas.data.length} baris`);
}

async function benihProdi() {
  const berkas = bacaJson('prodi.json');
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO prodi
         (id, nama, rumpun, sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         status_verifikasi = IF(nama <=> VALUES(nama) AND rumpun <=> VALUES(rumpun) AND sumber <=> VALUES(sumber) AND
            pemilik <=> VALUES(pemilik) AND asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            status_verifikasi, 'belum_diverifikasi'),
         diperiksa_pada = IF(nama <=> VALUES(nama) AND rumpun <=> VALUES(rumpun) AND sumber <=> VALUES(sumber) AND
            pemilik <=> VALUES(pemilik) AND asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            diperiksa_pada, NULL),
         nama=VALUES(nama), rumpun=VALUES(rumpun), sumber=VALUES(sumber),
         pemilik=VALUES(pemilik), asal=VALUES(asal), url_sumber=VALUES(url_sumber)`,
      [
        item.id,
        item.nama,
        item.rumpun,
        berkas.sumber,
        berkas.pemilik,
        berkas.status || 'belum_diverifikasi',
        berkas.asal,
        berkas.url_sumber || null,
        berkas.diperiksa_pada || null,
      ]
    );
  }
  console.log(`[benih] prodi: ${berkas.data.length} baris`);
}

async function benihMapel() {
  const berkas = bacaJson('mapel.json');
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO mapel
         (id, nama, tersedia_di_smk, sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         status_verifikasi = IF(nama <=> VALUES(nama) AND tersedia_di_smk <=> VALUES(tersedia_di_smk) AND sumber <=> VALUES(sumber) AND
            pemilik <=> VALUES(pemilik) AND asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            status_verifikasi, 'belum_diverifikasi'),
         diperiksa_pada = IF(nama <=> VALUES(nama) AND tersedia_di_smk <=> VALUES(tersedia_di_smk) AND sumber <=> VALUES(sumber) AND
            pemilik <=> VALUES(pemilik) AND asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            diperiksa_pada, NULL),
         nama=VALUES(nama), tersedia_di_smk=VALUES(tersedia_di_smk), sumber=VALUES(sumber),
         pemilik=VALUES(pemilik), asal=VALUES(asal), url_sumber=VALUES(url_sumber)`,
      [
        item.id,
        item.nama,
        item.tersedia_di_smk ? 1 : 0,
        berkas.sumber,
        berkas.pemilik,
        berkas.status || 'belum_diverifikasi',
        berkas.asal,
        berkas.url_sumber || null,
        berkas.diperiksa_pada || null,
      ]
    );
  }
  console.log(`[benih] mapel: ${berkas.data.length} baris`);
}

async function benihProdiMapel() {
  const berkas = bacaJson('prodi-mapel.json');
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO prodi_mapel (prodi_id, mapel_id, bobot)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE bobot=VALUES(bobot)`,
      [item.prodi_id, item.mapel_id, item.bobot]
    );
  }
  console.log(`[benih] prodi_mapel: ${berkas.data.length} baris`);
}

async function benihCeritaAlumni() {
  const berkas = bacaJson('cerita-alumni.json');
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO cerita_alumni
         (id, nama, asal_smk, jurusan_smk, ptn, prodi, jalur, hambatan, yang_dilakukan,
          izin_tayang, tayang, sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         status_verifikasi = IF(nama <=> VALUES(nama) AND asal_smk <=> VALUES(asal_smk) AND jurusan_smk <=> VALUES(jurusan_smk) AND
            ptn <=> VALUES(ptn) AND prodi <=> VALUES(prodi) AND jalur <=> VALUES(jalur) AND
            hambatan <=> VALUES(hambatan) AND yang_dilakukan <=> VALUES(yang_dilakukan) AND izin_tayang <=> VALUES(izin_tayang) AND
            tayang <=> VALUES(tayang) AND sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND
            asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            status_verifikasi, 'belum_diverifikasi'),
         diperiksa_pada = IF(nama <=> VALUES(nama) AND asal_smk <=> VALUES(asal_smk) AND jurusan_smk <=> VALUES(jurusan_smk) AND
            ptn <=> VALUES(ptn) AND prodi <=> VALUES(prodi) AND jalur <=> VALUES(jalur) AND
            hambatan <=> VALUES(hambatan) AND yang_dilakukan <=> VALUES(yang_dilakukan) AND izin_tayang <=> VALUES(izin_tayang) AND
            tayang <=> VALUES(tayang) AND sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND
            asal <=> VALUES(asal) AND url_sumber <=> VALUES(url_sumber),
            diperiksa_pada, NULL),
         nama=VALUES(nama), asal_smk=VALUES(asal_smk), jurusan_smk=VALUES(jurusan_smk),
         ptn=VALUES(ptn), prodi=VALUES(prodi), jalur=VALUES(jalur), hambatan=VALUES(hambatan),
         yang_dilakukan=VALUES(yang_dilakukan), izin_tayang=VALUES(izin_tayang),
         tayang=VALUES(tayang), sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         asal=VALUES(asal), url_sumber=VALUES(url_sumber)`,
      [
        item.id,
        item.nama,
        item.asal_smk,
        item.jurusan_smk,
        item.ptn,
        item.prodi,
        item.jalur,
        item.hambatan,
        item.yang_dilakukan,
        item.izin_tayang ? 1 : 0,
        item.tayang ? 1 : 0,
        'resmi', // dikurasi tim — lihat catatan pemetaan di kepala berkas
        berkas.pemilik,
        berkas.status || 'belum_diverifikasi',
        item.sumber || berkas.asal, // nilai asli item.sumber dipetakan ke `asal`
        null,
        berkas.diperiksa_pada || null,
      ]
    );
  }
  console.log(`[benih] cerita_alumni: ${berkas.data.length} baris`);
}

/**
 * `berlaku_untuk_rumpun` (opsional, migrasi 006): array nama rumpun persis
 * seperti `rumpun` di prodi.json, mis. ["Kesehatan"]. Tidak ada / array
 * kosong → NULL = berlaku untuk semua rumpun (perilaku sebelum kolom ini).
 * Nama yang tidak dikenal DITOLAK: salah ketik akan membuat butir tidak
 * pernah tampil ke siapa pun tanpa ada yang sadar.
 */
function rumpunButir(butir, rumpunSah) {
  const daftar = butir.berlaku_untuk_rumpun;
  if (daftar === undefined || daftar === null) return null;
  if (!Array.isArray(daftar)) {
    throw new Error(`butir "${butir.id}": berlaku_untuk_rumpun harus array, mis. ["Kesehatan"].`);
  }
  if (daftar.length === 0) return null;
  for (const r of daftar) {
    if (!rumpunSah.has(r)) {
      throw new Error(
        `butir "${butir.id}": rumpun "${r}" tidak dikenal. Pilihan: ${[...rumpunSah].join(' | ')}`
      );
    }
  }
  return daftar.join(',');
}

/** `berkas` bisa diganti (dipakai test dengan berkas contoh); bawaan checklist.json. */
async function benihChecklist(berkas = bacaJson('checklist.json')) {
  const rumpunSah = new Set(bacaJson('prodi.json').data.map((p) => p.rumpun));
  // Validasi seluruh berkas dulu supaya salah ketik tidak meninggalkan benih setengah jadi.
  const rumpunPerButir = new Map();
  for (const kategori of berkas.kategori) {
    for (const butir of kategori.butir) rumpunPerButir.set(butir.id, rumpunButir(butir, rumpunSah));
  }

  let totalButir = 0;
  for (const kategori of berkas.kategori) {
    await pool.execute(
      `INSERT INTO kategori_checklist (id, nama, urutan)
       VALUES (?, ?, ?)
       ON DUPLICATE KEY UPDATE nama=VALUES(nama), urutan=VALUES(urutan)`,
      [kategori.id, kategori.nama, kategori.butir[0] ? kategori.butir[0].urutan : 0]
    );
    for (const butir of kategori.butir) {
      totalButir += 1;
      await pool.execute(
        `INSERT INTO butir_daftar_periksa
           (id, judul, urutan, berlaku_untuk_kelas, berlaku_untuk_jalur, berlaku_untuk_rumpun,
            kategori_id, sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           status_verifikasi = IF(judul <=> VALUES(judul) AND urutan <=> VALUES(urutan) AND berlaku_untuk_kelas <=> VALUES(berlaku_untuk_kelas) AND
              berlaku_untuk_jalur <=> VALUES(berlaku_untuk_jalur) AND berlaku_untuk_rumpun <=> VALUES(berlaku_untuk_rumpun) AND kategori_id <=> VALUES(kategori_id) AND
              sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND asal <=> VALUES(asal) AND
              url_sumber <=> VALUES(url_sumber),
              status_verifikasi, 'belum_diverifikasi'),
           diperiksa_pada = IF(judul <=> VALUES(judul) AND urutan <=> VALUES(urutan) AND berlaku_untuk_kelas <=> VALUES(berlaku_untuk_kelas) AND
              berlaku_untuk_jalur <=> VALUES(berlaku_untuk_jalur) AND berlaku_untuk_rumpun <=> VALUES(berlaku_untuk_rumpun) AND kategori_id <=> VALUES(kategori_id) AND
              sumber <=> VALUES(sumber) AND pemilik <=> VALUES(pemilik) AND asal <=> VALUES(asal) AND
              url_sumber <=> VALUES(url_sumber),
              diperiksa_pada, NULL),
           judul=VALUES(judul), urutan=VALUES(urutan),
           berlaku_untuk_kelas=VALUES(berlaku_untuk_kelas),
           berlaku_untuk_jalur=VALUES(berlaku_untuk_jalur),
           berlaku_untuk_rumpun=VALUES(berlaku_untuk_rumpun), kategori_id=VALUES(kategori_id),
           sumber=VALUES(sumber), pemilik=VALUES(pemilik),
           asal=VALUES(asal), url_sumber=VALUES(url_sumber)`,
        [
          butir.id,
          butir.judul,
          butir.urutan,
          butir.berlaku_untuk_kelas.join(','),
          butir.berlaku_untuk_jalur.join(','),
          rumpunPerButir.get(butir.id),
          kategori.id,
          berkas.sumber,
          berkas.pemilik,
          berkas.status || 'belum_diverifikasi',
          berkas.asal,
          berkas.url_sumber || null,
          berkas.diperiksa_pada || null,
        ]
      );
    }
  }
  console.log(`[benih] kategori_checklist: ${berkas.kategori.length} baris, butir_daftar_periksa: ${totalButir} baris`);
}

async function benihArsipKartu() {
  const berkas = bacaJson('arsip.json');
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO kartu
         (id, pemilik_id, mapel_id, judul, isi, jawaban, sumber, penyedia,
          pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada,
          dibuat_pada, diubah_pada)
       VALUES (?, NULL, ?, ?, ?, ?, ?, NULL, ?, ?, ?, NULL, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         mapel_id=VALUES(mapel_id), judul=VALUES(judul), isi=VALUES(isi),
         jawaban=VALUES(jawaban), sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         status_verifikasi=VALUES(status_verifikasi), asal=VALUES(asal),
         diperiksa_pada=VALUES(diperiksa_pada), diubah_pada=VALUES(diubah_pada)`,
      [
        item.id,
        item.mapel_id,
        item.judul,
        item.isi,
        item.jawaban || null,
        item.sumber,
        berkas.pemilik,
        'belum_diverifikasi',
        berkas.asal,
        berkas.diperiksa_pada || null, // diperiksa_pada (DATE, nullable)
        item.dibuat_pada + ' 00:00:00', // dibuat_pada (DATETIME)
        item.dibuat_pada + ' 00:00:00', // diubah_pada (DATETIME)
      ]
    );
  }
  console.log(`[benih] kartu (resmi): ${berkas.data.length} baris`);
}

async function jalankanBenih() {
  await benihProdi();
  await benihMapel();
  await benihProdiMapel();
  await benihLinimasa();
  await benihKhususSmk();
  await benihCeritaAlumni();
  await benihChecklist();
  await benihArsipKartu();
  console.log('[benih] selesai.');
}

if (require.main === module) {
  jalankanBenih()
    .then(() => process.exit(0))
    .catch((galat) => {
      console.error('[benih] GAGAL:', galat.message);
      process.exit(1);
    });
}

module.exports = { jalankanBenih, benihLinimasa, benihChecklist };
