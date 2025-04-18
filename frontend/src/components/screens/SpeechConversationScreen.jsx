import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Mic, Settings, MessageSquare, BookOpen, ListChecks, 
  CheckCircle, Info, ChevronRight, VolumeX, Volume2, Sliders 
} from 'lucide-react';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * SpeechConversationScreen component
 * Redesigned conversation interface with exercise panel and conversation transcript
 */
const SpeechConversationScreen = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [currentExerciseType, setCurrentExerciseType] = useState('free');
  const [speechSpeed, setSpeechSpeed] = useState(1);
  
  // Mock conversation history data
  const conversationHistory = [
    {
      role: 'assistant',
      message: "Hello! Today we're discussing technology. What gadget or technology do you use most in your daily life?",
      time: '16:45'
    },
    {
      role: 'user',
      message: "I use my smartphone the most. I rely on it for communication, information, and entertainment.",
      time: '16:46',
      feedback: {
        grammar: 85,
        vocabulary: 75,
        pronunciation: 80
      }
    },
    {
      role: 'assistant',
      message: "That's common for many people. What features or apps do you find most useful on your smartphone?",
      time: '16:47'
    }
  ];
  
  // Helper function to get score color
  const getScoreColor = (score) => {
    if (score >= 80) return 'text-teal-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-500';
  };

  // Handle navigation back to topic selection
  const handleChangeTopic = () => {
    navigate('/topic-selection');
  };

  // Handle navigation back to proficiency level selection
  const handleChangeLevel = () => {
    navigate('/proficiency-level');
  };

  // Handle navigation back to language selection
  const handleChangeLanguage = () => {
    navigate('/language-selection');
  };
  
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-3 px-6 border-b border-gray-100 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Your Smart <span className="text-teal-400">Language Coach</span></h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">English • C2 • Technology</span>
          </div>
          <button className="text-gray-500 hover:text-teal-400">
            <Settings size={20} />
          </button>
          <div className="h-8 w-8 rounded-full bg-teal-400 flex items-center justify-center text-white">
            U
          </div>
        </div>
      </header>
      
      {/* Action Buttons */}
      <div className="bg-gray-50 py-2 px-6 border-b border-gray-100">
        <div className="flex justify-between items-center">
          <div className="flex space-x-2">
            <button 
              className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 flex items-center"
              onClick={handleChangeLanguage}
            >
              <ChevronRight size={16} className="mr-1 rotate-180" />
              Change Language
            </button>
            <button 
              className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 flex items-center"
              onClick={handleChangeTopic}
            >
              <ChevronRight size={16} className="mr-1 rotate-180" />
              Change Topic
            </button>
            <button 
              className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 flex items-center"
              onClick={handleChangeLevel}
            >
              <ChevronRight size={16} className="mr-1 rotate-180" />
              Change Level
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Exercise */}
        <div className="w-2/5 bg-[#f8f9fa] flex flex-col border-r-4 border-[#e9ecef]">
          {/* Exercise Type Header */}
          <div className="bg-teal-400 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <BookOpen size={20} className="mr-2" />
                <h2 className="font-medium text-lg">Exercise Panel</h2>
              </div>
              <div className="flex bg-white bg-opacity-20 rounded-full p-0.5">
                {['Free', 'Guided', 'Transform', 'Correction'].map((type) => (
                  <button 
                    key={type} 
                    className={`px-3 py-1 text-xs rounded-full ${currentExerciseType === type.toLowerCase() ? 'bg-white text-teal-400' : 'text-white hover:bg-white hover:bg-opacity-10'}`}
                    onClick={() => setCurrentExerciseType(type.toLowerCase())}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          {/* Current Exercise */}
          <div className="p-4 border-b border-gray-200 bg-white">
            <div className="flex items-center mb-2">
              <ListChecks size={16} className="text-teal-400 mr-2" />
              <h2 className="font-medium text-gray-700">Current Exercise</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <p className="text-gray-800 font-medium mb-1">Describe your favorite technology</p>
              <p className="text-gray-500 text-sm italic">Example: I enjoy using my tablet because it combines portability with a large screen.</p>
            </div>
          </div>
          
          {/* Speaking Speed Control */}
          <div className="p-4 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <Sliders size={16} className="text-orange-400 mr-2" />
                <h2 className="font-medium text-gray-700">Speaking Speed</h2>
              </div>
              <span className="text-sm bg-orange-100 text-orange-500 px-2 py-0.5 rounded-full">
                {speechSpeed === 0.75 ? 'Slow' : speechSpeed === 1 ? 'Normal' : 'Fast'}
              </span>
            </div>
            <div className="flex items-center">
              <VolumeX size={16} className="text-gray-400 mr-2" />
              <input
                type="range"
                min="0.75"
                max="1.25"
                step="0.25"
                value={speechSpeed}
                onChange={(e) => setSpeechSpeed(parseFloat(e.target.value))}
                className="w-full accent-orange-400"
              />
              <Volume2 size={16} className="text-gray-400 ml-2" />
            </div>
          </div>
          
          {/* Previous Sentences */}
          <div className="p-4 flex-1 overflow-y-auto bg-white border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium text-gray-700 flex items-center">
                <MessageSquare size={16} className="text-teal-400 mr-2" />
                Previous Sentences
              </h2>
              <button className="text-xs text-gray-500 hover:text-teal-400">Clear All</button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">16:46</span>
                  <span className="text-xs font-medium text-teal-400">Score: 80/100</span>
                </div>
                <p className="text-gray-700 text-sm">I use my smartphone the most. I rely on it for communication, information, and entertainment.</p>
                <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between">
                  <button 
                    className="text-xs text-teal-400 hover:text-teal-500"
                    onClick={() => setShowFeedbackModal(true)}
                  >
                    View Feedback
                  </button>
                  <button className="text-xs text-gray-500 hover:text-gray-600">Repeat</button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Speaking Control */}
          <div className="p-5 bg-gray-100 border-t border-gray-200">            
            <button 
              className="px-4 py-2 bg-yellow-400 text-white rounded-md flex items-center mx-auto mb-3 hover:bg-yellow-500 transition-colors"
              onClick={() => setShowFeedbackModal(true)}
            >
              <CheckCircle size={16} className="mr-1" />
              <span>Analyze Sentence</span>
            </button>
            
            <button
              className={`w-full py-4 rounded-lg flex items-center justify-center text-white font-medium ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-400 hover:bg-teal-500'} shadow-md transition-all`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic size={24} className={`mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
              {isRecording ? 'Stop Recording' : 'Click to Start Speaking'}
            </button>
          </div>
        </div>
        
        {/* Right Panel - Conversation */}
        <div className="w-3/5 bg-white flex flex-col">
          {/* Conversation Header */}
          <div className="bg-[#FFD63A] text-gray-800 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <MessageSquare size={20} className="mr-2" />
                <h2 className="font-medium text-lg">Conversation Transcript</h2>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 bg-white bg-opacity-20 text-gray-800 hover:bg-opacity-30 rounded">
                  <Info size={18} />
                </button>
              </div>
            </div>
          </div>
          
          {/* Conversation Content */}
          <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
            <div className="space-y-4">
              {conversationHistory.map((item, index) => (
                <div key={index} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg p-3 shadow-sm ${
                    item.role === 'user' ? 'bg-teal-50 border-l-4 border-teal-400' : 'bg-white border-l-4 border-yellow-400'
                  }`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`text-xs font-medium ${
                        item.role === 'user' ? 'text-teal-500' : 'text-yellow-500'
                      }`}>
                        {item.role === 'user' ? 'You' : 'Tutor'}
                      </span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-gray-800">{item.message}</p>
                    
                    {item.feedback && (
                      <div className="mt-2 pt-2 border-t border-gray-200">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <div className="text-xs text-gray-500 mb-0.5">Grammar</div>
                            <div className={`text-sm font-medium ${getScoreColor(item.feedback.grammar)}`}>
                              {item.feedback.grammar}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-0.5">Vocabulary</div>
                            <div className={`text-sm font-medium ${getScoreColor(item.feedback.vocabulary)}`}>
                              {item.feedback.vocabulary}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-500 mb-0.5">Pronunciation</div>
                            <div className={`text-sm font-medium ${getScoreColor(item.feedback.pronunciation)}`}>
                              {item.feedback.pronunciation}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {/* Recording Indicator (when active) */}
              {isRecording && (
                <div className="flex justify-end">
                  <div className="bg-red-50 text-red-500 rounded-lg p-3 flex items-center shadow-sm border-l-4 border-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                    <span className="text-sm">Recording...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-800">Sentence Feedback</h2>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={() => setShowFeedbackModal(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Your sentence:</h3>
                <p className="text-gray-800 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  I use my smartphone the most. I rely on it for communication, information, and entertainment.
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Scores:</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                    <div className="text-xs text-gray-500 mb-1">Grammar</div>
                    <div className="text-2xl font-bold text-teal-400">85</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                    <div className="text-xs text-gray-500 mb-1">Vocabulary</div>
                    <div className="text-2xl font-bold text-yellow-400">75</div>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 text-center">
                    <div className="text-xs text-gray-500 mb-1">Pronunciation</div>
                    <div className="text-2xl font-bold text-teal-400">80</div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Feedback:</h3>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <p className="text-gray-800 text-sm mb-2">
                    <span className="font-medium">Grammar:</span> Good sentence structure. Consider using more complex sentences to express your ideas.
                  </p>
                  <p className="text-gray-800 text-sm mb-2">
                    <span className="font-medium">Vocabulary:</span> Basic vocabulary used correctly. Try incorporating more specific terms related to technology.
                  </p>
                  <p className="text-gray-800 text-sm">
                    <span className="font-medium">Pronunciation:</span> Clear pronunciation overall. Pay attention to the stress in "communication" and "entertainment".
                  </p>
                </div>
              </div>
              
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Suggested improvements:</h3>
                <p className="text-gray-800 p-3 bg-teal-50 rounded-lg border border-teal-100">
                  "My smartphone is the technology I use most frequently. I depend on it for staying connected, accessing information, and enjoying various forms of entertainment."
                </p>
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button 
                className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
                onClick={() => setShowFeedbackModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeechConversationScreen;
