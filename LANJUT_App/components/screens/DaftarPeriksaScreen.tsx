import React, { useState } from 'react';
import { Article, H1, Section } from '@expo/html-elements';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

import type { ButirDaftarPeriksa, DaftarPeriksaResponse } from '../../api/types';
import { useButirDaftarPeriksa } from '../../hooks/useButirDaftarPeriksa';
import { useKemajuanLokal, useToggleKemajuanLokal } from '../../hooks/useKemajuanLokal';
import { useProfilLokal, useSetProfilLokal, type ProfilLokal } from '../../hooks/useProfilLokal';
import { hitungProgres, type StatusProgres } from '../../lib/daftarPeriksa';
import { color, radius, spacing, typography } from '../../theme/tokens';
import { KeadaanGalat, KeadaanKosong } from './KeadaanBersama';

/**
 * F5 — Daftar Periksa (docs/prd-sdd-lanjut.md Bagian 6 & 13; teks statis
 * persis docs/salinan-teks-lanjut.md §4.4 — tidak ada kalimat baru ditulis
 * di sini).
 *
 * CATATAN PENYIMPANGAN (disepakati dengan pengguna sebelum dikerjakan):
 * LANJUT_App belum punya alur login sama sekali (lihat hooks/useKemajuan.ts,
 * hooks/useProfilLokal.ts). Karena itu:
 *  - Kelas & jalur pengguna diambil dari `useProfilLokal` (AsyncStorage,
 *    device-local), BUKAN dari sesi akun seperti PWA v1.
 *  - Progres centang diambil dari `useKemajuanLokal` (AsyncStorage), BUKAN
 *    ditulis ke tabel `kemajuan` lewat `/kemajuan` (endpoint itu dijaga
 *    `wajibLogin` — tidak bisa dipanggil tanpa token sesi).
 * Penyaringan `berlaku_untuk_kelas`/`berlaku_untuk_jalur` ITU SENDIRI tetap
 * memakai mekanisme yang sudah ada (query `?kelas=&jalur=` di
 * useButirDaftarPeriksa, disaring backend lewat FIND_IN_SET) — tidak ada
 * logika penyaringan baru ditulis di sini.
 */
export function DaftarPeriksaScreen() {
  const profilQuery = useProfilLokal();
  // "Kembali" dari Checklist wajib menampilkan pemilih lagi walau profil
  // tersimpan sudah lengkap — state terpisah dari AsyncStorage ini yang
  // menentukan itu (refetch saja tidak cukup, karena nilai tersimpannya
  // tidak berubah).
  const [paksaPilihUlang, setPaksaPilihUlang] = useState(false);

  const profil = profilQuery.data;
  const profilLengkap = !!profil?.kelas && !!profil?.jalur;

  return (
    <Section style={styles.halaman}>
      <H1 style={styles.judul}>Daftar Periksa</H1>
      <Text style={styles.pendamping}>Satu per satu, tidak perlu sekaligus.</Text>

      {profilQuery.isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : !profilLengkap || paksaPilihUlang ? (
        <PemilihProfil profilAwal={profil} onSelesai={() => setPaksaPilihUlang(false)} />
      ) : (
        <Checklist kelas={profil!.kelas!} jalur={profil!.jalur!} onGantiProfil={() => setPaksaPilihUlang(true)} />
      )}
    </Section>
  );
}

const KELAS_OPSI = ['10', '11', '12'] as const;
const JALUR_OPSI = ['TKA', 'SNBP', 'SNBT'] as const;

