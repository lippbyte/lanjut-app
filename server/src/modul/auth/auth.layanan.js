// Aturan bisnis auth. Tidak ada SQL di sini — hanya memanggil repositori.
// docs/SDD-Backend-Foundation.md §5.4, §8.1, §8.2.

const { buatUuid } = require('../../util/id');
const { sekarangUntukDb, sekarangIso, keIso } = require('../../util/waktu');
const { hashKataSandi, cocokKataSandi } = require('../../util/kata-sandi');
const { buatTokenMentah, hashToken } = require('../../util/token');
const { GalatApi } = require('../../util/respons');
const env = require('../../config/env');

const penggunaRepo = require('../pengguna/pengguna.repo');
const kontenRepo = require('../konten/konten.repo');
const sesiRepo = require('./sesi.repo');
const percobaanRepo = require('./percobaanMasuk.repo');

// Pemetaan prodi_impian → prodi_tujuan dilakukan DI SATU TEMPAT SAJA (§3.3).
function petakanProdiTujuan(prodiImpian) {
  if (!prodiImpian || prodiImpian === 'belum') return null;
  return prodiImpian;
}

// C-2/C-2b: validasi keberadaan prodi sebelum menyimpan, di SATU TEMPAT SAJA
// supaya semua jalur tulis (daftar, ubah profil, klaim sinkron) memakai
// aturan yang sama. Tanpa ini, prodi yang tidak dikenal jatuh ke pelanggaran
// FK saat disimpan dan bocor sebagai HTTP 500, bukan 400 VALIDASI_GAGAL.
// `prodiTujuan` di sini SUDAH melalui petakanProdiTujuan() — null berarti
// "belum ada pilihan" dan selalu valid.
async function pastikanProdiValid(prodiTujuan) {
  if (!prodiTujuan) return;
  const prodiAda = await kontenRepo.prodiAda(prodiTujuan);
  if (!prodiAda) {
    throw new GalatApi('VALIDASI_GAGAL', 'Prodi tidak dikenali.', {
      prodi_impian: 'tidak dikenali',
    });
  }
}

function bentukProfil(baris) {
  return {
    id: baris.id,
    nama_pengguna: baris.nama_pengguna,
    nama_tampilan: baris.nama_tampilan || baris.nama_pengguna,
    email: baris.email,
    peran: baris.peran,
    status: baris.status,
    kelas: baris.kelas,
    // Kolom DB tetap `prodi_tujuan` (FK -> prodi.id, §13/§3.3), tapi kontrak
    // API menamainya `prodi_impian` (keputusan PM, C-1). Jangan ubah nama
    // kolom DB — hanya nama medan di respons ini.
    prodi_impian: baris.prodi_tujuan,
    dibuat_pada: keIso(baris.dibuat_pada),
    terakhir_masuk_pada: keIso(baris.terakhir_masuk_pada),
  };
}

async function daftar({ nama_pengguna, kata_sandi, nama_tampilan, email, kelas, prodi_impian }) {
  const dipakai = await penggunaRepo.cekNamaPenggunaDipakai(nama_pengguna);
  if (dipakai) {
    throw new GalatApi(
      'NAMA_PENGGUNA_DIPAKAI',
      'Nama pengguna sudah dipakai.',
      { nama_pengguna: 'sudah dipakai' }
    );
  }

  const prodiTujuan = petakanProdiTujuan(prodi_impian);
  // C-2: validasi keberadaan prodi SEBELUM insert (helper bersama di atas).
  await pastikanProdiValid(prodiTujuan);

  // C-3: validasi email duplikat SEBELUM insert. Tanpa ini, email yang sudah
  // dipakai jatuh ke pelanggaran uq_pengguna_email saat INSERT dan bocor
  // sebagai HTTP 500, bukan 400 EMAIL_DIPAKAI yang seharusnya.
  if (email) {
    const emailDipakai = await penggunaRepo.emailSudahAda(email);
    if (emailDipakai) {
      throw new GalatApi('EMAIL_DIPAKAI', 'Email sudah terdaftar.', {
        email: 'sudah dipakai',
      });
    }
  }

  const id = buatUuid();
  const kataSandiHash = await hashKataSandi(kata_sandi);
  const dibuatPada = sekarangUntukDb();

  await penggunaRepo.buatPengguna({
    id,
    namaPengguna: nama_pengguna,
    namaTampilan: nama_tampilan,
    email,
    kataSandiHash,
    kelas,
    prodiTujuan,
    dibuatPada,
  });

  return buatSesiDanBentukRespons(id);
}

