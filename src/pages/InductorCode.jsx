import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AdSlot from '../components/AdSlot';

const COLORS = [
  { name: 'Black',  hex: '#1a1a1a', digit: 0, multiplier: 1,      tolerance: null },
  { name: 'Brown',  hex: '#7B3F00', digit: 1, multiplier: 10,     tolerance: '±1%' },
  { name: 'Red',    hex: '#CC0000', digit: 2, multiplier: 100,    tolerance: '±2%' },
  { name: 'Orange', hex: '#FF8C00', digit: 3, multiplier: 1000,   tolerance: null },
  { name: 'Yellow', hex: '#FFD700', digit: 4, multiplier: 10000,  tolerance: null },
  { name: 'Green',  hex: '#228B22', digit: 5, multiplier: 100000, tolerance: '±0.5%' },
  { name: 'Blue',   hex: '#0000CD', digit: 6, multiplier: 1000000,tolerance: null },
  { name: 'Violet', hex: '#8B008B', digit: 7, multiplier: null,   tolerance: null },
  { name: 'Grey',   hex: '#808080', digit: 8, multiplier: null,   tolerance: null },
  { name: 'White',  hex: '#E8E8E8', digit: 9, multiplier: null,   tolerance: null },
  { name: 'Gold',   hex: '#CFB53B', digit: null, multiplier: 0.1, tolerance: '±5%' },
  { name: 'Silver', hex: '#C0C0C0', digit: null, multiplier: 0.01,tolerance: '±10%' },
];

const digitColors = COLORS.filter(c => c.digit !== null);
const multColors  = COLORS.filter(c => c.multiplier !== null);
const tolColors   = COLORS.filter(c => c.tolerance !== null);

const formatL = (uH) => {
  if (uH >= 1000000) return `${(uH/1000000).toFixed(3)} H`;
  if (uH >= 1000) return `${(uH/1000).toFixed(3)} mH`;
  return `${uH.toFixed(3)} µH`;
};

