'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Storia',    href: '#storia'    },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Run',       href: '#run'       },
  { label: 'Community', href: '#community' },
  { label: 'Contatti',  href: '#contatti'  },
];

/** Flood-fill from edges to remove white bg, then recolor body → gold 60%, belly → white */
function useCleanLogo(src: string): string {
  const [url, setUrl] = useState(src);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      try {
        const cv = document.createElement('canvas');
        cv.width = img.width;
        cv.height = img.height;
        const ctx = cv.getContext('2d')!;
        ctx.drawImage(img, 0, 0);

        const d = ctx.getImageData(0, 0, cv.width, cv.height);
        const { data, width, height } = d;
        const visited = new Uint8Array(width * height);
        const queue: number[] = [];

        const seed = (x: number, y: number) => {
          const idx = y * width + x;
          if (visited[idx]) return;
          const i = idx * 4;
          if (data[i] > 190 && data[i + 1] > 190 && data[i + 2] > 190) {
            visited[idx] = 1;
            queue.push(idx);
          }
        };

        for (let x = 0; x < width; x++) { seed(x, 0); seed(x, height - 1); }
        for (let y = 0; y < height; y++) { seed(0, y); seed(width - 1, y); }

        let qi = 0;
        while (qi < queue.length) {
          const idx = queue[qi++];
          data[idx * 4 + 3] = 0;
          const x = idx % width;
          const y = Math.floor(idx / width);
          for (const [nx, ny] of [[x-1,y],[x+1,y],[x,y-1],[x,y+1]] as [number,number][]) {
            if (nx < 0 || nx >= width || ny < 0 || ny >= height) continue;
            const ni = ny * width + nx;
            if (visited[ni]) continue;
            const pi = ni * 4;
            if (data[pi] > 180 && data[pi + 1] > 180 && data[pi + 2] > 180) {
              visited[ni] = 1;
              queue.push(ni);
            }
          }
        }

        ctx.putImageData(d, 0, 0);

        // Recolor: dark → gold 60%, light → white (belly)
        const d2 = ctx.getImageData(0, 0, cv.width, cv.height);
        const px = d2.data;
        for (let i = 0; i < px.length; i += 4) {
          if (px[i + 3] > 0) {
            const brightness = (px[i] + px[i + 1] + px[i + 2]) / 3;
            if (brightness < 160) {
              px[i] = 201; px[i + 1] = 165; px[i + 2] = 90; px[i + 3] = 153; // gold 60%
            } else {
              px[i] = 255; px[i + 1] = 255; px[i + 2] = 255; // white belly
            }
          }
        }
        ctx.putImageData(d2, 0, 0);
        setUrl(cv.toDataURL('image/png'));
      } catch {
        // fallback: use original
      }
    };
    img.src = src;
  }, [src]);

  return url;
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const logoUrl = useCleanLogo('/penguin-logo.jpeg');

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: 'rgba(10,14,22,0.96)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderBottom: '1px solid rgba(201,165,90,0.18)',
        }}
      >
        <div
          className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between"
          style={{ height: '4.5rem' }}
        >
          {/* Logo */}
          <a href="#" className="flex items-center select-none" style={{ gap: '0.875rem', textDecoration: 'none' }}>
            <motion.div
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoUrl} alt="Penguin Run Club" style={{ height: '34px', width: 'auto' }} />
            </motion.div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.28em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.88)',
              }}>Penguin</span>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: '8px',
                fontWeight: 500,
                letterSpacing: '0.32em',
                textTransform: 'uppercase',
                color: 'rgba(201,165,90,0.6)',
              }}>Run Club</span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center" style={{ gap: 0, listStyle: 'none' }}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '0.8rem',
                    fontWeight: 400,
                    fontStyle: 'italic',
                    letterSpacing: '0.06em',
                    color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none',
                    padding: '0.5rem 0.9rem',
                    display: 'block',
                    transition: 'color 0.25s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.92)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li style={{ marginLeft: '1.5rem' }}>
              <motion.a
                href="#run"
                style={{
                  display: 'block',
                  padding: '0.5rem 1.4rem',
                  borderRadius: '0.2rem',
                  fontFamily: 'var(--serif)',
                  fontSize: '0.78rem',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '0.06em',
                  color: '#0A0E16',
                  background: '#C9A55A',
                  textDecoration: 'none',
                }}
                whileHover={{ opacity: 0.88, y: -1 }}
                whileTap={{ opacity: 1, y: 0 }}
              >
                Prossimi run
              </motion.a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ gap: '5px', background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <motion.span
              className="block rounded-full"
              style={{ width: '22px', height: '1px', background: 'rgba(255,255,255,0.7)' }}
              animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }}
            />
            <motion.span
              className="block rounded-full"
              style={{ width: '22px', height: '1px', background: 'rgba(255,255,255,0.7)' }}
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.18 }}
            />
            <motion.span
              className="block rounded-full"
              style={{ width: '22px', height: '1px', background: 'rgba(255,255,255,0.7)' }}
              animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center"
            style={{ background: '#0A0E16', padding: '0 3rem' }}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', background: 'rgba(201,165,90,0.25)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'rgba(201,165,90,0.1)' }} />

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', listStyle: 'none', marginBottom: '3rem' }}>
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, ease: 'easeOut' }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      fontFamily: 'var(--serif)',
                      fontSize: 'clamp(2.5rem,7vw,4rem)',
                      fontWeight: 300,
                      fontStyle: 'italic',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.15,
                      color: 'rgba(255,255,255,0.72)',
                      textDecoration: 'none',
                      transition: 'color 0.25s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C9A55A')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <a
                href="#run"
                onClick={() => setMenuOpen(false)}
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
              >
                Prossimi run →
              </a>
            </motion.div>

            <div style={{ position: 'absolute', bottom: '2.5rem', left: '3rem' }}>
              <span style={{
                fontFamily: 'var(--serif)',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(201,165,90,0.4)',
              }}>Be the penguin.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
