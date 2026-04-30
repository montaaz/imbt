"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Lock, User, Building, ArrowRight, Eye, EyeOff, Phone } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { GoogleSignInButton } from "@/components/google-signin-button-simple"
import { useLanguage } from "@/lib/i18n/language-context"
import { PhoneInput } from "@/components/ui/phone-input"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function SignUpPage() {
  const router = useRouter()
  const { t, dir } = useLanguage()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError(t.auth.passwordsMismatch)
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError(t.auth.passwordTooShort)
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch("/api/client/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          company: formData.company,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || t.errors.somethingWrong)
        setIsLoading(false)
        return
      }

      // Store token and client data
      localStorage.setItem("client_token", data.token)
      localStorage.setItem(
        "client",
        JSON.stringify({
          id: data.client.id,
          email: data.client.email,
          name: `${data.client.firstName} ${data.client.lastName}`,
        }),
      )

      // Redirect to dashboard
      router.push("/dashboard")
    } catch (error) {
      console.error("Signup error:", error)
      setError(t.errors.somethingWrong)
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background">
      <ParticleField />
      <Navigation />

      <section className="relative min-h-screen flex items-center justify-center pt-24 pb-10">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-lg mx-auto"
          >
            <div className="text-center mb-8">
              <Link href="/" className="inline-block mb-6">
                <img src="/logo.png" alt="IMBT Consulting" className="h-12 w-auto mx-auto" />
              </Link>
              <h1 className="text-3xl font-bold mb-2">{t.auth.signUp}</h1>
              <p className="text-foreground/60">{t.auth.joinIMBT}</p>
            </div>

            <div className="p-8 rounded-3xl glass glow-primary">
              <form onSubmit={handleSubmit} className="space-y-5">
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">{t.auth.firstName}</Label>
                    <div className="relative">
                      <User className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                        placeholder={t.auth.firstName}
                        required
                        className={`${dir === 'rtl' ? 'pr-10' : 'pl-10'} bg-card/50 border-border/50`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">{t.auth.lastName}</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      placeholder={t.auth.lastName}
                      required
                      className="bg-card/50 border-border/50"
                    />
                  </div>
                </div>

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

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">{t.auth.phone}</Label>
                    <div className="relative">
                      <PhoneInput
                        id="phone"
                        value={formData.phone as any}
                        onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                        defaultCountry="FR"
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">{t.auth.company}</Label>
                    <div className="relative">
                      <Building className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t.auth.company}
                        className={`${dir === 'rtl' ? 'pr-10' : 'pl-10'} bg-card/50 border-border/50`}
                      />
                    </div>
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
                  <p className="text-xs text-foreground/50">{t.auth.minCharacters}</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">{t.auth.confirmPassword}</Label>
                  <div className="relative">
                    <Lock className={`absolute ${dir === 'rtl' ? 'right-3' : 'left-3'} top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40`} />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      placeholder="••••••••"
                      required
                      className={`${dir === 'rtl' ? 'pr-10' : 'pl-10'} bg-card/50 border-border/50`}
                    />
                  </div>
                </div>

                <div className="flex items-start gap-2">
                  <input type="checkbox" required className="w-4 h-4 rounded border-border bg-card/50 mt-1" />
                  <span className="text-sm text-foreground/60">
                    {t.auth.acceptTerms}{" "}
                    <Link href="/cgv" className="text-primary hover:underline">
                      {t.auth.termsAndConditions}
                    </Link>
                    {" "}{t.common.and}{" "}
                    <Link href="/confidentialite" className="text-primary hover:underline">
                      {t.auth.privacyPolicy}
                    </Link>
                  </span>
                </div>

                <Button type="submit" className="w-full glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className={`w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin ${dir === 'rtl' ? 'ml-2' : 'mr-2'}`} />
                      {t.auth.signingUp}
                    </>
                  ) : (
                    <>
                      {t.auth.signUpButton}
                      <ArrowRight className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                    </>
                  )}
                </Button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="flex-1 border-t border-border/50"></div>
                <span className="text-sm text-foreground/40">{t.auth.or}</span>
                <div className="flex-1 border-t border-border/50"></div>
              </div>

              <GoogleSignInButton
                onError={(error) => setError(error)}
              />

              <div className="mt-6 text-center">
                <p className="text-foreground/60 text-sm">
                  {t.auth.alreadyHaveAccount}{" "}
                  <Link href="/auth/signin" className="text-primary hover:underline font-medium">
                    {t.auth.signInButton}
                  </Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
