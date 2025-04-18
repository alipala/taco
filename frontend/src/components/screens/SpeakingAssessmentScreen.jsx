import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mic, StopCircle, ArrowRight, HelpCircle, ChevronLeft } from 'lucide-react';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * SpeakingAssessmentScreen component
 * Allows users to take a speaking assessment to determine their proficiency level
 */
const SpeakingAssessmentScreen = () => {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [waveform, setWaveform] = useState(Array.from({ length: 40 }, () => Math.random() * 0.5 + 0.2));
  const [showWave, setShowWave] = useState(false);
  
  // Handle recording state and animations
  useEffect(() => {
    if (isRecording) {
      // First show the transition animation
      setTimeout(() => {
        setShowWave(true);
      }, 300);
      
      // Update waveform and timer
      const interval = setInterval(() => {
        setWaveform(prev => {
          return prev.map(value => {
            // Create a natural-looking speech pattern
            const change = (Math.random() - 0.5) * 0.3;
            const newValue = Math.max(0.1, Math.min(1, value + change));
            return newValue;
          });
        });
        
        // Update the timer
        setSeconds(s => s + 0.1);
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      // Transition out
      setShowWave(false);
      
      // Reset timer only when explicitly stopping (not on initial load)
      if (seconds > 0) {
        setTimeout(() => {
          setSeconds(0);
        }, 500);
      }
    }
  }, [isRecording]);
  
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };
  
  // Calculate progress percentage and status
  const progressPercent = Math.min(100, (seconds / 60) * 100);
  const getProgressStatus = () => {
    if (seconds < 30) return { color: 'yellow', text: `Minimum ${Math.ceil(30 - seconds)} more seconds needed` };
    if (seconds < 50) return { color: 'teal', text: `Good progress, continue speaking` };
    return { color: 'blue', text: `Finishing up, ${Math.ceil(60 - seconds)} seconds remaining` };
  };
  
  const progressStatus = getProgressStatus();
  
  // Sound wave component
  const SoundWave = () => (
    <div className="flex items-center justify-center gap-1 h-20 w-full">
      {waveform.map((height, index) => {
        // Create a gradient from blue to purple to pink
        const hue = 210 + (index % 5) * 30; // Range from blue (210) to pink (330)
        
        return (
          <div 
            key={index} 
            className="rounded-full w-2 transition-all duration-150 ease-in-out"
            style={{ 
              height: `${height * 80}px`,
              backgroundColor: `hsl(${hue}, 85%, 65%)`,
              opacity: 0.8,
              transform: `scaleY(${height})`,
              transformOrigin: 'center'
            }}
          />
        );
      })}
    </div>
  );

  // Handle assessment completion
  const handleAssessmentComplete = () => {
    // In a real app, this would send the recording to the backend for analysis
    // For now, we'll just navigate to the proficiency level screen
    navigate('/proficiency-level');
  };

  // Handle going back to proficiency level screen
  const handleBackToSelection = () => {
    navigate('/proficiency-level');
  };
  
  return (
    <MainLayout>
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-6">
          <button 
            onClick={handleBackToSelection}
            className="flex items-center text-gray-600 hover:text-teal-500 transition-colors"
          >
            <ChevronLeft size={20} className="mr-1" />
            Back to Level Selection
          </button>
        </div>
        
        {/* Title Section */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Speaking Assessment</h1>
          <p className="text-gray-600">Assess your speaking proficiency in English</p>
        </div>
        
        {/* Assessment Card */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden max-w-2xl mx-auto">
          {/* Card Header */}
          <div className="bg-teal-400 p-5 text-white">
            <h2 className="text-xl font-semibold text-center">Speaking Assessment</h2>
            <p className="text-center text-teal-50 text-sm mt-1">
              Speak for 30-60 seconds to assess your English proficiency level
            </p>
          </div>
          
          {/* Card Content */}
          <div className="p-8 flex flex-col items-center">
            {/* Modern Timer Display */}
            <div className="mb-8 flex flex-col items-center">
              <div className="relative">
                <div className="w-24 h-24 rounded-full border-4 border-gray-100 flex items-center justify-center">
                  <div className="text-2xl font-mono font-bold text-gray-800">
                    {formatTime(seconds)}
                  </div>
                  {/* Circular Progress */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="46" 
                      fill="none" 
                      stroke="#f0f0f0" 
                      strokeWidth="8"
                    />
                    <circle 
                      cx="50" 
                      cy="50" 
                      r="46" 
                      fill="none" 
                      stroke={progressStatus.color === 'yellow' ? '#FBBF24' : 
                             progressStatus.color === 'teal' ? '#2DD4BF' : '#3B82F6'} 
                      strokeWidth="8"
                      strokeDasharray="289.02"
                      strokeDashoffset={289.02 - (289.02 * progressPercent / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-300 ease-in-out"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {progressStatus.text}
              </div>
            </div>
            
            {/* Recording Button or Sound Wave - with smooth transition */}
            <div className="h-28 flex items-center justify-center mb-6 relative">
              {isRecording ? (
                <div className={`transition-all duration-500 ease-out ${showWave ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
                  <SoundWave />
                </div>
              ) : (
                <button
                  className="w-20 h-20 rounded-full flex items-center justify-center transition-all bg-teal-400 hover:bg-teal-500 shadow-lg"
                  onClick={() => setIsRecording(true)}
                >
                  <Mic size={36} className="text-white" />
                </button>
              )}
            </div>
            
            {/* Instructions */}
            <div className="text-center">
              <p className="text-gray-700 mb-2">
                {isRecording ? 'Speaking...' : 'Click the microphone to start'}
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Speak clearly about any topic that interests you
              </p>
            </div>
            
            {/* Modern Progress Bar */}
            <div className="w-full mb-6">
              <div className="relative pt-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                      bg-gray-50 text-gray-500">
                      Progress
                    </span>
                  </div>
                  <div>
                    <span className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full 
                      ${progressStatus.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 
                        progressStatus.color === 'teal' ? 'bg-teal-100 text-teal-600' : 
                        'bg-blue-100 text-blue-600'}`}>
                      {Math.round(progressPercent)}%
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-1 text-xs flex rounded-full bg-gray-100">
                  <div 
                    className={`transition-all duration-300 ease-out shadow-inner flex flex-col justify-center rounded-full 
                      ${progressStatus.color === 'yellow' ? 'bg-yellow-400' : 
                        progressStatus.color === 'teal' ? 'bg-teal-400' : 
                        'bg-blue-500'}`}
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex justify-center gap-4">
              {isRecording ? (
                <button 
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors flex items-center"
                  onClick={() => {
                    setIsRecording(false);
                    if (seconds >= 30) {
                      // If they've spoken for at least 30 seconds, show completion option
                      setTimeout(() => {
                        handleAssessmentComplete();
                      }, 1000);
                    }
                  }}
                >
                  <StopCircle size={18} className="mr-2" />
                  Stop Recording
                </button>
              ) : (
                seconds > 0 && (
                  <button 
                    className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors flex items-center"
                    onClick={handleAssessmentComplete}
                  >
                    Continue
                    <ArrowRight size={18} className="ml-2" />
                  </button>
                )
              )}
            </div>
          </div>
        </div>
        
        {/* Manual Selection Option */}
        <div className="text-center mt-8">
          <p className="text-gray-500 mb-4">Prefer to select your level manually?</p>
          <button 
            className="bg-white border border-gray-300 text-gray-700 px-5 py-2.5 rounded-lg hover:bg-gray-50 transition-colors flex items-center mx-auto"
            onClick={handleBackToSelection}
          >
            Go to Manual Level Selection
            <ArrowRight size={16} className="ml-2" />
          </button>
        </div>
        
        {/* Help Tooltip */}
        <div className="fixed bottom-6 right-6">
          <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 w-12 h-12 rounded-full flex items-center justify-center shadow-sm transition-colors">
            <HelpCircle size={24} />
          </button>
        </div>
      </div>
    </MainLayout>
  );
};

export default SpeakingAssessmentScreen;