// "Kamu kelas berapa?" — kutipan persis salinan-teks-lanjut.md §3
// (Pertanyaan pembuka setelah onboarding), dipakai lagi di sini karena
// pertanyaannya sama, bukan disusun ulang. Tidak ada teks resmi untuk
// pertanyaan pemilihan jalur di salinan-teks-lanjut.md maupun
// prd-sdd-lanjut.md — label "Jalur" di bawah adalah nama kolom
// (berlaku_untuk_jalur), bukan kalimat baru.
function PemilihProfil({
  profilAwal,
  onSelesai,
}: {
  profilAwal: ProfilLokal | undefined;
  onSelesai: () => void;
}) {
  const [kelas, setKelas] = useState<string | null>(profilAwal?.kelas ?? null);
  const [jalur, setJalur] = useState<string | null>(profilAwal?.jalur ?? null);
  const { mutate: simpanProfil } = useSetProfilLokal();

  // Disimpan & langsung diterapkan begitu KEDUA nilai ada — dipicu dari
  // handler tap (bukan dari useEffect atas [kelas, jalur]), supaya
  // membuka pemilih ini lewat "Kembali" saat profil lama sudah lengkap
  // tidak langsung melompat balik ke Checklist sebelum pengguna menyentuh
  // apa pun.
  function pilihKelas(k: string) {
    setKelas(k);
    if (jalur) terapkan(k, jalur);
  }
  function pilihJalur(j: string) {
    setJalur(j);
    if (kelas) terapkan(kelas, j);
  }
  function terapkan(k: string, j: string) {
    simpanProfil({ kelas: k, jalur: j });
    onSelesai();
  }

  return (
    <>
      <Text style={styles.prompt}>Kamu kelas berapa?</Text>
      <View style={styles.chipBaris}>
        {KELAS_OPSI.map((k) => (
          <Pressable key={k} onPress={() => pilihKelas(k)} style={[styles.chip, kelas === k && styles.chipAktif]}>
            <Text style={[styles.chipTeks, kelas === k && styles.chipTeksAktif]}>Kelas {k}</Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.prompt}>Jalur</Text>
      <View style={styles.chipBaris}>
        {JALUR_OPSI.map((j) => (
          <Pressable key={j} onPress={() => pilihJalur(j)} style={[styles.chip, jalur === j && styles.chipAktif]}>
            <Text style={[styles.chipTeks, jalur === j && styles.chipTeksAktif]}>{j}</Text>
          </Pressable>
        ))}
      </View>
    </>
  );
}

function Checklist({
  kelas,
  jalur,
  onGantiProfil,
}: {
  kelas: string;
  jalur: string;
  onGantiProfil: () => void;
}) {
  const butirQuery = useButirDaftarPeriksa({ kelas, jalur });
  const kemajuanQuery = useKemajuanLokal();
  const toggle = useToggleKemajuanLokal();

  return (
    <>
      <View style={styles.barisAtas}>
        <Text style={styles.subjudul}>
          Kelas {kelas} · {jalur}
        </Text>
        <Pressable onPress={onGantiProfil}>
          <Text style={styles.tautanKembali}>Kembali</Text>
        </Pressable>
      </View>

      {butirQuery.isPending || kemajuanQuery.isPending ? (
        <ActivityIndicator style={styles.muat} color={color.blue500} />
      ) : butirQuery.isError || kemajuanQuery.isError ? (
        <KeadaanGalat />
      ) : !butirQuery.data?.kategori.length ? (
        <KeadaanKosong />
      ) : (
        <HasilChecklist
          data={butirQuery.data}
          selesaiIds={new Set(Object.keys(kemajuanQuery.data ?? {}))}
          onToggle={(id) => toggle.mutate(id)}
        />
      )}
    </>
  );
}

function HasilChecklist({
  data,
  selesaiIds,
  onToggle,
}: {
  data: DaftarPeriksaResponse;
  selesaiIds: ReadonlySet<string>;
  onToggle: (butirId: string) => void;
}) {
  const progres = hitungProgres(data.kategori, selesaiIds);

  return (
    <>
      <ProgresBanner status={progres.status} selesai={progres.selesai} total={progres.total} />
      {data.kategori.map((k) => (
        <Section key={k.id} style={styles.kategoriBlok}>
          <Text style={styles.kategoriJudul}>{k.nama}</Text>
          {k.butir.map((b) => (
            <ButirChecklist key={b.id} butir={b} selesai={selesaiIds.has(b.id)} onToggle={() => onToggle(b.id)} />
          ))}
        </Section>
      ))}
    </>
  );
}

// Tiga state persis salinan-teks-lanjut.md §4.4 — X/Y pada state "berjalan"
// dihitung dari data asli (lib/daftarPeriksa.ts `hitungProgres`), bukan
// angka tetap "3 dari 11" yang tertulis di dokumen sebagai contoh.
function ProgresBanner({
  status,
  selesai,
  total,
}: {
  status: StatusProgres;
  selesai: number;
  total: number;
}) {
  return (
    <Section style={styles.progres}>
      {status === 'kosong' ? (
        <Text style={styles.progresTeks}>
          Belum ada yang dicentang — itu wajar kalau baru mulai. Ambil satu yang paling gampang dulu.
        </Text>
      ) : status === 'selesai' ? (
        <Text style={styles.progresTeks}>Bagian persiapannya beres. Sisanya tinggal latihan.</Text>
      ) : (
        <Text style={styles.progresTeks}>
          {selesai} dari {total} beres. Jalan terus.
        </Text>
      )}
    </Section>
  );
}

function ButirChecklist({
  butir,
  selesai,
  onToggle,
}: {
  butir: ButirDaftarPeriksa;
  selesai: boolean;
  onToggle: () => void;
}) {
  return (
    <Article style={styles.butir}>
      <Pressable
        onPress={onToggle}
        style={styles.butirBaris}
        accessibilityRole="checkbox"
        accessibilityState={{ checked: selesai }}
      >
        <View style={[styles.kotak, selesai && styles.kotakCentang]}>
          {selesai && <Text style={styles.centangTanda}>✓</Text>}
        </View>
        <Text style={[styles.butirJudul, selesai && styles.butirJudulSelesai]}>{butir.judul}</Text>
      </Pressable>
    </Article>
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
  pendamping: {
    color: color.textMuted,
    fontSize: typography.size.body,
    marginTop: -spacing.s3,
  },
  muat: {
    marginTop: spacing.s4,
  },
  prompt: {
    color: color.textBody,
    fontSize: typography.size.body,
    fontWeight: typography.weight.medium,
  },
  chipBaris: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.s2,
  },
  chip: {
    paddingVertical: spacing.s2,
    paddingHorizontal: spacing.s4,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: color.borderSoft,
    backgroundColor: color.surfaceCard,
  },
  chipAktif: {
    backgroundColor: color.blue500,
    borderColor: color.blue500,
  },
  chipTeks: {
    color: color.textBody,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.semibold,
  },
  chipTeksAktif: {
    color: color.textOnBrand,
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
  progres: {
    padding: spacing.s4,
    borderRadius: radius.lg,
    backgroundColor: color.blue600,
  },
  progresTeks: {
    color: color.textOnBrand,
    fontSize: typography.size.body,
    lineHeight: 22,
    fontWeight: typography.weight.medium,
  },
  kategoriBlok: {
    gap: spacing.s2,
  },
  kategoriJudul: {
    color: color.textMuted,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.bold,
    letterSpacing: 0.5,
  },
  butir: {
    borderRadius: radius.md,
    backgroundColor: color.surfaceCard,
    borderWidth: 1,
    borderColor: color.borderHairline,
  },
  butirBaris: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s3,
    padding: spacing.s4,
  },
  kotak: {
    width: 24,
    height: 24,
    borderRadius: radius.xs,
    borderWidth: 2,
    borderColor: color.borderSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  kotakCentang: {
    backgroundColor: color.statusOk,
    borderColor: color.statusOk,
  },
  centangTanda: {
    color: color.textOnBrand,
    fontSize: typography.size.bodySm,
    fontWeight: typography.weight.bold,
  },
  butirJudul: {
    flex: 1,
    color: color.textBody,
    fontSize: typography.size.body,
  },
  butirJudulSelesai: {
    color: color.textMuted,
    textDecorationLine: 'line-through',
  },
});
