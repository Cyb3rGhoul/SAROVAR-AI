import React, { createContext, useState, useContext, useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations from separate files (recommended)
import enTranslations from '../../public/locales/en/translation.json';
import hiTranslations from '../../public/locales/hi/translation.json';
import mrTranslations from '../../public/locales/mr/translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    hi: { translation: hiTranslations },
    mr: { translation: mrTranslations },
  },
  fallbackLng: 'en',
  supportedLngs: ['en', 'hi', 'mr'],
  lng: 'en', // Default, will be overridden by user preference
  interpolation: { escapeValue: false },
});

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('appLanguage');
    const lang = savedLanguage || 'en';
    i18n.changeLanguage(lang); // Sync immediately
    return lang;
  });

  const changeLanguage = (lng) => {
    if (!['en', 'hi', 'mr'].includes(lng)) {
      console.warn(`Unsupported language: ${lng}. Defaulting to English.`);
      lng = 'en';
    }
    setLanguage(lng);
    i18n.changeLanguage(lng);
    localStorage.setItem('appLanguage', lng);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};