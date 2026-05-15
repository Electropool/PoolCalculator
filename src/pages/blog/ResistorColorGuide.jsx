import React from 'react';
import { Link } from 'react-router-dom';
import SEOHead from '../../components/SEOHead';
import RelatedTools from '../../components/RelatedTools';
import './blog.css';

export default function ResistorColorGuide() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "How to Read Resistor Color Codes: Complete Beginner Guide",
    "description": "A comprehensive guide to decoding 4-band and 5-band resistor color codes. Learn the mnemonic tricks and how to identify resistance, multiplier, and tolerance.",
    "author": { "@type": "Organization", "name": "PoolCalculator" },
    "datePublished": "2026-05-10",
    "image": "https://poolcalculator.electropool.online/images/calculator_resistor.png",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is the mnemonic for resistor color codes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The most popular mnemonic is 'Bad Beer Rots Out Your Guts But Vodka Goes Well' (Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White)."
          }
        },
        {
          "@type": "Question",
          "name": "What does a gold band mean on a resistor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A gold band in the tolerance position means the resistor has a tolerance of ±5%."
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title="How to Read Resistor Color Codes: Complete Beginner Guide | PoolCalc"
        description="Master the resistor color code chart. Learn how to decode 4-band and 5-band resistors, memory tricks, and common resistor values for electronics projects."
        keywords="how to read resistor color code, resistor color code chart, 4 band resistor, 5 band resistor, resistor decoder, resistor color chart"
        canonical="/blog/how-to-read-resistor-color-codes"
        schema={schema}
      />
      <div className="page-wrapper">
        <article className="article-container">
          <header className="article-header">
            <h1>How to Read Resistor Color Codes</h1>
            <div className="article-meta">Published on May 10, 2026 • 15 min read</div>
          </header>

          <div className="article-content">
            <p>Resistors are the most common components in electronics, but they are often too small to have their value printed in numbers. Instead, they use a system of <strong>colored bands</strong> to indicate their resistance value in Ohms. In this guide, we'll teach you exactly how to read these bands for 4-band and 5-band resistors.</p>

            <h2>The Resistor Color Code Chart</h2>
            <p>Each color represents a number from 0 to 9. The order of colors follows the rainbow (mostly), which makes it easier to remember.</p>
            <table style={{width:'100%', borderCollapse:'collapse', margin:'24px 0', border:'1px solid var(--border-subtle)'}}>
              <thead>
                <tr style={{background:'rgba(0,212,255,0.1)'}}>
                  <th style={{padding:'10px', border:'1px solid var(--border-subtle)'}}>Color</th>
                  <th style={{padding:'10px', border:'1px solid var(--border-subtle)'}}>Digit</th>
                  <th style={{padding:'10px', border:'1px solid var(--border-subtle)'}}>Multiplier</th>
                  <th style={{padding:'10px', border:'1px solid var(--border-subtle)'}}>Tolerance</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>⚫ Black</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>0</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>1</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🟤 Brown</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>1</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>10</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±1%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🔴 Red</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>2</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>100</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±2%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🟠 Orange</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>3</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>1k</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🟡 Yellow</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>4</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>10k</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🟢 Green</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>5</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>100k</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±0.5%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🔵 Blue</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>6</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>1M</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±0.25%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🟣 Violet</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>7</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>10M</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±0.1%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>⚪ Grey</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>8</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±0.05%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>⚪ White</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>9</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>🟡 Gold</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>0.1</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±5%</td></tr>
                <tr><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>⚪ Silver</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>-</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>0.01</td><td style={{padding:'8px', border:'1px solid var(--border-subtle)'}}>±10%</td></tr>
              </tbody>
            </table>

            <h2>How to Decode a 4-Band Resistor</h2>
            <p>A 4-band resistor is the most common type. Here is how to read it:</p>
            <ol>
              <li><strong>Band 1 (Leftmost):</strong> First significant digit.</li>
              <li><strong>Band 2:</strong> Second significant digit.</li>
              <li><strong>Band 3:</strong> Multiplier (Number of zeros to add).</li>
              <li><strong>Band 4 (Isolated):</strong> Tolerance (The gap between bands is usually larger before this band).</li>
            </ol>
            <div className="highlight-box">
              <strong>Example:</strong> Brown, Black, Red, Gold
              <br />1 (Brown), 0 (Black), ×100 (Red) = 1,000 Ω (1kΩ). Tolerance: ±5% (Gold).
            </div>

            <h2>How to Decode a 5-Band Resistor</h2>
            <p>Precision resistors use 5 bands for more accuracy.</p>
            <ol>
              <li><strong>Band 1, 2, and 3:</strong> Significant digits.</li>
              <li><strong>Band 4:</strong> Multiplier.</li>
              <li><strong>Band 5:</strong> Tolerance.</li>
            </ol>

            <div className="cta-box">
              <h3>Quick Decoding Tool</h3>
              <p>Forget the chart? Use our interactive 4, 5, and 6 band resistor calculator to get the value in seconds.</p>
              <Link to="/resistor-color-code" className="btn-primary" style={{display:'inline-block', textDecoration:'none'}}>Open Resistor Calculator →</Link>
            </div>

            <div className="highlight-box">
              <strong>Pro Tip:</strong> For high-precision applications, engineers often use 5-band or 6-band resistors. You can find the full IEC standard for color coding on <a href="https://en.wikipedia.org/wiki/Electronic_color_code" target="_blank" rel="noopener noreferrer" style={{color:'var(--accent)'}}>Wikipedia's Electronic Color Code guide</a>.
            </div>

            <h2>Which Way Do I Read?</h2>
            <p>Always hold the resistor so that the single isolated band (usually Gold, Silver, or a wider gap) is on the <strong>right</strong>. Start reading from the <strong>left</strong>.</p>

            <h2>Popular Mnemonic Tricks</h2>
            <p>Students have used many mnemonics to remember the order: <strong>Black, Brown, Red, Orange, Yellow, Green, Blue, Violet, Grey, White</strong>.</p>
            <ul>
              <li><strong>B</strong>ig <strong>B</strong>rown <strong>R</strong>abbits <strong>O</strong>ften <strong>Y</strong>ield <strong>G</strong>reat <strong>B</strong>ig <strong>V</strong>ocal <strong>G</strong>runts <strong>W</strong>hen <strong>G</strong>ripped.</li>
              <li><strong>B</strong>ad <strong>B</strong>eer <strong>R</strong>ots <strong>O</strong>ut <strong>Y</strong>our <strong>G</strong>uts <strong>B</strong>ut <strong>V</strong>odka <strong>G</strong>oes <strong>W</strong>ell.</li>
            </ul>
          </div>

          <RelatedTools currentPath="/blog/how-to-read-resistor-color-codes" />
        </article>
      </div>
    </>
  );
}
