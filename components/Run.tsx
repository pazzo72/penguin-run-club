'use client';

import { motion } from 'framer-motion';

const events = [
  {
    title: 'Domenica Solitaria',
    distance: '10K',
    location: 'Parco della Caffarella, Roma',
    time: '07:30',
    note: null,
    badge: null,
    highlighted: false,
  },
  {
    title: 'La Grande Migrazione',
    distance: '21K',
    location: 'Appia Antica, Roma',
    time: '06:00',
    note: null,
    badge: 'Run del mese',
    highlighted: true,
  },
  {
    title: 'Verso la Montagna',
    distance: '42K',
    location: 'Monti Simbruini',
    time: '05:30',
    note: 'Solo per chi ha già completato un run con il club.',
    badge: null,
    highlighted: false,
  },
];

export default function Run() {
  return (
    <section id="run" className="py-32" style={{ background: '#F0F4F7' }}>
      <div className="max-w-5xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl tracking-tighter font-bold mb-16 text-center"
          style={{ color: 'rgba(13,27,42,0.92)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          I prossimi run.
        </motion.h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {events.map((ev, i) => (
            <motion.div
              key={i}
              className="rounded-2xl p-8 flex flex-col"
              style={{
                background: ev.highlighted ? '#FFFFFF' : '#FFFFFF',
                border: ev.highlighted
                  ? '1.5px solid #2C4A6E'
                  : '1px solid rgba(13,27,42,0.1)',
                boxShadow: ev.highlighted ? '0 0 32px rgba(44,74,110,0.12)' : 'none',
              }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
            >
              {ev.badge && (
                <span
                  className="inline-block self-start mb-4 px-3 py-1 rounded-full text-xs font-semibold tracking-wide text-white"
                  style={{ background: '#E8733A' }}
                >
                  {ev.badge}
                </span>
              )}

              <div className="flex items-baseline gap-3 mb-2">
                <span
                  className="text-3xl font-bold tracking-tight"
                  style={{ color: ev.highlighted ? '#2C4A6E' : 'rgba(13,27,42,0.9)' }}
                >
                  {ev.distance}
                </span>
                <span className="text-lg font-semibold tracking-tight" style={{ color: 'rgba(13,27,42,0.85)' }}>
                  {ev.title}
                </span>
              </div>

              <p className="text-sm mb-1" style={{ color: 'rgba(13,27,42,0.5)' }}>
                {ev.location}
              </p>
              <p className="text-sm font-medium mb-6" style={{ color: 'rgba(13,27,42,0.6)' }}>
                {ev.time}
              </p>

              {ev.note && (
                <p className="text-xs mb-5 leading-relaxed" style={{ color: 'rgba(13,27,42,0.4)' }}>
                  {ev.note}
                </p>
              )}

              <div className="mt-auto">
                <motion.button
                  className="w-full py-3 rounded-xl text-sm font-semibold tracking-wide transition-all"
                  style={
                    ev.highlighted
                      ? {
                          background: '#2C4A6E',
                          color: '#FFFFFF',
                          boxShadow: '0 0 20px rgba(44,74,110,0.27)',
                        }
                      : {
                          background: 'transparent',
                          color: '#2C4A6E',
                          border: '1.5px solid #2C4A6E',
                        }
                  }
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Partecipo
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
