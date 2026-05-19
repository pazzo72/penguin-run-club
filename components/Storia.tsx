'use client';

import { motion } from 'framer-motion';

const GOLD_BG = 'linear-gradient(160deg, #E8D08A 0%, #C9A55A 30%, #A07830 55%, #D4B06A 80%, #F0DC9A 100%)';
const GOLD_TEXT = { background: GOLD_BG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as React.CSSProperties;

const paragraphs = [
  "C'è un momento preciso, nella vita di ogni pinguino imperatore, in cui qualcosa cambia.",
  "Il branco cammina. Lo ha sempre fatto. Centinaia di corpi che si muovono nella stessa direzione, per la stessa ragione, allo stesso ritmo. È sicuro. È caldo. È quello che si fa.",
  "Ma ogni tanto — non spesso, non sempre — uno si ferma.",
  "Non perché sia stanco. Non perché abbia paura. Si ferma perché ha visto qualcosa che gli altri non hanno visto ancora: una montagna, in lontananza. Imponente. Silenziosa. Sua.",
  "E in quel silenzio artico, in mezzo al niente bianco, prende una direzione diversa.",
  "Noi siamo quei pinguini.",
  "Siamo i corridori che non hanno bisogno di un pettorale per sentirsi atleti. Che non cercano il podio, cercano l'orizzonte. Che escono di casa quando fa ancora buio non perché qualcuno li aspetti, ma perché quella montagna — la loro montagna — non aspetta.",
  "Il Penguin Run Club non è una squadra. Non è una gara. È uno spazio per chi ha capito che correre da soli non significa correre senza uno scopo — significa correre verso qualcosa di più grande.",
  "Ogni passo che fai lontano dal branco è un passo verso te stesso.",
];

export default function Storia() {
  return (
    <section id="storia" style={{ padding: '11rem 0 10rem', background: '#0A0E16' }}>
      <div className="max-w-3xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: '2rem', ...GOLD_TEXT }}>
            — La nostra storia
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2.5rem,5vw,4rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.88)', marginBottom: '4rem' }}>
            Penguin Run Club
          </h2>
        </motion.div>

        <div className="space-y-7">
          {paragraphs.map((text, i) => (
            <motion.p key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: i * 0.04 }}
              style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', lineHeight: 1.85, fontWeight: i===5 ? 500 : 300, fontStyle: i===5 ? 'italic' : 'normal', color: i===5 ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.62)' }}>
              {text}
            </motion.p>
          ))}

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8, delay: 0.4 }}
            style={{ paddingTop: '3rem', borderTop: '1px solid rgba(201,165,90,0.15)', marginTop: '1rem' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.88)' }}>
              Be the penguin.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
