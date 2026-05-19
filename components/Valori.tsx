'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Corri da solo.',
    body: 'Nessun ritmo imposto, nessuna pressione esterna. Il tuo passo è il tuo ritmo. La tua respirazione, il tuo metronomo.',
  },
  {
    title: 'Scegli la tua distanza.',
    body: '5K o 50K, ogni passo conta uguale. Non esistono percorsi giusti o sbagliati — esiste solo quello che sei pronto ad affrontare oggi.',
  },
];

export default function Valori() {
  return (
    <section style={{ padding: '10rem 0', background: '#0A0E16' }}>
      <div className="max-w-5xl mx-auto px-8">

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '5rem' }}
        >
          <span style={{
            fontFamily: 'var(--serif)',
            fontSize: '0.7rem',
            fontWeight: 500,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(201,165,90,0.55)',
            whiteSpace: 'nowrap',
          }}>Come corriamo</span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(201,165,90,0.15)' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))', gap: '2px' }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: i * 0.15 }}
              style={{
                padding: '3rem 2.5rem',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(201,165,90,0.1)',
                transition: 'background 0.3s, border-color 0.3s',
              }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.06)',
                borderColor: 'rgba(201,165,90,0.3)',
              }}
            >
              <div style={{ width: '28px', height: '1px', background: '#C9A55A', opacity: 0.6, marginBottom: '2.5rem' }} />
              <h3 style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.75rem',
                fontWeight: 300,
                fontStyle: 'italic',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: 'rgba(255,255,255,0.88)',
                marginBottom: '1.25rem',
              }}>{card.title}</h3>
              <p style={{
                fontFamily: 'var(--serif)',
                fontSize: '1.05rem',
                fontWeight: 300,
                lineHeight: 1.75,
                color: 'rgba(255,255,255,0.5)',
              }}>{card.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
