import React from 'react';
import { Article, H1 } from '@expo/html-elements';
import { useRouter } from 'expo-router';
import { Linking, Pressable, StyleSheet, Text, View, useWindowDimensions } from 'react-native';

import type { TahapanLinimasa } from '../../api/types';
import { useTahapanLinimasa } from '../../hooks/useTahapanLinimasa';
import { useKemajuan } from '../../hooks/useKemajuan';
import { useRiwayatLatihan } from '../../hooks/useLatihan';
import { useKartuSaya } from '../../hooks/useKartu';
import {
  apakahPunyaKemajuan,
  daftarKartuBeranda,
  hitungProgresBeranda,
  infoMulaiDariSini,
} from '../../lib/beranda';
import { kelompokJenjang, type Kelas } from '../../lib/jenjang';
import { formatRentang, formatTanggal, tanggalMomen, turunkanLinimasa, type TahapanTurunan } from '../../lib/linimasa';
import { lembagaSumber } from '../../lib/sumber';
import { useSesi } from '../../providers/AuthProvider';
import { color, font, radius, shadow, spacing, teks } from '../../theme/tokens';
import {
  BilahProgres,
  Ikon,
  Kartu,
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
 * terdekat (gradasi untuk kelas 12), kartu "Mulai dari Sini" bila baru, baris progres,
 * dan grid menu launcher 4 kolom (3 kolom < 360 px) per jenjang (LANJUT_065).
 */
export function LinimasaScreen() {
  const router = useRouter();
  const { pengguna } = useSesi();
  const { width } = useWindowDimensions();
  const kelas = pengguna?.kelas ?? null;
  const kelompok = kelompokJenjang(kelas);
  const kartu = daftarKartuBeranda(kelas);

  // Ambil data progres & aktivitas pengguna dari server
  const kemajuanQuery = useKemajuan();
  const latihanQuery = useRiwayatLatihan();
  const kartuQuery = useKartuSaya();

  const jumlahCentang = kemajuanQuery.data?.filter((k) => k.selesai_pada).length ?? 0;
  const jumlahLatihan = latihanQuery.data?.length ?? 0;
  const jumlahKartu = kartuQuery.data?.length ?? 0;

  const punyaKemajuan = apakahPunyaKemajuan({
    jumlahCentang,
    jumlahLatihan,
    jumlahKartu,
  });

  const progres = hitungProgresBeranda({
    kelas,
    prodiImpian: pengguna?.prodi_impian,
    jumlahCentang,
    jumlahLatihan,
  });

  const kolom = width < 360 ? 3 : 4;
  const memuatData = kemajuanQuery.isPending || latihanQuery.isPending || kartuQuery.isPending;

  return (
    <View style={gaya.layarIsi}>
      <H1 style={s.k1}>Tahu harus ngapain hari ini.</H1>

      {/* LANJUT_035, LANJUT_064: tenggat & tahapan SNBP/SNBT/TKA HANYA untuk kelas 12.
          Non-12 tidak merender Tenggat (tidak mengambil data linimasa & tidak
          menampilkan placeholder kosong). */}
      {kelompok === 'kelas12' ? <Tenggat /> : null}

      {/* LANJUT_065 §B: Kartu "Mulai dari Sini" untuk akun baru / belum punya kemajuan */}
      {!memuatData && !punyaKemajuan ? (
        <KartuMulaiDariSini kelas={kelas} onPress={(href) => router.push(href as any)} />
      ) : null}

      {/* LANJUT_065 §C: Satu baris progres di atas grid */}
      <View style={s.barisProgres}>
        <View style={s.progresTeksBaris}>
          <Text style={s.progresLabel}>{`${progres.selesai} dari ${progres.total} langkah selesai`}</Text>
        </View>
        <BilahProgres
          selesai={progres.selesai}
          total={progres.total}
          label="Progres langkah awal"
        />
      </View>

      {/* LANJUT_065 §A: Grid menu launcher 4 kolom (3 kolom bila lebar layar < 360 px) */}
      <View style={s.gridWadah}>
        {kartu.map((k) => {
          const label = k.labelPendek ?? k.judul;
          return (
            <Pressable
              key={k.id}
              accessibilityRole="button"
              accessibilityLabel={k.judul}
              style={({ pressed }) => [
                s.gridItem,
                { width: `${100 / kolom}%` as any },
                pressed && s.ditekan,
              ]}
              onPress={() => router.push(k.href as any)}
            >
              <View style={s.ikonWadah}>
                <Ikon nama={k.ikon} ukuran={24} warna={color.blue600} />
              </View>
              <Text style={s.gridLabel} numberOfLines={2}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function KartuMulaiDariSini({
  kelas,
  onPress,
}: {
  kelas: Kelas | null | undefined;
  onPress: (href: string) => void;
}) {
  const info = infoMulaiDariSini(kelas);

  return (
    <Kartu varian="soft" style={s.mulaiKartu}>
      <Text style={s.mulaiJudul}>{info.judul}</Text>
      <Text style={s.mulaiPenjelas}>{info.penjelas}</Text>
      <Tombol label={info.labelTombol} varian="utama" onPress={() => onPress(info.href)} />
    </Kartu>
  );
}

function Tenggat() {
  const { data, isPending, isError } = useTahapanLinimasa();
  return isPending ? <Memuat /> : isError ? <KeadaanGalat /> : <Isi data={data} />;
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

  const { terdekat, sisaHari, momen } = hasil;
  const adaTenggat = terdekat && momen && sisaHari !== null && sisaHari >= 0;

  return (
    <>
      {/* Tenggat terdekat: angka hari biasa, bukan hitungan detik (§4.1).
          Belum dimulai → menuju tanggal mulai; sudah berjalan → menuju tutup. */}
      <Kartu varian="brand">
        {adaTenggat ? (
          <>
            <Text style={s.tenggatAngka}>{sisaHari} hari</Text>
            <Text style={s.tenggatTeks}>
              menuju {terdekat.judul} {momen === 'mulai' ? 'dimulai' : 'ditutup'},{' '}
              {formatTanggal(tanggalMomen(terdekat, momen))}.
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
          Diperbarui dari {lembagaSumber(butir.url_sumber)} · dicek {formatTanggal(butir.diperiksa_pada)}
        </Sumber>
      </View>
    </Article>
  );
}

const s = StyleSheet.create({
  k1: { ...teks.title, color: color.textBody, marginVertical: 0 },
  // Teks gelap di kartu gradasi biru muda (LANJUT_027): putih hanya 1,3–2,0:1 di
  // blue200→blue300. textBody 8,7:1, textMuted 4,9:1 di ujung terburuk gradasi.
  tenggatAngka: { ...teks.h1, color: color.textBody },
  tenggatTeks: { ...teks.bodySm, color: color.textMuted, marginTop: 6 },
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
  // LANJUT_065: Mulai dari Sini
  mulaiKartu: {
    gap: spacing.s3,
    padding: spacing.s5,
  },
  mulaiJudul: {
    ...teks.title,
    fontFamily: font.semibold,
    color: color.textBody,
  },
  mulaiPenjelas: {
    ...teks.bodySm,
    color: color.textMuted,
  },
  // LANJUT_065: Baris Progres Sederhana
  barisProgres: {
    gap: spacing.s2,
  },
  progresTeksBaris: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  progresLabel: {
    ...teks.caption,
    fontFamily: font.medium,
    color: color.textMuted,
  },
  // LANJUT_065: Grid Menu Launcher
  gridWadah: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.s1,
    rowGap: spacing.s5,
  },
  gridItem: {
    alignItems: 'center',
    paddingHorizontal: spacing.s1,
    gap: spacing.s2,
  },
  ikonWadah: {
    width: 52,
    height: 52,
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: shadow.s1,
  },
  gridLabel: {
    fontFamily: font.medium,
    fontSize: 11,
    lineHeight: 14,
    color: color.textBody,
    textAlign: 'center',
  },
  ditekan: {
    opacity: 0.7,
  },
});
