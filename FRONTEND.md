# Language Learning App Frontend Documentation

This document provides a comprehensive overview of the frontend architecture, components, and functionality for the Language Learning App.

## 📂 Project Structure

The frontend is built with React, TypeScript/JavaScript, and Tailwind CSS. The project follows a modular component-based architecture with the following structure:

```
frontend/
├── public/              # Static files
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── common/      # Reusable UI components
│   │   ├── layout/      # Layout components
│   │   ├── screens/     # Screen components (pages)
│   │   └── Routes.jsx   # Application routing
│   ├── contexts/        # React contexts for state management
│   ├── styles/          # Global styles
│   ├── App.js           # Main application component
│   └── index.js         # Application entry point
└── package.json         # Dependencies and scripts
```

## 🧩 Key Components

### Routing

**`Routes.jsx`**
- Defines the application's routing structure using React Router
- Maps URL paths to screen components
- Handles navigation and redirects
- Ensures a logical flow through the language learning journey

### Layout Components

**`MainLayout.jsx`**
- Provides a consistent layout wrapper for screen components
- Includes the Navbar and common UI elements
- Ensures consistent spacing and structure across the application

### Common Components

**`Navbar.jsx`**
- Top navigation bar present throughout the application
- Provides access to user profile, authentication, and main navigation
- Adapts to different screen sizes with responsive design
- Integrates with the authentication system

**`AuthModal.jsx`**
- Handles user authentication (login and signup)
- Provides form validation and error handling
- Supports email/password authentication
- Includes social login options
- Communicates with the application context for authentication state

### Screen Components

**`LandingPage.tsx`**
- Entry point for users
- Showcases the application's features and benefits
- Provides clear calls-to-action for new and returning users
- Responsive design for all device sizes

**`LanguageSelectionScreen.tsx`**
- Allows users to select their target language for learning
- Displays language options with relevant information
- Supports search functionality for finding specific languages
- Stores selection in application state for subsequent screens

**`ProficiencyLevelScreen.tsx`**
- Enables users to select their current proficiency level (A1-C2)
- Provides descriptions for each CEFR level
- Guides users to select the appropriate level
- Stores selection in application state

**`SpeakingAssessmentScreen.jsx`**
- Conducts an initial speaking assessment
- Provides recording functionality with visual feedback
- Includes instructions and example prompts
- Analyzes user's speaking ability (simulated in current version)
- Recommends appropriate learning content based on assessment

**`TopicSelectionScreen.tsx`**
- Presents categorized topics for language practice
- Allows users to select topics of interest
- Provides visual representation of topic categories
- Stores selections in application state

**`ConversationScreen.tsx`**
- Basic conversation interface for language practice
- Displays conversation history
- Provides input methods for user responses
- Simulates language tutor interactions

**`SpeechConversationScreen.jsx`**
- Advanced conversation interface with split-panel design
- Left panel for exercises, controls, and feedback
- Right panel for conversation transcript
- Includes recording functionality with visual indicators
- Provides real-time feedback on speaking performance
- Supports different exercise types (Free, Guided, Transform, Correction)
- Includes speaking speed controls and sentence analysis

**`UserProfileDashboard.jsx`**
- Comprehensive user dashboard with multiple tabs:
  - **Overview**: Assessment results, recent activity, and learning plans
  - **Learning Plans**: Detailed plan information and progress tracking
  - **Activity**: History of practice sessions and assessments
  - **Settings**: Account settings, preferences, and account actions
- Visualizes user progress with charts and progress bars
- Provides recommendations for next learning sessions
- Tracks learning streaks and achievements
- Allows users to manage their account and preferences

### Context and State Management

**`AppContext.jsx`**
- Provides global state management using React Context API
- Manages authentication state (login/logout)
- Stores user preferences and selections
- Tracks learning progress and history
- Makes state available throughout the application
- Provides actions for updating state

## 🎨 Styling

The application uses Tailwind CSS for styling with a consistent design system:

- **Color Scheme**: Primarily teal (#38B2AC) with complementary colors
- **Typography**: Clean, readable fonts with appropriate hierarchy
- **Components**: Consistent styling for buttons, cards, forms, and other UI elements
- **Responsiveness**: Mobile-first design that adapts to all screen sizes

## 🔄 User Flows

### Authentication Flow
1. User clicks "Sign In" or "Sign Up" in the Navbar
2. AuthModal opens with the appropriate tab selected
3. User enters credentials and submits the form
4. On successful authentication, the modal closes and the UI updates
5. User is now logged in and can access personalized features

### Language Learning Flow
1. User starts at the Landing Page
2. Selects a language on the Language Selection Screen
3. Chooses proficiency level on the Proficiency Level Screen
4. Completes a speaking assessment on the Speaking Assessment Screen
5. Selects topics of interest on the Topic Selection Screen
6. Begins conversation practice on the Conversation or Speech Conversation Screen
7. Reviews progress and manages learning on the User Profile Dashboard

## 🧪 Testing

The frontend components are designed with testability in mind:
- Props are well-defined with appropriate types
- Components have clear responsibilities
- State management is centralized for easier testing
- UI interactions are accessible and can be automated

## 🔍 Future Enhancements

Planned frontend enhancements include:
- Integration with backend APIs for real functionality
- Enhanced voice recognition and feedback
- More interactive exercise types
- Gamification elements (points, badges, challenges)
- Offline support for practice sessions
- Performance optimizations for mobile devices

## 📚 Dependencies

Key dependencies include:
- React for UI components
- React Router for navigation
- Tailwind CSS for styling
- Lucide React for icons
- React Context API for state management

## 🚀 Getting Started

To run the frontend locally:

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Open your browser to http://localhost:3000

## 📝 Code Conventions

- Components are organized by their function (common, layout, screens)
- Each component has a clear, single responsibility
- Props are documented with appropriate types
- State management is centralized where possible
- Consistent naming conventions are used throughout
- Code is formatted with consistent indentation and spacing
