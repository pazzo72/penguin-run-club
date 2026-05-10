'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform, useMotionValueEvent, motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FINAL_TEXT = 'BE THE PENGUIN';
const FINAL_LETTERS = FINAL_TEXT.split('');

const frameSrc = (i: number) =>
  `/ANIMAZIONE 1/frame_${String(i).padStart(3, '0')}_delay-0.041s.jpg`;

interface Props {
  onHalfway?: () => void;
}

export default function PenguinCanvas1({ onHalfway }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    Array.from({ length: TOTAL_FRAMES }, () => null)
  );

  const [loadProgress, setLoadProgress] = useState(0);
  const [allLoaded, setAllLoaded] = useState(false);
  const [loaderDone, setLoaderDone] = useState(false);

  const [finalPhase, setFinalPhase] = useState<0 | 1 | 2 | 3>(0);
  const finalPhaseRef = useRef<0 | 1 | 2 | 3>(0);
  const finalGenRef = useRef(0);

  const allLoadedRef = useRef(false);
  const currentFrameRef = useRef(0);
  const halfwayTriggeredRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const midInOut = (start: number, end: number) => {
    const range = end - start;
    return [start, start + range * 0.3, start + range * 0.7, end] as [number, number, number, number];
  };

  const [a1, a2, a3, a4] = midInOut(0.00, 0.18);
  const [b1, b2, b3, b4] = midInOut(0.22, 0.40);
  const [c1, c2, c3, c4] = midInOut(0.44, 0.62);
  const [d1, d2, d3, d4] = midInOut(0.66, 0.78);

  const beatAOpacity = useTransform(smoothProgress, [a1, a2, a3, a4], [0, 1, 1, 0]);
  const beatAY      = useTransform(smoothProgress, [a1, a2, a3, a4], [20, 0, 0, -20]);
  const beatBOpacity = useTransform(smoothProgress, [b1, b2, b3, b4], [0, 1, 1, 0]);
  const beatBY      = useTransform(smoothProgress, [b1, b2, b3, b4], [20, 0, 0, -20]);
  const beatCOpacity = useTransform(smoothProgress, [c1, c2, c3, c4], [0, 1, 1, 0]);
  const beatCY      = useTransform(smoothProgress, [c1, c2, c3, c4], [20, 0, 0, -20]);
  const beatDOpacity = useTransform(smoothProgress, [d1, d2, d3, d4], [0, 1, 1, 0]);
  const beatDY      = useTransform(smoothProgress, [d1, d2, d3, d4], [20, 0, 0, -20]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  const drawFrameRef = useRef<(i: number) => void>(() => {});
  drawFrameRef.current = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const img = imagesRef.current[frameIndex];
    const cw = canvas.width;
    const ch = canvas.height;
    ctx.fillStyle = '#F0F4F7';
    ctx.fillRect(0, 0, cw, ch);
    if (img && img.complete && img.naturalWidth > 0) {
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const x = (cw - img.naturalWidth * scale) / 2;
      const y = (ch - img.naturalHeight * scale) / 2;
      ctx.drawImage(img, x, y, img.naturalWidth * scale, img.naturalHeight * scale);
    }
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const imgs: (HTMLImageElement | null)[] = Array.from({ length: TOTAL_FRAMES }, () => null);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const idx = i;
      img.onload = () => {
        imgs[idx] = img;
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          allLoadedRef.current = true;
          setAllLoaded(true);
          drawFrameRef.current(0);
          setTimeout(() => setLoaderDone(true), 700);
        }
      };
      img.onerror = () => {
        loadedCount++;
        setLoadProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = imgs;
          allLoadedRef.current = true;
          setAllLoaded(true);
          setTimeout(() => setLoaderDone(true), 700);
        }
      };
      img.src = frameSrc(i);
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      drawFrameRef.current(currentFrameRef.current);
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (val) => {
    if (allLoadedRef.current) {
      const frameIndex = Math.min(191, Math.max(0, Math.floor(val * 191)));
      if (frameIndex !== currentFrameRef.current) {
        currentFrameRef.current = frameIndex;
        drawFrameRef.current(frameIndex);
      }
    }

    if (val >= 0.5 && !halfwayTriggeredRef.current) {
      halfwayTriggeredRef.current = true;
      onHalfway?.();
    }

    if (val >= 0.82 && finalPhaseRef.current === 0) {
      finalPhaseRef.current = 1;
      setFinalPhase(1);
      const gen = ++finalGenRef.current;
      const lastDelay = (FINAL_LETTERS.length - 1) * 80 + 400;
      setTimeout(() => { if (finalGenRef.current === gen) setFinalPhase(2); }, lastDelay + 800);
      setTimeout(() => { if (finalGenRef.current === gen) setFinalPhase(3); }, lastDelay + 1400);
    } else if (val < 0.82 && finalPhaseRef.current > 0) {
      finalGenRef.current++;
      finalPhaseRef.current = 0;
      setFinalPhase(0);
    }
  });

  return (
    <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>

        {/* Loader */}
        {!loaderDone && (
          <div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background: '#F0F4F7',
              opacity: allLoaded ? 0 : 1,
              transition: 'opacity 0.6s ease',
              pointerEvents: allLoaded ? 'none' : 'auto',
            }}
          >
            <div className="relative w-10 h-10 mb-10">
              <div
                className="absolute inset-0 rounded-full border"
                style={{ borderColor: 'rgba(44,74,110,0.2)' }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border border-transparent"
                style={{ borderTopColor: '#2C4A6E' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div
              className="w-56 rounded-full overflow-hidden"
              style={{ height: '1px', background: 'rgba(13,27,42,0.1)' }}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${loadProgress}%`,
                  background: '#2C4A6E',
                  transition: 'width 0.1s linear',
                }}
              />
            </div>
            <p className="mt-5 text-xs tracking-[0.3em] uppercase" style={{ color: 'rgba(13,27,42,0.35)' }}>
              {loadProgress}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: allLoaded ? 1 : 0, transition: 'opacity 0.4s ease 0.2s' }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Beat A — centrato */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ opacity: beatAOpacity, y: beatAY }}
          >
            <h1 className="text-7xl md:text-9xl tracking-tighter font-bold text-center" style={{ color: '#0D1B2A' }}>
              IL BRANCO CAMMINA.
            </h1>
            <p className="mt-4 text-base md:text-xl text-center" style={{ color: 'rgba(13,27,42,0.65)' }}>
              Tu scegli quando staccarti.
            </p>
          </motion.div>

          {/* Beat B — sinistra */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center pl-12 md:pl-28"
            style={{ opacity: beatBOpacity, y: beatBY }}
          >
            <h2 className="text-6xl md:text-8xl tracking-tighter font-bold" style={{ color: '#0D1B2A' }}>
              IL TUO RITMO.
            </h2>
            <p className="mt-4 text-base md:text-xl" style={{ color: 'rgba(13,27,42,0.65)' }}>
              Nessuna classifica. Nessun giudizio.
            </p>
          </motion.div>

          {/* Beat C — destra */}
          <motion.div
            className="absolute inset-0 flex flex-col items-end justify-center pr-12 md:pr-28"
            style={{ opacity: beatCOpacity, y: beatCY }}
          >
            <h2 className="text-6xl md:text-8xl tracking-tighter font-bold text-right" style={{ color: '#0D1B2A' }}>
              LA TUA MONTAGNA.
            </h2>
            <p className="mt-4 text-base md:text-xl text-right" style={{ color: 'rgba(13,27,42,0.65)' }}>
              Ogni corsa è un passo verso qualcosa di tuo.
            </p>
          </motion.div>

          {/* Beat D — centrato */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ opacity: beatDOpacity, y: beatDY }}
          >
            <h2 className="text-7xl md:text-9xl tracking-tighter font-bold text-center" style={{ color: '#0D1B2A' }}>
              CAMMINA DA SOLO.
            </h2>
            <p className="mt-4 text-base md:text-xl text-center" style={{ color: 'rgba(13,27,42,0.65)' }}>
              Unisciti al Penguin Run Club.
            </p>
          </motion.div>

          {/* Final: BE THE PENGUIN */}
          {finalPhase > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <h1
                className="tracking-widest font-bold text-center leading-none"
                style={{ fontSize: 'clamp(3rem, 10vw, 10rem)', color: 'rgba(13,27,42,0.9)' }}
                aria-label={FINAL_TEXT}
              >
                {FINAL_LETTERS.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={finalPhase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                    style={{ display: 'inline-block' }}
                  >
                    {letter === ' ' ? ' ' : letter}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                className="mt-8 text-base md:text-xl max-w-xl text-center"
                style={{ color: 'rgba(13,27,42,0.55)' }}
                initial={{ opacity: 0, y: 20 }}
                animate={finalPhase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                Il momento in cui smetti di seguire è il momento in cui inizi a correre davvero.
              </motion.p>

              <motion.div
                className="mt-8 pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={finalPhase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
              >
                <motion.a
                  href="#storia"
                  className="inline-block px-8 py-4 rounded-full text-white font-medium tracking-wide text-sm"
                  style={{ background: '#2C4A6E', boxShadow: '0 0 24px rgba(44,74,110,0.27)' }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Scopri il club →
                </motion.a>
              </motion.div>
            </div>
          )}

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 flex flex-col items-center gap-3"
            style={{ opacity: scrollHintOpacity }}
          >
            <span
              className="text-xs tracking-[0.25em] uppercase"
              style={{ color: 'rgba(13,27,42,0.6)' }}
            >
              Scorri per esplorare
            </span>
            <motion.svg
              width="16" height="24" viewBox="0 0 16 24" fill="none"
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path
                d="M8 2L8 20M8 20L2 14M8 20L14 14"
                stroke="rgba(13,27,42,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.svg>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
