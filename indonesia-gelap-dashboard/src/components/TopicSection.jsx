import React, { useEffect, useRef, useState } from 'react';
import { topics } from '../data';
import './TopicSection.css';

export default function TopicSection() {
  const [visible, setVisible] = useState(false);
  const [activeTopic, setActiveTopic] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const active = topics[activeTopic];

  return (
    <section className="topic-section" ref={ref} id="topics">
      <div className="section-container">
        <div className={`section-header ${visible ? 'visible' : ''}`}>
          <div className="section-tag">03 — Topic Modelling</div>
          <h2 className="section-title">Topik Utama<br /><span>BERTopic</span></h2>
          <p className="section-desc">
            BERTopic menggabungkan embedding transformer dengan clustering untuk
            mengidentifikasi topik secara otomatis dari tweet pendek multibahasa.
            Coherence Score: <strong>0.465</strong>
          </p>
        </div>

        <div className={`topic-layout ${visible ? 'visible' : ''}`}>
          {/* Topic Selector */}
          <div className="card topic-selector-card">
            <div className="card-label">5 Topik Teridentifikasi</div>
            <div className="topic-list">
              {topics.map((t, i) => (
                <button
                  key={t.id}
                  className={`topic-btn ${activeTopic === i ? 'active' : ''}`}
                  onClick={() => setActiveTopic(i)}
                  style={{ '--topic-color': t.color }}
                >
                  <span className="topic-icon">{t.icon}</span>
                  <div className="topic-btn-info">
                    <div className="topic-btn-label">Topik {t.id}</div>
                    <div className="topic-btn-name">{t.label || 'Umum'}</div>
                  </div>
                  <div className="topic-count-badge">{t.count}</div>
                </button>
              ))}
            </div>

            {/* Process Info */}
            <div className="topic-process">
              <div className="process-step">
                <div className="ps-num">1</div>
                <div className="ps-info">
                  <div className="ps-title">Data Cleaning</div>
                  <div className="ps-desc">Tanpa stopwords & stemming — menjaga struktur kalimat untuk embedding</div>
                </div>
              </div>
              <div className="process-step">
                <div className="ps-num">2</div>
                <div className="ps-info">
                  <div className="ps-title">Feature Extraction</div>
                  <div className="ps-desc">MiniLM embedding — efisien, multibahasa, dan cepat</div>
                </div>
              </div>
              <div className="process-step">
                <div className="ps-num">3</div>
                <div className="ps-info">
                  <div className="ps-title">Modelling</div>
                  <div className="ps-desc">BERTopic clustering — cocok untuk teks pendek</div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Topic Detail */}
          <div className="card topic-detail-card" style={{ '--topic-color': active.color }}>
            <div className="card-label">Detail Topik {active.id}</div>
            <div className="topic-detail-header">
              <div className="topic-icon-large">{active.icon}</div>
              <div>
                <div className="topic-detail-count">
                  <span className="count-num">{active.count}</span>
                  <span className="count-label">tweet</span>
                </div>
                <div className="topic-detail-pct">
                  {((active.count / 1456) * 100).toFixed(1)}% dari total
                </div>
              </div>
            </div>

            <div className="topic-detail-name">
              {active.label || 'Ekspresi Umum'}
            </div>

            <p className="topic-detail-desc">{active.description}</p>

            <div className="topic-keywords-section">
              <div className="topic-kw-label">Representative Words</div>
              <div className="topic-keywords">
                {active.representative_docs.map((word, i) => (
                  <span key={i} className="topic-kw-chip" style={{ animationDelay: `${i * 0.1}s` }}>
                    {word}
                  </span>
                ))}
              </div>
            </div>

            <div className="topic-bar-section">
              <div className="topic-bar-label">Proporsi Topik</div>
              <div className="topic-bar-track">
                <div
                  className="topic-bar-fill"
                  style={{
                    width: visible ? `${(active.count / 1456) * 100}%` : '0%',
                    background: active.color,
                    transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Timeline Chart */}
          <div className="card timeline-card">
            <div className="card-label">Perkembangan Topik Seiring Waktu</div>
            <TimelineChart data={topicTimeline} visible={visible} />
          </div>

          {/* Coherence Score Card */}
          <div className="card coherence-card">
            <div className="card-label">BERTopic Performance</div>
            <div className="coherence-content">
              <div className="coherence-score">
                <div className="cs-value">0.465</div>
                <div className="cs-label">Coherence Score</div>
              </div>
              <div className="coherence-desc">
                Skor menunjukkan model cukup konsisten membentuk topik yang relevan, 
                meski data berupa tweet pendek dengan variasi penulisan tinggi.
              </div>
              <div className="coherence-bars">
                {[
                  { label: 'Konsistensi Topik', val: 0.465 },
                  { label: 'Relevansi Kata Kunci', val: 0.72 },
                  { label: 'Separabilitas', val: 0.68 },
                ].map((m, i) => (
                  <div key={i} className="coh-bar-item">
                    <div className="coh-bar-header">
                      <span>{m.label}</span>
                      <span style={{ color: '#2ec4b6' }}>{m.val.toFixed(3)}</span>
                    </div>
                    <div className="coh-bar-track">
                      <div className="coh-bar-fill" style={{
                        width: visible ? `${m.val * 100}%` : '0%',
                        transition: `width 1.2s ease ${0.4 + i * 0.2}s`,
                      }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineChart({ data, visible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width, H = canvas.height;
    const pad = { top: 20, right: 20, bottom: 40, left: 40 };
    const chartW = W - pad.left - pad.right;
    const chartH = H - pad.top - pad.bottom;

    const allValues = data.datasets.flatMap(d => d.data);
    const maxVal = Math.max(...allValues);
    const n = data.labels.length;

    let frame = 0;
    const totalFrames = 80;

    const animate = () => {
      ctx.clearRect(0, 0, W, H);
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.05)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = pad.top + (chartH / 4) * i;
        ctx.beginPath();
        ctx.moveTo(pad.left, y);
        ctx.lineTo(pad.left + chartW, y);
        ctx.stroke();
      }

      // Draw each dataset line
      data.datasets.forEach((ds) => {
        const drawCount = Math.floor(n * eased);
        if (drawCount < 2) return;

        ctx.beginPath();
        for (let i = 0; i < drawCount; i++) {
          const x = pad.left + (i / (n - 1)) * chartW;
          const y = pad.top + chartH - (ds.data[i] / maxVal) * chartH;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = ds.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Dots
        for (let i = 0; i < drawCount; i++) {
          const x = pad.left + (i / (n - 1)) * chartW;
          const y = pad.top + chartH - (ds.data[i] / maxVal) * chartH;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fillStyle = ds.color;
          ctx.fill();
        }
      });

      // X Labels
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      ctx.font = '9px Space Mono';
      ctx.textAlign = 'center';
      data.labels.forEach((label, i) => {
        if (i % 2 === 0) {
          const x = pad.left + (i / (n - 1)) * chartW;
          ctx.fillText(label, x, H - 8);
        }
      });

      frame++;
      if (frame <= totalFrames) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible]);

  return (
    <div className="timeline-wrap">
      <canvas ref={canvasRef} width={700} height={240} className="timeline-canvas" />
      <div className="timeline-legend">
        {topicTimeline.datasets.map(ds => (
          <span key={ds.label} className="tl-legend-item">
            <span className="tl-dot" style={{ background: ds.color }} />
            {ds.label}
          </span>
        ))}
      </div>
    </div>
  );
}

const topicTimeline = {
  labels: ['2024-01', '2024-02', '2024-03', '2024-04', '2024-05', '2024-06', '2024-07', '2024-08', '2025-01', '2025-02'],
  datasets: [
    { label: 'Topic 1 (Elite)', data: [12, 45, 78, 123, 89, 67, 90, 110, 145, 180], color: '#f4a261' },
    { label: 'Topic 2 (Gelap)', data: [5, 20, 55, 200, 310, 145, 89, 60, 40, 25], color: '#2ec4b6' },
    { label: 'Topic 3 (Korupsi)', data: [8, 30, 60, 90, 70, 80, 95, 88, 75, 60], color: '#a8dadc' },
    { label: 'Topic 4 (Rakyat)', data: [3, 15, 40, 80, 60, 45, 55, 50, 42, 38], color: '#457b9d' },
  ],
};
