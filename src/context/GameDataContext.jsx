import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const GameDataContext = createContext();

export const useGameData = () => {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error('useGameData must be used within GameDataProvider');
  }
  return context;
};

export const GameDataProvider = ({ children }) => {
  const [nations, setNations] = useState([]);
  const [diplomacy, setDiplomacy] = useState([]);
  const [battles, setBattles] = useState([]);
  const [gameStats, setGameStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch initial data
  useEffect(() => {
    fetchAllData();
    
    // Set up polling for live updates (every 30 seconds)
    const interval = setInterval(() => {
      refreshFeeds();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [nationsRes, diplomacyRes, battlesRes, statsRes] = await Promise.all([
        api.getAllNations(),
        api.getDiplomacyFeed(20),
        api.getBattleFeed(20),
        api.getGameStats()
      ]);

      if (nationsRes.success) setNations(nationsRes.data);
      if (diplomacyRes.success) setDiplomacy(diplomacyRes.data);
      if (battlesRes.success) setBattles(battlesRes.data);
      if (statsRes.success) setGameStats(statsRes.data);

      setError(null);
    } catch (err) {
      setError('Failed to load game data');
      console.error('Data fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const refreshFeeds = async () => {
    try {
      const [diplomacyRes, battlesRes, statsRes] = await Promise.all([
        api.getDiplomacyFeed(20),
        api.getBattleFeed(20),
        api.getGameStats()
      ]);

      if (diplomacyRes.success) setDiplomacy(diplomacyRes.data);
      if (battlesRes.success) setBattles(battlesRes.data);
      if (statsRes.success) setGameStats(statsRes.data);
    } catch (err) {
      console.error('Feed refresh error:', err);
    }
  };

  const getNationById = (nationId) => {
    return nations.find(n => n.id === nationId);
  };

  const getNationByName = (name) => {
    return nations.find(n => n.name.toLowerCase() === name.toLowerCase());
  };

  const getActiveBattles = () => {
    return battles.filter(b => b.status === 'ongoing');
  };

  const getCompletedBattles = () => {
    return battles.filter(b => b.status === 'completed');
  };

  const getPendingDiplomacy = () => {
    return diplomacy.filter(d => d.status === 'pending');
  };

  const getActiveDiplomacy = () => {
    return diplomacy.filter(d => d.status === 'active');
  };

  const createDiplomaticAction = async (action) => {
    try {
      const response = await api.createDiplomaticAction(action);
      if (response.success) {
        setDiplomacy([response.data, ...diplomacy]);
        return { success: true, data: response.data };
      }
      return { success: false, error: 'Failed to create diplomatic action' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const createMilitaryOrder = async (order) => {
    try {
      const response = await api.createMilitaryOrder(order);
      if (response.success) {
        return { success: true, data: response.data };
      }
      return { success: false, error: 'Failed to create military order' };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  const value = {
    nations,
    diplomacy,
    battles,
    gameStats,
    loading,
    error,
    refreshFeeds,
    getNationById,
    getNationByName,
    getActiveBattles,
    getCompletedBattles,
    getPendingDiplomacy,
    getActiveDiplomacy,
    createDiplomaticAction,
    createMilitaryOrder
  };

  return (
    <GameDataContext.Provider value={value}>
      {children}
    </GameDataContext.Provider>
  );
};
