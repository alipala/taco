import React, { createContext, useContext, useState } from 'react';

// Create the context with a default value
const AppContext = createContext(undefined);

/**
 * Custom hook to use the app context
 */
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

/**
 * AppProvider component
 * Provides application state and functions to update it
 */
export const AppProvider = ({ children }) => {
  // Initialize state
  const [state, setState] = useState({
    selectedLanguage: null,
    proficiencyLevel: null,
    selectedTopic: null,
    customTopic: '',
    isLoggedIn: false,
  });

  /**
   * Set the selected language
   * @param language - The language to set
   */
  const setLanguage = (language) => {
    setState(prevState => ({
      ...prevState,
      selectedLanguage: language,
    }));
  };

  /**
   * Set the proficiency level
   * @param level - The proficiency level to set
   */
  const setProficiencyLevel = (level) => {
    setState(prevState => ({
      ...prevState,
      proficiencyLevel: level,
    }));
  };

  /**
   * Set the selected topic
   * @param topic - The topic to set
   */
  const setTopic = (topic) => {
    setState(prevState => ({
      ...prevState,
      selectedTopic: topic,
    }));
  };

  /**
   * Set the custom topic
   * @param topic - The custom topic to set
   */
  const setCustomTopic = (topic) => {
    setState(prevState => ({
      ...prevState,
      customTopic: topic,
    }));
  };

  /**
   * Set the login status
   * @param isLoggedIn - Whether the user is logged in
   */
  const setIsLoggedIn = (isLoggedIn) => {
    setState(prevState => ({
      ...prevState,
      isLoggedIn,
    }));
  };

  /**
   * Reset all selections
   */
  const resetSelections = () => {
    setState(prevState => ({
      ...prevState,
      selectedLanguage: null,
      proficiencyLevel: null,
      selectedTopic: null,
      customTopic: '',
    }));
  };

  // Create the context value
  const value = {
    state,
    setLanguage,
    setProficiencyLevel,
    setTopic,
    setCustomTopic,
    setIsLoggedIn,
    resetSelections,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
