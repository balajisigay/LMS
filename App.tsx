/**
 * LMS App - Learning Management System
 * Main entry point
 *
 * @format
 */

import React, { useState } from 'react';
import { LandingScreen } from './src/screens/LandingScreen';
import { CourseDetailScreen } from './src/screens/CourseDetailScreen';
import LoginPage from './web/src/pages/LoginPage';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'landing' | 'courseDetail'>('landing');

  const handleViewCourse = () => {
    setCurrentScreen('courseDetail');
  };

  const handleBackToHome = () => {
    setCurrentScreen('landing');
  };

  return currentScreen === 'landing' ? (
    <LandingScreen onViewCourse={handleViewCourse} />
  ) : (
    <CourseDetailScreen onBack={handleBackToHome} />
    
  );
}

export default App;
