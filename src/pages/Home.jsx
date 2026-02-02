import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import { motion } from 'framer-motion';
import Button from '../components/common/Button';
import './Home.css';

const Home = () => {
  const { gameStats, diplomacy, battles } = useGameData();
  const navigate = useNavigate();
  
  const handleBattleClick = () => {
    navigate('/nations', { state: { showModal: true } });
  };

  const recentUpdates = [
    {
      id: 1,
      type: 'battle',
      title: 'Battle of Austerlitz',
      description: 'French forces achieve decisive victory against Austro-Russian coalition. Heavy casualties reported on both sides.',
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      type: 'diplomacy',
      title: 'Treaty of Tilsit Negotiations',
      description: 'France and Russia enter preliminary peace negotiations. Prussia observes developments closely.',
      timestamp: '5 hours ago'
    },
    {
      id: 3,
      type: 'event',
      title: 'Continental System Enforcement',
      description: 'Imperial decree reinforces trade restrictions against Britain. All nations must comply with blockade.',
      timestamp: '1 day ago'
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Section with Video Background */}
      <section className="hero-section-new">
        <div className="hero-video-container">
          {/* Video background behind Grand Campaigns title */}
          <video className="hero-video-background" autoPlay loop muted playsInline>
            <source src="/path-to-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="hero-content-new">
          <h1 className="hero-title-new">Grand Campaigns</h1>
          
          <div className="hero-buttons-new">
            <Button 
              variant="battle" 
              size="large"
              onClick={handleBattleClick}
            >
              Battle!
            </Button>
          </div>
          
          <div className="hero-scroll-indicator">
            <div className="scroll-arrow">↓</div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="news-section">
        <div className="news-container">
          <h2 className="news-title">Latest News</h2>
          
          <div className="news-grid">
            {/* Small news cards - stacked on left */}
            <div className="news-small-stack">
              <motion.div 
                className="news-card news-card-small"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="news-image-placeholder">
                  <span>NEWS IMAGE</span>
                </div>
                <div className="news-content">
                  <span className="news-date">January 20, 2026</span>
                  <h3 className="news-card-title">New Campaign Update Released</h3>
                  <p className="news-excerpt">Experience the latest features and improvements in our newest update...</p>
                </div>
              </motion.div>

              <motion.div 
                className="news-card news-card-small"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="news-image-placeholder">
                  <span>NEWS IMAGE</span>
                </div>
                <div className="news-content">
                  <span className="news-date">January 15, 2026</span>
                  <h3 className="news-card-title">Community Event Announced</h3>
                  <p className="news-excerpt">Join us for our upcoming community event featuring special rewards...</p>
                </div>
              </motion.div>

              <motion.div 
                className="news-card news-card-small"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="news-image-placeholder">
                  <span>NEWS IMAGE</span>
                </div>
                <div className="news-content">
                  <span className="news-date">January 12, 2026</span>
                  <h3 className="news-card-title">New Nation Added: Austria</h3>
                  <p className="news-excerpt">Command the Austrian Empire with unique abilities and historical accuracy...</p>
                </div>
              </motion.div>
            </div>

            {/* Large news card - on right */}
            <motion.div 
              className="news-card news-card-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="news-image-placeholder news-image-large">
                <span>FEATURED NEWS IMAGE</span>
              </div>
              <div className="news-content">
                <span className="news-date">January 24, 2026</span>
                <h3 className="news-card-title">Major Battle System Overhaul</h3>
                <p className="news-excerpt">
                  We're excited to announce a complete overhaul of the battle system. This comprehensive update includes 
                  new tactical options, improved unit formations, and enhanced strategic depth. Commanders will now have 
                  access to advanced maneuvers and historical battle tactics from the Napoleonic era. Join us as we enter 
                  a new chapter of warfare!
                </p>
                <Button variant="outline" size="small">Read More</Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Current Updates Section */}
      <section className="current-updates-section">
        <div className="updates-container">
          <h2 className="updates-title">Current Updates</h2>
          
          <div className="updates-timeline">
            {/* Update Item 1 */}
            <motion.div 
              className="update-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="update-date">
                <span className="update-day">24</span>
                <span className="update-month">JAN</span>
              </div>
              <div className="update-content">
                <h3 className="update-title">Battle System 2.0 Released</h3>
                <p className="update-description">
                  Major overhaul to combat mechanics including new formations, artillery improvements, and cavalry charges. 
                  Experience more tactical and strategic warfare than ever before.
                </p>
                <div className="update-tags">
                  <span className="update-tag">Gameplay</span>
                  <span className="update-tag">Combat</span>
                </div>
              </div>
            </motion.div>

            {/* Update Item 2 */}
            <motion.div 
              className="update-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="update-date">
                <span className="update-day">20</span>
                <span className="update-month">JAN</span>
              </div>
              <div className="update-content">
                <h3 className="update-title">New European Territories Added</h3>
                <p className="update-description">
                  Expanded map with 15 new territories across Europe. Control key strategic locations and dominate 
                  the continent through diplomacy or conquest.
                </p>
                <div className="update-tags">
                  <span className="update-tag">Map</span>
                  <span className="update-tag">Territories</span>
                </div>
              </div>
            </motion.div>

            {/* Update Item 3 */}
            <motion.div 
              className="update-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="update-date">
                <span className="update-day">15</span>
                <span className="update-month">JAN</span>
              </div>
              <div className="update-content">
                <h3 className="update-title">Diplomacy System Enhanced</h3>
                <p className="update-description">
                  New treaty options, trade agreements, and alliance mechanics. Navigate complex political relationships 
                  and forge your path to victory through cunning diplomacy.
                </p>
                <div className="update-tags">
                  <span className="update-tag">Diplomacy</span>
                  <span className="update-tag">Features</span>
                </div>
              </div>
            </motion.div>

            {/* Update Item 4 */}
            <motion.div 
              className="update-item"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="update-date">
                <span className="update-day">10</span>
                <span className="update-month">JAN</span>
              </div>
              <div className="update-content">
                <h3 className="update-title">Performance Optimizations</h3>
                <p className="update-description">
                  Significant performance improvements across all systems. Enjoy smoother gameplay, faster loading times, 
                  and better server stability for large-scale battles.
                </p>
                <div className="update-tags">
                  <span className="update-tag">Performance</span>
                  <span className="update-tag">Bug Fixes</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Video Carousel Section */}
      <section className="video-carousel-section">
        <div className="video-carousel-container">
          <h2 className="carousel-title">Game Features</h2>
          
          <div className="carousel-wrapper">
            <button 
              className="carousel-nav carousel-nav-left"
              onClick={() => {
                const container = document.querySelector('.carousel-track');
                container.scrollBy({ left: -400, behavior: 'smooth' });
              }}
            >
              ‹
            </button>

            <div className="carousel-track">
              {/* Video Card 1 */}
              <motion.div 
                className="video-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
              >
                <div className="video-thumbnail">
                  <div className="video-placeholder">VIDEO 1</div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Epic Battle System</h3>
                  <p className="video-description">Experience realistic Napoleonic warfare with tactical formations and strategy</p>
                </div>
              </motion.div>

              {/* Video Card 2 */}
              <motion.div 
                className="video-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                <div className="video-thumbnail">
                  <div className="video-placeholder">VIDEO 2</div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Diplomatic Relations</h3>
                  <p className="video-description">Form alliances, negotiate treaties, and shape the political landscape</p>
                </div>
              </motion.div>

              {/* Video Card 3 */}
              <motion.div 
                className="video-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <div className="video-thumbnail">
                  <div className="video-placeholder">VIDEO 3</div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Nation Management</h3>
                  <p className="video-description">Lead your nation to glory through strategic resource management</p>
                </div>
              </motion.div>

              {/* Video Card 4 */}
              <motion.div 
                className="video-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <div className="video-thumbnail">
                  <div className="video-placeholder">VIDEO 4</div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Historical Campaigns</h3>
                  <p className="video-description">Relive famous battles and create your own alternate history</p>
                </div>
              </motion.div>

              {/* Video Card 5 */}
              <motion.div 
                className="video-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.4 }}
              >
                <div className="video-thumbnail">
                  <div className="video-placeholder">VIDEO 5</div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Multiplayer Action</h3>
                  <p className="video-description">Join forces with players worldwide in massive campaigns</p>
                </div>
              </motion.div>

              {/* Video Card 6 */}
              <motion.div 
                className="video-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.5 }}
              >
                <div className="video-thumbnail">
                  <div className="video-placeholder">VIDEO 6</div>
                  <div className="play-button">▶</div>
                </div>
                <div className="video-info">
                  <h3 className="video-title">Immersive Roleplay</h3>
                  <p className="video-description">Step into the shoes of historical figures and commanders</p>
                </div>
              </motion.div>
            </div>

            <button 
              className="carousel-nav carousel-nav-right"
              onClick={() => {
                const container = document.querySelector('.carousel-track');
                container.scrollBy({ left: 400, behavior: 'smooth' });
              }}
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* Leader Section */}
      <section className="leader-section">
        <motion.div
          className="leader-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="leader-title">Interested in leading a nation?</h2>
          <div className="leader-info">
            <p>Take command of entire nations, forge alliances, declare wars, and shape the course of history. As a national leader, you'll have the power to:</p>
            <ul className="leader-features">
              <li>Command armies and plan military campaigns</li>
              <li>Conduct diplomatic negotiations with other nations</li>
              <li>Manage national resources and economic policy</li>
              <li>Appoint generals and government officials</li>
              <li>Decide the fate of millions through strategic decisions</li>
            </ul>
            <Link to="/login">
              <Button variant="primary" size="large">
                Apply for Leadership
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Credits Section */}
      <section className="credits-section">
        <motion.div
          className="credits-content"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="credits-title">Development Team</h2>
          
          {/* Main Leaders */}
          <div className="credits-grid-main">
            <div className="credit-item-main">
              <h3>Kooraseru</h3>
              <p>Lead Developer</p>
            </div>
            <div className="credit-item-main">
              <h3>Chris</h3>
              <p>Developer</p>
            </div>
            <div className="credit-item-main">
              <h3>Rowboat</h3>
              <p>Developer</p>
            </div>
          </div>

          {/* Full Team Section */}
          <div className="full-team-section">
            <h3 className="team-subtitle">Full Development Team</h3>
            <div className="team-grid">
              <div className="team-member">
                <span className="member-name">Kooraseru</span>
                <span className="member-role">Lead Developer</span>
              </div>
              <div className="team-member">
                <span className="member-name">Chris</span>
                <span className="member-role">Developer</span>
              </div>
              <div className="team-member">
                <span className="member-name">Rowboat</span>
                <span className="member-role">Developer</span>
              </div>
              <div className="team-member">
                <span className="member-name">Developer 4</span>
                <span className="member-role">Backend Engineer</span>
              </div>
              <div className="team-member">
                <span className="member-name">Developer 5</span>
                <span className="member-role">UI/UX Designer</span>
              </div>
              <div className="team-member">
                <span className="member-name">Developer 6</span>
                <span className="member-role">Content Creator</span>
              </div>
              <div className="team-member">
                <span className="member-name">Developer 7</span>
                <span className="member-role">QA Tester</span>
              </div>
              <div className="team-member">
                <span className="member-name">Developer 8</span>
                <span className="member-role">Community Manager</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
