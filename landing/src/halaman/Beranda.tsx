import { Kaki, Kepala, LabelDraf } from '../komponen/Kerangka';
import { TombolApk, useStatusApk } from '../komponen/TombolApk';

// Halaman utama. Teks DRAF LANJUT_083 (docs/salinan-teks-lanjut.md §4.21), belum disetujui PM;
// kata dan urutan sama dengan landing/index.html versi 083.
export function Beranda() {
  const statusApk = useStatusApk();
  return (
    <>
      <LabelDraf />
      <Kepala />
      <main>
        <div className="bungkus">
          <h1>Tahu langkah berikutnya, dari SMP sampai kelas 12.</h1>
          <p className="pengantar">
            Informasi soal minat, mapel pilihan, dan jalur kuliah tersebar di banyak tempat. LANJUT merangkumnya jadi
            langkah kecil yang bisa kamu kerjakan, sesuai kelasmu.
          </p>

          <TombolApk status={statusApk} />
          <p className="kecil">Untuk HP Android. Belum tersedia untuk iPhone. Aplikasi butuh internet.</p>

          <h2>Untuk siapa</h2>
          <ul className="kartu-daftar">
            <li className="kartu">
              <h3>SMP (kelas 7–9)</h3>
              <p>
                Kenali minatmu lewat Eksplorasi Kampus, pilih Mapel Saya, simpan catatan pelajaran di Arsip Belajar, lalu
                latihan singkat.
              </p>
            </li>
            <li className="kartu">
              <h3>SMA, SMK, MA kelas 10–11</h3>
              <p>
                Pilih Mapel Saya, kenali jalur dan bidang kuliah lewat Eksplorasi Kampus, dan latihan rutin. Level-In
                menunjukkan mapel yang paling perlu dilatih.
              </p>
            </li>
            <li className="kartu">
              <h3>Kelas 12</h3>
              <p>
                Jalur Saya menunjukkan posisimu, Daftar Periksa menyusun langkah SNBP, SNBT, dan TKA, dan Pilih Mapel
                membantu memilih mapel TKA sesuai prodi.
              </p>
            </li>
          </ul>
          <p className="kecil">Anak SMK punya bagian khusus di menu Jenjang Saya.</p>

          <div className="peringatan" role="note">
            <p>
              <strong>LANJUT masih versi uji.</strong>
            </p>
            <ul className="butir">
              <li>Fitur dan isinya masih bisa berubah.</li>
              <li>
                Sebagian data, misalnya profil prodi dan tanggal pendaftaran, masih dicek ke sumber resmi dan ditandai di
                aplikasi.
              </li>
              <li>Fitur AI, Persiapan Event sekolah, dan mikrofon belum aktif.</li>
              <li>Pakai akun uji dari tim. Jangan memasukkan data pribadi yang tidak diminta.</li>
            </ul>
          </div>

          <h2>Cara memasang APK di Android</h2>
          <ol className="langkah">
            <li>
              Ketuk <strong>Unduh APK</strong>, lalu tunggu sampai unduhan selesai.
            </li>
            <li>
              Buka berkas <strong>lanjut-demo.apk</strong> dari notifikasi unduhan atau dari aplikasi File di HP-mu.
            </li>
            <li>
              Kalau muncul pesan bahwa HP-mu tidak mengizinkan pemasangan dari sumber ini, ketuk <strong>Setelan</strong>,
              lalu aktifkan <strong>Izinkan dari sumber ini</strong> untuk aplikasi yang membuka berkasnya (misalnya Chrome
              atau File). Namanya bisa sedikit berbeda di tiap merek HP.
            </li>
            <li>
              Kembali, lalu ketuk <strong>Pasang</strong>.
            </li>
            <li>
              Kalau Play Protect memberi peringatan, itu karena aplikasi ini belum ada di Play Store. Lanjutkan hanya kalau
              berkasnya kamu unduh dari halaman ini.
            </li>
            <li>
              Sesudah terpasang, matikan lagi izin tadi lewat{' '}
              <strong>Setelan → Aplikasi → Akses aplikasi khusus → Instal aplikasi tak dikenal</strong>.
            </li>
          </ol>
          <p className="kecil">Kalau ragu, minta bantuan guru atau orang tua/wali.</p>

          <h2>Mau ikut menguji?</h2>
          <p>
            Baca <a href="panduan-uji.html">panduan uji</a> untuk urutan yang dicoba dan cara melaporkan masalah. Data apa
            yang disimpan LANJUT ada di <a href="kebijakan-privasi.html">kebijakan privasi</a> (masih DRAF).
          </p>
        </div>
      </main>
      <Kaki
        tautan={[
          { href: 'panduan-uji.html', label: 'Panduan uji' },
          { href: 'kebijakan-privasi.html', label: 'Kebijakan privasi' },
        ]}
      />
    </>
  );
}
