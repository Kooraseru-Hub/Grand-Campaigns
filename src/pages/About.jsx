import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import './About.css';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1 className="about-title">About Grand Campaigns</h1>
          <p className="about-subtitle">
            A serious military roleplay community dedicated to the Napoleonic Wars
          </p>
        </div>

        <div className="about-content">
          <Card className="about-section">
            <h2 className="section-title">What is Grand Campaigns?</h2>
            <p>
              Grand Campaigns is a serious military roleplay community set during the Napoleonic Wars era. 
              We combine structured roleplay on Roblox with strategic coordination through this portal, 
              where members serve in organized militaries and participate in realistic operations across Europe.
            </p>
          </Card>

          <Card className="about-section">
            <h2 className="section-title">Community Structure</h2>
            <div className="mechanics-grid">
              <div className="mechanic-item">
                <h3>Nation Leaders</h3>
                <p>Oversee national policy, appoint officers, and coordinate military strategy through this portal.</p>
              </div>
              <div className="mechanic-item">
                <h3>Officer Corps</h3>
                <p>Lead regiments, train enlisted personnel, and execute orders from national leadership.</p>
              </div>
              <div className="mechanic-item">
                <h3>Enlisted Ranks</h3>
                <p>Serve in infantry, cavalry, or artillery. Follow formation commands and maintain military discipline.</p>
              </div>
              <div className="mechanic-item">
                <h3>Operations</h3>
                <p>Scheduled battles and campaigns following historical tactics and formations.</p>
              </div>
            </div>
          </Card>

          <Card className="about-section">
            <h2 className="section-title">How to Join</h2>
            <div className="how-to-play">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Submit Application</h3>
                  <p>Apply through our enlistment portal and choose your preferred nation.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Complete Training</h3>
                  <p>Learn formations, commands, and proper conduct through basic training.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Join Your Regiment</h3>
                  <p>Receive assignment and attend scheduled drills with your unit.</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Earn Promotions</h3>
                  <p>Rise through the ranks with distinguished service and leadership.</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="about-section">
            <h2 className="section-title">Community Standards</h2>
            <p>
              We maintain a serious roleplay environment with structured military hierarchy and diplomatic relations. 
              All members are expected to follow our community guidelines and respect the chain of command.
            </p>
            <Link to="/community-guidelines">
              <Button variant="secondary">
                View Full Guidelines
              </Button>
            </Link>
          </Card>

          <Card className="about-section">
            <h2 className="section-title">Frequently Asked Questions</h2>
            <div className="faq-list">
              <div className="faq-item">
                <h3 className="faq-question">Q: Is Grand Campaigns free to join?</h3>
                <p className="faq-answer">Yes, completely free. All you need is a Roblox account and dedication to serious roleplay.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Q: What time commitment is required?</h3>
                <p className="faq-answer">Enlisted personnel should attend at least 2 operations per week. Officers maintain regular contact with their regiments.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Q: How do I become a nation leader?</h3>
                <p className="faq-answer">Leaders are promoted from experienced officers who demonstrate exceptional leadership and activity.</p>
              </div>
              <div className="faq-item">
                <h3 className="faq-question">Q: Can I switch nations?</h3>
                <p className="faq-answer">Transfers are rare and must be approved by both nations' leadership.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
