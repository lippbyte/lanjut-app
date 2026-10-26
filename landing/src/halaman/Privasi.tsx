import { Kerangka } from '../komponen/Kerangka';
import { Tautan } from '../komponen/Situs';
import { formatTanggal } from '../lib/rilis';
import type { PropsHalaman } from './jenis';

// Privasi website (PRD-landpage §8.6). Klaimnya diperiksa terhadap kode situs ini dan dijaga
// tes: tanpa cookie/penyimpanan peramban, tanpa fetch, tanpa skrip/huruf/gambar pihak lain.
// Tidak mengklaim "tidak mengumpulkan data apa pun": log hosting tetap ada.

const DIPERBARUI = '2026-10-26';

export default function Privasi({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="wadah wadah--baca">
        <article className="prosa halaman-teks" aria-labelledby="judul-privasi">
          <header>
            <p className="eyebrow">Privasi</p>
            <h1 id="judul-privasi">Privasi situs</h1>
            <p className="pengantar">
              Data apa yang terkait dengan website LANJUT. Untuk aplikasi, baca{' '}
              <Tautan ke="/privacy/app">Kebijakan Privasi Aplikasi</Tautan>.
            </p>
            <p className="meta">
              Diperbarui <time dateTime={DIPERBARUI}>{formatTanggal(DIPERBARUI)}</time> · DRAF
            </p>
          </header>

          <h2>Ringkasnya</h2>
          <ul className="daftar-centang">
            <li>Tanpa cookie.</li>
            <li>Tanpa analytics, iklan, atau pelacak.</li>
            <li>Tanpa formulir. Situs ini tidak meminta data apa pun darimu.</li>
            <li>Tanpa skrip, huruf, atau gambar dari pihak lain.</li>
            <li>Tidak menyimpan apa pun di penyimpanan peramban.</li>
          </ul>

          <h2>Yang tetap tercatat</h2>
          <p>
            Seperti situs web lain, server hosting dapat mencatat log akses standar, misalnya alamat IP, waktu, halaman yang
            dibuka, dan jenis peramban, untuk menjalankan dan mengamankan layanan. Log itu dikelola penyedia hosting. Penyedia
            hosting website ini belum ditetapkan; halaman ini diperbarui setelah ditetapkan.
          </p>

          <h2>Unduhan APK</h2>
          <p>
            Bila tautan unduhan mengarah ke penyimpanan di luar situs ini, penyedia penyimpanan itu juga dapat mencatat log
            akses saat kamu mengunduh.
          </p>

          <h2>Halaman penerus masuk Google</h2>
          <p>
            Halaman <code>google-kembali.html</code> dipakai aplikasi saat kamu masuk dengan Google. Data masuk dari Google
            ada di bagian alamat setelah tanda #, yang tidak dikirim peramban ke server. Halaman itu langsung meneruskannya ke
            aplikasi LANJUT, menghapusnya dari bilah alamat, dan tidak menyimpannya.
          </p>

          <h2>Bila ada perubahan</h2>
          <p>
            Kalau situs ini nanti memakai analytics atau fitur lain yang mengumpulkan data, halaman ini diperbarui lebih dulu
            dan menjelaskan data apa yang dikumpulkan serta untuk apa.
          </p>
        </article>
      </div>
    </Kerangka>
  );
}
