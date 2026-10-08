// Klien penyedia AI (LANJUT_051): OpenRouter, API chat completions.
//
// SATU-SATUNYA tempat server mengirim data pengguna ke luar sistem. Hanya
// dipanggil ngobrol.layanan.js, SESUDAH gerbang bolehPakaiAi lolos.
//
// - Kunci API hanya dari env server; tidak dikirim ke app, tidak dicatat.
// - Model dan objek `provider` (data_collection, zdr, only) datang dari
//   konfigurasi lewat ngobrol.layanan.js (LANJUT_053). Nama parameter sesuai
//   dokumentasi OpenRouter "Provider Routing".
// - Isi pesan dan balasan tidak pernah dicatat di log. Galat hanya membawa
//   jenis dan status HTTP, bukan isi respons penyedia.

const env = require('../../config/env');

const BATAS_WAKTU_MS = 45000;
const TOKEN_BALASAN_MAKS = 800;

class GalatPenyedia extends Error {
  constructor(jenis, statusHttp) {
    super(`penyedia AI ${jenis}${statusHttp ? ` (HTTP ${statusHttp})` : ''}`);
    this.jenis = jenis;
    this.statusHttp = statusHttp || null;
  }
}

/**
 * `pesan` = [{ role: 'system' | 'user', content }]; `pengaturan` = { model, provider }.
 * Mengembalikan { teks, terpotong }. Melempar GalatPenyedia.
 */
async function mintaBalasan(pesan, pengaturan) {
  const kendali = new AbortController();
  const timer = setTimeout(() => kendali.abort(), BATAS_WAKTU_MS);
  try {
    let res;
    try {
      res = await fetch(`${env.OPENROUTER_BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'X-Title': 'LANJUT',
        },
        body: JSON.stringify({
          model: pengaturan.model,
          messages: pesan,
          max_tokens: TOKEN_BALASAN_MAKS,
          temperature: 0.7,
          provider: pengaturan.provider,
        }),
        signal: kendali.signal,
      });
    } catch (e) {
      throw new GalatPenyedia(e.name === 'AbortError' ? 'lewat batas waktu' : 'tidak tersambung');
    }
    if (!res.ok) throw new GalatPenyedia('menolak permintaan', res.status);
    const json = await res.json().catch(() => null);
    const pilihan = json && Array.isArray(json.choices) ? json.choices[0] : null;
    const teks = pilihan && pilihan.message ? pilihan.message.content : null;
    if (typeof teks !== 'string' || !teks.trim()) throw new GalatPenyedia('memberi balasan kosong', res.status);
    return { teks: teks.trim(), terpotong: pilihan.finish_reason === 'length' };
  } catch (e) {
    if (e instanceof GalatPenyedia) throw e;
    throw new GalatPenyedia(e.name === 'AbortError' ? 'lewat batas waktu' : 'gagal dibaca');
  } finally {
    clearTimeout(timer);
  }
}

module.exports = { mintaBalasan, GalatPenyedia, BATAS_WAKTU_MS, TOKEN_BALASAN_MAKS };
