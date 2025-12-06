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

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Rocket,
    title: "Conseil en Transformation Digitale",
    description:
      "Nous élaborons des stratégies digitales personnalisées pour maximiser votre impact sur le marché. Nos experts analysent vos besoins et développent des plans d'action concrets pour vous aider à atteindre vos objectifs.",
    features: [
      "Audit digital complet",
      "Stratégie de transformation",
      "Accompagnement au changement",
      "Mesure des performances",
    ],
    color: "from-primary to-primary/50",
  },
  {
    icon: Monitor,
    title: "Développement Web & Applications",
    description:
      "Nous créons des sites web performants et adaptés à votre activité. Que vous ayez besoin d'une vitrine en ligne ou d'une solution e-commerce, notre équipe de développeurs met en œuvre des technologies de pointe.",
    features: ["Sites web sur mesure", "Applications mobiles", "E-commerce", "Maintenance & support"],
    color: "from-accent to-accent/50",
  },
  {
    icon: GraduationCap,
    title: "Formations Digitales",
    description:
      "Nous proposons des formations complètes pour vous aider à maîtriser les outils et les technologies digitales. Que vous soyez débutant ou avancé, nos programmes sont conçus pour vous fournir les compétences nécessaires.",
    features: ["Formations personnalisées", "Ateliers pratiques", "Certifications reconnues", "Suivi post-formation"],
    color: "from-primary to-accent",
  },
  {
    icon: Users,
    title: "CRM - Gestion de la Relation Client",
    description:
      "Implémentation de systèmes de gestion de la relation client pour optimiser votre acquisition et fidélisation client. Nous vous aidons à mieux connaître vos clients.",
    features: [
      "Analyse des besoins CRM",
      "Implémentation Salesforce/HubSpot",
      "Migration des données",
      "Formation des équipes",
    ],
    color: "from-accent to-primary",
  },
  {
    icon: Settings,
    title: "ERP - Gestion Intégrée",
    description:
      "Mise en place de systèmes de gestion intégrés pour une meilleure efficacité opérationnelle. Centralisez vos processus et optimisez vos ressources.",
    features: [
      "Audit des processus",
      "Sélection de solution ERP",
      "Déploiement & intégration",
      "Optimisation continue",
    ],
    color: "from-primary/80 to-accent/80",
  },
  {
    icon: TrendingUp,
    title: "Marketing Digital",
    description:
      "Optimisation des campagnes digitales et mise en place d'une stratégie marketing omnicanal pour une meilleure acquisition et fidélisation client.",
    features: ["SEO & SEA", "Réseaux sociaux", "Email marketing", "Analytics & reporting"],
    color: "from-accent/80 to-primary/80",
  },
]

const benefits = [
  { icon: Zap, title: "Rapidité", description: "Résultats visibles en quelques semaines" },
  { icon: Shield, title: "Expertise", description: "10+ ans d'expérience dans le digital" },
  { icon: Clock, title: "Support 24/7", description: "Accompagnement continu" },
]

export default function ServicesPage() {
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
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">Nos Services</span>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
              Une gamme complète de <span className="gradient-text">solutions digitales</span>
            </h1>
            <p className="text-foreground/60 text-xl leading-relaxed max-w-2xl mx-auto">
              Chacune de nos interventions est conçue pour stimuler votre croissance, améliorer votre efficacité
              opérationnelle, et maximiser vos performances.
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
                  <h2 className="text-3xl sm:text-4xl font-bold mb-4">{service.title}</h2>
                  <p className="text-foreground/60 text-lg leading-relaxed mb-8">{service.description}</p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0" />
                        <span className="text-foreground/80">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Link href="/reservation">
                    <Button className="group">
                      Demander un devis
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
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
              Prêt à transformer votre <span className="gradient-text">entreprise</span> ?
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous pour une consultation gratuite et découvrez comment nous pouvons vous aider à atteindre vos
              objectifs.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reservation">
                <Button size="lg" className="glow-primary">
                  Réserver une consultation
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="bg-transparent">
                  Nous contacter
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
