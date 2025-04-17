import React, { createContext, useContext, useState, ReactNode } from 'react';

/**
 * Interface for the application state
 */
interface AppState {
  selectedLanguage: string | null;
  proficiencyLevel: string | null;
  selectedTopic: string | null;
  customTopic: string;
  isLoggedIn: boolean;
}

/**
 * Interface for the context value
 */
interface AppContextValue {
  state: AppState;
  setLanguage: (language: string) => void;
  setProficiencyLevel: (level: string) => void;
  setTopic: (topic: string) => void;
  setCustomTopic: (topic: string) => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  resetSelections: () => void;
}

// Create the context with a default value
const AppContext = createContext<AppContextValue | undefined>(undefined);

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
 * Props for the AppProvider component
 */
interface AppProviderProps {
  children: ReactNode;
}

/**
 * AppProvider component
 * Provides application state and functions to update it
 */
export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  // Initialize state
  const [state, setState] = useState<AppState>({
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
  const setLanguage = (language: string) => {
    setState(prevState => ({
      ...prevState,
      selectedLanguage: language,
    }));
  };

  /**
   * Set the proficiency level
   * @param level - The proficiency level to set
   */
  const setProficiencyLevel = (level: string) => {
    setState(prevState => ({
      ...prevState,
      proficiencyLevel: level,
    }));
  };

  /**
   * Set the selected topic
   * @param topic - The topic to set
   */
  const setTopic = (topic: string) => {
    setState(prevState => ({
      ...prevState,
      selectedTopic: topic,
    }));
  };

  /**
   * Set the custom topic
   * @param topic - The custom topic to set
   */
  const setCustomTopic = (topic: string) => {
    setState(prevState => ({
      ...prevState,
      customTopic: topic,
    }));
  };

  /**
   * Set the login status
   * @param isLoggedIn - Whether the user is logged in
   */
  const setIsLoggedIn = (isLoggedIn: boolean) => {
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
  const value: AppContextValue = {
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
