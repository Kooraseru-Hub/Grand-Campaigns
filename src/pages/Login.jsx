import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGameData } from '../context/GameDataContext';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Toast from '../components/common/Toast';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, loginWithRoblox, isAuthenticated } = useAuth();
  const { nations } = useGameData();
  
  const [loginMethod, setLoginMethod] = useState('manual'); // 'manual' or 'roblox'
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [selectedNation, setSelectedNation] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'info' });

  // Redirect if already logged in
  React.useEffect(() => {
    if (isAuthenticated()) {
      navigate('/leader');
    }
  }, [isAuthenticated, navigate]);

  const showToast = (message, type = 'info') => {
    setToast({ show: true, message, type });
  };

  const handleManualLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      showToast('Please enter username and password', 'error');
      return;
    }

    if (!selectedNation) {
      showToast('Please select a nation', 'error');
      return;
    }

    setLoading(true);
    const result = await login(username, password, parseInt(selectedNation));
    setLoading(false);

    if (result.success) {
      showToast('Login successful! Welcome, Commander.', 'success');
      setTimeout(() => navigate('/leader'), 1500);
    } else {
      showToast(result.error || 'Login failed', 'error');
    }
  };

  const handleRobloxLogin = async () => {
    setLoading(true);
    
    // In production, this will redirect to Roblox OAuth
    // For now, we'll simulate it
    showToast('Connecting to Roblox...', 'info');
    
    setTimeout(async () => {
      const result = await loginWithRoblox('mock_roblox_token');
      setLoading(false);

      if (result.success) {
        if (!result.user.nationId) {
          showToast('Please select a nation to continue', 'warning');
          setLoginMethod('manual');
        } else {
          showToast('Roblox login successful!', 'success');
          setTimeout(() => navigate('/leader'), 1500);
        }
      } else {
        showToast('Roblox login failed', 'error');
      }
    }, 2000);
  };

  return (
    <div className="login-page">
      <Toast 
        message={toast.message}
        type={toast.type}
        isVisible={toast.show}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Nation Leader Login</h1>
          <p className="login-subtitle">
            Officer Portal - Access restricted to nation leaders and appointed officers only
          </p>
        </div>

        <div className="login-content">
          {/* Left Side - Login Form */}
          <Card className="login-card">
            <div className="login-method-selector">
              <button
                className={`method-btn ${loginMethod === 'roblox' ? 'active' : ''}`}
                onClick={() => setLoginMethod('roblox')}
              >
                Roblox Account
              </button>
              <button
                className={`method-btn ${loginMethod === 'manual' ? 'active' : ''}`}
                onClick={() => setLoginMethod('manual')}
              >
                Officer Login
              </button>
            </div>

            {loginMethod === 'roblox' ? (
              <div className="roblox-login">
                <div className="roblox-info">
                  <p>Link your Roblox account to participate in operations and battles. Your in-game service record will be synced with this portal.</p>
                </div>
                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={loading}
                  onClick={handleRobloxLogin}
                >
                  Connect Roblox Account
                </Button>
                <p className="login-disclaimer">
                  You'll be redirected to Roblox for secure authentication
                </p>
              </div>
            ) : (
              <form className="manual-login" onSubmit={handleManualLogin}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="nation">Select Your Nation</label>
                  <select
                    id="nation"
                    value={selectedNation}
                    onChange={(e) => setSelectedNation(e.target.value)}
                    disabled={loading}
                  >
                    <option value="">Choose a nation...</option>
                    {nations.map((nation) => (
                      <option key={nation.id} value={nation.id}>
                        {nation.emblem} {nation.name} - {nation.leader}
                      </option>
                    ))}
                  </select>
                </div>

                <Button
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={loading}
                  type="submit"
                >
                  Report for Duty
                </Button>

                <div className="login-links">
                  <a href="#" className="login-link">Forgot credentials?</a>
                  <a href="#" className="login-link">Submit enlistment</a>
                </div>
              </form>
            )}

            <div className="login-demo-info">
              <p className="demo-note">
                <strong>Demo Credentials:</strong><br />
                Username: <code>emperor_napoleon</code><br />
                Password: <code>password123</code><br />
                Nation: France
              </p>
            </div>
          </Card>

          {/* Right Side - Nation List */}
          <div className="nations-list">
            <h3 className="nations-list-title">Available Nations</h3>
            <div className="nations-grid">
              {nations.slice(0, 10).map((nation) => (
                <div 
                  key={nation.id} 
                  className={`nation-item ${selectedNation === nation.id.toString() ? 'selected' : ''}`}
                  onClick={() => setSelectedNation(nation.id.toString())}
                >
                  <div className="nation-emblem">{nation.emblem}</div>
                  <div className="nation-info">
                    <div className="nation-name">{nation.name}</div>
                    <div className="nation-leader">{nation.leader}</div>
                    <div className="nation-power">
                      <span className="power-bar" style={{ width: `${nation.power}%` }}></span>
                      <span className="power-value">{nation.power}</span>
                    </div>
                  </div>
                  {nation.status === 'active' ? (
                    <div className="nation-status active">Active</div>
                  ) : (
                    <div className="nation-status inactive">Recruiting</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>New to Grand Campaigns? <a href="/about">Read community guidelines</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
