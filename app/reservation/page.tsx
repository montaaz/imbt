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
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

const services = [
  { id: "transformation", icon: Rocket, label: "Transformation Digitale", duration: "1h30" },
  { id: "developpement", icon: Monitor, label: "Développement Web", duration: "1h" },
  { id: "formation", icon: GraduationCap, label: "Formation", duration: "2h" },
  { id: "marketing", icon: TrendingUp, label: "Marketing Digital", duration: "1h" },
]

const timeSlots = ["09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00"]

const DAYS_FR = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
const MONTHS_FR = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
]

function FullCalendar({
  selectedDate,
  onSelectDate,
}: {
  selectedDate: string
  onSelectDate: (date: string) => void
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
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={goToPreviousMonth}
          disabled={isPastMonth()}
          className="bg-transparent border-border/50 hover:bg-primary/10 hover:border-primary disabled:opacity-30"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>

        <motion.h3
          key={`${currentMonth}-${currentYear}`}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xl font-bold"
        >
          {MONTHS_FR[currentMonth]} {currentYear}
        </motion.h3>

        <Button
          variant="outline"
          size="icon"
          onClick={goToNextMonth}
          className="bg-transparent border-border/50 hover:bg-primary/10 hover:border-primary"
        >
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_FR.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-foreground/50 py-2">
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
          className="grid grid-cols-7 gap-1"
        >
          {calendarDays.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} className="aspect-square" />
            }

            const dateStr = date.toISOString().split("T")[0]
            const isSelected = selectedDate === dateStr
            const isDisabled = isDateDisabled(date)
            const isToday = date.toDateString() === today.toDateString()

            return (
              <motion.button
                key={dateStr}
                whileHover={!isDisabled ? { scale: 1.1 } : {}}
                whileTap={!isDisabled ? { scale: 0.95 } : {}}
                onClick={() => !isDisabled && onSelectDate(dateStr)}
                disabled={isDisabled}
                className={`
                  aspect-square rounded-xl flex items-center justify-center text-sm font-medium
                  transition-all duration-200 relative
                  ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                      : isDisabled
                        ? "text-foreground/20 cursor-not-allowed"
                        : "hover:bg-primary/20 hover:text-primary"
                  }
                  ${isToday && !isSelected ? "ring-2 ring-accent ring-offset-2 ring-offset-background" : ""}
                `}
              >
                {date.getDate()}
                {isSelected && (
                  <motion.div
                    layoutId="selected-date"
                    className="absolute inset-0 bg-primary rounded-xl -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-6 text-sm text-foreground/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full ring-2 ring-accent" />
          <span>Aujourd'hui</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-primary" />
          <span>Sélectionné</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-foreground/20" />
          <span>Indisponible</span>
        </div>
      </div>
    </div>
  )
}

export default function ReservationPage() {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [user, setUser] = useState<{ name?: string; email?: string; phone?: string; company?: string } | null>(null)

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

  const handleSubmit = async () => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setSubmitted(true)
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
              className="max-w-lg mx-auto text-center p-12 rounded-3xl glass glow-accent"
            >
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="h-10 w-10 text-accent" />
              </div>
              <h1 className="text-3xl font-bold mb-4">Réservation confirmée !</h1>
              <p className="text-foreground/60 mb-6">
                Votre consultation a été réservée avec succès. Vous recevrez un email de confirmation avec tous les
                détails.
              </p>

              <div className="p-6 rounded-2xl bg-card/50 mb-8 text-left">
                <h3 className="font-semibold mb-4">Récapitulatif</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Service:</span>
                    <span className="font-medium">{selectedService?.label}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Date:</span>
                    <span className="font-medium">
                      {formData.date &&
                        new Date(formData.date).toLocaleDateString("fr-FR", {
                          weekday: "long",
                          day: "numeric",
                          month: "long",
                        })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Heure:</span>
                    <span className="font-medium">{formData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">Durée:</span>
                    <span className="font-medium">{selectedService?.duration}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button variant="outline" className="bg-transparent">
                    Retour à l'accueil
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
                    })
                  }}
                  className="glow-primary"
                >
                  Nouvelle réservation
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

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">Réservation</span>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                Réservez votre <span className="gradient-text">consultation</span>
              </h1>
              <p className="text-foreground/60 text-lg">
                Choisissez le service souhaité et sélectionnez un créneau qui vous convient.
              </p>

              {!user && (
                <p className="mt-4 text-sm text-foreground/50">
                  <Link href="/auth/signin" className="text-primary hover:underline">
                    Connectez-vous
                  </Link>
                  {" pour pré-remplir vos informations"}
                </p>
              )}
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-12">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      scale: step === s ? 1.1 : 1,
                      backgroundColor: step >= s ? "hsl(var(--primary))" : "hsl(var(--muted))",
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors ${
                      step >= s ? "text-primary-foreground" : "text-muted-foreground"
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                  </motion.div>
                  {s < 3 && (
                    <motion.div
                      initial={false}
                      animate={{ backgroundColor: step > s ? "hsl(var(--primary))" : "hsl(var(--muted))" }}
                      className="w-16 h-1 mx-2"
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="p-8 rounded-3xl glass glow-primary">
              <AnimatePresence mode="wait">
                {/* Step 1: Select Service */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    <h2 className="text-2xl font-bold mb-6">Choisissez un service</h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {services.map((service, index) => (
                        <motion.button
                          key={service.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setFormData({ ...formData, service: service.id })}
                          className={`p-6 rounded-2xl border-2 transition-all text-left ${
                            formData.service === service.id
                              ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
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
                      <Button onClick={() => setStep(2)} disabled={!formData.service} className="glow-primary">
                        Continuer
                        <ArrowRight className="ml-2 h-5 w-5" />
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
                    <h2 className="text-2xl font-bold">Choisissez une date et un créneau</h2>

                    {/* Full Calendar */}
                    <div className="p-6 rounded-2xl bg-card/30 border border-border/50">
                      <div className="flex items-center gap-2 mb-4">
                        <Calendar className="h-5 w-5 text-primary" />
                        <Label className="text-lg font-medium">Sélectionnez une date</Label>
                      </div>
                      <FullCalendar
                        selectedDate={formData.date}
                        onSelectDate={(date) => setFormData({ ...formData, date, time: "" })}
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
                              Horaires disponibles pour le{" "}
                              {new Date(formData.date).toLocaleDateString("fr-FR", {
                                weekday: "long",
                                day: "numeric",
                                month: "long",
                              })}
                            </Label>
                          </div>
                          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                            {timeSlots.map((time, index) => {
                              const isSelected = formData.time === time
                              return (
                                <motion.button
                                  key={time}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: index * 0.05 }}
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={() => setFormData({ ...formData, time })}
                                  className={`px-4 py-3 rounded-xl border-2 font-medium transition-all ${
                                    isSelected
                                      ? "border-primary bg-primary text-primary-foreground shadow-lg shadow-primary/30"
                                      : "border-border hover:border-primary/50 hover:bg-primary/10"
                                  }`}
                                >
                                  {time}
                                </motion.button>
                              )
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => setStep(1)} className="bg-transparent">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Retour
                      </Button>
                      <Button
                        onClick={() => setStep(3)}
                        disabled={!formData.date || !formData.time}
                        className="glow-primary"
                      >
                        Continuer
                        <ArrowRight className="ml-2 h-5 w-5" />
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
                    <h2 className="text-2xl font-bold mb-6">Vos informations</h2>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          <User className="h-4 w-4 inline mr-2" />
                          Prénom
                        </Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          placeholder="Votre prénom"
                          required
                          className="bg-card/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Nom</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          placeholder="Votre nom"
                          required
                          className="bg-card/50 border-border/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        <Mail className="h-4 w-4 inline mr-2" />
                        Email
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
                          Téléphone
                        </Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+33 6 12 34 56 78"
                          className="bg-card/50 border-border/50"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="company">
                          <Building className="h-4 w-4 inline mr-2" />
                          Entreprise
                        </Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Votre entreprise"
                          className="bg-card/50 border-border/50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">
                        <MessageSquare className="h-4 w-4 inline mr-2" />
                        Message (optionnel)
                      </Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Décrivez brièvement votre projet ou vos besoins..."
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
                        Récapitulatif de votre réservation
                      </h3>
                      <div className="grid sm:grid-cols-3 gap-4 text-sm">
                        <div className="p-3 rounded-lg bg-background/50">
                          <span className="text-foreground/60 block mb-1">Service</span>
                          <p className="font-medium">{selectedService?.label}</p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50">
                          <span className="text-foreground/60 block mb-1">Date</span>
                          <p className="font-medium">
                            {formData.date &&
                              new Date(formData.date).toLocaleDateString("fr-FR", {
                                weekday: "short",
                                day: "numeric",
                                month: "long",
                              })}
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-background/50">
                          <span className="text-foreground/60 block mb-1">Heure</span>
                          <p className="font-medium">
                            {formData.time} ({selectedService?.duration})
                          </p>
                        </div>
                      </div>
                    </motion.div>

                    <div className="flex justify-between pt-4">
                      <Button variant="outline" onClick={() => setStep(2)} className="bg-transparent">
                        <ArrowLeft className="mr-2 h-5 w-5" />
                        Retour
                      </Button>
                      <Button
                        onClick={handleSubmit}
                        disabled={!formData.firstName || !formData.lastName || !formData.email || isSubmitting}
                        className="glow-primary min-w-[180px]"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full"
                          />
                        ) : (
                          <>
                            Confirmer
                            <CheckCircle2 className="ml-2 h-5 w-5" />
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
