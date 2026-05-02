import React from 'react';
import AdSlot from './AdSlot';
import './Layout.css';

/**
 * Main Layout component that implements the 3-column Ad system.
 * Desktop: [Left Ad] [Main Content] [Right Ad]
 * Mobile: [Main Content] (Side ads hidden)
 */
export default function Layout({ children }) {
  return (
    <div className="app-layout-grid">
      {/* Left Sidebar Ad */}
      <aside className="ad-sidebar ad-sidebar-left">
        <AdSlot type="left" />
      </aside>

      {/* Center Main Content */}
      <main className="main-content-area">
        {children}
      </main>

      {/* Right Sidebar Ad */}
      <aside className="ad-sidebar ad-sidebar-right">
        <AdSlot type="right" />
      </aside>
    </div>
  );
}
