'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { Language, translations, Translations } from './translations'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations
  dir: 'ltr' | 'rtl'
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('fr')

  // Load language from localStorage on mount
  useEffect(() => {
    const savedLang = localStorage.getItem('language') as Language
    if (savedLang && ['fr', 'en', 'ar'].includes(savedLang)) {
      setLanguageState(savedLang)
    }
  }, [])

  // Update document direction and localStorage when language changes
  useEffect(() => {
    const dir = language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = language
    localStorage.setItem('language', language)
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    dir: language === 'ar' ? 'rtl' : 'ltr',
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
