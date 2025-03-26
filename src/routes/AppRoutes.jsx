import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage.jsx';
import ChatPage from '../pages/ChatPage.jsx';
import AboutPage from '../pages/AboutPage.jsx';
import { LanguageProvider } from '../contexts/LanguageContext.jsx';

const AppRoutes = () => {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
          {/* <Footer /> */}
        </div>
      </Router>
      </LanguageProvider>
  );
};

export default AppRoutes;