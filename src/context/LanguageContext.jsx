import { createContext, useContext, useState, useEffect } from 'react';
import { t } from '../utils/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    // Load from localStorage or default to English
    const stored = localStorage.getItem('app_language');
    return stored || 'en';
  });

  // Update document language attribute (keep text left-aligned even for Urdu)
  useEffect(() => {
    document.documentElement.lang = language;
    // Keep direction as LTR even for Urdu - text stays left-aligned
    document.documentElement.dir = 'ltr';
    // Remove RTL class if it exists
    document.body.classList.remove('rtl');
  }, [language]);

  // Persist language to localStorage
  useEffect(() => {
    localStorage.setItem('app_language', language);
  }, [language]);

  // Translation function
  const translate = (key, params = {}) => {
    return t(language, key, params);
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ur' : 'en');
  };

  const value = {
    language,
    setLanguage,
    toggleLanguage,
    t: translate,
    isRTL: language === 'ur',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

