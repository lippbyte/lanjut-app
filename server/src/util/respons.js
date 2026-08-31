// Bentuk respons seragam — docs/SDD-Backend-Foundation.md §4.2.

function sukses(res, data, meta, statusHttp) {
  const body = { ok: true, data: data === undefined ? {} : data };
  if (meta !== undefined) body.meta = meta;
  return res.status(statusHttp || 200).json(body);
}

// Peta kode galat → status HTTP (§4.2).
const STATUS_PER_KODE = {
  VALIDASI_GAGAL: 400,
  KREDENSIAL_SALAH: 401,
  TIDAK_MASUK: 401,
  SESI_KEDALUWARSA: 401,
  TIDAK_BERHAK: 403,
  TIDAK_DITEMUKAN: 404,
  NAMA_PENGGUNA_DIPAKAI: 409,
  EMAIL_DIPAKAI: 400,
  TERLALU_SERING: 429,
  GALAT_SERVER: 500,
};

class GalatApi extends Error {
  constructor(kode, pesan, medan) {
    super(pesan || kode);
    this.kode = kode;
    this.medan = medan;
    this.statusHttp = STATUS_PER_KODE[kode] || 500;
  }
}

function galat(res, kode, pesan, medan) {
  const statusHttp = STATUS_PER_KODE[kode] || 500;
  const body = { ok: false, galat: { kode, pesan: pesan || kode } };
  if (medan) body.galat.medan = medan;
  return res.status(statusHttp).json(body);
}

module.exports = { sukses, galat, GalatApi, STATUS_PER_KODE };
