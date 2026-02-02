// Mock API Data for Napoleonic Wars Community Game

export const mockNations = [
  {
    id: 1,
    name: 'France',
    leader: 'Napoleon_RBX',
    power: 95,
    emblem: 'FR',
    color: '#0055A4',
    capital: 'Paris',
    population: 29000000,
    discordInvite: 'https://discord.gg/france-nation',
    resources: {
      gold: 150000,
      manpower: 680000,
      supplies: 450000
    },
    position: { lat: 48.8566, lon: 2.3522 },
    status: 'active',
    allies: [6],
    enemies: [2, 3, 4, 5]
  },
  {
    id: 2,
    name: 'Britain',
    leader: 'Wellington_RBX',
    discordInvite: 'https://discord.gg/britain-nation',
    power: 88,
    emblem: 'GB',
    color: '#C8102E',
    capital: 'London',
    population: 16000000,
    resources: {
      gold: 200000,
      manpower: 250000,
      supplies: 380000
    },
    position: { lat: 51.5074, lon: -0.1278 },
    status: 'active',
    allies: [3, 4, 5, 8],
    enemies: [1]
  },
  {
    id: 3,
    name: 'Prussia',
    leader: 'Frederick William III',
    power: 82,
    emblem: 'DE',
    color: '#000000',
    capital: 'Berlin',
    population: 10000000,
    resources: {
      gold: 80000,
      manpower: 450000,
      supplies: 320000
    },
    position: { lat: 52.5200, lon: 13.4050 },
    status: 'active',
    allies: [2, 4, 5],
    enemies: [1]
  },
  {
    id: 4,
    name: 'Austria',
    leader: 'FrancisII_RBX',
    discordInvite: 'https://discord.gg/austria-nation',
    power: 85,
    emblem: '🇦🇹',
    color: '#ED2939',
    capital: 'Vienna',
    population: 21000000,
    resources: {
      gold: 95000,
      manpower: 520000,
      supplies: 340000
    },
    position: { lat: 48.2082, lon: 16.3738 },
    status: 'active',
    allies: [2, 3, 5],
    enemies: [1]
  },
  {
    id: 5,
    name: 'Russia',
    leader: 'TsarAlex_RBX',
    discordInvite: 'https://discord.gg/russia-nation',
    power: 90,
    emblem: 'RU',
    color: '#0039A6',
    capital: 'St. Petersburg',
    population: 45000000,
    resources: {
      gold: 120000,
      manpower: 850000,
      supplies: 400000
    },
    position: { lat: 59.9343, lon: 30.3351 },
    status: 'active',
    allies: [2, 3, 4],
    enemies: [1]
  },
  {
    id: 6,
    name: 'Spain',
    leader: 'Joseph Bonaparte',
    power: 65,
    emblem: 'ES',
    color: '#AA151B',
    capital: 'Madrid',
    population: 11000000,
    resources: {
      gold: 45000,
      manpower: 180000,
      supplies: 150000
    },
    position: { lat: 40.4168, lon: -3.7038 },
    status: 'active',
    allies: [1],
    enemies: [2]
  },
  {
    id: 7,
    name: 'Ottoman Empire',
    leader: 'Sultan Mahmud II',
    power: 70,
    emblem: 'TR',
    color: '#E30A17',
    capital: 'Constantinople',
    population: 25000000,
    resources: {
      gold: 75000,
      manpower: 380000,
      supplies: 220000
    },
    position: { lat: 41.0082, lon: 28.9784 },
    status: 'active',
    allies: [],
    enemies: [5]
  },
  {
    id: 8,
    name: 'Sweden',
    leader: 'Jean-Baptiste Bernadotte',
    power: 55,
    emblem: 'SE',
    color: '#006AA7',
    capital: 'Stockholm',
    population: 2400000,
    resources: {
      gold: 35000,
      manpower: 85000,
      supplies: 110000
    },
    position: { lat: 59.3293, lon: 18.0686 },
    status: 'active',
    allies: [2],
    enemies: []
  },
  {
    id: 9,
    name: 'Portugal',
    leader: 'Prince Regent John',
    power: 48,
    emblem: '🇵🇹',
    color: '#006600',
    capital: 'Lisbon',
    population: 3000000,
    resources: {
      gold: 28000,
      manpower: 65000,
      supplies: 85000
    },
    position: { lat: 38.7223, lon: -9.1393 },
    status: 'active',
    allies: [2],
    enemies: [1]
  },
  {
    id: 10,
    name: 'Naples',
    leader: 'Joachim Murat',
    power: 52,
    emblem: '🇮🇹',
    color: '#FF6B00',
    capital: 'Naples',
    population: 5000000,
    resources: {
      gold: 32000,
      manpower: 95000,
      supplies: 95000
    },
    position: { lat: 40.8518, lon: 14.2681 },
    status: 'active',
    allies: [1],
    enemies: []
  }
];

