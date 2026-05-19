'use client';

const links = [
  { label: 'Storia',    href: '#storia'    },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Run',       href: '#run'       },
  { label: 'Community', href: '#community' },
  { label: 'Contatti',  href: '#contatti'  },
];

const socials = [
  { label: 'Instagram', href: '#' },
  { label: 'Strava',    href: '#' },
  { label: 'WhatsApp',  href: '#' },
];

export default function Footer() {
  const hov = (e: React.MouseEvent<HTMLAnchorElement>) =>
    (e.currentTarget.style.color = 'rgba(255,255,255,0.7)');
  const lea = (e: React.MouseEvent<HTMLAnchorElement>) =>
    (e.currentTarget.style.color = 'rgba(255,255,255,0.3)');

  return (
    <footer style={{ padding: '5rem 0 3rem', background: '#0A0E16', borderTop: '1px solid rgba(201,165,90,0.1)' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto auto',
          gap: '3rem',
          alignItems: 'start',
          paddingBottom: '3rem',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>

          {/* Brand */}
          <div>
            <p style={{
              fontFamily: 'var(--serif)',
              fontSize: '1.5rem',
              fontWeight: 300,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: 'rgba(255,255,255,0.55)',
              marginBottom: '0.5rem',
            }}>
              Penguin Run Club
            </p>
            <span style={{
              fontFamily: 'var(--serif)',
              fontSize: '0.65rem',
              fontWeight: 500,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(201,165,90,0.4)',
            }}>Be the penguin.</span>
          </div>

          {/* Nav */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none', paddingTop: '0.25rem' }}>
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '0.82rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={hov}
                  onMouseLeave={lea}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Socials */}
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', listStyle: 'none', paddingTop: '0.25rem' }}>
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '0.82rem',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.3)',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={hov}
                  onMouseLeave={lea}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p style={{
          paddingTop: '2rem',
          textAlign: 'center',
          fontFamily: 'var(--serif)',
          fontSize: '0.6rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.15)',
        }}>
          © 2025 Penguin Run Club — All rights reserved
        </p>
      </div>
    </footer>
  );
}
