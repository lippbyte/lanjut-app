import React, { useState } from 'react';
import { Article } from '@expo/html-elements';
import { useRouter, type Href } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ButirKhususSmk } from '../../api/types';
import { useButirKhususSmk } from '../../hooks/useButirKhususSmk';
import { kelompokJenjang, type KelompokJenjang } from '../../lib/jenjang';
import { butirSmkUntuk } from '../../lib/khususSmk';
import { formatTanggal } from '../../lib/linimasa';
import { lembagaSumber } from '../../lib/sumber';
import { useSesi } from '../../providers/AuthProvider';
import { color, font, radius, spacing, teks } from '../../theme/tokens';
import { Ikon, Kartu, KartuPintu, KeadaanGalat, Kepala, Memuat, SeksiJudul, Sumber, gaya } from '../ui';
import type { NamaIkon } from '../ui/Ikon';

// ---------------------------------------------------------------------------
// TEKS DRAF (LANJUT_037), belum disetujui Khalifa — salinan-teks-lanjut.md §4.2.
// Kecuali PEMBUKA_SMK_KELAS_12: teks lama halaman Khusus SMK, dipakai apa adanya.
// ---------------------------------------------------------------------------
const PENGANTAR: Record<KelompokJenjang, (kelas: string) => string> = {
  smp: (k) => `Kelas ${k} SMP: waktunya kenalan sama minat dan bakatmu.`,
  kelas10_11: (k) => `Kelas ${k}: mulai kenalan sama jurusan yang kamu incar.`,
  kelas12: () => 'Kelas 12: yang perlu kamu siapkan sebelum daftar kuliah.',
};
const PENGANTAR_TANPA_KELAS = 'Isi kelasmu di Jalur Saya supaya isi halaman ini pas buat kamu.';

type Pintu = { ikon: NamaIkon; judul: string; keterangan: string; href: Href };
const PINTU_NGOBROL: Pintu = {
  ikon: 'obrolan',
  judul: 'Ngobrol Bareng LANJUT',
  keterangan: 'Cerita soal yang kamu suka, nanti dibantu cari arahnya.',
  href: '/ngobrol',
};
const PINTU_GAYA: Pintu = {
  ikon: 'info',
  judul: 'Gaya Belajar',
  keterangan: 'Kenali cara belajar yang paling nyambung buat kamu.',
  href: '/gaya-belajar',
};
const PINTU_EKSPLORASI: Pintu = {
  ikon: 'posisi',
  judul: 'Eksplorasi Tujuan',
  keterangan: 'Intip prodi kuliah: belajar apa dan lulusannya kerja di mana.',
  href: '/eksplorasi-tujuan',
};
const PINTU_MAPEL: Pintu = {
  ikon: 'mapel',
  judul: 'Pilih Mapel',
  keterangan: 'Lihat mapel yang mendukung jurusan incaranmu, dan mana yang ada di sekolahmu.',
  href: '/pilih-mapel',
};
const PINTU: Record<KelompokJenjang, Pintu[]> = {
  smp: [PINTU_NGOBROL, PINTU_GAYA, PINTU_EKSPLORASI],
  kelas10_11: [PINTU_MAPEL, PINTU_EKSPLORASI, PINTU_GAYA],
  kelas12: [
    { ikon: 'posisi', judul: 'Cek Posisi Gue', keterangan: 'Lihat kamu lagi di tahap mana dan langkah berikutnya.', href: '/cek-posisi' },
    { ikon: 'checklist', judul: 'Daftar Periksa', keterangan: 'Satu per satu, tidak perlu sekaligus.', href: '/daftar-periksa' },
  ],
};
const PINTU_TANPA_KELAS = [PINTU_MAPEL, PINTU_EKSPLORASI, PINTU_NGOBROL];

const CATATAN: Partial<Record<KelompokJenjang, { judul: string; isi: string }>> = {
  smp: {
    judul: 'SMA, SMK, atau MA?',
    isi: 'Habis SMP, kamu bisa lanjut ke SMA, SMK, atau MA. SMA dan MA lebih banyak belajar teori sebagai bekal kuliah. SMK langsung belajar keahlian lewat praktik dan PKL, dan lulusannya tetap bisa kuliah. Pilih yang paling cocok sama minatmu, bukan cuma ikut teman.',
  },
  kelas10_11: {
    judul: 'Belum perlu mikirin jadwal daftar',
    isi: 'Jadwal pendaftaran kuliah belum perlu dipikirkan sekarang. Fokus dulu cari jurusan yang cocok, lalu jaga nilai mapel yang mendukungnya.',
  },
};

const PEMBUKA_SMK_KELAS_10_11 = 'Beberapa hal memang beda buat anak SMK. Yang ini sudah bisa kamu siapkan dari sekarang.';
const PEMBUKA_SMK_KELAS_12 =
  'Sebagian aturan seleksi menganggap semua pendaftar berasal dari SMA. Halaman ini merangkum bagian yang tidak berlaku sama untuk kita — dan apa yang bisa dilakukan.';

/**
 * Jenjang Saya (LANJUT_037) — dulu "Khusus SMK" (F2), sekarang hub semua
 * jenjang. Isinya menurut kelas AKUN (lib/jenjang.ts `kelompokJenjang`):
 *   - SMP 7–9     → pintu eksplorasi minat; TIDAK ada bagian SMK.
 *   - kelas 10–11 → pintu Pilih Mapel & F10; bagian SMK hanya butir tanpa
 *                   SNBP/PDSS/UTBK/kuota (lib/khususSmk.ts daftar izin).
 *   - kelas 12    → bagian SMK lengkap seperti halaman lama (tidak diblokir).
 * Bagian "Kalau kamu anak SMK" hanya untuk jenis sekolah SMK (LANJUT_038);
 * siswa SMA/MA kelas 10–12 tidak melihatnya.
 */
