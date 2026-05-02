import React, { useState, useEffect } from 'react';
import SEOHead from '../components/SEOHead';
import SMDCode from './SMDCode';
import AdSlot from '../components/AdSlot';

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
  const [mode, setMode] = useState('4-band'); // 4-band, 5-band, 6-band, smd
  const [sel, setSel] = useState({ b1: 'Brown', b2: 'Black', b3: 'Black', b4: 'Red', b5: 'Gold', b6: 'Brown' });
  const [valInput, setValInput] = useState('');
  const [result, setResult] = useState(null);
  const [matchStatus, setMatchStatus] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const m = params.get('bands');
    if (m === '4') setMode('4-band');
    else if (m === '5') setMode('5-band');
    else if (m === '6') setMode('6-band');
    else if (m === 'smd') setMode('smd');
  }, [window.location.search]);

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

  return (
    <>
      <SEOHead
        title={`${mode.toUpperCase()} Resistor Calculator | PoolCalculator`}
        description={`Decode ${mode} resistor color codes. High precision calculation for electronics.`}
        keywords="resistor calculator, color code, 4 band, 5 band, 6 band"
        canonical="/resistor-color-code"
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>{mode.replace('-',' ').toUpperCase()} Resistor Calculator</h1>
          </div>

          <div className="calc-layout">
            <div className="card">
              <div className="section-title">Change Mode</div>
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
                <ColorSelect bandKey={mode === '4-band' ? 'b4' : 'b4'} label="Multiplier" options={multColors} />
                <ColorSelect bandKey="b5" label="Tolerance" options={tolColors} />
                {mode === '6-band' && <ColorSelect bandKey="b6" label="Temp. Coeff." options={tempColors} />}
              </div>

              <div style={{marginTop:'32px'}}>
                <div className="section-title">Bidirectional Check</div>
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
              <img src="/images/calculator_resistor.png" alt="Resistor" className="hero-img" />
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
              <div className="description-image"><img src="/images/calculator_descrip_resistor.png" alt="How to read" /></div>
              <div className="description-text">
                <div className="section-title">How to Read Bands</div>
                <p>Read from the end with the closest band. The first bands are digits, then multiplier, then tolerance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
