import React from 'react';
import './AdSlot.css';

/**
 * Reusable Ad Slot component for Multi-Vendor support.
 * @param {string} type - Placement type ('left', 'right', 'top', 'footer', 'inline')
 */
export default function AdSlot({ type }) {
  // Logic to determine which vendor script to load can be added here
  // For now, we use a consistent placeholder that matches the dark theme.
  
  return (
    <div className={`ad-slot-wrapper ad-${type}`}>
      <div className="ad-label">ADVERTISEMENT</div>
      <div className="ad-container">
        {/* AdSense/Vendor script placeholder */}
        <div className="ad-placeholder">
          <span className="ad-info">Ad Slot ({type})</span>
          <span className="ad-sub">Support for AdSense, PropellerAds, Media.net</span>
        </div>
        
        {/* Example AdSense code structure (commented out) */}
        {/* 
        <ins className="adsbygoogle"
             style={{ display: 'block' }}
             data-ad-client="ca-pub-XXXX"
             data-ad-slot="XXXX"
             data-ad-format="auto"
             data-full-width-responsive="true">
        </ins>
        */}
      </div>
    </div>
  );
}
