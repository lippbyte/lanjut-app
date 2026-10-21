// LANJUT_083 — meneruskan hasil masuk Google (fragmen #id_token=…&state=…) ke app
// lewat lanjut://masuk-google?… Hanya parameter yang dibutuhkan app yang diteruskan.
// Tidak ada permintaan jaringan dan tidak ada penyimpanan.
(function () {
  var IZIN = ['id_token', 'state', 'error'];
  var bagian = window.location.hash
    .replace(/^#/, '')
    .split('&')
    .filter(function (b) {
      return IZIN.indexOf(b.split('=')[0]) !== -1;
    });
  var tujuan = 'lanjut://masuk-google' + (bagian.length ? '?' + bagian.join('&') : '');
  // Token tidak dibiarkan di bilah alamat maupun riwayat peramban.
  window.history.replaceState(null, '', window.location.pathname);
  document.getElementById('buka-app').setAttribute('href', tujuan);
  if (bagian.length === 0) {
    document.getElementById('status').textContent = 'Tidak ada data masuk dari Google. Buka aplikasi dan coba lagi.';
    return;
  }
  window.location.replace(tujuan);
})();
