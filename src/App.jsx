import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';

export default function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    return JSON.parse(localStorage.getItem('currentUser')) || null;
  });

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
  };

  return (
    <>
      <Navbar currentUser={currentUser} onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} replace />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} replace />
            ) : (
              <Login onLoginSuccess={(user) => setCurrentUser(user)} />
            )
          }
        />
        <Route
          path="/signup"
          element={
            currentUser ? (
              <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} replace />
            ) : (
              <Signup />
            )
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRole="user">
              <UserDashboard currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute currentUser={currentUser} allowedRole="admin">
              <AdminDashboard currentUser={currentUser} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}