// Halaman penerus masuk Google (LANJUT_083) untuk app Android/iOS. Teks DRAF, belum
// disetujui PM; sama dengan landing/google-kembali.html versi 083. Logika penerusnya di
// lib/penerus.ts dan entri/google-kembali.tsx.
export function GoogleKembali({ tujuan }: { tujuan: string | null }) {
  return (
    <main>
      <div className="bungkus">
        <h1>Kembali ke aplikasi LANJUT</h1>
        <p id="status">
          {tujuan ? 'Membuka aplikasi LANJUT…' : 'Tidak ada data masuk dari Google. Buka aplikasi dan coba lagi.'}
        </p>
        <p>
          <a id="buka-app" className="tombol tombol--penuh" href={tujuan ?? 'lanjut://masuk'}>
            Buka aplikasi LANJUT
          </a>
        </p>
        <p className="kecil">
          Kalau aplikasi tidak terbuka sendiri, ketuk tombol di atas. Halaman ini tidak menyimpan apa pun.
        </p>
      </div>
    </main>
  );
}
