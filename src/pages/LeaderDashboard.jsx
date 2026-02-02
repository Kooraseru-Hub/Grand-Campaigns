import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockPermissions, permissionLevels, getPermissionLevel } from '../services/permissionsData';
import './LeaderDashboard.css';
import './LeaderDashboard_Addon.css';

const LeaderDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [permissions, setPermissions] = useState(mockPermissions.filter(p => p.nationId === 1));
  const [showGrantForm, setShowGrantForm] = useState(false);
  const [grantMode, setGrantMode] = useState('single'); // 'single' or 'bulk'
  const [newPermission, setNewPermission] = useState({
    playerUsername: '',
    rallyPoints: 0,
    permissionLevel: 1
  });
  const [bulkPermissions, setBulkPermissions] = useState('');

  const myNation = { name: 'France', emblem: 'FR', leader: user?.username || 'Leader' };

  // Permission Slot System
  const activePermissions = permissions.filter(p => p.status === 'active');
  
  // Total rally points (this is the budget/slots available)
  const totalRally = 50; // Example: Nation has 50 rally points total
  
  // Calculate available slots per level based on rally
  // For every 10 rally: 1 Officer, 1 Commander, 1 General, 1 Coordinator
  const calculateMaxSlots = (rally) => {
    const sets = Math.floor(rally / 10);
    return {
      1: sets, // Officer slots
      2: sets, // Commander slots  
      3: sets, // General slots
      4: sets, // Coordinator slots
      5: 1     // Organiser (assigned, not based on rally)
    };
  };
  
  const maxSlots = calculateMaxSlots(totalRally);
  
  // Calculate used slots per level
  const usedSlots = {};
  permissionLevels.forEach(level => {
    usedSlots[level.level] = activePermissions.filter(p => p.permissionLevel === level.level).length;
  });
  
  // Calculate remaining slots per level
  const remainingSlots = {};
  permissionLevels.forEach(level => {
    remainingSlots[level.level] = Math.max(0, (maxSlots[level.level] || 0) - (usedSlots[level.level] || 0));
  });
  
  // Total slots available and used
  const totalMaxSlots = Object.values(maxSlots).reduce((sum, val) => sum + val, 0);
  const totalUsedSlots = Object.values(usedSlots).reduce((sum, val) => sum + val, 0);
  const totalRemainingSlots = totalMaxSlots - totalUsedSlots;
  
  // Calculate permissions by level with slot info
  const permissionsByLevel = permissionLevels.map(level => ({
    ...level,
    count: usedSlots[level.level] || 0,
    maxSlots: maxSlots[level.level] || 0,
    remainingSlots: remainingSlots[level.level] || 0,
    totalRally: activePermissions
      .filter(p => p.permissionLevel === level.level)
      .reduce((sum, p) => sum + p.rallyPoints, 0)
  }));

  const handleRevokePermission = (permissionId) => {
    setPermissions(permissions.map(p => 
      p.id === permissionId ? { ...p, status: 'revoked' } : p
    ));
  };

  const handleGrantPermission = () => {
    if (!newPermission.playerUsername) {
      alert('Please enter a valid username');
      return;
    }

    // Check if we have slots available for this level
    const level = newPermission.permissionLevel;
    if (remainingSlots[level] <= 0) {
      alert(`Cannot grant ${getPermissionLevel(level)?.name}: no slots remaining at this level`);
      return;
    }

    const permission = {
      id: Date.now(),
      nationId: 1,
      playerUsername: newPermission.playerUsername,
      permissionLevel: newPermission.permissionLevel,
      rallyPoints: newPermission.rallyPoints,
      grantedBy: user?.username || 'Leader',
      grantedAt: new Date().toISOString(),
      status: 'active'
    };

    setPermissions([...permissions, permission]);
    setNewPermission({ playerUsername: '', rallyPoints: 0, permissionLevel: 1 });
    setShowGrantForm(false);
  };

  const handleBulkGrant = () => {
    if (!bulkPermissions.trim()) {
      alert('Please enter user data');
      return;
    }

    // Parse bulk format: username:level (e.g., Player_RBX:2)
    const lines = bulkPermissions.split('\n').filter(line => line.trim());
    const newPerms = [];
    const slotCheck = { ...remainingSlots };

    for (let line of lines) {
      const parts = line.trim().split(':');
      if (parts.length !== 2) continue;

      const username = parts[0].trim();
      const level = parseInt(parts[1].trim());

      if (!username || isNaN(level) || level < 1 || level > 5) continue;

      // Check if slot available for this level
      if (slotCheck[level] <= 0) {
        alert(`Cannot grant all permissions: no more slots for Level ${level} (${getPermissionLevel(level)?.name})`);
        return;
      }

      slotCheck[level]--;

      newPerms.push({
        id: Date.now() + newPerms.length,
        nationId: 1,
        playerUsername: username,
        permissionLevel: level,
        rallyPoints: 0, // Rally points don't matter anymore, it's just slots
        grantedBy: user?.username || 'Leader',
        grantedAt: new Date().toISOString(),
        status: 'active'
      });
    }

    if (newPerms.length === 0) {
      alert('No valid entries found. Format: username:level (e.g., Player_RBX:2)');
      return;
    }

    setPermissions([...permissions, ...newPerms]);
    setBulkPermissions('');
    setShowGrantForm(false);
  };

  return (
    <div className="leader-dashboard">
      <div className="dashboard-header">
        <div className="header-left">
          <span className="header-emblem">{myNation.emblem}</span>
          <div>
            <h1>{myNation.name} Officer Portal</h1>
            <p className="header-subtitle">{myNation.leader}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="dashboard-tabs">
        <button 
          className={`dash-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`dash-tab ${activeTab === 'permissions' ? 'active' : ''}`}
          onClick={() => setActiveTab('permissions')}
        >
          Permissions
        </button>
        <button 
          className={`dash-tab ${activeTab === 'operations' ? 'active' : ''}`}
          onClick={() => setActiveTab('operations')}
        >
          Operations
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="tab-content">
          <h2>Nation Overview</h2>
          
          <div className="stats-overview">
            <div className="stat-box">
              <span className="stat-icon">👥</span>
              <div>
                <span className="stat-label">Active Members</span>
                <span className="stat-value">{permissions.filter(p => p.status === 'active').length}</span>
              </div>
            </div>
            <div className="stat-box">
              <div>
                <span className="stat-label">Total Rally</span>
                <span className="stat-value">
                  {permissions.filter(p => p.status === 'active').reduce((sum, p) => sum + p.rallyPoints, 0)}
                </span>
              </div>
            </div>
            <div className="stat-box">
              <div>
                <span className="stat-label">Officers</span>
                <span className="stat-value">
                  {permissions.filter(p => p.status === 'active' && p.permissionLevel >= 5).length}
                </span>
              </div>
            </div>
          </div>

          <div className="quick-actions-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn" onClick={() => setActiveTab('permissions')}>
                Manage Permissions
              </button>
              <button className="action-btn">
                View Operations
              </button>
              <button className="action-btn">
                Diplomatic Orders
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Permissions Tab */}
      {activeTab === 'permissions' && (
        <div className="tab-content">
          <div className="tab-header-with-action">
            <h2>Permission Management</h2>
            <button 
              className="btn-grant-permission-main"
              onClick={() => setShowGrantForm(true)}
              disabled={totalRemainingSlots === 0}
            >
              + Grant Permission
            </button>
          </div>

          {/* Permission Slots Overview */}
          <div className="permission-capacity-section">
            <h3>Permission Slots Overview</h3>
            
            <div className="capacity-stats-grid">
              <div className="capacity-stat-card primary">
                <div className="capacity-stat-header">
                  <span className="capacity-icon-text">SLOTS</span>
                  <span className="capacity-label">Total Slots</span>
                </div>
                <div className="capacity-stat-value">
                  {totalUsedSlots} / {totalMaxSlots}
                </div>
                <div className="capacity-progress">
                  <div 
                    className="capacity-progress-bar"
                    style={{ width: `${(totalUsedSlots / totalMaxSlots) * 100}%` }}
                  ></div>
                </div>
                <div className="capacity-formula">
                  ⌊{totalRally} ÷ 10⌋ sets × 4 levels = {totalMaxSlots}
                </div>
              </div>

              <div className="capacity-stat-card">
                <div className="capacity-stat-header">
                  <span className="capacity-icon-text">FREE</span>
                  <span className="capacity-label">Available</span>
                </div>
                <div className="capacity-stat-value highlight">
                  {totalRemainingSlots}
                </div>
                <div className="capacity-subtitle">
                  {totalRemainingSlots > 0 
                    ? `${totalRemainingSlots} slot${totalRemainingSlots !== 1 ? 's' : ''} remaining`
                    : 'All slots filled'}
                </div>
              </div>

              <div className="capacity-stat-card">
                <div className="capacity-stat-header">
                  <span className="capacity-icon-text">RALLY</span>
                  <span className="capacity-label">Rally Points</span>
                </div>
                <div className="capacity-stat-value">
                  {totalRally}
                </div>
                <div className="capacity-subtitle">
                  Nation's total rally budget
                </div>
              </div>

              <div className="capacity-stat-card">
                <div className="capacity-stat-header">
                  <span className="capacity-icon-text">SETS</span>
                  <span className="capacity-label">Slot Sets</span>
                </div>
                <div className="capacity-stat-value">
                  {Math.floor(totalRally / 10)}
                </div>
                <div className="capacity-subtitle">
                  1 set = 4 slots (1 per level)
                </div>
              </div>
            </div>

            {/* Next Set Unlock */}
            <div className="next-unlock-info">
              <span className="unlock-icon-text">NEXT</span>
              <span>
                Next slot set unlocks at <strong>{(Math.floor(totalRally / 10) + 1) * 10}</strong> rally 
                (need <strong>{((Math.floor(totalRally / 10) + 1) * 10) - totalRally}</strong> more rally points)
              </span>
            </div>
          </div>

          {/* Permission Distribution by Level */}
          <div className="permission-distribution-section">
            <h3>Slots by Level</h3>
            <div className="distribution-grid">
              {permissionsByLevel.map(level => (
                <div key={level.level} className="distribution-card" style={{ borderTopColor: level.color }}>
                  <div className="distribution-header">
                    <span className="distribution-level" style={{ backgroundColor: level.color }}>
                      Lv {level.level}
                    </span>
                    <span className="distribution-name">{level.name}</span>
                  </div>
                  <div className="distribution-stats">
                    <div className="distribution-stat">
                      <span className="dist-stat-label">Used / Max</span>
                      <span className="dist-stat-value">{level.count} / {level.maxSlots}</span>
                    </div>
                    <div className="distribution-stat">
                      <span className="dist-stat-label">Available</span>
                      <span className="dist-stat-value" style={{ color: level.remainingSlots > 0 ? '#4CAF50' : '#ff6b6b' }}>
                        {level.remainingSlots}
                      </span>
                    </div>
                    <div className="distribution-stat">
                      <span className="dist-stat-label">Rally Req.</span>
                      <span className="dist-stat-value">
                        {level.rallyRequired > 0 ? level.rallyRequired : 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grant Permission Modal */}
          {showGrantForm && (
            <div className="grant-modal-overlay" onClick={() => setShowGrantForm(false)}>
              <div className="grant-modal" onClick={(e) => e.stopPropagation()}>
                <div className="grant-modal-header">
                  <h3>Grant Permission</h3>
                  <button className="grant-modal-close" onClick={() => setShowGrantForm(false)}>
                    ×
                  </button>
                </div>

                <div className="grant-mode-tabs">
                  <button 
                    className={`mode-tab ${grantMode === 'single' ? 'active' : ''}`}
                    onClick={() => setGrantMode('single')}
                  >
                    Single Grant
                  </button>
                  <button 
                    className={`mode-tab ${grantMode === 'bulk' ? 'active' : ''}`}
                    onClick={() => setGrantMode('bulk')}
                  >
                    Bulk Grant
                  </button>
                </div>

                <div className="grant-modal-body">
                  {grantMode === 'single' ? (
                    <div className="grant-form">
                      <div className="form-row-two">
                        <div className="form-field">
                          <label>Player Username (Roblox)</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="PlayerName_RBX"
                            value={newPermission.playerUsername}
                            onChange={(e) => setNewPermission({...newPermission, playerUsername: e.target.value})}
                          />
                        </div>
                        <div className="form-field">
                          <label>Permission Level</label>
                          <select
                            className="form-input"
                            value={newPermission.permissionLevel}
                            onChange={(e) => setNewPermission({...newPermission, permissionLevel: parseInt(e.target.value)})}
                          >
                            {permissionLevels.map(level => (
                              <option key={level.level} value={level.level} disabled={remainingSlots[level.level] <= 0}>
                                Lv {level.level} - {level.name} ({remainingSlots[level.level]} slot{remainingSlots[level.level] !== 1 ? 's' : ''} left)
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="grant-form">
                      <div className="form-field">
                        <label>Bulk Grant (Format: username:level, one per line)</label>
                        <textarea
                          className="form-textarea"
                          placeholder="Player1_RBX:1&#10;Player2_RBX:2&#10;Player3_RBX:1"
                          rows="10"
                          value={bulkPermissions}
                          onChange={(e) => setBulkPermissions(e.target.value)}
                        />
                        <span className="form-helper">
                          Level 1=Officer, 2=Commander, 3=General, 4=Coordinator, 5=Organiser. Slots checked automatically.
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grant-modal-footer">
                  <button className="btn-cancel-grant" onClick={() => setShowGrantForm(false)}>
                    Cancel
                  </button>
                  <button 
                    className="btn-submit-grant" 
                    onClick={grantMode === 'single' ? handleGrantPermission : handleBulkGrant}
                  >
                    {grantMode === 'single' ? 'Grant Permission' : 'Grant Bulk Permissions'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Permissions Table */}
          <div className="permissions-table-wrapper">
            <table className="permissions-table">
              <thead>
                <tr>
                  <th>Player</th>
                  <th>Level</th>
                  <th>Rally</th>
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
                    <tr key={perm.id} className={perm.status === 'revoked' ? 'revoked-row' : ''}>
                      <td className="player-cell">{perm.playerUsername}</td>
                      <td>
                        <span className="level-badge" style={{ backgroundColor: levelInfo?.color }}>
                          {levelInfo?.name} (Lv {perm.permissionLevel})
                        </span>
                      </td>
                      <td className="rally-cell">{perm.rallyPoints}</td>
                      <td>{perm.grantedBy}</td>
                      <td className="date-cell">{new Date(perm.grantedAt).toLocaleDateString()}</td>
                      <td>
                        <span className={`status-badge ${perm.status}`}>{perm.status}</span>
                      </td>
                      <td>
                        {perm.status === 'active' && (
                          <button className="btn-revoke" onClick={() => handleRevokePermission(perm.id)}>
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
      )}

      {/* Operations Tab */}
      {activeTab === 'operations' && (
        <div className="tab-content">
          <h2>Military Operations</h2>
          <p className="coming-soon">Operations board coming soon...</p>
        </div>
      )}

    </div>
  );
};

export default LeaderDashboard;
