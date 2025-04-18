import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * ProficiencyLevelScreen component
 * Allows users to select their proficiency level in the chosen language
 */
const ProficiencyLevelScreen: React.FC = () => {
  const navigate = useNavigate();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  
  // CEFR proficiency levels data
  const levels = [
    {
      code: 'A1',
      name: 'Beginner',
      description: 'Basic vocabulary and simple phrases for everyday situations',
      skills: ['Basic phrases', 'Simple vocabulary', 'Everyday needs'],
      color: 'green'
    },
    {
      code: 'A2',
      name: 'Elementary',
      description: 'Communicate in simple and routine tasks on familiar topics',
      skills: ['Daily routines', 'Basic conversations', 'Simple opinions'],
      color: 'green'
    },
    {
      code: 'B1',
      name: 'Intermediate',
      description: 'Deal with most situations likely to arise while traveling',
      skills: ['Travel conversations', 'Personal experiences', 'Simple explanations'],
      color: 'blue'
    },
    {
      code: 'B2',
      name: 'Upper Intermediate',
      description: 'Interact with a degree of fluency that makes regular interaction possible',
      skills: ['Complex discussions', 'Detailed opinions', 'Professional topics'],
      color: 'blue'
    },
    {
      code: 'C1',
      name: 'Advanced',
      description: 'Express ideas fluently and spontaneously without obvious searching for expressions',
      skills: ['Abstract discussions', 'Nuanced opinions', 'Professional fluency'],
      color: 'purple'
    },
    {
      code: 'C2',
      name: 'Proficient',
      description: 'Express yourself spontaneously, very fluently and precisely, even in complex situations',
      skills: ['Native-like fluency', 'Complex argumentation', 'Subtle meanings'],
      color: 'purple'
    }
  ];
  
  // Helper function to get color classes based on level color
  const getColorClass = (color: string) => {
    switch(color) {
      case 'green':
        return {
          badge: 'bg-green-100 text-green-800',
          border: 'border-green-200 hover:border-green-300',
          bg: 'bg-green-50'
        };
      case 'blue':
        return {
          badge: 'bg-blue-100 text-blue-800',
          border: 'border-blue-200 hover:border-blue-300',
          bg: 'bg-blue-50'
        };
      case 'purple':
        return {
          badge: 'bg-purple-100 text-purple-800',
          border: 'border-purple-200 hover:border-purple-300',
          bg: 'bg-purple-50'
        };
      default:
        return {
          badge: 'bg-gray-100 text-gray-800',
          border: 'border-gray-200 hover:border-gray-300',
          bg: 'bg-gray-50'
        };
    }
  };
  
  // Handle level selection
  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
  };
  
  // Handle continue to next step
  const handleContinue = () => {
    if (selectedLevel) {
      // In a real app, we would store the selected level in context or state
      console.log(`Selected level: ${selectedLevel}`);
      // Navigate to the topic selection screen
      navigate('/topic-selection');
    }
  };
  
  // Handle navigation back to language selection
  const handleBack = () => {
    navigate('/language-selection');
  };
  
  return (
    <MainLayout>
      {/* Navigation Steps */}
      <div className="bg-gray-50 py-3 px-6 border-b border-gray-100">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button 
            className="flex items-center text-gray-500 hover:text-teal-500"
            onClick={handleBack}
          >
            <ChevronLeft size={18} />
            <span className="ml-1">Change Language</span>
          </button>
          
          <div className="flex items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-teal-400 text-white flex items-center justify-center text-xs font-medium">
                1
              </div>
              <div className="ml-2 text-sm font-medium text-gray-800">Language</div>
            </div>
            <div className="w-8 h-px bg-gray-300 mx-2"></div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-teal-400 text-white flex items-center justify-center text-xs font-medium">
                2
              </div>
              <div className="ml-2 text-sm font-medium text-gray-800">Level</div>
            </div>
            <div className="w-8 h-px bg-gray-300 mx-2"></div>
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-500">Topic</div>
            </div>
          </div>
          
          <button 
            className="flex items-center text-gray-500 hover:text-teal-500"
            onClick={() => navigate('/')}
          >
            <span className="mr-1">Start Over</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Select Your Proficiency Level</h2>
          <p className="text-gray-600">Choose your current English speaking level to personalize your learning experience</p>
        </div>
        
        {/* Info Banner */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 flex items-start mb-8">
          <Info size={20} className="text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="text-sm font-medium text-gray-800 mb-1">Not sure about your level?</h3>
            <p className="text-sm text-gray-600">
              Take our quick 5-minute assessment to determine your proficiency level accurately.
            </p>
            <button 
              className="mt-2 inline-block text-blue-600 text-sm font-medium hover:text-blue-700"
              onClick={() => navigate('/speaking-assessment')}
            >
              Take Assessment
            </button>
          </div>
        </div>
        
        {/* Level Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {levels.map((level, index) => {
            const colorClasses = getColorClass(level.color);
            const isSelected = selectedLevel === level.code;
            
            return (
              <div 
                key={index}
                className={`bg-white rounded-lg ${isSelected ? 'border-2 border-teal-400 shadow-md' : colorClasses.border + ' border'} transition-all overflow-hidden cursor-pointer`}
                onClick={() => handleLevelSelect(level.code)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800">{level.name}</h3>
                    <span className={`${colorClasses.badge} px-2.5 py-1 rounded-lg text-xs font-bold`}>
                      {level.code}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{level.description}</p>
                  <ul className="space-y-2">
                    {level.skills.map((skill, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-700">
                        <svg className="h-4 w-4 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={`${colorClasses.bg} px-6 py-3 flex justify-center`}>
                  <button className="text-gray-800 font-medium text-sm hover:underline">
                    {isSelected ? 'Selected' : 'Select Level'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Continue Button */}
        <div className="mt-10 flex justify-center">
          <button 
            className={`px-6 py-3 rounded-lg flex items-center font-medium shadow-sm ${
              selectedLevel 
                ? 'bg-teal-400 text-white hover:bg-teal-500' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
            onClick={handleContinue}
            disabled={!selectedLevel}
          >
            Continue to Topics
            {selectedLevel && <ChevronLeft size={18} className="ml-1 rotate-180" />}
          </button>
        </div>
      </main>
    </MainLayout>
  );
};

export default ProficiencyLevelScreen;
