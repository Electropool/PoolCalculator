import React from 'react';
import { Link, BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import LEDCalculator from './pages/LEDCalculator';
import ResistorColorCode from './pages/ResistorColorCode';
import SMDCode from './pages/SMDCode';
import InductorCode from './pages/InductorCode';
import CapacitorCode from './pages/CapacitorCode';
import { About, Contact, PrivacyPolicy, Terms } from './pages/StaticPages';
import Layout from './components/Layout';
import AdSlot from './components/AdSlot';
import ScrollToTop from './components/ScrollToTop';
import CookieConsent from './components/CookieConsent';
import './styles/globals.css';

import BlogIndex from './pages/blog/BlogIndex';
import LedResistorGuide from './pages/blog/LedResistorGuide';
import ResistorColorGuide from './pages/blog/ResistorColorGuide';
import SmdCodeGuide from './pages/blog/SmdCodeGuide';
import SEOHead from './components/SEOHead';

function NotFound() {
  return (
    <>
      <SEOHead 
        title="404 - Page Not Found | PoolCalc" 
        description="The requested page could not be found."
        noindex={true}
      />
      <div style={{textAlign:'center',padding:'80px 20px'}} role="alert">
        <div style={{fontSize:'64px',marginBottom:'16px'}} aria-hidden="true">⚡</div>
        <h1 style={{fontSize:'32px',marginBottom:'12px'}}>404 – Page Not Found</h1>
        <p style={{color:'var(--text-secondary)',marginBottom:'24px'}}>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-primary" style={{display:'inline-block',textDecoration:'none',padding:'12px 28px',background:'var(--accent)',color:'var(--bg-primary)',borderRadius:'var(--radius-sm)',fontWeight:'700'}}>Go Home</Link>
      </div>
    </>
  );
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <CookieConsent />
        <Navbar />
        <Layout>
          <div className="container">
            <AdSlot type="top" />
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/led-calculator" element={<LEDCalculator />} />
            <Route path="/resistor-color-code" element={<ResistorColorCode />} />
            <Route path="/smd-code" element={<SMDCode />} />
            <Route path="/inductor-code" element={<InductorCode />} />
            <Route path="/capacitor-code" element={<CapacitorCode />} />
            
            <Route path="/blog" element={<BlogIndex />} />
            <Route path="/blog/what-resistor-for-led" element={<LedResistorGuide />} />
            <Route path="/blog/how-to-read-resistor-color-codes" element={<ResistorColorGuide />} />
            <Route path="/blog/eia-96-smd-resistor-code-guide" element={<SmdCodeGuide />} />

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <div className="container">
            <AdSlot type="footer" />
          </div>
        </Layout>
        <Footer />
      </Router>
    </HelmetProvider>
  );
}
