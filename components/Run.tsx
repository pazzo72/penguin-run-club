'use client';

import { motion } from 'framer-motion';

const GOLD_BG = 'linear-gradient(160deg, #E8D08A 0%, #C9A55A 30%, #A07830 55%, #D4B06A 80%, #F0DC9A 100%)';
const GOLD_TEXT = { background: GOLD_BG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as React.CSSProperties;

const events = [
  { title: 'Domenica Solitaria',  distance: '10K', location: 'Parco della Caffarella, Roma', time: '07:30', note: null,       badge: null,           highlighted: false },
  { title: 'La Grande Migrazione',distance: '21K', location: 'Appia Antica, Roma',           time: '06:00', note: null,       badge: 'Run del mese', highlighted: true  },
  { title: 'Verso la Montagna',   distance: '42K', location: 'Monti Simbruini',              time: '05:30', note: 'Solo per chi ha già completato un run con il club.', badge: null, highlighted: false },
];

export default function Run() {
  return (
    <section id="run" style={{ padding: '10rem 0', background: '#F5F0E8' }}>
      <div className="max-w-5xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8 }}
          style={{ display: 'flex', alignItems: 'center', gap: '2rem', marginBottom: '5rem' }}>
          <div style={{ flex: 1, height: '1px', background: 'rgba(10,14,22,0.1)' }} />
          <span style={{ fontFamily: 'var(--serif)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(10,14,22,0.35)', whiteSpace: 'nowrap' }}>
            I prossimi run
          </span>
          <div style={{ flex: 1, height: '1px', background: 'rgba(10,14,22,0.1)' }} />
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(290px,1fr))', gap: '1px', background: 'rgba(10,14,22,0.08)' }}>
          {events.map((ev, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: i * 0.1 }}
              style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', background: ev.highlighted ? '#0A0E16' : '#FDFAF5', position: 'relative' }}
              whileHover={{ y: -3, boxShadow: '0 12px 40px rgba(10,14,22,0.08)' }}>

              {ev.badge && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <span style={{ fontFamily: 'var(--serif)', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', ...GOLD_TEXT }}>
                    {ev.badge}
                  </span>
                </div>
              )}

              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem', marginBottom: '0.5rem' }}>
                <span style={{
                  fontFamily: 'var(--serif)', fontSize: '3rem', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.02em',
                  ...(ev.highlighted ? GOLD_TEXT : { color: 'rgba(10,14,22,0.88)' }),
                }}>{ev.distance}</span>
                <span style={{ fontFamily: 'var(--serif)', fontSize: '1.1rem', fontWeight: 300, fontStyle: 'italic', color: ev.highlighted ? 'rgba(255,255,255,0.8)' : 'rgba(10,14,22,0.7)' }}>
                  {ev.title}
                </span>
              </div>

              <p style={{ fontFamily: 'var(--serif)', fontSize: '0.85rem', fontWeight: 300, letterSpacing: '0.02em', color: ev.highlighted ? 'rgba(255,255,255,0.4)' : 'rgba(10,14,22,0.4)', marginBottom: '0.2rem' }}>
                {ev.location}
              </p>
              <p style={{ fontFamily: 'var(--serif)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.04em', color: ev.highlighted ? 'rgba(255,255,255,0.6)' : 'rgba(10,14,22,0.5)', marginBottom: '2rem' }}>
                {ev.time}
              </p>

              {ev.note && (
                <p style={{ fontFamily: 'var(--serif)', fontSize: '0.8rem', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.5, color: ev.highlighted ? 'rgba(255,255,255,0.3)' : 'rgba(10,14,22,0.35)', marginBottom: '1.5rem' }}>
                  {ev.note}
                </p>
              )}

              <div style={{ marginTop: 'auto' }}>
                <motion.button whileHover={{ opacity: 0.88, y: -1 }} whileTap={{ opacity: 1, y: 0 }}
                  style={{
                    width: '100%', padding: '0.75rem 1rem', borderRadius: '0.2rem',
                    fontFamily: 'var(--serif)', fontSize: '0.85rem', fontWeight: 400, fontStyle: 'italic', letterSpacing: '0.06em',
                    cursor: 'pointer',
                    background: ev.highlighted ? GOLD_BG : 'transparent',
                    color: ev.highlighted ? '#0A0E16' : 'rgba(10,14,22,0.88)',
                    border: ev.highlighted ? 'none' : '1px solid rgba(10,14,22,0.2)',
                  }}>
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
