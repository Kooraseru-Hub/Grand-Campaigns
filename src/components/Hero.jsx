import React from 'react';
import { motion } from 'framer-motion';
import ShinyText from './ShinyText';
import './Hero.css';

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="badge-dot"></span>
            NAPOLEONIC WARS PORTAL
          </div>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <ShinyText 
            text="Grand Campaigns" 
            speed={3}
            color="#ffffff"
            shineColor="#ffd700"
            spread={120}
          />
        </motion.h1>

        <motion.p
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
        >
          Experience the art of modern UI design through interactive components
          <br />
          crafted with precision and elegance
        </motion.p>

        <motion.div
          className="hero-buttons"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
        >
          <button className="hero-btn hero-btn-primary">
            Get Started
            <svg className="btn-arrow" width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button className="hero-btn hero-btn-secondary">
            View Components
          </button>
        </motion.div>

        <motion.div
          className="hero-stats"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        >
          <div className="stat-item">
            <div className="stat-value">10+</div>
            <div className="stat-label">Components</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">100%</div>
            <div className="stat-label">Responsive</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-value">∞</div>
            <div className="stat-label">Customizable</div>
          </div>
        </motion.div>
      </div>

      <div className="hero-gradient-orb hero-orb-1"></div>
      <div className="hero-gradient-orb hero-orb-2"></div>
    </section>
  );
}

export default Hero;
