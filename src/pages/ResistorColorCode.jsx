import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import SMDCode from './SMDCode';
import AdSlot from '../components/AdSlot';
import RelatedTools from '../components/RelatedTools';

const COLORS = [
  { name: 'Black',  hex: '#1a1a1a', digit: 0, multiplier: 1,       tolerance: null,  tempco: 250 },
  { name: 'Brown',  hex: '#7B3F00', digit: 1, multiplier: 10,      tolerance: '±1%', tempco: 100 },
  { name: 'Red',    hex: '#CC0000', digit: 2, multiplier: 100,     tolerance: '±2%', tempco: 50  },
  { name: 'Orange', hex: '#FF8C00', digit: 3, multiplier: 1000,    tolerance: null,  tempco: 15  },
  { name: 'Yellow', hex: '#FFD700', digit: 4, multiplier: 10000,   tolerance: null,  tempco: 25  },
  { name: 'Green',  hex: '#228B22', digit: 5, multiplier: 100000,  tolerance: '±0.5%', tempco: 20 },
  { name: 'Blue',   hex: '#0000CD', digit: 6, multiplier: 1000000, tolerance: '±0.25%', tempco: 10 },
  { name: 'Violet', hex: '#8B008B', digit: 7, multiplier: 10000000,tolerance: '±0.1%', tempco: 5  },
  { name: 'Grey',   hex: '#808080', digit: 8, multiplier: 100000000,tolerance:'±0.05%',tempco: 1  },
  { name: 'White',  hex: '#E8E8E8', digit: 9, multiplier: 1000000000, tolerance: null, tempco: null },
  { name: 'Gold',   hex: '#CFB53B', digit: null, multiplier: 0.1,  tolerance: '±5%', tempco: null },
  { name: 'Silver', hex: '#C0C0C0', digit: null, multiplier: 0.01, tolerance: '±10%',tempco: null },
];

const digitColors = COLORS.filter(c => c.digit !== null);
const multColors  = COLORS.filter(c => c.multiplier !== null);
const tolColors   = COLORS.filter(c => c.tolerance !== null);
const tempColors  = COLORS.filter(c => c.tempco !== null);

const formatR = (R) => {
  if (R >= 1e9) return `${(R/1e9).toFixed(3)} GΩ`;
  if (R >= 1e6) return `${(R/1e6).toFixed(3)} MΩ`;
  if (R >= 1e3) return `${(R/1e3).toFixed(3)} kΩ`;
  return `${R.toFixed(3)} Ω`;
};

