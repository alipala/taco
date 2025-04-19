import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Mic, MessageSquare, BarChart2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../layout/MainLayout.jsx';

/**
 * LandingPage component enhanced with Framer Motion animations
 * The main entry point of the application that introduces users to the language learning platform
 */
const LandingPage: React.FC = () => {
  // State for FAQ accordion
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  
  // State for feature tabs
  const [selectedFeatureTab, setSelectedFeatureTab] = useState(0);
  
  // Feature tabs data
  const featureTabs = [
    {
      title: "Real-time Conversation",
      icon: <Mic className="text-orange-500" size={24} />,
      description: "Practice natural speaking with our AI tutor that adjusts to your proficiency level.",
    },
    {
      title: "Instant Feedback",
      icon: <MessageSquare className="text-orange-500" size={24} />,
      description: "Get detailed assessments on pronunciation, grammar, and vocabulary as you speak.",
    },
    {
      title: "Personalized Plans",
      icon: <BarChart2 className="text-orange-500" size={24} />,
      description: "Follow custom learning plans tailored to your goals and track your progress.",
    },
  ];
  
  // FAQ data
  const faqItems = [
    {
      question: "How does the AI language tutor work?",
      answer: "Our AI language tutor uses advanced natural language processing to understand your speech, provide realistic conversation practice, and offer instant feedback on your pronunciation, grammar, and vocabulary usage. The system adapts to your proficiency level to provide an optimal learning experience."
    },
    {
      question: "Which languages are supported?",
      answer: "We currently support English, Spanish, French, German, Dutch, and Portuguese. We're continually adding more languages to our platform."
    },
    {
      question: "How accurate is the pronunciation feedback?",
      answer: "Our pronunciation feedback system is highly accurate, built on speech recognition technology trained on millions of native speaker examples. It can detect subtle pronunciation issues and provide specific guidance for improvement."
    },
    {
      question: "Can I use the app offline?",
      answer: "Some features require an internet connection for real-time processing. However, we're developing offline capabilities for certain practice exercises that will be available in a future update."
    },
    {
      question: "Do you offer a free trial?",
      answer: "Yes! You can try our platform for free with limited features. Sign up to explore the basic functionality before committing to a subscription."
    }
  ];
  
  // Progress data for line graph
  const progressData = [
    { month: "Jan", score: 35 },
    { month: "Feb", score: 45 },
    { month: "Mar", score: 55 },
    { month: "Apr", score: 60 },
    { month: "May", score: 70 },
    { month: "Jun", score: 85 },
  ];
  
  // Animation variants for fade-in elements
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <MainLayout>
      {/* Hero Section - Teal Background */}
      <section className="py-12 md:py-20 px-6 md:px-12 flex flex-col md:flex-row items-center bg-[#6DE1D2] bg-opacity-10">
        <motion.div 
          className="md:w-1/2 mb-8 md:mb-0"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Master a new language through <span className="text-teal-400">conversation</span>
          </h1>
          <p className="text-gray-600 mb-6 text-lg">
            Practice speaking naturally with our AI language tutor that adapts to your learning style and provides real-time feedback.
          </p>
          <div className="flex gap-4">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/language-selection" 
                className="bg-teal-400 text-white px-6 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium flex items-center"
              >
                Start Learning
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/demo" 
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
              >
                Try Demo
              </Link>
            </motion.div>
          </div>
        </motion.div>
        <motion.div 
          className="md:w-1/2 flex justify-center"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
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
                  <motion.div 
                    animate={{ scaleX: [0, 1, 0.5, 0.8, 0.2, 0.5] }} 
                    transition={{ 
                      repeat: Infinity, 
                      duration: 2,
                      ease: "easeInOut" 
                    }}
                    className="h-3 bg-gray-200 rounded-full w-2/3"
                  ></motion.div>
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50"
                >
                  <Mic size={20} className="text-teal-400" />
                </motion.div>
              </div>
            </div>
            <motion.div 
              className="absolute -bottom-4 -right-4 bg-yellow-50 rounded-lg p-3 border border-yellow-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <div className="flex items-center gap-1 text-yellow-700 text-sm font-medium">
                <span>95%</span>
                <span className="h-1.5 w-1.5 rounded-full bg-yellow-400"></span>
                <span>Good pronunciation</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>
      
      {/* Feature Tabs - Smooth animation */}
      <section className="py-12 px-6 md:px-12 bg-[#FFD63A] bg-opacity-10">
        <motion.div
          className="text-center mb-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2">How It Works</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Our AI-powered platform makes language learning intuitive and effective</p>
        </motion.div>
        
        {/* Smooth tabs implementation */}
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-8">
            {featureTabs.map((tab, i) => (
              <motion.button
                key={i}
                className={`relative px-4 py-2 rounded-full text-sm font-medium mx-1 ${
                  selectedFeatureTab === i ? 'text-white' : 'text-gray-600'
                }`}
                onClick={() => setSelectedFeatureTab(i)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {selectedFeatureTab === i && (
                  <motion.div
                    className="absolute inset-0 bg-teal-400 rounded-full -z-10"
                    layoutId="featureTabBackground"
                    transition={{ type: "spring", duration: 0.6 }}
                  />
                )}
                {tab.title}
              </motion.button>
            ))}
          </div>
          
          <div className="relative h-64 bg-white rounded-lg shadow-md overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFeatureTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center"
              >
                <div className="w-16 h-16 bg-orange-50 rounded-full flex items-center justify-center mb-4">
                  {featureTabs[selectedFeatureTab].icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {featureTabs[selectedFeatureTab].title}
                </h3>
                <p className="text-gray-600 max-w-md">
                  {featureTabs[selectedFeatureTab].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
      
      {/* Language Selection Section - Yellow Background */}
      <section className="py-12 px-6 md:px-12 bg-[#FFD63A] bg-opacity-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Choose Your Language</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto">
          {[
            { name: 'English', flag: '🇬🇧', desc: 'Practice speaking and listening' },
            { name: 'Spanish', flag: '🇪🇸', desc: 'Domina habilidades de conversación' },
            { name: 'French', flag: '🇫🇷', desc: 'Améliorez vos compétences' },
            { name: 'German', flag: '🇩🇪', desc: 'Entwickle Sprachkenntnisse' },
            { name: 'Dutch', flag: '🇳🇱', desc: 'Leer Nederlandse woordenschat' },
            { name: 'Portuguese', flag: '🇵🇹', desc: 'Aprenda vocabulário' }
          ].map((lang, i) => (
            <motion.div 
              key={i} 
              className="bg-white rounded-lg border border-gray-200 hover:border-yellow-400 transition-colors p-4 text-center hover:shadow-md cursor-pointer"
              onClick={() => {/* Would navigate to language selection with this language pre-selected */}}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.3 }}
            >
              <div className="text-3xl mb-2">{lang.flag}</div>
              <h3 className="font-medium text-gray-800">{lang.name}</h3>
              <p className="text-xs text-gray-500 mt-1 hidden md:block">{lang.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* Progress Line Graph Section */}
      <section className="py-12 px-6 md:px-12 bg-white">
        <motion.div
          className="max-w-4xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">Track Your Progress</h2>
          <p className="text-gray-600 text-center mb-8">See your language skills improve over time with detailed analytics</p>
          
          {/* Line Graph Component */}
          <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100">
            <h3 className="text-lg font-medium text-gray-800 mb-4">Speaking Skills Progress</h3>
            <div className="h-64 relative">
              {/* X and Y axes */}
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gray-200"></div>
              <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
              
              {/* Data points and line */}
              <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
                <motion.path
                  d={`M 0,${240 - (progressData[0].score * 240 / 100)} ${progressData.map((point, i) => {
                    const x = i * (600 / (progressData.length - 1));
                    const y = 240 - (point.score * 240 / 100);
                    return `L ${x},${y}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="#6DE1D2"
                  strokeWidth="3"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                />
                
                {/* Data points */}
                {progressData.map((point, i) => {
                  const x = i * (600 / (progressData.length - 1));
                  const y = 240 - (point.score * 240 / 100);
                  return (
                    <motion.circle
                      key={i}
                      cx={x}
                      cy={y}
                      r="6"
                      fill="#6DE1D2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 + (i * 0.1), duration: 0.5, type: "spring" }}
                    />
                  );
                })}
              </svg>
              
              {/* X-axis labels */}
              <div className="absolute left-0 right-0 bottom-0 h-6 flex justify-between">
                {progressData.map((point, i) => (
                  <div key={i} className="text-xs text-gray-500 text-center" style={{ width: `${100 / progressData.length}%` }}>
                    {point.month}
                  </div>
                ))}
              </div>
              
              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-6 w-10 flex flex-col justify-between items-end">
                <div className="text-xs text-gray-500">100%</div>
                <div className="text-xs text-gray-500">75%</div>
                <div className="text-xs text-gray-500">50%</div>
                <div className="text-xs text-gray-500">25%</div>
                <div className="text-xs text-gray-500">0%</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Topics Section - Red Background */}
      <section className="py-12 px-6 md:px-12 bg-[#F75A5A] bg-opacity-10">
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          Practice With Various Topics
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-3 max-w-3xl mx-auto">
          {['Travel', 'Food & Cooking', 'Hobbies', 'Culture', 'Movies & TV', 'Music', 'Technology', 'Environment', 'Custom Topics'].map((topic, i) => (
            <motion.span 
              key={i} 
              className="bg-white px-4 py-2 rounded-full border border-gray-200 text-gray-700 hover:border-red-300 hover:text-red-600 cursor-pointer transition-colors text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              {topic}
            </motion.span>
          ))}
        </div>
      </section>
      
      {/* FAQ Accordion Section */}
      <section className="py-12 px-6 md:px-12 bg-gray-50">
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
          
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <motion.div 
                key={i}
                className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.3 }}
              >
                <motion.button
                  className="flex justify-between items-center w-full p-4 text-left"
                  onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                  whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
                >
                  <span className="font-medium text-gray-800">{item.question}</span>
                  <motion.div
                    animate={{ rotate: expandedFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown size={20} className="text-gray-500" />
                  </motion.div>
                </motion.button>
                
                <AnimatePresence initial={false}>
                  {expandedFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="p-4 pt-0 border-t border-gray-100 text-gray-600">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
      
      {/* CTA Section - Teal Background */}
      <section className="py-16 px-6 md:px-12 bg-[#6DE1D2] bg-opacity-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to become fluent?</h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">Join thousands of learners who are improving their language skills every day with our AI-powered conversation platform.</p>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link 
                to="/language-selection" 
                className="bg-teal-400 text-white px-8 py-3 rounded-lg hover:bg-teal-500 transition-colors font-medium inline-flex items-center"
              >
                Get Started for Free
                <ChevronRight size={20} className="ml-1" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials - Yellow Background */}
      <section className="py-12 px-6 md:px-12 bg-[#FFD63A] bg-opacity-10">
        <motion.h2 
          className="text-2xl font-bold text-gray-800 mb-8 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          What Our Users Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {[
            { name: "Sarah K.", role: "English Learner", text: "The real-time feedback helped me improve my pronunciation dramatically in just a few weeks." },
            { name: "Miguel L.", role: "Spanish Teacher", text: "I recommend this app to all my students. The conversation practice is incredibly realistic." },
            { name: "Akira T.", role: "Business Professional", text: "Preparing for international meetings became much easier after practicing with this app." }
          ].map((testimonial, i) => (
            <motion.div 
              key={i} 
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
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
                  <motion.svg 
                    key={star} 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 + star * 0.1, duration: 0.3 }}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </MainLayout>
  );
};

export default LandingPage;