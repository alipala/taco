import React, { useState } from 'react';
import { 
  Calendar, BarChart2, Clock, Target, ChevronDown, Edit2, 
  Layout, Users, Settings, LogOut, ChevronRight 
} from 'lucide-react';

/**
 * UserProfileDashboard component
 * Displays the user's profile, learning progress, and settings
 */
const UserProfileDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock assessment data
  const assessmentData = {
    date: 'Apr 17, 2025',
    level: 'C1',
    confidence: 90,
    overallScore: 85,
    skills: {
      pronunciation: 80,
      grammar: 85,
      vocabulary: 90,
      fluency: 85,
      coherence: 90
    },
    strengths: [
      'Strong vocabulary range and usage',
      'Complex grammatical structures',
      'Clear organization and coherence of ideas'
    ],
    improvements: [
      'Minor grammatical errors such as tense usage',
      'Pronunciation of \'th\' sounds and word stress'
    ],
    recommendations: [
      'Practice pronunciation of \'th\' sounds and focus on word stress in complex words',
      'Review and practice correct tense usage in complex sentences',
      'Engage in advanced listening and speaking exercises to maintain and enhance fluency'
    ]
  };
  
  // Mock learning plans data
  const learningPlans = [
    {
      language: 'English',
      level: 'B1',
      created: 'Apr 5, 2025',
      duration: '3 months',
      goals: ['Travel', 'Reading'],
      progress: 35
    },
    {
      language: 'English',
      level: 'B1',
      created: 'Apr 5, 2025',
      duration: '12 months',
      goals: ['Travel', 'Reading', 'Business', 'Academic', 'Culture', 'Daily', 'Writing', 'Speaking', 'Listening', 'Vocabulary'],
      progress: 22
    },
    {
      language: 'English',
      level: 'B2',
      created: 'Apr 13, 2025',
      duration: '6 months',
      goals: ['Travel', 'Reading'],
      progress: 10
    }
  ];
  
  // Mock recent activity data
  const recentActivity = [
    { type: 'Practice', topic: 'Technology', date: 'Today, 10:30 AM', duration: '15 min', score: 82 },
    { type: 'Assessment', topic: 'Speaking', date: 'Yesterday, 3:15 PM', duration: '10 min', score: 85 },
    { type: 'Practice', topic: 'Food & Cooking', date: 'Apr 15, 2025', duration: '20 min', score: 78 },
    { type: 'Practice', topic: 'Travel', date: 'Apr 14, 2025', duration: '12 min', score: 80 },
    { type: 'Assessment', topic: 'Speaking', date: 'Apr 10, 2025', duration: '8 min', score: 75 }
  ];
  
  // Helper functions for color coding
  const getColorForScore = (score) => {
    if (score >= 85) return 'text-teal-500';
    if (score >= 70) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  const getBarColorForScore = (score) => {
    if (score >= 85) return 'bg-teal-500';
    if (score >= 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold">Your Smart <span className="text-teal-400">Language Coach</span></h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-teal-500">Practice</button>
              <div className="relative">
                <button className="flex items-center text-gray-700">
                  <div className="h-8 w-8 rounded-full bg-teal-400 flex items-center justify-center text-white">
                    U
                  </div>
                  <span className="ml-2 font-medium">Test User</span>
                  <ChevronDown size={16} className="ml-1 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="h-16 w-16 rounded-full bg-teal-400 flex items-center justify-center text-white text-xl font-bold">
                  TU
                </div>
                <div className="ml-4">
                  <h2 className="text-2xl font-bold text-gray-800">Test User</h2>
                  <p className="text-gray-500">test@example.com</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center">
                  <Edit2 size={16} className="mr-2" />
                  Edit Profile
                </button>
                <button className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                  Start Learning
                </button>
              </div>
            </div>
            
            <div className="mt-6 flex justify-between">
              <div className="flex space-x-8">
                <div>
                  <div className="text-sm text-gray-500">Active Language</div>
                  <div className="mt-1 font-medium text-gray-800">English (C1)</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Joined</div>
                  <div className="mt-1 font-medium text-gray-800">April 5, 2025</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Total Practice Time</div>
                  <div className="mt-1 font-medium text-gray-800">12h 45m</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Sessions Completed</div>
                  <div className="mt-1 font-medium text-gray-800">27</div>
                </div>
              </div>
              <div>
                <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                  Individual Plan
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-100 mb-6">
            <div className="border-b border-gray-100">
              <nav className="flex -mb-px">
                <button 
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${activeTab === 'overview' ? 'border-teal-400 text-teal-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button 
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${activeTab === 'plans' ? 'border-teal-400 text-teal-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('plans')}
                >
                  Learning Plans
                </button>
                <button 
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${activeTab === 'activity' ? 'border-teal-400 text-teal-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('activity')}
                >
                  Activity
                </button>
                <button 
                  className={`px-6 py-3 border-b-2 font-medium text-sm ${activeTab === 'settings' ? 'border-teal-400 text-teal-500' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                  onClick={() => setActiveTab('settings')}
                >
                  Settings
                </button>
              </nav>
            </div>
          </div>
          
          {/* Overview Tab Content */}
          {/* Learning Plans Tab Content */}
          {activeTab === 'plans' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Your Learning Plans</h3>
                <button className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                  Create New Plan
                </button>
              </div>
              
              <div className="space-y-6">
                {learningPlans.map((plan, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-medium mr-2">
                          {plan.level}
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-800">{plan.language} - {plan.level}</h4>
                          <p className="text-sm text-gray-500">Created: {plan.created}</p>
                        </div>
                      </div>
                      <div className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-xs font-medium">
                        {plan.duration}
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <div className="text-sm text-gray-500 mb-1">Learning Goals</div>
                        <div className="flex flex-wrap gap-2">
                          {plan.goals.map((goal, i) => (
                            <span key={i} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {goal}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-1">
                          <span className="text-gray-500">Progress</span>
                          <span className="font-medium text-gray-700">{plan.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div 
                            className="bg-teal-400 h-full" 
                            style={{ width: `${plan.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                          Continue Learning
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column */}
              <div className="col-span-2">
                {/* Assessment Results */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Latest Assessment Results</h3>
                    <span className="text-sm text-gray-500">{assessmentData.date}</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="bg-purple-100 text-purple-800 w-10 h-10 rounded-full flex items-center justify-center font-bold mr-3">
                        {assessmentData.level}
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Recommended Level</div>
                        <div className="font-medium text-gray-800">
                          {assessmentData.level === 'A1' ? 'Beginner' :
                           assessmentData.level === 'A2' ? 'Elementary' :
                           assessmentData.level === 'B1' ? 'Intermediate' :
                           assessmentData.level === 'B2' ? 'Upper Intermediate' :
                           assessmentData.level === 'C1' ? 'Advanced' : 'Proficient'}
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Overall Score</div>
                      <div className="text-xl font-bold text-teal-500">{assessmentData.overallScore}/100</div>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-700 mb-2">Skill Breakdown</div>
                    <div className="grid grid-cols-5 gap-4">
                      {Object.entries(assessmentData.skills).map(([skill, score]) => (
                        <div key={skill} className="flex flex-col">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-500 capitalize">{skill}</span>
                            <span className={`text-xs font-medium ${getColorForScore(score)}`}>{score}</span>
                          </div>
                          <div className="relative h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`absolute top-0 left-0 h-full ${getBarColorForScore(score)}`} 
                              style={{ width: `${score}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <a href="#" className="text-sm text-teal-500 hover:text-teal-600 font-medium flex items-center">
                    View Full Assessment Report
                    <ChevronRight size={16} className="ml-1" />
                  </a>
                </div>
                
                {/* Recent Activity */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Recent Activity</h3>
                    <a href="#" className="text-sm text-teal-500 hover:text-teal-600 font-medium">View All</a>
                  </div>
                  
                  <div className="space-y-4">
                    {recentActivity.slice(0, 3).map((activity, index) => (
                      <div key={index} className="flex items-center border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${activity.type === 'Practice' ? 'bg-teal-100 text-teal-500' : 'bg-blue-100 text-blue-500'} mr-3`}>
                          {activity.type === 'Practice' ? 'P' : 'A'}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">{activity.type}: {activity.topic}</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <span>{activity.date}</span>
                            <span className="mx-2">•</span>
                            <span className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              {activity.duration}
                            </span>
                          </div>
                        </div>
                        <div className={`font-medium ${getColorForScore(activity.score)}`}>{activity.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Column */}
              <div>
                {/* Active Learning Plan */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Active Learning Plan</h3>
                    <button className="text-sm text-gray-500 hover:text-gray-600">
                      <ChevronDown size={16} />
                    </button>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <div className="bg-blue-100 text-blue-800 w-8 h-8 rounded-full flex items-center justify-center font-medium mr-2">
                          B1
                        </div>
                        <span className="font-medium text-gray-800">English - Intermediate</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <span>Created: Apr 5, 2025</span>
                      <span>Duration: 3 months</span>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Progress</div>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2 overflow-hidden">
                          <div className="bg-teal-400 h-full" style={{ width: '35%' }}></div>
                        </div>
                        <span className="text-sm font-medium text-gray-700">35%</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-sm font-medium text-gray-700 mb-2">Learning Goals</div>
                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Travel
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        Reading
                      </span>
                    </div>
                  </div>
                  
                  <button className="w-full bg-teal-400 text-white py-2 rounded-lg hover:bg-teal-500 transition-colors flex items-center justify-center">
                    Continue Learning
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                
                {/* Next Recommended Session */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-gray-800">Recommended Session</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-yellow-100 text-yellow-800 flex items-center justify-center mr-3">
                        <Target size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Grammar Practice: Past Tenses</h4>
                        <p className="text-sm text-gray-500">Focused on your improvement areas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-800 flex items-center justify-center mr-3">
                        <Calendar size={20} />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800">Estimated Duration: 15 min</h4>
                        <p className="text-sm text-gray-500">Best time to practice: Today</p>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-500 transition-colors">
                    Start Session
                  </button>
                </div>
                
                {/* Streak Card */}
                <div className="bg-gradient-to-r from-teal-400 to-blue-500 rounded-lg shadow-sm p-6 text-white">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">Learning Streak</h3>
                    <div className="bg-white bg-opacity-20 rounded-full px-2 py-1 text-sm">
                      7 days
                    </div>
                  </div>
                  
                  <p className="mb-4">Keep up your daily learning to maintain your streak!</p>
                  
                  <div className="grid grid-cols-7 gap-2">
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <div key={day} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${day < 7 ? 'bg-white text-teal-500' : 'bg-white bg-opacity-20 text-white'}`}>
                          {day}
                        </div>
                        <span className="text-xs mt-1">{['M', 'T', 'W', 'T', 'F', 'S', 'S'][day - 1]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Activity Tab Content */}
          {activeTab === 'activity' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-gray-800">Activity History</h3>
                <div className="flex items-center space-x-2">
                  <select className="border border-gray-300 rounded-md text-sm p-2">
                    <option>All Activities</option>
                    <option>Practice Sessions</option>
                    <option>Assessments</option>
                  </select>
                  <button className="p-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200">
                    <Calendar size={20} />
                  </button>
                </div>
              </div>
              
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center p-4 border border-gray-200 rounded-lg">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${activity.type === 'Practice' ? 'bg-teal-100 text-teal-500' : 'bg-blue-100 text-blue-500'} mr-4`}>
                      {activity.type === 'Practice' ? 'P' : 'A'}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{activity.type}: {activity.topic}</h4>
                      <div className="flex items-center text-sm text-gray-500">
                        <span>{activity.date}</span>
                        <span className="mx-2">•</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                    <div className="text-center mr-6">
                      <div className={`text-xl font-bold ${getColorForScore(activity.score)}`}>{activity.score}</div>
                      <div className="text-xs text-gray-500">Score</div>
                    </div>
                    <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                      Details
                    </button>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="px-4 py-2 border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50">
                  Load More
                </button>
              </div>
            </div>
          )}
          
          {/* Settings Tab Content */}
          {activeTab === 'settings' && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Account Settings</h3>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input 
                        type="text" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue="Test User"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input 
                        type="email" 
                        className="w-full p-2 border border-gray-300 rounded-md"
                        defaultValue="test@example.com"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Native Language
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>Dutch</option>
                      <option>Portuguese</option>
                    </select>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6 mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Preferences</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Voice Preference
                    </label>
                    <select className="w-full p-2 border border-gray-300 rounded-md">
                      <option>Female (Default)</option>
                      <option>Male</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Speech Rate
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">Slow</span>
                      <input 
                        type="range" 
                        min="0.5" 
                        max="1.5" 
                        step="0.1" 
                        className="flex-1" 
                        defaultValue="1" 
                      />
                      <span className="text-sm text-gray-500 ml-2">Fast</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <input
                      id="notifications"
                      type="checkbox"
                      className="h-4 w-4 text-teal-500 border-gray-300 rounded focus:ring-teal-400"
                      defaultChecked
                    />
                    <label htmlFor="notifications" className="ml-2 block text-sm text-gray-700">
                      Enable email notifications for practice reminders
                    </label>
                  </div>
                </div>
                
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-teal-500 transition-colors">
                    Save Preferences
                  </button>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-800 mb-4">Account Actions</h3>
                
                <div className="space-y-4">
                  <button className="w-full p-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center justify-center">
                    <Layout size={16} className="mr-2" />
                    Export My Data
                  </button>
                  <button className="w-full p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 flex items-center justify-center">
                    <LogOut size={16} className="mr-2" />
                    Sign Out of All Devices
                  </button>
                  <button className="w-full p-2 bg-red-50 text-red-600 border border-red-200 rounded-md hover:bg-red-100 flex items-center justify-center">
                    Delete My Account
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-4 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Language Coach. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default UserProfileDashboard;
