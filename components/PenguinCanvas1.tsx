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
    ctx.fillStyle = '#F5F0E8';
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

  const beatTextStyle: React.CSSProperties = {
    fontFamily: 'var(--serif)',
    fontWeight: 300,
    fontStyle: 'italic',
    letterSpacing: '-0.02em',
    lineHeight: 1,
    fontSize: 'clamp(2.5rem,8vw,9rem)',
    color: 'rgba(10,14,22,0.88)',
    textShadow: '0 2px 24px rgba(245,240,232,0.5)',
    margin: 0,
  };

  return (
    <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>

        {/* Loader */}
        {!loaderDone && (
          <div
            className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{
              background: '#F5F0E8',
              opacity: allLoaded ? 0 : 1,
              transition: 'opacity 0.7s ease',
              pointerEvents: allLoaded ? 'none' : 'auto',
            }}
          >
            <div className="relative mb-10" style={{ width: '2rem', height: '2rem' }}>
              <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(201,165,90,0.15)' }} />
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ border: '1px solid transparent', borderTopColor: '#C9A55A' }}
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
            <div className="rounded-full overflow-hidden" style={{ width: '10rem', height: '1px', background: 'rgba(10,14,22,0.08)' }}>
              <div
                style={{
                  width: `${loadProgress}%`,
                  height: '100%',
                  background: '#C9A55A',
                  transition: 'width 0.12s linear',
                }}
              />
            </div>
            <p style={{
              marginTop: '1.5rem',
              fontFamily: 'var(--serif)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(10,14,22,0.3)',
            }}>
              {loadProgress}%
            </p>
          </div>
        )}

        {/* Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ opacity: allLoaded ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }}
        />

        {/* Overlays */}
        <div className="absolute inset-0 pointer-events-none">

          {/* Beat A — centrato */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ opacity: beatAOpacity, y: beatAY }}
          >
            <h2 style={{ ...beatTextStyle, textAlign: 'center' }}>Il branco cammina.</h2>
          </motion.div>

          {/* Beat B — sinistra */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-center"
            style={{ opacity: beatBOpacity, y: beatBY, paddingLeft: 'clamp(3rem,7vw,7rem)' }}
          >
            <h2 style={{ ...beatTextStyle, textAlign: 'left' }}>Il tuo ritmo.</h2>
          </motion.div>

          {/* Beat C — destra */}
          <motion.div
            className="absolute inset-0 flex flex-col items-end justify-center"
            style={{ opacity: beatCOpacity, y: beatCY, paddingRight: 'clamp(3rem,7vw,7rem)' }}
          >
            <h2 style={{ ...beatTextStyle, textAlign: 'right' }}>La tua montagna.</h2>
          </motion.div>

          {/* Beat D — centrato */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ opacity: beatDOpacity, y: beatDY }}
          >
            <h2 style={{ ...beatTextStyle, textAlign: 'center' }}>Cammina da solo.</h2>
          </motion.div>

          {/* Final: BE THE PENGUIN */}
          {finalPhase > 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6">
              <h1
                style={{
                  fontFamily: 'var(--serif)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                  fontSize: 'clamp(3rem,10vw,10rem)',
                  color: 'rgba(10,14,22,0.88)',
                  textAlign: 'center',
                  margin: 0,
                }}
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
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h1>

              <motion.div
                className="mt-8 pointer-events-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={finalPhase >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.7 }}
              >
                <motion.a
                  href="#storia"
                  style={{
                    display: 'inline-block',
                    padding: '0.7rem 1.8rem',
                    borderRadius: '0.2rem',
                    background: '#C9A55A',
                    color: '#0A0E16',
                    fontFamily: 'var(--serif)',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '0.85rem',
                    letterSpacing: '0.06em',
                    textDecoration: 'none',
                  }}
                  whileHover={{ opacity: 0.88, y: -1 }}
                  whileTap={{ opacity: 1, y: 0 }}
                >
                  Scopri il club →
                </motion.a>
              </motion.div>
            </div>
          )}

          {/* Scroll hint */}
          <motion.div
            className="absolute bottom-10 left-0 right-0 flex flex-col items-center"
            style={{ opacity: scrollHintOpacity, gap: '1rem' }}
          >
            <span style={{
              fontFamily: 'var(--serif)',
              fontSize: '0.62rem',
              fontWeight: 500,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(10,14,22,0.4)',
            }}>
              Scorri per esplorare
            </span>
            {/* Vertical line scroll indicator */}
            <motion.div
              style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(10,14,22,0.45))' }}
              animate={{ y: [0, 7, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}
