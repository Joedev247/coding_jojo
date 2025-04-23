'use client';
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Import language files
import enTranslations from '../langs/en.json';
import esTranslations from '../langs/es.json';
import frTranslations from '../langs/fr.json';
// Import other language files similarly

// Language mappings
const translations = {
  EN: enTranslations,
  ES: esTranslations,
  FR: frTranslations,
  // Add other languages here
};

// Available languages
export const languageOptions = [
  { code: 'EN', name: 'English' },
  { code: 'ES', name: 'Español' },
  { code: 'FR', name: 'Français' },
  // Add other languages
];

// Type for context
type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  translations: Record<string, any>;
  t: (key: string) => string;
};

// Create context with default values
const LanguageContext = createContext<LanguageContextType>({
  language: 'EN',
  setLanguage: () => {},
  translations: translations.EN,
  t: (key) => key,
});

// Provider component
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState('EN');
  
  // Get translation function
  const t = (key: string): string => {
    const keys = key.split('.');
    let result: any = translations[language as keyof typeof translations] || translations.EN;
    
    for (const k of keys) {
      if (result && result[k] !== undefined) {
        result = result[k];
      } else {
        return key; // Fallback to key if translation not found
      }
    }
    
    return result;
  };
  
  // Handle language change
  const handleSetLanguage = (lang: string) => {
    if (translations[lang as keyof typeof translations]) {
      setLanguage(lang);
      localStorage.setItem('preferredLanguage', lang);
      document.documentElement.lang = lang.toLowerCase();
    }
  };
  
  // Load saved language on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && translations[savedLang as keyof typeof translations]) {
      setLanguage(savedLang);
      document.documentElement.lang = savedLang.toLowerCase();
    }
  }, []);
  
  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        translations: translations[language as keyof typeof translations] || translations.EN,
        t 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook for accessing translations
export const useTranslation = () => useContext(LanguageContext);
