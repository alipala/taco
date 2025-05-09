import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, ArrowRight, Loader } from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext.jsx';
import { useGoogleLogin } from '@react-oauth/google';

/**
 * AuthModal component
 * Provides login and signup functionality in a modal dialog
 */
const AuthModal = ({ isOpen, onClose }) => {
  const { login, register, googleLogin, state } = useAppContext();
  const [mode, setMode] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [error, setError] = useState('');
  // Removed unused state variables
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Google Login setup
  const googleLoginHandler = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setError('');
        setIsSubmitting(true);
        
        // Log token information for debugging
        console.log('Google login successful, received token');
        console.log('Token type:', typeof tokenResponse.access_token);
        console.log('Token length:', tokenResponse.access_token.length);
        console.log('Token starts with:', tokenResponse.access_token.substring(0, 20));
        
        const result = await googleLogin(tokenResponse.access_token);
        if (result.success) {
          console.log('Backend login successful');
          onClose();
        } else {
          console.error('Backend login failed:', result.error);
          setError(result.error || 'Google login failed. Please try again.');
        }
      } catch (err) {
        console.error('Google login error:', err);
        setError('Google login failed. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    },
    onError: (error) => {
      setError('Google login failed: ' + error.message);
      console.error('Google login error:', error);
    }
  });

  // Clear error when switching modes
  useEffect(() => {
    setError('');
  }, [mode]);
  
  // Set error from context if available
  useEffect(() => {
    if (state.error) {
      setError(state.error);
    }
  }, [state.error]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      // Basic validation
      if (!email || !password) {
        setError('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      if (mode === 'signup') {
        if (!name) {
          setError('Please enter your name');
          setIsSubmitting(false);
          return;
        }
        
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setIsSubmitting(false);
          return;
        }

        if (password.length < 8) {
          setError('Password must be at least 8 characters');
          setIsSubmitting(false);
          return;
        }

        if (!agreeToTerms) {
          setError('You must agree to the Terms of Service and Privacy Policy');
          setIsSubmitting(false);
          return;
        }
        
        // Register new user
        const result = await register({
          email,
          name,
          password
        });
        
        if (result.success) {
          onClose();
        } else {
          setError(result.error || 'Registration failed. Please try again.');
        }
      } else {
        // Login existing user
        const result = await login({
          email,
          password
        });
        
        if (result.success) {
          // Add a small delay before closing the modal to ensure state updates
          setTimeout(() => {
            onClose();
          }, 100);
        } else {
          setError(result.error || 'Login failed. Please check your credentials.');
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        {/* Close Button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={20} />
        </button>
        
        {/* Header */}
        <div className="p-6 bg-white">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-gray-500 text-sm">
            {mode === 'login' 
              ? 'Sign in to continue your language learning journey' 
              : 'Get started with your personalized language learning experience'}
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button 
            className={`flex-1 py-3 px-4 text-center text-sm font-medium ${mode === 'login' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setMode('login')}
          >
            Login
          </button>
          <button 
            className={`flex-1 py-3 px-4 text-center text-sm font-medium ${mode === 'signup' ? 'text-teal-500 border-b-2 border-teal-500' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setMode('signup')}
          >
            Sign Up
          </button>
        </div>
        
        {/* Form */}
        <div className="p-6">
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            
            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? 
                    <EyeOff size={18} className="text-gray-400 hover:text-gray-600" /> :
                    <Eye size={18} className="text-gray-400 hover:text-gray-600" />
                  }
                </button>
              </div>
              {mode === 'signup' && (
                <p className="mt-1 text-xs text-gray-500">
                  Must be at least 8 characters and include a number
                </p>
              )}
            </div>
            
            {/* Name (only for signup) */}
            {mode === 'signup' && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            
            {/* Confirm Password (only for signup) */}
            {mode === 'signup' && (
              <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={18} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>
            )}
            
            {/* Login options */}
            {mode === 'login' && (
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button type="button" className="text-sm font-medium text-teal-500 hover:text-teal-600">
                  Forgot password?
                </button>
              </div>
            )}
            
            {/* Terms (only for signup) */}
            {mode === 'signup' && (
              <div className="mb-6">
                <div className="flex items-start">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 mt-1 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                    checked={agreeToTerms}
                    onChange={() => setAgreeToTerms(!agreeToTerms)}
                  />
                  <label htmlFor="terms" className="ml-2 block text-sm text-gray-500">
                    I agree to the <button type="button" className="text-teal-500 hover:text-teal-600 p-0 m-0 inline font-normal">Terms of Service</button> and <button type="button" className="text-teal-500 hover:text-teal-600 p-0 m-0 inline font-normal">Privacy Policy</button>
                  </label>
                </div>
              </div>
            )}
            
            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-teal-400 text-white py-2 px-4 rounded-lg hover:bg-teal-500 transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin mr-2" />
                  {mode === 'login' ? 'Signing In...' : 'Creating Account...'}
                </>
              ) : (
                <>
                  {mode === 'login' ? 'Sign In' : 'Create Account'}
                  <ArrowRight size={18} className="ml-1" />
                </>
              )}
            </button>
          </form>
          
          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or continue with</span>
            </div>
          </div>
          
          {/* Social Login */}
          <button 
            type="button"
            onClick={googleLoginHandler}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
          >
            <div className="w-5 h-5 mr-2 text-center text-red-500 font-bold">G</div>
            <span className="text-gray-700 font-medium">Google</span>
          </button>
          
          {/* Account Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            {mode === 'login' ? (
              <>
                Don't have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setMode('signup')} 
                  className="font-medium text-teal-500 hover:text-teal-600"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <button 
                  type="button"
                  onClick={() => setMode('login')} 
                  className="font-medium text-teal-500 hover:text-teal-600"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
