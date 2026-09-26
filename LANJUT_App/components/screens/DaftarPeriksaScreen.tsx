import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ButirDaftarPeriksa, KategoriDaftarPeriksa } from '../../api/types';
import { useButirDaftarPeriksa } from '../../hooks/useButirDaftarPeriksa';
import { useKemajuan, useTandaiKemajuan } from '../../hooks/useKemajuan';
import { useProfilLokal, useSetProfilLokal } from '../../hooks/useProfilLokal';
import { hitungProgres, type Progres } from '../../lib/daftarPeriksa';
import { useSesi } from '../../providers/AuthProvider';
import { color, font, gradient, radius, spacing, teks } from '../../theme/tokens';
import { Ikon, Kartu, KeadaanGalat, Kepala, Kosong, Memuat, SeksiJudul, Sumber, gaya } from '../ui';

const KELAS_OPSI = ['10', '11', '12'] as const;
const JALUR_OPSI = ['TKA', 'SNBP', 'SNBT'] as const;

/**
 * F5 — padanan MVP-PWA/checklist.html: bilah kemajuan bergradasi + tiga
 * kalimat kemajuan (§4.4), butir per kategori dengan kotak centang.
 *
 * Beda dari PWA, dua-duanya disengaja:
 *  - Centang disimpan ke akun lewat /kemajuan (PWA: localStorage), jadi
 *    ikut pindah ke HP lain.
 *  - Butir disaring kelas & jalur (AC F5 di PRD, belum ada di PWA). Kelas
 *    diisi dari akun kalau ada; jalur disimpan di perangkat karena akun
 *    belum punya medan jalur.
 */
export function DaftarPeriksaScreen() {
  const { pengguna } = useSesi();
  const profilQuery = useProfilLokal();
  const { mutate: simpanProfil } = useSetProfilLokal();

  const kelas = profilQuery.data?.kelas ?? pengguna?.kelas ?? null;
  const jalur = profilQuery.data?.jalur ?? null;
  const pilih = (ubah: { kelas?: string; jalur?: string }) => simpanProfil({ kelas, jalur, ...ubah });

  return (
    <View style={gaya.layarIsi}>
      <Kepala judul="Daftar Periksa" pengantar="Satu per satu, tidak perlu sekaligus." />

      <Kartu varian="soft" style={s.saring}>
        <BarisKeping label="Kelas" opsi={KELAS_OPSI} tampil={(k) => `Kelas ${k}`} aktif={kelas} onPilih={(k) => pilih({ kelas: k })} />
        <BarisKeping label="Jalur" opsi={JALUR_OPSI} tampil={(j) => j} aktif={jalur} onPilih={(j) => pilih({ jalur: j })} />
      </Kartu>

      {profilQuery.isPending ? (
        <Memuat />
      ) : kelas && jalur ? (
        <Checklist kelas={kelas} jalur={jalur} />
      ) : (
        <Kosong judul="Pilih kelas dan jalurmu dulu." teks="Supaya butir yang tampil memang yang perlu kamu siapkan." />
      )}
    </View>
  );
}

