import axios from 'axios';

// API base URL configuration
// In development, use localhost:8000 for backend
// In production, use relative URL which will use the current domain
const API_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : '';

/**
 * Authentication service for handling user authentication
 */
const authService = {
  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} - Promise with user data
   */
  register: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Registration failed' };
    }
  },

  /**
   * Login a user
   * @param {Object} credentials - User login credentials
   * @returns {Promise} - Promise with user data and token
   */
  login: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      
      // Store token in localStorage
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user_id,
          name: response.data.name,
          email: response.data.email
        }));
      }
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Login failed' };
    }
  },

  /**
   * Login with Google
   * @param {string} token - Google OAuth token
   * @returns {Promise} - Promise with user data and token
   */
  googleLogin: async (token) => {
    try {
      console.log('Sending Google login request to backend');
      console.log('API URL:', `${API_URL}/auth/google-login`);
      console.log('Token type:', typeof token);
      console.log('Token length:', token.length);
      
      // Make the request with detailed error handling
      const response = await axios.post(`${API_URL}/auth/google-login`, { token })
        .catch(err => {
          console.error('Google login request failed:', err.response?.status, err.response?.statusText);
          console.error('Error details:', err.response?.data);
          throw err;
        });
      
      console.log('Google login response received:', response.status);
      
      // Store token in localStorage
      if (response.data.access_token) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('user', JSON.stringify({
          id: response.data.user_id,
          name: response.data.name,
          email: response.data.email
        }));
        console.log('User data stored in localStorage');
      }
      
      return response.data;
    } catch (error) {
      console.error('Google login error in authService:', error);
      throw error.response?.data || { detail: 'Google login failed' };
    }
  },

  /**
   * Get current user profile
   * @returns {Promise} - Promise with user profile data
   */
  getProfile: async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      return response.data;
    } catch (error) {
      throw error.response?.data || { detail: 'Failed to get profile' };
    }
  },

  /**
   * Logout the current user
   */
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  /**
   * Check if user is authenticated
   * @returns {boolean} - True if user is authenticated
   */
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  /**
   * Get current user from localStorage
   * @returns {Object|null} - User object or null
   */
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  /**
   * Get authentication token
   * @returns {string|null} - Authentication token or null
   */
  getToken: () => {
    return localStorage.getItem('token');
  }
};

export default authService;
