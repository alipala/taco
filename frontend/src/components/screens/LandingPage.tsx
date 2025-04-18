import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mic, MessageSquare, BarChart2 } from 'lucide-react';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * LandingPage component
 * The main entry point of the application that introduces users to the language learning platform
 */
const LandingPage: React.FC = () => {
  return (
    <MainLayout>
      {/* Hero Section - Teal Background */}
      <section className="py-12 md:py-20 px-6 md:px-12 flex flex-col md:flex-row items-center bg-[#6DE1D2] bg-opacity-10">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Master a new language through <span className="text-teal-400">conversation</span>
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Practice speaking naturally with our AI language tutor that adapts to your learning style and provides real-time feedback.
          </p>
          <div className="flex gap-4">
            <Link 
              to="/language-selection" 
              className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium flex items-center"
            >
              Start Learning
              <ChevronRight size={20} className="ml-1" />
            </Link>
            <Link 
              to="/demo" 
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Try Demo
            </Link>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-yellow-400 flex items-center justify-center text-white">
                    T
                  </div>
                  <span className="ml-2 font-medium text-gray-800">Tutor</span>
                </div>
                <span className="text-xs text-gray-400">Just now</span>
              </div>
              <p className="text-gray-700 mb-4">
                Hello! I'd love to help you practice your English today. What would you like to talk about?
              </p>
              <div className="flex justify-between items-center">
                <div className="w-8 h-8 rounded-full bg-teal-400 flex items-center justify-center text-white">
                  U
                </div>
                <div className="flex-1 mx-4">
                  <div className="h-3 bg-gray-200 rounded-full w-2/3 animate-pulse"></div>
                </div>
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50">
                  <Mic size={20} className="text-teal-400 animate-pulse" />
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -right-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200 shadow-sm">
              <div className="flex items-center gap-1 text-yellow-700 text-sm font-medium">
                <span>95%</span>
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                <span>Good pronunciation</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Language Selection Section - Yellow Background */}
      <section className="py-12 px-6 md:px-12 bg-[#FFD63A] bg-opacity-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Choose Your Language</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {[
            { name: 'English', flag: '🇬🇧', desc: 'Practice speaking and listening' },
            { name: 'Spanish', flag: '🇪🇸', desc: 'Domina habilidades de conversación' },
            { name: 'French', flag: '🇫🇷', desc: 'Améliorez vos compétences' },
            { name: 'German', flag: '🇩🇪', desc: 'Entwickle Sprachkenntnisse' },
            { name: 'Dutch', flag: '🇳🇱', desc: 'Leer Nederlandse woordenschat' },
            { name: 'Portuguese', flag: '🇵🇹', desc: 'Aprenda vocabulário' }
          ].map((lang, i) => (
            <div 
              key={i} 
              className="bg-white rounded-lg border border-gray-200 hover:border-yellow-400 transition-colors p-4 text-center hover:shadow-md cursor-pointer"
              onClick={() => {/* Would navigate to language selection with this language pre-selected */}}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <h3 className="font-medium text-gray-800">{lang.name}</h3>
              <p className="text-xs text-gray-500 mt-1 hidden md:block">{lang.desc}</p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Features Section - Orange Background */}
      <section className="py-12 md:py-20 px-6 md:px-12 bg-[#FFA955] bg-opacity-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">How It Works</h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">Our AI-powered platform makes language learning intuitive and effective</p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 border border-gray-100 hover:border-orange-300 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
              <Mic className="text-orange-500" size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Real-time Conversation</h3>
            <p className="text-gray-600">Practice natural speaking with our AI tutor that adjusts to your proficiency level.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-100 hover:border-orange-300 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
              <MessageSquare className="text-orange-500" size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Instant Feedback</h3>
            <p className="text-gray-600">Get detailed assessments on pronunciation, grammar, and vocabulary as you speak.</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 border border-gray-100 hover:border-orange-300 transition-all hover:shadow-md">
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center mb-4">
              <BarChart2 className="text-orange-500" size={24} />
            </div>
            <h3 className="font-bold text-gray-800 text-lg mb-2">Personalized Plans</h3>
            <p className="text-gray-600">Follow custom learning plans tailored to your goals and track your progress.</p>
          </div>
        </div>
      </section>
      
      {/* Topics Section - Red Background */}
      <section className="py-12 px-6 md:px-12 bg-[#F75A5A] bg-opacity-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Practice With Various Topics</h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {['Travel', 'Food & Cooking', 'Hobbies', 'Culture', 'Movies & TV', 'Music', 'Technology', 'Environment', 'Custom Topics'].map((topic, i) => (
            <span key={i} className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 cursor-pointer transition-colors text-sm">
              {topic}
            </span>
          ))}
        </div>
      </section>
      
      {/* CTA Section - Teal Background */}
      <section className="py-16 px-6 md:px-12 bg-[#6DE1D2] bg-opacity-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to become fluent?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of learners who are improving their language skills every day with our AI-powered conversation platform.</p>
          <Link 
            to="/language-selection" 
            className="bg-teal-400 text-white px-8 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium inline-flex items-center"
          >
            Get Started for Free
            <ChevronRight size={20} className="ml-1" />
          </Link>
        </div>
      </section>
      
      {/* Testimonials - Yellow Background */}
      <section className="py-12 px-6 md:px-12 bg-[#FFD63A] bg-opacity-10">
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">What Our Users Say</h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Sarah K.", role: "English Learner", text: "The real-time feedback helped me improve my pronunciation dramatically in just a few weeks." },
            { name: "Miguel L.", role: "Spanish Teacher", text: "I recommend this app to all my students. The conversation practice is incredibly realistic." },
            { name: "Akira T.", role: "Business Professional", text: "Preparing for international meetings became much easier after practicing with this app." }
          ].map((testimonial, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-center mb-4">
                <div className="mr-3 bg-yellow-100 text-yellow-800 w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{testimonial.name}</h3>
                  <p className="text-xs text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-600">{testimonial.text}</p>
              <div className="mt-3 flex text-yellow-400">
                {[1, 2, 3, 4, 5].map(star => (
                  <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;
