import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLeader, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (!isLeader()) {
    return (
      <div className="access-denied">
        <h2>Access Denied</h2>
        <p>You must be a nation leader to access this page.</p>
        <p>Please select a nation or contact an administrator.</p>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
