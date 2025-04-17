import React from 'react';
import './App.css';
import { AppProvider } from './contexts/AppContext';
import AppRoutes from './components/Routes';

/**
 * Main App component
 * Wraps the application with necessary providers and routes
 */
function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
