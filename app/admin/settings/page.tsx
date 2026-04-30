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

import { useLanguage } from "@/lib/i18n/language-context"

export default function SettingsPage() {
  const router = useRouter()
  const { t, dir, language } = useLanguage()
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
        throw new Error(t.admin.errorSettings)
      }

      const data = await response.json()
      setSettingsByCategory(data.settingsByCategory)
      setOriginalSettings(JSON.parse(JSON.stringify(data.settingsByCategory)))
      setIsLoading(false)
    } catch (error) {
      console.error("Error fetching settings:", error)
      setError(t.admin.errorSettings)
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
        setError(data.error || t.common.error)
        setIsSaving(false)
        return
      }

      setSuccess(t.admin.successSettings)
      setOriginalSettings(JSON.parse(JSON.stringify(settingsByCategory)))
      setHasChanges(false)
      setIsSaving(false)

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(""), 3000)
    } catch (error) {
      console.error("Error saving settings:", error)
      setError(t.admin.errorSettings)
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
      general: t.admin.generalSettings,
      notifications: t.admin.notifications,
      reservations: t.admin.reservationsCategory,
    }
    return titles[category] || category.charAt(0).toUpperCase() + category.slice(1)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex" dir={dir}>
      <AdminSidebar />
      <main className={`flex-1 p-4 sm:p-6 lg:p-8 pt-20 lg:pt-8 ${dir === 'rtl' ? 'lg:mr-64' : 'lg:ml-64'}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className={`flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
              <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">{t.admin.settingsTitle}</h1>
                <p className="text-foreground/60">{t.admin.settingsDesc}</p>
              </div>
              <div className={`flex gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                {hasChanges && (
                  <Button variant="outline" onClick={handleReset} className="flex-1 sm:flex-none border-white/10 bg-transparent">
                    {t.admin.reset}
                  </Button>
                )}
                <Button onClick={handleSave} disabled={!hasChanges || isSaving} className="glow-primary bg-[#a80202] text-white hover:bg-[#8a0101] border-0 flex-1 sm:flex-none min-w-[120px]">
                  {isSaving ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      <span className="hidden sm:inline">{t.admin.savingSettings}</span>
                    </>
                  ) : (
                    <>
                      <Save className={`${dir === 'rtl' ? 'ml-2' : 'mr-2'} h-5 w-5`} />
                      <span className="hidden sm:inline">{t.admin.saveSettings}</span>
                    </>
                  )}
                </Button>
              </div>
            </div>

            {error && (
              <div className={`mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
                {error}
              </div>
            )}

            {success && (
              <div className={`mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-500 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
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
                    className="glass glow-primary rounded-2xl p-6 border-white/5"
                  >
                    <div className={`flex items-center gap-3 mb-6 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                      <div className="p-3 rounded-xl bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold">{getCategoryTitle(category)}</h2>
                    </div>

                    <div className="space-y-4">
                      {settings.map((setting) => (
                        <div key={setting.key} className="space-y-2">
                          <div className={`flex items-start justify-between ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                            <div className={`flex-1 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}>
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
                              <span className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                {t.admin.publicBadge}
                              </span>
                            )}
                          </div>

                          {setting.key === "business_hours" ? (
                            <textarea
                              id={setting.key}
                              value={setting.value}
                              onChange={(e) => handleChange(category, setting.key, e.target.value)}
                              rows={6}
                              className={`w-full px-3 py-2 bg-card/30 border border-white/5 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 font-mono text-sm ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
                            />
                          ) : setting.key.includes("enable") || setting.key.includes("auto") ? (
                            <div className={`flex items-center gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                              <button
                                type="button"
                                onClick={() =>
                                  handleChange(category, setting.key, setting.value === "true" ? "false" : "true")
                                }
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                  setting.value === "true" ? "bg-primary" : "bg-white/10"
                                }`}
                              >
                                <span
                                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                    setting.value === "true" 
                                      ? (dir === 'rtl' ? '-translate-x-6' : 'translate-x-6') 
                                      : (dir === 'rtl' ? '-translate-x-1' : 'translate-x-1')
                                  }`}
                                />
                              </button>
                              <span className="text-sm text-foreground/60">
                                {setting.value === "true" ? t.admin.enabled : t.admin.disabled}
                              </span>
                            </div>
                          ) : (
                            <Input
                              id={setting.key}
                              type={setting.key.includes("email") ? "email" : "text"}
                              value={setting.value}
                              onChange={(e) => handleChange(category, setting.key, e.target.value)}
                              className={`bg-card/30 border-white/5 rounded-xl h-11 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
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
              className={`mt-6 p-6 rounded-2xl bg-accent/5 border border-white/5 ${dir === 'rtl' ? 'text-right' : 'text-left'}`}
            >
              <div className={`flex items-start gap-3 ${dir === 'rtl' ? 'flex-row-reverse' : ''}`}>
                <Shield className="h-5 w-5 text-accent mt-1" />
                <div className={dir === 'rtl' ? 'text-right' : 'text-left'}>
                  <h3 className="font-semibold mb-2">{t.admin.securityNotice}</h3>
                  <p className="text-sm text-foreground/60">
                    {t.admin.securityNoticeDesc}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </div>
  )
}
