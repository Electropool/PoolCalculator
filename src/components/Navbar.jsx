import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const navItems = [
  { label: 'Home', path: '/' },
  { 
    label: 'Resistor', 
    path: '/resistor-color-code?bands=4',
    dropdown: [
      { label: '4-Band Resistor', path: '/resistor-color-code?bands=4' },
      { label: '5-Band Resistor', path: '/resistor-color-code?bands=5' },
      { label: '6-Band Resistor', path: '/resistor-color-code?bands=6' },
      { label: 'SMD Resistor Code', path: '/smd-code' }
    ]
  },
  { 
    label: 'LED', 
    path: '/led-calculator',
    dropdown: [
      { label: 'LED Resistor Calculator', path: '/led-calculator' }
    ]
  },
  { 
    label: 'Capacitor', 
    path: '/capacitor-code?type=ceramic',
    dropdown: [
      { label: 'Ceramic Capacitor', path: '/capacitor-code?type=ceramic' },
      { label: 'Film Capacitor', path: '/capacitor-code?type=film' },
      { label: 'SMD Capacitor', path: '/capacitor-code?type=smd' }
    ]
  },
  { 
    label: 'Inductor', 
    path: '/inductor-code?type=axial',
    dropdown: [
      { label: 'Normal Inductor', path: '/inductor-code?type=axial' },
      { label: 'SMD Inductor', path: '/inductor-code?type=smd' },
      { label: 'Helical Inductor', path: '/inductor-code?type=helical' }
    ]
  },
  { label: 'Blog', path: '/blog' }
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const toggleDropdown = (label) => {
    if (activeDropdown === label) setActiveDropdown(null);
    else setActiveDropdown(label);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">⚡</span>
          <span className="logo-text">PoolCalc</span>
        </Link>

        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>

        <div className={`nav-links${menuOpen ? ' open' : ''}`}>
          {navItems.map(item => {
            const isActive = location.pathname === item.path.split('?')[0];
            return (
              <div key={item.label} className={`nav-item-container${item.dropdown ? ' has-dropdown' : ''}${activeDropdown === item.label ? ' open' : ''}`}>
                <div className="nav-link-group">
                  <Link
                    to={item.path}
                    className={`nav-link${isActive ? ' active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.label}
                  </Link>
                  {item.dropdown && (
                    <button 
                      className="dropdown-arrow-btn"
                      onClick={(e) => {
                        e.preventDefault();
                        toggleDropdown(item.label);
                      }}
                      aria-expanded={activeDropdown === item.label}
                      aria-label={`Toggle ${item.label} dropdown`}
                    >
                      <span className="arrow">▾</span>
                    </button>
                  )}
                </div>
                
                {item.dropdown && (
                  <div className={`dropdown-menu${activeDropdown === item.label ? ' show' : ''}`} role="menu">
                    {item.dropdown.map(sub => (
                      <Link 
                        key={sub.label} 
                        to={sub.path} 
                        className={`dropdown-link${location.pathname + location.search === sub.path ? ' active' : ''}`}
                        role="menuitem"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
