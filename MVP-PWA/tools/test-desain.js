/* Gerbang validasi akhir:
     C. risiko gulir mendatar di 360px (DoD §15)
     D. keutuhan token vs landing page
     E. kesetiaan teks ke salinan-teks-lanjut.md (DoD §15)
     F. aturan sistem desain (tanpa merah/oranye) */
const fs = require('fs');
const path = require('path');

const ROOT = process.argv[2];
const DOCS = process.argv[3];
const LANDING = process.argv[4];
let gagal = 0;
const cek = (n, s, d) => {
  if (s) console.log('   ok   ' + n);
  else { console.log('   GAGAL ' + n + (d ? ' — ' + d : '')); gagal++; }
};
const baca = (f) => fs.readFileSync(f, 'utf8');
const halaman = fs.readdirSync(ROOT).filter((f) => f.endsWith('.html'));

/* ============ C. risiko gulir mendatar di 360px ============ */
console.log('\nC. Risiko gulir mendatar di 360px');
{
  const css = baca(path.join(ROOT, 'assets/app.css'));
  const semua = halaman.map((f) => baca(path.join(ROOT, f))).join('\n');

  /* width tetap yang lebih besar dari lebar isi 360px dikurangi gutter 2x20 */
  const ISI = 360 - 40;
  const lebarTetap = [...css.matchAll(/(?<!max-|min-)width:\s*(\d+)px/g)]
    .map((m) => +m[1]).filter((v) => v > ISI);
  cek('tidak ada width tetap > ' + ISI + 'px di app.css',
      lebarTetap.length === 0, lebarTetap.join(', '));

  const lebarInline = [...semua.matchAll(/style="[^"]*(?<!max-|min-)width:\s*(\d+)px/g)]
    .map((m) => +m[1]).filter((v) => v > ISI);
  cek('tidak ada width tetap > ' + ISI + 'px di style inline',
      lebarInline.length === 0, lebarInline.join(', '));

  /* .app wajib max-width, bukan width tetap */
  cek('.app memakai max-width', /\.app\{[^}]*max-width:420px/.test(css.replace(/\s+/g, '')),
      'kerangka harus melar di bawah 420px');
  cek('.app menahan luapan mendatar', /\.app\{[^}]*overflow-x:hidden/.test(css.replace(/\s+/g, '')));

  /* kisi 2 kolom di 360px: (320 - 12) / 2 = 154px per kolom — masih masuk */
  cek('kisi arsip 2 kolom pakai 1fr (bukan lebar tetap)',
      /\.kisi-2\{[^}]*grid-template-columns:1fr 1fr/.test(css));

  /* nav 4 kolom di 360px = 90px per tab; ikon 44px + label caption -> aman */
  cek('tabbar 4 kolom pakai 1fr', /grid-template-columns:repeat\(4,1fr\)/.test(css));

  /* white-space:nowrap pada teks panjang adalah penyebab luapan paling umum */
  const nowrapPanjang = [...semua.matchAll(/white-space:nowrap[^"]*"[^>]*>([^<]{28,})/g)]
    .map((m) => m[1].trim());
  cek('tidak ada teks panjang ber-nowrap', nowrapPanjang.length === 0,
      nowrapPanjang.slice(0, 2).join(' | '));

  /* tabel dan pre wajib punya wadah bergulir; di sini keduanya tidak dipakai */
  cek('tidak ada <table>/<pre> tanpa wadah bergulir',
      !/<table|<pre[\s>]/.test(semua));
}

/* ============ D. keutuhan token ============ */
console.log('\nD. Keutuhan token');
{
  const tok = baca(path.join(ROOT, 'assets/tokens.css'));
  const lp = baca(LANDING).split('\n').slice(20, 88).join('\n');   /* baris 21-88 */
  const bagian1 = tok.slice(tok.indexOf(':root{'), tok.indexOf('BAGIAN 2 — TAMBAHAN'));
  const bersih = (s) => s.replace(/\s+$/gm, '').trim();

  cek('Bagian 1 identik dengan landing page',
      bersih(bagian1).startsWith(bersih(lp)) || bersih(lp).startsWith(bersih(bagian1).slice(0, bersih(lp).length)),
      'blok :root landing page harus tersalin apa adanya');

  const nama = (s) => [...s.matchAll(/(--[a-z0-9-]+)\s*:/g)].map((m) => m[1]);
  const i = tok.indexOf('BAGIAN 2 — TAMBAHAN');
  const j = tok.indexOf('@media (prefers-reduced-motion');
  const p1 = new Set(nama(tok.slice(0, i)));
  const p2 = [...new Set(nama(tok.slice(i, j)))];
  const tabrak = p2.filter((n) => p1.has(n));
  cek('Bagian 2 tidak menimpa Bagian 1 (' + p1.size + ' + ' + p2.length + ' token)',
      tabrak.length === 0, tabrak.join(', '));

  const rm = [...new Set(nama(tok.slice(j)))];
  cek('reduced-motion hanya menolkan durasi',
      rm.every((n) => n.startsWith('--dur-')), rm.join(', '));
}

