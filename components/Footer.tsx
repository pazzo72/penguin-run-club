'use client';

const links = [
  { label: 'Storia', href: '#storia' },
  { label: 'Manifesto', href: '#manifesto' },
  { label: 'Run', href: '#run' },
  { label: 'Community', href: '#community' },
  { label: 'Contatti', href: '#contatti' },
];

const socials = [
  { label: 'IG', href: '#' },
  { label: 'Strava', href: '#' },
  { label: 'WA', href: '#' },
];

export default function Footer() {
  return (
    <footer className="py-16" style={{ background: '#0D1B2A' }}>
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 pb-10" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div>
            <p className="font-bold tracking-widest text-sm uppercase mb-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Penguin Run Club
            </p>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.2)' }}>
              Be the penguin.
            </p>
          </div>

          <ul className="flex flex-wrap gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs tracking-wide transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <ul className="flex gap-5">
            {socials.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  className="text-xs tracking-widest transition-colors"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.7)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="pt-8 text-center text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>
          © 2025 Penguin Run Club.
        </p>
      </div>
    </footer>
  );
}
