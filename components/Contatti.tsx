'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Contatti() {
  const [form, setForm] = useState({ nome: '', email: '', messaggio: '' });

  const inputStyle = {
    background: 'transparent',
    border: '1px solid rgba(13,27,42,0.2)',
    color: 'rgba(13,27,42,0.85)',
    borderRadius: '0.75rem',
    padding: '0.85rem 1.1rem',
    width: '100%',
    fontSize: '0.9rem',
    outline: 'none',
    transition: 'border-color 0.2s ease',
  };

  return (
    <section id="contatti" className="py-32" style={{ background: '#F0F4F7' }}>
      <div className="max-w-2xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl tracking-tighter font-bold mb-4 text-center"
          style={{ color: 'rgba(13,27,42,0.92)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Scrivici.
        </motion.h2>

        <motion.p
          className="text-lg text-center mb-14"
          style={{ color: 'rgba(13,27,42,0.55)' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          Hai domande? Vuoi organizzare un run? Siamo qui.
        </motion.p>

        <motion.form
          className="flex flex-col gap-4"
          onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <input
            type="text"
            placeholder="Nome"
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#2C4A6E')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(13,27,42,0.2)')}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#2C4A6E')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(13,27,42,0.2)')}
          />
          <textarea
            placeholder="Il tuo messaggio"
            rows={4}
            value={form.messaggio}
            onChange={(e) => setForm({ ...form, messaggio: e.target.value })}
            style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#2C4A6E')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'rgba(13,27,42,0.2)')}
          />
          <motion.button
            type="submit"
            className="mt-2 py-4 px-8 rounded-full text-white font-semibold text-sm tracking-wide"
            style={{ background: '#2C4A6E' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Manda il messaggio →
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
