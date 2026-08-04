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
  generator: "v0.app",
  icons: {
    icon: [
      { url: "/icon-light-32x32.png", media: "(prefers-color-scheme: light)" },
      { url: "/icon-dark-32x32.png", media: "(prefers-color-scheme: dark)" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.png",
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
        <GoogleAnalytics />
      </body>
    </html>
  )
}
