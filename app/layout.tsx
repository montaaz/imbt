import type React from "react"
import type { Metadata } from "next"
import { Inter, Geist_Mono, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ClientProviders from "@/components/client-providers"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" })

export const metadata: Metadata = {
  title: "IMBT Consulting | Transformation Digitale",
  description:
    "IMBT Consulting - Votre partenaire stratégique pour la transformation digitale, le développement sur mesure et le marketing digital.",
  keywords: ["consulting", "transformation digitale", "développement web", "marketing digital", "CRM", "ERP"],
  generator: "v0.app",
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.variable} ${cairo.variable} font-sans antialiased`}>
        <ClientProviders>
          {children}
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
