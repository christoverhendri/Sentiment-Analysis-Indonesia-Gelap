import React, { useState, useEffect } from 'react';
import './Navbar.css';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Sentimen', href: '#sentiment' },
  { label: 'Lexical', href: '#bigram' },
  { label: 'Topik', href: '#topics' },
  { label: 'Kesimpulan', href: '#conclusion' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#home" className="nav-logo">
          <span className="logo-ig">IG</span>
          <span className="logo-text">Indonesia Gelap</span>
        </a>

        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navItems.map(item => (
            <a key={item.label} href={item.href} className="nav-link" onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta"
          >
            GitHub →
          </a>
        </div>

        <button className="nav-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
