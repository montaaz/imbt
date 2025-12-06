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
  { value: "150+", label: "Projets réalisés" },
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
      <section ref={heroRef} className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">À Propos</span>
              <h1 className="text-5xl sm:text-6xl font-bold mb-6">
                Votre partenaire pour la <span className="gradient-text">transformation digitale</span>
              </h1>
              <p className="text-foreground/60 text-xl leading-relaxed mb-8">
                IMBT Consulting est votre partenaire stratégique pour libérer le plein potentiel de votre entreprise.
                Nous offrons une gamme complète de services, incluant le conseil en transformation digitale, le
                développement informatique sur mesure, et des solutions innovantes en marketing digital.
              </p>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8">
                Avec une approche personnalisée, nous vous accompagnons dans l'atteinte de vos objectifs, tout en vous
                aidant à naviguer dans l'univers complexe de la transformation digitale.
              </p>
              <Link href="/reservation">
                <Button size="lg" className="glow-primary group">
                  Commencer un projet
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl glass p-8 glow-primary">
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* Animated Logo */}
                  <div className="relative">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute border-2 border-primary/30 rounded-full"
                        style={{
                          width: `${150 + i * 50}px`,
                          height: `${150 + i * 50}px`,
                          left: `${-75 - i * 25}px`,
                          top: `${-75 - i * 25}px`,
                        }}
                        animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                        transition={{
                          duration: 20 + i * 5,
                          repeat: Number.POSITIVE_INFINITY,
                          ease: "linear",
                        }}
                      />
                    ))}
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10">
                      <span className="text-4xl font-bold text-primary-foreground">IMBT</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-4 -left-4 px-4 py-3 rounded-xl glass glow-accent"
              >
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-accent" />
                  <span className="font-semibold">Certifié Expert</span>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -top-4 -right-4 px-4 py-3 rounded-xl glass glow-primary"
              >
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-primary" />
                  <span className="font-semibold">International</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-2xl glass"
              >
                <div className="text-4xl sm:text-5xl font-bold gradient-text mb-2">{stat.value}</div>
                <div className="text-foreground/60">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20" id="valeurs">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">Nos Valeurs</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Les piliers de notre <span className="gradient-text">excellence</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Nos valeurs guident chacune de nos actions et définissent notre approche du conseil digital.
            </p>
          </motion.div>

          <div ref={valuesRef} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="value-card group p-8 rounded-2xl glass hover:bg-card/60 transition-all duration-500"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                  <value.icon className="h-7 w-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">{value.title}</h3>
                <p className="text-foreground/60 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 team-section">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">Notre Équipe</span>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Des experts <span className="gradient-text">passionnés</span>
            </h2>
            <p className="text-foreground/60 text-lg">
              Une équipe pluridisciplinaire dédiée à votre réussite digitale.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="team-card group">
                <div className="relative rounded-2xl overflow-hidden glass p-4 glow-primary">
                  <div className="aspect-square rounded-xl overflow-hidden mb-4">
                    <img
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="text-center">
                    <h3 className="font-semibold text-lg">{member.name}</h3>
                    <p className="text-foreground/60 text-sm">{member.role}</p>
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
              Rejoignez notre aventure <span className="gradient-text">digitale</span>
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
              Que vous souhaitiez devenir client ou rejoindre notre équipe, nous serions ravis de vous rencontrer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reservation">
                <Button size="lg" className="glow-primary">
                  Commencer un projet
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
