import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ currentUser, onLogout }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <header>
      <Link to="/" className="logo">ArtPop</Link>
      <nav>
        {currentUser ? (
          <>
            <span className="user-badge">
              {currentUser.name} ({currentUser.role.toUpperCase()})
            </span>
            {currentUser.role === 'admin' ? (
              <Link to="/admin">Admin Panel</Link>
            ) : (
              <Link to="/dashboard">Gallery</Link>
            )}
            <button onClick={handleLogout} className="btn-outline">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none' }}>
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}