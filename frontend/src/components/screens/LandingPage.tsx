import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, 
  MessageCircle, 
  BarChart, 
  Headphones, 
  Check, 
  Play, 
  Globe, 
  Users, 
  Timer,
  Award,
  CheckCircle,
  Sparkles,
  Brain
} from 'lucide-react';
import { useAppContext } from '../../contexts/AppContext.jsx';
import AuthModal from '../common/AuthModal.jsx';
import LanguageOptionsModal from '../common/LanguageOptionsModal.tsx';
import { useNavigate } from 'react-router-dom';

/**
 * Redesigned LandingPage component for the Language Learning App
 * Features a more immersive, interactive design with clearer user journeys
 */
const LandingPage: React.FC = () => {
  const { state, setLanguage } = useAppContext();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [activeLanguage, setActiveLanguage] = useState('English');
  const [activeFeatureTab, setActiveFeatureTab] = useState<string | null>(null);
  const [hoverFeature, setHoverFeature] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const featuresRef = useRef<HTMLDivElement>(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [selectedLang, setSelectedLang] = useState('');
  
  // Track scroll position for animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Languages data
  const languages = [
    { name: 'English', flag: '🇬🇧', level: 'C1', users: '15M+' },
    { name: 'Spanish', flag: '🇪🇸', level: 'B2', users: '10M+' },
    { name: 'French', flag: '🇫🇷', level: 'B1', users: '8M+' },
    { name: 'German', flag: '🇩🇪', level: 'A2', users: '6M+' },
    { name: 'Dutch', flag: '🇳🇱', level: 'A1', users: '4M+' },
    { name: 'Portuguese', flag: '🇵🇹', level: 'B1', users: '5M+' }
  ];

  // Demo conversation data
  const demoConversation = [
    { role: 'assistant', message: "Hi there! I'd love to help you practice your English today. Let's talk about your hobbies. What do you enjoy doing in your free time?" },
    { role: 'user', message: "I enjoy playing tennis and reading books about history.", feedback: { pronunciation: 90, grammar: 85, vocabulary: 80 } },
    { role: 'assistant', message: "That's great! Tennis is excellent for fitness. What period of history interests you the most?" }
  ];
  
  // Handle scroll to features section
  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Handle opening auth modal
  const openAuthModal = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  // Handle starting with a specific language
  const handleStartWithLanguage = (language: string) => {
    setLanguage(language);
    openAuthModal('signup');
  };

  // Handle language selection
  const handleLanguageSelect = (language: string) => {
    setLanguage(language);
    setSelectedLang(language);
    setShowOptionsModal(true);
  };

  // Handle option selection from modal
const handleOptionSelection = (option: string) => {
  if (option === 'assessment') {
    navigate('/speaking-assessment');
  } else if (option === 'practice') {
    navigate('/topic-selection');
  }
};

  // Features array
  const features = [
    {
      title: "Real-time AI Conversations",
      description: "Practice speaking naturally with our AI language tutor that adapts to your level and provides instant feedback.",
      icon: <MessageCircle />,
      color: "bg-teal-400",
      gradient: "from-teal-400 to-teal-500",
      id: "conversation"
    },
    {
      title: "Advanced Speech Analysis",
      description: "Get detailed feedback on your pronunciation, grammar, and vocabulary as you speak.",
      icon: <Mic />,
      color: "bg-yellow-400",
      gradient: "from-yellow-400 to-yellow-500",
      id: "feedback"
    },
    {
      title: "Personalized Learning Plans",
      description: "Follow a customized roadmap based on your goals, schedule, and learning pace.",
      icon: <BarChart />,
      color: "bg-orange-400",
      gradient: "from-orange-400 to-orange-500",
      id: "learning"
    },
    {
      title: "Immersive Listening Practice",
      description: "Improve your comprehension with authentic content tailored to your interests.",
      icon: <Headphones />,
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      id: "listening"
    }
  ];

  // Plan comparison data
  const plans = [
    {
      name: "Free",
      price: "$0",
      features: [
        "5-minute daily conversation practice",
        "Basic pronunciation feedback",
        "Limited topic selection",
        "1 assessment per month"
      ],
      cta: "Try Now",
      highlight: false
    },
    {
      name: "Premium",
      price: "$14.99",
      period: "monthly",
      features: [
        "Unlimited conversation practice",
        "Advanced pronunciation & grammar analysis",
        "All topics and custom topics",
        "Unlimited assessments",
        "Personalized learning plan",
        "Progress tracking"
      ],
      cta: "Start Free Trial",
      highlight: true
    },
    {
      name: "Pro",
      price: "$119.99",
      period: "yearly",
      features: [
        "All Premium features",
        "Human tutor sessions (2/month)",
        "Offline mode",
        "Priority support",
        "Advanced analytics",
        "Certificate of completion"
      ],
      cta: "Get Pro",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Floating Navbar - Becomes solid on scroll */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <Globe className={`h-8 w-8 ${isScrolled ? 'text-teal-400' : 'text-white'}`} />
              <span className={`ml-2 font-bold text-lg ${isScrolled ? 'text-gray-800' : 'text-white'}`}>
                TaCo <span className="text-teal-400">- Your AI TaalCoach</span>
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6">
              <a 
                href="#features" 
                className={`text-sm font-normal hover:text-teal-400 transition-colors ${isScrolled ? 'text-gray-600' : 'text-white'}`}
                >
                Features
              </a>
              <a 
                href="#languages" 
                className={`text-sm font-medium hover:text-teal-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Languages
              </a>
              <a 
                href="#pricing" 
                className={`text-sm font-medium hover:text-teal-400 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              >
                Pricing
              </a>
            </div>
            
            <div className="flex items-center">
              <button 
  className={`text-sm font-medium border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50 transition-colors ${isScrolled ? 'text-gray-700' : 'text-white border-white hover:bg-white hover:bg-opacity-10'}`}
  onClick={() => openAuthModal('login')}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section with Video Background and Animated Text */}
      <section className="pt-32 pb-20 px-4 md:px-0 relative overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800">
        {/* Abstract Language Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[10%] left-[5%] text-white text-opacity-10 text-9xl font-bold">A1</div>
          <div className="absolute top-[30%] left-[25%] text-white text-opacity-10 text-9xl font-bold">B2</div>
          <div className="absolute top-[60%] left-[15%] text-white text-opacity-10 text-9xl font-bold">C1</div>
          <div className="absolute top-[20%] right-[5%] text-white text-opacity-10 text-9xl font-bold">Hola</div>
          <div className="absolute top-[50%] right-[15%] text-white text-opacity-10 text-9xl font-bold">你好</div>
          <div className="absolute top-[70%] right-[25%] text-white text-opacity-10 text-9xl font-bold">Ciao</div>
        </div>
        
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center relative z-10">
          <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight mb-6">
              <span className="block">Master Languages</span>
              <span className="block mt-2">Through <span className="text-teal-400 relative">
                Real Conversation
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 5" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0,2.5 Q25,0 50,2.5 T100,2.5" stroke="#6DE1D2" strokeWidth="2" fill="none" />
                </svg>
              </span></span>
            </h1>
            
            <p className="text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0">
              Practice speaking naturally with our AI language tutor that adapts to your level and provides real-time feedback.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button 
                className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium text-lg flex items-center justify-center"
              >
                Do Practice
                <Sparkles size={16} className="ml-2" />
              </button>
              
              <button 
                className="bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg flex items-center justify-center"
              >
                Try Speech Analysis
                <Brain size={16} className="ml-2" />
              </button>
          </div>
          </div>
          
          <div className="md:w-1/2 relative">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden border-8 border-gray-100 max-w-md mx-auto">
              {/* Simulated App Interface */}
              <div className="p-4 bg-teal-400 text-white">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-400">
                      <Globe size={18} />
                    </div>
                    <span className="ml-2 font-medium">English Practice</span>
                  </div>
                  <div className="text-xs bg-white bg-opacity-30 px-2 py-1 rounded-full">
                    Level B1
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center text-teal-500 mr-3">
                    AI
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 rounded-tl-none max-w-xs">
                    <p className="text-gray-800">Let's practice talking about your hobbies. What do you enjoy doing in your free time?</p>
                  </div>
                </div>
                
                <div className="flex items-start justify-end mb-4">
                  <div className="bg-teal-50 rounded-lg p-3 rounded-tr-none max-w-xs">
                    <p className="text-gray-800">I enjoy playing tennis and swimming. I also like to read books.</p>
                  </div>
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white ml-3">
                    U
                  </div>
                </div>
                
                <div className="bg-teal-50 border border-teal-100 rounded-lg p-3 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-sm font-medium text-teal-700">Pronunciation</div>
                    <div className="text-sm font-medium text-teal-700">92%</div>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="bg-teal-400 h-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Try speaking..." 
                    className="w-full p-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                    readOnly
                  />
                  <button 
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-white hover:bg-teal-500 transition-colors"
                  >
                    <Mic size={16} />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating assessment card */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100 hidden md:block">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-500 mr-3">
                  <Award size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Level Assessment</div>
                  <div className="text-xs text-gray-500">English • B1 Intermediate</div>
                </div>
              </div>
            </div>
            
            {/* Floating feedback card */}
            <div className="absolute -top-6 -right-6 bg-white rounded-lg shadow-lg p-4 border border-gray-100 hidden md:block">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 mr-3">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-800">Grammar Check</div>
                  <div className="text-xs text-gray-500">95% accurate • Good job!</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating achievement cards */}
        <div className="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-gray-900 to-transparent"></div>
      </section>
      
      {/* Trusted By Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <p className="text-center text-gray-500 text-sm mb-8">TRUSTED BY LEARNERS FROM</p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {['Harvard', 'MIT', 'Stanford', 'Google', 'Microsoft', 'IBM'].map((org, index) => (
              <div 
                key={index} 
                className="flex items-center justify-center grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all"
              >
                <div className="text-xl font-bold text-gray-400">{org}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section with Interactive Hover */}
      <section id="features" ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">How Our Platform Works</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the most advanced AI-powered language learning approach
            </p>
          </div>

          {/* Features Content */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side - Feature Selection */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl transition-all duration-300 cursor-pointer ${
                    hoverFeature === index || activeFeatureTab === feature.id 
                      ? `bg-gradient-to-r ${feature.gradient} text-white shadow-lg` 
                      : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onMouseEnter={() => setHoverFeature(index)}
                  onMouseLeave={() => setHoverFeature(null)}
                  onClick={() => setActiveFeatureTab(feature.id === activeFeatureTab ? null : feature.id)}
                >
                  <div className="flex items-start">
                    <div className={`w-12 h-12 rounded-full ${
                      hoverFeature === index || activeFeatureTab === feature.id 
                        ? 'bg-white bg-opacity-20 text-white' 
                        : feature.color + ' text-white'
                      } flex items-center justify-center mr-4`}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <h3 className={`font-bold text-xl ${
                        hoverFeature === index || activeFeatureTab === feature.id 
                          ? 'text-white' 
                          : 'text-gray-800'
                        } mb-2`}
                      >
                        {feature.title}
                      </h3>
                      <p className={`${
                        hoverFeature === index || activeFeatureTab === feature.id 
                          ? 'text-white text-opacity-90' 
                          : 'text-gray-600'
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Right side - Feature Details */}
            <div className="relative">
              {/* AI Assessment Panel (Default) */}
              {(!activeFeatureTab || activeFeatureTab === 'learning') && (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-4 bg-teal-400 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-400">
                          <Mic size={18} />
                        </div>
                        <span className="ml-2 font-medium">Speaking Assessment</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-6">
                      <div className="text-lg font-medium text-gray-800 mb-2">Your Speaking Results</div>
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <Timer size={16} className="mr-1" />
                        <span>5:30 minutes of speaking analyzed</span>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium text-gray-700">Pronunciation</div>
                            <div className="text-sm font-medium text-teal-500">85%</div>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-teal-400 h-full" style={{ width: '85%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium text-gray-700">Grammar</div>
                            <div className="text-sm font-medium text-teal-500">92%</div>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-teal-400 h-full" style={{ width: '92%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium text-gray-700">Vocabulary</div>
                            <div className="text-sm font-medium text-yellow-500">78%</div>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full" style={{ width: '78%' }}></div>
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-1">
                            <div className="text-sm font-medium text-gray-700">Fluency</div>
                            <div className="text-sm font-medium text-yellow-500">75%</div>
                          </div>
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div className="bg-yellow-400 h-full" style={{ width: '75%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                      <div className="text-sm font-medium text-gray-700 mb-2">Recommended Level</div>
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-lg mr-3">
                          B1
                        </div>
                        <div>
                          <div className="font-medium text-gray-800">Intermediate</div>
                          <div className="text-xs text-gray-500">Can discuss familiar topics with confidence</div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex">
                      <button 
                        className="w-full bg-teal-400 text-white py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium"
                        onClick={() => openAuthModal('signup')}
                      >
                        Start Your Assessment
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* AI Conversation Demo */}
              {activeFeatureTab === 'conversation' && (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-4 bg-teal-400 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-teal-400">
                          <MessageCircle size={18} />
                        </div>
                        <span className="ml-2 font-medium">AI Conversation</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4">
                      {demoConversation.map((message, index) => (
                        <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-md rounded-xl p-4 ${message.role === 'user' ? 'bg-teal-50 border-l-4 border-teal-400' : 'bg-gray-50 border-l-4 border-yellow-400'}`}>
                            <div className="flex justify-between mb-2">
                              <span className={`text-sm font-medium ${message.role === 'user' ? 'text-teal-600' : 'text-yellow-600'}`}>
                                {message.role === 'user' ? 'You' : 'AI Tutor'}
                              </span>
                            </div>
                            <p className="text-gray-800">{message.message}</p>
                            
                            {message.feedback && (
                              <div className="mt-3 pt-3 border-t border-gray-200 grid grid-cols-3 gap-2">
                                <div>
                                  <div className="text-xs text-gray-500">Pronunciation</div>
                                  <div className="text-sm font-medium text-teal-500">{message.feedback.pronunciation}%</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Grammar</div>
                                  <div className="text-sm font-medium text-teal-500">{message.feedback.grammar}%</div>
                                </div>
                                <div>
                                  <div className="text-xs text-gray-500">Vocabulary</div>
                                  <div className="text-sm font-medium text-teal-500">{message.feedback.vocabulary}%</div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      <div className="relative">
                        <input 
                          type="text" 
                          placeholder="Try speaking or type here..." 
                          className="w-full p-4 pr-12 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-400 focus:border-transparent"
                          disabled
                        />
                        <button 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-white hover:bg-teal-500 transition-colors"
                          onClick={() => openAuthModal('signup')}
                        >
                          <Mic size={18} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-6 flex justify-center">
                      <button 
                        className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium"
                        onClick={() => openAuthModal('signup')}
                      >
                        Start Immersive Practice Now
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Feedback Analysis Demo */}
              {activeFeatureTab === 'feedback' && (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-4 bg-yellow-400 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-yellow-400">
                          <Mic size={18} />
                        </div>
                        <span className="ml-2 font-medium">Detailed Feedback</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Your sentence:</div>
                      <p className="p-3 bg-white rounded-lg border border-gray-200 text-gray-800">
                        I have been studying English for three years and I want to improve my speaking skills.
                      </p>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      <div className="bg-white p-3 rounded-lg text-center border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Grammar</div>
                        <div className="text-lg font-bold text-teal-500">95%</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Vocabulary</div>
                        <div className="text-lg font-bold text-teal-500">88%</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Fluency</div>
                        <div className="text-lg font-bold text-yellow-500">75%</div>
                      </div>
                      <div className="bg-white p-3 rounded-lg text-center border border-gray-200">
                        <div className="text-xs text-gray-500 mb-1">Overall</div>
                        <div className="text-lg font-bold text-teal-500">86%</div>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <div className="text-sm font-medium text-gray-700 mb-2">Areas to improve:</div>
                      <div className="space-y-2">
                        <div className="flex items-start">
                          <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                            <Check size={12} />
                          </span>
                          <p className="text-sm text-gray-700">
                            Try to use more varied vocabulary for "improve" - consider "enhance", "develop", or "refine".
                          </p>
                        </div>
                        <div className="flex items-start">
                          <span className="w-5 h-5 rounded-full bg-yellow-100 text-yellow-500 flex items-center justify-center mr-2 flex-shrink-0 mt-0.5">
                            <Check size={12} />
                          </span>
                          <p className="text-sm text-gray-700">
                            Work on sentence rhythm and pacing for more natural fluency.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-medium text-gray-700 mb-2">Suggested improvement:</div>
                      <p className="p-3 bg-teal-50 rounded-lg border border-teal-100 text-gray-800">
                        I have been studying English for three years and I'm eager to enhance my conversational fluency.
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <button 
                        className="bg-yellow-400 text-white px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors font-medium"
                        onClick={() => openAuthModal('signup')}
                      >
                        Get Personalized AI Analysis
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Listening Practice Demo */}
              {activeFeatureTab === 'listening' && (
                <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="p-4 bg-red-500 text-white">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-red-500">
                          <Headphones size={18} />
                        </div>
                        <span className="ml-2 font-medium">Immersive Listening</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex flex-col items-center justify-center mb-6">
                      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4">
                        <Play size={28} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-800 mb-1">Listen & Learn</h3>
                      <p className="text-center text-gray-600 mb-2">Authentic content tailored to your interests and level</p>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
                        <div className="bg-red-400 h-full w-1/3"></div>
                      </div>
                      <p className="text-xs text-gray-500">1:05 / 3:24</p>
                    </div>
                    
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Conversation Transcript</h4>
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-800 mb-3">
                          <span className="font-medium text-red-500">Speaker 1:</span> What do you think about climate change?
                        </p>
                        <p className="text-gray-800">
                          <span className="font-medium text-blue-500">Speaker 2:</span> It's a serious issue that requires immediate attention. Scientists agree that human activities are...
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button 
                        className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium"
                        onClick={() => openAuthModal('signup')}
                      >
                        Explore Listening Materials
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-yellow-400 opacity-20 rounded-full hidden md:block"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-teal-400 opacity-20 rounded-full hidden md:block"></div>
            </div>
          </div>
        </div>
      </section>
    
      
      {/* Languages Section */}
      <section id="languages" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Choose Your Language</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Start learning one of our 6 supported languages with comprehensive lesson plans
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {languages.map((language, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-xl border-2 transition-all cursor-pointer ${
                  activeLanguage === language.name 
                    ? 'border-teal-400 shadow-md' 
                    : 'border-gray-100 hover:border-teal-200 hover:shadow-sm'
                }`}
                onClick={() => handleLanguageSelect(language.name)}
                              >
                <div className="p-6 text-center">
                  <div className="text-5xl mb-4">{language.flag}</div>
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{language.name}</h3>
                  <div className="flex items-center justify-center mb-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full text-blue-600 text-xs font-bold flex items-center justify-center mr-1">
                      {language.level}
                    </div>
                    <span className="text-sm text-gray-500">All levels</span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center justify-center">
                    <Users size={12} className="mr-1" />
                    <span>{language.users} learners</span>
                  </div>
                </div>
                
                <div className="p-3 bg-gray-50 text-center border-t border-gray-100">
                  <button 
                    className="text-teal-500 text-sm font-medium hover:text-teal-600"
                    onClick={() => handleStartWithLanguage(language.name)}
                  >
                    Start Learning
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Choose Your Plan</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Flexible options to fit your learning goals and budget
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div 
                key={index} 
                className={`rounded-xl overflow-hidden ${
                  plan.highlight 
                    ? 'bg-gradient-to-br from-teal-400 to-teal-600 transform md:-translate-y-4 shadow-xl' 
                    : 'bg-white bg-opacity-10 backdrop-blur-sm'
                }`}
              >
                <div className="p-8">
                  <h3 className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-white'} mb-2`}>
                    {plan.name}
                  </h3>
                  <div className="flex items-baseline mb-6">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && (
                      <span className="text-sm ml-2 opacity-80">/{plan.period}</span>
                    )}
                  </div>
                  
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check size={18} className={`mr-2 flex-shrink-0 ${plan.highlight ? 'text-white' : 'text-teal-400'}`} />
                        <span className={`${plan.highlight ? 'text-white' : 'text-gray-300'}`}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button 
                    className={`w-full py-3 rounded-lg font-medium transition-colors ${
                      plan.highlight 
                        ? 'bg-white text-teal-500 hover:bg-gray-100' 
                        : 'bg-teal-400 text-white hover:bg-teal-500'
                    }`}
                    onClick={() => openAuthModal('signup')}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-teal-50">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to become fluent?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of learners who are improving their language skills every day with our AI-powered conversation platform.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              className="bg-teal-400 text-white px-8 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium inline-flex items-center justify-center"
              onClick={() => openAuthModal('signup')}
            >
              Experience the Magic Now
              <Sparkles size={20} className="ml-2" />
            </button>
            <button 
              onClick={() => {
                setActiveFeatureTab('conversation');
                scrollToFeatures();
              }}
              className="bg-transparent text-gray-800 px-8 py-3 rounded-lg hover:bg-white transition-colors font-medium inline-flex items-center justify-center border border-gray-300"
            >
              See AI Language Coach in Action
              <Brain size={20} className="ml-2" />
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <Globe className="h-6 w-6 text-teal-400" />
                <span className="ml-2 font-bold text-lg">
                  TaCo <span className="text-teal-400">- Your AI TaalCoach</span>
                </span>
              </div>
              <p className="text-gray-400 text-sm">
                AI-powered language learning platform for immersive conversation practice
              </p>
              <div className="mt-4 flex space-x-4">
                {['twitter', 'facebook', 'instagram', 'linkedin'].map(social => (
                  <a key={social} href="#" className="text-gray-400 hover:text-teal-400">
                    <span className="sr-only">{social}</span>
                    <div className="w-6 h-6"></div>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                {['Features', 'Pricing', 'Languages', 'Mobile App', 'API', 'Business'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                {['Blog', 'Help Center', 'Guides', 'Learning Tips', 'Language Resources', 'Webinars'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service', 'Contact Us'].map(item => (
                  <li key={item}>
                    <a href="#" className="text-gray-400 hover:text-teal-400 text-sm">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 mb-4 md:mb-0">
              © {new Date().getFullYear()} Smart Language Coach. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-sm text-gray-500 hover:text-teal-400">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-teal-400">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-teal-400">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
      
    {/* Language Options Modal */}
    <LanguageOptionsModal 
      isOpen={showOptionsModal}
      onClose={() => setShowOptionsModal(false)}
      selectedLanguage={selectedLang}
      onContinue={handleOptionSelection}
    />
    </div>
  );
};

export default LandingPage;