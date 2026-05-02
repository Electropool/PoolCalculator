import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './CookieConsent.css';

/**
 * Professional Cookie Consent System for AdSense compliance.
 * Manages localStorage consent and dynamic AdSense script injection.
 */
export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent');
    
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => setIsVisible(true), 1500);
      return () => clearTimeout(timer);
    } else if (consent === 'accepted') {
      loadAdsense();
    }
  }, []);

  const loadAdsense = () => {
    if (document.getElementById('adsense-script')) return;

    const script = document.createElement('script');
    script.id = 'adsense-script';
    script.async = true;
    script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX'; // Replace with real pub-id
    script.crossOrigin = 'anonymous';

    // Once script loads, push ads if any exist
    script.onload = () => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.error("AdSense push error:", e);
      }
    };

    document.head.appendChild(script);
  };

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    loadAdsense();
  };

  const handleReject = () => {
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="cookie-banner">
      <div className="cookie-content">
        <p>
          We use cookies to improve your experience and show relevant ads. 
          You can accept or reject cookies. <Link to="/privacy-policy" className="cookie-link">Learn more</Link>
        </p>
      </div>
      <div className="cookie-actions">
        <button className="cookie-btn reject-btn" onClick={handleReject}>Reject All</button>
        <button className="cookie-btn accept-btn" onClick={handleAccept}>Accept All</button>
      </div>
    </div>
  );
}
