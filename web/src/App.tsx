import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { CourseDetailPage } from './pages/CourseDetailPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { globalStyles } from './styles/global';
import LoginPage from "./pages/LoginPage";


function App() {
  useEffect(() => {
    try {
      console.log('[App] Component mounted');
      
      // Inject global styles
      const existingStyle = document.getElementById('global-styles');
      if (existingStyle) {
        console.log('[App] Global styles already injected, skipping...');
      } else {
        const style = document.createElement('style');
        style.id = 'global-styles';
        style.textContent = globalStyles;
        document.head.appendChild(style);
        console.log('[App] ✓ Global styles injected successfully');
      }
    } catch (error) {
      console.error('[App] Error in useEffect:', error);
    }
  }, []);

  console.log('[App] Rendering router with routes');
  
  return (
    <div style={{ width: '100%', minHeight: '100vh' }}>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course/:courseId" element={<CourseDetailPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
