import React, { useEffect, useRef, useState } from 'react';
import './Conclusion.css';

const findings = [
  {
    icon: '🔴',
    title: 'Dominasi Negatif',
    desc: '77% tweet bersentimen negatif, mencerminkan keresahan publik yang mendalam terhadap kondisi negara.',
    color: '#e63946',
  },
  {
    icon: '🏛️',
    title: 'Kritik Moral Elite',
    desc: 'Topik dominan berkaitan dengan ketidakpercayaan pada pemimpin, korupsi, dan ketimpangan sistemik.',
    color: '#f4a261',
  },
  {
    icon: '📢',
    title: 'Ruang Ekspresi',
    desc: 'Gerakan #IndonesiaGelap menjadikan media sosial sebagai ruang perlawanan simbolik dan kontestasi makna.',
    color: '#2ec4b6',
  },
  {
    icon: '🤖',
    title: 'Model Akurat',
    desc: 'Logistic Regression + TF-IDF mencapai akurasi 92.48% dengan F1-Score 92.86% pada klasifikasi tiga kelas.',
    color: '#a8dadc',
  },
];

const techStack = [
  { name: 'Python', role: 'Core language' },
  { name: 'pandas', role: 'Data manipulation' },
  { name: 'scikit-learn', role: 'ML model' },
  { name: 'TF-IDF', role: 'Feature extraction' },
  { name: 'BERTopic', role: 'Topic modeling' },
  { name: 'MiniLM', role: 'Embedding' },
  { name: 'Tweet-Harvest', role: 'Data scraping' },
  { name: 'Matplotlib', role: 'Visualization' },
];

export default function Conclusion() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="conclusion-section" ref={ref} id="conclusion">
      <div className="section-container">
        <div className={`section-header ${visible ? 'visible' : ''}`}>
          <div className="section-tag">04 — Kesimpulan</div>
          <h2 className="section-title">Temuan &<br /><span>Insight</span></h2>
        </div>

        <div className={`findings-grid ${visible ? 'visible' : ''}`}>
          {findings.map((f, i) => (
            <div
              key={i}
              className="finding-card card"
              style={{
                '--fc': f.color,
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 0.6s ease ${i * 0.12}s`,
              }}
            >
              <div className="fc-icon">{f.icon}</div>
              <div className="fc-title" style={{ color: f.color }}>{f.title}</div>
              <div className="fc-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        {/* Big quote */}
        <div className={`big-quote-wrap ${visible ? 'visible' : ''}`}>
          <blockquote className="big-quote">
            "Analisis menunjukkan bahwa percakapan tentang <em>#IndonesiaGelap</em> didominasi sentimen negatif,
            terkait moral elite, ketimpangan sistemik, dan ketidakpercayaan pemerintah. Gerakan ini memicu
            dukungan dan narasi tandingan, menjadikan media sosial ruang ekspresi, perlawanan simbolik,
            dan kontestasi makna atas isu sosial-politik."
          </blockquote>
        </div>

        {/* Tech Stack */}
        <div className={`tech-section ${visible ? 'visible' : ''}`}>
          <div className="card-label" style={{ marginBottom: '20px' }}>Tech Stack yang Digunakan</div>
          <div className="tech-grid">
            {techStack.map((t, i) => (
              <div key={i} className="tech-chip" style={{ animationDelay: `${i * 0.06}s` }}>
                <div className="tech-name">{t.name}</div>
                <div className="tech-role">{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <span className="footer-logo-ig">IG</span>
            <div>
              <div className="footer-title">Indonesia Gelap — Sentiment Analysis</div>
              <div className="footer-sub">Portofolio NLP · Data Science · Machine Learning</div>
            </div>
          </div>
          <div className="footer-copy">
            Dibuat dengan ❤️ · Data from Twitter · Model: Logistic Regression + BERTopic
          </div>
        </div>
      </footer>
    </section>
  );
}
