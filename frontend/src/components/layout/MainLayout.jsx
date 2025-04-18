import React from 'react';
import Navbar from '../common/Navbar.jsx';

/**
 * MainLayout component
 * Wraps the application pages with common layout elements like navbar and footer
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <footer className="py-6 px-6 bg-gray-50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Your Smart Language Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
