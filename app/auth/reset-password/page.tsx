"use client"

import type React from "react"

import { Suspense, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Lock, ArrowRight, Eye, EyeOff, CheckCircle2, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n/language-context"
import Logo from "@/components/logo"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  const { t, dir } = useLanguage()

  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const [tokenValid, setTokenValid] = useState<boolean | null>(null)

  // Check the link before showing the form, so an expired link fails early.
  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      return
    }

    let cancelled = false
    fetch(`/api/auth/reset-password?token=${encodeURIComponent(token)}`)
      .then((res) => res.json())
      .then((data) => {
        if (!cancelled) setTokenValid(!!data.valid)
      })
      .catch(() => {
        if (!cancelled) setTokenValid(false)
      })

    return () => {
      cancelled = true
    }
  }, [token])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError(t.auth.passwordsMismatch)
      return
    }

    if (password.length < 6) {
      setError(t.auth.passwordTooShort)
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t.errors.somethingWrong)
        setIsLoading(false)
        return
      }

      setDone(true)
      setTimeout(() => router.push("/auth/signin"), 2500)
    } catch (err) {
      console.error("Reset password error:", err)
      setError(t.errors.somethingWrong)
      setIsLoading(false)
    }
  }

  if (tokenValid === false) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-destructive/15 flex items-center justify-center">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>
        <p className="text-foreground/80">{t.auth.invalidResetLink}</p>
        <Link href="/auth/forgot-password" className="inline-block pt-2">
          <Button variant="outline" className="bg-transparent">
            {t.auth.requestNewLink}
          </Button>
        </Link>
      </div>
    )
  }

  if (tokenValid === null) {
    return (
      <div className="flex justify-center py-8">
        <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (done) {
    return (
      <div className="text-center space-y-4">
        <div className="mx-auto w-14 h-14 rounded-full bg-accent/15 flex items-center justify-center">
          <CheckCircle2 className="h-7 w-7 text-accent" />
        </div>
        <p className="text-foreground/80">{t.auth.passwordResetSuccess}</p>
        <Link href="/auth/signin" className="inline-block pt-2">
          <Button className="bg-[#a80202] text-white hover:bg-[#8a0101] border-0">
            {t.auth.signInButton}
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="password">{t.auth.newPassword}</Label>
        <div className="relative">
          <Lock
            className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`}
          />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className={`${dir === "rtl" ? "pr-10 pl-10" : "pl-10 pr-10"} bg-card/50 border-border/50`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className={`absolute ${dir === "rtl" ? "left-3" : "right-3"} top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground`}
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-foreground/50">{t.auth.minCharacters}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
        <div className="relative">
          <Lock
            className={`absolute ${dir === "rtl" ? "right-3" : "left-3"} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`}
          />
          <Input
            id="confirmPassword"
            type={showPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
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
            {t.auth.resetPasswordButton}
            <ArrowRight
              className={`h-5 w-5 transition-transform ${dir === "rtl" ? "mr-2 rotate-180" : "ml-2"}`}
            />
          </>
        )}
      </Button>
    </form>
  )
}

export default function ResetPasswordPage() {
  const { t } = useLanguage()

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
              <h1 className="text-3xl font-bold mb-2">{t.auth.resetPasswordTitle}</h1>
              <p className="text-foreground/60">{t.auth.resetPasswordSubtitle}</p>
            </div>

            <div className="p-8 rounded-3xl glass glow-primary">
              <Suspense
                fallback={
                  <div className="flex justify-center py-8">
                    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                  </div>
                }
              >
                <ResetPasswordForm />
              </Suspense>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
