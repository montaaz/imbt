"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowLeft, CheckCircle2, LucideIcon } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"

const FloatingShapes = dynamic(() => import("@/components/three/floating-shapes"), { ssr: false })

gsap.registerPlugin(ScrollTrigger)

interface ServiceSection {
  title: string
  content: string | string[]
  icon?: LucideIcon
}

interface Statistic {
  value: string
  label: string
}

interface Benefit {
  text: string
  icon: LucideIcon
}

interface ServiceDetailProps {
  icon: LucideIcon
  title: string
  subtitle: string
  heroDescription: string
  whyImportant?: string
  sections: ServiceSection[]
  benefits: Benefit[]
  statistics?: Statistic[]
  color: string
}

export default function ServiceDetailLayout({
  icon: Icon,
  title,
  subtitle,
  heroDescription,
  whyImportant,
  sections,
  benefits,
  statistics,
  color,
}: ServiceDetailProps) {
  const heroRef = useRef<HTMLElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const benefitsRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate sections on scroll
      gsap.fromTo(
        ".service-section",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionsRef.current,
            start: "top 80%",
          },
        },
      )

      // Animate benefits with 3D effects
      gsap.fromTo(
        ".benefit-card",
        {
          scale: 0.5,
          opacity: 0,
          rotateX: -45,
          rotateY: 45,
          z: -100,
        },
        {
          scale: 1,
          opacity: 1,
          rotateX: 0,
          rotateY: 0,
          z: 0,
          duration: 1,
          stagger: {
            amount: 0.8,
            from: "random",
          },
          ease: "back.out(1.4)",
          scrollTrigger: {
            trigger: benefitsRef.current,
            start: "top 70%",
          },
        },
      )

      // Add floating animation to benefit icons
      gsap.to(".benefit-icon", {
        y: -10,
        duration: 2,
        ease: "sine.inOut",
        stagger: {
          amount: 1,
          repeat: -1,
          yoyo: true,
        },
      })

      // Parallax effect for hero icon
      gsap.to(".hero-icon", {
        y: -50,
        rotation: 15,
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Animate statistics
      if (statistics && statistics.length > 0) {
        gsap.fromTo(
          ".stat-card",
          { scale: 0.5, opacity: 0, y: 50 },
          {
            scale: 1,
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "elastic.out(1, 0.8)",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 80%",
            },
          },
        )
      }

      // Add 3D rotation effect to section cards on hover
      document.querySelectorAll(".service-section").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out",
          })
        })
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          })
        })
      })
    })

    return () => ctx.revert()
  }, [statistics])

  return (
    <main className="min-h-screen bg-background">
      <FloatingShapes />
      <Navigation />

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-32 pb-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/services">
              <Button variant="ghost" className="group">
                <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                Retour aux services
              </Button>
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="text-primary text-sm font-medium tracking-wider uppercase mb-4 block">
                {subtitle}
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                <span className="gradient-text">{title}</span>
              </h1>
              <p className="text-foreground/60 text-lg leading-relaxed mb-8">{heroDescription}</p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/reservation">
                  <Button size="lg" className="glow-primary">
                    Demander un devis
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" size="lg" className="bg-transparent">
                    Nous contacter
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative"
            >
              <div className="aspect-square rounded-3xl glass p-12 glow-primary">
                <div className="w-full h-full relative flex items-center justify-center">
                  {/* Animated rings */}
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute border-2 border-primary/20 rounded-full"
                      style={{
                        width: `${50 + i * 15}%`,
                        height: `${50 + i * 15}%`,
                      }}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{
                        duration: 25 + i * 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    />
                  ))}
                  <div
                    className={`hero-icon w-40 h-40 rounded-full bg-gradient-to-br ${color} flex items-center justify-center shadow-2xl`}
                  >
                    <Icon className="h-20 w-20 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Important Section */}
      {whyImportant && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Pourquoi la <span className="gradient-text">Transformation Digitale</span> est-elle cruciale ?
              </h2>
              <p className="text-foreground/70 text-lg leading-relaxed">{whyImportant}</p>
            </motion.div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      {statistics && statistics.length > 0 && (
        <section className="py-20">
          <div ref={statsRef} className="container mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {statistics.map((stat, index) => (
                <div key={index} className="stat-card glass rounded-2xl p-6 text-center">
                  <div className={`text-4xl sm:text-5xl font-bold mb-2 bg-gradient-to-br ${color} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-foreground/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      <section className="py-20">
        <div ref={sectionsRef} className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-16">
            {sections.map((section, index) => {
              const SectionIcon = section.icon
              return (
                <div key={index} className="service-section">
                  <div className="glass rounded-3xl p-8 sm:p-12 hover:shadow-2xl transition-shadow duration-300">
                    <div className="flex items-start gap-4 mb-6">
                      {SectionIcon && (
                        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0`}>
                          <SectionIcon className="h-7 w-7 text-primary-foreground" />
                        </div>
                      )}
                      <h2 className="text-3xl sm:text-4xl font-bold gradient-text flex-1">{section.title}</h2>
                    </div>
                    {Array.isArray(section.content) ? (
                      <div className="space-y-4">
                        {section.content.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-start gap-4">
                            <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                            <p className="text-foreground/70 text-lg leading-relaxed">{item}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-foreground/70 text-lg leading-relaxed">{section.content}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div ref={benefitsRef} className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Les <span className="gradient-text">avantages clés</span>
            </h2>
            <p className="text-foreground/60 text-lg max-w-2xl mx-auto">
              Découvrez comment notre service peut transformer votre entreprise
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto" style={{ perspective: "1000px" }}>
            {benefits.map((benefit, index) => {
              const BenefitIcon = benefit.icon
              return (
                <div
                  key={index}
                  className="benefit-card glass rounded-2xl p-6 group cursor-pointer relative overflow-hidden"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Animated background gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

                  <div className="flex items-start gap-4 relative z-10">
                    <div className={`benefit-icon w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-2xl transition-all duration-300 group-hover:scale-110`}>
                      <BenefitIcon className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <p className="text-foreground/80 leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {benefit.text}
                    </p>
                  </div>

                  {/* Shine effect on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center p-12 rounded-3xl glass glow-primary">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Prêt à démarrer votre <span className="gradient-text">transformation</span> ?
            </h2>
            <p className="text-foreground/60 text-lg mb-8 max-w-2xl mx-auto">
              Contactez-nous dès aujourd'hui pour une consultation gratuite et découvrez comment nous pouvons vous aider
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/reservation">
                <Button size="lg" className="glow-primary">
                  Réserver une consultation
                </Button>
              </Link>
              <Link href="/services">
                <Button variant="outline" size="lg" className="bg-transparent">
                  Voir tous les services
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
