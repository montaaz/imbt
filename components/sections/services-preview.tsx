"use client"

import type React from "react"
import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Monitor, Rocket, GraduationCap, Users, Settings, TrendingUp, ArrowRight, Zap } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TextReveal, Magnetic } from "@/components/gsap/section-transitions"
import { useLanguage } from "@/lib/i18n/language-context"

gsap.registerPlugin(ScrollTrigger)

const servicesConfig = [
  {
    icon: Rocket,
    key: "transformation" as const,
    color: "from-primary to-primary/50",
    gradient: "bg-gradient-to-br from-primary/20 to-accent/10",
  },
  {
    icon: Monitor,
    key: "development" as const,
    color: "from-accent to-accent/50",
    gradient: "bg-gradient-to-br from-accent/20 to-primary/10",
  },
  {
    icon: GraduationCap,
    key: "training" as const,
    color: "from-primary to-accent",
    gradient: "bg-gradient-to-br from-primary/15 to-accent/15",
  },
  {
    icon: Users,
    key: "crm" as const,
    color: "from-accent to-primary",
    gradient: "bg-gradient-to-br from-accent/15 to-primary/15",
  },
  {
    icon: Settings,
    key: "erp" as const,
    color: "from-primary/80 to-accent/80",
    gradient: "bg-gradient-to-br from-primary/10 to-accent/20",
  },
  {
    icon: TrendingUp,
    key: "marketing" as const,
    color: "from-accent/80 to-primary/80",
    gradient: "bg-gradient-to-br from-accent/10 to-primary/20",
  },
]

function ServiceCard({ service, index }: { service: (typeof servicesConfig)[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [ripple, setRipple] = useState<{ x: number; y: number } | null>(null)
  const { t, dir } = useLanguage()

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const rotateX = (y - centerY) / 8
    const rotateY = (centerX - x) / 8

    gsap.to(cardRef.current, {
      rotateX: -rotateX,
      rotateY: rotateY,
      scale: 1.02,
      duration: 0.2,
      ease: "power2.out",
    })

    // Update glow position
    const glowEl = cardRef.current.querySelector(".card-glow") as HTMLElement
    if (glowEl) {
      glowEl.style.left = `${x}px`
      glowEl.style.top = `${y}px`
    }
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return

    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.4,
      ease: "elastic.out(1, 0.4)",
    })
  }

  const handleClick = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (rect) {
      setRipple({ x: e.clientX - rect.left, y: e.clientY - rect.top })
      setTimeout(() => setRipple(null), 600)
    }
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="service-card group relative p-8 rounded-3xl glass hover:bg-card/90 transition-all duration-500 cursor-pointer overflow-hidden"
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
    >
      {/* Mouse follow glow */}
      <div className="card-glow absolute w-40 h-40 bg-primary/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -translate-x-1/2 -translate-y-1/2" />

      {/* Ripple effect */}
      {ripple && (
        <span
          className="absolute rounded-full bg-white/20 animate-ping"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 20,
            height: 20,
            transform: "translate(-50%, -50%)",
          }}
        />
      )}

      {/* Background gradient */}
      <div
        className={`absolute inset-0 rounded-3xl ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      {/* Border glow */}
      <div
        className={`absolute -inset-0.5 rounded-3xl bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500`}
      />

      {/* Icon */}
      <div
        className={`relative w-18 h-18 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}
        style={{ transform: "translateZ(40px)" }}
      >
        <service.icon className="h-9 w-9 text-white" />
        <div className="absolute inset-0 rounded-2xl bg-white/30 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity" />
      </div>

      {/* Content */}
      <h3
        className="relative text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300"
        style={{ transform: "translateZ(30px)" }}
      >
        {t.serviceCards[service.key].title}
      </h3>
      <p className="relative text-foreground/60 leading-relaxed mb-5" style={{ transform: "translateZ(20px)" }}>
        {t.serviceCards[service.key].description}
      </p>

      {/* Learn More */}
      <Link
        href="/services"
        className="relative inline-flex items-center text-primary text-sm font-semibold opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-400"
        style={{ transform: "translateZ(25px)" }}
      >
        <span className="relative">
          {t.servicesSection.learnMore}
          <span className={`absolute bottom-0 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-400 ${dir === 'rtl' ? 'right-0' : 'left-0'}`} />
        </span>
        <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-2 ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
      </Link>

      {/* Corner icon */}
      <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-400">
        <Zap className="h-6 w-6 text-accent" />
      </div>
    </div>
  )
}

export default function ServicesPreview() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const { t, dir } = useLanguage()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".service-card",
        {
          y: 100,
          opacity: 0,
          scale: 0.85,
          rotateX: 20,
          rotateY: -10,
          filter: "blur(5px)",
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
          duration: 0.6,
          stagger: {
            each: 0.08,
            from: "start",
          },
          ease: "power4.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 85%",
            end: "bottom 20%",
          },
        },
      )

      gsap.to(".service-float", {
        y: -30,
        rotation: 180,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-40 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent" />

      <div className="service-float absolute top-32 left-16 w-24 h-24 border-2 border-primary/30 rounded-full" />
      <div className="service-float absolute bottom-48 right-24 w-36 h-36 border-2 border-accent/30 rounded-full" />
      <div className="service-float absolute top-1/2 right-12 w-16 h-16 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl rotate-45" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto mb-24"
        >
          <span className="text-primary text-sm font-semibold tracking-widest uppercase mb-5 block">{t.servicesSection.title}</span>
          <TextReveal
            text={t.servicesSection.subtitle}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
          />
          <p className="text-foreground/60 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.servicesSection.description}
          </p>
        </motion.div>

        {/* Grid */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesConfig.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-20"
        >
          <Magnetic strength={0.3}>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="group bg-transparent relative overflow-hidden px-10 py-7 text-lg"
              >
                <span className="relative z-10 flex items-center font-semibold">
                  {t.servicesSection.viewAll}
                  <ArrowRight className={`h-5 w-5 group-hover:translate-x-2 transition-transform ${dir === 'rtl' ? 'mr-2 rotate-180' : 'ml-2'}`} />
                </span>
              </Button>
            </Link>
          </Magnetic>
        </motion.div>
      </div>
    </section>
  )
}
