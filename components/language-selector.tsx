'use client'

import { useState } from 'react'
import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/language-context'
import { Language, languageNames } from '@/lib/i18n/translations'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()

  const languages: Language[] = ['fr', 'en', 'ar']

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="gap-2">
          <Globe className="h-4 w-4" />
          <span className="hidden sm:inline">{languageNames[language]}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => setLanguage(lang)}
            className={language === lang ? 'bg-primary/20' : ''}
          >
            <span className={lang === 'ar' ? 'font-arabic' : ''}>
              {languageNames[lang]}
            </span>
            {language === lang && (
              <span className="ml-auto text-primary">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
