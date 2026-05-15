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
        title="Free Electronics Calculators – Resistor, LED, Capacitor & Inductor | PoolCalc"
        description="Free online electronics calculators for students and engineers. Resistor color codes, LED resistor values, SMD codes, capacitor decoders. Instant results, no signup."
        keywords="electronics calculator, free electronics tools, resistor calculator, LED resistor calculator, capacitor calculator, inductor calculator, SMD resistor code, electronics engineering tools, online electronics calculator"
        canonical="/"
        schema={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "name": "PoolCalculator",
              "alternateName": "PoolCalc",
              "url": "https://poolcalculator.electropool.online",
              "description": "Free online electronics calculators for resistors, LEDs, capacitors, and inductors.",
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": "https://poolcalculator.electropool.online/resistor-color-code?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
              }
            },
            {
              "@type": "Organization",
              "name": "PoolCalculator",
              "url": "https://poolcalculator.electropool.online",
              "logo": "https://poolcalculator.electropool.online/android-chrome-512x512.png",
              "sameAs": ["https://discord.gg/QbCcpKCZPF"],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer support",
                "email": "arpankar077@gmail.com"
              }
            },
            {
              "@type": "ItemList",
              "name": "Free Electronics Calculators",
              "description": "A complete collection of free online electronics calculators",
              "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Resistor Color Code Calculator", "url": "https://poolcalculator.electropool.online/resistor-color-code"},
                {"@type": "ListItem", "position": 2, "name": "LED Resistor Calculator", "url": "https://poolcalculator.electropool.online/led-calculator"},
                {"@type": "ListItem", "position": 3, "name": "SMD Resistor Code Calculator", "url": "https://poolcalculator.electropool.online/smd-code"},
                {"@type": "ListItem", "position": 4, "name": "Capacitor Code Calculator", "url": "https://poolcalculator.electropool.online/capacitor-code"},
                {"@type": "ListItem", "position": 5, "name": "Inductor Color Code Calculator", "url": "https://poolcalculator.electropool.online/inductor-code"}
              ]
            }
          ]
        }}
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

        <section className="seo-content-section" style={{
          padding: '60px 0',
          borderTop: '1px solid var(--border-subtle)'
        }}>
          <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '16px', color: 'var(--text-primary)' }}>
            Free Electronics Calculators for Engineers & Students
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>
            PoolCalculator provides a complete suite of free online electronics calculators designed
            for hobbyists, students, and professional electrical engineers. Whether you need to decode
            a resistor color code, calculate the correct series resistor for an LED circuit, decode
            surface-mount (SMD) component markings, or identify capacitor and inductor values — our
            tools deliver instant, accurate results without any registration or downloads.
          </p>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
            What Can You Calculate?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>
            Our <Link to="/resistor-color-code" style={{ color: 'var(--accent)' }}>Resistor Color Code Calculator</Link> supports
            4-band, 5-band, and 6-band resistors including temperature coefficient decoding. The
            bidirectional mode lets you input a resistance value and instantly see the corresponding
            color bands — perfect for students learning electronics fundamentals.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>
            Our <Link to="/led-calculator" style={{ color: 'var(--accent)' }}>LED Resistor Calculator</Link> calculates
            the exact series resistor needed to safely drive any LED from any supply voltage (3.3V,
            5V, 9V, 12V). It automatically suggests the nearest E24 standard resistor value and
            calculates power dissipation, helping you choose the right wattage rating.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>
            The <Link to="/smd-code" style={{ color: 'var(--accent)' }}>SMD Resistor Code Calculator</Link> decodes
            all surface-mount resistor markings including 3-digit codes, 4-digit codes, EIA-96 codes
            (01A format), and R-notation values (4R7 = 4.7Ω). Essential for PCB repair and component
            identification.
          </p>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '20px', fontSize: '15px' }}>
            Identify capacitor values with our <Link to="/capacitor-code" style={{ color: 'var(--accent)' }}>Capacitor Code Calculator</Link>,
            which converts 3-digit ceramic capacitor codes to picofarads, nanofarads, and microfarads.
            The <Link to="/inductor-code" style={{ color: 'var(--accent)' }}>Inductor Calculator</Link> handles
            both axial (color-coded) and SMD inductors, giving results in µH, mH, or H.
          </p>
          <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '12px', color: 'var(--text-primary)' }}>
            Why Use PoolCalculator?
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', fontSize: '15px' }}>
            Unlike complex simulation software, PoolCalculator focuses on giving you the specific
            answer you need in seconds. All calculations run locally in your browser — no data is
            sent to any server, and no account is required. The site works on mobile, tablet, and
            desktop, making it the ideal companion for bench work, lectures, and exam preparation.
            Used by electronics students, Arduino hobbyists, PCB designers, and professional
            electrical engineers worldwide.
          </p>
        </section>

        <div className="container">
          <AdSlot type="inline" />
        </div>
      </div>
    </>
  );
}
