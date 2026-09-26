import React, { useState } from 'react';
import { Article, H1, Section } from '@expo/html-elements';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import type { MapelUntukProdi, Prodi } from '../../api/types';
import { useAgregasiMapelLintasProdi } from '../../hooks/useAgregasiMapelLintasProdi';
import { useProdi } from '../../hooks/useProdi';
import { useProdiMapel } from '../../hooks/useProdiMapel';
import { mapelTidakTersedia, saranMapelTka, type MapelAgregat } from '../../lib/pilihMapel';
import { color, radius, spacing, typography } from '../../theme/tokens';
import { KeadaanGalat, KeadaanKosong } from './KeadaanBersama';

// Penafian F3, wajib tampil di SETIAP hasil tanpa kecuali — kata demi kata
// docs/prd-sdd-lanjut.md Bagian 6 (F3), bukan diparafrase. Tidak ada
// salinan terpisah untuk F3 di salinan-teks-lanjut.md (§4 hanya sampai
// Eksplorasi Tujuan) — PRD sendiri yang mengutip kalimat ini persis, jadi
// itu yang dipakai sebagai sumber kebenaran teksnya.
const PENAFIAN = 'Ini rangkuman, bukan keputusan resmi. Cek laman SNPMB.';

type Pilihan = { tipe: 'prodi'; prodiId: string } | { tipe: 'belum' } | null;

/**
 * F3 — Penolong Pilih Mapel (docs/prd-sdd-lanjut.md Bagian 6 & 13). Dua
 * jalur setara: pilih satu prodi, atau "belum tahu prodi" — keduanya wajib
 * menghasilkan keluaran berguna (AC F3), bukan salah satu jadi jalan buntu.
 */
export function PilihMapelScreen() {
  const [pilihan, setPilihan] = useState<Pilihan>(null);
  const prodiQuery = useProdi();

  return (
    <Section style={styles.halaman}>
      <H1 style={styles.judul}>Penolong Pilih Mapel</H1>

      {prodiQuery.isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : prodiQuery.isError ? (
        <KeadaanGalat />
      ) : !pilihan ? (
        <PemilihProdi
          daftarProdi={prodiQuery.data ?? []}
          onPilihProdi={(id) => setPilihan({ tipe: 'prodi', prodiId: id })}
          onPilihBelumTahu={() => setPilihan({ tipe: 'belum' })}
        />
      ) : pilihan.tipe === 'prodi' ? (
        <HasilProdi
          prodi={(prodiQuery.data ?? []).find((p) => p.id === pilihan.prodiId) ?? null}
          onGanti={() => setPilihan(null)}
        />
      ) : (
        <HasilBelumTahu daftarProdi={prodiQuery.data ?? []} onGanti={() => setPilihan(null)} />
      )}
    </Section>
  );
}

// Prompt persis salinan-teks-lanjut.md §3 "Pertanyaan pembuka" — konteksnya
// onboarding, tapi pertanyaan & opsi "belum" yang sama berlaku di sini.
// Label tombol "Belum tahu prodi" mengutip persis frasa PRD Bagian 6 (F3).
function PemilihProdi({
  daftarProdi,
  onPilihProdi,
  onPilihBelumTahu,
}: {
  daftarProdi: Prodi[];
  onPilihProdi: (id: string) => void;
  onPilihBelumTahu: () => void;
}) {
  if (!daftarProdi.length) return <KeadaanKosong />;

  return (
    <>
      <Text style={styles.prompt}>Sudah ada bayangan prodi? (Boleh dijawab &quot;belum&quot;)</Text>
      {daftarProdi.map((p) => (
        <Pressable key={p.id} onPress={() => onPilihProdi(p.id)} style={styles.opsiProdi}>
          <Text style={styles.opsiProdiNama}>{p.nama}</Text>
          <Text style={styles.opsiProdiRumpun}>{p.rumpun}</Text>
        </Pressable>
      ))}
      <Pressable onPress={onPilihBelumTahu} style={styles.opsiBelumTahu}>
        <Text style={styles.opsiBelumTahuTeks}>Belum tahu prodi</Text>
      </Pressable>
    </>
  );
}

