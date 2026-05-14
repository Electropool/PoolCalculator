import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import AdSlot from '../components/AdSlot';

const TOLERANCE_CODES = {
  'B':'±0.1pF','C':'±0.25pF','D':'±0.5pF','E':'±0.5%','F':'±1%',
  'G':'±2%','H':'±3%','J':'±5%','K':'±10%','M':'±20%','Z':'+80%/-20%'
};

// VOLTAGE_CODES removed as it was unused

function formatC(pF) {
  if (pF >= 1e6) return `${(pF/1e6).toFixed(3)} µF`;
  if (pF >= 1000) return `${(pF/1000).toFixed(3)} nF`;
  return `${pF.toFixed(3)} pF`;
}

function decodeCapacitor(code) {
  code = code.trim().toUpperCase();
  // EIA/Ceramic 3-char (e.g. 104, 473)
  if (/^\d{3}$/.test(code)) {
    const sig = parseInt(code.substring(0,2));
    const exp = parseInt(code[2]);
    if (exp === 8) return { pF: sig * 0.01, note: 'Ceramic (EIA)' };
    if (exp === 9) return { pF: sig * 0.1, note: 'Ceramic (EIA)' };
    return { pF: sig * Math.pow(10, exp), note: 'Ceramic (EIA)' };
  }
  // 4-digit (e.g. 1000)
  if (/^\d{4}$/.test(code)) {
    const sig = parseInt(code.substring(0,3));
    const exp = parseInt(code[3]);
    return { pF: sig * Math.pow(10, exp), note: 'Ceramic (EIA 4-digit)' };
  }
  // With tolerance/voltage suffix e.g. 104K, 104K50
  if (/^\d{3}[A-Z]/.test(code)) {
    const numPart = code.substring(0,3);
    const tolCode = code[3];
    const sig = parseInt(numPart.substring(0,2));
    const exp = parseInt(numPart[2]);
    const pF = sig * Math.pow(10, exp);
    const tol = TOLERANCE_CODES[tolCode] || '';
    return { pF, tol, note: 'Ceramic (EIA)' };
  }
  // pF direct (e.g. 470p, 47n, 1u, 0.1u)
  if (/^[\d.]+[PNUµ]?F?$/.test(code)) {
    const m = code.match(/^([\d.]+)([PNUµ]?)F?$/);
    if (m) {
      const v = parseFloat(m[1]);
      const u = m[2];
      if (u === 'P' || u === '') return { pF: v, note: 'Direct pF' };
      if (u === 'N') return { pF: v * 1000, note: 'Direct nF' };
      if (u === 'U' || u === 'µ') return { pF: v * 1e6, note: 'Direct µF' };
    }
  }
  return null;
}

export default function CapacitorCode() {
  const [searchParams] = useSearchParams();
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [type, setType] = useState('ceramic');

  useEffect(() => {
    const t = searchParams.get('type');
    if (t === 'film' || t === 'ceramic') setType(t);
  }, [searchParams]);

  const calculate = () => {
    setError('');
    const res = decodeCapacitor(code);
    if (res) setResult(res);
    else setError('Unrecognized code. Try: 104, 473, 222J');
  };

  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Capacitor Code Calculator",
    "url": "https://poolcalculator.electropool.online/capacitor-code",
    "description": "Decode ceramic, film, and polyester capacitor markings. Converts pF, nF, and µF values instantly.",
    "applicationCategory": "EducationalApplication",
    "operatingSystem": "All"
  };

  return (
    <>
      <SEOHead
        title={`${type.charAt(0).toUpperCase() + type.slice(1)} Capacitor Code Calculator | PoolCalculator`}
        description={`Decode ${type} capacitor codes like 104, 473. Quick reference for capacitor identification and values.`}
        keywords={`${type} capacitor, capacitor code, electronics calculator, pF nF µF`}
        canonical="/capacitor-code"
        schema={schema}
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>{type.charAt(0).toUpperCase() + type.slice(1)} Capacitor Code Calculator</h1>
            <p>Decode the marking on your {type} capacitor to find its capacitance value.</p>
          </div>

          <div className="calc-layout">
            <div className="card">
              <div className="section-title">Change Mode</div>
              <select value={type} onChange={e => setType(e.target.value)} style={{marginBottom:'24px', width:'100%'}}>
                <option value="ceramic">Ceramic Capacitor</option>
                <option value="film">Film Capacitor</option>
                <option value="smd">SMD Capacitor</option>
              </select>

              <div className="section-title">Enter Capacitor Code</div>
              <div className="input-group">
                <label>Code (e.g. 104, 222J)</label>
                <input
                  type="text" value={code}
                  onChange={e => { setCode(e.target.value); setResult(null); setError(''); }}
                  placeholder="e.g. 104"
                  onKeyDown={e => e.key === 'Enter' && calculate()}
                  style={{fontSize:'24px',textAlign:'center',letterSpacing:'0.1em'}}
                />
              </div>
              {error && <p style={{color:'var(--error)',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <button className="btn-primary" onClick={calculate}>Decode Code</button>
              
              <div style={{marginTop:'24px'}}>
                <div className="section-title">Popular Examples</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {['104','473','222J','101','471'].map(ex => (
                    <button key={ex} className="btn-secondary" onClick={() => { setCode(ex); calculate(); }}>
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-image-container">
              <img src={type === 'smd' ? '/images/calculator_capacitor.png' : '/images/calculator_capacitor.png'} alt="Capacitor Illustration" className="hero-img" loading="lazy" width="400" height="300" />
            </div>
          </div>

          {result && (
            <div className="result-section">
              <div className="card">
                <div className="section-title">Decoded Value</div>
                <div className="result-box">
                  <div className="result-item highlight">
                    <span className="result-label">Capacitance</span>
                    <span className="result-value" style={{fontSize:'28px'}}>{formatC(result.pF)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">In Nanofarads (nF)</span>
                    <span className="result-value">{(result.pF/1000).toFixed(4)} nF</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">In Microfarads (µF)</span>
                    <span className="result-value">{(result.pF/1e6).toFixed(7)} µF</span>
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
                <img src="/images/calculator_descrip_capacitor.png" alt="Capacitor Identification chart" loading="lazy" width="600" height="400" />
              </div>
              <div className="description-text">
                <div className="section-title">Capacitor Identification Guide</div>
                <p>
                  Capacitors often use a 3-digit code to represent their value in picofarads (pF). 
                  The first two digits are the significant figures, and the third is the multiplier (number of zeros).
                </p>
                <div className="formula-box">
                  <h3>The Formula</h3>
                  <code>Value (pF) = XY × 10<sup>Z</sup></code>
                  <p style={{marginTop:'8px', fontSize:'14px'}}>Where XY are the first two digits and Z is the third.</p>
                </div>
                <div className="example-box">
                  <h3>Common Types</h3>
                  <p><strong>Ceramic:</strong> Usually small, disc-shaped, low cost. Code: 104 = 100nF.</p>
                  <p><strong>Polyester:</strong> Box or dipped shape, better stability. Code: 222 = 2.2nF.</p>
                  <p><strong>Film:</strong> Precision capacitors, often yellow or grey boxes. Used in audio and power circuits.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
