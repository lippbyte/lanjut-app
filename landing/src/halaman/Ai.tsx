import { Catatan } from '../komponen/Catatan';
import { Ikon } from '../komponen/Ikon';
import { Kerangka } from '../komponen/Kerangka';
import { Tautan } from '../komponen/Situs';
import { Label, Status } from '../komponen/Status';
import { ObrolanKonsep } from '../komponen/ObrolanKonsep';
import type { PropsHalaman } from './jenis';

// Halaman AI LANJUT (PRD-landpage §8.3). Status sebenarnya: layar Ngobrol ada di app, saklar AI
// mati (ai_aktif = 0). Tidak ada simulasi chat; contoh diberi label konsep. Rancangan privasi
// diringkas dari kebijakan privasi aplikasi (DRAF) dan teks app Ngobrol (LANJUT_051–078).

const BANTUAN = [
  { topik: 'Pelajaran', contoh: 'Bagian mana dari modul ini yang perlu kupahami dulu?' },
  { topik: 'Kehidupan sekolah', contoh: 'Jadwal PKL-ku padat. Bagaimana membagi waktu belajarnya?' },
  { topik: 'Minat', contoh: 'Aku suka desain dan komputer. Bidang apa yang bisa kujelajahi?' },
  { topik: 'Tujuan', contoh: 'Aku mau kuliah, tapi belum tahu mulai dari mana.' },
  { topik: 'Pilihan pendidikan', contoh: 'Apa bedanya D4 di politeknik dengan S1 di universitas?' },
];

const BATASAN = [
  'Bukan pengganti guru BK, guru, orang tua atau wali, maupun sumber resmi.',
  'Jawaban AI bisa keliru. Info seleksi yang bergantung waktu tetap harus dicek ke laman resmi dan tanggal pembaruannya.',
  'Tidak memprediksi kelulusan atau skor seleksi.',
  'Bukan layanan darurat. Kalau kamu dalam bahaya, hubungi 112 atau orang dewasa yang kamu percaya.',
];

const RANCANGAN_PRIVASI = [
  'Aktif hanya setelah orang tua atau walimu memberi persetujuan lewat sekolah, dan kamu menerima kebijakan privasi.',
  'Pesan dikirim lewat server LANJUT ke penyedia AI pihak ketiga, yang dapat memproses data di luar Indonesia.',
  'Nomor telepon, email, dan deretan angka seperti NIK disamarkan otomatis sebelum dikirim. Penyamarannya tidak sempurna, jadi jangan menulis data pribadi.',
  'Isi obrolan tidak disimpan di server LANJUT.',
  'Fitur bisa dimatikan dari server dan punya batas pemakaian.',
];

export default function Ai({ jalur, akar }: PropsHalaman) {
  return (
    <Kerangka jalur={jalur} akar={akar}>
      <div className="halaman-ai">
        <section className="ai-kepala" aria-labelledby="judul-ai">
          <div className="wadah ai-kepala__tata">
            <div>
              <p className="eyebrow eyebrow--terang">AI LANJUT</p>
              <h1 id="judul-ai">Teman bertanya untuk langkah berikutnya.</h1>
              <p className="ai-cuplik__status">
                <Status status="pengembangan" /> <span>Belum aktif di aplikasi versi uji.</span>
              </p>
              <p className="pengantar">
                AI LANJUT dirancang untuk menemani siswa bertanya soal pelajaran, kehidupan sekolah, minat, tujuan, dan
                pilihan pendidikan, lalu mengarahkan ke langkah dan sumber yang tepat.
              </p>
            </div>
            <ObrolanKonsep />
          </div>
        </section>

        <div className="wadah wadah--baca prosa ai-isi">
          <Catatan nada="penting" judul="Status saat ini">
            <p>
              Layar Ngobrol sudah ada di aplikasi, tetapi jawaban AI belum aktif. Semua contoh di halaman ini adalah ilustrasi
              konsep, bukan percakapan dengan AI sungguhan.
            </p>
          </Catatan>

          <h2>Yang ingin dibantu</h2>
          <p>
            Pertanyaan di bawah adalah contoh jenis pertanyaan yang dirancang untuk dijawab. <Label>Contoh</Label>
          </p>
          <dl className="ai-bantuan">
            {BANTUAN.map((b) => (
              <div key={b.topik}>
                <dt>{b.topik}</dt>
                <dd>{b.contoh}</dd>
              </div>
            ))}
          </dl>

          <h2>Batasannya</h2>
          <ul>
            {BATASAN.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>

          <h2>Rancangan privasi dan keamanan</h2>
          <p>Rancangan saat ini. Bisa berubah sebelum fitur diaktifkan.</p>
          <ul>
            {RANCANGAN_PRIVASI.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <p>
            Rinciannya ada di <Tautan ke="/privacy/app">Kebijakan Privasi Aplikasi</Tautan> (DRAF).
          </p>

          <h2>Kapan aktif?</h2>
          <p>
            Belum ada tanggal. Status AI LANJUT diperbarui di <Tautan ke="/docs/product/roadmap">roadmap</Tautan> dan{' '}
            <Tautan ke="/docs/product/features">daftar fitur</Tautan>.
          </p>
          <p>
            <Tautan ke="/docs/product/features" className="tautan-panah">
              Lihat fitur yang sudah tersedia <Ikon nama="panah" />
            </Tautan>
          </p>
        </div>
      </div>
    </Kerangka>
  );
}
