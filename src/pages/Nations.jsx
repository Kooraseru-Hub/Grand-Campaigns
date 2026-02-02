import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useGameData } from '../context/GameDataContext';
import Card from '../components/common/Card';
import BattleModal from '../components/common/BattleModal';
import './Nations.css';

const Nations = () => {
  const { nations } = useGameData();
  const location = useLocation();
  const [sortBy, setSortBy] = useState('name'); // 'name', 'status'
  const [expandedNations, setExpandedNations] = useState({});
  const [expandedDivisions, setExpandedDivisions] = useState({});
  const [isBattleModalOpen, setIsBattleModalOpen] = useState(false);

  // Check if we should show the modal (coming from Battle button)
  useEffect(() => {
    if (location.state?.showModal) {
      setIsBattleModalOpen(true);
    }
  }, [location]);

  // Filter nations by status
  const activeNations = nations.filter(n => n.status === 'active');
  const upcomingNations = [
    { id: 'up1', name: 'Prussia', emblem: '', leader: 'Coming Soon', status: 'upcoming' },
    { id: 'up2', name: 'Sweden', emblem: '', leader: 'Coming Soon', status: 'upcoming' },
    { id: 'up3', name: 'Ottoman Empire', emblem: '', leader: 'Coming Soon', status: 'upcoming' }
  ];
  const inactiveNations = nations.filter(n => n.status !== 'active');

  const sortedNations = [...activeNations].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'status') return a.status.localeCompare(b.status);
    return 0;
  });

  const toggleNationExpansion = (nationId) => {
    setExpandedNations(prev => ({
      ...prev,
      [nationId]: !prev[nationId]
    }));
  };

  const toggleDivisionExpansion = (divisionId) => {
    setExpandedDivisions(prev => ({
      ...prev,
      [divisionId]: !prev[divisionId]
    }));
  };

  // Mock data for divisions and regiments
  const getDivisions = (nationId) => {
    return [
      { 
        id: `${nationId}-div1`, 
        name: '1st Infantry Division',
        commander: 'General Pierre',
        rally: 250,
        icon: '/assets/divisions/infantry-1.png', // Placeholder for division icon
        regiments: [
          { id: `${nationId}-div1-reg1`, name: '1st Regiment', soldiers: 80, commander: 'Col. Martin', icon: '/assets/regiments/regiment-1.png' },
          { id: `${nationId}-div1-reg2`, name: '2nd Regiment', soldiers: 90, commander: 'Col. Dupont', icon: '/assets/regiments/regiment-2.png' },
          { id: `${nationId}-div1-reg3`, name: '3rd Regiment', soldiers: 80, commander: 'Col. Bernard', icon: '/assets/regiments/regiment-3.png' }
        ]
      },
      { 
        id: `${nationId}-div2`, 
        name: '2nd Infantry Division',
        commander: 'General Henri',
        rally: 280,
        icon: '/assets/divisions/infantry-2.png',
        regiments: [
          { id: `${nationId}-div2-reg1`, name: '4th Regiment', soldiers: 95, commander: 'Col. Rousseau', icon: '/assets/regiments/regiment-4.png' },
          { id: `${nationId}-div2-reg2`, name: '5th Regiment', soldiers: 85, commander: 'Col. Lambert', icon: '/assets/regiments/regiment-5.png' },
          { id: `${nationId}-div2-reg3`, name: '6th Regiment', soldiers: 100, commander: 'Col. Moreau', icon: '/assets/regiments/regiment-6.png' }
        ]
      },
      { 
        id: `${nationId}-div3`, 
        name: 'Imperial Guard Division',
        commander: 'Marshal Ney',
        rally: 320,
        icon: '/assets/divisions/imperial-guard.png',
        regiments: [
          { id: `${nationId}-div3-reg1`, name: 'Grenadiers', soldiers: 110, commander: 'Col. Lefebvre', icon: '/assets/regiments/grenadiers.png' },
          { id: `${nationId}-div3-reg2`, name: 'Chasseurs', soldiers: 105, commander: 'Col. Dumas', icon: '/assets/regiments/chasseurs.png' },
          { id: `${nationId}-div3-reg3`, name: 'Young Guard', soldiers: 105, commander: 'Col. Marmont', icon: '/assets/regiments/young-guard.png' }
        ]
      },
      { 
        id: `${nationId}-div4`, 
        name: 'Cavalry Corps',
        commander: 'General Murat',
        rally: 200,
        icon: '/assets/divisions/cavalry.png',
        regiments: [
          { id: `${nationId}-div4-reg1`, name: 'Cuirassiers', soldiers: 70, commander: 'Col. Kellerman', icon: '/assets/regiments/cuirassiers.png' },
          { id: `${nationId}-div4-reg2`, name: 'Hussars', soldiers: 65, commander: 'Col. Lasalle', icon: '/assets/regiments/hussars.png' },
          { id: `${nationId}-div4-reg3`, name: 'Dragoons', soldiers: 65, commander: 'Col. Grouchy', icon: '/assets/regiments/dragoons.png' }
        ]
      }
    ];
  };

  return (
    <div className="nations-page">
      <div className="nations-container">
        {/* Header */}
        <div className="nations-header">
          <h1 className="nations-title">Nations of Europe</h1>
          <p className="nations-subtitle">
            Explore the major powers competing for dominance in the Napoleonic Wars
          </p>
        </div>

        {/* Sort Controls */}
        <div className="sort-controls">
          <span className="sort-label">Sort by:</span>
          <div className="sort-buttons">
            <button
              className={`sort-btn ${sortBy === 'name' ? 'active' : ''}`}
              onClick={() => setSortBy('name')}
            >
              Name
            </button>
            <button
              className={`sort-btn ${sortBy === 'status' ? 'active' : ''}`}
              onClick={() => setSortBy('status')}
            >
              Status
            </button>
          </div>
        </div>

        {/* Active Nations */}
        <h2 className="nations-section-title">Active Nations</h2>
        <div className="nations-grid">
          {sortedNations.map((nation) => {
            const divisions = getDivisions(nation.id);
            const isExpanded = expandedNations[nation.id];
            
            return (
              <Card 
                key={nation.id} 
                className={`nation-card ${isExpanded ? 'expanded' : ''}`}
              >
                <div className="nation-card-header">
                  <div className="nation-emblem-large">{nation.emblem}</div>
                  <div className="nation-header-info">
                    <h3 className="nation-card-name">{nation.name}</h3>
                    <p className="nation-leader-name">{nation.leader}</p>
                  </div>
                  <div className={`nation-status-badge ${nation.status}`}>
                    {nation.status}
                  </div>
                </div>

                <div className="nation-stats-simple">
                  <div className="nation-stat-row">
                    <span className="stat-label">Nation Leader:</span>
                    <span className="stat-value-username">{nation.leader}</span>
                  </div>
                  <div className="nation-stat-row">
                    <span className="stat-label">Total Rally:</span>
                    <span className="stat-value">1,250</span>
                  </div>
                </div>

                <div className="nation-relations">
                  <div className="relations-section">
                    <span className="relations-label">Allies:</span>
                    <div className="relations-list">
                      {nation.allies.length > 0 ? (
                        nation.allies.map((allyId) => {
                          const ally = nations.find(n => n.id === allyId);
                          return ally ? (
                            <span key={allyId} className="relation-flag" title={ally.name}>
                              {ally.emblem}
                            </span>
                          ) : null;
                        })
                      ) : (
                        <span className="no-relations">None</span>
                      )}
                    </div>
                  </div>
                  <div className="relations-section">
                    <span className="relations-label">Enemies:</span>
                    <div className="relations-list">
                      {nation.enemies.length > 0 ? (
                        nation.enemies.map((enemyId) => {
                          const enemy = nations.find(n => n.id === enemyId);
                          return enemy ? (
                            <span key={enemyId} className="relation-flag" title={enemy.name}>
                              {enemy.emblem}
                            </span>
                          ) : null;
                        })
                      ) : (
                        <span className="no-relations">None</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable Divisions Section */}
                <div className="nation-divisions-expandable">
                  <button 
                    className="expand-divisions-btn"
                    onClick={() => toggleNationExpansion(nation.id)}
                  >
                    <span>{isExpanded ? '▼' : '▶'}</span>
                    <span>Divisions ({divisions.length})</span>
                  </button>

                  {isExpanded && (
                    <div className="divisions-expanded-content">
                      {divisions.map((division) => {
                        const isDivExpanded = expandedDivisions[division.id];
                        return (
                          <div key={division.id} className="division-item">
                            <div className="division-header">
                              <button 
                                className="expand-regiment-btn"
                                onClick={() => toggleDivisionExpansion(division.id)}
                              >
                                <span>{isDivExpanded ? '▼' : '▶'}</span>
                              </button>
                              <div className="division-icon-wrapper">
                                <img 
                                  src={division.icon} 
                                  alt={`${division.name} insignia`}
                                  className="division-icon"
                                  onError={(e) => e.target.style.display = 'none'}
                                />
                              </div>
                              <div className="division-info">
                                <h4 className="division-title">{division.name}</h4>
                                <div className="division-stats">
                                  <span className="division-commander">
                                    <span className="stat-icon">👤</span>
                                    {division.commander}
                                  </span>
                                  <span className="division-rally">
                                    <span className="stat-icon">⚡</span>
                                    {division.rally} Rally
                                  </span>
                                </div>
                              </div>
                            </div>

                            {isDivExpanded && (
                              <div className="regiments-list">
                                {division.regiments.map((regiment) => (
                                  <div key={regiment.id} className="regiment-item">
                                    <div className="regiment-icon-wrapper">
                                      <img 
                                        src={regiment.icon} 
                                        alt={`${regiment.name} colors`}
                                        className="regiment-icon"
                                        onError={(e) => e.target.style.display = 'none'}
                                      />
                                    </div>
                                    <div className="regiment-content">
                                      <span className="regiment-name">{regiment.name}</span>
                                      <div className="regiment-details">
                                        <span className="regiment-commander">
                                          <span className="stat-icon">👤</span>
                                          {regiment.commander}
                                        </span>
                                        <span className="regiment-soldiers">
                                          <span className="stat-icon">🎖️</span>
                                          {regiment.soldiers} soldiers
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Join Discord Button */}
                <a 
                  href={nation.discordInvite || 'https://discord.gg/grand-campaigns'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="join-discord-btn-card"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span className="discord-icon">💬</span>
                  <span>Join {nation.name} Discord</span>
                </a>
              </Card>
            );
          })}
        </div>

        {/* Upcoming Nations */}
        <h2 className="nations-section-title">Upcoming Nations</h2>
        <div className="nations-grid upcoming-grid">
          {upcomingNations.map((nation) => (
            <Card 
              key={nation.id} 
              className="nation-card upcoming-card"
            >
              <div className="nation-card-header">
                <div className="nation-emblem-large">{nation.emblem}</div>
                <div className="nation-header-info">
                  <h3 className="nation-card-name">{nation.name}</h3>
                  <p className="nation-leader-name">Coming Soon</p>
                </div>
                <div className="nation-status-badge upcoming">
                  Upcoming
                </div>
              </div>
              <p className="upcoming-description">This nation will be available soon. Stay tuned for updates!</p>
            </Card>
          ))}
        </div>

        {/* Inactive Nations */}
        {inactiveNations.length > 0 && (
          <>
            <h2 className="nations-section-title">Inactive Nations</h2>
            <div className="nations-grid inactive-grid">
              {inactiveNations.map((nation) => (
                <Card 
                  key={nation.id} 
                  className="nation-card inactive-card"
                >
                  <div className="nation-card-header">
                    <div className="nation-emblem-large">{nation.emblem}</div>
                    <div className="nation-header-info">
                      <h3 className="nation-card-name">{nation.name}</h3>
                      <p className="nation-leader-name">{nation.leader}</p>
                    </div>
                    <div className="nation-status-badge inactive">
                      Inactive
                    </div>
                  </div>
                  <p className="inactive-description">This nation is currently inactive.</p>
                </Card>
              ))}
            </div>
          </>
        )}

      </div>

      {/* Battle Modal */}
      <BattleModal 
        isOpen={isBattleModalOpen} 
        onClose={() => setIsBattleModalOpen(false)} 
      />
    </div>
  );
};

export default Nations;
