import React from 'react';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ currentUser, allowedRole, children }) {
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRole && currentUser.role !== allowedRole) {
    return <Navigate to={currentUser.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  }

  return children;
}