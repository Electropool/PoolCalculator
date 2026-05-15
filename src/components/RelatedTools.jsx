import React from 'react';
import { Link } from 'react-router-dom';

const ALL_TOOLS = [
  { path: '/resistor-color-code', icon: '🌈', title: 'Resistor Color Code', desc: '4, 5 & 6 band decoder' },
  { path: '/led-calculator',      icon: '💡', title: 'LED Resistor Calc',   desc: 'Series resistor finder' },
  { path: '/smd-code',            icon: '⬛', title: 'SMD Resistor Code',   desc: '3-digit, 4-digit, EIA-96' },
  { path: '/capacitor-code',      icon: '🔋', title: 'Capacitor Code',      desc: 'pF, nF, µF converter' },
  { path: '/inductor-code',       icon: '🌀', title: 'Inductor Calculator', desc: 'Axial & SMD decoder' },
];

export default function RelatedTools({ currentPath }) {
  const others = ALL_TOOLS.filter(t => t.path !== currentPath);
  return (
    <section style={{ marginTop: '60px', paddingTop: '40px', borderTop: '1px solid var(--border-subtle)' }}>
      <div className="section-label">Related Calculators</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px,1fr))', gap: '16px', marginTop: '20px' }}>
        {others.map(tool => (
          <Link key={tool.path} to={tool.path} style={{
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '16px', background: 'var(--bg-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)', textDecoration: 'none',
            transition: 'var(--transition)'
          }}>
            <span style={{ fontSize: '24px' }}>{tool.icon}</span>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '2px' }}>{tool.title}</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{tool.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
