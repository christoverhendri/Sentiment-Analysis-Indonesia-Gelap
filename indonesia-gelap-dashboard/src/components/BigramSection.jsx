import React, { useEffect, useRef, useState } from 'react';
import { bigrams, wordcloudWords } from '../data';
import './BigramSection.css';

export default function BigramSection() {
  const [visible, setVisible] = useState(false);
  const [hoveredBigram, setHoveredBigram] = useState(null);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const maxVal = Math.max(...bigrams.map(b => b.value));

  return (
    <section className="bigram-section" ref={ref} id="bigram">
      <div className="section-container">
        <div className={`section-header ${visible ? 'visible' : ''}`}>
          <div className="section-tag">02 — Lexical Analysis</div>
          <h2 className="section-title">Top 20 Bigram &<br /><span>Word Cloud</span></h2>
          <p className="section-desc">
            Pola kata yang paling sering muncul bersama dalam percakapan #IndonesiaGelap
            mencerminkan isu sosial-politik dominan.
          </p>
        </div>

        <div className={`bigram-layout ${visible ? 'visible' : ''}`}>
          {/* Bigram Bars */}
          <div className="card bigram-card">
            <div className="card-label">Top 20 Bigram — Frekuensi</div>
            <div className="bigram-bars">
              {bigrams.map((b, i) => (
                <div
                  key={b.text}
                  className={`bigram-row ${hoveredBigram === i ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredBigram(i)}
                  onMouseLeave={() => setHoveredBigram(null)}
                  style={{ animationDelay: `${i * 0.04}s` }}
                >
                  <div className="bigram-text">{b.text}</div>
                  <div className="bigram-bar-wrap">
                    <div
                      className="bigram-bar-fill"
                      style={{
                        width: visible ? `${(b.value / maxVal) * 100}%` : '0%',
                        transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${0.3 + i * 0.04}s`,
                      }}
                    />
                  </div>
                  <div className="bigram-count">{b.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Word Cloud visual */}
          <div className="card wordcloud-card">
            <div className="card-label">Word Cloud — Kata Dominan</div>
            <WordCloud words={wordcloudWords} visible={visible} />
            <div className="wc-note">
              Dominasi kata: <strong>indonesia, gelap, rakyat, negara, korupsi</strong><br />
              menandakan ketidakpuasan publik terhadap kondisi negara
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WordCloud({ words, visible }) {
  const colors = ['#e63946', '#f4a261', '#2ec4b6', '#a8dadc', '#f0f0f5', '#c9184a', '#ffb703'];

  const positions = [
    { top: '50%', left: '50%', fs: 48, color: '#e63946' },
    { top: '35%', left: '38%', fs: 36, color: '#f0f0f5' },
    { top: '60%', left: '30%', fs: 32, color: '#f4a261' },
    { top: '28%', left: '60%', fs: 28, color: '#2ec4b6' },
    { top: '68%', left: '58%', fs: 26, color: '#f0f0f5' },
    { top: '22%', left: '42%', fs: 22, color: '#a8dadc' },
    { top: '75%', left: '40%', fs: 20, color: '#e63946' },
    { top: '42%', left: '18%', fs: 18, color: '#f4a261' },
    { top: '48%', left: '72%', fs: 18, color: '#f0f0f5' },
    { top: '15%', left: '55%', fs: 16, color: '#2ec4b6' },
    { top: '80%', left: '22%', fs: 15, color: '#a8dadc' },
    { top: '18%', left: '28%', fs: 15, color: '#f0f0f5' },
    { top: '55%', left: '82%', fs: 14, color: '#f4a261' },
    { top: '85%', left: '65%', fs: 13, color: '#e63946' },
    { top: '10%', left: '70%', fs: 13, color: '#f0f0f5' },
    { top: '38%', left: '85%', fs: 12, color: '#2ec4b6' },
    { top: '72%', left: '78%', fs: 12, color: '#a8dadc' },
    { top: '8%', left: '38%', fs: 11, color: '#f4a261' },
    { top: '25%', left: '15%', fs: 11, color: '#f0f0f5' },
    { top: '88%', left: '50%', fs: 10, color: '#e63946' },
  ];

  return (
    <div className="wordcloud-container">
      {words.slice(0, 20).map((word, i) => {
        const pos = positions[i] || positions[0];
        return (
          <span
            key={word.text}
            className="wc-word"
            style={{
              top: pos.top,
              left: pos.left,
              fontSize: pos.fs,
              color: pos.color,
              opacity: visible ? 1 : 0,
              transform: `translate(-50%, -50%) ${visible ? 'scale(1)' : 'scale(0.5)'}`,
              transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${0.1 + i * 0.04}s`,
              fontFamily: i % 3 === 0 ? 'var(--font-display)' : 'var(--font-mono)',
              fontWeight: i < 5 ? 'bold' : 'normal',
            }}
          >
            {word.text}
          </span>
        );
      })}
    </div>
  );
}
