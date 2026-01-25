import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { GameDataProvider } from './context/GameDataContext';
import BackgroundCanvas from './components/BackgroundCanvas';
import Navigation from './components/layout/Navigation';
import Home from './pages/Home';
import PublicDashboard from './pages/PublicDashboard';
import Nations from './pages/Nations';
import About from './pages/About';
import Login from './pages/Login';
import LeaderDashboard from './pages/LeaderDashboard';
import DeveloperPortal from './pages/DeveloperPortal';
import CommunityGuidelines from './pages/CommunityGuidelines';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router basename="/Grand-Campaigns">
      <AuthProvider>
        <GameDataProvider>
          <div className="App">
            <BackgroundCanvas />
            
            {/* Left Sidebar for future functionality */}
            <div className="left-sidebar">
              {/* Sidebar content will be added later */}
            </div>
            
            <Navigation />
            
            <div className="content">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<PublicDashboard />} />
                <Route path="/nations" element={<Nations />} />
                <Route path="/about" element={<About />} />
                <Route path="/community-guidelines" element={<CommunityGuidelines />} />
                <Route path="/login" element={<Login />} />
                
                {/* Protected Routes */}
                <Route 
                  path="/leader/*" 
                  element={
                    <ProtectedRoute>
                      <LeaderDashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/developer-portal" 
                  element={
                    <ProtectedRoute>
                      <DeveloperPortal />
                    </ProtectedRoute>
                  } 
                />
              </Routes>

              <footer className="main-footer">
                {/* Top Section - Single Line */}
                <div className="footer-top">
                  <div className="footer-brand-section">
                    <img src="/Grand-Campaigns.svg" alt="Grand Campaigns" className="footer-logo-icon" />
                    <span className="footer-brand-text">GRAND CAMPAIGNS</span>
                  </div>
                  
                  <div className="footer-links-section">
                    <button 
                      className="footer-language-btn"
                      onClick={() => {
                        document.getElementById('language-panel').classList.add('active');
                        document.getElementById('blur-overlay').classList.add('active');
                      }}
                    >
                      <span className="footer-icon">🌐</span>
                    </button>
                    
                    <Link to="/community-guidelines" className="footer-link">Community Guidelines</Link>
                    <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
                    <a href="/terms-of-service" className="footer-link">Terms of Service</a>
                  </div>
                </div>
                
                {/* Separator Line */}
                <div className="footer-separator"></div>
                
                {/* Bottom Section - Copyright */}
                <div className="footer-bottom">
                  <p className="footer-copyright">
                    &copy; 2026 Grand Campaigns - Napoleonic Wars Community Game. All rights reserved.
                  </p>
                </div>

                {/* Language Selection Panel - Slide from Right */}
                <div 
                  id="blur-overlay" 
                  className="language-blur-overlay"
                  onClick={() => {
                    document.getElementById('language-panel').classList.remove('active');
                    document.getElementById('blur-overlay').classList.remove('active');
                  }}
                ></div>
                <div id="language-panel" className="language-slide-panel">
                  <div className="language-panel-header">
                    <h3>Select Language</h3>
                    <button 
                      className="language-close-btn"
                      onClick={() => {
                        document.getElementById('language-panel').classList.remove('active');
                        document.getElementById('blur-overlay').classList.remove('active');
                      }}
                    >
                      ×
                    </button>
                  </div>
                  <div className="language-panel-options">
                    <div className="language-option-item">
                      <span className="language-flag">EN</span>
                      <span className="language-name">English</span>
                    </div>
                    <div className="language-option-item">
                      <span className="language-flag">FR</span>
                      <span className="language-name">Français</span>
                    </div>
                    <div className="language-option-item">
                      <span className="language-flag">DE</span>
                      <span className="language-name">Deutsch</span>
                    </div>
                    <div className="language-option-item">
                      <span className="language-flag">ES</span>
                      <span className="language-name">Español</span>
                    </div>
                    <div className="language-option-item">
                      <span className="language-flag">RU</span>
                      <span className="language-name">Русский</span>
                    </div>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </GameDataProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
