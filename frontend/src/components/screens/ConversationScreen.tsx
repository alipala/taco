import React, { useState } from 'react';
import { 
  Mic, Settings, MessageSquare, BookOpen, ListChecks, 
  CheckCircle, Info, ChevronRight, VolumeX, Volume2, X 
} from 'lucide-react';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * ConversationScreen component
 * The main interface for real-time conversation with the AI language tutor
 */
const ConversationScreen: React.FC = () => {
  // State for recording status
  const [isRecording, setIsRecording] = useState(false);
  
  // State for feedback modal
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  
  // State for exercise type
  const [currentExerciseType, setCurrentExerciseType] = useState('free');
  
  // Mock conversation history
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
  
  /**
   * Helper function to determine text color based on score
   * @param score - Numeric score (0-100)
   * @returns CSS class for text color
   */
  const getScoreColor = (score: number): string => {
    if (score >= 80) return 'text-teal-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="py-3 px-6 border-b border-gray-100 flex justify-between items-center bg-white">
        <div className="flex items-center">
          <h1 className="text-lg font-bold">Your Smart <span className="text-teal-400">Language Coach</span></h1>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">English • C2 • Technology</span>
          </div>
          <button className="text-gray-500 hover:text-teal-500">
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
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 flex items-center">
              <ChevronRight size={16} className="mr-1 rotate-180" />
              Change Language
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 flex items-center">
              <ChevronRight size={16} className="mr-1 rotate-180" />
              Change Topic
            </button>
            <button className="px-3 py-1.5 bg-white border border-gray-200 rounded text-sm text-gray-600 hover:bg-gray-50 flex items-center">
              <ChevronRight size={16} className="mr-1 rotate-180" />
              Change Level
            </button>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Exercise */}
        <div className="w-2/5 border-r border-gray-100 bg-white flex flex-col">
          {/* Exercise Type Toggle */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <BookOpen size={16} className="text-teal-400 mr-2" />
                <h2 className="font-medium text-gray-700">Exercise Type</h2>
              </div>
              <div className="flex bg-gray-100 rounded-full p-0.5">
                {['Free', 'Guided', 'Transform', 'Correction', 'Translation'].map((type) => (
                  <button 
                    key={type} 
                    className={`px-3 py-1 text-xs rounded-full ${currentExerciseType === type.toLowerCase() ? 'bg-teal-400 text-white' : 'text-gray-600 hover:bg-gray-200'}`}
                    onClick={() => setCurrentExerciseType(type.toLowerCase())}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <p className="text-sm text-gray-600">
                {currentExerciseType === 'free' && 'Free conversation mode: Practice speaking naturally about any topic.'}
                {currentExerciseType === 'guided' && 'Guided mode: Follow structured speaking prompts and questions.'}
                {currentExerciseType === 'transform' && 'Transform mode: Rephrase sentences using different grammatical structures.'}
                {currentExerciseType === 'correction' && 'Correction mode: Practice fixing common grammar and vocabulary mistakes.'}
                {currentExerciseType === 'translation' && 'Translation mode: Translate sentences between your native language and English.'}
              </p>
            </div>
          </div>
          
          {/* Current Exercise */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center mb-2">
              <ListChecks size={16} className="text-teal-400 mr-2" />
              <h2 className="font-medium text-gray-700">Current Exercise</h2>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-800 font-medium mb-1">Describe your favorite technology</p>
              <p className="text-gray-500 text-sm italic">Example: I enjoy using my tablet because it combines portability with a large screen.</p>
            </div>
          </div>
          
          {/* Previous Sentences */}
          <div className="p-4 border-b border-gray-100 flex-1 overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-medium text-gray-700 flex items-center">
                <MessageSquare size={16} className="text-teal-400 mr-2" />
                Previous Sentences
              </h2>
              <button className="text-xs text-gray-500 hover:text-teal-500">Clear All</button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-500">16:46</span>
                  <span className="text-xs font-medium text-teal-500">Score: 80/100</span>
                </div>
                <p className="text-gray-700 text-sm">I use my smartphone the most. I rely on it for communication, information, and entertainment.</p>
                <div className="mt-2 pt-2 border-t border-gray-200 flex justify-between">
                  <button 
                    className="text-xs text-teal-500 hover:text-teal-600"
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
          <div className="p-4 bg-gray-50 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <button className="flex items-center text-sm text-gray-600 hover:text-gray-800">
                <VolumeX size={16} className="mr-1" />
                Slow Speech
              </button>
              <button 
                className="px-3 py-1.5 bg-yellow-400 text-white rounded text-sm hover:bg-yellow-500 flex items-center"
                onClick={() => setShowFeedbackModal(true)}
              >
                <CheckCircle size={16} className="mr-1" />
                Analyze Sentence
              </button>
            </div>
            
            <button
              className={`w-full py-3 rounded-lg flex items-center justify-center text-white font-medium ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-teal-400 hover:bg-teal-500'}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic size={20} className={`mr-2 ${isRecording ? 'animate-pulse' : ''}`} />
              {isRecording ? 'Stop Recording' : 'Click to Start Speaking'}
            </button>
          </div>
        </div>
        
        {/* Right Panel - Conversation */}
        <div className="w-3/5 bg-white flex flex-col">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center">
            <div className="flex items-center">
              <MessageSquare size={16} className="text-teal-400 mr-2" />
              <h2 className="font-medium text-gray-700">Conversation</h2>
            </div>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 text-gray-500 hover:text-teal-500 hover:bg-gray-100 rounded">
                <Volume2 size={18} />
              </button>
              <button className="p-1.5 text-gray-500 hover:text-teal-500 hover:bg-gray-100 rounded">
                <Info size={18} />
              </button>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="space-y-4">
              {conversationHistory.map((item, index) => (
                <div key={index} className={`flex ${item.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-xs md:max-w-md rounded-lg p-3 ${item.role === 'user' ? 'bg-teal-50' : 'bg-blue-50'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium">
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
                  <div className="bg-red-50 text-red-500 rounded-lg p-3 flex items-center">
                    <div className="w-2 h-2 rounded-full bg-red-500 mr-2 animate-pulse"></div>
                    <span className="text-sm">Recording...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sentence Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="font-bold text-gray-800">Sentence Assessment</h3>
              <button 
                className="text-gray-400 hover:text-gray-600"
                onClick={() => setShowFeedbackModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-1">Your Sentence</h4>
                <p className="p-3 bg-gray-50 rounded text-gray-800">
                  I have no thoughts about this topic, it's really detailed on me. Can you explain a bit?
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-gray-50 p-3 rounded text-center">
                  <div className="text-sm text-gray-500">Grammar</div>
                  <div className="text-xl font-bold text-yellow-500">70</div>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <div className="text-sm text-gray-500">Vocabulary</div>
                  <div className="text-xl font-bold text-yellow-500">65</div>
                </div>
                <div className="bg-gray-50 p-3 rounded text-center">
                  <div className="text-sm text-gray-500">Overall</div>
                  <div className="text-xl font-bold text-yellow-500">64</div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-2">Grammar Issues</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Preposition usage</p>
                        <p className="text-sm text-gray-600">The phrase 'detailed on me' is incorrect.</p>
                        <p className="text-sm text-teal-500 mt-1">Suggestion: Use 'detailed for me' or 'too detailed for me'.</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded">
                    <div className="flex items-start">
                      <div className="flex-shrink-0 mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-500 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-gray-700">Contraction usage</p>
                        <p className="text-sm text-gray-600">The contraction 'it's' is used ambiguously.</p>
                        <p className="text-sm text-teal-500 mt-1">Suggestion: Clarify what 'it' refers to or rephrase.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm text-gray-500 mb-2">Corrected Text</h4>
                <div className="p-3 bg-gray-50 rounded">
                  <p className="text-gray-800">
                    I have no thoughts about this topic; it's really too detailed for me. Can you explain a bit?
                  </p>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm text-gray-500 mb-2">Alternative Expressions</h4>
                <div className="space-y-2">
                  <p className="p-2 bg-gray-50 rounded text-gray-700 text-sm">
                    I find this topic quite intricate and challenging to grasp. Could you elaborate a bit?
                  </p>
                  <p className="p-2 bg-gray-50 rounded text-gray-700 text-sm">
                    This topic seems rather complex to me. Could you provide some clarification?
                  </p>
                  <p className="p-2 bg-gray-50 rounded text-gray-700 text-sm">
                    I am struggling to form an opinion on this topic as it appears quite detailed. Could you explain further?
                  </p>
                </div>
              </div>
              
              <button 
                className="w-full py-3 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors"
                onClick={() => setShowFeedbackModal(false)}
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConversationScreen;