// .keping — pilihan berbentuk pil.
function BarisKeping<T extends string>({
  label,
  opsi,
  tampil,
  aktif,
  onPilih,
}: {
  label: string;
  opsi: readonly T[];
  tampil: (v: T) => string;
  aktif: string | null;
  onPilih: (v: T) => void;
}) {
  return (
    <View style={s.barisKeping}>
      <Text style={s.kepingLabel}>{label}</Text>
      <View style={s.kepingDaftar} role="radiogroup">
        {opsi.map((v) => {
          const pilihan = aktif === v;
          return (
            <Pressable
              key={v}
              onPress={() => onPilih(v)}
              accessibilityRole="radio"
              aria-checked={pilihan}
              style={StyleSheet.flatten([s.keping, pilihan && s.kepingAktif])}
            >
              <Text style={StyleSheet.flatten([s.kepingTeks, pilihan && s.kepingTeksAktif])}>{tampil(v)}</Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function Checklist({ kelas, jalur }: { kelas: string; jalur: string }) {
  const butirQuery = useButirDaftarPeriksa({ kelas, jalur });
  const kemajuanQuery = useKemajuan();
  const tandai = useTandaiKemajuan();

  if (butirQuery.isPending || kemajuanQuery.isPending) return <Memuat />;
  if (butirQuery.isError || kemajuanQuery.isError) return <KeadaanGalat />;

  const kategori = butirQuery.data.kategori.filter((k) => k.butir.length);
  if (!kategori.length) {
    return <Kosong judul="Bagian ini masih kami siapkan." teks="Kalau kamu punya bahannya, kirim ke kami." />;
  }

  // DELETE /kemajuan tidak menghapus baris, hanya mengosongkan selesai_pada.
  const selesai = new Set(kemajuanQuery.data.filter((k) => k.selesai_pada).map((k) => k.butir_id));
  const progres = hitungProgres(kategori, selesai);
  const adaBelumTerverifikasi = kategori.some((k) => k.butir.some((b) => !b.diperiksa_pada));

  return (
    <>
      <BilahKemajuan progres={progres} />
      {tandai.isError ? <Text style={s.galat}>Centang terakhir belum tersimpan. Coba lagi.</Text> : null}
      {kategori.map((k) => (
        <SeksiKategori
          key={k.id}
          kategori={k}
          selesai={selesai}
          onAlih={(b) => tandai.mutate({ butirId: b.id, selesai: !selesai.has(b.id) })}
        />
      ))}
      {adaBelumTerverifikasi ? <Sumber>Perlu dicek ke laman resmi SNPMB · belum diverifikasi</Sumber> : null}
    </>
  );
}

// .progress + tiga keadaan teks kemajuan (salinan-teks-lanjut.md §4.4).
function BilahKemajuan({ progres }: { progres: Progres }) {
  const persen = progres.total ? Math.round((progres.selesai / progres.total) * 100) : 0;
  return (
    <View style={s.kemajuan}>
      <View
        style={s.bilah}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={progres.total}
        aria-valuenow={progres.selesai}
        aria-label="Kemajuan daftar periksa"
      >
        <LinearGradient
          colors={gradient.progress.colors}
          start={gradient.progress.start}
          end={gradient.progress.end}
          style={StyleSheet.flatten([s.bilahIsi, { width: `${persen}%` }])}
        />
      </View>
      <Text style={gaya.teksBody}>
        {progres.status === 'kosong'
          ? 'Belum ada yang dicentang — itu wajar kalau baru mulai. Ambil satu yang paling gampang dulu.'
          : progres.status === 'selesai'
            ? 'Bagian persiapannya beres. Sisanya tinggal latihan.'
            : `${progres.selesai} dari ${progres.total} beres. Jalan terus.`}
      </Text>
    </View>
  );
}

function SeksiKategori({
  kategori,
  selesai,
  onAlih,
}: {
  kategori: KategoriDaftarPeriksa;
  selesai: ReadonlySet<string>;
  onAlih: (b: ButirDaftarPeriksa) => void;
}) {
  return (
    <View style={s.seksi}>
      <SeksiJudul>{kategori.nama}</SeksiJudul>
      <Kartu style={s.kartuButir}>
        {kategori.butir.map((b) => (
          <Centang key={b.id} label={b.judul} tercentang={selesai.has(b.id)} onAlih={() => onAlih(b)} />
        ))}
      </Kartu>
    </View>
  );
}

// .centang — kotak 24px radius-xs, terisi biru saat tercentang.
function Centang({ label, tercentang, onAlih }: { label: string; tercentang: boolean; onAlih: () => void }) {
  return (
    <Pressable
      onPress={onAlih}
      accessibilityRole="checkbox"
      aria-checked={tercentang}
      style={s.centang}
    >
      <View style={StyleSheet.flatten([s.kotak, tercentang && s.kotakAktif])}>
        {tercentang ? <Ikon nama="centang" ukuran={16} warna={color.white} tebal={2.5} /> : null}
      </View>
      <Text style={s.centangLabel}>{label}</Text>
    </Pressable>
  );
}

const s = StyleSheet.create({
  saring: { gap: spacing.s3, padding: spacing.s4 },
  barisKeping: { gap: spacing.s2 },
  kepingLabel: { ...teks.bodySm, fontFamily: font.medium, color: color.ink700 },
  kepingDaftar: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.s2 },
  keping: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: spacing.s4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.borderSoft,
    backgroundColor: color.white,
  },
  kepingAktif: { backgroundColor: color.blue400, borderColor: color.blue400 },
  kepingTeks: { ...teks.bodySm, fontFamily: font.medium, color: color.ink700 },
  kepingTeksAktif: { color: color.white },
  kemajuan: { gap: spacing.s3 },
  bilah: { height: 10, backgroundColor: color.ink100, borderRadius: radius.pill, overflow: 'hidden' },
  bilahIsi: { height: '100%', borderRadius: radius.pill },
  seksi: { gap: spacing.s3 },
  kartuButir: { gap: 2, paddingVertical: spacing.s2 },
  centang: { flexDirection: 'row', alignItems: 'center', gap: spacing.s3, minHeight: 44 },
  kotak: {
    width: 24,
    height: 24,
    borderRadius: radius.xs,
    borderWidth: 1,
    borderColor: color.borderSoft,
    backgroundColor: color.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kotakAktif: { backgroundColor: color.blue400, borderColor: color.blue400 },
  centangLabel: { ...teks.body, color: color.textBody, flex: 1 },
  galat: { ...teks.caption, color: color.blue600 },
});
