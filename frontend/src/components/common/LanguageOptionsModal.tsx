import React, { useState, useEffect } from 'react';
import { Award, MessageSquare, ChevronRight, Volume2 } from 'lucide-react';

/**
 * LanguageOptionsModal component
 * 
 * Displays a modal with options to either "Assess my speaking level" or "Do a Practice"
 * after a user selects a language
 * 
 * @param {Object} props - Component props
 * @param {boolean} props.isOpen - Whether the modal is open or closed
 * @param {Function} props.onClose - Function to call when closing the modal
 * @param {string} props.selectedLanguage - The language selected by the user
 * @param {Function} props.onContinue - Function to call with selected option when continuing
 */
const LanguageOptionsModal = ({ isOpen, onClose, selectedLanguage, onContinue }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [animationComplete, setAnimationComplete] = useState(false);
  
  useEffect(() => {
    if (isOpen) {
      // Start entry animation
      const timer = setTimeout(() => {
        setAnimationComplete(true);
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setAnimationComplete(false);
      setSelectedOption(null);
    }
  }, [isOpen]);
  
  // Handle option selection
  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };
  
  // Handle continue to next screen
  const handleContinue = () => {
    if (selectedOption) {
      onContinue(selectedOption);
    }
    onClose();
  };
  
  // Get language display info based on selection
  const getLanguageInfo = () => {
    const languageMap = {
      'English': { 
        flag: '🇬🇧', 
        description: 'The global language for business, technology, and international communication',
        learners: '10M+'
      },
      'Spanish': { 
        flag: '🇪🇸', 
        description: 'The second most spoken native language in the world',
        learners: '8M+'
      },
      'French': { 
        flag: '🇫🇷', 
        description: 'A language of diplomacy, culture, and international relations',
        learners: '7M+'
      },
      'German': { 
        flag: '🇩🇪', 
        description: 'The most widely spoken language in the European Union',
        learners: '5M+'
      },
      'Dutch': { 
        flag: '🇳🇱', 
        description: 'A West Germanic language spoken by around 24 million people',
        learners: '2M+'
      },
      'Portuguese': { 
        flag: '🇵🇹', 
        description: 'A global language with over 250 million speakers worldwide',
        learners: '3M+'
      }
    };
    
    return languageMap[selectedLanguage] || { 
      flag: '🌐', 
      description: 'Select a language to start learning',
      learners: '0'
    };
  };
  
  const languageInfo = getLanguageInfo();
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className={`bg-white rounded-xl shadow-xl w-full max-w-2xl overflow-hidden transition-all duration-300 transform ${animationComplete ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}>
        {/* Header */}
        <div className="p-6 bg-teal-400 text-white">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="text-3xl mr-3">{languageInfo.flag}</div>
              <div>
                <h2 className="text-xl font-bold">
                  {selectedLanguage ? `${selectedLanguage} Selected` : 'Select Your Path'}
                </h2>
                <p className="text-sm text-teal-50">Choose how you want to start your language journey</p>
              </div>
            </div>
            
            <button 
              className="text-white hover:text-teal-100 transition-colors"
              onClick={onClose}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Language Info */}
        <div className="px-6 py-4 border-b border-gray-100 bg-teal-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-500 flex items-center justify-center mr-3">
                <Volume2 size={20} />
              </div>
              <p className="text-gray-600 text-sm">{languageInfo.description}</p>
            </div>
            <div className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
              {languageInfo.learners} learners
            </div>
          </div>
        </div>
        
        {/* Options */}
        <div className="p-6">
          <div className="text-sm font-medium text-gray-500 mb-3">What would you like to do?</div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {/* Assessment Option */}
            <div 
              className={`border rounded-xl p-5 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedOption === 'assessment' 
                  ? 'border-teal-400 bg-teal-50' 
                  : 'border-gray-200 hover:border-teal-200'
              }`}
              onClick={() => handleOptionSelect('assessment')}
            >
              <div className="flex items-start h-full">
                <div className="w-12 h-12 rounded-full bg-teal-100 text-teal-500 flex items-center justify-center flex-shrink-0 mr-4">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Assess my speaking level</h3>
                  <p className="text-gray-600 text-sm">Take a quick assessment to determine your current language proficiency level.</p>
                </div>
              </div>
            </div>
            
            {/* Practice Option */}
            <div 
              className={`border rounded-xl p-5 transition-all duration-200 cursor-pointer hover:shadow-md ${
                selectedOption === 'practice' 
                  ? 'border-teal-400 bg-teal-50' 
                  : 'border-gray-200 hover:border-teal-200'
              }`}
              onClick={() => handleOptionSelect('practice')}
            >
              <div className="flex items-start h-full">
                <div className="w-12 h-12 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center flex-shrink-0 mr-4">
                  <MessageSquare size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 mb-2">Do a Practice</h3>
                  <p className="text-gray-600 text-sm">Start a conversation practice session on topics of your choice.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Footer Actions */}
          <div className="flex justify-end">
            <button 
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors mr-3"
              onClick={onClose}
            >
              Cancel
            </button>
            <button 
              className={`px-4 py-2 rounded-lg transition-colors flex items-center ${
                selectedOption 
                  ? 'bg-teal-400 text-white hover:bg-teal-500' 
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
              onClick={handleContinue}
              disabled={!selectedOption}
            >
              Continue
              {selectedOption && <ChevronRight size={18} className="ml-1" />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageOptionsModal;