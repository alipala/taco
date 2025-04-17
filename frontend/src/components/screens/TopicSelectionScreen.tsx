import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, X, RefreshCw } from 'lucide-react';
import MainLayout from '../layout/MainLayout';

/**
 * TopicSelectionScreen component
 * Allows users to select a conversation topic or create a custom topic
 */
const TopicSelectionScreen: React.FC = () => {
  const navigate = useNavigate();
  const [showCustomTopic, setShowCustomTopic] = useState(false);
  const [customTopic, setCustomTopic] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  
  // Topic data
  const topics = [
    {
      id: 'travel',
      name: 'Travel',
      description: 'Discuss travel destinations, experiences, and planning trips.',
      icon: '✈️'
    },
    {
      id: 'food',
      name: 'Food & Cooking',
      description: 'Talk about cuisines, recipes, restaurants, and cooking techniques.',
      icon: '🍲'
    },
    {
      id: 'hobbies',
      name: 'Hobbies & Interests',
      description: 'Share your favorite activities, sports, games, or pastimes.',
      icon: '🎨'
    },
    {
      id: 'culture',
      name: 'Culture & Traditions',
      description: 'Explore cultural aspects, traditions, festivals, and customs.',
      icon: '🏛️'
    },
    {
      id: 'movies',
      name: 'Movies & TV Shows',
      description: 'Discuss films, series, actors, directors, and entertainment.',
      icon: '🎬'
    },
    {
      id: 'music',
      name: 'Music',
      description: 'Talk about music genres, artists, concerts, and preferences.',
      icon: '🎵'
    },
    {
      id: 'technology',
      name: 'Technology',
      description: 'Discuss gadgets, apps, innovations, and digital trends.',
      icon: '💻'
    },
    {
      id: 'environment',
      name: 'Environment & Nature',
      description: 'Explore environmental issues, sustainability, and the natural world.',
      icon: '🌳'
    },
    {
      id: 'custom',
      name: 'Custom Topic',
      description: 'Create your own topic for a personalized conversation.',
      icon: '🔍'
    }
  ];
  
  // Filter topics based on search query
  const filteredTopics = topics.filter(topic => 
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle topic selection
  const handleTopicSelect = (topicId: string) => {
    if (topicId === 'custom') {
      setShowCustomTopic(true);
    } else {
      setSelectedTopic(topicId);
    }
  };
  
  // Handle custom topic submission
  const handleCustomTopicSubmit = () => {
    if (customTopic.trim()) {
      setSelectedTopic('custom');
      setShowCustomTopic(false);
    }
  };
  
  // Handle random topic selection
  const handleRandomTopic = () => {
    // Exclude custom topic from random selection
    const randomTopics = topics.filter(topic => topic.id !== 'custom');
    const randomIndex = Math.floor(Math.random() * randomTopics.length);
    setSelectedTopic(randomTopics[randomIndex].id);
  };
  
  // Handle continue to conversation
  const handleStartConversation = () => {
    if (selectedTopic) {
      // In a real app, we would store the selected topic in context or state
      console.log(`Selected topic: ${selectedTopic}`);
      if (selectedTopic === 'custom') {
        console.log(`Custom topic: ${customTopic}`);
      }
      // Navigate to the conversation interface
      navigate('/conversation');
    }
  };
  
  // Handle navigation back to proficiency level selection
  const handleBack = () => {
    navigate('/proficiency-level');
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
            <span className="ml-1">Change Level</span>
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
              <div className="w-6 h-6 rounded-full bg-teal-400 text-white flex items-center justify-center text-xs font-medium">
                3
              </div>
              <div className="ml-2 text-sm font-medium text-gray-800">Topic</div>
            </div>
          </div>
          
          <button 
            className="flex items-center text-gray-500 hover:text-teal-500"
            onClick={() => navigate('/conversation')}
          >
            <span className="mr-1">Skip Topic</span>
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Choose a Topic</h2>
          <p className="text-gray-600">Select a topic for your English conversation (optional)</p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={20} className="text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
              placeholder="Search topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        {/* Topic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTopics.map((topic) => (
            <div
              key={topic.id}
              className={`bg-white rounded-lg border ${
                selectedTopic === topic.id 
                  ? 'border-2 border-teal-400 shadow-md' 
                  : 'border-gray-200 hover:border-teal-300'
              } transition-all hover:shadow-md cursor-pointer`}
              onClick={() => handleTopicSelect(topic.id)}
            >
              <div className="p-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-2xl mr-4">
                    {topic.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">{topic.name}</h3>
                    <p className="text-sm text-gray-600">{topic.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Random Topic Button */}
        <div className="mt-10 flex justify-center">
          <button 
            className="flex items-center text-gray-700 hover:text-teal-500 transition-colors"
            onClick={handleRandomTopic}
          >
            <RefreshCw size={18} className="mr-2" />
            <span>Pick a Random Topic</span>
          </button>
        </div>
        
        {/* Continue Button */}
        <div className="mt-8 flex justify-center">
          <button 
            className={`px-6 py-3 rounded-lg flex items-center font-medium shadow-sm ${
              selectedTopic 
                ? 'bg-teal-400 text-white hover:bg-teal-500' 
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            } transition-colors`}
            onClick={handleStartConversation}
            disabled={!selectedTopic}
          >
            Start Conversation
            {selectedTopic && <ChevronRight size={18} className="ml-1" />}
          </button>
        </div>
      </main>
      
      {/* Custom Topic Modal */}
      {showCustomTopic && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="font-bold text-gray-800">Create Your Custom Topic</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowCustomTopic(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-gray-600 mb-4">
                What would you like to talk about in your English conversation?
              </p>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent resize-none"
                rows={4}
                placeholder="Describe your topic here..."
                value={customTopic}
                onChange={(e) => setCustomTopic(e.target.value)}
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">
                Press Enter to submit or Shift+Enter for a new line
              </p>
              
              <div className="mt-6 flex justify-end gap-3">
                <button 
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  onClick={() => setShowCustomTopic(false)}
                >
                  Cancel
                </button>
                <button 
                  className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
                  onClick={handleCustomTopicSubmit}
                  disabled={!customTopic.trim()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default TopicSelectionScreen;
