'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { label: 'Storia', href: '#storia' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Run', href: '#run' },
  { label: 'Community', href: '#community' },
  { label: 'Contatti', href: '#contatti' },
];

function PenguinLogo() {
  return (
    <svg width="32" height="38" viewBox="0 0 32 38" fill="none" aria-hidden="true">
      {/* Body silhouette */}
      <path
        d="M16 1C10.2 1 5 6.1 5 12.5V25C5 31.1 9.9 37 16 37C22.1 37 27 31.1 27 25V12.5C27 6.1 21.8 1 16 1Z"
        fill="white"
        fillOpacity="0.92"
      />
      {/* White belly patch */}
      <ellipse cx="16" cy="25" rx="6" ry="8" fill="white" fillOpacity="0.18" />
      {/* Left eye */}
      <circle cx="12.5" cy="13" r="2" fill="#0D1B2A" />
      <circle cx="13.1" cy="12.4" r="0.6" fill="white" fillOpacity="0.5" />
      {/* Right eye */}
      <circle cx="19.5" cy="13" r="2" fill="#0D1B2A" />
      <circle cx="20.1" cy="12.4" r="0.6" fill="white" fillOpacity="0.5" />
      {/* Beak */}
      <path d="M13.5 17L16 20L18.5 17Z" fill="#E8733A" />
      {/* Left flipper */}
      <path
        d="M5 19Q1 23 3 29"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
      {/* Right flipper */}
      <path
        d="M27 19Q31 23 29 29"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeOpacity="0.85"
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: 'rgba(8, 16, 26, 0.88)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(44, 74, 110, 0.4)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between" style={{ height: '4.5rem' }}>

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 select-none group">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <PenguinLogo />
            </motion.div>
            <div className="flex flex-col leading-none">
              <span
                className="font-bold tracking-[0.22em] uppercase"
                style={{ fontSize: '13px', color: 'rgba(255,255,255,0.95)', letterSpacing: '0.22em' }}
              >
                Penguin
              </span>
              <span
                className="font-light tracking-[0.3em] uppercase"
                style={{ fontSize: '9px', color: 'rgba(255,255,255,0.38)', letterSpacing: '0.3em', marginTop: '3px' }}
              >
                Run Club
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative px-4 py-2 group/link"
                  style={{ display: 'block' }}
                >
                  <span
                    className="text-xs font-medium tracking-[0.18em] uppercase transition-colors duration-200"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.95)')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {l.label}
                  </span>
                </a>
              </li>
            ))}

            {/* CTA pill */}
            <li className="ml-4">
              <motion.a
                href="#run"
                className="px-5 py-2 rounded-full text-xs font-semibold tracking-[0.12em] uppercase text-white"
                style={{
                  background: '#2C4A6E',
                  border: '1px solid rgba(44,74,110,0.6)',
                  boxShadow: '0 0 16px rgba(44,74,110,0.3)',
                }}
                whileHover={{ scale: 1.04, boxShadow: '0 0 24px rgba(44,74,110,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Prossimi run
              </motion.a>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center gap-[5px] p-2 rounded"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
            style={{ border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.04)' }}
          >
            <motion.span
              className="block bg-white rounded-full"
              style={{ width: '18px', height: '1.5px' }}
              animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="block bg-white rounded-full"
              style={{ width: '18px', height: '1.5px' }}
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block bg-white rounded-full"
              style={{ width: '18px', height: '1.5px' }}
              animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center items-center"
            style={{ background: '#080F18' }}
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Accent line top */}
            <div
              className="absolute top-0 left-0 right-0"
              style={{ height: '1px', background: 'rgba(44,74,110,0.5)' }}
            />

            <div className="mb-12 opacity-30">
              <PenguinLogo />
            </div>

            <ul className="flex flex-col items-center gap-6">
              {links.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, ease: 'easeOut' }}
                >
                  <a
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-4xl font-bold tracking-tighter transition-colors"
                    style={{ color: 'rgba(255,255,255,0.75)' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#ffffff')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.75)')}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>

            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <a
                href="#run"
                onClick={() => setMenuOpen(false)}
                className="px-8 py-3 rounded-full text-sm font-semibold tracking-wide text-white"
                style={{ background: '#2C4A6E' }}
              >
                Prossimi run →
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
