import React from 'react';
import ProfileCard from './components/ProfileCard';
import CardSwap, { Card } from './components/CardSwap';
import ShinyText from './components/ShinyText';
import './Showcase.css';

function Showcase() {
  return (
    <div className="showcase">
      <div className="showcase-header">
        <h2 className="showcase-title">Game Portals</h2>
        <p className="showcase-subtitle">Choose your campaign</p>
      </div>

      {/* Section 1: ProfileCard Component */}
      <section className="showcase-section">
        <div className="section-content">
          <div className="profile-cards-demo">
            <ProfileCard
              name="Campaign Title"
              title="PLACEHOLDER description for your game campaign. Click to explore more."
              iconUrl="PLACEHOLDER"
              contactText="Enter Campaign →"
              onContactClick={() => console.log('Campaign 1 clicked')}
              enableTilt={true}
              behindGlowEnabled={true}
              behindGlowColor="rgba(255, 107, 53, 0.4)"
              innerGradient="linear-gradient(145deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.1))"
            />
            <ProfileCard
              name="Campaign Title"
              title="PLACEHOLDER description for your game campaign. Click to explore more."
              iconUrl="PLACEHOLDER"
              contactText="Enter Campaign →"
              onContactClick={() => console.log('Campaign 2 clicked')}
              enableTilt={true}
              behindGlowEnabled={true}
              behindGlowColor="rgba(78, 205, 196, 0.4)"
              innerGradient="linear-gradient(145deg, rgba(78, 205, 196, 0.1), rgba(26, 188, 156, 0.1))"
            />
            <ProfileCard
              name="Campaign Title"
              title="PLACEHOLDER description for your game campaign. Click to explore more."
              iconUrl="PLACEHOLDER"
              contactText="Enter Campaign →"
              onContactClick={() => console.log('Campaign 3 clicked')}
              enableTilt={true}
              behindGlowEnabled={true}
              behindGlowColor="rgba(139, 92, 246, 0.4)"
              innerGradient="linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))"
            />
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="showcase-divider"></div>

      {/* Section 2: CardSwap Component */}
      <section className="showcase-section">
        <h3 className="section-subtitle-small">Featured Events</h3>
        <div className="section-content cardswap-section">
          <CardSwap
            width={400}
            height={300}
            cardDistance={40}
            verticalDistance={50}
            delay={3000}
            pauseOnHover={true}
            skewAmount={5}
            easing="elastic"
            onCardClick={(index) => console.log(`Event ${index} clicked`)}
          >
            <Card customClass="card-1">
              <div className="swap-card-content">
                <div className="swap-icon">PLACEHOLDER</div>
                <h3>Event Title</h3>
                <p>PLACEHOLDER event description</p>
              </div>
            </Card>
            <Card customClass="card-2">
              <div className="swap-card-content">
                <div className="swap-icon">PLACEHOLDER</div>
                <h3>Event Title</h3>
                <p>PLACEHOLDER event description</p>
              </div>
            </Card>
            <Card customClass="card-3">
              <div className="swap-card-content">
                <div className="swap-icon">PLACEHOLDER</div>
                <h3>Event Title</h3>
                <p>PLACEHOLDER event description</p>
              </div>
            </Card>
            <Card customClass="card-4">
              <div className="swap-card-content">
                <div className="swap-icon">PLACEHOLDER</div>
                <h3>Event Title</h3>
                <p>PLACEHOLDER event description</p>
              </div>
            </Card>
            <Card customClass="card-5">
              <div className="swap-card-content">
                <div className="swap-icon">PLACEHOLDER</div>
                <h3>Event Title</h3>
                <p>PLACEHOLDER event description</p>
              </div>
            </Card>
          </CardSwap>
        </div>
      </section>
    </div>
  );
}

export default Showcase;
