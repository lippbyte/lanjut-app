/**
 * api/types.ts — Bentuk data mengikuti docs/prd-sdd-lanjut.md Bagian 13
 * (Model Data), diverifikasi ulang lewat DUA sumber sungguhan (bukan
 * ditebak dari tabel PRD saja):
 *  1. Kolom SQL nyata di `server/src/modul/konten/konten.repo.js` dan skema
 *     migrasi `server/src/db/migrasi/002_konten_p0.sql` / `003_kemajuan.sql`.
 *  2. Respons `curl` sungguhan dari backend yang jalan lokal (bukan dugaan) —
 *     dari sinilah ketahuan seluruh kolom `id` di database bertipe
 *     VARCHAR(64) (slug, mis. "administrasi-bisnis"), BUKAN integer seperti
 *     draf pertama berkas ini — kalau hanya membaca Bagian 13 PRD ("id")
 *     tanpa mengecek nilai asli, kesalahan ini tidak akan ketahuan.
 */

// SDD Bagian 12: kolom wajib di SETIAP entitas konten resmi (linimasa,
// khusus-smk, prodi, mapel, cerita-alumni, daftar-periksa) — digabung jadi
// satu type supaya tidak ditulis ulang lima kali. `diperiksa_pada` nullable
// karena data seed saat ini benar-benar mengembalikan `null` (belum ada
// tanggal pengecekan resmi) — dikonfirmasi dari respons curl, bukan dugaan.
type MetaSumberResmi = {
  sumber: string;
  pemilik: string;
  status_verifikasi: string;
  asal: string;
  url_sumber: string;
  diperiksa_pada: string | null;
};

// F1 — tahapan_linimasa (konten.repo.js `ambilLinimasa`).
export type TahapanLinimasa = MetaSumberResmi & {
  id: string; // VARCHAR(64) slug, mis. "sosialisasi" — bukan angka
  judul: string;
  tanggal_mulai: string; // ISO date, dikonversi backend lewat util/waktu.keTanggal
  tanggal_selesai: string;
  jalur: 'TKA' | 'SNBP' | 'SNBT';
};

// F2 — butir_khusus_smk (konten.repo.js `ambilKhususSmk`).
export type ButirKhususSmk = MetaSumberResmi & {
  id: string; // VARCHAR(64) slug, mis. "nilai-rapor"
  judul: string;
  apa_yang_beda: string;
  apa_yang_bisa_dilakukan: string;
  urutan: number;
};

// F3 — prodi (konten.repo.js `ambilProdi`).
export type Prodi = MetaSumberResmi & {
  id: string; // VARCHAR(64) slug, mis. "administrasi-bisnis"
  nama: string;
  rumpun: string;
};

// F10 — profil_prodi (konten.rute.js `bentukProfilProdi`, LANJUT_031). Server
// hanya mengirim profil yang sudah terverifikasi. Tidak ada gaji maupun rasio:
// rasio keketatan dihitung di lib/eksplorasi.ts.
export type StatusSumber = 'Terverifikasi' | 'Perkiraan';
export type KampusProfil = { nama: string; jenis: string; jalur_masuk: string[] };
export type ProfilProdi = MetaSumberResmi & {
  id: string;
  nama: string;
  rumpun: string;
  jenjang: string;
  badge_relevan_smk: boolean;
  peminat: { jumlah: number; kampus: string | null; tahun: number | null; jalur: string | null; sumber: string | null } | null;
  diterima: number | null;
  mata_kuliah: string[];
  profesi: string[];
  kampus: KampusProfil[];
  status_sumber: Partial<Record<'peminat' | 'mata_kuliah' | 'profesi' | 'kampus', StatusSumber>>;
  catatan_studi: string | null;
};

// F3 — mapel (konten.repo.js `ambilMapel`).
export type Mapel = MetaSumberResmi & {
  id: string; // VARCHAR(64) slug, mis. "bahasa-indonesia"
  nama: string;
  tersedia_di_smk: boolean;
};

