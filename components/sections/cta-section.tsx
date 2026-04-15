"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "gsap"
import { ArrowRight, Calendar, Mail, Sparkles } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { TextReveal, Magnetic } from "@/components/gsap/section-transitions"
import { useLanguage } from "@/lib/i18n/language-context"

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" })
  const [particles, setParticles] = useState<Array<{ id: number; left: number; bottom: number }>>([])
  const { t } = useLanguage()

  useEffect(() => {
    setParticles(
      [...Array(20)].map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        bottom: Math.random() * 30,
      }))
    )
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".cta-glow", {
        scale: 1.3,
        opacity: 0.4,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.5,
      })

      gsap.to(".cta-particle", {
        y: -50,
        x: "random(-30, 30)",
        opacity: 0,
        duration: 3,
        repeat: -1,
        stagger: {
          each: 0.3,
          from: "random",
        },
        ease: "power1.out",
      })
    })

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="py-40 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="cta-glow absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-3xl" />
        <div className="cta-glow absolute top-1/2 right-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/15 rounded-full blur-3xl" />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="cta-particle absolute w-2 h-2 bg-primary/40 rounded-full"
            style={{
              left: `${particle.left}%`,
              bottom: `${particle.bottom}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass border border-accent/40 mb-8"
          >
            <Sparkles className="h-4 w-4 text-accent animate-pulse" />
            <span className="text-sm font-medium text-foreground/80">{t.ctaSection.badge}</span>
          </motion.div>

          <TextReveal
            text={t.ctaSection.title}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-foreground/60 text-lg leading-relaxed mb-12 max-w-2xl mx-auto"
          >
            {t.ctaSection.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            <Magnetic strength={0.4}>
              <Link href="/reservation">
                <Button size="lg" className="group text-lg px-10 py-7 relative overflow-hidden bg-[#a80202] hover:bg-[#8a0101] text-white border-0">
                  <span className="relative z-10 flex items-center font-semibold">
                    <Calendar className="mr-2 h-5 w-5" />
                    {t.ctaSection.bookConsultation}
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div
                    className="absolute inset-0 bg-gradient-to-r from-[#a80202] via-[#c00000] to-[#a80202] animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundSize: "200% 100%" }}
                  />
                </Button>
              </Link>
            </Magnetic>

            <Magnetic strength={0.4}>
              <Link href="/contact">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-10 py-7 border-primary/40 hover:bg-primary/20 bg-transparent group"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  {t.ctaSection.contactUs}
                </Button>
              </Link>
            </Magnetic>
          </motion.div>

          {/* Contact Info */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-10 text-foreground/50"
          >
            {t.ctaSection.emailUs}{" "}
            <a
              href="mailto:contact@imbt-consulting.com"
              className="text-primary hover:text-accent transition-colors font-medium underline-offset-4 hover:underline"
            >
              contact@imbt-consulting.com
            </a>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
