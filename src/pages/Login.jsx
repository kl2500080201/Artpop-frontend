import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const DEFAULT_ADMIN = {
  name: "ArtPop Admin",
  email: "admin@artpop.com",
  password: "admin123",
  role: "admin"
};

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');

    // Check predefined Admin account
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
      const session = { name: DEFAULT_ADMIN.name, email: DEFAULT_ADMIN.email, role: 'admin' };
      localStorage.setItem('currentUser', JSON.stringify(session));
      onLoginSuccess(session);
      navigate('/admin');
      return;
    }

    // Check standard user in LocalStorage
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const foundUser = users.find((u) => u.email === email && u.password === password);

    if (foundUser) {
      const session = { name: foundUser.name, email: foundUser.email, role: 'user' };
      localStorage.setItem('currentUser', JSON.stringify(session));
      onLoginSuccess(session);
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-card">
      <h2>ArtPop Login</h2>
      {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@artpop.com or user email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '10px' }}>
          Log In
        </button>
      </form>

      <div style={{ background: '#f8fafc', padding: '10px', marginTop: '15px', borderRadius: '6px', fontSize: '12px' }}>
        <strong>Demo Admin Credentials:</strong><br />
        Email: <code>admin@artpop.com</code> | Password: <code>admin123</code>
      </div>

      <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
        Don't have an account? <Link to="/signup" style={{ color: '#FF78AC', fontWeight: 'bold' }}>Sign up</Link>
      </p>
    </div>
  );
}