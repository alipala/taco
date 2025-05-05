import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';

/**
 * Google OAuth Provider component
 * Wraps the application with Google OAuth provider for Google Sign-In functionality
 */
const GoogleAuthProvider = ({ children }) => {
  // Get Google Client ID from environment variable
  // In production, this should be set in .env file
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID || '41687548204-0go9lqlnve4llpv3vdl48jujddlt2kp5.apps.googleusercontent.com'; 
  
  // Using the same Google Client ID as configured in the backend
  // This ensures that the Google Sign-In works properly
  // In production, the client ID should be set in the .env file

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
