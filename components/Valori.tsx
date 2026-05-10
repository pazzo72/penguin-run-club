'use client';

import { motion } from 'framer-motion';

const cards = [
  {
    title: 'Corri da solo.',
    body: 'Nessun ritmo imposto, nessuna pressione esterna. Il tuo passo è il tuo ritmo. La tua respirazione, il tuo metronomo.',
    icon: '◦',
  },
  {
    title: 'Scegli la tua distanza.',
    body: '5K o 50K, ogni passo conta uguale. Non esistono percorsi giusti o sbagliati — esiste solo quello che sei pronto ad affrontare oggi.',
    icon: '◦',
  },
];

export default function Valori() {
  return (
    <section className="py-32" style={{ background: '#0D1B2A' }}>
      <div className="max-w-5xl mx-auto px-8">
        <motion.h2
          className="text-4xl md:text-5xl tracking-tighter font-bold mb-16 text-center"
          style={{ color: 'rgba(255,255,255,0.92)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Come corriamo.
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {cards.map((card, i) => (
            <motion.div
              key={i}
              className="group rounded-2xl p-8 transition-all duration-300 cursor-default"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '0.5px solid rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              whileHover={{
                backgroundColor: 'rgba(255,255,255,0.07)',
                borderColor: 'rgba(255,255,255,0.22)',
              }}
            >
              <div className="mb-6 text-2xl" style={{ color: '#2C4A6E' }}>{card.icon}</div>
              <h3 className="text-xl font-bold tracking-tight mb-3" style={{ color: 'rgba(255,255,255,0.92)' }}>
                {card.title}
              </h3>
              <p className="text-base leading-relaxed" style={{ color: 'rgba(255,255,255,0.58)' }}>
                {card.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
