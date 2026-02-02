import React from 'react';
import { motion } from 'framer-motion';
import './CTA.css';

function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-container">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="cta-title">Ready to Build Something Amazing?</h2>
          <p className="cta-description">
            Start creating beautiful user interfaces today with our component library.
            Join thousands of developers already building with our tools.
          </p>
          
          <div className="cta-buttons">
            <button className="cta-btn cta-btn-primary">
              Get Started Now
              <svg className="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7 10H13M13 10L10 7M13 10L10 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="cta-btn cta-btn-secondary">
              View Documentation
            </button>
          </div>

          <div className="cta-stats">
            <div className="cta-stat">
              <svg className="cta-stat-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L12.5 7L18 8L14 12L15 18L10 15L5 18L6 12L2 8L7.5 7L10 2Z" fill="currentColor"/>
              </svg>
              <span>5 Star Rating</span>
            </div>
            <div className="cta-stat">
              <svg className="cta-stat-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 10L9 12L13 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Free Updates</span>
            </div>
            <div className="cta-stat">
              <svg className="cta-stat-icon" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 2C10 2 3 5 3 10C3 13 5 16 10 18C15 16 17 13 17 10C17 5 10 2 10 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Secure & Reliable</span>
            </div>
          </div>
        </motion.div>

        <div className="cta-glow cta-glow-1"></div>
        <div className="cta-glow cta-glow-2"></div>
      </div>
    </section>
  );
}

export default CTA;
