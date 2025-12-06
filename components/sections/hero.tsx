"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Magnetic } from "@/components/gsap/section-transitions"

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 })

      tl.fromTo(
        ".hero-letter",
        {
          y: 100,
          opacity: 0,
          rotateX: -90,
          scale: 0.8,
          transformOrigin: "50% 100%",
        },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          scale: 1,
          duration: 0.4,
          stagger: {
            each: 0.01,
            from: "center",
          },
          ease: "power3.out",
        },
      )
        .fromTo(
          subtitleRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
          "-=0.2",
        )
        .fromTo(
          ".hero-cta",
          { y: 30, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.5)" },
          "-=0.15",
        )
        .fromTo(
          ".hero-stat",
          { y: 30, opacity: 0, scale: 0.8 },
          { y: 0, opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "back.out(1.2)" },
          "-=0.1",
        )

      gsap.to(".float-element", {
        y: -40,
        rotation: 5,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          each: 0.3,
          from: "random",
        },
      })

      gsap.to(".gradient-orb", {
        rotation: 360,
        scale: 1.1,
        duration: 25,
        repeat: -1,
        ease: "none",
      })

      gsap.fromTo(
        ".stat-value",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.05,
          delay: 0.5,
          ease: "back.out(1.2)",
        },
      )
    })

    return () => ctx.revert()
  }, [])

  const title = "Stratégies Digitales"
  const subtitle = "pour un Avenir Durable"

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="gradient-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-primary/40 via-accent/30 to-transparent rounded-full blur-3xl float-element opacity-60" />
      <div
        className="gradient-orb absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-gradient-to-tl from-accent/40 via-primary/30 to-transparent rounded-full blur-3xl float-element opacity-60"
        style={{ animationDelay: "1s" }}
      />
      <div className="gradient-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/20 via-accent/10 to-transparent rounded-full blur-3xl" />

      <div className="absolute inset-0 overflow-hidden opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.15) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass mb-10 border border-primary/40 backdrop-blur-xl"
          >
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground/90">Votre partenaire stratégique</span>
          </motion.div>

          {/* Main Title with 3D perspective */}
          <h1
            ref={titleRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 perspective-1000"
            style={{ transformStyle: "preserve-3d" }}
          >
            <span className="block" style={{ transformStyle: "preserve-3d" }}>
              {title.split("").map((letter, index) => (
                <span
                  key={index}
                  className="hero-letter inline-block gradient-text hover:scale-110 transition-transform cursor-default"
                  style={{
                    display: letter === " " ? "inline" : "inline-block",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
            <span className="block mt-4" style={{ transformStyle: "preserve-3d" }}>
              {subtitle.split("").map((letter, index) => (
                <span
                  key={index}
                  className="hero-letter inline-block text-foreground hover:text-primary transition-colors cursor-default"
                  style={{
                    display: letter === " " ? "inline" : "inline-block",
                    transformStyle: "preserve-3d",
                  }}
                >
                  {letter === " " ? "\u00A0" : letter}
                </span>
              ))}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            ref={subtitleRef}
            className="text-lg sm:text-xl text-foreground/70 max-w-2xl mx-auto mb-14 leading-relaxed"
          >
            IMBT Consulting libère le plein potentiel de votre entreprise avec des solutions innovantes en
            transformation digitale, développement sur mesure et marketing digital.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Magnetic strength={0.4}>
              <Link href="/reservation" className="hero-cta block">
                <Button size="lg" className="glow-primary group text-lg px-10 py-7 relative overflow-hidden">
                  <span className="relative z-10 flex items-center font-semibold">
                    Réserver une consultation
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-2" />
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundSize: "200% 100%" }}
                  />
                </Button>
              </Link>
            </Magnetic>

            <Magnetic strength={0.4}>
              <Link href="/services" className="hero-cta block">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-7 border-primary/40 hover:bg-primary/20 bg-transparent group relative overflow-hidden"
                >
                  <Play className="mr-2 h-5 w-5 group-hover:scale-125 transition-transform" />
                  Découvrir nos services
                </Button>
              </Link>
            </Magnetic>
          </div>

          {/* Stats with enhanced animation */}
          <div className="grid grid-cols-3 gap-6 mt-24 max-w-3xl mx-auto">
            {[
              { value: "150+", label: "Projets réalisés" },
              { value: "98%", label: "Clients satisfaits" },
              { value: "10+", label: "Années d'expérience" },
            ].map((stat, index) => (
              <div
                key={index}
                className="hero-stat text-center p-8 rounded-3xl glass hover:bg-card/70 transition-all duration-500 group cursor-default hover:scale-105 hover:-translate-y-2"
              >
                <div className="stat-value text-4xl sm:text-5xl lg:text-6xl font-bold gradient-text mb-3 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-sm text-foreground/60 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="w-8 h-14 border-2 border-foreground/40 rounded-full flex justify-center relative overflow-hidden backdrop-blur-sm"
        >
          <motion.div
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="w-2.5 h-4 bg-gradient-to-b from-primary to-accent rounded-full mt-2"
          />
        </motion.div>
        <p className="text-xs text-foreground/40 mt-3 text-center">Scroll pour explorer</p>
      </motion.div>
    </section>
  )
}
