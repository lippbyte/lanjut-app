import React, { useState } from 'react';
import { Article } from '@expo/html-elements';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import type { ButirKhususSmk } from '../../api/types';
import { useButirKhususSmk } from '../../hooks/useButirKhususSmk';
import { butirBerpasangan } from '../../lib/khususSmk';
import { formatTanggal } from '../../lib/linimasa';
import { color, font, radius, spacing, teks } from '../../theme/tokens';
import { Ikon, Kartu, KeadaanGalat, Kepala, Kosong, Memuat, Sumber, gaya } from '../ui';

/**
 * F2 — padanan MVP-PWA/khusus-smk.html: kartu buka-tutup (yang pertama
 * terbuka), tiap butir berpasangan "apa yang berbeda" + "apa yang bisa
 * dilakukan". Butir tanpa pasangan lengkap disaring di lib/khususSmk.ts.
 */
export function KhususSmkScreen() {
  const { data, isPending, isError } = useButirKhususSmk();

  return (
    <View style={gaya.layarIsiRapat}>
      <Kepala judul="Khusus SMK" pengantar="Hal-hal yang memang beda buat kita." />
      <Text style={gaya.teksBody}>
        Sebagian aturan seleksi menganggap semua pendaftar berasal dari SMA. Halaman ini merangkum bagian
        yang tidak berlaku sama untuk kita — dan apa yang bisa dilakukan.
      </Text>

      {isPending ? <Memuat /> : isError ? <KeadaanGalat /> : <Isi data={data} />}
    </View>
  );
}

function Isi({ data }: { data: ButirKhususSmk[] | undefined }) {
  const butir = butirBerpasangan(data ?? []);
  const [terbuka, setTerbuka] = useState<Set<string>>(() => new Set(butir[0] ? [butir[0].id] : []));

  if (!butir.length) {
    return <Kosong judul="Bagian ini masih kami siapkan." teks="Kalau kamu punya bahannya, kirim ke kami." />;
  }

  const alih = (id: string) =>
    setTerbuka((lama) => {
      const baru = new Set(lama);
      if (baru.has(id)) baru.delete(id);
      else baru.add(id);
      return baru;
    });

  return (
    <View style={s.daftar}>
      {butir.map((b) => (
        <ButirKartu key={b.id} butir={b} buka={terbuka.has(b.id)} onAlih={() => alih(b.id)} />
      ))}
    </View>
  );
}

// Lembaga sumber ditentukan dari domain url_sumber, seperti app.js PWA.
function lembagaSumber(url: string) {
  return url.includes('vokasi.kemdikbud.go.id') ? 'Direktorat SMK, Kemendikdasmen' : 'laman resmi SNPMB';
}

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
