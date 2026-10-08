// Penyamaran data pribadi sebelum dikirim ke penyedia AI (LANJUT_053).
// Diganti dengan "[disamarkan]": alamat email, deretan 16 angka mirip NIK
// (boleh dipisah spasi/titik/strip), dan nomor telepon Indonesia (+62, 62,
// atau 0 di depan; ponsel maupun telepon rumah). Nomor 10 angka berawalan 0
// (mis. NISN) ikut tersamarkan oleh pola telepon. Isi yang disamarkan tidak
// pernah dicatat.

const PENGGANTI = '[disamarkan]';

const POLA = [
  // email
  /[A-Za-z0-9._%+-]+@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,}/g,
  // 16 angka mirip NIK, boleh dengan pemisah
  /(?<!\d)\d(?:[\s.-]?\d){15}(?!\d)/g,
  // telepon Indonesia: +62 / 62 / 0, lalu 8–12 angka lagi, boleh dengan pemisah atau kurung
  /(?<![\d+(])\(?(?:\+\s?62|62|0)(?:[\s.-]?\(?\d\)?){8,12}(?!\d)/g,
];

/** { teks, disamarkan } — `disamarkan` = ada yang diganti. */
function samarkan(teks) {
  let hasil = String(teks);
  for (const pola of POLA) hasil = hasil.replace(pola, PENGGANTI);
  return { teks: hasil, disamarkan: hasil !== String(teks) };
}

module.exports = { samarkan, PENGGANTI };
