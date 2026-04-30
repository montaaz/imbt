"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ArrowRight, Sparkles, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Magnetic } from "@/components/gsap/section-transitions"
import { useLanguage } from "@/lib/i18n/language-context"

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const { t, dir } = useLanguage()

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

  const title = t.hero.title
  const subtitle = t.hero.subtitle
  const isRtl = dir === "rtl"

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

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass mb-8 sm:mb-10 border border-primary/40 backdrop-blur-xl"
          >
            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-primary animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground/90">{t.hero.badge}</span>
          </motion.div>

          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 perspective-1000 px-2 sm:px-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            {isRtl ? (
              /*
               * Arabic is a cursive connected script — splitting into individual
               * letter <span>s with inline-block breaks every ligature and letter
               * connection, making text completely unreadable. Render as whole text.
               */
              <>
                <span className="hero-letter block leading-tight mb-1 sm:mb-2 gradient-text cursor-default">
                  {title}
                </span>
                <span className="hero-letter block mt-1 sm:mt-2 md:mt-4 leading-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-foreground cursor-default">
                  {subtitle}
                </span>
              </>
            ) : (
              <>
                <span className="block leading-tight mb-1 sm:mb-2" style={{ transformStyle: "preserve-3d" }}>
                  {title.split("").map((letter, index) => (
                    <span
                      key={index}
                      className="hero-letter inline-block gradient-text hover:scale-110 transition-transform cursor-default"
                      style={{
                        display: letter === " " ? "inline" : "inline-block",
                        transformStyle: "preserve-3d",
                      }}
                    >
                      {letter === " " ? " " : letter}
                    </span>
                  ))}
                </span>
                <span
                  className="block mt-1 sm:mt-2 md:mt-4 leading-tight text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl"
                  style={{ transformStyle: "preserve-3d", wordBreak: "keep-all", whiteSpace: "normal" }}
                >
                  {subtitle.split(" ").map((word, wordIndex) => (
                    <span key={wordIndex} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                      {word.split("").map((letter, letterIndex) => (
                        <span
                          key={letterIndex}
                          className="hero-letter inline-block text-foreground transition-colors cursor-default"
                          style={{ transformStyle: "preserve-3d" }}
                          onMouseEnter={(e) => (e.currentTarget.style.color = "#a80202")}
                          onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                        >
                          {letter}
                        </span>
                      ))}
                      {wordIndex < subtitle.split(" ").length - 1 && (
                        <span style={{ display: "inline" }}>&nbsp;</span>
                      )}
                    </span>
                  ))}
                </span>
              </>
            )}
          </h1>

          {/* Description */}
          <p
            ref={subtitleRef}
            className="text-sm sm:text-base md:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 md:mb-14 leading-relaxed px-4 sm:px-6"
          >
            {t.hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5 px-4">
            <Magnetic strength={0.4}>
              <Link href="/reservation" className="hero-cta block w-full sm:w-auto">
                <Button
                  size="lg"
                  className="group text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 relative overflow-hidden w-full sm:w-auto bg-[#a80202] hover:bg-[#8a0101] text-white border-0"
                >
                  <span className="relative z-10 flex items-center justify-center font-semibold whitespace-nowrap">
                    {t.hero.cta}
                    <ArrowRight
                      className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform group-hover:translate-x-2 rtl:group-hover:-translate-x-2 ${
                        isRtl ? "mr-2 rotate-180" : "ml-2"
                      }`}
                    />
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#a80202] via-[#c00000] to-[#a80202] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ backgroundSize: "200% 100%" }}
                  />
                </Button>
              </Link>
            </Magnetic>

            <Magnetic strength={0.4}>
              <Link href="/services" className="hero-cta block w-full sm:w-auto">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm sm:text-base md:text-lg px-5 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7 border-primary/40 hover:bg-primary/20 bg-transparent group relative overflow-hidden w-full sm:w-auto"
                >
                  <Play
                    className={`h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-125 transition-transform ${
                      isRtl ? "ml-2" : "mr-2"
                    }`}
                  />
                  <span className="whitespace-nowrap">{t.hero.ctaSecondary}</span>
                </Button>
              </Link>
            </Magnetic>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 md:gap-6 mt-12 sm:mt-16 md:mt-24 max-w-3xl mx-auto px-2 sm:px-4">
            {[
              { value: "100+", label: t.stats.projects },
              { value: "98%", label: t.stats.clients },
              { value: "10+", label: t.stats.experience },
            ].map((stat, index) => (
              <div
                key={index}
                className="hero-stat text-center p-3 sm:p-4 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl md:rounded-3xl glass hover:bg-card/70 transition-all duration-500 group cursor-default hover:scale-105 hover:-translate-y-2"
              >
                <div className="stat-value text-xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold gradient-text mb-1 sm:mb-2 md:mb-3 group-hover:scale-110 transition-transform">
                  {stat.value}
                </div>
                <div className="text-[10px] sm:text-xs md:text-sm text-foreground/60 font-medium leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block"
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
        <p className="text-xs text-foreground/40 mt-3 text-center">{t.hero.scrollToExplore}</p>
      </motion.div>
    </section>
  )
}
