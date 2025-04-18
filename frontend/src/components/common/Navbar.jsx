import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Globe, ChevronDown, Menu, X } from 'lucide-react';
import AuthModal from './AuthModal';
import { useAppContext } from '../../contexts/AppContext.jsx';

/**
 * Navbar component for the application
 * Provides navigation links and user authentication options
 */
const Navbar = () => {
  // State for mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // State for user profile dropdown
  const [profileOpen, setProfileOpen] = useState(false);
  
  // State for auth modal
  const [authModalOpen, setAuthModalOpen] = useState(false);
  
  // Get login state from context
  const { state, setIsLoggedIn } = useAppContext();

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo & Main Navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Globe className="text-teal-400 h-8 w-8" />
              <span className="ml-2 font-bold text-gray-800 text-lg hidden sm:block">
                Your Smart <span className="text-teal-400">Language Coach</span>
              </span>
            </Link>
            
            {/* Main Navigation - Desktop */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-6">
              <Link 
                to="/practice" 
                className="text-gray-500 hover:text-teal-400 px-1 pt-1 border-b-2 border-transparent hover:border-teal-400 inline-flex items-center text-sm font-medium transition-colors"
              >
                Practice
              </Link>
              <Link 
                to="/progress" 
                className="text-gray-500 hover:text-teal-400 px-1 pt-1 border-b-2 border-transparent hover:border-teal-400 inline-flex items-center text-sm font-medium transition-colors"
              >
                My Progress
              </Link>
            </div>
          </div>
          
          {/* Right-side Navigation */}
          <div className="flex items-center">
            {/* Language Selector */}
            <div className="hidden md:flex items-center mr-4">
              <div className="relative group">
                <button className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-teal-400 transition-colors">
                  <span className="mr-1">EN</span>
                  <ChevronDown size={16} />
                </button>
                <div className="absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 hidden group-hover:block">
                  <div className="py-1">
                    <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <span className="mr-2">🇬🇧</span> English
                    </a>
                    <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <span className="mr-2">🇪🇸</span> Español
                    </a>
                    <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <span className="mr-2">🇫🇷</span> Français
                    </a>
                    <a href="#" className="flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                      <span className="mr-2">🇩🇪</span> Deutsch
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Auth Buttons or User Profile */}
            {state.isLoggedIn ? (
              <div className="relative">
                <button 
                  className="flex items-center text-sm focus:outline-none"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <div className="h-8 w-8 rounded-full bg-teal-400 flex items-center justify-center text-white">
                    U
                  </div>
                  <span className="hidden md:block ml-2 text-gray-700 font-medium">
                    User
                  </span>
                  <ChevronDown size={16} className="ml-1 text-gray-400" />
                </button>
                
                {/* Profile Dropdown */}
                {profileOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                    <div className="py-1">
                      <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Profile
                      </Link>
                      <Link to="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                        Settings
                      </Link>
                      <button 
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        onClick={() => setIsLoggedIn(false)}
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button 
                  className="text-gray-500 hover:text-teal-400 text-sm"
                  onClick={() => setAuthModalOpen(true)}
                >
                  Sign In
                </button>
                <button 
                  className="bg-teal-400 text-white px-4 py-2 rounded-lg hover:bg-teal-500 transition-colors text-sm font-medium"
                  onClick={() => {
                    setAuthModalOpen(true);
                  }}
                >
                  Sign Up
                </button>
              </div>
            )}
            
            {/* Mobile menu button */}
            <button 
              className="ml-4 sm:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link 
              to="/practice" 
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-teal-400 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Practice
            </Link>
            <Link 
              to="/progress" 
              className="block pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-teal-400 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              My Progress
            </Link>
            {!state.isLoggedIn && (
              <>
                <button 
                  className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-gray-500 hover:text-teal-400 hover:bg-gray-50"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </button>
                <button 
                  className="w-full text-left pl-3 pr-4 py-2 text-base font-medium text-teal-400"
                  onClick={() => {
                    setAuthModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      )}
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen} 
        onClose={() => setAuthModalOpen(false)} 
      />
    </nav>
  );
};

export default Navbar;
