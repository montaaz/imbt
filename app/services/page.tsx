"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import {
  Monitor,
  Rocket,
  GraduationCap,
  Users,
  Settings,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Zap,
  Shield,
  Clock,
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/i18n/language-context"

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

export default function ServicesPage() {
  const { t } = useLanguage()

  const services = [
    {
      icon: Rocket,
      titleKey: t.serviceCards.transformation.title,
      descriptionKey: t.serviceCards.transformation.description,
      features: [
        "Audit digital complet",
        "Stratégie de transformation",
        "Accompagnement au changement",
        "Mesure des performances",
      ],
      color: "from-primary to-primary/50",
      link: "/services/conseil-transformation-digitale",
    },
    {
      icon: Monitor,
      titleKey: t.serviceCards.development.title,
      descriptionKey: t.serviceCards.development.description,
      features: ["Sites web sur mesure", "Applications mobiles", "E-commerce", "Maintenance & support"],
      color: "from-accent to-accent/50",
      link: "/services/developpement-gestion-it",
    },
    {
      icon: GraduationCap,
      titleKey: t.serviceCards.training.title,
      descriptionKey: t.serviceCards.training.description,
      features: ["Formations personnalisées", "Ateliers pratiques", "Certifications reconnues", "Suivi post-formation"],
      color: "from-primary to-accent",
      link: "/services/formations-digitales",
    },
    {
      icon: Users,
      titleKey: t.serviceCards.crm.title,
      descriptionKey: t.serviceCards.crm.description,
      features: [
        "Analyse des besoins CRM",
        "Implémentation Salesforce/HubSpot",
        "Migration des données",
        "Formation des équipes",
      ],
      color: "from-accent to-primary",
      link: "/services/crm-gestion-relation-client",
    },
    {
      icon: Settings,
      titleKey: t.serviceCards.erp.title,
      descriptionKey: t.serviceCards.erp.description,
      features: [
        "Audit des processus",
        "Sélection de solution ERP",
        "Déploiement & intégration",
        "Optimisation continue",
      ],
      color: "from-primary/80 to-accent/80",
      link: "/services/erp-gestion-integree",
    },
    {
      icon: TrendingUp,
      titleKey: t.serviceCards.marketing.title,
      descriptionKey: t.serviceCards.marketing.description,
      features: ["SEO & SEA", "Réseaux sociaux", "Email marketing", "Analytics & reporting"],
      color: "from-accent/80 to-primary/80",
      link: "/services/marketing-digital",
    },
  ]

  const benefits = [
    { icon: Zap, title: "Rapidité", description: "Résultats visibles en quelques semaines" },
    { icon: Shield, title: "Expertise", description: "10+ ans d'expérience dans le digital" },
    { icon: Clock, title: "Support 24/7", description: "Accompagnement continu" },
  ]
  const heroRef = useRef<HTMLElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-detail-card",
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <FloatingShapes />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">{t.common.services}</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              {t.servicesSection.title} <span className="gradient-text">{t.servicesSection.subtitle}</span>
            </h1>
            <p className="text-foreground/60 text-xl leading-relaxed max-w-2xl mx-auto">
              {t.servicesSection.description}
            </p>
          </motion.div>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-4 p-6 rounded-2xl glass">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-foreground/60">{benefit.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Detail Section */}
      <section className="py-20">
        <div ref={servicesRef} className="container mx-auto px-6">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`service-detail-card grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6`}
                  >
                    <service.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">{service.titleKey}</h2>
                  <p className="text-foreground/60 text-lg leading-relaxed mb-8">{service.descriptionKey}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href={service.link}>
                      <Button className="group">
                        {t.servicesSection.learnMore}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/reservation">
                      <Button variant="outline" className="group bg-transparent">
                        {t.common.reserve}
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className={`relative ${index % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="aspect-square rounded-3xl glass p-8 glow-primary">
                    <div className="w-full h-full relative flex items-center justify-center">
                      {/* Animated rings */}
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`absolute border-2 border-primary/20 rounded-full`}
                          style={{
                            width: `${60 + i * 20}%`,
                            height: `${60 + i * 20}%`,
                          }}
                          animate={{ rotate: 360 }}
                          transition={{
                            duration: 20 + i * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                          }}
                        />
                      ))}
                      <div
                        className={`w-32 h-32 rounded-full bg-gradient-to-br ${service.color} flex items-center justify-center`}
                      >
                        <service.icon className="h-16 w-16 text-primary-foreground" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl glass glow-primary">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {t.ctaSection.title}
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
              {t.ctaSection.description}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reservation">
                <Button size="lg" className="glow-primary">
                  {t.ctaSection.bookConsultation}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="bg-transparent">
                  {t.ctaSection.contactUs}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
