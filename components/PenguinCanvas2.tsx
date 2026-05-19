'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform, useMotionValueEvent, motion } from 'framer-motion';

const TOTAL_FRAMES = 192;
const FINAL_TEXT = 'RUN YOUR WAY';
const FINAL_LETTERS = FINAL_TEXT.split('');

const GOLD_BG = 'linear-gradient(160deg, #E8D08A 0%, #C9A55A 30%, #A07830 55%, #D4B06A 80%, #F0DC9A 100%)';
const GOLD_TEXT = { background: GOLD_BG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as React.CSSProperties;
const RED_TEXT  = { background: 'linear-gradient(160deg, #B04050 0%, #7A0F1E 30%, #4A080E 55%, #901828 80%, #C03048 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as React.CSSProperties;

const FINAL_TEXT_Y = 28; // % from top — just above the penguin

const frameSrc = (i: number) =>
  `/ANIMAZIONE 2/frame_${String(i).padStart(3, '0')}_delay-0.041s.jpg`;

interface Props { shouldPreload: boolean; }

export default function PenguinCanvas2({ shouldPreload }: Props) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const imagesRef  = useRef<(HTMLImageElement | null)[]>(Array.from({ length: TOTAL_FRAMES }, () => null));

  const [loadProgress, setLoadProgress] = useState(0);
  const [allLoaded,    setAllLoaded]    = useState(false);
  const [loaderDone,   setLoaderDone]   = useState(false);
  const [finalPhase,   setFinalPhase]   = useState<0|1|2|3>(0);

  const finalPhaseRef  = useRef<0|1|2|3>(0);
  const finalGenRef    = useRef(0);
  const allLoadedRef   = useRef(false);
  const currentFrameRef = useRef(0);
  const preloadStartedRef = useRef(false);

  const { scrollYProgress } = useScroll({ target: wrapperRef, offset: ['start start', 'end end'] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  const midInOut = (start: number, end: number) => {
    const r = end - start;
    return [start, start+r*.3, start+r*.7, end] as [number,number,number,number];
  };

  const [a1,a2,a3,a4] = midInOut(0.00, 0.18);
  const [b1,b2,b3,b4] = midInOut(0.22, 0.40);
  const [c1,c2,c3,c4] = midInOut(0.44, 0.62);
  const [d1,d2,d3,d4] = midInOut(0.66, 0.78);

  const beatAOpacity = useTransform(smoothProgress, [a1,a2,a3,a4], [0,1,1,0]);
  const beatAY       = useTransform(smoothProgress, [a1,a2,a3,a4], [20,0,0,-20]);
  const beatBOpacity = useTransform(smoothProgress, [b1,b2,b3,b4], [0,1,1,0]);
  const beatBY       = useTransform(smoothProgress, [b1,b2,b3,b4], [20,0,0,-20]);
  const beatCOpacity = useTransform(smoothProgress, [c1,c2,c3,c4], [0,1,1,0]);
  const beatCY       = useTransform(smoothProgress, [c1,c2,c3,c4], [20,0,0,-20]);
  const beatDOpacity = useTransform(smoothProgress, [d1,d2,d3,d4], [0,1,1,0]);
  const beatDY       = useTransform(smoothProgress, [d1,d2,d3,d4], [20,0,0,-20]);
  const scrollHintOpacity = useTransform(smoothProgress, [0, 0.08], [1, 0]);

  const drawFrameRef = useRef<(i: number) => void>(() => {});
  drawFrameRef.current = useCallback((fi: number) => {
    const cv = canvasRef.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const img = imagesRef.current[fi];
    ctx.fillStyle = '#F5F0E8'; ctx.fillRect(0, 0, cv.width, cv.height);
    if (img && img.complete && img.naturalWidth > 0) {
      const s = Math.max(cv.width/img.naturalWidth, cv.height/img.naturalHeight);
      ctx.drawImage(img, (cv.width-img.naturalWidth*s)/2, (cv.height-img.naturalHeight*s)/2, img.naturalWidth*s, img.naturalHeight*s);
    }
  }, []);

  const startLoading = useCallback(() => {
    if (preloadStartedRef.current) return;
    preloadStartedRef.current = true;
    let cnt = 0;
    const imgs: (HTMLImageElement | null)[] = Array.from({ length: TOTAL_FRAMES }, () => null);
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image(); const idx = i;
      const done = () => { cnt++; setLoadProgress(Math.round(cnt/TOTAL_FRAMES*100)); if (cnt===TOTAL_FRAMES) { imagesRef.current=imgs; allLoadedRef.current=true; setAllLoaded(true); drawFrameRef.current(0); setTimeout(()=>setLoaderDone(true),700); } };
      img.onload = () => { imgs[idx]=img; done(); }; img.onerror = done;
      img.src = frameSrc(i);
    }
  }, []);

  useEffect(() => { if (shouldPreload) startLoading(); }, [shouldPreload, startLoading]);

  useEffect(() => {
    const wrapper = wrapperRef.current; if (!wrapper) return;
    const obs = new IntersectionObserver((es) => { if (es[0].isIntersecting) startLoading(); }, { threshold: 0.05 });
    obs.observe(wrapper); return () => obs.disconnect();
  }, [startLoading]);

  useEffect(() => {
    const cv = canvasRef.current; if (!cv) return;
    const resize = () => { cv.width=window.innerWidth; cv.height=window.innerHeight; drawFrameRef.current(currentFrameRef.current); };
    resize(); window.addEventListener('resize', resize); return () => window.removeEventListener('resize', resize);
  }, []);

  useMotionValueEvent(smoothProgress, 'change', (val) => {
    if (allLoadedRef.current) {
      const fi = Math.min(191, Math.max(0, Math.floor(val*191)));
      if (fi !== currentFrameRef.current) { currentFrameRef.current=fi; drawFrameRef.current(fi); }
    }
    if (val >= 0.82 && finalPhaseRef.current === 0) {
      finalPhaseRef.current=1; setFinalPhase(1);
      const gen = ++finalGenRef.current;
      const d = (FINAL_LETTERS.length-1)*80+400;
      setTimeout(()=>{ if(finalGenRef.current===gen) setFinalPhase(2); }, d+800);
      setTimeout(()=>{ if(finalGenRef.current===gen) setFinalPhase(3); }, d+1400);
    } else if (val < 0.82 && finalPhaseRef.current > 0) {
      finalGenRef.current++; finalPhaseRef.current=0; setFinalPhase(0);
    }
  });

  const baseText: React.CSSProperties = {
    fontFamily: 'var(--serif)', fontWeight: 300, fontStyle: 'italic',
    letterSpacing: '-0.02em', lineHeight: 1,
    fontSize: 'clamp(2.5rem,8vw,9rem)', margin: 0,
  };

  // Animation 2: reversed — A=navy, B=gold, C=navy, D=gold
  const navyBeatStyle: React.CSSProperties = { ...baseText, color: '#0C1A2E' };
  const goldBeatStyle: React.CSSProperties = { ...baseText, ...GOLD_TEXT, paddingBottom: '0.1em' };

  return (
    <div ref={wrapperRef} style={{ height: '500vh', position: 'relative' }}>
      <div className="sticky top-0 overflow-hidden" style={{ height: '100vh' }}>

        {/* Loader */}
        {!loaderDone && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center"
            style={{ background: '#F5F0E8', opacity: allLoaded ? 0 : 1, transition: 'opacity 0.7s ease', pointerEvents: allLoaded ? 'none' : 'auto' }}>
            <div className="relative mb-10" style={{ width: '2rem', height: '2rem' }}>
              <div className="absolute inset-0 rounded-full" style={{ border: '1px solid rgba(201,165,90,0.15)' }} />
              <motion.div className="absolute inset-0 rounded-full"
                style={{ border: '1px solid transparent', borderTopColor: '#C9A55A' }}
                animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }} />
            </div>
            <div className="rounded-full overflow-hidden" style={{ width: '10rem', height: '1px', background: 'rgba(10,14,22,0.08)' }}>
              <div style={{ width: `${loadProgress}%`, height: '100%', background: GOLD_BG, transition: 'width 0.12s linear' }} />
            </div>
            <p style={{ marginTop: '1.5rem', fontFamily: 'var(--serif)', fontSize: '0.65rem', fontWeight: 500, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(10,14,22,0.3)' }}>
              {loadProgress}%
            </p>
          </div>
        )}

        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"
          style={{ opacity: allLoaded ? 1 : 0, transition: 'opacity 0.5s ease 0.2s' }} />

        <div className="absolute inset-0 pointer-events-none">

          {/* Beat A — navy — centrato */}
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ opacity: beatAOpacity, y: beatAY }}>
            <h2 style={{ ...navyBeatStyle, textAlign: 'center' }}>Il branco si muove.</h2>
          </motion.div>

          {/* Beat B — gold — sinistra */}
          <motion.div className="absolute inset-0 flex flex-col justify-center"
            style={{ opacity: beatBOpacity, y: beatBY, paddingLeft: 'clamp(3rem,7vw,7rem)' }}>
            <h2 style={{ ...goldBeatStyle, textAlign: 'left' }}>La forza del gruppo.</h2>
          </motion.div>

          {/* Beat C — navy — destra */}
          <motion.div className="absolute inset-0 flex flex-col items-end justify-center"
            style={{ opacity: beatCOpacity, y: beatCY, paddingRight: 'clamp(3rem,7vw,7rem)' }}>
            <h2 style={{ ...navyBeatStyle, textAlign: 'right' }}>Il ghiacciaio chiama.</h2>
          </motion.div>

          {/* Beat D — gold — centrato */}
          <motion.div className="absolute inset-0 flex flex-col items-center justify-center px-8"
            style={{ opacity: beatDOpacity, y: beatDY }}>
            <h2 style={{ ...goldBeatStyle, textAlign: 'center' }}>Unisciti al branco.</h2>
          </motion.div>

          {/* Final: RUN YOUR WAY — blood red, positioned above penguin */}
          {finalPhase > 0 && (
            <div style={{
              position: 'absolute', top: `${FINAL_TEXT_Y}%`, left: 0, right: 0,
              transform: 'translateY(-50%)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 1.5rem',
            }}>
              <h2
                style={{
                  fontFamily: 'var(--serif)', fontWeight: 300, fontStyle: 'italic',
                  letterSpacing: '0.06em', lineHeight: 1.1,
                  fontSize: 'clamp(3rem,10vw,10rem)', textAlign: 'center', margin: 0,
                  ...RED_TEXT, paddingBottom: '0.15em',
                }}
                aria-label={FINAL_TEXT}
              >
                {FINAL_LETTERS.map((letter, i) => (
                  <motion.span key={i}
                    initial={{ opacity: 0, y: 30 }}
                    animate={finalPhase >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.4, delay: i*0.08, ease: 'easeOut' }}
                    style={{ display: 'inline-block' }}>
                    {letter === ' ' ? '\u00A0' : letter}
                  </motion.span>
                ))}
              </h2>
            </div>
          )}

          {/* Scroll hint */}
          <motion.div className="absolute bottom-10 left-0 right-0 flex flex-col items-center"
            style={{ opacity: scrollHintOpacity, gap: '1rem' }}>
            <span style={{ fontFamily: 'var(--serif)', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(10,14,22,0.4)' }}>
              Scorri per continuare
            </span>
            <motion.div
              style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(10,14,22,0.45))' }}
              animate={{ y: [0, 7, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
