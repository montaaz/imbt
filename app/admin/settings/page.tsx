"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Save, Plus, Trash2, Settings as SettingsIcon, Globe, Bell, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import AdminSidebar from "@/components/admin-sidebar"

interface Setting {
  id: number
  key: string
  value: string
  category: string
  description: string | null
  is_public: boolean
  updated_at: string
}

interface SettingsByCategory {
  [category: string]: Setting[]
}

export default function SettingsPage() {
  const router = useRouter()
  const [settingsByCategory, setSettingsByCategory] = useState<SettingsByCategory>({})
  const [originalSettings, setOriginalSettings] = useState<SettingsByCategory>({})
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      const response = await fetch("/api/settings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push("/auth/signin")
          return
        }
        throw new Error("Erreur lors de la récupération des paramètres")
      }

      const data = await response.json()
      setSettingsByCategory(data.settingsByCategory)
      setOriginalSettings(JSON.parse(JSON.stringify(data.settingsByCategory)))
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching settings:", error)
      setError("Erreur lors de la récupération des paramètres")
      setIsLoading(false)
    }
  }

  const handleChange = (category: string, key: string, value: string) => {
    setSettingsByCategory((prev) => ({
      ...prev,
      [category]: prev[category].map((setting) =>
        setting.key === key ? { ...setting, value } : setting
      ),
    }))
    setHasChanges(true)
  }

  const handleSave = async () => {
    setIsSaving(true)
    setError("")
    setSuccess("")

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        router.push("/auth/signin")
        return
      }

      // Flatten all settings
      const allSettings: { key: string; value: string }[] = []
      Object.values(settingsByCategory).forEach((categorySettings) => {
        categorySettings.forEach((setting) => {
          allSettings.push({ key: setting.key, value: setting.value })
        })
      })

      const response = await fetch("/api/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ settings: allSettings }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || "Une erreur est survenue")
        setIsSaving(false)
        return
      }

      setSuccess("Paramètres enregistrés avec succès")
      setOriginalSettings(JSON.parse(JSON.stringify(settingsByCategory)))
      setHasChanges(false)
      setIsSaving(false)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setError("Une erreur est survenue lors de l'enregistrement")
      setIsSaving(false)
    }
  }

  const handleReset = () => {
    setSettingsByCategory(JSON.parse(JSON.stringify(originalSettings)))
    setHasChanges(false)
    setError("")
    setSuccess("")
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "general":
        return Globe
      case "notifications":
        return Bell
      case "reservations":
        return Calendar
      default:
        return SettingsIcon
    }
  }

  const getCategoryTitle = (category: string) => {
    const titles: Record<string, string> = {
      general: "Paramètres Généraux",
      notifications: "Notifications",
      reservations: "Réservations",
    }
    return titles[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:ml-64 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8">
        <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-2">Paramètres</h1>
              <p className="text-foreground/60">Configurez votre application</p>
            </div>
            <div className="flex gap-3">
              {hasChanges && (
                <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none">
                  Annuler
                </Button>
              )}
              <Button onClick={handleSave} disabled={!hasChanges || isSaving} className="glow-primary flex-1 sm:flex-none">
                {isSaving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                    <span className="hidden sm:inline">Enregistrement...</span>
                    <span className="sm:hidden">...</span>
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-5 w-5" />
                    <span className="hidden sm:inline">Enregistrer</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-green-500">
              {success}
            </div>
          )}

          <div className="space-y-6">
            {Object.entries(settingsByCategory).map(([category, settings]) => {
              const Icon = getCategoryIcon(category)
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="glass glow-primary rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-3 rounded-xl bg-primary/20">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h2 className="text-xl font-bold">{getCategoryTitle(category)}</h2>
                  </div>

                  <div className="space-y-4">
                    {settings.map((setting) => (
                      <div key={setting.key} className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <Label htmlFor={setting.key} className="text-sm font-medium">
                              {setting.key
                                .split("_")
                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                .join(" ")}
                            </Label>
                            {setting.description && (
                              <p className="text-xs text-foreground/60 mt-1">{setting.description}</p>
                            )}
                          </div>
                          {setting.is_public && (
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-500 border border-blue-500/30">
                              Public
                            </span>
                          )}
                        </div>

                        {setting.key === "business_hours" ? (
                          <textarea
                            id={setting.key}
                            value={setting.value}
                            onChange={(e) => handleChange(category, setting.key, e.target.value)}
                            rows={6}
                            className="w-full px-3 py-2 bg-card/50 border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
                          />
                        ) : setting.key.includes("enable") || setting.key.includes("auto") ? (
                          <div className="flex items-center gap-3">
                            <button
                              type="button"
                              onClick={() =>
                                handleChange(category, setting.key, setting.value === "true" ? "false" : "true")
                              }
                              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                setting.value === "true" ? "bg-primary" : "bg-foreground/20"
                              }`}
                            >
                              <span
                                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                  setting.value === "true" ? "translate-x-6" : "translate-x-1"
                                }`}
                              />
                            </button>
                            <span className="text-sm text-foreground/60">
                              {setting.value === "true" ? "Activé" : "Désactivé"}
                            </span>
                          </div>
                        ) : (
                          <Input
                            id={setting.key}
                            type={setting.key.includes("email") ? "email" : "text"}
                            value={setting.value}
                            onChange={(e) => handleChange(category, setting.key, e.target.value)}
                            className="bg-card/50 border-border/50"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Security Notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-6 p-6 rounded-2xl bg-accent/10 border border-accent/20"
          >
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-accent mt-1" />
              <div>
                <h3 className="font-semibold mb-2">Note de Sécurité</h3>
                <p className="text-sm text-foreground/60">
                  Les paramètres marqués comme "Public" sont accessibles via l'API publique. Assurez-vous de ne pas
                  exposer d'informations sensibles dans ces paramètres.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </div>
  )
}
