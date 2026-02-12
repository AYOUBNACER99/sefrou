import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Lock } from 'lucide-react';
import './AdminLogin.css';

export function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      navigate('/admin/dashboard');
    } else {
      setError('Incorrect password. Try: sefrou2024');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="admin-login-page">
      <div className="admin-login-container">
        <div className="admin-login-card">
          <div className="admin-login-icon">
            <Lock size={48} />
          </div>
          <h1>Admin Login</h1>
          <p>Enter your password to access the dashboard</p>

          {error && (
            <div className="admin-login-error">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="admin-login-form">
            <Input
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="Enter admin password"
              required
            />
            <Button type="submit" fullWidth size="large">
              Login
            </Button>
          </form>

        
        </div>
      </div>
    </div>
  );
}