import React, { useEffect, useState } from 'react';

/**
 * SuccessAlert component
 * Displays a success message in a green alert box
 * Auto-dismisses after a specified duration
 */
const SuccessAlert = ({ message, duration = 5000, onDismiss }) => {
  const [visible, setVisible] = useState(!!message);

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        if (onDismiss) onDismiss();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [message, duration, onDismiss]);

  if (!message || !visible) return null;
  
  return (
    <div className="fixed top-20 right-4 z-50 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center shadow-lg animate-fade-in-down max-w-md">
      <div className="mr-2 flex-shrink-0">
        <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
        </svg>
      </div>
      <p className="flex-grow">{message}</p>
      <button 
        onClick={() => {
          setVisible(false);
          if (onDismiss) onDismiss();
        }}
        className="ml-4 text-green-700 hover:text-green-900 flex-shrink-0"
        aria-label="Close alert"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default SuccessAlert;
