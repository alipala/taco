import React, { useEffect, useState } from 'react';
import { CheckCircle, X } from 'lucide-react';

/**
 * CenteredSuccessAlert component
 * Displays a modern, centered success message with animation
 */
const CenteredSuccessAlert = ({ message, duration = 5000, onDismiss }) => {
  const [visible, setVisible] = useState(!!message);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
      setFadeOut(false);
      
      const timer = setTimeout(() => {
        setFadeOut(true);
        
        // After fade animation completes, hide the alert
        setTimeout(() => {
          setVisible(false);
          if (onDismiss) onDismiss();
        }, 500); // Match this with the CSS transition duration
      }, duration);
      
      return () => {
        clearTimeout(timer);
      };
    }
  }, [message, duration, onDismiss]);

  if (!message || !visible) return null;
  
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 transition-opacity duration-500 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
      <div className={`bg-white rounded-lg shadow-xl max-w-md w-full mx-4 transform transition-transform duration-500 ${fadeOut ? 'scale-95' : 'scale-100'}`}>
        <div className="p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-medium text-gray-900">Success!</h3>
              <div className="mt-2">
                <p className="text-gray-600">{message}</p>
              </div>
            </div>
            <button
              type="button"
              className="flex-shrink-0 ml-4 text-gray-400 hover:text-gray-500 focus:outline-none"
              onClick={() => {
                setFadeOut(true);
                setTimeout(() => {
                  setVisible(false);
                  if (onDismiss) onDismiss();
                }, 500);
              }}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CenteredSuccessAlert;
