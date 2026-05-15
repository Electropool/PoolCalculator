import React from 'react';
import { Link } from 'react-router-dom';
import AdSlot from './AdSlot';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-bg-blur" style={{ backgroundImage: "url('/images/calculator_resistor.png')" }} />
      <div className="container">
        <AdSlot type="footer" />
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">⚡ PoolCalculator</div>
            <p>Free online electronics calculators for students, hobbyists, and engineers. Fast, accurate, and always free.</p>
            <div className="footer-contact">
              <a href="mailto:arpankar077@gmail.com" className="contact-link">📧 arpankar077@gmail.com</a>
              <a href="https://discord.gg/QbCcpKCZPF" target="_blank" rel="noopener noreferrer" className="contact-link">💬 Join our Discord</a>
            </div>
          </div>
          <div className="footer-col">
            <h4>Calculators</h4>
            <ul>
              <li><Link to="/led-calculator">LED Resistor</Link></li>
              <li><Link to="/resistor-color-code">Resistor Color Code</Link></li>
              <li><Link to="/smd-code">SMD Resistor Code</Link></li>
              <li><Link to="/inductor-code">Inductor Color Code</Link></li>
              <li><Link to="/capacitor-code">Capacitor Code</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Resources</h4>
            <ul>
              <li><Link to="/blog">Electronics Blog</Link></li>
              <li><Link to="/blog/what-resistor-for-led">LED Resistor Guide</Link></li>
              <li><Link to="/blog/how-to-read-resistor-color-codes">Color Code Guide</Link></li>
              <li><Link to="/blog/eia-96-smd-resistor-code-guide">SMD Code Reference</Link></li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Support</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/privacy-policy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} PoolCalculator. All rights reserved.</span>
          <span>Fast, Simple, Electronics.</span>
        </div>
      </div>
    </footer>
  );
}
