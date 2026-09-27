import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { pesanUntuk, type DataUbahProfil, type Pengguna } from '../../api/auth';
import { ApiError } from '../../api/client';
import { useSesi } from '../../providers/AuthProvider';
import { useProdi } from '../../hooks/useProdi';
import { useProgresDaftarPeriksa, useSaringDaftarPeriksa } from '../../hooks/useProgresDaftarPeriksa';
import { useUbahProfil } from '../../hooks/useUbahProfil';
import { color, font, spacing, teks } from '../../theme/tokens';
import { BilahProgres, Kartu, Memuat, Penafian, SeksiJudul, Tombol, gaya } from '../ui';
import { BELUM, DaftarOpsi, Field, Input, OpsiPil, PesanGalat, PilihProdi } from './auth/AuthUI';

// "Jalur Saya" (v1.1, LANJUT_004) di atas padanan MVP-PWA/akun.html
// (keadaan "sudah masuk"). Keadaan tamu tidak ada di sini karena layar ini
// hanya bisa dibuka setelah login. Semua isi dibaca dari `pengguna` di
// AuthProvider — hasil GET /auth/saya milik akun yang sedang masuk.
export function AkunScreen() {
  const { pengguna, keluar } = useSesi();
  const [proses, setProses] = useState(false);

  const onKeluar = async () => {
    setProses(true);
    await keluar();
  };

  if (!pengguna) return null;

  return (
    <View style={gaya.layarIsiRapat}>
      {/* key: formulir yang setengah diisi tidak terbawa ke akun lain. */}
      <KartuJalur key={pengguna.id} pengguna={pengguna} />

      <SeksiJudul>Kemajuan</SeksiJudul>
      <RingkasanKemajuan />

      <SeksiJudul>Akun</SeksiJudul>
      <Kartu>
        <View style={s.daftar}>
          <Baris label="Nama pengguna" nilai={pengguna.nama_pengguna} />
          <Baris label="Email" nilai={pengguna.email || '—'} />
        </View>
      </Kartu>
      <Penafian>Catatan yang sudah tersimpan ke akunmu tetap ada setelah keluar.</Penafian>
      <Tombol label={proses ? 'Mengeluarkan…' : 'Keluar'} varian="garis" besar penuh proses={proses} onPress={onKeluar} />
    </View>
  );
}

function KartuJalur({ pengguna }: { pengguna: Pengguna }) {
  const { data: daftarProdi } = useProdi();
  const [ubah, setUbah] = useState(false);
  const namaProdi = pengguna.prodi_impian
    ? (daftarProdi?.find((p) => p.id === pengguna.prodi_impian)?.nama ?? pengguna.prodi_impian)
    : null;

  if (ubah) return <FormJalur pengguna={pengguna} onSelesai={() => setUbah(false)} />;

  return (
    <Kartu>
      <Text style={s.eyebrow}>Jalur Saya</Text>
      <Text style={s.nama}>{pengguna.nama_tampilan}</Text>
      <View style={s.daftar}>
        <Baris label="Kelas" nilai={pengguna.kelas ? `Kelas ${pengguna.kelas}` : null} />
        <Baris label="Target prodi" nilai={namaProdi} />
      </View>
      <View style={s.aksi}>
        <Tombol
          label={namaProdi && pengguna.kelas ? 'Ubah' : 'Lengkapi jalurmu'}
          varian="garis"
          kecil
          onPress={() => setUbah(true)}
        />
      </View>
    </Kartu>
  );
}

const KELAS_OPSI = ['10', '11', '12'] as const;
type Kelas = (typeof KELAS_OPSI)[number];

