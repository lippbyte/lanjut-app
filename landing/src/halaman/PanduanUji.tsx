import { Kaki, Kepala, LabelDraf } from '../komponen/Kerangka';

// Panduan uji. Teks DRAF LANJUT_083, belum disetujui PM; kata dan urutan sama dengan
// landing/panduan-uji.html versi 083.
export function PanduanUji() {
  return (
    <>
      <LabelDraf />
      <Kepala />
      <main>
        <div className="bungkus">
          <h1>Panduan uji</h1>
          <p className="pengantar">Terima kasih sudah mau mencoba LANJUT. Urutan di bawah butuh sekitar 15 menit.</p>

          <h2>Sebelum mulai</h2>
          <ul className="butir">
            <li>
              HP Android dengan internet. Cara memasang APK ada di <a href="./">halaman utama</a>.
            </li>
            <li>
              Pakai akun uji yang diberikan tim. Jangan memakai nama lengkap, nomor HP, atau data pribadi lain yang tidak
              diminta.
            </li>
            <li>
              Kalau diminta, kamu bisa masuk dengan kata sandi, dengan kode yang dikirim ke email akun, atau dengan Google
              bila tombolnya tampil.
            </li>
          </ul>

          <h2>Urutan yang dicoba</h2>
          <ol className="langkah">
            <li>
              <strong>Masuk</strong> dengan akun uji. Pastikan kamu sampai di Beranda.
            </li>
            <li>
              <strong>Beranda</strong>: lihat apakah isinya cocok dengan kelasmu.
            </li>
            <li>
              <strong>Jalur Saya</strong> (kelas 12): jawab pertanyaannya, lalu lihat tahap dan langkah berikutnya.
            </li>
            <li>
              <strong>Eksplorasi Kampus</strong>: pilih bidang yang kamu minati, lalu simpan.
            </li>
            <li>
              <strong>Pilih Mapel</strong> (kelas 12) atau <strong>Mapel Saya</strong> (kelas 7–11): pilih mapel, lalu
              simpan.
            </li>
            <li>
              <strong>Arsip Belajar</strong>: tulis dua atau tiga kartu catatan atau soal.
            </li>
            <li>
              <strong>Latihan</strong>: kerjakan beberapa kartu, lalu buka Level-In.
            </li>
            <li>
              <strong>Ngobrol</strong>: buka layarnya. Fitur AI memang belum aktif di versi uji.
            </li>
            <li>
              <strong>Keluar</strong> dari akun, lalu masuk lagi.
            </li>
          </ol>

          <h2>Yang sengaja belum ada</h2>
          <ul className="butir">
            <li>Jawaban AI di Ngobrol.</li>
            <li>Persiapan Event sekolah.</li>
            <li>Tombol mikrofon.</li>
            <li>Sebagian besar konten yang sudah dicek ke sumber resmi. Yang belum dicek ditandai di aplikasi.</li>
          </ul>

          <h2>Kalau aplikasi tidak tersambung</h2>
          <ul className="butir">
            <li>Pastikan internetmu menyala, lalu tutup dan buka lagi aplikasinya.</li>
            <li>Server uji bisa saja sedang dimatikan. Tunggu sebentar, lalu coba lagi.</li>
            <li>Kalau tetap tidak bisa, beri tahu tim atau gurumu beserta jam kejadiannya.</li>
          </ul>

          <h2>Melaporkan masalah</h2>
          <p>
            Catat apa yang kamu lakukan, apa yang terjadi, dan merek serta tipe HP-mu. Kirim ke tim LANJUT atau gurumu.
            Tangkapan layar boleh, asal tidak memuat data pribadi.
          </p>
        </div>
      </main>
      <Kaki
        tautan={[
          { href: './', label: 'Halaman utama' },
          { href: 'kebijakan-privasi.html', label: 'Kebijakan privasi' },
        ]}
      />
    </>
  );
}
