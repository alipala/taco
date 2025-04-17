import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Import screen components
import LandingPage from './screens/LandingPage';
import LanguageSelectionScreen from './screens/LanguageSelectionScreen';
import ProficiencyLevelScreen from './screens/ProficiencyLevelScreen';
import TopicSelectionScreen from './screens/TopicSelectionScreen';
import ConversationScreen from './screens/ConversationScreen';

/**
 * AppRoutes component
 * Defines the routing structure for the application
 */
const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main user flow */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/language-selection" element={<LanguageSelectionScreen />} />
        <Route path="/proficiency-level" element={<ProficiencyLevelScreen />} />
        <Route path="/topic-selection" element={<TopicSelectionScreen />} />
        <Route path="/conversation" element={<ConversationScreen />} />
        
        {/* Redirect any unknown routes to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
