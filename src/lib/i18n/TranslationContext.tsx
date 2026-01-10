'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { en, Dictionary } from './en';
import { zh } from './zh';
import { zh_tw } from './zh-tw';

export type Language = 'en' | 'zh-cn' | 'zh-tw';

interface TranslationContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Dictionary;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

const dictionaries: Record<Language, Dictionary> = {
  'en': en,
  'zh-cn': zh,
  'zh-tw': zh_tw
};

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');
  const [t, setTranslations] = useState<Dictionary>(en);

  useEffect(() => {
    // Load saved language preference
    const savedLang = localStorage.getItem('talos-lang');
    if (savedLang) {
       if (savedLang === 'en' || savedLang === 'zh-cn' || savedLang === 'zh-tw') {
           setLanguage(savedLang as Language);
       } else if (savedLang === 'zh') {
           // Migration for old 'zh' key
           setLanguage('zh-cn'); 
       }
    }
  }, []);

  useEffect(() => {
    setTranslations(dictionaries[language]);
    localStorage.setItem('talos-lang', language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
}
