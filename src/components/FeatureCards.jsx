import React from 'react';
import { motion } from 'framer-motion';
import './FeatureCards.css';

const features = [
  {
    icon: '⚡',
    title: 'Lightning Fast',
    description: 'Optimized performance with React 18 and modern web technologies',
    color: 'rgba(255, 193, 7, 0.2)'
  },
  {
    icon: '🎨',
    title: 'Beautiful Design',
    description: 'Carefully crafted components with attention to every detail',
    color: 'rgba(156, 39, 176, 0.2)'
  },
  {
    icon: '📱',
    title: 'Fully Responsive',
    description: 'Seamless experience across all devices and screen sizes',
    color: 'rgba(33, 150, 243, 0.2)'
  },
  {
    icon: '🔧',
    title: 'Easy to Customize',
    description: 'Flexible props and styling options for any use case',
    color: 'rgba(76, 175, 80, 0.2)'
  },
  {
    icon: '✨',
    title: 'Smooth Animations',
    description: 'Powered by Framer Motion and GSAP for fluid interactions',
    color: 'rgba(255, 87, 34, 0.2)'
  },
  {
    icon: '🚀',
    title: 'Production Ready',
    description: 'Battle-tested components ready for your next project',
    color: 'rgba(233, 30, 99, 0.2)'
  }
];

function FeatureCards() {
  return (
    <section className="features-section">
      <div className="features-container">
        <motion.div
          className="features-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="features-title">Why Choose Our Components?</h2>
          <p className="features-subtitle">
            Everything you need to build stunning user interfaces
          </p>
        </motion.div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="feature-icon-wrapper" style={{ backgroundColor: feature.color }}>
                <span className="feature-icon">{feature.icon}</span>
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <div className="feature-shine"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
