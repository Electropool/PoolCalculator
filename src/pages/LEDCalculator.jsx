import React, { useState } from 'react';
import SEOHead from '../components/SEOHead';
import AdSlot from '../components/AdSlot';

export default function LEDCalculator() {
  const [vs, setVs] = useState('');
  const [vf, setVf] = useState('');
  const [current, setCurrent] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);
    const vsNum = parseFloat(vs);
    const vfNum = parseFloat(vf);
    const iNum = parseFloat(current);
    if (isNaN(vsNum) || isNaN(vfNum) || isNaN(iNum) || iNum <= 0) {
      setError('Please enter valid positive numbers for all fields.');
      return;
    }
    if (vfNum >= vsNum) {
      setError('Supply voltage must be greater than LED forward voltage.');
      return;
    }
    const iA = iNum / 1000;
    const R = (vsNum - vfNum) / iA;
    const P = (vsNum - vfNum) * iA;
    const standard = getStandardResistor(R);
    setResult({ R, P, standard, iA });
  };

  const getStandardResistor = (R) => {
    const e24 = [1.0,1.1,1.2,1.3,1.5,1.6,1.8,2.0,2.2,2.4,2.7,3.0,3.3,3.6,3.9,4.3,4.7,5.1,5.6,6.2,6.8,7.5,8.2,9.1];
    const decades = [1,10,100,1000,10000,100000,1000000];
    let closest = null, minDiff = Infinity;
    for (const d of decades) {
      for (const v of e24) {
        const val = v * d;
        const diff = Math.abs(val - R);
        if (diff < minDiff) { minDiff = diff; closest = val; }
      }
    }
    return closest;
  };

  const formatR = (R) => {
    if (R >= 1000000) return `${(R/1000000).toFixed(2)} MΩ`;
    if (R >= 1000) return `${(R/1000).toFixed(2)} kΩ`;
    return `${R.toFixed(1)} Ω`;
  };

  const clear = () => { setVs(''); setVf(''); setCurrent(''); setResult(null); setError(''); };

  return (
    <>
      <SEOHead
        title="LED Resistor Calculator Online – Free Tool | PoolCalculator"
        description="Calculate the required series resistor value for your LED circuit. Enter supply voltage, LED forward voltage, and forward current to get resistor value and power rating."
        keywords="LED resistor calculator, LED series resistor, forward voltage calculator, LED current limiting resistor"
        canonical="/led-calculator"
      />
      <div className="page-wrapper">
        <div className="container">
          <div className="page-header">
            <h1>LED Resistor Calculator</h1>
            <p>Find the correct current-limiting resistor for any LED circuit. Enter your circuit parameters below.</p>
          </div>

          <div className="calc-layout">
            <div className="card">
              <div className="section-title">Circuit Parameters</div>
              <div className="input-group">
                <label>Supply Voltage (Vs)</label>
                <input type="number" value={vs} onChange={e => setVs(e.target.value)} placeholder="e.g. 5" />
              </div>
              <div className="input-group">
                <label>LED Forward Voltage (Vf)</label>
                <input type="number" value={vf} onChange={e => setVf(e.target.value)} placeholder="e.g. 2.0" />
              </div>
              <div className="input-group">
                <label>LED Forward Current (mA)</label>
                <input type="number" value={current} onChange={e => setCurrent(e.target.value)} placeholder="e.g. 20" />
              </div>
              {error && <p style={{color:'var(--error)', fontSize:'13px', marginBottom:'12px'}}>{error}</p>}
              <div style={{display:'flex',gap:'10px'}}>
                <button className="btn-primary" onClick={calculate}>Calculate</button>
                <button className="btn-secondary" onClick={clear}>Clear</button>
              </div>
            </div>

            <div className="hero-image-container">
              <img src="/images/calculator_resistorforled.png" alt="LED Resistor Illustration" className="hero-img" />
            </div>
          </div>

          {result && (
            <div className="result-section">
              <div className="card">
                <div className="section-title">Results</div>
                <div className="result-box">
                  <div className="result-item highlight">
                    <span className="result-label">Recommended Resistor</span>
                    <span className="result-value">{formatR(result.standard)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Exact Resistance</span>
                    <span className="result-value" style={{fontSize:'16px'}}>{formatR(result.R)}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Power Dissipation</span>
                    <span className="result-value">{(result.P * 1000).toFixed(2)} mW</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Min Rating</span>
                    <span className="result-value" style={{color:'var(--warning)'}}>{result.P < 0.125 ? '⅛W' : result.P < 0.25 ? '¼W' : result.P < 0.5 ? '½W' : '1W+'}</span>
                  </div>
                </div>
              </div>
              <AdSlot type="inline" />
            </div>
          )}

          <div className="description-section card">
            <div className="description-layout">
              <div className="description-image">
                <img src="/images/calculator_descrip_resistorforled.png" alt="LED Resistor Formula" />
              </div>
              <div className="description-text">
                <div className="section-title">How to Calculate LED Resistors</div>
                <p>
                  To protect an LED from burning out, a series resistor must be used to limit the current. 
                  The value of this resistor depends on the supply voltage, the LED's forward voltage (which varies by color), 
                  and the desired forward current (typically 20mA).
                </p>
                <div className="formula-box">
                  <h3>The Formula</h3>
                  <code>R = (V<sub>supply</sub> - V<sub>led</sub>) / I<sub>led</sub></code>
                  <p style={{marginTop:'8px'}}>Power (P) = I² × R</p>
                </div>
                <div className="example-box">
                  <h3>Example</h3>
                  <p>For a 5V supply, a Red LED (2V), and 20mA (0.02A) current:</p>
                  <code>R = (5 - 2) / 0.02 = 150 Ω</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
