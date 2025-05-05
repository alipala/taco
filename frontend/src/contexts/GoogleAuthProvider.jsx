import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

/**
 * Google OAuth Provider component
 * Wraps the application with Google OAuth provider for Google Sign-In functionality
 */
const GoogleAuthProvider = ({ children }) => {
  // Get Google Client ID from environment variable
  // In production, this should be set in .env file
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '123456789-example.apps.googleusercontent.com'; 
  
  // For development purposes, we'll use a dummy client ID if none is provided
  // This allows the app to load without errors, though Google login won't work
  // In production, a real client ID must be provided in the .env file

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
