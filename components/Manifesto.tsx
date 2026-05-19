'use client';

import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section id="manifesto" style={{ padding: '10rem 0', background: '#F5F0E8' }}>
      <div className="max-w-4xl mx-auto px-8 text-center">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
        >
          {/* Hairline top */}
          <div style={{ width: '48px', height: '1px', background: '#C9A55A', margin: '0 auto 3rem' }} />

          <h2 style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(2.5rem,6vw,5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            color: 'rgba(10,14,22,0.88)',
          }}>
            Non siamo una squadra.
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          style={{
            fontFamily: 'var(--serif)',
            fontSize: 'clamp(1.1rem,2.5vw,1.5rem)',
            fontWeight: 300,
            fontStyle: 'italic',
            lineHeight: 1.75,
            letterSpacing: '0.01em',
            color: 'rgba(10,14,22,0.5)',
            maxWidth: '38rem',
            margin: '3rem auto 0',
          }}
        >
          Siamo un branco di solitari che hanno scelto la stessa direzione.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{ width: '48px', height: '1px', background: '#C9A55A', margin: '3rem auto 0' }}
        />
      </div>
    </section>
  );
}
