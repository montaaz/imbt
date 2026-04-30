"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare } from "lucide-react"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@imbt-consulting.com",
    href: "mailto:contact@imbt-consulting.com",
  },
  {
    icon: Phone,
    title: "Téléphone",
    value: "+33 1 23 45 67 89",
    href: "tel:+33123456789",
  },
  {
    icon: MapPin,
    title: "Adresse",
    value: "Tunis, Tunisia",
    href: "#",
  },
  {
    icon: Clock,
    title: "Horaires",
    value: "Lun-Ven: 9h-18h",
    href: "#",
  },
]

import { useLanguage } from "@/lib/i18n/language-context"

export default function ContactPage() {
  const { t, dir } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const contactInfo = [
    {
      icon: Mail,
      title: t.contactPage.info.email.title,
      value: "contact@imbt-consulting.com",
      href: "mailto:contact@imbt-consulting.com",
    },
    {
      icon: Phone,
      title: t.contactPage.info.phone.title,
      value: "+216 54 621 308",
      href: "tel:+21654621308",
    },
    {
      icon: MapPin,
      title: t.contactPage.info.address.title,
      value: "Tunis, Tunisia",
      href: "#",
    },
    {
      icon: Clock,
      title: t.contactPage.info.hours.title,
      value: t.contactPage.info.hours.value,
      href: "#",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({ name: "", email: "", company: "", subject: "", message: "" })
  }

  return (
    <main className="min-h-screen bg-background">
      <FloatingShapes />
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">{t.common.contact}</span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              {t.contactPage.subtitle} <span className="gradient-text">{t.contactPage.title}</span>
            </h1>
            <p className="text-foreground/60 text-lg md:text-xl leading-relaxed">
              {t.contactPage.description}
            </p>
          </motion.div>

          {/* Contact Cards */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
          >
            {contactInfo.map((info, index) => (
              <a
                key={index}
                href={info.href}
                className="group p-6 rounded-2xl glass hover:bg-card/60 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors`}>
                  <info.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-1">{info.title}</h3>
                <p className="text-foreground/60 text-sm">{info.value}</p>
              </a>
            ))}
          </motion.div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{t.contactPage.form.title}</h2>
                  <p className="text-foreground/60">{t.contactPage.form.subtitle}</p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="p-8 rounded-2xl glass text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
                    <Send className={`h-8 w-8 text-accent ${dir === 'rtl' ? 'rotate-180' : ''}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{t.contactPage.form.successTitle}</h3>
                  <p className="text-foreground/60">
                    {t.contactPage.form.successMessage}
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="outline" className="mt-6 bg-transparent">
                    {t.contactPage.form.sendAnother}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">{t.contactPage.form.nameLabel}</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder={t.contactPage.form.namePlaceholder}
                        required
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">{t.contactPage.form.emailLabel}</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder={t.contactPage.form.emailPlaceholder}
                        required
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company">{t.contactPage.form.companyLabel}</Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder={t.contactPage.form.companyPlaceholder}
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">{t.contactPage.form.subjectLabel}</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder={t.contactPage.form.subjectPlaceholder}
                        required
                        className="bg-card/50 border-border/50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t.contactPage.form.messageLabel}</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder={t.contactPage.form.messagePlaceholder}
                      rows={6}
                      required
                      className="bg-card/50 border-border/50 resize-none"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full glow-primary bg-[#a80202] hover:bg-[#8a0101] border-0 text-white" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                        {t.contactPage.form.submitting}
                      </>
                    ) : (
                      <>
                        {t.contactPage.form.submitButton}
                        <Send className={`h-5 w-5 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map/Visual */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl glass p-8 glow-accent overflow-hidden">
                <div className="w-full h-full relative flex items-center justify-center">
                  {/* Abstract Location Visual */}
                  <div className="relative w-full h-full">
                    {/* Grid lines */}
                    <div className="absolute inset-0">
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={`h-${i}`}
                          className="absolute w-full h-px bg-primary/10"
                          style={{ top: `${(i + 1) * 10}%` }}
                        />
                      ))}
                      {[...Array(10)].map((_, i) => (
                        <div
                          key={`v-${i}`}
                          className="absolute h-full w-px bg-primary/10"
                          style={{ left: `${(i + 1) * 10}%` }}
                        />
                      ))}
                    </div>

                    {/* Animated dots */}
                    {[...Array(5)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full bg-accent"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: i * 0.3,
                        }}
                      />
                    ))}

                    {/* Main location pin */}
                    <motion.div
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                            <MapPin className="h-5 w-5 text-white" />
                          </div>
                        </div>
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-primary rounded-full opacity-50 animate-ping" />
                      </div>
                    </motion.div>

                    {/* City label */}
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
                      <div className="px-4 py-2 rounded-full glass">
                        <span className="text-lg font-semibold">Tunis, Tunisia</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
