"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Rocket,
  Monitor,
  GraduationCap,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  Lock,
  Eye,
  EyeOff,
  LogIn,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { GoogleSignInButton, isGoogleSignInEnabled } from "@/components/google-signin-button-simple"
import { useLanguage } from "@/lib/i18n/language-context"
import { PhoneInput } from "@/components/ui/phone-input"
import { notifyAuthChange } from "@/hooks/use-auth"

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

function FullCalendar({
  selectedDate,
  onSelectDate,
  t,
  dir,
}: {
  selectedDate: string
  onSelectDate: (date: string) => void
  t: any
  dir: string
}) {
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear)
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear)
    const days: (Date | null)[] = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(currentYear, currentMonth, day))
    }

    return days
  }

  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  const isDateDisabled = (date: Date) => {
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate())
    // Disable past dates, today, and weekends
    return date <= todayStart || date.getDay() === 0 || date.getDay() === 6
  }

  const isPastMonth = () => {
    return currentYear < today.getFullYear() || (currentYear === today.getFullYear() && currentMonth < today.getMonth())
  }

  const calendarDays = generateCalendarDays()

  return (
    <div className="w-full">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousMonth}
          disabled={isPastMonth()}
          className="bg-transparent border-border/50 hover:bg-primary/10 hover:border-primary disabled:opacity-30 h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronLeft className={`h-4 w-4 sm:h-5 sm:w-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </Button>

        <motion.h3
          key={`${currentMonth}-${currentYear}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-base sm:text-lg md:text-xl font-bold"
        >
          {t.reservation.months[currentMonth]} {currentYear}
        </motion.h3>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextMonth}
          className="bg-transparent border-border/50 hover:bg-primary/10 hover:border-primary h-8 w-8 sm:h-10 sm:w-10"
        >
          <ChevronRight className={`h-4 w-4 sm:h-5 sm:w-5 ${dir === 'rtl' ? 'rotate-180' : ''}`} />
        </Button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
        {t.reservation.days.map((day: string) => (
          <div key={day} className="text-center text-[10px] sm:text-xs md:text-sm font-medium text-foreground/50 py-1 sm:py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${currentMonth}-${currentYear}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-7 gap-0.5 sm:gap-1"
        >
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const dateStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
            const isSelected = selectedDate === dateStr
            const isDisabled = isDateDisabled(date)
            const isToday = date.toDateString() === today.toDateString()

            return (
              <motion.button
                key={dateStr}
                whileHover={!isDisabled ? { scale: 1.05 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && onSelectDate(dateStr)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-lg sm:rounded-xl flex items-center justify-center text-xs sm:text-sm font-medium
                  transition-all duration-200 relative
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md sm:shadow-lg shadow-primary/30"
                      : isDisabled
                        ? "text-foreground/20 cursor-not-allowed"
                        : "hover:bg-primary/20 hover:text-primary"
                  }
                  ${isToday && !isSelected ? "ring-1 sm:ring-2 ring-accent ring-offset-1 sm:ring-offset-2 ring-offset-background" : ""}
                `}
              >
                {date.getDate()}
                {isSelected && (
                  <motion.div
                    layoutId="selected-date"
                    className="absolute inset-0 bg-primary rounded-lg sm:rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-center gap-3 sm:gap-6 mt-4 sm:mt-6 text-xs sm:text-sm text-foreground/50">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full ring-1 sm:ring-2 ring-accent" />
          <span>{t.reservation.today}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary" />
          <span>{t.reservation.selected}</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-foreground/20" />
          <span>{t.reservation.unavailable}</span>
        </div>
      </div>
    </div>
  )
}

