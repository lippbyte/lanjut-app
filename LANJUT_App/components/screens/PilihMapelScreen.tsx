import React, { useState } from 'react';
import { Article, H2 } from '@expo/html-elements';
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { Prodi } from '../../api/types';
import { useAgregasiMapelLintasProdi } from '../../hooks/useAgregasiMapelLintasProdi';
import { useTandaiKemajuan } from '../../hooks/useKemajuan';
import { BUTIR_MAPEL_TKA, labelBobot } from '../../lib/pilihMapel';
import { useProdi } from '../../hooks/useProdi';
import { useProdiMapel } from '../../hooks/useProdiMapel';
import { useSesi } from '../../providers/AuthProvider';
import { color, radius, spacing, teks } from '../../theme/tokens';
import {
  Ikon,
  Kartu,
  KartuPintu,
  KeadaanGalat,
  Kepala,
  Kosong,
  Lencana,
  Memuat,
  Penafian,
  SeksiJudul,
  Tombol,
  gaya,
} from '../ui';

// Penafian F3 — wajib tampil di setiap hasil (PRD Bagian 6).
const PENAFIAN = 'Ini rangkuman, bukan keputusan resmi. Cek laman SNPMB.';
// Istilah yang sama dengan baris "Target prodi" di Jalur Saya.
const LABEL_TARGET = 'Target prodi';

// `belumTahu`: datang dari pintu "Belum, bantu aku eksplorasi".
type Langkah =
  | { nama: 'masuk' }
  | { nama: 'daftar'; belumTahu: boolean }
  | { nama: 'hasil'; prodiId: string | null };

type BarisMapel = { id: string; nama: string; tersedia: boolean; ket?: string };

/**
 * F3 — padanan MVP-PWA/pilih-mapel.html, tiga langkah:
 *   masuk  → "Sudah tahu prodi tujuan?" (dua pintu, keduanya ke daftar)
 *   daftar → prodi dikelompokkan per rumpun + "rangkuman umum"
 *   hasil  → mapel pendukung + ketersediaan di SMK + saran 2 mapel TKA
 * Kalau akun sudah punya prodi impian, langsung ke hasil (sama dengan PWA).
 */
export function PilihMapelScreen() {
  const { pengguna } = useSesi();
  const prodiQuery = useProdi();
  const daftarProdi = prodiQuery.data ?? [];

  const prodiAkun = pengguna?.prodi_impian ?? null;
  const [langkahDipilih, setLangkah] = useState<Langkah | null>(null);
  const prodiAkunValid = prodiAkun && daftarProdi.some((p) => p.id === prodiAkun) ? prodiAkun : null;
  const langkah: Langkah =
    langkahDipilih ?? (prodiAkunValid ? { nama: 'hasil', prodiId: prodiAkunValid } : { nama: 'masuk' });

  return (
    <View style={gaya.layarIsiRapat}>
      <Kepala judul="Penolong Pilih Mapel" pengantar="Prodi tujuan, mapel pendukung, dan mana yang ada di SMK." />

      {prodiQuery.isPending ? (
        <Memuat />
      ) : prodiQuery.isError ? (
        <KeadaanGalat />
      ) : langkah.nama === 'masuk' ? (
        <LangkahMasuk onLanjut={(belumTahu) => setLangkah({ nama: 'daftar', belumTahu })} />
      ) : langkah.nama === 'daftar' ? (
        <LangkahDaftar
          daftarProdi={daftarProdi}
          prodiTarget={prodiAkunValid}
          belumTahu={langkah.belumTahu}
          onPilih={(prodiId) => setLangkah({ nama: 'hasil', prodiId })}
        />
      ) : (
        <LangkahHasil
          prodi={langkah.prodiId ? (daftarProdi.find((p) => p.id === langkah.prodiId) ?? null) : null}
          totalProdi={daftarProdi.length}
          prodiTarget={prodiAkunValid}
          onUbah={() => setLangkah({ nama: 'daftar', belumTahu: false })}
        />
      )}
    </View>
  );
}

