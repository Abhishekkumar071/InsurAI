import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * ProtectedRoute wraps components and enforces role-based access control.
 * - If not authenticated (no token), redirects to /login.
 * - If authenticated but role doesn't match, redirects to /login (or could redirect to role-specific home).
 */
export default function ProtectedRoute({ children, requiredRole = null }) {
  const token = localStorage.getItem('token');
  const userRole = localStorage.getItem('userRole'); // 'USER' or 'AGENT'

  // Not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Authenticated but wrong role
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on actual role
    if (userRole === 'AGENT') {
      return <Navigate to="/agent" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
}

// Sets up JPA/Hibernate to manage your entities (Users and Policy)