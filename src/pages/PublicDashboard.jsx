import React, { useState } from 'react';
import { useGameData } from '../context/GameDataContext';
import Card from '../components/common/Card';
import './PublicDashboard.css';

const PublicDashboard = () => {
  const { diplomacy, battles, nations, gameStats } = useGameData();
  const [filter, setFilter] = useState('all'); // 'all', 'battles', 'diplomacy'

  const getDiplomacyIcon = (type) => {
    const icons = {
      treaty: 'T',
      alliance: 'A',
      war_declaration: 'W',
      peace_proposal: 'P',
      trade_agreement: '$'
    };
    return icons[type] || 'D';
  };

  const getDiplomacyColor = (type) => {
    const colors = {
      treaty: 'gold',
      alliance: 'success',
      war_declaration: 'danger',
      peace_proposal: 'default',
      trade_agreement: 'gold'
    };
    return colors[type] || 'default';
  };

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  return (
    <div className="public-dashboard">
      <div className="dashboard-container">
        {/* Header */}
        <div className="dashboard-header">
          <h1 className="dashboard-title">Operations Board</h1>
          <p className="dashboard-subtitle">
            Real-time military operations and diplomatic developments across Europe
          </p>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <Card className="stat-card" variant="gold">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{gameStats?.totalPlayers || 0}</div>
                <div className="stat-label">Active Players</div>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{battles.filter(b => b.status === 'ongoing').length}</div>
                <div className="stat-label">Ongoing Battles</div>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{diplomacy.filter(d => d.status === 'active').length}</div>
                <div className="stat-label">Active Treaties</div>
              </div>
            </div>
          </Card>
          <Card className="stat-card">
            <div className="stat-content">
              <div className="stat-info">
                <div className="stat-value">{nations.length}</div>
                <div className="stat-label">Nations</div>
              </div>
            </div>
          </Card>
        </div>

        {/* Filter Tabs */}
        <div className="filter-tabs">
          <button 
            className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Updates
          </button>
          <button 
            className={`filter-tab ${filter === 'battles' ? 'active' : ''}`}
            onClick={() => setFilter('battles')}
          >
            Battles
          </button>
          <button 
            className={`filter-tab ${filter === 'diplomacy' ? 'active' : ''}`}
            onClick={() => setFilter('diplomacy')}
          >
            Diplomacy
          </button>
        </div>

        {/* Main Content */}
        <div className="dashboard-content">
          {/* Battles Feed */}
          {(filter === 'all' || filter === 'battles') && (
            <div className="feed-section">
              <h2 className="feed-title">Battle Reports</h2>
              <div className="feed-list">
                {battles.map((battle) => (
                  <Card 
                    key={battle.id} 
                    className="feed-item"
                  >
                    <div className="feed-item-header">
                      <div className="feed-item-title-section">
                        <h3 className="feed-item-title">{battle.name}</h3>
                        <span className={`feed-badge ${battle.status}`}>
                          {battle.status}
                        </span>
                      </div>
                      <span className="feed-timestamp">
                        {formatTimestamp(battle.startTime)}
                      </span>
                    </div>
                    <p className="feed-item-description">{battle.description}</p>
                    <div className="feed-item-details">
                      <div className="detail-item">
                        <span className="detail-label">Location:</span>
                        <span>{battle.location}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Forces:</span>
                        <span>{battle.participants.length} Nations</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Victor:</span>
                        <span>{battle.victor || 'In Progress'}</span>
                      </div>
                    </div>
                    <div className="participating-nations">
                      {battle.participants.map((p) => (
                        <span key={p.nationId} className="nation-badge-small" title={p.name}>
                          {p.name}
                        </span>
                      ))}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Diplomacy Feed */}
          {(filter === 'all' || filter === 'diplomacy') && (
            <div className="feed-section">
              <h2 className="feed-title">🤝 Diplomatic Actions</h2>
              <div className="feed-list">
                {diplomacy.map((action) => (
                  <Card 
                    key={action.id} 
                    className="feed-item"
                    variant={getDiplomacyColor(action.type)}
                    hoverable
                  >
                    <div className="feed-item-header">
                      <div className="feed-item-title-section">
                        <span className="diplomacy-icon">{getDiplomacyIcon(action.type)}</span>
                        <h3 className="feed-item-title">
                          {action.type.replace('_', ' ').toUpperCase()}
                        </h3>
                        <span className={`feed-badge ${action.status}`}>
                          {action.status}
                        </span>
                      </div>
                      <span className="feed-timestamp">
                        {formatTimestamp(action.timestamp)}
                      </span>
                    </div>
                    <div className="diplomacy-nations">
                      <span className="nation-badge">
                        {nations.find(n => n.id === action.from)?.emblem} {action.fromNation}
                      </span>
                      <span className="diplomacy-arrow">→</span>
                      <span className="nation-badge">
                        {nations.find(n => n.id === action.to)?.emblem} {action.toNation}
                      </span>
                    </div>
                    <p className="feed-item-description">{action.message}</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default PublicDashboard;
