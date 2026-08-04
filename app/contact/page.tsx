"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Send, Clock, MessageSquare, ExternalLink } from "lucide-react"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

/** Office location — Immeuble Omar bloc A, Montplaisir 1073, Tunis. */
const OFFICE_COORDS = "36.8228344,10.1950871"

/**
 * Single source of truth for every "open in Google Maps" link on this page.
 * Points at the IMBT Consulting Google Business listing, so it opens the
 * business card with hours, photos and directions.
 */
const MAPS_URL = "https://maps.app.goo.gl/ohGC63eMTPkKAk9Z7"

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
      value: "Immeuble Omar bloc A bur 3-2, Montplaisir, Tunis",
      // Explicit coordinates rather than a shortlink, so the pin always lands on
      // the office and stays in sync with the embedded map above.
      href: MAPS_URL,
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
                target={info.href.startsWith('http') ? "_blank" : undefined}
                rel={info.href.startsWith('http') ? "noopener noreferrer" : undefined}
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

            {/* Map */}
            <motion.div
              initial={{ opacity: 0, x: dir === 'rtl' ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative h-full min-h-[400px]"
            >
              <div className="absolute inset-0 rounded-3xl glass overflow-hidden glow-accent border border-border/50">
                {/* Queried by business name so the embed resolves to the IMBT
                    Consulting listing (name, hours, directions) instead of a bare
                    pin; `ll` keeps the view centred on the office regardless. */}
                <iframe
                  src={`https://maps.google.com/maps?q=IMBT+Consulting,+Montplaisir,+Tunis&ll=${OFFICE_COORDS}&z=17&hl=fr&output=embed`}
                  title="IMBT Consulting — Immeuble Omar bloc A, Montplaisir, Tunis"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'grayscale(0.5) invert(0.9) contrast(0.9)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="dark:opacity-80"
                />
                {/* Our own link to the office location. Google's built-in
                    "Open in Maps" overlay inside the iframe points wherever the
                    embed resolves, so we surface an explicit control instead. */}
                <a
                  href={MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute bottom-4 left-4 right-4 glass p-4 rounded-xl flex items-center gap-3 transition-colors hover:bg-card/80 group"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary">{t.contactPage.info.address.title}</p>
                    <p className="text-sm font-medium">Immeuble Omar bloc A, Montplaisir, Tunis</p>
                  </div>
                  <ExternalLink className={`h-4 w-4 text-foreground/50 group-hover:text-primary transition-colors shrink-0 ${dir === 'rtl' ? 'mr-auto' : 'ml-auto'}`} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
