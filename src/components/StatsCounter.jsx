import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import './StatsCounter.css';

const stats = [
  { value: 2500, suffix: '+', label: 'Active Soldiers', duration: 2000 },
  { value: 15, suffix: '', label: 'Nations', duration: 2000 },
  { value: 150, suffix: '+', label: 'Battles Fought', duration: 2000 },
  { value: 50, suffix: '+', label: 'Treaties Signed', duration: 2000 }
];

function Counter({ value, duration, decimals = 0, suffix = '' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrame;

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentCount = easeOutQuart * value;
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {suffix}
    </span>
  );
}

function StatsCounter() {
  return (
    <section className="stats-section">
      <div className="stats-container">
        <motion.div
          className="stats-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="stats-title">Community at a Glance</h2>
          <p className="stats-subtitle">
            A thriving military roleplay community spanning the globe
          </p>
        </motion.div>

        <div className="stats-grid">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="stat-value">
                <Counter 
                  value={stat.value} 
                  duration={stat.duration}
                  decimals={stat.decimals}
                  suffix={stat.suffix}
                />
              </div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-glow"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default StatsCounter;
