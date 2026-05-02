import React, { useState } from 'react';
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
  const [type, setType] = useState('axial'); // axial (normal/helical) or smd
  const [sel, setSel] = useState({ b1: 'Brown', b2: 'Black', b3: 'Black', b4: 'Gold' });
  const [smdCode, setSmdCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    if (t === 'smd') setType('smd');
    else if (t === 'helical' || t === 'axial') setType('axial');
  }, [window.location.search]);

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

  return (
    <>
      <SEOHead
        title={`${type.toUpperCase()} Inductor Calculator | PoolCalculator`}
        description={`Calculate ${type} inductor values instantly. Decode color bands or SMD markings.`}
        keywords="inductor calculator, smd inductor, axial inductor, color code"
        canonical="/inductor-code"
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
              <img src={type === 'smd' ? '/images/calculator_descrip_resistor.png' : '/images/calculator_inductor.png'} alt="Inductor" className="hero-img" />
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
                <img src="/images/calculator_descrip_inductor.png" alt="Inductor Info" />
              </div>
              <div className="description-text">
                <div className="section-title">Inductor Identification</div>
                <p>Inductors come in various packages. Axial inductors use color bands while SMD inductors use numeric codes.</p>
                <div className="formula-box">
                  <h3>{type === 'smd' ? 'SMD Code' : 'Axial Formula'}</h3>
                  {type === 'smd' ? (
                    <p>Digits + Multiplier. 101 = 100 µH. 4R7 = 4.7 µH.</p>
                  ) : (
                    <p>Value (µH) = (Digit 1 Digit 2) × Multiplier</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