// "Kembali" — token tombol yang sudah ada di salinan-teks-lanjut.md §6
// ("Halaman tidak ketemu. Balik ke Linimasa? [ Kembali ]"), dipakai lagi
// di sini untuk aksi yang sama (ganti pilihan), bukan label baru.
function BarisJudulHasil({ judul, onGanti }: { judul: string; onGanti: () => void }) {
  return (
    <View style={styles.barisAtas}>
      <Text style={styles.subjudul}>{judul}</Text>
      <Pressable onPress={onGanti}>
        <Text style={styles.tautanKembali}>Kembali</Text>
      </Pressable>
    </View>
  );
}

function HasilProdi({ prodi, onGanti }: { prodi: Prodi | null; onGanti: () => void }) {
  const { data, isPending, isError } = useProdiMapel(prodi?.id);

  return (
    <>
      <BarisJudulHasil judul={prodi?.nama ?? ''} onGanti={onGanti} />

      {isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : isError ? (
        <KeadaanGalat />
      ) : !data?.length ? (
        <KeadaanKosong />
      ) : (
        <HasilMapelProdi daftar={data} />
      )}
    </>
  );
}

// AC F3: daftar mapel pendukung + status tersedia_di_smk (semua, tidak
// disaring), saran 2 mapel TKA urut bobot tertinggi (lib/pilihMapel.ts
// `saranMapelTka`), dan peringatan eksplisit terpisah untuk yang tidak
// tersedia di SMK — bukan disembunyikan atau digabung diam-diam ke daftar
// biasa (lib/pilihMapel.ts `mapelTidakTersedia`).
function HasilMapelProdi({ daftar }: { daftar: MapelUntukProdi[] }) {
  const tidakTersedia = mapelTidakTersedia(daftar);
  const saran = saranMapelTka(daftar);

  return (
    <>
      <Section style={styles.blok}>
        <Text style={styles.blokJudul}>Mapel pendukung</Text>
        {daftar.map((m) => (
          <MapelBaris key={m.id} nama={m.nama} tersediaDiSmk={m.tersedia_di_smk} />
        ))}
      </Section>

      <PeringatanTidakTersedia daftar={tidakTersedia} />

      <Section style={styles.blok}>
        <Text style={styles.blokJudul}>Saran mapel pilihan TKA</Text>
        {saran.map((m) => (
          <MapelBaris key={m.id} nama={m.nama} tersediaDiSmk={m.tersedia_di_smk} />
        ))}
      </Section>

      <Penafian />
    </>
  );
}

function HasilBelumTahu({ daftarProdi, onGanti }: { daftarProdi: Prodi[]; onGanti: () => void }) {
  const ids = daftarProdi.map((p) => p.id);
  const { data, isPending, isError } = useAgregasiMapelLintasProdi(ids);

  return (
    <>
      <BarisJudulHasil judul="Belum tahu prodi" onGanti={onGanti} />

      {isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : isError ? (
        <KeadaanGalat />
      ) : !data?.length ? (
        <KeadaanKosong />
      ) : (
        <HasilAgregasi agregat={data} totalProdi={daftarProdi.length} />
      )}
    </>
  );
}

// AC F3 (jalur "belum tahu prodi"): mapel yang paling sering jadi syarat
// lintas prodi, bukan halaman kosong yang menyuruh pengguna kembali nanti.
// Tetap wajib punya peringatan tidak-tersedia & penafian yang sama seperti
// jalur satu-prodi.
function HasilAgregasi({ agregat, totalProdi }: { agregat: MapelAgregat[]; totalProdi: number }) {
  const teratas = agregat.slice(0, 5);
  const tidakTersedia = teratas.filter((m) => !m.tersedia_di_smk);

  return (
    <>
      <Section style={styles.blok}>
        <Text style={styles.blokJudul}>Mapel paling sering dibutuhkan lintas prodi</Text>
        {teratas.map((m) => (
          <MapelBaris
            key={m.id}
            nama={m.nama}
            tersediaDiSmk={m.tersedia_di_smk}
            keterangan={`Dibutuhkan ${m.jumlahProdi} dari ${totalProdi} prodi`}
          />
        ))}
      </Section>

      <PeringatanTidakTersedia daftar={tidakTersedia} />

      <Penafian />
    </>
  );
}

