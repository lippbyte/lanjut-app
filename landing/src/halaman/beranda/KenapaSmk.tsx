import { KENAPA_SMK } from '../../konten/beranda';

// "Kenapa mulai dari SMK?": empat hal yang membuat peta anak SMK berbeda, muncul dengan sapuan
// dari kiri ke kanan (clip-path) bergiliran. Catatan kejujuran selalu tampil.

export function KenapaSmk() {
  return (
    <section className="smk" id="kenapa-smk" aria-labelledby="judul-smk">
      <div className="wadah">
        <div className="smk__kepala">
          <h2 id="judul-smk" className="judul-seksi">
            {KENAPA_SMK.judul}
          </h2>
          <p className="smk__pengantar">{KENAPA_SMK.pengantar}</p>
        </div>
        <ul className="smk__daftar" data-gerak="sapu">
          {KENAPA_SMK.butir.map((b) => (
            <li key={b.judul} className="smk__butir">
              <h3>{b.judul}</h3>
              <p>{b.isi}</p>
            </li>
          ))}
        </ul>
        <ul className="smk__catatan">
          {KENAPA_SMK.catatan.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
