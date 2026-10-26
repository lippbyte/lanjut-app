// Halaman penerus masuk Google (LANJUT_083) untuk app Android/iOS. Teks DRAF, belum
// disetujui PM; sama dengan landing/google-kembali.html versi 083. Logika penerusnya di
// lib/penerus.ts dan entri/google-kembali.tsx. Sejak redesign landing hanya gayanya yang berubah.
export function GoogleKembali({ tujuan }: { tujuan: string | null }) {
  return (
    <main className="penerus">
      <div className="penerus__isi">
        <h1>Kembali ke aplikasi LANJUT</h1>
        <p id="status">
          {tujuan ? 'Membuka aplikasi LANJUT…' : 'Tidak ada data masuk dari Google. Buka aplikasi dan coba lagi.'}
        </p>
        <p>
          <a id="buka-app" className="tombol tombol--utama tombol--besar" href={tujuan ?? 'lanjut://masuk'}>
            Buka aplikasi LANJUT
          </a>
        </p>
        <p className="meta">Kalau aplikasi tidak terbuka sendiri, ketuk tombol di atas. Halaman ini tidak menyimpan apa pun.</p>
      </div>
    </main>
  );
}
