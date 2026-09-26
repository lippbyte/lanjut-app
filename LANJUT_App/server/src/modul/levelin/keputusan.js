// ============================================================================
// TODO — BELUM DIISI. JANGAN ISI DENGAN TEBAKAN.
// ============================================================================
//
// docs/SDD-Backend-Foundation.md B-K6 & §9.2 mewajibkan berkas ini menjadi
// SALINAN PERSIS lapisan 2 (fungsi murni) dari `app/assets/levelin.js`:
// `gapNumerik()`, `klasifikasiKartu()`, `agregatPerMapel()`, `ringkasSesi()`,
// `saranHarian()`. Alasannya (RB5, docs/SDD-LevelIn.md §4.3 no. 2): server
// TIDAK BOLEH punya sumber kebenaran kedua untuk angka kalibrasi yang sama —
// kedua sisi wajib diuji dengan BERKAS KASUS UJI YANG SAMA
// (`levelin-keputusan.test.js` di server, `tools/test-levelin.js` di klien).
//
// Pada saat berkas ini ditulis (lihat docs/SDD-Backend-Foundation.md §9.3 B6,
// prasyarat "Level-In klien selesai"), `app/assets/levelin.js` BELUM ADA di
// repositori — ui-engineer sedang/akan mengerjakannya secara paralel. Karena
// itu, sesuai instruksi eksplisit tugas ini, fungsi di bawah SENGAJA TIDAK
// diisi dengan interpretasi/tebakan dari docs/SDD-LevelIn.md §6.1 — menebak
// di sini justru menciptakan risiko RB5 yang aturan ini coba cegah (dua
// implementasi yang menyimpang diam-diam).
//
// CARA MENYELESAIKAN BERKAS INI SETELAH `app/assets/levelin.js` ADA:
//   1. Buka `app/assets/levelin.js`, salin PERSIS isi Lapisan 2 (Keputusan)
//      — `gapNumerik`, `klasifikasiKartu`, `agregatPerMapel`, `ringkasSesi`,
//      `saranHarian` — apa adanya (fungsi murni: tanpa DOM, tanpa jam, tanpa
//      storage; seluruh masukan lewat argumen).
//   2. Tempel ke bawah, ganti `module.exports` sesuai kebutuhan CommonJS
//      (klien memakai `global.LANJUT_LEVELIN = {...}`, server memakai
//      `module.exports = {...}` — HANYA pembungkus ekspor yang boleh beda,
//      badan fungsi harus identik).
//   3. Salin `tools/test-levelin.js` (kasus uji klien) menjadi dasar
//      `tests/levelin-keputusan.test.js` di server — berkas kasus uji yang
//      SAMA, dua pemanggil (§9.4).
//   4. Hapus komentar TODO ini.
//
// Selama berkas ini belum diisi, seluruh endpoint yang bergantung padanya
// (`GET /kalibrasi/ringkasan`, `GET /saran-harian`) akan melempar error yang
// jelas, BUKAN mengembalikan angka karangan.
// ============================================================================

function belumDiisi(namaFungsi) {
  throw new Error(
    `[keputusan.js] "${namaFungsi}" belum diisi — menunggu app/assets/levelin.js ` +
      'selesai dibuat ui-engineer, lalu disalin persis ke sini. Lihat komentar ' +
      'di kepala berkas ini.'
  );
}

function gapNumerik() {
  belumDiisi('gapNumerik');
}

function klasifikasiKartu() {
  belumDiisi('klasifikasiKartu');
}

function agregatPerMapel() {
  belumDiisi('agregatPerMapel');
}

function ringkasSesi() {
  belumDiisi('ringkasSesi');
}

function saranHarian() {
  belumDiisi('saranHarian');
}

module.exports = { gapNumerik, klasifikasiKartu, agregatPerMapel, ringkasSesi, saranHarian };
