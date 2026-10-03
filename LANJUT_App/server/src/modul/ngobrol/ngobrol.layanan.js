// Ngobrol Bareng LANJUT dengan AI (LANJUT_051). Tidak ada SQL di sini.
//
// Urutan wajib sebelum apa pun dikirim ke luar:
//   1. gerbang bolehPakaiAi (persetujuan orang tua/wali + kebijakan diterima);
//   2. kunci OpenRouter tersedia di server.
// Yang dikirim ke penyedia: pesan sistem (aturan + profil belajar ringkas:
// kelas, jenis sekolah, nama prodi impian, gaya belajar) dan riwayat obrolan sesi
// ini. TIDAK dikirim: nama, nama pengguna, email, id akun.
// Isi obrolan tidak disimpan di server dan tidak dicatat di log.

const env = require('../../config/env');
const { GalatApi } = require('../../util/respons');
const { bolehPakaiAi } = require('../persetujuan/persetujuan.layanan');
const penggunaRepo = require('../pengguna/pengguna.repo');
const penyedia = require('./penyedia-ai');
const repo = require('./ngobrol.repo');

const GAYA_BELAJAR = {
  visual: 'Visual: paling nyambung lewat gambar, diagram, dan warna',
  auditori: 'Auditori: paling nyambung lewat mendengar penjelasan dan diskusi',
  kinestetik: 'Kinestetik: paling nyambung lewat praktik dan mencoba langsung',
  baca_tulis: 'Baca-Tulis: paling nyambung lewat membaca dan mencatat',
};

const ATURAN = `Kamu adalah "LANJUT", teman ngobrol di aplikasi LANJUT untuk siswa SMP, SMA, SMK, dan MA di Indonesia yang sedang menyiapkan langkah sesudah sekolah, terutama kuliah.
Tugasmu: membantu siswa mengenali minat, menemukan cara belajar yang cocok, dan menyusun rencana sekolah lanjutan, kuliah, atau karier.

Cara menjawab:
- Bahasa Indonesia yang santai dan ramah, seperti kakak kelas yang peduli. Pakai "aku" dan "kamu".
- Singkat: biasanya 2 sampai 5 kalimat, atau daftar pendek. Boleh akhiri dengan satu pertanyaan supaya obrolan berlanjut.
- Tulis teks biasa tanpa format Markdown: jangan pakai **, #, atau tabel. Untuk daftar, awali baris dengan "- ".
- Sesuaikan saran dengan profil siswa di bawah, tanpa mengulang-ulang isi profilnya. Untuk siswa SMP, bantu juga menimbang pilihan SMA, SMK, atau MA.
- Jangan menyebut tanggal, biaya, kuota, nilai minimum, atau syarat pendaftaran sebagai fakta pasti. Minta siswa mengecek situs resmi SNPMB atau kampus yang dituju, serta menu Jenjang dan Checklist di aplikasi LANJUT.
- Jangan meminta data pribadi (nama lengkap, alamat, nomor HP, NIK, NISN, nama sekolah, foto). Kalau siswa membagikannya, jangan diulang, dan ingatkan dengan ramah supaya tidak membagikannya.
- Bantu siswa memahami pelajaran langkah demi langkah, tetapi jangan mengerjakan seluruh PR atau soal ujian untuknya.
- Kamu bukan pengganti guru BK, psikolog, atau dokter. Untuk masalah kesehatan, hukum, atau keuangan keluarga yang serius, sarankan bicara dengan orang dewasa tepercaya.
- Kalau siswa bercerita ingin menyakiti diri, sedang dalam bahaya, atau mengalami kekerasan: tanggapi dengan hangat dan serius, minta ia segera bicara dengan orang tua atau wali, guru BK, atau orang dewasa lain yang ia percaya, dan menelepon 112 kalau sedang dalam bahaya saat itu juga.
- Tolak dengan sopan permintaan yang tidak pantas untuk pelajar.
- Kamu adalah AI dan jawabanmu bisa keliru. Kalau ditanya, katakan terus terang.`;

/** Teks profil dari akun: satu baris, tanpa baris baru, dibatasi panjangnya. */
const bersih = (nilai, maks = 100) => String(nilai).replace(/\s+/g, ' ').trim().slice(0, maks);

function pesanSistem(profil, namaProdi) {
  const p = profil || {};
  const baris = [
    `- Kelas: ${p.kelas ? bersih(p.kelas, 4) : 'belum diisi'}`,
    `- Jenis sekolah: ${p.jenis_sekolah ? bersih(p.jenis_sekolah, 4) : 'belum diisi'}`,
    `- Prodi impian: ${namaProdi ? bersih(namaProdi) : 'belum ditentukan'}`,
    `- Gaya belajar pilihannya: ${GAYA_BELAJAR[p.gaya_belajar] || 'belum dipilih'}`,
  ];
  return `${ATURAN}\n\nProfil siswa (dari akun LANJUT):\n${baris.join('\n')}`;
}

/** Batas pemakaian dari konfigurasi. Tanpa nilai cadangan: konfigurasi rusak → GALAT_SERVER. */
async function batas() {
  const nilai = Object.fromEntries((await repo.ambilKonfigurasi()).map((b) => [b.kunci, Number(b.nilai)]));
  const sah = (n) => Number.isInteger(n) && n >= 1;
  if (!sah(nilai.ngobrol_batas_5_menit) || !sah(nilai.ngobrol_batas_24_jam)) {
    throw new GalatApi('GALAT_SERVER', 'Konfigurasi batas Ngobrol tidak lengkap (jalankan npm run migrasi).');
  }
  return { per5Menit: nilai.ngobrol_batas_5_menit, per24Jam: nilai.ngobrol_batas_24_jam };
}

/** Riwayat app → format chat; pesan pembuka dari bot di awal dibuang (salam statis app). */
function keRiwayatChat(riwayat) {
  let mulai = 0;
  while (mulai < riwayat.length && riwayat[mulai].peran === 'bot') mulai++;
  return riwayat.slice(mulai).map((m) => ({ role: m.peran === 'pengguna' ? 'user' : 'assistant', content: m.teks }));
}

/** POST /ngobrol — balasan AI untuk pesan terakhir siswa. */
async function balas(penggunaId, riwayat) {
  if (!(await bolehPakaiAi(penggunaId))) {
    throw new GalatApi('AI_BELUM_DIIZINKAN', 'Fitur AI belum aktif untuk akun ini.');
  }
  if (!env.OPENROUTER_API_KEY) {
    throw new GalatApi('AI_TIDAK_TERSEDIA', 'Fitur AI belum disiapkan di server.');
  }
  const profil = await penggunaRepo.cariProfil(penggunaId);
  const prodi = profil && profil.prodi_tujuan ? await repo.namaProdi(profil.prodi_tujuan) : null;
  const pesan = [{ role: 'system', content: pesanSistem(profil, prodi) }, ...keRiwayatChat(riwayat)];
  try {
    const { teks } = await penyedia.mintaBalasan(pesan);
    return { balasan: teks };
  } catch (e) {
    if (!(e instanceof penyedia.GalatPenyedia)) throw e;
    console.error(`[ngobrol] ${e.message}`); // tanpa isi pesan
    throw new GalatApi('AI_GAGAL', 'AI sedang tidak bisa menjawab. Coba lagi sebentar lagi.');
  }
}

module.exports = { balas, batas, pesanSistem };