async function masuk({ nama_pengguna, kata_sandi }) {
  const status = await percobaanRepo.ambil(nama_pengguna);
  if (status && status.terkunci_sampai && new Date(status.terkunci_sampai) > new Date()) {
    throw new GalatApi(
      'TERLALU_SERING',
      'Akun ini sementara dikunci karena terlalu banyak percobaan gagal.'
    );
  }

  const baris = await penggunaRepo.cariUntukMasuk(nama_pengguna);

  // SELALU jalankan bcrypt.compare, juga saat akun tidak ada, terhadap hash
  // boneka — supaya lama respons tidak membocorkan akun mana yang ada (§5.4).
  const hashUntukDibandingkan = baris ? baris.kata_sandi_hash : null;
  const cocok = await cocokKataSandi(kata_sandi, hashUntukDibandingkan);

  if (!baris || !cocok || baris.status !== 'aktif') {
    await percobaanRepo.catatGagal(nama_pengguna);
    throw new GalatApi('KREDENSIAL_SALAH', 'Nama pengguna atau kata sandi tidak cocok.');
  }

  await percobaanRepo.resetSetelahBerhasil(nama_pengguna);
  await penggunaRepo.tandaiTerakhirMasuk(baris.id, sekarangUntukDb());

  return buatSesiDanBentukRespons(baris.id);
}

async function buatSesiDanBentukRespons(penggunaId, perangkat) {
  const tokenMentah = buatTokenMentah();
  const tokenHash = hashToken(tokenMentah);
  const { kedaluwarsaPada } = await sesiRepo.buatSesi(
    penggunaId,
    tokenHash,
    env.SESI_UMUR_HARI,
    perangkat
  );
  const profilBaris = await penggunaRepo.cariProfil(penggunaId);
  return {
    token: tokenMentah,
    kedaluwarsa_pada: keIso(kedaluwarsaPada),
    pengguna: bentukProfil(profilBaris),
  };
}

async function keluar(req) {
  if (req.tokenHashSaatIni && req.pengguna) {
    await sesiRepo.cabutSesiByTokenHash(req.tokenHashSaatIni, req.pengguna.id);
  }
}

async function keluarSemua(penggunaId) {
  await sesiRepo.cabutSemuaSesiPengguna(penggunaId);
}

async function saya(penggunaId) {
  const baris = await penggunaRepo.cariProfil(penggunaId);
  if (!baris) throw new GalatApi('TIDAK_DITEMUKAN', 'Pengguna tidak ditemukan.');
  return bentukProfil(baris);
}

async function ubahSandi(penggunaId, { kata_sandi_lama, kata_sandi_baru }) {
  // cariUntukMasuk butuh nama_pengguna; ambil dulu profil untuk tahu nama_pengguna-nya.
  const profil = await penggunaRepo.cariProfil(penggunaId);
  if (!profil) throw new GalatApi('TIDAK_DITEMUKAN', 'Pengguna tidak ditemukan.');

  const baris = await penggunaRepo.cariUntukMasuk(profil.nama_pengguna);
  const cocok = await cocokKataSandi(kata_sandi_lama, baris.kata_sandi_hash);
  if (!cocok) {
    throw new GalatApi('KREDENSIAL_SALAH', 'Kata sandi lama tidak cocok.', {
      kata_sandi_lama: 'tidak cocok',
    });
  }

  const hashBaru = await hashKataSandi(kata_sandi_baru);
  await penggunaRepo.updateKataSandiHash(penggunaId, hashBaru);
  // Sukses → seluruh sesi lain dicabut (§4.3).
  await sesiRepo.cabutSemuaSesiPengguna(penggunaId);
}

module.exports = {
  daftar,
  masuk,
  keluar,
  keluarSemua,
  saya,
  ubahSandi,
  petakanProdiTujuan,
  pastikanProdiValid,
  bentukProfil,
};