export default function InductorCode() {
  const [searchParams] = useSearchParams();
  const [type, setType] = useState('axial');
  const [sel, setSel] = useState({ b1: 'Brown', b2: 'Black', b3: 'Black', b4: 'Gold' });
  const [smdCode, setSmdCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const t = searchParams.get('type');
    if (t === 'smd') setType('smd');
    else if (t === 'helical' || t === 'axial') setType('axial');
  }, [searchParams]);

  const handleBand = (band, name) => { setSel(s => ({...s, [band]: name})); setResult(null); };

  const calculateAxial = () => {
    const c = (name) => COLORS.find(c => c.name === name);
    const [b1,b2,b3,b4] = [c(sel.b1),c(sel.b2),c(sel.b3),c(sel.b4)];
    if (!b1||!b2||!b3||!b4) return;
    const uH = (b1.digit * 10 + b2.digit) * b3.multiplier;
    setResult({ uH, tol: b4.tolerance, note: 'Axial Inductor' });
  };

  const calculateSMD = () => {
    setError('');
    const code = smdCode.trim().toUpperCase();
    if (/^\d{3}$/.test(code)) {
      const sig = parseInt(code.substring(0,2));
      const exp = parseInt(code[2]);
      const uH = sig * Math.pow(10, exp);
      setResult({ uH, note: 'SMD Inductor' });
    } else if (code.includes('R')) {
      const uH = parseFloat(code.replace('R', '.'));
      if (!isNaN(uH)) setResult({ uH, note: 'SMD Inductor' });
      else setError('Invalid SMD code');
    } else {
      setError('Invalid SMD code (e.g. 101, 4R7)');
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

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Inductor Color Code Calculator",
    "url": "https://poolcalculator.electropool.online/inductor-code",
    "description": "Calculate inductor values from color bands or SMD numeric codes. High accuracy for electronic circuit design.",
    "applicationCategory": "Tool",
    "operatingSystem": "All",
    "mainEntity": {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How to read axial inductor color codes?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Axial inductors use 4 color bands. The first two bands are digits, the third is the multiplier (in µH), and the fourth is the tolerance."
          }
        },
        {
          "@type": "Question",
          "name": "What does 4R7 mean on an inductor?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "The 'R' acts as a decimal point. So 4R7 means 4.7 µH. Similarly, 100 usually means 10 µH (10 followed by 0 zeros)."
          }
        }
      ]
    }
  };

  return (
    <>
      <SEOHead
        title={`${type.toUpperCase()} Inductor Calculator | PoolCalculator`}
        description={`Calculate ${type} inductor values instantly. Decode color bands or SMD markings with our professional electronics tool.`}
        keywords="inductor calculator, smd inductor, axial inductor, color code, microhenry calculator"
        canonical="/inductor-code"
        schema={schema}
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>{type === 'smd' ? 'SMD' : 'Axial'} Inductor Calculator</h1>
            <p>{type === 'smd' ? 'Decode numeric SMD inductor markings.' : 'Decode 4-band inductor color codes.'}</p>
          </div>

          <div className="calc-layout">
            <div className="card">
              <div className="section-title">Change Mode</div>
              <select value={type} onChange={e => setType(e.target.value)} style={{marginBottom:'24px', width:'100%'}}>
                <option value="axial">Axial Color Code</option>
                <option value="smd">SMD Inductor Code</option>
              </select>

              {type === 'axial' ? (
                <>
                  <div className="section-title">Color Bands</div>
                  <ColorSelect bandKey="b1" label="Band 1" options={digitColors} />
                  <ColorSelect bandKey="b2" label="Band 2" options={digitColors} />
                  <ColorSelect bandKey="b3" label="Multiplier" options={multColors} />
                  <ColorSelect bandKey="b4" label="Tolerance" options={tolColors} />
                  <button className="btn-primary" onClick={calculateAxial} style={{marginTop:'12px'}}>Decode Bands</button>
                </>
              ) : (
                <>
                  <div className="section-title">SMD Marking</div>
                  <div className="input-group">
                    <label>Inductor Code (e.g. 101, 4R7)</label>
                    <input 
                      type="text" value={smdCode} 
                      onChange={e => setSmdCode(e.target.value)} 
                      placeholder="e.g. 101"
                      style={{fontSize:'24px', textAlign:'center'}}
                    />
                  </div>
                  {error && <p style={{color:'var(--error)',fontSize:'13px'}}>{error}</p>}
                  <button className="btn-primary" onClick={calculateSMD} style={{marginTop:'12px'}}>Decode SMD</button>
                </>
              )}
            </div>

            <div className="hero-image-container">
              <img src={type === 'smd' ? '/images/calculator_inductor.png' : '/images/calculator_inductor.png'} alt="Inductor Illustration" className="hero-img" loading="lazy" width="400" height="300" />
            </div>
          </div>

          {result && (
            <div className="result-section">
              <div className="card">
                <div className="section-title">Result</div>
                <div className="result-box">
                  <div className="result-item highlight">
                    <span className="result-label">Inductance</span>
                    <span className="result-value">{formatL(result.uH)}</span>
                  </div>
                  {result.tol && (
                    <div className="result-item">
                      <span className="result-label">Tolerance</span>
                      <span className="result-value" style={{color:'var(--warning)'}}>{result.tol}</span>
                    </div>
                  )}
                </div>
              </div>
              <AdSlot type="inline" />
            </div>
          )}

          <div className="description-section card">
            <div className="description-layout">
              <div className="description-image">
                <img src="/images/calculator_descrip_inductor.png" alt="Inductor Identification guide" loading="lazy" width="600" height="400" />
              </div>
              <div className="description-text">
                <div className="section-title">Inductor Identification Guide</div>
                <p>Inductors come in various packages and use different systems for marking their value. Axial inductors, which look like resistors but are often green, use color bands. SMD (Surface Mount) inductors use numeric codes printed on the top.</p>
                
                <div className="formula-box">
                  <h3>{type === 'smd' ? 'Decoding SMD Codes' : 'Axial Color Formula'}</h3>
                  {type === 'smd' ? (
                    <p>The code typically consists of 3 digits. The first two are significant digits and the third is the multiplier (10^n). For example, <strong>101</strong> is 10 x 10^1 = 100 µH. If there is an <strong>R</strong>, it represents a decimal: 4R7 = 4.7 µH.</p>
                  ) : (
                    <p>Value (µH) = (Digit 1 Digit 2) × Multiplier. The result is always in <strong>Microhenries (µH)</strong>. The 4th band indicates the tolerance percentage.</p>
                  )}
                </div>

                <h2>Educational FAQ</h2>
                <div className="faq-item" style={{marginBottom:'20px'}}>
                  <h3 style={{fontSize:'16px', color:'var(--accent)'}}>What is the unit of measurement?</h3>
                  <p>Inductance is measured in <strong>Henries (H)</strong>. However, most common electronic components are measured in millihenries (mH) or microhenries (µH).</p>
                </div>
                <div className="faq-item" style={{marginBottom:'20px'}}>
                  <h3 style={{fontSize:'16px', color:'var(--accent)'}}>Are inductors and resistors read the same?</h3>
                  <p>Almost. The color code digits are the same, but for inductors, the base unit for the multiplier is microhenries (µH), whereas for resistors, it is ohms (Ω).</p>
                </div>
                <div className="faq-item">
                  <h3 style={{fontSize:'16px', color:'var(--accent)'}}>What is an axial inductor?</h3>
                  <p>An axial inductor is a leaded component that looks very similar to a resistor. You can often tell them apart by their color (many inductors are light green or blue) and their slightly more rounded shape compared to resistors.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
