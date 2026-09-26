import React from 'react';
import { Redirect, Slot } from 'expo-router';

import { LayarMemuat } from '../../components/layout/LayarMemuat';
import { useSesi } from '../../providers/AuthProvider';

// Masuk/Daftar hanya untuk yang belum masuk; begitu sesi terbentuk (login atau daftar
// sukses), layout ini yang memindahkan pengguna ke Linimasa.
export default function AuthGroupLayout() {
  const { status } = useSesi();
  if (status === 'memuat') return <LayarMemuat />;
  if (status === 'masuk') return <Redirect href="/linimasa" />;
  return <Slot />;
}
