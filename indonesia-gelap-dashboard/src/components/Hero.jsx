import React, { useEffect, useRef, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [glitching, setGlitching] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    const interval = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-bg">
        <div className="hero-orb orb-1" />
        <div className="hero-orb orb-2" />
        <div className="hero-orb orb-3" />
        <div className="scanline" />
      </div>

      <div className={`hero-content ${loaded ? 'loaded' : ''}`}>
        <div className="hero-eyebrow">
          <span className="dot" />
          <span>Analisis Sentimen · Twitter · #IndonesiaGelap</span>
          <span className="dot" />
        </div>

        <div className="hero-title-wrap">
          <h1 className={`hero-title ${glitching ? 'glitching' : ''}`}>
            <span className="title-line line-1">INDONESIA</span>
            <span className="title-line line-2">GELAP</span>
          </h1>
          <div className="hero-title-ghost" aria-hidden>
            <span>INDONESIA</span>
            <span>GELAP</span>
          </div>
        </div>

        <p className="hero-sub">
          Dashboard interaktif analisis sentimen dan topic modelling<br />
          atas percakapan publik di Twitter — <em>data-driven insight</em>
        </p>

        <div className="hero-stats">
          <StatPill number="1,456" label="Total Tweet" delay={0} />
          <StatPill number="77%" label="Sentimen Negatif" delay={100} />
          <StatPill number="92.48%" label="Akurasi Model" delay={200} />
          <StatPill number="5" label="Topik Utama" delay={300} />
        </div>

        <div className="hero-scroll">
          <span>Scroll untuk eksplorasi</span>
          <div className="scroll-arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/><polyline points="19 12 12 19 5 12"/>
            </svg>
          </div>
        </div>
      </div>

      <div className="ticker">
        <div className="ticker-inner">
          {Array(4).fill(['#IndonesiaGelap', 'Sentimen Negatif', 'Analisis Twitter', 'Topic Modelling', 'Logistic Regression', 'BERTopic', 'TF-IDF', 'NLP']).flat().map((t, i) => (
            <span key={i} className="ticker-item">{t} <span className="ticker-dot">●</span></span>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatPill({ number, label, delay }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setTimeout(() => setVisible(true), delay + 600);
  }, [delay]);

  return (
    <div className={`stat-pill ${visible ? 'visible' : ''}`}>
      <span className="stat-number">{number}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
