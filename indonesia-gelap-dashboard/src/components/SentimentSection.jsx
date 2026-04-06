import React, { useEffect, useRef, useState } from 'react';
import { sentimentData } from '../data';
import './SentimentSection.css';

export default function SentimentSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const { distribution, confusionMatrix, modelMetrics } = sentimentData;

  return (
    <section className="sentiment-section" ref={ref} id="sentiment">
      <div className="section-container">
        <div className={`section-header ${visible ? 'visible' : ''}`}>
          <div className="section-tag">01 — Sentiment Analysis</div>
          <h2 className="section-title">Distribusi<br /><span>Sentimen</span></h2>
          <p className="section-desc">
            Analisis menggunakan Logistic Regression + TF-IDF mengklasifikasikan
            1,456 tweet menjadi tiga kategori sentimen.
          </p>
        </div>

        <div className={`sentiment-grid ${visible ? 'visible' : ''}`}>
          {/* Donut Chart */}
          <div className="card donut-card">
            <div className="card-label">Tweet Distribution</div>
            <DonutChart data={distribution} visible={visible} />
            <div className="donut-legend">
              <LegendItem color="#e63946" label="Negatif" value="77%" />
              <LegendItem color="#f4a261" label="Netral" value="16.95%" />
              <LegendItem color="#2ec4b6" label="Positif" value="6.04%" />
            </div>
            <div className="dominant-badge">⚠ Tweet dominan negatif</div>
          </div>

          {/* Metrics */}
          <div className="metrics-stack">
            <div className="card metric-highlight">
              <div className="card-label">Kesimpulan Utama</div>
              <blockquote className="finding-quote">
                "Percakapan #IndonesiaGelap didominasi sentimen negatif terkait
                moral elite, ketimpangan sistemik, dan ketidakpercayaan pemerintah."
              </blockquote>
            </div>

            <div className="card model-metrics">
              <div className="card-label">Model Performance</div>
              <div className="metrics-grid">
                {Object.entries(modelMetrics).map(([key, val]) => (
                  <MetricBar key={key} label={key.toUpperCase()} value={val} visible={visible} />
                ))}
              </div>
            </div>
          </div>

          {/* Confusion Matrix */}
          <div className="card confusion-card">
            <div className="card-label">Confusion Matrix — Logistic Regression</div>
            <ConfusionMatrix data={confusionMatrix} visible={visible} />
          </div>

          {/* Pipeline */}
          <div className="card pipeline-card">
            <div className="card-label">Model Pipeline</div>
            <div className="pipeline-steps">
              {[
                { icon: '🔍', step: 'Data', desc: 'Tweet CSV #IndonesiaGelap' },
                { icon: '🧹', step: 'Clean', desc: 'Remove @, #, URL, emoji' },
                { icon: '📝', step: 'Token', desc: 'Stem + stopword removal' },
                { icon: '📊', step: 'TF-IDF', desc: 'Feature extraction' },
                { icon: '⚖️', step: 'Balance', desc: 'RandomOverSampling' },
                { icon: '🤖', step: 'Train', desc: 'Logistic Regression' },
              ].map((s, i) => (
                <div key={i} className="pipeline-step" style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="step-icon">{s.icon}</div>
                  <div className="step-label">{s.step}</div>
                  <div className="step-desc">{s.desc}</div>
                  {i < 5 && <div className="step-arrow">→</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function DonutChart({ data, visible }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!visible) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const cx = 120, cy = 120, r = 90, innerR = 55;

    const segments = [
      { value: data.negatif, color: '#e63946', label: 'Negatif' },
      { value: data.netral, color: '#f4a261', label: 'Netral' },
      { value: data.positif, color: '#2ec4b6', label: 'Positif' },
    ];

    let startAngle = -Math.PI / 2;
    let frame = 0;
    const totalFrames = 60;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const progress = Math.min(frame / totalFrames, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      let currentAngle = -Math.PI / 2;

      segments.forEach((seg) => {
        const sliceAngle = (seg.value / 100) * 2 * Math.PI * eased;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, r, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = seg.color;
        ctx.fill();

        // Inner cutout
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, innerR, currentAngle, currentAngle + sliceAngle);
        ctx.closePath();
        ctx.fillStyle = '#12121f';
        ctx.fill();

        currentAngle += sliceAngle;
      });

      // Center text
      ctx.fillStyle = '#f0f0f5';
      ctx.font = 'bold 28px Bebas Neue';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${Math.round(data.negatif * eased)}%`, cx, cy - 8);
      ctx.font = '10px Space Mono';
      ctx.fillStyle = '#7a7a9a';
      ctx.fillText('NEGATIF', cx, cy + 14);

      frame++;
      if (frame <= totalFrames) requestAnimationFrame(animate);
    };

    requestAnimationFrame(animate);
  }, [visible]);

  return <canvas ref={canvasRef} width={240} height={240} className="donut-canvas" />;
}

function LegendItem({ color, label, value }) {
  return (
    <div className="legend-item">
      <span className="legend-dot" style={{ background: color }} />
      <span className="legend-label">{label}</span>
      <span className="legend-value">{value}</span>
    </div>
  );
}

function MetricBar({ label, value, visible }) {
  const pct = value * 100;
  const display = (value * 100).toFixed(2) + '%';
  const colors = { ACCURACY: '#e63946', RECALL: '#f4a261', PRECISION: '#2ec4b6', F1: '#a8dadc' };

  return (
    <div className="metric-bar-item">
      <div className="metric-bar-header">
        <span className="metric-bar-label">{label}</span>
        <span className="metric-bar-value" style={{ color: colors[label] || '#e63946' }}>{display}</span>
      </div>
      <div className="metric-bar-track">
        <div
          className="metric-bar-fill"
          style={{
            '--target-width': `${pct}%`,
            background: colors[label] || '#e63946',
            width: visible ? `${pct}%` : '0%',
            transition: visible ? 'width 1.2s cubic-bezier(0.4, 0, 0.2, 1) 0.5s' : 'none',
          }}
        />
      </div>
    </div>
  );
}

function ConfusionMatrix({ data, visible }) {
  const { labels, data: matrix } = data;
  const max = Math.max(...matrix.flat());

  return (
    <div className="confusion-wrap">
      <div className="confusion-y-label">Aktual</div>
      <div>
        <div className="confusion-x-labels">
          {labels.map(l => <div key={l} className="conf-label">{l}</div>)}
        </div>
        <div className="confusion-matrix">
          {matrix.map((row, ri) =>
            row.map((val, ci) => {
              const isCorrect = ri === ci;
              const intensity = val / max;
              return (
                <div
                  key={`${ri}-${ci}`}
                  className={`conf-cell ${isCorrect ? 'correct' : ''}`}
                  style={{
                    opacity: visible ? 1 : 0,
                    transition: `opacity 0.4s ease ${(ri * 3 + ci) * 0.06}s`,
                    background: isCorrect
                      ? `rgba(230,57,70,${0.2 + intensity * 0.5})`
                      : `rgba(255,255,255,${intensity * 0.08})`,
                  }}
                >
                  <span className="conf-value">{val}</span>
                  {isCorrect && <span className="conf-check">✓</span>}
                </div>
              );
            })
          )}
        </div>
        <div className="confusion-x-label">Prediksi</div>
      </div>
    </div>
  );
}
