import React from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Card from './Card';
import Button from './Button';
import './BattleModal.css';

const BattleModal = ({ isOpen, onClose }) => {
  const communityLinks = [
    {
      name: 'Community Guidelines',
      icon: '📜',
      description: 'Review our conduct standards, roleplay expectations, and community rules before enlisting',
      link: '/community-guidelines'
    },
    {
      name: 'Terms of Service',
      icon: '⚖️',
      description: 'Understand your rights and responsibilities as a member of Grand Campaigns',
      link: '/terms-of-service'
    },
    {
      name: 'Privacy Policy',
      icon: '🔒',
      description: 'Learn how we collect, use, and protect your personal information',
      link: '/privacy-policy'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="battle-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="battle-modal-container"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            <Card className="battle-modal-card">
              <button className="battle-modal-close" onClick={onClose}>
                ×
              </button>
              
              <div className="battle-modal-header">
                <h2 className="battle-modal-title">Welcome to Grand Campaigns</h2>
                <p className="battle-modal-subtitle">
                  Enlist in the Napoleonic Wars - Choose Your Nation, Command Your Destiny
                </p>
              </div>

              <div className="battle-modal-content">
                <div className="battle-modal-info">
                  <h3>Enlistment Process</h3>
                  <ol>
                    <li>Select your nation and join their official Discord server</li>
                    <li>Complete the enlistment application and basic training</li>
                    <li>Participate in scheduled military operations and drills</li>
                    <li>Advance through the ranks through distinguished service and leadership</li>
                  </ol>
                </div>

                <div className="battle-modal-important">
                  <h3>Required Reading</h3>
                  <p>All prospective members must review the following documentation before enlisting. These policies govern conduct, expectations, and data handling within our community:</p>
                </div>

                <div className="community-links-grid">
                  {communityLinks.map((item, index) => (
                    <motion.div
                      key={item.name}
                      className="community-link-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="community-icon">{item.icon}</div>
                      <h4 className="community-name">{item.name}</h4>
                      <p className="community-description">{item.description}</p>
                      <Link 
                        to={item.link} 
                        className="community-link"
                        onClick={onClose}
                      >
                        Read More →
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BattleModal;
