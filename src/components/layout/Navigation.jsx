import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

const Navigation = () => {
  const { user, isAuthenticated, isLeader, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  const publicLinks = [
    { path: '/', label: 'Home' },
    { path: '/dashboard', label: 'Operations Board' },
    { path: '/nations', label: 'Nations' },
    { path: '/about', label: 'About' }
  ];

  const leaderLinks = [
    { path: '/leader', label: 'Officer Portal' }
  ];

  const adminLinks = [
    { path: '/developer-portal', label: 'Dev Portal' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <svg className="nav-logo-icon" width="40" height="40" viewBox="0 0 750 750">
            <defs>
              <linearGradient id="nav-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37" />
                <stop offset="100%" stopColor="#FFD700" />
              </linearGradient>
            </defs>
            <path fill="currentColor" d="M337.6185,296.6776c9.4125-4.2592,19.6002-6.7889,30.0529-7.4097l-80.4493-103.9631,50.3964,111.3729ZM561.4741,288.6797l-111.3728,50.3964c4.2592,9.4125,6.7889,19.6002,7.4097,30.0528l103.9631-80.4492ZM377.6498,458.9686l80.4493,103.9632-50.3965-111.3728c-9.4125,4.2592-19.6001,6.7889-30.0528,7.4096ZM183.847,459.5567l111.3729-50.3965c-4.2592-9.4125-6.7889-19.6002-7.4097-30.0528l-103.9632,80.4493Z"/>
            <path fill="currentColor" d="M458.4407,333.302c-9.8501-20.7076-27.1606-37.8987-49.9448-47.1658l90.2993-239.5627-161.7827,239.4926c-23.7183,9.6093-43.5088,28.7103-53.2466,54.5447L46.5735,251.2048l239.3701,161.6998c9.9834,22.3193,28.5229,40.803,53.2095,50.1083.7822.2949,1.5659.5781,2.3511.851l-90.2993,239.5626,165.6523-245.2217c19.8779-10.4388,36.1558-27.9175,44.6978-50.5792l241.8716,91.1696-244.9858-165.4933ZM452.198,404.0986c-16.5581,43.9272-65.5903,66.1146-109.5176,49.5569s-66.1147-65.5904-49.5571-109.5176,65.5904-66.1147,109.5176-49.5571,66.1147,65.5904,49.5571,109.5178Z"/>
            <circle fill="currentColor" cx="372.6606" cy="374.1183" r="12.5"/>
          </svg>
          <div className="nav-logo-text-container">
            <span className="nav-logo-text">Grand Campaigns</span>
            <span className="nav-logo-subtitle">Napoleonic Wars</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {publicLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          
          {isAuthenticated() && isLeader() && leaderLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${isActive(link.path) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated() && user?.isAdmin && adminLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link nav-link-admin ${isActive(link.path) ? 'nav-link-active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* User Section */}
        <div className="nav-user-section">
          {isAuthenticated() ? (
            <>
              <div className="nav-user-info">
                <div className="nav-user-details">
                  <span className="nav-user-name">{user?.username}</span>
                  {user?.nation && (
                    <span className="nav-user-nation">{user.nation.name}</span>
                  )}
                </div>
              </div>
              <button className="nav-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-login-btn">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="nav-mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="nav-mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="nav-mobile-links">
              {publicLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-mobile-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              
              {isAuthenticated() && isLeader() && leaderLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-mobile-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {isAuthenticated() && user?.isAdmin && adminLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`nav-mobile-link admin-link ${isActive(link.path) ? 'active' : ''}`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {!isAuthenticated() && (
                <Link
                  to="/login"
                  className="nav-mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}

              {isAuthenticated() && (
                <button
                  className="nav-mobile-logout"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
