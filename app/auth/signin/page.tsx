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

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

export default function SignInPage() {
  const router = useRouter()
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

    // Demo authentication - in production, this would connect to your backend
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // For demo purposes - check for demo credentials
    if (formData.email === "admin@imbt.com" && formData.password === "admin123") {
      localStorage.setItem("user", JSON.stringify({ email: formData.email, role: "admin", name: "Admin" }))
      router.push("/admin")
    } else if (formData.email && formData.password) {
      localStorage.setItem("user", JSON.stringify({ email: formData.email, role: "user", name: "Utilisateur" }))
      router.push("/reservation")
    } else {
      setError("Identifiants incorrects")
    }

    setIsLoading(false)
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
                <span className="text-3xl font-bold gradient-text">IMBT</span>
              </Link>
              <h1 className="text-3xl font-bold mb-2">Connexion</h1>
              <p className="text-foreground/60">Accédez à votre espace personnel</p>
            </div>

            <div className="p-8 rounded-3xl glass glow-primary">
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-sm">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="votre@email.com"
                      required
                      className="pl-10 bg-card/50 border-border/50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Mot de passe</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-foreground/40" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      required
                      className="pl-10 pr-10 bg-card/50 border-border/50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border bg-card/50" />
                    <span className="text-sm text-foreground/60">Se souvenir de moi</span>
                  </label>
                  <Link href="/auth/forgot-password" className="text-sm text-primary hover:underline">
                    Mot de passe oublié ?
                  </Link>
                </div>

                <Button type="submit" className="w-full glow-primary" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Connexion...
                    </>
                  ) : (
                    <>
                      Se connecter
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-foreground/60 text-sm">
                  {"Pas encore de compte ? "}
                  <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                    Créer un compte
                  </Link>
                </p>
              </div>

              {/* Demo credentials */}
              <div className="mt-6 p-4 rounded-lg bg-accent/10 border border-accent/20">
                <p className="text-sm text-foreground/60 mb-2">Compte admin pour démo:</p>
                <p className="text-xs text-foreground/50">Email: admin@imbt.com</p>
                <p className="text-xs text-foreground/50">Mot de passe: admin123</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
