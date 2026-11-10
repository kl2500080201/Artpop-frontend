import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (exists || email.toLowerCase() === 'admin@artpop.com') {
      setError('User with this email already exists!');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      role: 'user'
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    alert('Signup successful! Please login.');
    navigate('/login');
  };

  return (
    <div className="auth-card">
      <h2>Create ArtPop Account</h2>
      {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
          />
        </div>
        <div className="form-group">
          <label>Email Address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
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
          Sign Up
        </button>
      </form>
      <p style={{ marginTop: '15px', textAlign: 'center', fontSize: '14px' }}>
        Already registered? <Link to="/login" style={{ color: '#FF78AC', fontWeight: 'bold' }}>Login</Link>
      </p>
    </div>
  );
}