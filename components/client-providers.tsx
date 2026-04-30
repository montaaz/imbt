"use client"

import dynamic from "next/dynamic"
import { LanguageProvider } from "@/lib/i18n/language-context"

import { ThemeProvider } from "@/components/theme-provider"

const CustomCursor = dynamic(() => import("@/components/three/custom-cursor"), {
  ssr: false,
})

export default function ClientProviders({ children }: { children?: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LanguageProvider>
        <CustomCursor />
        {children}
      </LanguageProvider>
    </ThemeProvider>
  )
}
