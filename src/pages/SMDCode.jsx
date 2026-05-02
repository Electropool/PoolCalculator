import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import AdSlot from '../components/AdSlot';

const formatR = (R) => {
  if (R >= 1e9) return `${(R/1e9).toFixed(3)} GΩ`;
  if (R >= 1e6) return `${(R/1e6).toFixed(3)} MΩ`;
  if (R >= 1e3) return `${(R/1e3).toFixed(3)} kΩ`;
  return `${R.toFixed(3)} Ω`;
};

const EIA96 = [100,102,105,107,110,113,115,118,121,124,127,130,133,137,140,143,147,150,154,158,162,165,169,174,178,182,187,191,196,200,205,210,215,221,226,232,237,243,249,255,261,267,274,280,287,294,301,309,316,324,332,340,348,357,365,374,383,392,402,412,422,432,442,453,464,475,487,499,511,523,536,549,562,576,590,604,619,634,649,665,681,698,715,732,750,768,787,806,825,845,866,887,909,931,953,976];
const EIA96_MULT = {'Z':0.001,'Y':0.01,'X':0.1,'A':1,'B':10,'C':100,'D':1000,'E':10000,'F':100000};

function decodeSMD(code) {
  if (!code) return null;
  code = code.trim().toUpperCase();
  if (code === '0' || code === '000' || code === '0000') return { val: 0, note: 'Jumper' };
  if (code.includes('R')) return { val: parseFloat(code.replace('R', '.')), note: 'R-Notation' };
  if (code.length === 3 && /^\d{2}[A-F]$/.test(code)) {
    const idx = parseInt(code.substring(0,2)) - 1;
    const mult = EIA96_MULT[code[2]];
    if (idx >= 0 && idx < 96 && mult !== undefined) return { val: EIA96[idx] * mult, note: 'EIA-96 (1%)' };
  }
  if (/^\d{3}$/.test(code)) {
    const sig = parseInt(code.substring(0,2)), exp = parseInt(code[2]);
    return { val: sig * Math.pow(10, exp), note: '3-Digit' };
  }
  if (/^\d{4}$/.test(code)) {
    const sig = parseInt(code.substring(0,3)), exp = parseInt(code[3]);
    return { val: sig * Math.pow(10, exp), note: '4-Digit' };
  }
  return null;
}

export default function SMDCode() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    const res = decodeSMD(code);
    if (res) setResult(res);
    else setError('Unrecognized code. Try: 103, 4R7, 01C');
  };

  return (
    <>
      <SEOHead
        title="SMD Resistor Code Calculator – 3 & 4 Digit, EIA-96 | PoolCalculator"
        description="Decode SMD resistor codes (3-digit, 4-digit, and EIA-96). Enter the code on the resistor to find its value in Ohms instantly."
        keywords="smd resistor code, smd calculator, eia-96 code, 3 digit smd code, 4 digit smd code"
        canonical="/smd-code"
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>SMD Resistor Code Calculator</h1>
            <p>Decode 3-digit, 4-digit, and EIA-96 SMD resistor codes to find their resistance value.</p>
          </div>

          <div className="calc-layout">
            <div className="card">
              <div className="section-title">Enter SMD Code</div>
              <div className="input-group">
                <label>SMD Marking (e.g. 103, 4702, 01C)</label>
                <input
                  type="text" value={code}
                  onChange={e => { setCode(e.target.value); setResult(null); setError(''); }}
                  placeholder="e.g. 103"
                  onKeyDown={e => e.key === 'Enter' && calculate()}
                  style={{fontSize:'24px',textAlign:'center',letterSpacing:'0.1em'}}
                />
              </div>
              {error && <p style={{color:'var(--error)',fontSize:'13px',marginBottom:'12px'}}>{error}</p>}
              <button className="btn-primary" onClick={calculate}>Decode SMD</button>
              <div style={{marginTop:'24px'}}>
                <div className="section-title">Quick Examples</div>
                <div style={{display:'flex',flexWrap:'wrap',gap:'8px'}}>
                  {['103','4702','01C','100','R10'].map(ex => (
                    <button key={ex} className="btn-secondary" onClick={() => { setCode(ex); calculate(); }}>{ex}</button>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-image-container">
              <img src="/images/calculator_resistor.png" alt="SMD Resistor Examples" className="hero-img" />
            </div>
          </div>

          {result && (
            <div className="result-section">
              <div className="card">
                <div className="section-title">Decoded Resistance</div>
                <div className="result-box">
                  <div className="result-item highlight">
                    <span className="result-label">Resistance Value</span>
                    <span className="result-value" style={{fontSize:'28px'}}>{formatR(result.val)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Marking Type</span>
                    <span className="result-value" style={{color:'var(--text-secondary)'}}>{result.note}</span>
                  </div>
                </div>
              </div>
              <AdSlot type="inline" />
            </div>
          )}

          <div className="description-section card">
            <div className="description-layout">
              <div className="description-image">
                <img src="/images/calculator_descrip_resistor.png" alt="How to read SMD resistors" />
              </div>
              <div className="description-text">
                <div className="section-title">Reading SMD Resistor Codes</div>
                <p>Surface Mount (SMD) resistors use small codes because of their size. There are three main systems: 3-digit, 4-digit, and EIA-96.</p>
                <div className="formula-box">
                  <h3>3 and 4 Digit Systems</h3>
                  <p>The first digits are the value, and the last digit is the multiplier (number of zeros).</p>
                  <code>103 = 10 × 10³ = 10,000 Ω (10kΩ)</code>
                </div>
                <div className="example-box">
                  <h3>EIA-96 (1% Precision)</h3>
                  <p>Uses a 2-digit code for the value followed by a letter for the multiplier.</p>
                  <code>01C = 100 × 100 = 10,000 Ω (10kΩ)</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
