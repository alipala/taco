import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

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

// Action types
// (Action types will be added as needed)

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
    isLoggedIn: authService.isAuthenticated(),
    user: authService.getCurrentUser(),
    isLoading: false,
    successMessage: null,
    error: null
  });

  // Check authentication status on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (authService.isAuthenticated()) {
        try {
          setState(prevState => ({
            ...prevState,
            isLoading: true
          }));
          
          // Get user profile from API
          const userProfile = await authService.getProfile();
          
          setState(prevState => ({
            ...prevState,
            isLoggedIn: true,
            user: {
              id: userProfile._id,
              name: userProfile.name,
              email: userProfile.email,
              ...userProfile
            },
            isLoading: false,
            error: null
          }));
        } catch (error) {
          console.error('Authentication check failed:', error);
          // Token might be invalid, clear it silently without showing error message
          authService.logout();
          setState(prevState => ({
            ...prevState,
            isLoggedIn: false,
            user: null,
            isLoading: false,
            // Don't set error message on initial load
            error: null
          }));
        }
      } else {
        setState(prevState => ({
          ...prevState,
          isLoggedIn: false,
          user: null,
          isLoading: false,
          // Don't set error message on initial load
          error: null
        }));
      }
    };
    
    checkAuth();
  }, []);

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
   * Login a user with email and password
   * @param credentials - The user credentials
   */
  const login = async (credentials) => {
    try {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        error: null,
        successMessage: null // Clear any existing success message
      }));
      
      const data = await authService.login(credentials);
      
      // Log the response data to help with debugging
      console.log('Login successful:', data);
      
      // Set the user data and success message
      setState(prevState => ({
        ...prevState,
        isLoggedIn: true,
        user: {
          id: data.user_id,
          name: data.name || 'User', // Fallback if name is not provided
          email: data.email
        },
        isLoading: false,
        successMessage: `Welcome back, ${data.name || 'User'}!`,
        error: null // Clear any existing errors
      }));
      
      return { success: true };
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error.detail || 'Login failed. Please check your credentials.'
      }));
      
      return { success: false, error: error.detail || 'Login failed' };
    }
  };
  
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise with registration result
   */
  const register = async (userData) => {
    try {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        error: null
      }));
      
      // Register the user
      await authService.register(userData);
      
      // After registration, automatically log in the user
      const loginResult = await login({
        email: userData.email,
        password: userData.password
      });
      
      return loginResult;
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error.detail || 'Registration failed. Please try again.'
      }));
      
      return { success: false, error: error.detail || 'Registration failed' };
    }
  };
  
  /**
   * Login with Google
   * @param {string} token - Google OAuth token
   * @returns {Promise} - Promise with login result
   */
  const googleLogin = async (token) => {
    try {
      setState(prevState => ({
        ...prevState,
        isLoading: true,
        error: null
      }));
      
      const data = await authService.googleLogin(token);
      
      setState(prevState => ({
        ...prevState,
        isLoggedIn: true,
        user: {
          id: data.user_id,
          name: data.name,
          email: data.email
        },
        isLoading: false,
        successMessage: `Welcome back, ${data.name || 'User'}!`
      }));
      
      // Clear success message after 5 seconds
      setTimeout(() => {
        setState(prevState => ({
          ...prevState,
          successMessage: null
        }));
      }, 5000);
      
      return { success: true };
    } catch (error) {
      setState(prevState => ({
        ...prevState,
        isLoading: false,
        error: error.detail || 'Google login failed. Please try again.'
      }));
      
      return { success: false, error: error.detail || 'Google login failed' };
    }
  };
  
  /**
   * Logout the current user
   */
  const logout = () => {
    authService.logout();
    setState(prevState => ({
      ...prevState,
      isLoggedIn: false,
      user: null
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

  /**
   * Dispatch method to handle state updates
   * @param action - The action to dispatch
   */
  const dispatch = (action) => {
    switch (action.type) {
      case 'SET_SUCCESS_MESSAGE':
        setState(prevState => ({
          ...prevState,
          successMessage: action.payload
        }));
        break;
      default:
        console.warn(`Unknown action type: ${action.type}`);
    }
  };

  // Create the context value
  const value = {
    state,
    setLanguage,
    setProficiencyLevel,
    setTopic,
    setCustomTopic,
    login,
    register,
    googleLogin,
    logout,
    resetSelections,
    dispatch
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
