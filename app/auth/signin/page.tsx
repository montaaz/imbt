"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/lib/i18n/language-context"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function SignInPage() {
  const router = useRouter()
  const { t, dir } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t.auth.invalidCredentials)
        setIsLoading(false)
        return
      }

      // Store token and user data
      localStorage.setItem("token", data.token)
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: data.user.id,
          email: data.user.email,
          name: `${data.user.firstName} ${data.user.lastName}`,
          role: data.user.role,
        })
      )

      // Redirect based on user role
      if (data.user.role === "admin" || data.user.role === "manager") {
        // Admins and managers go to admin dashboard
        router.push("/admin")
      } else {
        // Regular users go to their client dashboard
        // Also store client_token for dashboard compatibility
        localStorage.setItem("client_token", data.token)
        router.push("/dashboard")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError(t.errors.somethingWrong)
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
                <img src="/logo.png" alt="IMBT Consulting" className="h-12 w-auto mx-auto" />
              </Link>
              <h1 className="text-3xl font-bold mb-2">{t.auth.signIn}</h1>
              <p className="text-foreground/60">{t.auth.allRolesSpace}</p>
            </div>

            <div className="p-8 rounded-3xl glass glow-primary">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">{t.auth.email}</Label>
                  <div className="relative">
                    <Mail className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      className={`${dir === 'rtl' ? 'pr-10' : 'pl-10'} bg-card/50 border-border/50`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">{t.auth.password}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className={`${dir === 'rtl' ? 'pr-10 pl-10' : 'pl-10 pr-10'} bg-card/50 border-border/50`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute ${dir === 'rtl' ? 'left-3' : 'right-3'} top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground`}
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border bg-card/50" />
                    <span className="text-sm text-foreground/60">{t.auth.rememberMe}</span>
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    {t.auth.forgotPassword}
                  </Link>
                </div>

                <Button type="submit" className="w-full glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className={`w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                      {t.auth.signingIn}
                    </>
                  ) : (
                    <>
                      {t.auth.signInButton}
                      <ArrowRight className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-foreground/60 text-sm">
                  {t.auth.noAccount}{" "}
                  <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                    {t.auth.createAccount}
                  </Link>
                </p>
              </div>

              {/* Demo credentials */}
              <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground/60 mb-3 font-medium">{t.auth.demoAccountsAvailable}</p>
                <div className="space-y-3 text-xs">
                  <div className="pb-2 border-b border-accent/20">
                    <p className="text-foreground/70 font-medium mb-1">👨‍💼 {t.auth.administrator}:</p>
                    <p className="text-foreground/50 font-mono">admin@imbt-consulting.com / admin123</p>
                  </div>
                  <div className="pb-2 border-b border-accent/20">
                    <p className="text-foreground/70 font-medium mb-1">👔 {t.auth.manager}:</p>
                    <p className="text-foreground/50 font-mono">manager@test.com / password123</p>
                  </div>
                  <div>
                    <p className="text-foreground/70 font-medium mb-1">👤 {t.auth.client}:</p>
                    <p className="text-foreground/50 font-mono">client@test.com / password123</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
