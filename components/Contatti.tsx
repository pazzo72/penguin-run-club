'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const GOLD_BG = 'linear-gradient(160deg, #E8D08A 0%, #C9A55A 30%, #A07830 55%, #D4B06A 80%, #F0DC9A 100%)';
const GOLD_TEXT = { background: GOLD_BG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as React.CSSProperties;

export default function Contatti() {
  const [form, setForm] = useState({ nome: '', email: '', messaggio: '' });

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '0.85rem 0',
    fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem',
    background: 'transparent', border: 'none', borderBottom: '1px solid rgba(10,14,22,0.15)',
    color: 'rgba(10,14,22,0.9)', outline: 'none', transition: 'border-color 0.25s',
  };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderBottomColor = '#C9A55A');
  const onBlur  = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.currentTarget.style.borderBottomColor = 'rgba(10,14,22,0.15)');

  return (
    <section id="contatti" style={{ padding: '10rem 0', background: '#F5F0E8' }}>
      <div className="max-w-2xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: '1.5rem', ...GOLD_TEXT }}>
            — Scrivici
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.02em', color: 'rgba(10,14,22,0.88)', marginBottom: '0.75rem' }}>
            Parliamoci.
          </h2>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(10,14,22,0.45)', marginBottom: '3.5rem' }}>
            Hai domande? Vuoi organizzare un run? Siamo qui.
          </p>
        </motion.div>

        <motion.form className="flex flex-col" onSubmit={(e) => e.preventDefault()}
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ gap: '1.75rem' }}>
          <input type="text" placeholder="Nome" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={fieldStyle} onFocus={onFocus} onBlur={onBlur} />
          <input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={fieldStyle} onFocus={onFocus} onBlur={onBlur} />
          <textarea placeholder="Il tuo messaggio" rows={4} value={form.messaggio} onChange={(e) => setForm({ ...form, messaggio: e.target.value })} style={{ ...fieldStyle, resize: 'vertical', fontFamily: 'var(--serif)' }} onFocus={onFocus} onBlur={onBlur} />
          <div style={{ paddingTop: '0.5rem' }}>
            <motion.button type="submit" whileHover={{ opacity: 0.88, y: -1 }} whileTap={{ opacity: 1, y: 0 }}
              style={{ padding: '0.7rem 1.8rem', background: GOLD_BG, color: '#0A0E16', fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '0.85rem', letterSpacing: '0.06em', border: 'none', borderRadius: '0.2rem', cursor: 'pointer' }}>
              Manda il messaggio →
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}
