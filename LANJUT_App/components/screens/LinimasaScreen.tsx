import React from 'react';
import { Article, H1 } from '@expo/html-elements';
import { useRouter } from 'expo-router';
import { Linking, StyleSheet, Text, View } from 'react-native';

import type { TahapanLinimasa } from '../../api/types';
import { useTahapanLinimasa } from '../../hooks/useTahapanLinimasa';
import { formatRentang, formatTanggal, turunkanLinimasa, type TahapanTurunan } from '../../lib/linimasa';
import { color, font, spacing, teks } from '../../theme/tokens';
import {
  Kartu,
  KartuPintu,
  KeadaanGalat,
  Kosong,
  Memuat,
  SeksiJudul,
  Sumber,
  Tombol,
  gaya,
} from '../ui';

const LAMAN_SNPMB = 'https://snpmb.bppp.kemdikbud.go.id/';

/**
 * Tab Beranda — padanan MVP-PWA/beranda.html: kalimat K1, kartu tenggat
 * terdekat (gradasi), linimasa bertitik-garis, lalu pintu ke Cerita Alumni.
 * Butir tanpa `diperiksa_pada` sudah disaring di lib/linimasa.ts (PRD F1),
 * jadi selama tim konten belum memverifikasi data, layar kosong yang tampil.
 */
export function LinimasaScreen() {
  const router = useRouter();
  const { data, isPending, isError } = useTahapanLinimasa();

  return (
    <View style={gaya.layarIsi}>
      <H1 style={s.k1}>Tahu harus ngapain hari ini.</H1>

      {isPending ? <Memuat /> : isError ? <KeadaanGalat /> : <Isi data={data} />}

      {/* v1.1 — tidak ada di PWA. Di bawah tenggat supaya tenggat tetap pertama. */}
      <KartuPintu
        ikon="posisi"
        judul="Cek Posisi Gue"
        keterangan="Lihat kamu lagi di tahap mana dan langkah yang cocok berikutnya."
        onPress={() => router.push('/cek-posisi')}
      />

      {/* Satu-satunya jalan ke Cerita Alumni — bukan tab (sama dengan PWA). */}
      <KartuPintu
        ikon="alumni"
        judul="Cerita Alumni SMK"
        keterangan="Mereka sudah lewat jalan ini."
        varian="outline"
        onPress={() => router.push('/cerita-alumni')}
      />
    </View>
  );
}

function Isi({ data }: { data: TahapanLinimasa[] | undefined }) {
  const hasil = turunkanLinimasa(data ?? []);

  if (!hasil.butir.length) {
    return (
      <Kartu>
        <Kosong
          judul="Tanggal resminya sedang kami cek."
          teks="Tahapan TKA, SNBP, dan SNBT baru tampil di sini setelah dicek ke laman resmi SNPMB. Sementara itu, lihat jadwalnya langsung di sana."
          aksi={
            <Tombol label="Buka laman resmi SNPMB" varian="sekunder" onPress={() => Linking.openURL(LAMAN_SNPMB)} />
          }
        />
      </Kartu>
    );
  }

  const adaTenggat = hasil.terdekat && hasil.sisaHari !== null && hasil.sisaHari >= 0;

  return (
    <>
      {/* Tenggat terdekat: angka hari biasa, bukan hitungan detik (§4.1). */}
      <Kartu varian="brand">
        {adaTenggat ? (
          <>
            <Text style={s.tenggatAngka}>{hasil.sisaHari} hari</Text>
            <Text style={s.tenggatTeks}>
              menuju {hasil.terdekat!.judul} ditutup, {formatTanggal(hasil.terdekat!.tanggal_selesai)}.
            </Text>
          </>
        ) : (
          <Text style={s.tenggatTeks}>Sudah lewat. Tenggat berikutnya ada di bawah.</Text>
        )}
      </Kartu>

      <View style={s.seksi}>
        <SeksiJudul>Tahapan berikutnya</SeksiJudul>
        <Kartu>
          {hasil.butir.map((b, i) => (
            <ButirLinimasa key={b.id} butir={b} terakhir={i === hasil.butir.length - 1} />
          ))}
        </Kartu>
      </View>
    </>
  );
}

// .linimasa li — titik + garis penghubung di kiri, teks di kanan. Tahapan
// yang lewat diredupkan & dicoret, tidak dihapus (PRD F1).
function ButirLinimasa({ butir, terakhir }: { butir: TahapanTurunan; terakhir: boolean }) {
  const lewat = butir.status === 'done';
  return (
    <Article style={StyleSheet.flatten([s.butir, lewat && s.butirLewat])}>
      <View style={s.rel}>
        <View
          style={StyleSheet.flatten([
            s.titik,
            butir.status === 'done' && s.titikLewat,
            butir.status === 'soon' && s.titikSoon,
          ])}
        />
        {!terakhir && <View style={s.garis} />}
      </View>
      <View style={StyleSheet.flatten([s.teks, terakhir && s.teksTerakhir])}>
        <Text style={s.tanggal}>{formatRentang(butir.tanggal_mulai, butir.tanggal_selesai)}</Text>
        <Text style={StyleSheet.flatten([s.judul, lewat && s.judulLewat])}>{butir.judul}</Text>
        <Sumber>
          Diperbarui dari laman resmi SNPMB · dicek {formatTanggal(butir.diperiksa_pada)}
        </Sumber>
      </View>
    </Article>
  );
}

const s = StyleSheet.create({
  k1: { ...teks.title, color: color.textBody, marginVertical: 0 },
  tenggatAngka: { ...teks.h1, color: color.white },
  tenggatTeks: { ...teks.bodySm, color: color.onDarkText, marginTop: 6 },
  seksi: { gap: spacing.s3 },
  butir: { flexDirection: 'row', gap: spacing.s4 },
  butirLewat: { opacity: 0.55 },
  rel: { width: 20, alignItems: 'center' },
  titik: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginTop: 5,
    backgroundColor: color.white,
    borderWidth: 2,
    borderColor: color.ink300,
  },
  titikLewat: { backgroundColor: color.statusOk, borderColor: color.statusOk },
  titikSoon: { backgroundColor: color.blue400, borderColor: color.blue400 },
  garis: { flex: 1, width: 2, backgroundColor: color.borderSoft, marginTop: 6, borderRadius: 1 },
  teks: { flex: 1, paddingBottom: spacing.s6 },
  teksTerakhir: { paddingBottom: 0 },
  tanggal: { ...teks.caption, color: color.textMuted },
  judul: { ...teks.title, fontFamily: font.semibold, color: color.textBody, marginTop: 2 },
  judulLewat: { textDecorationLine: 'line-through' },
});