// F3 — prodi_mapel, tabel penghubung (Bagian 13: prodi_id, mapel_id, bobot).
// `GET /konten/prodi/:id/mapel` mengembalikan mapel hasil JOIN + `bobot` dari
// prodi_mapel (lihat `ambilMapelUntukProdi`), TANPA kolom sumber/pemilik dkk
// karena baris ini representasi relasi, bukan konten mandiri.
export type MapelUntukProdi = {
  id: string;
  nama: string;
  tersedia_di_smk: boolean;
  bobot: number;
};

// F3 — jalur "belum tahu prodi". `GET /konten/mapel/agregasi-lintas-prodi`
// mengembalikan, per mapel, `jumlah_prodi` yang membutuhkannya — dihitung
// backend lewat satu query SQL (JOIN prodi_mapel + GROUP BY mapel_id), BUKAN
// diagregasi di klien dari banyak panggilan `/konten/prodi/:id/mapel`
// (lihat konten.repo.js `ambilAgregasiMapelLintasProdi`).
export type MapelAgregasiLintasProdi = {
  id: string;
  nama: string;
  tersedia_di_smk: boolean;
  jumlah_prodi: number;
};

// F4 — cerita_alumni (konten.repo.js `ambilCeritaAlumniTayang` — sudah
// disaring server-side `izin_tayang=1 AND tayang=1`, dua kolom itu sendiri
// TIDAK dikirim ke klien). Data seed saat ini mengembalikan array KOSONG —
// dikonfirmasi via curl, bukan tebakan — ini kondisi asli PRD Bagian 10
// "Risiko: konten alumni tidak terkumpul", bukan bug lapisan data ini.
export type CeritaAlumni = MetaSumberResmi & {
  id: string;
  nama: string;
  asal_smk: string;
  jurusan_smk: string;
  ptn: string;
  prodi: string;
  jalur: string;
  hambatan: string;
  yang_dilakukan: string;
};

// F5 — butir_daftar_periksa, dikelompokkan per kategori oleh endpoint
// `/konten/checklist` (konten.rute.js) — bentuk ini mengikuti pengelompokan
// itu, bukan tabel mentah, supaya hook tidak mengulang logika pengelompokan.
export type ButirDaftarPeriksa = {
  id: string;
  judul: string;
  urutan: number;
  berlaku_untuk_kelas: string[];
  berlaku_untuk_jalur: string[];
  sumber: string;
  pemilik: string;
  status_verifikasi: string;
  asal: string;
  url_sumber: string | null;
  diperiksa_pada: string | null;
};

export type KategoriDaftarPeriksa = {
  id: string;
  nama: string;
  urutan: number;
  butir: ButirDaftarPeriksa[];
};

export type DaftarPeriksaResponse = {
  kategori: KategoriDaftarPeriksa[];
  total_butir: number;
};

// F5 — kemajuan (Bagian 13: pengguna_id, butir_id, selesai_pada). Endpoint
// `/kemajuan` tidak mengirim balik `pengguna_id` (sudah tersirat dari sesi
// login yang wajib — lihat kemajuan.rute.js `wajibLogin`), jadi tipe ini
// hanya dua kolom yang benar-benar dikembalikan. `butir_id` VARCHAR(64),
// sama seperti `butir_daftar_periksa.id` di atas — bukan angka.
export type Kemajuan = {
  butir_id: string;
  selesai_pada: string | null;
};

// Butir Daftar Periksa milik akun (LANJUT_034, butir-pribadi.layanan.js
// `bentukButir`). Hasil "Simpan" di F3 (mapel_tka) dan F10 (riset_kampus);
// centangnya ada di butir ini sendiri, bukan di /kemajuan.
export type JenisButirPribadi = 'mapel_tka' | 'riset_kampus';
export type ButirPribadi = {
  id: string;
  jenis: JenisButirPribadi;
  prodi_id: string;
  judul: string;
  kategori_id: string;
  kategori_nama: string;
  selesai_pada: string | null;
  dibuat_pada: string;
};
export type SimpanButirPribadi =
  | { jenis: 'mapel_tka'; prodi_id: string; mapel_ids: string[] }
  | { jenis: 'riset_kampus'; prodi_id: string };

