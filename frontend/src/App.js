import React from 'react';
import './App.css';
import { AppProvider } from './contexts/AppContext.jsx';
import AppRoutes from './components/Routes.jsx';
import CenteredSuccessAlert from './components/common/CenteredSuccessAlert.jsx';
import { useAppContext } from './contexts/AppContext.jsx';

/**
 * Main App content component
 * Contains the routes and success alert
 */
const AppContent = () => {
  const { state, dispatch } = useAppContext();
  
  const clearSuccessMessage = () => {
    // Only attempt to clear if there's a success message
    if (state.successMessage) {
      dispatch({
        type: 'SET_SUCCESS_MESSAGE',
        payload: null
      });
    }
  };
  
  return (
    <>
      <CenteredSuccessAlert 
        message={state.successMessage} 
        onDismiss={clearSuccessMessage} 
      />
      <AppRoutes />
    </>
  );
};

/**
 * Main App component
 * Wraps the application with necessary providers and routes
 */
function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
