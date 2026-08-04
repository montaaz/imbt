import type React from "react"
import type { Metadata } from "next"
import { Inter, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import ClientProviders from "@/components/client-providers"
import GoogleAnalytics from "@/components/google-analytics"
import "./globals.css"

// `display: swap` shows text immediately in a fallback face instead of blocking
// paint while the webfont downloads.
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo", display: "swap" })

export const metadata: Metadata = {
  title: "IMBT Consulting | Transformation Digitale",
  description:
    "IMBT Consulting - Votre partenaire stratégique pour la transformation digitale, le développement sur mesure et le marketing digital.",
  keywords: ["consulting", "transformation digitale", "développement web", "marketing digital", "CRM", "ERP"],
  applicationName: "IMBT Consulting",
  // The IMBT mark is a transparent PNG, so a single set works on light and dark
  // browser chrome without needing per-scheme variants.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-16.png", type: "image/png", sizes: "16x16" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
    ],
    apple: "/apple-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
        <GoogleAnalytics />
      </body>
    </html>
  )
}
