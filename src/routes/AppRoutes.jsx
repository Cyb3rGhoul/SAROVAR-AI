import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from '../contexts/LanguageContext.jsx';
import Loader from '../components/PreLoader/Loader.jsx';

const LandingPage = React.lazy(() => import('../pages/LandingPage.jsx'));
const ChatPage = React.lazy(() => import('../pages/ChatPage.jsx'));
const AboutPage = React.lazy(() => import('../pages/AboutPage.jsx'));


const AppRoutes = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <Loader />
            </div>
          }>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/about" element={<AboutPage />} />
            </Routes>
          </Suspense>
        </div>
      </Router>
    </LanguageProvider>
  );
};

export default AppRoutes;