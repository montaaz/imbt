"use client"

import { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Target, Lightbulb, Heart, Users, Award, Globe, ArrowRight } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

const ParticleField = dynamic(() => import("@/components/three/particle-field"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "Nous visons l'excellence dans chaque projet, en dépassant les attentes de nos clients grâce à un travail rigoureux et une attention aux détails.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Nous restons à la pointe des technologies et des tendances pour offrir des solutions innovantes et performantes.",
  },
  {
    icon: Heart,
    title: "Engagement",
    description:
      "Nous nous engageons pleinement auprès de nos clients, avec transparence et intégrité, pour bâtir des relations durables.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "Nous croyons en la force du travail d'équipe et de la collaboration étroite avec nos clients pour atteindre les meilleurs résultats.",
  },
]

const stats = [
  { value: "100+", label: "Projets réalisés" },
  { value: "98%", label: "Clients satisfaits" },
  { value: "10+", label: "Années d'expérience" },
  { value: "50+", label: "Experts" },
]

const team = [
  {
    name: "Mohamed Ben Ahmed",
    role: "Fondateur & CEO",
    image: "/professional-man-suit-portrait.png",
  },
  {
    name: "Sarah Martin",
    role: "Directrice Technique",
    image: "/professional-woman-tech-director-portrait.jpg",
  },
  {
    name: "Thomas Durand",
    role: "Responsable Marketing",
    image: "/professional-man-marketing-manager-portrait.jpg",
  },
  {
    name: "Julie Moreau",
    role: "Lead Developer",
    image: "/professional-woman-developer-portrait.jpg",
  },
]

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null)
  const valuesRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(valuesRef, { once: true, margin: "-100px" })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".value-card",
        { y: 80, opacity: 0, rotateX: -15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 80%",
          },
        },
      )

      gsap.fromTo(
        ".team-card",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: ".team-section",
            start: "top 80%",
          },
        },
      )
    })

    return () => ctx.revert()
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <ParticleField />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-24 sm:pt-32 pb-12 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-64 h-64 sm:w-96 sm:h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-56 h-56 sm:w-80 sm:h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4 block">À Propos</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                Votre partenaire pour la <span className="gradient-text">transformation digitale</span>
              </h1>
              <p className="text-foreground/60 text-base sm:text-lg md:text-xl leading-relaxed mb-4 sm:mb-6 md:mb-8">
                IMBT Consulting est votre partenaire stratégique pour libérer le plein potentiel de votre entreprise.
                Nous offrons une gamme complète de services, incluant le conseil en transformation digitale, le
                développement informatique sur mesure, et des solutions innovantes en marketing digital.
              </p>
              <p className="text-foreground/60 text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">
                Avec une approche personnalisée, nous vous accompagnons dans l'atteinte de vos objectifs, tout en vous
                aidant à naviguer dans l'univers complexe de la transformation digitale.
              </p>
              <Link href="/reservation" className="inline-block w-full sm:w-auto">
                <Button size="lg" className="glow-primary group w-full sm:w-auto text-sm sm:text-base px-5 sm:px-8 py-5 sm:py-6">
                  Commencer un projet
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative mt-8 lg:mt-0"
            >
              <div className="aspect-square rounded-2xl sm:rounded-3xl glass p-6 sm:p-8 glow-primary">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated Logo */}
                  <div className="relative">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border-2 border-primary/30 rounded-full"
                        style={{
                          width: `${100 + i * 35}px`,
                          height: `${100 + i * 35}px`,
                          left: `${-50 - i * 17.5}px`,
                          top: `${-50 - i * 17.5}px`,
                        }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{
                          duration: 20 + i * 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    ))}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10">
                      <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-foreground">IMBT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl glass glow-accent"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-accent" />
                  <span className="font-semibold text-xs sm:text-sm">Certifié Expert</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 px-3 py-2 sm:px-4 sm:py-3 rounded-lg sm:rounded-xl glass glow-primary"
              >
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Globe className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                  <span className="font-semibold text-xs sm:text-sm">International</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-10 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-4 sm:p-6 rounded-xl sm:rounded-2xl glass"
              >
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold gradient-text mb-1 sm:mb-2">{stat.value}</div>
                <div className="text-foreground/60 text-xs sm:text-sm md:text-base leading-tight">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-16 md:py-20" id="valeurs">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
          >
            <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4 block">Nos Valeurs</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Les piliers de notre <span className="gradient-text">excellence</span>
            </h2>
            <p className="text-foreground/60 text-sm sm:text-base md:text-lg">
              Nos valeurs guident chacune de nos actions et définissent notre approche du conseil digital.
            </p>
          </motion.div>

          <div ref={valuesRef} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl glass hover:bg-card/60 transition-all duration-500"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-500">
                  <value.icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-12 sm:py-16 md:py-20 team-section">
        <div className="container mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-16"
          >
            <span className="text-primary text-xs sm:text-sm font-medium tracking-wider uppercase mb-3 sm:mb-4 block">Notre Équipe</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              Des experts <span className="gradient-text">passionnés</span>
            </h2>
            <p className="text-foreground/60 text-sm sm:text-base md:text-lg">
              Une équipe pluridisciplinaire dédiée à votre réussite digitale.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-card group">
                <div className="relative rounded-xl sm:rounded-2xl overflow-hidden glass p-3 sm:p-4 glow-primary">
                  <div className="aspect-square rounded-lg sm:rounded-xl overflow-hidden mb-3 sm:mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-base sm:text-lg">{member.name}</h3>
                    <p className="text-foreground/60 text-xs sm:text-sm">{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl glass glow-primary">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              Rejoignez notre aventure <span className="gradient-text">digitale</span>
            </h2>
            <p className="text-foreground/60 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto">
              Que vous souhaitiez devenir client ou rejoindre notre équipe, nous serions ravis de vous rencontrer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link href="/reservation" className="w-full sm:w-auto">
                <Button size="lg" className="glow-primary w-full sm:w-auto text-sm sm:text-base px-5 sm:px-8 py-5 sm:py-6">
                  Commencer un projet
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </Link>
              <Link href="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="bg-transparent w-full sm:w-auto text-sm sm:text-base px-5 sm:px-8 py-5 sm:py-6">
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