function LangkahMasuk({ onLanjut }: { onLanjut: (belumTahu: boolean) => void }) {
  // Kedua pintu menuju daftar yang sama: data baru mengelompokkan prodi per
  // rumpun, belum ada taksonomi minat terpisah (catatan yang sama di PWA).
  // Bedanya hanya letak kartu rangkuman umum (lihat LangkahDaftar).
  return (
    <View style={s.tumpuk}>
      <Text style={gaya.teksBody}>Sudah tahu prodi tujuan?</Text>
      <KartuPintu
        varian="outline"
        judul="Ya, sudah tahu"
        keterangan="Langsung pilih dari daftar prodi."
        onPress={() => onLanjut(false)}
      />
      <KartuPintu
        varian="soft"
        judul="Belum, bantu aku eksplorasi"
        keterangan="Mulai dari rumpun ilmu."
        onPress={() => onLanjut(true)}
      />
    </View>
  );
}

function LangkahDaftar({
  daftarProdi,
  prodiTarget,
  belumTahu,
  onPilih,
}: {
  daftarProdi: Prodi[];
  /** prodi_impian akun (Jalur Saya) — ditandai supaya mudah ditemukan lagi. */
  prodiTarget: string | null;
  /** Rangkuman umum ditaruh paling atas, bukan di bawah semua prodi. */
  belumTahu: boolean;
  onPilih: (id: string | null) => void;
}) {
  const perRumpun = new Map<string, Prodi[]>();
  for (const p of daftarProdi) {
    if (!perRumpun.has(p.rumpun)) perRumpun.set(p.rumpun, []);
    perRumpun.get(p.rumpun)!.push(p);
  }

  const rangkuman = (
    <KartuPintu
      varian="soft"
      judul="Masih belum tahu, tampilkan rangkuman umum"
      keterangan="Mapel yang paling sering jadi penentu di banyak prodi."
      onPress={() => onPilih(null)}
    />
  );

  return (
    <View style={s.daftar}>
      {belumTahu ? rangkuman : null}
      {[...perRumpun.entries()].map(([rumpun, anggota]) => (
        <View key={rumpun} style={s.seksi}>
          <SeksiJudul>{rumpun}</SeksiJudul>
          <View style={s.tumpukRapat}>
            {anggota.map((p) => (
              <Pressable
                key={p.id}
                onPress={() => onPilih(p.id)}
                accessibilityRole="button"
                style={({ pressed }) => (pressed ? s.ditekan : undefined)}
              >
                <Kartu style={s.kartuRapat}>
                  <View style={s.baris}>
                    <Text style={s.barisTeks}>{p.nama}</Text>
                    {p.id === prodiTarget ? <Lencana>{LABEL_TARGET}</Lencana> : null}
                    <Ikon nama="panah" ukuran={16} warna={color.ink500} />
                  </View>
                </Kartu>
              </Pressable>
            ))}
          </View>
        </View>
      ))}
      {belumTahu ? null : rangkuman}
    </View>
  );
}

function LangkahHasil({
  prodi,
  totalProdi,
  prodiTarget,
  onUbah,
}: {
  prodi: Prodi | null;
  totalProdi: number;
  prodiTarget: string | null;
  onUbah: () => void;
}) {
  return (
    <View style={s.hasil}>
      <View style={s.barisJudul}>
        <H2 style={s.judulHasil}>{prodi?.nama ?? 'Rangkuman umum'}</H2>
        <Tombol label="Ubah prodi" varian="hantu" kecil onPress={onUbah} />
      </View>
      {prodi && prodi.id === prodiTarget ? <Lencana>{LABEL_TARGET}</Lencana> : null}
      {prodi ? <HasilProdi prodiId={prodi.id} /> : <HasilUmum totalProdi={totalProdi} />}
    </View>
  );
}

function HasilProdi({ prodiId }: { prodiId: string }) {
  const { data, isPending, isError } = useProdiMapel(prodiId);
  if (isPending) return <Memuat />;
  if (isError) return <KeadaanGalat />;
  // Urut bobot tertinggi dulu: dua teratas sah dijadikan saran mapel TKA.
  // Bobot ikut tampil sebagai label supaya jelas kenapa dua itu yang disarankan.
  const baris: BarisMapel[] = (data ?? [])
    .slice()
    .sort((a, b) => b.bobot - a.bobot)
    .map((m) => ({ id: m.id, nama: m.nama, tersedia: m.tersedia_di_smk, ket: labelBobot(m.bobot) }));
  return <IsiHasil baris={baris} />;
}