/* ============ E. kesetiaan teks ke salinan-teks ============ */
console.log('\nE. Teks diambil dari dokumen, bukan ditulis ulang di kode');
{
  /* Kalimat wajib boleh berasal dari salinan-teks ATAU dari PRD/SDD —
     penafian F3 misalnya dikunci di PRD §6, bukan di dokumen salinan teks. */
  const salinan = [
    baca(path.join(DOCS, 'salinan-teks-lanjut.md')),
    baca(path.join(DOCS, 'prd-sdd-lanjut.md')),
  ].join('\n');
  const semua = halaman.map((f) => baca(path.join(ROOT, f))).join('\n')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ');
  const adaDiSalinan = salinan.replace(/\s+/g, ' ');

  /* kalimat yang wajib muncul apa adanya di aplikasi */
  const wajib = [
    'Tahu harus ngapain hari ini.',
    'Hal-hal yang memang beda buat kita.',
    'Satu per satu, tidak perlu sekaligus.',
    'Mereka sudah lewat jalan ini.',
    'Yang kamu simpan hari ini, kepakai nanti.',
    'Soal dari mitra, terbuka untuk semua.',
    'Ini rangkuman, bukan keputusan resmi. Cek laman SNPMB.',
    'Cerita pertama sedang kami kumpulkan.',
    'Belum ada mitra yang bergabung.',
    'Anak SMK juga bisa kuliah.',
  ];
  wajib.forEach((t) => {
    const diApp = semua.includes(t);
    const diDok = adaDiSalinan.includes(t);
    cek('"' + t.slice(0, 42) + (t.length > 42 ? '…' : '') + '"',
        diApp && diDok,
        !diApp ? 'tidak ada di aplikasi' : 'tidak ada di salinan-teks maupun PRD/SDD');
  });

  /* kata terlarang (salinan teks §0) */
  const terlarang = ['raih', 'wujudkan', 'gapai', 'mimpimu', 'jangan sampai menyesal',
                     'sudah terlambat', 'kalah dari anak SMA'];
  const teksTampil = halaman.map((f) => baca(path.join(ROOT, f)))
    .join('\n').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ').toLowerCase();
  const ketemu = terlarang.filter((k) => new RegExp('\\b' + k + '\\b').test(teksTampil));
  cek('tidak memakai kata terlarang §0', ketemu.length === 0, ketemu.join(', '));

  /* sapaan: "kamu", bukan "Anda"/"kalian" */
  cek('tidak memakai sapaan "Anda"', !/\banda\b/.test(teksTampil));
  cek('tidak memakai sapaan "kalian"', !/\bkalian\b/.test(teksTampil));
}

