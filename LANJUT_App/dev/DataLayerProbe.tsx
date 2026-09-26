import React, { useEffect } from 'react';

import { useButirDaftarPeriksa } from '../hooks/useButirDaftarPeriksa';
import { useButirKhususSmk } from '../hooks/useButirKhususSmk';
import { useCeritaAlumni } from '../hooks/useCeritaAlumni';
import { useKemajuan } from '../hooks/useKemajuan';
import { useMapel } from '../hooks/useMapel';
import { useProdi } from '../hooks/useProdi';
import { useProdiMapel } from '../hooks/useProdiMapel';
import { useTahapanLinimasa } from '../hooks/useTahapanLinimasa';

/**
 * Komponen TANPA tampilan (return null) — satu-satunya tugasnya memanggil
 * kedelapan hook dan `console.log` hasilnya begitu data datang, supaya bisa
 * diverifikasi lewat log Metro bahwa tiap hook betul mengambil data asli
 * dari database, TANPA merender apa pun ke layar (sesuai instruksi tugas).
 * Dipasang di app/_layout.tsx, hanya saat `__DEV__` — lihat pemanggilannya.
 *
 * `useProdiMapel` dan `useKemajuan` butuh parameter (prodiId, token sesi)
 * yang kerangka ini belum punya sumbernya (belum ada UI pilih-prodi F3
 * maupun alur login). Keduanya tetap dipanggil eksplisit dengan
 * `undefined` — BUKAN dihapus diam-diam — supaya log di bawah menyatakan
 * jelas dua entitas ini belum bisa diverifikasi dan kenapa, bukan terlihat
 * seperti lupa dikerjakan.
 */
export function DataLayerProbe() {
  const linimasa = useTahapanLinimasa();
  const khususSmk = useButirKhususSmk();
  const prodi = useProdi();
  const mapel = useMapel();
  const prodiMapel = useProdiMapel(undefined); // TODO: isi prodiId setelah F3 punya UI pilih prodi
  const ceritaAlumni = useCeritaAlumni();
  const daftarPeriksa = useButirDaftarPeriksa();
  const kemajuan = useKemajuan(undefined); // TODO: isi token sesi setelah alur login ada

  useEffect(() => {
    if (linimasa.data) console.log('[probe] tahapan_linimasa <-', linimasa.data);
    if (linimasa.error) console.warn('[probe] tahapan_linimasa GAGAL:', linimasa.error);
  }, [linimasa.data, linimasa.error]);

  useEffect(() => {
    if (khususSmk.data) console.log('[probe] butir_khusus_smk <-', khususSmk.data);
    if (khususSmk.error) console.warn('[probe] butir_khusus_smk GAGAL:', khususSmk.error);
  }, [khususSmk.data, khususSmk.error]);

  useEffect(() => {
    if (prodi.data) console.log('[probe] prodi <-', prodi.data);
    if (prodi.error) console.warn('[probe] prodi GAGAL:', prodi.error);
  }, [prodi.data, prodi.error]);

  useEffect(() => {
    if (mapel.data) console.log('[probe] mapel <-', mapel.data);
    if (mapel.error) console.warn('[probe] mapel GAGAL:', mapel.error);
  }, [mapel.data, mapel.error]);

  useEffect(() => {
    if (prodiMapel.data) console.log('[probe] prodi_mapel <-', prodiMapel.data);
    if (prodiMapel.error) console.warn('[probe] prodi_mapel GAGAL:', prodiMapel.error);
  }, [prodiMapel.data, prodiMapel.error]);

  useEffect(() => {
    if (ceritaAlumni.data) console.log('[probe] cerita_alumni <-', ceritaAlumni.data);
    if (ceritaAlumni.error) console.warn('[probe] cerita_alumni GAGAL:', ceritaAlumni.error);
  }, [ceritaAlumni.data, ceritaAlumni.error]);

  useEffect(() => {
    if (daftarPeriksa.data) console.log('[probe] butir_daftar_periksa <-', daftarPeriksa.data);
    if (daftarPeriksa.error) console.warn('[probe] butir_daftar_periksa GAGAL:', daftarPeriksa.error);
  }, [daftarPeriksa.data, daftarPeriksa.error]);

  useEffect(() => {
    console.log('[probe] kemajuan: dilewati sengaja — enabled=false, belum ada token sesi (belum ada alur login)');
  }, []);
  useEffect(() => {
    if (kemajuan.data) console.log('[probe] kemajuan <-', kemajuan.data);
    if (kemajuan.error) console.warn('[probe] kemajuan GAGAL:', kemajuan.error);
  }, [kemajuan.data, kemajuan.error]);

  return null;
}
