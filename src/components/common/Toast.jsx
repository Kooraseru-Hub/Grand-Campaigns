import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';

const Toast = ({ message, type = 'info', isVisible, onClose, duration = 3000 }) => {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const icons = {
    success: '✓',
    error: '×',
    warning: '!',
    info: 'ℹ'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className={`toast toast-${type}`}
          initial={{ opacity: 0, y: -50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
        >
          <span className="toast-icon">{icons[type]}</span>
          <span className="toast-message">{message}</span>
          <button className="toast-close" onClick={onClose}>×</button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
