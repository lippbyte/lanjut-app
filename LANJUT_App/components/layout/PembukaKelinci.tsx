import React, { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Image, Platform, StyleSheet, View } from 'react-native';

import {
  AMBANG_MENGAMBANG_PX,
  DURASI_KELUAR_MS,
  DURASI_KELUAR_TANPA_GERAK_MS,
  DURASI_MASUK_MS,
  DURASI_MENGAMBANG_MS,
  GESER_AWAL_PX,
  SKALA_AWAL,
  sisaSebelumTutup,
} from '../../lib/pembuka';
import { useSesi } from '../../providers/AuthProvider';
import { color } from '../../theme/tokens';

// Animated di web tidak punya native driver; di Android/iOS animasi jalan di thread native.
const NATIVE = Platform.OS !== 'web';

/**
 * Layar pembuka tipis dengan kelinci LANJUT (lib/pembuka.ts). Dipasang SEKALI di root layout,
 * di atas semua layar, lalu dilepas sesudah memudar keluar. Hiasan saja: disembunyikan dari
 * pembaca layar dan tidak menahan app lebih dari MAKS_TAMPIL_MS.
 * `siap`: huruf sudah termuat dan sesi selesai dipulihkan.
 */
export function PembukaKelinci({ siap }: { siap: boolean }) {
  const [selesai, setSelesai] = useState(false);
  const [tanpaGerak, setTanpaGerak] = useState(false);
  const mulai = useRef(Date.now()).current;
  const tampak = useRef(new Animated.Value(0)).current; // kelinci: 0 → 1
  const skala = useRef(new Animated.Value(SKALA_AWAL)).current;
  const geser = useRef(new Animated.Value(GESER_AWAL_PX)).current;
  const layar = useRef(new Animated.Value(1)).current; // seluruh layar pembuka: 1 → 0
  const ambang = useRef(new Animated.Value(0)).current;
  const naik = useRef(Animated.add(geser, ambang)).current;
  const menutup = useRef(false);

  // "Kurangi gerakan" di perangkat → tanpa membesar/mengambang.
  useEffect(() => {
    let hidup = true;
    AccessibilityInfo.isReduceMotionEnabled?.()
      .then((v) => hidup && setTanpaGerak(!!v))
      .catch(() => {});
    return () => {
      hidup = false;
    };
  }, []);

  // Masuk, lalu mengambang pelan selama app masih memuat. Berhenti begitu selesai.
  useEffect(() => {
    if (selesai) return;
    if (tanpaGerak) {
      tampak.setValue(1);
      skala.setValue(1);
      geser.setValue(0);
      return;
    }
    const masuk = Animated.parallel([
      Animated.timing(tampak, { toValue: 1, duration: DURASI_MASUK_MS, easing: Easing.out(Easing.cubic), useNativeDriver: NATIVE }),
      Animated.timing(skala, { toValue: 1, duration: DURASI_MASUK_MS + 100, easing: Easing.out(Easing.cubic), useNativeDriver: NATIVE }),
      Animated.timing(geser, { toValue: 0, duration: DURASI_MASUK_MS + 100, easing: Easing.out(Easing.cubic), useNativeDriver: NATIVE }),
    ]);
    const mengambang = Animated.loop(
      Animated.sequence([
        Animated.timing(ambang, { toValue: -AMBANG_MENGAMBANG_PX, duration: DURASI_MENGAMBANG_MS / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: NATIVE }),
        Animated.timing(ambang, { toValue: 0, duration: DURASI_MENGAMBANG_MS / 2, easing: Easing.inOut(Easing.sin), useNativeDriver: NATIVE }),
      ])
    );
    masuk.start(() => mengambang.start());
    return () => {
      masuk.stop();
      mengambang.stop();
    };
  }, [selesai, tanpaGerak, tampak, skala, geser, ambang]);

  // Keluar begitu boleh (siap + minimum tampil), atau paling lama MAKS_TAMPIL_MS.
  // Hanya sekali: perubahan `siap` di tengah pudar keluar tidak memulai ulang pudarnya.
  useEffect(() => {
    if (menutup.current) return;
    const t = setTimeout(() => {
      menutup.current = true;
      Animated.timing(layar, {
        toValue: 0,
        duration: tanpaGerak ? DURASI_KELUAR_TANPA_GERAK_MS : DURASI_KELUAR_MS,
        easing: Easing.in(Easing.quad),
        useNativeDriver: NATIVE,
      }).start(() => setSelesai(true));
    }, sisaSebelumTutup(siap, Date.now() - mulai));
    return () => clearTimeout(t);
  }, [siap, tanpaGerak, layar, mulai]);

  if (selesai) return null;
  return (
    <Animated.View
      style={[StyleSheet.absoluteFill, s.layar, { opacity: layar }]}
      pointerEvents="none"
      aria-hidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={s.tengah}>
        <Animated.View style={{ opacity: tampak, transform: [{ translateY: naik }, { scale: skala }] }}>
          <Image source={require('../../assets/maskot-ai-biru.png')} style={s.kelinci} resizeMode="contain" accessible={false} />
        </Animated.View>
        <Animated.View style={{ opacity: tampak }}>
          <Image source={require('../../assets/lanjut-wordmark.png')} style={s.wordmark} resizeMode="contain" accessible={false} />
        </Animated.View>
      </View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  layar: { backgroundColor: color.surfacePage, zIndex: 1000, elevation: 1000 },
  tengah: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  kelinci: { width: 112, height: 112 },
  wordmark: { width: 120, height: 41 }, // berkas 1920×660
});

/** Melapor ke root layout begitu sesi selesai dipulihkan (status bukan lagi 'memuat'). */
export function TandaSesiSiap({ onSiap }: { onSiap: (siap: boolean) => void }) {
  const { status } = useSesi();
  useEffect(() => {
    if (status !== 'memuat') onSiap(true);
  }, [status, onSiap]);
  return null;
}
