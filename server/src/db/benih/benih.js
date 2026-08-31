// Benih: membaca app/data/*.json → INSERT ... ON DUPLICATE KEY UPDATE.
// docs/SDD-Backend-Foundation.md §3.6. Berkas JSON TIDAK disalin ke SQL —
// dibaca langsung dari sumbernya, dan itu tetap menjadi satu-satunya tempat
// konten diedit selama Panel Admin belum ada.
//
// Aturan yang mengikat (§3.6):
//   1. Metadata dibawa APA ADANYA — termasuk `status_verifikasi:
//      'belum_diverifikasi'` dan `diperiksa_pada: NULL`. Tidak "dirapikan".
//   2. Idempoten — bisa dijalankan berkali-kali dengan aman.
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

const DIR_DATA = path.join(__dirname, '..', '..', '..', '..', 'app', 'data');

function bacaJson(namaBerkas) {
  const isi = fs.readFileSync(path.join(DIR_DATA, namaBerkas), 'utf8');
  return JSON.parse(isi);
}

async function benihLinimasa() {
  const berkas = bacaJson('linimasa.json');
  for (const item of berkas.data) {
    await pool.execute(
      `INSERT INTO tahapan_linimasa
         (id, judul, tanggal_mulai, tanggal_selesai, jalur,
          sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON DUPLICATE KEY UPDATE
         judul=VALUES(judul), tanggal_mulai=VALUES(tanggal_mulai),
         tanggal_selesai=VALUES(tanggal_selesai), jalur=VALUES(jalur),
         sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         status_verifikasi=VALUES(status_verifikasi), asal=VALUES(asal),
         url_sumber=VALUES(url_sumber), diperiksa_pada=VALUES(diperiksa_pada)`,
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
         judul=VALUES(judul), apa_yang_beda=VALUES(apa_yang_beda),
         apa_yang_bisa_dilakukan=VALUES(apa_yang_bisa_dilakukan), urutan=VALUES(urutan),
         sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         status_verifikasi=VALUES(status_verifikasi), asal=VALUES(asal),
         url_sumber=VALUES(url_sumber), diperiksa_pada=VALUES(diperiksa_pada)`,
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
         nama=VALUES(nama), rumpun=VALUES(rumpun), sumber=VALUES(sumber),
         pemilik=VALUES(pemilik), status_verifikasi=VALUES(status_verifikasi),
         asal=VALUES(asal), url_sumber=VALUES(url_sumber), diperiksa_pada=VALUES(diperiksa_pada)`,
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
         nama=VALUES(nama), tersedia_di_smk=VALUES(tersedia_di_smk), sumber=VALUES(sumber),
         pemilik=VALUES(pemilik), status_verifikasi=VALUES(status_verifikasi),
         asal=VALUES(asal), url_sumber=VALUES(url_sumber), diperiksa_pada=VALUES(diperiksa_pada)`,
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
         nama=VALUES(nama), asal_smk=VALUES(asal_smk), jurusan_smk=VALUES(jurusan_smk),
         ptn=VALUES(ptn), prodi=VALUES(prodi), jalur=VALUES(jalur), hambatan=VALUES(hambatan),
         yang_dilakukan=VALUES(yang_dilakukan), izin_tayang=VALUES(izin_tayang),
         tayang=VALUES(tayang), sumber=VALUES(sumber), pemilik=VALUES(pemilik),
         status_verifikasi=VALUES(status_verifikasi), asal=VALUES(asal),
         url_sumber=VALUES(url_sumber), diperiksa_pada=VALUES(diperiksa_pada)`,
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

async function benihChecklist() {
  const berkas = bacaJson('checklist.json');
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
           (id, judul, urutan, berlaku_untuk_kelas, berlaku_untuk_jalur, kategori_id,
            sumber, pemilik, status_verifikasi, asal, url_sumber, diperiksa_pada)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           judul=VALUES(judul), urutan=VALUES(urutan),
           berlaku_untuk_kelas=VALUES(berlaku_untuk_kelas),
           berlaku_untuk_jalur=VALUES(berlaku_untuk_jalur), kategori_id=VALUES(kategori_id),
           sumber=VALUES(sumber), pemilik=VALUES(pemilik),
           status_verifikasi=VALUES(status_verifikasi), asal=VALUES(asal),
           url_sumber=VALUES(url_sumber), diperiksa_pada=VALUES(diperiksa_pada)`,
        [
          butir.id,
          butir.judul,
          butir.urutan,
          butir.berlaku_untuk_kelas.join(','),
          butir.berlaku_untuk_jalur.join(','),
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

module.exports = { jalankanBenih };