// Menyimpan ke PATCH /pengguna/saya. Validasi di sini hanya yang paling
// jelas (nama kosong/terlalu panjang); server tetap sumber kebenaran.
function FormJalur({ pengguna, onSelesai }: { pengguna: Pengguna; onSelesai: () => void }) {
  const simpan = useUbahProfil();
  const { pilih: setSaringan } = useSaringDaftarPeriksa();
  const [nama, setNama] = useState(pengguna.nama_tampilan);
  const [kelas, setKelas] = useState<Kelas | null>(pengguna.kelas);
  const [prodi, setProdi] = useState<string>(pengguna.prodi_impian ?? BELUM);
  const [galatNama, setGalatNama] = useState<string | null>(null);

  const kirim = () => {
    const namaBersih = nama.trim();
    if (!namaBersih) return setGalatNama('Nama tampilan belum diisi.');
    if (namaBersih.length > 60) return setGalatNama('Nama tampilan maksimal 60 karakter.');
    setGalatNama(null);

    // Hanya medan yang berubah yang dikirim.
    const data: DataUbahProfil = {};
    const prodiBaru = prodi === BELUM ? null : prodi;
    if (namaBersih !== pengguna.nama_tampilan) data.nama_tampilan = namaBersih;
    if (kelas !== pengguna.kelas) data.kelas = kelas;
    if (prodiBaru !== pengguna.prodi_impian) data.prodi_impian = prodiBaru;
    if (!Object.keys(data).length) return onSelesai();

    simpan.mutate(data, {
      onSuccess: () => {
        // Kelas di perangkat mengalahkan kelas akun di Daftar Periksa, jadi
        // ikut diganti supaya saringannya mengikuti kelas yang baru disimpan.
        if (data.kelas) setSaringan({ kelas: data.kelas });
        onSelesai();
      },
    });
  };

  const medan = simpan.error instanceof ApiError ? simpan.error.medan : undefined;

  return (
    <Kartu style={s.form}>
      <Text style={s.eyebrow}>Ubah Jalur Saya</Text>
      <Field label="Nama tampilan" galat={galatNama ?? medan?.nama_tampilan}>
        <Input
          value={nama}
          onChangeText={(v) => {
            setNama(v);
            setGalatNama(null);
          }}
          maxLength={60}
          autoCapitalize="words"
        />
      </Field>
      <Field label="Kelas" galat={medan?.kelas}>
        <DaftarOpsi>
          {KELAS_OPSI.map((k) => (
            <OpsiPil key={k} label={`Kelas ${k}`} aktif={kelas === k} onPress={() => setKelas(k)} />
          ))}
        </DaftarOpsi>
      </Field>
      <Field label="Target prodi" hint="Boleh dijawab “belum”." galat={medan?.prodi_impian}>
        <PilihProdi nilai={prodi} onPilih={setProdi} />
      </Field>
      <PesanGalat teks={simpan.isError ? pesanUntuk(simpan.error) : null} />
      <View style={s.aksiForm}>
        <Tombol label="Batal" varian="hantu" onPress={onSelesai} />
        <Tombol label={simpan.isPending ? 'Menyimpan…' : 'Simpan'} proses={simpan.isPending} onPress={kirim} />
      </View>
    </Kartu>
  );
}

// X dari Y memakai saringan & hitungan yang sama dengan layar Daftar
// Periksa (useProgresDaftarPeriksa), jadi angkanya selalu cocok.
function RingkasanKemajuan() {
  const router = useRouter();
  const { kelas, jalur, isPending: saringMemuat } = useSaringDaftarPeriksa();
  const hasil = useProgresDaftarPeriksa(kelas, jalur);
  const bukaDaftarPeriksa = () => router.push('/daftar-periksa');

  let isi: React.ReactNode;
  if (saringMemuat || hasil.isPending) {
    isi = <Memuat />;
  } else if (!hasil.siap) {
    isi = <Text style={gaya.teksKecil}>Pilih kelas dan jalurmu di Daftar Periksa untuk melihat kemajuanmu.</Text>;
  } else if (hasil.isError || !hasil.data) {
    isi = <Text style={gaya.teksKecil}>Kemajuan belum bisa dimuat. Coba lagi sebentar lagi.</Text>;
  } else {
    const { selesai, total } = hasil.data.progres;
    isi = (
      <>
        <Text style={s.angka}>
          {selesai} dari {total} langkah Daftar Periksa selesai
        </Text>
        <BilahProgres selesai={selesai} total={total} label="Kemajuan daftar periksa" />
        <Text style={s.label}>
          Kelas {kelas} · {jalur}
        </Text>
      </>
    );
  }

  return (
    <Kartu style={s.kemajuan}>
      {isi}
      <Tombol label="Buka Daftar Periksa" varian="sekunder" kecil onPress={bukaDaftarPeriksa} />
    </Kartu>
  );
}

/** `nilai` null → "Belum diisi" dengan gaya redup, bukan teks kosong. */
function Baris({ label, nilai }: { label: string; nilai: string | null }) {
  return (
    <View style={s.baris}>
      <Text style={s.label}>{label}</Text>
      <Text style={nilai ? s.nilai : s.nilaiKosong} numberOfLines={2}>
        {nilai ?? 'Belum diisi'}
      </Text>
    </View>
  );
}

const s = StyleSheet.create({
  // .eyebrow
  eyebrow: { ...teks.label, color: color.blue600 },
  nama: { ...teks.h3, color: color.textBody, marginTop: spacing.s1 },
  daftar: { gap: spacing.s3, marginTop: spacing.s4 },
  baris: { flexDirection: 'row', justifyContent: 'space-between', gap: spacing.s3 },
  label: { ...teks.caption, color: color.textMuted },
  nilai: { ...teks.bodySm, fontFamily: font.medium, color: color.textBody, flexShrink: 1, textAlign: 'right' },
  kemajuan: { gap: spacing.s3 },
  aksi: { flexDirection: 'row', marginTop: spacing.s4 },
  form: { gap: spacing.s4 },
  aksiForm: { flexDirection: 'row', justifyContent: 'flex-end', gap: spacing.s2 },
  angka: { ...teks.body, fontFamily: font.semibold, color: color.textBody },
  nilaiKosong: { ...teks.bodySm, color: color.textMuted, flexShrink: 1, textAlign: 'right' },
});
