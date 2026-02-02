// API Service - Will connect to real backend later
import {
  mockNations,
  mockDiplomacy,
  mockBattles,
  mockUsers,
  mockGameStats,
  getNationById,
  getUserByUsername,
  getRecentDiplomacy,
  getRecentBattles,
  getNationDiplomacy,
  getNationBattles
} from './mockData';

// Simulate API delay
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API Base URL - Replace with your real API later
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class GameAPI {
  // Authentication
  async login(username, password, nationId) {
    await delay();
    
    // Mock authentication - Replace with real API call
    const user = getUserByUsername(username);
    
    if (user && password === 'password123') { // TEMPORARY - Remove in production
      const nation = getNationById(nationId || user.nationId);
      return {
        success: true,
        user: {
          ...user,
          nation
        },
        token: 'mock_jwt_token_' + Date.now()
      };
    }
    
    return {
      success: false,
      error: 'Invalid credentials'
    };
  }

  async loginWithRoblox(robloxToken) {
    await delay();
    
    // Mock Roblox authentication - Replace with real OAuth flow
    // This will be integrated with Roblox OAuth later
    return {
      success: true,
      user: {
        id: 999,
        username: 'roblox_user',
        nationId: null,
        role: 'player',
        avatar: 'R',
        robloxId: robloxToken
      },
      token: 'mock_roblox_token_' + Date.now()
    };
  }

  async logout() {
    await delay(200);
    return { success: true };
  }

  // Nations
  async getAllNations() {
    await delay();
    return {
      success: true,
      data: mockNations
    };
  }

  async getNation(nationId) {
    await delay();
    const nation = getNationById(nationId);
    return {
      success: !!nation,
      data: nation
    };
  }

  async updateNationResources(nationId, resources) {
    await delay();
    // In real app, this would update the database
    return {
      success: true,
      data: resources
    };
  }

  // Diplomacy
  async getDiplomacyFeed(limit = 20) {
    await delay();
    return {
      success: true,
      data: getRecentDiplomacy(limit)
    };
  }

  async getNationDiplomacy(nationId) {
    await delay();
    return {
      success: true,
      data: getNationDiplomacy(nationId)
    };
  }

  async createDiplomaticAction(action) {
    await delay();
    // In real app, this would create a new diplomacy entry
    const newAction = {
      id: mockDiplomacy.length + 1,
      ...action,
      timestamp: new Date().toISOString(),
      status: 'pending'
    };
    
    return {
      success: true,
      data: newAction
    };
  }

  // Battles
  async getBattleFeed(limit = 20) {
    await delay();
    return {
      success: true,
      data: getRecentBattles(limit)
    };
  }

  async getNationBattles(nationId) {
    await delay();
    return {
      success: true,
      data: getNationBattles(nationId)
    };
  }

  async getBattleDetails(battleId) {
    await delay();
    const battle = mockBattles.find(b => b.id === battleId);
    return {
      success: !!battle,
      data: battle
    };
  }

  async createMilitaryOrder(order) {
    await delay();
    // In real app, this would create a military order
    return {
      success: true,
      data: {
        id: Date.now(),
        ...order,
        status: 'pending',
        createdAt: new Date().toISOString()
      }
    };
  }

  // Game Stats
  async getGameStats() {
    await delay();
    return {
      success: true,
      data: mockGameStats
    };
  }

  // User Profile
  async getUserProfile(userId) {
    await delay();
    const user = mockUsers.find(u => u.id === userId);
    return {
      success: !!user,
      data: user
    };
  }

  async updateUserProfile(userId, updates) {
    await delay();
    return {
      success: true,
      data: updates
    };
  }

  // Real API methods (uncomment when backend is ready)
  /*
  async _apiCall(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          ...options.headers
        }
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }
  */
}

export default new GameAPI();
