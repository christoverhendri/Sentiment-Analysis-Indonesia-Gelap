# Indonesia Gelap — Sentiment Analysis Dashboard

Dashboard interaktif analisis sentimen & topic modelling tweet #IndonesiaGelap.

## 🚀 Deploy ke Vercel

### Cara 1: Via Vercel CLI
```bash
npm install -g vercel
cd indonesia-gelap-dashboard
npm install
vercel
```

### Cara 2: Via GitHub + Vercel Dashboard
1. Upload folder ini ke GitHub repository baru
2. Buka [vercel.com](https://vercel.com) → New Project
3. Import repository GitHub kamu
4. Settings sudah otomatis terdeteksi (Vite framework)
5. Klik **Deploy** ✅

### Cara 3: Drag & Drop (paling mudah)
1. Jalankan `npm run build` di folder ini
2. Buka [vercel.com](https://vercel.com) → Add New → Project
3. Drag & drop folder `dist/` ke Vercel

---

## 🛠 Development Lokal
```bash
npm install
npm run dev
# Buka http://localhost:5173
```

## 📦 Build Production
```bash
npm run build
# Output ada di folder dist/
```

---

## 📊 Dataset
- **Sumber**: Twitter/X scraping dengan Tweet-Harvest
- **Keyword**: #IndonesiaGelap
- **Total Tweet**: 1,456
- **Labeling**: Manual most-voted sentiment

## 🤖 Model
- **Sentiment**: Logistic Regression + TF-IDF
- **Accuracy**: 92.48% | **F1**: 92.86%
- **Topic Modelling**: BERTopic + MiniLM
- **Coherence Score**: 0.465

## 🏗 Tech Stack
- React 18 + Vite
- Pure CSS (no UI library)
- Canvas API (charts custom)
- Deployed on Vercel
