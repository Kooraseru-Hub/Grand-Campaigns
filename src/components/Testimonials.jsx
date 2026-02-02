import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    name: 'Alex Johnson',
    role: 'Frontend Developer',
    company: 'Tech Corp',
    content: 'These components are absolutely stunning! They\'ve saved me countless hours of development time and my clients love the results.',
    rating: 5,
    avatar: 'PLACEHOLDER'
  },
  {
    name: 'Sarah Chen',
    role: 'UI/UX Designer',
    company: 'Design Studio',
    content: 'The attention to detail is incredible. Every animation is smooth and purposeful. This is exactly what I needed for my projects.',
    rating: 5,
    avatar: 'PLACEHOLDER'
  },
  {
    name: 'Michael Brown',
    role: 'Full Stack Developer',
    company: 'StartupXYZ',
    content: 'Integration was seamless and the documentation is top-notch. The components are highly customizable and performant.',
    rating: 5,
    avatar: 'PLACEHOLDER'
  },
  {
    name: 'Emily Davis',
    role: 'Product Manager',
    company: 'Innovation Labs',
    content: 'Our team productivity increased significantly. The components are consistent, well-designed, and easy to implement.',
    rating: 5,
    avatar: 'PLACEHOLDER'
  }
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <motion.div
          className="testimonials-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="testimonials-title">What Developers Say</h2>
          <p className="testimonials-subtitle">
            Trusted by developers and designers worldwide
          </p>
        </motion.div>

        <div className="testimonials-carousel">
          <button className="carousel-btn carousel-btn-prev" onClick={prev} aria-label="Previous testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="testimonials-track">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="testimonial-card"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4 }}
              >
                <div className="testimonial-stars">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="#ffd700" stroke="#ffd700" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ))}
                </div>

                <p className="testimonial-content">
                  "{testimonials[currentIndex].content}"
                </p>

                <div className="testimonial-author">
                  <div className="author-avatar">{testimonials[currentIndex].avatar}</div>
                  <div className="author-info">
                    <div className="author-name">{testimonials[currentIndex].name}</div>
                    <div className="author-role">
                      {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button className="carousel-btn carousel-btn-next" onClick={next} aria-label="Next testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        <div className="testimonials-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'dot-active' : ''}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