/* ============ F. aturan sistem desain ============ */
console.log('\nF. Aturan sistem desain');
{
  const css = baca(path.join(ROOT, 'assets/app.css'));
  const tok = baca(path.join(ROOT, 'assets/tokens.css'));
  const semua = halaman.map((f) => baca(path.join(ROOT, f))).join('\n');
  const gaya = css + tok + semua;

  /* tanpa merah/oranye: cek hex yang jelas-jelas merah atau oranye */
  const hex = [...gaya.matchAll(/#([0-9a-f]{6})\b/gi)].map((m) => m[1].toLowerCase());
  const merahOranye = hex.filter((h) => {
    const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
    return r > 150 && r - Math.max(g, b) > 60;
  });
  cek('tidak ada warna merah/oranye', merahOranye.length === 0,
      [...new Set(merahOranye)].map((h) => '#' + h).join(', '));

  /* teks tidak pernah hitam murni */
  cek('tidak memakai #000', !/#000\b|#000000\b/i.test(gaya));

  /* fokus tidak pernah dihapus */
  const blok = [...css.matchAll(/([^{}]+)\{([^}]*)\}/g)]
    .map((m) => ({ sel: m[1].trim().replace(/\s+/g, ' '), isi: m[2] }));
  const yatim = blok
    .filter((b) => /outline:\s*none/.test(b.isi) && !/--focus-ring/.test(b.isi))
    .filter((b) => {
      /* sah kalau ada blok :focus / :focus-visible untuk selector yang sama */
      const dasar = b.sel.split(',').map((s) => s.trim());
      return !blok.some((o) => /--focus-ring/.test(o.isi)
        && dasar.some((d) => o.sel.includes(d + ':focus')));
    });
  cek('tiap outline:none punya pengganti focus-ring',
      yatim.length === 0, yatim.map((b) => b.sel).join(' | '));

  /* satu tipografi saja */
  const fontLain = [...gaya.matchAll(/font-family:\s*([^;"}]+)/g)]
    .map((m) => m[1].trim())
    .filter((v) => !/var\(--font-core\)|inherit/.test(v));
  cek('hanya memakai --font-core', fontLain.length === 0, [...new Set(fontLain)].join(' | '));

  /* sasaran sentuh 44px */
  cek('tombol minimal 44px', /\.btn\{[^}]*min-height:44px/.test(css.replace(/\s+/g, '')));
  cek('keping minimal 44px', /\.keping\{[^}]*min-height:44px/.test(css.replace(/\s+/g, '')));
  cek('kotak centang minimal 44px', /\.centang\{[^}]*min-height:44px/.test(css.replace(/\s+/g, '')));
}

/* ============ G. teks Level-In terdaftar di salinan-teks-lanjut.md §4.8 ============ */
console.log('\nG. Teks Level-In sudah terdaftar di docs/salinan-teks-lanjut.md §4.8');
{
  const salinanLevelin = baca(path.join(DOCS, 'salinan-teks-lanjut.md'));
  const semuaMentah = halaman.map((f) => baca(path.join(ROOT, f))).join('\n')
    .replace(/<!--[\s\S]*?-->/g, '').replace(/\s+/g, ' ');
  const salinanNorm = salinanLevelin.replace(/\s+/g, ' ');

  /* Fragmen statis (bagian kalimat yang TIDAK berubah oleh nilai dinamis
     seperti tingkat keyakinan/nama mapel yang disisipkan lewat <span> oleh
     levelin.js) — dicocokkan sebagai substring independen, sama polanya
     dengan array `wajib` di bagian E di atas. */
  const fragmenWajib = [
    'Seberapa yakin kamu bisa jawab ini?',
    'Ragu banget', 'Lumayan yakin', 'Yakin banget',
    'Pilih dulu seberapa yakin kamu, baru jawabannya kelihatan.',
    'Kamu pilih yakin',
    'tapi jawabannya meleset. Ini bagian dari pola kamu di',
    'coba pelan-pelan lagi di sini.',
    'Kamu pilih ragu',
    'ternyata jawabannya benar. Kamu bisa lebih dari yang kamu kira.',
    'Perkiraanmu pas —',
    'dan hasilnya sesuai.',
    'Keyakinanmu ada di tengah. Tetap dihitung, lanjut ke kartu berikutnya.',
    'Ringkasan Kalibrasi',
    'Yakin tapi meleset:',
    'Ternyata bisa:',
    'Sesi latihan ini sudah tidak ada datanya. Mulai sesi baru dari Arsip Belajar.',
    'kelihatannya masih perlu dilatih lagi — beberapa jawabanmu yakin, tapi meleset.',
    'Waktunya latihan lagi. Kartu-kartumu sudah menunggu.',
    'Belum cukup data buat menyimpulkan polamu. Latihan sedikit lagi biar kelihatan.',
    'Belum pernah latihan di sini. Mulai dari beberapa kartu dulu.',
    'Arsip belajarmu masih kosong. Isi dulu satu kartu sebelum mulai latihan.',
  ];
  fragmenWajib.forEach((t) => {
    const diApp = semuaMentah.includes(t);
    const diDok = salinanNorm.includes(t);
    cek('"' + t.slice(0, 42) + (t.length > 42 ? '…' : '') + '"', diApp && diDok,
        !diApp ? 'tidak ada di aplikasi' : 'tidak ada di docs/salinan-teks-lanjut.md §4.8');
  });

  /* Teks Level-In yang ADA di aplikasi tapi TIDAK terdaftar di katalog resmi
     — pelanggaran gerbang, bukan sekadar catatan. Kasus nyata saat ini:
     blok data-varian="locked" di latihan-selesai.html memakai "Upgrade ke
     premium", padahal FL6 sudah final GRATIS untuk v1 (SDD-LevelIn.md
     §10.1) dan kalimat ini tidak pernah ditulis ke katalog teks resmi.
     Gerbang ini SENGAJA dibiarkan gagal sampai ui-engineer/PM menindak: baik
     dengan menghapus blok "locked" itu (tidak wajib dibangun di v1, SDD
     §7.4) atau meminta persetujuan PM menambah kalimat ini ke §4.8. */
  const takTerdaftar = ['Upgrade ke premium'];
  takTerdaftar.forEach((t) => {
    const diApp = semuaMentah.includes(t);
    const diDok = salinanNorm.includes(t);
    cek('"' + t + '" tidak dipakai tanpa terdaftar di salinan-teks-lanjut.md',
        !(diApp && !diDok),
        'teks ADA di aplikasi tapi TIDAK terdaftar di katalog resmi (§4.8) — ' +
        'hapus blok itu atau minta approval PM menambah ke katalog teks resmi');
  });
}

console.log('\n' + (gagal === 0 ? 'SEMUA LOLOS' : gagal + ' MASALAH'));
process.exit(gagal === 0 ? 0 : 1);