function MapelBaris({
  nama,
  tersediaDiSmk,
  keterangan,
}: {
  nama: string;
  tersediaDiSmk: boolean;
  keterangan?: string;
}) {
  return (
    <Article style={styles.mapelBaris}>
      <Text style={styles.mapelNama}>{nama}</Text>
      <View style={styles.mapelStatusBaris}>
        <View style={[styles.titik, tersediaDiSmk ? styles.titikTersedia : styles.titikTidakTersedia]} />
        <Text style={styles.mapelStatus}>{keterangan ?? (tersediaDiSmk ? 'Tersedia di SMK' : 'Tidak tersedia di SMK')}</Text>
      </View>
    </Article>
  );
}

// Peringatan eksplisit — blok terpisah, warna biru redam (status-attention,
// BUKAN merah/oranye — lihat catatan di theme/tokens.ts), tidak pernah
// digabung diam-diam ke daftar "Mapel pendukung" di atas.
function PeringatanTidakTersedia({ daftar }: { daftar: { id: string; nama: string }[] }) {
  if (!daftar.length) return null;
  return (
    <Section style={styles.peringatan}>
      <Text style={styles.peringatanJudul}>Tidak tersedia di SMK</Text>
      {daftar.map((m) => (
        <Text key={m.id} style={styles.peringatanTeks}>
          {m.nama}
        </Text>
      ))}
    </Section>
  );
}

function Penafian() {
  return (
    <Section style={styles.penafian}>
      <Text style={styles.penafianTeks}>{PENAFIAN}</Text>
    </Section>
  );
}

const styles = StyleSheet.create({
  halaman: {
    padding: spacing.gutter,
    gap: spacing.s4,
  },
  judul: {
    color: color.textBody,
    fontSize: typography.size.h2,
    fontWeight: typography.weight.semibold,
    marginTop: 0,
    marginBottom: 0,
  },
  muat: {
    marginTop: spacing.s4,
  },
  prompt: {
    color: color.textBody,
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium,
  },
  opsiProdi: {
    padding: spacing.s4,
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    gap: spacing.s1,
  },
  opsiProdiNama: {
    color: color.textBody,
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  opsiProdiRumpun: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
  },
  opsiBelumTahu: {
    padding: spacing.s4,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.blue400,
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  opsiBelumTahuTeks: {
    color: color.blue600,
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
  },
  barisAtas: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  subjudul: {
    color: color.textBody,
    fontSize: typography.size.title,
    fontWeight: typography.weight.semibold,
  },
  tautanKembali: {
    color: color.textLink,
    fontSize: typography.size.bodySm,
    textDecorationLine: 'underline',
  },
  blok: {
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
    padding: spacing.s4,
    gap: spacing.s3,
  },
  blokJudul: {
    color: color.textBody,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.5,
  },
  mapelBaris: {
    gap: spacing.s1,
  },
  mapelNama: {
    color: color.textBody,
    fontSize: typography.size.body,
    fontWeight: typography.weight.semibold,
  },
  mapelStatusBaris: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s2,
  },
  titik: {
    width: 10,
    height: 10,
    borderRadius: radius.pill,
  },
  titikTersedia: {
    backgroundColor: color.statusOk,
  },
  titikTidakTersedia: {
    backgroundColor: color.blue500,
  },
  mapelStatus: {
    color: color.textMuted,
    fontSize: typography.size.caption,
  },
  peringatan: {
    borderRadius: radius.md,
    backgroundColor: color.surfaceSoft,
    borderLeftWidth: 4,
    borderLeftColor: color.blue500,
    padding: spacing.s4,
    gap: spacing.s1,
  },
  peringatanJudul: {
    color: color.blue600,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.bold,
  },
  peringatanTeks: {
    color: color.textBody,
    fontSize: typography.size.body,
  },
  penafian: {
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: color.borderSoft,
    padding: spacing.s4,
  },
  penafianTeks: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
    fontStyle: 'italic',
  },
});
