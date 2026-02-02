import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { permissionLevels, mockPermissions, getPermissionLevel } from '../services/permissionsData';
import './PermissionManager.css';

const PermissionManager = () => {
  const { user } = useAuth();
  const [permissions, setPermissions] = useState(mockPermissions.filter(p => p.nationId === 1));

  const handleRevokePermission = (permissionId) => {
    setPermissions(permissions.map(p => 
      p.id === permissionId ? { ...p, status: 'revoked' } : p
    ));
  };

  return (
    <div className="permission-manager">
      <div className="pm-header">
        <h1>Permission Management System</h1>
        <p>Manage player permissions and rally points for your nation</p>
      </div>

      {/* Stats Overview */}
      <div className="pm-stats-grid">
        <div className="pm-stat-card">
          <div className="pm-stat-icon">👥</div>
          <div className="pm-stat-content">
            <span className="pm-stat-label">Active Permissions</span>
            <span className="pm-stat-value">{permissions.filter(p => p.status === 'active').length}</span>
          </div>
        </div>
        <div className="pm-stat-card">
          <div className="pm-stat-content">
            <span className="pm-stat-label">Total Rally Points</span>
            <span className="pm-stat-value">
              {permissions.filter(p => p.status === 'active').reduce((sum, p) => sum + p.rallyPoints, 0)}
            </span>
          </div>
        </div>
        <div className="pm-stat-card">
          <div className="pm-stat-content">
            <span className="pm-stat-label">Officers (Lv 5+)</span>
            <span className="pm-stat-value">
              {permissions.filter(p => p.status === 'active' && p.permissionLevel >= 5).length}
            </span>
          </div>
        </div>
        <div className="pm-stat-card">
          <div className="pm-stat-content">
            <span className="pm-stat-label">Coordinators (Lv 4)</span>
            <span className="pm-stat-value">
              {permissions.filter(p => p.status === 'active' && p.permissionLevel === 4).length}
            </span>
          </div>
        </div>
      </div>

      {/* Permission Levels Reference */}
      <div className="pm-section">
        <div className="pm-section-header">
          <h2>Permission Levels Guide</h2>
          <p className="pm-help-text">Levels 1-4 require rally points. Levels 5-8 are assigned by leaders.</p>
        </div>
        <div className="pm-levels-grid">
          {permissionLevels.map(level => (
            <div key={level.level} className="pm-level-card" style={{ borderLeftColor: level.color }}>
              <div className="pm-level-header">
                <span className="pm-level-number" style={{ backgroundColor: level.color }}>
                  {level.level}
                </span>
                <span className="pm-level-name">{level.name}</span>
              </div>
              <div className="pm-level-body">
                <p className="pm-level-desc">{level.description}</p>
                <span className="pm-level-rally" style={{ color: level.color }}>
                  {level.rallyRequired > 0 ? `Requires ${level.rallyRequired} Rally` : 'Leader Assigned'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Permissions Management */}
      <div className="pm-section">
        <div className="pm-section-header">
          <h2>Active Permissions</h2>
        </div>

        <div className="pm-table-container">
          <table className="pm-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Level</th>
                <th>Rally Points</th>
                <th>Granted By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {permissions.map(perm => {
                const levelInfo = getPermissionLevel(perm.permissionLevel);
                return (
                  <tr key={perm.id} className={perm.status === 'revoked' ? 'pm-revoked' : ''}>
                    <td className="pm-player-name">{perm.playerUsername}</td>
                    <td>
                      <span className="pm-level-badge" style={{ backgroundColor: levelInfo?.color }}>
                        {levelInfo?.name} (Lv {perm.permissionLevel})
                      </span>
                    </td>
                    <td className="pm-rally">{perm.rallyPoints}</td>
                    <td>{perm.grantedBy}</td>
                    <td className="pm-date">{new Date(perm.grantedAt).toLocaleDateString()}</td>
                    <td>
                      <span className={`pm-status-badge ${perm.status}`}>
                        {perm.status}
                      </span>
                    </td>
                    <td>
                      {perm.status === 'active' && (
                        <button 
                          className="pm-btn-revoke"
                          onClick={() => handleRevokePermission(perm.id)}
                        >
                          Revoke
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default PermissionManager;