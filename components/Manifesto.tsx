'use client';

import { motion } from 'framer-motion';

export default function Manifesto() {
  return (
    <section id="manifesto" className="py-32" style={{ background: '#F0F4F7' }}>
      <div className="max-w-4xl mx-auto px-8 text-center">
        <motion.h2
          className="text-5xl md:text-6xl tracking-tighter font-bold"
          style={{ color: 'rgba(13,27,42,0.92)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Non siamo una squadra.
        </motion.h2>

        <motion.div
          className="my-10 mx-auto"
          style={{ height: '1px', maxWidth: '480px', background: 'rgba(13,27,42,0.12)' }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        />

        <motion.p
          className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          style={{ color: 'rgba(13,27,42,0.55)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Siamo un branco di solitari che hanno scelto la stessa direzione.
        </motion.p>
      </div>
    </section>
  );
}
