'use client';

import { motion } from 'framer-motion';

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
    <section id="storia" className="py-40" style={{ background: '#0D1B2A' }}>
      <div className="max-w-3xl mx-auto px-8">
        <motion.h2
          className="text-5xl md:text-6xl tracking-tighter font-bold mb-16"
          style={{ color: 'rgba(255,255,255,0.92)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
        >
          Penguin Run Club
        </motion.h2>

        <div className="space-y-7">
          {paragraphs.map((text, i) => (
            <motion.p
              key={i}
              className="text-lg leading-loose"
              style={{ color: 'rgba(255,255,255,0.68)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
            >
              {text}
            </motion.p>
          ))}

          <motion.p
            className="text-3xl md:text-4xl font-bold pt-8"
            style={{ color: 'rgba(255,255,255,0.92)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Be the penguin.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