export const mockDiplomacy = [
  {
    id: 1,
    type: 'treaty',
    from: 2,
    to: 3,
    fromNation: 'Britain',
    toNation: 'Prussia',
    message: 'Coalition Treaty signed - United against French expansion',
    timestamp: '2026-01-24T10:30:00Z',
    status: 'active'
  },
  {
    id: 2,
    type: 'war_declaration',
    from: 1,
    to: 4,
    fromNation: 'France',
    toNation: 'Austria',
    message: 'War declared following border disputes',
    timestamp: '2026-01-24T09:15:00Z',
    status: 'active'
  },
  {
    id: 3,
    type: 'alliance',
    from: 2,
    to: 5,
    fromNation: 'Britain',
    toNation: 'Russia',
    message: 'Military alliance formed to counter French dominance',
    timestamp: '2026-01-24T08:00:00Z',
    status: 'active'
  },
  {
    id: 4,
    type: 'trade_agreement',
    from: 8,
    to: 2,
    fromNation: 'Sweden',
    toNation: 'Britain',
    message: 'Trade agreement for naval supplies',
    timestamp: '2026-01-23T16:45:00Z',
    status: 'active'
  },
  {
    id: 5,
    type: 'peace_proposal',
    from: 6,
    to: 2,
    fromNation: 'Spain',
    toNation: 'Britain',
    message: 'Peace negotiations proposed in neutral territory',
    timestamp: '2026-01-23T14:20:00Z',
    status: 'pending'
  }
];

export const mockBattles = [
  {
    id: 1,
    name: 'Battle of Leipzig',
    location: 'Leipzig, Saxony',
    coordinates: { lat: 51.3397, lon: 12.3731 },
    participants: [
      { nationId: 1, name: 'France', forces: 195000, casualties: 38000, commander: 'Napoleon' },
      { nationId: 2, name: 'Britain', forces: 15000, casualties: 2500, commander: 'Wellington' },
      { nationId: 3, name: 'Prussia', forces: 72000, casualties: 16000, commander: 'Blücher' },
      { nationId: 4, name: 'Austria', forces: 89000, casualties: 15000, commander: 'Schwarzenberg' },
      { nationId: 5, name: 'Russia', forces: 127000, casualties: 22000, commander: 'Barclay' }
    ],
    outcome: 'Coalition Victory',
    victor: 'Coalition',
    description: 'Decisive Coalition victory, Napoleon forced to retreat',
    startTime: '2026-01-23T06:00:00Z',
    endTime: '2026-01-23T18:30:00Z',
    status: 'completed',
    significance: 'major'
  },
  {
    id: 2,
    name: 'Battle of Austerlitz',
    location: 'Austerlitz, Moravia',
    coordinates: { lat: 49.1375, lon: 16.9481 },
    participants: [
      { nationId: 1, name: 'France', forces: 73000, casualties: 9000, commander: 'Napoleon' },
      { nationId: 4, name: 'Austria', forces: 85400, casualties: 36000, commander: 'Francis II' },
      { nationId: 5, name: 'Russia', forces: 85400, casualties: 27000, commander: 'Kutuzov' }
    ],
    outcome: 'French Victory',
    victor: 'France',
    description: 'Napoleon\'s greatest victory, destroyed the Third Coalition',
    startTime: '2026-01-22T08:00:00Z',
    endTime: '2026-01-22T16:00:00Z',
    status: 'completed',
    significance: 'major'
  },
  {
    id: 3,
    name: 'Skirmish at Lübeck',
    location: 'Lübeck',
    coordinates: { lat: 53.8655, lon: 10.6866 },
    participants: [
      { nationId: 1, name: 'France', forces: 8000, casualties: 450, commander: 'Marshal Soult' },
      { nationId: 3, name: 'Prussia', forces: 6500, casualties: 1200, commander: 'General Blücher' }
    ],
    outcome: 'French Victory',
    victor: 'France',
    description: 'Minor engagement securing French supply lines',
    startTime: '2026-01-24T11:30:00Z',
    endTime: '2026-01-24T14:15:00Z',
    status: 'ongoing',
    significance: 'minor'
  }
];

export const mockUsers = [
  {
    id: 1,
    username: 'emperor_napoleon',
    nationId: 1,
    role: 'leader',
    avatar: 'N',
    joinDate: '2026-01-01',
    lastActive: '2026-01-24T12:00:00Z',
    robloxId: 'roblox_user_1'
  },
  {
    id: 2,
    username: 'iron_duke',
    nationId: 2,
    role: 'leader',
    avatar: 'D',
    joinDate: '2026-01-01',
    lastActive: '2026-01-24T11:45:00Z',
    robloxId: 'roblox_user_2'
  },
  {
    id: 3,
    username: 'prussian_marshal',
    nationId: 3,
    role: 'leader',
    avatar: 'M',
    joinDate: '2026-01-02',
    lastActive: '2026-01-24T10:30:00Z',
    robloxId: 'roblox_user_3'
  }
];

export const mockGameStats = {
  totalPlayers: 1847,
  activeNations: 10,
  ongoingBattles: 3,
  totalBattles: 127,
  treaties: 8,
  declarations: 15,
  lastUpdate: new Date().toISOString()
};

// Helper function to get nation by ID
export const getNationById = (id) => {
  return mockNations.find(nation => nation.id === id);
};

// Helper function to get user by username
export const getUserByUsername = (username) => {
  return mockUsers.find(user => user.username === username);
};

// Helper function to get recent diplomacy events
export const getRecentDiplomacy = (limit = 10) => {
  return mockDiplomacy
    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
    .slice(0, limit);
};

// Helper function to get recent battles
export const getRecentBattles = (limit = 10) => {
  return mockBattles
    .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
    .slice(0, limit);
};

// Helper function to get nation's diplomacy
export const getNationDiplomacy = (nationId) => {
  return mockDiplomacy.filter(d => d.from === nationId || d.to === nationId);
};

// Helper function to get nation's battles
export const getNationBattles = (nationId) => {
  return mockBattles.filter(b => 
    b.participants.some(p => p.nationId === nationId)
  );
};