// F6 Arsip Belajar (LANJUT_039) — kartu.layanan.js `bentukKartu`. Kategori
// kartu = `mapel_id` (tabel `mapel`, daftar yang sama dengan F3). "Soal" bila
// ada jawaban, "Catatan" bila tidak — diturunkan seperti di PWA, bukan kolom.
export type Kartu = {
  id: string;
  pemilik_id: string | null;
  mapel_id: string;
  judul: string;
  isi: string;
  jawaban: string | null;
  sumber: 'resmi' | 'pengguna' | 'mitra';
  penyedia: string | null;
  dibuat_pada: string;
  diubah_pada: string;
};
export type IsiKartu = { mapel_id: string; judul: string; isi: string; jawaban: string | null };

// F7 Latihan (LANJUT_041) — levelin.layanan.js `daftarSesi` (GET /sesi-latihan).
export type SesiLatihan = {
  id: string;
  dimulai_pada: string;
  selesai_pada: string | null;
  mapel_fokus_id: string | null;
  asal_mula: 'beranda_saran' | 'arsip' | 'arsip_detail';
  jumlah_kartu_direncanakan: number;
  jumlah_dijawab: number;
  jumlah_benar: number;
};
// Satu catatan POST /riwayat-latihan (levelin.skema.js `catatanRiwayatSkema`),
// tanpa keyakinan — F7 versi ini tidak memakai Level-In.
export type CatatanLatihan = { id: string; sesi_id: string; kartu_id: string; benar: boolean; waktu: string };

// LANJUT_047 — GET /persetujuan/saya (persetujuan.layanan.js `statusSaya`).
// Status = catatan terakhir per jenis; riwayat lengkap tidak dikirim.
export type CatatanPersetujuan = {
  status: 'setuju' | 'cabut';
  versi: number;
  sumber: 'mandiri' | 'surat_sekolah' | 'admin';
  dicatat_pada: string;
};
export type StatusPersetujuan = {
  kebijakan_privasi: CatatanPersetujuan | null;
  ortu_wali: CatatanPersetujuan | null;
  versi_kebijakan_berlaku: number | null;
  kebijakan_terkini: boolean;
  ortu_wali_aktif: boolean;
  boleh_pakai_ai: boolean;
};

// LANJUT_049 — modul di Arsip Belajar (modul.layanan.js). Isi hanya di GET /modul/:id.
export type JenisModul = 'txt' | 'md' | 'pdf' | 'tempel';
export type ModulRingkas = {
  id: string;
  judul: string;
  mapel_id: string;
  jumlah_karakter: number;
  jenis: JenisModul;
  nama_berkas: string | null;
  diunggah_pada: string;
};
export type Modul = ModulRingkas & { isi: string };
export type HasilCariModul = {
  q: string;
  hasil: { modul_id: string; judul: string; mapel_id: string; urutan: number; potongan: string; skor: number }[];
};

// LANJUT_051 — Ngobrol dengan AI (POST /ngobrol)
export type PesanNgobrol = { peran: 'pengguna' | 'bot'; teks: string };
// LANJUT_053 — kartu bantuan dibuat server dari berkas konfigurasi (hanya layanan terverifikasi).
export type LayananBantuan = { nama: string; nomor_atau_alamat: string; keterangan: string };
export type KartuBantuan = { judul: string; layanan: LayananBantuan[]; penutup: string };
export type BalasanNgobrol = {
  balasan: string;
  /** Ada bila server mendeteksi tanda bahaya (atau model menandainya). */
  kartu_bantuan: KartuBantuan | null;
  /** Saklar ai_aktif = 0: balasan uji coba, bukan dari AI. */
  uji_coba: boolean;
  /** Data pribadi di pesan terbaru disamarkan sebelum dikirim ke AI. */
  data_pribadi_disamarkan: boolean;
};
