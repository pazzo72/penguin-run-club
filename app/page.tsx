'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Storia from '@/components/Storia';
import Manifesto from '@/components/Manifesto';
import Valori from '@/components/Valori';
import Run from '@/components/Run';
import Community from '@/components/Community';
import Contatti from '@/components/Contatti';
import Footer from '@/components/Footer';

const PenguinCanvas1 = dynamic(() => import('@/components/PenguinCanvas1'), {
  ssr: false,
  loading: () => <div style={{ height: '500vh', background: '#F0F4F7' }} />,
});
const PenguinCanvas2 = dynamic(() => import('@/components/PenguinCanvas2'), {
  ssr: false,
  loading: () => <div style={{ height: '500vh', background: '#F0F4F7' }} />,
});

export default function Home() {
  const [preloadCanvas2, setPreloadCanvas2] = useState(false);

  return (
    <>
      <Navbar />
      <main>
        <PenguinCanvas1 onHalfway={() => setPreloadCanvas2(true)} />
        <Storia />
        <Manifesto />
        <Valori />
        <PenguinCanvas2 shouldPreload={preloadCanvas2} />
        <Run />
        <Community />
        <Contatti />
      </main>
      <Footer />
    </>
  );
}
