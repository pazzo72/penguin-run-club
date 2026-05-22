'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const GOLD_BG = 'linear-gradient(160deg, #E8D08A 0%, #C9A55A 30%, #A07830 55%, #D4B06A 80%, #F0DC9A 100%)';
const GOLD_TEXT = { background: GOLD_BG, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' } as React.CSSProperties;

/* ── Button token (sfondo scuro → outline oro) ───────── */
const BTN_DARK: React.CSSProperties = {
  alignSelf: 'center',
  padding: '0.8rem 2.2rem',
  background: 'transparent',
  border: '1px solid rgba(201,165,90,0.5)',
  borderRadius: 0,
  color: '#C9A55A',
  fontFamily: 'var(--serif)',
  fontSize: '0.78rem', fontWeight: 500, fontStyle: 'normal',
  letterSpacing: '0.2em', textTransform: 'uppercase',
  cursor: 'pointer',
};

function InstagramIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" /></svg>);
}
function StravaIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" /></svg>);
}
function WhatsAppIcon() {
  return (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>);
}

const socialLinks = [
  { label: 'Instagram', icon: <InstagramIcon />, href: '#' },
  { label: 'Strava',    icon: <StravaIcon />,    href: '#' },
  { label: 'WhatsApp',  icon: <WhatsAppIcon />,  href: '#' },
];

export default function Community() {
  const [email, setEmail] = useState('');
  return (
    <section id="community" style={{ padding: '10rem 0', background: '#0A0E16' }}>
      <div className="max-w-3xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.8 }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase', display: 'block', marginBottom: '2rem', ...GOLD_TEXT }}>
            — Community
          </span>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(2rem,4.5vw,3.5rem)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, letterSpacing: '-0.02em', color: 'rgba(255,255,255,0.88)' }}>
            Unisciti alla nostra community.
          </h2>
          <p style={{ fontFamily: 'var(--serif)', fontSize: '1.15rem', fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.42)', marginTop: '1.5rem' }}>
            Solitari, ma mai soli.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1px', margin: '4rem 0', background: 'rgba(201,165,90,0.1)' }}>
          {socialLinks.map((s, i) => (
            <motion.a key={i} href={s.href} aria-label={s.label}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', padding: '2rem 1.5rem', background: '#0A0E16', color: 'rgba(255,255,255,0.45)', textDecoration: 'none', transition: 'color 0.3s' }}
              whileHover={{ color: '#C9A55A' }}>
              {s.icon}
              <span style={{ fontFamily: 'var(--serif)', fontSize: '0.62rem', fontWeight: 500, letterSpacing: '0.22em', textTransform: 'uppercase' }}>{s.label}</span>
            </motion.a>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.7, delay: 0.35 }}>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '26rem', margin: '0 auto' }}>
            <input type="email" placeholder="La tua email" value={email} onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 0', fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1rem', background: 'transparent', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.18)', color: 'rgba(255,255,255,0.85)', outline: 'none' }}
              onFocus={(e) => (e.currentTarget.style.borderBottomColor = '#C9A55A')}
              onBlur={(e)  => (e.currentTarget.style.borderBottomColor = 'rgba(255,255,255,0.18)')} />
            <motion.button type="submit"
              whileHover={{ borderColor: '#C9A55A', backgroundColor: 'rgba(201,165,90,0.06)', y: -1 }}
              whileTap={{ y: 0 }}
              style={BTN_DARK}>
              Entra nel branco →
            </motion.button>
          </form>
        </motion.div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.5 }}
          style={{ marginTop: '2rem', fontFamily: 'var(--serif)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          Niente spam. Solo run.
        </motion.p>
      </div>
    </section>
  );
}
