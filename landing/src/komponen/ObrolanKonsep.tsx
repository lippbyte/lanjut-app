import { Label } from './Status';

// Contoh percakapan AI LANJUT. AI belum aktif, jadi diberi label "Contoh konsep" dan "jawaban"
// sengaja ditulis sebagai arah jawaban yang dirancang, bukan keluaran model AI (AGENTS-landpage §5).

export const CONTOH_TANYA =
  'Aku anak SMK jurusan teknik jaringan. Kalau mau kuliah informatika, mapel pilihan TKA apa yang sebaiknya kusiapkan?';

export const CONTOH_ARAH =
  'Arah jawaban yang dirancang: menjelaskan mapel pendukung prodi itu secara umum, menunjukkan cara mengecek mana yang ada di sekolahmu lewat Pilih Mapel, lalu mengingatkan untuk mencocokkan dengan laman resmi SNPMB dan guru BK.';

export function ObrolanKonsep() {
  return (
    <figure className="obrolan-konsep">
      <Label nada="hangat">Contoh konsep · bukan AI sungguhan</Label>
      <ol className="obrolan-konsep__daftar">
        <li className="gelembung gelembung--siswa">
          <span className="gelembung__oleh">Contoh pertanyaan siswa</span>
          {CONTOH_TANYA}
        </li>
        <li className="gelembung gelembung--konsep">
          <span className="gelembung__oleh">Rancangan</span>
          {CONTOH_ARAH}
        </li>
      </ol>
      <figcaption>Ilustrasi arah jawaban, bukan keluaran model AI. Fitur AI belum aktif.</figcaption>
    </figure>
  );
}
