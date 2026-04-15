"use client"

import dynamic from "next/dynamic"
import { LanguageProvider } from "@/lib/i18n/language-context"

const CustomCursor = dynamic(() => import("@/components/three/custom-cursor"), {
  ssr: false,
})

export default function ClientProviders({ children }: { children?: React.ReactNode }) {
  return (
    <LanguageProvider>
      <CustomCursor />
      {children}
    </LanguageProvider>
  )
}