export default function ResistorColorCode() {
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState('4-band');
  const [sel, setSel] = useState({ b1: 'Brown', b2: 'Black', b3: 'Black', b4: 'Red', b5: 'Gold', b6: 'Brown' });
  const [valInput, setValInput] = useState('');
  const [result, setResult] = useState(null);
  const [matchStatus, setMatchStatus] = useState(null);

  useEffect(() => {
    const m = searchParams.get('bands');
    if (m === '4') setMode('4-band');
    else if (m === '5') setMode('5-band');
    else if (m === '6') setMode('6-band');
    else if (m === 'smd') setMode('smd');
  }, [searchParams]);

  const handleBand = (band, colorName) => {
    setSel(s => ({ ...s, [band]: colorName }));
    setResult(null);
    setMatchStatus(null);
  };

  const calculate = () => {
    const c = (name) => COLORS.find(c => c.name === name);
    let val, tol, tc;
    
    if (mode === '4-band') {
      const [b1,b2,b4,b5] = [c(sel.b1), c(sel.b2), c(sel.b4), c(sel.b5)];
      val = (b1.digit * 10 + b2.digit) * b4.multiplier;
      tol = b5.tolerance;
    } else if (mode === '5-band') {
      const [b1,b2,b3,b4,b5] = [c(sel.b1),c(sel.b2),c(sel.b3),c(sel.b4),c(sel.b5)];
      val = (b1.digit*100 + b2.digit*10 + b3.digit) * b4.multiplier;
      tol = b5.tolerance;
    } else if (mode === '6-band') {
      const [b1,b2,b3,b4,b5,b6] = [c(sel.b1),c(sel.b2),c(sel.b3),c(sel.b4),c(sel.b5),c(sel.b6)];
      val = (b1.digit*100 + b2.digit*10 + b3.digit) * b4.multiplier;
      tol = b5.tolerance;
      tc = b6.tempco;
    }
    setResult({ val, tol, tc });

    if (valInput !== '') {
      const numVal = parseFloat(valInput);
      if (Math.abs(numVal - val) < 0.01) setMatchStatus('match');
      else {
        setMatchStatus('mismatch');
        valueToColor(numVal);
      }
    }
  };

  const valueToColor = (val) => {
    if (!val || isNaN(val)) return;
    let d1, d2, d3, mult;
    if (mode === '4-band') {
      let exp = Math.floor(Math.log10(val)) - 1;
      let sig = Math.round(val / Math.pow(10, exp));
      if (sig >= 100) { sig /= 10; exp += 1; }
      d1 = Math.floor(sig / 10); d2 = sig % 10; mult = Math.pow(10, exp);
      const b1 = COLORS.find(c => c.digit === d1)?.name;
      const b2 = COLORS.find(c => c.digit === d2)?.name;
      const b4 = COLORS.find(c => c.multiplier === mult || Math.abs(c.multiplier - mult) < 0.001)?.name;
      if (b1 && b2 && b4) setSel(s => ({ ...s, b1, b2, b4, b5: 'Gold' }));
    } else {
      let exp = Math.floor(Math.log10(val)) - 2;
      let sig = Math.round(val / Math.pow(10, exp));
      if (sig >= 1000) { sig /= 10; exp += 1; }
      d1 = Math.floor(sig / 100); d2 = Math.floor((sig % 100) / 10); d3 = sig % 10; mult = Math.pow(10, exp);
      const b1 = COLORS.find(c => c.digit === d1)?.name;
      const b2 = COLORS.find(c => c.digit === d2)?.name;
      const b3 = COLORS.find(c => c.digit === d3)?.name;
      const b4 = COLORS.find(c => c.multiplier === mult || Math.abs(c.multiplier - mult) < 0.001)?.name;
      if (b1 && b2 && b3 && b4) setSel(s => ({ ...s, b1, b2, b3, b4, b5: 'Brown' }));
    }
  };

  const ColorSelect = ({ bandKey, label, options }) => (
    <div className="input-group">
      <label>{label}</label>
      <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
        <select value={sel[bandKey] || ''} onChange={e => handleBand(bandKey, e.target.value)} style={{flex:1}}>
          {options.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
        </select>
        <div style={{width:'28px',height:'28px',borderRadius:'6px',background:COLORS.find(c=>c.name===sel[bandKey])?.hex,border:'1px solid var(--border)',flexShrink:0}} />
      </div>
    </div>
  );

  if (mode === 'smd') return <SMDCode />;

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Resistor Color Code Calculator",
    "url": "https://poolcalculator.electropool.online/resistor-color-code",
    "description": "Decode 4, 5, and 6 band resistor color codes instantly with high precision.",
    "applicationCategory": "Education",
    "operatingSystem": "All",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How do I read a resistor color code?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "To read a resistor color code, identify the bands from left to right. The first few bands represent the digits, followed by a multiplier band, and finally a tolerance band. The end with the bands closer together is typically the starting point."
          }
        },
        {
          "@type": "Question",
          "name": "What is the difference between 4-band and 5-band resistors?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A 4-band resistor uses the first two bands for digits, the third for the multiplier, and the fourth for tolerance. A 5-band resistor uses the first three bands for digits, the fourth for the multiplier, and the fifth for tolerance, allowing for higher precision."
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title={`${mode === '4-band' ? '4-Band' : mode === '5-band' ? '5-Band' : mode === '6-band' ? '6-Band' : 'SMD'} Resistor Color Code Calculator | PoolCalc`}
        description={`Decode ${mode.replace('-band', ' band')} resistor color codes instantly. Find resistance value, tolerance${mode === '6-band' ? ', and temperature coefficient' : ''}. Free online resistor calculator.`}
        keywords="resistor color code calculator, resistor calculator, 4 band resistor, 5 band resistor, resistor value calculator, resistor color decoder, resistor band calculator, resistor tolerance calculator, EIA color code"
        canonical="/resistor-color-code"
        schema={schema}
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>{mode.replace('-',' ').toUpperCase()} Resistor Calculator</h1>
          </div>

          <div className="calc-layout">
            <div className="card">
              <h2 className="section-title">Change Mode</h2>
              <select value={mode} onChange={e => setMode(e.target.value)} style={{marginBottom:'24px', width:'100%'}}>
                <option value="4-band">4-Band Color Code</option>
                <option value="5-band">5-Band Color Code</option>
                <option value="6-band">6-Band Color Code</option>
                <option value="smd">SMD Resistor Code</option>
              </select>

              <div className="band-selectors">
                <ColorSelect bandKey="b1" label="Band 1" options={digitColors} />
                <ColorSelect bandKey="b2" label="Band 2" options={digitColors} />
                {mode !== '4-band' && <ColorSelect bandKey="b3" label="Band 3" options={digitColors} />}
                <ColorSelect bandKey="b4" label="Multiplier" options={multColors} />
                <ColorSelect bandKey="b5" label="Tolerance" options={tolColors} />
                {mode === '6-band' && <ColorSelect bandKey="b6" label="Temp. Coeff." options={tempColors} />}
              </div>

              <div style={{marginTop:'32px'}}>
                <h2 className="section-title">Bidirectional Check</h2>
                <div className="input-group">
                  <label>Resistance Value (Ω)</label>
                  <div style={{position:'relative'}}>
                    <input 
                      type="number" 
                      value={valInput}
                      placeholder="e.g. 1000" 
                      onChange={e => { setValInput(e.target.value); setMatchStatus(null); }}
                      style={{ borderColor: matchStatus === 'match' ? 'var(--success)' : matchStatus === 'mismatch' ? 'var(--warning)' : '' }}
                    />
                    {matchStatus === 'match' && <span style={{position:'absolute', right:'12px', top:'50%', transform:'translateY(-50%)', color:'var(--success)', fontWeight:'700'}}>✓ Right Option</span>}
                  </div>
                </div>
              </div>
              <button className="btn-primary" onClick={calculate} style={{marginTop:'12px'}}>Decode & Validate</button>
            </div>

            <div className="hero-image-container">
              <picture>
                <source srcSet="/images/calculator_resistor.webp" type="image/webp" />
                <img src="/images/calculator_resistor.png" alt="Resistor color code bands: digit, multiplier, tolerance" className="hero-img" loading="lazy" width="400" height="300" />
              </picture>
            </div>
          </div>

          {result && (
            <div className="result-section">
              <div className="card">
                <div className="section-title">Results</div>
                <div className="result-box">
                  <div className="result-item highlight">
                    <span className="result-label">Total Resistance</span>
                    <span className="result-value">{formatR(result.val)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Tolerance</span>
                    <span className="result-value" style={{color:'var(--warning)'}}>{result.tol}</span>
                  </div>
                </div>
              </div>
              <AdSlot type="inline" />
            </div>
          )}

          <div className="description-section card">
            <div className="description-layout">
              <div className="description-image">
                <picture>
                  <source srcSet="/images/calculator_descrip_resistor.webp" type="image/webp" />
                  <img src="/images/calculator_descrip_resistor.png" alt="How to read resistor color codes chart" loading="lazy" width="600" height="400" />
                </picture>
              </div>
              <div className="description-text">
                <h2 className="section-title">Understanding Resistor Color Codes</h2>
                <p>Resistor color codes are a standardized way to identify the resistance value and tolerance of a resistor. Because resistors are often too small to have numbers printed on them, color-coded bands are used instead.</p>
                
                <h3>How to Read 4-Band Resistors</h3>
                <p>For a 4-band resistor, the first two bands represent the <strong>significant digits</strong>. The third band is the <strong>multiplier</strong> (how many zeros to add), and the fourth band is the <strong>tolerance</strong> (the accuracy of the resistor).</p>
                
                <h3>Precision 5-Band Resistors</h3>
                <p>5-band resistors provide higher precision. The first three bands are digits, the fourth is the multiplier, and the fifth is the tolerance. These are commonly found in high-quality audio equipment and medical devices.</p>
                
                <h2>Frequently Asked Questions</h2>
                <div className="faq-item" style={{marginBottom:'20px'}}>
                  <h3 style={{fontSize:'16px', color:'var(--accent)'}}>Which side do I start reading from?</h3>
                  <p>Usually, the bands are not perfectly centered. Start reading from the end where the bands are closer to each other. Also, the tolerance band (often Gold or Silver) is typically on the far right.</p>
                </div>
                <div className="faq-item" style={{marginBottom:'20px'}}>
                  <h3 style={{fontSize:'16px', color:'var(--accent)'}}>What does the Gold band mean?</h3>
                  <p>A gold band in the 4th position indicates a <strong>5% tolerance</strong>, meaning the actual resistance could be 5% higher or lower than the stated value. Gold in the multiplier position means multiplying by 0.1.</p>
                </div>
                <div className="faq-item">
                  <h3 style={{fontSize:'16px', color:'var(--accent)'}}>What is a 6-band resistor?</h3>
                  <p>A 6-band resistor is like a 5-band one but includes a 6th band for the <strong>Temperature Coefficient</strong>, which indicates how much the resistance changes as the temperature fluctuates.</p>
                </div>
              </div>
            </div>
          </div>
          <RelatedTools currentPath="/resistor-color-code" />
        </div>
      </div>
    </>
  );
}
