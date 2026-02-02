import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Check for existing session on mount
  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = () => {
    try {
      const storedUser = localStorage.getItem('user');
      const storedToken = localStorage.getItem('token');
      
      if (storedUser && storedToken) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error('Session check error:', err);
    } finally {
      setLoading(false);
    }
  };

  const login = async (username, password, nationId) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.login(username, password, nationId);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return { success: true };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Login failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const loginWithRoblox = async (robloxToken) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await api.loginWithRoblox(robloxToken);
      
      if (response.success) {
        setUser(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);
        return { success: true, user: response.user };
      } else {
        setError(response.error);
        return { success: false, error: response.error };
      }
    } catch (err) {
      setError('Roblox login failed. Please try again.');
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await api.logout();
      setUser(null);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      return { success: true };
    } catch (err) {
      console.error('Logout error:', err);
      return { success: false, error: err.message };
    }
  };

  const updateUser = (updates) => {
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const isAuthenticated = () => {
    return !!user && !!localStorage.getItem('token');
  };

  const isLeader = () => {
    return user?.role === 'leader' && user?.nationId;
  };

  const value = {
    user,
    loading,
    error,
    login,
    loginWithRoblox,
    logout,
    updateUser,
    isAuthenticated,
    isLeader
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