export function JenjangSayaScreen() {
  const router = useRouter();
  const { pengguna } = useSesi();
  const kelas = pengguna?.kelas ?? null;
  const kelompok = kelompokJenjang(kelas);
  const pintu = kelompok ? PINTU[kelompok] : PINTU_TANPA_KELAS;
  const catatan = kelompok ? CATATAN[kelompok] : undefined;
  // LANJUT_038: menurut jenis sekolah, bukan rentang kelas. Kelas 7–9 selalu
  // SMP, jadi syarat kelompok hanya menjaga data yang tidak konsisten.
  const anakSmk = pengguna?.jenis_sekolah === 'SMK' && (kelompok === 'kelas10_11' || kelompok === 'kelas12');

  return (
    <View style={gaya.layarIsiRapat}>
      <Kepala judul="Jenjang Saya" pengantar={kelompok && kelas ? PENGANTAR[kelompok](kelas) : PENGANTAR_TANPA_KELAS} />

      <View style={s.seksi}>
        <SeksiJudul>Mulai dari sini</SeksiJudul>
        {pintu.map((p) => (
          <KartuPintu key={p.judul} ikon={p.ikon} judul={p.judul} keterangan={p.keterangan} onPress={() => router.push(p.href)} />
        ))}
      </View>

      {catatan ? (
        <Kartu varian="soft">
          <Text style={s.catatanJudul}>{catatan.judul}</Text>
          <Text style={gaya.teksKecil}>{catatan.isi}</Text>
        </Kartu>
      ) : null}

      {anakSmk && kelompok ? <SeksiSmk kelompok={kelompok} /> : null}
    </View>
  );
}

function SeksiSmk({ kelompok }: { kelompok: KelompokJenjang }) {
  const { data, isPending, isError } = useButirKhususSmk();
  const butir = butirSmkUntuk(data ?? [], kelompok);
  // Semua tertutup di awal supaya seluruh judul terlihat sekaligus.
  const [terbuka, setTerbuka] = useState<Set<string>>(() => new Set());

  if (!isPending && !isError && !butir.length) return null;

  const alih = (id: string) =>
    setTerbuka((lama) => {
      const baru = new Set(lama);
      if (baru.has(id)) baru.delete(id);
      else baru.add(id);
      return baru;
    });

  return (
    <View style={s.seksi}>
      <SeksiJudul>Kalau kamu anak SMK</SeksiJudul>
      <Text style={gaya.teksBody}>{kelompok === 'kelas12' ? PEMBUKA_SMK_KELAS_12 : PEMBUKA_SMK_KELAS_10_11}</Text>
      {isPending ? (
        <Memuat />
      ) : isError ? (
        <KeadaanGalat />
      ) : (
        <View style={s.daftar}>
          {butir.map((b) => (
            <ButirKartu key={b.id} butir={b} buka={terbuka.has(b.id)} onAlih={() => alih(b.id)} />
          ))}
        </View>
      )}
    </View>
  );
}

// F2 — kartu buka-tutup berpasangan "apa yang berbeda" + "apa yang bisa dilakukan".
function ButirKartu({ butir, buka, onAlih }: { butir: ButirKhususSmk; buka: boolean; onAlih: () => void }) {
  const lembaga = lembagaSumber(butir.url_sumber);
  return (
    <Article>
      <Kartu>
        <Pressable
          onPress={onAlih}
          accessibilityRole="button"
          aria-expanded={buka}
          style={s.ringkasan}
        >
          <Text style={s.judul}>{butir.judul}</Text>
          <View style={buka ? s.panahBuka : undefined}>
            <Ikon nama="panah" ukuran={18} warna={buka ? color.blue600 : color.ink500} />
          </View>
        </Pressable>

        {buka ? (
          <View style={s.pasangan}>
            <View style={StyleSheet.flatten([s.blok, s.blokBeda])}>
              <Text style={StyleSheet.flatten([s.label, s.labelBeda])}>Apa yang berbeda</Text>
              <Text style={gaya.teksKecil}>{butir.apa_yang_beda}</Text>
            </View>
            <View style={StyleSheet.flatten([s.blok, s.blokBisa])}>
              <Text style={StyleSheet.flatten([s.label, s.labelBisa])}>Apa yang bisa dilakukan</Text>
              <Text style={gaya.teksKecil}>{butir.apa_yang_bisa_dilakukan}</Text>
            </View>
            <Sumber>
              {butir.diperiksa_pada
                ? `Diperbarui dari ${lembaga} · dicek ${formatTanggal(butir.diperiksa_pada)}`
                : `Perlu dicek ke ${lembaga} · belum diverifikasi`}
            </Sumber>
          </View>
        ) : null}
      </Kartu>
    </Article>
  );
}

const s = StyleSheet.create({
  seksi: { gap: spacing.s3 },
  catatanJudul: { ...teks.title, fontFamily: font.semibold, color: color.textBody, marginBottom: spacing.s1 },
  daftar: { gap: spacing.s4 },
  ringkasan: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.s3 },
  judul: { ...teks.title, fontFamily: font.semibold, color: color.textBody, flex: 1 },
  panahBuka: { transform: [{ rotate: '90deg' }] },
  // .pasangan
  pasangan: { gap: spacing.s3, marginTop: spacing.s4 },
  blok: { borderRadius: radius.md, padding: spacing.s3, gap: spacing.s1 },
  blokBeda: { backgroundColor: color.statusAttentionBg },
  blokBisa: { backgroundColor: color.statusOkBg },
  label: { ...teks.label },
  labelBeda: { color: color.blue600 },
  labelBisa: { color: color.statusOkFg },
});