export default function ReservationPage() {
  const { t, language, dir } = useLanguage()
  const locale = language === 'ar' ? 'ar-TN' : language === 'en' ? 'en-US' : 'fr-FR'
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [user, setUser] = useState<{ name?: string; email?: string; phone?: string; company?: string } | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [clientToken, setClientToken] = useState<string | null>(null)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const services = [
    { id: "transformation", icon: Rocket, label: t.serviceCards.transformation.title, duration: "30 m" },
    { id: "developpement", icon: Monitor, label: t.serviceCards.development.title, duration: "30 m" },
    { id: "formation", icon: GraduationCap, label: t.serviceCards.training.title, duration: "30 m" },
    { id: "marketing", icon: TrendingUp, label: t.serviceCards.marketing.title, duration: "30 m" },
  ]

  const [formData, setFormData] = useState({
    service: "",
    date: "",
    time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    password: "",
  })

  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      const userData = JSON.parse(storedUser)
      setUser(userData)
      const nameParts = (userData.name || "").split(" ")
      setFormData((prev) => ({
        ...prev,
        firstName: nameParts[0] || "",
        lastName: nameParts.slice(1).join(" ") || "",
        email: userData.email || "",
        phone: userData.phone || "",
        company: userData.company || "",
      }))
    }
  }, [])

  useEffect(() => {
    if (formData.date) {
      fetchAvailability(formData.date)
    }
  }, [formData.date])

  const fetchAvailability = async (date: string) => {
    setIsLoadingSlots(true)
    try {
      const response = await fetch(`/api/reservations?availability=true&date=${date}`)
      if (response.ok) {
        const data = await response.json()
        setBookedSlots(data.bookedSlots || [])
      }
    } catch (error) {
      console.error('Error fetching availability:', error)
    } finally {
      setIsLoadingSlots(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service: formData.service,
          date: formData.date,
          time: formData.time,
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Erreur lors de la réservation')
      }

      // If we got a token, store it for automatic login
      if (data.token) {
        setClientToken(data.token)
        localStorage.setItem("client_token", data.token)
        localStorage.setItem(
          "client",
          JSON.stringify({
            id: data.clientId,
            email: formData.email,
            name: `${formData.firstName} ${formData.lastName}`,
          })
        )
        notifyAuthChange()
      }

      // Success
      setIsSubmitting(false)
      setSubmitted(true)
    } catch (error) {
      console.error('Error submitting reservation:', error)
      setIsSubmitting(false)
      // Show error to user
      alert(error instanceof Error ? error.message : 'Erreur lors de la réservation. Veuillez réessayer.')
    }
  }

  const selectedService = services.find((s) => s.id === formData.service)

  if (submitted) {
    return (
      <main className="min-h-screen bg-background">
        <FloatingShapes />
        <Navigation />

        <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10">
          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-xl mx-auto text-center p-6 sm:p-10 md:p-12 rounded-[2rem] sm:rounded-[3rem] glass glow-accent"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6 sm:mb-8">
                <CheckCircle2 className="h-8 w-8 sm:h-10 sm:w-10 text-accent" />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">{t.reservation.confirmed}</h1>
              <p className="text-foreground/60 mb-6 sm:mb-8 text-sm sm:text-base px-2 sm:px-4 leading-relaxed">
                {t.reservation.confirmationEmail}
              </p>

              <div className="p-4 sm:p-6 rounded-2xl bg-card/40 border border-border/30 mb-8 sm:mb-10 text-left">
                <h3 className="font-semibold mb-4 text-accent/80 uppercase tracking-wider text-xs sm:text-sm">{t.reservation.summary}</h3>
                <div className="space-y-3 text-sm sm:text-base">
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border/10 pb-2 sm:pb-3">
                    <span className="text-foreground/50 mb-1 sm:mb-0">{t.reservation.service}:</span>
                    <span className="font-medium text-foreground">{selectedService?.label}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border/10 pb-2 sm:pb-3">
                    <span className="text-foreground/50 mb-1 sm:mb-0">{t.reservation.date}:</span>
                    <span className="font-medium text-foreground">
                      {formData.date &&
                        (() => {
                          const [year, month, day] = formData.date.split('-').map(Number)
                          const date = new Date(year, month - 1, day)
                          return date.toLocaleDateString(locale, {
                            weekday: "long",
                            day: "numeric",
                            month: "long",
                          })
                        })()}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between border-b border-border/10 pb-2 sm:pb-3">
                    <span className="text-foreground/50 mb-1 sm:mb-0">{t.reservation.time}:</span>
                    <span className="font-medium text-foreground">{formData.time}</span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between">
                    <span className="text-foreground/50 mb-1 sm:mb-0">{t.reservation.duration}:</span>
                    <span className="font-medium text-foreground">{selectedService?.duration}</span>
                  </div>
                </div>
              </div>

              {!clientToken && (
                <div className="mb-8 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <p className="text-foreground/60 mb-4 text-sm leading-relaxed">
                    {t.reservation.createAccountPrompt}
                  </p>
                  {isGoogleSignInEnabled && (
                    <div className="flex justify-center">
                      <GoogleSignInButton
                        onSuccess={() => {
                          window.location.href = '/dashboard'
                        }}
                        onError={(error) => {
                          console.error('Google sign-in error:', error)
                        }}
                      />
                    </div>
                  )}
                  <div className="mt-4 text-center">
                    <Link href="/auth/client-login" className="text-sm text-primary hover:underline font-medium">
                      {t.reservation.orSignInWithPassword}
                    </Link>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3 sm:gap-4 justify-center">
                {clientToken && (
                  <Link href="/dashboard" className="w-full sm:w-auto">
                    <Button className="glow-primary w-full sm:w-auto min-w-[140px]">
                      <LogIn className="mr-2 h-4 w-4" />
                      {t.reservation.viewDashboard}
                    </Button>
                  </Link>
                )}
                <Link href="/" className="w-full sm:w-auto">
                  <Button variant="outline" className="bg-transparent w-full sm:w-auto min-w-[140px]">
                    {t.reservation.backToHome}
                  </Button>
                </Link>
                <Button
                  onClick={() => {
                    setSubmitted(false)
                    setStep(1)
                    setFormData({
                      ...formData,
                      service: "",
                      date: "",
                      time: "",
                      message: "",
                      password: "",
                    })
                  }}
                  variant="outline"
                  className="w-full sm:w-auto min-w-[140px]"
                >
                  {t.reservation.newReservation}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <FloatingShapes />
      <Navigation />

      <section className="relative pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4 block">{t.common.reservation}</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 px-2">
                {t.reservation.subtitle} <span className="gradient-text">{t.nav.consulting}</span>
              </h1>
              <p className="text-foreground/60 text-sm sm:text-base md:text-lg px-4">
                {t.reservation.description}
              </p>

              {!user && (
                <p className="mt-4 text-sm text-foreground/50">
                  <Link href="/auth/signin" className="text-primary hover:underline">
                    {t.auth.signIn}
                  </Link>
                  {" " + t.reservation.createAccountDesc.toLowerCase()}
                </p>
              )}
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8 sm:mb-10 md:mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: step === s ? 1.1 : 1,
                      backgroundColor: step >= s ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    }}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-semibold transition-colors ${
                      step >= s ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5" /> : s}
                  </motion.div>
                  {s < 3 && (
                    <motion.div
                      initial={false}
                      animate={{ backgroundColor: step > s ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
                      className="w-8 sm:w-12 md:w-16 h-0.5 sm:h-1 mx-1 sm:mx-2"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl glass glow-primary">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Service */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4 sm:space-y-6"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">{t.reservation.chooseService}</h2>
                    <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                      {services.map((service, index) => (
                        <motion.button
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, service: service.id })}
                          className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all text-left ${
                            formData.service === service.id
                              ? "border-primary bg-primary/10 shadow-md sm:shadow-lg shadow-primary/20"
                              : "border-border hover:border-primary/50 bg-card/50"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <motion.div
                              animate={{
                                backgroundColor:
                                  formData.service === service.id ? "hsl(var(--primary))" : "hsl(var(--muted))",
                              }}
                              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                formData.service === service.id ? "text-primary-foreground" : ""
                              }`}
                            >
                              <service.icon className="h-6 w-6" />
                            </motion.div>
                            <div>
                              <h3 className="font-semibold mb-1">{service.label}</h3>
                              <p className="text-sm text-foreground/60">
                                <Clock className="h-3 w-3 inline mr-1" />
                                {service.duration}
                              </p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button onClick={() => setStep(2)} disabled={!formData.service} className="glow-primary bg-[#a80202] hover:bg-[#8a0101] border-0 text-white">
                        {t.reservation.continue}
                        <ArrowRight className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Select Date & Time - Using new full calendar */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-8"
                  >
                    <h2 className="text-2xl font-bold">{t.reservation.chooseDateTime}</h2>

                    {/* Full Calendar */}
                    <div className="p-6 rounded-2xl bg-card/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-medium">{t.reservation.selectDate}</Label>
                      </div>
                      <FullCalendar
                        selectedDate={formData.date}
                        onSelectDate={(date) => setFormData({ ...formData, date, time: "" })}
                        t={t}
                        dir={dir}
                      />
                    </div>

                    {/* Time Selection */}
                    <AnimatePresence>
                      {formData.date && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-6 rounded-2xl bg-card/30 border border-border/50"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <Clock className="h-5 w-5 text-primary" />
                            <Label className="text-lg font-medium">
                              {t.reservation.availableSlots}{" "}
                              {(() => {
                                const [year, month, day] = formData.date.split('-').map(Number)
                                const date = new Date(year, month - 1, day)
                                return date.toLocaleDateString(locale, {
                                  weekday: "long",
                                  day: "numeric",
                                  month: "long",
                                })
                              })()}
                            </Label>
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 relative">
                            {isLoadingSlots && (
                              <div className="absolute inset-0 bg-background/50 backdrop-blur-[1px] z-10 flex items-center justify-center rounded-xl">
                                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              </div>
                            )}
                            {timeSlots.map((time, index) => {
                              const isSelected = formData.time === time
                              const isBooked = bookedSlots.includes(time)
                              return (
                                <motion.button
                                  key={time}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={!isBooked ? { scale: 1.05 } : {}}
                                  whileTap={!isBooked ? { scale: 0.95 } : {}}
                                  onClick={() => !isBooked && setFormData({ ...formData, time })}
                                  disabled={isBooked}
                                  className={`px-4 py-3 rounded-xl border-2 font-medium transition-all relative ${
                                    isSelected
                                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                      : isBooked
                                        ? "border-border/30 bg-muted/20 text-foreground/20 cursor-not-allowed"
                                        : "border-border hover:border-primary/50 hover:bg-primary/10"
                                  }`}
                                >
                                  {time}
                                  {isBooked && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                      <div className="w-full h-[1px] bg-foreground/20 rotate-12" />
                                    </div>
                                  )}
                                </motion.button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                        <ArrowLeft className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'ml-2 rotate-180' : 'mr-2'}`} />
                        {t.common.back}
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={!formData.date || !formData.time}
                        className="glow-primary bg-[#a80202] hover:bg-[#8a0101] border-0 text-white"
                      >
                        {t.reservation.continue}
                        <ArrowRight className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </Button>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Contact Information */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">{t.reservation.yourInfo}</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          <User className="h-4 w-4 inline mr-2" />
                          {t.auth.firstName}
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder={t.auth.firstName}
                          required
                          className="bg-card/50 border-border/50"
                        />
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
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-2" />
                        {t.auth.email}
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="votre@email.com"
                        required
                        className="bg-card/50 border-border/50"
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          <Phone className="h-4 w-4 inline mr-2" />
                          {t.auth.phone}
                        </Label>
                        <PhoneInput
                          id="phone"
                          value={formData.phone as any}
                          onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                          defaultCountry="FR"
                          className="bg-card/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          <Building className="h-4 w-4 inline mr-2" />
                          {t.auth.company}
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder={t.auth.company}
                          className="bg-card/50 border-border/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">
                        <Lock className="h-4 w-4 inline mr-2" />
                        {t.reservation.createPassword}
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          placeholder={t.auth.minCharacters}
                          required
                          minLength={6}
                          className="bg-card/50 border-border/50 pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground"
                        >
                          {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                      </div>
                      <p className="text-xs text-foreground/60">
                        {t.reservation.passwordHint}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        <MessageSquare className="h-4 w-4 inline mr-2" />
                        {t.reservation.messageLabel}
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder={t.reservation.messagePlaceholder}
                        rows={4}
                        className="bg-card/50 border-border/50 resize-none"
                      />
                    </div>

                    {/* Summary */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                    >
                      <h3 className="font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        {t.reservation.summary}
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 rounded-lg bg-background/50">
                          <span className="text-foreground/60 block mb-1">{t.reservation.service}</span>
                          <p className="font-medium">{selectedService?.label}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50">
                          <span className="text-foreground/60 block mb-1">{t.reservation.date}</span>
                          <p className="font-medium">
                            {formData.date &&
                              (() => {
                                const [year, month, day] = formData.date.split('-').map(Number)
                                const date = new Date(year, month - 1, day)
                                return date.toLocaleDateString("fr-FR", {
                                  weekday: "short",
                                  day: "numeric",
                                  month: "long",
                                })
                              })()}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50">
                          <span className="text-foreground/60 block mb-1">{t.reservation.time}</span>
                          <p className="font-medium">
                            {formData.time} ({selectedService?.duration})
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex justify-between pt-6">
                      <Button variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                        <ArrowLeft className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'ml-2 rotate-180' : 'mr-2'}`} />
                        {t.common.back}
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !formData.firstName || !formData.lastName || !formData.email || (formData.password.length > 0 && formData.password.length < 6)}
                        className="glow-primary bg-[#a80202] hover:bg-[#8a0101] border-0 text-white"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                            {t.auth.signingUp}
                          </>
                        ) : (
                          <>
                            {t.reservation.confirmReservation}
                            <ArrowRight className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                          </>
                        )}
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
