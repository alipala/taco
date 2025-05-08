import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAppContext } from '../../contexts/AppContext';

/**
 * ProtectedRoute component
 * Prevents unauthorized access to protected routes
 * Redirects to home page if not logged in
 */
const ProtectedRoute = ({ children }) => {
  const { state } = useAppContext();
  
  if (!state.isLoggedIn) {
    // Redirect to home page if not logged in
    return <Navigate to="/" replace />;
  }
  
  // Render the protected component if logged in
  return children;
};

export default ProtectedRoute;
