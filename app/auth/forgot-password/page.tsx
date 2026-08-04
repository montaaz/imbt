"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n/language-context"
import Logo from "@/components/logo"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function ForgotPasswordPage() {
  const { t, dir } = useLanguage()
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const [devResetUrl, setDevResetUrl] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t.errors.somethingWrong)
        setIsLoading(false)
        return
      }

      setDevResetUrl(data.devResetUrl ?? null)
      setSent(true)
    } catch (err) {
      console.error("Forgot password error:", err)
      setError(t.errors.somethingWrong)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <ParticleField />
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <Logo className="h-12 w-auto mx-auto" />
              </Link>
              <h1 className="text-3xl font-bold mb-2">{t.auth.forgotPasswordTitle}</h1>
              <p className="text-foreground/60">{t.auth.forgotPasswordSubtitle}</p>
            </div>

            <div className="p-8 rounded-3xl glass glow-primary">
              {sent ? (
                <div className="text-center space-y-4">
                  <div className="mx-auto w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
                    <CheckCircle2 className="h-7 w-7 text-accent" />
                  </div>
                  <p className="text-foreground/80">{t.auth.resetLinkSent}</p>
                  <p className="text-sm text-foreground/50">{t.auth.checkSpamFolder}</p>

                  {devResetUrl && (
                    <div className="p-3 rounded-lg bg-accent/10 border border-accent/20 text-left">
                      <p className="text-xs text-foreground/60 mb-1">Lien de test (dev uniquement) :</p>
                      <a href={devResetUrl} className="text-xs text-primary break-all hover:underline">
                        {devResetUrl}
                      </a>
                    </div>
                  )}

                  <Link href="/auth/signin" className="inline-block pt-2">
                    <Button variant="outline" className="bg-transparent">
                      <ArrowLeft className={`h-4 w-4 ${dir === "rtl" ? "ml-2 rotate-180" : "mr-2"}`} />
                      {t.auth.backToSignIn}
                    </Button>
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {error && (
                    <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="email">{t.auth.email}</Label>
                    <div className="relative">
                      <Mail
                        className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`}
                      />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="votre@email.com"
                        required
                        className={`${dir === "rtl" ? "pr-10" : "pl-10"} bg-card/50 border-border/50`}
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <div
                          className={`w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin ${dir === "rtl" ? "ml-2" : "mr-2"}`}
                        />
                        {t.common.loading}
                      </>
                    ) : (
                      <>
                        {t.auth.sendResetLink}
                        <ArrowRight
                          className={`h-5 w-5 transition-transform ${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"}`}
                        />
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <Link href="/auth/signin" className="text-sm text-primary hover:underline">
                      {t.auth.backToSignIn}
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
