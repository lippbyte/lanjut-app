import dataRilisJson from '../data/releases.json';
import { Kerangka } from '../komponen/Kerangka';
import { rilisTerbaru, type DataRilis } from '../lib/rilis';
import { Ajakan } from './beranda/Ajakan';
import { Faq } from './beranda/Faq';
import { Fitur } from './beranda/Fitur';
import { Hero } from './beranda/Hero';
import { KenapaSmk } from './beranda/KenapaSmk';
import { Langkah } from './beranda/Langkah';
import { Masalah } from './beranda/Masalah';
import { Penutup } from './beranda/Penutup';
import { Solusi } from './beranda/Solusi';
import { Tentang } from './beranda/Tentang';
import type { PropsHalaman } from './jenis';

// Beranda mengikuti acuan design/reference-landing.png (hero sampai "Langkah kecil"), lalu seksi
// yang belum ada di acuan: Kenapa SMK?, Solusi, Fitur, FAQ, dan penutup. Urutannya sama dengan
// navbar (Tentang, Kenapa SMK?, Solusi, Fitur, FAQ). Teks DRAF.
export default function Beranda({ jalur, akar }: PropsHalaman) {
  const terbaru = rilisTerbaru(dataRilisJson as DataRilis);
  return (
    <Kerangka jalur={jalur} akar={akar} varian="merek">
      <Hero />
      <Masalah />
      <Ajakan />
      <Tentang />
      <Langkah />
      <KenapaSmk />
      <Solusi />
      <Fitur />
      <Faq />
      <Penutup terbaru={terbaru} />
    </Kerangka>
  );
}
