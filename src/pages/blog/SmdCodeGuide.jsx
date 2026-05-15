import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import RelatedTools from '../../components/RelatedTools';
import './blog.css';

export default function SmdCodeGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "Understanding EIA-96 SMD Resistor Codes: Complete Reference",
    "description": "A technical guide to decoding the EIA-96 marking system used on precision 1% SMD resistors. Includes the full lookup table and multiplier codes.",
    "author": { "@type": "Organization", "name": "PoolCalculator" },
    "datePublished": "2026-05-05",
    "image": "https://poolcalculator.electropool.online/images/calculator_descrip_resistor.png",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is EIA-96?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "EIA-96 is a marking system for 1% tolerance SMD resistors. it uses a 3-character code: two digits for the value and one letter for the multiplier."
          }
        },
        {
          "@type": "Question",
          "name": "What does 01C mean in EIA-96?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "In EIA-96, '01' corresponds to a base value of 100, and 'C' is a multiplier of 100. So 01C = 100 x 100 = 10,000 Ohms (10kΩ)."
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="Understanding EIA-96 SMD Resistor Codes: Complete Reference | PoolCalc"
        description="Decode precision 1% SMD resistors with this EIA-96 guide. Full lookup table, multiplier letters, and examples for 0603 and 0805 packages."
        keywords="EIA-96 SMD code, SMD resistor marking, precision resistor code, 1% resistor code, SMD code lookup"
        canonical="/blog/eia-96-smd-resistor-code-guide"
        schema={schema}
      />
      <div className="page-wrapper">
        <article className="article-container">
          <header className="article-header">
            <h1>Understanding EIA-96 SMD Resistor Codes</h1>
            <div className="article-meta">Published on May 5, 2026 • 18 min read</div>
          </header>

          <div className="article-content">
            <p>If you've ever looked at a modern PCB, you've seen tiny black components with codes like <strong>"01C"</strong> or <strong>"47A"</strong>. These aren't just random numbers; they are part of the <strong>EIA-96</strong> marking system used for high-precision 1% tolerance SMD resistors.</p>

            <h2>Why EIA-96?</h2>
            <p>The standard 3-digit and 4-digit systems work well for 5% and 1% resistors respectively, but as components get smaller (like the 0603 package), there isn't enough space to print 4 digits clearly. The EIA-96 system allows a high-precision 3-digit value to be represented using only 3 characters. This system is defined by the <a href="https://en.wikipedia.org/wiki/E_series_of_preferred_numbers" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)'}}>E series of preferred numbers</a>.</p>

            <h2>How the Code Works</h2>
            <p>An EIA-96 code consists of two digits followed by a letter:</p>
            <ol>
              <li><strong>The Digits (01 to 96):</strong> These are a "pointer" to a base value in a lookup table. There are 96 base values in the E96 series.</li>
              <li><strong>The Letter:</strong> This is the multiplier (the power of ten).</li>
            </ol>

            <div className="highlight-box">
              <strong>Example: 01C</strong>
              <br />01 = 100 (from table)
              <br />C = ×100 (multiplier)
              <br />Result: 100 × 100 = 10,000 Ω (10kΩ).
            </div>

            <h2>The Multiplier Letters</h2>
            <table style={{width:'100%', borderCollapse:'collapse', margin:'24px 0', border:'1px solid var(--border-subtle)'}}>
              <thead>
                <tr style={{background:'rgba(0,212,255,0.1)'}}>
                  <th style={{padding:'10px', border:'1px solid var(--border-subtle)'}}>Letter</th>
                  <th style={{padding:'10px', border:'1px solid var(--border-subtle)'}}>Multiplier</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>Z</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>0.001</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>Y or R</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>0.01</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>X or S</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>0.1</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>A</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>1</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>B or H</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>10</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>C</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>100</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>D</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>1,000</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>E</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>10,000</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>F</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>100,000</td></tr>
              </tbody>
            </table>

            <div className="cta-box">
              <h3>Decode Any SMD Code Instantly</h3>
              <p>Our SMD calculator supports 3-digit, 4-digit, and the full EIA-96 system. Just type the code and get the Ohms.</p>
              <Link to="/smd-code" className="btn-primary" style={{display:'inline-block', textDecoration:'none'}}>Open SMD Decoder →</Link>
            </div>

            <h2>Wait, What About 3-Digit and 4-Digit Codes?</h2>
            <p>EIA-96 is only for 1% precision resistors. Most standard 5% resistors still use the 3-digit system:</p>
            <ul>
              <li><strong>3-Digit:</strong> First two are digits, third is multiplier. (103 = 10kΩ)</li>
              <li><strong>4-Digit:</strong> First three are digits, fourth is multiplier. (1002 = 10kΩ)</li>
              <li><strong>R-Notation:</strong> The 'R' is the decimal point. (4R7 = 4.7Ω)</li>
            </ul>

            <h2>Summary</h2>
            <p>Understanding EIA-96 is essential for professional PCB repair and design. While it might seem complex at first, having a lookup table or a reliable online calculator makes it a breeze to identify even the tiniest precision components.</p>
          </div>

          <RelatedTools currentPath="/blog/eia-96-smd-resistor-code-guide" />
        </article>
      </div>
    </>
  );
}
