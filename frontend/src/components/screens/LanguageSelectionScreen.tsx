import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * LanguageSelectionScreen component
 * Allows users to select their target language for learning
 */
const LanguageSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  
  // Language data with statistics
  const languages = [
    { 
      name: 'English', 
      flag: '🇬🇧', 
      desc: 'Practice English speaking and listening',
      levelCount: '6 levels available',
      stats: {
        learners: '10M+',
        exercises: '2,000+',
        teachers: '1,000+'
      }
    },
    { 
      name: 'Spanish', 
      flag: '🇪🇸', 
      desc: 'Domina habilidades de conversación en español',
      levelCount: '6 levels available',
      stats: {
        learners: '8M+',
        exercises: '1,800+',
        teachers: '850+'
      }
    },
    { 
      name: 'French', 
      flag: '🇫🇷', 
      desc: 'Améliorez vos compétences en français',
      levelCount: '6 levels available',
      stats: {
        learners: '7M+',
        exercises: '1,700+',
        teachers: '800+'
      }
    },
    { 
      name: 'German', 
      flag: '🇩🇪', 
      desc: 'Entwickle deutsche Sprachkenntnisse',
      levelCount: '6 levels available',
      stats: {
        learners: '5M+',
        exercises: '1,500+',
        teachers: '700+'
      }
    },
    { 
      name: 'Dutch', 
      flag: '🇳🇱', 
      desc: 'Leer Nederlandse woordenschat en conversatie',
      levelCount: '6 levels available',
      stats: {
        learners: '2M+',
        exercises: '1,200+',
        teachers: '500+'
      }
    },
    { 
      name: 'Portuguese', 
      flag: '🇵🇹', 
      desc: 'Aprenda vocabulário e expressões em português',
      levelCount: '6 levels available',
      stats: {
        learners: '3M+',
        exercises: '1,300+',
        teachers: '600+'
      }
    },
  ];
  
  // Filter languages based on search query
  const filteredLanguages = languages.filter(lang => 
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle language selection
  const handleLanguageSelect = (language: string) => {
    // In a real app, we would store the selected language in context or state
    console.log(`Selected language: ${language}`);
    // Navigate to the proficiency level selection screen
    navigate('/proficiency-level');
  };
  
  return (
    <MainLayout>
      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose Your Language</h2>
          <p className="text-gray-600">Select a language to start your speaking practice journey</p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              placeholder="Search for a language..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Language Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLanguages.map((language, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg border border-gray-100 hover:border-teal-300 transition-all hover:shadow-md overflow-hidden cursor-pointer"
              onClick={() => handleLanguageSelect(language.name)}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-4">
                    <div className="text-4xl">{language.flag}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{language.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{language.desc}</p>
                    <div className="flex items-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {language.levelCount}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-2">
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-800">{language.stats.learners}</div>
                    <div className="text-xs text-gray-500">Learners</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-800">{language.stats.exercises}</div>
                    <div className="text-xs text-gray-500">Exercises</div>
                  </div>
                  <div className="text-center">
                    <div className="text-sm font-bold text-gray-800">{language.stats.teachers}</div>
                    <div className="text-xs text-gray-500">Teachers</div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-6 py-3">
                <button className="w-full text-teal-500 font-medium text-sm hover:text-teal-600 flex items-center justify-center">
                  Start Learning
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Enterprise Banner */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-6">
              <h3 className="text-xl font-bold text-gray-800 mb-2">Language Learning for Teams</h3>
              <p className="text-gray-600 mb-4">
                Enhance your team's communication skills with our enterprise language learning solution. 
                Custom plans, detailed analytics, and dedicated support.
              </p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Learn About Enterprise Plans
              </button>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="w-40 h-40 bg-blue-100 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
};

export default LanguageSelectionScreen;
