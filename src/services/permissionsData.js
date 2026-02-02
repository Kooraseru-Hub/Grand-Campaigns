// Permission Management System for Grand Campaigns
// Levels 1-4: Require rally points
// Levels 5-8: Higher permissions (admin/mod roles)

export const permissionLevels = [
  {
    level: 1,
    name: 'Officer',
    rallyRequired: 10,
    color: '#808080',
    description: 'Basic officer rank'
  },
  {
    level: 2,
    name: 'Commander',
    rallyRequired: 25,
    color: '#4169E1',
    description: 'Command authority'
  },
  {
    level: 3,
    name: 'General',
    rallyRequired: 35,
    color: '#9370DB',
    description: 'High command'
  },
  {
    level: 4,
    name: 'Coordinator',
    rallyRequired: 45,
    color: '#FFD700',
    description: 'Strategic coordination'
  },
  {
    level: 5,
    name: 'Organiser',
    rallyRequired: 0,
    color: '#FF8C00',
    description: 'Event and operation organizer'
  }
];

// Mock database for permissions
export const mockPermissions = [
  {
    id: 1,
    nationId: 1,
    playerUsername: 'Player123_RBX',
    permissionLevel: 4,
    rallyPoints: 50,
    grantedBy: 'Napoleon_RBX',
    grantedAt: '2026-01-20T10:30:00Z',
    status: 'active'
  },
  {
    id: 2,
    nationId: 1,
    playerUsername: 'Soldier456_RBX',
    permissionLevel: 2,
    rallyPoints: 28,
    grantedBy: 'Napoleon_RBX',
    grantedAt: '2026-01-21T14:15:00Z',
    status: 'active'
  },
  {
    id: 3,
    nationId: 2,
    playerUsername: 'BritishGuard_RBX',
    permissionLevel: 3,
    rallyPoints: 40,
    grantedBy: 'Wellington_RBX',
    grantedAt: '2026-01-22T09:45:00Z',
    status: 'active'
  }
];

// Mock audit log
export const mockAuditLog = [
  {
    id: 1,
    action: 'GRANT_PERMISSION',
    nationId: 1,
    targetUser: 'Player123_RBX',
    permissionLevel: 4,
    performedBy: 'Napoleon_RBX',
    timestamp: '2026-01-20T10:30:00Z',
    details: 'Granted Coordinator permission (Level 4) with 50 rally points'
  },
  {
    id: 2,
    action: 'REVOKE_PERMISSION',
    nationId: 1,
    targetUser: 'OldPlayer_RBX',
    permissionLevel: 2,
    performedBy: 'Napoleon_RBX',
    timestamp: '2026-01-19T16:20:00Z',
    details: 'Revoked Corporal permission (Level 2) - inactive player'
  },
  {
    id: 3,
    action: 'UPDATE_RALLY',
    nationId: 2,
    targetUser: 'BritishGuard_RBX',
    rallyPoints: 40,
    performedBy: 'Wellington_RBX',
    timestamp: '2026-01-22T09:45:00Z',
    details: 'Updated rally points from 35 to 40'
  }
];

// Rally calculation helper
export const calculateMaxPermissionLevel = (rallyPoints) => {
  for (let i = permissionLevels.length - 1; i >= 0; i--) {
    const level = permissionLevels[i];
    if (level.rallyRequired > 0 && rallyPoints >= level.rallyRequired) {
      return level.level;
    }
  }
  return 0; // No permission
};

// Get permission level details
export const getPermissionLevel = (level) => {
  return permissionLevels.find(p => p.level === level);
};

// Check if user can grant permission
export const canGrantPermission = (granterLevel, targetLevel) => {
  // Leaders (level 8) can grant any permission
  // Others can only grant permissions lower than their own
  return granterLevel === 8 || granterLevel > targetLevel;
};
