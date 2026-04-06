import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SentimentSection from './components/SentimentSection';
import BigramSection from './components/BigramSection';
import TopicSection from './components/TopicSection';
import Conclusion from './components/Conclusion';

export default function App() {
  return (
    <>
      <div className="noise" aria-hidden />
      <Navbar />
      <main id="home">
        <Hero />
        <SentimentSection />
        <BigramSection />
        <TopicSection />
        <Conclusion />
      </main>
    </>
  );
}