// "Belum tahu prodi" tetap wajib berguna (PRD F3): dihitung di backend lewat
// GET /konten/mapel/agregasi-lintas-prodi.
function HasilUmum({ totalProdi }: { totalProdi: number }) {
  const { data, isPending, isError } = useAgregasiMapelLintasProdi();
  if (isPending) return <Memuat />;
  if (isError) return <KeadaanGalat />;
  const baris: BarisMapel[] = (data ?? []).map((m) => ({
    id: m.id,
    nama: m.nama,
    tersedia: m.tersedia_di_smk,
    ket: `Dibutuhkan ${m.jumlahProdi} dari ${totalProdi} prodi`,
  }));
  return <IsiHasil baris={baris} />;
}

function IsiHasil({ baris }: { baris: BarisMapel[] }) {
  const router = useRouter();
  const tandai = useTandaiKemajuan();

  if (!baris.length) {
    return <Kosong judul="Bagian ini masih kami siapkan." teks="Kalau kamu punya bahannya, kirim ke kami." />;
  }

  const saran = baris.slice(0, 2).map((b) => b.nama).join(' & ');

  const simpan = () =>
    tandai.mutate(
      { butirId: BUTIR_MAPEL_TKA, selesai: true },
      { onSuccess: () => router.push('/daftar-periksa') }
    );

  return (
    <>
      <View style={s.tumpukRapat}>
        {baris.map((b) => (
          <Article key={b.id}>
            <Kartu style={s.kartuRapat}>
              <View style={s.baris}>
                <Ikon nama={b.tersedia ? 'ok' : 'waspada'} ukuran={18} warna={b.tersedia ? color.statusOk : color.blue600} />
                <View style={s.barisIsi}>
                  <Text style={s.barisTeks}>{b.nama}</Text>
                  {b.ket ? <Text style={s.caption}>{b.ket}</Text> : null}
                </View>
                {/* Peringatan wajib F3 untuk mapel yang tidak ada di SMK — tenang, tanpa merah. */}
                <Text style={StyleSheet.flatten([s.caption, { color: b.tersedia ? color.statusOk : color.blue600 }])}>
                  {b.tersedia ? 'Tersedia di SMK' : 'Cek alternatif'}
                </Text>
              </View>
            </Kartu>
          </Article>
        ))}
      </View>

      <Kartu varian="brand">
        <Text style={s.saranLabel}>Saran mapel pilihan TKA</Text>
        <Text style={s.saranIsi}>{saran}</Text>
      </Kartu>

      <Penafian>{PENAFIAN}</Penafian>

      <View style={s.tumpuk}>
        {tandai.isError ? <Text style={s.galat}>Belum tersimpan. Coba lagi sebentar lagi.</Text> : null}
        <Tombol label="Simpan ke Daftar Periksa" besar penuh proses={tandai.isPending} onPress={simpan} />
        <Tombol label="Lewati" varian="hantu" besar penuh onPress={() => router.push('/linimasa')} />
      </View>
    </>
  );
}

const s = StyleSheet.create({
  tumpuk: { gap: spacing.s3 },
  tumpukRapat: { gap: spacing.s2 },
  daftar: { gap: spacing.s5, marginTop: spacing.s1 },
  seksi: { gap: spacing.s3 },
  hasil: { gap: spacing.s3, marginTop: spacing.s2 },
  kartuRapat: { padding: spacing.s3, borderRadius: radius.md },
  baris: { flexDirection: 'row', alignItems: 'center', gap: spacing.s3 },
  barisIsi: { flex: 1, minWidth: 0 },
  barisTeks: { ...teks.body, color: color.textBody, flex: 1 },
  caption: { ...teks.caption, color: color.textMuted },
  barisJudul: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: spacing.s3 },
  judulHasil: { ...teks.h3, color: color.textBody, flexShrink: 1, marginVertical: 0 },
  saranLabel: { ...teks.label, color: color.white, opacity: 0.85 },
  saranIsi: { ...teks.h3, color: color.white, marginTop: 6 },
  galat: { ...teks.caption, color: color.blue600, textAlign: 'center' },
  ditekan: { opacity: 0.9, transform: [{ scale: 0.98 }] },
});

