import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GOOGLE_CLIENT_ID } from '../config/google-oauth-config';

/**
 * Google OAuth Provider component
 * Wraps the application with Google OAuth provider for Google Sign-In functionality
 */
const GoogleAuthProvider = ({ children }) => {
  // Using the Google Client ID from our configuration file
  // For Railway deployment, make sure to update the Google OAuth configuration
  // in the Google Developer Console to include https://tacoco.up.railway.app
  // as an authorized JavaScript origin and redirect URI

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
