import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AdSlot from '../components/AdSlot';
import './Home.css';

const tools = [
  {
    path: '/resistor-color-code',
    icon: '🌈',
    title: 'Resistor Color Code',
    desc: 'Decode 4-band, 5-band, and 6-band resistor color codes to find resistance and tolerance.',
    tags: ['Resistor', '4-Band', '5-Band']
  },
  {
    path: '/led-calculator',
    icon: '💡',
    title: 'LED Resistor Calculator',
    desc: 'Calculate the required series resistor for your LED circuit based on supply voltage.',
    tags: ['LED', 'Resistor', 'E24']
  },
  {
    path: '/smd-code',
    icon: '⬛',
    title: 'SMD Resistor Code',
    desc: 'Decode surface-mount resistor markings including 3-digit, 4-digit, and EIA-96 codes.',
    tags: ['SMD', 'Precision', 'EIA-96']
  },
  {
    path: '/capacitor-code',
    icon: '🔋',
    title: 'Capacitor Code',
    desc: 'Decode ceramic, polyester, and film capacitor markings into pF, nF, and µF.',
    tags: ['Capacitor', 'Ceramic', 'pF']
  },
  {
    path: '/inductor-code',
    icon: '🌀',
    title: 'Inductor Code',
    desc: 'Calculate inductor values and tolerance from color bands.',
    tags: ['Inductor', 'µH', '4-Band']
  }
];

export default function Home() {
  return (
    <>
      <SEOHead
        title="PoolCalculator – Fast & Simple Electronics Calculators"
        description="Free online electronics tools for students, hobbyists, and engineers. Resistor color codes, LED calculators, Ohm's law, and more."
        keywords="electronics calculator, resistor calculator, led resistor calculator, ohms law, voltage divider, smd code"
        canonical="/"
      />
      <div className="home-hero">
        <div className="container">
          <div className="hero-badge">Free Electronics Tools</div>
          <h1>Electronics Calculators<br /><span className="hero-accent">for Everyone</span></h1>
          <p>A collection of fast, accurate calculators for resistors, capacitors, inductors, LEDs, and more. No signup. No bloat. Just results.</p>
          <div className="hero-stats">
            <div className="stat"><span className="stat-num">7</span><span className="stat-label">Calculators</span></div>
            <div className="stat"><span className="stat-num">100%</span><span className="stat-label">Free</span></div>
            <div className="stat"><span className="stat-num">0</span><span className="stat-label">Signup</span></div>
          </div>
        </div>
      </div>

      <div className="container">
        <section className="tools-section">
          <div className="section-label">All Calculators</div>
          <div className="tool-grid">
            {tools.map(tool => (
              <Link to={tool.path} key={tool.path} className="tool-card">
                <div className="tool-icon">{tool.icon}</div>
                <div className="tool-info">
                  <h3>{tool.title}</h3>
                  <p>{tool.desc}</p>
                  <div className="tool-tags">
                    {tool.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                </div>
                <div className="tool-arrow">→</div>
              </Link>
            ))}
          </div>
        </section>

        <section className="why-section">
          <div className="section-label">Why PoolCalculator?</div>
          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon">🚀</div>
              <h4>Instant Results</h4>
              <p>Calculations happen in real-time as you type. No page reloads, no waiting.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">📱</div>
              <h4>Works Everywhere</h4>
              <p>Fully responsive design that works perfectly on phones, tablets, and desktops.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🎓</div>
              <h4>Educational</h4>
              <p>Each calculator explains the formula used, so you learn while you calculate.</p>
            </div>
            <div className="why-card">
              <div className="why-icon">🔒</div>
              <h4>Privacy First</h4>
              <p>No accounts, no data collection. Everything runs in your browser.</p>
            </div>
          </div>
        </section>

        <div className="container">
          <AdSlot type="inline" />
        </div>
      </div>
    </>
  );
}
