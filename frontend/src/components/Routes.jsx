import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import screen components
import LandingPage from './screens/LandingPage.tsx';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen.tsx';
import ProficiencyLevelScreen from './screens/ProficiencyLevelScreen.tsx';
import TopicSelectionScreen from './screens/TopicSelectionScreen.tsx';
import ConversationScreen from './screens/ConversationScreen.tsx';
import SpeakingAssessmentScreen from './screens/SpeakingAssessmentScreen.jsx';
import SpeechConversationScreen from './screens/SpeechConversationScreen.jsx';
import UserProfileDashboard from './screens/UserProfileDashboard.jsx';
import ProtectedRoute from './common/ProtectedRoute.jsx';

/**
 * AppRoutes component
 * Defines the routing structure for the application
 */
const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main user flow */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/language-selection" element={<LanguageSelectionScreen />} />
        <Route path="/proficiency-level" element={<ProficiencyLevelScreen />} />
        <Route path="/speaking-assessment" element={<SpeakingAssessmentScreen />} />
        <Route path="/topic-selection" element={<TopicSelectionScreen />} />
        <Route path="/conversation" element={<ConversationScreen />} />
        <Route path="/speech-conversation" element={<SpeechConversationScreen />} />
        <Route path="/profile" element={<ProtectedRoute><UserProfileDashboard /></ProtectedRoute>} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
